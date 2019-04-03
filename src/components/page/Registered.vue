<template>
  <div>
    <el-table :data="registeredList" border align="center" stripe>
      <el-table-column prop="creatTime" label="时间" fixed width="120"></el-table-column>
      <el-table-column prop="id" label="编号" align="center" fixed></el-table-column>
      <el-table-column prop="registerNumWx" label="微信注册数" align="center" width="100"></el-table-column>
      <el-table-column prop="registerNumQq" label="QQ注册数" align="center" width="100"></el-table-column>
      <el-table-column prop="registerNumWb" label="微博注册数" align="center" width="100"></el-table-column>
      <el-table-column prop="registerNumPhone" label="手机注册数" align="center" width="100"></el-table-column>
      <el-table-column prop="registerNumWxAll" label="微信注册总数" align="center" width="110"></el-table-column>
      <el-table-column prop="registerNumQqAll" label="QQ注册总数" align="center" width="100"></el-table-column>
      <el-table-column prop="registerNumWbAll" label="微博注册总数" align="center" width="110"></el-table-column>
      <el-table-column prop="registerNumPhoneAll" label="手机注册总数" align="center" width="110"></el-table-column>
      <el-table-column prop="sexNumMan" label="男性用户数" align="center" width="100"></el-table-column>
      <el-table-column prop="sexNumWoman" label="女性用户数" align="center" width="100"></el-table-column>
      <el-table-column prop="age1" label="18岁以下" align="center" width="90"></el-table-column>
      <el-table-column prop="age2" label="18-22岁" align="center"></el-table-column>
      <el-table-column prop="age3" label="22-25岁" align="center"></el-table-column>
      <el-table-column prop="age4" label="25-30岁" align="center"></el-table-column>
      <el-table-column prop="age5" label="30-35岁" align="center"></el-table-column>
      <el-table-column prop="age6" label="35岁以上" align="center" width="90"></el-table-column>
      <el-table-column prop="makeUpNoob" label="化妆水平-新手" align="center" width="120"></el-table-column>
      <el-table-column prop="makeUpGeneral" label="化妆水平-一般" align="center" width="120"></el-table-column>
      <el-table-column prop="makeUpGod" label="化妆水平-大神" align="center" width="120"></el-table-column>
      <el-table-column prop="skinTextureType1" label="皮肤状态-混合型" align="center" width="130"></el-table-column>
      <el-table-column prop="skinTextureType2" label="皮肤状态-干性" align="center" width="125"></el-table-column>
      <el-table-column prop="skinTextureType3" label="皮肤状态-油性" align="center" width="125"></el-table-column>
      <el-table-column prop="skinTextureType4" label="皮肤状态-中性" align="center" width="125"></el-table-column>
      <el-table-column prop="skinTextureType5" label="皮肤状态-敏感肌" align="center" width="130"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registeredList: [],
      currentPage: 1,
      page: 1,
      row: 10,
      totalNum: 1
    };
  },
  mounted() {
    this.getRegisteredList();
  },
  methods: {
    getRegisteredList(page, row) {
      this.$axios
        .get("/management/admin/registered-user!list.action", {
          params: { page, rows:row }
        })
        .then(res => {
          if (res.status == 200) {
              console.log(res)
            this.registeredList = res.data.rows;
            this.totalNum = res.data.total;
          }
        });
    },
    handleSizeChange(val) {
      console.log(val)
      this.row = val;
      this.getRegisteredList(this.page, this.row);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getRegisteredList(this.page, this.row);
    }
  }
};
</script>

<style scoped>
</style>