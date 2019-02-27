<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" size="small" v-has>新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" @click="handleClear">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAdd"
          :rules="rules"
          ref="formLabelAdd"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="formLabelAdd.name"></el-input>
          </el-form-item>
          <el-form-item label="英文名称" prop="enname">
            <el-input v-model="formLabelAdd.enname"></el-input>
          </el-form-item>
          <el-form-item label="按钮权限" prop="controlbtn">
            <el-input v-model="formLabelAdd.controlbtn"></el-input>
            <span>(按钮权限：1.可编辑查看 2.部分可编辑查看 3.仅具备查看)</span>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="formLabelAdd.memo"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formLabelAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="partList" border style="width: 100%">
      <el-table-column label="角色名称" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="memo" label="备注" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, partList)"
            type="danger"
            size="small"
            class="el-icon-delete"
            v-if="scope.row.id!=1&scope.row.id!=2&scope.row.id!=3"
            v-del
          >删除</el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            v-if="scope.row.id!=1&scope.row.id!=2&scope.row.id!=3"
            v-has
          >编辑</el-button>
          
          <el-button
            size="small"
            type="success"
            icon="el-icon-share"
            @click="handleAllot(scope.$index, scope.row)"
          >权限分配</el-button>
          <el-dialog title="角色分配资源" :visible.sync="editVisible" width="30%">
             <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
          :rules="rules"
          ref="formLabelAdd"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="英文名称" prop="enname">
            <el-input v-model="formLabelAlign.enname"></el-input>
          </el-form-item>
          <el-form-item label="按钮权限" prop="controlbtn">
            <el-input v-model="formLabelAlign.controlbtn"></el-input>
            <span>(按钮权限：1.可编辑查看 2.部分可编辑查看 3.仅具备查看)</span>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="formLabelAlign.memo"></el-input>
          </el-form-item>
        </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleClear">取 消</el-button>
              <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog title="角色分配资源" :visible.sync="dialogVisible" width="30%">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-tree
                :data="partTree"
                :props="defaultProps"
                @check="getCheckedKeys"
                show-checkbox
                node-key="id"
                ref="tree"
                highlight-current
                default-expand-all
                :default-checked-keys="checkList"
              ></el-tree>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleClear">取 消</el-button>
              <el-button type="primary" @click="savePartEdit">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :totalNum='totalNum' @change_Page='changePage' @change_Size='changeSize'></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/module/Pagination.vue'
export default {
  data() {
    return {
      partList: [],
      partTree: [],
      checkList: [],
      dialogVisible: false,
      AddVisible: false,
      editVisible:false,
      labelPosition: "left",
      idx: -1,
      page: 1,
      row: 10,
      totalNum: 1,
      formLabelAlign: {
        date: "",
        name: ""
      },
      formLabelAdd: {
        date: "",
        name: ""
      },
      defaultProps: {
        children: "children",
        label: "text"
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        enname: [
          { required: true, message: "请输入英文名称", trigger: "blur" }
        ],
        controlbtn: [
          { required: true, message: "请输入权限按钮", trigger: "blur" }
        ]
      }
    };
  },
  components: {
			Pagination
		},
  mounted() {
    this.getPartList(1,10);
    this.getTreeList();
  },
  methods: {

    getPartList(page,row) {
      this.$axios.get("/management/admin/role!list.action",{
					params: {
						page: page,
						rows: row
					}
				}).then(res => {
        if (res.status == 200) {
          this.partList = res.data.rows;
          this.totalNum =res.data.total
        } else {
          this.$message.error("请求数据失败!");
        }
      });
    },
    getTreeList() {
      this.$axios.get("/management/admin/role!getAllTrees.action").then(res => {
        if (res.status == 200) {
          this.partTree = res.data;
        }
      });
    },
    // 编辑
    handleEdit(index, row) {
      this.idx = row.id;
      this.$axios.get(`/management/admin/role!input.action?id=${this.idx}`).then(res => {
        if(res.status == 200) {
          this.formLabelAlign =res.data
        }
      })
      this.editVisible = true;
    },
    //保存编辑
    saveEdit() {
        this.$axios
        .post(
          `/management/admin/role!save.action?id=${this.idx}`,
          this.$qs.stringify({
            name: this.formLabelAlign.name,
            enname: this.formLabelAlign.enname,
            controlbtn:this.formLabelAlign.controlbtn,
            memo:this.formLabelAlign.memo,
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.editVisible = false;
            this.$message.success(`修改成功`);
            this.getPartList();
          }
        });
    },
    //取消
    handleClear() {
      
      if(this.dialogVisible){
        this.$refs.tree.setCheckedKeys([]);
        this.checkList = [];
        this.dialogVisible = false;
      }
      if(this.editVisible){
        this.formLabelAlign={}
        this.editVisible = false;
      }
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
          .get(
            `/management/admin/role!delete.action?id=${rows[index].id}`
          )
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getPartList();
            }
          });
      });
    },
    // 新增
    handleAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/management/admin/role!save.action",
              this.$qs.stringify({
                name: this.formLabelAdd.name,
                enname: this.formLabelAdd.enname,
                controlbtn: this.formLabelAdd.controlbtn,
                memo: this.formLabelAdd.memo
              })
            )
            .then(res => {
              if (res.status == 200) {
                this.AddVisible = false;
                this.$message.success("添加成功");
                this.getPartList();
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //分配权限
    handleAllot(index, row) {
      const time = new Date().getTime();
      this.idx = row.id;
      this.$axios
        .get(
          `/management/admin/role!getResourceIds.action?id=${this.idx}&_=${time}`
        )
        .then(res => {
          if (res.status == 200) {
            console.log(res.data);
            this.checkList = res.data.split(",");
            this.dialogVisible = true;
          }
        });
    },
    //获取选中的节点
    getCheckedKeys(leafOnly, key) {
      this.checkList = key.checkedKeys;
    },
    // 确定分配
    savePartEdit() {
      console.log(this.checkList);
      this.$axios
        .post(
          "/management/admin/role!saveAuthorizate.action",
          this.$qs.stringify({
            id: this.idx,
            rids: this.checkList.join()
          })
        )
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.dialogVisible = false;
            this.$message.success(`修改成功`);
          }
        });
      this.checkList = [];
      this.$refs.tree.setCheckedKeys([]);
    },
     changePage(val) {
				this.page = val;
				this.getPartList(val, this.row)
			},
			changeSize(val) {
				this.row = val;
				this.getPartList(this.page, val)
			},
  }
};
</script>

<style scoped lang="scss">
</style>