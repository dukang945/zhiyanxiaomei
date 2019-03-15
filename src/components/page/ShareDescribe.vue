<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" size="small" v-has>新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="30%">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAdd"
          :rules="rules"
          ref="formLabelAdd"
        >
          <el-form-item label="类型">
            <el-select v-model="formLabelAdd.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="formLabelAdd.title"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formLabelAdd.message"></el-input>
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
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formLabelAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="bannerList" border style="width: 90%" current-row-key>
      <el-table-column label="编号" align="center" width="80">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.type==1?'邀请好友':'五官检测分享'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="审核状态" width="80" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.online==0">上线</el-tag>
          <el-tag type="danger" v-else>下线</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="message" label="描述" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatTime('YMDHMS')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, bannerList)"
            type="primary"
            class="el-icon-delete"
            size="small"
            v-del
          >删除</el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            size="small"
            v-has
          >编辑</el-button>
          <el-button
            type="primary"
            v-if="scope.row.online==0"
            class="el-icon-sort"
            @click="online(scope.$index, scope.row)"
            size="small"
            v-online
          >下线</el-button>
          <el-button
            type="primary"
            v-else
            @click="online(scope.$index, scope.row)"
            size="small"
            class="el-icon-sort"
            v-online
          >上线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="formLabelAlign"
      >
        <el-form-item label="类型">
          <el-select v-model="formLabelAlign.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formLabelAlign.message"></el-input>
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
      bannerList: [],
      fileList: [],
      fileList1: [],
      imgData1: {},
      imgData: {},
      options: [
        {
          value: 1,
          label: "邀请好友"
        },
        {
          value: 2,
          label: "五官检测分享"
        }
      ],
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      page: 1,
      row: 10,
      totalNum: 1,
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        imgLink: [
          {
            required: true,
            message: "请输入链接",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择链接类型",
            trigger: "change"
          }
        ]
      },
      formLabelAlign: {},
      formLabelAdd: {}
    };
  },
  components: {
    Pagination
  },
  mounted() {
    this.getBannerList(1, 10);
  },
  methods: {
    getBannerList(page, row) {
      this.$axios
        .get("/management/admin/invite-friends!list.action", {
          params: {
            page,
            row
          }
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.bannerList = res.data.rows;
            this.totalNum = res.data.total;
          }
        });
    },
    // 编辑
    handleEdit(index, row) {
      this.fileList = [];
      this.idx = row.id;
      this.dialogVisible = true;
      this.$axios
        .get(`/management/admin/invite-friends!input.action?id=${this.idx}`)
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.formLabelAlign =res.data
            this.formLabelAlign.icon
              ? (this.fileList = [{ url: this.formLabelAlign.icon }])
              : (this.fileList = []);
          }
        });
    },
    //保存编辑
    saveEdit() {
      this.$axios
        .post(
          `/management/admin/invite-friends!save.action?id=${this.idx}`,
          this.$qs.stringify({
            type: this.formLabelAlign.type,
            title: this.formLabelAlign.title,
            message: this.formLabelAlign.message,
            icon: this.formLabelAlign.icon
          })
        )
        .then(res => {
          if (res.status == 200) {
            this.dialogVisible = false;
            this.$message.success(`添加成功`);
            this.formLabelAlign = {};
            this.fileList = [];
            this.getBannerList();
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
          .get(
            `/management/admin/invite-friends!delete.action?id=${
              rows[index].id
            }`
          )
          .then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getBannerList();
            }
          });
      });
    },
    //上下线
    online(index, rows) {
      console.log(rows, rows.online);
      this.$axios
        .get(
          `/management/admin/invite-friends!online.action?id=${
            rows.id
          }`
        )
        .then(res => {
          if (res.status == 200) {
            this.$message.success(rows.enable == 0 ? "已下线" : "已上线");
            this.getBannerList();
          }
        });
    },
    // 新增
    handleAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/management/admin/invite-friends!save.action",
              this.$qs.stringify(this.formLabelAdd)
            )
            .then(res => {
              if (res.status == 200) {
                this.AddVisible = false;
                this.$message.success("添加成功");
                this.getBannerList();
                this.formLabelAdd = {};
                this.fileList1 = [];
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //图片上传
    handleRemove(file, fileList) {},
    handleRemove1(file, fileList) {
      // console.log(this.formLabelAdd,file,fileList)
    },
    handlePreview(file) {
      console.log(file);
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
      this.formLabelAlign.icon = res.url;
    },
    handleSuccess1(res) {
      this.formLabelAdd.icon = res.url;
    },
    // 分页
    changePage(val) {
      this.page = val;
      this.getBannerList(val, this.row);
    },
    changeSize(val) {
      this.row = val;
      this.getBannerList(this.page, val);
    }
  }
};
</script>

<style scoped>
.el-table {
  margin-left: 20px;
}

.el-switch {
  margin-left: 10px;
}
</style>
