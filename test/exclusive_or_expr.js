var assert = require('assert');

describe('exclusive_or_expr', function() {
    it('Should be able to require `exclusive_or_expr` as a function', function () {
        var exclusive_or_expr = require("../lib/exclusive_or_expr").exclusive_or_expr;
        assert(typeof(exclusive_or_expr), "function");
    });
});