<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true">新增</el-button>
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
    <el-table
      :data="vipList"
      border
      style="width: 90%"
      current-row-key
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>

      <el-table-column label="手机号">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">{{ scope.row.sex == 0? '女' : '男'}}</template>
      </el-table-column>
      <el-table-column label="化妆水平">
        <template slot-scope="scope">{{ scope.row.level }}</template>
      </el-table-column>
      <el-table-column label="用户生日">
        <template slot-scope="scope">{{ scope.row.birthday }}</template>
      </el-table-column>
      <el-table-column label="第三方token">
        <template slot-scope="scope">{{ scope.row.token }}</template>
      </el-table-column>
      <el-table-column label="注册时间">
        <template slot-scope="scope">{{ scope.row.createTime | formatTime('YMDHMS') }}</template>
      </el-table-column>
      <el-table-column label="最后登录时间">
        <template slot-scope="scope">{{ scope.row.loginTime | formatTime('YMDHMS')}}</template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="reset(scope.$index, scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="vipList.length"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData3: [
        {
          name: "杜康",
          tel: "13164151625",
          gender: "男",
          化妆水平: "1",
          pic: ""
        },
        {
          name: "化妆",
          type: "妆容教程",
          isOnline: "true",
          link: "2",
          url: ""
        }
      ],
      vipList: [],
      isOnline: true,
      multipleSelection: [],
      del_list: [],
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
      }
    };
  },
  mounted() {
    this.getVipList();
  },
  methods: {
    getVipList() {
      this.$axios
        .post("api/management/admin/beauty-user!list.action")
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.vipList = res.data.rows;
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
          .get("api/management/admin/beauty-user!resetPassword.action", {
            params: {
              id: row.id
            }
          })
          .then(res => {
            if (res.status == 200) {
              this.$message.success('重置成功')
            }
          });
      });
    },
    online(index, rows) {
      rows.isOnline = !rows.isOnline;
      console.log(rows.isOnline);
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
.handle-box {
  margin: 20px;
}
.el-table {
  margin-left: 20px;
}
.el-switch {
  margin-left: 10px;
}
</style>