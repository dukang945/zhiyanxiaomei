<template>
	<div class="memberContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAdd" label-width="100px" :model="formLabelAdd">
					<el-form-item label="手机号" prop='phone'>
						<el-input v-model="formLabelAdd.phone"></el-input>
					</el-form-item>
					<el-form-item label="昵称" prop='nickName'>
						<el-input v-model="formLabelAdd.nickName"></el-input>
					</el-form-item>
					<el-form-item label="头像">
						<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
						 :before-upload='beforeUpload' :on-success="uploadSuccess" :on-remove="handleRemove" list-type="picture">
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
			<el-table-column prop="id" label="ID编号" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="nickName" label="昵称" align='center'>
			</el-table-column>
			<el-table-column prop="phone" label="手机号" align='center'>
			</el-table-column>
			<el-table-column prop="sex" label="性别" align='center' :formatter='getSex'>
			</el-table-column>
			<el-table-column prop="level" label="化妆水平" align='center' :formatter='getLevel'>
			</el-table-column>
			<el-table-column prop="birthday" label="用户生日" align='center'>
			</el-table-column>
			<el-table-column prop="token" label="第三方TOKEN" align='center'>
			</el-table-column>
			<el-table-column prop="createTime" label="账号注册时间" align='center' width="200" :formatter='timestampToTime'>
			</el-table-column>
			<el-table-column prop="loginTime" label="最后登录时间" align='center' width="200" :formatter='timestampToTime'>
			</el-table-column>
			<el-table-column label="操作" width="200" align='center'>
				<template slot-scope="scope">
					<el-button type="primary" size='small' @click="handleEdit(scope.$index, scope.row)">重置密码</el-button>
				</template>
			</el-table-column>
		</el-table>
		<Pagination :totalNum='totalNum' @change_Page='changePage' @change_Size='changeSize'></Pagination>
	</div>
</template>

<script>
	import Pagination from '@/components/module/Pagination.vue'
	export default {
		data() {
			return {
				tableData: [],
				AddVisible: false,
				labelPosition: "left",
				idx: -1,
				formLabelAdd: {
					phone: '',
					nickName: '',
					headImage: ''
				},
				rules: {
					phone: [{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					}],
					nickName: [{
						required: true,
						message: '请输入昵称',
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
				this.$confirm("确认重置密码？")
					.then(_ => {
						this.$axios.post(`/management/admin/beauty-user!resetPassword.action?id=${row.id}`).then(res => {
							this.$message.success(`成功重置密码`);
						})
					})
					.catch(_ => {});
			},

			// 新增
			handleAdd() {
				this.$refs['formLabelAdd'].validate((valid) => {
					if (valid) {
						this.$axios.post('/management/admin/beauty-user!save.action', this.$qs.stringify({
							phone: this.formLabelAdd.phone,
							nickName: this.formLabelAdd.nickName,
							headImage: this.tempImgUrl ? `<img src="${this.tempImgUrl}" alt="" />` : ''
						})).then(res => {
							this.getData(this.page, this.row)
							this.formLabelAdd = {
								phone: '',
								nickName: '',
								headImage: ''
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
			// 操作上传图片(需要图片上传地址)
			beforeUpload(file) {
				this.imgData.FileName = file.name;
				this.imgData.imgFile = file
			},
			handleRemove(file, fileList) {
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
			// 格式化列表数据
			timestampToTime(row, column, dataNum) {
				var date = new Date(dataNum);
				var Y = date.getFullYear() + '-'
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
				var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
				var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
				return Y + M + D + h + m + s
			},
			getSex(row, column, sexNum) {
				return sexNum == 0 ? '女' : '男'
			},
			getLevel(row, column, levelNum) {
				if (levelNum == -1) {
					return ''
				}
				if (levelNum == 0) {
					return '初学乍练'
				}
				if (levelNum == 1) {
					return '略有小成'
				}
				if (levelNum == 2) {
					return '自成一派'
				}
			},
			// 请求数据
			getData(page, row) {
				var url = '/management/admin/beauty-user!list.action'
				this.$axios.get(url, {
					params: {
						page: page,
						rows: row
					}
				}).then(res => {
					console.log(res.data)
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
