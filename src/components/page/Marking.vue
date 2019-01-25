<template>
	<div class="markingContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAdd" label-width="100px" :model="formLabelAdd">
					<el-form-item label="最低分" prop='min'>
						<el-input v-model="formLabelAdd.min"></el-input>
					</el-form-item>
					<el-form-item label="最高分" prop='max'>
						<el-input v-model="formLabelAdd.max"></el-input>
					</el-form-item>
					<el-form-item label="标识" prop='type'>
						<el-select v-model="formLabelAdd.type" placeholder="请选择标识">
							<el-option label="打分详情" value="0"></el-option>
							<el-option label="打分标题" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="内容">
						<el-input type="textarea" autosize v-model="formLabelAdd.gradeJson"></el-input>
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
			<el-table-column prop="min" label="最低分" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="max" label="最高分" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="gradeJson" label="内容" :show-overflow-tooltip="true" align='center'>
			</el-table-column>
			<el-table-column prop="type" label="类型" width="200" align='center' :formatter='getType'>
			</el-table-column>
			<el-table-column label="操作" width="100" align='center'>
				<template slot-scope="scope">
					<el-button type="primary" size='small' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign" label-width="100px" :model="formLabelAlign">
				<el-form-item label="最低分" prop='min'>
					<el-input v-model="formLabelAlign.min"></el-input>
				</el-form-item>
				<el-form-item label="最高分" prop='max'>
					<el-input v-model="formLabelAlign.max"></el-input>
				</el-form-item>
				<el-form-item label="标识" prop='type'>
					<el-select v-model="formLabelAlign.type" placeholder="请选择标识">
						<el-option label="打分详情" value="0"></el-option>
						<el-option label="打分标题" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="内容">
					<el-input type="textarea" autosize v-model="formLabelAlign.gradeJson"></el-input>
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
					gradeJson: '',
					id: '',
					max: '',
					min: '',
					type: ''
				},
				formLabelAdd: {
					gradeJson: '',
					id: '',
					max: '',
					min: '',
					type: ''
				},
				rules: {
					min: [{
						required: true,
						message: '请输入最小值',
						trigger: 'blur'
					}],
					max: [{
						required: true,
						message: '请输入最大值',
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
					id:item.id,
					gradeJson: item.gradeJson,
					max: item.max,
					min: item.min,
					type: item.type == 0 ? '打分详情' : '打分标题'
				};
				this.dialogVisible = true;
			},
			//保存编辑
			saveEdit() {
				this.$refs['formLabelAlign'].validate((valid) => {
					if (valid) {
						if(this.formLabelAlign.type=='打分详情'){
							this.formLabelAlign.type=0
						}else if(this.formLabelAlign.type=='打分标题'){
							this.formLabelAlign.type=1
						}
						this.$axios.post(`/management/admin/makeup-grading!save.action?id=${this.formLabelAlign.id}`, this.$qs.stringify({
							min: this.formLabelAlign.min,
							max: this.formLabelAlign.max,
							type: this.formLabelAlign.type,
							gradeJson: this.formLabelAlign.gradeJson
						})).then(res => {
							this.getData(this.page, this.row)
							this.tempImgUrl = '';
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
			// 新增
			handleAdd() {
				this.$refs['formLabelAdd'].validate((valid) => {
					if (valid) {
						this.$axios.post('/management/admin/makeup-grading!save.action', this.$qs.stringify({
							min: this.formLabelAdd.min,
							max: this.formLabelAdd.max,
							type: this.formLabelAdd.type,
							gradeJson: this.formLabelAdd.gradeJson
						})).then(res => {
							this.getData(this.page, this.row)
							this.formLabelAdd = {
								gradeJson: '',
								id: '',
								max: '',
								min: '',
								type: ''
							}
							this.tempImgUrl = '';
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
				return typeNum == 0 ? '打分详情' : '打分标题'
			},
			// 请求数据
			getData(page, row) {
				var url = '/management/admin/makeup-grading!list.action'
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
