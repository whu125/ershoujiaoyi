<template>
	<view class="release">


		<view class="releaseTop">
			<!-- <view class="commit">
				发表
			</view> -->
		</view>
		<view class="releaseMain">
			<textarea v-model="description" id="" cols="30" rows="10" :placeholder="props.placeholder"></textarea>
			<view class="uploadImage">
				<!-- <van-uploader file-list="{{ fileList }}" bind:after-read="afterRead" /> -->
				<!-- <uni-file-picker  title="最多选择9张图片" limit="9" ></uni-file-picker> -->
				<!-- <uni-file-picker ref="files" v-model="imageValue" fileMediatype="image" mode="grid" :auto-upload="false"
					@success="success" @fail="fail" :limit="3" :image-styles="imageStyles" /> -->
				<uni-file-picker ref="files" v-model="imageValue" fileMediatype="image" mode="grid" :auto-upload="false"
					@success="success" :limit="3" :image-styles="imageStyles" />
				<!-- <audio :src="" :poster="" :name="" :author="" :action="" controls></audio> -->
			</view>

			<button class="setPrice" @click="toggle('bottom')">
				期望价格
			</button>

			<!-- <uni-popup ref="popup" background-color="#fff" @change="change"> -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">

					<view class="Price">
						<view class="setPriceTop">
							<text style="
							font-size: 20px;
							position: absolute;
							top:20px;
							left:10px;
							">
								请输入价格
							</text>
							<!-- <text style="
							
							position: absolute;
							top:25px;
							right:10px;
							color:#3dad2a
							">
								返回
							</text> -->
						</view>

						<input type="number" v-model="newPrice" placeholder="价格:(仅支持填写整数)" name="" id=""
							style="height: 50px;border-bottom: 1px solid #e6e6e6;padding-left:40rpx">
						<input type="number" v-model="oldPrice" placeholder="划线价:(仅支持填写整数)" name="" id=""
							style="height: 50px;border-bottom: 1px solid #e6e6e6;padding-left:40rpx">
						<button class="btn" @click="priceCommit">确定</button>
					</view>

				</view>
			</uni-popup>

			<!-- <view class="setPosition">
				所在位置
			</view> -->
			<!-- <uni-data-select v-model="value" :localdata="range" @change="change" style="height: 50px;"> -->

			<picker :range="range" @change="handleChange">
				<view class="setPosition">所在位置 {{ currExit }}</view>
			</picker>

			<picker :range="category" @change="handleCategoryChange">
				<view class="setPosition">品类标签 {{ currCategoryExit }}</view>
			</picker>


			<button class="finalBtn" :disabled="!canCommit" @click="commit">发布信息</button>

			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>

			<uni-popup ref="popup2" background-color="transparent" :mask-click="false">
				<!-- <view class="popup-content"> -->
				<uni-card :is-shadow="true">
					您还未登录，3s后跳转到登录页面
				</uni-card>

				<!-- </view> -->
			</uni-popup>
			<!-- </uni-data-select> -->
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		onUpdated,
		reactive,
		ref,
		watch
	} from "vue";
	import isLogin from "../api/isLogin.js";
	import getUser from "../api/getUser.js";
	import
	cloudApi
	from "../../common/cloudApi.js"
	const props = defineProps(['placeholder'])

	const oldPrice = ref();
	const newPrice = ref();


	const message = ref();
	const msgType = ref('success')
	const messageText = ref('这是一条成功提示')

	const files = ref();
	const fileNumber = ref(0)
	const newitem = reactive({
		oldPrice: '',
		newPrice: '',
		description: '',
		itemimage1: '',
		itemimage2: '',
		itemimage3: '',
		position: '',
		category: ''
	})
	//小心之后传值进去出乱子 会丢失响应式？但是没关系 我拿到值就可以
	const userInfo = ref({})
	const popup2 = ref()
	const canCommit = ref(false)
	const description = ref('')
	const range = reactive(
		['文理学部-湖滨', '文理学部-桂园', '文理学部-枫园', '文理学部-梅园', '工学部', '信息学部', '医学部', '网安基地', '其他地区']
	)
	const category = reactive(
		['数码设备', '服饰鞋帽', '美妆个护', '吃喝玩乐', '文具书籍', '问卷资料', '日常用品', '国潮文创', '其他闲置']
	)
	const loginstate = ref()
	const openid = ref(0)
	//每个页面都有 是否可以集成？
	const currIndex = ref(0)
	const currExit = ref('')
	const currCategoryExit = ref('')

	const type = ref('')
	const popup = ref('')


	const imageValue = reactive([])
	const imageStyles = reactive({
		width: 100,
		height: 100,
		border: {
			color: "#f7f7f7",
			width: 2,
			style: 'solid',
			radius: '2px'
		}
	})

	//可以优化一下？不用每次都请求登陆 openid传进来 注册事件？优化一下
	getUser(loginstate, openid, userInfo)

	onUpdated(() => {
		isCanCommit();
	})
	// const login = (options) => {
	// 	uni.getUserProfile({


	// 		desc: "我就是想用",
	// 		success: (res) => {
	// 			// console.log('你他妈到底调用了吗')

	// 			// console.log('11', userInfo.value)

	// 		}
	// 	})

	// }
	watch(loginstate, () => {
		console.log(loginstate)
		if (loginstate.value == 0) {
			//请求登录
			console.log('应该请求登录了')
			popup2.value.open('center')

			setTimeout(() => {
				popup2.value.close()
				uni.switchTab({
					url: '/pages/my/my'
				})
			}, 3000)

			// userInfo.value = res.userInfo
		}

	})

	const getData = () => {
		newitem.description = description.value;
		newitem.position = currExit.value
		newitem.category = currCategoryExit.value
	}
	const success = (res) => {
		fileNumber.value = res.tempFilePaths.length
		console.log('文件数量', fileNumber.value)
		switch (fileNumber.value) {
			case 0:
				break;
			case 1:

				newitem.itemimage1 = res.tempFilePaths[0];
				console.log('文件上传里面', newitem.itemimage1)
				break;
			case 2:
				newitem.itemimage1 = res.tempFilePaths[0];
				newitem.itemimage2 = res.tempFilePaths[1];
				break;
			case 3:
				newitem.itemimage1 = res.tempFilePaths[0];
				newitem.itemimage2 = res.tempFilePaths[1];
				newitem.itemimage3 = res.tempFilePaths[2];
				break;

		}
		console.log('这里执行了吗')
		cloudApi.call({
			name: 'release',
			data: {
				// userInfo.value
				// openid
				newitem: newitem,
				userInfo: userInfo.value,
				openid: openid.value
			},
			success: (res) => {
				messageText.value = `发布成功`
				message.value.open()

				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index',
						success: () => {
							uni.$emit('update')
						}
					});
				}, 2000)

			}
		})
	}

	const toggle = (a) => {

		type.value = a
		console.log(type.value)
		// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
		popup.value.open(type.value)

	}

	const handleChange = (e) => {
		currIndex.value = e.target.value;
		currExit.value = range[currIndex.value]
	}
	const handleCategoryChange = (e) => {
		currIndex.value = e.target.value;
		currCategoryExit.value = category[currIndex.value]
	}

	const isCanCommit = () => {
		//可能还是要去掉空格

		if (description.value != '' && currExit.value != "" && currCategoryExit.value != "") {
			canCommit.value = true;

		} else {

			canCommit.value = false;
		}
	}

	const commit = () => {
		getData();
		//把本地的打包成一个对象传进去
		if (files.value.files.length == 0) {
			cloudApi.call({
				name: 'release',
				data: {
					// userInfo.value
					// openid
					newitem: newitem,
					userInfo: userInfo.value,
					openid: openid.value
				},
				success: (res) => {
					messageText.value = `发布成功`
					message.value.open()

					setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/index',
							success: () => {
								uni.$emit('update')
							}
						});
					}, 2000)
				}
			})
		}
		files.value.upload();

	}

	const priceCommit = () => {
		if (oldPrice.value == null)
			newitem.oldPrice = ''
		else
			newitem.oldPrice = oldPrice.value;
		if (newitem.oldPrice >= 10000)
			newitem.oldPrice = 9999
		if (newPrice.value == null)
			newitem.newPrice = ''
		else
			newitem.newPrice = newPrice.value;
		if (newitem.newPrice >= 10000)
			newitem.newPrice = 9999
		popup.value.close()
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}
</style>


<style lang="less" scoped>
	.releaseMain {
		background-color: #fff;
	}

	.releaseTop {
		position: relative;
		height: 50px;
		background-color: #fff;
	}

	.commit {
		position: absolute;
		right: 20px;
		top: 10px;
		color: #469823;
	}

	.releaseMain {
		padding-bottom: 50px;

		textarea {


			margin: 0 auto;
			height: 100px;
			background-color: #fff;
		}

		.uploadImage {
			width: 100%;
			height: 100px;
			margin-left: 50px;
		}

		.setPrice {
			height: 50px;
			margin-top: 5px;
			background-color: #fff;
		}

		.setPosition {
			height: 50px;
			font-size: 18px;
			text-align: center;
			line-height: 50px;
			background-color: #fff;
			border-bottom: 1px solid #e6e6e6;
		}

		.Price {
			height: 500px;

			.setPriceTop {
				height: 80px;
				// background-color: pink;
				border-bottom: 1px solid #e6e6e6;
				position: relative;


			}

			.btn {
				margin-top: 50px;
				width: 50%;
				color: #fff;
				background-color: #12b02d;
			}
		}
	}

	.finalBtn {

		margin-top: 50px;

		width: 50%;
	}
</style>
