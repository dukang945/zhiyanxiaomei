<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="80%" @opened="addOPen">
         <el-form :model="formAdd">
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formAdd.labels" placeholder="请选择标签" clearable> 
            <el-option-group label="鼻部">
                <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList1"
                :key="item.id"
              ></el-option>
              </el-option-group>
              <el-option-group label="脸部">
                <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList3"
                :key="item.id"
              ></el-option>
              </el-option-group>
              <el-option-group label="唇部">
                <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList4"
                :key="item.id"
              ></el-option>
              </el-option-group>
              <el-option-group label="眼部">
                <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList2"
                :key="item.id"
              ></el-option>
              </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" label-width="120px">
            <el-select v-model="formAdd.type" placeholder="请选择类型" clearable>
              <el-option :value="1" label="一个好看的点都没有"></el-option>
              <el-option :value="2" label="只有一个好看的点"></el-option>
              <el-option :value="3" label="两个及以上的好看的点"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="具体的夸奖语录" label-width="120px">
          <textarea id="noseDesc" rows="5" cols="80" v-model="formAdd.text"></textarea>
        </el-form-item>
      </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="labelCountList" border align="center">
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type==1">一个好看的点都没有</span>
          <span v-else-if="scope.row.type==2">只有一个好看的点</span>
          <span v-else-if="scope.row.type==3">两个及以上的好看的点</span>
        </template>
      </el-table-column>
      <el-table-column prop="labelName" label="标签名称" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
            v-has
          >编辑</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, labelCountList)"
            type="danger"
            size="small"
            class="el-icon-delete"
            v-del
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="TableVisible" width="80%">
      <el-form :model="formEdit">
        <el-form-item label="标签" label-width="120px">
          <el-select v-model="formEdit.labels" placeholder="请选择标签" clearable>
            <el-option-group label="鼻部">
                <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList1"
                :key="item.id"
              ></el-option>
              </el-option-group>
              <el-option-group label="脸部">
                <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList3"
                :key="item.id"
              ></el-option>
              </el-option-group>
              <el-option-group label="唇部">
                <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList4"
                :key="item.id"
              ></el-option>
              </el-option-group>
              <el-option-group label="眼部">
                <el-option
                :label="item.name"
                :value="item.id.toString()"
                v-for="item in labelList2"
                :key="item.id"
              ></el-option>
              </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" label-width="120px">
            <el-select v-model="formEdit.type" placeholder="请选择类型">
              <el-option :value="1" label="一个好看的点都没有"></el-option>
              <el-option :value="2" label="只有一个好看的点"></el-option>
              <el-option :value="3" label="两个及以上的好看的点"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="具体的夸奖语录" label-width="120px">
          <textarea id="noseDesc" rows="5" cols="80" v-model="formEdit.text"></textarea>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="TableVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit('formEdit')">确 定</el-button>
      </span>
    </el-dialog>
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
import CKEDITOR from "CKEDITOR";
export default {
  name: "editorAdd",
  data() {
    return {
      labelCountList: [],
      labelList1:[],
      labelList2:[],
      labelList3:[],
      labelList4:[],
      TableVisible: false,
      AddVisible: false,
      editor: false,
      editorAdd: false,
      loading: true,
      dateVal: "",
      eyesDescribe: "",
      idx: -1,
      currentPage1: 1,
      page1: 1,
      page2: 1,
      row1: 10,
      row2: 10,
      totalNum1: 1,
      totalNum2: 1,
      formEdit: {},
      formAdd: {},
      labelTableData: [], //标签表格数据
      searchLabel: "", //搜索标签输入框
      choosedLabelList: [], //已选中标签列表
      beautiColorTableData: [], //色号表格数据
      searchBeautiColor: "", //搜索色号输入框
      choosedBeautiColorList: [] //已选中色号列表
    };
  },
  mounted() {
    this.getlabelCountList(1, 10);
    this.getlabelList();
  },

  methods: {
    getlabelCountList(page1, row1) {
      this.$axios
        .post(
          "/management/admin/praise!list.action",
          this.$qs.stringify({
            page: page1,
            row: row1
          })
        )
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.labelCountList = res.data.rows;
            this.totalNum1 = res.data.total;
          }
        });
    },
    getlabelList() {
      //鼻
      this.$axios
        .get(`/management/admin/label!getTreeGrid.action?id=817`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.labelList1 = res.data;
          }
        });
        //眼
        this.$axios
        .get(`/management/admin/label!getTreeGrid.action?id=815`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.labelList2 = res.data;
          }
        });
        //脸
        this.$axios
        .get(`/management/admin/label!getTreeGrid.action?id=778`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.labelList3 = res.data;
          }
        });
        //唇
        this.$axios
        .get(`/management/admin/label!getTreeGrid.action?id=819`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.labelList4 = res.data;
          }
        });
    },

    // 新增dialog打开后回调
    addOPen() {
      this.formAdd = {};
    },
    //新增
    handleAdd() {
      this.$axios
        .post(
          `/management/admin/praise!save.action`,
          this.$qs.stringify(this.formAdd)
        )
        .then(res => {
          if (res.status == 200) {
            if (res.status == 200) {
              this.AddVisible = false;
              this.$message.success(`添加成功`);
              this.formAdd = {};
              this.getlabelCountList();
            }
          }
        });
    },
    //编辑
    handleEdit(row) {
      console.log(row);
      this.TableVisible = true;
      this.idx = row.id;
      this.$axios
        .get(`/management/admin/praise!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.formEdit = res.data;
          }
        });
    },
    saveEdit() {
      this.$axios
        .post(
          `/management/admin/praise!save.action?id=${this.idx}`,
          this.$qs.stringify({
            labelId: this.formEdit.labels,
            type: this.formEdit.type,
            text: this.formEdit.text
          })
        )
        .then(res => {
          if (res.status == 200) {
            if (res.status == 200) {
              this.TableVisible = false;
              this.$message.success(`修改成功`);
              this.formEdit = {};
              this.getlabelCountList();
            }
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
          .get(`/management/admin/praise!delete.action?id=${rows[index].id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getlabelCountList();
            }
          });
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
</style>