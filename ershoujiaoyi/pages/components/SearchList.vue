<template>
	<view class="searchList">
		<!-- <view class="searchItem" v-for="item in props.itemList" :key="item.id"> -->
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="Itemlists" :page-size="5"
			page-data="add" orderby="ordertime desc" :where="props.where">
			<!-- 这里想写一个赋值函数 -->

			<view v-if="itemlist=data">
			</view>

			<view v-if="loading">
				<view style="margin:100px auto;text-align: center;">好物加载中...</view>
			</view>
			<view class="searchItem" v-for="data1 in itemlist" :key="data1._id">
				<!-- 这里太丑了 要重构 -->
				<view class="" v-for="useritem in data1.conlectList" :key="useritem.useropenid">
					<view v-if="useritem.useropenid==openid">
						<view v-if="data1.isConlect=true">

						</view>
					</view>
					<view v-if="useritem.useropenid!=openid&&data1.isConlect!=true">
						<view v-if="data1.isConlect=false">

						</view>
					</view>

				</view>
				<view class="big">


					<view class="userHead">
						<image :src="data1.userHead" mode="" @click="toPersonal(data1.userid)"></image>
					</view>
					<view class="information">
						<view class="userInformation">
							<view class="userId">
								{{data1.userId}}
							</view>
							<view class="userTime">
								{{data1.userTime}}
							</view>

							<view class="userDescription" :class="(data1.isDone)?'Donebgc':''">
								{{data1.userDescription}}
								<view class="isDone" v-if="data1.isDone==true">
									DONE
								</view>
							</view>


						</view>

						<view class="itemImage" v-if="data1.itemimage1!=''">
							<image :src="data1.itemimage1" mode="aspectFill" v-show="data1.itemimage1!=''"
								@click="clickImg(data1.itemimage1)"></image>
							<image :src="data1.itemimage2" mode="aspectFill" v-show="data1.itemimage2!=''"
								@click="clickImg(data1.itemimage2)"></image>
							<image :src="data1.itemimage3" mode="aspectFill" v-show="data1.itemimage3!=''"
								@click="clickImg(data1.itemimage3)"></image>
						</view>


						<view class="informationBottom" v-if="(props.openid2==null)?openid!=0:props.openid!=0">

							<view class=""
								v-if="(props.openid2==null)?data1.userid==openid:data1.userid==props.openid2">
								<image src="../../static/chuli.svg" mode=""
									@click="dialogToggle(data1._id,data1.isDone)">
								</image>
							</view>
							<view class=""
								v-if="(props.openid2==null)?data1.userid!=openid:data1.userid!=props.openid2">
								<image src="../../static/dianhua.svg" mode=""
									@click="getConnect('bottom',data1.userWechat,data1.userQQ)"></image>
							</view>
							<!-- <image src="../../static/dianhua.svg" mode=""
								@click="getConnect('bottom',data1.userWechat,data1.userQQ)"></image> -->
							<!-- <view class="" v-show="data1.conlect==false">
								<image src=" ../../static/shoucang.svg" mode="" v-show="data1.conlect==false"
									@click="changeconlect(data1._id,data1.conlectNumber,data1.conlect)">
								</image>
							</view> -->
							<!-- <image src="../../static/shoucang_active.svg" mode="" v-show="data1.conlect==true"
								@click="changeconlect(data1._id,data1.conlectNumber,data1.conlect)">
							</image> -->
							<view class="">


								<image src=" ../../static/shoucang.svg" mode="" v-show="data1.conlectList.length==0"
									@click="changeconlect(data1._id,data1.conlectNumber,false)">
								</image>

								<!-- <view class="" v-for="useritem in data1.conlectList" :key="useritem.useropenid"> -->
								<image src=" ../../static/shoucang.svg" mode=""
									v-show="data1.isConlect==false&&data1.conlectList.length!=0"
									@click="changeconlect(data1._id,data1.conlectNumber,false)">
								</image>

								<image src="../../static/shoucang_active.svg" mode="" v-show="data1.isConlect==true"
									@click="changeconlect(data1._id,data1.conlectNumber,true)">
								</image>
							</view>
							<!-- </view> -->
							<!-- 要在页面上搞个假页面吗 每次重新加载也不合理 -->
							<text class="textConlectNumber"
								v-if="data1.conlectList.length!=0">{{data1.conlectList.length}}</text>
							<!-- <image src="../../static/shoucang_active.svg" mode="" v-show="data1.conlect==true"></image> -->
							<text class="textCommentNumber"
								v-if="data1.commentList.length!=0&&data1.commentState==0">{{data1.commentList.length}}</text>

							<view class="" v-show="data1.commentState==0">


								<image src="../../static/pinlun.svg" mode=""
									@click="clickComment(data1._id,data.length)"
									style="width: 23px;height: 23px;transform: translateY(3px)"
									v-show="data1.commentState==0">
								</image>
							</view>

							<view class="" v-show="data1.commentState==1">
								<image src="../../static/guanbi.svg" mode="" v-show="data1.commentState==1"
									@click="cancelComment(data1._id)"></image>
							</view>
							<button class="shareBtn" open-type="share" @click="test">
								<image src="../../static/fenxiang.svg" mode="" @click="share">
									<button open-type="share" style="height: 100%;z-index:999" @click="test">1</button>
								</image>
							</button>

						</view>

						<view class="nowPrice">
							{{(data1.nowPrice=='')?data1.nowPrice:`¥${data1.nowPrice}`}}
						</view>

						<view class="oldPrice">
							{{(data1.oldPrice=='')?data1.oldPrice:`¥${data1.oldPrice}`}}
						</view>

						<view class="position">
							{{data1.position}}
						</view>

					</view>
				</view>
				<view class="commentParent">


					<input v-model="commentText" type="text" class="sendComment" v-show="data1.commentState==1"
						:placeholder="placeholder">
					<button class="commentBtn" v-show="data1.commentState==1"
						@click="sendComment(data1._id,commentText,data1.commentList,data.length)">回复</button>
				</view>
				<!-- <view class="comment" :class="(isDark)?'commentDark':''" v-for="item2 in data1.commentList"
					:key="item2.index" v-show="data1.commentList.length!=0"
					@click="clickComment(data1._id,data.length,item2.username)"
					@longpress="deleteComment(item2.username)"> -->
				<view class="comment" v-for="item2 in data1.commentList" :key="item2.index"
					v-show="data1.commentList.length!=0" @click="clickComment(data1._id,data.length,item2.username)"
					@longpress="deleteComment(item2.username,item2.index,data1._id)">
					<text class=" textCommentId" v-if="item2.responceId==''">{{item2.username}}: </text>
					<text class="textCommentId" v-if="item2.responceId!=''">{{item2.username}} <text
							style="color: black;">回复</text> {{item2.responceId}}: </text>

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

		<uni-popup ref="popup2" background-color="transparent" :mask-click="false">
			<!-- <view class="popup-content"> -->
			<uni-card :is-shadow="true">
				您还未登录，3s后跳转到登录页面
			</uni-card>

			<!-- </view> -->
		</uni-popup>

		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" cancelText="Done" confirmText="删除" title="提示" content="你想如何处理这条信息"
				@confirm="confirmDelete()" @close="done(true)"></uni-popup-dialog>
		</uni-popup>

		<uni-popup ref="alertDialogDone" type="dialog">
			<uni-popup-dialog type="info" cancelText="上架" confirmText="删除" title="提示" content="你想如何处理这条信息"
				@confirm="confirmDelete()" @close="done(false)"></uni-popup-dialog>
		</uni-popup>

		<uni-popup ref="alertDialogDelete" type="dialog">
			<uni-popup-dialog type="info" cancelText="取消" confirmText="删除" title="提示" content="你想删除这条评论吗"
				@confirm="confirmDeleteComment()" @close=""></uni-popup-dialog>
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
		ref,
		watch,
		watchEffect
	} from "vue";
	import getUser from "../api/getUser.js";
	import {
		onPullDownRefresh,
		onReachBottom,
		onShow
	} from "@dcloudio/uni-app"
	const props = defineProps(['where', 'openid2'])
	console.log('props收到', props.where)
	// console.log(props.itemList)

	const localIsConlect = ref()


	const itemlist = ref({

	})
	const placeholder = ref()
	const userInfo = ref({})
	const loginstate = ref()
	const openid = ref(0)
	const doneId = ref()
	// const responceId = ref()
	const commentState = ref(0)
	const commentText = ref()
	const udb = ref()
	const flag = ref(true)
	const popup = ref()
	const popup2 = ref()
	const alertDialog = ref()
	const alertDialogDone = ref()
	const alertDialogDelete = ref()
	const type = ref()
	const isDark = ref(false)
	const commentIndex = ref()

	const wechat = ref()
	const qq = ref()

	const test = () => {

		console.log('点到了')

	}
	const noLogin = () => {

		setTimeout(() => {
			popup2.value.close()
			uni.switchTab({
				url: '/pages/my/my'
			})
		}, 3000)

	}
	const changeconlect = (id, conlectNumber, isconlect) => {
		//操作数据库
		//大问题 怎么刷新当前页面啊。。
		if (loginstate.value == 0) {
			popup2.value.open('center')
			noLogin()

			return
		}
		for (let i = 0; i < 9999; i++) {

			if (isconlect == true) {
				if (itemlist.value[i]._id == id) {

					for (let j = 0; j < itemlist.value[i].conlectList.length; j++) {
						if (itemlist.value[i].conlectList[j].useropenid == openid.value) {
							itemlist.value[i].conlectList.splice(j, 1)

						}
					}
					uniCloud.callFunction({
						name: 'updateConlect',
						data: {
							conlectList: itemlist.value[i].conlectList,
							id: id
						},
						success: (res) => {
							console.log(res)
							// if (res.result.token) token = res.result.token

						}
					})


					itemlist.value[i].conlectNumber--;
					console.log('设置前', itemlist.value[i].isConlect)
					itemlist.value[i].isConlect = false;
					console.log('设置后', itemlist.value[i].isConlect)
					break;
				}
			}
			if (isconlect == false) {
				if (itemlist.value[i]._id == id) {

					itemlist.value[i].conlectList.push({
						useropenid: openid.value,
					})
					itemlist.value[i].conlectNumber++;
					itemlist.value[i].isConlect = true;

					uniCloud.callFunction({
						name: 'updateConlect',
						data: {
							conlectList: itemlist.value[i].conlectList,
							id: id
						},
						success: (res) => {
							console.log(res)
							// if (res.result.token) token = res.result.token

						}
					})
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
		//这里还有问题 是静态的 直接读数据库的 万一用户更新了联系方式 需要重新赋值
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
	const clickComment = (id, index, userId) => {
		if (loginstate.value == 0) {
			popup2.value.open('center')
			noLogin()

			return
		}
		commentText.value = ""
		for (let i = 0; i < index; i++) {
			if (itemlist.value[i].commentState = 1) {
				itemlist.value[i].commentState = 0
			}
		}
		for (let i = 0; i < index; i++) {

			if (userId == null) {
				placeholder.value = '请输入评论内容'
				itemlist.value[i].tempresponce = ''

			} else {
				placeholder.value = `回复${userId}`
				itemlist.value[i].tempresponce = userId

			}


			if (itemlist.value[i]._id == id) {
				itemlist.value[i].commentState = 1
				// console.log(commentText.value)

				break
			}
		}

	}

	const cancelComment = (id) => {
		for (let i = 0; i < 9999; i++) {


			if (itemlist.value[i]._id == id) {
				itemlist.value[i].commentState = 0

				break
			}
		}
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

	const sendComment = (id, commentText1, oldcommentList, index) => {


		for (let i = 0; i < index; i++) {


			if (itemlist.value[i]._id == id) {


				itemlist.value[i].commentState = 0
				// if (itemlist.value[i].tempresponce == '')  这个写法可以同时回复多个
				if (itemlist.value[i].tempresponce == null)
					itemlist.value[i].commentList.push({
						username: userInfo.value.nickName,
						responceId: '',
						content: commentText.value,
						index: itemlist.value[i].commentList.length + 1

					})
				else {
					console.log('11', itemlist.value[i].tempresponce)
					itemlist.value[i].commentList.push({
						username: userInfo.value.nickName,
						responceId: itemlist.value[i].tempresponce,
						content: commentText.value,
						index: itemlist.value[i].commentList.length + 1

					})
				}

				uniCloud.callFunction({
					name: 'sendComment',
					data: {
						id: id,
						commentList: itemlist.value[i].commentList
					},
					success: (res) => {
						commentText.value = ""

						// if (res.result.token) token = res.result.token

					},

				})
				itemlist.value[i].tempresponce = null
				break
			}
		}




	}
	// const share = () => {
	// 	uni.share({
	// 		provider: "weixin"
	// 	})
	// }
	// onMounted(() => {
	// 	console.log(itemlist)
	// })
	// const isConlect = () => {
	// 	console.log('1111进入', itemlist.value.length)
	// 	for (let i = 0; i < itemlist.value.length; i++) {
	// 		itemlist.value[i].isconlect = false
	// 		for (let j = 0; j < itemlist.value[i].conlectList[j].useropenid == openid.value; j++) {
	// 			itemlist.value[i].isconlect = true
	// 		}
	// 		console.log('1111退出', itemlist.value[i].isconlect)
	// 	}

	// }
	const dialogToggle = (id, isdone) => {
		console.log('传进来了done', isdone)
		doneId.value = id
		if (isdone == false)
			alertDialog.value.open()
		else
			alertDialogDone.value.open()
	}

	const done = (isdone) => {
		for (let i = 0; i < 9999; i++) {


			if (itemlist.value[i]._id == doneId.value) {
				console.log('传进来了id', doneId.value)
				itemlist.value[i].isDone = isdone
				uniCloud.callFunction({
					name: 'updateIsDone',
					data: {
						id: doneId.value,
						isDone: itemlist.value[i].isDone
					},
					success: (res) => {

						// if (res.result.token) token = res.result.token

					}

				})
				break
			}
		}


	}
	const confirmDelete = () => {
		udb.value.remove(doneId.value)
	}
	const confirmDeleteComment = () => {
		for (let i = 0; i < 9999; i++) {
			if (itemlist.value[i]._id == doneId.value) {
				for (let j = 0; j < itemlist.value[i].commentList.length; j++) {
					if (itemlist.value[i].commentList[j].index == commentIndex.value) {
						itemlist.value[i].commentList.splice(j, 1)
						uniCloud.callFunction({
							name: 'sendComment',
							data: {
								id: doneId.value,
								commentList: itemlist.value[i].commentList
							},
							success: (res) => {


								// if (res.result.token) token = res.result.token

							},

						})
						break
					}

				}
				break
			}
		}
	}
	const deleteComment = (name, index, id) => {
		isDark.value = true
		console.log('isDark', isDark)
		if (name == userInfo.value.nickName) {
			doneId.value = id
			commentIndex.value = index
			alertDialogDelete.value.open()
		}
	}
	const toPersonal = (openid) => {
		uni.navigateTo({
			url: `/pages/my/personal/personal?openid=${openid}`,
			// success: () => {
			// 	uni.$emit('getuser', openid)
			// }
		});
	}
	onPullDownRefresh(() => {
		// uni.showNavigationBarLoading()
		udb.value.reset()
		udb.value.refresh()

		setTimeout(() => {
			//结束下拉刷新
			uni.stopPullDownRefresh();
		}, 1000);
	})


	onReachBottom(() => {
		// uni.showNavigationBarLoading()
		console.log('拉到底了', itemlist)
		udb.value.loadMore()
		console.log('云端的data', itemlist)
	})
	onShow(() => {

		console.log('loginstate.value:', loginstate.value)
		if (loginstate.value == 0)
			getUser(loginstate, openid, userInfo)
	})
	// watch(itemlist, () => {
	// 	isConlect()
	// })

	getUser(loginstate, openid, userInfo)


	// watchEffect(localIsConlect,()=>{

	// })
	//先这么写吧 这是很细节的
	watch(props.where, () => {
		udb.value.reset()
		udb.value.refresh()
	})

	watch(loginstate, () => {
		console.log('该上传最新联系方式了')
		uniCloud.callFunction({
			name: 'updateItemlistsConnect',
			data: {
				qq: userInfo.value.qq,
				wechat: userInfo.value.wechat,
				openid: openid.value
			},
			success: (res) => {

				// if (res.result.token) token = res.result.token

			}

		})
	})

	uni.$on('update', function(data) {
		udb.value.reset()
		udb.value.refresh()

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
			padding-right: 10px;

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
					position: relative;
					line-height: 150%;
					font-size: 14px;
					padding-right: 20px;
					padding: 20px 10px 20px 0;
					margin-right: 20px;
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

	button::after {
		border: none;

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
		right: 28px;
		font-size: 18px;
	}

	.oldPrice {
		position: absolute;
		top: 40px;
		color: #939393;
		right: 28px;
		font-size: 14px;
		text-decoration: line-through;
	}

	.position {
		position: absolute;
		top: 20px;
		color: #30bfbf;
		right: 85px;
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
		padding-left: 10px;
		padding-right: 5px;
		background-color: #f6f6f6;
		min-height: 20px;
		width: 280px;


		.textCommentId {
			line-height: 20px;

			font-size: 12px;
			color: #5858f0;
		}

		.textComment {
			line-height: 20px;

			font-size: 12px;
			color: black;
		}


	}

	.commentDark {
		margin: 0 auto;

		background-color: #ccc;
		min-height: 20px;
		width: 280px;
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

	.sendComment {
		position: relative;
		box-sizing: border-box;
		margin: 0 auto;
		padding-left: 20px;
		padding-right: 60px;
		background-color: #f6f6f6;
		margin-bottom: 10px;
		height: 30px;
		width: 300px;
	}

	.commentBtn {
		position: absolute;
		color: #fff;
		background-color: #5b8bfc;
		z-index: 999;
		font-size: 14px;
		line-height: 25px;
		width: 50px;
		padding: 0;
		height: 25px;
		bottom: 25rpx;
		right: 60rpx;
	}

	.commentParent {
		position: relative;

	}

	.shareBtn {
		height: 100%;
		transform: translateY(-10rpx);
		margin: 0;
		padding: 0;
		background-color: #fff;
		align-items: center;
	}

	.shareBtn::after {
		border: none;
	}

	.isDone {
		position: absolute;
		z-index: 2;
		font-size: 20px;
		left: 120rpx;
		top: 30%;
		opacity: 0.7;
		border-radius: 5px;
		color: #fff;
		background-color: rgb(193, 193, 193);
		padding: 5px 15px;
		transform: rotate(-0.1turn);
	}

	.Donebgc {
		background-color: #fafafa;
	}
</style>
