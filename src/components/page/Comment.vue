<template>
  <div class="handel-box">
    <div class="handle-box">
        <el-input
      v-model="keyword"
      placeholder="内容搜索"
      style="width: 30%; "
      @keyup.enter.native.prevent="commentSearch"
    >
      <el-button slot="append" icon="el-icon-search" @click="commentSearch"></el-button>
    </el-input>
    <el-select
    v-model="title"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="请输入标题关键词"
    :remote-method="remoteMethod"
    :loading="loading"
    collapse-tags
    clearable
    style="width:400px">
    <el-option
      v-for="item in titleOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
    <el-select v-model="type" placeholder="请选择" clearable>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-button type="primary" @click="commentSearch">筛选</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" @filter-change="filterTag" @cell-dblclick="rowDblclick">
      <el-table-column prop="detailsId" label="ID编号" width="100" align="center"></el-table-column>
      <el-table-column prop="content" label="评论内容" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="所属文章" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.type==1">教程</span>
          <span v-if="scope.row.type==2">测评</span>
          <span v-if="scope.row.type==3">知识</span>
        </template>
      </el-table-column>
      <el-table-column prop="greatNumber" label="点赞数" align="center">
        <template slot-scope="scope">
          <span v-if="!isEdit[scope.row.index]">{{scope.row.greatNumber}}</span>
          <el-input v-model="scope.row.greatNumber" v-if="isEdit[scope.row.index]"  @blur="saveEdit(scope.row)"></el-input>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="sex" label="运营点赞数" align="center"></el-table-column> -->
      <el-table-column prop="time" label="评论时间" align="center">
        <template slot-scope="scope">{{ scope.row.time | formatTime('YMDHMS') }}</template>
      </el-table-column>
      <el-table-column prop="userName" label="评论者" align="center"></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        :filters="[{text:'启用',value:0},{text:'屏蔽',value:1}]"
      >
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==0">启用</el-tag>
          <el-tag type="danger" v-else-if="scope.row.status==1">屏蔽</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">置顶</el-button> -->
          <el-button
            type="error"
            size="small"
            @click="handleDelete(scope.row)"
          >{{scope.row.status==1?'启用':'屏蔽'}}</el-button>
          <!-- <el-button type="primary" size='small' @click="handleOnline(scope.$index, scope.row)" v-else>解禁</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      
      :page-sizes="[10, 20]"
      :page-size="10"
      layout="sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      data:'',
      title: [],
      titleOptions: [],
      list: [],
      isEdit:[],
      loading: false,
      page: 1,
      rows: 10,
      totalNum:0,
      keyword: "",
      status: "",
      type: [],
      options: [{
          value: 1,
          label: '教程'
        }, {
          value: 2,
          label: '测评'
        }, {
          value: 3,
          label: '知识'
        }],
    };
  },
  mounted() {
    this.getCommentList(1, 10);
    //  this.list = this.states.map(item => {
    //     return { value: item, label: item };
    //   });
  },
  methods: {
    //获取评论列表
    getCommentList(page, rows) {
        var title = ''
        console.log(this.title)
        if(this.title.length!=0){
            
            for (let index = 0; index < this.title.length; index++) {
                title +='&detailsId=' + this.title[index];  
            }
        }
      this.$axios
        .post(
          "/management/admin/new-comment!commentList.action",
          this.$qs.stringify({
            page,
            rows,
            keyword: this.keyword,
            status: this.status,
            type: this.type,
          }) + title
        )
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.tableData = res.data.rows;
            this.totalNum = res.data.total
          }
        });
    },
    //筛选
    filterTag(value) {
      if(Object.keys(value)[0][0]){
          this.status = Object.values(value)[0][0];
      }
      this.getCommentList(this.page, this.rows);
    },
     
      // 删除评论
    handleDelete(rows) {
      this.$confirm(`是否${rows.status == 0 ? "禁用" : "启用"}该记录`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (rows.status == 0) {
            this.$axios
              .post(
                `/management/admin/new-comment!delete.action`,
                this.$qs.stringify({
                  id: rows.rowkey
                })
              )
              .then(res => {
                if (res.status == 200) {
                  setTimeout(() => {
                    this.$message({
                      type: "success",
                      message: `屏蔽成功`
                    });
                    this.getCommentList(this.page, this.rows);
                    console.log(1);
                  }, 3000);
                }
              });
          } else {
            this.$axios
              .post(
                `/management/admin/new-comment!onlineComment.action`,
                this.$qs.stringify({
                  id: rows.rowkey
                })
              )
              .then(res => {
                if (res.status == 200) {
                  setTimeout(() => {
                    this.$message({
                      type: "success",
                      message: `恢复成功`
                    });
                    this.getCommentList(this.page, this.rows);
                  }, 3000);
                }
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
     //搜索
        commentSearch(){
            this.getCommentList(this.page, this.rows);
        },
        remoteMethod(query) {
        if(query!=''){
            console.log(query)
            this.$axios.post('/management/admin/new-comment!beautyDocList.action',this.$qs.stringify({filter_LIKES_name:query,page:1,rows:50})).then(res=>{
                if(res.status==200){
                    console.log(res)
                    this.titleOptions = res.data.rows
                }
            })
        }
      },
      //表格双击 可编辑
      rowDblclick(row, column, cell, event){
        console.log(row, column, cell, event)
        this.$set(row, 'index', 0)
        if(column.label == '点赞数') {
        /*第一个参数是你要改变的数组， 
          第二个参数是你要改变数组中对应值的索引，
          第三个参数是你要将这个值改成什么*/
        this.$set(this.isEdit, row.index, true)
        console.log(this.isEdit)
      }
      },
      saveEdit(row){
        console.log(row)
          this.$set(this.isEdit, row.index, false)
      },
         //分页
    handleSizeChange(val) {
      this.rows = val;
      this.getCommentList(this.page, this.rows);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getCommentList(this.page, this.rows);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>