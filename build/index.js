(function(__eth__module) {
  __eth__global = (typeof window !== 'undefined' ? window : global);
  __eth__importAll = require("eth/core");
  __eth__importAllKeys = Object.keys(__eth__importAll);
  for (var i = 0; i < __eth__importAllKeys.length; i++) {
    __eth__global[__eth__importAllKeys[i]] = __eth__importAll[__eth__importAllKeys[i]];
  }
  ;

  react = require("react");

  reactDom = require("react-dom");

  createAppState = (function (initialState) {
    return {state: or(initialState, {}), listenners: [], __ethReAppState: true};
    });

  isAppState = (function (s) {
    return and((type(s) === ":object:"), s.__ethReAppState);
    });

  appStateSubscribe = (function (appState, f) {
    return assoc(":listenners:", append(f, appState.listenners), appState);
    });

  appStateNotify$ = (function (appState) {
    return forEach((function (l) {
      return l(appState);
      }), appState.listenners);
    });

  appStateSet$ = (function (appState, path, value) {
    appState.state = setIn(path, value, appState.state);
    return appStateNotify$(appState);
    });

  appStateUpdate$ = (function (appState, path, updater) {
    appState.state = updateIn(path, value, appState.state);
    return appStateNotify$(appState);
    });

  isElementSpec = (function (e) {
    return and((type(e) === ":array:"), (len(e) > 0));
    });

  createElement = (function (children) {
    assert(isElementSpec(children), str("re: create-element: 'children' must be an array with at least one element ", "(html tag or component), got: ", toJson(children)));
    return (function () {
      var tagOrComponent = children[0];
      var givenProps = children[1];
      var props = (function() { if (isOfType(":object:", givenProps)) {
        return givenProps;
      } else {
        return {};
      } })();
      var childrenStart = (function() { if (isOfType(":object:", givenProps)) {
        return 2;
      } else {
        return 1;
      } })();
      var children = map((function (c) {
        return (function() { if (isOfType(":array:", c)) {
          return createElement(c);
        } else {
          return c;
        } })();
        }), children.slice(childrenStart));
      return apply(react.createElement, concat([tagOrComponent, props], children));
      })();
    });

  createComponent = (function (definition) {
    assert(isOfType(":function:", definition.render), "re: create-component: component needs a render method");
    return React.createClass(merge(definition, {":displayName:": or(definition.displayName, definition.name, "Component"), ":getInitialState:": (function() { if (isOfType("function", definition.initialState)) {
      return definition.initialState;
    } else {
      return (function () {
      return or(definition.initialState, {});
      });
    } })(), ":render:": (function () {
      return createElement(definition.render(this.props.appState, this.props, this.state, this));
      })}));
    });

  mount = (function (rootEl, mountPoint, appState) {
    assert(isAppState(appState), "re: mount: called without a valid 'app-state'");
    return (function () {
      var renderRoot = (function () {
        return reactDom.render(roolEl, mountPoint);
        });
      appStateSubscribe(appState, renderRoot);
      return renderRoot();
      })();
    });

  __eth__module.createAppState = createAppState;
  __eth__module.appStateSubscribe = appStateSubscribe;
  __eth__module.appStateNotify$ = appStateNotify$;
  __eth__module.appStateSet$ = appStateSet$;
  __eth__module.appStateUpdate$ = appStateUpdate$;
  __eth__module.isElementSpec = isElementSpec;
  __eth__module.createElement = createElement;
  __eth__module.createComponent = createComponent;
  __eth__module.mount = mount;
})(typeof window !== 'undefined' ? window['eth/re'] : module.exports);

