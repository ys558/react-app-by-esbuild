import {
  init_react_shim
} from "./chunk.S7HK3LFS.js";

// node_modules/web-vitals/dist/web-vitals.js
init_react_shim();
var e;
var t;
var n;
var i;
var a = function(e2, t2) {
  return { name: e2, value: t2 === void 0 ? -1 : t2, delta: 0, entries: [], id: "v1-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12) };
};
var r = function(e2, t2) {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(e2)) {
      if (e2 === "first-input" && !("PerformanceEventTiming" in self))
        return;
      var n2 = new PerformanceObserver(function(e3) {
        return e3.getEntries().map(t2);
      });
      return n2.observe({ type: e2, buffered: true }), n2;
    }
  } catch (e3) {
  }
};
var o = function(e2, t2) {
  var n2 = function n3(i2) {
    i2.type !== "pagehide" && document.visibilityState !== "hidden" || (e2(i2), t2 && (removeEventListener("visibilitychange", n3, true), removeEventListener("pagehide", n3, true)));
  };
  addEventListener("visibilitychange", n2, true), addEventListener("pagehide", n2, true);
};
var c = function(e2) {
  addEventListener("pageshow", function(t2) {
    t2.persisted && e2(t2);
  }, true);
};
var u = typeof WeakSet == "function" ? new WeakSet() : new Set();
var f = function(e2, t2, n2) {
  var i2;
  return function() {
    t2.value >= 0 && (n2 || u.has(t2) || document.visibilityState === "hidden") && (t2.delta = t2.value - (i2 || 0), (t2.delta || i2 === void 0) && (i2 = t2.value, e2(t2)));
  };
};
var s = function(e2, t2) {
  var n2, i2 = a("CLS", 0), u2 = function(e3) {
    e3.hadRecentInput || (i2.value += e3.value, i2.entries.push(e3), n2());
  }, s2 = r("layout-shift", u2);
  s2 && (n2 = f(e2, i2, t2), o(function() {
    s2.takeRecords().map(u2), n2();
  }), c(function() {
    i2 = a("CLS", 0), n2 = f(e2, i2, t2);
  }));
};
var m = -1;
var p = function() {
  return document.visibilityState === "hidden" ? 0 : 1 / 0;
};
var v = function() {
  o(function(e2) {
    var t2 = e2.timeStamp;
    m = t2;
  }, true);
};
var d = function() {
  return m < 0 && (m = p(), v(), c(function() {
    setTimeout(function() {
      m = p(), v();
    }, 0);
  })), { get timeStamp() {
    return m;
  } };
};
var l = function(e2, t2) {
  var n2, i2 = d(), o2 = a("FCP"), s2 = function(e3) {
    e3.name === "first-contentful-paint" && (p2 && p2.disconnect(), e3.startTime < i2.timeStamp && (o2.value = e3.startTime, o2.entries.push(e3), u.add(o2), n2()));
  }, m2 = performance.getEntriesByName("first-contentful-paint")[0], p2 = m2 ? null : r("paint", s2);
  (m2 || p2) && (n2 = f(e2, o2, t2), m2 && s2(m2), c(function(i3) {
    o2 = a("FCP"), n2 = f(e2, o2, t2), requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        o2.value = performance.now() - i3.timeStamp, u.add(o2), n2();
      });
    });
  }));
};
var h = { passive: true, capture: true };
var S = new Date();
var y = function(i2, a2) {
  e || (e = a2, t = i2, n = new Date(), w(removeEventListener), g());
};
var g = function() {
  if (t >= 0 && t < n - S) {
    var a2 = { entryType: "first-input", name: e.type, target: e.target, cancelable: e.cancelable, startTime: e.timeStamp, processingStart: e.timeStamp + t };
    i.forEach(function(e2) {
      e2(a2);
    }), i = [];
  }
};
var E = function(e2) {
  if (e2.cancelable) {
    var t2 = (e2.timeStamp > 1e12 ? new Date() : performance.now()) - e2.timeStamp;
    e2.type == "pointerdown" ? function(e3, t3) {
      var n2 = function() {
        y(e3, t3), a2();
      }, i2 = function() {
        a2();
      }, a2 = function() {
        removeEventListener("pointerup", n2, h), removeEventListener("pointercancel", i2, h);
      };
      addEventListener("pointerup", n2, h), addEventListener("pointercancel", i2, h);
    }(t2, e2) : y(t2, e2);
  }
};
var w = function(e2) {
  ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function(t2) {
    return e2(t2, E, h);
  });
};
var L = function(n2, s2) {
  var m2, p2 = d(), v2 = a("FID"), l2 = function(e2) {
    e2.startTime < p2.timeStamp && (v2.value = e2.processingStart - e2.startTime, v2.entries.push(e2), u.add(v2), m2());
  }, h2 = r("first-input", l2);
  m2 = f(n2, v2, s2), h2 && o(function() {
    h2.takeRecords().map(l2), h2.disconnect();
  }, true), h2 && c(function() {
    var r2;
    v2 = a("FID"), m2 = f(n2, v2, s2), i = [], t = -1, e = null, w(addEventListener), r2 = l2, i.push(r2), g();
  });
};
var T = function(e2, t2) {
  var n2, i2 = d(), s2 = a("LCP"), m2 = function(e3) {
    var t3 = e3.startTime;
    t3 < i2.timeStamp && (s2.value = t3, s2.entries.push(e3)), n2();
  }, p2 = r("largest-contentful-paint", m2);
  if (p2) {
    n2 = f(e2, s2, t2);
    var v2 = function() {
      u.has(s2) || (p2.takeRecords().map(m2), p2.disconnect(), u.add(s2), n2());
    };
    ["keydown", "click"].forEach(function(e3) {
      addEventListener(e3, v2, { once: true, capture: true });
    }), o(v2, true), c(function(i3) {
      s2 = a("LCP"), n2 = f(e2, s2, t2), requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          s2.value = performance.now() - i3.timeStamp, u.add(s2), n2();
        });
      });
    });
  }
};
var b = function(e2) {
  var t2, n2 = a("TTFB");
  t2 = function() {
    try {
      var t3 = performance.getEntriesByType("navigation")[0] || function() {
        var e3 = performance.timing, t4 = { entryType: "navigation", startTime: 0 };
        for (var n3 in e3)
          n3 !== "navigationStart" && n3 !== "toJSON" && (t4[n3] = Math.max(e3[n3] - e3.navigationStart, 0));
        return t4;
      }();
      if (n2.value = n2.delta = t3.responseStart, n2.value < 0)
        return;
      n2.entries = [t3], e2(n2);
    } catch (e3) {
    }
  }, document.readyState === "complete" ? setTimeout(t2, 0) : addEventListener("pageshow", t2);
};
export {
  s as getCLS,
  l as getFCP,
  L as getFID,
  T as getLCP,
  b as getTTFB
};
