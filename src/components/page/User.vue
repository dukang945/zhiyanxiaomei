<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" size="small">新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAdd"
          :rules="rules"
          ref="formLabelAdd"
        >
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="formLabelAdd.name"></el-input>
          </el-form-item>
          <el-form-item label="英文名称">
            <el-input v-model="formLabelAdd.enname"></el-input>
          </el-form-item>
          <el-form-item label="上级资源" prop="selectedList">
            <el-cascader
              :options="treeList"
              change-on-select
              :show-all-levels="false"
              expand-trigger="hover"
              :props="props"
              v-model="formLabelAdd.selectedList"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="链  接">
            <el-input v-model="formLabelAdd.link"></el-input>
          </el-form-item>
          <el-form-item label="图  标">
            <el-input v-model="formLabelAdd.icon"></el-input>
          </el-form-item>
          <el-form-item label="排  序">
            <el-input v-model="formLabelAdd.orderid"></el-input>
          </el-form-item>
          <el-form-item label="备  注">
            <el-input type="textarea" v-model="formLabelAdd.memo"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formLabelAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="userList" border style="width: 90%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column label="地区"></el-table-column>
      <el-table-column label="排序号"></el-table-column>
      <el-table-column label="所属角色"></el-table-column>
      <el-table-column label="移动电话"></el-table-column>
      <el-table-column label="部门规模"></el-table-column>
      <el-table-column label="邮箱"></el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, menuList)"
            type="danger"
            size="small"
            circle
            class="el-icon-delete"
          ></el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="small"
            type="warning"
            icon="el-icon-refresh"
            circle
            @click="handleReset(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="small"
            type="success"
            icon="el-icon-check"
            circle
            v-if="scope.row.enable==0"
            @click="handleRefresh(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-close"
            circle
            v-else
            @click="handleRefresh(scope.$index, scope.row)"
          ></el-button>
          <el-dialog
            title="编辑"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-form
              :label-position="labelPosition"
              label-width="80px"
              :model="formLabelAlign"
              :rules="rules"
              ref="formLabelAlign"
            >
              <el-form-item label="资源名称" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="英文名称">
                <el-input v-model="formLabelAlign.enname"></el-input>
              </el-form-item>
              <el-form-item label="上级资源">
                <el-cascader
                  :options="treeList"
                  change-on-select
                  :show-all-levels="false"
                  expand-trigger="hover"
                  :props="props"
                  v-model="formLabelAlign.selectedList"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="链  接">
                <el-input v-model="formLabelAlign.link"></el-input>
              </el-form-item>
              <el-form-item label="图  标">
                <el-input v-model="formLabelAlign.icon"></el-input>
              </el-form-item>
              <el-form-item label="排  序">
                <el-input v-model="formLabelAlign.orderid"></el-input>
              </el-form-item>
              <el-form-item label="备  注">
                <el-input type="textarea" v-model="formLabelAlign.memo"></el-input>
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
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        selectedList: [
          {
            type: "array",
            required: true,
            message: "请选择上级目录",
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
              console.log(res)
            this.totalNum = res.data.total;
            this.userList = res.data.rows;
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
    getTreeList() {
      this.$axios.get("management/admin/role!getAllTrees.action").then(res => {
        if (res.status == 200) {
          this.treeList = res.data;
        }
      });
    },
    // 编辑
    handleEdit(index, row) {
      var _this = this;
      this.idx = row.id;
      this.$axios
        .get(`/management/admin/resource!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            this.formLabelAlign = res.data;
            const selectedList = [];
            function temp(id) {
              _this.$axios
                .get(`/management/admin/resource!input.action?id=${id}`)
                .then(res => {
                  if (res.data.parentId & (res.data.id != res.data.parentId)) {
                    selectedList.unshift(res.data.parentId);
                    temp(res.data.parentId);
                    _this.formLabelAlign.selectedList = selectedList;
                    // _this.dialogVisible = true;
                  } else {
                    _this.dialogVisible = true;
                  }
                });
            }
            temp(res.data.id);
          }
        });
    },
    //保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              `management/admin/resource!save.action?id=${this.idx}`,
              this.$qs.stringify({
                name: this.formLabelAlign.name,
                enname: this.formLabelAlign.enname,
                parentId: this.formLabelAlign.selectedList[
                  this.formLabelAlign.selectedList.length - 1
                ],
                link: this.formLabelAlign.link,
                icon: this.formLabelAlign.icon,
                orderid: this.formLabelAlign.orderid,
                memo: this.formLabelAlign.memo
              })
            )
            .then(res => {
              if (res.status == 200) {
                this.dialogVisible = false;
                this.$message.success(`修改成功`);
                this.getUserList();
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
      console.log(rows[index].id);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .get(`/management/admin/resource!delete.action?id=${rows[index].id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getUserList();
            }
          });
      });
    },
    //密码初始化
    handleReset(index, rows){
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
      console.log(rows,rows.enable);
      this.$axios
        .get(
          `management/admin/user!updateUser.action?id=${rows.id}&enable=${
            rows.enable == 0?1:0
          }`
        )
        .then(res => {
          if (res.status == 200) {
            this.$message.success(rows.enable ==0? "已禁用" : "已启用");
            console.log(res,rows.enable)
            this.getUserList();
          }
        });
    },
    // 新增
    handleAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/management/admin/resource!save.action",
              this.$qs.stringify({
                name: this.formLabelAdd.name,
                enname: this.formLabelAdd.enname,
                parentId: this.formLabelAdd.selectedList[
                  this.formLabelAdd.selectedList.length - 1
                ],
                link: this.formLabelAdd.link,
                icon: this.formLabelAdd.icon,
                orderid: this.formLabelAdd.orderid,
                memo: this.formLabelAdd.memo
              })
            )
            .then(res => {
              if (res.status == 200) {
                this.AddVisible = false;
                this.$message.success("添加成功");
                this.getMenuList();
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
    issueSearch() {
      this.$axios
        .post(
          "/management/admin/skin-problems!list.action",
          this.$qs.stringify({
            filter_LIKES_question: this.issue_Search,
            page: 1,
            rows: 10
          })
        )
        .then(res => {
          if (res.status == 200) {
            console.log(res, "");
            this.issueList = res.data.rows;
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
.handle-box {
  margin-bottom: 20px;
}
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