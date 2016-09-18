function fDimension() {
    this.w = 0, this.h = 0, this.box = {
        def: 0,
        t: 0,
        l: 0,
        b: 0,
        r: 0
    }, this.margin = {
        def: 0,
        t: 0,
        l: 0,
        b: 0,
        r: 0
    }, this.w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

function cleanProductName(t) {
    if (void 0 === t || "" == t) return "";
    var e, a = ["-", "bolu", "cake", "kue", "tempe", "roti", "nasi"];
    return t = t.toLowerCase(), e = t, a.forEach(function(e) {
        t = t.replace(new RegExp(e, "g"), "")
    }), t = t.trim(), "" == t ? e : t
}
var _NORMAL = 1,
    _HALFWIDTH = 2,
    _FULLWIDTH = 3,
    _oo = {},
    data = "";
fDimension.prototype = {
    constructor: fDimension
};
var $sys = {
        config: {
            outermargin: 0,
            leftBarWidth: 300,
            spaceMargin: 0,
            pageWrapperId: "page-wrapper",
            pageContendId: "content",
            leftBarId: "inner-left-sidebar",
            RightBarId: "outer-right-sidebar",
            mode: _NORMAL,
            OperationCanceled: !1,
            screenWidth: 0,
            w: 0,
            width: 0,
            el: !1,
            container: !1
        },
        init: function() {
            $sys.config.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, $sys.config.w = $sys.config.screenWidth, $sys.config.width = "", $sys.config.w < 600 && $sys.config.w > 400 && ($sys.config.outermargin = 120), $sys.config.w < 400 && ($sys.config.outermargin = 20), $sys.config.w -= $sys.config.outermargin, publicInfoScreenWidth = $sys.config.w
        },
        reajust: function(t) {
            if (!$sys.config.OperationCanceled && (t = cTrim(t), t = t.toUpperCase(), $sys.config.mode == _NORMAL)) switch (t) {
                case "FULL FEATURED":
                case "PRODUK ANDALAN":
                case "SANGAT ISTIMEWA":
                case "GALERIA":
                    $sys.config.mode = _FULLWIDTH;
                    break;
                case "ISTIMEWA":
                case "PRODUK":
                case "SHOW OFF":
                    $sys.config.mode = _HALFWIDTH
            }
        },
        ajustPageWraper: function() {
            if ($sys.config.screenWidth < 1024 && (MasterElement.clearSection(["outer-right-sidebar"]), MasterElement.register(["outer-right-sidebar"], "clearSection")), $sys.config.screenWidth < 768 && (MasterElement.clearSection(["inner-left-sidebar"]), MasterElement.register(["inner-left-sidebar"], "clearSection")), $sys.config.screenWidth < 480 && (MasterElement.remove(["sliderUj", "slid1", "uj-slider"]), MasterElement.register(["sliderUj", "slid1", "uj-slider"], "remove")), !$sys.config.OperationCanceled) {
                var t = $("#" + $sys.config.pageWrapperId);
                switch ($sys.config.mode) {
                    case _FULLWIDTH:
                        $sys.config.width = "width:" + ($sys.config.w - 38) + "px;";
                        break;
                    case _HALFWIDTH:
                        $sys.config.w -= $sys.config.spaceMargin, $sys.config.leftBarWidth += 50, $sys.config.width = "width:" + ($sys.config.w - $sys.config.leftBarWidth) + "px;";
                        break;
                    case _NORMAL:
                }
                MasterElement.remove(["invisible"]), t.attr("style", "overflow:hidden;float:left;" + $sys.config.width)
            }
        },
        ajustPageContent: function() {
            if (!$sys.config.OperationCanceled) switch (0 == $sys.config.container ? $sys.config.container = $("#" + $sys.config.pageContendId) : !1, $sys.config.mode) {
                case _HALFWIDTH:
                    $sys.config.container.attr("style", "overflow:hidden;float:left;" + $sys.config.width);
                    break;
                case _FULLWIDTH:
                    $sys.config.container.attr("style", "overflow:hidden;float:left;" + $sys.config.width);
                    break;
                case _NORMAL:
            }
        },
        cancel: function() {
            $sys.config.OperationCanceled = !0
        },
        enable: function() {
            $sys.config.OperationCanceled = !1
        },
        getParent: function(t, e) {
            for (e = e.toLowerCase(); t && t.parentNode;)
                if (t = t.parentNode, t.tagName && t.tagName.toLowerCase() == e) return t;
            return null
        },
        setImageSize: function(t, e) {
            t.removeClass("full"), t.attr({
                src: t.attr("src").replace(/s\B\d{2,4}/, "s" + e)
            }), t.attr("width", e), t.attr("height", "auto"), t.attr("style", "width:" + wdh + "px;height:auto;max-width:" + e + "px;")
        },
        boxImage: function(t) {
            try {
                var e = $.extend({}, {
                    id: "image_id",
                    text: !1,
                    size: 200,
                    full: !1,
                    "class": "sys-boxImage"
                }, t);
                e.full && (e.size = $sys.config.w - 40);
                var a = document.getElementById(e.id);
                if (null == a) return;
                var i = $sys.getParent(a, "div"),
                    n = a.getAttribute("src"),
                    s = n.replace(/s\B\d{2,4}/, "s" + $sys.config.w);
                n = n.replace(/s\B\d{2,4}/, "s" + e.size);
                var r = '<div class="' + e.class + '" style="width:' + e.size + 'px;">';
                r += '<div class="' + e.class + '_div1" >', r += '<div class="' + e.class + '_div2" >', r += '<div style="overflow:hidden;text-align:center;">', r += '<a href="' + s + '" imageanchor="1" ><img width="' + e.size + 'px" style="width:' + e.size + "px;max-width:" + e.size + 'px;" src="' + n + '" alt="" id="im_id" /></a></div></div>', e.text !== !1 && (r += '<div class="' + e.class + '_text">' + e.text + "</div>"), r += "</div></div>", i.innerHTML = r, i.setAttribute("style", "width:" + $sys.config.w + "px;height:0px;")
            } catch (o) {}
        },
        _getInternal: function(t, e) {
            e = e || "";
            var a = "<" + t,
                i = ">",
                n = e.indexOf(a),
                s = a.length;
            if (-1 != n) {
                e = e.substr(n + s);
                var r = e.indexOf(">") - i.length;
                return e.substr(0, r)
            }
            return ""
        },
        ajustVideo: function(t) {
            function e(t, e) {
                "undefined" == typeof e && (e = "");
                var a = t.indexOf(e + "src=");
                if (-1 != a) {
                    if (b = t.indexOf('src="', a), b1 = t.indexOf("src='", a), -1 != b) return c = t.indexOf('"', b + 5), t.substr(b + 5, c - b - 5);
                    if (-1 != b1) return c = t.indexOf("'", b + 5), t.substr(b + 5, c - b - 5)
                }
            }

            function a(t) {
                var a = e(t, "data-thumbnail-"),
                    i = $sys._getInternal("embed", t);
                return i = e(i), i = '<iframe width="640" height="360" src="' + i + '?feature=player_embedded" frameborder="0" allowfullscreen></iframe><img src="' + a + '&rel=0" width="0" height="0"/>'
            }

            function i() {
                var t = s.find("object"),
                    e = t.parent(),
                    i = a(e.html());
                e.html(i)
            }
            var n = $.extend({}, {
                all: !1,
                id: !1,
                text: "",
                box: !1,
                size: 200,
                full: !1,
                "class": "sys-boxImage",
                container: !1,
                video: !1,
                data: !1,
                owner: !1
            }, t);
            s = n.owner;
            try {
                if (n.container !== !1)
                    if (document.getElementById(n.container)) var s = $("#" + n.container);
                    else var s = $(n.container);
                else var s = $sys.config.container;
                i()
            } catch (r) {
                _nfo(r, "func ajustVideo", 230)
            }
        },
        ajustImage: function(t) {
            function e(t) {
                t.removeClass("full"), t.attr({
                    src: t.attr("src").replace(/s\B\d{2,4}/, "s1600")
                }), t.attr("width", n), t.attr("height", "auto"), t.attr("style", "width:" + n + "px;height:auto;max-width:" + n + "px;")
            }

            function a() {
                var t = 0,
                    a = "";
                if (i.id === !1 || i.box) {
                    if (i.container !== !1)
                        if (document.getElementById(i.container)) var n = $("#" + i.container);
                        else var n = $(i.container);
                    else var n = $sys.config.container;
                    i.id !== !1 && i.box ? $sys.boxImage(i) : n.find("img").each(function(n, s) {
                        var r = $(s);
                        i.box ? (a = "img-autoid-" + ++t, r.attr("id", a), i.id = a, $sys.boxImage(i)) : e(s)
                    })
                } else {
                    var s = $("#" + i.id);
                    e(s)
                }
            }
            var i = $.extend({}, {
                    all: !1,
                    id: !1,
                    text: "",
                    box: !1,
                    size: 200,
                    full: !1,
                    "class": "sys-boxImage",
                    container: !1,
                    video: !1,
                    data: !1,
                    owner: !1
                }, t),
                n = $sys.config.w - 20;
            if (i.all = !0, !$sys.OperationCanceled) switch ($sys.config.mode) {
                case _HALFWIDTH:
                    n -= $sys.config.leftBarWidth, a();
                    break;
                case _FULLWIDTH:
                    a();
                    break;
                case _NORMAL:
            }
        },
        ajustIframe: function(t) {
            function e() {
                {
                    var t = "#frame-adzan";
                    t.contents().find("table").attr("width", "300")
                }
            }
            var a = $.extend({}, {
                all: !1,
                id: !1,
                text: "",
                box: !1,
                size: 200,
                full: !1,
                container: !1,
                video: !1,
                data: !1,
                owner: !1
            }, t);
            try {
                if (a.container !== !1)
                    if (document.getElementById(a.container)) {
                        $("#" + a.container)
                    } else {
                        $(a.container)
                    }
                else {
                    0 == $sys.config.container && ($sys.config.container = $("#bodypage")); {
                        $sys.config.container
                    }
                }
                a.id !== !1 && e()
            } catch (i) {
                _nfo(i, "func ajustIframe", 230)
            }
        },
        finalize: function() {
            if (!$sys.OperationCanceled) {
                switch ($sys.ajustPageContent(), $sys.config.mode) {
                    case _HALFWIDTH:
                        $("#" + $sys.config.leftBarId).html(""), MasterElement.register(["frontpage", "inner-left-sidebar"], "clearSection");
                        break;
                    case _FULLWIDTH:
                        $("#" + $sys.config.leftBarId).html(""), $("#" + $sys.config.RightBarId).html(""), MasterElement.register(["cruJmbs", "ticker-wrapper", "tickerClearance", "post-navigation", "navigationClearance", "post-title1"], "remove"), MasterElement.register(["posMetaData", "author-box", "post-tag1", "blog-pager", "post-navigation", "blog-pager"], "remove"), MasterElement.register(["frontpage", "inner-left-sidebar", "outer-right-sidebar"], "clearSection"), $("#container").attr("style", "width:100%"), $("#container1").attr("style", "width:98%"), $("#uJ-menu").attr("style", "max-width:100%"), $("#commentForm").attr("style", "max-width:98%"), $(".post-inner").attr("style", "padding: 5px 0px 0px;margin-bottom: 5px;");
                        break;
                    case _NORMAL:
                }
                MasterElement.execute(), $sys.dofinalize()
            }
        },
        dofinalize: function() {
            function t() {
                a = new $sys.tag("ajustimage", !1, {
                    callback: function(t) {
                        $sys.ajustImage(t)
                    }
                }).parse(a), a = new $sys.tag("ajustvideo", !1, {
                    callback: function(t) {
                        $sys.ajustVideo(t)
                    }
                }).parse(a), $sys.config.pageContendId = "bodypage", a = $("#" + $sys.config.pageContendId).html(), a = new $sys.tag("ajustiframe", !1, {
                    callback: function(t) {
                        $sys.ajustIframe(t)
                    }
                }).parse(a)
            }
            var e = $("#" + $sys.config.pageContendId);
            null == e && _nfo("$sys.config.pageContendId is null");
            var a = $("#" + $sys.config.pageContendId).html();
            a && t()
        },
        taglist: {},
        tagcount: 0,
        tag: function(name, strict, options) {
            if ("undefined" == typeof name) return this;
            this.strict = "boolean" == typeof strict ? strict : !1, this.custom = !1;
            var actual = this;
            this.name = name, this.index = 1, this.before = this, this.after = this, this.id = null, this.content = "", this.attr = null, this.text = "", this.parsecount = 0, this.MaxCount = 99999, this.specialId = !1, this.parseType = "image", $sys.tagcount += 1, this.callback = function() {};
            for (var prop in options) actual[prop] = options[prop];
            return this.openingName = function() {
                return actual.custom ? actual.name : "<" + actual.name
            }, this.closingName = function() {
                return actual.custom ? this.closing : this.strict ? "</" + this.name + ">" : this.closing
            }, this.shortclose = function() {
                return ">"
            }, this.toLongClose = function() {
                return actual.custom ? !1 : this.closing = "</" + this.name + ">", this
            }, this.toShortClose = function() {
                return actual.custom ? !1 : this.closing = ">", this
            }, this.toShortClose(), "string" == typeof strict && (actual.custom = !0, actual.name = name, actual.closing = strict), this.parse = function(data) {
                function getVideoImageSrc(t, e) {
                    "undefined" == typeof e && (e = "");
                    var a = t.indexOf(e + "src=");
                    if (-1 != a) {
                        if (b = tmp.indexOf('src="', a), b1 = tmp.indexOf("src='", a), -1 != b) return c = tmp.indexOf('"', b + 5), tmp.substr(b + 5, c - b - 5);
                        if (-1 != b1) return c = tmp.indexOf("'", b + 5), tmp.substr(b + 5, c - b - 5)
                    }
                }

                function findText() {
                    var t = actual.content.indexOf("text=");
                    if (-1 != t) {
                        var e = actual.content.substr(t + 6),
                            a = e.indexOf('"');
                        actual.text = sdata.substr(0, a), "" !== cTrim(ctext) && (actual.content = actual.content.substr(0, t) + e.substr(a + 1))
                    }
                }
                var i1 = data.indexOf(actual.specialId);
                if (actual.specialId !== !1) {
                    var i1 = data.indexOf(actual.specialId);
                    if (-1 == i1) return data
                }
                var i1 = data.indexOf(actual.openingName());
                if (-1 != i1) {
                    var s = cTrim(data.substr(i1 + actual.openingName().length)),
                        i2 = s.indexOf(actual.closingName());
                    actual.content = s.substr(0, i2), data = cTrim(data.substr(0, i1) + s.substr(i2 + actual.closingName().length)), i1 = actual.content.length - 2, "/" == actual.content.substr(i1, 1) && (actual.content = actual.content.substr(0, i1) + '"');
                    try {
                        findText();
                        var a = actual.content.split(" ");
                        actual.attr = {}, $.each(a, function(i, str) {
                            var tup = str.split("=");
                            if (2 === tup.length)
                                if ("BOXED" == tup[0].toUpperCase()) actual.attr.box = !0;
                                else {
                                    var num = parseInt(tup[1].replace('"', ""));
                                    actual.attr[tup[0].toLowerCase()] = num ? num : eval(tup[1])
                                }
                        }), "" != actual.text ? actual.attr.text = cTrim(actual.text) : !1, actual.parsecount += 1, actual.callback(actual.attr)
                    } catch (e) {
                        logErr("error " + e, "\n\nparse")
                    }
                    return actual.parse(data)
                }
                return data
            }, actual
        },
        getscalefrom: function(t) {
            var e = this,
                a = {
                    W: 0,
                    H: 0,
                    T: 0,
                    L: 0,
                    B: 0,
                    R: 0,
                    calcMargin: !1,
                    calcDimension: !1,
                    node: null
                };
            return a = $.extend({}, a, t), this.width = function() {
                return $sys.config.w - 2 * a.w
            }, this.height = function() {
                return 0
            }, e
        },
        ticker: function(t) {
            function e() {
                var t = new Date,
                    e = t.getTime();
                return e
            }
            var a = {
                    element: "ul.ticker",
                    speed: 800,
                    delay: 5e3,
                    autorefresh: !0,
                    starttime: e(),
                    bypassed: !1,
                    fetchcount: 6,
                    expiredcount: 6
                },
                i = {
                    running: !0,
                    started: !1
                };
            return a = $.extend({}, a, t), a.bypass ? this : void jQuery(document).ready(function(t) {
                var e = function() {
                    setTimeout(function() {
                        i.running && t(a.element + " li:first").animate({
                            marginTop: "-50px"
                        }, a.speed, function() {
                            t(this).detach().appendTo("ul.ticker").removeAttr("style")
                        }), e()
                    }, a.delay)
                };
                e()
            })
        },
        tooltip: function() {
            jQuery(document).ready(function(t) {
                t(".foto-cnt .box-content li a").tipsy({
                    gravity: "s",
                    fade: !0
                }), t(".foto-cnt .box-content li a").tipsy({
                    gravity: "s",
                    fade: !0
                }), t("#tabbed-widget").each(function() {
                    t(this).find(".tabs-wrap").hide(), t(this).find("ul.tabs li:first").addClass("active").show(), t(this).find("ul.tabs li:first").addClass("active").show(), t(this).find(".tabs-wrap:first").show()
                }), t("ul.tabs li").click(function(e) {
                    t(this).parents("#tabbed-widget").find("ul.tabs li").removeClass("active"), t(this).addClass("active"), t(this).parents("#tabbed-widget").find(".tabs-wrap").hide();
                    var a = t(this).find("a").attr("href");
                    t(this).parents("#tabbed-widget").find(a).fadeIn(), e.preventDefault()
                }), t("ul.tabs li").click(function(e) {
                    t(this).parents("#tabbed-widget").find("ul.tabs li").removeClass("active"), t(this).addClass("active"), t(this).parents("#tabbed-widget").find(".tabs-wrap").hide();
                    var a = t(this).find("a").attr("href");
                    t(this).parents("#tabbed-widget").find(a).fadeIn(), e.preventDefault()
                }), t("ul.tabs li a").click(function(t) {
                    t.preventDefault()
                }), t("ul.tabs li a").click(function(t) {
                    t.preventDefault()
                })
            })
        },
        comment: function(t) {
            function e(t) {
                var e;
                e = '<ul class="recentComments">';
                for (var a = 0; a < i.numComments; a++) {
                    var n, s, r, o;
                    try {
                        if (a == t.feed.entry.length) break
                    } catch (l) {
                        break
                    }
                    e += "<li>";
                    for (var c = t.feed.entry[a], d = 0; d < c.link.length; d++) "alternate" == c.link[d].rel && (n = c.link[d].href);
                    for (var g = 0; g < c.author.length; g++) s = c.author[g].name.$t, r = c.author[g].gd$image.src;
                    r = -1 != r.indexOf("/s1600/") ? r.replace("/s1600/", "/s" + i.avatarSize + "-c/") : -1 != r.indexOf("/s220/") ? r.replace("/s220/", "/s" + i.avatarSize + "-c/") : -1 != r.indexOf("/s512-c/") && 0 != r.indexOf("http:") ? "http:" + r.replace("/s512-c/", "/s" + i.avatarSize + "-c/") : -1 != r.indexOf("blogblog.com/img/b16-rounded.gif") ? "http://3.bp.blogspot.com/-AaI8-1X32ZM/TxMKLVzQ5BI/AAAAAAAABYY/QYau8ov2blE/s" + i.avatarSize + "/Uj_blogger_logo.png" : -1 != r.indexOf("blogblog.com/img/openid16-rounded.gif") ? "http://3.bp.blogspot.com/-9lSeVyNRKx0/TxMKMIqMNuI/AAAAAAAABYc/8iasY0xpLzc/s" + i.avatarSize + "/Uj_openid_logo.png" : -1 != r.indexOf("blogblog.com/img/blank.gif") ? -1 != i.defaultAvatar.indexOf("gravatar.com") ? i.defaultAvatar + "&s=" + i.avatarSize : i.defaultAvatar : r, 1 == i.showAvatar && (o = 1 == i.roundAvatar ? "avatarRound" : "", e += '<div class="avatarImage ' + o + '"><img class="' + o + '" src="' + r + '" alt="' + s + '" width="' + i.avatarSize + '" height="' + i.avatarSize + '"/></div>'), e += '<a href="' + n + '">' + s + "</a>";
                    var u = c.content.$t,
                        m = u.replace(/(<([^>]+)>)/gi, "");
                    "" != m && m.length > i.characters ? (m = m.substring(0, i.characters), m += "&hellip;", 1 == i.showMorelink && (m += '<a href="' + n + '">' + i.moreLinktext + "</a>")) : m = m, e += "<span>" + m + "</span>", e += "</li>"
                }
                e += "</ul>";
                var f = "";
                1 == i.showComnts && (f = "display:none;"), $("#comment-list").append(e)
            }
            var a = this,
                i = {
                    numComments: 5,
                    avatarSize: 60,
                    characters: 40,
                    defaultAvatar: "http://img1.blogblog.com/img/anon36.png",
                    moreLinktext: " More &raquo;",
                    showAvatar: !0,
                    showMorelink: !1,
                    roundAvatar: !0,
                    showComnts: !0
                };
            return "undefined" != typeof t && (i = $.extend({}, i, t)), this.fetch = function() {
                $.get(dataFetcher.SiteUrl + "/feeds/comments/default?alt=json-in-script", e, "jsonp")
            }, a
        },
        createSummary: function(t, e, a, i, n) {
            var s, r = a,
                e = e,
                i = i,
                n = n,
                o = document.getElementById(t),
                l = o.innerHTML;
            if (dataFetcher.hasMoreID(l)) o.innerHTML = dataFetcher.splitTextContent(l), o.style.display = "block";
            else {
                var c = "",
                    d = o.getElementsByTagName("img");
                d.length <= 1 ? (s = dataFetcher.getImageUrl(l), "" == s && (s = "http://3.bp.blogspot.com/-JeIJSL3H3dY/Uf1P4Nt7oGI/AAAAAAAAAVQ/ZqSPbWifCuM/s1600/no+image.jpg")) : s = d[0].src, c = '<div class="post-thumbnail" style="height:300px;overflow:hidden;"><a href="' + r + '"><div class="shadow"><span class="icon-link"></span></div><div style="position:relative;top:-50px"><img class="thumbnail" src="' + s + '" style="width:660px;height:auto;"></div></a></div>';
                var g = c + '<div class="article-container"><div class="article-content"><div class="article-category" ><span class=\'updated\'>' + i + "</span> / " + n + '</div><div class="clear"></div><h2 class="article-title" itemprop=\'entry-title\'><a href="' + r + '">' + e + "</a></h2><p>" + stripHtmlTags(l, summary) + "... </p></div></div></div>";
                o.innerHTML = g, o.style.display = "block"
            }
            return $sys
        },
        makedivs: function(t) {
            var e = {
                place: "slider",
                width: 600,
                height: 300
            };
            e = $.extend({}, e, t);
            var a = Math.floor(e.height / 2) - 20,
                i = "<div id='" + e.place.substring(1) + "_container' style='position: relative; width:" + e.width + "px;height:" + e.height + "px; overflow: hidden;'>\n";
            return i += "<div style='position: absolute; top: 0px; left: 0px;' u='loading'>\n", i += "<div style='filter: alpha(opacity=70); opacity:0.7; position: absolute; display: block;background-color: #000; top: 0px; left: 0px;width: 100%;height:100%;'>\n", i += "</div>\n", i += "<div style='position: absolute; display: block; background: url(http://3.bp.blogspot.com/-572ZjF0a3nQ/VIpU9P4VVNI/AAAAAAAAElk/GVwBR9W0btY/s1600/loading.gif) no-repeat center center;top: 0px; left: 0px;width: 100%;height:100%;'>\n", i += "</div>\n", i += "</div>\n", i += "<div id='" + e.place.substring(1) + "_slide' style='cursor: move; position: absolute; left: 0px; top: 0px; width:" + e.width + "px;height:" + e.height + "px;overflow: hidden;' u='slides'></div>\n", i += "<div class='jssorb01' style='position: absolute; bottom: 7px; right: 500px; width: 12px; height: 12px;' u='navigator'>\n", i += "<div style='POSITION: absolute; WIDTH: 12px; HEIGHT: 12px; left: 0px; top: 0px;' u='prototype'></div></div>\n", i += "<span class='jssora05l' style='width: 40px; height: 40px; top: " + a.toString() + "px; left: 8px;' u='arrowleft'></span>\n", i += "<span class='jssora05r' style='width: 40px; height: 40px; top: " + a.toString() + "px; right: 10px' u='arrowright'></span>\n", {
                div: $(e.place).html(i),
                place: "#" + e.place.substring(1) + "_container",
                slider: "#" + e.place.substring(1) + "_slide"
            }
        },
        fetch: function(t, e, a) {
            return $sys.___fetch(t, e, a), $sys
        },
        ___fetch: function(t, e, a) {
            try {
                var i = MasterElement.createNewAtribbute();
                i.fetch = t || "homepage1", i.configSchema = i.fetch, i.autoRefresh = a || {
                    livecount: 0
                }, i.options = $.extend({}, MasterElement.configSchema[i.configSchema], e), i.id = e.elResult || MasterElement.configSchema[i.configSchema].elResult, i.id = i.id.replace("#", ""), i.options.configSchema = i.configSchema, i.options.elResult = "#" + i.id, void 0 === MasterElement.configSchema[t] && (MasterElement.configSchema[t] = {}, logErr('Warning!!, configSchema "' + t + "\" doesn't exist!..")), rf = new autoRefresh(i.options), i.label = e.LabelName || i.options.LabelName, i.region = e.region || "all", t = i.configSchema, rf.attribute = i, rf.defaultConfig = $.extend({}, MasterElement.configSchema[i.configSchema], e), rf.fetParam.configSchema = i.configSchema, rf.fetParam.elResult = "#" + i.id, i.el = document.getElementById(i.id), i.ejQ = $(rf.fetParam.elResult), rf.element = i.ejQ, rf.timer.setConfig(i.autoRefresh), rf.execute(i)
            } catch (n) {
                _nfo("sys.fetch error:", n)
            }
            return $sys
        },
        labelinc: function() {
            var t = function(t) {
                var e = t || {},
                    a = e.url_blog || window.location.host,
                    i = e.id_labelcontent || "#ujLab";
                $.get("http://" + a + "/feeds/posts/summary?max-results=0&alt=json-in-script", function(t) {
                    var e = t.feed.category,
                        a = "";
                    if (void 0 !== e) {
                        a = "<span>+</span><ul class='S2item_Uj'>";
                        for (var n = 0; n < e.length; n++) a += '<li><a href="/search/label/' + encodeURIComponent(e[n].term) + '?&max-results=7">' + e[n].term + "</a></li>";
                        a += "</ul>", $(i).html(a)
                    } else $(i).html("<span>No Label!</span>")
                }, "jsonp"), $(".item-Uj .lines").click(function() {
                    return $("#ujLab").slideToggle("fast"), $(this).toggleClass("active"), $sys
                })
            };
            return t(jQuery), $sys
        },
        daters: function() {
            return $(".timestamp-link abbr.published").each(function() {
                var t = $(this).attr("title"),
                    e = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                if ("" != t) var a = t.substring(0, 10),
                    i = a.substring(0, 4),
                    n = a.substring(5, 7),
                    s = a.substring(8, 10),
                    r = e[parseInt(n, 10) - 1];
                var o = $(this).parents(".post"),
                    l = o.children(".dater");
                l.removeClass("hidex").addClass("show"), $("strong", l).html(s), $("small", l).html(i), $("span", l).html(r)
            }), $sys
        },
        datetime: function(t) {
            var e = {
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                dateElement: "updates",
                timeElement: "timer"
            };
            e = $.extend({}, e, t);
            var a = new Date,
                i = a.getDate(),
                n = a.getMonth(),
                s = a.getYear(),
                r = 1e3 > s ? s + 1900 : s; - 1 === e.dateElement.indexOf("#") && (e.dateElement = "#" + e.dateElement), -1 === e.timeElement.indexOf("#") && (e.timeElement = "#" + e.timeElement), $(e.dateElement).html(e.months[n] + " " + i + ", " + r);
            var o = function(t) {
                    return 10 > t && (t = "0" + t), t
                },
                l = function() {
                    var t = "",
                        a = new Date,
                        i = a.getHours(),
                        n = a.getMinutes(),
                        s = a.getSeconds();
                    t = 12 > i ? "AM" : "PM", 0 == i && (i = 12), i > 12 && (i -= 12), i = o(i), n = o(n), s = o(s), $(e.timeElement).html(i + ":" + n + ":" + s + " " + t)
                };
            setInterval(l, 500)
        }
    },
    isotopeOptions = {
        filter: {},
        category: "",
        nameSelector: "",
        num: 999
    };
MasterElement.configSchema.listproduk = {
    DuplicateList: !0,
    url: "https://kue-kampung-elite.blogspot.co.id/",
    sortByLabel: !1,
    postPerPage: 10,
    callBack: function(t, e, a, i, n, s) {
        var r, o = t.setting.passingObject,
            l = {
                size: t.setting.imageSize,
                "class": "sys-boxImage"
            },
            c = "",
            d = "";
        isotopeOptions.category = "all", isTradisional = !1;
        for (prop in e.category)
            if (r = e.category[prop].term.replace(" ", "-"), r != t.setting.LabelName && -1 === r.indexOf("Feat") && -1 === r.indexOf("Kue") && -1 === r.indexOf("Galer") && -1 === r.indexOf("Non-Tradis")) {
                if (r = r.replace(" ", "-"), -1 !== r.toLowerCase().indexOf("tradisi")) {
                    isTradisional = !0;
                    continue
                }
                d = "." + r, c += r + " ", isotopeOptions.filter[r] = d, -1 !== r.toLowerCase().indexOf("singkong") && (isotopeOptions.category = "Singkong"), -1 !== r.toLowerCase().indexOf("taart") && (isotopeOptions.category = "Taart"), -1 !== r.toLowerCase().indexOf("roti") && (isotopeOptions.category = "Roti"), -1 !== r.toLowerCase().indexOf("bolu") && (isotopeOptions.category = "Bolu"), -1 !== r.toLowerCase().indexOf("kering") && (isotopeOptions.category = "Kering"), -1 !== r.toLowerCase().indexOf("basah") && (isotopeOptions.category = "Basah")
            }
        c = (l.class + " " + c).trim() + " " + (isTradisional ? "" : "Non-") + "Tradisional", isotopeOptions.filter.Tradisional = ".Tradisional", isotopeOptions.filter["Non-Tradisional"] = ".Non-Tradisional";
        var g = a.toLowerCase().split("kue");
        void 0 !== g[1] ? (g[1] = g[1].trim(), g[1] = g[1].substring(0, 1).toUpperCase() + g[1].substring(1), g[0] = "Kue ") : (g[1] = g[0], g[0] = ""), isotopeOptions.nameSelector = g[0] + '<span class="name">' + g[1] + "</span>", isotopeOptions.category = 'data-category="' + isotopeOptions.category + '"';
        var u = dataFetcher.getImageListfrom(e.content.$t, {
            imageSize: l.size,
            tagStyle: !1
        });
        if (void 0 == u[0] && "" == i) return logErr("page " + a + " doesn't have any image"), "";
        u[0] = u[0].replace(/s\B\d{2,4}/, "s80"), s = s.substring(0, 100).trim(), s = "" == s ? "" : 'alt="' + s + '"';
        var m = '<div class="' + c + '" style="width:' + l.size + 'px;" ' + isotopeOptions.category + ">";
        return m += '<div class="' + l.class + '_div1" >', m += '<div id="effect" class="' + l.class + '_div2" >', m += '<div style="overflow:hidden;text-align:center;">', m += '<a href="' + n + '" imageanchor="1" ><img width="' + l.size + 'px" style="width:' + l.size + "px;max-width:" + l.size + 'px;" src="' + u[0] + '"title="' + a + '" ' + s + " /></a></div>", m += '<div><a href="' + n + '" imageanchor="1" >' + isotopeOptions.nameSelector + "</a></div></div></div></div>", o.textContent += m, ""
    },
    firstfunc: function(t) {
        t.setting.passingObject
    },
    lastfunc: function(t) {
        var e = t.setting.passingObject,
            a = {
                duration: 1750,
                easing: "linear",
                queue: !1
            };
        if (e.element.isotope("destroy"), e.element.html(e.textContent), !dataFetcher.isMobile) {
            btnList = '<a href="#" data-filter="*" class="current">All Categories</a>\n';
            for (prop in isotopeOptions.filter) btnList += '<a href="#" data-filter="' + isotopeOptions.filter[prop].trim() + '" >' + prop + "</a>\n";
            btnList += '<a href="#" sort-data="byAZ">Sort A-Z</a>\n', btnList += '<a href="#" sort-data="byZA">Sort Z-A</a>\n', btnList += '<a href="#" sort-data="ByCategory">Sort Category</a>\n', $(".iso-button").html(btnList), $(".iso-button a").click(function() {
                $(".iso-button .current").removeClass("current"), $(this).addClass("current");
                var t = $(this).attr("data-filter"),
                    i = $(this).attr("sort-data");
                return e.element.isotope({
                    getSortData: {
                        az: function(t) {
                            return cleanProductName($(t).find(".name").text())
                        },
                        za: function(t) {
                            return cleanProductName($(t).find(".name").text())
                        },
                        category: "[data-category]"
                    }
                }), e.element.isotope("byAZ" == i ? {
                    animationOptions: a,
                    sortBy: "az",
                    sortAscending: !0
                } : "byZA" == i ? {
                    animationOptions: a,
                    sortBy: "az",
                    sortAscending: !1
                } : "ByCategory" == i ? {
                    animationOptions: a,
                    sortBy: "category"
                } : {
                    filter: t,
                    animationOptions: a
                }), !1
            })
        }
        setTimeout(function() {
            e.element.isotope({
                filter: "*",
                animationOptions: a
            })
        }, 4e3)
    }
}, MasterElement.configSchema.newsticker = {
    postPerPage: 5,
    drawFooter: !1,
    sortByLabel: !1,
    LabelName: !1,
    appChild: !0,
    Speed: .075,
    direction: "ltr",
    titleText: "Terbaru",
    displayType: "reveal",
    loadingClass: "loading",
    animated: !0,
    callBack: function(t, e, a, i, n) {
        var s = t.setting.passingObject,
            r = e.published.$t.substring(11, 16),
            o = r.substring(0, 2),
            l = r.substring(2, 5),
            c = 12 > o ? "AM" : "PM";
        return r = o + l + " " + c, s.textContent += '<li><h3><a href="' + n + '">' + r + " - " + a + "</a></h3></li>", ""
    },
    firstfunc: function(t) {
        t.setting.passingObject
    },
    lastfunc: function(t) {
        var e = t.setting.passingObject;
        e.element.html('<h1 class="ticker-header">' + MasterElement.configSchema.newsticker.titleText + '</h1><ul class="ticker">' + e.textContent + "</ul>").removeClass("loading"), $sys.ticker()
    }
}, MasterElement.divs = {}, MasterElement.configSchema.customslider = {
    url: "https://kue-kampung-elite.blogspot.co.id//",
    postPerPage: 10,
    drawFooter: !1,
    sortByLabel: !0,
    LabelName: "Foto Kegiatan",
    appChild: !0,
    ImageWidth: 150,
    ImageHeight: 125,
    displayPieces: 1,
    showLinkHeader: !0,
    callBack: function(t, e, a, i, n) {
        var s = t.setting.passingObject,
            r = dataFetcher.getImageListfrom(e.content.$t, jQuery.extend({}, {
                tagStyle: !1
            }, {
                imageSize: 300
            }));
        return jQuery.each(r, function(e, a) {
            s.textContent += '<div><a href="' + n + '" ><img u="image" src="' + a + '" style="width:' + t.setting.ImageWidth + "px;height:" + t.setting.ImageHeight + 'px;"/></a></div>'
        }), ""
    },
    firstfunc: function(t) {
        t.setting.passingObject
    },
    lastfunc: function(t) {
        var e = t.setting.passingObject,
            a = (MasterElement.configSchema.customslider, e.element.attr("id").replace("#", "").replace("-", ""));
        MasterElement.divs[a] = {}, count = 0, MasterElement.divs[a].vul = $sys.makedivs({
            place: "#" + e.element.attr("id"),
            width: t.setting.ImageWidth * t.setting.displayPieces,
            height: t.setting.ImageHeight
        });
        var i = MasterElement.divs[a].vul;
        try {
            var n = dataFetcher.jsoption()
        } catch (s) {
            _nfo("jsoption " + s)
        }
        $(i.slider).html(e.textContent), void 0 !== n && (n.options().$AutoPlayInterval = 6e3, n.options().$DisplayPieces = t.setting.displayPieces, n.options().$SlideWidth = t.setting.ImageWidth, n.create(i.place.substring(1), [{
            $Duration: 1200,
            x: -.3,
            $During: {
                $Left: [.3, .7]
            },
            $Easing: {
                $Right: $JssorEasing$.$EaseInCubic,
                $Opacity: $JssorEasing$.$EaseLinear
            },
            $Opacity: 2
        }, {
            $Duration: 1200,
            x: .3,
            $SlideOut: !0,
            $Easing: {
                $Left: $JssorEasing$.$EaseInCubic,
                $Opacity: $JssorEasing$.$EaseLinear
            },
            $Opacity: 2
        }]), t.setting.showLinkHeader && e.element.append('<h5><a class="more2post" href="/search/label/' + encodeURIComponent(t.setting.LabelName) + '?&max-results=7">' + t.setting.LabelName + "</a></h5>"), MasterElement.divs[a] = {})
    }
}, MasterElement.configSchema.featured = {
    postPerPage: 10,
    drawFooter: !1,
    sortByLabel: !0,
    LabelName: "Featured",
    appChild: !1,
    callBack: function(t, e, a, i, n) {
        var s, r = t.setting.passingObject,
            o = dataFetcher.getImageListfrom(e.content.$t, {
                NextImageSize: 600
            }),
            l = "";
        return $.each(o, function(t, e) {
            s = "", o.length > 1 && (s = "&nbsp;(Slide " + (t + 1) + ")"), l += '<div><a u=image href="' + n + '"><img src="' + e + '" style="width: 660px; " /></a>', l += ' <div u=caption t="*" class="captionBlack"  style="position:absolute; left:0px;top:0px; width:660px; height:30px;">' + cTrim(a) + s + "</div>", l += "</div>"
        }), r.textContent = l
    },
    firstfunc: function(t) {
        var e = t.setting.passingObject,
            a = e.element.attr("id").replace("#", "").replace("-", "");
        void 0 === MasterElement.divs[a] && (MasterElement.divs[a] = {}, MasterElement.divs[a]._opt = dataFetcher.jsoption(), MasterElement.divs[a]._opt.options().$AutoPlayInterval = 11e3, MasterElement.divs[a]._CaptionTransitions = []), t.setting.appChild = !1
    },
    lastfunc: function(t) {
        var e = t.setting.passingObject,
            a = e.element.attr("id").replace("#", "").replace("-", ""),
            i = MasterElement.divs[a];
        i._opt.create("fp_container", [{
            $Duration: 1500,
            x: -.3,
            y: .5,
            $Zoom: 1,
            $Rotate: .1,
            $During: {
                $Left: [.6, .4],
                $Top: [.6, .4],
                $Rotate: [.6, .4],
                $Zoom: [.6, .4]
            },
            $Easing: {
                $Left: $JssorEasing$.$EaseInQuad,
                $Top: $JssorEasing$.$EaseInQuad,
                $Opacity: $JssorEasing$.$EaseLinear,
                $Rotate: $JssorEasing$.$EaseInQuad
            },
            $Opacity: 2,
            $Brother: {
                $Duration: 1e3,
                $Zoom: 11,
                $Rotate: -.5,
                $Easing: {
                    $Opacity: $JssorEasing$.$EaseLinear,
                    $Rotate: $JssorEasing$.$EaseInQuad
                },
                $Opacity: 2,
                $Shift: 200
            }
        }, {
            $Duration: 1500,
            x: .3,
            $During: {
                $Left: [.6, .4]
            },
            $Easing: {
                $Left: $JssorEasing$.$EaseInQuad,
                $Opacity: $JssorEasing$.$EaseLinear
            },
            $Opacity: 2,
            $Outside: !0,
            $Brother: {
                $Duration: 1e3,
                x: -.3,
                $Easing: {
                    $Left: $JssorEasing$.$EaseInQuad,
                    $Opacity: $JssorEasing$.$EaseLinear
                },
                $Opacity: 2
            }
        }, {
            $Duration: 1200,
            y: -1,
            $Cols: 8,
            $Rows: 4,
            $Clip: 15,
            $During: {
                $Top: [.5, .5],
                $Clip: [0, .5]
            },
            $Formation: $JssorSlideshowFormations$.$FormationStraight,
            $ChessMode: {
                $Column: 12
            },
            $ScaleClip: .5
        }, {
            $Duration: 1200,
            y: -1,
            $Cols: 8,
            $Rows: 4,
            $Clip: 15,
            $During: {
                $Top: [.5, .5],
                $Clip: [0, .5]
            },
            $SlideOut: !0,
            $Formation: $JssorSlideshowFormations$.$FormationStraight,
            $ChessMode: {
                $Column: 12
            },
            $ScaleClip: .5
        }, {
            $Duration: 1400,
            x: .25,
            $Zoom: 1.5,
            $Easing: {
                $Left: $JssorEasing$.$EaseInWave,
                $Zoom: $JssorEasing$.$EaseInSine
            },
            $Opacity: 2,
            $ZIndex: -10,
            $Brother: {
                $Duration: 1400,
                x: -.25,
                $Zoom: 1.5,
                $Easing: {
                    $Left: $JssorEasing$.$EaseInWave,
                    $Zoom: $JssorEasing$.$EaseInSine
                },
                $Opacity: 2,
                $ZIndex: -10
            }
        }], i._CaptionTransitions)
    }
}, MasterElement.configSchema.homepage1 = {
    postPerPage: 16,
    drawFooter: !1,
    sortByLabel: !0,
    LabelName: "Featured",
    NextImageSize: 300,
    ImageWidth: !1,
    ImageHeight: !1,
    commentsLabel: "Komentar",
    loadingClass: "loading",
    animated: !1,
    style: !1,
    independent: !1,
    noimage: !1,
    callBack: function(t, e, a, i, n, s, r, o, l, c) {
        var d, g = t.setting.passingObject,
            u = t.setting,
            m = g.element.attr("id").replace("#", "").replace("-", ""),
            f = dataFetcher.getImageListfrom(e.content.$t, {
                FirstImageSize: u.FirstImageSize,
                NextImageSize: u.NextImageSize
            }, MasterElement.divs[m].count),
            p = "";
        return !u.animated && f.length > 1 && (f = [f[0]]), u.animated || 0 != f.length || (f = [""]), $.each(f, function(t) {
            if (p = "", MasterElement.divs[m].count += 1, MasterElement.divs[m].count > u.postPerPage) return "";
            f.length > 1 && u.animated && (p = "&nbsp;(Slide " + (t + 1) + ")"), i_style = "";
            var e = "",
                i = "";
            u.ImageWidth !== !1 ? e = "width:" + (-1 == u.ImageWidth ? "auto;" : u.ImageWidth.toString() + "px;") : !1, u.ImageHeight !== !1 ? i = "height:" + (-1 == u.ImageHeight ? "auto;" : u.ImageHeight.toString() + "px;") : !1, ("" !== e || "" != i) && (i_style = 'style="' + e + i + '"'), f[t] = 1 == f.length && "" == f[0] ? "" : f.length > 0 ? '<img class="grayscale" src="' + f[t] + '" ' + i_style + " />" : "", "" == f[t] && (i_style = "height:0px;"), d = '<div class="post-thumbnail" ' + i_style + '><a title="' + a + '" href="' + n + '"><div class="shadow" ><span class="icon-link"></span></div>' + f[t] + '<span class="uj-vid"></span></a></div>';
            var l = '<h4><a class="more-link" href="' + n + '"><i class="icon-share-alt"></i> Continue reading </a></h4>';
            0 == u.numchars && 1 == MasterElement.divs[m].count && (s = "", cb = ""), 0 == u.nextnumchars && MasterElement.divs[m].count > 1 && (s = "", cb = ""), u.noimage && (d = ""), g.textContent += 0 == u.numchars && 0 == u.nextnumchars ? '<li><div class="inner-content" ><a title="' + a + '" href="' + n + '">' + f[t] + "</a></div></li>" : '<li><div class="inner-content" >' + d + '<div class="postitle"><h3><a href="' + n + '">' + a + p + '</a></h3></div><div class="post-meta"><span> ' + c + '</span> <span class="dd">' + r.substring(0, 11) + '</span> - <span class="comt">' + o + " Comment </span></div>" + s + " " + l + "</div></li>"
        }), ""
    },
    firstfunc: function(t) {
        var e = t.setting.passingObject,
            a = t.setting,
            i = e.element.attr("id").replace("#", "").replace("-", "");
        void 0 === MasterElement.divs[i] && (MasterElement.divs[i] = {}, MasterElement.divs[i].count = 0), e.element.addClass(a.loadingClass)
    },
    lastfunc: function(t) {
        var e = t.setting.passingObject,
            a = t.setting,
            i = e.element.attr("id").replace("#", "").replace("-", "");
        if (e.element.html('<div class="box-content"><ul></ul></div>'), $("ul", e.element).append(e.textContent), e.element.removeClass(a.loadingClass), a.animated && 0 != a.ImageWidth) {
            $("ul", e.element).addClass("scroll-item");
            try {
                $(".box-content", e.element).CarouselScroller({
                    auto: 0,
                    scroll: 1,
                    speed: 240,
                    visible: MasterElement.divs[i].count,
                    start: 0,
                    easing: null,
                    bPrev: ".back",
                    bNext: ".forward",
                    circular: !0,
                    pauseOnHover: !0
                })
            } catch (n) {
                logErr(n)
            }
        }
        a.independent || 0 == a.LabelName || e.element.append('<h5><a class="more2post" href="/search/label/' + encodeURIComponent(a.LabelName) + '?&max-results=7">' + a.LabelName + "</a></h5>")
    }
}, MasterElement.configSchema.slidergalery = {
    postPerPage: 16,
    drawFooter: !1,
    sortByLabel: !0,
    LabelName: "Featured",
    appChild: !0,
    commentsLabel: "Komentar",
    loadingClass: "loading",
    animated: !0,
    callBack: function(t, e, a, i, n) {
        var s = t.setting.passingObject,
            r = s.element.attr("id").replace("#", "").replace("-", ""),
            o = dataFetcher.getImageListfrom(e.content.$t, {
                NextImageSize: t.setting.NextImageSize
            }),
            l = "";
        return $.each(o, function(e, a) {
            return l = "", MasterElement.divs[r].count += 1, MasterElement.divs[r] > t.setting.postPerPage ? "" : (o.length > 1 && (l = "&nbsp;(Slide " + (e + 1) + ")"), ca = '<img class="image float_right" src="' + a + '" alt="' + l + '"/><div class="rhino-caption"><h3><a class="title" href="' + n + '"> ' + l + "</a></h3></div>", void(s.textContent += "<li>" + ca + "</li>"))
        }), ""
    },
    firstfunc: function(t) {
        var e = t.setting.passingObject,
            a = e.element.attr("id").replace("#", "").replace("-", "");
        void 0 === MasterElement.divs[a] && (MasterElement.divs[a] = {}, MasterElement.divs[a].count = 0), e.element.addClass(t.setting.loadingClass)
    },
    lastfunc: function(t) {
        var e = t.setting.passingObject;
        e.element.html('<ul style="height:' + t.setting.ImageHeight + 'px;" id="two_slider' + t.setting.LabelName + '" class="margin_bottom">' + e.textContent + "</ul>").removeClass("loading");
        try {
            $("#two_slider" + t.setting.LabelName).rhinoslider({
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
        } catch (a) {
            logErr(a)
        }
    }
}, MasterElement.configSchema.imageCycler = {
    postPerPage: 10,
    drawFooter: !1,
    sortByLabel: !0,
    callBack: function(t, e) {
        var a = t.setting.passingObject,
            i = a.element.attr("id").replace("#", "").replace("-", ""),
            n = dataFetcher.getImageListfrom(e.content.$t, jQuery.extend({}, {
                tagStyle: !1
            }, MasterElement.divs[i].OptImage));
        return jQuery.each(n, function(t, e) {
            MasterElement.divs[i].imgList.push(e), a.textContent += e
        }), ""
    },
    firstfunc: function(t) {
        var e = t.setting.passingObject,
            a = e.element.attr("id").replace("#", "").replace("-", "");
        void 0 === MasterElement.divs[a] && (MasterElement.divs[a] = {}, MasterElement.divs[a].OptImage = {}, MasterElement.divs[a].imgList = [], MasterElement.divs[a].OptImage.fade = void 0 !== t.setting.fade ? t.setting.fade : 500, MasterElement.divs[a].OptImage.interval = void 0 !== t.setting.interval ? t.setting.interval : 7e3)
    },
    lastfunc: function(t) {
        var e = t.setting.passingObject,
            a = e.element.attr("id").replace("#", ""),
            i = a.replace("-", ""),
            n = "",
            s = MasterElement.divs[i].imgList;
        s.forEach(function(t, e) {
            n += '<img src="' + t + '" ' + (e == s.length - 1 ? 'class="active"' : "") + ' style="' + (e == s.length - 1 ? "z-index:" + cTrim(s.length.toString()) : "z-index:1") + ';"/>'
        }), e.element.html(n), dataFetcher.imageCycler("#" + a, jQuery.extend({}, {
            imgCount: s.length
        }, MasterElement.divs[i].OptImage))
    }
}, MasterElement.configSchema.textmessage = {
    postPerPage: 10,
    drawFooter: !1,
    sortByLabel: !0,
    appChild: !0,
    title: "",
    callBack: function(t, e, a, i, n, s) {
        var r = t.setting.passingObject;
        return a == t.setting.title && (r.textContent += s), ""
    },
    firstfunc: function(t) {
        t.setting.passingObject
    },
    lastfunc: function(t) {
        var e = t.setting.passingObject;
        e.element.html(e.textContent)
    }
}, MasterElement.configSchema.pagepost = {
    url: "http://hobby-ku.blogspot.com/",
    sortByLabel: !1,
    postPerPage: 10,
    callBack: function(t, e, a, i, n, s, r, o, l) {
        var c = t.setting.passingObject,
            d = dataFetcher.getImageListfrom(e.content.$t, {
                imageSize: 80,
                tagStyle: !1
            });
        void 0 == d[0] && "" == i && console.info("page " + a + " doesn't have any image");
        var g = '<div class="itemposts"><h6><a title="' + a + '" href="' + n + '">' + a + "</a></h6>";
        return g += '<div class="iteminside"><a title="' + a + '" href="' + n + '"><img alt="' + a + '" src="' + d[0] + '" style="width:80px"/></a>', g += s + "</div>", g += '<div style="clear:both;"></div><div class="itemfoot">' + r + o + '<a class="itemrmore" href="' + n + '">' + l + "</a></div>", g += "</div>", c.textContent += g, ""
    },
    firstfunc: function(t) {
        t.setting.passingObject
    },
    lastfunc: function(t) {
        var e = t.setting.passingObject;
        e.element.html(e.textContent)
    }
}, $sys.init();
