<style lang="stylus" rel="stylesheet/scss">
    .el-table__body .item {
        margin-top: 10px;
        margin-right: 50px;
    }
    .el-table__body .el-badge__content{
        top: 0px;
        left: 0px;
        right:0;
    }
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
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">{{$t('Charging method')}}</span>
                        <el-button style="float: right;" type="primary" @click="gotoRecharge">{{$t('balance recharge',{balance:balance})}}</el-button>
                    </div>
                    <div class="text item">
                        {{$t('Charging method info')}}
                    </div>
                    <div class="text item">
                        Today is expected to cost: <span style="color:#f33;">${{spend}}</span>
                        <span style="float: right;color:#33f;" v-show="free">{{freeInfo}}</span>
                    </div>
                </el-card>
                <el-tabs v-model="activeName">
                    <el-tab-pane :label="$t('Financial flow')" name="getRulesLog">
                        <el-table :data="rulesLog" border style="width: 100%" max-height="750">
                            <el-table-column :formatter="formatDate" label="Date" width="120"></el-table-column>
                            <el-table-column label="Type" width="120">
                                <template scope="scope">
                                    <div v-if="scope.row.type == 2" >
                                        <el-badge value="Free" class="item">
                                            {{$t('Spend')}}
                                        </el-badge>
                                    </div>
                                    <div v-else-if="scope.row.type == 0">
                                        {{$t('Spend')}}
                                    </div>
                                    <div v-else="">
                                        {{$t('Recharge')}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column :formatter="formatValue" label="Amount of money" ></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
                <el-dialog title="Recharge" :visible.sync="dialogTableVisible" :close-on-click-modal="false"
                           :close-on-press-escape="false">
                    <h1>{{$t('recharge info')}}</h1>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogClose">{{$t('el.messagebox.confirm')}}</el-button>
                      </span>
                </el-dialog>
                <a id="gotoRechargeLink" :href="href" style="display: none" target="_blank"></a>
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
    import headerTop from '../../components/headerTop.vue'
    
    import VueI18n from 'vue-i18n'
    import ElementLocale from 'element-ui/lib/locale'
    import enLocale from 'element-ui/lib/locale/lang/en'
    import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

    Vue.use(VueI18n)
    const messages = {
        en: {
            'Financial flow':'Financial flow',
            'Charging method':'Charging method',
            'Charging method info':'Daily expenditure = (Active Ad number * 0.1$) + (Optimized record number * 0.5$)',
            'balance recharge':'Balance ${balance},Recharge',
            'Recharge':'Recharge',
            'Spend':'Spend',
            'Free Spend':'Free Spend',
            'recharge info':'After the payment is successful, 5 minutes arrival, please contact us for account questions',
            'Free period':'Free for {freeday} days, please feel free to use',
            'Free Recharge':'Can only free {freeday} days, please recharge',
            ...enLocale
        },
        zh: {
            'Financial flow':'财务流水',
            'Charging method':'计费方法',
            'Charging method info':'每天花费 = (Active广告条数 * 0.1$) + (优化记录数 * 0.5$)',
            'balance recharge':'余额 ${balance}，充值',
            'Recharge':'充值',
            'Spend':'花费',
            'Free Spend':'花费',
            'recharge info':'支付成功后5分钟到账，账务问题请联系我们',
            'Free period':"免费{freeday}天，请放心使用",
            'Free Recharge':'只能免费{freeday}天了，请充值',
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
            headerTop:headerTop,
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
                balance:0,
                href:"http://go.vking.wang",
                spend:0,
                free:false,
                freeday:0,
                freeInfo:"",
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
                vk.http(uri.getFinancialFlow,params,this.then);
			},
            then:function(json,code){
                switch(code){
					case uri.getFinancialFlow.code:
					    this.rulesLog=json.data.list;
					    this.balance=(json.data.balance/100).toFixed(2);
                        this.spend=json.data.spend;
                        this.free=json.data.free;
                        //this.freeday=json.data.freeday;
                        if(json.data.freeday<4){
                            this.freeInfo=i18n.t('Free Recharge',{'freeday':json.data.freeday});
                        }else{
                            this.freeInfo=i18n.t('Free period',{'freeday':json.data.freeday});
                        }
                        break;
				}


			},
            formatDate:function(row, column){
                return vk.date("YYYY-MM-DD",row.addtime);
            },
            formatType:function(row, column){
                var str=row.type==1?'Recharge':(row.type==2?'Free Spend':'Spend');
                return i18n.t(str);
            },
            formatValue:function(row, column){
                return '$'+(row.value/100).toFixed(2);
            },
            dialogClose(){
                this.dialogTableVisible=false;
                location.reload();
			},
            gotoRecharge(){
                var user=this.user;
                this.href="http://go.vking.wang/?username="+user.name+"&email="+user.email+"&userid="+user.id+"&from=fb.vking.wang",
                this.dialogTableVisible=true;
                setTimeout(function(){
                    document.getElementById('gotoRechargeLink').click();
                },100);
            }
		}
    }
    export default {i18n,...App}
</script>