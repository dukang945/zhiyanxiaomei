<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增产品牌</el-button>
      <el-dialog title="编辑" :visible.sync="AddVisible" width="80%"></el-dialog>
    </div>
    <el-table :data="labelCountList" border align="center">
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="labelName" label="标签名称" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
            v-has
          >编辑</el-button>
          <el-dialog title="编辑" :visible.sync="TableVisible" width="80%">
           
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
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
      labelList: [],
      TableVisible: false,
      AddVisible: false,
      dateVal: "",
      idx: -1,
      currentPage1: 1,
      page1: 1,
      page2: 1,
      row1: 10,
      row2: 10,
      totalNum1: 1,
      totalNum2: 1,
      formEdit: {}
    };
  },
  mounted() {
    this.getlabelCountList(1, 10);
  },
  methods: {
    getFeaturesList(q) {
      this.$axios
        .post(
          "/management/admin/label!featuresList.action",
          this.$qs.stringify({ q })
        )
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.labelList = res.data.rows;
          }
        });
    },
    getlabelCountList(page1, row1) {
      this.$axios.get("/management/admin/eyes!list.action").then(res => {
        if (res.status == 200) {
          console.log(res);
          this.labelCountList = res.data.rows;
          this.totalNum1 = res.data.total;
        }
      });
    },
    //编辑
    handleEdit(row) {
      this.TableVisible = true;
      this.idx = row.id;
      this.$axios
        .get(`/management/admin/label!getTreeGrid.action?id=815`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.formEdit = res.data
          }
        });
    },
    saveEdit() {},
    //搜索
    daySearch(page, row) {
      this.$axios
        .post(
          "/management/admin/label-count-day!list.action",
          this.$qs.stringify({
            labelId: this.idx,
            time: this.dateVal,
            page: page,
            rows: row
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.detailList = res.data.rows;
          }
        });
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
.optionHead,
.productOptionHead {
  padding: 0 5px;
  box-sizing: border-box;
  display: flex;
  align-content: space-between;
}

.optionHead span {
  flex: 45%;
  border-bottom: 1px dashed #ccc;
  text-align: center;
  line-height: 30px;
}

.optionHead .number {
  flex: 10%;
}
.optionItem {
  display: inline-block;
  width: 45%;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.optionItem.itemNumber {
  width: 10%;
}
</style>