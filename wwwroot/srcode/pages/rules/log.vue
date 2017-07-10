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
		<el-tabs v-model="activeName" @tab-click="handleTabClick">
			<el-tab-pane :label="$t('Optimized record')" name="getRulesLog">
				<el-table :data="rulesLog" border style="width: 100%" max-height="750">
					<el-table-column type="expand" fixed>
						<template scope="scope">
							<v-ad_table :adsData="scope.row.expandTabData" :dataType="scope.row.expandTabDataType"
										rulesLog="rulesLog"></v-ad_table>
						</template>
					</el-table-column>
					<el-table-column :formatter="formatExecTarget" :label="$t('Executed target')" width="180"></el-table-column>
					<el-table-column :formatter="formatTime" :label="$t('Executed time')"  width="120"></el-table-column>
					<el-table-column :formatter="formatExecRule" :label="$t('Executed rule')"  ></el-table-column>
					<el-table-column prop="rule_exec" :label="$t('Executed results')"  ></el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane :label="$t('Optimized statistics')" name="RulesExecTotal">
				{{$t('Optimized statistics')}}
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'
	import vk from '../../vk.js';
    import uri from '../../uri.js';
    import VueI18n from 'vue-i18n'
    import ElementLocale from 'element-ui/lib/locale'

    Vue.use(VueI18n)
    const messages = {
        en: {

            'Optimized record': 'Optimized record',
            'Optimized statistics':'Optimized statistics',
            'Executed target':'Executed target',
            'Executed time':'Executed time',
            'Executed rule':'Executed rule',
            'Executed results':'Executed results',

        },
        zh: {
            'Optimized record': '优化记录',
            'Optimized statistics':'优化统计',
            'Executed target':'执行目标',
            'Executed time':'执行时间',
            'Executed rule':'执行规则',
            'Executed results':'执行结果',

        }
    }
    // Create VueI18n instance with options
    const i18n = new VueI18n({
        locale: 'en', // set locale
        messages, // set locale messages
    })

    ElementLocale.i18n(key => i18n.t(key))
    var App={
        data:function(){
            return {
                activeName: 'getRulesLog',
                rulesLog:[],
			}
		},
        computed: mapState({ user: state => state.user,lang:state => state.data?state.data.lang:"en" }),
        mounted(){
            i18n.locale=this.lang;
            var params={};
            vk.http(uri.getRulesLog,params,this.then);
            vk.loading(false);
        },
        methods:{
            then:function(json,code){
                switch(code){
					case uri.getRulesLog.code:
					    for(var i in json.data){
					        json.data[i].expandTabData=[JSON.parse(json.data[i].target_data)];
                            json.data[i].expandTabDataType=json.data[i].target.toLowerCase();
						}
					    this.rulesLog=json.data;
                        break;
				}


			},
            handleTabClick:function(dom){
                var uriKey=dom.name;
                var params={};
                if(uriKey=='getRulesLog') {
                    vk.http(uri[uriKey],params,this.then);
				}
			},
            formatExecTarget:function(row, column){
                return '['+row.target+']'+row.target_id;
            },
            formatExecRule:function(row){
                return '['+row.rule_id+']'+row.rule_name;
			},
            formatTime(row){
                return vk.date('YYYY-MM-DD HH:II',row.time);
			},
//            expandTab:function(row, expanded){
//            	this.expandTabData=[JSON.parse(row.target_data)];
//                this.expandTabDataType=row.target.toLowerCase();
//                console.log(this.expandTabDataType);
//			}
		}
    }
    export default {i18n,...App}
</script>