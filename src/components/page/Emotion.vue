<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="80%" @opened="addOPen">
         <el-form :model="formAdd">
        <el-form-item label="英文名称" label-width="120px">
          <el-input v-model="formAdd.englishName"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" label-width="120px">
           <el-input v-model="formAdd.name"></el-input>
          </el-form-item>
        <el-form-item label="描述" label-width="120px" >
         <textarea id="noseDesc" rows="5" cols="80" v-model="formAdd.emotionDescribe"></textarea>
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
      <el-table-column prop="englishName" label="英文名称" align="center">
      </el-table-column>
      <el-table-column prop="name" label="中文名称" align="center">
      </el-table-column>
      <el-table-column prop="emotionDescribe" label="描述" align="center" show-overflow-tooltip></el-table-column>
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
        <el-form-item label="英文名称" label-width="120px">
          <el-input v-model="formEdit.englishName"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" label-width="120px">
           <el-input v-model="formEdit.name"></el-input>
          </el-form-item>
        <el-form-item label="描述" label-width="120px">
         <textarea id="noseDesc" rows="5" cols="80" v-model="formEdit.emotionDescribe"></textarea>
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
      imgData1: {},
      fileList1: [],
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
  },

  methods: {
    getlabelCountList(page1, row1) {
      this.$axios
        .post(
          "/management/admin/emotion!list.action",
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
    
    // 新增dialog打开后回调
    addOPen() {
      this.formAdd = {};
      this.fileList1=[]
    },
    //新增
    handleAdd() {
      this.$axios
        .post(
          `/management/admin/emotion!save.action`,
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
        .get(`/management/admin/emotion!input.action?id=${this.idx}`)
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
          `/management/admin/emotion!save.action?id=${this.idx}`,
          this.$qs.stringify({
            name: this.formEdit.name,
            englishName: this.formEdit.englishName,
            emotionDescribe: this.formEdit.emotionDescribe
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
          .get(`/management/admin/emotion!delete.action?id=${rows[index].id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getlabelCountList();
            }
          });
      });
    },
//图片上传
    handleRemove1(file, fileList) {},
    beforeUpload1(file) {
      console.log(file);
      this.imgData1.FileName =file.name;
      this.imgData1.imgFile = file;
    },
    handleSuccess1(res) {
      this.formEdit.headImage = res.url;
      if (this.AddVisible) {
        this.formAdd.headImage = res.url;
      }
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