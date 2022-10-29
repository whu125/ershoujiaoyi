<template>
	<view class="" v-if="Object.getOwnPropertyNames(where).length != 0">
		<SearchList :where="where" :openid2="openid"></SearchList>
	</view>
</template>

<script setup>
	import {
		SearchList
	} from "../../components/SearchList.vue";
	import {
		reactive,
		ref,
		watch
	} from "vue";
	import isLogin from "../../api/isLogin.js"
	const where = ref({

	})

	const state = ref()
	const openid = ref()
	isLogin(state, openid)
	// where.value.userid = openid.value

	//想办法优化一下 不要加载之前的
	watch(openid, () => {
		where.value.conlectList = {
			useropenid: openid.value
		}
	})
</script>

<style>
	page {
		background-color: #f7f7f7;
	}
</style>

<style lang="less" scoped>

</style>
