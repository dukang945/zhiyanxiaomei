<template>
  <div>
    <div class="handle-box">
      <el-button
        type="primary"
        @click="AddVisible = true"
        size="small"
        v-has
      >新增</el-button>
      <el-button
        type="primary"
        @click="refresh"
        size="small"
        v-has
      >刷新缓存</el-button>
      <el-input
        v-model="brand_Search"
        placeholder="请输入搜索类容"
        style="width: 30%"
        size="small"
        @keyup.enter.native.prevent="brandSearch"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="brandSearch"
        ></el-button>
      </el-input>
      <el-dialog
        title="新增"
        :visible.sync="AddVisible"
        width="30%"
        @open='open'
      >
        <el-form
          :label-position="labelPosition"
          label-width="120px"
          :model="formLabelAdd"
          :rules="rules"
          ref="formLabelAdd"
        >
          <el-form-item
            label="博主姓名:"
            prop="name"
          >
            <el-input v-model="formLabelAdd.name"></el-input>
          </el-form-item>
          <el-form-item label="博主标语:">
            <el-input v-model="formLabelAdd.slogan"></el-input>
          </el-form-item>
          <el-form-item label="图片">
                <el-upload
                  class="upload-demo"
                  action="/management/admin/kcupload!uploadImage.action?type=goods_path"
                  :data="imgData1"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove1"
                  :on-success="handleSuccess1"
                  :file-list="fileList1"
                  :before-upload="beforeUpload1"
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handleAdd('formLabelAdd')"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table
      :data="brandList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        label="id"
        width="120"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="博主姓名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="slogan"
        label="博主标语"
        align="center"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            v-has
          >编辑</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, brandList)"
            type="danger"
            size="small"
            class="el-icon-delete"
            v-del
          >删除</el-button>
          <el-dialog
            title="编辑"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-form
              :label-position="labelPosition"
              label-width="120px"
              :model="formLabelAlign"
              :rules="rules"
              ref="formLabelAlign"
            >
              <el-form-item
                label="博主姓名:"
                prop="name"
              >
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="博主标语:">
                <el-input v-model="formLabelAlign.slogan"></el-input>
              </el-form-item>
              <el-form-item label="图片">
                <el-upload
                  class="upload-demo"
                  action="/management/admin/kcupload!uploadImage.action?type=goods_path"
                  :data="imgData"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  :limit="1"
                  list-type="picture"
                >
                  <el-button
                    size="small"
                    type="primary"
                  >点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="saveEdit('formLabelAlign')"
              >确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="图片预览" :visible.sync="imgVisible" append-to-body>
					<img :src="img" alt="" style="width:100%">
				</el-dialog>
    <Pagination
      :totalNum="totalNum"
      @change_Page="changePage"
      @change_Size="changeSize"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/module/Pagination.vue";
export default {
  data() {
    return {
      brandList: [],
      multipleSelection: [],
      del_list: [],
      imgData: {},
      imgData1: {},
      fileList: [],
      fileList1: [],
      dialogVisible: false,
      AddVisible: false,
      imgVisible: false,
      img:'',
      labelPosition: "left",
      brand_Search: "",
      idx: -1,
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        synopsis: [
          {
            required: true,
            message: "请输入简介",
            trigger: "blur"
          }
        ],
        theMain: [
          {
            required: true,
            message: "请输入主打",
            trigger: "blur"
          }
        ]
      },
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
    this.getBrandList(1, 10);
  },
  methods: {
    getBrandList(page, row) {
      this.$axios
        .get("/management/admin/blogger!list.action", {
          params: {
            page: page,
            rows: row
          }
        })
        .then(res => {
          console.log(res, "");
          if (res.status == 200) {
            this.totalNum = res.data.total;
            this.brandList = res.data.rows;
          } else {
            this.$message.error("请求数据失败!");
          }
          // console.log(this.columnList)
        });
    },
    // 编辑
    handleEdit(index, row) {
        this.fileList = []
        this.formLabelAlign= {}
      console.log(index, row);
      this.idx = row.id;
      this.$axios
        .get(`/management/admin/blogger!input.action?id=${row.id}`)
        .then(res => {
          if (res.status == 200) {
            this.formLabelAlign = res.data;
            if(this.formLabelAlign.headImg){
                this.fileList = [{url:this.formLabelAlign.headImg,name:'博主头像'}]
            }
          }
        });
      this.dialogVisible = true;
    },
    //保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              `/management/admin/blogger!save.action?id=${this.idx}`,
              this.$qs.stringify({
                name: this.formLabelAlign.name,
                slogan: this.formLabelAlign.slogan,
                headImg: this.formLabelAlign.headImg
              })
            )
            .then(res => {
              console.log(res);
              this.dialogVisible = false;
              this.$message.success(`修改成功`);
              this.getBrandList();
              this.formLabelAlign = {};
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
          .get(`/management/admin/blogger!delete.action?id=${rows[index].id}`)
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getBrandList();
            }
          });
      });
    },
    open(){
        this.fileList = this.fileList1 = []
        this.formLabelAdd ={}
    },
    // 新增
    handleAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              `/management/admin/blogger!save.action`,
              this.$qs.stringify({
                name: this.formLabelAdd.name,
                slogan: this.formLabelAdd.slogan,
                headImg: this.formLabelAdd.headImg
              })
            )
            .then(res => {
              this.AddVisible = false;
              this.$message.success(`添加成功`);
              this.getBrandList();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //搜索
    brandSearch(page1=1, row1=10) {
      this.$axios
        .post(
          "/management/admin/blogger!list.action",
          this.$qs.stringify({
            filter_LIKES_name: this.brand_Search,
            page: page1,
            rows: row1
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.brandList = res.data.rows;
            this.totalNum = res.data.total;
          }
        });
    },
    // 刷新缓存
    refresh(){
        this.$axios.get('/management/admin/blogger!refresh.action').then(res=>{
            if(res.status==200){
                this.$message.success('刷新成功')
            }
        })
    },
    // 全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 选中项
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // // 批量删除
    // delAll() {
    //   const length = this.multipleSelection.length;
    //   for (let index = 0; index < length; index++) {
    //     const element = this.multipleSelection[index];
    //     const i = this.tableData3.indexOf(element);
    //     this.tableData3.splice(i, 1);
    //   }
    // },
    //图片
    handleRemove(file, fileList) {
      // this.formLabelAlign.image = "";
      // for (let i = 0; i < fileList.length; i++) {
      //   this.formLabelAlign.image +=
      //     `<img src="` + fileList[i].url + `"  alt='' />`;
      // }
    },
    handleRemove1(file, fileList) {
    },
    handlePreview(file) {
      this.img = file.url;
      this.imgVisible = true;
    },
    beforeUpload(file) {
      this.imgData.FileName = file.name;
      this.imgData.imgFile = file;
    },
    beforeUpload1(file) {
      this.imgData1.FileName = file.name;
      this.imgData1.imgFile = file;
    },
    handleSuccess(res) {
      console.log(res);
      this.formLabelAlign.headImg = res.url;
    },
    handleSuccess1(res) {
      this.formLabelAdd.headImg = res.url;
    },
    handleClose(done) {
      this.formLabelAlign = {};
      done();
    },
    // 分页
    changePage(val) {
      this.page = val;
      this.getBrandList(val, this.row);
      if(this.brand_Search){
          this.brandSearch(val,this.row1)
      }
    },
    changeSize(val) {
      this.row = val;
      this.getBrandList(this.page, val);
      if(this.brand_Search){
          this.brandSearch(this.page1, val)
      }
    }
  }
};
</script>

<style scoped>
</style>
