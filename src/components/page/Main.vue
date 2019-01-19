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
          <el-form-item label="名称" prop="name">
            <el-input v-model="formLabelAdd.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="mainList" border style="width: 90%">
      <el-table-column label="编号" width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, mainList)"
            type="danger"
            size="small"
            class="el-icon-delete"
            v-del
          >删除</el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            v-has
          >编辑</el-button>
          <el-dialog
            title="编辑"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules"
          ref="formLabelAlign">
              <el-form-item label="名称" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
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
     <Pagination :totalNum="totalNum" @change_Page="changePage" @change_Size="changeSize"></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/module/Pagination.vue";
export default {
  data() {
    return {
      mainList: [],
      ingredient_Search: "",
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      page: 1,
      row: 10,
      totalNum: 1,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      formLabelAlign: {},
      formLabelAdd: {
        date: "",
        name: ""
      }
    };
  },
  components: {
    Pagination
  },
  mounted() {
    this.getMainList();
  },
  methods: {
    getMainList(page,row) {
      this.$axios
        .post("/management/admin/beauty-order!list.action",{params:{page,row}})
        .then(res => {
          console.log(res, "");
          if (res.status == 200) {
            this.mainList = res.data.rows;
            this.totalNum =res.data.total
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
    // 编辑
    handleEdit(index, row) {
      this.idx = row.id;
      this.dialogVisible = true;
      this.$axios
        .get(`/management/admin/beauty-order!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            this.formLabelAlign = res.data;
          }
        });
    },
    //保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              `/management/admin/beauty-order!input.action?id=${this.idx}`,
              this.$qs.stringify({
                name: this.formLabelAlign.name
              })
            )
            .then(res => {
              if (res.status == 200) {
                this.dialogVisible = false;
                this.$message.success(`修改成功`);
                this.getMainList()
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
      console.log(rows[index].id);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .get(
            `/management/admin/beauty-order!delete.action?id=${rows[index].id}`
          )
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getMainList();
            }
          });
      });
    },
    // 新增
    handleAdd() {
      this.$axios
        .post(
          "/management/admin/beauty-order!save.action",
          this.$qs.stringify({ name: this.formLabelAdd.name })
        )
        .then(res => {
          if (res.status == 200) {
            this.AddVisible = false;
            this.$message.success("添加成功");
            this.getMainList();
            this.formLabelAdd={}
          }
        });
    },
    handleClose(done) {
      done();
    },
    
  changePage(val) {
      this.page = val;
      this.getMainList(val, this.row);
    },
    changeSize(val) {
      this.row = val;
      this.getMainList(this.page, val);
    }
  }
};
</script>

<style scoped>
.handle-box {
  padding-bottom: 20px;
}
</style>