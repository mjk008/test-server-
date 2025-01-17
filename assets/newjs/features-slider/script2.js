function BeoCustomEvent(n, t) {
    var i;
    return window.CustomEvent ? i = new CustomEvent(n, {
        bubbles: !0,
        cancelable: !0,
        detail: t
    }) : (i = document.createEvent("Event"), i.initEvent(n, !0, !0, {
        detail: t
    }), i.detail = t), i
}

function BeoEvents(n, t, i, r) {
    r ? n.addEventListener ? n.addEventListener(t, i, !1) : n.attachEvent && n.attachEvent("on" + t, i) : n.removeEventListener ? n.removeEventListener(t, i, !1) : n.detachEvent && n.detachEvent("on" + t, i)
}

function BeoScrollModule(n, t) {
    function w() {
        i || (i = new n)
    }

    function y() {
        (f = b(), !i && f && w(), i) && (f ? nt() : g())
    }

    function b() {
        return c == "all" ? !0 : c == "desktop" && BeoGlobal._vwOuter > BeoGlobal._mobileBreakpointW ? !0 : c == "mobile" && BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW ? !0 : !1
    }

    function a() {
        u && (clearTimeout(s), i.layoutUpdate(), h(), i.moduleTop + BeoGlobal._reliableSh < 0 && (s = setTimeout(a, 2e3)))
    }

    function h() {
        f && !v && (l = BeoGlobal._windowScrollY > i.moduleTop && BeoGlobal._windowScrollY < i.moduleBottom ? !0 : !1, l ? r || k() : r && p(), r && i.multipleSections && BeoGlobal._windowScrollY > i.moduleCenter && i.startOtherSections())
    }

    function p() {
        e && i.stop();
        r = e = !1;
        clearTimeout(o)
    }

    function k() {
        r = !0;
        clearTimeout(o);
        o = setTimeout(d, i.initDelay);
        try {
            i.prestart()
        } catch (n) {}
    }

    function d() {
        i.start();
        e = !0;
        i._killScroll && (v = !0, BeoEvents(window, "scroll", h, !1))
    }

    function g() {
        u && (u = !1, e ? p() : r && clearTimeout(o), i.deactivate())
    }

    function nt() {
        (i.resized(), u) || (u = !0, i.activate(), clearTimeout(s), s = setTimeout(a, 1e3), h())
    }
    var c = t,
        f = !1,
        l = !1,
        r = !1,
        e = !1,
        u = !1,
        v = !1,
        o, s, i;
    BeoEvents(window, "resize", y, !0);
    y(null);
    BeoEvents(window, "LayoutUpdate", a, !0);
    BeoEvents(window, "scroll", h, !0)
}
function BeoImage(n, t, i, r, u, f, e) {
    function a(n) {
        i && r || (i = o.naturalWidth, r = o.naturalHeight);
        l = i / r;
        f && f.call(s, n)
    }
    var s = this,
        o, l, h, c;
    o = i && r ? new Image(i, r) : new Image;
    s.img = o;
    u ? o.className = u : o.style.position = "absolute";
    s.load = function() {
        o.onload = a;
        o.src = n;
        o.onmousedown = function(n) {
            n && n.preventDefault && n.preventDefault()
        };
        t && (e ? t.insertBefore(o, t.firstChild) : t.appendChild(o))
    };
    s.destroy = function() {
        o.src = "";
        o = null
    };
    s.scaleTo = function(n, t, u, f, e) {
        var s = t / u,
            a = l;
        n == "fill" || n == "fit" && (s = l, a = t / u);
        s < a ? (h = Math.ceil(u * l), c = u) : (h = t, c = Math.ceil(t / l));
        n != "none" ? (o.style.width = h + "px", o.style.height = c + "px") : (h = i, c = r);
        f == "center" ? o.style.marginLeft = Math.round((t - h) * .5) + "px" : f == "left" ? o.style.marginLeft = "0px" : f == "right" && (o.style.marginLeft = Math.round(t - h) + "px");
        e == "center" ? o.style.marginTop = Math.round((u - c) * .5) + "px" : e == "top" ? o.style.marginTop = "0px" : e == "bottom" && (o.style.marginTop = Math.round(u - c) + "px")
    };
    s.getW = function() {
        return h
    };
    s.getH = function() {
        return c
    }
}
function BeoUSP() {
    function k(n) {
        (r.newBlock(e[n.detail], n.detail + 1), h) || (h = !0, p())
    }

    function d() {
        h = !1;
        w();
        r.reset()
    }

    function p() {
        c || (f.toggle(!0, !0), f.addListeners())
    }

    function w() {
        c || (f.removeListeners(), f.toggle(!1, !0), f.instantOut())
    }

    function g(n) {
        if (s != n.detail)
            if (s = n.detail, n.detail == 0) {
                r.hide();
                w();
                for (var t = 0; t < u; t++) e[t].hide()
            } else b(!0)
    }

    function b(n) {
        r.show();
        n && p();
        for (var t = 0; t < u; t++) e[t].show()
    }
    var t = this,
        l, o, i, y, f, r, s, h;
    t.moduleTop = 0;
    t.moduleBottom = 0;
    l = .05;
    t.initDelay = 50;
    var nt = _BeoUSPCount,
        a = !1,
        c = !1,
        n = document.getElementsByClassName("beousp")[_BeoUSPCount];
    _BeoUSPCount++;
    var v = n.getElementsByClassName("block"),
        u = v.length,
        e = [];
    for (o = 0; o < u; o++) e.push(new BeoUSPBlock(o, v[o], n, u));
    i = 0;
    y = n.getAttribute("data-theme") || "0";
    y == "1" && (n.className += " inverted");
    f = new BeoUSPRoundBtn(n, n, !0);
    r = new BeoUSPBG(n);
    BeoEvents(n, "blockOpen", k, !0);
    BeoEvents(n, "blockClose", d, !0);
    BeoEvents(n, "bgVideoTakeOver", g, !0);
    s = -1;
    h = !1;
    t.start = function() {
        a || (a = !0, r.start())
    };
    t.stop = function() {
        s == 0 && (s = -1, b(!1));
        h && n.dispatchEvent(BeoCustomEvent("blockClose", 0))
    };
    t.deactivate = function() {};
    t.activate = function() {};
    t.resized = function() {
        var t, f;
        for (BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW ? (c = !0, n.style.height = "auto", i = 115 * u) : (c = !1, i = Math.max(600, BeoGlobal._reliableSh), t = BeoGlobal._sw * 9 / 16, Math.abs(t - i) < 100 && Math.max(t, i) > 400 && (i = t), n.style.height = i + "px"), f = 0; f < u; f++) e[f].resized(i);
        r.resized(i)
    };
    t.layoutUpdate = function() {
        t.moduleTop = BeoGlobal.offsetY(n) - BeoGlobal._reliableSh - BeoGlobal._margins[0] + BeoGlobal._reliableSh * l;
        t.moduleBottom = t.moduleTop + i + BeoGlobal._reliableSh * (1 - l * 2)
    }
}

function BeoUSPBlock(n, t, i, r) {
    function yt() {
        a || (y.style.opacity = .15, k ? (TweenLite.to(v, .5, {
            y: -100,
            ease: Cubic.easeOut
        }), TweenLite.to(it, .6, {
            y: -100,
            ease: Cubic.easeOut
        }), ft.style.opacity = 1, g.over()) : TweenLite.to(v, .2, {
            y: -2,
            ease: Cubic.easeOut
        }))
    }

    function pt() {
        a || (y.style.opacity = 0, k ? (TweenLite.to(v, .7, {
            y: 0,
            ease: Cubic.easeOut
        }), TweenLite.to(it, .7, {
            y: 0,
            ease: Cubic.easeOut
        }), ft.style.opacity = 0, g.out()) : TweenLite.to(v, .3, {
            y: 0,
            ease: Cubic.easeOut
        }))
    }

    function wt() {
        a || i.dispatchEvent(BeoCustomEvent("blockOpen", n))
    }

    function bt(i) {
        if (f || TweenLite.set(v, {
                x: c / 2,
                top: 20,
                rotation: 90,
                transformOrigin: "0 0",
                delay: e
            }), k && (f || (v.style.opacity = 0, g.toggle(!1, !1), i.detail != n && lt()), TweenLite.to(it, .2, {
                autoAlpha: 0,
                ease: Quad.easeOut
            })), i.detail == n) {
            a = !0;
            t.className = "block open";
            f ? (nt = 500, o ? (o.resized(), nt = o._h + d.offsetHeight + 90) : nt = d.offsetHeight + 240, TweenLite.killTweensOf(t, !1, {
                height: !0
            }), TweenLite.to(t, l, {
                height: nt + "px",
                ease: p,
                delay: e,
                onComplete: at
            }), g.rotate(), y.style.opacity = .15) : (v.style.opacity = 0, u = n * c, s = rt, BeoGlobal._isTouch ? t.style.width = s + "px" : setTimeout(function() {
                y.style.opacity = 0
            }, e * 1e3 + 1e3), TweenLite.killTweensOf(t, !1, {
                x: !0,
                width: !0
            }), TweenLite.to(t, l, {
                x: u,
                width: s + "px",
                ease: p,
                delay: e,
                onComplete: at
            }), h = u, w = s);
            e = 0;
            k = !1;
            return
        }
        t.className = "block";
        y.style.opacity = 0;
        d.style.opacity = 0;
        f && g.unrotate();
        o && o.animOut();
        f || k || !a || lt();
        a = !1;
        f ? (TweenLite.killTweensOf(t, !1, {
            height: !0
        }), TweenLite.to(t, l, {
            height: "50px",
            ease: p,
            delay: e
        })) : (n < i.detail ? (tt = 0, u = n * c, s = c) : (tt = 1, u = rt + (n - 1) * c, s = c), (h != u || w != s) && (TweenLite.killTweensOf(t, !1, {
            x: !0,
            width: !0
        }), TweenLite.to(t, l, {
            x: u,
            width: s + "px",
            ease: p,
            delay: e
        })), h = u, w = s);
        e = 0;
        k = !1
    }

    function kt() {
        f ? (TweenLite.killTweensOf(t), TweenLite.to(t, l, {
            height: "115px",
            ease: p,
            delay: e
        })) : (u = n * BeoGlobal._sw / r, s = BeoGlobal._sw / r, (h != u || w != s) && (TweenLite.killTweensOf(t, !1, {
            x: !0,
            width: !0
        }), TweenLite.to(t, l, {
            x: u,
            width: s + "px",
            ease: p,
            delay: e
        })), h = u, w = s);
        a && (t.className = "block", y.style.opacity = 0, a = !1, d.style.opacity = 0, o && o.animOut(), f && g.unrotate());
        f || (TweenLite.set(it, {
            y: 0
        }), ft.style.opacity = 0, g.instantOut());
        TweenLite.to(it, .6, {
            autoAlpha: 1,
            delay: e + l,
            ease: Quad.easeInOut,
            onStart: g.toggle,
            onStartParams: [!0, !1]
        });
        f || TweenLite.set(v, {
            opacity: 1,
            x: 30,
            y: 0,
            top: ut / 2,
            rotation: 0,
            transformOrigin: "0 0"
        });
        e = ct;
        k = !0
    }

    function lt() {
        TweenLite.set(v, {
            opacity: 1,
            y: -8,
            delay: e + l + n * .02 - .01
        });
        TweenLite.to(v, .6, {
            y: 0,
            delay: e + l + n * .02,
            ease: Cubic.easeOut
        })
    }

    function at() {
        f || (y.style.opacity = 0);
        o && o.animIn();
        d.style.opacity = 1
    }
    var b = this,
        ut = 0,
        k = !0,
        a = !1,
        f = BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW,
        v = t.getElementsByClassName("label")[0],
        it = t.getElementsByClassName("front")[0],
        d = t.getElementsByClassName("text")[0],
        st = t.getElementsByClassName("foreground")[0],
        o, ft, ht, et, y;
    st && (o = new BeoUSPForeground(st, t, i, null));
    ft = it.getElementsByTagName("p")[0];
    b._bgColor = t.getAttribute("data-bg") || "#f1f1f1";
    b._bgImgUrl = t.getAttribute("data-bgImg") || "";
    f && (b._bgImgUrl = t.getAttribute("data-bgImgMobile") || "");
    b._videoUrl = t.getAttribute("data-yt") || "";
    f && b._videoUrl != "" && !o && (o = new BeoUSPForeground(null, t, i, {
        _yt: b._videoUrl,
        _thumbnail: t.getAttribute("data-mobileThumbnail")
    }));
    var c = 54,
        rt = 0,
        vt = t.getAttribute("data-theme") || "0";
    vt == "1" && (d.className += " inverted");
    ht = i.getAttribute("data-theme") || "0";
    et = "#000";
    ht == 1 && (et = "#FFF");
    y = document.createElement("div");
    y.className = "overlay";
    y.style.backgroundColor = et;
    t.insertBefore(y, t.firstChild);
    var l = .7,
        p = Quad.easeOut,
        ct = .1,
        e = ct,
        tt = 0,
        g = new BeoUSPRoundBtn(t, i, !1),
        ot = !1;
    b.resized = function(i) {
        ut = i;
        BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW ? (f = !0, k || a && (nt = 500, o ? (o.resized(), nt = o._h + d.offsetHeight + 90) : nt = d.offsetHeight + 240, TweenLite.killTweensOf(t, !1, {
            height: !0
        }), TweenLite.set(t, {
            height: nt + "px",
            ease: p
        }))) : (f = !1, rt = BeoGlobal._sw - (r - 1) * c, k ? (TweenLite.set(t, {
            x: n * BeoGlobal._sw / r,
            y: 0,
            width: BeoGlobal._sw / r + "px"
        }), BeoGlobal._vwOuter < 1300 ? TweenLite.set(v, {
            x: 15,
            top: ut / 2,
            rotation: 0,
            transformOrigin: "0 0"
        }) : TweenLite.set(v, {
            x: 30,
            top: ut / 2,
            rotation: 0,
            transformOrigin: "0 0"
        })) : (a ? (h = n * c, w = rt) : tt == 0 ? (h = n * c, w = c) : tt == 1 && (h = rt + (n - 1) * c, w = c), ot && (h = tt == 0 ? -s : BeoGlobal._sw), TweenLite.set(t, {
            x: h,
            y: 0,
            width: w + "px"
        })));
        o && o.resized()
    };
    f || BeoGlobal._isTouch || (BeoEvents(t, "mouseenter", yt, !0), BeoEvents(t, "mouseleave", pt, !0));
    BeoEvents(t, "click", wt, !0);
    BeoEvents(i, "blockOpen", bt, !0);
    BeoEvents(i, "blockClose", kt, !0);
    var h = 0,
        u = 0,
        w = 0,
        s = 0,
        nt = 0;
    b.hide = function() {
        if (ot = !0, !f) {
            if (a) {
                TweenLite.killTweensOf(t, !1, {
                    autoAlpha: !0
                });
                TweenLite.to(t, l, {
                    autoAlpha: 0,
                    ease: p,
                    delay: e
                });
                return
            }
            u = tt == 0 ? -s : BeoGlobal._sw;
            (h != u || w != s) && (TweenLite.killTweensOf(t, !1, {
                x: !0,
                width: !0
            }), TweenLite.to(t, l, {
                x: u,
                ease: p,
                delay: e
            }));
            h = u
        }
    };
    b.show = function() {
        if (ot = !1, !f) {
            if (a) {
                TweenLite.killTweensOf(t, !1, {
                    autoAlpha: !0
                });
                TweenLite.to(t, l, {
                    autoAlpha: 1,
                    ease: p,
                    delay: e
                });
                return
            }
            u = tt == 0 ? n * c : rt + (n - 1) * c;
            (h != u || w != s) && (TweenLite.killTweensOf(t, !1, {
                x: !0,
                width: !0
            }), TweenLite.to(t, l, {
                x: u,
                ease: p,
                delay: e
            }));
            h = u
        }
    };
    t.style.visibility = "visible"
}

function BeoUSPRoundBtn(n, t, i) {
    function c() {
        u.over()
    }

    function l() {
        u.out()
    }

    function a(n) {
        n.stopPropagation();
        t.dispatchEvent(BeoCustomEvent("blockClose", 0))
    }
    var u = this,
        r = document.createElement("div"),
        e, o, s, h, f;
    r.className = "roundBtn";
    e = document.createElement("div");
    e.className = "bg";
    TweenLite.set(e, {
        scale: 0,
        transformOrigin: "21px 21px"
    });
    o = document.createElement("div");
    o.className = "cross";
    i && (TweenLite.set(o, {
        rotation: 45
    }), r.style.opacity = 0);
    s = document.createElement("div");
    s.className = "a";
    o.appendChild(s);
    h = document.createElement("div");
    h.className = "b";
    o.appendChild(h);
    r.appendChild(e);
    r.appendChild(o);
    i || (f = document.createElement("div"), f.textContent = "Know More", f.className = "readmore", r.appendChild(f));
    n.appendChild(r);
    u.over = function() {
        TweenLite.to(e, .3, {
            scale: 1,
            transformOrigin: "21px 21px",
            ease: Cubic.easeOut
        });
        r.className = "roundBtn over";
        i || TweenLite.to(f, .4, {
            opacity: 1,
            delay: .1,
            ease: Cubic.easeInOut
        })
    };
    u.out = function() {
        TweenLite.to(e, .3, {
            scale: 0,
            transformOrigin: "21px 21px",
            ease: Cubic.easeOut
        });
        r.className = "roundBtn";
        i || (TweenLite.killTweensOf(f), TweenLite.to(f, .4, {
            opacity: 0,
            ease: Cubic.easeOut
        }))
    };
    u.instantOut = function() {
        TweenLite.killTweensOf(e);
        TweenLite.set(e, {
            scale: 0,
            transformOrigin: "21px 21px"
        });
        i || (TweenLite.killTweensOf(f), TweenLite.set(f, {
            opacity: 0
        }));
        r.className = "roundBtn"
    };
    u.toggle = function(n, t) {
        n ? t ? (TweenLite.set(r, {
            y: -8,
            opacity: 1,
            delay: .9
        }), TweenLite.to(r, .6, {
            y: 0,
            delay: .91,
            ease: Cubic.easeOut
        })) : r.style.opacity = 1 : (r.style.opacity = 0, t && TweenLite.to(r, .3, {
            y: -8,
            ease: Cubic.easeOut
        }))
    };
    u.rotate = function() {
        TweenLite.to(o, .5, {
            rotation: 45,
            delay: .5,
            ease: Cubic.easeInOut
        });
        TweenLite.to(r, .5, {
            delay: 0,
            y: -30,
            ease: Cubic.easeInOut
        });
        u.addListeners()
    };
    u.unrotate = function() {
        TweenLite.to(o, .5, {
            rotation: 0,
            delay: .5,
            ease: Cubic.easeInOut
        });
        TweenLite.to(r, .5, {
            delay: 0,
            y: 0,
            ease: Cubic.easeInOut
        });
        u.removeListeners()
    };
    u.addListeners = function() {
        BeoGlobal._isTouch || (BeoEvents(r, "mouseenter", c, !0), BeoEvents(r, "mouseleave", l, !0));
        BeoEvents(r, "click", a, !0)
    };
    u.removeListeners = function() {
        BeoGlobal._isTouch || (BeoEvents(r, "mouseenter", c, !1), BeoEvents(r, "mouseleave", l, !1));
        BeoEvents(r, "click", a, !1)
    }
}

function BeoUSPBG(n) {
    function w() {
        r.resized(h);
        try {
            t[o].img.style.opacity = 1
        } catch (e) {}
    }

    function k() {
        f.hide();
        i = !1;
        s ? s.updateYTid(v) : s = new BeoUSPVideoPlayer(v, n, !0);
        s.play();
        c = !0;
        BeoEvents(n, "videoStatus", y, !0)
    }

    function y(t) {
        n.dispatchEvent(BeoCustomEvent("bgVideoTakeOver", t.detail))
    }

    function d(t) {
        n.style.backgroundColor = t
    }

    function b() {
        try {
            t[o].img.style.opacity = 0
        } catch (n) {}
    }
    var r = this,
        u = document.createElement("div"),
        e, l, t, h;
    u.className = "bg";
    e = BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW;
    l = n.getAttribute("data-bgImg");
    e && (l = n.getAttribute("data-bgImgMobile"));
    t = [new BeoImage(l, u, null, null, "bgImg", w)];
    n.insertBefore(u, n.firstChild);
    var o = 0,
        a, p = !0,
        f, s, i = !1,
        c = !1,
        v;
    r.start = function() {
        t[0].load()
    };
    r.reset = function() {
        b();
        c && (BeoEvents(n, "videoStatus", y, !1), c = !1, s.stop());
        i && (f.hide(), i = !1);
        o = 0;
        r.resized(h);
        t[o].img.style.opacity = 1;
        clearTimeout(a)
    };
    r.newBlock = function(l, g) {
        b();
        c && (BeoEvents(n, "videoStatus", y, !1), c = !1, s.stop());
        var nt = l._bgImgUrl;
        e && l._videoUrl != "" && (nt = "");
        o = g;
        clearTimeout(a);
        nt == "" ? (n.style.backgroundColor = l._bgColor, p = !1) : (t[g] == undefined ? (t[g] = new BeoImage(nt, u, null, null, "bgImg", w), t[g].load(), n.style.backgroundColor = l._bgColor) : (r.resized(h), t[g].img.style.opacity = 1, a = setTimeout(d, 1e3, l._bgColor)), p = !0);
        e || l._videoUrl == "" ? i && (f.hide(), i = !1) : (v = l._videoUrl, f || (f = new BeoVideoPlayButton(u)), f.show(), i = !0, BeoEvents(u.getElementsByClassName("playBtn")[0], "click", k, !0))
    };
    r.hide = function() {
        TweenLite.to(u, .8, {
            autoAlpha: 0,
            ease: Cubic.easeInOut
        });
        i && (f.hide(), i = !1)
    };
    r.show = function() {
        TweenLite.to(u, .8, {
            autoAlpha: 1,
            ease: Cubic.easeInOut
        });
        i || (f.show(), i = !0)
    };
    h = 0;
    r.resized = function(n) {
        if (h = n, e = BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW, !e) try {
            t[o].scaleTo("fill", BeoGlobal._sw, h, "center", "center")
        } catch (i) {}
    }
}

(function(n, t) {
    "use strict";
    var ot = n.GreenSockGlobals = n.GreenSockGlobals || n,
        ct, o, at, ft, c;
    if (!ot.TweenLite) {
        var s, f, i, u, h, kt = function(n) {
                for (var r = n.split("."), i = ot, t = 0; r.length > t; t++) i[r[t]] = i = i[r[t]] || {};
                return i
            },
            y = kt("com.greensock"),
            e = 1e-10,
            dt = function(n) {
                for (var i = [], r = n.length, t = 0; t !== r; i.push(n[t++]));
                return i
            },
            gt = function() {},
            d = function() {
                var n = Object.prototype.toString,
                    t = n.call([]);
                return function(i) {
                    return null != i && (i instanceof Array || "object" == typeof i && !!i.push && n.call(i) === t)
                }
            }(),
            g = {},
            ni = function(i, r, u, f) {
                this.sc = g[i] ? g[i].sc : [];
                g[i] = this;
                this.gsClass = null;
                this.func = u;
                var e = [];
                this.check = function(o) {
                    for (var c, l, a, h, v, s = r.length, y = s; --s > -1;)(c = g[r[s]] || new ni(r[s], [])).gsClass ? (e[s] = c.gsClass, y--) : o && c.sc.push(this);
                    if (0 === y && u)
                        for (l = ("com.greensock." + i).split("."), a = l.pop(), h = kt(l.join("."))[a] = this.gsClass = u.apply(u, e), f && (ot[a] = h, v = "undefined" != typeof module && module.exports, !v && "function" == typeof define && define.amd ? define((n.GreenSockAMDPath ? n.GreenSockAMDPath + "/" : "") + i.split(".").pop(), [], function() {
                                return h
                            }) : i === t && v && (module.exports = h)), s = 0; this.sc.length > s; s++) this.sc[s].check()
                };
                this.check(!0)
            },
            st = n._gsDefine = function(n, t, i, r) {
                return new ni(n, t, i, r)
            },
            l = y._class = function(n, t, i) {
                return t = t || function() {}, st(n, [], function() {
                    return t
                }, i), t
            };
        st.globals = ot;
        var ti = [0, 0, 1, 1],
            ci = [],
            a = l("easing.Ease", function(n, t, i, r) {
                this._func = n;
                this._type = i || 0;
                this._power = r || 0;
                this._params = t ? ti.concat(t) : ti
            }, !0),
            tt = a.map = {},
            ht = a.register = function(n, t, i, r) {
                for (var o, u, e, f, s = t.split(","), h = s.length, c = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;)
                    for (u = s[h], o = r ? l("easing." + u, null, !0) : y.easing[u] || {}, e = c.length; --e > -1;) f = c[e], tt[u + "." + f] = tt[f + u] = o[f] = n.getRatio ? n : n[f] || new n
            };
        for (i = a.prototype, i._calcEnd = !1, i.getRatio = function(n) {
                if (this._func) return this._params[0] = n, this._func.apply(null, this._params);
                var i = this._type,
                    r = this._power,
                    t = 1 === i ? 1 - n : 2 === i ? n : .5 > n ? 2 * n : 2 * (1 - n);
                return 1 === r ? t *= t : 2 === r ? t *= t * t : 3 === r ? t *= t * t * t : 4 === r && (t *= t * t * t * t), 1 === i ? 1 - t : 2 === i ? t : .5 > n ? t / 2 : 1 - t / 2
            }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], f = s.length; --f > -1;) i = s[f] + ",Power" + f, ht(new a(null, null, 1, f), i, "easeOut", !0), ht(new a(null, null, 2, f), i, "easeIn" + (0 === f ? ",easeNone" : "")), ht(new a(null, null, 3, f), i, "easeInOut");
        tt.linear = y.easing.Linear.easeIn;
        tt.swing = y.easing.Quad.easeInOut;
        ct = l("events.EventDispatcher", function(n) {
            this._listeners = {};
            this._eventTarget = n || this
        });
        i = ct.prototype;
        i.addEventListener = function(n, t, i, r, f) {
            f = f || 0;
            var s, o, e = this._listeners[n],
                c = 0;
            for (null == e && (this._listeners[n] = e = []), o = e.length; --o > -1;) s = e[o], s.c === t && s.s === i ? e.splice(o, 1) : 0 === c && f > s.pr && (c = o + 1);
            e.splice(c, 0, {
                c: t,
                s: i,
                up: r,
                pr: f
            });
            this !== u || h || u.wake()
        };
        i.removeEventListener = function(n, t) {
            var i, r = this._listeners[n];
            if (r)
                for (i = r.length; --i > -1;)
                    if (r[i].c === t) return r.splice(i, 1), void 0
        };
        i.dispatchEvent = function(n) {
            var r, i, t, u = this._listeners[n];
            if (u)
                for (r = u.length, i = this._eventTarget; --r > -1;) t = u[r], t && (t.up ? t.c.call(t.s || i, {
                    type: n,
                    target: i
                }) : t.c.call(t.s || i))
        };
        var it = n.requestAnimationFrame,
            lt = n.cancelAnimationFrame,
            rt = Date.now || function() {
                return (new Date).getTime()
            },
            ut = rt();
        for (s = ["ms", "moz", "webkit", "o"], f = s.length; --f > -1 && !it;) it = n[s[f] + "RequestAnimationFrame"], lt = n[s[f] + "CancelAnimationFrame"] || n[s[f] + "CancelRequestAnimationFrame"];
        l("Ticker", function(n, t) {
            var r, a, f, s, c, i = this,
                y = rt(),
                o = t !== !1 && it,
                l = 500,
                p = 33,
                w = "tick",
                v = function(n) {
                    var t, e, u = rt() - ut;
                    u > l && (y += u - p);
                    ut += u;
                    i.time = (ut - y) / 1e3;
                    t = i.time - c;
                    (!r || t > 0 || n === !0) && (i.frame++, c += t + (t >= s ? .004 : s - t), e = !0);
                    n !== !0 && (f = a(v));
                    e && i.dispatchEvent(w)
                };
            ct.call(i);
            i.time = i.frame = 0;
            i.tick = function() {
                v(!0)
            };
            i.lagSmoothing = function(n, t) {
                l = n || 1 / e;
                p = Math.min(t, l, 0)
            };
            i.sleep = function() {
                null != f && (o && lt ? lt(f) : clearTimeout(f), a = gt, f = null, i === u && (h = !1))
            };
            i.wake = function() {
                null !== f ? i.sleep() : i.frame > 10 && (ut = rt() - l + 5);
                a = 0 === r ? gt : o && it ? it : function(n) {
                    return setTimeout(n, 0 | 1e3 * (c - i.time) + 1)
                };
                i === u && (h = !0);
                v(2)
            };
            i.fps = function(n) {
                return arguments.length ? (r = n, s = 1 / (r || 60), c = this.time + s, i.wake(), void 0) : r
            };
            i.useRAF = function(n) {
                return arguments.length ? (i.sleep(), o = n, i.fps(r), void 0) : o
            };
            i.fps(n);
            setTimeout(function() {
                o && 5 > i.frame && i.useRAF(!1)
            }, 1500)
        });
        i = y.Ticker.prototype = new y.events.EventDispatcher;
        i.constructor = y.Ticker;
        o = l("core.Animation", function(n, t) {
            if (this.vars = t = t || {}, this._duration = this._totalDuration = n || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = t.immediateRender === !0, this.data = t.data, this._reversed = t.reversed === !0, p) {
                h || u.wake();
                var i = this.vars.useFrames ? k : p;
                i.add(this, i._time);
                this.vars.paused && this.paused(!0)
            }
        });
        u = o.ticker = new y.Ticker;
        i = o.prototype;
        i._dirty = i._gc = i._initted = i._paused = !1;
        i._totalTime = i._time = 0;
        i._rawPrevTime = -1;
        i._next = i._last = i._onUpdate = i._timeline = i.timeline = null;
        i._paused = !1;
        at = function() {
            h && rt() - ut > 2e3 && u.wake();
            setTimeout(at, 2e3)
        };
        at();
        i.play = function(n, t) {
            return null != n && this.seek(n, t), this.reversed(!1).paused(!1)
        };
        i.pause = function(n, t) {
            return null != n && this.seek(n, t), this.paused(!0)
        };
        i.resume = function(n, t) {
            return null != n && this.seek(n, t), this.paused(!1)
        };
        i.seek = function(n, t) {
            return this.totalTime(Number(n), t !== !1)
        };
        i.restart = function(n, t) {
            return this.reversed(!1).paused(!1).totalTime(n ? -this._delay : 0, t !== !1, !0)
        };
        i.reverse = function(n, t) {
            return null != n && this.seek(n || this.totalDuration(), t), this.reversed(!0).paused(!1)
        };
        i.render = function() {};
        i.invalidate = function() {
            return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
        };
        i.isActive = function() {
            var t, n = this._timeline,
                i = this._startTime;
            return !n || !this._gc && !this._paused && n.isActive() && (t = n.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
        };
        i._enabled = function(n, t) {
            return h || u.wake(), this._gc = !n, this._active = this.isActive(), t !== !0 && (n && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !n && this.timeline && this._timeline._remove(this, !0)), !1
        };
        i._kill = function() {
            return this._enabled(!1, !1)
        };
        i.kill = function(n, t) {
            return this._kill(n, t), this
        };
        i._uncache = function(n) {
            for (var t = n ? this : this.timeline; t;) t._dirty = !0, t = t.timeline;
            return this
        };
        i._swapSelfInParams = function(n) {
            for (var t = n.length, i = n.concat(); --t > -1;) "{self}" === n[t] && (i[t] = this);
            return i
        };
        i._callback = function(n) {
            var t = this.vars;
            t[n].apply(t[n + "Scope"] || t.callbackScope || this, t[n + "Params"] || ci)
        };
        i.eventCallback = function(n, t, i, r) {
            if ("on" === (n || "").substr(0, 2)) {
                var u = this.vars;
                if (1 === arguments.length) return u[n];
                null == t ? delete u[n] : (u[n] = t, u[n + "Params"] = d(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, u[n + "Scope"] = r);
                "onUpdate" === n && (this._onUpdate = t)
            }
            return this
        };
        i.delay = function(n) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + n - this._delay), this._delay = n, this) : this._delay
        };
        i.duration = function(n) {
            return arguments.length ? (this._duration = this._totalDuration = n, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== n && this.totalTime(this._totalTime * (n / this._duration), !0), this) : (this._dirty = !1, this._duration)
        };
        i.totalDuration = function(n) {
            return this._dirty = !1, arguments.length ? this.duration(n) : this._totalDuration
        };
        i.time = function(n, t) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(n > this._duration ? this._duration : n, t)) : this._time
        };
        i.totalTime = function(n, t, i) {
            if (h || u.wake(), !arguments.length) return this._totalTime;
            if (this._timeline) {
                if (0 > n && !i && (n += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var f = this._totalDuration,
                        r = this._timeline;
                    if (n > f && !i && (n = f), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? f - n : n) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                        for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                }
                this._gc && this._enabled(!0, !1);
                (this._totalTime !== n || 0 === this._duration) && (v.length && nt(), this.render(n, t, !1), v.length && nt())
            }
            return this
        };
        i.progress = i.totalProgress = function(n, t) {
            var i = this.duration();
            return arguments.length ? this.totalTime(i * n, t) : i ? this._time / i : this.ratio
        };
        i.startTime = function(n) {
            return arguments.length ? (n !== this._startTime && (this._startTime = n, this.timeline && this.timeline._sortChildren && this.timeline.add(this, n - this._delay)), this) : this._startTime
        };
        i.endTime = function(n) {
            return this._startTime + (0 != n ? this.totalDuration() : this.duration()) / this._timeScale
        };
        i.timeScale = function(n) {
            if (!arguments.length) return this._timeScale;
            if (n = n || e, this._timeline && this._timeline.smoothChildTiming) {
                var t = this._pauseTime,
                    i = t || 0 === t ? t : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / n
            }
            return this._timeScale = n, this._uncache(!1)
        };
        i.reversed = function(n) {
            return arguments.length ? (n != this._reversed && (this._reversed = n, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        };
        i.paused = function(n) {
            if (!arguments.length) return this._paused;
            var t, r, i = this._timeline;
            return n != this._paused && i && (h || n || u.wake(), t = i.rawTime(), r = t - this._pauseTime, !n && i.smoothChildTiming && (this._startTime += r, this._uncache(!1)), this._pauseTime = n ? t : null, this._paused = n, this._active = this.isActive(), !n && 0 !== r && this._initted && this.duration() && (t = i.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale, this.render(t, t === this._totalTime, !0))), this._gc && !n && this._enabled(!0, !1), this
        };
        ft = l("core.SimpleTimeline", function(n) {
            o.call(this, 0, n);
            this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        i = ft.prototype = new o;
        i.constructor = ft;
        i.kill()._gc = !1;
        i._first = i._last = i._recent = null;
        i._sortChildren = !1;
        i.add = i.insert = function(n, t) {
            var i, r;
            if (n._startTime = Number(t || 0) + n._delay, n._paused && this !== n._timeline && (n._pauseTime = n._startTime + (this.rawTime() - n._startTime) / n._timeScale), n.timeline && n.timeline._remove(n, !0), n.timeline = n._timeline = this, n._gc && n._enabled(!0, !0), i = this._last, this._sortChildren)
                for (r = n._startTime; i && i._startTime > r;) i = i._prev;
            return i ? (n._next = i._next, i._next = n) : (n._next = this._first, this._first = n), n._next ? n._next._prev = n : this._last = n, n._prev = i, this._recent = n, this._timeline && this._uncache(!0), this
        };
        i._remove = function(n, t) {
            return n.timeline === this && (t || n._enabled(!1, !0), n._prev ? n._prev._next = n._next : this._first === n && (this._first = n._next), n._next ? n._next._prev = n._prev : this._last === n && (this._last = n._prev), n._next = n._prev = n.timeline = null, n === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
        };
        i.render = function(n, t, i) {
            var u, r = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = n; r;) u = r._next, (r._active || n >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (n - r._startTime) * r._timeScale, t, i) : r.render((n - r._startTime) * r._timeScale, t, i)), r = u
        };
        i.rawTime = function() {
            return h || u.wake(), this._totalTime
        };
        var r = l("TweenLite", function(t, i, u) {
                if (o.call(this, i, u), this.render = r.prototype.render, null == t) throw "Cannot tween a null target.";
                this.target = t = "string" != typeof t ? t : r.selector(t) || t;
                var s, f, h, l = t.jquery || t.length && t !== n && t[0] && (t[0] === n || t[0].nodeType && t[0].style && !t.nodeType),
                    c = this.vars.overwrite;
                if (this._overwrite = c = null == c ? ei[r.defaultOverwrite] : "number" == typeof c ? c >> 0 : ei[c], (l || t instanceof Array || t.push && d(t)) && "number" != typeof t[0])
                    for (this._targets = h = dt(t), this._propLookup = [], this._siblings = [], s = 0; h.length > s; s++) f = h[s], f ? "string" != typeof f ? f.length && f !== n && f[0] && (f[0] === n || f[0].nodeType && f[0].style && !f.nodeType) ? (h.splice(s--, 1), this._targets = h = h.concat(dt(f))) : (this._siblings[s] = et(f, this, !1), 1 === c && this._siblings[s].length > 1 && bt(f, this, null, 1, this._siblings[s])) : (f = h[s--] = r.selector(f), "string" == typeof f && h.splice(s + 1, 1)) : h.splice(s--, 1);
                else this._propLookup = {}, this._siblings = et(t, this, !1), 1 === c && this._siblings.length > 1 && bt(t, this, null, 1, this._siblings);
                (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -e, this.render(-this._delay))
            }, !0),
            vt = function(t) {
                return t && t.length && t !== n && t[0] && (t[0] === n || t[0].nodeType && t[0].style && !t.nodeType)
            },
            li = function(n, t) {
                var i, r = {};
                for (i in n) wt[i] || i in t && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!w[i] || w[i] && w[i]._autoCSS) || (r[i] = n[i], delete n[i]);
                n.css = r
            };
        i = r.prototype = new o;
        i.constructor = r;
        i.kill()._gc = !1;
        i.ratio = 0;
        i._firstPT = i._targets = i._overwrittenProps = i._startAt = null;
        i._notifyPluginsOfEnabled = i._lazy = !1;
        r.version = "1.18.0";
        r.defaultEase = i._ease = new a(null, null, 1, 1);
        r.defaultOverwrite = "auto";
        r.ticker = u;
        r.autoSleep = 120;
        r.lagSmoothing = function(n, t) {
            u.lagSmoothing(n, t)
        };
        r.selector = n.$ || n.jQuery || function(t) {
            var i = n.$ || n.jQuery;
            return i ? (r.selector = i, i(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
        };
        var v = [],
            yt = {},
            ii = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
            ri = function(n) {
                for (var i, t = this._firstPT, r = 1e-6; t;) i = t.blob ? n ? this.join("") : this.start : t.c * n + t.s, t.r ? i = Math.round(i) : r > i && i > -r && (i = 0), t.f ? t.fp ? t.t[t.p](t.fp, i) : t.t[t.p](i) : t.t[t.p] = i, t = t._next
            },
            ui = function(n, t, i, r) {
                var l, v, a, e, y, c, f, u = [n, t],
                    s = 0,
                    o = "",
                    h = 0;
                for (u.start = n, i && (i(u), n = u[0], t = u[1]), u.length = 0, l = n.match(ii) || [], v = t.match(ii) || [], r && (r._next = null, r.blob = 1, u._firstPT = r), y = v.length, e = 0; y > e; e++) f = v[e], c = t.substr(s, t.indexOf(f, s) - s), o += c || !e ? c : ",", s += c.length, h ? h = (h + 1) % 5 : "rgba(" === c.substr(-5) && (h = 1), f === l[e] || e >= l.length ? o += f : (o && (u.push(o), o = ""), a = parseFloat(l[e]), u.push(a), u._firstPT = {
                    _next: u._firstPT,
                    t: u,
                    p: u.length - 1,
                    s: a,
                    c: ("=" === f.charAt(1) ? parseInt(f.charAt(0) + "1", 10) * parseFloat(f.substr(2)) : parseFloat(f) - a) || 0,
                    f: 0,
                    r: h && 4 > h
                }), s += f.length;
                return o += t.substr(s), o && u.push(o), u.setRatio = ri, u
            },
            fi = function(n, t, i, u, f, e, o, s) {
                var v, l, c = "get" === i ? n[t] : i,
                    a = typeof n[t],
                    y = "string" == typeof u && "=" === u.charAt(1),
                    h = {
                        t: n,
                        p: t,
                        s: c,
                        f: "function" === a,
                        pg: 0,
                        n: f || t,
                        r: e,
                        pr: 0,
                        c: y ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - c || 0
                    };
                return "number" !== a && ("function" === a && "get" === i && (l = t.indexOf("set") || "function" != typeof n["get" + t.substr(3)] ? t : "get" + t.substr(3), h.s = c = o ? n[l](o) : n[l]()), "string" == typeof c && (o || isNaN(c)) ? (h.fp = o, v = ui(c, u, s || r.defaultStringFilter, h), h = {
                    t: v,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 2,
                    pg: 0,
                    n: f || t,
                    pr: 0
                }) : y || (h.c = parseFloat(u) - parseFloat(c) || 0)), h.c ? ((h._next = this._firstPT) && (h._next._prev = h), this._firstPT = h, h) : void 0
            },
            pt = r._internals = {
                isArray: d,
                isSelector: vt,
                lazyTweens: v,
                blobDif: ui
            },
            w = r._plugins = {},
            b = pt.tweenLookup = {},
            ai = 0,
            wt = pt.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1,
                onOverwrite: 1,
                callbackScope: 1,
                stringFilter: 1
            },
            ei = {
                none: 0,
                all: 1,
                auto: 2,
                concurrent: 3,
                allOnStart: 4,
                preexisting: 5,
                "true": 1,
                "false": 0
            },
            k = o._rootFramesTimeline = new ft,
            p = o._rootTimeline = new ft,
            oi = 30,
            nt = pt.lazyRender = function() {
                var n, t = v.length;
                for (yt = {}; --t > -1;) n = v[t], n && n._lazy !== !1 && (n.render(n._lazy[0], n._lazy[1], !0), n._lazy = !1);
                v.length = 0
            };
        p._startTime = u.time;
        k._startTime = u.frame;
        p._active = k._active = !0;
        setTimeout(nt, 1);
        o._updateRoot = r.render = function() {
            var i, t, n;
            if (v.length && nt(), p.render((u.time - p._startTime) * p._timeScale, !1, !1), k.render((u.frame - k._startTime) * k._timeScale, !1, !1), v.length && nt(), u.frame >= oi) {
                oi = u.frame + (parseInt(r.autoSleep, 10) || 120);
                for (n in b) {
                    for (t = b[n].tweens, i = t.length; --i > -1;) t[i]._gc && t.splice(i, 1);
                    0 === t.length && delete b[n]
                }
                if (n = p._first, (!n || n._paused) && r.autoSleep && !k._first && 1 === u._listeners.tick.length) {
                    for (; n && n._paused;) n = n._next;
                    n || u.sleep()
                }
            }
        };
        u.addEventListener("tick", o._updateRoot);
        var et = function(n, t, i) {
                var r, f, u = n._gsTweenID;
                if (b[u || (n._gsTweenID = u = "t" + ai++)] || (b[u] = {
                        target: n,
                        tweens: []
                    }), t && (r = b[u].tweens, r[f = r.length] = t, i))
                    for (; --f > -1;) r[f] === t && r.splice(f, 1);
                return b[u].tweens
            },
            si = function(n, t, i, u) {
                var e, o, f = n.vars.onOverwrite;
                return f && (e = f(n, t, i, u)), f = r.onOverwrite, f && (o = f(n, t, i, u)), e !== !1 && o !== !1
            },
            bt = function(n, t, i, r, u) {
                var o, s, f, y;
                if (1 === r || r >= 4) {
                    for (y = u.length, o = 0; y > o; o++)
                        if ((f = u[o]) !== t) f._gc || f._kill(null, n, t) && (s = !0);
                        else if (5 === r) break;
                    return s
                }
                var h, c = t._startTime + e,
                    l = [],
                    a = 0,
                    v = 0 === t._duration;
                for (o = u.length; --o > -1;)(f = u[o]) === t || f._gc || f._paused || (f._timeline !== t._timeline ? (h = h || hi(t, 0, v), 0 === hi(f, h, v) && (l[a++] = f)) : c >= f._startTime && f._startTime + f.totalDuration() / f._timeScale > c && ((v || !f._initted) && 2e-10 >= c - f._startTime || (l[a++] = f)));
                for (o = a; --o > -1;)
                    if (f = l[o], 2 === r && f._kill(i, n, t) && (s = !0), 2 !== r || !f._firstPT && f._initted) {
                        if (2 !== r && !si(f, t)) continue;
                        f._enabled(!1, !1) && (s = !0)
                    }
                return s
            },
            hi = function(n, t, i) {
                for (var u = n._timeline, f = u._timeScale, r = n._startTime; u._timeline;) {
                    if (r += u._startTime, f *= u._timeScale, u._paused) return -100;
                    u = u._timeline
                }
                return r /= f, r > t ? r - t : i && r === t || !n._initted && 2 * e > r - t ? e : (r += n.totalDuration() / n._timeScale / f) > t + e ? 0 : r - t - e
            };
        if (i._init = function() {
                var e, h, n, u, f, t = this.vars,
                    s = this._overwrittenProps,
                    c = this._duration,
                    o = !!t.immediateRender,
                    i = t.ease;
                if (t.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill());
                    f = {};
                    for (u in t.startAt) f[u] = t.startAt[u];
                    if (f.overwrite = !1, f.immediateRender = !0, f.lazy = o && t.lazy !== !1, f.startAt = f.delay = null, this._startAt = r.to(this.target, 0, f), o)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== c) return
                } else if (t.runBackwards && 0 !== c)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (o = !1);
                        n = {};
                        for (u in t) wt[u] && "autoCSS" !== u || (n[u] = t[u]);
                        if (n.overwrite = 0, n.data = "isFromStart", n.lazy = o && t.lazy !== !1, n.immediateRender = o, this._startAt = r.to(this.target, 0, n), o) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = i = i ? i instanceof a ? i : "function" == typeof i ? new a(i, t.easeParams) : tt[i] || r.defaultEase : r.defaultEase, t.easeParams instanceof Array && i.config && (this._ease = i.config.apply(i, t.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (e = this._targets.length; --e > -1;) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], s ? s[e] : null) && (h = !0);
                else h = this._initProps(this.target, this._propLookup, this._siblings, s);
                if (h && r._onPluginEvent("_onInitAllProps", this), s && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), t.runBackwards)
                    for (n = this._firstPT; n;) n.s += n.c, n.c = -n.c, n = n._next;
                this._onUpdate = t.onUpdate;
                this._initted = !0
            }, i._initProps = function(t, i, r, u) {
                var f, h, c, e, s, o;
                if (null == t) return !1;
                yt[t._gsTweenID] && nt();
                this.vars.css || t.style && t !== n && t.nodeType && w.css && this.vars.autoCSS !== !1 && li(this.vars, t);
                for (f in this.vars)
                    if (o = this.vars[f], wt[f]) o && (o instanceof Array || o.push && d(o)) && -1 !== o.join("").indexOf("{self}") && (this.vars[f] = o = this._swapSelfInParams(o, this));
                    else if (w[f] && (e = new w[f])._onInitTween(t, this.vars[f], this)) {
                    for (this._firstPT = s = {
                            _next: this._firstPT,
                            t: e,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: f,
                            pg: 1,
                            pr: e._priority
                        }, h = e._overwriteProps.length; --h > -1;) i[e._overwriteProps[h]] = this._firstPT;
                    (e._priority || e._onInitAllProps) && (c = !0);
                    (e._onDisable || e._onEnable) && (this._notifyPluginsOfEnabled = !0);
                    s._next && (s._next._prev = s)
                } else i[f] = fi.call(this, t, f, "get", o, f, 0, null, this.vars.stringFilter);
                return u && this._kill(u, t) ? this._initProps(t, i, r, u) : this._overwrite > 1 && this._firstPT && r.length > 1 && bt(t, this, i, this._overwrite, r) ? (this._kill(i, t), this._initProps(t, i, r, u)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (yt[t._gsTweenID] = !0), c)
            }, i.render = function(n, t, i) {
                var h, s, u, y, c = this._time,
                    f = this._duration,
                    o = this._rawPrevTime;
                if (n >= f) this._totalTime = this._time = f, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (h = !0, s = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === f && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (n = 0), (0 === n || 0 > o || o === e && "isPause" !== this.data) && o !== n && (i = !0, o > e && (s = "onReverseComplete")), this._rawPrevTime = y = !t || n || o === n ? n : e);
                else if (1e-7 > n) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== c || 0 === f && o > 0) && (s = "onReverseComplete", h = this._reversed), 0 > n && (this._active = !1, 0 === f && (this._initted || !this.vars.lazy || i) && (o >= 0 && (o !== e || "isPause" !== this.data) && (i = !0), this._rawPrevTime = y = !t || n || o === n ? n : e)), this._initted || (i = !0);
                else if (this._totalTime = this._time = n, this._easeType) {
                    var r = n / f,
                        l = this._easeType,
                        a = this._easePower;
                    (1 === l || 3 === l && r >= .5) && (r = 1 - r);
                    3 === l && (r *= 2);
                    1 === a ? r *= r : 2 === a ? r *= r * r : 3 === a ? r *= r * r * r : 4 === a && (r *= r * r * r * r);
                    this.ratio = 1 === l ? 1 - r : 2 === l ? r : .5 > n / f ? r / 2 : 1 - r / 2
                } else this.ratio = this._ease.getRatio(n / f);
                if (this._time !== c || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = c, this._rawPrevTime = o, v.push(this), this._lazy = [n, t], void 0;
                        this._time && !h ? this.ratio = this._ease.getRatio(this._time / f) : h && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== c && n >= 0 && (this._active = !0), 0 === c && (this._startAt && (n >= 0 ? this._startAt.render(n, t, i) : s || (s = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === f) && (t || this._callback("onStart"))), u = this._firstPT; u;) u.f ? u.t[u.p](u.c * this.ratio + u.s) : u.t[u.p] = u.c * this.ratio + u.s, u = u._next;
                    this._onUpdate && (0 > n && this._startAt && n !== -.0001 && this._startAt.render(n, t, i), t || (this._time !== c || h) && this._callback("onUpdate"));
                    s && (!this._gc || i) && (0 > n && this._startAt && !this._onUpdate && n !== -.0001 && this._startAt.render(n, t, i), h && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[s] && this._callback(s), 0 === f && this._rawPrevTime === e && y !== e && (this._rawPrevTime = 0))
                }
            }, i._kill = function(n, t, i) {
                if ("all" === n && (n = null), null == n && (null == t || t === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                t = "string" != typeof t ? t || this._targets || this.target : r.selector(t) || t;
                var f, s, o, u, e, c, l, a, h, v = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((d(t) || vt(t)) && "number" != typeof t[0])
                    for (f = t.length; --f > -1;) this._kill(n, t[f], i) && (c = !0);
                else {
                    if (this._targets) {
                        for (f = this._targets.length; --f > -1;)
                            if (t === this._targets[f]) {
                                e = this._propLookup[f] || {};
                                this._overwrittenProps = this._overwrittenProps || [];
                                s = this._overwrittenProps[f] = n ? this._overwrittenProps[f] || {} : "all";
                                break
                            }
                    } else {
                        if (t !== this.target) return !1;
                        e = this._propLookup;
                        s = this._overwrittenProps = n ? this._overwrittenProps || {} : "all"
                    }
                    if (e) {
                        if (l = n || e, a = n !== s && "all" !== s && n !== e && ("object" != typeof n || !n._tempKill), i && (r.onOverwrite || this.vars.onOverwrite)) {
                            for (o in l) e[o] && (h || (h = []), h.push(o));
                            if ((h || !n) && !si(this, i, t, h)) return !1
                        }
                        for (o in l)(u = e[o]) && (v && (u.f ? u.t[u.p](u.s) : u.t[u.p] = u.s, c = !0), u.pg && u.t._kill(l) && (c = !0), u.pg && 0 !== u.t._overwriteProps.length || (u._prev ? u._prev._next = u._next : u === this._firstPT && (this._firstPT = u._next), u._next && (u._next._prev = u._prev), u._next = u._prev = null), delete e[o]), a && (s[o] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return c
            }, i.invalidate = function() {
                return this._notifyPluginsOfEnabled && r._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], o.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -e, this.render(-this._delay)), this
            }, i._enabled = function(n, t) {
                if (h || u.wake(), n && this._gc) {
                    var i, f = this._targets;
                    if (f)
                        for (i = f.length; --i > -1;) this._siblings[i] = et(f[i], this, !0);
                    else this._siblings = et(this.target, this, !0)
                }
                return o.prototype._enabled.call(this, n, t), this._notifyPluginsOfEnabled && this._firstPT ? r._onPluginEvent(n ? "_onEnable" : "_onDisable", this) : !1
            }, r.to = function(n, t, i) {
                return new r(n, t, i)
            }, r.from = function(n, t, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(n, t, i)
            }, r.fromTo = function(n, t, i, u) {
                return u.startAt = i, u.immediateRender = 0 != u.immediateRender && 0 != i.immediateRender, new r(n, t, u)
            }, r.delayedCall = function(n, t, i, u, f) {
                return new r(t, 0, {
                    delay: n,
                    onComplete: t,
                    onCompleteParams: i,
                    callbackScope: u,
                    onReverseComplete: t,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: f,
                    overwrite: 0
                })
            }, r.set = function(n, t) {
                return new r(n, 0, t)
            }, r.getTweensOf = function(n, t) {
                if (null == n) return [];
                n = "string" != typeof n ? n : r.selector(n) || n;
                var i, u, f, e;
                if ((d(n) || vt(n)) && "number" != typeof n[0]) {
                    for (i = n.length, u = []; --i > -1;) u = u.concat(r.getTweensOf(n[i], t));
                    for (i = u.length; --i > -1;)
                        for (e = u[i], f = i; --f > -1;) e === u[f] && u.splice(i, 1)
                } else
                    for (u = et(n).concat(), i = u.length; --i > -1;)(u[i]._gc || t && !u[i].isActive()) && u.splice(i, 1);
                return u
            }, r.killTweensOf = r.killDelayedCallsTo = function(n, t, i) {
                "object" == typeof t && (i = t, t = !1);
                for (var u = r.getTweensOf(n, t), f = u.length; --f > -1;) u[f]._kill(i, n)
            }, c = l("plugins.TweenPlugin", function(n, t) {
                this._overwriteProps = (n || "").split(",");
                this._propName = this._overwriteProps[0];
                this._priority = t || 0;
                this._super = c.prototype
            }, !0), i = c.prototype, c.version = "1.18.0", c.API = 2, i._firstPT = null, i._addTween = fi, i.setRatio = ri, i._kill = function(n) {
                var i, r = this._overwriteProps,
                    t = this._firstPT;
                if (null != n[this._propName]) this._overwriteProps = [];
                else
                    for (i = r.length; --i > -1;) null != n[r[i]] && r.splice(i, 1);
                for (; t;) null != n[t.n] && (t._next && (t._next._prev = t._prev), t._prev ? (t._prev._next = t._next, t._prev = null) : this._firstPT === t && (this._firstPT = t._next)), t = t._next;
                return !1
            }, i._roundProps = function(n, t) {
                for (var i = this._firstPT; i;)(n[this._propName] || null != i.n && n[i.n.split(this._propName + "_").join("")]) && (i.r = t), i = i._next
            }, r._onPluginEvent = function(n, t) {
                var f, r, u, e, o, i = t._firstPT;
                if ("_onInitAllProps" === n) {
                    for (; i;) {
                        for (o = i._next, r = u; r && r.pr > i.pr;) r = r._next;
                        (i._prev = r ? r._prev : e) ? i._prev._next = i: u = i;
                        (i._next = r) ? r._prev = i: e = i;
                        i = o
                    }
                    i = t._firstPT = u
                }
                for (; i;) i.pg && "function" == typeof i.t[n] && i.t[n]() && (f = !0), i = i._next;
                return f
            }, c.activate = function(n) {
                for (var t = n.length; --t > -1;) n[t].API === c.API && (w[(new n[t])._propName] = n[t]);
                return !0
            }, st.plugin = function(n) {
                if (!(n && n.propName && n.init && n.API)) throw "illegal plugin definition.";
                var i, r = n.propName,
                    e = n.priority || 0,
                    o = n.overwriteProps,
                    u = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_roundProps",
                        initAll: "_onInitAllProps"
                    },
                    t = l("plugins." + r.charAt(0).toUpperCase() + r.substr(1) + "Plugin", function() {
                        c.call(this, r, e);
                        this._overwriteProps = o || []
                    }, n.global === !0),
                    f = t.prototype = new c(r);
                f.constructor = t;
                t.API = n.API;
                for (i in u) "function" == typeof n[i] && (f[u[i]] = n[i]);
                return t.version = n.version, c.activate([t]), t
            }, s = n._gsQueue) {
            for (f = 0; s.length > f; f++) s[f]();
            for (i in g) g[i].func || n.console.log("GSAP encountered missing dependency: com.greensock." + i)
        }
        h = !1
    }
})("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");


var _gsScope, BeoGlobal, _chromeVersion, ua, match, _androidVersion, sbv_ua, sbv_uaver, dataLayer, recaptcha_valid, s, AjaxObj, AjaxRestApiObj, RestArvatoService, RestPeytzService, RestFormService, RestCheckoutService, RestFeedService, RestProductServiceValtech, RestProductService2, RestCartServiceValtech, RestCartService2, RestUserService, RestRestrictedSendMailService, Expanders, Shrinkers, shoppingCart, Rm, Rk, _BeoTopModuleCount, _numTM, BeoSpotGlobalCategories, _wrapper, _BeoGalleryCount, _numBeoGallery, _imgSize, clickEventType, buyModuleInitialized, el, buyModule, BuyModule, BuyModuleUI, Swoosh, _BeoTechSpecCount, _numOfTechSpecs, _BeoMaterialCount, _numBM, _compactForms, _numDropdowns, counter, _BeoCompareProductsCount, _numCP, i, EventListenerArray, GlobalEventListeners, accessoriesList;

function BeoUSP() {
    function k(n) {
        (r.newBlock(e[n.detail], n.detail + 1), h) || (h = !0, p())
    }

    function d() {
        h = !1;
        w();
        r.reset()
    }

    function p() {
        c || (f.toggle(!0, !0), f.addListeners())
    }

    function w() {
        c || (f.removeListeners(), f.toggle(!1, !0), f.instantOut())
    }

    function g(n) {
        if (s != n.detail)
            if (s = n.detail, n.detail == 0) {
                r.hide();
                w();
                for (var t = 0; t < u; t++) e[t].hide()
            } else b(!0)
    }

    function b(n) {
        r.show();
        n && p();
        for (var t = 0; t < u; t++) e[t].show()
    }
    var t = this,
        l, o, i, y, f, r, s, h;
    t.moduleTop = 0;
    t.moduleBottom = 0;
    l = .05;
    t.initDelay = 50;
    var nt = _BeoUSPCount,
        a = !1,
        c = !1,
        n = document.getElementsByClassName("beousp")[_BeoUSPCount];
    _BeoUSPCount++;
    var v = n.getElementsByClassName("block"),
        u = v.length,
        e = [];
    for (o = 0; o < u; o++) e.push(new BeoUSPBlock(o, v[o], n, u));
    i = 0;
    y = n.getAttribute("data-theme") || "0";
    y == "1" && (n.className += " inverted");
    f = new BeoUSPRoundBtn(n, n, !0);
    r = new BeoUSPBG(n);
    BeoEvents(n, "blockOpen", k, !0);
    BeoEvents(n, "blockClose", d, !0);
    BeoEvents(n, "bgVideoTakeOver", g, !0);
    s = -1;
    h = !1;
    t.start = function() {
        a || (a = !0, r.start())
    };
    t.stop = function() {
        s == 0 && (s = -1, b(!1));
        h && n.dispatchEvent(BeoCustomEvent("blockClose", 0))
    };
    t.deactivate = function() {};
    t.activate = function() {};
    t.resized = function() {
        var t, f;
        for (BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW ? (c = !0, n.style.height = "auto", i = 115 * u) : (c = !1, i = Math.max(600, BeoGlobal._reliableSh), t = BeoGlobal._sw * 9 / 16, Math.abs(t - i) < 100 && Math.max(t, i) > 400 && (i = t), n.style.height = i + "px"), f = 0; f < u; f++) e[f].resized(i);
        r.resized(i)
    };
    t.layoutUpdate = function() {
        t.moduleTop = BeoGlobal.offsetY(n) - BeoGlobal._reliableSh - BeoGlobal._margins[0] + BeoGlobal._reliableSh * l;
        t.moduleBottom = t.moduleTop + i + BeoGlobal._reliableSh * (1 - l * 2)
    }
}

function BeoUSPBlock(n, t, i, r) {
    function yt() {
        a || (y.style.opacity = .15, k ? (TweenLite.to(v, .5, {
            y: -100,
            ease: Cubic.easeOut
        }), TweenLite.to(it, .6, {
            y: -100,
            ease: Cubic.easeOut
        }), ft.style.opacity = 1, g.over()) : TweenLite.to(v, .2, {
            y: -2,
            ease: Cubic.easeOut
        }))
    }

    function pt() {
        a || (y.style.opacity = 0, k ? (TweenLite.to(v, .7, {
            y: 0,
            ease: Cubic.easeOut
        }), TweenLite.to(it, .7, {
            y: 0,
            ease: Cubic.easeOut
        }), ft.style.opacity = 0, g.out()) : TweenLite.to(v, .3, {
            y: 0,
            ease: Cubic.easeOut
        }))
    }

    function wt() {
        a || i.dispatchEvent(BeoCustomEvent("blockOpen", n))
    }

    function bt(i) {
        if (f || TweenLite.set(v, {
                x: c / 2,
                top: 20,
                rotation: 90,
                transformOrigin: "0 0",
                delay: e
            }), k && (f || (v.style.opacity = 0, g.toggle(!1, !1), i.detail != n && lt()), TweenLite.to(it, .2, {
                autoAlpha: 0,
                ease: Quad.easeOut
            })), i.detail == n) {
            a = !0;
            t.className = "block open";
            f ? (nt = 500, o ? (o.resized(), nt = o._h + d.offsetHeight + 90) : nt = d.offsetHeight + 240, TweenLite.killTweensOf(t, !1, {
                height: !0
            }), TweenLite.to(t, l, {
                height: nt + "px",
                ease: p,
                delay: e,
                onComplete: at
            }), g.rotate(), y.style.opacity = .15) : (v.style.opacity = 0, u = n * c, s = rt, BeoGlobal._isTouch ? t.style.width = s + "px" : setTimeout(function() {
                y.style.opacity = 0
            }, e * 1e3 + 1e3), TweenLite.killTweensOf(t, !1, {
                x: !0,
                width: !0
            }), TweenLite.to(t, l, {
                x: u,
                width: s + "px",
                ease: p,
                delay: e,
                onComplete: at
            }), h = u, w = s);
            e = 0;
            k = !1;
            return
        }
        t.className = "block";
        y.style.opacity = 0;
        d.style.opacity = 0;
        f && g.unrotate();
        o && o.animOut();
        f || k || !a || lt();
        a = !1;
        f ? (TweenLite.killTweensOf(t, !1, {
            height: !0
        }), TweenLite.to(t, l, {
            height: "50px",
            ease: p,
            delay: e
        })) : (n < i.detail ? (tt = 0, u = n * c, s = c) : (tt = 1, u = rt + (n - 1) * c, s = c), (h != u || w != s) && (TweenLite.killTweensOf(t, !1, {
            x: !0,
            width: !0
        }), TweenLite.to(t, l, {
            x: u,
            width: s + "px",
            ease: p,
            delay: e
        })), h = u, w = s);
        e = 0;
        k = !1
    }

    function kt() {
        f ? (TweenLite.killTweensOf(t), TweenLite.to(t, l, {
            height: "115px",
            ease: p,
            delay: e
        })) : (u = n * BeoGlobal._sw / r, s = BeoGlobal._sw / r, (h != u || w != s) && (TweenLite.killTweensOf(t, !1, {
            x: !0,
            width: !0
        }), TweenLite.to(t, l, {
            x: u,
            width: s + "px",
            ease: p,
            delay: e
        })), h = u, w = s);
        a && (t.className = "block", y.style.opacity = 0, a = !1, d.style.opacity = 0, o && o.animOut(), f && g.unrotate());
        f || (TweenLite.set(it, {
            y: 0
        }), ft.style.opacity = 0, g.instantOut());
        TweenLite.to(it, .6, {
            autoAlpha: 1,
            delay: e + l,
            ease: Quad.easeInOut,
            onStart: g.toggle,
            onStartParams: [!0, !1]
        });
        f || TweenLite.set(v, {
            opacity: 1,
            x: 30,
            y: 0,
            top: ut / 2,
            rotation: 0,
            transformOrigin: "0 0"
        });
        e = ct;
        k = !0
    }

    function lt() {
        TweenLite.set(v, {
            opacity: 1,
            y: -8,
            delay: e + l + n * .02 - .01
        });
        TweenLite.to(v, .6, {
            y: 0,
            delay: e + l + n * .02,
            ease: Cubic.easeOut
        })
    }

    function at() {
        f || (y.style.opacity = 0);
        o && o.animIn();
        d.style.opacity = 1
    }
    var b = this,
        ut = 0,
        k = !0,
        a = !1,
        f = BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW,
        v = t.getElementsByClassName("label")[0],
        it = t.getElementsByClassName("front")[0],
        d = t.getElementsByClassName("text")[0],
        st = t.getElementsByClassName("foreground")[0],
        o, ft, ht, et, y;
    st && (o = new BeoUSPForeground(st, t, i, null));
    ft = it.getElementsByTagName("p")[0];
    b._bgColor = t.getAttribute("data-bg") || "#f1f1f1";
    b._bgImgUrl = t.getAttribute("data-bgImg") || "";
    f && (b._bgImgUrl = t.getAttribute("data-bgImgMobile") || "");
    b._videoUrl = t.getAttribute("data-yt") || "";
    f && b._videoUrl != "" && !o && (o = new BeoUSPForeground(null, t, i, {
        _yt: b._videoUrl,
        _thumbnail: t.getAttribute("data-mobileThumbnail")
    }));
    var c = 54,
        rt = 0,
        vt = t.getAttribute("data-theme") || "0";
    vt == "1" && (d.className += " inverted");
    ht = i.getAttribute("data-theme") || "0";
    et = "#000";
    ht == 1 && (et = "#FFF");
    y = document.createElement("div");
    y.className = "overlay";
    y.style.backgroundColor = et;
    t.insertBefore(y, t.firstChild);
    var l = .7,
        p = Quad.easeOut,
        ct = .1,
        e = ct,
        tt = 0,
        g = new BeoUSPRoundBtn(t, i, !1),
        ot = !1;
    b.resized = function(i) {
        ut = i;
        BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW ? (f = !0, k || a && (nt = 500, o ? (o.resized(), nt = o._h + d.offsetHeight + 90) : nt = d.offsetHeight + 240, TweenLite.killTweensOf(t, !1, {
            height: !0
        }), TweenLite.set(t, {
            height: nt + "px",
            ease: p
        }))) : (f = !1, rt = BeoGlobal._sw - (r - 1) * c, k ? (TweenLite.set(t, {
            x: n * BeoGlobal._sw / r,
            y: 0,
            width: BeoGlobal._sw / r + "px"
        }), BeoGlobal._vwOuter < 1300 ? TweenLite.set(v, {
            x: 15,
            top: ut / 2,
            rotation: 0,
            transformOrigin: "0 0"
        }) : TweenLite.set(v, {
            x: 30,
            top: ut / 2,
            rotation: 0,
            transformOrigin: "0 0"
        })) : (a ? (h = n * c, w = rt) : tt == 0 ? (h = n * c, w = c) : tt == 1 && (h = rt + (n - 1) * c, w = c), ot && (h = tt == 0 ? -s : BeoGlobal._sw), TweenLite.set(t, {
            x: h,
            y: 0,
            width: w + "px"
        })));
        o && o.resized()
    };
    f || BeoGlobal._isTouch || (BeoEvents(t, "mouseenter", yt, !0), BeoEvents(t, "mouseleave", pt, !0));
    BeoEvents(t, "click", wt, !0);
    BeoEvents(i, "blockOpen", bt, !0);
    BeoEvents(i, "blockClose", kt, !0);
    var h = 0,
        u = 0,
        w = 0,
        s = 0,
        nt = 0;
    b.hide = function() {
        if (ot = !0, !f) {
            if (a) {
                TweenLite.killTweensOf(t, !1, {
                    autoAlpha: !0
                });
                TweenLite.to(t, l, {
                    autoAlpha: 0,
                    ease: p,
                    delay: e
                });
                return
            }
            u = tt == 0 ? -s : BeoGlobal._sw;
            (h != u || w != s) && (TweenLite.killTweensOf(t, !1, {
                x: !0,
                width: !0
            }), TweenLite.to(t, l, {
                x: u,
                ease: p,
                delay: e
            }));
            h = u
        }
    };
    b.show = function() {
        if (ot = !1, !f) {
            if (a) {
                TweenLite.killTweensOf(t, !1, {
                    autoAlpha: !0
                });
                TweenLite.to(t, l, {
                    autoAlpha: 1,
                    ease: p,
                    delay: e
                });
                return
            }
            u = tt == 0 ? n * c : rt + (n - 1) * c;
            (h != u || w != s) && (TweenLite.killTweensOf(t, !1, {
                x: !0,
                width: !0
            }), TweenLite.to(t, l, {
                x: u,
                ease: p,
                delay: e
            }));
            h = u
        }
    };
    t.style.visibility = "visible"
}

function BeoUSPRoundBtn(n, t, i) {
    function c() {
        u.over()
    }

    function l() {
        u.out()
    }

    function a(n) {
        n.stopPropagation();
        t.dispatchEvent(BeoCustomEvent("blockClose", 0))
    }
    var u = this,
        r = document.createElement("div"),
        e, o, s, h, f;
    r.className = "roundBtn";
    e = document.createElement("div");
    e.className = "bg";
    TweenLite.set(e, {
        scale: 0,
        transformOrigin: "21px 21px"
    });
    o = document.createElement("div");
    o.className = "cross";
    i && (TweenLite.set(o, {
        rotation: 45
    }), r.style.opacity = 0);
    s = document.createElement("div");
    s.className = "a";
    o.appendChild(s);
    h = document.createElement("div");
    h.className = "b";
    o.appendChild(h);
    r.appendChild(e);
    r.appendChild(o);
    i || (f = document.createElement("div"), f.textContent = "Read More", f.className = "readmore", r.appendChild(f));
    n.appendChild(r);
    u.over = function() {
        TweenLite.to(e, .3, {
            scale: 1,
            transformOrigin: "21px 21px",
            ease: Cubic.easeOut
        });
        r.className = "roundBtn over";
        i || TweenLite.to(f, .4, {
            opacity: 1,
            delay: .1,
            ease: Cubic.easeInOut
        })
    };
    u.out = function() {
        TweenLite.to(e, .3, {
            scale: 0,
            transformOrigin: "21px 21px",
            ease: Cubic.easeOut
        });
        r.className = "roundBtn";
        i || (TweenLite.killTweensOf(f), TweenLite.to(f, .4, {
            opacity: 0,
            ease: Cubic.easeOut
        }))
    };
    u.instantOut = function() {
        TweenLite.killTweensOf(e);
        TweenLite.set(e, {
            scale: 0,
            transformOrigin: "21px 21px"
        });
        i || (TweenLite.killTweensOf(f), TweenLite.set(f, {
            opacity: 0
        }));
        r.className = "roundBtn"
    };
    u.toggle = function(n, t) {
        n ? t ? (TweenLite.set(r, {
            y: -8,
            opacity: 1,
            delay: .9
        }), TweenLite.to(r, .6, {
            y: 0,
            delay: .91,
            ease: Cubic.easeOut
        })) : r.style.opacity = 1 : (r.style.opacity = 0, t && TweenLite.to(r, .3, {
            y: -8,
            ease: Cubic.easeOut
        }))
    };
    u.rotate = function() {
        TweenLite.to(o, .5, {
            rotation: 45,
            delay: .5,
            ease: Cubic.easeInOut
        });
        TweenLite.to(r, .5, {
            delay: 0,
            y: -30,
            ease: Cubic.easeInOut
        });
        u.addListeners()
    };
    u.unrotate = function() {
        TweenLite.to(o, .5, {
            rotation: 0,
            delay: .5,
            ease: Cubic.easeInOut
        });
        TweenLite.to(r, .5, {
            delay: 0,
            y: 0,
            ease: Cubic.easeInOut
        });
        u.removeListeners()
    };
    u.addListeners = function() {
        BeoGlobal._isTouch || (BeoEvents(r, "mouseenter", c, !0), BeoEvents(r, "mouseleave", l, !0));
        BeoEvents(r, "click", a, !0)
    };
    u.removeListeners = function() {
        BeoGlobal._isTouch || (BeoEvents(r, "mouseenter", c, !1), BeoEvents(r, "mouseleave", l, !1));
        BeoEvents(r, "click", a, !1)
    }
}

function BeoUSPBG(n) {
    function w() {
        r.resized(h);
        try {
            t[o].img.style.opacity = 1
        } catch (e) {}
    }

    function k() {
        f.hide();
        i = !1;
        s ? s.updateYTid(v) : s = new BeoUSPVideoPlayer(v, n, !0);
        s.play();
        c = !0;
        BeoEvents(n, "videoStatus", y, !0)
    }

    function y(t) {
        n.dispatchEvent(BeoCustomEvent("bgVideoTakeOver", t.detail))
    }

    function d(t) {
        n.style.backgroundColor = t
    }

    function b() {
        try {
            t[o].img.style.opacity = 0
        } catch (n) {}
    }
    var r = this,
        u = document.createElement("div"),
        e, l, t, h;
    u.className = "bg";
    e = BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW;
    l = n.getAttribute("data-bgImg");
    e && (l = n.getAttribute("data-bgImgMobile"));
    t = [new BeoImage(l, u, null, null, "bgImg", w)];
    n.insertBefore(u, n.firstChild);
    var o = 0,
        a, p = !0,
        f, s, i = !1,
        c = !1,
        v;
    r.start = function() {
        t[0].load()
    };
    r.reset = function() {
        b();
        c && (BeoEvents(n, "videoStatus", y, !1), c = !1, s.stop());
        i && (f.hide(), i = !1);
        o = 0;
        r.resized(h);
        t[o].img.style.opacity = 1;
        clearTimeout(a)
    };
    r.newBlock = function(l, g) {
        b();
        c && (BeoEvents(n, "videoStatus", y, !1), c = !1, s.stop());
        var nt = l._bgImgUrl;
        e && l._videoUrl != "" && (nt = "");
        o = g;
        clearTimeout(a);
        nt == "" ? (n.style.backgroundColor = l._bgColor, p = !1) : (t[g] == undefined ? (t[g] = new BeoImage(nt, u, null, null, "bgImg", w), t[g].load(), n.style.backgroundColor = l._bgColor) : (r.resized(h), t[g].img.style.opacity = 1, a = setTimeout(d, 1e3, l._bgColor)), p = !0);
        e || l._videoUrl == "" ? i && (f.hide(), i = !1) : (v = l._videoUrl, f || (f = new BeoVideoPlayButton(u)), f.show(), i = !0, BeoEvents(u.getElementsByClassName("playBtn")[0], "click", k, !0))
    };
    r.hide = function() {
        TweenLite.to(u, .8, {
            autoAlpha: 0,
            ease: Cubic.easeInOut
        });
        i && (f.hide(), i = !1)
    };
    r.show = function() {
        TweenLite.to(u, .8, {
            autoAlpha: 1,
            ease: Cubic.easeInOut
        });
        i || (f.show(), i = !0)
    };
    h = 0;
    r.resized = function(n) {
        if (h = n, e = BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW, !e) try {
            t[o].scaleTo("fill", BeoGlobal._sw, h, "center", "center")
        } catch (i) {}
    }
}

_gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(n, t) {
        var ft, wt, f, fi, r = function() {
                n.call(this, "css");
                this._overwriteProps.length = 0;
                this.setRatio = r.prototype.setRatio
            },
            nu = _gsScope._gsDefine.globals,
            a = {},
            i = r.prototype = new n("css"),
            br, yt, kr, dr, gr, pt;
        i.constructor = r;
        r.version = "1.18.0";
        r.API = 2;
        r.defaultTransformPerspective = 0;
        r.defaultSkewType = "compensated";
        r.defaultSmoothOrigin = !0;
        i = "px";
        r.suffixMap = {
            top: i,
            right: i,
            bottom: i,
            left: i,
            width: i,
            height: i,
            fontSize: i,
            padding: i,
            margin: i,
            perspective: i,
            lineHeight: ""
        };
        var ei, di, bt, kt, gi, it, dt = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
            oi = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            si = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            hi = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
            gt = /(?:\d|\-|\+|=|#|\.)*/g,
            ci = /opacity *= *([^)]*)/i,
            tu = /opacity:([^;]*)/i,
            iu = /alpha\(opacity *=.+?\)/i,
            ru = /^(rgb|hsl)/,
            nr = /([A-Z])/g,
            tr = /-([a-z])/gi,
            uu = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            ir = function(n, t) {
                return t.toUpperCase()
            },
            fu = /(?:Left|Right|Width)/i,
            eu = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            ou = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            p = /,(?=[^\)]*(?:\(|$))/gi,
            d = Math.PI / 180,
            rt = 180 / Math.PI,
            ni = {},
            v = document,
            li = function(n) {
                return v.createElementNS ? v.createElementNS("http://www.w3.org/1999/xhtml", n) : v.createElement(n)
            },
            g = li("div"),
            ai = li("img"),
            w = r._internals = {
                _specialProps: a
            },
            b = navigator.userAgent,
            tt = function() {
                var t = b.indexOf("Android"),
                    n = li("a");
                return bt = -1 !== b.indexOf("Safari") && -1 === b.indexOf("Chrome") && (-1 === t || Number(b.substr(t + 8, 1)) > 3), gi = bt && 6 > Number(b.substr(b.indexOf("Version/") + 8, 1)), kt = -1 !== b.indexOf("Firefox"), ( /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(b)) && (it = parseFloat(RegExp.$1)), n ? (n.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(n.style.opacity)) : !1
            }(),
            rr = function(n) {
                return ci.test("string" == typeof n ? n : (n.currentStyle ? n.currentStyle.filter : n.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            },
            ur = function(n) {
                window.console && console.log(n)
            },
            fr = "",
            vi = "",
            et = function(n, t) {
                t = t || g;
                var r, i, u = t.style;
                if (void 0 !== u[n]) return n;
                for (n = n.charAt(0).toUpperCase() + n.substr(1), r = ["O", "Moz", "ms", "Ms", "Webkit"], i = 5; --i > -1 && void 0 === u[r[i] + n];);
                return i >= 0 ? (vi = 3 === i ? "ms" : r[i], fr = "-" + vi.toLowerCase() + "-", vi + n) : null
            },
            ot = v.defaultView ? v.defaultView.getComputedStyle : function() {},
            u = r.getStyle = function(n, t, i, r, u) {
                var f;
                return tt || "opacity" !== t ? (!r && n.style[t] ? f = n.style[t] : (i = i || ot(n)) ? f = i[t] || i.getPropertyValue(t) || i.getPropertyValue(t.replace(nr, "-$1").toLowerCase()) : n.currentStyle && (f = n.currentStyle[t]), null == u || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : u) : rr(n)
            },
            k = w.convertToPixels = function(n, i, f, e, o) {
                if ("px" === e || !e) return f;
                if ("auto" === e || !f) return 0;
                var s, h, a, l = fu.test(i),
                    c = n,
                    y = g.style,
                    p = 0 > f;
                if (p && (f = -f), "%" === e && -1 !== i.indexOf("border")) s = f / 100 * (l ? n.clientWidth : n.clientHeight);
                else {
                    if (y.cssText = "border:0 solid red;position:" + u(n, "position") + ";line-height:0;", "%" !== e && c.appendChild && "v" !== e.charAt(0) && "rem" !== e) y[l ? "borderLeftWidth" : "borderTopWidth"] = f + e;
                    else {
                        if (c = n.parentNode || v.body, h = c._gsCache, a = t.ticker.frame, h && l && h.time === a) return h.width * f / 100;
                        y[l ? "width" : "height"] = f + e
                    }
                    c.appendChild(g);
                    s = parseFloat(g[l ? "offsetWidth" : "offsetHeight"]);
                    c.removeChild(g);
                    l && "%" === e && r.cacheWidths !== !1 && (h = c._gsCache = c._gsCache || {}, h.time = a, h.width = 100 * (s / f));
                    0 !== s || o || (s = k(n, i, f, e, !0))
                }
                return p ? -s : s
            },
            er = w.calculateOffset = function(n, t, i) {
                if ("absolute" !== u(n, "position", i)) return 0;
                var r = "left" === t ? "Left" : "Top",
                    f = u(n, "margin" + r, i);
                return n["offset" + r] - (k(n, t, parseFloat(f), f.replace(gt, "")) || 0)
            },
            st = function(n, t) {
                var r, u, f, i = {};
                if (t = t || ot(n, null))
                    if (r = t.length)
                        for (; --r > -1;) f = t[r], (-1 === f.indexOf("-transform") || lr === f) && (i[f.replace(tr, ir)] = t.getPropertyValue(f));
                    else
                        for (r in t)(-1 === r.indexOf("Transform") || h === r) && (i[r] = t[r]);
                else if (t = n.currentStyle || n.style)
                    for (r in t) "string" == typeof r && void 0 === i[r] && (i[r.replace(tr, ir)] = t[r]);
                return tt || (i.opacity = rr(n)), u = ut(n, t, !1), i.rotation = u.rotation, i.skewX = u.skewX, i.scaleX = u.scaleX, i.scaleY = u.scaleY, i.x = u.x, i.y = u.y, y && (i.z = u.z, i.rotationX = u.rotationX, i.rotationY = u.rotationY, i.scaleZ = u.scaleZ), i.filters && delete i.filters, i
            },
            yi = function(n, t, i, r, u) {
                var e, f, o, s = {},
                    h = n.style;
                for (f in i) "cssText" !== f && "length" !== f && isNaN(f) && (t[f] !== (e = i[f]) || u && u[f]) && -1 === f.indexOf("Origin") && ("number" == typeof e || "string" == typeof e) && (s[f] = "auto" !== e || "left" !== f && "top" !== f ? "" !== e && "auto" !== e && "none" !== e || "string" != typeof t[f] || "" === t[f].replace(hi, "") ? e : 0 : er(n, f), void 0 !== h[f] && (o = new bi(h, f, h[f], o)));
                if (r)
                    for (f in r) "className" !== f && (s[f] = r[f]);
                return {
                    difs: s,
                    firstMPT: o
                }
            },
            su = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            },
            hu = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            cu = function(n, t, i) {
                var r = parseFloat("width" === t ? n.offsetWidth : n.offsetHeight),
                    f = su[t],
                    e = f.length;
                for (i = i || ot(n, null); --e > -1;) r -= parseFloat(u(n, "padding" + f[e], i, !0)) || 0, r -= parseFloat(u(n, "border" + f[e] + "Width", i, !0)) || 0;
                return r
            },
            ht = function(n, t) {
                if ("contain" === n || "auto" === n || "auto auto" === n) return n + " ";
                (null == n || "" === n) && (n = "0 0");
                var u = n.split(" "),
                    i = -1 !== n.indexOf("left") ? "0%" : -1 !== n.indexOf("right") ? "100%" : u[0],
                    r = -1 !== n.indexOf("top") ? "0%" : -1 !== n.indexOf("bottom") ? "100%" : u[1];
                return null == r ? r = "center" === i ? "50%" : "0" : "center" === r && (r = "50%"), ("center" === i || isNaN(parseFloat(i)) && -1 === (i + "").indexOf("=")) && (i = "50%"), n = i + " " + r + (u.length > 2 ? " " + u[2] : ""), t && (t.oxp = -1 !== i.indexOf("%"), t.oyp = -1 !== r.indexOf("%"), t.oxr = "=" === i.charAt(1), t.oyr = "=" === r.charAt(1), t.ox = parseFloat(i.replace(hi, "")), t.oy = parseFloat(r.replace(hi, "")), t.v = n), t || n
            },
            ct = function(n, t) {
                return "string" == typeof n && "=" === n.charAt(1) ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - parseFloat(t)
            },
            c = function(n, t) {
                return null == n ? t : "string" == typeof n && "=" === n.charAt(1) ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) + t : parseFloat(n)
            },
            lt = function(n, t, i, r) {
                var f, o, u, e, s, h = 1e-6;
                return null == n ? e = t : "number" == typeof n ? e = n : (f = 360, o = n.split("_"), s = "=" === n.charAt(1), u = (s ? parseInt(n.charAt(0) + "1", 10) * parseFloat(o[0].substr(2)) : parseFloat(o[0])) * (-1 === n.indexOf("rad") ? 1 : rt) - (s ? 0 : t), o.length && (r && (r[i] = t + u), -1 !== n.indexOf("short") && (u %= f, u !== u % (f / 2) && (u = 0 > u ? u + f : u - f)), -1 !== n.indexOf("_cw") && 0 > u ? u = (u + 9999999999 * f) % f - (0 | u / f) * f : -1 !== n.indexOf("ccw") && u > 0 && (u = (u - 9999999999 * f) % f - (0 | u / f) * f)), e = t + u), h > e && e > -h && (e = 0), e
            },
            at = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            },
            pi = function(n, t, i) {
                return n = 0 > n ? n + 1 : n > 1 ? n - 1 : n, 0 | 255 * (1 > 6 * n ? t + 6 * (i - t) * n : .5 > n ? i : 2 > 3 * n ? t + 6 * (i - t) * (2 / 3 - n) : t) + .5
            },
            ti = r.parseColor = function(n, t) {
                var i, u, r, f, o, h, e, s, c, l, a;
                if (n)
                    if ("number" == typeof n) i = [n >> 16, 255 & n >> 8, 255 & n];
                    else {
                        if ("," === n.charAt(n.length - 1) && (n = n.substr(0, n.length - 1)), at[n]) i = at[n];
                        else if ("#" === n.charAt(0)) 4 === n.length && (u = n.charAt(1), r = n.charAt(2), f = n.charAt(3), n = "#" + u + u + r + r + f + f), n = parseInt(n.substr(1), 16), i = [n >> 16, 255 & n >> 8, 255 & n];
                        else if ("hsl" === n.substr(0, 3))
                            if (i = a = n.match(dt), t) {
                                if (-1 !== n.indexOf("=")) return n.match(oi)
                            } else o = Number(i[0]) % 360 / 360, h = Number(i[1]) / 100, e = Number(i[2]) / 100, r = .5 >= e ? e * (h + 1) : e + h - e * h, u = 2 * e - r, i.length > 3 && (i[3] = Number(n[3])), i[0] = pi(o + 1 / 3, u, r), i[1] = pi(o, u, r), i[2] = pi(o - 1 / 3, u, r);
                        else i = n.match(dt) || at.transparent;
                        i[0] = Number(i[0]);
                        i[1] = Number(i[1]);
                        i[2] = Number(i[2]);
                        i.length > 3 && (i[3] = Number(i[3]))
                    } else i = at.black;
                return t && !a && (u = i[0] / 255, r = i[1] / 255, f = i[2] / 255, s = Math.max(u, r, f), c = Math.min(u, r, f), e = (s + c) / 2, s === c ? o = h = 0 : (l = s - c, h = e > .5 ? l / (2 - s - c) : l / (s + c), o = s === u ? (r - f) / l + (f > r ? 6 : 0) : s === r ? (f - u) / l + 2 : (u - r) / l + 4, o *= 60), i[0] = 0 | o + .5, i[1] = 0 | 100 * h + .5, i[2] = 0 | 100 * e + .5), i
            },
            or = function(n, t) {
                for (var i, f, e = n.match(l) || [], u = 0, o = e.length ? "" : n, r = 0; e.length > r; r++) i = e[r], f = n.substr(u, n.indexOf(i, u) - u), u += f.length + i.length, i = ti(i, t), 3 === i.length && i.push(1), o += f + (t ? "hsla(" + i[0] + "," + i[1] + "%," + i[2] + "%," + i[3] : "rgba(" + i.join(",")) + ")";
                return o
            },
            l = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (i in at) l += "|" + i + "\\b";
        l = RegExp(l + ")", "gi");
        r.colorStringFilter = function(n) {
            var t, i = n[0] + n[1];
            l.lastIndex = 0;
            l.test(i) && (t = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), n[0] = or(n[0], t), n[1] = or(n[1], t))
        };
        t.defaultStringFilter || (t.defaultStringFilter = r.colorStringFilter);
        var sr = function(n, t, i, r) {
                if (null == n) return function(n) {
                    return n
                };
                var e, s = t ? (n.match(l) || [""])[0] : "",
                    f = n.split(s).join("").match(si) || [],
                    h = n.substr(0, n.indexOf(f[0])),
                    c = ")" === n.charAt(n.length - 1) ? ")" : "",
                    o = -1 !== n.indexOf(" ") ? " " : ",",
                    u = f.length,
                    a = u > 0 ? f[0].replace(dt, "") : "";
                return u ? e = t ? function(n) {
                    var w, v, t, y;
                    if ("number" == typeof n) n += a;
                    else if (r && p.test(n)) {
                        for (y = n.replace(p, "|").split("|"), t = 0; y.length > t; t++) y[t] = e(y[t]);
                        return y.join(",")
                    }
                    if (w = (n.match(l) || [s])[0], v = n.split(w).join("").match(si) || [], t = v.length, u > t--)
                        for (; u > ++t;) v[t] = i ? v[0 | (t - 1) / 2] : f[t];
                    return h + v.join(o) + o + w + c + (-1 !== n.indexOf("inset") ? " inset" : "")
                } : function(n) {
                    var s, l, t;
                    if ("number" == typeof n) n += a;
                    else if (r && p.test(n)) {
                        for (l = n.replace(p, "|").split("|"), t = 0; l.length > t; t++) l[t] = e(l[t]);
                        return l.join(",")
                    }
                    if (s = n.match(si) || [], t = s.length, u > t--)
                        for (; u > ++t;) s[t] = i ? s[0 | (t - 1) / 2] : f[t];
                    return h + s.join(o) + c
                } : function(n) {
                    return n
                }
            },
            wi = function(n) {
                return n = n.split(","),
                    function(t, i, r, u, f, e, o) {
                        var s, h = (i + "").split(" ");
                        for (o = {}, s = 0; 4 > s; s++) o[n[s]] = h[s] = h[s] || h[(s - 1) / 2 >> 0];
                        return u.parse(t, o, f, e)
                    }
            },
            bi = (w._setPluginRatio = function(n) {
                this.plugin.setRatio(n);
                for (var r, t, u, e, f = this.data, o = f.proxy, i = f.firstMPT, s = 1e-6; i;) r = o[i.v], i.r ? r = Math.round(r) : s > r && r > -s && (r = 0), i.t[i.p] = r, i = i._next;
                if (f.autoRotate && (f.autoRotate.rotation = o.rotation), 1 === n)
                    for (i = f.firstMPT; i;) {
                        if (t = i.t, t.type) {
                            if (1 === t.type) {
                                for (e = t.xs0 + t.s + t.xs1, u = 1; t.l > u; u++) e += t["xn" + u] + t["xs" + (u + 1)];
                                t.e = e
                            }
                        } else t.e = t.s + t.xs0;
                        i = i._next
                    }
            }, function(n, t, i, r, u) {
                this.t = n;
                this.p = t;
                this.v = i;
                this.r = u;
                r && (r._prev = this, this._next = r)
            }),
            o = (w._parseToProxy = function(n, t, i, r, u, f) {
                var c, e, o, s, v, h = r,
                    l = {},
                    a = {},
                    y = i._transform,
                    p = ni;
                for (i._transform = null, ni = t, r = v = i.parse(n, t, r, u), ni = p, f && (i._transform = y, h && (h._prev = null, h._prev && (h._prev._next = null))); r && r !== h;) {
                    if (1 >= r.type && (e = r.p, a[e] = r.s + r.c, l[e] = r.s, f || (s = new bi(r, "s", e, s, r.r), r.c = 0), 1 === r.type))
                        for (c = r.l; --c > 0;) o = "xn" + c, e = r.p + "_" + o, a[e] = r.data[o], l[e] = r[o], f || (s = new bi(r, o, e, s, r.rxp[o]));
                    r = r._next
                }
                return {
                    proxy: l,
                    end: a,
                    firstMPT: s,
                    pt: v
                }
            }, w.CSSPropTween = function(n, t, i, r, u, f, e, s, h, c, l) {
                this.t = n;
                this.p = t;
                this.s = i;
                this.c = r;
                this.n = e || t;
                n instanceof o || fi.push(this.n);
                this.r = s;
                this.type = f || 0;
                h && (this.pr = h, ft = !0);
                this.b = void 0 === c ? i : c;
                this.e = void 0 === l ? i + r : l;
                u && (this._next = u, u._prev = this)
            }),
            ii = function(n, t, i, r, u, f) {
                var e = new o(n, t, i, r - i, u, -1, f);
                return e.b = i, e.e = e.xs0 = r, e
            },
            ri = r.parseComplex = function(n, t, i, r, u, f, e, s, h, c) {
                i = i || f || "";
                e = new o(n, t, 0, 0, e, c ? 2 : 1, null, !1, s, i, r);
                r += "";
                var y, d, g, a, v, ut, ft, it, w, et, nt, b, ot, k = i.split(", ").join(",").split(" "),
                    rt = r.split(", ").join(",").split(" "),
                    st = k.length,
                    ht = ei !== !1;
                for ((-1 !== r.indexOf(",") || -1 !== i.indexOf(",")) && (k = k.join(" ").replace(p, ", ").split(" "), rt = rt.join(" ").replace(p, ", ").split(" "), st = k.length), st !== rt.length && (k = (f || "").split(" "), st = k.length), e.plugin = h, e.setRatio = c, l.lastIndex = 0, y = 0; st > y; y++)
                    if (a = k[y], v = rt[y], it = parseFloat(a), it || 0 === it) e.appendXtra("", it, ct(v, it), v.replace(oi, ""), ht && -1 !== v.indexOf("px"), !0);
                    else if (u && l.test(a)) b = "," === v.charAt(v.length - 1) ? ")," : ")", ot = -1 !== v.indexOf("hsl") && tt, a = ti(a, ot), v = ti(v, ot), w = a.length + v.length > 6, w && !tt && 0 === v[3] ? (e["xs" + e.l] += e.l ? " transparent" : "transparent", e.e = e.e.split(rt[y]).join("transparent")) : (tt || (w = !1), ot ? e.appendXtra(w ? "hsla(" : "hsl(", a[0], ct(v[0], a[0]), ",", !1, !0).appendXtra("", a[1], ct(v[1], a[1]), "%,", !1).appendXtra("", a[2], ct(v[2], a[2]), w ? "%," : "%" + b, !1) : e.appendXtra(w ? "rgba(" : "rgb(", a[0], v[0] - a[0], ",", !0, !0).appendXtra("", a[1], v[1] - a[1], ",", !0).appendXtra("", a[2], v[2] - a[2], w ? "," : b, !0), w && (a = 4 > a.length ? 1 : a[3], e.appendXtra("", a, (4 > v.length ? 1 : v[3]) - a, b, !1))), l.lastIndex = 0;
                else if (ut = a.match(dt)) {
                    if (ft = v.match(oi), !ft || ft.length !== ut.length) return e;
                    for (g = 0, d = 0; ut.length > d; d++) nt = ut[d], et = a.indexOf(nt, g), e.appendXtra(a.substr(g, et - g), Number(nt), ct(ft[d], nt), "", ht && "px" === a.substr(et + nt.length, 2), 0 === d), g = et + nt.length;
                    e["xs" + e.l] += a.substr(g)
                } else e["xs" + e.l] += e.l ? " " + a : a;
                if (-1 !== r.indexOf("=") && e.data) {
                    for (b = e.xs0 + e.data.s, y = 1; e.l > y; y++) b += e["xs" + y] + e.data["xn" + y];
                    e.e = b + e["xs" + y]
                }
                return e.l || (e.type = -1, e.xs0 = e.e), e.xfirst || e
            },
            s = 9;
        for (i = o.prototype, i.l = i.pr = 0; --s > 0;) i["xn" + s] = 0, i["xs" + s] = "";
        i.xs0 = "";
        i._next = i._prev = i.xfirst = i.data = i.plugin = i.setRatio = i.rxp = null;
        i.appendXtra = function(n, t, i, r, u, f) {
            var e = this,
                s = e.l;
            return e["xs" + s] += f && s ? " " + n : n || "", i || 0 === s || e.plugin ? (e.l++, e.type = e.setRatio ? 2 : 1, e["xs" + e.l] = r || "", s > 0 ? (e.data["xn" + s] = t + i, e.rxp["xn" + s] = u, e["xn" + s] = t, e.plugin || (e.xfirst = new o(e, "xn" + s, t, i, e.xfirst || e, 0, e.n, u, e.pr), e.xfirst.xs0 = 0), e) : (e.data = {
                s: t + i
            }, e.rxp = {}, e.s = t, e.c = i, e.r = u, e)) : (e["xs" + s] += t + (r || ""), e)
        };
        var hr = function(n, t) {
                t = t || {};
                this.p = t.prefix ? et(n) || n : n;
                a[n] = a[this.p] = this;
                this.format = t.formatter || sr(t.defaultValue, t.color, t.collapsible, t.multi);
                t.parser && (this.parse = t.parser);
                this.clrs = t.color;
                this.multi = t.multi;
                this.keyword = t.keyword;
                this.dflt = t.defaultValue;
                this.pr = t.priority || 0
            },
            e = w._registerComplexSpecialProp = function(n, t, i) {
                "object" != typeof t && (t = {
                    parser: i
                });
                var r, e, u = n.split(","),
                    f = t.defaultValue;
                for (i = i || [f], r = 0; u.length > r; r++) t.prefix = 0 === r && t.prefix, t.defaultValue = i[r] || f, e = new hr(u[r], t)
            },
            lu = function(n) {
                if (!a[n]) {
                    var t = n.charAt(0).toUpperCase() + n.substr(1) + "Plugin";
                    e(n, {
                        parser: function(n, i, r, u, f, e, o) {
                            var s = nu.com.greensock.plugins[t];
                            return s ? (s._cssRegister(), a[r].parse(n, i, r, u, f, e, o)) : (ur("Error: " + t + " js file not loaded."), f)
                        }
                    })
                }
            };
        i = hr.prototype;
        i.parseComplex = function(n, t, i, r, u, f) {
            var e, o, s, a, c, l, h = this.keyword;
            if (this.multi && (p.test(i) || p.test(t) ? (o = t.replace(p, "|").split("|"), s = i.replace(p, "|").split("|")) : h && (o = [t], s = [i])), s) {
                for (a = s.length > o.length ? s.length : o.length, e = 0; a > e; e++) t = o[e] = o[e] || this.dflt, i = s[e] = s[e] || this.dflt, h && (c = t.indexOf(h), l = i.indexOf(h), c !== l && (-1 === l ? o[e] = o[e].split(h).join("") : -1 === c && (o[e] += " " + h)));
                t = o.join(", ");
                i = s.join(", ")
            }
            return ri(n, this.p, t, i, this.clrs, this.dflt, r, this.pr, u, f)
        };
        i.parse = function(n, t, i, r, e, o) {
            return this.parseComplex(n.style, this.format(u(n, this.p, f, !1, this.dflt)), this.format(t), e, o)
        };
        r.registerSpecialProp = function(n, t, i) {
            e(n, {
                parser: function(n, r, u, f, e, s) {
                    var h = new o(n, u, 0, 0, e, 2, u, !1, i);
                    return h.plugin = s, h.setRatio = t(n, r, f._tween, u), h
                },
                priority: i
            })
        };
        r.useSVGTransformAttr = bt || kt;
        var nt, cr = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
            h = et("transform"),
            lr = fr + "transform",
            vt = et("transformOrigin"),
            y = null !== et("perspective"),
            ui = w.Transform = function() {
                this.perspective = parseFloat(r.defaultTransformPerspective) || 0;
                this.force3D = r.defaultForce3D !== !1 && y ? r.defaultForce3D || "auto" : !1
            },
            au = window.SVGElement,
            ar = function(n, t, i) {
                var r, u = v.createElementNS("http://www.w3.org/2000/svg", n),
                    f = /([a-z])([A-Z])/g;
                for (r in i) u.setAttributeNS(null, r.replace(f, "$1-$2").toLowerCase(), i[r]);
                return t.appendChild(u), u
            },
            vr = v.documentElement,
            vu = function() {
                var t, n, r, i = it || /Android/i.test(b) && !window.chrome;
                return v.createElementNS && !i && (t = ar("svg", vr), n = ar("rect", t, {
                    width: 100,
                    height: 50,
                    x: 100
                }), r = n.getBoundingClientRect().width, n.style[vt] = "50% 50%", n.style[h] = "scaleX(0.5)", i = r === n.getBoundingClientRect().width && !(kt && y), vr.removeChild(t)), i
            }(),
            yr = function(n, t, i, u, f) {
                var h, l, a, v, y, p, o, w, b, k, d, c, g, nt, s = n._gsTransform,
                    e = wr(n, !0);
                s && (g = s.xOrigin, nt = s.yOrigin);
                (!u || 2 > (h = u.split(" ")).length) && (o = n.getBBox(), t = ht(t).split(" "), h = [(-1 !== t[0].indexOf("%") ? parseFloat(t[0]) / 100 * o.width : parseFloat(t[0])) + o.x, (-1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * o.height : parseFloat(t[1])) + o.y]);
                i.xOrigin = v = parseFloat(h[0]);
                i.yOrigin = y = parseFloat(h[1]);
                u && e !== ki && (p = e[0], o = e[1], w = e[2], b = e[3], k = e[4], d = e[5], c = p * b - o * w, l = v * (b / c) + y * (-w / c) + (w * d - b * k) / c, a = v * (-o / c) + y * (p / c) - (p * d - o * k) / c, v = i.xOrigin = h[0] = l, y = i.yOrigin = h[1] = a);
                s && (f || f !== !1 && r.defaultSmoothOrigin !== !1 ? (l = v - g, a = y - nt, s.xOffset += l * e[0] + a * e[2] - l, s.yOffset += l * e[1] + a * e[3] - a) : s.xOffset = s.yOffset = 0);
                n.setAttribute("data-svg-origin", h.join(" "))
            },
            pr = function(n) {
                return !!(au && "function" == typeof n.getBBox && n.getCTM && (!n.parentNode || n.parentNode.getBBox && n.parentNode.getCTM))
            },
            ki = [1, 0, 0, 1, 0, 0],
            wr = function(n, t) {
                var f, r, i, e, o, c = n._gsTransform || new ui,
                    l = 1e5;
                if (h ? r = u(n, lr, null, !0) : n.currentStyle && (r = n.currentStyle.filter.match(eu), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), c.x || 0, c.y || 0].join(",") : ""), f = !r || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r, (c.svg || n.getBBox && pr(n)) && (f && -1 !== (n.style[h] + "").indexOf("matrix") && (r = n.style[h], f = 0), i = n.getAttribute("transform"), f && i && (-1 !== i.indexOf("matrix") ? (r = i, f = 0) : -1 !== i.indexOf("translate") && (r = "matrix(1,0,0,1," + i.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", f = 0))), f) return ki;
                for (i = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], s = i.length; --s > -1;) e = Number(i[s]), i[s] = (o = e - (e |= 0)) ? (0 | o * l + (0 > o ? -.5 : .5)) / l + e : e;
                return t && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i
            },
            ut = w.getTransform = function(n, i, e, o) {
                if (n._gsTransform && e && !o) return n._gsTransform;
                var c, wt, gt, ni, ut, it, s = e ? n._gsTransform || new ui : new ui,
                    ei = 0 > s.scaleX,
                    ti = 2e-5,
                    ft = 1e5,
                    oi = y ? parseFloat(u(n, vt, i, !1, "0 0 0").split(" ")[2]) || s.zOrigin || 0 : 0,
                    si = parseFloat(r.defaultTransformPerspective) || 0;
                if (s.svg = !(!n.getBBox || !pr(n)), s.svg && (yr(n, u(n, vt, f, !1, "50% 50%") + "", s, n.getAttribute("data-svg-origin")), nt = r.useSVGTransformAttr || vu), c = wr(n), c !== ki) {
                    if (16 === c.length) {
                        var bt, et, kt, l, a, d = c[0],
                            w = c[1],
                            dt = c[2],
                            hi = c[3],
                            ht = c[4],
                            b = c[5],
                            g = c[6],
                            ci = c[7],
                            ot = c[8],
                            k = c[9],
                            p = c[10],
                            ii = c[12],
                            ri = c[13],
                            st = c[14],
                            tt = c[11],
                            v = Math.atan2(g, p);
                        s.zOrigin && (st = -s.zOrigin, ii = ot * st - c[12], ri = k * st - c[13], st = p * st + s.zOrigin - c[14]);
                        s.rotationX = v * rt;
                        v && (l = Math.cos(-v), a = Math.sin(-v), bt = ht * l + ot * a, et = b * l + k * a, kt = g * l + p * a, ot = ht * -a + ot * l, k = b * -a + k * l, p = g * -a + p * l, tt = ci * -a + tt * l, ht = bt, b = et, g = kt);
                        v = Math.atan2(ot, p);
                        s.rotationY = v * rt;
                        v && (l = Math.cos(-v), a = Math.sin(-v), bt = d * l - ot * a, et = w * l - k * a, kt = dt * l - p * a, k = w * a + k * l, p = dt * a + p * l, tt = hi * a + tt * l, d = bt, w = et, dt = kt);
                        v = Math.atan2(w, d);
                        s.rotation = v * rt;
                        v && (l = Math.cos(-v), a = Math.sin(-v), d = d * l + ht * a, et = w * l + b * a, b = w * -a + b * l, g = dt * -a + g * l, w = et);
                        s.rotationX && Math.abs(s.rotationX) + Math.abs(s.rotation) > 359.9 && (s.rotationX = s.rotation = 0, s.rotationY += 180);
                        s.scaleX = (0 | Math.sqrt(d * d + w * w) * ft + .5) / ft;
                        s.scaleY = (0 | Math.sqrt(b * b + k * k) * ft + .5) / ft;
                        s.scaleZ = (0 | Math.sqrt(g * g + p * p) * ft + .5) / ft;
                        s.skewX = 0;
                        s.perspective = tt ? 1 / (0 > tt ? -tt : tt) : 0;
                        s.x = ii;
                        s.y = ri;
                        s.z = st;
                        s.svg && (s.x -= s.xOrigin - (s.xOrigin * d - s.yOrigin * ht), s.y -= s.yOrigin - (s.yOrigin * w - s.xOrigin * b))
                    } else if (!(y && !o && c.length && s.x === c[4] && s.y === c[5] && (s.rotationX || s.rotationY) || void 0 !== s.x && "none" === u(n, "display", i))) {
                        var fi = c.length >= 6,
                            ct = fi ? c[0] : 1,
                            lt = c[1] || 0,
                            at = c[2] || 0,
                            pt = fi ? c[3] : 1;
                        s.x = c[4] || 0;
                        s.y = c[5] || 0;
                        gt = Math.sqrt(ct * ct + lt * lt);
                        ni = Math.sqrt(pt * pt + at * at);
                        ut = ct || lt ? Math.atan2(lt, ct) * rt : s.rotation || 0;
                        it = at || pt ? Math.atan2(at, pt) * rt + ut : s.skewX || 0;
                        Math.abs(it) > 90 && 270 > Math.abs(it) && (ei ? (gt *= -1, it += 0 >= ut ? 180 : -180, ut += 0 >= ut ? 180 : -180) : (ni *= -1, it += 0 >= it ? 180 : -180));
                        s.scaleX = gt;
                        s.scaleY = ni;
                        s.rotation = ut;
                        s.skewX = it;
                        y && (s.rotationX = s.rotationY = s.z = 0, s.perspective = si, s.scaleZ = 1);
                        s.svg && (s.x -= s.xOrigin - (s.xOrigin * ct + s.yOrigin * at), s.y -= s.yOrigin - (s.xOrigin * lt + s.yOrigin * pt))
                    }
                    s.zOrigin = oi;
                    for (wt in s) ti > s[wt] && s[wt] > -ti && (s[wt] = 0)
                }
                return e && (n._gsTransform = s, s.svg && (nt && n.style[h] ? t.delayedCall(.001, function() {
                    yt(n.style, h)
                }) : !nt && n.getAttribute("transform") && t.delayedCall(.001, function() {
                    n.removeAttribute("transform")
                }))), s
            },
            yu = function(n) {
                var o, y, t = this.data,
                    nt = -t.rotation * d,
                    ft = nt + t.skewX * d,
                    e = 1e5,
                    h = (0 | Math.cos(nt) * t.scaleX * e) / e,
                    u = (0 | Math.sin(nt) * t.scaleX * e) / e,
                    f = (0 | Math.sin(ft) * -t.scaleY * e) / e,
                    c = (0 | Math.cos(ft) * t.scaleY * e) / e,
                    b = this.t.style,
                    g = this.t.currentStyle,
                    w, v, et, ot;
                if (g) {
                    y = u;
                    u = -f;
                    f = -y;
                    o = g.filter;
                    b.filter = "";
                    var i, r, l = this.t.offsetWidth,
                        a = this.t.offsetHeight,
                        tt = "absolute" !== g.position,
                        p = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + u + ", M21=" + f + ", M22=" + c,
                        rt = t.x + l * t.xPercent / 100,
                        ut = t.y + a * t.yPercent / 100;
                    if (null != t.ox && (i = (t.oxp ? .01 * l * t.ox : t.ox) - l / 2, r = (t.oyp ? .01 * a * t.oy : t.oy) - a / 2, rt += i - (i * h + r * u), ut += r - (i * f + r * c)), tt ? (i = l / 2, r = a / 2, p += ", Dx=" + (i - (i * h + r * u) + rt) + ", Dy=" + (r - (i * f + r * c) + ut) + ")") : p += ", sizingMethod='auto expand')", b.filter = -1 !== o.indexOf("DXImageTransform.Microsoft.Matrix(") ? o.replace(ou, p) : p + " " + o, (0 === n || 1 === n) && 1 === h && 0 === u && 0 === f && 1 === c && (tt && -1 === p.indexOf("Dx=0, Dy=0") || ci.test(o) && 100 !== parseFloat(RegExp.$1) || -1 === o.indexOf("gradient(" && o.indexOf("Alpha")) && b.removeAttribute("filter")), !tt)
                        for (ot = 8 > it ? 1 : -1, i = t.ieOffsetX || 0, r = t.ieOffsetY || 0, t.ieOffsetX = Math.round((l - ((0 > h ? -h : h) * l + (0 > u ? -u : u) * a)) / 2 + rt), t.ieOffsetY = Math.round((a - ((0 > c ? -c : c) * a + (0 > f ? -f : f) * l)) / 2 + ut), s = 0; 4 > s; s++) v = hu[s], w = g[v], y = -1 !== w.indexOf("px") ? parseFloat(w) : k(this.t, v, parseFloat(w), w.replace(gt, "")) || 0, et = y !== t[v] ? 2 > s ? -t.ieOffsetX : -t.ieOffsetY : 2 > s ? i - t.ieOffsetX : r - t.ieOffsetY, b[v] = (t[v] = Math.round(y - et * (0 === s || 2 === s ? 1 : ot))) + "px"
                }
            },
            pu = w.set3DTransformRatio = w.setTransformRatio = function(n) {
                var c, l, tt, a, v, it, lt, at, rt, vt, yt, ut, ht, i, f, e, u, gt, g, o, s, pt, ft, t = this.data,
                    wt = this.t.style,
                    r = t.rotation,
                    bt = t.rotationX,
                    dt = t.rotationY,
                    b = t.scaleX,
                    k = t.scaleY,
                    et = t.scaleZ,
                    p = t.x,
                    w = t.y,
                    ot = t.z,
                    ct = t.svg,
                    st = t.perspective,
                    ni = t.force3D;
                if (!(((1 !== n && 0 !== n || "auto" !== ni || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && ni || ot || st || dt || bt) && (!nt || !ct) && y)) return r || t.skewX || ct ? (r *= d, pt = t.skewX * d, ft = 1e5, c = Math.cos(r) * b, a = Math.sin(r) * b, l = Math.sin(r - pt) * -k, v = Math.cos(r - pt) * k, pt && "simple" === t.skewType && (u = Math.tan(pt), u = Math.sqrt(1 + u * u), l *= u, v *= u, t.skewY && (c *= u, a *= u)), ct && (p += t.xOrigin - (t.xOrigin * c + t.yOrigin * l) + t.xOffset, w += t.yOrigin - (t.xOrigin * a + t.yOrigin * v) + t.yOffset, nt && (t.xPercent || t.yPercent) && (i = this.t.getBBox(), p += .01 * t.xPercent * i.width, w += .01 * t.yPercent * i.height), i = 1e-6, i > p && p > -i && (p = 0), i > w && w > -i && (w = 0)), g = (0 | c * ft) / ft + "," + (0 | a * ft) / ft + "," + (0 | l * ft) / ft + "," + (0 | v * ft) / ft + "," + p + "," + w + ")", ct && nt ? this.t.setAttribute("transform", "matrix(" + g) : wt[h] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + g) : wt[h] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + b + ",0,0," + k + "," + p + "," + w + ")", void 0;
                if (kt && (i = .0001, i > b && b > -i && (b = et = 2e-5), i > k && k > -i && (k = et = 2e-5), !st || t.z || t.rotationX || t.rotationY || (st = 0)), r || t.skewX) r *= d, f = c = Math.cos(r), e = a = Math.sin(r), t.skewX && (r -= t.skewX * d, f = Math.cos(r), e = Math.sin(r), "simple" === t.skewType && (u = Math.tan(t.skewX * d), u = Math.sqrt(1 + u * u), f *= u, e *= u, t.skewY && (c *= u, a *= u))), l = -e, v = f;
                else {
                    if (!(dt || bt || 1 !== et || st || ct)) return wt[h] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + p + "px," + w + "px," + ot + "px)" + (1 !== b || 1 !== k ? " scale(" + b + "," + k + ")" : ""), void 0;
                    c = v = 1;
                    l = a = 0
                }
                rt = 1;
                tt = it = lt = at = vt = yt = 0;
                ut = st ? -1 / st : 0;
                ht = t.zOrigin;
                i = 1e-6;
                o = ",";
                s = "0";
                r = dt * d;
                r && (f = Math.cos(r), e = Math.sin(r), lt = -e, vt = ut * -e, tt = c * e, it = a * e, rt = f, ut *= f, c *= f, a *= f);
                r = bt * d;
                r && (f = Math.cos(r), e = Math.sin(r), u = l * f + tt * e, gt = v * f + it * e, at = rt * e, yt = ut * e, tt = l * -e + tt * f, it = v * -e + it * f, rt *= f, ut *= f, l = u, v = gt);
                1 !== et && (tt *= et, it *= et, rt *= et, ut *= et);
                1 !== k && (l *= k, v *= k, at *= k, yt *= k);
                1 !== b && (c *= b, a *= b, lt *= b, vt *= b);
                (ht || ct) && (ht && (p += tt * -ht, w += it * -ht, ot += rt * -ht + ht), ct && (p += t.xOrigin - (t.xOrigin * c + t.yOrigin * l) + t.xOffset, w += t.yOrigin - (t.xOrigin * a + t.yOrigin * v) + t.yOffset), i > p && p > -i && (p = s), i > w && w > -i && (w = s), i > ot && ot > -i && (ot = 0));
                g = t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(";
                g += (i > c && c > -i ? s : c) + o + (i > a && a > -i ? s : a) + o + (i > lt && lt > -i ? s : lt);
                g += o + (i > vt && vt > -i ? s : vt) + o + (i > l && l > -i ? s : l) + o + (i > v && v > -i ? s : v);
                bt || dt ? (g += o + (i > at && at > -i ? s : at) + o + (i > yt && yt > -i ? s : yt) + o + (i > tt && tt > -i ? s : tt), g += o + (i > it && it > -i ? s : it) + o + (i > rt && rt > -i ? s : rt) + o + (i > ut && ut > -i ? s : ut) + o) : g += ",0,0,0,0,1,0,";
                g += p + o + w + o + ot + o + (st ? 1 + -ot / st : 1) + ")";
                wt[h] = g
            };
        for (i = ui.prototype, i.x = i.y = i.z = i.skewX = i.skewY = i.rotation = i.rotationX = i.rotationY = i.zOrigin = i.xPercent = i.yPercent = i.xOffset = i.yOffset = 0, i.scaleX = i.scaleY = i.scaleZ = 1, e("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                parser: function(n, t, i, e, s, l, a) {
                    if (e._lastParsedTransform === a) return s;
                    e._lastParsedTransform = a;
                    var p, b, ct, d, k, ft, et, tt, at, yt, ot = n._gsTransform,
                        st = n.style,
                        pt = 1e-6,
                        wt = cr.length,
                        w = a,
                        it = {},
                        rt = "transformOrigin";
                    if (a.display ? (d = u(n, "display"), st.display = "block", p = ut(n, f, !0, a.parseTransform), st.display = d) : p = ut(n, f, !0, a.parseTransform), e._transform = p, "string" == typeof w.transform && h) d = g.style, d[h] = w.transform, d.display = "block", d.position = "absolute", v.body.appendChild(g), b = ut(g, null, !1), v.body.removeChild(g), b.perspective || (b.perspective = p.perspective), null != w.xPercent && (b.xPercent = c(w.xPercent, p.xPercent)), null != w.yPercent && (b.yPercent = c(w.yPercent, p.yPercent));
                    else if ("object" == typeof w) {
                        if (b = {
                                scaleX: c(null != w.scaleX ? w.scaleX : w.scale, p.scaleX),
                                scaleY: c(null != w.scaleY ? w.scaleY : w.scale, p.scaleY),
                                scaleZ: c(w.scaleZ, p.scaleZ),
                                x: c(w.x, p.x),
                                y: c(w.y, p.y),
                                z: c(w.z, p.z),
                                xPercent: c(w.xPercent, p.xPercent),
                                yPercent: c(w.yPercent, p.yPercent),
                                perspective: c(w.transformPerspective, p.perspective)
                            }, tt = w.directionalRotation, null != tt)
                            if ("object" == typeof tt)
                                for (d in tt) w[d] = tt[d];
                            else w.rotation = tt;
                            "string" == typeof w.x && -1 !== w.x.indexOf("%") && (b.x = 0, b.xPercent = c(w.x, p.xPercent));
                        "string" == typeof w.y && -1 !== w.y.indexOf("%") && (b.y = 0, b.yPercent = c(w.y, p.yPercent));
                        b.rotation = lt("rotation" in w ? w.rotation : "shortRotation" in w ? w.shortRotation + "_short" : "rotationZ" in w ? w.rotationZ : p.rotation, p.rotation, "rotation", it);
                        y && (b.rotationX = lt("rotationX" in w ? w.rotationX : "shortRotationX" in w ? w.shortRotationX + "_short" : p.rotationX || 0, p.rotationX, "rotationX", it), b.rotationY = lt("rotationY" in w ? w.rotationY : "shortRotationY" in w ? w.shortRotationY + "_short" : p.rotationY || 0, p.rotationY, "rotationY", it));
                        b.skewX = null == w.skewX ? p.skewX : lt(w.skewX, p.skewX);
                        b.skewY = null == w.skewY ? p.skewY : lt(w.skewY, p.skewY);
                        (ct = b.skewY - p.skewY) && (b.skewX += ct, b.rotation += ct)
                    }
                    for (y && null != w.force3D && (p.force3D = w.force3D, et = !0), p.skewType = w.skewType || p.skewType || r.defaultSkewType, ft = p.force3D || p.z || p.rotationX || p.rotationY || b.z || b.rotationX || b.rotationY || b.perspective, ft || null == w.scale || (b.scaleZ = 1); --wt > -1;) i = cr[wt], k = b[i] - p[i], (k > pt || -pt > k || null != w[i] || null != ni[i]) && (et = !0, s = new o(p, i, p[i], k, s), i in it && (s.e = it[i]), s.xs0 = 0, s.plugin = l, e._overwriteProps.push(s.n));
                    return k = w.transformOrigin, p.svg && (k || w.svgOrigin) && (at = p.xOffset, yt = p.yOffset, yr(n, ht(k), b, w.svgOrigin, w.smoothOrigin), s = ii(p, "xOrigin", (ot ? p : b).xOrigin, b.xOrigin, s, rt), s = ii(p, "yOrigin", (ot ? p : b).yOrigin, b.yOrigin, s, rt), (at !== p.xOffset || yt !== p.yOffset) && (s = ii(p, "xOffset", ot ? at : p.xOffset, p.xOffset, s, rt), s = ii(p, "yOffset", ot ? yt : p.yOffset, p.yOffset, s, rt)), k = nt ? null : "0px 0px"), (k || y && ft && p.zOrigin) && (h ? (et = !0, i = vt, k = (k || u(n, i, f, !1, "50% 50%")) + "", s = new o(st, i, 0, 0, s, -1, rt), s.b = st[i], s.plugin = l, y ? (d = p.zOrigin, k = k.split(" "), p.zOrigin = (k.length > 2 && (0 === d || "0px" !== k[2]) ? parseFloat(k[2]) : d) || 0, s.xs0 = s.e = k[0] + " " + (k[1] || "50%") + " 0px", s = new o(p, "zOrigin", 0, 0, s, -1, s.n), s.b = d, s.xs0 = s.e = p.zOrigin) : s.xs0 = s.e = k) : ht(k + "", p)), et && (e._transformType = p.svg && nt || !ft && 3 !== this._transformType ? 2 : 3), s
                },
                prefix: !0
            }), e("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            }), e("borderRadius", {
                defaultValue: "0px",
                parser: function(n, t, i, r, e) {
                    t = this.format(t);
                    var tt, l, d, h, o, s, p, a, it, rt, c, v, g, w, b, nt, y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        ut = n.style;
                    for (it = parseFloat(n.offsetWidth), rt = parseFloat(n.offsetHeight), tt = t.split(" "), l = 0; y.length > l; l++) this.p.indexOf("border") && (y[l] = et(y[l])), o = h = u(n, y[l], f, !1, "0px"), -1 !== o.indexOf(" ") && (h = o.split(" "), o = h[0], h = h[1]), s = d = tt[l], p = parseFloat(o), v = o.substr((p + "").length), g = "=" === s.charAt(1), g ? (a = parseInt(s.charAt(0) + "1", 10), s = s.substr(2), a *= parseFloat(s), c = s.substr((a + "").length - (0 > a ? 1 : 0)) || "") : (a = parseFloat(s), c = s.substr((a + "").length)), "" === c && (c = wt[i] || v), c !== v && (w = k(n, "borderLeft", p, v), b = k(n, "borderTop", p, v), "%" === c ? (o = 100 * (w / it) + "%", h = 100 * (b / rt) + "%") : "em" === c ? (nt = k(n, "borderLeft", 1, "em"), o = w / nt + "em", h = b / nt + "em") : (o = w + "px", h = b + "px"), g && (s = parseFloat(o) + a + c, d = parseFloat(h) + a + c)), e = ri(ut, y[l], o + " " + h, s + " " + d, !1, "0px", e);
                    return e
                },
                prefix: !0,
                formatter: sr("0px 0px 0px 0px", !1, !0)
            }), e("backgroundPosition", {
                defaultValue: "0 0",
                parser: function(n, t, i, r, e, o) {
                    var c, b, h, v, y, l, p = "background-position",
                        a = f || ot(n, null),
                        s = this.format((a ? it ? a.getPropertyValue(p + "-x") + " " + a.getPropertyValue(p + "-y") : a.getPropertyValue(p) : n.currentStyle.backgroundPositionX + " " + n.currentStyle.backgroundPositionY) || "0 0"),
                        w = this.format(t);
                    if (-1 !== s.indexOf("%") != (-1 !== w.indexOf("%")) && (l = u(n, "backgroundImage").replace(uu, ""), l && "none" !== l)) {
                        for (c = s.split(" "), b = w.split(" "), ai.setAttribute("src", l), h = 2; --h > -1;) s = c[h], v = -1 !== s.indexOf("%"), v !== (-1 !== b[h].indexOf("%")) && (y = 0 === h ? n.offsetWidth - ai.width : n.offsetHeight - ai.height, c[h] = v ? parseFloat(s) / 100 * y + "px" : 100 * (parseFloat(s) / y) + "%");
                        s = c.join(" ")
                    }
                    return this.parseComplex(n.style, s, w, e, o)
                },
                formatter: ht
            }), e("backgroundSize", {
                defaultValue: "0 0",
                formatter: ht
            }), e("perspective", {
                defaultValue: "0px",
                prefix: !0
            }), e("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            }), e("transformStyle", {
                prefix: !0
            }), e("backfaceVisibility", {
                prefix: !0
            }), e("userSelect", {
                prefix: !0
            }), e("margin", {
                parser: wi("marginTop,marginRight,marginBottom,marginLeft")
            }), e("padding", {
                parser: wi("paddingTop,paddingRight,paddingBottom,paddingLeft")
            }), e("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function(n, t, i, r, e, o) {
                    var c, s, h;
                    return 9 > it ? (s = n.currentStyle, h = 8 > it ? " " : ",", c = "rect(" + s.clipTop + h + s.clipRight + h + s.clipBottom + h + s.clipLeft + ")", t = this.format(t).split(",").join(h)) : (c = this.format(u(n, this.p, f, !1, this.dflt)), t = this.format(t)), this.parseComplex(n.style, c, t, e, o)
                }
            }), e("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            }), e("autoRound,strictUnits", {
                parser: function(n, t, i, r, u) {
                    return u
                }
            }), e("border", {
                defaultValue: "0px solid #000",
                parser: function(n, t, i, r, e, o) {
                    return this.parseComplex(n.style, this.format(u(n, "borderTopWidth", f, !1, "0px") + " " + u(n, "borderTopStyle", f, !1, "solid") + " " + u(n, "borderTopColor", f, !1, "#000")), this.format(t), e, o)
                },
                color: !0,
                formatter: function(n) {
                    var t = n.split(" ");
                    return t[0] + " " + (t[1] || "solid") + " " + (n.match(l) || ["#000"])[0]
                }
            }), e("borderWidth", {
                parser: wi("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            }), e("float,cssFloat,styleFloat", {
                parser: function(n, t, i, r, u) {
                    var f = n.style,
                        e = "cssFloat" in f ? "cssFloat" : "styleFloat";
                    return new o(f, e, 0, 0, u, -1, i, !1, 0, f[e], t)
                }
            }), br = function(n) {
                var f, i = this.t,
                    t = i.filter || u(this.data, "filter") || "",
                    r = 0 | this.s + this.c * n;
                100 === r && (-1 === t.indexOf("atrix(") && -1 === t.indexOf("radient(") && -1 === t.indexOf("oader(") ? (i.removeAttribute("filter"), f = !u(this.data, "filter")) : (i.filter = t.replace(iu, ""), f = !0));
                f || (this.xn1 && (i.filter = t = t || "alpha(opacity=" + r + ")"), -1 === t.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = t + " alpha(opacity=" + r + ")") : i.filter = t.replace(ci, "opacity=" + r))
            }, e("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function(n, t, i, r, e, s) {
                    var h = parseFloat(u(n, "opacity", f, !1, "1")),
                        c = n.style,
                        l = "autoAlpha" === i;
                    return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + h), l && 1 === h && "hidden" === u(n, "visibility", f) && 0 !== t && (h = 0), tt ? e = new o(c, "opacity", h, t - h, e) : (e = new o(c, "opacity", 100 * h, 100 * (t - h), e), e.xn1 = l ? 1 : 0, c.zoom = 1, e.type = 2, e.b = "alpha(opacity=" + e.s + ")", e.e = "alpha(opacity=" + (e.s + e.c) + ")", e.data = n, e.plugin = s, e.setRatio = br), l && (e = new o(c, "visibility", 0, 0, e, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit"), e.xs0 = "inherit", r._overwriteProps.push(e.n), r._overwriteProps.push(i)), e
                }
            }), yt = function(n, t) {
                t && (n.removeProperty ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) && (t = "-" + t), n.removeProperty(t.replace(nr, "-$1").toLowerCase())) : n.removeAttribute(t))
            }, kr = function(n) {
                if (this.t._gsClassPT = this, 1 === n || 0 === n) {
                    this.t.setAttribute("class", 0 === n ? this.b : this.e);
                    for (var t = this.data, i = this.t.style; t;) t.v ? i[t.p] = t.v : yt(i, t.p), t = t._next;
                    1 === n && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
            }, e("className", {
                parser: function(n, t, i, r, u, e, s) {
                    var c, y, l, a, h, v = n.getAttribute("class") || "",
                        p = n.style.cssText;
                    if (u = r._classNamePT = new o(n, i, 0, 0, u, 2), u.setRatio = kr, u.pr = -11, ft = !0, u.b = v, y = st(n, f), l = n._gsClassPT) {
                        for (a = {}, h = l.data; h;) a[h.p] = 1, h = h._next;
                        l.setRatio(1)
                    }
                    return n._gsClassPT = u, u.e = "=" !== t.charAt(1) ? t : v.replace(RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), n.setAttribute("class", u.e), c = yi(n, y, st(n), s, a), n.setAttribute("class", v), u.data = c.firstMPT, n.style.cssText = p, u = u.xfirst = r.parse(n, c.difs, u, e)
                }
            }), dr = function(n) {
                if ((1 === n || 0 === n) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var i, t, r, u, f, e = this.t.style,
                        o = a.transform.parse;
                    if ("all" === this.e) e.cssText = "", u = !0;
                    else
                        for (i = this.e.split(" ").join("").split(","), r = i.length; --r > -1;) t = i[r], a[t] && (a[t].parse === o ? u = !0 : t = "transformOrigin" === t ? vt : a[t].p), yt(e, t);
                    u && (yt(e, h), f = this.t._gsTransform, f && (f.svg && this.t.removeAttribute("data-svg-origin"), delete this.t._gsTransform))
                }
            }, e("clearProps", {
                parser: function(n, t, i, r, u) {
                    return u = new o(n, i, 0, 0, u, 2), u.setRatio = dr, u.e = t, u.pr = -10, u.data = r._tween, ft = !0, u
                }
            }), i = "bezier,throwProps,physicsProps,physics2D".split(","), s = i.length; s--;) lu(i[s]);
        return i = r.prototype, i._firstPT = i._lastParsedTransform = i._transform = null, i._onInitTween = function(n, t, i) {
            if (!n.nodeType) return !1;
            this._target = n;
            this._tween = i;
            this._vars = t;
            ei = t.autoRound;
            ft = !1;
            wt = t.suffixMap || r.suffixMap;
            f = ot(n, "");
            fi = this._overwriteProps;
            var l, s, e, v, w, b, p, y, k, c = n.style;
            if (di && "" === c.zIndex && (l = u(n, "zIndex", f), ("auto" === l || "" === l) && this._addLazySet(c, "zIndex", 0)), "string" == typeof t && (v = c.cssText, l = st(n, f), c.cssText = v + ";" + t, l = yi(n, l, st(n)).difs, !tt && tu.test(t) && (l.opacity = parseFloat(RegExp.$1)), t = l, c.cssText = v), this._firstPT = s = t.className ? a.className.parse(n, t.className, "className", this, null, null, t) : this.parse(n, t, null), this._transformType) {
                for (k = 3 === this._transformType, h ? bt && (di = !0, "" === c.zIndex && (p = u(n, "zIndex", f), ("auto" === p || "" === p) && this._addLazySet(c, "zIndex", 0)), gi && this._addLazySet(c, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (k ? "visible" : "hidden"))) : c.zoom = 1, e = s; e && e._next;) e = e._next;
                y = new o(n, "transform", 0, 0, null, 2);
                this._linkCSSP(y, null, e);
                y.setRatio = h ? pu : yu;
                y.data = this._transform || ut(n, f, !0);
                y.tween = i;
                y.pr = -1;
                fi.pop()
            }
            if (ft) {
                for (; s;) {
                    for (b = s._next, e = v; e && e.pr > s.pr;) e = e._next;
                    (s._prev = e ? e._prev : w) ? s._prev._next = s: v = s;
                    (s._next = e) ? e._prev = s: w = s;
                    s = b
                }
                this._firstPT = v
            }
            return !0
        }, i.parse = function(n, t, i, r) {
            var e, d, h, c, v, s, y, l, p, w, b = n.style;
            for (e in t) s = t[e], d = a[e], d ? i = d.parse(n, s, e, this, i, r, t) : (v = u(n, e, f) + "", p = "string" == typeof s, "color" === e || "fill" === e || "stroke" === e || -1 !== e.indexOf("Color") || p && ru.test(s) ? (p || (s = ti(s), s = (s.length > 3 ? "rgba(" : "rgb(") + s.join(",") + ")"), i = ri(b, e, v, s, !0, "transparent", i, 0, r)) : !p || -1 === s.indexOf(" ") && -1 === s.indexOf(",") ? (h = parseFloat(v), y = h || 0 === h ? v.substr((h + "").length) : "", ("" === v || "auto" === v) && ("width" === e || "height" === e ? (h = cu(n, e, f), y = "px") : "left" === e || "top" === e ? (h = er(n, e, f), y = "px") : (h = "opacity" !== e ? 0 : 1, y = "")), w = p && "=" === s.charAt(1), w ? (c = parseInt(s.charAt(0) + "1", 10), s = s.substr(2), c *= parseFloat(s), l = s.replace(gt, "")) : (c = parseFloat(s), l = p ? s.replace(gt, "") : ""), "" === l && (l = e in wt ? wt[e] : y), s = c || 0 === c ? (w ? c + h : c) + l : t[e], y !== l && "" !== l && (c || 0 === c) && h && (h = k(n, e, h, y), "%" === l ? (h /= k(n, e, 100, "%") / 100, t.strictUnits !== !0 && (v = h + "%")) : "em" === l || "rem" === l ? h /= k(n, e, 1, l) : "px" !== l && (c = k(n, e, c, l), l = "px"), w && (c || 0 === c) && (s = c + h + l)), w && (c += h), !h && 0 !== h || !c && 0 !== c ? void 0 !== b[e] && (s || "NaN" != s + "" && null != s) ? (i = new o(b, e, c || h || 0, 0, i, -1, e, !1, 0, v, s), i.xs0 = "none" !== s || "display" !== e && -1 === e.indexOf("Style") ? s : v) : ur("invalid " + e + " tween value: " + t[e]) : (i = new o(b, e, h, c - h, i, 0, e, ei !== !1 && ("px" === l || "zIndex" === e), 0, v, s), i.xs0 = l)) : i = ri(b, e, v, s, !0, null, i, 0, r)), r && i && !i.plugin && (i.plugin = r);
            return i
        }, i.setRatio = function(n) {
            var r, u, i, t = this._firstPT,
                f = 1e-6;
            if (1 !== n || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (n || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                    for (; t;) {
                        if (r = t.c * n + t.s, t.r ? r = Math.round(r) : f > r && r > -f && (r = 0), t.type)
                            if (1 === t.type)
                                if (i = t.l, 2 === i) t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2;
                                else if (3 === i) t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3;
                        else if (4 === i) t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3 + t.xn3 + t.xs4;
                        else if (5 === i) t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3 + t.xn3 + t.xs4 + t.xn4 + t.xs5;
                        else {
                            for (u = t.xs0 + r + t.xs1, i = 1; t.l > i; i++) u += t["xn" + i] + t["xs" + (i + 1)];
                            t.t[t.p] = u
                        } else -1 === t.type ? t.t[t.p] = t.xs0 : t.setRatio && t.setRatio(n);
                        else t.t[t.p] = r + t.xs0;
                        t = t._next
                    } else
                        for (; t;) 2 !== t.type ? t.t[t.p] = t.b : t.setRatio(n), t = t._next;
                else
                    for (; t;) {
                        if (2 !== t.type)
                            if (t.r && -1 !== t.type)
                                if (r = Math.round(t.s + t.c), t.type) {
                                    if (1 === t.type) {
                                        for (i = t.l, u = t.xs0 + r + t.xs1, i = 1; t.l > i; i++) u += t["xn" + i] + t["xs" + (i + 1)];
                                        t.t[t.p] = u
                                    }
                                } else t.t[t.p] = r + t.xs0;
                        else t.t[t.p] = t.e;
                        else t.setRatio(n);
                        t = t._next
                    }
        }, i._enableTransforms = function(n) {
            this._transform = this._transform || ut(this._target, f, !0);
            this._transformType = this._transform.svg && nt || !n && 3 !== this._transformType ? 2 : 3
        }, gr = function() {
            this.t[this.p] = this.e;
            this.data._linkCSSP(this, this._next, null, !0)
        }, i._addLazySet = function(n, t, i) {
            var r = this._firstPT = new o(n, t, 0, 0, this._firstPT, 2);
            r.e = i;
            r.setRatio = gr;
            r.data = this
        }, i._linkCSSP = function(n, t, i, r) {
            return n && (t && (t._prev = n), n._next && (n._next._prev = n._prev), n._prev ? n._prev._next = n._next : this._firstPT === n && (this._firstPT = n._next, r = !0), i ? i._next = n : r || null !== this._firstPT || (this._firstPT = n), n._next = t, n._prev = i), n
        }, i._kill = function(t) {
            var i, f, r, u = t;
            if (t.autoAlpha || t.alpha) {
                u = {};
                for (f in t) u[f] = t[f];
                u.opacity = 1;
                u.autoAlpha && (u.visibility = 1)
            }
            return t.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), n.prototype._kill.call(this, u)
        }, pt = function(n, t, i) {
            var e, u, r, f;
            if (n.slice)
                for (u = n.length; --u > -1;) pt(n[u], t, i);
            else
                for (e = n.childNodes, u = e.length; --u > -1;) r = e[u], f = r.type, r.style && (t.push(st(r)), i && i.push(r)), 1 !== f && 9 !== f && 11 !== f || !r.childNodes.length || pt(r, t, i)
        }, r.cascadeTo = function(n, i, r) {
            var u, f, e, h, o = t.to(n, i, r),
                l = [o],
                c = [],
                a = [],
                s = [],
                v = t._internals.reservedProps;
            for (n = o._targets || o.target, pt(n, c, s), o.render(i, !0, !0), pt(n, a), o.render(0, !0, !0), o._enabled(!0), u = s.length; --u > -1;)
                if (f = yi(s[u], c[u], a[u]), f.firstMPT) {
                    f = f.difs;
                    for (e in r) v[e] && (f[e] = r[e]);
                    h = {};
                    for (e in f) h[e] = c[u][e];
                    l.push(t.fromTo(s[u], i, h, f))
                }
            return l
        }, n.activate([r]), r
    }, !0)
});
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(n) {
        "use strict";
        var t = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[n]
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], t) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = t())
    }("CSSPlugin");
    
    if (_gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("plugins.CSSRulePlugin", ["plugins.TweenPlugin", "TweenLite", "plugins.CSSPlugin"], function(n, t, i) {
            var r = function() {
                    n.call(this, "cssRule");
                    this._overwriteProps.length = 0
                },
                f = window.document,
                e = i.prototype.setRatio,
                u = r.prototype = new i;
            return u._propName = "cssRule", u.constructor = r, r.version = "0.6.3", r.API = 2, r.getRule = function(n) {
                var r, i, t, u, h = f.all ? "rules" : "cssRules",
                    o = f.styleSheets,
                    s = o.length,
                    e = ":" === n.charAt(0);
                for (n = (e ? "" : ",") + n.toLowerCase() + ",", e && (u = []); --s > -1;) {
                    try {
                        if (i = o[s][h], !i) continue;
                        r = i.length
                    } catch (c) {
                        console.log(c);
                        continue
                    }
                    for (; --r > -1;)
                        if (t = i[r], t.selectorText && -1 !== ("," + t.selectorText.split("::").join(":").toLowerCase() + ",").indexOf(n)) {
                            if (!e) return t.style;
                            u.push(t.style)
                        }
                }
                return u
            }, u._onInitTween = function(n, t, r) {
                if (void 0 === n.cssText) return !1;
                var u = n._gsProxy = n._gsProxy || f.createElement("div");
                return this._ss = n, this._proxy = u.style, u.style.cssText = n.cssText, i.prototype._onInitTween.call(this, u, t, r), !0
            }, u.setRatio = function(n) {
                e.call(this, n);
                this._ss.cssText = this._proxy.cssText
            }, n.activate([r]), r
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), BeoGlobal && console.log("ERROR: BeoGlobal is a singleton!"), BeoGlobal = {}, BeoGlobal._mobileBreakpointW = 767.5, BeoGlobal._vw = 0, BeoGlobal._vh = 0, BeoGlobal._sw = 0, BeoGlobal._sh = 0, BeoGlobal._vwOuter = 0, BeoGlobal._maxResW = screen.width, BeoGlobal._wasScrollbarVisible, BeoGlobal._scrollbarVisible = !1, BeoGlobal._oldvwOuter = 0, BeoGlobal._reliableSh = 0, BeoGlobal._zoom = 1, BeoGlobal._bodyRect, BeoGlobal._desktopMargins = [54, 30, 30, 30], BeoGlobal._mobileMargins = [54, 10, 10, 10], BeoGlobal._margins = BeoGlobal._desktopMargins, BeoGlobal._iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), BeoGlobal._iosAndChrome = !1, BeoGlobal._iOS && navigator.userAgent.match("CriOS") && (BeoGlobal._iosAndChrome = !0), BeoGlobal._androidVersion = 0, BeoGlobal._iOSVersion = 0, BeoGlobal._firefox = navigator.userAgent.indexOf("Firefox") > -1, BeoGlobal._isIE && (BeoGlobal._isIEVersion = parseFloat(jQuery.browser.version)), BeoGlobal._isIE11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./), BeoGlobal._isIE11 == !0 && (BeoGlobal._isIE = !0, BeoGlobal._isIEVersion = 11), BeoGlobal._isTouch = "ontouchstart" in window, BeoGlobal._dpi = window.devicePixelRatio, BeoGlobal._platform = navigator.platform || "", BeoGlobal._isWindows = BeoGlobal._platform.substr(0, 3) == "Win", BeoGlobal._isTouch && BeoGlobal._iOS && (BeoGlobal._isWindows = !1), BeoGlobal._windowScrollY = 0, BeoGlobal._ignoreScroll = !1, BeoGlobal._menuDisabler = 0, BeoGlobal._repaintsWhileScrolling = !0, BeoGlobal._bodyH, BeoGlobal._oldbodyH, BeoGlobal._bodyHCount = 0, BeoGlobal._bodyHDelay = 1e3, BeoGlobal._bodyHInterval, BeoGlobal._bodyHTimer, BeoGlobal._isTouch)
    
    if (BeoGlobal._bodyHDelay = 2e3, BeoGlobal._iOS) {
        var _av = navigator.appVersion,
            v = _av.match(/OS (\d+)_(\d+)_?(\d+)?/),
            ver = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        if (BeoGlobal._iOSVersion = ver[0], _chromeVersion = 47, BeoGlobal._iosAndChrome) try {
            _chromeVersion = parseInt(_av.substr(_av.indexOf("CriOS/") + 6, 2)) || 47
        } catch (e) {}(BeoGlobal._iOSVersion < 8 || BeoGlobal._iosAndChrome && _chromeVersion <= 47) && (BeoGlobal._repaintsWhileScrolling = !1)
    } else ua = navigator.userAgent.toLowerCase(), match = ua.match(/android\s([0-9\.]*)/), match ? (_androidVersion = match ? match[1] : !1, BeoGlobal._androidVersion = parseFloat(_androidVersion), parseInt(_androidVersion) < 4 && (BeoGlobal._repaintsWhileScrolling = !1)) : BeoGlobal._repaintsWhileScrolling = !1;
BeoGlobal.screensize = function() {
    window.innerWidth ? (BeoGlobal._vw = window.innerWidth, BeoGlobal._vh = window.innerHeight) : (BeoGlobal._vw = document.documentElement.offsetWidth, BeoGlobal._vh = document.documentElement.offsetHeight);
    BeoGlobal._vwOuter = BeoGlobal._vw;
    BeoGlobal._margins = BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW ? BeoGlobal._mobileMargins : BeoGlobal._desktopMargins
};
BeoGlobal.resized = function(n) {
    BeoGlobal._oldvwOuter = BeoGlobal._vwOuter;
    BeoGlobal.screensize();
    n && BeoGlobal._isTouch && BeoGlobal._oldvwOuter === BeoGlobal._vwOuter && n.stopImmediatePropagation();
    BeoGlobal._isTouch ? (BeoGlobal._reliableSh = BeoGlobal._vh < BeoGlobal._vw ? Math.min(window.screen.availWidth, window.screen.availHeight) : Math.max(window.screen.availWidth, window.screen.availHeight), BeoGlobal._zoom = window.innerWidth > window.innerHeight ? Math.max(window.screen.width, window.screen.height) / window.innerWidth : Math.min(window.screen.width, window.screen.height) / window.innerWidth, BeoGlobal._iOS && (BeoGlobal._iosAndChrome && Math.max(BeoGlobal._vw, BeoGlobal._vh) > 1020 || (BeoGlobal._reliableSh -= 20 * BeoGlobal._zoom))) : (BeoGlobal.checkBodyW(), BeoGlobal._reliableSh = BeoGlobal._vh);
    BeoGlobal._sw = BeoGlobal._vw - BeoGlobal._margins[2] - BeoGlobal._margins[3];
    BeoGlobal._sh = Math.round((BeoGlobal._vh - BeoGlobal._margins[0] - BeoGlobal._margins[1]) / BeoGlobal._zoom);
    BeoGlobal._reliableSh = Math.round((BeoGlobal._reliableSh - BeoGlobal._margins[0] - BeoGlobal._margins[1]) / BeoGlobal._zoom);
    BeoGlobal.scrolled(null);
    clearInterval(BeoGlobal._bodyHInterval);
    BeoGlobal._bodyHInterval = setInterval(BeoGlobal.checkBodyH, BeoGlobal._bodyHDelay);
    clearTimeout(BeoGlobal._bodyHTimer);
    BeoGlobal._bodyHTimer = setTimeout(BeoGlobal.checkBodyH, 100)
};
BeoGlobal.checkBodyW = function() {
    BeoGlobal._bodyRect = document.body.getBoundingClientRect();
    BeoGlobal._wasScrollbarVisible = BeoGlobal._scrollbarVisible;
    var n = Math.abs(BeoGlobal._bodyRect.width - BeoGlobal._vwOuter);
    n > 2 && n < 100 ? (BeoGlobal._scrollbarVisible = !0, BeoGlobal._vw = BeoGlobal._bodyRect.width) : BeoGlobal._scrollbarVisible = !1;
    BeoGlobal._scrollbarVisible != BeoGlobal._wasScrollbarVisible && window.dispatchEvent(BeoCustomEvent("resize", 0))
};
BeoGlobal.checkBodyH = function() {
    BeoGlobal._bodyHCount++;
    (BeoGlobal._bodyHCount >= 10 || BeoGlobal._bodyHDelay != 5e3 && BeoGlobal._bodyHCount > 2) && (BeoGlobal._bodyHDelay = 5e3, clearInterval(BeoGlobal._bodyHInterval), BeoGlobal._bodyHInterval = setInterval(BeoGlobal.checkBodyH, BeoGlobal._bodyHDelay));
    BeoGlobal._oldbodyH = BeoGlobal._bodyH;
    BeoGlobal._bodyH = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    BeoGlobal._isTouch || BeoGlobal.checkBodyW();
    (BeoGlobal._bodyH != BeoGlobal._oldbodyH || BeoGlobal._bodyHCount == 1) && BeoGlobal.dispatchUpdate()
};
BeoGlobal.dispatchUpdate = function() {
    window.dispatchEvent(BeoCustomEvent("LayoutUpdate", 0))
};
BeoGlobal.scrolled = function() {
    BeoGlobal._windowScrollY = jQuery(window).scrollTop();
    BeoGlobal._thresholdTimerRunning || (BeoGlobal._thresholdTimerRunning = !0, BeoGlobal._thresholdInterval = setInterval(BeoGlobal.updateThreshold, 300), BeoGlobal.updateThreshold())
};
BeoGlobal._thresholdTimerRunning = !1;
BeoGlobal._thresholdInterval;
BeoGlobal._lastScrollY = 0;
BeoGlobal._beoDifScrollY = 0;
BeoGlobal._thresholdSwipe = 8;
BeoGlobal.updateThreshold = function() {
    BeoGlobal._beoDifScrollY = BeoGlobal._lastScrollY - BeoGlobal._windowScrollY;
    BeoGlobal._lastScrollY = BeoGlobal._windowScrollY;
    Math.abs(BeoGlobal._beoDifScrollY) <= 1 ? (BeoGlobal._thresholdTimerRunning = !1, clearInterval(BeoGlobal._thresholdInterval), BeoGlobal._thresholdSwipe = 8) : BeoGlobal._thresholdSwipe = 64
};
BeoGlobal.offsetY = function(n) {
    return n.getBoundingClientRect().top + BeoGlobal._windowScrollY
};

BeoGlobal.reqAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
BeoEvents(window, "resize", BeoGlobal.resized, !0);
BeoGlobal.resized(null);
BeoEvents(window, "scroll", BeoGlobal.scrolled, !0),
    function(n) {
        var f = [],
            r = !0,
            e = document.getElementsByClassName("menuleftlogo")[0],
            u, i = "",
            t = "";
        n._justClicked = !1;
        n.hashedModules = [];
        n._useHistory = !!(window.history && history.pushState);
        BeoGlobal._isTouch && !BeoGlobal._iOS && BeoGlobal._androidVersion < 4.3 && (n._useHistory = !1);
        n.disableLogoColour = function() {
            r = !1
        };
        n.enableLogoColour = function() {
            r = !0
        };
        n.colourLogo = function(n) {
            var t, u;
            r && (i = "#333333", n.length && (t = n.attr("logo-colour"), typeof t == "undefined" ? (u = n.children("[logo-colour]:first"), u.length && (t = u.attr("logo-colour")), typeof t != "undefined" && (i = t)) : i = t), e.style.backgroundColor = i)
        };
        n.highlightElement = function(n) {
            var i = f[n];
            i !== "" && (t == "firstItem" ? jQuery(".inpagenav .inpagenavitem:first").removeClass("selecteditem") : t != "" && jQuery("#" + t).removeClass("selecteditem"), t = i, jQuery("#" + i).addClass("selecteditem"))
        };
        n.loadAnchors = function() {
            jQuery(".inpagenav .inpagenavitem").each(function() {
                var f = jQuery(this).attr("dataanchors"),
                    t, u, e;
                if (f) {
                    var i = f.split("|"),
                        o = i.length,
                        r = [];
                    for (t = 0; t < o; ++t) u = document.querySelector("[data-anchor='" + i[t] + "']"), u && (e = u.className || "", e.indexOf("mobileOnly") != -1 || r.push(i[t]));
                    r.length > 0 && (jQuery(this).css("display", "inline-block"), n.registerAnchors(jQuery(this).attr("id"), r))
                } else jQuery(this).attr("href").length > 0 && jQuery(this).css("display", "inline-block")
            });
            jQuery("div[data-anchor]").each(function() {
                n.hashedModules.push(this)
            });
            n.registerAllAnchorsOnPage()
        };
        n.registerAnchors = function(n, t) {
            var r, u, i;
            if (t !== null && typeof t != "undefined")
                for (r = document.getElementById(n), r.setAttribute("href", "#" + t[0]), u = t.length, i = 0; i < u; ++i) f[t[i]] = n
        };
        n.registerAllAnchorsOnPage = function() {
            var t;
            if (n._useHistory) {
                var i = document.querySelectorAll("a[href*='#']"),
                    u = i.length,
                    r = "",
                    f = document.getElementsByClassName("relationspotmenulist"),
                    e = document.getElementsByClassName("relationspotmenulist filter");
                if (!(f.length > 0) || !(e.length < 1))
                    for (t = 0; t < u; t++) r = i[t].getAttribute("href") || "", r.substr(0, 1) == "#" && r.length > 1 && BeoEvents(i[t], "click", n.linkClicked, !0)
            }
        };
        n.linkClicked = function(t) {
            t.preventDefault();
            t.stopPropagation();
            data = t.target.getAttribute("href") || t.currentTarget.getAttribute("href") || "#buy";
            window.history.replaceState(null, null, data);
            n._justClicked = !0;
            window.dispatchEvent(BeoCustomEvent("internalHashchange", 0));
            n._justClicked = !1
        };
        n.refreshAnchor = function(i) {
            try {
                i !== "" && i !== null ? (u = document.querySelector("[data-anchor='" + i + "']"), n.highlightElement(i)) : (u = jQuery("[data-anchor]:first"), t != "" && jQuery("#" + t).removeClass("selecteditem"), t = "firstItem", jQuery(".inpagenav .inpagenavitem:first").addClass("selecteditem"));
                n.colourLogo(u)
            } catch (r) {
                console.log("Error in refreshAnchor!")
            }
        };
        n.loadAnchors()
    }(window.ProductNavigation = window.ProductNavigation || {});
var _BeoUSPCount = 0,
    _BeoUSPPlayerCount = 0,
    _numBeoUSP = document.getElementsByClassName("beousp").length;
for (i = 0; i < _numBeoUSP; i++) new BeoScrollModule(BeoUSP, "all");
