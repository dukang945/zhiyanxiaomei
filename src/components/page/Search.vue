<template>
	<div class="searchContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAdd" label-width="100px" :model="formLabelAdd">
					<el-form-item label="热搜名称" prop='name'>
						<el-input v-model="formLabelAdd.name"></el-input>
					</el-form-item>
					<el-form-item label="类型" prop='type'>
						<el-select v-model="formLabelAdd.type" placeholder="请选择类型">
							<el-option label="全部" value="0"></el-option>
							<el-option label="教程" value="1"></el-option>
							<el-option label="评测" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="排序号" prop='sort'>
						<el-input v-model="formLabelAdd.sort"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="AddVisible = false">取 消</el-button>
					<el-button type="primary" @click="handleAdd">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<el-table :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">>
			<el-table-column prop="id" label="编号" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="name" label="热搜名称" align='center'>
			</el-table-column>
			<el-table-column prop="sort" label="排序号" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="type" label="类型" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="online" label="审核状态" width="100" align='center' :formatter='getType'>
			</el-table-column>
			<el-table-column label="操作" width="300" align='center'>
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size='small' type="danger" class="el-icon-delete">删除</el-button>
					<el-button type="primary" size='small' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button @click.native.prevent="switchOnine(scope.$index)" size='small' type="primary" class="el-icon-sort">{{tableData[scope.$index].online==0?'下线':'上线'}}</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign" label-width="100px" :model="formLabelAlign">
				<el-form-item label="热搜名称" prop='name'>
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop='type'>
					<el-select v-model="formLabelAlign.type" placeholder="请选择类型">
						<el-option label="全部" value="0"></el-option>
						<el-option label="教程" value="1"></el-option>
						<el-option label="评测" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序号" prop='sort'>
					<el-input v-model="formLabelAlign.sort"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>
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
				formLabelAlign: {
					name: '',
					sort: '',
					type: ''
				},
				formLabelAdd: {
					name: '',
					sort: '',
					type: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入热搜名称',
						trigger: 'blur'
					}],
					sort: [{
						required: true,
						message: '请输入排序号',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}]
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
			tableRowClassName({
				row,
				index
			}) {
				if (row.online === 0) {
					return 'online';
				} else if (row.online === 1) {
					return '';
				}
			},
			// 编辑
			handleEdit(index, row) {
				this.idx = index;
				const item = this.tableData[index];
				if (item.type == 0) {
					item.type = '全部'
				} else if (item.type == 1) {
					item.type = '教程'
				} else if (item.type == 2) {
					item.type = '评测'
				}
				this.formLabelAlign = {
					id: item.id,
					sort: item.sort,
					name: item.name,
					type: item.type
				};
				this.dialogVisible = true;
			},
			// 切换online状态
			switchOnine(index) {
				let status = this.tableData[index].online == 0 ? 1 : 0;
				this.$axios.post(`/management/admin/hot-bot!online.action?id=${this.tableData[index].id}&online=${status}`).then(
					res => {
						this.$message.success('切换状态成功')
						console.log('切换状态成功')
						this.getData(this.page, this.row)
					})
			},
			getType(row, column, typeNum) {
				return typeNum == 0 ? '上线' : '下线'
			},
			//保存编辑
			saveEdit() {
				this.$refs['formLabelAlign'].validate((valid) => {
					if (valid) {
						if (this.formLabelAlign.type == '全部') {
							this.formLabelAlign.type = 0
						} else if (this.formLabelAlign.type == '教程') {
							this.formLabelAlign.type = 1
						} else if (this.formLabelAlign.type == '评测') {
							this.formLabelAlign.type = 2
						}
						this.$axios.post(`/management/admin/hot-bot!save.action?id=${this.formLabelAlign.id}`, this.$qs.stringify({
							name: this.formLabelAlign.name,
							sort: this.formLabelAlign.sort,
							type: this.formLabelAlign.type
						})).then(res => {
							this.getData(this.page, this.row)
							this.$message.success(`修改第 ${this.idx + 1} 行成功`);
						}).catch(e => {
							this.$message.error(`出了点问题-.-!`);
						})
						this.dialogVisible = false;
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			//删除
			deleteRow(index, rows) {
				this.$confirm("确认删除？")
					.then(_ => {
						this.$axios.get(`/management/admin/hot-bot!delete.action?id=${rows[index].id}`).then(res => {
							this.$message.success(`删除成功`);
							this.getData(this.page, this.row)
						}).catch(e => {
							this.$message.error('出了点问题-.-!')
						})
					})
					.catch(_ => {});
				// 提交删除请求
			},
			// 新增
			handleAdd() {
				this.$refs['formLabelAdd'].validate((valid) => {
					if (valid) {
						this.$axios.post('/management/admin/hot-bot!save.action', this.$qs.stringify({
							name: this.formLabelAdd.name,
							sort: this.formLabelAdd.sort,
							type: this.formLabelAdd.type
						})).then(res => {
							this.getData(this.page, this.row)
							this.formLabelAdd = {
								name: '',
								sort: '',
								type: ''
							}
							this.$message.success(`添加成功`);
						}).catch(e => {
							this.$message.error(`出了点问题-.-!`);
						})
						this.AddVisible = false;
					} else {
						console.log('error submit!!');
						return false;
					}
				});
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
				var url = '/management/admin/hot-bot!list.action'
				this.$axios.get(url, {
					params: {
						page: page,
						rows: row
					}
				}).then(res => {
					this.totalNum = res.data.total
					this.tableData = res.data.rows
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
<style>
	.el-table tr.online {
		background-color: #f0f9eb;
	}
</style>
