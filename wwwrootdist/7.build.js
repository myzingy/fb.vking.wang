webpackJsonp([7],{110:function(t,n,e){n=t.exports=e(3)(),n.push([t.i,".login{padding:50px;text-align:center}.login .line{padding:5px}.login .line input{padding:0 10px;line-height:28px}.login button{padding:0 20px;margin-top:20px;line-height:28px}.fb-signin-button{display:inline-block;padding:20px;border-radius:5px;background-color:#4267b2;color:#fff}",""])},121:function(t,n,e){"use strict";var o,i,s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(){function e(t){t.component("fb-signin-button",{name:"fb-signin-button",render:function(t){return t("div",{attrs:{class:"fb-signin-button"},ref:"signinBtn"},this.$slots.default)},props:{params:{type:Object,required:!0,default:function(){return{}}}},mounted:function(){var t=this;this.$refs.signinBtn.addEventListener("click",function(){window.FB.login(function(n){t.$emit(n.authResponse?"success":"error",n)},t.params)})}})}"object"==s(n)?t.exports=e:(o=[],void 0!==(i=function(){return e}.apply(n,o))&&(t.exports=i))}()},136:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("v-header",{attrs:{title:"Adset Budget Rules"}},[e("router-link",{attrs:{to:"?"},slot:"left"})],1),t._v(" "),e("el-card",{staticClass:"box-card",staticStyle:{"text-align":"center"}},[e("el-steps",{attrs:{space:300,active:1}},[e("el-step",{attrs:{title:"1. Bind AdAccount",description:"You must have AdAccount"}}),t._v(" "),e("el-step",{attrs:{title:"2. Create Rule",description:"Visual programming"}}),t._v(" "),e("el-step",{attrs:{title:"3. Bind Rule For Campaign",description:"Timed automatic execution"}})],1)],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.btn,expression:"!btn"}],staticClass:"login"},[e("fb-signin-button",{attrs:{params:t.fbSignInParams},on:{success:t.onSignInSuccess,error:t.onSignInError}},[t._v("\n\t\t\tSign in with Facebook\n\t\t")])],1)],1)},staticRenderFns:[]}},149:function(t,n,e){var o=e(110);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(7)("16577384",o,!0)},59:function(t,n,e){e(149);var o=e(2)(e(86),e(136),null,null);t.exports=o.exports},86:function(t,n,e){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(n,"__esModule",{value:!0});var i=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},s=e(16),r=o(s),a=e(0),c=o(a),u=e(8),l=e(21),f=e(121),d=o(f),p=e(18),g=o(p);window.fbAsyncInit=function(){FB.init({appId:"161699864370779",cookie:!0,xfbml:!0,version:"v2.8"})},window.onerror=function(){r.default.toast("Fackbook login fail,Please try again or refresh the page!")},function(t,n,e){var o,i=t.getElementsByTagName(n)[0];t.getElementById(e)||(o=t.createElement(n),o.id=e,o.src="//connect.facebook.net/en_US/sdk.js",i.parentNode.insertBefore(o,i))}(document,"script","facebook-jssdk"),c.default.use(d.default),n.default={data:function(){return{btn:!1,form:{id:"",name:"",email:"",token:""},fbSignInParams:{scope:"email,ads_management,ads_read,manage_pages,read_insights",return_scopes:!0},isProduction:r.default.isProduction()}},methods:i({},(0,u.mapActions)([l.USER_SIGNIN]),{then:function(t,n){switch(n){case g.default.login.code:this.USER_SIGNIN(this.form),this.$router.replace({path:"/home"}),setTimeout(function(){r.default.loading()},100)}},submit:function(){this.btn=!0,this.form.id&&this.form.name&&r.default.http(g.default.login,this.form,this.then)},onSignInSuccess:function(t){var n=this;console.log("login",t);var e=t.authResponse.accessToken;FB.api("/me?fields=id,name,email",function(t){console.log("Good to see you, "+t.name+".",t),n.form=t,n.form.token=e,n.submit()})},onSignInError:function(t){console.log("OH NOES",t)},logout:function(){FB.logout(function(t){console.log("logout",t)})}})}}});
//# sourceMappingURL=7.build.js.map?416f64a44beae5c7638d