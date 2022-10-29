<template>
	<view class="userInformation">
		<view>微信号</view>
		<text v-if="state==1">{{wechatValue}}</text>


	</view>
	<input type="text" @input="getWechat" v-if="state==0" focus class="input">
	<view class="userInformation">
		<view>QQ号</view>
		<text v-if="state==1">{{qqValue}}</text>

	</view>
	<input type="number" @input="getQQ" v-if="state==0" class="input">
	<view class="description">
		您的联系方式会被保存到数据库中，您可以随时在个人信息页面进行联系方式的修改和删除。
	</view>

	<button class="btn" @click="change" v-if="state==1">修改联系方式</button>
	<button class="btn" @click="changecommit" v-if="state==0">提交联系方式</button>
	<button class="btn-quxiao" @click="changeback" v-if="state==0">取消修改</button>
</template>

<script setup>
	import {
		ref,
		watch,
		watchEffect
	} from "vue";
	import isLogin from "../../api/isLogin.js";
	import getConnect from "../../api/getConnect.js";
	import
	cloudApi
	from "../../../common/cloudApi.js"
	//每个页面都要得到openid？？？
	const openid = ref();
	const loginstate = ref(0); //0表示未登录

	const state = ref(1)

	const wechatValue = ref('')
	const tempWechatValue = ref('')

	const qqValue = ref('')
	const tempQQValue = ref('')

	isLogin(loginstate, openid);

	console.log("openid被更新了吗", openid)

	watch(openid, () => getConnect(openid, qqValue, wechatValue))





	const change = () => {

		state.value = 0
	}

	const changeback = () => {

		state.value = 1
	}

	const changecommit = () => {
		state.value = 1
		wechatValue.value = tempWechatValue.value
		qqValue.value = tempQQValue.value
		//然后把value传到数据库
		cloudApi.call({
			name: 'updateConnect',
			data: {
				// userInfo.value
				// openid
				qq: qqValue.value,
				wechat: wechatValue.value,
				openid: openid.value
			},
			success: (res) => {


			}
		})
	}

	const getWechat = (e) => {
		tempWechatValue.value = e.target.value
	}

	const getQQ = (e) => {
		tempQQValue.value = e.target.value
	}
</script>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>
<style lang="less" scoped>
	.userInformation {
		margin: 20px;


	}

	.input {
		width: 100%;
		height: 40px;
		margin: 0;
		border-bottom: 1px solid #f7f7f7;
		border-top: 1px solid #f7f7f7;
		background-color: #fff;
	}


	.description {
		padding: 20px;
		font-size: 12px;
		color: #767676;
	}

	.btn {
		width: 50%;
		background-color: #12b02d;
		color: #fff;
	}

	.btn-quxiao {
		width: 50%;
		background-color: #eb1e4b;
		color: #fff;
		margin-top: 20px;
	}
</style>
