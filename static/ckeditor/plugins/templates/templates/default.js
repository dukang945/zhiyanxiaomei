/*
 Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.addTemplates("default", {
    imagesPath: CKEDITOR.getUrl(CKEDITOR.plugins.getPath("templates") + "templates/images/"),
    templates: [
        {
            title: "单品栏目",
            image: "template3.gif",
            description: "单品栏目模板",
            html: '<p class="menu">请输入栏目名称</p>\r\n'
        },
        {
            title: "文字模板",
            image: "template3.gif",
            description: "文字模板",
            html: '<p class="intro">请输入文字</p>\r\n'
        },
        {
            title: "图片模板",
            image: "template3.gif",
            description: "图片模板",
            html: '<div class="image"><img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png"/></div>\r\n'
        },
        {
            title: "产品栏目",
            image: "template3.gif",
            description: "产品栏目的模板",
            html: '<div class="column">\n' +
            '\t\t<div class="verticalLine"></div>\n' +
            '\t\t<span>请输入产品栏目</span>\n' +
            '\t</div>\r\n'
        },
        {
            title: "吐槽的优缺点栏",
            image: "template3.gif",
            description: "吐槽的优缺点栏的模板",
            html: '<p class="merit">请输入吐槽的优缺点栏</p>\r\n'
        },
        {
            title: "引言栏",
            image: "template3.gif",
            description: "引言栏的模板",
            html: '<p class="question">请输入引言栏</p>\r\n'
        }
        /*{
            title: "单品模板",
            image: "template3.gif",
            description: "单产品的模板",
            html: '<div class="menu">\n' +
            '\t\t\t<span>质地评测</span>\n' +
            '\t\t</div>\n' +
            '\t\t<div class="evaluating">\n' +
            '\t\t\t<p>\n' +
            '\t\t\t\t请输入质地评测文字内容\n' +
            '\t\t\t</p>\n' +
            '\t\t\t<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png"/>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="menu">\n' +
            '\t\t\t<span>使用方法</span>\n' +
            '\t\t</div>\n' +
            '\t\t<div class="usage">\n' +
            '\t\t\t<p>\n' +
            '\t\t\t\t请输入使用方法文字内容\n' +
            '\t\t\t</p>\n' +
            '\t\t\t<img src="https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png"/>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="menu">\n' +
            '\t\t\t<span>使用效果</span>\n' +
            '\t\t</div>\n' +
            '\t\t<div class="effect">\n' +
            '\t\t\t<p>\n' +
            '\t\t\t\t请输入使用效果文字内容\n' +
            '\t\t\t</p>\n' +
            '\t\t</div>'
        }*/
    ]
});