<template>
	<div class="slider">
		<el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab" @tab-click='clickTab'>
			<el-tab-pane v-for="(item) in editableTabs2" :key="item.name" :label="item.title" :name="item.name">
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				editableTabsValue2: '',
				editableTabs2: [],
				tabIndex: 0
			}
		},
		props: ['path'],
		watch: {
			path(val) {
			}
		},
		methods: {
			clickTab(val) {
				let path = val.name;
				this.$router.push(path);
				this.$emit('showPath',path)
			},
			addTab(path, pathName) {
				let tempArr = this.editableTabs2.map(item => {
					return item.title

				})
				if (tempArr.indexOf(pathName) == -1) {
					let newTabName = '';
					this.editableTabs2.push({
						title: pathName,
						name: path
					});
					this.editableTabsValue2 = path;
				} else {
					let index = tempArr.indexOf(pathName);
					this.editableTabsValue2 = this.editableTabs2[index].name;
				}
			},
			removeTab(targetName) {
				let tabs = [...this.editableTabs2];
				let activeName = this.editableTabsValue2;
				if (tabs.length == 1) {
					this.$router.push('/workspace');
					this.editableTabs2=[{
						title: '工作台',
						name: 'workspace'
					}];
					return
				}
				var tempIndex = -1;
				if (activeName === targetName) {
					tabs.forEach((item, index) => {
						if (item.name == targetName) {
							tempIndex = index
						}
					})
					tabs.splice(tempIndex, 1);
					this.editableTabs2 = tabs;
					this.editableTabsValue2 = tabs[tabs.length - 1].name;
					this.$router.push(`${tabs[tabs.length - 1].name}`)
				} else {
					tabs.forEach((item, index) => {
						if (item.name == targetName) {
							tempIndex = index
						}
					})
					tabs.splice(tempIndex, 1);
					this.editableTabs2 = tabs;
				}
			}
		}
	}
</script>

<style>

</style>
