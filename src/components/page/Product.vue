<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true">新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="名称">
            <el-input v-model="formLabelAdd.categoryName"></el-input>
          </el-form-item>
          <el-form-item label="上级目录" >
            <el-input v-model="formLabelAdd.beautyCategoryName"></el-input>
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
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- <el-table :data="productList" border style="width: 90%">
      <el-table-column label="id" width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="categoryName" label="分类名称"></el-table-column>

      <el-table-column prop="theMain" label="上级目录"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, productList)"
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
          <el-dialog
            title="编辑"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="名称">
                <el-input v-model="formLabelAlign.categoryName"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>-->
    <el-dialog
            title="编辑"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
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
      currentPage4: 1,
      formLabelAlign: {},
      formLabelAdd: {
        date: "",
        name: ""
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
                .get(
                  `/management/admin/beauty-category!getTreeGrid.action`
                )
                .then(res => {
                  if (res.status == 200) {
                   let productList =  res.data.map(item => {
                      return {
                        id:item.id,
                        categoryName:item.categoryName,
                        text:item.text,
                        children: []
                      }
                    });
                    for( let i = 0; i<productList.length;i++){
                      this.$axios.get(`/management/admin/beauty-category!getTreeGrid.action?id=${productList[i].id}`).then(
                        res => {
                          if(res.status == 200){
                            productList[i].children = res.data;
                          }
                        }
                      )
                    }
                    this.treeData = productList;
                    console.log(this.treeData)
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
      console.log(m)
        this.idx = m.id;
      this.$axios
        .get(`/management/admin/beauty-category!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            this.formLabelAlign = res.data;
            console.log(this.formLabelAlign)
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
      }).then(() => {
        this.$axios
          .get(
            `/management/admin/beauty-category!delete.action?id=${
              m.id
            }`
          )
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getProductList();
            }
          });
      }).catch(()=>{});
    },
    handlerExpand(m) {
      m.isExpand = !m.isExpand;
    },
    clickRow(m) {
      this.formLabelAdd.beautyCategoryName = m.beautyCategoryName
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
            this.$message.success(`添加成功`);
            this.getProductList();
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
    handleAdd() {},
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
</style>