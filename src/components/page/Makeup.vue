<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true">新增</el-button>
      <el-input v-model="makeup_Search" placeholder="请输入搜索类容" style="width: 30%">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-select v-model="grid" filterable clearable placeholder="请选择">
        <el-option v-for="item in gridList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        <Pagination :totalNum="totalNum1" @change_Page="changePage1" @change_Size="changeSize1"></Pagination>
      </el-select>
      <el-select v-model="category" filterable clearable placeholder="请选择">
        <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        <Pagination :totalNum="totalNum2" @change_Page="changePage2" @change_Size="changeSize2"></Pagination>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="makeupSearch">搜索</el-button>
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
    <el-table :data="makeupList" border style="width: 90%">
      <el-table-column label="编号" width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="brandName" label="产品名称"></el-table-column>
      <el-table-column prop="name" label="品牌名称"></el-table-column>
      <el-table-column prop="creatUser" label="操作人"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, makeupList)"
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
              <el-form-item label="产品名称">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="产品规格">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="新增品牌">
                <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" class="add">新增</el-button>
              </el-form-item>
              <el-form-item label="品牌">
                <el-select v-model="category" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                  <Pagination
                    :totalNum="totalNum2"
                    @change_Page="changePage2"
                    @change_Size="changeSize2"
                  ></Pagination>
                </el-select>
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
      category: "",
      grid: "",
      makeup_Search: "",
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
      },
      page1: 1,
      row1: 10,
      totalNum1: 1,
      page2: 1,
      page3: 1,
      row2: 10,
      totalNum2: 1,
      row3: 10,
      totalNum3: 1
    };
  },
  components: {
    Pagination
  },
  mounted() {
    this.getMakeupList(1, 10);
    this.getGridList(1, 10);
    this.getCategoryList(1, 10);
  },
  methods: {
    getGridList(page, row) {
      this.$axios
        .get("/management/admin/brand!comboGridlist.action", {
          params: {
            page: page,
            rows: row
          }
        })
        .then(res => {
          console.log(res, "");
          if (res.status == 200) {
            this.totalNum1 = res.data.total;
            this.gridList = res.data.rows;
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
    getCategoryList(page, row) {
      this.$axios
        .get("/management/admin/beauty-category!comboGridlist.action", {
          params: {
            page: page,
            rows: row
          }
        })
        .then(res => {
          console.log(res, "");
          if (res.status == 200) {
            this.totalNum2 = res.data.total;
            this.categoryList = res.data.rows;
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
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
      this.idx = row.id;
      this.dialogVisible= true;
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
    handleAdd() {},
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 搜索
    makeupSearch() {
      this.$axios
        .get("/management/admin/beauty-product!list.action", {
          params: {
            filter_EQS_categoryId: this.category,
            filter_EQL_brandId: this.grid,
            page: 1,
            rows: 10
          }
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res, "");
            this.makeupList = res.data.rows;
          }
        });
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
    }
  }
};
</script>

<style scoped>

</style>
