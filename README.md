#A propos

jQuery slideshow est un plugin qui vous permet de créer une bannière ou un galerie photo simpa et personalisé.

##Installation

En faite, pour utiliser ce plugin vous devez inclure les fichiers suivants :

```html
<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/slidshow.js"></script>
<link rel="stylesheet" type="text/css" href="css/style.css" />
```

Le code HTML de la page : 
```html
<div class="content">
	<h1>Plugin slideshow jquery</h1>
	<div class="slider">
    	<img src="img/img1.jpg" />
        <img src="img/img2.jpg" />
        <img src="img/img3.jpg" />
        <img src="img/img4.jpg" />
    </div>
</div>

```


##Usage

L'usage de ce plugin est très simple,Il faut juster l'appliquer à la div contenant la liste des images

```html
<script type="text/javascript">
jQuery(function(){
	$('.slider').slideshow({
		animation	:'advanced slide'
	});
});
</script>
```

##Exploitons le code :

		animation : permet de spécifier le type de l'animation à appliquer par défaut c'est auto qui crée des animations aléatoires
		les autres valeurs d'animation sont : fadeIn,store,slideUp,advanced slide

## Author

[Nassim Bahri](https://www.facebook.com/Bahri.Nassim) ([LinkedIn](http://www.linkedin.com/pub/nassim-bahri/32/b38/a11))