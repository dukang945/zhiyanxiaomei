<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" size="small" v-has>新增</el-button>
      <el-button type="primary" @click="refreshElastic" size="small">刷新Elastic</el-button>
      <el-input v-model="ingredientSearch" placeholder="请输入搜索类容" style="width: 30%" size="small" @keyup.enter.native.prevent="Search">
        <el-button slot="append" icon="el-icon-search" @click="Search"></el-button>
      </el-input>
      <!-- <el-button type="primary" @click="refreshHTML" size="small">刷新HTML</el-button> -->
      <!-- <el-input v-model="ingredient_Search" placeholder="请输入搜索类容" style="width: 30%" size="small" @keyup.enter.native="ingredientSearch">
				<el-button slot="append" icon="el-icon-search" @click="ingredientSearch"></el-button>
      </el-input>-->
      <!-- <el-dialog title="图片预览" :visible.sync="imgVisible" append-to-body>
        <img :src="img" alt style="width:100%">
      </el-dialog> -->
      <el-dialog title="新增" :visible.sync="AddVisible" width="30%" @open="open">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAdd">
          <el-form-item label="产品ID">
            <el-input v-model="formLabelAdd.productId"></el-input>
          </el-form-item>
          <el-form-item label="成分名称">
            <el-input v-model="formLabelAdd.name"></el-input>
          </el-form-item>
          <el-form-item label="安全风险">
            <el-input v-model="formLabelAdd.safetyRisk"></el-input>
          </el-form-item>
          <el-form-item label="活性成分">
            <el-input v-model="formLabelAdd.activeIngredients"></el-input>
          </el-form-item>
          <el-form-item label="致痘风险">
            <el-input v-model="formLabelAdd.riskBlain"></el-input>
          </el-form-item>
          <el-form-item label="使用目的">
            <el-input v-model="formLabelAdd.intendedUse"></el-input>
          </el-form-item>
          <el-form-item label="成分说明">
            <el-input v-model="formLabelAdd.ingredientOverview" type="textarea" :rows="8"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="产品ID">
            <el-input v-model="formLabelAlign.productId"></el-input>
          </el-form-item>
          <el-form-item label="成分名称">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="安全风险">
            <el-input v-model="formLabelAlign.safetyRisk"></el-input>
          </el-form-item>
          <el-form-item label="活性成分">
            <el-input v-model="formLabelAlign.activeIngredients"></el-input>
          </el-form-item>
          <el-form-item label="致痘风险">
            <el-input v-model="formLabelAlign.riskBlain"></el-input>
          </el-form-item>
          <el-form-item label="使用目的">
            <el-input v-model="formLabelAlign.intendedUse"></el-input>
          </el-form-item>
          <el-form-item label="成分说明">
            <el-input v-model="formLabelAlign.ingredientOverview" type="textarea" :rows="8"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="ingredientList" border style="width: 100%">
      <el-table-column prop="id" label="成分ID" align="center" width="50"></el-table-column>
      <el-table-column prop="name" label="成分名称" align="center" width="160"></el-table-column>
      <el-table-column prop="safetyRisk" label="安全风险" align="center" width="50"></el-table-column>
      <el-table-column prop="activeIngredients" label="活性成分" align="center" width="50"></el-table-column>
      <el-table-column prop="riskBlain" label="致痘风险" align="center" width="50"></el-table-column>
      <el-table-column prop="intendedUse" label="使用目的" align="center"></el-table-column>
      <el-table-column prop="ingredientOverview" label="成分说明" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            v-has
          >编辑</el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="saveHtml(scope.row)"
            v-has
          >生成H5</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, ingredientList)"
            type="danger"
            size="small"
            class="el-icon-delete"
            v-del
          >删除</el-button>
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
      ingredientList: [],
      ingredient_Search: "",
      dialogVisible: false,
      AddVisible: false,
      imgVisible: false,
      labelPosition: "left",
      ingredientSearch:"",
      idx: -1,
      img: "",
      currentPage4: 1,
      imgData1: {},
      fileList: [],
      formLabelAlign: {},
      formLabelAdd: {},
      page: 1,
      row: 10,
      totalNum: 1
    };
  },
  components: {
    Pagination
  },
  mounted() {
    this.getProductList(1, 10);
  },
  methods: {
    getProductList(page, row) {
      this.$axios
        .post(
          "/management/admin/ingredient!list.action",
          this.$qs.stringify({
            page,
            row
          })
        )
        .then(res => {
          console.log(res, "");
          if (res.status == 200) {
            this.ingredientList = res.data.rows;
            this.totalNum = res.data.total;
          } else {
            this.$message.error("请求数据失败!");
          }
        });
    },
    // 编辑
    handleEdit(index, row) {
      this.idx = row.id;
      this.dialogVisible = true;
      this.$axios
        .get(`/management/admin/ingredient!input.action?id=${this.idx}`)

        .then(res => {
          if (res.status == 200) {
            this.formLabelAlign = res.data;
          }
        });
    },
    //保存编辑
    saveEdit() {
      this.$axios
        .post(
          `/management/admin/ingredient!save.action?id=${this.idx}`,
          this.$qs.stringify({
              id:this.formLabelAdd.id,
            productId: this.formLabelAlign.productId,
            riskBlain: this.formLabelAlign.riskBlain,
            safetyRisk: this.formLabelAlign.safetyRisk,
            name: this.formLabelAlign.name,
            intendedUse: this.formLabelAlign.intendedUse,
            ingredientOverview: this.formLabelAlign.ingredientOverview,
            activeIngredients: this.formLabelAlign.activeIngredients,
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.dialogVisible = false;
            this.$message.success(`修改成功`);
            this.getProductList();
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
          .get(`/management/admin/ingredient!delete.action?id=${rows[index].id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getProductList();
            }
          });
      });
    },
    // 新增
    open() {
      this.fileList = [];
    },
    handleAdd() {
      this.$axios
        .post(
          "/management/admin/ingredient!save.action",
          this.$qs.stringify(this.formLabelAdd)
        )
        .then(res => {
          if (res.status == 200) {
            this.AddVisible = false;
            this.$message.success("添加成功");
            this.getProductList();
            this.fileList = [];
            this.formLabelAdd = {};
          }
        });
    },
    handleClose(done) {
      done();
    },
    //生成H5
    saveHtml(row) {
      this.$axios
        .get(`/management/admin/ingredient!saveHtml.action?id=${row.id}`)
        .then(res => {
          if (res.status == 200) {
            this.$message.success("生成成功");
          }
        });
    },
    //刷新缓存
    refreshElastic(){
      this.$axios.get('/management/admin/ingredient!refreshElastic.action').then(res=>{
        if(res.status==200){
           this.$message.success("刷新成功");
        }
      })
    },
    refreshHTML(){
      this.$axios.get('/management/admin/ingredient!refreshHTML.action').then(res=>{
        if(res.status==200){
           this.$message.success("刷新成功");
        }
      })
    },
    //搜索
    Search(page, row) {
      this.$axios
        .post(
          `/management/admin/ingredient!list.action`,
          this.$qs.stringify({
            q: this.ingredientSearch,
            page: this.page,
            rows: this.row
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.ingredientList = res.data.rows;
            this.totalNum = res.data.total;
          }
        });
    },
    //图片上传
    handleRemove1(file, fileList) {},
    handlePreview(file) {
      this.img = file.url;
      this.imgVisible = true;
    },
    beforeUpload1(file) {
      this.imgData1.FileName = file.name;
      this.imgData1.imgFile = file;
    },
    handleSuccess1(res) {
      console.log(res);
      this.formLabelAdd.img = res.url;
    },
    //分页
    changePage(val) {
      this.page = val;
      if(this.ingredientSearch){
        this.Search()
      }else{
        this.getProductList(val, this.row);
      }
      
    },
    changeSize(val) {
      this.row = val;
      if(this.ingredientSearch){
        this.Search()
      }else{
        this.getProductList(val, this.row);
      }
    }
  }
};
</script>

<style scoped>
</style>
