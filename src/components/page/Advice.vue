<template>
	<div class="adviceContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAdd" label-width="120px" :model="formLabelAdd">
					<el-form-item label="化妆建议内容" prop='text'>
						<el-input type="textarea" autosize v-model="formLabelAdd.text"></el-input>
					</el-form-item>
					<el-form-item label="湿度">
						<el-select v-model="formLabelAdd.humidity" placeholder="请选择湿度">
							<el-option label="低" value="0"></el-option>
							<el-option label="高" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="温度">
						<el-select v-model="formLabelAdd.temperature" placeholder="请选择温度">
							<el-option label="低" value="0"></el-option>
							<el-option label="中" value="1"></el-option>
							<el-option label="高" value="2"></el-option>
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
			<el-table-column prop="text" label="化妆建议内容" align='center'>
			</el-table-column>
			<el-table-column label="操作" width="100" align='center'>
				<template slot-scope="scope">
					<el-button type="primary" size='small' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign" label-width="120px" :model="formLabelAlign">
				<el-form-item label="化妆建议内容" prop='text'>
					<el-input type="textarea" autosize v-model="formLabelAlign.text"></el-input>
				</el-form-item>
				<el-form-item label="湿度">
					<el-select v-model="formLabelAlign.humidity" placeholder="请选择湿度">
						<el-option label="低" value="0"></el-option>
						<el-option label="高" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="温度">
					<el-select v-model="formLabelAlign.temperature" placeholder="请选择温度">
						<el-option label="低" value="0"></el-option>
						<el-option label="中" value="1"></el-option>
						<el-option label="高" value="2"></el-option>
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
					humidity: '',
					id: '',
					temperature: '',
					text: ''
				},
				formLabelAdd: {
					humidity: '',
					id: '',
					temperature: '',
					text: ''
				},
				rules: {
					text: [{
						required: true,
						message: '请输入建议内容',
						trigger: 'blur'
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
				if(item.temperature==0){
					item.temperature='低'
				}else if(item.temperature==1){
					item.temperature='中'
				}else if(item.temperature==2){
					item.temperature='高'
				}
				this.formLabelAlign = {
					humidity: item.humidity==0?'低':'高',
					id: item.id,
					temperature: item.temperature,
					text: item.text
				};
				this.dialogVisible = true;
			},
			//保存编辑
			saveEdit() {
				// this.$set(this.tableData, this.idx, this.formLabelAlign);
				this.$refs['formLabelAlign'].validate((valid) => {
					if (valid) {
						if(this.formLabelAlign.humidity=='低'){
							this.formLabelAlign.humidity=0
						}else if(this.formLabelAlign.humidity=='高'){
							this.formLabelAlign.humidity=1
						}
						if(this.formLabelAlign.temperature=='低'){
							this.formLabelAlign.temperature=0
						}else if(this.formLabelAlign.temperature=='中'){
							this.formLabelAlign.temperature=1
						}else if(this.formLabelAlign.temperature=='高'){
							this.formLabelAlign.temperature=2
						}
						this.$axios.post(`/management/admin/skincare!save.action?id=${this.formLabelAlign.id}`, this.$qs.stringify({
							text: this.formLabelAlign.text,
							humidity: this.formLabelAlign.humidity,
							temperature:this.formLabelAlign.temperature
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
						this.$axios.post(`/management/admin/skincare!delete.action?id=${rows[index].id}`).then(res => {
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
						this.$axios.post('/management/admin/skincare!save.action', this.$qs.stringify({
							text: this.formLabelAdd.text,
							humidity: this.formLabelAdd.humidity,
							temperature:this.formLabelAdd.temperature
						})).then(res => {
							this.getData(this.page, this.row)
							this.formLabelAdd = {
								humidity: '',
								id: '',
								temperature: '',
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
			// 请求数据
			getData(page, row) {
				var url = '/management/admin/skincare!list.action'
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
							humidity: item.humidity,
							id: item.id,
							temperature: item.temperature,
							text: item.text
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
