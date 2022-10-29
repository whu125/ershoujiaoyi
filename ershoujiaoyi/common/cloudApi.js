let token

function call(option) {
	return new Promise((resolve, reject) => {
		if (!option.data) option.data = {}
		if (token) option.data.token = token
		uni.showLoading({
			title: '加载中'
		})
		uniCloud.callFunction({
			name: option.name,
			data: option.data,
			success: (res) => {
				console.log(res)
				// if (res.result.token) token = res.result.token
				if (option.success) option.success(res)
				resolve(res)
			},
			fail: (err) => {
				console.log(err)
				if (option.fail) option.fail(err)
				reject()
			},
			complete: () => {
				uni.hideLoading()
				if (option.complete) option.complete()
			}
		})
	})
}

export default {
	call: call
}
