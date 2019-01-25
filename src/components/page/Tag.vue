<template>
	<div class="tagContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAdd" label-width="100px" :model="formLabelAdd">
					<el-form-item label="标签名称" prop='name'>
						<el-input v-model="formLabelAdd.name"></el-input>
					</el-form-item>
					<el-form-item label="上级目录">
						<el-input v-model="formLabelAdd.lableName" readonly></el-input>
					</el-form-item>
					<el-form-item label="排序号">
						<el-input v-model="formLabelAdd.sort"></el-input>
					</el-form-item>
					<el-form-item label="类型">
						<el-select v-model="formLabelAdd.type" placeholder="请选择类型">
							<el-option label="教程类型" value="1"></el-option>
							<el-option label="测评类型" value="2"></el-option>
							<el-option label="化妆水平" value="3"></el-option>
							<el-option label="目的类型" value="4"></el-option>
							<el-option label="专题类型" value="5"></el-option>
							<el-option label="品牌+品类" value="6"></el-option>
							<el-option label="初学乍练" value="7"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="客户端显示">
						<el-select v-model="formLabelAdd.sta" placeholder="请选择是否显示">
							<el-option label="显示" :value="0-0"></el-option>
							<el-option label="不显示" :value="1-0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="当做标签显示">
						<el-select v-model="formLabelAdd.labelIsShow" placeholder="请选择是否显示">
							<el-option label="显示" :value="0-0"></el-option>
							<el-option label="不显示" :value="1-0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="图片">
						<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData' :before-upload='beforeUpload'
						 :on-success="uploadSuccess" :on-remove="handleRemove" list-type="picture">
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="AddVisible = false;formLabelAdd={}">取 消</el-button>
					<el-button type="primary" @click="handleAdd">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<div class="tableBox">
			<TableTree ref="recTree" :list.sync="treeData" :headList.sync="headList" @actionFunc="actionFunc" @deleteFunc="deleteFunc"
			 @handlerExpand="handlerExpand" @clickRow='clickRow'></TableTree>
			<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign" label-width="100px" :model="formLabelAlign">
					<el-form-item label="标签名称" prop='name'>
						<el-input v-model="formLabelAlign.name"></el-input>
					</el-form-item>
					<!-- <el-form-item label="上级目录">
						<el-input v-model="formLabelAlign.lableName" readonly></el-input>
					</el-form-item> -->
					<el-form-item label="排序号">
						<el-input v-model="formLabelAlign.sort"></el-input>
					</el-form-item>
					<el-form-item label="类型">
						<el-select v-model="formLabelAlign.type" placeholder="请选择类型">
							<el-option label="教程类型" value="1"></el-option>
							<el-option label="测评类型" value="2"></el-option>
							<el-option label="化妆水平" value="3"></el-option>
							<el-option label="目的类型" value="4"></el-option>
							<el-option label="专题类型" value="5"></el-option>
							<el-option label="品牌+品类" value="6"></el-option>
							<el-option label="初学乍练" value="7"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="客户端显示">
						<el-select v-model="formLabelAlign.sta" placeholder="请选择是否显示">
							<el-option label="显示" :value="0-0"></el-option>
							<el-option label="不显示" :value="1-0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="当做标签显示">
						<el-select v-model="formLabelAlign.labelIsShow" placeholder="请选择是否显示">
							<el-option label="显示" :value="0-0"></el-option>
							<el-option label="不显示" :value="1-0"></el-option>
						</el-select>
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
		</div>

	</div>
</template>

<script>
	import TableTree from '@/components/module/table-tree-label.vue'
	export default {
		data() {
			return {
				dialogVisible: false,
				AddVisible: false,
				labelPosition: "left",
				idx: -1,
				editFileList: [],
				formLabelAlign: {},
				formLabelAdd: {},
				rules: {
					name: [{
						required: true,
						message: '请输入标签名称',
						trigger: 'blur'
					}]
				},
				treeData: [],
				headList: ['id', '美妆类型名称', '类型', '客户端显示', '标签显示', '操作'],
				imgData: {
					FileName: '',
					imgFile: null
				},
				tempImgUrl: '',
				markIndex: []
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
						// 调用删除接口
						this.$axios.get(`/management/admin/label!delete.action?id=${m.id}`).then(res => {
							console.log(res)
							this.initData();
						})
					})
					.catch(_ => {});
				// 提交删除请求
			},
			handlerExpand(m) {
				m.isExpand = !m.isExpand;
			},
			// 编辑
			actionFunc(m) {
				this.editFileList = [];
				// 调用取值接口
				this.$axios.get(`/management/admin/label!input.action?id=${m.id}`).then(res => {
					console.log(res)
					this.formLabelAlign = {
						id: res.data.id,
						labelIsShow: res.data.labelIsShow,
						name: res.data.name,
						sort: res.data.sort,
						sta: res.data.sta,
						status: res.data.status,
						type: res.data.type,
					};
					let testExp = /http.*?(\.png|\.jpg)/gi;
					if (res.data.image) {
						this.editFileList = [{
							name: '标签图片',
							url: res.data.image.match(testExp)[0]
						}]
						this.tempImgUrl = res.data.image.match(testExp)[0]
					}
				})
				this.dialogVisible = true;
			},
			//保存编辑
			saveEdit() {
				this.$refs['formLabelAlign'].validate((valid) => {
					if (valid) {
						this.$axios.post(`/management/admin/label!save.action?id=${this.formLabelAlign.id}`, this.$qs.stringify({
							labelIsShow: this.formLabelAlign.labelIsShow,
							name: this.formLabelAlign.name,
							sort: this.formLabelAlign.sort,
							sta: this.formLabelAlign.sta,
							status: this.formLabelAlign.status,
							type: this.formLabelAlign.type,
							image: this.tempImgUrl ? `<img src="${this.tempImgUrl}" alt="" />` : this.formLabelAlign.image
						})).then(res => {
							this.initData();
							this.tempImgUrl = '';
							this.$message.success(`修改成功`);
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
						this.$axios.post('/management/admin/label!save.action', this.$qs.stringify({
							labelIsShow: this.formLabelAdd.labelIsShow,
							labelId: this.formLabelAdd.lableId,
							name: this.formLabelAdd.name,
							sort: this.formLabelAdd.sort,
							sta: this.formLabelAdd.sta,
							type: this.formLabelAdd.type,
							image: this.tempImgUrl ? `<img src="${this.tempImgUrl}" alt="" />` : ''
						})).then(res => {
							this.initData();
							this.formLabelAdd = {}
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
				this.tempImgUrl = res.url;
				// 清空上传图片参数
				this.imgData = {
					FileName: '',
					imgFile: null
				}
			},
			formatType(string) {
				if (string == 1) {
					return '教程类型'
				} else if (string == 2) {
					return '测评类型'
				} else if (string == 3) {
					return '化妆水平'
				} else if (string == 4) {
					return '目的类型'
				} else if (string == 5) {
					return '专题类型'
				} else if (string == 6) {
					return '品牌+品类'
				} else if (string == 7) {
					return '初学乍练'
				} else {
					return ''
				}
			},
			formatLabelShow(string) {
				if (string == 0) {
					return '显示'
				} else if (string == 1) {
					return '不显示'
				} else {
					return ''
				}
			},
			formatStaShow(string) {
				if (string == 0) {
					return '显示'
				} else if (string == 1) {
					return '不显示'
				} else {
					return ''
				}
			},
			initData() {
				// 初始化表格数据 
				this.$axios.get('/management/admin/label!getTreeGrid.action').then(res => {
					let tempList = res.data.map(item => {
						return {
							id: item.id,
							name: item.name,
							text: item.text,
							type: this.formatType(item.type),
							labelIsShow: this.formatLabelShow(item.labelIsShow),
							sta: this.formatStaShow(item.sta),
							state: item.state,
							children: []
						}
					})
					for (let i = 0; i < tempList.length; i++) {
						if (tempList[i].state == 'closed') {
							this.$axios.get(`/management/admin/label!getTreeGrid.action?id=${tempList[i].id}`).then(res2 => {
								if (res2.data) {
									var children2 = res2.data.map(item => {
										return {
											id: item.id,
											name: item.name,
											text: item.text,
											type: this.formatType(item.type),
											labelIsShow: this.formatLabelShow(item.labelIsShow),
											sta: this.formatStaShow(item.sta),
											state: item.state,
											children: []
										}
									})
									tempList[i].children = children2;
									for (let j = 0; j < children2.length; j++) {
										if (children2[j].state == 'closed') {
											this.$axios.get(`/management/admin/label!getTreeGrid.action?id=${children2[j].id}`).then(res3 => {
												if (res3.data) {
													var children3 = res3.data.map(item => {
														return {
															id: item.id,
															name: item.name,
															text: item.text,
															type: this.formatType(item.type),
															labelIsShow: this.formatLabelShow(item.labelIsShow),
															sta: this.formatStaShow(item.sta),
															state: item.state,
															children: []
														}
													})
													tempList[i].children[j].children = children3;
													for (let k = 0; k < children3.length; k++) {
														if (children3[k].state == 'closed') {
															this.$axios.get(`/management/admin/label!getTreeGrid.action?id=${children3[k].id}`).then(res4 => {
																if (res4.data) {
																	var children4 = res4.data.map(item => {
																		return {
																			id: item.id,
																			name: item.name,
																			text: item.text,
																			type: this.formatType(item.type),
																			labelIsShow: this.formatLabelShow(item.labelIsShow),
																			sta: this.formatStaShow(item.sta),
																			state: item.state,
																			children: []
																		}
																	})
																	tempList[i].children[j].children[k].children = children4;
																}
															})
														}
													}
												}
											})
										}
									}
								}
							})
						}
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
	.tableBox {
		background-color: #fff;
	}
</style>
