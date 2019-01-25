<template>
  <div>
    <el-table :data="labelCountList" border style="width: 90%" align="center">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="labelId" label="标签id" align="center"></el-table-column>
      <el-table-column prop="labelName" label="标签名称" align="center"></el-table-column>
      <el-table-column prop="creatTime" label="时间" align="center" width="100"></el-table-column>
      <el-table-column prop="articleNum" label="文章数量" align="center"></el-table-column>
      <el-table-column prop="readNum" label="阅读次数" align="center"></el-table-column>
      <el-table-column prop="enshrine" label="收藏量" align="center"></el-table-column>
      <el-table-column prop="likeNum" label="点赞量" align="center"></el-table-column>
      <el-table-column prop="commentNum" label="评论数" align="center"></el-table-column>
      <el-table-column prop="shareNum" label="分享次数 " align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleClick(scope.row)"
            v-has
          >查看历史数据</el-button>
          <el-dialog title="收货地址" :visible.sync="TableVisible">
            <el-table :data="detailList">
              <el-table-column property="date" label="时间" ></el-table-column>
              <el-table-column property="name" label="编号" ></el-table-column>
              <el-table-column property="address" label="标签名称"></el-table-column>
              <el-table-column property="address" label="文章量"></el-table-column>
              <el-table-column property="address" label="阅读次数"></el-table-column>
              <el-table-column property="address" label="收藏量"></el-table-column>
              <el-table-column property="address" label="点赞量"></el-table-column>
              <el-table-column property="address" label="评论数"></el-table-column>
              <el-table-column property="address" label="分享次数"></el-table-column>
            </el-table>
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
      :total="totalNum1">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCountList: [],
      detailList:[],
      TableVisible:false,
      currentPage1:1,
      page1: 1,
      page2: 1,
      row1: 10,
      row2: 10,
      totalNum1: 1,
      totalNum2: 1
    };
  },
  mounted() {
    this.getlabelCountList(1, 10);
  },
  methods: {
    getlabelCountList(page1, row1) {
      this.$axios
        .get("/management/admin/label-count-all!list.action", {
          params: { page:page1, row:row1 }
        })
        .then(res => {
          if (res.status == 200) {
            this.labelCountList = res.data.rows;
            this.totalNum1 = res.data.total;
            console.log(this.labelCountList);
          }
        });
    },
    //分页
    handleClick(row) {
      console.log(row);
    },
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