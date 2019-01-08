<template>
	<div class="searchContent">
		<div class="handle-box">
			<el-button type="primary" @click="AddVisible = true" size='small'>新增</el-button>
			<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose">
				<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAdd">
					<el-form-item label="热搜名称">
						<el-input v-model="formLabelAdd.name"></el-input>
					</el-form-item>
					<el-form-item label="类型">
						<el-select v-model="formLabelAdd.type" placeholder="请选择类型">
							<el-option label="全部" value="0"></el-option>
							<el-option label="教程" value="1"></el-option>
							<el-option label="评测" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="排序号">
						<el-input v-model="formLabelAdd.sort"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="AddVisible = false">取 消</el-button>
					<el-button type="primary" @click="handleAdd">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="id" label="编号" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="name" label="热搜名称" align='center'>
			</el-table-column>
			<el-table-column prop="sort" label="排序号" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="type" label="类型" width="100" align='center'>
			</el-table-column>
			<el-table-column prop="online" label="审核状态" width="100" align='center'>
			</el-table-column>
			<el-table-column label="操作" width="300" align='center'>
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size='small' type="danger" class="el-icon-delete">删除</el-button>
					<el-button type="primary" size='small' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button @click.native.prevent="switchOnine(scope.$index)" size='small' type="primary" class="el-icon-sort">{{online}}</el-button>
				</template>
			</el-table-column>
		</el-table>	
		<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
				<el-form-item label="热搜名称">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="formLabelAlign.type" placeholder="请选择类型">
						<el-option label="全部" value="0"></el-option>
						<el-option label="教程" value="1"></el-option>
						<el-option label="评测" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序号">
					<el-input v-model="formLabelAlign.sort"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				AddVisible: false,
				labelPosition: "left",
				idx: -1,
				online:'上线',
				formLabelAlign: {
					id: '',
					name: '',
					text: ''
				},
				formLabelAdd: {
					name: '',
					text: ''
				},
				page: 1,
				row: 15,
				totalNum: 1
			}
		},
		methods: {
			// 编辑
			handleEdit(index, row) {
				this.idx = index;
				const item = this.tableData[index];
				this.formLabelAlign = {
					id: item.id,
					name: item.name,
					text: item.text
				};
				this.dialogVisible = true;
			},
			// 切换online状态
			switchOnine(index){
				console.log(index);
			},
			//保存编辑
			saveEdit() {
				this.$set(this.tableData, this.idx, this.formLabelAlign);
				this.dialogVisible = false;
				// 提交编辑请求
				// 下线 http://106.14.175.162:8081/management/admin/hot-bot!online.action?id=14&online=1
				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
			},
			//删除
			deleteRow(index, rows) {
				this.$confirm("确认删除？")
					.then(_ => {
						rows.splice(index, 1);
					})
					.catch(_ => {});
				// 提交删除请求
			},
			// 新增
			handleAdd() {
				this.tableData.push(this.formLabelAdd);
				this.AddVisible = false;
				// 提交新增请求

				this.$message.success(`添加成功`);
			},
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			// 请求数据
			getData() {
				var url = '/management/admin/hot-bot!list.action'
				this.$axios.get(url).then(res => {
					this.totalNum = res.data.total
					console.log(this.totalNum)
					this.tableData = res.data.rows
				})
			}
		},
		mounted() {
			this.getData()
		}

	}
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px
	}
</style>
