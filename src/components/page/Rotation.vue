<template>
	<div>
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size="small" v-has>新增</el-button>
			<el-button type="primary" @click="refresh" size="small" v-has>刷新缓存</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%">
				<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAdd" :rules="rules" ref="formLabelAdd">
					<el-form-item label="名称" prop="name">
						<el-input v-model="formLabelAdd.name"></el-input>
					</el-form-item>
					<el-form-item label="链接" prop="imgLink">
						<el-input v-model="formLabelAdd.imgLink"></el-input>
					</el-form-item>
					<el-form-item label="链接类型" prop="type">
						<el-select v-model="formLabelAdd.type" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="图片">
						<el-upload class="upload-demo" action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data="imgData1" :limit="1"
						 :on-preview="handlePreview" :on-remove="handleRemove1" :on-success="handleSuccess1" :file-list="fileList"
						 :before-upload="beforeUpload1" list-type="picture">
							<el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="AddVisible = false">取 消</el-button>
					<el-button type="primary" @click="handleAdd('formLabelAdd')">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog title="图片预览" :visible.sync="imgVisible" append-to-body>
					<img :src="img" alt="" style="width:100%">
				</el-dialog>
		</div>
		<el-table :data="bannerList" border style="width: 100%" current-row-key>
			<el-table-column label="名称" align="center">
				<template slot-scope="scope">{{ scope.row.name }}</template>
			</el-table-column>
			<el-table-column label="链接类型" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.type ==0">视频类</span>
					<span v-else-if="scope.row.type ==1">图文类</span>
					<span v-else-if="scope.row.type ==2">外链</span>
					<span v-else-if="scope.row.type ==3">专题</span>
				</template>
			</el-table-column>
			<el-table-column label="审核状态" width="80" align="center">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.online==0">上线</el-tag>
					<el-tag type="danger" v-else>下线</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					
					<el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" size="small" v-has>编辑</el-button>
					<el-button type="warning" v-if="scope.row.online==0" class="el-icon-sort" @click="online(scope.$index, scope.row)"
					 size="small" v-online>下线</el-button>
					<el-button type="success" v-else @click="online(scope.$index, scope.row)" size="small" class="el-icon-sort"
					 v-online>上线</el-button>
					 <el-button @click.native.prevent="deleteRow(scope.$index, bannerList)" type="danger" class="el-icon-delete" size="small"
					 v-del>删除</el-button>
					<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
						<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
							<el-form-item label="名称" prop="name">
								<el-input v-model="formLabelAlign.name"></el-input>
							</el-form-item>
							<el-form-item label="链接" prop="imgLink">
								<el-input v-model="formLabelAlign.imgLink"></el-input>
							</el-form-item>
							<el-form-item label="链接类型" prop="type">
								<el-select v-model="formLabelAlign.type" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="图片">
								<el-upload class="upload-demo" action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data="imgData" :limit="1"
								 :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList1"
								 :before-upload="beforeUpload" list-type="picture" >
									<el-button size="small" type="primary">点击上传</el-button>
								</el-upload>
							</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="saveEdit">确 定</el-button>
						</span>
					</el-dialog>
				</template>
			</el-table-column>
		</el-table>
		<Pagination :totalNum="totalNum" @change_Page="changePage" @change_Size="changeSize"></Pagination>
	</div>
</template>

<script>
	import Pagination from "@/components/module/Pagination.vue";
	export default {
		data() {
			return {
				bannerList: [],
				fileList: [],
				fileList1: [],
				imgData1: {},
				imgData: {},
				options: [{
						value: 0,
						label: "视频类"
					},
					{
						value: 1,
						label: "图文类"
					},
					{
						value: 2,
						label: "外链"
					},
					{
						value: 3,
						label: "专题"
					},
				],
				dialogVisible: false,
				AddVisible: false,
				imgVisible: false,
				labelPosition: "left",
				img:'',
				idx: -1,
				page: 1,
				row: 10,
				totalNum: 1,
				rules: {
					name: [{
						required: true,
						message: "请输入名称",
						trigger: "blur"
					}, ],
					imgLink: [{
						required: true,
						message: "请输入链接",
						trigger: "blur"
					}, ],
					type: [{
						required: true,
						message: "请选择链接类型",
						trigger: "change"
					}]
				},
				formLabelAlign: {
					image: []
				},
				formLabelAdd: {
					imgUrl: []
				}
			};
		},
		components: {
			Pagination
		},
		mounted() {
			this.getBannerList(1, 10);
		},
		methods: {
			getBannerList(page, row) {
				this.$axios
					.get("/management/admin/banner!list.action", {
						params: {
							page,
							row
						}
					})
					.then(res => {
						if (res.status == 200) {
							console.log(res);
							this.bannerList = res.data.rows;
							this.totalNum = res.data.total;
						}
					});
			},
			// 编辑
			handleEdit(index, row) {
				this.fileList1 = []
				this.idx = row.id;
				this.dialogVisible = true;
				this.$axios
					.get(`/management/admin/banner!input.action?id=${this.idx}`)
					.then(res => {
						if (res.status == 200) {
							// console.log(res);
							this.formLabelAlign = res.data;
							let str = this.formLabelAlign.imgUrl;
							let srcReg = /[a-zA-z]+:\/\/[^\s]*/g;
							let srcArr = str.match(srcReg);
							if (srcArr) {
								for (let i = 0; i < srcArr.length; i++) {
									this.fileList1.push({
										url: srcArr[i].split('"')[0],
										name:'轮播图'
									})
								}
							}
						}
					});
			},
			//保存编辑
			saveEdit() {
				console.log(this.formLabelAlign, this.fileList)
				this.$axios
					.post(
						`/management/admin/banner!save.action?id=${this.idx}`,
						this.$qs.stringify({
							name: this.formLabelAlign.name,
							type: this.formLabelAlign.type,
							imgLink: this.formLabelAlign.imgLink,
							imgUrl: this.formLabelAlign.imgUrl
						})
					)
					.then(res => {
						if (res.status == 200) {
							this.dialogVisible = false;
							this.$message.success(`添加成功`);
							this.formLabelAlign = {};
							this.fileList1 = [];
							this.getBannerList();
						}
					});
			},
			//删除
			deleteRow(index, rows) {
				this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.$axios
						.get(`/management/admin/banner!delete.action?id=${rows[index].id}`)
						.then(res => {
							if (res.status == 200) {
								this.$message.success("删除成功");
								this.getBannerList();
							}
						});
				});
			},
			online(index, rows) {
				console.log(rows, rows.online);
				this.$axios
					.get(
						`/management/admin/banner!online.action?id=${rows.id}&online=${
            rows.online == 0 ? 1 : 0
          }`
					)
					.then(res => {
						if (res.status == 200) {
							this.$message.success(rows.enable == 0 ? "已下线" : "已上线");
							this.getBannerList();
						}
					});
			},
			// 新增
			handleAdd(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						let image = "";
						for (let i = 0; i < this.formLabelAdd.imgUrl.length; i++) {
							image += `<img src="` + this.formLabelAdd.imgUrl[i] + `"  alt='' />`;
						}
						console.log(image);
						this.$axios
							.post(
								"/management/admin/banner!save.action",
								this.$qs.stringify({
									name: this.formLabelAdd.name,
									type: this.formLabelAdd.type,
									imgLink: this.formLabelAdd.imgLink,
									imgUrl: image
								})
							)
							.then(res => {
								if (res.status == 200) {
									this.AddVisible = false;
									this.$message.success("添加成功");
									this.getBannerList();
									this.formLabelAdd = {};
									this.fileList = [];
								}
							});
					} else {
						console.log("error submit!!");
						return false;
					}
				});

			},
			//刷新缓存
			refresh(){
				this.$axios.get('/management/admin/banner!cache.action').then(res=>{
					if(res.status==200){
						this.$message.success("刷新成功")
					}
				})
			},
			// 全选
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			//图片上传
			handleRemove(file, fileList) {
				this.formLabelAlign.imgUrl = "";
				for (let i = 0; i < fileList.length; i++) {
					this.formLabelAlign.imgUrl +=
						`<img src="` + fileList[i].url + `"  alt='' />`;
				}
			},
			handleRemove1(file, fileList) {
				// console.log(this.formLabelAdd,file,fileList)
				this.formLabelAdd.imgUrl = [];
				for (let i = 0; i < fileList.length; i++) {
					this.formLabelAdd.image.push(fileList[i].response.url);
					console.log(this.formLabelAdd);
				}
			},
			handlePreview(file) {
				this.img= file.url
				this.imgVisible = true
			},
			beforeUpload(file) {
				this.imgData.FileName = file.name;
				this.imgData.imgFile = file;
			},
			beforeUpload1(file) {
				this.imgData1.FileName = file.name;
				this.imgData1.imgFile = file;
			},
			handleSuccess(res) {
				console.log(res);
				this.formLabelAlign.imgUrl += `<img src="` + res.url + `"  alt='' />`;
			},
			handleSuccess1(res) {
				this.formLabelAdd.imgUrl.push(res.url);
			},
			// 分页
			changePage(val) {
				this.page = val;
				this.getBannerList(val, this.row);
			},
			changeSize(val) {
				this.row = val;
				this.getBannerList(this.page, val);
			}
		}
	};
</script>

<style scoped>
	.el-table {
		margin-left: 20px;
	}

	.el-switch {
		margin-left: 10px;
	}
</style>
