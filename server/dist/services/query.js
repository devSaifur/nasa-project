(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPagination = void 0;
    const DEFAULT_PAGE_NUMBER = 1;
    const DEFAULT_PAGE_LIMIT = 0; // returns all
    function getPagination(query) {
        const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
        const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
        const skip = (page - 1) * limit;
        return {
            skip,
            limit,
        };
    }
    exports.getPagination = getPagination;
});
