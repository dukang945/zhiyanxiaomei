<template>
	<div style="height: 100%">
		<el-container style="height: 100%;background-color: #E5E5E5;">
			<el-header>
				<img src="../../images/icons/logo_home.png" alt>
				<span class="menuBtn">
					<i class="el-icon-menu" @click="isCollapse=!isCollapse"></i>
				</span>
				<div class="container-right">
					<div class="close" @click="logout">
						<span></span>
					</div>
					<div class="userinfo">
						<span>{{ username }}</span>
					</div>
				</div>
			</el-header>

			<el-container style="width: 100%;">
				<aside class="el-aside">
					<el-menu class="el-menu-vertical-demo" text-color="#333" active-text-color="#409EFF" :collapse="isCollapse"
					 :default-active="routePath" router @select="handleSelect">
						<el-submenu :index="(item.id).toString()" v-for="(item) in menulist" :key="item.id" class="menuOut">
							<template slot="title">
								<i :class="item.icon"></i>
								<span>{{item.name}}</span>
							</template>
							<el-menu-item-group v-for="(itemChildren) in item.children" :key="itemChildren.id">
								<el-menu-item :index="itemChildren.enname" :class="$route.path=='/'+itemChildren.enname?'is-active':''">{{itemChildren.name}}</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</aside>
				<el-main class="mainback">
					<div class="mainBox">
						<Slide ref="slider" :path="path" @showPath='getPath'></Slide>
						<!-- <p v-if="isWelcome">这是工作台内容</p> -->
						<div class="dataSpace" v-if="isWelcome">
							<el-row class='topData' :gutter="30">
								<el-col :span='6'>
									<div class="cardItem" style="color: #32D088;">
										<div class="cardLeft">
											<i class="el-icon-my-liulanliang"></i>
										</div>
										<div class="cardRight">
											<p class="text1">125</p>
											<p class="text2">今日浏览量</p>
										</div>
									</div>
								</el-col>
								<el-col :span='6'>
									<div class="cardItem" style="color: #32CEE4;">
										<div class="cardLeft">
											<i class="el-icon-my-pinglun"></i>
										</div>
										<div class="cardRight">
											<p class="text1">125</p>
											<p class="text2">今日评论量</p>
										</div>
									</div>
								</el-col>
								<el-col :span='6'>
									<div class="cardItem" style="color: #FB6E51;">
										<div class="cardLeft">
											<i class="el-icon-my-xinzengrenyuan_huaban"></i>
										</div>
										<div class="cardRight">
											<p class="text1">125</p>
											<p class="text2">今日注册量</p>
										</div>
									</div>
								</el-col>
								<el-col :span='6'>
									<div class="cardItem" style="color: #F5B252;">
										<div class="cardLeft">
											<i class="el-icon-my-renyuan"></i>
										</div>
										<div class="cardRight">
											<p class="text1">125</p>
											<p class="text2">总人数</p>
										</div>
									</div>
								</el-col>
							</el-row>
							<el-row class='chartData'>
								<el-col :span='24'>
									<div class="title">妆容风格数据分析表</div>
									<div ref="visitEchart" class="chart1"></div>
								</el-col>
							</el-row>
							<el-row class='chartData' :gutter="50">
								<el-col :span='6' :offset='2'>
									<div class="title">注册会员组成分析表</div>
									<div ref="memberEchart" class="chart2"></div>
								</el-col>
								<el-col :span='8'>
									<div class="title">会员年龄段组成表</div>
									<div ref="ageEchart" class="chart3"></div>
								</el-col>
								<el-col :span='8'>
									<div class="title">会员化妆水平分析表</div>
									<div ref="levelEchart" class="chart4"></div>
								</el-col>
							</el-row>
						</div>
						<transition name="fade" mode="out-in" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight"
						 :duration="200">
							<router-view></router-view>
						</transition>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import Slide from "@/components/module/Slider.vue";
	import echarts from 'echarts'
	import {
		has,
		del,
		check,
		online,
		push
	} from "@/components/common/btnPermissions";
	export default {
		data() {
			return {
				isCollapse: false,
				path: "",
				isWelcome: false,
				chart1: null,
				chart2: null
			};
		},
		components: {
			Slide
		},
		computed: {
			username() {
				let username = sessionStorage.getItem("ms_username");
				return username ? username : "";
			},
			menulist() {
				let menulist = JSON.parse(sessionStorage.getItem("menuList"));
				return menulist ? menulist : "";
			},
			routePath() {
				let routePath = this.$route.path.substring(1)
				return routePath
			}
		},
		mounted() {
			console.log(3333)
			var _this = this;
			this.$refs.slider.addTab(this.$route.path, this.$route.name);
			if (this.$route.path == '/welcome') {
				this.isWelcome = true
			} else {
				this.isWelcome = false
			};
			setTimeout(function() {
				console.log(123)
				_this.initChart1()
				_this.initChart2()
				_this.initChart3()
				_this.initChart4()
			}, 100)
		},
		methods: {
			// 初始化图表
			initChart1() {
				this.chart1 = echarts.init(this.$refs.visitEchart, 'light')
				// 把配置和数据放这里
				this.chart1.setOption({
					legend: {},
					tooltip: {},
					dataset: {
						source: [
							['product', '阅读次数', '收藏量', '点赞量', '评论数', '分享次数'],
							['日常妆', 34, 5, 2, 14, 3],
							['欧美妆', 45, 4, 2, 14, 3],
							['宴会妆', 12, 2, 2, 14, 3],
							['影视妆', 32, 6, 2, 14, 3],
							['cos妆', 42, 2, 2, 14, 3],
							['清新妆', 23, 7, 2, 14, 3],
							['日系妆', 12, 2, 2, 14, 3],
							['复古妆', 51, 4, 2, 14, 3],
							['明星妆', 23, 2, 2, 14, 3],
							['韩系妆', 28, 1, 2, 14, 3],
							['约会妆', 19, 2, 2, 14, 3],
							['职场妆', 25, 8, 2, 14, 3]
						]
					},
					xAxis: {
						type: 'category'
					},
					yAxis: {},
					series: [{
							type: 'bar'
						},
						{
							type: 'bar'
						},
						{
							type: 'bar'
						},
						{
							type: 'bar'
						},
						{
							type: 'bar'
						}
					]
				}, true)

			},
			initChart2() {
				this.chart2 = echarts.init(this.$refs.memberEchart, 'light');
				this.chart2.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: ['手机号注册', '微信注册', 'QQ注册', '微博注册']
					},
					series: [{
						name: '注册来源',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [{
								value: 1335,
								name: '手机号注册'
							},
							{
								value: 310,
								name: '微信注册'
							},
							{
								value: 234,
								name: 'QQ注册'
							},
							{
								value: 135,
								name: '微博注册'
							},
						]
					}]
				})
			},
			initChart3() {
				this.chart3 = echarts.init(this.$refs.ageEchart, 'light');
				this.chart3.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: ['18岁以下', '18岁-22岁', '23岁-26岁', '27岁-30岁','30岁-35岁','36岁以上']
					},
					series: [{
						name: '年龄构成',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [{
								value: 335,
								name: '18岁以下'
							},
							{
								value: 1310,
								name: '18岁-22岁'
							},
							{
								value: 1234,
								name: '23岁-26岁'
							},
							{
								value: 1135,
								name: '27岁-30岁'
							},{
								value: 130,
								name: '30岁-35岁'
							},{
								value: 6,
								name: '36岁以上'
							},
						]
					}]
				})
			},
			initChart4() {
				this.chart4 = echarts.init(this.$refs.levelEchart, 'light');
				this.chart4.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: ['新手', '一般', '大神']
					},
					series: [{
						name: '化妆水平',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [{
								value: 1335,
								name: '新手'
							},
							{
								value: 510,
								name: '一般'
							},
							{
								value: 734,
								name: '大神'
							}
						]
					}]
				})
			},
			queryData() {
				// 				this.$axios('').then(res => {
				// 
				// 				})
			},
			getPath(path) {
				var _this=this;
				if (path == '/welcome') {
					this.isWelcome = true
					setTimeout(function() {
						_this.initChart1()
						_this.initChart2()
						_this.initChart3()
						_this.initChart4()
					}, 100)
				} else {
					this.isWelcome = false
				}
			},
			isopen() {},
			handleSelect(path, pathName) {
				this.isWelcome = false
				let cardName = "";
				this.menulist.forEach(item => {
					if (item.id == pathName[0]) {
						item.children.forEach(item2 => {
							if (item2.enname == pathName[1]) {
								cardName = item2.name;
							}
						});
					}
				});
				this.$refs.slider.addTab(path, cardName);
			},
			logout() {
				this.$axios.get("/management/admin/public!loginOut.action").then(res => {
					if (res.status == 200) {
						sessionStorage.removeItem("ms_username");
						sessionStorage.removeItem("menuList");
						sessionStorage.removeItem("btnPermissions");
						this.$router.push("/login");
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	/deep/ .el-scrollbar__wrap {
		overflow-x: hidden;
	}

	.el-header {
		text-align: center;
	}

	.el-scrollbar__view {
		height: 100%;
	}

	.el-submenu__title span {
		font-size: 16px;
	}

	.el-submenu .el-menu-item {
		min-width: 199px;
		text-align: right;
		font-size: 14px;
	}

	.menuBtn {
		float: left;
		font-size: 30px;
		margin-left: 30px;
		margin-top: 55px;
		color: #333;
	}

	.el-aside {
		background-color: #d3dce6;
		color: #333;
		text-align: center;
		line-height: 200px;
		min-height: 100%;
		max-width: 200px;
		overflow-x: hidden;
	}

	.el-menu {
		min-height: 100%;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 100%;
	}

	.el-menu-item-group {
		max-height: 400px;
	}

	.mainback {
		padding: 20px;
		padding-bottom: 0;
		box-sizing: border-box;
		color: #333;
		// overflow: hidden;
	}

	.mainback .mainBox {
		margin-bottom: 20px;
		width: 100%;
		background: #fff;
		padding: 20px;
		padding-bottom: 10px;
		box-sizing: border-box;
		border-radius: 3px;
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

	.el-header {
		height: 100px !important;
		background: linear-gradient(120deg, #ffffff, #5983e8);

		img {
			width: 340px;
			height: 44px;
			margin-top: 28px;
			float: left;
		}

		.container-right {
			width: 340px;
			height: 100%;
			float: right;

			div {
				float: left;
			}

			.icon-head {
				background-color: #fff;
				width: 80px;
				height: 80px;
				border-radius: 50%;
				margin: 10px 20px 0;

				i {
					width: 50px;
					height: 50px;
					font-size: 50px;
					padding: 15px;
					color: #0087b4;
				}
			}

			.userinfo {
				width: 120px;
				color: #fff;
				margin-top: 45px;
				float: right;

				span {
					display: block;
					height: 25px;
				}
			}

			.close {
				color: #fff;
				margin-top: 35px;
				cursor: pointer;
				float: right;

				span {
					display: inline-block;
					padding-left: 2px;
					margin-right: 10px;
					color: #fff;
					width: 30px;
					height: 32px;
					background: url(../../images/icons/btn_logout.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
	}

	.tags {
		position: relative;
		height: 30px;
		overflow: hidden;
		background: #fff;
		padding-right: 120px;
		box-shadow: 0 5px 10px #ddd;
	}

	.tags ul {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}

	.tags-li {
		float: left;
		margin: 3px 5px 2px 3px;
		border-radius: 3px;
		font-size: 12px;
		overflow: hidden;
		cursor: pointer;
		height: 23px;
		line-height: 23px;
		border: 1px solid #e9eaec;
		background: #fff;
		padding: 0 5px 0 12px;
		vertical-align: middle;
		color: #666;
		-webkit-transition: all 0.3s ease-in;
		-moz-transition: all 0.3s ease-in;
		transition: all 0.3s ease-in;
	}

	.tags-li:not(.active):hover {
		background: #f8f8f8;
	}

	.tags-li.active {
		color: #fff;
	}

	.tags-li-title {
		float: left;
		max-width: 80px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-right: 5px;
		color: #666;
	}

	.tags-li.active .tags-li-title {
		color: #fff;
	}

	.tags-close-box {
		position: absolute;
		right: 0;
		top: 0;
		box-sizing: border-box;
		padding-top: 1px;
		text-align: center;
		width: 110px;
		height: 30px;
		background: #fff;
		box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
		z-index: 10;
	}

	// 滚动条样式
	.el-aside::-webkit-scrollbar,
	.el-menu--vertical::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	.el-aside::-webkit-scrollbar-thumb,
	.el-menu--vertical::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	.el-aside::-webkit-scrollbar-track .el-menu--vertical::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}

	.mainback::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 6px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	.mainback::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.4);
	}

	.mainback::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.2);
	}

	.el-menu--vertical {
		max-height: 100%;
		overflow-y: auto;
	}

	.treeBox::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 6px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	.treeBox::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.4);
	}

	.treeBox::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.2);
	}

	// 图表区样式
	.dataSpace {
		padding: 20px 0;
		box-sizing: border-box;

		.topData {
			width: 100%;
			height: 140px;
			padding: 10px;
			box-sizing: border-box;
			margin-bottom: 50px;

			.cardItem {
				transition: all .5s;
				display: flex;
				justify-content: space-between;
				border: 1px solid #ccc;
				cursor: pointer;
				box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);

				.cardLeft {
					flex: 40%;
					text-align: center;
					font-size: 40px;
					line-height: 130px;

					i {
						font-size: 60px;
						transition: all .5s;
					}
				}

				.cardRight {
					flex: 50%;

					p {
						text-align: center;
						margin: 10px auto;
						line-height: 50px;
					}

					.text1 {
						font-size: 36px;
					}

					.text2 {
						font-size: 18px;
					}
				}
			}

			.cardItem:hover {
				box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.3), 0 3px 7px 0 rgba(0, 0, 0, 0.3), 0 5px 3px -4px rgba(0, 0, 0, 0.4);
			}

			.cardItem:hover .cardLeft i {
				font-size: 70px;
			}
		}
	}

	.chartData {
		.title {
			width: 100%;
			font-size: 26px;
			text-align: center;
			margin: 15px auto;
		}

		.chart1 {
			width: 100%;
			height: 600px;
		}
		.chart2,
		.chart3,
		.chart4 {
			width: 100%;
			height: 500px;
		}
	}
</style>
