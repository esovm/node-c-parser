/*jshint sub:true*/

/*
 *   logical_or_expr_p -> ',' logical_and_expr logical_or_expr_p
 *                     | EPSILON
 * */

var EPSILON = require("./commons").EPSILON;
var TERMINAL = require("./commons").TERMINAL;
var iterate_over_rules = require("./commons").iterate_over_rules;
var logical_and_expr = require("./logical_and_expr").logical_and_expr;

var list_of_rules = [
    function(token_stream, arrow, node){
        var child_1 = null;
        var child_2 = null;
        var child_3 = null;
        child_1 = TERMINAL(token_stream, arrow, "or_op");
        if(child_1) child_2 = logical_and_expr(token_stream, arrow);
        if(child_2) child_3 = logical_or_expr_p(token_stream, arrow);
        if(child_3){
            node["children"].push(child_1);
            node["children"].push(child_2);
            node["children"].push(child_3);
        }
    },
    function(token_stream, arrow, node){
        var child_1 = null;
        child_1 = EPSILON(token_stream, arrow);
        if(child_1){
            node["children"].push(child_1);
        }
    }
];

var logical_or_expr_p = function(token_stream, arrow){
    var new_node = {};
    var new_arrow = _.clone(arrow);
    new_node["title"] = "logical_or_expr_p";
    new_node["children"] = [];
    iterate_over_rules(token_stream, arrow, list_of_rules, new_node);
    if(new_node["children"].length > 0){
        arrow["pointer"] = new_arrow["pointer"];
        return new_node;
    }
    else{
        return;
    }
};
module.exports.logical_or_expr_p = logical_or_expr_p;