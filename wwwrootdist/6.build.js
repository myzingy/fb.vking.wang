webpackJsonp([6],{124:function(n,t,e){e(598);var o=e(2)(e(573),e(590),null,null);n.exports=o.exports},573:function(n,t,e){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])}return n},r=e(0),s=o(r),a=e(8),u=e(26),c=e(583),l=o(c),f=e(6),m=o(f),d=e(5),p=o(d);window.fbAsyncInit=function(){FB.init({appId:"161699864370779",cookie:!0,xfbml:!0,version:"v2.8"})},function(n,t,e){var o,i=n.getElementsByTagName(t)[0];n.getElementById(e)||(o=n.createElement(t),o.id=e,o.src="//connect.facebook.net/en_US/sdk.js",i.parentNode.insertBefore(o,i))}(document,"script","facebook-jssdk"),s.default.use(l.default),t.default={data:function(){return{btn:!1,form:{id:"",name:"",email:"",token:""},fbSignInParams:{scope:"email,ads_management,ads_read,manage_pages,read_insights",return_scopes:!0},isProduction:m.default.isProduction()}},methods:i({},(0,a.mapActions)([u.USER_SIGNIN]),{then:function(n,t){switch(t){case p.default.login.code:this.USER_SIGNIN(this.form),this.$router.replace({path:"/home"})}},submit:function(){this.btn=!0,this.form.id&&this.form.name&&m.default.http(p.default.login,this.form,this.then)},onSignInSuccess:function(n){var t=this;console.log("login",n);var e=n.authResponse.accessToken;FB.api("/me?fields=id,name,email",function(n){console.log("Good to see you, "+n.name+".",n),t.form=n,t.form.token=e,t.submit()})},onSignInError:function(n){console.log("OH NOES",n)},logout:function(){FB.logout(function(n){console.log("logout",n)})},submit_test:function(){this.USER_SIGNIN({id:"111",name:"111",email:"111",token:"111"}),this.$router.replace({path:"/home"})}})}},581:function(n,t,e){t=n.exports=e(1)(),t.push([n.i,".login{padding:50px;text-align:center}.login .line{padding:5px}.login .line input{padding:0 10px;line-height:28px}.login button{padding:0 20px;margin-top:20px;line-height:28px}.fb-signin-button{display:inline-block;padding:20px;border-radius:5px;background-color:#4267b2;color:#fff}",""])},583:function(n,t,e){"use strict";var o,i,r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n};!function(){function e(n){n.component("fb-signin-button",{name:"fb-signin-button",render:function(n){return n("div",{attrs:{class:"fb-signin-button"},ref:"signinBtn"},this.$slots.default)},props:{params:{type:Object,required:!0,default:function(){return{}}}},mounted:function(){var n=this;this.$refs.signinBtn.addEventListener("click",function(){window.FB.login(function(t){n.$emit(t.authResponse?"success":"error",t)},n.params)})}})}"object"==r(t)?n.exports=e:(o=[],void 0!==(i=function(){return e}.apply(t,o))&&(n.exports=i))}()},590:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("v-header",{attrs:{title:"登录"}},[e("router-link",{attrs:{to:"?"},slot:"left"})],1),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!n.btn,expression:"!btn"}],staticClass:"login"},[e("fb-signin-button",{attrs:{params:n.fbSignInParams},on:{success:n.onSignInSuccess,error:n.onSignInError}},[n._v("\n\t\t\tSign in with Facebook\n\t\t")])],1),n._v(" "),e("form",{directives:[{name:"show",rawName:"v-show",value:!n.isProduction,expression:"!isProduction"}],staticClass:"login",on:{submit:function(t){t.preventDefault(),n.submit_test(t)}}},[e("div",{staticClass:"line"},[e("div",{directives:[{name:"show",rawName:"v-show",value:n.btn&&!n.form.id,expression:"btn && !form.id"}]},[n._v("id不能为空")]),n._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:n.form.id,expression:"form.id"}],attrs:{type:"number",placeholder:"输入你的id"},domProps:{value:n.form.id},on:{input:function(t){t.target.composing||(n.form.id=t.target.value)},blur:function(t){n.$forceUpdate()}}})]),n._v(" "),e("div",{staticClass:"line"},[e("div",{directives:[{name:"show",rawName:"v-show",value:n.btn&&!n.form.name,expression:"btn && !form.name"}]},[n._v("用户名不能为空")]),n._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:n.form.name,expression:"form.name"}],attrs:{type:"text",placeholder:"输入你的用户名"},domProps:{value:n.form.name},on:{input:function(t){t.target.composing||(n.form.name=t.target.value)}}})]),n._v(" "),e("button",[n._v("登录")])])],1)},staticRenderFns:[]}},598:function(n,t,e){var o=e(581);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e(4)("16577384",o,!0)}});
//# sourceMappingURL=6.build.js.map?1e3a14f25fb8c7a72c6d