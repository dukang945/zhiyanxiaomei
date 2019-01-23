<template>
	<div class="moduleContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" label-width="100px" :rules="rules" ref="formLabelAdd" :model="formLabelAdd">
					<el-form-item label="名称" prop='name'>
						<el-input v-model="formLabelAdd.name"></el-input>
					</el-form-item>
					<el-form-item v-for='(item,index) in picArr' :label='item.label' :key='item.picName'>
						<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData' :before-upload='beforeUpload'
						 :on-success="uploadSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" list-type="picture">
							<el-button size="small" type="primary" @click='upLoadImg(item.picName)'>点击上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancelAdd">取 消</el-button>
					<el-button type="primary" @click="handleAdd">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="id" label="编号" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="name" label="模块图名称" align='center'>
			</el-table-column>
			<el-table-column prop="time" label="时间" align='center' :formatter='timestampToTime'>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size='small' type="danger" class="el-icon-delete">删除</el-button>
					<el-button type="primary" size='small' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
						<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
							<el-form-item label="名称" prop='name'>
								<el-input v-model="formLabelAlign.name"></el-input>
							</el-form-item>
							<el-form-item v-for='(item,index) in picArr' :label='item.label' :key='item.picName'>
								<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
								 :before-upload='beforeUpload' :on-preview="handlePictureCardPreview" :on-success="uploadSuccess" :on-remove="handleRemove"
								 :file-list="editFileList[item.picName]" list-type="picture">
									<el-button size="small" type="primary" @click='upLoadImg(item.picName)'>点击上传</el-button>
									<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
								</el-upload>
							</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button @click="cancelEdit">取 消</el-button>
							<el-button type="primary" @click="saveEdit">确 定</el-button>
						</span>
					</el-dialog>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :visible.sync="imgDialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
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
				editFileList: [],
				formLabelAlign: {
					id: '',
					name: ''
				},
				formLabelAdd: {
					name: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入模块名称',
						trigger: 'blur'
					}]
				},
				picArr: [{
						label: '右眉',
						picName: 'eyebrow'
					},
					{
						label: '右眼影',
						picName: 'rightEye'
					},
					{
						label: '右眼线',
						picName: 'theRightEye'
					},
					{
						label: '右上睫毛',
						picName: 'rightUpEyelash'
					},
					{
						label: '右下睫毛',
						picName: 'rightDownEyelash'
					},
					{
						label: '右美瞳',
						picName: 'lenses'
					},
					{
						label: '额头点缀',
						picName: 'foreheadOrnament'
					},
					{
						label: '点缀',
						picName: 'ornament'
					},
					{
						label: '腮红',
						picName: 'blushes'
					},
					{
						label: '鼻梁高光',
						picName: 'highlights'
					},
					{
						label: '脸部高光',
						picName: 'faceHighlights'
					},
					{
						label: '鼻影',
						picName: 'nasalShadow'
					},
					{
						label: '脸部轮廓阴影',
						picName: 'faceShadow'
					},
					{
						label: '上嘴唇',
						picName: 'lip'
					},
					{
						label: '下嘴唇',
						picName: 'downLip'
					},
					{
						label: '整体妆容',
						picName: 'makeupLook'
					}
				],
				page: 1,
				row: 10,
				totalNum: 1,
				imgData: {
					FileName: '',
					imgFile: null
				},
				tempImgUrl: '',
				tempName: '',
				imgArr: [],
				dialogImageUrl: '',
				imgDialogVisible: false
			}
		},
		components: {
			Pagination
		},
		methods: {
			// 编辑
			handleEdit(index, row) {
				let testExp = /http.*?(\.png|\.jpg)/gi;
				this.idx = index;
				this.$axios.get(`/management/admin/beauty-module!input.action?id=${this.tableData[index].id}`).then(res => {
					this.formLabelAlign = {
						blushes: res.data.blushes,
						downLip: res.data.downLip,
						eyebrow: res.data.eyebrow,
						faceHighlights: res.data.faceHighlights,
						faceShadow: res.data.faceShadow,
						foreheadOrnament: res.data.foreheadOrnament,
						highlights: res.data.highlights,
						id: res.data.id,
						lenses: res.data.lenses,
						lip: res.data.lip,
						makeupLook: res.data.makeupLook,
						name: res.data.name,
						nasalShadow: res.data.nasalShadow,
						ornament: res.data.ornament,
						rightDownEyelash: res.data.rightDownEyelash,
						rightUpEyelash: res.data.rightUpEyelash,
						rightEye: res.data.rightEye,
						theRightEye: res.data.theRightEye,
						time: res.data.time
					};
					console.log(this.formLabelAlign)
					for (var key in res.data) {
						if (res.data[key] && testExp.test(res.data[key])) {
							this.editFileList[key] = [{
								url: res.data[key].match(testExp)[0],
								name: key
							}]
						}
					}
					console.log(this.editFileList)
				})
				this.dialogVisible = true;
			},
			//保存编辑
			saveEdit() {
				let paramArr = this.imgArr;
				let paramObj = {};
				for (let i = 0; i < paramArr.length; i++) {
					delete paramArr[i].picName;
					for (var key in paramArr[i]) {
						paramObj[key] = `<img src="${paramArr[i][key]}" alt="" />`
					}
				}
				var newObj = {}
				Object.assign(newObj, this.formLabelAlign, paramObj);
				delete newObj.id;
				for(var k in newObj){
					if(!newObj[k]){
						delete newObj[k];
					}
				}
				this.$refs['formLabelAlign'].validate((valid) => {
					if (valid) {
						this.$axios.post(`/management/admin/beauty-module!save.action?id=${this.formLabelAlign.id}`, this.$qs.stringify(newObj)).then(res => {
							this.getData(this.page, this.row)
							this.imgArr = [];
							this.editFileList=[];
							this.$message.success(`编辑成功`);
						}).catch(e => {
							this.$message.error(`出了点问题-.-!`);
						})
						this.dialogVisible = false;
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//删除
			deleteRow(index, rows) {
				this.$confirm("确认删除？")
					.then(_ => {
						this.$axios.post(`/management/admin/beauty-module!delete.action?id=${rows[index].id}`).then(res => {
							this.getData(this.page, this.row)
							this.$message.success(`删除成功`);
						})
					})
					.catch(_ => {});
				// 提交删除请求
			},
			// 新增
			handleAdd() {
				this.$refs['formLabelAdd'].validate((valid) => {
					if (valid) {
						let paramArr = this.imgArr;
						let paramObj = {};
						for (let i = 0; i < paramArr.length; i++) {
							delete paramArr[i].picName;
							for (var key in paramArr[i]) {
								paramObj[key] = `<img src="${paramArr[i][key]}" alt="" />`
							}
						}
						console.log(paramObj)
						paramObj.name = this.formLabelAdd.name;
						this.$axios.post('/management/admin/beauty-module!save.action', this.$qs.stringify(paramObj)).then(res => {
							this.getData(this.page, this.row)
							this.formLabelAdd = {
								name: ''
							}
							this.imgArr = [];
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
			// 分页
			changePage(val) {
				this.page = val;
				this.getData(val, this.row)
			},
			changeSize(val) {
				this.row = val;
				this.getData(this.page, val)
			},
			// 操作上传图片
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.imgDialogVisible = true;
			},
			cancelAdd() {
				this.AddVisible = false;
				// 清空上传列表
				this.imgData = {
					FileName: '',
					imgFile: null
				};
				this.tempImgUrl = '';
				this.imgArr = [];
				this.tempName = ''
			},
			cancelEdit() {
				this.dialogVisible = false;
				// 清空上传列表
				this.imgData = {
					FileName: '',
					imgFile: null
				};
				this.tempImgUrl = '';
				this.imgArr = [];
				this.tempName = ''
			},
			upLoadImg(name) {
				this.tempName = name
			},
			beforeUpload(file) {
				this.imgData.FileName = file.name;
				this.imgData.imgFile = file
			},
			handleRemove(file, fileList) {
				this.formLabelAlign.image = '';
				this.tempImgUrl = '';
				this.formLabelAlign[file.name]='';
				for (let i = 0; i < this.imgArr.length; i++) {
					if (this.imgArr[i].picName === file.name) {
						this.imgArr.splice(i, 1)
					}
				}
			},
			uploadSuccess(res, file, fileList) {
				this.tempImgUrl = res.url;
				let tempObj = {};
				tempObj[this.tempName] = res.url;
				tempObj.picName = file.name;
				this.imgArr.push(tempObj)
				console.log(this.imgArr)
				// 清空上传图片参数
				this.imgData = {
					FileName: '',
					imgFile: null
				}
			},
			// 请求数据
			getData(page, row) {
				var url = '/management/admin/beauty-module!list.action'
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
	.handle-box {
		margin-bottom: 20px
	}
</style>
