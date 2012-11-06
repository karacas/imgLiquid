![ScreenShot](https://raw.github.com/karacas/imgLiquid/master/dev/logoimgliquid.png)
  
imgLiquid.js v0.70 - 05-11-12
#####A jQuery Plugin to resize images to fit in a container.  
Alejandro Emparan (karacas), twitter: @krc_ale  
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
	- Lightweight: less than 2KBs gzipped.
	- Align.
	- Fill/Crop.
	- Svg support.
	- FadeIn Anim (Optional, default is off).
	- Responsive (Optional, default is off).
	- All browsers (Incl. ie6).
```
   
###Options:
```
	>js
		fill: false,
		verticalAlign: 'center', //'top' // 'bottom' // 'middle'
		horizontalAlign: 'center', // 'left' // 'right'
		fadeInTime: 500,
		responsive: true
	
	>css (set useCssAligns: true) (overwrite js)
		text-align: center;
		vertical-align : middle;

	>hml5 data attr (overwrite all)
		data-imgLiquid-fill='true'
		data-imgLiquid-horizontalAlign ='center'
		data-imgLiquid-verticalAlign' ='center'
		data-imgLiquid-fadeInTime = '500'
```  
