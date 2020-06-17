// Global

/* na ie8 zavesit na html tridy a tuto funkci v ie 8 nevolat!!! protoze se zasekne */
/**
 * author Christopher Blum
 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *    - forked from http://github.com/zuk/jquery.inview/
 */
(function (factory) {
    if (typeof define == 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var inviewObjects = [], viewportSize, viewportOffset,
        d = document, w = window, documentElement = d.documentElement, timer;

    $.event.special.inview = {
        add: function (data) {
            inviewObjects.push({data: data, $element: $(this), element: this});
            // Use setInterval in order to also make sure this captures elements within
            // "overflow:scroll" elements or elements that appeared in the dom tree due to
            // dom manipulation and reflow
            // old: $(window).scroll(checkInView);
            //
            // By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
            // intervals while the user scrolls. Therefore the inview event might fire a bit late there
            //
            // Don't waste cycles with an interval until we get at least one element that
            // has bound to the inview event.
            if (!timer && inviewObjects.length) {
                timer = setInterval(checkInView, 250);
            }
        },

        remove: function (data) {
            for (var i = 0; i < inviewObjects.length; i++) {
                var inviewObject = inviewObjects[i];
                if (inviewObject.element === this && inviewObject.data.guid === data.guid) {
                    inviewObjects.splice(i, 1);
                    break;
                }
            }

            // Clear interval when we no longer have any elements listening
            if (!inviewObjects.length) {
                clearInterval(timer);
                timer = null;
            }
        }
    };

    function getViewportSize() {
        var mode, domObject, size = {height: w.innerHeight, width: w.innerWidth};

        // if this is correct then return it. iPad has compat Mode, so will
        // go into check clientHeight/clientWidth (which has the wrong value).
        if (!size.height) {
            mode = d.compatMode;
            if (mode || !$.support.boxModel) { // IE, Gecko
                domObject = mode === 'CSS1Compat' ?
                    documentElement : // Standards
                    d.body; // Quirks
                size = {
                    height: domObject.clientHeight,
                    width: domObject.clientWidth
                };
            }
        }

        return size;
    }

    function getViewportOffset() {
        return {
            top: w.pageYOffset || documentElement.scrollTop || d.body.scrollTop,
            left: w.pageXOffset || documentElement.scrollLeft || d.body.scrollLeft
        };
    }

    function checkInView() {
        if (!inviewObjects.length) {
            return;
        }

        var i = 0, $elements = $.map(inviewObjects, function (inviewObject) {
            var selector = inviewObject.data.selector,
                $element = inviewObject.$element;
            return selector ? $element.find(selector) : $element;
        });

        viewportSize = viewportSize || getViewportSize();
        viewportOffset = viewportOffset || getViewportOffset();

        for (; i < inviewObjects.length; i++) {
            // Ignore elements that are not in the DOM tree
            if (!$.contains(documentElement, $elements[i][0])) {
                continue;
            }

            var $element = $($elements[i]),
                elementSize = {height: $element[0].offsetHeight, width: $element[0].offsetWidth},
                elementOffset = $element.offset(),
                inView = $element.data('inview');

            // Don't ask me why because I haven't figured out yet:
            // viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
            // Even though it sounds weird:
            // It seems that the execution of this function is interferred by the onresize/onscroll event
            // where viewportOffset and viewportSize are unset
            if (!viewportOffset || !viewportSize) {
                return;
            }

            if (elementOffset.top + elementSize.height > viewportOffset.top &&
                elementOffset.top < viewportOffset.top + viewportSize.height) {
                if (!inView) {
                    $element.data('inview', true).trigger('inview', [true]);
                }
            } else if (inView) {
                $element.data('inview', false).trigger('inview', [false]);
            }
        }
    }

    $(w).bind("scroll resize scrollstop", function () {
        viewportSize = viewportOffset = null;
    });

    // IE < 9 scrolls to focused elements without firing the "scroll" event
    if (!documentElement.addEventListener && documentElement.attachEvent) {
        documentElement.attachEvent("onfocusin", function () {
            viewportOffset = null;
        });
    }
}));

$(document).ready(
    function () {

        //console.log(mdc);

        $('.mdc-text-field').each(function () {
            let textField = new mdc.textField.MDCTextField(this);
        });

        // ------------ Hlavička ------------

        $(window).scroll(
            function () {

                var headerHeight = $("header").height();
                var scrollTop = $(this).scrollTop();

                if (scrollTop >= headerHeight) {
                    $("header").addClass("small");
                } else {
                    $("header").removeClass("small");
                }

            }
        );

        $(".navigation-link-mobile").click(function () {
            $(this).toggleClass("active");
            $("nav").slideToggle();
            return false;
        });


        var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        if (windowWidth <= 1020) {

            $('.menu-link').click(function () {
                $(".navigation-link-mobile").removeClass("active");
                $("nav").slideUp();
            });

        }

        $(window).resize(function () {
            var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

            if (windowWidth <= 1020) {
                $('nav').removeClass("visible");

                $('.menu-link').click(function () {
                    $(".navigation-link-mobile").removeClass("active");
                    $("nav").slideUp();
                });


            } else {
                $('nav').addClass("visible");
            }
        });

        // ------------ Scroll to id ------------

        $("a[rel='m_PageScroll2id']").mPageScroll2id({
            highlightClass: "active",
            offset: 100
        });


        // ------------ Slider ------------

        $('.slider-intro').slick({
            dots: false,
            arrows: false,
            pauseOnFocus: false,
            pauseOnHover: false,
            pauseOnDotsHover: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear'

        });


        $('.slider-gallery').slick({
            dots: true,
            arrows: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,

        });

        $('.flats-slider').slick({
            dots: true,
            arrows: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1320,
                    settings: {
                        centerMode: true,
                        centerPadding: '60px',
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1020,
                    settings: {
                        centerMode: true,
                        centerPadding: '60px',
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        centerMode: true,
                        centerPadding: '60px',

                        slidesToShow: 1,
                    }
                }
            ]
        });

        // Day and Night

        $(".js-day-and-night").click(function () {
            $(this).toggleClass("night");
            $(".section-day-and-night").toggleClass("night");
            if ($(this).hasClass("night")) {
                $(".js-day").removeClass("active");
                $(".js-night").addClass("active");

            } else {
                $(".js-day").addClass("active");
                $(".js-night").removeClass("active");

            }
            return false;
        });

        /*$(".sticky").sticky({topSpacing:82, bottomSpacing: function(){
                return $('html').height() - $('.section-gallery').offset().top;
            }});*/

        $('.zoom').zoom({
            magnify: 7
        });

        $('.polygon.building, .button.building').hover(function () {
            var building = $(this).data('id');
            $('.building.building-' + building).addClass('hover');
        }, function () {
            var building = $(this).data('id');
            $('.building.building-' + building).removeClass('hover');
        });

        $('.polygon.floor, .button.floor').hover(function () {
            var floor = $(this).data('id');
            $('.floor.floor-' + floor).addClass('hover');
        }, function () {
            var floor = $(this).data('id');
            $('.floor.floor-' + floor).removeClass('hover');
        });

        // $(".sticky").stick_in_parent({
        //     offset_top: 82
        // });

        function onResize (){
            let width = $(window).width();
            if(width < 1201){
                $(".sticky").trigger("sticky_kit:detach");
            }
        }
        $(window).resize(onResize); 
        $(".sticky").stick_in_parent({
            offset_top: 82
        });
        onResize();// first time;

        $(".js-day").click(function () {
            $(".js-day-and-night").removeClass("night");
            $(".section-day-and-night").removeClass("night");
            $(this).addClass("active");
            $(".js-night").removeClass("active");
            return false;
        });

        $(".js-night").click(function () {
            $(".js-day-and-night").addClass("night");
            $(".section-day-and-night").addClass("night");
            $(this).addClass("active");
            $(".js-day").removeClass("active");
            return false;
        });

        // Unhost - map


        $(".unhost-menu-link").click(function () {

            var text = $(this).attr("data-category");

            $(".unhost-text").hide();
            $(".unhost-text.unhost-text" + text).show();

            $(".unhost-pins .pin:not(.category-" + text).hide();
            $(".unhost-pins .pin.category-" + text).show();

            if (text === "0") {
                $(".unhost-pins .pin").show();
            }

            $(".unhost-pins .pin.category-" + text + ":first").addClass("active");


            $(".unhost-menu-link").removeClass("active");
            $(this).addClass("active");

            return false;
        });


        $("body").on("click", ".pin", function (e) {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            } else {
                $(".unhost-pins .pin").removeClass("active");
                $(this).addClass("active");

            }
            return false;
        });


        // ------------ Animace ------------
        // Animation durations reduced to half
        $('.js-animate').one('inview', function (event, isVisible) {
            if (isVisible) {
                var $this = $(this);

                animationClass = "fadeIn";
                $this.addClass("animated-new").addClass(animationClass);
            }
        });

        $('.js-animate-slow.first').one('inview', function (event, isVisible) {
            if (isVisible) {
                var $this = $(this);

                setTimeout(function () {
                    animationClass = "fadeIn";
                    $this.addClass("animated-new").addClass(animationClass);
                }, 200);
            }
        });

        $('.js-animate-slow.second').one('inview', function (event, isVisible) {
            if (isVisible) {
                var $this = $(this);

                setTimeout(function () {
                    animationClass = "fadeIn";
                    $this.addClass("animated-new").addClass(animationClass);
                }, 275);
            }
        });

        $('.js-animate-slow.third').one('inview', function (event, isVisible) {
            if (isVisible) {
                var $this = $(this);

                setTimeout(function () {
                    animationClass = "fadeIn";
                    $this.addClass("animated-new").addClass(animationClass);
                }, 350);
            }
        });

        $('.section-timeline').one('inview', function (event, isVisible) {
            if (isVisible) {
                var $this = $(this);

                setTimeout(function () {
                    $(".timeline .step1").addClass("done visible");
                }, 150);
                setTimeout(function () {
                    $(".timeline .line").css("width", "25%");
                }, 550);
                setTimeout(function () {
                    $(".timeline .step2").addClass("done visible");
                    // $(".timeline .step1 p.small").addClass("hidden");
                }, 950);
                setTimeout(function () {
                    $(".timeline .line").css("width", "40%");
                }, 1350);
                setTimeout(function () {
                    $(".timeline .step3").addClass("visible");
                    // $(".timeline .step2 p.small").addClass("hidden");
                }, 1750);
                setTimeout(function () {
                    $(".timeline .step4").addClass("visible");
                    // $(".timeline .step3 p.small").addClass("hidden");
                }, 2150);
            }
        });


        // About

        // $('.section-about').one('inview', function(event, isVisible) {
        //     if(isVisible) {
        //         skrollr.init();
        //     }
        // });

        // Room - points

        // $(".point-show-info").click(function () {
        //     $(".point-info",$(this).parent()).toggleClass("active");
        //     return false;
        // });


        // Colorbox

        $('a.link-gallery').colorbox({
            current: "{current} / {total}",
            maxWidth: "85%",
            maxHeight: "85%",
        });


        // Cookies

        $(".js-close-cookies").click(function () {
            $(".cookies").fadeOut();
            return false;
        });

        // Table

        var datatable = $('#table-pricelist').DataTable({
            searching: false,
            pageLength: 1000,
            paginate: false,
            language: {
                info: "Zobrazuje se _PAGE_ z _PAGES_ stránek",
                zeroRecords: "V této velikosti nemáme již dostupný žádný byt.",
                paginate: {
                    previous: '‹',
                    next: '›'
                },
                aria: {
                    paginate: {
                        previous: 'Předchozí',
                        next: 'Následující'
                    }
                }
            },
            columnDefs: [
                { targets: 'no-sort', orderable: false }
            ]
        });

        $('body').on('click', '.pricelist-filter a', function(e) {
            $(this).toggleClass('active');
            e.preventDefault();
            $.ajax({
                url: $(this).attr("href"),
                success: function(data) {
                    datatable.clear();
                    datatable.rows.add(data.data);
                    datatable.draw();

                    $(".buttons-container").html(data.buttons)
                }
            });
        });

        // Video

        // select video element
        // var vid = document.getElementById('v0');
        //var vid = $('#v0')[0]; // jquery option

        // pause video on load
        // vid.pause();

        // pause video on document scroll (stops autoplay once scroll started)
        // window.onscroll = function(){
        //     vid.pause();
        //
        // };
        //
        // vid.addEventListener('ended',myHandler,false);
        // function myHandler(e) {
        //console.log("done")
        // }

        // refresh video frames on interval for smoother playback
        // setInterval(function(){
        //     vid.currentTime = (window.pageYOffset - 400)/400;
        // }, 40);


        // MAP

        initMap();

        // Floor detail

        function getFlatData(id) {
            for(var i in flatsData) {
                var flat = flatsData[i];

                if(flat.Unit_Name__c.toUpperCase() == id) {
                    return flat;
                }
            }
        }

        function getStatusClass(status) {
            switch (status) {
                case 'Available':
                    return 'free'
                    break;
                case 'SBK signed':
                case 'Purchase Contract':
                case 'Sold':
                case 'Future Contract':
                    return 'sold';
                    break;
                case 'Reserved':
                case 'Reservation Contract':
                case 'Pre-Reserved':
                    return 'reserved';
                    break;
            }
        }

        $('.map.interactive svg polygon, .map.interactive svg path').each(function() {

            var flat = $(this);
            var id = flat.data('id');
            var flatData = getFlatData(id);
            if(typeof flatData === 'undefined') {
                return;
            }

            var statusClass = getStatusClass(flatData.Availability__c);
            flat.addClass(statusClass);
            if(statusClass === 'free') {
                var popoverHtmlContent = '<h3>Byt '+ flatData.Unit_Name__c +'</h3><p><span>Dispozice:</span> '+ flatData.Appt_Object_Type__c +'</p><p><span>Velikost:</span> '+ flatData.Floor_Size__c +'m<sup>2</sup></p><p><span>Cena s DPH:</span> '+ String(flatData.Price_incl_VAT__c).replace(/(.)(?=(\d{3})+$)/g,'$1 ') + ' Kč s DPH</p><a href=\'/byt/'+ flatData.Unit_Name__c.toLowerCase() +'\' class=\'button blue\'>Zobrazit detail</a>';
                flat.attr('data-tippy-content', popoverHtmlContent)
            }
        });

        // Tippy

        tippy('[data-tippy-content]', {
            allowHTML: true,
            interactive: true,
            appendTo: document.body,
            trigger: 'mouseenter focusin click',
            theme: 'light',

        });


    }
);

//GRES Newsletter
function post(path, params, method) {
    method = method || "post";
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    form.setAttribute("name", "subscribeForm");

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    //form.submit();
}
