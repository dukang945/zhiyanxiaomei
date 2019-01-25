<template>
	<div class="teachContent">
		<el-row>
			<el-col :span="18">
				<div class="btnGroup">
					<el-button type="primary" size='small' @click="add">新增</el-button>
					<el-button type="primary" size='small' @click="batchOnline">批量上线</el-button>
					<el-button type="primary" size='small' @click="batchOffline">批量下线</el-button>
					<el-button type="primary" size='small' @click="batchDelete">批量删除</el-button>
					<el-dialog title="新增教程" :visible.sync="AddVisible" width="50%" :before-close="handleClose">
						<el-form :label-position="labelPosition" label-width="120px" :model="formLabelAdd">
							<el-form-item label="名称">
								<el-input v-model="formLabelAdd.name"></el-input>
							</el-form-item>
							<!-- <el-form-item label="化妆目的">
								<el-select v-model="formLabelAdd.purposeId" multiple placeholder="请选择化妆目的" style='width: 100%;'>
									<el-option v-for="item in purposeOptions" :key="item.id" :label="item.text" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item> -->
						<!-- 	<el-form-item label="化妆水平">
								<el-select v-model="formLabelAdd.level" placeholder="请选择水平">
									<el-option label="初学乍练" value="0"></el-option>
									<el-option label="略有小成" value="1"></el-option>
									<el-option label="自成一派" value="2"></el-option>
								</el-select>
							</el-form-item> -->
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
										 :before-upload='beforeUpload' :on-success="uploadSuccess" :on-remove="handleRemove" :on-preview="handlePictureCardPreview"
										 :file-list="fileList" list-type="picture">
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
								<el-upload action="/management/admin/kcupload!uploadVideo.action?type=makeupvideo_path&dir=media" :data='videoData'
								 :before-upload='beforeUploadVideo' :on-success="uploadSuccessVideo" :on-remove="handleRemoveVideo">
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">只能上传mp4或flv格式文件，为保证速度，请尽量压缩文件</div>
								</el-upload>
							</el-form-item>
							<el-form-item label="简介">
								<el-input type="textarea" autosize v-model="formLabelAdd.about"></el-input>
							</el-form-item>
							<el-form-item label="图片">
								<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
								 :before-upload='beforeUpload' :on-success="uploadSuccess" :on-remove="handleRemove" :on-preview="handlePictureCardPreview"
								 :file-list="addFileList" list-type="picture">
									<el-button size="small" type="primary">点击上传</el-button>
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
				<el-table :data="tableData" border style="width: 100%" class='table'  @select='tableSelect'
				 v-loading="loading" :row-class-name="tableRowClassName">
					<el-table-column type="selection" width="55" align='center'></el-table-column>
					<el-table-column type="index" label="序号" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="id" label="id" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="name" label="标题" width="200" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="labelName" label="标签" width="300" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="H5地址" width="100" align='center'>
						<template slot-scope="scope">
							<el-button class='copyBtn' size="small" @click='copyH5Url(scope.row)' type="primary">复制</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="creatUser" label="创建人" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="collectNumber" label="点赞次数" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" width="150" align='center' :formatter='getTime'>
					</el-table-column>
					<el-table-column prop="online" label="审核状态" width="100" align='center' :formatter='getStatus'>
					</el-table-column>
					<el-table-column label="操作" fixed="right" align='center' width='750'>
						<template slot-scope="scope">
							<el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" size='small' type="danger" class="el-icon-delete">删除</el-button>
							<el-button size="small" type="primary" @click="edit(scope.$index, scope.row)" icon='el-icon-edit'>编辑</el-button>
							<el-button size="small" type="primary" @click="switchOnline(scope.$index, scope.row)" class="el-icon-sort">{{tableData[scope.$index].online==0?'下线':'上线'}}</el-button>
							<el-button size="small" type="primary" @click="creatH5(scope.$index, scope.row)" icon='el-icon-edit-outline'>生成H5</el-button>
							<el-button size="small" type="primary" @click="updataSort(scope.$index, scope.row)" icon='el-icon-sort'>更新排序</el-button>
							<el-button size="small" type="primary" @click="push(scope.$index, scope.row)">推送</el-button>
							<el-button size="small" type="primary" @click="checkStep(scope.$index, scope.row)">步骤管理</el-button>
							<el-button size="small" type="primary" @click="checkComment(scope.$index, scope.row)">评论管理</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Pagination :totalNum='totalNum' @change_Page='changePage' @change_Size='changeSize'></Pagination>
			</el-col>
		</el-row>
		<!-- 编辑表单 -->
		<el-dialog title="编辑" :visible.sync="editDialogVisible" width="50%" :before-close="handleClose">
			<el-form :label-position="labelPosition" label-width="120px" :model="editFormData">
				<el-form-item label="名称">
					<el-input v-model="editFormData.name"></el-input>
				</el-form-item>
				<!-- <el-form-item label="化妆目的">
					<el-select v-model="editFormData.purposeId" multiple placeholder="请选择化妆目的" style='width: 100%;'>
						<el-option v-for="item in purposeOptions" :key="item.id" :label="item.text" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="化妆水平">
					<el-select v-model="editFormData.level" placeholder="请选择水平">
						<el-option label="初学乍练" :value="0+0"></el-option>
						<el-option label="略有小成" :value="1+0"></el-option>
						<el-option label="自成一派" :value="2+0"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="标签">
					<el-cascader v-model="editFormData.lableId" :options="tagOptions" change-on-select></el-cascader>
				</el-form-item>
				<el-form-item label="点赞次数">
					<el-input v-model="editFormData.greatNumber"></el-input>
				</el-form-item>
				<el-form-item label="点击次数">
					<el-input v-model="editFormData.clickNumber"></el-input>
				</el-form-item>
				<el-form-item label="浏览量">
					<el-input v-model="editFormData.pageView"></el-input>
				</el-form-item>
				<el-form-item label="化妆预估时间">
					<el-input v-model="editFormData.minute"></el-input>
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
					<el-select v-model="editFormData.productColor" multiple placeholder="请选择色号" filterable :filter-method='(q)=>{
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
					<el-select v-model="editFormData.moduleId" placeholder="请选择美妆模型" style='width: 100%;'>
						<el-option v-for="item in moduleOptions" :key="item.id" :label="item.text" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="视频">

				</el-form-item>
				<el-form-item label="简介">
					<el-input type="textarea" autosize v-model="editFormData.about"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData' :before-upload='beforeUpload'
					 :on-success="uploadSuccess" :on-remove="handleRemove" :on-preview="handlePictureCardPreview" :file-list="editFileList"
					 list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
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
		<!-- 推送弹框 -->
		<el-dialog title="推送信息" :visible.sync="pushDialogVisible" width="30%" append-to-body>
			<el-form :label-position="labelPosition" label-width="120px" :model="pushForm">
				<el-form-item label="标题">
					<el-input v-model="pushForm.title"></el-input>
				</el-form-item>
				<el-form-item label="内容">
					<el-input type="textarea" autosize v-model="pushForm.body"></el-input>
				</el-form-item>
				<el-form-item label="设备类型">
					<el-select v-model="pushForm.deviceType" placeholder="请选择设备类型">
						<el-option label="全部" value="ALL"></el-option>
						<el-option label="Android" value="ANDROID"></el-option>
						<el-option label="IOS" value="IOS"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="环境">
					<el-select v-model="pushForm.environment" placeholder="请选择推送环境">
						<el-option label="生产环境" value="PRODUCT"></el-option>
						<el-option label="开发环境" value="DEV"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="点击通知后动作" v-if='pushForm.deviceType!="IOS"'>
					<el-select v-model="pushForm.openType" placeholder="请选择动作">
						<el-option label="打开应用" value="APPLICATION"></el-option>
						<el-option label="打开AndroidActivity" value="ACTIVITY"></el-option>
						<el-option label="打开URL" value="URL"></el-option>
						<el-option label="无跳转" value="NONE"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="消息类型">
					<el-select v-model="pushForm.pushType" placeholder="请选择消息类型">
						<el-option label="消息" value="MESSAGE"></el-option>
						<el-option label="通知" value="NOTICE"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="消息转通知" v-if='pushForm.pushType==="MESSAGE"'>
					<el-select v-model="pushForm.remind" placeholder="请选择消息类型">
						<el-option label="是" value="true"></el-option>
						<el-option label="否" value="false"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="推送目标">
					<el-select v-model="pushForm.target" placeholder="请选择目标">
						<el-option label="广播推送" value="ALL"></el-option>
						<el-option label="按设备推送" value="ACCOUNT"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="推送值">
					<el-input v-model="pushForm.targetValue"></el-input>
				</el-form-item>
				<el-form-item label="是否定时推送">
					<el-select v-model="pushForm.status" placeholder="请选择目标" @change='changeStatus'>
						<el-option label="是" value="true"></el-option>
						<el-option label="否" value="false"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="推送时间" v-if='pushForm.status=="true"'>
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="pushForm.date" style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-time-picker type="fixed-time" placeholder="选择时间" value-format="HH:mm:ss" v-model="pushForm.time" style="width: 100%;"></el-time-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="推送参数">
					<el-input v-model="pushForm.json"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="cancelPush">取 消</el-button>
					<el-button type="primary" @click="handlePush">确 定</el-button>
				</el-form-item>
			</el-form>
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
						<el-button type="primary" size='small' @click="checkAddComment(scope.$index, scope.row)" icon='el-icon-edit'>添加回复</el-button>
					</template>
				</el-table-column>
			</el-table>
			<Pagination :totalNum='commentTotalNum' @change_Page='changeCommentPage' @change_Size='changeCommentSize'></Pagination>
		</el-dialog>
		<!-- 步骤管理弹框 -->
		<el-dialog title="教程步骤管理" :visible.sync="teachStepDialogVisible" width="80%">
			<el-button type="primary" @click="addStep" size='small' style='margin-bottom: 20px;'>新增步骤</el-button>
			<el-table :data="stepTableData" border style="width: 100%">
				<el-table-column prop="id" label="编号" width="100" align='center'>
				</el-table-column>
				<el-table-column prop="procedureName" label="步骤名称" width='100' align='center'>
				</el-table-column>
				<el-table-column prop="procedureSort" label="步骤排序" width="100" align='center'>
				</el-table-column>
				<el-table-column prop="procedureDes" label="步骤描述" align='center' :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column prop="desSort" label="描述排序" width="100" align='center'>
				</el-table-column>
				<el-table-column label="操作" width="200" align='center'>
					<template slot-scope="scope">
						<el-button @click.native.prevent="deleteStep(scope.$index, scope.row)" size='small' type="danger" class="el-icon-delete">删除</el-button>
						<el-button type="primary" size='small' @click="editStep(scope.$index, scope.row)" icon='el-icon-edit'>编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<Pagination :totalNum='stepTotalNum' @change_Page='changeStepPage' @change_Size='changeStepSize'></Pagination>
		</el-dialog>
		<!-- 新增步骤弹框 -->
		<el-dialog title="新增步骤" :visible.sync="addStepDialogVisible" width="50%" append-to-body>
			<el-form :label-position="labelPosition" label-width="100px" :model="addStepForm">
				<el-form-item label="教程步骤名称">
					<el-select v-model="addStepForm.procedureName" placeholder="请选择步骤名称">
						<el-option v-for="item in stepProcedureOptions" :key="item.id" :label="item.text" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="教程步骤排序">
					<el-select v-model="addStepForm.procedureSort" placeholder="请选择步骤排序">
						<el-option v-for="item in stepProcedureSortOptions" :key="item.id" :label="item.text" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="步骤描述">
					<el-input type="textarea" autosize v-model="addStepForm.procedureDes" placeholder='请输入步骤描述'></el-input>
				</el-form-item>
				<el-form-item label="描述排序">
					<el-select v-model="addStepForm.desSort" placeholder="请选择描述排序">
						<el-option v-for="item in stepDesSortOptions" :key="item.id" :label="item.text" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="步骤图片">
					<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData' :before-upload='beforeUpload'
					 :on-success="uploadSuccess" :on-remove="handleRemove" :on-preview="handlePictureCardPreview" list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件</div>
					</el-upload>
				</el-form-item>

				<el-form-item>
					<el-button @click="cancelAddStep">取 消</el-button>
					<el-button type="primary" @click="handleAddStep">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 编辑步骤弹框 -->
		<el-dialog title="编辑步骤" :visible.sync="editStepDialogVisible" width="50%" append-to-body>
			<el-form :label-position="labelPosition" label-width="100px" :model="editStepForm">
				<el-form-item label="教程步骤名称">
					<el-select v-model="editStepForm.procedureName" placeholder="请选择步骤名称">
						<el-option v-for="item in stepProcedureOptions" :key="item.id" :label="item.text" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="教程步骤排序">
					<el-select v-model="editStepForm.procedureSort" placeholder="请选择步骤排序">
						<el-option v-for="item in stepProcedureSortOptions" :key="item.id" :label="item.text" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="步骤描述">
					<el-input type="textarea" autosize v-model="editStepForm.procedureDes" placeholder='请输入步骤描述'></el-input>
				</el-form-item>
				<el-form-item label="描述排序">
					<el-select v-model="editStepForm.desSort" placeholder="请选择描述排序">
						<el-option v-for="item in stepDesSortOptions" :key="item.id" :label="item.text" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="步骤图片">
					<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData' :before-upload='beforeUpload'
					 :on-success="uploadSuccess" :on-remove="handleRemove" :on-preview="handlePictureCardPreview" :file-list="editStepfileList"
					 list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件</div>
					</el-upload>
				</el-form-item>

				<el-form-item>
					<el-button @click="cancelEditStep">取 消</el-button>
					<el-button type="primary" @click="handleEditStep">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '@/components/module/Pagination.vue'
	import Clipboard from 'clipboard'
	export default {
		data() {
			return {
				searchForm: {
					text: ''
				}, //搜索框

				formLabelAdd: {
					name: '',
					purposeId: [],
					level: '',
					lableId: [],
					greatNumber: '',
					clickNumber: '',
					pageView: '',
					minute: '',
					selectName: '',
					productColor: [],
					moduleId: '',
					videoUrl: '',
					about: '',
					image: ''
				}, //新增教程表单


				editFormData: {

				}, //编辑表单

				addColorFormData: {
					productId: '',
					productName: '',
					colorName: '',
					image: ''
				}, //新增色号表单
				pushForm: {}, //推送表单
				addCommentForm: {}, //新增评论表单
				addStepForm: {}, //新增步骤表单
				editStepForm: {}, //编辑步骤表单
				purposeOptions: [], //化妆目的
				tagOptions: [], //标签
				productColorOptions: [], //色号产品列表
				searchColor: '', //色号搜索内容
				searchProduct: '', //新增色号产品搜索内容
				productOptions: [], //新增色号产品列表
				moduleOptions: [], //美妆模型图列表
				userOptions: [], //用户列表
				stepProcedureOptions: [{
					id: '底妆',
					text: '底妆'
				}, {
					id: '定妆',
					text: '定妆'
				}, {
					id: '眉毛',
					text: '眉毛'
				}, {
					id: '眼影',
					text: '眼影'
				}, {
					id: '眼线',
					text: '眼线'
				}, {
					id: '睫毛',
					text: '睫毛'
				}, {
					id: '修容',
					text: '修容'
				}, {
					id: '高光',
					text: '高光'
				}, {
					id: '腮红',
					text: '腮红'
				}, {
					id: '唇妆',
					text: '唇妆'
				}, {
					id: '点缀',
					text: '点缀'
				}], //步骤名称列表
				stepProcedureSortOptions: [{
					id: '1',
					text: '1'
				}, {
					id: '2',
					text: '2'
				}, {
					id: '3',
					text: '3'
				}, {
					id: '4',
					text: '4'
				}, {
					id: '5',
					text: '5'
				}, {
					id: '6',
					text: '6'
				}, {
					id: '7',
					text: '7'
				}, {
					id: '8',
					text: '8'
				}, {
					id: '9',
					text: '9'
				}, {
					id: '10',
					text: '10'
				}, {
					id: '11',
					text: '11'
				}, {
					id: '12',
					text: '12'
				}, {
					id: '13',
					text: '13'
				}, {
					id: '14',
					text: '14'
				}, {
					id: '15',
					text: '15'
				}, {
					id: '16',
					text: '16'
				}, {
					id: '17',
					text: '17'
				}, {
					id: '18',
					text: '18'
				}, {
					id: '19',
					text: '19'
				}, {
					id: '20',
					text: '20'
				}], //步骤排序列表
				stepDesSortOptions: [{
					id: '1',
					text: '1'
				}, {
					id: '2',
					text: '2'
				}, {
					id: '3',
					text: '3'
				}, {
					id: '4',
					text: '4'
				}, {
					id: '5',
					text: '5'
				}, {
					id: '6',
					text: '6'
				}, {
					id: '7',
					text: '7'
				}, {
					id: '8',
					text: '8'
				}, {
					id: '9',
					text: '9'
				}, {
					id: '10',
					text: '10'
				}, {
					id: '98',
					text: '98'
				}, {
					id: '99',
					text: '99'
				}], //描述排序列表
				rules: {

				},
				labelPosition: 'left',
				AddVisible: false,
				addColorDialogVisible: false,
				editDialogVisible: false,
				pushDialogVisible: false,
				addCommentDialogVisible: false,
				checkCommentDialogVisible: false,
				teachStepDialogVisible: false,
				addStepDialogVisible: false,
				editStepDialogVisible: false,
				totalNum: 10,
				colorTotalNum: 10,
				productTotalNum: 10,
				userTotalNum: 10,
				commentTotalNum: 10,
				stepTotalNum: 10,
				tableData: [],
				commentTableData: [], //评论表格数据
				stepTableData: [], //步骤表格数据
				page: 1,
				row: 10,
				colorRow: 10,
				colorPage: 1,
				productRow: 10,
				productPage: 1,
				userRow: 10,
				userPage: 1,
				commentPage: 1,
				commentRow: 10,
				stepPage: 1,
				stepRow: 10,
				// 左侧树形控件
				treeData: [],
				defaultProps: {
					children: 'children',
					label: 'text'
				},
				tempId: 2,
				// 图片上传
				imgData: {
					FileName: '',
					imgFile: null
				},
				videoData: {},
				tempImgUrl: '',
				tempRowId: '',
				loading: true,
				fileList: [],
				addFileList: [],
				editFileList: [],
				editStepfileList: [],
				dialogImageUrl: '',
				imgDialogVisible: false,
				commentDetailId: '',
				isSecondComment: false,
				commentId: '',
				teachId: '', //点击评论管理行id
				checkedRowId: '',
				stepTeachId: '', // 点击步骤管理行id
				stepId:''
			}
		},
		components: {
			Pagination
		},
		methods: {
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
				this.AddVisible = true;
				// 获取类型数据
				this.formatTreeData(_ => {

				})
				// 获取目的数据
				this.getPurposeData();
				// 获取色号产品数据
				this.getColorProductData(1, 10)
				//获取模型数据
				this.getModuleData();
			},
			// 确认新增
			handleAdd() {
				// 格式化表单数据为参数所需类型
				var testObj = {};
				for (var key in this.formLabelAdd) {
					if (key != 'lableId' && key != 'productColor' && key != 'purposeId') {
						testObj[key] = this.formLabelAdd[key]
					}
				}
				if (this.formLabelAdd.lableId.length > 0) {
					testObj.lableId = this.formLabelAdd.lableId[this.formLabelAdd.lableId.length - 1];
				}
				if (this.tempImgUrl) {
					testObj.image = `<img src="${this.tempImgUrl}" alt="" />`
				}
				var productColorString = '';
				var purposeIdString = '';
				if (this.formLabelAdd.productColor.length > 0) {
					for (let i = 0; i < this.formLabelAdd.productColor.length; i++) {
						productColorString += `&productColor=${this.formLabelAdd.productColor[i]}`
					}
				}
				if (this.formLabelAdd.purposeId.length > 0) {
					for (let i = 0; i < this.formLabelAdd.purposeId.length; i++) {
						purposeIdString += `&purposeId=${this.formLabelAdd.purposeId[i]}`
					}
				}
				console.log(this.formLabelAdd)
				let paramsStr = this.$qs.stringify(testObj) + productColorString + purposeIdString
				this.$axios.post('/management/admin/beauty-details!save.action', paramsStr).then(res => {
					this.getTableData('/management/admin/beauty-details!list.action', this.page, this.row, this.tempId);
					this.AddVisible = false;
					this.tempImgUrl = '';
					this.formLabelAdd = {
						name: '',
						purposeId: [],
						level: '',
						lableId: [],
						greatNumber: '',
						clickNumber: '',
						pageView: '',
						minute: '',
						selectName: '',
						productColor: [],
						moduleId: '',
						videoUrl: '',
						about: '',
						image: ''
					};
					this.addFileList = []
				})
			},
			// 取消新增
			cancelAdd() {
				this.AddVisible = false;
				this.formLabelAdd = {
					name: '',
					purposeId: [],
					level: '',
					lableId: [],
					greatNumber: '',
					clickNumber: '',
					pageView: '',
					minute: '',
					selectName: '',
					productColor: [],
					moduleId: '',
					videoUrl: '',
					about: '',
					image: ''
				}
				this.addFileList = []
				this.tempImgUrl = '';
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
				this.tempImgUrl = '';
				this.fileList = [];
				this.addColorDialogVisible = false
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
					this.$axios.post(`/management/admin/beauty-details!batchOnLine.action?ids=${this.checkedRowId}&online=0`).then(res => {
						this.$message.success('批量上线成功')
						this.getTableData(`/management/admin/beauty-details!list.action`, this.page, this.row, this.tempId)
					})

				} else {
					this.$message.error('没有选中的行')
				}
			},
			// 批量下线
			batchOffline() {
				if (this.checkedRowId) {
					this.$axios.post(`/management/admin/beauty-details!batchOffLine.action?ids=${this.checkedRowId}&online=1`).then(
						res => {
							this.$message.success('批量下线成功')
							this.getTableData(`/management/admin/beauty-details!list.action`, this.page, this.row, this.tempId)
						})
				} else {
					this.$message.error('没有选中的行')
				}
			},
			// 批量删除
			batchDelete() {
				// /management/admin/beauty-details!batchDelete.action?ids=391
				this.$confirm('确定要进行批量删除么？').then(res => {
					if (this.checkedRowId) {
						this.$axios.post(`/management/admin/beauty-details!batchDelete.action?ids=${this.checkedRowId}`).then(res => {
							this.$message.success('批量删除成功')
							this.getTableData(`/management/admin/beauty-details!list.action`, this.page, this.row, this.tempId)
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
				this.getTableData(`/management/admin/beauty-details!list.action`, 1, 10, a.id)
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
			uploadSuccess(res, file, fileList) {
				this.tempImgUrl = res.url;
				// 清空上传图片参数
				this.imgData = {
					FileName: '',
					imgFile: null
				}
			},
			// 视频上传
			beforeUploadVideo(file) {
				// 				this.imgData.FileName = file.name;
				// 				this.imgData.imgFile = file
				console.log(file)
			},
			handleRemoveVideo(file, fileList) {
				// this.tempImgUrl = '';
				console.log(file)
			},
			uploadSuccessVideo(res, file, fileList) {
				// 				this.tempImgUrl = res.url;
				// 				// 清空上传图片参数
				// 				this.imgData = {
				// 					FileName: '',
				// 					imgFile: null
				// 				}
				console.log(res)
				console.log(file)
			},
			// 表格操作
			// 编辑
			edit(index, row) {
				var that = this;
				that.editDialogVisible = true;
				// 获取色号产品数据
				that.getColorProductData(1, 10)
				//获取模型数据
				that.getModuleData();
				var tempObj = {};
				// 格式化row格式填充表单
				for (var key in row) {
					if (key != 'ids' && key != 'lableId') {
						tempObj[key] = row[key]
					}
				}
				console.log(tempObj)
				function formatPurpose() {
					return that.$axios.get('/management/admin/purpose!getList.action')
				}

				function formatBeautyColor() {
					return that.$axios.get(`/management/admin/beauty-color!getSelectDetail.action?id=${row.id}`)
				}
				that.$axios.all([formatPurpose(), formatBeautyColor()]).then(that.$axios.spread(function(purposeData, colorData) {
					tempObj.productColor = [];
					that.purposeOptions = purposeData.data;
					console.log(purposeData)
					let temp = row.labelId.split(',');
					let arr = [];
					for (let i = 0; i < temp.length; i++) {
						purposeData.data.forEach(item => {
							if (item.id == temp[i]) {
								arr.push(item.id)
							}
						})
					}
					tempObj.purposeId = arr;
					let productArr = colorData.data.color;
					if (productArr.length > 0) {
						productArr.forEach(item => {
							tempObj.productColor.push(item.id)
						})
					}
					that.formatTreeData(_ => {
						tempObj.lableId = [];
						if (row.lableId) {
							tempObj.lableId.push(row.lableId);
							// 查询标签是否有父级
							that.$axios.get(`/management/admin/lable!input.action?id=${row.lableId}`).then(res => {
								if (res.data.lableId) {
									tempObj.lableId.unshift(res.data.lableId)
								}
								that.editFormData = tempObj
								console.log(tempObj)
							})
						} else {
							that.editFormData = tempObj
						}
					});
				}));
				// 显示图片
				let testExp = /http.*?(\.png|\.jpg)/gi;
				if (row.image) {
					this.editFileList = [{
						name: '教程图片',
						url: row.image.match(testExp)[0]
					}]
				}
			},
			// 取消编辑
			cancelEdit() {
				this.editDialogVisible = false;
				// 清空所有选项
				this.editFormData = {
					name: '',
					purposeId: [],
					level: '',
					lableId: [],
					greatNumber: '',
					clickNumber: '',
					pageView: '',
					minute: '',
					selectName: '',
					productColor: [],
					moduleId: '',
					videoUrl: '',
					about: '',
					image: ''
				}
				this.tempImgUrl = '';
				this.editFileList = [];
			},
			// 提交编辑
			handleEdit() {
				console.log(this.editFormData)
				var testObj = {};
				for (var key in this.editFormData) {
					if (key != 'lableId' && key != 'productColor' && key != 'purposeId') {
						testObj[key] = this.editFormData[key]
					}
				}
				if (this.editFormData.lableId.length > 0) {
					testObj.lableId = this.editFormData.lableId[this.editFormData.lableId.length - 1];
				}
				if (this.tempImgUrl) {
					testObj.image = `<img src="${this.tempImgUrl}" alt="" />`
				}
				var productColorString = '';
				var purposeIdString = '';
				if (this.editFormData.productColor.length > 0) {
					for (let i = 0; i < this.editFormData.productColor.length; i++) {
						productColorString += `&productColor=${this.editFormData.productColor[i]}`
					}
				}
				if (this.editFormData.purposeId.length > 0) {
					for (let i = 0; i < this.editFormData.purposeId.length; i++) {
						purposeIdString += `&purposeId=${this.editFormData.purposeId[i]}`
					}
				}
				console.log(testObj)
				console.log(productColorString)
				console.log(purposeIdString)
				let paramsStr = this.$qs.stringify(testObj) + productColorString + purposeIdString
				this.$axios.post(`/management/admin/beauty-details!save.action?id=${this.editFormData.id}`, paramsStr).then(res => {
					this.getTableData('/management/admin/beauty-details!list.action', this.page, this.row, this.tempId);
					this.editDialogVisible = false;
					this.tempImgUrl = '';
					this.editFormData = {
						name: '',
						purposeId: [],
						level: '',
						lableId: [],
						greatNumber: '',
						clickNumber: '',
						pageView: '',
						minute: '',
						selectName: '',
						productColor: [],
						moduleId: '',
						videoUrl: '',
						about: '',
						image: ''
					}
				})
			},
			// 删除
			deleteRow(index, row) {
				this.$confirm("确认删除？")
					.then(_ => {
						this.$axios.get(`/management/admin/beauty-details!delete.action?id=${row.id}`).then(res => {
							this.$message.success('删除成功！')
							this.getTableData(`/management/admin/beauty-details!list.action`, this.page, this.row, this.tempId)
						})
					})
					.catch(_ => {});
			},
			// 切换状态
			switchOnline(index) {
				let status = this.tableData[index].online == 0 ? 1 : 0;
				this.$axios.post(`/management/admin/beauty-details!online.action?id=${this.tableData[index].id}&online=${status}`).then(
					res => {
						this.$message.success('切换状态成功')
						this.getTableData(`/management/admin/beauty-details!list.action`, this.page, this.row, this.tempId)
					})
			},
			// 创建H5页面
			creatH5(index, row) {
				this.$axios.post(`/management/admin/beauty-details!saveHtml.action?id=${row.id}`).then(
					res => {
						if (res.status == 200) {
							this.$message.success('H5页面创建成功')
						} else {
							this.$message.error('好像出了点问题-.-！')
						}
					})
			},
			// 更新排序
			updataSort(index, row) {
				this.$axios.post(`/management/admin/beauty-details!updateTime.action?id=${row.id}`).then(
					res => {
						if (res.status == 200) {
							this.$message.success('排序更新成功')
						} else {
							this.$message.error('好像出了点问题-.-！')
						}
					})
			},

			// 推送
			push(index, row) {
				console.log(index);
				console.log(row)
				this.pushForm.id = row.id
				this.pushDialogVisible = true
			},
			changeStatus(val) {
				if (val == 'false') {
					this.pushForm.date = '';
					this.pushForm.time = ''
				}
			},
			cancelPush() {
				this.pushDialogVisible = false
				this.pushForm = {}
			},
			handlePush() {
				console.log(this.pushForm)
				// /management/admin/push!push.action?id=391&type=beauty_details
				let tempObj = {};
				for (var key in this.pushForm) {
					if (key != 'id' && key != 'date' && key != 'time') {
						tempObj[key] = this.pushForm[key]
					}
				}
				if (this.pushForm.date) {
					tempObj.pushTime = this.pushForm.date + ' ' + this.pushForm.time
				}
				// 接口有问题 暂时不调用推送
				// 				this.$axios.post(`/management/admin/push!push.action?id=${this.pushForm.id}&type=beauty_details`,this.$qs.stringify(tempObj)).then(res=>{
				// 					console.log(res)
				// 				}).catch(e=>{
				// 					this.$message.error('好像出了点问题-.-！')
				// 				})
			},

			// 教程步骤管理
			checkStep(index, row) {
				this.teachStepDialogVisible = true;
				this.getStepData(1, 10, row.id);
				this.stepTeachId = row.id
			},
			// 新增步骤
			addStep() {
				this.addStepDialogVisible = true;
			},
			// 取消新增步骤
			cancelAddStep() {
				this.addStepDialogVisible = false;
				this.addStepForm = {};
				this.tempImgUrl = '';
			},
			// 提交新增步骤
			handleAddStep() {
				console.log(this.addStepForm)
				console.log(this.stepTeachId)
				console.log(this.tempImgUrl)
				if (this.tempImgUrl) {
					this.addStepForm.procedureImg = `<img src="${this.tempImgUrl}" alt="" />`
				}
				this.$axios.post(`/management/admin/beauty-details-relation!save.action?beautyDetailsId=${this.stepTeachId}`, this.$qs
						.stringify(this.addStepForm))
					.then(res => {
						this.$message.success('新增成功！')
						this.addStepDialogVisible = false;
						this.addStepForm = {};
						this.tempImgUrl = '';
					})
			},
			// 删除步骤
			deleteStep(index, row) {
				console.log(index)
				console.log(row)
				this.$confirm('确定删除步骤么？').then(res => {
					this.$axios.get(
						`/management/admin/beauty-details-relation!delete.action?id=${row.id}&&beautyDetailsId=${this.stepTeachId}`).then(
						_ => {
							this.$message.success('删除成功');
							this.getStepData(this.stepPage, this.stepRow, this.stepTeachId);
						}).catch(e => {
						this.$message.error('好像出了点问题！-.-！')
					})
				})
			},
			// 编辑步骤
			editStep(index, row) {
				this.editStepDialogVisible=true;
				this.stepId=row.id;
				this.editStepForm = {
					procedureName: row.procedureName,
					procedureSort: row.procedureSort,
					procedureDes: row.procedureDes,
					desSort: row.desSort,
					procedureImg:row.procedureImg
				};
				let testExp = /http.*?(\.png|\.jpg|\.gif)/gi;
				if(row.procedureImg){
					this.editStepfileList = [{
						name: '步骤图片',
						url: row.procedureImg.match(testExp)[0]
					}]
				}
			},
			//取消编辑步骤
			cancelEditStep() {
				this.editStepForm={};
				this.editStepDialogVisible=false;
				this.tempImgUrl=''
			},
			//提交编辑步骤
			handleEditStep() {
				this.editStepDialogVisible = false;
				if(this.tempImgUrl){
					this.editStepForm.procedureImg=`<img src="${this.tempImgUrl}" alt="" />`
				}
				this.$axios.post(`/management/admin/beauty-details-relation!save.action?id=${this.stepId}&beautyDetailsId=${this.stepTeachId}`, this.$qs.stringify(
					this.editStepForm)).then(
					res => {
						this.$message.success('编辑成功！')
						this.getStepData(this.stepPage, this.stepRow, this.stepTeachId);
						this.editStepForm = {}
					}).catch(e => {
					this.$message.error('出了点问题-.-！')
				})
			},
			// 管理评论
			checkComment(index, row) {
				console.log(row);
				this.checkCommentDialogVisible = true;
				this.teachId = row.id
				this.getCommentData(this.commentPage, this.commentRow, row.id)
			},
			// 新增评论
			addComment(index, row) {
				// 获取用户数据
				this.getUserData(this.userPage, this.userRow);
				this.addCommentDialogVisible = true
			},
			cancelAddComment() {
				this.addCommentForm = {};
				this.isSecondComment = false;
				this.addCommentDialogVisible = false
			},
			// 回复评论（二级评论）
			checkAddComment(index, row) {
				this.isSecondComment = true;
				this.getUserData(this.userPage, this.userRow);
				this.commentId = row.id;
				this.addCommentDialogVisible = true;
			},
			// 提交新增评论
			handleAddComment() {
				console.log(this.teachId)
				// 判断是回复评论还是直接评论
				if (this.isSecondComment) {
					this.addCommentDialogVisible = false;
					this.$axios.post(
						`/management/admin/comment!save.action?detailsId=${this.teachId}&id=${this.commentId}&type=1`, this.$qs.stringify(
							this.addCommentForm)).then(res => {
						this.getCommentData(this.commentPage, this.commentRow, this.teachId);
						// this.teachId = '';
						this.isSecondComment = false;
						this.commentId = '';
						this.addCommentForm = {};
						this.$message.success('回复评论成功');
					})
				} else {
					let tempObj = this.addCommentForm;
					this.addCommentDialogVisible = false;
					this.$axios.post(`/management/admin/comment!save.action?detailsId=${this.teachId}&type=1`, this.$qs.stringify(
						tempObj)).then(
						res => {
							this.$message.success('添加成功！')
							this.getCommentData(this.commentPage, this.commentRow, this.teachId);
							this.addCommentForm = {}
						}).catch(e => {
						this.$message.error('出了点问题-.-！')
					})
				}

			},
			deleteComment(index, rows) {
				this.$confirm("确认删除？").then(res => {
					this.$axios.get(
						`/management/admin/comment!delete.action?id=${rows[index].id}&detailsId=${rows[index].detailsId}&type=1`).then(
						res => {
							this.$message.success('删除成功');
							this.getCommentData(this.commentPage, this.commentRow, rows[index].detailsId)
						}).catch(_ => {
						this.$message.error('出了点问题-.-！')
					})
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
				this.getProductData(val, this.productRow, this.searchProduct)
			},
			changeProductSize(val) {
				this.colorRow = val;
				this.getProductData(this.productPage, val, this.searchProduct)
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
				this.getCommentData(val, this.commentRow, this.teachId)
			},
			changeCommentSize(val) {
				this.commentRow = val;
				this.getCommentData(this.commentPage, val, this.teachId)
			},
			// 步骤分页
			changeStepPage(val) {
				this.stepPage = val;
				this.getStepData(val, this.stepRow, this.stepTeachId)
			},
			changeStepSize(val) {
				this.stepRow = val;
				this.getStepData(this.stepPage, val, this.stepTeachId)
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
				this.loading = true;
				this.$axios.get(url, {
					params: {
						page: page,
						rows: row,
						labelId: id ? id : ''
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
				this.$axios.get(`/management/admin/comment!list.action?detailsId=${id}&type=1`, {
					params: {
						page: page,
						rows: row
					}
				}).then(res => {
					if (res.data.total > 0) {
						this.commentTotalNum = res.data.total
						this.commentTableData = res.data.rows;
					} else {
						this.commentTotalNum = 0;
						this.commentTableData = []
					}
				})
			},
			// 步骤数据
			getStepData(page, row, id) {
				this.$axios.get(`/management/admin/beauty-details-relation!list.action?beautyDetailsId=${id}`, {
					params: {
						page: page,
						rows: row
					}
				}).then(res => {
					this.stepTableData = res.data.rows;
					this.stepTotalNum = res.data.total
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
				this.tagOptions = tempTagArr
				callback();
			}
		},
		mounted() {
			this.getTableData('/management/admin/beauty-details!list.action', 1, 10);
			this.$axios.get('/management/admin/label!getTree.action').then(res=>{
				console.log(res)
				this.treeData=res.data
			})
			// 获取教程栏目树形控件数据
			this.$axios.get('/management/admin/label!getTreeGrid.action').then(res => {
				let tempList = res.data.map(item => {
					return {
						id: item.id,
						name: item.name,
						text: item.text,
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
	.el-table__body tr.online {
		/* background-color: #f0f9eb; c7e2ff  */
		background-color: #c7e2ff;  
	}
	.el-upload-list__item {
		/* transition: none; */
	}
	
	.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar{/*滚动条整体样式*/
	    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
	    height: 10px;
	}
	.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
	    border-radius: 5px;
	    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	    background: rgba(0,0,0,0.2);
	}
	.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-track{/*滚动条里面轨道*/
	    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	    border-radius: 0;
	    background: rgba(0,0,0,0.1);
	}
</style>
