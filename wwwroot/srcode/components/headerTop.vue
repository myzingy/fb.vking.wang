<style lang="stylus" rel="stylesheet/scss">
    .overflow-y{ overflow-y: auto;}
    .header .el-select:hover .el-input__inner{
        background: #222;
        color:#fff;
    }
    .header .el-input__icon+.el-input__inner{
        background: #222;
        color:#fff;
    }
    .header .el-input__inner{
        border: 0;
    }
    .header-select .el-select-dropdown__wrap {
        max-height: 100%;
    }
    .mytable .el-table__expanded-cell
        padding-top 0
        padding-bottom 0
    .mytable .el-table .cell, .mytable .el-table th>div
        padding-left 3px
        padding-right 3px
    .mytable .el-table th>.cell
        overflow hidden
        height 30px
    .mytable .el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close
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
    <v-header :title="$t('Statistics')">
        <router-link slot="left" to="?">
            <el-select v-model="ac_idx" :placeholder="$t('Select Account Start')" @change="acChecked" popper-class="header-select">
                <el-option
                        v-for="item in acs"
                        :key="item.account_id"
                        :label="item.account_name"
                        :value="item.account_id">
                    <span style="float: left">{{ item.account_name }}</span>
                    <span style="float: right; font-size: 10px; padding-left: 20px;">{{
                        item.account_id }}</span>
                </el-option>
            </el-select>
        </router-link>
        <div slot="right">
            <el-select v-model="langx" :placeholder="$t('Language')" @change="LanguageChecked" style="width: 120px;" popper-class="header-select">
                <el-option
                        v-for="item in [{key:'zh',label:'中 文'},{key:'en',label:'English'}]"
                        :key="item.key"
                        :label="item.label"
                        :value="item.key">
                </el-option>
            </el-select>
            <router-link  to="/signout">{{user.name}}, {{$t('Logout')}}</router-link>
        </div>

    </v-header>
</template>
<script>
    import Vue from 'vue'
    import { mapState,mapActions } from 'vuex'
    import { SET } from '../store/data.js'
    import vk from '../vk.js';
    import uri from '../uri.js';
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'
    
    import VueI18n from 'vue-i18n'
    import ElementLocale from 'element-ui/lib/locale'

    Vue.use(VueI18n)

    const messages = {
        en: {
            Statistics: 'Statistics',
            'Select Account Start':'Please select an AdAccount to start',
            Language:'Language',
            Logout:'Logout',
        },
        zh: {
            Statistics: '统计',
            'Select Account Start':'请选择一个广告账号开始',
            Language:'语言',
            Logout:'登出',
        }
    }
    // Create VueI18n instance with options
    const i18n = new VueI18n({
        locale: 'en', // set locale
        messages, // set locale messages
    })

    //ElementLocale.i18n(key => i18n.t(key))
    Vue.use(ElementUI,{
        i18n: key => i18n.vm._t(key)
    })

    var App={
        data:function(){
            return {
                acs:[],
                ac_idx:!vk.isProduction(),
                langx:'en',
                contentHash:"",
            }
        },
        computed: mapState({
            user: state => state.user,
            ac_id: state => state.data?state.data.ac_id:"",
            lang:state => state.data?state.data.lang:"en",
        }),
        mounted(){
            vk.loading(false);
            console.log('store.state.data',this.ac_id);
            this.langx=this.lang?this.lang:'en';
            i18n.locale=this.langx;

            this.getAcsList();
            this.setContentHash(location.hash);
        },
        methods:{
            ...mapActions([SET]),
            acChecked:function(ac_id){
                var old_id=this.ac_id;
                this.SET({ac_id:ac_id,lang:this.langx});
                this.ac_idx=ac_id;
                if(old_id!=ac_id)
                    location.reload();
            },
            LanguageChecked(lang){
                var old_id=this.lang;
                this.SET({lang:lang});
                //ElementUI.locale(lang);
                i18n.locale=lang;
                this.langx=lang;
                if(old_id!=lang)
                    location.reload();
            },
            then(json,code){
                switch(code){
                    case uri.getAcsList.code:
                        this.acs=json.data;
                        this.ac_idx=this.ac_id;
                        break;
                    case uri.getFBAccounts.code:
                        var acs=[];
                        json.data.forEach(row=>{
                            acs.push({
                                account_id:row.account_id,
                                account_name:row.name
                            });
                        });
                        this.acs=acs;
                        this.ac_idx=this.ac_id;
                        break;
                }
            },
            getAcsList(){
                //vk.http(uri.getAcsList,{},this.then);
                vk.http(uri.getFBAccounts,{},this.then);
            },
            setContentHash(hash){
                hash=hash.replace('#/','');
                //if(!hash) return;
                console.log('setContentHash',hash);
                this.contentHash=hash.replace('#/','');
            }
        },
    }
    export default {i18n,...App}
</script>