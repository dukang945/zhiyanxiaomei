<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" size="small" v-has>新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="30%">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAdd"
          :rules="rules"
          ref="formLabelAdd"
        >
          <el-form-item label="标签名称" prop="categoryName">
            <el-input v-model="formLabelAdd.categoryName"></el-input>
          </el-form-item>
          <el-form-item label="上级目录">
            <el-input v-model="formLabelAdd.beautyCategoryName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="使用方法">
            <el-input v-model="formLabelAdd.method"></el-input>
          </el-form-item>
          <el-form-item label="功效">
            <el-input v-model="formLabelAdd.efficacy"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formLabelAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="上级目录">
          <el-input v-model="formLabelAlign.beautyCategoryName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="使用方法">
          <el-input v-model="formLabelAlign.method"></el-input>
        </el-form-item>
        <el-form-item label="功效">
          <el-input v-model="formLabelAlign.efficacy"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
    <TableTree
      ref="recTree"
      :list.sync="treeData"
      @actionFunc="actionFunc"
      @deleteFunc="deleteFunc"
      @handlerExpand="handlerExpand"
      @clickRow="clickRow"
      :headList="headList"
    ></TableTree>
  </div>
</template>

<script>
import TableTree from "@/components/module/table-tree";
export default {
  data() {
    return {
      treeData: [],
      productList: [],
      headList: ["id", "分类目录", "上级目录", "操作"],
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      rules: {
        categoryName: { required: true, message: "请输入名称", trigger: "blur" }
      },
      formLabelAlign: {},
      formLabelAdd: {
      }
    };
  },
  components: {
    TableTree
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    getProductList() {
      this.$axios
        .post("/management/admin/beauty-category!getTreeGrid.action")
        .then(res => {
          // console.log(res, "");
          // if (res.status == 200) {
          //   this.treeData = res.data;
          // } else {
          //   this.$message.error("请求数据失败!");
          // }
          if (res.status == 200) {
            this.$axios
              .get(`/management/admin/beauty-category!getTreeGrid.action`)
              .then(res => {
                if (res.status == 200) {
                  let productList = res.data.map(item => {
                    return {
                      id: item.id,
                      categoryName: item.categoryName,
                      text: item.text,
                      children: []
                    };
                  });
                  for (let i = 0; i < productList.length; i++) {
                    this.$axios
                      .get(
                        `/management/admin/beauty-category!getTreeGrid.action?id=${
                          productList[i].id
                        }`
                      )
                      .then(res => {
                        if (res.status == 200) {
                          res.data.map((item)=>{
                              // return this.$set(item,'labelName',item.beautyCategoryName)
                              return item.labelName = item.beautyCategoryName
                          })
                          productList[i].children = res.data;
                        }
                      });
                  }
                  this.treeData = productList;
                  console.log(this.treeData);
                }
              });
          }
        });
    },
    // 编辑
    // handleEdit(index, row) {
    //   this.idx = row.id;
    //   this.$axios
    //     .get(`/management/admin/beauty-category!input.action?id=${this.idx}`)
    //     .then(res => {
    //       if (res.status == 200) {
    //         this.formLabelAlign = res.data;
    //       }
    //     });
    //   this.dialogVisible = true;
    // },
    actionFunc(m) {
      console.log(m);
      this.idx = m.id;
      this.$axios
        .get(`/management/admin/beauty-category!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            this.formLabelAlign = res.data;
            console.log(this.formLabelAlign);
          }
        });
      this.dialogVisible = true;
    },
    deleteFunc(m) {
      console.log(m.id);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(`/management/admin/beauty-category!delete.action?id=${m.id}`)
            .then(res => {
              if (res.status == 200) {
                this.$message.success("删除成功");
                this.getProductList();
              }
            });
        })
        .catch(() => {});
    },
    handlerExpand(m) {
      m.isExpand = !m.isExpand;
    },
    clickRow(m) {
      console.log(m);
      this.formLabelAdd.beautyCategoryName = m.categoryName;
      this.formLabelAdd.beautyCategoryId = m.id;
      console.log(this.formLabelAdd);
    },
    //保存编辑
    saveEdit() {
      this.$axios
        .post(
          `/management/admin/beauty-category!save.action?id=${this.idx}`,
          this.$qs.stringify({
            categoryName: this.formLabelAlign.categoryName,
            beautyCategoryName: this.formLabelAlign.beautyCategoryName,
            beautyCategoryId: this.formLabelAlign.beautyCategoryId,
            method: this.formLabelAlign.method,
            efficacy: this.formLabelAlign.efficacy
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.dialogVisible = false;
            this.$message.success(`编辑成功`);
            this.getProductList();
            this.formLabelAlign = {};
          }
        });
    },
    //删除
    // deleteRow(index, rows) {
    //   console.log(rows[index].id);
    //   this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     this.$axios
    //       .get(
    //         `/management/admin/beauty-category!delete.action?id=${
    //           rows[index].id
    //         }`
    //       )
    //       .then(res => {
    //         if (res.status == 200) {
    //           this.$message.success("删除成功");
    //           this.getProductList();
    //         }
    //       });
    //   });
    // },
    // 新增

    handleAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post(
            "/management/admin/beauty-category!save.action",
            this.$qs.stringify({
              categoryName: this.formLabelAdd.categoryName,
              beautyCategoryName: this.formLabelAdd.beautyCategoryName,
              beautyCategoryId: this.formLabelAdd.beautyCategoryId,
              method: this.formLabelAdd.method,
              efficacy: this.formLabelAdd.efficacy
            })
          ).then(res => {
            if(res.status == 200){
              this.AddVisible = false;
            this.$message.success(`添加成功`);
            this.getProductList();
            this.formLabelAdd = {};
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      this.formLabelAlign = {};
      done();
    }
  }
};
</script>

<style scoped>
.handle-box{
  padding-bottom: 20px
}
</style>