![ScreenShot](https://raw.github.com/karacas/imgLiquid/master/examples/logoimgliquid.png)

imgLiquid v0.9.934 / (30-04-13)
#####A jQuery Plugin to resize images to fit in a container.
Alejandro Emparan (karacas) / @krc_ale
Dual licensed under the MIT and GPL licenses.
## 
#Usage

####js:
```js
$(function()
	$(".imgLiquid").imgLiquid();
});
```

####Html:
```html
<div class="imgLiquid" style="width:300px; height:200px;">
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
        verticalAlign:      //'center' //'top' //'bottom'
        horizontalAlign:    //'center' //'left' //'right'

        //CallBakcs
        onStart:        function(){},
        onFinish:       function(){},
        onItemStart:    function(index, container, img){},
        onItemFinish:   function(index, container, img){}

    >hml5 data attr (overwrite js options)
        data-imgLiquid-fill="true"
        data-imgLiquid-horizontalAlign="center"
        data-imgLiquid-verticalAlign="center"

```