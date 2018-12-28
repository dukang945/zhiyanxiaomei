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
    <el-table
      :data="brandList"
      border
      style="width: 90%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="id" width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="name" label="品牌名称"></el-table-column>
      <el-table-column prop="theMain" label="主打"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, brandList)"
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
              <el-form-item label="品牌名称:">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="简介:">
                <el-input v-model="formLabelAlign.synopsis"></el-input>
              </el-form-item>
              <el-form-item label="主打:">
                <el-input v-model="formLabelAlign.theMain"></el-input>
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
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="0"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brandList: [],
      multipleSelection: [],
      del_list: [],
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      currentPage4: 1,
      formLabelAlign: {
      },
      formLabelAdd: {
        date: "",
        name: ""
      }
    };
  },
  mounted() {
    this.getBrandList();
  },
  methods: {
    getBrandList() {
      this.$axios.post("api/management/admin/brand!list.action").then(res => {
        console.log(res, "");
        if (res.status == 200) {
          this.brandList = res.data.rows;
        } else {
          this.$message.error("请求数据失败!");
        }
        // console.log(this.columnList)
      });
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index,row)
      this.$axios.get(`api/management/admin/brand!input.action?id=${row.id}`).then(
        res => {
          if(res.status == 200) {
           this.formLabelAlign = res.data
          }
        }
      )
      this.dialogVisible = true;
    },
    //保存编辑
    saveEdit() {
      this.dialogVisible = false;
      this.$message.success(`修改第 行成功`);
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
          .get(`api/management/admin/brand!delete.action?id=${rows[index].id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getBrandList();
            }
          });
      });
    },
    // 新增
    handleAdd() {
      // this.tableData3.push(this.formLabelAdd);
      // this.AddVisible = false;
      // this.$message.success(`添加成功`);
      // this.$axios.post('api/management/admin/skills!list.action').then(
      //   res =>{
      //     if(res.status == 200) {
      //     }
      //   }
      // )
    },
    // 全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 选中项
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // // 批量删除
    // delAll() {
    //   const length = this.multipleSelection.length;
    //   for (let index = 0; index < length; index++) {
    //     const element = this.multipleSelection[index];
    //     const i = this.tableData3.indexOf(element);
    //     this.tableData3.splice(i, 1);
    //   }
    // },
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