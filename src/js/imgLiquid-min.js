/*
	jQuery Plugin: imgLiquid v0.6
	@krc_ale
	
		ex:
		$(".imgLiquid").imgLiquid({fill:true});

		//Settings:
		fill: true,
		verticalAlign: 'center', //'top' // 'bottom'
		horizontalAlign: 'center', // 'left' // 'right'
		fadeInTime: 0,
		responsive: false,
		delay: 0,


	Copyright (c) 2012 Alejandro Emparan (karacas), @krc_ale
	
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
//
/*
* jQuery resize event - v1.1 - 3/14/2010
* http://benalman.com/projects/jquery-resize-plugin/
* Copyright (c) 2010 "Cowboy" Ben Alman
* Dual licensed under the MIT and GPL licenses.
* http://benalman.com/about/license/
*/
(function($){$.fn.extend({imgLiquid:function(options){var isIE=/*@cc_on!@*/false;this.defaultOptions={};var settings=$.extend({fill:true,fadeInTime:0,verticalAlign:"center",horizontalAlign:"center",delay:0,removeBoxBackground:true,ieFadeOff:true,imageRendering:"auto",responsive:false},this.defaultOptions,options);if(isIE&&settings.ieFadeOff){settings.fadeInTime=0}if(settings.responsive){responsiveOn()}return this.each(function($i){var $imgBox=$(this);var $img=$("img:first",$imgBox);$img.fadeTo(0,0);$img.css("visibility","visible");$img.css("display","block");$img.css("image-rendering",settings.imageRendering);if(settings.imageRendering=="optimizeQuality"){$img.css("-ms-interpolation-mode","bicubic")}$imgBox.css("display","block");$imgBox.css("overflow","hidden");$img.ILrunned=false;$img.ILprocessed=false;$img.ILerror=false;$img.ILloaded=false;if(settings.responsive){$imgBox.resize(function(e){var $$imgBox=$imgBox;var $$img=$("img:first",$$imgBox);process($$imgBox,$$img)})}$img.load(function(){if(!Boolean($img.width()===0&&$img.height()===0)){$img.ILloaded=true;setTimeout(function(){process($imgBox,$img);$img.ILrunned=true},$i*settings.delay)}}).each(function(){if(this.complete){$img.trigger("load")}});$img.error(function(){$img.ILerror=true;$img.ILrunned=true;$imgBox.css("visibility","hidden");return null});function process($imgBox,$img){var imgBoxProp=$imgBox.width()/$imgBox.height();var imgProp=$img.width()/$img.height();if(settings.fill){if(imgBoxProp>=imgProp){$img.css("width","100%");$img.css("height","auto")}else{$img.css("width","auto");$img.css("height","100%")}}else{if(imgBoxProp<=imgProp){$img.css("width","100%");$img.css("height","auto")}else{$img.css("width","auto");$img.css("height","100%")}}settings.horizontalAlign=settings.horizontalAlign.toLowerCase();var hdif=$imgBox.width()-$img.width();var margL=0;if(settings.horizontalAlign=="center"||settings.verticalAlign=="middle"){margL=hdif/2}else{if(settings.horizontalAlign=="right"){margL=hdif}}$img.css("margin-left",Math.round(margL));settings.verticalAlign=settings.verticalAlign.toLowerCase();var vdif=$imgBox.height()-$img.height();var margT=0;if(settings.verticalAlign=="center"||settings.verticalAlign=="middle"){margT=vdif/2}else{if(settings.verticalAlign=="bottom"){margT=vdif}}$img.css("margin-top",Math.round(margT));if(!$img.ILprocessed){if(settings.removeBoxBackground){$imgBox.css("background-image","none")}$img.fadeTo(settings.fadeInTime,1);$img.ILprocessed=true}}})}})})(jQuery);var responPluginInit=false;function responsiveOn(){if(responPluginInit){return}responPluginInit=true;(function(n,p,u){var w=n([]),s=n.resize=n.extend(n.resize,{}),o,l="setTimeout",m="resize",t=m+"-special-event",v="delay",r="throttleWindow";s[v]=250;s[r]=true;n.event.special[m]={setup:function(){if(!s[r]&&this[l]){return false}var a=n(this);w=w.add(a);n.data(this,t,{w:a.width(),h:a.height()});if(w.length===1){q()}},teardown:function(){if(!s[r]&&this[l]){return false}var a=n(this);w=w.not(a);a.removeData(t);if(!w.length){clearTimeout(o)}},add:function(b){if(!s[r]&&this[l]){return false}var c;function a(d,h,g){var f=n(this),e=n.data(this,t);e.w=h!==u?h:f.width();e.h=g!==u?g:f.height();c.apply(this,arguments)}if(n.isFunction(b)){c=b;return a}else{c=b.handler;b.handler=a}}};function q(){o=p[l](function(){w.each(function(){var d=n(this),a=d.width(),b=d.height(),c=n.data(this,t);if(a!==c.w||b!==c.h){d.trigger(m,[c.w=a,c.h=b])}});q()},s[v])}})(jQuery,this)};