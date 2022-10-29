<template>
	<view class="searchNavTop">
		<view class="">
			<image src="../../static/search.svg" class="searchIcon"></image>
		</view>
		<input @confirm="searchInput" confirm-type="search" type="text" class="search">
	</view>
	<view class="searchNavBottom">


		<view class="searchNavItem">
			<picker :range="category" @change="handleChange">
				<image src="../../static/fenlei.svg" mode=""></image>
				<text>{{currExit}}</text>
			</picker>
		</view>


		<view class="searchNavItem">
			<picker :range="range" @change="handlePositionChange">
				<image src="../../static/position.svg" mode=""></image>
				<text>{{currPositionExit}}</text>
			</picker>
		</view>
	</view>

	<SearchList :where="where"></SearchList>

</template>

<script setup>
	import {
		SearchList,
	} from '../components/SearchList.vue'
	import {
		onMounted,
		reactive,
		ref
	} from 'vue'
	import {
		onPullDownRefresh,
		onReachBottom
	} from "@dcloudio/uni-app"
	const id = ref(0)
	const category = reactive(
		['不限', '数码设备', '服饰鞋帽', '美妆个护', '吃喝玩乐', '文具书籍', '问卷资料', '日常用品', '国潮文创', '其他闲置']
	)
	const range = reactive(
		['不限', '文理学部-湖滨', '文理学部-桂园', '文理学部-枫园', '文理学部-梅园', '工学部', '信息学部', '医学部', '网安基地', '其他地区']
	)

	const showrange = reactive(
		['不限', '湖滨', '桂园', '枫园', '梅园', '工学部', '信息学部', '医学部', '网安基地', '其他地区']
	)
	const currIndex = ref(0)
	const currExit = ref('物品分类')
	const currPositionExit = ref('位置信息')

	const where = ref({

	})
	const searchVal = ref()
	//itemList直接从数据库中读取 需要先判断吗？还有一条最多展示几个

	// onReachBottom(() => {
	// 	// uni.showNavigationBarLoading()
	// 	console.log('下拉加载')
	// 	udb.value.loadMore()
	// })
	const handleChange = (e) => {

		currIndex.value = e.target.value;
		currExit.value = category[currIndex.value]
		if (currExit.value == "不限") {
			delete where.value.category

			return
		}

		where.value.category = currExit.value

	}

	const handlePositionChange = (e) => {
		currIndex.value = e.target.value;
		currPositionExit.value = showrange[currIndex.value]
		if (currPositionExit.value == "不限") {
			delete where.value.position

			return
		}
		switch (currPositionExit.value) {
			case '湖滨':
				where.value.position = '文理学部-湖滨'
				break
			case '桂园':
				where.value.position = '文理学部-桂园'
				break
			case '枫园':
				where.value.position = '文理学部-枫园'
				break
			case '梅园':
				where.value.position = '文理学部-梅园'
				break
			default:
				where.value.position = currPositionExit.value
		}


	}

	const searchInput = (e) => {
		searchVal.value = e.target.value
		console.log('搜索值是', searchVal.value)
		where.value = `${new RegExp(searchVal.value, 'i')}.test(userDescription)`
		console.log(where.value)
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}
</style>

<style lang="less" scoped>
	.searchNavTop {
		display: flex;
		height: 100rpx;
		width: 90%;
		margin: 0 auto;
		border-radius: 50rpx;
		border: 2px solid deepskyblue;
		border-color: #2a82e4;

		input {
			height: 100rpx;
			width: 300px;
		}
	}

	.searchIcon {
		margin: 10px 5px 10px 20px;
		width: 30px;
		height: 30px;
	}

	.searchNavBottom {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-around;
		margin: 10px 0;
	}

	.searchNavItem {
		position: relative;
		display: flex;
		width: 40%;
		height: 40px;
		background-color: #2a82e4;
		border-radius: 50px;
		align-items: center;

		image {
			height: 25px;
			width: 25px;
			margin: 5px 15px;
		}

		text {
			position: absolute;
			top: 10px;
			color: #fff;

		}
	}
</style>
