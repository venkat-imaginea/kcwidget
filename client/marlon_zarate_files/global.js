// add last-child class
if (navigator.userAgent.match(/msie/i) ){
	$('*:last-child').addClass('last-child');
	$('#content table tr:nth-child(odd)').addClass('odd');
}

$(document).ready(function(){
	// Hide the # when you click on the hamubrger menu
	$('#mobile-menu-icon').click(function(e){
		e.preventDefault();
	});
		
	// toggle active class to expand/collapse burger menu
	$(".menu_link").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active")
		$(".menu").toggleClass("active");
		$(".search_link").removeClass("active");
		$("#search_form").removeClass("active");
	});

	// toggle active class to expand/collapse top level nav elements, 
	// but allow child links to still navigate to their target destination 
	$("#main_menu").on("click", ".menu.active li a:not(ul li ul li a)", function(e){
		e.preventDefault();
		$(this).parent("li").toggleClass("active").siblings("li").removeClass("active");
	});	

	$(".search_link").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$("#search_form").toggleClass("active");
		$(".menu").removeClass("active");
		$(".menu_link").removeClass("active");
	});	

	$("#searchInput").blur(function(e){
		$("#search_form").removeClass("active");
	});

    // hide/show .toggleContent
    $(".toggleLink").click(function(e){
    	e.preventDefault();
    	$(this).next(".toggleContent").slideToggle();
    });

    // modify quote forms on change
    format_quote_form($('#insurancetype'));
    $('#insurancetype').change(function(){
    	format_quote_form($(this));
    });

	// analytics for destination url when exiting site
	$('.exitpage').click(function(){
		//Grab url from link clicked
		 url = $(this).attr("href");
		// create url object to parse
		 var parser = document.createElement('a');
		 parser.href = url;
		// only send domain+path
		 url = parser.host+parser.pathname;
		// Validate is link and not empty to send to tracking url
		 if ( $(this).prop('tagName') == "A" && url!="" ) {
			$.getScript('/vs/track.js?log=1&ExternalSite='+url, function() {});
		 }
	});

	// fill in any User ID fields as necessary
	remember_me();

	// override to hide geolocation by default, this should be done in CSS 
	// but the design kit is set to always displays icons in IE8
	$('#geolocation').hide();
	
	// Show geolocation if available
	if (navigator.geolocation)
	{
		//load geolocation.js and do whatever is needed
		$.getScript('/public/scripts/design5/geolocation.js', function(){
			$('#geolocation').show();
			$('#geolocation').click(function(){
				get_geo_zip();
			});
		});
	}

	// overriding design kit menu positioning
	$('input, textarea').on('focus blur', $.proxy(function(e){ $('header').css('position', 'relative'); }, this));

	if(cookie_notice_check()) {
		cookie_notice_display();

		$('#cookie-notice-close').click(function() {
			cookie_notice_close();

		});
	}


});


// populate geolocation zip
function geo_zip_success(zip) {
	$('#zip, input[placeholder="ZIP Code"]').val(zip);
}


// Show and Hide Div Script
function display(elementID){
    nodeItem = elementID.parentNode.nextSibling;
	
    while(nodeItem.innerHTML == null || nodeItem.innerHTML == ""){
        nodeItem = nodeItem.nextSibling;
    }
	
	$(nodeItem).slideToggle('normal');
}

// return domain for cookie setting 
function get_cookie_domain() {

	var page = window.location.href;
	if (page.indexOf("geico.com") != -1) {
		return ".geico.com";
	} else if (page.indexOf("geico.net") != -1) {
		return ".geico.net";
	} else {
		return "";
	}
}

// quote submission script
function submitZip() {
		
		//Cookie Code
		if (document.cookie.indexOf("V5page") != -1) {
			//unset prior cookie
			document.cookie = 'V5page=; expires=09/09/1999 00:00:00';
		}
		
		if (document.cookie.indexOf("V5app") != -1) {
			//unset prior cookie
			document.cookie = 'V5app=; expires=09/09/1999 00:00:00';
		}
		
		var D = get_cookie_domain();
		
		
		var path = escape(window.location.pathname);
		for (var l = 0; l < path.length; l++) {
			path = path.replace("/", "%2F");
			path = path.replace("+", "%2B");
		}
		
		var d = new Date();
		var today = new Date();
		
		document.cookie = 'V5page=FormPage=' + path + '; expires=' + d.toGMTString(d.setTime(today.getTime() + 30000)) + '; path=/; domain=' + D;
		document.cookie = 'V5app=SelectedApp=' + document.getElementById('insurancetype').value + '; expires=' + d.toGMTString(d.setTime(today.getTime() + 30000)) + '; path=/; domain=' + D;
		
		//Form Submission
		var type = document.getElementById('insurancetype').value;	
		
		if(!IsNumeric(document.getElementById('zip').value)) {
			document.getElementById('zip').value = '';
		}
		
		var send_reply = false;
		var choiceID = null;
		//reply() event
		if (document.cookie.indexOf('static_site_case_id') != -1 && document.getElementById('choiceId') != null)
		{
			send_reply = true;
			choiceID = document.getElementById('choiceId').value;
		}

		switch(type) {
			case "auto":
				//Auto
				document.getElementById('zip').name = "POL_ratedZip5";			
				document.getElementById('quoteForm').action = "https://sales2.geico.com/internetsales/index.jsp";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'Auto', 'quoteForm'); }				
				break;
				
			case "motorcycle":
				//Motorcycle
				document.getElementById('zip').name = "POL_ratedZip5";
				document.getElementById('quoteForm').method = "get";
				document.getElementById('quoteForm').action = "https://buy.geico.com/ui/";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'Moto', 'quoteForm'); }
				break;
			
			case "atv":
				//ATV
				document.getElementById('zip').name = "POL_ratedZip5";
				document.getElementById('quoteForm').method = "get";
				document.getElementById('quoteForm').action = "https://buy.geico.com/ui/";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'Atv', 'quoteForm'); }
				break;
				
			case "home":
				//Home
				document.getElementById('optionHome').value = "0";
				document.getElementById('quoteForm').method = "get";
				document.getElementById('quoteForm').action = "https://homeowners.geico.com/SalesHISS/Landing/StartQuote";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'HO', 'quoteForm'); }
				break;
				
			case "renters":
				//Renters
				document.getElementById('optionRenters').value = "1";
				document.getElementById('quoteForm').method = "get";
				document.getElementById('quoteForm').action = "https://homeowners.geico.com/SalesHISS/Landing/StartQuote";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'Rent', 'quoteForm'); }
				break;
				
			case "condo":
				//Condo
				document.getElementById('optionCondoCoop').value = "2";
				document.getElementById('quoteForm').method = "get";
				document.getElementById('quoteForm').action = "https://homeowners.geico.com/SalesHISS/Landing/StartQuote";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'Condo', 'quoteForm'); }
				break;
				
			case "mobilehome":
				//Mobile Home
				document.getElementById('optionMobileHome').value = "5";
				document.getElementById('quoteForm').method = "get";
				document.getElementById('quoteForm').action = "https://homeowners.geico.com/SalesHISS/Landing/StartQuote";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'Mobile', 'quoteForm'); }
				break;
				
			case "boat":
				//Boat
				document.getElementById('quoteForm').method = "get";
				document.getElementById('quoteForm').action = "https://boat.geico.com/watercraft/Landing/GetQuote";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'Boat', 'quoteForm'); }
				break;
				
			case "rv":
				//RV
				document.getElementById('quoteForm').action = "https://rv.geico.com/sales/default.aspx";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'RV', 'quoteForm'); }
				break;
				
			case "life":
				//Life
				document.getElementById('quoteForm').action = "/getaquote/life/";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'Life', 'quoteForm'); }
				break;

			case "umbrella":
				//Umbrella
				document.getElementById('quoteForm').action = "/getaquote/umbrella/";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'Umb', 'quoteForm'); }
				break;
			
			case "idtheft":
				//ID Theft
				document.getElementById('quoteForm').action = "/getaquote/id-theft/";
				break;
				
			case "flood":
				//Flood
				document.getElementById('quoteForm').action = "/getaquote/flood/";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'Flood', 'quoteForm'); }
				break;

			case "travel":
				//Travel
				document.getElementById('quoteForm').action = "/getaquote/travel/";
				break;
				
			case "overseas":
				//Overseas
				document.getElementById('quoteForm').action = "/getaquote/overseas/";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'Sea', 'quoteForm'); }
				break;
				
			case "collectibles":
				//Collectibles
				document.getElementById('quoteForm').action = "/getaquote/collectibles/";
				break;
			
			case "businessowners":
				//Business Owners
				document.getElementById('quoteForm').action = "/getaquote/business-owners-policy/";
				break;

			case "general":
				//General Liability
				document.getElementById('quoteForm').action = "/getaquote/general-liability-insurance/";
				break;

			case "professional":
				//Professional Liability
				document.getElementById('quoteForm').action = "/getaquote/professional-liability-insurance/";
				break;
				
			case "commercial":
				//Commercial
				document.getElementById('quoteForm').action = "https://commercial.geico.com/Sales/Default.ashx";
				if(send_reply == true && choiceID != null) { reply(choiceID, 'Com', 'quoteForm'); }
				break;

			case "ridesharing":
				//Ridesharing
				document.getElementById('quoteForm').action = "/getaquote/ridesharing/";
				break;
				
			case "collector":
				//Commercial
				document.getElementById('quoteForm').action = "/getaquote/collector/";
				break;

			case "pet":
				//Pet
				document.getElementById('quoteForm').action = "/getaquote/pet/";
				break;
		}
		
		if(send_reply == false) { document.getElementById('quoteForm').submit(); }
}

// show/hide the zip fields and recall link for each product
function format_quote_form(product) 
{
	type = product.val();
	var zip_elements = $('label[for="zip"], input[id="zip"], #zipBox, #geolocation, #zipcode_wrapper');
	var recall_link = $('#recall_link');
	var recall_dropdown = $('#recallProduct');

	switch(type) {
		case "auto":
			zip_elements.show();
			recall_link.show();
			recall_dropdown.val(type);
			break;

		case "motorcycle":
			zip_elements.show();
			recall_link.show();
			recall_dropdown.val(type);
			break;

		case "atv":
			zip_elements.show();
			recall_link.show();
			recall_dropdown.val(type);
			break;

		case "home":
			zip_elements.show();
			recall_link.show();
			recall_dropdown.val(type);
			break;

		case "renters":
			zip_elements.show();
			recall_link.show();
			recall_dropdown.val(type);
			break;

		case "condo":
			zip_elements.show();
			recall_link.show();
			recall_dropdown.val(type);
			break;

		case "mobilehome":
			zip_elements.show();
			recall_link.hide();
			break;

		case "boat":
			zip_elements.show();
			recall_link.show();
			recall_dropdown.val(type);
			break;

		case "rv":
			zip_elements.show();
			recall_link.hide();
			break;

		case "life":
			zip_elements.hide();
			recall_link.hide();
			break;

		case "umbrella":
			zip_elements.hide();
			recall_link.hide();
			break;
		
		case "idtheft":
			zip_elements.hide();
			recall_link.hide();
			break;
			
		case "flood":
			zip_elements.hide();
			recall_link.hide();
			break;

		case "travel":
			zip_elements.hide();
			recall_link.hide();
			break;
			
		case "overseas":
			zip_elements.hide();
			recall_link.hide();
			break;
			
		case "collectibles":
			zip_elements.hide();
			recall_link.hide();
			break;
		
		case "businessowners":
			zip_elements.hide();
			recall_link.hide();
			break;

		case "general":
			zip_elements.hide();
			recall_link.hide();
			break;

		case "professional":
			zip_elements.hide();
			recall_link.hide();
			break;
		
		case "commercial":
			zip_elements.show();
			recall_link.show();
			recall_dropdown.val(type);
			break;

		case "ridesharing":
			zip_elements.hide();
			recall_link.show();
			recall_dropdown.val(type);
			break;

		case "collector":
			zip_elements.hide();
			recall_link.hide();
			break;
			
		case "pet":
			zip_elements.hide();
			recall_link.hide();
			break;

		default:
			zip_elements.show();
			recall_link.show();
	}
}

// Recall popup
function recallWindow() {
	var recallProduct = document.getElementById('recallProduct').value;
	switch(recallProduct)
	{
		case 'auto': 
			window.location='https://sales2.geico.com/internetsales/recallstatic.jsp?SIMPLIFIED_RECALL=review';
			break;
		case 'motorcycle': 
			window.location='https://buy.geico.com/ui/recall/';
			break;
		case 'atv': 
			window.location='https://buy.geico.com/ui/recall/';
			break;
		case 'home': 
			window.location='https://homeowners.geico.com/SalesHISS/Account/';
			break;
		case 'renters': 
			window.location='https://homeowners.geico.com/SalesHISS/Account/';
			break;
		case 'condo': 
			window.location='https://homeowners.geico.com/SalesHISS/Account/';
			break;
		case 'boat': 
			window.location='https://boat.geico.com/watercraft/Account/Logon';
			break;
		case 'commercial': 
			window.location='/getaquote/commercial/recall/';
			break;
		case 'ridesharing': 
			window.location='/getaquote/ridesharing/recall/';
			break;
	}
}

function keypressZip(e) {	
	var characterCode;
	if(e && e.which){
		e = e;
		characterCode = e.which;
	} else{
		e = event;
		characterCode = e.keyCode;
	}
	if (characterCode == 13 || characterCode == 3) {
		submitZip();
	}
}


function IsNumeric(inputString)
{
	var validChars = "0123456789";
	
	for (i = 0; i < inputString.length; i++)
	{
		if (validChars.indexOf(inputString.charAt(i)) < 0)
		{
			return false;
		}
	}	
	return inputString.length == 0 ? false : true;
}


// search form functionality
$('#searchInput').bind('focus blur', function() {
	var s = $('#searchInput');

	if(s.val() == 'Search') {
		s.val('');
	}
	else if(s.val() == '') {
		s.val('Search');
	}
});


$('#searchform').submit(function() {
	if($('#searchInput').val() == 'Search') {
		$('#searchInput').val('');
	}

	$.ajax({
		async: false,
		timeout: 3500,
		type: "POST",
		url: "/public/php/searchclick.php",
		data: {
			q: 	$('#searchInput').val(),
			ct: 'load',
			url: $(location).attr('href'),
			r: 0,
			s: 0,
			site: 'geico'
		},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		cache: false
	});
});


// remember me functionality
function remember_me()
{
	// ecams login fields
	if($.cookie('un') != null)
	{
		$('input[name="userName"]').val($.cookie('un'));
		$('input[name="rememberMe"]').prop('checked', true);
	}

	// commercial auto login fields
	if($.cookie('GeicoCommRemMe') != null)
	{
		$('input[name="tbloginName"]').val($.cookie('GeicoCommRemMe'));
		$('input[name="LOGIN_rememberMe"]').prop('checked', true);
	}
}


// functions associated with the cookie-notice <div> being displayed
function cookie_notice_check() {
	var urls = ['/about/contactus/overseas-locations/', '/about/fraud-awareness/escrow-scam/', '/getaquote/overseas/', '/information/aboutinsurance/overseas/', '/information/aboutinsurance/overseas/know-before-you-go/', '/information/military/deployment-center/', '/information/military/insurance/', '/information/military/insurance/overseas-military-insurance/', '/manageyourpolicy/overseas/'];

	if (urls.indexOf(window.location.pathname) > -1) {
		if($.cookie('cookie_notice') == null) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function cookie_notice_display() {
	var html = ' \
<div id="cookie-notice" class="container-fluid">\
	<div class="container">\
		<div class="col-sm-11 col-md-10">\
			<p>GEICO uses cookies to help us provide the best experience on <a href="/">www.geico.com</a>.  By continuing to use our website, you consent to the use of cookies.  For more information, please <a href="https://media.geico.com/legal/cookie_policy.html" onclick="openFooterLink(\'cookie\'); return false;">visit our cookie policy</a>.</p></div>\
		<div class="col-sm-1 col-md-2">\
			<p><input type="button" class="btn btn--secondary" value="Okay" id="cookie-notice-close"></p>\
		</div>\
  </div>\
</div>';
	$('body').append(html);
}

function cookie_notice_close() {
	$('#cookie-notice').remove();
	$.cookie('cookie_notice', 'false', { expires: 180, path:'/', domain: get_cookie_domain() });
}


function openFooterLink(type)
{
	url = '';

	switch(type)
	{
		case 'privacy':
			url = 'https://media.geico.com/legal/privacy_policy.htm';
		break;
		case 'security':
			url = 'https://media.geico.com/legal/security_policy.htm';
		break;
		case 'tou':
			url = 'https://media.geico.com/legal/terms_of_use.htm';
		break;
		case 'states':
			url = 'https://media.geico.com/legal/states_of_operation.htm';
		break;
		case 'cookie':
			url = 'https://media.geico.com/legal/cookie_policy.html';
	}
	
	window.open(url, type, 'height=410,width=500,toolbar=0,location=0,status=0,menuBar=0,scrollBars=1,resizable=no');
}


/////// Google Analytics event tracking ///////
//targeted selector to avoid script running on links that aren't being tracked
$(document).on('click', '#header_links a, .footer_links a, #portfolio a, #margin a, #index_list a, #rotating_panel a, #breadcrumbs a, #gfr_contact_info .phoneNum a, .gfr_content .phoneNum a', function()
{

	if (window._gat && window._gat._getTracker && linkCheck(this) && size_check(this)) {
		//GA available

		var timeout;
		var ga_category = getParent(this);
		var ga_label = getLink(this);

		//set callback to go to link's target
		_gaq.push(['_set', 'hitCallback', function(){ window.clearTimeout(timeout); window.location.href = ga_label; }]);

		//push eventtrack
		_gaq.push(['_trackEvent', ga_category, 'click', ga_label]);

		timeout = setTimeout(function(){ window.location.href = ga_label; }, 350)

		return false;
	}
});

function getParent(link)
{
	//finds parent element for link clicked -- returns label for GA event tracking, takes "this" keyword for clicked link
	//.is() works for #id and .class
	var locations = ['#header_links', '#main_menu', '.footer_links', '#portfolio', '#margin', '#index_list', '#rotating_panel', '#breadcrumbs', '#gfr_contact_info', '.gfr_content'];
	var labels = ['header_links', 'main_menu', 'footer', 'portfolio_links', 'margin', 'index_item', 'rotating_panel', 'breadcrumbs', 'gfr_detail', 'gfr_list'];

	var i = 0;
	var found = false;
	while(i < locations.length)
	{
		if($(link).parents().is(locations[i])) { 
			return labels[i];
		}
		i++;
	}
}

function getLink(link)
{
	//determines whether to return the file path or the full href for clicked link
	if(link.pathname == '/' || link.protocol == 'tel:')
	{
		return link.href;
	}
	else
	{
		//check for leading slash in pathname and add if necessary (IE, etc)
		var path = link.pathname.substring(0,1) == '/' ? link.pathname : '/' + link.pathname;

		//append pound string if present
		if(link.href.indexOf('#') != -1)
		{
			var hash = link.hash.substring(1);
			if(hash.indexOf('?') != -1)
			{
				var hashString = hash.split('?');
				hash = hashString[0];
			}
			path = path + '#' + hash;
		}
		//
		//append query string if present
		if(link.href.indexOf('?') != -1)
		{
			var queryString = link.href.split('?');
			path = path + '?' + queryString[1];
		}

		return path;

	}
}


function linkCheck(link)
{
	//checks to see if link is local or external, returns true for internal
	if(link.hostname == window.location.hostname || link.protocol == 'tel:')
	{
		//return false if link's href is #
		if($(link).attr('href') == '#') {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}

}

function size_check(link)
{
	//check to see if this is part of the hamburger menu on small/medium sizes -- don't apply GA tracking if link has .parent class
	if($('#shield_small').is(':visible') && $(link).parent().hasClass('parent')) {
		return false;
	} else {
		return true;
	}
}
/////// end Google Analytics event tracking ///////


// opinionlab content below
/*   OnlineOpinion v5.8.2 Released: 02/27/2014. Compiled 04/23/2014 09:51:37 AM -0500 Branch: CLIENTREQ-219 Apr Components: Full UMD: disabled The following code is Copyright 1998-2014 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com    */(function(a,b){if(('disabled'==='enabled')&&(typeof define==='function')&&define.amd){define([],b)}else{a.OOo=b()}}(this,function(){window.OOo={__detectBrowser:function(a){var b=Object.prototype.toString.call(window.opera)==='[object Opera]',c/*@cc_on=parseFloat((/MSIE[\s]*([\d\.]+)/).exec(navigator.appVersion)[1])@*/,d={IE:!!c,Opera:b,WebKit:a.indexOf('AppleWebKit/')>-1,Chrome:a.indexOf('Chrome')>-1,Gecko:a.indexOf('Gecko')>-1&&a.indexOf('KHTML')===-1,MobileSafari:/Apple.*Mobile.*Safari/.test(a),iOs:a.indexOf('iPad')>-1||a.indexOf('iPhone')>-1||a.indexOf('iPod')>-1,iOS67:a.search(/OS 6(.*)|7(.*) like Mac OS/i)>-1,PalmPre:a.indexOf('Pre/')>-1,BlackBerry:a.indexOf('BlackBerry')>-1,Fennec:a.indexOf('Fennec')>-1,IEMobile:a.indexOf('IEMobile')>-1,OperaMobile:a.search(/Opera (?:Mobi|Mini)/)>-1,Kindle:a.search(/[ ](Kindle|Silk)/)>-1,isChromeIOS:/crios/i.test(navigator.userAgent),ua:a},e=false;d.isMobile=(d.MobileSafari||d.PalmPre||d.BlackBerry||d.Fennec||d.IEMobile||d.OperaMobile||d.Kindle);d.isMobileNonIOS=(d.isMobile&&(!d.MobileSafari||a.search('Android')!==-1));return d}};OOo.Browser=OOo.__detectBrowser(navigator.userAgent);OOo.Cache={};OOo.instanceCount=0;OOo.K=function(){};var E=E||OOo;(function(){function k(a){return document.getElementById(a)}function l(a,b){var c;for(c in b){if(b.hasOwnProperty(c)){a[c]=b[c]}}return a}function o(a,b,c,d){if(a.addEventListener){a.addEventListener(b,c,d)}else if(a.attachEvent){a.attachEvent('on'+b,c)}}function m(a,b,c,d){if(a.removeEventListener){a.removeEventListener(b,c,d)}else if(a.detachEvent){a.detachEvent('on'+b,c)}}function s(a){var b=[],c;for(c in a){if(a.hasOwnProperty(c)){b.push(c+'='+(encodeURIComponent(a[c])||''))}}return b.join('&')}function n(a){var b=s(a.metrics),c=a.tealeafId+'|'+a.clickTalePID+'/'+a.clickTaleUID+'/'+a.clickTaleSID;b+='&custom_var='+OOo.createLegacyVars(a.legacyVariables,c);if(a.metrics.type==='OnPage'){b+='|iframe'}if(a.asm){b+='&asm=2'}b+="&_"+'rev=2';if(a.customVariables){b+='&customVars='+encodeURIComponent(OOo.serialize(a.customVariables))}return b}function q(a,b){var c=document,d=c.createElement('form'),e=c.createElement('input'),f=a.referrerRewrite;a.metrics.referer=location.href;if(f){a.metrics.referer=OOo.referrerRewrite(f)}d.style.display='none';d.method='post';d.target=b||'OnlineOpinion';d.action=a.onPageCard?'https://secure.opinionlab.com/ccc01/comment_card_json_4_0_b.asp?r='+location.href:'https://secure.opinionlab.com/ccc01/comment_card_d.asp';if(a.commentCardUrl){d.action=a.commentCardUrl;if(a.onPageCard){d.action+='?r='+location.href}}e.name='params';e.value=n(a);d.appendChild(e);c.body.appendChild(d);return d}function t(){return{width:screen.width,height:screen.height,referer:location.href,prev:document.referrer,time1:(new Date()).getTime(),time2:null,currentURL:location.href,ocodeVersion:'5.8.2'}}function p(a){var b='';if(a&&a.search('://')>-1){var c=a.split('/');for(var d=3;d<c.length;d++){b+="/";b+=c[d]}}return b}function r(a,b){a=a||{};if(typeof a==='string'){return b+'|'+a}return a.override?a.vars:b+(a.vars?'|'+a.vars:'')}function v(a,b){if(!b){b=location}if(typeof a==="string")return a;return a.searchPattern?b.href.replace(a.searchPattern,a.replacePattern):a.replacePattern}function w(a){'use strict';var b,c=false,d=document.getElementsByTagName('meta');if(d!=='undefined'){for(b=0;b<d.length;b+=1){if(d[b].getAttribute('name')===a){c=true}}}return c}var u=(function(){if(navigator.appName==="Microsoft Internet Explorer"&&navigator.userAgent.search("MSIE 6")!==-1){return true}var a=document.body,b,c;if(document.createElement&&a&&a.appendChild&&a.removeChild){b=document.createElement('iframe');c=false;b.setAttribute('name','oo_test');b.style.display='none';a.appendChild(b);c=!!!document.getElementsByName('oo_test')[0];a.removeChild(b);return c}else{return null}}());function z(){OOo.$('oo_container').style.display='none'}function C(){var a=OOo.$('oo_invitation_prompt');if(a){var b=OOo.$('oo_container');this.showPrompt(b);return}var c=window.XMLHttpRequest?new XMLHttpRequest():new window.ActiveXObject("Microsoft.XMLHTTP"),d=this,e=document.createElement('link'),f;c.onreadystatechange=function(){if(c.readyState!==4){return}d.showPrompt(c.responseText)};c.open("GET",this.options.pathToAssets+this.options.promptMarkup,true);c.send(null)}function x(a,b){var c=document,d=typeof a==='string'?c.createElement('div'):a,e=c.createElement('div'),f,g,h=this.options,i;e.id='oo_invitation_overlay';d.id='oo_container';d.style.visibility='hidden';if(typeof a==='string'){d.innerHTML=a;c.body.appendChild(d)}d.appendChild(e);i=OOo.$('oo_launch_prompt');if(h.companyLogo){f=new Image();f.src=h.companyLogo;OOo.$('oo_company_logo').appendChild(f);var j=OOo.$('oo_invitation_prompt').getElementsByTagName('h1');if(j!==null){j[0].style.position='relative'}}OOo.addEventListener(i,'click',b.bind(this),false);if(h.clickCallbacks){if(typeof h.clickCallbacks.yes==='function'){OOo.addEventListener(i,'click',function(){h.clickCallbacks.yes()},false)}if(typeof h.clickCallbacks.no==='function'){OOo.addEventListener(OOo.$('oo_no_thanks'),'click',function(){h.clickCallbacks.no()},false)}}if(OOo.Browser.IE&&!window.XMLHttpRequest){e.style.position='absolute';e.style.width=Math.max(document.documentElement.clientWidth,document.body.offsetWidth)+'px';e.style.height=Math.max(document.documentElement.clientHeight,document.body.offsetHeight)+'px';d.style.position='absolute'}d.style.visibility='visible';d.style.display='block';e.className='no_loading'}l(OOo,{extend:l,toQueryString:s,addEventListener:o,$:k,appendOOForm:q,removeEventListener:m,createMetrics:t,truncateMetric:p,createLegacyVars:r,DYNAMIC_FRAME_NAME_IS_BUGGY:u,getFormParams:n,referrerRewrite:v,hidePrompt:z,getPrompt:C,showPrompt:x})}());(function(){function f(a){if(!a){return null}switch(typeof a){case'number':case'boolean':case'function':return a;case'string':return'\''+a+'\'';case'object':var b,c,d,e;if(a.constructor===Array||typeof a.callee!=='undefined'){b='[';d=a.length;for(c=0;c<d-1;c+=1){b+=f(a[c])+','}b+=f(a[c])+']'}else{b='{';for(e in a){if(a.hasOwnProperty(e)){b+=e+':'+f(a[e])+','}}b=b.replace(/\,$/,'')+'}'}return b;default:return null}}OOo.extend(OOo,{serialize:f})}());(function(){function e(a,b,c){var d;if(a.search(b[0])!==-1){OOo.createCookie(c,0);return false}else if(OOo.readCookie(c)){d=parseInt(OOo.readCookie(c),10);if((a.search(b[d+1])!==-1)&&(d+1!==b.length-1)){OOo.createCookie(c,d+1);return false}else if(a.search(b[d])!==-1){return false}else if(d+1===b.length-1&&a.search(b.pop())!==-1){OOo.eraseCookie(c);return true}else{OOo.eraseCookie(c);return false}}else{return false}}OOo.extend(OOo,{checkTunnel:e})}());(function(){function q(a){var b="",c;for(c=7;c>=0;c-=1){b+='0123456789abcdef'.charAt((a>>(c*4))&0x0F)}return b}function t(a){var b=((a.length+8)>>6)+1,c=new Array(b*16),d;for(d=0;d<b*16;d+=1){c[d]=0}for(d=0;d<a.length;d+=1){c[d>>2]|=a.charCodeAt(d)<<(24-(d%4)*8)}c[d>>2]|=0x80<<(24-(d%4)*8);c[b*16-1]=a.length*8;return c}function p(a,b){var c=(a&0xFFFF)+(b&0xFFFF),d=(a>>16)+(b>>16)+(c>>16);return(d<<16)|(c&0xFFFF)}function r(a,b){return(a<<b)|(a>>>(32-b))}function v(a,b,c,d){if(a<20){return(b&c)|((~b)&d)}if(a<40){return b^c^d}if(a<60){return(b&c)|(b&d)|(c&d)}return b^c^d}function w(a){return(a<20)?1518500249:(a<40)?1859775393:(a<60)?-1894007588:-899497514}function u(a){var b=t(a),c=new Array(80),d=1732584193,e=-271733879,f=-1732584194,g=271733878,h=-1009589776,i,j,k,l,o,m,s,n;for(s=0;s<b.length;s+=16){i=d;j=e;k=f;l=g;o=h;for(n=0;n<80;n+=1){if(n<16){c[n]=b[s+n]}else{c[n]=r(c[n-3]^c[n-8]^c[n-14]^c[n-16],1)}m=p(p(r(d,5),v(n,e,f,g)),p(p(h,c[n]),w(n)));h=g;g=f;f=r(e,30);e=d;d=m}d=p(d,i);e=p(e,j);f=p(f,k);g=p(g,l);h=p(h,o)}return q(d)+q(e)+q(f)+q(g)+q(h)}OOo.extend(OOo,{sha1:u})}());(function(){function h(a,b){if(!b){b=location}var c=a.cookieName||'oo_abandon',d=OOo.readCookie(c),e=a.startPage,f=a.endPage,g=a.middle;if(!d){if(b.pathname.indexOf(e)!==-1){OOo.createCookie(c)}return false}else if(b.pathname.indexOf(f)!==-1){OOo.eraseCookie(c);return false}else if(b.pathname.search(g)!==-1){return false}else{OOo.eraseCookie(c);return true}}OOo.extend(OOo,{checkAbandonment:h})}());(function(){function d(a){var b,c;for(b=a.length-1;b>=0;b-=1){if(a[b].read){c=OOo.readCookie(a[b].name);if(!!c&&c===a[b].value){return true}else if(typeof a[b].value==='undefined'&&!!OOo.readCookie(a[b].name)){return true}}}return false}function e(a){var b;for(b=a.length-1;b>=0;b-=1){if(a[b].set){OOo.createCookie(a[b].name,a[b].value,a[b].expiration)}}}OOo.extend(OOo,{checkThirdPartyCookies:d,setThirdPartyCookies:e})}());OOo.extend(Function.prototype,(function(){if(typeof Function.prototype.bind!=="undefined"){return}var e=Array.prototype.slice;function f(a,b){var c=a.length,d=b.length;while(d){d-=1;a[c+d]=b[d]}return a}function g(a,b){a=e.call(a,0);return f(a,b)}function h(b){if(arguments.length<2&&typeof b==="undefined"){return this}var c=this,d=e.call(arguments,1);return function(){var a=g(d,arguments);return c.apply(b,a)}}return{bind:h}}()));(function(){function f(a){if(!a){a=location}var b;if(a.host.search(/\.[a-z]+/)!==-1){b=a.host.split('.').reverse();if(b.length>3){return a.host}b='.'+b[1]+'.'+b[0]}else{b=a.host}return b}function g(a,b,c){var d='',e='';if(c){d=new Date();d.setTime(d.getTime()+(c*1000));e="; expires="+d.toGMTString()}if(location.host!==f()){document.cookie=a+"="+b+e+"; path=/; domain="+f()+";"}else{document.cookie=a+"="+b+e+"; path=/;"}}function h(a){var b=a+"=",c=document.cookie.split(';'),d,e;for(e=0;e<c.length;e+=1){d=c[e];while(d.charAt(0)===' '){d=d.substring(1,d.length)}if(d.indexOf(b)===0){return d.substring(b.length,d.length)}}return null}function i(a){g(a,"",-1)}OOo.extend(OOo,{getCookieDomain:f,createCookie:g,readCookie:h,eraseCookie:i})}());OOo.Ocode=function(a){var b=OOo.Browser,c,d;if(a.disableMobile&&b.isMobile){return}if(a.disableNoniOS&&b.isMobileNonIOS){return}OOo.instanceCount+=1;this.options={tealeafCookieName:'TLTSID'};OOo.extend(this.options,a);c=this.options;c.metrics=OOo.createMetrics();this.frameName=c.onPageCard?'OnlineOpinion'+OOo.instanceCount:'OnlineOpinion';if(c.cookie&&OOo.Ocode.matchUrl(c.cookie,location)){return}if(c.thirdPartyCookies&&OOo.checkThirdPartyCookies(c.thirdPartyCookies)){return}if(c.abandonment&&!OOo.checkAbandonment(c.abandonment)){return}if(c.tunnel&&!OOo.checkTunnel(location.pathname,c.tunnel.path,c.tunnel.cookieName)){return}if(c.events&&c.events.onSingleClick){this.singProbability=Math.random()<1-c.events.onSingleClick/100}c.tealeafId=OOo.readCookie(c.tealeafCookieName)||OOo.readCookie(c.sessionCookieName);if(c.events){this.setupEvents();if(c.events.disableLinks||c.events.disableFormElements){this.setupDisableElements()}}if(c.floating){this.floating()}else if(c.bar){this.bar()}else if(c.tab){this.tab()}};OOo.Ocode.prototype={show:function(a,b){if(a==='Tab'&&b&&b.preventDefault){b.preventDefault()}if(this.onPageCardVisible){return}var c=this.options,d;if(c.events&&c.events.prompt){if(c.cookie)OOo.eraseCookie(c.cookie.name||'oo_r');OOo.hidePrompt()}if(this.interruptShow){return}if(!this.floatingLogo&&c.cookie&&OOo.Ocode.matchUrl(c.cookie)){return}if(!c.floating&&c.events&&this.singProbability){return}if(c.events&&c.events.onSingleClick){this.singProbability=true}if(c.cookie){OOo.Ocode.tagUrl(c.cookie)}if(c.thirdPartyCookies){if(OOo.checkThirdPartyCookies(c.thirdPartyCookies)){return}OOo.setThirdPartyCookies(c.thirdPartyCookies)}if(this.floatingLogo){this.floatingLogo.children[0].blur()}if(this.floatingLogo&&c.disappearOnClick){this.floatingLogo.style.display='none'}if(a){c.metrics.trigger=a}if(c.clickTalePID&&typeof window.ClickTale==='function'){c.clickTaleUID=window.ClickTaleGetUID();c.clickTaleSID=window.ClickTaleGetSID()}if(c.onPageCard&&!OOo.Browser.isMobile){this.setupOnPageCC()}else{this.launchOOPopup()}d=c.floating||c.tab||c.bar;if(d&&typeof d.onClickCallback==='function'){d.onClickCallback()}}};OOo.extend(OOo.Ocode,{tagUrl:function(a,b){if(!b){b=location}var c=a.name||'oo_r',d=a.type==='page'?b.href:b.hostname,e=OOo.readCookie(c)||'';if(OOo.Ocode.matchUrl(a,b)){return}OOo.createCookie(c,e+OOo.sha1(d),a.expiration)},matchUrl:function(a,b){if(!b){b=location}var c=OOo.readCookie(a.name||'oo_r'),d;if(!c){return false}d=a.type==='page'?b.href:b.hostname;return c.search(OOo.sha1(d))!==-1}});(function(){var i=0;function j(){var a=this.options,b=a.newWindowSize||[545,325],c=[parseInt((a.metrics.height-b[1])/2,10),parseInt((a.metrics.width-b[0])/2,10)],d,e,f='resizable=yes,location=no,status=no,scrollbars=1,width='+b[0]+',height='+b[1]+',top='+c[0]+',left='+c[1],g='OnlineOpinion';if(a.newWindow){g=g+(i++)}a.metrics.time2=(new Date()).getTime();a.metrics.type='Popup';d=OOo.appendOOForm(a,g);var h='https://secure.opinionlab.com/ccc01/comment_card_d.asp?'+d.children[0].value;if(a.commentCardUrl){h=a.commentCardUrl}if(OOo.Browser.isChromeIOS){g='_0'}if(OOo.Browser.isMobile&&OOo.Browser.ua.search('Android')!==-1){d.submit()}else{e=window.open(h,g,f);if(e&&!OOo.Browser.isChromeIOS){d.submit()}}}OOo.extend(OOo.Ocode.prototype,{launchOOPopup:j})}());(function(){function j(){var a=this.options.events,b=[false,false],c=['onExit','onEntry'],d='beforeunload',e,f,g,h,i;if(OOo.Browser.Opera){d='unload'}if(OOo.Browser.iOs){d='pagehide'}if(a.prompt){OOo.extend(this.options,{promptMarkup:a.prompt.promptMarkup||'oo_event_prompt.html',neverShowAgainButton:false,pathToAssets:a.prompt.pathToAssets})}for(g=c.length-1;g>=0;g-=1){e=c[g];if(a[e]instanceof Array){h=a[e];i=h.length;while(i&&!b[g]){i-=1;if(window.location.href.search(h[i].url)!==-1&&Math.random()>=1-h[i].p/100){b[g]=true}}}else if(a[e]&&Math.random()>=1-a[e]/100){b[g]=true}}if(b[0]){OOo.addEventListener(window,d,this.show.bind(this,'onExit'),false)}if(b[1]){if(a.delayEntry){window.setTimeout(function(){if(a.prompt)this.getPrompt();else this.show()}.bind(this,'onEntry'),a.delayEntry*1000)}else{if(a.prompt)this.getPrompt();else this.show('onEntry')}}}function k(a){var b=a||window.event,c=a.target||a.srcElement,d=this.options.events,e=c.parentNode,f=5,g=0;while(e&&(c.nodeName!=='A'||c.nodeName!=='INPUT')&&g!==f){if(e.nodeName==='A'){c=e}e=e.parentNode;g+=1}if(d.disableFormElements&&(c.tagName==="INPUT"||c.tagName==="BUTTON")&&(c.type==='submit'||c.type==='image'||c.type==='reset'||c.type==='button')){this.interruptShow=true}if(d.disableLinks&&(c.nodeName==='A'||c.nodeName==='AREA')&&c.href.substr(0,4)==='http'&&c.href.search(d.disableLinks)!==-1){this.interruptShow=true}}function l(a){this.interruptShow=true}function o(){OOo.addEventListener(document.body,'mousedown',k.bind(this));if(!this.options.events.disableFormElements){return}var a=document.getElementsByTagName('form'),b;for(b=a.length-1;b>=0;b-=1){OOo.addEventListener(a[b],'submit',l.bind(this))}}OOo.extend(OOo.Ocode.prototype,{setupEvents:j,setupDisableElements:o,getPrompt:function(){OOo.getPrompt.call(this)},showPrompt:function(a){if(this.options.cookie){OOo.Ocode.tagUrl(this.options.cookie)}OOo.showPrompt.call(this,a,this.show)}})}());OOo.extend(OOo.Ocode.prototype,{floating:function(){var d=document,e=this.floatingLogo=document.createElement('div'),f=d.createElement('div'),g=d.createElement('div'),h=d.createElement('div'),i=d.createElement('span'),j=this.options.floating,k=OOo.$(j.contentId),l='10px',o=j.id,m=d.createElement('span'),s,n,q,t,p,r,v,w;function u(a){return a.offsetLeft+a.offsetWidth}function z(a){t.style.left=u(k)+'px'}m.innerHTML="Screen reader users: Please switch to forms mode for this link.";m.className="screen_reader";if(o){e.id=o}e.className='oo_feedback_float';g.className='oo_transparent';f.className='olUp';h.className='olOver';f.tabIndex=0;f.onkeyup=function(a){s=a||window.event;if(s.keyCode!==13){return}this.show()}.bind(this);f.innerHTML=j.caption||'Feedback';e.appendChild(m);e.appendChild(f);i.innerHTML=j.hoverCaption||'Click here to<br>rate this page';h.appendChild(i);e.appendChild(h);e.appendChild(g);function C(a){var b=d.documentElement.scrollTop||d.body.scrollTop,c=d.documentElement.clientHeight||document.body.clientHeight;e.style.top=(b+c-(v||0)-10)+'px'}if(OOo.Browser.MobileSafari){if(OOo.Browser.ua.search('OS 4')!==-1){n=window.innerHeight;e.style.bottom=null;e.style.top=(window.pageYOffset+window.innerHeight-60)+'px';w=function(a){q=window.pageYOffset-(n-window.innerHeight);e.style.webkitTransform='translateY('+q+'px)'};OOo.addEventListener(window,'scroll',w,false);setTimeout(w,100)}}if(j.position&&j.position.search(/Content/)&&k){t=this.spacer=d.createElement('div');p=OOo.Browser.WebKit?d.body:d.documentElement;t.id='oo_feedback_fl_spacer';t.style.left=u(k)+'px';d.body.appendChild(t);switch(j.position){case'rightOfContent':r=function(a){e.style.left=(u(k)-p.scrollLeft)+'px'};break;case'fixedPreserveContent':r=function(a){var b=OOo.Browser.IE?d.body.clientWidth:window.innerWidth,c=p.scrollLeft;if(b<=u(k)+e.offsetWidth+parseInt(l,10)){e.style.left=(u(k)-c)+'px'}else{e.style.left='';e.style.right=l}};break;case'fixedContentMax':r=function(a){var b=OOo.Browser.IE?d.body.clientWidth:window.innerWidth;if(b<=u(k)+e.offsetWidth+parseInt(l,10)){e.style.left='';e.style.right=l}else{e.style.left=(u(k)-p.scrollLeft)+'px';e.style.right=''}};break}window.setTimeout(r,0);OOo.addEventListener(window,'scroll',r,false);OOo.addEventListener(window,'resize',r,false);OOo.addEventListener(window,'resize',z,false)}else{e.style.right=l}OOo.addEventListener(e,'click',this.show.bind(this,'Floating'),false);OOo.addEventListener(e,'touchend',this.show.bind(this,'Floating'),false);d.body.appendChild(e)},removeFloatingLogo:function(){document.body.removeChild(this.floatingLogo);if(this.spacer){document.body.removeChild(this.spacer)}}});OOo.extend(OOo.Ocode.prototype,{bar:function(){var d=document,e=this.floatingLogo=d.createElement('div'),f=d.createElement('span'),g,h,i,j=d.documentElement.scrollTop||d.body.scrollTop,k=d.createElement('div');function l(a){var b=0,c=0;if(a.offsetParent){do{b+=a.offsetLeft;c+=a.offsetTop}while(a==a.offsetParent);return[b,c]}}function o(a){var b=document.activeElement,c;if(!b)return;c=l(b);if(!c)return;if(c[1]+b.clientHeight>(window.innerHeight||document.body.clientHeight)+(window.pageYOffset||document.body.scrollTop)-e.clientHeight){if(navigator.appVersion.indexOf("MSIE 7.")!==-1){window.scrollBy(0,0)}else{window.scrollBy(0,b.clientHeight+20)}}}k.innerHTML='Link opens comment card';k.className='screen_reader';e.appendChild(k);this.reflowBar=OOo.K;e.id='oo_bar';f.innerHTML=this.options.bar.caption||'Feedback';e.appendChild(f);e.tabIndex=0;e.onkeyup=function(a){var b=a||window.event;if(b.keyCode!==13){return}this.show()}.bind(this);OOo.addEventListener(e,'click',this.show.bind(this,'Bar'));document.body.className+=document.body.className<1?'oo_bar':' oo_bar';document.body.appendChild(e);var m=/MSIE ([\d\.]+);/.exec(window.navigator.userAgent);if(OOo.Browser.IE&&m&&+m[1]<8){if(d.compatMode==='CSS1Compat'){g=function(a){if(a&&a.type==='resize'){setTimeout(g,50)}e.style.top=(d.documentElement.scrollTop+document.documentElement.clientHeight-e.clientHeight-1)+'px';e.style.width=(Math.max(d.documentElement.clientWidth,d.body.offsetWidth))+'px'}}else{g=function(a){e.style.top=(d.body.scrollTop+document.body.clientHeight-e.clientHeight-1)+'px';e.style.width=(Math.max(d.documentElement.clientWidth,d.body.offsetWidth)-22)+'px'}}e.style.position='absolute';OOo.addEventListener(window,'scroll',g,false);OOo.addEventListener(window,'resize',g,false);this.reflowBar=function(){e.style.display='none';g();e.style.display='block'};g()}else if(OOo.Browser.MobileSafari&&OOo.Browser.ua.search('OS 4')!==-1){h=window.innerHeight;e.style.bottom=null;e.style.top=(window.pageYOffset+window.innerHeight-22)+'px';g=function(a){i=window.pageYOffset-(h-window.innerHeight);e.style.webkitTransform='translateY('+i+'px)'};OOo.addEventListener(window,'scroll',g,false);setTimeout(g,100)}OOo.addEventListener(document.body,'keyup',o,false)}});OOo.extend(OOo.Ocode.prototype,{tab:function(){var e=document,f=this.floatingLogo=e.createElement('div'),g=e.createElement('div'),h=e.createElement('div'),i=e.createElement('span'),j=this.options.tab,k=e.createElement('a'),l='Feedback',o=j.tabType,m='right';if(j.wcagBasePath){h=e.createElement('a');h.setAttribute('href','#');i=e.createElement('img');i.className='logo';i.setAttribute('alt',"Feedback");i.setAttribute('src',j.wcagBasePath+((OOo.Browser.ua.search('IE 6')!==-1)?"oo_tabie6.png":"oo_tab.png"))}function s(a){var b=e.documentElement.scrollTop||e.body.scrollTop,c=e.documentElement.scrollLeft||e.body.scrollLeft,d=e.documentElement.clientHeight||document.body.clientHeight;f.style.top=(b+(d/2-f.clientHeight/2))+'px';if((!j.position||j.position==='right'))f.style.right=(-1*c+2)+'px'}function n(a){f.style.top=pageYOffset+(innerHeight/2-f.clientHeight/2)+'px';f.style.right=document.documentElement.clientWidth-window.innerWidth-window.pageXOffset-15+'px'}f.id='oo_tab';f.className='oo_tab_'+(j.position||m);if(typeof o==='number'&&o>=0){f.id='oo_tab_'+o;if(j.position!==undefined){m=j.position}f.className='oo_tab_'+m+'_'+o;if(j.verbiage!==undefined){l=j.verbiage}switch(o){case 1:k.id='oo_tab_text_'+o;k.className=m;k.innerHTML=l;if(m==='left'){k.className=j.position;if(OOo.Browser.isMobile||OOo.Browser.iOs){k.style.left='5px'}}break}}if(j.wcagBasePath){f.className+=' wcag'}if(typeof j.tabIndex==='number'){f.tabIndex=j.tabIndex}else if(typeof j.tabIndex==='undefined'){f.tabIndex=0}f.onkeyup=function(a){var b=a||window.event;if(b.keyCode!==13){return}this.show()}.bind(this);h.appendChild(k);f.appendChild(h);h.appendChild(i);f.appendChild(h);if(g){g.className='screen_reader';g.innerHTML='Activate to launch comment card';f.appendChild(g)}OOo.addEventListener(f,'click',this.show.bind(this,'Tab'),false);e.body.appendChild(f);var q=e.getElementById('oo_tab');if(typeof f==='object'&&f!==null){f.appendChild(i)}if(OOo.Browser.MobileSafari&&OOo.Browser.ua.search('OS 4')!==-1){f.style.position='absolute';OOo.addEventListener(window,'scroll',n,false);setTimeout(n,100)}}});OOo.extend(OOo.Ocode.prototype,{setupOnPageCC:function(){var e=document,f=OOo.Cache.overlay||e.createElement('div'),g=this.wrapper=e.createElement('div'),h=e.createElement('div'),i=e.createElement('div'),j=e.createElement('span'),k=this.frameName,l=e.createElement(OOo.DYNAMIC_FRAME_NAME_IS_BUGGY?'<iframe name="'+k+'">':'iframe'),o=e.createDocumentFragment(),m=this.options,s=m.onPageCard,n='https://secure.opinionlab.com/ccc01/comment_card_json_4_0_b.asp',q,t,p,r=false,v=this,w,u,z,C,x,D,A,B=e.createElement('span');function y(a){if(a&&a.preventDefault){a.preventDefault()}document.body.focus();l.tabIndex=-1;l.title="empty";l['aria-hidden']='true';f.style.display='none';f.className='';e.body.removeChild(g);if(window.postMessage){OOo.removeEventListener(window,'message',x)}else{window.clearInterval(t)}r=false;v.onPageCardVisible=false;return false}x=OOo.Ocode.postMessageHandler(function(a){var b=parseInt(a,10),c,d;if(b>0){if(r){return}r=true;c=window.innerHeight||e.documentElement.clientHeight||e.body.clientHeight;d=b;A=g.offsetTop;if(d+A>c){d=c-40-A}l.style.width='555px';i.style.width='555px';l.style.height=d+'px';g.style.visibility='visible';if(j.clientHeight<20){j.style.height=g.offsetHeight+'px'}f.className="no_loading";v.onPageCardVisible=true;q&&e.body.removeChild(q)}else if(a==='submitted'){y()}if(OOo.Browser.IE&&e.compatMode==="BackCompat"){window.scrollTo(0,0)}},v.options.commentCardUrl);m.metrics.type='OnPage';OOo.Cache.overlay=f;f.id='oo_overlay';f.style.display='block';f.className='';i.className='iwrapper';g.className='oo_cc_wrapper';g.setAttribute('role','alert');g.setAttribute('aria-describedby','comment_card_description');B.className='screen_reader';B.id='comment_card_description';B.innerHTML='Please leave your feedback in the comment card you just activated';g.appendChild(B);h.className='oo_cc_close';h.innerHTML='<span class="screen_reader">Link closes comment card</span>X';h.title=m.closeTitle?m.closeTitle:'Click to close comment card';g.style.visibility='hidden';h.tabIndex=0;h.onkeyup=function(a){var b=a||window.event;if(b.keyCode!==13){return}y()};if(OOo.Browser.IE){l.frameBorder='0';if(!window.XMLHttpRequest||e.compatMode==="BackCompat"){D=Math.max(e.documentElement.clientWidth,e.body.offsetWidth);f.style.position='absolute';f.style.width=e.compatMode==="BackCompat"?(D-21)+'px':D+'px';f.style.height=Math.max(e.documentElement.clientHeight,e.body.offsetHeight)+'px';g.style.position='absolute';OOo.addEventListener(window,'scroll',function(){f.style.top=(e.body.scrollTop+document.body.clientHeight-f.clientHeight)+'px';g.style.top=(e.body.scrollTop+A+25)+'px'})}}OOo.addEventListener(h,'click',y);if(s.closeWithOverlay&&!OOo.Browser.isMobile){g.appendChild(j);j.onclick=y;f.onclick=y}l.src=' ';l.name=k;l.title='Comment Card';i.appendChild(h);i.appendChild(l);g.appendChild(i);o.appendChild(g);o.appendChild(f);e.body.appendChild(o);if(window.postMessage){OOo.addEventListener(window,"message",x)}else{t=setInterval(x,500)}m.metrics.time2=(new Date()).getTime();q=OOo.appendOOForm(m,k);q.submit()}});OOo.extend(OOo.Ocode,{postMessageHandler:function(d,e,f){return function(a){var b='https://secure.opinionlab.com',c;if(!f){f=location}if((a&&!(a.origin===b||a.origin.indexOf(e)!==0))||(!a&&f.hash.search('OL=')===-1)){return false}c=a?a.data:f.hash.split('=').pop();if(!a&&location.hash){location.hash=''}d(c);return c}}});OOo.Invitation=function(a){if(OOo.Browser.isMobile){return}this.options={tunnelCookie:'oo_inv_tunnel',repromptTime:604800,responseRate:50,repromptCookie:'oo_inv_reprompt',promptMarkup:'oo_inv_prompt.html',promptStyles:'oo_inverstitial_style.css',percentageCookie:'oo_inv_percent',pagesHitCookie:'oo_inv_hit',popupType:'popunder',promptDelay:0,neverShowAgainButton:false,loadPopupInBackground:false,truncatePrevCurrentMetrics:false,disablePrevCurrentMetrics:false,tealeafCookieName:'TLTSID',monitorWindow:'oo_inv_monitor.html',beforePrompt:OOo.K};this.popupShown=false;OOo.extend(this.options,a);var b=this.options,c=parseInt(OOo.readCookie(b.pagesHitCookie),10)||0;OOo.Invitation.friendlyDomains=b.friendlyDomains||null;var d={weight:Number(OOo.readCookie('oo_OODynamicRewrite_weight')),searchPattern:OOo.readCookie('oo_OODynamicRewrite_searchPattern'),replacePattern:OOo.readCookie('oo_OODynamicRewrite_replacePattern')};OOo.eraseCookie('oo_OODynamicRewrite_weight');OOo.eraseCookie('oo_OODynamicRewrite_searchPattern');OOo.eraseCookie('oo_OODynamicRewrite_replacePattern');if(!window.OOoDynamicRewrite||window.OOoDynamicRewrite.weight<d.weight){window.OOoDynamicRewrite=d}if(window.OOoDynamicRewrite&&('number'===typeof window.OOoDynamicRewrite.weight)&&!isNaN(window.OOoDynamicRewrite.weight)){OOo.createCookie('oo_OODynamicRewrite_weight',window.OOoDynamicRewrite.weight);if(window.OOoDynamicRewrite.searchPattern){OOo.createCookie('oo_OODynamicRewrite_searchPattern',window.OOoDynamicRewrite.searchPattern)}if(window.OOoDynamicRewrite.replacePattern){OOo.createCookie('oo_OODynamicRewrite_replacePattern',window.OOoDynamicRewrite.replacePattern)}}if(location.search.search('evs')!==-1||OOo.readCookie('oo_evs_friendly')==='yes'){OOo.eraseCookie('oo_evs_friendly');b.loadPopupInBackground=true;this.launchPopup();OOo.createCookie(b.repromptCookie,1,b.repromptTime===-1?0:b.repromptTime)}setTimeout(function(){if(!window.oo_inv_monitor){return}if(b.area&&location.href.search(b.area)===-1){this.options.popupType='popup';this.launchPopup()}else if(b.goal&&location.href.search(b.goal)!==-1){window.oo_inv_monitor.close()}}.bind(this),1600);if(OOo.readCookie(b.repromptCookie)){return}if(b.thirdPartyCookies&&OOo.checkThirdPartyCookies(b.thirdPartyCookies)){return}if(!OOo.readCookie(b.percentageCookie)){OOo.createCookie(b.percentageCookie,(Math.random()>1-(b.responseRate/100))?"1":"0")}if(typeof b.promptTrigger!=='undefined'){if(b.promptTrigger instanceof RegExp){if(!window.location.href.match(b.promptTrigger)){return}}else if(b.promptTrigger instanceof Array){if(!OOo.checkTunnel(location.pathname,b.promptTrigger,b.tunnelCookie)){return}}}c+=1;OOo.createCookie(b.pagesHitCookie,c);if(b.pagesHit&&c<b.pagesHit){return}OOo.eraseCookie(b.tunnelCookie);if(OOo.readCookie(b.percentageCookie)==='1'){window.setTimeout(function(){OOo.createCookie(b.repromptCookie,1,b.repromptTime);this.options.beforePrompt();this.getPrompt()}.bind(this),b.promptDelay*1000)}};OOo.Invitation.notifyFriendlyLocationChange=function(a){if(window.oo_inv_monitor){OOo.createCookie('oo_evs_friendly','yes')}};OOo.Invitation.prototype={getPrompt:function(){OOo.getPrompt.call(this)},showPrompt:function(a){OOo.showPrompt.call(this,a,this.launchPopup)},launchPopup:function(){if(this.popupShown){return}this.popupShown=true;var b=this.options,c=window.location.href,d=b.popupType==='popup'?'https://secure.opinionlab.com/ccc01/comment_card.asp?':b.pathToAssets+b.monitorWindow+'?'+(new Date()).getTime()+'&',e,f=[],g=b.asm?[555,500]:[400,335],h,i=OOo.createMetrics(),j=OOo.readCookie(b.tealeafCookieName),k;if(b.clickTalePID&&window.ClickTaleGetUID&&window.ClickTaleGetSID){j+='|'+[b.clickTalePID,window.ClickTaleGetUID(),window.ClickTaleGetSID()].join('/')}g=b.newWindowSize||g;k='location=no,status=no,width='+g[0]+',height='+g[1];if(b.referrerRewrite){i.referer=OOo.referrerRewrite(b.referrerRewrite)}if(b.truncatePrevCurrentMetrics){i.prev=OOo.truncateMetric(i.prev);i.currentURL=OOo.truncateMetric(i.currentURL)}if(b.disablePrevCurrentMetrics){i.prev='';i.currentURL=''}if(b.thirdPartyCookies){OOo.setThirdPartyCookies(b.thirdPartyCookies)}e=OOo.toQueryString(i)+'&type=Invitation';if(b.customVariables){e+='&customVars='+encodeURIComponent(OOo.serialize(b.customVariables))}e+='&custom_var='+OOo.createLegacyVars(b.legacyVariables,j);if(b.asm){e+='&asm=2';k+=',scrollbars=1'}d+=e;if(d.match(/\?/g).length===2)d=d.replace(/\?([^?]*)$/,'&$1');this.popup=h=window.open(d,'OnlineOpinionInvitation',k);if(!b.loadPopupInBackground&&OOo.$('oo_container')){OOo.hidePrompt()}if(b.popupType==='popunder'){if(!OOo.Browser.Chrome){h.blur();window.focus()}else{if(!b.loadPopupInBackground){window.alert(b.chromeMainWinPrompt||'Please fill out the form behind this window when you are finished.')}if(b.chromeSurveyPrompt){setTimeout(function(a){h.postMessage(b.chromeSurveyPrompt,"*")},500)}}}else if(window.oo_inv_monitor){if(!OOo.Browser.Chrome){window.blur();h.focus()}else{h.alert(b.chromeSurveyPrompt||'Please fill out the form');h.focused=true}}},killPrompt:function(){if(this.options.clickCallbacks&&typeof this.options.clickCallbacks.no==='function'){this.options.clickCallbacks.no()}OOo.createCookie(this.options.repromptCookie,1,157680000);OOo.hidePrompt()}};OOo.extend(OOo.Invitation,{navigateToFriendlyDomain:function(a){location.href=a}});return OOo}));

$(document).ready(function()
{
	var oo_floating = new OOo.Ocode({
	  floating: {
		  position: 'fixedPreserveContent', 
		  contentId: 'mainContentContainer'
	  },
	  customVariables: {
		  hpValue: $.cookie('hp')
	  },
	  onPageCard: {
	  	closeWithOverlay: true
	  },
	  disappearOnClick: true
	}); 

	var oo_instance = new OOo.Ocode({});
	$(".opinion_lab_mobile").click(
		function(event)
		{
			event.preventDefault();
			oo_instance.show();
		}
	);
});
