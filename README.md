#jQuery  Plugin: imgLiquid v0.66
A jQuery Plugin to resize images to fit in a container


06-10-12
Copyright (c) 2012 Alejandro Emparan (karacas), @krc_ale
Dual licensed under the MIT and GPL licenses.


#Ej:
```
	HTML:
	<div id="container" class="imgLiquid" style="width:300px; height:200px;" data-imgLiquid-fill="false">
		<img alt="" src="http://www.juegostoystory.net/files/image/2010_Toy_Story_3_USLC12_Woody.jpg" />
	</div>

	JS:
	$(".imgLiquid").imgLiquid()

	//+ Options:
	$(".imgLiquid").imgLiquid({fill : true, fadeInTime: 300, verticalAlign: 'center', horizontalAlign: 'center'})
```
view in action:		http://goo.gl/Wk8bU
or play with it:	http://jsfiddle.net/karacas/3CRx7/#base


#Fatures:
```
	- Align
	- Crop/Fill
	- FadeIn
	- All browsers (Incl. ie6)
```


#Options:
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

