<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增</el-button>
      <el-dialog title="图片预览" :visible.sync="imgVisible" append-to-body>
        <img :src="img" alt style="width:100%">
      </el-dialog>
      <el-dialog title="新增" :visible.sync="AddVisible" width="80%" @opene="addOPen">
        <el-form :model="formAdd">
          <el-form-item label="类型" label-width="120px">
            <el-input v-model="formAdd.type"></el-input>
          </el-form-item>
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labelId1" placeholder="请选择标签">
              <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定教程1 id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId1"></el-input>
          </el-form-item>
          <el-form-item label="图片1" label-width="120px">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-success="handleSuccess1"
              :file-list="fileList1"
              :before-upload="beforeUpload1"
              list-type="picture"
            >
              <el-button size="small" type="primary" @click="uploadName(1)">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labelId2" placeholder="请选择标签">
              <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定教程2 id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId2"></el-input>
          </el-form-item>
          <el-form-item label="图片2" label-width="120px">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-success="handleSuccess1"
              :file-list="fileList2"
              :before-upload="beforeUpload1"
              list-type="picture"
            >
              <el-button size="small" type="primary" @click="uploadName(2)">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labelId3" placeholder="请选择标签">
              <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定教程3 id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId3"></el-input>
          </el-form-item>
          <el-form-item label="图片3" label-width="120px">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-success="handleSuccess1"
              :before-upload="beforeUpload1"
              :file-list="fileList3"
              list-type="picture"
            >
              <el-button size="small" type="primary" @click="uploadName(3)">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labelId4" placeholder="请选择标签">
              <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定教程4 id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId4"></el-input>
          </el-form-item>
          <el-form-item label="图片4" label-width="120px">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-success="handleSuccess1"
              :before-upload="beforeUpload1"
              :file-list="fileList4"
              list-type="picture"
            >
              <el-button size="small" type="primary" @click="uploadName(4)">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labelId5" placeholder="请选择标签">
              <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定教程5 id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId5"></el-input>
          </el-form-item>
          <el-form-item label="图片5" label-width="120px">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-success="handleSuccess1"
              :before-upload="beforeUpload1"
              :file-list="fileList5"
              list-type="picture"
            >
              <el-button size="small" type="primary" @click="uploadName(5)">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labelId6" placeholder="请选择标签">
              <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定教程6 id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId6"></el-input>
          </el-form-item>
          <el-form-item label="图片6" label-width="120px">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-success="handleSuccess1"
              :before-upload="beforeUpload1"
              :file-list="fileList6"
              list-type="picture"
            >
              <el-button size="small" type="primary" @click="uploadName(6)">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labelId7" placeholder="请选择标签">
              <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定教程7 id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId7"></el-input>
          </el-form-item>
          <el-form-item label="图片7" label-width="120px">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-success="handleSuccess1"
              :before-upload="beforeUpload1"
              :file-list="fileList7"
              list-type="picture"
            >
              <el-button size="small" type="primary" @click="uploadName(7)">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labelId8" placeholder="请选择标签">
              <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定教程8 id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId9"></el-input>
          </el-form-item>
          <el-form-item label="图片8" label-width="120px">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-success="handleSuccess1"
              :before-upload="beforeUpload1"
              :file-list="fileList8"
              list-type="picture"
            >
              <el-button size="small" type="primary" @click="uploadName(8)">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labelId9" placeholder="请选择标签">
              <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定教程9 id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId9"></el-input>
          </el-form-item>
          <el-form-item label="图片9" label-width="120px">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-success="handleSuccess1"
              :before-upload="beforeUpload1"
              :file-list="fileList9"
              list-type="picture"
            >
              <el-button size="small" type="primary" @click="uploadName(9)">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labelId10" placeholder="请选择标签">
              <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定教程10 id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId10"></el-input>
          </el-form-item>
          <el-form-item label="图片10" label-width="120px">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-success="handleSuccess1"
              :before-upload="beforeUpload1"
              :file-list="fileList10"
              list-type="picture"
            >
              <el-button size="small" type="primary" @click="uploadName(10)">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labelId11" placeholder="请选择标签">
              <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定教程11 id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId11"></el-input>
          </el-form-item>
          <el-form-item label="图片11" label-width="120px">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-success="handleSuccess1"
              :before-upload="beforeUpload1"
              :file-list="fileList11"
              list-type="picture"
            >
              <el-button size="small" type="primary" @click="uploadName(11)">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="labelCountList" border style="width: 100%" align="center">
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)" v-has>编辑</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, labelCountList)"
            type="danger"
            size="small"
            v-del
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="EditVisible" width="80%">
      <el-form :model="formEdit">
        <el-form-item label="类型" label-width="120px">
          <el-input v-model="formEdit.type"></el-input>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.label1" placeholder="请选择标签">
            <el-option
              :label="item.name"
              :value="item.id.toString()"
              v-for="item in labelList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定教程1 id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId1"></el-input>
        </el-form-item>
        <el-form-item label="图片1" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :file-list="fileList1"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary" @click="uploadName(1)">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.label2" placeholder="请选择标签">
            <el-option
              :label="item.name"
              :value="item.id.toString()"
              v-for="item in labelList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定教程2 id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId2"></el-input>
        </el-form-item>
        <el-form-item label="图片2" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :file-list="fileList2"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary" @click="uploadName(2)">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.label3" placeholder="请选择标签">
            <el-option
              :label="item.name"
              :value="item.id.toString()"
              v-for="item in labelList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定教程3 id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId3"></el-input>
        </el-form-item>
        <el-form-item label="图片3" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :file-list="fileList3"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary" @click="uploadName(3)">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.label4" placeholder="请选择标签">
            <el-option
              :label="item.name"
              :value="item.id.toString()"
              v-for="item in labelList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定教程4 id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId4"></el-input>
        </el-form-item>
        <el-form-item label="图片4" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :file-list="fileList4"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary" @click="uploadName(4)">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.label5" placeholder="请选择标签">
            <el-option
              :label="item.name"
              :value="item.id.toString()"
              v-for="item in labelList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定教程5 id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId5"></el-input>
        </el-form-item>
        <el-form-item label="图片5" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :file-list="fileList5"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary" @click="uploadName(5)">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.label6" placeholder="请选择标签">
            <el-option
              :label="item.name"
              :value="item.id.toString()"
              v-for="item in labelList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定教程6 id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId6"></el-input>
        </el-form-item>
        <el-form-item label="图片6" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :file-list="fileList6"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary" @click="uploadName(6)">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.label7" placeholder="请选择标签">
            <el-option
              :label="item.name"
              :value="item.id.toString()"
              v-for="item in labelList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定教程7 id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId7"></el-input>
        </el-form-item>
        <el-form-item label="图片7" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :file-list="fileList7"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary" @click="uploadName(7)">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.label8" placeholder="请选择标签">
            <el-option
              :label="item.name"
              :value="item.id.toString()"
              v-for="item in labelList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定教程8 id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId9"></el-input>
        </el-form-item>
        <el-form-item label="图片8" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :file-list="fileList8"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary" @click="uploadName(8)">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.label9" placeholder="请选择标签">
            <el-option
              :label="item.name"
              :value="item.id.toString()"
              v-for="item in labelList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定教程9 id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId9"></el-input>
        </el-form-item>
        <el-form-item label="图片9" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :file-list="fileList9"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary" @click="uploadName(9)">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.label10" placeholder="请选择标签">
            <el-option
              :label="item.name"
              :value="item.id.toString()"
              v-for="item in labelList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定教程10 id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId10"></el-input>
        </el-form-item>
        <el-form-item label="图片10" label-width="120px">
          <el-upload
            v-model="formAdd.image10"
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :file-list="fileList10"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary" @click="uploadName(10)">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.label11" placeholder="请选择标签">
            <el-option
              :label="item.name"
              :value="item.id.toString()"
              v-for="item in labelList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定教程11 id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId11"></el-input>
        </el-form-item>
        <el-form-item label="图片11" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :file-list="fileList11"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary" @click="uploadName(11)">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit('formEdit')">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-sizes="[10, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum1"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCountList: [],
      labelList: [],
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      fileList5: [],
      fileList6: [],
      fileList7: [],
      fileList8: [],
      fileList9: [],
      fileList10: [],
      fileList11: [],
      imgData1: {},
      formAdd: {},
      formEdit: {},
      imgVal: -1,
      img: "",
      AddVisible: false,
      EditVisible: false,
      imgVisible: false,
      idx: -1,
      currentPage1: 1,
      page1: 1,
      row1: 10,
      totalNum1: 1
    };
  },
  mounted() {
    this.getlabelCountList(1, 10);
    this.getlabelList();
  },
  methods: {
    getImgUrl(str) {
      let testExp = /http.*?(\.png|\.jpg|\.gif|\.jpeg)/gi;
      if (str) {
        return str.match(testExp)[0];
      }
    },
    getlabelCountList(page1, row1) {
      this.$axios
        .get("/management/admin/interest-group!list.action", {
          params: { page: page1, row: row1 }
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.labelCountList = res.data.rows;
            this.totalNum1 = res.data.total;
          }
        });
    },
    getlabelList() {
      this.$axios
        .get("/management/admin/label!getTreeGrid.action?id=1")
        .then(res => {
          if (res.status == 200) {
            this.labelList = res.data;
          }
        });
    },
    //新增dialog打开回调
    addOPen() {
      this.formAdd = {};
      this.fileList1 = [];
      this.fileList2 = [];
      this.fileList3 = [];
      this.fileList4 = [];
      this.fileList5 = [];
      this.fileList6 = [];
      this.fileList7 = [];
      this.fileList8 = [];
      this.fileList9 = [];
      this.fileList10 = [];
      this.fileList11 = [];
    },
    //新增
    handleAdd() {
      this.$axios
        .post(
          "/management/admin/interest-group!save.action",
          this.$qs.stringify(this.formAdd)
        )
        .then(res => {
          if (res.status == 200) {
            this.AddVisible = false;
            this.$message.success(`添加成功`);
            this.formAdd = {};
            this.getlabelCountList();
          }
        });
    },
    //编辑
    handleEdit(row) {
      console.log(row);
      this.formEdit = {};
      this.fileList1 = [];
      this.fileList2 = [];
      this.fileList3 = [];
      this.fileList4 = [];
      this.fileList5 = [];
      this.fileList6 = [];
      this.fileList7 = [];
      this.fileList8 = [];
      this.fileList9 = [];
      this.fileList10 = [];
      this.fileList11 = [];
      this.EditVisible = true;
      this.idx = row.id;
      this.$axios
        .get(`/management/admin/interest-group!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.formEdit = res.data;
            this.fileList1 = [
              { url: this.getImgUrl(this.formEdit.image1), name: "图片1" }
            ];
            this.fileList2 = [
              { url: this.getImgUrl(this.formEdit.image2), name: "图片2" }
            ];
            this.fileList3 = [
              { url: this.getImgUrl(this.formEdit.image3), name: "图片3" }
            ];
            this.fileList4 = [
              { url: this.getImgUrl(this.formEdit.image4), name: "图片4" }
            ];
            this.fileList5 = [
              { url: this.getImgUrl(this.formEdit.image5), name: "图片5" }
            ];
            this.fileList6 = [
              { url: this.getImgUrl(this.formEdit.image6), name: "图片6" }
            ];
            this.fileList7 = [
              { url: this.getImgUrl(this.formEdit.image7), name: "图片7" }
            ];
            this.fileList8 = [
              { url: this.getImgUrl(this.formEdit.image8), name: "图片8" }
            ];
            this.fileList9 = [
              { url: this.getImgUrl(this.formEdit.image9), name: "图片9" }
            ];
            this.fileList10 = [
              { url: this.getImgUrl(this.formEdit.image10), name: "图片10" }
            ];
            this.fileList11 = [
              { url: this.getImgUrl(this.formEdit.image11), name: "图片11" }
            ];
            console.log(this.fileList1, "");
          }
        });
    },
    //保存编辑
    saveEdit() {
      this.$axios
        .post(
          `/management/admin/category-problem!save.action?id=${this.idx}`,
          this.$qs.stringify({
            answer: this.formEdit.answer,
            problem: this.formEdit.problem
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.EditVisible = false;
            this.$message.success(`修改成功`);
            this.getlabelCountList();
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
          .get(
            `/management/admin/interest-group!delete.action?id=${
              rows[index].id
            }`
          )
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getlabelCountList();
            }
          });
      });
    },
    //图片上传
    uploadName(val) {
      this.imgVal = val;
    },
    handlePreview(file) {
      this.img = file.url;
      this.imgVisible = true;
    },
    beforeUpload1(file) {
      console.log(file);
      this.imgData1.FileName = file.name;
      this.imgData1.imgFile = file;
    },
    handleSuccess1(res) {
      console.log(res);
      switch (this.imgVal) {
        case 1:
          this.formAdd.image1 = res.url;
          if (this.EditVisible) {
            this.formEdit.image1 = res.url;
          }
          break;
        case 2:
          this.formAdd.image2 = res.url;
          if (this.EditVisible) {
            this.formEdit.image1 = res.url;
          }
          break;
        case 3:
          this.formAdd.image3 = res.url;
          if (this.EditVisible) {
            this.formEdit.image1 = res.url;
          }
          break;
        case 4:
          this.formAdd.image4 = res.url;
          if (this.EditVisible) {
            this.formEdit.image1 = res.url;
          }
          break;
        case 5:
          this.formAdd.image5 = res.url;
          if (this.EditVisible) {
            this.formEdit.image1 = res.url;
          }
          break;
        case 6:
          this.formAdd.image6 = res.url;
          if (this.EditVisible) {
            this.formEdit.image1 = res.url;
          }
          break;
        case 7:
          this.formAdd.image7 = res.url;
          if (this.EditVisible) {
            this.formEdit.image1 = res.url;
          }
          break;
        case 8:
          this.formAdd.image8 = res.url;
          if (this.EditVisible) {
            this.formEdit.image1 = res.url;
          }
          break;
        case 9:
          this.formAdd.image9 = res.url;
          if (this.EditVisible) {
            this.formEdit.image1 = res.url;
          }
          break;
        case 10:
          this.formAdd.image10 = res.url;
          if (this.EditVisible) {
            this.formEdit.image1 = res.url;
          }
          break;
        case 11:
          this.formAdd.image11 = res.url;
          if (this.EditVisible) {
            this.formEdit.image1 = res.url;
          }
          break;
      }
    },
    //分页
    handleSizeChange(val) {
      this.row1 = val;
      this.getlabelCountList(this.page1, this.row1);
    },
    handleCurrentChange(val) {
      this.page1 = val;
      this.getlabelCountList(this.page1, this.row1);
    }
  }
};
</script>

<style scoped>
.search {
  margin-bottom: 10px;
}
</style>