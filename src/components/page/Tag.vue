<template>
	<div class="tagContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAdd"  label-width="100px" :model="formLabelAdd">
					<el-form-item label="标签名称" prop='name'>
						<el-input v-model="formLabelAdd.name"></el-input>
					</el-form-item>
					<el-form-item label="上级目录">
						<el-input v-model="formLabelAdd.lableName" readonly></el-input>
					</el-form-item>
					<el-form-item label="排序号" prop='sort'>
						<el-input v-model="formLabelAdd.sort"></el-input>
					</el-form-item>
					<el-form-item label="图片">
						<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
						 :before-upload='beforeUpload' :on-success="uploadSuccess" :on-remove="handleRemove"  list-type="picture">
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
		<div class="tableBox">
			<TableTree ref="recTree" :list.sync="treeData" :headList.sync="headList" @actionFunc="actionFunc" @deleteFunc="deleteFunc" @handlerExpand="handlerExpand"
			 @clickRow='clickRow'></TableTree>
			<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign"  label-width="100px" :model="formLabelAlign">
					<el-form-item label="标签名称" prop='name'>
						<el-input v-model="formLabelAlign.name"></el-input>
					</el-form-item>
					<el-form-item label="上级目录">
						<el-input v-model="formLabelAlign.lableName" readonly></el-input>
					</el-form-item>
					<el-form-item label="排序号" prop='sort'>
						<el-input v-model="formLabelAlign.sort"></el-input>
					</el-form-item>
					<el-form-item label="图片">
						<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
						 :before-upload='beforeUpload' :on-success="uploadSuccess" :on-remove="handleRemove"  :file-list="editFileList" list-type="picture">
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
				editFileList: [],
				formLabelAlign: {
					id: '',
					image: '',
					lableId: '',
					lableImage: '',
					lableName: '',
					name: '',
					sort: '',
					status: ''
				},
				formLabelAdd: {
					id: '',
					image: '',
					lableId: '',
					lableImage: '',
					lableName: '',
					name: '',
					sort: '',
					status: ''
				},
				rules:{
					name:[{
						required: true,
						message: '请输入标签名称',
						trigger: 'blur'
					}],
					sort: [{
						required: true,
						message: '请输入排序号',
						trigger: 'blur'
					}]
				},
				treeData: [],
				headList:['id','美妆类型名称','上级目录','操作'],
				imgData: {
					FileName: '',
					imgFile: null
				},
				tempImgUrl: ''
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
						this.$axios.get(`/management/admin/lable!delete.action?id=${m.id}`).then(res => {
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
				this.editFileList = [];
				// 调用编辑接口
				this.$axios.get(`/management/admin/lable!input.action?id=${m.id}`).then(res => {
					this.formLabelAlign = {
						id: res.data.id,
						image: res.data.image ? res.data.image.split('"')[1] : '',
						lableId: res.data.lableId,
						lableImage: res.data.lableImage,
						lableName: res.data.lableName,
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
				this.$refs['formLabelAlign'].validate((valid) => {
					if (valid) {
						this.$axios.post(`/management/admin/lable!save.action?id=${this.formLabelAlign.id}`, this.$qs.stringify({
							lableId: this.formLabelAlign.lableId,
							lableName: this.formLabelAlign.lableName,
							name: this.formLabelAlign.name,
							sort: this.formLabelAlign.sort,
							image: this.tempImgUrl ? `<img src="${this.tempImgUrl}" alt="" />` : this.formLabelAlign.image
						})).then(res => {
							this.initData();
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
						this.$axios.post('/management/admin/lable!save.action', this.$qs.stringify({
							lableId: this.formLabelAdd.lableId,
							lableName: this.formLabelAdd.lableName,
							name: this.formLabelAdd.name,
							sort: this.formLabelAdd.sort,
							image: this.tempImgUrl ? `<img src="${this.tempImgUrl}" alt="" />` : ''
						})).then(res => {
							this.initData();
							this.formLabelAdd = {
								id: '',
								image: '',
								lableId: '',
								lableImage: '',
								lableName: '',
								name: '',
								sort: '',
								status: ''
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
			initData() {
				// 获取表格数据
				this.$axios.get('/management/admin/lable!getTreeGrid.action').then(res => {
					let tempList = res.data.map(item => {
						return {
							id: item.id,
							name: item.name,
							text: item.text,
							children: []
						}
					})
					for (let i = 0; i < tempList.length; i++) {
						this.$axios.get(`/management/admin/lable!getTreeGrid.action?id=${tempList[i].id}`).then(res2 => {
							tempList[i].children = res2.data;
						})
					}
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
