<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true">新增</el-button>
      <el-input v-model="makeup_Search" placeholder="请输入搜索类容" style="width: 30%">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-select v-model="grid" filterable clearable placeholder="请选择品牌">
        <el-option v-for="item in gridList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        <Pagination :totalNum="totalNum1" @change_Page="changePage1" @change_Size="changeSize1"></Pagination>
      </el-select>
      <el-select v-model="category" filterable clearable placeholder="请选择分类">
        <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        <Pagination :totalNum="totalNum2" @change_Page="changePage2" @change_Size="changeSize2"></Pagination>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="makeupSearch">搜索</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" :before-close="handleClose">
        <el-form
          :label-position="labelPosition"
          label-width="120px"
          :model="formLabelAdd"
          :rules="rules"
          ref="formLabelAdd"
          size="mini"
        >
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="formLabelAdd.name"></el-input>
          </el-form-item>
          <el-form-item label="产品规格" prop="specification">
            <el-input v-model="formLabelAdd.specification"></el-input>
          </el-form-item>
          <el-form-item label="新增品牌">
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" class="add">新增</el-button>
          </el-form-item>
          <el-form-item label="品牌" prop="grid">
            <el-select v-model="formLabelAdd.grid" filterable clearable placeholder="请选择品牌">
              <el-option
                v-for="item in gridList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
              <el-pagination
                @size-change="changeSize4"
                @current-change="changePage4"
                :current-page="page4"
                :page-sizes="[10, 20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNum4"
              ></el-pagination>
            </el-select>
          </el-form-item>
          <el-form-item label="参考价格" prop="price">
            <el-input v-model="formLabelAdd.price"></el-input>
          </el-form-item>
          <el-form-item label="好评率(例如90%就填9.0)">
            <el-input v-model="formLabelAdd.grade"></el-input>
          </el-form-item>
          <el-form-item label="产品简介">
            <el-input v-model="formLabelAdd.synopsis"></el-input>
          </el-form-item>
          <el-form-item label="成分">
            <el-input v-model="formLabelAdd.elementId"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="category2" filterable clearable placeholder="请选择分类">
              <el-option
                v-for="(item,index) in categoryList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
              <el-pagination
                @size-change="changeSize5"
                @current-change="changePage5"
                :current-page="page5"
                :page-sizes="[10, 20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNum5"
              ></el-pagination>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄分布">
            <el-input v-model="formLabelAdd.ageDistribution"></el-input>
          </el-form-item>
          <el-form-item label="肤质分布">
            <el-input v-model="formLabelAdd.skinType"></el-input>
          </el-form-item>
          <el-form-item label="测评地址">
            <el-input v-model="formLabelAdd.appraisalUrl"></el-input>
          </el-form-item>
          <el-form-item label="功效">
            <el-select v-model="problem" filterable clearable placeholder="请选择功效">
              <el-option
                v-for="(item,index) in problemList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
              <el-pagination
                @size-change="changeSize6"
                @current-change="changePage6"
                :current-page="page6"
                :page-sizes="[10, 20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNum6"
              ></el-pagination>
            </el-select>
          </el-form-item>
          <el-form-item label="功效分数">
            <el-input v-model="formLabelAdd.fs"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="upload-demo"
              action="management/admin/kcupload!uploadImage.action"
              :data="imgData"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess1"
              :file-list="fileList"
              :before-upload="beforeUpload"
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
    <el-table :data="makeupList" border style="width: 90%">
      <el-table-column label="编号" width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="name" label="产品名称"></el-table-column>
      <el-table-column prop="brandName" label="品牌名称"></el-table-column>
      <el-table-column prop="creatUser" label="操作人"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, makeupList)"
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
          <el-dialog title="编辑" :visible.sync="dialogVisible" :before-close="handleClose">
            <el-form
              :label-position="labelPosition"
              label-width="120px"
              :model="formLabelAlign"
              :rules="rules"
              ref="formLabelAlign"
              size="mini"
            >
              <el-form-item label="产品名称" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="产品规格" prop="specification">
                <el-input v-model="formLabelAlign.specification"></el-input>
              </el-form-item>
              <el-form-item label="新增品牌">
                <el-button
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  size="small"
                  class="add"
                >新增</el-button>
              </el-form-item>
              <el-form-item label="品牌" prop="category">
                <el-select
                  v-model="formLabelAlign.category"
                  filterable
                  clearable
                  placeholder="请选择品牌"
                >
                  <el-option
                    v-for="item in gridList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                  <el-pagination
                    @size-change="changeSize4"
                    @current-change="changePage4"
                    :current-page="page4"
                    :page-sizes="[10, 20]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum4"
                  ></el-pagination>
                </el-select>
              </el-form-item>
              <el-form-item label="参考价格">
                <el-input v-model="formLabelAlign.price"></el-input>
              </el-form-item>
              <el-form-item label="好评率(例如90%就填9.0)">
                <el-input v-model="formLabelAlign.grade"></el-input>
              </el-form-item>
              <el-form-item label="产品简介">
                <el-input v-model="formLabelAlign.synopsis"></el-input>
              </el-form-item>
              <el-form-item label="成分">
                <el-input v-model="formLabelAlign.elementId"></el-input>
              </el-form-item>
              <el-form-item label="分类">
                <el-select v-model="category2" filterable clearable placeholder="请选择分类">
                  <el-option
                    v-for="(item,index) in categoryList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                  <el-pagination
                    @size-change="changeSize5"
                    @current-change="changePage5"
                    :current-page="page5"
                    :page-sizes="[10, 20]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum5"
                  ></el-pagination>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄分布">
                <el-input v-model="formLabelAlign.ageDistribution"></el-input>
              </el-form-item>
              <el-form-item label="肤质分布">
                <el-input v-model="formLabelAlign.skinType"></el-input>
              </el-form-item>
              <el-form-item label="测评地址">
                <el-input v-model="formLabelAlign.appraisalUrl"></el-input>
              </el-form-item>
              <el-form-item label="功效">
                <el-select v-model="problem" filterable clearable placeholder="请选择功效">
                  <el-option
                    v-for="(item,index) in problemList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                  <el-pagination
                    @size-change="changeSize6"
                    @current-change="changePage6"
                    :current-page="page6"
                    :page-sizes="[10, 20]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum6"
                  ></el-pagination>
                </el-select>
              </el-form-item>
              <el-form-item label="功效分数">
                <el-input v-model="formLabelAlign.fs"></el-input>
              </el-form-item>
              <el-form-item label="图片">
                <el-upload
                  class="upload-demo"
                  action="management/admin/kcupload!uploadImage.action"
                  :data="imgData"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :file-list="fileList2"
                  :before-upload="beforeUpload"
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
    <Pagination :totalNum="totalNum3" @change_Page="changePage3" @change_Size="changeSize3"></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/module/Pagination.vue";
export default {
  data() {
    return {
      makeupList: [],
      gridList: [],
      categoryList: [],
      problemList: [],
      fileList2: [],
      fileList: [],
      imgData: {},
      imgData1: {},
      category: "",
      category2: "",
      grid: "",
      grid2: "",
      problem: "",
      makeup_Search: "",
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      currentPage4: 1,
      formLabelAlign: {
        name: "",
        price: "",
        category: "",
        specification: ""
      },
      formLabelAdd: {
        name: "",
        price: "",
        category: "",
        specification: ""
      },
      page1: 1,
      row1: 10,
      totalNum1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      page5: 1,
      page6: 1,
      row2: 10,
      totalNum2: 1,
      row3: 10,
      row4: 10,
      row5: 10,
      row6: 10,
      totalNum3: 1,
      totalNum4: 1,
      totalNum5: 1,
      totalNum6: 1,
      rules: {
        name: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入产品价格", trigger: "blur" }],
        category: [
          { required: true, message: "请输入产品品牌", trigger: "change" }
        ],
        specification: [
          { required: true, message: "请输入产品规格", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    Pagination
  },
  mounted() {
    this.getMakeupList(1, 10);
    this.getGridList(1, 10);
    this.getCategoryList(1, 10);
    this.getProblemList(1, 10);
  },
  methods: {
    getGridList(page, row) {
      this.$axios
        .get("/management/admin/brand!comboGridlist.action", {
          params: {
            page: page,
            rows: row
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.totalNum1 = this.totalNum5 = this.totalNum4 = res.data.total;

            this.gridList = res.data.rows;
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
    getCategoryList(page, row) {
      this.$axios
        .get("/management/admin/beauty-category!comboGridlist.action", {
          params: {
            page: page,
            rows: row
          }
        })
        .then(res => {
          console.log(res, "");
          if (res.status == 200) {
            this.totalNum2 = res.data.total;
            this.categoryList = res.data.rows;
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
    getMakeupList(page, row) {
      this.$axios
        .get("/management/admin/beauty-product!list.action", {
          params: {
            page: page,
            rows: row
          }
        })
        .then(res => {
          console.log(res, "");
          if (res.status == 200) {
            this.totalNum3 = res.data.total;
            this.makeupList = res.data.rows;
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
    getProblemList(page, row) {
      this.$axios
        .get("management/admin/skin-problems!comboGridlist.action", {
          params: {
            page,
            row
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.totalNum6 = res.data.total;
            this.problemList = res.data.rows;
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.idx = row.id;
      this.$axios
        .get(`management/admin/beauty-product!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.formLabelAlign = res.data;
            this.$axios
              .get(
                `management/admin/beauty-product!getSelectDetail.action?id=${
                  this.idx
                }`
              )
              .then(res => {
                if (res.status == 200) {
                  this.formLabelAlign.brandId = res.data.brandId;
                  this.formLabelAlign.category = res.data.brandId.name;
                }
              });
          }
        });
    },
    //保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              `management/admin/beauty-product!save.action?id=${this.idx}`,
              this.$qs.stringify({
                name: this.formLabelAlign.name,
                specification: this.formLabelAlign.specification,
                brandId: this.formLabelAlign.category.id,
                price: this.formLabelAlign.price,
                grade: this.formLabelAlign.grade,
                synopsis: this.formLabelAlign.synopsis,
                elementId: this.formLabelAlign.elementId,
                method: this.formLabelAlign.method,
                categoryId: this.formLabelAlign.categoryId,
                ageDistribution: this.formLabelAlign.ageDistribution,
                skinType: this.formLabelAlign.skinType,
                appraisalUrl: this.formLabelAlign.appraisalUrl,
                fs: this.formLabelAlign.fs,
                image: "<img src='" + this.formLabelAlign.image + "' />"
              })
            )
            .then(res => {
              if (res.status == 200) {
                this.dialogVisible = false;
                this.$message.success(`修改成功`);
                (this.fileList2 = []), this.getMakeupList();
              }
            });
        } else {
          console.log("error submit!!");
          return false;
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
            `/management/admin/beauty-product!delete.action?id=${
              rows[index].id
            }`
          )
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getMakeupList();
            }
          });
      });
    },
    // 新增
    handleAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              `management/admin/beauty-product!save.action`,
              this.$qs.stringify({
                name: this.formLabelAdd.name,
                specification: this.formLabelAdd.specification,
                brandId: this.formLabelAdd.brandId,
                price: this.formLabelAdd.price,
                grade: this.formLabelAdd.grade,
                synopsis: this.formLabelAdd.synopsis,
                elementId: this.formLabelAdd.elementId,
                method: this.formLabelAdd.method,
                categoryId: this.formLabelAdd.categoryId,
                ageDistribution: this.formLabelAdd.ageDistribution,
                skinType: this.formLabelAdd.skinType,
                appraisalUrl: this.formLabelAdd.appraisalUrl,
                fs: this.formLabelAdd.fs,
                image: "<img src='" + this.formLabelAdd.image + "' />"
              })
            )
            .then(res => {
              if (res.status == 200) {
                this.AddVisible = false;
                this.$message.success("添加成功");
                this.getMakeupList();
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 搜索
    makeupSearch() {
      this.$axios
        .get("/management/admin/beauty-product!list.action", {
          params: {
            filter_EQS_categoryId: this.category,
            filter_EQL_brandId: this.grid,
            page: 1,
            rows: 10
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.makeupList = res.data.rows;
          }
        });
    },
    // 图片
    handleRemove(file, fileList) {
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
      this.formLabelAlign.image = res.url;
    },
    handleSuccess1(res) {
      this.formLabelAdd.image = res.url;
    },
    // 分页
    changePage1(val) {
      this.page1 = val;
      this.getGridList(val, this.row1);
    },
    changeSize1(val) {
      this.row1 = val;
      this.getGridList(this.page1, val);
    },
    changePage2(val) {
      this.page2 = val;
      this.getCategoryList(val, this.row2);
    },
    changeSize2(val) {
      this.row2 = val;
      this.getCategoryList(this.page2, val);
    },
    changePage3(val) {
      this.page3 = val;
      this.getMakeupList(val, this.row3);
    },
    changeSize3(val) {
      this.row3 = val;
      this.getMakeupList(this.page3, val);
    },
    changePage4(val) {
      this.page4 = val;
      this.getGridList(val, this.row4);
    },
    changeSize4(val) {
      this.row4 = val;
      this.getGridList(this.page4, val);
    },
    changePage5(val) {
      this.page5 = val;
      this.getGridList(val, this.row5);
    },
    changeSize5(val) {
      this.row5 = val;
      this.getGridList(this.page5, val);
    },
    changePage6(val) {
      this.page6 = val;
      this.getProblemList(val, this.row6);
    },
    changeSize6(val) {
      this.row6 = val;
      this.getProblemList(this.page6, val);
    }
  }
};
</script>

<style scoped>
</style>
