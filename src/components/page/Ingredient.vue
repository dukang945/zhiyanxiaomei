<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" size="small" v-has>新增</el-button>
      <el-input v-model="ingredient_Search" placeholder="请输入搜索类容" style="width: 30%" size="small"  @keyup.enter.native="ingredientSearch">
        <el-button slot="append" icon="el-icon-search" @click="ingredientSearch"></el-button>
      </el-input>
      <el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="成分名称">
            <el-input v-model="formLabelAdd.name"></el-input>
          </el-form-item>
          <el-form-item label="功效作用">
            <el-input v-model="formLabelAdd.effect"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="ingredientList" border style="width: 90%">
      <el-table-column label="id" width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="name" label="成分名称"></el-table-column>

      <el-table-column prop="effect" label="功效作用"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, ingredientList)"
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
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="成分名称">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="功效,作用">
                <el-input v-model="formLabelAlign.effect"></el-input>
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
  </div>
</template>

<script>
import Pagination from "@/components/module/Pagination.vue";
export default {
  data() {
    return {
      ingredientList: [],
      ingredient_Search: "",
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      currentPage4: 1,
      formLabelAlign: {},
      formLabelAdd: {
        effect: "",
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
    this.getIngredientList();
  },
  methods: {
    getIngredientList() {
      this.$axios.post("/management/admin/element!list.action").then(res => {
        console.log(res, "");
        if (res.status == 200) {
          this.ingredientList = res.data.rows;
        } else {
          this.$message.error("请求数据失败!");
        }
      });
    },
    // 编辑
    handleEdit(index, row) {
      this.idx = row.id;
      this.$axios
        .get(`/management/admin/element!input.action?id=${this.idx}`)

        .then(res => {
          if (res.status == 200) {
            this.formLabelAlign = res.data;
          }
        });
    },
    //保存编辑
    saveEdit() {
      this.$axios
        .post(
          `/management/admin/element!save.action?id=${this.idx}`,
          this.$qs.stringify({
            name: this.formLabelAlign.name,
            effect: this.formLabelAlign.effect
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.dialogVisible = false;
            this.$message.success(`修改成功`);
            this.getIngredientList();
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
          .get(`/management/admin/element!delete.action?id=${rows[index].id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getIngredientList();
            }
          });
      });
    },
    // 新增
    handleAdd() {
      const params = {
        name: this.formLabelAdd.name,
        effect: this.formLabelAdd.effect
      };


      this.$axios
        .post(
          "/management/admin/element!save.action",
          this.$qs.stringify({
            name: this.formLabelAdd.name,
            effect: this.formLabelAdd.effect
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.AddVisible = false;
            this.$message.success("添加成功");
            this.getIngredientList();
          }
        });
    },
    handleClose(done) {
      done();
    },

    ingredientSearch() {
      this.$axios
        .post(
          "/management/admin/element!list.action",
          this.$qs.stringify({
            filter_LIKES_name: this.ingredient_Search,
            page: 1,
            rows: 15
          })
        )
        .then(res => {
          if (res.status == 200) {
            console.log(res, "");
            this.ingredientList = res.data.rows;
          }
        });
    },
    changePage(val) {
      this.page = val;
      this.getIngredientList(val, this.row);
    },
    changeSize(val) {
      this.row = val;
      this.getIngredientList(this.page, val);
    }
  }
};
</script>

<style scoped>
.handle-box{
  padding-bottom: 20px
}
</style>