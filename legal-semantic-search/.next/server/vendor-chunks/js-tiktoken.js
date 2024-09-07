"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/js-tiktoken";
exports.ids = ["vendor-chunks/js-tiktoken"];
exports.modules = {

/***/ "(rsc)/./node_modules/js-tiktoken/dist/chunk-XX6PTLQF.js":
/*!*********************************************************!*\
  !*** ./node_modules/js-tiktoken/dist/chunk-XX6PTLQF.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tiktoken: () => (/* binding */ Tiktoken),\n/* harmony export */   getEncodingNameForModel: () => (/* binding */ getEncodingNameForModel),\n/* harmony export */   never: () => (/* binding */ never)\n/* harmony export */ });\n/* harmony import */ var base64_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base64-js */ \"(rsc)/./node_modules/base64-js/index.js\");\n\n\nvar __defProp = Object.defineProperty;\nvar __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;\nvar __publicField = (obj, key, value) => {\n  __defNormalProp(obj, typeof key !== \"symbol\" ? key + \"\" : key, value);\n  return value;\n};\n\n// src/utils.ts\nfunction never(_) {\n}\nfunction bytePairMerge(piece, ranks) {\n  let parts = Array.from(\n    { length: piece.length },\n    (_, i) => ({ start: i, end: i + 1 })\n  );\n  while (parts.length > 1) {\n    let minRank = null;\n    for (let i = 0; i < parts.length - 1; i++) {\n      const slice = piece.slice(parts[i].start, parts[i + 1].end);\n      const rank = ranks.get(slice.join(\",\"));\n      if (rank == null)\n        continue;\n      if (minRank == null || rank < minRank[0]) {\n        minRank = [rank, i];\n      }\n    }\n    if (minRank != null) {\n      const i = minRank[1];\n      parts[i] = { start: parts[i].start, end: parts[i + 1].end };\n      parts.splice(i + 1, 1);\n    } else {\n      break;\n    }\n  }\n  return parts;\n}\nfunction bytePairEncode(piece, ranks) {\n  if (piece.length === 1)\n    return [ranks.get(piece.join(\",\"))];\n  return bytePairMerge(piece, ranks).map((p) => ranks.get(piece.slice(p.start, p.end).join(\",\"))).filter((x) => x != null);\n}\nfunction escapeRegex(str) {\n  return str.replace(/[\\\\^$*+?.()|[\\]{}]/g, \"\\\\$&\");\n}\nvar _Tiktoken = class {\n  /** @internal */\n  specialTokens;\n  /** @internal */\n  inverseSpecialTokens;\n  /** @internal */\n  patStr;\n  /** @internal */\n  textEncoder = new TextEncoder();\n  /** @internal */\n  textDecoder = new TextDecoder(\"utf-8\");\n  /** @internal */\n  rankMap = /* @__PURE__ */ new Map();\n  /** @internal */\n  textMap = /* @__PURE__ */ new Map();\n  constructor(ranks, extendedSpecialTokens) {\n    this.patStr = ranks.pat_str;\n    const uncompressed = ranks.bpe_ranks.split(\"\\n\").filter(Boolean).reduce((memo, x) => {\n      const [_, offsetStr, ...tokens] = x.split(\" \");\n      const offset = Number.parseInt(offsetStr, 10);\n      tokens.forEach((token, i) => memo[token] = offset + i);\n      return memo;\n    }, {});\n    for (const [token, rank] of Object.entries(uncompressed)) {\n      const bytes = base64_js__WEBPACK_IMPORTED_MODULE_0__.toByteArray(token);\n      this.rankMap.set(bytes.join(\",\"), rank);\n      this.textMap.set(rank, bytes);\n    }\n    this.specialTokens = { ...ranks.special_tokens, ...extendedSpecialTokens };\n    this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text, rank]) => {\n      memo[rank] = this.textEncoder.encode(text);\n      return memo;\n    }, {});\n  }\n  encode(text, allowedSpecial = [], disallowedSpecial = \"all\") {\n    const regexes = new RegExp(this.patStr, \"ug\");\n    const specialRegex = _Tiktoken.specialTokenRegex(\n      Object.keys(this.specialTokens)\n    );\n    const ret = [];\n    const allowedSpecialSet = new Set(\n      allowedSpecial === \"all\" ? Object.keys(this.specialTokens) : allowedSpecial\n    );\n    const disallowedSpecialSet = new Set(\n      disallowedSpecial === \"all\" ? Object.keys(this.specialTokens).filter(\n        (x) => !allowedSpecialSet.has(x)\n      ) : disallowedSpecial\n    );\n    if (disallowedSpecialSet.size > 0) {\n      const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([\n        ...disallowedSpecialSet\n      ]);\n      const specialMatch = text.match(disallowedSpecialRegex);\n      if (specialMatch != null) {\n        throw new Error(\n          `The text contains a special token that is not allowed: ${specialMatch[0]}`\n        );\n      }\n    }\n    let start = 0;\n    while (true) {\n      let nextSpecial = null;\n      let startFind = start;\n      while (true) {\n        specialRegex.lastIndex = startFind;\n        nextSpecial = specialRegex.exec(text);\n        if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0]))\n          break;\n        startFind = nextSpecial.index + 1;\n      }\n      const end = nextSpecial?.index ?? text.length;\n      for (const match of text.substring(start, end).matchAll(regexes)) {\n        const piece = this.textEncoder.encode(match[0]);\n        const token2 = this.rankMap.get(piece.join(\",\"));\n        if (token2 != null) {\n          ret.push(token2);\n          continue;\n        }\n        ret.push(...bytePairEncode(piece, this.rankMap));\n      }\n      if (nextSpecial == null)\n        break;\n      let token = this.specialTokens[nextSpecial[0]];\n      ret.push(token);\n      start = nextSpecial.index + nextSpecial[0].length;\n    }\n    return ret;\n  }\n  decode(tokens) {\n    const res = [];\n    let length = 0;\n    for (let i2 = 0; i2 < tokens.length; ++i2) {\n      const token = tokens[i2];\n      const bytes = this.textMap.get(token) ?? this.inverseSpecialTokens[token];\n      if (bytes != null) {\n        res.push(bytes);\n        length += bytes.length;\n      }\n    }\n    const mergedArray = new Uint8Array(length);\n    let i = 0;\n    for (const bytes of res) {\n      mergedArray.set(bytes, i);\n      i += bytes.length;\n    }\n    return this.textDecoder.decode(mergedArray);\n  }\n};\nvar Tiktoken = _Tiktoken;\n__publicField(Tiktoken, \"specialTokenRegex\", (tokens) => {\n  return new RegExp(tokens.map((i) => escapeRegex(i)).join(\"|\"), \"g\");\n});\nfunction getEncodingNameForModel(model) {\n  switch (model) {\n    case \"gpt2\": {\n      return \"gpt2\";\n    }\n    case \"code-cushman-001\":\n    case \"code-cushman-002\":\n    case \"code-davinci-001\":\n    case \"code-davinci-002\":\n    case \"cushman-codex\":\n    case \"davinci-codex\":\n    case \"davinci-002\":\n    case \"text-davinci-002\":\n    case \"text-davinci-003\": {\n      return \"p50k_base\";\n    }\n    case \"code-davinci-edit-001\":\n    case \"text-davinci-edit-001\": {\n      return \"p50k_edit\";\n    }\n    case \"ada\":\n    case \"babbage\":\n    case \"babbage-002\":\n    case \"code-search-ada-code-001\":\n    case \"code-search-babbage-code-001\":\n    case \"curie\":\n    case \"davinci\":\n    case \"text-ada-001\":\n    case \"text-babbage-001\":\n    case \"text-curie-001\":\n    case \"text-davinci-001\":\n    case \"text-search-ada-doc-001\":\n    case \"text-search-babbage-doc-001\":\n    case \"text-search-curie-doc-001\":\n    case \"text-search-davinci-doc-001\":\n    case \"text-similarity-ada-001\":\n    case \"text-similarity-babbage-001\":\n    case \"text-similarity-curie-001\":\n    case \"text-similarity-davinci-001\": {\n      return \"r50k_base\";\n    }\n    case \"gpt-3.5-turbo-instruct-0914\":\n    case \"gpt-3.5-turbo-instruct\":\n    case \"gpt-3.5-turbo-16k-0613\":\n    case \"gpt-3.5-turbo-16k\":\n    case \"gpt-3.5-turbo-0613\":\n    case \"gpt-3.5-turbo-0301\":\n    case \"gpt-3.5-turbo\":\n    case \"gpt-4-32k-0613\":\n    case \"gpt-4-32k-0314\":\n    case \"gpt-4-32k\":\n    case \"gpt-4-0613\":\n    case \"gpt-4-0314\":\n    case \"gpt-4\":\n    case \"gpt-3.5-turbo-1106\":\n    case \"gpt-35-turbo\":\n    case \"gpt-4-1106-preview\":\n    case \"gpt-4-vision-preview\":\n    case \"gpt-3.5-turbo-0125\":\n    case \"gpt-4-turbo\":\n    case \"gpt-4-turbo-2024-04-09\":\n    case \"gpt-4-turbo-preview\":\n    case \"gpt-4-0125-preview\":\n    case \"text-embedding-ada-002\":\n    case \"text-embedding-3-small\":\n    case \"text-embedding-3-large\": {\n      return \"cl100k_base\";\n    }\n    case \"gpt-4o\":\n    case \"gpt-4o-2024-05-13\":\n    case \"gpt-4o-2024-08-06\":\n    case \"gpt-4o-mini-2024-07-18\":\n    case \"gpt-4o-mini\": {\n      return \"o200k_base\";\n    }\n    default:\n      throw new Error(\"Unknown model\");\n  }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvanMtdGlrdG9rZW4vZGlzdC9jaHVuay1YWDZQVExRRi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQStCOztBQUUvQjtBQUNBLDhFQUE4RSw2REFBNkQ7QUFDM0k7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sc0JBQXNCO0FBQzVCLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLElBQUk7QUFDVDtBQUNBLG9CQUFvQixrREFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSTtBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLGdCQUFnQjtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9MZWdhbCBzZW1hbnRpYyBzZWFyY2ggc2FtcGxlIGFwcC8uL25vZGVfbW9kdWxlcy9qcy10aWt0b2tlbi9kaXN0L2NodW5rLVhYNlBUTFFGLmpzP2Q5MzEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2U2NCBmcm9tICdiYXNlNjQtanMnO1xuXG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZGVmTm9ybWFsUHJvcCA9IChvYmosIGtleSwgdmFsdWUpID0+IGtleSBpbiBvYmogPyBfX2RlZlByb3Aob2JqLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWUgfSkgOiBvYmpba2V5XSA9IHZhbHVlO1xudmFyIF9fcHVibGljRmllbGQgPSAob2JqLCBrZXksIHZhbHVlKSA9PiB7XG4gIF9fZGVmTm9ybWFsUHJvcChvYmosIHR5cGVvZiBrZXkgIT09IFwic3ltYm9sXCIgPyBrZXkgKyBcIlwiIDoga2V5LCB2YWx1ZSk7XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbi8vIHNyYy91dGlscy50c1xuZnVuY3Rpb24gbmV2ZXIoXykge1xufVxuZnVuY3Rpb24gYnl0ZVBhaXJNZXJnZShwaWVjZSwgcmFua3MpIHtcbiAgbGV0IHBhcnRzID0gQXJyYXkuZnJvbShcbiAgICB7IGxlbmd0aDogcGllY2UubGVuZ3RoIH0sXG4gICAgKF8sIGkpID0+ICh7IHN0YXJ0OiBpLCBlbmQ6IGkgKyAxIH0pXG4gICk7XG4gIHdoaWxlIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgbGV0IG1pblJhbmsgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBjb25zdCBzbGljZSA9IHBpZWNlLnNsaWNlKHBhcnRzW2ldLnN0YXJ0LCBwYXJ0c1tpICsgMV0uZW5kKTtcbiAgICAgIGNvbnN0IHJhbmsgPSByYW5rcy5nZXQoc2xpY2Uuam9pbihcIixcIikpO1xuICAgICAgaWYgKHJhbmsgPT0gbnVsbClcbiAgICAgICAgY29udGludWU7XG4gICAgICBpZiAobWluUmFuayA9PSBudWxsIHx8IHJhbmsgPCBtaW5SYW5rWzBdKSB7XG4gICAgICAgIG1pblJhbmsgPSBbcmFuaywgaV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChtaW5SYW5rICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGkgPSBtaW5SYW5rWzFdO1xuICAgICAgcGFydHNbaV0gPSB7IHN0YXJ0OiBwYXJ0c1tpXS5zdGFydCwgZW5kOiBwYXJ0c1tpICsgMV0uZW5kIH07XG4gICAgICBwYXJ0cy5zcGxpY2UoaSArIDEsIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBhcnRzO1xufVxuZnVuY3Rpb24gYnl0ZVBhaXJFbmNvZGUocGllY2UsIHJhbmtzKSB7XG4gIGlmIChwaWVjZS5sZW5ndGggPT09IDEpXG4gICAgcmV0dXJuIFtyYW5rcy5nZXQocGllY2Uuam9pbihcIixcIikpXTtcbiAgcmV0dXJuIGJ5dGVQYWlyTWVyZ2UocGllY2UsIHJhbmtzKS5tYXAoKHApID0+IHJhbmtzLmdldChwaWVjZS5zbGljZShwLnN0YXJ0LCBwLmVuZCkuam9pbihcIixcIikpKS5maWx0ZXIoKHgpID0+IHggIT0gbnVsbCk7XG59XG5mdW5jdGlvbiBlc2NhcGVSZWdleChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFxcXF4kKis/LigpfFtcXF17fV0vZywgXCJcXFxcJCZcIik7XG59XG52YXIgX1Rpa3Rva2VuID0gY2xhc3Mge1xuICAvKiogQGludGVybmFsICovXG4gIHNwZWNpYWxUb2tlbnM7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgaW52ZXJzZVNwZWNpYWxUb2tlbnM7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcGF0U3RyO1xuICAvKiogQGludGVybmFsICovXG4gIHRleHRFbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgdGV4dERlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICByYW5rTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICB0ZXh0TWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgY29uc3RydWN0b3IocmFua3MsIGV4dGVuZGVkU3BlY2lhbFRva2Vucykge1xuICAgIHRoaXMucGF0U3RyID0gcmFua3MucGF0X3N0cjtcbiAgICBjb25zdCB1bmNvbXByZXNzZWQgPSByYW5rcy5icGVfcmFua3Muc3BsaXQoXCJcXG5cIikuZmlsdGVyKEJvb2xlYW4pLnJlZHVjZSgobWVtbywgeCkgPT4ge1xuICAgICAgY29uc3QgW18sIG9mZnNldFN0ciwgLi4udG9rZW5zXSA9IHguc3BsaXQoXCIgXCIpO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gTnVtYmVyLnBhcnNlSW50KG9mZnNldFN0ciwgMTApO1xuICAgICAgdG9rZW5zLmZvckVhY2goKHRva2VuLCBpKSA9PiBtZW1vW3Rva2VuXSA9IG9mZnNldCArIGkpO1xuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfSwge30pO1xuICAgIGZvciAoY29uc3QgW3Rva2VuLCByYW5rXSBvZiBPYmplY3QuZW50cmllcyh1bmNvbXByZXNzZWQpKSB7XG4gICAgICBjb25zdCBieXRlcyA9IGJhc2U2NC50b0J5dGVBcnJheSh0b2tlbik7XG4gICAgICB0aGlzLnJhbmtNYXAuc2V0KGJ5dGVzLmpvaW4oXCIsXCIpLCByYW5rKTtcbiAgICAgIHRoaXMudGV4dE1hcC5zZXQocmFuaywgYnl0ZXMpO1xuICAgIH1cbiAgICB0aGlzLnNwZWNpYWxUb2tlbnMgPSB7IC4uLnJhbmtzLnNwZWNpYWxfdG9rZW5zLCAuLi5leHRlbmRlZFNwZWNpYWxUb2tlbnMgfTtcbiAgICB0aGlzLmludmVyc2VTcGVjaWFsVG9rZW5zID0gT2JqZWN0LmVudHJpZXModGhpcy5zcGVjaWFsVG9rZW5zKS5yZWR1Y2UoKG1lbW8sIFt0ZXh0LCByYW5rXSkgPT4ge1xuICAgICAgbWVtb1tyYW5rXSA9IHRoaXMudGV4dEVuY29kZXIuZW5jb2RlKHRleHQpO1xuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfSwge30pO1xuICB9XG4gIGVuY29kZSh0ZXh0LCBhbGxvd2VkU3BlY2lhbCA9IFtdLCBkaXNhbGxvd2VkU3BlY2lhbCA9IFwiYWxsXCIpIHtcbiAgICBjb25zdCByZWdleGVzID0gbmV3IFJlZ0V4cCh0aGlzLnBhdFN0ciwgXCJ1Z1wiKTtcbiAgICBjb25zdCBzcGVjaWFsUmVnZXggPSBfVGlrdG9rZW4uc3BlY2lhbFRva2VuUmVnZXgoXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnNwZWNpYWxUb2tlbnMpXG4gICAgKTtcbiAgICBjb25zdCByZXQgPSBbXTtcbiAgICBjb25zdCBhbGxvd2VkU3BlY2lhbFNldCA9IG5ldyBTZXQoXG4gICAgICBhbGxvd2VkU3BlY2lhbCA9PT0gXCJhbGxcIiA/IE9iamVjdC5rZXlzKHRoaXMuc3BlY2lhbFRva2VucykgOiBhbGxvd2VkU3BlY2lhbFxuICAgICk7XG4gICAgY29uc3QgZGlzYWxsb3dlZFNwZWNpYWxTZXQgPSBuZXcgU2V0KFxuICAgICAgZGlzYWxsb3dlZFNwZWNpYWwgPT09IFwiYWxsXCIgPyBPYmplY3Qua2V5cyh0aGlzLnNwZWNpYWxUb2tlbnMpLmZpbHRlcihcbiAgICAgICAgKHgpID0+ICFhbGxvd2VkU3BlY2lhbFNldC5oYXMoeClcbiAgICAgICkgOiBkaXNhbGxvd2VkU3BlY2lhbFxuICAgICk7XG4gICAgaWYgKGRpc2FsbG93ZWRTcGVjaWFsU2V0LnNpemUgPiAwKSB7XG4gICAgICBjb25zdCBkaXNhbGxvd2VkU3BlY2lhbFJlZ2V4ID0gX1Rpa3Rva2VuLnNwZWNpYWxUb2tlblJlZ2V4KFtcbiAgICAgICAgLi4uZGlzYWxsb3dlZFNwZWNpYWxTZXRcbiAgICAgIF0pO1xuICAgICAgY29uc3Qgc3BlY2lhbE1hdGNoID0gdGV4dC5tYXRjaChkaXNhbGxvd2VkU3BlY2lhbFJlZ2V4KTtcbiAgICAgIGlmIChzcGVjaWFsTWF0Y2ggIT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFRoZSB0ZXh0IGNvbnRhaW5zIGEgc3BlY2lhbCB0b2tlbiB0aGF0IGlzIG5vdCBhbGxvd2VkOiAke3NwZWNpYWxNYXRjaFswXX1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzdGFydCA9IDA7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGxldCBuZXh0U3BlY2lhbCA9IG51bGw7XG4gICAgICBsZXQgc3RhcnRGaW5kID0gc3RhcnQ7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBzcGVjaWFsUmVnZXgubGFzdEluZGV4ID0gc3RhcnRGaW5kO1xuICAgICAgICBuZXh0U3BlY2lhbCA9IHNwZWNpYWxSZWdleC5leGVjKHRleHQpO1xuICAgICAgICBpZiAobmV4dFNwZWNpYWwgPT0gbnVsbCB8fCBhbGxvd2VkU3BlY2lhbFNldC5oYXMobmV4dFNwZWNpYWxbMF0pKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBzdGFydEZpbmQgPSBuZXh0U3BlY2lhbC5pbmRleCArIDE7XG4gICAgICB9XG4gICAgICBjb25zdCBlbmQgPSBuZXh0U3BlY2lhbD8uaW5kZXggPz8gdGV4dC5sZW5ndGg7XG4gICAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpLm1hdGNoQWxsKHJlZ2V4ZXMpKSB7XG4gICAgICAgIGNvbnN0IHBpZWNlID0gdGhpcy50ZXh0RW5jb2Rlci5lbmNvZGUobWF0Y2hbMF0pO1xuICAgICAgICBjb25zdCB0b2tlbjIgPSB0aGlzLnJhbmtNYXAuZ2V0KHBpZWNlLmpvaW4oXCIsXCIpKTtcbiAgICAgICAgaWYgKHRva2VuMiAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0LnB1c2godG9rZW4yKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICByZXQucHVzaCguLi5ieXRlUGFpckVuY29kZShwaWVjZSwgdGhpcy5yYW5rTWFwKSk7XG4gICAgICB9XG4gICAgICBpZiAobmV4dFNwZWNpYWwgPT0gbnVsbClcbiAgICAgICAgYnJlYWs7XG4gICAgICBsZXQgdG9rZW4gPSB0aGlzLnNwZWNpYWxUb2tlbnNbbmV4dFNwZWNpYWxbMF1dO1xuICAgICAgcmV0LnB1c2godG9rZW4pO1xuICAgICAgc3RhcnQgPSBuZXh0U3BlY2lhbC5pbmRleCArIG5leHRTcGVjaWFsWzBdLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuICBkZWNvZGUodG9rZW5zKSB7XG4gICAgY29uc3QgcmVzID0gW107XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaTIgPSAwOyBpMiA8IHRva2Vucy5sZW5ndGg7ICsraTIpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2kyXTtcbiAgICAgIGNvbnN0IGJ5dGVzID0gdGhpcy50ZXh0TWFwLmdldCh0b2tlbikgPz8gdGhpcy5pbnZlcnNlU3BlY2lhbFRva2Vuc1t0b2tlbl07XG4gICAgICBpZiAoYnl0ZXMgIT0gbnVsbCkge1xuICAgICAgICByZXMucHVzaChieXRlcyk7XG4gICAgICAgIGxlbmd0aCArPSBieXRlcy5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG1lcmdlZEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChjb25zdCBieXRlcyBvZiByZXMpIHtcbiAgICAgIG1lcmdlZEFycmF5LnNldChieXRlcywgaSk7XG4gICAgICBpICs9IGJ5dGVzLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudGV4dERlY29kZXIuZGVjb2RlKG1lcmdlZEFycmF5KTtcbiAgfVxufTtcbnZhciBUaWt0b2tlbiA9IF9UaWt0b2tlbjtcbl9fcHVibGljRmllbGQoVGlrdG9rZW4sIFwic3BlY2lhbFRva2VuUmVnZXhcIiwgKHRva2VucykgPT4ge1xuICByZXR1cm4gbmV3IFJlZ0V4cCh0b2tlbnMubWFwKChpKSA9PiBlc2NhcGVSZWdleChpKSkuam9pbihcInxcIiksIFwiZ1wiKTtcbn0pO1xuZnVuY3Rpb24gZ2V0RW5jb2RpbmdOYW1lRm9yTW9kZWwobW9kZWwpIHtcbiAgc3dpdGNoIChtb2RlbCkge1xuICAgIGNhc2UgXCJncHQyXCI6IHtcbiAgICAgIHJldHVybiBcImdwdDJcIjtcbiAgICB9XG4gICAgY2FzZSBcImNvZGUtY3VzaG1hbi0wMDFcIjpcbiAgICBjYXNlIFwiY29kZS1jdXNobWFuLTAwMlwiOlxuICAgIGNhc2UgXCJjb2RlLWRhdmluY2ktMDAxXCI6XG4gICAgY2FzZSBcImNvZGUtZGF2aW5jaS0wMDJcIjpcbiAgICBjYXNlIFwiY3VzaG1hbi1jb2RleFwiOlxuICAgIGNhc2UgXCJkYXZpbmNpLWNvZGV4XCI6XG4gICAgY2FzZSBcImRhdmluY2ktMDAyXCI6XG4gICAgY2FzZSBcInRleHQtZGF2aW5jaS0wMDJcIjpcbiAgICBjYXNlIFwidGV4dC1kYXZpbmNpLTAwM1wiOiB7XG4gICAgICByZXR1cm4gXCJwNTBrX2Jhc2VcIjtcbiAgICB9XG4gICAgY2FzZSBcImNvZGUtZGF2aW5jaS1lZGl0LTAwMVwiOlxuICAgIGNhc2UgXCJ0ZXh0LWRhdmluY2ktZWRpdC0wMDFcIjoge1xuICAgICAgcmV0dXJuIFwicDUwa19lZGl0XCI7XG4gICAgfVxuICAgIGNhc2UgXCJhZGFcIjpcbiAgICBjYXNlIFwiYmFiYmFnZVwiOlxuICAgIGNhc2UgXCJiYWJiYWdlLTAwMlwiOlxuICAgIGNhc2UgXCJjb2RlLXNlYXJjaC1hZGEtY29kZS0wMDFcIjpcbiAgICBjYXNlIFwiY29kZS1zZWFyY2gtYmFiYmFnZS1jb2RlLTAwMVwiOlxuICAgIGNhc2UgXCJjdXJpZVwiOlxuICAgIGNhc2UgXCJkYXZpbmNpXCI6XG4gICAgY2FzZSBcInRleHQtYWRhLTAwMVwiOlxuICAgIGNhc2UgXCJ0ZXh0LWJhYmJhZ2UtMDAxXCI6XG4gICAgY2FzZSBcInRleHQtY3VyaWUtMDAxXCI6XG4gICAgY2FzZSBcInRleHQtZGF2aW5jaS0wMDFcIjpcbiAgICBjYXNlIFwidGV4dC1zZWFyY2gtYWRhLWRvYy0wMDFcIjpcbiAgICBjYXNlIFwidGV4dC1zZWFyY2gtYmFiYmFnZS1kb2MtMDAxXCI6XG4gICAgY2FzZSBcInRleHQtc2VhcmNoLWN1cmllLWRvYy0wMDFcIjpcbiAgICBjYXNlIFwidGV4dC1zZWFyY2gtZGF2aW5jaS1kb2MtMDAxXCI6XG4gICAgY2FzZSBcInRleHQtc2ltaWxhcml0eS1hZGEtMDAxXCI6XG4gICAgY2FzZSBcInRleHQtc2ltaWxhcml0eS1iYWJiYWdlLTAwMVwiOlxuICAgIGNhc2UgXCJ0ZXh0LXNpbWlsYXJpdHktY3VyaWUtMDAxXCI6XG4gICAgY2FzZSBcInRleHQtc2ltaWxhcml0eS1kYXZpbmNpLTAwMVwiOiB7XG4gICAgICByZXR1cm4gXCJyNTBrX2Jhc2VcIjtcbiAgICB9XG4gICAgY2FzZSBcImdwdC0zLjUtdHVyYm8taW5zdHJ1Y3QtMDkxNFwiOlxuICAgIGNhc2UgXCJncHQtMy41LXR1cmJvLWluc3RydWN0XCI6XG4gICAgY2FzZSBcImdwdC0zLjUtdHVyYm8tMTZrLTA2MTNcIjpcbiAgICBjYXNlIFwiZ3B0LTMuNS10dXJiby0xNmtcIjpcbiAgICBjYXNlIFwiZ3B0LTMuNS10dXJiby0wNjEzXCI6XG4gICAgY2FzZSBcImdwdC0zLjUtdHVyYm8tMDMwMVwiOlxuICAgIGNhc2UgXCJncHQtMy41LXR1cmJvXCI6XG4gICAgY2FzZSBcImdwdC00LTMyay0wNjEzXCI6XG4gICAgY2FzZSBcImdwdC00LTMyay0wMzE0XCI6XG4gICAgY2FzZSBcImdwdC00LTMya1wiOlxuICAgIGNhc2UgXCJncHQtNC0wNjEzXCI6XG4gICAgY2FzZSBcImdwdC00LTAzMTRcIjpcbiAgICBjYXNlIFwiZ3B0LTRcIjpcbiAgICBjYXNlIFwiZ3B0LTMuNS10dXJiby0xMTA2XCI6XG4gICAgY2FzZSBcImdwdC0zNS10dXJib1wiOlxuICAgIGNhc2UgXCJncHQtNC0xMTA2LXByZXZpZXdcIjpcbiAgICBjYXNlIFwiZ3B0LTQtdmlzaW9uLXByZXZpZXdcIjpcbiAgICBjYXNlIFwiZ3B0LTMuNS10dXJiby0wMTI1XCI6XG4gICAgY2FzZSBcImdwdC00LXR1cmJvXCI6XG4gICAgY2FzZSBcImdwdC00LXR1cmJvLTIwMjQtMDQtMDlcIjpcbiAgICBjYXNlIFwiZ3B0LTQtdHVyYm8tcHJldmlld1wiOlxuICAgIGNhc2UgXCJncHQtNC0wMTI1LXByZXZpZXdcIjpcbiAgICBjYXNlIFwidGV4dC1lbWJlZGRpbmctYWRhLTAwMlwiOlxuICAgIGNhc2UgXCJ0ZXh0LWVtYmVkZGluZy0zLXNtYWxsXCI6XG4gICAgY2FzZSBcInRleHQtZW1iZWRkaW5nLTMtbGFyZ2VcIjoge1xuICAgICAgcmV0dXJuIFwiY2wxMDBrX2Jhc2VcIjtcbiAgICB9XG4gICAgY2FzZSBcImdwdC00b1wiOlxuICAgIGNhc2UgXCJncHQtNG8tMjAyNC0wNS0xM1wiOlxuICAgIGNhc2UgXCJncHQtNG8tMjAyNC0wOC0wNlwiOlxuICAgIGNhc2UgXCJncHQtNG8tbWluaS0yMDI0LTA3LTE4XCI6XG4gICAgY2FzZSBcImdwdC00by1taW5pXCI6IHtcbiAgICAgIHJldHVybiBcIm8yMDBrX2Jhc2VcIjtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gbW9kZWxcIik7XG4gIH1cbn1cblxuZXhwb3J0IHsgVGlrdG9rZW4sIGdldEVuY29kaW5nTmFtZUZvck1vZGVsLCBuZXZlciB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/js-tiktoken/dist/chunk-XX6PTLQF.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/js-tiktoken/dist/lite.js":
/*!***********************************************!*\
  !*** ./node_modules/js-tiktoken/dist/lite.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tiktoken: () => (/* reexport safe */ _chunk_XX6PTLQF_js__WEBPACK_IMPORTED_MODULE_0__.Tiktoken),\n/* harmony export */   getEncodingNameForModel: () => (/* reexport safe */ _chunk_XX6PTLQF_js__WEBPACK_IMPORTED_MODULE_0__.getEncodingNameForModel)\n/* harmony export */ });\n/* harmony import */ var _chunk_XX6PTLQF_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-XX6PTLQF.js */ \"(rsc)/./node_modules/js-tiktoken/dist/chunk-XX6PTLQF.js\");\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvanMtdGlrdG9rZW4vZGlzdC9saXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF3RSIsInNvdXJjZXMiOlsid2VicGFjazovL0xlZ2FsIHNlbWFudGljIHNlYXJjaCBzYW1wbGUgYXBwLy4vbm9kZV9tb2R1bGVzL2pzLXRpa3Rva2VuL2Rpc3QvbGl0ZS5qcz83MTFmIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IFRpa3Rva2VuLCBnZXRFbmNvZGluZ05hbWVGb3JNb2RlbCB9IGZyb20gJy4vY2h1bmstWFg2UFRMUUYuanMnO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/js-tiktoken/dist/lite.js\n");

/***/ })

};
;