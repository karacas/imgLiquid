/*
jQuery Plugin: imgLiquid v0.8.0 / 27-03-13
jQuery plugin to resize images to fit in a container.
Copyright (c) 2012 Alejandro Emparan (karacas), twitter: @krc_ale
Dual licensed under the MIT and GPL licenses
https://github.com/karacas/imgLiquid

ex:
    $(".imgLiquid").imgLiquid({fill:true});

    //OPTIONS:

    >js
        fill: true,
        verticalAlign:      //'center' //'top'  //'bottom'
        horizontalAlign:    //'center' //'left' //'right'
        fadeInTime: 0,
        delay: 0,           //time to process next image in milliseconds
        responsive: false,
        responsiveCheckTime: 500,   //time to check resize in milliseconds

    >js callBakcs
        onStart:        function(){},
        onFinish:       function(){},
        onItemResize:   function(index, container, img){},
        onItemStart:    function(index, container, img){},
        onItemFinish:   function(index, container, img){}

    >css (set useCssAligns: true) (overwrite js)
        text-align: center;
        vertical-align : middle;

    >hml5 data attr (overwrite all)
        data-imgLiquid-fill="true"
        data-imgLiquid-horizontalAlign="center"
        data-imgLiquid-verticalAlign="center"
        data-imgLiquid-fadeInTime="500"

*/
;(function($){
	$.fn.extend({
		imgLiquid: function(options) {

			//is ie?
			var isIE = /*@cc_on!@*/false;

			//Options
			this.defaultOptions = {};
			//___________________________________________________________________
			var settings = $.extend({
				fill: true,
				verticalAlign: 'center', //'top' // 'bottom'
				horizontalAlign: 'center', // 'left' // 'right'
				fadeInTime: 0,
				responsive: false,
				responsiveCheckTime: 500, /*time to check div resize, default 2fps > 1000/500*/
				delay: 1,
				/**/
				removeBoxBackground: true,
				ieFadeInDisabled: true,
				useDataHtmlAttr: true,
				useCssAligns: false,
				imageRendering: 'auto'
			}, this.defaultOptions, options);


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

				if ($img.ILprocessed){
					process($imgBox, $img);
					return;
				}

				//Status
				$img.ILprocessed = false;
				$img.ILerror = false;

				//Alpha to 0 & removes
				$img.fadeTo(0, 0);
				$('img:not(:first)', $imgBox).css('display','none');
				$img.css({'visibility':'visible', 'max-width':'none', 'max-height':'none', 'width':'auto', 'height':'auto', 'display':'block', 'image-rendering':settings.imageRendering });
				$img.removeAttr("width");
				$img.removeAttr("height");


				//set OverFlow
				$imgBox.css({'overflow':'hidden'});


				//Settings overwrite
				if (isIE && settings.imageRendering == 'optimizeQuality') $img.css('-ms-interpolation-mode',  'bicubic');
				if (settings.useCssAligns) {
					var cha = $imgBox.css('text-align');
					var cva = $imgBox.css('vertical-align');
					if(cha == 'left' || cha == 'center' || cha == 'right') settings.horizontalAlign = cha;
					if (cva == 'top' || cva == 'middle' || cva == 'bottom' || cva == 'center') settings.verticalAlign = cva;
				}
				if (settings.useDataHtmlAttr) {
					if ($imgBox.attr('data-imgLiquid-fill') =='true') settings.fill = true;
					if ($imgBox.attr('data-imgLiquid-fill') =='false' ) settings.fill = false;
					if ($imgBox.attr('data-imgLiquid-responsive') =='true') settings.responsive = true;
					if ($imgBox.attr('data-imgLiquid-responsive') =='false' ) settings.responsive = false;
					if ( Number ($imgBox.attr('data-imgLiquid-fadeInTime')) > 0) settings.fadeInTime = Number ($imgBox.attr('data-imgLiquid-fadeInTime'));
					var ha = $imgBox.attr('data-imgLiquid-horizontalAlign');
					var va = $imgBox.attr('data-imgLiquid-verticalAlign');
					if (ha == 'left' || ha == 'center' || ha == 'right') settings.horizontalAlign = ha;
					if (va == 'top' || va == 'middle' || va == 'bottom' || va == 'center') settings.verticalAlign = va;
				}


				//ie OffAnims
				if (isIE && settings.ieFadeInDisabled) settings.fadeInTime = 0;



				//RESPONSIVE
				function checkElementSize(){
					setTimeout(function() {
						var actualSize = $imgBox.width() + ($imgBox.height()/100000);
						if (actualSize !== $imgBox.sizeOld){
							$imgBox.sizeOld = actualSize;
							process($imgBox, $img);
						}
						checkElementSize();
					}, settings.responsiveCheckTime);
				}
				if (settings.responsive) checkElementSize();



				//OnLoad
				$img.load(function () {
					if (!Boolean($img[0].width === 0 && $img[0].height === 0)) {
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

					//resize OPTIMIZED
					if (settings.fill == ($imgBox.width() / $imgBox.height()) >= ($img[0].width / $img[0].height)){
						$img.css({'width':'100%', 'height':'auto'});
					}else{
						$img.css({'width':'auto', 'height':'100%'});
					}


					//align X
					var ha = settings.horizontalAlign.toLowerCase();
					var hdif = $imgBox.width() - $img[0].width;
					var margL = 0;
					if (ha == 'center' || ha == 'middle')margL = hdif/2;
					if (ha == 'right') margL = hdif;
					$img.css('margin-left', Math.round(margL));


					//align Y
					var va = settings.verticalAlign.toLowerCase();
					var vdif = $imgBox.height() - $img[0].height;
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
