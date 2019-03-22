<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="80%" @open="addOPen">
        <el-form :model="formAdd">
          <el-form-item label="标签" label-width="120px">
            <el-select v-model="formAdd.labels" placeholder="请选择标签" clearable multiple filterable>
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
          <el-form-item label="明星名称" label-width="120px">
            <el-input v-model="formAdd.name"></el-input>
          </el-form-item>
          <el-form-item label="教程id" label-width="120px">
            <el-input v-model="formAdd.beautyDetailsId"></el-input>
          </el-form-item>
          <el-form-item label="明星图片" label-width="120px">
            <el-upload
              class="upload-demo"
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data="imgData1"
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

        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="labelCountList" border align="center">
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="name" label="明星名称" align="center"></el-table-column>
      <el-table-column prop="beautyDetailsId" label="教程id" align="center"></el-table-column>
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
          <el-select v-model="formEdit.labels" placeholder="请选择标签" clearable multiple filterable>
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
        <el-form-item label="明星名称" label-width="120px">
          <el-input v-model="formEdit.name"></el-input>
        </el-form-item>
        <el-form-item label="教程id" label-width="120px">
          <el-input v-model="formEdit.beautyDetailsId"></el-input>
        </el-form-item>
        <el-form-item label="明星图片" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/management/admin/kcupload!uploadImage.action"
            :data="imgData1"
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
      labelList1: [],
      labelList2: [],
      labelList3: [],
      labelList4: [],
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
      formEdit: {
        labels: []
      },
      formAdd: {
        labels: []
      },
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
          "/management/admin/star!list.action",
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
      this.formAdd = {
        labels: []
      };
      this.fileList1=[]
    },
    //新增
    handleAdd() {
      var labelId = "";
      if (this.formAdd.labels) {
        for (let i = 0; i < this.formAdd.labels.length; i++) {
          labelId += `&labelId=` + this.formAdd.labels[i];
        }
      }
      this.$axios
        .post(
          `/management/admin/star!save.action`,
          this.$qs.stringify({
            name: this.formAdd.name,
            beautyDetailsId: this.formAdd.beautyDetailsId,
            starImage: this.formAdd.starImage
          }) + labelId
        )
        .then(res => {
          if (res.status == 200) {
            if (res.status == 200) {
              this.AddVisible = false;
              this.$message.success(`添加成功`);
              this.formAdd = {
                labels: []
              };
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
        .get(`/management/admin/star!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            let labels = res.data.labels.split(",");
            this.formEdit = res.data;
            this.formEdit.labels = labels;
            this.formEdit.starImage
              ? (this.fileList1 = [{ url: this.formEdit.starImage }])
              : (this.fileList1 = []);
          }
        });
    },
    saveEdit() {
      var labelId = "";
      if (this.formEdit.labels) {
        for (let i = 0; i < this.formEdit.labels.length; i++) {
          labelId += `&labelId=` + this.formEdit.labels[i];
        }
      }
      this.$axios
        .post(
          `/management/admin/star!save.action?id=${this.idx}`,
          this.$qs.stringify({
            name: this.formEdit.name,
            beautyDetailsId: this.formEdit.beautyDetailsId,
            starImage: this.formEdit.starImage
          }) + labelId
        )
        .then(res => {
          if (res.status == 200) {
            if (res.status == 200) {
              this.TableVisible = false;
              this.$message.success(`修改成功`);
              this.formEdit = {
                labels: []
              };
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
          .get(`/management/admin/star!delete.action?id=${rows[index].id}`)
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
      this.imgData1.FileName =
        "zmxy/uploadFiles/" +
        new Date().valueOf() +
        "_" +
        sessionStorage.getItem("id") +
        "_" +
        Math.round(Math.random() * 999999) +
        ".jpg";
      this.imgData1.imgFile = file;
    },
    handleSuccess1(res) {
      this.formEdit.starImage = res.url;
      if (this.AddVisible) {
        this.formAdd.starImage = res.url;
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