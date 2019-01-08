<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true">新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="名称">
            <el-input v-model="formLabelAdd.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="partList" border style="width: 90%">
      <el-table-column label="角色名称" width="120">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="memo" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, partList)"
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
          <el-button 
          size="small" 
          type="success" 
          icon="el-icon-share"
          @click="handleAllot(scope.$index, scope.row)" 
          circle></el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      partList: [],
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      currentPage4: 1,
      formLabelAlign: {
        date: "",
        name: ""
      },
      formLabelAdd: {
        date: "",
        name: ""
      }
    };
  },
  mounted() {
    this.getPartList();
  },
  methods: {
    getPartList() {
      this.$axios.post("/management/admin/role!list.action").then(res => {
        console.log(res, "");
        if (res.status == 200) {
          this.partList = res.data.rows;
        } else {
          this.$message.error("请求数据失败!");
        }
      });
    },
    // 编辑
    handleEdit(index, row) {
      this.idx = index;
      const item = this.issueList[index];
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
            `/management/admin/skin-problems!delete.action?id=${
              rows[index].id
            }`
          )
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getIssueList();
            }
          });
      });
    },
    // 新增
    handleAdd() {},
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 搜索
    issueSearch() {
      this.$axios
        .get("/management/admin/skin-problems!list.action", {
          params: {
            filter_LIKES_question: this.issue_Search,
            page: 1,
            rows: 15
          }
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res, "");
            this.issueList = res.data.rows;
          }
        });
    }
  }
};
</script>

<style scoped>
</style>