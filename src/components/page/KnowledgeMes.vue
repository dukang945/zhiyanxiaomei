<template>
  <div>
    <el-table :data="labelCountList" border style="width: 100%" align="center">
      <el-table-column prop="number1" label="一周内有7天使用的人数 "></el-table-column>
      <el-table-column prop="number2" label="一周内有6天使用的人数 " align="center"></el-table-column>
      <el-table-column prop="number3" label="一周内有5天使用的人数 " align="center"></el-table-column>
      <el-table-column prop="number4" label="一周内有4天使用的人数 " align="center"></el-table-column>
      <el-table-column prop="number5" label="一周内有3天使用的人数 " align="center"></el-table-column>
      <el-table-column prop="number6" label="一周内有2天使用的人数 " align="center"></el-table-column>
      <el-table-column prop="number7" label="一周内有1天使用的人数 " align="center"></el-table-column>
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
      detailList: [],
      TableVisible: false,
      dateVal: "",
      idx: -1,
      currentPage1: 1,
      page1: 1,
      row1: 10,
      totalNum1: 1,
    };
  },
  mounted() {
    this.getlabelCountList(1, 10);
  },
  methods: {
    getlabelCountList(page1, row1) {
      this.$axios
        .get("/management/admin/knowledge-mes!list.action", {
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