/*
jQuery Plugin: imgLiquid v0.7.8 / 27-02-13
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
;(function(e){e.fn.extend({imgLiquid:function(t){var n=false;var r=this.size();var i=0;this.defaultOptions={};var s=e.extend({fill:true,verticalAlign:"center",horizontalAlign:"center",fadeInTime:0,responsive:false,responsiveCheckTime:100,delay:0,removeBoxBackground:true,ieFadeInDisabled:true,useDataHtmlAttr:true,useCssAligns:false,imageRendering:"auto",onStart:null,onFinish:null,onItemResize:null,onItemStart:null,onItemFinish:null},this.defaultOptions,t);if(s.onStart)s.onStart();return this.each(function(t){function h(){setTimeout(function(){o.actualSize=o.get(0).offsetWidth+o.get(0).offsetHeight/1e5;if(o.actualSize!==o.sizeOld){if(u.ILprocessed&&o.sizeOld!==undefined){if(s.onItemResize)s.onItemResize(t,o,u);if(s.responsive)d(o,u,t)}}o.sizeOld=o.actualSize;h()},s.responsiveCheckTime)}function p(){u.ILerror=true;v(o,u,t);o.css("visibility","hidden")}function d(e,t,n){if(s.fill==e.width()/e.height()>=t.width()/t.height()){t.css({width:"100%",height:"auto"})}else{t.css({width:"auto",height:"100%"})}var r=s.horizontalAlign.toLowerCase();var i=e.width()-t.width();var o=0;if(r=="center"||r=="middle")o=i/2;if(r=="right")o=i;t.css("margin-left",Math.round(o));var u=s.verticalAlign.toLowerCase();var a=e.height()-t.height();var f=0;if(u=="center"||u=="middle")f=a/2;if(u=="bottom")f=a;t.css("margin-top",Math.round(f));if(!t.ILprocessed){if(s.removeBoxBackground)e.css("background-image","none");t.fadeTo(s.fadeInTime,1);t.ILprocessed=true;if(s.onItemFinish)s.onItemFinish(n,e,t);v(e,t,n)}}function v(e,t,n){i++;if(i==r){if(s.onFinish)s.onFinish()}}var o=e(this);var u=e("img:first",o);if(!u||u===null||u.size()===0){p();return null}if(u.ILprocessed){d(o,u,t);return}u.ILprocessed=false;u.ILerror=false;if(s.onItemStart)s.onItemStart(t,o,u);u.fadeTo(0,0);e("img:not(:first)",o).css("display","none");u.css({visibility:"visible","max-width":"none","max-height":"none",width:"auto",height:"auto",display:"block","image-rendering":s.imageRendering});u.removeAttr("width");u.removeAttr("height");if(s.delay<1)s.delay=1;o.css({overflow:"hidden"});if(n&&s.imageRendering=="optimizeQuality")u.css("-ms-interpolation-mode","bicubic");if(s.useCssAligns){var a=o.css("text-align");var f=o.css("vertical-align");if(a=="left"||a=="center"||a=="right")s.horizontalAlign=a;if(f=="top"||f=="middle"||f=="bottom"||f=="center")s.verticalAlign=f}if(s.useDataHtmlAttr){if(o.attr("data-imgLiquid-fill")=="true")s.fill=true;if(o.attr("data-imgLiquid-fill")=="false")s.fill=false;if(o.attr("data-imgLiquid-responsive")=="true")s.responsive=true;if(o.attr("data-imgLiquid-responsive")=="false")s.responsive=false;if(Number(o.attr("data-imgLiquid-fadeInTime"))>0)s.fadeInTime=Number(o.attr("data-imgLiquid-fadeInTime"));var l=o.attr("data-imgLiquid-horizontalAlign");var c=o.attr("data-imgLiquid-verticalAlign");if(l=="left"||l=="center"||l=="right")s.horizontalAlign=l;if(c=="top"||c=="middle"||c=="bottom"||c=="center")s.verticalAlign=c}if(n&&s.ieFadeInDisabled)s.fadeInTime=0;if(s.responsive||s.onItemResize!==null)h();u.load(function(){if(!Boolean(u.width()===0&&u.height()===0)){setTimeout(function(){d(o,u,t)},t*s.delay)}}).each(function(){if(this.complete)u.trigger("load")}).on("error",p)})}})})(jQuery);