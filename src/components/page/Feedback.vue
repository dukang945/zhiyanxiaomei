<template>
	<div class="feedBackContent">
		<el-table :data="tableData" border style="width: 100%" class='table'>
			<el-table-column type="index" label="序号" width="50" align='center'>
			</el-table-column>
			<el-table-column prop="id" label="id" width="80" align='center'>
			</el-table-column>
			<el-table-column prop="userId" label="用户ID" width='100' align='center'>
			</el-table-column>
			<el-table-column prop="time" label="日期" align='center' width='250'>
			</el-table-column>
			<el-table-column prop="text" label="评论内容" :show-overflow-tooltip="true">
			</el-table-column>
			<el-table-column label="操作" width="120">
				<template slot-scope="scope">
					<el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
					<el-dialog title="查看" :visible.sync="dialogVisible" width="30%">
						<el-form :label-position="labelPosition" label-width="80px" :model="formData">
							<el-form-item label="用户ID">
								<el-input v-model="formData.userId" readonly></el-input>
							</el-form-item>
							<el-form-item label="时间">
								<el-input v-model="formData.time" readonly></el-input>
							</el-form-item>
							<el-form-item label="内容">
								<el-input type="textarea" autosize readonly v-model="formData.text"></el-input>
							</el-form-item>
						</el-form>
					</el-dialog>
				</template>
			</el-table-column>
		</el-table>
		<Pagination :totalNum='totalNum' @change_Page='changePage' @change_Size='changeSize'></Pagination>
	</div>
</template>

<script>
	import Pagination from '@/components/module/Pagination.vue'
	export default {
		data() {
			return {
				tableData: [],
				totalNum: 0,
				page: 1,
				row: 10,
				dialogVisible:false,
				labelPosition:'left',
				formData:{
					id: '',
					text: '',
					time: '',
					userId: ''
				}
			}
		},
		components: {
			Pagination
		},
		methods: {
			handleEdit(index,row){
				const item=this.tableData[index];
				this.formData={
					id: item.id,
					text: item.text,
					time: item.time,
					userId: item.userId
				}
				this.dialogVisible=true
			},
			changePage(val) {
				this.page = val;
				this.getData(val, this.row)
			},
			changeSize(val) {
				this.row = val;
				this.getData(this.page, val)
			},
			getData(page, row) {
				var url = '/management/admin/userfeedback!list.action'
				this.$axios.get(url, {
					params: {
						page: page,
						rows: row
					}
				}).then(res => {
					this.totalNum = res.data.total;
					let tempTableData = res.data.rows.map(item => {
						return {
							id: item.id,
							text: item.text,
							time: item.time,
							userId: item.userId
						}
					})

					this.tableData = tempTableData
				})
			}
		},
		mounted() {
			this.getData(1, 10)
		}
	}
</script>

<style scoped>
	.feedBackContent {
		padding: 10px 20px;
		box-sizing: border-box;
	}
</style>
