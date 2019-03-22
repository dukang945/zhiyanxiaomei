<template>
  <div class="constellationContent">
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" size="small">新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
        <el-form
          :label-position="labelPosition"
          :rules="rules"
          ref="formLabelAdd"
          label-width="100px"
          :model="formLabelAdd"
        >
        <el-form-item label="教程id" >
          <el-input v-model="formLabelAdd.beautyDetailsId"></el-input>
        </el-form-item>
          <el-form-item label="名称" prop="constellation">
            <el-input v-model="formLabelAdd.constellation"></el-input>
          </el-form-item>
          <el-form-item label="幸运色">
            <el-input v-model="formLabelAdd.luckyColor"></el-input>
          </el-form-item>
          <el-form-item label="幸运配饰">
            <el-input v-model="formLabelAdd.luckyAcc"></el-input>
          </el-form-item>
          <el-form-item label="弱点">
            <el-input v-model="formLabelAdd.weakness"></el-input>
          </el-form-item>
          <el-form-item label="爱情">
            <el-input v-model="formLabelAdd.love"></el-input>
          </el-form-item>
          <el-form-item label="阴阳性">
            <el-input v-model="formLabelAdd.yinAndYang"></el-input>
          </el-form-item>
          <el-form-item label="星座性格">
            <el-input v-model="formLabelAdd.personality" type="textarea" autosize></el-input>
          </el-form-item>
          <el-form-item label="星座图片">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :on-remove="handleRemove"
              :file-list="editFileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="教程图片">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
              :before-upload="beforeUpload1"
              :on-success="uploadSuccess1"
              :on-remove="handleRemove1"
              :file-list="editFileList1"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="50" align="center"></el-table-column>
      <el-table-column prop="constellation" label="星座名(日期-日期)" width="220" align="center"></el-table-column>
      <el-table-column prop="personality" label="星座性格" :show-overflow-tooltip="true"></el-table-column>
      <!-- <el-table-column prop="weakness" label="弱点" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="love" label="爱情" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="yinAndYang" label="阴阳性" :show-overflow-tooltip="true"></el-table-column> -->
      <el-table-column prop="luckyColor" label="幸运色" width="100" align="center"></el-table-column>
      <el-table-column prop="luckyAcc" label="幸运配饰" width="180" align="center"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form
        :label-position="labelPosition"
        :rules="rules"
        ref="formLabelAlign"
        label-width="100px"
        :model="formLabelAlign"
      >
        <el-form-item label="教程id" >
          <el-input v-model="formLabelAlign.beautyDetailsId"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="constellation">
          <el-input v-model="formLabelAlign.constellation"></el-input>
        </el-form-item>
        <el-form-item label="幸运色">
          <el-input v-model="formLabelAlign.luckyColor"></el-input>
        </el-form-item>
        <el-form-item label="幸运配饰">
          <el-input v-model="formLabelAlign.luckyAcc"></el-input>
        </el-form-item>
        <el-form-item label="弱点">
          <el-input v-model="formLabelAlign.weakness"></el-input>
        </el-form-item>
        <el-form-item label="爱情">
          <el-input v-model="formLabelAlign.love"></el-input>
        </el-form-item>
        <el-form-item label="阴阳性">
          <el-input v-model="formLabelAlign.yinAndYang"></el-input>
        </el-form-item>
        <el-form-item label="星座性格">
          <el-input v-model="formLabelAlign.personality" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-remove="handleRemove"
            :file-list="editFileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="教程图片">
          <el-upload
            action="/management/admin/kcupload!uploadImage.action?type=goods_path"
            :data="imgData1"
            :before-upload="beforeUpload1"
            :on-success="uploadSuccess1"
            :on-remove="handleRemove1"
            :file-list="editFileList1"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
    <Pagination :totalNum="totalNum" @change_Page="changePage" @change_Size="changeSize"></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/module/Pagination.vue";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      editFileList: [],
      editFileList1: [],
      formLabelAlign: {
        id: "",
        image: "",
        constellation: "",
        luckyAcc: "",
        luckyColor: "",
        personality: ""
      },
      formLabelAdd: {
        id: "",
        image: "",
        constellation: "",
        luckyAcc: "",
        luckyColor: "",
        personality: ""
      },
      rules: {
        constellation: [
          {
            required: true,
            message: "请输入星座名称",
            trigger: "blur"
          }
        ]
      },
      page: 1,
      row: 10,
      totalNum: 1,
      imgData: {
        FileName: "",
        imgFile: null
      },
      imgData1: {
        FileName: "",
        imgFile: null
      },
    };
  },
  components: {
    Pagination
  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      this.editFileList = [];
      this.idx = index;
      this.$axios.get(`/management/admin/constellation!input.action?id=${row.id}`).then(res=>{
        if(res.status==200){
          console.log(res)
          this.formLabelAlign = res.data
          this.editFileList=[{url:res.data.image?res.data.image:''}]
          this.editFileList1=[{url:res.data.detailsImage?res.data.detailsImage:''}]
        }
      })
	  
      this.dialogVisible = true;
    },
    //保存编辑
    saveEdit() {
      this.$refs["formLabelAlign"].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              `/management/admin/constellation!save.action?id=${
                this.formLabelAlign.id
              }`,
              this.$qs.stringify({
                beautyDetailsId:this.formLabelAlign.beautyDetailsId,
                constellation: this.formLabelAlign.constellation,
                luckyAcc: this.formLabelAlign.luckyAcc,
                weakness: this.formLabelAlign.weakness,
                love: this.formLabelAlign.love,
                yinAndYang: this.formLabelAlign.yinAndYang,
                luckyColor: this.formLabelAlign.luckyColor,
                personality: this.formLabelAlign.personality,
                image: this.formLabelAlign.image,
                detailsImage:this.formLabelAlign.detailsImage
              })
            )
            .then(res => {
              this.getData(this.page, this.row);
              this.editFileList=[]
              this.editFileList1=[]
              this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            })
            .catch(e => {
              this.$message.error(`出了点问题-.-!`);
            });
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    handleAdd() {
      this.$refs["formLabelAdd"].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/management/admin/constellation!save.action",
              this.$qs.stringify({
                beautyDetailsId:this.formLabelAdd.beautyDetailsId,
                constellation: this.formLabelAdd.constellation,
                luckyAcc: this.formLabelAdd.luckyAcc,
                weakness: this.formLabelAdd.weakness,
                love: this.formLabelAdd.love,
                yinAndYang: this.formLabelAdd.yinAndYang,
                luckyColor: this.formLabelAdd.luckyColor,
                personality: this.formLabelAdd.personality,
                image: this.formLabelAdd.image,
                detailsImage:this.formLabelAdd.detailsImage,
              })
            )
            .then(res => {
              this.getData(this.page, this.row);
              this.formLabelAdd = {
                image: "",
                constellation: "",
                luckyAcc: "",
                luckyColor: "",
                personality: ""
              };
              this.$message.success(`添加成功`);
            })
            .catch(e => {
              this.$message.error(`出了点问题-.-!`);
            });
          this.AddVisible = false;
          this.editFileList=[]
              this.editFileList1=[]
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
		// 删除
		handleDelete(){
			
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
      this.getData(val, this.row);
    },
    changeSize(val) {
      this.row = val;
      this.getData(this.page, val);
    },
    // 操作上传图片(需要图片上传地址)
    beforeUpload(file) {
      console.log(file);
      this.imgData.FileName = file.name;
      this.imgData.imgFile = file;
    },
    handleRemove(file, fileList) {
    },
    uploadSuccess(res, file, fileList) {
      console.log(res);
      this.formLabelAlign.image = res.url;
      if(this.AddVisible){
        this.formLabelAdd.image = res.url;
      }
      // 清空上传图片参数
      this.imgData = {
        FileName: "",
        imgFile: null
      };
    },
    beforeUpload1(file) {
      console.log(file);
      this.imgData1.FileName = file.name;
      this.imgData1.imgFile = file;
    },
    handleRemove1(file, fileList) {
    },
    uploadSuccess1(res, file, fileList) {
      console.log(res);
      this.formLabelAlign.detailsImage = res.url;
      if(this.AddVisible){
        this.formLabelAdd.detailsImage = res.url;
      }
      // 清空上传图片参数
      this.imgData = {
        FileName: "",
        imgFile: null
      };
    },
    // 请求数据
    getData(page, row) {
      var url = "/management/admin/constellation!list.action";
      this.$axios
        .get(url, {
          params: {
            page: page,
            rows: row
          }
        })
        .then(res => {
          console.log(res)
          this.totalNum = res.data.total;
          let tempTableData = res.data.rows.map(item => {
            return {
              id: item.id,
              image: item.image,
              constellation: item.constellation,
              luckyAcc: item.luckyAcc,
              luckyColor: item.luckyColor,
              personality: item.personality
            };
          });
          this.tableData = tempTableData;
        });
    }
  },
  mounted() {
    this.getData(1, 10);
  }
};
</script>

<style scoped>
</style>
