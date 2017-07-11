import App from '../app.vue'
/**
 * auth true登录才能访问，false不需要登录，默认true
 */

export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/login', //登录
                meta: { auth: false },
                component: resolve => require(['../pages/login/index.vue'], resolve)
            },
            {
                path: '/signout', //退出
                component: resolve => require(['../pages/signout/index.vue'], resolve)
            },
            {
                path: '/home', //个人主页
                component: resolve => require(['../pages/home/index.vue'], resolve)
            },
            {
                path: 'adsList*', //广告列表
                component: resolve => require(['../pages/ads/list.vue'], resolve)
            },
            {
                path: 'rulesList*', //规则列表
                component: resolve => require(['../pages/rules/list.vue'], resolve)
            },
            {
                path: 'rulesLog*', //规则列表
                component: resolve => require(['../pages/rules/log.vue'], resolve)
            },
            {
                path: 'accounts*', //规则列表
                component: resolve => require(['../pages/system/accounts.vue'], resolve)
            },
            {
                path: 'users*', //规则列表
                component: resolve => require(['../pages/system/users.vue'], resolve)
            },
            {
                path: 'financial_flow*', //规则列表
                component: resolve => require(['../pages/system/financial_flow.vue'], resolve)
            },
            {
                path: '*', //其他页面，强制跳转到登录页面
                redirect: '/home'
            },
        ]
    }
]