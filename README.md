#jQuery  Plugin: imgLiquid v0.67  
A jQuery Plugin to resize images to fit in a container  
18-10-12  
Copyright (c) 2012 Alejandro Emparan (karacas), @krc_ale  
Dual licensed under the MIT and GPL licenses.
## 
#Usage  
####HTML:
```html
<div class="imgLiquid" style="width:300px; height:200px;">
	<img alt="Woody" src="Woody.jpg" />
</div>
```
  
####JS:
```js
$(".imgLiquid").imgLiquid();

//[+] Alternative options:
$(".imgLiquid").imgLiquid({fill : true, fadeInTime: 300, verticalAlign: 'center', horizontalAlign: 'center'});
```
  
####CSS:
```css
/*Important: set "visibility:hidden" for better results */
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
	- Align
	- Crop/Fill
	- FadeIn
	- All browsers (Incl. ie6)
```
   
###Options:
```
	>js
	fill: true,
	verticalAlign: 'center', //'top' // 'bottom'
	horizontalAlign: 'center', // 'left' // 'right'
	fadeInTime: 0,
	responsive: false
	
	>css (set useCssAligns: true) (overwrite js)
	text-align: center
	vertical-align : middle

	>hml5 data attr (overwrite all)
	data-imgLiquid-fill='true'
	data-imgLiquid-horizontalAlign ='center'
	data-imgLiquid-verticalAlign' ='center'
	data-imgLiquid-fadeInTime = '1000'
```  
