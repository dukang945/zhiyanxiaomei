<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="80%" @opened="addOPen">
        <el-form :model="formAdd">
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labels" placeholder="请选择标签">
              <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="教程id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId"></el-input>
          </el-form-item>
          <el-form-item label="脸部描述" label-width="120px">
            <textarea id="faceDescAdd" rows="10" cols="80"></textarea>
          </el-form-item>
          <el-form-item label="脸部修容图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-remove="handleRemove1"
              :on-success="handleSuccess1"
              :file-list="fileList1"
              :before-upload="beforeUpload1"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="脸部修容画法" label-width="120px">
            <textarea id="faceMakeAdd" rows="10" cols="80"></textarea>
          </el-form-item>
          <el-form-item label="脸部腮红图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData2"
              :on-remove="handleRemove2"
              :on-success="handleSuccess2"
              :file-list="fileList2"
              :before-upload="beforeUpload2"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="脸部腮红画法" label-width="120px">
            <textarea id="faceBlushAdd" rows="10" cols="80"></textarea>
          </el-form-item>
          <el-form-item label="脸部眉头图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData3"
              :on-remove="handleRemove3"
              :on-success="handleSuccess3"
              :file-list="fileList3"
              :before-upload="beforeUpload3"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="脸部眉头画法" label-width="120px">
            <textarea id="faceBrowsAdd" rows="10" cols="80"></textarea>
          </el-form-item>
          <el-form-item label="搜索产品" label-width="120px">
            <el-input v-model="searchBeautiColor" @input="getBeautiColorList" clearable></el-input>
            <el-table
              :data="beautiColorTableData"
              @row-click="selectBeautiColor"
              border
              style="width: 100%"
              v-loading="loading"
              v-if="searchBeautiColor"
              class="labelTable"
            >
              <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
              <el-table-column prop="name" label="色号名" align="center"></el-table-column>
              <el-table-column prop="productName" label="商品名" align="center"></el-table-column>
            </el-table>
            <div class="labelChoosed">已选产品：
              <span
                v-for="(item,key) in choosedBeautiColorList"
                v-dragging="{ list: choosedBeautiColorList, item: item, group: 'name' }"
              >
                {{item.name}}
                <i class="el-icon-error" @click="deleteBeautiColor(key)"></i>
              </span>
            </div>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="labelCountList" border align="center">
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="labelName" label="标签名称" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
            v-has
          >编辑</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, labelCountList)"
            type="danger"
            size="small"
            class="el-icon-delete"
            v-del
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="TableVisible" width="80%">
      <el-form :model="formEdit">
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.labels" placeholder="请选择标签">
            <el-option
              :label="item.name"
              :value="item.id.toString()"
              v-for="item in labelList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教程id" label-width="120px">
            <el-input v-model="formEdit.beautyDetailsId"></el-input>
          </el-form-item>
        <el-form-item label="脸部描述" label-width="120px">
          <textarea id="faceDesc" rows="10" cols="80"></textarea>
        </el-form-item>
        <el-form-item label="脸部修容图片" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-remove="handleRemove1"
            :on-success="handleSuccess1"
            :file-list="fileList1"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="脸部修容画法" label-width="120px">
          <textarea id="faceMake" rows="10" cols="80"></textarea>
        </el-form-item>
        <el-form-item label="脸部腮红图片" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData2"
            :on-remove="handleRemove2"
            :on-success="handleSuccess2"
            :file-list="fileList2"
            :before-upload="beforeUpload2"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="脸部腮红画法" label-width="120px">
          <textarea id="faceBlush" rows="10" cols="80"></textarea>
        </el-form-item>
        <el-form-item label="脸部眉头图片" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData3"
            :on-remove="handleRemove3"
            :on-success="handleSuccess3"
            :file-list="fileList3"
            :before-upload="beforeUpload3"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="脸部眉头画法" label-width="120px">
          <textarea id="faceBrows" rows="10" cols="80"></textarea>
        </el-form-item>
        <el-form-item label="搜索产品" label-width="120px">
          <el-input v-model="searchBeautiColor" @input="getBeautiColorList" clearable></el-input>
          <el-table
            :data="beautiColorTableData"
            @row-click="selectBeautiColor"
            border
            style="width: 100%"
            v-loading="loading"
            v-if="searchBeautiColor"
            class="labelTable"
          >
            <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
            <el-table-column prop="name" label="色号名" align="center"></el-table-column>
            <el-table-column prop="productName" label="商品名" align="center"></el-table-column>
          </el-table>
          <div class="labelChoosed">已选产品：
            <span
              v-for="(item,key) in choosedBeautiColorList"
              v-dragging="{ list: choosedBeautiColorList, item: item, group: 'name' }"
            >
              {{item.name}}
              <i class="el-icon-error" @click="deleteBeautiColor(key)"></i>
            </span>
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="TableVisible = false">取 消</el-button>
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
import CKEDITOR from "CKEDITOR";
export default {
  name: "editorAdd",
  data() {
    return {
      labelCountList: [],
      labelList: [],
      fileList1: [],
      fileList2: [],
      fileList3: [],
      imgData1: {},
      imgData2: {},
      imgData3: {},
      TableVisible: false,
      AddVisible: false,
      editor: false,
      editorAdd: false,
      loading: true,
      dateVal: "",
      eyesDescribe: "",
      idx: -1,
      currentPage1: 1,
      page1: 1,
      page2: 1,
      row1: 10,
      row2: 10,
      totalNum1: 1,
      totalNum2: 1,
      formEdit: {},
      formAdd: {},
      labelTableData: [], //标签表格数据
      searchLabel: "", //搜索标签输入框
      choosedLabelList: [], //已选中标签列表
      beautiColorTableData: [], //色号表格数据
      searchBeautiColor: "", //搜索色号输入框
      choosedBeautiColorList: [] //已选中色号列表
    };
  },
  mounted() {
    this.getlabelCountList(1, 10);
    this.getlabelList();
  },

  methods: {
    // 色号操作

    // 获取色号列表
    getBeautiColorList(val) {
      this.$axios
        .post(
          "/management/admin/beauty-color!comboGridlist.action",
          this.$qs.stringify({
            page: 1,
            rows: 50,
            q: val
          })
        )
        .then(res => {
          this.beautiColorTableData = res.data.rows;
          this.loading = false;
        });
    },
    // 删除色号
    deleteBeautiColor(key) {
      this.choosedBeautiColorList.splice(key, 1);
    },
    // 点击单选
    selectBeautiColor(row) {
      this.choosedBeautiColorList.push(row);
    },
    getlabelCountList(page1, row1) {
      this.$axios.post("/management/admin/face!list.action", this.$qs.stringify({
            page: page1,
            row: row1
          })).then(res => {
        if (res.status == 200) {
          console.log(res);
          this.labelCountList = res.data.rows;
          this.totalNum1 = res.data.total;
        }
      });
    },
    getlabelList() {
      this.$axios
        .get(`/management/admin/label!getTreeGrid.action?id=778`)
        .then(res => {
          if (res.status == 200) {
            this.labelList = res.data;
          }
        });
    },
    //初始化文本编辑器
    getCkeditor() {
      CKEDITOR.replace("faceDesc", {
        height: 100,
        resize_maxHeight: 3000,
        filebrowserImageUploadUrl:
          "/management/admin/kcupload!uploadImg.action?type=goods_path",
        filebrowserBrowseUrl:
          "/management/admin/kcupload!getImages.action?type=cosmetics_img",
        extraPlugins: "beautyappraisal",
        toolbar: [
          {
            name: "document",
            items: ["Source", "-", "Templates"]
          },
          {
            name: "clipboard",
            items: ["-", "Undo", "Redo"]
          },
          {
            name: "insert",
            items: ["-", "Image"]
          },
          {
            name: "paragraph",
            items: [
              "-",
              "JustifyLeft",
              "JustifyCenter",
              "JustifyRight",
              "JustifyBlock"
            ]
          },
          {
            name: "colors",
            items: ["-", "TextColor"]
          }
        ],
        // contentsCss: './static/ckeditor/style.css',
        contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });

      CKEDITOR.replace("faceBlush", {
        height: 100,
        resize_maxHeight: 3000,
        filebrowserImageUploadUrl:
          "/management/admin/kcupload!uploadImg.action?type=goods_path",
        filebrowserBrowseUrl:
          "/management/admin/kcupload!getImages.action?type=cosmetics_img",
        extraPlugins: "beautyappraisal",
        toolbar: [
          {
            name: "document",
            items: ["Source", "-", "Templates"]
          },
          {
            name: "clipboard",
            items: ["-", "Undo", "Redo"]
          },
          {
            name: "insert",
            items: ["-", "Image"]
          },
          {
            name: "paragraph",
            items: [
              "-",
              "JustifyLeft",
              "JustifyCenter",
              "JustifyRight",
              "JustifyBlock"
            ]
          },
          {
            name: "colors",
            items: ["-", "TextColor"]
          }
        ],
        // contentsCss: './static/ckeditor/style.css',
        contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });

      CKEDITOR.replace("faceBrows", {
        height: 100,
        resize_maxHeight: 3000,
        filebrowserImageUploadUrl:
          "/management/admin/kcupload!uploadImg.action?type=goods_path",
        filebrowserBrowseUrl:
          "/management/admin/kcupload!getImages.action?type=cosmetics_img",
        extraPlugins: "beautyappraisal",
        toolbar: [
          {
            name: "document",
            items: ["Source", "-", "Templates"]
          },
          {
            name: "clipboard",
            items: ["-", "Undo", "Redo"]
          },
          {
            name: "insert",
            items: ["-", "Image"]
          },
          {
            name: "paragraph",
            items: [
              "-",
              "JustifyLeft",
              "JustifyCenter",
              "JustifyRight",
              "JustifyBlock"
            ]
          },
          {
            name: "colors",
            items: ["-", "TextColor"]
          }
        ],
        // contentsCss: './static/ckeditor/style.css',
        contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });
      CKEDITOR.replace("faceMake", {
        height: 100,
        resize_maxHeight: 3000,
        filebrowserImageUploadUrl:
          "/management/admin/kcupload!uploadImg.action?type=goods_path",
        filebrowserBrowseUrl:
          "/management/admin/kcupload!getImages.action?type=cosmetics_img",
        extraPlugins: "beautyappraisal",
        toolbar: [
          {
            name: "document",
            items: ["Source", "-", "Templates"]
          },
          {
            name: "clipboard",
            items: ["-", "Undo", "Redo"]
          },
          {
            name: "insert",
            items: ["-", "Image"]
          },
          {
            name: "paragraph",
            items: [
              "-",
              "JustifyLeft",
              "JustifyCenter",
              "JustifyRight",
              "JustifyBlock"
            ]
          },
          {
            name: "colors",
            items: ["-", "TextColor"]
          }
        ],
        // contentsCss: './static/ckeditor/style.css',
        contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });
    },
    getCkeditor2() {
      CKEDITOR.replace("faceDescAdd", {
        height: 100,
        resize_maxHeight: 3000,
        filebrowserImageUploadUrl:
          "/management/admin/kcupload!uploadImg.action?type=goods_path",
        filebrowserBrowseUrl:
          "/management/admin/kcupload!getImages.action?type=cosmetics_img",
        extraPlugins: "beautyappraisal",
        toolbar: [
          {
            name: "document",
            items: ["Source", "-", "Templates"]
          },
          {
            name: "clipboard",
            items: ["-", "Undo", "Redo"]
          },
          {
            name: "insert",
            items: ["-", "Image"]
          },
          {
            name: "paragraph",
            items: [
              "-",
              "JustifyLeft",
              "JustifyCenter",
              "JustifyRight",
              "JustifyBlock"
            ]
          },
          {
            name: "colors",
            items: ["-", "TextColor"]
          }
        ],
        // contentsCss: './static/ckeditor/style.css',
        contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });
      CKEDITOR.replace("faceBlushAdd", {
        height: 100,
        resize_maxHeight: 3000,
        filebrowserImageUploadUrl:
          "/management/admin/kcupload!uploadImg.action?type=goods_path",
        filebrowserBrowseUrl:
          "/management/admin/kcupload!getImages.action?type=cosmetics_img",
        extraPlugins: "beautyappraisal",
        toolbar: [
          {
            name: "document",
            items: ["Source", "-", "Templates"]
          },
          {
            name: "clipboard",
            items: ["-", "Undo", "Redo"]
          },
          {
            name: "insert",
            items: ["-", "Image"]
          },
          {
            name: "paragraph",
            items: [
              "-",
              "JustifyLeft",
              "JustifyCenter",
              "JustifyRight",
              "JustifyBlock"
            ]
          },
          {
            name: "colors",
            items: ["-", "TextColor"]
          }
        ],
        // contentsCss: './static/ckeditor/style.css',
        contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });
      CKEDITOR.replace("faceBrowsAdd", {
        height: 100,
        resize_maxHeight: 3000,
        filebrowserImageUploadUrl:
          "/management/admin/kcupload!uploadImg.action?type=goods_path",
        filebrowserBrowseUrl:
          "/management/admin/kcupload!getImages.action?type=cosmetics_img",
        extraPlugins: "beautyappraisal",
        toolbar: [
          {
            name: "document",
            items: ["Source", "-", "Templates"]
          },
          {
            name: "clipboard",
            items: ["-", "Undo", "Redo"]
          },
          {
            name: "insert",
            items: ["-", "Image"]
          },
          {
            name: "paragraph",
            items: [
              "-",
              "JustifyLeft",
              "JustifyCenter",
              "JustifyRight",
              "JustifyBlock"
            ]
          },
          {
            name: "colors",
            items: ["-", "TextColor"]
          }
        ],
        // contentsCss: './static/ckeditor/style.css',
        contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });
      CKEDITOR.replace("faceMakeAdd", {
        height: 100,
        resize_maxHeight: 3000,
        filebrowserImageUploadUrl:
          "/management/admin/kcupload!uploadImg.action?type=goods_path",
        filebrowserBrowseUrl:
          "/management/admin/kcupload!getImages.action?type=cosmetics_img",
        extraPlugins: "beautyappraisal",
        toolbar: [
          {
            name: "document",
            items: ["Source", "-", "Templates"]
          },
          {
            name: "clipboard",
            items: ["-", "Undo", "Redo"]
          },
          {
            name: "insert",
            items: ["-", "Image"]
          },
          {
            name: "paragraph",
            items: [
              "-",
              "JustifyLeft",
              "JustifyCenter",
              "JustifyRight",
              "JustifyBlock"
            ]
          },
          {
            name: "colors",
            items: ["-", "TextColor"]
          }
        ],
        // contentsCss: './static/ckeditor/style.css',
        contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });
    },
    // 新增dialog打开后回调
    addOPen() {
      if (!this.editorAdd) {
        this.getCkeditor2();
        this.editorAdd = true;
      }
      this.formAdd = {};
      this.fileList1 = [];
      this.fileList2 = [];
      this.fileList3 = [];
      this.choosedLabelList=[]
    },
    //新增
    handleAdd() {
      this.formAdd.faceDescribe = CKEDITOR.instances.faceDesc.getData();
      this.formAdd.cheekColorMethod = CKEDITOR.instances.faceBlush.getData();
      this.formAdd.contourMethod = CKEDITOR.instances.faceMake.getData();
      this.formAdd.browDescribe = CKEDITOR.instances.faceBrows.getData();
      console.log(this.formAdd);
      this.$axios
        .post(
          `/management/admin/face!save.action`,
          this.$qs.stringify(this.formAdd)
        )
        .then(res => {
          if (res.status == 200) {
            if (res.status == 200) {
              this.AddVisible = false;
              this.$message.success(`添加成功`);
              this.fileList1 = [];
              this.fileList2 = [];
              this.fileList3 = [];
              this.formAdd = {};
              this.getlabelCountList();
            }
          }
        });
    },
    //编辑
    handleEdit(row) {
      console.log(row);
      this.TableVisible = true;
      this.idx = row.id;
      this.$axios
        .get(`/management/admin/face!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.formEdit = res.data;
            this.formEdit.contourImage
              ? (this.fileList1 = [{ url: this.formEdit.contourImage }])
              : (this.fileList1 = []);
            this.formEdit.cheekColorImage
              ? (this.fileList2 = [{ url: this.formEdit.cheekColorImage }])
              : (this.fileList2 = []);
            this.formEdit.browImage
              ? (this.fileList3 = [{ url: this.formEdit.browImage }])
              : (this.fileList3 = []);
          }
        });
      //获取选中色号
      this.$axios
        .post(
          `/management/admin/beauty-color-to-label!getSelectDetail.action`,
          this.$qs.stringify({
            id: row.id,
            type: 1
          })
        )
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.choosedBeautiColorList = res.data.color;
          }
        });
      setTimeout(() => {
        if (!this.editor) {
          this.getCkeditor();
          this.editor = true;
        }
        CKEDITOR.instances.faceDesc.setData(row.faceDescribe);
        CKEDITOR.instances.faceBlush.setData(row.cheekColorMethod);
        CKEDITOR.instances.faceMake.setData(row.contourMethod);
        CKEDITOR.instances.faceBrows.setData(row.browDescribe);
      }, 10);
    },
    saveEdit() {
      this.formEdit.faceDescribe = CKEDITOR.instances.faceDesc.getData();
      this.formEdit.cheekColorMethod = CKEDITOR.instances.faceBlush.getData();
      this.formEdit.contourMethod = CKEDITOR.instances.faceMake.getData();
      this.formEdit.browDescribe = CKEDITOR.instances.faceBrows.getData();
      console.log(this.formEdit);
      var colorId = "";
      for (let i = 0; i < this.choosedBeautiColorList.length; i++) {
        colorId += `&productColor1=` + this.choosedBeautiColorList[i].id;
      }
      this.$axios
        .post(
          `/management/admin/face!save.action?id=${this.idx}`,
          this.$qs.stringify({
            beautyDetailsId: this.formEdit.beautyDetailsId,
            labelId: this.formEdit.labels,
            faceDescribe: this.formEdit.faceDescribe,
            contourImage: this.formEdit.contourImage,
            contourMethod: this.formEdit.contourMethod,
            cheekColorImage: this.formEdit.cheekColorImage,
            cheekColorMethod: this.formEdit.cheekColorMethod,
            browImage: this.formEdit.browImage,
            browDescribe: this.formEdit.browDescribe
          }) + colorId
        )
        .then(res => {
          if (res.status == 200) {
            if (res.status == 200) {
              this.TableVisible = false;
              this.$message.success(`修改成功`);
              this.fileList1 = [];
              this.fileList2 = [];
              this.fileList3 = [];
              this.formEdit = {};
              this.getlabelCountList();
            }
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
          .get(`/management/admin/eyes!delete.action?id=${rows[index].id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getlabelCountList();
            }
          });
      });
    },
    //图片上传
    handleRemove1(file, fileList) {},
    handleRemove2(file, fileList) {
      // console.log(this.formLabelAdd,file,fileList)
    },
    handleRemove3(file, fileList) {
      // console.log(this.formLabelAdd,file,fileList)
    },
    beforeUpload1(file) {
      this.imgData1.FileName ='zmxy/uploadFiles/'+
        new Date().valueOf() +
        "_" +
        sessionStorage.getItem("id") +
        "_" +
        Math.round(Math.random() * 999999) +
        ".jpg";
      this.imgData1.imgFile = file;
    },
    beforeUpload2(file) {
      this.imgData2.FileName ='zmxy/uploadFiles/'+
        new Date().valueOf() +
        "_" +
        sessionStorage.getItem("id") +
        "_" +
        Math.round(Math.random() * 999999) +
        ".jpg";
      this.imgData2.imgFile = file;
    },
    beforeUpload3(file) {
      this.imgData3.FileName ='zmxy/uploadFiles/'+
        new Date().valueOf() +
        "_" +
        sessionStorage.getItem("id") +
        "_" +
        Math.round(Math.random() * 999999) +
        ".jpg";
      this.imgData3.imgFile = file;
    },
    handleSuccess1(res) {
      this.formEdit.contourImage = res.url;
      if (this.AddVisible) {
        this.formAdd.contourImage = res.url;
      }
    },
    handleSuccess2(res) {
      this.formEdit.cheekColorImage = res.url;
      if (this.AddVisible) {
        this.formAdd.cheekColorImage = res.url;
      }
    },
    handleSuccess3(res) {
      this.formEdit.browImage = res.url;
      if (this.AddVisible) {
        this.formAdd.browImage = res.url;
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
.labelTable {
  max-height: 250px;
  overflow-y: auto;
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
</style>