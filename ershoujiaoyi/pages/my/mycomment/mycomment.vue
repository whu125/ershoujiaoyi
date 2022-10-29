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
	import getUser from "../../api/getUser.js"
	const where = ref({

	})
	console.log('where', where.value)
	const state = ref()
	const openid = ref()
	const userInfo = ref({})
	getUser(state, openid, userInfo)

	watch(userInfo.value, () => {

		where.value.commentList = {
			username: userInfo.value.nickName
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
