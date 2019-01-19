    <template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" size="small">新增</el-button>
      <el-dialog
        title="新增"
        :visible.sync="AddVisible"
        width="30%"
        :before-close="handleClose"
        v-has
      >
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAdd">
          <el-form-item label="步骤父类">
            <el-select v-model="formLabelAdd.beautyOrderId" placeholder="请选择">
              <el-option
                v-for="item in mainList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品分类">
            <el-cascader
              :options="treeData"
              change-on-select
              :show-all-levels="false"
              @active-item-change="handleItemChange"
              expand-trigger="hover"
              :props="props"
              v-model="formLabelAdd.categoryId"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="步骤数">
            <el-input v-model="formLabelAdd.orderNumber"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :label="item.name"
        :name="item.id.toString()"
        v-for="(item) in mainList"
        :key="item.name"
      >
        <el-table :data="branchList" border style="width: 90%">
          <el-table-column label="id" width="120">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column prop="categoryName" label="产品分类"></el-table-column>
          <el-table-column prop="orderNumber" label="步骤数"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, branchList)"
                type="danger"
                size="small"
                circle
                class="el-icon-delete"
                v-del
              ></el-button>
              <el-button
                size="small"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleEdit(scope.$index, scope.row)"
                v-has
              ></el-button>
              <el-dialog
                title="编辑"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
                append-to-body
              >
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                  <el-form-item label="步骤父类">
                    <el-select v-model="formLabelAlign.beautyOrderId" placeholder="请选择">
                      <el-option
                        v-for="item in mainList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="产品分类">
                    <el-cascader
                      :options="treeData"
                      change-on-select
                      :show-all-levels="false"
                      @active-item-change="handleItemChange"
                      expand-trigger="hover"
                      :props="props"
                      v-model="selectOptions"
                    ></el-cascader>
                  </el-form-item>
                  <el-form-item label="步骤数">
                    <el-input v-model="formLabelAlign.orderNumber"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
        <Pagination :totalNum="totalNum" @change_Page="changePage" @change_Size="changeSize"></Pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Pagination from "@/components/module/Pagination.vue";
export default {
  data() {
    return {
      mainList: [],
      branchList: [],
      options: [],
      selectOptions: [],
      treeData: [],
      props: {
        label: "text",
        value: "id",
        children: "children"
      },
      branchoptions: [],
      branch: "",
      activeName: "0",
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      currentPage4: 4,
      formLabelAlign: {
        date: "",
        name: ""
      },
      formLabelAdd: {
        name: ""
      },
      page: 1,
      row: 10,
      totalNum: 1
    };
  },
  components: {
    Pagination
  },
  mounted() {
    this.getMainList(1, 10);
    this.getCategoryList();
  },
  methods: {
    getMainList(page, row) {
      this.$axios
        .get("/management/admin/beauty-order!list.action", {
          params: {
            page: page,
            rows: row
          }
        })
        .then(res => {
          console.log(res, "");
          if (res.status == 200) {
            this.totalNum = res.data.total;
            this.mainList = res.data.rows;
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
    getBranchList(tab) {
      if (tab) {
        var url = `/management/admin/beauty-order-details!list.action?beautyOrderId=${
          tab.name
        }`;
      } else {
        var url = "/management/admin/beauty-order-details!list.action";
      }
      this.$axios.get(url).then(res => {
        console.log(res);
        this.branchList = res.data.rows;
      });
    },
    getCategoryList() {
      this.$axios
        .get("/management/admin/beauty-category!getTreeGrid.action")
        .then(res => {
          if (res.status == 200) {
            let options = res.data.map(item => {
              return {
                id: item.id,
                categoryName: item.categoryName,
                text: item.text,
                children: []
              };
            });
            for (let i = 0; i < options.length; i++) {
              this.$axios
                .get(
                  `/management/admin/beauty-category!getTreeGrid.action?id=${
                    options[i].id
                  }`
                )
                .then(res => {
                  if (res.status == 200) {
                    options[i].children = res.data;
                  }
                });
            }
            this.treeData = options;
            console.log(this.treeData);
          }
        });
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.idx = row.id;
      this.$axios
        .get(
          `/management/admin/beauty-order-details!input.action?id=${this.idx}`
        )
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.formLabelAlign = res.data;
          }
        });
    },
    //保存编辑
    saveEdit() {
      this.$axios
        .post(
          `/management/admin/beauty-order-details!save.action?id=${this.idx}`,
          this.$qs.stringify({
            beautyOrderId: this.formLabelAlign.beautyOrderId,
            categoryId: this.selectOptions[this.selectOptions.length - 1],
            orderNumber: this.formLabelAlign.orderNumber
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.dialogVisible = false;
            this.$message.success(`添加成功`);
          }
        });
    },
    //删除
    deleteRow(index, rows) {
      console.log(rows[index].id);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .get(
            `/management/admin/beauty-order-details!delete.action?id=${
              rows[index].id
            }`
          )
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              rows.splice(index, 1);
            }
          });
      });
    },
    //  表单切换
    handleClick(tab, event) {
      console.log(tab, event);
      this.getBranchList(tab);
      if (tab.index == 0) {
      } else if (tab.index == 1) {
      }
    },
    // 新增

    handleAdd() {
      console.log(this.formLabelAdd)
      this.$axios
        .post(
          "/management/admin/beauty-order-details!save.action",
          this.$qs.stringify({
            beautyOrderId: this.formLabelAdd.beautyOrderId,
            categoryId: this.formLabelAdd.categoryId[
              this.formLabelAdd.categoryId.length - 1
            ],
            orderNumber: this.formLabelAdd.orderNumber
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.AddVisible = false;
            this.$message.success("添加成功");
            this.getCategoryList();
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
    // 分页
    changePage(val) {
      this.page = val;
      this.getMainList(val, this.row);
    },
    changeSize(val) {
      this.row = val;
      this.getMainList(this.page, val);
    },
    // 多级选择器
    handleItemChange(val) {
      console.log(val, "");
    }
  }
};
</script>

<style scoped>
.handle-box {
  padding-bottom: 20px;
}
</style>