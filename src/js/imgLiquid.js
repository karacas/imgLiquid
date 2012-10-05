/*
	jQuery Plugnin: imgLiquid v0.1
	http://www.proyectiva.com
	@krc_ale

	Copyright (c) 2012 Alejandro Emparan (karacas), http://www.proyectiva.com
	
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
;(function($){
	$.fn.extend({

		imgLiquid: function(options) {

			var isIE = /*@cc_on!@*/false;
			this.defaultOptions = {};


			//Settings
			//___________________________________________________________________
			var settings = $.extend({
				fill: true,
				fadeTime: 0,
				verticalAlign: 'center',
				horizontalAlign: 'center',
				delay: 0,
				/**/
				removeBoxBackground: true,
				ieFadeOff: true,
				imageRendering: 'auto',
				responsive: false
			}, this.defaultOptions, options);

			//ie OffAnims
			if (isIE && settings.ieFadeOff){
				settings.fadeTime = 0;
			}
			if (settings.responsive) {
				responsiveOn();
			}
			

			//each
			//___________________________________________________________________
			return this.each(function($i) {
				
				//Obj
				var $imgBox = $(this);
				var $img = $('img:first', $imgBox);

				//Alpha to 0
				$img.fadeTo(0, 0);
				$img.css('visibility', 'visible');
				$img.css('display',  'block');
				$img.css('image-rendering',  settings.imageRendering);
				if (settings.imageRendering == 'optimizeQuality') $img.css('-ms-interpolation-mode',  'bicubic');

				//OverFlow
				$imgBox.css('display', 'block');
				$imgBox.css('overflow', 'hidden');

				//Status
				$img.ILrunned = false;
				$img.ILprocessed = false;
				$img.ILerror = false;
				$img.ILloaded = false;


				if (settings.responsive) {
					$imgBox.resize(function (e) {
						var $$imgBox = $imgBox;
						var $$img = $('img:first', $$imgBox);
						process($$imgBox, $$img);
					});
				}

				//OnLoad
				$img.load(function () {
					if (!Boolean($img.width() === 0 && $img.height() === 0)) {
						$img.ILloaded = true;
						setTimeout(function() {
							process($imgBox, $img);
							$img.ILrunned = true;
						}, $i * settings.delay );
					}
				}).each(function () {
					if (this.complete) {
						$img.trigger('load');
					}
				});
				$img.error(function () {
					$img.ILerror = true;
					$img.ILrunned = true;
					$imgBox.css('visibility', 'hidden');
					return null;
				});


                //Process
				//___________________________________________________________________
				function process($imgBox, $img){

					//Prportions
					var imgBoxProp = $imgBox.width() /  $imgBox.height();
					var imgProp    = $img.width() / $img.height();

					//Size
					if (settings.fill){
						//Fill
						if (imgBoxProp >= imgProp){
							$img.css('width', '100%');
							$img.css('height', 'auto');
						}else{
							$img.css('width', 'auto');
							$img.css('height', '100%');
						}
					}else{
						//no Fill
						if (imgBoxProp <= imgProp){
							$img.css('width', '100%');
							$img.css('height', 'auto');
						}else{
							$img.css('width', 'auto');
							$img.css('height', '100%');
						}
					}


					//align X
					settings.horizontalAlign = settings.horizontalAlign.toLowerCase();
					var hdif = $imgBox.width() - $img.width();
					var margL = 0;
					if (settings.horizontalAlign == 'center' || settings.verticalAlign == 'middle'){
						margL = hdif/2;
					}
					else if (settings.horizontalAlign == 'right'){
						margL = hdif;
					}
					$img.css('margin-left', Math.round(margL));


					//align Y
					settings.verticalAlign = settings.verticalAlign.toLowerCase();
					var vdif = $imgBox.height() - $img.height();
					var margT = 0;
					if (settings.verticalAlign == 'center' || settings.verticalAlign == 'middle'){
						margT = vdif/2;
					}
					else if (settings.verticalAlign == 'bottom'){
						margT = vdif;
					}
					$img.css('margin-top', Math.round(margT));


					//FadeIn
					if (!$img.ILprocessed){
						if (settings.removeBoxBackground) $imgBox.css('background-image', 'none');
						$img.fadeTo(settings.fadeTime, 1);
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