<template>
	<div class="classifyContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAdd" label-width="100px" :model="formLabelAdd">
					<el-form-item label="分类名称" prop='name'>
						<el-input v-model="formLabelAdd.name"></el-input>
					</el-form-item>
					<el-form-item label="上级目录">
						<el-input v-model="formLabelAdd.lableName" readonly></el-input>
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
		<div class="tableBox">
			<TableTree ref="recTree" :list.sync="treeData" :headList.sync="headList" @actionFunc="actionFunc" @deleteFunc="deleteFunc"
			 @handlerExpand="handlerExpand" @clickRow='clickRow'></TableTree>
			<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign" label-width="100px" :model="formLabelAlign">
					<el-form-item label="分类名称" prop='name'>
						<el-input v-model="formLabelAlign.name"></el-input>
					</el-form-item>
					<el-form-item label="上级目录">
						<el-input v-model="formLabelAlign.lableName" readonly></el-input>
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
		</div>

	</div>
</template>

<script>
	import TableTree from '@/components/module/table-tree.vue'
	export default {
		data() {
			return {
				dialogVisible: false,
				AddVisible: false,
				labelPosition: "left",
				idx: -1,
				formLabelAlign: {
					id: '',
					categoryId: '',
					categoryName: '',
					name: '',
					sort: '',
				},
				formLabelAdd: {
					categoryId: '',
					categoryName: '',
					name: '',
					sort: '',
				},
				rules:{
					name:[{
						required: true,
						message: '请输入分类名称',
						trigger: 'blur'
					}],
					sort: [{
						required: true,
						message: '请输入排序号',
						trigger: 'blur'
					}]
				},
				treeData: [],
				headList: ['id', '美妆分类名称', '上级目录', '操作']
			}
		},
		components: {
			TableTree
		},
		methods: {
			clickRow(m) {
				this.formLabelAdd.lableId = m.id;
				this.formLabelAdd.lableName = m.name
			},
			deleteFunc(m) {
				console.log(m)
				this.$confirm("确认删除？")
					.then(_ => {
						// rows.splice(index, 1);
						// 调用删除接口
						this.$axios.get(`/management/admin/category!delete.action?id=${m.id}`).then(res => {
							this.initData();
						})
					})
					.catch(_ => {});
				// 提交删除请求
			},
			handlerExpand(m) {
				m.isExpand = !m.isExpand
			},
			// 编辑
			actionFunc(m) {
				// 调用编辑接口
				this.$axios.get(`/management/admin/category!input.action?id=${m.id}`).then(res => {
					this.formLabelAlign = {
						id: res.data.id,
						categoryId: res.data.categoryId,
						categoryName: res.data.categoryName,
						name: res.data.name,
						sort: res.data.sort,
						status: res.data.status
					};
				})
				this.dialogVisible = true;
			},
			//保存编辑
			saveEdit() {
				this.$refs['formLabelAlign'].validate((valid) => {
					if (valid) {
						this.$axios.post(`/management/admin/category!save.action?id=${this.formLabelAlign.id}`, this.$qs.stringify({
							categoryId: this.formLabelAlign.categoryId,
							categoryName: this.formLabelAlign.categoryName,
							name: this.formLabelAlign.name,
							sort: this.formLabelAlign.sort
						})).then(res => {
							this.initData();
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
						this.$axios.post('/management/admin/category!save.action', this.$qs.stringify({
							categoryId: this.formLabelAdd.categoryId,
							categoryName: this.formLabelAdd.categoryName,
							name: this.formLabelAdd.name,
							sort: this.formLabelAdd.sort
						})).then(res => {
							this.initData();
							this.formLabelAdd = {
								categoryId: '',
								categoryName: '',
								name: '',
								sort: '',
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
			initData() {
				// 获取表格数据
				this.$axios.get('/management/admin/category!getTreeGrid.action').then(res => {
					let tempList = res.data.map(item => {
						return {
							id: item.id,
							name: item.name,
							text: item.text,
							children: []
						}
					})
					this.treeData = tempList;
				})
			}
		},
		mounted() {
			this.initData();
		}

	}
</script>

<style scoped>
</style>
