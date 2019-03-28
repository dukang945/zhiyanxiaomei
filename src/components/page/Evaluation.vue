<template>
	<div class="evaluationContent">
		<el-row>
			<el-col :span="18">
				<div class="btnGroup">
					<el-button type="primary" size='small' @click="add">新增</el-button>
					<el-button type="primary" size='small' @click="batchOnline">批量上线</el-button>
					<el-button type="primary" size='small' @click="batchOffline">批量下线</el-button>
					<el-button type="primary" size='small' @click="batchLabel">批量加标签</el-button>
					<el-button type="danger" size='small' @click="batchDelete">批量删除</el-button>
					<el-button type="primary" plain size='small' @click="freshSearch">刷新ElasticSearch</el-button>
					<el-button type="primary" plain size='small' @click="freshH5">刷新HTML</el-button>
					<el-dialog title="新增测评" :visible="AddVisible" width="60%" @close='AddVisible=false;cancelAdd()'>
						<el-form :label-position="labelPosition" label-width="120px" :model="formLabelAdd">
							<el-form-item label="标题">
								<el-input v-model="formLabelAdd.name"></el-input>
							</el-form-item>
							<el-form-item label="搜索标签">
								<el-input v-model='searchLabel' @input='getLabelList' clearable></el-input>
								<el-table :data="labelTableData" @row-click='selectLabel' border style="width: 100%" v-loading="loading" v-if='searchLabel'
								 class='labelTable'>
									<el-table-column prop="id" label="id" width="50" align='center'>
									</el-table-column>
									<el-table-column prop="name" label="标题" align='center'>
									</el-table-column>
									<el-table-column prop="enname" label="英文标题" align='center'>
									</el-table-column>
									<el-table-column prop="labelName" label="上级标签" align='center'>
									</el-table-column>
								</el-table>
								<div class="labelChoosed">
									已选标签：<span v-for="(item,key) in choosedLabelList">{{item.name?item.name:item.enname}}
										<i class="el-icon-error" @click="deleteLabel(key)"></i></span>
								</div>
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
							<el-form-item label="来源">
								<el-input v-model="formLabelAdd.source"></el-input>
							</el-form-item>
							<el-form-item label="列表图片">
								<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
								 :before-upload='beforeUpload' :on-success="uploadListImgSuccess" :on-preview="handlePictureCardPreview"
								 :on-remove="handleRemoveListPic" :file-list="addFileList" list-type="picture">
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
								</el-upload>
							</el-form-item>
							<el-form-item label="banner图片">
								<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
								 :before-upload='beforeUpload' :on-success="uploadBannerImgSuccess" :on-preview="handlePictureCardPreview"
								 :on-remove="handleRemoveBannerPic" :file-list="addFileList" list-type="picture">
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
								</el-upload>
							</el-form-item>
							<el-form-item label="视频">
								<el-upload action="/management/admin/kcupload!uploadVideo.action?type=makeupvideo_path&dir=media" :data='videoData'
								 :before-upload='beforeUploadVideo' :on-success="uploadSuccessVideo" :on-remove="handleRemoveVideo">
									<el-button size="small" type="primary" @click='videoHandle("add")'>点击上传</el-button>
									<span slot="tip" class="el-upload__tip" style="margin-left: 20px;">只能上传mp4或flv格式文件，为保证速度，请尽量压缩文件</span>
								</el-upload>
							</el-form-item>
							<el-form-item label="编辑页面内容">
								<el-row>
									<el-col :span='24'>
										<textarea id="editorAdd" rows="10" cols="80"></textarea>
									</el-col>
								</el-row>
							</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button @click="cancelAdd">取 消</el-button>
							<el-button type="primary" plain @click="saveDraft">保存草稿</el-button>
							<el-button type="primary" @click="handleAdd">提交审核</el-button>
						</span>
					</el-dialog>
				</div>
			</el-col>
			<el-col :span="6">
				<el-form :inline="true" :model="searchForm" class="right-search">
					<el-form-item>
						<el-input v-model="searchForm.text" placeholder="请输入搜索内容" @keyup.enter.native='onSubmitSearch'></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size='small' @click="onSubmitSearch" icon="el-icon-search">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span='2' class='treeBox'>
				<span class="treeTitle">测评分类列表</span>
				<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			</el-col>
			<el-col :span='22'>
				<!-- <el-table :data="tableData" border style="width: 99%" class='table' max-height="630" @select='tableSelect'
				 v-loading="loading" :row-class-name="tableRowClasName"> -->
				<el-table :data="tableData" border style="width: 100%" class='table' max-height="630" @select='tableSelect' @select-all='tableSelectAll'
				 v-loading="loading">
					<el-table-column type="selection" width="50" align='center'></el-table-column>
					<el-table-column prop="id" label="id" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="name" label="标题" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="labelName" label="标签" width="200" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="creatUser" label="创建人" width="100" align='center' :filters="userList" :filter-method="filterUser"
					 filter-placement="bottom-end">
					</el-table-column>
					<el-table-column prop="online" label="审核状态" width="100" align='center' :formatter='getStatus' :filters="satusList"
					 :filter-method="filterStatus" filter-placement="bottom-end">
					</el-table-column>
					<el-table-column prop="pageView" label="浏览量" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" width="100" align='center' :formatter='getTime'
					 :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="操作" fixed="right" align='center' width='580'>
						<template slot-scope="scope">
							<el-button size="small" type="primary" @click="edit(scope.$index, scope.row)" icon='el-icon-edit'>编辑</el-button>
							<el-button size="small" type="primary" @click="checkH5(scope.$index, scope.row)" icon='el-icon-edit-outline'>预览</el-button>
							<el-button size="small" type="primary" @click="switchOnline(scope.$index, scope.row)" class="el-icon-sort">{{tableData[scope.$index].online==0?'下线':'上线'}}</el-button>
							<!-- <el-button size="small" type="success" @click="switchTop(scope.$index, scope.row)">{{tableData[scope.$index].sticky==0?'置顶':'取消置顶'}}</el-button> -->
							<el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" size='small' type="danger" class="el-icon-delete">删除</el-button>
							<!-- <el-button size="small" type="primary" @click="updataSort(scope.$index, scope.row)" icon='el-icon-sort'>更新排序</el-button> -->
							<el-button size="small" type="primary" @click="checkProduct(scope.$index, scope.row)">产品管理</el-button>
							<el-button size="small" type="primary" @click="checkComment(scope.$index, scope.row)">评论管理</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Pagination :totalNum='totalNum' @change_Page='changePage' @change_Size='changeSize'></Pagination>
			</el-col>
		</el-row>
		<!-- 编辑表单 -->
		<el-dialog title="编辑" :visible.sync="editDialogVisible" width="60%" :before-close="handleClose" @open='openEdit'>
			<el-form :label-position="labelPosition" label-width="120px" :model="editFormData">
				<el-form-item label="标题">
					<el-input v-model="editFormData.name"></el-input>
				</el-form-item>
				<el-form-item label="搜索标签">
					<el-input v-model='searchLabel' @input='getLabelList' clearable></el-input>
					<el-table :data="labelTableData" @row-click='selectLabel' border style="width: 100%" v-loading="loading" v-if='searchLabel'
					 class='labelTable'>
						<el-table-column prop="id" label="id" width="50" align='center'>
						</el-table-column>
						<el-table-column prop="name" label="标题" align='center'>
						</el-table-column>
						<el-table-column prop="enname" label="英文标题" align='center'>
						</el-table-column>
						<el-table-column prop="labelName" label="上级标签" align='center'>
						</el-table-column>
					</el-table>
					<div class="labelChoosed">
						已选标签：<span v-for="(item,key) in choosedLabelList">{{item.name?item.name:item.enname}}
							<i class="el-icon-error" @click="deleteLabel(key)"></i></span>
					</div>
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
				<el-form-item label="来源">
					<el-input v-model="editFormData.source"></el-input>
				</el-form-item>
				<el-form-item label="列表图片">
					<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData' :before-upload='beforeUpload'
					 :on-success="uploadListImgSuccess" :on-remove="handleRemoveListPic" :file-list="editListPicFileList" :on-preview="handlePictureCardPreview"
					 list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="banner图片">
					<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData' :before-upload='beforeUpload'
					 :on-success="uploadBannerImgSuccess" :on-remove="handleRemoveBannerPic" :on-preview="handlePictureCardPreview"
					 :file-list="editBannerPicFileList" list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="视频">
					<el-upload action="/management/admin/kcupload!uploadVideo.action?type=makeupvideo_path&dir=media" :data='videoData'
					 :before-upload='beforeUploadVideo' :on-success="uploadSuccessVideo" :on-remove="handleRemoveVideo" :file-list='editVideo'>
						<el-button size="small" type="primary" @click='videoHandle("edit")'>点击上传</el-button>
						<span slot="tip" class="el-upload__tip" style="margin-left: 20px;">只能上传mp4或flv格式文件，为保证速度，请尽量压缩文件</span>
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
		<el-dialog title="评论管理" :visible.sync="checkCommentDialogVisible" width="60%">
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
		<el-dialog title="产品管理" :visible.sync="productDialogVisible" width="60%">
			<el-button type="primary" @click="addProduct" size='small' style='margin-bottom: 20px;'>新增产品</el-button>
			<el-table :data="productTableData" border style="width: 100%">
				<el-table-column type="index" label="序号" width="50" align='center'>
				</el-table-column>
				<el-table-column prop="id" label="编号" width="100" align='center'>
				</el-table-column>
				<el-table-column prop="beautyAppraisalId" label="测评ID" width='100' align='center'>
				</el-table-column>
				<el-table-column prop="productId" label="产品ID" width='100' align='center' :formatter='getProductIdStr' :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column prop="productColor" label="色号名称" align='center' :formatter='getProductColorStr' :show-overflow-tooltip="true">
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
					<el-select v-model="editProductForm.productColor" multiple placeholder="请选择色号" filterable remote :filter-method='(q)=>{
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
				<!-- <el-form-item label='色号名称'>
					<el-input v-model="editProductForm.name"></el-input>
				</el-form-item> -->
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
		<!-- 批量增加标签弹框 -->
		<el-dialog title="批量增加标签" :visible.sync="batchAddLabelDialogVisible" width="50%">
			<el-form :label-position="labelPosition" label-width="80px">
				<el-form-item label="搜索标签">
					<el-input v-model='searchLabel' @input='getLabelList' clearable></el-input>
					<el-table :data="labelTableData" @row-click='selectLabel' border style="width: 100%" v-loading="loading" v-if='searchLabel'
					 class='labelTable'>
						<el-table-column prop="id" label="id" width="50" align='center'>
						</el-table-column>
						<el-table-column prop="name" label="标题" align='center'>
						</el-table-column>
						<el-table-column prop="enname" label="英文标题" align='center'>
						</el-table-column>
						<el-table-column prop="labelName" label="上级标签" align='center'>
						</el-table-column>
					</el-table>
					<div class="labelChoosed">
						已选标签：<span v-for="(item,key) in choosedLabelList">{{item.name?item.name:item.enname}}
							<i class="el-icon-error" @click="deleteLabel(key)"></i></span>
					</div>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancelAddLabel">取消</el-button>
				<el-button type="primary" @click="addLabel">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '@/components/module/Pagination.vue'
	import Clipboard from 'clipboard'
	import CKEDITOR from 'CKEDITOR';
	import Editor from '@/components/module/editor.vue'
	export default {
		name: 'editorAdd',
		data() {
			return {
				searchForm: {
					text: ''
				}, //搜索框
				labelTableData: [], //标签表格数据
				searchLabel: '', //搜索标签输入框
				choosedLabelList: [], //已选中标签列表
				beautiColorTableData: [], //色号表格数据
				searchBeautiColor: '', //搜索色号输入框
				choosedBeautiColorList: [], //已选中色号列表
				formLabelAdd: {}, //新增教程表单
				// searchColor: '', //色号搜索内容
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
				imgDialogVisible: false,
				batchAddLabelDialogVisible: false,
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
				tagOptions: [],
				defaultProps: {
					children: 'children',
					label: 'text'
				},
				tempId: '',
				// 图片上传
				imgData: {
					FileName: '',
					imgFile: null
				},
				videoData:{
					imgFileFileName:'',
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
				editVideo:[],
				dialogImageUrl: '',
				imgDialogVisible: false,
				productRowId: '', //点击产品管理行id
				innerProductRowId: '', // 内层产品行id
				commentRowId: '', //点击评论管理行id
				innerCommentRowId: '', // 内层产品行id
				checkedRowId: '',
				// 文本编辑器
				hasEditor: false,
				textData: '', //这是编辑表单文本编辑器内容
				showTreeBox: false, //显示树形结构
				selectId: [],
				userList: [], // 用户列表（用于筛选）
				satusList: [{
					value: 0,
					text: "上线"
				}, {
					value: 1,
					text: "下线"
				}, {
					value: 2,
					text: "草稿"
				}, {
					value: 3,
					text: "待审核"
				}, {
					value: 4,
					text: "已审核"
				}, {
					value: 5,
					text: "审核驳回"
				}, ], // 状态列表（用于筛选）
				videoPlace:''
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
			// 判断是否有选中
			edtorHasSelsct() {
				var data;
				var mySelection = CKEDITOR.instances.editorAdd.getSelection();
				if (CKEDITOR.env.ie) {
					mySelection.unlock(true);
					data = mySelection.getNative().createRange().text;
				} else {
					data = mySelection.getNative();
				}
				return data;
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
				this.choosedLabelList=[];
				let _this = this;
				_this.AddVisible = true;
				setTimeout(function() {
					if (_this.hasEditor) {
						return
					} else {
						_this.initCKEditor();
						_this.hasEditor = true;
					}
				}, 100)
				console.log('新增里面的options')
				console.log(_this.tagOptions)
			},
			// 保存草稿
			saveDraft(){
				
			},
			// 提交审核
			handleAdd() {
				// 格式化表单数据为参数所需类型
				var testObj = {};
				for (var key in this.formLabelAdd) {
					if (key != 'type' && key != 'labelId') {
						testObj[key] = this.formLabelAdd[key]
					}
				}
				if (this.tempListImgUrl) {
					testObj.image = `<img src="${this.tempListImgUrl}" alt="" />`
				}
				if (this.tempBannerImgUrl) {
					testObj.bannerImage = `<img src="${this.tempBannerImgUrl}" alt="" />`
				}

				var labelStr = '';

				if (this.choosedLabelList.length > 0) {
					for (let i = 0; i < this.choosedLabelList.length; i++) {
						labelStr += `&labelId=${this.choosedLabelList[i].id}`
					}
				}

				testObj.text = CKEDITOR.instances.editorAdd.getData();
				let paramsStr = this.$qs.stringify(testObj) + labelStr;
				console.log(testObj)
				this.$axios.post('/management/admin/beauty-appraisal!save.action', paramsStr).then(res => {
					this.getTableData('/management/admin/beauty-appraisal!list.action', this.page, this.row);
					this.AddVisible = false;
					this.tempListImgUrl = '';
					this.tempBannerImgUrl = '';
					this.formLabelAdd = {};
					this.choosedLabelList=[];
					this.selectId=[];
				})
			},
			// 取消新增
			cancelAdd() {
				this.AddVisible = false;
				CKEDITOR.instances.editorAdd.setData("")
				this.formLabelAdd = {}
				this.searchLabel='';
				this.tempListImgUrl = '';
				this.selectId=[];
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
			tableSelectAll(selection){
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
			freshSearch(){
// 				this.$axios.get('/management/admin/beauty-details!refreshHTML.action').then(res=>{
// 					console.log(res)
// 				})
			},
			freshH5(){
// 				this.$axios.get('/management/admin/beauty-details!refreshHTML.action').then(res=>{
// 					console.log(res)
// 				})
			},
			// 批量增加标签
			batchLabel() {
				if (this.checkedRowId) {
					this.batchAddLabelDialogVisible = true
					this.choosedLabelList=[];
				} else {
					this.$message.error('没有选中的行')
				}
			},
			// 提交增加标签
			addLabel() {
				if (this.choosedLabelList.length > 0) {
					console.log(this.choosedLabelList)
					var idString = '';
					for (let i = 0; i < this.choosedLabelList.length; i++) {
						if (i === (this.choosedLabelList.length - 1)) {
							idString += `labelId=${this.choosedLabelList[i].id}`
						} else {
							idString += `labelId=${this.choosedLabelList[i].id}&`
						}
					}
					this.$axios.post(`/management/admin/beauty-appraisal!batchAddLabel.action?ids=${this.checkedRowId}`, idString).then(
						res => {
							if (res.status === 200) {
								this.getTableData(`/management/admin/beauty-appraisal!list.action`, this.page, this.row, this.tempId)
								this.choosedLabelList = [];
								this.searchLabel = '';
								this.batchAddLabelDialogVisible = false;
							} else {
								this.batchAddLabelDialogVisible = false;
								this.$message.error('出了点问题-.-！')
							}
						})
				} else {
					this.$message.error('没有选中的标签')
				}
			},
			// 取消增加标签
			cancelAddLabel() {
				this.batchAddLabelDialogVisible = false;
				this.choosedLabelList = [];
				this.searchLabel = '';
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
				this.getTableData('/management/admin/beauty-appraisal!list.action', this.page, this.row, '', this.searchForm.text)
			},
			// 复制H5页面路径
// 			copyH5Url(row) {
// 				var Url = row.url;
// 				if (Url) {
// 					var clipboard = new Clipboard('.copyBtn', {
// 						text: function() {
// 							return Url;
// 						}
// 					});
// 					clipboard.on('success', e => {
// 						this.$message.success('复制成功')
// 						clipboard.destroy()
// 					})
// 					clipboard.on('error', e => {
// 						this.$message.error('浏览器不支持复制')
// 						clipboard.destroy()
// 					})
// 				} else {
// 					this.$message.error('还没有生成H5页面，请点击生成H5再试')
// 				}
// 			},
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
			// 视频上传
			videoHandle(str){
				this.videoPlace=str;
			},
			beforeUploadVideo(file) {
				this.videoData.imgFileFileName = file.name;
				this.videoData.imgFile = file
				console.log(file)
			},
			handleRemoveVideo(file, fileList) {
				// this.tempImgUrl = '';
				this.formLabelAdd.videoUrl='';
				this.editFormData.videoUrl='';
			},
			uploadSuccessVideo(res, file, fileList) {
				this.videoData.imgFileFileName = '';
				this.videoData.imgFile = null
				if(this.videoPlace=='add'){
					this.formLabelAdd.videoUrl=res.url
				}
				if(this.videoPlace=='edit'){
					this.editFormData.videoUrl=res.url
				}
			},
			// 表格操作
			// 编辑
			openEdit(){
				// this.textData = row.text;
				console.log('已打开编辑')
			},
			edit(index, row) {
				this.choosedLabelList=[];
				var that = this;
				that.editDialogVisible = true;
				var tempObj = {};
				// 格式化row格式填充表单
				tempObj = {
					id: row.id,
					name: row.name,
					greatNumber: row.greatNumber,
					original: row.original,
					image: row.image,
					bannerImage: row.bannerImage,
					text: row.text,
					source:row.source,
					labelId: row.labelName
				};
				setTimeout(function() {
					that.textData = row.text;
				}, 500);
				that.editFormData = tempObj
				// 显示图片
				let testExp = /http.*?(\.png|\.jpg|\.gif|\.jpeg)/gi;
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
				if (row.labelId) {
					let tempIdArr = row.labelId.split(',');
					let tempNameArr = row.labelName.split(',');
					for (let i = 0; i < tempIdArr.length; i++) {
						this.choosedLabelList.push({
							id: tempIdArr[i],
							name: tempNameArr[i],
							// enname:
						})
					}
				}
				// 显示视频截图
				if(row.videoUrl){
					this.editVideo=[{
						name:'评测视频',
						url:row.videoUrl.split('|')[1]
					}]
				}
			},
			// 取消编辑
			cancelEdit() {
				this.editDialogVisible = false;
				// 清空所有选项
				this.editFormData = {}
				this.textData = '';
				this.editListPicFileList = [];
				this.editBannerPicFileList = [];
				this.choosedLabelList=[];
				// this.resetLabel2()
			},
			// 提交编辑
			handleEdit() {
				let editorhtml = this.$refs.editorCompent.getEditorData(); //获取文本编辑器内容
				var testObj = {};
				for (var key in this.editFormData) {
					if (key != 'labelId' && key != 'id') {
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
				testObj.text = editorhtml;
				var labelIdString = '';
				if (this.choosedLabelList.length > 0) {
					for (let i = 0; i < this.choosedLabelList.length; i++) {
						labelIdString += `&labelId=${this.choosedLabelList[i].id}`
					}
				}
// 				else{
// 					this.$message.error('请至少绑定一个标签');
// 					return;
// 				}
				let paramsStr = this.$qs.stringify(testObj) + labelIdString
				console.log(testObj)
				this.$axios.post(`/management/admin/beauty-appraisal!save.action?id=${this.editFormData.id}`, paramsStr).then(res => {
					this.getTableData('/management/admin/beauty-appraisal!list.action', this.page, this.row);
					this.editDialogVisible = false;
					this.$message.success('修改数据成功')
					this.textData = '';
					this.tempListImgUrl = '';
					this.tempBannerImgUrl = '';
					this.editListPicFileList = [];
					this.editBannerPicFileList = [];
					this.editFormData = {};
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
// 			creatH5(index, row) {
// 				this.$axios.post(`/management/admin/beauty-appraisal!saveHtml.action?id=${row.id}`).then(
// 					res => {
// 						if (res.status == 200) {
// 							this.$message.success('H5页面创建成功');
// 							this.getTableData(`/management/admin/beauty-appraisal!list.action`, this.page, this.row, this.tempId)
// 						} else {
// 							this.$message.error('好像出了点问题-.-！')
// 						}
// 					})
// 			},
			checkH5(index,row){
				console.log(row)
				if(row.url){
					window.open(row.url);
				}else{
					this.$message.error('还没有生成H5地址……')
				}
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
			// 格式化表格数据
			getProductIdStr(row, column, idList){
				return idList.join(',')
			},
			getProductColorStr(row, column, colorList){
				return colorList.join(',')
			},
			addProduct() {
				this.addProductDialogVisible = true;
				this.getColorProductData(1, 10);
				// productColorOptions
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
				let _this=this;
				this.editProductDialogVisible = true;
				console.log(row)
				row.productColor.map(item=>{
					this.getColorProductData(1,10,item)
				})
				this.getColorProductData(1,10)
				let tempList=[];
				row.productColor.forEach(item=>{
					tempList.push({
						id:'',
						name:item
					})
				})
				row.productId.forEach((item,index)=>{
					tempList[index].id=item
				})
				// 异步填充表格数据
				this.innerProductRowId = row.id;
				setTimeout(function(){
					_this.editProductForm.productColor = [];
					if (row.productId.length > 0) {
						for (let i = 0; i < row.productId.length; i++) {
							_this.editProductForm.productColor.push(Number(row.productId[i]))
						}
					}
				},500)
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
				this.getTableData(`/management/admin/beauty-appraisal!list.action`, val, this.row, this.tempId)
			},
			changeSize(val) {
				this.row = val;
				this.getTableData(`/management/admin/beauty-appraisal!list.action`, this.page, val, this.tempId)
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
			// 筛选审核状态
			filterStatus(value, row) {
				return row.online === value;
			},
			// 筛选创建用户
			filterUser(value, row) {
				return row.creatUser === value;
			},
			// 列表数据
			getTableData(url, page, row, id, q) {
				// /management/admin/beauty-appraisal!list.action?labelId=773
				this.loading = true;
				this.$axios.get(url, {
					params: {
						page: page,
						rows: row,
						labelId: id ? id : '',
						q: q ? q : ''
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
				this.$axios.post('/management/admin/beauty-color!comboGridlist.action', this.$qs.stringify({
						page: page,
						rows: row,
						q: text
					})).then(res => {
					this.colorTotalNum = res.data.total
					this.productColorOptions = res.data.rows
					console.log(this.productColorOptions)
				})
			},
			// 获取标签列表
			getLabelList(val) {
				this.$axios.post('/management/admin/label!list.action', this.$qs.stringify({
					page: 1,
					rows: 50,
					q: val
				})).then(res => {
					console.log(res.data)
					this.labelTableData = res.data.rows
				})
			},
			// 删除标签
			deleteLabel(key) {
				console.log(key)
				this.choosedLabelList.splice(key, 1)
			},
			// 点击单选
			selectLabel(row) {
				console.log(row);
				this.choosedLabelList.push(row);
			},
			// 色号操作

			// 获取色号列表
			getBeautiColorList(val) {
				this.$axios.post('/management/admin/beauty-color!comboGridlist.action', this.$qs.stringify({
					page: 1,
					rows: 50,
					q: val
				})).then(res => {
					this.beautiColorTableData = res.data.rows
				})
			},
			// 删除色号
			deleteBeautiColor(key) {
				this.choosedBeautiColorList.splice(key, 1)
			},
			// 点击单选
			selectBeautiColor(row) {
				this.choosedBeautiColorList.push(row);
			},
		},
		mounted() {
			var _this = this;
			_this.getTableData('/management/admin/beauty-appraisal!list.action', 1, 10);
			// 获取教程栏目树形控件数据
			this.$axios.get('/management/admin/label!getTree.action').then(res => {
				_this.treeData = res.data;
				this.tagOptions = res.data
			})
			// 获取用户列表
			this.$axios.get('/management/admin/user!list.action', this.$qs.stringify({
				page: 1,
				row: 20,
				deptId: 1
			})).then(res => {
				let tempArr = [];
				res.data.rows.forEach(item => {
					tempArr.push({
						value: item.loginName,
						text: item.userName
					})
				})
				this.userList = tempArr
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
		max-height: 650px;
		overflow-y: auto;
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

	.el-table td,
	.el-table th {
		padding: 10px 0;
	}

	.selectTreeBox {
		border: 1px solid #dcdfe6;
		border-top: none;
		padding: 10px 0;
	}

	.selectTreeBox .selectItem {
		max-height: 500px;
		overflow-y: scroll;
		position: relative;
		z-index: 99;
	}

	.selectTreeBtn {
		padding: 10px 0;
		display: flex;
		justify-content: space-around;
	}

	/* 标签选择器 */
	.labelChoosed span {
		display: inline-block;
		padding: 5px 10px;
		border-radius: 5px;
		margin-top: 15px;
		margin-right: 10px;
		cursor: pointer;
		transition: all 0.5s;
		line-height: 20px;
		border: 1px solid #ccc;
	}

	.labelChoosed span:hover {
		background: #eeeeee;
	}

	.labelTable {
		max-height: 250px;
		overflow-y: auto;
	}

	.treeBox::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 6px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	.treeBox::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.4);
	}

	.treeBox::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.2);
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
		margin: 0.5rem auto;
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
