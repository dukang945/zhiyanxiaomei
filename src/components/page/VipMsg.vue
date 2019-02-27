<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="名称">
            <el-input v-model="formLabelAdd.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formLabelAdd.link"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAdd.type"></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="化妆水平">
            <el-select v-model="value" placeholder="请选择">
              <el-option value="小白, 入门学习中">小白, 入门学习中</el-option>
              <el-option value="入门, 进阶学习中">入门, 进阶学习中</el-option>
              <el-option value="大神, 猎奇新妆容">大神, 猎奇新妆容</el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="vipList" border style="width: 100%" current-row-key v-loading="loading">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>

      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">{{ scope.row.sex == 0? '女' : '男'}}</template>
      </el-table-column>
      <el-table-column label="化妆水平" align="center">
        <template slot-scope="scope">{{ scope.row.level }}</template>
      </el-table-column>
      <el-table-column label="用户生日" align="center">
        <template slot-scope="scope">{{ scope.row.birthday }}</template>
      </el-table-column>
      <el-table-column label="第三方token" align="center">
        <template slot-scope="scope">{{ scope.row.token }}</template>
      </el-table-column>
      <el-table-column label="注册时间" width='200' align="center">
        <template slot-scope="scope">{{ scope.row.createTime | formatTime('YMDHMS') }}</template>
      </el-table-column>
      <el-table-column label="最后登录时间" width='200' align="center">
        <template slot-scope="scope">{{ scope.row.loginTime | formatTime('YMDHMS')}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="reset(scope.$index, scope.row)" size="small">重置密码</el-button>
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
      vipList: [],
      multipleSelection: [],
      del_list: [],
      loading: true,
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      radio: "1",
      idx: -1,
      currentPage4: 4,
      value1: "",
      value: "",
      formLabelAlign: {
        date: "",
        name: ""
      },
      formLabelAdd: {
        type: "",
        name: "",
        isOnline: true,
        link: "",
        url: ""
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
    this.getVipList(1,10);
  },
  methods: {
    getVipList(page,row) {
      this.$axios
        .get("/management/admin/beauty-user!list.action",{
					params: {
						page: page,
						rows: row
					}
				})
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.totalNum = res.data.total
            this.vipList = res.data.rows;
            this.loading =false
          }
        });
    },
    //重置密码
    reset(index, row) {
      // console.log(index, row) console.log(rows[index].id)
      this.$confirm("是否重置密码为888888", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .get("/management/admin/beauty-user!resetPassword.action", {
            params: {
              id: row.id
            }
          })
          .then(res => {
            if (res.status == 200) {
              this.$message.success("重置成功");
            }
          });
      });
    },
    // 新增
    handleAdd() {
      this.tableData3.push(this.formLabelAdd);
      this.AddVisible = false;
      this.$message.success(`添加成功`);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 分页
   changePage(val) {
				this.page = val;
				this.getVipList(val, this.row)
			},
			changeSize(val) {
				this.row = val;
				this.getVipList(this.page, val)
			},
  }
};
</script>

<style scoped>
.el-table {
  margin-left: 20px;
}
.el-switch {
  margin-left: 10px;
}
</style>