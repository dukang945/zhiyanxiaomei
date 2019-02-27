<template>
	<div class="dataSpace">
		<el-row class='topData' :gutter="30" style='margin: 0;'>
			<el-col :span='5'>
				<div class="cardItem" style="background: linear-gradient(to right, rgba(255, 255, 255,1), rgba(50, 208, 136,0.2))">
					<div class="cardLeft" style="color: #32D088;">
						<i class="el-icon-my-xinzengrenyuan_huaban"></i>
					</div>
					<div class="cardRight">
						<p class="text1">125</p>
						<p class="text2">昨日注册量</p>
						<p class="text3 numberDown">环比 -25% <i class="el-icon-caret-bottom"></i></p>
						<!-- <p class="text3 numberUp">环比+20% <i class="el-icon-caret-top"></i></p> -->
					</div>
				</div>
			</el-col>
			<el-col :span='5'>
				<div class="cardItem" style="background: linear-gradient(to right, rgba(255, 255, 255,1), rgba(50, 206, 228,0.2))">
					<div class="cardLeft" style="color: #32CEE4;">
						<i class="el-icon-my-renyuan"></i>
					</div>
					<div class="cardRight">
						<p class="text1">2352</p>
						<p class="text2">昨日访客量</p>
						<!-- <p class="text3 numberDown">环比 -25% <i class="el-icon-caret-bottom"></i></p> -->
						<p class="text3 numberUp">环比 +20% <i class="el-icon-caret-top"></i></p>
					</div>
				</div>
			</el-col>
			<el-col :span='5'>
				<div class="cardItem" style="background: linear-gradient(to right, rgba(255, 255, 255,1), rgba(251, 110, 81,0.2))">
					<div class="cardLeft" style="color: #FB6E51;">
						<i class="el-icon-my-liulanliang"></i>
					</div>
					<div class="cardRight">
						<p class="text1">15204</p>
						<p class="text2">昨日阅读量</p>
						<p class="text3 numberDown">环比 -5% <i class="el-icon-caret-bottom"></i></p>
						<!-- <p class="text3 numberUp">环比+20% <i class="el-icon-caret-top"></i></p> -->
					</div>
				</div>
			</el-col>
			<el-col :span='5'>
				<div class="cardItem" style="background: linear-gradient(to right, rgba(255, 255, 255,1), rgba(245, 178, 82,0.2))">
					<div class="cardLeft" style="color: #F5B252;">
						<i class="el-icon-my-pinglun"></i>
					</div>
					<div class="cardRight">
						<p class="text1">452</p>
						<p class="text2">昨日评论量</p>
						<!-- <p class="text3 numberDown">环比 -25% <i class="el-icon-caret-bottom"></i></p> -->
						<p class="text3 numberUp">环比 +13% <i class="el-icon-caret-top"></i></p>
					</div>
				</div>
			</el-col>
			<el-col :span='4'>
				<div class="cardItem totalNumber" style="background: linear-gradient(to right, rgba(50, 208, 136,0.2),rgba(50, 206, 228,0.2),rgba(251, 110, 81,0.2), rgba(245, 178, 82,0.2))">
					<p>总注册量 <span>103587</span></p>
					<p>总访客量 <span>83587</span></p>
					<p>总阅读量 <span>2303587</span></p>
					<p>总评论量 <span>233587</span></p>
				</div>
			</el-col>
		</el-row>
		<el-row class='chartData' style='margin: 30px 0'>
			<el-col :span='24' class='chartDataTitle'>
				<p>用户组成数据分析</p>
				<div class="timeSelect">
					选择周期：
					<el-date-picker
					  v-model="userDataTime"
					  type="date"
					  size='mini'
					  placeholder="选择某一天">
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
		<el-row class='chartData' type="flex"  :gutter='30' justify="space-around" style='margin: 30px 0'>
			<el-col :span='7' class='cirqueBox'>
				<div class="title">肤质</div>
				<div ref="skinEchart" class="chart5"></div>
			</el-col>
			<el-col :span='7' class='cirqueBox'>
				<div class="title">感兴趣妆容TOP5</div>
				<div ref="likeEchart" class="chart6"></div>
			</el-col>
			<el-col :span='7' class='cirqueBox'>
				<div class="title">感兴趣功效</div>
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
					<el-date-picker
					  v-model="LabelDataTime"
					  type="date"
					  size='mini'
					  placeholder="选择某一天">
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
					<el-table-column prop="name" label="标题" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="type" label="所属类目" width="200" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="label" label="一级标签" width='100' align='center'>
					</el-table-column>
					<el-table-column prop="visited" label="阅读量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="commit" label="评论量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="like" label="点赞量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="name" label="收藏量" width="100" align='center'>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span='24' class='tableBox'>
				<p class="tableHead">文章阅读量TOP10</p>
				<div class="typeSelect">
					切换类型：
					<el-button type="primary" size='mini' plain @click='checkTeachPage'>美妆教程</el-button>
					<el-button type="primary" size='mini' plain @click='checkEvaluationPage'>美妆测评</el-button>
					<el-button type="primary" size='mini' plain @click='checkNewPage'>初学乍练</el-button>
					<el-button type="primary" size='mini' plain @click='checkAllTypePage'>全部类型</el-button>
				</div>
				<el-table :data="pageTableData" border style="width: 80%;margin: 0 auto;">
					<el-table-column type="index" label="排名" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="name" label="标题" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="type" label="所属类目" width="200" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="label" label="一级标签" width='100' align='center'>
					</el-table-column>
					<el-table-column prop="visited" label="阅读量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="commit" label="评论量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="like" label="点赞量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="name" label="收藏量" width="100" align='center'>
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
				labelTime: '所有时间',
				objectTableData:[],
				pageTableData:[],
				userDataTime:'',
				LabelDataTime:''
			}
		},
		methods: {
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
			// 切换标签统计类型及时间段
			checkTeach() {
				// 实例数据
				let data = [
					['product', '阅读次数', '收藏量', '点赞量', '评论数', '分享次数'],
					['日常妆', 234, 125, 82, 94, 33],
					['欧美妆', 145, 84, 92, 94, 33],
					['宴会妆', 112, 42, 82, 94, 33],
					['影视妆', 92, 76, 72, 34, 23],
					['cos妆', 82, 62, 62, 34, 23],
					['清新妆', 73, 57, 52, 34, 23],
					['日系妆', 62, 32, 32, 24, 23],
					['复古妆', 51, 24, 22, 24, 13],
					['明星妆', 43, 12, 12, 14, 13],
					['韩系妆', 28, 11, 12, 14, 13]
				];
				this.initChart1(data)
				this.labelType = '美妆教程'
			},
			checkEvaluation() {
				// 实例数据
				let data = [
					['product', '阅读次数', '收藏量', '点赞量', '评论数', '分享次数'],
					['好物安利', 234, 125, 82, 94, 33],
					['雷品吐槽', 145, 84, 92, 94, 33],
					['成分党', 112, 42, 82, 94, 33],
					['眼妆心机', 92, 76, 72, 34, 23],
					['唇唇欲动', 82, 62, 62, 34, 23],
					['底妆盘点', 73, 57, 52, 34, 23],
					['护肤品', 62, 32, 32, 24, 23]
				];
				this.initChart1(data)
				this.labelType = '美妆测评'
			},
			checkNew() {
				let data = [
					['product', '阅读次数', '收藏量', '点赞量', '评论数', '分享次数'],
					['妆品选择', 234, 125, 82, 94, 33],
					['化妆步骤', 145, 84, 92, 94, 33],
					['美妆工具', 112, 42, 82, 94, 33],
					['新手教学', 92, 76, 72, 34, 23]
				];
				this.initChart1(data)
				this.labelType = '初学乍练'
			},
			checkAllType() {
				let data = [
					['product', '阅读次数', '收藏量', '点赞量', '评论数', '分享次数'],
					['好物安利', 200, 157, 123, 140, 134],
					['日系妆', 178, 145, 125, 114, 103],
					['宴会妆', 152, 122, 112, 94, 53],
					['影视妆', 132, 126, 102, 84, 35],
					['妆品选择', 92, 57, 52, 64, 37],
					['清新妆', 83, 74, 52, 54, 53],
					['欧美妆', 62, 32, 42, 34, 34],
					['化妆步骤', 51, 44, 32, 14, 23],
					['明星妆', 43, 29, 32, 14, 23],
					['新手教学', 28, 13, 12, 14, 13]
				];
				this.initChart1(data)
				this.labelType = '全部类型'
			},
			checkYesterday() {
				// 实例数据
				let data = [
					['product', '阅读次数', '收藏量', '点赞量', '评论数', '分享次数'],
					['日常妆', 234, 125, 82, 94, 33],
					['欧美妆', 145, 84, 92, 94, 33],
					['宴会妆', 112, 42, 82, 94, 33],
					['影视妆', 92, 76, 72, 34, 23],
					['cos妆', 82, 62, 62, 34, 23],
					['清新妆', 73, 57, 52, 34, 23],
					['日系妆', 62, 32, 32, 24, 23],
					['复古妆', 51, 24, 22, 24, 13],
					['明星妆', 43, 12, 12, 14, 13],
					['韩系妆', 28, 11, 12, 14, 13]
				];
				this.initChart1(data)
				this.labelTime = '前一天'
			},
			checkLastWeek() {
				// 实例数据
				let data = [
					['product', '阅读次数', '收藏量', '点赞量', '评论数', '分享次数'],
					['好物安利', 200, 157, 123, 140, 134],
					['日系妆', 178, 145, 125, 114, 103],
					['宴会妆', 152, 122, 112, 94, 53],
					['影视妆', 132, 126, 102, 84, 35],
					['妆品选择', 92, 57, 52, 64, 37],
					['清新妆', 83, 74, 52, 54, 53],
					['欧美妆', 62, 32, 42, 34, 34],
					['化妆步骤', 51, 44, 32, 14, 23],
					['明星妆', 43, 29, 32, 14, 23],
					['新手教学', 28, 13, 12, 14, 13]
				];
				this.initChart1(data)
				this.labelTime = '近七天'
			},
			checkLastMonth() {
				// 实例数据
				let data = [
					['product', '阅读次数', '收藏量', '点赞量', '评论数', '分享次数'],
					['日常妆', 234, 125, 82, 94, 33],
					['欧美妆', 145, 84, 92, 94, 33],
					['宴会妆', 112, 42, 82, 94, 33],
					['影视妆', 92, 76, 72, 34, 23],
					['cos妆', 82, 62, 62, 34, 23],
					['清新妆', 73, 57, 52, 34, 23],
					['日系妆', 62, 32, 32, 24, 23],
					['复古妆', 51, 24, 22, 24, 13],
					['明星妆', 43, 12, 12, 14, 13],
					['韩系妆', 28, 11, 12, 14, 13]
				];
				this.initChart1(data)
				this.labelTime = '近一个月'
			},
			checkAllTime() {
				// 实例数据
				let data = [
					['product', '阅读次数', '收藏量', '点赞量', '评论数', '分享次数'],
					['好物安利', 200, 157, 123, 140, 134],
					['日系妆', 178, 145, 125, 114, 103],
					['宴会妆', 152, 122, 112, 94, 53],
					['影视妆', 132, 126, 102, 84, 35],
					['妆品选择', 92, 57, 52, 64, 37],
					['清新妆', 83, 74, 52, 54, 53],
					['欧美妆', 62, 32, 42, 34, 34],
					['化妆步骤', 51, 44, 32, 14, 23],
					['明星妆', 43, 29, 32, 14, 23],
					['新手教学', 28, 13, 12, 14, 13]
				];
				this.initChart1(data)
				this.labelTime = '所有时间'
			},
			// 切换用户数据
			checkUserYesterday(){
				
			},
			checkUserLastWeek(){
				
			},
			checkUserLastMonth(){
				
			},
			checkUserAllTime(){
				
			},
			// 切换文章类型
			checkTeachPage(){
				
			},
			checkEvaluationPage(){
				
			},
			checkNewPage(){
				
			},
			checkAllTypePage(){
				
			}
		},
		mounted() {
			// 获取数据
			let data1 = [
				['product', '阅读次数', '收藏量', '点赞量', '评论数', '分享次数'],
				['好物安利', 200, 157, 123, 140, 134],
				['日系妆', 178, 145, 125, 114, 103],
				['宴会妆', 152, 122, 112, 94, 53],
				['影视妆', 132, 126, 102, 84, 35],
				['妆品选择', 92, 57, 52, 64, 37],
				['清新妆', 83, 74, 52, 54, 53],
				['欧美妆', 62, 32, 42, 34, 34],
				['化妆步骤', 51, 44, 32, 14, 23],
				['明星妆', 43, 29, 32, 14, 23],
				['新手教学', 28, 13, 12, 14, 13]
			];
			let data2 = [{
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
				}
			];
			let data3 = [{
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
				}, {
					value: 130,
					name: '30岁-35岁'
				}, {
					value: 6,
					name: '36岁以上'
				},
			];
			let data4 = [{
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
			];
			let data5 = [{
					value: 1335,
					name: '混合型'
				},
				{
					value: 2658,
					name: '干性'
				},
				{
					value: 3734,
					name: '油性'
				},
				{
					value: 734,
					name: '中性'
				},
				{
					value: 572,
					name: '敏感肌'
				}
			];
			let data6 = [{
					value: 2345,
					name: '清新妆'
				},
				{
					value: 2178,
					name: '森女妆'
				},
				{
					value: 1980,
					name: '约会妆'
				},
				{
					value: 1567,
					name: '韩系妆'
				},
				{
					value: 1460,
					name: '日系妆'
				},
				{
					value: 3578,
					name: '其他'
				}
			];
			let data7 = [{
					value: 17,
					name: '美白'
				},
				{
					value: 15,
					name: '保湿'
				},
				{
					value: 13,
					name: '毛孔粗大'
				},
				{
					value: 12,
					name: '黑眼圈'
				},
				{
					value: 23,
					name: '控油'
				},
				{
					value: 31,
					name: '祛痘'
				},
				{
					value: 25,
					name: '黑头'
				},
				{
					value: 13,
					name: '祛斑'
				},
				{
					value: 45,
					name: '防晒'
				},
				{
					value: 23,
					name: '抗衰老'
				}
			];
			let data8 = [
				['product', '阅读次数', '收藏量', '点赞量', '评论数', '分享次数'],
				['十小时都不脱妆？！兰蔻这个粉底液真的美skr人', 89, 5, 2, 14, 3],
				['请把我和Canmake的腮红锁死！怎么可以这么好看呜呜', 78, 4, 2, 14, 3],
				['你离完美底妆，就差这一步神器了！', 67, 2, 2, 14, 3],
				['报告！雅诗兰黛新沁水粉底液来抢钱了！', 56, 6, 2, 14, 3],
				['选对一款底妆一年不用愁——娇兰金钻粉底液', 45, 2, 2, 14, 3],
				['润唇膏合集 |6款好用的唇膏，让你的嘴巴和起皮say goodbye！', 34, 7, 2, 14, 3],
				['黄皮救星 | 杨幂带火的雅诗兰黛唇釉307', 23, 2, 2, 14, 3],
				['YSL “小金条”美到让人哭泣，这几个色号敲推荐你买！', 20, 4, 2, 14, 3],
				['吃土也要剁手！2018最畅销口红榜单', 17, 2, 2, 14, 3],
				['国货初体验——玛丽黛佳黑流苏睫毛膏', 15, 1, 2, 14, 3]
			];
			this.initChart1(data1)
			this.initChart2(data2)
			this.initChart3(data3)
			this.initChart4(data4)
			this.initChart5(data5)
			this.initChart6(data6)
			this.initChart7(data7)
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
					flex: 50%;
					text-align: center;
					font-size: 14px;
					padding: 10px 0;
					box-sizing: border-box;
					margin: 0;

					span {
						display: block;
						font-size: 20px;
						color: #5983e8;
					}
				}
			}
		}
	}

	.chartData {
		position: relative;
		.cirqueBox{
			box-shadow: 0 0 20px 0 rgba(0,0,0,0.28);
			border-radius: 5px;
			margin: 20px auto;
			transition: all .5s;
		}
		.cirqueBox:hover{
			box-shadow: 0 0 20px 0 rgba(0,0,0,0.68);
		}
		.chartDataTitle{
			position: relative;
			p{
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
	.chartData.labelChart{
		.title{
			height: 90px;
			font-size: 26px;
			padding-left: 30px;
			box-sizing: border-box;
		}
	}
	.tableHead{
		text-align: center;
		font-size: 26px;
		margin: 50px 0 20px;
	}
	.pageBox{
		.tableHead{
			margin-top: 20px
		}
	}
	.tableBox{
		position: relative;
		.typeSelect {
			position: absolute;
			z-index: 9;
			top: 60px;
			right: 10%;
		}
	}
</style>
