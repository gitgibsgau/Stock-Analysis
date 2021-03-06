/*
 Highmaps JS v5.0.5 (2016-11-29)

 (c) 2011-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(K, a) {
    "object" === typeof module && module.exports ? module.exports = K.document ? a(K) : a : K.Highcharts = a(K)
})("undefined" !== typeof window ? window : this, function(K) {
    K = function() {
        var a = window,
            B = a.document,
            F = a.navigator && a.navigator.userAgent || "",
            D = B && B.createElementNS && !!B.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            E = /(edge|msie|trident)/i.test(F) && !window.opera,
            g = !D,
            e = /Firefox/.test(F),
            q = e && 4 > parseInt(F.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highmaps",
            version: "5.0.5",
            deg2rad: 2 * Math.PI / 360,
            doc: B,
            hasBidiBug: q,
            hasTouch: B && void 0 !== B.documentElement.ontouchstart,
            isMS: E,
            isWebKit: /AppleWebKit/.test(F),
            isFirefox: e,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(F),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: D,
            vml: g,
            win: a,
            charts: [],
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {}
        }
    }();
    (function(a) {
        var B = [],
            F = a.charts,
            D = a.doc,
            E = a.win;
        a.error = function(a, e) {
            a = "Highcharts error #" +
                a + ": www.highcharts.com/errors/" + a;
            if (e) throw Error(a);
            E.console && console.log(a)
        };
        a.Fx = function(a, e, q) {
            this.options = e;
            this.elem = a;
            this.prop = q
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    e = this.paths[1],
                    q = [],
                    t = this.now,
                    h = a.length,
                    u;
                if (1 === t) q = this.toD;
                else if (h === e.length && 1 > t)
                    for (; h--;) u = parseFloat(a[h]), q[h] = isNaN(u) ? a[h] : t * parseFloat(e[h] - u) + u;
                else q = e;
                this.elem.attr("d", q, null, !0)
            },
            update: function() {
                var a = this.elem,
                    e = this.prop,
                    q = this.now,
                    t = this.options.step;
                if (this[e + "Setter"]) this[e +
                    "Setter"]();
                else a.attr ? a.element && a.attr(e, q, null, !0) : a.style[e] = q + this.unit;
                t && t.call(a, q, this)
            },
            run: function(a, e, q) {
                var g = this,
                    h = function(a) {
                        return h.stopped ? !1 : g.step(a)
                    },
                    u;
                this.startTime = +new Date;
                this.start = a;
                this.end = e;
                this.unit = q;
                this.now = this.start;
                this.pos = 0;
                h.elem = this.elem;
                h.prop = this.prop;
                h() && 1 === B.push(h) && (h.timerId = setInterval(function() {
                    for (u = 0; u < B.length; u++) B[u]() || B.splice(u--, 1);
                    B.length || clearInterval(h.timerId)
                }, 13))
            },
            step: function(a) {
                var g = +new Date,
                    q, t = this.options;
                q = this.elem;
                var h = t.complete,
                    u = t.duration,
                    d = t.curAnim,
                    m;
                if (q.attr && !q.element) q = !1;
                else if (a || g >= u + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    a = d[this.prop] = !0;
                    for (m in d) !0 !== d[m] && (a = !1);
                    a && h && h.call(q);
                    q = !1
                } else this.pos = t.easing((g - this.startTime) / u), this.now = this.start + (this.end - this.start) * this.pos, this.update(), q = !0;
                return q
            },
            initPath: function(a, e, q) {
                function g(a) {
                    var c, n;
                    for (b = a.length; b--;) c = "M" === a[b] || "L" === a[b], n = /[a-zA-Z]/.test(a[b + 3]), c && n && a.splice(b + 1, 0, a[b + 1], a[b + 2], a[b + 1], a[b +
                        2])
                }

                function h(a, c) {
                    for (; a.length < f;) {
                        a[0] = c[f - a.length];
                        var n = a.slice(0, k);
                        [].splice.apply(a, [0, 0].concat(n));
                        C && (n = a.slice(a.length - k), [].splice.apply(a, [a.length, 0].concat(n)), b--)
                    }
                    a[0] = "M"
                }

                function u(a, b) {
                    for (var n = (f - a.length) / k; 0 < n && n--;) c = a.slice().splice(a.length / r - k, k * r), c[0] = b[f - k - n * k], p && (c[k - 6] = c[k - 2], c[k - 5] = c[k - 1]), [].splice.apply(a, [a.length / r, 0].concat(c)), C && n--
                }
                e = e || "";
                var d, m = a.startX,
                    w = a.endX,
                    p = -1 < e.indexOf("C"),
                    k = p ? 7 : 3,
                    f, c, b;
                e = e.split(" ");
                q = q.slice();
                var C = a.isArea,
                    r = C ? 2 : 1,
                    n;
                p && (g(e), g(q));
                if (m && w) {
                    for (b = 0; b < m.length; b++)
                        if (m[b] === w[0]) {
                            d = b;
                            break
                        } else if (m[0] === w[w.length - m.length + b]) {
                        d = b;
                        n = !0;
                        break
                    }
                    void 0 === d && (e = [])
                }
                e.length && (f = q.length + (d || 0) * r * k, n ? (h(e, q), u(q, e)) : (h(q, e), u(e, q)));
                return [e, q]
            }
        };
        a.extend = function(a, e) {
            var g;
            a || (a = {});
            for (g in e) a[g] = e[g];
            return a
        };
        a.merge = function() {
            var g, e = arguments,
                q, t = {},
                h = function(g, d) {
                    var m, w;
                    "object" !== typeof g && (g = {});
                    for (w in d) d.hasOwnProperty(w) && (m = d[w], a.isObject(m, !0) && "renderTo" !== w && "number" !== typeof m.nodeType ? g[w] =
                        h(g[w] || {}, m) : g[w] = d[w]);
                    return g
                };
            !0 === e[0] && (t = e[1], e = Array.prototype.slice.call(e, 2));
            q = e.length;
            for (g = 0; g < q; g++) t = h(t, e[g]);
            return t
        };
        a.pInt = function(a, e) {
            return parseInt(a, e || 10)
        };
        a.isString = function(a) {
            return "string" === typeof a
        };
        a.isArray = function(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function(g, e) {
            return g && "object" === typeof g && (!e || !a.isArray(g))
        };
        a.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase = function(a,
            e) {
            for (var g = a.length; g--;)
                if (a[g] === e) {
                    a.splice(g, 1);
                    break
                }
        };
        a.defined = function(a) {
            return void 0 !== a && null !== a
        };
        a.attr = function(g, e, q) {
            var t, h;
            if (a.isString(e)) a.defined(q) ? g.setAttribute(e, q) : g && g.getAttribute && (h = g.getAttribute(e));
            else if (a.defined(e) && a.isObject(e))
                for (t in e) g.setAttribute(t, e[t]);
            return h
        };
        a.splat = function(g) {
            return a.isArray(g) ? g : [g]
        };
        a.syncTimeout = function(a, e, q) {
            if (e) return setTimeout(a, e, q);
            a.call(0, q)
        };
        a.pick = function() {
            var a = arguments,
                e, q, t = a.length;
            for (e = 0; e < t; e++)
                if (q =
                    a[e], void 0 !== q && null !== q) return q
        };
        a.css = function(g, e) {
            a.isMS && !a.svg && e && void 0 !== e.opacity && (e.filter = "alpha(opacity\x3d" + 100 * e.opacity + ")");
            a.extend(g.style, e)
        };
        a.createElement = function(g, e, q, t, h) {
            g = D.createElement(g);
            var u = a.css;
            e && a.extend(g, e);
            h && u(g, {
                padding: 0,
                border: "none",
                margin: 0
            });
            q && u(g, q);
            t && t.appendChild(g);
            return g
        };
        a.extendClass = function(g, e) {
            var q = function() {};
            q.prototype = new g;
            a.extend(q.prototype, e);
            return q
        };
        a.pad = function(a, e, q) {
            return Array((e || 2) + 1 - String(a).length).join(q ||
                0) + a
        };
        a.relativeLength = function(a, e) {
            return /%$/.test(a) ? e * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function(a, e, q) {
            var g = a[e];
            a[e] = function() {
                var a = Array.prototype.slice.call(arguments),
                    e = arguments,
                    d = this;
                d.proceed = function() {
                    g.apply(d, arguments.length ? arguments : e)
                };
                a.unshift(g);
                a = q.apply(this, a);
                d.proceed = null;
                return a
            }
        };
        a.getTZOffset = function(g) {
            var e = a.Date;
            return 6E4 * (e.hcGetTimezoneOffset && e.hcGetTimezoneOffset(g) || e.hcTimezoneOffset || 0)
        };
        a.dateFormat = function(g, e, q) {
            if (!a.defined(e) || isNaN(e)) return a.defaultOptions.lang.invalidDate ||
                "";
            g = a.pick(g, "%Y-%m-%d %H:%M:%S");
            var t = a.Date,
                h = new t(e - a.getTZOffset(e)),
                u, d = h[t.hcGetHours](),
                m = h[t.hcGetDay](),
                w = h[t.hcGetDate](),
                p = h[t.hcGetMonth](),
                k = h[t.hcGetFullYear](),
                f = a.defaultOptions.lang,
                c = f.weekdays,
                b = f.shortWeekdays,
                C = a.pad,
                t = a.extend({
                    a: b ? b[m] : c[m].substr(0, 3),
                    A: c[m],
                    d: C(w),
                    e: C(w, 2, " "),
                    w: m,
                    b: f.shortMonths[p],
                    B: f.months[p],
                    m: C(p + 1),
                    y: k.toString().substr(2, 2),
                    Y: k,
                    H: C(d),
                    k: d,
                    I: C(d % 12 || 12),
                    l: d % 12 || 12,
                    M: C(h[t.hcGetMinutes]()),
                    p: 12 > d ? "AM" : "PM",
                    P: 12 > d ? "am" : "pm",
                    S: C(h.getSeconds()),
                    L: C(Math.round(e %
                        1E3), 3)
                }, a.dateFormats);
            for (u in t)
                for (; - 1 !== g.indexOf("%" + u);) g = g.replace("%" + u, "function" === typeof t[u] ? t[u](e) : t[u]);
            return q ? g.substr(0, 1).toUpperCase() + g.substr(1) : g
        };
        a.formatSingle = function(g, e) {
            var q = /\.([0-9])/,
                t = a.defaultOptions.lang;
            /f$/.test(g) ? (q = (q = g.match(q)) ? q[1] : -1, null !== e && (e = a.numberFormat(e, q, t.decimalPoint, -1 < g.indexOf(",") ? t.thousandsSep : ""))) : e = a.dateFormat(g, e);
            return e
        };
        a.format = function(g, e) {
            for (var q = "{", t = !1, h, u, d, m, w = [], p; g;) {
                q = g.indexOf(q);
                if (-1 === q) break;
                h = g.slice(0,
                    q);
                if (t) {
                    h = h.split(":");
                    u = h.shift().split(".");
                    m = u.length;
                    p = e;
                    for (d = 0; d < m; d++) p = p[u[d]];
                    h.length && (p = a.formatSingle(h.join(":"), p));
                    w.push(p)
                } else w.push(h);
                g = g.slice(q + 1);
                q = (t = !t) ? "}" : "{"
            }
            w.push(g);
            return w.join("")
        };
        a.getMagnitude = function(a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function(g, e, q, t, h) {
            var u, d = g;
            q = a.pick(q, 1);
            u = g / q;
            e || (e = h ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === t && (1 === q ? e = a.grep(e, function(a) {
                return 0 === a % 1
            }) : .1 >= q && (e = [1 / q])));
            for (t = 0; t < e.length && !(d = e[t], h && d * q >= g || !h && u <= (e[t] + (e[t + 1] || e[t])) / 2); t++);
            return d * q
        };
        a.stableSort = function(a, e) {
            var g = a.length,
                t, h;
            for (h = 0; h < g; h++) a[h].safeI = h;
            a.sort(function(a, d) {
                t = e(a, d);
                return 0 === t ? a.safeI - d.safeI : t
            });
            for (h = 0; h < g; h++) delete a[h].safeI
        };
        a.arrayMin = function(a) {
            for (var e = a.length, g = a[0]; e--;) a[e] < g && (g = a[e]);
            return g
        };
        a.arrayMax = function(a) {
            for (var e = a.length, g = a[0]; e--;) a[e] > g && (g = a[e]);
            return g
        };
        a.destroyObjectProperties = function(a, e) {
            for (var g in a) a[g] && a[g] !== e && a[g].destroy &&
                a[g].destroy(), delete a[g]
        };
        a.discardElement = function(g) {
            var e = a.garbageBin;
            e || (e = a.createElement("div"));
            g && e.appendChild(g);
            e.innerHTML = ""
        };
        a.correctFloat = function(a, e) {
            return parseFloat(a.toPrecision(e || 14))
        };
        a.setAnimation = function(g, e) {
            e.renderer.globalAnimation = a.pick(g, e.options.chart.animation, !0)
        };
        a.animObject = function(g) {
            return a.isObject(g) ? a.merge(g) : {
                duration: g ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat =
            function(g, e, q, t) {
                g = +g || 0;
                e = +e;
                var h = a.defaultOptions.lang,
                    u = (g.toString().split(".")[1] || "").length,
                    d, m, w = Math.abs(g); - 1 === e ? e = Math.min(u, 20) : a.isNumber(e) || (e = 2);
                d = String(a.pInt(w.toFixed(e)));
                m = 3 < d.length ? d.length % 3 : 0;
                q = a.pick(q, h.decimalPoint);
                t = a.pick(t, h.thousandsSep);
                g = (0 > g ? "-" : "") + (m ? d.substr(0, m) + t : "");
                g += d.substr(m).replace(/(\d{3})(?=\d)/g, "$1" + t);
                e && (t = Math.abs(w - d + Math.pow(10, -Math.max(e, u) - 1)), g += q + t.toFixed(e).slice(2));
                return g
            };
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI *
                a) - 1)
        };
        a.getStyle = function(g, e) {
            return "width" === e ? Math.min(g.offsetWidth, g.scrollWidth) - a.getStyle(g, "padding-left") - a.getStyle(g, "padding-right") : "height" === e ? Math.min(g.offsetHeight, g.scrollHeight) - a.getStyle(g, "padding-top") - a.getStyle(g, "padding-bottom") : (g = E.getComputedStyle(g, void 0)) && a.pInt(g.getPropertyValue(e))
        };
        a.inArray = function(a, e) {
            return e.indexOf ? e.indexOf(a) : [].indexOf.call(e, a)
        };
        a.grep = function(a, e) {
            return [].filter.call(a, e)
        };
        a.map = function(a, e) {
            for (var g = [], t = 0, h = a.length; t < h; t++) g[t] =
                e.call(a[t], a[t], t, a);
            return g
        };
        a.offset = function(a) {
            var e = D.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (E.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: a.left + (E.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }
        };
        a.stop = function(a, e) {
            for (var g = B.length; g--;) B[g].elem !== a || e && e !== B[g].prop || (B[g].stopped = !0)
        };
        a.each = function(a, e, q) {
            return Array.prototype.forEach.call(a, e, q)
        };
        a.addEvent = function(g, e, q) {
            function t(a) {
                a.target = a.srcElement || E;
                q.call(g, a)
            }
            var h = g.hcEvents = g.hcEvents || {};
            g.addEventListener ? g.addEventListener(e, q, !1) : g.attachEvent && (g.hcEventsIE || (g.hcEventsIE = {}), g.hcEventsIE[q.toString()] = t, g.attachEvent("on" + e, t));
            h[e] || (h[e] = []);
            h[e].push(q);
            return function() {
                a.removeEvent(g, e, q)
            }
        };
        a.removeEvent = function(g, e, q) {
            function t(a, d) {
                g.removeEventListener ? g.removeEventListener(a, d, !1) : g.attachEvent && (d = g.hcEventsIE[d.toString()], g.detachEvent("on" + a, d))
            }

            function h() {
                var a, m;
                if (g.nodeName)
                    for (m in e ? (a = {}, a[e] = !0) : a = d, a)
                        if (d[m])
                            for (a = d[m].length; a--;) t(m, d[m][a])
            }
            var u,
                d = g.hcEvents,
                m;
            d && (e ? (u = d[e] || [], q ? (m = a.inArray(q, u), -1 < m && (u.splice(m, 1), d[e] = u), t(e, q)) : (h(), d[e] = [])) : (h(), g.hcEvents = {}))
        };
        a.fireEvent = function(g, e, q, t) {
            var h;
            h = g.hcEvents;
            var u, d;
            q = q || {};
            if (D.createEvent && (g.dispatchEvent || g.fireEvent)) h = D.createEvent("Events"), h.initEvent(e, !0, !0), a.extend(h, q), g.dispatchEvent ? g.dispatchEvent(h) : g.fireEvent(e, h);
            else if (h)
                for (h = h[e] || [], u = h.length, q.target || a.extend(q, {
                        preventDefault: function() {
                            q.defaultPrevented = !0
                        },
                        target: g,
                        type: e
                    }), e = 0; e < u; e++)(d = h[e]) &&
                    !1 === d.call(g, q) && q.preventDefault();
            t && !q.defaultPrevented && t(q)
        };
        a.animate = function(g, e, q) {
            var t, h = "",
                u, d, m;
            a.isObject(q) || (t = arguments, q = {
                duration: t[2],
                easing: t[3],
                complete: t[4]
            });
            a.isNumber(q.duration) || (q.duration = 400);
            q.easing = "function" === typeof q.easing ? q.easing : Math[q.easing] || Math.easeInOutSine;
            q.curAnim = a.merge(e);
            for (m in e) a.stop(g, m), d = new a.Fx(g, q, m), u = null, "d" === m ? (d.paths = d.initPath(g, g.d, e.d), d.toD = e.d, t = 0, u = 1) : g.attr ? t = g.attr(m) : (t = parseFloat(a.getStyle(g, m)) || 0, "opacity" !== m &&
                (h = "px")), u || (u = e[m]), u.match && u.match("px") && (u = u.replace(/px/g, "")), d.run(t, u, h)
        };
        a.seriesType = function(g, e, q, t, h) {
            var u = a.getOptions(),
                d = a.seriesTypes;
            u.plotOptions[g] = a.merge(u.plotOptions[e], q);
            d[g] = a.extendClass(d[e] || function() {}, t);
            d[g].prototype.type = g;
            h && (d[g].prototype.pointClass = a.extendClass(a.Point, h));
            return d[g]
        };
        a.uniqueKey = function() {
            var a = Math.random().toString(36).substring(2, 9),
                e = 0;
            return function() {
                return "highcharts-" + a + "-" + e++
            }
        }();
        E.jQuery && (E.jQuery.fn.highcharts = function() {
            var g = [].slice.call(arguments);
            if (this[0]) return g[0] ? (new(a[a.isString(g[0]) ? g.shift() : "Chart"])(this[0], g[0], g[1]), this) : F[a.attr(this[0], "data-highcharts-chart")]
        });
        D && !D.defaultView && (a.getStyle = function(g, e) {
            var q = {
                width: "clientWidth",
                height: "clientHeight"
            }[e];
            if (g.style[e]) return a.pInt(g.style[e]);
            "opacity" === e && (e = "filter");
            if (q) return g.style.zoom = 1, Math.max(g[q] - 2 * a.getStyle(g, "padding"), 0);
            g = g.currentStyle[e.replace(/\-(\w)/g, function(a, h) {
                return h.toUpperCase()
            })];
            "filter" === e && (g = g.replace(/alpha\(opacity=([0-9]+)\)/,
                function(a, h) {
                    return h / 100
                }));
            return "" === g ? 1 : a.pInt(g)
        });
        Array.prototype.forEach || (a.each = function(a, e, q) {
            for (var g = 0, h = a.length; g < h; g++)
                if (!1 === e.call(q, a[g], g, a)) return g
        });
        Array.prototype.indexOf || (a.inArray = function(a, e) {
            var g, t = 0;
            if (e)
                for (g = e.length; t < g; t++)
                    if (e[t] === a) return t;
            return -1
        });
        Array.prototype.filter || (a.grep = function(a, e) {
            for (var g = [], t = 0, h = a.length; t < h; t++) e(a[t], t) && g.push(a[t]);
            return g
        })
    })(K);
    (function(a) {
        var B = a.each,
            F = a.isNumber,
            D = a.map,
            E = a.merge,
            g = a.pInt;
        a.Color = function(e) {
            if (!(this instanceof a.Color)) return new a.Color(e);
            this.init(e)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [g(a[1]), g(a[2]), g(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
                parse: function(a) {
                    return [g(a[1], 16), g(a[2], 16), g(a[3], 16), 1]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [g(a[1]), g(a[2]), g(a[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function(e) {
                var g, t, h, u;
                if ((this.input = e = this.names[e] || e) && e.stops) this.stops = D(e.stops, function(d) {
                    return new a.Color(d[1])
                });
                else
                    for (h = this.parsers.length; h-- && !t;) u = this.parsers[h], (g = u.regex.exec(e)) && (t = u.parse(g));
                this.rgba = t || []
            },
            get: function(a) {
                var g = this.input,
                    e = this.rgba,
                    h;
                this.stops ? (h = E(g), h.stops = [].concat(h.stops), B(this.stops, function(e, d) {
                        h.stops[d] = [h.stops[d][0], e.get(a)]
                    })) : h = e && F(e[0]) ? "rgb" === a || !a && 1 === e[3] ? "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")" : "a" === a ? e[3] :
                    "rgba(" + e.join(",") + ")" : g;
                return h
            },
            brighten: function(a) {
                var e, t = this.rgba;
                if (this.stops) B(this.stops, function(h) {
                    h.brighten(a)
                });
                else if (F(a) && 0 !== a)
                    for (e = 0; 3 > e; e++) t[e] += g(255 * a), 0 > t[e] && (t[e] = 0), 255 < t[e] && (t[e] = 255);
                return this
            },
            setOpacity: function(a) {
                this.rgba[3] = a;
                return this
            }
        };
        a.color = function(e) {
            return new a.Color(e)
        }
    })(K);
    (function(a) {
        function B() {
            var g = a.defaultOptions.global,
                h, u = g.useUTC,
                d = u ? "getUTC" : "get",
                m = u ? "setUTC" : "set";
            a.Date = h = g.Date || q.Date;
            h.hcTimezoneOffset = u && g.timezoneOffset;
            h.hcGetTimezoneOffset = u && g.getTimezoneOffset;
            h.hcMakeTime = function(a, d, k, f, c, b) {
                var m;
                u ? (m = h.UTC.apply(0, arguments), m += E(m)) : m = (new h(a, d, e(k, 1), e(f, 0), e(c, 0), e(b, 0))).getTime();
                return m
            };
            D("Minutes Hours Day Date Month FullYear".split(" "), function(a) {
                h["hcGet" + a] = d + a
            });
            D("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function(a) {
                h["hcSet" + a] = m + a
            })
        }
        var F = a.color,
            D = a.each,
            E = a.getTZOffset,
            g = a.merge,
            e = a.pick,
            q = a.win;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {
                useUTC: !0,
                VMLRadialGradientURL: "http://code.highcharts.com/5.0.5/gfx/vml-radial-gradient.png"
            },
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: F("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function(e) {
            a.defaultOptions = g(!0, a.defaultOptions, e);
            B();
            return a.defaultOptions
        };
        a.getOptions = function() {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        B()
    })(K);
    (function(a) {
        var B, F, D = a.addEvent,
            E = a.animate,
            g = a.attr,
            e = a.charts,
            q = a.color,
            t = a.css,
            h = a.createElement,
            u = a.defined,
            d = a.deg2rad,
            m = a.destroyObjectProperties,
            w = a.doc,
            p = a.each,
            k = a.extend,
            f = a.erase,
            c = a.grep,
            b = a.hasTouch,
            C = a.isArray,
            r = a.isFirefox,
            n = a.isMS,
            v = a.isObject,
            I = a.isString,
            J = a.isWebKit,
            H = a.merge,
            L = a.noop,
            G = a.pick,
            A = a.pInt,
            N = a.removeEvent,
            M = a.stop,
            l = a.svg,
            x = a.SVG_NS,
            P = a.symbolSizes,
            O = a.win;
        B = a.SVGElement = function() {
            return this
        };
        B.prototype = {
            opacity: 1,
            SVG_NS: x,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textOutline".split(" "),
            init: function(a, z) {
                this.element = "span" === z ? h(z) : w.createElementNS(this.SVG_NS, z);
                this.renderer = a
            },
            animate: function(a, z, l) {
                (z = G(z, this.renderer.globalAnimation, !0)) ? (l && (z.complete = l), E(this, a, z)) : this.attr(a, null, l);
                return this
            },
            colorGradient: function(y, z, l) {
                var n = this.renderer,
                    c, b, x, f, v, d, k, m, S, r, I, A = [],
                    h;
                y.linearGradient ? b = "linearGradient" : y.radialGradient && (b = "radialGradient");
                if (b) {
                    x = y[b];
                    v = n.gradients;
                    k = y.stops;
                    r = l.radialReference;
                    C(x) && (y[b] = x = {
                        x1: x[0],
                        y1: x[1],
                        x2: x[2],
                        y2: x[3],
                        gradientUnits: "userSpaceOnUse"
                    });
                    "radialGradient" === b && r && !u(x.gradientUnits) && (f = x, x = H(x, n.getRadialAttr(r, f), {
                        gradientUnits: "userSpaceOnUse"
                    }));
                    for (I in x) "id" !== I && A.push(I, x[I]);
                    for (I in k) A.push(k[I]);
                    A = A.join(",");
                    v[A] ? r = v[A].attr("id") : (x.id = r = a.uniqueKey(), v[A] = d = n.createElement(b).attr(x).add(n.defs),
                        d.radAttr = f, d.stops = [], p(k, function(y) {
                            0 === y[1].indexOf("rgba") ? (c = a.color(y[1]), m = c.get("rgb"), S = c.get("a")) : (m = y[1], S = 1);
                            y = n.createElement("stop").attr({
                                offset: y[0],
                                "stop-color": m,
                                "stop-opacity": S
                            }).add(d);
                            d.stops.push(y)
                        }));
                    h = "url(" + n.url + "#" + r + ")";
                    l.setAttribute(z, h);
                    l.gradient = A;
                    y.toString = function() {
                        return h
                    }
                }
            },
            applyTextOutline: function(a) {
                var y = this.element,
                    l, n, b; - 1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(y.style.fill)));
                this.fakeTS = !0;
                this.ySetter = this.xSetter;
                l = [].slice.call(y.getElementsByTagName("tspan"));
                a = a.split(" ");
                n = a[a.length - 1];
                (b = a[0]) && "none" !== b && (b = b.replace(/(^[\d\.]+)(.*?)$/g, function(a, y, z) {
                    return 2 * y + z
                }), p(l, function(a) {
                    "highcharts-text-outline" === a.getAttribute("class") && f(l, y.removeChild(a))
                }), p(l, function(a, z) {
                    0 === z && (a.setAttribute("x", y.getAttribute("x")), z = y.getAttribute("y"), a.setAttribute("y", z || 0), null === z && y.setAttribute("y", 0));
                    a = a.cloneNode(1);
                    g(a, {
                        "class": "highcharts-text-outline",
                        fill: n,
                        stroke: n,
                        "stroke-width": b,
                        "stroke-linejoin": "round"
                    });
                    y.insertBefore(a, y.firstChild)
                }))
            },
            attr: function(a, z, l, b) {
                var y, n = this.element,
                    c, x = this,
                    f;
                "string" === typeof a && void 0 !== z && (y = a, a = {}, a[y] = z);
                if ("string" === typeof a) x = (this[a + "Getter"] || this._defaultGetter).call(this, a, n);
                else {
                    for (y in a) z = a[y], f = !1, b || M(this, y), this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(y) && (c || (this.symbolAttr(a), c = !0), f = !0), !this.rotation || "x" !== y && "y" !== y || (this.doTransform = !0), f || (f = this[y + "Setter"] || this._defaultSetter, f.call(this, z, y, n), this.shadows &&
                        /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(y) && this.updateShadows(y, z, f));
                    this.doTransform && (this.updateTransform(), this.doTransform = !1)
                }
                l && l();
                return x
            },
            updateShadows: function(a, z, l) {
                for (var y = this.shadows, b = y.length; b--;) l.call(y[b], "height" === a ? Math.max(z - (y[b].cutHeight || 0), 0) : "d" === a ? this.d : z, a, y[b])
            },
            addClass: function(a, z) {
                var y = this.attr("class") || ""; - 1 === y.indexOf(a) && (z || (a = (y + (y ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function(a) {
                return -1 !==
                    g(this.element, "class").indexOf(a)
            },
            removeClass: function(a) {
                g(this.element, "class", (g(this.element, "class") || "").replace(a, ""));
                return this
            },
            symbolAttr: function(a) {
                var y = this;
                p("x y r start end width height innerR anchorX anchorY".split(" "), function(z) {
                    y[z] = G(a[z], y[z])
                });
                y.attr({
                    d: y.renderer.symbols[y.symbolName](y.x, y.y, y.width, y.height, y)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a, z) {
                var y, b = {},
                    l;
                z = z || a.strokeWidth || 0;
                l = Math.round(z) %
                    2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + l;
                a.y = Math.floor(a.y || this.y || 0) + l;
                a.width = Math.floor((a.width || this.width || 0) - 2 * l);
                a.height = Math.floor((a.height || this.height || 0) - 2 * l);
                u(a.strokeWidth) && (a.strokeWidth = z);
                for (y in a) this[y] !== a[y] && (this[y] = b[y] = a[y]);
                return b
            },
            css: function(a) {
                var y = this.styles,
                    b = {},
                    c = this.element,
                    x, f, v = "";
                x = !y;
                a && a.color && (a.fill = a.color);
                if (y)
                    for (f in a) a[f] !== y[f] && (b[f] = a[f], x = !0);
                if (x) {
                    x = this.textWidth = a && a.width && "text" === c.nodeName.toLowerCase() && A(a.width) || this.textWidth;
                    y && (a = k(y, b));
                    this.styles = a;
                    x && !l && this.renderer.forExport && delete a.width;
                    if (n && !l) t(this.element, a);
                    else {
                        y = function(a, y) {
                            return "-" + y.toLowerCase()
                        };
                        for (f in a) v += f.replace(/([A-Z])/g, y) + ":" + a[f] + ";";
                        g(c, "style", v)
                    }
                    this.added && (x && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline))
                }
                return this
            },
            strokeWidth: function() {
                return this["stroke-width"] || 0
            },
            on: function(a, z) {
                var y = this,
                    l = y.element;
                b && "click" === a ? (l.ontouchstart = function(a) {
                    y.touchEventFired = Date.now();
                    a.preventDefault();
                    z.call(l, a)
                }, l.onclick = function(a) {
                    (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (y.touchEventFired || 0)) && z.call(l, a)
                }) : l["on" + a] = z;
                return this
            },
            setRadialReference: function(a) {
                var y = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                y && y.radAttr && y.animate(this.renderer.getRadialAttr(a, y.radAttr));
                return this
            },
            translate: function(a, z) {
                return this.attr({
                    translateX: a,
                    translateY: z
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a =
                    this.translateX || 0,
                    z = this.translateY || 0,
                    l = this.scaleX,
                    b = this.scaleY,
                    n = this.inverted,
                    c = this.rotation,
                    x = this.element;
                n && (a += this.attr("width"), z += this.attr("height"));
                a = ["translate(" + a + "," + z + ")"];
                n ? a.push("rotate(90) scale(-1,1)") : c && a.push("rotate(" + c + " " + (x.getAttribute("x") || 0) + " " + (x.getAttribute("y") || 0) + ")");
                (u(l) || u(b)) && a.push("scale(" + G(l, 1) + " " + G(b, 1) + ")");
                a.length && x.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a,
                z, l) {
                var y, b, n, c, x = {};
                b = this.renderer;
                n = b.alignedObjects;
                var v, d;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = z, !l || I(l)) this.alignTo = y = l || "renderer", f(n, this), n.push(this), l = null
                } else a = this.alignOptions, z = this.alignByTranslate, y = this.alignTo;
                l = G(l, b[y], b);
                y = a.align;
                b = a.verticalAlign;
                n = (l.x || 0) + (a.x || 0);
                c = (l.y || 0) + (a.y || 0);
                "right" === y ? v = 1 : "center" === y && (v = 2);
                v && (n += (l.width - (a.width || 0)) / v);
                x[z ? "translateX" : "x"] = Math.round(n);
                "bottom" === b ? d = 1 : "middle" === b && (d = 2);
                d && (c += (l.height - (a.height ||
                    0)) / d);
                x[z ? "translateY" : "y"] = Math.round(c);
                this[this.placed ? "animate" : "attr"](x);
                this.placed = !0;
                this.alignAttr = x;
                return this
            },
            getBBox: function(a, l) {
                var y, z = this.renderer,
                    b, c = this.element,
                    x = this.styles,
                    f, v = this.textStr,
                    m, r = z.cache,
                    I = z.cacheKeys,
                    A;
                l = G(l, this.rotation);
                b = l * d;
                f = x && x.fontSize;
                void 0 !== v && (A = v.toString(), -1 === A.indexOf("\x3c") && (A = A.replace(/[0-9]/g, "0")), A += ["", l || 0, f, c.style.width, c.style["text-overflow"]].join());
                A && !a && (y = r[A]);
                if (!y) {
                    if (c.namespaceURI === this.SVG_NS || z.forExport) {
                        try {
                            (m =
                                this.fakeTS && function(a) {
                                    p(c.querySelectorAll(".highcharts-text-outline"), function(y) {
                                        y.style.display = a
                                    })
                                }) && m("none"), y = c.getBBox ? k({}, c.getBBox()) : {
                                width: c.offsetWidth,
                                height: c.offsetHeight
                            }, m && m("")
                        } catch (T) {}
                        if (!y || 0 > y.width) y = {
                            width: 0,
                            height: 0
                        }
                    } else y = this.htmlGetBBox();
                    z.isSVG && (a = y.width, z = y.height, n && x && "11px" === x.fontSize && "16.9" === z.toPrecision(3) && (y.height = z = 14), l && (y.width = Math.abs(z * Math.sin(b)) + Math.abs(a * Math.cos(b)), y.height = Math.abs(z * Math.cos(b)) + Math.abs(a * Math.sin(b))));
                    if (A &&
                        0 < y.height) {
                        for (; 250 < I.length;) delete r[I.shift()];
                        r[A] || I.push(A);
                        r[A] = y
                    }
                }
                return y
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(a) {
                var y = this;
                y.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        y.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var y = this.renderer,
                    l = this.element,
                    b;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && y.buildText(this);
                this.added = !0;
                if (!a || a.handleZ ||
                    this.zIndex) b = this.zIndexSetter();
                b || (a ? a.element : y.box).appendChild(l);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var y = a.parentNode;
                y && y.removeChild(a)
            },
            destroy: function() {
                var a = this.element || {},
                    l = this.renderer.isSVG && "SPAN" === a.nodeName && this.parentGroup,
                    b, c;
                a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;
                M(this);
                this.clipPath && (this.clipPath = this.clipPath.destroy());
                if (this.stops) {
                    for (c = 0; c < this.stops.length; c++) this.stops[c] = this.stops[c].destroy();
                    this.stops =
                        null
                }
                this.safeRemoveChild(a);
                for (this.destroyShadows(); l && l.div && 0 === l.div.childNodes.length;) a = l.parentGroup, this.safeRemoveChild(l.div), delete l.div, l = a;
                this.alignTo && f(this.renderer.alignedObjects, this);
                for (b in this) delete this[b];
                return null
            },
            shadow: function(a, l, b) {
                var y = [],
                    c, z, n = this.element,
                    x, f, v, d;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    f = G(a.width, 3);
                    v = (a.opacity || .15) / f;
                    d = this.parentInverted ? "(-1,-1)" : "(" + G(a.offsetX, 1) + ", " + G(a.offsetY, 1) + ")";
                    for (c = 1; c <= f; c++) z = n.cloneNode(0),
                        x = 2 * f + 1 - 2 * c, g(z, {
                            isShadow: "true",
                            stroke: a.color || "#000000",
                            "stroke-opacity": v * c,
                            "stroke-width": x,
                            transform: "translate" + d,
                            fill: "none"
                        }), b && (g(z, "height", Math.max(g(z, "height") - x, 0)), z.cutHeight = x), l ? l.element.appendChild(z) : n.parentNode.insertBefore(z, n), y.push(z);
                    this.shadows = y
                }
                return this
            },
            destroyShadows: function() {
                p(this.shadows || [], function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a = G(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, l, b) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                b.setAttribute(l, a);
                this[l] = a
            },
            dashstyleSetter: function(a) {
                var l, b = this["stroke-width"];
                "inherit" === b && (b = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash",
                        "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (l = a.length; l--;) a[l] = A(a[l]) * b;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function(a, l, b) {
                this[l] = a;
                b.setAttribute(l, a)
            },
            titleSetter: function(a) {
                var l = this.element.getElementsByTagName("title")[0];
                l || (l = w.createElementNS(this.SVG_NS, "title"), this.element.appendChild(l));
                l.firstChild && l.removeChild(l.firstChild);
                l.appendChild(w.createTextNode(String(G(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(a, l, b) {
                "string" === typeof a ? b.setAttribute(l, a) : a && this.colorGradient(a, l, b)
            },
            visibilitySetter: function(a, l, b) {
                "inherit" === a ? b.removeAttribute(l) : b.setAttribute(l, a)
            },
            zIndexSetter: function(a, l) {
                var b = this.renderer,
                    c = this.parentGroup,
                    n = (c || b).element ||
                    b.box,
                    y, z = this.element,
                    x;
                y = this.added;
                var f;
                u(a) && (z.zIndex = a, a = +a, this[l] === a && (y = !1), this[l] = a);
                if (y) {
                    (a = this.zIndex) && c && (c.handleZ = !0);
                    l = n.childNodes;
                    for (f = 0; f < l.length && !x; f++) c = l[f], y = c.zIndex, c !== z && (A(y) > a || !u(a) && u(y) || 0 > a && !u(y) && n !== b.box) && (n.insertBefore(z, c), x = !0);
                    x || n.appendChild(z)
                }
                return x
            },
            _defaultSetter: function(a, l, b) {
                b.setAttribute(l, a)
            }
        };
        B.prototype.yGetter = B.prototype.xGetter;
        B.prototype.translateXSetter = B.prototype.translateYSetter = B.prototype.rotationSetter = B.prototype.verticalAlignSetter =
            B.prototype.scaleXSetter = B.prototype.scaleYSetter = function(a, l) {
                this[l] = a;
                this.doTransform = !0
            };
        B.prototype["stroke-widthSetter"] = B.prototype.strokeSetter = function(a, l, b) {
            this[l] = a;
            this.stroke && this["stroke-width"] ? (B.prototype.fillSetter.call(this, this.stroke, "stroke", b), b.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === l && 0 === a && this.hasStroke && (b.removeAttribute("stroke"), this.hasStroke = !1)
        };
        F = a.SVGRenderer = function() {
            this.init.apply(this, arguments)
        };
        F.prototype = {
            Element: B,
            SVG_NS: x,
            init: function(a, l, b, c, n, x) {
                var y;
                c = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(c));
                y = c.element;
                a.appendChild(y); - 1 === a.innerHTML.indexOf("xmlns") && g(y, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = y;
                this.boxWrapper = c;
                this.alignedObjects = [];
                this.url = (r || J) && w.getElementsByTagName("base").length ? O.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(w.createTextNode("Created with Highmaps 5.0.5"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = x;
                this.forExport = n;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(l, b, !1);
                var z;
                r && a.getBoundingClientRect && (l = function() {
                    t(a, {
                        left: 0,
                        top: 0
                    });
                    z = a.getBoundingClientRect();
                    t(a, {
                        left: Math.ceil(z.left) - z.left + "px",
                        top: Math.ceil(z.top) - z.top + "px"
                    })
                }, l(), this.unSubPixelFix = D(O, "resize", l))
            },
            getStyle: function(a) {
                return this.style = k({
                        fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                        fontSize: "12px"
                    },
                    a)
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                m(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var l = new this.Element;
                l.init(this, a);
                return l
            },
            draw: L,
            getRadialAttr: function(a, l) {
                return {
                    cx: a[0] - a[2] / 2 + l.cx * a[2],
                    cy: a[1] -
                        a[2] / 2 + l.cy * a[2],
                    r: l.r * a[2]
                }
            },
            buildText: function(a) {
                for (var b = a.element, n = this, y = n.forExport, f = G(a.textStr, "").toString(), v = -1 !== f.indexOf("\x3c"), d = b.childNodes, k, m, r, I, h = g(b, "x"), e = a.styles, C = a.textWidth, u = e && e.lineHeight, H = e && e.textOutline, N = e && "ellipsis" === e.textOverflow, O = d.length, J = C && !a.added && this.box, P = function(a) {
                        var l;
                        l = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : e && e.fontSize || n.style.fontSize || 12;
                        return u ? A(u) : n.fontMetrics(l, a.getAttribute("style") ? a : b).h
                    }; O--;) b.removeChild(d[O]);
                v || H || N || C || -1 !== f.indexOf(" ") ? (k = /<.*class="([^"]+)".*>/, m = /<.*style="([^"]+)".*>/, r = /<.*href="(http[^"]+)".*>/, J && J.appendChild(b), f = v ? f.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [f], f = c(f, function(a) {
                    return "" !== a
                }), p(f, function(c, f) {
                    var z, v = 0;
                    c = c.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g,
                        "\x3c/span\x3e|||");
                    z = c.split("|||");
                    p(z, function(c) {
                        if ("" !== c || 1 === z.length) {
                            var d = {},
                                A = w.createElementNS(n.SVG_NS, "tspan"),
                                p, G;
                            k.test(c) && (p = c.match(k)[1], g(A, "class", p));
                            m.test(c) && (G = c.match(m)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), g(A, "style", G));
                            r.test(c) && !y && (g(A, "onclick", 'location.href\x3d"' + c.match(r)[1] + '"'), t(A, {
                                cursor: "pointer"
                            }));
                            c = (c.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");
                            if (" " !== c) {
                                A.appendChild(w.createTextNode(c));
                                v ? d.dx = 0 : f && null !==
                                    h && (d.x = h);
                                g(A, d);
                                b.appendChild(A);
                                !v && f && (!l && y && t(A, {
                                    display: "block"
                                }), g(A, "dy", P(A)));
                                if (C) {
                                    d = c.replace(/([^\^])-/g, "$1- ").split(" ");
                                    p = "nowrap" === e.whiteSpace;
                                    for (var u = 1 < z.length || f || 1 < d.length && !p, H, O, J = [], S = P(A), R = a.rotation, M = c, Q = M.length;
                                        (u || N) && (d.length || J.length);) a.rotation = 0, H = a.getBBox(!0), O = H.width, !l && n.forExport && (O = n.measureSpanWidth(A.firstChild.data, a.styles)), H = O > C, void 0 === I && (I = H), N && I ? (Q /= 2, "" === M || !H && .5 > Q ? d = [] : (M = c.substring(0, M.length + (H ? -1 : 1) * Math.ceil(Q)), d = [M + (3 < C ?
                                        "\u2026" : "")], A.removeChild(A.firstChild))) : H && 1 !== d.length ? (A.removeChild(A.firstChild), J.unshift(d.pop())) : (d = J, J = [], d.length && !p && (A = w.createElementNS(x, "tspan"), g(A, {
                                        dy: S,
                                        x: h
                                    }), G && g(A, "style", G), b.appendChild(A)), O > C && (C = O)), d.length && A.appendChild(w.createTextNode(d.join(" ").replace(/- /g, "-")));
                                    a.rotation = R
                                }
                                v++
                            }
                        }
                    })
                }), I && a.attr("title", a.textStr), J && J.removeChild(b), H && a.applyTextOutline && a.applyTextOutline(H)) : b.appendChild(w.createTextNode(f.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            getContrast: function(a) {
                a = q(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, l, b, c, x, f, v, d, m) {
                var z = this.label(a, l, b, m, null, null, null, null, "button"),
                    y = 0;
                z.attr(H({
                    padding: 8,
                    r: 2
                }, x));
                var r, A, I, p;
                x = H({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, x);
                r = x.style;
                delete x.style;
                f = H(x, {
                    fill: "#e6e6e6"
                }, f);
                A = f.style;
                delete f.style;
                v = H(x, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, v);
                I = v.style;
                delete v.style;
                d = H(x, {
                    style: {
                        color: "#cccccc"
                    }
                }, d);
                p = d.style;
                delete d.style;
                D(z.element, n ? "mouseover" : "mouseenter", function() {
                    3 !== y && z.setState(1)
                });
                D(z.element, n ? "mouseout" : "mouseleave", function() {
                    3 !== y && z.setState(y)
                });
                z.setState = function(a) {
                    1 !== a && (z.state = y = a);
                    z.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    z.attr([x, f, v, d][a || 0]).css([r, A, I, p][a || 0])
                };
                z.attr(x).css(k({
                    cursor: "default"
                }, r));
                return z.on("click", function(a) {
                    3 !==
                        y && c.call(z, a)
                })
            },
            crispLine: function(a, l) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - l % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + l % 2 / 2);
                return a
            },
            path: function(a) {
                var l = {
                    fill: "none"
                };
                C(a) ? l.d = a : v(a) && k(l, a);
                return this.createElement("path").attr(l)
            },
            circle: function(a, l, b) {
                a = v(a) ? a : {
                    x: a,
                    y: l,
                    r: b
                };
                l = this.createElement("circle");
                l.xSetter = l.ySetter = function(a, l, b) {
                    b.setAttribute("c" + l, a)
                };
                return l.attr(a)
            },
            arc: function(a, l, b, c, n, x) {
                v(a) && (l = a.y, b = a.r, c = a.innerR, n = a.start, x = a.end, a = a.x);
                a = this.symbol("arc",
                    a || 0, l || 0, b || 0, b || 0, {
                        innerR: c || 0,
                        start: n || 0,
                        end: x || 0
                    });
                a.r = b;
                return a
            },
            rect: function(a, l, b, c, n, x) {
                n = v(a) ? a.r : n;
                var f = this.createElement("rect");
                a = v(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: l,
                    width: Math.max(b, 0),
                    height: Math.max(c, 0)
                };
                void 0 !== x && (a.strokeWidth = x, a = f.crisp(a));
                a.fill = "none";
                n && (a.r = n);
                f.rSetter = function(a, l, b) {
                    g(b, {
                        rx: a,
                        ry: a
                    })
                };
                return f.attr(a)
            },
            setSize: function(a, l, b) {
                var c = this.alignedObjects,
                    n = c.length;
                this.width = a;
                this.height = l;
                for (this.boxWrapper.animate({
                        width: a,
                        height: l
                    }, {
                        step: function() {
                            this.attr({
                                viewBox: "0 0 " +
                                    this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: G(b, !0) ? void 0 : 0
                    }); n--;) c[n].align()
            },
            g: function(a) {
                var l = this.createElement("g");
                return a ? l.attr({
                    "class": "highcharts-" + a
                }) : l
            },
            image: function(a, l, b, c, n) {
                var x = {
                    preserveAspectRatio: "none"
                };
                1 < arguments.length && k(x, {
                    x: l,
                    y: b,
                    width: c,
                    height: n
                });
                x = this.createElement("image").attr(x);
                x.element.setAttributeNS ? x.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : x.element.setAttribute("hc-svg-href", a);
                return x
            },
            symbol: function(a, l, b, c, n,
                x) {
                var f = this,
                    v, z = this.symbols[a],
                    d = u(l) && z && z(Math.round(l), Math.round(b), c, n, x),
                    y = /^url\((.*?)\)$/,
                    m, r;
                z ? (v = this.path(d), v.attr("fill", "none"), k(v, {
                    symbolName: a,
                    x: l,
                    y: b,
                    width: c,
                    height: n
                }), x && k(v, x)) : y.test(a) && (m = a.match(y)[1], v = this.image(m), v.imgwidth = G(P[m] && P[m].width, x && x.width), v.imgheight = G(P[m] && P[m].height, x && x.height), r = function() {
                    v.attr({
                        width: v.width,
                        height: v.height
                    })
                }, p(["width", "height"], function(a) {
                    v[a + "Setter"] = function(a, l) {
                        var b = {},
                            c = this["img" + l],
                            n = "width" === l ? "translateX" : "translateY";
                        this[l] = a;
                        u(c) && (this.element && this.element.setAttribute(l, c), this.alignByTranslate || (b[n] = ((this[l] || 0) - c) / 2, this.attr(b)))
                    }
                }), u(l) && v.attr({
                    x: l,
                    y: b
                }), v.isImg = !0, u(v.imgwidth) && u(v.imgheight) ? r() : (v.attr({
                    width: 0,
                    height: 0
                }), h("img", {
                    onload: function() {
                        var a = e[f.chartIndex];
                        0 === this.width && (t(this, {
                            position: "absolute",
                            top: "-999em"
                        }), w.body.appendChild(this));
                        P[m] = {
                            width: this.width,
                            height: this.height
                        };
                        v.imgwidth = this.width;
                        v.imgheight = this.height;
                        v.element && r();
                        this.parentNode && this.parentNode.removeChild(this);
                        f.imgCount--;
                        if (!f.imgCount && a && a.onload) a.onload()
                    },
                    src: m
                }), this.imgCount++));
                return v
            },
            symbols: {
                circle: function(a, l, b, c) {
                    var n = .166 * b;
                    return ["M", a + b / 2, l, "C", a + b + n, l, a + b + n, l + c, a + b / 2, l + c, "C", a - n, l + c, a - n, l, a + b / 2, l, "Z"]
                },
                square: function(a, l, b, c) {
                    return ["M", a, l, "L", a + b, l, a + b, l + c, a, l + c, "Z"]
                },
                triangle: function(a, l, b, c) {
                    return ["M", a + b / 2, l, "L", a + b, l + c, a, l + c, "Z"]
                },
                "triangle-down": function(a, l, b, c) {
                    return ["M", a, l, "L", a + b, l, a + b / 2, l + c, "Z"]
                },
                diamond: function(a, l, b, c) {
                    return ["M", a + b / 2, l, "L", a + b, l + c / 2, a + b / 2, l +
                        c, a, l + c / 2, "Z"
                    ]
                },
                arc: function(a, l, b, c, n) {
                    var x = n.start;
                    b = n.r || b || c;
                    var f = n.end - .001;
                    c = n.innerR;
                    var v = n.open,
                        d = Math.cos(x),
                        z = Math.sin(x),
                        k = Math.cos(f),
                        f = Math.sin(f);
                    n = n.end - x < Math.PI ? 0 : 1;
                    return ["M", a + b * d, l + b * z, "A", b, b, 0, n, 1, a + b * k, l + b * f, v ? "M" : "L", a + c * k, l + c * f, "A", c, c, 0, n, 0, a + c * d, l + c * z, v ? "" : "Z"]
                },
                callout: function(a, l, b, c, n) {
                    var x = Math.min(n && n.r || 0, b, c),
                        f = x + 6,
                        v = n && n.anchorX;
                    n = n && n.anchorY;
                    var d;
                    d = ["M", a + x, l, "L", a + b - x, l, "C", a + b, l, a + b, l, a + b, l + x, "L", a + b, l + c - x, "C", a + b, l + c, a + b, l + c, a + b - x, l + c, "L", a + x, l + c, "C",
                        a, l + c, a, l + c, a, l + c - x, "L", a, l + x, "C", a, l, a, l, a + x, l
                    ];
                    v && v > b ? n > l + f && n < l + c - f ? d.splice(13, 3, "L", a + b, n - 6, a + b + 6, n, a + b, n + 6, a + b, l + c - x) : d.splice(13, 3, "L", a + b, c / 2, v, n, a + b, c / 2, a + b, l + c - x) : v && 0 > v ? n > l + f && n < l + c - f ? d.splice(33, 3, "L", a, n + 6, a - 6, n, a, n - 6, a, l + x) : d.splice(33, 3, "L", a, c / 2, v, n, a, c / 2, a, l + x) : n && n > c && v > a + f && v < a + b - f ? d.splice(23, 3, "L", v + 6, l + c, v, l + c + 6, v - 6, l + c, a + x, l + c) : n && 0 > n && v > a + f && v < a + b - f && d.splice(3, 3, "L", v - 6, l, v, l - 6, v + 6, l, b - x, l);
                    return d
                }
            },
            clipRect: function(l, b, c, n) {
                var x = a.uniqueKey(),
                    f = this.createElement("clipPath").attr({
                        id: x
                    }).add(this.defs);
                l = this.rect(l, b, c, n, 0).add(f);
                l.id = x;
                l.clipPath = f;
                l.count = 0;
                return l
            },
            text: function(a, b, c, n) {
                var x = !l && this.forExport,
                    f = {};
                if (n && (this.allowHTML || !this.forExport)) return this.html(a, b, c);
                f.x = Math.round(b || 0);
                c && (f.y = Math.round(c));
                if (a || 0 === a) f.text = a;
                a = this.createElement("text").attr(f);
                x && a.css({
                    position: "absolute"
                });
                n || (a.xSetter = function(a, l, b) {
                    var c = b.getElementsByTagName("tspan"),
                        n, x = b.getAttribute(l),
                        f;
                    for (f = 0; f < c.length; f++) n = c[f], n.getAttribute(l) === x && n.setAttribute(l, a);
                    b.setAttribute(l,
                        a)
                });
                return a
            },
            fontMetrics: function(a, l) {
                a = a || l && l.style && l.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? A(a) : /em/.test(a) ? parseFloat(a) * (l ? this.fontMetrics(null, l.parentNode).f : 16) : 12;
                l = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: l,
                    b: Math.round(.8 * l),
                    f: a
                }
            },
            rotCorr: function(a, l, b) {
                var c = a;
                l && b && (c = Math.max(c * Math.cos(l * d), 4));
                return {
                    x: -a / 3 * Math.sin(l * d),
                    y: c
                }
            },
            label: function(a, l, b, c, n, x, f, v, d) {
                var m = this,
                    z = m.g("button" !== d && "label"),
                    r = z.text = m.text("", 0, 0, f).attr({
                        zIndex: 1
                    }),
                    A, I, h = 0,
                    y = 3,
                    e = 0,
                    G, C, g, w, O, J = {},
                    P, M, t = /^url\((.*?)\)$/.test(c),
                    q = t,
                    S, L, R, Q;
                d && z.addClass("highcharts-" + d);
                q = t;
                S = function() {
                    return (P || 0) % 2 / 2
                };
                L = function() {
                    var a = r.element.style,
                        l = {};
                    I = (void 0 === G || void 0 === C || O) && u(r.textStr) && r.getBBox();
                    z.width = (G || I.width || 0) + 2 * y + e;
                    z.height = (C || I.height || 0) + 2 * y;
                    M = y + m.fontMetrics(a && a.fontSize, r).b;
                    q && (A || (z.box = A = m.symbols[c] || t ? m.symbol(c) : m.rect(), A.addClass(("button" === d ? "" : "highcharts-label-box") + (d ? " highcharts-" + d + "-box" : "")), A.add(z), a = S(), l.x = a, l.y = (v ? -M : 0) + a), l.width =
                        Math.round(z.width), l.height = Math.round(z.height), A.attr(k(l, J)), J = {})
                };
                R = function() {
                    var a = e + y,
                        l;
                    l = v ? 0 : M;
                    u(G) && I && ("center" === O || "right" === O) && (a += {
                        center: .5,
                        right: 1
                    }[O] * (G - I.width));
                    if (a !== r.x || l !== r.y) r.attr("x", a), void 0 !== l && r.attr("y", l);
                    r.x = a;
                    r.y = l
                };
                Q = function(a, l) {
                    A ? A.attr(a, l) : J[a] = l
                };
                z.onAdd = function() {
                    r.add(z);
                    z.attr({
                        text: a || 0 === a ? a : "",
                        x: l,
                        y: b
                    });
                    A && u(n) && z.attr({
                        anchorX: n,
                        anchorY: x
                    })
                };
                z.widthSetter = function(a) {
                    G = a
                };
                z.heightSetter = function(a) {
                    C = a
                };
                z["text-alignSetter"] = function(a) {
                    O = a
                };
                z.paddingSetter = function(a) {
                    u(a) && a !== y && (y = z.padding = a, R())
                };
                z.paddingLeftSetter = function(a) {
                    u(a) && a !== e && (e = a, R())
                };
                z.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== h && (h = a, I && z.attr({
                        x: g
                    }))
                };
                z.textSetter = function(a) {
                    void 0 !== a && r.textSetter(a);
                    L();
                    R()
                };
                z["stroke-widthSetter"] = function(a, l) {
                    a && (q = !0);
                    P = this["stroke-width"] = a;
                    Q(l, a)
                };
                z.strokeSetter = z.fillSetter = z.rSetter = function(a, l) {
                    "fill" === l && a && (q = !0);
                    Q(l, a)
                };
                z.anchorXSetter = function(a, l) {
                    n = a;
                    Q(l, Math.round(a) - S() - g)
                };
                z.anchorYSetter =
                    function(a, l) {
                        x = a;
                        Q(l, a - w)
                    };
                z.xSetter = function(a) {
                    z.x = a;
                    h && (a -= h * ((G || I.width) + 2 * y));
                    g = Math.round(a);
                    z.attr("translateX", g)
                };
                z.ySetter = function(a) {
                    w = z.y = Math.round(a);
                    z.attr("translateY", w)
                };
                var V = z.css;
                return k(z, {
                    css: function(a) {
                        if (a) {
                            var l = {};
                            a = H(a);
                            p(z.textProps, function(b) {
                                void 0 !== a[b] && (l[b] = a[b], delete a[b])
                            });
                            r.css(l)
                        }
                        return V.call(z, a)
                    },
                    getBBox: function() {
                        return {
                            width: I.width + 2 * y,
                            height: I.height + 2 * y,
                            x: I.x - y,
                            y: I.y - y
                        }
                    },
                    shadow: function(a) {
                        a && (L(), A && A.shadow(a));
                        return z
                    },
                    destroy: function() {
                        N(z.element,
                            "mouseenter");
                        N(z.element, "mouseleave");
                        r && (r = r.destroy());
                        A && (A = A.destroy());
                        B.prototype.destroy.call(z);
                        z = m = L = R = Q = null
                    }
                })
            }
        };
        a.Renderer = F
    })(K);
    (function(a) {
        var B = a.attr,
            F = a.createElement,
            D = a.css,
            E = a.defined,
            g = a.each,
            e = a.extend,
            q = a.isFirefox,
            t = a.isMS,
            h = a.isWebKit,
            u = a.pInt,
            d = a.SVGRenderer,
            m = a.win,
            w = a.wrap;
        e(a.SVGElement.prototype, {
            htmlCss: function(a) {
                var d = this.element;
                if (d = a && "SPAN" === d.tagName && a.width) delete a.width, this.textWidth = d, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace =
                    "nowrap", a.overflow = "hidden");
                this.styles = e(this.styles, a);
                D(this.element, a);
                return this
            },
            htmlGetBBox: function() {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        d = this.element,
                        f = this.translateX || 0,
                        c = this.translateY || 0,
                        b = this.x || 0,
                        m = this.y || 0,
                        r = this.textAlign || "left",
                        n = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[r],
                        v = this.styles;
                    D(d, {
                        marginLeft: f,
                        marginTop: c
                    });
                    this.shadows && g(this.shadows, function(a) {
                        D(a, {
                            marginLeft: f + 1,
                            marginTop: c + 1
                        })
                    });
                    this.inverted && g(d.childNodes, function(b) {
                        a.invertChild(b, d)
                    });
                    if ("SPAN" === d.tagName) {
                        var I = this.rotation,
                            e = u(this.textWidth),
                            w = v && v.whiteSpace,
                            t = [I, r, d.innerHTML, this.textWidth, this.textAlign].join();
                        t !== this.cTT && (v = a.fontMetrics(d.style.fontSize).b, E(I) && this.setSpanRotation(I, n, v), D(d, {
                            width: "",
                            whiteSpace: w || "nowrap"
                        }), d.offsetWidth > e && /[ \-]/.test(d.textContent || d.innerText) && D(d, {
                            width: e + "px",
                            display: "block",
                            whiteSpace: w ||
                                "normal"
                        }), this.getSpanCorrection(d.offsetWidth, v, n, I, r));
                        D(d, {
                            left: b + (this.xCorr || 0) + "px",
                            top: m + (this.yCorr || 0) + "px"
                        });
                        h && (v = d.offsetHeight);
                        this.cTT = t
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, d, f) {
                var c = {},
                    b = t ? "-ms-transform" : h ? "-webkit-transform" : q ? "MozTransform" : m.opera ? "-o-transform" : "";
                c[b] = c.transform = "rotate(" + a + "deg)";
                c[b + (q ? "Origin" : "-origin")] = c.transformOrigin = 100 * d + "% " + f + "px";
                D(this.element, c)
            },
            getSpanCorrection: function(a, d, f) {
                this.xCorr = -a * f;
                this.yCorr = -d
            }
        });
        e(d.prototype, {
            html: function(a, d, f) {
                var c = this.createElement("span"),
                    b = c.element,
                    m = c.renderer,
                    k = m.isSVG,
                    n = function(a, b) {
                        g(["opacity", "visibility"], function(c) {
                            w(a, c + "Setter", function(a, c, n, f) {
                                a.call(this, c, n, f);
                                b[n] = c
                            })
                        })
                    };
                c.textSetter = function(a) {
                    a !== b.innerHTML && delete this.bBox;
                    b.innerHTML = this.textStr = a;
                    c.htmlUpdateTransform()
                };
                k && n(c, c.element.style);
                c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function(a, b) {
                    "align" === b && (b = "textAlign");
                    c[b] = a;
                    c.htmlUpdateTransform()
                };
                c.attr({
                    text: a,
                    x: Math.round(d),
                    y: Math.round(f)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                b.style.whiteSpace = "nowrap";
                c.css = c.htmlCss;
                k && (c.add = function(a) {
                    var f, d = m.box.parentNode,
                        v = [];
                    if (this.parentGroup = a) {
                        if (f = a.div, !f) {
                            for (; a;) v.push(a), a = a.parentGroup;
                            g(v.reverse(), function(a) {
                                var b, m = B(a.element, "class");
                                m && (m = {
                                    className: m
                                });
                                f = a.div = a.div || F("div", m, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles &&
                                        a.styles.pointerEvents
                                }, f || d);
                                b = f.style;
                                e(a, {
                                    on: function() {
                                        c.on.apply({
                                            element: v[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: function(c, n) {
                                        b.left = c + "px";
                                        a[n] = c;
                                        a.doTransform = !0
                                    },
                                    translateYSetter: function(c, n) {
                                        b.top = c + "px";
                                        a[n] = c;
                                        a.doTransform = !0
                                    }
                                });
                                n(a, b)
                            })
                        }
                    } else f = d;
                    f.appendChild(b);
                    c.added = !0;
                    c.alignOnAdd && c.htmlUpdateTransform();
                    return c
                });
                return c
            }
        })
    })(K);
    (function(a) {
        var B, F, D = a.createElement,
            E = a.css,
            g = a.defined,
            e = a.deg2rad,
            q = a.discardElement,
            t = a.doc,
            h = a.each,
            u = a.erase,
            d = a.extend;
        B = a.extendClass;
        var m = a.isArray,
            w = a.isNumber,
            p = a.isObject,
            k = a.merge;
        F = a.noop;
        var f = a.pick,
            c = a.pInt,
            b = a.SVGElement,
            C = a.SVGRenderer,
            r = a.win;
        a.svg || (F = {
            docMode8: t && 8 === t.documentMode,
            init: function(a, b) {
                var c = ["\x3c", b, ' filled\x3d"f" stroked\x3d"f"'],
                    n = ["position: ", "absolute", ";"],
                    f = "div" === b;
                ("shape" === b || f) && n.push("left:0;top:0;width:1px;height:1px;");
                n.push("visibility: ", f ? "hidden" : "visible");
                c.push(' style\x3d"', n.join(""), '"/\x3e');
                b && (c = f || "span" === b || "img" === b ? c.join("") : a.prepVML(c), this.element = D(c));
                this.renderer =
                    a
            },
            add: function(a) {
                var b = this.renderer,
                    c = this.element,
                    n = b.box,
                    f = a && a.inverted,
                    n = a ? a.element || a : n;
                a && (this.parentGroup = a);
                f && b.invertChild(c, n);
                n.appendChild(c);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd) this.onAdd();
                this.className && this.attr("class", this.className);
                return this
            },
            updateTransform: b.prototype.htmlUpdateTransform,
            setSpanRotation: function() {
                var a = this.rotation,
                    b = Math.cos(a * e),
                    c = Math.sin(a * e);
                E(this.element, {
                    filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d",
                        b, ", M12\x3d", -c, ", M21\x3d", c, ", M22\x3d", b, ", sizingMethod\x3d'auto expand')"
                    ].join("") : "none"
                })
            },
            getSpanCorrection: function(a, b, c, d, m) {
                var n = d ? Math.cos(d * e) : 1,
                    v = d ? Math.sin(d * e) : 0,
                    k = f(this.elemHeight, this.element.offsetHeight),
                    r;
                this.xCorr = 0 > n && -a;
                this.yCorr = 0 > v && -k;
                r = 0 > n * v;
                this.xCorr += v * b * (r ? 1 - c : c);
                this.yCorr -= n * b * (d ? r ? c : 1 - c : 1);
                m && "left" !== m && (this.xCorr -= a * c * (0 > n ? -1 : 1), d && (this.yCorr -= k * c * (0 > v ? -1 : 1)), E(this.element, {
                    textAlign: m
                }))
            },
            pathToVML: function(a) {
                for (var b = a.length, c = []; b--;) w(a[b]) ? c[b] =
                    Math.round(10 * a[b]) - 5 : "Z" === a[b] ? c[b] = "x" : (c[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
                return c.join(" ") || "x"
            },
            clip: function(a) {
                var b = this,
                    c;
                a ? (c = a.members, u(c, b), c.push(b), b.destroyClip = function() {
                    u(c, b)
                }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {
                    clip: b.docMode8 ? "inherit" : "rect(auto)"
                });
                return b.css(a)
            },
            css: b.prototype.htmlCss,
            safeRemoveChild: function(a) {
                a.parentNode && q(a)
            },
            destroy: function() {
                this.destroyClip &&
                    this.destroyClip();
                return b.prototype.destroy.apply(this)
            },
            on: function(a, b) {
                this.element["on" + a] = function() {
                    var a = r.event;
                    a.target = a.srcElement;
                    b(a)
                };
                return this
            },
            cutOffPath: function(a, b) {
                var n;
                a = a.split(/[ ,]/);
                n = a.length;
                if (9 === n || 11 === n) a[n - 4] = a[n - 2] = c(a[n - 2]) - 10 * b;
                return a.join(" ")
            },
            shadow: function(a, b, d) {
                var n = [],
                    v, m = this.element,
                    k = this.renderer,
                    r, e = m.style,
                    h, l = m.path,
                    x, C, g, y;
                l && "string" !== typeof l.value && (l = "x");
                C = l;
                if (a) {
                    g = f(a.width, 3);
                    y = (a.opacity || .15) / g;
                    for (v = 1; 3 >= v; v++) x = 2 * g + 1 - 2 * v, d &&
                        (C = this.cutOffPath(l.value, x + .5)), h = ['\x3cshape isShadow\x3d"true" strokeweight\x3d"', x, '" filled\x3d"false" path\x3d"', C, '" coordsize\x3d"10 10" style\x3d"', m.style.cssText, '" /\x3e'], r = D(k.prepVML(h), null, {
                            left: c(e.left) + f(a.offsetX, 1),
                            top: c(e.top) + f(a.offsetY, 1)
                        }), d && (r.cutOff = x + 1), h = ['\x3cstroke color\x3d"', a.color || "#000000", '" opacity\x3d"', y * v, '"/\x3e'], D(k.prepVML(h), null, null, r), b ? b.element.appendChild(r) : m.parentNode.insertBefore(r, m), n.push(r);
                    this.shadows = n
                }
                return this
            },
            updateShadows: F,
            setAttr: function(a, b) {
                this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b)
            },
            classSetter: function(a) {
                (this.added ? this.element : this).className = a
            },
            dashstyleSetter: function(a, b, c) {
                (c.getElementsByTagName("stroke")[0] || D(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, c))[b] = a || "solid";
                this[b] = a
            },
            dSetter: function(a, b, c) {
                var n = this.shadows;
                a = a || [];
                this.d = a.join && a.join(" ");
                c.path = a = this.pathToVML(a);
                if (n)
                    for (c = n.length; c--;) n[c].path = n[c].cutOff ? this.cutOffPath(a, n[c].cutOff) : a;
                this.setAttr(b,
                    a)
            },
            fillSetter: function(a, b, c) {
                var n = c.nodeName;
                "SPAN" === n ? c.style.color = a : "IMG" !== n && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)))
            },
            "fill-opacitySetter": function(a, b, c) {
                D(this.renderer.prepVML(["\x3c", b.split("-")[0], ' opacity\x3d"', a, '"/\x3e']), null, null, c)
            },
            opacitySetter: F,
            rotationSetter: function(a, b, c) {
                c = c.style;
                this[b] = c[b] = a;
                c.left = -Math.round(Math.sin(a * e) + 1) + "px";
                c.top = Math.round(Math.cos(a * e)) + "px"
            },
            strokeSetter: function(a, b, c) {
                this.setAttr("strokecolor",
                    this.renderer.color(a, c, b, this))
            },
            "stroke-widthSetter": function(a, b, c) {
                c.stroked = !!a;
                this[b] = a;
                w(a) && (a += "px");
                this.setAttr("strokeweight", a)
            },
            titleSetter: function(a, b) {
                this.setAttr(b, a)
            },
            visibilitySetter: function(a, b, c) {
                "inherit" === a && (a = "visible");
                this.shadows && h(this.shadows, function(c) {
                    c.style[b] = a
                });
                "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (c.style[b] = a ? "visible" : "hidden"), b = "top");
                c.style[b] = a
            },
            xSetter: function(a, b, c) {
                this[b] = a;
                "x" === b ? b = "left" : "y" === b && (b = "top");
                this.updateClipping ?
                    (this[b] = a, this.updateClipping()) : c.style[b] = a
            },
            zIndexSetter: function(a, b, c) {
                c.style[b] = a
            }
        }, F["stroke-opacitySetter"] = F["fill-opacitySetter"], a.VMLElement = F = B(b, F), F.prototype.ySetter = F.prototype.widthSetter = F.prototype.heightSetter = F.prototype.xSetter, F = {
            Element: F,
            isIE8: -1 < r.navigator.userAgent.indexOf("MSIE 8.0"),
            init: function(a, b, c) {
                var f, n;
                this.alignedObjects = [];
                f = this.createElement("div").css({
                    position: "relative"
                });
                n = f.element;
                a.appendChild(f.element);
                this.isVML = !0;
                this.box = n;
                this.boxWrapper =
                    f;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, c, !1);
                if (!t.namespaces.hcv) {
                    t.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        t.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (L) {
                        t.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function() {
                return !this.box.offsetWidth
            },
            clipRect: function(a, b, c, f) {
                var n = this.createElement(),
                    m = p(a);
                return d(n, {
                    members: [],
                    count: 0,
                    left: (m ? a.x : a) + 1,
                    top: (m ? a.y : b) + 1,
                    width: (m ? a.width : c) - 1,
                    height: (m ? a.height : f) - 1,
                    getCSS: function(a) {
                        var b = a.element,
                            c = b.nodeName,
                            f = a.inverted,
                            l = this.top - ("shape" === c ? b.offsetTop : 0),
                            x = this.left,
                            b = x + this.width,
                            n = l + this.height,
                            l = {
                                clip: "rect(" + Math.round(f ? x : l) + "px," + Math.round(f ? n : b) + "px," + Math.round(f ? b : n) + "px," + Math.round(f ? l : x) + "px)"
                            };
                        !f && a.docMode8 && "DIV" === c && d(l, {
                            width: b + "px",
                            height: n + "px"
                        });
                        return l
                    },
                    updateClipping: function() {
                        h(n.members,
                            function(a) {
                                a.element && a.css(n.getCSS(a))
                            })
                    }
                })
            },
            color: function(b, c, f, d) {
                var n = this,
                    m, v = /^rgba/,
                    k, r, e = "none";
                b && b.linearGradient ? r = "gradient" : b && b.radialGradient && (r = "pattern");
                if (r) {
                    var l, x, C = b.linearGradient || b.radialGradient,
                        g, y, z, p, w, u = "";
                    b = b.stops;
                    var I, t = [],
                        J = function() {
                            k = ['\x3cfill colors\x3d"' + t.join(",") + '" opacity\x3d"', z, '" o:opacity2\x3d"', y, '" type\x3d"', r, '" ', u, 'focus\x3d"100%" method\x3d"any" /\x3e'];
                            D(n.prepVML(k), null, null, c)
                        };
                    g = b[0];
                    I = b[b.length - 1];
                    0 < g[0] && b.unshift([0, g[1]]);
                    1 >
                        I[0] && b.push([1, I[1]]);
                    h(b, function(b, c) {
                        v.test(b[1]) ? (m = a.color(b[1]), l = m.get("rgb"), x = m.get("a")) : (l = b[1], x = 1);
                        t.push(100 * b[0] + "% " + l);
                        c ? (z = x, p = l) : (y = x, w = l)
                    });
                    if ("fill" === f)
                        if ("gradient" === r) f = C.x1 || C[0] || 0, b = C.y1 || C[1] || 0, g = C.x2 || C[2] || 0, C = C.y2 || C[3] || 0, u = 'angle\x3d"' + (90 - 180 * Math.atan((C - b) / (g - f)) / Math.PI) + '"', J();
                        else {
                            var e = C.r,
                                q = 2 * e,
                                E = 2 * e,
                                B = C.cx,
                                F = C.cy,
                                U = c.radialReference,
                                T, e = function() {
                                    U && (T = d.getBBox(), B += (U[0] - T.x) / T.width - .5, F += (U[1] - T.y) / T.height - .5, q *= U[2] / T.width, E *= U[2] / T.height);
                                    u =
                                        'src\x3d"' + a.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + q + "," + E + '" origin\x3d"0.5,0.5" position\x3d"' + B + "," + F + '" color2\x3d"' + w + '" ';
                                    J()
                                };
                            d.added ? e() : d.onAdd = e;
                            e = p
                        }
                    else e = l
                } else v.test(b) && "IMG" !== c.tagName ? (m = a.color(b), d[f + "-opacitySetter"](m.get("a"), f, c), e = m.get("rgb")) : (e = c.getElementsByTagName(f), e.length && (e[0].opacity = 1, e[0].type = "solid"), e = b);
                return e
            },
            prepVML: function(a) {
                var b = this.isIE8;
                a = a.join("");
                b ? (a = a.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), a = -1 === a.indexOf('style\x3d"') ? a.replace("/\x3e", ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') : a.replace('style\x3d"', 'style\x3d"display:inline-block;behavior:url(#default#VML);')) : a = a.replace("\x3c", "\x3chcv:");
                return a
            },
            text: C.prototype.html,
            path: function(a) {
                var b = {
                    coordsize: "10 10"
                };
                m(a) ? b.d = a : p(a) && d(b, a);
                return this.createElement("shape").attr(b)
            },
            circle: function(a, b, c) {
                var f = this.symbol("circle");
                p(a) && (c = a.r, b = a.y, a = a.x);
                f.isCircle = !0;
                f.r = c;
                return f.attr({
                    x: a,
                    y: b
                })
            },
            g: function(a) {
                var b;
                a && (b = {
                    className: "highcharts-" + a,
                    "class": "highcharts-" + a
                });
                return this.createElement("div").attr(b)
            },
            image: function(a, b, c, f, d) {
                var n = this.createElement("img").attr({
                    src: a
                });
                1 < arguments.length && n.attr({
                    x: b,
                    y: c,
                    width: f,
                    height: d
                });
                return n
            },
            createElement: function(a) {
                return "rect" === a ? this.symbol(a) : C.prototype.createElement.call(this, a)
            },
            invertChild: function(a, b) {
                var f = this;
                b = b.style;
                var d = "IMG" === a.tagName && a.style;
                E(a, {
                    flip: "x",
                    left: c(b.width) - (d ? c(d.top) : 1),
                    top: c(b.height) - (d ? c(d.left) : 1),
                    rotation: -90
                });
                h(a.childNodes, function(b) {
                    f.invertChild(b, a)
                })
            },
            symbols: {
                arc: function(a, b, c, f, d) {
                    var n = d.start,
                        m = d.end,
                        k = d.r || c || f;
                    c = d.innerR;
                    f = Math.cos(n);
                    var r = Math.sin(n),
                        v = Math.cos(m),
                        l = Math.sin(m);
                    if (0 === m - n) return ["x"];
                    n = ["wa", a - k, b - k, a + k, b + k, a + k * f, b + k * r, a + k * v, b + k * l];
                    d.open && !c && n.push("e", "M", a, b);
                    n.push("at", a - c, b - c, a + c, b + c, a + c * v, b + c * l, a + c * f, b + c * r, "x", "e");
                    n.isArc = !0;
                    return n
                },
                circle: function(a, b, c, f, d) {
                    d && g(d.r) && (c = f = 2 * d.r);
                    d && d.isCircle && (a -= c / 2, b -= f / 2);
                    return ["wa", a, b, a + c, b + f, a + c, b + f / 2, a + c, b + f / 2, "e"]
                },
                rect: function(a, b, c, f, d) {
                    return C.prototype.symbols[g(d) && d.r ? "callout" : "square"].call(0, a, b, c, f, d)
                }
            }
        }, a.VMLRenderer = B = function() {
            this.init.apply(this, arguments)
        }, B.prototype = k(C.prototype, F), a.Renderer = B);
        C.prototype.measureSpanWidth = function(a, b) {
            var c = t.createElement("span");
            a = t.createTextNode(a);
            c.appendChild(a);
            E(c, b);
            this.box.appendChild(c);
            b = c.offsetWidth;
            q(c);
            return b
        }
    })(K);
    (function(a) {
        var B = a.correctFloat,
            F = a.defined,
            D = a.destroyObjectProperties,
            E = a.isNumber,
            g = a.merge,
            e = a.pick,
            q = a.deg2rad;
        a.Tick = function(a, e, g, d) {
            this.axis = a;
            this.pos = e;
            this.type = g || "";
            this.isNew = !0;
            g || d || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var a = this.axis,
                    h = a.options,
                    u = a.chart,
                    d = a.categories,
                    m = a.names,
                    w = this.pos,
                    p = h.labels,
                    k = a.tickPositions,
                    f = w === k[0],
                    c = w === k[k.length - 1],
                    m = d ? e(d[w], m[w], w) : w,
                    d = this.label,
                    k = k.info,
                    b;
                a.isDatetimeAxis && k && (b = h.dateTimeLabelFormats[k.higherRanks[w] || k.unitName]);
                this.isFirst = f;
                this.isLast = c;
                h = a.labelFormatter.call({
                    axis: a,
                    chart: u,
                    isFirst: f,
                    isLast: c,
                    dateTimeLabelFormat: b,
                    value: a.isLog ? B(a.lin2log(m)) : m
                });
                F(d) ? d && d.attr({
                    text: h
                }) : (this.labelLength = (this.label = d = F(h) && p.enabled ? u.renderer.text(h, 0, 0, p.useHTML).css(g(p.style)).add(a.labelGroup) : null) && d.getBBox().width, this.rotation = 0)
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var h = this.axis,
                    g = a.x,
                    d = h.chart.chartWidth,
                    m = h.chart.spacing,
                    w = e(h.labelLeft, Math.min(h.pos, m[3])),
                    m = e(h.labelRight, Math.max(h.pos + h.len, d - m[1])),
                    p = this.label,
                    k = this.rotation,
                    f = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[h.labelAlign],
                    c = p.getBBox().width,
                    b = h.getSlotWidth(),
                    C = b,
                    r = 1,
                    n, v = {};
                if (k) 0 > k && g - f * c < w ? n = Math.round(g / Math.cos(k * q) - w) : 0 < k && g + f * c > m && (n = Math.round((d - g) / Math.cos(k * q)));
                else if (d = g + (1 - f) * c, g - f * c < w ? C = a.x + C * (1 - f) - w : d > m && (C = m - a.x + C * f, r = -1), C = Math.min(b, C), C < b && "center" === h.labelAlign && (a.x += r * (b - C - f * (b - Math.min(c, C)))), c > C || h.autoRotation && (p.styles || {}).width) n = C;
                n && (v.width = n, (h.options.labels.style || {}).textOverflow || (v.textOverflow = "ellipsis"), p.css(v))
            },
            getPosition: function(a, e, g, d) {
                var m = this.axis,
                    h = m.chart,
                    p = d && h.oldChartHeight || h.chartHeight;
                return {
                    x: a ? m.translate(e + g, null, null, d) + m.transB : m.left + m.offset + (m.opposite ? (d && h.oldChartWidth || h.chartWidth) - m.right - m.left : 0),
                    y: a ? p - m.bottom + m.offset - (m.opposite ? m.height : 0) : p - m.translate(e + g, null, null, d) - m.transB
                }
            },
            getLabelPosition: function(a, e, g, d, m, w, p, k) {
                var f = this.axis,
                    c = f.transA,
                    b = f.reversed,
                    C = f.staggerLines,
                    r = f.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    n = m.y;
                F(n) || (n = 0 === f.side ? g.rotation ? -8 : -g.getBBox().height : 2 ===
                    f.side ? r.y + 8 : Math.cos(g.rotation * q) * (r.y - g.getBBox(!1, 0).height / 2));
                a = a + m.x + r.x - (w && d ? w * c * (b ? -1 : 1) : 0);
                e = e + n - (w && !d ? w * c * (b ? 1 : -1) : 0);
                C && (g = p / (k || 1) % C, f.opposite && (g = C - g - 1), e += f.labelOffset / C * g);
                return {
                    x: a,
                    y: Math.round(e)
                }
            },
            getMarkPath: function(a, e, g, d, m, w) {
                return w.crispLine(["M", a, e, "L", a + (m ? 0 : -g), e + (m ? g : 0)], d)
            },
            render: function(a, g, u) {
                var d = this.axis,
                    m = d.options,
                    h = d.chart.renderer,
                    p = d.horiz,
                    k = this.type,
                    f = this.label,
                    c = this.pos,
                    b = m.labels,
                    C = this.gridLine,
                    r = k ? k + "Tick" : "tick",
                    n = d.tickSize(r),
                    v = this.mark,
                    I = !v,
                    q = b.step,
                    H = {},
                    t = !0,
                    G = d.tickmarkOffset,
                    A = this.getPosition(p, c, G, g),
                    N = A.x,
                    A = A.y,
                    M = p && N === d.pos + d.len || !p && A === d.pos ? -1 : 1,
                    l = k ? k + "Grid" : "grid",
                    x = m[l + "LineWidth"],
                    P = m[l + "LineColor"],
                    O = m[l + "LineDashStyle"],
                    l = e(m[r + "Width"], !k && d.isXAxis ? 1 : 0),
                    r = m[r + "Color"];
                u = e(u, 1);
                this.isActive = !0;
                C || (H.stroke = P, H["stroke-width"] = x, O && (H.dashstyle = O), k || (H.zIndex = 1), g && (H.opacity = 0), this.gridLine = C = h.path().attr(H).addClass("highcharts-" + (k ? k + "-" : "") + "grid-line").add(d.gridGroup));
                if (!g && C && (c = d.getPlotLinePath(c +
                        G, C.strokeWidth() * M, g, !0))) C[this.isNew ? "attr" : "animate"]({
                    d: c,
                    opacity: u
                });
                n && (d.opposite && (n[0] = -n[0]), I && (this.mark = v = h.path().addClass("highcharts-" + (k ? k + "-" : "") + "tick").add(d.axisGroup), v.attr({
                    stroke: r,
                    "stroke-width": l
                })), v[I ? "attr" : "animate"]({
                    d: this.getMarkPath(N, A, n[0], v.strokeWidth() * M, p, h),
                    opacity: u
                }));
                f && E(N) && (f.xy = A = this.getLabelPosition(N, A, f, p, b, G, a, q), this.isFirst && !this.isLast && !e(m.showFirstLabel, 1) || this.isLast && !this.isFirst && !e(m.showLastLabel, 1) ? t = !1 : !p || d.isRadial || b.step ||
                    b.rotation || g || 0 === u || this.handleOverflow(A), q && a % q && (t = !1), t && E(A.y) ? (A.opacity = u, f[this.isNew ? "attr" : "animate"](A)) : f.attr("y", -9999), this.isNew = !1)
            },
            destroy: function() {
                D(this, this.axis)
            }
        }
    })(K);
    (function(a) {
        var B = a.arrayMax,
            F = a.arrayMin,
            D = a.defined,
            E = a.destroyObjectProperties,
            g = a.each,
            e = a.erase,
            q = a.merge,
            t = a.pick;
        a.PlotLineOrBand = function(a, e) {
            this.axis = a;
            e && (this.options = e, this.id = e.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                var a = this,
                    e = a.axis,
                    d = e.horiz,
                    m = a.options,
                    g = m.label,
                    p = a.label,
                    k = m.to,
                    f = m.from,
                    c = m.value,
                    b = D(f) && D(k),
                    C = D(c),
                    r = a.svgElem,
                    n = !r,
                    v = [],
                    I, J = m.color,
                    H = t(m.zIndex, 0),
                    L = m.events,
                    v = {
                        "class": "highcharts-plot-" + (b ? "band " : "line ") + (m.className || "")
                    },
                    G = {},
                    A = e.chart.renderer,
                    N = b ? "bands" : "lines",
                    M = e.log2lin;
                e.isLog && (f = M(f), k = M(k), c = M(c));
                C ? (v = {
                    stroke: J,
                    "stroke-width": m.width
                }, m.dashStyle && (v.dashstyle = m.dashStyle)) : b && (J && (v.fill = J), m.borderWidth && (v.stroke = m.borderColor, v["stroke-width"] = m.borderWidth));
                G.zIndex = H;
                N += "-" + H;
                (J = e[N]) || (e[N] = J = A.g("plot-" + N).attr(G).add());
                n && (a.svgElem = r = A.path().attr(v).add(J));
                if (C) v = e.getPlotLinePath(c, r.strokeWidth());
                else if (b) v = e.getPlotBandPath(f, k, m);
                else return;
                if (n && v && v.length) {
                    if (r.attr({
                            d: v
                        }), L)
                        for (I in m = function(b) {
                                r.on(b, function(c) {
                                    L[b].apply(a, [c])
                                })
                            }, L) m(I)
                } else r && (v ? (r.show(), r.animate({
                    d: v
                })) : (r.hide(), p && (a.label = p = p.destroy())));
                g && D(g.text) && v && v.length && 0 < e.width && 0 < e.height && !v.flat ? (g = q({
                    align: d && b && "center",
                    x: d ? !b && 4 : 10,
                    verticalAlign: !d && b && "middle",
                    y: d ? b ? 16 : 10 : b ? 6 : -4,
                    rotation: d && !b && 90
                }, g), this.renderLabel(g,
                    v, b, H)) : p && p.hide();
                return a
            },
            renderLabel: function(a, e, d, m) {
                var g = this.label,
                    p = this.axis.chart.renderer;
                g || (g = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (d ? "band" : "line") + "-label " + (a.className || "")
                }, g.zIndex = m, this.label = g = p.text(a.text, 0, 0, a.useHTML).attr(g).add(), g.css(a.style));
                m = [e[1], e[4], d ? e[6] : e[1]];
                e = [e[2], e[5], d ? e[7] : e[2]];
                d = F(m);
                p = F(e);
                g.align(a, !1, {
                    x: d,
                    y: p,
                    width: B(m) - d,
                    height: B(e) - p
                });
                g.show()
            },
            destroy: function() {
                e(this.axis.plotLinesAndBands, this);
                delete this.axis;
                E(this)
            }
        };
        a.AxisPlotLineOrBandExtension = {
            getPlotBandPath: function(a, e) {
                e = this.getPlotLinePath(e, null, null, !0);
                (a = this.getPlotLinePath(a, null, null, !0)) && e ? (a.flat = a.toString() === e.toString(), a.push(e[4], e[5], e[1], e[2], "z")) : a = null;
                return a
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function(e, g) {
                var d = (new a.PlotLineOrBand(this, e)).render(),
                    m = this.userOptions;
                d && (g && (m[g] = m[g] || [], m[g].push(e)),
                    this.plotLinesAndBands.push(d));
                return d
            },
            removePlotBandOrLine: function(a) {
                for (var h = this.plotLinesAndBands, d = this.options, m = this.userOptions, w = h.length; w--;) h[w].id === a && h[w].destroy();
                g([d.plotLines || [], m.plotLines || [], d.plotBands || [], m.plotBands || []], function(d) {
                    for (w = d.length; w--;) d[w].id === a && e(d, d[w])
                })
            }
        }
    })(K);
    (function(a) {
        var B = a.addEvent,
            F = a.animObject,
            D = a.arrayMax,
            E = a.arrayMin,
            g = a.AxisPlotLineOrBandExtension,
            e = a.color,
            q = a.correctFloat,
            t = a.defaultOptions,
            h = a.defined,
            u = a.deg2rad,
            d = a.destroyObjectProperties,
            m = a.each,
            w = a.error,
            p = a.extend,
            k = a.fireEvent,
            f = a.format,
            c = a.getMagnitude,
            b = a.grep,
            C = a.inArray,
            r = a.isArray,
            n = a.isNumber,
            v = a.isString,
            I = a.merge,
            J = a.normalizeTickInterval,
            H = a.pick,
            L = a.PlotLineOrBand,
            G = a.removeEvent,
            A = a.splat,
            N = a.syncTimeout,
            M = a.Tick;
        a.Axis = function() {
            this.init.apply(this, arguments)
        };
        a.Axis.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0
                },
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1,
                    formatter: function() {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function(a, b) {
                var c = b.isX;
                this.chart = a;
                this.horiz = a.inverted ? !c : c;
                this.isXAxis = c;
                this.coll = this.coll || (c ? "xAxis" : "yAxis");
                this.opposite = b.opposite;
                this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(b);
                var l = this.options,
                    f = l.type;
                this.labelFormatter = l.labels.formatter || this.defaultLabelFormatter;
                this.userOptions = b;
                this.minPixelPadding = 0;
                this.reversed = l.reversed;
                this.visible = !1 !== l.visible;
                this.zoomEnabled = !1 !== l.zoomEnabled;
                this.hasNames = "category" === f || !0 === l.categories;
                this.categories = l.categories || this.hasNames;
                this.names = this.names || [];
                this.isLog = "logarithmic" === f;
                this.isDatetimeAxis = "datetime" === f;
                this.isLinked = h(l.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = l.minRange || l.maxZoom;
                this.range = l.range;
                this.offset = l.offset || 0;
                this.stacks = {};
                this.oldStacks = {};
                this.stacksTouched = 0;
                this.min = this.max = null;
                this.crosshair = H(l.crosshair, A(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
                var x;
                b = this.options.events; - 1 === C(this, a.axes) && (c ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && c && void 0 === this.reversed && (this.reversed = !0);
                this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (x in b) B(this, x, b[x]);
                this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
            },
            setOptions: function(a) {
                this.options =
                    I(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], I(t[this.coll], a))
            },
            defaultLabelFormatter: function() {
                var b = this.axis,
                    c = this.value,
                    d = b.categories,
                    n = this.dateTimeLabelFormat,
                    m = t.lang,
                    z = m.numericSymbols,
                    m = m.numericSymbolMagnitude || 1E3,
                    k = z && z.length,
                    r, e = b.options.labels.format,
                    b = b.isLog ? c : b.tickInterval;
                if (e) r = f(e, this);
                else if (d) r = c;
                else if (n) r = a.dateFormat(n,
                    c);
                else if (k && 1E3 <= b)
                    for (; k-- && void 0 === r;) d = Math.pow(m, k + 1), b >= d && 0 === 10 * c % d && null !== z[k] && 0 !== c && (r = a.numberFormat(c / d, -1) + z[k]);
                void 0 === r && (r = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));
                return r
            },
            getSeriesExtremes: function() {
                var a = this,
                    c = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                m(a.series, function(l) {
                    if (l.visible || !c.options.chart.ignoreHiddenSeries) {
                        var f = l.options,
                            d = f.threshold,
                            x;
                        a.hasVisibleSeries = !0;
                        a.isLog && 0 >= d && (d = null);
                        if (a.isXAxis) f = l.xData, f.length && (l = E(f), n(l) || l instanceof Date || (f = b(f, function(a) {
                            return n(a)
                        }), l = E(f)), a.dataMin = Math.min(H(a.dataMin, f[0]), l), a.dataMax = Math.max(H(a.dataMax, f[0]), D(f)));
                        else if (l.getExtremes(), x = l.dataMax, l = l.dataMin, h(l) && h(x) && (a.dataMin = Math.min(H(a.dataMin, l), l), a.dataMax = Math.max(H(a.dataMax, x), x)), h(d) && (a.threshold = d), !f.softThreshold || a.isLog) a.softThreshold = !1
                    }
                })
            },
            translate: function(a, b, c, f, d, m) {
                var l = this.linkedParent || this,
                    x = 1,
                    k = 0,
                    r = f ? l.oldTransA :
                    l.transA;
                f = f ? l.oldMin : l.min;
                var z = l.minPixelPadding;
                d = (l.isOrdinal || l.isBroken || l.isLog && d) && l.lin2val;
                r || (r = l.transA);
                c && (x *= -1, k = l.len);
                l.reversed && (x *= -1, k -= x * (l.sector || l.len));
                b ? (a = (a * x + k - z) / r + f, d && (a = l.lin2val(a))) : (d && (a = l.val2lin(a)), a = x * (a - f) * r + k + x * z + (n(m) ? r * m : 0));
                return a
            },
            toPixels: function(a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function(a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(a, b, c, f, d) {
                var l = this.chart,
                    x = this.left,
                    m = this.top,
                    k, r, e = c && l.oldChartHeight || l.chartHeight,
                    v = c && l.oldChartWidth || l.chartWidth,
                    g;
                k = this.transB;
                var A = function(a, b, c) {
                    if (a < b || a > c) f ? a = Math.min(Math.max(b, a), c) : g = !0;
                    return a
                };
                d = H(d, this.translate(a, null, null, c));
                a = c = Math.round(d + k);
                k = r = Math.round(e - d - k);
                n(d) ? this.horiz ? (k = m, r = e - this.bottom, a = c = A(a, x, x + this.width)) : (a = x, c = v - this.right, k = r = A(k, m, m + this.height)) : g = !0;
                return g && !f ? null : l.renderer.crispLine(["M", a, k, "L", c, r], b || 1)
            },
            getLinearTickPositions: function(a, b, c) {
                var l, f = q(Math.floor(b /
                        a) * a),
                    d = q(Math.ceil(c / a) * a),
                    x = [];
                if (b === c && n(b)) return [b];
                for (b = f; b <= d;) {
                    x.push(b);
                    b = q(b + a);
                    if (b === l) break;
                    l = b
                }
                return x
            },
            getMinorTickPositions: function() {
                var a = this.options,
                    b = this.tickPositions,
                    c = this.minorTickInterval,
                    f = [],
                    d, n = this.pointRangePadding || 0;
                d = this.min - n;
                var n = this.max + n,
                    m = n - d;
                if (m && m / c < this.len / 3)
                    if (this.isLog)
                        for (n = b.length, d = 1; d < n; d++) f = f.concat(this.getLogTickPositions(c, b[d - 1], b[d], !0));
                    else if (this.isDatetimeAxis && "auto" === a.minorTickInterval) f = f.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c),
                    d, n, a.startOfWeek));
                else
                    for (b = d + (b[0] - d) % c; b <= n && b !== f[0]; b += c) f.push(b);
                0 !== f.length && this.trimTicks(f, a.startOnTick, a.endOnTick);
                return f
            },
            adjustForMinRange: function() {
                var a = this.options,
                    b = this.min,
                    c = this.max,
                    f, d = this.dataMax - this.dataMin >= this.minRange,
                    n, k, r, e, v, g;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (h(a.min) || h(a.max) ? this.minRange = null : (m(this.series, function(a) {
                    e = a.xData;
                    for (k = v = a.xIncrement ? 1 : e.length - 1; 0 < k; k--)
                        if (r = e[k] - e[k - 1], void 0 === n || r < n) n = r
                }), this.minRange = Math.min(5 *
                    n, this.dataMax - this.dataMin)));
                c - b < this.minRange && (g = this.minRange, f = (g - c + b) / 2, f = [b - f, H(a.min, b - f)], d && (f[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = D(f), c = [b + g, H(a.max, b + g)], d && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = E(c), c - b < g && (f[0] = c - g, f[1] = H(a.min, c - g), b = D(f)));
                this.min = b;
                this.max = c
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : m(this.series, function(b) {
                    var c = b.closestPointRange,
                        l = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && h(c) &&
                        l && (a = h(a) ? Math.min(a, c) : c)
                });
                return a
            },
            nameToX: function(a) {
                var b = r(this.categories),
                    c = b ? this.categories : this.names,
                    l = a.options.x,
                    f;
                a.series.requireSorting = !1;
                h(l) || (l = !1 === this.options.uniqueNames ? a.series.autoIncrement() : C(a.name, c)); - 1 === l ? b || (f = c.length) : f = l;
                this.names[f] = a.name;
                return f
            },
            updateNames: function() {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = void 0, m(this.series || [], function(b) {
                    b.xIncrement = null;
                    if (!b.points || b.isDirtyData) b.processData(), b.generatePoints();
                    m(b.points, function(c, l) {
                        var f;
                        c.options && void 0 === c.options.x && (f = a.nameToX(c), f !== c.x && (c.x = f, b.xData[l] = f))
                    })
                }))
            },
            setAxisTranslation: function(a) {
                var b = this,
                    c = b.max - b.min,
                    l = b.axisPointRange || 0,
                    f, d = 0,
                    n = 0,
                    k = b.linkedParent,
                    r = !!b.categories,
                    e = b.transA,
                    g = b.isXAxis;
                if (g || r || l) f = b.getClosest(), k ? (d = k.minPointOffset, n = k.pointRangePadding) : m(b.series, function(a) {
                    var c = r ? 1 : g ? H(a.options.pointRange, f, 0) : b.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    l = Math.max(l, c);
                    b.single || (d = Math.max(d, v(a) ? 0 : c / 2), n = Math.max(n,
                        "on" === a ? 0 : c))
                }), k = b.ordinalSlope && f ? b.ordinalSlope / f : 1, b.minPointOffset = d *= k, b.pointRangePadding = n *= k, b.pointRange = Math.min(l, c), g && (b.closestPointRange = f);
                a && (b.oldTransA = e);
                b.translationSlope = b.transA = e = b.len / (c + n || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = e * d
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(a) {
                var b = this,
                    l = b.chart,
                    f = b.options,
                    d = b.isLog,
                    r = b.log2lin,
                    e = b.isDatetimeAxis,
                    g = b.isXAxis,
                    v = b.isLinked,
                    A = f.maxPadding,
                    C = f.minPadding,
                    p = f.tickInterval,
                    G = f.tickPixelInterval,
                    N = b.categories,
                    u = b.threshold,
                    I = b.softThreshold,
                    M, t, L, E;
                e || N || v || this.getTickAmount();
                L = H(b.userMin, f.min);
                E = H(b.userMax, f.max);
                v ? (b.linkedParent = l[b.coll][f.linkedTo], l = b.linkedParent.getExtremes(), b.min = H(l.min, l.dataMin), b.max = H(l.max, l.dataMax), f.type !== b.linkedParent.options.type && w(11, 1)) : (!I && h(u) && (b.dataMin >= u ? (M = u, C = 0) : b.dataMax <= u && (t = u, A = 0)), b.min = H(L, M, b.dataMin), b.max = H(E, t, b.dataMax));
                d && (!a && 0 >= Math.min(b.min, H(b.dataMin, b.min)) && w(10, 1), b.min = q(r(b.min), 15), b.max =
                    q(r(b.max), 15));
                b.range && h(b.max) && (b.userMin = b.min = L = Math.max(b.min, b.minFromRange()), b.userMax = E = b.max, b.range = null);
                k(b, "foundExtremes");
                b.beforePadding && b.beforePadding();
                b.adjustForMinRange();
                !(N || b.axisPointRange || b.usePercentage || v) && h(b.min) && h(b.max) && (r = b.max - b.min) && (!h(L) && C && (b.min -= r * C), !h(E) && A && (b.max += r * A));
                n(f.floor) ? b.min = Math.max(b.min, f.floor) : n(f.softMin) && (b.min = Math.min(b.min, f.softMin));
                n(f.ceiling) ? b.max = Math.min(b.max, f.ceiling) : n(f.softMax) && (b.max = Math.max(b.max, f.softMax));
                I && h(b.dataMin) && (u = u || 0, !h(L) && b.min < u && b.dataMin >= u ? b.min = u : !h(E) && b.max > u && b.dataMax <= u && (b.max = u));
                b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : v && !p && G === b.linkedParent.options.tickPixelInterval ? p = b.linkedParent.tickInterval : H(p, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, N ? 1 : (b.max - b.min) * G / Math.max(b.len, G));
                g && !a && m(b.series, function(a) {
                    a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
                });
                b.setAxisTranslation(!0);
                b.beforeSetTickPositions && b.beforeSetTickPositions();
                b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                b.pointRange && !p && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
                a = H(f.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                !p && b.tickInterval < a && (b.tickInterval = a);
                e || d || p || (b.tickInterval = J(b.tickInterval, null, c(b.tickInterval), H(f.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
                this.tickAmount || (b.tickInterval = b.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var a =
                    this.options,
                    b, c = a.tickPositions,
                    f = a.tickPositioner,
                    d = a.startOnTick,
                    n = a.endOnTick,
                    m;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.tickPositions = b = c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, f && (f = f.apply(this, [this.min, this.max]))) && (this.tickPositions = b = f);
                this.isLinked || (this.trimTicks(b, d, n), this.min === this.max && h(this.min) && !this.tickAmount && (m = !0, this.min -= .5, this.max += .5), this.single = m, c || f || this.adjustTickAmount())
            },
            trimTicks: function(a, b, c) {
                var l = a[0],
                    f = a[a.length - 1],
                    d = this.minPointOffset ||
                    0;
                if (b) this.min = l;
                else
                    for (; this.min - d > a[0];) a.shift();
                if (c) this.max = f;
                else
                    for (; this.max + d < a[a.length - 1];) a.pop();
                0 === a.length && h(l) && a.push((f + l) / 2)
            },
            alignToOthers: function() {
                var a = {},
                    b, c = this.options;
                !1 !== this.chart.options.chart.alignTicks && !1 !== c.alignTicks && m(this.chart[this.coll], function(c) {
                    var l = c.options,
                        l = [c.horiz ? l.left : l.top, l.width, l.height, l.pane].join();
                    c.series.length && (a[l] ? b = !0 : a[l] = 1)
                });
                return b
            },
            getTickAmount: function() {
                var a = this.options,
                    b = a.tickAmount,
                    c = a.tickPixelInterval;
                !h(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function() {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    c = this.tickAmount,
                    f = this.finalTickAmt,
                    d = b && b.length;
                if (d < c) {
                    for (; b.length < c;) b.push(q(b[b.length - 1] + a));
                    this.transA *= (d - 1) / (c - 1);
                    this.max = b[b.length - 1]
                } else d > c && (this.tickInterval *= 2, this.setTickPositions());
                if (h(f)) {
                    for (a = c = b.length; a--;)(3 ===
                        f && 1 === a % 2 || 2 >= f && 0 < a && a < c - 1) && b.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function() {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                m(this.series, function(b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(),
                    this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function(a, b, c, f, d) {
                var l = this,
                    n = l.chart;
                c = H(c, !0);
                m(l.series, function(a) {
                    delete a.kdTree
                });
                d = p(d, {
                    min: a,
                    max: b
                });
                k(l, "setExtremes", d, function() {
                    l.userMin = a;
                    l.userMax = b;
                    l.eventArgs = d;
                    c && n.redraw(f)
                })
            },
            zoom: function(a, b) {
                var c = this.dataMin,
                    l = this.dataMax,
                    f = this.options,
                    d = Math.min(c, H(f.min, c)),
                    f = Math.max(l, H(f.max, l));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (h(c) && (a < d && (a = d), a > f && (a = f)), h(l) && (b < d && (b = d), b > f && (b = f))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function() {
                var a = this.chart,
                    b = this.options,
                    c = b.offsetLeft || 0,
                    f = this.horiz,
                    d = H(b.width, a.plotWidth - c + (b.offsetRight || 0)),
                    n = H(b.height, a.plotHeight),
                    m = H(b.top, a.plotTop),
                    b = H(b.left, a.plotLeft + c),
                    c = /%$/;
                c.test(n) && (n = Math.round(parseFloat(n) / 100 * a.plotHeight));
                c.test(m) && (m = Math.round(parseFloat(m) / 100 * a.plotHeight + a.plotTop));
                this.left = b;
                this.top = m;
                this.width = d;
                this.height = n;
                this.bottom = a.chartHeight - n - m;
                this.right = a.chartWidth - d - b;
                this.len = Math.max(f ? d : n, 0);
                this.pos = f ? b : m
            },
            getExtremes: function() {
                var a = this.isLog,
                    b = this.lin2log;
                return {
                    min: a ? q(b(this.min)) : this.min,
                    max: a ? q(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var b = this.isLog,
                    c = this.lin2log,
                    f = b ? c(this.min) : this.min,
                    b = b ? c(this.max) : this.max;
                null === a ? a = f : f > a ? a = f : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                a = (H(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function(a) {
                var b = this.options,
                    c = b[a + "Length"],
                    f = H(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (f && c) return "inside" === b[a + "Position"] && (c = -c), [c, f]
            },
            labelMetrics: function() {
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[0] &&
                    this.ticks[0].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    b = this.horiz,
                    c = this.tickInterval,
                    f = c,
                    d = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
                    n, k = a.rotation,
                    r = this.labelMetrics(),
                    e, v = Number.MAX_VALUE,
                    g, A = function(a) {
                        a /= d || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return a * c
                    };
                b ? (g = !a.staggerLines && !a.step && (h(k) ? [k] : d < H(a.autoRotationLimit, 80) && a.autoRotation)) && m(g, function(a) {
                    var b;
                    if (a === k || a && -90 <= a && 90 >= a) e = A(Math.abs(r.h / Math.sin(u * a))), b = e + Math.abs(a / 360), b < v && (v = b, n = a, f = e)
                }) : a.step || (f = A(r.h));
                this.autoRotation = g;
                this.labelRotation = H(n, k);
                return f
            },
            getSlotWidth: function() {
                var a = this.chart,
                    b = this.horiz,
                    c = this.options.labels,
                    f = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    d = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * a.plotWidth / f || !b && (d && d - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function() {
                var a = this.chart,
                    b = a.renderer,
                    c = this.tickPositions,
                    f = this.ticks,
                    d = this.options.labels,
                    n = this.horiz,
                    k = this.getSlotWidth(),
                    r = Math.max(1, Math.round(k - 2 *
                        (d.padding || 5))),
                    e = {},
                    g = this.labelMetrics(),
                    A = d.style && d.style.textOverflow,
                    C, p = 0,
                    h, G;
                v(d.rotation) || (e.rotation = d.rotation || 0);
                m(c, function(a) {
                    (a = f[a]) && a.labelLength > p && (p = a.labelLength)
                });
                this.maxLabelLength = p;
                if (this.autoRotation) p > r && p > g.h ? e.rotation = this.labelRotation : this.labelRotation = 0;
                else if (k && (C = {
                        width: r + "px"
                    }, !A))
                    for (C.textOverflow = "clip", h = c.length; !n && h--;)
                        if (G = c[h], r = f[G].label) r.styles && "ellipsis" === r.styles.textOverflow ? r.css({
                            textOverflow: "clip"
                        }) : f[G].labelLength > k && r.css({
                            width: k +
                                "px"
                        }), r.getBBox().height > this.len / c.length - (g.h - g.f) && (r.specCss = {
                            textOverflow: "ellipsis"
                        });
                e.rotation && (C = {
                    width: (p > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"
                }, A || (C.textOverflow = "ellipsis"));
                if (this.labelAlign = d.align || this.autoLabelAlign(this.labelRotation)) e.align = this.labelAlign;
                m(c, function(a) {
                    var b = (a = f[a]) && a.label;
                    b && (b.attr(e), C && b.css(I(C, b.specCss)), delete b.specCss, a.rotation = e.rotation)
                });
                this.tickRotCorr = b.rotCorr(g.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.hasVisibleSeries ||
                    h(this.min) && h(this.max) && !!this.tickPositions
            },
            getOffset: function() {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    f = a.options,
                    d = a.tickPositions,
                    n = a.ticks,
                    k = a.horiz,
                    r = a.side,
                    e = b.inverted ? [1, 0, 3, 2][r] : r,
                    g, v, A = 0,
                    C, p = 0,
                    G = f.title,
                    w = f.labels,
                    N = 0,
                    u = a.opposite,
                    I = b.axisOffset,
                    b = b.clipOffset,
                    q = [-1, 1, 1, -1][r],
                    t, J = f.className,
                    L = a.axisParent,
                    E = this.tickSize("tick");
                g = a.hasData();
                a.showAxis = v = g || H(f.showEmpty, !0);
                a.staggerLines = a.horiz && w.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({
                    zIndex: f.gridZIndex || 1
                }).addClass("highcharts-" +
                    this.coll.toLowerCase() + "-grid " + (J || "")).add(L), a.axisGroup = c.g("axis").attr({
                    zIndex: f.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (J || "")).add(L), a.labelGroup = c.g("axis-labels").attr({
                    zIndex: w.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (J || "")).add(L));
                if (g || a.isLinked) m(d, function(b) {
                    n[b] ? n[b].addLabel() : n[b] = new M(a, b)
                }), a.renderUnsquish(), !1 === w.reserveSpace || 0 !== r && 2 !== r && {
                    1: "left",
                    3: "right"
                }[r] !== a.labelAlign && "center" !== a.labelAlign || m(d, function(a) {
                    N =
                        Math.max(n[a].getLabelSize(), N)
                }), a.staggerLines && (N *= a.staggerLines, a.labelOffset = N * (a.opposite ? -1 : 1));
                else
                    for (t in n) n[t].destroy(), delete n[t];
                G && G.text && !1 !== G.enabled && (a.axisTitle || ((t = G.textAlign) || (t = (k ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: u ? "right" : "left",
                        middle: "center",
                        high: u ? "left" : "right"
                    })[G.align]), a.axisTitle = c.text(G.text, 0, 0, G.useHTML).attr({
                        zIndex: 7,
                        rotation: G.rotation || 0,
                        align: t
                    }).addClass("highcharts-axis-title").css(G.style).add(a.axisGroup), a.axisTitle.isNew = !0),
                    v && (A = a.axisTitle.getBBox()[k ? "height" : "width"], C = G.offset, p = h(C) ? 0 : H(G.margin, k ? 5 : 10)), a.axisTitle[v ? "show" : "hide"](!0));
                a.renderLine();
                a.offset = q * H(f.offset, I[r]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                c = 0 === r ? -a.labelMetrics().h : 2 === r ? a.tickRotCorr.y : 0;
                p = Math.abs(N) + p;
                N && (p = p - c + q * (k ? H(w.y, a.tickRotCorr.y + 8 * q) : w.x));
                a.axisTitleMargin = H(C, p);
                I[r] = Math.max(I[r], a.axisTitleMargin + A + q * a.offset, p, g && d.length && E ? E[0] : 0);
                f = f.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[e] = Math.max(b[e], f)
            },
            getLinePath: function(a) {
                var b =
                    this.chart,
                    c = this.opposite,
                    f = this.offset,
                    d = this.horiz,
                    l = this.left + (c ? this.width : 0) + f,
                    f = b.chartHeight - this.bottom - (c ? this.height : 0) + f;
                c && (a *= -1);
                return b.renderer.crispLine(["M", d ? this.left : l, d ? f : this.top, "L", d ? b.chartWidth - this.right : l, d ? f : b.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    b = this.left,
                    c = this.top,
                    f = this.len,
                    d = this.options.title,
                    n = a ? b : c,
                    r = this.opposite,
                    k = this.offset,
                    m = d.x || 0,
                    e = d.y || 0,
                    g = this.chart.renderer.fontMetrics(d.style && d.style.fontSize, this.axisTitle).f,
                    f = {
                        low: n + (a ? 0 : f),
                        middle: n + f / 2,
                        high: n + (a ? f : 0)
                    }[d.align],
                    b = (a ? c + this.height : b) + (a ? 1 : -1) * (r ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? g : 0);
                return {
                    x: a ? f + m : b + (r ? this.width : 0) + k + m,
                    y: a ? b + e - (r ? this.height : 0) + k : f + e
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    f = a.options,
                    d = a.isLog,
                    r = a.lin2log,
                    k = a.isLinked,
                    e = a.tickPositions,
                    g = a.axisTitle,
                    v = a.ticks,
                    A = a.minorTicks,
                    C = a.alternateBands,
                    p = f.stackLabels,
                    G = f.alternateGridColor,
                    h = a.tickmarkOffset,
                    w = a.axisLine,
                    u = b.hasRendered && n(a.oldMin),
                    I = a.showAxis,
                    H = F(c.globalAnimation),
                    q, t;
                a.labelEdge.length = 0;
                a.overlap = !1;
                m([v, A, C], function(a) {
                    for (var b in a) a[b].isActive = !1
                });
                if (a.hasData() || k) a.minorTickInterval && !a.categories && m(a.getMinorTickPositions(), function(b) {
                    A[b] || (A[b] = new M(a, b, "minor"));
                    u && A[b].isNew && A[b].render(null, !0);
                    A[b].render(null, !1, 1)
                }), e.length && (m(e, function(b, c) {
                    if (!k || b >= a.min && b <= a.max) v[b] || (v[b] = new M(a, b)), u && v[b].isNew && v[b].render(c, !0, .1), v[b].render(c)
                }), h && (0 === a.min || a.single) && (v[-1] || (v[-1] = new M(a, -1, null, !0)), v[-1].render(-1))), G && m(e, function(c, f) {
                    t = void 0 !== e[f + 1] ? e[f + 1] + h : a.max - h;
                    0 === f % 2 && c < a.max && t <= a.max + (b.polar ? -h : h) && (C[c] || (C[c] = new L(a)), q = c + h, C[c].options = {
                        from: d ? r(q) : q,
                        to: d ? r(t) : t,
                        color: G
                    }, C[c].render(), C[c].isActive = !0)
                }), a._addedPlotLB || (m((f.plotLines || []).concat(f.plotBands || []), function(b) {
                    a.addPlotBandOrLine(b)
                }), a._addedPlotLB = !0);
                m([v, A, C], function(a) {
                    var c, f, d = [],
                        l = H.duration;
                    for (c in a) a[c].isActive || (a[c].render(c, !1, 0), a[c].isActive = !1, d.push(c));
                    N(function() {
                        for (f = d.length; f--;) a[d[f]] && !a[d[f]].isActive && (a[d[f]].destroy(), delete a[d[f]])
                    }, a !== C && b.hasRendered && l ? l : 0)
                });
                w && (w[w.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(w.strokeWidth())
                }), w.isPlaced = !0, w[I ? "show" : "hide"](!0));
                g && I && (g[g.isNew ? "attr" : "animate"](a.getTitlePosition()), g.isNew = !1);
                p && p.enabled &&
                    a.renderStackTotals();
                a.isDirty = !1
            },
            redraw: function() {
                this.visible && (this.render(), m(this.plotLinesAndBands, function(a) {
                    a.render()
                }));
                m(this.series, function(a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(a) {
                var b = this,
                    c = b.stacks,
                    f, l = b.plotLinesAndBands,
                    n;
                a || G(b);
                for (f in c) d(c[f]), c[f] = null;
                m([b.ticks, b.minorTicks, b.alternateBands], function(a) {
                    d(a)
                });
                if (l)
                    for (a = l.length; a--;) l[a].destroy();
                m("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
                    function(a) {
                        b[a] && (b[a] = b[a].destroy())
                    });
                for (n in b) b.hasOwnProperty(n) && -1 === C(n, b.keepProps) && delete b[n]
            },
            drawCrosshair: function(a, b) {
                var c, f = this.crosshair,
                    d = H(f.snap, !0),
                    l, n = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (h(b) || !d) ? (d ? h(b) && (l = this.isXAxis ? b.plotX : this.len - b.plotY) : l = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), h(l) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : H(b.stackY, b.y)), null, null, null, l) || null), h(c) ? (b = this.categories && !this.isRadial,
                    n || (this.cross = n = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + f.className).attr({
                        zIndex: H(f.zIndex, 2)
                    }).add(), n.attr({
                        stroke: f.color || (b ? e("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": H(f.width, 1)
                    }), f.dashStyle && n.attr({
                        dashstyle: f.dashStyle
                    })), n.show().attr({
                        d: c
                    }), b && !f.width && n.attr({
                        "stroke-width": this.transA
                    }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide()
            }
        };
        p(a.Axis.prototype, g)
    })(K);
    (function(a) {
        var B = a.Axis,
            F = a.getMagnitude,
            D = a.map,
            E = a.normalizeTickInterval,
            g = a.pick;
        B.prototype.getLogTickPositions = function(a, q, t, h) {
            var e = this.options,
                d = this.len,
                m = this.lin2log,
                w = this.log2lin,
                p = [];
            h || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), p = this.getLinearTickPositions(a, q, t);
            else if (.08 <= a)
                for (var d = Math.floor(q), k, f, c, b, C, e = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; d < t + 1 && !C; d++)
                    for (f = e.length, k = 0; k < f && !C; k++) c = w(m(d) * e[k]), c > q && (!h || b <= t) &&
                        void 0 !== b && p.push(b), b > t && (C = !0), b = c;
            else q = m(q), t = m(t), a = e[h ? "minorTickInterval" : "tickInterval"], a = g("auto" === a ? null : a, this._minorAutoInterval, e.tickPixelInterval / (h ? 5 : 1) * (t - q) / ((h ? d / this.tickPositions.length : d) || 1)), a = E(a, null, F(a)), p = D(this.getLinearTickPositions(a, q, t), w), h || (this._minorAutoInterval = a / 5);
            h || (this.tickInterval = a);
            return p
        };
        B.prototype.log2lin = function(a) {
            return Math.log(a) / Math.LN10
        };
        B.prototype.lin2log = function(a) {
            return Math.pow(10, a)
        }
    })(K);
    (function(a) {
        var B = a.dateFormat,
            F =
            a.each,
            D = a.extend,
            E = a.format,
            g = a.isNumber,
            e = a.map,
            q = a.merge,
            t = a.pick,
            h = a.splat,
            u = a.syncTimeout,
            d = a.timeUnits;
        a.Tooltip = function() {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function(a, d) {
                this.chart = a;
                this.options = d;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split
            },
            cleanSplit: function(a) {
                F(this.chart.series, function(d) {
                    var m = d && d.tt;
                    m && (!m.isActive || a ? d.tt = m.destroy() : m.isActive = !1)
                })
            },
            getLabel: function() {
                var a =
                    this.chart.renderer,
                    d = this.options;
                this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, d.shape || "callout", null, null, d.useHTML, null, "tooltip").attr({
                    padding: d.padding,
                    r: d.borderRadius
                }), this.label.attr({
                    fill: d.backgroundColor,
                    "stroke-width": d.borderWidth
                }).css(d.style).shadow(d.shadow)), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function(a) {
                this.destroy();
                this.init(this.chart, q(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function(a, d, e, k) {
                var f = this,
                    c = f.now,
                    b = !1 !== f.options.animation && !f.isHidden && (1 < Math.abs(a - c.x) || 1 < Math.abs(d - c.y)),
                    m = f.followPointer || 1 < f.len;
                D(c, {
                    x: b ? (2 * c.x + a) / 3 : a,
                    y: b ? (c.y + d) / 2 : d,
                    anchorX: m ? void 0 : b ? (2 * c.anchorX + e) / 3 : e,
                    anchorY: m ? void 0 : b ? (c.anchorY + k) / 2 : k
                });
                f.getLabel().attr(c);
                b && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    f &&
                        f.move(a, d, e, k)
                }, 32))
            },
            hide: function(a) {
                var d = this;
                clearTimeout(this.hideTimer);
                a = t(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = u(function() {
                    d.getLabel()[a ? "fadeOut" : "hide"]();
                    d.isHidden = !0
                }, a))
            },
            getAnchor: function(a, d) {
                var m, k = this.chart,
                    f = k.inverted,
                    c = k.plotTop,
                    b = k.plotLeft,
                    g = 0,
                    r = 0,
                    n, v;
                a = h(a);
                m = a[0].tooltipPos;
                this.followPointer && d && (void 0 === d.chartX && (d = k.pointer.normalize(d)), m = [d.chartX - k.plotLeft, d.chartY - c]);
                m || (F(a, function(a) {
                    n = a.series.yAxis;
                    v = a.series.xAxis;
                    g += a.plotX +
                        (!f && v ? v.left - b : 0);
                    r += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!f && n ? n.top - c : 0)
                }), g /= a.length, r /= a.length, m = [f ? k.plotWidth - r : g, this.shared && !f && 1 < a.length && d ? d.chartY - c : f ? k.plotHeight - g : r]);
                return e(m, Math.round)
            },
            getPosition: function(a, d, e) {
                var k = this.chart,
                    f = this.distance,
                    c = {},
                    b = e.h || 0,
                    m, r = ["y", k.chartHeight, d, e.plotY + k.plotTop, k.plotTop, k.plotTop + k.plotHeight],
                    n = ["x", k.chartWidth, a, e.plotX + k.plotLeft, k.plotLeft, k.plotLeft + k.plotWidth],
                    g = !this.followPointer && t(e.ttBelow, !k.inverted === !!e.negative),
                    p = function(a, d, n, r, l, k) {
                        var m = n < r - f,
                            e = r + f + n < d,
                            v = r - f - n;
                        r += f;
                        if (g && e) c[a] = r;
                        else if (!g && m) c[a] = v;
                        else if (m) c[a] = Math.min(k - n, 0 > v - b ? v : v - b);
                        else if (e) c[a] = Math.max(l, r + b + n > d ? r : r + b);
                        else return !1
                    },
                    h = function(a, b, d, n) {
                        var l;
                        n < f || n > b - f ? l = !1 : c[a] = n < d / 2 ? 1 : n > b - d / 2 ? b - d - 2 : n - d / 2;
                        return l
                    },
                    w = function(a) {
                        var b = r;
                        r = n;
                        n = b;
                        m = a
                    },
                    u = function() {
                        !1 !== p.apply(0, r) ? !1 !== h.apply(0, n) || m || (w(!0), u()) : m ? c.x = c.y = 0 : (w(!0), u())
                    };
                (k.inverted || 1 < this.len) && w();
                u();
                return c
            },
            defaultFormatter: function(a) {
                var d = this.points || h(this),
                    m;
                m = [a.tooltipFooterHeaderFormatter(d[0])];
                m = m.concat(a.bodyFormatter(d));
                m.push(a.tooltipFooterHeaderFormatter(d[0], !0));
                return m
            },
            refresh: function(a, d) {
                var m = this.chart,
                    k, f = this.options,
                    c, b, e = {},
                    r = [];
                k = f.formatter || this.defaultFormatter;
                var e = m.hoverPoints,
                    n = this.shared;
                clearTimeout(this.hideTimer);
                this.followPointer = h(a)[0].series.tooltipOptions.followPointer;
                b = this.getAnchor(a, d);
                d = b[0];
                c = b[1];
                !n || a.series && a.series.noSharedTooltip ? e = a.getLabelConfig() : (m.hoverPoints = a, e && F(e, function(a) {
                        a.setState()
                    }),
                    F(a, function(a) {
                        a.setState("hover");
                        r.push(a.getLabelConfig())
                    }), e = {
                        x: a[0].category,
                        y: a[0].y
                    }, e.points = r, this.len = r.length, a = a[0]);
                e = k.call(e, this);
                n = a.series;
                this.distance = t(n.tooltipOptions.distance, 16);
                !1 === e ? this.hide() : (k = this.getLabel(), this.isHidden && k.attr({
                    opacity: 1
                }).show(), this.split ? this.renderSplit(e, m.hoverPoints) : (k.attr({
                    text: e && e.join ? e.join("") : e
                }), k.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + t(a.colorIndex, n.colorIndex)), k.attr({
                    stroke: f.borderColor || a.color ||
                        n.color || "#666666"
                }), this.updatePosition({
                    plotX: d,
                    plotY: c,
                    negative: a.negative,
                    ttBelow: a.ttBelow,
                    h: b[2] || 0
                })), this.isHidden = !1)
            },
            renderSplit: function(d, e) {
                var m = this,
                    k = [],
                    f = this.chart,
                    c = f.renderer,
                    b = !0,
                    g = this.options,
                    r, n = this.getLabel();
                F(d.slice(0, d.length - 1), function(a, d) {
                    d = e[d - 1] || {
                        isHeader: !0,
                        plotX: e[0].plotX
                    };
                    var v = d.series || m,
                        C = v.tt,
                        h = d.series || {},
                        G = "highcharts-color-" + t(d.colorIndex, h.colorIndex, "none");
                    C || (v.tt = C = c.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + G).attr({
                        padding: g.padding,
                        r: g.borderRadius,
                        fill: g.backgroundColor,
                        stroke: d.color || h.color || "#333333",
                        "stroke-width": g.borderWidth
                    }).add(n));
                    C.isActive = !0;
                    C.attr({
                        text: a
                    });
                    C.css(g.style);
                    a = C.getBBox();
                    h = a.width + C.strokeWidth();
                    d.isHeader ? (r = a.height, h = Math.max(0, Math.min(d.plotX + f.plotLeft - h / 2, f.chartWidth - h))) : h = d.plotX + f.plotLeft - t(g.distance, 16) - h;
                    0 > h && (b = !1);
                    a = (d.series && d.series.yAxis && d.series.yAxis.pos) + (d.plotY || 0);
                    a -= f.plotTop;
                    k.push({
                        target: d.isHeader ? f.plotHeight + r : a,
                        rank: d.isHeader ? 1 : 0,
                        size: v.tt.getBBox().height +
                            1,
                        point: d,
                        x: h,
                        tt: C
                    })
                });
                this.cleanSplit();
                a.distribute(k, f.plotHeight + r);
                F(k, function(a) {
                    var c = a.point;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: b || c.isHeader ? a.x : c.plotX + f.plotLeft + t(g.distance, 16),
                        y: a.pos + f.plotTop,
                        anchorX: c.plotX + f.plotLeft,
                        anchorY: c.isHeader ? a.pos + f.plotTop - 15 : c.plotY + f.plotTop
                    })
                })
            },
            updatePosition: function(a) {
                var d = this.chart,
                    e = this.getLabel(),
                    e = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a);
                this.move(Math.round(e.x), Math.round(e.y || 0),
                    a.plotX + d.plotLeft, a.plotY + d.plotTop)
            },
            getXDateFormat: function(a, e, g) {
                var k;
                e = e.dateTimeLabelFormats;
                var f = g && g.closestPointRange,
                    c, b = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    m, r = "millisecond";
                if (f) {
                    m = B("%m-%d %H:%M:%S.%L", a.x);
                    for (c in d) {
                        if (f === d.week && +B("%w", a.x) === g.options.startOfWeek && "00:00:00.000" === m.substr(6)) {
                            c = "week";
                            break
                        }
                        if (d[c] > f) {
                            c = r;
                            break
                        }
                        if (b[c] && m.substr(b[c]) !== "01-01 00:00:00.000".substr(b[c])) break;
                        "week" !== c && (r = c)
                    }
                    c && (k = e[c])
                } else k = e.day;
                return k || e.year
            },
            tooltipFooterHeaderFormatter: function(a,
                d) {
                var e = d ? "footer" : "header";
                d = a.series;
                var k = d.tooltipOptions,
                    f = k.xDateFormat,
                    c = d.xAxis,
                    b = c && "datetime" === c.options.type && g(a.key),
                    e = k[e + "Format"];
                b && !f && (f = this.getXDateFormat(a, k, c));
                b && f && (e = e.replace("{point.key}", "{point.key:" + f + "}"));
                return E(e, {
                    point: a,
                    series: d
                })
            },
            bodyFormatter: function(a) {
                return e(a, function(a) {
                    var d = a.series.tooltipOptions;
                    return (d.pointFormatter || a.point.tooltipFormatter).call(a.point, d.pointFormat)
                })
            }
        }
    })(K);
    (function(a) {
        var B = a.addEvent,
            F = a.attr,
            D = a.charts,
            E = a.color,
            g =
            a.css,
            e = a.defined,
            q = a.doc,
            t = a.each,
            h = a.extend,
            u = a.fireEvent,
            d = a.offset,
            m = a.pick,
            w = a.removeEvent,
            p = a.splat,
            k = a.Tooltip,
            f = a.win;
        a.Pointer = function(a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function(a, b) {
                this.options = b;
                this.chart = a;
                this.runChartClick = b.chart.events && !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                k && b.tooltip.enabled && (a.tooltip = new k(a, b.tooltip), this.followTouchMove = m(b.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function(a) {
                var b = this.chart,
                    c =
                    b.options.chart,
                    f = c.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (f = m(c.pinchType, f));
                this.zoomX = a = /x/.test(f);
                this.zoomY = f = /y/.test(f);
                this.zoomHor = a && !b || f && b;
                this.zoomVert = f && !b || a && b;
                this.hasZoom = a || f
            },
            normalize: function(a, b) {
                var c, r;
                a = a || f.event;
                a.target || (a.target = a.srcElement);
                r = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = d(this.chart.container));
                void 0 === r.pageX ? (c = Math.max(a.x, a.clientX - b.left), b = a.y) : (c = r.pageX - b.left, b = r.pageY - b.top);
                return h(a, {
                    chartX: Math.round(c),
                    chartY: Math.round(b)
                })
            },
            getCoordinates: function(a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                t(this.chart.axes, function(c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: c,
                        value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            runPointActions: function(c) {
                var b = this.chart,
                    f = b.series,
                    d = b.tooltip,
                    n = d ? d.shared : !1,
                    k = !0,
                    e = b.hoverPoint,
                    g = b.hoverSeries,
                    h, p, G, A = [],
                    u;
                if (!n && !g)
                    for (h = 0; h < f.length; h++)
                        if (f[h].directTouch || !f[h].options.stickyTracking) f = [];
                g && (n ? g.noSharedTooltip : g.directTouch) && e ? A = [e] : (n ||
                    !g || g.options.stickyTracking || (f = [g]), t(f, function(a) {
                        p = a.noSharedTooltip && n;
                        G = !n && a.directTouch;
                        a.visible && !p && !G && m(a.options.enableMouseTracking, !0) && (u = a.searchPoint(c, !p && 1 === a.kdDimensions)) && u.series && A.push(u)
                    }), A.sort(function(a, b) {
                        var c = a.distX - b.distX,
                            f = a.dist - b.dist,
                            d = b.series.group.zIndex - a.series.group.zIndex;
                        return 0 !== c && n ? c : 0 !== f ? f : 0 !== d ? d : a.series.index > b.series.index ? -1 : 1
                    }));
                if (n)
                    for (h = A.length; h--;)(A[h].x !== A[0].x || A[h].series.noSharedTooltip) && A.splice(h, 1);
                if (A[0] && (A[0] !==
                        this.prevKDPoint || d && d.isHidden)) {
                    if (n && !A[0].series.noSharedTooltip) {
                        for (h = 0; h < A.length; h++) A[h].onMouseOver(c, A[h] !== (g && g.directTouch && e || A[0]));
                        A.length && d && d.refresh(A.sort(function(a, b) {
                            return a.series.index - b.series.index
                        }), c)
                    } else if (d && d.refresh(A[0], c), !g || !g.directTouch) A[0].onMouseOver(c);
                    this.prevKDPoint = A[0];
                    k = !1
                }
                k && (f = g && g.tooltipOptions.followPointer, d && f && !d.isHidden && (f = d.getAnchor([{}], c), d.updatePosition({
                    plotX: f[0],
                    plotY: f[1]
                })));
                this.unDocMouseMove || (this.unDocMouseMove = B(q,
                    "mousemove",
                    function(b) {
                        if (D[a.hoverChartIndex]) D[a.hoverChartIndex].pointer.onDocumentMouseMove(b)
                    }));
                t(n ? A : [m(e, A[0])], function(a) {
                    t(b.axes, function(b) {
                        (!a || a.series && a.series[b.coll] === b) && b.drawCrosshair(c, a)
                    })
                })
            },
            reset: function(a, b) {
                var c = this.chart,
                    f = c.hoverSeries,
                    d = c.hoverPoint,
                    k = c.hoverPoints,
                    e = c.tooltip,
                    g = e && e.shared ? k : d;
                a && g && t(p(g), function(b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) e && g && (e.refresh(g), d && (d.setState(d.state, !0), t(c.axes, function(a) {
                    a.crosshair && a.drawCrosshair(null,
                        d)
                })));
                else {
                    if (d) d.onMouseOut();
                    k && t(k, function(a) {
                        a.setState()
                    });
                    if (f) f.onMouseOut();
                    e && e.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    t(c.axes, function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = this.prevKDPoint = c.hoverPoints = c.hoverPoint = null
                }
            },
            scaleGroups: function(a, b) {
                var c = this.chart,
                    f;
                t(c.series, function(d) {
                    f = a || d.getPlotBox();
                    d.xAxis && d.xAxis.zoomEnabled && d.group && (d.group.attr(f), d.markerGroup && (d.markerGroup.attr(f), d.markerGroup.clip(b ? c.clipRect : null)), d.dataLabelsGroup &&
                        d.dataLabelsGroup.attr(f))
                });
                c.clipRect.attr(b || c.clipBox)
            },
            dragStart: function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var b = this.chart,
                    c = b.options.chart,
                    f = a.chartX,
                    d = a.chartY,
                    e = this.zoomHor,
                    k = this.zoomVert,
                    g = b.plotLeft,
                    m = b.plotTop,
                    h = b.plotWidth,
                    G = b.plotHeight,
                    A, p = this.selectionMarker,
                    u = this.mouseDownX,
                    l = this.mouseDownY,
                    x = c.panKey && a[c.panKey + "Key"];
                p && p.touch || (f < g ? f = g : f > g + h && (f = g + h), d <
                    m ? d = m : d > m + G && (d = m + G), this.hasDragged = Math.sqrt(Math.pow(u - f, 2) + Math.pow(l - d, 2)), 10 < this.hasDragged && (A = b.isInsidePlot(u - g, l - m), b.hasCartesianSeries && (this.zoomX || this.zoomY) && A && !x && !p && (this.selectionMarker = p = b.renderer.rect(g, m, e ? 1 : h, k ? 1 : G, 0).attr({
                        fill: c.selectionMarkerFill || E("#335cad").setOpacity(.25).get(),
                        "class": "highcharts-selection-marker",
                        zIndex: 7
                    }).add()), p && e && (f -= u, p.attr({
                        width: Math.abs(f),
                        x: (0 < f ? 0 : f) + u
                    })), p && k && (f = d - l, p.attr({
                        height: Math.abs(f),
                        y: (0 < f ? 0 : f) + l
                    })), A && !p && c.panning && b.pan(a,
                        c.panning)))
            },
            drop: function(a) {
                var b = this,
                    c = this.chart,
                    f = this.hasPinched;
                if (this.selectionMarker) {
                    var d = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        k = this.selectionMarker,
                        m = k.attr ? k.attr("x") : k.x,
                        p = k.attr ? k.attr("y") : k.y,
                        w = k.attr ? k.attr("width") : k.width,
                        q = k.attr ? k.attr("height") : k.height,
                        G;
                    if (this.hasDragged || f) t(c.axes, function(c) {
                        if (c.zoomEnabled && e(c.min) && (f || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[c.coll]])) {
                            var n = c.horiz,
                                k = "touchend" === a.type ? c.minPixelPadding : 0,
                                l = c.toValue((n ? m : p) + k),
                                n = c.toValue((n ? m + w : p +
                                    q) - k);
                            d[c.coll].push({
                                axis: c,
                                min: Math.min(l, n),
                                max: Math.max(l, n)
                            });
                            G = !0
                        }
                    }), G && u(c, "selection", d, function(a) {
                        c.zoom(h(a, f ? {
                            animation: !1
                        } : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    f && this.scaleGroups()
                }
                c && (g(c.container, {
                    cursor: c._cursor
                }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                a = this.normalize(a);
                this.zoomOption(a);
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            },
            onDocumentMouseUp: function(c) {
                D[a.hoverChartIndex] &&
                    D[a.hoverChartIndex].pointer.drop(c)
            },
            onDocumentMouseMove: function(a) {
                var b = this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(c) {
                var b = D[a.hoverChartIndex];
                b && (c.relatedTarget || c.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(c) {
                var b = this.chart;
                e(a.hoverChartIndex) && D[a.hoverChartIndex] && D[a.hoverChartIndex].mouseIsDown ||
                    (a.hoverChartIndex = b.index);
                c = this.normalize(c);
                c.returnValue = !1;
                "mousedown" === b.mouseIsDown && this.drag(c);
                !this.inClass(c.target, "highcharts-tracker") && !b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop) || b.openMenu || this.runPointActions(c)
            },
            inClass: function(a, b) {
                for (var c; a;) {
                    if (c = F(a, "class")) {
                        if (-1 !== c.indexOf(b)) return !0;
                        if (-1 !== c.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                if (!(!b || !a ||
                        b.options.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function(a) {
                var b = this.chart,
                    c = b.hoverPoint,
                    f = b.plotLeft,
                    d = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (u(c.series, "click", h(a, {
                    point: c
                })), b.hoverPoint && c.firePointEvent("click", a)) : (h(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - f, a.chartY - d) && u(b, "click", a)))
            },
            setDOMEvents: function() {
                var c =
                    this,
                    b = c.chart.container;
                b.onmousedown = function(a) {
                    c.onContainerMouseDown(a)
                };
                b.onmousemove = function(a) {
                    c.onContainerMouseMove(a)
                };
                b.onclick = function(a) {
                    c.onContainerClick(a)
                };
                B(b, "mouseleave", c.onContainerMouseLeave);
                1 === a.chartCount && B(q, "mouseup", c.onDocumentMouseUp);
                a.hasTouch && (b.ontouchstart = function(a) {
                    c.onContainerTouchStart(a)
                }, b.ontouchmove = function(a) {
                    c.onContainerTouchMove(a)
                }, 1 === a.chartCount && B(q, "touchend", c.onDocumentTouchEnd))
            },
            destroy: function() {
                var c;
                w(this.chart.container, "mouseleave",
                    this.onContainerMouseLeave);
                a.chartCount || (w(q, "mouseup", this.onDocumentMouseUp), w(q, "touchend", this.onDocumentTouchEnd));
                clearInterval(this.tooltipTimeout);
                for (c in this) this[c] = null
            }
        }
    })(K);
    (function(a) {
        var B = a.charts,
            F = a.each,
            D = a.extend,
            E = a.map,
            g = a.noop,
            e = a.pick;
        D(a.Pointer.prototype, {
            pinchTranslate: function(a, e, g, u, d, m) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, e, g, u, d, m);
                this.zoomVert && this.pinchTranslateDirection(!1, a, e, g, u, d, m)
            },
            pinchTranslateDirection: function(a, e, g, u, d, m, w, p) {
                var k =
                    this.chart,
                    f = a ? "x" : "y",
                    c = a ? "X" : "Y",
                    b = "chart" + c,
                    h = a ? "width" : "height",
                    r = k["plot" + (a ? "Left" : "Top")],
                    n, v, q = p || 1,
                    t = k.inverted,
                    H = k.bounds[a ? "h" : "v"],
                    L = 1 === e.length,
                    G = e[0][b],
                    A = g[0][b],
                    N = !L && e[1][b],
                    M = !L && g[1][b],
                    l;
                g = function() {
                    !L && 20 < Math.abs(G - N) && (q = p || Math.abs(A - M) / Math.abs(G - N));
                    v = (r - A) / q + G;
                    n = k["plot" + (a ? "Width" : "Height")] / q
                };
                g();
                e = v;
                e < H.min ? (e = H.min, l = !0) : e + n > H.max && (e = H.max - n, l = !0);
                l ? (A -= .8 * (A - w[f][0]), L || (M -= .8 * (M - w[f][1])), g()) : w[f] = [A, M];
                t || (m[f] = v - r, m[h] = n);
                m = t ? 1 / q : q;
                d[h] = n;
                d[f] = e;
                u[t ? a ? "scaleY" :
                    "scaleX" : "scale" + c] = q;
                u["translate" + c] = m * r + (A - m * G)
            },
            pinch: function(a) {
                var q = this,
                    h = q.chart,
                    u = q.pinchDown,
                    d = a.touches,
                    m = d.length,
                    w = q.lastValidTouch,
                    p = q.hasZoom,
                    k = q.selectionMarker,
                    f = {},
                    c = 1 === m && (q.inClass(a.target, "highcharts-tracker") && h.runTrackerClick || q.runChartClick),
                    b = {};
                1 < m && (q.initiated = !0);
                p && q.initiated && !c && a.preventDefault();
                E(d, function(a) {
                    return q.normalize(a)
                });
                "touchstart" === a.type ? (F(d, function(a, b) {
                    u[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), w.x = [u[0].chartX, u[1] && u[1].chartX], w.y = [u[0].chartY,
                    u[1] && u[1].chartY
                ], F(h.axes, function(a) {
                    if (a.zoomEnabled) {
                        var b = h.bounds[a.horiz ? "h" : "v"],
                            c = a.minPixelPadding,
                            f = a.toPixels(e(a.options.min, a.dataMin)),
                            d = a.toPixels(e(a.options.max, a.dataMax)),
                            k = Math.max(f, d);
                        b.min = Math.min(a.pos, Math.min(f, d) - c);
                        b.max = Math.max(a.pos + a.len, k + c)
                    }
                }), q.res = !0) : q.followTouchMove && 1 === m ? this.runPointActions(q.normalize(a)) : u.length && (k || (q.selectionMarker = k = D({
                    destroy: g,
                    touch: !0
                }, h.plotBox)), q.pinchTranslate(u, d, f, k, b, w), q.hasPinched = p, q.scaleGroups(f, b), q.res && (q.res = !1, this.reset(!1, 0)))
            },
            touch: function(g, t) {
                var h = this.chart,
                    u, d;
                if (h.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = h.index;
                1 === g.touches.length ? (g = this.normalize(g), (d = h.isInsidePlot(g.chartX - h.plotLeft, g.chartY - h.plotTop)) && !h.openMenu ? (t && this.runPointActions(g), "touchmove" === g.type && (t = this.pinchDown, u = t[0] ? 4 <= Math.sqrt(Math.pow(t[0].chartX - g.chartX, 2) + Math.pow(t[0].chartY - g.chartY, 2)) : !1), e(u, !0) && this.pinch(g)) : t && this.reset()) : 2 === g.touches.length &&
                    this.pinch(g)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function(e) {
                B[a.hoverChartIndex] && B[a.hoverChartIndex].pointer.drop(e)
            }
        })
    })(K);
    (function(a) {
        var B = a.addEvent,
            F = a.charts,
            D = a.css,
            E = a.doc,
            g = a.extend,
            e = a.noop,
            q = a.Pointer,
            t = a.removeEvent,
            h = a.win,
            u = a.wrap;
        if (h.PointerEvent || h.MSPointerEvent) {
            var d = {},
                m = !!h.PointerEvent,
                w = function() {
                    var a, f = [];
                    f.item = function(a) {
                        return this[a]
                    };
                    for (a in d) d.hasOwnProperty(a) &&
                        f.push({
                            pageX: d[a].pageX,
                            pageY: d[a].pageY,
                            target: d[a].target
                        });
                    return f
                },
                p = function(d, f, c, b) {
                    "touch" !== d.pointerType && d.pointerType !== d.MSPOINTER_TYPE_TOUCH || !F[a.hoverChartIndex] || (b(d), b = F[a.hoverChartIndex].pointer, b[f]({
                        type: c,
                        target: d.currentTarget,
                        preventDefault: e,
                        touches: w()
                    }))
                };
            g(q.prototype, {
                onContainerPointerDown: function(a) {
                    p(a, "onContainerTouchStart", "touchstart", function(a) {
                        d[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(a) {
                    p(a, "onContainerTouchMove",
                        "touchmove",
                        function(a) {
                            d[a.pointerId] = {
                                pageX: a.pageX,
                                pageY: a.pageY
                            };
                            d[a.pointerId].target || (d[a.pointerId].target = a.currentTarget)
                        })
                },
                onDocumentPointerUp: function(a) {
                    p(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete d[a.pointerId]
                    })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, m ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, m ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(E, m ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            u(q.prototype,
                "init",
                function(a, f, c) {
                    a.call(this, f, c);
                    this.hasZoom && D(f.container, {
                        "-ms-touch-action": "none",
                        "touch-action": "none"
                    })
                });
            u(q.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(B)
            });
            u(q.prototype, "destroy", function(a) {
                this.batchMSEvents(t);
                a.call(this)
            })
        }
    })(K);
    (function(a) {
        var B, F = a.addEvent,
            D = a.css,
            E = a.discardElement,
            g = a.defined,
            e = a.each,
            q = a.extend,
            t = a.isFirefox,
            h = a.marginNames,
            u = a.merge,
            d = a.pick,
            m = a.setAnimation,
            w = a.stableSort,
            p = a.win,
            k = a.wrap;
        B = a.Legend = function(a, c) {
            this.init(a, c)
        };
        B.prototype = {
            init: function(a, c) {
                this.chart = a;
                this.setOptions(c);
                c.enabled && (this.render(), F(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function(a) {
                var c = d(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = u(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.initialItemX = this.padding = c;
                this.initialItemY = c - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = d(a.symbolWidth,
                    16);
                this.pages = []
            },
            update: function(a, c) {
                var b = this.chart;
                this.setOptions(u(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                d(c, !0) && b.redraw()
            },
            colorizeItem: function(a, c) {
                a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var b = this.options,
                    d = a.legendItem,
                    f = a.legendLine,
                    n = a.legendSymbol,
                    e = this.itemHiddenStyle.color,
                    b = c ? b.itemStyle.color : e,
                    g = c ? a.color || e : e,
                    k = a.options && a.options.marker,
                    m = {
                        fill: g
                    },
                    h;
                d && d.css({
                    fill: b,
                    color: b
                });
                f && f.attr({
                    stroke: g
                });
                if (n) {
                    if (k &&
                        n.isMarker && (m = a.pointAttribs(), !c))
                        for (h in m) m[h] = e;
                    n.attr(m)
                }
            },
            positionItem: function(a) {
                var c = this.options,
                    b = c.symbolPadding,
                    c = !c.rtl,
                    d = a._legendItemPos,
                    f = d[0],
                    d = d[1],
                    n = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(c ? f : this.legendWidth - f - 2 * b - 4, d);
                n && (n.x = f, n.y = d)
            },
            destroyItem: function(a) {
                var c = a.checkbox;
                e(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                c && E(a.checkbox)
            },
            destroy: function() {
                var a = this.group,
                    c = this.box;
                c && (this.box = c.destroy());
                e(this.getAllItems(), function(a) {
                    e(["legendItem", "legendGroup"], function(b) {
                        a[b] && (a[b] = a[b].destroy())
                    })
                });
                a && (this.group = a.destroy());
                this.display = null
            },
            positionCheckboxes: function(a) {
                var c = this.group && this.group.alignAttr,
                    b, d = this.clipHeight || this.legendHeight,
                    f = this.titleHeight;
                c && (b = c.translateY, e(this.allItems, function(n) {
                    var e = n.checkbox,
                        g;
                    e && (g = b + f + e.y + (a || 0) + 3, D(e, {
                        left: c.translateX + n.checkboxOffset + e.x - 20 + "px",
                        top: g + "px",
                        display: g > b - 6 && g < b + d - 6 ? "" : "none"
                    }))
                }))
            },
            renderTitle: function() {
                var a =
                    this.padding,
                    c = this.options.title,
                    b = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
                    zIndex: 1
                }).css(c.style).add(this.group)), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: b
                }));
                this.titleHeight = b
            },
            setText: function(d) {
                var c = this.options;
                d.legendItem.attr({
                    text: c.labelFormat ? a.format(c.labelFormat, d) : c.labelFormatter.call(d)
                })
            },
            renderItem: function(a) {
                var c = this.chart,
                    b = c.renderer,
                    f = this.options,
                    e = "horizontal" === f.layout,
                    n = this.symbolWidth,
                    g = f.symbolPadding,
                    k = this.itemStyle,
                    m = this.itemHiddenStyle,
                    h = this.padding,
                    p = e ? d(f.itemDistance, 20) : 0,
                    G = !f.rtl,
                    A = f.width,
                    w = f.itemMarginBottom || 0,
                    q = this.itemMarginTop,
                    l = this.initialItemX,
                    x = a.legendItem,
                    t = !a.series,
                    O = !t && a.series.drawLegendSymbol ? a.series : a,
                    y = O.options,
                    y = this.createCheckboxForItem && y && y.showCheckbox,
                    z = f.useHTML;
                x || (a.legendGroup = b.g("legend-item").addClass("highcharts-" + O.type + "-series highcharts-color-" + a.colorIndex + (a.options.className ?
                    " " + a.options.className : "") + (t ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = x = b.text("", G ? n + g : -g, this.baseline || 0, z).css(u(a.visible ? k : m)).attr({
                    align: G ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (k = k.fontSize, this.fontMetrics = b.fontMetrics(k, x), this.baseline = this.fontMetrics.f + 3 + q, x.attr("y", this.baseline)), O.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, x, z), y && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                this.setText(a);
                b = x.getBBox();
                n = a.checkboxOffset = f.itemWidth || a.legendItemWidth || n + g + b.width + p + (y ? 20 : 0);
                this.itemHeight = g = Math.round(a.legendItemHeight || b.height);
                e && this.itemX - l + n > (A || c.chartWidth - 2 * h - l - f.x) && (this.itemX = l, this.itemY += q + this.lastLineHeight + w, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, n);
                this.lastItemY = q + this.itemY + w;
                this.lastLineHeight = Math.max(g, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                e ? this.itemX += n : (this.itemY += q + g + w, this.lastLineHeight =
                    g);
                this.offsetWidth = A || Math.max((e ? this.itemX - l - p : n) + h, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                e(this.chart.series, function(c) {
                    var b = c && c.options;
                    c && d(b.showInLegend, g(b.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === b.legendType ? c.data : c)))
                });
                return a
            },
            adjustMargins: function(a, c) {
                var b = this.chart,
                    f = this.options,
                    k = f.align.charAt(0) + f.verticalAlign.charAt(0) + f.layout.charAt(0);
                f.floating || e([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(n, e) {
                    n.test(k) &&
                        !g(a[e]) && (b[h[e]] = Math.max(b[h[e]], b.legend[(e + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][e] * f[e % 2 ? "x" : "y"] + d(f.margin, 12) + c[e]))
                })
            },
            render: function() {
                var a = this,
                    c = a.chart,
                    b = c.renderer,
                    d = a.group,
                    g, n, k, m, h = a.box,
                    p = a.options,
                    u = a.padding;
                a.itemX = a.initialItemX;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                d || (a.group = d = b.g("legend").attr({
                    zIndex: 7
                }).add(), a.contentGroup = b.g().attr({
                    zIndex: 1
                }).add(d), a.scrollGroup = b.g().add(a.contentGroup));
                a.renderTitle();
                g = a.getAllItems();
                w(g, function(a,
                    b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                p.reversed && g.reverse();
                a.allItems = g;
                a.display = n = !!g.length;
                a.lastLineHeight = 0;
                e(g, function(b) {
                    a.renderItem(b)
                });
                k = (p.width || a.offsetWidth) + u;
                m = a.lastItemY + a.lastLineHeight + a.titleHeight;
                m = a.handleOverflow(m);
                m += u;
                h || (a.box = h = b.rect().addClass("highcharts-legend-box").attr({
                    r: p.borderRadius
                }).add(d), h.isNew = !0);
                h.attr({
                    stroke: p.borderColor,
                    "stroke-width": p.borderWidth || 0,
                    fill: p.backgroundColor || "none"
                }).shadow(p.shadow);
                0 < k && 0 < m && (h[h.isNew ? "attr" : "animate"](h.crisp({
                    x: 0,
                    y: 0,
                    width: k,
                    height: m
                }, h.strokeWidth())), h.isNew = !1);
                h[n ? "show" : "hide"]();
                a.legendWidth = k;
                a.legendHeight = m;
                e(g, function(b) {
                    a.positionItem(b)
                });
                n && d.align(q({
                    width: k,
                    height: m
                }, p), !0, "spacingBox");
                c.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function(a) {
                var c = this,
                    b = this.chart,
                    f = b.renderer,
                    g = this.options,
                    n = g.y,
                    b = b.spacingBox.height + ("top" === g.verticalAlign ? -n : n) - this.padding,
                    n = g.maxHeight,
                    k, m = this.clipRect,
                    h = g.navigation,
                    p = d(h.animation, !0),
                    u = h.arrowSize || 12,
                    G = this.nav,
                    A = this.pages,
                    w = this.padding,
                    q, l = this.allItems,
                    x = function(a) {
                        a ? m.attr({
                            height: a
                        }) : m && (c.clipRect = m.destroy(), c.contentGroup.clip());
                        c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + w + "px,9999px," + (w + a) + "px,0)" : "auto")
                    };
                "horizontal" !== g.layout || "middle" === g.verticalAlign || g.floating || (b /= 2);
                n && (b = Math.min(b, n));
                A.length = 0;
                a > b && !1 !== h.enabled ? (this.clipHeight = k = Math.max(b - 20 - this.titleHeight - w, 0), this.currentPage = d(this.currentPage, 1), this.fullHeight = a, e(l,
                    function(a, b) {
                        var c = a._legendItemPos[1];
                        a = Math.round(a.legendItem.getBBox().height);
                        var d = A.length;
                        if (!d || c - A[d - 1] > k && (q || c) !== A[d - 1]) A.push(q || c), d++;
                        b === l.length - 1 && c + a - A[d - 1] > k && A.push(c);
                        c !== q && (q = c)
                    }), m || (m = c.clipRect = f.clipRect(0, w, 9999, 0), c.contentGroup.clip(m)), x(k), G || (this.nav = G = f.g().attr({
                        zIndex: 1
                    }).add(this.group), this.up = f.symbol("triangle", 0, 0, u, u).on("click", function() {
                        c.scroll(-1, p)
                    }).add(G), this.pager = f.text("", 15, 10).addClass("highcharts-legend-navigation").css(h.style).add(G),
                    this.down = f.symbol("triangle-down", 0, 0, u, u).on("click", function() {
                        c.scroll(1, p)
                    }).add(G)), c.scroll(0), a = b) : G && (x(), G.hide(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, c) {
                var b = this.pages,
                    d = b.length;
                a = this.currentPage + a;
                var f = this.clipHeight,
                    e = this.options.navigation,
                    g = this.pager,
                    k = this.padding;
                a > d && (a = d);
                0 < a && (void 0 !== c && m(c, this.chart), this.nav.attr({
                        translateX: k,
                        translateY: f + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({
                        "class": 1 ===
                            a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), g.attr({
                        text: a + "/" + d
                    }), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": a === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), this.up.attr({
                        fill: 1 === a ? e.inactiveColor : e.activeColor
                    }).css({
                        cursor: 1 === a ? "default" : "pointer"
                    }), this.down.attr({
                        fill: a === d ? e.inactiveColor : e.activeColor
                    }).css({
                        cursor: a === d ? "default" : "pointer"
                    }), c = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: c
                    }), this.currentPage =
                    a, this.positionCheckboxes(c))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, c) {
                var b = a.options,
                    f = b.symbolHeight || a.fontMetrics.f,
                    b = b.squareSymbol;
                c.legendSymbol = this.chart.renderer.rect(b ? (a.symbolWidth - f) / 2 : 0, a.baseline - f + 1, b ? f : a.symbolWidth, f, d(a.options.symbolRadius, f / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(c.legendGroup)
            },
            drawLineMarker: function(a) {
                var c = this.options,
                    b = c.marker,
                    d = a.symbolWidth,
                    f = this.chart.renderer,
                    e = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var g;
                g = {
                    "stroke-width": c.lineWidth || 0
                };
                c.dashStyle && (g.dashstyle = c.dashStyle);
                this.legendLine = f.path(["M", 0, a, "L", d, a]).addClass("highcharts-graph").attr(g).add(e);
                b && !1 !== b.enabled && (c = 0 === this.symbol.indexOf("url") ? 0 : b.radius, this.legendSymbol = b = f.symbol(this.symbol, d / 2 - c, a - c, 2 * c, 2 * c, b).addClass("highcharts-point").add(e), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(p.navigator.userAgent) || t) && k(B.prototype, "positionItem", function(a, c) {
            var b = this,
                d = function() {
                    c._legendItemPos && a.call(b, c)
                };
            d();
            setTimeout(d)
        })
    })(K);
    (function(a) {
        var B = a.addEvent,
            F = a.animate,
            D = a.animObject,
            E = a.attr,
            g = a.doc,
            e = a.Axis,
            q = a.createElement,
            t = a.defaultOptions,
            h = a.discardElement,
            u = a.charts,
            d = a.css,
            m = a.defined,
            w = a.each,
            p = a.error,
            k = a.extend,
            f = a.fireEvent,
            c = a.getStyle,
            b = a.grep,
            C = a.isNumber,
            r = a.isObject,
            n = a.isString,
            v = a.Legend,
            I = a.marginNames,
            J = a.merge,
            H = a.Pointer,
            L = a.pick,
            G = a.pInt,
            A = a.removeEvent,
            N = a.seriesTypes,
            M = a.splat,
            l = a.svg,
            x = a.syncTimeout,
            P = a.win,
            O = a.Renderer,
            y = a.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function(a,
            b, c) {
            return new y(a, b, c)
        };
        y.prototype = {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (n(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(b, c) {
                var d, f = b.series;
                b.series = null;
                d = J(t, b);
                d.series = b.series = f;
                this.userOptions = b;
                this.respRules = [];
                b = d.chart;
                f = b.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                    h: {},
                    v: {}
                };
                this.callback = c;
                this.isResizing = 0;
                this.options = d;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var l;
                this.index = u.length;
                u.push(this);
                a.chartCount++;
                if (f)
                    for (l in f) B(this, l, f[l]);
                this.xAxis = [];
                this.yAxis = [];
                this.pointCount = this.colorCounter = this.symbolCounter = 0;
                this.firstRender()
            },
            initSeries: function(a) {
                var b = this.options.chart;
                (b = N[a.type || b.type || b.defaultSeriesType]) || p(17, !0);
                b = new b;
                b.init(this, a);
                return b
            },
            isInsidePlot: function(a, b, c) {
                var d = c ? b : a;
                a = c ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(b) {
                var c = this.axes,
                    d = this.series,
                    l = this.pointer,
                    e = this.legend,
                    g = this.isDirtyLegend,
                    n, m, r = this.hasCartesianSeries,
                    h = this.isDirtyBox,
                    A = d.length,
                    v = A,
                    p = this.renderer,
                    z = p.isHidden(),
                    G = [];
                a.setAnimation(b, this);
                z && this.cloneRenderTo();
                for (this.layOutTitles(); v--;)
                    if (b = d[v], b.options.stacking && (n = !0, b.isDirty)) {
                        m = !0;
                        break
                    }
                if (m)
                    for (v = A; v--;) b = d[v], b.options.stacking && (b.isDirty = !0);
                w(d, function(a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), g = !0);
                    a.isDirtyData && f(a, "updatedData")
                });
                g && e.options.enabled && (e.render(), this.isDirtyLegend = !1);
                n && this.getStacks();
                r && w(c, function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                r && (w(c, function(a) {
                    a.isDirty && (h = !0)
                }), w(c, function(a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, G.push(function() {
                        f(a, "afterSetExtremes", k(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (h || n) && a.redraw()
                }));
                h && this.drawChartBox();
                w(d, function(a) {
                    (h || a.isDirty) && a.visible && a.redraw()
                });
                l && l.reset(!0);
                p.draw();
                f(this, "redraw");
                z && this.cloneRenderTo(!0);
                w(G, function(a) {
                    a.call()
                })
            },
            get: function(a) {
                var b = this.axes,
                    c = this.series,
                    d, f;
                for (d = 0; d < b.length; d++)
                    if (b[d].options.id === a) return b[d];
                for (d = 0; d < c.length; d++)
                    if (c[d].options.id === a) return c[d];
                for (d = 0; d < c.length; d++)
                    for (f = c[d].points || [], b = 0; b < f.length; b++)
                        if (f[b].id === a) return f[b];
                return null
            },
            getAxes: function() {
                var a = this,
                    b = this.options,
                    c = b.xAxis = M(b.xAxis || {}),
                    b = b.yAxis = M(b.yAxis || {});
                w(c, function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                w(b, function(a, b) {
                    a.index = b
                });
                c = c.concat(b);
                w(c, function(b) {
                    new e(a, b)
                })
            },
            getSelectedPoints: function() {
                var a = [];
                w(this.series, function(c) {
                    a = a.concat(b(c.points || [], function(a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function() {
                return b(this.series, function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, b, c) {
                var d = this,
                    f = d.options,
                    l;
                l = f.title = J({
                    style: {
                        color: "#333333",
                        fontSize: f.isStock ? "16px" : "18px"
                    }
                }, f.title, a);
                f = f.subtitle = J({
                    style: {
                        color: "#666666"
                    }
                }, f.subtitle, b);
                w([
                    ["title", a, l],
                    ["subtitle", b, f]
                ], function(a, b) {
                    var c = a[0],
                        f = d[c],
                        l = a[1];
                    a = a[2];
                    f && l && (d[c] = f = f.destroy());
                    a && a.text && !f && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), d[c].update = function(a) {
                        d.setTitle(!b && a, b && a)
                    }, d[c].css(a.style))
                });
                d.layOutTitles(c)
            },
            layOutTitles: function(a) {
                var b = 0,
                    c, d = this.renderer,
                    f = this.spacingBox;
                w(["title", "subtitle"], function(a) {
                    var c = this[a],
                        l = this.options[a],
                        e;
                    c && (e = l.style.fontSize, e = d.fontMetrics(e, c).b, c.css({
                        width: (l.width || f.width + l.widthAdjust) + "px"
                    }).align(k({
                        y: b + e + ("title" === a ? -3 : 2)
                    }, l), !1, "spacingBox"), l.floating || l.verticalAlign || (b = Math.ceil(b + c.getBBox().height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && L(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var a = this.options.chart,
                    b = a.width,
                    a = a.height,
                    d = this.renderToClone || this.renderTo;
                m(b) || (this.containerWidth = c(d, "width"));
                m(a) || (this.containerHeight = c(d, "height"));
                this.chartWidth = Math.max(0, b || this.containerWidth || 600);
                this.chartHeight = Math.max(0, L(a, 19 < this.containerHeight ? this.containerHeight : 400))
            },
            cloneRenderTo: function(a) {
                var b =
                    this.renderToClone,
                    c = this.container;
                if (a) {
                    if (b) {
                        for (; b.childNodes.length;) this.renderTo.appendChild(b.firstChild);
                        h(b);
                        delete this.renderToClone
                    }
                } else c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), d(b, {
                    position: "absolute",
                    top: "-9999px",
                    display: "block"
                }), b.style.setProperty && b.style.setProperty("display", "block", "important"), g.body.appendChild(b), c && b.appendChild(c)
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " +
                    (a || "")
            },
            getContainer: function() {
                var b, c = this.options,
                    d = c.chart,
                    f, l;
                b = this.renderTo;
                var e = a.uniqueKey(),
                    m;
                b || (this.renderTo = b = d.renderTo);
                n(b) && (this.renderTo = b = g.getElementById(b));
                b || p(13, !0);
                f = G(E(b, "data-highcharts-chart"));
                C(f) && u[f] && u[f].hasRendered && u[f].destroy();
                E(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                d.skipClone || b.offsetWidth || this.cloneRenderTo();
                this.getChartSize();
                f = this.chartWidth;
                l = this.chartHeight;
                m = k({
                    position: "relative",
                    overflow: "hidden",
                    width: f + "px",
                    height: l + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, d.style);
                this.container = b = q("div", {
                    id: e
                }, m, this.renderToClone || b);
                this._cursor = b.style.cursor;
                this.renderer = new(a[d.renderer] || O)(b, f, l, null, d.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(d.className);
                this.renderer.setStyle(d.style);
                this.renderer.chartIndex = this.index
            },
            getMargins: function(a) {
                var b = this.spacing,
                    c = this.margin,
                    d = this.titleOffset;
                this.resetMargins();
                d && !m(c[0]) && (this.plotTop =
                    Math.max(this.plotTop, d + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(c, b);
                this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    c = a.margin;
                a.hasCartesianSeries && w(a.axes, function(a) {
                    a.visible && a.getOffset()
                });
                w(I, function(d, f) {
                    m(c[f]) || (a[d] += b[f])
                });
                a.setChartSize()
            },
            reflow: function(a) {
                var b = this,
                    d = b.options.chart,
                    f = b.renderTo,
                    l = m(d.width),
                    e = d.width || c(f, "width"),
                    d = d.height || c(f, "height"),
                    f = a ? a.target : P;
                if (!l && !b.isPrinting && e && d && (f === P || f === g)) {
                    if (e !== b.containerWidth || d !== b.containerHeight) clearTimeout(b.reflowTimeout), b.reflowTimeout = x(function() {
                        b.container && b.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    b.containerWidth = e;
                    b.containerHeight = d
                }
            },
            initReflow: function() {
                var a = this,
                    b;
                b = B(P, "resize", function(b) {
                    a.reflow(b)
                });
                B(a, "destroy", b)
            },
            setSize: function(b, c, l) {
                var e = this,
                    g = e.renderer;
                e.isResizing += 1;
                a.setAnimation(l,
                    e);
                e.oldChartHeight = e.chartHeight;
                e.oldChartWidth = e.chartWidth;
                void 0 !== b && (e.options.chart.width = b);
                void 0 !== c && (e.options.chart.height = c);
                e.getChartSize();
                b = g.globalAnimation;
                (b ? F : d)(e.container, {
                    width: e.chartWidth + "px",
                    height: e.chartHeight + "px"
                }, b);
                e.setChartSize(!0);
                g.setSize(e.chartWidth, e.chartHeight, l);
                w(e.axes, function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                e.isDirtyLegend = !0;
                e.isDirtyBox = !0;
                e.layOutTitles();
                e.getMargins();
                e.setResponsive && e.setResponsive(!1);
                e.redraw(l);
                e.oldChartHeight = null;
                f(e,
                    "resize");
                x(function() {
                    e && f(e, "endResize", null, function() {
                        --e.isResizing
                    })
                }, D(b).duration)
            },
            setChartSize: function(a) {
                var b = this.inverted,
                    c = this.renderer,
                    d = this.chartWidth,
                    f = this.chartHeight,
                    l = this.options.chart,
                    e = this.spacing,
                    g = this.clipOffset,
                    n, k, m, r;
                this.plotLeft = n = Math.round(this.plotLeft);
                this.plotTop = k = Math.round(this.plotTop);
                this.plotWidth = m = Math.max(0, Math.round(d - n - this.marginRight));
                this.plotHeight = r = Math.max(0, Math.round(f - k - this.marginBottom));
                this.plotSizeX = b ? r : m;
                this.plotSizeY = b ? m : r;
                this.plotBorderWidth = l.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: e[3],
                    y: e[0],
                    width: d - e[3] - e[1],
                    height: f - e[0] - e[2]
                };
                this.plotBox = c.plotBox = {
                    x: n,
                    y: k,
                    width: m,
                    height: r
                };
                d = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(d, g[3]) / 2);
                c = Math.ceil(Math.max(d, g[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(d, g[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, g[2]) / 2 - c))
                };
                a || w(this.axes, function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            },
            resetMargins: function() {
                var a =
                    this,
                    b = a.options.chart;
                w(["margin", "spacing"], function(c) {
                    var d = b[c],
                        f = r(d) ? d : [d, d, d, d];
                    w(["Top", "Right", "Bottom", "Left"], function(d, l) {
                        a[c][l] = L(b[c + d], f[l])
                    })
                });
                w(I, function(b, c) {
                    a[b] = L(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    d = this.chartHeight,
                    f = this.chartBackground,
                    l = this.plotBackground,
                    e = this.plotBorder,
                    g, n = this.plotBGImage,
                    k = a.backgroundColor,
                    m = a.plotBackgroundColor,
                    r = a.plotBackgroundImage,
                    h, A = this.plotLeft,
                    v = this.plotTop,
                    p = this.plotWidth,
                    G = this.plotHeight,
                    u = this.plotBox,
                    w = this.clipRect,
                    x = this.clipBox,
                    q = "animate";
                f || (this.chartBackground = f = b.rect().addClass("highcharts-background").add(), q = "attr");
                g = a.borderWidth || 0;
                h = g + (a.shadow ? 8 : 0);
                k = {
                    fill: k || "none"
                };
                if (g || f["stroke-width"]) k.stroke = a.borderColor, k["stroke-width"] = g;
                f.attr(k).shadow(a.shadow);
                f[q]({
                    x: h / 2,
                    y: h / 2,
                    width: c - h - g % 2,
                    height: d - h - g % 2,
                    r: a.borderRadius
                });
                q = "animate";
                l || (q = "attr", this.plotBackground = l = b.rect().addClass("highcharts-plot-background").add());
                l[q](u);
                l.attr({
                    fill: m || "none"
                }).shadow(a.plotShadow);
                r && (n ? n.animate(u) : this.plotBGImage = b.image(r, A, v, p, G).add());
                w ? w.animate({
                    width: x.width,
                    height: x.height
                }) : this.clipRect = b.clipRect(x);
                q = "animate";
                e || (q = "attr", this.plotBorder = e = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                e.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                e[q](e.crisp({
                    x: A,
                    y: v,
                    width: p,
                    height: G
                }, -e.strokeWidth()));
                this.isDirtyBox = !1
            },
            propFromSeries: function() {
                var a = this,
                    b =
                    a.options.chart,
                    c, d = a.options.series,
                    f, l;
                w(["inverted", "angular", "polar"], function(e) {
                    c = N[b.type || b.defaultSeriesType];
                    l = b[e] || c && c.prototype[e];
                    for (f = d && d.length; !l && f--;)(c = N[d[f].type]) && c.prototype[e] && (l = !0);
                    a[e] = l
                })
            },
            linkSeries: function() {
                var a = this,
                    b = a.series;
                w(b, function(a) {
                    a.linkedSeries.length = 0
                });
                w(b, function(b) {
                    var c = b.options.linkedTo;
                    n(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = L(b.options.visible, c.options.visible,
                        b.visible))
                })
            },
            renderSeries: function() {
                w(this.series, function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    b = a.options.labels;
                b.items && w(b.items, function(c) {
                    var d = k(b.style, c.style),
                        f = G(d.left) + a.plotLeft,
                        l = G(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(c.html, f, l).attr({
                        zIndex: 2
                    }).css(d).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    d, f, l;
                this.setTitle();
                this.legend = new v(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                d = this.plotHeight -= 21;
                w(a, function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                f = 1.1 < c / this.plotWidth;
                l = 1.05 < d / this.plotHeight;
                if (f || l) w(a, function(a) {
                    (a.horiz && f || !a.horiz && l) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && w(a, function(a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var b = this;
                a = J(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                    a.href && (P.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function(a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function() {
                var b = this,
                    c = b.axes,
                    d = b.series,
                    l = b.container,
                    e, g = l && l.parentNode;
                f(b, "destroy");
                u[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                A(b);
                for (e = c.length; e--;) c[e] = c[e].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (e = d.length; e--;) d[e] = d[e].destroy();
                w("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                l && (l.innerHTML = "", A(l),
                    g && h(l));
                for (e in b) delete b[e]
            },
            isReadyToRender: function() {
                var a = this;
                return l || P != P.top || "complete" === g.readyState ? !0 : (g.attachEvent("onreadystatechange", function() {
                    g.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === g.readyState && a.firstRender()
                }), !1)
            },
            firstRender: function() {
                var a = this,
                    b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    f(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    w(b.series || [], function(b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    f(a, "beforeRender");
                    H && (a.pointer = new H(a, b));
                    a.render();
                    a.renderer.draw();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.cloneRenderTo(!0)
                }
            },
            onload: function() {
                w([this.callback].concat(this.callbacks), function(a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                f(this, "load");
                !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        }
    })(K);
    (function(a) {
        var B, F = a.each,
            D = a.extend,
            E = a.erase,
            g = a.fireEvent,
            e = a.format,
            q = a.isArray,
            t = a.isNumber,
            h = a.pick,
            u = a.removeEvent;
        B = a.Point = function() {};
        B.prototype = {
            init: function(a,
                e, g) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(e, g);
                a.options.colorByPoint ? (e = a.options.colors || a.chart.options.colors, this.color = this.color || e[a.colorCounter], e = e.length, g = a.colorCounter, a.colorCounter++, a.colorCounter === e && (a.colorCounter = 0)) : g = a.colorIndex;
                this.colorIndex = h(this.colorIndex, g);
                a.chart.pointCount++;
                return this
            },
            applyOptions: function(a, e) {
                var d = this.series,
                    g = d.options.pointValKey || d.pointValKey;
                a = B.prototype.optionsToObject.call(this, a);
                D(this, a);
                this.options = this.options ?
                    D(this.options, a) : a;
                a.group && delete this.group;
                g && (this.y = this[g]);
                this.isNull = h(this.isValid && !this.isValid(), null === this.x || !t(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === e && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
                void 0 === this.x && d && (this.x = void 0 === e ? d.autoIncrement(this) : e);
                return this
            },
            optionsToObject: function(a) {
                var d = {},
                    e = this.series,
                    g = e.options.keys,
                    k = g || e.pointArrayMap || ["y"],
                    f = k.length,
                    c = 0,
                    b = 0;
                if (t(a) || null === a) d[k[0]] = a;
                else if (q(a))
                    for (!g &&
                        a.length > f && (e = typeof a[0], "string" === e ? d.name = a[0] : "number" === e && (d.x = a[0]), c++); b < f;) g && void 0 === a[c] || (d[k[b]] = a[c]), c++, b++;
                else "object" === typeof a && (d = a, a.dataLabels && (e._hasPointLabels = !0), a.marker && (e._hasPointMarkers = !0));
                return d
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ?
                    " " + this.options.className : "")
            },
            getZone: function() {
                var a = this.series,
                    e = a.zones,
                    a = a.zoneAxis || "y",
                    g = 0,
                    h;
                for (h = e[g]; this[a] >= h.value;) h = e[++g];
                h && h.color && !this.options.color && (this.color = h.color);
                return h
            },
            destroy: function() {
                var a = this.series.chart,
                    e = a.hoverPoints,
                    g;
                a.pointCount--;
                e && (this.setState(), E(e, this), e.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) u(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (g in this) this[g] =
                    null
            },
            destroyElements: function() {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], e, g = 6; g--;) e = a[g], this[e] && (this[e] = this[e].destroy())
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var d = this.series,
                    g = d.tooltipOptions,
                    p = h(g.valueDecimals, ""),
                    k = g.valuePrefix || "",
                    f = g.valueSuffix || "";
                F(d.pointArrayMap || ["y"], function(c) {
                    c = "{point." + c;
                    if (k || f) a = a.replace(c + "}", k + c + "}" + f);
                    a = a.replace(c + "}", c + ":,." + p + "f}")
                });
                return e(a, {
                    point: this,
                    series: this.series
                })
            },
            firePointEvent: function(a, e, h) {
                var d = this,
                    k = this.series.options;
                (k.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();
                "click" === a && k.allowPointSelect && (h = function(a) {
                    d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                g(this, a, e, h)
            },
            visible: !0
        }
    })(K);
    (function(a) {
        var B = a.addEvent,
            F = a.animObject,
            D = a.arrayMax,
            E = a.arrayMin,
            g = a.correctFloat,
            e = a.Date,
            q = a.defaultOptions,
            t = a.defaultPlotOptions,
            h = a.defined,
            u = a.each,
            d = a.erase,
            m = a.error,
            w = a.extend,
            p = a.fireEvent,
            k = a.grep,
            f = a.isArray,
            c = a.isNumber,
            b = a.isString,
            C = a.merge,
            r = a.pick,
            n = a.removeEvent,
            v = a.splat,
            I = a.stableSort,
            J = a.SVGElement,
            H = a.syncTimeout,
            L = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                radius: 4,
                states: {
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                hover: {
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function(a, b) {
                var c = this,
                    d, f, e = a.series,
                    g, n = function(a, b) {
                        return r(a.options.index, a._i) - r(b.options.index, b._i)
                    };
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                w(c, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                f = b.events;
                for (d in f) B(c, d, f[d]);
                if (f && f.click || b.point && b.point.events && b.point.events.click ||
                    b.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                u(c.parallelArrays, function(a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                e.length && (g = e[e.length - 1]);
                c._i = r(g && g._i, -1) + 1;
                e.push(c);
                I(e, n);
                this.yAxis && I(this.yAxis.series, n);
                u(e, function(a, b) {
                    a.index = b;
                    a.name = a.name || "Series " + (b + 1)
                })
            },
            bindAxes: function() {
                var a = this,
                    b = a.options,
                    c = a.chart,
                    d;
                u(a.axisTypes || [], function(f) {
                    u(c[f], function(c) {
                        d = c.options;
                        if (b[f] === d.index || void 0 !== b[f] && b[f] === d.id ||
                            void 0 === b[f] && 0 === d.index) c.series.push(a), a[f] = c, c.isDirty = !0
                    });
                    a[f] || a.optionalAxis === f || m(18, !0)
                })
            },
            updateParallelArrays: function(a, b) {
                var d = a.series,
                    f = arguments,
                    e = c(b) ? function(c) {
                        var f = "y" === c && d.toYData ? d.toYData(a) : a[c];
                        d[c + "Data"][b] = f
                    } : function(a) {
                        Array.prototype[b].apply(d[a + "Data"], Array.prototype.slice.call(f, 2))
                    };
                u(d.parallelArrays, e)
            },
            autoIncrement: function() {
                var a = this.options,
                    b = this.xIncrement,
                    c, d = a.pointIntervalUnit,
                    b = r(b, a.pointStart, 0);
                this.pointInterval = c = r(this.pointInterval,
                    a.pointInterval, 1);
                d && (a = new e(b), "day" === d ? a = +a[e.hcSetDate](a[e.hcGetDate]() + c) : "month" === d ? a = +a[e.hcSetMonth](a[e.hcGetMonth]() + c) : "year" === d && (a = +a[e.hcSetFullYear](a[e.hcGetFullYear]() + c)), c = a - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function(a) {
                var b = this.chart,
                    c = b.options.plotOptions,
                    b = b.userOptions || {},
                    d = b.plotOptions || {},
                    f = c[this.type];
                this.userOptions = a;
                c = C(f, c.series, a);
                this.tooltipOptions = C(q.tooltip, q.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] &&
                    d[this.type].tooltip, a.tooltip);
                null === f.marker && delete c.marker;
                this.zoneAxis = c.zoneAxis;
                a = this.zones = (c.zones || []).slice();
                !c.negativeColor && !c.negativeFillColor || c.zones || a.push({
                    value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
                    className: "highcharts-negative",
                    color: c.negativeColor,
                    fillColor: c.negativeFillColor
                });
                a.length && h(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                return c
            },
            getCyclic: function(a, b, c) {
                var d, f = this.userOptions,
                    e = a + "Index",
                    g = a + "Counter",
                    n = c ? c.length :
                    r(this.chart.options.chart[a + "Count"], this.chart[a + "Count"]);
                b || (d = r(f[e], f["_" + e]), h(d) || (f["_" + e] = d = this.chart[g] % n, this.chart[g] += 1), c && (b = c[d]));
                void 0 !== d && (this[e] = d);
                this[a] = b
            },
            getColor: function() {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || t[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function(a,
                d, e, g) {
                var l = this,
                    n = l.points,
                    k = n && n.length || 0,
                    h, v = l.options,
                    A = l.chart,
                    p = null,
                    q = l.xAxis,
                    G = v.turboThreshold,
                    w = this.xData,
                    t = this.yData,
                    H = (h = l.pointArrayMap) && h.length;
                a = a || [];
                h = a.length;
                d = r(d, !0);
                if (!1 !== g && h && k === h && !l.cropped && !l.hasGroupedData && l.visible) u(a, function(a, b) {
                    n[b].update && a !== v.data[b] && n[b].update(a, !1, null, !1)
                });
                else {
                    l.xIncrement = null;
                    l.colorCounter = 0;
                    u(this.parallelArrays, function(a) {
                        l[a + "Data"].length = 0
                    });
                    if (G && h > G) {
                        for (e = 0; null === p && e < h;) p = a[e], e++;
                        if (c(p))
                            for (e = 0; e < h; e++) w[e] = this.autoIncrement(),
                                t[e] = a[e];
                        else if (f(p))
                            if (H)
                                for (e = 0; e < h; e++) p = a[e], w[e] = p[0], t[e] = p.slice(1, H + 1);
                            else
                                for (e = 0; e < h; e++) p = a[e], w[e] = p[0], t[e] = p[1];
                        else m(12)
                    } else
                        for (e = 0; e < h; e++) void 0 !== a[e] && (p = {
                            series: l
                        }, l.pointClass.prototype.applyOptions.apply(p, [a[e]]), l.updateParallelArrays(p, e));
                    b(t[0]) && m(14, !0);
                    l.data = [];
                    l.options.data = l.userOptions.data = a;
                    for (e = k; e--;) n[e] && n[e].destroy && n[e].destroy();
                    q && (q.minRange = q.userMinRange);
                    l.isDirty = A.isDirtyBox = !0;
                    l.isDirtyData = !!n;
                    e = !1
                }
                "point" === v.legendType && (this.processData(),
                    this.generatePoints());
                d && A.redraw(e)
            },
            processData: function(a) {
                var b = this.xData,
                    c = this.yData,
                    d = b.length,
                    f;
                f = 0;
                var e, g, n = this.xAxis,
                    k, r = this.options;
                k = r.cropThreshold;
                var h = this.getExtremesFromAll || r.getExtremesFromAll,
                    v = this.isCartesian,
                    r = n && n.val2lin,
                    p = n && n.isLog,
                    u, q;
                if (v && !this.isDirty && !n.isDirty && !this.yAxis.isDirty && !a) return !1;
                n && (a = n.getExtremes(), u = a.min, q = a.max);
                if (v && this.sorted && !h && (!k || d > k || this.forceCrop))
                    if (b[d - 1] < u || b[0] > q) b = [], c = [];
                    else if (b[0] < u || b[d - 1] > q) f = this.cropData(this.xData,
                    this.yData, u, q), b = f.xData, c = f.yData, f = f.start, e = !0;
                for (k = b.length || 1; --k;) d = p ? r(b[k]) - r(b[k - 1]) : b[k] - b[k - 1], 0 < d && (void 0 === g || d < g) ? g = d : 0 > d && this.requireSorting && m(15);
                this.cropped = e;
                this.cropStart = f;
                this.processedXData = b;
                this.processedYData = c;
                this.closestPointRange = g
            },
            cropData: function(a, b, c, d) {
                var f = a.length,
                    e = 0,
                    g = f,
                    n = r(this.cropShoulder, 1),
                    k;
                for (k = 0; k < f; k++)
                    if (a[k] >= c) {
                        e = Math.max(0, k - n);
                        break
                    }
                for (c = k; c < f; c++)
                    if (a[c] > d) {
                        g = c + n;
                        break
                    }
                return {
                    xData: a.slice(e, g),
                    yData: b.slice(e, g),
                    start: e,
                    end: g
                }
            },
            generatePoints: function() {
                var a =
                    this.options.data,
                    b = this.data,
                    c, d = this.processedXData,
                    f = this.processedYData,
                    e = this.pointClass,
                    g = d.length,
                    n = this.cropStart || 0,
                    k, m = this.hasGroupedData,
                    r, h = [],
                    p;
                b || m || (b = [], b.length = a.length, b = this.data = b);
                for (p = 0; p < g; p++) k = n + p, m ? (r = (new e).init(this, [d[p]].concat(v(f[p]))), r.dataGroup = this.groupMap[p]) : (r = b[k]) || void 0 === a[k] || (b[k] = r = (new e).init(this, a[k], d[p])), r.index = k, h[p] = r;
                if (b && (g !== (c = b.length) || m))
                    for (p = 0; p < c; p++) p !== n || m || (p += g), b[p] && (b[p].destroyElements(), b[p].plotX = void 0);
                this.data =
                    b;
                this.points = h
            },
            getExtremes: function(a) {
                var b = this.yAxis,
                    d = this.processedXData,
                    e, g = [],
                    n = 0;
                e = this.xAxis.getExtremes();
                var k = e.min,
                    m = e.max,
                    r, h, v, p;
                a = a || this.stackedYData || this.processedYData || [];
                e = a.length;
                for (p = 0; p < e; p++)
                    if (h = d[p], v = a[p], r = (c(v, !0) || f(v)) && (!b.isLog || v.length || 0 < v), h = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[p + 1] || h) >= k && (d[p - 1] || h) <= m, r && h)
                        if (r = v.length)
                            for (; r--;) null !== v[r] && (g[n++] = v[r]);
                        else g[n++] = v;
                this.dataMin = E(g);
                this.dataMax = D(g)
            },
            translate: function() {
                this.processedXData ||
                    this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    d = this.xAxis,
                    f = d.categories,
                    e = this.yAxis,
                    n = this.points,
                    k = n.length,
                    m = !!this.modifyValue,
                    v = a.pointPlacement,
                    p = "between" === v || c(v),
                    u = a.threshold,
                    q = a.startFromThreshold ? u : 0,
                    w, t, H, C, I = Number.MAX_VALUE;
                "between" === v && (v = .5);
                c(v) && (v *= r(a.pointRange || d.pointRange));
                for (a = 0; a < k; a++) {
                    var J = n[a],
                        L = J.x,
                        E = J.y;
                    t = J.low;
                    var B = b && e.stacks[(this.negStacks && E < (q ? 0 : u) ? "-" : "") + this.stackKey],
                        D;
                    e.isLog && null !== E && 0 >= E && (J.isNull = !0);
                    J.plotX = w = g(Math.min(Math.max(-1E5,
                        d.translate(L, 0, 0, 0, 1, v, "flags" === this.type)), 1E5));
                    b && this.visible && !J.isNull && B && B[L] && (C = this.getStackIndicator(C, L, this.index), D = B[L], E = D.points[C.key], t = E[0], E = E[1], t === q && C.key === B[L].base && (t = r(u, e.min)), e.isLog && 0 >= t && (t = null), J.total = J.stackTotal = D.total, J.percentage = D.total && J.y / D.total * 100, J.stackY = E, D.setOffset(this.pointXOffset || 0, this.barW || 0));
                    J.yBottom = h(t) ? e.translate(t, 0, 1, 0, 1) : null;
                    m && (E = this.modifyValue(E, J));
                    J.plotY = t = "number" === typeof E && Infinity !== E ? Math.min(Math.max(-1E5, e.translate(E,
                        0, 1, 0, 1)), 1E5) : void 0;
                    J.isInside = void 0 !== t && 0 <= t && t <= e.len && 0 <= w && w <= d.len;
                    J.clientX = p ? g(d.translate(L, 0, 0, 0, 1, v)) : w;
                    J.negative = J.y < (u || 0);
                    J.category = f && void 0 !== f[J.x] ? f[J.x] : J.x;
                    J.isNull || (void 0 !== H && (I = Math.min(I, Math.abs(w - H))), H = w)
                }
                this.closestPointRangePx = I
            },
            getValidPoints: function(a, b) {
                var c = this.chart;
                return k(a || this.points || [], function(a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    c = this.options,
                    d = b.renderer,
                    f = b.inverted,
                    e = this.clipBox,
                    g = e || b.clipBox,
                    n = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(),
                    k = b[n],
                    m = b[n + "m"];
                k || (a && (g.width = 0, b[n + "m"] = m = d.clipRect(-99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[n] = k = d.clipRect(g), k.count = {
                    length: 0
                });
                a && !k.count[this.index] && (k.count[this.index] = !0, k.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || e ? k : b.clipRect), this.markerGroup.clip(m), this.sharedClipKey = n);
                a || (k.count[this.index] && (delete k.count[this.index],
                    --k.count.length), 0 === k.count.length && n && b[n] && (e || (b[n] = b[n].destroy()), b[n + "m"] && (b[n + "m"] = b[n + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    c = F(this.options.animation),
                    d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                    width: b.plotSizeX
                }, c), b[d + "m"] && b[d + "m"].animate({
                    width: b.plotSizeX + 99
                }, c), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip();
                p(this, "afterAnimate")
            },
            drawPoints: function() {
                var a = this.points,
                    b = this.chart,
                    d, f, e, g, n = this.options.marker,
                    k, m, h, v, p = this.markerGroup,
                    u = r(n.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx > 2 * n.radius);
                if (!1 !== n.enabled || this._hasPointMarkers)
                    for (f = a.length; f--;) e = a[f], d = e.plotY, g = e.graphic, k = e.marker || {}, m = !!e.marker, h = u && void 0 === k.enabled || k.enabled, v = e.isInside, h && c(d) && null !== e.y ? (d = r(k.symbol, this.symbol), e.hasImage = 0 === d.indexOf("url"), h = this.markerAttribs(e, e.selected && "select"), g ? g[v ? "show" : "hide"](!0).animate(h) : v && (0 < h.width || e.hasImage) && (e.graphic = g = b.renderer.symbol(d, h.x, h.y, h.width, h.height, m ? k : n).add(p)),
                        g && g.attr(this.pointAttribs(e, e.selected && "select")), g && g.addClass(e.getClassName(), !0)) : g && (e.graphic = g.destroy())
            },
            markerAttribs: function(a, b) {
                var c = this.options.marker,
                    d = a && a.options,
                    f = d && d.marker || {},
                    d = r(f.radius, c.radius);
                b && (c = c.states[b], b = f.states && f.states[b], d = r(b && b.radius, c && c.radius, d + (c && c.radiusPlus || 0)));
                a.hasImage && (d = 0);
                a = {
                    x: Math.floor(a.plotX) - d,
                    y: a.plotY - d
                };
                d && (a.width = a.height = 2 * d);
                return a
            },
            pointAttribs: function(a, b) {
                var c = this.options.marker,
                    d = a && a.options,
                    f = d && d.marker || {},
                    e = this.color,
                    g = d && d.color,
                    n = a && a.color,
                    d = r(f.lineWidth, c.lineWidth),
                    k;
                a && this.zones.length && (a = a.getZone()) && a.color && (k = a.color);
                e = g || k || n || e;
                k = f.fillColor || c.fillColor || e;
                e = f.lineColor || c.lineColor || e;
                b && (c = c.states[b], b = f.states && f.states[b] || {}, d = r(b.lineWidth, c.lineWidth, d + r(b.lineWidthPlus, c.lineWidthPlus, 0)), k = b.fillColor || c.fillColor || k, e = b.lineColor || c.lineColor || e);
                return {
                    stroke: e,
                    "stroke-width": d,
                    fill: k
                }
            },
            destroy: function() {
                var a = this,
                    b = a.chart,
                    c = /AppleWebKit\/533/.test(L.navigator.userAgent),
                    f, e = a.data || [],
                    g, k, m;
                p(a, "destroy");
                n(a);
                u(a.axisTypes || [], function(b) {
                    (m = a[b]) && m.series && (d(m.series, a), m.isDirty = m.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (f = e.length; f--;)(g = e[f]) && g.destroy && g.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                for (k in a) a[k] instanceof J && !a[k].survive && (f = c && "group" === k ? "hide" : "destroy", a[k][f]());
                b.hoverSeries === a && (b.hoverSeries = null);
                d(b.series, a);
                for (k in a) delete a[k]
            },
            getGraphPath: function(a, b, c) {
                var d = this,
                    f = d.options,
                    e =
                    f.step,
                    g, n = [],
                    k = [],
                    m;
                a = a || d.points;
                (g = a.reversed) && a.reverse();
                (e = {
                    right: 1,
                    center: 2
                }[e] || e && 3) && g && (e = 4 - e);
                !f.connectNulls || b || c || (a = this.getValidPoints(a));
                u(a, function(g, l) {
                    var r = g.plotX,
                        v = g.plotY,
                        p = a[l - 1];
                    (g.leftCliff || p && p.rightCliff) && !c && (m = !0);
                    g.isNull && !h(b) && 0 < l ? m = !f.connectNulls : g.isNull && !b ? m = !0 : (0 === l || m ? l = ["M", g.plotX, g.plotY] : d.getPointSpline ? l = d.getPointSpline(a, g, l) : e ? (l = 1 === e ? ["L", p.plotX, v] : 2 === e ? ["L", (p.plotX + r) / 2, p.plotY, "L", (p.plotX + r) / 2, v] : ["L", r, p.plotY], l.push("L", r, v)) : l = ["L", r, v], k.push(g.x), e && k.push(g.x), n.push.apply(n, l), m = !1)
                });
                n.xMap = k;
                return d.graphPath = n
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    d = [
                        ["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
                    ];
                u(this.zones, function(c, f) {
                    d.push(["zone-graph-" + f, "highcharts-graph highcharts-zone-graph-" + f + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle])
                });
                u(d, function(d, f) {
                    var e = d[0],
                        g = a[e];
                    g ? (g.endX = c.xMap, g.animate({
                            d: c
                        })) : c.length &&
                        (a[e] = a.chart.renderer.path(c).addClass(d[1]).attr({
                            zIndex: 1
                        }).add(a.group), g = {
                            stroke: d[2],
                            "stroke-width": b.lineWidth,
                            fill: a.fillGraph && a.color || "none"
                        }, d[3] ? g.dashstyle = d[3] : "square" !== b.linecap && (g["stroke-linecap"] = g["stroke-linejoin"] = "round"), g = a[e].attr(g).shadow(2 > f && b.shadow));
                    g && (g.startX = c.xMap, g.isArea = c.isArea)
                })
            },
            applyZones: function() {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    d = this.zones,
                    f, e, g = this.clips || [],
                    n, k = this.graph,
                    m = this.area,
                    h = Math.max(b.chartWidth, b.chartHeight),
                    v = this[(this.zoneAxis ||
                        "y") + "Axis"],
                    p, q, w = b.inverted,
                    t, H, J, C, I = !1;
                d.length && (k || m) && v && void 0 !== v.min && (q = v.reversed, t = v.horiz, k && k.hide(), m && m.hide(), p = v.getExtremes(), u(d, function(d, l) {
                    f = q ? t ? b.plotWidth : 0 : t ? 0 : v.toPixels(p.min);
                    f = Math.min(Math.max(r(e, f), 0), h);
                    e = Math.min(Math.max(Math.round(v.toPixels(r(d.value, p.max), !0)), 0), h);
                    I && (f = e = v.toPixels(p.max));
                    H = Math.abs(f - e);
                    J = Math.min(f, e);
                    C = Math.max(f, e);
                    v.isXAxis ? (n = {
                        x: w ? C : J,
                        y: 0,
                        width: H,
                        height: h
                    }, t || (n.x = b.plotHeight - n.x)) : (n = {
                        x: 0,
                        y: w ? C : J,
                        width: h,
                        height: H
                    }, t && (n.y = b.plotWidth -
                        n.y));
                    w && c.isVML && (n = v.isXAxis ? {
                        x: 0,
                        y: q ? J : C,
                        height: n.width,
                        width: b.chartWidth
                    } : {
                        x: n.y - b.plotLeft - b.spacingBox.x,
                        y: 0,
                        width: n.height,
                        height: b.chartHeight
                    });
                    g[l] ? g[l].animate(n) : (g[l] = c.clipRect(n), k && a["zone-graph-" + l].clip(g[l]), m && a["zone-area-" + l].clip(g[l]));
                    I = d.value > p.max
                }), this.clips = g)
            },
            invertGroups: function(a) {
                function b() {
                    var b = {
                        width: c.yAxis.len,
                        height: c.xAxis.len
                    };
                    u(["group", "markerGroup"], function(d) {
                        c[d] && c[d].attr(b).invert(a)
                    })
                }
                var c = this,
                    d;
                c.xAxis && (d = B(c.chart, "resize", b), B(c, "destroy",
                    d), b(a), c.invertGroups = b)
            },
            plotGroup: function(a, b, c, d, f) {
                var e = this[a],
                    g = !e;
                g && (this[a] = e = this.chart.renderer.g(b).attr({
                    zIndex: d || .1
                }).add(f), e.addClass("highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));
                e.attr({
                    visibility: c
                })[g ? "attr" : "animate"](this.getPlotBox());
                return e
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ?
                        c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c, d = a.options,
                    f = !!a.animate && b.renderer.isSVG && F(d.animation).duration,
                    e = a.visible ? "inherit" : "hidden",
                    g = d.zIndex,
                    n = a.hasRendered,
                    k = b.seriesGroup,
                    m = b.inverted;
                c = a.plotGroup("group", "series", e, g, k);
                a.markerGroup = a.plotGroup("markerGroup", "markers", e, g, k);
                f && a.animate(!0);
                c.inverted = a.isCartesian ? m : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !==
                    a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(m);
                !1 === d.clip || a.sharedClipKey || n || c.clip(b.clipRect);
                f && a.animate();
                n || (a.animationTimeout = H(function() {
                    a.afterAnimate()
                }, f));
                a.isDirty = a.isDirtyData = !1;
                a.hasRendered = !0
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    d = this.xAxis,
                    f = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: r(d && d.left, a.plotLeft),
                    translateY: r(f && f.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdDimensions: 1,
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var c = this.xAxis,
                    d = this.yAxis,
                    f = this.chart.inverted;
                return this.searchKDTree({
                    clientX: f ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: f ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function() {
                function a(c, d, f) {
                    var e, g;
                    if (g = c && c.length) return e = b.kdAxisArray[d % f], c.sort(function(a, b) {
                        return a[e] - b[e]
                    }), g = Math.floor(g / 2), {
                        point: c[g],
                        left: a(c.slice(0, g), d + 1, f),
                        right: a(c.slice(g + 1), d + 1, f)
                    }
                }
                var b = this,
                    c = b.kdDimensions;
                delete b.kdTree;
                H(function() {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c)
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function(a, b) {
                function c(a, b, n, k) {
                    var l = b.point,
                        m = d.kdAxisArray[n % k],
                        r, v, p = l;
                    v = h(a[f]) && h(l[f]) ? Math.pow(a[f] - l[f], 2) : null;
                    r = h(a[e]) && h(l[e]) ? Math.pow(a[e] - l[e], 2) : null;
                    r = (v || 0) + (r || 0);
                    l.dist = h(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                    l.distX = h(v) ? Math.sqrt(v) : Number.MAX_VALUE;
                    m = a[m] - l[m];
                    r = 0 > m ? "left" : "right";
                    v = 0 > m ? "right" : "left";
                    b[r] && (r = c(a, b[r], n + 1, k), p = r[g] <
                        p[g] ? r : l);
                    b[v] && Math.sqrt(m * m) < p[g] && (a = c(a, b[v], n + 1, k), p = a[g] < p[g] ? a : p);
                    return p
                }
                var d = this,
                    f = this.kdAxisArray[0],
                    e = this.kdAxisArray[1],
                    g = b ? "distX" : "dist";
                this.kdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, this.kdDimensions, this.kdDimensions)
            }
        })
    })(K);
    (function(a) {
        var B = a.addEvent,
            F = a.animate,
            D = a.Axis,
            E = a.createElement,
            g = a.css,
            e = a.defined,
            q = a.each,
            t = a.erase,
            h = a.extend,
            u = a.fireEvent,
            d = a.inArray,
            m = a.isNumber,
            w = a.isObject,
            p = a.merge,
            k = a.pick,
            f = a.Point,
            c = a.Series,
            b = a.seriesTypes,
            C = a.setAnimation,
            r = a.splat;
        h(a.Chart.prototype, {
            addSeries: function(a, b, c) {
                var d, f = this;
                a && (b = k(b, !0), u(f, "addSeries", {
                    options: a
                }, function() {
                    d = f.initSeries(a);
                    f.isDirtyLegend = !0;
                    f.linkSeries();
                    b && f.redraw(c)
                }));
                return d
            },
            addAxis: function(a, b, c, d) {
                var f = b ? "xAxis" : "yAxis",
                    e = this.options;
                a = p(a, {
                    index: this[f].length,
                    isX: b
                });
                new D(this, a);
                e[f] = r(e[f] || {});
                e[f].push(a);
                k(c, !0) && this.redraw(d)
            },
            showLoading: function(a) {
                var b = this,
                    c = b.options,
                    d = b.loadingDiv,
                    f = c.loading,
                    e = function() {
                        d && g(d, {
                            left: b.plotLeft + "px",
                            top: b.plotTop +
                                "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                d || (b.loadingDiv = d = E("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = E("span", {
                    className: "highcharts-loading-inner"
                }, null, d), B(b, "redraw", e));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                g(d, h(f.style, {
                    zIndex: 10
                }));
                g(b.loadingSpan, f.labelStyle);
                b.loadingShown || (g(d, {
                    opacity: 0,
                    display: ""
                }), F(d, {
                    opacity: f.style.opacity || .5
                }, {
                    duration: f.showDuration || 0
                }));
                b.loadingShown = !0;
                e()
            },
            hideLoading: function() {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", F(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        g(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions".split(" "),
            update: function(a, b) {
                var c, f = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    g = a.chart,
                    n, h;
                if (g) {
                    p(!0, this.options.chart, g);
                    "className" in g && this.setClassName(g.className);
                    if ("inverted" in g || "polar" in g) this.propFromSeries(), n = !0;
                    for (c in g) g.hasOwnProperty(c) && (-1 !== d("chart." + c, this.propsRequireUpdateSeries) && (h = !0), -1 !== d(c, this.propsRequireDirtyBox) && (this.isDirtyBox = !0));
                    "style" in g && this.renderer.setStyle(g.style)
                }
                for (c in a) {
                    if (this[c] && "function" === typeof this[c].update) this[c].update(a[c], !1);
                    else if ("function" === typeof this[f[c]]) this[f[c]](a[c]);
                    "chart" !== c && -1 !== d(c, this.propsRequireUpdateSeries) && (h = !0)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && p(!0, this.options.plotOptions, a.plotOptions);
                q(["xAxis", "yAxis", "series"], function(b) {
                    a[b] && q(r(a[b]), function(a) {
                        var c = e(a.id) && this.get(a.id) || this[b][0];
                        c && c.coll === b && c.update(a, !1)
                    }, this)
                }, this);
                n && q(this.axes, function(a) {
                    a.update({}, !1)
                });
                h && q(this.series, function(a) {
                    a.update({}, !1)
                });
                a.loading && p(!0, this.options.loading, a.loading);
                c = g && g.width;
                g = g && g.height;
                m(c) && c !== this.chartWidth || m(g) && g !== this.chartHeight ? this.setSize(c, g) : k(b, !0) && this.redraw()
            },
            setSubtitle: function(a) {
                this.setTitle(void 0, a)
            }
        });
        h(f.prototype, {
            update: function(a, b, c, d) {
                function f() {
                    e.applyOptions(a);
                    null === e.y && n && (e.graphic = n.destroy());
                    w(a, !0) && (n && n.element && a && a.marker && a.marker.symbol && (e.graphic = n.destroy()),
                        a && a.dataLabels && e.dataLabel && (e.dataLabel = e.dataLabel.destroy()));
                    m = e.index;
                    g.updateParallelArrays(e, m);
                    l.data[m] = w(l.data[m], !0) ? e.options : a;
                    g.isDirty = g.isDirtyData = !0;
                    !g.fixedBox && g.hasCartesianSeries && (r.isDirtyBox = !0);
                    "point" === l.legendType && (r.isDirtyLegend = !0);
                    b && r.redraw(c)
                }
                var e = this,
                    g = e.series,
                    n = e.graphic,
                    m, r = g.chart,
                    l = g.options;
                b = k(b, !0);
                !1 === d ? f() : e.firePointEvent("update", {
                    options: a
                }, f)
            },
            remove: function(a, b) {
                this.series.removePoint(d(this, this.series.data), a, b)
            }
        });
        h(c.prototype, {
            addPoint: function(a,
                b, c, d) {
                var f = this.options,
                    e = this.data,
                    g = this.chart,
                    n = this.xAxis && this.xAxis.names,
                    m = f.data,
                    r, l, h = this.xData,
                    p, v;
                b = k(b, !0);
                r = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(r, [a]);
                v = r.x;
                p = h.length;
                if (this.requireSorting && v < h[p - 1])
                    for (l = !0; p && h[p - 1] > v;) p--;
                this.updateParallelArrays(r, "splice", p, 0, 0);
                this.updateParallelArrays(r, p);
                n && r.name && (n[v] = r.name);
                m.splice(p, 0, a);
                l && (this.data.splice(p, 0, null), this.processData());
                "point" === f.legendType && this.generatePoints();
                c && (e[0] && e[0].remove ?
                    e[0].remove(!1) : (e.shift(), this.updateParallelArrays(r, "shift"), m.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && g.redraw(d)
            },
            removePoint: function(a, b, c) {
                var d = this,
                    f = d.data,
                    e = f[a],
                    g = d.points,
                    n = d.chart,
                    m = function() {
                        g && g.length === f.length && g.splice(a, 1);
                        f.splice(a, 1);
                        d.options.data.splice(a, 1);
                        d.updateParallelArrays(e || {
                            series: d
                        }, "splice", a, 1);
                        e && e.destroy();
                        d.isDirty = !0;
                        d.isDirtyData = !0;
                        b && n.redraw()
                    };
                C(c, n);
                b = k(b, !0);
                e ? e.firePointEvent("remove", null, m) : m()
            },
            remove: function(a, b, c) {
                function d() {
                    f.destroy();
                    e.isDirtyLegend = e.isDirtyBox = !0;
                    e.linkSeries();
                    k(a, !0) && e.redraw(b)
                }
                var f = this,
                    e = f.chart;
                !1 !== c ? u(f, "remove", null, d) : d()
            },
            update: function(a, c) {
                var d = this,
                    f = this.chart,
                    e = this.userOptions,
                    g = this.type,
                    n = a.type || e.type || f.options.chart.type,
                    m = b[g].prototype,
                    r = ["group", "markerGroup", "dataLabelsGroup"],
                    v;
                if (n && n !== g || void 0 !== a.zIndex) r.length = 0;
                q(r, function(a) {
                    r[a] = d[a];
                    delete d[a]
                });
                a = p(e, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                    data: this.options.data
                }, a);
                this.remove(!1, null, !1);
                for (v in m) this[v] =
                    void 0;
                h(this, b[n || g].prototype);
                q(r, function(a) {
                    d[a] = r[a]
                });
                this.init(f, a);
                f.linkSeries();
                k(c, !0) && f.redraw(!1)
            }
        });
        h(D.prototype, {
            update: function(a, b) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] = p(this.userOptions, a);
                this.destroy(!0);
                this.init(c, h(a, {
                    events: void 0
                }));
                c.isDirtyBox = !0;
                k(b, !0) && c.redraw()
            },
            remove: function(a) {
                for (var b = this.chart, c = this.coll, d = this.series, f = d.length; f--;) d[f] && d[f].remove(!1);
                t(b.axes, this);
                t(b[c], this);
                b.options[c].splice(this.options.index, 1);
                q(b[c],
                    function(a, b) {
                        a.options.index = b
                    });
                this.destroy();
                b.isDirtyBox = !0;
                k(a, !0) && b.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(K);
    (function(a) {
        var B = a.animObject,
            F = a.color,
            D = a.each,
            E = a.extend,
            g = a.isNumber,
            e = a.merge,
            q = a.pick,
            t = a.Series,
            h = a.seriesType,
            u = a.svg;
        h("column", "line", {
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1,
                    shadow: !1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000",
                    shadow: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                t.prototype.init.apply(this, arguments);
                var a = this,
                    e = a.chart;
                e.hasRendered && D(e.series, function(d) {
                    d.type === a.type && (d.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var a = this,
                    e = a.options,
                    g = a.xAxis,
                    h = a.yAxis,
                    k = g.reversed,
                    f, c = {},
                    b = 0;
                !1 === e.grouping ? b = 1 : D(a.chart.series, function(d) {
                    var e = d.options,
                        g = d.yAxis,
                        k;
                    d.type === a.type && d.visible && h.len === g.len && h.pos === g.pos && (e.stacking ? (f = d.stackKey, void 0 === c[f] && (c[f] = b++), k = c[f]) : !1 !== e.grouping && (k = b++), d.columnIndex = k)
                });
                var u = Math.min(Math.abs(g.transA) * (g.ordinalSlope || e.pointRange || g.closestPointRange || g.tickInterval || 1), g.len),
                    r = u * e.groupPadding,
                    n = (u - 2 * r) / b,
                    e = Math.min(e.maxPointWidth || g.len, q(e.pointWidth, n * (1 - 2 * e.pointPadding)));
                a.columnMetrics = {
                    width: e,
                    offset: (n - e) / 2 + (r + ((a.columnIndex || 0) + (k ? 1 : 0)) * n - u / 2) * (k ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function(a, e, g, h) {
                var d = this.chart,
                    f = this.borderWidth,
                    c = -(f % 2 ? .5 : 0),
                    f = f % 2 ? .5 : 1;
                d.inverted && d.renderer.isVML && (f += 1);
                g = Math.round(a + g) + c;
                a = Math.round(a) + c;
                h = Math.round(e + h) + f;
                c = .5 >= Math.abs(e) && .5 < h;
                e = Math.round(e) + f;
                h -= e;
                c && h && (--e, h += 1);
                return {
                    x: a,
                    y: e,
                    width: g - a,
                    height: h
                }
            },
            translate: function() {
                var a = this,
                    e = a.chart,
                    g = a.options,
                    h = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    h = a.borderWidth = q(g.borderWidth,
                        h ? 0 : 1),
                    k = a.yAxis,
                    f = a.translatedThreshold = k.getThreshold(g.threshold),
                    c = q(g.minPointLength, 5),
                    b = a.getColumnMetrics(),
                    u = b.width,
                    r = a.barW = Math.max(u, 1 + 2 * h),
                    n = a.pointXOffset = b.offset;
                e.inverted && (f -= .5);
                g.pointPadding && (r = Math.ceil(r));
                t.prototype.translate.apply(a);
                D(a.points, function(b) {
                    var d = q(b.yBottom, f),
                        g = 999 + Math.abs(d),
                        g = Math.min(Math.max(-g, b.plotY), k.len + g),
                        m = b.plotX + n,
                        h = r,
                        p = Math.min(g, d),
                        v, t = Math.max(g, d) - p;
                    Math.abs(t) < c && c && (t = c, v = !k.reversed && !b.negative || k.reversed && b.negative, p = Math.abs(p -
                        f) > c ? d - c : f - (v ? c : 0));
                    b.barX = m;
                    b.pointWidth = u;
                    b.tooltipPos = e.inverted ? [k.len + k.pos - e.plotLeft - g, a.xAxis.len - m - h / 2, t] : [m + h / 2, g + k.pos - e.plotTop, t];
                    b.shapeType = "rect";
                    b.shapeArgs = a.crispCol.apply(a, b.isNull ? [b.plotX, k.len / 2, 0, 0] : [m, p, h, t])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(a, e) {
                var d = this.options,
                    g = this.pointAttrToOptions || {},
                    k = g.stroke || "borderColor",
                    f = g["stroke-width"] || "borderWidth",
                    c = a && a.color || this.color,
                    b = a[k] || d[k] || this.color || c,
                    g = d.dashStyle,
                    m;
                a && this.zones.length && (c = (c = a.getZone()) && c.color || a.options.color || this.color);
                e && (e = d.states[e], m = e.brightness, c = e.color || void 0 !== m && F(c).brighten(e.brightness).get() || c, b = e[k] || b, g = e.dashStyle || g);
                a = {
                    fill: c,
                    stroke: b,
                    "stroke-width": a[f] || d[f] || this[f] || 0
                };
                d.borderRadius && (a.r = d.borderRadius);
                g && (a.dashstyle = g);
                return a
            },
            drawPoints: function() {
                var a = this,
                    m = this.chart,
                    h = a.options,
                    p = m.renderer,
                    k =
                    h.animationLimit || 250,
                    f;
                D(a.points, function(c) {
                    var b = c.graphic;
                    if (g(c.plotY) && null !== c.y) {
                        f = c.shapeArgs;
                        if (b) b[m.pointCount < k ? "animate" : "attr"](e(f));
                        else c.graphic = b = p[c.shapeType](f).attr({
                            "class": c.getClassName()
                        }).add(c.group || a.group);
                        b.attr(a.pointAttribs(c, c.selected && "select")).shadow(h.shadow, null, h.stacking && !h.borderRadius)
                    } else b && (c.graphic = b.destroy())
                })
            },
            animate: function(a) {
                var d = this,
                    e = this.yAxis,
                    g = d.options,
                    k = this.chart.inverted,
                    f = {};
                u && (a ? (f.scaleY = .001, a = Math.min(e.pos + e.len, Math.max(e.pos,
                    e.toPixels(g.threshold))), k ? f.translateX = a - e.len : f.translateY = a, d.group.attr(f)) : (f[k ? "translateX" : "translateY"] = e.pos, d.group.animate(f, E(B(d.options.animation), {
                    step: function(a, b) {
                        d.group.attr({
                            scaleY: Math.max(.001, b.pos)
                        })
                    }
                })), d.animate = null))
            },
            remove: function() {
                var a = this,
                    e = a.chart;
                e.hasRendered && D(e.series, function(d) {
                    d.type === a.type && (d.isDirty = !0)
                });
                t.prototype.remove.apply(a, arguments)
            }
        })
    })(K);
    (function(a) {
        var B = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            kdDimensions: 2,
            drawGraph: function() {
                this.options.lineWidth && B.prototype.drawGraph.call(this)
            }
        })
    })(K);
    (function(a) {
        var B = a.addEvent,
            F = a.arrayMax,
            D = a.defined,
            E = a.each,
            g = a.extend,
            e = a.format,
            q = a.map,
            t = a.merge,
            h = a.noop,
            u = a.pick,
            d = a.relativeLength,
            m = a.Series,
            w = a.seriesTypes,
            p = a.stableSort;
        a.distribute = function(a, d) {
            function c(a, b) {
                return a.target - b.target
            }
            var b, f = !0,
                e = a,
                g = [],
                k;
            k = 0;
            for (b = a.length; b--;) k += a[b].size;
            if (k > d) {
                p(a, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (k = b = 0; k <= d;) k += a[b].size, b++;
                g = a.splice(b - 1, a.length)
            }
            p(a, c);
            for (a = q(a, function(a) {
                    return {
                        size: a.size,
                        targets: [a.target]
                    }
                }); f;) {
                for (b = a.length; b--;) f = a[b], k = (Math.min.apply(0, f.targets) + Math.max.apply(0, f.targets)) / 2, f.pos = Math.min(Math.max(0, k - f.size / 2), d - f.size);
                b = a.length;
                for (f = !1; b--;) 0 < b && a[b - 1].pos + a[b - 1].size >
                    a[b].pos && (a[b - 1].size += a[b].size, a[b - 1].targets = a[b - 1].targets.concat(a[b].targets), a[b - 1].pos + a[b - 1].size > d && (a[b - 1].pos = d - a[b - 1].size), a.splice(b, 1), f = !0)
            }
            b = 0;
            E(a, function(a) {
                var c = 0;
                E(a.targets, function() {
                    e[b].pos = a.pos + c;
                    c += e[b].size;
                    b++
                })
            });
            e.push.apply(e, g);
            p(e, c)
        };
        m.prototype.drawDataLabels = function() {
            var a = this,
                d = a.options,
                c = d.dataLabels,
                b = a.points,
                m, r, n = a.hasRendered || 0,
                h, p, q = u(c.defer, !0),
                w = a.chart.renderer;
            if (c.enabled || a._hasPointLabels) a.dlProcessOptions && a.dlProcessOptions(c), p = a.plotGroup("dataLabelsGroup",
                "data-labels", q && !n ? "hidden" : "visible", c.zIndex || 6), q && (p.attr({
                opacity: +n
            }), n || B(a, "afterAnimate", function() {
                a.visible && p.show(!0);
                p[d.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), r = c, E(b, function(b) {
                var f, k = b.dataLabel,
                    n, v, l = b.connector,
                    q = !0,
                    C, J = {};
                m = b.dlOptions || b.options && b.options.dataLabels;
                f = u(m && m.enabled, r.enabled) && null !== b.y;
                if (k && !f) b.dataLabel = k.destroy();
                else if (f) {
                    c = t(r, m);
                    C = c.style;
                    f = c.rotation;
                    n = b.getLabelConfig();
                    h = c.format ? e(c.format, n) : c.formatter.call(n, c);
                    C.color =
                        u(c.color, C.color, a.color, "#000000");
                    if (k) D(h) ? (k.attr({
                        text: h
                    }), q = !1) : (b.dataLabel = k = k.destroy(), l && (b.connector = l.destroy()));
                    else if (D(h)) {
                        k = {
                            fill: c.backgroundColor,
                            stroke: c.borderColor,
                            "stroke-width": c.borderWidth,
                            r: c.borderRadius || 0,
                            rotation: f,
                            padding: c.padding,
                            zIndex: 1
                        };
                        "contrast" === C.color && (J.color = c.inside || 0 > c.distance || d.stacking ? w.getContrast(b.color || a.color) : "#000000");
                        d.cursor && (J.cursor = d.cursor);
                        for (v in k) void 0 === k[v] && delete k[v];
                        k = b.dataLabel = w[f ? "text" : "label"](h, 0, -9999, c.shape,
                            null, null, c.useHTML, null, "data-label").attr(k);
                        k.addClass("highcharts-data-label-color-" + b.colorIndex + " " + (c.className || "") + (c.useHTML ? "highcharts-tracker" : ""));
                        k.css(g(C, J));
                        k.add(p);
                        k.shadow(c.shadow)
                    }
                    k && a.alignDataLabel(b, k, c, null, q)
                }
            })
        };
        m.prototype.alignDataLabel = function(a, d, c, b, e) {
            var f = this.chart,
                k = f.inverted,
                m = u(a.plotX, -9999),
                h = u(a.plotY, -9999),
                p = d.getBBox(),
                q, t = c.rotation,
                w = c.align,
                C = this.visible && (a.series.forceDL || f.isInsidePlot(m, Math.round(h), k) || b && f.isInsidePlot(m, k ? b.x + 1 : b.y + b.height -
                    1, k)),
                E = "justify" === u(c.overflow, "justify");
            C && (q = c.style.fontSize, q = f.renderer.fontMetrics(q, d).b, b = g({
                x: k ? f.plotWidth - h : m,
                y: Math.round(k ? f.plotHeight - m : h),
                width: 0,
                height: 0
            }, b), g(c, {
                width: p.width,
                height: p.height
            }), t ? (E = !1, k = f.renderer.rotCorr(q, t), k = {
                x: b.x + c.x + b.width / 2 + k.x,
                y: b.y + c.y + {
                    top: 0,
                    middle: .5,
                    bottom: 1
                }[c.verticalAlign] * b.height
            }, d[e ? "attr" : "animate"](k).attr({
                align: w
            }), m = (t + 720) % 360, m = 180 < m && 360 > m, "left" === w ? k.y -= m ? p.height : 0 : "center" === w ? (k.x -= p.width / 2, k.y -= p.height / 2) : "right" === w && (k.x -=
                p.width, k.y -= m ? 0 : p.height)) : (d.align(c, null, b), k = d.alignAttr), E ? this.justifyDataLabel(d, c, k, p, b, e) : u(c.crop, !0) && (C = f.isInsidePlot(k.x, k.y) && f.isInsidePlot(k.x + p.width, k.y + p.height)), c.shape && !t && d.attr({
                anchorX: a.plotX,
                anchorY: a.plotY
            }));
            C || (d.attr({
                y: -9999
            }), d.placed = !1)
        };
        m.prototype.justifyDataLabel = function(a, d, c, b, e, g) {
            var f = this.chart,
                k = d.align,
                m = d.verticalAlign,
                h, r, p = a.box ? 0 : a.padding || 0;
            h = c.x + p;
            0 > h && ("right" === k ? d.align = "left" : d.x = -h, r = !0);
            h = c.x + b.width - p;
            h > f.plotWidth && ("left" === k ? d.align =
                "right" : d.x = f.plotWidth - h, r = !0);
            h = c.y + p;
            0 > h && ("bottom" === m ? d.verticalAlign = "top" : d.y = -h, r = !0);
            h = c.y + b.height - p;
            h > f.plotHeight && ("top" === m ? d.verticalAlign = "bottom" : d.y = f.plotHeight - h, r = !0);
            r && (a.placed = !g, a.align(d, null, e))
        };
        w.pie && (w.pie.prototype.drawDataLabels = function() {
            var d = this,
                f = d.data,
                c, b = d.chart,
                e = d.options.dataLabels,
                g = u(e.connectorPadding, 10),
                n = u(e.connectorWidth, 1),
                h = b.plotWidth,
                p = b.plotHeight,
                t, w = e.distance,
                B = d.center,
                D = B[2] / 2,
                A = B[1],
                N = 0 < w,
                M, l, x, P, O = [
                    [],
                    []
                ],
                y, z, K, Q, R = [0, 0, 0, 0];
            d.visible &&
                (e.enabled || d._hasPointLabels) && (m.prototype.drawDataLabels.apply(d), E(f, function(a) {
                    a.dataLabel && a.visible && (O[a.half].push(a), a.dataLabel._pos = null)
                }), E(O, function(f, k) {
                    var n, m, r = f.length,
                        v, u, t;
                    if (r)
                        for (d.sortByAngle(f, k - .5), 0 < w && (n = Math.max(0, A - D - w), m = Math.min(A + D + w, b.plotHeight), v = q(f, function(a) {
                                if (a.dataLabel) return t = a.dataLabel.getBBox().height || 21, {
                                    target: a.labelPos[1] - n + t / 2,
                                    size: t,
                                    rank: a.y
                                }
                            }), a.distribute(v, m + t - n)), Q = 0; Q < r; Q++) c = f[Q], x = c.labelPos, M = c.dataLabel, K = !1 === c.visible ? "hidden" :
                            "inherit", u = x[1], v ? void 0 === v[Q].pos ? K = "hidden" : (P = v[Q].size, z = n + v[Q].pos) : z = u, y = e.justify ? B[0] + (k ? -1 : 1) * (D + w) : d.getX(z < n + 2 || z > m - 2 ? u : z, k), M._attr = {
                                visibility: K,
                                align: x[6]
                            }, M._pos = {
                                x: y + e.x + ({
                                    left: g,
                                    right: -g
                                }[x[6]] || 0),
                                y: z + e.y - 10
                            }, x.x = y, x.y = z, null === d.options.size && (l = M.width, y - l < g ? R[3] = Math.max(Math.round(l - y + g), R[3]) : y + l > h - g && (R[1] = Math.max(Math.round(y + l - h + g), R[1])), 0 > z - P / 2 ? R[0] = Math.max(Math.round(-z + P / 2), R[0]) : z + P / 2 > p && (R[2] = Math.max(Math.round(z + P / 2 - p), R[2])))
                }), 0 === F(R) || this.verifyDataLabelOverflow(R)) &&
                (this.placeDataLabels(), N && n && E(this.points, function(a) {
                    var c;
                    t = a.connector;
                    if ((M = a.dataLabel) && M._pos && a.visible) {
                        K = M._attr.visibility;
                        if (c = !t) a.connector = t = b.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(d.dataLabelsGroup), t.attr({
                            "stroke-width": n,
                            stroke: e.connectorColor || a.color || "#666666"
                        });
                        t[c ? "attr" : "animate"]({
                            d: d.connectorPath(a.labelPos)
                        });
                        t.attr("visibility", K)
                    } else t && (a.connector = t.destroy())
                }))
        }, w.pie.prototype.connectorPath = function(a) {
            var d =
                a.x,
                c = a.y;
            return u(this.options.dataLabels.softConnector, !0) ? ["M", d + ("left" === a[6] ? 5 : -5), c, "C", d, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", d + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, w.pie.prototype.placeDataLabels = function() {
            E(this.points, function(a) {
                var d = a.dataLabel;
                d && a.visible && ((a = d._pos) ? (d.attr(d._attr), d[d.moved ? "animate" : "attr"](a), d.moved = !0) : d && d.attr({
                    y: -9999
                }))
            })
        }, w.pie.prototype.alignDataLabel = h, w.pie.prototype.verifyDataLabelOverflow = function(a) {
            var f = this.center,
                c = this.options,
                b = c.center,
                e = c.minSize || 80,
                g, k;
            null !== b[0] ? g = Math.max(f[2] - Math.max(a[1], a[3]), e) : (g = Math.max(f[2] - a[1] - a[3], e), f[0] += (a[3] - a[1]) / 2);
            null !== b[1] ? g = Math.max(Math.min(g, f[2] - Math.max(a[0], a[2])), e) : (g = Math.max(Math.min(g, f[2] - a[0] - a[2]), e), f[1] += (a[0] - a[2]) / 2);
            g < f[2] ? (f[2] = g, f[3] = Math.min(d(c.innerSize || 0, g), g), this.translate(f), this.drawDataLabels && this.drawDataLabels()) : k = !0;
            return k
        });
        w.column && (w.column.prototype.alignDataLabel = function(a, d, c, b, e) {
            var f = this.chart.inverted,
                g = a.series,
                k = a.dlBox || a.shapeArgs,
                h = u(a.below, a.plotY > u(this.translatedThreshold, g.yAxis.len)),
                p = u(c.inside, !!this.options.stacking);
            k && (b = t(k), 0 > b.y && (b.height += b.y, b.y = 0), k = b.y + b.height - g.yAxis.len, 0 < k && (b.height -= k), f && (b = {
                x: g.yAxis.len - b.y - b.height,
                y: g.xAxis.len - b.x - b.width,
                width: b.height,
                height: b.width
            }), p || (f ? (b.x += h ? 0 : b.width, b.width = 0) : (b.y += h ? b.height : 0, b.height = 0)));
            c.align = u(c.align, !f || p ? "center" : h ? "right" : "left");
            c.verticalAlign = u(c.verticalAlign, f || p ? "middle" : h ? "top" : "bottom");
            m.prototype.alignDataLabel.call(this,
                a, d, c, b, e)
        })
    })(K);
    (function(a) {
        var B = a.Chart,
            F = a.each,
            D = a.pick,
            E = a.addEvent;
        B.prototype.callbacks.push(function(a) {
            function e() {
                var e = [];
                F(a.series, function(a) {
                    var g = a.options.dataLabels,
                        u = a.dataLabelCollections || ["dataLabel"];
                    (g.enabled || a._hasPointLabels) && !g.allowOverlap && a.visible && F(u, function(d) {
                        F(a.points, function(a) {
                            a[d] && (a[d].labelrank = D(a.labelrank, a.shapeArgs && a.shapeArgs.height), e.push(a[d]))
                        })
                    })
                });
                a.hideOverlappingLabels(e)
            }
            e();
            E(a, "redraw", e)
        });
        B.prototype.hideOverlappingLabels = function(a) {
            var e =
                a.length,
                g, t, h, u, d, m, w, p, k, f = function(a, b, d, f, e, g, k, m) {
                    return !(e > a + d || e + k < a || g > b + f || g + m < b)
                };
            for (t = 0; t < e; t++)
                if (g = a[t]) g.oldOpacity = g.opacity, g.newOpacity = 1;
            a.sort(function(a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (t = 0; t < e; t++)
                for (h = a[t], g = t + 1; g < e; ++g)
                    if (u = a[g], h && u && h.placed && u.placed && 0 !== h.newOpacity && 0 !== u.newOpacity && (d = h.alignAttr, m = u.alignAttr, w = h.parentGroup, p = u.parentGroup, k = 2 * (h.box ? 0 : h.padding), d = f(d.x + w.translateX, d.y + w.translateY, h.width - k, h.height - k, m.x + p.translateX, m.y + p.translateY,
                            u.width - k, u.height - k)))(h.labelrank < u.labelrank ? h : u).newOpacity = 0;
            F(a, function(a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function() {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(K);
    (function(a) {
        var B = a.Axis,
            F = a.each,
            D = a.pick;
        a = a.wrap;
        a(B.prototype, "getSeriesExtremes", function(a) {
            var g = this.isXAxis,
                e, q, t = [],
                h;
            g && F(this.series, function(a, d) {
                a.useMapGeometry && (t[d] = a.xData, a.xData = [])
            });
            a.call(this);
            g && (e = D(this.dataMin,
                Number.MAX_VALUE), q = D(this.dataMax, -Number.MAX_VALUE), F(this.series, function(a, d) {
                a.useMapGeometry && (e = Math.min(e, D(a.minX, e)), q = Math.max(q, D(a.maxX, e)), a.xData = t[d], h = !0)
            }), h && (this.dataMin = e, this.dataMax = q))
        });
        a(B.prototype, "setAxisTranslation", function(a) {
            var g = this.chart,
                e = g.plotWidth / g.plotHeight,
                g = g.xAxis[0],
                q;
            a.call(this);
            "yAxis" === this.coll && void 0 !== g.transA && F(this.series, function(a) {
                a.preserveAspectRatio && (q = !0)
            });
            if (q && (this.transA = g.transA = Math.min(this.transA, g.transA), a = e / ((g.max - g.min) /
                    (this.max - this.min)), a = 1 > a ? this : g, e = (a.max - a.min) * a.transA, a.pixelPadding = a.len - e, a.minPixelPadding = a.pixelPadding / 2, e = a.fixTo)) {
                e = e[1] - a.toValue(e[0], !0);
                e *= a.transA;
                if (Math.abs(e) > a.minPixelPadding || a.min === a.dataMin && a.max === a.dataMax) e = 0;
                a.minPixelPadding -= e
            }
        });
        a(B.prototype, "render", function(a) {
            a.call(this);
            this.fixTo = null
        })
    })(K);
    (function(a) {
        var B = a.Axis,
            F = a.Chart,
            D = a.color,
            E, g = a.each,
            e = a.extend,
            q = a.isNumber,
            t = a.Legend,
            h = a.LegendSymbolMixin,
            u = a.noop,
            d = a.merge,
            m = a.pick,
            w = a.wrap;
        E = a.ColorAxis =
            function() {
                this.init.apply(this, arguments)
            };
        e(E.prototype, B.prototype);
        e(E.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {
                    animation: {
                        duration: 50
                    },
                    width: .01,
                    color: "#999999"
                },
                labels: {
                    overflow: "justify"
                },
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            },
            keepProps: ["legendGroup", "legendItem", "legendSymbol"].concat(B.prototype.keepProps),
            init: function(a, e) {
                var f = "vertical" !== a.options.legend.layout,
                    c;
                this.coll = "colorAxis";
                c = d(this.defaultColorAxisOptions, {
                    side: f ? 2 : 1,
                    reversed: !f
                }, e, {
                    opposite: !f,
                    showEmpty: !1,
                    title: null
                });
                B.prototype.init.call(this, a, c);
                e.dataClasses && this.initDataClasses(e);
                this.initStops(e);
                this.horiz = f;
                this.zoomEnabled = !1;
                this.defaultLegendLength = 200
            },
            tweenColors: function(a, d, f) {
                var c;
                d.rgba.length && a.rgba.length ? (a = a.rgba, d = d.rgba, c = 1 !== d[3] || 1 !== a[3], a = (c ? "rgba(" : "rgb(") + Math.round(d[0] + (a[0] - d[0]) * (1 - f)) + "," + Math.round(d[1] + (a[1] - d[1]) * (1 - f)) + "," + Math.round(d[2] + (a[2] - d[2]) *
                    (1 - f)) + (c ? "," + (d[3] + (a[3] - d[3]) * (1 - f)) : "") + ")") : a = d.input || "none";
                return a
            },
            initDataClasses: function(a) {
                var e = this,
                    f = this.chart,
                    c, b = 0,
                    m = f.options.chart.colorCount,
                    h = this.options,
                    n = a.dataClasses.length;
                this.dataClasses = c = [];
                this.legendItems = [];
                g(a.dataClasses, function(a, g) {
                    a = d(a);
                    c.push(a);
                    a.color || ("category" === h.dataClassColor ? (g = f.options.colors, m = g.length, a.color = g[b], a.colorIndex = b, b++, b === m && (b = 0)) : a.color = e.tweenColors(D(h.minColor), D(h.maxColor), 2 > n ? .5 : g / (n - 1)))
                })
            },
            initStops: function(a) {
                this.stops =
                    a.stops || [
                        [0, this.options.minColor],
                        [1, this.options.maxColor]
                    ];
                g(this.stops, function(a) {
                    a.color = D(a[1])
                })
            },
            setOptions: function(a) {
                B.prototype.setOptions.call(this, a);
                this.options.crosshair = this.options.marker
            },
            setAxisSize: function() {
                var a = this.legendSymbol,
                    d = this.chart,
                    e = d.options.legend || {},
                    c, b;
                a ? (this.left = e = a.attr("x"), this.top = c = a.attr("y"), this.width = b = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - e - b, this.bottom = d.chartHeight - c - a, this.len = this.horiz ? b : a, this.pos = this.horiz ?
                    e : c) : this.len = (this.horiz ? e.symbolWidth : e.symbolHeight) || this.defaultLegendLength
            },
            toColor: function(a, d) {
                var e = this.stops,
                    c, b, g = this.dataClasses,
                    k, n;
                if (g)
                    for (n = g.length; n--;) {
                        if (k = g[n], c = k.from, e = k.to, (void 0 === c || a >= c) && (void 0 === e || a <= e)) {
                            b = k.color;
                            d && (d.dataClass = n, d.colorIndex = k.colorIndex);
                            break
                        }
                    } else {
                        this.isLog && (a = this.val2lin(a));
                        a = 1 - (this.max - a) / (this.max - this.min || 1);
                        for (n = e.length; n-- && !(a > e[n][0]););
                        c = e[n] || e[n + 1];
                        e = e[n + 1] || c;
                        a = 1 - (e[0] - a) / (e[0] - c[0] || 1);
                        b = this.tweenColors(c.color, e.color,
                            a)
                    }
                return b
            },
            getOffset: function() {
                var a = this.legendGroup,
                    d = this.chart.axisOffset[this.side];
                a && (this.axisParent = a, B.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = d)
            },
            setLegendColor: function() {
                var a, d = this.options,
                    e = this.reversed;
                a = e ? 1 : 0;
                e = e ? 0 : 1;
                a = this.horiz ? [a, 0, e, 0] : [0, e, 0, a];
                this.legendColor = {
                    linearGradient: {
                        x1: a[0],
                        y1: a[1],
                        x2: a[2],
                        y2: a[3]
                    },
                    stops: d.stops || [
                        [0, d.minColor],
                        [1, d.maxColor]
                    ]
                }
            },
            drawLegendSymbol: function(a,
                d) {
                var e = a.padding,
                    c = a.options,
                    b = this.horiz,
                    g = m(c.symbolWidth, b ? this.defaultLegendLength : 12),
                    k = m(c.symbolHeight, b ? 12 : this.defaultLegendLength),
                    n = m(c.labelPadding, b ? 16 : 30),
                    c = m(c.itemDistance, 10);
                this.setLegendColor();
                d.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, g, k).attr({
                    zIndex: 1
                }).add(d.legendGroup);
                this.legendItemWidth = g + e + (b ? c : n);
                this.legendItemHeight = k + e + (b ? n : 0)
            },
            setState: u,
            visible: !0,
            setVisible: u,
            getSeriesExtremes: function() {
                var a;
                this.series.length && (a = this.series[0], this.dataMin =
                    a.valueMin, this.dataMax = a.valueMax)
            },
            drawCrosshair: function(a, d) {
                var e = d && d.plotX,
                    c = d && d.plotY,
                    b, g = this.pos,
                    k = this.len;
                d && (b = this.toPixels(d[d.series.colorKey]), b < g ? b = g - 2 : b > g + k && (b = g + k + 2), d.plotX = b, d.plotY = this.len - b, B.prototype.drawCrosshair.call(this, a, d), d.plotX = e, d.plotY = c, this.cross && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.attr({
                    fill: this.crosshair.color
                })))
            },
            getPlotLinePath: function(a, d, e, c, b) {
                return q(b) ? this.horiz ? ["M", b - 4, this.top - 6, "L", b + 4, this.top -
                    6, b, this.top, "Z"
                ] : ["M", this.left, b, "L", this.left - 6, b + 6, this.left - 6, b - 6, "Z"] : B.prototype.getPlotLinePath.call(this, a, d, e, c)
            },
            update: function(a, e) {
                var f = this.chart,
                    c = f.legend;
                g(this.series, function(a) {
                    a.isDirtyData = !0
                });
                a.dataClasses && c.allItems && (g(c.allItems, function(a) {
                    a.isDataClass && a.legendGroup.destroy()
                }), f.isDirtyLegend = !0);
                f.options[this.coll] = d(this.userOptions, a);
                B.prototype.update.call(this, a, e);
                this.legendItem && (this.setLegendColor(), c.colorizeItem(this, !0))
            },
            getDataClassLegendSymbols: function() {
                var d =
                    this,
                    k = this.chart,
                    f = this.legendItems,
                    c = k.options.legend,
                    b = c.valueDecimals,
                    m = c.valueSuffix || "",
                    r;
                f.length || g(this.dataClasses, function(c, p) {
                    var n = !0,
                        v = c.from,
                        q = c.to;
                    r = "";
                    void 0 === v ? r = "\x3c " : void 0 === q && (r = "\x3e ");
                    void 0 !== v && (r += a.numberFormat(v, b) + m);
                    void 0 !== v && void 0 !== q && (r += " - ");
                    void 0 !== q && (r += a.numberFormat(q, b) + m);
                    f.push(e({
                        chart: k,
                        name: r,
                        options: {},
                        drawLegendSymbol: h.drawRectangle,
                        visible: !0,
                        setState: u,
                        isDataClass: !0,
                        setVisible: function() {
                            n = this.visible = !n;
                            g(d.series, function(a) {
                                g(a.points,
                                    function(a) {
                                        a.dataClass === p && a.setVisible(n)
                                    })
                            });
                            k.legend.colorizeItem(this, n)
                        }
                    }, c))
                });
                return f
            },
            name: ""
        });
        g(["fill", "stroke"], function(d) {
            a.Fx.prototype[d + "Setter"] = function() {
                this.elem.attr(d, E.prototype.tweenColors(D(this.start), D(this.end), this.pos), null, !0)
            }
        });
        w(F.prototype, "getAxes", function(a) {
            var d = this.options.colorAxis;
            a.call(this);
            this.colorAxis = [];
            d && new E(this, d)
        });
        w(t.prototype, "getAllItems", function(a) {
            var d = [],
                e = this.chart.colorAxis[0];
            e && e.options && (e.options.showInLegend && (e.options.dataClasses ?
                d = d.concat(e.getDataClassLegendSymbols()) : d.push(e)), g(e.series, function(a) {
                a.options.showInLegend = !1
            }));
            return d.concat(a.call(this))
        });
        w(t.prototype, "colorizeItem", function(a, d, e) {
            a.call(this, d, e);
            e && d.legendColor && d.legendSymbol.attr({
                fill: d.legendColor
            })
        })
    })(K);
    (function(a) {
        var B = a.defined,
            F = a.each,
            D = a.noop,
            E = a.seriesTypes;
        a.colorPointMixin = {
            isValid: function() {
                return null !== this.value
            },
            setVisible: function(a) {
                var e = this,
                    g = a ? "show" : "hide";
                F(["graphic", "dataLabel"], function(a) {
                    if (e[a]) e[a][g]()
                })
            }
        };
        a.colorSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"],
            optionalAxis: "colorAxis",
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: D,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: E.column.prototype.pointAttribs,
            translateColors: function() {
                var a = this,
                    e = this.options.nullColor,
                    q = this.colorAxis,
                    t = this.colorKey;
                F(this.data, function(g) {
                    var h = g[t];
                    if (h = g.options.color || (g.isNull ? e : q && void 0 !== h ? q.toColor(h, g) : g.color || a.color)) g.color = h
                })
            },
            colorAttribs: function(a) {
                var e = {};
                B(a.color) && (e[this.colorProp || "fill"] = a.color);
                return e
            }
        }
    })(K);
    (function(a) {
        var B = a.color,
            F = a.ColorAxis,
            D = a.colorPointMixin,
            E = a.each,
            g = a.extend,
            e = a.isNumber,
            q = a.map,
            t = a.merge,
            h = a.noop,
            u = a.pick,
            d = a.isArray,
            m = a.Point,
            w = a.Series,
            p = a.seriesType,
            k = a.seriesTypes,
            f = a.splat,
            c = void 0 !== a.doc.documentElement.style.vectorEffect;
        p("map", "scatter", {
            allAreas: !0,
            animation: !1,
            nullColor: "#f7f7f7",
            borderColor: "#cccccc",
            borderWidth: 1,
            marker: null,
            stickyTracking: !1,
            joinBy: "hc-key",
            dataLabels: {
                formatter: function() {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            turboThreshold: 0,
            tooltip: {
                followPointer: !0,
                pointFormat: "{point.name}: {point.value}\x3cbr/\x3e"
            },
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    brightness: .2,
                    halo: null
                },
                select: {
                    color: "#cccccc"
                }
            }
        }, t(a.colorSeriesMixin, {
            type: "map",
            supportsDrilldown: !0,
            getExtremesFromAll: !0,
            useMapGeometry: !0,
            forceDL: !0,
            searchPoint: h,
            directTouch: !0,
            preserveAspectRatio: !0,
            pointArrayMap: ["value"],
            getBox: function(b) {
                var c = Number.MAX_VALUE,
                    d = -c,
                    f = c,
                    g = -c,
                    k = c,
                    m = c,
                    h = this.xAxis,
                    p = this.yAxis,
                    q;
                E(b || [], function(b) {
                    if (b.path) {
                        "string" === typeof b.path && (b.path = a.splitPath(b.path));
                        var n = b.path || [],
                            h = n.length,
                            l = !1,
                            r = -c,
                            p = c,
                            v = -c,
                            t = c,
                            w = b.properties;
                        if (!b._foundBox) {
                            for (; h--;) e(n[h]) && (l ? (r = Math.max(r, n[h]), p = Math.min(p, n[h])) : (v = Math.max(v, n[h]), t = Math.min(t, n[h])), l = !l);
                            b._midX = p + (r - p) * (b.middleX || w && w["hc-middle-x"] || .5);
                            b._midY = t + (v - t) * (b.middleY || w && w["hc-middle-y"] || .5);
                            b._maxX = r;
                            b._minX = p;
                            b._maxY = v;
                            b._minY = t;
                            b.labelrank = u(b.labelrank, (r - p) * (v - t));
                            b._foundBox = !0
                        }
                        d = Math.max(d,
                            b._maxX);
                        f = Math.min(f, b._minX);
                        g = Math.max(g, b._maxY);
                        k = Math.min(k, b._minY);
                        m = Math.min(b._maxX - b._minX, b._maxY - b._minY, m);
                        q = !0
                    }
                });
                q && (this.minY = Math.min(k, u(this.minY, c)), this.maxY = Math.max(g, u(this.maxY, -c)), this.minX = Math.min(f, u(this.minX, c)), this.maxX = Math.max(d, u(this.maxX, -c)), h && void 0 === h.options.minRange && (h.minRange = Math.min(5 * m, (this.maxX - this.minX) / 5, h.minRange || c)), p && void 0 === p.options.minRange && (p.minRange = Math.min(5 * m, (this.maxY - this.minY) / 5, p.minRange || c)))
            },
            getExtremes: function() {
                w.prototype.getExtremes.call(this,
                    this.valueData);
                this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                this.dataMin = this.minY;
                this.dataMax = this.maxY
            },
            translatePath: function(a) {
                var b = !1,
                    c = this.xAxis,
                    d = this.yAxis,
                    f = c.min,
                    g = c.transA,
                    c = c.minPixelPadding,
                    k = d.min,
                    m = d.transA,
                    d = d.minPixelPadding,
                    h, p = [];
                if (a)
                    for (h = a.length; h--;) e(a[h]) ? (p[h] = b ? (a[h] - f) * g + c : (a[h] - k) * m + d, b = !b) : p[h] = a[h];
                return p
            },
            setData: function(b, c, g, n) {
                var k = this.options,
                    m = this.chart.options.chart,
                    h = m && m.map,
                    r = k.mapData,
                    p = k.joinBy,
                    u = null === p,
                    A = k.keys || this.pointArrayMap,
                    C = [],
                    B = {},
                    l, x = this.chart.mapTransforms;
                !r && h && (r = "string" === typeof h ? a.maps[h] : h);
                u && (p = "_i");
                p = this.joinBy = f(p);
                p[1] || (p[1] = p[0]);
                b && E(b, function(a, c) {
                    var f = 0;
                    if (e(a)) b[c] = {
                        value: a
                    };
                    else if (d(a)) {
                        b[c] = {};
                        !k.keys && a.length > A.length && "string" === typeof a[0] && (b[c]["hc-key"] = a[0], ++f);
                        for (var g = 0; g < A.length; ++g, ++f) A[g] && (b[c][A[g]] = a[f])
                    }
                    u && (b[c]._i = c)
                });
                this.getBox(b);
                if (this.chart.mapTransforms = x = m && m.mapTransforms || r && r["hc-transform"] ||
                    x)
                    for (l in x) x.hasOwnProperty(l) && l.rotation && (l.cosAngle = Math.cos(l.rotation), l.sinAngle = Math.sin(l.rotation));
                if (r) {
                    "FeatureCollection" === r.type && (this.mapTitle = r.title, r = a.geojson(r, this.type, this));
                    this.mapData = r;
                    this.mapMap = {};
                    for (l = 0; l < r.length; l++) m = r[l], h = m.properties, m._i = l, p[0] && h && h[p[0]] && (m[p[0]] = h[p[0]]), B[m[p[0]]] = m;
                    this.mapMap = B;
                    b && p[1] && E(b, function(a) {
                        B[a[p[1]]] && C.push(B[a[p[1]]])
                    });
                    k.allAreas ? (this.getBox(r), b = b || [], p[1] && E(b, function(a) {
                        C.push(a[p[1]])
                    }), C = "|" + q(C, function(a) {
                        return a &&
                            a[p[0]]
                    }).join("|") + "|", E(r, function(a) {
                        p[0] && -1 !== C.indexOf("|" + a[p[0]] + "|") || (b.push(t(a, {
                            value: null
                        })), n = !1)
                    })) : this.getBox(C)
                }
                w.prototype.setData.call(this, b, c, g, n)
            },
            drawGraph: h,
            drawDataLabels: h,
            doFullTranslate: function() {
                return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans
            },
            translate: function() {
                var a = this,
                    c = a.xAxis,
                    d = a.yAxis,
                    e = a.doFullTranslate();
                a.generatePoints();
                E(a.data, function(b) {
                    b.plotX = c.toPixels(b._midX, !0);
                    b.plotY = d.toPixels(b._midY, !0);
                    e && (b.shapeType =
                        "path", b.shapeArgs = {
                            d: a.translatePath(b.path)
                        })
                });
                a.translateColors()
            },
            pointAttribs: function(a, d) {
                d = k.column.prototype.pointAttribs.call(this, a, d);
                a.isFading && delete d.fill;
                c ? d["vector-effect"] = "non-scaling-stroke" : d["stroke-width"] = "inherit";
                return d
            },
            drawPoints: function() {
                var a = this,
                    d = a.xAxis,
                    e = a.yAxis,
                    f = a.group,
                    g = a.chart,
                    m = g.renderer,
                    h, p, u, q, t = this.baseTrans,
                    w, B, l, x, D;
                a.transformGroup || (a.transformGroup = m.g().attr({
                    scaleX: 1,
                    scaleY: 1
                }).add(f), a.transformGroup.survive = !0);
                a.doFullTranslate() ? (g.hasRendered &&
                    E(a.points, function(b) {
                        b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill)
                    }), a.group = a.transformGroup, k.column.prototype.drawPoints.apply(a), a.group = f, E(a.points, function(a) {
                        a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase()), a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()))
                    }), this.baseTrans = {
                        originX: d.min - d.minPixelPadding / d.transA,
                        originY: e.min - e.minPixelPadding / e.transA + (e.reversed ?
                            0 : e.len / e.transA),
                        transAX: d.transA,
                        transAY: e.transA
                    }, this.transformGroup.animate({
                        translateX: 0,
                        translateY: 0,
                        scaleX: 1,
                        scaleY: 1
                    })) : (h = d.transA / t.transAX, p = e.transA / t.transAY, u = d.toPixels(t.originX, !0), q = e.toPixels(t.originY, !0), .99 < h && 1.01 > h && .99 < p && 1.01 > p && (p = h = 1, u = Math.round(u), q = Math.round(q)), w = this.transformGroup, g.renderer.globalAnimation ? (B = w.attr("translateX"), l = w.attr("translateY"), x = w.attr("scaleX"), D = w.attr("scaleY"), w.attr({
                    animator: 0
                }).animate({
                    animator: 1
                }, {
                    step: function(a, b) {
                        w.attr({
                            translateX: B +
                                (u - B) * b.pos,
                            translateY: l + (q - l) * b.pos,
                            scaleX: x + (h - x) * b.pos,
                            scaleY: D + (p - D) * b.pos
                        })
                    }
                })) : w.attr({
                    translateX: u,
                    translateY: q,
                    scaleX: h,
                    scaleY: p
                }));
                c || a.group.element.setAttribute("stroke-width", a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"] / (h || 1));
                this.drawMapDataLabels()
            },
            drawMapDataLabels: function() {
                w.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            },
            render: function() {
                var a = this,
                    c = w.prototype.render;
                a.chart.renderer.isVML &&
                    3E3 < a.data.length ? setTimeout(function() {
                        c.call(a)
                    }) : c.call(a)
            },
            animate: function(a) {
                var b = this.options.animation,
                    c = this.group,
                    d = this.xAxis,
                    e = this.yAxis,
                    f = d.pos,
                    g = e.pos;
                this.chart.renderer.isSVG && (!0 === b && (b = {
                    duration: 1E3
                }), a ? c.attr({
                    translateX: f + d.len / 2,
                    translateY: g + e.len / 2,
                    scaleX: .001,
                    scaleY: .001
                }) : (c.animate({
                    translateX: f,
                    translateY: g,
                    scaleX: 1,
                    scaleY: 1
                }, b), this.animate = null))
            },
            animateDrilldown: function(a) {
                var b = this.chart.plotBox,
                    c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    d = c.bBox,
                    e = this.chart.options.drilldown.animation;
                a || (a = Math.min(d.width / b.width, d.height / b.height), c.shapeArgs = {
                    scaleX: a,
                    scaleY: a,
                    translateX: d.x,
                    translateY: d.y
                }, E(this.points, function(a) {
                    a.graphic && a.graphic.attr(c.shapeArgs).animate({
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 0,
                        translateY: 0
                    }, e)
                }), this.animate = null)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            animateDrillupFrom: function(a) {
                k.column.prototype.animateDrillupFrom.call(this, a)
            },
            animateDrillupTo: function(a) {
                k.column.prototype.animateDrillupTo.call(this,
                    a)
            }
        }), g({
            applyOptions: function(a, c) {
                a = m.prototype.applyOptions.call(this, a, c);
                c = this.series;
                var b = c.joinBy;
                c.mapData && ((b = void 0 !== a[b[1]] && c.mapMap[a[b[1]]]) ? (c.xyFromShape && (a.x = b._midX, a.y = b._midY), g(a, b)) : a.value = a.value || null);
                return a
            },
            onMouseOver: function(a) {
                clearTimeout(this.colorInterval);
                if (null !== this.value) m.prototype.onMouseOver.call(this, a);
                else this.series.onMouseOut(a)
            },
            onMouseOut: function() {
                var a = this,
                    c = +new Date,
                    d = B(this.series.pointAttribs(a).fill),
                    e = B(this.series.pointAttribs(a,
                        "hover").fill),
                    f = a.series.options.states.normal.animation,
                    g = f && (f.duration || 500);
                g && 4 === d.rgba.length && 4 === e.rgba.length && "select" !== a.state && (clearTimeout(a.colorInterval), a.colorInterval = setInterval(function() {
                    var b = (new Date - c) / g,
                        f = a.graphic;
                    1 < b && (b = 1);
                    f && f.attr("fill", F.prototype.tweenColors.call(0, e, d, b));
                    1 <= b && clearTimeout(a.colorInterval)
                }, 13), a.isFading = !0);
                m.prototype.onMouseOut.call(a);
                a.isFading = null
            },
            zoomTo: function() {
                var a = this.series;
                a.xAxis.setExtremes(this._minX, this._maxX, !1);
                a.yAxis.setExtremes(this._minY,
                    this._maxY, !1);
                a.chart.redraw()
            }
        }, D))
    })(K);
    (function(a) {
        function B(a) {
            a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }
        var F = a.addEvent,
            D = a.Chart,
            E = a.doc,
            g = a.each,
            e = a.extend,
            q = a.merge,
            t = a.pick;
        a = a.wrap;
        e(D.prototype, {
            renderMapNavigation: function() {
                var a = this,
                    g = this.options.mapNavigation,
                    d = g.buttons,
                    m, w, p, k, f, c = function(b) {
                        this.handler.call(a, b);
                        B(b)
                    };
                if (t(g.enableButtons, g.enabled) && !a.renderer.forExport)
                    for (m in a.mapNavButtons = [], d) d.hasOwnProperty(m) &&
                        (p = q(g.buttonOptions, d[m]), w = p.theme, w.style = q(p.theme.style, p.style), f = (k = w.states) && k.hover, k = k && k.select, w = a.renderer.button(p.text, 0, 0, c, w, f, k, 0, "zoomIn" === m ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation").attr({
                            width: p.width,
                            height: p.height,
                            title: a.options.lang[m],
                            padding: p.padding,
                            zIndex: 5
                        }).add(), w.handler = p.onclick, w.align(e(p, {
                            width: w.width,
                            height: 2 * w.height
                        }), null, p.alignTo), F(w.element, "dblclick", B), a.mapNavButtons.push(w))
            },
            fitToBox: function(a, e) {
                g([
                    ["x", "width"],
                    ["y",
                        "height"
                    ]
                ], function(d) {
                    var g = d[0];
                    d = d[1];
                    a[g] + a[d] > e[g] + e[d] && (a[d] > e[d] ? (a[d] = e[d], a[g] = e[g]) : a[g] = e[g] + e[d] - a[d]);
                    a[d] > e[d] && (a[d] = e[d]);
                    a[g] < e[g] && (a[g] = e[g])
                });
                return a
            },
            mapZoom: function(a, e, d, g, q) {
                var m = this.xAxis[0],
                    k = m.max - m.min,
                    f = t(e, m.min + k / 2),
                    c = k * a,
                    k = this.yAxis[0],
                    b = k.max - k.min,
                    h = t(d, k.min + b / 2),
                    b = b * a,
                    f = this.fitToBox({
                        x: f - c * (g ? (g - m.pos) / m.len : .5),
                        y: h - b * (q ? (q - k.pos) / k.len : .5),
                        width: c,
                        height: b
                    }, {
                        x: m.dataMin,
                        y: k.dataMin,
                        width: m.dataMax - m.dataMin,
                        height: k.dataMax - k.dataMin
                    }),
                    c = f.x <= m.dataMin &&
                    f.width >= m.dataMax - m.dataMin && f.y <= k.dataMin && f.height >= k.dataMax - k.dataMin;
                g && (m.fixTo = [g - m.pos, e]);
                q && (k.fixTo = [q - k.pos, d]);
                void 0 === a || c ? (m.setExtremes(void 0, void 0, !1), k.setExtremes(void 0, void 0, !1)) : (m.setExtremes(f.x, f.x + f.width, !1), k.setExtremes(f.y, f.y + f.height, !1));
                this.redraw()
            }
        });
        a(D.prototype, "render", function(a) {
            var e = this,
                d = e.options.mapNavigation;
            e.renderMapNavigation();
            a.call(e);
            (t(d.enableDoubleClickZoom, d.enabled) || d.enableDoubleClickZoomTo) && F(e.container, "dblclick", function(a) {
                e.pointer.onContainerDblClick(a)
            });
            t(d.enableMouseWheelZoom, d.enabled) && F(e.container, void 0 === E.onmousewheel ? "DOMMouseScroll" : "mousewheel", function(a) {
                e.pointer.onContainerMouseWheel(a);
                B(a);
                return !1
            })
        })
    })(K);
    (function(a) {
        var B = a.extend,
            F = a.pick,
            D = a.Pointer;
        a = a.wrap;
        B(D.prototype, {
            onContainerDblClick: function(a) {
                var g = this.chart;
                a = this.normalize(a);
                g.options.mapNavigation.enableDoubleClickZoomTo ? g.pointer.inClass(a.target, "highcharts-tracker") && g.hoverPoint && g.hoverPoint.zoomTo() : g.isInsidePlot(a.chartX - g.plotLeft, a.chartY - g.plotTop) &&
                    g.mapZoom(.5, g.xAxis[0].toValue(a.chartX), g.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            },
            onContainerMouseWheel: function(a) {
                var g = this.chart,
                    e;
                a = this.normalize(a);
                e = a.detail || -(a.wheelDelta / 120);
                g.isInsidePlot(a.chartX - g.plotLeft, a.chartY - g.plotTop) && g.mapZoom(Math.pow(g.options.mapNavigation.mouseWheelSensitivity, e), g.xAxis[0].toValue(a.chartX), g.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            }
        });
        a(D.prototype, "zoomOption", function(a) {
            var g = this.chart.options.mapNavigation;
            F(g.enableTouchZoom, g.enabled) &&
                (this.chart.options.chart.pinchType = "xy");
            a.apply(this, [].slice.call(arguments, 1))
        });
        a(D.prototype, "pinchTranslate", function(a, g, e, q, t, h, u) {
            a.call(this, g, e, q, t, h, u);
            "map" === this.chart.options.chart.type && this.hasZoom && (a = q.scaleX > q.scaleY, this.pinchTranslateDirection(!a, g, e, q, t, h, u, a ? q.scaleX : q.scaleY))
        })
    })(K);
    (function(a) {
        var B = a.seriesType,
            F = a.seriesTypes;
        B("mapline", "map", {
            lineWidth: 1,
            fillColor: "none"
        }, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointAttribs: function(a, B) {
                a = F.map.prototype.pointAttribs.call(this, a, B);
                a.fill = this.options.fillColor;
                return a
            },
            drawLegendSymbol: F.line.prototype.drawLegendSymbol
        })
    })(K);
    (function(a) {
        var B = a.merge,
            F = a.Point;
        a = a.seriesType;
        a("mappoint", "scatter", {
            dataLabels: {
                enabled: !0,
                formatter: function() {
                    return this.point.name
                },
                crop: !1,
                defer: !1,
                overflow: !1,
                style: {
                    color: "#000000"
                }
            }
        }, {
            type: "mappoint",
            forceDL: !0
        }, {
            applyOptions: function(a, E) {
                a = void 0 !== a.lat && void 0 !== a.lon ? B(a, this.series.chart.fromLatLonToPoint(a)) :
                    a;
                return F.prototype.applyOptions.call(this, a, E)
            }
        })
    })(K);
    (function(a) {
        var B = a.arrayMax,
            F = a.arrayMin,
            D = a.Axis,
            E = a.color,
            g = a.each,
            e = a.isNumber,
            q = a.noop,
            t = a.pick,
            h = a.pInt,
            u = a.Point,
            d = a.Series,
            m = a.seriesType,
            w = a.seriesTypes;
        m("bubble", "scatter", {
            dataLabels: {
                formatter: function() {
                    return this.point.z
                },
                inside: !0,
                verticalAlign: "middle"
            },
            marker: {
                lineColor: null,
                lineWidth: 1,
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                }
            },
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: "({point.x}, {point.y}), Size: {point.z}"
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            bubblePadding: !0,
            zoneAxis: "z",
            markerAttribs: q,
            pointAttribs: function(a, e) {
                var f = t(this.options.marker.fillOpacity, .5);
                a = d.prototype.pointAttribs.call(this, a, e);
                1 !== f && (a.fill = E(a.fill).setOpacity(f).get("rgba"));
                return a
            },
            getRadii: function(a, d, e, c) {
                var b, f, g, m = this.zData,
                    k = [],
                    h = this.options,
                    p = "width" !== h.sizeBy,
                    q = h.zThreshold,
                    u = d - a;
                f = 0;
                for (b = m.length; f < b; f++) g =
                    m[f], h.sizeByAbsoluteValue && null !== g && (g = Math.abs(g - q), d = Math.max(d - q, Math.abs(a - q)), a = 0), null === g ? g = null : g < a ? g = e / 2 - 1 : (g = 0 < u ? (g - a) / u : .5, p && 0 <= g && (g = Math.sqrt(g)), g = Math.ceil(e + g * (c - e)) / 2), k.push(g);
                this.radii = k
            },
            animate: function(a) {
                var d = this.options.animation;
                a || (g(this.points, function(a) {
                    var c = a.graphic;
                    a = a.shapeArgs;
                    c && a && (c.attr("r", 1), c.animate({
                        r: a.r
                    }, d))
                }), this.animate = null)
            },
            translate: function() {
                var a, d = this.data,
                    f, c, b = this.radii;
                w.scatter.prototype.translate.call(this);
                for (a = d.length; a--;) f =
                    d[a], c = b ? b[a] : 0, e(c) && c >= this.minPxSize / 2 ? (f.shapeType = "circle", f.shapeArgs = {
                        x: f.plotX,
                        y: f.plotY,
                        r: c
                    }, f.dlBox = {
                        x: f.plotX - c,
                        y: f.plotY - c,
                        width: 2 * c,
                        height: 2 * c
                    }) : f.shapeArgs = f.plotY = f.dlBox = void 0
            },
            drawLegendSymbol: function(a, d) {
                var e = this.chart.renderer,
                    c = e.fontMetrics(a.itemStyle && a.itemStyle.fontSize, d.legendItem).f / 2;
                d.legendSymbol = e.circle(c, a.baseline - c, c).attr({
                    zIndex: 3
                }).add(d.legendGroup);
                d.legendSymbol.isMarker = !0
            },
            drawPoints: w.column.prototype.drawPoints,
            alignDataLabel: w.column.prototype.alignDataLabel,
            buildKDTree: q,
            applyZones: q
        }, {
            haloPath: function(a) {
                return u.prototype.haloPath.call(this, this.shapeArgs.r + a)
            },
            ttBelow: !1
        });
        D.prototype.beforePadding = function() {
            var a = this,
                d = this.len,
                f = this.chart,
                c = 0,
                b = d,
                m = this.isXAxis,
                r = m ? "xData" : "yData",
                n = this.min,
                q = {},
                u = Math.min(f.plotWidth, f.plotHeight),
                w = Number.MAX_VALUE,
                H = -Number.MAX_VALUE,
                D = this.max - n,
                E = d / D,
                A = [];
            g(this.series, function(b) {
                var c = b.options;
                !b.bubblePadding || !b.visible && f.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, A.push(b), m && (g(["minSize",
                    "maxSize"
                ], function(a) {
                    var b = c[a],
                        d = /%$/.test(b),
                        b = h(b);
                    q[a] = d ? u * b / 100 : b
                }), b.minPxSize = q.minSize, b.maxPxSize = Math.max(q.maxSize, q.minSize), b = b.zData, b.length && (w = t(c.zMin, Math.min(w, Math.max(F(b), !1 === c.displayNegative ? c.zThreshold : -Number.MAX_VALUE))), H = t(c.zMax, Math.max(H, B(b))))))
            });
            g(A, function(d) {
                var f = d[r],
                    g = f.length,
                    k;
                m && d.getRadii(w, H, d.minPxSize, d.maxPxSize);
                if (0 < D)
                    for (; g--;) e(f[g]) && a.dataMin <= f[g] && f[g] <= a.dataMax && (k = d.radii[g], c = Math.min((f[g] - n) * E - k, c), b = Math.max((f[g] - n) * E + k, b))
            });
            A.length && 0 < D && !this.isLog && (b -= d, E *= (d + c - b) / d, g([
                ["min", "userMin", c],
                ["max", "userMax", b]
            ], function(b) {
                void 0 === t(a.options[b[0]], a[b[1]]) && (a[b[0]] += b[2] / E)
            }))
        }
    })(K);
    (function(a) {
        var B = a.merge,
            F = a.Point,
            D = a.seriesType,
            E = a.seriesTypes;
        E.bubble && D("mapbubble", "bubble", {
            animationLimit: 500,
            tooltip: {
                pointFormat: "{point.name}: {point.z}"
            }
        }, {
            xyFromShape: !0,
            type: "mapbubble",
            pointArrayMap: ["z"],
            getMapData: E.map.prototype.getMapData,
            getBox: E.map.prototype.getBox,
            setData: E.map.prototype.setData
        }, {
            applyOptions: function(a,
                e) {
                return a && void 0 !== a.lat && void 0 !== a.lon ? F.prototype.applyOptions.call(this, B(a, this.series.chart.fromLatLonToPoint(a)), e) : E.map.prototype.pointClass.prototype.applyOptions.call(this, a, e)
            },
            ttBelow: !1
        })
    })(K);
    (function(a) {
        function B(a, d) {
            var e, g, h, k = !1,
                f = a.x,
                c = a.y;
            a = 0;
            for (e = d.length - 1; a < d.length; e = a++) g = d[a][1] > c, h = d[e][1] > c, g !== h && f < (d[e][0] - d[a][0]) * (c - d[a][1]) / (d[e][1] - d[a][1]) + d[a][0] && (k = !k);
            return k
        }
        var F = a.Chart,
            D = a.each,
            E = a.extend,
            g = a.error,
            e = a.format,
            q = a.merge,
            t = a.win,
            h = a.wrap;
        F.prototype.transformFromLatLon =
            function(a, d) {
                if (void 0 === t.proj4) return g(21), {
                    x: 0,
                    y: null
                };
                a = t.proj4(d.crs, [a.lon, a.lat]);
                var e = d.cosAngle || d.rotation && Math.cos(d.rotation),
                    h = d.sinAngle || d.rotation && Math.sin(d.rotation);
                a = d.rotation ? [a[0] * e + a[1] * h, -a[0] * h + a[1] * e] : a;
                return {
                    x: ((a[0] - (d.xoffset || 0)) * (d.scale || 1) + (d.xpan || 0)) * (d.jsonres || 1) + (d.jsonmarginX || 0),
                    y: (((d.yoffset || 0) - a[1]) * (d.scale || 1) + (d.ypan || 0)) * (d.jsonres || 1) - (d.jsonmarginY || 0)
                }
            };
        F.prototype.transformToLatLon = function(a, d) {
            if (void 0 === t.proj4) g(21);
            else {
                a = {
                    x: ((a.x - (d.jsonmarginX ||
                        0)) / (d.jsonres || 1) - (d.xpan || 0)) / (d.scale || 1) + (d.xoffset || 0),
                    y: ((-a.y - (d.jsonmarginY || 0)) / (d.jsonres || 1) + (d.ypan || 0)) / (d.scale || 1) + (d.yoffset || 0)
                };
                var e = d.cosAngle || d.rotation && Math.cos(d.rotation),
                    h = d.sinAngle || d.rotation && Math.sin(d.rotation);
                d = t.proj4(d.crs, "WGS84", d.rotation ? {
                    x: a.x * e + a.y * -h,
                    y: a.x * h + a.y * e
                } : a);
                return {
                    lat: d.y,
                    lon: d.x
                }
            }
        };
        F.prototype.fromPointToLatLon = function(a) {
            var d = this.mapTransforms,
                e;
            if (d) {
                for (e in d)
                    if (d.hasOwnProperty(e) && d[e].hitZone && B({
                            x: a.x,
                            y: -a.y
                        }, d[e].hitZone.coordinates[0])) return this.transformToLatLon(a,
                        d[e]);
                return this.transformToLatLon(a, d["default"])
            }
            g(22)
        };
        F.prototype.fromLatLonToPoint = function(a) {
            var d = this.mapTransforms,
                e, h;
            if (!d) return g(22), {
                x: 0,
                y: null
            };
            for (e in d)
                if (d.hasOwnProperty(e) && d[e].hitZone && (h = this.transformFromLatLon(a, d[e]), B({
                        x: h.x,
                        y: -h.y
                    }, d[e].hitZone.coordinates[0]))) return h;
            return this.transformFromLatLon(a, d["default"])
        };
        a.geojson = function(a, d, g) {
            var h = [],
                m = [],
                k = function(a) {
                    var c, b = a.length;
                    m.push("M");
                    for (c = 0; c < b; c++) 1 === c && m.push("L"), m.push(a[c][0], -a[c][1])
                };
            d = d ||
                "map";
            D(a.features, function(a) {
                var c = a.geometry,
                    b = c.type,
                    c = c.coordinates;
                a = a.properties;
                var e;
                m = [];
                "map" === d || "mapbubble" === d ? ("Polygon" === b ? (D(c, k), m.push("Z")) : "MultiPolygon" === b && (D(c, function(a) {
                    D(a, k)
                }), m.push("Z")), m.length && (e = {
                    path: m
                })) : "mapline" === d ? ("LineString" === b ? k(c) : "MultiLineString" === b && D(c, k), m.length && (e = {
                    path: m
                })) : "mappoint" === d && "Point" === b && (e = {
                    x: c[0],
                    y: -c[1]
                });
                e && h.push(E(e, {
                    name: a.name || a.NAME,
                    properties: a
                }))
            });
            g && a.copyrightShort && (g.chart.mapCredits = e(g.chart.options.credits.mapText, {
                geojson: a
            }), g.chart.mapCreditsFull = e(g.chart.options.credits.mapTextFull, {
                geojson: a
            }));
            return h
        };
        h(F.prototype, "addCredits", function(a, d) {
            d = q(!0, this.options.credits, d);
            this.mapCredits && (d.href = null);
            a.call(this, d);
            this.credits && this.mapCreditsFull && this.credits.attr({
                title: this.mapCreditsFull
            })
        })
    })(K);
    (function(a) {
        function B(a, e, g, h, k, f, c, b) {
            return ["M", a + k, e, "L", a + g - f, e, "C", a + g - f / 2, e, a + g, e + f / 2, a + g, e + f, "L", a + g, e + h - c, "C", a + g, e + h - c / 2, a + g - c / 2, e + h, a + g - c, e + h, "L", a + b, e + h, "C", a + b / 2, e + h, a, e + h - b / 2, a, e + h -
                b, "L", a, e + k, "C", a, e + k / 2, a + k / 2, e, a + k, e, "Z"
            ]
        }
        var F = a.Chart,
            D = a.defaultOptions,
            E = a.each,
            g = a.extend,
            e = a.merge,
            q = a.pick,
            t = a.Renderer,
            h = a.SVGRenderer,
            u = a.VMLRenderer;
        g(D.lang, {
            zoomIn: "Zoom in",
            zoomOut: "Zoom out"
        });
        D.mapNavigation = {
            buttonOptions: {
                alignTo: "plotBox",
                align: "left",
                verticalAlign: "top",
                x: 0,
                width: 18,
                height: 18,
                padding: 5,
                style: {
                    fontSize: "15px",
                    fontWeight: "bold"
                },
                theme: {
                    "stroke-width": 1,
                    "text-align": "center"
                }
            },
            buttons: {
                zoomIn: {
                    onclick: function() {
                        this.mapZoom(.5)
                    },
                    text: "+",
                    y: 0
                },
                zoomOut: {
                    onclick: function() {
                        this.mapZoom(2)
                    },
                    text: "-",
                    y: 28
                }
            },
            mouseWheelSensitivity: 1.1
        };
        a.splitPath = function(a) {
            var d;
            a = a.replace(/([A-Za-z])/g, " $1 ");
            a = a.replace(/^\s*/, "").replace(/\s*$/, "");
            a = a.split(/[ ,]+/);
            for (d = 0; d < a.length; d++) /[a-zA-Z]/.test(a[d]) || (a[d] = parseFloat(a[d]));
            return a
        };
        a.maps = {};
        h.prototype.symbols.topbutton = function(a, e, g, h, k) {
            return B(a - 1, e - 1, g, h, k.r, k.r, 0, 0)
        };
        h.prototype.symbols.bottombutton = function(a, e, g, h, k) {
            return B(a - 1, e - 1, g, h, 0, 0, k.r, k.r)
        };
        t === u && E(["topbutton", "bottombutton"], function(a) {
            u.prototype.symbols[a] =
                h.prototype.symbols[a]
        });
        a.Map = a.mapChart = function(d, g, h) {
            var m = "string" === typeof d || d.nodeName,
                k = arguments[m ? 1 : 0],
                f = {
                    endOnTick: !1,
                    visible: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    startOnTick: !1
                },
                c, b = a.getOptions().credits;
            c = k.series;
            k.series = null;
            k = e({
                    chart: {
                        panning: "xy",
                        type: "map"
                    },
                    credits: {
                        mapText: q(b.mapText, ' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),
                        mapTextFull: q(b.mapTextFull, "{geojson.copyright}")
                    },
                    tooltip: {
                        followTouchMove: !1
                    },
                    xAxis: f,
                    yAxis: e(f, {
                        reversed: !0
                    })
                },
                k, {
                    chart: {
                        inverted: !1,
                        alignTicks: !1
                    }
                });
            k.series = c;
            return m ? new F(d, k, h) : new F(k, g)
        }
    })(K);
    (function(a) {
        var B = a.colorPointMixin,
            F = a.each,
            D = a.merge,
            E = a.noop,
            g = a.pick,
            e = a.Series,
            q = a.seriesType,
            t = a.seriesTypes;
        q("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: {
                formatter: function() {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            marker: null,
            pointRange: null,
            tooltip: {
                pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e"
            },
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    halo: !1,
                    brightness: .2
                }
            }
        }, D(a.colorSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            supportsDrilldown: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function() {
                var a;
                t.scatter.prototype.init.apply(this, arguments);
                a = this.options;
                a.pointRange = g(a.pointRange, a.colsize || 1);
                this.yAxis.axisPointRange = a.rowsize || 1
            },
            translate: function() {
                var a = this.options,
                    e = this.xAxis,
                    d = this.yAxis,
                    g = function(a, d, e) {
                        return Math.min(Math.max(d, a), e)
                    };
                this.generatePoints();
                F(this.points, function(h) {
                    var m =
                        (a.colsize || 1) / 2,
                        k = (a.rowsize || 1) / 2,
                        f = g(Math.round(e.len - e.translate(h.x - m, 0, 1, 0, 1)), -e.len, 2 * e.len),
                        m = g(Math.round(e.len - e.translate(h.x + m, 0, 1, 0, 1)), -e.len, 2 * e.len),
                        c = g(Math.round(d.translate(h.y - k, 0, 1, 0, 1)), -d.len, 2 * d.len),
                        k = g(Math.round(d.translate(h.y + k, 0, 1, 0, 1)), -d.len, 2 * d.len);
                    h.plotX = h.clientX = (f + m) / 2;
                    h.plotY = (c + k) / 2;
                    h.shapeType = "rect";
                    h.shapeArgs = {
                        x: Math.min(f, m),
                        y: Math.min(c, k),
                        width: Math.abs(m - f),
                        height: Math.abs(k - c)
                    }
                });
                this.translateColors()
            },
            drawPoints: function() {
                t.column.prototype.drawPoints.call(this);
                F(this.points, function(a) {
                    a.graphic.attr(this.colorAttribs(a, a.state))
                }, this)
            },
            animate: E,
            getBox: E,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            alignDataLabel: t.column.prototype.alignDataLabel,
            getExtremes: function() {
                e.prototype.getExtremes.call(this, this.valueData);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                e.prototype.getExtremes.call(this)
            }
        }), B)
    })(K);
    (function(a) {
        var B = a.addEvent,
            F = a.Chart,
            D = a.createElement,
            E = a.css,
            g = a.defaultOptions,
            e = a.defaultPlotOptions,
            q = a.each,
            t = a.extend,
            h =
            a.fireEvent,
            u = a.hasTouch,
            d = a.inArray,
            m = a.isObject,
            w = a.Legend,
            p = a.merge,
            k = a.pick,
            f = a.Point,
            c = a.Series,
            b = a.seriesTypes,
            C = a.svg;
        a = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart,
                    c = b.pointer,
                    d = function(a) {
                        for (var c = a.target, d; c && !d;) d = c.point, c = c.parentNode;
                        if (void 0 !== d && d !== b.hoverPoint) d.onMouseOver(a)
                    };
                q(a.points, function(a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (q(a.trackerGroups,
                    function(b) {
                        if (a[b]) {
                            a[b].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function(a) {
                                c.onTrackerMouseOut(a)
                            });
                            if (u) a[b].on("touchstart", d);
                            a.options.cursor && a[b].css(E).css({
                                cursor: a.options.cursor
                            })
                        }
                    }), a._hasTracking = !0)
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    d = [].concat(c ? a.areaPath : a.graphPath),
                    e = d.length,
                    f = a.chart,
                    g = f.pointer,
                    h = f.renderer,
                    k = f.options.tooltip.snap,
                    m = a.tracker,
                    p, l = function() {
                        if (f.hoverSeries !== a) a.onMouseOver()
                    },
                    t = "rgba(192,192,192," +
                    (C ? .0001 : .002) + ")";
                if (e && !c)
                    for (p = e + 1; p--;) "M" === d[p] && d.splice(p + 1, 0, d[p + 1] - k, d[p + 2], "L"), (p && "M" === d[p] || p === e) && d.splice(p, 0, "L", d[p - 2] + k, d[p - 1]);
                m ? m.attr({
                    d: d
                }) : a.graph && (a.tracker = h.path(d).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: t,
                    fill: c ? t : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * k),
                    zIndex: 2
                }).add(a.group), q([a.tracker, a.markerGroup], function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", l).on("mouseout", function(a) {
                        g.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (u) a.on("touchstart", l)
                }))
            }
        };
        b.column && (b.column.prototype.drawTracker = a.drawTrackerPoint);
        b.pie && (b.pie.prototype.drawTracker = a.drawTrackerPoint);
        b.scatter && (b.scatter.prototype.drawTracker = a.drawTrackerPoint);
        t(w.prototype, {
            setItemEvents: function(a, b, c) {
                var d = this,
                    e = d.chart,
                    f = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function() {
                    a.setState("hover");
                    e.seriesGroup.addClass(f);
                    b.css(d.options.itemHoverStyle)
                }).on("mouseout",
                    function() {
                        b.css(a.visible ? d.itemStyle : d.itemHiddenStyle);
                        e.seriesGroup.removeClass(f);
                        a.setState()
                    }).on("click", function(b) {
                    var c = function() {
                        a.setVisible && a.setVisible()
                    };
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : h(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = D("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                B(a.checkbox, "click", function(b) {
                    h(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
        });
        g.legend.itemStyle.cursor = "pointer";
        t(F.prototype, {
            showResetZoom: function() {
                var a = this,
                    b = g.lang,
                    c = a.options.chart.resetZoomButton,
                    d = c.theme,
                    e = d.states,
                    f = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
                    a.zoomOut()
                }, d, e && e.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, f)
            },
            zoomOut: function() {
                var a = this;
                h(a, "selection", {
                    resetSelection: !0
                }, function() {
                    a.zoom()
                })
            },
            zoom: function(a) {
                var b, c = this.pointer,
                    d = !1,
                    e;
                !a || a.resetSelection ? q(this.axes, function(a) {
                    b = a.zoom()
                }) : q(a.xAxis.concat(a.yAxis), function(a) {
                    var e = a.axis;
                    c[e.isXAxis ? "zoomX" : "zoomY"] && (b = e.zoom(a.min, a.max), e.displayBtn && (d = !0))
                });
                e = this.resetZoomButton;
                d && !e ? this.showResetZoom() : !d && m(e) && (this.resetZoomButton = e.destroy());
                b && this.redraw(k(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    d = c.hoverPoints,
                    e;
                d && q(d, function(a) {
                    a.setState()
                });
                q("xy" === b ? [1, 0] : [1], function(b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        f = b.reversed,
                        g = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        h = c[d],
                        k = (b.pointRange || 0) / (f ? -2 : 2),
                        l = b.getExtremes(),
                        n = b.toValue(h - g, !0) + k,
                        k = b.toValue(h + b.len - g, !0) - k,
                        h = h > g;
                    f && (h = !h, f = n, n = k, k = f);
                    b.series.length && (h || n > Math.min(l.dataMin, l.min)) && (!h || k < Math.max(l.dataMax, l.max)) && (b.setExtremes(n, k, !1, !1, {
                        trigger: "pan"
                    }), e = !0);
                    c[d] = g
                });
                e && c.redraw(!1);
                E(c.container, {
                    cursor: "move"
                })
            }
        });
        t(f.prototype, {
            select: function(a, b) {
                var c = this,
                    e = c.series,
                    f = e.chart;
                a = k(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    e.options.data[d(c, e.data)] = c.options;
                    c.setState(a && "select");
                    b || q(f.getSelectedPoints(), function(a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, e.options.data[d(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function(a, b) {
                var c = this.series,
                    d = c.chart,
                    e = d.tooltip,
                    f = d.hoverPoint;
                if (this.series) {
                    if (!b) {
                        if (f && f !== this) f.onMouseOut();
                        if (d.hoverSeries !== c) c.onMouseOver();
                        d.hoverPoint = this
                    }!e || e.shared && !c.noSharedTooltip ? e || this.setState("hover") : (this.setState("hover"), e.refresh(this, a));
                    this.firePointEvent("mouseOver")
                }
            },
            onMouseOut: function() {
                var a = this.series.chart,
                    b = a.hoverPoints;
                this.firePointEvent("mouseOut");
                b && -1 !== d(this, b) || (this.setState(), a.hoverPoint = null)
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var a = p(this.series.options.point, this.options).events,
                        b;
                    this.events = a;
                    for (b in a) B(this, b, a[b]);
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, b) {
                var c = Math.floor(this.plotX),
                    d = this.plotY,
                    f = this.series,
                    g = f.options.states[a] || {},
                    h = e[f.type].marker && f.options.marker,
                    m = h && !1 === h.enabled,
                    n = h && h.states && h.states[a] || {},
                    q = !1 === n.enabled,
                    r = f.stateMarkerGraphic,
                    l = this.marker || {},
                    p = f.chart,
                    u = f.halo,
                    w, y = h && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (q || m && !1 === n.enabled) || a && l.states && l.states[a] && !1 === l.states[a].enabled)) {
                    y &&
                        (w = f.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.attr(f.pointAttribs(this, a)), w && this.graphic.animate(w, k(p.options.chart.animation, n.animation, h.animation)), r && r.hide();
                    else {
                        if (a && n) {
                            h = l.symbol || f.symbol;
                            r && r.currentSymbol !== h && (r = r.destroy());
                            if (r) r[b ? "animate" : "attr"]({
                                x: w.x,
                                y: w.y
                            });
                            else h && (f.stateMarkerGraphic = r = p.renderer.symbol(h, w.x, w.y, w.width, w.height).add(f.markerGroup),
                                r.currentSymbol = h);
                            r && r.attr(f.pointAttribs(this, a))
                        }
                        r && (r[a && p.isInsidePlot(c, d, p.inverted) ? "show" : "hide"](), r.element.point = this)
                    }(c = g.halo) && c.size ? (u || (f.halo = u = p.renderer.path().add(y ? f.markerGroup : f.group)), u[b ? "animate" : "attr"]({
                        d: this.haloPath(c.size)
                    }), u.attr({
                        "class": "highcharts-halo highcharts-color-" + k(this.colorIndex, f.colorIndex)
                    }), u.attr(t({
                        fill: this.color || f.color,
                        "fill-opacity": c.opacity,
                        zIndex: -1
                    }, c.attributes))) : u && u.animate({
                        d: this.haloPath(0)
                    });
                    this.state = a
                }
            },
            haloPath: function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) -
                    a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        t(c.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && h(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && h(this, "mouseOut");
                !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function(a) {
                var b = this,
                    c =
                    b.options,
                    d = b.graph,
                    e = c.states,
                    f = c.lineWidth,
                    c = 0;
                a = a || "";
                if (b.state !== a && (q([b.group, b.markerGroup], function(c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !e[a] || !1 !== e[a].enabled) && (a && (f = e[a].lineWidth || f + (e[a].lineWidthPlus || 0)), d && !d.dashstyle))
                    for (e = {
                            "stroke-width": f
                        }, d.attr(e); b["zone-graph-" + c];) b["zone-graph-" + c].attr(e), c += 1
            },
            setVisible: function(a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    f, g = d.options.chart.ignoreHiddenSeries,
                    k = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                q(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(a) {
                    if (c[a]) c[a][f]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && q(d.series, function(a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                q(c.linkedSeries, function(b) {
                    b.setVisible(a, !1)
                });
                g && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                h(c, f)
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                h(this, a ? "select" : "unselect")
            },
            drawTracker: a.drawTrackerGraph
        })
    })(K);
    (function(a) {
        var B = a.Chart,
            F = a.each,
            D = a.inArray,
            E = a.isObject,
            g = a.pick,
            e = a.splat;
        B.prototype.setResponsive = function(a) {
            var e = this.options.responsive;
            e && e.rules && F(e.rules, function(e) {
                this.matchResponsiveRule(e, a)
            }, this)
        };
        B.prototype.matchResponsiveRule = function(e, t) {
            var h = this.respRules,
                q = e.condition,
                d;
            d = q.callback || function() {
                return this.chartWidth <= g(q.maxWidth, Number.MAX_VALUE) && this.chartHeight <= g(q.maxHeight, Number.MAX_VALUE) && this.chartWidth >= g(q.minWidth, 0) && this.chartHeight >= g(q.minHeight, 0)
            };
            void 0 === e._id && (e._id = a.uniqueKey());
            d = d.call(this);
            !h[e._id] && d ? e.chartOptions && (h[e._id] = this.currentOptions(e.chartOptions), this.update(e.chartOptions, t)) : h[e._id] && !d && (this.update(h[e._id], t), delete h[e._id])
        };
        B.prototype.currentOptions = function(a) {
            function g(a, d, h) {
                var m, p;
                for (m in a)
                    if (-1 <
                        D(m, ["series", "xAxis", "yAxis"]))
                        for (a[m] = e(a[m]), h[m] = [], p = 0; p < a[m].length; p++) h[m][p] = {}, g(a[m][p], d[m][p], h[m][p]);
                    else E(a[m]) ? (h[m] = {}, g(a[m], d[m] || {}, h[m])) : h[m] = d[m] || null
            }
            var h = {};
            g(a, this.options, h);
            return h
        }
    })(K);
    return K
});