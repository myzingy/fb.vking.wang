<template>
    <el-card class="box-card">
        <el-steps :space="100" :active="1" direction="vertical">
            <el-step :title="$t('1. Bind AdAccount')" :description="$t('1. Bind AdAccount info')"></el-step>
            <el-step :title="$t('2. Create Rule')" :description="$t('2. Create Rule info')"></el-step>
            <el-step :title="$t('3. Bind Rule For Campaign')" :description="$t('3. Bind Rule For Campaign info')"></el-step>
        </el-steps>
    </el-card>
</template>
<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    //import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'
    import vk from '../../vk.js';
    import VueI18n from 'vue-i18n'
    import ElementLocale from 'element-ui/lib/locale'

    Vue.use(VueI18n)

    const messages = {
        en: {
            '1. Bind AdAccount': '1. Bind AdAccount',
            '2. Create Rule': '2. Create Rule',
            '3. Bind Rule For Campaign': '3. Bind Rule To Campaign',
            '1. Bind AdAccount info':
                'After binding the AdAccount, you need to wait for a period of time, up to 1 hours, and the advertising data will be synchronized',
            '2. Create Rule info': 'You need to create rules based on metrics and perfect rules to help you save your budget',
            '3. Bind Rule For Campaign info': 'Bind rules and times to campaigns, and perform optimizations every day',
            //...enLocale
        },
        zh: {
            '1. Bind AdAccount': '1,绑定广告账号',
            '2. Create Rule': '2,创建规则',
            '3. Bind Rule For Campaign': '3,给广告系列绑定规则',
            '1. Bind AdAccount info': '绑定账户后，需要等待一段时间，最多1小时，广告数据将会同步',
            '2. Create Rule info': '需要你根据指标数据创建规则，完善的规则帮你节约预算',
            '3. Bind Rule For Campaign info': '给广告系列绑定规则和时间，每天定时执行优化',
            //...zhLocale
        }
    }
    // Create VueI18n instance with options
    const i18n = new VueI18n({
        locale: 'en', // set locale
        messages, // set locale messages
    })

    ElementLocale.i18n(key => i18n.t(key))
//    Vue.use(ElementUI,{
//        i18n: key => i18n.vm._t(key)
//    })

    var App={
        computed: mapState({
            lang:state => state.data?state.data.lang:"en",
        }),
        mounted(){
            vk.loading(false);
            this.langx=this.lang?this.lang:'en';
            i18n.locale=this.langx;
        },
        methods:{
        },
    }
    export default {i18n,...App}
</script>