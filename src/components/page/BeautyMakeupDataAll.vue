<template>
  <div>
    <el-table :data="labelCountList" border style="width: 100%" align="center">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="docId" label="文章id" align="center"></el-table-column>
      <el-table-column prop="docName" label="文章名称" align="center"></el-table-column>
      <el-table-column prop="creatTime" label="时间" align="center" width="100"></el-table-column>
      <el-table-column prop="readNum" label="阅读次数" align="center"></el-table-column>
      <el-table-column prop="userReadNum" label="评论次数" align="center"></el-table-column>
      <el-table-column prop="userShareNum" label="分享次数" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleClick(scope.row)"
            v-has
          >查看历史数据</el-button>
          <el-dialog title="历史数据" :visible.sync="TableVisible" width="80%">
            <div class="search">
              <el-date-picker
                v-model="dateVal"
                value-format="yyyy-MM-dd"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1"
              ></el-date-picker>
              <el-button type="primary" icon="el-icon-search" @click="daySearch(page2,row2)">搜索</el-button>
            </div>
            <el-table :data="detailList" border>
              <el-table-column prop="id" label="编号"></el-table-column>
              <el-table-column prop="docId" label="文章id" align="center"></el-table-column>
              <el-table-column prop="docName" label="文章名称" align="center"></el-table-column>
              <el-table-column prop="creatTime" label="时间" align="center" width="100"></el-table-column>
              <el-table-column prop="readNum" label="阅读次数" align="center"></el-table-column>
              <el-table-column prop="userReadNum" label="评论次数" align="center"></el-table-column>
              <el-table-column prop="userShareNum" label="分享次数" align="center"></el-table-column>
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
      page2: 1,
      row1: 10,
      row2: 10,
      totalNum1: 1,
      totalNum2: 1,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.getlabelCountList(1, 10);
  },
  methods: {
    getlabelCountList(page1, row1) {
      this.$axios
        .get("/management/admin/beauty-makeup-data-all!list.action", {
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

    handleClick(row) {
      this.TableVisible = true;
      this.idx = row.docId;
      this.$axios
        .get(
          `/management/admin/beauty-makeup-data!list.action?docId=${
            this.idx
          }`
        )
        .then(res => {
          if (res.status == 200) {
            console.log(res)
            this.detailList = res.data.rows;
            this.totalNum2 = res.data.total;
          }
        });
    },
    //搜索
    daySearch(page, row) {
      this.$axios
        .post(
          "/management/admin/beauty-makeup-data!list.action",
          this.$qs.stringify({
            docId: this.idx,
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
</style>