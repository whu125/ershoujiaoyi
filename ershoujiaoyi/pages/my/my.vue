<template>
	<view>
		<view class="usertop">
			<view class="head">
				<image :src="userInfo.avatarUrl" mode="" class="headIcon"></image>
				<text class="userId">
					{{userInfo.nickName}}
				</text>

				<text class="userSentence" @click="inputDialogToggle">{{userInfo.saying}}</text>
				<uni-popup ref="inputDialog" type="dialog">
					<uni-popup-dialog ref="inputClose" mode="input" title="请输入个性签名" value="" placeholder="请输入内容"
						@confirm="dialogInputConfirm"></uni-popup-dialog>
				</uni-popup>
			</view>
		</view>
		<view class="usertools" v-if="state==1">
			<view class="tool">
				<navigator url="./contact/contact">
					<image src="../../static/lianxiren.svg" mode="" style="width: 35px;height: 35px;"></image>
					<text>联系方式</text>
				</navigator>
			</view>
			<view class="tool">

				<navigator url="./myrelease/myrelease">
					<image src="../../static/release.svg" mode="" style="width: 35px;height: 35px;"></image>
					<text>我的发布</text>
				</navigator>


			</view>
			<view class="tool">
				<navigator url="./myconlect/myconlect">
					<image src="../../static/conlect.svg" mode="" style="width: 35px;height: 35px;"></image>
					<text>我的收藏</text>
				</navigator>
			</view>
			<view class="tool">
				<navigator url="./mycomment/mycomment">
					<image src="../../static/comment.svg" mode="" style="width: 35px;height: 35px;"></image>
					<text>我的评论</text>
				</navigator>
			</view>
		</view>

		<!-- 我非常怀疑现在传进去的不是响应式 -->
		<button class="loginBtn" @click="login" v-if="state==0">
			微信一键登录
		</button>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from "vue";

	import
	cloudApi
	from "../../common/cloudApi.js"

	import getUser from "../api/getUser.js"

	// import login from "../api/login.js"

	const state = ref(0)
	const inputDialog = ref()
	const value = ref('Be mentally stronger just like you said.')
	const inputDialogToggle = () => {
		inputDialog.value.open()
	}
	const dialogInputConfirm = (val) => {
		if (isNull(val))
			return

		userInfo.value.saying = val
		cloudApi.call({
			name: 'updateSaying',
			data: {
				// userInfo.value
				// openid
				saying: userInfo.value.saying,
				openid: openid.value
			},
			success: (res) => {


			}
		})
		inputDialog.value.close()

	}

	const userInfo = ref({})
	const openid = ref()
	const nickName = ref()

	const isNull = (str) => {
		if (str == "") return true;
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		console.log('检测', re.test(str))
		return re.test(str);

	}
	getUser(state, openid, userInfo)
	// console.log('开始的userInfo是', userInfo)

	onMounted(() => {
		// getUser(state, openid)
		//state被更新了


	})

	// const login = function(state, userInfo, openid, nickName) {
	// 	console.log('传进来的是', userInfo)
	// 	uni.getUserProfile({
	// 		desc: "我就是想用",
	// 		success: (res) => {

	// 			if (userInfo != null)
	// 				userInfo.value = Object.assign(userInfo.value, res.userInfo)
	// 			else userInfo = res.userInfo
	// 			console.log('这一步', userInfo)
	// 			console.log(userInfo.value)
	// 			console.log(openid)
	// 			// cloudApi.call({
	// 			// 	name: 'getUserinfo',
	// 			// 	data: {
	// 			// 		// userInfo.value
	// 			// 		// openid
	// 			// 		userInfo: userInfo.value,
	// 			// 		openid: openid
	// 			// 	},
	// 			// 	success: (res) => {

	// 			// 		state = 1

	// 			// 		console.log('首页的是', userInfo)
	// 			// 	}
	// 			// })
	// 			userInfo.value = res.userInfo

	// 			console.log('结束的是', userInfo)
	// 		}
	// 	})
	// }
	// console.log('state' + state.value)

	const login = async (options) => {

		uni.getUserProfile({
			desc: "我就是想用",
			success: (res) => {

				userInfo.value = Object.assign(userInfo.value, res.userInfo)
				// console.log('11', userInfo.value)
				cloudApi.call({
					name: 'getUserinfo',
					data: {
						// userInfo.value
						// openid
						userInfo: userInfo.value,
						openid: openid.value
					},
					success: async (res) => {
						state.value = 1

						const db = uniCloud.database();
						const result = await db.collection('users')
							.where({
								openid: openid.value
							})
							.get()
						userInfo.value.saying = result.result.data[0].saying
					}
				})
				// userInfo.value = res.userInfo
			}
		})


	}
</script>

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

	.usertools {
		box-sizing: border-box;
		padding: 0 20px;
		margin-top: 40px;
		width: 100%;
		height: 200rpx;
		// background-color: pink;
		display: flex;
		// grid-template-columns: 1fr 1fr 1fr 1fr;
		justify-content: space-around;
		// padding: 0 20px;


	}

	.tool {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 60px;
		height: 60px;

		image {
			// position: absolute;
			width: 35px;
			height: 35px;
			margin-left: 8px;
		}

		text {
			display: inline-block;
			margin-top: 5px;
			font-size: 12px;
		}
	}

	.loginBtn {
		margin-top: 200px;
		width: 50%;
		color: #fff;
		background-color: #469823;

	}
</style>
