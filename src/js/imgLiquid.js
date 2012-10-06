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
/**/
;(function($){
	$.fn.extend({
		imgLiquidLive: function(options) {
			return this.livequeryIL(function () {
				$(this).imgLiquid(options);
			});
		}
	});
})(jQuery);
/**/
;(function($){
	$.fn.extend({
		imgLiquid: function(options) {

			var isIE = /*@cc_on!@*/false;
			this.defaultOptions = {};

			//Settings
			//___________________________________________________________________
			var settings = $.extend({
				fill: true,
				verticalAlign: 'center', //'top' // 'bottom'
				horizontalAlign: 'center', // 'left' // 'right'
				fadeInTime: 0,
				responsive: false,
				delay: 0,
				/**/
				removeBoxBackground: true,
				ieFadeInDisabled: true,
				imageRendering: 'auto'
			}, this.defaultOptions, options);

			//ie OffAnims
			if (isIE && settings.ieFadeInDisabled) settings.fadeInTime = 0;
			if (settings.responsive)responsiveOn();

			//each
			//___________________________________________________________________
			return this.each(function($i) {
				
				//Obj
				var $imgBox = $(this);
				var $img = $('img:first', $imgBox);

				if (!$img || $img === null || $img.size() ===0){
					onError();
					return null;
				}

				//Alpha to 0
				$img.fadeTo(0, 0);
				$('img:not(:first)', $imgBox).css('display','none');
				$img.css({'visibility':'visible', 'display':'block', 'image-rendering':settings.imageRendering });
				if (isIE && settings.imageRendering == 'optimizeQuality') $img.css('-ms-interpolation-mode',  'bicubic');

				//OverFlow
				$imgBox.css({'overflow':'hidden'});

				//Status
				$img.ILprocessed = false;
				$img.ILerror = false;

				if (settings.responsive) {
					$imgBox.resize(function (e) {
						process($imgBox, $img);
					});
				}

				//OnLoad
				$img.load(function () {
					if (!Boolean($img.width() === 0 && $img.height() === 0)) {
						setTimeout(function() {
							process($imgBox, $img);
						}, $i * settings.delay );
					}
				}).each(function () {
					if (this.complete) $img.trigger('load');
				}).error(function () {
					onError();
					return null;
				});
				function onError(){
					$img.ILerror = true;
					$imgBox.css('visibility', 'hidden');
				}

                //Process
				//___________________________________________________________________
				function process($imgBox, $img){

					//Size OPTIMIZED
					if (settings.fill == ($imgBox.width() / $imgBox.height()) >= ($img.width() / $img.height())){
						$img.css({'width':'100%', 'height':'auto'});
					}else{
						$img.css({'width':'auto', 'height':'100%'});
					}

					//align X
					var ha = settings.horizontalAlign.toLowerCase();
					var hdif = $imgBox.width() - $img.width();
					var margL = 0;
					if (ha == 'center' || ha == 'middle')margL = hdif/2;
					if (ha == 'right') margL = hdif;
					$img.css('margin-left', Math.round(margL));

					//align Y
					var va = settings.verticalAlign.toLowerCase();
					var vdif = $imgBox.height() - $img.height();
					var margT = 0;
					if (va == 'center' || va == 'middle') margT = vdif/2;
					if (va == 'bottom') margT = vdif;
					$img.css('margin-top', Math.round(margT));

					//FadeIn
					if (!$img.ILprocessed){
						if (settings.removeBoxBackground) $imgBox.css('background-image', 'none');
						$img.fadeTo(settings.fadeInTime, 1);
						$img.ILprocessed = true;
					}
				}
			});
		}
	});
})(jQuery);
/*
* jQuery resize event - v1.1 - 3/14/2010
* http://benalman.com/projects/jquery-resize-plugin/
* Copyright (c) 2010 "Cowboy" Ben Alman
* Dual licensed under the MIT and GPL licenses.
* http://benalman.com/about/license/
*/
var responPluginInit = false;
function responsiveOn(){
	if (responPluginInit) return;
	responPluginInit = true;
	(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);
}
/** jQuery livequery - v1.1.1
* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
* Dual licensed under the MIT (MIT_LICENSE.txt)
* and GPL Version 2 (GPL_LICENSE.txt) licenses.
*
* Version: 1.1.1
* Requires jQuery 1.3+
* Docs: http://docs.jquery.com/Plugins/livequery
*/
(function($){$.extend($.fn,{livequeryIL:function(type,fn,fn2){var self=this,q;if($.isFunction(type)){fn2=fn,fn=type,type=undefined;}$.each($.livequeryIL.queries,function(i,query){if(self.selector==query.selector&&self.context==query.context&&type==query.type&&(!fn||fn.$lqguid==query.fn.$lqguid)&&(!fn2||fn2.$lqguid==query.fn2.$lqguid)){return(q=query)&&false;}});q=q||new $.livequeryIL(this.selector,this.context,type,fn,fn2);q.stopped=false;q.run();return this;},expire:function(type,fn,fn2){var self=this;if($.isFunction(type)){fn2=fn,fn=type,type=undefined;}$.each($.livequeryIL.queries,function(i,query){if(self.selector==query.selector&&self.context==query.context&&(!type||type==query.type)&&(!fn||fn.$lqguid==query.fn.$lqguid)&&(!fn2||fn2.$lqguid==query.fn2.$lqguid)&&!this.stopped){$.livequeryIL.stop(query.id);}});return this;}});$.livequeryIL=function(selector,context,type,fn,fn2){this.selector=selector;this.context=context;this.type=type;this.fn=fn;this.fn2=fn2;this.elements=[];this.stopped=false;this.id=$.livequeryIL.queries.push(this)-1;fn.$lqguid=fn.$lqguid||$.livequeryIL.guid++;if(fn2){fn2.$lqguid=fn2.$lqguid||$.livequeryIL.guid++;}return this;};$.livequeryIL.prototype={stop:function(){var query=this;if(this.type){this.elements.unbind(this.type,this.fn);}else{if(this.fn2){this.elements.each(function(i,el){query.fn2.apply(el);});}}this.elements=[];this.stopped=true;},run:function(){if(this.stopped){return;}var query=this;var oEls=this.elements,els=$(this.selector,this.context),nEls=els.not(oEls);this.elements=els;if(this.type){nEls.bind(this.type,this.fn);if(oEls.length>0){$.each(oEls,function(i,el){if($.inArray(el,els)<0){$.event.remove(el,query.type,query.fn);}});}}else{nEls.each(function(){query.fn.apply(this);});if(this.fn2&&oEls.length>0){$.each(oEls,function(i,el){if($.inArray(el,els)<0){query.fn2.apply(el);}});}}}};$.extend($.livequeryIL,{guid:0,queries:[],queue:[],running:false,timeout:null,checkQueue:function(){if($.livequeryIL.running&&$.livequeryIL.queue.length){var length=$.livequeryIL.queue.length;while(length--){$.livequeryIL.queries[$.livequeryIL.queue.shift()].run();}}},pause:function(){$.livequeryIL.running=false;},play:function(){$.livequeryIL.running=true;$.livequeryIL.run();},registerPlugin:function(){$.each(arguments,function(i,n){if(!$.fn[n]){return;}var old=$.fn[n];$.fn[n]=function(){var r=old.apply(this,arguments);$.livequeryIL.run();return r;};});},run:function(id){if(id!==undefined){if($.inArray(id,$.livequeryIL.queue)<0){$.livequeryIL.queue.push(id);}}else{$.each($.livequeryIL.queries,function(id){if($.inArray(id,$.livequeryIL.queue)<0){$.livequeryIL.queue.push(id);}});}if($.livequeryIL.timeout){clearTimeout($.livequeryIL.timeout);}$.livequeryIL.timeout=setTimeout($.livequeryIL.checkQueue,20);},stop:function(id){if(id!==undefined){$.livequeryIL.queries[id].stop();}else{$.each($.livequeryIL.queries,function(id){$.livequeryIL.queries[id].stop();});}}});$.livequeryIL.registerPlugin("append","prepend","after","before","wrap","attr","removeAttr","addClass","removeClass","toggleClass","empty","remove","html");$(function(){$.livequeryIL.play();});})(jQuery);
