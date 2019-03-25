<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增产品</el-button>
      <!-- <el-button type="primary" @click="AddGrid = true" v-has size="small">新增产品牌</el-button> -->
      <el-input
        v-model="makeup_Search"
        placeholder="请输入产品名称"
        style="width: 30%"
        size="small"
        @keyup.enter.native="productSearch"
      >
        <el-button slot="append" icon="el-icon-search" @click="productSearch"></el-button>
      </el-input>
      <el-dialog title="新增产品" :visible.sync="AddVisible" :close-on-click-modal='false'>
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
          <el-form-item label="产品规格" >
            <el-input v-model="formLabelAdd.specification"></el-input>
          </el-form-item>
          <!-- <el-form-item label="新增品牌">
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" class="add">新增</el-button>
          </el-form-item>-->
          <el-form-item label="品牌">
            <el-select
              v-model="formLabelAdd.brandId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="brandSearch"
              :loading="loading"
            >
              <el-option
                v-for="item in gridList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参考价格" prop="price">
            <el-input v-model="formLabelAdd.price"></el-input>
          </el-form-item>
          <el-form-item label="好评率">
            <el-input v-model="formLabelAdd.grade" placeholder="例如90%就填9.0"></el-input>
          </el-form-item>
          <el-form-item label="产品简介">
            <el-input v-model="formLabelAdd.synopsis"></el-input>
          </el-form-item>
          <el-form-item label="成分">
            <el-input v-model="formLabelAdd.elementId"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select
              v-model="formLabelAdd.categoryId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="categorySearch"
              :loading="loading"
            >
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
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
            <el-select
              v-model="formLabelAdd.gx"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请选择功效"
              :remote-method="gxSearch"
            >
              <el-option
                v-for="(item) in problemList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功效分数">
            <el-input v-model="formLabelAdd.fs"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="upload-demo"
              action="management/admin/kcupload!uploadImage.action"
              :data="imgData1"
              :on-preview="handlePreview"
              :on-remove="handleRemove1"
              :on-success="handleSuccess1"
              :file-list="fileList"
              :before-upload="beforeUpload1"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formLabelAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="makeupList" border style="width: 100%">
      <el-table-column label="编号" width="120" align="center">
        <template slot-scope="scope" align="center">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="name" label="产品名称" align="center"></el-table-column>
      <el-table-column prop="brandName" label="品牌名称" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.online==0">上线</el-tag>
          <el-tag type="danger" v-else-if="scope.row.online==1">下线</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="creatUser" label="操作人" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            v-has
          >编辑</el-button>
          <el-button size="small" @click="online(scope.row)" v-if="scope.row.online==1">上线</el-button>
          <el-button size="small" v-else-if="scope.row.online==0" @click="online(scope.row)">下线</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, makeupList)"
            type="danger"
            size="small"
            v-del
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogVisible" :close-on-click-modal='false'>
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
        <el-form-item label="产品规格">
          <el-input v-model="formLabelAlign.specification"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select
            v-model="formLabelAlign.brandId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="brandSearch"
            :loading="loading"
          >
            <el-option
              v-for="item in gridList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参考价格" prop="price">
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
          <el-select
            v-model="formLabelAlign.categoryId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="categorySearch"
            :loading="loading"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
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
          <el-select
            v-model="formLabelAlign.gx"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请选择功效"
            :remote-method="gxSearch"
          >
            <el-option
              v-for="(item) in problemList"
              :key="item.id"
              :label="item.name"
              :value='item.id'
            ></el-option>
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
            :limit="1"
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
    <el-dialog title="图片预览" :visible.sync="imgVisible" append-to-body>
      <img :src="img" alt style="width:100%">
    </el-dialog>
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
      makeup_Search: "",
      dialogVisible: false,
      AddVisible: false,
      imgVisible: false,
      AddGrid: false,
      loading: false,
      img:'',
      labelPosition: "left",
      idx: -1,
      formLabelAlign: {},
      formLabelAdd: {
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
        name: [
          {
            required: true,
            message: "请输入产品名称",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入产品价格",
            trigger: "blur"
          }
        ],
        category: [
          {
            required: true,
            message: "请输入产品品牌",
            trigger: "change"
          }
        ],
        brandId: [
          {
            required: true,
            message: "请输入产品品牌",
            trigger: "change"
          }
        ],
        specification: [
          {
            required: true,
            message: "请输入产品规格",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    Pagination
  },
  mounted() {
    this.getMakeupList(1, 10);
  },
  methods: {
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

    // 编辑
    handleEdit(index, row) {
      this.formLabelAlign={}
      this.problemList=[]
      this.idx = row.id;
      this.dialogVisible = true;
      this.$axios
        .get(`/management/admin/beauty-product!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.$axios
              .get(
                `/management/admin/beauty-product!getSelectDetail.action?id=${
                  this.idx
                }`
              )
              .then(res2 => {
                if (res2.status == 200) {
                  this.formLabelAlign = res.data;
                  if(res2.data.brandId){
                    this.formLabelAlign.brandId = res2.data.brandId.id
                    this.gridList = [res2.data.brandId]
                  }
                  if(res2.data.categoryId){
                    this.formLabelAlign.categoryId = res2.data.categoryId.id
                    this.categoryList = [res2.data.categoryId]
                  }
                  res2.data.fs
                    ? (this.formLabelAlign.fs = res2.data.fs)
                    : (this.formLabelAlign.fx = "");
                  if (res2.data.gx) {
                    let gx = [];
                    for (let index = 0; index < res2.data.gx.length; index++) {
                      gx.push(res2.data.gx[index].id);
                    }
                    // this.formLabelAlign.gx = gx;
                    this.$set(this.formLabelAlign,'gx',gx)
                    this.problemList = res2.data.gx
                  }
                }
                console.log(this.formLabelAlign);
              });
          }
        });
    },
    //保存编辑
    saveEdit(formName) {
      console.log(this.formLabelAlign);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let gx = "";
          if (this.formLabelAlign.gx) {
            for (let i = 0; i < this.formLabelAlign.gx.length; i++) {
              gx += "&gx=" + this.formLabelAlign.gx[i];
            }
          }
          let params =
            this.$qs.stringify({
              name: this.formLabelAlign.name,
              specification: this.formLabelAlign.specification,
              brandId: this.formLabelAlign.brandId,
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
              image:this.formLabelAlign.image
            }) + gx;
          this.$axios
            .post(
              `/management/admin/beauty-product!save.action?id=${this.idx}`,
              params
            )
            .then(res => {
              if (res.status == 200) {
                this.dialogVisible = false;
                this.$message.success(`修改成功`);
                this.fileList2 = [];
                this.getMakeupList(this.page1,this,row1);
                this.formLabelAlign={}
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
      console.log(this.formLabelAdd);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let gx = "";
          if (this.formLabelAdd.gx) {
            for (let i = 0; i < this.formLabelAdd.gx.length; i++) {
              gx += "&gx=" + this.formLabelAdd.gx[i];
            }
          }

          let params =
            this.$qs.stringify({
              name: this.formLabelAdd.name,
              specification: this.formLabelAdd.specification,
              brandId: this.formLabelAdd.brandId,
              price: this.formLabelAdd.price,
              grade: this.formLabelAdd.grade,
              synopsis: this.formLabelAdd.synopsis,
              elementId: this.formLabelAdd.elementId,
              categoryId: this.formLabelAlign.categoryId,
              method: this.formLabelAdd.method,
              ageDistribution: this.formLabelAdd.ageDistribution,
              skinType: this.formLabelAdd.skinType,
              appraisalUrl: this.formLabelAdd.appraisalUrl,
              fs: this.formLabelAdd.fs,
              image: this.formLabelAdd.image
            }) + gx;
          this.$axios
            .post(`/management/admin/beauty-product!save.action`, params)
            .then(res => {
              if (res.status == 200) {
                this.AddVisible = false;
                this.$message.success("添加成功");
                this.getMakeupList();
                this.$refs[formName].resetFields();
                this.formLabelAdd={}
                this.fileList = [];
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 上下线
    online(rows) {
      this.$confirm(`是否${rows.online == 0 ? "禁用" : "启用"}该记录`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(
              `/management/admin/beauty-product!online.action`,
              this.$qs.stringify({
                id: rows.id,
                online: rows.online == 0 ? 1 : 0
              })
            )
            .then(res => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: `${rows.online == 0 ? "禁用" : "启用"}成功!`
                });
                this.getMakeupList(this.page1, this.row1);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 搜索
    makeupSearch() {
      this.$axios
        .get("/management/admin/beauty-product!list.action", {
          params: {
            filter_EQS_categoryId: this.category,
            filter_EQL_brandId: this.grid
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.makeupList = res.data.rows;
            this.totalNum3 = res.data.total;
          }
        });
    },
    //品牌搜索
    brandSearch(q) {
      if (q !== "") {
        this.loading = true;
        setTimeout(() => {
          this.$axios
            .post(
              "/management/admin/brand!comboGridlist.action",
              this.$qs.stringify({
                page: 1,
                rows: 50,
                q: q
              })
            )
            .then(res => {
              if (res.status == 200) {
                this.gridList = res.data.rows;
                this.loading = false;
              }
            });
        }, 200);
      } else {
        this.gridList = [];
      }
    },
    //分类搜索
    categorySearch(q) {
      if (q !== "") {
        this.loading = true;
        setTimeout(() => {
          this.$axios
            .post(
              "/management/admin/beauty-category!comboGridlist.action",
              this.$qs.stringify({
                page: 1,
                rows: 50,
                q: q
              })
            )
            .then(res => {
              if (res.status == 200) {
                this.categoryList = res.data.rows;
                this.loading = false;
              }
            });
        }, 200);
      } else {
        this.categoryList = [];
      }
    },
    //功效搜索
    gxSearch(q) {
      if (q !== "") {
        this.loading = true;
        setTimeout(() => {
          this.$axios
            .post(
              "/management/admin/skin-problems!comboGridlist.action",
              this.$qs.stringify({
                page: 1,
                rows: 50,
                q: q
              })
            )
            .then(res => {
              if (res.status == 200) {
                this.problemList = res.data.rows;
                this.loading = false;
              }
            });
        }, 200);
      } else {
        this.problemList = [];
      }
    },
    productSearch(page, row) {
      this.$axios
        .post(
          "/management/admin/beauty-product!list.action",
          this.$qs.stringify({
            filter_LIKES_name: this.makeup_Search,
            page: page,
            rows: row
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.makeupList = res.data.rows;
            this.totalNum3 = res.data.total;
          }
        });
    },
    change(val) {
      console.log(val);
      console.log(this.gridList);
    },
    // 图片
    handleRemove(file, fileList) {},
    handleRemove1(file, fileList) {},
    handlePreview(file) {
      this.img = file.url;
      this.imgVisible = true;
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
      this.getCategoryList(val, this.row5);
    },
    changeSize5(val) {
      this.row5 = val;
      this.getCategoryList(this.page5, val);
    },
    changePage6(val) {
      this.page6 = val;
      this.gxSearch();
    },
    changeSize6(val) {
      this.row6 = val;
      this.gxSearch();
    }
  }
};
</script>

<style scoped>
.el-dialog {
  text-align: left !important;
}
</style>
