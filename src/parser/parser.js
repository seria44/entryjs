/*
 *
 */
"use strict";

goog.provide("Entry.Parser");

goog.require("Entry.JSParser");
goog.require("Entry.BlockParser");

Entry.Parser = function(mode, type, cm) {
    this._mode = mode; // maze ai workspace
    this.syntax = {Scope:{move:"move", mod:"mod"}};
    this.codeMirror = cm;
    //this._lang = syntax || "js"; 
    this._type = type;
    this.availableCode = [];


    /*if (mode === Entry.Vim.MAZE_MODE) {
        this._stageId = Number(Ntry.configManager.getConfig('stageId'));
        var configCode = NtryData.config[this._stageId].availableCode;
        var playerCode = NtryData.player[this._stageId].code;
        this.setAvailableCode(configCode, playerCode);
    } else if (mode === Entry.Vim.WORKSPACE_MODE) {
        //To Do for ws
    }

    this.mappingSyntax(mode);

    switch (this._lang) {
        case "js":
            this._parser = new Entry.JSParser(this.syntax);

            var syntax = this.syntax;

            var assistScope = {};

            for(var key in syntax.Scope ) {
                assistScope[key + '();\n'] = syntax.Scope[key];
            }

            if('BasicIf' in syntax) {
                assistScope['front'] = 'BasicIf';
            }

            CodeMirror.commands.javascriptComplete = function (cm) {
                CodeMirror.showHint(cm, null, {globalScope:assistScope});
            }

            cm.on("keyup", function (cm, event) {
                if (!cm.state.completionActive &&  (event.keyCode >= 65 && event.keyCode <= 95))  {
                    CodeMirror.showHint(cm, null, {completeSingle: false, globalScope:assistScope});
                }
            });
            break;

        case "py":
            this._parser = new Entry.PYParser(this.syntax);

            var syntax = this.syntax;

            var assistScope = {};

            for(var key in syntax.Scope ) {
                assistScope[key + '();\n'] = syntax.Scope[key];
            }

            if('BasicIf' in syntax) {
                assistScope['front'] = 'BasicIf';
            }

            CodeMirror.commands.javascriptComplete = function (cm) {
                CodeMirror.showHint(cm, null, {globalScope:assistScope});
            }

            cm.on("keyup", function (cm, event) {
                if (!cm.state.completionActive &&  (event.keyCode >= 65 && event.keyCode <= 95))  {
                    CodeMirror.showHint(cm, null, {completeSingle: false, globalScope:assistScope});
                }
            });
            break;

        case "blockJs":
            this._parser = new Entry.BlockParser(this.syntax);
            var syntax = this.syntax;
            break;

        case "blockPy":
            this._parser = new Entry.PyBlockParser(this.syntax);
            var syntax = this.syntax;
            break;
    }*/
};

(function(p) {
    p.setParser = function(mode, type, cm) {
        if (mode === Entry.Vim.MAZE_MODE) {
            this._stageId = Number(Ntry.configManager.getConfig('stageId'));
            var configCode = NtryData.config[this._stageId].availableCode;
            var playerCode = NtryData.player[this._stageId].code;
            this.setAvailableCode(configCode, playerCode);
        } else if (mode === Entry.Vim.WORKSPACE_MODE) {
            //To Do for ws
        }

        this.mappingSyntax(mode);

        switch (type) {
            case Entry.Vim.PARSER_TYPE_JS_TO_BLOCK:
                console.log("PARSER TYPE => JS To Block");
                this._parser = new Entry.JSParser(this.syntax);

                var syntax = this.syntax;

                var assistScope = {};

                for(var key in syntax.Scope ) {
                    assistScope[key + '();\n'] = syntax.Scope[key];
                }

                if('BasicIf' in syntax) {
                    assistScope['front'] = 'BasicIf';
                }

                CodeMirror.commands.autoCompletion = function (cm) {
                    CodeMirror.showHint(cm, null, {globalScope:assistScope});
                }

                cm.on("keyup", function (cm, event) {
                    if (!cm.state.completionActive &&  (event.keyCode >= 65 && event.keyCode <= 95))  {
                        CodeMirror.showHint(cm, null, {completeSingle: false, globalScope:assistScope});
                    }
                });
                break;

            case Entry.Vim.PARSER_TYPE_PY_TO_BLOCK:
                console.log("PARSER TYPE => PY To Block");
                this._parser = new Entry.PYParser(this.syntax);

                var syntax = this.syntax;

                var assistScope = {};

                for(var key in syntax.Scope ) {
                    assistScope[key + '();\n'] = syntax.Scope[key];
                }

                if('BasicIf' in syntax) {
                    assistScope['front'] = 'BasicIf';
                }

                CodeMirror.commands.autoCompletion = function (cm) {
                    CodeMirror.showHint(cm, null, {globalScope:assistScope});
                }

                cm.on("keyup", function (cm, event) {
                    if (!cm.state.completionActive &&  (event.keyCode >= 65 && event.keyCode <= 95))  {
                        CodeMirror.showHint(cm, null, {completeSingle: false, globalScope:assistScope});
                    }
                });
                break;

            case Entry.Vim.PARSER_TYPE_BLOCK_TO_JS:
                console.log("PARSER TYPE => BLOCK To JS");
                this._parser = new Entry.BlockParser(this.syntax);
                var syntax = this.syntax;
                console.log("syntax", syntax);
                var assistScope = {};
                console.log("syntax Scope", syntax.Scope);

                for(var key in syntax.Scope ) {
                    console.log("key", key);
                    assistScope[key + '();\n'] = syntax.Scope[key];
                }

                console.log("asist", assistScope);

                if('BasicIf' in syntax) {
                    assistScope['front'] = 'BasicIf';
                }

                cm.setOption("mode", {name: "javascript", globalVars: true});

                CodeMirror.commands.autoCompletion = function (cm) {
                    CodeMirror.showHint(cm, null, {globalScope:assistScope});
                }

                cm.on("keyup", function (cm, event) {
                    if (!cm.state.completionActive &&  (event.keyCode >= 65 && event.keyCode <= 95))  {
                        CodeMirror.showHint(cm, null, {completeSingle: false, globalScope:assistScope});
                    }
                });
                break;

            case Entry.Vim.PARSER_TYPE_BLOCK_TO_PY:
                console.log("PARSER TYPE => Block To PY");
                this._parser = new Entry.PyBlockParser(this.syntax);
                var syntax = this.syntax;
                var assistScope = {};

                for(var key in syntax.Scope ) {
                    assistScope[key + '();\n'] = syntax.Scope[key];
                }

                if('BasicIf' in syntax) {
                    assistScope['front'] = 'BasicIf';
                }

                cm.setOption("mode", {name: "python", globalVars: true});

                CodeMirror.commands.autoCompletion = function (cm) {
                    CodeMirror.showHint(cm, null, {globalScope:assistScope});
                }

                cm.on("keyup", function (cm, event) {
                    console.log("cm", cm);
                    if (!cm.state.completionActive &&  (event.keyCode >= 65 && event.keyCode <= 95))  {
                        CodeMirror.showHint(cm, null, {completeSingle: false, globalScope:assistScope});
                    }
                });

                
                break;
        }
    };

    p.parse = function(code) {
        var result = null;

        switch (this._type) {
            case Entry.Vim.PARSER_TYPE_JS_TO_BLOCK:
                try {
                    var astTree = acorn.parse(code);
                    result = this._parser.Program(astTree);
                } catch(error) {
                    if (this.codeMirror) {
                        var annotation;
                        if (error instanceof SyntaxError) {
                            annotation = {
                                from: {line: error.loc.line - 1, ch: error.loc.column - 2},
                                to: {line: error.loc.line - 1, ch: error.loc.column + 1}
                            }
                            error.message = "문법 오류입니다.";
                        } else {
                            annotation = this.getLineNumber(error.node.start,
                                                               error.node.end);
                            annotation.message = error.message;
                            annotation.severity = "error";
                            this.codeMirror.markText(
                                annotation.from, annotation.to, {
                                className: "CodeMirror-lint-mark-error",
                                __annotation: annotation,
                                clearOnEnter: true
                            });
                        }

                        Entry.toast.alert('Error', error.message);
                    }
                    result = [];
                }
                break;
            case Entry.Vim.PARSER_TYPE_PY_TO_BLOCK:
                try {
                    var astTree = acorn.parse(code);
                    result = this._parser.Program(astTree);
                } catch(error) {
                    if (this.codeMirror) {
                        var annotation;
                        if (error instanceof SyntaxError) {
                            annotation = {
                                from: {line: error.loc.line - 1, ch: error.loc.column - 2},
                                to: {line: error.loc.line - 1, ch: error.loc.column + 1}
                            }
                            error.message = "문법 오류입니다.";
                        } else {
                            annotation = this.getLineNumber(error.node.start,
                                                               error.node.end);
                            annotation.message = error.message;
                            annotation.severity = "error";
                            this.codeMirror.markText(
                                annotation.from, annotation.to, {
                                className: "CodeMirror-lint-mark-error",
                                __annotation: annotation,
                                clearOnEnter: true
                            });
                        }

                        Entry.toast.alert('Error', error.message);
                    }
                    result = [];
                }
                break;
            case Entry.Vim.PARSER_TYPE_BLOCK_TO_JS:
                var textCode = this._parser.Code(code);
                var textArr = textCode.match(/(.*{.*[\S|\s]+?}|.+)/g);
                if(Array.isArray(textArr)) {
                    result = textArr.reduce(function (prev, current, index) {
                        var temp = '';

                        if(index === 1) {
                            prev = prev + '\n';
                        }
                        if(current.indexOf('function') > -1) {
                            temp = current + prev;
                        } else {
                            temp = prev + current;
                        }

                        return temp + '\n';
                    });
                } else {
                    result = '';
                }

                break;

            case Entry.Vim.PARSER_TYPE_BLOCK_TO_PY:
                var textCode = this._parser.Code(code);
                var textArr = textCode.match(/(.*{.*[\S|\s]+?}|.+)/g);
                if(Array.isArray(textArr)) {
                    result = textArr.reduce(function (prev, current, index) {
                        var temp = '';

                        if(index === 1) {
                            prev = prev + '\n';
                        }
                        if(current.indexOf('function') > -1) {
                            temp = current + prev;
                        } else {
                            temp = prev + current;
                        }

                        return temp + '\n';
                    });
                } else {
                    result = '';
                }

                break;
        }

        return result;
    };

    p.getLineNumber = function (start, end) {
        var value = this.codeMirror.getValue();
        var lines = {
            'from' : {},
            'to' : {}
        };

        var startline = value.substring(0, start).split(/\n/gi);
        lines.from.line = startline.length - 1;
        lines.from.ch = startline[startline.length - 1].length;

        var endline = value.substring(0, end).split(/\n/gi);
        lines.to.line = endline.length - 1;
        lines.to.ch = endline[endline.length - 1].length;

        return lines;
    };

    p.mappingSyntax = function(mode) {
        var types = Object.keys(Entry.block);

        for (var i = 0; i < types.length; i++) {
            var type = types[i];
            var block = Entry.block[type];
            if (block.mode === mode && this.availableCode.indexOf(type) > -1) {
                var syntaxArray = block.syntax;
                if (!syntaxArray)
                    continue;
                var syntax = this.syntax;
                for (var j = 0; j < syntaxArray.length; j++) {
                    var key = syntaxArray[j];
                    if (j === syntaxArray.length - 2 &&
                       typeof syntaxArray[j + 1] === "function") {
                        syntax[key] = syntaxArray[j + 1];
                        break;
                    }
                    if (!syntax[key]) {
                        syntax[key] = {};
                    }
                    if (j === syntaxArray.length - 1) {
                        syntax[key] = type;
                    } else {
                        syntax = syntax[key];
                    }
                }
            }
        }
    };

    p.setAvailableCode = function (configCode, playerCode) {

        var availableList = [];
        configCode.forEach(function (items, i) {
            items.forEach(function (item, i) {
                availableList.push(item.type);
            });
        });

        playerCode.forEach(function (items, i) {
            items.forEach(function (item, i) {
                if(item.type !== NtryData.START && availableList.indexOf(item.type) === -1) {
                    availableList.push(item.type);
                }
            });
        });

        this.availableCode = this.availableCode.concat(availableList);
    }


})(Entry.Parser.prototype);
