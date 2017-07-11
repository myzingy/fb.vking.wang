<style lang="stylus" rel="stylesheet/scss">
	.el-table__expanded-cell
		padding-top 0
		padding-bottom 0
	.el-table .cell, .el-table th>div
		padding-left 3px
		padding-right 3px
	 .el-table th>.cell
		 overflow hidden
		 height 30px
	
</style>
<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane :label="$t('Staff Management')" name="getRulesLog">
				<el-form :inline="true" :model="form" class="demo-form-inline">
					<el-form-item label="Email">
						<el-input v-model="form.email" :placeholder="$t('reg fb email')"></el-input>
					</el-form-item>
					<el-form-item :label="$t('groups')">
						<el-select v-model="form.group_id" :placeholder="$t('el.select.placeholder')">
							<el-option label="Admin" value="0"></el-option>
							<el-option label="Advertisers" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addUser">{{$t('add staff')}}</el-button>
					</el-form-item>
				</el-form>
				<el-table :data="rulesLog" border style="width: 100%" max-height="750">
					<el-table-column prop="email" label="Email" width="250"></el-table-column>
					<el-table-column :formatter="formatUserdata" :label="$t('staff data')" ></el-table-column>
					<el-table-column :label="$t('groups')"  width="120">
						<template scope="scope">
						<el-select v-model="scope.row.group_id" :placeholder="$t('el.select.placeholder')" @change="changeUser(scope.row.group_id,scope.row)">
							<el-option label="Admin" value="0"></el-option>
							<el-option label="Advertisers" value="1"></el-option>
						</el-select>
						</template>
					</el-table-column>
					<el-table-column :label="$t('operation')" width="100"  >
						<template scope="scope">
							<el-button type="text" size="small" @click="deleteUser(scope.$index, scope.row)">
								{{$t('el.upload.delete')}}
							</el-button>
							<!--
							<el-button type="text" size="small" @click="openDialog(scope.$index, scope.row)">
								权限
							</el-button>
							-->
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		<el-dialog ref="accountDialog" title="AD账户列表" :visible.sync="dialogTableVisible" :close-on-click-modal="false"
				   :close-on-press-escape="false">
			<accounts_fb ref="accounts_fb" type="nofb"></accounts_fb>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogClose">{{$t('el.messagebox.cancel')}}</el-button>
				<el-button type="primary" @click="saveAccounts">{{$t('el.messagebox.confirm')}}</el-button>
			  </span>
		</el-dialog>
	</div>
</template>
<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    //import ElementUI from 'element-ui'
    //import 'element-ui/lib/theme-default/index.css'
	import vk from '../../vk.js';
    import uri from '../../uri.js';
    import accounts_fb from './accounts_fb.vue';
    import VueI18n from 'vue-i18n'
    import ElementLocale from 'element-ui/lib/locale'
    import enLocale from 'element-ui/lib/locale/lang/en'
    import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

    Vue.use(VueI18n)
    const messages = {
        en: {

            'reg fb email': 'Register facebook email',
            'Staff Management':'Staff Management',
            'operation':'Operation',
            'groups':'Group',
            'staff data':'Staff data',
            'add staff':'Add Staff',
            'Successful operation':'Successful operation',
            'Are you sure you want to delete this employee?':'Are you sure you want to delete this employee?',
            ...enLocale
        },
        zh: {
            'reg fb email': '注册 facebook email',
            'Staff Management':'员工管理',
            'operation':'操作',
            'groups':'用户组',
            'staff data':'用户数据',
            'add staff':'添加用户',
            'Successful operation':'操作成功',
			'Are you sure you want to delete this employee?':'确认要删除此员工吗?',
            ...zhLocale
        }
    }
    // Create VueI18n instance with options
    const i18n = new VueI18n({
        locale: 'en', // set locale
        messages, // set locale messages
    })

    ElementLocale.i18n(key => i18n.t(key))
var App= {
        components:{
            accounts_fb:accounts_fb,
        },
        data:function(){
            return {
                activeName: 'getRulesLog',
                dialogTableVisible:false,
                rulesLog:[],
				form:{
                    email:"",
                    group_id:"0"
				},
                accountsChecked:[],
                accountsEmail:"",
			}
		},
        computed: mapState({ user: state => state.user,lang:state => state.data?state.data.lang:"en" }),
        mounted(){
            i18n.locale=this.lang;
		   	this.init();
		   	vk.loading(false);
        },
        methods:{
            init(){
                var params={};
                vk.http(uri.getUsers,params,this.then);
			},
            then:function(json,code){
                switch(code){
					case uri.getUsers.code:
					    this.rulesLog=json.data;
                        break;
					case uri.addUsers.code:
					case uri.delUsers.code:
                        vk.toast(i18n.t('Successful operation'),'msg')
						this.init();
					    break;
					case uri.getAccountsForEmail.code:
					    this.accountsChecked=json.data;
                        this.$refs.accounts_fb.initChecked(this.accountsChecked);
					    break;
					case uri.setAccountsForEmail.code:
					    this.dialogTableVisible=false;
					    break;

				}


			},
            formatUserdata:function(row, column){
                if(row.id){
                    return row.id+','+row.name;
				}
                return 'NO-LOGIN';
            },
            deleteUser(index,row){
                var that=this;
                vk.confirm(i18n.t('Are you sure you want to delete this employee?'),function(){
                    vk.http(uri.delUsers,{email:row.email},that.then);
				});
			},
            addUser(){
                if(/.*@.*\.[a-z]{2,4}/.test(this.form.email)){
                    vk.http(uri.addUsers,this.form,this.then);
                    return;
				}
				vk.toast('email address error');
            },
            changeUser(group_id,row){
                vk.http(uri.updateUsers,{group_id:group_id,user_id:row.id,email:row.email},this.then);
			},
            openDialog(index,row){
                this.dialogTableVisible=true;
                this.accountsEmail=row.email;
                vk.http(uri.getAccountsForEmail,{email:row.email},this.then);
			},
            saveAccounts(){
                var checked=this.$refs.accounts_fb.checked;
                vk.http(uri.setAccountsForEmail,{email:this.accountsEmail,checked:checked},this.then);
			},
            dialogClose(){
                this.dialogTableVisible=false;
			}
		}
    }
    export default {i18n,...App}
</script>