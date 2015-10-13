/*!
 * headroom.js v0.6.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a,b){"use strict";function c(a){this.callback=a,this.ticking=!1}function d(a){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var b,c,e=a||{};for(c=1;c<arguments.length;c++){var f=arguments[c]||{};for(b in f)e[b]="object"==typeof e[b]?d(e[b],f[b]):e[b]||f[b]}return e}function e(a){return a===Object(a)?a:{down:a,up:a}}function f(a,b){b=d(b,f.options),this.lastKnownScrollY=0,this.elem=a,this.debouncer=new c(this.update.bind(this)),this.tolerance=e(b.tolerance),this.classes=b.classes,this.offset=b.offset,this.initialised=!1,this.onPin=b.onPin,this.onUnpin=b.onUnpin,this.onTop=b.onTop,this.onNotTop=b.onNotTop}var g={bind:!!function(){}.bind,classList:"classList"in b.documentElement,rAF:!!(a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame)};a.requestAnimationFrame=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame,c.prototype={constructor:c,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},f.prototype={constructor:f,init:function(){return f.cutsTheMustard?(this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var b=this.classes;this.initialised=!1,a.removeEventListener("scroll",this.debouncer,!1),this.elem.classList.remove(b.unpinned,b.pinned,b.top,b.initial)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,a.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var a=this.elem.classList,b=this.classes;(a.contains(b.pinned)||!a.contains(b.unpinned))&&(a.add(b.unpinned),a.remove(b.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var a=this.elem.classList,b=this.classes;a.contains(b.unpinned)&&(a.remove(b.unpinned),a.add(b.pinned),this.onPin&&this.onPin.call(this))},top:function(){var a=this.elem.classList,b=this.classes;a.contains(b.top)||(a.add(b.top),a.remove(b.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notTop)||(a.add(b.notTop),a.remove(b.top),this.onNotTop&&this.onNotTop.call(this))},getScrollY:function(){return void 0!==a.pageYOffset?a.pageYOffset:(b.documentElement||b.body.parentNode||b.body).scrollTop},getViewportHeight:function(){return a.innerHeight||b.documentElement.clientHeight||b.body.clientHeight},getDocumentHeight:function(){var a=b.body,c=b.documentElement;return Math.max(a.scrollHeight,c.scrollHeight,a.offsetHeight,c.offsetHeight,a.clientHeight,c.clientHeight)},isOutOfBounds:function(a){var b=0>a,c=a+this.getViewportHeight()>this.getDocumentHeight();return b||c},toleranceExceeded:function(a,b){return Math.abs(a-this.lastKnownScrollY)>=this.tolerance[b]},shouldUnpin:function(a,b){var c=a>this.lastKnownScrollY,d=a>=this.offset;return c&&d&&b},shouldPin:function(a,b){var c=a<this.lastKnownScrollY,d=a<=this.offset;return c&&b||d},update:function(){var a=this.getScrollY(),b=a>this.lastKnownScrollY?"down":"up",c=this.toleranceExceeded(a,b);this.isOutOfBounds(a)||(a<=this.offset?this.top():this.notTop(),this.shouldUnpin(a,c)?this.unpin():this.shouldPin(a,c)&&this.pin(),this.lastKnownScrollY=a)}},f.options={tolerance:{up:0,down:0},offset:0,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",initial:"headroom"}},f.cutsTheMustard="undefined"!=typeof g&&g.rAF&&g.bind&&g.classList,a.Headroom=f}(window,document);





/* geico-nav.min.js */
/*
* geico_design_kit - v0.1.0-13
* Compiled on: 2014-09-19 18:03:53
*/
var geicoSiteMenu=function(){function a(a){eb=void 0!==a?a:!1,J=$("header.main-header"),K=$("nav.container-fluid"),L=J.find(".nav-fixed-elements + .nav-content"),M=J.find(".nav-fixed-elements"),fb=G(),eb||$(window).on("resize",$.proxy(E,this)),E()}function b(){var a=L.find("ul.main-nav > li > a"),b=L.find(".main-nav--secondary-nav");fb?(a.on("click",$.proxy(o,this)),T.on("click","a",$.proxy(t,this)),S.on("click","a",$.proxy(t,this)),$("#search-link").on("click",$.proxy(p,this)),$("input, textarea").on("focus",$.proxy(h,this)),$("input, textarea").on("blur",$.proxy(i,this))):(a.on("click",$.proxy(t,this)),a.on("mouseenter",$.proxy(q,this)),a.on("mouseleave",$.proxy(r,this)),Q.on("mouseenter",$.proxy(s,this)),Q.on("mouseleave",$.proxy(t,this)),b.on("mouseenter",$.proxy(s,this)),b.on("mouseleave",$.proxy(t,this)),T.on("click","a",$.proxy(t,this)),S.on("click","a",$.proxy(t,this)),$("#search-link").on("click",$.proxy(j,this)),$("#search-link").on("mouseenter",$.proxy(j,this)),$(".search-box").on("mouseenter",$.proxy(l,this)),$(".search-box").on("mouseleave",$.proxy(m,this)))}function c(){var a=L.find("ul.main-nav > li > a"),b=L.find(".main-nav--secondary-nav");fb?(a.off("click"),T.off("click","a"),S.off("click","a"),$("#search-link").off("click"),$("input, textarea").off("focus"),$("input, textarea").off("blur")):(a.off("click"),a.off("mouseenter"),a.off("mouseleave"),Q.off("mouseenter"),Q.off("mouseleave"),b.off("mouseenter"),b.off("mouseleave"),T.off("click","a"),S.off("click","a"),$("#search-link").off("click"),$("#search-link").off("mouseenter"),$(".search-box").off("mouseenter"),$(".search-box").off("mouseleave"),$(document).off("click"))}function d(){{var a=L.find("ul.main-nav > li a");a.find("i")}if(M.find("#mobile-menu-icon").on("click",$.proxy(y,this)),a.on("click",$.proxy(y,this)),fb){{var b=document.querySelector("header");document.getElementById("wrapper")}hb=new Headroom(b,{offset:0,tolerance:0,classes:{initial:"animated",pinned:"slideDown",unpinned:"slideUp",top:"headroom--top",notTop:"headroom--not-top"}}),hb.init()}}function e(){{var a=L.find("ul.main-nav > li > a");a.find("i")}M.find("#mobile-menu-icon").off("click"),a.off("click"),L.off("click"),hb&&hb.destroy()}function f(){gb||(N=$('<div class="nav-effects"/>'),O=$('<div class="nav-accent"/>'),P=$('<div class="nav-accent nav-active"/>'),Q=$('<div class="nav-background"/>'),R=$('<div class="container"/>'),S=$('<div class="nav-content nav-active"/>'),T=$('<div class="nav-content nav-next"/>'),R.append(S,T),Q.append(O,P,R),N.append(Q),L.append(N),gb=!0)}function g(){var a=6,b=54,c=L.offset().left;L.find(".main-nav > li").each(function(){var d=$(this).find("> a > span").offset().left;$(this).data("offset",Math.round(d-c-a-b))})}function h(){$("header").css("position","absolute")}function i(){$("header").css("position","fixed")}function j(){J.addClass("showSearch"),$(".search-box input").focus(),$(document).on("click",$.proxy(k,this))}function k(a){0===$(a.target).closest(".search-box").length&&(Z||n())}function l(){Z=!0}function m(){Z=!1}function n(){$(document).off("click"),_=!1,Z=!1,$(".search-box input").val(""),$(".search-box input").blur(),J.removeClass("showSearch")}function o(a){var b=$(a.currentTarget).parent();b.has(".main-nav--secondary-nav").length>0&&a.preventDefault(),b.hasClass("nav--active")?t(a):q(a)}function p(a){a.preventDefault(),t(a),J.toggleClass("showSearch")}function q(a){var b=$(a.currentTarget);b.parent().addClass("nav--active"),U=V,V=b.parent(),db=!0,V.addClass("nav--active").siblings().removeClass("nav--active"),Y=!0;var c=b.siblings(".main-nav--secondary-nav");c.find("ul").addClass("col--"+c.length),bb={type:"open",menuItem:b,menuContent:c.html()},u(b,c.html())}function r(a){var b=$(a.currentTarget);Y=!1,db=!1,setTimeout(function(){Y||(b.parent().removeClass("nav--active"),v())},X)}function s(){Y=!0,clearTimeout(W)}function t(){Y=!1,W=setTimeout(function(){Y||v()},X)}function u(a,b){if(!ab){Z=!1,n(),cb={type:"open",menuItem:a,menuContent:b},ab=!0;var c=a.parent().data("style"),d=0;null===U&&(S.empty(),T.empty().css({display:"table",opacity:1})),T.empty().css({marginLeft:0}).append(b),d=T.width()+a.parent().data("offset")>T.parent().width()?Math.round((T.parent().width()-T.width())/2):a.parent().data("offset"),R.removeClass().addClass("container "+c),T.css({marginLeft:d+"px"}),null!==U?(O.stop(!0).removeClass().addClass("nav-accent "+c).css({top:-8}).delay(50).animate({top:0},200),S.stop(!0).animate({opacity:0},200),T.stop(!0).css({opacity:0,display:"table",marginLeft:d+"px"}).delay(150).animate({opacity:1},200,function(){S.empty().append(b),S.css({opacity:1,marginLeft:d+"px"}),T.css({opacity:0,display:"none",marginLeft:0})})):(O.stop(!0).css({top:-8}),P.removeClass().addClass("nav-accent nav-active "+c)),N.height(Math.max(T.outerHeight(),N.height()));var e=T.innerHeight();0===e&&(e=8),Q.stop(!0).delay(150).animate({height:e},200,function(){O.css({top:-8}),O.removeClass().addClass("nav-accent"),P.removeClass().addClass("nav-accent nav-active "+c),ab=!1,w()})}}function v(){ab=!0,V?(V.removeClass("nav--active"),Q.stop(!0).animate({height:0},200,function(){N.height(0),U=null,V=null,ab=!1,w()})):ab=!1}function w(){if((cb&&bb&&!cb.menuItem.is(bb.menuItem)||null===cb)&&db)switch(bb.type){case"open":ab=!1,u(bb.menuItem,bb.menuContent,!0)}}function x(){$("body").removeClass("showPolicyBar showMobileMenu");var a=L.find("ul.main-nav");J.removeClass("slideDown open"),L.removeClass("transitioning open"),a.stop(!0).css({top:-a.height()+"px"})}function y(a){a.stopPropagation();var b=200;if($(a.currentTarget).find("i").length>0)a.preventDefault(),B(a);else{{var c=L.find(".nav-wrapper");L.find("ul.main-nav"),M.height()}$("body").hasClass("showPolicyBar")&&(b=0,$("body").removeClass("showPolicyBar"),L.removeClass("open transitioning")),J.removeClass("slideDown"),L.hasClass("open")?(L.removeClass("transitioning"),$("body").removeClass("showMobileMenu"),c.stop(!0).animate({top:-c.height()+"px"},200,function(){L.removeClass("open").removeClass("transitioning"),J.removeClass("open"),L.find(".main-nav li").each(function(){$(this).removeClass("open"),$(this).find("i.icon-collapse").removeClass("icon-collapse").addClass("icon-expand"),$(this).find(".main-nav--secondary-nav").css({height:0})})})):(J.addClass("open"),L.addClass("open"),setTimeout(function(){L.addClass("transitioning"),$("body").addClass("showMobileMenu"),c.stop(!0).animate({top:"0px"},200)},50))}}function z(){$("body").hasClass("showPolicyBar")?($("body").removeClass("showPolicyBar"),L.removeClass("transitioning"),setTimeout(function(){A()},200)):(L.addClass("open"),$("body").addClass("showMobileMenu"),setTimeout(function(){$("body").addClass("showPolicyBar"),L.addClass("transitioning")},50),setTimeout(function(){A(!0)},250))}function A(a){{var b=L.find(".nav-wrapper");L.find("ul.main-nav")}L.hasClass("open")&&(a!==!0&&L.removeClass("transitioning"),b.stop(!0).animate({top:-b.height()+"px"},200,function(){J.removeClass("open"),a!==!0&&(L.removeClass("open").removeClass("transitioning"),$("body").removeClass("showMobileMenu")),L.find(".main-nav li").each(function(){$(this).removeClass("open"),$(this).find("i.icon-collapse").removeClass("icon-collapse").addClass("icon-expand"),$(this).find(".main-nav--secondary-nav").css({height:0})})}))}function B(a){a.preventDefault();var b=$(a.currentTarget).parent(),c=b.find(".main-nav--secondary-nav");if(b.hasClass("open"))c.animate({height:0},200,function(){b.removeClass("open"),b.find("i.icon-collapse").removeClass("icon-collapse").addClass("icon-expand")});else{b.addClass("open"),c.css({height:"auto"});var d=c.height();c.css({height:0}).animate({height:d},200,function(){b.find("i.icon-expand").removeClass("icon-expand").addClass("icon-collapse")})}return!1}function C(){var a=(L.find("ul.main-nav"),L.find(".nav-wrapper"));L.height(window.innerHeight-M.height()),L.hasClass("open")||(L.addClass("open"),a.css({top:-a.height()+"px"}),L.removeClass("open"))}function D(){L.find("ul.main-nav");L.removeClass("open transitioning"),L.find(".main-nav li").each(function(){$(this).removeClass("open"),$(this).find("i.icon-collapse").removeClass("icon-collapse").addClass("icon-expand"),$(this).find(".main-nav--secondary-nav").css({height:0})})}function E(){var a=$(window).width()>=H?"desktop":"mobile";a!=I?"desktop"==a?(I&&(e(),D()),f(),g(),b()):(I&&(c(),x()),d(),C()):"desktop"==a?g():C(),I=a}function F(a){L.find("ul.main-nav > li[data-style="+a+"]").addClass("nav-selected").siblings().removeClass("nav-selected"),"desktop"==I&&K.removeClass().addClass("container-fluid").addClass(a)}function G(){var a=window.navigator.msMaxTouchPoints,b="ontouchstart"in document.createElement("div");return a||b?!0:!1}var H=768,I=null,J=null,K=null,L=null,M=null,N=null,O=null,P=null,Q=null,R=null,S=null,T=null,U=null,V=null,W=null,X=50,Y=!1,Z=!1,_=!1,ab=!1,bb=null,cb=null,db=!1,eb=!1,fb=!1,gb=!1,hb=null;return{init:a,resize:E,setActiveSection:F,closeMenu:A,closeSearch:n,togglePolicy:z}}();

/* initialize GEICO nav */
$(function(){
	geicoSiteMenu.init();
});




/* geico-scroll-top.min */
/*
* geico_design_kit - v0.1.0-13
* Compiled on: 2014-09-19 18:03:53
*/
var geicoScrollTop={scrollBtn:$("#geico-scroll-top"),win:$(window),visible:!1,init:function(){geicoScrollTop.initEvents()},initEvents:function(){geicoScrollTop.scrollBtn.on("click",geicoScrollTop.scrollBtnClickHandler),geicoScrollTop.win.on("resize scroll load",geicoScrollTop.showScrollBtn)},scrollBtnClickHandler:function(a){a.preventDefault(),$("body,html").stop().animate({scrollTop:0},800)},showScrollBtn:function(){var a=geicoScrollTop.win.scrollTop(),b=$("footer").offset().top;if(a>100){var c=window.innerHeight||document.documentElement.clientHeight;b>=a+c?geicoScrollTop.scrollBtn.removeClass("above-footer"):geicoScrollTop.scrollBtn.addClass("above-footer"),geicoScrollTop.visible||(geicoScrollTop.visible=!0,geicoScrollTop.scrollBtn.clearQueue().fadeIn(),geicoScrollTop.scrollBtn.on("click",geicoScrollTop.scrollBtnClickHandler))}else geicoScrollTop.visible&&(geicoScrollTop.scrollBtn.clearQueue().fadeOut(),geicoScrollTop.visible=!1,geicoScrollTop.scrollBtn.off("click",geicoScrollTop.scrollBtnClickHandler))}};$(document).ready(function(){geicoScrollTop.init()});




/* geico-modal.min */
/*
* geico_design_kit - v0.1.0-13
* Compiled on: 2014-09-19 18:03:53
*/
var geicoModal={win:null,modalElementClass:"modal",modalTriggerElementClass:"modal-trigger",modalCloseElementClass:"modal-close",modalOverlayClass:"modal-overlay",init:function(){geicoModal.win=$(window),geicoModal.modalBtn=$("."+geicoModal.modalTriggerElementClass),geicoModal.closeBtn=$("."+geicoModal.modalCloseElementClass),geicoModal.overlay=$("."+geicoModal.modalOverlayClass),geicoModal.initEvents()},initEvents:function(){geicoModal.modalBtn.on("click",geicoModal.showModal),geicoModal.closeBtn.on("click",geicoModal.hideModal),geicoModal.overlay.on("click",geicoModal.hideModal)},showModal:function(a){var b=$("#"+$(a.target).data("modal-view"));geicoModal.card=b.find(".card"),geicoModal.win.on("resize",geicoModal.resizeHandler),b.fadeIn(300),geicoModal.win.trigger("resize")},hideModal:function(){$(this).closest("."+geicoModal.modalElementClass).fadeOut(300),geicoModal.win.off("resize",geicoModal.resizeHandler)},resizeHandler:function(){var a=geicoModal.win.width()/2-geicoModal.card.outerWidth()/2,b=geicoModal.win.height()/2-geicoModal.card.outerHeight()/2;geicoModal.card.css({left:a,top:b})}};$(document).ready(function(){geicoModal.init()});