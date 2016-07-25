var T = require("eth/core").T;
var __ = require("eth/core").__;
var all = require("eth/core").all;
var and = require("eth/core").and;
var ap = require("eth/core").ap;
var append = require("eth/core").append;
var apply = require("eth/core").apply;
var assoc = require("eth/core").assoc;
var call = require("eth/core").call;
var concat = require("eth/core").concat;
var forEach = require("eth/core").forEach;
var gt = require("eth/core").gt;
var init = require("eth/core").init;
var is = require("eth/core").is;
var length = require("eth/core").length;
var map = require("eth/core").map;
var merge = require("eth/core").merge;
var or = require("eth/core").or;
var path = require("eth/core").path;
var prop = require("eth/core").prop;
var props = require("eth/core").props;
var set = require("eth/core").set;
var slice = require("eth/core").slice;
var update = require("eth/core").update;
var without = require("eth/core").without;
var eq = require("eth/core").eq;
var greater = require("eth/core").greater;
var toJson = require("eth/core").toJson;
var assert = require("eth/core").assert;
var string = require("eth/core").string;
var isOfType = require("eth/core").isOfType;
var getIn = require("eth/core").getIn;
var setIn = require("eth/core").setIn;
var updateIn = require("eth/core").updateIn;

var react = require("react");

var reactDom = require("react-dom");

var createAppState = (function (initialState) {
  return (function () {
    return {
      "state": (initialState || {
        
      }), "listenners": [], "__ethReAppState": true
    };
  }).call(this);
});

var isAppState = (function (state) {
  return (isOfType("object", state) && state.__ethReAppState);
});

var appStateSubscribe = (function (appState, f) {
  return assoc("listenners", append(f, appState.listenners), appState);
});

var appStateNotify = (function (appState) {
  return forEach((function (l) {
    return l(appState);
  }), appState.listenners);
});

var appStateSet = (function (appState, path, value) {
  return (function () {
    appState.state = setIn(path, value, appState.state);
    return appStateNotify(appState);
  }).call(this);
});

var appStateUpdate = (function (appState, path, updater) {
  return (function () {
    appState.state = updateIn(path, updater, appState.state);
    return appStateNotify(appState);
  }).call(this);
});

var isElementSpec = (function (e) {
  return (isOfType("array", e) && greater(length(e), 0));
});

var createElement = (function (children) {
  return (function () {
    assert(isElementSpec(children), string("re: createElement: 'children' must be and element spec, got: ", toJson(children)));
    var tagOrComponent = children[0];
    var haveProps = isOfType("object", children[1]);
    var properties = (function () {
      if (haveProps) {
        return children[1];
      } else {
        return {
          
        };
      }
    }).call(this);
    var transformedChildren = map((function (c) {
      return (function () {
        if (isOfType("array", c)) {
          return createElement(c);
        } else {
          return c;
        }
      }).call(this);
    }), children.slice((function () {
      if (haveProps) {
        return 2;
      } else {
        return 1;
      }
    }).call(this)));
    return apply(react.createElement, concat([tagOrComponent, properties], transformedChildren));
  }).call(this);
});

var createComponent = (function (definition) {
  return (function () {
    (function () {
      if (isOfType("function", definition)) {
        return (function () {
          return definition = {
            "render": definition
          };
        }).call(this);
      } else {
        return undefined;
      }
    }).call(this);
    assert(isOfType("function", definition.render), "re: createComponent: component spec needs a render method");
    return react.createClass(merge(definition, {
      "contextTypes": merge((definition.contextTypes || {
        
      }), {
        "appState": react.PropTypes.object.isRequired
      }), "displayName": (definition.displayName || definition.name || "Component"), "getInitialState": (function () {
        if (isOfType("function", definition.initialState)) {
          return definition.initialState;
        } else {
          return (function () {
            return (definition.initialState || {
              
            });
          });
        }
      }).call(this), "render": (function () {
        return createElement(definition.render(this.context.appState, this.props, this.state, this));
      })
    }));
  }).call(this);
});

var connect = (function (appState, el) {
  return (function () {
    var AppStateProvider = createComponent({
      "childContextTypes": {
        "appState": react.PropTypes.object.isRequired
      }, "getChildContext": (function () {
        return (function () {
          return {
            "appState": appState
          };
        }).call(this);
      }), "render": (function () {
        return (function () {
          return el;
        }).call(this);
      })
    });
    return AppStateProvider;
  }).call(this);
});

var mount = (function (rootEl, mountPoint, appState) {
  return (function () {
    assert(isAppState(appState), "re: mount: called without a valid 'appState'");
    var renderRoot = (function () {
      return reactDom.render(react.createElement(connect(appState, rootEl)), mountPoint);
    });
    appStateSubscribe(appState, renderRoot);
    return renderRoot();
  }).call(this);
});

module.exports = {
  "createAppState": createAppState, "appStateSubscribe": appStateSubscribe, "appStateNotify": appStateNotify, "appStateSet": appStateSet, "appStateUpdate": appStateUpdate, "isElementSpec": isElementSpec, "createElement": createElement, "createComponent": createComponent, "mount": mount
}
