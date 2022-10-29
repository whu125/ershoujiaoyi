<template>
	<view class="searchList">
		<!-- <view class="searchItem" v-for="item in props.itemList" :key="item.id"> -->
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="Itemlists" :page-size="5"
			page-data="add">
			<!-- 这里想写一个赋值函数 -->
			<view v-if="itemlist=data">

			</view>
			<view v-if="loading">
				<view style="margin:100px auto;text-align: center;">好物加载中...</view>
			</view>
			<view class="searchItem" v-for="data1 in itemlist" :key="data1._id">
				<view class="big">


					<view class="userHead">
						<image :src="data1.userHead" mode=""></image>
					</view>
					<view class="information">
						<view class="userInformation">
							<view class="userId">
								{{data1.userId}}
							</view>
							<view class="userTime">
								{{data1.userTime}}
							</view>

							<view class="userDescription">
								{{data1.userDescription}}
							</view>


						</view>

						<view class="itemImage" v-if="data1.itemimage1!=''">
							<image :src="data1.itemimage1" mode="" v-show="data1.itemimage1!=''"
								@click="clickImg(data1.itemimage1)"></image>
							<image :src="data1.itemimage2" mode="" v-show="data1.itemimage2!=''"
								@click="clickImg(data1.itemimage2)"></image>
							<image :src="data1.itemimage3" mode="" v-show="data1.itemimage3!=''"
								@click="clickImg(data1.itemimage3)"></image>
						</view>


						<view class="informationBottom">
							<image src="../../static/dianhua.svg" mode=""
								@click="getConnect('bottom',data1.userWechat,data1.userQQ)"></image>
							<image src="../../static/shoucang.svg" mode="" v-show="data1.conlect==false"
								@click="changeconlect(data1._id,data1.conlectNumber,data1.conlect)">
							</image>
							<!-- <image src="../../static/shoucang_active.svg" mode="" v-show="data1.conlect==true"
								@click="changeconlect(data1._id,data1.conlectNumber,data1.conlect)">
							</image> -->
							<image src="../../static/shoucang_active.svg" mode="" v-show="data1.conlect==true"
								@click="changeconlect(data1._id,data1.conlectNumber,data1.conlect)">
							</image>
							<!-- 要在页面上搞个假页面吗 每次重新加载也不合理 -->
							<text class="textConlectNumber" v-if="data1.conlectNumber!=0">{{data1.conlectNumber}}</text>
							<!-- <image src="../../static/shoucang_active.svg" mode="" v-show="data1.conlect==true"></image> -->
							<text class="textCommentNumber"
								v-if="data1.commentList.length!=0">{{data1.commentList.length}}</text>
							<image src="../../static/pinlun.svg" mode=""></image>
							<image src="../../static/fenxiang.svg" mode=""></image>
						</view>

						<view class="nowPrice">
							{{(data1.nowPrice=='')?data1.nowPrice:`¥${data1.nowPrice}`}}
						</view>

						<view class="oldPrice">
							{{(data1.oldPrice=='')?data1.nowPrice:`¥${data1.oldPrice}`}}
						</view>

						<view class="position">
							{{data1.position}}
						</view>

					</view>
				</view>
				<view class="comment" v-for="item2 in data1.commentList" :key="item2"
					v-show="data1.commentList.length!=0">
					<text class="textCommentId" v-if="item2.id==item.userId">{{item2.id}} :</text>
					<text class="textCommentId" v-if="item2.id!=item.userId">{{item2.id}} <text
							style="color: black;">回复</text> {{item.userId}}:</text>

					<text class="textComment">{{item2.content}}</text>


				</view>



			</view>

		</unicloud-db>
		<uni-popup ref="popup" background-color="#fff">
			<view>


				<button class="popup-content" @click="copy(wechat)">
					复制微信号 {{wechat}}
				</button>
				<button class="popup-content" @click="copy(qq)">
					复制QQ号 {{qq}}
				</button>
				<!-- <view class="cancel">
				取消
			</view> -->
			</view>
		</uni-popup>
	</view>

</template>

<script setup>
	import
	cloudApi
	from "../../common/cloudApi.js"
	import {
		onMounted,
		reactive,
		ref
	} from "vue";
	import {
		onPullDownRefresh,
		onReachBottom
	} from "@dcloudio/uni-app"
	// const props = defineProps(['itemList'])
	// console.log(props.itemList)

	const itemlist = ref({

	})





	const udb = ref()
	const flag = ref(true)
	const popup = ref()
	const type = ref()
	const wechat = ref()
	const qq = ref()
	const changeconlect = (id, conlectNumber, isconlect) => {
		//操作数据库
		//大问题 怎么刷新当前页面啊。。

		for (let i = 0; i < 999; i++) {
			console.log('22', itemlist.value[i])
			if (isconlect == true) {
				if (itemlist.value[i]._id == id) {
					itemlist.value[i].conlectNumber--;
					itemlist.value[i].conlect = false;
					break;
				}
			}
			if (isconlect == false) {
				if (itemlist.value[i]._id == id) {
					itemlist.value[i].conlectNumber++;
					itemlist.value[i].conlect = true;
					break;
				}
			}
		}
		console.log('111', isconlect)

		console.log('传进来的id是', id)
		//不用cloudApi 显示刷新太丑了
		while (1) {
			if (isconlect == false) {

				conlectNumber++;
				isconlect = true;
				break;
			}
			if (isconlect == true) {
				conlectNumber--;
				isconlect = false;
				break;
			}
		}

		// 还是得在前端弄个假的？


		uniCloud.callFunction({
			name: 'updateConlect',
			data: {
				isconlect: isconlect,
				conlectNumber: conlectNumber,
				id: id
			},
			success: (res) => {
				console.log(res)
				// if (res.result.token) token = res.result.token

			}
		})

		// cloudApi.call({
		// 	name: 'updateConlect',
		// 	data: {
		// 		// userInfo.value
		// 		// openid
		// 		conlectNumber: conlectNumber,
		// 		id: id
		// 	},
		// 	success: (res) => {
		// 		//想要页面重新渲染咋办

		// 	}
		// })

	}
	const getConnect = (a, wechat1, qq1) => {
		console.log(qq1)
		wechat.value = wechat1
		qq.value = qq1

		type.value = a
		console.log(popup)
		// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
		popup.value.open(type.value)


	}
	const clickImg = (image) => {
		uni.previewImage({
			urls: [image], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
			current: '', // 当前显示图片的http链接，默认是第一个
			success: function(res) {},
			fail: function(res) {},
			complete: function(res) {},
		})
	}

	const copy = (mes) => {
		uni.setClipboardData({
			data: mes,
			// success: function() {
			// 	console.log('success');
			// }
		});
		popup.value.close()
	}

	onMounted(() => {
		console.log(itemlist)
	})
	onPullDownRefresh(() => {
		// uni.showNavigationBarLoading()
		udb.value.loadMore()
		setTimeout(() => {
			//结束下拉刷新
			uni.stopPullDownRefresh();
		}, 1000);
	})
	onReachBottom(() => {
		// uni.showNavigationBarLoading()

		udb.value.loadMore()
		console.log('云端的data', itemlist)
	})
</script>

<style lang="less" scoped>
	.searchItem {
		position: relative;
		width: 90%;
		margin: 0 auto;
		margin-bottom: 15px;
		// height: 200px;
		background-color: #fff;
		padding-bottom: 10px;
		border-radius: 30px;
		display: flex;
		flex-direction: column;

		.big {
			display: flex;
		}

		.userHead {
			width: 20%;
			height: 100%;

			image {
				width: 40px;
				height: 40px;
				margin-top: 20px;
				margin-left: 40rpx;
				border-radius: 40px;
			}
		}

		.information {
			width: 80%;

			.userInformation {
				.userId {
					margin-top: 20px;
					margin-bottom: 5px;
				}

				.userTime {
					font-size: 10px;
					color: #747474;
				}

				.userDescription {
					font-size: 14px;
					padding-right: 20px;
					margin: 20px 0;
				}
			}

			.itemImage {
				display: flex;
				height: 80px;

				image {
					width: 80px;
					height: 80px;
					// background-color: #2a82e4;
					margin-right: 10px;
				}
			}
		}
	}

	.informationBottom {
		position: relative;
		height: 30px;
		margin-top: 10px;
		padding-right: 20px;
		display: flex;
		justify-content: space-between;
	}

	image {
		height: 25px;
		width: 25px;
	}

	.nowPrice {
		position: absolute;
		color: red;
		font-weight: 700;
		top: 15px;
		right: 20px;
		font-size: 18px;
	}

	.oldPrice {
		position: absolute;
		top: 40px;
		color: #939393;
		right: 20px;
		font-size: 14px;
		text-decoration: line-through;
	}

	.position {
		position: absolute;
		top: 20px;
		color: #30bfbf;
		right: 80px;
		font-size: 14px;

	}

	.textConlectNumber {
		position: absolute;
		font-size: 12px;
		left: 50%;
		transform: translateX(-60rpx);
		bottom: 7px;
	}

	.textCommentNumber {
		position: absolute;
		font-size: 12px;
		left: 50%;
		transform: translateX(95rpx);
		bottom: 7px;
	}

	.comment {
		margin: 0 auto;

		background-color: #e0e3e7;
		height: 20px;
		width: 250px;

		.textCommentId {
			line-height: 20px;
			padding-left: 10px;
			font-size: 12px;
			color: #5858f0;
		}

		.textComment {
			line-height: 20px;
			padding-left: 10px;
			font-size: 12px;
			color: black;
		}


	}

	.popup-content {
		text-align: center;
		margin: 0 auto;
		line-height: 50px;
		height: 50px;
		background-color: #fff;
		// height: 100px;
	}

	//非常奇怪 我不知道怎么取消padding
	.cancel {
		position: absolute;
		text-align: center;
		line-height: 35px;
		bottom: -35px;
		width: 100%;
		height: 35px;
		background-color: pink;
	}
</style>
