<template>
	<div class="searchContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAdd" label-width="100px" :model="formLabelAdd">
					<el-form-item label="热搜词" prop='keyword'>
						<el-input v-model="formLabelAdd.keyword"></el-input>
					</el-form-item>
					<el-form-item label="类型" prop='type'>
						<el-select v-model="formLabelAdd.type" placeholder="请选择类型">
							<el-option label="全部" :value="0+0"></el-option>
							<el-option label="教程" :value="1+0"></el-option>
							<el-option label="评测" :value="2+0"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="AddVisible = false">取 消</el-button>
					<el-button type="primary" @click="handleAdd">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="id" label="编号" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="keyword" label="热搜关键字" align='center'>
			</el-table-column>
			<el-table-column prop="type" label="类型" width="100" align='center' :formatter='getType'>
			</el-table-column>
			<el-table-column label="操作" width="300" align='center'>
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size='small' type="danger" class="el-icon-delete">删除</el-button>
					<el-button type="primary" size='small' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign" label-width="100px" :model="formLabelAlign">
				<el-form-item label="热搜词" prop='keyword'>
					<el-input v-model="formLabelAlign.keyword"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop='type'>
					<el-select v-model="formLabelAlign.type" placeholder="请选择类型">
						<el-option label="全部" :value="0+0"></el-option>
						<el-option label="教程" :value="1+0"></el-option>
						<el-option label="评测" :value="2+0"></el-option>
					</el-select>
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
	import Pagination from '@/components/module/Pagination.vue'
	export default {
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				AddVisible: false,
				labelPosition: "left",
				idx: -1,
				formLabelAlign: {
					keyword: '',
					type: ''
				},
				formLabelAdd: {
					keyword: '',
					type: ''
				},
				rules: {
					keyword: [{
						required: true,
						message: '请输入热搜名称',
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
			getType(row, column,typeNumber){
				if(typeNumber==0){
					return '全部'
				}else if(typeNumber==1){
					return '教程'
				}else if(typeNumber==2){
					return '评测'
				}else if(typeNumber==3){
					return '知识'
				}else if(typeNumber==4){
					return '初学乍练'
				}
			},
			// 编辑
			handleEdit(index, row) {
				this.idx = index;
				const item = this.tableData[index];
				this.formLabelAlign = {
					id: item.id,
					keyword: item.keyword,
					type: item.type
				};
				this.dialogVisible = true;
			},
			//保存编辑
			saveEdit() {
				this.$refs['formLabelAlign'].validate((valid) => {
					if (valid) {
						this.$axios.post(`/management/admin/hot-search!save.action?id=${this.formLabelAlign.id}`, this.$qs.stringify({
							keyword: this.formLabelAlign.keyword,
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
						this.$axios.get(`/management/admin/hot-search!delete.action?id=${rows[index].id}`).then(res => {
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
						this.$axios.post('/management/admin/hot-search!save.action', this.$qs.stringify({
							keyword: this.formLabelAdd.keyword,
							type: this.formLabelAdd.type
						})).then(res => {
							this.getData(this.page, this.row)
							this.formLabelAdd = {
								keyword: '',
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
				var url = '/management/admin/hot-search!list.action'
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
</style>
<style>
	.el-table tr.online {
		background-color: #f0f9eb;
	}
</style>
