/*
jQuery Plugin: imgLiquid v0.63 / 06-10-12

ex:
	$(".imgLiquid").imgLiquid({fill:true});
or
	$(".imgLiquid").imgLiquidLive({fill:true});

//Settings:
	fill: true,
	verticalAlign: 'center', //'top' // 'bottom'
	horizontalAlign: 'center', // 'left' // 'right'
	fadeInTime: 0,
	responsive: false

Copyright (c) 2012 Alejandro Emparan (karacas), @krc_ale
Dual licensed under the MIT and GPL licenses.
*/
/*
* jQuery resize event - v1.1 - 3/14/2010
* http://benalman.com/projects/jquery-resize-plugin/
* Copyright (c) 2010 "Cowboy" Ben Alman
* Dual licensed under the MIT and GPL licenses.
* http://benalman.com/about/license/
*/
//
/** jQuery livequery - v1.1.1
* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
* Dual licensed under the MIT (MIT_LICENSE.txt)
* and GPL Version 2 (GPL_LICENSE.txt) licenses.
*
* Version: 1.1.1
* Requires jQuery 1.3+
* Docs: http://docs.jquery.com/Plugins/livequery
*/
(function(a){a.fn.extend({imgLiquidLive:function(b){return this.livequeryIL(function(){a(this).imgLiquid(b)})}})})(jQuery);(function($){$.fn.extend({imgLiquid:function(options){var isIE=/*@cc_on!@*/false;this.defaultOptions={};var settings=$.extend({fill:true,verticalAlign:"center",horizontalAlign:"center",fadeInTime:0,responsive:false,delay:0,removeBoxBackground:true,ieFadeInDisabled:true,imageRendering:"auto"},this.defaultOptions,options);if(isIE&&settings.ieFadeInDisabled){settings.fadeInTime=0}if(settings.responsive){responsiveOn()}return this.each(function($i){var $imgBox=$(this);var $img=$("img:first",$imgBox);if(!$img||$img===null||$img.size()===0){onError();return null}$img.fadeTo(0,0);$("img:not(:first)",$imgBox).css("display","none");$img.css({visibility:"visible",display:"block","image-rendering":settings.imageRendering});if(isIE&&settings.imageRendering=="optimizeQuality"){$img.css("-ms-interpolation-mode","bicubic")}$imgBox.css({overflow:"hidden"});$img.ILprocessed=false;$img.ILerror=false;if(settings.responsive){$imgBox.resize(function(e){process($imgBox,$img)})}$img.load(function(){if(!Boolean($img.width()===0&&$img.height()===0)){setTimeout(function(){process($imgBox,$img)},$i*settings.delay)}}).each(function(){if(this.complete){$img.trigger("load")}}).error(function(){onError();return null});function onError(){$img.ILerror=true;$imgBox.css("visibility","hidden")}function process($imgBox,$img){if(settings.fill==($imgBox.width()/$imgBox.height())>=($img.width()/$img.height())){$img.css({width:"100%",height:"auto"})}else{$img.css({width:"auto",height:"100%"})}var ha=settings.horizontalAlign.toLowerCase();var hdif=$imgBox.width()-$img.width();var margL=0;if(ha=="center"||ha=="middle"){margL=hdif/2}if(ha=="right"){margL=hdif}$img.css("margin-left",Math.round(margL));var va=settings.verticalAlign.toLowerCase();var vdif=$imgBox.height()-$img.height();var margT=0;if(va=="center"||va=="middle"){margT=vdif/2}if(va=="bottom"){margT=vdif}$img.css("margin-top",Math.round(margT));if(!$img.ILprocessed){if(settings.removeBoxBackground){$imgBox.css("background-image","none")}$img.fadeTo(settings.fadeInTime,1);$img.ILprocessed=true}}})}})})(jQuery);var responPluginInit=false;function responsiveOn(){if(responPluginInit){return}responPluginInit=true;(function(n,p,u){var w=n([]),s=n.resize=n.extend(n.resize,{}),o,l="setTimeout",m="resize",t=m+"-special-event",v="delay",r="throttleWindow";s[v]=250;s[r]=true;n.event.special[m]={setup:function(){if(!s[r]&&this[l]){return false}var a=n(this);w=w.add(a);n.data(this,t,{w:a.width(),h:a.height()});if(w.length===1){q()}},teardown:function(){if(!s[r]&&this[l]){return false}var a=n(this);w=w.not(a);a.removeData(t);if(!w.length){clearTimeout(o)}},add:function(b){if(!s[r]&&this[l]){return false}var c;function a(d,h,g){var f=n(this),e=n.data(this,t);e.w=h!==u?h:f.width();e.h=g!==u?g:f.height();c.apply(this,arguments)}if(n.isFunction(b)){c=b;return a}else{c=b.handler;b.handler=a}}};function q(){o=p[l](function(){w.each(function(){var d=n(this),a=d.width(),b=d.height(),c=n.data(this,t);if(a!==c.w||b!==c.h){d.trigger(m,[c.w=a,c.h=b])}});q()},s[v])}})(jQuery,this)}(function(a){a.extend(a.fn,{livequeryIL:function(e,d,c){var b=this,f;if(a.isFunction(e)){c=d,d=e,e=undefined}a.each(a.livequeryIL.queries,function(g,h){if(b.selector==h.selector&&b.context==h.context&&e==h.type&&(!d||d.$lqguid==h.fn.$lqguid)&&(!c||c.$lqguid==h.fn2.$lqguid)){return(f=h)&&false}});f=f||new a.livequeryIL(this.selector,this.context,e,d,c);f.stopped=false;f.run();return this},expire:function(e,d,c){var b=this;if(a.isFunction(e)){c=d,d=e,e=undefined}a.each(a.livequeryIL.queries,function(f,g){if(b.selector==g.selector&&b.context==g.context&&(!e||e==g.type)&&(!d||d.$lqguid==g.fn.$lqguid)&&(!c||c.$lqguid==g.fn2.$lqguid)&&!this.stopped){a.livequeryIL.stop(g.id)}});return this}});a.livequeryIL=function(b,d,f,e,c){this.selector=b;this.context=d;this.type=f;this.fn=e;this.fn2=c;this.elements=[];this.stopped=false;this.id=a.livequeryIL.queries.push(this)-1;e.$lqguid=e.$lqguid||a.livequeryIL.guid++;if(c){c.$lqguid=c.$lqguid||a.livequeryIL.guid++}return this};a.livequeryIL.prototype={stop:function(){var b=this;if(this.type){this.elements.unbind(this.type,this.fn)}else{if(this.fn2){this.elements.each(function(c,d){b.fn2.apply(d)})}}this.elements=[];this.stopped=true},run:function(){if(this.stopped){return}var d=this;var e=this.elements,c=a(this.selector,this.context),b=c.not(e);this.elements=c;if(this.type){b.bind(this.type,this.fn);if(e.length>0){a.each(e,function(f,g){if(a.inArray(g,c)<0){a.event.remove(g,d.type,d.fn)}})}}else{b.each(function(){d.fn.apply(this)});if(this.fn2&&e.length>0){a.each(e,function(f,g){if(a.inArray(g,c)<0){d.fn2.apply(g)}})}}}};a.extend(a.livequeryIL,{guid:0,queries:[],queue:[],running:false,timeout:null,checkQueue:function(){if(a.livequeryIL.running&&a.livequeryIL.queue.length){var b=a.livequeryIL.queue.length;while(b--){a.livequeryIL.queries[a.livequeryIL.queue.shift()].run()}}},pause:function(){a.livequeryIL.running=false},play:function(){a.livequeryIL.running=true;a.livequeryIL.run()},registerPlugin:function(){a.each(arguments,function(c,d){if(!a.fn[d]){return}var b=a.fn[d];a.fn[d]=function(){var e=b.apply(this,arguments);a.livequeryIL.run();return e}})},run:function(b){if(b!==undefined){if(a.inArray(b,a.livequeryIL.queue)<0){a.livequeryIL.queue.push(b)}}else{a.each(a.livequeryIL.queries,function(c){if(a.inArray(c,a.livequeryIL.queue)<0){a.livequeryIL.queue.push(c)}})}if(a.livequeryIL.timeout){clearTimeout(a.livequeryIL.timeout)}a.livequeryIL.timeout=setTimeout(a.livequeryIL.checkQueue,20)},stop:function(b){if(b!==undefined){a.livequeryIL.queries[b].stop()}else{a.each(a.livequeryIL.queries,function(c){a.livequeryIL.queries[c].stop()})}}});a.livequeryIL.registerPlugin("append","prepend","after","before","wrap","attr","removeAttr","addClass","removeClass","toggleClass","empty","remove","html");a(function(){a.livequeryIL.play()})})(jQuery);