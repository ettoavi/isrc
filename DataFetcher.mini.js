function _dbg(t) {
    $debugger.track(t)
}

function logErr(t) {
    $debugger.useConsole && "undefined" != typeof console ? console.error(t) : ($debugger.track(t), $debugger.revealIt())
}

function _nfo() {
    for (var t = "", e = 0; e < arguments.length; e++) switch (typeof arguments[e]) {
        case "object":
            t += Inspect(arguments[e]) + " ";
            break;
        default:
            t += arguments[e] + " "
    }
    $debugger.track(t.trim()), $debugger.revealIt()
}

function logInfo(t) {
    $debugger.useConsole && "undefined" != typeof console ? console.info(t) : ($debugger.track(t), $debugger.revealIt())
}

function Inspect(t, e, i) {
    if ("object" != typeof t) return "Invalid object";
    if (void 0 === e && (e = ""), void 0 === i && (i = 1), i > 50) return "";
    var n = [];
    for (var s in t) {
        var a = typeof t[s],
            r = s;
        r += "=", r += "function" == a ? "function" : "object" == a ? i > 0 ? "{}" : '<span style="color:00008B">{</span>' + Inspect(t[s], "", i + 1) + '<span style="color:00008B">}</span>' : t[s], n.push(r)
    }
    return "{" + n.join("," + e) + "}"
}

function getUrlLogation() {
    var t = window.location.protocol + "//" + window.location.host;
    return dataFetcher.SiteUrl = t
}

function TrimAndUpCase(t) {
    return t.replace(/^\s+|\s+$/gm, "").toUpperCase()
}

function cTrim(t) {
    return t.replace(/^\s+|\s+$/gm, "")
}

function callScript(t) {
    try {
        thisPub.incluirscript(t)
    } catch (e) {
        logErr("callScript Error: " + e)
    }
}

function stripHtml(t) {
    var e = document.createElement("DIV");
    return e.innerHTML = t, e.textContent || e.innerText || ""
}

function stripHtmlTags(t, e) {
    return t.replace(/<.*?>/gi, "").split(/\s+/).slice(0, e - 1).join(" ")
}

function htmlFormater(t, e, i, n, s, a, r, o, l) {
    var c = '<div class="itemposts">';
    return c += '<h6><a title="' + i + '" href="' + s + '">' + i + "</a></h6>", c += '<div class="iteminside">' + n + a + "</div>", c += '<div style="clear:both;"></div><div class="itemfoot">' + r + o + '<a class="itemrmore" href="' + s + '">' + l + "</a></div>", c += "</div>"
}

function extend(t, e) {
    t = t || {};
    for (var i in e) t[i] = "object" == typeof e[i] ? extend(t[i], e[i]) : e[i];
    return t
}

function extendIfPropExist(t, e) {
    for (var i in t) "undefined" != typeof e[i] && (t[i] = e[i]);
    return t
}

function jQbridge(t, e) {
    $.fn[t] = function(i) {
        if ("string" == typeof i) {
            for (var n = slice.call(arguments, 1), s = 0, a = this.length; a > s; s++) {
                var r = this[s],
                    o = $.data(r, t);
                if (o)
                    if ($.isFunction(o[i]) && "_" !== i.charAt(0)) {
                        var l = o[i].apply(o, n);
                        if (void 0 !== l) return l
                    } else logErr("no such method '" + i + "' for " + t + " instance");
                else logErr("cannot call methods on " + t + " prior to initialization; attempted to call '" + i + "'")
            }
            return this
        }
        return this.each(function() {
            var n = $.data(this, t);
            n ? (n.option(i), n._init()) : (n = new e(this, i), $.data(this, t, n))
        })
    }
}
var $debugger = {
        _enabled: !1,
        waitExpire: 50,
        infolist: [],
        wait: !0,
        popup: !1,
        count: 0,
        DisplayAlert: !0,
        placeInfo: !1,
        useConsole: !1,
        suspended: !1,
        on: function() {
            $debugger._enabled = !0
        },
        off: function() {
            $debugger._enabled = !1
        },
        track: function(t) {
            $debugger._enabled && $debugger.infolist.push(t)
        },
        checkPlaceHolder: function() {
            if ($debugger.placeInfo !== !1) return !0;
            if (!document.getElementById("debugElement")) {
                var t = document.createElement("div");
                t.setAttribute("id", "debugElement"), t.setAttribute("style", "clear:both;border:4px solid #ccc;padding:4px;font-size:12px;font-family: Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,serif;");
                try {
                    return $debugger.suspended = !1, document.getElementsByTagName("body")[0].appendChild(t), $debugger.placeInfo = $("#debugElement"), $debugger.placeInfo.html("Debugger Waiting.."), !0
                } catch (e) {
                    return $debugger.suspended = !0, $debugger.placeInfo = !1, !1
                }
            }
            return $debugger.placeInfo = $("#debugElement"), !0
        },
        revealIt: function() {
            if ($debugger._enabled && !$debugger.suspended && $debugger.checkPlaceHolder()) {
                var t = "";
                $.each($debugger.infolist, function(e, i) {
                    t += '<span style="color:red">' + e.toString() + "</span> " + i + "<br/>\n"
                }), $debugger.placeInfo.html("<span>" + t + "</span>")
            }
        },
        reveal: function() {
            var t = "";
            $debugger._enabled && 0 !== $debugger.infolist.length && ($debugger.checkPlaceHolder(), $debugger.revealIt(), $debugger.popup && $debugger.show(t))
        },
        show: function(t, e, i) {
            return $debugger._enabled ? (e = "undefined" == typeof e ? "" : e + "\n\n", e = "undefined" == typeof i ? e : "Line:" + i + " " + e, $debugger.DisplayAlert ? alert(e + t) : $debugger.track(e + t)) : void 0
        }
    },
    dataFetcher = {
        StartPostData: 0,
        MaxFetchPage: 20,
        MainTitle: "",
        SiteUrl: "https://surga-kue.blogspot.co.id/",
        postList: [],
        DuplicateList: !1,
        xmlData: "",
        count: 0,
        isMobile: !1,
        _jslider: function() {
            var t = this;
            return this.Transitions = [{
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
            }], this.CaptionTransitions = [], this.Caption = {
                $Class: $JssorCaptionSlider$,
                $CaptionTransitions: t.CaptionTransitions,
                $PlayInMode: 1,
                $PlayOutMode: 3
            }, this._options = {
                elWidth: 0,
                $AutoPlay: !0,
                $AutoPlaySteps: 1,
                $AutoPlayInterval: 3e3,
                $PauseOnHover: 1,
                $ArrowKeyNavigation: !0,
                $SlideDuration: 1500,
                $MinDragOffsetToSlide: 20,
                $SlideSpacing: 0,
                $DisplayPieces: 1,
                $ParkingPosition: 0,
                $UISearchMode: 1,
                $PlayOrientation: 1,
                $DragOrientation: 3,
                $SlideshowOptions: {
                    $Class: $JssorSlideshowRunner$,
                    $Transitions: t.Transitions,
                    $TransitionsOrder: 1,
                    $ShowLink: !0
                },
                $CaptionSliderOptions: {},
                $BulletNavigatorOptions: {
                    $Class: $JssorBulletNavigator$,
                    $ChanceToShow: 2,
                    $AutoCenter: 1,
                    $Steps: 1,
                    $Lanes: 1,
                    $SpacingX: 10,
                    $SpacingY: 10,
                    $Orientation: 1
                },
                $ArrowNavigatorOptions: {
                    $Class: $JssorArrowNavigator$,
                    $ChanceToShow: 2,
                    $Steps: 1
                }
            }, this.options = function(e, i) {
                return "object" == typeof e && (t.Transitions = e), "object" == typeof i && (t.CaptionTransitions = i), t._options.$SlideshowOptions.$Transitions = t.Transitions, t.CaptionTransitions.length > 0 ? (t.Caption.$CaptionTransitions = t.CaptionTransitions, t._options.$CaptionSliderOptions = t.Caption) : (t.Caption.$CaptionTransitions = [], t._options.$CaptionSliderOptions = {}), t._options
            }, this.create = function(e, i, n) {
                var s = this,
                    a = new $JssorSlider$(e, t.options(i, n));
                return t.options().elWidth > 0 && (s.ScaleSlider = function() {
                    var e = a.$Elmt.parentNode.clientWidth;
                    e ? a.$ScaleWidth(Math.min(e, t.options().elWidth)) : window.setTimeout(ScaleSlider, 30)
                }, s.ScaleSlider(), $(window).bind("load", s.ScaleSlider), $(window).bind("resize", s.ScaleSlider), $(window).bind("orientationchange", s.ScaleSlider)), a
            }, t
        },
        jsoption: function() {
            return new dataFetcher._jslider
        },
        addList: function(t) {
            return t = TrimAndUpCase(t), dataFetcher.listExist(t) ? !1 : (dataFetcher.postList[dataFetcher.postList.length] = t, !0)
        },
        listExist: function(t) {
            t = TrimAndUpCase(t);
            for (var e = 0; e < dataFetcher.postList.length; e++)
                if (t == dataFetcher.postList[e]) return !0;
            return !1
        },
        getShortMonth: function(t, e) {
            var i, n, s, a, r = [];
            return t ? (r[1] = "Jan", r[2] = "Feb", r[3] = "Mar", r[4] = "Apr", r[5] = "Mei", r[6] = "Jun", r[7] = "Jul", r[8] = "Agt", r[9] = "Sep", r[10] = "Okt", r[11] = "Nov", r[12] = "Des") : (r[1] = "Jan", r[2] = "Feb", r[3] = "Mar", r[4] = "Apr", r[5] = "May", r[6] = "Jun", r[7] = "Jul", r[8] = "Aug", r[9] = "Sep", r[10] = "Oct", r[11] = "Nov", r[12] = "Dec"), i = e.published.$t, n = i.substring(0, 4), s = i.substring(5, 7), a = i.substring(8, 10), a + " " + r[parseInt(s, 10)] + " " + n
        },
        get: function(t, e) {
            new dataFetcher.create(t, e).get()
        },
        hasMoreID: function(t) {
            function e(e) {
                return i = -1 != t.indexOf(e) ? !0 : !1
            }
            var i = !1;
            return e("<!--more-->") || e("<more>") || e("<a name='more'>") || e("<!-- -more- -->"), i = !1
        },
        splitTextContent: function(t, e, i, n, s, a) {
            function r(e) {
                return isTextCutted = !1, -1 != (o = t.indexOf(e)) ? (t = t.split(e)[0], isTextCutted = !0, !0) : !1
            }
            var o, l, c = /<\S[^>]*>/g;
            return void 0 === a && (a = !1), isTextCutted = !1, a || r("<!--more-->") || r("<more>") || r("<a name='more'>") || r("<!-- -more- -->"), s && (t = t.replace(c, "")), isTextCutted || (l = (e ? i : n) - 3, t = t.length > l ? t.substring(0, l) + "..." : t), t
        },
        create: function(t, e) {
            var i = this;
            return this.plugin = {
                theObject: !1,
                beforeExecute: !1,
                onExecute: !1,
                aferExecute: !1
            }, this.setting = {
                debugMode: !1,
                _dbgr: !1,
                showPostDate: !0,
                showComments: !0,
                idMode: !0,
                loadingText: "Loading...",
                totalPostLabel: "Total Post :",
                jumpPageLabel: "Page",
                commentsLabel: "Comments",
                rmoreText: "Read more &#9658,",
                prevText: "Prev",
                nextText: "Next",
                minpage: 4,
                maxpage: 10,
                firstPage: 0,
                pagernum: 0,
                postsnum: 1,
                actualpage: 1,
                postPerPage: 10,
                drawFooter: !1,
                sortByLabel: !1,
                callBack: "htmlFormater",
                varName: !1,
                elResult: "result",
                StartPostData: 0,
                ExcludeLabel: [],
                IncludeLabel: [],
                LabelName: "",
                imgBlank: !0,
                FirstImageSize: 0,
                NextImageSize: 0,
                numchars: 160,
                nextnumchars: 160,
                cutTextByLength: !1,
                appChild: !1,
                firstfunc: !1,
                lastfunc: !1,
                stripHtml: !0,
                externalparam: {},
                passingObject: !1,
                srcImgBlank: "https://2.bp.blogspot.com/-uitX7ROPtTU/Tyv-G4NA_uI/AAAAAAAAFBY/NcWLPVnYEnU/s1600/no+image.jpg"
            }, this.setting = jQuery.extend({}, this.setting, t), this.plugin = jQuery.extend({}, this.plugin, e), "DuplicateList" in this.setting && (dataFetcher.DuplicateList = this.setting.DuplicateList), this.get = function(t, e, n, s) {
                var a = this;
                try {
                    "undefined" == typeof e && (e = {}), "undefined" == typeof e.url && (e.url = "string" == typeof this.setting.url ? this.setting.url : dataFetcher.SiteUrl), this.setting = $.extend({}, this.setting, e), "undefined" != typeof n && (this.setting.firstfunc = n), "undefined" != typeof s && (this.setting.lastfunc = s), "string" != typeof t && (t = "url" in e ? e.url : dataFetcher.SiteUrl);
                    var r = 1 * this.setting.postPerPage - (this.setting.postPerPage - 1);
                    if (r += i.setting.StartPostData, this.setting.sortByLabel) {
                        if (this.setting.LabelName === !1) return _nfo('error!!, sortByLabel is true but value of LabelName is "false" or "empty", process ', this.setting.elResult, " aborted!!"), a;
                        t = this.setting.getsumary ? t + "feeds/posts/summary/-/" + this.setting.LabelName + "?start-index=" + r : t + "feeds/posts/default/-/" + this.setting.LabelName + "?start-index=" + r
                    } else t = this.setting.getsumary ? t + "/feeds/posts/summary/?start-index=" + r : t + "/feeds/posts/default/?start-index=" + r;
                    var o = this.setting.postPerPage;
                    t += "&max-results=" + o, t += "&orderby=published&alt=json-in-script", this.setting.firstPage = 1, this.setting.actualpage = 1,
                        function(e) {
                            if (i.plugin.beforeExecute !== !1) try {
                                i.plugin.beforeExecute(i)
                            } catch (n) {
                                _nfo("beforeExecute error: " + n, " setting:", i.setting)
                            } else if (i.setting.firstfunc !== !1) {
                                var s = typeof i.setting.firstfunc;
                                switch (s) {
                                    case "function":
                                        if ("object" == typeof i.setting.externalparam) {
                                            var r = i.setting.externalparam,
                                                o = r.length;
                                            switch (void 0 === o && (o = 0), o) {
                                                case 0:
                                                    i.setting.firstfunc(i);
                                                    break;
                                                case 1:
                                                    i.setting.firstfunc(i, r[0]);
                                                    break;
                                                case 2:
                                                    i.setting.firstfunc(i, r[0], r[1]);
                                                    break;
                                                case 3:
                                                    i.setting.firstfunc(i, r[0], r[1], r[2]);
                                                    break;
                                                case 4:
                                                    i.setting.firstfunc(i, r[0], r[1], r[2], r[3])
                                            }
                                        } else i.setting.firstfunc(i);
                                        break;
                                    case "string":
                                        logErr(i.setting.firstfunc + " must be a function")
                                }
                            }
                            t = t.replace("https://", "yxzog").replace("//", "/").replace("//", "/").replace("yxzog", "https://"), a._url_ = t, e.get(t, function(t) {
                                a.showpageposts(t)
                            }, "jsonp")
                        }(jQuery)
                } catch (l) {
                    logErr("get error : " + l)
                }
                return a
            }, this.showpageposts = function(t) {
                var e, n;
                try {
                    if (void 0 === t.feed.entry) return _nfo("no feed entry!!, aborting!! ", this.setting.elResult, " url:", this._url_), "";
                    delete this._url_;
                    var s, a, r, o, l, c, u, p, h, d = "",
                        g = "0";
                    u = this.setting.StartPostData + this.setting.postPerPage, 0 === this.setting.pagernum && (this.setting.postsnum = parseInt(t.feed.openSearch$totalResults.$t, 10), this.setting.pagernum = parseInt(this.setting.postsnum / this.setting.postPerPage, 10) + 1), p = t.feed.entry.length;
                    var f = -1,
                        m = !0;
                    h = 0, this.getcommonImage = function() {
                        this.setting.NextImageSize > 0 && (o = o.replace(/\/s[0-9]+\-c/g, "/s" + this.setting.NextImageSize + "-p").replace(/\/s[0-9]+\//g, "/s" + this.setting.NextImageSize + "-p/"))
                    };
                    try {
                        for (; ++f < p && h++ < this.setting.postPerPage && void 0 !== t.feed.entry && f != t.feed.entry.length;) {
                            s = t.feed.entry[f], a = cTrim(s.title.$t);
                            for (var b = 0; b < s.link.length; b++)
                                if ("alternate" == s.link[b].rel) {
                                    r = s.link[b].href;
                                    break
                                }
                            for (var v = 0; v < s.link.length; v++)
                                if ("replies" == s.link[v].rel && "text/html" == s.link[v].type) {
                                    g = s.link[v].title.split(" ")[0];
                                    break
                                }
                            e = "content" in s ? s.content.$t : "summary" in s ? s.summary.$t : "", e = dataFetcher.splitTextContent(e, m, i.setting.numchars, i.setting.nextnumchars, i.setting.stripHtml, i.setting.cutTextByLength);
                            var x = this.setting.showPostDate ? dataFetcher.getShortMonth(this.setting.idMode, s) + " - " : "",
                                y = this.setting.showComments && g > 0 ? g + " " + this.setting.commentsLabel : "-";
                            try {
                                n = s.author[0].name.$t
                            } catch (S) {
                                n = ""
                            }
                            if (l = !1, "media$thumbnail" in s) o = s.media$thumbnail.url;
                            else {
                                try {
                                    o = this.getImageUrl(s.content.$t)
                                } catch (S) {
                                    try {
                                        o = this.getImageUrl(s.summary.$t)
                                    } catch (C) {
                                        o = ""
                                    }
                                }
                                "" === o && (o = this.setting.srcImgBlank, l = !0)
                            }
                            if (this.setting.imgBlank && l ? c = "" : (m ? (this.setting.FirstImageSize > 0 ? o = o.replace(/\/s[0-9]+\-c/g, "/s" + this.setting.FirstImageSize + "-p").replace(/\/s[0-9]+\//g, "/s" + this.setting.FirstImageSize + "-p/") : this.getcommonImage(), m = !1) : this.getcommonImage(), c = '<a title="' + a + '" href="' + r + '"><img alt="' + a + '" src="' + o + '" /></a>'), dataFetcher.MainTitle == a) this.setting.StartPostData++;
                            else if (this.notToExclude(s.category)) try {
                                if (dataFetcher.addList(a) || dataFetcher.DuplicateList)
                                    if (i.plugin.onExecute !== !1) try {
                                        d += i.plugin.onExecute(i, s, a, c, r, e, x, y, i.setting.rmoreText, n)
                                    } catch (S) {
                                        logErr("plugin.onExecute Error:" + S)
                                    } else try {
                                        d += this.setting.callBack(i, s, a, c, r, e, x, y, i.setting.rmoreText, n)
                                    } catch (S) {
                                        logErr("CallBack Error:" + S)
                                    }
                            } catch (S) {
                                logErr("error executing callBack<br/> Value (" + this.setting.callBack + ")\n" + S)
                            } else p++
                        }
                    } catch (S) {
                        logErr("fetch error:\n" + S)
                    }
                    if (!this.setting.appChild) {
                        var E = this.setting.elResult.replace(".", "").replace("#", "");
                        try {
                            document.getElementById(E).innerHTML = d
                        } catch (S) {
                            logErr("getElementById (" + E + ") error:\n" + S)
                        }
                    }
                    if (i.plugin.aferExecute !== !1) i.plugin.aferExecute(i);
                    else {
                        var $ = typeof this.setting.lastfunc;
                        switch ($) {
                            case "function":
                                if ("object" == typeof this.setting.externalparam) {
                                    var A = this.setting.externalparam,
                                        w = A.length;
                                    switch (void 0 === w && (w = 0), w) {
                                        case 0:
                                            this.setting.lastfunc(i);
                                            break;
                                        case 1:
                                            this.setting.lastfunc(i, A[0]);
                                            break;
                                        case 2:
                                            this.setting.lastfunc(i, A[0], A[1]);
                                            break;
                                        case 3:
                                            this.setting.lastfunc(i, A[0], A[1], A[2]);
                                            break;
                                        case 4:
                                            this.setting.lastfunc(i, A[0], A[1], A[2], A[3])
                                    }
                                } else this.setting.lastfunc();
                                break;
                            case "string":
                                logErr(this.setting.lastfunc + " Must be a function")
                        }
                    }
                    this.halaman()
                } catch (S) {
                    logErr(S)
                }
            }, this.notToExclude = function(t) {
                if (0 === this.setting.ExcludeLabel.length) return !0;
                var e, i;
                for (i = 0; i < this.setting.ExcludeLabel.length; i++)
                    for (e = 0; e < t.length; e++)
                        if (TrimAndUpCase(this.setting.ExcludeLabel[i]) == TrimAndUpCase(t[e].term)) return !1;
                return !0
            }, this.isToInclude = function(t) {
                if (0 === this.setting.IncludeLabel.length) return !1;
                var e, i;
                for (i = 0; i < this.setting.IncludeLabel.length; i++)
                    for (e = 0; e < t.length; e++)
                        if (TrimAndUpCase(this.setting.IncludeLabel[i]) == TrimAndUpCase(t[e].term)) return !0;
                return !1
            }, this.halaman = function() {
                if (countP = 0, output = "", !this.setting.drawFooter) return !1;
                if (thisPub = this, this.setting.varName = "thisPub", output += this.setting.actualpage > 1 ? '<a class="prevjson" href="javascript:callScript(' + parseInt(this.setting.actualpage - 1, 10) + ",&#39;" + this.setting.varName + '&#39;)">' + this.setting.prevText + "</a>" : '<span class="prevjson hidden">' + this.setting.prevText + "</span>", this.setting.pagernum < this.setting.maxpage + 1)
                    for (countP = 1; countP <= this.setting.pagernum; countP++) output += countP == this.setting.actualpage ? '<span class="actual">' + countP + "</span>" : '<a href="javascript:callScript(' + countP + ",&#39;" + this.setting.varName + '&#39;)">' + countP + "</a>";
                else if (this.setting.pagernum > this.setting.maxpage - 1)
                    if (this.setting.actualpage < this.setting.minpage) {
                        for (countP = 1; countP < this.setting.maxpage - 2; countP++) output += countP == this.setting.actualpage ? '<span class="actual">' + countP + "</span>" : '<a href="javascript:callScript(' + countP + ",&#39;" + this.setting.varName + '&#39;)">' + countP + "</a>";
                        output += " ... ", output += '<a href="javascript:callScript(' + parseInt(this.setting.pagernum - 1, 10) + ",&#39;" + this.setting.varName + '&#39;)">' + parseInt(this.setting.pagernum - 1, 10) + "</a>", output += '<a href="javascript:callScript(' + this.setting.pagernum + ",&#39;" + this.setting.varName + '&#39;)">' + this.setting.pagernum + "</a>"
                    } else if (this.setting.pagernum - (this.setting.minpage - 1) > this.setting.actualpage && this.setting.actualpage > this.setting.minpage - 1) {
                    for (output += '<a href="javascript:callScript(1,&#39;' + this.setting.varName + '&#39;)">1</a>', output += '<a href="javascript:callScript(2,&#39;' + this.setting.varName + '&#39;)">2</a>', output += " ... ", countP = this.setting.actualpage - 2; countP <= this.setting.actualpage + 2; countP++) output += countP == this.setting.actualpage ? '<span class="actual">' + countP + "</span>" : '<a href="javascript:callScript(' + countP + ",&#39;" + this.setting.varName + '&#39;)">' + countP + "</a>";
                    output += " ... ", output += '<a href="javascript:callScript(' + parseInt(this.setting.pagernum - 1, 10) + ",&#39;" + this.setting.varName + '&#39;)">' + parseInt(this.setting.pagernum - 1, 10) + "</a>", output += '<a href="javascript:callScript(' + this.setting.pagernum + ",&#39;" + this.setting.varName + '&#39;)">' + this.setting.pagernum + "</a>"
                } else
                    for (output += '<a href="javascript:callScript(1,&#39;' + this.setting.varName + '&#39;)">1</a>', output += '<a href="javascript:callScript(2,&#39;' + this.setting.varName + '&#39;)">2</a>', output += " ... ", countP = this.setting.pagernum - (this.setting.minpage + 1); countP <= this.setting.pagernum; countP++) output += countP == this.setting.actualpage ? '<span class="actual">' + countP + "</span>" : '<a href="javascript:callScript(' + countP + ",&#39;" + this.setting.varName + '&#39;)">' + countP + "</a>";
                output += this.setting.actualpage < countP - 1 ? '<a class="nextjson" href="javascript:callScript(' + parseInt(this.setting.actualpage + 1, 10) + ",&#39;" + this.setting.varName + '&#39;)">' + this.setting.nextText + "</a>" : '<span class="nextjson hidden">' + this.setting.nextText + "</span>", document.getElementById("halaman").innerHTML = output;
                var t = this.setting.actualpage * this.setting.postPerPage - (this.setting.postPerPage - 1),
                    e = this.setting.actualpage * this.setting.postPerPage,
                    i = this.setting.totalPostLabel + " " + this.setting.postsnum + " - " + this.setting.jumpPageLabel + " " + t + " - " + e;
                document.getElementById("totalposts").innerHTML = i
            }, this.removerscript = function() {
                var t = document.getElementById("TEMPORAL");
                if (null !== t) {
                    var e = t.parentNode;
                    e.removeChild(t)
                }
            }, this.incluirscript = function(t) {
                1 == this.setting.firstPage && this.removerscript();
                try {
                    "#" == this.setting.elResult.substring(0, 1) ? $(this.setting.elResult).html('<div id="loadingscript">' + this.setting.loadingText + "</div>") : document.getElementById(this.setting.elResult).innerHTML = '<div id="loadingscript">' + this.setting.loadingText + "</div>"
                } catch (e) {
                    return void logErr("Error!" + e + '\nelement:"' + this.setting.elResult + '" cant not be found in document!')
                }
                this.setting.drawFooter && ($("#halaman").html(""), $("#totalposts").html("")), this.setting.StartPostData = this.setting.postPerPage * (t - 1), this.setting.passingObject && this.setting.passingObject._textContent && (this.setting.passingObject._textContent = ""), this.get(this.setting.url, {}, this.setting.firstfunc, this.setting.lastfunc), this.setting.firstPage = 1, this.setting.actualpage = t
            }, this._feed = function(t) {
                var e = document.createElement("script");
                e.setAttribute("type", "text/javascript"), e.setAttribute("src", t), e.setAttribute("id", "TEMPORAL"), document.getElementsByTagName("head")[0].appendChild(e)
            }, this._defaultUrlTest = function() {
                return dataFetcher.SiteUrl + "feeds/posts/default/?start-index=1&max-results=10&orderby=published&alt=json-in-script&callback=" + this.setting.varName + ".showpageposts"
            }, this.a = function(t) {
                _nfo(t)
            }, this.execute = function() {
                try {
                    this.incluirscript(1)
                } catch (t) {
                    this.a(t)
                }
            }, this.getVideoImageUrl = function(t) {
                return dataFetcher.getVideoImageUrl(t)
            }, this.getImageUrl = function(t) {
                return dataFetcher.getImageUrl(t)
            }, this.getImageListfrom = function() {
                return dataFetcher.getImageListfrom(ocontent, option)
            }, i
        },
        getVideoImageUrl: function(t) {
            var e = !1;
            if (a = t.indexOf("<object"), -1 === a && (a = t.indexOf("<iframe"), e = !0), -1 != a) {
                var i = t.substr(a + 7, t.length - 7);
                if (a = i.indexOf("data-thumbnail-src="), -1 != a) {
                    if (b = i.indexOf('src="', a), b1 = i.indexOf("src='", a), -1 != b) return c = i.indexOf('"', b + 5), i.substr(b + 5, c - b - 5);
                    if (-1 != b1) return c = i.indexOf("'", b + 5), i.substr(b + 5, c - b - 5)
                }
            }
            return ""
        },
        getImageUrl: function(t) {
            if (a = t.indexOf("<img"), -1 != a) {
                if (b = t.indexOf('src="', a), b1 = t.indexOf("src='", a), -1 != b) return c = t.indexOf('"', b + 5), t.substr(b + 5, c - b - 5);
                if (-1 != b1) return c = t.indexOf("'", b1 + 5), t.substr(b1 + 5, c - b1 - 5)
            }
            return dataFetcher.getVideoImageUrl(t)
        },
        getImageListfrom: function(t, e, i) {
            function n() {
                var e, i = "";
                if (e = t.indexOf("<object"), -1 === e && (e = t.indexOf("<iframe")), -1 != e && (t = t.substr(e + 7, t.length - 7), a = t.indexOf("data-thumbnail-src="), -1 != a)) {
                    if (b = t.indexOf('src="', a), b1 = t.indexOf("src='", a), -1 != b) return e = t.indexOf('"', b + 5), xremain = t.length - e - 1, i = t.substr(b + 5, e - b - 5), t = t.substr(e + 1, xremain), i;
                    if (-1 != b1) return b = b1, e = t.indexOf("'", b + 5), xremain = t.length - e - 1, i = t.substr(b + 5, e - b - 5), t = t.substr(e + 1, xremain), i
                }
                return ""
            }

            function s() {
                var e = "";
                if (a = t.indexOf("<img"), -1 != a) {
                    if (b = t.indexOf('src="', a), b1 = t.indexOf("src='", a), -1 != b) return xcut = t.indexOf('"', b + 5), xremain = t.length - xcut - 1, e = t.substr(b + 5, xcut - b - 5), t = t.substr(xcut + 1, xremain), e;
                    if (-1 != b1) return b = b1, xcut = t.indexOf("'", b + 5), xremain = t.length - xcut - 1, e = t.substr(b + 5, xcut - b - 5), t = t.substr(xcut + 1, xremain), e
                } else e = n(), "" === e && (t = "");
                return e
            }

            function r() {
                c.FirstImageSize > 0 && (p = p.replace(/\/s[0-9]+\-c/g, "/s" + c.FirstImageSize + "-p").replace(/\/s[0-9]+\//g, "/s" + c.FirstImageSize + "-p/"))
            }

            function o() {
                c.NextImageSize > 0 && (p = p.replace(/\/s[0-9]+\-c/g, "/s" + c.NextImageSize + "-p").replace(/\/s[0-9]+\//g, "/s" + c.NextImageSize + "-p/"))
            }

            function l() {
                c.imageSize > 0 && (p = p.replace(/\/s[0-9]+\-c/g, "/s" + c.imageSize + "-p").replace(/\/s[0-9]+\//g, "/s" + c.imageSize + "-p/"))
            }
            var c = {
                    imageSize: 0,
                    FirstImageSize: 0,
                    NextImageSize: 0,
                    tagStyle: !1
                },
                u = [];
            c = $.extend({}, c, e);
            for (var p, h = "number" == typeof i ? i : 0; t.length > 0;) p = s(), "" !== p && (0 === h && c.FirstImageSize > 0 && r(), (h > 0 && c.NextImageSize > 0 || 0 === c.FirstImageSize && 0 === c.imageSize) && o(), (0 === c.FirstImageSize && 0 === c.NextImageSize || h > 0 && 0 === c.NextImageSize) && l(), u.push(c.tagStyle ? '<img src="' + p + '"   />' : p), h++);
            return u
        },
        imageCycler: function(t, e) {
            var i = this,
                n = {
                    fade: 1500,
                    interval: 3e3,
                    imgCount: 4
                };
            return n = jQuery.extend({}, n, e), $(t).hide(), this.cycleImages = function() {
                var e = $(t + " .active"),
                    i = $(t + " .active").next().length > 0 ? $(t + " .active").next() : $(t + " img:first");
                i.css("z-index", n.imgCount - 1), e.fadeOut(n.fade, function() {
                    e.css("z-index", 1).show().removeClass("active"), i.css("z-index", n.imgCount).addClass("active")
                })
            }, $(window).load(function() {
                $(t).fadeIn(n.fade), setInterval(i.cycleImages, n.interval)
            }), i
        },
        getAsimageCycler: function(t, e) {
            var i = [],
                n = {
                    postPerPage: 10,
                    drawFooter: !1,
                    sortByLabel: !0,
                    callBack: function(e, n) {
                        var s = dataFetcher.getImageListfrom(n.content.$t, jQuery.extend({}, {
                            tagStyle: !1
                        }, t));
                        return jQuery.each(s, function(t, e) {
                            i.push(e)
                        }), ""
                    },
                    lastfunc: function() {
                        for (var e = "", s = 0; s < i.length; s++) e += '<img src="' + i[s] + '" ' + (s == i.length - 1 ? 'class="active"' : "") + ' style="' + (s == i.length - 1 ? "z-index:" + cTrim(i.length.toString()) : "z-index:1") + ';"/>';
                        $("#" + n.elResult).html(e), dataFetcher.imageCycler("#" + n.elResult, jQuery.extend({}, {
                            imgCount: i.length
                        }, t))
                    }
                };
            n = jQuery.extend({}, n, e), dataFetcher.get(n)
        },
        dataFeed: function(t) {
            var e, i = this;
            this.opt = {
                maxResult: 10,
                startIndex: 1,
                Label: "all",
                varName: "default",
                url: !1,
                callBack: function() {}
            };
            for (var n in t) this.opt[n] = t[n];
            e = this.opt.url !== !1 ? this.opt.url + "feeds/posts/default" : dataFetcher.SiteUrl + "feeds/posts/default", "all" != this.opt.Label && (e += "/-/" + this.opt.Label), e += "?start-index=" + this.opt.startIndex + "&max-results=" + this.opt.maxResult, e += "&orderby=published&alt=json-in-script&callback=" + this.opt.varName + ".AtomFeedCallBack", this.Url = e;
            var s = document.createElement("script");
            return s.setAttribute("type", "text/javascript"), s.setAttribute("src", e), s.setAttribute("id", "tempfeed"), document.getElementsByTagName("head")[0].appendChild(s), this.AtomFeedCallBack = function(t) {
                dataFetcher.xmlData[this.label] = t, dataFetcher.count++;
                var e = document.getElementById("tempfeed"),
                    i = e.parentNode;
                i.removeChild(e), this.opt.callBack(t)
            }, i
        },
        refresher: function(t) {
            function e() {
                var t = new Date,
                    e = t.getTime();
                return e
            }

            function i(t) {
                "undefined" != typeof t && clearTimeout(t), t = setTimeout(function() {
                    if (s.count = parseInt((e() - n.starttime) / n.delay, 10), s.paused) s.count >= n.expiredcount && (s.paused = !1, s.running = !0, n.starttime = e());
                    else if (s.running = !0, s.count >= n.fetchcount) {
                        n.starttime = e(), s.running = !1, s.paused = !0;
                        try {
                            n.call(s)
                        } catch (t) {}
                        return void i()
                    }
                    i()
                }, n.delay)
            }
            var n = {
                    element: "#result",
                    speed: 800,
                    delay: 1e3,
                    autorefresh: !1,
                    starttime: e(),
                    bypassed: !1,
                    fetchcount: 5,
                    expiredcount: 10,
                    call: function() {}
                },
                s = {
                    running: !0,
                    success: !1,
                    paused: !1,
                    count: 0,
                    reset: function() {
                        s.paused = !1, n.starttime = e()
                    },
                    loading: function() {
                        s.paused = !0, n.starttime = e()
                    },
                    autoupdate: function() {
                        return !0
                    }
                };
            return n = $.extend({}, n, t), n.bypass ? this : (n.call(s), void i())
        },
        archiveCalendar: function(e) {
            function i() {
                document.getElementById("calLoadingStatus").style.display = "block", document.getElementById("calendarDisplay").innerHTML = ""
            }

            function n() {
                document.getElementById("calLoadingStatus").style.display = "none"
            }

            function s() {
                i(), cls = document.getElementById("calLoadingStatus"), img = document.createElement("img"), img.src = C, img.style.verticalAlign = "middle", cls.appendChild(img), txt = document.createTextNode(E), cls.appendChild(txt)
            }

            function o(t) {
                window.location.assign(t)
            }

            function l(t, e, n) {
                L[2] = e % 4 === 0 && e % 100 !== 0 || e % 400 === 0 ? "29" : "28", g = t, f = e, 0 === t.charAt(0) && (g = t.substring(1)), b = t, bcNavAll = document.getElementById("bcFootAll"), bcNavPrev = document.getElementById("bcFootPrev"), bcNavNext = document.getElementById("bcFootNext"), bcSelect = document.getElementById("bcSelection"), a = document.createElement("a"), at = document.createTextNode($), a.href = T[n], a.appendChild(at), bcNavAll.innerHTML = "", bcNavAll.appendChild(a), bcNavPrev.innerHTML = "", bcNavNext.innerHTML = "", n < T.length - 1 && (a = document.createElement("a"), a.innerHTML = A, bcp = parseInt(n, 10) + 1, a.href = T[bcp], a.title = "Previous Archive", prevSplit = I[bcp].split(","), a.onclick = function() {
                        return bcSelect.options[bcp].selected = !0, i(), l(prevSplit[0], prevSplit[1], prevSplit[2]), !1
                    }, bcNavPrev.appendChild(a)), n > 0 && (a = document.createElement("a"), a.innerHTML = w, bcn = parseInt(n, 10) - 1, a.href = T[bcn], a.title = "Next Archive", nextSplit = I[bcn].split(","), a.onclick = function() {
                        return bcSelect.options[bcn].selected = !0, i(), l(nextSplit[0], nextSplit[1], nextSplit[2]), !1
                    }, bcNavNext.appendChild(a)),
                    function(t) {
                        var e = "https://www.blogger.com/feeds/" + y.BlogID + "/posts/summary?published-max=" + f + "-" + b + "-" + L[parseInt(b, 10)] + "T23%3A59%3A59" + y.timeOffset + "&published-min=" + f + "-" + b + "-01T00%3A00%3A00" + y.timeOffset + "&max-results=100&orderby=published&alt=json-in-script";
                        t.get(e, function(t) {
                            c(t)
                        }, "jsonp")
                    }(jQuery)
            }

            function c(t) {
                var e, i, s;
                n();
                try {
                    L[2] = f % 4 === 0 && f % 100 !== 0 || f % 400 === 0 ? "29" : "28"
                } catch (a) {
                    logErr("calendar\n" + a)
                }
                document.getElementById("Row6").style.display = "none";
                var r = t.feed,
                    l = (r.openSearch$totalResults.$t, r.entry || [], []),
                    c = [];
                c.length = 32, y.createList && (i = document.createElement("ul"), i.id = "calendarUl"), dday = 0;
                for (var u = 0; u < r.entry.length; ++u) {
                    for (var h = r.entry[u], d = 0; d < h.link.length; ++d) "alternate" == h.link[d].rel && (e = h.link[d].href); {
                        var v = h.title.$t,
                            S = (h.author[0].name.$t, h.published.$t);
                        h.summary.$t
                    }
                    isPublished = S.split("T")[0].split("-")[2], "0" == isPublished.charAt(0) && (isPublished = isPublished.substring(1)), l.push(isPublished), c[isPublished] = c[isPublished] ? c[isPublished] + " | " + v : v, y.createList && (li = document.createElement("li"), li.style.listType = "none", li.innerHTML = '<a href="' + e + '">' + v + "</a>", i.appendChild(li))
                }
                y.createList && document.getElementById("calendarDisplay").appendChild(i);
                var C = (parseInt(P, 10), parseInt(g, 10)),
                    E = C - 1,
                    $ = parseInt(f, 10),
                    A = new Date($, E, 1),
                    w = A.getDay();
                m = w + 1;
                var T = 1,
                    I = 1;
                for (x = 1; 38 > x; x++) {
                    x > 7 && (I += 1);
                    var M = document.getElementById("cell" + x);
                    if (m > x && (M.innerHTML = " ", M.className = "firstCell"), x >= m) {
                        for (M.innerHTML = T, M.className = "filledCell", p = 0; p < l.length; p++) T == l[p] && (fillURL = 1 == l[p].length ? "0" + l[p] : l[p], M.className = "highlightCell", y.createLink ? (s = y.url + "/search?&max-results=" + y.MaxFetchPage + "&updated-max=" + f + "-" + b + "-" + fillURL + "T23%3A59%3A59" + y.timeOffset + "&updated-min=" + f + "-" + b + "-" + fillURL + "T00%3A00%3A00" + y.timeOffset + "' title='" + c[l[p]].replace(/&quot;/g, "'"), M.onclick = function() {
                            return o(s)
                        }) : s = "#", M.innerHTML = "<a href='" + s + "'>" + T + "</a>");
                        T > L[C] && (M.innerHTML = " ", M.className = "emptyCell"), T++
                    }
                }
                visTotal = parseInt(m, 10) + parseInt(L[C], 10) - 1, visTotal > 32 && (document.getElementById("Row6").style.display = "")
            }

            function u() {
                s();
                var t = document.getElementById(y.ulElement),
                    e = t.getElementsByTagName("a"),
                    n = t.getElementsByTagName("li");
                for (t.style.display = "none", x = 0; x < e.length; x++) {
                    var a = e[x].href.split("_")[0].split("/")[3],
                        o = e[x].href.split("_")[1];
                    I.push(o + "," + a + "," + x), T.push(e[x].href)
                }
                var c = document.createElement("select");
                for (c.id = "bcSelection", c.onchange = function() {
                        var t = this.options[this.selectedIndex].value.split(",");
                        i(), l(t[0], t[1], t[2])
                    }, q = 0, r = 0; r < I.length; r++) {
                    var u = e[r].innerHTML,
                        p = (e[r].innerHTML, n[r].innerHTML.split("> (")[1]),
                        h = I[r];
                    c.options[q] = new Option(u + " (" + p, h), q++
                }
                document.getElementById("bcaption").appendChild(c);
                var d = I[0].split(",")[0],
                    g = I[0].split(",")[1];
                l(d, g, "0")
            }

            function h() {
                ! function(t) {
                    t.get(y.url + "/feeds/posts/summary?max-results=0&alt=json-in-script", function(t) {
                        var e = t.feed,
                            i = e.updated.$t,
                            n = e.id.$t;
                        y.BlogID = n.split("blog-")[1], upLength = i.length, y.timeOffset = "Z" == i.charAt(upLength - 1) ? "+00:00" : i.substring(upLength - 6, upLength), y.timeOffset = encodeURIComponent(y.timeOffset), u()
                    }, "jsonp")
                }(jQuery)
            }

            function d() {
                S.container = document.getElementById(y.container), S.container.setAttribute("style", "width:100%");
                var e = "",
                    i = "<div id='calLoadingStatus' style='display:none; text-align:center;'></div><div id='calendarDisplay'></div>";
                for (t = 0; 7 > t; t++) e += '    <th abbr="' + y.headDays[t] + '" title="' + y.headDays[t] + '">' + y.headInitial[t] + "</th>\n";
                e = "<thead id='bcHead'><tr>" + e + "</tr></thead>\n";
                var n = 1,
                    s = 1;
                for (wd = 1; 10 > wd; wd++) {
                    for (e += '<tr id="Row' + wd + '">', n = 1; 8 > n && (e += "<td id='cell" + cTrim(s.toString()) + "'></td>", !(++s >= 38)); n++);
                    if (e += "</tr>\n", s >= 38) break
                }
                e = "<table id='bcalendar'><caption id='bcaption'></caption><tbody>" + e + "</tbody></table><table id='bcNavigation'><tr><td id='bcFootPrev'></td><td id='bcFootAll'></td><td id='bcFootNext'></td></tr></table>", S.container.innerHTML = e + i, h()
            }
            var g, f, m, b, v = this,
                y = {
                    createLink: !0,
                    ulElement: "bloggerCalendarList",
                    container: "blogger_calendar",
                    timeOffset: "+00:00",
                    BlogID: "",
                    url: dataFetcher.SiteUrl,
                    headDays: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
                    headInitial: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    MaxFetchPage: dataFetcher.MaxFetchPage,
                    createList: !1
                },
                S = {
                    container: !1,
                    loading: !1
                },
                C = "https://2.bp.blogspot.com/-yUGWz7Vrm0c/UKtPDwJpdSI/AAAAAAAAICU/9ZAvxQUZJLg/s400/loading-trans.gif.png",
                E = " Loading....",
                $ = "View Archive",
                A = "<",
                w = ">",
                P = 1,
                T = [],
                I = [],
                L = ["", "31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
            return y = jQuery.extend({}, y, e), this.timezoneSet = function(t) {
                var e = t.feed,
                    i = e.updated.$t,
                    n = e.id.$t;
                bcBlogId = n.split("blog-")[1], upLength = i.length, y.timeOffset = "Z" == i.charAt(upLength - 1) ? "+00:00" : i.substring(upLength - 6, upLength), y.timeOffset = encodeURIComponent(y.timeOffset)
            }, d(), v
        },
        MobileNav: function(t) {
            function e() {
                t(window).width() > 767 ? t("#navi").css("display", "block").removeClass("suball") : t(window).width() <= 767 && "active" === t("#mobilenav").attr("class") ? t("#navi").css("display", "block").addClass("suball") : t(window).width() <= 767 && "active" !== t("#mobilenav").attr("class") && t("#navi").css("display", "none").addClass("suball")
            }

            function i() {
                t(window).width() > 767 ? t("#PageList1 ul").css("display", "block") : t(window).width() <= 767 && "active" === t("#top_mobilenav").attr("class") ? t("#PageList1 ul").css("display", "block") : t(window).width() <= 767 && "active" !== t("#top_mobilenav").attr("class") && t("#PageList1 ul").css("display", "none")
            }
            if (!dataFetcher.isMobile) return !1;
            t = jQuery;
            var n = window.location.href;
            t("#navi a").each(function() {
                if (this.href === n) {
                    t(this).parents("li").children("a").addClass("current")
                }
            }), t("#navi ul").removeClass("hidden"), t("#navi li").hoverTimeout(100, function() {
                t(this).parent("ul").css("overflow", "visible"), t(this).children("ul").filter(":not(:animated)").slideDown()
            }, 500, function() {
                t(this).parent("ul").css("overflow", "visible"), t(this).children("ul").slideUp(800, "easeInExpo")
            }), t("#mobilenav").click(function() {
                return t("#navi").slideToggle(), t(this).toggleClass("active"), !1
            }), t("#top_mobilenav").click(function() {
                return t("#PageList1 ul").slideToggle(), t(this).toggleClass("active"), !1
            });
            try {
                e(), i(), t(window).resize(e), t(window).resize(i)
            } catch (s) {
                _nfo("nav error\n" + t)
            }
        },
        chkBrowser: function() {
            function t() {
                var t = window.location.href,
                    e = t.split(s);
                switch (e.length) {
                    case 1:
                        return t + a;
                    case 2:
                        return 0 <= e[1].search(n) ? null : t + i;
                    default:
                        return null
                }
            }
            var e = "indexOf",
                i = "&m=1",
                n = "(^|&)m=",
                s = "?",
                a = "?m=1",
                r = navigator.userAgent;
            if (-1 != r[e]("Mobile") && -1 != r[e]("WebKit") && -1 == r[e]("iPad") || -1 != r[e]("Opera Mini") || -1 != r[e]("IEMobile")) {
                var o = t();
                return dataFetcher.isMobile = !0, o && window.location.replace(o)
            }
        },
        labelinc: function(t) {
            var e = t || {},
                i = e.id_labelcontent || "#ujLab";
            $.get("https://" + dataFetcher.SiteUrl + "/feeds/posts/summary?max-results=0&alt=json-in-script", function(t) {
                var e = t.feed.category,
                    n = "";
                if (void 0 !== e) {
                    n = "<span>+</span><ul class='s2item-col'>";
                    for (var s = 0; s < e.length; s++) n += '<li><a href="/search/label/' + encodeURIComponent(e[s].term) + '?&max-results=7">' + e[s].term + "</a></li>";
                    n += "</ul>", $(i).html(n)
                } else $(i).html("<span>No Label!</span>")
            }, "jsonp"), $(".item-col .lines").click(function() {
                return $("#ujLab").slideToggle("fast"), $(this).toggleClass("active"), !1
            })
        }
    };
! function(t) {
    function e(e, i) {
        return parseFloat(t.css(e[0], i), 10) || 0
    }

    function i(t) {
        return t[0].offsetWidth + e(t, "marginLeft") + e(t, "marginRight")
    }

    function n(t) {
        return t[0].offsetHeight + e(t, "marginTop") + e(t, "marginBottom")
    }
    t.fn.CarouselScroller = function(e) {
        return e = t.extend({
            bPrev: null,
            bNext: null,
            bGo: null,
            mouseWheel: !1,
            auto: null,
            speed: 200,
            easing: null,
            vertical: !1,
            circular: !0,
            visible: 3,
            start: 0,
            scroll: 1,
            pauseOnHover: !1,
            beforeStart: null,
            afterEnd: null
        }, e || {}), this.each(function() {
            function s() {
                return f.slice(b).slice(0, d)
            }

            function a(i) {
                if (!r && !g) {
                    if (e.beforeStart && e.beforeStart.call(this, s()), e.circular) i <= e.start - d - 1 ? (u.css(o, -((m - 2 * d) * v) + "px"), b = i == e.start - d - 1 ? m - 2 * d - 1 : m - 2 * d - e.scroll) : i >= m - d + 1 ? (u.css(o, -(d * v) + "px"), b = i == m - d + 1 ? d + 1 : d + e.scroll) : b = i;
                    else {
                        if (0 > i || i > m - d) return;
                        b = i
                    }
                    r = !0, u.animate("left" == o ? {
                        left: -(b * v)
                    } : {
                        top: -(b * v)
                    }, e.speed, e.easing, function() {
                        e.afterEnd && e.afterEnd.call(this, s()), r = !1
                    }), e.circular || (t(e.bPrev + "," + e.bNext).removeClass("disabled"), t(b - e.scroll < 0 && e.bPrev || b + e.scroll > m - d && e.bNext || []).addClass("disabled"))
                }
                return !1
            }
            var r = !1,
                o = e.vertical ? "top" : "left",
                l = e.vertical ? "height" : "width",
                c = t(this),
                u = t("ul", c),
                p = t("li", u),
                h = p.size(),
                d = e.visible,
                g = 0;
            e.circular && (u.prepend(p.slice(h - d - 1 + 1).clone()).append(p.slice(0, d).clone()), e.start += d), e.pauseOnHover && u.hover(function() {
                g = 1
            }, function() {
                g = 0
            });
            var f = t("li", u),
                m = f.size(),
                b = e.start;
            c.css("visibility", "visible"), f.css({
                overflow: "hidden",
                "float": e.vertical ? "none" : "left"
            }), u.css({
                margin: "0",
                padding: "0",
                position: "relative",
                "list-style-type": "none",
                "z-index": "1"
            }), c.css({
                overflow: "hidden",
                position: "relative",
                "z-index": "2",
                left: "0px"
            });
            var v = e.vertical ? n(f) : i(f),
                x = v * m,
                y = v * d;
            f.css({
                width: f.width(),
                height: f.height()
            }), u.css(l, x + "px").css(o, -(b * v)), c.css(l, y + "px"), e.bPrev && t(e.bPrev).click(function() {
                return a(b - e.scroll)
            }), e.bNext && t(e.bNext).click(function() {
                return a(b + e.scroll)
            }), e.bGo && t.each(e.bGo, function(i, n) {
                t(n).click(function() {
                    return a(e.circular ? e.visible + i : i)
                })
            }), e.mouseWheel && c.mousewheel && c.mousewheel(function(t, i) {
                return a(i > 0 ? b - e.scroll : b + e.scroll)
            }), e.auto && setInterval(function() {
                a(b + e.scroll)
            }, e.auto + e.speed)
        })
    }
}(jQuery),
function(t) {
    "use strict";
    var e = function() {
        var e = {
                bcClass: "sf-breadcrumb",
                menuClass: "sf-js-enabled",
                anchorClass: "sf-with-ul",
                menuArrowClass: "sf-arrows"
            },
            i = function() {
                var e = /iPhone|iPad|iPod/i.test(navigator.userAgent);
                return e && t(window).load(function() {
                    t("body").children().on("click", t.noop)
                }), e
            }(),
            n = function() {
                var t = document.documentElement.style;
                return "behavior" in t && "fill" in t && /iemobile/i.test(navigator.userAgent)
            }(),
            s = function(t, i) {
                var n = e.menuClass;
                i.cssArrows && (n += " " + e.menuArrowClass), t.toggleClass(n)
            },
            a = function(i, n) {
                return i.find("li." + n.pathClass).slice(0, n.pathLevels).addClass(n.hoverClass + " " + e.bcClass).filter(function() {
                    return t(this).children(n.popUpSelector).hide().show().length
                }).removeClass(n.pathClass)
            },
            r = function(t) {
                t.children("a").toggleClass(e.anchorClass)
            },
            o = function(t) {
                var e = t.css("ms-touch-action");
                e = "pan-y" === e ? "auto" : "pan-y", t.css("ms-touch-action", e)
            },
            l = function(e, s) {
                var a = "li:has(" + s.popUpSelector + ")";
                t.fn.hoverIntent && !s.disableHI ? e.hoverIntent(u, p, a) : e.on("mouseenter.superfish", a, u).on("mouseleave.superfish", a, p);
                var r = "MSPointerDown.superfish";
                i || (r += " touchend.superfish"), n && (r += " mousedown.superfish"), e.on("focusin.superfish", "li", u).on("focusout.superfish", "li", p).on(r, "a", s, c)
            },
            c = function(e) {
                var i = t(this),
                    n = i.siblings(e.data.popUpSelector);
                n.length > 0 && n.is(":hidden") && (i.one("click.superfish", !1), "MSPointerDown" === e.type ? i.trigger("focus") : t.proxy(u, i.parent("li"))())
            },
            u = function() {
                var e = t(this),
                    i = g(e);
                clearTimeout(i.sfTimer), e.siblings().superfish("hide").end().superfish("show")
            },
            p = function() {
                var e = t(this),
                    n = g(e);
                i ? t.proxy(h, e, n)() : (clearTimeout(n.sfTimer), n.sfTimer = setTimeout(t.proxy(h, e, n), n.delay))
            },
            h = function(e) {
                e.retainPath = t.inArray(this[0], e.$path) > -1, this.superfish("hide"), this.parents("." + e.hoverClass).length || (e.onIdle.call(d(this)), e.$path.length && t.proxy(u, e.$path)())
            },
            d = function(t) {
                return t.closest("." + e.menuClass)
            },
            g = function(t) {
                return d(t).data("sf-options")
            };
        return {
            hide: function(e) {
                if (this.length) {
                    var i = this,
                        n = g(i);
                    if (!n) return this;
                    var s = n.retainPath === !0 ? n.$path : "",
                        a = i.find("li." + n.hoverClass).add(this).not(s).removeClass(n.hoverClass).children(n.popUpSelector),
                        r = n.speedOut;
                    e && (a.show(), r = 0), n.retainPath = !1, n.onBeforeHide.call(a), a.stop(!0, !0).animate(n.animationOut, r, function() {
                        var e = t(this);
                        n.onHide.call(e)
                    })
                }
                return this
            },
            show: function() {
                var t = g(this);
                if (!t) return this;
                var e = this.addClass(t.hoverClass),
                    i = e.children(t.popUpSelector);
                return t.onBeforeShow.call(i), i.stop(!0, !0).animate(t.animation, t.speed, function() {
                    t.onShow.call(i)
                }), this
            },
            destroy: function() {
                return this.each(function() {
                    var i, n = t(this),
                        a = n.data("sf-options");
                    return a ? (i = n.find(a.popUpSelector).parent("li"), clearTimeout(a.sfTimer), s(n, a), r(i), o(n), n.off(".superfish").off(".hoverIntent"), i.children(a.popUpSelector).attr("style", function(t, e) {
                        return e.replace(/display[^;]+;?/g, "")
                    }), a.$path.removeClass(a.hoverClass + " " + e.bcClass).addClass(a.pathClass), n.find("." + a.hoverClass).removeClass(a.hoverClass), a.onDestroy.call(n), void n.removeData("sf-options")) : !1
                })
            },
            init: function(i) {
                return this.each(function() {
                    var n = t(this);
                    if (n.data("sf-options")) return !1;
                    var c = t.extend({}, t.fn.superfish.defaults, i),
                        u = n.find(c.popUpSelector).parent("li");
                    c.$path = a(n, c), n.data("sf-options", c), s(n, c), r(u), o(n), l(n, c), u.not("." + e.bcClass).superfish("hide", !0), c.onInit.call(this)
                })
            }
        }
    }();
    t.fn.superfish = function(i) {
        return e[i] ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? t.error("Method " + i + " does not exist on jQuery.fn.superfish") : e.init.apply(this, arguments)
    }, t.fn.superfish.defaults = {
        popUpSelector: "ul,.sf-mega",
        hoverClass: "sfHover",
        pathClass: "overrideThisToUse",
        pathLevels: 1,
        delay: 200,
        animation: {
            opacity: "show"
        },
        animationOut: {
            opacity: "hide"
        },
        speed: "normal",
        speedOut: "fast",
        cssArrows: !0,
        disableHI: !1,
        onInit: t.noop,
        onBeforeShow: t.noop,
        onShow: t.noop,
        onBeforeHide: t.noop,
        onHide: t.noop,
        onIdle: t.noop,
        onDestroy: t.noop
    }, t.fn.extend({
        hideSuperfishUl: e.hide,
        showSuperfishUl: e.show
    })
}(jQuery), String.prototype.ucfirst || (String.prototype.ucfirst = function() {
    return this.substr(0, 1).toUpperCase() + this.substr(1)
}), Array.prototype.forEach || (Array.prototype.forEach = function(t) {
    var e = this.length;
    if ("function" != typeof t) throw new TypeError;
    for (var i = arguments[1], n = 0; e > n; n++) n in this && t.call(i, this[n], n, this)
});
var MasterElement = {
    list: [],
    objectList: [],
    operationList: {},
    commonClass: {
        loading: "loading"
    },
    regionStates: {
        all: !0,
        main: !0,
        LeftSideBar: !0,
        RightSideBar: !0
    },
    configSchema: {},
    timer: {
        defaultValue: {
            delay: 500,
            every: 10,
            expiredcount: 50,
            livecount: -1
        },
        forceFromDefault: !1
    },
    options: {
        defaultValue: {
            postPerPage: 1,
            drawFooter: !1,
            sortByLabel: !0,
            appChild: !0,
            NextImageSize: 300
        },
        forceFromDefault: !1
    },
    createNewAtribbute: function() {
        var t = {};
        return t.id = "", t["class"] = "", t.fetch = !1, t.options = "{}", t.label = !1, t.title = !1, t.autoRefresh = !1, t.region = !1, t.exec = !1, t.el = !1, t.configSchema = !1, t
    },
    setRegion: function(t, e) {
        return void 0 === e && (e = e), void 0 === t && (t = "all"), MasterElement.regionStates[t] = e, MasterElement.list.forEach(function(t) {
            t.region !== !1 && "function" == typeof t.syncRegion && t.syncRegion()
        }), MasterElement
    },
    register: function(t, e) {
        return void 0 === MasterElement.operationList[e] && (MasterElement.operationList[e] = []), "string" == typeof t && (t = [t]), "element" == e ? (MasterElement.operationList[e].push(t), MasterElement) : (t.forEach(function(t) {
            MasterElement.operationList[e].push(t)
        }), MasterElement)
    },
    remove: function(t) {
        return "string" == typeof t && (t = [t]), t.forEach(function(t) {
            t = t.replace(".", "").replace("#", "");
            var e = document.getElementById(t);
            null !== e && e.parentNode.removeChild(e)
        }), MasterElement
    },
    clearSection: function(t) {
        return "string" == typeof t && (t = [t]), t.forEach(function(t) {
            var e = document.getElementById(t);
            MasterElement.setRegion(t, !1), null !== e && e.parentNode.removeChild(e)
        }), MasterElement
    },
    execute: function() {
        var t = !1;
        for (fn in MasterElement.operationList) switch (fn) {
            case "remove":
                MasterElement.remove(MasterElement.operationList[fn]);
                break;
            case "clearSection":
                MasterElement.clearSection(MasterElement.operationList[fn]);
                break;
            case "element":
                MasterElement.operationList[fn].forEach(function(e) {
                    t = new TMagicElement(e).getAttributes()
                })
        }
        return MasterElement.clearSection(["invisible"]), MasterElement.operationList = {}, MasterElement.objectList.forEach(function(t) {
            t.execute()
        }), MasterElement
    }
};
(function() {
    function autoRefreshBase(t) {
        var e, i = this,
            n = "";
        return this.days = [], this.weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"], this.defaultConfig = {}, this.images = {
            Sun: {
                url: "https://littlepixieme.files.wordpress.com/2010/01/cat-lazy_days.jpg",
                text: ""
            },
            Mon: {
                url: "https://4.bp.blogspot.com/-xoWfUEZ67Y4/VLiwWvp8sTI/AAAAAAAAGQs/NP-J35WXUOc/s1600/gambar-kata-semangat-senin-bahasa-jawa-555x404.jpg",
                text: ""
            },
            Tue: {
                url: "https://pbs.twimg.com/media/B65t1S8CEAETPv7.jpg",
                text: ""
            },
            Wed: {
                url: "https://www.sheradiofm.com/docfile/berita/2013/brt3390_pict1.jpg",
                text: ""
            },
            Thur: {
                url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSn82gvMMP_a-Ddeoy1KtA3C2RDpu5sv7hCQ-j7yy7cTUUy1wVS-w",
                text: ""
            },
            Fri: {
                url: "https://2.bp.blogspot.com/-LeqgJ0wuCQA/VLiUvdXZi-I/AAAAAAAAGQc/9_k943JEr48/s1600/selamat-menunaikan-ibadah-sholat-jumat.png",
                text: ""
            },
            Sat: {
                url: "https://3.bp.blogspot.com/_menHX3Hd0Nw/TRUy7cAZ8DI/AAAAAAAAAnw/OhaIpxfpB2g/s400/istock-saturday.jpg",
                text: ""
            }
        }, this.fetParam = {
            postPerPage: 5,
            drawFooter: !1,
            sortByLabel: !0,
            LabelName: "Semangat",
            elResult: "#result",
            appChild: !0,
            NextImageSize: 300,
            callBack: function(t, e, i, n, s) {
                var a = t.setting.passingObject,
                    r = dataFetcher.getImageListfrom(e.content.$t, {
                        NextImageSize: a.fetParam.NextImageSize
                    }),
                    o = "";
                return $.each(r, function(t, e) {
                    return o = "", ++a._fechcount > a.fetParam.postPerPage ? "" : (r.length > 1 && (o = "&nbsp;(Slide " + (t + 1) + ")"), ca = '<img class="image float_right" src="' + e + '" alt="' + o + '"/><div class="rhino-caption"><h3><a class="title" href="' + s + '"> ' + o + "</a></h3></div>", void(a.textContent += "<li>" + ca + "</li>"))
                }), ""
            },
            firstfunc: function() {
                e = $(i.fetParam.elResult)
            },
            lastfunc: function() {
                e.html('<ul id="two_slider" class="margin_bottom">' + n + "</ul>").removeClass("loading")
            }
        }, this.gettick = function() {
            return (new Date).getTime()
        }, this.getdayname = function(t) {
            return "number" == typeof t ? this.weekday[t] : void 0
        }, this.fetParam = $.extend({}, this.fetParam, t), this.defaultConfig = $.extend({}, {}, t), i
    }

    function TTimer(t) {
        this.gettick = function() {
            return (new Date).getTime()
        }, this.config = {
            delay: 1250,
            every: 5,
            expiredcount: 10,
            livecount: 2,
            exefirst: !0,
            exec: function() {}
        }, this.setConfig = function(t) {
            return this.config = $.extend({}, this.config, t), this
        }, this.setConfig(t)
    }

    function TMagicElement(t) {
        var e = this;
        return this.config = {
            specialid: "fetch",
            selector: !1,
            tagName: "div",
            directExecute: !1
        }, this.list = [], this.index = !1, this.config = $.extend({}, this.config, t), MasterElement.objectList.push(e), e
    }

    function autoRefresh(t, e) {
        autoRefreshBase.apply(this, arguments), this.timer = new TTimer(e)
    }

    function fetch(t, e, i) {
        var n, s = new TMagicElement({
                directExecute: !0
            }),
            a = MasterElement.createNewAtribbute();
        if (e = e || {}, i = i || {
                livecount: 0
            }, a.configSchema = t.attr(s.config.specialid), void 0 === t.attr("id")) {
            if (void 0 === t.attr("class")) {
                var r = '.:fetch:. Error!!: element "' + t.selector + '" not found';
                throw logErr(r), new Error(r)
            }
            var o = t.attr("class").replace("-", ""),
                l = new Date,
                c = l.getTime();
            t.attr("id", o + c)
        }
        if (n = document.getElementById(t.attr("id").replace("#", "")), s.parseElementAtribute(n, a, !1), void 0 !== e.schema && (a.configSchema = e.schema, delete e.schema), void 0 === a.configSchema) {
            var r = ".:fetch:. Error!!: fetchOption.schema not defined..";
            throw logErr(r), new Error(r)
        }
        return a.fetch = a.configSchema, a.options.LabelName = a.label, void 0 !== a.options.sortByLabel && a.options.sortByLabel === !0 && a.options.LabelName === !1 && _nfo("error, if sortByLabel=true LabelName cannot be blank, empty or false"), a.options.LabelName === !1 && delete a.options.LabelName, a.options.region = a.region, e.elResult = "#" + t.attr("id"), a.options = $.extend(!0, a.options, e), a.autoRefresh = $.extend(!0, a.autoRefresh, i), $sys.___fetch(a.configSchema, a.options, a.autoRefresh), t
    }
    autoRefreshBase.prototype = {
        autocount: 0,
        element: !1,
        textContent: "",
        _textContent: "",
        _fechcount: 0,
        _prepared: !1,
        constructor: autoRefreshBase,
        imgfromUrl: function(t) {
            return '<img src="' + t + '" style="width:300px;height:150px"/>'
        },
        cleanForCompare: function(t) {
            if (void 0 === t) return "";
            var e = [" ", '"', "'", "/", ">", "=", ":", "-", "_", "html", "class", "src", "href", "title", "style", "http", "blogspot", "more", "link", "<div", "<img", "<a", "<ul", "<li", "<span", "<i", "<h", "\n", "img", "icon", "share", "alt", "float", "left", "right", "image"];
            return t = t.replace(/\+/g, "").replace(/\./g, ""), e.forEach(function(e) {
                t = t.replace(new RegExp(e, "g"), "")
            }), t.trim()
        },
        executeFirst: function(t) {
            var e = t.setting.passingObject,
                i = e.fetParam;
            e._fechcount = 0, e.textContent = "", "function" == typeof i.firstfunc && i.firstfunc(t)
        },
        executeCore: function(t, e, i, n, s, a, r, o, l, c) {
            var u = t.setting.passingObject,
                p = u.fetParam;
            return "function" == typeof p.callBack ? p.callBack(t, e, i, n, s, a, r, o, l, c) : a
        },
        executeAfter: function(t) {
            var e = t.setting.passingObject,
                i = e.fetParam;
            "" !== e.textContent && ("" === e._textContent || e.cleanForCompare(e.textContent) != e._textContent) && ("function" == typeof i.lastfunc ? i.lastfunc(t) : e.element.html(e.textContent), e._textContent = e.cleanForCompare(e.textContent))
        },
        prepare: function(t) {
            return this._prepared ? this : (void 0 === t && (t = this), "object" != typeof this.element && (this.element = $(this.fetParam.elResult)), this.fetParam.passingObject = this, this._prepared = !0, this)
        },
        execute: function() {
            this.prepare(), dataFetcher.get(this.fetParam, {
                beforeExecute: this.executeFirst,
                onExecute: this.executeCore,
                aferExecute: this.executeAfter
            })
        }
    };
    var exports = this;
    TTimer.prototype = {
        running: !1,
        count: 0,
        starttime: 0,
        status: {
            running: !1,
            paused: !1
        },
        constructor: TTimer,
        start: function() {
            return this.status.paused = !1, this.starttime = this.gettick(), current.status.running || this.execute(), this
        },
        pause: function() {
            return this.status.paused = !0, this
        },
        stop: function() {
            return this.running = !1, this.status.paused = !0, this
        },
        destroy: function() {},
        execute: function() {
            function t() {
                clearTimeout(i), e.status.running = !1
            }
            var e = this,
                i = !1;
            return e.starttime = e.gettick(), e.status.running = !0, e.config.exefirst && e.config.exec(e.status), 0 === e.config.livecount ? void t() : (e.run = function() {
                i !== !1 && clearTimeout(i), e.status.running && (i = setTimeout(function() {
                    return e.count = parseInt((e.gettick() - e.starttime) / e.config.delay, 10), e.status.paused && e.count > e.config.expiredcount && (e.status.paused = !1, e.starttime = e.gettick()), e.status.paused = !1, e.count >= e.config.every && (e.status.paused = !0, e.starttime = e.gettick(), e.config.exec(e.status), e.config.livecount > 0 && (e.config.livecount -= 1), 0 === e.config.livecount) ? void t() : (0 === e.config.livecount && alert("zero livecount lolos!!"), void e.run())
                }, e.config.delay))
            }, void e.run())
        }
    }, TTimer.noConflict = function() {
        return exports.TTimer = originalGlobalValue, TTimer
    };
    var originalGlobalValue = exports.TMagicElement;
    TMagicElement.prototype = {
        constructor: TMagicElement,
        parseElementAtribute: function(elem, theAttribute, useMasterDefaultOption) {
            var options, str = "",
                attrs = elem.attributes;
            void 0 === theAttribute && (theAttribute = MasterElement.createNewAtribbute()), theAttribute.configSchema === !1 && (theAttribute.configSchema = elem.getAttribute(this.config.specialid));
            for (var _prop in theAttribute)
                if ("el" != _prop) {
                    var ov = elem.getAttribute(_prop);
                    try {
                        tmp = null === ov ? theAttribute[_prop] : ov.trim()
                    } catch (e) {
                        tmp = ""
                    }
                    if (null !== tmp && "" != tmp && void 0 !== tmp || "id" === _prop)
                        if (tmp !== !1 && "{" == tmp.substring(0, 1)) {
                            tmp = tmp.replace(/\n/g, "").replace(new RegExp(" ", "g"), "");
                            var origin = tmp;
                            try {
                                theAttribute[_prop] = tmp && JSON.parse(tmp)
                            } catch (e) {
                                try {
                                    var atmp = tmp.substring(1, tmp.length - 1).replace("https://", "yxzog").split(",");
                                    tmp = "", $.each(atmp, function(t, e) {
                                        var i = e.split(":");
                                        tmp += '"' + i[0].trim() + '":' + i[1] + ","
                                    }), tmp = "{" + tmp.substring(0, tmp.length - 1).replace("yxzog", "https://") + "}", theAttribute[_prop] = tmp && JSON.parse(tmp)
                                } catch (e) {
                                    tmp = origin, tmp = tmp.substring(1, tmp.length - 1).trim();
                                    var aa = tmp.split(";");
                                    theAttribute[_prop] = {}, $.each(aa, function(i, ac) {
                                        var ab = ac.split(":");
                                        if (ab[0] = ab[0].trim(), "" !== ab[0]) try {
                                            theAttribute[_prop][ab[0]] = eval(ab[1])
                                        } catch (e) {
                                            theAttribute[_prop][ab[0]] = ab[1]
                                        }
                                    })
                                }
                                void 0 !== theAttribute[_prop].url && -1 != theAttribute[_prop].url.indexOf("//") && (theAttribute[_prop].url = "https://" + theAttribute[_prop].url.split("//")[1])
                            }
                        } else if ("region" == _prop) {
                        if (tmp !== !1) {
                            var regname = tmp.split("/")[0],
                                rgvalue = void 0 === tmp.split("/")[1] ? !0 : tmp.split("/")[1];
                            theAttribute[_prop] = regname, void 0 === MasterElement.regionStates[regname] && (MasterElement.regionStates[regname] = "true" == rgvalue ? !0 : "false" == rgvalue ? !1 : !0)
                        }
                    } else if ("id" == _prop) "" === tmp && (tmp = "id-" + theAttribute.configSchema + this.list.length.toString(), null === document.getElementById(theAttribute.configSchema) && elem.setAttribute("id", tmp)), theAttribute.id = tmp;
                    else try {
                        "configSchema" == _prop ? null === document.getElementById(theAttribute.configSchema) && (theAttribute[_prop] = tmp) : theAttribute[_prop] = "eval" == _prop || "jexec" == _prop ? tmp : eval(tmp)
                    } catch (e) {
                        theAttribute[_prop] = tmp
                    }
                }
            theAttribute.el = elem, theAttribute.ejQ = $("#" + theAttribute.id), this.list.push(theAttribute), MasterElement.list.push(theAttribute), this.config.directExecute === !1 && (void 0 !== theAttribute.autoRefresh && (theAttribute.autoRefresh = MasterElement.timer.forceFromDefault ? $.extend({}, {}, MasterElement.timer.defaultValue) : $.extend({}, MasterElement.timer.defaultValue, theAttribute.autoRefresh)), void 0 !== theAttribute.options && (theAttribute.options = MasterElement.options.forceFromDefault ? $.extend({}, {}, MasterElement.options.defaultValue) : $.extend({}, MasterElement.options.defaultValue, theAttribute.options)))
        },
        getAttributes: function() {
            for (var t = this.config.selector === !1 ? document.getElementsByTagName(this.config.tagName) : document.querySelectorAll(this.config.selector), e = 0, i = t.length; i > e; e++)
                if (void 0 !== t[e] && null !== t[e].getAttribute(this.config.specialid)) {
                    var n = t[e];
                    this.parseElementAtribute(n)
                }
            return this
        },
        execute: function() {
            if (this.config.directExecute) return this;
            var parent = this,
                schema;
            return $.each(this.list, function(idx, theAttribute) {
                parent.index = idx, void 0 !== theAttribute.options.configSchema && (theAttribute.configSchema = theAttribute.options.configSchema), theAttribute.options = $.extend({}, MasterElement.configSchema[theAttribute.configSchema], theAttribute.options), theAttribute.options.configSchema = theAttribute.configSchema, theAttribute.options.elResult = "#" + theAttribute.id, theAttribute.options.LabelName = theAttribute.label;
                try {
                    if ("object" == typeof theAttribute.autoRefresh) {
                        var rf = new autoRefresh(theAttribute.options);
                        schema = theAttribute.configSchema, void 0 === MasterElement.configSchema[schema] && (MasterElement.configSchema[schema] = {}, logErr('Warning!!, configSchema "' + schema + "\" doesn't exist!..")), rf.attribute = theAttribute, rf.fetParam.configSchema = theAttribute.configSchema, rf.fetParam.elResult = "#" + theAttribute.id, rf.element = theAttribute.ejQ, rf.timer.setConfig(theAttribute.autoRefresh), rf.execute(theAttribute)
                    } else theAttribute.exec !== !1 && void 0 !== theAttribute.exec ? theAttribute.exec(theAttribute.options) : theAttribute.eval !== !1 && eval(theAttribute.eval)
                } catch (e) {
                    alert(e)
                }
            }), this
        },
        find: function(t) {
            return $.each(this.list, function(e, i) {
                return i.id == t ? i : void 0
            }), null
        }
    }, autoRefresh.prototype = $.extend({}, autoRefresh.prototype, autoRefreshBase.prototype);
    var tmrProto = autoRefresh.prototype;
    tmrProto.constructor = autoRefresh, tmrProto.updater = {
        ticker: {
            count: 0,
            paused: !1
        }
    }, tmrProto.execute = function(t) {
        function e() {
            dataFetcher.get(i.fetParam, {
                beforeExecute: i.executeFirst,
                onExecute: i.executeCore,
                aferExecute: i.executeAfter
            }), i.timer.starttime = i.timer.gettick()
        }
        var i = this,
            n = "all";
        if (this.count = 0, t.region !== !1 && (n = t.region), void 0 !== MasterElement.regionStates[n] && 0 == MasterElement.regionStates[n]) return t.ejQ.html(""), void logErr("region " + n + " has been disabled");
        if (i.fetParam.configSchema !== !1) {
            {
                i.fetParam.configSchema
            }
            i._prepared = !1, i.fetParam.elResult = "#" + t.id, i.fetParam = $.extend({}, MasterElement.configSchema[i.configSchema], i.fetParam)
        }
        i.prepare(), this.timer.config.exec = e, this.timer.execute()
    }, exports.TMagicElement = TMagicElement, exports.TTimer = TTimer, exports.autoRefresh = autoRefresh, fetch.prototype = {
        constructor: fetch
    }, $.fn.fetch = function(t, e) {
        new fetch(this, t, e);
        return this
    }
}).call(this),
    function() {
        var t, e, i, n, s = function(t, e) {
                return function() {
                    return t.apply(e, arguments)
                }
            },
            a = {}.hasOwnProperty,
            r = function(t, e) {
                function i() {
                    this.constructor = t
                }
                for (var n in e) a.call(e, n) && (t[n] = e[n]);
                return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
            };
        t = function() {
                function t(t, e, i, n) {
                    this.el = t, this.title = e, this.description = i, this.options = n, this.wrapElement = s(this.wrapElement, this)
                }
                return t.prototype.wrapElement = function(t) {
                    var e;
                    return e = this.el.wrap('<figure class="' + this.options.cls + "-container " + t + '" itemscope="itemscope" itemtype="http://schema.org/Photograph"></figure>').parent(), e.width(this.el.attr("width") || this.el[0].style.width || this.el.width()), this.el.css({
                        width: "100%"
                    }), this.el.attr("itemprop", "image"), this.el.attr("width", ""), e
                }, t.prototype.generateTitleHtml = function(t) {
                    return t ? '<span class="caption-title"  itemprop="name" >' + t + "</span>" : ""
                }, t.prototype.generateDescriptionHtml = function(t) {
                    return t ? '<span class="caption-description"  itemprop="description" >' + t + "</span>" : ""
                }, t
            }(), e = function() {
                function t(t, e) {
                    var i;
                    this.el = t, i = {
                        type: "animated",
                        cls: "CaptionerJs",
                        options: {
                            startClosed: !0
                        }
                    }, this.options = $.extend({}, i, e), console.log("options", this.options)
                }
                return t.prototype.addCaption = function(t, e) {
                    if (!this.el.attr("data-captioner-enabled")) {
                        if (this.el.attr("data-captioner-enabled", !0), "stacked" === this.options.type) return new n(this.el, t, e, this.options, "stacked");
                        if ("static" === this.options.type) return new n(this.el, t, e, this.options, "static");
                        if ("animated" === this.options.type) return new i(this.el, t, e, this.options);
                        throw new Error("Invalid caption type : " + this.options.type)
                    }
                }, t.prototype.removeCaption = function() {
                    return this.el.attr("data-captioner-enabled", !1), this.el.find("figcaption").remove(), this.el.unrap()
                }, t
            }(), i = function(t) {
                function e(t, i, n, s) {
                    var a, r;
                    this.el = t, this.title = i, this.description = n, this.options = s, this.options.options.startClosed = !0, e.__super__.constructor.call(this, this.el, this.title, this.description, this.options), r = this.wrapElement("bottom-animated"), a = $('<figcaption class="closed">\n    ' + this.generateTitleHtml(this.title) + "\n    " + this.generateCloseButtonHtml() + "\n    " + this.generateDescriptionHtml(this.description) + "\n</figcaption>"), a.hide(), r.append(a), this.captionHeight = a.outerHeight(), a.css({
                        bottom: -this.captionHeight
                    }), this.options.options.startClosed && a.addClass("open").removeClass("closed"), this.openCloseCaption(a);
                    var o = this;
                    window.setTimeout(function() {
                        if (a.show(), a.hasClass("closed")) return a.removeClass("closed"), a.addClass("open"), void a.css("bottom", 0);
                        a.addClass("closed"), a.removeClass("open");
                        var t = -1 * o.captionHeight + a.find(".caption-title").position().top + a.find(".caption-title").outerHeight();
                        a.css("bottom", t)
                    }, 100)
                }
                return r(e, t), e.prototype.openCloseCaption = function(t) {
                    var e;
                    return e = this, t.on("mouseenter", function() {
                        t.hasClass("closed") && (t.removeClass("closed"), t.addClass("open"), t.css("bottom", 0))
                    }), t.on("mouseleave", function() {
                        return t.hasClass("open") ? (t.addClass("closed"), t.removeClass("open"), t.css("bottom", -1 * e.captionHeight + t.find(".caption-title").position().top + t.find(".caption-title").outerHeight())) : void 0
                    }), t.on("click", {
                        value: "image_caption_clicked"
                    }, function() {
                        return t.hasClass("closed") ? (t.removeClass("closed"), t.addClass("open"), void t.css("bottom", 0)) : (t.addClass("closed"), t.removeClass("open"), t.css("bottom", -1 * e.captionHeight + t.find(".caption-title").position().top + t.find(".caption-title").outerHeight()))
                    })
                }, e.prototype.generateCloseButtonHtml = function() {
                    return '<span class="caption-actions caption-close">&caron;</span><span class="caption-actions caption-open">&circ;</span>'
                }, e
            }(t), n = function(t) {
                function e(t, i, n, s, a) {
                    var r, o;
                    this.el = t, this.title = i, this.description = n, this.options = s, e.__super__.constructor.call(this, this.el, this.title, this.description, this.options), o = this.wrapElement(a || "stacked"), r = "<figcaption>\n    " + this.generateTitleHtml(this.title) + "\n    " + this.generateDescriptionHtml(this.description) + "\n</figcaption>", o.append($(r))
                }
                return r(e, t), e
            }(t),
            function(t) {
                t(document).ready(function() {
                    return t(document).find("[role=caption]").each(function(e, i) {
                        t(i).CaptionerJs()
                    })
                }), t.fn.CaptionerJs = function(i) {
                    var n, s, a, r;
                    return r = decodeURIComponent(this.attr("title") || this.attr("data-title") || ""), s = decodeURIComponent(this.attr("alt") || this.attr("data-description") || ""), i = i || {}, n = {
                        type: this.data("captioner-type") || "static",
                        cls: this.data("captioner-class") || "CaptionerJs",
                        options: {
                            startClosed: this.data("captioner-start-closed") || !1
                        }
                    }, i = t.extend({}, n, i), a = new e(this, i), a.addCaption(r, s), this
                }
            }(jQuery)
    }.call(this), dataFetcher.chkBrowser();
