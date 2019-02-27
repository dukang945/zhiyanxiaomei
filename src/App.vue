<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {

	}
</script>

<style>
	@import '~@/assets/icon/iconfont.css'
	* {
		margin: 0;
		padding: 0;
	}

	#app,
	html,
	body {
		margin: 0;
		height: 100%;
		color: #666;
	}

	.el-upload-list__item {
		transition: none;
	}

	.el-table__body tr.online {
		background-color: #c7e2ff;
	}

	.handle-box {
		padding-bottom: 20px;
	}

	.el-dialog {
		/* text-align-last: left; */
	}

	.el-table td {
		padding: 10px 0;
	}
	
</style>
