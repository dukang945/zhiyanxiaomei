<template>
	<div class="markingDetailContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAdd" label-width="120px" :model="formLabelAdd">
					<el-form-item label="化妆建议内容" prop='text'>
						<el-input type="textarea" autosize v-model="formLabelAdd.text"></el-input>
					</el-form-item>
					<el-form-item label="文案类型" prop='type'>
						<el-select v-model="formLabelAdd.type" placeholder="请选择类型">
							<el-option label="第一次颜值与第二次颜值比较文案" value="1"></el-option>
							<el-option label="打败了多少人的文案" value="2"></el-option>
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
			<el-table-column prop="id" label="id" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="text" label="文本" align='center'>
			</el-table-column>
			<el-table-column prop="type" label="文案类型" align='center' :formatter='getType'>
			</el-table-column>
			<el-table-column label="操作" width="200" align='center'>
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size='small' type="danger" class="el-icon-delete">删除</el-button>
					<el-button type="primary" size='small' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign" label-width="120px" :model="formLabelAlign">
				<el-form-item label="化妆建议内容" prop='text'>
					<el-input type="textarea" autosize v-model="formLabelAlign.text"></el-input>
				</el-form-item>
				<el-form-item label="文案类型" prop='type'>
					<el-select v-model="formLabelAlign.type" placeholder="请选择类型">
						<el-option label="第一次颜值与第二次颜值比较文案" value="1"></el-option>
						<el-option label="打败了多少人的文案" value="2"></el-option>
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
					id: '',
					type: '',
					text: ''
				},
				formLabelAdd: {
					id: '',
					type: '',
					text: ''
				},
				rules: {
					text: [{
						required: true,
						message: '请输入文本内容',
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
			// 编辑
			handleEdit(index, row) {
				this.idx = index;
				const item = this.tableData[index];
				console.log(item)
				this.formLabelAlign = {
					id: item.id,
					type: item.type == 1 ? '第一次颜值与第二次颜值比较文案' : '第一次颜值与第二次颜值比较文案',
					text: item.text
				};
				this.dialogVisible = true;
			},
			//保存编辑
			saveEdit() {
				this.$refs['formLabelAlign'].validate((valid) => {
					if (valid) {
						if (this.formLabelAlign.type == '第一次颜值与第二次颜值比较文案') {
							this.formLabelAlign.type = 1
						} else if (this.formLabelAlign.type == '第一次颜值与第二次颜值比较文案') {
							this.formLabelAlign.type = 2
						}
						this.$axios.post(`/management/admin/makeup-look!save.action?id=${this.formLabelAlign.id}`, this.$qs.stringify({
							text: this.formLabelAlign.text,
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
						// rows.splice(index, 1);
						console.log(rows)
						this.$axios.post(`/management/admin/makeup-look!delete.action?id=${rows[index].id}`).then(res => {
							this.getData(this.page, this.row);
							this.$message.success('删除成功');
						})
					})
					.catch(_ => {});
				// 提交删除请求
			},
			// 新增
			handleAdd() {
				this.$refs['formLabelAdd'].validate((valid) => {
					if (valid) {
						this.$axios.post('/management/admin/makeup-look!save.action', this.$qs.stringify({
							text: this.formLabelAdd.text,
							type: this.formLabelAdd.type
						})).then(res => {
							this.getData(this.page, this.row)
							this.formLabelAdd = {
								id: '',
								type: '',
								text: ''
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
			getType(index, row, typeNum) {
				return typeNum == 1 ? '第一次颜值与第二次颜值比较文案' : '打败了多少人的文案'
			},
			// 请求数据
			getData(page, row) {
				var url = '/management/admin/makeup-look!list.action'
				this.$axios.get(url, {
					params: {
						page: page,
						rows: row
					}
				}).then(res => {
					this.totalNum = res.data.total
					console.log(this.totalNum)
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
