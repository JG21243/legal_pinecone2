'use server';

import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { VoyageEmbeddings } from '@langchain/community/embeddings/voyage';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

import {
  createIndexIfNecessary,
  pineconeIndexHasVectors,
} from './pinecone';

import { type Document } from '../types/document';
import { promises as fs } from 'fs';

const readMetadata = async (): Promise<Document['metadata'][]> => {
  try {
    const data = await fs.readFile(path.resolve(process.cwd(), 'docs/db.json'), 'utf8');
    return JSON.parse(data).documents;
  } catch (error) {
    console.error('Error reading metadata:', error);
    throw error;
  }
};

const flattenMetadata = (metadata: any): Document['metadata'] => {
  const flatMetadata = { ...metadata };
  if (flatMetadata.pdf) {
    if (flatMetadata.pdf.pageCount) {
      flatMetadata.totalPages = flatMetadata.pdf.pageCount;
    }
    delete flatMetadata.pdf;
  }
  if (flatMetadata.loc) {
    delete flatMetadata.loc;
  }
  return flatMetadata;
};

const batchUpserts = async (index: any, vectors: any[], batchSize: number = 50) => {
  for (let i = 0; i < vectors.length; i += batchSize) {
    const batch = vectors.slice(i, i + batchSize);
    console.log(`Upserting batch ${i + 1} of ${batch.length} vectors...`);
    try {
      await index.upsert(batch);
    } catch (error) {
      console.error(`Error upserting batch ${i + 1}:`, error);
      throw error;
    }
  }
};

const validatePageContents = (pageContents: string[]): boolean => {
  if (!Array.isArray(pageContents) || pageContents.length === 0) {
    console.error('Page contents is not an array or is empty.');
    return false;
  }

  for (let i = 0; i < pageContents.length; i++) {
    if (typeof pageContents[i] !== 'string' || pageContents[i].trim() === '') {
      console.error(`Invalid page content at index ${i}:`, pageContents[i]);
      return false;
    }
  }

  return true;
};

export const initiateBootstrapping = async (targetIndex: string) => {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT}`;

  try {
    const response = await fetch(`${baseUrl}/api/ingest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ targetIndex }),
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Error initiating bootstrapping:', error);
    throw error;
  }
};

export const handleBootstrapping = async (targetIndex: string) => {
  try {
    console.log(`Running bootstrapping procedure against Pinecone index: ${targetIndex}`);

    await createIndexIfNecessary(targetIndex);

    const hasVectors = await pineconeIndexHasVectors(targetIndex);
    if (hasVectors) {
      console.log('Pinecone index already exists and has vectors in it - returning early without bootstrapping');
      return NextResponse.json({ success: true }, { status: 200 });
    }

    console.log('Pinecone index does not exist or has no vectors in it - bootstrapping');

    const metadata = await readMetadata();
    console.log('Metadata:', metadata);

    const docsPath = path.resolve(process.cwd(), 'docs/');
    const loader = new DirectoryLoader(docsPath, {
      '.pdf': (filePath: string) => new PDFLoader(filePath),
    });

    const documents = await loader.load();
    console.log('Documents:', documents);

    documents.forEach((doc, index) => {
      const fileMetadata = metadata.find(meta => meta.filename === path.basename(doc.metadata.source));
      if (fileMetadata) {
        doc.metadata = { ...doc.metadata, ...fileMetadata, pageContent: doc.pageContent };
      } else {
        console.warn(`No metadata found for ${doc.metadata.source}`);
      }
    });

    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const splits = await splitter.splitDocuments(documents);
    console.log('Splits:', splits);

    const castedSplits: Document[] = splits.map(split => ({
      pageContent: split.pageContent,
      metadata: {
        ...flattenMetadata(split.metadata as Document['metadata']),
        id: uuidv4(),
        pageContent: split.pageContent,
      },
    }));
    console.log('Casted Splits:', castedSplits);

    const pageContents = castedSplits.map(split => split.pageContent);
    console.log('Page Contents (before embeddings):', pageContents);

    if (!validatePageContents(pageContents)) {
      throw new Error('Invalid page contents detected.');
    }

    if (!process.env.VOYAGE_API_KEY) {
      throw new Error('Voyage API key is missing.');
    }

    const voyageEmbeddings = new VoyageEmbeddings({
      apiKey: process.env.VOYAGE_API_KEY,
      inputType: 'document',
      modelName: 'voyage-law-2',
    });
    console.log('Voyage Embeddings initialized:', voyageEmbeddings);

    let embeddings;
    try {
      embeddings = await voyageEmbeddings.embedDocuments(pageContents);
      console.log('Embeddings:', embeddings);
    } catch (error) {
      console.error('Error generating embeddings with input:', pageContents);
      console.error('Error details:', error);
      throw error;
    }

    if (!Array.isArray(embeddings) || embeddings.length !== pageContents.length) {
      console.error('Embeddings array is invalid or does not match the length of pageContents.');
      console.error('Embeddings:', embeddings);
      console.error('Page Contents Length:', pageContents.length);
      throw new Error('Embeddings array is invalid or does not match the length of pageContents.');
    }

    const vectors = castedSplits.map((split, index) => {
      if (!split.metadata.id) {
        throw new Error('Document chunk is missing an ID');
      }
      return {
        id: split.metadata.id!,
        values: embeddings[index],
        metadata: split.metadata,
      };
    });
    console.log('Vectors:', vectors);

    const pc = new Pinecone();
    const index = pc.Index(process.env.PINECONE_INDEX as string);

    await batchUpserts(index, vectors);
    console.log('Bootstrap procedure completed.');
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Error during bootstrap procedure:', error);
    if (error instanceof TypeError) {
      console.error('TypeError details:', error.message);
    }
    throw error;
  }
};