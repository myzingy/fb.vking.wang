webpackJsonp([4],{101:function(t,e,a){e=t.exports=a(3)(),e.push([t.i,"",""])},127:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mytable"},[a("headerTop"),t._v(" "),a("el-col",{staticStyle:{height:"100%"},attrs:{span:4}},[a("div",{staticClass:"grid-left bg-purple-darkc overflow-y",attrs:{id:"app_left_menu"}},[a("v-leftMenu")],1)]),t._v(" "),a("el-col",{staticStyle:{height:"100%"},attrs:{span:20}},[a("div",[a("el-button",{staticStyle:{float:"right","z-index":"1",position:"relative"},attrs:{type:"primary"},on:{click:t.openAccountsFBDialog}},[t._v(t._s(t.$t("bind account"))+"\n\t\t\t\t"),a("i",{staticClass:"el-icon-setting el-icon--right"})]),t._v(" "),a("el-tabs",{on:{"tab-click":t.handleTabClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:t.$t("Bound advertising account"),name:"getRulesLog"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.rulesLog,border:"","max-height":"750"}},[a("el-table-column",{attrs:{prop:"account_id",label:"Account ID",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"account_name",label:"Account Name"}}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("operation"),width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.unBindAccount(e.$index,e.row)}}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.$t("Unbound"))+"\n\t\t\t\t\t\t\t\t")])]}}])})],1)],1)],1),t._v(" "),a("el-dialog",{attrs:{title:t.$t("fb_accounts"),visible:t.dialogTableVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("accounts_fb",{ref:"accounts_fb"}),t._v(" "),a("span",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:t.closeDialog}},[t._v(t._s(t.$t("el.messagebox.cancel")))]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.bindFbAccounts}},[t._v(t._s(t.$t("el.messagebox.confirm")))])],1)],1)],1)])],1)},staticRenderFns:[]}},140:function(t,e,a){var n=a(101);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(7)("51fa1c39",n,!0)},63:function(t,e,a){a(140);var n=a(2)(a(93),a(127),null,null);t.exports=n.exports},66:function(t,e,a){"use strict";e.__esModule=!0,e.default={el:{colorpicker:{confirm:"OK",clear:"Clear"},datepicker:{now:"Now",today:"Today",cancel:"Cancel",clear:"Clear",confirm:"OK",selectDate:"Select date",selectTime:"Select time",startDate:"Start Date",startTime:"Start Time",endDate:"End Date",endTime:"End Time",year:"",month1:"Jan",month2:"Feb",month3:"Mar",month4:"Apr",month5:"May",month6:"Jun",month7:"Jul",month8:"Aug",month9:"Sep",month10:"Oct",month11:"Nov",month12:"Dec",weeks:{sun:"Sun",mon:"Mon",tue:"Tue",wed:"Wed",thu:"Thu",fri:"Fri",sat:"Sat"},months:{jan:"Jan",feb:"Feb",mar:"Mar",apr:"Apr",may:"May",jun:"Jun",jul:"Jul",aug:"Aug",sep:"Sep",oct:"Oct",nov:"Nov",dec:"Dec"}},select:{loading:"Loading",noMatch:"No matching data",noData:"No data",placeholder:"Select"},cascader:{noMatch:"No matching data",loading:"Loading",placeholder:"Select"},pagination:{goto:"Go to",pagesize:"/page",total:"Total {total}",pageClassifier:""},messagebox:{title:"Message",confirm:"OK",cancel:"Cancel",error:"Illegal input"},upload:{delete:"Delete",preview:"Preview",continue:"Continue"},table:{emptyText:"No Data",confirmFilter:"Confirm",resetFilter:"Reset",clearFilter:"All",sumText:"Sum"},tree:{emptyText:"No Data"},transfer:{noMatch:"No matching data",noData:"No data",titles:["List 1","List 2"],filterPlaceholder:"Enter keyword",noCheckedFormat:"{total} items",hasCheckedFormat:"{checked}/{total} checked"}}}},67:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},l=a(0),c=n(l),i=a(8),s=a(20),u=a(16),r=n(u),d=a(18),h=n(d);a(9);var f=a(17),g=n(f),p=a(4),m=n(p);c.default.use(g.default);var b={en:{Statistics:"Statistics","Select Account Start":"Please select an AdAccount to start",Language:"Language",Logout:"Logout"},zh:{Statistics:"统计","Select Account Start":"请选择一个广告账号开始",Language:"语言",Logout:"登出"}},_=new g.default({locale:"en",messages:b});m.default.i18n(function(t){return _.t(t)});var v={data:function(){return{acs:[],ac_idx:!r.default.isProduction(),langx:"en",contentHash:""}},computed:(0,i.mapState)({user:function(t){return t.user},ac_id:function(t){return t.data?t.data.ac_id:""},lang:function(t){return t.data?t.data.lang:"en"}}),mounted:function(){r.default.loading(!1),console.log("store.state.data",this.ac_id),this.langx=this.lang?this.lang:"en",_.locale=this.langx,this.getAcsList(),this.setContentHash(location.hash)},methods:o({},(0,i.mapActions)([s.SET]),{acChecked:function(t){var e=this.ac_id;this.SET({ac_id:t,lang:this.langx}),this.ac_idx=t,e!=t&&location.reload()},LanguageChecked:function(t){var e=this.lang;this.SET({lang:t}),_.locale=t,this.langx=t,e!=t&&location.reload()},then:function(t,e){switch(e){case h.default.getAcsList.code:this.acs=t.data,this.ac_idx=this.ac_id;break;case h.default.getFBAccounts.code:var a=[];t.data.forEach(function(t){a.push({account_id:t.account_id,account_name:t.name})}),this.acs=a,this.ac_idx=this.ac_id}},getAcsList:function(){r.default.http(h.default.getFBAccounts,{},this.then)},setContentHash:function(t){t=t.replace("#/",""),console.log("setContentHash",t),this.contentHash=t.replace("#/","")}})};e.default=o({i18n:_},v)},68:function(t,e,a){e=t.exports=a(3)(),e.push([t.i,".overflow-y{overflow-y:auto}.header .el-input__icon+.el-input__inner,.header .el-select:hover .el-input__inner{background:#222;color:#fff}.header .el-input__inner{border:0}.header-select .el-select-dropdown__wrap{max-height:100%}.mytable .el-table__expanded-cell{padding-top:0;padding-bottom:0}.mytable .el-table .cell,.mytable .el-table th>div{padding-left:3px;padding-right:3px}.mytable .el-table th>.cell{overflow:hidden;height:30px}.mytable .el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close{position:relative;font-size:16px;width:auto;height:auto;vertical-align:middle;line-height:100%;overflow:hidden;top:0;right:0;transform-origin:50% 50%}",""])},69:function(t,e,a){a(71);var n=a(2)(a(67),a(70),null,null);t.exports=n.exports},70:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-header",{attrs:{title:t.$t("Statistics")}},[a("router-link",{attrs:{to:"?"},slot:"left"},[a("el-select",{attrs:{placeholder:t.$t("Select Account Start"),"popper-class":"header-select"},on:{change:t.acChecked},model:{value:t.ac_idx,callback:function(e){t.ac_idx=e},expression:"ac_idx"}},t._l(t.acs,function(e){return a("el-option",{key:e.account_id,attrs:{label:e.account_name,value:e.account_id}},[a("span",{staticStyle:{float:"left"}},[t._v(t._s(e.account_name))]),t._v(" "),a("span",{staticStyle:{float:"right","font-size":"10px","padding-left":"20px"}},[t._v(t._s(e.account_id))])])}))],1),t._v(" "),a("div",{slot:"right"},[a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:t.$t("Language"),"popper-class":"header-select"},on:{change:t.LanguageChecked},model:{value:t.langx,callback:function(e){t.langx=e},expression:"langx"}},t._l([{key:"zh",label:"中 文"},{key:"en",label:"English"}],function(t){return a("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),a("router-link",{attrs:{to:"/signout"}},[t._v(t._s(t.user.name)+", "+t._s(t.$t("Logout")))])],1)],1)},staticRenderFns:[]}},71:function(t,e,a){var n=a(68);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(7)("c4326012",n,!0)},74:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=a(0),l=(n(o),a(16)),c=n(l),i=a(18),s=n(i);e.default={props:["type"],data:function(){return{rulesLog:[],checked:[],hashChecked:[]}},mounted:function(){var t={};"nofb"==this.type?c.default.http(s.default.getAcsList,t,this.then):c.default.http(s.default.getFBAccounts,t,this.then)},methods:{then:function(t,e){this.rulesLog=t.data,this.toggleSelection()},handleSelectionChange:function(t){this.checked=t},formatAccountName:function(t){return t.name?t.name:t.account_name},initChecked:function(t){this.hashChecked=t,this.toggleSelection()},toggleSelection:function(){var t=this,e=this.hashChecked;this.$refs.multipleAccountsTable.clearSelection(),console.log(this.checked),e.length>0&&setTimeout(function(){t.rulesLog.forEach(function(a){for(var n in e)if(e[n].account_id==a.account_id)try{t.$refs.multipleAccountsTable.toggleRowSelection(a,!0)}catch(t){}})},0)}}}},76:function(t,e,a){e=t.exports=a(3)(),e.push([t.i,".el-table__expanded-cell{padding-top:0;padding-bottom:0}.el-table .cell,.el-table th>div{padding-left:3px;padding-right:3px}.el-table th>.cell{overflow:hidden;height:30px}",""])},78:function(t,e,a){a(82);var n=a(2)(a(74),a(80),null,null);t.exports=n.exports},80:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{ref:"multipleAccountsTable",staticStyle:{width:"100%"},attrs:{data:t.rulesLog,border:"","max-height":"450"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"account_id",label:"Account ID",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{formatter:t.formatAccountName,label:"Account Name"}})],1)],1)},staticRenderFns:[]}},82:function(t,e,a){var n=a(76);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(7)("6020f03e",n,!0)},93:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},l=a(0),c=n(l),i=a(8),s=a(16),u=n(s),r=a(18),d=n(r),h=a(78),f=n(h),g=a(69),p=n(g),m=a(17),b=n(m),_=a(4),v=n(_),x=a(66),y=n(x),k=a(19),S=n(k);c.default.use(b.default);var A={en:o({"bind account":"Bind AdAccount","Bound advertising account":"Bound advertising account",operation:"Operation",Unbound:"Unbound",fb_accounts:"Facebook AdAccounts","Successful operation":"Successful operation"},y.default),zh:o({"bind account":"绑定账号","Bound advertising account":"已绑定广告账号",operation:"操作",Unbound:"解绑",fb_accounts:"FB广告账号列表","Successful operation":"操作成功"},S.default)},w=new b.default({locale:"en",messages:A});v.default.i18n(function(t){return w.t(t)});var L={components:{accounts_fb:f.default,headerTop:p.default},data:function(){return{activeName:"getRulesLog",rulesLog:[],dialogTableVisible:!1}},computed:(0,i.mapState)({user:function(t){return t.user},lang:function(t){return t.data?t.data.lang:"en"}}),mounted:function(){w.locale=this.lang,this.init(),u.default.loading(!1)},methods:{init:function(){var t={};u.default.http(d.default.getAcsList,t,this.then)},closeDialog:function(){this.dialogTableVisible=!1},then:function(t,e){switch(e){case d.default.getAcsList.code:this.rulesLog=t.data;break;case d.default.addAccounts.code:this.dialogTableVisible=!1,u.default.toast(w.t("Successful operation"),"msg"),this.init();break;case d.default.delAccounts.code:u.default.toast(w.t("Successful operation"),"msg"),this.init()}},handleTabClick:function(){},openAccountsFBDialog:function(){this.dialogTableVisible=!0},bindFbAccounts:function(){var t=this.$refs.accounts_fb.checked;if(t.length>0){var e=new Date,a=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds();u.default.http(d.default.addAccounts,{checked:t,nowtime:a},this.then)}},unBindAccount:function(t,e){u.default.http(d.default.delAccounts,{account_id:e.account_id},this.then)}}};e.default=o({i18n:w,accounts_fb:f.default},L)}});
//# sourceMappingURL=4.build.js.map?1114d1f765014e3114bb