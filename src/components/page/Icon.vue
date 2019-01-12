<template>
	<div class="iconContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAdd" label-width="100px" :model="formLabelAdd">
					<el-form-item label="名称" prop='name'>
						<el-input v-model="formLabelAdd.name"></el-input>
					</el-form-item>
					<el-form-item label="对应type值" prop='type'>
						<el-input v-model="formLabelAdd.type"></el-input>
					</el-form-item>
					<el-form-item label="排序号" prop='sort'>
						<el-input v-model="formLabelAdd.sort"></el-input>
					</el-form-item>
					<el-form-item label="图片">
						<el-upload class="upload-demo" action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
						 :before-upload='beforeUpload' :on-success="uploadSuccess" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="AddVisible = false">取 消</el-button>
					<el-button type="primary" @click="handleAdd">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column type="index" label="序号" width="50">
			</el-table-column>
			<el-table-column prop="id" label="ID" width="180">
			</el-table-column>
			<el-table-column prop="name" label="名称">
			</el-table-column>
			<el-table-column prop="type" label="对应type值">
			</el-table-column>
			<el-table-column prop="sort" label="排序号">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size='small' type="danger" class="el-icon-delete">删除</el-button>
					<el-button type="primary" size='small' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign" label-width="100px" :model="formLabelAlign">
				<el-form-item label="名称" prop='name'>
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="对应type值" prop='type'>
					<el-input v-model="formLabelAlign.type"></el-input>
				</el-form-item>
				<el-form-item label="排序号" prop='sort'>
					<el-input v-model="formLabelAlign.sort"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData' :before-upload='beforeUpload'
					 :on-success="uploadSuccess" :on-remove="handleRemove" :file-list="editFileList" list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
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
				fileList:[],
				editFileList: [],
				formLabelAlign: {
					id: '',
					name: '',
					sort: '',
					status: '',
					type: '',
					image: ''
				},
				formLabelAdd: {
					name: '',
					sort: '',
					status: '',
					type: '',
					image: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入icon名称',
						trigger: 'blur'
					}],
					sort: [{
						required: true,
						message: '请输入排序号',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请输入对应type值',
						trigger: 'blur'
					}]
				},
				page: 1,
				row: 10,
				totalNum: 1,
				imgData: {
					FileName: '',
					imgFile: null
				},
				tempImgUrl: ''
			}
		},
		components: {
			Pagination
		},
		methods: {
			// 编辑
			handleEdit(index, row) {
				this.editFileList = [];
				this.idx = index;
				const item = this.tableData[index];
				this.formLabelAlign = {
					id: item.id,
					name: item.name,
					sort: item.sort,
					status: item.status,
					type: item.type,
					image: item.image
				};
				if (item.image) {
					this.editFileList = [{
						name: '',
						url: item.image.split('"')[1]
					}]
				}

				this.dialogVisible = true;
			},
			//保存编辑
			saveEdit() {
				this.$refs['formLabelAlign'].validate((valid) => {
					if (valid) {
						this.$axios.post(`/management/admin/icon!save.action?id=${this.formLabelAlign.id}`, this.$qs.stringify({
							name: this.formLabelAlign.name,
							sort: this.formLabelAlign.sort,
							status: this.formLabelAlign.status,
							type: this.formLabelAlign.type,
							image: this.tempImgUrl ? `<img src="${this.tempImgUrl}" alt="" />` : this.formLabelAlign.image
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
			//删除
			deleteRow(index, rows) {
				this.$confirm("确认删除？")
					.then(_ => {
						this.$axios.post(`/management/admin/icon!delete.action?id=${rows[index].id}`).then(res => {
							this.getData(this.page, this.row)
							this.$message.success(`删除成功`);
						}).catch(e => {
							this.$message.error(`出了点问题-.-!`);
						})
					})
					.catch(_ => {

					});
			},
			// 新增
			handleAdd() {
				this.$refs['formLabelAdd'].validate((valid) => {
					if (valid) {
						this.$axios.post('/management/admin/icon!save.action', this.$qs.stringify({
							name: this.formLabelAdd.name,
							sort: this.formLabelAdd.sort,
							status: this.formLabelAdd.status,
							type: this.formLabelAdd.type,
							image: this.tempImgUrl ? `<img src="${this.tempImgUrl}" alt="" />` : ''
						})).then(res => {
							this.getData(this.page, this.row)
							this.formLabelAdd = {
								name: '',
								sort: '',
								status: '',
								type: '',
								image: ''
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
					this.fileList=[];
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
			// 操作上传图片(需要图片上传地址)
			beforeUpload(file) {
				console.log(file)
				this.imgData.FileName = file.name;
				this.imgData.imgFile = file
			},
			handleRemove(file, fileList) {
				this.formLabelAlign.image = '';
				this.tempImgUrl = '';
			},
			uploadSuccess(res, file, fileList) {
				console.log(res)
				this.tempImgUrl = res.url;
				// 清空上传图片参数
				this.imgData = {
					FileName: '',
					imgFile: null
				}
			},
			// 请求数据
			getData(page, row) {
				var url = '/management/admin/icon!list.action'
				this.$axios.get(url, {
					params: {
						page: page,
						rows: row
					}
				}).then(res => {
					this.totalNum = res.data.total
					let tempTableData = res.data.rows.map(item => {
						return {
							id: item.id,
							name: item.name,
							sort: item.sort,
							status: item.status,
							type: item.type,
							image: item.image
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
	.iconContent {
		/* padding: 10px 20px 10px 0;
		box-sizing: border-box; */
	}

	.handle-box {
		margin-bottom: 20px
	}
</style>
<style>
	.el-upload-list__item {
		transition: none;
	}
</style>
