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
			this.defaultOptions = {};

			//Settings
			//___________________________________________________________________
			var settings = $.extend({
				fill: true,
				fadeTime: 500,
				verticalAlign: 'center',
				horizontalAlign: 'center'
			}, this.defaultOptions, options);

			
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

				//OverFlow
				$imgBox.css('display', 'block');
				$imgBox.css('overflow', 'hidden');

				//Status
				$img.runned = false;
				$img.processed = false;
				$img.error_ = false;
				$img.loaded_ = false;

				//OnLoad
				$img.load(function () {
					if (!Boolean($img.width() === 0 && $img.height() === 0)) {
						$img.loaded_ = true;
						process($imgBox, $img);
						$img.runned = true;
					}
				}).each(function () {
					if (this.complete) {
						$img.trigger('load');
					}
				});
				$img.error(function () {
                    $img.error_ = true;
                    $img.runned = true;
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
						if (imgBoxProp > imgProp){
							$img.css('width', '100%');
							$img.css('height', 'auto');
						}else{
							$img.css('width', 'auto');
							$img.css('height', '100%');
						}
					}else{
						if (imgBoxProp < imgProp){
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
					if (settings.horizontalAlign == 'center'){
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
					$img.fadeTo(settings.fadeTime, 1);
					$img.processed = true;
				}
			});
}
});
})(jQuery);