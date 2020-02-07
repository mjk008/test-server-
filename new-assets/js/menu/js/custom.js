(function($) { "use strict";


	//Preloader

	//Royal_Preloader.config({
	//	mode           : 'number',
	//	showProgress   : false,
	//	showPercentage : false,
	//	text_colour    : '#777777',
	//	background     : '#FFFFFF'
	//});	


	/* Scroll animations */
	
	//window.scrollReveal = new scrollReveal();

	
	/* Scroll Too */
	
	//$(window).load(function(){"use strict";
	//			
	//	/* Page Scroll to id fn call */
	//	//$("ul.slimmenu li a,a[href='#top'],a[data-gal='m_PageScroll2id']").mPageScroll2id({
	//	//	highlightSelector:"ul.slimmenu li a",
	//	//	offset: 78,
	//	//	scrollSpeed:800,
	//	//	scrollEasing: "easeInOutCubic"
	//	//});
	//			
	//	/* demo functions */
	//	//$("a[rel='next']").click(function(e){
	//	//	e.preventDefault();
	//	//	var to=$(this).parent().parent("section").next().attr("id");
	//	//	$.mPageScroll2id("scrollTo",to);
	//	//});
	//			
	//});	

	
	$(document).ready(function() {

			
		//TaurusMenu	

		"use strict";

		$('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
		//Checks if li has sub (ul) and adds class for toggle icon - just an UI
		
		$(".menu > ul").before("<a href=\"#\" class=\"menu-mobile\"></a>");

		//Adds menu-mobile class (for mobile toggle menu) before the normal menu
		//Mobile menu is hidden if width is more then 1199px, but normal menu is displayed
		//Normal menu is hidden if width is below 1199px, and jquery adds mobile menu
		//Done this way so it can be used with wordpress without any trouble

		$('.menu > ul > li').hover(function(e) {
			if ($(window).width() > 1183) {
				$(this).children("ul").stop(true, false).toggleClass('active');
				e.preventDefault();
			}	
		});
		
		$(".menu > ul > li").click(function(e){
			if ($(window).width() < 1183) {
				var $me = $(this),
					width = $me.outerWidth(),
					height = $me.outerHeight(),
					top = $me.position().top,
					left = $me.position().left;
								
				var len = Math.sqrt(Math.pow(width - e.offsetX, 2) + Math.pow(e.offsetY, 2));

				if (len < 50)
					$(this).children("ul").stop(true, false).toggleClass('active');
			}
		});	

		//2nd dropdown
		$(".menu > ul > li > ul.normal-sub > li").hover(function (e) {
			if ($(window).width() > 1183) {
				$(this).children("ul").stop(true, false).fadeToggle(300);
				e.preventDefault();
			}
		});
		//If width is more than 1183px 2nd dropdowns are displayed on hover
		
		$(".menu-mobile").on('click', function (e) {
			$(".menu > ul").toggleClass('show-on-mobile');
			e.preventDefault();
		});
		//when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story

				
		//Tooltip

		//$(".tipped").tipper();

		
		//Parallax
		
		//$('.parallax-home').parallax("50%", 0.3); 
		
		
		//Video
						
		//$(".video-section").fitVids();

		
		//Tabs
		
		$('ul.tabs-taurus li').click(function(){
			var tab_id = $(this).attr('data-tab');

			$('ul.tabs-taurus li').removeClass('current');
			$('.tab-content-taurus').removeClass('current');

			$(this).addClass('current');
			$("#"+tab_id).addClass('current');
		})

	
		//Fancybox
		
		$(".fancybox").fancybox({
			maxWidth	: 1300,
			maxHeight	: 800,
			fitToView	: true,
			width		: '80%',
			height		: '80%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'elastic',
			closeEffect	: 'elastic'
		});	

		
		//Slider
		
		$("#owl-slider").owlCarousel({
							  
			pagination:true,
			slideSpeed : 300,
			autoPlay : 5000,
			singleItem:true							
						 
		});		

		
	//	//Set your google maps parameters
	//
	//	var latitude = 44.8013716,
	//		longitude = 20.4631372,
	//		map_zoom = 15;
	//
	//	//google map custom marker icon - .png fallback for IE11
	//	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	//	var marker_url = ( is_internetExplorer11 ) ? 'images/cd-icon-location.png' : 'images/cd-icon-location.svg';
	//		
	//	//define the basic color of your map, plus a value for saturation and brightness
	//	var	main_color = '#e67e22',
	//		saturation_value= -50,
	//		brightness_value= 14;
	//
	//	//we define here the style of the map
	//	var style= [
	//	{
	//		"featureType": "all",
	//		"elementType": "labels.text.fill",
	//		"stylers": [
	//			{
	//				"saturation": 36
	//			},
	//			{
	//				"color": "#000000"
	//			},
	//			{
	//				"lightness": 40
	//			}
	//		]
	//	},
	//	{
	//		"featureType": "all",
	//		"elementType": "labels.text.stroke",
	//		"stylers": [
	//			{
	//				"visibility": "on"
	//			},
	//			{
	//				"color": "#000000"
	//			},
	//			{
	//				"lightness": 16
	//			}
	//		]
	//	},
	//	{
	//		"featureType": "all",
	//		"elementType": "labels.icon",
	//		"stylers": [
	//			{
	//				"visibility": "off"
	//			}
	//		]
	//	},
	//	{
	//		"featureType": "administrative",
	//		"elementType": "geometry.fill",
	//		"stylers": [
	//			{
	//				"color": "#000000"
	//			},
	//			{
	//				"lightness": 20
	//			}
	//		]
	//	},
	//	{
	//		"featureType": "administrative",
	//		"elementType": "geometry.stroke",
	//		"stylers": [
	//			{
	//				"color": "#000000"
	//			},
	//			{
	//				"lightness": 17
	//			},
	//			{
	//				"weight": 1.2
	//			}
	//		]
	//	},
	//	{
	//		"featureType": "landscape",
	//		"elementType": "geometry",
	//		"stylers": [
	//			{
	//				"color": "#000000"
	//			},
	//			{
	//				"lightness": 20
	//			}
	//		]
	//	},
	//	{
	//		"featureType": "poi",
	//		"elementType": "geometry",
	//		"stylers": [
	//			{
	//				"color": "#000000"
	//			},
	//			{
	//				"lightness": 21
	//			}
	//		]
	//	},
	//	{
	//		"featureType": "road.highway",
	//		"elementType": "geometry.fill",
	//		"stylers": [
	//			{
	//				"color": "#000000"
	//			},
	//			{
	//				"lightness": 17
	//			}
	//		]
	//	},
	//	{
	//		"featureType": "road.highway",
	//		"elementType": "geometry.stroke",
	//		"stylers": [
	//			{
	//				"color": "#000000"
	//			},
	//			{
	//				"lightness": 29
	//			},
	//			{
	//				"weight": 0.2
	//			}
	//		]
	//	},
	//	{
	//		"featureType": "road.arterial",
	//		"elementType": "geometry",
	//		"stylers": [
	//			{
	//				"color": "#000000"
	//			},
	//			{
	//				"lightness": 18
	//			}
	//		]
	//	},
	//	{
	//		"featureType": "road.local",
	//		"elementType": "geometry",
	//		"stylers": [
	//			{
	//				"color": "#000000"
	//			},
	//			{
	//				"lightness": 16
	//			}
	//		]
	//	},
	//	{
	//		"featureType": "transit",
	//		"elementType": "geometry",
	//		"stylers": [
	//			{
	//				"color": "#000000"
	//			},
	//			{
	//				"lightness": 19
	//			}
	//		]
	//	},
	//	{
	//		"featureType": "water",
	//		"elementType": "geometry",
	//		"stylers": [
	//			{
	//				"color": "#000000"
	//			},
	//			{
	//				"lightness": 17
	//			}
	//		]
	//	}
	//];
	//		
	//	//set google map options
	//	var map_options = {
	//		center: new google.maps.LatLng(latitude, longitude),
	//		zoom: map_zoom,
	//		panControl: false,
	//		zoomControl: false,
	//		mapTypeControl: false,
	//		streetViewControl: false,
	//		mapTypeId: google.maps.MapTypeId.ROADMAP,
	//		scrollwheel: false,
	//		styles: style,
	//	}
	//	//inizialize the map
	//	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
	//	//add a custom marker to the map				
	//	var marker = new google.maps.Marker({
	//		position: new google.maps.LatLng(latitude, longitude),
	//		map: map,
	//		visible: true,
	//		icon: marker_url,
	//	});
	//
	//	//add custom buttons for the zoom-in/zoom-out on the map
	//	function CustomZoomControl(controlDiv, map) {
	//		//grap the zoom elements from the DOM and insert them in the map 
	//		var controlUIzoomIn= document.getElementById('cd-zoom-in'),
	//			controlUIzoomOut= document.getElementById('cd-zoom-out');
	//		controlDiv.appendChild(controlUIzoomIn);
	//		controlDiv.appendChild(controlUIzoomOut);
	//
	//		// Setup the click event listeners and zoom-in or out according to the clicked element
	//		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
	//			map.setZoom(map.getZoom()+1)
	//		});
	//		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
	//			map.setZoom(map.getZoom()-1)
	//		});
	//	}
	//
	//	var zoomControlDiv = document.createElement('div');
	//	var zoomControl = new CustomZoomControl(zoomControlDiv, map);
	//
	//	//insert the zoom div on the top left of the map
	//	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);		
				
			
	});	

	
	
})(jQuery); 
