<script>
    //import Vue from 'vue'
    import rightComponents from '../rightComponents.js' //加载右侧页面
    export default{
        props: ['content'],
        render: function(h) { // h 为 createElement 函数，接受三个参数
            // tag
            // data
            // children 具体看文档吧
            if(rightComponents[this.content]){
                return h(rightComponents[this.content], {});
            }
            return h(rightComponents['def'], {});
        },
    };
</script>