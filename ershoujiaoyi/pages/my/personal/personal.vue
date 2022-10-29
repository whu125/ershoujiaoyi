<template>
	<view>

		<view class="usertop" v-if="userInfo!=null">
			<view class="head">
				<image :src="userInfo.avatarUrl" mode="" class="headIcon"></image>
				<text class="userId">
					{{userInfo.nickName}}
				</text>

				<text class="userSentence" @click="inputDialogToggle">{{userInfo.saying}}</text>

			</view>
		</view>
		<view class="" style="height: 30px;">

		</view>

		<view class="" v-if="Object.getOwnPropertyNames(where).length != 0">
			<SearchList :where="where"></SearchList>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from "vue";
	import {
		SearchList
	} from "../../components/SearchList.vue";
	import {

		onShow,
		onLoad
	} from "@dcloudio/uni-app"
	const userInfo = ref({})
	const openid = ref()
	const where = ref({

	})
	import openidToUserInfo from "../../api/openidToUserInfo.js";
	// uni.$on('getuser', function(data) {
	// 	console.log(11)
	// 	console.log('收到了', data)
	// 	openid.value = data


	// })
	onLoad((option) => {
		// openidToUserInfo(openid, userInfo)
		console.log('777', option.openid)
		openid.value = option.openid
		openidToUserInfo(openid, userInfo)
	})

	watch(userInfo.value, () => {
		where.value.userId = userInfo.value.nickName
		console.log('12345', where.value)
	})
	// watch(openid, () => {
	// 	console('99', openid)
	// 	openidToUserInfo(openid, userInfo)
	// })
</script>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>
<style lang="less" scoped>
	.usertop {
		width: 100%;
		height: 200rpx;
		background-color: #2a82e4;
		border-bottom-left-radius: 100rpx;
		border-bottom-right-radius: 100rpx;
		z-index: -999;
	}

	.head {
		position: relative;
	}

	.headIcon {
		position: absolute;
		left: 90rpx;
		height: 140rpx;
		width: 140rpx;
		border-radius: 140rpx;
	}

	.userId {
		position: absolute;
		left: 250rpx;
		font-size: 25px;
		font-weight: 600;
		color: #fff;
	}

	.userSentence {
		position: absolute;
		left: 250rpx;
		top: 80rpx;
		font-size: 12px;

		color: #fff;
	}
</style>
