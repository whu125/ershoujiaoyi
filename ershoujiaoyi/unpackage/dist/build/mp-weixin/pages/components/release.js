"use strict";var e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-file-picker")+e.resolveComponent("uni-popup"))()}Math||((()=>"../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js")+(()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"))();const o={__name:"release",props:["placeholder"],setup(o){const r=o,l=e.reactive(["不限","信息学部","文理学部","工学部","医学部"]),i=e.ref(0),u=e.ref(""),a=e.ref(""),p=e.ref(""),t=e.reactive([]),n=e.reactive({width:100,height:100,border:{color:"#f7f7f7",width:2,style:"solid",radius:"2px"}}),s=e=>{i.value=e.target.value,u.value=l[i.value]};return(o,i)=>({a:r.placeholder,b:e.o(o.select),c:e.o(o.progress),d:e.o(o.success),e:e.o(o.fail),f:e.o((o=>e.isRef(t)?t.value=o:null)),g:e.p({fileMediatype:"image",mode:"grid",limit:3,"image-styles":n,modelValue:t}),h:e.o((e=>{return o="bottom",a.value=o,console.log(a.value),void p.value.open(a.value);var o})),i:"left"===a.value||"right"===a.value?1:"",j:e.sr(p,"3950398f-1",{k:"popup"}),k:e.o(o.change),l:e.p({"background-color":"#fff"}),m:e.t(u.value),n:l,o:e.o(s)})}};var r=e._export_sfc(o,[["__scopeId","data-v-3950398f"]]);wx.createComponent(r);