<template>
  <div>
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" v-has size="small">新增</el-button>
      <el-dialog title="新增" :visible.sync="AddVisible" width="80%" @opened="addOPen">
         <el-form :model="formAdd">
         <el-form-item label="搜索标签" label-width="120px">
          <el-input v-model="searchlabels" @input="getLabelsList" clearable></el-input>
          <el-table
            :data="beautiLabelsList"
            @row-click="selectLabelsList"
            border
            style="width: 100%"
            v-if="searchlabels"
            class="labelTable"
          >
            <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
            <el-table-column prop="name" label="标签" align="center"></el-table-column>
            <el-table-column prop="labelName" label="上级目录" align="center"></el-table-column>
          </el-table>
          <div class="labelChoosed">
            已选标签：<br>
            <span
              v-for="(item,key) in choosedLabelsList"
            >
              {{key+1}}--{{item.name?item.name:item.enname}}
              <i class="el-icon-error" @click="deleteLabels(key)"></i>
            </span>
          </div>
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
         <el-form-item label="搜索标签" label-width="120px">
          <el-input v-model="searchlabels" @input="getLabelsList" clearable></el-input>
          <el-table
            :data="beautiLabelsList"
            @row-click="selectLabelsList"
            border
            style="width: 100%"
            v-if="searchlabels"
            class="labelTable"
          >
            <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
            <el-table-column prop="name" label="标签" align="center"></el-table-column>
            <el-table-column prop="labelName" label="上级目录" align="center"></el-table-column>
          </el-table>
          <div class="labelChoosed">
            已选标签：<br>
            <span
              v-for="(item,key) in choosedLabelsList"
            >
              {{key+1}}--{{item.name?item.name:item.enname}}
              <i class="el-icon-error" @click="deleteLabels(key)"></i>
            </span>
          </div>
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
      choosedBeautiColorList: [],//已选中色号列表
      searchlabels:"",//标签
      beautiLabelsList:[],//搜索标签列表
      choosedLabelsList:[],//选中标签
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
     // 标签操作
    getLabelsList(val){
      this.$axios.post('/management/admin/label!featuresList.action',this.$qs.stringify({
        page: 1,
            rows: 50,
            q: val
      })).then(res => {
          this.beautiLabelsList = res.data.rows;
          this.loading = false;
        });
    },
    //点击单选
    selectLabelsList(row){
 if (
        this.choosedLabelsList.some(item => {
          return item.id == row.id;
        })
      ) {
        this.$message.warning("请勿重复选中");
      } else {
        this.choosedLabelsList.push(row);
        // this.searchLabel = "";
      }
    },
    // 删除
    deleteLabels(val){
 this.choosedLabelsList.splice(val, 1);
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
      this.searchlabels=""
      this.choosedLabelsList=[];
    },
    //新增
    handleAdd() {
      var labels = ''
      for (let i = 0; i < this.choosedLabelsList.length; i++) {
        labels += `&labelId=` + this.choosedLabelsList[i].id;
      }
      this.$axios
        .post(
          `/management/admin/praise!save.action`,
          this.$qs.stringify(this.formAdd) +labels
        )
        .then(res => {
          if (res.status == 200) {
            if (res.status == 200) {
              this.AddVisible = false;
              this.$message.success(`添加成功`);
              this.formAdd = {};
              this.getlabelCountList(this.page1, this.row1);
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
         //获取选中标签
        this.$axios.post('/management/admin/label!featuresList.action',this.$qs.stringify({
          labelIds:row.labels.toString(),
          page:1,
          rows:50
        })).then(res =>{
          if(res.status==200){
            this.choosedLabelsList = res.data.rows
          }
        })
    },
    saveEdit() {
      var labels = ''
      for (let i = 0; i < this.choosedLabelsList.length; i++) {
        labels += `&labelId=` + this.choosedLabelsList[i].id;
      }
      this.$axios
        .post(
          `/management/admin/praise!save.action?id=${this.idx}`,
          this.$qs.stringify({
            type: this.formEdit.type,
            text: this.formEdit.text
          }) +labels
        )
        .then(res => {
          if (res.status == 200) {
            if (res.status == 200) {
              this.TableVisible = false;
              this.$message.success(`修改成功`);
              this.formEdit = {};
              this.searchlabels=""
      this.choosedLabelsList=[];
              this.getlabelCountList(this.page1, this.row1);
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
              this.getlabelCountList(this.page1, this.row1);
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
.labelTable {
  max-height: 250px;
  overflow-y: auto;
}
.labelTable::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}

.labelTable::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.4);
}

.labelTable::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.2);
}

.table.el-table td {
  padding: 10px 0;
}

.labelTable.el-table td {
  padding: 5px 0;
}
.labelChoosed span {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 15px;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.5s;
  line-height: 20px;
  border: 1px solid #ccc;
}

.labelChoosed span:hover {
  background: #eeeeee;
}
/* 产品清单预览 */
.content {
  width: 100%;
  height: 770px;
  position: relative;
  min-width: 1000px;
}
.phoneBorder {
  position: absolute;
  width: 300px;
  height: auto;
  left: 5%;
}
.content .productBox {
  position: absolute;
  width: 300px;
  height: auto;
  display: block;
  /* left: 60%; */
}

.content .productContent {
  position: absolute;
  height: 460px;
  width: 258px;
  top: 76px;
  left: 6.5%;
  overflow-y: auto;
}

.productContent .productTitle {
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
}

.productContent .productItem {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-left: 110px;
  min-height: 100px;
}

.productItem img {
  position: absolute;
  top: 15px;
  left: 10px;
  width: 80px;
  height: 80px;
}
.pro2 {
  left: 37%;
}
.content .cont2 {
  left: 38.5%;
}
.pro3 {
  left: 70%;
}
.content .cont3 {
  left: 71.5%;
}
.productItem p:nth-of-type(1) {
  font-size: 12px;
  line-height: 16px;
}

.productItem p:nth-of-type(2) {
  font-size: 10px;
  line-height: 16px;
}
.pageContent::-webkit-scrollbar,
.productContent::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 3px;
}

.pageContent::-webkit-scrollbar-thumb,
.productContent::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.7);
}

.pageContent::-webkit-scrollbar-track,
.productContent::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.2);
}
</style>