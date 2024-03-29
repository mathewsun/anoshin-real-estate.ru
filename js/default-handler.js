"use strict";

function ResourceLoader() {}

function SPForm(e) {
    var t = this,
        o = "//login.sendpulse.com",
        r = "//email.routee.net";
    window.SPFormRegistry = window.SPFormRegistry || {}, t.id = e, t.formSelector = "#sp-form-" + t.id, t.$form = jQ(t.formSelector), t.$formMessage = jQ(t.formSelector + " .sp-message"), t.$formOuter = jQ(t.formSelector).parent(".sp-form-outer").length ? jQ(t.formSelector).parent(".sp-form-outer") : jQ(t.formSelector).parent(".form-outer"), t.$submitButton = jQ(t.formSelector + " button.sp-button"), t.$closeButton = jQ(t.formSelector + " .sp-btn-close," + t.formSelector + " .sp-btn-thanks"), t.formHash = t.$form.attr("sp-hash"), t.formType = t.$form.hasClass("sp-form-popup") ? "popup" : "embed", t.formType = t.$form.hasClass("sp-form-fixed") ? "fixed" : t.formType, t.inputs = {}, t.inputsSelector = t.formSelector + " .sp-element-container :input", t.language = t.$form.attr("sp-lang"), t.preparedData = {}, t.sent = !1, t.showOptions = function () {
        var e = t.$form.attr("sp-show-options") ? JSON.parse(decodeURIComponent(t.$form.attr("sp-show-options"))) : {};
        return e.maDomain && (o = "//" + e.maDomain), e.amd && (o = r), void 0 === e.urlFilter && (e.urlFilter = !1), void 0 === e.urlFilterConditions && (e.urlFilterConditions = []), e
    }(), t.submitURL = function () {
        return o + "/members/forms/jsonp-submit"
    }(), t.history = new SPHistory(t.formHash), t.previewMode = function () {
        var e = ["forms.sendpulse.com", "forms.sendpulse.local", "forms.routee.net"];
        return t.showOptions.formsDomain && e.push(t.showOptions.formsDomain), -1 !== e.indexOf(window.location.hostname)
    }(), t.statAgent = new SPStatAgent(o, t.id), t.valid = !0, t.ipInfo = {}, t.ipInfoToken = "b162f4d25d90a1", t.ipSrvURL = "//geoip.sendpulse.com", t.urlFilter = new SPURLFilter({
        active: !t.previewMode && t.showOptions.urlFilter,
        conditions: t.showOptions.urlFilterConditions
    }), t.init()
}

function SPHistory(e) {
    var t = this;
    t.formHash = e, t.all = t.raise()
}

function SPStatAgent(e, t) {
    function o(e, t) {
        new Fingerprint2({
            excludeJsFonts: !0
        }).get(function (t, o) {
            e({
                result: t,
                components: o
            })
        })
    }
    var r = this;
    r.formId = t, r.targetUrl = e + "/members/forms/stat", r.fp = 0, r.ready = new Promise(o).then(function (e) {
        return r.fp = e.result, e
    })
}

function SPURLFilter(e) {
    function t(e) {
        return e.replace(/((^\w+:|^)\/\/)|(\/$)/g, "")
    }
    var o = this;
    o.config = {
        active: !1,
        conditions: [],
        url: t(window.location.href)
    }, o.config = jQ.extend(o.config, e), o.rules = function (e) {
        var o = {
            show: "",
            hide: ""
        };
        return e.forEach(function (e) {
            var r = t(e.token);
            switch (e.clause) {
                case "contains":
                    o[e.force] += r + "|";
                    break;
                case "equal":
                    o[e.force] += "^" + r + "$|";
                    break;
                case "begins":
                    o[e.force] += "^" + r + "|";
                    break;
                case "ends":
                    o[e.force] += r + "$|"
            }
        }), o
    }(o.config.conditions)
}! function (e) {
    function t(t) {
        new Promise(function (t, o) {
            void 0 === e.jQuery || Boolean(!e.jQuery.fn.on) ? ResourceLoader.loadScript("//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js", function () {
                e.jQ = e.jQuery
            }).then(function () {
                t()
            }) : (e.jQ = e.jQuery, t())
        }).then(t)
    }

    function o() {
        var e = jQ(".sp-form-outer").length ? ".sp-form-outer" : ".form-outer",
            t = [],
            o = jQ('div.sp-form [name="sform[phone]"]'),
            s = jQ('div[class*=" sp-animation-"]'),
            i = r();
        try {
            n = "//" + jQ(e).next("script").attr("src").split("/")[2]
        } catch (e) {
            n = "//login.sendpulse.com"
        }
        new Promise(function (e, r) {
            o.length > 0 && (t.push(ResourceLoader.loadCss("//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/9.2.4/css/intlTelInput.css")), t.push(ResourceLoader.loadScript("http://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/9.2.4/js/intlTelInput.min.js")), t.push(ResourceLoader.loadScript("http://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/9.2.4/js/utils.js"))), t.push(ResourceLoader.loadScript(n + "http://apps/fc3/build/dh-libs.js")), s.length > 0 && t.push(ResourceLoader.loadCss(n + "http://static-login.sendpulse.com/apps/fc3/build/form-animations.css?1563881343353")), t.push(ResourceLoader.loadScript("http://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.3.6/mobile-detect.min.js")), t.push(ResourceLoader.loadCss(n + "http://static-login.sendpulse.com/apps/fc3/build/form-defaults.css?1563881343353")), Promise.all(t).then(function () {
                e()
            }, function (e) {
                console.error("Necessary scripts have not been loaded:", e)
            })
        }).then(function () {
            for (var e = 0, t = i.length; e < t; e++) new SPForm(i[e]).run()
        })
    }

    function r() {
        var e = jQ("div.sp-form"),
            t = e.length,
            o = [];
        if (!t) throw new Error("SendPulse: Subscription form ID is missing or code is corrupted!");
        for (var r = 0; r < t; r++) {
            var n = Number(jQ(e[r]).attr("sp-id"));
            if (isNaN(n) || n < 1) throw new Error("SendPulse: Subscription form ID is wrong!");
            o.push(n)
        }
        return o
    }
    var n = "";
    e.spFormBootstrap = function () {
        "undefined" != typeof Promise && -1 !== Promise.toString().indexOf("[native code]") ? t(o) : ResourceLoader.loadPromisePolyfill(function () {
            t(o)
        })
    }, e.addEventListener("load", e.spFormBootstrap, !1)
}(window), ResourceLoader.loadScript = function (e, t, o) {
    return new Promise(function (r, n) {
        var s = document.createElement("script");
        void 0 === o && (o = !1), s.type = "text/javascript", s.async = !0, s.src = e + (o ? "?t=" + (new Date).getTime() : ""), document.getElementsByTagName("head")[0].appendChild(s), s.readyState ? s.onreadystatechange = function () {
            "loaded" !== s.readyState && "complete" !== s.readyState || (s.onreadystatechange = null, "function" == typeof t && t(), r())
        } : s.onload = function () {
            "function" == typeof t && t(), r()
        }, s.onerror = function () {
            n(new Error("Loading fail! " + e))
        }
    })
}, ResourceLoader.loadCss = function (e, t, o) {
    return new Promise(function (r, n) {
        var s = document.createElement("link");
        void 0 === o && (o = !1), s.rel = "stylesheet", s.media = "screen", s.href = e + (o ? "?t=" + (new Date).getTime() : ""), document.getElementsByTagName("head")[0].appendChild(s), s.readyState ? s.onreadystatechange = function () {
            "loaded" !== s.readyState && "complete" !== s.readyState || (s.onreadystatechange = null, "function" == typeof t && t(), r())
        } : s.onload = function () {
            "function" == typeof t && t(), r()
        }, s.onerror = function () {
            n(new Error("Loading fail! " + e))
        }
    })
}, ResourceLoader.loadPromisePolyfill = function (e, t) {
    var o = "//polyfill.io/v2/polyfill.min.js?flags=gated,always&features=Promise,&rum=0",
        r = document.createElement("script");
    void 0 === t && (t = !1), r.type = "text/javascript", r.async = !1, r.src = o + (t ? "?t=" + (new Date).getTime() : ""), document.getElementsByTagName("head")[0].appendChild(r), r.readyState ? r.onreadystatechange = function () {
        "loaded" !== r.readyState && "complete" !== r.readyState || (r.onreadystatechange = null, "function" == typeof e && e())
    } : r.onload = function () {
        "function" == typeof e && e()
    }, r.onerror = function () {
        throw new Error("Loading fail! " + o)
    }
}, SPForm.prototype.init = function () {
    var e = this;
    return e.$closeButton.on("click", function (t) {
        e.close(!0)
    }), e.$submitButton.prop("disabled", !e.valid), jQ(e.inputsSelector).each(function (t, o) {
        var r = jQ(o);
        r.hideTip = function () {
            r.hasClass("sp-invalid") && (this.removeClass("sp-invalid"), this.next(".sp-tip").detach())
        }, r.showTip = function (e) {
            var t = JSON.parse(decodeURIComponent(this.attr("sp-tips")));
            this.addClass("sp-invalid"), t.hasOwnProperty(e) && this.after(jQ("<div/>", {
                class: "sp-tip sp-invalid",
                html: t[e]
            }))
        }, r.on("focus", function () {
            e.hideAllTips()
        }), "sform[phone]" === r.attr("name") && r.intlTelInput({
            initialCountry: "auto",
            separateDialCode: !0,
            geoIpLookup: function (t) {
                jQ.get(e.ipSrvURL, function () {}, "jsonp").always(function (o) {
                    e.ipInfo = o;
                    var r = o && o.country_code ? o.country_code : "";
                    t(r)
                })
            },
            utilScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/9.2.4/js/utils.js"
        }), e.inputs[o.name] = r
    }), e.$submitButton.off("click").on("click", function (t) {
        return e.submit(), !1
    }), e.$form.on("submit", function () {
        return e.submit(), !1
    }), e.previewMode && (e.$form.removeClass("sp-form-popup"), e.$form.removeClass("sp-form-fixed"), e.$formOuter.removeClass("sp-popup-outer"), e.$closeButton.remove()), e
}, SPForm.prototype.run = function () {
    this.show()
}, SPForm.prototype.hideAllTips = function () {
    var e = this;
    for (var t in e.inputs) e.inputs.hasOwnProperty(t) && e.inputs[t].hasOwnProperty("hideTip") && e.inputs[t].hideTip()
}, SPForm.prototype.disableInputs = function () {
    var e = this;
    jQ(e.inputsSelector).prop("disabled", !0), e.$submitButton.prop("disabled", !0)
}, SPForm.prototype.enableInputs = function () {
    var e = this;
    jQ(e.inputsSelector).prop("disabled", !1), e.$submitButton.prop("disabled", !1)
}, SPForm.prototype.close = function (e) {
    var t = this;
    "embed" !== t.formType && (t.$formOuter.addClass("sp-hide"), e && !t.history.getSubmits().length && t.history.addReject((new Date).getTime()), t.statAgent.registerRefusing())
}, SPForm.prototype.show = function () {
    function e(e) {
        e = e || .2, e *= 1e3, setTimeout(function () {
            t.$formOuter.addClass("sp-showing"), setTimeout(function () {
                t.$formOuter.addClass("sp-show")
            }, 200), setTimeout(function () {
                t.$formOuter.removeClass("sp-showing")
            }, 400)
        }, e)
    }
    var t = this;
    if (!(function () {
            if (t.showOptions.hideOnMobile) {
                return new MobileDetect(window.navigator.userAgent).mobile()
            }
            return !1
        }() || "embed" !== t.formType && !t.urlFilter.isAllowed() || "embed" !== t.formType && function () {
            if ("onButtonClick" === t.showOptions.condition) return jQ("[sp-show-form]").on("click", function () {
                var e = jQ(this).attr("sp-show-form");
                jQ("#sp-form-" + e).parent(".sp-form-outer").removeClass("sp-force-hide").removeClass("sp-hide").addClass("sp-show"), t.statAgent.registerShow()
            }), !0
        }())) {
        if (t.$formOuter.removeClass("sp-force-hide"), t.previewMode) return void e();
        if ("embed" !== t.formType) {
            if (t.history.getSubmits().length) return;
            if (t.history.getRejects().length > 1) return;
            if (1 === t.history.getRejects().length) {
                var o = (new Date).getTime(),
                    r = (o - t.history.getLastShow()) / 864e5;
                if (t.showOptions.repeat > 0 && r < t.showOptions.repeat) return
            }
            "popup" !== t.formType && "fixed" !== t.formType || (! function () {
                switch (t.showOptions.condition) {
                    case "onEnter":
                        e(t.showOptions.delay);
                        break;
                    case "onScroll":
                        jQ(window).scroll(function () {
                            var o = (jQ(document).height() - jQ(window).height()) / 100 * t.showOptions.scrollTo;
                            jQ(window).scrollTop() >= o && e()
                        });
                        break;
                    case "onCursorLeave":
                        jQ("body").on("mouseleave", function (t) {
                            (t.clientY <= 0 || t.clientX <= 0 || t.clientX >= window.innerWidth || t.clientY >= window.innerHeight) && e()
                        });
                        break;
                    case "onClose":
                        jQ(window).on("unload", function (t) {
                            t.preventDefault(), e()
                        })
                }
            }(), t.statAgent.registerShow())
        } else t.statAgent.registerShow();
        t.history.addLastShow()
    }
}, SPForm.prototype.validateAll = function () {
    var e = this;
    e.valid = !0;
    for (var t in e.inputs)
        if (e.inputs.hasOwnProperty(t) && void 0 !== e.inputs[t].attr("sp-type")) {
            var o = e.inputs[t],
                r = e.validate(o);
            e.valid = e.valid && r
        } return e
}, SPForm.prototype.validate = function (e) {
    var t = this,
        o = e.attr("sp-type");
    if (void 0 === o) return !0;
    "sform[phone]" === e.name && (o = "phone");
    var r = !0,
        n = e.val();
    if (e.hideTip(), e.prop("required")) switch (o) {
        case "checkbox":
        case "gdprTerms":
        case "gdprConfirm":
            r = e.prop("checked");
            break;
        default:
            r = "" !== n
    }
    if (!r) return e.showTip("required"), t.$submitButton.prop("disabled", !1), r;
    if (e.prop("required") && "" === n) return r = !1, e.showTip("required"), t.$submitButton.prop("disabled", !1), r;
    if (r && "" !== n) switch (o) {
        case "address":
        case "date":
            r = !0;
            break;
        case "email":
            r = function (e) {
                return /^(([^<>()\[\]\\.,;:+\s@"]+(\.[^<>()\[\]\\.,;:+\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
            }(n);
            break;
        case "phone":
            e.prop("required") && (r = function (t) {
                return !!jQ.trim(e.val()) && e.intlTelInput("isValidNumber")
            }(e))
    }
    return r || e.showTip("wrong"), r
}, SPForm.prototype.cbSubmit = function (e) {
    var t = this;
    e.hasOwnProperty("html") && e.hasOwnProperty("status") && (t.$form.find(".sp-element-container").hide(), "success" === e.status ? (t.$formMessage.addClass("sp-message-success"), t.sent = !0, t.history.addSubmit(), t.$formMessage.html(e.html), t.enableInputs(), t.statAgent.registerSubmit(), t.statAgent.sendAnalyticsEvent(t.showOptions.analytics)) : "verify" === e.status ? (t.sent = !0, t.history.addSubmit(), t.enableInputs(), t.close(), window.location.href = "////login.sendpulse.com/forms/recaptcha?hash=" + e.form_hash) : (t.$formMessage.addClass("sp-message-error"), t.$formMessage.html(e.html), t.enableInputs(), t.statAgent.registerBadSubmit())), t.$submitButton.removeClass("btn-loading"), t.removeInstanceFromRegistry()
}, SPForm.prototype.submit = function () {
    var e = this;
    if (!e.sent && (e.validateAll(), e.valid)) {
        if ("popup" === e.formType && e.history.getSubmits().length > 1) return console.warn("Form has been submitted twice already. Enough!"), e.close(), !1;
        e.$submitButton.addClass("btn-loading"), e.disableInputs(), e.putInstanceToRegistry(),
            function () {
                for (var t in e.inputs)
                    if (e.inputs.hasOwnProperty(t)) {
                        var o = e.inputs[t];
                        switch (o.attr("sp-type")) {
                            case "phone":
                                e.preparedData[t] = o.intlTelInput("getNumber");
                                break;
                            case "checkbox":
                            case "gdprTerms":
                            case "gdprConfirm":
                                o.prop("checked") ? e.preparedData[t] = o.val() : e.preparedData[t] = "no";
                                break;
                            case "radio":
                                e.preparedData[t] = jQ('[name="' + t + '"]:checked').val();
                                break;
                            default:
                                e.preparedData[t] = o.val()
                        }
                    } e.preparedData.sform_lang = e.language, e.preparedData["sform[hash]"] = e.formHash, e.preparedData["sform[" + window.btoa("autoSite") + "]"] = window.location.hostname, jQ.isEmptyObject(e.ipInfo) || (e.preparedData["sform[" + window.btoa("autoIp") + "]"] = e.ipInfo.ip, e.preparedData["sform[" + window.btoa("autoCity") + "]"] = e.ipInfo.city, e.preparedData["sform[" + window.btoa("autoRegion") + "]"] = e.ipInfo.region, e.preparedData["sform[" + window.btoa("autoCountry") + "]"] = e.ipInfo.country)
            }(),
            function () {
                jQ.ajax({
                    url: e.submitURL + "?callback=?",
                    dataType: "jsonp",
                    data: e.preparedData,
                    jsonpCallback: e.makeCallbackName("cbSubmit")
                })
            }()
    }
}, SPForm.prototype.makeCallbackName = function (e) {
    return "SPFormRegistry['" + this.formHash + "']." + e
}, SPForm.prototype.putInstanceToRegistry = function () {
    var e = this;
    window.SPFormRegistry[e.formHash] = e
}, SPForm.prototype.removeInstanceFromRegistry = function () {
    var e = this;
    void 0 !== window.SPFormRegistry[e.formHash] && delete window.SPFormRegistry[e.formHash]
}, SPHistory.prototype.raise = function () {
    var e = this;
    if (localStorage[e.formHash]) try {
        return JSON.parse(localStorage.getItem(e.formHash))
    } catch (e) {
        console.error(e)
    }
    return {
        submits: [],
        rejects: [],
        lastShow: 0
    }
}, SPHistory.prototype.persist = function () {
    var e = this;
    localStorage.setItem(e.formHash, JSON.stringify(e.all))
}, SPHistory.prototype.add = function (e, t) {
    var o = this;
    switch (t = t || (new Date).getTime(), e) {
        case "submits":
        case "rejects":
            o.all[e].push(t);
            break;
        case "lastShow":
            o.all[e] = t
    }
    o.persist()
}, SPHistory.prototype.addSubmit = function (e) {
    this.add("submits", e)
}, SPHistory.prototype.addReject = function (e) {
    this.add("rejects", e)
}, SPHistory.prototype.addLastShow = function (e) {
    this.add("lastShow", e)
}, SPHistory.prototype.get = function (e) {
    var t = this;
    if (t.all.hasOwnProperty(e)) return t.all[e]
}, SPHistory.prototype.getSubmits = function () {
    return this.get("submits")
}, SPHistory.prototype.getRejects = function () {
    return this.get("rejects")
}, SPHistory.prototype.getLastShow = function () {
    return this.get("lastShow")
}, SPStatAgent.prototype.sendInfo = function (e) {
    var t = this;
    t.ready.then(function (o) {
        setTimeout(function () {
            jQ.ajax({
                url: t.targetUrl,
                dataType: "jsonp",
                data: {
                    event: e,
                    formId: t.formId,
                    fp: t.fp
                },
                jsonp: !0
            })
        })
    })
}, SPStatAgent.prototype.registerShow = function () {
    this.sendInfo("show")
}, SPStatAgent.prototype.registerSubmit = function () {
    this.sendInfo("submit")
}, SPStatAgent.prototype.registerBadSubmit = function () {
    this.sendInfo("bad_submit")
}, SPStatAgent.prototype.registerRefusing = function () {
    this.sendInfo("refusing")
}, SPStatAgent.prototype.sendAnalyticsEvent = function (e) {
    void 0 !== e && (e.ga && e.ga.send && "undefined" != typeof ga && ga(function () {
        var t = ga.getAll();
        if (console.log("GA trackers", t), t.length) {
            var o = t.shift().get("name");
            ga(o + ".send", {
                hitType: "event",
                eventCategory: "Sendpulse Email Form",
                eventAction: "Email Signup",
                eventLabel: e.ga.eventLabel
            })
        }
    }), e.ym && e.ym.send && (console.log("Yandex.Metrica Counter", window["yaCounter" + e.ym.counterId]), void 0 !== e.ym.counterId && void 0 !== e.ym.targetId && void 0 !== window["yaCounter" + e.ym.counterId] && window["yaCounter" + e.ym.counterId].reachGoal(e.ym.targetId)))
}, SPURLFilter.prototype.isAllowed = function () {
    var e = this;
    return !e.config.active || function () {
        var t = {
                show: !1,
                hide: !0
            },
            o = 0;
        return jQ.each(e.rules, function (r, n) {
            n.length > 0 ? (e.rules[r] = new RegExp(n.slice(0, -1), "i"), t[r] = e.rules[r].test(e.config.url)) : o += 1
        }), 2 === o && (t.show = !0), t.show + !t.hide
    }()
};
//# sourceMappingURL=default-handler.js.map
