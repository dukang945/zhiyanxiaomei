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
					 :default-active="routePath" router @select="handleSelect" unique-opened>
						<el-submenu :index="(item.menuid).toString()" v-for="(item) in menulist" :key="item.menuid" class="menuOut">
							<template slot="title">
								<i :class="item.icon"></i>
								<span>{{item.menuname}}</span>
							</template>
							<el-menu-item :index="itemMenu.enname" v-for='(itemMenu) in item.menus.filter((val)=>{return val.menus.length == 0})' :key='itemMenu.menuid' :class="$route.path=='/'+itemMenu.enname?'is-active':''">{{itemMenu.menuname}}</el-menu-item>
							<el-submenu :index="(itemMenu2.menuid).toString()"  v-for='(itemMenu2) in item.menus.filter((val)=>{return val.menus.length > 0})' :key='itemMenu2.menuid'>
								<template slot="title">
									<i :class="itemMenu2.icon"></i>
									<span>{{itemMenu2.menuname}}</span>
								</template>
								<el-menu-item :index="k.enname" v-for='(k) in itemMenu2.menus' :key='k.menuid' :class="$route.path=='/'+k.enname?'is-active':''">{{k.menuname}}</el-menu-item>
							</el-submenu>
						</el-submenu>
					</el-menu>
				</aside>
				<el-main class="mainback">
					<div class="mainBox">
						<Slide ref="slider" :path="path" @showPath='getPath'></Slide>
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
			var _this = this;
			this.$refs.slider.addTab(this.$route.path, this.$route.name);
			// 格式化所有img标签
// 			this.$axios.get('/management/admin/beauty-details!dataConvert.action').then(res=>{
// 				console.log(res)
// 			})
		},
		methods: {
			getPath(path) {
				var _this = this;
				if (path == 'welcome') {
					this.$route.push('/workspace')
				}
			},
			handleSelect(path, pathName) {
				this.isWelcome = false
				var cardName = "";
				if(pathName.length==2){
					this.menulist.forEach(item=>{
						if(item.menuid == pathName[0]){
							item.menus.forEach(item2=>{
								if (item2.enname == pathName[1]) {
									cardName = item2.menuname;
								}
							})
						}
					})
				}else if(pathName.length == 3){
					this.menulist.forEach(item=>{
						if(item.menuid == pathName[0]){
							item.menus.forEach(item2=>{
								if (item2.menuid == pathName[1]) {
									item2.menus.forEach(item3=>{
										if (item3.enname == pathName[2]) {
											cardName = item3.menuname;
										}
									})
								}
							})
						}
					})
				}
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

<style lang="scss" scoped="scoped">
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
		color: #686a76;
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
		color: #666;
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
	
	// 左侧菜单栏样式自定义
	.el-submenu.is-opened > .el-submenu__title{
		background-color: #ecf5ff;
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
</style>
