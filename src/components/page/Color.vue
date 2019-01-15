<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true">新增</el-button>
      <el-input v-model="color_Search" placeholder="请输入搜索类容" style="width: 30%">
        <el-button slot="append" icon="el-icon-search" @click="colorSearch"></el-button>
      </el-input>
      <!-- <el-select v-model="grid" filterable clearable placeholder="请选择品牌">
        <el-option v-for="item in gridList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        <Pagination :totalNum="totalNum1" @change_Page="changePage1" @change_Size="changeSize1"></Pagination>
      </el-select>
      <el-select v-model="category" filterable clearable placeholder="请选择分类">
        <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        <Pagination :totalNum="totalNum2" @change_Page="changePage2" @change_Size="changeSize2"></Pagination>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="makeupSearch">搜索</el-button>-->
      <el-dialog title="新增" :visible.sync="AddVisible">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAdd">
          <el-form-item label="产品及色号名称">
            <el-input v-model="formLabelAdd.productName"></el-input>
          </el-form-item>
          <el-form-item label="产品">
            <el-select v-model="formLabelAdd.productId" placeholder="请选择产品" filterable>
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
              <el-pagination
                @size-change="changeSize3"
                @current-change="changePage3"
                :current-page="page3"
                :page-sizes="[10, 20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNum3"
              ></el-pagination>
            </el-select>
          </el-form-item>
          <el-form-item label="色号名称">
            <el-input v-model="formLabelAdd.colorName"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="upload-demo"
              action="management/admin/kcupload!uploadImage.action"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess1"
              :file-list="fileList1"
              :before-upload="beforeUpload1"
              :limit="1"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formLabelAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="colorList" border style="width: 90%">
      <el-table-column label="编号" width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="name" label="产品名称"></el-table-column>
      <el-table-column prop="colorName" label="色号名称"></el-table-column>
      <el-table-column prop="creatUser" label="创建人"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, colorList)"
            type="danger"
            size="small"
            circle
            class="el-icon-delete"
          ></el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-dialog title="编辑" :visible.sync="dialogVisible">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="产品及色号名称">
                <el-input v-model="formLabelAlign.productName"></el-input>
              </el-form-item>
              <el-form-item label="产品">
                <el-select v-model="formLabelAlign.name" placeholder="请选择产品" filterable>
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                  <el-pagination
                    @size-change="changeSize2"
                    @current-change="changePage2"
                    :current-page="page2"
                    :page-sizes="[10, 20]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum2"
                  ></el-pagination>
                </el-select>
              </el-form-item>
              <el-form-item label="色号名称">
                <el-input v-model="formLabelAlign.colorName"></el-input>
              </el-form-item>
              <el-form-item label="图片">
                <el-upload
                  class="upload-demo"
                  action="management/admin/kcupload!uploadImage.action"
                  :data="imgData"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  :limit="1"
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEdit('formLabelAlign')">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :totalNum="totalNum1" @change_Page="changePage1" @change_Size="changeSize1"></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/module/Pagination.vue";
export default {
  data() {
    return {
      colorList: [],
      color_Search: "",
      options: [],
      options1: [],
      imgData: {},
      imgData1: {},
      page1: 1,
      page2: 1,
      page3: 1,
      row1: 10,
      row2: 10,
      row3: 10,
      totalNum1: 1,
      totalNum2: 1,
      totalNum3: 1,
      dialogVisible: false,
      AddVisible: false,
      value: "",
      fileList: [],
      fileList1: [],
      labelPosition: "left",
      idx: -1,
      formLabelAlign: {
        name: "12"
      },
      formLabelAdd: {}
    };
  },
  components: {
    Pagination
  },
  mounted() {
    this.getColorList(1, 10);
    this.getGridList(1, 10);
  },
  methods: {
    getColorList(page1, row1) {
      this.$axios
        .get("management/admin/beauty-color!list.action", {
          params: {
            page: page1,
            rows: row1
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.colorList = res.data.rows;
            this.totalNum1 = res.data.total;
            console.log(this.colorList);
          }
        });
    },
    getGridList(page2, row2) {
      this.$axios
        .get("management/admin/beauty-product!comboGridlist.action", {
          params: {
            page: page2,
            rows: row2
          }
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.options = res.data.rows;
            this.totalNum2 = this.totalNum3 = res.data.total;
          }
        });
    },
    //新增
    handleAdd() {
      this.$axios
        .post(
          "/management/admin/beauty-color!save.action",
          this.$qs.stringify({
            productId: this.formLabelAdd.productId,
            productName: this.formLabelAdd.productName,
            colorName: this.formLabelAdd.colorName,
            image: `<img src="` + this.formLabelAdd.image + `"  alt='' />`
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.AddVisible = false;
            this.$message.success("添加成功");
            this.getColorList();
          }
        });
    },
    //编辑
    handleEdit(index, row) {
      this.idx = row.id;
      this.$axios
        .get(`management/admin/beauty-color!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.formLabelAlign = res.data;
            let str = this.formLabelAlign.image;
            let srcReg = /[a-zA-z]+:\/\/[^\s]*/;
            let src = str.match(srcReg)[0].split('"')[0];
            //    console.log(src)
            this.fileList = [
              {
                url: src
              }
            ];
            this.formLabelAlign.image = src;
            this.$axios
              .get(
                `management/admin/beauty-product!getNameById.action?id=${
                  this.formLabelAlign.productId
                }`
              )
              .then(res => {
                if (res.status == 200) {
                  console.log(res);
                  this.formLabelAlign.name = res.data.name;
                  console.log(this.formLabelAlign);
                  this.dialogVisible = true;
                }
              });
          }
        });
    },
    //保存编辑
    saveEdit(formName) {
      this.$axios
        .post(
          `management/admin/beauty-color!save.action?id=${this.idx}`,
          this.$qs.stringify({
            productId: this.formLabelAlign.productId,
            productName: this.formLabelAlign.productName,
            colorName: this.formLabelAlign.colorName,
            image: `<img src="` + this.formLabelAlign.image + `"  alt='' />`
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.dialogVisible = false;
            this.$message.success(`添加成功`);
            this.formLabelAlign = {};
            this.fileList = [];
            this.getColorList();
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
            `management/admin/beauty-color!delete.action?id=${rows[index].id}`
          )
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getColorList();
            }
          });
      });
    },
    //搜索
    colorSearch(page1,row1) {
      this.$axios
        .post(
          "/management/admin/beauty-color!list.action",
          this.$qs.stringify({
            filter_LIKES_productName: this.color_Search,
            page: page1,
            rows: row1
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.colorList = res.data.rows
            this.totalNum1 = res.data.total
          }
        });
    },
    //图片
    handleRemove(file, fileList) {
      console.log(file, fileList);  
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file) {
      this.imgData.FileName = file.name;
      this.imgData.imgFile = file;
    },
    beforeUpload1(file) {
      this.imgData1.FileName = file.name;
      this.imgData1.imgFile = file;
    },
    handleSuccess(res) {
      console.log(res);
      this.formLabelAlign.image = res.url;
    },
    handleSuccess1(res) {
      this.formLabelAdd.image = res.url;
    },
    //分页
    changePage1(val) {
      this.page1 = val;
      if(this.color_Search){
        this.colorSearch(val, this.row1)
      }else{
        this.getColorList(val, this.row1)
      };
    },
    changeSize1(val) {
      this.row = val;
      if(this.color_Search){
        this.colorSearch(val, this.row1)
      }else{
        this.getColorList(val, this.row1)
      };
    },
    changePage2(val) {
      this.page2 = val;
      this.getGridList(val, this.row2);
    },
    changeSize2(val) {
      this.row = val;
      this.getGridList(this.page2, val);
    },
    changePage3(val) {
      this.page3 = val;
      this.getGridList(val, this.row3);
    },
    changeSize3(val) {
      this.row = val;
      this.getGridList(this.page3, val);
    }
  }
};
</script>

<style >
.el-upload-list__item {
  transition: none;
}
</style>