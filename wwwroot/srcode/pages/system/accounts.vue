<style lang="stylus" rel="stylesheet/scss">

</style>
<template>
	<div class="mytable">
		<headerTop></headerTop>
		<el-col :span="4" style="height:100%;">
			<div class="grid-left bg-purple-darkc overflow-y"
				 id="app_left_menu">
				<v-leftMenu></v-leftMenu>
			</div>
		</el-col>
		<el-col :span="20" style="height:100%;">
			<div>
				<el-button type="primary" @click="openAccountsFBDialog" style=" float: right;z-index: 1;position: relative;">{{$t('bind account')}}
					<i class="el-icon-setting el-icon--right"></i></el-button>
				<el-tabs v-model="activeName" @tab-click="handleTabClick">
					<el-tab-pane :label="$t('Bound advertising account')" name="getRulesLog">
						<el-table :data="rulesLog" border style="width: 100%" max-height="750">
							<el-table-column prop="account_id" label="Account ID" width="180"></el-table-column>
							<el-table-column prop="account_name" label="Account Name"  ></el-table-column>
							<el-table-column :label="$t('operation')" width="120" >
								<template scope="scope">
									<el-button type="text" size="small" @click="unBindAccount(scope.$index, scope.row)">
										{{$t('Unbound')}}
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
				<el-dialog :title="$t('fb_accounts')" :visible.sync="dialogTableVisible" :close-on-click-modal="false"
						   :close-on-press-escape="false">
					<accounts_fb ref="accounts_fb"></accounts_fb>
					<span slot="footer" class="dialog-footer">
						<el-button @click="closeDialog">{{$t('el.messagebox.cancel')}}</el-button>
						<el-button type="primary" @click="bindFbAccounts">{{$t('el.messagebox.confirm')}}</el-button>
					  </span>
				</el-dialog>
			</div>
		</el-col>
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
    import headerTop from '../../components/headerTop.vue'
    
    import VueI18n from 'vue-i18n'
    import ElementLocale from 'element-ui/lib/locale'
    import enLocale from 'element-ui/lib/locale/lang/en'
    import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

    Vue.use(VueI18n);
    const messages = {
        en: {

            'bind account': 'Bind AdAccount',
			'Bound advertising account':'Bound advertising account',
			'operation':'Operation',
            'Unbound':'Unbound',
            'fb_accounts':'Facebook AdAccounts',
			'Successful operation':'Successful operation',
			...enLocale
        },
        zh: {
            'bind account': '绑定账号',
			'Bound advertising account':'已绑定广告账号',
			'operation':'操作',
			'Unbound':'解绑',
			'fb_accounts':'FB广告账号列表',
			'Successful operation':'操作成功',
			...zhLocale
        }
    }
    // Create VueI18n instance with options
    const i18n = new VueI18n({
        locale: 'en', // set locale
        messages, // set locale messages
    })

    ElementLocale.i18n(key => i18n.t(key))
var App={
        components:{
            accounts_fb:accounts_fb,
            headerTop:headerTop,
        },
        data:function(){
            return {
                activeName: 'getRulesLog',
                rulesLog:[],
                dialogTableVisible:false,
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
                vk.http(uri.getAcsList,params,this.then);
			},
            closeDialog(){
                this.dialogTableVisible=false;
			},
            then:function(json,code){
                switch(code){
					case uri.getAcsList.code:
					    this.rulesLog=json.data;
                        break;
					case uri.addAccounts.code:
					    this.dialogTableVisible=false;
					    vk.toast(i18n.t('Successful operation'),'msg');
                        this.init();
					    break;
					case uri.delAccounts.code:
                        vk.toast(i18n.t('Successful operation'),'msg');
                        this.init();
					    break;
				}
			},
            handleTabClick:function(){

			},
            openAccountsFBDialog(){
                this.dialogTableVisible=true;
			},
            bindFbAccounts(){
                var checked=this.$refs.accounts_fb.checked;
                if(checked.length>0){
                    var d=new Date();
                    var nowtime=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
                    vk.http(uri.addAccounts,{checked:checked,nowtime:nowtime},this.then);
				}
			},
            unBindAccount(index,row){
            	vk.http(uri.delAccounts,{account_id:row.account_id},this.then);
			}
		}
    }
    export default {i18n,accounts_fb,...App}
</script>