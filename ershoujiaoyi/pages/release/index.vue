<template>
	<view class="usertop">
		<image src="../../static/test.png" mode=""></image>
	</view>

	<navigator url="./release">
		<view class="release" style="bottom: 200px;">
			<image src="../../static/xianzhi.svg" mode=""></image>
			<text class="textUp">
				发布闲置
			</text>
			<text class="textDown">
				快速转卖换钱
			</text>
		</view>
	</navigator>

	<navigator url="./buy">
		<view class="release" style="bottom: 100px;">
			<image src="../../static/gouwu.svg" mode=""></image>
			<text class="textUp">
				求购信息
			</text>
			<text class="textDown">
				30s发布宝贝信息
			</text>
		</view>
	</navigator>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.usertop {
		width: 100%;
		height: 600rpx;
		background-color: #2a82e4;
		border-bottom-left-radius: 100rpx;
		border-bottom-right-radius: 100rpx;
		z-index: -999;
		text-align: center;

		image {
			height: 300px;
			width: 300px;

		}
	}

	.release {
		position: absolute;

		left: 50%;
		transform: translateX(-125px);
		height: 80px;
		width: 250px;


		background-color: #2a82e4;
		border-radius: 20px;

		image {
			width: 40px;
			height: 40px;
			margin: 20px 0 10px 20px;
		}


		.textUp {
			position: absolute;
			top: 15px;
			left: 80px;
			font-size: 20px;
			color: #fff;
		}

		.textDown {
			position: absolute;
			top: 45px;
			left: 80px;
			font-size: 14px;
			color: #c2c2c2;
		}
	}
</style>
