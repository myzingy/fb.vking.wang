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
		<el-table :data="rulesData" border style="width: 100%" max-height="450" ref="multipleTable"  @selection-change="handleSelectionChange">
			<el-table-column
					type="selection"
					width="55">
			</el-table-column>
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
		</el-table>
		<br>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item :label="$t('run time')">
				<el-time-select :picker-options="{start: '10:00',step: '00:30',end: '22:00'}"
								:placeholder="$t('el.select.placeholder')" v-model="form.date" :editable="false"
								:clearable="false"></el-time-select>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    //import ElementUI from 'element-ui'
    //import 'element-ui/lib/theme-default/index.css'
    import vk from '../../vk.js';
    import uri from '../../uri.js';
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
        data:function(){
            return {
                rulesData:[],
                multipleSelection:[],
				form:{
                    date:"10:00",
				}
            }
        },
//        props: {
//            'RulesChecked':{
//                type: Array,
//                validator: function (value) {
//                    console.log('props-RulesChecked',value);
//                    return true;
//                }
//            }
//        },
        computed: mapState({ user: state => state.user,lang:state => state.data?state.data.lang:"en" }),
        mounted(){
            i18n.locale=this.lang;
            var params={'status':0};
            vk.http(uri.getRulesData,params,this.then);
        },
        methods:{
            init:function(RulesChecked,RulesCheckedTime){
                this.multipleSelection=[];
                this.RulesChecked= RulesChecked;
                this.form={date:RulesCheckedTime};
                console.log('this.form',RulesCheckedTime,this.form.date);
                //this.$refs.multipleTable.clearSelection();
                this.toggleSelection();
			},
            then:function(json,code){
                switch(code){
                    case uri.getRulesData.code:
                        this.rulesData=json.data;
                        this.toggleSelection();
                        break;
					case uri.saveRulesForAd.code:
					    vk.toast(i18n('Successful operation'),'msg');
                        break;
                }
            },
            toggleSelection:function() {
                //console.log('RulesChecked-rows',this.RulesChecked);
                var that=this;
                this.$refs.multipleTable.clearSelection();
                if(this.RulesChecked.length>0){
                    setTimeout(function(){
                        that.rulesData.forEach(row => {
                            for(var i in that.RulesChecked){
                                if(that.RulesChecked[i]==row.id){
                                    that.$refs.multipleTable.toggleRowSelection(row);
                                }
                            }
                        })
					},0);

				}
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            saveRulesForAd(target_id,target){
                this.form.target=target;
                this.form.target_id=target_id;
                this.form.rules_ids=[];
                console.log(this.multipleSelection);
                this.multipleSelection.forEach(r=>{
                    this.form.rules_ids.push(r.id);
				});
                vk.http(uri.saveRulesForAd,this.form,this.then);
			}
        }
    }
    export default {i18n,...App}
</script>