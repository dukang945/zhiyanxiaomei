<template>
    <div>
        <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true">新增</el-button>
      <el-input v-model="issue_Search" placeholder="请输入搜索类容" style="width: 30%">
          <el-button slot="append" icon="el-icon-search" @click="issueSearch"></el-button>
      </el-input>
      <el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="问题">
            <el-input v-model="formLabelAdd.question"></el-input>
          </el-form-item>
          <el-form-item label="功效">
            <el-input v-model="formLabelAdd.effect"></el-input>
          </el-form-item>
          <el-form-item label="建议">
            <el-input v-model="formLabelAdd.suggest"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="issueList" border style="width: 90%">
      <el-table-column label="id" width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="question" label="问题"></el-table-column>

      <el-table-column prop="effect" label="功效"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, issueList)"
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
          <el-dialog
            title="编辑"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="问题">
                <el-input v-model="formLabelAlign.question"></el-input>
              </el-form-item>
              <el-form-item label="功效">
                <el-input v-model="formLabelAlign.effect"></el-input>
              </el-form-item>
              <el-form-item label="建议">
                <el-input v-model="formLabelAlign.suggest"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
      <Pagination :totalNum='totalNum' @change_Page='changePage' @change_Size='changeSize'></Pagination>
    </div>
</template>

<script>
import Pagination from '../module/pagination.vue'
   export default {
  data() {
    return {
      issueList: [],
      issue_Search:'',
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      currentPage4: 1,
      formLabelAlign: {
        date: "",
        name: ""
      },
      formLabelAdd: {
        question: "",
        suggest: "",
        effect:''
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
    this.getIssueList(1,10);
  },
  methods: {
    getIssueList(page,row) {
      this.$axios
        .get("/management/admin/skin-problems!list.action",{
					params: {
						page: page,
						rows: row
					}
				})
        .then(res => {
          console.log(res, "");
          if (res.status == 200) {
            this.totalNum = res.data.total
            this.issueList = res.data.rows;
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
    // 编辑
    handleEdit(index, row) {
      this.$axios.get(`/management/admin/skin-problems!input.action?id=${row.id}`).then(
        res => {
          if(res.status == 200) {
           this.formLabelAlign = res.data
          }
        }
      )
      this.dialogVisible = true;
    },
    //保存编辑
    saveEdit() {
      this.$set(this.tableData3, this.idx, this.formLabelAlign);
      this.dialogVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
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
          .get(`/management/admin/skin-problems!delete.action?id=${rows[index].id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getIssueList();
            }
          });
      });
    },
    // 新增
    handleAdd() {
      this.$axios.post('/management/admin/skin-problems!save.action',this.$qs.stringify({
        question:this.formLabelAdd.question,
        effect:this.formLabelAdd.effect,
        suggest:this.formLabelAdd.suggest
      })).then(
        res => {
          if(res.status == 200) {
            this.AddVisible = false;
            this.$message.success('添加成功')
            this.getIssueList();
          }
        }
      )
    },
    handleClose(done) {
      done()
    },
    // 搜索
    issueSearch(){
        this.$axios.post('/management/admin/skin-problems!list.action',this.$qs.stringify({
            filter_LIKES_question:this.issue_Search,
            page:1,
            rows:15
        })).then(
            res => {
                if(res.status == 200) {
                    console.log(res, '')
                    this.issueList = res.data.rows
                }
            }
        )
    },
    changePage(val) {
				this.page = val;
				this.getIssueList(val, this.row)
			},
			changeSize(val) {
				this.row = val;
				this.getIssueList(this.page, val)
			},
  }
};
</script>

<style scoped>

</style>