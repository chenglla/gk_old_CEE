webpackJsonp([11],{"/9c+":function(n,t,i){t=n.exports=i("FZ+f")(!0),t.push([n.i,"\n.bbs-box {\n  background: #647cfb;\n  background: -webkit-linear-gradient(left, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);\n  background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);\n  -webkit-box-flex: 0;\n  -webkit-flex: none;\n          flex: none;\n  z-index: 1;\n}\n.bbs__add {\n  height: 12px;\n}\n.bbs__add .bbs__add-btn .iconfont {\n    position: absolute;\n    right: 14px;\n    top: 10px;\n    height: 20px;\n    font-size: 20px;\n    color: #fff;\n}\n.bbs_index .bbs-return {\n  height: 0;\n}\n","",{version:3,sources:["D:/DATA/Vue/0625/CEE-VUE/src/bbs/index.vue"],names:[],mappings:";AACA;EACE,oBAAoB;EACpB,8FAA8F;EAC9F,0FAA0F;EAC1F,oBAAoB;EACpB,mBAAmB;UACX,WAAW;EACnB,WAAW;CACZ;AACD;EACE,aAAa;CACd;AACD;IACI,mBAAmB;IACnB,YAAY;IACZ,UAAU;IACV,aAAa;IACb,gBAAgB;IAChB,YAAY;CACf;AACD;EACE,UAAU;CACX",file:"index.vue",sourcesContent:["\n.bbs-box {\n  background: #647cfb;\n  background: -webkit-linear-gradient(left, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);\n  background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);\n  -webkit-box-flex: 0;\n  -webkit-flex: none;\n          flex: none;\n  z-index: 1;\n}\n.bbs__add {\n  height: 12px;\n}\n.bbs__add .bbs__add-btn .iconfont {\n    position: absolute;\n    right: 14px;\n    top: 10px;\n    height: 20px;\n    font-size: 20px;\n    color: #fff;\n}\n.bbs_index .bbs-return {\n  height: 0;\n}\n"],sourceRoot:""}])},"18PN":function(n,t,i){t=n.exports=i("FZ+f")(!0),t.push([n.i,"\n.bbs-filter {\n  margin: 0;\n  font-size: 0;\n  background: #fff;\n}\n.bbs-filter.filter-com .vux-cell-box {\n    display: inline-block;\n    width: 50%;\n}\n.bbs-filter .vux-cell-box:before {\n    display: none;\n}\n.bbs-filter .weui-cell {\n    padding: 4px 15px;\n    height: 24px;\n}\n","",{version:3,sources:["D:/DATA/Vue/0625/CEE-VUE/src/bbs/bbsTab.vue"],names:[],mappings:";AACA;EACE,UAAU;EACV,aAAa;EACb,iBAAiB;CAClB;AACD;IACI,sBAAsB;IACtB,WAAW;CACd;AACD;IACI,cAAc;CACjB;AACD;IACI,kBAAkB;IAClB,aAAa;CAChB",file:"bbsTab.vue",sourcesContent:["\n.bbs-filter {\n  margin: 0;\n  font-size: 0;\n  background: #fff;\n}\n.bbs-filter.filter-com .vux-cell-box {\n    display: inline-block;\n    width: 50%;\n}\n.bbs-filter .vux-cell-box:before {\n    display: none;\n}\n.bbs-filter .weui-cell {\n    padding: 4px 15px;\n    height: 24px;\n}\n"],sourceRoot:""}])},BL6v:function(n,t,i){var e=i("idoU");"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);i("rjj0")("f4470e94",e,!0,{})},FzHO:function(n,t,i){"use strict";function e(n){i("BL6v"),i("OH1n")}function a(n){i("Xpf5")}function s(n){i("KR6O")}Object.defineProperty(t,"__esModule",{value:!0});var o=i("rdLu"),b=i.n(o),A=(String,{props:{curTab:String},mounted:function(){},watch:{},methods:{goTab:function(n,t){if("major"===t)return void this.$router.push({name:"major"});this.$emit("changeTab",t),-1!==["prov","spec","class","categ"].indexOf(t)&&(this.title="筛选"+n)}}}),l=function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{ref:"bbsWrapper",staticClass:"bbs-tab-box"},[i("div",{staticClass:"bbs-tab"},[i("div",{staticClass:"bbs-tab-item",class:{active:"time"===n.curTab},on:{click:function(t){n.goTab("最新","time")}}},[n._v("最新")]),n._v(" "),i("div",{staticClass:"bbs-tab-item",class:{active:"hot"===n.curTab},on:{click:function(t){n.goTab("最热","hot")}}},[n._v("最热")]),n._v(" "),i("div",{staticClass:"bbs-tab-item",class:{active:"my"===n.curTab},on:{click:function(t){n.goTab("我的","my")}}},[n._v("我的")])])])},r=[],c={render:l,staticRenderFns:r},d=c,f=i("VU/8"),p=e,h=f(A,d,!1,p,"data-v-37d23679",null),u=h.exports,g=i("GQaK"),x=i("gyMJ"),C=(Boolean,Boolean,Array,String,b.a.debounce(function(){this.$emit("nextPage")},50,!0),b.a.debounce(function(){this.$emit("reList")},50,!0),b.a.debounce(function(n,t){var i=this;return Object(x._4)(this.openid,n.takeid).then(function(n){i.$set(i.list[t],"istrue",n.data.data.istrue),i.$set(i.list[t],"hot",n.data.data.count)}),!1},500,!1),{data:function(){return{show1:!1,bbsScroll:null,istrue:!1,scrollTop:"",index:0}},props:{end:Boolean,loading:Boolean,list:Array,type:String},mounted:function(){this.init()},computed:{openid:function(){return this.$store.state.user.openid}},activated:function(){this.init()},deactivated:function(){void 0!==this.$refs.bbsList&&""!==this.$refs.bbsList.style.transform&&(this.scrollTop=this.$refs.bbsList.style.transform.split("0px, ")[1].split("px) scale(1)")[0],this.bbsScroll=null)},watch:{curTab:function(){this.scrollTop=0}},methods:{click:function(n){console.log(n)},init:function(){var n=this;this.$nextTick(function(){var t=n.scrollTop||0;n.bbsScroll=new g.a(n.$refs.bbsWrapper,{startY:t,click:!0,pullDownRefresh:{threshold:50,stop:40},pullUpLoad:{threshold:0,moreTxt:"加载中",noMoreTxt:"没有更多数据了"}}),n.bbsScroll.on("pullingUp",function(t){n.nextPage(),n.$nextTick(function(){n.bbsScroll&&n.bbsScroll.finishPullUp()})}),n.bbsScroll.on("pullingDown",function(){n.reList(),n.$nextTick(function(){n.bbsScroll&&n.bbsScroll.finishPullDown()})})})},nextPage:b.a.debounce(function(){this.$emit("nextPage")},50,!0),reList:b.a.debounce(function(){this.$emit("reList")},50,!0),dzan:b.a.debounce(function(n,t){var i=this;return Object(x._4)(this.openid,n.takeid).then(function(n){i.$set(i.list[t],"istrue",n.data.data.istrue),i.$set(i.list[t],"hot",n.data.data.count)}),!1},500,!1),goDetail:function(n,t){this.index=t,this.$emit("change",this.index),this.$router.push({name:"bbsDetail",params:{id:n}})}}}),B=function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{ref:"bbsWrapper",staticClass:"bbs-wrapper",style:{height:"calc(100% - 50px)"}},[i("div",{ref:"bbsList",staticClass:"bbs-list"},[n.loading?i("div",{staticClass:"list-loading"},[i("div",{staticClass:"loader"})]):n._e(),n._v(" "),n.loading||0!==n.list.length?n._e():i("div",{staticClass:"list-no-data"},[n._v("\n      暂无结果\n    ")]),n._v(" "),n._l(n.list,function(t,e){return n.loading||0===n.list.length?n._e():i("div",{staticClass:"bbs-item"},[i("div",{staticClass:"bbs-click-area",on:{click:function(i){n.goDetail(t.takeid,e)}}}),n._v(" "),i("div",{staticClass:"bbs-item__info",on:{click:function(i){n.goDetail(t.takeid,e)}}},[i("div",{staticClass:"bbs-item__content"},[n._v(n._s(t.ask))])]),n._v(" "),i("div",{staticClass:"bbs_item_basic_info"},[i("span",{staticClass:"bbs-item__img"},[i("img",{attrs:{src:t.pic,alt:""}})]),n._v(" "),i("span",{staticClass:"bbs-item__name"},[n._v(n._s(t.username))]),n._v(" "),i("div",{staticClass:"bbs-item__time"},[n._v(n._s(t.time))]),n._v(" "),i("div",{staticClass:"bbs-item__good",attrs:{href:"javascript:;"},on:{click:function(i){n.dzan(t,e)}}},[n._v(n._s(t.hot)+"\n          "),t.istrue?i("i",{staticClass:"iconfont iconxinaixin2"}):i("i",{staticClass:"iconfont iconxinaixin"})])])])})],2)])},m=[],v={render:B,staticRenderFns:m},E=v,_=i("VU/8"),w=a,k=_(C,E,!1,w,"data-v-4fe9566a",null),T=k.exports,y=(b.a.debounce(function(){this.nowpage=Math.max(this.page,this.nowpage),this.page=Math.floor(this.index/20),this.getBbs()}),b.a.debounce(function(){"time"===this.curTab?this.getTimeList():"hot"===this.curTab?this.getHotList():"my"===this.curTab&&this.$router.push({path:"/myqz"})},300,!0),{components:{bbsTab:u,bbsList:T},data:function(){return{curTab:"",loading:!1,key:"",placeholder:"搜索",list:[],req:{page:0},page:0,end:!1,index:0,nowpage:0}},computed:{openid:function(){return this.$store.state.user.openid}},mounted:function(){var n=this;this.curTab=this.$route.params.type,this.clearQuery(),this.getBbs(),this.loading=!0,this.$nextTick(function(){n.$refs.list.init()})},activated:function(){this.curTab=this.$route.params.type,0===this.list.length&&(this.loading=!0,this.getBbs())},watch:{$route:b.a.debounce(function(){this.nowpage=Math.max(this.page,this.nowpage),this.page=Math.floor(this.index/20),this.getBbs()}),curTab:function(){var n=this;this.clearQuery(),this.getBbs(),this.loading=!0,this.$nextTick(function(){n.$refs.list.init()})}},methods:{getIndex:function(n){this.index=n},clearQuery:function(){this.page=0,this.list=[],this.req={page:0}},gotoPage:function(n){"bbsAdd"===n&&this.clearQuery(),this.$router.push({name:n})},nextPage:function(){this.end||this.loading||(this.page=Math.max(this.nowpage,this.page),this.page++,this.getBbs())},getBbs:b.a.debounce(function(){"time"===this.curTab?this.getTimeList():"hot"===this.curTab?this.getHotList():"my"===this.curTab&&this.$router.push({path:"/myqz"})},300,!0),getTimeList:function(){var n=this;0===this.page&&(this.end=!1),Object(x.U)({page:this.page,openid:this.openid}).then(function(t){n.loading=!1,t.data.data.length<20&&(n.end=!0);for(var i=0;i<t.data.data.length;i++)n.list.splice(20*n.page+i,1,t.data.data[i]);console.log("list",n.list),n.$nextTick(function(){n.$refs.list.bbsScroll&&n.$refs.list.bbsScroll.refresh()})})},getHotList:function(){var n=this;0===this.page&&(this.end=!1),Object(x.E)({page:this.page,openid:this.openid}).then(function(t){n.loading=!1,t.data.data.length<20&&(n.end=!0);for(var i=0;i<t.data.data.length;i++)n.list.splice(20*n.page+i,1,t.data.data[i]);console.log("list",n.list),n.$nextTick(function(){n.$refs.list.bbsScroll&&n.$refs.list.bbsScroll.refresh()})})},getMyList:function(){var n=this;0===this.page&&(this.end=!1),Object(x.K)({openid:this.openid,page:this.page}).then(function(t){n.loading=!1,t.data.data.length<20&&(n.end=!0);for(var i=0;i<t.data.data.length;i++)n.list.splice(20*n.page+i,1,t.data.data[i]);n.$nextTick(function(){n.$refs.list.bbsScroll&&n.$refs.list.bbsScroll.refresh()})})},changeTab:function(n){this.page=0,this.scrollTop="0","my"===n?this.$router.push({name:"myqz"}):(this.curTab=n,this.$router.push({name:"bbs",params:{type:n}}))}}}),$=function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticStyle:{height:"100%",width:"100%",display:"flex","flex-direction":"column"}},[i("div",{staticClass:"bbs-box"},[i("div",{staticClass:"bbs__add bbs_index"},[i("div",{staticClass:"bbs-return return-box"},[i("div",{staticClass:"return__icon",on:{click:function(t){n.gotoPage("home")}}},[i("i",{staticClass:"iconfont iconleft-arrow"})]),n._v(" "),i("div",{staticClass:"bbs__add-btn",on:{click:function(t){n.gotoPage("bbsAdd")}}},[i("i",{staticClass:"iconfont iconiconjia"})])])]),n._v(" "),i("bbs-tab",{attrs:{curTab:n.curTab},on:{changeTab:n.changeTab}})],1),n._v(" "),i("bbs-list",{ref:"list",attrs:{list:n.list,loading:n.loading,end:n.end},on:{change:n.getIndex,nextPage:n.nextPage}})],1)},D=[],I={render:$,staticRenderFns:D},U=I,j=i("VU/8"),z=s,L=j(y,U,!1,z,null,null);t.default=L.exports},KR6O:function(n,t,i){var e=i("/9c+");"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);i("rjj0")("1c5f0844",e,!0,{})},OH1n:function(n,t,i){var e=i("18PN");"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);i("rjj0")("47688c0a",e,!0,{})},Xpf5:function(n,t,i){var e=i("h3z7");"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);i("rjj0")("7f57b887",e,!0,{})},h3z7:function(n,t,i){t=n.exports=i("FZ+f")(!0),t.push([n.i,"\n.bbs-wrapper[data-v-4fe9566a] {\n  position: relative;\n}\n.bbs-list[data-v-4fe9566a] {\n  -webkit-box-flex: 1;\n  -webkit-flex: auto;\n          flex: auto;\n  background: #fbf9fe;\n  padding: 12px 0;\n  margin: 10px 0;\n  position: relative;\n}\n\n/*.bbs-item {*/\n\n/*  margin: 0 20px 16px;*/\n\n/*  padding: 16px 20px;*/\n\n/*}*/\n.bbs-click-area[data-v-4fe9566a] {\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n.bbs-item__name[data-v-4fe9566a] {\n  /*display: inline-block;*/\n  /*font-size: 13px;*/\n  /*color: #555;*/\n  /*margin-bottom: 10px;*/\n  /*margin-left: 10px;*/\n  white-space: nowrap;\n  width: 40%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.bbs_item_basic_info[data-v-4fe9566a] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  margin-top: 10px;\n}\n.bbs-item__img[data-v-4fe9566a] {\n  /*flex: 2;*/\n  height: 30px;\n  width: 30px;\n  /*border: 1px solid #fff;*/\n  /*border-radius: 50%;*/\n  margin-right: 8px;\n  /*vertical-align: top;*/\n}\n.bbs-item__img img[data-v-4fe9566a] {\n    height: 100%;\n    overflow: hidden;\n    border-radius: 50%;\n}\n.bbs-item__name[data-v-4fe9566a] {\n  -webkit-box-flex: 6;\n  -webkit-flex: 6;\n          flex: 6;\n  margin-top: 9px;\n  /*vertical-align: top;*/\n}\n.bbs-item__time[data-v-4fe9566a] {\n  -webkit-box-flex: 5;\n  -webkit-flex: 5;\n          flex: 5;\n  margin-top: 9px;\n}\n.bbs-item__good[data-v-4fe9566a] {\n  -webkit-box-flex: 4;\n  -webkit-flex: 4;\n          flex: 4;\n}\n.bbs-item__content[data-v-4fe9566a] {\n  text-indent: 2em;\n  /*line-height: 25px;*/\n  font-size: 16px;\n}\n","",{version:3,sources:["D:/DATA/Vue/0625/CEE-VUE/src/bbs/bbsList.vue"],names:[],mappings:";AACA;EACE,mBAAmB;CACpB;AACD;EACE,oBAAoB;EACpB,mBAAmB;UACX,WAAW;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,eAAe;EACf,mBAAmB;CACpB;;AAED,eAAe;;AAEf,0BAA0B;;AAE1B,yBAAyB;;AAEzB,KAAK;AACL;EACE,mBAAmB;EACnB,eAAe;EACf,YAAY;EACZ,aAAa;EACb,QAAQ;EACR,OAAO;CACR;AACD;EACE,0BAA0B;EAC1B,oBAAoB;EACpB,gBAAgB;EAChB,wBAAwB;EACxB,sBAAsB;EACtB,oBAAoB;EACpB,WAAW;EACX,iBAAiB;EACjB,wBAAwB;CACzB;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,iBAAiB;CAClB;AACD;EACE,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,2BAA2B;EAC3B,uBAAuB;EACvB,kBAAkB;EAClB,wBAAwB;CACzB;AACD;IACI,aAAa;IACb,iBAAiB;IACjB,mBAAmB;CACtB;AACD;EACE,oBAAoB;EACpB,gBAAgB;UACR,QAAQ;EAChB,gBAAgB;EAChB,wBAAwB;CACzB;AACD;EACE,oBAAoB;EACpB,gBAAgB;UACR,QAAQ;EAChB,gBAAgB;CACjB;AACD;EACE,oBAAoB;EACpB,gBAAgB;UACR,QAAQ;CACjB;AACD;EACE,iBAAiB;EACjB,sBAAsB;EACtB,gBAAgB;CACjB",file:"bbsList.vue",sourcesContent:["\n.bbs-wrapper[data-v-4fe9566a] {\n  position: relative;\n}\n.bbs-list[data-v-4fe9566a] {\n  -webkit-box-flex: 1;\n  -webkit-flex: auto;\n          flex: auto;\n  background: #fbf9fe;\n  padding: 12px 0;\n  margin: 10px 0;\n  position: relative;\n}\n\n/*.bbs-item {*/\n\n/*  margin: 0 20px 16px;*/\n\n/*  padding: 16px 20px;*/\n\n/*}*/\n.bbs-click-area[data-v-4fe9566a] {\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n.bbs-item__name[data-v-4fe9566a] {\n  /*display: inline-block;*/\n  /*font-size: 13px;*/\n  /*color: #555;*/\n  /*margin-bottom: 10px;*/\n  /*margin-left: 10px;*/\n  white-space: nowrap;\n  width: 40%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.bbs_item_basic_info[data-v-4fe9566a] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  margin-top: 10px;\n}\n.bbs-item__img[data-v-4fe9566a] {\n  /*flex: 2;*/\n  height: 30px;\n  width: 30px;\n  /*border: 1px solid #fff;*/\n  /*border-radius: 50%;*/\n  margin-right: 8px;\n  /*vertical-align: top;*/\n}\n.bbs-item__img img[data-v-4fe9566a] {\n    height: 100%;\n    overflow: hidden;\n    border-radius: 50%;\n}\n.bbs-item__name[data-v-4fe9566a] {\n  -webkit-box-flex: 6;\n  -webkit-flex: 6;\n          flex: 6;\n  margin-top: 9px;\n  /*vertical-align: top;*/\n}\n.bbs-item__time[data-v-4fe9566a] {\n  -webkit-box-flex: 5;\n  -webkit-flex: 5;\n          flex: 5;\n  margin-top: 9px;\n}\n.bbs-item__good[data-v-4fe9566a] {\n  -webkit-box-flex: 4;\n  -webkit-flex: 4;\n          flex: 4;\n}\n.bbs-item__content[data-v-4fe9566a] {\n  text-indent: 2em;\n  /*line-height: 25px;*/\n  font-size: 16px;\n}\n"],sourceRoot:""}])},idoU:function(n,t,i){t=n.exports=i("FZ+f")(!0),t.push([n.i,"\n.green[data-v-37d23679] {\n  color: #72b7e4;\n}\n.bbs-tab-box[data-v-37d23679] {\n  padding: 0;\n  box-shadow: 0px 10px 10px 0px #647cfb20;\n}\n.bbs-tab[data-v-37d23679] {\n  padding: 4px 20px;\n  margin-top: -4px;\n  width: 270px;\n  min-width: 40px;\n  margin: auto;\n  text-align: center;\n}\n.bbs-tab-item[data-v-37d23679] {\n  display: inline-block;\n  padding: 4px 0;\n  margin-right: 18px;\n  width: 30px;\n  position: relative;\n  color: #fff;\n}\n.bbs-tab-item.active[data-v-37d23679]:after {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 4px;\n    width: 20px;\n    height: 2px;\n    background: #fff;\n}\n","",{version:3,sources:["D:/DATA/Vue/0625/CEE-VUE/src/bbs/bbsTab.vue"],names:[],mappings:";AACA;EACE,eAAe;CAChB;AACD;EACE,WAAW;EACX,wCAAwC;CACzC;AACD;EACE,kBAAkB;EAClB,iBAAiB;EACjB,aAAa;EACb,gBAAgB;EAChB,aAAa;EACb,mBAAmB;CACpB;AACD;EACE,sBAAsB;EACtB,eAAe;EACf,mBAAmB;EACnB,YAAY;EACZ,mBAAmB;EACnB,YAAY;CACb;AACD;IACI,YAAY;IACZ,mBAAmB;IACnB,UAAU;IACV,UAAU;IACV,YAAY;IACZ,YAAY;IACZ,iBAAiB;CACpB",file:"bbsTab.vue",sourcesContent:["\n.green[data-v-37d23679] {\n  color: #72b7e4;\n}\n.bbs-tab-box[data-v-37d23679] {\n  padding: 0;\n  box-shadow: 0px 10px 10px 0px #647cfb20;\n}\n.bbs-tab[data-v-37d23679] {\n  padding: 4px 20px;\n  margin-top: -4px;\n  width: 270px;\n  min-width: 40px;\n  margin: auto;\n  text-align: center;\n}\n.bbs-tab-item[data-v-37d23679] {\n  display: inline-block;\n  padding: 4px 0;\n  margin-right: 18px;\n  width: 30px;\n  position: relative;\n  color: #fff;\n}\n.bbs-tab-item.active[data-v-37d23679]:after {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 4px;\n    width: 20px;\n    height: 2px;\n    background: #fff;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=11.fd8e6d32eb7d4755e6c2.js.map