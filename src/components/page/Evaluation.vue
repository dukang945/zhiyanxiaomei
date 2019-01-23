<template>
	<div class="evaluationContent">
		<el-row>
			<el-col :span="18">
				<div class="btnGroup">
					<el-button type="primary" size='small' @click="add">新增</el-button>
					<el-button type="primary" size='small' @click="batchOnline">批量上线</el-button>
					<el-button type="primary" size='small' @click="batchOffline">批量下线</el-button>
					<el-button type="primary" size='small' @click="batchDelete">批量删除</el-button>
					<el-dialog title="新增评测评" :visible="AddVisible" width="80%" @close='AddVisible=false'>
						<el-form :label-position="labelPosition" label-width="120px" :model="formLabelAdd">
							<el-form-item label="标题">
								<el-input v-model="formLabelAdd.name"></el-input>
							</el-form-item>
							<el-form-item label="分类">
								<el-select v-model="formLabelAdd.type" multiple placeholder="请选择分类" style='width: 100%;'>
									<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="点赞次数">
								<el-input v-model="formLabelAdd.greatNumber"></el-input>
							</el-form-item>
							<el-form-item label="是否原创">
								<el-select v-model="formLabelAdd.original" placeholder="请选择是否原创">
									<el-option label="是" :value="Number(0)"></el-option>
									<el-option label="否" :value="Number(1)"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="测评标签">
								<el-input v-model="formLabelAdd.reviewLabel"></el-input>
							</el-form-item>
							<el-form-item label="列表图片">
								<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
								 :before-upload='beforeUpload' :on-success="uploadListImgSuccess" :on-remove="handleRemoveListPic" :on-preview="handlePictureCardPreview" :file-list="addFileList"
								 list-type="picture">
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
								</el-upload>
							</el-form-item>
							<el-form-item label="banner图片">
								<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
								 :before-upload='beforeUpload' :on-success="uploadBannerImgSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemoveBannerPic"
								 :file-list="addFileList" list-type="picture">
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
								</el-upload>
							</el-form-item>

							<el-form-item label="编辑页面内容">
								<el-row>
									<el-col :span='8' class='modelBox'>
										<div class="modelList">模板列表</div>
										<el-collapse accordion>
											<el-collapse-item title="产品名称模板" name="1">
												<div class="modelItem" @click="addProductNameModel1">
													<div class="question">
														<p>产品名1</p>
													</div>
												</div>

												<div class="modelItem" @click="addProductNameModel2">
													<div class="product-title">
														<div class="main-title">
															<div class="ball1">&nbsp;</div>

															<div class="ball2">&nbsp;</div>

															<div class="ball3">&nbsp;</div>

															<p>产品名2</p>
														</div>
													</div>
												</div>
											</el-collapse-item>
											<el-collapse-item title="标题模板" name="2">
												<div class="modelItem" @click="addTitleModel1">
													<div class="question">
														<span class="line"></span>
														<span class="block"></span>
														<span>标题一</span>
														<span class="block"></span>
														<span class="line"></span>
													</div>
												</div>
												<div class="modelItem" @click="addTitleModel2">
													<div class="sub-container">
														<div class="subtitle">
															<span class="point-left"></span>
															<p>标题二</p>
															<span class="point-right"></span>
															<div class="subtitle-front">&nbsp;</div>
														</div>
													</div>
												</div>
												<div class="modelItem" @click="addTitleModel3">
													<div class="epilogue">
														<span>标题三</span>
													</div>
												</div>
												<div class="modelItem" @click="addTitleModel4">
													<div class="column column-svg">
														<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
														<span>标题四</span>
													</div>
												</div>

											</el-collapse-item>
											<el-collapse-item title="图片模板" name="3">
												<div class="modelItem" @click="addImgModel1">
													<div class="product1">
														<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
													</div>
												</div>
												<div class="modelItem" @click="addImgModel2">
													<div class="naked">
														<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
														<span>参考价格：540/30g</span>
													</div>
												</div>
												<div class="modelItem" @click="addImgModel3">
													<div class="comments-content">
														<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
													</div>
												</div>
												<div class="modelItem" @click="addImgModel4">
													<div class="product2">
														<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
													</div>
												</div>
											</el-collapse-item>
											<el-collapse-item title="文字模板" name="4">
												<div class="modelItem" @click="addTextModel1">
													<div class="column">
														<p>文字1</p>
													</div>
												</div>
												<div class="modelItem" @click="addTextModel2">
													<div class="detail">
														<p>正文并排</p>
													</div>
												</div>
												<div class="modelItem" @click="addTextModel3">
													<div class="answer">
														<p>正文常规</p>
													</div>
												</div>
												<div class="modelItem" @click="addTextModel4">
													<h3>文字效果一</h3>
												</div>
												<div class="modelItem" @click="addTextModel5">
													<div class="detail">
														<span>文字效果二</span>
													</div>
												</div>
											</el-collapse-item>
										</el-collapse>
									</el-col>
									<el-col :span='14' :offset="2">
										<textarea id="editorAdd" rows="10" cols="80"></textarea>
									</el-col>
								</el-row>
								<!-- <Editor :editorText='textData' ref="editorCompent"></Editor> -->
							</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button @click="cancelAdd">取 消</el-button>
							<el-button type="primary" @click="handleAdd">确 定</el-button>
						</span>
					</el-dialog>
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
				<span class="treeTitle">测评分类列表</span>
				<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			</el-col>
			<el-col :span='22'>
				<el-table :data="tableData" border style="width: 99%" class='table' max-height="630" @select='tableSelect'
				 v-loading="loading" :row-class-name="tableRowClassName">
					<el-table-column type="selection" width="55" align='center'></el-table-column>
					<el-table-column type="index" label="序号" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="id" label="id" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="name" label="标题" width="200" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="categoryName" label="所属分类" width="120" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="H5地址" width="100" align='center'>
						<template slot-scope="scope">
							<el-button class='copyBtn' size="small" @click='copyH5Url(scope.row)' type="primary">复制</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="creatUser" label="创建人" width="80" align='center'>
					</el-table-column>
					<el-table-column prop="collectNumber" label="点赞次数" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" width="150" align='center' :formatter='getTime'>
					</el-table-column>
					<el-table-column prop="online" label="审核状态" width="100" align='center' :formatter='getStatus'>
					</el-table-column>
					<el-table-column label="操作" fixed="right" align='center' width='780'>
						<template slot-scope="scope">
							<el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" size='small' type="danger" class="el-icon-delete">删除</el-button>
							<el-button size="small" type="primary" @click="edit(scope.$index, scope.row)" icon='el-icon-edit'>编辑</el-button>
							<el-button size="small" type="primary" @click="switchOnline(scope.$index, scope.row)" class="el-icon-sort">{{tableData[scope.$index].online==0?'下线':'上线'}}</el-button>
							<el-button size="small" type="success" @click="switchTop(scope.$index, scope.row)">{{tableData[scope.$index].sticky==0?'置顶':'取消置顶'}}</el-button>
							<el-button size="small" type="primary" @click="creatH5(scope.$index, scope.row)" icon='el-icon-edit-outline'>生成H5</el-button>
							<el-button size="small" type="primary" @click="updataSort(scope.$index, scope.row)" icon='el-icon-sort'>更新排序</el-button>
							<el-button size="small" type="primary" @click="checkProduct(scope.$index, scope.row)">产品管理</el-button>
							<el-button size="small" type="primary" @click="checkComment(scope.$index, scope.row)">查看评论</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Pagination :totalNum='totalNum' @change_Page='changePage' @change_Size='changeSize'></Pagination>
			</el-col>
		</el-row>
		<!-- 编辑表单 -->
		<el-dialog title="编辑" :visible.sync="editDialogVisible" width="80%" :before-close="handleClose">
			<el-form :label-position="labelPosition" label-width="120px" :model="editFormData">
				<el-form-item label="标题">
					<el-input v-model="editFormData.name"></el-input>
				</el-form-item>
				<el-form-item label="分类">
					<el-select v-model="editFormData.type" multiple placeholder="请选择分类" style='width: 100%;'>
						<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="点赞次数">
					<el-input v-model="editFormData.greatNumber"></el-input>
				</el-form-item>
				<el-form-item label="是否原创">
					<el-select v-model="editFormData.original" placeholder="请选择是否原创">
						<el-option label="是" :value="Number(0)"></el-option>
						<el-option label="否" :value="Number(1)"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="测评标签">
					<el-input v-model="editFormData.reviewLabel"></el-input>
				</el-form-item>

				<el-form-item label="列表图片">
					<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData' :before-upload='beforeUpload'
					 :on-success="uploadListImgSuccess" :on-remove="handleRemoveListPic"  :on-preview="handlePictureCardPreview" :file-list="editListPicFileList" list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="banner图片">
					<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData' :before-upload='beforeUpload'
					 :on-success="uploadBannerImgSuccess" :on-remove="handleRemoveBannerPic" :on-preview="handlePictureCardPreview" :file-list="editBannerPicFileList"
					 list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="编辑页面内容">
					<Editor :editorText='textData' ref="editorCompent"></Editor>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancelEdit">取 消</el-button>
				<el-button type="primary" @click="handleEdit">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 预览图片弹框 -->
		<el-dialog :visible.sync="imgDialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		<!-- 新增评论弹框 -->
		<el-dialog title="添加评论" :visible.sync="addCommentDialogVisible" width="50%" append-to-body>
			<el-form :label-position="labelPosition" label-width="100px" :model="addCommentForm">
				<el-form-item label="回复用户">
					<el-select v-model="addCommentForm.userId" placeholder="请选择用户" style='width: 100%;'>
						<div class="productOptionHead">
							<span class="number">编号</span>
							<span>用户昵称</span>
						</div>
						<el-option v-for="item in userOptions" :key="item.id" :label="item.name" :value="item.id">
							<span class="productOptionItem itemNumber">{{item.id}}</span>
							<span class="productOptionItem">{{item.name}}</span>
						</el-option>
						<div class="noMargin">
							<Pagination :totalNum='userTotalNum' @change_Page='changeUserPage' @change_Size='changeUserSize'></Pagination>
						</div>
					</el-select>
				</el-form-item>
				<el-form-item label="评论内容">
					<el-input type="textarea" autosize v-model="addCommentForm.content"></el-input>
				</el-form-item>
				<el-form-item label="点赞数">
					<el-input v-model="addCommentForm.greatNumber"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button @click="cancelAddComment">取 消</el-button>
					<el-button type="primary" @click="handleAddComment">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 查看评论弹框 -->
		<el-dialog title="评论管理" :visible.sync="checkCommentDialogVisible" width="80%">
			<el-button type="primary" @click="addComment" size='small' style='margin-bottom: 20px;'>新增评论</el-button>
			<el-table :data="commentTableData" border style="width: 100%">
				<el-table-column type="index" label="序号" width="50" align='center'>
				</el-table-column>
				<el-table-column prop="id" label="编号" width="100" align='center'>
				</el-table-column>
				<el-table-column prop="content" label="评论内容" align='center'>
				</el-table-column>
				<el-table-column prop="time" label="评论时间" width="150" align='center'>
				</el-table-column>
				<el-table-column prop="userId" label="评论用户" width="100" align='center'>
				</el-table-column>
				<el-table-column prop="parentUserId" label="回复的用户" width="100" align='center'>
				</el-table-column>
				<el-table-column prop="greatNumber" label="点赞数" width="100" align='center'>
				</el-table-column>
				<el-table-column label="操作" width="200" align='center'>
					<template slot-scope="scope">
						<el-button @click.native.prevent="deleteComment(scope.$index, commentTableData)" size='small' type="danger" class="el-icon-delete">删除</el-button>
						<el-button type="primary" size='small' @click="checkAddComment(scope.$index, scope.row)">添加回复</el-button>
					</template>
				</el-table-column>
			</el-table>
			<Pagination :totalNum='commentTotalNum' @change_Page='changeCommentPage' @change_Size='changeCommentSize'></Pagination>
		</el-dialog>
		<!-- 产品管理弹框 -->
		<el-dialog title="产品管理" :visible.sync="productDialogVisible" width="80%">
			<el-button type="primary" @click="addProduct" size='small' style='margin-bottom: 20px;'>新增产品</el-button>
			<el-table :data="productTableData" border style="width: 100%">
				<el-table-column type="index" label="序号" width="50" align='center'>
				</el-table-column>
				<el-table-column prop="id" label="编号" width="100" align='center'>
				</el-table-column>
				<el-table-column prop="beautyAppraisalId" label="测评ID" width='100' align='center'>
				</el-table-column>
				<el-table-column prop="productId[0]" label="产品ID" width='100' align='center'>
				</el-table-column>
				<el-table-column prop="colorName" label="色号名称" align='center'>
				</el-table-column>
				<el-table-column label="操作" width="200" align='center'>
					<template slot-scope="scope">
						<el-button @click.native.prevent="deleteProduct(scope.$index, scope.row)" size='small' type="danger" class="el-icon-delete">删除</el-button>
						<el-button type="primary" size='small' @click="editProduct(scope.$index, scope.row)" icon='el-icon-edit'>编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<Pagination :totalNum='productTotalNum' @change_Page='changeProductPage' @change_Size='changeProductSize'></Pagination>
		</el-dialog>
		<!-- 新增产品弹框 -->
		<el-dialog title="新增产品" :visible.sync="addProductDialogVisible" width="50%" append-to-body>
			<el-form :label-position="labelPosition" label-width="100px" :model="addproductForm">
				<el-form-item label='选择色号'>
					<el-select v-model="addproductForm.productColor" multiple placeholder="请选择色号" filterable :filter-method='(q)=>{
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
				<el-form-item label='色号名称'>
					<el-input v-model="addproductForm.name"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="cancelAddProduct">取 消</el-button>
					<el-button type="primary" @click="handleAddProduct">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 编辑产品 -->
		<el-dialog title="编辑产品" :visible.sync="editProductDialogVisible" width="50%" append-to-body>
			<el-form :label-position="labelPosition" label-width="100px" :model="editProductForm">
				<el-form-item label='选择色号'>
					<el-select v-model="editProductForm.productColor" multiple placeholder="请选择色号" filterable :filter-method='(q)=>{
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
				<el-form-item label='色号名称'>
					<el-input v-model="editProductForm.name"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="cancelEditProduct">取 消</el-button>
					<el-button type="primary" @click="handleEditProduct">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 预览图片弹框 -->
		<el-dialog :visible.sync="imgDialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../module/pagination.vue'
	import Clipboard from 'clipboard'
	import CKEDITOR from 'CKEDITOR';
	import Editor from '../module/editor.vue'
	export default {
		name: 'editorAdd',
		data() {
			return {
				searchForm: {
					text: ''
				}, //搜索框

				formLabelAdd: {
					name: '',
					greatNumber: '',
					original: '',
					reviewLabel: '',
					type: []
				}, //新增教程表单
				searchColor: '', //色号搜索内容


				editFormData: {}, //编辑表单

				addCommentForm: {}, //新增评论表单
				addproductForm: {}, //新增产品表单
				editProductForm: {}, //编辑产品表单
				typeOptions: [], //测评分类
				userOptions: [],
				rules: {},
				labelPosition: 'left',
				AddVisible: false,
				editDialogVisible: false,
				addCommentDialogVisible: false,
				checkCommentDialogVisible: false,
				productDialogVisible: false,
				addProductDialogVisible: false,
				editProductDialogVisible: false,
				imgDialogVisible:false,
				tableData: [],
				commentTableData: [], //评论表格数据
				productTableData: [], //产品表格数据
				productColorOptions: [], //色号产品列表
				totalNum: 10,
				commentTotalNum: 10,
				userTotalNum: 10,
				productTotalNum: 10,
				colorTotalNum: 10,
				page: 1,
				row: 10,
				commentPage: 1,
				commentRow: 10,
				userRow: 10,
				userPage: 1,
				productRow: 10,
				productPage: 1,
				colorRow: 10,
				colorPage: 1,
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
				tempListImgUrl: '',
				tempBannerImgUrl: '',
				tempRowId: '',
				loading: true,
				fileList: [],
				addFileList: [],
				editListPicFileList: [],
				editBannerPicFileList: [],
				dialogImageUrl: '',
				imgDialogVisible: false,
				productRowId: '', //点击产品管理行id
				innerProductRowId: '', // 内层产品行id
				commentRowId: '', //点击评论管理行id
				innerCommentRowId: '', // 内层产品行id
				checkedRowId: '',
				// 文本编辑器
				hasEditor: false,
				textData: '' //这是编辑表单文本编辑器内容
			}
		},
		components: {
			Pagination,
			Editor
		},
		methods: {
			// 编辑器
			initCKEditor() {
				CKEDITOR.replace('editorAdd', {
					height: 500,
					resize_maxHeight: 3000,
					filebrowserImageUploadUrl: '/management/admin/kcupload!uploadImg.action?type=goods_path',
					filebrowserBrowseUrl: '/management/admin/kcupload!getImages.action?type=cosmetics_img',
					extraPlugins: "beautyappraisal",
					toolbar: [{
							name: 'document',
							items: ['Source', '-', 'Templates']
						},
						{
							name: 'clipboard',
							items: ['-', 'Undo', 'Redo']
						},
						{
							name: 'insert',
							items: ['-', 'Image']
						},
						{
							name: 'paragraph',
							items: ['-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
						},
						{
							name: 'colors',
							items: ['-', 'TextColor']
						},
						{
							name: 'custome_plugin',
							items: ['productname', 'title', 'img', 'text', 'texteffects', 'bold']
						}, //将自定义插件加入toolbar
					],
					// contentsCss: './static/ckeditor/style.css',
					contentsCss: '../../../static/ckeditor/style.css',
					templates_replaceContent: false,
					autoUpdateElement: true,
					//编辑器中回车产生的标签
					enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
					shiftEnterMode: CKEDITOR.ENTER_P
				});
			},
			// 增加模板
			addProductNameModel1() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="question">
						<p>产品名1</p>
					</div>
					<br>`
				)
			},
			addProductNameModel2() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="product-title">
						<div class="main-title">
							<div class="ball1">&nbsp;</div>
							<div class="ball2">&nbsp;</div>
							<div class="ball3">&nbsp;</div>
							<p>产品名2</p>
						</div>
					</div>
					<br>`
				)
			},
			addTitleModel1() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="question">
						<span class="line"></span>
						<span class="block"></span>
						<span>标题一</span>
						<span class="block"></span>
						<span class="line"></span>
					</div>
					<br>`
				)
			},
			addTitleModel2() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="sub-container">
						<div class="subtitle">
							<span class="point-left"></span>
							<p>标题二</p>
							<span class="point-right"></span>
							<div class="subtitle-front">&nbsp;</div>
						</div>
					</div>
					<br>`
				)
			},
			addTitleModel3() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="epilogue">
						<span>标题三</span>
					</div>
					<br>`
				)
			},
			addTitleModel4() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="column column-svg">
						<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
						<span>标题四</span>
					</div>
					<br>`
				)
			},
			addImgModel1() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="product1">
						<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
					</div>
					<br>`
				)
			},
			addImgModel2() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="naked">
						<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
						<span>参考价格：540/30g</span>
					</div>
					<br>`
				)
			},
			addImgModel3() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="comments-content">
						<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
					</div>
					<br>`
				)
			},
			addImgModel4() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="product2">
						<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
					</div>
					<br>`
				)
			},
			addTextModel1() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="column">
						<p>文字1</p>
					</div>
					<br>`
				)
			},
			addTextModel2() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="detail">
						<p>正文并排</p>
					</div>
					<br>`
				)
			},
			addTextModel3() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="answer">
						<p>正文常规</p>
					</div>
					<br>`
				)
			},
			addTextModel4() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<h3>文字效果一</h3>
					<br>`
				)
			},
			addTextModel5() {
				CKEDITOR.instances.editorAdd.insertHtml(
					`<div class="detail">
						<span>文字效果二</span>
					</div>
					<br>`
				)
			},
			

			tableRowClassName({
				row,
				index
			}) {
				if (row.online === 0) {
					return 'online';
				} else if (row.online === 1) {
					return '';
				}
			},
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			// 新增
			add() {
				let _this = this
				_this.formatTreeData(_ => {});
				_this.AddVisible = true;
				setTimeout(function() {
					if (_this.hasEditor) {
						return
					} else {
						_this.initCKEditor();
						_this.hasEditor = true;
					}
				}, 100)
// 				setTimeout(function(){
// 					_this.editorText=''
// 				},100)
			},
			// 确认新增
			handleAdd() {
				// 格式化表单数据为参数所需类型
				var testObj = {};
				for (var key in this.formLabelAdd) {
					if (key != 'type') {
						testObj[key] = this.formLabelAdd[key]
					}
				}
				if (this.tempListImgUrl) {
					testObj.image = `<img src="${this.tempListImgUrl}" alt="" />`
				}
				if (this.tempBannerImgUrl) {
					testObj.bannerImage = `<img src="${this.tempBannerImgUrl}" alt="" />`
				}
				var categoryIdString = '';

				if (this.formLabelAdd.type.length > 0) {
					for (let i = 0; i < this.formLabelAdd.type.length; i++) {
						categoryIdString += `&categoryId=${this.formLabelAdd.type[i]}`
					}
				}
				testObj.text = CKEDITOR.instances.editorAdd.getData();
				let paramsStr = this.$qs.stringify(testObj) + categoryIdString
				this.$axios.post('/management/admin/beauty-appraisal!save.action', paramsStr).then(res => {
					this.getTableData('/management/admin/beauty-appraisal!list.action', this.page, this.row);
					this.AddVisible = false;
					this.tempListImgUrl = '';
					this.tempBannerImgUrl = '';
					this.formLabelAdd = {
						name: '',
						greatNumber: '',
						original: '',
						reviewLabel: '',
						type: []
					};
				})
			},
			// 取消新增
			cancelAdd() {
				this.AddVisible = false;
				CKEDITOR.instances.editorAdd.setData("")
				this.formLabelAdd = {
					name: '',
					greatNumber: '',
					original: '',
					reviewLabel: '',
					type: []
				}
				this.tempListImgUrl = '';
				this.tempBannerImgUrl = '';
			},
			// 表格多选框change
			tableSelect(selection) {
				let tempArr = [];
				if (selection.length > 0) {
					selection.forEach(item => {
						tempArr.push(item.id)
					})
				} else if (selection.length == 0) {
					this.checkedRowId = ''
				}
				this.checkedRowId = tempArr.join(',')
			},
			// 批量上线
			batchOnline() {
				if (this.checkedRowId) {
					this.$axios.post(`/management/admin/beauty-appraisal!batchOnLine.action?ids=${this.checkedRowId}&online=0`).then(
						res => {
							this.$message.success('批量上线成功')
							this.getTableData(`/management/admin/beauty-appraisal!list.action`, this.page, this.row, this.tempId)
						})

				} else {
					this.$message.error('没有选中的行')
				}
			},
			// 批量下线
			batchOffline() {
				// /management/admin/beauty-appraisal!batchOffLine.action?ids=231,230&online=1
				if (this.checkedRowId) {
					this.$axios.post(`/management/admin/beauty-appraisal!batchOffLine.action?ids=${this.checkedRowId}&online=1`).then(
						res => {
							this.$message.success('批量下线成功')
							this.getTableData(`/management/admin/beauty-appraisal!list.action`, this.page, this.row, this.tempId)
						})
				} else {
					this.$message.error('没有选中的行')
				}
			},
			// 批量删除
			batchDelete() {
				this.$confirm('确定要进行批量删除么？').then(res => {
					if (this.checkedRowId) {
						this.$axios.post(`/management/admin/beauty-appraisal!batchDelete.action?ids=${this.checkedRowId}`).then(res => {
							this.$message.success('批量删除成功')
							this.getTableData(`/management/admin/beauty-appraisal!list.action`, this.page, this.row, this.tempId)
						})
					} else {
						this.$message.error('没有选中的行')
					}
				})
			},
			// 提交搜索
			onSubmitSearch() {
				console.log('提交搜索项目');
			},
			// 复制H5页面路径
			copyH5Url(row) {
				var Url = row.url;
				if(Url){
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
				}else{
					this.$message.error('还没有生成H5页面，请点击生成H5再试')
				}
			},
			// 树形控件操作
			handleNodeClick(a, b, c) {
				this.tempId = a.id;
				this.getTableData(`/management/admin/beauty-appraisal!list.action`, 1, 10, a.id)
			},
			// 上传操作
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.imgDialogVisible = true;
			},
			beforeUpload(file) {
				this.imgData.FileName = file.name;
				this.imgData.imgFile = file
			},
			handleRemove(file, fileList) {
				this.tempImgUrl = '';
			},
			handleRemoveListPic() {
				this.tempListImgUrl = ''
			},
			handleRemoveBannerPic() {
				this.tempBannerImgUrl = ''
			},
			uploadListImgSuccess(res, file, fileList) {
				this.tempListImgUrl = res.url;
				// 清空上传图片参数
				this.imgData = {
					FileName: '',
					imgFile: null
				}
			},
			uploadBannerImgSuccess(res, file, fileList) {
				this.tempBannerImgUrl = res.url;
				// 清空上传图片参数
				this.imgData = {
					FileName: '',
					imgFile: null
				}
			},
			// 表格操作
			// 编辑
			edit(index, row) {
				console.log(row)
				var that = this;
				that.editDialogVisible = true;
				this.formatTreeData(_ => {})
				var tempObj = {};
				// 格式化row格式填充表单
				tempObj = {
					id: row.id,
					name: row.name,
					greatNumber: row.greatNumber,
					original: row.original,
					reviewLabel: row.reviewLabel,
					image: row.image,
					bannerImage: row.bannerImage,
					text: row.text
				};
				setTimeout(function() {
					that.textData = row.text;
				}, 100);
				tempObj.type = [];
				if (row.categoryId) {
					let arr = row.categoryId.split(',');
					if (arr.length > 0) {
						for (let i = 0; i < arr.length; i++) {
							tempObj.type.push(Number(arr[i]))
						}
					}
				}
				that.editFormData = tempObj
				// 显示图片
				let testExp = /http.*?(\.png|\.jpg)/gi;
				if (row.image) {
					this.editListPicFileList = [{
						name: '列表图片',
						url: row.image.match(testExp)[0]
					}]
					this.tempListImgUrl = row.image.match(testExp)[0]
				}
				if (row.bannerImage) {
					this.editBannerPicFileList = [{
						name: 'banner图片',
						url: row.bannerImage.match(testExp)[0]
					}]
					this.tempBannerImgUrl = row.bannerImage.match(testExp)[0]
				}
			},
			// 取消编辑
			cancelEdit() {
				this.editDialogVisible = false;
				// 清空所有选项
				this.editFormData = {
					name: '',
					greatNumber: '',
					original: '',
					reviewLabel: '',
					type: []
				}
				this.textData = '';
				this.editListPicFileList = [];
				this.editBannerPicFileList = [];
			},
			// 提交编辑
			handleEdit() {
				let editorhtml = this.$refs.editorCompent.getEditorData();//获取文本编辑器内容
				var testObj = {};
				for (var key in this.editFormData) {
					if (key != 'type' && key != 'id') {
						testObj[key] = this.editFormData[key]
					}
				}
				if (this.tempListImgUrl) {
					testObj.image = `<img src="${this.tempListImgUrl}" alt="" />`
				} else {
					testObj.image = ''
				}
				if (this.tempBannerImgUrl) {
					testObj.bannerImage = `<img src="${this.tempBannerImgUrl}" alt="" />`
				} else {
					testObj.bannerImage = ''
				}
				testObj.text=editorhtml;
				var categoryIdString = '';
				if (this.editFormData.type.length > 0) {
					for (let i = 0; i < this.editFormData.type.length; i++) {
						categoryIdString += `&categoryId=${this.editFormData.type[i]}`
					}
				}
				let paramsStr = this.$qs.stringify(testObj) + categoryIdString
				console.log(testObj)
				this.$axios.post(`/management/admin/beauty-appraisal!save.action?id=${this.editFormData.id}`, paramsStr).then(res => {
					this.getTableData('/management/admin/beauty-appraisal!list.action', this.page, this.row);
					this.editDialogVisible = false;
					this.$message.success('修改数据成功')
					this.textData='';
					this.tempListImgUrl = '';
					this.tempBannerImgUrl = '';
					this.editListPicFileList = [];
					this.editBannerPicFileList = [];
					this.editFormData = {
						name: '',
						greatNumber: '',
						original: '',
						reviewLabel: '',
						type: []
					};
				})
			},
			// 删除
			deleteRow(index, row) {
				this.$confirm("确认删除？")
					.then(_ => {
						this.$axios.get(`/management/admin/beauty-appraisal!delete.action?id=${row.id}`).then(res => {
							this.$message.success('删除成功！')
							this.getTableData(`/management/admin/beauty-appraisal!list.action`, this.page, this.row, this.tempId)
						})
					})
					.catch(_ => {});
			},
			// 切换状态
			switchOnline(index) {
				let status = this.tableData[index].online == 0 ? 1 : 0;
				this.$axios.post(`/management/admin/beauty-appraisal!online.action?id=${this.tableData[index].id}&online=${status}`)
					.then(
						res => {
							this.$message.success('切换上下线状态成功')
							this.getTableData(`/management/admin/beauty-appraisal!list.action`, this.page, this.row, this.tempId)
						})
			},
			// 切换置顶状态
			switchTop(index) {
				let status = this.tableData[index].sticky == 0 ? 1 : 0;
				this.$axios.post(`/management/admin/beauty-appraisal!sticky.action?id=${this.tableData[index].id}&sticky=${status}`)
					.then(
						res => {
							this.$message.success('切换置顶状态成功')
							this.getTableData(`/management/admin/beauty-appraisal!list.action`, this.page, this.row, this.tempId)
						})
			},
			// 创建H5页面
			creatH5(index, row) {
				this.$axios.post(`/management/admin/beauty-appraisal!saveHtml.action?id=${row.id}`).then(
					res => {
						if (res.status == 200) {
							this.$message.success('H5页面创建成功');
							this.getTableData(`/management/admin/beauty-appraisal!list.action`, this.page, this.row, this.tempId)
						} else {
							this.$message.error('好像出了点问题-.-！')
						}
					})
			},
			// 更新排序
			updataSort(index, row) {
				this.$axios.post(`/management/admin/beauty-appraisal!updateTime.action?id=${row.id}`).then(
					res => {
						if (res.status == 200) {
							this.$message.success('排序更新成功')
						} else {
							this.$message.error('好像出了点问题-.-！')
						}
					})
			},
			// 产品管理
			checkProduct(index, row) {
				this.productDialogVisible = true;
				this.productRowId = row.id;
				this.getProductData(this.productPage, this.productRow, row.id);
			},
			addProduct() {
				this.addProductDialogVisible = true;
				this.getColorProductData(1, 10)
			},
			cancelAddProduct() {
				this.addProductDialogVisible = false;
				this.addproductForm = {};
			},
			handleAddProduct() {
				let tempObj = {};
				tempObj.colorName = this.addproductForm.name;
				if (this.addproductForm.productColor.length > 0) {
					let colorString = this.addproductForm.productColor.join(',');
					tempObj.productId = colorString
				}
				this.$axios.post(
					`/management/admin/beauty-appraisal-product-relation!save.action?beautyAppraisalId=${this.productRowId}`, this.$qs
					.stringify(tempObj)).then(res => {
					this.$message.success('新增成功！');
					this.getProductData(this.productPage, this.productRow, this.productRowId);
					this.addProductDialogVisible = false;
					this.addproductForm = {
						productColor: [],
						name: ''
					};
				})
			},
			deleteProduct(index, row) {
				this.$confirm('确定删除产品么？').then(res => {
					this.$axios.get(
						`/management/admin/beauty-appraisal-product-relation!delete.action?id=${row.id}&beautyAppraisalId=${this.productRowId}`
					).then(
						_ => {
							this.$message.success('删除成功');
							this.getProductData(this.productPage, this.productRow, this.productRowId);
						}).catch(e => {
						this.$message.error('好像出了点问题！-.-！')
					})
				})
			},
			editProduct(index, row) {
				this.editProductDialogVisible = true;
				this.getColorProductData(1, 10);
				this.innerProductRowId = row.id;
				this.editProductForm.productColor = [];
				if (row.productId.length > 0) {
					for (let i = 0; i < row.productId.length; i++) {
						this.editProductForm.productColor.push(Number(row.productId[i]))
					}
				}
				this.editProductForm.name = row.colorName;

			},
			cancelEditProduct() {
				this.editProductDialogVisible = false;
				this.editProductForm = {
					productColor: [],
					name: ''
				}

			},
			handleEditProduct() {
				// /management/admin/beauty-appraisal-product-relation!delete.action?id=${row.id}&beautyAppraisalId=${this.productRowId}
				console.log(this.editProductForm)
				let tempObj = {};
				tempObj.colorName = this.editProductForm.name;
				if (this.editProductForm.productColor.length > 0) {
					let colorString = this.editProductForm.productColor.join(',');
					tempObj.productId = colorString
				}
				this.$axios.post(
					`/management/admin/beauty-appraisal-product-relation!save.action?id=${this.innerProductRowId}&beautyAppraisalId=${this.productRowId}`,
					this.$qs
					.stringify(tempObj)).then(res => {
					this.$message.success('编辑成功！');
					this.getProductData(this.productPage, this.productRow, this.productRowId);
					this.editProductDialogVisible = false;
					this.editProductForm = {
						productColor: [],
						name: ''
					};
				})
			},
			// 评论管理
			checkComment(index, row) {
				// this.getUserData(this.userPage, this.userRow);
				this.checkCommentDialogVisible = true;
				this.commentRowId = row.id
				this.getCommentData(this.commentPage, this.commentRow, row.id)
			},
			addComment(index, row) {
				// 获取用户数据
				this.getUserData(this.userPage, this.userRow);
				// this.addCommentForm.id = row.id
				this.addCommentDialogVisible = true
			},
			cancelAddComment() {
				this.addCommentForm = {};
				this.isSecondComment = false;
				this.addCommentDialogVisible = false
			},
			checkAddComment(index, row) {
				this.isSecondComment = true;
				this.getUserData(this.userPage, this.userRow);
				this.innerCommentRowId = row.id;
				this.addCommentDialogVisible = true;
			},
			handleAddComment() {
				// 判断是回复评论还是直接评论
				if (this.isSecondComment) {
					this.addCommentDialogVisible = false;
					this.$axios.post(
						`/management/admin/comment!save.action?detailsId=${this.commentRowId}&id=${this.innerCommentRowId}&type=2`, this
						.$qs.stringify(
							this.addCommentForm)).then(res => {
						this.getCommentData(this.commentPage, this.commentRow, this.commentRowId);
						this.isSecondComment = false;
						this.innerCommentRowId = '';
						this.addCommentForm = {};
						this.addCommentDialogVisible = false;
					})
				} else {
					let tempObj = this.addCommentForm;
					this.addCommentDialogVisible = false;
					this.$axios.post(`/management/admin/comment!save.action?detailsId=${this.commentRowId}&type=2`, this.$qs.stringify(
						tempObj)).then(
						res => {
							this.$message.success('添加成功！')
							this.getCommentData(this.commentPage, this.commentRow, this.commentRowId);
							this.addCommentForm = {}
						}).catch(e => {
						this.$message.error('出了点问题-.-！')
					})
				}

			},
			deleteComment(index, rows) {
				this.$confirm("确认删除？").then(res => {
					this.$axios.get(
						`/management/admin/comment!delete.action?id=${rows[index].id}&detailsId=${rows[index].detailsId}&type=2`).then(
						res => {
							this.$message.success('删除成功');
							this.getCommentData(this.commentPage, this.commentRow, rows[index].detailsId)
						})
				}).catch(_ => {
					this.$message.error('出了点问题-.-！')
				})
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
			// 用户分页
			changeUserPage(val) {
				this.userPage = val;
				this.getUserData(val, this.userRow)
			},
			changeUserSize(val) {
				this.userRow = val;
				this.getUserData(this.userPage, val)
			},
			// 评论分页
			changeCommentPage(val) {
				this.commentPage = val;
				this.getCommentData(val, this.commentRow, this.commentRowId)
			},
			changeCommentSize(val) {
				this.commentRow = val;
				this.getCommentData(this.commentPage, val, this.commentRowId)
			},
			// 产品分页
			changeProductPage(val) {
				this.productPage = val;
				this.getProductData(val, this.productRow, this.productRowId)
			},
			changeProductSize(val) {
				this.productRow = val;
				this.getProductData(this.productPage, val, this.productRowId)
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
			// 数据格式化
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
				this.loading = true;
				this.$axios.get(url, {
					params: {
						page: page,
						rows: row,
						categoryId: id ? id : ''
					}
				}).then(res => {
					this.totalNum = res.data.total;
					this.tableData = res.data.rows;
					this.loading = false
				})
			},
			// 用户数据
			getUserData(page, row) {
				this.$axios.get('/management/admin/beauty-user!comboGridlist.action', {
					params: {
						page: page,
						rows: row
					}
				}).then(res => {
					this.userTotalNum = res.data.total
					this.userOptions = res.data.rows
				})
			},
			// 评论数据
			getCommentData(page, row, id) {
				this.$axios.get(`/management/admin/comment!list.action?detailsId=${id}&type=2`, {
					params: {
						page: page,
						rows: row
					}
				}).then(res => {
					if (res.data.total > 0) {
						this.commentTotalNum = res.data.total
						this.commentTableData = res.data.rows;

					} else {
						this.commentTotalNum = 0
						this.commentTableData = [];
					}
				})
			},
			// 产品数据
			getProductData(page, row, id) {
				this.$axios.get(`/management/admin/beauty-appraisal-product-relation!list.action?beautyAppraisalId=${id}`, {
					params: {
						page: page,
						rows: row
					}
				}).then(res => {
					if (res.data.total > 0) {
						this.productTotalNum = res.data.total
						this.productTableData = res.data.rows;
					} else {
						this.productTotalNum = 0
						this.productTableData = [];
					}
				})
			},
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
			// 序列化树形数据
			formatTreeData(callback) {
				// 序列化标签数据用于表单
				var tempTagArr = [];
				this.treeData.forEach(item2 => {
					var tempObj = {};
					tempObj = {
						value: item2.id,
						label: item2.lable,
						children: item2.children
					}
					var tempChildrenArr = []
					if (item2.children.length > 0) {
						item2.children.forEach(item3 => {
							var tempChildrenObj = {};
							tempChildrenObj = {
								value: item3.id,
								label: item3.lable
							}
							tempChildrenArr.push(tempChildrenObj)
						})
						tempObj.children = tempChildrenArr
					}
					tempTagArr.push(tempObj)
				})
				this.typeOptions = tempTagArr
				callback();
			}
		},
		mounted() {
			var _this = this;
			// _this.initCKEditor();
			_this.getTableData('/management/admin/beauty-appraisal!list.action', 1, 10);
			// 获取教程栏目树形控件数据
			_this.$axios.get('/management/admin/category!categoryTree.action').then(res => {
				console.log(res.data)
				let tempList = res.data.map(item => {
					return {
						id: item.id,
						lable: item.text,
						children: []
					}
				})
				for (let i = 0; i < tempList.length; i++) {
					_this.$axios.get(`/management/admin/category!categoryTree.action?id=${tempList[i].id}`).then(res2 => {
						let temp = res2.data.map(item => {
							return {
								lable: item.text,
								id: item.id
							}
						})
						tempList[i].children = temp
					})
				}
				_this.treeData = tempList;
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
<style>
	/* 文本编辑器中模板样式 */
	.modelList {
		font-size: 20px;
		line-height: 40px;
		text-align: center;
		margin-bottom: 20px;
	}

	#cke_editor {
		margin-top: 40px;
	}

	.modelItem {
		border: 1px solid #ccc;
		margin: 10px;
		padding: 10px 0;
		box-sizing: border-box;
		cursor: pointer;
		transition: all 0.5s;
	}

	.modelItem:hover {
		box-shadow: 0 0 5px 5px #eee;
	}

	#title {
		margin: 2.1rem 0 1rem 1.4rem;
		font-size: 1.9rem;
		color: #333333;
		line-height: 2.6rem;
	}

	#time {
		margin: 1rem 1.6rem 0;
	}

	#time span {
		font-size: 1.1rem;
		color: #999999;
		margin-right: 1.6rem;
	}

	#time img {
		width: .75rem;
		height: .56rem;
	}

	.description {
		margin: .8rem 1.5rem 0;
	}

	.description p {
		font-size: 1.5rem;
		color: #999999;
		text-align: justify;
		line-height: 3rem;
	}

	.question {
		margin-top: 1.6rem;
		font-size: 1.6rem;
		font-weight: bold;
		color: #A87BFF;
		text-align: center;
	}

	.question .line {
		display: inline-block;
		width: 6.6rem;
		height: .1rem;
		background-color: #AE83FF;
		margin-bottom: .4rem;
	}

	.question .block {
		display: inline-block;
		width: 0.8rem;
		height: 0.8rem;
		background-color: #AE83FF;
		transform: rotate(-315deg);
	}

	.question .line:nth-of-type(1) {
		margin-right: 1.5rem;
	}

	.question .line:nth-of-type(5) {
		margin-left: 1.5rem;
	}

	.question .block:nth-of-type(2) {
		margin-right: .8rem;
	}

	.question .block:nth-of-type(4) {
		margin-left: .8rem;
	}

	.answer {
		margin: 0.8rem 1.5rem 0;
		font-size: 1.5rem;
		color: #666666;
		letter-spacing: 0;
		line-height: 3rem;
	}

	.product2 {
		margin: 1.9rem 1.5rem 3rem;
		text-align: center;
	}

	.product2 img {
		width: 20rem;
		height: 20rem;
	}

	.product3 {
		margin: 3.5rem 1.5rem 0;
		text-align: center;
	}

	.answer p {
		text-align: left;
		margin-bottom: 1rem;
		text-align: justify;
	}

	.answer span {
		font-weight: 700;
		color: #2A2A2A;
	}

	.sub-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 3rem;
	}

	.subtitle {
		position: relative;
		display: table-cell;
		text-align: center;
		margin-top: 4.5rem;
		height: 2.7rem;
		border: 1px solid #663ABC;
		background-color: #fff;
		border-radius: .3rem;
	}

	.subtitle-front {
		position: absolute;
		left: .2rem;
		top: .12rem;
		background-color: #DECCFF;
		width: 100%;
		height: 2.7rem;
		border: 1px solid #663ABC;
		border-radius: .3rem;
		z-index: -1;
	}

	.subtitle p {
		line-height: 2.7rem;
		letter-spacing: .3rem;
		color: #C7ABFF;
		padding: 0 1rem;
		font-weight: 900;
		font-size: 1.7rem;
	}

	.subtitle span {
		position: absolute;
		top: .2rem;
		width: .1rem;
		height: .1rem;
		border: .1rem solid #663ABC;
		border-radius: 50%;
		background-color: #FFE300;
	}

	.point-left {
		left: .5rem;
	}

	.point-right {
		right: .5rem;
	}

	.point-left::before,
	.point-right::before {
		content: "";
		width: .1rem;
		height: 1.7rem;
		background-color: #C7ABFF;
		position: absolute;
		bottom: .2rem;
		left: 0;
	}

	.comments-content {
		margin: 2.1rem 1.5rem 0;
		box-sizing: border-box;
		background: #F7F7F7;
		padding: .3rem;
	}

	.comments-content img {
		display: block;
	}

	.naked {
		margin: 1rem;
		box-shadow: 0 1px 6px 1px#F5F1FD;
		box-sizing: border-box;
		padding: 1.5rem 1rem 3.7rem;
	}

	.naked img {
		display: block;
	}

	.naked span {
		color: #666;
		margin-top: 1rem;
		font-size: 1.3em;
		float: right;
	}

	.column {
		margin: 1.5rem 1.5rem;
		color: #A87BFF;
		font-size: 1.7rem;
		font-weight: 500;
	}

	.column i {
		font-size: 1.7rem;
	}

	.column span {
		display: inline-block;
		margin-bottom: 1rem;
	}

	.product-title {
		position: relative;
		margin: 4.2rem 1.5rem 3.7rem;
		text-align: justify;
		color: #666666;
	}

	.ball1,
	.ball2,
	.ball3 {
		position: absolute;
		background-color: #A87BFF;
		opacity: .2;
		border-radius: 50%;
	}

	.ball1 {
		width: 4.5rem;
		height: 4.5rem;
		top: -1.5rem;
		left: 0;
	}

	.ball2 {
		width: 2rem;
		height: 2rem;
		top: -1.67rem;
		left: 3.3rem;
	}

	.ball3 {
		width: 0.9rem;
		height: 0.9rem;
		top: -0.83rem;
		left: 5.8rem;
	}

	.product-title .main-title {
		position: relative;
		display: inline-block;
		left: 50%;
		transform: translateX(-50%);
		padding-left: 3.5rem;
		font-size: 1.7rem;
	}

	h3 {
		margin: 1.6rem 1.6rem 0;
		color: #A87BFF;
		font-size: 1.7rem;
		line-height: 2.4rem;
	}

	.column p {
		font-size: 1.3rem;
		font-weight: 400;
		color: #999999;
		text-align: justify;
		line-height: 3.6rem;
	}

	.column img {
		margin-bottom: 1rem;
	}

	.column-svg img {
		width: 1rem;
		margin: 0;
	}

	.original {
		margin: 7rem 1.4rem 4.6rem;
		font-size: 1.2rem;
		color: #999;
	}

	.detail {
		margin: 0 1.5rem;
		color: #A87BFF;
	}

	.detail-title {
		margin-bottom: -1.5rem;
	}

	.detail p {
		color: #2A2A2A;
		font-size: 1.5rem;
		text-align: justify;
		line-height: 3.6rem;
	}

	.detail span {
		font-size: 1.5rem;
	}

	.product1 {
		margin: 2.8rem 1.5rem;
		text-align: center;
	}

	.epilogue {
		margin: 4rem 1.5rem 2rem;
		font-size: 1.7rem;
		color: #A87BFF;
		line-height: 3rem;
	}

	.bottomLabel {
		margin: 0 1.5rem 6.7rem;
	}

	.bottomLabel a {
		display: inline-block;
		margin-right: 1.5rem;
		padding: .4rem 1.3rem;
		border: .1rem solid #CCCCCC;
		border-radius: .4rem;
		font-size: 1.1rem;
		color: #999999;
	}
</style>
