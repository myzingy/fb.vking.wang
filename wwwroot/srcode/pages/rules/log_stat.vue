<style lang="stylus" rel="stylesheet/scss">
	
</style>
<template>
	<div>
        <el-row>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">{{$t('Today')}}</span>
                    </div>
                    <div class="text item">
                        {{$t('Reduce losses')}}: <span style="color:#FF4949;">${{today.spend_cut}}</span>
                    </div>
                    <div class="text item">
                        {{$t('Increase budget')}}: <span style="color:#FF4949;">${{today.spend_put}}</span>
                    </div>
                    <div class="text item">
                        {{$t('Optimization number')}}: <span style="color:#FF4949;">{{today.total}}</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">{{$t('Optimization statistics')}}</span>
                    </div>
                    <div class="text item">
                        {{$t('Reduce losses')}}: <span style="color:#FF4949;">${{total.spend_cut}}</span>
                    </div>
                    <div class="text item">
                        {{$t('Increase budget')}}: <span style="color:#FF4949;">${{total.spend_put}}</span>
                    </div>
                    <div class="text item">
                        {{$t('Optimization number')}}: <span style="color:#FF4949;">{{total.total}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-table :data="last7day" border style="width: 100%" max-height="750">
            <el-table-column :formatter="formatDate" label="Date" width="180"></el-table-column>
            <el-table-column prop="spend_cut" :label="$t('Reduce losses')" width="120"></el-table-column>
            <el-table-column prop="spend_put" :label="$t('Increase budget')"  width="120"></el-table-column>
            <el-table-column prop="total" :label="$t('Optimization number')"  ></el-table-column>
        </el-table>

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

    Vue.use(VueI18n)
    const messages = {
        en: {
            'Reduce losses': 'Reduce losses',
            'Increase budget':'Increase budget',
            'Optimization number':'Optimization number',

        },
        zh: {
            'Reduce losses': '止损',
            'Increase budget':'增加预算',
            'Optimization number':'优化条数',

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
            
        },
        data:function(){
            return {
                today:{spend_cut:0,spend_put:0,total:0},
                last7day:[],
                total:{spend_cut:0,spend_put:0,total:0}
			}
		},
        computed: mapState({ lang:state => state.data?state.data.lang:"en" }),
        mounted(){
            i18n.locale=this.lang;
            var params={};
            vk.http(uri.getRulesLogStat,params,this.then);
        },
        methods:{
            then:function(json,code){
                switch(code){
					case uri.getRulesLogStat.code:
					    this.today=json.data.today;
                        this.last7day=json.data.last7day;
                        this.total=json.data.total;
                        break;
				}


			},
            formatDate(row){
                return vk.date('YYYY-MM-DD',row.time);
			},
		}
    }
    export default {i18n,...App}
</script>