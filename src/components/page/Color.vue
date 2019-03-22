<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增</el-button>
      <el-input v-model="color_Search" placeholder="请输入搜索类容" style="width: 30%" size="small">
        <el-button slot="append" icon="el-icon-search" @click="colorSearch"></el-button>
      </el-input>
      <el-dialog title="新增" :visible.sync="AddVisible">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAdd">
          <el-form-item label="产品及色号名称">
            <el-input v-model="formLabelAdd.productName"></el-input>
          </el-form-item>
          <el-form-item label="产品">
            <el-select
              v-model="formLabelAdd.productId"
              filterable
              remote
              reserve-keyword
              placeholder="请选择产品"
              :remote-method="proSearch"
            >
              <el-option
                v-for="(item) in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
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
              :on-remove="handleRemove1"
              :on-success="handleSuccess1"
              :file-list="fileList1"
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
    <el-table :data="colorList" border style="width: 100%">
      <el-table-column label="编号" width="120" align="center">
        <template slot-scope="scope" align="center">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="name" label="产品名称" align="center"></el-table-column>
      <el-table-column prop="colorName" label="色号名称" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.online==0">上线</el-tag>
          <el-tag type="danger" v-else-if="scope.row.online==1">下线</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="creatUser" label="创建人" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250">
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
            @click.native.prevent="deleteRow(scope.$index, colorList)"
            type="danger"
            size="small"
            v-del
          >删除</el-button>
          <el-dialog title="编辑" :visible.sync="dialogVisible">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="产品及色号名称">
                <el-input v-model="formLabelAlign.productName"></el-input>
              </el-form-item>
              <el-form-item label="产品">
                <el-select
              v-model="formLabelAlign.productId"
              filterable
              remote
              reserve-keyword
              placeholder="请选择产品"
              :remote-method="proSearch"
            >
              <el-option
                v-for="(item) in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
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
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
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
      loading:true,
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
      formLabelAdd: {
        image: []
      }
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
      console.log(1);
      this.$axios
        .get("/management/admin/beauty-color!list.action", {
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
        .get("/management/admin/beauty-product!comboGridlist.action", {
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
      this.formLabelAdd={}
      this.options=[]
      let image = "";
      for (let i = 0; i < this.formLabelAdd.image.length; i++) {
        image += `<img src="` + this.formLabelAdd.image[i] + `"  alt='' />`;
      }
      this.$axios
        .post(
          "/management/admin/beauty-color!save.action",
          this.$qs.stringify({
            productId: this.formLabelAdd.productId,
            productName: this.formLabelAdd.productName,
            colorName: this.formLabelAdd.colorName,
            image: image
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.AddVisible = false;
            this.$message.success("添加成功");
            this.getColorList();
            this.formLabelAdd = {};
            this.fileList1 = [];
          }
        });
    },
    //编辑
    handleEdit(index, row) {
      this.fileList = [];
      this.idx = row.id;
      this.$axios
        .get(`/management/admin/beauty-color!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.formLabelAlign = res.data;
            let str = this.formLabelAlign.image;
            let srcReg = /[a-zA-z]+:\/\/[^\s]*/g;
            let srcArr = str.match(srcReg);
            if (srcArr) {
              for (let i = 0; i < srcArr.length; i++) {
                this.fileList.push({
                  url: srcArr[i].split('"')[0]
                });
              }
            }
            console.log(this.fileList, this.formLabelAlign.image);
            // return
            this.$axios
              .get(
                `/management/admin/beauty-product!getNameById.action?id=${
                  this.formLabelAlign.productId
                }`
              )
              .then(res => {
                if (res.status == 200) {
                  console.log(res);
                  this.formLabelAlign.name = res.data.name;
                  this.options = [{name:res.data.name,id:res.data.productId}]
                  this.dialogVisible = true;
                }
              });
          }
        });
    },
    //保存编辑
    saveEdit(formName) {
      console.log(this.formLabelAlign, this.fileList);
      // return
      this.$axios
        .post(
          `/management/admin/beauty-color!save.action?id=${this.idx}`,
          this.$qs.stringify({
            productId: this.formLabelAlign.productId,
            productName: this.formLabelAlign.productName,
            colorName: this.formLabelAlign.colorName,
            image: this.formLabelAlign.image
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
              `/management/admin/beauty-color!online.action`,
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
                this.getColorList(this.page1, this.row1);
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
    //搜索
    colorSearch(page1, row1) {
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
            this.colorList = res.data.rows;
            this.totalNum1 = res.data.total;
          }
        });
    },
    //产品搜索
    proSearch(q){
      if (q !== "") {
        this.loading = true;
        setTimeout(() => {
          this.$axios
            .post(
              "/management/admin/beauty-product!comboGridlist.action",
              this.$qs.stringify({
                page: 1,
                rows: 50,
                q: q
              })
            )
            .then(res => {
              if (res.status == 200) {
                console.log(res)
                this.options = res.data.rows;
                this.loading = false;
              }
            });
        }, 200);
      } else {
        this.gridList = [];
      }
    },
    //图片
    handleRemove(file, fileList) {
      this.formLabelAlign.image = "";
      for (let i = 0; i < fileList.length; i++) {
        this.formLabelAlign.image +=
          `<img src="` + fileList[i].url + `"  alt='' />`;
      }
    },
    handleRemove1(file, fileList) {
      // console.log(this.formLabelAdd,file,fileList)
      this.formLabelAdd.image = [];
      for (let i = 0; i < fileList.length; i++) {
        this.formLabelAdd.image.push(fileList[i].response.url);
      }
      console.log(this.formLabelAdd);
      // this.formLabelAdd.image =''
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
      this.formLabelAlign.image += res.url;
    },
    handleSuccess1(res) {
      this.formLabelAdd.image.push(res.url);
    },
    //分页
    changePage1(val) {
      this.page1 = val;
      if (this.color_Search) {
        this.colorSearch(val, this.row1);
      } else {
        this.getColorList(val, this.row1);
      }
    },
    changeSize1(val) {
      this.row = val;
      if (this.color_Search) {
        this.colorSearch(val, this.row1);
      } else {
        this.getColorList(val, this.row1);
      }
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

<style scoped>
</style>
