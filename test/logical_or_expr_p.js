var assert = require('assert');

describe('logical_or_expr_p', function() {
    it('Should be able to require `logical_or_expr_p` as a function', function () {
        var logical_or_expr_p = require("../lib/logical_or_expr_p").logical_or_expr_p;
        assert(typeof(logical_or_expr_p), "function");
    });
});