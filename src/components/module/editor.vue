<template>
	<div class="editorBox">
		<el-row>
			<el-col :span='24'>
				<textarea name="editor" rows="10" cols="80"></textarea>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import CKEDITOR from 'CKEDITOR';
	export default {
		name: 'editor',
		data() {
			return {
				text:''
			};
		},
		props:["editorText"],
		watch: {
			editorText:{
				handler:function(newValue, oldValue){
					this.text=newValue;
					console.log('watch执行了')
					CKEDITOR.instances.editor.setData(newValue)
				}
			},
			immediate:true
		},
		methods: {
			// 编辑器
			initCKEditor() {
				CKEDITOR.replace('editor', {
					height: 500,
					resize_maxHeight: 3000,
					filebrowserImageUploadUrl: '/management/admin/kcupload!uploadImg.action?type=goods_path',
					filebrowserBrowseUrl: '/management/admin/kcupload!getImages.action?type=cosmetics_img',
					extraPlugins: "beautyappraisal",
					toolbar: [{
							name: 'document',
							items: ['Source', '-', 'Templates']
						},
						{
							name: 'clipboard',
							items: ['-', 'Undo', 'Redo']
						},
						{
							name: 'insert',
							items: ['-', 'Image']
						},
						{
							name: 'paragraph',
							items: ['-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
						},
						{
							name: 'colors',
							items: ['-', 'TextColor']
						},
						{
							name: 'custome_plugin',
							items: ['productname', 'title', 'img', 'text', 'texteffects', 'bold']
						}, //将自定义插件加入toolbar
					],
					// contentsCss: './static/ckeditor/style.css',
					contentsCss: '../../../static/ckeditor/style.css',
					templates_replaceContent: false,
					autoUpdateElement: true,
					//编辑器中回车产生的标签
					enterMode: CKEDITOR.ENTER_BR, //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_P
					shiftEnterMode: CKEDITOR.ENTER_P
				});

			},
			// 增加模板
// 			addProductNameModel1() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="question">
// 						<p>产品名1</p>
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addProductNameModel2() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="product-title">
// 						<div class="main-title">
// 							<div class="ball1">&nbsp;</div>
// 							<div class="ball2">&nbsp;</div>
// 							<div class="ball3">&nbsp;</div>
// 							<p>产品名2</p>
// 						</div>
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addTitleModel1() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="question">
// 						<span class="line"></span>
// 						<span class="block"></span>
// 						<span>标题一</span>
// 						<span class="block"></span>
// 						<span class="line"></span>
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addTitleModel2() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="sub-container">
// 						<div class="subtitle">
// 							<span class="point-left"></span>
// 							<p>标题二</p>
// 							<span class="point-right"></span>
// 							<div class="subtitle-front">&nbsp;</div>
// 						</div>
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addTitleModel3() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="epilogue">
// 						<span>标题三</span>
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addTitleModel4() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="column column-svg">
// 						<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
// 						<span>标题四</span>
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addImgModel1() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="product1">
// 						<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addImgModel2() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="naked">
// 						<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
// 						<span>参考价格：540/30g</span>
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addImgModel3() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="comments-content">
// 						<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addImgModel4() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="product2">
// 						<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png" />
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addTextModel1() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="column">
// 						<p>文字1</p>
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addTextModel2() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="detail">
// 						<p>正文并排</p>
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addTextModel3() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="answer">
// 						<p>正文常规</p>
// 					</div>
// 					<br>`
// 				)
// 			},
// 			addTextModel4() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<h3>文字效果一</h3>
// 					<br>`
// 				)
// 			},
// 			addTextModel5() {
// 				CKEDITOR.instances.editor.insertHtml(
// 					`<div class="detail">
// 						<span>文字效果二</span>
// 					</div>
// 					<br>`
// 				)
// 			},
			// 获取editor内容
			getEditorData(){
				return CKEDITOR.instances.editor.getData()
			}
		},
		mounted() {
			let that=this;
			that.initCKEditor();
			console.log(that.text)
		}
	}
</script>

<style>

</style>
