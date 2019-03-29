<template>
	<div class="dataSpace">
		<el-row class='topData' :gutter="30" style='margin: 0;'>
			<el-col :span='6'>
				<div class="cardItem" style="background: linear-gradient(to right, rgba(255, 255, 255,1), rgba(50, 208, 136,0.2))">
					<div class="cardLeft" style="color: #32D088;">
						<i class="icon iconfont el-icon-my-xinzengrenyuan_huaban"></i>
					</div>
					<div class="cardRight">
						<p class="text1">{{cardData.registeredData}}</p>
						<p class="text2">昨日注册量</p>
						<p class="text3 numberDown" v-if='cardData.registeredTrend<0'>环比 - {{cardData.registeredTrend*(-1)}} % <i class="el-icon-caret-bottom"></i></p>
						<p class="text3 numberUp" v-else>环比 + {{cardData.registeredTrend}} % <i class="el-icon-caret-top"></i></p>
					</div>
				</div>
			</el-col>
			<el-col :span='6'>
				<div class="cardItem" style="background: linear-gradient(to right, rgba(255, 255, 255,1), rgba(251, 110, 81,0.2))">
					<div class="cardLeft" style="color: #FB6E51;">
						<i class="icon iconfont el-icon-my-liulanliang"></i>
					</div>
					<div class="cardRight">
						<p class="text1">{{cardData.readData}}</p>
						<p class="text2">昨日阅读量</p>
						<p class="text3 numberDown" v-if='cardData.readTrend<0'>环比 - {{cardData.readTrend*(-1)}}% <i class="el-icon-caret-bottom"></i></p>
						<p class="text3 numberUp" v-else>环比 + {{cardData.readTrend}} % <i class="el-icon-caret-top"></i></p>
					</div>
				</div>
			</el-col>
			<el-col :span='6'>
				<div class="cardItem" style="background: linear-gradient(to right, rgba(255, 255, 255,1), rgba(245, 178, 82,0.2))">
					<div class="cardLeft" style="color: #F5B252;">
						<i class="icon iconfont el-icon-my-pinglun"></i>
					</div>
					<div class="cardRight">
						<p class="text1">{{cardData.commentData}}</p>
						<p class="text2">昨日评论量</p>
						<p class="text3 numberDown" v-if='cardData.commentDataTrend<0'>环比 - {{cardData.commentDataTrend*(-1)}} % <i class="el-icon-caret-bottom"></i></p>
						<p class="text3 numberUp" v-else>环比 + {{cardData.commentDataTrend}} % <i class="el-icon-caret-top"></i></p>
					</div>
				</div>
			</el-col>
			<el-col :span='6'>
				<div class="cardItem totalNumber" style="background: linear-gradient(to right, rgba(50, 208, 136,0.2),rgba(50, 206, 228,0.2),rgba(251, 110, 81,0.2), rgba(245, 178, 82,0.2))">
					<p>总注册量 <span>{{cardData.registeredAll}}</span></p>
					<p>总阅读量 <span>{{cardData.readAll}}</span></p>
					<p>总评论量 <span>{{cardData.commentAll}}</span></p>
				</div>
			</el-col>
		</el-row>
		<el-row class='chartData' style='margin: 30px 0'>
			<el-col :span='24' class='chartDataTitle'>
				<p>用户组成数据分析</p>
				<div class="timeSelect">
					选择日期：
					<el-date-picker v-model="userDataTime" type="date" size='mini' placeholder="选择某一天" value-format="yyyy-MM-dd"
					 @change='chooseTimeForUser'>
					</el-date-picker>
					<el-button type="primary" size='mini' plain @click='checkUserYesterday'>前一天</el-button>
					<el-button type="primary" size='mini' plain @click='checkUserLastWeek'>近七天</el-button>
					<el-button type="primary" size='mini' plain @click='checkUserLastMonth'>近一个月</el-button>
					<el-button type="primary" size='mini' plain @click='checkUserAllTime'>所有时间</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row class='chartData' type="flex" :gutter='30' justify="space-around" style='margin: 30px 0'>
			<el-col :span='7' class='cirqueBox'>
				<div class="title">注册渠道组成</div>
				<div ref="memberEchart" class="chart2"></div>
			</el-col>
			<el-col :span='7' class='cirqueBox'>
				<div class="title">年龄区间结构</div>
				<div ref="ageEchart" class="chart3"></div>
			</el-col>
			<el-col :span='7' class='cirqueBox'>
				<div class="title">化妆水平</div>
				<div ref="levelEchart" class="chart4"></div>
			</el-col>
		</el-row>
		<el-row class='chartData' type="flex" :gutter='30' justify="space-around" style='margin: 30px 0'>
			<el-col :span='7' class='cirqueBox'>
				<div class="title">肤质</div>
				<div ref="skinEchart" class="chart5"></div>
			</el-col>
			<el-col :span='7' class='cirqueBox'>
				<div class="title">感兴趣妆容TOP5</div>
				<div ref="likeEchart" class="chart6"></div>
			</el-col>
			<el-col :span='7' class='cirqueBox'>
				<div class="title">感兴趣功效TOP5</div>
				<div ref="effectEchart" class="chart7"></div>
			</el-col>
		</el-row>
		<el-row class='chartData labelChart' style='margin: 30px 0'>
			<el-col :span='24'>
				<div class="title">标签阅读量TOP10--{{labelType}}--{{labelTime}}</div>
				<div ref="labelEchart" class="chart1"></div>
				<div class="typeSelect">
					切换类型：
					<el-button type="primary" size='mini' plain @click='checkTeach'>美妆教程</el-button>
					<el-button type="primary" size='mini' plain @click='checkEvaluation'>美妆测评</el-button>
					<el-button type="primary" size='mini' plain @click='checkNew'>初学乍练</el-button>
					<el-button type="primary" size='mini' plain @click='checkAllType'>全部类型</el-button>
				</div>
				<div class="timeSelect">
					选择周期：
					<el-date-picker v-model="LabelDataTime" type="date" size='mini' placeholder="选择某一天" value-format="yyyy-MM-dd"
					 @change='chooseTimeForLabel'>
					</el-date-picker>
					<el-button type="primary" size='mini' plain @click='checkYesterday'>前一天</el-button>
					<el-button type="primary" size='mini' plain @click='checkLastWeek'>近七天</el-button>
					<el-button type="primary" size='mini' plain @click='checkLastMonth'>近一个月</el-button>
					<el-button type="primary" size='mini' plain @click='checkAllTime'>所有时间</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='24' class='pageBox'>
				<p class="tableHead">专题阅读量TOP10</p>
				<el-table :data="objectTableData" border style="width: 80%;margin: 0 auto;">
					<el-table-column type="index" label="排名" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="detailsName" label="标题" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<!-- <el-table-column prop="type" label="所属类目" width="150" align='center' :show-overflow-tooltip="true">
					</el-table-column> -->
					<el-table-column prop="labelName" label="标签" width='300' align='center' :formatter='getLabel'
					 :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="readNum" label="阅读量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="commentNum" label="评论量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="likeNum" label="点赞量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="enshrine" label="收藏量" width="100" align='center'>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span='24' class='tableBox'>
				<p class="tableHead">文章阅读量TOP10</p>
				<div class="typeSelect">
					切换类型：
					<el-button type="primary" size='mini' plain @click='checkTeachPage'>美妆教程</el-button>
					<el-button type="primary" size='mini' plain @click='checkEvaluationPage'>美妆测评</el-button>
					<el-button type="primary" size='mini' plain @click='checkNewPage'>美妆知识</el-button>
					<el-button type="primary" size='mini' plain @click='checkAllTypePage'>全部类型</el-button>
				</div>
				<el-table :data="pageTableData" border style="width: 80%;margin: 0 auto;" v-loading="loading">
					<el-table-column type="index" label="排名" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="detailsName" label="标题" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="labelType" label="所属类目" width="150" align='center' :formatter='getType'
					 :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="labelName" label="标签" width='250' align='center' :formatter='getLabel'
					 :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="readNum" label="阅读量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="commentNum" label="评论量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="likeNum" label="点赞量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="enshrine" label="收藏量" width="100" align='center'>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		data() {
			return {
				chart1: null,
				chart2: null,
				chart3: null,
				chart4: null,
				chart5: null,
				chart6: null,
				chart7: null,
				labelType: '所有类型',
				choosedLabelType: '',
				labelTime: '所有时间',
				objectTableData: [],
				pageTableData: [],
				userDataTime: '',
				LabelDataTime: '',
				cardData: {
					registeredData: 0,
					registeredTrend: 0,
					readData: 0,
					readTrend: 0,
					commentData: 0,
					commentDataTrend: 0,
					registeredAll: 0,
					readAll: 0,
					commentAll: 0
				},
				loading:false
			}
		},
		methods: {
			getLabel(row, column, list) {
				return list.join(',')
			},
			getType(row, column, type) {
				if (type == 1) {
					return '美妆教程'
				} else if (type == 2) {
					return '美妆测评'
				} else if (type == 3) {
					return '美妆知识'
				}
			},
			// 初始化图表
			initChart1(data) {
				this.chart1 = echarts.init(this.$refs.labelEchart, 'light')
				// 把配置和数据放这里
				this.chart1.setOption({
					legend: {},
					tooltip: {},
					dataset: {
						source: data
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
			initChart2(data) {
				this.chart2 = echarts.init(this.$refs.memberEchart, 'light');
				this.chart2.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: data.map(item => {
							return item.name
						})
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
									fontSize: '26',
									fontWeight: 'bold'
								},
								formatter: '{b}:\n{d}%'
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: data
					}]
				})
			},
			initChart3(data) {
				this.chart3 = echarts.init(this.$refs.ageEchart, 'light');
				this.chart3.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: data.map(item => {
							return item.name
						})
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
									fontSize: '26',
									fontWeight: 'bold'
								},
								formatter: '{b}:\n{d}%'
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: data
					}]
				})
			},
			initChart4(data) {
				this.chart4 = echarts.init(this.$refs.levelEchart, 'light');
				this.chart4.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: data.map(item => {
							return item.name
						})
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
									fontSize: '26',
									fontWeight: 'bold'
								},
								formatter: '{b}:\n{d}%'
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: data
					}]
				})
			},
			initChart5(data) {
				this.chart5 = echarts.init(this.$refs.skinEchart, 'light');
				this.chart5.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: data.map(item => {
							return item.name
						})
					},
					series: [{
						name: '皮肤状态',
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
									fontSize: '26',
									fontWeight: 'bold'
								},
								formatter: '{b}:\n{d}%'
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: data
					}]
				})
			},
			initChart6(data) {
				this.chart6 = echarts.init(this.$refs.likeEchart, 'light');
				this.chart6.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: data.map(item => {
							return item.name
						})
					},
					series: [{
						name: '感兴趣妆容TOP5',
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
									fontSize: '26',
									fontWeight: 'bold'
								},
								formatter: '{b}:\n{d}%'
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: data
					}]
				})
			},
			initChart7(data) {
				this.chart7 = echarts.init(this.$refs.effectEchart, 'light');
				this.chart7.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: data.map(item => {
							return item.name
						})
					},
					series: [{
						name: '感兴趣功效',
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
									fontSize: '26',
									fontWeight: 'bold'
								},
								formatter: '{b}:\n{d}%'
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: data
					}]
				})
			},
			// 选择时间切换人员组成数据
			chooseTimeForUser(value) {
				this.getUserOfData('', value)
			},
			// 切换不同时间段用户数据
			checkUserYesterday() {
				this.userDataTime = '';
				this.getUserOfData('0', '')
			},
			checkUserLastWeek() {
				this.userDataTime = '';
				this.getUserOfData(1, '')
			},
			checkUserLastMonth() {
				this.userDataTime = '';
				this.getUserOfData(2, '')
			},
			checkUserAllTime() {
				this.userDataTime = '';
				this.getUserOfData(3, '')
			},
			// 切换标签统计类型及时间段
			checkTeach() {
				this.choosedLabelType = 1;
				this.getLabelReadData(1, 3, '')
				this.labelType = '美妆教程'
			},
			checkEvaluation() {
				this.choosedLabelType = 2;
				this.getLabelReadData(2, 3, '')
				this.labelType = '美妆测评'
			},
			checkNew() {
				this.choosedLabelType = 7;
				this.getLabelReadData(7, 3, '')
				this.labelType = '初学乍练'
			},
			checkAllType() {
				this.choosedLabelType = '';
				this.getLabelReadData('', 3, '')
				this.labelType = '全部类型'
			},
			chooseTimeForLabel(value) {
				this.getLabelReadData(this.choosedLabelType, '', value)
				this.labelTime = value
			},
			checkYesterday() {
				this.LabelDataTime = '';
				this.getLabelReadData(this.choosedLabelType, '0', '')
				this.labelTime = '前一天'
			},
			checkLastWeek() {
				this.LabelDataTime = '';
				this.getLabelReadData(this.choosedLabelType, 1, '')
				this.labelTime = '近七天'
			},
			checkLastMonth() {
				this.LabelDataTime = '';
				this.getLabelReadData(this.choosedLabelType, 2, '')
				this.labelTime = '近一个月'
			},
			checkAllTime() {
				this.LabelDataTime = '';
				this.getLabelReadData(this.choosedLabelType, 3, '')
				this.labelTime = '所有时间'
			},
			// 切换文章类型
			checkTeachPage() {
				this.getPageReadData(1)
			},
			checkEvaluationPage() {
				this.getPageReadData(2)
			},
			checkNewPage() {
				this.getPageReadData(3)
			},
			checkAllTypePage() {
				this.getPageReadData()
			},
			// 获取注册组成数据
			getUserOfData(time, date) {
				var http
				if (time != '' && date == '') {
					http = `/management/admin/homepage!userOfData.action?selectType=${time}`;
				};
				if (date != '' && time == '') {
					http = `/management/admin/homepage!userOfData.action?selectTime=${date}`;
				}
				if (http) {
					this.$axios.get(http).then(res => {
						let data2 = [{
								value: 1,
								name: '手机号注册'
							},
							{
								value: 1,
								name: '微信注册'
							},
							{
								value: 1,
								name: 'QQ注册'
							},
							{
								value: 1,
								name: '微博注册'
							}
						];
						data2[0].value = res.data.registered.registerNumPhone
						data2[1].value = res.data.registered.registerNumWx
						data2[2].value = res.data.registered.registerNumQq
						data2[3].value = res.data.registered.registerNumWb
						this.initChart2(data2)
					})
				}
			},
			// 获取标签TOP10数据
			getLabelReadData(type, time, date) {
				var httpLabel
				if (type && time != '') {
					httpLabel = `/management/admin/homepage!labelReadNumData.action?labelType=${type}&selectType=${time}`
				} else if (type && date != '') {
					httpLabel = `/management/admin/homepage!labelReadNumData.action?labelType=${type}&selectTime=${date}`
				} else if (type == '' && time != '') {
					httpLabel = `/management/admin/homepage!labelReadNumData.action?selectType=${time}`
				} else if (type == '' && date != '') {
					httpLabel = `/management/admin/homepage!labelReadNumData.action?selectTime=${date}`
				}
				if (httpLabel) {
					this.$axios.get(httpLabel).then(res => {
						let data1 = [
							['product', '阅读次数', '收藏量', '点赞量', '评论数', '分享次数']
						];
						res.data.forEach(item => {
							data1.push([item.name, item.readNum, item.enshrine, item.likeNum, item.commentNum, item.shareNum])
						})
						this.initChart1(data1)
					})
				}
			},
			// 获取文章阅读top10
			getPageReadData(type) {
				this.loading=true
				if (type) {
					this.$axios.get(`/management/admin/homepage!getBeautyDetailsTop10.action?labelType=${type}`).then(res => {
						this.pageTableData = res.data
						this.loading=false
					})
				} else {
					this.$axios.get(`/management/admin/homepage!getBeautyDetailsTop10.action`).then(res => {
						this.pageTableData = res.data
						this.loading=false
					})
				}
			}

		},
		mounted() {
			// 获取卡片数据
			this.$axios.get('/management/admin/homepage!getSequentialData.action').then(res => {
				// 格式化数据
				this.cardData.registeredData = res.data.registeredYesterday;
				if (res.data.registeredYesterday > 0) {
					this.cardData.registeredTrend = Math.round((res.data.registeredYesterday - res.data.registeredvVrgestern) / res.data
						.registeredYesterday * 100);
				} else {
					this.cardData.registeredTrend = -res.data.registeredvVrgestern * 100
				}
				this.cardData.readData = res.data.yesterdayRead;
				if (res.data.yesterdayRead > 0) {
					this.cardData.readTrend = Math.round((res.data.yesterdayRead - res.data.vorgesternRead) / res.data.yesterdayRead *
						100);
				} else {
					this.cardData.readTrend = -res.data.vorgesternRead * 100
				}
				this.cardData.commentData = res.data.yesterdayCommentNum;
				if (res.data.vorgesternCommentNum > 0) {
					this.cardData.commentDataTrend = Math.round((res.data.yesterdayCommentNum - res.data.vorgesternCommentNum) / res
						.data
						.yesterdayCommentNum * 100);
				} else {
					this.cardData.commentDataTrend = -res.data.vorgesternCommentNum * 100
				}
				this.cardData.registeredAll = res.data.registeredAllNum;
				this.cardData.readAll = res.data.allRead;
				this.cardData.commentAll = res.data.allCommentNum;
			})
			// 获取柱状图默认数据
			this.getLabelReadData('', '3', '')
			// 获取人员组成默认数据
			this.getUserOfData(3, '')
			// 获取其他用户信息
			this.$axios.get('/management/admin/homepage!userOfData1.action').then(res => {
				if (res.data) {
					// 格式化数据
					let data3 = [{
							value: res.data.age.age1,
							name: '18岁以下'
						},
						{
							value: res.data.age.age2,
							name: '18岁-22岁'
						},
						{
							value: res.data.age.age3,
							name: '23岁-26岁'
						},
						{
							value: res.data.age.age4,
							name: '27岁-30岁'
						}, {
							value: res.data.age.age5,
							name: '30岁-35岁'
						}, {
							value: res.data.age.age6,
							name: '36岁以上'
						},
					];
					let data4 = [{
							value: res.data.level.makeUpNoob,
							name: '新手'
						},
						{
							value: res.data.level.makeUpGeneral,
							name: '一般'
						},
						{
							value: res.data.level.makeUpGod,
							name: '大神'
						}
					];
					let data5 = [{
							value: res.data.skinTexture.skinTextureType1,
							name: '混合型'
						},
						{
							value: res.data.skinTexture.skinTextureType2,
							name: '干性'
						},
						{
							value: res.data.skinTexture.skinTextureType3,
							name: '油性'
						},
						{
							value: res.data.skinTexture.skinTextureType4,
							name: '中性'
						},
						{
							value: res.data.skinTexture.skinTextureType5,
							name: '敏感肌'
						}
					];
					let data6 = [{
							value: res.data.interestedStatisticsListZr[0].num,
							name: res.data.interestedStatisticsListZr[0].name
						},
						{
							value: res.data.interestedStatisticsListZr[1].num,
							name: res.data.interestedStatisticsListZr[1].name
						},
						{
							value: res.data.interestedStatisticsListZr[2].num,
							name: res.data.interestedStatisticsListZr[2].name
						},
						{
							value: res.data.interestedStatisticsListZr[3].num,
							name: res.data.interestedStatisticsListZr[3].name
						},
						{
							value: res.data.interestedStatisticsListZr[4].num,
							name: res.data.interestedStatisticsListZr[4].name
						}
					];
					let data7 = [{
							value: res.data.interestedStatisticsListGx[0].num,
							name: res.data.interestedStatisticsListGx[0].name
						},
						{
							value: res.data.interestedStatisticsListGx[1].num,
							name: res.data.interestedStatisticsListGx[1].name
						},
						{
							value: res.data.interestedStatisticsListGx[2].num,
							name: res.data.interestedStatisticsListGx[2].name
						},
						{
							value: res.data.interestedStatisticsListGx[3].num,
							name: res.data.interestedStatisticsListGx[3].name
						},
						{
							value: res.data.interestedStatisticsListGx[4].num,
							name: res.data.interestedStatisticsListGx[4].name
						},
					];
					this.initChart3(data3)
					this.initChart4(data4)
					this.initChart5(data5)
					this.initChart6(data6)
					this.initChart7(data7)
				}
			})
			// 获取专题top10信息
			this.$axios.get('/management/admin/homepage!getZtTop10.action').then(res => {
				this.objectTableData = res.data
			})
			// 获取文章阅读量
			this.getPageReadData(3);
		}
	}
</script>

<style lang="scss">
	// 图表区样式
	.dataSpace {
		padding: 20px 0;
		box-sizing: border-box;

		.topData {
			width: 100%;
			height: 140px;
			padding: 10px;
			box-sizing: border-box;

			.cardItem {
				transition: all .5s;
				display: flex;
				justify-content: space-between;
				cursor: pointer;
				border-radius: 5px;
				box-shadow: 0 0 20px rgba(0, 0, 0, 0.28);

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
						color: #666;
					}

					.text1 {
						font-size: 30px;
						margin: 20px auto;
						line-height: 30px;
					}

					.text2 {
						font-size: 16px;
						margin: 5px auto;
					}

					.text3 {
						font-size: 14px;
						margin: 0;
					}

					.text3.numberUp {
						color: red;
					}

					.text3.numberDown {
						color: green;
					}
				}
			}

			.cardItem:hover {
				box-shadow: 0 0 20px rgba(0, 0, 0, 0.68)
			}

			.cardItem:hover .cardLeft i {
				font-size: 70px;
			}

			.totalNumber {
				height: 130px;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;

				p {
					height: 65px;
					flex: 33%;
					text-align: center;
					font-size: 18px;
					padding: 10px 0;
					box-sizing: border-box;
					margin: 0;
					margin-top: 20px;
					line-height: 20px;

					span {
						display: block;
						font-size: 20px;
						color: #5983e8;
						line-height: 20px;
						margin-top: 20px
					}
				}
			}
		}
	}

	.chartData {
		position: relative;

		.cirqueBox {
			box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.28);
			border-radius: 5px;
			margin: 20px auto;
			transition: all .5s;
		}

		.cirqueBox:hover {
			box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.68);
		}

		.chartDataTitle {
			position: relative;

			p {
				margin: 50px 0 20px;
				font-size: 40px;
				padding-left: 30px;
				box-sizing: border-box;
				text-align: left;
				font-size: 26px;
			}
		}

		.title {
			width: 100%;
			font-size: 22px;
			margin: 15px auto;
			line-height: 30px;
			height: 30px;
		}

		.chart1 {
			width: 100%;
			height: 500px;
		}

		.chart2,
		.chart3,
		.chart4,
		.chart5,
		.chart6,
		.chart7 {
			width: 100%;
			height: 300px;
		}

		.typeSelect {
			position: absolute;
			z-index: 9;
			top: 35px;
			right: 65px;
		}

		.timeSelect {
			position: absolute;
			z-index: 9;
			top: 75px;
			right: 65px;
		}
	}

	.chartData.labelChart {
		.title {
			height: 90px;
			font-size: 26px;
			padding-left: 30px;
			box-sizing: border-box;
		}
	}

	.tableHead {
		text-align: center;
		font-size: 26px;
		margin: 50px 0 20px;
	}

	.pageBox {
		.tableHead {
			margin-top: 20px
		}
	}

	.tableBox {
		position: relative;

		.typeSelect {
			position: absolute;
			z-index: 9;
			top: 60px;
			right: 10%;
		}
	}
</style>
