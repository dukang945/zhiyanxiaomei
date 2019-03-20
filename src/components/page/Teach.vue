<template>
	<div class="teachContent">
		<el-row>
			<el-col :span="16">
				<div class="btnGroup">
					<el-button type="primary" size='small' @click="add">新增</el-button>
					<el-button type="primary" size='small' @click="batchOnline">批量上线</el-button>
					<el-button type="primary" size='small' @click="batchOffline">批量下线</el-button>
					<el-button type="primary" size='small' @click="batchLabel">批量加标签</el-button>
					<el-button type="danger" size='small' @click="batchDelete">批量删除</el-button>
					<!-- <el-button type="primary" size='small' @click="tableToExcel" plain>导出为Excel</el-button> -->
					<el-dialog title="新增教程" :visible.sync="AddVisible" width="50%" :before-close="handleClose" @close='closeAddDialog'>
						<el-form label-position="right" ref='addForm' label-width="120px" :model="formLabelAdd">
							<el-form-item label="名称">
								<el-input v-model="formLabelAdd.name"></el-input>
							</el-form-item>
							<el-form-item label="搜索标签">

								<el-input v-model='searchLabel' @change='getLabelList' clearable></el-input>
								<el-table :data="labelTableData" @row-click='selectLabel' border style="width: 100%" v-loading="loading" v-if='searchLabel'
								 class='labelTable'>
									<el-table-column prop="id" label="id" width="50" align='center'>
									</el-table-column>
									<el-table-column prop="name" label="标题" align='center'>
									</el-table-column>
									<el-table-column prop="labelName" label="上级标签" align='center'>
									</el-table-column>
								</el-table>
								<div class="labelChoosed">
									已选标签：<span v-for="(item,key) in choosedLabelList">{{item.name}}
										<i class="el-icon-error" @click="deleteLabel(key)"></i></span>
								</div>
							</el-form-item>
							<el-form-item label="点赞次数">
								<el-input v-model="formLabelAdd.greatNumber"></el-input>
							</el-form-item>
							<el-form-item label="浏览量">
								<el-input v-model="formLabelAdd.pageView"></el-input>
							</el-form-item>

							<el-form-item label="搜索产品">
								<el-input v-model='searchBeautiColor' @change='getBeautiColorList' clearable></el-input>
								<el-table :data="beautiColorTableData" @row-click='selectBeautiColor' border style="width: 100%" v-loading="loading"
								 v-if='searchBeautiColor' class='labelTable'>
									<el-table-column prop="id" label="id" width="50" align='center'>
									</el-table-column>
									<el-table-column prop="name" label="色号名" align='center'>
									</el-table-column>
									<el-table-column prop="productName" label="商品名" align='center'>
									</el-table-column>
								</el-table>
								<div class="labelChoosed">
									已选产品：<span v-for="(item,key) in choosedBeautiColorList" v-dragging="{ list: choosedBeautiColorList, item: item, group: 'name' }">{{item.name}}
										<i class="el-icon-error" @click="deleteBeautiColor(key)"></i></span>
								</div>
							</el-form-item>
							<el-form-item label='选择模型图'>
								<el-select v-model="formLabelAdd.moduleId" placeholder="请选择美妆模型" clearable style='width: 100%;'>
									<el-option v-for="item in moduleOptions" :key="item.id" :label="item.text" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="视频">
								<el-upload action="/management/admin/kcupload!uploadVideo.action?type=makeupvideo_path&dir=media" :data='videoData'
								 :before-upload='beforeUploadVideo' :on-success="uploadSuccessVideo" :on-remove="handleRemoveVideo">
									<el-button size="small" type="primary">点击上传</el-button>
									<span slot="tip" class="el-upload__tip" style="margin-left: 20px;">只能上传mp4或flv格式文件，为保证速度，请尽量压缩文件</span>
								</el-upload>
							</el-form-item>
							<el-form-item label="教程简介">
								<el-input type="textarea" autosize v-model="formLabelAdd.about"></el-input>
							</el-form-item>
							<el-form-item label="图片">
								<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
								 :before-upload='beforeUpload' :on-success="uploadSuccess" :on-remove="handleRemove" :on-preview="handlePictureCardPreview"
								 :file-list="addFileList" list-type="picture">
									<el-button size="small" type="primary" @click='uploadName("addImg")'>点击上传</el-button>
									<span slot="tip" class="el-upload__tip" style="margin-left: 20px;">只能上传jpg/png文件，且不超过500kb</span>
								</el-upload>
							</el-form-item>
							<el-form-item label='化妆步骤'>
								<el-tabs v-model="teachStepValue" type="border-card" editable @tab-remove="removeTab" @tab-add='addMainStep'>
									<el-tab-pane v-for="(item, index) in stepList" :key="item.id" :label="item.name" :name="item.name">
										<el-form :model="formLabelAdd.beautyDetailsRelationList[index]" class='stepBox'>
											<el-form-item label="教程步骤名">
												<el-select v-model="formLabelAdd.beautyDetailsRelationList[index].procedureName" placeholder="请选择">
													<el-option v-for="item in stepNameOptions" :key="item.id" :label="item.text" :value="item.text">
													</el-option>
												</el-select>
											</el-form-item>
											<transition-group tag="div" name="el-zoom-in-top">
												<div v-for='(val,key) in formLabelAdd.beautyDetailsRelationList[index].childrenProcedureList' v-if='formLabelAdd.beautyDetailsRelationList[index].childrenProcedureList.length>0'
												 class="miniStepBox" :key='val.id'>
													<p>小步骤序号：{{key+1}} <span class="deleteMiniStep" @click="deleteMiniStep(index,key)"><i class="el-icon-close"></i></span></p>
													<el-form-item label="小步骤说明">
														<el-input type="textarea" style='width: 80%;' autosize v-model="formLabelAdd.beautyDetailsRelationList[index].childrenProcedureList[key].procedureDes"></el-input>
													</el-form-item>
													<el-form-item label="小步骤图片">
														<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
														 :before-upload='beforeUpload' :on-success="uploadSuccess" :on-remove="handleRemove" :on-preview="handlePictureCardPreview"
														 list-type="picture">

															<el-button size="small" type="primary" @click='uploadName("addMiniStep-"+index+"-"+key)'>点击上传</el-button>
															<span slot="tip" class="el-upload__tip" style="margin-left: 20px;">只能上传jpg/png文件，且不超过500kb</span>
														</el-upload>
													</el-form-item>
												</div>
											</transition-group>
											<el-button size='small' type='primary' icon='el-icon-plus' @click='addMiniStep(index)' plain>增加子步骤</el-button>
										</el-form>
									</el-tab-pane>
								</el-tabs>
							</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button @click="cancelAdd">取 消</el-button>
							<el-button type="primary" plain @click="saveDraft">提交</el-button>
							<!-- <el-button type="primary" plain @click="saveDraft">保存草稿</el-button>
							<el-button type="primary" @click="handleAdd">提交审核</el-button> -->
						</span>
					</el-dialog>
				</div>
			</el-col>
			<el-col :span="8">
				<el-form :inline="true" :model="searchForm" class="right-search">
					<el-form-item>
						<el-input v-model="searchForm.text" size='small' placeholder="请输入搜索内容"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size='small' @click="onSubmitSearch" icon="el-icon-search">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row :gutter="5">
			<el-col :span='2' class='treeBox'>
				<span class="treeTitle">教程栏目列表</span>
				<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			</el-col>
			<el-col :span='22'>
				<!-- <el-table :data="tableData" border style="width: 100%" class='table' @select='tableSelect' v-loading="loading" :row-class-name="tableRowClassName"> -->
				<el-table :data="tableData" border style="width: 100%" class='table' @select='tableSelect' v-loading="loading">
					<el-table-column type="selection" width="55" align='center'></el-table-column>
					<el-table-column prop="id" label="id" width="50" align='center'>
					</el-table-column>
					<el-table-column prop="name" label="标题" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="labelName" label="标签" width="150" align='center' :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column prop="creatUser" label="创建人" width="100" align='center' :filters="userList" :filter-method="filterUser"
					 filter-placement="bottom-end">
					</el-table-column>
					<el-table-column prop="online" label="审核状态" width="100" align='center' :formatter='getStatus' :filters="satusList"
					 :filter-method="filterStatus" filter-placement="bottom-end">
					</el-table-column>
					<el-table-column prop="collectNumber" label="点赞次数" width="100" align='center'>
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" width="100" align='center' :formatter='getTime'
					 :show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="操作" fixed="right" align='center' width='620'>
						<template slot-scope="scope">
							<el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" size='small' type="danger" class="el-icon-delete">删除</el-button>
							<el-button size="small" type="primary" @click="edit(scope.$index, scope.row)" icon='el-icon-edit'>编辑</el-button>
							<el-button size="small" type="primary" @click="switchOnline(scope.$index, scope.row)" class="el-icon-sort">{{tableData[scope.$index].online==0?'下线':'上线'}}</el-button>
							<el-button size="small" type="primary" @click="updataSort(scope.$index, scope.row)" icon='el-icon-sort'>更新排序</el-button>
							<el-button size="small" type="primary" @click="push(scope.$index, scope.row)">推送</el-button>
							<el-button size="small" type="primary" @click="checkH5(scope.$index, scope.row)">预览H5</el-button>
							<el-button size="small" type="primary" @click="checkComment(scope.$index, scope.row)">评论管理</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Pagination :totalNum='totalNum' @change_Page='changePage' @change_Size='changeSize'></Pagination>
			</el-col>
		</el-row>
		<!-- 编辑表单 -->
		<el-dialog title="编辑" :visible.sync="editDialogVisible" width="50%" :before-close="handleClose" @close='closeEditDialog'>
			<el-form :label-position="labelPosition" label-width="120px" :model="editFormData">
				<el-form-item label="名称">
					<el-input v-model="editFormData.name"></el-input>
				</el-form-item>
				<el-form-item label="搜索标签">
					<el-input v-model='searchLabel' @change='getLabelList' clearable></el-input>
					<el-table :data="labelTableData" @row-click='selectLabel' border style="width: 100%" v-loading="loading" v-if='searchLabel'
					 class='labelTable'>
						<el-table-column prop="id" label="id" width="50" align='center'>
						</el-table-column>
						<el-table-column prop="name" label="标题" align='center'>
						</el-table-column>
						<el-table-column prop="labelName" label="上级标签" align='center'>
						</el-table-column>
					</el-table>
					<div class="labelChoosed">
						已选标签：<span v-for="(item,key) in choosedLabelList">{{item.name}}
							<i class="el-icon-error" @click="deleteLabel(key)"></i></span>
					</div>
				</el-form-item>
				<el-form-item label="点赞次数">
					<el-input v-model="editFormData.greatNumber"></el-input>
				</el-form-item>
				<el-form-item label="浏览量">
					<el-input v-model="editFormData.pageView"></el-input>
				</el-form-item>
				<el-form-item label="搜索产品">
					<el-input v-model='searchBeautiColor' @change='getBeautiColorList' clearable></el-input>
					<el-table :data="beautiColorTableData" @row-click='selectBeautiColor' border style="width: 100%" v-loading="loading"
					 v-if='searchBeautiColor' class='labelTable'>
						<el-table-column prop="id" label="id" width="50" align='center'>
						</el-table-column>
						<el-table-column prop="name" label="色号名" align='center'>
						</el-table-column>
						<el-table-column prop="productName" label="商品名" align='center'>
						</el-table-column>
					</el-table>
					<div class="labelChoosed">
						已选产品：<span v-for="(item,key) in choosedBeautiColorList" v-dragging="{ list: choosedBeautiColorList, item: item, group: 'name' }">{{item.name}}
							<i class="el-icon-error" @click="deleteBeautiColor(key)"></i></span>
					</div>
				</el-form-item>
				<el-form-item label='选择美妆模型图'>
					<el-select v-model="editFormData.moduleId" placeholder="请选择美妆模型" style='width: 100%;'>
						<el-option v-for="item in moduleOptions" :key="item.id" :label="item.text" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="视频">
					<el-upload action="/management/admin/kcupload!uploadVideo.action?type=makeupvideo_path&dir=media"
					 :before-upload='beforeUploadVideo' :on-success="uploadSuccessVideo" :on-remove="handleRemoveVideo" :file-list='editVideo'>
						<el-button size="small" type="primary">点击上传</el-button>
						<span slot="tip" class="el-upload__tip" style="margin-left: 20px;">只能上传mp4或flv格式文件，为保证速度，请尽量压缩文件</span>
					</el-upload>
				</el-form-item>
				<el-form-item label="简介">
					<el-input type="textarea" autosize v-model="editFormData.about"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData' :before-upload='beforeUpload'
					 :on-success="uploadSuccess" :on-remove="handleRemove" :on-preview="handlePictureCardPreview" :file-list="editFileList"
					 list-type="picture">
						<el-button size="small" type="primary" @click='uploadName("editImg")'>点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<!-- 编辑步骤 -->
				<el-form-item label='化妆步骤'>
					<el-tabs v-model="teachStepValue" type="border-card" editable @tab-remove="removeEditTab" @tab-add='editAddMainStep'>
						<el-tab-pane v-for="(item, index) in stepEditList" :key="item.id" :label="item.name" :name="item.name">
							<el-form :model="editFormData.beautyDetailsRelationList[index]" class='stepBox'>
								<el-form-item label="教程步骤名">
									<el-select v-model="editFormData.beautyDetailsRelationList[index].procedureName" placeholder="请选择">
										<el-option v-for="item in stepNameOptions" :key="item.id" :label="item.text" :value="item.text">
										</el-option>
									</el-select>
								</el-form-item>
								<transition-group tag="div" name="el-zoom-in-top">
									<div v-for='(val,key) in editFormData.beautyDetailsRelationList[index].childrenProcedureList' v-if='editFormData.beautyDetailsRelationList[index].childrenProcedureList.length>0'
									 class="miniStepBox" :key='val.id'>
										<p>小步骤序号：{{key+1}} <span class="deleteMiniStep" @click="editDeleteMiniStep(index,key)"><i class="el-icon-close"></i></span></p>
										<el-form-item label="小步骤说明">
											<el-input type="textarea" style='width: 80%;' autosize v-model="editFormData.beautyDetailsRelationList[index].childrenProcedureList[key].procedureDes"></el-input>
										</el-form-item>
										<el-form-item label="小步骤图片">
											<el-upload action="/management/admin/kcupload!uploadImage.action?type=goods_path" :data='imgData'
											 :before-upload='beforeUpload' :on-success="uploadSuccess" :on-remove="handleRemove" :on-preview="handlePictureCardPreview"
											 list-type="picture" :file-list='editStepfileList[index][key]'>
												<el-button size="small" type="primary" @click='uploadName("editMiniStep-"+index+"-"+key)'>点击上传</el-button>
												<span slot="tip" class="el-upload__tip" style="margin-left: 20px;">只能上传jpg/png文件，且不超过500kb</span>
											</el-upload>
										</el-form-item>
									</div>
								</transition-group>
								<el-button size='small' type='primary' icon='el-icon-plus' @click='editAddMiniStep(index)' plain>增加子步骤</el-button>
							</el-form>
						</el-tab-pane>
					</el-tabs>
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
		<!-- 预览H5页面弹框 -->
		<el-dialog :visible.sync="H5PageDialogVisible" width="70%" top='20px' @close='colseViewPage'>
			<div class="content">
				<img class="phoneBorder" src="../../images/viewPage.png" alt="">
				<div class="pageContent">
					<div id="title">
						<p>{{viewPageData.name}}</p>
					</div>
					<div style="clear: both;"></div>
					<div id="time"><span>{{getTime(1,1,viewPageData.createTime).split(" ")[0]}}</span><span>视频来源：{{viewPageData.original==0?'网络':'原创'}}</span></div>
					<div class="rate">
						<p>难度</p>
						<ul>
							<li v-for="item in viewPageData.star"><img src="../../images/allStar.png"></li>
						</ul>
					</div>
					<div style="clear: both;"></div>
					<div id="about">{{trimTag(viewPageData.about)}}</div>
					<hr style="border:0.5px dashed #E8E8E8;margin-top:13px;" />
					<div id="label">
						<div id="labelLeft" v-for="(item) in (viewPageData.labelName?viewPageData.labelName.split(','):[])">
							<a href="javascript:void(0);">{{item}}</a></div>
					</div>
					<div style="clear: both;"></div>
					<div v-for='(item,index) in viewPageData.beautyDetailsRelationList'>
						<div>
							<div class="angled stripes"></div>
							<div class="column">
								<p :class="index+1>9?'wordart wordart1':'wordart'">{{index+1}}</p>
								<p class="abbreviation">st</p>
								<p class="columnName">{{item.procedureName}}</p>
								<img :src='getTitleImg(item.procedureName)'>
							</div>
						</div>
						<div class="intro" v-for="(childrenItem,key) in item.childrenProcedureList" :key='childrenItem.id'>
							<div class="sequence" v-if='item.childrenProcedureList.length>1&&childrenItem.desSort!=98&&childrenItem.desSort!=99'>
								<div class="sequence1"></div><span>{{(key+1)>9?(key+1):'0'+(key+1)}}</span>
							</div>
							<p>{{childrenItem.procedureDes}}</p>
							<img :src="itemImg" v-for="(itemImg, ind) in childrenItem.procedureImg">
						</div>
					</div>
				</div>
				<img class="phoneBorder productBox" src="../../images/viewPage.png" alt="">
				<div class="productContent">
					<div class="productTitle">产品清单</div>
					<div class="productItem" v-for="(item,index) in viewPageColorList">
						<img :src="getImgUrl(item.image)" alt="">
						<p>{{item.name}} {{item.specification}}</p>
						<p>参考价格 ：￥{{item.price}}</p>
					</div>
				</div>

			</div>
		</el-dialog>
		<!-- 批量增加标签弹框 -->
		<el-dialog title="批量增加标签" :visible.sync="batchAddLabelDialogVisible" width="50%">
			<el-form :label-position="labelPosition" label-width="80px">
				<el-form-item label="搜索标签">
					<el-input v-model='searchLabel' @change='getLabelList' clearable></el-input>
					<el-table :data="labelTableData" @row-click='selectLabel' border style="width: 100%" v-loading="loading" v-if='searchLabel'
					 class='labelTable'>
						<el-table-column prop="id" label="id" width="50" align='center'>
						</el-table-column>
						<el-table-column prop="name" label="标题" align='center'>
						</el-table-column>
						<el-table-column prop="labelName" label="上级标签" align='center'>
						</el-table-column>
					</el-table>
					<div class="labelChoosed">
						已选标签：<span v-for="(item,key) in choosedLabelList">{{item.name}}
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
	export default {
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
				stepList: [{
					id: 1,
					name: '步骤1'
				}], //教程步骤数组
				stepEditList: [],
				tabIndex: 1,
				teachStepValue: '步骤1', //tab栏name值
				stepNameOptions: [{
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
				}, {
					id: '结语',
					text: '结语'
				}], //教程步骤名称
				formLabelAdd: {
					name: '',
					greatNumber: '',
					pageView: '',
					moduleId: '',
					videoUrl: '',
					star: '',
					about: '',
					image: '',
					beautyDetailsRelationList: [{
						procedureName: '',
						procedureSort: 1,
						childrenProcedureList: [{
							procedureDes: '',
							beautyDetailsRelationId: 0,
							procedureImg: [],
							desSort: 1,
							id: 1
						}]
					}]
				}, //新增教程表单


				editFormData: {
					name: '',
					greatNumber: '',
					pageView: '',
					moduleId: '',
					videoUrl: '',
					star: '',
					about: '',
					image: '',
					beautyDetailsRelationList: [{
						procedureName: '',
						procedureSort: 1,
						childrenProcedureList: [{
							procedureDes: '',
							beautyDetailsRelationId: 0,
							procedureImg: [],
							desSort: 1,
							id: 1
						}, ]
					}]
				}, //编辑表单

				pushForm: {}, //推送表单
				addCommentForm: {}, //新增评论表单
				searchColor: '', //色号搜索内容
				moduleOptions: [], //美妆模型图列表
				userOptions: [], //用户列表
				rules: {

				},
				labelPosition: 'left',
				AddVisible: false,
				editDialogVisible: false,
				pushDialogVisible: false,
				addCommentDialogVisible: false,
				checkCommentDialogVisible: false,
				H5PageDialogVisible: false,
				// H5PageDialogVisible: true,
				batchAddLabelDialogVisible: false,
				totalNum: 10,
				colorTotalNum: 10,
				productTotalNum: 10,
				userTotalNum: 10,
				commentTotalNum: 10,
				stepTotalNum: 10,
				tableData: [],
				commentTableData: [], //评论表格数据
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
				// 左侧树形控件
				treeData: [],
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
				imgPlace: '', //点击上传的位置
				videoData: {
					imgFileFileName:'',
					imgFile: null
				},
				tempImgUrl: '',
				tempRowId: '',
				loading: true,
				fileList: [],
				addFileList: [],
				editFileList: [],
				editStepfileList: [],
				editVideo:[],
				dialogImageUrl: '',
				imgDialogVisible: false,
				commentDetailId: '',
				isSecondComment: false,
				commentId: '',
				teachId: '', //点击评论管理行id
				checkedRowId: '',
				configTips: '',
				showTreeBox: false, //显示树形结构
				// selectLabel: '',
				selectId: [],
				selectIdEdit: [], //编辑表单的选中labelId
				viewPageData: {
					name: '',
					greatNumber: '',
					pageView: '',
					moduleId: '',
					videoUrl: '',
					star: '',
					about: '',
					image: '',
				}, //预览页面数据
				viewPageColorList: [], // 预览页面色号数据
				viewStepList: [], // 预览页面步骤数据
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
			}
		},
		components: {
			Pagination
		},
		methods: {
			// 去除文本中标签
			trimTag(str) {
				let testExp = /<.*?>/gi;
				if (str) {
					let tempList = str.match(testExp);
					if (tempList && tempList.length > 0) {
						for (let i = 0; i < tempList.length; i++) {
							str = str.replace(tempList[i], '');
						}
					}
					str = str.replace('&nbsp;', '')
					return str
				} else {
					return ''
				}
			},
			getImgUrl(str) {
				let testExp = /http.*?(\.png|\.jpg|\.gif)/gi;
				if (str) {
					return str.match(testExp)[0]
				}
			},
			// 获取化妆步骤标题图片
			getTitleImg(str) {
				var imgStr = '';
				switch (str) {
					case '底妆':
						imgStr = 'dizhuang'
						break;
					case '定妆':
						imgStr = 'dingzhuang'
						break;
					case '眉毛':
						imgStr = 'meimao'
						break;
					case '眼影':
						imgStr = 'yanying'
						break;
					case '眼线':
						imgStr = 'yanxian'
						break;
					case '睫毛':
						imgStr = 'jiemao'
						break;
					case '修容':
						imgStr = 'xiurong'
						break;
					case '高光':
						imgStr = 'gaoguang'
						break;
					case '腮红':
						imgStr = 'saihong'
						break;
					case '唇妆':
						imgStr = 'chunzhuang'
						break;
					case '点缀':
						imgStr = 'dianzhui'
						break;
					default:
						break;
				}
				return '../../../static/stepImg/' + imgStr + '.png'
			},
			closeAddDialog() {
				this.formLabelAdd = {
					name: '',
					greatNumber: '',
					pageView: '',
					moduleId: '',
					videoUrl: '',
					star: '',
					about: '',
					image: '',
					beautyDetailsRelationList: [{
						procedureName: '',
						procedureSort: 1,
						childrenProcedureList: [{
							procedureDes: '',
							beautyDetailsRelationId: 0,
							procedureImg: [],
							desSort: 1,
							id: 1
						}, ]
					}]
				};
				this.choosedLabelList = [];
				this.choosedBeautiColorList = [];
			},
			closeEditDialog() {
				this.editFormData = {
					name: '',
					greatNumber: '',
					pageView: '',
					moduleId: '',
					videoUrl: '',
					star: '',
					about: '',
					image: '',
					beautyDetailsRelationList: [{
						procedureName: '',
						procedureSort: 1,
						childrenProcedureList: [{
							procedureDes: '',
							procedureImg: [],
							desSort: 1,
							id: 1
						}, ]
					}]
				};
				this.choosedLabelList = [];
				this.choosedBeautiColorList = [];
				this.stepEditList = [];
				this.editStepfileList = [];
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
				this.AddVisible = true;
				// 获取色号产品数据
				this.getColorProductData(1, 10)
				//获取模型数据
				this.getModuleData();
				console.log(this.formLabelAdd)
			},
			// 保存为草稿
			saveDraft() {
				console.log(this.formLabelAdd)
				let tempObj = JSON.parse(JSON.stringify(this.formLabelAdd));
				let stepStr = '';
				for (let i = 0; i < tempObj.beautyDetailsRelationList.length; i++) {
					if (tempObj.beautyDetailsRelationList[i].childrenProcedureList.length == 1) {
						tempObj.beautyDetailsRelationList[i].childrenProcedureList[0].desSort = ''
					}
				}
				tempObj.beautyDetailsRelationList = JSON.stringify(tempObj.beautyDetailsRelationList)
				let labelStr = '';
				let colorStr = '';
				if (this.choosedLabelList.length > 0) {
					for (let i = 0; i < this.choosedLabelList.length; i++) {
						labelStr += `&labelId=${this.choosedLabelList[i].id}`
					}
				}
				if (this.choosedBeautiColorList.length > 0) {
					for (let i = 0; i < this.choosedBeautiColorList.length; i++) {
						colorStr += `&productColor=${this.choosedBeautiColorList[i].id}`
					}
				}
				this.$axios.post('/management/admin/beauty-details!save.action', this.$qs.stringify(tempObj) + colorStr + labelStr)
					.then(res => {
						if (res.data) {
							this.$message.success('保存草稿成功')
							this.getTableData('/management/admin/beauty-details!list.action', this.page, this.row, this.tempId);
							this.AddVisible = false;
							this.imgPlace = '';
							this.formLabelAdd = {
								name: '',
								greatNumber: '',
								pageView: '',
								moduleId: '',
								videoUrl: '',
								star: '',
								about: '',
								image: '',
								beautyDetailsRelationList: [{
									procedureName: '',
									procedureSort: 1,
									childrenProcedureList: [{
										procedureDes: '',
										beautyDetailsRelationId: 0,
										procedureImg: [],
										desSort: 1,
										id: 1
									}, ]
								}]
							};
							this.choosedBeautiColorList = [];
							this.addFileList = [];
							this.stepList = [{
								id: 1,
								name: '步骤1'
							}];
							this.teachStepValue = '步骤1'
						}
					})
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
				if (this.tempImgUrl) {
					testObj.image = this.tempImgUrl
				}
				var productColorString = '';
				if (this.formLabelAdd.productColor.length > 0) {
					for (let i = 0; i < this.formLabelAdd.productColor.length; i++) {
						productColorString += `&productColor=${this.formLabelAdd.productColor[i]}`
					}
				}
				var labelIdString = '';
				if (this.selectId.length > 0) {
					for (let i = 0; i < this.selectId.length; i++) {
						labelIdString += `&labelId=${this.selectId[i]}`
					}
				}
				let paramsStr = this.$qs.stringify(testObj) + productColorString + labelIdString
				this.$axios.post('/management/admin/beauty-details!save.action', paramsStr).then(res => {
					this.getTableData('/management/admin/beauty-details!list.action', this.page, this.row, this.tempId);
					this.AddVisible = false;
					this.tempImgUrl = '';
					this.formLabelAdd = {
						name: '',
						greatNumber: '',
						pageView: '',
						moduleId: '',
						videoUrl: '',
						about: '',
						image: '',
						beautyDetailsRelationList: [{
							procedureName: '',
							procedureSort: '',
							childrenProcedureList: [{
								procedureDes: '',
								beautyDetailsRelationId: 0,
								procedureImg: [],
								desSort: '',
								id: 1
							}]
						}]
					};
					this.addFileList = []
				})
			},
			// 取消新增
			cancelAdd() {
				console.log(this.formLabelAdd)
				this.formLabelAdd = {
					name: '',
					greatNumber: '',
					pageView: '',
					productColor: [],
					moduleId: '',
					videoUrl: '',
					about: '',
					image: '',
					beautyDetailsRelationList: [{
						procedureName: '',
						procedureSort: 1,
						childrenProcedureList: [{
							procedureDes: '',
							beautyDetailsRelationId: 0,
							procedureImg: [],
							desSort: 1,
							id: 1
						}]
					}]
				}
				this.stepList = [{
					id: 1,
					name: '步骤1'
				}];
				this.teachStepValue = '步骤1'
				this.addFileList = []
				this.tempImgUrl = '';
				this.choosedBeautiColorList = [];
				this.AddVisible = false;
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
						console.log(res)
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
				if (this.checkedRowId) {
					this.$confirm('确定要进行批量删除么？').then(res => {
						this.$axios.post(`/management/admin/beauty-details!batchDelete.action?ids=${this.checkedRowId}`).then(res => {
							this.$message.success('批量删除成功')
							this.getTableData(`/management/admin/beauty-details!list.action`, this.page, this.row, this.tempId)
						})
					})
				} else {
					this.$message.error('没有选中的行')
				}
			},
			// 导出为Excel
			tableToExcel() {

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
					console.log(idString)
					this.$axios.post(`/management/admin/beauty-details!batchAddLabel.action?ids=${this.checkedRowId}`, idString).then(
						res => {
							if (res.status === 200) {
								this.getTableData('/management/admin/beauty-details!list.action', this.page, this.row, this.tempId);
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
			// 提交搜索
			onSubmitSearch() {
				this.loading = true;
				this.getTableData('/management/admin/beauty-details!list.action', this.page, this.row, '', this.searchForm.text)
			},
			// 树形控件操作
			handleNodeClick(a, b, c) {
				this.tempId = a.id;
				this.getTableData(`/management/admin/beauty-details!list.action`, 1, 10, a.id)
			},
			// 上传操作
			// 判断上传位置
			uploadName(val) {
				console.log(val);
				this.imgPlace = val
			},
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
				// 判断图片保存位置
				if (this.imgPlace.indexOf('addImg') > -1) {
					this.formLabelAdd.image = res.url;
				} else if (this.imgPlace.indexOf('addMiniStep') > -1) {
					this.formLabelAdd.beautyDetailsRelationList[(this.imgPlace.split('-')[1])].childrenProcedureList[(this.imgPlace.split(
						'-')[2])].procedureImg.push(res.url);
				}
				// 清空上传图片参数
				this.imgData = {
					FileName: '',
					imgFile: null
				}
			},
			// 视频上传
			beforeUploadVideo(file) {
				this.videoData.imgFileFileName = file.name;
				this.videoData.imgFile = file
				console.log(file)
			},
			handleRemoveVideo(file, fileList) {
				// this.tempImgUrl = '';
				this.formLabelAdd.videoUrl=''
				console.log(file)
			},
			uploadSuccessVideo(res, file, fileList) {
				this.videoData.imgFileFileName = '';
				this.videoData.imgFile = null
				this.formLabelAdd.videoUrl=res.data
				// 清空上传图片参数
				console.log(res)
				console.log(file)
			},
			// 表格操作
			// 编辑
			edit(index, row) {
				console.log(row)
				this.stepEditList = [];
				this.editStepfileList = [];
				// 获取输入框数据
				var that = this;
				that.editDialogVisible = true;
				that.getModuleData();
				var tempObj = {};
				tempObj.id = row.id;
				tempObj.name = row.name;
				tempObj.greatNumber = row.greatNumber;
				tempObj.pageView = row.pageView;
				tempObj.moduleId = row.moduleId;
				tempObj.videoUrl = row.videoUrl;
				tempObj.about = row.about;
				tempObj.image = row.image;
				tempObj.beautyDetailsRelationList = row.beautyDetailsRelationList
				this.editFormData = tempObj
				// 填充步骤图片数据
				this.editFormData.beautyDetailsRelationList.forEach((item, index) => {
					this.stepEditList.push({
						id: index + 1,
						name: '步骤' + (index + 1)
					})
					this.editStepfileList.push([])
					if (item.childrenProcedureList.length > 0) {
						item.childrenProcedureList.forEach((item1, index1) => {
							this.editStepfileList[index].push([])
							if (item1.procedureImg && item1.procedureImg.length > 0) {
								item1.procedureImg.forEach(item2 => {
									this.editStepfileList[index][index1].push({
										name: '步骤' + (index + 1) + '-' + (index1 + 1) + '图',
										url: item2
									})
								})
							}
						})
					}
				})
				// 格式化标签数据并填充
				if (row.labelId) {
					let tempIdArr = row.labelId.split(',');
					let tempNameArr = row.labelName.split(',');
					for (let i = 0; i < tempIdArr.length; i++) {
						this.choosedLabelList.push({
							id: tempIdArr[i],
							name: tempNameArr[i]
						})
					}
				}
				// 格式化产品色号数据并填充
				that.$axios.get(`/management/admin/beauty-color!getSelectDetail.action?id=${row.id}`).then(res => {
					if (res.data.color && res.data.color.length > 0) {
						this.choosedBeautiColorList = [...res.data.color]
					}
				})
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
					greatNumber: '',
					pageView: '',
					moduleId: '',
					videoUrl: '',
					star: '',
					about: '',
					image: '',
					beautyDetailsRelationList: [{
						procedureName: '',
						procedureSort: 1,
						childrenProcedureList: [{
							procedureDes: '',
							beautyDetailsRelationId: 0,
							procedureImg: [],
							desSort: 1,
							id: 1
						}, ]
					}]
				}
				this.tempImgUrl = '';
				this.editFileList = [];
				this.stepEditList = [];
				this.editStepfileList = [];
				this.teachStepValue = '步骤1'
			},
			// 提交编辑
			handleEdit() {
				console.log(this.editFormData)
				let tempObj = JSON.parse(JSON.stringify(this.editFormData));
				let stepStr = '';
				for (let i = 0; i < tempObj.beautyDetailsRelationList.length; i++) {
					if (tempObj.beautyDetailsRelationList[i].childrenProcedureList.length == 1) {
						tempObj.beautyDetailsRelationList[i].childrenProcedureList[0].desSort = ''
					}
				}
				tempObj.beautyDetailsRelationList = JSON.stringify(tempObj.beautyDetailsRelationList)
				let labelStr = '';
				let colorStr = '';
				if (this.choosedLabelList.length > 0) {
					for (let i = 0; i < this.choosedLabelList.length; i++) {
						labelStr += `&labelId=${this.choosedLabelList[i].id}`
					}
				}
				if (this.choosedBeautiColorList.length > 0) {
					for (let i = 0; i < this.choosedBeautiColorList.length; i++) {
						colorStr += `&productColor=${this.choosedBeautiColorList[i].id}`
					}
				}
				this.$axios.post(`/management/admin/beauty-details!save.action`, this.$qs.stringify(tempObj) +
						colorStr + labelStr)
					.then(res => {
						if (res.data) {
							this.$message.success('修改成功')
							this.getTableData('/management/admin/beauty-details!list.action', this.page, this.row, this.tempId);
							this.editDialogVisible = false;
							this.imgPlace = '';
							this.editFormData = {
								name: '',
								greatNumber: '',
								pageView: '',
								moduleId: '',
								videoUrl: '',
								star: '',
								about: '',
								image: '',
								beautyDetailsRelationList: [{
									procedureName: '',
									procedureSort: 1,
									childrenProcedureList: [{
										procedureDes: '',
										beautyDetailsRelationId: 0,
										procedureImg: [],
										desSort: 1,
										id: 1
									}, ]
								}]
							};
							this.tempImgUrl = '';
							this.editFileList = [];
							this.stepEditList = [];
							this.editStepfileList = [];
							this.teachStepValue = '步骤1'
						} else {
							this.$message.error('好像出了点问题-.-！')
						}
					})
				// 				var testObj = {};
				// 				for (var key in this.editFormData) {
				// 					if (key != 'labelId' && key != 'productColor' && key != 'lableId' && key != 'id') {
				// 						testObj[key] = this.editFormData[key]
				// 					}
				// 				}
				// 				if (this.tempImgUrl) {
				// 					testObj.image = `<img src="${this.tempImgUrl}" alt="" />`
				// 				}
				// 				var productColorString = '';
				// 				if (this.editFormData.productColor.length > 0) {
				// 					for (let i = 0; i < this.editFormData.productColor.length; i++) {
				// 						productColorString += `&productColor=${this.editFormData.productColor[i]}`
				// 					}
				// 				}
				// 				var labelIdString = '';
				// 				if (this.selectIdEdit.length > 0) {
				// 					for (let i = 0; i < this.selectIdEdit.length; i++) {
				// 						labelIdString += `&labelId=${this.selectIdEdit[i]}`
				// 					}
				// 				}
				// 				let paramsStr = this.$qs.stringify(testObj) + labelIdString + productColorString
				// 				this.$axios.post(`/management/admin/beauty-details!save.action?id=${this.editFormData.id}`, paramsStr).then(res => {
				// 					this.getTableData('/management/admin/beauty-details!list.action', this.page, this.row, this.tempId);
				// 					this.editDialogVisible = false;
				// 					this.tempImgUrl = '';
				// 					this.editFormData = {
				// 						name: '',
				// 						greatNumber: '',
				// 						pageView: '',
				// 						moduleId: '',
				// 						videoUrl: '',
				// 						star: '',
				// 						about: '',
				// 						image: '',
				// 						beautyDetailsRelationList: [{
				// 							procedureName: '',
				// 							procedureSort: 1,
				// 							childrenProcedureList: [{
				// 								procedureDes: '',
				// 								procedureImg: [],
				// 								desSort: 1,
				// 								id: 1
				// 							}, ]
				// 						}]
				// 					};
				// 					this.editFileList = []
				// 				})
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
			// 预览H5页面
			checkH5(index, row) {
				console.log(row)
				this.H5PageDialogVisible = true;
				this.viewPageData = row;
				// 色号数据
				this.$axios.get(`/management/admin/beauty-color!getSelectDetail.action?id=${row.id}`).then(res => {
					console.log(res.data)
					if (Object.keys(res.data).length != 0) {
						this.viewPageColorList = [...res.data.color]
					}
				})
			},
			colseViewPage() {
				this.viewStepList = []
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
			// 色号数据
			getColorProductData(page, row, text) {
				this.$axios.post('/management/admin/beauty-color!comboGridlist.action', this.$qs.stringify({
					page: page,
					rows: row,
					q: text
				})).then(res => {
					this.colorTotalNum = res.data.total
					this.productColorOptions = res.data.rows
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
			// 标签操作

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

			// 步骤操作
			removeTab(targetName) {
				let tabs = this.stepList;
				let activeName = this.teachStepValue;
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}
				this.teachStepValue = activeName;
				this.stepList = tabs.filter(tab => tab.name !== targetName);
			},
			removeEditTab(targetName) {
				let tabs = this.stepEditList;
				let activeName = this.teachStepValue;
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}
				this.teachStepValue = activeName;
				this.stepEditList = tabs.filter(tab => tab.name !== targetName);
			},
			addMainStep() {
				let newTabName = this.stepList.length + 1;
				this.stepList.push({
					id: this.stepList.length + 1,
					name: '步骤' + newTabName
				});
				this.teachStepValue = this.stepList[this.stepList.length - 1].name;
				this.formLabelAdd.beautyDetailsRelationList.push({
					procedureName: '',
					procedureSort: this.formLabelAdd.beautyDetailsRelationList.length + 1,
					childrenProcedureList: [{
						procedureDes: "",
						beautyDetailsRelationId: 0,
						procedureImg: [],
						desSort: 1,
						id: 1
					}]
				})
				console.log(this.formLabelAdd.beautyDetailsRelationList)
			},
			editAddMainStep() {
				let newTabName = this.stepEditList.length + 1 + '';
				this.stepEditList.push({
					id: this.stepEditList.length + 1,
					name: '步骤' + newTabName
				});
				// this.teachStepValue = this.stepEditList[this.stepEditList.length - 1].name;
				this.editFormData.beautyDetailsRelationList.push({
					procedureName: '',
					procedureSort: this.editFormData.beautyDetailsRelationList.length + 1,
					childrenProcedureList: [{
						procedureDes: "",
						beautyDetailsRelationId: 0,
						procedureImg: [],
						desSort: 1,
						id: 1
					}]
				})
				this.editStepfileList.push([
					[]
				])
			},
			addMiniStep(index) {
				console.log(index)
				this.formLabelAdd.beautyDetailsRelationList[index].childrenProcedureList.push({
					id: this.formLabelAdd.beautyDetailsRelationList[index].childrenProcedureList.length + 1,
					procedureDes: '',
					beautyDetailsRelationId: 0,
					procedureImg: [],
					desSort: this.formLabelAdd.beautyDetailsRelationList[index].childrenProcedureList.length + 1
				})
			},
			editAddMiniStep(index) {
				console.log(index)
				this.editFormData.beautyDetailsRelationList[index].childrenProcedureList.push({
					id: this.editFormData.beautyDetailsRelationList[index].childrenProcedureList.length + 1,
					procedureDes: '',
					beautyDetailsRelationId: 0,
					procedureImg: [],
					desSort: this.editFormData.beautyDetailsRelationList[index].childrenProcedureList.length + 1
				})
			},
			deleteMiniStep(index1, index2) {
				this.formLabelAdd.beautyDetailsRelationList[index1].childrenProcedureList.splice(index2, 1);
			},
			editDeleteMiniStep(index1, index2) {
				this.editFormData.beautyDetailsRelationList[index1].childrenProcedureList.splice(index2, 1);
			}
		},
		mounted() {
			// 			this.$axios.get('/management/admin/beauty-details!dataConvert.action').then(res => {
			// 				console.log(res)
			// 			})
			this.getTableData('/management/admin/beauty-details!list.action', 1, 10);
			this.$axios.get('/management/admin/label!getTree.action').then(res => {
				this.treeData = res.data;
				this.tagOptions = res.data;
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

	/* 步骤选择器 */
	.stepBox>.el-form-item {
		margin: 10px 0;
	}

	.miniStepBox {
		margin: 10px auto;
		border: 1px solid #eee;
		border-radius: 5px;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
		transition: all .5s;
	}

	.miniStepBox>p {
		line-height: 30px;
		margin: 10px 0;
		position: relative;
	}

	.miniStepBox>p .deleteMiniStep {
		position: absolute;
		top: 5px;
		right: 5px;
		font-size: 20px;
		color: #333;
		width: 30px;
		height: 30px;
	}

	.miniStepBox .el-form-item {
		margin: 10px 0;
	}

	/* 预览页面样式 */
	a {
		text-decoration: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	a:focus {
		outline: none;
	}

	a:link {
		text-decoration: none;
	}

	a:visited {
		text-decoration: none;
	}

	a:hover {
		text-decoration: none;
	}

	a:active {
		text-decoration: none;
	}


	img,
	object {
		-moz-background-size: contain;
		-webkit-background-size: contain;
		-o-background-size: contain;
		background-size: contain;
		width: 100%;
		height: auto;
	}

	.content {
		width: 100%;
		height: 770px;
		position: relative;
		min-width: 1000px;
	}

	/* H5 页面预览 */
	.content .phoneBorder {
		position: absolute;
		width: 378px;
		height: auto;
		left: 5%;
	}

	.content .pageContent {
		position: absolute;
		height: 579px;
		width: 330px;
		top: 95px;
		left: calc(5% + 25px);
		overflow-y: auto;
	}

	.pageContent::-webkit-scrollbar,
	.productContent::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 3px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 3px;
	}

	.pageContent::-webkit-scrollbar-thumb,
	.productContent::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(255, 255, 255, 0.7);
	}

	.pageContent::-webkit-scrollbar-track,
	.productContent::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.2);
	}


	#title {
		font-size: 17.1px !important;
		color: #333333;
		line-height: 23.9px;
		margin: 17.1px 12.8px 0px 12.8px;
	}

	#time {
		margin: 3.4px 12.8px 0px 12.8px;
	}

	#time span {
		font-size: 10.2px !important;
		color: #aaaaaa;
		line-height: 14.5px;
		margin-right: 8.5px;
	}

	#time img {
		width: 10.24px;
		height: 7.68px;
		margin-right: 4.27px;
	}

	#label {
		margin: 0px 12.8px 0px 12.8px;
	}

	#labelLeft {
		font-size: 10.2px !important;
		float: left;
	}

	#labelLeft a {
		display: inline-block;
		font-size: 10.2px !important;
		color: #C09CFF;
		background: #F2EBFF;
		border-radius: 3.4px;
		line-height: 14.5px;
		padding: 4.3px 8.6px;
		margin: 10.2px 11.96px 0px 0px;
	}

	.rate {
		margin: 7.68px 12.8px 0px;
		opacity: 0.9;
	}

	.rate p {
		float: left;
		font-size: 11.95px;
		margin: 0;
		color: #a87bff;
		lopacity: 0.9;
		line-height: 18.77px;
	}

	.rate ul {
		float: left;
		list-style: none;
		margin: 0;
		padding-left: 10px;
	}

	.rate ul li {
		display: inline;
		margin-left: 2.56px;
	}

	.rate ul li img {
		width: 11.95px;
		height: 11.95px;
	}

	#about {
		font-size: 11.9px !important;
		color: #999999;
		line-height: 17.1px;
		margin: 7.7px 12.8px 0px 12.8px;
	}

	.stripes {
		position: relative;
		height: 27.3px;
		width: 215px;
		margin: 41.8px 49.5px 0px 55.5px;

		-webkit-background-size: 4.3px 4.3px;
		-moz-background-size: 4.3px 4.3px;
		background-size: 4.3px 4.3px;

		-moz-box-shadow: 0px 0px 0px gray;
		-webkit-box-shadow: 0px 0px 0px gray;
		box-shadow: 0px 0px 0px gray;
	}

	.column {
		position: absolute;
		height: 27.3px;
		width: 250px;
		background: #F0E6FF;
		left: 50%;
		margin-top: -22.2px;
		margin-left: -125px;
	}

	.column img {
		height: 35.8px;
		width: 44.4px;
		margin: -11.9px 55.5px 4.3px 114.3px;
	}

	.gifSize {
		padding: 0 12.8px 0 12.8px;
	}

	.wordart {
		position: inherit;
		font-family: SnellRoundhand;
		font-style: italic;
		font-size: 59.7px;
		line-height: 75.9px;
		color: #333333;
		letter-spacing: -1.3px;
		margin: -36.7px 120.3px -11.9px 10px;
	}

	.wordart1 {
		margin-left: -14px;
		font-size: 50px;
	}

	.abbreviation {
		position: inherit;
		line-height: 21.3px;
		font-family: 'PingFangSC-Regular', sans-serif;
		font-size: 15.4px;
		color: #333333;
		letter-spacing: -0.33px;
		margin: 3.4px 161.3px 2.6px 46.7px;
	}

	.columnName {
		position: inherit;
		width: 100px;
		line-height: 21.3px;
		font-family: 'PingFangSC-Light', sans-serif;
		font-size: 15.4px;
		color: #333333;
		letter-spacing: -0.33px;
		margin: 3.4px 122px 2.6px 62.3px;
	}

	.intro {
		margin: 0px 12.8px 0px 12.8px;
	}

	.intro p {
		font-size: 16px;
		color: #333333;
		letter-spacing: -0.25px;
		line-height: 24px;
		margin: 40px 0px 0px 0px;
	}

	.intro p:last-child {
		padding-bottom: 42.67px;
	}

	.intro img {
		margin: 17.06px 0px 2.6px 0px;
	}

	.sequence {
		float: left;
		position: relative;
		height: 13.7px;
		width: 12.8px;
		margin-left: 8.5px;
		margin-right: 4.7px;
		background-color: #CBA6FF;
		display: inline;
		margin-top: 3px;
	}

	.sequence span {
		position: absolute;
		line-height: 11.9px;
		font-family: 'PingFangSC-Light', sans-serif;
		font-size: 8.5px;
		color: #FFFFFF;
		margin: 0.85px 3.4px 0.85px 0.85px;
	}

	.sequence1 {
		position: absolute;
		z-index: -1;
		height: 11.9px;
		width: 12.8px;
		border: 1px solid #333333;
		margin: 2.6px 0 0 0.43px;

		-moz-box-shadow: -0.43px 0.43px 0px #B581FF inset, -0.43px 0.43px 0px #B581FF;
		-webkit-box-shadow: -0.43px 0.43px 0px #B581FF inset, -0.43px 0.43px 0px #B581FF;
		box-shadow: -0.43px 0.43px 0px #B581FF inset, -0.43px 0.43px 0px #B581FF;
	}


	.angled {
		background-color: #fff;
		background-image: -webkit-gradient(linear, 0 100%, 100% 0,
			color-stop(.25, rgba(153, 153, 153, .2)), color-stop(.25, transparent),
			color-stop(.5, transparent), color-stop(.5, rgba(153, 153, 153, .2)),
			color-stop(.75, rgba(153, 153, 153, .2)), color-stop(.75, transparent),
			to(transparent));
		background-image: -moz-linear-gradient(45deg, rgba(153, 153, 153, .2) 25%, transparent 25%,
			transparent 50%, rgba(153, 153, 153, .2) 50%, rgba(153, 153, 153, .2) 75%,
			transparent 75%, transparent);
		background-image: -o-linear-gradient(45deg, rgba(153, 153, 153, .2) 25%, transparent 25%,
			transparent 50%, rgba(153, 153, 153, .2) 50%, rgba(153, 153, 153, .2) 75%,
			transparent 75%, transparent);
		background-image: linear-gradient(45deg, rgba(153, 153, 153, .2) 25%, transparent 25%,
			transparent 50%, rgba(153, 153, 153, .2) 50%, rgba(153, 153, 153, .2) 75%,
			transparent 75%, transparent);
	}

	#videoElement {
		width: 100%;
		height: auto;
		margin: 0px;
		padding: 0px;
	}

	.download {
		box-sizing: border-box;
		height: 60px;
		width: 100%;
		color: #fff;
		font-size: 17px;
		text-align: center;
		line-height: 40px;
		padding: 0px 12px;
		position: fixed;
		bottom: 0px;
		padding-bottom: 10px;
		padding-top: 10px;
		background-color: #fff;
		z-index: 100;
	}

	.download a {
		text-decoration: none;
	}

	.download .btn {
		background: #a87bff;
		height: 40px;
		width: 100%;
		display: block;
		color: #fff;
		border-radius: 4px;
	}

	.overlay {
		display: none;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		background: #000;
		opacity: 0.3;
		text-align: center;
		color: #fff;
		font-size: 15px;
		z-index: 10;
	}

	.blur {
		-webkit-filter: blur(18px);
		/* Chrome, Opera */
		-moz-filter: blur(18px);
		-ms-filter: blur(18px);
		filter: blur(18px);
	}

	/* 产品清单预览 */
	.content .productBox {
		position: absolute;
		width: 378px;
		height: auto;
		display: block;
		left: 60%;
	}

	.content .productContent {
		position: absolute;
		height: 579px;
		width: 330px;
		top: 95px;
		left: calc(60% + 25px);
		overflow-y: auto;
	}

	.productContent .productTitle {
		text-align: center;
		line-height: 40px;
		font-size: 16px;
		border-bottom: 1px solid #ccc;
	}

	.productContent .productItem {
		padding: 10px;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		position: relative;
		padding-left: 110px;
		min-height: 100px;
	}

	.productItem img {
		position: absolute;
		top: 15px;
		left: 10px;
		width: 80px;
		height: 80px;
	}

	.productItem p:nth-of-type(1) {
		font-size: 12px;
		line-height: 16px;
	}

	.productItem p:nth-of-type(2) {
		font-size: 10px;
		line-height: 16px;
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

	.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 10px;
	}

	.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}

	.labelTable::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 6px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	.labelTable::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.4);
	}

	.labelTable::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.2);
	}

	.table.el-table td {
		padding: 10px 0;
	}

	.labelTable.el-table td {
		padding: 5px 0;
	}

	.el-tabs__new-tab {
		margin-right: 15px;
	}
</style>
