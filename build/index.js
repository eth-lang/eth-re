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

  createApp = (function (initialState, render) {
    return (function () {
      var appState = {state: or(initialState, {})};
      appState.renderer = renderer;
      rerender();
      return appState;
      })();
    });

  set$ = (function (appState, path, value) {
    appState.state = setIn(appState.state, path, value);
    return appState.renderer();
    });

  update$ = (function (appState, path, updater) {
    return null;
    });

  createComponent = (function (definition) {
    (function() { if (definition.defaultState) {
      return definition.getInitialState = (function () {
      return definition.defaultState;
      });
    } else {
      return null;
    } })();
    (function() { if (definition.defaultProps) {
      return definition.getDefaultProps = (function () {
      return definition.defaultProps;
      });
    } else {
      return null;
    } })();
    var givenRender = definition.render;
    definition.render = (function () {
      return givenRender.call(this, this.props, this.state);
      });
    (function() { if (definition.name) {
      return definition.displayName = definition.name;
    } else {
      return null;
    } })();
    return React.createClass(definition);
    });

  el = (function (tagName, props) {
    var children = Array.prototype.slice.call(arguments, 2);
    return apply(react.createElement, concat([tagName, props], children));
    });

  el = (function (tagName, props) {
    var children = Array.prototype.slice.call(arguments, 2);
    return apply(react.createElement, concat([tagName, props], children));
    });

  render = (function (rootEl, mountPoint, appState) {
    return createApp(appState, (function () {
      return reactDom(roolEl, mountPoint);
      }));
    });

  htmlTags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"];

  forEach((function (tag) {
    return __eth__module[tag] = curry(el, tag);
    }), htmlTags);

  
})(typeof window !== 'undefined' ? window['eth/re'] : module.exports);

