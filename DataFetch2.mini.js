function datetime(e) {
    ! function(t) {
        var a = {
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            dateplace: "updates",
            timeplace: "timer"
        };
        a = t.extend({}, a, e);
        var n = new Date,
            s = n.getDate(),
            i = n.getMonth(),
            r = n.getYear(),
            l = 1e3 > r ? r + 1900 : r;
        document.getElementById(a.dateplace).innerHTML = a.months[i] + " " + s + ", " + l;
        var o = function(e) {
                return 10 > e && (e = "0" + e), e
            },
            u = function() {
                var e = "",
                    t = new Date,
                    n = t.getHours(),
                    s = t.getMinutes(),
                    i = t.getSeconds();
                e = 12 > n ? "AM" : "PM", 0 == n && (n = 12), n > 12 && (n -= 12), n = o(n), s = o(s), i = o(i), document.getElementById(a.timeplace).innerHTML = n + ":" + s + ":" + i + " " + e
            };
        setInterval(u, 500)
    }(jQuery)
}

function daters() {
    $(".timestamp-link abbr.published").each(function() {
        var e = $(this).attr("title"),
            t = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if ("" != e) var a = e.substring(0, 10),
            n = a.substring(0, 4),
            s = a.substring(5, 7),
            i = a.substring(8, 10),
            r = t[parseInt(s, 10) - 1];
        var l = $(this).parents(".post"),
            o = l.children(".dater");
        o.removeClass("hidex").addClass("show"), $("strong", o).html(i), $("small", o).html(n), $("span", o).html(r)
    })
}

function navactive(e) {
    function t() {
        e(window).width() > 767 ? e("#navi").css("display", "block").removeClass("suball") : e(window).width() <= 767 && "active" === e("#mobilenav").attr("class") ? e("#navi").css("display", "block").addClass("suball") : e(window).width() <= 767 && "active" !== e("#mobilenav").attr("class") && e("#navi").css("display", "none").addClass("suball")
    }

    function a() {
        e(window).width() > 767 ? e("#PageList1 ul").css("display", "block") : e(window).width() <= 767 && "active" === e("#top_mobilenav").attr("class") ? e("#PageList1 ul").css("display", "block") : e(window).width() <= 767 && "active" !== e("#top_mobilenav").attr("class") && e("#PageList1 ul").css("display", "none")
    }
    var n = window.location.href;
    e("#navi a").each(function() {
        if (this.href === n) {
            e(this).parents("li").children("a").addClass("current")
        }
    }), e("#navi ul").removeClass("hidden"), e("#navi li").hoverTimeout(100, function() {
        e(this).parent("ul").css("overflow", "visible"), e(this).children("ul").filter(":not(:animated)").slideDown()
    }, 500, function() {
        e(this).parent("ul").css("overflow", "visible"), e(this).children("ul").slideUp(800, "easeInExpo")
    }), e("#mobilenav").click(function() {
        return e("#navi").slideToggle(), e(this).toggleClass("active"), !1
    }), e("#top_mobilenav").click(function() {
        return e("#PageList1 ul").slideToggle(), e(this).toggleClass("active"), !1
    }), t(), a(), e(window).resize(t), e(window).resize(a)
}

function searcher(e) {
    ! function(t) {
        var a = {
            blogURL: "",
            srcBlank: "http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s1600/grey.gif",
            findText: "Search results for keyword",
            NotfindText: "No result!",
            Showthumb: !0,
            LoadingText: "Searching...",
            scrthumbSize: 50,
            summaryLength: 100
        };
        a = t.extend({}, a, e);
        var n = t("#ajax-search-form"),
            s = n.find(":text");
        n.append('<div id="search-result"></div>');
        var i = t("#search-result");
        n.on("submit", function() {
            var e = s.val();
            return i.show().html('<div class="load">' + a.LoadingText + "</div>"), t.get(("" === a.blogURL ? window.location.protocol + "//" + window.location.host : a.blogURL) + "/feeds/posts/summary?alt=json-in-script&q=" + e + "&max-results=9999", function(t) {
                var n, s, r, l, o = t.feed.entry,
                    u = "";
                if (void 0 !== o) {
                    u = "<h4>" + a.findText + " &quot;" + e + "&quot;</h4>", u += '<a class="close" href="/">&times;</a><ol>';
                    for (var c = 0; c < o.length; c++) {
                        for (var d = new RegExp(e, "ig"), r = o[c].title.$t.replace(d, "<mark>" + e + "</mark>"), h = 0; h < o[c].link.length; h++) "alternate" == o[c].link[h].rel && (l = o[c].link[h].href);
                        a.summaryLength > 0 && (n = "content" in o[c] ? o[c].content.$t : "summary" in o[c] ? o[c].summary.$t : "", n = n.replace(/<\S[^>]*>/g, ""), n.length > a.summaryLength && (n = n.substring(0, a.summaryLength) + "..."), n = n.replace(d, "<mark>" + e + "</mark>")), a.Showthumb === !0 && (s = "media$thumbnail" in o[c] ? o[c].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/s" + a.scrthumbSize + "-c") : a.srcBlank), u += '<li><a href="' + l + '" >' + (a.Showthumb === !0 ? '<img width="' + a.scrthumbSize + '" height="' + a.scrthumbSize + '" src="' + s + '"/>' : "") + "<strong>" + r + "</strong></a>" + (a.summaryLength > 0 ? "<p>" + n + "</p>" : "") + "</li>"
                    }
                    u += "</ol>", i.html(u)
                } else i.html('<a class="close" href="/">&times;</a><strong>' + a.NotfindText + "</strong>")
            }, "jsonp"), !1
        }), n.on("click", ".close", function() {
            return i.fadeOut(), !1
        })
    }(jQuery)
}

function frontPost(e) {
    ! function(t) {
        var a = {
            blogURL: dataFetcher.SiteUrl,
            MaxPost: 5,
            idcontaint: "",
            FirstImageSize: 600,
            ImageSize: 600,
            Summarylength: 140,
            animated: !1,
            loadingClass: "loadingz",
            pBlank: "",
            MonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            tagName: !1
        };
        a = t.extend({}, a, e);
        var n = t(a.idcontaint);
        n.html('<div class="box-content"><ul></ul></div>').addClass(a.loadingClass), __feed = a.blogURL + "feeds/posts/default" + (0 == a.tagName ? "" : "/-/" + a.tagName) + "?max-results=" + a.MaxPost + "&orderby=published&alt=json-in-script", t.get(__feed, function(e) {
            var s, i, r, l, o, u, c, d, h, m, g, p, f, v, b, y = "",
                w = e.feed.entry;
            if ("undefined" == typeof w) y = '<li><div class="inner-content" > No data </div></li>';
            else
                for (var M = 0; M < w.length; M++) {
                    for (var x = 0; x < w[M].link.length; x++)
                        if ("alternate" == w[M].link[x].rel) {
                            s = w[M].link[x].href;
                            break
                        }
                    for (var f = 0; x > f; f++)
                        if ("replies" == w[M].link[f].rel && "text/html" == w[M].link[f].type) {
                            l = w[M].link[f].title.split(" ")[0];
                            break
                        }
                    r = "content" in w[M] ? w[M].content.$t : "summary" in w[M] ? w[M].summary.$t : "", "media$thumbnail" in w[M] ? o = w[M].media$thumbnail.url : (o = dataFetcher.getImageUrl(r), "" == o && (o = a.pBlank)), r = r.replace(/<\S[^>]*>/g, ""), r.length > a.Summarylength && (r = r.substring(0, a.Summarylength) + "..."), w[M] === w[0] ? (o = o.replace(/\/s[0-9]+\-c/g, "/s" + a.FirstImageSize + "-p"), -1 != o.indexOf("img.youtube.com/vi/") && (o = o.replace("default", "0")), c = "<p>" + r + "</p>") : (o = o.replace(/\/s[0-9]+\-c/g, "/s" + a.ImageSize + "-p"), c = ""), i = w[M].title.$t, v = w[M].author[0].name.$t, b = w[M].author[0].gd$image.src, f = w[M].published.$t.substring(0, 10), d = f.substring(0, 4), h = f.substring(5, 7), m = f.substring(8, 10), g = a.MonthNames[parseInt(h, 10) - 1], dataFetcher.postList.push(i), u = '<div class="post-thumbnail"><a title="' + i + '" href="' + s + '"><div class="shadow"><span class="icon-link"></span></div><img class="grayscale" src="' + o + '"/><span class="uj-vid"></span></a></div>', p = '<h4><a class="more-link" href="' + s + '"><i class="icon-share-alt"></i> Continue reading </a></h4>', y += '<li><div class="inner-content" >' + u + '<div class="postitle"><h3><a href="' + s + '">' + i + '</a></h3></div><div class="post-meta"><span> ' + v + '</span> <span class="dd">' + m + " " + g + " " + d + '</span> - <span class="comt">' + l + " Comment </span></div>" + c + " " + p + "</div></li>"
                }
            t("ul", n).append(y), a.animated ? (t("ul", n).addClass("scroll-item"), t(a.idcontaint + " .box-content").flexslider({
                animation: "slide",
                selector: ".scroll-item > li",
                animationLoop: !0,
                itemWidth: 207,
                pauseOnHover: !0,
                move: 3,
                itemMargin: 0,
                minItems: 3,
                mousewheel: !1,
                maxItems: 4
            })) : 0 != a.tagName && n.append('<h5><a class="more2post" href="/search/label/' + encodeURIComponent(a.tagName) + '?&max-results=7">' + a.tagName + "</a></h5>"), n.removeClass(a.loadingClass)
        }, "jsonp")
    }(jQuery)
}

function NewsTicker(e) {
    ! function(t) {
        var a = {
            blogURL: locationHost,
            MaxPost: 5,
            Speed: .1,
            direction: "ltr",
            titleText: "Terbaru",
            displayType: "reveal",
            Container: "#ticker-wrapper",
            tagName: !1,
            MonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        };
        a = t.extend({}, a, e), t(a.Container).addClass("loading"), __feed = a.blogURL + "feeds/posts/summary" + (a.tagName === !1 ? "" : "/-/" + a.tagName) + "?max-results=" + a.MaxPost + "&orderby=published&alt=json-in-script", t.get(__feed, function(e) {
            var n, s, i, r, l, o, u, c, d, h, m, g = "",
                p = e.feed.entry;
            if (void 0 !== p) {
                for (var f = 0; f < p.length; f++) {
                    for (var v = 0; v < p[f].link.length; v++) "alternate" == p[f].link[v].rel && (n = p[f].link[v].href);
                    s = p[f].title.$t, h = p[f].published.$t.substring(0, 10), i = h.substring(0, 4), r = h.substring(5, 7), l = h.substring(8, 10), o = a.MonthNames[parseInt(r, 10) - 1], u = p[f].published.$t.substring(11, 16), c = u.substring(0, 2), d = u.substring(2, 5), m = 12 > c ? "AM" : "PM", 0 === c && (c = 12), c > 12 && (c -= 12), g += '<li><h3><a href="' + n + '">' + c + d + " " + m + " -  " + s + "</a></h3></li>"
                }
                t(a.Container).html('<h1 class="ticker-header">' + a.titleText + '</h1><ul class="ticker">' + g + "</ul>").removeClass("loading"), t("#newstick").ticker({
                    speed: a.Speed,
                    direction: a.direction,
                    titleText: a.titleText,
                    displayType: a.displayType
                })
            } else t(a.Container).html("<span>No result!</span>").removeClass("loading")
        }, "jsonp")
    }(jQuery)
}

function relatedPostsWidget(e) {
    ! function(t) {
        var a = {
            blogURL: locationHost,
            maxPosts: 4,
            maxTags: 5,
            maxPostsPerTag: 5,
            containerSelector: "#related_posts",
            tags: null,
            loadingText: "",
            loadingClass: "loadingz",
            relevantTip: "",
            rlt_summary: 100,
            relatedTitle: "Related Posts",
            readMoretext: "Read more &#187;",
            rlpBlank: "http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s1600/grey.gif",
            rlt_thumb: 110,
            recentTitle: "Related Post",
            MonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            postScoreClass: "",
            onLoad: !1
        };
        a = t.extend({}, a, e);
        var n = 0,
            s = null,
            i = null;
        a.containerSelector || (document.write('<div id="related_posts"></div>'), a.containerSelector = "#related_posts");
        var r = function(e) {
                if (n++, e.feed.entry)
                    for (var r = 0; r < e.feed.entry.length; r++) {
                        for (var o = e.feed.entry[r], u = "", c = 0; c < o.link.length; c++)
                            if ("alternate" == o.link[c].rel) {
                                u = o.link[c].href;
                                break
                            }
                        if ("content" in o) var d = o.content.$t;
                        else if ("summary" in o) var d = o.summary.$t;
                        else var d = "";
                        var d = d.replace(/<\S[^>]*>/g, "");
                        if (d.length > a.rlt_summary) var d = d.substring(0, a.rlt_summary) + "...";
                        var h = o.title.$t;
                        if ("media$thumbnail" in o) var m = o.media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/s" + a.rlt_thumb + "-c");
                        else {
                            var m = dataFetcher.getImageUrl(o.content.$t);
                            "" == m && (m = a.rlpBlank)
                        }
                        var g = o.published.$t.substring(0, 10),
                            p = g.substring(0, 4),
                            f = g.substring(5, 7),
                            v = g.substring(8, 10),
                            b = a.MonthNames[parseInt(f, 10) - 1];
                        location.href.toLowerCase() != u.toLowerCase() && l(u, h, m, d, p, v, b)
                    }
                n >= a.tags.length && (i.attr("class", ""), t("#related-posts-loadingtext", s).remove(), a.maxPosts > 0 && t("li:gt(" + (a.maxPosts - 1) + ")", i).remove())
            },
            l = function(e, n, s, r, l, c, d) {
                for (var h = t("li", i), m = 0; m < h.length; m++) {
                    var g = t("a", h.eq(m)),
                        p = o(g);
                    if (g.attr("href") == e) {
                        u(g, ++p);
                        for (var f = m - 1; f >= 0; f--) {
                            var v = t("a", h.eq(f));
                            if (o(v) > p) return void(m - f > 1 && h.eq(f).after(h.eq(m)))
                        }
                        return void(m > 0 && h.eq(0).before(h.eq(m)))
                    }
                }
                i.append('<li><a class="" href="' + e + '" title="' + (a.relevantTip ? a.relevantTip.replace("d", 1) : "") + '"><span class="imgrp"><img style="width:' + a.rlt_thumb + "px;height:" + a.rlt_thumb + 'px;display: block" alt="' + n + '" src="' + s + '"/></span><h3>' + n + "</h3></a><p>" + r + '<a  title="' + n + '" href="' + e + '">' + a.readMoretext + '</a></p><span class="date"><span class="dd">' + c + '</span><span class="dm">' + d + '</span><span class="dy">' + l + "</span></span></li>")
            },
            o = function(e) {
                var t = parseInt(e.attr("score"));
                return t > 0 ? t : 1
            },
            u = function(e, t) {
                e.attr("score", t), a.relevantTip && e.attr("title", a.relevantTip.replace("d", t)), a.postScoreClass && e.attr("class", a.postScoreClass + t)
            },
            c = function() {
                if ("#related_posts" != a.containerSelector) {
                    var e = t(a.containerSelector);
                    if (1 != e.length) return;
                    s = t('<div id="related_posts"></div>').appendTo(e)
                } else s = t(a.containerSelector);
                if (a.tags || (a.tags = [], t('a[rel="tag"]:lt(' + a.maxTags + ")").each(function() {
                        var e = t.trim(t(this).text().replace(/\n/g, "")); - 1 == t.inArray(e, a.tags) && (a.tags[a.tags.length] = e)
                    })), 0 != a.tags.length || a.recentTitle)
                    if (0 == a.tags.length ? t("<h4><span>" + a.recentTitle + "</span></h4>").appendTo(s) : a.relatedTitle && t("<h4><span>" + a.relatedTitle + "</span></h4>").appendTo(s), a.loadingText && t('<div id="related-posts-loadingtext">' + a.loadingText + "</div>").appendTo(s), i = t("<ul " + (a.loadingClass ? 'class="' + a.loadingClass + '"' : "") + "></ul>").appendTo(s), 0 == a.tags.length) t.get(("" === a.blogURL ? window.location.protocol + "//" + window.location.host : a.blogURL) + "/feeds/posts/summary?max-results=" + a.maxPostsPerTag + "&orderby=published&alt=json-in-script", r, "jsonp");
                    else
                        for (var n = 0; n < a.tags.length; n++) t.get(("" === a.blogURL ? window.location.protocol + "//" + window.location.host : a.blogURL) + "/feeds/posts/summary/-/" + a.tags[n] + "?max-results=" + a.maxPostsPerTag + "&orderby=published&alt=json-in-script", r, "jsonp")
            };
        a.onLoad ? t(window).load(c) : t(document).ready(c)
    }(jQuery)
}

function slide1(e) {
    ! function(t) {
        var a = {
            blogURL: locationHost,
            MaxPost: 4,
            ImageSize: 100,
            RandompostActive: !1,
            Container: ".rhino",
            MonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            tagName: "Featured"
        };
        __feed = locationHost + "feeds/posts/default/-/Featured?start-index=1&max-results=10&orderby=published&alt=json-in-script", a = t.extend({}, a, e), t(a.Container).addClass("loading"), t.get(__feed, function(e) {
            var n, s, i, r, l, o, u, c, d, h, m, g, p = "",
                f = e.feed.entry;
            if (void 0 !== f) {
                for (var v = 0; v < f.length; v++) {
                    for (var b = 0; b < f[v].link.length; b++)
                        if ("alternate" == f[v].link[b].rel) {
                            n = f[v].link[b].href;
                            break
                        }
                        "media$thumbnail" in f[v] ? (d = f[v].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/s" + a.ImageSize), -1 != f[v].media$thumbnail.url.indexOf("img.youtube.com") && (d = f[v].media$thumbnail.url.replace("default", "0"))) : (d = dataFetcher.getImageUrl(f[v].content.$t), "" == d && (d = a.pBlank), d = a.pBlank.replace(/\/s[0-9]+\-c/g, "/s" + a.ImageSize)), s = f[v].title.$t, m = f[v].published.$t.substring(0, 10), i = m.substring(0, 4), r = m.substring(5, 7), l = m.substring(8, 10), o = a.MonthNames[parseInt(r, 10) - 1], u = f[v].published.$t.substring(11, 16), c = u.substring(0, 2), h = u.substring(2, 5), g = 12 > c ? "AM" : "PM", 0 === c && (c = 12), c > 12 && (c -= 12), p += '<li><img class="image float_right" src="' + d + '" alt="' + s + '"/><div class="rhino-caption"><h3><a class="title" href="' + n + '"> ' + s + "</a></h3></div></li>"
                }
                t(a.Container).html('<ul id="feature_slider" class="margin_bottom">' + p + "</ul>").removeClass("loading"), t("#feature_slider").rhinoslider({
                    controlsPlayPause: !1,
                    autoPlay: !0,
                    showCaptions: "always",
                    effect: "chewyBars",
                    changeBullets: "before",
                    effectTime: 3500,
                    showTime: 9e3,
                    shiftValue: 50,
                    parts: "15",
                    showBullets: "never",
                    showControls: "always"
                })
            } else t(a.Container).html("<span>No result!</span>").removeClass("loading")
        }, "jsonp")
    }(jQuery)
}

function slide2(e) {
    ! function(t) {
        var a = {
            blogURL: locationHost,
            MaxPost: 4,
            ImageSize: 100,
            RandompostActive: !1,
            idcontaint: ".rhino1",
            MonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        };
        a = t.extend({}, a, e), t(a.idcontaint).addClass("loading"), __feed = a.blogURL + "feeds/posts/summary" + (a.tagName === !1 ? "" : "/-/" + a.tagName) + "?max-results=" + a.MaxPost + "&orderby=published&alt=json-in-script", t.get(__feed, function(e) {
            var n, s, i, r, l, o, u, c, d, h, m, g, p = "",
                f = e.feed.entry;
            if (void 0 !== f) {
                for (var v = 0; v < f.length; v++) {
                    for (var b = 0; b < f[v].link.length; b++)
                        if ("alternate" == f[v].link[b].rel) {
                            n = f[v].link[b].href;
                            break
                        }
                        "media$thumbnail" in f[v] ? (d = f[v].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/s" + a.ImageSize), -1 != f[v].media$thumbnail.url.indexOf("img.youtube.com") && (d = f[v].media$thumbnail.url.replace("default", "0"))) : (d = dataFetcher.getImageUrl(f[v].content.$t), "" == d && (d = a.pBlank), d = d.replace(/\/s[0-9]+\-c/g, "/s" + a.ImageSize)), s = f[v].title.$t, m = f[v].published.$t.substring(0, 10), i = m.substring(0, 4), r = m.substring(5, 7), l = m.substring(8, 10), o = a.MonthNames[parseInt(r, 10) - 1], u = f[v].published.$t.substring(11, 16), c = u.substring(0, 2), h = u.substring(2, 5), g = 12 > c ? "AM" : "PM", 0 === c && (c = 12), c > 12 && (c -= 12), p += '<li><img class="image float_right" src="' + d + '" alt="' + s + '"/><div class="rhino-caption"><h3><a class="title" href="' + n + '"> ' + s + "</a></h3></div></li>"
                }
                t(a.idcontaint).html('<ul id="two_slider" class="margin_bottom">' + p + "</ul>").removeClass("loading"), t("#two_slider").rhinoslider({
                    controlsPlayPause: !1,
                    autoPlay: !0,
                    showCaptions: "always",
                    effect: "kick",
                    changeBullets: "before",
                    animateActive: !0,
                    effectTime: 2500,
                    showTime: 5e3,
                    shiftValue: 50,
                    parts: "15",
                    showBullets: "always",
                    showControls: "always"
                })
            } else t(a.Container).html("<span>No result!</span>").removeClass("loading")
        }, "jsonp")
    }(jQuery)
}
jQuery.easing.jswing = jQuery.easing.swing;
var locationHost = dataFetcher.SiteUrl,
    __feed;
jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(e, t, a, n, s) {
            return jQuery.easing[jQuery.easing.def](e, t, a, n, s)
        },
        easeInQuad: function(e, t, a, n, s) {
            return n * (t /= s) * t + a
        },
        easeOutQuad: function(e, t, a, n, s) {
            return -n * (t /= s) * (t - 2) + a
        },
        easeInOutQuad: function(e, t, a, n, s) {
            return (t /= s / 2) < 1 ? n / 2 * t * t + a : -n / 2 * (--t * (t - 2) - 1) + a
        },
        easeInCubic: function(e, t, a, n, s) {
            return n * (t /= s) * t * t + a
        },
        easeOutCubic: function(e, t, a, n, s) {
            return n * ((t = t / s - 1) * t * t + 1) + a
        },
        easeInOutCubic: function(e, t, a, n, s) {
            return (t /= s / 2) < 1 ? n / 2 * t * t * t + a : n / 2 * ((t -= 2) * t * t + 2) + a
        },
        easeInQuart: function(e, t, a, n, s) {
            return n * (t /= s) * t * t * t + a
        },
        easeOutQuart: function(e, t, a, n, s) {
            return -n * ((t = t / s - 1) * t * t * t - 1) + a
        },
        easeInOutQuart: function(e, t, a, n, s) {
            return (t /= s / 2) < 1 ? n / 2 * t * t * t * t + a : -n / 2 * ((t -= 2) * t * t * t - 2) + a
        },
        easeInQuint: function(e, t, a, n, s) {
            return n * (t /= s) * t * t * t * t + a
        },
        easeOutQuint: function(e, t, a, n, s) {
            return n * ((t = t / s - 1) * t * t * t * t + 1) + a
        },
        easeInOutQuint: function(e, t, a, n, s) {
            return (t /= s / 2) < 1 ? n / 2 * t * t * t * t * t + a : n / 2 * ((t -= 2) * t * t * t * t + 2) + a
        },
        easeInSine: function(e, t, a, n, s) {
            return -n * Math.cos(t / s * (Math.PI / 2)) + n + a
        },
        easeOutSine: function(e, t, a, n, s) {
            return n * Math.sin(t / s * (Math.PI / 2)) + a
        },
        easeInOutSine: function(e, t, a, n, s) {
            return -n / 2 * (Math.cos(Math.PI * t / s) - 1) + a
        },
        easeInExpo: function(e, t, a, n, s) {
            return 0 == t ? a : n * Math.pow(2, 10 * (t / s - 1)) + a
        },
        easeOutExpo: function(e, t, a, n, s) {
            return t == s ? a + n : n * (-Math.pow(2, -10 * t / s) + 1) + a
        },
        easeInOutExpo: function(e, t, a, n, s) {
            return 0 == t ? a : t == s ? a + n : (t /= s / 2) < 1 ? n / 2 * Math.pow(2, 10 * (t - 1)) + a : n / 2 * (-Math.pow(2, -10 * --t) + 2) + a
        },
        easeInCirc: function(e, t, a, n, s) {
            return -n * (Math.sqrt(1 - (t /= s) * t) - 1) + a
        },
        easeOutCirc: function(e, t, a, n, s) {
            return n * Math.sqrt(1 - (t = t / s - 1) * t) + a
        },
        easeInOutCirc: function(e, t, a, n, s) {
            return (t /= s / 2) < 1 ? -n / 2 * (Math.sqrt(1 - t * t) - 1) + a : n / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + a
        },
        easeInElastic: function(e, t, a, n, s) {
            var i = 1.70158,
                r = 0,
                l = n;
            if (0 == t) return a;
            if (1 == (t /= s)) return a + n;
            if (r || (r = .3 * s), l < Math.abs(n)) {
                l = n;
                var i = r / 4
            } else var i = r / (2 * Math.PI) * Math.asin(n / l);
            return -(l * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * s - i) * Math.PI / r)) + a
        },
        easeOutElastic: function(e, t, a, n, s) {
            var i = 1.70158,
                r = 0,
                l = n;
            if (0 == t) return a;
            if (1 == (t /= s)) return a + n;
            if (r || (r = .3 * s), l < Math.abs(n)) {
                l = n;
                var i = r / 4
            } else var i = r / (2 * Math.PI) * Math.asin(n / l);
            return l * Math.pow(2, -10 * t) * Math.sin(2 * (t * s - i) * Math.PI / r) + n + a
        },
        easeInOutElastic: function(e, t, a, n, s) {
            var i = 1.70158,
                r = 0,
                l = n;
            if (0 == t) return a;
            if (2 == (t /= s / 2)) return a + n;
            if (r || (r = .3 * s * 1.5), l < Math.abs(n)) {
                l = n;
                var i = r / 4
            } else var i = r / (2 * Math.PI) * Math.asin(n / l);
            return 1 > t ? -.5 * l * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * s - i) * Math.PI / r) + a : l * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * s - i) * Math.PI / r) * .5 + n + a
        },
        easeInBack: function(e, t, a, n, s, i) {
            return void 0 == i && (i = 1.70158), n * (t /= s) * t * ((i + 1) * t - i) + a
        },
        easeOutBack: function(e, t, a, n, s, i) {
            return void 0 == i && (i = 1.70158), n * ((t = t / s - 1) * t * ((i + 1) * t + i) + 1) + a
        },
        easeInOutBack: function(e, t, a, n, s, i) {
            return void 0 == i && (i = 1.70158), (t /= s / 2) < 1 ? n / 2 * t * t * (((i *= 1.525) + 1) * t - i) + a : n / 2 * ((t -= 2) * t * (((i *= 1.525) + 1) * t + i) + 2) + a
        },
        easeInBounce: function(e, t, a, n, s) {
            return n - jQuery.easing.easeOutBounce(e, s - t, 0, n, s) + a
        },
        easeOutBounce: function(e, t, a, n, s) {
            return (t /= s) < 1 / 2.75 ? 7.5625 * n * t * t + a : 2 / 2.75 > t ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + a : 2.5 / 2.75 > t ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + a : n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + a
        },
        easeInOutBounce: function(e, t, a, n, s) {
            return s / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, n, s) + a : .5 * jQuery.easing.easeOutBounce(e, 2 * t - s, 0, n, s) + .5 * n + a
        }
    }),
    function(e) {
        e.fn.hoverTimeout = function(t, a, n, s) {
            return this.each(function() {
                var i = null,
                    r = e(this);
                r.hover(function() {
                    clearTimeout(i), i = setTimeout(function() {
                        a.call(r)
                    }, t)
                }, function() {
                    clearTimeout(i), i = setTimeout(function() {
                        s.call(r)
                    }, n)
                })
            })
        }
    }(jQuery), window.labelinc = function() {
        var e = function(e) {
            var t = e || {},
                a = t.url_blog || window.location.host,
                n = t.id_labelcontent || "#ujLab";
            $.get("http://" + a + "/feeds/posts/summary?max-results=0&alt=json-in-script", function(e) {
                var t = e.feed.category,
                    a = "";
                if (void 0 !== t) {
                    a = "<span>+</span><ul class='S2item_Uj'>";
                    for (var s = 0; s < t.length; s++) a += '<li><a href="/search/label/' + encodeURIComponent(t[s].term) + '?&max-results=7">' + t[s].term + "</a></li>";
                    a += "</ul>", $(n).html(a)
                } else $(n).html("<span>No Label!</span>")
            }, "jsonp"), $(".item-Uj .lines").click(function() {
                return $("#ujLab").slideToggle("fast"), $(this).toggleClass("active"), !1
            })
        };
        return function(t) {
            e(t)
        }
    }(),
    function(e) {
        e(window).scroll(function() {
            e(this).scrollTop() > 250 ? (e("#top").removeAttr("href"), e("#top").stop().animate({
                height: 40,
                opacity: 1
            }, {
                duration: 500,
                queue: !1
            })) : e("#top").stop().animate({
                height: 0,
                opacity: 0
            }, {
                duration: 500,
                queue: !1
            })
        }), e(function() {
            e("#top").click(function() {
                return e("html, body").animate({
                    scrollTop: 0
                }, "slow"), !1
            })
        })
    }(jQuery);
