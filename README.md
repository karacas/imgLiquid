![ScreenShot](https://raw.github.com/karacas/imgLiquid/master/tests/logoimgliquid.png)

imgLiquid v0.9.944 / 03-05-2013
#####A jQuery Plugin to resize images to fit in a container.
Alejandro Emparan (karacas) / @krc_ale
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
	$(".imgLiquidFill").imgLiquid();
});
```

####Html:
```html
<div class="imgLiquidFill imgLiquid" style="width:300px; height:200px;">
	<img alt="Woody" src="Woody.jpg" />
</div>
```
 
####View in action:
http://goo.gl/Wk8bU
####or play with it:
http://jsfiddle.net/karacas/3CRx7/#base
http://codepen.io/karacas/pen/nlugd
## 
###Features:
```
	- Uses CSS Background-size when is available. (new!)
    - Bootstrap compatible.
    - Lightweight: < 2.0KBs gzipped.
	- Fill / Crop.
    - Align.
	- Responsive.
	- Svg support.
	- CallBacks.
    - HTML5 data-* attributes.
	- All browsers (Incl. ie6).
```
 
###Options:
```

    >js
        fill: true,
        verticalAlign:      // 'center' //  'top'   //  'bottom' // '50%'  // '10%'
        horizontalAlign:    // 'center' //  'left'  //  'right'  // '50%'  // '10%'

        //CallBacks
        onStart:        function(){},
        onFinish:       function(){},
        onItemStart:    function(index, container, img){},
        onItemFinish:   function(index, container, img){}

    >hml5 data attr (overwrite js options)
        data-imgLiquid-fill="true"
        data-imgLiquid-horizontalAlign="center"
        data-imgLiquid-verticalAlign="50%"

```