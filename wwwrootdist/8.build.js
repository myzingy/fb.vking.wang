webpackJsonp([8],{111:function(t,e,n){e=t.exports=n(3)(),e.push([t.i,".btn{padding:50px;text-align:center}.btn button{padding:5px 10px}",""])},138:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-header",{attrs:{title:"退出"}},[n("router-link",{attrs:{to:"/home"},slot:"left"},[t._v("返回")])],1),t._v(" "),n("div",{staticClass:"btn"},[n("button",{on:{click:t.submit}},[t._v("Logout...")])])],1)},staticRenderFns:[]}},150:function(t,e,n){var o=n(111);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(7)("0869ff4d",o,!0)},62:function(t,e,n){n(150);var o=n(2)(n(92),n(138),null,null);t.exports=o.exports},92:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},r=n(8),i=n(21);e.default={mounted:function(){this.submit()},methods:o({},(0,r.mapActions)([i.USER_SIGNOUT]),{submit:function(){this.USER_SIGNOUT(),window.localStorage.clear(),this.$router.replace({path:"/login"})}})}}});
//# sourceMappingURL=8.build.js.map?1114d1f765014e3114bb