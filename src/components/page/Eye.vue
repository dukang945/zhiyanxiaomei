<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增</el-button>
      <el-dialog title="图片预览" :visible.sync="imgVisible" append-to-body>
        <img :src="img" alt style="width:100%">
      </el-dialog>
      <el-dialog title="产品预览" :visible.sync="viewVisible" append-to-body width="80%" top="30px">
        <div class="content">
          <img class="phoneBorder productBox" src="../../images/viewPage.png" alt>
          <div class="productContent">
            <div class="productTitle">基础画法</div>
            <div class="productItem" v-for="(item,index) in viewPageColorList">
              <img :src="getImgUrl(item.colorImage)" alt>
              <p>{{item.name}} {{item.colorPrice}}</p>
              <p>参考价格 ：￥{{item.colorPrice}}</p>
            </div>
          </div>
          <img class="phoneBorder productBox pro2" src="../../images/viewPage.png" alt>
          <div class="productContent cont2">
            <div class="productTitle">桃花妆画法</div>
            <div class="productItem" v-for="(item,index) in viewPageColorList2">
              <img :src="getImgUrl(item.colorImage)" alt>
              <p>{{item.name}} {{item.specification}}</p>
              <p>参考价格 ：￥{{item.colorPrice}}</p>
            </div>
          </div>
          <img class="phoneBorder productBox pro3" src="../../images/viewPage.png" alt>
          <div class="productContent cont3">
            <div class="productTitle">财运妆画法</div>
            <div class="productItem" v-for="(item,index) in viewPageColorList3">
              <img :src="getImgUrl(item.colorImage)" alt>
              <p>{{item.name}} {{item.specification}}</p>
              <p>参考价格 ：￥{{item.colorPrice}}</p>
            </div>
          </div>
        </div>
      </el-dialog>
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
          <el-form-item label="眼部描述" label-width="120px">
            <textarea id="eyeDescAdd" rows="10" cols="80"></textarea>
          </el-form-item>
          <el-form-item label="基础画法" label-width="120px">
            <textarea id="eyeMakeAdd" rows="10" cols="80"></textarea>
          </el-form-item>
          <el-form-item label="基础画法图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-remove="handleRemove1"
              :on-success="handleSuccess1"
              :file-list="fileList1"
              :before-upload="beforeUpload1"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="教程id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId1"></el-input>
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
            <div class="labelChoosed">
              已选产品：
              <span
                v-for="(item,key) in choosedBeautiColorList"
                v-dragging="{ list: choosedBeautiColorList, item: item, group: 'name' }"
              >
                {{item.name}}
                <i class="el-icon-error" @click="deleteBeautiColor(key)"></i>
              </span>
            </div>
          </el-form-item>
          <el-form-item label="桃花妆画法" label-width="120px">
            <textarea id="eyeMakeAdd2" rows="10" cols="80"></textarea>
          </el-form-item>
          <el-form-item label="桃花妆图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData2"
              :on-preview="handlePreview"
              :on-remove="handleRemove2"
              :on-success="handleSuccess2"
              :file-list="fileList2"
              :before-upload="beforeUpload2"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="教程id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId2"></el-input>
          </el-form-item>
          <el-form-item label="搜索产品2" label-width="120px">
            <el-input v-model="searchBeautiColor2" @input="getBeautiColorList2" clearable></el-input>
            <el-table
              :data="beautiColorTableData2"
              @row-click="selectBeautiColor2"
              border
              style="width: 100%"
              v-loading="loading"
              v-if="searchBeautiColor2"
              class="labelTable"
            >
              <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
              <el-table-column prop="name" label="色号名" align="center"></el-table-column>
              <el-table-column prop="productName" label="商品名" align="center"></el-table-column>
            </el-table>
            <div class="labelChoosed">
              已选产品：
              <span
                v-for="(item,key) in choosedBeautiColorList2"
                v-dragging="{ list: choosedBeautiColorList2, item: item, group: 'name' }"
              >
                {{item.name}}
                <i class="el-icon-error" @click="deleteBeautiColor2(key)"></i>
              </span>
            </div>
          </el-form-item>
          <el-form-item label="财运妆画法" label-width="120px">
            <textarea id="eyeMakeAdd3" rows="10" cols="80"></textarea>
          </el-form-item>
          <el-form-item label="财运妆图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData3"
              :on-preview="handlePreview"
              :on-remove="handleRemove3"
              :on-success="handleSuccess3"
              :file-list="fileList3"
              :before-upload="beforeUpload3"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="教程id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId3"></el-input>
          </el-form-item>
          <el-form-item label="搜索产品3" label-width="120px">
            <el-input v-model="searchBeautiColor3" @input="getBeautiColorList3" clearable></el-input>
            <el-table
              :data="beautiColorTableData3"
              @row-click="selectBeautiColor3"
              border
              style="width: 100%"
              v-loading="loading"
              v-if="searchBeautiColor3"
              class="labelTable"
            >
              <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
              <el-table-column prop="name" label="色号名" align="center"></el-table-column>
              <el-table-column prop="productName" label="商品名" align="center"></el-table-column>
            </el-table>
            <div class="labelChoosed">
              已选产品：
              <span
                v-for="(item,key) in choosedBeautiColorList3"
                v-dragging="{ list: choosedBeautiColorList3, item: item, group: 'name' }"
              >
                {{item.name}}
                <i class="el-icon-error" @click="deleteBeautiColor3(key)"></i>
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
      <el-table-column prop="labelName" label="创建人" align="center"></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)" v-has>编辑</el-button>
          <el-button size="small" type="primary" @click="handleView(scope.row)" v-has>预览</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, labelCountList)"
            type="danger"
            size="small"
            v-del
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="TableVisible" width="80%" :close-on-click-modal="false">
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
        <el-form-item label="眼部描述" label-width="120px">
          <textarea id="eyeDesc" rows="10" cols="80"></textarea>
        </el-form-item>
        <el-form-item label="基础画法" label-width="120px">
          <textarea id="eyeMake" rows="10" cols="80"></textarea>
        </el-form-item>
        <el-form-item label="基础画法图片" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-remove="handleRemove1"
            :on-success="handleSuccess1"
            :file-list="fileList1"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="教程id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId1"></el-input>
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
          <div class="labelChoosed">
            已选产品：
            <span
              v-for="(item,key) in choosedBeautiColorList"
              v-dragging="{ list: choosedBeautiColorList, item: item, group: 'name' }"
            >
              {{item.name}}
              <i class="el-icon-error" @click="deleteBeautiColor(key)"></i>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="桃花妆画法" label-width="120px">
          <textarea id="eyeMake2" rows="10" cols="80"></textarea>
        </el-form-item>
        <el-form-item label="桃花妆图片" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData2"
            :on-preview="handlePreview"
            :on-remove="handleRemove2"
            :on-success="handleSuccess2"
            :file-list="fileList2"
            :before-upload="beforeUpload2"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="教程id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId2"></el-input>
        </el-form-item>
        <el-form-item label="搜索产品" label-width="120px">
          <el-input v-model="searchBeautiColor2" @input="getBeautiColorList2" clearable></el-input>
          <el-table
            :data="beautiColorTableData2"
            @row-click="selectBeautiColor2"
            border
            style="width: 100%"
            v-loading="loading"
            v-if="searchBeautiColor2"
            class="labelTable"
          >
            <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
            <el-table-column prop="name" label="色号名" align="center"></el-table-column>
            <el-table-column prop="productName" label="商品名" align="center"></el-table-column>
          </el-table>
          <div class="labelChoosed">
            已选产品：
            <span
              v-for="(item,key) in choosedBeautiColorList2"
              v-dragging="{ list: choosedBeautiColorList2, item: item, group: 'name' }"
            >
              {{item.name}}
              <i class="el-icon-error" @click="deleteBeautiColor2(key)"></i>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="财运妆画法" label-width="120px">
          <textarea id="eyeMake3" rows="10" cols="80"></textarea>
        </el-form-item>
        <el-form-item label="财运妆图片" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData3"
            :on-preview="handlePreview"
            :on-remove="handleRemove3"
            :on-success="handleSuccess3"
            :file-list="fileList3"
            :before-upload="beforeUpload3"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="教程id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId3"></el-input>
        </el-form-item>
        <el-form-item label="搜索产品" label-width="120px">
          <el-input v-model="searchBeautiColor3" @input="getBeautiColorList3" clearable></el-input>
          <el-table
            :data="beautiColorTableData3"
            @row-click="selectBeautiColor3"
            border
            style="width: 100%"
            v-loading="loading"
            v-if="searchBeautiColor3"
            class="labelTable"
          >
            <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
            <el-table-column prop="name" label="色号名" align="center"></el-table-column>
            <el-table-column prop="productName" label="商品名" align="center"></el-table-column>
          </el-table>
          <div class="labelChoosed">
            已选产品：
            <span
              v-for="(item,key) in choosedBeautiColorList3"
              v-dragging="{ list: choosedBeautiColorList3, item: item, group: 'name' }"
            >
              {{item.name}}
              <i class="el-icon-error" @click="deleteBeautiColor3(key)"></i>
            </span>
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetEdit">取 消</el-button>
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
      imgVisible: false,
      viewVisible: false,
      editor: false,
      editorAdd: false,
      loading: true,
      dateVal: "",
      img: "",
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
      formAdd: {
        beautyDetailsId1: 1,
        beautyDetailsId2: 2,
        beautyDetailsId3: 3
      },
      viewPageColorList: [], //产品预览列表
      viewPageColorList2: [], //产品预览列表
      viewPageColorList3: [], //产品预览列表
      labelTableData: [], //标签表格数据
      searchLabel: "", //搜索标签输入框
      choosedLabelList: [], //已选中标签列表
      beautiColorTableData: [], //色号表格数据
      searchBeautiColor: "", //搜索色号输入框
      choosedBeautiColorList: [], //已选中色号列表
      labelTableData2: [], //标签表格数据
      searchLabel2: "", //搜索标签输入框
      choosedLabelList2: [], //已选中标签列表
      beautiColorTableData2: [], //色号表格数据
      searchBeautiColor2: "", //搜索色号输入框
      choosedBeautiColorList2: [], //已选中色号列表
      labelTableData3: [], //标签表格数据
      searchLabel3: "", //搜索标签输入框
      choosedLabelList3: [], //已选中标签列表
      beautiColorTableData3: [], //色号表格数据
      searchBeautiColor3: "", //搜索色号输入框
      choosedBeautiColorList3: [] //已选中色号列表
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
        .post(
          "/management/admin/eyes!list.action",
          this.$qs.stringify({
            page: page1,
            row: row1
          })
        )
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
        .get(`/management/admin/label!getTreeGrid.action?id=815`)
        .then(res => {
          if (res.status == 200) {
            this.labelList = res.data;
          }
        });
    },
    //初始化文本编辑器
    getCkeditor() {
      CKEDITOR.replace("eyeDesc", {
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
        contentsCss: "./static/ckeditor/style.css",
        // contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });

      CKEDITOR.replace("eyeMake", {
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
        contentsCss: "./static/ckeditor/style.css",
        // contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });
      CKEDITOR.replace("eyeMake2", {
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
        contentsCss: "./static/ckeditor/style.css",
        // contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });
      CKEDITOR.replace("eyeMake3", {
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
        contentsCss: "./static/ckeditor/style.css",
        // contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });
    },
    getCkeditor2() {
      CKEDITOR.replace("eyeDescAdd", {
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
        contentsCss: "./static/ckeditor/style.css",
        // contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });

      CKEDITOR.replace("eyeMakeAdd", {
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
        contentsCss: "./static/ckeditor/style.css",
        // contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });
      CKEDITOR.replace("eyeMakeAdd2", {
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
        contentsCss: "./static/ckeditor/style.css",
        // contentsCss: "../../../static/ckeditor/style.css",
        templates_replaceContent: false,
        autoUpdateElement: true,
        //编辑器中回车产生的标签
        enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
        shiftEnterMode: CKEDITOR.ENTER_P
      });
      CKEDITOR.replace("eyeMakeAdd3", {
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
        contentsCss: "./static/ckeditor/style.css",
        // contentsCss: "../../../static/ckeditor/style.css",
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
      this.searchBeautiColor = "";
      this.searchBeautiColor2 = "";
      this.searchBeautiColor3 = "";
      this.choosedBeautiColorList = [];
      this.choosedBeautiColorList2 = [];
      this.choosedBeautiColorList3 = [];
    },
    //新增
    handleAdd() {
      var colorId = "";
      for (let i = 0; i < this.choosedBeautiColorList.length; i++) {
        colorId += `&productColor1=` + this.choosedBeautiColorList[i].id;
      }
      var colorId2 = "";
      for (let i = 0; i < this.choosedBeautiColorList2.length; i++) {
        colorId2 += `&productColor2=` + this.choosedBeautiColorList2[i].id;
      }
      var colorId3 = "";
      for (let i = 0; i < this.choosedBeautiColorList3.length; i++) {
        colorId3 += `&productColor3=` + this.choosedBeautiColorList3[i].id;
      }

      this.formAdd.eyesDescribe = CKEDITOR.instances.eyeDescAdd.getData();
      this.formAdd.eyeMakeup = CKEDITOR.instances.eyeMakeAdd.getData();
      this.formAdd.eyeMakeup2 = CKEDITOR.instances.eyeMakeAdd2.getData();
      this.formAdd.eyeMakeup3 = CKEDITOR.instances.eyeMakeAdd3.getData();
      console.log(this.formAdd);
      this.$axios
        .post(
          `/management/admin/eyes!save.action`,
          this.$qs.stringify(this.formAdd) + colorId + colorId2 + colorId3
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
      this.searchBeautiColor = "";
      this.searchBeautiColor2 = "";
      this.searchBeautiColor3 = "";
      this.choosedBeautiColorList = [];
      this.choosedBeautiColorList2 = [];
      this.choosedBeautiColorList3 = [];
      console.log(row);
      this.TableVisible = true;
      this.idx = row.id;
      // 获取编辑内容
      this.$axios
        .get(`/management/admin/eyes!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            this.formEdit = res.data;
            this.formEdit.eyesImg
              ? (this.fileList1 = [
                  { url: this.formEdit.eyesImg, name: "图片1" }
                ])
              : (this.fileList1 = []);
            this.formEdit.eyesImg2
              ? (this.fileList2 = [
                  { url: this.formEdit.eyesImg2, name: "图片2" }
                ])
              : (this.fileList2 = []);
            this.formEdit.eyesImg3
              ? (this.fileList3 = [
                  { url: this.formEdit.eyesImg3, name: "图片3" }
                ])
              : (this.fileList3 = []);
          }
        });
      // 获取选中色号内容
      this.$axios
        .post(
          `/management/admin/beauty-color-to-label!comboGridlist.action`,
          this.$qs.stringify({
            labelId: row.labels,
            type: 1
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.choosedBeautiColorList = res.data.rows;
          }
        });
      this.$axios
        .post(
          `/management/admin/beauty-color-to-label!comboGridlist.action`,
          this.$qs.stringify({
            labelId: row.labels,
            type: 2
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.choosedBeautiColorList2 = res.data.rows;
          }
        });
      this.$axios
        .post(
          `/management/admin/beauty-color-to-label!comboGridlist.action`,
          this.$qs.stringify({
            labelId: row.labels,
            type: 3
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.choosedBeautiColorList3 = res.data.rows;
          }
        });
      // 初始化文本编辑器
      setTimeout(() => {
        if (!this.editor) {
          this.getCkeditor();
          this.editor = true;
        }
        // 设置文本编辑器内容
        CKEDITOR.instances.eyeDesc.setData(row.eyesDescribe);
        CKEDITOR.instances.eyeMake.setData(row.eyeMakeup);
        CKEDITOR.instances.eyeMake2.setData(row.eyeMakeup2);
        CKEDITOR.instances.eyeMake3.setData(row.eyeMakeup3);
      }, 10);
    },
    saveEdit() {
      this.formEdit.eyesDescribe = CKEDITOR.instances.eyeDesc.getData();
      this.formEdit.eyeMakeup = CKEDITOR.instances.eyeMake.getData();
      this.formEdit.eyeMakeup2 = CKEDITOR.instances.eyeMake2.getData();
      this.formEdit.eyeMakeup3 = CKEDITOR.instances.eyeMake3.getData();
      var colorId = "";
      for (let i = 0; i < this.choosedBeautiColorList.length; i++) {
        colorId += `&productColor1=` + this.choosedBeautiColorList[i].id;
      }
      var colorId2 = "";
      for (let i = 0; i < this.choosedBeautiColorList2.length; i++) {
        colorId2 += `&productColor2=` + this.choosedBeautiColorList2[i].id;
      }
      var colorId3 = "";
      for (let i = 0; i < this.choosedBeautiColorList3.length; i++) {
        colorId3 += `&productColor3=` + this.choosedBeautiColorList3[i].id;
      }
      let params =
        this.$qs.stringify({
          beautyDetailsId1: this.formEdit.beautyDetailsId1,
          beautyDetailsId2: this.formEdit.beautyDetailsId2,
          beautyDetailsId3: this.formEdit.beautyDetailsId3,
          labelId: this.formEdit.labels,
          eyesDescribe: this.formEdit.eyesDescribe,
          eyesImg: this.formEdit.eyesImg,
          eyeMakeup: this.formEdit.eyeMakeup,
          eyesImg2: this.formEdit.eyesImg2,
          eyeMakeup2: this.formEdit.eyeMakeup2,
          eyesImg3: this.formEdit.eyesImg3,
          eyeMakeup3: this.formEdit.eyeMakeup3
        }) +
        colorId +
        colorId2 +
        colorId3;

      this.$axios
        .post(`/management/admin/eyes!save.action?id=${this.idx}`, params)
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
    //取消编辑
    resetEdit() {
      this.formEdit = {};
      this.fileList1 = [];
      this.fileList2 = [];
      this.fileList3 = [];
      this.searchBeautiColor = "";
      this.searchBeautiColor2 = "";
      this.searchBeautiColor3 = "";
      this.choosedBeautiColorList = [];
      this.choosedBeautiColorList2 = [];
      this.choosedBeautiColorList3 = [];
      this.TableVisible = false;
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
    //预览
    handleView(row) {
      console.log(row);
      this.viewVisible = true;
      // 色号数据
      this.$axios
        .post(
          `/management/admin/beauty-color-to-label!comboGridlist.action`,
          this.$qs.stringify({ labelId: row.labels, type: 1 })
        )
        .then(res1 => {
          if (Object.keys(res1.data).length != 0) {
            this.viewPageColorList = [...res1.data.rows];
          }
        });
      this.$axios
        .post(
          `/management/admin/beauty-color-to-label!comboGridlist.action`,
          this.$qs.stringify({ labelId: row.labels, type: 2 })
        )
        .then(res2 => {
          if (Object.keys(res2.data).length != 0) {
            this.viewPageColorList2 = [...res2.data.rows];
          }
        });
      this.$axios
        .post(
          `/management/admin/beauty-color-to-label!comboGridlist.action`,
          this.$qs.stringify({ labelId: row.labels, type: 3 })
        )
        .then(res3 => {
          if (Object.keys(res3.data).length != 0) {
            this.viewPageColorList3 = [...res3.data.rows];
          }
        });
    },
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
    getBeautiColorList2(val) {
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
          this.beautiColorTableData2 = res.data.rows;
          this.loading = false;
        });
    },
    // 删除色号
    deleteBeautiColor2(key) {
      this.choosedBeautiColorList2.splice(key, 1);
    },
    // 点击单选
    selectBeautiColor2(row) {
      this.choosedBeautiColorList2.push(row);
    },
    getBeautiColorList3(val) {
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
          this.beautiColorTableData3 = res.data.rows;
          this.loading = false;
        });
    },
    // 删除色号
    deleteBeautiColor3(key) {
      this.choosedBeautiColorList3.splice(key, 1);
    },
    // 点击单选
    selectBeautiColor3(row) {
      this.choosedBeautiColorList3.push(row);
    },
    //图片上传
    handleRemove1(file, fileList) {},
    handleRemove2(file, fileList) {},
    handleRemove3(file, fileList) {},
    handlePreview(file) {
      this.img = file.url;
      this.imgVisible = true;
    },
    beforeUpload1(file) {
      console.log(file);
      this.imgData1.FileName =
        "zmxy/uploadFiles/" +
        new Date().valueOf() +
        "_" +
        sessionStorage.getItem("id") +
        "_" +
        Math.round(Math.random() * 999999) +
        ".jpg";
      this.imgData1.imgFile = file;
    },
    beforeUpload2(file) {
      this.imgData2.FileName = File.name;
      this.imgData2.imgFile = file;
    },
    beforeUpload3(file) {
      this.imgData3.FileName = File.name;
      this.imgData3.imgFile = file;
    },
    handleSuccess1(res) {
      console.log(res);
      this.formEdit.eyesImg = res.url;
      if (this.AddVisible) {
        this.formAdd.eyesImg = res.url;
      }
    },
    handleSuccess2(res) {
      this.formEdit.eyesImg2 = res.url;
      if (this.AddVisible) {
        this.formAdd.eyesImg2 = res.url;
      }
    },
    handleSuccess3(res) {
      this.formEdit.eyesImg3 = res.url;
      if (this.AddVisible) {
        this.formAdd.eyesImg3 = res.url;
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
/* 产品清单预览 */
.content {
  width: 100%;
  height: 770px;
  position: relative;
  min-width: 1000px;
}
.phoneBorder {
  position: absolute;
  width: 300px;
  height: auto;
  left: 5%;
}
.content .productBox {
  position: absolute;
  width: 300px;
  height: auto;
  display: block;
  /* left: 60%; */
}

.content .productContent {
  position: absolute;
  height: 460px;
  width: 258px;
  top: 76px;
  left: 6.5%;
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
.pro2 {
  left: 37%;
}
.content .cont2 {
  left: 38.5%;
}
.pro3 {
  left: 70%;
}
.content .cont3 {
  left: 71.5%;
}
.productItem p:nth-of-type(1) {
  font-size: 12px;
  line-height: 16px;
}

.productItem p:nth-of-type(2) {
  font-size: 10px;
  line-height: 16px;
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
</style>