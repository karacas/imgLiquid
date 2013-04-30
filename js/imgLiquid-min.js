/*
jQuery Plugin: imgLiquid v0.9.933 DEV / 30-04-13
jQuery plugin to resize images to fit in a container.
Copyright (c) 2012 Alejandro Emparan (karacas) @krc_ale
Dual licensed under the MIT and GPL licenses
https://github.com/karacas/imgLiquid

ex:
	$(".imgLiquid").imgLiquid({fill:true});

	//OPTIONS:

	>js
		fill: true,
		verticalAlign:		//'center' //'top' //'bottom'
		horizontalAlign:	//'center' //'left' //'right'

	>js callBakcs
		onStart:		function(){},
		onFinish:		function(){},
		onItemStart:	function(index, container, img){},
		onItemFinish:	function(index, container, img){}

	>hml5 data attr (overwrite all)
		data-imgLiquid-fill="true"
		data-imgLiquid-horizontalAlign="center"
		data-imgLiquid-verticalAlign="center"

*/
var imgLiquid=imgLiquid||{VER:"0.9.933"};imgLiquid.isIE= /*@cc_on!@*/ false;imgLiquid.bgs_Available=false;imgLiquid.bgs_CheckRunned=false;imgLiquid.injectCss=".imgLiquid {overflow: hidden;} .imgLiquid img {visibility:hidden;} body {/*background-color: #0f0 !important;*/}";(function(b){function a(){if(imgLiquid.bgs_CheckRunned){return}else{imgLiquid.bgs_CheckRunned=true}var c=b('<span style="background-size:cover" />');b("body").append(c);!function(){var d=c[0];if(!d||!window.getComputedStyle){return}var e=window.getComputedStyle(d,null);if(!e||!e.backgroundSize){return}imgLiquid.bgs_Available=(e.backgroundSize==="cover")}();c.remove()}b.fn.extend({imgLiquid:function(c){a();var d=this;this.defaults={fill:true,verticalAlign:"center",horizontalAlign:"center",useBackgroundSize:true,useDataHtmlAttr:true,responsive:true,delay:0,fadeInTime:0,removeBoxBackground:true,ieFadeInDisabled:true,hardPixels:true,responsiveCheckTime:500,timecheckvisibility:500,onStart:null,onFinish:null,onItemStart:null,onItemFinish:null,onItemError:null};this.options=c;this.settings=b.extend({},this.defaults,this.options);if(this.settings.onStart){this.settings.onStart()}return this.each(function(n){var e=b(this),f=b("img:first",e),i;if(f.length===0){k();return}if(!f.data("imgLiquid_settings")){i=b.extend({},d.settings,j())}else{i=b.extend({},f.data("imgLiquid_settings"),d.options)}f.data("imgLiquid_settings",i);if(i.onItemStart){i.onItemStart(n,e,f)}if(imgLiquid.bgs_Available&&i.useBackgroundSize){h()}else{o()}function h(){var q=(i.fill)?"cover":"contain",p=(i.horizontalAlign+" "+i.verticalAlign).toLowerCase();if(e.css("background-image").indexOf(encodeURI(f.attr("src")))===-1){e.css({"background-image":"url("+encodeURI(f.attr("src"))+")"})}e.css({"background-size":q,"background-position":p,"background-repeat":"no-repeat"});b("a:first",e).css({display:"block",width:"100%",height:"100%"});b("img",e).css({display:"none"});if(i.onItemFinish){i.onItemFinish(n,e,f)}l()}function o(){if(f.data("oldSrc")&&f.data("oldSrc")!==f.attr("src")){var q=b(f[0].outerHTML).removeAttr("style");q.data("imgLiquid_settings",f.data("imgLiquid_settings"));f.parent().prepend(q);f.remove();f=q;f[0].width=0;setTimeout(o,10);return}if(f.data("imgLiquid_oldProcessed")){m();return}f.data("imgLiquid_oldProcessed",false);f.data("oldSrc",f.attr("src"));b("img:not(:first)",e).css("display","none");e.css({overflow:"hidden"});f.fadeTo(0,0);f.removeAttr("width").removeAttr("height").css({visibility:"visible","max-width":"none","max-height":"none",width:"auto",height:"auto",display:"block"});f.on("error",k);f[0].onerror=k;function p(){if(f.data("imgLiquid_error")||f.data("imgLiquid_loaded")||f.data("imgLiquid_oldProcessed")){return}if(e.is(":visible")&&f[0].complete&&f[0].width>0&&f[0].height>0){f.data("imgLiquid_loaded",true);setTimeout(m,n*i.delay)}else{setTimeout(p,i.timecheckvisibility)}}p();g()}function g(){if(!i.responsive&&!f.data("imgLiquid_oldProcessed")){return}if(!f.data("imgLiquid_settings")){return}i=f.data("imgLiquid_settings");e.actualSize=e.get(0).offsetWidth+(e.get(0).offsetHeight/10000);if(e.sizeOld&&e.actualSize!==e.sizeOld){m()}e.sizeOld=e.actualSize;setTimeout(g,i.responsiveCheckTime)}function k(){if(i.onItemError){i.onItemError(n,e,f)}f.data("imgLiquid_error",true);l()}function j(){var s={};if(d.settings.useDataHtmlAttr){var r=e.attr("data-imgLiquid-fill"),p=e.attr("data-imgLiquid-horizontalAlign"),q=e.attr("data-imgLiquid-verticalAlign");if(r==="true"||r==="false"){s.fill=Boolean(r==="true")}if(p==="left"||p==="center"||p==="right"){s.horizontalAlign=p}if(q==="top"||q==="bottom"||q==="center"){s.verticalAlign=q}}if(imgLiquid.isIE&&d.settings.ieFadeInDisabled){s.fadeInTime=0}return s}function m(){var z,r,y,p,v,q,t,x,u,B,s=0,A=0;v=e.width();q=e.height();if(f.data("owidth")===undefined){f.data("owidth",f[0].width)}if(f.data("oheight")===undefined){f.data("oheight",f[0].height)}if(i.fill===(v/q)>=(f.data("owidth")/f.data("oheight"))){z="100%";r="auto";y=Math.floor(v);p=Math.floor(v*(f.data("oheight")/f.data("owidth")))}else{z="auto";r="100%";y=Math.floor(q*(f.data("owidth")/f.data("oheight")));p=Math.floor(q)}t=i.horizontalAlign.toLowerCase();u=v-y;if(t==="center"){A=u*0.5}if(t==="right"){A=u}x=i.verticalAlign.toLowerCase();B=q-p;if(x==="center"){s=B*0.5}if(x==="bottom"){s=B}if(i.hardPixels){z=y;r=p}f.css({width:z,height:r,"margin-left":Math.floor(A),"margin-top":Math.floor(s)});if(!f.data("imgLiquid_oldProcessed")){if(i.removeBoxBackground){e.css("background-image","none")}f.fadeTo(i.fadeInTime,1);f.data("imgLiquid_oldProcessed",true)}if(i.onItemFinish){i.onItemFinish(n,e,f)}l()}function l(){if(n===d.length-1){if(d.settings.onFinish){d.settings.onFinish()}}}})}})})(jQuery);!function(){var b=imgLiquid.injectCss,a=document.getElementsByTagName("head")[0],c=document.createElement("style");c.type="text/css";if(c.styleSheet){c.styleSheet.cssText=b}else{c.appendChild(document.createTextNode(b))}a.appendChild(c)}();