<template>
	<div class="logContent">
		<el-row>
			<el-col :span="18">
				<div class="btnGroup">
					<el-button type="primary" size='small' @click="add">新增</el-button>
					<el-dialog title="新增教程" :visible.sync="AddVisible" width="50%" :before-close="handleClose">
						<el-form :label-position="labelPosition" :rules="rules" ref="formLabelAdd" label-width="120px" :model="formLabelAdd">
							<el-form-item label="名称">
								<el-input v-model="formLabelAdd.name"></el-input>
							</el-form-item>
							<el-form-item label="化妆目的">
								<el-select v-model="formLabelAdd.purposeId" multiple placeholder="请选择化妆目的" style='width: 100%;'>
									<el-option v-for="item in purposeOptions" :key="item.id" :label="item.text" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="化妆水平">
								<el-select v-model="formLabelAdd.level" placeholder="请选择水平">
									<el-option label="初学乍练" value="0"></el-option>
									<el-option label="略有小成" value="1"></el-option>
									<el-option label="自成一派" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="标签">
								<el-cascader v-model="formLabelAdd.lableId" :options="tagOptions" change-on-select></el-cascader>
							</el-form-item>
							<el-form-item label="点赞次数">
								<el-input v-model="formLabelAdd.greatNumber"></el-input>
							</el-form-item>
							<el-form-item label="点击次数">
								<el-input v-model="formLabelAdd.clickNumber"></el-input>
							</el-form-item>
							<el-form-item label="浏览量">
								<el-input v-model="formLabelAdd.pageView"></el-input>
							</el-form-item>
							<el-form-item label="化妆预估时间">
								<el-input v-model="formLabelAdd.minute"></el-input>
							</el-form-item>
							<el-button size='small' type='primary' class="el-icon-plus addColor" @click='addNewColor'> 新增色号</el-button>

							<!-- 新增色号弹框 -->
							<el-dialog title="新增色号" :visible.sync="addColorDialogVisible" width="30%" append-to-body>
								<el-form :label-position="labelPosition" label-width="120px" :model="addColorFormData">
									<el-form-item label="产品">
										<el-select v-model="addColorFormData.productId" placeholder="请选择产品" filterable :filter-method='(q)=>{
											searchProduct=q;
											getProductData(productPage,productRow,q)
										}'
										 style='width: 100%;'>
											<div class="productOptionHead">
												<span class="number">标号</span>
												<span>产品名称</span>
											</div>
											<el-option v-for="item in productOptions" :key="item.id" :label="item.name" :value="item.id">
												<span class="productOptionItem itemNumber">{{item.id}}</span>
												<span class="productOptionItem">{{item.name}}</span>
											</el-option>
											<div class="noMargin">
												<Pagination :totalNum='productTotalNum' @change_Page='changeProductPage' @change_Size='changeProductSize'></Pagination>
											</div>
										</el-select>
									</el-form-item>
									<el-form-item label="产品及色号名称">
										<el-input v-model="addColorFormData.productName"></el-input>
									</el-form-item>
									<el-form-item label="色号名称">
										<el-input v-model="addColorFormData.colorName"></el-input>
									</el-form-item>
									<el-form-item label="对应产品对应色号图片">
										<el-upload action="/management/admin/kcupload!uploadImage.action?type=beauty_product" :data='imgData'
										 :before-upload='beforeUpload' :on-success="uploadSuccess" :on-remove="handleRemove" :file-list="fileList"
										 list-type="picture">
											<el-button size="small" type="primary">点击上传</el-button>
											<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
										</el-upload>
									</el-form-item>
									<el-form-item>
										<el-button @click="cancelAddColor">取 消</el-button>
										<el-button type="primary" @click="addColor">确 定</el-button>
									</el-form-item>
								</el-form>
							</el-dialog>


							<el-form-item label='选择色号'>
								<el-select v-model="formLabelAdd.productColor" multiple placeholder="请选择色号" filterable :filter-method='(q)=>{
									searchColor=q;
									getColorProductData(colorPage,colorRow,q)
								}'
								 style='width: 100%;'>
									<div class="optionHead">
										<span class="number">标号</span>
										<span>色号名称</span>
										<span>商品名称</span>
									</div>
									<el-option v-for="item in productColorOptions" :key="item.id" :label="item.productName" :value="item.id">
										<span class="optionItem itemNumber">{{item.id}}</span>
										<span class="optionItem">{{item.name}}</span>
										<span class="optionItem">{{item.productName}}</span>
									</el-option>
									<div class="noMargin">
										<Pagination :totalNum='colorTotalNum' @change_Page='changeColorPage' @change_Size='changeColorSize'></Pagination>
									</div>
								</el-select>
							</el-form-item>
							<el-form-item label='选择美妆模型图'>
								<el-select v-model="formLabelAdd.moduleId" placeholder="请选择美妆模型" style='width: 100%;'>
									<el-option v-for="item in moduleOptions" :key="item.id" :label="item.text" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="视频">
								<!-- <el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
								:before-upload='beforeUpload' :on-success="uploadSuccess" :on-remove="handleRemove" list-type="picture">
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
								</el-upload> -->
							</el-form-item>
							<el-form-item label="简介">
								<el-input type="textarea" autosize v-model="formLabelAdd.about"></el-input>
							</el-form-item>
							<el-form-item label="图片">
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
					<el-button type="primary" size='small' @click="batchOnline">批量上线</el-button>
					<el-button type="primary" size='small' @click="batchOffline">批量下线</el-button>
					<el-button type="primary" size='small' @click="batchDelete">批量删除</el-button>
				</div>
			</el-col>
			<el-col :span="6">
				<el-form :inline="true" :model="searchForm" class="right-search">
					<el-form-item>
						<el-input v-model="searchForm.text" placeholder="请输入搜索内容"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size='small' @click="onSubmitSearch" icon="el-icon-search">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='2' class='treeBox'>
				<span class="treeTitle">教程栏目列表</span>
				<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			</el-col>
			<el-col :span='22'>
				<el-table :data="tableData" border style="width: 99%" class='table' max-height="620" v-loading="loading">
					<el-table-column type="selection" width="55" align='center'></el-table-column>
					<el-table-column type="index" label="序号" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="id" label="id" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="name" label="标题" width="200" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="lableName" label="标签" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="level" label="化妆水平" width="100" align='center' :formatter='getLevel'>
					</el-table-column>
					<el-table-column label="H5地址" width="100" align='center'>
						<template slot-scope="scope">
							<el-button class='copyBtn' size="small" @click='copyH5Url(scope.row)' type="primary">复制</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="collectNumber" label="点赞次数" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="clickNumber" label="点击次数" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="creatUser" label="创建人" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" width="150" align='center' :formatter='getTime'>
					</el-table-column>
					<el-table-column prop="online" label="审核状态" width="100" align='center' :formatter='getStatus'>
					</el-table-column>
					<el-table-column label="操作" fixed="right" align='center' width='750'>
						<template slot-scope="scope">
							<el-button size="small" type="primary" @click="edit(scope.$index, scope.row)" icon='el-icon-edit'>编辑</el-button>
							<el-dialog title="编辑" :visible.sync="editDialogVisible" width="80%">
								<el-form :label-position="labelPosition" label-width="80px" :model="editFormData">
									<el-form-item label="用户ID">
										<el-input v-model="editFormData.id"></el-input>
									</el-form-item>
								</el-form>
							</el-dialog>
							<el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" size='small' type="danger" class="el-icon-delete">删除</el-button>
							<el-button size="small" type="primary" @click="switchOnline(scope.$index, scope.row)">{{tableData[scope.$index].online==0?'下线':'上线'}}</el-button>
							<el-button size="small" type="primary" @click="creatH5(scope.$index, scope.row)" icon='el-icon-edit-outline'>生成H5</el-button>
							<el-button size="small" type="primary" @click="updataSort(scope.$index, scope.row)" icon='el-icon-sort'>更新排序</el-button>
							<el-button size="small" type="primary" @click="push(scope.$index, scope.row)">推送</el-button>
							<el-button size="small" type="primary" @click="addComment(scope.$index, scope.row)">添加评论</el-button>
							<el-button size="small" type="primary" @click="checkComment(scope.$index, scope.row)">查看评论</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Pagination :totalNum='totalNum' @change_Page='changePage' @change_Size='changeSize'></Pagination>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import Pagination from '../module/pagination.vue'
	import Clipboard from 'clipboard'
	export default {
		data() {
			return {
				searchForm: {
					text: ''
				}, //搜索框

				editFormData: {

				}, //编辑表单

				formLabelAdd: {
					name: '',
					purposeId: '',
					level: '',
					lableId: '',
					greatNumber: '',
					clickNumber: '',
					pageView: '',
					minute: '',
					selectName: '',
					productColor: '',
					moduleId: '',
					videoUrl: '',
					about: '',
					image: ''
				}, //新增教程表单

				addColorFormData: {
					productId: '',
					productName: '',
					colorName: '',
					image: ''
				}, //新增色号表单

				purposeOptions: [], //化妆目的
				tagOptions: [], //标签
				productColorOptions: [], //色号产品列表
				searchColor: '', //色号搜索内容
				searchProduct: '', //新增色号产品搜索内容
				productOptions: [], //新增色号产品列表
				moduleOptions: [], //美妆模型图列表
				rules: {

				},
				labelPosition: 'left',
				AddVisible: false,
				addColorDialogVisible: false,
				editDialogVisible: false,
				totalNum: 10,
				colorTotalNum: 10,
				productTotalNum: 10,
				tableData: [],
				page: 1,
				row: 10,
				colorRow: 10,
				colorPage: 1,
				productRow: 10,
				productPage: 1,
				// 左侧树形控件
				treeData: [],
				defaultProps: {
					children: 'children',
					label: 'lable'
				},
				tempId: 2,
				// 图片上传
				imgData: {
					FileName: '',
					imgFile: null
				},
				tempImgUrl: '',
				loading: true,
				fileList: []
			}
		},
		components: {
			Pagination
		},
		methods: {
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			// 新增
			add() {
				this.AddVisible = true;
				// 获取目的数据
				this.getPurposeData();
				// 序列化标签数据
				var tempTagArr = [];
				console.log(this.treeData)
				this.treeData.forEach(item => {
					var tempObj = {};
					tempObj = {
						value: item.id,
						label: item.lable,
						children: item.children
					}
					var tempChildrenArr = []
					item.children.forEach(item2 => {
						var tempChildrenObj = {};
						tempChildrenObj = {
							value: item2.id,
							label: item2.lable
						}
						tempChildrenArr.push(tempChildrenObj)
					})
					tempObj.children = tempChildrenArr
					tempTagArr.push(tempObj)
				})
				this.tagOptions = tempTagArr
				// 获取色号产品数据
				this.getColorProductData(1, 20)
				//获取模型数据
				this.getModuleData();
			},
			// 确认新增
			handleAdd() {
				console.log(this.formLabelAdd)
				console.log(this.tempImgUrl)
			},
			// 点击新增色号
			addNewColor() {
				this.addColorDialogVisible = true;
				this.getProductData(1, 10)
			},
			// 提交新增色号
			addColor() {
				//提交新增请求
				this.$axios.post('/management/admin/beauty-color!save.action', this.$qs.stringify({
					productId: this.addColorFormData.productId,
					productName: this.addColorFormData.productName,
					colorName: this.addColorFormData.colorName,
					image: this.tempImgUrl ? `<img src="${this.tempImgUrl}" alt="" />` : ''
				})).then(res => {
					this.getColorProductData(this.colorPage, this.colorRow)
					this.addColorFormData = {
						productId: '',
						productName: '',
						colorName: '',
						image: ''
					}
					this.tempImgUrl = '';
					this.$message.success(`新增色号成功`);
					this.addColorDialogVisible = false;
				}).catch(e => {
					this.$message.error(`出了点问题-.-!`);
					this.addColorDialogVisible = false;
				})
				this.fileList = [];
			},
			// 取消新增色号
			cancelAddColor() {
				this.addColorFormData = {
					productId: '',
					productName: '',
					colorName: '',
					image: ''
				}
				this.fileList = [];
				this.addColorDialogVisible = false
			},
			// 批量上线
			batchOnline() {

			},
			// 批量下线
			batchOffline() {

			},
			// 批量删除
			batchDelete() {

			},
			// 提交搜索
			onSubmitSearch() {
				console.log('提交搜索项目');
			},
			// 复制H5页面路径
			copyH5Url(row) {
				var Url = row.url;
				var clipboard = new Clipboard('.copyBtn', {
					text: function() {
						return Url;
					}
				});
				clipboard.on('success', e => {
					this.$message.success('复制成功')
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					this.$message.error('浏览器不支持复制')
					clipboard.destroy()
				})
			},
			// 树形控件操作
			handleNodeClick(a, b, c) {
				this.tempId = a.id;
				this.getTableData(`/management/admin/beauty-details!list.action`, this.page, this.row, a.id)
			},
			// 上传操作
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
			// 表格操作
			// 编辑
			edit(index, row) {

			},
			// 删除
			deleteRow(index, row) {
				this.$confirm("确认删除？")
					.then(_ => {
						this.tableData.splice(index, 1);
					})
					.catch(_ => {});
			},
			// 切换状态
			switchOnline(index, row) {

			},
			// 创建H5页面
			creatH5() {

			},
			// 更新排序
			updataSort(index, row) {

			},
			// 推送
			push(index, row) {

			},
			// 增加评论
			addComment(index, row) {

			},
			// 查看评论
			checkComment(index, row) {

			},
			// 分页
			changePage(val) {
				this.page = val;
				this.getTableData(`/management/admin/beauty-details!list.action`, val, this.row, this.tempId)
			},
			changeSize(val) {
				this.row = val;
				this.getTableData(`/management/admin/beauty-details!list.action`, this.page, val, this.tempId)
			},
			// 产品色号分页
			changeColorPage(val) {
				this.colorPage = val;
				this.getColorProductData(val, this.colorRow, this.searchColor)
			},
			changeColorSize(val) {
				this.colorRow = val;
				this.getColorProductData(this.colorPage, val, this.searchColor)
			},
			// 色号产品分页
			changeProductPage(val) {
				this.colorPage = val;
				this.getProductData(val, this.paoducRow, this.searchProduct)
			},
			changeProductSize(val) {
				this.colorRow = val;
				this.getProductData(this.productPage, val, this.searchProduct)
			},
			// 数据格式化
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
			getTime(row, column, dataNum) {
				var date = new Date(dataNum);
				var Y = date.getFullYear() + '-'
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
				var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
				var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
				return Y + M + D + h + m + s
			},
			getStatus(row, column, statusNum) {
				return statusNum == 0 ? '上线' : '下线'
			},
			// 列表数据
			getTableData(url, page, row, id) {
				this.$axios.get(url, {
					params: {
						page: page,
						rows: row,
						lableId: id ? id : ''
					}
				}).then(res => {
					this.totalNum = res.data.total;
					this.tableData = res.data.rows;
					this.loading = false
				})
			},
			// 化妆目的数据 /management/admin/purpose!getList.action
			getPurposeData() {
				this.$axios.get('/management/admin/purpose!getList.action').then(res => {
					this.purposeOptions = res.data;
				})
			},
			// 标签数据
			// 色号数据
			getColorProductData(page, row, text) {
				this.$axios.get('/management/admin/beauty-color!comboGridlist.action', {
					params: {
						page: page,
						rows: row,
						q: text
					}
				}).then(res => {
					this.colorTotalNum = res.data.total
					this.productColorOptions = res.data.rows
				})
			},
			// 新增色号产品数据
			getProductData(page, row, text) {
				this.$axios.get('/management/admin/beauty-product!comboGridlist.action', {
					params: {
						page: page,
						rows: row,
						q: text
					}
				}).then(res => {
					this.productTotalNum = res.data.total
					this.productOptions = res.data.rows
				})
			},
			// 模型图数据
			getModuleData() {
				this.$axios.get('/management/admin/beauty-module!getList.action').then(res => {
					this.moduleOptions = res.data
				})
			}
		},
		mounted() {
			this.getTableData('/management/admin/beauty-details!list.action', 1, 10, 2);
			// 获取教程栏目树形控件数据
			this.$axios.get('/management/admin/lable!lableTree.action').then(res => {
				let tempList = res.data.map(item => {
					return {
						id: item.id,
						lable: item.text,
						children: []
					}
				})
				for (let i = 0; i < tempList.length; i++) {
					this.$axios.get(`/management/admin/lable!lableTree.action?id=${tempList[i].id}`).then(res2 => {
						let temp = res2.data.map(item => {
							return {
								lable: item.text,
								id: item.id
							}
						})
						tempList[i].children = temp
					})
				}
				this.treeData = tempList;
			})
		}
	}
</script>

<style scoped>
	.right-search {
		text-align: right;
	}

	.pagination {
		margin: 20px 0;
	}

	.treeBox {
		padding: 0 10px;
		box-sizing: border-box;
	}

	.treeTitle {
		display: block;
		width: 100%;
		height: 40px;
		font-size: 18px;
		color: #409EFF;
		font-weight: 700;
	}

	.el-table {
		font-size: 12px;
	}

	.addColor {
		margin-bottom: 20px;
	}

	.optionHead,
	.productOptionHead {
		padding: 0 5px;
		box-sizing: border-box;
		display: flex;
		align-content: space-between;
	}

	.optionHead span {
		flex: 45%;
		border-bottom: 1px dashed #ccc;
		text-align: center;
		line-height: 30px;
	}

	.optionHead .number {
		flex: 10%;
	}

	.optionItem {
		display: inline-block;
		width: 45%;
		text-align: center;
		border-bottom: 1px solid #eee;
	}

	.optionItem.itemNumber {
		width: 10%;
	}

	.productOptionHead {
		padding: 0 20px;
		box-sizing: border-box;
	}

	.productOptionHead span {
		flex: 90%;
		border-bottom: 1px dashed #ccc;
		text-align: center;
		line-height: 30px;
	}

	.productOptionHead .number {
		flex: 10%;
	}

	.productOptionItem {
		display: inline-block;
		width: 90%;
		text-align: center;
		border-bottom: 1px solid #eee;
	}

	.productOptionItem.itemNumber {
		width: 10%;
	}
</style>
