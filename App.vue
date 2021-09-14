<script>
	export default {
		globalData: {
			theme: {
				themeBgColor: "#f6f6f6", //背景色
				themeTextColor: "#FC2928", // 文字颜色
				themeBtnColor: "", // 按钮颜色
				themeBorderColor: "", // 边框颜色
			},
			BOTTOM_DISTANCE: 0,
		},
		onLaunch: function(options) {
			//检测线上小程序更新
			// #ifdef MP
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							wx.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								confirmColor: "#FC2928",
								success: function(res) {
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate()
									}
								}
							})
						})
						updateManager.onUpdateFailed(function() {
							wx.showModal({
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
							})
						})
					}
				})
			}
			//分享小程序二维码识别参数 scene
			if (options.query.scene) {
				let opt = options.query.scene
				if (opt.indexOf("_") > -1) {
					this.goodId = opt.split("_")[1];
					let orgId = opt.split("_")[0];
					if (orgId != uni.getStorageSync('orgId')) {
						uni.removeStorageSync("atk");
						uni.removeStorageSync("userInfo");
						try {
							let StarStickCode = uni.getStorageSync("StarStickCode") ///独角秀app开启引流  对应的code码
							let audiolistInfos=uni.getStorageSync("audiolistInfos")
							uni.clearStorageSync();
							if (audiolistInfos) {
								uni.setStorageSync("audiolistInfos", audiolistInfos)
							}					
							if (StarStickCode) {
								uni.setStorageSync("StarStickCode", StarStickCode)
							}
							this._setHeight()
						} catch (e) {
							// error
						}
					}
					this.orgId = orgId;
					uni.setStorageSync('orgId', orgId)
				} else {
					let orgId = opt
					if (orgId != uni.getStorageSync('orgId')) {
						uni.removeStorageSync("atk");
						uni.removeStorageSync("userInfo");
						try {
							let StarStickCode = uni.getStorageSync("StarStickCode") ///独角秀app开启引流  对应的code码
							let audiolistInfos=uni.getStorageSync("audiolistInfos")
							uni.clearStorageSync();
							if (audiolistInfos) {
								uni.setStorageSync("audiolistInfos", audiolistInfos)
							}					
							if (StarStickCode) {
								uni.setStorageSync("StarStickCode", StarStickCode)
							}
							this._setHeight()
						} catch (e) {
							// error
						}
					}
					this.orgId = orgId;
					uni.setStorageSync('orgId', orgId)
				}
			} else {
				// 链接没有带店铺id默认访问总店
				if (options.query.orgId == undefined || options.query.orgId == null || options.query.orgId == '') {
					if (uni.getStorageSync('orgId') == null || uni.getStorageSync('orgId') == undefined || uni
						.getStorageSync('orgId') ==
						"") {
							console.log("进看看控件间距回家结婚环境和聚会就------------------------")
						uni.setStorageSync('orgId', this.$api.baseOrgId); //全局
					    this.goSelectIndex()
					}
				} else {
					// 判断 如果新的orgId 不等于 缓存的orgId 清理缓存
					if (options.query.orgId != uni.getStorageSync('orgId')) {
						uni.removeStorageSync("atk");
						uni.removeStorageSync("userInfo");
						try {
							let StarStickCode = uni.getStorageSync("StarStickCode") ///独角秀app开启引流  对应的code码
							let audiolistInfos=uni.getStorageSync("audiolistInfos")
							uni.clearStorageSync();
							if (audiolistInfos) {
								uni.setStorageSync("audiolistInfos", audiolistInfos)
							}					
							if (StarStickCode) {
								uni.setStorageSync("StarStickCode", StarStickCode)
							}
							
							// TODO  
							this._setHeight()
						} catch (e) {
							// error
						}
					}
					uni.setStorageSync('orgId', options.query.orgId);
				}
			}
			let atk = uni.getStorageSync('atk');
			if (atk == undefined || atk == '' || atk == null) {

			} else {
				if (options.path.indexOf("login") > -1 && options.path.indexOf("login/userProtocol") == -
					1) { //登录之后不会再进登录页面
					uni.reLaunch({
						url: '/pages/index/index?orgId=' + uni.getStorageSync('orgId')
					})
				}
			}
			// #endif


			// #ifdef H5
			if (options.query.orgId) {
				// 判断 如果新的orgId 不等于 缓存的orgId 清理缓存
				if (options.query.orgId != uni.getStorageSync('orgId')) {
					uni.removeStorageSync("atk");
					uni.removeStorageSync("userInfo");
					try {
						let StarStickCode = uni.getStorageSync("StarStickCode") ///独角秀app开启引流  对应的code码
						let audiolistInfos=uni.getStorageSync("audiolistInfos")
						uni.clearStorageSync();
						if (audiolistInfos) {
							uni.setStorageSync("audiolistInfos", audiolistInfos)
						}					
						if (StarStickCode) {
							uni.setStorageSync("StarStickCode", StarStickCode)
						}
					
						this._setHeight()
					} catch (e) {
						// error
					}
				}
				uni.setStorageSync('orgId', options.query.orgId);
			} else {
				// 链接没有带店铺id默认访问总店,兼容H5微信浏览器
				if (uni.getStorageSync("atk") == undefined ||
					uni.getStorageSync("atk") == null ||
					uni.getStorageSync("atk") == '') {
					console.log("链接没有带店铺id默认访问总店,兼容H5微信浏览器----------------------------------------------------")
					uni.redirectTo({
						url: '/pages/index/index?orgId=' + this.$api.baseOrgId,
					})
				}

			}
			if (location.origin.indexOf("h5.mydeershow.com") > -1) {
				location.href = "https://m.icornerstore.com/?orgId=" + uni.getStorageSync('orgId')
			}
			// 获取公众号appId
			this.$http.Get(this.$api.getH5wexinAppId, {}, (res) => {
				if (res.returnCode == "0000") {
					uni.setStorageSync("H5wexinAppId", res.returnData.data)
				}
			})
			//判断是否在微信浏览器   
			if (this.$wx.isWechat()) {
				if (uni.getStorageSync("atk") == undefined ||
					uni.getStorageSync("atk") == null ||
					uni.getStorageSync("atk") == '') {
					uni.removeStorageSync('openId')
					this.$wxH5Login.wxLogin() //微信授权
				}
				if (uni.getStorageSync('openId') == undefined || uni.getStorageSync('openId') == null ||
					uni.getStorageSync('openId') == "") {
					uni.setStorageSync('FromBCode', 0) //没有openId 走授权，从微信那边拿到code 通过code拿取对应的微信的信息
					if (options.query.code) {
						this.$http.Get(this.$api.getH5wxWebRegister, {
							code: options.query.code
						}, res => {
							if (res.returnCode == "0000") {
								let data = res.returnData
								uni.setStorageSync('unionid', data.unionId); //微信的unionId
								uni.setStorageSync('token', data.token); //登录 token atk 
								uni.setStorageSync('openId', data.openid); //微信的 openid
								uni.setStorageSync('isbind', data.isbind); //微信的isbind 0  未绑定手机号  1  已绑定手机号
								if (options.query.fromB) { //从B端跳转到c端
									uni.setStorageSync('FromBCode', 1)
								}
								let day = new Date()
								let expire_time = day.getTime() + 24 * 60 * 60 * 1000
								uni.setStorageSync("expire_time", expire_time)
								uni.setStorageSync('atk', data.token);
								this._getMyinfoxcx() //获取用户信息
								console.log("________llll授权")
								let goHref = location.href
								if (goHref && goHref.indexOf("&code=") > -
									1) { //替换访问链接中的code  以防下次走微信授权无法重新访问微信链接拿取最新的code
									goHref = goHref.split("&code=")[0]
								}
								if (goHref && goHref.indexOf("AllMiniProgram") > -
									1) { //替换从的总店的小程序跳转过来，+独角秀H5跳转好店的商城、首页、订单列表
									goHref = goHref.split("AllMiniProgram")[0]
								}
								console.log(goHref)
								setTimeout(function() {
									location.href = goHref
								}, 200)

							} else {
								if (res.returnMessage == "获取微信信息失败!" || res.returnCode ==
									"40163") { //code 失效，替换掉链接 中的code的重新授权
									let goHref = location.href
									console.log("_______22222授权")
									if (goHref && goHref.indexOf("&code=") > -1) {
										goHref = goHref.split("&code=")[0]
									}
									if (goHref && goHref.indexOf("AllMiniProgram") > -1) {
										goHref = goHref.split("AllMiniProgram")[0]
									}
									console.log(goHref)
									setTimeout(function() {
										location.href = goHref
									}, 200)
								} else {
									uni.showToast({
										title: res.returnMessage,
										icon: "none"
									})
								}

							}
						});
					}
				}
			}
			// #endif
			// 判断 如果从分享进入的话 清理当前页的缓存 
			// if (options.query.isShare) {
			// 	uni.removeStorageSync("currentPage")
			// 	if (options.path.indexOf("goodDetail/goodDetail") == -1 &&options.path.indexOf("ActivityDetail/ActivityDetail") == -1 && options.path.indexOf(
			// 			"playLive/live/playDetail") == -1 &&
			// 		options.path.indexOf("playLive/live/H5Player") == -1 &&
			// 		options.path.indexOf("playLive/live/recoderLists") == -1 &&
			// 		options.path.indexOf("playLive/live/recorerH5Play") == -1) { //登录之后不会再进登录页面

			// 		uni.reLaunch({
			// 			url: '/pages/index/index?orgId=' + uni.getStorageSync('orgId')
			// 		})
			// 	}
			// }
			console.log("我是app.vue")
			// 分享获取数据接口

			if (options.path && (options.path.indexOf("wechat/wechat") > -1 || options.path.indexOf(
					"distributor/distributor") > -1)) {

			} else {
				this.$http.Get(this.$api.getShopShare, {}, (res) => {
					console.log("分享.....App")
					if (res.returnCode == "0000") {
						uni.setStorageSync("shareData", res.returnData.data)
						this.goodShareInfo = res.returnData.data
						// uni.setNavigationBarTitle({// 默认展示看看TV
						// 	title: res.returnData.data.shopName
						// });
					}
				})
			}

		},
		onShow: function(options) {
			let sessionData = uni.getStorageSync("currentPage");
			if (sessionData && JSON.parse(sessionData).tabBar == 1) {
				let data = {
					showType: JSON.parse(sessionData).showType,
					url: JSON.parse(sessionData).url
				}
				uni.setStorageSync("currentPage", JSON.stringify(data))
			}
			console.log(options + "短链接短链接.......")
			// #ifdef H5
			let dataHref = location.href
			if (dataHref.indexOf("/_") > -1) { //短信的短链接
				this._getfindStrToUrl(dataHref)
				return false
			}
			if (location.origin.indexOf("h5.mydeershow.com") > -1) {
				location.href = "https://m.icornerstore.com/?orgId=" + uni.getStorageSync('orgId')
			}
			if (this.$wx.isWechat()) { //判断是否在微信浏览器
				uni.setStorageSync("wetChatUrl", window.location.href)
				this.$wx.wxShare("", {}, (res) => {})
			}
			this.setting()
			// #endif
			this._setHeight()
			let timestamp = Date.parse(new Date());
			let that = this
			uni.getStorage({
				key: 'expire_time',
				success(res) {
					let day = new Date()
					if ((day.getTime() - res.data) > 0) {
						uni.removeStorageSync('atk')
						uni.removeStorageSync('expire_time')
						uni.removeStorageSync("currentPage")
						uni.removeStorageSync("activityData")
						// #ifdef H5
						// 微信注入分享
						if (that.$wx.isWechat()) { //判断是否在微信浏览器
							uni.removeStorageSync('unionid')
							uni.removeStorageSync("openId")
							uni.removeStorage({
								key: 'isbind'
							})
							that.$wxH5Login.wxLogin()
						} else {
							// uni.redirectTo({
							// 	url: '/pages/index/index?orgId=' + uni.getStorageSync('orgId'),
							// })
						}
						// #endif
						// #ifdef MP
						uni.removeStorageSync('unionid')
						uni.removeStorageSync("openId")
						uni.removeStorage({
							key: 'isbind'
						})
						uni.removeStorage({
							key: 'sessionKey'
						})
						// uni.redirectTo({
						// 	url: '/pages/index/index?orgId=' + uni.getStorageSync('orgId'),
						// })
						// #endif
					}
				},
				fail: function() {

				}
			})

		},
		onHide: function() {

		},
		methods: {
				
			goSelectIndex(){
				let params = {
					version: this.$api.version
				}
				this.$http.Get(this.$api.findByVersion, params, (res) => {
					if (res && res.returnCode == "0000") {
						if (res.returnData) {
				
						} else {
							if (this.$api.privatelyOwned == 3) {
								uni.reLaunch({
									url: '/pages/index/videoIndex?orgId=' + uni.getStorageSync(
										'orgId')
								});
							}
				
						}
				
					}
				})
			},
			_setHeight() {
				let that = this
				// console.log(that.globalData)
				uni.getSystemInfo({
					success: function(res) {
						console.log(res);
						uni.setStorageSync("wetplatform", res.platform)
						uni.setStorageSync("wetplatformTop", res.statusBarHeight * 750 / res.windowWidth)
						uni.setStorageSync("wetplatformPx", res.windowWidth)
						if (res.model) {
							if (res.model.indexOf("iPhone") > -1 || res.model.indexOf("iphone") > -1 || res
								.model.indexOf("iPad") > -1) {
								uni.setStorageSync("wetplatformHeight", (res.statusBarHeight + 44) * 750 / res
									.windowWidth)
								uni.setStorageSync("wetplatformH", 44 * 750 / res.windowWidth)
								// #ifdef MP
								const modelInclude = ["iPhone X", 'iPhone XR', "iPhone XS", "iPhone XS MAX"];
								var flag = false; //是否X以上机型
								for (let i = 0; i < modelInclude.length; i++) {
									//模糊判断是否是modelInclude 中的机型,因为真机上测试显示的model机型信息比较长无法一一精确匹配
									if (res.model.indexOf(modelInclude[i]) != -1) {
										flag = true
									}
								}

								if (flag) {
									that.globalData.BOTTOM_DISTANCE = 40;
								} else {
									that.globalData.BOTTOM_DISTANCE = 0;
								}
								// #endif
							} else {
								uni.setStorageSync("wetplatformHeight", (res.statusBarHeight + 48) * 750 / res
									.windowWidth)
								uni.setStorageSync("wetplatformH", 48 * 750 / res.windowWidth)
							}
						}

					}
				});
			},
			// 获取短链转跳
			_getfindStrToUrl(str) {
				this.$http.Get(this.$api.getfindStrToUrl, {
					str: str
				}, (res) => {
					if (res.returnCode == '0000') {
						location.href = res.returnData
					}
				})
			},
			// 获取个人信息
			_getMyinfoxcx() {
				this.$http.Get(this.$api.bean, {}, (res) => {
					if (res.returnCode == '0000') {

						uni.setStorageSync('userInfo', res.returnData)
					}
				})
			},
			setting() {
				if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
					handleFontSize();
				} else {
					if (document.addEventListener) {
						document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
					} else if (document.attachEvent) {
						document.attachEvent("WeixinJSBridgeReady", handleFontSize);
						document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
					}
				}

				function handleFontSize() {
					// 设置网页字体为默认大小
					WeixinJSBridge.invoke('setFontSizeCallback', {
						'fontSize': 0
					});
					// 重写设置网页字体大小的事件
					WeixinJSBridge.on('menu:setfont', function() {
						WeixinJSBridge.invoke('setFontSizeCallback', {
							'fontSize': 0
						});
					});
				}
			}

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	// @import url("parse.css")
	@import url("iconfont.css");
	@import url("static/common/css/animate.min.css");

	image {
		font-size: 0;
		// will-change: transform;
	}

	page {
		font-size: 24rpx;
		color: #1A1A1A;
		font-family: 'Pingfang SC', 'Hiragino Sans GB', 'Helvetica', 'Droid Sans', 'Arial', 'sans-serif';
	}

	.text_overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.text_overflow_2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 40rpx;
	}

	.text_overflow_3 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.text_overflow_4 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}

	.display_flex_bet {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
    .display_flex_just {
    	display: flex;
    	justify-content: space-between;
    	
    }
	.display_flex {
		display: flex;
		align-items: center;
	}

	.display_flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	view,
	text,
	scroll-view,
	swiper,
	button,
	form,
	input,
	textarea,
	label,
	navigator,
	image {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		word-break: break-all;
	}

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	// image{
	// 	>div{
	// 		background-size: contain !important;
	// 		background-repeat: no-repeat !important;
	// 		background-position: center !important;
	// 	}
	// }


	// 修复富文本样式引起的bug

	.wxParse {
		user-select: none;
		width: 100%;
		font-family: Helvetica, "PingFangSC", 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
		color: #333;
		line-height: 1.5;
		font-size: 1em;
		text-align: justify;
		/* //左右两端对齐 */
	}

	.wxParse view,
	.wxParse uni-view {
		word-break: break-word;
	}

	.wxParse .p {
		// padding-bottom: 0.5em;
		clear: both;
		/* letter-spacing: 0;//字间距 */
	}

	.wxParse .inline {
		display: inline;
		margin: 0;
		padding: 0;
	}

	.wxParse .div {
		margin: 0;
		padding: 0;
		display: block;
	}

	.wxParse .h1 {
		font-size: 2em;
		line-height: 1.2em;
		margin: 0.67em 0;
	}

	.wxParse .h2 {
		font-size: 1.5em;
		margin: 0.83em 0;
	}

	.wxParse .h3 {
		font-size: 1.17em;
		margin: 1em 0;
	}

	.wxParse .h4 {
		margin: 1.33em 0;
	}

	.wxParse .h5 {
		font-size: 0.83em;
		margin: 1.67em 0;
	}

	.wxParse .h6 {
		font-size: 0.83em;
		margin: 1.67em 0;
	}

	.wxParse .h1,
	.wxParse .h2,
	.wxParse .h3,
	.wxParse .h4,
	.wxParse .h5,
	.wxParse .h6,
	.wxParse .b,
	.wxParse .strong {
		font-weight: bolder;
	}

	.wxParse .i,
	.wxParse .cite,
	.wxParse .em,
	.wxParse .var,
	.wxParse .address {
		font-style: italic;
	}

	.wxParse .spaceshow {
		white-space: pre;
	}

	.wxParse .pre,
	.wxParse .tt,
	.wxParse .code,
	.wxParse .kbd,
	.wxParse .samp {
		font-family: monospace;
	}

	.wxParse .pre {
		overflow: auto;
		background: #f5f5f5;
		padding: 16upx;
		white-space: pre;
		margin: 1em 0upx;
		font-size: 24upx;
	}

	.wxParse .code {
		overflow: auto;
		padding: 16upx;
		white-space: pre;
		margin: 1em 0upx;
		background: #f5f5f5;
		font-size: 24upx;
	}

	.wxParse .big {
		font-size: 1.17em;
	}

	.wxParse .small,
	.wxParse .sub,
	.wxParse .sup {
		font-size: 0.83em;
	}

	.wxParse .sub {
		vertical-align: sub;
	}

	.wxParse .sup {
		vertical-align: super;
	}

	.wxParse .s,
	.wxParse .strike,
	.wxParse .del {
		text-decoration: line-through;
	}

	.wxParse .strong,
	.wxParse .text,
	.wxParse .span,
	.wxParse .s {
		display: inline;
	}

	.wxParse .a {
		color: deepskyblue;
	}

	.wxParse .video {
		text-align: center;
		margin: 22upx 0;
	}

	.wxParse .video-video {
		width: 100%;
	}

	.wxParse .uni-image {
		max-width: 100%;
	}

	.wxParse .img {
		display: block;
		max-width: 100%;
		margin-bottom: 0em;
		/* //与p标签底部padding同时修改 */
		overflow: hidden;
	}

	.wxParse .blockquote {
		margin: 10upx 0;
		padding: 22upx 0 22upx 22upx;
		font-family: Courier, Calibri, "宋体";
		background: #f5f5f5;
		border-left: 6upx solid #dbdbdb;
	}

	.wxParse .blockquote .p {
		margin: 0;
	}

	.wxParse .ul,
	.wxParse .ol {
		display: block;
		margin: 1em 0;
		padding-left: 2em;
	}

	.wxParse .ol {
		list-style-type: disc;
	}

	.wxParse .ol {
		list-style-type: decimal;
	}

	.wxParse .ol>weixin-parse-template,
	.wxParse .ul>weixin-parse-template {
		display: list-item;
		align-items: baseline;
		text-align: match-parent;
	}

	.wxParse .ol>.li,
	.wxParse .ul>.li {
		display: list-item;
		align-items: baseline;
		text-align: match-parent;
	}

	.wxParse .ul .ul,
	.wxParse .ol .ul {
		list-style-type: circle;
	}

	.wxParse .ol .ol .ul,
	.wxParse .ol .ul .ul,
	.wxParse .ul .ol .ul,
	.wxParse .ul .ul .ul {
		list-style-type: square;
	}

	.wxParse .u {
		text-decoration: underline;
	}

	.wxParse .hide {
		display: none;
	}

	.wxParse .del {
		display: inline;
	}

	.wxParse .figure {
		overflow: hidden;
	}

	.wxParse .tablebox {
		overflow: auto;
		background-color: #f5f5f5;
		background: #f5f5f5;
		font-size: 13px;
		padding: 8px;
	}

	.wxParse .table .table,
	.wxParse .table {
		border-collapse: collapse;
		box-sizing: border-box;
		/* 内边框 */
		/* width: 100%; */
		overflow: auto;
		white-space: pre;
	}

	.wxParse .tbody {
		border-collapse: collapse;
		box-sizing: border-box;
		/* 内边框 */
		border: 1px solid #dadada;
	}

	.wxParse .table .thead,
	.wxParse .table .tfoot,
	.wxParse .table .th {
		border-collapse: collapse;
		box-sizing: border-box;
		background: #ececec;
		font-weight: 40;
	}

	.wxParse .table .tr {
		border-collapse: collapse;
		box-sizing: border-box;
		/* border: 2px solid #F0AD4E; */
		overflow: auto;
	}

	.wxParse .table .th,
	.wxParse .table .td {
		border-collapse: collapse;
		box-sizing: border-box;
		border: 2upx solid #dadada;
		overflow: auto;
	}

	.wxParse .audio,
	.wxParse .uni-audio-default {
		display: block;
	}
</style>
