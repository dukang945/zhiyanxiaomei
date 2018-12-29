    <template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :label="item.name"
        :name="item.id.toString()"
        v-for="(item) in mainList"
        :key="item.name"
      >
        <div class="handle-box">
          <el-button type="primary" @click="AddVisible = true">新增</el-button>
          <el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="步骤父类">
                <el-select v-model="branch" placeholder="请选择">
                  <el-option
                    v-for="item in branchoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品分类">
                <el-cascader :options="options" change-on-select></el-cascader>
              </el-form-item>
              <el-form-item label="步骤数">
                <el-input v-model="formLabelAdd.name"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="AddVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleAdd">确 定</el-button>
            </span>
          </el-dialog>
        </div>
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
                    <el-input v-model="formLabelAlign.name"></el-input>
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
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="4"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainList: [],
      branchList: [],
      options: [],
      branchoptions: [],
      branch:'',
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
      }
    };
  },
  mounted() {
    this.tableData4 = [
      {
        date: "1",
        name: "q"
      }
    ];
    this.getMainList();
  },
  methods: {
    getMainList() {
      this.$axios
        .post("api/management/admin/beauty-order!list.action")
        .then(res => {
          console.log(res, "");
          if (res.status == 200) {
            this.mainList = res.data.rows;
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
    getBranchList(tab) {
      this.$axios
        .get(
          `api/management/admin/beauty-order-details!list.action?beautyOrderId=${
            tab.name
          }`
        )
        .then(res => {
          console.log(res);
          this.branchList = res.data.rows;
        });
    },
    // 编辑
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData4[index];
      this.formLabelAlign = {
        date: item.date,
        name: item.name
      };
      this.dialogVisible = true;
    },
    //保存编辑
    saveEdit() {
      this.$set(this.tableData3, this.idx, this.formLabelAlign);
      this.dialogVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
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
            `api/management/admin/beauty-order-details!delete.action?id=${
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
      this.tableData3.push(this.formLabelAdd);
      this.AddVisible = false;
      this.$message.success(`添加成功`);
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
</style>