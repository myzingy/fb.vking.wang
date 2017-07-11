<style lang="stylus" rel="stylesheet/scss">
	.btn
		padding 50px
		text-align center
		button
			padding 5px 10px


</style>
<template>
	<div>
		<v-header title="退出">
			<router-link slot="left" to="/home">返回</router-link>
		</v-header>
		<div class="btn">
			<button v-on:click="submit">Logout...</button>
		</div>
	</div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { USER_SIGNOUT } from '../../store/user.js'
    export default {
        mounted(){
            this.submit();
		},
        methods: {
            ...mapActions([USER_SIGNOUT]),
            submit() {
                this.USER_SIGNOUT()
                window.localStorage.clear();
				this.$router.replace({ path: '/login' })
            }
        }
    }
</script>