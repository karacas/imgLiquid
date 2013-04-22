![ScreenShot](https://raw.github.com/karacas/imgLiquid/master/dev/logoimgliquid.png)

imgLiquid.js v0.9.84 22-04-13
#####A jQuery Plugin to resize images to fit in a container.
Alejandro Emparan (karacas) @krc_ale
Dual licensed under the MIT and GPL licenses.
## 
#Usage

####Include:
```html
<script src="js/imgLiquid-min.js"></script>
```

####js:
```js
$(document).ready(function() {
	$(".imgLiquid").imgLiquid();
});
```

####Html:
```html
<div class="imgLiquid" style="width:300px; height:200px;">
	<img alt="Woody" src="Woody.jpg" />
</div>
```

####css:
```css
/*
Important:
	set "visibility:hidden" for better results
	or use src/css/imgLiquid.js.css
*/
.imgLiquid img{
    visibility:hidden;
}
```
 
####View in action:
http://goo.gl/Wk8bU
####or play with it:
http://jsfiddle.net/karacas/3CRx7/#base
http://codepen.io/karacas/pen/nlugd
## 
###Features:
```
	- Uses CSS Background-size when is available. (new)
    - Bootstrap compatible
    - Lightweight: 2.0KBs gzipped.
	- Fill/Crop.
    - Align.
	- Responsive.
	- Svg support.
	- CallBacks.
    - HTML5 data-* attributes
	- All browsers (Incl. ie6).
```
 
###Options:
```

    >js
        fill: true,
        verticalAlign:      //'center' //'top' //'bottom'
        horizontalAlign:    //'center' //'left' //'right'

    >js callBakcs
        onStart:        function(){},
        onFinish:       function(){},
        onItemResize:   function(index, container, img){},
        onItemStart:    function(index, container, img){},
        onItemFinish:   function(index, container, img){}

    >hml5 data attr (overwrite js options)
        data-imgLiquid-fill="true"
        data-imgLiquid-horizontalAlign="center"
        data-imgLiquid-verticalAlign="center"

```