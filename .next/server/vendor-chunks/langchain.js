"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/langchain";
exports.ids = ["vendor-chunks/langchain"];
exports.modules = {

/***/ "(rsc)/./node_modules/langchain/dist/document_loaders/base.js":
/*!**************************************************************!*\
  !*** ./node_modules/langchain/dist/document_loaders/base.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseDocumentLoader: () => (/* reexport safe */ _langchain_core_document_loaders_base__WEBPACK_IMPORTED_MODULE_0__.BaseDocumentLoader)\n/* harmony export */ });\n/* harmony import */ var _langchain_core_document_loaders_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @langchain/core/document_loaders/base */ \"(rsc)/./node_modules/@langchain/core/document_loaders/base.js\");\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3QvZG9jdW1lbnRfbG9hZGVycy9iYXNlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTGVnYWwgc2VtYW50aWMgc2VhcmNoIHNhbXBsZSBhcHAvLi9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3QvZG9jdW1lbnRfbG9hZGVycy9iYXNlLmpzPzQwMGIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIkBsYW5nY2hhaW4vY29yZS9kb2N1bWVudF9sb2FkZXJzL2Jhc2VcIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/langchain/dist/document_loaders/base.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/langchain/dist/document_loaders/fs/buffer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/langchain/dist/document_loaders/fs/buffer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BufferLoader: () => (/* binding */ BufferLoader)\n/* harmony export */ });\n/* harmony import */ var _langchain_core_utils_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @langchain/core/utils/env */ \"(rsc)/./node_modules/@langchain/core/utils/env.js\");\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base.js */ \"(rsc)/./node_modules/langchain/dist/document_loaders/base.js\");\n\n\n/**\n * Abstract class that extends the `BaseDocumentLoader` class. It\n * represents a document loader that loads documents from a buffer. The\n * `load()` method is implemented to read the buffer contents and metadata\n * based on the type of `filePathOrBlob`, and then calls the `parse()`\n * method to parse the buffer and return the documents.\n */\nclass BufferLoader extends _base_js__WEBPACK_IMPORTED_MODULE_1__.BaseDocumentLoader {\n    constructor(filePathOrBlob) {\n        super();\n        Object.defineProperty(this, \"filePathOrBlob\", {\n            enumerable: true,\n            configurable: true,\n            writable: true,\n            value: filePathOrBlob\n        });\n    }\n    /**\n     * Method that reads the buffer contents and metadata based on the type of\n     * `filePathOrBlob`, and then calls the `parse()` method to parse the\n     * buffer and return the documents.\n     * @returns Promise that resolves with an array of `Document` objects.\n     */\n    async load() {\n        let buffer;\n        let metadata;\n        if (typeof this.filePathOrBlob === \"string\") {\n            const { readFile } = await BufferLoader.imports();\n            buffer = await readFile(this.filePathOrBlob);\n            metadata = { source: this.filePathOrBlob };\n        }\n        else {\n            buffer = await this.filePathOrBlob\n                .arrayBuffer()\n                .then((ab) => Buffer.from(ab));\n            metadata = { source: \"blob\", blobType: this.filePathOrBlob.type };\n        }\n        return this.parse(buffer, metadata);\n    }\n    /**\n     * Static method that imports the `readFile` function from the\n     * `fs/promises` module in Node.js. It is used to dynamically import the\n     * function when needed. If the import fails, it throws an error\n     * indicating that the `fs/promises` module is not available in the\n     * current environment.\n     * @returns Promise that resolves with an object containing the `readFile` function.\n     */\n    static async imports() {\n        try {\n            const { readFile } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node:fs/promises */ \"node:fs/promises\", 19));\n            return { readFile };\n        }\n        catch (e) {\n            console.error(e);\n            throw new Error(`Failed to load fs/promises. TextLoader available only on environment 'node'. It appears you are running environment '${(0,_langchain_core_utils_env__WEBPACK_IMPORTED_MODULE_0__.getEnv)()}'. See https://<link to docs> for alternatives.`);\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3QvZG9jdW1lbnRfbG9hZGVycy9mcy9idWZmZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQW1EO0FBQ0g7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTywyQkFBMkIsd0RBQWtCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFdBQVcsUUFBUSxzSUFBMEI7QUFDakUscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLG9KQUFvSixpRUFBTSxHQUFHO0FBQzdKO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0xlZ2FsIHNlbWFudGljIHNlYXJjaCBzYW1wbGUgYXBwLy4vbm9kZV9tb2R1bGVzL2xhbmdjaGFpbi9kaXN0L2RvY3VtZW50X2xvYWRlcnMvZnMvYnVmZmVyLmpzPzFkNWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0RW52IH0gZnJvbSBcIkBsYW5nY2hhaW4vY29yZS91dGlscy9lbnZcIjtcbmltcG9ydCB7IEJhc2VEb2N1bWVudExvYWRlciB9IGZyb20gXCIuLi9iYXNlLmpzXCI7XG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHRoYXQgZXh0ZW5kcyB0aGUgYEJhc2VEb2N1bWVudExvYWRlcmAgY2xhc3MuIEl0XG4gKiByZXByZXNlbnRzIGEgZG9jdW1lbnQgbG9hZGVyIHRoYXQgbG9hZHMgZG9jdW1lbnRzIGZyb20gYSBidWZmZXIuIFRoZVxuICogYGxvYWQoKWAgbWV0aG9kIGlzIGltcGxlbWVudGVkIHRvIHJlYWQgdGhlIGJ1ZmZlciBjb250ZW50cyBhbmQgbWV0YWRhdGFcbiAqIGJhc2VkIG9uIHRoZSB0eXBlIG9mIGBmaWxlUGF0aE9yQmxvYmAsIGFuZCB0aGVuIGNhbGxzIHRoZSBgcGFyc2UoKWBcbiAqIG1ldGhvZCB0byBwYXJzZSB0aGUgYnVmZmVyIGFuZCByZXR1cm4gdGhlIGRvY3VtZW50cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEJ1ZmZlckxvYWRlciBleHRlbmRzIEJhc2VEb2N1bWVudExvYWRlciB7XG4gICAgY29uc3RydWN0b3IoZmlsZVBhdGhPckJsb2IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZmlsZVBhdGhPckJsb2JcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGZpbGVQYXRoT3JCbG9iXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCByZWFkcyB0aGUgYnVmZmVyIGNvbnRlbnRzIGFuZCBtZXRhZGF0YSBiYXNlZCBvbiB0aGUgdHlwZSBvZlxuICAgICAqIGBmaWxlUGF0aE9yQmxvYmAsIGFuZCB0aGVuIGNhbGxzIHRoZSBgcGFyc2UoKWAgbWV0aG9kIHRvIHBhcnNlIHRoZVxuICAgICAqIGJ1ZmZlciBhbmQgcmV0dXJuIHRoZSBkb2N1bWVudHMuXG4gICAgICogQHJldHVybnMgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYW4gYXJyYXkgb2YgYERvY3VtZW50YCBvYmplY3RzLlxuICAgICAqL1xuICAgIGFzeW5jIGxvYWQoKSB7XG4gICAgICAgIGxldCBidWZmZXI7XG4gICAgICAgIGxldCBtZXRhZGF0YTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpbGVQYXRoT3JCbG9iID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb25zdCB7IHJlYWRGaWxlIH0gPSBhd2FpdCBCdWZmZXJMb2FkZXIuaW1wb3J0cygpO1xuICAgICAgICAgICAgYnVmZmVyID0gYXdhaXQgcmVhZEZpbGUodGhpcy5maWxlUGF0aE9yQmxvYik7XG4gICAgICAgICAgICBtZXRhZGF0YSA9IHsgc291cmNlOiB0aGlzLmZpbGVQYXRoT3JCbG9iIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBidWZmZXIgPSBhd2FpdCB0aGlzLmZpbGVQYXRoT3JCbG9iXG4gICAgICAgICAgICAgICAgLmFycmF5QnVmZmVyKClcbiAgICAgICAgICAgICAgICAudGhlbigoYWIpID0+IEJ1ZmZlci5mcm9tKGFiKSk7XG4gICAgICAgICAgICBtZXRhZGF0YSA9IHsgc291cmNlOiBcImJsb2JcIiwgYmxvYlR5cGU6IHRoaXMuZmlsZVBhdGhPckJsb2IudHlwZSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGJ1ZmZlciwgbWV0YWRhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGF0aWMgbWV0aG9kIHRoYXQgaW1wb3J0cyB0aGUgYHJlYWRGaWxlYCBmdW5jdGlvbiBmcm9tIHRoZVxuICAgICAqIGBmcy9wcm9taXNlc2AgbW9kdWxlIGluIE5vZGUuanMuIEl0IGlzIHVzZWQgdG8gZHluYW1pY2FsbHkgaW1wb3J0IHRoZVxuICAgICAqIGZ1bmN0aW9uIHdoZW4gbmVlZGVkLiBJZiB0aGUgaW1wb3J0IGZhaWxzLCBpdCB0aHJvd3MgYW4gZXJyb3JcbiAgICAgKiBpbmRpY2F0aW5nIHRoYXQgdGhlIGBmcy9wcm9taXNlc2AgbW9kdWxlIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlXG4gICAgICogY3VycmVudCBlbnZpcm9ubWVudC5cbiAgICAgKiBAcmV0dXJucyBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgYHJlYWRGaWxlYCBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgaW1wb3J0cygpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgcmVhZEZpbGUgfSA9IGF3YWl0IGltcG9ydChcIm5vZGU6ZnMvcHJvbWlzZXNcIik7XG4gICAgICAgICAgICByZXR1cm4geyByZWFkRmlsZSB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBmcy9wcm9taXNlcy4gVGV4dExvYWRlciBhdmFpbGFibGUgb25seSBvbiBlbnZpcm9ubWVudCAnbm9kZScuIEl0IGFwcGVhcnMgeW91IGFyZSBydW5uaW5nIGVudmlyb25tZW50ICcke2dldEVudigpfScuIFNlZSBodHRwczovLzxsaW5rIHRvIGRvY3M+IGZvciBhbHRlcm5hdGl2ZXMuYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/langchain/dist/document_loaders/fs/buffer.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/langchain/dist/document_loaders/fs/directory.js":
/*!**********************************************************************!*\
  !*** ./node_modules/langchain/dist/document_loaders/fs/directory.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DirectoryLoader: () => (/* binding */ DirectoryLoader),\n/* harmony export */   UnknownHandling: () => (/* binding */ UnknownHandling)\n/* harmony export */ });\n/* harmony import */ var _langchain_core_utils_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @langchain/core/utils/env */ \"(rsc)/./node_modules/@langchain/core/utils/env.js\");\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base.js */ \"(rsc)/./node_modules/langchain/dist/document_loaders/base.js\");\n\n\n// TypeScript enums are not tree-shakeable, so doing this instead\n// See https://bargsten.org/jsts/enums/\nconst UnknownHandling = {\n    Ignore: \"ignore\",\n    Warn: \"warn\",\n    Error: \"error\",\n};\n/**\n * A document loader that loads documents from a directory. It extends the\n * `BaseDocumentLoader` class and implements the `load()` method.\n * @example\n * ```typescript\n *\n * const directoryLoader = new DirectoryLoader(\n *   \"src/document_loaders/example_data/\",\n *   {\n *     \".pdf\": (path: string) => new PDFLoader(path),\n *   },\n * );\n *\n * const docs = await directoryLoader.load();\n * console.log({ docs });\n *\n * ```\n */\nclass DirectoryLoader extends _base_js__WEBPACK_IMPORTED_MODULE_1__.BaseDocumentLoader {\n    constructor(directoryPath, loaders, recursive = true, unknown = UnknownHandling.Warn) {\n        super();\n        Object.defineProperty(this, \"directoryPath\", {\n            enumerable: true,\n            configurable: true,\n            writable: true,\n            value: directoryPath\n        });\n        Object.defineProperty(this, \"loaders\", {\n            enumerable: true,\n            configurable: true,\n            writable: true,\n            value: loaders\n        });\n        Object.defineProperty(this, \"recursive\", {\n            enumerable: true,\n            configurable: true,\n            writable: true,\n            value: recursive\n        });\n        Object.defineProperty(this, \"unknown\", {\n            enumerable: true,\n            configurable: true,\n            writable: true,\n            value: unknown\n        });\n        if (Object.keys(loaders).length === 0) {\n            throw new Error(\"Must provide at least one loader\");\n        }\n        for (const extension in loaders) {\n            if (Object.hasOwn(loaders, extension)) {\n                if (extension[0] !== \".\") {\n                    throw new Error(`Extension must start with a dot: ${extension}`);\n                }\n            }\n        }\n    }\n    /**\n     * Loads the documents from the directory. If a file is a directory and\n     * `recursive` is `true`, it recursively loads documents from the\n     * subdirectory. If a file is a file, it checks if there is a\n     * corresponding loader function for the file extension in the `loaders`\n     * mapping. If there is, it loads the documents. If there is no\n     * corresponding loader function and `unknown` is set to `Warn`, it logs a\n     * warning message. If `unknown` is set to `Error`, it throws an error.\n     * @returns A promise that resolves to an array of loaded documents.\n     */\n    async load() {\n        const { readdir, extname, resolve } = await DirectoryLoader.imports();\n        const files = await readdir(this.directoryPath, { withFileTypes: true });\n        const documents = [];\n        for (const file of files) {\n            const fullPath = resolve(this.directoryPath, file.name);\n            if (file.isDirectory()) {\n                if (this.recursive) {\n                    const loader = new DirectoryLoader(fullPath, this.loaders, this.recursive, this.unknown);\n                    documents.push(...(await loader.load()));\n                }\n            }\n            else {\n                // I'm aware some things won't be files,\n                // but they will be caught by the \"unknown\" handling below.\n                const loaderFactory = this.loaders[extname(file.name)];\n                if (loaderFactory) {\n                    const loader = loaderFactory(fullPath);\n                    documents.push(...(await loader.load()));\n                }\n                else {\n                    switch (this.unknown) {\n                        case UnknownHandling.Ignore:\n                            break;\n                        case UnknownHandling.Warn:\n                            console.warn(`Unknown file type: ${file.name}`);\n                            break;\n                        case UnknownHandling.Error:\n                            throw new Error(`Unknown file type: ${file.name}`);\n                        default:\n                            throw new Error(`Unknown unknown handling: ${this.unknown}`);\n                    }\n                }\n            }\n        }\n        return documents;\n    }\n    /**\n     * Imports the necessary functions from the `node:path` and\n     * `node:fs/promises` modules. It is used to dynamically import the\n     * functions when needed. If the import fails, it throws an error\n     * indicating that the modules failed to load.\n     * @returns A promise that resolves to an object containing the imported functions.\n     */\n    static async imports() {\n        try {\n            const { extname, resolve } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node:path */ \"node:path\", 19));\n            const { readdir } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node:fs/promises */ \"node:fs/promises\", 19));\n            return { readdir, extname, resolve };\n        }\n        catch (e) {\n            console.error(e);\n            throw new Error(`Failed to load fs/promises. DirectoryLoader available only on environment 'node'. It appears you are running environment '${(0,_langchain_core_utils_env__WEBPACK_IMPORTED_MODULE_0__.getEnv)()}'. See https://<link to docs> for alternatives.`);\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3QvZG9jdW1lbnRfbG9hZGVycy9mcy9kaXJlY3RvcnkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFtRDtBQUNIO0FBQ2hEO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBO0FBQ08sOEJBQThCLHdEQUFrQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsVUFBVTtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNEJBQTRCO0FBQzVDLDBEQUEwRCxxQkFBcUI7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsVUFBVTtBQUN6RTtBQUNBO0FBQ0Esa0VBQWtFLFVBQVU7QUFDNUU7QUFDQSx5RUFBeUUsYUFBYTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CLFFBQVEsd0hBQW1CO0FBQ2xFLG9CQUFvQixVQUFVLFFBQVEsc0lBQTBCO0FBQ2hFLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSx5SkFBeUosaUVBQU0sR0FBRztBQUNsSztBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9MZWdhbCBzZW1hbnRpYyBzZWFyY2ggc2FtcGxlIGFwcC8uL25vZGVfbW9kdWxlcy9sYW5nY2hhaW4vZGlzdC9kb2N1bWVudF9sb2FkZXJzL2ZzL2RpcmVjdG9yeS5qcz9jM2E4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEVudiB9IGZyb20gXCJAbGFuZ2NoYWluL2NvcmUvdXRpbHMvZW52XCI7XG5pbXBvcnQgeyBCYXNlRG9jdW1lbnRMb2FkZXIgfSBmcm9tIFwiLi4vYmFzZS5qc1wiO1xuLy8gVHlwZVNjcmlwdCBlbnVtcyBhcmUgbm90IHRyZWUtc2hha2VhYmxlLCBzbyBkb2luZyB0aGlzIGluc3RlYWRcbi8vIFNlZSBodHRwczovL2JhcmdzdGVuLm9yZy9qc3RzL2VudW1zL1xuZXhwb3J0IGNvbnN0IFVua25vd25IYW5kbGluZyA9IHtcbiAgICBJZ25vcmU6IFwiaWdub3JlXCIsXG4gICAgV2FybjogXCJ3YXJuXCIsXG4gICAgRXJyb3I6IFwiZXJyb3JcIixcbn07XG4vKipcbiAqIEEgZG9jdW1lbnQgbG9hZGVyIHRoYXQgbG9hZHMgZG9jdW1lbnRzIGZyb20gYSBkaXJlY3RvcnkuIEl0IGV4dGVuZHMgdGhlXG4gKiBgQmFzZURvY3VtZW50TG9hZGVyYCBjbGFzcyBhbmQgaW1wbGVtZW50cyB0aGUgYGxvYWQoKWAgbWV0aG9kLlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqXG4gKiBjb25zdCBkaXJlY3RvcnlMb2FkZXIgPSBuZXcgRGlyZWN0b3J5TG9hZGVyKFxuICogICBcInNyYy9kb2N1bWVudF9sb2FkZXJzL2V4YW1wbGVfZGF0YS9cIixcbiAqICAge1xuICogICAgIFwiLnBkZlwiOiAocGF0aDogc3RyaW5nKSA9PiBuZXcgUERGTG9hZGVyKHBhdGgpLFxuICogICB9LFxuICogKTtcbiAqXG4gKiBjb25zdCBkb2NzID0gYXdhaXQgZGlyZWN0b3J5TG9hZGVyLmxvYWQoKTtcbiAqIGNvbnNvbGUubG9nKHsgZG9jcyB9KTtcbiAqXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIERpcmVjdG9yeUxvYWRlciBleHRlbmRzIEJhc2VEb2N1bWVudExvYWRlciB7XG4gICAgY29uc3RydWN0b3IoZGlyZWN0b3J5UGF0aCwgbG9hZGVycywgcmVjdXJzaXZlID0gdHJ1ZSwgdW5rbm93biA9IFVua25vd25IYW5kbGluZy5XYXJuKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImRpcmVjdG9yeVBhdGhcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGRpcmVjdG9yeVBhdGhcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxvYWRlcnNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGxvYWRlcnNcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInJlY3Vyc2l2ZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogcmVjdXJzaXZlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJ1bmtub3duXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB1bmtub3duXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMobG9hZGVycykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYXQgbGVhc3Qgb25lIGxvYWRlclwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBpbiBsb2FkZXJzKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0Lmhhc093bihsb2FkZXJzLCBleHRlbnNpb24pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvblswXSAhPT0gXCIuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHRlbnNpb24gbXVzdCBzdGFydCB3aXRoIGEgZG90OiAke2V4dGVuc2lvbn1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIGRvY3VtZW50cyBmcm9tIHRoZSBkaXJlY3RvcnkuIElmIGEgZmlsZSBpcyBhIGRpcmVjdG9yeSBhbmRcbiAgICAgKiBgcmVjdXJzaXZlYCBpcyBgdHJ1ZWAsIGl0IHJlY3Vyc2l2ZWx5IGxvYWRzIGRvY3VtZW50cyBmcm9tIHRoZVxuICAgICAqIHN1YmRpcmVjdG9yeS4gSWYgYSBmaWxlIGlzIGEgZmlsZSwgaXQgY2hlY2tzIGlmIHRoZXJlIGlzIGFcbiAgICAgKiBjb3JyZXNwb25kaW5nIGxvYWRlciBmdW5jdGlvbiBmb3IgdGhlIGZpbGUgZXh0ZW5zaW9uIGluIHRoZSBgbG9hZGVyc2BcbiAgICAgKiBtYXBwaW5nLiBJZiB0aGVyZSBpcywgaXQgbG9hZHMgdGhlIGRvY3VtZW50cy4gSWYgdGhlcmUgaXMgbm9cbiAgICAgKiBjb3JyZXNwb25kaW5nIGxvYWRlciBmdW5jdGlvbiBhbmQgYHVua25vd25gIGlzIHNldCB0byBgV2FybmAsIGl0IGxvZ3MgYVxuICAgICAqIHdhcm5pbmcgbWVzc2FnZS4gSWYgYHVua25vd25gIGlzIHNldCB0byBgRXJyb3JgLCBpdCB0aHJvd3MgYW4gZXJyb3IuXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gYXJyYXkgb2YgbG9hZGVkIGRvY3VtZW50cy5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkKCkge1xuICAgICAgICBjb25zdCB7IHJlYWRkaXIsIGV4dG5hbWUsIHJlc29sdmUgfSA9IGF3YWl0IERpcmVjdG9yeUxvYWRlci5pbXBvcnRzKCk7XG4gICAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgcmVhZGRpcih0aGlzLmRpcmVjdG9yeVBhdGgsIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgY29uc3QgZnVsbFBhdGggPSByZXNvbHZlKHRoaXMuZGlyZWN0b3J5UGF0aCwgZmlsZS5uYW1lKTtcbiAgICAgICAgICAgIGlmIChmaWxlLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9hZGVyID0gbmV3IERpcmVjdG9yeUxvYWRlcihmdWxsUGF0aCwgdGhpcy5sb2FkZXJzLCB0aGlzLnJlY3Vyc2l2ZSwgdGhpcy51bmtub3duKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRzLnB1c2goLi4uKGF3YWl0IGxvYWRlci5sb2FkKCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJJ20gYXdhcmUgc29tZSB0aGluZ3Mgd29uJ3QgYmUgZmlsZXMsXG4gICAgICAgICAgICAgICAgLy8gYnV0IHRoZXkgd2lsbCBiZSBjYXVnaHQgYnkgdGhlIFwidW5rbm93blwiIGhhbmRsaW5nIGJlbG93LlxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRlckZhY3RvcnkgPSB0aGlzLmxvYWRlcnNbZXh0bmFtZShmaWxlLm5hbWUpXTtcbiAgICAgICAgICAgICAgICBpZiAobG9hZGVyRmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2FkZXIgPSBsb2FkZXJGYWN0b3J5KGZ1bGxQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRzLnB1c2goLi4uKGF3YWl0IGxvYWRlci5sb2FkKCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy51bmtub3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFVua25vd25IYW5kbGluZy5JZ25vcmU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFVua25vd25IYW5kbGluZy5XYXJuOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVW5rbm93biBmaWxlIHR5cGU6ICR7ZmlsZS5uYW1lfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBVbmtub3duSGFuZGxpbmcuRXJyb3I6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGZpbGUgdHlwZTogJHtmaWxlLm5hbWV9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB1bmtub3duIGhhbmRsaW5nOiAke3RoaXMudW5rbm93bn1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZG9jdW1lbnRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbXBvcnRzIHRoZSBuZWNlc3NhcnkgZnVuY3Rpb25zIGZyb20gdGhlIGBub2RlOnBhdGhgIGFuZFxuICAgICAqIGBub2RlOmZzL3Byb21pc2VzYCBtb2R1bGVzLiBJdCBpcyB1c2VkIHRvIGR5bmFtaWNhbGx5IGltcG9ydCB0aGVcbiAgICAgKiBmdW5jdGlvbnMgd2hlbiBuZWVkZWQuIElmIHRoZSBpbXBvcnQgZmFpbHMsIGl0IHRocm93cyBhbiBlcnJvclxuICAgICAqIGluZGljYXRpbmcgdGhhdCB0aGUgbW9kdWxlcyBmYWlsZWQgdG8gbG9hZC5cbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgaW1wb3J0ZWQgZnVuY3Rpb25zLlxuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyBpbXBvcnRzKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBleHRuYW1lLCByZXNvbHZlIH0gPSBhd2FpdCBpbXBvcnQoXCJub2RlOnBhdGhcIik7XG4gICAgICAgICAgICBjb25zdCB7IHJlYWRkaXIgfSA9IGF3YWl0IGltcG9ydChcIm5vZGU6ZnMvcHJvbWlzZXNcIik7XG4gICAgICAgICAgICByZXR1cm4geyByZWFkZGlyLCBleHRuYW1lLCByZXNvbHZlIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBsb2FkIGZzL3Byb21pc2VzLiBEaXJlY3RvcnlMb2FkZXIgYXZhaWxhYmxlIG9ubHkgb24gZW52aXJvbm1lbnQgJ25vZGUnLiBJdCBhcHBlYXJzIHlvdSBhcmUgcnVubmluZyBlbnZpcm9ubWVudCAnJHtnZXRFbnYoKX0nLiBTZWUgaHR0cHM6Ly88bGluayB0byBkb2NzPiBmb3IgYWx0ZXJuYXRpdmVzLmApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/langchain/dist/document_loaders/fs/directory.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/langchain/document_loaders/fs/buffer.js":
/*!**************************************************************!*\
  !*** ./node_modules/langchain/document_loaders/fs/buffer.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BufferLoader: () => (/* reexport safe */ _dist_document_loaders_fs_buffer_js__WEBPACK_IMPORTED_MODULE_0__.BufferLoader)
/* harmony export */ });
/* harmony import */ var _dist_document_loaders_fs_buffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dist/document_loaders/fs/buffer.js */ "(rsc)/./node_modules/langchain/dist/document_loaders/fs/buffer.js");


/***/ }),

/***/ "(rsc)/./node_modules/langchain/document_loaders/fs/directory.js":
/*!*****************************************************************!*\
  !*** ./node_modules/langchain/document_loaders/fs/directory.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DirectoryLoader: () => (/* reexport safe */ _dist_document_loaders_fs_directory_js__WEBPACK_IMPORTED_MODULE_0__.DirectoryLoader),
/* harmony export */   UnknownHandling: () => (/* reexport safe */ _dist_document_loaders_fs_directory_js__WEBPACK_IMPORTED_MODULE_0__.UnknownHandling)
/* harmony export */ });
/* harmony import */ var _dist_document_loaders_fs_directory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dist/document_loaders/fs/directory.js */ "(rsc)/./node_modules/langchain/dist/document_loaders/fs/directory.js");


/***/ })

};
;