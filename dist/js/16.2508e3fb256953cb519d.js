webpackJsonp([16],{"/uIK":function(n,e,t){e=n.exports=t("FZ+f")(!0),e.push([n.i,"\n.vux-demo {\n  text-align: center;\n}\n.logo {\n  width: 100px;\n  height: 100px\n}\n","",{version:3,sources:["D:/DATA/Vue/0625/CEE-VUE/src/bbs/test.vue"],names:[],mappings:";AACA;EACE,mBAAmB;CACpB;AACD;EACE,aAAa;EACb,aAAa;CACd",file:"test.vue",sourcesContent:["\n.vux-demo {\n  text-align: center;\n}\n.logo {\n  width: 100px;\n  height: 100px\n}\n"],sourceRoot:""}])},ge4Q:function(n,e,t){n.exports=t.p+"img/vux_logo.79cbb96.png"},kNEb:function(n,e,t){var o=t("s8tV");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);t("rjj0")("0d11a6d4",o,!0,{})},n5jD:function(n,e,t){"use strict";function o(n){t("kNEb")}function i(n){t("nv/u")}Object.defineProperty(e,"__esModule",{value:!0});var a=t("rHil"),r=t("1DHf"),l=t("kbG3"),A=t("wmxo"),c=(l.a,String,Boolean,Boolean,String,Number,String,Boolean,Number,Boolean,Array,{name:"x-switch",components:{InlineDesc:l.a},computed:{parent:function(){return this.$parent||{}},labelStyle:function(){var n=/<\/?[^>]*>/.test(this.title),e=Math.min(n?5:this.title.length+1,14)+"em";return Object(A.a)({display:"block",width:this.parent.labelWidth||e,textAlign:this.parent.labelAlign})},labelClass:function(){return{"vux-cell-justify":"justify"===this.parent.labelAlign}}},methods:{onClick:function(){this.$emit("on-click",!this.currentValue,this.currentValue)},toBoolean:function(n){if(this.valueMap){return 1===this.valueMap.indexOf(n)}return n},toRaw:function(n){return this.valueMap?this.valueMap[n?1:0]:n}},props:{title:{type:String,required:!0},disabled:Boolean,value:{type:[Boolean,String,Number],default:!1},inlineDesc:[String,Boolean,Number],preventDefault:Boolean,valueMap:{type:Array,default:function(){return[!1,!0]}}},data:function(){return{currentValue:this.toBoolean(this.value)}},watch:{currentValue:function(n){var e=this.toRaw(n);this.$emit("input",e),this.$emit("on-change",e)},value:function(n){this.currentValue=this.toBoolean(n)}}}),s=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"vux-x-switch weui-cell weui-cell_switch"},[t("div",{staticClass:"weui-cell__bd"},[t("label",{staticClass:"weui-label",class:n.labelClass,style:n.labelStyle,domProps:{innerHTML:n._s(n.title)}}),n._v(" "),n.inlineDesc?t("inline-desc",[n._v(n._s(n.inlineDesc))]):n._e()],1),n._v(" "),t("div",{staticClass:"weui-cell__ft"},[t("input",{directives:[{name:"model",rawName:"v-model",value:n.currentValue,expression:"currentValue"}],staticClass:"weui-switch",attrs:{type:"checkbox",disabled:n.disabled},domProps:{checked:Array.isArray(n.currentValue)?n._i(n.currentValue,null)>-1:n.currentValue},on:{change:function(e){var t=n.currentValue,o=e.target,i=!!o.checked;if(Array.isArray(t)){var a=n._i(t,null);o.checked?a<0&&(n.currentValue=t.concat([null])):a>-1&&(n.currentValue=t.slice(0,a).concat(t.slice(a+1)))}else n.currentValue=i}}}),n._v(" "),n.preventDefault?t("div",{staticClass:"vux-x-switch-overlay",on:{click:n.onClick}}):n._e()])])},h=[],u={render:s,staticRenderFns:h},C=u,p=t("VU/8"),d=o,E=p(c,C,!1,d,null,null),b=E.exports,w=t("Msp2"),f=(a.a,r.a,w.a,{components:{Group:a.a,Cell:r.a,XSwitch:b,Actionsheet:w.a},data:function(){return{msg:"Hello World!",show1:!1,show2:!1,show3:!1,show4:!1,show5:!1,show6:!1,show7:!1,show8:!1,menus1:{menu1:"Share to friends",menu2:"Share to timeline"},menus3:{"title.noop":"确定吗？",delete:'<span style="color:red">Delete</span>',sure:'<span style="color:black">sure</span>'},menus5:[{label:"actionsheet header",type:"info"},{label:"Primary",type:"primary",value:"primary",otherProp:"hey"},{label:"Warn",type:"warn",value:"warn"},{label:"Disabled",type:"disabled"},{label:"Default",value:"Default"}],menu7:{menu1:"北京烤鸭",menu2:"陕西油泼面",menu3:"西安肉夹馍"}}},methods:{click:function(n){console.log(n)},actionsheet1:function(n){console.log(n)},maskclick:function(){console.log("maskclick")},onDelete:function(){console.log("onDelete")}}}),m=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[n._m(0),n._v(" "),t("group",{attrs:{title:"cell demo"}},[t("cell",{attrs:{title:"VUX",value:"cool","is-link":""}}),n._v(" "),t("cell",{attrs:{title:"VUX",value:"cool","is-link":""}})],1),n._v(" "),t("group",[t("x-switch",{attrs:{title:"一般使用"},model:{value:n.show1,callback:function(e){n.show1=e},expression:"show1"}}),n._v(" "),t("x-switch",{attrs:{title:"Android Theme"},model:{value:n.show2,callback:function(e){n.show2=e},expression:"show2"}}),n._v(" "),t("x-switch",{attrs:{title:"Show cancel menu"},model:{value:n.show3,callback:function(e){n.show3=e},expression:"show3"}}),n._v(" "),t("x-switch",{attrs:{title:"使用数组定义菜单"},model:{value:n.show4,callback:function(e){n.show4=e},expression:"show4"}})],1),n._v(" "),t("group",{attrs:{title:"点击遮罩区域不自动关闭"}},[t("x-switch",{attrs:{title:"haoren"},model:{value:n.show5,callback:function(e){n.show5=e},expression:"show5"}})],1),n._v(" "),t("group",[t("x-switch",{attrs:{title:"显示提示文字"},model:{value:n.show6,callback:function(e){n.show6=e},expression:"show6"}}),n._v(" "),t("x-switch",{attrs:{title:"使用 header slot"},model:{value:n.show7,callback:function(e){n.show7=e},expression:"show7"}}),n._v(" "),t("x-switch",{attrs:{title:"不自动关闭"},model:{value:n.show8,callback:function(e){n.show8=e},expression:"show8"}})],1),n._v(" "),t("actionsheet",{attrs:{menus:n.menus1},on:{"on-click-menu":n.click},model:{value:n.show1,callback:function(e){n.show1=e},expression:"show1"}}),n._v(" "),t("actionsheet",{attrs:{menus:n.menu7,theme:"android"},on:{"on-click-menu":n.click},model:{value:n.show2,callback:function(e){n.show2=e},expression:"show2"}}),n._v(" "),t("actionsheet",{attrs:{menus:n.menus1,"close-on-clicking-mask":!0,"show-cancel":""},on:{"on-click-menu":n.actionsheet1,"on-click-mask":n.maskclick},model:{value:n.show3,callback:function(e){n.show3=e},expression:"show3"}}),n._v(" "),t("actionsheet",{attrs:{menus:n.menus5,"close-on-clicking-mask":!1},on:{"on-click-menu":n.click},model:{value:n.show4,callback:function(e){n.show4=e},expression:"show4"}}),n._v(" "),t("actionsheet",{attrs:{menus:n.menus5,"close-on-clicking-mask":!1},on:{"on-click-menu":n.click},model:{value:n.show5,callback:function(e){n.show5=e},expression:"show5"}}),n._v(" "),t("actionsheet",{attrs:{menus:n.menus3,"show-cancel":""},on:{"on-click-menu-delete":n.onDelete},model:{value:n.show6,callback:function(e){n.show6=e},expression:"show6"}}),n._v(" "),t("actionsheet",{attrs:{menus:n.menus1},model:{value:n.show7,callback:function(e){n.show7=e},expression:"show7"}},[t("p",{attrs:{slot:"header"},slot:"header"},[n._v("123")])])],1)},z=[function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("div",{staticClass:"vux-demo"},[o("img",{staticClass:"logo",attrs:{src:t("ge4Q")}}),n._v(" "),o("h1")])}],g={render:m,staticRenderFns:z},k=g,x=t("VU/8"),B=i,N=x(f,k,!1,B,null,null);e.default=N.exports},"nv/u":function(n,e,t){var o=t("/uIK");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);t("rjj0")("daaa5f2c",o,!0,{})},s8tV:function(n,e,t){e=n.exports=t("FZ+f")(!0),e.push([n.i,'/**\n* actionsheet\n*/\n/**\n* en: primary type text color of menu item\n* zh-CN: 菜单项primary类型的文本颜色\n*/\n/**\n* en: warn type text color of menu item\n* zh-CN: 菜单项warn类型的文本颜色\n*/\n/**\n* en: default type text color of menu item\n* zh-CN: 菜单项default类型的文本颜色\n*/\n/**\n* en: disabled type text color of menu item\n* zh-CN: 菜单项disabled类型的文本颜色\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* en: title and content\'s padding-left and padding-right\n* zh-CN: 标题及内容区域的 padding-left 和 padding-right\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* en: border radius\n* zh-CN: 圆角边框\n*/\n/**\n* en: font color\n* zh-CN: 字体颜色\n*/\n/**\n* en: margin-top value between previous button, not works when there is only one button\n* zh-CN: 与相邻按钮的 margin-top 间隙，只有一个按钮时不生效\n*/\n/**\n* en: button height\n* zh-CN: 按钮高度\n*/\n/**\n* en: the font color in disabled\n* zh-CN: disabled状态下的字体颜色\n*/\n/**\n* en: the font color in disabled\n* zh-CN: disabled状态下的字体颜色\n*/\n/**\n* en: font size\n* zh-CN: 字体大小\n*/\n/**\n* en: the font size of the mini type\n* zh-CN: mini类型的字体大小\n*/\n/**\n* en: the line height of the mini type\n* zh-CN: mini类型的行高\n*/\n/**\n* en: the background color of the warn type\n* zh-CN: warn类型的背景颜色\n*/\n/**\n* en: the background color of the warn type in active\n* zh-CN: active状态下，warn类型的背景颜色\n*/\n/**\n* en: the background color of the warn type in disabled\n* zh-CN: disabled状态下，warn类型的背景颜色\n*/\n/**\n* en: the background color of the default type\n* zh-CN: default类型的背景颜色\n*/\n/**\n* en: the font color of the default type\n* zh-CN: default类型的字体颜色\n*/\n/**\n* en: the background color of the default type in active\n* zh-CN: active状态下，default类型的背景颜色\n*/\n/**\n* en: the font color of the default type in disabled\n* zh-CN: disabled状态下，default类型的字体颜色\n*/\n/**\n* en: the background color of the default type in disabled\n* zh-CN: disabled状态下，default类型的背景颜色\n*/\n/**\n* en: the font color of the default type in active\n* zh-CN: active状态下，default类型的字体颜色\n*/\n/**\n* en: the background color of the primary type\n* zh-CN: primary类型的背景颜色\n*/\n/**\n* en: the background color of the primary type in active\n* zh-CN: active状态下，primary类型的背景颜色\n*/\n/**\n* en: the background color of the primary type in disabled\n* zh-CN: disabled状态下，primary类型的背景颜色\n*/\n/**\n* en: the font color of the plain primary type\n* zh-CN: plain的primary类型的字体颜色\n*/\n/**\n* en: the border color of the plain primary type\n* zh-CN: plain的primary类型的边框颜色\n*/\n/**\n* en: the font color of the plain primary type in active\n* zh-CN: active状态下，plain的primary类型的字体颜色\n*/\n/**\n* en: the border color of the plain primary type in active\n* zh-CN: active状态下，plain的primary类型的边框颜色\n*/\n/**\n* en: the font color of the plain default type\n* zh-CN: plain的default类型的字体颜色\n*/\n/**\n* en: the border color of the plain default type\n* zh-CN: plain的default类型的边框颜色\n*/\n/**\n* en: the font color of the plain default type in active\n* zh-CN: active状态下，plain的default类型的字体颜色\n*/\n/**\n* en: the border color of the plain default type in active\n* zh-CN: active状态下，plain的default类型的边框颜色\n*/\n/**\n* en: the font color of the plain warn type\n* zh-CN: plain的warn类型的字体颜色\n*/\n/**\n* en: the border color of the plain warn type\n* zh-CN: plain的warn类型的边框颜色\n*/\n/**\n* en: the font color of the plain warn type in active\n* zh-CN: active状态下，plain的warn类型的字体颜色\n*/\n/**\n* en: the border color of the plain warn type in active\n* zh-CN: active状态下，plain的warn类型的边框颜色\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* en: badge background color\n* zh-CN: badge的背景颜色\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: border radius color\n* zh-CN: 圆角边框的半径\n*/\n/**\n* en: border color\n* zh-CN: 边框的颜色\n*/\n/**\n* en: not used\n* zh-CN: 默认状态下圆角边框的颜色\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: default background color\n* zh-CN: 默认状态下的背景颜色\n*/\n/**\n* en: selected background color\n* zh-CN: 选中状态下的背景颜色\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/* alias */\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: default text color\n* zh-CN: 默认状态下的文本颜色\n*/\n/**\n* en: height\n* zh-CN: 元素高度\n*/\n/**\n* en: line height\n* zh-CN: 元素行高\n*/\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* popup-header\n*/\n/**\n* form-preview\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* en: margin-top of title\n* zh-CN: 标题的margin-top\n*/\n/**\n* en: margin-bottom of title\n* zh-CN: 标题的margin-bottom\n*/\n/**\n* en: margin-top of footer title\n* zh-CN: 底部标题的margin-top\n*/\n/**\n* en: margin-bottom of footer title\n* zh-CN: 底部标题的margin-bottom\n*/\n/**\n* toast\n*/\n/**\n* en: text size of content\n* zh-CN: 内容文本大小\n*/\n/**\n* en: default top\n* zh-CN: 默认状态下距离顶部的高度\n*/\n/**\n* en: position top\n* zh-CN: 顶部显示的高度\n*/\n/**\n* en: position bottom\n* zh-CN: 底部显示的高度\n*/\n/**\n* en: z-index\n* zh-CN: z-index\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* en: forward and backward arrows color\n* zh-CN: 前进后退的箭头颜色\n*/\n/**\n* en: text color of week highlight\n* zh-CN: 周末高亮的文本颜色\n*/\n/**\n* en: background color when selected\n* zh-CN: 选中时的背景颜色\n*/\n/**\n* en: text color when disabled\n* zh-CN: 禁用时的文本颜色\n*/\n/**\n* en: text color of today\n* zh-CN: 今天的文本颜色\n*/\n/**\n* en: font size of cell\n* zh-CN: 单元格的字号\n*/\n/**\n* en: background color\n* zh-CN: 背景颜色\n*/\n/**\n* en: size of date cell\n* zh-CN: 日期单元格尺寸大小\n*/\n/**\n* en: line height of date cell\n* zh-CN: 日期单元格的行高\n*/\n/**\n* en: text color of header\n* zh-CN: 头部的文本颜色\n*/\n/**\n* week-calendar\n*/\n/**\n* search\n*/\n/**\n* en: text color of cancel button\n* zh-CN: 取消按钮文本颜色\n*/\n/**\n* en: background color\n* zh-CN: 背景颜色\n*/\n/**\n* en: text color of placeholder\n* zh-CN: placeholder文本颜色\n*/\n/**\n* radio\n*/\n/**\n* en: checked icon color\n* zh-CN: 选中状态的图标颜色\n*/\n/**\n* loadmore\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* loading\n*/\n/**\n* en: z-index\n* zh-CN: z-index\n*/\n.weui-label {\n  display: block;\n  width: 105px;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.weui-input {\n  width: 100%;\n  border: 0;\n  outline: 0;\n  -webkit-appearance: none;\n  background-color: transparent;\n  font-size: inherit;\n  color: inherit;\n  height: 1.41176471em;\n  line-height: 1.41176471;\n}\n.weui-input::-webkit-outer-spin-button,\n.weui-input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.weui-textarea {\n  display: block;\n  border: 0;\n  resize: none;\n  width: 100%;\n  color: inherit;\n  font-size: 1em;\n  line-height: inherit;\n  outline: 0;\n}\n.weui-textarea-counter {\n  color: #B2B2B2;\n  text-align: right;\n}\n.weui-cell_warn .weui-textarea-counter {\n  color: #E64340;\n}\n.weui-toptips {\n  display: none;\n  position: fixed;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 5px;\n  font-size: 14px;\n  text-align: center;\n  color: #FFF;\n  z-index: 5000;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.weui-toptips_warn {\n  background-color: #E64340;\n}\n.weui-cells_form .weui-cell__ft {\n  font-size: 0;\n}\n.weui-cells_form .weui-icon-warn {\n  display: none;\n}\n.weui-cells_form input,\n.weui-cells_form textarea,\n.weui-cells_form label[for] {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.weui-cell_warn {\n  color: #E64340;\n}\n.weui-cell_warn .weui-icon-warn {\n  display: inline-block;\n}\n.weui-cell_switch {\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n.weui-switch {\n  -webkit-appearance: none;\n  appearance: none;\n}\n.weui-switch,\n.weui-switch-cp__box {\n  position: relative;\n  width: 52px;\n  height: 32px;\n  border: 1px solid #DFDFDF;\n  outline: 0;\n  border-radius: 16px;\n  box-sizing: border-box;\n  background-color: #DFDFDF;\n  -webkit-transition: background-color 0.1s, border 0.1s;\n  transition: background-color 0.1s, border 0.1s;\n}\n.weui-switch:before,\n.weui-switch-cp__box:before {\n  content: " ";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 50px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #FDFDFD;\n  -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\n  transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\n  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\n  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1), -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\n}\n.weui-switch:after,\n.weui-switch-cp__box:after {\n  content: " ";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #FFFFFF;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n  -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\n  transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\n  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\n  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35), -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\n}\n.weui-switch:checked,\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box {\n  /** vux **/\n  border-color: #04BE02;\n  background-color: #04BE02;\n  /** end vux **/\n}\n.weui-switch:checked:before,\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box:before {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n.weui-switch:checked:after,\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box:after {\n  -webkit-transform: translateX(20px);\n          transform: translateX(20px);\n}\n.weui-switch-cp__input {\n  position: absolute;\n  left: -9999px;\n}\n.weui-switch-cp__box {\n  display: block;\n}\n.weui-cell_switch .weui-cell__ft {\n  font-size: 0;\n  position: relative;\n}\ninput.weui-switch[disabled] {\n  opacity: 0.6;\n}\n.vux-x-switch.weui-cell_switch {\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n.vux-x-switch-overlay {\n  width: 60px;\n  height: 50px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  opacity: 0;\n}\n',"",{version:3,sources:["D:/DATA/Vue/0625/CEE-VUE/node_modules/vux/src/components/x-switch/index.vue"],names:[],mappings:"AAAA;;EAEE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;;EAGE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;;EAGE;AACF;;EAEE;AACF;;EAEE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF,WAAW;AACX;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;EAEE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;EAEE;AACF;;EAEE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;EAEE;AACF;;EAEE;AACF;;;EAGE;AACF;;;EAGE;AACF;;;EAGE;AACF;;EAEE;AACF;;;EAGE;AACF;;EAEE;AACF;;;EAGE;AACF;;EAEE;AACF;;;EAGE;AACF;EACE,eAAe;EACf,aAAa;EACb,sBAAsB;EACtB,sBAAsB;CACvB;AACD;EACE,YAAY;EACZ,UAAU;EACV,WAAW;EACX,yBAAyB;EACzB,8BAA8B;EAC9B,mBAAmB;EACnB,eAAe;EACf,qBAAqB;EACrB,wBAAwB;CACzB;AACD;;EAEE,yBAAyB;EACzB,UAAU;CACX;AACD;EACE,eAAe;EACf,UAAU;EACV,aAAa;EACb,YAAY;EACZ,eAAe;EACf,eAAe;EACf,qBAAqB;EACrB,WAAW;CACZ;AACD;EACE,eAAe;EACf,kBAAkB;CACnB;AACD;EACE,eAAe;CAChB;AACD;EACE,cAAc;EACd,gBAAgB;EAChB,iCAAiC;UACzB,yBAAyB;EACjC,OAAO;EACP,QAAQ;EACR,SAAS;EACT,aAAa;EACb,gBAAgB;EAChB,mBAAmB;EACnB,YAAY;EACZ,cAAc;EACd,sBAAsB;EACtB,sBAAsB;CACvB;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,aAAa;CACd;AACD;EACE,cAAc;CACf;AACD;;;EAGE,8CAA8C;CAC/C;AACD;EACE,eAAe;CAChB;AACD;EACE,sBAAsB;CACvB;AACD;EACE,iBAAiB;EACjB,oBAAoB;CACrB;AACD;EACE,yBAAyB;EACzB,iBAAiB;CAClB;AACD;;EAEE,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,0BAA0B;EAC1B,WAAW;EACX,oBAAoB;EACpB,uBAAuB;EACvB,0BAA0B;EAC1B,uDAAuD;EACvD,+CAA+C;CAChD;AACD;;EAEE,aAAa;EACb,mBAAmB;EACnB,OAAO;EACP,QAAQ;EACR,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,0BAA0B;EAC1B,0EAA0E;EAC1E,kEAAkE;EAClE,0DAA0D;EAC1D,iHAAiH;CAClH;AACD;;EAEE,aAAa;EACb,mBAAmB;EACnB,OAAO;EACP,QAAQ;EACR,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,0BAA0B;EAC1B,yCAAyC;EACzC,+EAA+E;EAC/E,uEAAuE;EACvE,+DAA+D;EAC/D,2HAA2H;CAC5H;AACD;;EAEE,WAAW;EACX,sBAAsB;EACtB,0BAA0B;EAC1B,eAAe;CAChB;AACD;;EAEE,4BAA4B;UACpB,oBAAoB;CAC7B;AACD;;EAEE,oCAAoC;UAC5B,4BAA4B;CACrC;AACD;EACE,mBAAmB;EACnB,cAAc;CACf;AACD;EACE,eAAe;CAChB;AACD;EACE,aAAa;EACb,mBAAmB;CACpB;AACD;EACE,aAAa;CACd;AACD;EACE,iBAAiB;EACjB,oBAAoB;CACrB;AACD;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,OAAO;EACP,WAAW;CACZ",file:"index.vue",sourcesContent:['/**\n* actionsheet\n*/\n/**\n* en: primary type text color of menu item\n* zh-CN: 菜单项primary类型的文本颜色\n*/\n/**\n* en: warn type text color of menu item\n* zh-CN: 菜单项warn类型的文本颜色\n*/\n/**\n* en: default type text color of menu item\n* zh-CN: 菜单项default类型的文本颜色\n*/\n/**\n* en: disabled type text color of menu item\n* zh-CN: 菜单项disabled类型的文本颜色\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* en: title and content\'s padding-left and padding-right\n* zh-CN: 标题及内容区域的 padding-left 和 padding-right\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* en: border radius\n* zh-CN: 圆角边框\n*/\n/**\n* en: font color\n* zh-CN: 字体颜色\n*/\n/**\n* en: margin-top value between previous button, not works when there is only one button\n* zh-CN: 与相邻按钮的 margin-top 间隙，只有一个按钮时不生效\n*/\n/**\n* en: button height\n* zh-CN: 按钮高度\n*/\n/**\n* en: the font color in disabled\n* zh-CN: disabled状态下的字体颜色\n*/\n/**\n* en: the font color in disabled\n* zh-CN: disabled状态下的字体颜色\n*/\n/**\n* en: font size\n* zh-CN: 字体大小\n*/\n/**\n* en: the font size of the mini type\n* zh-CN: mini类型的字体大小\n*/\n/**\n* en: the line height of the mini type\n* zh-CN: mini类型的行高\n*/\n/**\n* en: the background color of the warn type\n* zh-CN: warn类型的背景颜色\n*/\n/**\n* en: the background color of the warn type in active\n* zh-CN: active状态下，warn类型的背景颜色\n*/\n/**\n* en: the background color of the warn type in disabled\n* zh-CN: disabled状态下，warn类型的背景颜色\n*/\n/**\n* en: the background color of the default type\n* zh-CN: default类型的背景颜色\n*/\n/**\n* en: the font color of the default type\n* zh-CN: default类型的字体颜色\n*/\n/**\n* en: the background color of the default type in active\n* zh-CN: active状态下，default类型的背景颜色\n*/\n/**\n* en: the font color of the default type in disabled\n* zh-CN: disabled状态下，default类型的字体颜色\n*/\n/**\n* en: the background color of the default type in disabled\n* zh-CN: disabled状态下，default类型的背景颜色\n*/\n/**\n* en: the font color of the default type in active\n* zh-CN: active状态下，default类型的字体颜色\n*/\n/**\n* en: the background color of the primary type\n* zh-CN: primary类型的背景颜色\n*/\n/**\n* en: the background color of the primary type in active\n* zh-CN: active状态下，primary类型的背景颜色\n*/\n/**\n* en: the background color of the primary type in disabled\n* zh-CN: disabled状态下，primary类型的背景颜色\n*/\n/**\n* en: the font color of the plain primary type\n* zh-CN: plain的primary类型的字体颜色\n*/\n/**\n* en: the border color of the plain primary type\n* zh-CN: plain的primary类型的边框颜色\n*/\n/**\n* en: the font color of the plain primary type in active\n* zh-CN: active状态下，plain的primary类型的字体颜色\n*/\n/**\n* en: the border color of the plain primary type in active\n* zh-CN: active状态下，plain的primary类型的边框颜色\n*/\n/**\n* en: the font color of the plain default type\n* zh-CN: plain的default类型的字体颜色\n*/\n/**\n* en: the border color of the plain default type\n* zh-CN: plain的default类型的边框颜色\n*/\n/**\n* en: the font color of the plain default type in active\n* zh-CN: active状态下，plain的default类型的字体颜色\n*/\n/**\n* en: the border color of the plain default type in active\n* zh-CN: active状态下，plain的default类型的边框颜色\n*/\n/**\n* en: the font color of the plain warn type\n* zh-CN: plain的warn类型的字体颜色\n*/\n/**\n* en: the border color of the plain warn type\n* zh-CN: plain的warn类型的边框颜色\n*/\n/**\n* en: the font color of the plain warn type in active\n* zh-CN: active状态下，plain的warn类型的字体颜色\n*/\n/**\n* en: the border color of the plain warn type in active\n* zh-CN: active状态下，plain的warn类型的边框颜色\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* en: badge background color\n* zh-CN: badge的背景颜色\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: border radius color\n* zh-CN: 圆角边框的半径\n*/\n/**\n* en: border color\n* zh-CN: 边框的颜色\n*/\n/**\n* en: not used\n* zh-CN: 默认状态下圆角边框的颜色\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: default background color\n* zh-CN: 默认状态下的背景颜色\n*/\n/**\n* en: selected background color\n* zh-CN: 选中状态下的背景颜色\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/* alias */\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: default text color\n* zh-CN: 默认状态下的文本颜色\n*/\n/**\n* en: height\n* zh-CN: 元素高度\n*/\n/**\n* en: line height\n* zh-CN: 元素行高\n*/\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* popup-header\n*/\n/**\n* form-preview\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* en: margin-top of title\n* zh-CN: 标题的margin-top\n*/\n/**\n* en: margin-bottom of title\n* zh-CN: 标题的margin-bottom\n*/\n/**\n* en: margin-top of footer title\n* zh-CN: 底部标题的margin-top\n*/\n/**\n* en: margin-bottom of footer title\n* zh-CN: 底部标题的margin-bottom\n*/\n/**\n* toast\n*/\n/**\n* en: text size of content\n* zh-CN: 内容文本大小\n*/\n/**\n* en: default top\n* zh-CN: 默认状态下距离顶部的高度\n*/\n/**\n* en: position top\n* zh-CN: 顶部显示的高度\n*/\n/**\n* en: position bottom\n* zh-CN: 底部显示的高度\n*/\n/**\n* en: z-index\n* zh-CN: z-index\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* en: forward and backward arrows color\n* zh-CN: 前进后退的箭头颜色\n*/\n/**\n* en: text color of week highlight\n* zh-CN: 周末高亮的文本颜色\n*/\n/**\n* en: background color when selected\n* zh-CN: 选中时的背景颜色\n*/\n/**\n* en: text color when disabled\n* zh-CN: 禁用时的文本颜色\n*/\n/**\n* en: text color of today\n* zh-CN: 今天的文本颜色\n*/\n/**\n* en: font size of cell\n* zh-CN: 单元格的字号\n*/\n/**\n* en: background color\n* zh-CN: 背景颜色\n*/\n/**\n* en: size of date cell\n* zh-CN: 日期单元格尺寸大小\n*/\n/**\n* en: line height of date cell\n* zh-CN: 日期单元格的行高\n*/\n/**\n* en: text color of header\n* zh-CN: 头部的文本颜色\n*/\n/**\n* week-calendar\n*/\n/**\n* search\n*/\n/**\n* en: text color of cancel button\n* zh-CN: 取消按钮文本颜色\n*/\n/**\n* en: background color\n* zh-CN: 背景颜色\n*/\n/**\n* en: text color of placeholder\n* zh-CN: placeholder文本颜色\n*/\n/**\n* radio\n*/\n/**\n* en: checked icon color\n* zh-CN: 选中状态的图标颜色\n*/\n/**\n* loadmore\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* loading\n*/\n/**\n* en: z-index\n* zh-CN: z-index\n*/\n.weui-label {\n  display: block;\n  width: 105px;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.weui-input {\n  width: 100%;\n  border: 0;\n  outline: 0;\n  -webkit-appearance: none;\n  background-color: transparent;\n  font-size: inherit;\n  color: inherit;\n  height: 1.41176471em;\n  line-height: 1.41176471;\n}\n.weui-input::-webkit-outer-spin-button,\n.weui-input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.weui-textarea {\n  display: block;\n  border: 0;\n  resize: none;\n  width: 100%;\n  color: inherit;\n  font-size: 1em;\n  line-height: inherit;\n  outline: 0;\n}\n.weui-textarea-counter {\n  color: #B2B2B2;\n  text-align: right;\n}\n.weui-cell_warn .weui-textarea-counter {\n  color: #E64340;\n}\n.weui-toptips {\n  display: none;\n  position: fixed;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 5px;\n  font-size: 14px;\n  text-align: center;\n  color: #FFF;\n  z-index: 5000;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.weui-toptips_warn {\n  background-color: #E64340;\n}\n.weui-cells_form .weui-cell__ft {\n  font-size: 0;\n}\n.weui-cells_form .weui-icon-warn {\n  display: none;\n}\n.weui-cells_form input,\n.weui-cells_form textarea,\n.weui-cells_form label[for] {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.weui-cell_warn {\n  color: #E64340;\n}\n.weui-cell_warn .weui-icon-warn {\n  display: inline-block;\n}\n.weui-cell_switch {\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n.weui-switch {\n  -webkit-appearance: none;\n  appearance: none;\n}\n.weui-switch,\n.weui-switch-cp__box {\n  position: relative;\n  width: 52px;\n  height: 32px;\n  border: 1px solid #DFDFDF;\n  outline: 0;\n  border-radius: 16px;\n  box-sizing: border-box;\n  background-color: #DFDFDF;\n  -webkit-transition: background-color 0.1s, border 0.1s;\n  transition: background-color 0.1s, border 0.1s;\n}\n.weui-switch:before,\n.weui-switch-cp__box:before {\n  content: " ";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 50px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #FDFDFD;\n  -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\n  transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\n  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\n  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1), -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\n}\n.weui-switch:after,\n.weui-switch-cp__box:after {\n  content: " ";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #FFFFFF;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n  -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\n  transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\n  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\n  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35), -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\n}\n.weui-switch:checked,\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box {\n  /** vux **/\n  border-color: #04BE02;\n  background-color: #04BE02;\n  /** end vux **/\n}\n.weui-switch:checked:before,\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box:before {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n.weui-switch:checked:after,\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box:after {\n  -webkit-transform: translateX(20px);\n          transform: translateX(20px);\n}\n.weui-switch-cp__input {\n  position: absolute;\n  left: -9999px;\n}\n.weui-switch-cp__box {\n  display: block;\n}\n.weui-cell_switch .weui-cell__ft {\n  font-size: 0;\n  position: relative;\n}\ninput.weui-switch[disabled] {\n  opacity: 0.6;\n}\n.vux-x-switch.weui-cell_switch {\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n.vux-x-switch-overlay {\n  width: 60px;\n  height: 50px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  opacity: 0;\n}\n'],sourceRoot:""}])}});
//# sourceMappingURL=16.2508e3fb256953cb519d.js.map