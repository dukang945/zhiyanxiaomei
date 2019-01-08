<template>
	<div class="classifyContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAdd">
					<el-form-item label="分类名称">
						<el-input v-model="formLabelAdd.name"></el-input>
					</el-form-item>
					<el-form-item label="上级目录">
						<el-input v-model="formLabelAdd.lableName" readonly></el-input>
					</el-form-item>
					<el-form-item label="排序号">
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
				<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
					<el-form-item label="分类名称">
						<el-input v-model="formLabelAlign.name"></el-input>
					</el-form-item>
					<el-form-item label="上级目录">
						<el-input v-model="formLabelAlign.lableName" readonly></el-input>
					</el-form-item>
					<el-form-item label="排序号">
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
	import TableTree from '../module/table-tree.vue'
	export default {
		data() {
			return {
				dialogVisible: false,
				AddVisible: false,
				labelPosition: "left",
				idx: -1,
				fileList: [],
				editFileList: [],
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
				treeData: [],
				headList: ['id', '美妆分类名称', '上级目录', '操作'],
				categoryId: '',
				categoryName: '',
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
							console.log(res)
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
				console.log(m)
				// 调用编辑接口
				this.$axios.get(`//management/admin/category!input.action?id=${m.id}`).then(res => {
					console.log(res)
					this.formLabelAlign = {
						id: res.data.id,
						categoryId: res.data.categoryId,
						categoryName: res.data.categoryName,
						name: res.data.name,
						sort: res.data.sort,
						status: res.data.status
					};
					if (res.data.image) {
						this.editFileList = [{
							name: '',
							url: res.data.image.split('"')[1]
						}]
					}
				})
				this.dialogVisible = true;
			},
			//保存编辑
			saveEdit() {
				this.dialogVisible = false;
				// 提交编辑请求
				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
				// 重新初始化数据
				this.initData()
			},
			// 新增
			handleAdd() {
				this.AddVisible = false;
				this.$axios.post('/management/admin/category!save.action', this.$qs.stringify({
					categoryId: this.categoryId,
					categoryName: this.categoryName,
					name: this.formLabelAdd.name,
					sort: this.formLabelAdd.sort
				})).then(res => {
					this.initData();
					this.$message.success(`添加成功`);
					this.formLabelAdd = {
						categoryId: '',
						categoryName: '',
						name: '',
						sort: '',
					}

				})
			},
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			// 操作上传图片(需要图片上传地址)
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
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
	.handle-box {
		margin-bottom: 20px
	}
</style>
