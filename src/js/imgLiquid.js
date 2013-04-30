/*
jQuery Plugin: imgLiquid v0.9.904 dev / 26-04-13
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
//TODO: Algigns with %
//TODO: Ver más Callbacks

var imgLiquid = imgLiquid || {VER: '0.9.904'};
imgLiquid.isIE = /*@cc_on!@*/ false;
imgLiquid.bgs_Available = false;
imgLiquid.bgs_CheckRunned = false;


(function ($) {


	//___________________________________________________________________

	function checkBgsIsavailable() {
		if (!imgLiquid.bgs_CheckRunned) imgLiquid.bgs_CheckRunned = true;
		else return;

		function runCheck() {
			var bgs_Check = $('#iLq_CheckBgs')[0];
			if (!bgs_Check || !window.getComputedStyle) return;
			var compStyle = window.getComputedStyle(bgs_Check, null);
			if (!compStyle || !compStyle.backgroundSize) return;
			imgLiquid.bgs_Available = (compStyle.backgroundSize === 'cover');
		}

		$('body').append('<span id="iLq_CheckBgs" style="background-size:cover" />');
		runCheck();
		$('#iLq_CheckBgs').remove();
	}



	//___________________________________________________________________

	$.fn.extend({
		imgLiquid: function (options) {

			checkBgsIsavailable();
			var imgLiquidRoot = this;

			this.defaults = {
				fill: true,
				verticalAlign: 'center',			// 'top'	// 'bottom'
				horizontalAlign: 'center',			// 'left'	// 'right'
				useBackgroundSize: true,
				useDataHtmlAttr: true,

				responsive: true,					/*Only for use with BackgroundSize false (or old browsers)*/
				delay: 0,							/*Only for use with BackgroundSize false (or old browsers)*/
				fadeInTime: 0,						/*Only for use with BackgroundSize false (or old browsers)*/
				removeBoxBackground: true,			/*Only for use with BackgroundSize false (or old browsers)*/
				ieFadeInDisabled: true,				/*Only for use with BackgroundSize false (or old browsers)*/
				hardPixels: true,					/*Only for use with BackgroundSize false (or old browsers)*/
				responsiveCheckTime: 500,			/*Only for use with BackgroundSize false (or old browsers)*//*time to check div resize*/
				timecheckvisibility: 500,			/*Only for use with BackgroundSize false (or old browsers)*//*time to recheck if visible/loaded*/

				//CALLBACKS
				onStart: null,						//no-params
				onFinish: null,						//no-params
				onItemStart: null,					//params: (index, container, img )
				onItemFinish: null,					//params: (index, container, img )
				onItemError: null					//params: (index, container, img )
			};



			//Extend global settings
			this.options = options;
			this.settings = $.extend({}, this.defaults, this.options);


			//CALLBACK > Start
			if (this.settings.onStart) this.settings.onStart();


			//___________________________________________________________________

			return this.each(function ($i) {

				//MAIN > each for image
				var $imgBoxCont = $(this),
				$img = $('img:first',$imgBoxCont),
				settings;

				if ($img.length === 0) {onError(); return;}

				//Extend settings
				if (!$img.data('imgLiquid_settings')) {
					settings = $.extend({}, imgLiquidRoot.settings, getSettingsOverwrite()); //First time
				} else {
					settings = $.extend({}, $img.data('imgLiquid_settings'), imgLiquidRoot.options); //Recall
				}
				$img.data('imgLiquid_settings', settings);


				//Start CallBack
				if (settings.onItemStart) settings.onItemStart($i, $imgBoxCont, $img);

				//Process
				if (imgLiquid.bgs_Available && settings.useBackgroundSize)
					processBgSize();
				else
					processOldMethod();


				//END MAIN

				//___________________________________________________________________

				function processBgSize() {

					var bs_val = (settings.fill) ? 'cover' : 'contain',
						bpos = settings.horizontalAlign.toLowerCase() + " " + settings.verticalAlign.toLowerCase();

					//Check change img src
					if ($imgBoxCont.css('background-image').indexOf($img.attr('src')) === -1) {
						$imgBoxCont.css({'background-image': 'url(' + $img.attr('src') + ')'});
					}

					$imgBoxCont.css({
						'background-size': bs_val,
						'background-repeat': 'no-repeat',
						'background-position': bpos
					});
					$('a:first', $imgBoxCont).css({
						'display': 'block',
						'width': '100%',
						'height': '100%'
					});
					$('img', $imgBoxCont).css({
						'display': 'none'
					});

					if (settings.onItemFinish) settings.onItemFinish($i, $imgBoxCont, $img);
					checkFinish();
				}




				//___________________________________________________________________

				function processOldMethod() {

					//Check change img src
					if ($img.data('oldSrc') && $img.data('oldSrc') !== $img.attr('src')) {

						/*Reset img*/
						var $imgCopy = $("<img/>").attr("src", $img.attr("src"))
						.attr("css", 'visibility:hidden')
						.attr("name", $img.attr("name"))
						.attr("id", $img.attr("id"))
						.attr("class", $img.attr("class"));

						$imgCopy.data('imgLiquid_settings', $img.data('imgLiquid_settings'));
						$img.parent().prepend($imgCopy);
						$img.remove();
						$img = $imgCopy;
					}


					//Reproceess?
					if ($img.data('imgLiquid_oldProcessed')) {
						makeOldProcess();
						return;
					}


					//Set data
					$img.data('imgLiquid_oldProcessed', false);
					$img.data('oldSrc', $img.attr('src'));

					//Hide others images
					$('img:not(:first)', $imgBoxCont).css('display', 'none');

					//CSSs
					$img.fadeTo(0, 0);
					$img.removeAttr("width").removeAttr("height").css({
						'visibility': 'visible',
						'max-width': 'none',
						'max-height': 'none',
						'width': 'auto',
						'height': 'auto',
						'display': 'block'
					});
					$imgBoxCont.css({
						'overflow': 'hidden'
					});


					//CheckErrors
					$img.on('error', onError);
					$img[0].onerror = onError;
					if (!$img[0].complete && $img[0].width) onError(); // [OJO con este]


					//loop until load
					function onLoad() {
						if ($img.data('imgLiquid_error') || $img.data('imgLiquid_loaded') || $img.data('imgLiquid_oldProcessed')) return;
						if ($imgBoxCont.is(':visible') && $img[0].complete && $img[0].width > 0 && $img[0].height > 0) {
							$img.data('imgLiquid_loaded', true);
							setTimeout(makeOldProcess, $i * settings.delay);
						} else {
							setTimeout(onLoad, settings.timecheckvisibility);
						}
					}

					onLoad();
					checkResponsive();
				}




				//___________________________________________________________________

				function checkResponsive() {
					if (!settings.responsive && !$img.data('imgLiquid_oldProcessed')) return;
					if (!$img.data('imgLiquid_settings')) return;

					settings = $img.data('imgLiquid_settings');

					$imgBoxCont.actualSize = $imgBoxCont.get(0).offsetWidth + ($imgBoxCont.get(0).offsetHeight / 10000);
					if ($imgBoxCont.sizeOld && $imgBoxCont.actualSize !== $imgBoxCont.sizeOld) makeOldProcess();

					$imgBoxCont.sizeOld = $imgBoxCont.actualSize;
					setTimeout(checkResponsive, settings.responsiveCheckTime);
				}




				//___________________________________________________________________

				function onError() {
					$img.data('imgLiquid_error', true);
					if (settings.onItemError) settings.onItemError($i, $imgBoxCont, $img);
					checkFinish();
				}




				//___________________________________________________________________

				function getSettingsOverwrite() {
					var SettingsOverwrite = {};

					if (imgLiquidRoot.settings.useDataHtmlAttr) {
						var dif = $imgBoxCont.attr('data-imgLiquid-fill'),
							ha = $imgBoxCont.attr('data-imgLiquid-horizontalAlign'),
							va = $imgBoxCont.attr('data-imgLiquid-verticalAlign');

						if (dif === 'true' || dif === 'false') SettingsOverwrite.fill = Boolean(dif === 'true');
						if (ha === 'left' || ha === 'center' || ha === 'right') SettingsOverwrite.horizontalAlign = ha;
						if (va === 'top' || va === 'bottom' || va === 'center') SettingsOverwrite.verticalAlign = va;
					}

					if (imgLiquid.isIE && imgLiquidRoot.settings.ieFadeInDisabled) SettingsOverwrite.fadeInTime = 0; //ie no anims
					return SettingsOverwrite;
				}





				//___________________________________________________________________

				function makeOldProcess() { /* Only for old browsers, or useBackgroundSize seted false*/

					//Calculate size
					var w, h, wn, hn, $imgCW, $imgCH, ha, va, hdif, vdif, margT = 0, margL = 0;

					$imgCW = $imgBoxCont.width();
					$imgCH = $imgBoxCont.height();

					//Save original sizes
					if ($img.data('owidth') === undefined) $img.data('owidth', $img[0].width);
					if ($img.data('oheight') === undefined) $img.data('oheight', $img[0].height);


					//Compare proportions
					if (settings.fill === ($imgCW / $imgCH) >= ($img.data('owidth') / $img.data('oheight'))) {
						w = '100%';
						h = 'auto';
						wn = Math.floor($imgCW);
						hn = Math.floor($imgCW * ($img.data('oheight') / $img.data('owidth')));
					} else {
						w = 'auto';
						h = '100%';
						wn = Math.floor($imgCH * ($img.data('owidth') / $img.data('oheight')));
						hn = Math.floor($imgCH);
					}

					//Align X
					ha = settings.horizontalAlign.toLowerCase();
					hdif = $imgCW - wn;
					if (ha === 'center') margL = hdif * 0.5;
					if (ha === 'right') margL = hdif;


					//Align Y
					va = settings.verticalAlign.toLowerCase();
					vdif = $imgCH - hn;
					if (va === 'center') margT = vdif * 0.5;
					if (va === 'bottom') margT = vdif;


					//Add Css
					if (settings.hardPixels) {w = wn; h = hn;}
					$img.css({
						'width': w,
						'height': h,
						'margin-left': Math.floor(margL),
						'margin-top': Math.floor(margT)
					});


					//FadeIn > Only first time
					if (!$img.data('imgLiquid_oldProcessed')) {
						if (settings.removeBoxBackground) $imgBoxCont.css('background-image', 'none');
						$img.fadeTo(settings.fadeInTime, 1);
						$img.data('imgLiquid_oldProcessed', true);
					}

					if (settings.onItemFinish) settings.onItemFinish($i, $imgBoxCont, $img);
					checkFinish();
				}




				//___________________________________________________________________

				function checkFinish() { /*Check callBack*/
					if ($i === imgLiquidRoot.length - 1) if (imgLiquidRoot.settings.onFinish) imgLiquidRoot.settings.onFinish();
				}



			});
		}
	});
})(jQuery);