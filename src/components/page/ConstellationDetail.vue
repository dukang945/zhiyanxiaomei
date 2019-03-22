<template>
  <div class="constellationDetailContent">
    <div class="handle-box">
      <el-button type="primary" @click="AddVisible = true" size="small">新增</el-button>
      <el-button type="primary" @click="onlineAll(0)" size="small">批量上线</el-button>
      <el-button type="primary" @click="onlineAll(1)" size="small">批量下线</el-button>
      <el-button type="primary" @click="deleteAll" size="small">批量删除</el-button>
      <el-date-picker
        v-model="value2"
        align="right"
        type="date"
        @change="onchange"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        size="small"
      ></el-date-picker>
      <el-dialog title="新增" :visible.sync="AddVisible" width="50%" :before-close="handleClose" :close-on-click-modal='false'>
        <el-form
          :label-position="labelPosition"
          label-width="150px"
          :rules="rules"
          ref="formLabelAdd"
          :model="formLabelAdd"
        >
          <el-form-item label="星座名称(日期-日期)" prop="constellationId">
            <el-select v-model="formLabelAdd.constellationId" placeholder="请选择">
              <el-option
                v-for="item in constellationList"
                :key="item.id"
                :label="item.text"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运势时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formLabelAdd.date"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="今日运势分数" prop="luckScore">
            <el-input v-model="formLabelAdd.luckScore"></el-input>
          </el-form-item>
          <el-form-item label="今日运势详情">
            <el-input v-model="formLabelAdd.details" type="textarea" autosize></el-input>
          </el-form-item>

          <el-form-item label="爱情运势">
            <el-input v-model="formLabelAdd.message1" type="textarea" autosize></el-input>
          </el-form-item>
          <el-form-item label="教程ID">
            <el-input v-model="formLabelAdd.lableId1"></el-input>
          </el-form-item>
          <el-form-item label="事业学业">
            <el-input v-model="formLabelAdd.message2" type="textarea" autosize></el-input>
          </el-form-item>
          <el-form-item label="教程ID">
            <el-input v-model="formLabelAdd.lableId2"></el-input>
          </el-form-item>
          <el-form-item label="财富运势">
            <el-input v-model="formLabelAdd.message3" type="textarea" autosize></el-input>
          </el-form-item>
          <el-form-item label="教程ID">
            <el-input v-model="formLabelAdd.lableId3"></el-input>
          </el-form-item>
          <el-form-item label="健康运势">
            <el-input v-model="formLabelAdd.message4" type="textarea" autosize></el-input>
          </el-form-item>
          <el-form-item label="教程ID">
            <el-input v-model="formLabelAdd.lableId4"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd('formLabelAdd')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="编号" width="100" align="center"></el-table-column>
      <el-table-column prop="constellation" label="星座名(日期-日期)" width="250" align="center"></el-table-column>
      <el-table-column prop="date" label="日期" width="200" align="center"></el-table-column>
      <el-table-column prop="luckScore" label="今日运势分数" width="120" align="center"></el-table-column>
      <el-table-column prop="details" label="今日运势详情" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.online==0">上线</el-tag>
          <el-tag type="danger" v-else-if="scope.row.online==1">下线</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="creatUser" label="创建人" width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" @click="online(scope.row)" v-if="scope.row.online==1">上线</el-button>
          <el-button size="small" v-else-if="scope.row.online==0" @click="online(scope.row)">下线</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            size="small"
            type="danger"
          >删除</el-button>
          <el-dialog title="编辑" :visible.sync="dialogVisible" width="50%" :close-on-click-modal='false'>
            <el-form
              :label-position="labelPosition"
              :rules="rules"
              ref="formLabelAlign"
              label-width="150px"
              :model="formLabelAlign"
            >
              <el-form-item label="星座名称(日期-日期)" prop="constellation">
                <el-select v-model="formLabelAlign.constellationId" placeholder="请选择">
                  <el-option
                    v-for="item in constellationList"
                    :key="item.id"
                    :label="item.text"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="运势时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="formLabelAlign.date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="今日运势分数">
                <el-input v-model="formLabelAlign.luckScore"></el-input>
              </el-form-item>
              <el-form-item label="今日运势详情">
                <el-input v-model="formLabelAlign.details" type="textarea" autosize></el-input>
              </el-form-item>

              <el-form-item label="爱情运势">
                <el-input v-model="formLabelAlign.message1" type="textarea" autosize></el-input>
              </el-form-item>
              <el-form-item label="教程ID">
                <el-input v-model="formLabelAlign.lableId1"></el-input>
                <el-tag v-if="formLabelAlign.docName1">{{formLabelAlign.docName1}}</el-tag>
              </el-form-item>
              <el-form-item label="事业学业">
                <el-input v-model="formLabelAlign.message2" type="textarea" autosize></el-input>
              </el-form-item>
              <el-form-item label="教程ID">
                <el-input v-model="formLabelAlign.lableId2"></el-input>
                <el-tag v-if="formLabelAlign.docName2">{{formLabelAlign.docName2}}</el-tag>
              </el-form-item>
              <el-form-item label="财富运势">
                <el-input v-model="formLabelAlign.message3" type="textarea" autosize></el-input>
              </el-form-item>
              <el-form-item label="教程ID">
                <el-input v-model="formLabelAlign.lableId3"></el-input>
                <el-tag v-if="formLabelAlign.docName3">{{formLabelAlign.docName3}}</el-tag>
              </el-form-item>
              <el-form-item label="健康运势">
                <el-input v-model="formLabelAlign.message4" type="textarea" autosize></el-input>
              </el-form-item>
              <el-form-item label="教程ID">
                <el-input v-model="formLabelAlign.lableId4"></el-input>
                <el-tag v-if="formLabelAlign.docName4">{{formLabelAlign.docName4}}</el-tag>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEdit('formLabelAlign')">确 定</el-button>
            </span>
          </el-dialog>
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
      tableData: [],
      value2: "",
      dialogVisible: false,
      AddVisible: false,
      labelPosition: "left",
      idx: -1,
      formLabelAlign: {
        date: "",
        constellation: "",
        luckScore: "",
        details: ""
      },
      formLabelAdd: {
        date: "",
        constellation: "",
        luckScore: "",
        details: ""
      },
      rules: {
        constellationId: [
          {
            required: true,
            message: "请选择星座",
            trigger: "change"
          }
        ],
        luckScore: [
          {
            required: true,
            message: "请输入运势分数",
            trigger: "blur"
          }
        ]
      },
      page: 1,
      row: 10,
      totalNum: 1,
      constellationList: [],
      multipleSelection: []
    };
  },
  components: {
    Pagination
  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      console.log(row);
      this.idx = row.id;
      const item = this.tableData[index];
      this.$axios.get(``);
      this.formLabelAlign = {
        id: item.id,
        date: item.date,
        constellationId: item.constellationId,
        constellation: item.constellation,
        luckScore: item.luckScore,
        details: item.details,
        lableId1: item.lableId1,
        lableId2: item.lableId2,
        lableId3: item.lableId3,
        lableId4: item.lableId4,
        docName1: item.docName1,
        docName2: item.docName2,
        docName3: item.docName3,
        docName4: item.docName4,
        docName1: item.docName1,
        message1: item.message1,
        message2: item.message2,
        message3: item.message3,
        message4: item.message4
      };
      this.dialogVisible = true;
    },
    //保存编辑
    saveEdit(formLabelAlign) {
      this.$refs[formLabelAlign].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              `/management/admin/constellation-details!save.action?id=${
                this.idx
              }`,
              this.$qs.stringify({
                constellationId: this.formLabelAlign.constellationId,
                luckScore: this.formLabelAlign.luckScore,
                details: this.formLabelAlign.details,
                date: this.formLabelAlign.date,
                lableId1: this.formLabelAlign.lableId1,
                message1: this.formLabelAlign.message1,
                lableId2: this.formLabelAlign.lableId2,
                message2: this.formLabelAlign.message2,
                lableId3: this.formLabelAlign.lableId3,
                message3: this.formLabelAlign.message3,
                lableId4: this.formLabelAlign.lableId4,
                message4: this.formLabelAlign.message4
              })
            )
            .then(res => {
              this.getData(this.page, this.row);
              this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            })
            .catch(e => {
              this.$message.error(`出了点问题-.-!`);
            });
          this.dialogVisible = false;
          this.formLabelAlign = {};
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除
    deleteRow(index, rows) {
      this.$confirm("确认删除？")
        .then(_ => {
          this.$axios
            .post(
              `/management/admin/constellation-details!delete.action?id=${
                rows[index].id
              }`
            )
            .then(res => {
              this.getData(this.page, this.row);
              this.$message.success(`删除成功`);
            })
            .catch(e => {
              this.$message.error(`出了点问题-.-!`);
            });
        })
        .catch(_ => {});
    },
    deleteAll(){
      this.$axios.get(`/management/admin/constellation-details!batchDelete.action?ids=${this.multipleSelection}`).then(res=>{
        if(res.status==200){
          this.$message.success(`删除成功`);
          this.getData(this.page, this.row);
        }
      })
    },
    // 新增
    handleAdd(formLabelAdd) {
      console.log(this.formLabelAdd);
      this.$refs[formLabelAdd].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/management/admin/constellation-details!save.action",
              this.$qs.stringify({
                constellationId: this.formLabelAdd.constellationId,
                luckScore: this.formLabelAdd.luckScore,
                details: this.formLabelAdd.details,
                date: this.formLabelAdd.date,
                lableId1: this.formLabelAdd.lableId1,
                message1: this.formLabelAdd.message1,
                lableId2: this.formLabelAdd.lableId2,
                message2: this.formLabelAdd.message2,
                lableId3: this.formLabelAdd.lableId3,
                message3: this.formLabelAdd.message3,
                lableId4: this.formLabelAdd.lableId4,
                message4: this.formLabelAdd.message4
              })
            )
            .then(res => {
              if (res.status == 200) {
                this.getData(this.page, this.row);
                this.$message.success(`添加成功`);
              }
            })
            .catch(e => {
              this.$message.error(`出了点问题-.-!`);
            });
          this.AddVisible = false;
          this.formLabelAdd = {};
          this.$refs[formLabelAdd].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 上下线
    online(rows) {
      this.$confirm(`是否${rows.online == 0 ? "禁用" : "启用"}该记录`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(
              `/management/admin/constellation-details!online.action`,
              this.$qs.stringify({
                id: rows.id,
                online: rows.online == 0 ? 1 : 0
              })
            )
            .then(res => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: `${rows.online == 0 ? "禁用" : "启用"}成功!`
                });
                this.getData(this.page, this.row);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    onlineAll(number){
      this.$axios.get(`/management/admin/constellation-details!batchOnLine.action?ids=${this.multipleSelection}&online=${number}`).then(res=>{
        if(res.status==200){
          this.$message({
                  type: "success",
                  message: `${number == 0 ? "上线" : "下线"}成功!`
                });
                this.getData(this.page, this.row);
        }
      })
    },
    //日期搜索
    onchange(val) {
      console.log(val);
      this.getData(this.page, this.row);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //多选
    handleSelectionChange(val){
      let chooseArr = []
      for (let index = 0; index < val.length; index++) {
        chooseArr.push(val[index].id)
      }
      this.multipleSelection = chooseArr.join(',')
      console.log(this.multipleSelection)
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
    // 请求数据
    getData(page, row) {
      var url = "/management/admin/constellation-details!list.action";
      this.$axios
        .get(url, {
          params: {
            filter_EQS_date: this.value2,
            page: page,
            rows: row
          }
        })
        .then(res => {
          this.totalNum = res.data.total;
          this.tableData = res.data.rows;
          console.log(this.tableData);
        });
    }
  },
  mounted() {
    // 获取列表
    this.getData(1, 10);
    // 获取星座列表
    this.$axios
      .get("/management/admin/constellation!comboData.action")
      .then(res => {
        this.constellationList = res.data;
        console.log(this.constellationList);
      });
  }
};
</script>

<style scoped>
</style>
