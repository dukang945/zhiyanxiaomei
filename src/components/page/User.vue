<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" size="small" v-has>新增</el-button>
      <el-input v-model="user_Search" placeholder="请输入搜索类容" style="width: 30%">
        <el-button slot="append" icon="el-icon-search" @click="userSearch"></el-button>
      </el-input>
      <el-dialog title="新增" :visible.sync="AddVisible" :before-close="handleClose">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAdd"
          :rules="rules"
          ref="formLabelAdd"
        >
          <el-form-item label="登录账号" prop="loginName">
            <el-input v-model="formLabelAdd.loginName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formLabelAdd.password"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleIds">
            <el-select v-model="formLabelAdd.roleIds" multiple placeholder="请选择">
              <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.text"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级">
            <el-input v-model="formLabelAdd.parentId"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="userName">
            <el-input v-model="formLabelAdd.userName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="formLabelAdd.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select v-model="formLabelAdd.deptId" placeholder="请选择活动区域"></el-select>
          </el-form-item>
          <el-form-item label="是否为部门负责人">
            <el-radio-group v-model="formLabelAdd.isDept">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序号">
            <el-input v-model="formLabelAdd.orderId"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="formLabelAdd.post"></el-input>
          </el-form-item>
          <el-form-item label="移动电话">
            <el-input v-model="formLabelAdd.mobile"></el-input>
          </el-form-item>
          <el-form-item label="工作电话">
            <el-input v-model="formLabelAdd.workPhone"></el-input>
          </el-form-item>
          <el-form-item label="公司邮箱">
            <el-input v-model="formLabelAdd.email"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="formLabelAdd.qq"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formLabelAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="userList" border style="width: 90%">
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
      <el-table-column label="地区" align="center"></el-table-column>
      <el-table-column label="排序号" align="center"></el-table-column>
      <el-table-column label="所属角色" align="center"></el-table-column>
      <el-table-column label="移动电话" align="center"></el-table-column>
      <el-table-column label="部门规模" align="center"></el-table-column>
      <el-table-column label="邮箱" align="center"></el-table-column>
      <el-table-column label="操作" width="440" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, userList)"
            type="danger"
            size="small"
            class="el-icon-delete"
            v-del
          >删除</el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            v-has
          >编辑</el-button>
          <el-button
            size="small"
            type="warning"
            icon="el-icon-refresh"
            @click="handleReset(scope.$index, scope.row)"
          >重置密码</el-button>
          <el-button
            size="small"
            type="success"
            icon="el-icon-check"
            v-if="scope.row.enable==0"
            v-check
            @click="handleRefresh(scope.$index, scope.row)"
          >启用</el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-close"
            v-else
            @click="handleRefresh(scope.$index, scope.row)"
          >禁用</el-button>
          <el-dialog
            title="编辑"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            v-has
          >
            <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
          :rules="rules"
          ref="formLabelAlign"
        >
          <el-form-item label="登录账号" prop="loginName">
            <el-input v-model="formLabelAlign.loginName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleIds">
            <el-select v-model="formLabelAlign.roleIds" multiple placeholder="请选择">
              <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.text"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级">
            <el-input v-model="formLabelAlign.parentId"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="userName">
            <el-input v-model="formLabelAlign.userName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="formLabelAlign.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select v-model="formLabelAlign.deptId" placeholder="请选择活动区域"></el-select>
          </el-form-item>
          <el-form-item label="是否为部门负责人">
            <el-radio-group v-model="formLabelAlign.isDept">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序号">
            <el-input v-model="formLabelAlign.orderId"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="formLabelAlign.post"></el-input>
          </el-form-item>
          <el-form-item label="移动电话">
            <el-input v-model="formLabelAlign.mobile"></el-input>
          </el-form-item>
          <el-form-item label="工作电话">
            <el-input v-model="formLabelAlign.workPhone"></el-input>
          </el-form-item>
          <el-form-item label="公司邮箱">
            <el-input v-model="formLabelAlign.email"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="formLabelAlign.qq"></el-input>
          </el-form-item>
        </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEdit('formLabelAlign')">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :totalNum="totalNum" @change_Page="changePage" @change_Size="changeSize"></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/module/Pagination.vue";
import SelectTree from "@/components/module/select-tree.vue";
export default {
  data() {
    return {
      userList: [],
      treeList: [],
      selectOptions: [],
      roleOptions:[],
      user_Search:'',
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      rules: {
        loginName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入名称", trigger: "blur" }],
        userName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        roleIds: [
          {
            type: "array",
            required: true,
            message: "请选择角色",
            trigger: "change"
          }
        ]
      },
      formLabelAlign: {},
      formLabelAdd: {},
      props: {
        value: "id",
        children: "children",
        label: "text"
      },
      page: 1,
      row: 10,
      totalNum: 1
    };
  },
  components: {
    Pagination,
    SelectTree
  },
  mounted() {
    this.getUserList(1, 10);
    this.getTreeList();
    this.getRolesList()
  },
  methods: {
    getUserList(page, row) {
      this.$axios
        .get("/management/admin/user!list.action?deptId=1", {
          params: {
            page: page,
            rows: row
          }
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.totalNum = res.data.total;
            this.userList = res.data.rows;
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
    getTreeList() {
      this.$axios.get("/management/admin/role!getAllTrees.action").then(res => {
        if (res.status == 200) {
          this.treeList = res.data;
        }
      });
    },
    getRolesList(){
      this.$axios.get('/management/admin/role!getAllRoles.action').then(res => {
        if(res.status ==200){
          this.roleOptions = res.data
        }
      })
    },
    // 编辑
    handleEdit(index, row) {
      this.idx = row.id;
      this.dialogVisible = true
      this.$axios
        .get(`/management/admin/user!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            
         var roleIds =  res.data.roleIds.map(item=>{
            return Number(item)
          })
            this.formLabelAlign = res.data;
            this.formLabelAlign.roleIds =roleIds
          }
        });
    },
    //保存编辑
    saveEdit(formName) {
      let roleIds =''
      if(this.formLabelAlign.roleIds.length){
        console.log(this.formLabelAlign.roleIds)
        for (let i = 0; i < this.formLabelAlign.roleIds.length; i++) {
      roleIds += '&roleIds=' + this.formLabelAlign.roleIds[i]; 
      console.log(roleIds)
      }
      }
       let params = this.$qs.stringify({
                loginName: this.formLabelAlign.loginName,
                password: this.formLabelAlign.password,
                orderId: this.formLabelAlign.orderId,
                parentId: this.formLabelAlign.parentId,
                userName: this.formLabelAlign.userName,
                sex: this.formLabelAlign.sex,
                deptId: this.formLabelAlign.deptId,
                isDept: this.formLabelAlign.isDept,
                post: this.formLabelAlign.post,
                mobile: this.formLabelAlign.mobile,
                workPhone: this.formLabelAlign.workPhone,
                email: this.formLabelAlign.email,
                qq: this.formLabelAlign.qq,
              }) + roleIds
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              `/management/admin/user!save.action?id=${this.idx}`,params
            )
            .then(res => {
              if (res.status == 200) {
                this.dialogVisible = false;
                this.$message.success(`修改成功`);
                this.getUserList();
                this.formLabelAlign = {};
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除
    deleteRow(index, rows) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .get(`/management/admin/user!delete.action?id=${rows[index].id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getUserList();
            }
          });
      });
    },
    //密码初始化
    handleReset(index, rows) {
      this.$confirm("您确认要初始化密码吗(888888)?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .get(`/management/admin/user!initPassword.action?id=${rows.id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("重置成功");
              this.getUserList();
            }
          });
      });
    },
    //停用启用按钮
    handleRefresh(index, rows) {
      console.log(rows, rows.enable);
      this.$axios
        .get(
          `/management/admin/user!updateUser.action?id=${rows.id}&enable=${
            rows.enable == 0 ? 1 : 0
          }`
        )
        .then(res => {
          if (res.status == 200) {
            this.$message.success(rows.enable == 0 ? "已禁用" : "已启用");
            console.log(res, rows.enable);
            this.getUserList();
          }
        });
    },
    // 新增
    handleAdd(formName) {
      let roleIds =''
      if(this.formLabelAdd.roleIds.length){
        console.log(this.formLabelAdd.roleIds)
        for (let i = 0; i < this.formLabelAdd.roleIds.length; i++) {
      roleIds += '&roleIds=' + this.formLabelAdd.roleIds[i]; 
      console.log(roleIds)
      }
      }
       let params = this.$qs.stringify({
                loginName: this.formLabelAdd.loginName,
                password: this.formLabelAdd.password,
                orderId: this.formLabelAdd.orderId,
                parentId: this.formLabelAdd.parentId,
                userName: this.formLabelAdd.userName,
                sex: this.formLabelAdd.sex,
                deptId: this.formLabelAdd.deptId,
                isDept: this.formLabelAdd.isDept,
                post: this.formLabelAdd.post,
                mobile: this.formLabelAdd.mobile,
                workPhone: this.formLabelAdd.workPhone,
                email: this.formLabelAdd.email,
                qq: this.formLabelAdd.qq,
              }) + roleIds
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/management/admin/user!save.action",params  
            )
            .then(res => {
              if (res.status == 200) {
                this.AddVisible = false;
                this.$message.success("添加成功");
                this.getUserList();
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      done();
    },
    // 搜索
    userSearch() {
      this.$axios
        .post(
          "/management/admin/user!list.action",
          this.$qs.stringify({
            filter_LIKES_userName_OR_mobile: this.user_Search,
            page: 1,
            rows: 10
          })
        )
        .then(res => {
          if (res.status == 200) {
            // console.log(res, "");
            this.userList = res.data.rows;
          }
        });
    },
    changePage(val) {
      this.page = val;
      this.getMenuList(val, this.row);
    },
    changeSize(val) {
      this.row = val;
      this.getMenuList(this.page, val);
    }
  }
};
</script>

<style>
.el-tree {
  max-height: 500px;
  overflow-y: scroll;
}
.objectTree {
  position: absolute;
  overflow: auto;
  z-index: 100;
  width: 100%;
  height: 300px;
}
</style>