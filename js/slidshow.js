/**
*@Copyright 2012
*Développer par Nassim Bahri 28/03/2012
*Plugin slideshow
*Licence GNU-GPL
Version 1.0
<div id="peview"><div class="thumb_arrow"></div></div>
**/
(function($) {
        $.fn.slideshow = function(params) {
			var defaut={
				animation	:'auto'
			};
			params = $.extend(defaut, params);
			
			
			/**
			*Initialisation de quelque variables
			**/
			var slider=$(this),
				image=slider.children('img'),
				nbImage=image.length,
				styleDiv={
					'position'	:'absolute',
					'top'		:'0',
					'left'		:'0'
				},
				pagination,
				currentElement=0,
				w=50
				widthSlider=0
				play=true	//Utile pour gérer les utilisation abusive
				;
			

			/**
			*Styliser les images du slider
			**/
			image.each(function(e){
				var div=$(this).wrap('<div></div>').parent().css(styleDiv);
				//Récupérer les dimensions des images
				var width=$(this).width();
				var height=$(this).height();
				//Compter le nombre de div nécessaire
				var nbDiv=countDiv(width,w);
				var img=$(this).attr('src');
				//Gréffer les div sur les images
				showStoreDiv(nbDiv,div,w,img,height);
				//Cacher les iamges
				$(this).hide();
				if(div.index()>0){div.hide();}	//Permet d'afficher seulement la première image
			});
			
			
			/**
			*Afficher la pagination
			**/
			if(nbImage>1){
				pagination=$('<ul class="slider-pagination">');
				pagination.appendTo(slider);
				for(var i=0;i<nbImage;i++){
					pagination.append('<li>&nbsp;</li>');
					pagination.children('li').eq(currentElement).addClass('current');
				}
				
			}
			
			
			/**
			*Afficher l'image concerné
			**/
			var element=pagination.children('li');
			element.click(function(){
				var i=$(this).index();
				var divImg=image.parent();
				if(i!=currentElement && play){
					play=false;
					currentElement=showElement(i,divImg,currentElement);
					element.removeClass('current');
					$(this).addClass('current');
				}
			});
			
			
			
			/**
			*Déclaration de quelques fonctions utiles
			**/
			//Fonction qui permet d'afficher l'image
			function showElement(indice,img,currentElement){
				var current=img.eq(currentElement);
				var child=current.children('div');
				var nbChild=child.length;
				var width=child.width();
				var height=child.height();
				img.eq(indice).show().css('z-index','888');
				current.css('z-index','999');
				
				var anim='';
				if(params.animation!='' && params.animation!='auto'){anim=params.animation;}
				else{anim=randomAnimation();}
				console.log(anim);
				switch(anim){
					case 'fadeIn':
						showWithFade(child,current,0,nbChild);
						break;
					case 'store':
						showWithResize(child,current,nbChild,width);
						break;
					case 'slideUp':
						showWithSlideUp(child,0,current,nbChild,height);
						break;
					case 'advanced slide':
						showWithAdvancedSlideUp(child,0,current,nbChild,height);
						break;
					default:
						showWithSlideUp(child,0,current,nbChild,height);
						break;
				}
				return indice;
			}
			
			//Fonction qui permet de compter le nombre de div nécessaires
			function countDiv(width,minW){
				return Math.ceil(width/minW);
			}
			
			//Fonction qui permet d'afficher les div sur l'image
			function showStoreDiv(nb,maDiv,w,myImage,h){
				var pos=0;
				for(var i=0;i<nb;i++){
				var style={
					'width'					:w+"px",
					"height"				:h+'px',
					'background'			:'url('+myImage+') left top',
					'background-position'	:-pos+'px 0',
					'position'				:'absolute',
					'top'					:'0',
					'left'					:pos+'px',
				}
					var d=$('<div></div>');
					d.appendTo(maDiv).css(style);
					pos+=w;
				}
			}
			
			/**
			*Fonctions récursive qui permet de cacher l'image courant
			**/
			//Fonction avec un fadeIn
			function showWithFade(img,current,nb,maximum){
				//console.log('on est : '+nb);
				img.eq(nb).fadeOut(100,function(){
					nb++;
					if(nb<maximum){
						showWithFade(img,current,nb,maximum);
					}
					else{
						current.hide();
						img.css('display','block');
						play=true;
					}
				});
			}
			
			//Fonction avec une anmation de resize width
			function showWithResize(img,current,maximum,w){
				var i=0;
				img.each(function(e){
					i++;
					$(this).animate({width:0},500,function(){
						if(i==maximum){
							current.hide();
							img.css({
								'display'	:'block',
								'width'		:w+'px'
							});
							play=true;
						}
					});
				});
			}
			
			//Fonction avec animation de slideDUp
			function showWithSlideUp(img,i,current,maximum,h){
				img.eq(i).animate({height:'0'},500,function(){
					i++;
					if(i<maximum){
						showWithSlideUp(img,i,current,maximum,h);
					}
					else{
						current.hide();
						img.css('height',h+'px');
						img.css('display','block');
						play=true;
					}
				});
			}
			
			//Fonction avec animation de slideUp avancée
			function showWithAdvancedSlideUp(img,i,current,maximum,h){
				current.children('div:odd').each(function(){
					i++;
					$(this).animate({top:-h+'px',opacity:'0'},1000);
				});
				current.children('div:even').each(function(){
					i++;
					$(this).animate({top:h+'px',opacity:'0'},1000,function(){
						if(i==maximum){
							current.hide();
							img.css({
								'display'	:'block',
								'top'		:'0px',
								'opacity'	:'1'
							});
							play=true;
						}
					});
				});
			}
			
			//Fonction qui permet de gérer les animations de façons aléatoires
			function randomAnimation(){
				var listAnimation=new Array('fadeIn','store','slideUp','advanced slide');
				var rand=Math.ceil(Math.random()*(listAnimation.length-1));
				return listAnimation[rand];
			}
			return $(this);
		};
})(jQuery);