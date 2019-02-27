<template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane :label="item.name" :name="item.date" v-for="(item,index) in tableData3" :key="index">
			<div class="handle-box">
				<el-button type="primary" size='small' @click="delAll">批量删除</el-button>
				<el-button type="primary" size='small' @click="AddVisible = true">新增</el-button>
				<el-dialog title="新增" :visible.sync="AddVisible" width="30%" :before-close="handleClose" append-to-body>
					<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
						<el-form-item label="名称">
							<el-input v-model="formLabelAdd.name"></el-input>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="AddVisible = false">取 消</el-button>
						<el-button type="primary" @click="handleAdd">确 定</el-button>
					</span>
				</el-dialog>
			</div>
			<el-table :data="tableData4" border style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column label="id" width="120" align="center">
					<template slot-scope="scope">{{ scope.row.date }}</template>
				</el-table-column>
				<el-table-column prop="name" label="名称" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="danger" size="small" class="el-icon-delete">删除</el-button>
						<el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
							<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
								<el-form-item label="名称">
									<el-input v-model="formLabelAlign.name"></el-input>
								</el-form-item>
							</el-form>
							<span slot="footer" class="dialog-footer">
								<el-button @click="dialogVisible = false">取 消</el-button>
								<el-button type="primary" @click="saveEdit">确 定</el-button>
							</span>
						</el-dialog>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
			 :page-sizes="[1, 2, 3, 4]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="4"></el-pagination>
		</el-tab-pane>
	</el-tabs>
</template>
<script>
	export default {
		data() {
			return {
				tableData3: [{
						date: "1",
						name: "唱歌"
					},
					{
						date: "2",
						name: "音乐"
					}
				],
				tableData4: [],
				activeName: '1',
				multipleSelection: [],
				del_list: [],
				dialogVisible: false,
				AddVisible: false,
				labelPosition: "left",
				idx: -1,
				currentPage4: 4,
				formLabelAlign: {
					date: "",
					name: ""
				},
				formLabelAdd: {
					date: "",
					name: ""
				}
			};
		},
		mounted() {
			this.tableData4 = [{
				date: "1",
				name: "q"
			}]
		},
		methods: {
			// 编辑
			handleEdit(index, row) {
				this.idx = index;
				const item = this.tableData4[index];
				this.formLabelAlign = {
					date: item.date,
					name: item.name
				};
				this.dialogVisible = true;
			},
			//保存编辑
			saveEdit() {
				this.$set(this.tableData3, this.idx, this.formLabelAlign);
				this.dialogVisible = false;
				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
			},
			//删除
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
			//  表单切换
			handleClick(tab, event) {
				if (tab.index == 0) {
					this.tableData4 = [{
						date: "1",
						name: "q"
					}]
				} else if (tab.index == 1) {
					this.tableData4 = [{
						date: "1",
						name: "w"
					}]
				}
			},
			// 新增

			handleAdd() {
				this.tableData3.push(this.formLabelAdd);
				this.AddVisible = false;
				this.$message.success(`添加成功`);
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
			// 批量删除
			delAll() {
				const length = this.multipleSelection.length;
				for (let index = 0; index < length; index++) {
					const element = this.multipleSelection[index];
					const i = this.tableData4.indexOf(element);
					this.tableData4.splice(i, 1);
				}
			},
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			// 分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	};
</script>
