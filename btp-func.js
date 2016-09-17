// Originali specialized for BTP blog

var btp = {
    post0: function () {
        dataFetcher.getAsimageCycler({
            fade: 500,
            interval: 7000,
        }, {
            url: 'http://cv-btp.blogspot.com/',
            postPerPage: 10,
            LabelName: 'Galery-Header',
            elResult: 'background_cycler',
            NextImage: 600
        });
    },
    post1: function (osetting) {
        var pubSlide1 = '';
        var count = 0;
        setting = {
            postPerPage: 16, 
            drawFooter: false,
            sortByLabel: true,
            LabelName: 'Featured',
            elResult: '.top4',
            appChild: true,
            NextImageSize: 300,
            commentsLabel: 'Komentar',
            callBack: function (currObj, cEntry, cTitle, cImg, href, cContent, cDate, nComment, cMore, cauthor) {
                var  ar = dataFetcher.getImageListfrom(cEntry.content.$t,{NextImageSize: 600});
﻿  ﻿  ﻿  ﻿  var txt = '';
                   $.each(ar,function(idx,url){
                    if ( ++count > setting.postPerPage ) return '';
                    if ( ar.length > 1 ) txt = '&nbsp;(Slide '+(idx+1)+')'
﻿  ﻿  ﻿  ﻿  ﻿  va = '<div class="post-thumb" style="border:0px;"><a title="' + cTitle+txt+ '" class=" " href="' + href + '"><img src="' + url + '"/></a></div>';
                    pubSlide1 += '<li style="border:0px;margin:0px;padding:0px;">' + va + '<div class="item-content" style="margin-left:-2px;"><h4 class="post-title"><a href="' + href + '">' + cTitle+txt+ '</a></h4>' + '<div class="entry-meta"><span> ' + cDate.substring(0, 11) + "</span></div>" + cContent + " </div></li>";
                  });
                return ''
            },
            lastfunc: function () {
                vul = $('#top4');
                vul.html('<div class="box-content" style="border:0px;"><ul></ul></div>');
                $("ul", vul).append(pubSlide1);
                $("ul", vul).addClass("scroll-item");
                $("#top4 .box-content").flexslider({
                    animation: "slide",
                    selector: ".scroll-item > li",
                    animationLoop: true,
                    itemWidth: 207,
                    directionNav: false,
                    pauseOnHover: true,
                    move: 1,
                    itemMargin: 0,
                    minItems: 5,
                    mousewheel: false,
                    maxItems: 5
                });
            }
        }
        setting = $.extend({},setting,osetting);﻿  ﻿  
        dataFetcher.get(setting);
    },
    post2: function (osetting) {
        var pubSlide2 = '';
        var SideSlide2 = '';
﻿  ﻿  var count = 0;
        var setting = {
            DuplicateList: true,
            postPerPage: 6,
            drawFooter: false,
            sortByLabel: true,
            LabelName: 'Berjalan',
            elResult: '.uj_slider', 
            appChild: true,
            callBack: function (currObj, cEntry, cTitle, cImg, href, cContent, cDate, nComment, cMore,author) {
                var  ar = dataFetcher.getImageListfrom(cEntry.content.$t,{NextImageSize: 600});
﻿  ﻿  ﻿  ﻿  var txt = '';
                   $.each(ar,function(idx,url){
                    if ( ++count > setting.postPerPage ) return '';
                    if ( ar.length > 1 ) txt = '&nbsp;(Slide '+(idx+1)+')'
                    pubSlide2 += '<li class="uj_slider_item"><div class="imgwarp">' +
                                 '<a title="' + cTitle +idx+ '" class=" " href="' + href + '"><img width="660px" src="' + url + '"/></a><div class="shadow"></div></div>' + 
                                 '<div class="inpost"><h1 class="post-title"><a href="' + href + '">' + cTitle +txt+ '</a></h1>' + '<p class="meta">' + author + ' / ' + cDate + '</p></div></li>';
                    SideSlide2 += '<li><a class="sidnav" href="#">' + cTitle +txt+ "</a></li>";
                  });
                return ''
            },
            lastfunc: function () {
                $(setting.elResult).html('<div style="height: 450px;" class="uj_slider_wrap"><ul class="slides">' + pubSlide2 + '</ul></div>');
                $(".slider_sidebar").html('<ul class="slides">' + SideSlide2 + '</ul>');
                $(".slider_sidebar").flexslider({
                        slideshowSpeed: 6000,
                        controlNav: false,
                        directionNav: false,
                        animationLoop: true,
                        slideshow: false,
                        itemWidth: 180,
                        asNavFor: setting.elResult+" .uj_slider_wrap"
                })
                $(setting.elResult+" .uj_slider_wrap").flexslider({
                    animation: "fade",
                    animationLoop: true,
                    directionNav: false,
                    smoothHeight: true,
                    controlNav: true,
                    sync: ".slider_sidebar",
                    slideshowSpeed: 6000,
                    slideshow: true,
                    mousewheel: true,
                    keyboard: true
                });

            }
        }
        setting = $.extend({},setting,osetting);﻿  ﻿  
        dataFetcher.get(setting);
    },
    post3: function (osetting) {
        var pubSlide3 = '';
        var va, vb;
        var setting = {
            DuplicateList: true,
            postPerPage: 4,
            drawFooter: false,
            sortByLabel: true,
            LabelName: 'Jayapura',
            elResult: '#call3',
            appChild: true,
            numchars: 320,
            nextnumchars: 80,
            FirstImageSize: 310,
            NextImageSize: 110,
            callBack: function (currObj, cEntry, cTitle, cImg, href, cContent, cDate, nComment, cMore, cauthor) {
                if (cTrim(cImg) !== '') {
                    va = '<div class="post-thumb"><a title="' + cTitle + '" class=" " href="' + href + '">' + cImg + '</a>' + '<div class="uj-date-box"><span class="uj-mon">' + cDate.substring(3, 6) + '</span><span class="uj-day">' + cTrim(cDate.substring(0, 2)) + '</span><span class="uj-yea">' + cDate.substring(7, 11) + '</span></div></div>';
                    //vb = '<a class="more-link" href="' + href + '">Read More</a>');
                    pubSlide3 += '<li>' + va + '<div class="item-content"><h4 class="post-title"><a href="' + href + '">' + cTitle + '</a></h4><div class="clearfix"><div class="uj-metadata-border"><span>' + '<i class="uj fa-user"></i> ' + cEntry.author[0].name.$t + '</span><span><i class="uj fa-comments-o"></i> ' + nComment + '</span></div></div><div class="entry-meta">' + '<span>By ' + cauthor + '</span> / <span> ' + cDate.substring(0, 11) + "</span> comment </div>" + cContent + " </div></li>";
                }
                return ''
            },
            lastfunc: function () {
                $(setting.elResult).html('<div class="box-content"><ul>' + pubSlide3 + '</ul></div><h4 class="uj-box-title"><a href="/search/label/Jayapura?&amp;max-results=7"><i class="uj fa-plus-square-o"></i></a></h4>');
            }
        }﻿  ﻿  
        setting = $.extend({},setting,osetting);﻿  ﻿  
        dataFetcher.get(setting);
    },
    post4: function (osetting) {
        var pubSlide4 = '';
        var va, vb;
        var setting = {
            DuplicateList: true,
            postPerPage: 4,
            drawFooter: false,
            sortByLabel: true,
            LabelName: 'Kantor Inspektorat',
            elResult: '#call-1',
            appChild: true,
            numchars: 320,
            nextnumchars: 80,
            FirstImageSize: 310,
            NextImageSize: 205,
            callBack: function (currObj, cEntry, cTitle, cImg, href, cContent, cDate, nComment, cMore, cauthor) {
                if (cTrim(cImg) !== '') {
                    va = '<div class="post-thumb"><a title="' + cTitle + '" class=" " href="' + href + '">' + cImg + '</a>' + '<div class="uj-date-box"><span class="uj-mon">' + cDate.substring(3, 6) + '</span><span class="uj-day">' + cTrim(cDate.substring(0, 2)) + '</span><span class="uj-yea">' + cDate.substring(7, 11) + '</span></div></div>';
                    //vb = '<a class="more-link" href="' + href + '">Read More</a>');
                    pubSlide4 += '<li>' + va + '<div class="item-content"><h4 class="post-title"><a href="' + href + '">' + cTitle + '</a></h4><div class="clearfix"><div class="uj-metadata-border"><span>' + '<i class="uj fa-user"></i> ' + cEntry.author[0].name.$t + '</span><span><i class="uj fa-comments-o"></i> ' + nComment + '</span></div></div><div class="entry-meta">' + '<span>By ' + cauthor + '</span> / <span> ' + cDate.substring(0, 11) + "</span> comment </div>" + cContent + " </div></li>";
                }
                return ''
            },
            lastfunc: function () {
                $(setting.elResult).html('<div class="box-content"><ul>' + pubSlide4 + '</ul></div><h4 class="uj-box-title"><a href="/search/label/Jayapura?&amp;max-results=7"><i class="uj fa-plus-square-o"></i></a></h4>');
            }
        }
        setting = $.extend({},setting,osetting);﻿  ﻿  
        dataFetcher.get(setting);
    },
    post5: function (osetting) { 
        var pubSlide5 = '';
        var va, vb,count=0;
        var setting = {
            DuplicateList: true,
            postPerPage: 4,
            drawFooter: false,
            sortByLabel: true,
            LabelName: 'Kolam-ikan', 
            elResult: '#bigflex4',
            appChild: true,
            numchars: 320, 
            NextImageSize: 600,
            callBack: function (currObj, cEntry, cTitle, cImg, href, cContent, cDate, nComment, cMore, cauthor) {
                var  ar = dataFetcher.getImageListfrom(cEntry.content.$t,{NextImageSize: 600});
﻿  ﻿  ﻿  ﻿  var txt = '';
                   $.each(ar,function(idx,url){
                    if ( ++count > setting.postPerPage ) return '';
                    if ( ar.length > 1 ) txt = '&nbsp;(Slide '+(idx+1)+')'
                    va = '<div class="thumb"><a title="' + cTitle+txt + '" class=" " href="' + href + '"><img width="660px" src="' + url + '"/></a>' + '<div class="desc"><h3><a href="' + href + '">' + cTitle+txt + '</a></h3></div><div class="uj-date-box"><span class="uj-mon">' + cDate.substring(3, 6) + '</span><span class="uj-day">' + cTrim(cDate.substring(0, 2)) + '</span><span class="uj-yea">' + cDate.substring(7, 11) + '</span></div></div>';
                    vb = '<a class="more-link" href="' + href + '">Read More »</a>';
                    pubSlide5 += '<li>' + va + '<div class="item-content" style="height:80px;overflow:hidden;"><div class="uj-metadata-border"><span class="post-cat"><i class="uj fa-user"></i> ' + cauthor + '</span><span><i class="uj fa-comments-o"></i> ' + nComment + "</span></div>" + cContent + " </div></li>"
                  });
                return '' 
            }, 
            lastfunc: function () {
                vul = $(setting.elResult);
                vul.html('<div class="box-content"><ul></ul></div>');
                $("ul", vul).append(pubSlide5);
                $("ul", vul).addClass("scroll-item");
                $(setting.elResult+' .box-content').flexslider({
                    animation: "fade",
                    selector: ".scroll-item > li",
                    animationLoop: true,
                    directionNav: true,
                    controlNav: true,
                    itemWidth: 207,
                    slideshow: false,
                    pauseOnHover: true,
                    move: 1,
                    slideshowSpeed: 5000,
                    slideshow: true,
                    itemMargin: 0,
                    minItems: 1,
                    mousewheel: false,
                    maxItems: 1
                })
            }
        }
        setting = $.extend({},setting,osetting);﻿  ﻿  
        dataFetcher.get(setting);
    },
    post6: function (osetting) {
        var pubSlide6 = '';
        var va, vb;
        var setting = {
            DuplicateList: true,
            postPerPage: 4,
            drawFooter: false,
            sortByLabel: true,
            LabelName: 'Info',
            elResult: 'InfoContainer',
            appChild: true,
            numchars: 80,
            NextImageSize: 300,
            PrevBtn:'bt-prev',
            NextBtn:'bt-next',
            callBack: function (currObj, cEntry, cTitle, cImg, href, cContent, cDate, nComment, cMore, cauthor) {
                if (cTrim(cImg) !== '') {
                    va = '<div class="post-thumb"><a title="' + cTitle + '" class=" " href="' + href + '">' + cImg + '</a><div class="post-mask"></div></div>';
                    pubSlide6 += '<li>' + va + '<div class="post-content"><h4 class="post-title"><a href="' + href + '">' + cTitle + '</a></h4><div class="uj-date"><span>By ' + cauthor + '</span> / <span> ' + cDate.substring(0, 11) + '</span></div>' + cContent + ' </div></li>';
                }
                return ''
            },
            lastfunc: function () {
                vul = $('#'+setting.elResult);
                vul.html('<div class="box-content"><ul></ul></div>'+
                         '<span class="'+setting.PrevBtn+'"><i class="uj fa-chevron-up"></i></span>'+
                         '<span class="'+setting.NextBtn+'"><i class="uj fa-chevron-down"></i></span>');
                $("ul", vul).append(pubSlide6);
                $('#'+setting.elResult+" .box-content").CarouselScroller({
                    auto: 1,
                    scroll: 1,
                    speed: 3500,
                    visible: 3,
                    start: 0,
                    vertical: true,
                    circular: true,
                    bPrev: '.'+setting.PrevBtn,
                    bNext: '.'+setting.NextBtn,
                    pauseOnHover: true
                });
            }
        }
        setting = $.extend({},setting,osetting);﻿  ﻿  
        dataFetcher.get(setting);
    },
    post7: function (osetting) {
        var pubSlide7 = '';
        var va, vb, count=1;
        var setting = {
            DuplicateList: true,
            postPerPage: 12,
            drawFooter: false,
            sortByLabel: true,
            LabelName: 'Portfolio',
            elResult: '#projectContainer',
            appChild: true,
            numchars: 80,
            NextImageSize: 306,
            callBack: function (currObj, cEntry, cTitle, cImg, href, cContent, cDate, nComment, cMore, cauthor) {
                var  ar = dataFetcher.getImageListfrom(cEntry.content.$t,{NextImageSize: 600});
﻿  ﻿  ﻿  ﻿  var txt = '';
                   $.each(ar,function(idx,url){
                    if ( ++count > setting.postPerPage ) return '';
                    if ( ar.length > 1 ) txt = '&nbsp;(Slide '+(idx+1)+')';
                    va = '<div class="post-thumb" ><a title="' + cTitle+txt+ '" class=" " href="' + href + '"><img width="306px" src="' + url + '"/></a><div class="uj-date-box">' + '<span class="uj-mon">' + cDate.substring(3, 6) + '</span><span class="uj-day">' + cTrim(cDate.substring(0, 2)) + '</span><span class="uj-yea">' + cDate.substring(7, 11) + '</span>' + '</div></div>';﻿  ﻿  ﻿  ﻿  ﻿  
                    vb = '<a class="more-link" href="' + href + '">Read More »</a>';
                    pubSlide7 += '<li style="float:left;width:306px;height:250px;">' + va + 
                                 '<div class="item-content"><h4 class="post-title"><a href="' + href + '">' + 
                                 cTitle+txt+ '</a></h4><div class="clearfix"><div class="uj-metadata-border"><span><i class="uj fa-user"></i> ' + 
                                 cauthor + '</span><span><i class="uj fa-comments-o"></i> ' + nComment + '</span></div></div><div class="entry-meta"><span>By ' + 
                                 cauthor + '</span> / <span> ' + nComment + "</span></div>" + cContent + " </div></li>";
                  });
                return ''
            },
            lastfunc: function () {
                vul = $(setting.elResult);
                vul.html('<div class="box-content"><ul></ul></div>');
                $("ul", vul).append(pubSlide7);
                $("ul", vul).addClass("scroll-item");
                $(setting.elResult+" .box-content").flexslider({
                    animation: "slide",
                    selector: ".scroll-item > li",
                    animationLoop: true,
                    itemWidth: 207,
                    directionNav: false,
                    pauseOnHover: true,
                    move: 2,
                    itemMargin: 0,
                    minItems: 4,
                    mousewheel: false,
                    maxItems: 4
                })
            }
        }
        setting = $.extend({},setting,osetting);
        dataFetcher.get(setting);
    },
    post8: function (osetting) { 
        var pubSlide8 = '';
        var va, vb,count=0;
        var setting = {
            DuplicateList: true,
            postPerPage: 8,
            drawFooter: false,
            sortByLabel: true,
            LabelName: 'Proyek', 
            elResult: '#archive_container',
            appChild: true,
            numchars: 20, 
            NextImageSize: 400, 
            PrevBtn:'bt-prev2',
            NextBtn:'bt-next2',
            callBack: function (currObj, cEntry, cTitle, cImg, href, cContent, cDate, nComment, cMore, cauthor) {
                var  ar = dataFetcher.getImageListfrom(cEntry.content.$t,{NextImageSize: 600});
﻿  ﻿  ﻿  ﻿  var txt = '';
                   $.each(ar,function(idx,url){ 
                    if ( ++count > setting.postPerPage ) return '';
                    if ( ar.length > 1 ) txt = '&nbsp;(Slide '+(idx+1)+')'
                    va = '<div class="xthumb"><a title="' + cTitle+txt + '" class=" " href="' + href + '"><img width="660px" src="' + url + '"/></a></div>';
                    vb = '<a class="more-link" href="' + href + '">Read More »</a>';
                    pubSlide8 += '<li>' + va + '<div class="item-content" style="height:80px;overflow:hidden;"><div class="uj-metadata-border"><span class="post-cat"><i class="uj fa-user"></i> ' + cauthor + '</span><span><i class="uj fa-comments-o"></i> ' + nComment + "</span></div>" + cContent + " </div></li>"
                  });
                return '' 
            }, 
            lastfunc: function () {
                vul = $(setting.elResult);
                vul.append('<div class="box-content"><ul>'+pubSlide8+'</ul></div>');
                //vul.html('<div class="box-content"><ul></ul></div>');
                //$("ul", vul).append(pubSlide8);
                $(setting.elResult+" .box-content").CarouselScroller({
                    auto: 1,
                    scroll: 1,
                    speed: 4600,
                    visible: 3,
                    start: 0,
                    vertical: false,
                    circular: true,
                    bPrev: '.'+setting.PrevBtn,
                    bNext: '.'+setting.NextBtn,
                    pauseOnHover: true
                });
            }
        }
        setting = $.extend({},setting,osetting); 
        dataFetcher.get(setting);
    },
﻿  IncrementLabel:function(){
        var el = $('#tag3');
﻿  ﻿  var ul = el.find("ul");
﻿  ﻿  var li = ul.find('li');
         $.each(li,function(i,x){
             var s=x.innerHTML;
﻿  ﻿  ﻿   x.innerHTML = s + '<span dir="ltr">'+i+'</span>';
          });
﻿  }
﻿  
﻿  
}
