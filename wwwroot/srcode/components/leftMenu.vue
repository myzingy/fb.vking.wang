<style lang="stylus" rel="stylesheet/scss">

</style>
<template>
  <div class="leftMenu">
    <el-row class="tac">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect" router="router">
        <el-menu-item-group v-show="nav.system">
          <template slot="title">{{$t('system management')}}</template>
          <el-menu-item index="accounts" v-show="nav.system_accounts" ><i class="el-icon-star-on"></i>{{$t('Ad Accounts')}}</el-menu-item>
          <el-menu-item index="users" v-show="nav.system_users" ><i class="el-icon-document"></i>{{$t('staff management')}}</el-menu-item>
          <el-menu-item index="financial_flow" v-show="nav.financial_flow" ><i class="el-icon-date"></i>{{$t('Financial flow')}}</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">{{$t('Ads Optimization')}}</template>
          <el-menu-item index="adsList" v-show="nav.ads" ><i class="el-icon-menu"></i>{{$t('Ads Management')}}</el-menu-item>
          <el-menu-item index="rulesList" v-show="nav.rules" ><i class="el-icon-setting"></i>{{$t('Rules Management')}}</el-menu-item>
          <el-menu-item index="rulesLog" v-show="nav.rules_log" ><i class="el-icon-time"></i>{{$t('Optimized record')}}</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-row>
  </div>
</template>



<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import vk from '../vk.js'
import uri from '../uri.js'

import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const messages = {
    en: {
        'system management': 'System Management',
        'Ad Accounts':'Ad Accounts',
        'staff management':'Staff Management',
        'Ads Optimization':'Ads Optimization',
        'Ads Management':'Ads Management',
        'Rules Management':'Rules Management',
        'Optimized record':'Optimized record',
        'Financial flow':'Financial flow',
    },
    zh: {
        'system management': '系统管理',
        'Ad Accounts':'广告账号',
        'staff management':'员工管理',
        'Ads Optimization':'广告优化',
        'Ads Management':'广告管理',
        'Rules Management':'规则管理',
        'Optimized record':'优化记录',
        'Financial flow':'财务流水',

    }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
})

ElementLocale.i18n(key => i18n.t(key))

var App={
    data () {
        return {
            nav:{
                system:true
            },
        };
    },
    computed: mapState({ lang:state => state.data?state.data.lang:"en"}),
    mounted(){
        i18n.locale=this.lang;
        vk.http(uri.getNavList,{},this.then);
    },
    methods: {
        then(json,code){
            this.nav=json.data;
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelect(key, keyPath){
            console.log(key, keyPath);
        }
    },
}
export default {i18n,...App}
</script>
