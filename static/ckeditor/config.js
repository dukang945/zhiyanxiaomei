/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

/*CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
};*/
// 直接将配置内容写在function函数内即可
CKEDITOR.editorConfig = function( config ) {
    config.uiColor = '#f1e4db';
    config.removePlugins = 'elementspath'; // 移除编辑器底部状态栏显示的元素路径和调整编辑器大小的按钮
    config.allowedContent = {
        $1: {
            // Use the ability to specify elements as an object.
            elements: CKEDITOR.dtd,
            attributes: true,
            styles: true,
            classes: true
        }
    }; // 是否允许使用源码模式进行编辑
    config.forcePasteAsPlainText = true; // 是否强制复制过来的文字去除格式
    // config.enterMode = CKEDITOR.ENTER_BR; // 编辑器中回车产生的标签CKEDITOR.ENTER_BR(<br>),CKEDITOR.ENTER_P(<p>),CKEDITOR_ENTER(回车)
    // 设置快捷键
    // 用于实现Ctrl + V进行粘贴
    // 无此配置，无法进行快捷键粘贴
    /*config.keystrokes = [
        [CKEDITOR.CTRL + 86 /!* V *!/, 'paste']
    ];*/

    // 设置快捷键，可能与浏览器冲突plugins/keystrokes/plugin.js
    // 用于实现Ctrl + V进行粘贴
    // 此配置将会启动粘贴之前进行过滤，若无此配置，将会出现粘贴之后才弹出过滤框
   /* config.blockedKeystrokes = [
        CKEDITOR.CTRL + 86
    ];*/

    // 图片上传相关
    config.filebrowserImageUploadUrl = '/management/admin/kcupload!uploadImg.action?type=goods_path'; // 图片上传路径
    config.filebrowserBrowseUrl = '/management/admin/kcupload!getImages.action?type=cosmetics_img'; // 图片上传路径
    config.image_previewText = ' '; // 图片信息面板预览区内容的文字内容，默认显示CKEditor自带的内容
    config.removeDialogTabs = 'image:advanced;image:Link'; // 移除图片上传页面的'高级','链接'页签
    // config.disallowedContent = 'img{width,height};img[width,height]';// 去掉上传图片默认设置原始图片高宽
    config.disallowedContent = 'img{width*,height*};img[width*,height*,style*]';
    // config.protectedSource.push(/<span[^>]*><\/span>/g);
    CKEDITOR.dtd.$removeEmpty.span = 0; // 避免span为空就删除了该标签

}
