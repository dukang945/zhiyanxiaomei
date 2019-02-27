<template>
	<div class="logContent">
		<el-row>
			<el-col :span="6">
				<div class="activeUser">
					<el-button type="primary" size='small' @click="activeUser">活跃用户</el-button>
				</div>
			</el-col>
			<el-col :span="18">
				<el-form :inline="true" :model="form" class="right-search">
					<el-form-item label="操作人">
						<el-input v-model="form.user" size='small' placeholder="操作人"></el-input>
					</el-form-item>
					<el-form-item label="时间段">
						<el-col :span="11">
							<el-date-picker type="date" size='small' placeholder="选择日期" v-model="form.date1" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
						</el-col>
						<el-col class="line" :span="2" style='text-align: center;'>--</el-col>
						<el-col :span="11">
							<el-date-picker type="date" size='small' placeholder="选择日期" v-model="form.date2" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
						</el-col>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size='small' @click="onSubmit">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

		<el-table :data="tableData" border style="width: 100%" class='table'>
			<el-table-column type="index" label="序号" width="50">
			</el-table-column>
			<el-table-column prop="name" label="操作人" width="180">
			</el-table-column>
			<el-table-column prop="detail" label="操作内容">
			</el-table-column>
			<el-table-column prop="date" label="日期">
			</el-table-column>
			<el-table-column prop="action" label="动作">
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
				form: {
					user: '',
					date1: '',
					date2: '',
				},
				totalNum: 10,
				// currentPage:1,
				tableData: [],
				page: 1,
				row: 10
			}
		},
		components: {
			Pagination
		},
		methods: {
			activeUser() {
				console.log('活跃用户')
			},
			onSubmit() {
				console.log('提交搜索项目');
				console.log(this.form);
				this.getData(1, 10);
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
				var url = '/management/admin/logs!manageLogs.action'
				this.$axios.get(url, {
					params: {
						page: page,
						rows: row,
						userName: this.form.user,
						startTime: this.form.date1,
						endTime: this.form.date2
					}
				}).then(res => {
					this.totalNum = res.data.total
					console.log(this.totalNum)
					let tempTableData = [];
					res.data.rows.forEach(item => {
						tempTableData.push({
							date: item.time,
							name: item.createUser,
							detail: item.content,
							action: item.opertype
						})
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
	.right-search {
		text-align: right;
	}

	.pagination {
		margin: 20px 0;
	}
</style>
