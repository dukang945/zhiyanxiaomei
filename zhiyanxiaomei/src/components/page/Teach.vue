<template>
	<div class="logContent">
		<el-row>
			<el-col :span="18">
				<div class="btnGroup">
					<el-button type="primary" size='small' @click="add">新增</el-button>
					<el-button type="primary" size='small' @click="batchOnline">批量上线</el-button>
					<el-button type="primary" size='small' @click="batchOffline">批量下线</el-button>
					<el-button type="primary" size='small' @click="batchDelete">批量删除</el-button>
				</div>
			</el-col>
			<el-col :span="6">
				<el-form :inline="true" :model="searchForm" class="right-search">
					<el-form-item>
						<el-input v-model="searchForm.text" placeholder="请输入搜索内容"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size='small' @click="onSubmitSearch" icon="el-icon-search">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='2' class='treeBox'>
				<span class="treeTitle">教程栏目列表</span>
				<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
				</el-tree>
			</el-col>
			<el-col :span='22'>
				<el-table :data="tableData" border style="width: 98%" class='table'>
					<el-table-column type="selection" width="55" align='center'></el-table-column>
					<el-table-column type="index" label="序号" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="id" label="id" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="name" label="标题" width="200" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="lableName" label="标签" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="level" label="化妆水平" width="150" align='center'>
					</el-table-column>
					<el-table-column label="H5地址" width="100" align='center'>
						<template slot-scope="scope">
							<el-button size="small" type="primary" @click="copyH5Url(scope.$index, scope.row)">复制</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="collectNumber" label="点赞次数" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="clickNumber" label="点击次数" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="creatUser" label="创建人" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" width="150" align='center'>
					</el-table-column>
					<el-table-column prop="online" label="审核状态" width="100" align='center'>
					</el-table-column>
					<el-table-column label="操作" fixed="right" align='center' width='750'>
						<template slot-scope="scope">
							<el-button size="small" type="primary" @click="edit(scope.$index, scope.row)" icon='el-icon-edit'>编辑</el-button>
							<el-dialog title="编辑" :visible.sync="editDialogVisible" width="80%">
								<el-form :label-position="labelPosition" label-width="80px" :model="editFormData">
									<el-form-item label="用户ID">
										<el-input v-model="editFormData.id"></el-input>
									</el-form-item>
								</el-form>
							</el-dialog>
							<el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" size='small' type="danger" class="el-icon-delete">删除</el-button>
							<el-button size="small" type="primary" @click="setOnline(scope.$index, scope.row)">上线</el-button>
							<el-button size="small" type="primary" @click="creatH5(scope.$index, scope.row)" icon='el-icon-edit-outline'>生成H5</el-button>
							<el-button size="small" type="primary" @click="updataSort(scope.$index, scope.row)" icon='el-icon-sort'>更新排序</el-button>
							<el-button size="small" type="primary" @click="push(scope.$index, scope.row)">推送</el-button>
							<el-button size="small" type="primary" @click="addComment(scope.$index, scope.row)">添加评论</el-button>
							<el-button size="small" type="primary" @click="checkComment(scope.$index, scope.row)">查看评论</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Pagination :totalNum='totalNum' @change_Page='changePage' @change_Size='changeSize'></Pagination>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import Pagination from '../module/pagination.vue'
	export default {
		data() {
			return {
				searchForm: {
					text: ''
				},
				editFormData: {

				},
				labelPosition: 'left',
				editDialogVisible: false,
				totalNum: 10,
				tableData: [],
				page: 1,
				row: 10,
				// 左侧树形控件
				treeData: [],
				defaultProps: {
					children: 'children',
					label: 'lable'
				}
			}
		},
		components: {
			Pagination
		},
		methods: {
			add() {

			},
			batchOnline() {

			},
			batchOffline() {

			},
			batchDelete() {

			},
			onSubmitSearch() {
				console.log('提交搜索项目');
			},
			copyH5Url() {

			},
			// 树形控件操作
			handleNodeClick(a, b, c) {
				console.log(a)
				console.log(b)
				console.log(c)
			},

			// 表格操作
			edit(index, row) {

			},
			deleteRow(index, row) {
				this.$confirm("确认删除？")
					.then(_ => {
						this.tableData.splice(index, 1);
					})
					.catch(_ => {});
				// 提交删除请求
			},
			setOnline(index, row) {

			},
			creatH5(index, row) {

			},
			updataSort(index, row) {

			},
			push(index, row) {

			},
			addComment(index, row) {

			},
			checkComment(index, row) {

			},
			// 分页
			changePage(val) {
				this.page = val;
				this.getData(val, this.row)
			},
			changeSize(val) {
				this.row = val;
				this.getData(this.page, val)
			},
			// 数据请求
			getData(url, page, row, id, search) {
				this.$axios.get(url, {
					params: {
						page: page,
						rows: row,
						lableId: id ? id : '',
						q: search ? search : ''
					}
				}).then(res => {
					this.totalNum = res.data.total;
					this.tableData = res.data.rows;
				})
			}
		},
		mounted() {
			this.getData('api/management/admin/beauty-details!list.action', 1, 10, 2);
			// 获取树形控件数据
			this.$axios.get('api/management/admin/lable!lableTree.action').then(res => {
				let tempList = res.data.map(item => {
					return {
						id: item.id,
						lable: item.text,
						children:[]
					}
				})
				for(let i=0;i<tempList.length;i++){
					this.$axios.get(`api/management/admin/lable!lableTree.action?id=${tempList[i].id}`).then(res2=>{
						console.log(res2)
						let temp=res2.data.map(item=>{
							return {
								lable:item.text,
								id:item.id
							}
						})
						tempList[i].children=temp
					})
				}
				this.treeData = tempList;
			})
		}
	}
</script>

<style scoped>
	.right-search {
		text-align: right;
	}

	.pagination {
		margin: 20px 0;
	}

	.treeBox {
		padding: 0 10px;
		box-sizing: border-box;
	}

	.treeTitle {
		display: block;
		width: 100%;
		height: 40px;
		font-size: 18px;
		color: #409EFF;
		font-weight: 700;
	}

	.el-table {
		font-size: 12px;
	}
</style>
