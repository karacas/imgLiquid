#jQuery  Plugin: imgLiquid v0.64
06-10-12
Copyright (c) 2012 Alejandro Emparan (karacas), @krc_ale
Licensed under the MIT

#A jQuery Plugin to resize images to fit in a container

##Ej:
```
	HTML:
	<div id="container" class="imgLiquid" style="width:300px; height:200px;">
		<img alt="" src="http://www.juegostoystory.net/files/image/2010_Toy_Story_3_USLC12_Woody.jpg"/>
	</div>

	JS:
	$(".imgLiquid").imgLiquid()

	//+ Options:
	$(".imgLiquid").imgLiquid({fill : true, fadeInTime: 300, verticalAlign: 'center', horizontalAlign: 'center'})
```
view in action:		http://goo.gl/Wk8bU
or play with it:	http://jsfiddle.net/karacas/3CRx7/#base


##Fatures:
```
	- Align
	- Crop/Fill
	- FadeIn
	- All browsers (Incl. ie6)
```


##Options:
```
fill: true,
verticalAlign: 'center', //'top' // 'bottom'
horizontalAlign: 'center', // 'left' // 'right'
fadeInTime: 0,
responsive: false,
delay: 0
```

