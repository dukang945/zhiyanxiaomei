<template>
  <div class="tagContent">
    <div class="handle-box">
      <el-row>
        <el-col :span='6'>
          <el-button
            type="primary"
            @click="AddVisible = true"
            size='small'
          >新增</el-button>
          <el-button
            type="primary"
            plain
            size='small'
          >一键缓存</el-button>
          <el-dialog
            title="新增"
            :visible.sync="AddVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-form
              :label-position="labelPosition"
              :rules="rules"
              ref="formLabelAdd"
              label-width="100px"
              :model="formLabelAdd"
            >
              <el-form-item label="标签名称">
                <el-input v-model="formLabelAdd.name"></el-input>
              </el-form-item>
              <el-form-item label="英文名称">
                <el-input v-model="formLabelAdd.enname"></el-input>
              </el-form-item>
              <el-form-item label="上级目录">
                <el-input
                  v-model="formLabelAdd.lableName"
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="排序号">
                <el-input
                  v-model="formLabelAdd.sort"
                  placeholder="感兴趣内容排序"
                ></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <el-select
                  v-model="formLabelAdd.type"
                  placeholder="请选择类型"
                >
                  <el-option
                    label="教程类型"
                    value="1"
                  ></el-option>
                  <el-option
                    label="测评类型"
                    value="2"
                  ></el-option>
                  <el-option
                    label="化妆水平"
                    value="3"
                  ></el-option>
                  <el-option
                    label="目的类型"
                    value="4"
                  ></el-option>
                  <el-option
                    label="专题类型"
                    value="5"
                  ></el-option>
                  <el-option
                    label="品牌+品类"
                    value="6"
                  ></el-option>
                  <el-option
                    label="初学乍练"
                    value="7"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="内容显示">
                <el-select
                  v-model="formLabelAdd.sta"
                  placeholder="感兴趣内容显示"
                >
                  <el-option
                    label="显示"
                    :value="0-0"
                  ></el-option>
                  <el-option
                    label="不显示"
                    :value="1-0"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标签显示">
                <el-select
                  v-model="formLabelAdd.labelIsShow"
                  placeholder="内容页标签显示"
                >
                  <el-option
                    label="显示"
                    :value="0-0"
                  ></el-option>
                  <el-option
                    label="不显示"
                    :value="1-0"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="图片">
                <el-upload
                  action="/management/admin/kcupload!uploadImage.action?type=goods_path"
                  :data='imgData'
                  :limit="1"
                  :before-upload='beforeUpload'
                  :on-success="uploadSuccess"
                  :on-remove="handleRemove"
                  list-type="picture"
                >
                  <el-button
                    size="small"
                    type="primary"
                  >点击上传</el-button>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                  >只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-form>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="AddVisible = false;formLabelAdd={}">取 消</el-button>
              <el-button
                type="primary"
                @click="handleAdd"
              >确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
        <el-col :span='18'>
          <el-form
            :inline="true"
            :model="searchForm"
            class="right-search"
            @submit.native.prevent
          >
            <el-form-item>
              <el-input
                v-model="searchForm.text"
                size='small'
                placeholder="请输入标签名"
                @keyup.enter.native="onSubmitSearch"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size='small'
                @click="onSubmitSearch"
                icon="el-icon-search"
              >搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

    </div>
    <div class="tableBox">
      <el-table
        :data="treeData"
        style="width: 100%"
        row-key="id"
        border
        lazy
        highlight-current-row
    @current-change="handleCurrentChange"
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          prop="name"
          label="标签名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="enname"
          label="英文名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="上级目录"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
        >
        </el-table-column>
        <el-table-column
          prop="sta"
          label="客户端显示"
        >
        <template slot-scope="scope">
            <span v-if="scope.row.sta==0">显示</span>
            <span v-if="scope.row.sta==1">不显示</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="labelIsShow"
          label="标签显示"
        >
        <template slot-scope="scope">
            <span v-if="scope.row.labelIsShow==0">显示</span>
            <span v-if="scope.row.labelIsShow==1">不显示</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="actionFunc(scope.row)" size='small'>编辑</el-button>
            <el-button @click="deleteFunc(scope.row)" size='small'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form
          :label-position="labelPosition"
          :rules="rules"
          ref="formLabelAlign"
          label-width="100px"
          :model="formLabelAlign"
        >
          <el-form-item label="标签名称">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="英文名称">
            <el-input v-model="formLabelAlign.enname"></el-input>
          </el-form-item>
          <el-form-item label="排序号">
            <el-input
              v-model="formLabelAlign.sort"
              placeholder="感兴趣内容排序"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select
              v-model="formLabelAlign.type"
              placeholder="请选择类型"
            >
              <el-option
                label="教程类型"
                value="1"
              ></el-option>
              <el-option
                label="测评类型"
                value="2"
              ></el-option>
              <el-option
                label="化妆水平"
                value="3"
              ></el-option>
              <el-option
                label="目的类型"
                value="4"
              ></el-option>
              <el-option
                label="专题类型"
                value="5"
              ></el-option>
              <el-option
                label="品牌+品类"
                value="6"
              ></el-option>
              <el-option
                label="初学乍练"
                value="7"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容显示">
            <el-select
              v-model="formLabelAlign.sta"
              placeholder="感兴趣内容显示"
            >
              <el-option
                label="显示"
                :value="0-0"
              ></el-option>
              <el-option
                label="不显示"
                :value="1-0"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签显示">
            <el-select
              v-model="formLabelAlign.labelIsShow"
              placeholder="内容标签显示"
            >
              <el-option
                label="显示"
                :value="0-0"
              ></el-option>
              <el-option
                label="不显示"
                :value="1-0"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              action="/management/admin/kcupload!uploadImage.action?type=goods_path"
              :data='imgData'
              :before-upload='beforeUpload'
              :limit="1"
              :on-success="uploadSuccess"
              :on-remove="handleRemove"
              :file-list="editFileList"
              list-type="picture"
            >
              <el-button
                size="small"
                type="primary"
              >点击上传</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >只能上传jpg/png文件，且不超过500kb</div>
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
            @click="saveEdit"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      editFileList: [],
      formLabelAlign: {},
      formLabelAdd: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入标签名称",
            trigger: "blur"
          }
        ]
      },
      treeData: [],
      imgData: {
        FileName: "",
        imgFile: null
      },
      tempImgUrl: "",
      markIndex: [],
      searchForm: {
        text: ""
      },
      tempArr: []
    };
  },
  methods: {
    //获取数结构最外层菜单
    getData() {
      this.$axios
        .get("/management/admin/label!getTreeGrid.action")
        .then(res => {
          if (res.status == 200) {
            console.log(res.data);
            this.treeData = res.data;
            this.treeData.forEach(item => {
              if (item.state == "closed") {
                return (item.hasChildren = true);
              }
            });
          }
        });
    },
    load(tree, treeNode, resolve) {
      console.log(tree);
      this.$axios
        .get(`/management/admin/label!getTreeGrid.action?id=${tree.id}`)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            res.data.forEach(item => {
              if (item.state == "closed") {
                return (item.hasChildren = true);
              }
            });
            resolve(res.data);
          }
        });
    },
    //单选表格一行
    handleCurrentChange(val){
      console.log(val)
      this.formLabelAdd.lableName = val.name
      this.formLabelAdd.lableId = val.id
    },
    // 检索标签
    onSubmitSearch() {
      if(this.searchForm.text==''){
        this.getData()
        return false
      }
      this.$axios.post('/management/admin/label!searchList.action',this.$qs.stringify({filter_LIKES_name_OR_enname:this.searchForm.text,page:1,rows:20})).then(res=>{
        console.log(res)
        if(res.status==200){
          this.treeData = res.data.rows
        }
      })
      
    },
    clickRow(m) {
      this.formLabelAdd.lableId = m.id;
      this.formLabelAdd.lableName = m.name;
    },
    deleteFunc(m) {
      console.log(m);
      this.$confirm("确认删除？")
        .then(_ => {
          // 调用删除接口
          this.$axios
            .get(`/management/admin/label!delete.action?id=${m.id}`)
            .then(res => {
              console.log(res);
              this.initData();
            });
        })
        .catch(_ => {});
      // 提交删除请求
    },
    handlerExpand(m) {
      console.log(m);
      m.isExpand = !m.isExpand;
    },
    // 编辑
    actionFunc(m) {
      this.editFileList = [];
      // 调用取值接口
      this.$axios
        .get(`/management/admin/label!input.action?id=${m.id}`)
        .then(res => {
          console.log(res);
          this.formLabelAlign = {
            id: res.data.id,
            labelIsShow: res.data.labelIsShow,
            name: res.data.name,
            enname: res.data.enname,
            sort: res.data.sort,
            sta: res.data.sta,
            status: res.data.status,
            type: res.data.type
          };
          let testExp = /http.*?(\.png|\.jpg)/gi;
          if (res.data.image) {
            this.editFileList = [
              {
                name: "标签图片",
                url: res.data.image.match(testExp)[0]
              }
            ];
            this.tempImgUrl = res.data.image.match(testExp)[0];
          }
        });
      this.dialogVisible = true;
    },
    //保存编辑
    saveEdit() {
      this.$refs["formLabelAlign"].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              `/management/admin/label!save.action?id=${
                this.formLabelAlign.id
              }`,
              this.$qs.stringify({
                labelIsShow: this.formLabelAlign.labelIsShow,
                name: this.formLabelAlign.name,
                enname: this.formLabelAlign.enname,
                sort: this.formLabelAlign.sort,
                sta: this.formLabelAlign.sta,
                status: this.formLabelAlign.status,
                type: this.formLabelAlign.type,
                image: this.tempImgUrl
                  ? `<img src="${this.tempImgUrl}" alt="" />`
                  : this.formLabelAlign.image
              })
            )
            .then(res => {
              this.initData();
              this.tempImgUrl = "";
              this.$message.success(`修改成功`);
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
              "/management/admin/label!save.action",
              this.$qs.stringify({
                labelIsShow: this.formLabelAdd.labelIsShow,
                labelId: this.formLabelAdd.lableId,
                name: this.formLabelAdd.name,
                enname: this.formLabelAdd.enname,
                sort: this.formLabelAdd.sort,
                sta: this.formLabelAdd.sta,
                type: this.formLabelAdd.type,
                image: this.tempImgUrl
                  ? `<img src="${this.tempImgUrl}" alt="" />`
                  : ""
              })
            )
            .then(res => {
              this.initData();
              this.formLabelAdd = {};
              this.tempImgUrl = "";
              this.$message.success(`添加成功`);
            })
            .catch(e => {
              this.$message.error(`出了点问题-.-!`);
            });
          this.AddVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 操作上传图片(需要图片上传地址)
    beforeUpload(file) {
      console.log(file);
      this.imgData.FileName = file.name;
      this.imgData.imgFile = file;
    },
    handleRemove(file, fileList) {
      this.formLabelAlign.image = "";
      this.tempImgUrl = "";
    },
    uploadSuccess(res, file, fileList) {
      this.tempImgUrl = res.url;
      // 清空上传图片参数
      this.imgData = {
        FileName: "",
        imgFile: null
      };
    },
    formatType(string) {
      if (string == 1) {
        return "教程类型";
      } else if (string == 2) {
        return "测评类型";
      } else if (string == 3) {
        return "化妆水平";
      } else if (string == 4) {
        return "目的类型";
      } else if (string == 5) {
        return "专题类型";
      } else if (string == 6) {
        return "品牌+品类";
      } else if (string == 7) {
        return "初学乍练";
      } else {
        return "";
      }
    },
    formatLabelShow(string) {
      if (string == 0) {
        return "显示";
      } else if (string == 1) {
        return "不显示";
      } else {
        return "";
      }
    },
    formatStaShow(string) {
      if (string == 0) {
        return "显示";
      } else if (string == 1) {
        return "不显示";
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
.tableBox {
  background-color: #fff;
  max-height: 720px;
  overflow-y: auto;
}
.tableBox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}

.tableBox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.4);
}

.tableBox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.2);
}
.right-search {
  text-align: right;
}
</style>