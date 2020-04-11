!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";function r(e,t){var n=e.tag,l=e.props,c=e.child,u=document.createElement(n);return function(e,t,n){for(var r in t){var l=t[r];o(e,r,l,n)||(i(e,r,l,n)||a(e,r,l)||s(e,r,l))}}(u,l,t),function(e,t,n){t.forEach((function(t){"string"==typeof t?e.append(t):e.append(r(t,n))}))}(u,c,t),u}function o(e,t,n,r){var o=[t.startsWith("on"),"function"==typeof n].every((function(e){return e}));if(o){var i=t.slice(2),a=n;e.addEventListener(i,(function(e){a.call(r,e)}))}return o}function i(e,t,n,r){return"ref"===t&&null!=r&&(r.refs[n]=e,!0)}function a(e,t,n){return"className"===t&&(n.split(" ").forEach((function(t){e.classList.add(t)})),!0)}function s(e,t,n){return e.setAttribute(t,n),!0}Object.defineProperty(t,"__esModule",{value:!0}),t.h=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];return{tag:e,props:t,child:n}},t.render=r},function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0}),n(2);var o=n(0),i=r(n(0)),a=n(6),s=function(){function e(t){if(!(this instanceof e))return new e(t);this.rootEl=t,this.refs={},this.items=new Map,this.$bus=new a.Observer,this.render(),this.focusInput()}return e.prototype.render=function(){var e=this,t=i.render(o.h("div",{className:"container"},o.h("div",{className:"form"},o.h("div",{className:"form__body"},o.h("h1",{className:"form__title"},"Shared ",o.h("span",{className:"form__title form__title_bold"},"Board name")," with others"),o.h("main",{ref:"board",className:"board"},o.h("input",{ref:"input",type:"text",className:"input",placeholder:"add more people…",onblur:function(t){e.blurEventHandler(t)},onkeydown:function(t){e.keyDownEventHandler(t)}}))),o.h("div",{className:"form__footer"},o.h("button",{className:"btn btn_primary"},"Add email"),o.h("button",{className:"btn btn_primary"},"Get emails count")))),this);this.rootEl.append(t)},e.prototype.addEmail=function(e){var t=e.trim();if(""===t)this.cleanInput();else{var n=this.prepareEmail(t);this.insertEmail(n),this.cleanInput(),this.focusInput()}},e.prototype.prepareEmail=function(e){var t=this,n="EMAIL_"+Math.random(),r=a.isEmailValid(e),s=r?"email_valid":"email_invalid",l=i.render(o.h("div",{className:"email "+s},o.h("div",{className:"email__wrapper"},o.h("span",{className:"email__text"},e),o.h("button",{className:"email__close",onclick:function(){t.delEmail(n)}}))));return{id:n,$el:l,value:e,isValid:r}},e.prototype.insertEmail=function(e){var t=this.refs,n=t.board,r=t.input,o=e.id,i=e.$el;n.insertBefore(i,r),this.items.set(o,e)},e.prototype.delEmail=function(e){var t=this.items,n=t.get(e);if(null!=n){var r=n.$el.parentNode;null==r||r.removeChild(n.$el),t.delete(e)}},e.prototype.blurEventHandler=function(e){this.addEmail(e.target.value)},e.prototype.keyDownEventHandler=function(e){if([188,191,13].includes(e.keyCode)){e.preventDefault();var t=e.target.value;this.addEmail(t)}},e.prototype.focusInput=function(){this.refs.input.focus()},e.prototype.cleanInput=function(){this.refs.input.value=""},e}();t.EmailsInput=s},function(e,t,n){var r=n(3),o=n(4);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1},a=(r(o,i),o.locals?o.locals:{});e.exports=a},function(e,t,n){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function s(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function l(e,t){for(var n={},r=[],o=0;o<e.length;o++){var i=e[o],l=t.base?i[0]+t.base:i[0],c=n[l]||0,u="".concat(l," ").concat(c);n[l]=c+1;var f=s(u),d={css:i[1],media:i[2],sourceMap:i[3]};-1!==f?(a[f].references++,a[f].updater(d)):a.push({identifier:u,updater:b(d,t),references:1}),r.push(u)}return r}function c(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=n.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var u,f=(u=[],function(e,t){return u[e]=t,u.filter(Boolean).join("\n")});function d(e,t,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=f(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function p(e,t,n){var r=n.css,o=n.media,i=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var h=null,m=0;function b(e,t){var n,r,o;if(t.singleton){var i=m++;n=h||(h=c(t)),r=d.bind(null,n,i,!1),o=d.bind(null,n,i,!0)}else n=c(t),r=p.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=l(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var o=s(n[r]);a[o].references--}for(var i=l(e,t),c=0;c<n.length;c++){var u=s(n[c]);0===a[u].references&&(a[u].updater(),a.splice(u,1))}n=i}}}},function(e,t,n){(t=n(5)(!1)).push([e.i,"body{height:100%;font-family:'Open Sans', serif}.container{display:flex;align-items:center;flex-wrap:wrap;justify-content:center}.form{display:block;overflow:hidden;width:540px;min-width:540px;margin-right:28px;margin-bottom:28px;border-radius:8px;background-color:#fff;box-shadow:0 8px 20px rgba(0,0,0,0.2)}.form__body{display:block;padding:32px 50px 24px;background-color:#f8f8f7}.form__title{margin-bottom:24px;font-size:20px;font-weight:normal;font-style:normal;line-height:27px;color:#050038}.form__title_bold{font-weight:bold}.form__footer{padding:24px 50px 32px}.board{overflow-y:auto;box-sizing:border-box;height:96px;padding:7px 8px;padding-right:17px;border:1px solid #c3c2cf;border-radius:4px;background-color:#fff}.email{display:inline-block;box-sizing:border-box;margin-right:7px;margin-bottom:8px;color:#050038}.email__wrapper{display:flex;align-items:center}.email_valid{padding-left:10px;border-radius:100px;background-color:rgba(102,153,255,0.2)}.email_invalid{border-bottom:1px dashed #d92929}.email__text{vertical-align:middle}.email__close{position:relative;box-sizing:border-box;width:24px;height:24px;vertical-align:middle;border:0;background-color:transparent}.email__close:before,.email__close:after{content:'';position:absolute;top:50%;left:50%;width:8px;height:1px;transform:translateX(-50%) rotate(45deg);background-color:#050038}.email__close:before{transform:translateX(-50%) rotate(-45deg)}.input{width:124px;height:24px;border:0}.input::placeholder{font-size:14px;line-height:24px;color:#c3c2cf}.btn{margin-right:16px;margin-bottom:16px;padding:8px 16px;font-size:14px;line-height:24px;text-align:center;border:0;border-radius:6px}.btn_primary{color:#fff;background-color:#4262ff}\n",""]),e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(l," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(i).concat([o]).join("\n")}var a,s,l;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<e.length;s++){var l=[].concat(e[s]);r&&o[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isEmailValid=function(e){return/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(e)};var r=function(){function e(){this._subscribers=new Map}return e.prototype.on=function(e,t){var n;return"function"==typeof t&&(this._subscribers.has(e)?null===(n=this._subscribers.get(e))||void 0===n||n.add(t):this._subscribers.set(e,new Set([t])),!0)},e.prototype.off=function(e,t){var n;if("function"!=typeof t)return!1;if(this._subscribers.has(e)){var r=this._subscribers.get(e);if(null!==(n=null==r?void 0:r.has(t))&&void 0!==n&&n)return null==r||r.delete(t),!0}return!1},e.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=this._subscribers.get(e);null!=r&&r.forEach((function(e){e.apply(void 0,t)}))},e}();t.Observer=r}])}));