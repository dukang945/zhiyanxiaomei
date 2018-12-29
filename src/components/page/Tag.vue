<template>
	<div class="tagContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAdd">
					<el-form-item label="标签名称">
						<el-input v-model="formLabelAdd.name"></el-input>
					</el-form-item>
					<el-form-item label="上级目录">
						<el-input v-model="formLabelAdd.lableName"></el-input>
					</el-form-item>
					<el-form-item label="排序号">
						<el-input v-model="formLabelAdd.sort"></el-input>
					</el-form-item>
					<el-form-item label="图片">
						<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
						 :on-remove="handleRemove" :file-list="fileList" list-type="picture">
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
			<ul class="tableHead">
				<li>Id</li>
				<li>美妆类型名称</li>
				<li>操作</li>
			</ul>
			<div class="tableCont">
				<div class="listItem" v-for="(item,index) in tableList" :key='item.id' @click="handleRow(item.id,index)">
					<span>{{item.id}}</span>
					<span>{{item.name}}</span>
					<span>
						<el-button size='small'>删除</el-button>
						<el-button size='small'>编辑</el-button>
					</span>
					<div class="secondTable">
						<!-- <el-table :data='tableData' border style="width: 100%" @row-click='showList'>
							<el-table-column prop="tableData[index].id" label="id" width="100" align='center'>
							</el-table-column>
							<el-table-column prop="tableData[index].name" label="美妆类型名称 ">
							</el-table-column>
							<el-table-column prop="tableData[index].lableName" label="上级目录 ">
							</el-table-column>
						</el-table> -->
					</div>
				</div>
			</div>
		</div>
		<!-- <el-table :data="tableData" border style="width: 100%" @row-click='showList'>
			<el-table-column type="index" label="序号" width="50" align='center'>
			</el-table-column>
			<el-table-column prop="id" label="id" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="name" label="美妆类型名称 ">
			</el-table-column>
			<el-table-column prop="" label="上级目录 ">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size='small' type="danger" class="el-icon-delete">删除</el-button>
					<el-button type="primary" size='small' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
						<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
							<el-form-item label="标签名称">
								<el-input v-model="formLabelAlign.name"></el-input>
							</el-form-item>
							<el-form-item label="上级目录">
								<el-input v-model="formLabelAlign.lableName" readonly></el-input>
							</el-form-item>
							<el-form-item label="排序号">
								<el-input v-model="formLabelAlign.sort"></el-input>
							</el-form-item>
							<el-form-item label="图片">
								<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
								 :on-remove="handleRemove" :file-list="editFileList" list-type="picture">
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
				</template>
			</el-table-column>
		</el-table> -->
		<!-- <Pagination :totalNum='totalNum' @change_Page='changePage' @change_Size='changeSize'></Pagination> -->
	</div>
</template>

<script>
	// import Pagination from '../module/pagination.vue'
	export default {
		data() {
			return {
				tableList:[],
				tableData: [],
				dialogVisible: false,
				AddVisible: false,
				labelPosition: "left",
				idx: -1,
				fileList: [],
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
				}
			}
		},
		methods: {
			// 表格行被点击
			showList(row, event, column) {
				console.log(row);
				this.$axios(`api/management/admin/lable!getTreeGrid.action?id=${row.id}`).then(res => {
					console.log(res.data)
				})
			},
			handleRow(id) {
				console.log(id)

			},
			// 编辑
			handleEdit(index, row) {
				this.idx = index;
				const item = this.tableData[index];
				// 调用编辑接口
				this.$axios.get(`api/management/admin/lable!input.action?id=${row.id}`).then(res => {
					console.log(res)
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
				this.$set(this.tableData, this.idx, this.formLabelAlign);
				this.dialogVisible = false;
				// 提交编辑请求

				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
			},
			//删除
			deleteRow(index, rows) {
				this.$confirm("确认删除？")
					.then(_ => {
						rows.splice(index, 1);
					})
					.catch(_ => {});
				// 提交删除请求
			},
			// 新增
			handleAdd() {
				this.tableData.push(this.formLabelAdd);
				this.AddVisible = false;
				// 提交新增请求

				this.$message.success(`添加成功`);
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
			// 请求数据
// 			getData() {
// 				var url = 'api/management/admin/lable!getTreeGrid.action'
// 				this.$axios.get(url).then(res => {
// 					let tempTableData = res.data.map(item => {
// 						return {
// 							id: item.id,
// 							name: item.name,
// 							text: item.text
// 						}
// 					})
// 					this.tableData = tempTableData;
// 				})
// 			},
// 			getSecond(id,index){
// 				var url = 'api/management/admin/lable!getTreeGrid.action'
// 				this.$axios.get(url, {
// 					id: id
// 				}).then(res => {
// 					console.log(res)
// 					// this.tableData.push(res.data)
// 				})
// 			}
		},
		mounted() {
			// this.getData()
			// 获取表格数据
			this.$axios.get('api/management/admin/lable!getTreeGrid.action').then(res => {
				let tempList = res.data.map(item => {
					return {
						id: item.id,
						name: item.name,
						text: item.text
					}
				})
				this.tableList=tempList;
				for(let i=0;i<tempList.length;i++){
					this.$axios.get(`api/management/admin/lable!getTreeGrid.action?id=${tempList[i].id}`).then(res2=>{
						// console.log(res2)
// 						let temp=res2.data.map(item=>{
// 							return {
// 								lable:item.text,
// 								id:item.id
// 							}
// 						})
// 						tempList[i].children=temp
						this.tableData.push(res2.data)
					})
				}
				console.log(this.tableData)
				this.treeData = tempList;
			})
		}

	}
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px
	}
</style>
