<template>
	<div style="height: 100%">
		<el-container style="height: 100%;background: linear-gradient(120deg, #fff, #5983e8);">
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
					<!-- <el-menu class="el-menu-vertical-demo" text-color="#333" active-text-color="#409EFF" :collapse="isCollapse"
					 :default-active="routePath" router @select="handleSelect" unique-opened>
						<el-submenu :index="(item.menuid).toString()" v-for="(item) in menulist" :key="item.menuid" class="menuOut">
							<template slot="title">
								<i :class="item.icon" class="icon iconfont"></i>
								<span slot="title">{{item.menuname}}</span>
							</template>
							<el-menu-item :index="itemMenu.enname" v-for='(itemMenu) in item.menus.filter((val)=>{return val.menus.length == 0})'
							 :key='itemMenu.menuid' :class="$route.path=='/'+itemMenu.enname?'is-active':''">{{itemMenu.menuname}}</el-menu-item>
							<el-submenu :index="(itemMenu2.menuid).toString()" v-for='(itemMenu2) in item.menus.filter((val)=>{return val.menus.length > 0})'
							 :key='itemMenu2.menuid'>
								<template slot="title">
									<i :class="itemMenu2.icon"></i>
									<span slot="title">{{itemMenu2.menuname}}</span>
								</template>
								<el-menu-item :index="k.enname" v-for='(k) in itemMenu2.menus' :key='k.menuid' :class="$route.path=='/'+k.enname?'is-active':''">{{k.menuname}}</el-menu-item>
							</el-submenu>
						</el-submenu>
					</el-menu> -->
					<div class="asideItem">
						<p class="itemTitle"><i class="iconfont el-icon-my-meizhuang2"></i><span v-if='!isCollapse'>美妆镜APP</span></p>
						<el-menu class="el-menu-vertical-demo" text-color="#3F51B5" active-text-color="#fff" :collapse="isCollapse"
						 :default-active="routePath" router @select="handleSelect" unique-opened>
							<el-submenu :index="(item.menuid).toString()" v-for="(item) in tempMenulist[0].menus.filter((val)=>{return val.menus.length > 0})" :key="item.menuid" class="menuOut">
								<template slot="title">
									<i :class="item.icon" class="icon iconfont"></i>
									<span slot="title" style="font-size: 16px;">{{item.menuname}}</span>
								</template>
								<el-menu-item :index="itemMenu.enname" v-for='(itemMenu) in item.menus.filter((val)=>{return val.menus.length == 0})'
								 :key='itemMenu.menuid' :class="$route.path=='/'+itemMenu.enname?'is-active':''"><span style="font-size: 14px;">{{itemMenu.menuname}}</span></el-menu-item>
								<el-submenu :index="(itemMenu2.menuid).toString()" v-for='(itemMenu2) in item.menus.filter((val)=>{return val.menus.length > 0})'
								 :key='itemMenu2.menuid'>
									<template slot="title">
										<i :class="itemMenu2.icon" class="icon iconfont"></i>
										<span slot="title" style="font-size: 14px;">{{itemMenu2.menuname}}</span>
									</template>
									<el-menu-item :index="k.enname" v-for='(k) in itemMenu2.menus' :key='k.menuid' :class="$route.path=='/'+k.enname?'is-active':''" style="text-align: right;">{{k.menuname}}</el-menu-item>
								</el-submenu>
							</el-submenu>
							<el-menu-item :index="item.enname" v-for='(item) in tempMenulist[0].menus.filter((val)=>{return val.menus.length == 0})'
							 :key='item.menuid' :class="$route.path=='/'+item.enname?'is-active':''"><i :class="item.icon" class="iconfont" style="color: #3F51B5;"></i><span style="font-size: 16px">{{item.menuname}}</span></el-menu-item>
						</el-menu>
					</div>
					<div class="asideItem">
						<p class="itemTitle"><i class="iconfont el-icon-my-meizhuang2"></i><span v-if='!isCollapse'>数据</span></p>
						<el-menu class="el-menu-vertical-demo" text-color="#3F51B5" active-text-color="#fff" :collapse="isCollapse"
						 :default-active="routePath" router @select="handleSelect" unique-opened>
							<el-submenu :index="(item.menuid).toString()" v-for="(item) in tempMenulist[1].menus.filter((val)=>{return val.menus.length > 0})" :key="item.menuid" class="menuOut">
								<template slot="title">
									<i :class="item.icon" class="icon iconfont"></i>
									<span slot="title" style="font-size: 16px;">{{item.menuname}}</span>
								</template>
								<el-menu-item :index="itemMenu.enname" v-for='(itemMenu) in item.menus.filter((val)=>{return val.menus.length == 0})'
								 :key='itemMenu.menuid' :class="$route.path=='/'+itemMenu.enname?'is-active':''"><span style="font-size: 14px;">{{itemMenu.menuname}}</span></el-menu-item>
								<el-submenu :index="(itemMenu2.menuid).toString()" v-for='(itemMenu2) in item.menus.filter((val)=>{return val.menus.length > 0})'
								 :key='itemMenu2.menuid'>
									<template slot="title">
										<i :class="itemMenu2.icon" class="icon iconfont"></i>
										<span slot="title" style="font-size: 14px;">{{itemMenu2.menuname}}</span>
									</template>
									<el-menu-item :index="k.enname" v-for='(k) in itemMenu2.menus' :key='k.menuid' :class="$route.path=='/'+k.enname?'is-active':''"><span style="text-align: right;">{{k.menuname}}</span></el-menu-item>
								</el-submenu>
							</el-submenu>
							<el-menu-item :index="item.enname" v-for='(item) in tempMenulist[1].menus.filter((val)=>{return val.menus.length == 0})'
							 :key='item.menuid' :class="$route.path=='/'+item.enname?'is-active':''"><i :class="item.icon" class="iconfont" style="color: #3F51B5;"></i><span style="font-size: 16px;">{{item.menuname}}</span></el-menu-item>
						</el-menu>
					</div>
					<div class="asideItem">
						<p class="itemTitle"><i class="iconfont el-icon-my-meizhuang2"></i><span v-if='!isCollapse'>美妆镜硬件</span></p>
						<el-menu class="el-menu-vertical-demo" text-color="#3F51B5" active-text-color="#fff" :collapse="isCollapse"
						 :default-active="routePath" router @select="handleSelect" unique-opened>
							<el-submenu :index="(item.menuid).toString()" v-for="(item) in tempMenulist[2].menus.filter((val)=>{return val.menus.length > 0})" :key="item.menuid" class="menuOut">
								<template slot="title">
									<i :class="item.icon" class="icon iconfont"></i>
									<span slot="title" style="font-size: 16px;">{{item.menuname}}</span>
								</template>
								<el-menu-item :index="itemMenu.enname" v-for='(itemMenu) in item.menus.filter((val)=>{return val.menus.length == 0})'
								 :key='itemMenu.menuid' :class="$route.path=='/'+itemMenu.enname?'is-active':''"><span style="font-size: 14px;">{{itemMenu.menuname}}</span></el-menu-item>
								<el-submenu :index="(itemMenu2.menuid).toString()" v-for='(itemMenu2) in item.menus.filter((val)=>{return val.menus.length > 0})'
								 :key='itemMenu2.menuid'>
									<template slot="title">
										<i :class="itemMenu2.icon" class="icon iconfont"></i>
										<span slot="title" style="font-size: 14px;">{{itemMenu2.menuname}}</span>
									</template>
									<el-menu-item :index="k.enname" v-for='(k) in itemMenu2.menus' :key='k.menuid' :class="$route.path=='/'+k.enname?'is-active':''" style="text-align: right;"><span >{{k.menuname}}</span></el-menu-item>
								</el-submenu>
								<el-menu-item :index="item.enname" v-for='(item) in tempMenulist[2].menus.filter((val)=>{return val.menus.length == 0})'
								 :key='item.menuid' :class="$route.path=='/'+item.enname?'is-active':''"><i :class="item.icon" class="iconfont" style="color: #3F51B5;"></i><span style="font-size: 16px;">{{item.menuname}}</span></el-menu-item>
							</el-submenu>
						</el-menu>
					</div>
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
				tempMenulist: [{
					enname: "",
					icon: "el-icon-my-AppStore",
					menuid: 2,
					menuname: "美妆镜APP",
					parentId: "1",
					menus: [{
							enname: "",
							icon: "el-icon-my-gongzuoneirong",
							menuid: 5,
							menuname: "内容管理",
							parentId: "2",
							menus: [{
								enname: "teach",
								icon: "el-icon-my-meizhuang3",
								menuid: 10,
								menuname: "美妆教程",
								parentId: "5",
								menus: [

								]
							}, {
								enname: "evaluation",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 11,
								menuname: "美妆测评",
								parentId: "5",
								menus: [

								]
							}, {
								enname: "beautyknowledge",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 12,
								menuname: "美妆知识",
								parentId: "5",
								menus: [

								]
							}, {
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 13,
								menuname: "星座妆容",
								parentId: "5",
								menus: [{
									enname: "constellation",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 23,
									menuname: "星座信息",
									parentId: "13",
									menus: [

									]
								}, {
									enname: "constellationDetail",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 24,
									menuname: "星座运势",
									parentId: "13",
									menus: [

									]
								}, {
									enname: "answer",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 25,
									menuname: "答案之书",
									parentId: "13",
									menus: [

									]
								}, ]
							}, {
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 14,
								menuname: "AR试妆",
								parentId: "5",
								menus: [{
									enname: "module",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 26,
									menuname: "AR试妆素材",
									parentId: "14",
									menus: [

									]
								}]
							}, {
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 15,
								menuname: "AI识颜",
								parentId: "5",
								menus: [{
										enname: "marking",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 27,
										menuname: "颜值分数分析",
										parentId: "15",
										menus: [

										]
									},
									{
										enname: "markingDetail",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 28,
										menuname: "颜值夸赞",
										parentId: "15",
										menus: [

										]
									},
									{
										enname: "emotion",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 29,
										menuname: "情绪检测",
										parentId: "15",
										menus: [

										]
									},
									{
										enname: "husbandStar",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 30,
										menuname: "明星夫妻相",
										parentId: "15",
										menus: [

										]
									},
									{
										enname: "similarCelebrity",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 31,
										menuname: "相似名人",
										parentId: "15",
										menus: [

										]
									}
								]
							}, {
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 16,
								menuname: "五官检测",
								parentId: "5",
								menus: [{
										enname: "eye",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 32,
										menuname: "眼部",
										parentId: "16",
										menus: [

										]
									},
									{
										enname: "face",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 33,
										menuname: "脸部",
										parentId: "16",
										menus: [

										]
									},
									{
										enname: "lip",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 34,
										menuname: "唇部",
										parentId: "16",
										menus: [

										]
									},
									{
										enname: "nose",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 35,
										menuname: "鼻部",
										parentId: "16",
										menus: [

										]
									},
									{
										enname: "hair",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 36,
										menuname: "发型",
										parentId: "16",
										menus: [

										]
									},
									{
										enname: "praise",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 37,
										menuname: "夸赞文案",
										parentId: "16",
										menus: [

										]
									},
									{
										enname: "star",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 38,
										menuname: "相似明星",
										parentId: "16",
										menus: [

										]
									}
								]
							}, {
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 17,
								menuname: "搜索管理",
								parentId: "5",
								menus: [{
										enname: "search",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 39,
										menuname: "热搜词",
										parentId: "17",
										menus: [

										]
									},
									{
										enname: "hotsearch",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 40,
										menuname: "大家都在搜",
										parentId: "17",
										menus: [

										]
									}
								]
							}, {
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 18,
								menuname: "天气管理",
								parentId: "5",
								menus: [{
									enname: "advice",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 41,
									menuname: "天气建议",
									parentId: "18",
									menus: [

									]
								}]
							}, {
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 19,
								menuname: "分享",
								parentId: "5",
								menus: [{
									enname: "shareDescribe",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 41,
									menuname: "分享文案",
									parentId: "18",
									menus: [

									]
								}]
							}, {
								enname: "rotation",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 20,
								menuname: "轮播图",
								parentId: "5",
								menus: [

								]
							}, {
								enname: "interestedTest",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 21,
								menuname: "感兴趣内容测试",
								parentId: "5",
								menus: [

								]
							}, {
								enname: "keyword",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 22,
								menuname: "屏蔽词",
								parentId: "5",
								menus: [

								]
							}]
						},
						{
							enname: "tag",
							icon: "el-icon-my-biaoqian",
							menuid: 6,
							menuname: "标签管理",
							parentId: "2",
							menus: [

							]
						},
						{
							enname: "",
							icon: "el-icon-my-stack",
							menuid: 7,
							menuname: "产品管理",
							parentId: "2",
							menus: [{
									enname: "",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 42,
									menuname: "产品库",
									parentId: "7",
									menus: [{
										enname: "brand",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 44,
										menuname: "品牌",
										parentId: "42",
										menus: [

										]
									}, {
										enname: "product",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 45,
										menuname: "品类",
										parentId: "42",
										menus: [

										]
									}, {
										enname: "issue",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 46,
										menuname: "功效成分",
										parentId: "42",
										menus: [

										]
									}, {
										enname: "makeup",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 47,
										menuname: "产品",
										parentId: "42",
										menus: [

										]
									}, {
										enname: "color",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 48,
										menuname: "色号",
										parentId: "42",
										menus: [

										]
									}]
								},
								{
									enname: "",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 43,
									menuname: "爬取产品库",
									parentId: "7",
									menus: [{
											enname: "newProduct",
											icon: "el-icon-my-gongzuoneirong",
											menuid: 49,
											menuname: "产品(爬取)",
											parentId: "43",
											menus: [

											]
										},
										{
											enname: "newIngredient",
											icon: "el-icon-my-gongzuoneirong",
											menuid: 50,
											menuname: "成分(爬取)",
											parentId: "43",
											menus: [

											]
										}
									]
								}
							]
						},
						{
							enname: "",
							icon: "el-icon-my-yonghu",
							menuid: 8,
							menuname: "用户管理",
							parentId: "2",
							menus: [{
									enname: "member",
									icon: "el-icon-my-yonghu",
									menuid: 51,
									menuname: "用户信息",
									parentId: "8",
									menus: []
								},
								{
									enname: "feedback",
									icon: "el-icon-my-yonghu",
									menuid: 52,
									menuname: "用户反馈",
									parentId: "8",
									menus: [

									]
								},
							]
						},
						{
							enname: "",
							icon: "el-icon-my-renyuan",
							menuid: 9,
							menuname: "权限管理",
							parentId: "2",
							menus: [{
									enname: "part",
									icon: "el-icon-my-renyuan",
									menuid: 55,
									menuname: "角色",
									parentId: "9",
									menus: [

									]
								},
								{
									enname: "user",
									icon: "el-icon-my-renyuan",
									menuid: 56,
									menuname: "后台用户",
									parentId: "9",
									menus: [

									]
								}
							]
						}
					]
				}, {
					enname: "",
					icon: "el-icon-my-shuju1",
					menuid: 3,
					menuname: "数据",
					parentId: "1",
					menus: [{
							enname: "workspace",
							icon: "el-icon-my-shuju1",
							menuid: 57,
							menuname: "数据总览",
							parentId: "3",
							menus: [

							]
						},
						{
							enname: "",
							icon: "el-icon-my-shuju1",
							menuid: 58,
							menuname: "APP数据",
							parentId: "3",
							menus: [{
									enname: "registeredUser",
									icon: "el-icon-my-shuju1",
									menuid: 59,
									menuname: "用户基础数据",
									parentId: "58",
									menus: [

									]
								},
								{
									enname: "labelCountAll",
									icon: "el-icon-my-shuju1",
									menuid: 60,
									menuname: "标签数据",
									parentId: "58",
									menus: [

									]
								},
								{
									enname: "beautyMakeupDataAll",
									icon: "el-icon-my-shuju1",
									menuid: 61,
									menuname: "文章数据",
									parentId: "58",
									menus: [

									]
								},
								{
									enname: "knowledgeMes",
									icon: "el-icon-my-shuju1",
									menuid: 62,
									menuname: "AI识颜",
									parentId: "58",
									menus: [

									]
								},
							]
						}
					]
				}, {
					enname: "",
					icon: "el-icon-my-yingjianshili",
					menuid: 4,
					menuname: "美妆镜硬件",
					parentId: "1",
					menus: [{
						enname: "",
						icon: "el-icon-my-yingjianshili",
						menuid: 63,
						menuname: "语料库",
						parentId: "4",
						menus: [{
							enname: "",
							icon: "el-icon-my-yingjianshili",
							menuid: 64,
							menuname: "化妆技巧",
							parentId: "63",
							menus: [{
								enname: "categoryProblem",
								icon: "el-icon-my-yingjianshili",
								menuid: 65,
								menuname: "化妆救急",
								parentId: "64",
								menus: [

								]
							}]
						}]
					}]
				}]
			};
		},
		components: {
			Slide
		},
		watch: {
			$route(newValue, oldValue) {
				this.$refs.slider.addTab(newValue.path,newValue.name)
			}
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
				console.log(path)
				var _this = this;
				if (path == 'quickWork') {
					this.$route.push('/quickWork')
				}
			},
			handleSelect(path, pathName) {
				this.isWelcome = false
				var cardName = "";
				if(pathName.length==1){
					// this.tempMenulist.forEach()
				}else if(pathName.length==2){
					
				}else if(pathName.length==3){
					
				}
// 				if (pathName.length == 1) {
// 					this.menulist.forEach(item => {
// 						if (item.menuid == pathName[0]) {
// 							item.menus.forEach(item2 => {
// 								if (item2.enname == pathName[1]) {
// 									cardName = item2.menuname;
// 								}
// 							})
// 						}
// 					})
// 				} else if (pathName.length == 2) {
// 					this.menulist.forEach(item => {
// 						if (item.menuid == pathName[0]) {
// 							item.menus.forEach(item2 => {
// 								if (item2.enname == pathName[1]) {
// 									cardName = item2.menuname;
// 								}
// 							})
// 						}
// 					})
// 				} else if (pathName.length == 3) {
// 					this.menulist.forEach(item => {
// 						if (item.menuid == pathName[0]) {
// 							item.menus.forEach(item2 => {
// 								if (item2.menuid == pathName[1]) {
// 									item2.menus.forEach(item3 => {
// 										if (item3.enname == pathName[2]) {
// 											cardName = item3.menuname;
// 										}
// 									})
// 								}
// 							})
// 						}
// 					})
// 				}
				// this.$refs.slider.addTab(path, cardName);
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
			},
			// 临时创建菜单结构
			fecthList() {
				let tempList = [{
					enname: "",
					icon: "el-icon-my-AppStore",
					menuid: 2,
					menuname: "美妆镜APP",
					parentId: "1",
					menus: [{
							enname: "",
							icon: "el-icon-my-gongzuoneirong",
							menuid: 5,
							menuname: "内容管理",
							parentId: "2",
							menus: [{
								enname: "teach",
								icon: "el-icon-my-meizhuang3",
								menuid: 10,
								menuname: "美妆教程",
								parentId: "5",
								menus: [

								]
							}, {
								enname: "evaluation",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 11,
								menuname: "美妆测评",
								parentId: "5",
								menus: [

								]
							}, {
								enname: "beautyknowledge",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 12,
								menuname: "美妆知识",
								parentId: "5",
								menus: [

								]
							},
							 {
							 	enname: "",
							 	icon: "el-icon-my-gongzuoneirong",
							 	menuid: 16,
							 	menuname: "五官检测",
							 	parentId: "5",
							 	menus: [{
							 			enname: "eye",
							 			icon: "el-icon-my-gongzuoneirong",
							 			menuid: 32,
							 			menuname: "眼部",
							 			parentId: "16",
							 			menus: [
							 
							 			]
							 		},
							 		{
							 			enname: "face",
							 			icon: "el-icon-my-gongzuoneirong",
							 			menuid: 33,
							 			menuname: "脸部",
							 			parentId: "16",
							 			menus: [
							 
							 			]
							 		},
							 		{
							 			enname: "lip",
							 			icon: "el-icon-my-gongzuoneirong",
							 			menuid: 34,
							 			menuname: "唇部",
							 			parentId: "16",
							 			menus: [
							 
							 			]
							 		},
							 		{
							 			enname: "nose",
							 			icon: "el-icon-my-gongzuoneirong",
							 			menuid: 35,
							 			menuname: "鼻部",
							 			parentId: "16",
							 			menus: [
							 
							 			]
							 		},
							 		{
							 			enname: "hair",
							 			icon: "el-icon-my-gongzuoneirong",
							 			menuid: 36,
							 			menuname: "发型",
							 			parentId: "16",
							 			menus: [
							 
							 			]
							 		},
							 		{
							 			enname: "praise",
							 			icon: "el-icon-my-gongzuoneirong",
							 			menuid: 37,
							 			menuname: "夸赞文案",
							 			parentId: "16",
							 			menus: [
							 
							 			]
							 		},
							 		{
							 			enname: "star",
							 			icon: "el-icon-my-gongzuoneirong",
							 			menuid: 38,
							 			menuname: "相似明星",
							 			parentId: "16",
							 			menus: [
							 
							 			]
							 		}
							 	]
							 },
							 
// 							{
// 								enname: "",
// 								icon: "el-icon-my-gongzuoneirong",
// 								menuid: 13,
// 								menuname: "星座妆容",
// 								parentId: "5",
// 								menus: [{
// 									enname: "constellation",
// 									icon: "el-icon-my-gongzuoneirong",
// 									menuid: 23,
// 									menuname: "星座信息",
// 									parentId: "13",
// 									menus: [
// 
// 									]
// 								}, {
// 									enname: "constellationDetail",
// 									icon: "el-icon-my-gongzuoneirong",
// 									menuid: 24,
// 									menuname: "星座运势",
// 									parentId: "13",
// 									menus: [
// 
// 									]
// 								}, {
// 									enname: "answer",
// 									icon: "el-icon-my-gongzuoneirong",
// 									menuid: 25,
// 									menuname: "答案之书",
// 									parentId: "13",
// 									menus: [
// 
// 									]
// 								}, ]
// 							},
							{
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 14,
								menuname: "AR试妆",
								parentId: "5",
								menus: [{
									enname: "module",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 26,
									menuname: "AR试妆素材",
									parentId: "14",
									menus: [

									]
								}]
							}, {
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 15,
								menuname: "AI识颜",
								parentId: "5",
								menus: [{
										enname: "",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 27,
										menuname: "颜值分数分析",
										parentId: "15",
										menus: [

										]
									},
									{
										enname: "",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 28,
										menuname: "颜值夸赞",
										parentId: "15",
										menus: [

										]
									},
									{
										enname: "emotion",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 29,
										menuname: "情绪检测",
										parentId: "15",
										menus: [

										]
									},
									{
										enname: "husbandStar",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 30,
										menuname: "明星夫妻相",
										parentId: "15",
										menus: [

										]
									},
									{
										enname: "similarCelebrity",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 31,
										menuname: "相似名人",
										parentId: "15",
										menus: [

										]
									}
								]
							}, 
							{
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 13,
								menuname: "星座妆容",
								parentId: "5",
								menus: [{
									enname: "constellation",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 23,
									menuname: "星座信息",
									parentId: "13",
									menus: [
							
									]
								}, {
									enname: "constellationDetail",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 24,
									menuname: "星座运势",
									parentId: "13",
									menus: [
							
									]
								}, {
									enname: "answer",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 25,
									menuname: "答案之书",
									parentId: "13",
									menus: [
							
									]
								}, ]
							},
// 							{
// 								enname: "",
// 								icon: "el-icon-my-gongzuoneirong",
// 								menuid: 16,
// 								menuname: "五官检测",
// 								parentId: "5",
// 								menus: [{
// 										enname: "eye",
// 										icon: "el-icon-my-gongzuoneirong",
// 										menuid: 32,
// 										menuname: "眼部",
// 										parentId: "16",
// 										menus: [
// 
// 										]
// 									},
// 									{
// 										enname: "face",
// 										icon: "el-icon-my-gongzuoneirong",
// 										menuid: 33,
// 										menuname: "脸部",
// 										parentId: "16",
// 										menus: [
// 
// 										]
// 									},
// 									{
// 										enname: "lip",
// 										icon: "el-icon-my-gongzuoneirong",
// 										menuid: 34,
// 										menuname: "唇部",
// 										parentId: "16",
// 										menus: [
// 
// 										]
// 									},
// 									{
// 										enname: "nose",
// 										icon: "el-icon-my-gongzuoneirong",
// 										menuid: 35,
// 										menuname: "鼻部",
// 										parentId: "16",
// 										menus: [
// 
// 										]
// 									},
// 									{
// 										enname: "hair",
// 										icon: "el-icon-my-gongzuoneirong",
// 										menuid: 36,
// 										menuname: "发型",
// 										parentId: "16",
// 										menus: [
// 
// 										]
// 									},
// 									{
// 										enname: "praise",
// 										icon: "el-icon-my-gongzuoneirong",
// 										menuid: 37,
// 										menuname: "夸赞文案",
// 										parentId: "16",
// 										menus: [
// 
// 										]
// 									},
// 									{
// 										enname: "star",
// 										icon: "el-icon-my-gongzuoneirong",
// 										menuid: 38,
// 										menuname: "相似明星",
// 										parentId: "16",
// 										menus: [
// 
// 										]
// 									}
// 								]
// 							},
							{
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 17,
								menuname: "搜索管理",
								parentId: "5",
								menus: [{
										enname: "search",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 39,
										menuname: "热搜词",
										parentId: "17",
										menus: [

										]
									},
									{
										enname: "hotsearch",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 40,
										menuname: "大家都在搜",
										parentId: "17",
										menus: [

										]
									}
								]
							}, {
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 18,
								menuname: "天气管理",
								parentId: "5",
								menus: [{
									enname: "advice",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 41,
									menuname: "天气建议",
									parentId: "18",
									menus: [

									]
								}]
							}, {
								enname: "",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 19,
								menuname: "分享",
								parentId: "5",
								menus: [{
									enname: "shareDescribe",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 41,
									menuname: "分享文案",
									parentId: "18",
									menus: [

									]
								}]
							}, {
								enname: "rotation",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 20,
								menuname: "轮播图",
								parentId: "5",
								menus: [

								]
							}, {
								enname: "interestedTest",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 21,
								menuname: "感兴趣内容测试",
								parentId: "5",
								menus: [

								]
							}, {
								enname: "keyword",
								icon: "el-icon-my-gongzuoneirong",
								menuid: 22,
								menuname: "屏蔽词",
								parentId: "5",
								menus: [

								]
							}]
						},
						{
							enname: "tag",
							icon: "el-icon-my-biaoqian",
							menuid: 6,
							menuname: "标签管理",
							parentId: "2",
							menus: [

							]
						},
						{
							enname: "",
							icon: "el-icon-my-stack",
							menuid: 7,
							menuname: "产品管理",
							parentId: "2",
							menus: [{
									enname: "",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 42,
									menuname: "产品库",
									parentId: "7",
									menus: [{
										enname: "brand",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 44,
										menuname: "品牌",
										parentId: "42",
										menus: [

										]
									}, {
										enname: "product",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 45,
										menuname: "品类",
										parentId: "42",
										menus: [

										]
									}, {
										enname: "issue",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 46,
										menuname: "功效成分",
										parentId: "42",
										menus: [

										]
									}, {
										enname: "makeup",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 47,
										menuname: "产品",
										parentId: "42",
										menus: [

										]
									}, {
										enname: "color",
										icon: "el-icon-my-gongzuoneirong",
										menuid: 48,
										menuname: "色号",
										parentId: "42",
										menus: [

										]
									}]
								},
								{
									enname: "",
									icon: "el-icon-my-gongzuoneirong",
									menuid: 43,
									menuname: "爬取产品库",
									parentId: "7",
									menus: [{
											enname: "newProduct",
											icon: "el-icon-my-gongzuoneirong",
											menuid: 49,
											menuname: "产品(爬取)",
											parentId: "43",
											menus: [

											]
										},
										{
											enname: "newIngredient",
											icon: "el-icon-my-gongzuoneirong",
											menuid: 50,
											menuname: "成分(爬取)",
											parentId: "43",
											menus: [

											]
										}
									]
								}
							]
						},
						{
							enname: "",
							icon: "el-icon-my-yonghu",
							menuid: 8,
							menuname: "用户管理",
							parentId: "2",
							menus: [{
									enname: "member",
									icon: "el-icon-my-yonghu",
									menuid: 51,
									menuname: "用户信息",
									parentId: "8",
									menus: []
								},
								{
									enname: "feedback",
									icon: "el-icon-my-yonghu",
									menuid: 52,
									menuname: "用户反馈",
									parentId: "8",
									menus: [

									]
								},
							]
						},
						{
							enname: "",
							icon: "el-icon-my-renyuan",
							menuid: 9,
							menuname: "权限管理",
							parentId: "2",
							menus: [{
									enname: "part",
									icon: "el-icon-my-renyuan",
									menuid: 55,
									menuname: "角色",
									parentId: "9",
									menus: [

									]
								},
								{
									enname: "user",
									icon: "el-icon-my-renyuan",
									menuid: 56,
									menuname: "后台用户",
									parentId: "9",
									menus: [

									]
								}
							]
						}
					]
				}, {
					enname: "",
					icon: "el-icon-my-shuju1",
					menuid: 3,
					menuname: "数据",
					parentId: "1",
					menus: [{
							enname: "workspace",
							icon: "el-icon-my-shuju1",
							menuid: 57,
							menuname: "数据总览",
							parentId: "3",
							menus: [

							]
						},
						{
							enname: "",
							icon: "el-icon-my-shuju1",
							menuid: 58,
							menuname: "APP数据",
							parentId: "3",
							menus: [{
									enname: "registeredUser",
									icon: "el-icon-my-shuju1",
									menuid: 59,
									menuname: "用户基础数据",
									parentId: "58",
									menus: [

									]
								},
								{
									enname: "labelCountAll",
									icon: "el-icon-my-shuju1",
									menuid: 60,
									menuname: "标签数据",
									parentId: "58",
									menus: [

									]
								},
								{
									enname: "beautyMakeupDataAll",
									icon: "el-icon-my-shuju1",
									menuid: 61,
									menuname: "文章数据",
									parentId: "58",
									menus: [

									]
								},
								{
									enname: "knowledgeMes",
									icon: "el-icon-my-shuju1",
									menuid: 62,
									menuname: "AI识颜",
									parentId: "58",
									menus: [

									]
								},
							]
						}
					]
				}, {
					enname: "",
					icon: "el-icon-my-yingjianshili",
					menuid: 4,
					menuname: "美妆镜硬件",
					parentId: "1",
					menus: [{
						enname: "",
						icon: "el-icon-my-yingjianshili",
						menuid: 63,
						menuname: "语料库",
						parentId: "4",
						menus: [{
							enname: "",
							icon: "el-icon-my-yingjianshili",
							menuid: 64,
							menuname: "化妆技巧",
							parentId: "63",
							menus: [{
								enname: "categoryProblem",
								icon: "el-icon-my-yingjianshili",
								menuid: 65,
								menuname: "化妆救急",
								parentId: "64",
								menus: [

								]
							}]
						}]
					}]
				}]
				this.tempMenulist = tempList
			}

		}
	};
</script>

<style lang="scss" scoped>
html{
	touch-action: none;
}
	/deep/ .el-scrollbar__wrap {
		overflow-x: hidden;
	}

	.el-header {
		text-align: center;
	}

	.el-scrollbar__view {
		height: 100%;
	}
	.el-submenu__title{
		border-bottom:1px solid #fff;
	}
	
	.el-submenu__title span {
		// color: rgba(255,255,255,1);
		color: #3F51B5;
	}
	.el-submenu__title i{
		// color: rgba(255,255,255,1);
		color: #3F51B5;
	}
	.el-submenu .el-menu-item {
		min-width: 196px;
		border-bottom:1px solid rgba(255,255,255,.5)
		// text-align: right;
		// font-size: 14px;
	}
	.menuBtn {
		float: left;
		font-size: 30px;
		margin-left: 30px;
		margin-top: 55px;
		color: #333;
	}

	.el-aside {
		// background-color: #d3dce6;
		color: rgba(255,255,255,1);
		text-align: center;
		// line-height: 200px;
		max-width: 222px;
		max-height: 90%;
		overflow-x: hidden;
		padding:0px 10px 10px;
		box-sizing: border-box;
		margin-top: 20px;
	}

	// 左侧菜单样式
	.asideItem {
		margin-bottom: 20px;
		// background: rgba(0, 0, 0, 0.1);
		background: rgba(114, 150, 236, 0.3);
		border: 1px solid transparent;
		border-radius: 5px;
		box-sizing: border-box;
		width: 100%;
		.itemTitle {
			height: 50px;
			line-height: 50px;
			background-color: rgba(114, 150, 236, 0.8);
			border-bottom: 1px solid rgba(255,255,255,0.5);
			margin: 0;
			span {
				margin-left: 20px;
				color: #fff;
				font-size: 18px;
			}
			i{
				font-size: 18px;
			}
		}
	}



	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 196px;
		min-height: 100%;
	}

	.el-menu-item-group {
		max-height: 400px;
	}
	
.el-menu.el-menu--inline{
	max-height: 100%;
	overflow: auto;
}

	.mainback {
		margin-top: 20px;
		padding:0 20px;
		box-sizing: border-box;
		color: #666;
		// overflow: hidden;
	}

	.mainback .mainBox {
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
		background: linear-gradient(120degf, #fffff, #5983e8);

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
				margin-top: 40px;
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
<style>
	/* 左侧菜单栏样式自定义 */
	li.is-opened>.el-submenu__title {
		background-color: rgba(114, 150, 236, 0.5);
		/* background-color: red; */
	}
	.el-submenu.is-active .el-submenu__title{
		border-bottom: 1px solid rgba(255,255,255,.5);
	}
	.el-submenu{
		transition: all .5s;
	}
	.el-submenu.is-opened{
		box-shadow: 5px 5px 10px 0 rgba(0,0,0,0.3);
	}
	.el-menu {
		min-height: 100%;
		border: none;
		background-color: transparent;
		/* background-color: rgba(114, 150, 236, 0.4); */
		/* color: rgba(255,255,255,1); */
		color: #3F51B5;
	}
	.el-menu--vertical .el-menu{
		background-color: rgba(114, 150, 236, 0.5);
	}
	.el-submenu__title{
		border-bottom: 1px solid rgba(255,255,255,.5);
	}
	.el-submenu__title i{
		/* color: #fff; */
		color: #3F51B5;
	}
	.el-submenu__title:focus,.el-submenu__title:hover{
		background: rgba(114, 150, 236, 0.5)
	}
	.el-menu-item>span{
		margin-left: 5px;
	}
	.el-menu-item:focus, .el-menu-item:hover{
		background: rgba(114, 150, 236, 0.5)
	}
	.el-menu-item:hover{
		background: rgba(114, 150, 236, 0.5)
	}
</style>
