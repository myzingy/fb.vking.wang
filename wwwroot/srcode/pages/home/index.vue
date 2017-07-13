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
            <div style="padding: 10px;">
                <def></def>
            </div>
        </el-col>
    </div>
</template>
<script>
    import headerTop from '../../components/headerTop.vue';
    import def from './def.vue';
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import vk from '../../vk.js';




	var App={
        components:{
            headerTop:headerTop,
            def:def
		},
        data:function(){
            return {
			}
		},
        computed: mapState({
            user: state => state.user
        }),
        mounted(){
            vk.loading(false);
        },
        methods:{

        },
    }
    export default App;
</script>