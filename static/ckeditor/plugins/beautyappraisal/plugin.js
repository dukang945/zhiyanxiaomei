(function(){
    CKEDITOR.plugins.add('beautyappraisal',{
        requires: 'richcombo',
        init:function(editor){

            editor.addCommand('bold', {
                modes : {
                    wysiwyg : 1,
                    source : 1
                },
                exec : function(editor) {
                    var data = textReplace(editor);
                    //将内容放入到editor
                    editor.insertHtml('<span>' + data + '</span>\n');

                }
            });

            //注意myplug名字 和 图片路径
            editor.ui.addButton('bold',{
                label:'加粗',
                icon: this.path + "myplug.png",
                command:'bold'
            });

            var config = editor.config,
                lang = editor.lang.format;

            // Gets the list of tags from the settings.
            var tags = []; //new Array();
            //this.add('value', 'drop_text', 'drop_label');
            tags[0]=["<div class=\"product1\"><img src=\"https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png\"/></div>", "正文图", "正文图"];
            tags[1]=["<div class=\"naked\"><img src=\"https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png\"><span>参考价格：540/30g</span></div>", "图片1", "图片1"];
            tags[2]=["<div class=\"comments-content\"><img src=\"https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png\"></div>", "图片2", "图片2"];
            tags[3]=["<div class=\"product2\"><img src=\"https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png\"></div>", "表情包", "表情包"];


            var productTags = [];
            productTags[0] = ["productname1","产品名1","产品名1"];
            productTags[1] = ["productname2","产品名2","产品名2"];

            var titleTags =[];
            titleTags[0] = ["title1","标题1","标题1"];
            titleTags[1] = ["title2","标题2","标题2"];
            titleTags[2] = ["title3","标题3","标题3"];
            titleTags[3] = ["title4","标题4","标题4"];

            var textTags = [];
            textTags[0] = ["text1","文字1","文字1"];
            textTags[1] = ["text2","正文并排","正文并排"];
            textTags[2] = ["text3","正文常规","正文常规"];

            var texteffectsTags = [];
            texteffectsTags[0] = ["texteffects1","文字效果1","文字效果1"];
            texteffectsTags[1] = ["texteffects2","文字效果2","文字效果2"];
            // Create style objects for all defined styles.

            editor.ui.addRichCombo( 'img',
            {
                label : "图片",
                title :"图片样式",
                voiceLabel : "图片样式",
                className : 'cke_format',
                multiSelect : false,

                panel :
                {
                    css : [ config.contentsCss, CKEDITOR.getUrl( editor.skinPath + 'editor.css' ) ],
                    voiceLabel : lang.panelVoiceLabel
                },

                init : function()
                {
                    // this.startGroup( "Tokens" );

                    //this.add('value', 'drop_text', 'drop_label');
                    for (var this_tag in tags){
                        this.add(tags[this_tag][0], tags[this_tag][1], tags[this_tag][2]);
                    }
                },

                onClick : function( value )
                {
                    editor.focus();
                    editor.fire('saveSnapshot');
                    editor.insertHtml(value + "\r\n");
                    editor.fire('saveSnapshot');
                }
            });

            editor.ui.addRichCombo( 'productname',
            {
                label : "产品名",
                title :"产品名样式",
                voiceLabel : "产品名样式",
                className : 'cke_format',
                multiSelect : false,

                panel :
                {
                    css : [ config.contentsCss, CKEDITOR.getUrl( editor.skinPath + 'editor.css' ) ],
                    voiceLabel : lang.panelVoiceLabel
                },

                init : function()
                {
                    for (var this_tag in productTags){
                        this.add(productTags[this_tag][0], productTags[this_tag][1], productTags[this_tag][2]);
                    }
                },

                onClick : function( value )
                {
                    editor.focus();
                    editor.fire('saveSnapshot');

                    var textData  = textReplace(editor);
                    if(value == "productname1"){
                        editor.insertHtml("<div class=\"question\"><p>"+textData+"</p></div>\r\n");
                    }else if(value == "productname2"){
                        editor.insertHtml("<div class=\"product-title\"><div class=\"main-title\"><div class=\"ball1\"></div><div class=\"ball2\"></div><div class=\"ball3\"></div><p>"+textData+"</p></div></div>\r\n");
                    }

                    editor.fire('saveSnapshot');
                }
            });


            editor.ui.addRichCombo( 'title',
            {
                label : "标题",
                title :"标题样式",
                voiceLabel : "标题样式",
                className : 'cke_format',
                multiSelect : false,

                panel :
                    {
                        css : [ config.contentsCss, CKEDITOR.getUrl( editor.skinPath + 'editor.css' ) ],
                        voiceLabel : lang.panelVoiceLabel
                    },

                init : function()
                {
                    for (var this_tag in titleTags){
                        this.add(titleTags[this_tag][0], titleTags[this_tag][1], titleTags[this_tag][2]);
                    }
                },

                onClick : function( value )
                {
                    editor.focus();
                    editor.fire('saveSnapshot');

                    var textData  = textReplace(editor);
                    if(value == "title1"){
                        editor.insertHtml("<div class=\"question\"><span class=\"line\"></span><span class=\"block\"></span><span>"+textData+"</span><span class=\"block\"></span><span class=\"line\"></span></div>\r\n");
                    }else if(value == "title2"){
                        editor.insertHtml("<div class=\"sub-container\"><div class=\"subtitle\"><span class=\"point-left\"></span><p>"+textData+"</p><span class=\"point-right\"></span><div class=\"subtitle-front\"></div></div></div>\r\n");
                    }else if(value == "title3"){
                        editor.insertHtml("<div class=\"epilogue\"><span>"+textData+"</span></div>\r\n");
                    }else if(value == "title4"){
                        editor.insertHtml("<div class=\"column column-svg\"><img src=\"https://www.we-electron.com/uploadFiles/html/beauty_appraisal/img/zhanwei.png\"><span>"+textData+"</span></div>\r\n");
                    }

                    editor.fire('saveSnapshot');
                }
            });

            editor.ui.addRichCombo( 'text',
            {
                label : "文字",
                title :"文字样式",
                voiceLabel : "文字样式",
                className : 'cke_format',
                multiSelect : false,

                panel :
                    {
                        css : [ config.contentsCss, CKEDITOR.getUrl( editor.skinPath + 'editor.css' ) ],
                        voiceLabel : lang.panelVoiceLabel
                    },

                init : function()
                {
                    for (var this_tag in textTags){
                        this.add(textTags[this_tag][0], textTags[this_tag][1], textTags[this_tag][2]);
                    }
                },

                onClick : function( value )
                {
                    editor.focus();
                    editor.fire('saveSnapshot');

                    var htmlData  = htmlReplace(editor);
                    if(value == "text1"){
                        editor.insertHtml("<div class=\"column\">"+htmlData+"</div>\r\n");
                    }else if(value == "text2"){
                        editor.insertHtml("<div class=\"detail\">"+htmlData+"</div>\r\n");
                    }else if(value == "text3"){
                        editor.insertHtml("<div class=\"answer\">"+htmlData+"</div>\r\n");
                    }

                    editor.fire('saveSnapshot');
                }
            });

            editor.ui.addRichCombo( 'texteffects',
            {
                label : "文字效果",
                title :"文字效果样式",
                voiceLabel : "文字效果样式",
                className : 'cke_format',
                multiSelect : false,

                panel :
                    {
                        css : [ config.contentsCss, CKEDITOR.getUrl( editor.skinPath + 'editor.css' ) ],
                        voiceLabel : lang.panelVoiceLabel
                    },

                init : function()
                {
                    for (var this_tag in texteffectsTags){
                        this.add(texteffectsTags[this_tag][0], texteffectsTags[this_tag][1], texteffectsTags[this_tag][2]);
                    }
                },

                onClick : function( value )
                {
                    editor.focus();
                    editor.fire('saveSnapshot');

                    var textData  = textReplace(editor);
                    if(value == "texteffects1"){
                        editor.insertHtml("<h3>"+textData+"</h3>\r\n");
                    }else if(value == "texteffects2"){
                        editor.insertHtml("<div class=\"detail\"><span>"+textData+"</span></div>\r\n");
                    }

                    editor.fire('saveSnapshot');
                }
            });
        }
    });
})();


function htmlReplace(editor) {
    var data = "";
    // 获取CKEditor被选中的内容
    var mySelection = CKEDITOR.instances[editor.name].getSelection();

    var ranges = mySelection.getRanges();
    var el = new CKEDITOR.dom.element("div");
    for (var i = 0, len = ranges.length; i < len; ++i) {
        el.append(ranges[i].cloneContents());
    }
    var array = new Array();
    array = el.getHtml().split("<br>");
    for(var i = 0;i<array.length;i++){
        data += "<p>" + array[i] + "</p>";
    }
    return data;
}

function textReplace(editor) {
    var data;
    // 获取CKEditor被选中的内容
    var mySelection = CKEDITOR.instances[editor.name].getSelection();
    if (CKEDITOR.env.ie) {
        mySelection.unlock(true);
        data = mySelection.getNative().createRange().text;
    } else {
        data = mySelection.getNative();
    }
	console.log(data)
    return data;
}