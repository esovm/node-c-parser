var assert = require('assert');

describe('constant_expr', function() {
    it('Should be able to require `constant_expr` as a function', function () {
        var constant_expr = require("../lib/rules").constant_expr;
        assert(constant_expr);
        assert(typeof(constant_expr), "function");
    });
});
