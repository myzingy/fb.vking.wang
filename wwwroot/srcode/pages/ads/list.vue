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
   .el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close
	   position relative
	   font-size 16px
	   width auto
	   height auto
	   vertical-align middle
	   line-height 100%
	   overflow hidden
	   top 0
	   right 0
	   -ms-transform-origin 50% 50%
	   transform-origin 50% 50%
</style>
<template>
	<div style="padding: 10px;">
		<el-form :inline="true" :model="formSearch" class="demo-form-inline">
			<el-form-item :label="$t('search type')">
				<el-select v-model="formSearch.keyword_type" :placeholder="$t('el.select.placeholder')">
					<el-option :label="$t('campaign id or name')" value="campaign"></el-option>
					<el-option :label="$t('adset id or name')" value="adset"></el-option>
					<el-option :label="$t('ad id or name')" value="ad"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-input v-model="formSearch.keyword" :placeholder="$t('keyword')"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onFormSearch">{{$t('el.messagebox.confirm')}}</el-button>
				<a href="javascript://" @click="onClearFormSearch">{{$t('el.colorpicker.clear')}}</a>
			</el-form-item>
		</el-form>
		<el-tabs v-model="activeName" @tab-click="handleTabClick" type="card">
			<el-tab-pane name="getCampaignsData">
				<span slot="label">{{$t('campaigns')}}
					<el-tag v-show="getTabName('checked_campaigns')" :closable="true"
							@close="clearTabName('checked_campaigns')">{{getTabName
						('checked_campaigns')}}</el-tag>
				</span>
				<v-ad_table v-bind:adsData="campaignsData" dataType="campaign" @searchThatID="searchThatID"
							@openRulesDialog="openRulesDialog"></v-ad_table>
			</el-tab-pane>
			<el-tab-pane name="getAdsetsData">
				<span slot="label">{{$t('adsets')}}
					<el-tag v-show="getTabName('checked_adsets')" :closable="true" @close="clearTabName('checked_adsets')">{{getTabName('checked_adsets')
						}}</el-tag>
				</span>
				<v-ad_table v-bind:adsData="adsetsData" dataType="adset" @openRulesDialog="openRulesDialog" @searchThatID="searchThatID"
				></v-ad_table>
			</el-tab-pane>
			<el-tab-pane :label="$t('ads')" name="getAdsData">
				<v-ad_table v-bind:adsData="adsData" dataType="ad" @openRulesDialog="openRulesDialog"></v-ad_table>
			</el-tab-pane>
		</el-tabs>
		<div id="dialogRules">
		<el-dialog ref="refDialog" :title="$t('rules')" :visible.sync="dialogTableVisible" :close-on-click-modal="false"
				   :close-on-press-escape="false" @close="dialogClose" @open="dialogOpen">
			<v-rules_list ref="refRules"></v-rules_list>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogClose">{{$t('el.messagebox.cancel')}}</el-button>
				<el-button type="primary" @click="saveRulesForAd">{{$t('el.messagebox.confirm')}}</el-button>
			  </span>
		</el-dialog>
		</div>
	</div>
</template>
<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    //import ElementUI from 'element-ui'
    //import 'element-ui/lib/theme-default/index.css'
	import vk from '../../vk.js';
    import uri from '../../uri.js';
    import rules_list from '../rules/rules_list.vue';
    import ad_table from './ad_table.vue';

    import VueI18n from 'vue-i18n'
    import ElementLocale from 'element-ui/lib/locale'
    import enLocale from 'element-ui/lib/locale/lang/en'
    import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
    Vue.use(VueI18n)
    const messages = {
        en: {

            'search type': 'Search Type',
            'campaign id or name':'campaign id or name',
            'adset id or name':'adset id or name',
            'ad id or name':'ad id or name',
            'operation':'Operation',
            'keyword':'Keyword(Fuzzy matching)',
            'campaigns':'Campaigns',
            'adsets':'Ad Sets',
            'ads':'Ad',
            'Successful operation':'Successful operation',
			'rules':'Rules',
            ...enLocale
        },
        zh: {
            'search type': '类型',
            'campaign id or name':'系列 ID/名称',
            'adset id or name':'组 ID/名称',
            'ad id or name':'广告 ID/名称',
            'operation':'操作',
            'keyword':'关键字（支持模糊查询）',
            'campaigns':'广告系列',
            'adsets':'广告组',
            'ads':'广告',
            'Successful operation':'操作成功',
            'rules':'规则列表',
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
            'v-rules_list':rules_list,
            'v-ad_table':ad_table,
        },
        data:function(){
            return {
                activeName: 'getCampaignsData',
                campaignsData:[],
                adsetsData:[],
                adsData:[],
                formSearch:{
                    keyword_type:"",
					keyword:"",
					checked_campaigns:[],
                    checked_adsets:[],
				},
                dialogTableVisible:false,
                RulesChecked:[],
                RulesCheckedTime:"10:00",
				target:"",
				target_id:"",

			}
		},
        computed: mapState({ user: state => state.user ,lang:state => state.data?state.data.lang:"en" }),
        mounted(){
            i18n.locale=this.lang;
            this.getData();
            vk.loading(false);
        },
        methods:{
            getData(){
                var params=this.formSearch;
                vk.http(uri[this.activeName],params,this.then);
			},
            then:function(json,code){
                switch(code){
					case uri.getCampaignsData.code:
                        this.campaignsData=json.data;
                        break;
					case uri.getAdsetsData.code:
					    this.adsetsData=json.data;
					    break;
					case uri.getAdsData.code:
					    this.adsData=json.data;
					    break;
					case uri.getRulesForAd.code:
                        this.RulesChecked=[];
                        this.RulesCheckedTime="10:00";
                        json.data.forEach(r=>{
                            this.RulesChecked.push(r.id);
                            this.RulesCheckedTime=r.exec_hour_minute;
						});
					    //this.RulesChecked=json.data;
                        this.dialogTableVisible=true;
					    break;
				}


			},
            handleTabClick:function(){
                this.getData();
			},
            openRulesDialog:function($data){
                this.target_id=$data.Id;
                this.target=this.activeName;
                vk.http(uri.getRulesForAd,{id:$data.Id,type:this.activeName},this.then);

			},
            dialogClose(){
                this.dialogTableVisible=false;
			},
            dialogOpen(){
                var that=this;
                setTimeout(function(){
                    that.$refs.refRules.init(that.RulesChecked,that.RulesCheckedTime);
				},100);

			},
            saveRulesForAd(){
                this.dialogClose();
                this.$refs.refRules.saveRulesForAd(this.target_id,this.target);
			},
            onFormSearch(){
                this.getData();
			},
            onClearFormSearch(){
                this.formSearch.keyword_type="";
				this.formSearch.keyword="";
                this.getData();
			},
            searchThatID(ad,type){
                var ad={
                    id:ad.Id,
					name:ad.Name
				};
                if(type=='adset'){
                    this.formSearch.checked_adsets.push(ad);
                    this.activeName='getAdsData';
                    this.getData();
				}else{
                    this.formSearch.checked_campaigns.push(ad);
                    this.activeName='getAdsetsData';
                    this.getData();
				}
			},
            getTabName(key){
            	var arr=this.formSearch[key];
            	var len=arr.length;


                var str='';
                if(len>1){
                    str=len+' selected';
                }else if(len==1){
                    str=arr[0].name;
                }
                return str;
			},
            clearTabName(key){
                this.formSearch[key]=[];
			}
		}
    }
    export default {i18n,...App}
</script>