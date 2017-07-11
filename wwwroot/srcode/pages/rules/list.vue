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
		<el-tabs v-model="activeName" @tab-click="handleTabClick">
			<el-tab-pane :label="$t('Rule list')" name="getRulesData">
				<el-table :data="rulesData" border style="width: 100%" max-height="100%">
					<el-table-column prop="id" label="ID" width="60"></el-table-column>
					<el-table-column prop="name" :label="$t('Rule Name')"  ></el-table-column>
					<el-table-column prop="type" :label="$t('Rule Size')" width="80">
						<template scope="scope">
							<template v-if=" scope.row.type == 2 ">
								{{$t('Rule Size Big')}}
							</template>
							<template v-else-if=" scope.row.type == 1 ">
								{{$t('Rule Size Small')}}
							</template>
							<template v-else>
								{{$t('Rule Size Simple')}}
							</template>
						</template>
					</el-table-column>
					<el-table-column prop="status" :label="$t('Status')" width="80">
						<template scope="scope">
							<template v-if=" scope.row.status == 0 ">
								<el-button @click.native.prevent="deleteRow(scope.$index, rulesData)"
										   type="success"
										   size="small">
									{{$t('Enabled')}}
								</el-button>
							</template>
							<template v-else>

								<el-button @click.native.prevent="deleteRow(scope.$index, rulesData)"
										   type="button"
										   size="small">
									{{$t('Disabled')}}
								</el-button>
							</template>

						</template>
					</el-table-column>
					<el-table-column :label="$t('operation')" width="120">
						<template scope="scope">
							<el-button @click.native.prevent="editRule(scope.$index, rulesData)"
									   type="text"
									   size="small">
								{{$t('Edit')}}
							</el-button>
							<el-button @click.native.prevent="append(scope.$index, rulesData)"
									   type="text"
									   size="small">
								{{$t('Wheel')}}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane :label="$t('Edit rule')" name="updateRule">
				<v-rule ref="rule" @showRulesView="showRulesView"></v-rule>
			</el-tab-pane>
		</el-tabs>
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
    import rule_edit from './rule_edit.vue';
    import headerTop from '../../components/headerTop.vue'
    
    import VueI18n from 'vue-i18n'
    import ElementLocale from 'element-ui/lib/locale'
    import enLocale from 'element-ui/lib/locale/lang/en'
    import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

    Vue.use(VueI18n)
    const messages = {
        en: {

            'Rule Name':'Rule Name',
            'Rule Size':'Rule Size',
            'Rule Size Big':'Large rules',
            'Rule Size Small':'Small rule',
            'Rule Size Simple':'Simple rule',
            'operation':'Operation',
            'Successful operation':'Successful operation',
            'run time':"Timed execution",

            ...enLocale
        },
        zh: {
            'Rule Name':'规则名称',
            'Rule Size':'规则大小',
            'Rule Size Big':'大型片段',
            'Rule Size Small':'小型片段',
            'Rule Size Simple':'简单规则',
            'operation':'操作',
            'Successful operation':'操作成功',
            'run time':"执行时间",

			'Rule list':'规则列表',
            'Edit rule':'编辑规则',
			'Status':'规则状态',
			'Edit':'编辑',
			'Wheel':'轮子',
			'Enabled':'启用中',
			'Disabled':'已禁用',
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
            'v-rule':rule_edit,
            headerTop:headerTop,
        },
        data:function(){
            return {
                activeName: 'updateRule',
                rulesData:[],
			}
		},
        computed: mapState({ user: state => state.user,lang:state => state.data?state.data.lang:"en" }),
        mounted(){
            i18n.locale=this.lang;
            vk.loading(false);
        },
        methods:{
            then:function(json,code){
                switch(code){
					case uri.getRulesData.code:
                        this.rulesData=json.data;
                        break;
				}
			},
            handleTabClick:function(dom){
                var uriKey=dom.name;
                var params={};
                if(uriKey=='getRulesData') {
                    vk.http(uri[uriKey],params,this.then);
				}
			},
            editRule:function(index,rulesData){
                this.activeName= 'updateRule';
                //console.log(index,rulesData[index].xml)
				this.$refs.rule.editInfo(rulesData[index]);
			},
            append:function(index,rulesData){
                this.activeName= 'updateRule';
                //console.log(index,rulesData[index].xml)
                this.$refs.rule.appendXML(rulesData[index].xml);
            },
			showRulesView:function(){
                this.activeName='getRulesData';
                vk.http(uri.getRulesData,{},this.then);
			}
		}
    }
    export default {i18n,...App}
</script>