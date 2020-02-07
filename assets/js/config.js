$(function() {
    
var Notifier = new function () {
    this._alert = null;
    return {
        notify: function (f, j) {
            var n = this.main;
            var i = this.main.document;
            var a = i.documentElement;
            var h = n.innerWidth ? n.innerWidth + n.pageXOffset : a.clientWidth + a.scrollLeft;
            var e = n.innerHeight ? n.innerHeight + n.pageYOffset : a.clientHeight + a.scrollTop;
            var l = i.createElement("div");
            l.id = "Message";
            l.className = j || "";
            l.style.cssText = "position:fixed;white-space:nowrap;";
            if (l.className.length == 0) {
                l.className = "notifier"
            }
            l = i.body.insertBefore(l, i.body.firstChild);
            l.innerHTML = f;
            var k = l.offsetWidth;
            var g = l.offsetHeight;
            l.style.display = "none";
            l.style.bottom = 0;
            l.style.left = Math.random() * (h - k) + "px";
            l.style.display = "block";
            setFading(l, 150, 0, 2000, function () {
                i.body.removeChild(l)
            })
        },
        init: function (a, b) {
            this.main = a;
            if (b == "" || b == "null") {
                b = "notifier"
            }
            this.classname = b || "";
            if (this._alert == null) {
                this._alert = this.main.alert;
                this.main.alert = function (c, d) {
                    Notifier.notify(c, d)
                }
            }
        },
        shut: function () {
            if (this._alert != null) {
                this.main.alert = this._alert;
                this._alert = null
            }
        }
    }
};

function setFading(j, a, h, i, g) {
    var c = setInterval(function () {
        a = stepFX(a, h, 2);
        setOpacity(j, a / 100);
        if (a == h) {
            if (c) {
                clearInterval(c);
                c = null
            }
            if (typeof g == "function") {
                g()
            }
        }
    }, i / 50)
}
function setOpacity(a, b) {
    a.style.filter = "alpha(opacity=" + b * 100 + ")";
    a.style.opacity = b
}
function stepFX(a, d, c) {
    return a > d ? a - c > d ? a - c : d : a < d ? a + c < d ? a + c : d : a
}
var __alert = window.alert;
var classN = "";
Notifier.init(window, "notifier");

});
