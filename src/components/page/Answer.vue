<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增</el-button>
      <el-button type="primary" @click="refresh" v-has size="small">刷新缓存</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="80%" @opened="addOPen" :close-on-click-modal='false'>
        <el-form :model="formAdd">
          <el-form-item label="答案文本" label-width="120px">
            <el-input v-model="formAdd.answerBook"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="labelCountList" border style="width: 100%" align="center">
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="answerBook" label="答案文本" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)" v-has>编辑</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, labelCountList)"
            type="danger"
            size="small"
            v-del
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="EditVisible" width="80%" @opened="addOPen" :close-on-click-modal='false'>
        <el-form :model="formEdit">
          <el-form-item label="答案文本" label-width="120px">
            <el-input v-model="formEdit.answerBook"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EditVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit('formEdit')">确 定</el-button>
        </span>
      </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-sizes="[10, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum1"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCountList: [],
      formAdd: {},
      formEdit: {},
      AddVisible: false,
      EditVisible: false,
      idx: -1,
      currentPage1: 1,
      page1: 1,
      row1: 10,
      totalNum1: 1
    };
  },
  mounted() {
    this.getlabelCountList(1, 10);
  },
  methods: {
    getlabelCountList(page1, row1) {
      this.$axios
        .get("/management/admin/answers-book!list.action", {
          params: { page: page1, row: row1 }
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.labelCountList = res.data.rows;
            this.totalNum1 = res.data.total;
          }
        });
    },
    //新增dialog打开回调
    addOPen() {
      this.formAdd = {};
    },
    //新增
    handleAdd() {
      this.$axios
        .post(
          "/management/admin/answers-book!save.action",
          this.$qs.stringify(this.formAdd)
        )
        .then(res => {
          if (res.status == 200) {
            this.AddVisible = false;
            this.$message.success(`添加成功`);
            this.formAdd = {};
            this.getlabelCountList();
          }
        });
    },
    //编辑
    handleEdit(row){
        this.formEdit = row
        this.EditVisible =true
        this.idx = row.id;
    },
    //保存编辑
    saveEdit(){
        this.$axios.post(`/management/admin/answers-book!save.action?id=${this.idx}`,this.$qs.stringify(
           { answerBook:this.formEdit.answerBook}
        )).then(res=>{
            if (res.status == 200) {
              this.EditVisible = false;
              this.$message.success(`修改成功`);
              this.formEdit = {};
              this.getlabelCountList();
            }
        })
    },
    //删除
    deleteRow(index, rows) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .get(`/management/admin/answers-book!delete.action?id=${rows[index].id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getlabelCountList();
            }
          });
      });
    },
    //刷新缓存
    refresh(){
      this.$axios.get('/management/admin/answers-book!cache.action').then(res=>{
        if(res.status==200){
           this.$message.success("刷新成功");
        }
      })
    },
    //分页
    handleSizeChange(val) {
      this.row1 = val;
      this.getlabelCountList(this.page1, this.row1);
    },
    handleCurrentChange(val) {
      this.page1 = val;
      this.getlabelCountList(this.page1, this.row1);
    }
  }
};
</script>

<style scoped>
.search {
  margin-bottom: 10px;
}
</style>