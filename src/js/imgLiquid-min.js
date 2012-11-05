/*
jQuery Plugin: imgLiquid v0.68 / 05-11-12
jQuery plugin to resize images to fit in a container.
https://github.com/karacas/imgLiquid

ex:
    $(".imgLiquid").imgLiquid({fill:true});

    //OPTIONS:
    
        //js
        fill: true,
        verticalAlign: 'center', //'top' // 'bottom'
        horizontalAlign: 'center', // 'left' // 'right'
        fadeInTime: 0,
        responsive: false

        //css (set useCssAligns: true) (overwrite js)
        text-align: center;
        vertical-align : middle;

        //hml5 data attr (overwrite all)
        data-imgLiquid-fill='true'
        data-imgLiquid-horizontalAlign ='center'
        data-imgLiquid-verticalAlign' ='center'
        data-imgLiquid-fadeInTime = '1000'

        Copyright (c) 2012 Alejandro Emparan (karacas), @krc_ale
        Dual licensed under the MIT and GPL licenses.
*/
(function($){$.fn.extend({imgLiquid:function(options){var isIE= /*@cc_on!@*/ false;this.defaultOptions={};var settings=$.extend({fill:true,verticalAlign:"center",horizontalAlign:"center",fadeInTime:0,responsive:false,delay:1,removeBoxBackground:true,ieFadeInDisabled:true,useDataHtmlAttr:true,useCssAligns:false,imageRendering:"auto"},this.defaultOptions,options);if(settings.responsive){responsiveOn()}return this.each(function($i){var $imgBox=$(this);var $img=$("img:first",$imgBox);if(!$img||$img===null||$img.size()===0){onError();return null}if($img.ILprocessed){process($imgBox,$img);return}$img.ILprocessed=false;$img.ILerror=false;$img.fadeTo(0,0);$("img:not(:first)",$imgBox).css("display","none");$img.css({visibility:"visible","max-width":"none","max-height":"none",width:"auto",height:"auto",display:"block","image-rendering":settings.imageRendering});$img.removeAttr("width");$img.removeAttr("height");$imgBox.css({overflow:"hidden"});if(isIE&&settings.imageRendering=="optimizeQuality"){$img.css("-ms-interpolation-mode","bicubic")}if(settings.useCssAligns){var cha=$imgBox.css("text-align");var cva=$imgBox.css("vertical-align");if(cha=="left"||cha=="center"||cha=="right"){settings.horizontalAlign=cha}if(cva=="top"||cva=="middle"||cva=="bottom"||cva=="center"){settings.verticalAlign=cva}}if(settings.useDataHtmlAttr){if($imgBox.attr("data-imgLiquid-fill")=="true"){settings.fill=true}if($imgBox.attr("data-imgLiquid-fill")=="false"){settings.fill=false}if($imgBox.attr("data-imgLiquid-responsive")=="true"){settings.responsive=true}if($imgBox.attr("data-imgLiquid-responsive")=="false"){settings.responsive=false}if(Number($imgBox.attr("data-imgLiquid-fadeInTime"))>0){settings.fadeInTime=Number($imgBox.attr("data-imgLiquid-fadeInTime"))}var ha=$imgBox.attr("data-imgLiquid-horizontalAlign");var va=$imgBox.attr("data-imgLiquid-verticalAlign");if(ha=="left"||ha=="center"||ha=="right"){settings.horizontalAlign=ha}if(va=="top"||va=="middle"||va=="bottom"||va=="center"){settings.verticalAlign=va}}if(isIE&&settings.ieFadeInDisabled){settings.fadeInTime=0}if(settings.responsive){$imgBox.resize(function(e){process($imgBox,$img)})}$img.load(function(){if(!Boolean($img.width()===0&&$img.height()===0)){setTimeout(function(){process($imgBox,$img)},$i*settings.delay)}}).each(function(){if(this.complete){$img.trigger("load")}}).error(function(){onError();return null});function onError(){$img.ILerror=true;$imgBox.css("visibility","hidden")}function process($imgBox,$img){if(settings.fill==($imgBox.width()/$imgBox.height())>=($img.width()/$img.height())){$img.css({width:"100%",height:"auto"})}else{$img.css({width:"auto",height:"100%"})}var ha=settings.horizontalAlign.toLowerCase();var hdif=$imgBox.width()-$img.width();var margL=0;if(ha=="center"||ha=="middle"){margL=hdif/2}if(ha=="right"){margL=hdif}$img.css("margin-left",Math.round(margL));var va=settings.verticalAlign.toLowerCase();var vdif=$imgBox.height()-$img.height();var margT=0;if(va=="center"||va=="middle"){margT=vdif/2}if(va=="bottom"){margT=vdif}$img.css("margin-top",Math.round(margT));if(!$img.ILprocessed){if(settings.removeBoxBackground){$imgBox.css("background-image","none")}$img.fadeTo(settings.fadeInTime,1);$img.ILprocessed=true}}})}})})(jQuery);
/*
* jQuery resize event - v1.1 - 3/14/2010
* http://benalman.com/projects/jquery-resize-plugin/
* Copyright (c) 2010 "Cowboy" Ben Alman
* Dual licensed under the MIT and GPL licenses.
* http://benalman.com/about/license/
*/
var responPluginInit = false; function responsiveOn(){if (responPluginInit) return; responPluginInit = true; (function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this); }