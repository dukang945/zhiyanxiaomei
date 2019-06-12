<template>
  <div class="quickWorkContent">
    <el-button @click="refreshImg">刷新菜单</el-button>
    <el-row type="flex" justify="space-around">
      <el-col :span="4">
        <div class="quickItem" @click="toRouter('teach')">
          <i class="iconfont el-icon-my-jiaocheng"></i>
          <span>美妆教程</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="quickItem" @click="toRouter('evaluation')">
          <i class="iconfont el-icon-my-pingcetiku"></i>
          <span>美妆评测</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="quickItem" @click="toRouter('beautyknowledge')">
          <i class="iconfont el-icon-my-zhishi"></i>
          <span>美妆知识</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="quickItem" @click="toRouter('constellationDetail')">
          <i class="iconfont el-icon-my-xingzuo-copy"></i>
          <span>星座运势</span>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="4">
        <div class="quickItem" @click="toRouter('tag')">
          <i class="iconfont el-icon-my-biaoqian"></i>
          <span>标签管理</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="quickItem" @click="toRouter('makeup')">
          <i class="iconfont el-icon-my-stack"></i>
          <span>产品</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="quickItem" @click="toRouter('color')">
          <i class="iconfont el-icon-my-kouhong"></i>
          <span>色号</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="quickItem" @click="toRouter('workspace')">
          <i class="iconfont el-icon-my-shuju"></i>
          <span>数据总览</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toRouter(str) {
      this.$router.push(`/${str}`);
    },
    refreshImg() {
      this.$message.warning("刷新中,请耐心等待2-3分钟!");
      this.$axios
        .get("/management/admin/beauty-details!dataConvert.action")
        .then(res => {
          if (res.status == 200) {
            this.$message.success("刷新完成");
          }
        });
    }
  }
};
</script>

<style scoped="scoped">
.quickItem {
  text-align: center;
  /* border: 1px solid #ccc; */
  border-radius: 10px;
  height: 200px;
  margin: 50px 0;
  background: linear-gradient(120deg, #fff, #5983e8);
  cursor: pointer;
  color: #fff;
  font-weight: 700;
  transition: all 1s;
}
.quickItem:hover {
  margin-top: 45px;
  box-shadow: 5px 5px 10px 5px #aaa;
}
.quickItem:hover i {
  font-size: 65px;
  line-height: 30px;
}
.quickItem span {
  text-align: center;
  line-height: 200px;
  font-size: 30px;
}
.quickItem i {
  font-size: 50px;
  margin-right: 20px;
  transition: all 1s;
}
.quickWorkContent {
  background-color: #cccccc14;
}
</style>
