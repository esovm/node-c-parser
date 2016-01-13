var tokenRules = require("./token-rules");

var tokenize = function(streamOfText){
    var Lexer = require("lex");
    var lexer = new Lexer;
    var row = 1, col = 1;
    var streamOfTokens = [];

    var identifier = /[a-zA-Z_][\w]*/;
    var floatingConstant = /([+-]?(([0-9]*[\.][0-9]+)|([0-9]+[\.][0-9]*))([eE][+-]?[0-9]+)?)|([+-]?[0-9]+[eE][+-]?[0-9]+)/;
    var integerConstant = /[+-]?[0-9]+/;
    var stringConstant = /\"([\\.]|[^\"])*\"/;
    var newline = /[\n]/;
    var whitespace = /[\s]*/;

    lexer.addRule(floatingConstant, function(lexeme){
        var token = {};
        token["lexeme"] = lexeme;
        token["row"] = row;
        token["col"] = col;
        token["tokenClass"] = "FLOATING";
        token["parent"] = null;
        token["children"] = null;
        col = col + lexeme.length;
        return token;
    });
    lexer.addRule(integerConstant, function(lexeme){
        var token = {};
        token["lexeme"] = lexeme;
        token["row"] = row;
        token["col"] = col;
        token["tokenClass"] = "INTEGER";
        token["parent"] = null;
        token["children"] = null;
        col = col + lexeme.length;
        return token;
    });
    lexer.addRule(identifier, function(lexeme){
        var token = {};
        token["lexeme"] = lexeme;
        token["row"] = row;
        token["col"] = col;
        token["tokenClass"] = "IDENTIFIER";
        token["parent"] = null;
        token["children"] = null;
        col = col + lexeme.length;
        return token;
    });
    lexer.addRule(/[\n]/, function(lexeme){
        var token = {};
        token["lexeme"] = lexeme;
        token["row"] = row;
        token["col"] = col;
        token["tokenClass"] = "NEWLINE";
        token["parent"] = null;
        token["children"] = null;
        col = 1;
        row = row + 1;
        return token;
    });
    lexer.addRule(/[\s]/, function(lexeme){
        var token = {};
        token["lexeme"] = lexeme;
        token["row"] = row;
        token["col"] = col;
        token["tokenClass"] = "WHITESPACE";
        token["parent"] = null;
        token["children"] = null;
        col = col + lexeme.length;
        return token;
    });
    lexer.addRule(/./, function(lexeme){
        var token = {};
        token["lexeme"] = lexeme;
        token["row"] = row;
        token["col"] = col;
        token["tokenClass"] = "UNMATCHED";
        token["parent"] = null;
        token["children"] = null;
        col = col + lexeme.length;
        return token;
    });

    lexer.setInput(streamOfText);
    var x = lexer.lex();
    while(x != undefined){
        if((x.tokenClass != "NEWLINE") && 
           (x.tokenClass != "UNMATCHED") &&
           (x.tokenClass != "WHITESPACE")) streamOfTokens.push(x);
        x = lexer.lex();
    };
    return streamOfTokens;
}
module.exports.tokenize = tokenize;