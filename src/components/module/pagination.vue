<template>
	<div class="pagination">
		<el-pagination class='pagination' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
		:page-sizes="[10, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentPage:1,
				total:1
			};
		},
		props:['totalNum'],
		watch:{
			totalNum(val){
				this.total=val
			}
		},
		methods:{
			handleSizeChange(val) {
				this.$emit('change_Size',val)
			},
			handleCurrentChange(val) {
				this.$emit('change_Page',val)
			}
		}
	}
</script>

<style scoped="scoped">
.pagination{
	margin: 20px 0 10px;
}
</style>
