<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增</el-button>
      <el-dialog title="图片预览" :visible.sync="imgVisible" append-to-body>
					<img :src="img" alt="" style="width:100%">
				</el-dialog>
        <el-dialog title="产品预览" :visible.sync="viewVisible" append-to-body  top="30px">
        <div class="content">
          <img class="phoneBorder productBox" src="../../images/viewPage.png" alt>
          <div class="productContent">
            <div class="productTitle">基础画法</div>
            <div class="productItem" v-for="(item,index) in viewPageColorList">
              <img :src="getImgUrl(item.colorImage)" alt>
              <p>{{item.name}} {{item.specification}}</p>
              <p>参考价格 ：￥{{item.colorPrice}}</p>
            </div>
          </div>
          
        </div>
      </el-dialog>
      <el-dialog title="新增" :visible.sync="AddVisible" width="80%" @opened="addOPen">
        <el-form :model="formAdd">
          <el-form-item label="搜索标签" label-width="120px">
          <el-input v-model="searchlabels" @input="getLabelsList" clearable></el-input>
          <el-table
            :data="beautiLabelsList"
            @row-click="selectLabelsList"
            border
            style="width: 100%"
            v-if="searchlabels"
            class="labelTable"
          >
            <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
            <el-table-column prop="name" label="标签" align="center"></el-table-column>
            <el-table-column prop="labelName" label="上级目录" align="center"></el-table-column>
          </el-table>
          <div class="labelChoosed">
            <div>已选标签：</div>
            <span
              v-for="(item,key) in choosedLabelsList"
            >
              {{key+1}}--{{item.name?item.name:item.enname}}
              <i class="el-icon-error" @click="deleteLabels(key)"></i>
            </span>
          </div>
        </el-form-item>
          <el-form-item label="脸部描述" label-width="120px">
            <textarea id="faceDescAdd" rows="10" cols="80"></textarea>
          </el-form-item>
          <el-form-item label="脸部修容图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-remove="handleRemove1"
              :on-success="handleSuccess1"
              :file-list="fileList1"
               :limit="1"
              :before-upload="beforeUpload1"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
           <el-form-item label="分享图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="shareImg"
              :on-preview="handlePreview"
              :on-remove="shareRemove"
              :on-success="shareSuccess"
              :file-list="shareList"
               :limit="1"
              :before-upload="shareUpload"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="教程id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId"></el-input>
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
              <div>已选产品：</div>
              <span
                v-for="(item,key) in choosedBeautiColorList"
                v-dragging="{ list: choosedBeautiColorList, item: item, group: 'name' }"
              >
                {{key+1}}--{{item.name?item.name:item.enname}}
                <i class="el-icon-error" @click="deleteBeautiColor(key)"></i>
              </span>
            </div>
          </el-form-item>
          <el-form-item label="脸部修容画法" label-width="120px">
            <textarea id="faceMakeAdd" rows="10" cols="80"></textarea>
          </el-form-item>
          <el-form-item label="脸部腮红图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData2"
              :on-preview="handlePreview"
              :on-remove="handleRemove2"
              :on-success="handleSuccess2"
              :file-list="fileList2"
               :limit="1"
              :before-upload="beforeUpload2"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="腮红分享图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="shareImg2"
              :on-preview="handlePreview"
              :on-remove="shareRemove2"
              :on-success="shareSuccess2"
              :file-list="shareList2"
               :limit="1"
              :before-upload="shareUpload2"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
           
          <el-form-item label="脸部腮红画法" label-width="120px">
            <textarea id="faceBlushAdd" rows="10" cols="80"></textarea>
          </el-form-item>
          <!-- <el-form-item label="脸部眉头图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData3"
              :on-preview="handlePreview"
              :on-remove="handleRemove3"
              :on-success="handleSuccess3"
              :file-list="fileList3"
               :limit="1"
              :before-upload="beforeUpload3"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="脸部眉头画法" label-width="120px">
            <textarea id="faceBrowsAdd" rows="10" cols="80"></textarea>
          </el-form-item> -->
         
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
          <el-button size="small" type="primary" @click="handleView(scope.row)" v-has>预览</el-button>
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
    <el-dialog title="编辑" :visible.sync="TableVisible" width="80%" :close-on-click-modal="false">
      <el-form :model="formEdit">
        <el-form-item label="搜索标签" label-width="120px">
          <el-input v-model="searchlabels" @input="getLabelsList" clearable></el-input>
          <el-table
            :data="beautiLabelsList"
            @row-click="selectLabelsList"
            border
            style="width: 100%"
            v-if="searchlabels"
            class="labelTable"
          >
            <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
            <el-table-column prop="name" label="标签" align="center"></el-table-column>
            <el-table-column prop="labelName" label="上级目录" align="center"></el-table-column>
          </el-table>
          <div class="labelChoosed">
            <div>已选标签:</div>
            <span
              v-for="(item,key) in choosedLabelsList"
            >
              {{key+1}}--{{item.name?item.name:item.enname}}
              <i class="el-icon-error" @click="deleteLabels(key)"></i>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="脸部描述" label-width="120px">
          <textarea id="faceDesc" rows="10" cols="80"></textarea>
        </el-form-item>
        <el-form-item label="脸部修容图片" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :on-preview="handlePreview"
            :on-remove="handleRemove1"
            :on-success="handleSuccess1"
             :file-list="fileList1"
              :limit="1"
            :before-upload="beforeUpload1"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="修容分享图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="shareImg"
              :on-preview="handlePreview"
              :on-remove="shareRemove"
              :on-success="shareSuccess"
              :file-list="shareList"
               :limit="1"
              :before-upload="shareUpload"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        <el-form-item label="教程id" label-width="120px">
            <el-input v-model="formEdit.beautyDetailsId"></el-input>
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
            <div>已选产品：</div>
            <span
              v-for="(item,key) in choosedBeautiColorList"
              v-dragging="{ list: choosedBeautiColorList, item: item, group: 'name' }"
            >
              {{key+1}}--{{item.name?item.name:item.enname}}
              <i class="el-icon-error" @click="deleteBeautiColor(key)"></i>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="脸部修容画法" label-width="120px">
          <textarea id="faceMake" rows="10" cols="80"></textarea>
        </el-form-item>
        <el-form-item label="脸部腮红图片" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData2"
            :on-preview="handlePreview"
            :on-remove="handleRemove2"
            :on-success="handleSuccess2"
            :file-list="fileList2"
             :limit="1"
            :before-upload="beforeUpload2"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="腮红分享图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="shareImg2"
              :on-preview="handlePreview"
              :on-remove="shareRemove2"
              :on-success="shareSuccess2"
              :file-list="shareList2"
               :limit="1"
              :before-upload="shareUpload2"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        <el-form-item label="脸部腮红画法" label-width="120px">
          <textarea id="faceBlush" rows="10" cols="80"></textarea>
        </el-form-item>
        <!-- <el-form-item label="脸部眉头图片" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData3"
            :on-preview="handlePreview"
            :on-remove="handleRemove3"
            :on-success="handleSuccess3"
            :file-list="fileList3"
             :limit="1"
            :before-upload="beforeUpload3"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="脸部眉头画法" label-width="120px">
          <textarea id="faceBrows" rows="10" cols="80"></textarea>
        </el-form-item> -->
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
      shareList: [],
      shareList2: [],
      imgData1: {},
      imgData2: {},
      imgData3: {},
      shareImg: {},
      shareImg2: {},
      TableVisible: false,
      AddVisible: false,
      imgVisible: false,
      editor: false,
      editorAdd: false,
      viewVisible: false,
      viewPageColorList:[],
      loading: true,
      dateVal: "",
      img:"",
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
      labels:[],
      labelTableData: [], //标签表格数据
      searchLabel: "", //搜索标签输入框
      choosedLabelList: [], //已选中标签列表
      beautiColorTableData: [], //色号表格数据
      searchBeautiColor: "", //搜索色号输入框
      choosedBeautiColorList: [], //已选中色号列表
      searchlabels:"",//标签
      beautiLabelsList:[],//搜索标签列表
      choosedLabelsList:[],//选中标签
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
      // console.log(row,this.choosedBeautiColorList)
       if (
        this.choosedBeautiColorList.some(item => {
          return item.id == row.id;
        })
      ) {
        this.$message.warning("请勿重复选中");
      } else {
        this.choosedBeautiColorList.push(row);
        // this.searchBeautiColor = "";
      }
    },
     // 标签操作
    getLabelsList(val){
      this.$axios.post('/management/admin/label!featuresList.action',this.$qs.stringify({
        page: 1,
            rows: 50,
            q: val
      })).then(res => {
          this.beautiLabelsList = res.data.rows;
          this.loading = false;
        });
    },
    //点击单选
    selectLabelsList(row){
  if (
        this.choosedLabelsList.some(item => {
          return item.id == row.id;
        })
      ) {
        this.$message.warning("请勿重复选中");
      } else {
        this.choosedLabelsList.push(row);
        // this.searchLabel = "";
      }
    },
    // 删除
    deleteLabels(val){
 this.choosedLabelsList.splice(val, 1);
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

      // CKEDITOR.replace("faceBrows", {
      //   height: 100,
      //   resize_maxHeight: 3000,
      //   filebrowserImageUploadUrl:
      //     "/management/admin/kcupload!uploadImg.action?type=goods_path",
      //   filebrowserBrowseUrl:
      //     "/management/admin/kcupload!getImages.action?type=cosmetics_img",
      //   extraPlugins: "beautyappraisal",
      //   toolbar: [
      //     {
      //       name: "document",
      //       items: ["Source", "-", "Templates"]
      //     },
      //     {
      //       name: "clipboard",
      //       items: ["-", "Undo", "Redo"]
      //     },
      //     {
      //       name: "insert",
      //       items: ["-", "Image"]
      //     },
      //     {
      //       name: "paragraph",
      //       items: [
      //         "-",
      //         "JustifyLeft",
      //         "JustifyCenter",
      //         "JustifyRight",
      //         "JustifyBlock"
      //       ]
      //     },
      //     {
      //       name: "colors",
      //       items: ["-", "TextColor"]
      //     }
      //   ],
      //   // contentsCss: './static/ckeditor/style.css',
      //   contentsCss: "../../../static/ckeditor/style.css",
      //   templates_replaceContent: false,
      //   autoUpdateElement: true,
      //   //编辑器中回车产生的标签
      //   enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
      //   shiftEnterMode: CKEDITOR.ENTER_P
      // });
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
      // CKEDITOR.replace("faceBrowsAdd", {
      //   height: 100,
      //   resize_maxHeight: 3000,
      //   filebrowserImageUploadUrl:
      //     "/management/admin/kcupload!uploadImg.action?type=goods_path",
      //   filebrowserBrowseUrl:
      //     "/management/admin/kcupload!getImages.action?type=cosmetics_img",
      //   extraPlugins: "beautyappraisal",
      //   toolbar: [
      //     {
      //       name: "document",
      //       items: ["Source", "-", "Templates"]
      //     },
      //     {
      //       name: "clipboard",
      //       items: ["-", "Undo", "Redo"]
      //     },
      //     {
      //       name: "insert",
      //       items: ["-", "Image"]
      //     },
      //     {
      //       name: "paragraph",
      //       items: [
      //         "-",
      //         "JustifyLeft",
      //         "JustifyCenter",
      //         "JustifyRight",
      //         "JustifyBlock"
      //       ]
      //     },
      //     {
      //       name: "colors",
      //       items: ["-", "TextColor"]
      //     }
      //   ],
      //   // contentsCss: './static/ckeditor/style.css',
      //   contentsCss: "../../../static/ckeditor/style.css",
      //   templates_replaceContent: false,
      //   autoUpdateElement: true,
      //   //编辑器中回车产生的标签
      //   enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
      //   shiftEnterMode: CKEDITOR.ENTER_P
      // });
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
      this.formAdd = {featureStatus:2};
      this.fileList1 = [];
      this.fileList2 = [];
      this.fileList3 = [];
      this.shareList=[]
      this.shareList2=[]
      this.searchBeautiColor=''
      this.searchlabels=""
      this.choosedLabelsList=[];
      this.choosedBeautiColorList=[]
      this.choosedLabelsList=[]
      this.formAdd.faceDescribe = CKEDITOR.instances.faceDescAdd.setData();
      this.formAdd.cheekColorMethod = CKEDITOR.instances.faceBlushAdd.setData();
      this.formAdd.contourMethod = CKEDITOR.instances.faceMakeAdd.setData();
    },
    //新增
    handleAdd() {
      this.formAdd.faceDescribe = CKEDITOR.instances.faceDescAdd.getData();
      this.formAdd.cheekColorMethod = CKEDITOR.instances.faceBlushAdd.getData();
      this.formAdd.contourMethod = CKEDITOR.instances.faceMakeAdd.getData();
      // this.formAdd.browDescribe = CKEDITOR.instances.faceBrowsAdd.getData();
      // if(this.formAdd.labels.length>1){
      //   this.formAdd.labels = this.formAdd.labels.join(",")
      // }else if(this.formEdit.labels.length=1){
      //   this.formAdd.labels = this.formAdd.labels[0]
      // }else{
      //   this.formAdd.labels = ''
      // }
      if(this.choosedBeautiColorList){
        var colorId = "";
      for (let i = 0; i < this.choosedBeautiColorList.length; i++) {
        colorId += `&productColor1=` + this.choosedBeautiColorList[i].id;
      }
      }
      var labels = ''
      for (let i = 0; i < this.choosedLabelsList.length; i++) {
        labels += `&labelId=` + this.choosedLabelsList[i].id;
      }
      console.log(this.formAdd);
      this.$axios
        .post(
          `/management/admin/face!save.action`,
          this.$qs.stringify(this.formAdd) + labels + colorId
        )
        .then(res => {
          if (res.status == 200) {
            if (res.status == 200) {
              this.AddVisible = false;
              this.$message.success(`添加成功`);
              this.fileList1 = [];
              this.fileList2 = [];
              this.fileList3 = [];
              this.formAdd = {featureStatus:2};
              this.searchlabels=''
              this.choosedLabelsList=[]
             this.getlabelCountList(this.page1, this.row1);
            }
          }
        });
    },
    //编辑
    handleEdit(row) {
      this.searchBeautiColor=''
      this.choosedBeautiColorList=[]
      this.shareList2=[]
      this.shareList=[]
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
              ? (this.fileList1 = [{ url: this.formEdit.contourImage,name:'图片1' }])
              : (this.fileList1 = []);
            this.formEdit.cheekColorImage
              ? (this.fileList2 = [{ url: this.formEdit.cheekColorImage,name:'图片2' }])
              : (this.fileList2 = []);
            // this.formEdit.browImage
            //   ? (this.fileList3 = [{ url: this.formEdit.browImage,name:'图片3' }])
            //   : (this.fileList3 = []);
            this.formEdit.faceTrimmingShareImage 
              ? (this.shareList = [{ url: this.formEdit.faceTrimmingShareImage  ,name:'修容区分享图片' }])
              : (this.shareList = []);
            this.formEdit.faceBlushShareImage  
              ? (this.shareList2 = [{ url: this.formEdit.faceBlushShareImage ,name:'腮红区分享图片' }])
              : (this.shareList2 = []);
              if(this.formEdit.labels.indexOf(',')>-1){
                this.formEdit.labels= this.formEdit.labels.split(',')
              }else{
                this.formEdit.labels = [this.formEdit.labels]
              }
              
          }
        });
         //获取选中标签
        this.$axios.post('/management/admin/label!featuresList.action',this.$qs.stringify({
          labelIds:row.labels.toString(),
          page:1,
          rows:50
        })).then(res =>{
          if(res.status==200){
            this.choosedLabelsList = res.data.rows
          }
        })
      //获取选中色号
      this.$axios
        .post(
          `/management/admin/beauty-color-to-label!getSelectDetail.action`,
          this.$qs.stringify({
            id: row.id,
            featureStatus:2,
            type: 1
          })
        )
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            if(res.data.color){
              this.choosedBeautiColorList = res.data.color;
            }
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
        // CKEDITOR.instances.faceBrows.setData(row.browDescribe);
      }, 10);
    },
    saveEdit() {
      this.formEdit.faceDescribe = CKEDITOR.instances.faceDesc.getData();
      this.formEdit.cheekColorMethod = CKEDITOR.instances.faceBlush.getData();
      this.formEdit.contourMethod = CKEDITOR.instances.faceMake.getData();
      // this.formEdit.browDescribe = CKEDITOR.instances.faceBrows.getData();
      // if(this.formEdit.labels.length>1){
      //   this.formEdit.labels = this.formEdit.labels.join(",")
      // }else if(this.formEdit.labels.length=1){
      //   this.formEdit.labels = this.formEdit.labels[0]
      // }else{
      //   this.formEdit.labels = ''
      // }
      console.log(this.formEdit);
      if(this.choosedBeautiColorList){
        var colorId = "";
      for (let i = 0; i < this.choosedBeautiColorList.length; i++) {
        colorId += `&productColor1=` + this.choosedBeautiColorList[i].id;
      }
      }
      var labels = ''
      for (let i = 0; i < this.choosedLabelsList.length; i++) {
        labels += `&labelId=` + this.choosedLabelsList[i].id;
      }
      this.$axios
        .post(
          `/management/admin/face!save.action?id=${this.idx}`,
          this.$qs.stringify({
            beautyDetailsId: this.formEdit.beautyDetailsId,
            faceDescribe: this.formEdit.faceDescribe,
            contourImage: this.formEdit.contourImage,
            contourMethod: this.formEdit.contourMethod,
            cheekColorImage: this.formEdit.cheekColorImage,
            cheekColorMethod: this.formEdit.cheekColorMethod,
            // browImage: this.formEdit.browImage,
            // browDescribe: this.formEdit.browDescribe,
            faceBlushShareImage :this.formEdit.faceBlushShareImage,
            faceTrimmingShareImage :this.formEdit.faceTrimmingShareImage
          }) + colorId +labels
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
              this.searchlabels=''
              this.choosedLabelsList=[]
              this.choosedBeautiColorList=[]
              this.getlabelCountList(this.page1, this.row1);
            }
          }
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
          this.$qs.stringify({ labelId: row.id,
            featureStatus:2, type: 1 })
        )
        .then(res1 => {
          console.log(res1)
          if (Object.keys(res1.data).length != 0) {
            this.viewPageColorList = [...res1.data.rows];
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
    //删除
    deleteRow(index, rows) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .get(`/management/admin/face!delete.action?id=${rows[index].id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getlabelCountList(this.page1, this.row1);
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
    handlePreview(file) {
				this.img= file.url
				this.imgVisible = true
			},
    beforeUpload1(file) {
      this.imgData1.FileName =file.name
      this.imgData1.imgFile = file;
    },
    beforeUpload2(file) {
      this.imgData2.FileName =file.name
      this.imgData2.imgFile = file;
    },
    beforeUpload3(file) {
      this.imgData3.FileName =file.name
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
    shareRemove(file, fileList){},
     shareUpload(file) {
      this.shareImg.FileName = File.name;
      this.shareImg.imgFile = file;
    },
    shareSuccess(res) {
      this.formEdit.faceTrimmingShareImage = res.url;
      if (this.AddVisible) {
        this.formAdd.faceTrimmingShareImage = res.url;
      }
    },
    shareRemove2(file, fileList){},
     shareUpload2(file) {
      this.shareImg2.FileName = File.name;
      this.shareImg2.imgFile = file;
    },
    shareSuccess2(res) {
      this.formEdit.faceBlushShareImage  = res.url;
      if (this.AddVisible) {
        this.formAdd.faceBlushShareImage  = res.url;
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
  left: 30%;
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
  left: 32.5%;
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