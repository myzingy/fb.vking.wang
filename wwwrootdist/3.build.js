webpackJsonp([3],{109:function(e,t,a){t=e.exports=a(3)(),t.push([e.i,"",""])},135:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mytable"},[a("headerTop"),e._v(" "),a("el-col",{staticStyle:{height:"100%"},attrs:{span:4}},[a("div",{staticClass:"grid-left bg-purple-darkc overflow-y",attrs:{id:"app_left_menu"}},[a("v-leftMenu")],1)]),e._v(" "),a("el-col",{staticStyle:{height:"100%"},attrs:{span:20}},[a("div",[a("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:e.$t("Staff Management"),name:"getRulesLog"}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-form-item",{attrs:{label:"Email"}},[a("el-input",{attrs:{placeholder:e.$t("reg fb email")},model:{value:e.form.email,callback:function(t){e.form.email=t},expression:"form.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("groups")}},[a("el-select",{attrs:{placeholder:e.$t("el.select.placeholder")},model:{value:e.form.group_id,callback:function(t){e.form.group_id=t},expression:"form.group_id"}},[a("el-option",{attrs:{label:"Admin",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"Advertisers",value:"1"}})],1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v(e._s(e.$t("add staff")))])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.rulesLog,border:"","max-height":"750"}},[a("el-table-column",{attrs:{prop:"email",label:"Email",width:"250"}}),e._v(" "),a("el-table-column",{attrs:{formatter:e.formatUserdata,label:e.$t("staff data")}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("groups"),width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{attrs:{placeholder:e.$t("el.select.placeholder")},on:{change:function(a){e.changeUser(t.row.group_id,t.row)}},model:{value:t.row.group_id,callback:function(e){t.row.group_id=e},expression:"scope.row.group_id"}},[a("el-option",{attrs:{label:"Admin",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"Advertisers",value:"1"}})],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("operation"),width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.deleteUser(t.$index,t.row)}}},[e._v("\n\t\t\t\t\t\t\t\t\t"+e._s(e.$t("el.upload.delete"))+"\n\t\t\t\t\t\t\t\t")])]}}])})],1)],1)],1),e._v(" "),a("el-dialog",{ref:"accountDialog",attrs:{title:"AD账户列表",visible:e.dialogTableVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("accounts_fb",{ref:"accounts_fb",attrs:{type:"nofb"}}),e._v(" "),a("span",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:e.dialogClose}},[e._v(e._s(e.$t("el.messagebox.cancel")))]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.saveAccounts}},[e._v(e._s(e.$t("el.messagebox.confirm")))])],1)],1)],1)])],1)},staticRenderFns:[]}},148:function(e,t,a){var l=a(109);"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a(7)("0ea177ae",l,!0)},65:function(e,t,a){a(148);var l=a(2)(a(95),a(135),null,null);e.exports=l.exports},66:function(e,t,a){"use strict";t.__esModule=!0,t.default={el:{colorpicker:{confirm:"OK",clear:"Clear"},datepicker:{now:"Now",today:"Today",cancel:"Cancel",clear:"Clear",confirm:"OK",selectDate:"Select date",selectTime:"Select time",startDate:"Start Date",startTime:"Start Time",endDate:"End Date",endTime:"End Time",year:"",month1:"Jan",month2:"Feb",month3:"Mar",month4:"Apr",month5:"May",month6:"Jun",month7:"Jul",month8:"Aug",month9:"Sep",month10:"Oct",month11:"Nov",month12:"Dec",weeks:{sun:"Sun",mon:"Mon",tue:"Tue",wed:"Wed",thu:"Thu",fri:"Fri",sat:"Sat"},months:{jan:"Jan",feb:"Feb",mar:"Mar",apr:"Apr",may:"May",jun:"Jun",jul:"Jul",aug:"Aug",sep:"Sep",oct:"Oct",nov:"Nov",dec:"Dec"}},select:{loading:"Loading",noMatch:"No matching data",noData:"No data",placeholder:"Select"},cascader:{noMatch:"No matching data",loading:"Loading",placeholder:"Select"},pagination:{goto:"Go to",pagesize:"/page",total:"Total {total}",pageClassifier:""},messagebox:{title:"Message",confirm:"OK",cancel:"Cancel",error:"Illegal input"},upload:{delete:"Delete",preview:"Preview",continue:"Continue"},table:{emptyText:"No Data",confirmFilter:"Confirm",resetFilter:"Reset",clearFilter:"All",sumText:"Sum"},tree:{emptyText:"No Data"},transfer:{noMatch:"No matching data",noData:"No data",titles:["List 1","List 2"],filterPlaceholder:"Enter keyword",noCheckedFormat:"{total} items",hasCheckedFormat:"{checked}/{total} checked"}}}},67:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=a(0),i=l(n),s=a(8),c=a(20),r=a(16),u=l(r),d=a(18),f=l(d);a(9);var h=a(17),p=l(h),m=a(4),g=l(m);i.default.use(p.default);var _={en:{Statistics:"Statistics","Select Account Start":"Please select an AdAccount to start",Language:"Language",Logout:"Logout"},zh:{Statistics:"统计","Select Account Start":"请选择一个广告账号开始",Language:"语言",Logout:"登出"}},b=new p.default({locale:"en",messages:_});g.default.i18n(function(e){return b.t(e)});var v={data:function(){return{acs:[],ac_idx:!u.default.isProduction(),langx:"en",contentHash:""}},computed:(0,s.mapState)({user:function(e){return e.user},ac_id:function(e){return e.data?e.data.ac_id:""},lang:function(e){return e.data?e.data.lang:"en"}}),mounted:function(){u.default.loading(!1),console.log("store.state.data",this.ac_id),this.langx=this.lang?this.lang:"en",b.locale=this.langx,this.getAcsList(),this.setContentHash(location.hash)},methods:o({},(0,s.mapActions)([c.SET]),{acChecked:function(e){var t=this.ac_id;this.SET({ac_id:e,lang:this.langx}),this.ac_idx=e,t!=e&&location.reload()},LanguageChecked:function(e){var t=this.lang;this.SET({lang:e}),b.locale=e,this.langx=e,t!=e&&location.reload()},then:function(e,t){switch(t){case f.default.getAcsList.code:this.acs=e.data,this.ac_idx=this.ac_id;break;case f.default.getFBAccounts.code:var a=[];e.data.forEach(function(e){a.push({account_id:e.account_id,account_name:e.name})}),this.acs=a,this.ac_idx=this.ac_id}},getAcsList:function(){u.default.http(f.default.getFBAccounts,{},this.then)},setContentHash:function(e){e=e.replace("#/",""),console.log("setContentHash",e),this.contentHash=e.replace("#/","")}})};t.default=o({i18n:b},v)},68:function(e,t,a){t=e.exports=a(3)(),t.push([e.i,".overflow-y{overflow-y:auto}.header .el-input__icon+.el-input__inner,.header .el-select:hover .el-input__inner{background:#222;color:#fff}.header .el-input__inner{border:0}.header-select .el-select-dropdown__wrap{max-height:100%}.mytable .el-table__expanded-cell{padding-top:0;padding-bottom:0}.mytable .el-table .cell,.mytable .el-table th>div{padding-left:3px;padding-right:3px}.mytable .el-table th>.cell{overflow:hidden;height:30px}.mytable .el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close{position:relative;font-size:16px;width:auto;height:auto;vertical-align:middle;line-height:100%;overflow:hidden;top:0;right:0;transform-origin:50% 50%}",""])},69:function(e,t,a){a(71);var l=a(2)(a(67),a(70),null,null);e.exports=l.exports},70:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-header",{attrs:{title:e.$t("Statistics")}},[a("router-link",{attrs:{to:"?"},slot:"left"},[a("el-select",{attrs:{placeholder:e.$t("Select Account Start"),"popper-class":"header-select"},on:{change:e.acChecked},model:{value:e.ac_idx,callback:function(t){e.ac_idx=t},expression:"ac_idx"}},e._l(e.acs,function(t){return a("el-option",{key:t.account_id,attrs:{label:t.account_name,value:t.account_id}},[a("span",{staticStyle:{float:"left"}},[e._v(e._s(t.account_name))]),e._v(" "),a("span",{staticStyle:{float:"right","font-size":"10px","padding-left":"20px"}},[e._v(e._s(t.account_id))])])}))],1),e._v(" "),a("div",{slot:"right"},[a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:e.$t("Language"),"popper-class":"header-select"},on:{change:e.LanguageChecked},model:{value:e.langx,callback:function(t){e.langx=t},expression:"langx"}},e._l([{key:"zh",label:"中 文"},{key:"en",label:"English"}],function(e){return a("el-option",{key:e.key,attrs:{label:e.label,value:e.key}})})),e._v(" "),a("router-link",{attrs:{to:"/signout"}},[e._v(e._s(e.user.name)+", "+e._s(e.$t("Logout")))])],1)],1)},staticRenderFns:[]}},71:function(e,t,a){var l=a(68);"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a(7)("c4326012",l,!0)},74:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(0),n=(l(o),a(16)),i=l(n),s=a(18),c=l(s);t.default={props:["type"],data:function(){return{rulesLog:[],checked:[],hashChecked:[]}},mounted:function(){var e={};"nofb"==this.type?i.default.http(c.default.getAcsList,e,this.then):i.default.http(c.default.getFBAccounts,e,this.then)},methods:{then:function(e,t){this.rulesLog=e.data,this.toggleSelection()},handleSelectionChange:function(e){this.checked=e},formatAccountName:function(e){return e.name?e.name:e.account_name},initChecked:function(e){this.hashChecked=e,this.toggleSelection()},toggleSelection:function(){var e=this,t=this.hashChecked;this.$refs.multipleAccountsTable.clearSelection(),console.log(this.checked),t.length>0&&setTimeout(function(){e.rulesLog.forEach(function(a){for(var l in t)if(t[l].account_id==a.account_id)try{e.$refs.multipleAccountsTable.toggleRowSelection(a,!0)}catch(e){}})},0)}}}},76:function(e,t,a){t=e.exports=a(3)(),t.push([e.i,".el-table__expanded-cell{padding-top:0;padding-bottom:0}.el-table .cell,.el-table th>div{padding-left:3px;padding-right:3px}.el-table th>.cell{overflow:hidden;height:30px}",""])},78:function(e,t,a){a(82);var l=a(2)(a(74),a(80),null,null);e.exports=l.exports},80:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{ref:"multipleAccountsTable",staticStyle:{width:"100%"},attrs:{data:e.rulesLog,border:"","max-height":"450"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"account_id",label:"Account ID",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{formatter:e.formatAccountName,label:"Account Name"}})],1)],1)},staticRenderFns:[]}},82:function(e,t,a){var l=a(76);"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a(7)("6020f03e",l,!0)},95:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=a(0),i=l(n),s=a(8),c=a(16),r=l(c),u=a(18),d=l(u),f=a(78),h=l(f),p=a(69),m=l(p),g=a(17),_=l(g),b=a(4),v=l(b),y=a(66),x=l(y),k=a(19),S=l(k);i.default.use(_.default);var w={en:o({"reg fb email":"Register facebook email","Staff Management":"Staff Management",operation:"Operation",groups:"Group","staff data":"Staff data","add staff":"Add Staff","Successful operation":"Successful operation","Are you sure you want to delete this employee?":"Are you sure you want to delete this employee?"},x.default),zh:o({"reg fb email":"注册 facebook email","Staff Management":"员工管理",operation:"操作",groups:"用户组","staff data":"用户数据","add staff":"添加用户","Successful operation":"操作成功","Are you sure you want to delete this employee?":"确认要删除此员工吗?"},S.default)},A=new _.default({locale:"en",messages:w});v.default.i18n(function(e){return A.t(e)});var C={components:{accounts_fb:h.default,headerTop:m.default},data:function(){return{activeName:"getRulesLog",dialogTableVisible:!1,rulesLog:[],form:{email:"",group_id:"0"},accountsChecked:[],accountsEmail:""}},computed:(0,s.mapState)({user:function(e){return e.user},lang:function(e){return e.data?e.data.lang:"en"}}),mounted:function(){A.locale=this.lang,this.init(),r.default.loading(!1)},methods:{init:function(){var e={};r.default.http(d.default.getUsers,e,this.then)},then:function(e,t){switch(t){case d.default.getUsers.code:this.rulesLog=e.data;break;case d.default.addUsers.code:case d.default.delUsers.code:r.default.toast(A.t("Successful operation"),"msg"),this.init();break;case d.default.getAccountsForEmail.code:this.accountsChecked=e.data,this.$refs.accounts_fb.initChecked(this.accountsChecked);break;case d.default.setAccountsForEmail.code:this.dialogTableVisible=!1}},formatUserdata:function(e,t){return e.id?e.id+","+e.name:"NO-LOGIN"},deleteUser:function(e,t){var a=this;r.default.confirm(A.t("Are you sure you want to delete this employee?"),function(){r.default.http(d.default.delUsers,{email:t.email},a.then)})},addUser:function(){if(/.*@.*\.[a-z]{2,4}/.test(this.form.email))return void r.default.http(d.default.addUsers,this.form,this.then);r.default.toast("email address error")},changeUser:function(e,t){r.default.http(d.default.updateUsers,{group_id:e,user_id:t.id,email:t.email},this.then)},openDialog:function(e,t){this.dialogTableVisible=!0,this.accountsEmail=t.email,r.default.http(d.default.getAccountsForEmail,{email:t.email},this.then)},saveAccounts:function(){var e=this.$refs.accounts_fb.checked;r.default.http(d.default.setAccountsForEmail,{email:this.accountsEmail,checked:e},this.then)},dialogClose:function(){this.dialogTableVisible=!1}}};t.default=o({i18n:A},C)}});
//# sourceMappingURL=3.build.js.map?1114d1f765014e3114bb