var assert = require('assert');

describe('stmt_list', function() {
    it('Should be able to require `stmt_list` as a function', function () {
        var stmt_list = require("../lib/rules").stmt_list;
        assert(stmt_list);
        assert(typeof(stmt_list), "function");
    });
});
