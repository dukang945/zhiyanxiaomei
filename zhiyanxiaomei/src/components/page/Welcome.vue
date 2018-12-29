<template>
	<div style="height: 100%">
		<el-container style="height: 100%">
			<el-header>
				<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
					<el-radio-button :label="false">展开</el-radio-button>
					<el-radio-button :label="true">收起</el-radio-button>
				</el-radio-group>
				<img src="../../images/icons/logo_home.png" alt>
				<div class="container-right">
					<div class="icon-head">
						<i class="el-icon-service"></i>
					</div>
					<div class="userinfo">
						<span>{{ username }}</span>
						<span>消息 ()</span>
					</div>
					<div class="close" @click="logout">
						<span></span>
					</div>
				</div>
			</el-header>

			<el-container style="height: 100%">
				<el-scrollbar style=" background-color: #545c64 ">
					<aside class="el-aside">
						<el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
						 :collapse="isCollapse" router @select="handleSelect">
							<el-submenu :index="(item.id).toString()" v-for='(item,index) in menulist' :key='item.id' class='menuOut'>
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>{{item.name}}</span>
								</template>
								<el-menu-item-group v-for='(itemChildren,index) in item.children' :key='itemChildren.id' >
									<el-menu-item :index="itemChildren.enname">{{itemChildren.name}}</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
						</el-menu>
					</aside>
				</el-scrollbar>
				<el-main class="mianback">
					<slider ref="slider" :path='path'></slider>
					<transition name="fade" mode="out-in" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight"
					 :duration="200">
						<router-view></router-view>
					</transition>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import bus from '../common/bus.js';
	import slide from '../module/slider.vue'
	// import store from '../../vuex/vuex.js'  
	// import animate from "animate.css";
	export default {
		data() {
			return {
				isCollapse: false,
				path:''
			};
		},
		components:{
			slider:slide
		},
		computed: {
			username() {
				let username = localStorage.getItem("ms_username");
				return username ? username : "";
			},
			menulist() {
				let menulist = JSON.parse(localStorage.getItem("menuList"));
				return menulist ? menulist : "";
			}
		},
		methods: {
			handleSelect(path,pathName){
				let cardName='';
				this.menulist.forEach(item=>{
					if(item.id==pathName[0]){
						item.children.forEach(item2=>{
							if(item2.enname==pathName[1]){
								cardName=item2.name
							}
						})
					}
				})
				this.$refs.slider.addTab(path,cardName);
			},
			logout() {
				localStorage.removeItem("ms_username");
				localStorage.removeItem("menuList");
				this.$router.push("/login");
			}
		}
	};
</script>

<style scoped lang="scss">
	/deep/ .el-scrollbar__wrap {
		overflow-x: hidden;
	}

	.el-header {
		text-align: center;
	}

	.el-submenu__title span {
		font-size: 16px;
	}

	.el-submenu .el-menu-item {
		min-width: 199px;
		text-align: right;
		font-size: 14px;
	}

	.el-radio-group {
		float: left;
		margin-top: 30px;
	}

	.el-aside {
		background-color: #d3dce6;
		color: #333;
		text-align: center;
		line-height: 200px;
		height: 100%;
		max-width: 200px;
		overflow: hidden;
	}

	.el-menu {
		height: 100%;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
		height: 100%;
	}

	.el-menu-item-group {
		max-height: 400px;
	}

	.el-main {
		background-color: #fff;
		color: #333;
		padding: 10px;
		box-sizing: border-box;
		// overflow: hidden;
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
		background-color: rgb(14, 127, 183);

		img {
			width: 340px;
			height: 44px;
			margin-top: 28px;
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
				width: 160px;
				height: 46px;
				color: #fff;
				margin-top: 27px;

				span {
					display: block;
					height: 25px;
				}
			}

			.close {
				color: #fff;
				margin-top: 28px;
				cursor: pointer;

				span {
					display: inline-block;
					padding-left: 2px;
					margin-right: 10px;
					color: #fff;
					width: 40px;
					height: 44px;
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
</style>
