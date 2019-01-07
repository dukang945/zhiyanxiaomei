<template>
	<div class="tree-table">
		<div class="tree-head">
			<table>
				<tr>
					<td class="td1">id</td>
					<td class="td2">美妆类型名称</td>
					<td class="td3">上级目录</td>
					<td class="td4">操作</td>
				</tr>
			</table>
		</div>
		<div id="scrollWrap" class="tree-wrap">
			<div class="tree-body">
				<table v-if='treeDataSource.length>0'>
					<tbody>
						<tr>
							<td>
								<tree-item v-for="(model,i) in treeDataSource" :key="'root_node_'+i" :root="0" :num="i" @actionFunc="actionFunc"
								 @deleteFunc="deleteFunc" @handlerExpand="handlerExpand" @clickRow='clickRow' :nodes="treeDataSource.length" :trees.sync="treeDataSource"
								 :model.sync="model">
								</tree-item>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'treeTable',
		props: ['list'],
		data() {
			return {
				isDesc: false,
				treeDataSource: []
			}
		},

		watch: {
			'list': {
				handler() {
					console.log('ddddd')
					this.initTreeData()
				},
				deep: true
			},
			isDesc(nelVal, oldVal) {
				this.$emit('orderByFunc', nelVal)
			}
		},
		computed: {},
		methods: {
			initTreeData() {
				// console.log('处理前的:', JSON.parse(JSON.stringify(this.list)))
				// 这里一定要转化，要不然他们的值监听不到变化
				let tempData = JSON.parse(JSON.stringify(this.list))
				let reduceDataFunc = (data, level) => {
					data.map((m, i) => {
						m.isExpand = false
						m.children = m.children || []
						m.level = level
						m.bLeft = level === 1 ? 34 : (level - 2) * 16 + 34
						m.Experience = m.Experience || '无'
						if (m.children.length > 0) {
							reduceDataFunc(m.children, level + 1)
						}
					})
				}
				reduceDataFunc(tempData, 1)
				// console.log('处理后的:', tempData)
				this.treeDataSource = tempData
			},
			getMore() {
				alert('滚动到底部加载更多')
				// 滚动到最后
				$('#scrollWrap').mCustomScrollbar('scrollTo', 'top', {
					scrollInertia: 0
				})
			},
			// 编辑
			actionFunc(m) {
				this.$emit('actionFunc', m)
			},
			// 删除
			deleteFunc(m) {
				this.$emit('deleteFunc', m)
			},
			// 展开
			handlerExpand(m) {
				this.$emit('handlerExpand', m)
			},
			clickRow(m) {
				this.$emit('clickRow', m)
			}
		},
		components: {
			treeItem: () => import('./tree-item.vue')
		},
		mounted() {
			const vm = this
			vm.$nextTick(() => {
				vm.initTreeData()
			})
		}
	}
</script>

<style>
	.tree-table {
  width: 100%;
  position: relative;
}
.tree-table .center {
  text-align: center;
}
.tree-table table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  border-spacing: 0;
}
.tree-table table td {
  word-break: break-all;
  word-wrap: break-word;
  font-size: 14px;
}
.tree-table .td-border {
  border-bottom: 1px solid #E8E8E8;
}
.tree-table .td-border .leve {
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.tree-table .td-border .leve:hover {
  background-color: #f7f9ff;
}
.tree-table th,
.tree-table td {
  font-weight: 400;
  text-align: left;
}
.tree-table .td1 {
  width: 100px;
  padding-left: 30px;
}
.tree-table .td2 {
  width: 100px;
}
.tree-table .td3 {
  width: 120px;
}
.tree-table .td4 {
  width: 220px;
}
.tree-table .p20 {
  padding-left: 20px;
}
.tree-table .leve-1 .td1 {
  padding-left: 30px;
}
.tree-table .leve-2 .td1 {
  padding-left: 46px;
}
.tree-table .leve-3 .td1 {
  padding-left: 62px;
}
.tree-table .leve-4 .td1 {
  padding-left: 78px;
}
.tree-table .leve-5 .td1 {
  padding-left: 90px;
}
.tree-table .leve-6 .td1 {
  padding-left: 106px;
}
.tree-table .leve-7 .td1 {
  padding-left: 122px;
}
.tree-table .leve-8 .td1 {
  padding-left: 138px;
}
.tree-table .leve-9 .td1 {
  padding-left: 154px;
}
.tree-table .td4 .unvisibie {
  visibility: hidden;
}
.tree-table .td4 .ellipsis {
  display: block;
  max-width: 200px;
}
.tree-table .td4 .iconfont {
  color: #414959;
  position: relative;
  top: 0px;
  left: 5px;
  font-size: 14px;
}
.tree-table > div {
  position: absolute;
  width: 100%;
}
.tree-table .line-height {
  height: 40px;
  line-height: 40px;
}
.tree-table .tree-head {
  height: 40px;
  line-height: 40px;
}
.tree-table .tree-head td {
  color: rgba(0, 0, 0, 0.45);
	font-weight: 700;
  border-bottom: 2px solid #E8E8E8;
}
.tree-table .tree-head .arrow {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #fff;
}
.tree-table .tree-head .arrow span {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  left: 0;
  border-style: solid;
  border-width: 4px;
}
.tree-table .tree-head .arrow .up-arrow {
  top: 3px;
  border-color: transparent transparent #ddd transparent;
}
.tree-table .tree-head .arrow .up-arrow.sort {
  border-bottom-color: #3C4454;
}
.tree-table .tree-head .arrow .down-arrow {
  top: 12px;
  border-color: #ddd transparent transparent transparent;
}
.tree-table .tree-head .arrow .down-arrow.sort {
  border-top-color: #3C4454;
}
.tree-table .ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tree-table .tree-wrap {
  top: 40px;
}
.tree-table .tree-body table {
  table-layout: fixed;
}
.tree-table .tree-body td {
  height: 40px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
}
.tree-table .tree-body td .reset {
  color: #1890FF;
}
.tree-table .tree-body td .delete {
  color: #F5222D;
}
.tree-table .tree-body td .line {
  display: inline-block;
  width: 1px;
  background: rgba(0, 0, 0, 0.09);
  margin: 0 11px;
  height: 14px;
}
.tree-table .tree-body .td-title {
  position: relative;
}
.tree-table .tree-body .td-title a {
  display: block;
}
.tree-table .tree-body .td-title .tree-close,
.tree-table .tree-body .td-title .tree-open {
  position: absolute;
  width: 0;
  height: 0;
  border-color: #999;
  border-style: solid;
  cursor: pointer;
  border-width: 5px;
  z-index: 2;
}
.tree-table .tree-body .td-title .tree-close {
  left: -12px;
  top: 14px;
  border-color: transparent transparent transparent #AAAAAA;
}
.tree-table .tree-body .td-title .tree-open {
  left: -17px;
  top: 17px;
  border-color: #AAAAAA transparent transparent;
}
.tree-table .tree-body .leve-1 .td-title a {
  width: 230px;
}
.tree-table .tree-body .leve-2 .td-title a {
  width: 200px;
}
.tree-table .tree-body .leve-3 .td-title a {
  width: 170px;
}
.tree-table .tree-body .leve-4 .td-title a {
  width: 140px;
}
.tree-table .tree-body .leve-5 .td-title a {
  width: 110px;
}
.tree-table .tree-body .leve-6 .td-title a {
  width: 80px;
}
.tree-table .tree-body .leve-7 .td-title a {
  width: 50px;
}
.tree-table .tree-body .leve-8 .td-title a {
  width: 20px;
}
.tree-table .tree-body .other-node {
  position: relative;
}
.tree-table .tree-body .other-node > .not-border:not(:last-child) {
  position: relative;
}

.tree-table .tree-body .other-node > .not-border .before-line {
  content: '';
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: #E8E8E8;
  border: none;
  top: -20px;
  z-index: 1;
  left: 34px;
}
.tree-table .tree-body .not-border .td-title::before {
  content: '';
  position: absolute;
  width: 1px;
  height: 40px;
  background-color: #E8E8E8;
  border: none;
  left: -12px;
  top: -20px;
  z-index: 1;
}
.tree-table .tree-body .not-border .td-title::after {
  content: '';
  left: -11px;
  position: absolute;
  right: auto;
  background-color: #E8E8E8;
  height: 1px;
  top: 19px;
  width: 16px;
  z-index: 1;
}
.tree-table .t-icon {
  display: inline-block;
  width: 14px;
  height: 18px;
  background-size: 100% 100% !important;
  vertical-align: middle;
  margin: -3px 4px 0 0;
}
.tree-table .icon{
	font-size: 16px;
}

</style>
