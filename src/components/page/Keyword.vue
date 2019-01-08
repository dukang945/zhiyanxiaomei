<template>
	<div class="keywordContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
					<el-form-item label="名称">
						<el-input v-model="formLabelAdd.keyName"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="AddVisible = false">取 消</el-button>
					<el-button type="primary" @click="handleAdd">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column type="index" label="序号" width="50" align='center'>
			</el-table-column>
			<el-table-column prop="id" label="id" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="keyName" label="关键字">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size='small' type="danger" class="el-icon-delete">删除</el-button>
					<el-button type="primary" size='small' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
						<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
							<el-form-item label="名称">
								<el-input v-model="formLabelAlign.keyName"></el-input>
							</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="saveEdit">确 定</el-button>
						</span>
					</el-dialog>
				</template>
			</el-table-column>
		</el-table>
		<Pagination :totalNum='totalNum' @change_Page='changePage' @change_Size='changeSize'></Pagination>
	</div>
</template>

<script>
	import Pagination from '../module/pagination.vue'
	export default {
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				AddVisible: false,
				labelPosition: "left",
				idx: -1,
				fileList: [],
				editFileList: [],
				formLabelAlign: {
					id: '',
					keyName: ''
				},
				formLabelAdd: {
					id: '',
					keyName: ''
				},
				page: 1,
				row: 10,
				totalNum: 1
			}
		},
		components: {
			Pagination
		},
		methods: {
			// 编辑
			handleEdit(index, row) {
				this.idx = index;
				const item = this.tableData[index];
				this.formLabelAlign = {
					id: item.id,
					keyName: item.name
				};
				this.dialogVisible = true;
			},
			//保存编辑
			saveEdit() {
				this.$set(this.tableData, this.idx, this.formLabelAlign);
				this.dialogVisible = false;
				// 提交编辑请求

				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
			},
			//删除
			deleteRow(index, rows) {
				this.$confirm("确认删除？")
					.then(_ => {
						this.$axios.get(`/management/admin/key-word!delete.action?id=${rows[index].id}`)
					}).then(res=>{
						console.log(res);
						this.tableData.splice(index,1);
						this.getData(this.page,this.row);
						this.$message.success(`删除成功`);
					})
					.catch(_ => {});
				// 提交删除请求
			},
			// 新增
			handleAdd() {
				this.AddVisible = false;
				// 提交新增请求
				this.$axios.post('/management/admin/key-word!save.action',this.$qs.stringify({
					keyName:this.formLabelAdd.keyName
				})).then(res=>{
					this.getData(this.page,this.row);
					this.formLabelAdd={
						id: '',
						keyName: ''
					}
					this.$message.success(`添加成功`);
				})
			},
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
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
			// 请求数据
			getData(page, row) {
				var url = '/management/admin/key-word!list.action'
				this.$axios.get(url, {
					params: {
						page: page,
						rows: row
					}
				}).then(res => {
					this.totalNum = res.data.total
					console.log(this.totalNum)
					let tempTableData = res.data.rows.map(item => {
						return {
							id: item.id,
							keyName: item.keyName
						}
					})
					this.tableData = tempTableData
				})
			}
		},
		mounted() {
			this.getData(1, 10)
		}

	}
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px
	}
</style>
