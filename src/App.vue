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
* {
  margin: 0;
  padding: 0;
}
#app,
html,
body {
  
  height: 100%;
}

.el-upload-list__item {
		transition: none;
	}
.el-table__body tr.online {
		background-color: #c7e2ff;  
	}
.handle-box{
  padding-bottom: 20px;
}
</style>