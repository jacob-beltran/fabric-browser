var fabric = fabric || {
    version: "1.7.19"
};

if (typeof exports !== "undefined") {
    exports.fabric = fabric;
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
    fabric.document = document;
    fabric.window = window;
    window.fabric = fabric;
} else {
    fabric.document = require("jsdom").jsdom(decodeURIComponent("%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3C%2Fhead%3E%3Cbody%3E%3C%2Fbody%3E%3C%2Fhtml%3E"));
    if (fabric.document.createWindow) {
        fabric.window = fabric.document.createWindow();
    } else {
        fabric.window = fabric.document.parentWindow;
    }
}

fabric.isTouchSupported = "ontouchstart" in fabric.window;

fabric.isLikelyNode = typeof Buffer !== "undefined" && typeof window === "undefined";

fabric.SHARED_ATTRIBUTES = [ "display", "transform", "fill", "fill-opacity", "fill-rule", "opacity", "stroke", "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "id" ];

fabric.DPI = 96;

fabric.reNum = "(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)";

fabric.fontPaths = {};

fabric.iMatrix = [ 1, 0, 0, 1, 0, 0 ];

fabric.canvasModule = "canvas";

fabric.perfLimitSizeTotal = 2097152;

fabric.maxCacheSideLimit = 4096;

fabric.minCacheSideLimit = 256;

fabric.charWidthsCache = {};

fabric.devicePixelRatio = fabric.window.devicePixelRatio || fabric.window.webkitDevicePixelRatio || fabric.window.mozDevicePixelRatio || 1;

if (typeof JSON !== "object") {
    JSON = {};
}

(function() {
    "use strict";
    function f(n) {
        return n < 10 ? "0" + n : n;
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf();
        };
    }
    var cx, escapable, gap, indent, meta, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
          case "string":
            return quote(value);

          case "number":
            return isFinite(value) ? String(value) : "null";

          case "boolean":
          case "null":
            return String(value);

          case "object":
            if (!value) {
                return "null";
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v);
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }
    if (typeof JSON.stringify !== "function") {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }
            } else if (typeof space === "string") {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }
            return str("", {
                "": value
            });
        };
    }
    if (typeof JSON.parse !== "function") {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j;
            }
            throw new SyntaxError("JSON.parse");
        };
    }
})();

(function() {
    function _removeEventListener(eventName, handler) {
        if (!this.__eventListeners[eventName]) {
            return;
        }
        var eventListener = this.__eventListeners[eventName];
        if (handler) {
            eventListener[eventListener.indexOf(handler)] = false;
        } else {
            fabric.util.array.fill(eventListener, false);
        }
    }
    function observe(eventName, handler) {
        if (!this.__eventListeners) {
            this.__eventListeners = {};
        }
        if (arguments.length === 1) {
            for (var prop in eventName) {
                this.on(prop, eventName[prop]);
            }
        } else {
            if (!this.__eventListeners[eventName]) {
                this.__eventListeners[eventName] = [];
            }
            this.__eventListeners[eventName].push(handler);
        }
        return this;
    }
    function stopObserving(eventName, handler) {
        if (!this.__eventListeners) {
            return;
        }
        if (arguments.length === 0) {
            for (eventName in this.__eventListeners) {
                _removeEventListener.call(this, eventName);
            }
        } else if (arguments.length === 1 && typeof arguments[0] === "object") {
            for (var prop in eventName) {
                _removeEventListener.call(this, prop, eventName[prop]);
            }
        } else {
            _removeEventListener.call(this, eventName, handler);
        }
        return this;
    }
    function fire(eventName, options) {
        if (!this.__eventListeners) {
            return;
        }
        var listenersForEvent = this.__eventListeners[eventName];
        if (!listenersForEvent) {
            return;
        }
        for (var i = 0, len = listenersForEvent.length; i < len; i++) {
            listenersForEvent[i] && listenersForEvent[i].call(this, options || {});
        }
        this.__eventListeners[eventName] = listenersForEvent.filter(function(value) {
            return value !== false;
        });
        return this;
    }
    fabric.Observable = {
        observe: observe,
        stopObserving: stopObserving,
        fire: fire,
        on: observe,
        off: stopObserving,
        trigger: fire
    };
})();

fabric.Collection = {
    _objects: [],
    add: function() {
        this._objects.push.apply(this._objects, arguments);
        if (this._onObjectAdded) {
            for (var i = 0, length = arguments.length; i < length; i++) {
                this._onObjectAdded(arguments[i]);
            }
        }
        this.renderOnAddRemove && this.renderAll();
        return this;
    },
    insertAt: function(object, index, nonSplicing) {
        var objects = this.getObjects();
        if (nonSplicing) {
            objects[index] = object;
        } else {
            objects.splice(index, 0, object);
        }
        this._onObjectAdded && this._onObjectAdded(object);
        this.renderOnAddRemove && this.renderAll();
        return this;
    },
    remove: function() {
        var objects = this.getObjects(), index, somethingRemoved = false;
        for (var i = 0, length = arguments.length; i < length; i++) {
            index = objects.indexOf(arguments[i]);
            if (index !== -1) {
                somethingRemoved = true;
                objects.splice(index, 1);
                this._onObjectRemoved && this._onObjectRemoved(arguments[i]);
            }
        }
        this.renderOnAddRemove && somethingRemoved && this.renderAll();
        return this;
    },
    forEachObject: function(callback, context) {
        var objects = this.getObjects();
        for (var i = 0, len = objects.length; i < len; i++) {
            callback.call(context, objects[i], i, objects);
        }
        return this;
    },
    getObjects: function(type) {
        if (typeof type === "undefined") {
            return this._objects;
        }
        return this._objects.filter(function(o) {
            return o.type === type;
        });
    },
    item: function(index) {
        return this.getObjects()[index];
    },
    isEmpty: function() {
        return this.getObjects().length === 0;
    },
    size: function() {
        return this.getObjects().length;
    },
    contains: function(object) {
        return this.getObjects().indexOf(object) > -1;
    },
    complexity: function() {
        return this.getObjects().reduce(function(memo, current) {
            memo += current.complexity ? current.complexity() : 0;
            return memo;
        }, 0);
    }
};

fabric.CommonMethods = {
    _setOptions: function(options) {
        for (var prop in options) {
            this.set(prop, options[prop]);
        }
    },
    _initGradient: function(filler, property) {
        if (filler && filler.colorStops && !(filler instanceof fabric.Gradient)) {
            this.set(property, new fabric.Gradient(filler));
        }
    },
    _initPattern: function(filler, property, callback) {
        if (filler && filler.source && !(filler instanceof fabric.Pattern)) {
            this.set(property, new fabric.Pattern(filler, callback));
        } else {
            callback && callback();
        }
    },
    _initClipping: function(options) {
        if (!options.clipTo || typeof options.clipTo !== "string") {
            return;
        }
        var functionBody = fabric.util.getFunctionBody(options.clipTo);
        if (typeof functionBody !== "undefined") {
            this.clipTo = new Function("ctx", functionBody);
        }
    },
    _setObject: function(obj) {
        for (var prop in obj) {
            this._set(prop, obj[prop]);
        }
    },
    set: function(key, value) {
        if (typeof key === "object") {
            this._setObject(key);
        } else {
            if (typeof value === "function" && key !== "clipTo") {
                this._set(key, value(this.get(key)));
            } else {
                this._set(key, value);
            }
        }
        return this;
    },
    _set: function(key, value) {
        this[key] = value;
    },
    toggle: function(property) {
        var value = this.get(property);
        if (typeof value === "boolean") {
            this.set(property, !value);
        }
        return this;
    },
    get: function(property) {
        return this[property];
    }
};

(function(global) {
    var sqrt = Math.sqrt, atan2 = Math.atan2, pow = Math.pow, abs = Math.abs, PiBy180 = Math.PI / 180;
    fabric.util = {
        removeFromArray: function(array, value) {
            var idx = array.indexOf(value);
            if (idx !== -1) {
                array.splice(idx, 1);
            }
            return array;
        },
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        degreesToRadians: function(degrees) {
            return degrees * PiBy180;
        },
        radiansToDegrees: function(radians) {
            return radians / PiBy180;
        },
        rotatePoint: function(point, origin, radians) {
            point.subtractEquals(origin);
            var v = fabric.util.rotateVector(point, radians);
            return new fabric.Point(v.x, v.y).addEquals(origin);
        },
        rotateVector: function(vector, radians) {
            var sin = Math.sin(radians), cos = Math.cos(radians), rx = vector.x * cos - vector.y * sin, ry = vector.x * sin + vector.y * cos;
            return {
                x: rx,
                y: ry
            };
        },
        transformPoint: function(p, t, ignoreOffset) {
            if (ignoreOffset) {
                return new fabric.Point(t[0] * p.x + t[2] * p.y, t[1] * p.x + t[3] * p.y);
            }
            return new fabric.Point(t[0] * p.x + t[2] * p.y + t[4], t[1] * p.x + t[3] * p.y + t[5]);
        },
        makeBoundingBoxFromPoints: function(points) {
            var xPoints = [ points[0].x, points[1].x, points[2].x, points[3].x ], minX = fabric.util.array.min(xPoints), maxX = fabric.util.array.max(xPoints), width = Math.abs(minX - maxX), yPoints = [ points[0].y, points[1].y, points[2].y, points[3].y ], minY = fabric.util.array.min(yPoints), maxY = fabric.util.array.max(yPoints), height = Math.abs(minY - maxY);
            return {
                left: minX,
                top: minY,
                width: width,
                height: height
            };
        },
        invertTransform: function(t) {
            var a = 1 / (t[0] * t[3] - t[1] * t[2]), r = [ a * t[3], -a * t[1], -a * t[2], a * t[0] ], o = fabric.util.transformPoint({
                x: t[4],
                y: t[5]
            }, r, true);
            r[4] = -o.x;
            r[5] = -o.y;
            return r;
        },
        toFixed: function(number, fractionDigits) {
            return parseFloat(Number(number).toFixed(fractionDigits));
        },
        parseUnit: function(value, fontSize) {
            var unit = /\D{0,2}$/.exec(value), number = parseFloat(value);
            if (!fontSize) {
                fontSize = fabric.Text.DEFAULT_SVG_FONT_SIZE;
            }
            switch (unit[0]) {
              case "mm":
                return number * fabric.DPI / 25.4;

              case "cm":
                return number * fabric.DPI / 2.54;

              case "in":
                return number * fabric.DPI;

              case "pt":
                return number * fabric.DPI / 72;

              case "pc":
                return number * fabric.DPI / 72 * 12;

              case "em":
                return number * fontSize;

              default:
                return number;
            }
        },
        falseFunction: function() {
            return false;
        },
        getKlass: function(type, namespace) {
            type = fabric.util.string.camelize(type.charAt(0).toUpperCase() + type.slice(1));
            return fabric.util.resolveNamespace(namespace)[type];
        },
        resolveNamespace: function(namespace) {
            if (!namespace) {
                return fabric;
            }
            var parts = namespace.split("."), len = parts.length, i, obj = global || fabric.window;
            for (i = 0; i < len; ++i) {
                obj = obj[parts[i]];
            }
            return obj;
        },
        loadImage: function(url, callback, context, crossOrigin) {
            if (!url) {
                callback && callback.call(context, url);
                return;
            }
            var img = fabric.util.createImage();
            img.onload = function() {
                callback && callback.call(context, img);
                img = img.onload = img.onerror = null;
            };
            img.onerror = function() {
                fabric.log("Error loading " + img.src);
                callback && callback.call(context, null, true);
                img = img.onload = img.onerror = null;
            };
            if (url.indexOf("data") !== 0 && crossOrigin) {
                img.crossOrigin = crossOrigin;
            }
            img.src = url;
        },
        enlivenObjects: function(objects, callback, namespace, reviver) {
            objects = objects || [];
            function onLoaded() {
                if (++numLoadedObjects === numTotalObjects) {
                    callback && callback(enlivenedObjects);
                }
            }
            var enlivenedObjects = [], numLoadedObjects = 0, numTotalObjects = objects.length, forceAsync = true;
            if (!numTotalObjects) {
                callback && callback(enlivenedObjects);
                return;
            }
            objects.forEach(function(o, index) {
                if (!o || !o.type) {
                    onLoaded();
                    return;
                }
                var klass = fabric.util.getKlass(o.type, namespace);
                klass.fromObject(o, function(obj, error) {
                    error || (enlivenedObjects[index] = obj);
                    reviver && reviver(o, obj, error);
                    onLoaded();
                }, forceAsync);
            });
        },
        enlivenPatterns: function(patterns, callback) {
            patterns = patterns || [];
            function onLoaded() {
                if (++numLoadedPatterns === numPatterns) {
                    callback && callback(enlivenedPatterns);
                }
            }
            var enlivenedPatterns = [], numLoadedPatterns = 0, numPatterns = patterns.length;
            if (!numPatterns) {
                callback && callback(enlivenedPatterns);
                return;
            }
            patterns.forEach(function(p, index) {
                if (p && p.source) {
                    new fabric.Pattern(p, function(pattern) {
                        enlivenedPatterns[index] = pattern;
                        onLoaded();
                    });
                } else {
                    enlivenedPatterns[index] = p;
                    onLoaded();
                }
            });
        },
        groupSVGElements: function(elements, options, path) {
            var object;
            object = new fabric.PathGroup(elements, options);
            if (typeof path !== "undefined") {
                object.sourcePath = path;
            }
            return object;
        },
        populateWithProperties: function(source, destination, properties) {
            if (properties && Object.prototype.toString.call(properties) === "[object Array]") {
                for (var i = 0, len = properties.length; i < len; i++) {
                    if (properties[i] in source) {
                        destination[properties[i]] = source[properties[i]];
                    }
                }
            }
        },
        drawDashedLine: function(ctx, x, y, x2, y2, da) {
            var dx = x2 - x, dy = y2 - y, len = sqrt(dx * dx + dy * dy), rot = atan2(dy, dx), dc = da.length, di = 0, draw = true;
            ctx.save();
            ctx.translate(x, y);
            ctx.moveTo(0, 0);
            ctx.rotate(rot);
            x = 0;
            while (len > x) {
                x += da[di++ % dc];
                if (x > len) {
                    x = len;
                }
                ctx[draw ? "lineTo" : "moveTo"](x, 0);
                draw = !draw;
            }
            ctx.restore();
        },
        createCanvasElement: function(canvasEl) {
            canvasEl || (canvasEl = fabric.document.createElement("canvas"));
            if (!canvasEl.getContext && typeof G_vmlCanvasManager !== "undefined") {
                G_vmlCanvasManager.initElement(canvasEl);
            }
            return canvasEl;
        },
        createImage: function() {
            return fabric.isLikelyNode ? new (require("canvas").Image)() : fabric.document.createElement("img");
        },
        createAccessors: function(klass) {
            var proto = klass.prototype, i, propName, capitalizedPropName, setterName, getterName;
            for (i = proto.stateProperties.length; i--; ) {
                propName = proto.stateProperties[i];
                capitalizedPropName = propName.charAt(0).toUpperCase() + propName.slice(1);
                setterName = "set" + capitalizedPropName;
                getterName = "get" + capitalizedPropName;
                if (!proto[getterName]) {
                    proto[getterName] = function(property) {
                        return new Function('return this.get("' + property + '")');
                    }(propName);
                }
                if (!proto[setterName]) {
                    proto[setterName] = function(property) {
                        return new Function("value", 'return this.set("' + property + '", value)');
                    }(propName);
                }
            }
        },
        clipContext: function(receiver, ctx) {
            ctx.save();
            ctx.beginPath();
            receiver.clipTo(ctx);
            ctx.clip();
        },
        multiplyTransformMatrices: function(a, b, is2x2) {
            return [ a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], is2x2 ? 0 : a[0] * b[4] + a[2] * b[5] + a[4], is2x2 ? 0 : a[1] * b[4] + a[3] * b[5] + a[5] ];
        },
        qrDecompose: function(a) {
            var angle = atan2(a[1], a[0]), denom = pow(a[0], 2) + pow(a[1], 2), scaleX = sqrt(denom), scaleY = (a[0] * a[3] - a[2] * a[1]) / scaleX, skewX = atan2(a[0] * a[2] + a[1] * a[3], denom);
            return {
                angle: angle / PiBy180,
                scaleX: scaleX,
                scaleY: scaleY,
                skewX: skewX / PiBy180,
                skewY: 0,
                translateX: a[4],
                translateY: a[5]
            };
        },
        customTransformMatrix: function(scaleX, scaleY, skewX) {
            var skewMatrixX = [ 1, 0, abs(Math.tan(skewX * PiBy180)), 1 ], scaleMatrix = [ abs(scaleX), 0, 0, abs(scaleY) ];
            return fabric.util.multiplyTransformMatrices(scaleMatrix, skewMatrixX, true);
        },
        resetObjectTransform: function(target) {
            target.scaleX = 1;
            target.scaleY = 1;
            target.skewX = 0;
            target.skewY = 0;
            target.flipX = false;
            target.flipY = false;
            target.setAngle(0);
        },
        getFunctionBody: function(fn) {
            return (String(fn).match(/function[^{]*\{([\s\S]*)\}/) || {})[1];
        },
        isTransparent: function(ctx, x, y, tolerance) {
            if (tolerance > 0) {
                if (x > tolerance) {
                    x -= tolerance;
                } else {
                    x = 0;
                }
                if (y > tolerance) {
                    y -= tolerance;
                } else {
                    y = 0;
                }
            }
            var _isTransparent = true, i, temp, imageData = ctx.getImageData(x, y, tolerance * 2 || 1, tolerance * 2 || 1), l = imageData.data.length;
            for (i = 3; i < l; i += 4) {
                temp = imageData.data[i];
                _isTransparent = temp <= 0;
                if (_isTransparent === false) {
                    break;
                }
            }
            imageData = null;
            return _isTransparent;
        },
        parsePreserveAspectRatioAttribute: function(attribute) {
            var meetOrSlice = "meet", alignX = "Mid", alignY = "Mid", aspectRatioAttrs = attribute.split(" "), align;
            if (aspectRatioAttrs && aspectRatioAttrs.length) {
                meetOrSlice = aspectRatioAttrs.pop();
                if (meetOrSlice !== "meet" && meetOrSlice !== "slice") {
                    align = meetOrSlice;
                    meetOrSlice = "meet";
                } else if (aspectRatioAttrs.length) {
                    align = aspectRatioAttrs.pop();
                }
            }
            alignX = align !== "none" ? align.slice(1, 4) : "none";
            alignY = align !== "none" ? align.slice(5, 8) : "none";
            return {
                meetOrSlice: meetOrSlice,
                alignX: alignX,
                alignY: alignY
            };
        },
        clearFabricFontCache: function(fontFamily) {
            if (!fontFamily) {
                fabric.charWidthsCache = {};
            } else if (fabric.charWidthsCache[fontFamily]) {
                delete fabric.charWidthsCache[fontFamily];
            }
        },
        limitDimsByArea: function(ar, maximumArea) {
            var roughWidth = Math.sqrt(maximumArea * ar), perfLimitSizeY = Math.floor(maximumArea / roughWidth);
            return {
                x: Math.floor(roughWidth),
                y: perfLimitSizeY
            };
        },
        capValue: function(min, value, max) {
            return Math.max(min, Math.min(value, max));
        }
    };
})(typeof exports !== "undefined" ? exports : this);

(function() {
    var arcToSegmentsCache = {}, segmentToBezierCache = {}, boundsOfCurveCache = {}, _join = Array.prototype.join;
    function arcToSegments(toX, toY, rx, ry, large, sweep, rotateX) {
        var argsString = _join.call(arguments);
        if (arcToSegmentsCache[argsString]) {
            return arcToSegmentsCache[argsString];
        }
        var PI = Math.PI, th = rotateX * PI / 180, sinTh = Math.sin(th), cosTh = Math.cos(th), fromX = 0, fromY = 0;
        rx = Math.abs(rx);
        ry = Math.abs(ry);
        var px = -cosTh * toX * .5 - sinTh * toY * .5, py = -cosTh * toY * .5 + sinTh * toX * .5, rx2 = rx * rx, ry2 = ry * ry, py2 = py * py, px2 = px * px, pl = rx2 * ry2 - rx2 * py2 - ry2 * px2, root = 0;
        if (pl < 0) {
            var s = Math.sqrt(1 - pl / (rx2 * ry2));
            rx *= s;
            ry *= s;
        } else {
            root = (large === sweep ? -1 : 1) * Math.sqrt(pl / (rx2 * py2 + ry2 * px2));
        }
        var cx = root * rx * py / ry, cy = -root * ry * px / rx, cx1 = cosTh * cx - sinTh * cy + toX * .5, cy1 = sinTh * cx + cosTh * cy + toY * .5, mTheta = calcVectorAngle(1, 0, (px - cx) / rx, (py - cy) / ry), dtheta = calcVectorAngle((px - cx) / rx, (py - cy) / ry, (-px - cx) / rx, (-py - cy) / ry);
        if (sweep === 0 && dtheta > 0) {
            dtheta -= 2 * PI;
        } else if (sweep === 1 && dtheta < 0) {
            dtheta += 2 * PI;
        }
        var segments = Math.ceil(Math.abs(dtheta / PI * 2)), result = [], mDelta = dtheta / segments, mT = 8 / 3 * Math.sin(mDelta / 4) * Math.sin(mDelta / 4) / Math.sin(mDelta / 2), th3 = mTheta + mDelta;
        for (var i = 0; i < segments; i++) {
            result[i] = segmentToBezier(mTheta, th3, cosTh, sinTh, rx, ry, cx1, cy1, mT, fromX, fromY);
            fromX = result[i][4];
            fromY = result[i][5];
            mTheta = th3;
            th3 += mDelta;
        }
        arcToSegmentsCache[argsString] = result;
        return result;
    }
    function segmentToBezier(th2, th3, cosTh, sinTh, rx, ry, cx1, cy1, mT, fromX, fromY) {
        var argsString2 = _join.call(arguments);
        if (segmentToBezierCache[argsString2]) {
            return segmentToBezierCache[argsString2];
        }
        var costh2 = Math.cos(th2), sinth2 = Math.sin(th2), costh3 = Math.cos(th3), sinth3 = Math.sin(th3), toX = cosTh * rx * costh3 - sinTh * ry * sinth3 + cx1, toY = sinTh * rx * costh3 + cosTh * ry * sinth3 + cy1, cp1X = fromX + mT * (-cosTh * rx * sinth2 - sinTh * ry * costh2), cp1Y = fromY + mT * (-sinTh * rx * sinth2 + cosTh * ry * costh2), cp2X = toX + mT * (cosTh * rx * sinth3 + sinTh * ry * costh3), cp2Y = toY + mT * (sinTh * rx * sinth3 - cosTh * ry * costh3);
        segmentToBezierCache[argsString2] = [ cp1X, cp1Y, cp2X, cp2Y, toX, toY ];
        return segmentToBezierCache[argsString2];
    }
    function calcVectorAngle(ux, uy, vx, vy) {
        var ta = Math.atan2(uy, ux), tb = Math.atan2(vy, vx);
        if (tb >= ta) {
            return tb - ta;
        } else {
            return 2 * Math.PI - (ta - tb);
        }
    }
    fabric.util.drawArc = function(ctx, fx, fy, coords) {
        var rx = coords[0], ry = coords[1], rot = coords[2], large = coords[3], sweep = coords[4], tx = coords[5], ty = coords[6], segs = [ [], [], [], [] ], segsNorm = arcToSegments(tx - fx, ty - fy, rx, ry, large, sweep, rot);
        for (var i = 0, len = segsNorm.length; i < len; i++) {
            segs[i][0] = segsNorm[i][0] + fx;
            segs[i][1] = segsNorm[i][1] + fy;
            segs[i][2] = segsNorm[i][2] + fx;
            segs[i][3] = segsNorm[i][3] + fy;
            segs[i][4] = segsNorm[i][4] + fx;
            segs[i][5] = segsNorm[i][5] + fy;
            ctx.bezierCurveTo.apply(ctx, segs[i]);
        }
    };
    fabric.util.getBoundsOfArc = function(fx, fy, rx, ry, rot, large, sweep, tx, ty) {
        var fromX = 0, fromY = 0, bound, bounds = [], segs = arcToSegments(tx - fx, ty - fy, rx, ry, large, sweep, rot);
        for (var i = 0, len = segs.length; i < len; i++) {
            bound = getBoundsOfCurve(fromX, fromY, segs[i][0], segs[i][1], segs[i][2], segs[i][3], segs[i][4], segs[i][5]);
            bounds.push({
                x: bound[0].x + fx,
                y: bound[0].y + fy
            });
            bounds.push({
                x: bound[1].x + fx,
                y: bound[1].y + fy
            });
            fromX = segs[i][4];
            fromY = segs[i][5];
        }
        return bounds;
    };
    function getBoundsOfCurve(x0, y0, x1, y1, x2, y2, x3, y3) {
        var argsString = _join.call(arguments);
        if (boundsOfCurveCache[argsString]) {
            return boundsOfCurveCache[argsString];
        }
        var sqrt = Math.sqrt, min = Math.min, max = Math.max, abs = Math.abs, tvalues = [], bounds = [ [], [] ], a, b, c, t, t1, t2, b2ac, sqrtb2ac;
        b = 6 * x0 - 12 * x1 + 6 * x2;
        a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
        c = 3 * x1 - 3 * x0;
        for (var i = 0; i < 2; ++i) {
            if (i > 0) {
                b = 6 * y0 - 12 * y1 + 6 * y2;
                a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
                c = 3 * y1 - 3 * y0;
            }
            if (abs(a) < 1e-12) {
                if (abs(b) < 1e-12) {
                    continue;
                }
                t = -c / b;
                if (0 < t && t < 1) {
                    tvalues.push(t);
                }
                continue;
            }
            b2ac = b * b - 4 * c * a;
            if (b2ac < 0) {
                continue;
            }
            sqrtb2ac = sqrt(b2ac);
            t1 = (-b + sqrtb2ac) / (2 * a);
            if (0 < t1 && t1 < 1) {
                tvalues.push(t1);
            }
            t2 = (-b - sqrtb2ac) / (2 * a);
            if (0 < t2 && t2 < 1) {
                tvalues.push(t2);
            }
        }
        var x, y, j = tvalues.length, jlen = j, mt;
        while (j--) {
            t = tvalues[j];
            mt = 1 - t;
            x = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
            bounds[0][j] = x;
            y = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
            bounds[1][j] = y;
        }
        bounds[0][jlen] = x0;
        bounds[1][jlen] = y0;
        bounds[0][jlen + 1] = x3;
        bounds[1][jlen + 1] = y3;
        var result = [ {
            x: min.apply(null, bounds[0]),
            y: min.apply(null, bounds[1])
        }, {
            x: max.apply(null, bounds[0]),
            y: max.apply(null, bounds[1])
        } ];
        boundsOfCurveCache[argsString] = result;
        return result;
    }
    fabric.util.getBoundsOfCurve = getBoundsOfCurve;
})();

(function() {
    var slice = Array.prototype.slice;
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement) {
            if (this === void 0 || this === null) {
                throw new TypeError();
            }
            var t = Object(this), len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 0) {
                n = Number(arguments[1]);
                if (n !== n) {
                    n = 0;
                } else if (n !== 0 && n !== Number.POSITIVE_INFINITY && n !== Number.NEGATIVE_INFINITY) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (;k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        };
    }
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(fn, context) {
            for (var i = 0, len = this.length >>> 0; i < len; i++) {
                if (i in this) {
                    fn.call(context, this[i], i, this);
                }
            }
        };
    }
    if (!Array.prototype.map) {
        Array.prototype.map = function(fn, context) {
            var result = [];
            for (var i = 0, len = this.length >>> 0; i < len; i++) {
                if (i in this) {
                    result[i] = fn.call(context, this[i], i, this);
                }
            }
            return result;
        };
    }
    if (!Array.prototype.every) {
        Array.prototype.every = function(fn, context) {
            for (var i = 0, len = this.length >>> 0; i < len; i++) {
                if (i in this && !fn.call(context, this[i], i, this)) {
                    return false;
                }
            }
            return true;
        };
    }
    if (!Array.prototype.some) {
        Array.prototype.some = function(fn, context) {
            for (var i = 0, len = this.length >>> 0; i < len; i++) {
                if (i in this && fn.call(context, this[i], i, this)) {
                    return true;
                }
            }
            return false;
        };
    }
    if (!Array.prototype.filter) {
        Array.prototype.filter = function(fn, context) {
            var result = [], val;
            for (var i = 0, len = this.length >>> 0; i < len; i++) {
                if (i in this) {
                    val = this[i];
                    if (fn.call(context, val, i, this)) {
                        result.push(val);
                    }
                }
            }
            return result;
        };
    }
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function(fn) {
            var len = this.length >>> 0, i = 0, rv;
            if (arguments.length > 1) {
                rv = arguments[1];
            } else {
                do {
                    if (i in this) {
                        rv = this[i++];
                        break;
                    }
                    if (++i >= len) {
                        throw new TypeError();
                    }
                } while (true);
            }
            for (;i < len; i++) {
                if (i in this) {
                    rv = fn.call(null, rv, this[i], i, this);
                }
            }
            return rv;
        };
    }
    function invoke(array, method) {
        var args = slice.call(arguments, 2), result = [];
        for (var i = 0, len = array.length; i < len; i++) {
            result[i] = args.length ? array[i][method].apply(array[i], args) : array[i][method].call(array[i]);
        }
        return result;
    }
    function max(array, byProperty) {
        return find(array, byProperty, function(value1, value2) {
            return value1 >= value2;
        });
    }
    function min(array, byProperty) {
        return find(array, byProperty, function(value1, value2) {
            return value1 < value2;
        });
    }
    function fill(array, value) {
        var k = array.length;
        while (k--) {
            array[k] = value;
        }
        return array;
    }
    function find(array, byProperty, condition) {
        if (!array || array.length === 0) {
            return;
        }
        var i = array.length - 1, result = byProperty ? array[i][byProperty] : array[i];
        if (byProperty) {
            while (i--) {
                if (condition(array[i][byProperty], result)) {
                    result = array[i][byProperty];
                }
            }
        } else {
            while (i--) {
                if (condition(array[i], result)) {
                    result = array[i];
                }
            }
        }
        return result;
    }
    fabric.util.array = {
        fill: fill,
        invoke: invoke,
        min: min,
        max: max
    };
})();

(function() {
    function extend(destination, source, deep) {
        if (deep) {
            if (!fabric.isLikelyNode && source instanceof Element) {
                destination = source;
            } else if (source instanceof Array) {
                destination = [];
                for (var i = 0, len = source.length; i < len; i++) {
                    destination[i] = extend({}, source[i], deep);
                }
            } else if (source && typeof source === "object") {
                for (var property in source) {
                    if (source.hasOwnProperty(property)) {
                        destination[property] = extend({}, source[property], deep);
                    }
                }
            } else {
                destination = source;
            }
        } else {
            for (var property in source) {
                destination[property] = source[property];
            }
        }
        return destination;
    }
    function clone(object, deep) {
        return extend({}, object, deep);
    }
    fabric.util.object = {
        extend: extend,
        clone: clone
    };
})();

(function() {
    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
        };
    }
    function camelize(string) {
        return string.replace(/-+(.)?/g, function(match, character) {
            return character ? character.toUpperCase() : "";
        });
    }
    function capitalize(string, firstLetterOnly) {
        return string.charAt(0).toUpperCase() + (firstLetterOnly ? string.slice(1) : string.slice(1).toLowerCase());
    }
    function escapeXml(string) {
        return string.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    fabric.util.string = {
        camelize: camelize,
        capitalize: capitalize,
        escapeXml: escapeXml
    };
})();

(function() {
    var slice = Array.prototype.slice, apply = Function.prototype.apply, Dummy = function() {};
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(thisArg) {
            var _this = this, args = slice.call(arguments, 1), bound;
            if (args.length) {
                bound = function() {
                    return apply.call(_this, this instanceof Dummy ? this : thisArg, args.concat(slice.call(arguments)));
                };
            } else {
                bound = function() {
                    return apply.call(_this, this instanceof Dummy ? this : thisArg, arguments);
                };
            }
            Dummy.prototype = this.prototype;
            bound.prototype = new Dummy();
            return bound;
        };
    }
})();

(function() {
    var slice = Array.prototype.slice, emptyFunction = function() {}, IS_DONTENUM_BUGGY = function() {
        for (var p in {
            toString: 1
        }) {
            if (p === "toString") {
                return false;
            }
        }
        return true;
    }(), addMethods = function(klass, source, parent) {
        for (var property in source) {
            if (property in klass.prototype && typeof klass.prototype[property] === "function" && (source[property] + "").indexOf("callSuper") > -1) {
                klass.prototype[property] = function(property) {
                    return function() {
                        var superclass = this.constructor.superclass;
                        this.constructor.superclass = parent;
                        var returnValue = source[property].apply(this, arguments);
                        this.constructor.superclass = superclass;
                        if (property !== "initialize") {
                            return returnValue;
                        }
                    };
                }(property);
            } else {
                klass.prototype[property] = source[property];
            }
            if (IS_DONTENUM_BUGGY) {
                if (source.toString !== Object.prototype.toString) {
                    klass.prototype.toString = source.toString;
                }
                if (source.valueOf !== Object.prototype.valueOf) {
                    klass.prototype.valueOf = source.valueOf;
                }
            }
        }
    };
    function Subclass() {}
    function callSuper(methodName) {
        var parentMethod = null, _this = this;
        while (_this.constructor.superclass) {
            var superClassMethod = _this.constructor.superclass.prototype[methodName];
            if (_this[methodName] !== superClassMethod) {
                parentMethod = superClassMethod;
                break;
            }
            _this = _this.constructor.superclass.prototype;
        }
        if (!parentMethod) {
            return console.log("tried to callSuper " + methodName + ", method not found in prototype chain", this);
        }
        return arguments.length > 1 ? parentMethod.apply(this, slice.call(arguments, 1)) : parentMethod.call(this);
    }
    function createClass() {
        var parent = null, properties = slice.call(arguments, 0);
        if (typeof properties[0] === "function") {
            parent = properties.shift();
        }
        function klass() {
            this.initialize.apply(this, arguments);
        }
        klass.superclass = parent;
        klass.subclasses = [];
        if (parent) {
            Subclass.prototype = parent.prototype;
            klass.prototype = new Subclass();
            parent.subclasses.push(klass);
        }
        for (var i = 0, length = properties.length; i < length; i++) {
            addMethods(klass, properties[i], parent);
        }
        if (!klass.prototype.initialize) {
            klass.prototype.initialize = emptyFunction;
        }
        klass.prototype.constructor = klass;
        klass.prototype.callSuper = callSuper;
        return klass;
    }
    fabric.util.createClass = createClass;
})();

(function() {
    var unknown = "unknown";
    function areHostMethods(object) {
        var methodNames = Array.prototype.slice.call(arguments, 1), t, i, len = methodNames.length;
        for (i = 0; i < len; i++) {
            t = typeof object[methodNames[i]];
            if (!/^(?:function|object|unknown)$/.test(t)) {
                return false;
            }
        }
        return true;
    }
    var getElement, setElement, getUniqueId = function() {
        var uid = 0;
        return function(element) {
            return element.__uniqueID || (element.__uniqueID = "uniqueID__" + uid++);
        };
    }();
    (function() {
        var elements = {};
        getElement = function(uid) {
            return elements[uid];
        };
        setElement = function(uid, element) {
            elements[uid] = element;
        };
    })();
    function createListener(uid, handler) {
        return {
            handler: handler,
            wrappedHandler: createWrappedHandler(uid, handler)
        };
    }
    function createWrappedHandler(uid, handler) {
        return function(e) {
            handler.call(getElement(uid), e || fabric.window.event);
        };
    }
    function createDispatcher(uid, eventName) {
        return function(e) {
            if (handlers[uid] && handlers[uid][eventName]) {
                var handlersForEvent = handlers[uid][eventName];
                for (var i = 0, len = handlersForEvent.length; i < len; i++) {
                    handlersForEvent[i].call(this, e || fabric.window.event);
                }
            }
        };
    }
    var shouldUseAddListenerRemoveListener = areHostMethods(fabric.document.documentElement, "addEventListener", "removeEventListener") && areHostMethods(fabric.window, "addEventListener", "removeEventListener"), shouldUseAttachEventDetachEvent = areHostMethods(fabric.document.documentElement, "attachEvent", "detachEvent") && areHostMethods(fabric.window, "attachEvent", "detachEvent"), listeners = {}, handlers = {}, addListener, removeListener;
    if (shouldUseAddListenerRemoveListener) {
        addListener = function(element, eventName, handler, options) {
            element && element.addEventListener(eventName, handler, shouldUseAttachEventDetachEvent ? false : options);
        };
        removeListener = function(element, eventName, handler, options) {
            element && element.removeEventListener(eventName, handler, shouldUseAttachEventDetachEvent ? false : options);
        };
    } else if (shouldUseAttachEventDetachEvent) {
        addListener = function(element, eventName, handler) {
            if (!element) {
                return;
            }
            var uid = getUniqueId(element);
            setElement(uid, element);
            if (!listeners[uid]) {
                listeners[uid] = {};
            }
            if (!listeners[uid][eventName]) {
                listeners[uid][eventName] = [];
            }
            var listener = createListener(uid, handler);
            listeners[uid][eventName].push(listener);
            element.attachEvent("on" + eventName, listener.wrappedHandler);
        };
        removeListener = function(element, eventName, handler) {
            if (!element) {
                return;
            }
            var uid = getUniqueId(element), listener;
            if (listeners[uid] && listeners[uid][eventName]) {
                for (var i = 0, len = listeners[uid][eventName].length; i < len; i++) {
                    listener = listeners[uid][eventName][i];
                    if (listener && listener.handler === handler) {
                        element.detachEvent("on" + eventName, listener.wrappedHandler);
                        listeners[uid][eventName][i] = null;
                    }
                }
            }
        };
    } else {
        addListener = function(element, eventName, handler) {
            if (!element) {
                return;
            }
            var uid = getUniqueId(element);
            if (!handlers[uid]) {
                handlers[uid] = {};
            }
            if (!handlers[uid][eventName]) {
                handlers[uid][eventName] = [];
                var existingHandler = element["on" + eventName];
                if (existingHandler) {
                    handlers[uid][eventName].push(existingHandler);
                }
                element["on" + eventName] = createDispatcher(uid, eventName);
            }
            handlers[uid][eventName].push(handler);
        };
        removeListener = function(element, eventName, handler) {
            if (!element) {
                return;
            }
            var uid = getUniqueId(element);
            if (handlers[uid] && handlers[uid][eventName]) {
                var handlersForEvent = handlers[uid][eventName];
                for (var i = 0, len = handlersForEvent.length; i < len; i++) {
                    if (handlersForEvent[i] === handler) {
                        handlersForEvent.splice(i, 1);
                    }
                }
            }
        };
    }
    fabric.util.addListener = addListener;
    fabric.util.removeListener = removeListener;
    function getPointer(event) {
        event || (event = fabric.window.event);
        var element = event.target || (typeof event.srcElement !== unknown ? event.srcElement : null), scroll = fabric.util.getScrollLeftTop(element);
        return {
            x: pointerX(event) + scroll.left,
            y: pointerY(event) + scroll.top
        };
    }
    var pointerX = function(event) {
        return typeof event.clientX !== unknown ? event.clientX : 0;
    }, pointerY = function(event) {
        return typeof event.clientY !== unknown ? event.clientY : 0;
    };
    function _getPointer(event, pageProp, clientProp) {
        var touchProp = event.type === "touchend" ? "changedTouches" : "touches";
        return event[touchProp] && event[touchProp][0] ? event[touchProp][0][pageProp] - (event[touchProp][0][pageProp] - event[touchProp][0][clientProp]) || event[clientProp] : event[clientProp];
    }
    if (fabric.isTouchSupported) {
        pointerX = function(event) {
            return _getPointer(event, "pageX", "clientX");
        };
        pointerY = function(event) {
            return _getPointer(event, "pageY", "clientY");
        };
    }
    fabric.util.getPointer = getPointer;
    fabric.util.object.extend(fabric.util, fabric.Observable);
})();

(function() {
    function setStyle(element, styles) {
        var elementStyle = element.style;
        if (!elementStyle) {
            return element;
        }
        if (typeof styles === "string") {
            element.style.cssText += ";" + styles;
            return styles.indexOf("opacity") > -1 ? setOpacity(element, styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) : element;
        }
        for (var property in styles) {
            if (property === "opacity") {
                setOpacity(element, styles[property]);
            } else {
                var normalizedProperty = property === "float" || property === "cssFloat" ? typeof elementStyle.styleFloat === "undefined" ? "cssFloat" : "styleFloat" : property;
                elementStyle[normalizedProperty] = styles[property];
            }
        }
        return element;
    }
    var parseEl = fabric.document.createElement("div"), supportsOpacity = typeof parseEl.style.opacity === "string", supportsFilters = typeof parseEl.style.filter === "string", reOpacity = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/, setOpacity = function(element) {
        return element;
    };
    if (supportsOpacity) {
        setOpacity = function(element, value) {
            element.style.opacity = value;
            return element;
        };
    } else if (supportsFilters) {
        setOpacity = function(element, value) {
            var es = element.style;
            if (element.currentStyle && !element.currentStyle.hasLayout) {
                es.zoom = 1;
            }
            if (reOpacity.test(es.filter)) {
                value = value >= .9999 ? "" : "alpha(opacity=" + value * 100 + ")";
                es.filter = es.filter.replace(reOpacity, value);
            } else {
                es.filter += " alpha(opacity=" + value * 100 + ")";
            }
            return element;
        };
    }
    fabric.util.setStyle = setStyle;
})();

(function() {
    var _slice = Array.prototype.slice;
    function getById(id) {
        return typeof id === "string" ? fabric.document.getElementById(id) : id;
    }
    var sliceCanConvertNodelists, toArray = function(arrayLike) {
        return _slice.call(arrayLike, 0);
    };
    try {
        sliceCanConvertNodelists = toArray(fabric.document.childNodes) instanceof Array;
    } catch (err) {}
    if (!sliceCanConvertNodelists) {
        toArray = function(arrayLike) {
            var arr = new Array(arrayLike.length), i = arrayLike.length;
            while (i--) {
                arr[i] = arrayLike[i];
            }
            return arr;
        };
    }
    function makeElement(tagName, attributes) {
        var el = fabric.document.createElement(tagName);
        for (var prop in attributes) {
            if (prop === "class") {
                el.className = attributes[prop];
            } else if (prop === "for") {
                el.htmlFor = attributes[prop];
            } else {
                el.setAttribute(prop, attributes[prop]);
            }
        }
        return el;
    }
    function addClass(element, className) {
        if (element && (" " + element.className + " ").indexOf(" " + className + " ") === -1) {
            element.className += (element.className ? " " : "") + className;
        }
    }
    function wrapElement(element, wrapper, attributes) {
        if (typeof wrapper === "string") {
            wrapper = makeElement(wrapper, attributes);
        }
        if (element.parentNode) {
            element.parentNode.replaceChild(wrapper, element);
        }
        wrapper.appendChild(element);
        return wrapper;
    }
    function getScrollLeftTop(element) {
        var left = 0, top = 0, docElement = fabric.document.documentElement, body = fabric.document.body || {
            scrollLeft: 0,
            scrollTop: 0
        };
        while (element && (element.parentNode || element.host)) {
            element = element.parentNode || element.host;
            if (element === fabric.document) {
                left = body.scrollLeft || docElement.scrollLeft || 0;
                top = body.scrollTop || docElement.scrollTop || 0;
            } else {
                left += element.scrollLeft || 0;
                top += element.scrollTop || 0;
            }
            if (element.nodeType === 1 && fabric.util.getElementStyle(element, "position") === "fixed") {
                break;
            }
        }
        return {
            left: left,
            top: top
        };
    }
    function getElementOffset(element) {
        var docElem, doc = element && element.ownerDocument, box = {
            left: 0,
            top: 0
        }, offset = {
            left: 0,
            top: 0
        }, scrollLeftTop, offsetAttributes = {
            borderLeftWidth: "left",
            borderTopWidth: "top",
            paddingLeft: "left",
            paddingTop: "top"
        };
        if (!doc) {
            return offset;
        }
        for (var attr in offsetAttributes) {
            offset[offsetAttributes[attr]] += parseInt(getElementStyle(element, attr), 10) || 0;
        }
        docElem = doc.documentElement;
        if (typeof element.getBoundingClientRect !== "undefined") {
            box = element.getBoundingClientRect();
        }
        scrollLeftTop = getScrollLeftTop(element);
        return {
            left: box.left + scrollLeftTop.left - (docElem.clientLeft || 0) + offset.left,
            top: box.top + scrollLeftTop.top - (docElem.clientTop || 0) + offset.top
        };
    }
    var getElementStyle;
    if (fabric.document.defaultView && fabric.document.defaultView.getComputedStyle) {
        getElementStyle = function(element, attr) {
            var style = fabric.document.defaultView.getComputedStyle(element, null);
            return style ? style[attr] : undefined;
        };
    } else {
        getElementStyle = function(element, attr) {
            var value = element.style[attr];
            if (!value && element.currentStyle) {
                value = element.currentStyle[attr];
            }
            return value;
        };
    }
    (function() {
        var style = fabric.document.documentElement.style, selectProp = "userSelect" in style ? "userSelect" : "MozUserSelect" in style ? "MozUserSelect" : "WebkitUserSelect" in style ? "WebkitUserSelect" : "KhtmlUserSelect" in style ? "KhtmlUserSelect" : "";
        function makeElementUnselectable(element) {
            if (typeof element.onselectstart !== "undefined") {
                element.onselectstart = fabric.util.falseFunction;
            }
            if (selectProp) {
                element.style[selectProp] = "none";
            } else if (typeof element.unselectable === "string") {
                element.unselectable = "on";
            }
            return element;
        }
        function makeElementSelectable(element) {
            if (typeof element.onselectstart !== "undefined") {
                element.onselectstart = null;
            }
            if (selectProp) {
                element.style[selectProp] = "";
            } else if (typeof element.unselectable === "string") {
                element.unselectable = "";
            }
            return element;
        }
        fabric.util.makeElementUnselectable = makeElementUnselectable;
        fabric.util.makeElementSelectable = makeElementSelectable;
    })();
    (function() {
        function getScript(url, callback) {
            var headEl = fabric.document.getElementsByTagName("head")[0], scriptEl = fabric.document.createElement("script"), loading = true;
            scriptEl.onload = scriptEl.onreadystatechange = function(e) {
                if (loading) {
                    if (typeof this.readyState === "string" && this.readyState !== "loaded" && this.readyState !== "complete") {
                        return;
                    }
                    loading = false;
                    callback(e || fabric.window.event);
                    scriptEl = scriptEl.onload = scriptEl.onreadystatechange = null;
                }
            };
            scriptEl.src = url;
            headEl.appendChild(scriptEl);
        }
        fabric.util.getScript = getScript;
    })();
    fabric.util.getById = getById;
    fabric.util.toArray = toArray;
    fabric.util.makeElement = makeElement;
    fabric.util.addClass = addClass;
    fabric.util.wrapElement = wrapElement;
    fabric.util.getScrollLeftTop = getScrollLeftTop;
    fabric.util.getElementOffset = getElementOffset;
    fabric.util.getElementStyle = getElementStyle;
})();

(function() {
    function addParamToUrl(url, param) {
        return url + (/\?/.test(url) ? "&" : "?") + param;
    }
    var makeXHR = function() {
        var factories = [ function() {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }, function() {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }, function() {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0");
        }, function() {
            return new XMLHttpRequest();
        } ];
        for (var i = factories.length; i--; ) {
            try {
                var req = factories[i]();
                if (req) {
                    return factories[i];
                }
            } catch (err) {}
        }
    }();
    function emptyFn() {}
    function request(url, options) {
        options || (options = {});
        var method = options.method ? options.method.toUpperCase() : "GET", onComplete = options.onComplete || function() {}, xhr = makeXHR(), body = options.body || options.parameters;
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                onComplete(xhr);
                xhr.onreadystatechange = emptyFn;
            }
        };
        if (method === "GET") {
            body = null;
            if (typeof options.parameters === "string") {
                url = addParamToUrl(url, options.parameters);
            }
        }
        xhr.open(method, url, true);
        if (method === "POST" || method === "PUT") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        xhr.send(body);
        return xhr;
    }
    fabric.util.request = request;
})();

fabric.log = function() {};

fabric.warn = function() {};

if (typeof console !== "undefined") {
    [ "log", "warn" ].forEach(function(methodName) {
        if (typeof console[methodName] !== "undefined" && typeof console[methodName].apply === "function") {
            fabric[methodName] = function() {
                return console[methodName].apply(console, arguments);
            };
        }
    });
}

(function() {
    function noop() {
        return false;
    }
    function animate(options) {
        requestAnimFrame(function(timestamp) {
            options || (options = {});
            var start = timestamp || +new Date(), duration = options.duration || 500, finish = start + duration, time, onChange = options.onChange || noop, abort = options.abort || noop, onComplete = options.onComplete || noop, easing = options.easing || function(t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            }, startValue = "startValue" in options ? options.startValue : 0, endValue = "endValue" in options ? options.endValue : 100, byValue = options.byValue || endValue - startValue;
            options.onStart && options.onStart();
            (function tick(ticktime) {
                if (abort()) {
                    onComplete(endValue, 1, 1);
                    return;
                }
                time = ticktime || +new Date();
                var currentTime = time > finish ? duration : time - start, timePerc = currentTime / duration, current = easing(currentTime, startValue, byValue, duration), valuePerc = Math.abs((current - startValue) / byValue);
                onChange(current, valuePerc, timePerc);
                if (time > finish) {
                    options.onComplete && options.onComplete();
                    return;
                }
                requestAnimFrame(tick);
            })(start);
        });
    }
    var _requestAnimFrame = fabric.window.requestAnimationFrame || fabric.window.webkitRequestAnimationFrame || fabric.window.mozRequestAnimationFrame || fabric.window.oRequestAnimationFrame || fabric.window.msRequestAnimationFrame || function(callback) {
        fabric.window.setTimeout(callback, 1e3 / 60);
    };
    function requestAnimFrame() {
        return _requestAnimFrame.apply(fabric.window, arguments);
    }
    fabric.util.animate = animate;
    fabric.util.requestAnimFrame = requestAnimFrame;
})();

(function() {
    function calculateColor(begin, end, pos) {
        var color = "rgba(" + parseInt(begin[0] + pos * (end[0] - begin[0]), 10) + "," + parseInt(begin[1] + pos * (end[1] - begin[1]), 10) + "," + parseInt(begin[2] + pos * (end[2] - begin[2]), 10);
        color += "," + (begin && end ? parseFloat(begin[3] + pos * (end[3] - begin[3])) : 1);
        color += ")";
        return color;
    }
    function animateColor(fromColor, toColor, duration, options) {
        var startColor = new fabric.Color(fromColor).getSource(), endColor = new fabric.Color(toColor).getSource();
        options = options || {};
        fabric.util.animate(fabric.util.object.extend(options, {
            duration: duration || 500,
            startValue: startColor,
            endValue: endColor,
            byValue: endColor,
            easing: function(currentTime, startValue, byValue, duration) {
                var posValue = options.colorEasing ? options.colorEasing(currentTime, duration) : 1 - Math.cos(currentTime / duration * (Math.PI / 2));
                return calculateColor(startValue, byValue, posValue);
            }
        }));
    }
    fabric.util.animateColor = animateColor;
})();

(function() {
    function normalize(a, c, p, s) {
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            if (c === 0 && a === 0) {
                s = p / (2 * Math.PI) * Math.asin(1);
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
        }
        return {
            a: a,
            c: c,
            p: p,
            s: s
        };
    }
    function elastic(opts, t, d) {
        return opts.a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - opts.s) * (2 * Math.PI) / opts.p);
    }
    function easeOutCubic(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t * t + b;
        }
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
    function easeInQuart(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    }
    function easeOutQuart(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }
    function easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
    function easeInQuint(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    }
    function easeOutQuint(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    }
    function easeInOutQuint(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t * t * t * t + b;
        }
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
    function easeInSine(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }
    function easeOutSine(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }
    function easeInOutSine(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
    function easeInExpo(t, b, c, d) {
        return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    }
    function easeOutExpo(t, b, c, d) {
        return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }
    function easeInOutExpo(t, b, c, d) {
        if (t === 0) {
            return b;
        }
        if (t === d) {
            return b + c;
        }
        t /= d / 2;
        if (t < 1) {
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        }
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
    function easeInCirc(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    }
    function easeOutCirc(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }
    function easeInOutCirc(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        }
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
    function easeInElastic(t, b, c, d) {
        var s = 1.70158, p = 0, a = c;
        if (t === 0) {
            return b;
        }
        t /= d;
        if (t === 1) {
            return b + c;
        }
        if (!p) {
            p = d * .3;
        }
        var opts = normalize(a, c, p, s);
        return -elastic(opts, t, d) + b;
    }
    function easeOutElastic(t, b, c, d) {
        var s = 1.70158, p = 0, a = c;
        if (t === 0) {
            return b;
        }
        t /= d;
        if (t === 1) {
            return b + c;
        }
        if (!p) {
            p = d * .3;
        }
        var opts = normalize(a, c, p, s);
        return opts.a * Math.pow(2, -10 * t) * Math.sin((t * d - opts.s) * (2 * Math.PI) / opts.p) + opts.c + b;
    }
    function easeInOutElastic(t, b, c, d) {
        var s = 1.70158, p = 0, a = c;
        if (t === 0) {
            return b;
        }
        t /= d / 2;
        if (t === 2) {
            return b + c;
        }
        if (!p) {
            p = d * (.3 * 1.5);
        }
        var opts = normalize(a, c, p, s);
        if (t < 1) {
            return -.5 * elastic(opts, t, d) + b;
        }
        return opts.a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - opts.s) * (2 * Math.PI) / opts.p) * .5 + opts.c + b;
    }
    function easeInBack(t, b, c, d, s) {
        if (s === undefined) {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
    function easeOutBack(t, b, c, d, s) {
        if (s === undefined) {
            s = 1.70158;
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
    function easeInOutBack(t, b, c, d, s) {
        if (s === undefined) {
            s = 1.70158;
        }
        t /= d / 2;
        if (t < 1) {
            return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    }
    function easeInBounce(t, b, c, d) {
        return c - easeOutBounce(d - t, 0, c, d) + b;
    }
    function easeOutBounce(t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
        } else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
        }
    }
    function easeInOutBounce(t, b, c, d) {
        if (t < d / 2) {
            return easeInBounce(t * 2, 0, c, d) * .5 + b;
        }
        return easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
    fabric.util.ease = {
        easeInQuad: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) {
                return c / 2 * t * t + b;
            }
            return -c / 2 * (--t * (t - 2) - 1) + b;
        },
        easeInCubic: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: easeOutCubic,
        easeInOutCubic: easeInOutCubic,
        easeInQuart: easeInQuart,
        easeOutQuart: easeOutQuart,
        easeInOutQuart: easeInOutQuart,
        easeInQuint: easeInQuint,
        easeOutQuint: easeOutQuint,
        easeInOutQuint: easeInOutQuint,
        easeInSine: easeInSine,
        easeOutSine: easeOutSine,
        easeInOutSine: easeInOutSine,
        easeInExpo: easeInExpo,
        easeOutExpo: easeOutExpo,
        easeInOutExpo: easeInOutExpo,
        easeInCirc: easeInCirc,
        easeOutCirc: easeOutCirc,
        easeInOutCirc: easeInOutCirc,
        easeInElastic: easeInElastic,
        easeOutElastic: easeOutElastic,
        easeInOutElastic: easeInOutElastic,
        easeInBack: easeInBack,
        easeOutBack: easeOutBack,
        easeInOutBack: easeInOutBack,
        easeInBounce: easeInBounce,
        easeOutBounce: easeOutBounce,
        easeInOutBounce: easeInOutBounce
    };
})();

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, clone = fabric.util.object.clone, toFixed = fabric.util.toFixed, parseUnit = fabric.util.parseUnit, multiplyTransformMatrices = fabric.util.multiplyTransformMatrices, reAllowedSVGTagNames = /^(path|circle|polygon|polyline|ellipse|rect|line|image|text)$/i, reViewBoxTagNames = /^(symbol|image|marker|pattern|view|svg)$/i, reNotAllowedAncestors = /^(?:pattern|defs|symbol|metadata|clipPath|mask)$/i, reAllowedParents = /^(symbol|g|a|svg)$/i, attributesMap = {
        cx: "left",
        x: "left",
        r: "radius",
        cy: "top",
        y: "top",
        display: "visible",
        visibility: "visible",
        transform: "transformMatrix",
        "fill-opacity": "fillOpacity",
        "fill-rule": "fillRule",
        "font-family": "fontFamily",
        "font-size": "fontSize",
        "font-style": "fontStyle",
        "font-weight": "fontWeight",
        "stroke-dasharray": "strokeDashArray",
        "stroke-linecap": "strokeLineCap",
        "stroke-linejoin": "strokeLineJoin",
        "stroke-miterlimit": "strokeMiterLimit",
        "stroke-opacity": "strokeOpacity",
        "stroke-width": "strokeWidth",
        "text-decoration": "textDecoration",
        "text-anchor": "originX",
        opacity: "opacity"
    }, colorAttributes = {
        stroke: "strokeOpacity",
        fill: "fillOpacity"
    };
    fabric.cssRules = {};
    fabric.gradientDefs = {};
    function normalizeAttr(attr) {
        if (attr in attributesMap) {
            return attributesMap[attr];
        }
        return attr;
    }
    function normalizeValue(attr, value, parentAttributes, fontSize) {
        var isArray = Object.prototype.toString.call(value) === "[object Array]", parsed;
        if ((attr === "fill" || attr === "stroke") && value === "none") {
            value = "";
        } else if (attr === "strokeDashArray") {
            if (value === "none") {
                value = null;
            } else {
                value = value.replace(/,/g, " ").split(/\s+/).map(function(n) {
                    return parseFloat(n);
                });
            }
        } else if (attr === "transformMatrix") {
            if (parentAttributes && parentAttributes.transformMatrix) {
                value = multiplyTransformMatrices(parentAttributes.transformMatrix, fabric.parseTransformAttribute(value));
            } else {
                value = fabric.parseTransformAttribute(value);
            }
        } else if (attr === "visible") {
            value = value === "none" || value === "hidden" ? false : true;
            if (parentAttributes && parentAttributes.visible === false) {
                value = false;
            }
        } else if (attr === "opacity") {
            value = parseFloat(value);
            if (parentAttributes && typeof parentAttributes.opacity !== "undefined") {
                value *= parentAttributes.opacity;
            }
        } else if (attr === "originX") {
            value = value === "start" ? "left" : value === "end" ? "right" : "center";
        } else {
            parsed = isArray ? value.map(parseUnit) : parseUnit(value, fontSize);
        }
        return !isArray && isNaN(parsed) ? value : parsed;
    }
    function _setStrokeFillOpacity(attributes) {
        for (var attr in colorAttributes) {
            if (typeof attributes[colorAttributes[attr]] === "undefined" || attributes[attr] === "") {
                continue;
            }
            if (typeof attributes[attr] === "undefined") {
                if (!fabric.Object.prototype[attr]) {
                    continue;
                }
                attributes[attr] = fabric.Object.prototype[attr];
            }
            if (attributes[attr].indexOf("url(") === 0) {
                continue;
            }
            var color = new fabric.Color(attributes[attr]);
            attributes[attr] = color.setAlpha(toFixed(color.getAlpha() * attributes[colorAttributes[attr]], 2)).toRgba();
        }
        return attributes;
    }
    function _getMultipleNodes(doc, nodeNames) {
        var nodeName, nodeArray = [], nodeList;
        for (var i = 0; i < nodeNames.length; i++) {
            nodeName = nodeNames[i];
            nodeList = doc.getElementsByTagName(nodeName);
            nodeArray = nodeArray.concat(Array.prototype.slice.call(nodeList));
        }
        return nodeArray;
    }
    fabric.parseTransformAttribute = function() {
        function rotateMatrix(matrix, args) {
            var cos = Math.cos(args[0]), sin = Math.sin(args[0]), x = 0, y = 0;
            if (args.length === 3) {
                x = args[1];
                y = args[2];
            }
            matrix[0] = cos;
            matrix[1] = sin;
            matrix[2] = -sin;
            matrix[3] = cos;
            matrix[4] = x - (cos * x - sin * y);
            matrix[5] = y - (sin * x + cos * y);
        }
        function scaleMatrix(matrix, args) {
            var multiplierX = args[0], multiplierY = args.length === 2 ? args[1] : args[0];
            matrix[0] = multiplierX;
            matrix[3] = multiplierY;
        }
        function skewMatrix(matrix, args, pos) {
            matrix[pos] = Math.tan(fabric.util.degreesToRadians(args[0]));
        }
        function translateMatrix(matrix, args) {
            matrix[4] = args[0];
            if (args.length === 2) {
                matrix[5] = args[1];
            }
        }
        var iMatrix = [ 1, 0, 0, 1, 0, 0 ], number = fabric.reNum, commaWsp = "(?:\\s+,?\\s*|,\\s*)", skewX = "(?:(skewX)\\s*\\(\\s*(" + number + ")\\s*\\))", skewY = "(?:(skewY)\\s*\\(\\s*(" + number + ")\\s*\\))", rotate = "(?:(rotate)\\s*\\(\\s*(" + number + ")(?:" + commaWsp + "(" + number + ")" + commaWsp + "(" + number + "))?\\s*\\))", scale = "(?:(scale)\\s*\\(\\s*(" + number + ")(?:" + commaWsp + "(" + number + "))?\\s*\\))", translate = "(?:(translate)\\s*\\(\\s*(" + number + ")(?:" + commaWsp + "(" + number + "))?\\s*\\))", matrix = "(?:(matrix)\\s*\\(\\s*" + "(" + number + ")" + commaWsp + "(" + number + ")" + commaWsp + "(" + number + ")" + commaWsp + "(" + number + ")" + commaWsp + "(" + number + ")" + commaWsp + "(" + number + ")" + "\\s*\\))", transform = "(?:" + matrix + "|" + translate + "|" + scale + "|" + rotate + "|" + skewX + "|" + skewY + ")", transforms = "(?:" + transform + "(?:" + commaWsp + "*" + transform + ")*" + ")", transformList = "^\\s*(?:" + transforms + "?)\\s*$", reTransformList = new RegExp(transformList), reTransform = new RegExp(transform, "g");
        return function(attributeValue) {
            var matrix = iMatrix.concat(), matrices = [];
            if (!attributeValue || attributeValue && !reTransformList.test(attributeValue)) {
                return matrix;
            }
            attributeValue.replace(reTransform, function(match) {
                var m = new RegExp(transform).exec(match).filter(function(match) {
                    return !!match;
                }), operation = m[1], args = m.slice(2).map(parseFloat);
                switch (operation) {
                  case "translate":
                    translateMatrix(matrix, args);
                    break;

                  case "rotate":
                    args[0] = fabric.util.degreesToRadians(args[0]);
                    rotateMatrix(matrix, args);
                    break;

                  case "scale":
                    scaleMatrix(matrix, args);
                    break;

                  case "skewX":
                    skewMatrix(matrix, args, 2);
                    break;

                  case "skewY":
                    skewMatrix(matrix, args, 1);
                    break;

                  case "matrix":
                    matrix = args;
                    break;
                }
                matrices.push(matrix.concat());
                matrix = iMatrix.concat();
            });
            var combinedMatrix = matrices[0];
            while (matrices.length > 1) {
                matrices.shift();
                combinedMatrix = fabric.util.multiplyTransformMatrices(combinedMatrix, matrices[0]);
            }
            return combinedMatrix;
        };
    }();
    function parseStyleString(style, oStyle) {
        var attr, value;
        style.replace(/;\s*$/, "").split(";").forEach(function(chunk) {
            var pair = chunk.split(":");
            attr = pair[0].trim().toLowerCase();
            value = pair[1].trim();
            oStyle[attr] = value;
        });
    }
    function parseStyleObject(style, oStyle) {
        var attr, value;
        for (var prop in style) {
            if (typeof style[prop] === "undefined") {
                continue;
            }
            attr = prop.toLowerCase();
            value = style[prop];
            oStyle[attr] = value;
        }
    }
    function getGlobalStylesForElement(element, svgUid) {
        var styles = {};
        for (var rule in fabric.cssRules[svgUid]) {
            if (elementMatchesRule(element, rule.split(" "))) {
                for (var property in fabric.cssRules[svgUid][rule]) {
                    styles[property] = fabric.cssRules[svgUid][rule][property];
                }
            }
        }
        return styles;
    }
    function elementMatchesRule(element, selectors) {
        var firstMatching, parentMatching = true;
        firstMatching = selectorMatches(element, selectors.pop());
        if (firstMatching && selectors.length) {
            parentMatching = doesSomeParentMatch(element, selectors);
        }
        return firstMatching && parentMatching && selectors.length === 0;
    }
    function doesSomeParentMatch(element, selectors) {
        var selector, parentMatching = true;
        while (element.parentNode && element.parentNode.nodeType === 1 && selectors.length) {
            if (parentMatching) {
                selector = selectors.pop();
            }
            element = element.parentNode;
            parentMatching = selectorMatches(element, selector);
        }
        return selectors.length === 0;
    }
    function selectorMatches(element, selector) {
        var nodeName = element.nodeName, classNames = element.getAttribute("class"), id = element.getAttribute("id"), matcher;
        matcher = new RegExp("^" + nodeName, "i");
        selector = selector.replace(matcher, "");
        if (id && selector.length) {
            matcher = new RegExp("#" + id + "(?![a-zA-Z\\-]+)", "i");
            selector = selector.replace(matcher, "");
        }
        if (classNames && selector.length) {
            classNames = classNames.split(" ");
            for (var i = classNames.length; i--; ) {
                matcher = new RegExp("\\." + classNames[i] + "(?![a-zA-Z\\-]+)", "i");
                selector = selector.replace(matcher, "");
            }
        }
        return selector.length === 0;
    }
    function elementById(doc, id) {
        var el;
        doc.getElementById && (el = doc.getElementById(id));
        if (el) {
            return el;
        }
        var node, i, nodelist = doc.getElementsByTagName("*");
        for (i = 0; i < nodelist.length; i++) {
            node = nodelist[i];
            if (id === node.getAttribute("id")) {
                return node;
            }
        }
    }
    function parseUseDirectives(doc) {
        var nodelist = _getMultipleNodes(doc, [ "use", "svg:use" ]), i = 0;
        while (nodelist.length && i < nodelist.length) {
            var el = nodelist[i], xlink = el.getAttribute("xlink:href").substr(1), x = el.getAttribute("x") || 0, y = el.getAttribute("y") || 0, el2 = elementById(doc, xlink).cloneNode(true), currentTrans = (el2.getAttribute("transform") || "") + " translate(" + x + ", " + y + ")", parentNode, oldLength = nodelist.length, attr, j, attrs, l;
            applyViewboxTransform(el2);
            if (/^svg$/i.test(el2.nodeName)) {
                var el3 = el2.ownerDocument.createElement("g");
                for (j = 0, attrs = el2.attributes, l = attrs.length; j < l; j++) {
                    attr = attrs.item(j);
                    el3.setAttribute(attr.nodeName, attr.nodeValue);
                }
                while (el2.firstChild) {
                    el3.appendChild(el2.firstChild);
                }
                el2 = el3;
            }
            for (j = 0, attrs = el.attributes, l = attrs.length; j < l; j++) {
                attr = attrs.item(j);
                if (attr.nodeName === "x" || attr.nodeName === "y" || attr.nodeName === "xlink:href") {
                    continue;
                }
                if (attr.nodeName === "transform") {
                    currentTrans = attr.nodeValue + " " + currentTrans;
                } else {
                    el2.setAttribute(attr.nodeName, attr.nodeValue);
                }
            }
            el2.setAttribute("transform", currentTrans);
            el2.setAttribute("instantiated_by_use", "1");
            el2.removeAttribute("id");
            parentNode = el.parentNode;
            parentNode.replaceChild(el2, el);
            if (nodelist.length === oldLength) {
                i++;
            }
        }
    }
    var reViewBoxAttrValue = new RegExp("^" + "\\s*(" + fabric.reNum + "+)\\s*,?" + "\\s*(" + fabric.reNum + "+)\\s*,?" + "\\s*(" + fabric.reNum + "+)\\s*,?" + "\\s*(" + fabric.reNum + "+)\\s*" + "$");
    function applyViewboxTransform(element) {
        var viewBoxAttr = element.getAttribute("viewBox"), scaleX = 1, scaleY = 1, minX = 0, minY = 0, viewBoxWidth, viewBoxHeight, matrix, el, widthAttr = element.getAttribute("width"), heightAttr = element.getAttribute("height"), x = element.getAttribute("x") || 0, y = element.getAttribute("y") || 0, preserveAspectRatio = element.getAttribute("preserveAspectRatio") || "", missingViewBox = !viewBoxAttr || !reViewBoxTagNames.test(element.nodeName) || !(viewBoxAttr = viewBoxAttr.match(reViewBoxAttrValue)), missingDimAttr = !widthAttr || !heightAttr || widthAttr === "100%" || heightAttr === "100%", toBeParsed = missingViewBox && missingDimAttr, parsedDim = {}, translateMatrix = "";
        parsedDim.width = 0;
        parsedDim.height = 0;
        parsedDim.toBeParsed = toBeParsed;
        if (toBeParsed) {
            return parsedDim;
        }
        if (missingViewBox) {
            parsedDim.width = parseUnit(widthAttr);
            parsedDim.height = parseUnit(heightAttr);
            return parsedDim;
        }
        minX = -parseFloat(viewBoxAttr[1]);
        minY = -parseFloat(viewBoxAttr[2]);
        viewBoxWidth = parseFloat(viewBoxAttr[3]);
        viewBoxHeight = parseFloat(viewBoxAttr[4]);
        if (!missingDimAttr) {
            parsedDim.width = parseUnit(widthAttr);
            parsedDim.height = parseUnit(heightAttr);
            scaleX = parsedDim.width / viewBoxWidth;
            scaleY = parsedDim.height / viewBoxHeight;
        } else {
            parsedDim.width = viewBoxWidth;
            parsedDim.height = viewBoxHeight;
        }
        preserveAspectRatio = fabric.util.parsePreserveAspectRatioAttribute(preserveAspectRatio);
        if (preserveAspectRatio.alignX !== "none") {
            scaleY = scaleX = scaleX > scaleY ? scaleY : scaleX;
        }
        if (scaleX === 1 && scaleY === 1 && minX === 0 && minY === 0 && x === 0 && y === 0) {
            return parsedDim;
        }
        if (x || y) {
            translateMatrix = " translate(" + parseUnit(x) + " " + parseUnit(y) + ") ";
        }
        matrix = translateMatrix + " matrix(" + scaleX + " 0" + " 0 " + scaleY + " " + minX * scaleX + " " + minY * scaleY + ") ";
        if (element.nodeName === "svg") {
            el = element.ownerDocument.createElement("g");
            while (element.firstChild) {
                el.appendChild(element.firstChild);
            }
            element.appendChild(el);
        } else {
            el = element;
            matrix = el.getAttribute("transform") + matrix;
        }
        el.setAttribute("transform", matrix);
        return parsedDim;
    }
    function hasAncestorWithNodeName(element, nodeName) {
        while (element && (element = element.parentNode)) {
            if (element.nodeName && nodeName.test(element.nodeName.replace("svg:", "")) && !element.getAttribute("instantiated_by_use")) {
                return true;
            }
        }
        return false;
    }
    fabric.parseSVGDocument = function(doc, callback, reviver, parsingOptions) {
        if (!doc) {
            return;
        }
        parseUseDirectives(doc);
        var svgUid = fabric.Object.__uid++, options = applyViewboxTransform(doc), descendants = fabric.util.toArray(doc.getElementsByTagName("*"));
        options.crossOrigin = parsingOptions && parsingOptions.crossOrigin;
        options.svgUid = svgUid;
        if (descendants.length === 0 && fabric.isLikelyNode) {
            descendants = doc.selectNodes('//*[name(.)!="svg"]');
            var arr = [];
            for (var i = 0, len = descendants.length; i < len; i++) {
                arr[i] = descendants[i];
            }
            descendants = arr;
        }
        var elements = descendants.filter(function(el) {
            applyViewboxTransform(el);
            return reAllowedSVGTagNames.test(el.nodeName.replace("svg:", "")) && !hasAncestorWithNodeName(el, reNotAllowedAncestors);
        });
        if (!elements || elements && !elements.length) {
            callback && callback([], {});
            return;
        }
        fabric.gradientDefs[svgUid] = fabric.getGradientDefs(doc);
        fabric.cssRules[svgUid] = fabric.getCSSRules(doc);
        fabric.parseElements(elements, function(instances) {
            if (callback) {
                callback(instances, options);
            }
        }, clone(options), reviver, parsingOptions);
    };
    var reFontDeclaration = new RegExp("(normal|italic)?\\s*(normal|small-caps)?\\s*" + "(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*(" + fabric.reNum + "(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|" + fabric.reNum + "))?\\s+(.*)");
    extend(fabric, {
        parseFontDeclaration: function(value, oStyle) {
            var match = value.match(reFontDeclaration);
            if (!match) {
                return;
            }
            var fontStyle = match[1], fontWeight = match[3], fontSize = match[4], lineHeight = match[5], fontFamily = match[6];
            if (fontStyle) {
                oStyle.fontStyle = fontStyle;
            }
            if (fontWeight) {
                oStyle.fontWeight = isNaN(parseFloat(fontWeight)) ? fontWeight : parseFloat(fontWeight);
            }
            if (fontSize) {
                oStyle.fontSize = parseUnit(fontSize);
            }
            if (fontFamily) {
                oStyle.fontFamily = fontFamily;
            }
            if (lineHeight) {
                oStyle.lineHeight = lineHeight === "normal" ? 1 : lineHeight;
            }
        },
        getGradientDefs: function(doc) {
            var tagArray = [ "linearGradient", "radialGradient", "svg:linearGradient", "svg:radialGradient" ], elList = _getMultipleNodes(doc, tagArray), el, j = 0, id, xlink, gradientDefs = {}, idsToXlinkMap = {};
            j = elList.length;
            while (j--) {
                el = elList[j];
                xlink = el.getAttribute("xlink:href");
                id = el.getAttribute("id");
                if (xlink) {
                    idsToXlinkMap[id] = xlink.substr(1);
                }
                gradientDefs[id] = el;
            }
            for (id in idsToXlinkMap) {
                var el2 = gradientDefs[idsToXlinkMap[id]].cloneNode(true);
                el = gradientDefs[id];
                while (el2.firstChild) {
                    el.appendChild(el2.firstChild);
                }
            }
            return gradientDefs;
        },
        parseAttributes: function(element, attributes, svgUid) {
            if (!element) {
                return;
            }
            var value, parentAttributes = {}, fontSize;
            if (typeof svgUid === "undefined") {
                svgUid = element.getAttribute("svgUid");
            }
            if (element.parentNode && reAllowedParents.test(element.parentNode.nodeName)) {
                parentAttributes = fabric.parseAttributes(element.parentNode, attributes, svgUid);
            }
            fontSize = parentAttributes && parentAttributes.fontSize || element.getAttribute("font-size") || fabric.Text.DEFAULT_SVG_FONT_SIZE;
            var ownAttributes = attributes.reduce(function(memo, attr) {
                value = element.getAttribute(attr);
                if (value) {
                    memo[attr] = value;
                }
                return memo;
            }, {});
            ownAttributes = extend(ownAttributes, extend(getGlobalStylesForElement(element, svgUid), fabric.parseStyleAttribute(element)));
            var normalizedAttr, normalizedValue, normalizedStyle = {};
            for (var attr in ownAttributes) {
                normalizedAttr = normalizeAttr(attr);
                normalizedValue = normalizeValue(normalizedAttr, ownAttributes[attr], parentAttributes, fontSize);
                normalizedStyle[normalizedAttr] = normalizedValue;
            }
            if (normalizedStyle && normalizedStyle.font) {
                fabric.parseFontDeclaration(normalizedStyle.font, normalizedStyle);
            }
            var mergedAttrs = extend(parentAttributes, normalizedStyle);
            return reAllowedParents.test(element.nodeName) ? mergedAttrs : _setStrokeFillOpacity(mergedAttrs);
        },
        parseElements: function(elements, callback, options, reviver, parsingOptions) {
            new fabric.ElementsParser(elements, callback, options, reviver, parsingOptions).parse();
        },
        parseStyleAttribute: function(element) {
            var oStyle = {}, style = element.getAttribute("style");
            if (!style) {
                return oStyle;
            }
            if (typeof style === "string") {
                parseStyleString(style, oStyle);
            } else {
                parseStyleObject(style, oStyle);
            }
            return oStyle;
        },
        parsePointsAttribute: function(points) {
            if (!points) {
                return null;
            }
            points = points.replace(/,/g, " ").trim();
            points = points.split(/\s+/);
            var parsedPoints = [], i, len;
            i = 0;
            len = points.length;
            for (;i < len; i += 2) {
                parsedPoints.push({
                    x: parseFloat(points[i]),
                    y: parseFloat(points[i + 1])
                });
            }
            return parsedPoints;
        },
        getCSSRules: function(doc) {
            var styles = doc.getElementsByTagName("style"), allRules = {}, rules;
            for (var i = 0, len = styles.length; i < len; i++) {
                var styleContents = styles[i].textContent || styles[i].text;
                styleContents = styleContents.replace(/\/\*[\s\S]*?\*\//g, "");
                if (styleContents.trim() === "") {
                    continue;
                }
                rules = styleContents.match(/[^{]*\{[\s\S]*?\}/g);
                rules = rules.map(function(rule) {
                    return rule.trim();
                });
                rules.forEach(function(rule) {
                    var match = rule.match(/([\s\S]*?)\s*\{([^}]*)\}/), ruleObj = {}, declaration = match[2].trim(), propertyValuePairs = declaration.replace(/;$/, "").split(/\s*;\s*/);
                    for (var i = 0, len = propertyValuePairs.length; i < len; i++) {
                        var pair = propertyValuePairs[i].split(/\s*:\s*/), property = pair[0], value = pair[1];
                        ruleObj[property] = value;
                    }
                    rule = match[1];
                    rule.split(",").forEach(function(_rule) {
                        _rule = _rule.replace(/^svg/i, "").trim();
                        if (_rule === "") {
                            return;
                        }
                        if (allRules[_rule]) {
                            fabric.util.object.extend(allRules[_rule], ruleObj);
                        } else {
                            allRules[_rule] = fabric.util.object.clone(ruleObj);
                        }
                    });
                });
            }
            return allRules;
        },
        loadSVGFromURL: function(url, callback, reviver, options) {
            url = url.replace(/^\n\s*/, "").trim();
            new fabric.util.request(url, {
                method: "get",
                onComplete: onComplete
            });
            function onComplete(r) {
                var xml = r.responseXML;
                if (xml && !xml.documentElement && fabric.window.ActiveXObject && r.responseText) {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(r.responseText.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, ""));
                }
                if (!xml || !xml.documentElement) {
                    callback && callback(null);
                }
                fabric.parseSVGDocument(xml.documentElement, function(results, _options) {
                    callback && callback(results, _options);
                }, reviver, options);
            }
        },
        loadSVGFromString: function(string, callback, reviver, options) {
            string = string.trim();
            var doc;
            if (typeof DOMParser !== "undefined") {
                var parser = new DOMParser();
                if (parser && parser.parseFromString) {
                    doc = parser.parseFromString(string, "text/xml");
                }
            } else if (fabric.window.ActiveXObject) {
                doc = new ActiveXObject("Microsoft.XMLDOM");
                doc.async = "false";
                doc.loadXML(string.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, ""));
            }
            fabric.parseSVGDocument(doc.documentElement, function(results, _options) {
                callback(results, _options);
            }, reviver, options);
        }
    });
})(typeof exports !== "undefined" ? exports : this);

fabric.ElementsParser = function(elements, callback, options, reviver, parsingOptions) {
    this.elements = elements;
    this.callback = callback;
    this.options = options;
    this.reviver = reviver;
    this.svgUid = options && options.svgUid || 0;
    this.parsingOptions = parsingOptions;
};

fabric.ElementsParser.prototype.parse = function() {
    this.instances = new Array(this.elements.length);
    this.numElements = this.elements.length;
    this.createObjects();
};

fabric.ElementsParser.prototype.createObjects = function() {
    for (var i = 0, len = this.elements.length; i < len; i++) {
        this.elements[i].setAttribute("svgUid", this.svgUid);
        (function(_obj, i) {
            setTimeout(function() {
                _obj.createObject(_obj.elements[i], i);
            }, 0);
        })(this, i);
    }
};

fabric.ElementsParser.prototype.createObject = function(el, index) {
    var klass = fabric[fabric.util.string.capitalize(el.tagName.replace("svg:", ""))];
    if (klass && klass.fromElement) {
        try {
            this._createObject(klass, el, index);
        } catch (err) {
            fabric.log(err);
        }
    } else {
        this.checkIfDone();
    }
};

fabric.ElementsParser.prototype._createObject = function(klass, el, index) {
    if (klass.async) {
        klass.fromElement(el, this.createCallback(index, el), this.options);
    } else {
        var obj = klass.fromElement(el, this.options);
        this.resolveGradient(obj, "fill");
        this.resolveGradient(obj, "stroke");
        this.reviver && this.reviver(el, obj);
        this.instances[index] = obj;
        this.checkIfDone();
    }
};

fabric.ElementsParser.prototype.createCallback = function(index, el) {
    var _this = this;
    return function(obj) {
        _this.resolveGradient(obj, "fill");
        _this.resolveGradient(obj, "stroke");
        _this.reviver && _this.reviver(el, obj);
        _this.instances[index] = obj;
        _this.checkIfDone();
    };
};

fabric.ElementsParser.prototype.resolveGradient = function(obj, property) {
    var instanceFillValue = obj.get(property);
    if (!/^url\(/.test(instanceFillValue)) {
        return;
    }
    var gradientId = instanceFillValue.slice(5, instanceFillValue.length - 1);
    if (fabric.gradientDefs[this.svgUid][gradientId]) {
        obj.set(property, fabric.Gradient.fromElement(fabric.gradientDefs[this.svgUid][gradientId], obj));
    }
};

fabric.ElementsParser.prototype.checkIfDone = function() {
    if (--this.numElements === 0) {
        this.instances = this.instances.filter(function(el) {
            return el != null;
        });
        this.callback(this.instances);
    }
};

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {});
    if (fabric.Point) {
        fabric.warn("fabric.Point is already defined");
        return;
    }
    fabric.Point = Point;
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype = {
        type: "point",
        constructor: Point,
        add: function(that) {
            return new Point(this.x + that.x, this.y + that.y);
        },
        addEquals: function(that) {
            this.x += that.x;
            this.y += that.y;
            return this;
        },
        scalarAdd: function(scalar) {
            return new Point(this.x + scalar, this.y + scalar);
        },
        scalarAddEquals: function(scalar) {
            this.x += scalar;
            this.y += scalar;
            return this;
        },
        subtract: function(that) {
            return new Point(this.x - that.x, this.y - that.y);
        },
        subtractEquals: function(that) {
            this.x -= that.x;
            this.y -= that.y;
            return this;
        },
        scalarSubtract: function(scalar) {
            return new Point(this.x - scalar, this.y - scalar);
        },
        scalarSubtractEquals: function(scalar) {
            this.x -= scalar;
            this.y -= scalar;
            return this;
        },
        multiply: function(scalar) {
            return new Point(this.x * scalar, this.y * scalar);
        },
        multiplyEquals: function(scalar) {
            this.x *= scalar;
            this.y *= scalar;
            return this;
        },
        divide: function(scalar) {
            return new Point(this.x / scalar, this.y / scalar);
        },
        divideEquals: function(scalar) {
            this.x /= scalar;
            this.y /= scalar;
            return this;
        },
        eq: function(that) {
            return this.x === that.x && this.y === that.y;
        },
        lt: function(that) {
            return this.x < that.x && this.y < that.y;
        },
        lte: function(that) {
            return this.x <= that.x && this.y <= that.y;
        },
        gt: function(that) {
            return this.x > that.x && this.y > that.y;
        },
        gte: function(that) {
            return this.x >= that.x && this.y >= that.y;
        },
        lerp: function(that, t) {
            if (typeof t === "undefined") {
                t = .5;
            }
            t = Math.max(Math.min(1, t), 0);
            return new Point(this.x + (that.x - this.x) * t, this.y + (that.y - this.y) * t);
        },
        distanceFrom: function(that) {
            var dx = this.x - that.x, dy = this.y - that.y;
            return Math.sqrt(dx * dx + dy * dy);
        },
        midPointFrom: function(that) {
            return this.lerp(that);
        },
        min: function(that) {
            return new Point(Math.min(this.x, that.x), Math.min(this.y, that.y));
        },
        max: function(that) {
            return new Point(Math.max(this.x, that.x), Math.max(this.y, that.y));
        },
        toString: function() {
            return this.x + "," + this.y;
        },
        setXY: function(x, y) {
            this.x = x;
            this.y = y;
            return this;
        },
        setX: function(x) {
            this.x = x;
            return this;
        },
        setY: function(y) {
            this.y = y;
            return this;
        },
        setFromPoint: function(that) {
            this.x = that.x;
            this.y = that.y;
            return this;
        },
        swap: function(that) {
            var x = this.x, y = this.y;
            this.x = that.x;
            this.y = that.y;
            that.x = x;
            that.y = y;
        },
        clone: function() {
            return new Point(this.x, this.y);
        }
    };
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {});
    if (fabric.Intersection) {
        fabric.warn("fabric.Intersection is already defined");
        return;
    }
    function Intersection(status) {
        this.status = status;
        this.points = [];
    }
    fabric.Intersection = Intersection;
    fabric.Intersection.prototype = {
        constructor: Intersection,
        appendPoint: function(point) {
            this.points.push(point);
            return this;
        },
        appendPoints: function(points) {
            this.points = this.points.concat(points);
            return this;
        }
    };
    fabric.Intersection.intersectLineLine = function(a1, a2, b1, b2) {
        var result, uaT = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x), ubT = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x), uB = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
        if (uB !== 0) {
            var ua = uaT / uB, ub = ubT / uB;
            if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
                result = new Intersection("Intersection");
                result.appendPoint(new fabric.Point(a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y)));
            } else {
                result = new Intersection();
            }
        } else {
            if (uaT === 0 || ubT === 0) {
                result = new Intersection("Coincident");
            } else {
                result = new Intersection("Parallel");
            }
        }
        return result;
    };
    fabric.Intersection.intersectLinePolygon = function(a1, a2, points) {
        var result = new Intersection(), length = points.length, b1, b2, inter;
        for (var i = 0; i < length; i++) {
            b1 = points[i];
            b2 = points[(i + 1) % length];
            inter = Intersection.intersectLineLine(a1, a2, b1, b2);
            result.appendPoints(inter.points);
        }
        if (result.points.length > 0) {
            result.status = "Intersection";
        }
        return result;
    };
    fabric.Intersection.intersectPolygonPolygon = function(points1, points2) {
        var result = new Intersection(), length = points1.length;
        for (var i = 0; i < length; i++) {
            var a1 = points1[i], a2 = points1[(i + 1) % length], inter = Intersection.intersectLinePolygon(a1, a2, points2);
            result.appendPoints(inter.points);
        }
        if (result.points.length > 0) {
            result.status = "Intersection";
        }
        return result;
    };
    fabric.Intersection.intersectPolygonRectangle = function(points, r1, r2) {
        var min = r1.min(r2), max = r1.max(r2), topRight = new fabric.Point(max.x, min.y), bottomLeft = new fabric.Point(min.x, max.y), inter1 = Intersection.intersectLinePolygon(min, topRight, points), inter2 = Intersection.intersectLinePolygon(topRight, max, points), inter3 = Intersection.intersectLinePolygon(max, bottomLeft, points), inter4 = Intersection.intersectLinePolygon(bottomLeft, min, points), result = new Intersection();
        result.appendPoints(inter1.points);
        result.appendPoints(inter2.points);
        result.appendPoints(inter3.points);
        result.appendPoints(inter4.points);
        if (result.points.length > 0) {
            result.status = "Intersection";
        }
        return result;
    };
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {});
    if (fabric.Color) {
        fabric.warn("fabric.Color is already defined.");
        return;
    }
    function Color(color) {
        if (!color) {
            this.setSource([ 0, 0, 0, 1 ]);
        } else {
            this._tryParsingColor(color);
        }
    }
    fabric.Color = Color;
    fabric.Color.prototype = {
        _tryParsingColor: function(color) {
            var source;
            if (color in Color.colorNameMap) {
                color = Color.colorNameMap[color];
            }
            if (color === "transparent") {
                source = [ 255, 255, 255, 0 ];
            }
            if (!source) {
                source = Color.sourceFromHex(color);
            }
            if (!source) {
                source = Color.sourceFromRgb(color);
            }
            if (!source) {
                source = Color.sourceFromHsl(color);
            }
            if (!source) {
                source = [ 0, 0, 0, 1 ];
            }
            if (source) {
                this.setSource(source);
            }
        },
        _rgbToHsl: function(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            var h, s, l, max = fabric.util.array.max([ r, g, b ]), min = fabric.util.array.min([ r, g, b ]);
            l = (max + min) / 2;
            if (max === min) {
                h = s = 0;
            } else {
                var d = max - min;
                s = l > .5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                  case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;

                  case g:
                    h = (b - r) / d + 2;
                    break;

                  case b:
                    h = (r - g) / d + 4;
                    break;
                }
                h /= 6;
            }
            return [ Math.round(h * 360), Math.round(s * 100), Math.round(l * 100) ];
        },
        getSource: function() {
            return this._source;
        },
        setSource: function(source) {
            this._source = source;
        },
        toRgb: function() {
            var source = this.getSource();
            return "rgb(" + source[0] + "," + source[1] + "," + source[2] + ")";
        },
        toRgba: function() {
            var source = this.getSource();
            return "rgba(" + source[0] + "," + source[1] + "," + source[2] + "," + source[3] + ")";
        },
        toHsl: function() {
            var source = this.getSource(), hsl = this._rgbToHsl(source[0], source[1], source[2]);
            return "hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%)";
        },
        toHsla: function() {
            var source = this.getSource(), hsl = this._rgbToHsl(source[0], source[1], source[2]);
            return "hsla(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%," + source[3] + ")";
        },
        toHex: function() {
            var source = this.getSource(), r, g, b;
            r = source[0].toString(16);
            r = r.length === 1 ? "0" + r : r;
            g = source[1].toString(16);
            g = g.length === 1 ? "0" + g : g;
            b = source[2].toString(16);
            b = b.length === 1 ? "0" + b : b;
            return r.toUpperCase() + g.toUpperCase() + b.toUpperCase();
        },
        toHexa: function() {
            var source = this.getSource(), a;
            a = source[3] * 255;
            a = a.toString(16);
            a = a.length === 1 ? "0" + a : a;
            return this.toHex() + a.toUpperCase();
        },
        getAlpha: function() {
            return this.getSource()[3];
        },
        setAlpha: function(alpha) {
            var source = this.getSource();
            source[3] = alpha;
            this.setSource(source);
            return this;
        },
        toGrayscale: function() {
            var source = this.getSource(), average = parseInt((source[0] * .3 + source[1] * .59 + source[2] * .11).toFixed(0), 10), currentAlpha = source[3];
            this.setSource([ average, average, average, currentAlpha ]);
            return this;
        },
        toBlackWhite: function(threshold) {
            var source = this.getSource(), average = (source[0] * .3 + source[1] * .59 + source[2] * .11).toFixed(0), currentAlpha = source[3];
            threshold = threshold || 127;
            average = Number(average) < Number(threshold) ? 0 : 255;
            this.setSource([ average, average, average, currentAlpha ]);
            return this;
        },
        overlayWith: function(otherColor) {
            if (!(otherColor instanceof Color)) {
                otherColor = new Color(otherColor);
            }
            var result = [], alpha = this.getAlpha(), otherAlpha = .5, source = this.getSource(), otherSource = otherColor.getSource();
            for (var i = 0; i < 3; i++) {
                result.push(Math.round(source[i] * (1 - otherAlpha) + otherSource[i] * otherAlpha));
            }
            result[3] = alpha;
            this.setSource(result);
            return this;
        }
    };
    fabric.Color.reRGBa = /^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*((?:\d*\.?\d+)?)\s*)?\)$/;
    fabric.Color.reHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/;
    fabric.Color.reHex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;
    fabric.Color.colorNameMap = {
        aqua: "#00FFFF",
        black: "#000000",
        blue: "#0000FF",
        fuchsia: "#FF00FF",
        gray: "#808080",
        grey: "#808080",
        green: "#008000",
        lime: "#00FF00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        orange: "#FFA500",
        purple: "#800080",
        red: "#FF0000",
        silver: "#C0C0C0",
        teal: "#008080",
        white: "#FFFFFF",
        yellow: "#FFFF00"
    };
    function hue2rgb(p, q, t) {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
    }
    fabric.Color.fromRgb = function(color) {
        return Color.fromSource(Color.sourceFromRgb(color));
    };
    fabric.Color.sourceFromRgb = function(color) {
        var match = color.match(Color.reRGBa);
        if (match) {
            var r = parseInt(match[1], 10) / (/%$/.test(match[1]) ? 100 : 1) * (/%$/.test(match[1]) ? 255 : 1), g = parseInt(match[2], 10) / (/%$/.test(match[2]) ? 100 : 1) * (/%$/.test(match[2]) ? 255 : 1), b = parseInt(match[3], 10) / (/%$/.test(match[3]) ? 100 : 1) * (/%$/.test(match[3]) ? 255 : 1);
            return [ parseInt(r, 10), parseInt(g, 10), parseInt(b, 10), match[4] ? parseFloat(match[4]) : 1 ];
        }
    };
    fabric.Color.fromRgba = Color.fromRgb;
    fabric.Color.fromHsl = function(color) {
        return Color.fromSource(Color.sourceFromHsl(color));
    };
    fabric.Color.sourceFromHsl = function(color) {
        var match = color.match(Color.reHSLa);
        if (!match) {
            return;
        }
        var h = (parseFloat(match[1]) % 360 + 360) % 360 / 360, s = parseFloat(match[2]) / (/%$/.test(match[2]) ? 100 : 1), l = parseFloat(match[3]) / (/%$/.test(match[3]) ? 100 : 1), r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            var q = l <= .5 ? l * (s + 1) : l + s - l * s, p = l * 2 - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), match[4] ? parseFloat(match[4]) : 1 ];
    };
    fabric.Color.fromHsla = Color.fromHsl;
    fabric.Color.fromHex = function(color) {
        return Color.fromSource(Color.sourceFromHex(color));
    };
    fabric.Color.sourceFromHex = function(color) {
        if (color.match(Color.reHex)) {
            var value = color.slice(color.indexOf("#") + 1), isShortNotation = value.length === 3 || value.length === 4, isRGBa = value.length === 8 || value.length === 4, r = isShortNotation ? value.charAt(0) + value.charAt(0) : value.substring(0, 2), g = isShortNotation ? value.charAt(1) + value.charAt(1) : value.substring(2, 4), b = isShortNotation ? value.charAt(2) + value.charAt(2) : value.substring(4, 6), a = isRGBa ? isShortNotation ? value.charAt(3) + value.charAt(3) : value.substring(6, 8) : "FF";
            return [ parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseFloat((parseInt(a, 16) / 255).toFixed(2)) ];
        }
    };
    fabric.Color.fromSource = function(source) {
        var oColor = new Color();
        oColor.setSource(source);
        return oColor;
    };
})(typeof exports !== "undefined" ? exports : this);

(function() {
    "use strict";
    if (fabric.StaticCanvas) {
        fabric.warn("fabric.StaticCanvas is already defined.");
        return;
    }
    var extend = fabric.util.object.extend, getElementOffset = fabric.util.getElementOffset, removeFromArray = fabric.util.removeFromArray, toFixed = fabric.util.toFixed, transformPoint = fabric.util.transformPoint, invertTransform = fabric.util.invertTransform, CANVAS_INIT_ERROR = new Error("Could not initialize `canvas` element");
    fabric.StaticCanvas = fabric.util.createClass(fabric.CommonMethods, {
        initialize: function(el, options) {
            options || (options = {});
            this._initStatic(el, options);
        },
        backgroundColor: "",
        backgroundImage: null,
        overlayColor: "",
        overlayImage: null,
        includeDefaultValues: true,
        stateful: false,
        renderOnAddRemove: true,
        clipTo: null,
        controlsAboveOverlay: false,
        allowTouchScrolling: false,
        imageSmoothingEnabled: true,
        viewportTransform: fabric.iMatrix.concat(),
        backgroundVpt: true,
        overlayVpt: true,
        onBeforeScaleRotate: function() {},
        enableRetinaScaling: true,
        vptCoords: {},
        skipOffscreen: false,
        _initStatic: function(el, options) {
            var cb = fabric.StaticCanvas.prototype.renderAll.bind(this);
            this._objects = [];
            this._createLowerCanvas(el);
            this._initOptions(options);
            this._setImageSmoothing();
            if (!this.interactive) {
                this._initRetinaScaling();
            }
            if (options.overlayImage) {
                this.setOverlayImage(options.overlayImage, cb);
            }
            if (options.backgroundImage) {
                this.setBackgroundImage(options.backgroundImage, cb);
            }
            if (options.backgroundColor) {
                this.setBackgroundColor(options.backgroundColor, cb);
            }
            if (options.overlayColor) {
                this.setOverlayColor(options.overlayColor, cb);
            }
            this.calcOffset();
        },
        _isRetinaScaling: function() {
            return fabric.devicePixelRatio !== 1 && this.enableRetinaScaling;
        },
        getRetinaScaling: function() {
            return this._isRetinaScaling() ? fabric.devicePixelRatio : 1;
        },
        _initRetinaScaling: function() {
            if (!this._isRetinaScaling()) {
                return;
            }
            this.lowerCanvasEl.setAttribute("width", this.width * fabric.devicePixelRatio);
            this.lowerCanvasEl.setAttribute("height", this.height * fabric.devicePixelRatio);
            this.contextContainer.scale(fabric.devicePixelRatio, fabric.devicePixelRatio);
        },
        calcOffset: function() {
            this._offset = getElementOffset(this.lowerCanvasEl);
            return this;
        },
        setOverlayImage: function(image, callback, options) {
            return this.__setBgOverlayImage("overlayImage", image, callback, options);
        },
        setBackgroundImage: function(image, callback, options) {
            return this.__setBgOverlayImage("backgroundImage", image, callback, options);
        },
        setOverlayColor: function(overlayColor, callback) {
            return this.__setBgOverlayColor("overlayColor", overlayColor, callback);
        },
        setBackgroundColor: function(backgroundColor, callback) {
            return this.__setBgOverlayColor("backgroundColor", backgroundColor, callback);
        },
        _setImageSmoothing: function() {
            var ctx = this.getContext();
            ctx.imageSmoothingEnabled = ctx.imageSmoothingEnabled || ctx.webkitImageSmoothingEnabled || ctx.mozImageSmoothingEnabled || ctx.msImageSmoothingEnabled || ctx.oImageSmoothingEnabled;
            ctx.imageSmoothingEnabled = this.imageSmoothingEnabled;
        },
        __setBgOverlayImage: function(property, image, callback, options) {
            if (typeof image === "string") {
                fabric.util.loadImage(image, function(img) {
                    img && (this[property] = new fabric.Image(img, options));
                    callback && callback(img);
                }, this, options && options.crossOrigin);
            } else {
                options && image.setOptions(options);
                this[property] = image;
                callback && callback(image);
            }
            return this;
        },
        __setBgOverlayColor: function(property, color, callback) {
            this[property] = color;
            this._initGradient(color, property);
            this._initPattern(color, property, callback);
            return this;
        },
        _createCanvasElement: function(canvasEl) {
            var element = fabric.util.createCanvasElement(canvasEl);
            if (!element.style) {
                element.style = {};
            }
            if (!element) {
                throw CANVAS_INIT_ERROR;
            }
            if (typeof element.getContext === "undefined") {
                throw CANVAS_INIT_ERROR;
            }
            return element;
        },
        _initOptions: function(options) {
            this._setOptions(options);
            this.width = this.width || parseInt(this.lowerCanvasEl.width, 10) || 0;
            this.height = this.height || parseInt(this.lowerCanvasEl.height, 10) || 0;
            if (!this.lowerCanvasEl.style) {
                return;
            }
            this.lowerCanvasEl.width = this.width;
            this.lowerCanvasEl.height = this.height;
            this.lowerCanvasEl.style.width = this.width + "px";
            this.lowerCanvasEl.style.height = this.height + "px";
            this.viewportTransform = this.viewportTransform.slice();
        },
        _createLowerCanvas: function(canvasEl) {
            this.lowerCanvasEl = fabric.util.getById(canvasEl) || this._createCanvasElement(canvasEl);
            fabric.util.addClass(this.lowerCanvasEl, "lower-canvas");
            if (this.interactive) {
                this._applyCanvasStyle(this.lowerCanvasEl);
            }
            this.contextContainer = this.lowerCanvasEl.getContext("2d");
        },
        getWidth: function() {
            return this.width;
        },
        getHeight: function() {
            return this.height;
        },
        setWidth: function(value, options) {
            return this.setDimensions({
                width: value
            }, options);
        },
        setHeight: function(value, options) {
            return this.setDimensions({
                height: value
            }, options);
        },
        setDimensions: function(dimensions, options) {
            var cssValue;
            options = options || {};
            for (var prop in dimensions) {
                cssValue = dimensions[prop];
                if (!options.cssOnly) {
                    this._setBackstoreDimension(prop, dimensions[prop]);
                    cssValue += "px";
                }
                if (!options.backstoreOnly) {
                    this._setCssDimension(prop, cssValue);
                }
            }
            this._initRetinaScaling();
            this._setImageSmoothing();
            this.calcOffset();
            if (!options.cssOnly) {
                this.renderAll();
            }
            return this;
        },
        _setBackstoreDimension: function(prop, value) {
            this.lowerCanvasEl[prop] = value;
            if (this.upperCanvasEl) {
                this.upperCanvasEl[prop] = value;
            }
            if (this.cacheCanvasEl) {
                this.cacheCanvasEl[prop] = value;
            }
            this[prop] = value;
            return this;
        },
        _setCssDimension: function(prop, value) {
            this.lowerCanvasEl.style[prop] = value;
            if (this.upperCanvasEl) {
                this.upperCanvasEl.style[prop] = value;
            }
            if (this.wrapperEl) {
                this.wrapperEl.style[prop] = value;
            }
            return this;
        },
        getZoom: function() {
            return this.viewportTransform[0];
        },
        setViewportTransform: function(vpt) {
            var activeGroup = this._activeGroup, object, ignoreVpt = false, skipAbsolute = true;
            this.viewportTransform = vpt;
            for (var i = 0, len = this._objects.length; i < len; i++) {
                object = this._objects[i];
                object.group || object.setCoords(ignoreVpt, skipAbsolute);
            }
            if (activeGroup) {
                activeGroup.setCoords(ignoreVpt, skipAbsolute);
            }
            this.calcViewportBoundaries();
            this.renderAll();
            return this;
        },
        zoomToPoint: function(point, value) {
            var before = point, vpt = this.viewportTransform.slice(0);
            point = transformPoint(point, invertTransform(this.viewportTransform));
            vpt[0] = value;
            vpt[3] = value;
            var after = transformPoint(point, vpt);
            vpt[4] += before.x - after.x;
            vpt[5] += before.y - after.y;
            return this.setViewportTransform(vpt);
        },
        setZoom: function(value) {
            this.zoomToPoint(new fabric.Point(0, 0), value);
            return this;
        },
        absolutePan: function(point) {
            var vpt = this.viewportTransform.slice(0);
            vpt[4] = -point.x;
            vpt[5] = -point.y;
            return this.setViewportTransform(vpt);
        },
        relativePan: function(point) {
            return this.absolutePan(new fabric.Point(-point.x - this.viewportTransform[4], -point.y - this.viewportTransform[5]));
        },
        getElement: function() {
            return this.lowerCanvasEl;
        },
        _onObjectAdded: function(obj) {
            this.stateful && obj.setupState();
            obj._set("canvas", this);
            obj.setCoords();
            this.fire("object:added", {
                target: obj
            });
            obj.fire("added");
        },
        _onObjectRemoved: function(obj) {
            this.fire("object:removed", {
                target: obj
            });
            obj.fire("removed");
            delete obj.canvas;
        },
        clearContext: function(ctx) {
            ctx.clearRect(0, 0, this.width, this.height);
            return this;
        },
        getContext: function() {
            return this.contextContainer;
        },
        clear: function() {
            this._objects.length = 0;
            this.backgroundImage = null;
            this.overlayImage = null;
            this.backgroundColor = "";
            this.overlayColor = "";
            if (this._hasITextHandlers) {
                this.off("mouse:up", this._mouseUpITextHandler);
                this._iTextInstances = null;
                this._hasITextHandlers = false;
            }
            this.clearContext(this.contextContainer);
            this.fire("canvas:cleared");
            this.renderAll();
            return this;
        },
        renderAll: function() {
            var canvasToDrawOn = this.contextContainer;
            this.renderCanvas(canvasToDrawOn, this._objects);
            return this;
        },
        calcViewportBoundaries: function() {
            var points = {}, width = this.getWidth(), height = this.getHeight(), iVpt = invertTransform(this.viewportTransform);
            points.tl = transformPoint({
                x: 0,
                y: 0
            }, iVpt);
            points.br = transformPoint({
                x: width,
                y: height
            }, iVpt);
            points.tr = new fabric.Point(points.br.x, points.tl.y);
            points.bl = new fabric.Point(points.tl.x, points.br.y);
            this.vptCoords = points;
            return points;
        },
        renderCanvas: function(ctx, objects) {
            this.calcViewportBoundaries();
            this.clearContext(ctx);
            this.fire("before:render");
            if (this.clipTo) {
                fabric.util.clipContext(this, ctx);
            }
            this._renderBackground(ctx);
            ctx.save();
            ctx.transform.apply(ctx, this.viewportTransform);
            this._renderObjects(ctx, objects);
            ctx.restore();
            if (!this.controlsAboveOverlay && this.interactive) {
                this.drawControls(ctx);
            }
            if (this.clipTo) {
                ctx.restore();
            }
            this._renderOverlay(ctx);
            if (this.controlsAboveOverlay && this.interactive) {
                this.drawControls(ctx);
            }
            this.fire("after:render");
        },
        _renderObjects: function(ctx, objects) {
            for (var i = 0, length = objects.length; i < length; ++i) {
                objects[i] && objects[i].render(ctx);
            }
        },
        _renderBackgroundOrOverlay: function(ctx, property) {
            var object = this[property + "Color"];
            if (object) {
                ctx.fillStyle = object.toLive ? object.toLive(ctx, this) : object;
                ctx.fillRect(object.offsetX || 0, object.offsetY || 0, this.width, this.height);
            }
            object = this[property + "Image"];
            if (object) {
                if (this[property + "Vpt"]) {
                    ctx.save();
                    ctx.transform.apply(ctx, this.viewportTransform);
                }
                object.render(ctx);
                this[property + "Vpt"] && ctx.restore();
            }
        },
        _renderBackground: function(ctx) {
            this._renderBackgroundOrOverlay(ctx, "background");
        },
        _renderOverlay: function(ctx) {
            this._renderBackgroundOrOverlay(ctx, "overlay");
        },
        getCenter: function() {
            return {
                top: this.getHeight() / 2,
                left: this.getWidth() / 2
            };
        },
        centerObjectH: function(object) {
            return this._centerObject(object, new fabric.Point(this.getCenter().left, object.getCenterPoint().y));
        },
        centerObjectV: function(object) {
            return this._centerObject(object, new fabric.Point(object.getCenterPoint().x, this.getCenter().top));
        },
        centerObject: function(object) {
            var center = this.getCenter();
            return this._centerObject(object, new fabric.Point(center.left, center.top));
        },
        viewportCenterObject: function(object) {
            var vpCenter = this.getVpCenter();
            return this._centerObject(object, vpCenter);
        },
        viewportCenterObjectH: function(object) {
            var vpCenter = this.getVpCenter();
            this._centerObject(object, new fabric.Point(vpCenter.x, object.getCenterPoint().y));
            return this;
        },
        viewportCenterObjectV: function(object) {
            var vpCenter = this.getVpCenter();
            return this._centerObject(object, new fabric.Point(object.getCenterPoint().x, vpCenter.y));
        },
        getVpCenter: function() {
            var center = this.getCenter(), iVpt = invertTransform(this.viewportTransform);
            return transformPoint({
                x: center.left,
                y: center.top
            }, iVpt);
        },
        _centerObject: function(object, center) {
            object.setPositionByOrigin(center, "center", "center");
            this.renderAll();
            return this;
        },
        toDatalessJSON: function(propertiesToInclude) {
            return this.toDatalessObject(propertiesToInclude);
        },
        toObject: function(propertiesToInclude) {
            return this._toObjectMethod("toObject", propertiesToInclude);
        },
        toDatalessObject: function(propertiesToInclude) {
            return this._toObjectMethod("toDatalessObject", propertiesToInclude);
        },
        _toObjectMethod: function(methodName, propertiesToInclude) {
            var data = {
                objects: this._toObjects(methodName, propertiesToInclude)
            };
            extend(data, this.__serializeBgOverlay(methodName, propertiesToInclude));
            fabric.util.populateWithProperties(this, data, propertiesToInclude);
            return data;
        },
        _toObjects: function(methodName, propertiesToInclude) {
            return this.getObjects().filter(function(object) {
                return !object.excludeFromExport;
            }).map(function(instance) {
                return this._toObject(instance, methodName, propertiesToInclude);
            }, this);
        },
        _toObject: function(instance, methodName, propertiesToInclude) {
            var originalValue;
            if (!this.includeDefaultValues) {
                originalValue = instance.includeDefaultValues;
                instance.includeDefaultValues = false;
            }
            var object = instance[methodName](propertiesToInclude);
            if (!this.includeDefaultValues) {
                instance.includeDefaultValues = originalValue;
            }
            return object;
        },
        __serializeBgOverlay: function(methodName, propertiesToInclude) {
            var data = {}, bgImage = this.backgroundImage, overlay = this.overlayImage;
            if (this.backgroundColor) {
                data.background = this.backgroundColor.toObject ? this.backgroundColor.toObject(propertiesToInclude) : this.backgroundColor;
            }
            if (this.overlayColor) {
                data.overlay = this.overlayColor.toObject ? this.overlayColor.toObject(propertiesToInclude) : this.overlayColor;
            }
            if (bgImage && !bgImage.excludeFromExport) {
                data.backgroundImage = this._toObject(bgImage, methodName, propertiesToInclude);
            }
            if (overlay && !overlay.excludeFromExport) {
                data.overlayImage = this._toObject(overlay, methodName, propertiesToInclude);
            }
            return data;
        },
        svgViewportTransformation: true,
        toSVG: function(options, reviver) {
            options || (options = {});
            var markup = [];
            this._setSVGPreamble(markup, options);
            this._setSVGHeader(markup, options);
            this._setSVGBgOverlayColor(markup, "backgroundColor");
            this._setSVGBgOverlayImage(markup, "backgroundImage", reviver);
            this._setSVGObjects(markup, reviver);
            this._setSVGBgOverlayColor(markup, "overlayColor");
            this._setSVGBgOverlayImage(markup, "overlayImage", reviver);
            markup.push("</svg>");
            return markup.join("");
        },
        _setSVGPreamble: function(markup, options) {
            if (options.suppressPreamble) {
                return;
            }
            markup.push('<?xml version="1.0" encoding="', options.encoding || "UTF-8", '" standalone="no" ?>\n', '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ', '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n');
        },
        _setSVGHeader: function(markup, options) {
            var width = options.width || this.width, height = options.height || this.height, vpt, viewBox = 'viewBox="0 0 ' + this.width + " " + this.height + '" ', NUM_FRACTION_DIGITS = fabric.Object.NUM_FRACTION_DIGITS;
            if (options.viewBox) {
                viewBox = 'viewBox="' + options.viewBox.x + " " + options.viewBox.y + " " + options.viewBox.width + " " + options.viewBox.height + '" ';
            } else {
                if (this.svgViewportTransformation) {
                    vpt = this.viewportTransform;
                    viewBox = 'viewBox="' + toFixed(-vpt[4] / vpt[0], NUM_FRACTION_DIGITS) + " " + toFixed(-vpt[5] / vpt[3], NUM_FRACTION_DIGITS) + " " + toFixed(this.width / vpt[0], NUM_FRACTION_DIGITS) + " " + toFixed(this.height / vpt[3], NUM_FRACTION_DIGITS) + '" ';
                }
            }
            markup.push("<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', width, '" ', 'height="', height, '" ', viewBox, 'xml:space="preserve">\n', "<desc>Created with Fabric.js ", fabric.version, "</desc>\n", "<defs>\n", this.createSVGFontFacesMarkup(), this.createSVGRefElementsMarkup(), "</defs>\n");
        },
        createSVGRefElementsMarkup: function() {
            var _this = this, markup = [ "backgroundColor", "overlayColor" ].map(function(prop) {
                var fill = _this[prop];
                if (fill && fill.toLive) {
                    return fill.toSVG(_this, false);
                }
            });
            return markup.join("");
        },
        createSVGFontFacesMarkup: function() {
            var markup = "", fontList = {}, obj, fontFamily, style, row, rowIndex, _char, charIndex, fontPaths = fabric.fontPaths, objects = this.getObjects();
            for (var i = 0, len = objects.length; i < len; i++) {
                obj = objects[i];
                fontFamily = obj.fontFamily;
                if (obj.type.indexOf("text") === -1 || fontList[fontFamily] || !fontPaths[fontFamily]) {
                    continue;
                }
                fontList[fontFamily] = true;
                if (!obj.styles) {
                    continue;
                }
                style = obj.styles;
                for (rowIndex in style) {
                    row = style[rowIndex];
                    for (charIndex in row) {
                        _char = row[charIndex];
                        fontFamily = _char.fontFamily;
                        if (!fontList[fontFamily] && fontPaths[fontFamily]) {
                            fontList[fontFamily] = true;
                        }
                    }
                }
            }
            for (var j in fontList) {
                markup += [ "\t\t@font-face {\n", "\t\t\tfont-family: '", j, "';\n", "\t\t\tsrc: url('", fontPaths[j], "');\n", "\t\t}\n" ].join("");
            }
            if (markup) {
                markup = [ '\t<style type="text/css">', "<![CDATA[\n", markup, "]]>", "</style>\n" ].join("");
            }
            return markup;
        },
        _setSVGObjects: function(markup, reviver) {
            var instance;
            for (var i = 0, objects = this.getObjects(), len = objects.length; i < len; i++) {
                instance = objects[i];
                if (instance.excludeFromExport) {
                    continue;
                }
                this._setSVGObject(markup, instance, reviver);
            }
        },
        _setSVGObject: function(markup, instance, reviver) {
            markup.push(instance.toSVG(reviver));
        },
        _setSVGBgOverlayImage: function(markup, property, reviver) {
            if (this[property] && this[property].toSVG) {
                markup.push(this[property].toSVG(reviver));
            }
        },
        _setSVGBgOverlayColor: function(markup, property) {
            var filler = this[property];
            if (!filler) {
                return;
            }
            if (filler.toLive) {
                var repeat = filler.repeat;
                markup.push('<rect transform="translate(', this.width / 2, ",", this.height / 2, ')"', ' x="', filler.offsetX - this.width / 2, '" y="', filler.offsetY - this.height / 2, '" ', 'width="', repeat === "repeat-y" || repeat === "no-repeat" ? filler.source.width : this.width, '" height="', repeat === "repeat-x" || repeat === "no-repeat" ? filler.source.height : this.height, '" fill="url(#SVGID_' + filler.id + ')"', "></rect>\n");
            } else {
                markup.push('<rect x="0" y="0" ', 'width="', this.width, '" height="', this.height, '" fill="', this[property], '"', "></rect>\n");
            }
        },
        sendToBack: function(object) {
            if (!object) {
                return this;
            }
            var activeGroup = this._activeGroup, i, obj, objs;
            if (object === activeGroup) {
                objs = activeGroup._objects;
                for (i = objs.length; i--; ) {
                    obj = objs[i];
                    removeFromArray(this._objects, obj);
                    this._objects.unshift(obj);
                }
            } else {
                removeFromArray(this._objects, object);
                this._objects.unshift(object);
            }
            return this.renderAll && this.renderAll();
        },
        bringToFront: function(object) {
            if (!object) {
                return this;
            }
            var activeGroup = this._activeGroup, i, obj, objs;
            if (object === activeGroup) {
                objs = activeGroup._objects;
                for (i = 0; i < objs.length; i++) {
                    obj = objs[i];
                    removeFromArray(this._objects, obj);
                    this._objects.push(obj);
                }
            } else {
                removeFromArray(this._objects, object);
                this._objects.push(object);
            }
            return this.renderAll && this.renderAll();
        },
        sendBackwards: function(object, intersecting) {
            if (!object) {
                return this;
            }
            var activeGroup = this._activeGroup, i, obj, idx, newIdx, objs, objsMoved = 0;
            if (object === activeGroup) {
                objs = activeGroup._objects;
                for (i = 0; i < objs.length; i++) {
                    obj = objs[i];
                    idx = this._objects.indexOf(obj);
                    if (idx > 0 + objsMoved) {
                        newIdx = idx - 1;
                        removeFromArray(this._objects, obj);
                        this._objects.splice(newIdx, 0, obj);
                    }
                    objsMoved++;
                }
            } else {
                idx = this._objects.indexOf(object);
                if (idx !== 0) {
                    newIdx = this._findNewLowerIndex(object, idx, intersecting);
                    removeFromArray(this._objects, object);
                    this._objects.splice(newIdx, 0, object);
                }
            }
            this.renderAll && this.renderAll();
            return this;
        },
        _findNewLowerIndex: function(object, idx, intersecting) {
            var newIdx;
            if (intersecting) {
                newIdx = idx;
                for (var i = idx - 1; i >= 0; --i) {
                    var isIntersecting = object.intersectsWithObject(this._objects[i]) || object.isContainedWithinObject(this._objects[i]) || this._objects[i].isContainedWithinObject(object);
                    if (isIntersecting) {
                        newIdx = i;
                        break;
                    }
                }
            } else {
                newIdx = idx - 1;
            }
            return newIdx;
        },
        bringForward: function(object, intersecting) {
            if (!object) {
                return this;
            }
            var activeGroup = this._activeGroup, i, obj, idx, newIdx, objs, objsMoved = 0;
            if (object === activeGroup) {
                objs = activeGroup._objects;
                for (i = objs.length; i--; ) {
                    obj = objs[i];
                    idx = this._objects.indexOf(obj);
                    if (idx < this._objects.length - 1 - objsMoved) {
                        newIdx = idx + 1;
                        removeFromArray(this._objects, obj);
                        this._objects.splice(newIdx, 0, obj);
                    }
                    objsMoved++;
                }
            } else {
                idx = this._objects.indexOf(object);
                if (idx !== this._objects.length - 1) {
                    newIdx = this._findNewUpperIndex(object, idx, intersecting);
                    removeFromArray(this._objects, object);
                    this._objects.splice(newIdx, 0, object);
                }
            }
            this.renderAll && this.renderAll();
            return this;
        },
        _findNewUpperIndex: function(object, idx, intersecting) {
            var newIdx;
            if (intersecting) {
                newIdx = idx;
                for (var i = idx + 1; i < this._objects.length; ++i) {
                    var isIntersecting = object.intersectsWithObject(this._objects[i]) || object.isContainedWithinObject(this._objects[i]) || this._objects[i].isContainedWithinObject(object);
                    if (isIntersecting) {
                        newIdx = i;
                        break;
                    }
                }
            } else {
                newIdx = idx + 1;
            }
            return newIdx;
        },
        moveTo: function(object, index) {
            removeFromArray(this._objects, object);
            this._objects.splice(index, 0, object);
            return this.renderAll && this.renderAll();
        },
        dispose: function() {
            this.clear();
            return this;
        },
        toString: function() {
            return "#<fabric.Canvas (" + this.complexity() + "): " + "{ objects: " + this.getObjects().length + " }>";
        }
    });
    extend(fabric.StaticCanvas.prototype, fabric.Observable);
    extend(fabric.StaticCanvas.prototype, fabric.Collection);
    extend(fabric.StaticCanvas.prototype, fabric.DataURLExporter);
    extend(fabric.StaticCanvas, {
        EMPTY_JSON: '{"objects": [], "background": "white"}',
        supports: function(methodName) {
            var el = fabric.util.createCanvasElement();
            if (!el || !el.getContext) {
                return null;
            }
            var ctx = el.getContext("2d");
            if (!ctx) {
                return null;
            }
            switch (methodName) {
              case "getImageData":
                return typeof ctx.getImageData !== "undefined";

              case "setLineDash":
                return typeof ctx.setLineDash !== "undefined";

              case "toDataURL":
                return typeof el.toDataURL !== "undefined";

              case "toDataURLWithQuality":
                try {
                    el.toDataURL("image/jpeg", 0);
                    return true;
                } catch (e) {}
                return false;

              default:
                return null;
            }
        }
    });
    fabric.StaticCanvas.prototype.toJSON = fabric.StaticCanvas.prototype.toObject;
})();

(function() {
    var supportQuality = fabric.StaticCanvas.supports("toDataURLWithQuality");
    fabric.util.object.extend(fabric.StaticCanvas.prototype, {
        toDataURL: function(options) {
            options || (options = {});
            var format = options.format || "png", quality = options.quality || 1, multiplier = options.multiplier || 1, cropping = {
                left: options.left || 0,
                top: options.top || 0,
                width: options.width || 0,
                height: options.height || 0
            };
            return this.__toDataURLWithMultiplier(format, quality, cropping, multiplier);
        },
        __toDataURLWithMultiplier: function(format, quality, cropping, multiplier) {
            var origWidth = this.getWidth(), origHeight = this.getHeight(), scaledWidth = (cropping.width || this.getWidth()) * multiplier, scaledHeight = (cropping.height || this.getHeight()) * multiplier, zoom = this.getZoom(), newZoom = zoom * multiplier, vp = this.viewportTransform, translateX = (vp[4] - cropping.left) * multiplier, translateY = (vp[5] - cropping.top) * multiplier, newVp = [ newZoom, 0, 0, newZoom, translateX, translateY ], originalInteractive = this.interactive;
            this.viewportTransform = newVp;
            this.interactive && (this.interactive = false);
            if (origWidth !== scaledWidth || origHeight !== scaledHeight) {
                this.setDimensions({
                    width: scaledWidth,
                    height: scaledHeight
                });
            } else {
                this.renderAll();
            }
            var data = this.__toDataURL(format, quality, cropping);
            originalInteractive && (this.interactive = originalInteractive);
            this.viewportTransform = vp;
            this.setDimensions({
                width: origWidth,
                height: origHeight
            });
            return data;
        },
        __toDataURL: function(format, quality) {
            var canvasEl = this.contextContainer.canvas;
            if (format === "jpg") {
                format = "jpeg";
            }
            var data = supportQuality ? canvasEl.toDataURL("image/" + format, quality) : canvasEl.toDataURL("image/" + format);
            return data;
        },
        toDataURLWithMultiplier: function(format, multiplier, quality) {
            return this.toDataURL({
                format: format,
                multiplier: multiplier,
                quality: quality
            });
        }
    });
})();

fabric.util.object.extend(fabric.StaticCanvas.prototype, {
    loadFromDatalessJSON: function(json, callback, reviver) {
        return this.loadFromJSON(json, callback, reviver);
    },
    loadFromJSON: function(json, callback, reviver) {
        if (!json) {
            return;
        }
        var serialized = typeof json === "string" ? JSON.parse(json) : fabric.util.object.clone(json);
        var _this = this, renderOnAddRemove = this.renderOnAddRemove;
        this.renderOnAddRemove = false;
        this._enlivenObjects(serialized.objects, function(enlivenedObjects) {
            _this.clear();
            _this._setBgOverlay(serialized, function() {
                enlivenedObjects.forEach(function(obj, index) {
                    _this.insertAt(obj, index);
                });
                _this.renderOnAddRemove = renderOnAddRemove;
                delete serialized.objects;
                delete serialized.backgroundImage;
                delete serialized.overlayImage;
                delete serialized.background;
                delete serialized.overlay;
                _this._setOptions(serialized);
                _this.renderAll();
                callback && callback();
            });
        }, reviver);
        return this;
    },
    _setBgOverlay: function(serialized, callback) {
        var loaded = {
            backgroundColor: false,
            overlayColor: false,
            backgroundImage: false,
            overlayImage: false
        };
        if (!serialized.backgroundImage && !serialized.overlayImage && !serialized.background && !serialized.overlay) {
            callback && callback();
            return;
        }
        var cbIfLoaded = function() {
            if (loaded.backgroundImage && loaded.overlayImage && loaded.backgroundColor && loaded.overlayColor) {
                callback && callback();
            }
        };
        this.__setBgOverlay("backgroundImage", serialized.backgroundImage, loaded, cbIfLoaded);
        this.__setBgOverlay("overlayImage", serialized.overlayImage, loaded, cbIfLoaded);
        this.__setBgOverlay("backgroundColor", serialized.background, loaded, cbIfLoaded);
        this.__setBgOverlay("overlayColor", serialized.overlay, loaded, cbIfLoaded);
    },
    __setBgOverlay: function(property, value, loaded, callback) {
        var _this = this;
        if (!value) {
            loaded[property] = true;
            callback && callback();
            return;
        }
        if (property === "backgroundImage" || property === "overlayImage") {
            fabric.util.enlivenObjects([ value ], function(enlivedObject) {
                _this[property] = enlivedObject[0];
                loaded[property] = true;
                callback && callback();
            });
        } else {
            this["set" + fabric.util.string.capitalize(property, true)](value, function() {
                loaded[property] = true;
                callback && callback();
            });
        }
    },
    _enlivenObjects: function(objects, callback, reviver) {
        if (!objects || objects.length === 0) {
            callback && callback([]);
            return;
        }
        fabric.util.enlivenObjects(objects, function(enlivenedObjects) {
            callback && callback(enlivenedObjects);
        }, null, reviver);
    },
    _toDataURL: function(format, callback) {
        this.clone(function(clone) {
            callback(clone.toDataURL(format));
        });
    },
    _toDataURLWithMultiplier: function(format, multiplier, callback) {
        this.clone(function(clone) {
            callback(clone.toDataURLWithMultiplier(format, multiplier));
        });
    },
    clone: function(callback, properties) {
        var data = JSON.stringify(this.toJSON(properties));
        this.cloneWithoutData(function(clone) {
            clone.loadFromJSON(data, function() {
                callback && callback(clone);
            });
        });
    },
    cloneWithoutData: function(callback) {
        var el = fabric.document.createElement("canvas");
        el.width = this.getWidth();
        el.height = this.getHeight();
        var clone = new fabric.Canvas(el);
        clone.clipTo = this.clipTo;
        if (this.backgroundImage) {
            clone.setBackgroundImage(this.backgroundImage.src, function() {
                clone.renderAll();
                callback && callback(clone);
            });
            clone.backgroundImageOpacity = this.backgroundImageOpacity;
            clone.backgroundImageStretch = this.backgroundImageStretch;
        } else {
            callback && callback(clone);
        }
    }
});

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, clone = fabric.util.object.clone, toFixed = fabric.util.toFixed, capitalize = fabric.util.string.capitalize, degreesToRadians = fabric.util.degreesToRadians, supportsLineDash = fabric.StaticCanvas.supports("setLineDash"), objectCaching = !fabric.isLikelyNode, ALIASING_LIMIT = 2;
    if (fabric.Object) {
        return;
    }
    fabric.Object = fabric.util.createClass(fabric.CommonMethods, {
        type: "object",
        originX: "left",
        originY: "top",
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        scaleX: 1,
        scaleY: 1,
        flipX: false,
        flipY: false,
        opacity: 1,
        angle: 0,
        skewX: 0,
        skewY: 0,
        cornerSize: 13,
        transparentCorners: true,
        hoverCursor: null,
        moveCursor: null,
        padding: 0,
        borderColor: "rgba(102,153,255,0.75)",
        borderDashArray: null,
        cornerColor: "rgba(102,153,255,0.5)",
        cornerStrokeColor: null,
        cornerStyle: "rect",
        cornerDashArray: null,
        centeredScaling: false,
        centeredRotation: true,
        fill: "rgb(0,0,0)",
        fillRule: "nonzero",
        globalCompositeOperation: "source-over",
        backgroundColor: "",
        selectionBackgroundColor: "",
        stroke: null,
        strokeWidth: 1,
        strokeDashArray: null,
        strokeLineCap: "butt",
        strokeLineJoin: "miter",
        strokeMiterLimit: 10,
        shadow: null,
        borderOpacityWhenMoving: .4,
        borderScaleFactor: 1,
        transformMatrix: null,
        minScaleLimit: .01,
        selectable: true,
        evented: true,
        visible: true,
        hasControls: true,
        hasBorders: true,
        hasRotatingPoint: true,
        rotatingPointOffset: 40,
        perPixelTargetFind: false,
        includeDefaultValues: true,
        clipTo: null,
        lockMovementX: false,
        lockMovementY: false,
        lockRotation: false,
        lockScalingX: false,
        lockScalingY: false,
        lockUniScaling: false,
        lockSkewingX: false,
        lockSkewingY: false,
        lockScalingFlip: false,
        excludeFromExport: false,
        objectCaching: objectCaching,
        statefullCache: false,
        noScaleCache: true,
        dirty: true,
        stateProperties: ("top left width height scaleX scaleY flipX flipY originX originY transformMatrix " + "stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit " + "angle opacity fill globalCompositeOperation shadow clipTo visible backgroundColor " + "skewX skewY fillRule").split(" "),
        cacheProperties: ("fill stroke strokeWidth strokeDashArray width height" + " strokeLineCap strokeLineJoin strokeMiterLimit backgroundColor").split(" "),
        initialize: function(options) {
            options = options || {};
            if (options) {
                this.setOptions(options);
            }
        },
        _createCacheCanvas: function() {
            this._cacheProperties = {};
            this._cacheCanvas = fabric.document.createElement("canvas");
            this._cacheContext = this._cacheCanvas.getContext("2d");
            this._updateCacheCanvas();
        },
        _limitCacheSize: function(dims) {
            var perfLimitSizeTotal = fabric.perfLimitSizeTotal, maximumSide = fabric.cacheSideLimit, width = dims.width, height = dims.height, ar = width / height, limitedDims = fabric.util.limitDimsByArea(ar, perfLimitSizeTotal, maximumSide), capValue = fabric.util.capValue, max = fabric.maxCacheSideLimit, min = fabric.minCacheSideLimit, x = capValue(min, limitedDims.x, max), y = capValue(min, limitedDims.y, max);
            if (width > x) {
                dims.zoomX /= width / x;
                dims.width = x;
            } else if (width < min) {
                dims.width = min;
            }
            if (height > y) {
                dims.zoomY /= height / y;
                dims.height = y;
            } else if (height < min) {
                dims.height = min;
            }
            return dims;
        },
        _getCacheCanvasDimensions: function() {
            var zoom = this.canvas && this.canvas.getZoom() || 1, objectScale = this.getObjectScaling(), dim = this._getNonTransformedDimensions(), retina = this.canvas && this.canvas._isRetinaScaling() ? fabric.devicePixelRatio : 1, zoomX = objectScale.scaleX * zoom * retina, zoomY = objectScale.scaleY * zoom * retina, width = dim.x * zoomX, height = dim.y * zoomY;
            return {
                width: width + ALIASING_LIMIT,
                height: height + ALIASING_LIMIT,
                zoomX: zoomX,
                zoomY: zoomY
            };
        },
        _updateCacheCanvas: function() {
            if (this.noScaleCache && this.canvas && this.canvas._currentTransform) {
                var action = this.canvas._currentTransform.action;
                if (action.slice && action.slice(0, 5) === "scale") {
                    return false;
                }
            }
            var dims = this._limitCacheSize(this._getCacheCanvasDimensions()), minCacheSize = fabric.minCacheSideLimit, width = dims.width, height = dims.height, zoomX = dims.zoomX, zoomY = dims.zoomY, dimensionsChanged = width !== this.cacheWidth || height !== this.cacheHeight, zoomChanged = this.zoomX !== zoomX || this.zoomY !== zoomY, shouldRedraw = dimensionsChanged || zoomChanged, additionalWidth = 0, additionalHeight = 0, shouldResizeCanvas = false;
            if (dimensionsChanged) {
                var canvasWidth = this._cacheCanvas.width, canvasHeight = this._cacheCanvas.height, sizeGrowing = width > canvasWidth || height > canvasHeight, sizeShrinking = (width < canvasWidth * .9 || height < canvasHeight * .9) && canvasWidth > minCacheSize && canvasHeight > minCacheSize;
                shouldResizeCanvas = sizeGrowing || sizeShrinking;
                if (sizeGrowing) {
                    additionalWidth = width * .1 & ~1;
                    additionalHeight = height * .1 & ~1;
                }
            }
            if (shouldRedraw) {
                if (shouldResizeCanvas) {
                    this._cacheCanvas.width = Math.max(Math.ceil(width) + additionalWidth, minCacheSize);
                    this._cacheCanvas.height = Math.max(Math.ceil(height) + additionalHeight, minCacheSize);
                    this.cacheTranslationX = (width + additionalWidth) / 2;
                    this.cacheTranslationY = (height + additionalHeight) / 2;
                } else {
                    this._cacheContext.setTransform(1, 0, 0, 1, 0, 0);
                    this._cacheContext.clearRect(0, 0, this._cacheCanvas.width, this._cacheCanvas.height);
                }
                this.cacheWidth = width;
                this.cacheHeight = height;
                this._cacheContext.translate(this.cacheTranslationX, this.cacheTranslationY);
                this._cacheContext.scale(zoomX, zoomY);
                this.zoomX = zoomX;
                this.zoomY = zoomY;
                return true;
            }
            return false;
        },
        setOptions: function(options) {
            this._setOptions(options);
            this._initGradient(options.fill, "fill");
            this._initGradient(options.stroke, "stroke");
            this._initClipping(options);
            this._initPattern(options.fill, "fill");
            this._initPattern(options.stroke, "stroke");
        },
        transform: function(ctx, fromLeft) {
            if (this.group && !this.group._transformDone && this.group === this.canvas._activeGroup) {
                this.group.transform(ctx);
            }
            var center = fromLeft ? this._getLeftTopCoords() : this.getCenterPoint();
            ctx.translate(center.x, center.y);
            this.angle && ctx.rotate(degreesToRadians(this.angle));
            ctx.scale(this.scaleX * (this.flipX ? -1 : 1), this.scaleY * (this.flipY ? -1 : 1));
            this.skewX && ctx.transform(1, 0, Math.tan(degreesToRadians(this.skewX)), 1, 0, 0);
            this.skewY && ctx.transform(1, Math.tan(degreesToRadians(this.skewY)), 0, 1, 0, 0);
        },
        toObject: function(propertiesToInclude) {
            var NUM_FRACTION_DIGITS = fabric.Object.NUM_FRACTION_DIGITS, object = {
                type: this.type,
                originX: this.originX,
                originY: this.originY,
                left: toFixed(this.left, NUM_FRACTION_DIGITS),
                top: toFixed(this.top, NUM_FRACTION_DIGITS),
                width: toFixed(this.width, NUM_FRACTION_DIGITS),
                height: toFixed(this.height, NUM_FRACTION_DIGITS),
                fill: this.fill && this.fill.toObject ? this.fill.toObject() : this.fill,
                stroke: this.stroke && this.stroke.toObject ? this.stroke.toObject() : this.stroke,
                strokeWidth: toFixed(this.strokeWidth, NUM_FRACTION_DIGITS),
                strokeDashArray: this.strokeDashArray ? this.strokeDashArray.concat() : this.strokeDashArray,
                strokeLineCap: this.strokeLineCap,
                strokeLineJoin: this.strokeLineJoin,
                strokeMiterLimit: toFixed(this.strokeMiterLimit, NUM_FRACTION_DIGITS),
                scaleX: toFixed(this.scaleX, NUM_FRACTION_DIGITS),
                scaleY: toFixed(this.scaleY, NUM_FRACTION_DIGITS),
                angle: toFixed(this.getAngle(), NUM_FRACTION_DIGITS),
                flipX: this.flipX,
                flipY: this.flipY,
                opacity: toFixed(this.opacity, NUM_FRACTION_DIGITS),
                shadow: this.shadow && this.shadow.toObject ? this.shadow.toObject() : this.shadow,
                visible: this.visible,
                clipTo: this.clipTo && String(this.clipTo),
                backgroundColor: this.backgroundColor,
                fillRule: this.fillRule,
                globalCompositeOperation: this.globalCompositeOperation,
                transformMatrix: this.transformMatrix ? this.transformMatrix.concat() : null,
                skewX: toFixed(this.skewX, NUM_FRACTION_DIGITS),
                skewY: toFixed(this.skewY, NUM_FRACTION_DIGITS)
            };
            fabric.util.populateWithProperties(this, object, propertiesToInclude);
            if (!this.includeDefaultValues) {
                object = this._removeDefaultValues(object);
            }
            return object;
        },
        toDatalessObject: function(propertiesToInclude) {
            return this.toObject(propertiesToInclude);
        },
        _removeDefaultValues: function(object) {
            var prototype = fabric.util.getKlass(object.type).prototype, stateProperties = prototype.stateProperties;
            stateProperties.forEach(function(prop) {
                if (object[prop] === prototype[prop]) {
                    delete object[prop];
                }
                var isArray = Object.prototype.toString.call(object[prop]) === "[object Array]" && Object.prototype.toString.call(prototype[prop]) === "[object Array]";
                if (isArray && object[prop].length === 0 && prototype[prop].length === 0) {
                    delete object[prop];
                }
            });
            return object;
        },
        toString: function() {
            return "#<fabric." + capitalize(this.type) + ">";
        },
        getObjectScaling: function() {
            var scaleX = this.scaleX, scaleY = this.scaleY;
            if (this.group) {
                var scaling = this.group.getObjectScaling();
                scaleX *= scaling.scaleX;
                scaleY *= scaling.scaleY;
            }
            return {
                scaleX: scaleX,
                scaleY: scaleY
            };
        },
        _set: function(key, value) {
            var shouldConstrainValue = key === "scaleX" || key === "scaleY";
            if (shouldConstrainValue) {
                value = this._constrainScale(value);
            }
            if (key === "scaleX" && value < 0) {
                this.flipX = !this.flipX;
                value *= -1;
            } else if (key === "scaleY" && value < 0) {
                this.flipY = !this.flipY;
                value *= -1;
            } else if (key === "shadow" && value && !(value instanceof fabric.Shadow)) {
                value = new fabric.Shadow(value);
            } else if (key === "dirty" && this.group) {
                this.group.set("dirty", value);
            }
            this[key] = value;
            if (this.cacheProperties.indexOf(key) > -1) {
                if (this.group) {
                    this.group.set("dirty", true);
                }
                this.dirty = true;
            }
            if (this.group && this.stateProperties.indexOf(key) > -1) {
                this.group.set("dirty", true);
            }
            if (key === "width" || key === "height") {
                this.minScaleLimit = Math.min(.1, 1 / Math.max(this.width, this.height));
            }
            return this;
        },
        setOnGroup: function() {},
        setSourcePath: function(value) {
            this.sourcePath = value;
            return this;
        },
        getViewportTransform: function() {
            if (this.canvas && this.canvas.viewportTransform) {
                return this.canvas.viewportTransform;
            }
            return fabric.iMatrix.concat();
        },
        isNotVisible: function() {
            return this.opacity === 0 || this.width === 0 && this.height === 0 || !this.visible;
        },
        render: function(ctx, noTransform) {
            if (this.isNotVisible()) {
                return;
            }
            if (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen()) {
                return;
            }
            ctx.save();
            this._setupCompositeOperation(ctx);
            this.drawSelectionBackground(ctx);
            if (!noTransform) {
                this.transform(ctx);
            }
            this._setOpacity(ctx);
            this._setShadow(ctx);
            if (this.transformMatrix) {
                ctx.transform.apply(ctx, this.transformMatrix);
            }
            this.clipTo && fabric.util.clipContext(this, ctx);
            if (this.shouldCache(noTransform)) {
                if (!this._cacheCanvas) {
                    this._createCacheCanvas();
                }
                if (this.isCacheDirty(noTransform)) {
                    this.statefullCache && this.saveState({
                        propertySet: "cacheProperties"
                    });
                    this.drawObject(this._cacheContext, noTransform);
                    this.dirty = false;
                }
                this.drawCacheOnCanvas(ctx);
            } else {
                this.dirty = false;
                this.drawObject(ctx, noTransform);
                if (noTransform && this.objectCaching && this.statefullCache) {
                    this.saveState({
                        propertySet: "cacheProperties"
                    });
                }
            }
            this.clipTo && ctx.restore();
            ctx.restore();
        },
        needsItsOwnCache: function() {
            return false;
        },
        shouldCache: function(noTransform) {
            return !noTransform && this.objectCaching && (!this.group || this.needsItsOwnCache() || !this.group.isCaching());
        },
        willDrawShadow: function() {
            return !!this.shadow && (this.shadow.offsetX !== 0 || this.shadow.offsetY !== 0);
        },
        drawObject: function(ctx, noTransform) {
            this._renderBackground(ctx);
            this._setStrokeStyles(ctx);
            this._setFillStyles(ctx);
            this._render(ctx, noTransform);
        },
        drawCacheOnCanvas: function(ctx) {
            ctx.scale(1 / this.zoomX, 1 / this.zoomY);
            ctx.drawImage(this._cacheCanvas, -this.cacheTranslationX, -this.cacheTranslationY);
        },
        isCacheDirty: function(skipCanvas) {
            if (this.isNotVisible()) {
                return false;
            }
            if (this._cacheCanvas && !skipCanvas && this._updateCacheCanvas()) {
                return true;
            } else {
                if (this.dirty || this.statefullCache && this.hasStateChanged("cacheProperties")) {
                    if (this._cacheCanvas && !skipCanvas) {
                        var width = this.cacheWidth / this.zoomX;
                        var height = this.cacheHeight / this.zoomY;
                        this._cacheContext.clearRect(-width / 2, -height / 2, width, height);
                    }
                    return true;
                }
            }
            return false;
        },
        _renderBackground: function(ctx) {
            if (!this.backgroundColor) {
                return;
            }
            var dim = this._getNonTransformedDimensions();
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(-dim.x / 2, -dim.y / 2, dim.x, dim.y);
            this._removeShadow(ctx);
        },
        _setOpacity: function(ctx) {
            ctx.globalAlpha *= this.opacity;
        },
        _setStrokeStyles: function(ctx) {
            if (this.stroke) {
                ctx.lineWidth = this.strokeWidth;
                ctx.lineCap = this.strokeLineCap;
                ctx.lineJoin = this.strokeLineJoin;
                ctx.miterLimit = this.strokeMiterLimit;
                ctx.strokeStyle = this.stroke.toLive ? this.stroke.toLive(ctx, this) : this.stroke;
            }
        },
        _setFillStyles: function(ctx) {
            if (this.fill) {
                ctx.fillStyle = this.fill.toLive ? this.fill.toLive(ctx, this) : this.fill;
            }
        },
        _setLineDash: function(ctx, dashArray, alternative) {
            if (!dashArray) {
                return;
            }
            if (1 & dashArray.length) {
                dashArray.push.apply(dashArray, dashArray);
            }
            if (supportsLineDash) {
                ctx.setLineDash(dashArray);
            } else {
                alternative && alternative(ctx);
            }
        },
        _renderControls: function(ctx) {
            if (!this.active || this.group && this.group !== this.canvas.getActiveGroup()) {
                return;
            }
            var vpt = this.getViewportTransform(), matrix = this.calcTransformMatrix(), options;
            matrix = fabric.util.multiplyTransformMatrices(vpt, matrix);
            options = fabric.util.qrDecompose(matrix);
            ctx.save();
            ctx.translate(options.translateX, options.translateY);
            ctx.lineWidth = 1 * this.borderScaleFactor;
            if (!this.group) {
                ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
            }
            if (this.group && this.group === this.canvas.getActiveGroup()) {
                ctx.rotate(degreesToRadians(options.angle));
                this.drawBordersInGroup(ctx, options);
            } else {
                ctx.rotate(degreesToRadians(this.angle));
                this.drawBorders(ctx);
            }
            this.drawControls(ctx);
            ctx.restore();
        },
        _setShadow: function(ctx) {
            if (!this.shadow) {
                return;
            }
            var multX = this.canvas && this.canvas.viewportTransform[0] || 1, multY = this.canvas && this.canvas.viewportTransform[3] || 1, scaling = this.getObjectScaling();
            if (this.canvas && this.canvas._isRetinaScaling()) {
                multX *= fabric.devicePixelRatio;
                multY *= fabric.devicePixelRatio;
            }
            ctx.shadowColor = this.shadow.color;
            ctx.shadowBlur = this.shadow.blur * (multX + multY) * (scaling.scaleX + scaling.scaleY) / 4;
            ctx.shadowOffsetX = this.shadow.offsetX * multX * scaling.scaleX;
            ctx.shadowOffsetY = this.shadow.offsetY * multY * scaling.scaleY;
        },
        _removeShadow: function(ctx) {
            if (!this.shadow) {
                return;
            }
            ctx.shadowColor = "";
            ctx.shadowBlur = ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
        },
        _applyPatternGradientTransform: function(ctx, filler) {
            if (!filler.toLive) {
                return;
            }
            var transform = filler.gradientTransform || filler.patternTransform;
            if (transform) {
                ctx.transform.apply(ctx, transform);
            }
            var offsetX = -this.width / 2 + filler.offsetX || 0, offsetY = -this.height / 2 + filler.offsetY || 0;
            ctx.translate(offsetX, offsetY);
        },
        _renderFill: function(ctx) {
            if (!this.fill) {
                return;
            }
            ctx.save();
            this._applyPatternGradientTransform(ctx, this.fill);
            if (this.fillRule === "evenodd") {
                ctx.fill("evenodd");
            } else {
                ctx.fill();
            }
            ctx.restore();
        },
        _renderStroke: function(ctx) {
            if (!this.stroke || this.strokeWidth === 0) {
                return;
            }
            if (this.shadow && !this.shadow.affectStroke) {
                this._removeShadow(ctx);
            }
            ctx.save();
            this._setLineDash(ctx, this.strokeDashArray, this._renderDashedStroke);
            this._applyPatternGradientTransform(ctx, this.stroke);
            ctx.stroke();
            ctx.restore();
        },
        clone: function(callback, propertiesToInclude) {
            if (this.constructor.fromObject) {
                return this.constructor.fromObject(this.toObject(propertiesToInclude), callback);
            }
            return new fabric.Object(this.toObject(propertiesToInclude));
        },
        cloneAsImage: function(callback, options) {
            var dataUrl = this.toDataURL(options);
            fabric.util.loadImage(dataUrl, function(img) {
                if (callback) {
                    callback(new fabric.Image(img));
                }
            });
            return this;
        },
        toDataURL: function(options) {
            options || (options = {});
            var el = fabric.util.createCanvasElement(), boundingRect = this.getBoundingRect();
            el.width = boundingRect.width;
            el.height = boundingRect.height;
            fabric.util.wrapElement(el, "div");
            var canvas = new fabric.StaticCanvas(el, {
                enableRetinaScaling: options.enableRetinaScaling
            });
            if (options.format === "jpg") {
                options.format = "jpeg";
            }
            if (options.format === "jpeg") {
                canvas.backgroundColor = "#fff";
            }
            var origParams = {
                active: this.get("active"),
                left: this.getLeft(),
                top: this.getTop()
            };
            this.set("active", false);
            this.setPositionByOrigin(new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2), "center", "center");
            var originalCanvas = this.canvas;
            canvas.add(this);
            var data = canvas.toDataURL(options);
            this.set(origParams).setCoords();
            this.canvas = originalCanvas;
            canvas.dispose();
            canvas = null;
            return data;
        },
        isType: function(type) {
            return this.type === type;
        },
        complexity: function() {
            return 1;
        },
        toJSON: function(propertiesToInclude) {
            return this.toObject(propertiesToInclude);
        },
        setGradient: function(property, options) {
            options || (options = {});
            var gradient = {
                colorStops: []
            };
            gradient.type = options.type || (options.r1 || options.r2 ? "radial" : "linear");
            gradient.coords = {
                x1: options.x1,
                y1: options.y1,
                x2: options.x2,
                y2: options.y2
            };
            if (options.r1 || options.r2) {
                gradient.coords.r1 = options.r1;
                gradient.coords.r2 = options.r2;
            }
            gradient.gradientTransform = options.gradientTransform;
            fabric.Gradient.prototype.addColorStop.call(gradient, options.colorStops);
            return this.set(property, fabric.Gradient.forObject(this, gradient));
        },
        setPatternFill: function(options) {
            return this.set("fill", new fabric.Pattern(options));
        },
        setShadow: function(options) {
            return this.set("shadow", options ? new fabric.Shadow(options) : null);
        },
        setColor: function(color) {
            this.set("fill", color);
            return this;
        },
        setAngle: function(angle) {
            var shouldCenterOrigin = (this.originX !== "center" || this.originY !== "center") && this.centeredRotation;
            if (shouldCenterOrigin) {
                this._setOriginToCenter();
            }
            this.set("angle", angle);
            if (shouldCenterOrigin) {
                this._resetOrigin();
            }
            return this;
        },
        centerH: function() {
            this.canvas && this.canvas.centerObjectH(this);
            return this;
        },
        viewportCenterH: function() {
            this.canvas && this.canvas.viewportCenterObjectH(this);
            return this;
        },
        centerV: function() {
            this.canvas && this.canvas.centerObjectV(this);
            return this;
        },
        viewportCenterV: function() {
            this.canvas && this.canvas.viewportCenterObjectV(this);
            return this;
        },
        center: function() {
            this.canvas && this.canvas.centerObject(this);
            return this;
        },
        viewportCenter: function() {
            this.canvas && this.canvas.viewportCenterObject(this);
            return this;
        },
        remove: function() {
            if (this.canvas) {
                if (this.group && this.group === this.canvas._activeGroup) {
                    this.group.remove(this);
                }
                this.canvas.remove(this);
            }
            return this;
        },
        getLocalPointer: function(e, pointer) {
            pointer = pointer || this.canvas.getPointer(e);
            var pClicked = new fabric.Point(pointer.x, pointer.y), objectLeftTop = this._getLeftTopCoords();
            if (this.angle) {
                pClicked = fabric.util.rotatePoint(pClicked, objectLeftTop, degreesToRadians(-this.angle));
            }
            return {
                x: pClicked.x - objectLeftTop.x,
                y: pClicked.y - objectLeftTop.y
            };
        },
        _setupCompositeOperation: function(ctx) {
            if (this.globalCompositeOperation) {
                ctx.globalCompositeOperation = this.globalCompositeOperation;
            }
        }
    });
    fabric.util.createAccessors(fabric.Object);
    fabric.Object.prototype.rotate = fabric.Object.prototype.setAngle;
    extend(fabric.Object.prototype, fabric.Observable);
    fabric.Object.NUM_FRACTION_DIGITS = 2;
    fabric.Object._fromObject = function(className, object, callback, forceAsync, extraParam) {
        var klass = fabric[className];
        object = clone(object, true);
        if (forceAsync) {
            fabric.util.enlivenPatterns([ object.fill, object.stroke ], function(patterns) {
                if (typeof patterns[0] !== "undefined") {
                    object.fill = patterns[0];
                }
                if (typeof patterns[1] !== "undefined") {
                    object.stroke = patterns[1];
                }
                var instance = extraParam ? new klass(object[extraParam], object) : new klass(object);
                callback && callback(instance);
            });
        } else {
            var instance = extraParam ? new klass(object[extraParam], object) : new klass(object);
            callback && callback(instance);
            return instance;
        }
    };
    fabric.Object.__uid = 0;
})(typeof exports !== "undefined" ? exports : this);

(function() {
    var degreesToRadians = fabric.util.degreesToRadians, originXOffset = {
        left: -.5,
        center: 0,
        right: .5
    }, originYOffset = {
        top: -.5,
        center: 0,
        bottom: .5
    };
    fabric.util.object.extend(fabric.Object.prototype, {
        translateToGivenOrigin: function(point, fromOriginX, fromOriginY, toOriginX, toOriginY) {
            var x = point.x, y = point.y, offsetX, offsetY, dim;
            if (typeof fromOriginX === "string") {
                fromOriginX = originXOffset[fromOriginX];
            } else {
                fromOriginX -= .5;
            }
            if (typeof toOriginX === "string") {
                toOriginX = originXOffset[toOriginX];
            } else {
                toOriginX -= .5;
            }
            offsetX = toOriginX - fromOriginX;
            if (typeof fromOriginY === "string") {
                fromOriginY = originYOffset[fromOriginY];
            } else {
                fromOriginY -= .5;
            }
            if (typeof toOriginY === "string") {
                toOriginY = originYOffset[toOriginY];
            } else {
                toOriginY -= .5;
            }
            offsetY = toOriginY - fromOriginY;
            if (offsetX || offsetY) {
                dim = this._getTransformedDimensions();
                x = point.x + offsetX * dim.x;
                y = point.y + offsetY * dim.y;
            }
            return new fabric.Point(x, y);
        },
        translateToCenterPoint: function(point, originX, originY) {
            var p = this.translateToGivenOrigin(point, originX, originY, "center", "center");
            if (this.angle) {
                return fabric.util.rotatePoint(p, point, degreesToRadians(this.angle));
            }
            return p;
        },
        translateToOriginPoint: function(center, originX, originY) {
            var p = this.translateToGivenOrigin(center, "center", "center", originX, originY);
            if (this.angle) {
                return fabric.util.rotatePoint(p, center, degreesToRadians(this.angle));
            }
            return p;
        },
        getCenterPoint: function() {
            var leftTop = new fabric.Point(this.left, this.top);
            return this.translateToCenterPoint(leftTop, this.originX, this.originY);
        },
        getPointByOrigin: function(originX, originY) {
            var center = this.getCenterPoint();
            return this.translateToOriginPoint(center, originX, originY);
        },
        toLocalPoint: function(point, originX, originY) {
            var center = this.getCenterPoint(), p, p2;
            if (typeof originX !== "undefined" && typeof originY !== "undefined") {
                p = this.translateToGivenOrigin(center, "center", "center", originX, originY);
            } else {
                p = new fabric.Point(this.left, this.top);
            }
            p2 = new fabric.Point(point.x, point.y);
            if (this.angle) {
                p2 = fabric.util.rotatePoint(p2, center, -degreesToRadians(this.angle));
            }
            return p2.subtractEquals(p);
        },
        setPositionByOrigin: function(pos, originX, originY) {
            var center = this.translateToCenterPoint(pos, originX, originY), position = this.translateToOriginPoint(center, this.originX, this.originY);
            this.set("left", position.x);
            this.set("top", position.y);
        },
        adjustPosition: function(to) {
            var angle = degreesToRadians(this.angle), hypotFull = this.getWidth(), xFull = Math.cos(angle) * hypotFull, yFull = Math.sin(angle) * hypotFull, offsetFrom, offsetTo;
            if (typeof this.originX === "string") {
                offsetFrom = originXOffset[this.originX];
            } else {
                offsetFrom = this.originX - .5;
            }
            if (typeof to === "string") {
                offsetTo = originXOffset[to];
            } else {
                offsetTo = to - .5;
            }
            this.left += xFull * (offsetTo - offsetFrom);
            this.top += yFull * (offsetTo - offsetFrom);
            this.setCoords();
            this.originX = to;
        },
        _setOriginToCenter: function() {
            this._originalOriginX = this.originX;
            this._originalOriginY = this.originY;
            var center = this.getCenterPoint();
            this.originX = "center";
            this.originY = "center";
            this.left = center.x;
            this.top = center.y;
        },
        _resetOrigin: function() {
            var originPoint = this.translateToOriginPoint(this.getCenterPoint(), this._originalOriginX, this._originalOriginY);
            this.originX = this._originalOriginX;
            this.originY = this._originalOriginY;
            this.left = originPoint.x;
            this.top = originPoint.y;
            this._originalOriginX = null;
            this._originalOriginY = null;
        },
        _getLeftTopCoords: function() {
            return this.translateToOriginPoint(this.getCenterPoint(), "left", "top");
        },
        onDeselect: function() {}
    });
})();

(function() {
    function getCoords(coords) {
        return [ new fabric.Point(coords.tl.x, coords.tl.y), new fabric.Point(coords.tr.x, coords.tr.y), new fabric.Point(coords.br.x, coords.br.y), new fabric.Point(coords.bl.x, coords.bl.y) ];
    }
    var degreesToRadians = fabric.util.degreesToRadians, multiplyMatrices = fabric.util.multiplyTransformMatrices;
    fabric.util.object.extend(fabric.Object.prototype, {
        oCoords: null,
        aCoords: null,
        getCoords: function(absolute, calculate) {
            if (!this.oCoords) {
                this.setCoords();
            }
            var coords = absolute ? this.aCoords : this.oCoords;
            return getCoords(calculate ? this.calcCoords(absolute) : coords);
        },
        intersectsWithRect: function(pointTL, pointBR, absolute, calculate) {
            var coords = this.getCoords(absolute, calculate), intersection = fabric.Intersection.intersectPolygonRectangle(coords, pointTL, pointBR);
            return intersection.status === "Intersection";
        },
        intersectsWithObject: function(other, absolute, calculate) {
            var intersection = fabric.Intersection.intersectPolygonPolygon(this.getCoords(absolute, calculate), other.getCoords(absolute, calculate));
            return intersection.status === "Intersection" || other.isContainedWithinObject(this, absolute, calculate) || this.isContainedWithinObject(other, absolute, calculate);
        },
        isContainedWithinObject: function(other, absolute, calculate) {
            var points = this.getCoords(absolute, calculate), i = 0, lines = other._getImageLines(calculate ? other.calcCoords(absolute) : absolute ? other.aCoords : other.oCoords);
            for (;i < 4; i++) {
                if (!other.containsPoint(points[i], lines)) {
                    return false;
                }
            }
            return true;
        },
        isContainedWithinRect: function(pointTL, pointBR, absolute, calculate) {
            var boundingRect = this.getBoundingRect(absolute, calculate);
            return boundingRect.left >= pointTL.x && boundingRect.left + boundingRect.width <= pointBR.x && boundingRect.top >= pointTL.y && boundingRect.top + boundingRect.height <= pointBR.y;
        },
        containsPoint: function(point, lines, absolute, calculate) {
            var lines = lines || this._getImageLines(calculate ? this.calcCoords(absolute) : absolute ? this.aCoords : this.oCoords), xPoints = this._findCrossPoints(point, lines);
            return xPoints !== 0 && xPoints % 2 === 1;
        },
        isOnScreen: function(calculate) {
            if (!this.canvas) {
                return false;
            }
            var pointTL = this.canvas.vptCoords.tl, pointBR = this.canvas.vptCoords.br;
            var points = this.getCoords(true, calculate), point;
            for (var i = 0; i < 4; i++) {
                point = points[i];
                if (point.x <= pointBR.x && point.x >= pointTL.x && point.y <= pointBR.y && point.y >= pointTL.y) {
                    return true;
                }
            }
            if (this.intersectsWithRect(pointTL, pointBR, true)) {
                return true;
            }
            var centerPoint = {
                x: (pointTL.x + pointBR.x) / 2,
                y: (pointTL.y + pointBR.y) / 2
            };
            if (this.containsPoint(centerPoint, null, true)) {
                return true;
            }
            return false;
        },
        _getImageLines: function(oCoords) {
            return {
                topline: {
                    o: oCoords.tl,
                    d: oCoords.tr
                },
                rightline: {
                    o: oCoords.tr,
                    d: oCoords.br
                },
                bottomline: {
                    o: oCoords.br,
                    d: oCoords.bl
                },
                leftline: {
                    o: oCoords.bl,
                    d: oCoords.tl
                }
            };
        },
        _findCrossPoints: function(point, lines) {
            var b1, b2, a1, a2, xi, xcount = 0, iLine;
            for (var lineKey in lines) {
                iLine = lines[lineKey];
                if (iLine.o.y < point.y && iLine.d.y < point.y) {
                    continue;
                }
                if (iLine.o.y >= point.y && iLine.d.y >= point.y) {
                    continue;
                }
                if (iLine.o.x === iLine.d.x && iLine.o.x >= point.x) {
                    xi = iLine.o.x;
                } else {
                    b1 = 0;
                    b2 = (iLine.d.y - iLine.o.y) / (iLine.d.x - iLine.o.x);
                    a1 = point.y - b1 * point.x;
                    a2 = iLine.o.y - b2 * iLine.o.x;
                    xi = -(a1 - a2) / (b1 - b2);
                }
                if (xi >= point.x) {
                    xcount += 1;
                }
                if (xcount === 2) {
                    break;
                }
            }
            return xcount;
        },
        getBoundingRectWidth: function() {
            return this.getBoundingRect().width;
        },
        getBoundingRectHeight: function() {
            return this.getBoundingRect().height;
        },
        getBoundingRect: function(absolute, calculate) {
            var coords = this.getCoords(absolute, calculate);
            return fabric.util.makeBoundingBoxFromPoints(coords);
        },
        getWidth: function() {
            return this._getTransformedDimensions().x;
        },
        getHeight: function() {
            return this._getTransformedDimensions().y;
        },
        _constrainScale: function(value) {
            if (Math.abs(value) < this.minScaleLimit) {
                if (value < 0) {
                    return -this.minScaleLimit;
                } else {
                    return this.minScaleLimit;
                }
            }
            return value;
        },
        scale: function(value) {
            value = this._constrainScale(value);
            if (value < 0) {
                this.flipX = !this.flipX;
                this.flipY = !this.flipY;
                value *= -1;
            }
            this.scaleX = value;
            this.scaleY = value;
            return this.setCoords();
        },
        scaleToWidth: function(value) {
            var boundingRectFactor = this.getBoundingRect().width / this.getWidth();
            return this.scale(value / this.width / boundingRectFactor);
        },
        scaleToHeight: function(value) {
            var boundingRectFactor = this.getBoundingRect().height / this.getHeight();
            return this.scale(value / this.height / boundingRectFactor);
        },
        calcCoords: function(absolute) {
            var theta = degreesToRadians(this.angle), vpt = this.getViewportTransform(), dim = absolute ? this._getTransformedDimensions() : this._calculateCurrentDimensions(), currentWidth = dim.x, currentHeight = dim.y, sinTh = Math.sin(theta), cosTh = Math.cos(theta), _angle = currentWidth > 0 ? Math.atan(currentHeight / currentWidth) : 0, _hypotenuse = currentWidth / Math.cos(_angle) / 2, offsetX = Math.cos(_angle + theta) * _hypotenuse, offsetY = Math.sin(_angle + theta) * _hypotenuse, center = this.getCenterPoint(), coords = absolute ? center : fabric.util.transformPoint(center, vpt), tl = new fabric.Point(coords.x - offsetX, coords.y - offsetY), tr = new fabric.Point(tl.x + currentWidth * cosTh, tl.y + currentWidth * sinTh), bl = new fabric.Point(tl.x - currentHeight * sinTh, tl.y + currentHeight * cosTh), br = new fabric.Point(coords.x + offsetX, coords.y + offsetY);
            if (!absolute) {
                var ml = new fabric.Point((tl.x + bl.x) / 2, (tl.y + bl.y) / 2), mt = new fabric.Point((tr.x + tl.x) / 2, (tr.y + tl.y) / 2), mr = new fabric.Point((br.x + tr.x) / 2, (br.y + tr.y) / 2), mb = new fabric.Point((br.x + bl.x) / 2, (br.y + bl.y) / 2), mtr = new fabric.Point(mt.x + sinTh * this.rotatingPointOffset, mt.y - cosTh * this.rotatingPointOffset);
            }
            var coords = {
                tl: tl,
                tr: tr,
                br: br,
                bl: bl
            };
            if (!absolute) {
                coords.ml = ml;
                coords.mt = mt;
                coords.mr = mr;
                coords.mb = mb;
                coords.mtr = mtr;
            }
            return coords;
        },
        setCoords: function(ignoreZoom, skipAbsolute) {
            this.oCoords = this.calcCoords(ignoreZoom);
            if (!skipAbsolute) {
                this.aCoords = this.calcCoords(true);
            }
            ignoreZoom || this._setCornerCoords && this._setCornerCoords();
            return this;
        },
        _calcRotateMatrix: function() {
            if (this.angle) {
                var theta = degreesToRadians(this.angle), cos = Math.cos(theta), sin = Math.sin(theta);
                if (cos === 6.123233995736766e-17 || cos === -1.8369701987210297e-16) {
                    cos = 0;
                }
                return [ cos, sin, -sin, cos, 0, 0 ];
            }
            return fabric.iMatrix.concat();
        },
        calcTransformMatrix: function(skipGroup) {
            var center = this.getCenterPoint(), translateMatrix = [ 1, 0, 0, 1, center.x, center.y ], rotateMatrix, dimensionMatrix = this._calcDimensionsTransformMatrix(this.skewX, this.skewY, true), matrix;
            if (this.group && !skipGroup) {
                matrix = multiplyMatrices(this.group.calcTransformMatrix(), translateMatrix);
            } else {
                matrix = translateMatrix;
            }
            if (this.angle) {
                rotateMatrix = this._calcRotateMatrix();
                matrix = multiplyMatrices(matrix, rotateMatrix);
            }
            matrix = multiplyMatrices(matrix, dimensionMatrix);
            return matrix;
        },
        _calcDimensionsTransformMatrix: function(skewX, skewY, flipping) {
            var skewMatrix, scaleX = this.scaleX * (flipping && this.flipX ? -1 : 1), scaleY = this.scaleY * (flipping && this.flipY ? -1 : 1), scaleMatrix = [ scaleX, 0, 0, scaleY, 0, 0 ];
            if (skewX) {
                skewMatrix = [ 1, 0, Math.tan(degreesToRadians(skewX)), 1 ];
                scaleMatrix = multiplyMatrices(scaleMatrix, skewMatrix, true);
            }
            if (skewY) {
                skewMatrix = [ 1, Math.tan(degreesToRadians(skewY)), 0, 1 ];
                scaleMatrix = multiplyMatrices(scaleMatrix, skewMatrix, true);
            }
            return scaleMatrix;
        },
        _getNonTransformedDimensions: function() {
            var strokeWidth = this.strokeWidth, w = this.width + strokeWidth, h = this.height + strokeWidth;
            return {
                x: w,
                y: h
            };
        },
        _getTransformedDimensions: function(skewX, skewY) {
            if (typeof skewX === "undefined") {
                skewX = this.skewX;
            }
            if (typeof skewY === "undefined") {
                skewY = this.skewY;
            }
            var dimensions = this._getNonTransformedDimensions(), dimX = dimensions.x / 2, dimY = dimensions.y / 2, points = [ {
                x: -dimX,
                y: -dimY
            }, {
                x: dimX,
                y: -dimY
            }, {
                x: -dimX,
                y: dimY
            }, {
                x: dimX,
                y: dimY
            } ], i, transformMatrix = this._calcDimensionsTransformMatrix(skewX, skewY, false), bbox;
            for (i = 0; i < points.length; i++) {
                points[i] = fabric.util.transformPoint(points[i], transformMatrix);
            }
            bbox = fabric.util.makeBoundingBoxFromPoints(points);
            return {
                x: bbox.width,
                y: bbox.height
            };
        },
        _calculateCurrentDimensions: function() {
            var vpt = this.getViewportTransform(), dim = this._getTransformedDimensions(), p = fabric.util.transformPoint(dim, vpt, true);
            return p.scalarAdd(2 * this.padding);
        }
    });
})();

fabric.util.object.extend(fabric.Object.prototype, {
    sendToBack: function() {
        if (this.group) {
            fabric.StaticCanvas.prototype.sendToBack.call(this.group, this);
        } else {
            this.canvas.sendToBack(this);
        }
        return this;
    },
    bringToFront: function() {
        if (this.group) {
            fabric.StaticCanvas.prototype.bringToFront.call(this.group, this);
        } else {
            this.canvas.bringToFront(this);
        }
        return this;
    },
    sendBackwards: function(intersecting) {
        if (this.group) {
            fabric.StaticCanvas.prototype.sendBackwards.call(this.group, this, intersecting);
        } else {
            this.canvas.sendBackwards(this, intersecting);
        }
        return this;
    },
    bringForward: function(intersecting) {
        if (this.group) {
            fabric.StaticCanvas.prototype.bringForward.call(this.group, this, intersecting);
        } else {
            this.canvas.bringForward(this, intersecting);
        }
        return this;
    },
    moveTo: function(index) {
        if (this.group) {
            fabric.StaticCanvas.prototype.moveTo.call(this.group, this, index);
        } else {
            this.canvas.moveTo(this, index);
        }
        return this;
    }
});

(function() {
    function getSvgColorString(prop, value) {
        if (!value) {
            return prop + ": none; ";
        } else if (value.toLive) {
            return prop + ": url(#SVGID_" + value.id + "); ";
        } else {
            var color = new fabric.Color(value), str = prop + ": " + color.toRgb() + "; ", opacity = color.getAlpha();
            if (opacity !== 1) {
                str += prop + "-opacity: " + opacity.toString() + "; ";
            }
            return str;
        }
    }
    fabric.util.object.extend(fabric.Object.prototype, {
        getSvgStyles: function(skipShadow) {
            var fillRule = this.fillRule, strokeWidth = this.strokeWidth ? this.strokeWidth : "0", strokeDashArray = this.strokeDashArray ? this.strokeDashArray.join(" ") : "none", strokeLineCap = this.strokeLineCap ? this.strokeLineCap : "butt", strokeLineJoin = this.strokeLineJoin ? this.strokeLineJoin : "miter", strokeMiterLimit = this.strokeMiterLimit ? this.strokeMiterLimit : "4", opacity = typeof this.opacity !== "undefined" ? this.opacity : "1", visibility = this.visible ? "" : " visibility: hidden;", filter = skipShadow ? "" : this.getSvgFilter(), fill = getSvgColorString("fill", this.fill), stroke = getSvgColorString("stroke", this.stroke);
            return [ stroke, "stroke-width: ", strokeWidth, "; ", "stroke-dasharray: ", strokeDashArray, "; ", "stroke-linecap: ", strokeLineCap, "; ", "stroke-linejoin: ", strokeLineJoin, "; ", "stroke-miterlimit: ", strokeMiterLimit, "; ", fill, "fill-rule: ", fillRule, "; ", "opacity: ", opacity, ";", filter, visibility ].join("");
        },
        getSvgFilter: function() {
            return this.shadow ? "filter: url(#SVGID_" + this.shadow.id + ");" : "";
        },
        getSvgId: function() {
            return this.id ? 'id="' + this.id + '" ' : "";
        },
        getSvgTransform: function() {
            if (this.group && this.group.type === "path-group") {
                return "";
            }
            var toFixed = fabric.util.toFixed, angle = this.getAngle(), skewX = this.getSkewX() % 360, skewY = this.getSkewY() % 360, center = this.getCenterPoint(), NUM_FRACTION_DIGITS = fabric.Object.NUM_FRACTION_DIGITS, translatePart = this.type === "path-group" ? "" : "translate(" + toFixed(center.x, NUM_FRACTION_DIGITS) + " " + toFixed(center.y, NUM_FRACTION_DIGITS) + ")", anglePart = angle !== 0 ? " rotate(" + toFixed(angle, NUM_FRACTION_DIGITS) + ")" : "", scalePart = this.scaleX === 1 && this.scaleY === 1 ? "" : " scale(" + toFixed(this.scaleX, NUM_FRACTION_DIGITS) + " " + toFixed(this.scaleY, NUM_FRACTION_DIGITS) + ")", skewXPart = skewX !== 0 ? " skewX(" + toFixed(skewX, NUM_FRACTION_DIGITS) + ")" : "", skewYPart = skewY !== 0 ? " skewY(" + toFixed(skewY, NUM_FRACTION_DIGITS) + ")" : "", addTranslateX = this.type === "path-group" ? this.width : 0, flipXPart = this.flipX ? " matrix(-1 0 0 1 " + addTranslateX + " 0) " : "", addTranslateY = this.type === "path-group" ? this.height : 0, flipYPart = this.flipY ? " matrix(1 0 0 -1 0 " + addTranslateY + ")" : "";
            return [ translatePart, anglePart, scalePart, flipXPart, flipYPart, skewXPart, skewYPart ].join("");
        },
        getSvgTransformMatrix: function() {
            return this.transformMatrix ? " matrix(" + this.transformMatrix.join(" ") + ") " : "";
        },
        _createBaseSVGMarkup: function() {
            var markup = [];
            if (this.fill && this.fill.toLive) {
                markup.push(this.fill.toSVG(this, false));
            }
            if (this.stroke && this.stroke.toLive) {
                markup.push(this.stroke.toSVG(this, false));
            }
            if (this.shadow) {
                markup.push(this.shadow.toSVG(this));
            }
            return markup;
        }
    });
})();

(function() {
    var extend = fabric.util.object.extend, originalSet = "stateProperties";
    function saveProps(origin, destination, props) {
        var tmpObj = {}, deep = true;
        props.forEach(function(prop) {
            tmpObj[prop] = origin[prop];
        });
        extend(origin[destination], tmpObj, deep);
    }
    function _isEqual(origValue, currentValue, firstPass) {
        if (origValue === currentValue) {
            return true;
        } else if (Array.isArray(origValue)) {
            if (origValue.length !== currentValue.length) {
                return false;
            }
            for (var i = 0, len = origValue.length; i < len; i++) {
                if (!_isEqual(origValue[i], currentValue[i])) {
                    return false;
                }
            }
            return true;
        } else if (origValue && typeof origValue === "object") {
            var keys = Object.keys(origValue), key;
            if (!firstPass && keys.length !== Object.keys(currentValue).length) {
                return false;
            }
            for (var i = 0, len = keys.length; i < len; i++) {
                key = keys[i];
                if (!_isEqual(origValue[key], currentValue[key])) {
                    return false;
                }
            }
            return true;
        }
    }
    fabric.util.object.extend(fabric.Object.prototype, {
        hasStateChanged: function(propertySet) {
            propertySet = propertySet || originalSet;
            var dashedPropertySet = "_" + propertySet;
            if (Object.keys(this[dashedPropertySet]).length < this[propertySet].length) {
                return true;
            }
            return !_isEqual(this[dashedPropertySet], this, true);
        },
        saveState: function(options) {
            var propertySet = options && options.propertySet || originalSet, destination = "_" + propertySet;
            if (!this[destination]) {
                return this.setupState(options);
            }
            saveProps(this, destination, this[propertySet]);
            if (options && options.stateProperties) {
                saveProps(this, destination, options.stateProperties);
            }
            return this;
        },
        setupState: function(options) {
            options = options || {};
            var propertySet = options.propertySet || originalSet;
            options.propertySet = propertySet;
            this["_" + propertySet] = {};
            this.saveState(options);
            return this;
        }
    });
})();

fabric.util.object.extend(fabric.StaticCanvas.prototype, {
    FX_DURATION: 500,
    fxCenterObjectH: function(object, callbacks) {
        callbacks = callbacks || {};
        var empty = function() {}, onComplete = callbacks.onComplete || empty, onChange = callbacks.onChange || empty, _this = this;
        fabric.util.animate({
            startValue: object.get("left"),
            endValue: this.getCenter().left,
            duration: this.FX_DURATION,
            onChange: function(value) {
                object.set("left", value);
                _this.renderAll();
                onChange();
            },
            onComplete: function() {
                object.setCoords();
                onComplete();
            }
        });
        return this;
    },
    fxCenterObjectV: function(object, callbacks) {
        callbacks = callbacks || {};
        var empty = function() {}, onComplete = callbacks.onComplete || empty, onChange = callbacks.onChange || empty, _this = this;
        fabric.util.animate({
            startValue: object.get("top"),
            endValue: this.getCenter().top,
            duration: this.FX_DURATION,
            onChange: function(value) {
                object.set("top", value);
                _this.renderAll();
                onChange();
            },
            onComplete: function() {
                object.setCoords();
                onComplete();
            }
        });
        return this;
    },
    fxRemove: function(object, callbacks) {
        callbacks = callbacks || {};
        var empty = function() {}, onComplete = callbacks.onComplete || empty, onChange = callbacks.onChange || empty, _this = this;
        fabric.util.animate({
            startValue: object.get("opacity"),
            endValue: 0,
            duration: this.FX_DURATION,
            onStart: function() {
                object.set("active", false);
            },
            onChange: function(value) {
                object.set("opacity", value);
                _this.renderAll();
                onChange();
            },
            onComplete: function() {
                _this.remove(object);
                onComplete();
            }
        });
        return this;
    }
});

fabric.util.object.extend(fabric.Object.prototype, {
    animate: function() {
        if (arguments[0] && typeof arguments[0] === "object") {
            var propsToAnimate = [], prop, skipCallbacks;
            for (prop in arguments[0]) {
                propsToAnimate.push(prop);
            }
            for (var i = 0, len = propsToAnimate.length; i < len; i++) {
                prop = propsToAnimate[i];
                skipCallbacks = i !== len - 1;
                this._animate(prop, arguments[0][prop], arguments[1], skipCallbacks);
            }
        } else {
            this._animate.apply(this, arguments);
        }
        return this;
    },
    _animate: function(property, to, options, skipCallbacks) {
        var _this = this, propPair;
        to = to.toString();
        if (!options) {
            options = {};
        } else {
            options = fabric.util.object.clone(options);
        }
        if (~property.indexOf(".")) {
            propPair = property.split(".");
        }
        var currentValue = propPair ? this.get(propPair[0])[propPair[1]] : this.get(property);
        if (!("from" in options)) {
            options.from = currentValue;
        }
        if (~to.indexOf("=")) {
            to = currentValue + parseFloat(to.replace("=", ""));
        } else {
            to = parseFloat(to);
        }
        fabric.util.animate({
            startValue: options.from,
            endValue: to,
            byValue: options.by,
            easing: options.easing,
            duration: options.duration,
            abort: options.abort && function() {
                return options.abort.call(_this);
            },
            onChange: function(value, valueProgress, timeProgress) {
                if (propPair) {
                    _this[propPair[0]][propPair[1]] = value;
                } else {
                    _this.set(property, value);
                }
                if (skipCallbacks) {
                    return;
                }
                options.onChange && options.onChange(value, valueProgress, timeProgress);
            },
            onComplete: function(value, valueProgress, timeProgress) {
                if (skipCallbacks) {
                    return;
                }
                _this.setCoords();
                options.onComplete && options.onComplete(value, valueProgress, timeProgress);
            }
        });
    }
});

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, clone = fabric.util.object.clone, coordProps = {
        x1: 1,
        x2: 1,
        y1: 1,
        y2: 1
    }, supportsLineDash = fabric.StaticCanvas.supports("setLineDash");
    if (fabric.Line) {
        fabric.warn("fabric.Line is already defined");
        return;
    }
    var cacheProperties = fabric.Object.prototype.cacheProperties.concat();
    cacheProperties.push("x1", "x2", "y1", "y2");
    fabric.Line = fabric.util.createClass(fabric.Object, {
        type: "line",
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        cacheProperties: cacheProperties,
        initialize: function(points, options) {
            if (!points) {
                points = [ 0, 0, 0, 0 ];
            }
            this.callSuper("initialize", options);
            this.set("x1", points[0]);
            this.set("y1", points[1]);
            this.set("x2", points[2]);
            this.set("y2", points[3]);
            this._setWidthHeight(options);
        },
        _setWidthHeight: function(options) {
            options || (options = {});
            this.width = Math.abs(this.x2 - this.x1);
            this.height = Math.abs(this.y2 - this.y1);
            this.left = "left" in options ? options.left : this._getLeftToOriginX();
            this.top = "top" in options ? options.top : this._getTopToOriginY();
        },
        _set: function(key, value) {
            this.callSuper("_set", key, value);
            if (typeof coordProps[key] !== "undefined") {
                this._setWidthHeight();
            }
            return this;
        },
        _getLeftToOriginX: makeEdgeToOriginGetter({
            origin: "originX",
            axis1: "x1",
            axis2: "x2",
            dimension: "width"
        }, {
            nearest: "left",
            center: "center",
            farthest: "right"
        }),
        _getTopToOriginY: makeEdgeToOriginGetter({
            origin: "originY",
            axis1: "y1",
            axis2: "y2",
            dimension: "height"
        }, {
            nearest: "top",
            center: "center",
            farthest: "bottom"
        }),
        _render: function(ctx, noTransform) {
            ctx.beginPath();
            if (noTransform) {
                var cp = this.getCenterPoint(), offset = this.strokeWidth / 2;
                ctx.translate(cp.x - (this.strokeLineCap === "butt" && this.height === 0 ? 0 : offset), cp.y - (this.strokeLineCap === "butt" && this.width === 0 ? 0 : offset));
            }
            if (!this.strokeDashArray || this.strokeDashArray && supportsLineDash) {
                var p = this.calcLinePoints();
                ctx.moveTo(p.x1, p.y1);
                ctx.lineTo(p.x2, p.y2);
            }
            ctx.lineWidth = this.strokeWidth;
            var origStrokeStyle = ctx.strokeStyle;
            ctx.strokeStyle = this.stroke || ctx.fillStyle;
            this.stroke && this._renderStroke(ctx);
            ctx.strokeStyle = origStrokeStyle;
        },
        _renderDashedStroke: function(ctx) {
            var p = this.calcLinePoints();
            ctx.beginPath();
            fabric.util.drawDashedLine(ctx, p.x1, p.y1, p.x2, p.y2, this.strokeDashArray);
            ctx.closePath();
        },
        toObject: function(propertiesToInclude) {
            return extend(this.callSuper("toObject", propertiesToInclude), this.calcLinePoints());
        },
        _getNonTransformedDimensions: function() {
            var dim = this.callSuper("_getNonTransformedDimensions");
            if (this.strokeLineCap === "butt") {
                if (this.width === 0) {
                    dim.y -= this.strokeWidth;
                }
                if (this.height === 0) {
                    dim.x -= this.strokeWidth;
                }
            }
            return dim;
        },
        calcLinePoints: function() {
            var xMult = this.x1 <= this.x2 ? -1 : 1, yMult = this.y1 <= this.y2 ? -1 : 1, x1 = xMult * this.width * .5, y1 = yMult * this.height * .5, x2 = xMult * this.width * -.5, y2 = yMult * this.height * -.5;
            return {
                x1: x1,
                x2: x2,
                y1: y1,
                y2: y2
            };
        },
        toSVG: function(reviver) {
            var markup = this._createBaseSVGMarkup(), p = {
                x1: this.x1,
                x2: this.x2,
                y1: this.y1,
                y2: this.y2
            };
            if (!(this.group && this.group.type === "path-group")) {
                p = this.calcLinePoints();
            }
            markup.push("<line ", this.getSvgId(), 'x1="', p.x1, '" y1="', p.y1, '" x2="', p.x2, '" y2="', p.y2, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n');
            return reviver ? reviver(markup.join("")) : markup.join("");
        }
    });
    fabric.Line.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat("x1 y1 x2 y2".split(" "));
    fabric.Line.fromElement = function(element, options) {
        options = options || {};
        var parsedAttributes = fabric.parseAttributes(element, fabric.Line.ATTRIBUTE_NAMES), points = [ parsedAttributes.x1 || 0, parsedAttributes.y1 || 0, parsedAttributes.x2 || 0, parsedAttributes.y2 || 0 ];
        options.originX = "left";
        options.originY = "top";
        return new fabric.Line(points, extend(parsedAttributes, options));
    };
    fabric.Line.fromObject = function(object, callback, forceAsync) {
        function _callback(instance) {
            delete instance.points;
            callback && callback(instance);
        }
        var options = clone(object, true);
        options.points = [ object.x1, object.y1, object.x2, object.y2 ];
        var line = fabric.Object._fromObject("Line", options, _callback, forceAsync, "points");
        if (line) {
            delete line.points;
        }
        return line;
    };
    function makeEdgeToOriginGetter(propertyNames, originValues) {
        var origin = propertyNames.origin, axis1 = propertyNames.axis1, axis2 = propertyNames.axis2, dimension = propertyNames.dimension, nearest = originValues.nearest, center = originValues.center, farthest = originValues.farthest;
        return function() {
            switch (this.get(origin)) {
              case nearest:
                return Math.min(this.get(axis1), this.get(axis2));

              case center:
                return Math.min(this.get(axis1), this.get(axis2)) + .5 * this.get(dimension);

              case farthest:
                return Math.max(this.get(axis1), this.get(axis2));
            }
        };
    }
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), pi = Math.PI, extend = fabric.util.object.extend;
    if (fabric.Circle) {
        fabric.warn("fabric.Circle is already defined.");
        return;
    }
    var cacheProperties = fabric.Object.prototype.cacheProperties.concat();
    cacheProperties.push("radius");
    fabric.Circle = fabric.util.createClass(fabric.Object, {
        type: "circle",
        radius: 0,
        startAngle: 0,
        endAngle: pi * 2,
        cacheProperties: cacheProperties,
        initialize: function(options) {
            this.callSuper("initialize", options);
            this.set("radius", options && options.radius || 0);
        },
        _set: function(key, value) {
            this.callSuper("_set", key, value);
            if (key === "radius") {
                this.setRadius(value);
            }
            return this;
        },
        toObject: function(propertiesToInclude) {
            return this.callSuper("toObject", [ "radius", "startAngle", "endAngle" ].concat(propertiesToInclude));
        },
        toSVG: function(reviver) {
            var markup = this._createBaseSVGMarkup(), x = 0, y = 0, angle = (this.endAngle - this.startAngle) % (2 * pi);
            if (angle === 0) {
                if (this.group && this.group.type === "path-group") {
                    x = this.left + this.radius;
                    y = this.top + this.radius;
                }
                markup.push("<circle ", this.getSvgId(), 'cx="' + x + '" cy="' + y + '" ', 'r="', this.radius, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"/>\n');
            } else {
                var startX = Math.cos(this.startAngle) * this.radius, startY = Math.sin(this.startAngle) * this.radius, endX = Math.cos(this.endAngle) * this.radius, endY = Math.sin(this.endAngle) * this.radius, largeFlag = angle > pi ? "1" : "0";
                markup.push('<path d="M ' + startX + " " + startY, " A " + this.radius + " " + this.radius, " 0 ", +largeFlag + " 1", " " + endX + " " + endY, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"/>\n');
            }
            return reviver ? reviver(markup.join("")) : markup.join("");
        },
        _render: function(ctx, noTransform) {
            ctx.beginPath();
            ctx.arc(noTransform ? this.left + this.radius : 0, noTransform ? this.top + this.radius : 0, this.radius, this.startAngle, this.endAngle, false);
            this._renderFill(ctx);
            this._renderStroke(ctx);
        },
        getRadiusX: function() {
            return this.get("radius") * this.get("scaleX");
        },
        getRadiusY: function() {
            return this.get("radius") * this.get("scaleY");
        },
        setRadius: function(value) {
            this.radius = value;
            return this.set("width", value * 2).set("height", value * 2);
        }
    });
    fabric.Circle.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat("cx cy r".split(" "));
    fabric.Circle.fromElement = function(element, options) {
        options || (options = {});
        var parsedAttributes = fabric.parseAttributes(element, fabric.Circle.ATTRIBUTE_NAMES);
        if (!isValidRadius(parsedAttributes)) {
            throw new Error("value of `r` attribute is required and can not be negative");
        }
        parsedAttributes.left = parsedAttributes.left || 0;
        parsedAttributes.top = parsedAttributes.top || 0;
        var obj = new fabric.Circle(extend(parsedAttributes, options));
        obj.left -= obj.radius;
        obj.top -= obj.radius;
        return obj;
    };
    function isValidRadius(attributes) {
        return "radius" in attributes && attributes.radius >= 0;
    }
    fabric.Circle.fromObject = function(object, callback, forceAsync) {
        return fabric.Object._fromObject("Circle", object, callback, forceAsync);
    };
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {});
    if (fabric.Triangle) {
        fabric.warn("fabric.Triangle is already defined");
        return;
    }
    fabric.Triangle = fabric.util.createClass(fabric.Object, {
        type: "triangle",
        initialize: function(options) {
            this.callSuper("initialize", options);
            this.set("width", options && options.width || 100).set("height", options && options.height || 100);
        },
        _render: function(ctx) {
            var widthBy2 = this.width / 2, heightBy2 = this.height / 2;
            ctx.beginPath();
            ctx.moveTo(-widthBy2, heightBy2);
            ctx.lineTo(0, -heightBy2);
            ctx.lineTo(widthBy2, heightBy2);
            ctx.closePath();
            this._renderFill(ctx);
            this._renderStroke(ctx);
        },
        _renderDashedStroke: function(ctx) {
            var widthBy2 = this.width / 2, heightBy2 = this.height / 2;
            ctx.beginPath();
            fabric.util.drawDashedLine(ctx, -widthBy2, heightBy2, 0, -heightBy2, this.strokeDashArray);
            fabric.util.drawDashedLine(ctx, 0, -heightBy2, widthBy2, heightBy2, this.strokeDashArray);
            fabric.util.drawDashedLine(ctx, widthBy2, heightBy2, -widthBy2, heightBy2, this.strokeDashArray);
            ctx.closePath();
        },
        toSVG: function(reviver) {
            var markup = this._createBaseSVGMarkup(), widthBy2 = this.width / 2, heightBy2 = this.height / 2, points = [ -widthBy2 + " " + heightBy2, "0 " + -heightBy2, widthBy2 + " " + heightBy2 ].join(",");
            markup.push("<polygon ", this.getSvgId(), 'points="', points, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>');
            return reviver ? reviver(markup.join("")) : markup.join("");
        }
    });
    fabric.Triangle.fromObject = function(object, callback, forceAsync) {
        return fabric.Object._fromObject("Triangle", object, callback, forceAsync);
    };
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), piBy2 = Math.PI * 2, extend = fabric.util.object.extend;
    if (fabric.Ellipse) {
        fabric.warn("fabric.Ellipse is already defined.");
        return;
    }
    var cacheProperties = fabric.Object.prototype.cacheProperties.concat();
    cacheProperties.push("rx", "ry");
    fabric.Ellipse = fabric.util.createClass(fabric.Object, {
        type: "ellipse",
        rx: 0,
        ry: 0,
        cacheProperties: cacheProperties,
        initialize: function(options) {
            this.callSuper("initialize", options);
            this.set("rx", options && options.rx || 0);
            this.set("ry", options && options.ry || 0);
        },
        _set: function(key, value) {
            this.callSuper("_set", key, value);
            switch (key) {
              case "rx":
                this.rx = value;
                this.set("width", value * 2);
                break;

              case "ry":
                this.ry = value;
                this.set("height", value * 2);
                break;
            }
            return this;
        },
        getRx: function() {
            return this.get("rx") * this.get("scaleX");
        },
        getRy: function() {
            return this.get("ry") * this.get("scaleY");
        },
        toObject: function(propertiesToInclude) {
            return this.callSuper("toObject", [ "rx", "ry" ].concat(propertiesToInclude));
        },
        toSVG: function(reviver) {
            var markup = this._createBaseSVGMarkup(), x = 0, y = 0;
            if (this.group && this.group.type === "path-group") {
                x = this.left + this.rx;
                y = this.top + this.ry;
            }
            markup.push("<ellipse ", this.getSvgId(), 'cx="', x, '" cy="', y, '" ', 'rx="', this.rx, '" ry="', this.ry, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n');
            return reviver ? reviver(markup.join("")) : markup.join("");
        },
        _render: function(ctx, noTransform) {
            ctx.beginPath();
            ctx.save();
            ctx.transform(1, 0, 0, this.ry / this.rx, 0, 0);
            ctx.arc(noTransform ? this.left + this.rx : 0, noTransform ? (this.top + this.ry) * this.rx / this.ry : 0, this.rx, 0, piBy2, false);
            ctx.restore();
            this._renderFill(ctx);
            this._renderStroke(ctx);
        }
    });
    fabric.Ellipse.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" "));
    fabric.Ellipse.fromElement = function(element, options) {
        options || (options = {});
        var parsedAttributes = fabric.parseAttributes(element, fabric.Ellipse.ATTRIBUTE_NAMES);
        parsedAttributes.left = parsedAttributes.left || 0;
        parsedAttributes.top = parsedAttributes.top || 0;
        var ellipse = new fabric.Ellipse(extend(parsedAttributes, options));
        ellipse.top -= ellipse.ry;
        ellipse.left -= ellipse.rx;
        return ellipse;
    };
    fabric.Ellipse.fromObject = function(object, callback, forceAsync) {
        return fabric.Object._fromObject("Ellipse", object, callback, forceAsync);
    };
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend;
    if (fabric.Rect) {
        fabric.warn("fabric.Rect is already defined");
        return;
    }
    var stateProperties = fabric.Object.prototype.stateProperties.concat();
    stateProperties.push("rx", "ry");
    var cacheProperties = fabric.Object.prototype.cacheProperties.concat();
    cacheProperties.push("rx", "ry");
    fabric.Rect = fabric.util.createClass(fabric.Object, {
        stateProperties: stateProperties,
        type: "rect",
        rx: 0,
        ry: 0,
        cacheProperties: cacheProperties,
        initialize: function(options) {
            this.callSuper("initialize", options);
            this._initRxRy();
        },
        _initRxRy: function() {
            if (this.rx && !this.ry) {
                this.ry = this.rx;
            } else if (this.ry && !this.rx) {
                this.rx = this.ry;
            }
        },
        _render: function(ctx, noTransform) {
            if (this.width === 1 && this.height === 1) {
                ctx.fillRect(-.5, -.5, 1, 1);
                return;
            }
            var rx = this.rx ? Math.min(this.rx, this.width / 2) : 0, ry = this.ry ? Math.min(this.ry, this.height / 2) : 0, w = this.width, h = this.height, x = noTransform ? this.left : -this.width / 2, y = noTransform ? this.top : -this.height / 2, isRounded = rx !== 0 || ry !== 0, k = 1 - .5522847498;
            ctx.beginPath();
            ctx.moveTo(x + rx, y);
            ctx.lineTo(x + w - rx, y);
            isRounded && ctx.bezierCurveTo(x + w - k * rx, y, x + w, y + k * ry, x + w, y + ry);
            ctx.lineTo(x + w, y + h - ry);
            isRounded && ctx.bezierCurveTo(x + w, y + h - k * ry, x + w - k * rx, y + h, x + w - rx, y + h);
            ctx.lineTo(x + rx, y + h);
            isRounded && ctx.bezierCurveTo(x + k * rx, y + h, x, y + h - k * ry, x, y + h - ry);
            ctx.lineTo(x, y + ry);
            isRounded && ctx.bezierCurveTo(x, y + k * ry, x + k * rx, y, x + rx, y);
            ctx.closePath();
            this._renderFill(ctx);
            this._renderStroke(ctx);
        },
        _renderDashedStroke: function(ctx) {
            var x = -this.width / 2, y = -this.height / 2, w = this.width, h = this.height;
            ctx.beginPath();
            fabric.util.drawDashedLine(ctx, x, y, x + w, y, this.strokeDashArray);
            fabric.util.drawDashedLine(ctx, x + w, y, x + w, y + h, this.strokeDashArray);
            fabric.util.drawDashedLine(ctx, x + w, y + h, x, y + h, this.strokeDashArray);
            fabric.util.drawDashedLine(ctx, x, y + h, x, y, this.strokeDashArray);
            ctx.closePath();
        },
        toObject: function(propertiesToInclude) {
            return this.callSuper("toObject", [ "rx", "ry" ].concat(propertiesToInclude));
        },
        toSVG: function(reviver) {
            var markup = this._createBaseSVGMarkup(), x = this.left, y = this.top;
            if (!(this.group && this.group.type === "path-group")) {
                x = -this.width / 2;
                y = -this.height / 2;
            }
            markup.push("<rect ", this.getSvgId(), 'x="', x, '" y="', y, '" rx="', this.get("rx"), '" ry="', this.get("ry"), '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n');
            return reviver ? reviver(markup.join("")) : markup.join("");
        }
    });
    fabric.Rect.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat("x y rx ry width height".split(" "));
    fabric.Rect.fromElement = function(element, options) {
        if (!element) {
            return null;
        }
        options = options || {};
        var parsedAttributes = fabric.parseAttributes(element, fabric.Rect.ATTRIBUTE_NAMES);
        parsedAttributes.left = parsedAttributes.left || 0;
        parsedAttributes.top = parsedAttributes.top || 0;
        var rect = new fabric.Rect(extend(options ? fabric.util.object.clone(options) : {}, parsedAttributes));
        rect.visible = rect.visible && rect.width > 0 && rect.height > 0;
        return rect;
    };
    fabric.Rect.fromObject = function(object, callback, forceAsync) {
        return fabric.Object._fromObject("Rect", object, callback, forceAsync);
    };
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, min = fabric.util.array.min, max = fabric.util.array.max, toFixed = fabric.util.toFixed, NUM_FRACTION_DIGITS = fabric.Object.NUM_FRACTION_DIGITS;
    if (fabric.Polyline) {
        fabric.warn("fabric.Polyline is already defined");
        return;
    }
    var cacheProperties = fabric.Object.prototype.cacheProperties.concat();
    cacheProperties.push("points");
    fabric.Polyline = fabric.util.createClass(fabric.Object, {
        type: "polyline",
        points: null,
        minX: 0,
        minY: 0,
        cacheProperties: cacheProperties,
        initialize: function(points, options) {
            options = options || {};
            this.points = points || [];
            this.callSuper("initialize", options);
            this._calcDimensions();
            if (!("top" in options)) {
                this.top = this.minY;
            }
            if (!("left" in options)) {
                this.left = this.minX;
            }
            this.pathOffset = {
                x: this.minX + this.width / 2,
                y: this.minY + this.height / 2
            };
        },
        _calcDimensions: function() {
            var points = this.points, minX = min(points, "x"), minY = min(points, "y"), maxX = max(points, "x"), maxY = max(points, "y");
            this.width = maxX - minX || 0;
            this.height = maxY - minY || 0;
            this.minX = minX || 0;
            this.minY = minY || 0;
        },
        toObject: function(propertiesToInclude) {
            return extend(this.callSuper("toObject", propertiesToInclude), {
                points: this.points.concat()
            });
        },
        toSVG: function(reviver) {
            var points = [], diffX = 0, diffY = 0, markup = this._createBaseSVGMarkup();
            if (!(this.group && this.group.type === "path-group")) {
                diffX = this.pathOffset.x;
                diffY = this.pathOffset.y;
            }
            for (var i = 0, len = this.points.length; i < len; i++) {
                points.push(toFixed(this.points[i].x - diffX, NUM_FRACTION_DIGITS), ",", toFixed(this.points[i].y - diffY, NUM_FRACTION_DIGITS), " ");
            }
            markup.push("<", this.type, " ", this.getSvgId(), 'points="', points.join(""), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"/>\n');
            return reviver ? reviver(markup.join("")) : markup.join("");
        },
        commonRender: function(ctx, noTransform) {
            var point, len = this.points.length, x = noTransform ? 0 : this.pathOffset.x, y = noTransform ? 0 : this.pathOffset.y;
            if (!len || isNaN(this.points[len - 1].y)) {
                return false;
            }
            ctx.beginPath();
            ctx.moveTo(this.points[0].x - x, this.points[0].y - y);
            for (var i = 0; i < len; i++) {
                point = this.points[i];
                ctx.lineTo(point.x - x, point.y - y);
            }
            return true;
        },
        _render: function(ctx, noTransform) {
            if (!this.commonRender(ctx, noTransform)) {
                return;
            }
            this._renderFill(ctx);
            this._renderStroke(ctx);
        },
        _renderDashedStroke: function(ctx) {
            var p1, p2;
            ctx.beginPath();
            for (var i = 0, len = this.points.length; i < len; i++) {
                p1 = this.points[i];
                p2 = this.points[i + 1] || p1;
                fabric.util.drawDashedLine(ctx, p1.x, p1.y, p2.x, p2.y, this.strokeDashArray);
            }
        },
        complexity: function() {
            return this.get("points").length;
        }
    });
    fabric.Polyline.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat();
    fabric.Polyline.fromElement = function(element, options) {
        if (!element) {
            return null;
        }
        options || (options = {});
        var points = fabric.parsePointsAttribute(element.getAttribute("points")), parsedAttributes = fabric.parseAttributes(element, fabric.Polyline.ATTRIBUTE_NAMES);
        return new fabric.Polyline(points, fabric.util.object.extend(parsedAttributes, options));
    };
    fabric.Polyline.fromObject = function(object, callback, forceAsync) {
        return fabric.Object._fromObject("Polyline", object, callback, forceAsync, "points");
    };
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend;
    if (fabric.Polygon) {
        fabric.warn("fabric.Polygon is already defined");
        return;
    }
    fabric.Polygon = fabric.util.createClass(fabric.Polyline, {
        type: "polygon",
        _render: function(ctx, noTransform) {
            if (!this.commonRender(ctx, noTransform)) {
                return;
            }
            ctx.closePath();
            this._renderFill(ctx);
            this._renderStroke(ctx);
        },
        _renderDashedStroke: function(ctx) {
            this.callSuper("_renderDashedStroke", ctx);
            ctx.closePath();
        }
    });
    fabric.Polygon.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat();
    fabric.Polygon.fromElement = function(element, options) {
        if (!element) {
            return null;
        }
        options || (options = {});
        var points = fabric.parsePointsAttribute(element.getAttribute("points")), parsedAttributes = fabric.parseAttributes(element, fabric.Polygon.ATTRIBUTE_NAMES);
        return new fabric.Polygon(points, extend(parsedAttributes, options));
    };
    fabric.Polygon.fromObject = function(object, callback, forceAsync) {
        return fabric.Object._fromObject("Polygon", object, callback, forceAsync, "points");
    };
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), min = fabric.util.array.min, max = fabric.util.array.max, extend = fabric.util.object.extend, _toString = Object.prototype.toString, drawArc = fabric.util.drawArc, commandLengths = {
        m: 2,
        l: 2,
        h: 1,
        v: 1,
        c: 6,
        s: 4,
        q: 4,
        t: 2,
        a: 7
    }, repeatedCommands = {
        m: "l",
        M: "L"
    };
    if (fabric.Path) {
        fabric.warn("fabric.Path is already defined");
        return;
    }
    var stateProperties = fabric.Object.prototype.stateProperties.concat();
    stateProperties.push("path");
    var cacheProperties = fabric.Object.prototype.cacheProperties.concat();
    cacheProperties.push("path", "fillRule");
    fabric.Path = fabric.util.createClass(fabric.Object, {
        type: "path",
        path: null,
        minX: 0,
        minY: 0,
        cacheProperties: cacheProperties,
        stateProperties: stateProperties,
        initialize: function(path, options) {
            options = options || {};
            this.callSuper("initialize", options);
            if (!path) {
                path = [];
            }
            var fromArray = _toString.call(path) === "[object Array]";
            this.path = fromArray ? path : path.match && path.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi);
            if (!this.path) {
                return;
            }
            if (!fromArray) {
                this.path = this._parsePath();
            }
            this._setPositionDimensions(options);
        },
        _setPositionDimensions: function(options) {
            var calcDim = this._parseDimensions();
            this.minX = calcDim.left;
            this.minY = calcDim.top;
            this.width = calcDim.width;
            this.height = calcDim.height;
            if (typeof options.left === "undefined") {
                this.left = calcDim.left + (this.originX === "center" ? this.width / 2 : this.originX === "right" ? this.width : 0);
            }
            if (typeof options.top === "undefined") {
                this.top = calcDim.top + (this.originY === "center" ? this.height / 2 : this.originY === "bottom" ? this.height : 0);
            }
            this.pathOffset = this.pathOffset || {
                x: this.minX + this.width / 2,
                y: this.minY + this.height / 2
            };
        },
        _renderPathCommands: function(ctx) {
            var current, previous = null, subpathStartX = 0, subpathStartY = 0, x = 0, y = 0, controlX = 0, controlY = 0, tempX, tempY, l = -this.pathOffset.x, t = -this.pathOffset.y;
            if (this.group && this.group.type === "path-group") {
                l = 0;
                t = 0;
            }
            ctx.beginPath();
            for (var i = 0, len = this.path.length; i < len; ++i) {
                current = this.path[i];
                switch (current[0]) {
                  case "l":
                    x += current[1];
                    y += current[2];
                    ctx.lineTo(x + l, y + t);
                    break;

                  case "L":
                    x = current[1];
                    y = current[2];
                    ctx.lineTo(x + l, y + t);
                    break;

                  case "h":
                    x += current[1];
                    ctx.lineTo(x + l, y + t);
                    break;

                  case "H":
                    x = current[1];
                    ctx.lineTo(x + l, y + t);
                    break;

                  case "v":
                    y += current[1];
                    ctx.lineTo(x + l, y + t);
                    break;

                  case "V":
                    y = current[1];
                    ctx.lineTo(x + l, y + t);
                    break;

                  case "m":
                    x += current[1];
                    y += current[2];
                    subpathStartX = x;
                    subpathStartY = y;
                    ctx.moveTo(x + l, y + t);
                    break;

                  case "M":
                    x = current[1];
                    y = current[2];
                    subpathStartX = x;
                    subpathStartY = y;
                    ctx.moveTo(x + l, y + t);
                    break;

                  case "c":
                    tempX = x + current[5];
                    tempY = y + current[6];
                    controlX = x + current[3];
                    controlY = y + current[4];
                    ctx.bezierCurveTo(x + current[1] + l, y + current[2] + t, controlX + l, controlY + t, tempX + l, tempY + t);
                    x = tempX;
                    y = tempY;
                    break;

                  case "C":
                    x = current[5];
                    y = current[6];
                    controlX = current[3];
                    controlY = current[4];
                    ctx.bezierCurveTo(current[1] + l, current[2] + t, controlX + l, controlY + t, x + l, y + t);
                    break;

                  case "s":
                    tempX = x + current[3];
                    tempY = y + current[4];
                    if (previous[0].match(/[CcSs]/) === null) {
                        controlX = x;
                        controlY = y;
                    } else {
                        controlX = 2 * x - controlX;
                        controlY = 2 * y - controlY;
                    }
                    ctx.bezierCurveTo(controlX + l, controlY + t, x + current[1] + l, y + current[2] + t, tempX + l, tempY + t);
                    controlX = x + current[1];
                    controlY = y + current[2];
                    x = tempX;
                    y = tempY;
                    break;

                  case "S":
                    tempX = current[3];
                    tempY = current[4];
                    if (previous[0].match(/[CcSs]/) === null) {
                        controlX = x;
                        controlY = y;
                    } else {
                        controlX = 2 * x - controlX;
                        controlY = 2 * y - controlY;
                    }
                    ctx.bezierCurveTo(controlX + l, controlY + t, current[1] + l, current[2] + t, tempX + l, tempY + t);
                    x = tempX;
                    y = tempY;
                    controlX = current[1];
                    controlY = current[2];
                    break;

                  case "q":
                    tempX = x + current[3];
                    tempY = y + current[4];
                    controlX = x + current[1];
                    controlY = y + current[2];
                    ctx.quadraticCurveTo(controlX + l, controlY + t, tempX + l, tempY + t);
                    x = tempX;
                    y = tempY;
                    break;

                  case "Q":
                    tempX = current[3];
                    tempY = current[4];
                    ctx.quadraticCurveTo(current[1] + l, current[2] + t, tempX + l, tempY + t);
                    x = tempX;
                    y = tempY;
                    controlX = current[1];
                    controlY = current[2];
                    break;

                  case "t":
                    tempX = x + current[1];
                    tempY = y + current[2];
                    if (previous[0].match(/[QqTt]/) === null) {
                        controlX = x;
                        controlY = y;
                    } else {
                        controlX = 2 * x - controlX;
                        controlY = 2 * y - controlY;
                    }
                    ctx.quadraticCurveTo(controlX + l, controlY + t, tempX + l, tempY + t);
                    x = tempX;
                    y = tempY;
                    break;

                  case "T":
                    tempX = current[1];
                    tempY = current[2];
                    if (previous[0].match(/[QqTt]/) === null) {
                        controlX = x;
                        controlY = y;
                    } else {
                        controlX = 2 * x - controlX;
                        controlY = 2 * y - controlY;
                    }
                    ctx.quadraticCurveTo(controlX + l, controlY + t, tempX + l, tempY + t);
                    x = tempX;
                    y = tempY;
                    break;

                  case "a":
                    drawArc(ctx, x + l, y + t, [ current[1], current[2], current[3], current[4], current[5], current[6] + x + l, current[7] + y + t ]);
                    x += current[6];
                    y += current[7];
                    break;

                  case "A":
                    drawArc(ctx, x + l, y + t, [ current[1], current[2], current[3], current[4], current[5], current[6] + l, current[7] + t ]);
                    x = current[6];
                    y = current[7];
                    break;

                  case "z":
                  case "Z":
                    x = subpathStartX;
                    y = subpathStartY;
                    ctx.closePath();
                    break;
                }
                previous = current;
            }
        },
        _render: function(ctx) {
            this._renderPathCommands(ctx);
            this._renderFill(ctx);
            this._renderStroke(ctx);
        },
        toString: function() {
            return "#<fabric.Path (" + this.complexity() + '): { "top": ' + this.top + ', "left": ' + this.left + " }>";
        },
        toObject: function(propertiesToInclude) {
            var o = extend(this.callSuper("toObject", [ "sourcePath", "pathOffset" ].concat(propertiesToInclude)), {
                path: this.path.map(function(item) {
                    return item.slice();
                }),
                top: this.top,
                left: this.left
            });
            return o;
        },
        toDatalessObject: function(propertiesToInclude) {
            var o = this.toObject(propertiesToInclude);
            if (this.sourcePath) {
                o.path = this.sourcePath;
            }
            delete o.sourcePath;
            return o;
        },
        toSVG: function(reviver) {
            var chunks = [], markup = this._createBaseSVGMarkup(), addTransform = "";
            for (var i = 0, len = this.path.length; i < len; i++) {
                chunks.push(this.path[i].join(" "));
            }
            var path = chunks.join(" ");
            if (!(this.group && this.group.type === "path-group")) {
                addTransform = " translate(" + -this.pathOffset.x + ", " + -this.pathOffset.y + ") ";
            }
            markup.push("<path ", this.getSvgId(), 'd="', path, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), addTransform, this.getSvgTransformMatrix(), '" stroke-linecap="round" ', "/>\n");
            return reviver ? reviver(markup.join("")) : markup.join("");
        },
        complexity: function() {
            return this.path.length;
        },
        _parsePath: function() {
            var result = [], coords = [], currentPath, parsed, re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi, match, coordsStr;
            for (var i = 0, coordsParsed, len = this.path.length; i < len; i++) {
                currentPath = this.path[i];
                coordsStr = currentPath.slice(1).trim();
                coords.length = 0;
                while (match = re.exec(coordsStr)) {
                    coords.push(match[0]);
                }
                coordsParsed = [ currentPath.charAt(0) ];
                for (var j = 0, jlen = coords.length; j < jlen; j++) {
                    parsed = parseFloat(coords[j]);
                    if (!isNaN(parsed)) {
                        coordsParsed.push(parsed);
                    }
                }
                var command = coordsParsed[0], commandLength = commandLengths[command.toLowerCase()], repeatedCommand = repeatedCommands[command] || command;
                if (coordsParsed.length - 1 > commandLength) {
                    for (var k = 1, klen = coordsParsed.length; k < klen; k += commandLength) {
                        result.push([ command ].concat(coordsParsed.slice(k, k + commandLength)));
                        command = repeatedCommand;
                    }
                } else {
                    result.push(coordsParsed);
                }
            }
            return result;
        },
        _parseDimensions: function() {
            var aX = [], aY = [], current, previous = null, subpathStartX = 0, subpathStartY = 0, x = 0, y = 0, controlX = 0, controlY = 0, tempX, tempY, bounds;
            for (var i = 0, len = this.path.length; i < len; ++i) {
                current = this.path[i];
                switch (current[0]) {
                  case "l":
                    x += current[1];
                    y += current[2];
                    bounds = [];
                    break;

                  case "L":
                    x = current[1];
                    y = current[2];
                    bounds = [];
                    break;

                  case "h":
                    x += current[1];
                    bounds = [];
                    break;

                  case "H":
                    x = current[1];
                    bounds = [];
                    break;

                  case "v":
                    y += current[1];
                    bounds = [];
                    break;

                  case "V":
                    y = current[1];
                    bounds = [];
                    break;

                  case "m":
                    x += current[1];
                    y += current[2];
                    subpathStartX = x;
                    subpathStartY = y;
                    bounds = [];
                    break;

                  case "M":
                    x = current[1];
                    y = current[2];
                    subpathStartX = x;
                    subpathStartY = y;
                    bounds = [];
                    break;

                  case "c":
                    tempX = x + current[5];
                    tempY = y + current[6];
                    controlX = x + current[3];
                    controlY = y + current[4];
                    bounds = fabric.util.getBoundsOfCurve(x, y, x + current[1], y + current[2], controlX, controlY, tempX, tempY);
                    x = tempX;
                    y = tempY;
                    break;

                  case "C":
                    controlX = current[3];
                    controlY = current[4];
                    bounds = fabric.util.getBoundsOfCurve(x, y, current[1], current[2], controlX, controlY, current[5], current[6]);
                    x = current[5];
                    y = current[6];
                    break;

                  case "s":
                    tempX = x + current[3];
                    tempY = y + current[4];
                    if (previous[0].match(/[CcSs]/) === null) {
                        controlX = x;
                        controlY = y;
                    } else {
                        controlX = 2 * x - controlX;
                        controlY = 2 * y - controlY;
                    }
                    bounds = fabric.util.getBoundsOfCurve(x, y, controlX, controlY, x + current[1], y + current[2], tempX, tempY);
                    controlX = x + current[1];
                    controlY = y + current[2];
                    x = tempX;
                    y = tempY;
                    break;

                  case "S":
                    tempX = current[3];
                    tempY = current[4];
                    if (previous[0].match(/[CcSs]/) === null) {
                        controlX = x;
                        controlY = y;
                    } else {
                        controlX = 2 * x - controlX;
                        controlY = 2 * y - controlY;
                    }
                    bounds = fabric.util.getBoundsOfCurve(x, y, controlX, controlY, current[1], current[2], tempX, tempY);
                    x = tempX;
                    y = tempY;
                    controlX = current[1];
                    controlY = current[2];
                    break;

                  case "q":
                    tempX = x + current[3];
                    tempY = y + current[4];
                    controlX = x + current[1];
                    controlY = y + current[2];
                    bounds = fabric.util.getBoundsOfCurve(x, y, controlX, controlY, controlX, controlY, tempX, tempY);
                    x = tempX;
                    y = tempY;
                    break;

                  case "Q":
                    controlX = current[1];
                    controlY = current[2];
                    bounds = fabric.util.getBoundsOfCurve(x, y, controlX, controlY, controlX, controlY, current[3], current[4]);
                    x = current[3];
                    y = current[4];
                    break;

                  case "t":
                    tempX = x + current[1];
                    tempY = y + current[2];
                    if (previous[0].match(/[QqTt]/) === null) {
                        controlX = x;
                        controlY = y;
                    } else {
                        controlX = 2 * x - controlX;
                        controlY = 2 * y - controlY;
                    }
                    bounds = fabric.util.getBoundsOfCurve(x, y, controlX, controlY, controlX, controlY, tempX, tempY);
                    x = tempX;
                    y = tempY;
                    break;

                  case "T":
                    tempX = current[1];
                    tempY = current[2];
                    if (previous[0].match(/[QqTt]/) === null) {
                        controlX = x;
                        controlY = y;
                    } else {
                        controlX = 2 * x - controlX;
                        controlY = 2 * y - controlY;
                    }
                    bounds = fabric.util.getBoundsOfCurve(x, y, controlX, controlY, controlX, controlY, tempX, tempY);
                    x = tempX;
                    y = tempY;
                    break;

                  case "a":
                    bounds = fabric.util.getBoundsOfArc(x, y, current[1], current[2], current[3], current[4], current[5], current[6] + x, current[7] + y);
                    x += current[6];
                    y += current[7];
                    break;

                  case "A":
                    bounds = fabric.util.getBoundsOfArc(x, y, current[1], current[2], current[3], current[4], current[5], current[6], current[7]);
                    x = current[6];
                    y = current[7];
                    break;

                  case "z":
                  case "Z":
                    x = subpathStartX;
                    y = subpathStartY;
                    break;
                }
                previous = current;
                bounds.forEach(function(point) {
                    aX.push(point.x);
                    aY.push(point.y);
                });
                aX.push(x);
                aY.push(y);
            }
            var minX = min(aX) || 0, minY = min(aY) || 0, maxX = max(aX) || 0, maxY = max(aY) || 0, deltaX = maxX - minX, deltaY = maxY - minY, o = {
                left: minX,
                top: minY,
                width: deltaX,
                height: deltaY
            };
            return o;
        }
    });
    fabric.Path.fromObject = function(object, callback, forceAsync) {
        var path;
        if (typeof object.path === "string") {
            fabric.loadSVGFromURL(object.path, function(elements) {
                var pathUrl = object.path;
                path = elements[0];
                delete object.path;
                path.setOptions(object);
                path.setSourcePath(pathUrl);
                callback && callback(path);
            });
        } else {
            return fabric.Object._fromObject("Path", object, callback, forceAsync, "path");
        }
    };
    fabric.Path.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat([ "d" ]);
    fabric.Path.fromElement = function(element, callback, options) {
        var parsedAttributes = fabric.parseAttributes(element, fabric.Path.ATTRIBUTE_NAMES);
        callback && callback(new fabric.Path(parsedAttributes.d, extend(parsedAttributes, options)));
    };
    fabric.Path.async = true;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend;
    if (fabric.PathGroup) {
        fabric.warn("fabric.PathGroup is already defined");
        return;
    }
    fabric.PathGroup = fabric.util.createClass(fabric.Object, {
        type: "path-group",
        fill: "",
        cacheProperties: [],
        initialize: function(paths, options) {
            options = options || {};
            this.paths = paths || [];
            for (var i = this.paths.length; i--; ) {
                this.paths[i].group = this;
            }
            if (options.toBeParsed) {
                this.parseDimensionsFromPaths(options);
                delete options.toBeParsed;
            }
            this.setOptions(options);
            this.setCoords();
        },
        parseDimensionsFromPaths: function(options) {
            var points, p, xC = [], yC = [], path, height, width, m;
            for (var j = this.paths.length; j--; ) {
                path = this.paths[j];
                height = path.height + path.strokeWidth;
                width = path.width + path.strokeWidth;
                points = [ {
                    x: path.left,
                    y: path.top
                }, {
                    x: path.left + width,
                    y: path.top
                }, {
                    x: path.left,
                    y: path.top + height
                }, {
                    x: path.left + width,
                    y: path.top + height
                } ];
                m = this.paths[j].transformMatrix;
                for (var i = 0; i < points.length; i++) {
                    p = points[i];
                    if (m) {
                        p = fabric.util.transformPoint(p, m, false);
                    }
                    xC.push(p.x);
                    yC.push(p.y);
                }
            }
            options.width = Math.max.apply(null, xC);
            options.height = Math.max.apply(null, yC);
        },
        drawObject: function(ctx) {
            ctx.save();
            ctx.translate(-this.width / 2, -this.height / 2);
            for (var i = 0, l = this.paths.length; i < l; ++i) {
                this.paths[i].render(ctx, true);
            }
            ctx.restore();
        },
        shouldCache: function() {
            var parentCache = this.objectCaching && (!this.group || this.needsItsOwnCache() || !this.group.isCaching());
            this.caching = parentCache;
            if (parentCache) {
                for (var i = 0, len = this.paths.length; i < len; i++) {
                    if (this.paths[i].willDrawShadow()) {
                        this.caching = false;
                        return false;
                    }
                }
            }
            return parentCache;
        },
        willDrawShadow: function() {
            if (this.shadow) {
                return true;
            }
            for (var i = 0, len = this.paths.length; i < len; i++) {
                if (this.paths[i].willDrawShadow()) {
                    return true;
                }
            }
            return false;
        },
        isCaching: function() {
            return this.caching || this.group && this.group.isCaching();
        },
        isCacheDirty: function() {
            if (this.callSuper("isCacheDirty")) {
                return true;
            }
            if (!this.statefullCache) {
                return false;
            }
            for (var i = 0, len = this.paths.length; i < len; i++) {
                if (this.paths[i].isCacheDirty(true)) {
                    if (this._cacheCanvas) {
                        var x = this.cacheWidth / this.zoomX, y = this.cacheHeight / this.zoomY;
                        this._cacheContext.clearRect(-x / 2, -y / 2, x, y);
                    }
                    return true;
                }
            }
            return false;
        },
        _set: function(prop, value) {
            if (prop === "fill" && value && this.isSameColor()) {
                var i = this.paths.length;
                while (i--) {
                    this.paths[i]._set(prop, value);
                }
            }
            return this.callSuper("_set", prop, value);
        },
        toObject: function(propertiesToInclude) {
            var pathsToObject = this.paths.map(function(path) {
                var originalDefaults = path.includeDefaultValues;
                path.includeDefaultValues = path.group.includeDefaultValues;
                var obj = path.toObject(propertiesToInclude);
                path.includeDefaultValues = originalDefaults;
                return obj;
            });
            var o = extend(this.callSuper("toObject", [ "sourcePath" ].concat(propertiesToInclude)), {
                paths: pathsToObject
            });
            return o;
        },
        toDatalessObject: function(propertiesToInclude) {
            var o = this.toObject(propertiesToInclude);
            if (this.sourcePath) {
                o.paths = this.sourcePath;
            }
            return o;
        },
        toSVG: function(reviver) {
            var objects = this.getObjects(), p = this.getPointByOrigin("left", "top"), translatePart = "translate(" + p.x + " " + p.y + ")", markup = this._createBaseSVGMarkup();
            markup.push("<g ", this.getSvgId(), 'style="', this.getSvgStyles(), '" ', 'transform="', this.getSvgTransformMatrix(), translatePart, this.getSvgTransform(), '" ', ">\n");
            for (var i = 0, len = objects.length; i < len; i++) {
                markup.push("\t", objects[i].toSVG(reviver));
            }
            markup.push("</g>\n");
            return reviver ? reviver(markup.join("")) : markup.join("");
        },
        toString: function() {
            return "#<fabric.PathGroup (" + this.complexity() + "): { top: " + this.top + ", left: " + this.left + " }>";
        },
        isSameColor: function() {
            var firstPathFill = this.getObjects()[0].get("fill") || "";
            if (typeof firstPathFill !== "string") {
                return false;
            }
            firstPathFill = firstPathFill.toLowerCase();
            return this.getObjects().every(function(path) {
                var pathFill = path.get("fill") || "";
                return typeof pathFill === "string" && pathFill.toLowerCase() === firstPathFill;
            });
        },
        complexity: function() {
            return this.paths.reduce(function(total, path) {
                return total + (path && path.complexity ? path.complexity() : 0);
            }, 0);
        },
        getObjects: function() {
            return this.paths;
        }
    });
    fabric.PathGroup.fromObject = function(object, callback) {
        var originalPaths = object.paths;
        delete object.paths;
        if (typeof originalPaths === "string") {
            fabric.loadSVGFromURL(originalPaths, function(elements) {
                var pathUrl = originalPaths;
                var pathGroup = fabric.util.groupSVGElements(elements, object, pathUrl);
                object.paths = originalPaths;
                callback(pathGroup);
            });
        } else {
            fabric.util.enlivenObjects(originalPaths, function(enlivenedObjects) {
                var pathGroup = new fabric.PathGroup(enlivenedObjects, object);
                object.paths = originalPaths;
                callback(pathGroup);
            });
        }
    };
    fabric.PathGroup.async = true;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, min = fabric.util.array.min, max = fabric.util.array.max;
    if (fabric.Group) {
        return;
    }
    var _lockProperties = {
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true
    };
    fabric.Group = fabric.util.createClass(fabric.Object, fabric.Collection, {
        type: "group",
        strokeWidth: 0,
        subTargetCheck: false,
        cacheProperties: [],
        initialize: function(objects, options, isAlreadyGrouped) {
            options = options || {};
            this._objects = [];
            isAlreadyGrouped && this.callSuper("initialize", options);
            this._objects = objects || [];
            for (var i = this._objects.length; i--; ) {
                this._objects[i].group = this;
            }
            if (options.originX) {
                this.originX = options.originX;
            }
            if (options.originY) {
                this.originY = options.originY;
            }
            if (isAlreadyGrouped) {
                this._updateObjectsCoords(true);
            } else {
                this._calcBounds();
                this._updateObjectsCoords();
                this.callSuper("initialize", options);
            }
            this.setCoords();
            this.saveCoords();
        },
        _updateObjectsCoords: function(skipCoordsChange) {
            var center = this.getCenterPoint();
            for (var i = this._objects.length; i--; ) {
                this._updateObjectCoords(this._objects[i], center, skipCoordsChange);
            }
        },
        _updateObjectCoords: function(object, center, skipCoordsChange) {
            object.__origHasControls = object.hasControls;
            object.hasControls = false;
            if (skipCoordsChange) {
                return;
            }
            var objectLeft = object.getLeft(), objectTop = object.getTop(), ignoreZoom = true, skipAbsolute = true;
            object.set({
                left: objectLeft - center.x,
                top: objectTop - center.y
            });
            object.setCoords(ignoreZoom, skipAbsolute);
        },
        toString: function() {
            return "#<fabric.Group: (" + this.complexity() + ")>";
        },
        addWithUpdate: function(object) {
            this._restoreObjectsState();
            fabric.util.resetObjectTransform(this);
            if (object) {
                this._objects.push(object);
                object.group = this;
                object._set("canvas", this.canvas);
            }
            this.forEachObject(this._setObjectActive, this);
            this._calcBounds();
            this._updateObjectsCoords();
            this.setCoords();
            this.dirty = true;
            return this;
        },
        _setObjectActive: function(object) {
            object.set("active", true);
            object.group = this;
        },
        removeWithUpdate: function(object) {
            this._restoreObjectsState();
            fabric.util.resetObjectTransform(this);
            this.forEachObject(this._setObjectActive, this);
            this.remove(object);
            this._calcBounds();
            this._updateObjectsCoords();
            this.setCoords();
            this.dirty = true;
            return this;
        },
        _onObjectAdded: function(object) {
            this.dirty = true;
            object.group = this;
            object._set("canvas", this.canvas);
        },
        _onObjectRemoved: function(object) {
            this.dirty = true;
            delete object.group;
            object.set("active", false);
        },
        delegatedProperties: {
            fill: true,
            stroke: true,
            strokeWidth: true,
            fontFamily: true,
            fontWeight: true,
            fontSize: true,
            fontStyle: true,
            lineHeight: true,
            textDecoration: true,
            textAlign: true,
            backgroundColor: true
        },
        _set: function(key, value) {
            var i = this._objects.length;
            if (this.delegatedProperties[key] || key === "canvas") {
                while (i--) {
                    this._objects[i].set(key, value);
                }
            } else {
                while (i--) {
                    this._objects[i].setOnGroup(key, value);
                }
            }
            this.callSuper("_set", key, value);
        },
        toObject: function(propertiesToInclude) {
            var objsToObject = this.getObjects().map(function(obj) {
                var originalDefaults = obj.includeDefaultValues;
                obj.includeDefaultValues = obj.group.includeDefaultValues;
                var _obj = obj.toObject(propertiesToInclude);
                obj.includeDefaultValues = originalDefaults;
                return _obj;
            });
            return extend(this.callSuper("toObject", propertiesToInclude), {
                objects: objsToObject
            });
        },
        toDatalessObject: function(propertiesToInclude) {
            var objsToObject = this.getObjects().map(function(obj) {
                var originalDefaults = obj.includeDefaultValues;
                obj.includeDefaultValues = obj.group.includeDefaultValues;
                var _obj = obj.toDatalessObject(propertiesToInclude);
                obj.includeDefaultValues = originalDefaults;
                return _obj;
            });
            return extend(this.callSuper("toDatalessObject", propertiesToInclude), {
                objects: objsToObject
            });
        },
        render: function(ctx) {
            this._transformDone = true;
            this.callSuper("render", ctx);
            this._transformDone = false;
        },
        shouldCache: function() {
            var parentCache = this.objectCaching && (!this.group || this.needsItsOwnCache() || !this.group.isCaching());
            this.caching = parentCache;
            if (parentCache) {
                for (var i = 0, len = this._objects.length; i < len; i++) {
                    if (this._objects[i].willDrawShadow()) {
                        this.caching = false;
                        return false;
                    }
                }
            }
            return parentCache;
        },
        willDrawShadow: function() {
            if (this.callSuper("willDrawShadow")) {
                return true;
            }
            for (var i = 0, len = this._objects.length; i < len; i++) {
                if (this._objects[i].willDrawShadow()) {
                    return true;
                }
            }
            return false;
        },
        isCaching: function() {
            return this.caching || this.group && this.group.isCaching();
        },
        drawObject: function(ctx) {
            for (var i = 0, len = this._objects.length; i < len; i++) {
                this._renderObject(this._objects[i], ctx);
            }
        },
        isCacheDirty: function() {
            if (this.callSuper("isCacheDirty")) {
                return true;
            }
            if (!this.statefullCache) {
                return false;
            }
            for (var i = 0, len = this._objects.length; i < len; i++) {
                if (this._objects[i].isCacheDirty(true)) {
                    if (this._cacheCanvas) {
                        var x = this.cacheWidth / this.zoomX, y = this.cacheHeight / this.zoomY;
                        this._cacheContext.clearRect(-x / 2, -y / 2, x, y);
                    }
                    return true;
                }
            }
            return false;
        },
        _renderControls: function(ctx, noTransform) {
            ctx.save();
            ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
            this.callSuper("_renderControls", ctx, noTransform);
            for (var i = 0, len = this._objects.length; i < len; i++) {
                this._objects[i]._renderControls(ctx);
            }
            ctx.restore();
        },
        _renderObject: function(object, ctx) {
            if (!object.visible) {
                return;
            }
            var originalHasRotatingPoint = object.hasRotatingPoint;
            object.hasRotatingPoint = false;
            object.render(ctx);
            object.hasRotatingPoint = originalHasRotatingPoint;
        },
        _restoreObjectsState: function() {
            this._objects.forEach(this._restoreObjectState, this);
            return this;
        },
        realizeTransform: function(object) {
            var matrix = object.calcTransformMatrix(), options = fabric.util.qrDecompose(matrix), center = new fabric.Point(options.translateX, options.translateY);
            object.flipX = false;
            object.flipY = false;
            object.set("scaleX", options.scaleX);
            object.set("scaleY", options.scaleY);
            object.skewX = options.skewX;
            object.skewY = options.skewY;
            object.angle = options.angle;
            object.setPositionByOrigin(center, "center", "center");
            return object;
        },
        _restoreObjectState: function(object) {
            this.realizeTransform(object);
            object.setCoords();
            object.hasControls = object.__origHasControls;
            delete object.__origHasControls;
            object.set("active", false);
            delete object.group;
            return this;
        },
        destroy: function() {
            this._objects.forEach(function(object) {
                object.set("dirty", true);
            });
            return this._restoreObjectsState();
        },
        saveCoords: function() {
            this._originalLeft = this.get("left");
            this._originalTop = this.get("top");
            return this;
        },
        hasMoved: function() {
            return this._originalLeft !== this.get("left") || this._originalTop !== this.get("top");
        },
        setObjectsCoords: function() {
            var ignoreZoom = true, skipAbsolute = true;
            this.forEachObject(function(object) {
                object.setCoords(ignoreZoom, skipAbsolute);
            });
            return this;
        },
        _calcBounds: function(onlyWidthHeight) {
            var aX = [], aY = [], o, prop, props = [ "tr", "br", "bl", "tl" ], i = 0, iLen = this._objects.length, j, jLen = props.length, ignoreZoom = true;
            for (;i < iLen; ++i) {
                o = this._objects[i];
                o.setCoords(ignoreZoom);
                for (j = 0; j < jLen; j++) {
                    prop = props[j];
                    aX.push(o.oCoords[prop].x);
                    aY.push(o.oCoords[prop].y);
                }
            }
            this.set(this._getBounds(aX, aY, onlyWidthHeight));
        },
        _getBounds: function(aX, aY, onlyWidthHeight) {
            var minXY = new fabric.Point(min(aX), min(aY)), maxXY = new fabric.Point(max(aX), max(aY)), obj = {
                width: maxXY.x - minXY.x || 0,
                height: maxXY.y - minXY.y || 0
            };
            if (!onlyWidthHeight) {
                obj.left = minXY.x || 0;
                obj.top = minXY.y || 0;
                if (this.originX === "center") {
                    obj.left += obj.width / 2;
                }
                if (this.originX === "right") {
                    obj.left += obj.width;
                }
                if (this.originY === "center") {
                    obj.top += obj.height / 2;
                }
                if (this.originY === "bottom") {
                    obj.top += obj.height;
                }
            }
            return obj;
        },
        toSVG: function(reviver) {
            var markup = this._createBaseSVGMarkup();
            markup.push("<g ", this.getSvgId(), 'transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '" style="', this.getSvgFilter(), '">\n');
            for (var i = 0, len = this._objects.length; i < len; i++) {
                markup.push("\t", this._objects[i].toSVG(reviver));
            }
            markup.push("</g>\n");
            return reviver ? reviver(markup.join("")) : markup.join("");
        },
        get: function(prop) {
            if (prop in _lockProperties) {
                if (this[prop]) {
                    return this[prop];
                } else {
                    for (var i = 0, len = this._objects.length; i < len; i++) {
                        if (this._objects[i][prop]) {
                            return true;
                        }
                    }
                    return false;
                }
            } else {
                if (prop in this.delegatedProperties) {
                    return this._objects[0] && this._objects[0].get(prop);
                }
                return this[prop];
            }
        }
    });
    fabric.Group.fromObject = function(object, callback) {
        fabric.util.enlivenObjects(object.objects, function(enlivenedObjects) {
            var options = fabric.util.object.clone(object, true);
            delete options.objects;
            callback && callback(new fabric.Group(enlivenedObjects, options, true));
        });
    };
    fabric.Group.async = true;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var extend = fabric.util.object.extend;
    if (!global.fabric) {
        global.fabric = {};
    }
    if (global.fabric.Image) {
        fabric.warn("fabric.Image is already defined.");
        return;
    }
    var stateProperties = fabric.Object.prototype.stateProperties.concat();
    stateProperties.push("alignX", "alignY", "meetOrSlice");
    fabric.Image = fabric.util.createClass(fabric.Object, {
        type: "image",
        crossOrigin: "",
        alignX: "none",
        alignY: "none",
        meetOrSlice: "meet",
        strokeWidth: 0,
        _lastScaleX: 1,
        _lastScaleY: 1,
        minimumScaleTrigger: .5,
        stateProperties: stateProperties,
        objectCaching: false,
        initialize: function(element, options, callback) {
            options || (options = {});
            this.filters = [];
            this.resizeFilters = [];
            this.callSuper("initialize", options);
            this._initElement(element, options, callback);
        },
        getElement: function() {
            return this._element;
        },
        setElement: function(element, callback, options) {
            var _callback, _this;
            this._element = element;
            this._originalElement = element;
            this._initConfig(options);
            if (this.resizeFilters.length === 0) {
                _callback = callback;
            } else {
                _this = this;
                _callback = function() {
                    _this.applyFilters(callback, _this.resizeFilters, _this._filteredEl || _this._originalElement, true);
                };
            }
            if (this.filters.length !== 0) {
                this.applyFilters(_callback);
            } else if (_callback) {
                _callback(this);
            }
            return this;
        },
        setCrossOrigin: function(value) {
            this.crossOrigin = value;
            this._element.crossOrigin = value;
            return this;
        },
        getOriginalSize: function() {
            var element = this.getElement();
            return {
                width: element.width,
                height: element.height
            };
        },
        _stroke: function(ctx) {
            if (!this.stroke || this.strokeWidth === 0) {
                return;
            }
            var w = this.width / 2, h = this.height / 2;
            ctx.beginPath();
            ctx.moveTo(-w, -h);
            ctx.lineTo(w, -h);
            ctx.lineTo(w, h);
            ctx.lineTo(-w, h);
            ctx.lineTo(-w, -h);
            ctx.closePath();
        },
        _renderDashedStroke: function(ctx) {
            var x = -this.width / 2, y = -this.height / 2, w = this.width, h = this.height;
            ctx.save();
            this._setStrokeStyles(ctx);
            ctx.beginPath();
            fabric.util.drawDashedLine(ctx, x, y, x + w, y, this.strokeDashArray);
            fabric.util.drawDashedLine(ctx, x + w, y, x + w, y + h, this.strokeDashArray);
            fabric.util.drawDashedLine(ctx, x + w, y + h, x, y + h, this.strokeDashArray);
            fabric.util.drawDashedLine(ctx, x, y + h, x, y, this.strokeDashArray);
            ctx.closePath();
            ctx.restore();
        },
        toObject: function(propertiesToInclude) {
            var filters = [], resizeFilters = [], scaleX = 1, scaleY = 1;
            this.filters.forEach(function(filterObj) {
                if (filterObj) {
                    if (filterObj.type === "Resize") {
                        scaleX *= filterObj.scaleX;
                        scaleY *= filterObj.scaleY;
                    }
                    filters.push(filterObj.toObject());
                }
            });
            this.resizeFilters.forEach(function(filterObj) {
                filterObj && resizeFilters.push(filterObj.toObject());
            });
            var object = extend(this.callSuper("toObject", [ "crossOrigin", "alignX", "alignY", "meetOrSlice" ].concat(propertiesToInclude)), {
                src: this.getSrc(),
                filters: filters,
                resizeFilters: resizeFilters
            });
            object.width /= scaleX;
            object.height /= scaleY;
            return object;
        },
        toSVG: function(reviver) {
            var markup = this._createBaseSVGMarkup(), x = -this.width / 2, y = -this.height / 2, preserveAspectRatio = "none", filtered = true;
            if (this.group && this.group.type === "path-group") {
                x = this.left;
                y = this.top;
            }
            if (this.alignX !== "none" && this.alignY !== "none") {
                preserveAspectRatio = "x" + this.alignX + "Y" + this.alignY + " " + this.meetOrSlice;
            }
            markup.push('<g transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '">\n', "<image ", this.getSvgId(), 'xlink:href="', this.getSvgSrc(filtered), '" x="', x, '" y="', y, '" style="', this.getSvgStyles(), '" width="', this.width, '" height="', this.height, '" preserveAspectRatio="', preserveAspectRatio, '"', "></image>\n");
            if (this.stroke || this.strokeDashArray) {
                var origFill = this.fill;
                this.fill = null;
                markup.push("<rect ", 'x="', x, '" y="', y, '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '"/>\n');
                this.fill = origFill;
            }
            markup.push("</g>\n");
            return reviver ? reviver(markup.join("")) : markup.join("");
        },
        getSrc: function(filtered) {
            var element = filtered ? this._element : this._originalElement;
            if (element) {
                return fabric.isLikelyNode ? element._src : element.src;
            } else {
                return this.src || "";
            }
        },
        setSrc: function(src, callback, options) {
            fabric.util.loadImage(src, function(img) {
                return this.setElement(img, callback, options);
            }, this, options && options.crossOrigin);
        },
        toString: function() {
            return '#<fabric.Image: { src: "' + this.getSrc() + '" }>';
        },
        applyFilters: function(callback, filters, imgElement, forResizing) {
            filters = filters || this.filters;
            imgElement = imgElement || this._originalElement;
            if (!imgElement) {
                return;
            }
            var replacement = fabric.util.createImage(), retinaScaling = this.canvas ? this.canvas.getRetinaScaling() : fabric.devicePixelRatio, minimumScale = this.minimumScaleTrigger / retinaScaling, _this = this, scaleX, scaleY;
            if (filters.length === 0) {
                this._element = imgElement;
                callback && callback(this);
                return imgElement;
            }
            var canvasEl = fabric.util.createCanvasElement();
            canvasEl.width = imgElement.width;
            canvasEl.height = imgElement.height;
            canvasEl.getContext("2d").drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
            filters.forEach(function(filter) {
                if (!filter) {
                    return;
                }
                if (forResizing) {
                    scaleX = _this.scaleX < minimumScale ? _this.scaleX : 1;
                    scaleY = _this.scaleY < minimumScale ? _this.scaleY : 1;
                    if (scaleX * retinaScaling < 1) {
                        scaleX *= retinaScaling;
                    }
                    if (scaleY * retinaScaling < 1) {
                        scaleY *= retinaScaling;
                    }
                } else {
                    scaleX = filter.scaleX;
                    scaleY = filter.scaleY;
                }
                filter.applyTo(canvasEl, scaleX, scaleY);
                if (!forResizing && filter.type === "Resize") {
                    _this.width *= filter.scaleX;
                    _this.height *= filter.scaleY;
                }
            });
            replacement.width = canvasEl.width;
            replacement.height = canvasEl.height;
            if (fabric.isLikelyNode) {
                replacement.src = canvasEl.toBuffer(undefined, fabric.Image.pngCompression);
                _this._element = replacement;
                !forResizing && (_this._filteredEl = replacement);
                callback && callback(_this);
            } else {
                replacement.onload = function() {
                    _this._element = replacement;
                    !forResizing && (_this._filteredEl = replacement);
                    callback && callback(_this);
                    replacement.onload = canvasEl = null;
                };
                replacement.src = canvasEl.toDataURL("image/png");
            }
            return canvasEl;
        },
        _render: function(ctx, noTransform) {
            var x, y, imageMargins = this._findMargins(), elementToDraw;
            x = noTransform ? this.left : -this.width / 2;
            y = noTransform ? this.top : -this.height / 2;
            if (this.meetOrSlice === "slice") {
                ctx.beginPath();
                ctx.rect(x, y, this.width, this.height);
                ctx.clip();
            }
            if (this.isMoving === false && this.resizeFilters.length && this._needsResize()) {
                this._lastScaleX = this.scaleX;
                this._lastScaleY = this.scaleY;
                elementToDraw = this.applyFilters(null, this.resizeFilters, this._filteredEl || this._originalElement, true);
            } else {
                elementToDraw = this._element;
            }
            elementToDraw && ctx.drawImage(elementToDraw, x + imageMargins.marginX, y + imageMargins.marginY, imageMargins.width, imageMargins.height);
            this._stroke(ctx);
            this._renderStroke(ctx);
        },
        _needsResize: function() {
            return this.scaleX !== this._lastScaleX || this.scaleY !== this._lastScaleY;
        },
        _findMargins: function() {
            var width = this.width, height = this.height, scales, scale, marginX = 0, marginY = 0;
            if (this.alignX !== "none" || this.alignY !== "none") {
                scales = [ this.width / this._element.width, this.height / this._element.height ];
                scale = this.meetOrSlice === "meet" ? Math.min.apply(null, scales) : Math.max.apply(null, scales);
                width = this._element.width * scale;
                height = this._element.height * scale;
                if (this.alignX === "Mid") {
                    marginX = (this.width - width) / 2;
                }
                if (this.alignX === "Max") {
                    marginX = this.width - width;
                }
                if (this.alignY === "Mid") {
                    marginY = (this.height - height) / 2;
                }
                if (this.alignY === "Max") {
                    marginY = this.height - height;
                }
            }
            return {
                width: width,
                height: height,
                marginX: marginX,
                marginY: marginY
            };
        },
        _resetWidthHeight: function() {
            var element = this.getElement();
            this.set("width", element.width);
            this.set("height", element.height);
        },
        _initElement: function(element, options, callback) {
            this.setElement(fabric.util.getById(element), callback, options);
            fabric.util.addClass(this.getElement(), fabric.Image.CSS_CANVAS);
        },
        _initConfig: function(options) {
            options || (options = {});
            this.setOptions(options);
            this._setWidthHeight(options);
            if (this._element && this.crossOrigin) {
                this._element.crossOrigin = this.crossOrigin;
            }
        },
        _initFilters: function(filters, callback) {
            if (filters && filters.length) {
                fabric.util.enlivenObjects(filters, function(enlivenedObjects) {
                    callback && callback(enlivenedObjects);
                }, "fabric.Image.filters");
            } else {
                callback && callback();
            }
        },
        _setWidthHeight: function(options) {
            this.width = "width" in options ? options.width : this.getElement() ? this.getElement().width || 0 : 0;
            this.height = "height" in options ? options.height : this.getElement() ? this.getElement().height || 0 : 0;
        }
    });
    fabric.Image.CSS_CANVAS = "canvas-img";
    fabric.Image.prototype.getSvgSrc = fabric.Image.prototype.getSrc;
    fabric.Image.fromObject = function(object, callback) {
        fabric.util.loadImage(object.src, function(img, error) {
            if (error) {
                callback && callback(null, error);
                return;
            }
            fabric.Image.prototype._initFilters.call(object, object.filters, function(filters) {
                object.filters = filters || [];
                fabric.Image.prototype._initFilters.call(object, object.resizeFilters, function(resizeFilters) {
                    object.resizeFilters = resizeFilters || [];
                    return new fabric.Image(img, object, callback);
                });
            });
        }, null, object.crossOrigin);
    };
    fabric.Image.fromURL = function(url, callback, imgOptions) {
        fabric.util.loadImage(url, function(img) {
            callback && callback(new fabric.Image(img, imgOptions));
        }, null, imgOptions && imgOptions.crossOrigin);
    };
    fabric.Image.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat("x y width height preserveAspectRatio xlink:href crossOrigin".split(" "));
    fabric.Image.fromElement = function(element, callback, options) {
        var parsedAttributes = fabric.parseAttributes(element, fabric.Image.ATTRIBUTE_NAMES), preserveAR;
        if (parsedAttributes.preserveAspectRatio) {
            preserveAR = fabric.util.parsePreserveAspectRatioAttribute(parsedAttributes.preserveAspectRatio);
            extend(parsedAttributes, preserveAR);
        }
        fabric.Image.fromURL(parsedAttributes["xlink:href"], callback, extend(options ? fabric.util.object.clone(options) : {}, parsedAttributes));
    };
    fabric.Image.async = true;
    fabric.Image.pngCompression = 1;
})(typeof exports !== "undefined" ? exports : this);

fabric.Image.filters = fabric.Image.filters || {};

fabric.Image.filters.BaseFilter = fabric.util.createClass({
    type: "BaseFilter",
    initialize: function(options) {
        if (options) {
            this.setOptions(options);
        }
    },
    setOptions: function(options) {
        for (var prop in options) {
            this[prop] = options[prop];
        }
    },
    toObject: function() {
        return {
            type: this.type
        };
    },
    toJSON: function() {
        return this.toObject();
    }
});

fabric.Image.filters.BaseFilter.fromObject = function(object, callback) {
    var filter = new fabric.Image.filters[object.type](object);
    callback && callback(filter);
    return filter;
};

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Brightness = createClass(filters.BaseFilter, {
        type: "Brightness",
        initialize: function(options) {
            options = options || {};
            this.brightness = options.brightness || 0;
        },
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, brightness = this.brightness;
            for (var i = 0, len = data.length; i < len; i += 4) {
                data[i] += brightness;
                data[i + 1] += brightness;
                data[i + 2] += brightness;
            }
            context.putImageData(imageData, 0, 0);
        },
        toObject: function() {
            return extend(this.callSuper("toObject"), {
                brightness: this.brightness
            });
        }
    });
    fabric.Image.filters.Brightness.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Convolute = createClass(filters.BaseFilter, {
        type: "Convolute",
        initialize: function(options) {
            options = options || {};
            this.opaque = options.opaque;
            this.matrix = options.matrix || [ 0, 0, 0, 0, 1, 0, 0, 0, 0 ];
        },
        applyTo: function(canvasEl) {
            var weights = this.matrix, context = canvasEl.getContext("2d"), pixels = context.getImageData(0, 0, canvasEl.width, canvasEl.height), side = Math.round(Math.sqrt(weights.length)), halfSide = Math.floor(side / 2), src = pixels.data, sw = pixels.width, sh = pixels.height, output = context.createImageData(sw, sh), dst = output.data, alphaFac = this.opaque ? 1 : 0, r, g, b, a, dstOff, scx, scy, srcOff, wt;
            for (var y = 0; y < sh; y++) {
                for (var x = 0; x < sw; x++) {
                    dstOff = (y * sw + x) * 4;
                    r = 0;
                    g = 0;
                    b = 0;
                    a = 0;
                    for (var cy = 0; cy < side; cy++) {
                        for (var cx = 0; cx < side; cx++) {
                            scy = y + cy - halfSide;
                            scx = x + cx - halfSide;
                            if (scy < 0 || scy > sh || scx < 0 || scx > sw) {
                                continue;
                            }
                            srcOff = (scy * sw + scx) * 4;
                            wt = weights[cy * side + cx];
                            r += src[srcOff] * wt;
                            g += src[srcOff + 1] * wt;
                            b += src[srcOff + 2] * wt;
                            a += src[srcOff + 3] * wt;
                        }
                    }
                    dst[dstOff] = r;
                    dst[dstOff + 1] = g;
                    dst[dstOff + 2] = b;
                    dst[dstOff + 3] = a + alphaFac * (255 - a);
                }
            }
            context.putImageData(output, 0, 0);
        },
        toObject: function() {
            return extend(this.callSuper("toObject"), {
                opaque: this.opaque,
                matrix: this.matrix
            });
        }
    });
    fabric.Image.filters.Convolute.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.GradientTransparency = createClass(filters.BaseFilter, {
        type: "GradientTransparency",
        initialize: function(options) {
            options = options || {};
            this.threshold = options.threshold || 100;
        },
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, threshold = this.threshold, total = data.length;
            for (var i = 0, len = data.length; i < len; i += 4) {
                data[i + 3] = threshold + 255 * (total - i) / total;
            }
            context.putImageData(imageData, 0, 0);
        },
        toObject: function() {
            return extend(this.callSuper("toObject"), {
                threshold: this.threshold
            });
        }
    });
    fabric.Image.filters.GradientTransparency.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Grayscale = createClass(filters.BaseFilter, {
        type: "Grayscale",
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, len = imageData.width * imageData.height * 4, index = 0, average;
            while (index < len) {
                average = (data[index] + data[index + 1] + data[index + 2]) / 3;
                data[index] = average;
                data[index + 1] = average;
                data[index + 2] = average;
                index += 4;
            }
            context.putImageData(imageData, 0, 0);
        }
    });
    fabric.Image.filters.Grayscale.fromObject = function(object, callback) {
        object = object || {};
        object.type = "Grayscale";
        return fabric.Image.filters.BaseFilter.fromObject(object, callback);
    };
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Invert = createClass(filters.BaseFilter, {
        type: "Invert",
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, iLen = data.length, i;
            for (i = 0; i < iLen; i += 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            context.putImageData(imageData, 0, 0);
        }
    });
    fabric.Image.filters.Invert.fromObject = function(object, callback) {
        object = object || {};
        object.type = "Invert";
        return fabric.Image.filters.BaseFilter.fromObject(object, callback);
    };
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Mask = createClass(filters.BaseFilter, {
        type: "Mask",
        initialize: function(options) {
            options = options || {};
            this.mask = options.mask;
            this.channel = [ 0, 1, 2, 3 ].indexOf(options.channel) > -1 ? options.channel : 0;
        },
        applyTo: function(canvasEl) {
            if (!this.mask) {
                return;
            }
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, maskEl = this.mask.getElement(), maskCanvasEl = fabric.util.createCanvasElement(), channel = this.channel, i, iLen = imageData.width * imageData.height * 4;
            maskCanvasEl.width = canvasEl.width;
            maskCanvasEl.height = canvasEl.height;
            maskCanvasEl.getContext("2d").drawImage(maskEl, 0, 0, canvasEl.width, canvasEl.height);
            var maskImageData = maskCanvasEl.getContext("2d").getImageData(0, 0, canvasEl.width, canvasEl.height), maskData = maskImageData.data;
            for (i = 0; i < iLen; i += 4) {
                data[i + 3] = maskData[i + channel];
            }
            context.putImageData(imageData, 0, 0);
        },
        toObject: function() {
            return extend(this.callSuper("toObject"), {
                mask: this.mask.toObject(),
                channel: this.channel
            });
        }
    });
    fabric.Image.filters.Mask.fromObject = function(object, callback) {
        fabric.util.loadImage(object.mask.src, function(img) {
            object.mask = new fabric.Image(img, object.mask);
            return fabric.Image.filters.BaseFilter.fromObject(object, callback);
        });
    };
    fabric.Image.filters.Mask.async = true;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Noise = createClass(filters.BaseFilter, {
        type: "Noise",
        initialize: function(options) {
            options = options || {};
            this.noise = options.noise || 0;
        },
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, noise = this.noise, rand;
            for (var i = 0, len = data.length; i < len; i += 4) {
                rand = (.5 - Math.random()) * noise;
                data[i] += rand;
                data[i + 1] += rand;
                data[i + 2] += rand;
            }
            context.putImageData(imageData, 0, 0);
        },
        toObject: function() {
            return extend(this.callSuper("toObject"), {
                noise: this.noise
            });
        }
    });
    fabric.Image.filters.Noise.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Pixelate = createClass(filters.BaseFilter, {
        type: "Pixelate",
        initialize: function(options) {
            options = options || {};
            this.blocksize = options.blocksize || 4;
        },
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, iLen = imageData.height, jLen = imageData.width, index, i, j, r, g, b, a;
            for (i = 0; i < iLen; i += this.blocksize) {
                for (j = 0; j < jLen; j += this.blocksize) {
                    index = i * 4 * jLen + j * 4;
                    r = data[index];
                    g = data[index + 1];
                    b = data[index + 2];
                    a = data[index + 3];
                    for (var _i = i, _ilen = i + this.blocksize; _i < _ilen; _i++) {
                        for (var _j = j, _jlen = j + this.blocksize; _j < _jlen; _j++) {
                            index = _i * 4 * jLen + _j * 4;
                            data[index] = r;
                            data[index + 1] = g;
                            data[index + 2] = b;
                            data[index + 3] = a;
                        }
                    }
                }
            }
            context.putImageData(imageData, 0, 0);
        },
        toObject: function() {
            return extend(this.callSuper("toObject"), {
                blocksize: this.blocksize
            });
        }
    });
    fabric.Image.filters.Pixelate.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.RemoveWhite = createClass(filters.BaseFilter, {
        type: "RemoveWhite",
        initialize: function(options) {
            options = options || {};
            this.threshold = options.threshold || 30;
            this.distance = options.distance || 20;
        },
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, threshold = this.threshold, distance = this.distance, limit = 255 - threshold, abs = Math.abs, r, g, b;
            for (var i = 0, len = data.length; i < len; i += 4) {
                r = data[i];
                g = data[i + 1];
                b = data[i + 2];
                if (r > limit && g > limit && b > limit && abs(r - g) < distance && abs(r - b) < distance && abs(g - b) < distance) {
                    data[i + 3] = 0;
                }
            }
            context.putImageData(imageData, 0, 0);
        },
        toObject: function() {
            return extend(this.callSuper("toObject"), {
                threshold: this.threshold,
                distance: this.distance
            });
        }
    });
    fabric.Image.filters.RemoveWhite.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Sepia = createClass(filters.BaseFilter, {
        type: "Sepia",
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, iLen = data.length, i, avg;
            for (i = 0; i < iLen; i += 4) {
                avg = .3 * data[i] + .59 * data[i + 1] + .11 * data[i + 2];
                data[i] = avg + 100;
                data[i + 1] = avg + 50;
                data[i + 2] = avg + 255;
            }
            context.putImageData(imageData, 0, 0);
        }
    });
    fabric.Image.filters.Sepia.fromObject = function(object, callback) {
        object = object || {};
        object.type = "Sepia";
        return new fabric.Image.filters.BaseFilter.fromObject(object, callback);
    };
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Sepia2 = createClass(filters.BaseFilter, {
        type: "Sepia2",
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, iLen = data.length, i, r, g, b;
            for (i = 0; i < iLen; i += 4) {
                r = data[i];
                g = data[i + 1];
                b = data[i + 2];
                data[i] = (r * .393 + g * .769 + b * .189) / 1.351;
                data[i + 1] = (r * .349 + g * .686 + b * .168) / 1.203;
                data[i + 2] = (r * .272 + g * .534 + b * .131) / 2.14;
            }
            context.putImageData(imageData, 0, 0);
        }
    });
    fabric.Image.filters.Sepia2.fromObject = function(object, callback) {
        object = object || {};
        object.type = "Sepia2";
        return new fabric.Image.filters.BaseFilter.fromObject(object, callback);
    };
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Tint = createClass(filters.BaseFilter, {
        type: "Tint",
        initialize: function(options) {
            options = options || {};
            this.color = options.color || "#000000";
            this.opacity = typeof options.opacity !== "undefined" ? options.opacity : new fabric.Color(this.color).getAlpha();
        },
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, iLen = data.length, i, tintR, tintG, tintB, r, g, b, alpha1, source;
            source = new fabric.Color(this.color).getSource();
            tintR = source[0] * this.opacity;
            tintG = source[1] * this.opacity;
            tintB = source[2] * this.opacity;
            alpha1 = 1 - this.opacity;
            for (i = 0; i < iLen; i += 4) {
                r = data[i];
                g = data[i + 1];
                b = data[i + 2];
                data[i] = tintR + r * alpha1;
                data[i + 1] = tintG + g * alpha1;
                data[i + 2] = tintB + b * alpha1;
            }
            context.putImageData(imageData, 0, 0);
        },
        toObject: function() {
            return extend(this.callSuper("toObject"), {
                color: this.color,
                opacity: this.opacity
            });
        }
    });
    fabric.Image.filters.Tint.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Multiply = createClass(filters.BaseFilter, {
        type: "Multiply",
        initialize: function(options) {
            options = options || {};
            this.color = options.color || "#000000";
        },
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, iLen = data.length, i, source;
            source = new fabric.Color(this.color).getSource();
            for (i = 0; i < iLen; i += 4) {
                data[i] *= source[0] / 255;
                data[i + 1] *= source[1] / 255;
                data[i + 2] *= source[2] / 255;
            }
            context.putImageData(imageData, 0, 0);
        },
        toObject: function() {
            return extend(this.callSuper("toObject"), {
                color: this.color
            });
        }
    });
    fabric.Image.filters.Multiply.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Blend = createClass(filters.BaseFilter, {
        type: "Blend",
        initialize: function(options) {
            options = options || {};
            this.color = options.color || "#000";
            this.image = options.image || false;
            this.mode = options.mode || "multiply";
            this.alpha = options.alpha || 1;
        },
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, tr, tg, tb, r, g, b, _r, _g, _b, source, isImage = false;
            if (this.image) {
                isImage = true;
                var _el = fabric.util.createCanvasElement();
                _el.width = this.image.width;
                _el.height = this.image.height;
                var tmpCanvas = new fabric.StaticCanvas(_el);
                tmpCanvas.add(this.image);
                var context2 = tmpCanvas.getContext("2d");
                source = context2.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height).data;
            } else {
                source = new fabric.Color(this.color).getSource();
                tr = source[0] * this.alpha;
                tg = source[1] * this.alpha;
                tb = source[2] * this.alpha;
            }
            for (var i = 0, len = data.length; i < len; i += 4) {
                r = data[i];
                g = data[i + 1];
                b = data[i + 2];
                if (isImage) {
                    tr = source[i] * this.alpha;
                    tg = source[i + 1] * this.alpha;
                    tb = source[i + 2] * this.alpha;
                }
                switch (this.mode) {
                  case "multiply":
                    data[i] = r * tr / 255;
                    data[i + 1] = g * tg / 255;
                    data[i + 2] = b * tb / 255;
                    break;

                  case "screen":
                    data[i] = 1 - (1 - r) * (1 - tr);
                    data[i + 1] = 1 - (1 - g) * (1 - tg);
                    data[i + 2] = 1 - (1 - b) * (1 - tb);
                    break;

                  case "add":
                    data[i] = Math.min(255, r + tr);
                    data[i + 1] = Math.min(255, g + tg);
                    data[i + 2] = Math.min(255, b + tb);
                    break;

                  case "diff":
                  case "difference":
                    data[i] = Math.abs(r - tr);
                    data[i + 1] = Math.abs(g - tg);
                    data[i + 2] = Math.abs(b - tb);
                    break;

                  case "subtract":
                    _r = r - tr;
                    _g = g - tg;
                    _b = b - tb;
                    data[i] = _r < 0 ? 0 : _r;
                    data[i + 1] = _g < 0 ? 0 : _g;
                    data[i + 2] = _b < 0 ? 0 : _b;
                    break;

                  case "darken":
                    data[i] = Math.min(r, tr);
                    data[i + 1] = Math.min(g, tg);
                    data[i + 2] = Math.min(b, tb);
                    break;

                  case "lighten":
                    data[i] = Math.max(r, tr);
                    data[i + 1] = Math.max(g, tg);
                    data[i + 2] = Math.max(b, tb);
                    break;
                }
            }
            context.putImageData(imageData, 0, 0);
        },
        toObject: function() {
            return {
                color: this.color,
                image: this.image,
                mode: this.mode,
                alpha: this.alpha
            };
        }
    });
    fabric.Image.filters.Blend.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), pow = Math.pow, floor = Math.floor, sqrt = Math.sqrt, abs = Math.abs, max = Math.max, round = Math.round, sin = Math.sin, ceil = Math.ceil, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Resize = createClass(filters.BaseFilter, {
        type: "Resize",
        resizeType: "hermite",
        scaleX: 0,
        scaleY: 0,
        lanczosLobes: 3,
        applyTo: function(canvasEl, scaleX, scaleY) {
            if (scaleX === 1 && scaleY === 1) {
                return;
            }
            this.rcpScaleX = 1 / scaleX;
            this.rcpScaleY = 1 / scaleY;
            var oW = canvasEl.width, oH = canvasEl.height, dW = round(oW * scaleX), dH = round(oH * scaleY), imageData;
            if (this.resizeType === "sliceHack") {
                imageData = this.sliceByTwo(canvasEl, oW, oH, dW, dH);
            }
            if (this.resizeType === "hermite") {
                imageData = this.hermiteFastResize(canvasEl, oW, oH, dW, dH);
            }
            if (this.resizeType === "bilinear") {
                imageData = this.bilinearFiltering(canvasEl, oW, oH, dW, dH);
            }
            if (this.resizeType === "lanczos") {
                imageData = this.lanczosResize(canvasEl, oW, oH, dW, dH);
            }
            canvasEl.width = dW;
            canvasEl.height = dH;
            canvasEl.getContext("2d").putImageData(imageData, 0, 0);
        },
        sliceByTwo: function(canvasEl, oW, oH, dW, dH) {
            var context = canvasEl.getContext("2d"), imageData, multW = .5, multH = .5, signW = 1, signH = 1, doneW = false, doneH = false, stepW = oW, stepH = oH, tmpCanvas = fabric.util.createCanvasElement(), tmpCtx = tmpCanvas.getContext("2d");
            dW = floor(dW);
            dH = floor(dH);
            tmpCanvas.width = max(dW, oW);
            tmpCanvas.height = max(dH, oH);
            if (dW > oW) {
                multW = 2;
                signW = -1;
            }
            if (dH > oH) {
                multH = 2;
                signH = -1;
            }
            imageData = context.getImageData(0, 0, oW, oH);
            canvasEl.width = max(dW, oW);
            canvasEl.height = max(dH, oH);
            context.putImageData(imageData, 0, 0);
            while (!doneW || !doneH) {
                oW = stepW;
                oH = stepH;
                if (dW * signW < floor(stepW * multW * signW)) {
                    stepW = floor(stepW * multW);
                } else {
                    stepW = dW;
                    doneW = true;
                }
                if (dH * signH < floor(stepH * multH * signH)) {
                    stepH = floor(stepH * multH);
                } else {
                    stepH = dH;
                    doneH = true;
                }
                imageData = context.getImageData(0, 0, oW, oH);
                tmpCtx.putImageData(imageData, 0, 0);
                context.clearRect(0, 0, stepW, stepH);
                context.drawImage(tmpCanvas, 0, 0, oW, oH, 0, 0, stepW, stepH);
            }
            return context.getImageData(0, 0, dW, dH);
        },
        lanczosResize: function(canvasEl, oW, oH, dW, dH) {
            function lanczosCreate(lobes) {
                return function(x) {
                    if (x > lobes) {
                        return 0;
                    }
                    x *= Math.PI;
                    if (abs(x) < 1e-16) {
                        return 1;
                    }
                    var xx = x / lobes;
                    return sin(x) * sin(xx) / x / xx;
                };
            }
            function process(u) {
                var v, i, weight, idx, a, red, green, blue, alpha, fX, fY;
                center.x = (u + .5) * ratioX;
                icenter.x = floor(center.x);
                for (v = 0; v < dH; v++) {
                    center.y = (v + .5) * ratioY;
                    icenter.y = floor(center.y);
                    a = 0;
                    red = 0;
                    green = 0;
                    blue = 0;
                    alpha = 0;
                    for (i = icenter.x - range2X; i <= icenter.x + range2X; i++) {
                        if (i < 0 || i >= oW) {
                            continue;
                        }
                        fX = floor(1e3 * abs(i - center.x));
                        if (!cacheLanc[fX]) {
                            cacheLanc[fX] = {};
                        }
                        for (var j = icenter.y - range2Y; j <= icenter.y + range2Y; j++) {
                            if (j < 0 || j >= oH) {
                                continue;
                            }
                            fY = floor(1e3 * abs(j - center.y));
                            if (!cacheLanc[fX][fY]) {
                                cacheLanc[fX][fY] = lanczos(sqrt(pow(fX * rcpRatioX, 2) + pow(fY * rcpRatioY, 2)) / 1e3);
                            }
                            weight = cacheLanc[fX][fY];
                            if (weight > 0) {
                                idx = (j * oW + i) * 4;
                                a += weight;
                                red += weight * srcData[idx];
                                green += weight * srcData[idx + 1];
                                blue += weight * srcData[idx + 2];
                                alpha += weight * srcData[idx + 3];
                            }
                        }
                    }
                    idx = (v * dW + u) * 4;
                    destData[idx] = red / a;
                    destData[idx + 1] = green / a;
                    destData[idx + 2] = blue / a;
                    destData[idx + 3] = alpha / a;
                }
                if (++u < dW) {
                    return process(u);
                } else {
                    return destImg;
                }
            }
            var context = canvasEl.getContext("2d"), srcImg = context.getImageData(0, 0, oW, oH), destImg = context.getImageData(0, 0, dW, dH), srcData = srcImg.data, destData = destImg.data, lanczos = lanczosCreate(this.lanczosLobes), ratioX = this.rcpScaleX, ratioY = this.rcpScaleY, rcpRatioX = 2 / this.rcpScaleX, rcpRatioY = 2 / this.rcpScaleY, range2X = ceil(ratioX * this.lanczosLobes / 2), range2Y = ceil(ratioY * this.lanczosLobes / 2), cacheLanc = {}, center = {}, icenter = {};
            return process(0);
        },
        bilinearFiltering: function(canvasEl, oW, oH, dW, dH) {
            var a, b, c, d, x, y, i, j, xDiff, yDiff, chnl, color, offset = 0, origPix, ratioX = this.rcpScaleX, ratioY = this.rcpScaleY, context = canvasEl.getContext("2d"), w4 = 4 * (oW - 1), img = context.getImageData(0, 0, oW, oH), pixels = img.data, destImage = context.getImageData(0, 0, dW, dH), destPixels = destImage.data;
            for (i = 0; i < dH; i++) {
                for (j = 0; j < dW; j++) {
                    x = floor(ratioX * j);
                    y = floor(ratioY * i);
                    xDiff = ratioX * j - x;
                    yDiff = ratioY * i - y;
                    origPix = 4 * (y * oW + x);
                    for (chnl = 0; chnl < 4; chnl++) {
                        a = pixels[origPix + chnl];
                        b = pixels[origPix + 4 + chnl];
                        c = pixels[origPix + w4 + chnl];
                        d = pixels[origPix + w4 + 4 + chnl];
                        color = a * (1 - xDiff) * (1 - yDiff) + b * xDiff * (1 - yDiff) + c * yDiff * (1 - xDiff) + d * xDiff * yDiff;
                        destPixels[offset++] = color;
                    }
                }
            }
            return destImage;
        },
        hermiteFastResize: function(canvasEl, oW, oH, dW, dH) {
            var ratioW = this.rcpScaleX, ratioH = this.rcpScaleY, ratioWHalf = ceil(ratioW / 2), ratioHHalf = ceil(ratioH / 2), context = canvasEl.getContext("2d"), img = context.getImageData(0, 0, oW, oH), data = img.data, img2 = context.getImageData(0, 0, dW, dH), data2 = img2.data;
            for (var j = 0; j < dH; j++) {
                for (var i = 0; i < dW; i++) {
                    var x2 = (i + j * dW) * 4, weight = 0, weights = 0, weightsAlpha = 0, gxR = 0, gxG = 0, gxB = 0, gxA = 0, centerY = (j + .5) * ratioH;
                    for (var yy = floor(j * ratioH); yy < (j + 1) * ratioH; yy++) {
                        var dy = abs(centerY - (yy + .5)) / ratioHHalf, centerX = (i + .5) * ratioW, w0 = dy * dy;
                        for (var xx = floor(i * ratioW); xx < (i + 1) * ratioW; xx++) {
                            var dx = abs(centerX - (xx + .5)) / ratioWHalf, w = sqrt(w0 + dx * dx);
                            if (w > 1 && w < -1) {
                                continue;
                            }
                            weight = 2 * w * w * w - 3 * w * w + 1;
                            if (weight > 0) {
                                dx = 4 * (xx + yy * oW);
                                gxA += weight * data[dx + 3];
                                weightsAlpha += weight;
                                if (data[dx + 3] < 255) {
                                    weight = weight * data[dx + 3] / 250;
                                }
                                gxR += weight * data[dx];
                                gxG += weight * data[dx + 1];
                                gxB += weight * data[dx + 2];
                                weights += weight;
                            }
                        }
                    }
                    data2[x2] = gxR / weights;
                    data2[x2 + 1] = gxG / weights;
                    data2[x2 + 2] = gxB / weights;
                    data2[x2 + 3] = gxA / weightsAlpha;
                }
            }
            return img2;
        },
        toObject: function() {
            return {
                type: this.type,
                scaleX: this.scaleX,
                scaleY: this.scaleY,
                resizeType: this.resizeType,
                lanczosLobes: this.lanczosLobes
            };
        }
    });
    fabric.Image.filters.Resize.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.ColorMatrix = createClass(filters.BaseFilter, {
        type: "ColorMatrix",
        initialize: function(options) {
            options || (options = {});
            this.matrix = options.matrix || [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 ];
        },
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, iLen = data.length, i, r, g, b, a, m = this.matrix;
            for (i = 0; i < iLen; i += 4) {
                r = data[i];
                g = data[i + 1];
                b = data[i + 2];
                a = data[i + 3];
                data[i] = r * m[0] + g * m[1] + b * m[2] + a * m[3] + m[4];
                data[i + 1] = r * m[5] + g * m[6] + b * m[7] + a * m[8] + m[9];
                data[i + 2] = r * m[10] + g * m[11] + b * m[12] + a * m[13] + m[14];
                data[i + 3] = r * m[15] + g * m[16] + b * m[17] + a * m[18] + m[19];
            }
            context.putImageData(imageData, 0, 0);
        },
        toObject: function() {
            return extend(this.callSuper("toObject"), {
                type: this.type,
                matrix: this.matrix
            });
        }
    });
    fabric.Image.filters.ColorMatrix.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Contrast = createClass(filters.BaseFilter, {
        type: "Contrast",
        initialize: function(options) {
            options = options || {};
            this.contrast = options.contrast || 0;
        },
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, contrastF = 259 * (this.contrast + 255) / (255 * (259 - this.contrast));
            for (var i = 0, len = data.length; i < len; i += 4) {
                data[i] = contrastF * (data[i] - 128) + 128;
                data[i + 1] = contrastF * (data[i + 1] - 128) + 128;
                data[i + 2] = contrastF * (data[i + 2] - 128) + 128;
            }
            context.putImageData(imageData, 0, 0);
        },
        toObject: function() {
            return extend(this.callSuper("toObject"), {
                contrast: this.contrast
            });
        }
    });
    fabric.Image.filters.Contrast.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), extend = fabric.util.object.extend, filters = fabric.Image.filters, createClass = fabric.util.createClass;
    filters.Saturate = createClass(filters.BaseFilter, {
        type: "Saturate",
        initialize: function(options) {
            options = options || {};
            this.saturate = options.saturate || 0;
        },
        applyTo: function(canvasEl) {
            var context = canvasEl.getContext("2d"), imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height), data = imageData.data, max, adjust = -this.saturate * .01;
            for (var i = 0, len = data.length; i < len; i += 4) {
                max = Math.max(data[i], data[i + 1], data[i + 2]);
                data[i] += max !== data[i] ? (max - data[i]) * adjust : 0;
                data[i + 1] += max !== data[i + 1] ? (max - data[i + 1]) * adjust : 0;
                data[i + 2] += max !== data[i + 2] ? (max - data[i + 2]) * adjust : 0;
            }
            context.putImageData(imageData, 0, 0);
        },
        toObject: function() {
            return extend(this.callSuper("toObject"), {
                saturate: this.saturate
            });
        }
    });
    fabric.Image.filters.Saturate.fromObject = fabric.Image.filters.BaseFilter.fromObject;
})(typeof exports !== "undefined" ? exports : this);

(function(global) {
    "use strict";
    var fabric = global.fabric || (global.fabric = {}), toFixed = fabric.util.toFixed, NUM_FRACTION_DIGITS = fabric.Object.NUM_FRACTION_DIGITS, MIN_TEXT_WIDTH = 2;
    if (fabric.Text) {
        fabric.warn("fabric.Text is already defined");
        return;
    }
    var stateProperties = fabric.Object.prototype.stateProperties.concat();
    stateProperties.push("fontFamily", "fontWeight", "fontSize", "text", "textDecoration", "textAlign", "fontStyle", "lineHeight", "textBackgroundColor", "charSpacing");
    var cacheProperties = fabric.Object.prototype.cacheProperties.concat();
    cacheProperties.push("fontFamily", "fontWeight", "fontSize", "text", "textDecoration", "textAlign", "fontStyle", "lineHeight", "textBackgroundColor", "charSpacing", "styles");
    fabric.Text = fabric.util.createClass(fabric.Object, {
        _dimensionAffectingProps: [ "fontSize", "fontWeight", "fontFamily", "fontStyle", "lineHeight", "text", "charSpacing", "textAlign" ],
        _reNewline: /\r?\n/,
        _reSpacesAndTabs: /[ \t\r]+/g,
        type: "text",
        fontSize: 40,
        fontWeight: "normal",
        fontFamily: "Times New Roman",
        textDecoration: "",
        textAlign: "left",
        fontStyle: "",
        lineHeight: 1.16,
        textBackgroundColor: "",
        stateProperties: stateProperties,
        cacheProperties: cacheProperties,
        stroke: null,
        shadow: null,
        _fontSizeFraction: .25,
        _fontSizeMult: 1.13,
        charSpacing: 0,
        initialize: function(text, options) {
            options = options || {};
            this.text = text;
            this.__skipDimension = true;
            this.callSuper("initialize", options);
            this.__skipDimension = false;
            this._initDimensions();
            this.setCoords();
            this.setupState({
                propertySet: "_dimensionAffectingProps"
            });
        },
        _initDimensions: function(ctx) {
            if (this.__skipDimension) {
                return;
            }
            if (!ctx) {
                ctx = fabric.util.createCanvasElement().getContext("2d");
                this._setTextStyles(ctx);
            }
            this._textLines = this._splitTextIntoLines();
            this._clearCache();
            this.width = this._getTextWidth(ctx) || this.cursorWidth || MIN_TEXT_WIDTH;
            this.height = this._getTextHeight(ctx);
        },
        toString: function() {
            return "#<fabric.Text (" + this.complexity() + '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '" }>';
        },
        _getCacheCanvasDimensions: function() {
            var dim = this.callSuper("_getCacheCanvasDimensions");
            var fontSize = this.fontSize;
            dim.width += fontSize * dim.zoomX;
            dim.height += fontSize * dim.zoomY;
            return dim;
        },
        _render: function(ctx) {
            this._setTextStyles(ctx);
            if (this.group && this.group.type === "path-group") {
                ctx.translate(this.left, this.top);
            }
            this._renderTextLinesBackground(ctx);
            this._renderText(ctx);
            this._renderTextDecoration(ctx);
        },
        _renderText: function(ctx) {
            this._renderTextFill(ctx);
            this._renderTextStroke(ctx);
        },
        _setTextStyles: function(ctx) {
            ctx.textBaseline = "alphabetic";
            ctx.font = this._getFontDeclaration();
        },
        _getTextHeight: function() {
            return this._getHeightOfSingleLine() + (this._textLines.length - 1) * this._getHeightOfLine();
        },
        _getTextWidth: function(ctx) {
            var maxWidth = this._getLineWidth(ctx, 0);
            for (var i = 1, len = this._textLines.length; i < len; i++) {
                var currentLineWidth = this._getLineWidth(ctx, i);
                if (currentLineWidth > maxWidth) {
                    maxWidth = currentLineWidth;
                }
            }
            return maxWidth;
        },
        _renderChars: function(method, ctx, chars, left, top) {
            var shortM = method.slice(0, -4), _char, width;
            if (this[shortM].toLive) {
                var offsetX = -this.width / 2 + this[shortM].offsetX || 0, offsetY = -this.height / 2 + this[shortM].offsetY || 0;
                ctx.save();
                ctx.translate(offsetX, offsetY);
                left -= offsetX;
                top -= offsetY;
            }
            if (this.charSpacing !== 0) {
                var additionalSpace = this._getWidthOfCharSpacing();
                chars = chars.split("");
                for (var i = 0, len = chars.length; i < len; i++) {
                    _char = chars[i];
                    width = ctx.measureText(_char).width + additionalSpace;
                    ctx[method](_char, left, top);
                    left += width > 0 ? width : 0;
                }
            } else {
                ctx[method](chars, left, top);
            }
            this[shortM].toLive && ctx.restore();
        },
        _renderTextLine: function(method, ctx, line, left, top, lineIndex) {
            top -= this.fontSize * this._fontSizeFraction;
            var lineWidth = this._getLineWidth(ctx, lineIndex);
            if (this.textAlign !== "justify" || this.width < lineWidth) {
                this._renderChars(method, ctx, line, left, top, lineIndex);
                return;
            }
            var words = line.split(/\s+/), charOffset = 0, wordsWidth = this._getWidthOfWords(ctx, words.join(" "), lineIndex, 0), widthDiff = this.width - wordsWidth, numSpaces = words.length - 1, spaceWidth = numSpaces > 0 ? widthDiff / numSpaces : 0, leftOffset = 0, word;
            for (var i = 0, len = words.length; i < len; i++) {
                while (line[charOffset] === " " && charOffset < line.length) {
                    charOffset++;
                }
                word = words[i];
                this._renderChars(method, ctx, word, left + leftOffset, top, lineIndex, charOffset);
                leftOffset += this._getWidthOfWords(ctx, word, lineIndex, charOffset) + spaceWidth;
                charOffset += word.length;
            }
        },
        _getWidthOfWords: function(ctx, word) {
            var width = ctx.measureText(word).width, charCount, additionalSpace;
            if (this.charSpacing !== 0) {
                charCount = word.split("").length;
                additionalSpace = charCount * this._getWidthOfCharSpacing();
                width += additionalSpace;
            }
            return width > 0 ? width : 0;
        },
        _getLeftOffset: function() {
            return -this.width / 2;
        },
        _getTopOffset: function() {
            return -this.height / 2;
        },
        isEmptyStyles: function() {
            return true;
        },
        _renderTextCommon: function(ctx, method) {
            var lineHeights = 0, left = this._getLeftOffset(), top = this._getTopOffset();
            for (var i = 0, len = this._textLines.length; i < len; i++) {
                var heightOfLine = this._getHeightOfLine(ctx, i), maxHeight = heightOfLine / this.lineHeight, lineWidth = this._getLineWidth(ctx, i), leftOffset = this._getLineLeftOffset(lineWidth);
                this._renderTextLine(method, ctx, this._textLines[i], left + leftOffset, top + lineHeights + maxHeight, i);
                lineHeights += heightOfLine;
            }
        },
        _renderTextFill: function(ctx) {
            if (!this.fill && this.isEmptyStyles()) {
                return;
            }
            this._renderTextCommon(ctx, "fillText");
        },
        _renderTextStroke: function(ctx) {
            if ((!this.stroke || this.strokeWidth === 0) && this.isEmptyStyles()) {
                return;
            }
            if (this.shadow && !this.shadow.affectStroke) {
                this._removeShadow(ctx);
            }
            ctx.save();
            this._setLineDash(ctx, this.strokeDashArray);
            ctx.beginPath();
            this._renderTextCommon(ctx, "strokeText");
            ctx.closePath();
            ctx.restore();
        },
        _getHeightOfLine: function() {
            return this._getHeightOfSingleLine() * this.lineHeight;
        },
        _getHeightOfSingleLine: function() {
            return this.fontSize * this._fontSizeMult;
        },
        _renderTextLinesBackground: function(ctx) {
            if (!this.textBackgroundColor) {
                return;
            }
            var lineTopOffset = 0, heightOfLine, lineWidth, lineLeftOffset, originalFill = ctx.fillStyle;
            ctx.fillStyle = this.textBackgroundColor;
            for (var i = 0, len = this._textLines.length; i < len; i++) {
                heightOfLine = this._getHeightOfLine(ctx, i);
                lineWidth = this._getLineWidth(ctx, i);
                if (lineWidth > 0) {
                    lineLeftOffset = this._getLineLeftOffset(lineWidth);
                    ctx.fillRect(this._getLeftOffset() + lineLeftOffset, this._getTopOffset() + lineTopOffset, lineWidth, heightOfLine / this.lineHeight);
                }
                lineTopOffset += heightOfLine;
            }
            ctx.fillStyle = originalFill;
            this._removeShadow(ctx);
        },
        _getLineLeftOffset: function(lineWidth) {
            if (this.textAlign === "center") {
                return (this.width - lineWidth) / 2;
            }
            if (this.textAlign === "right") {
                return this.width - lineWidth;
            }
            return 0;
        },
        _clearCache: function() {
            this.__lineWidths = [];
            this.__lineHeights = [];
        },
        _shouldClearDimensionCache: function() {
            var shouldClear = this._forceClearCache;
            shouldClear || (shouldClear = this.hasStateChanged("_dimensionAffectingProps"));
            if (shouldClear) {
                this.saveState({
                    propertySet: "_dimensionAffectingProps"
                });
                this.dirty = true;
            }
            return shouldClear;
        },
        _getLineWidth: function(ctx, lineIndex) {
            if (this.__lineWidths[lineIndex]) {
                return this.__lineWidths[lineIndex] === -1 ? this.width : this.__lineWidths[lineIndex];
            }
            var width, wordCount, line = this._textLines[lineIndex];
            if (line === "") {
                width = 0;
            } else {
                width = this._measureLine(ctx, lineIndex);
            }
            this.__lineWidths[lineIndex] = width;
            if (width && this.textAlign === "justify") {
                wordCount = line.split(/\s+/);
                if (wordCount.length > 1) {
                    this.__lineWidths[lineIndex] = -1;
                }
            }
            return width;
        },
        _getWidthOfCharSpacing: function() {
            if (this.charSpacing !== 0) {
                return this.fontSize * this.charSpacing / 1e3;
            }
            return 0;
        },
        _measureLine: function(ctx, lineIndex) {
            var line = this._textLines[lineIndex], width = ctx.measureText(line).width, additionalSpace = 0, charCount, finalWidth;
            if (this.charSpacing !== 0) {
                charCount = line.split("").length;
                additionalSpace = (charCount - 1) * this._getWidthOfCharSpacing();
            }
            finalWidth = width + additionalSpace;
            return finalWidth > 0 ? finalWidth : 0;
        },
        _renderTextDecoration: function(ctx) {
            if (!this.textDecoration) {
                return;
            }
            var halfOfVerticalBox = this.height / 2, _this = this, offsets = [];
            function renderLinesAtOffset(offsets) {
                var i, lineHeight = 0, len, j, oLen, lineWidth, lineLeftOffset, heightOfLine;
                for (i = 0, len = _this._textLines.length; i < len; i++) {
                    lineWidth = _this._getLineWidth(ctx, i);
                    lineLeftOffset = _this._getLineLeftOffset(lineWidth);
                    heightOfLine = _this._getHeightOfLine(ctx, i);
                    for (j = 0, oLen = offsets.length; j < oLen; j++) {
                        ctx.fillRect(_this._getLeftOffset() + lineLeftOffset, lineHeight + (_this._fontSizeMult - 1 + offsets[j]) * _this.fontSize - halfOfVerticalBox, lineWidth, _this.fontSize / 15);
                    }
                    lineHeight += heightOfLine;
                }
            }
            if (this.textDecoration.indexOf("underline") > -1) {
                offsets.push(.85);
            }
            if (this.textDecoration.indexOf("line-through") > -1) {
                offsets.push(.43);
            }
            if (this.textDecoration.indexOf("overline") > -1) {
                offsets.push(-.12);
            }
            if (offsets.length > 0) {
                renderLinesAtOffset(offsets);
            }
        },
        _getFontDeclaration: function() {
            return [ fabric.isLikelyNode ? this.fontWeight : this.fontStyle, fabric.isLikelyNode ? this.fontStyle : this.fontWeight, this.fontSize + "px", fabric.isLikelyNode ? '"' + this.fontFamily + '"' : this.fontFamily ].join(" ");
        },
        render: function(ctx, noTransform) {
            if (!this.visible) {
                return;
            }
            if (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen()) {
                return;
            }
            if (this._shouldClearDimensionCache()) {
                this._setTextStyles(ctx);
                this._initDimensions(ctx);
            }
            this.callSuper("render", ctx, noTransform);
        },
        _splitTextIntoLines: function() {
            return this.text.split(this._reNewline);
        },
        toObject: function(propertiesToInclude) {
            var additionalProperties = [ "text", "fontSize", "fontWeight", "fontFamily", "fontStyle", "lineHeight", "textDecoration", "textAlign", "textBackgroundColor", "charSpacing" ].concat(propertiesToInclude);
            return this.callSuper("toObject", additionalProperties);
        },
        toSVG: function(reviver) {
            if (!this.ctx) {
                this.ctx = fabric.util.createCanvasElement().getContext("2d");
            }
            var markup = this._createBaseSVGMarkup(), offsets = this._getSVGLeftTopOffsets(this.ctx), textAndBg = this._getSVGTextAndBg(offsets.textTop, offsets.textLeft);
            this._wrapSVGTextAndBg(markup, textAndBg);
            return reviver ? reviver(markup.join("")) : markup.join("");
        },
        _getSVGLeftTopOffsets: function(ctx) {
            var lineTop = this._getHeightOfLine(ctx, 0), textLeft = -this.width / 2, textTop = 0;
            return {
                textLeft: textLeft + (this.group && this.group.type === "path-group" ? this.left : 0),
                textTop: textTop + (this.group && this.group.type === "path-group" ? -this.top : 0),
                lineTop: lineTop
            };
        },
        _wrapSVGTextAndBg: function(markup, textAndBg) {
            var noShadow = true, filter = this.getSvgFilter(), style = filter === "" ? "" : ' style="' + filter + '"';
            markup.push("\t<g ", this.getSvgId(), 'transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"', style, ">\n", textAndBg.textBgRects.join(""), '\t\t<text xml:space="preserve" ', this.fontFamily ? 'font-family="' + this.fontFamily.replace(/"/g, "'") + '" ' : "", this.fontSize ? 'font-size="' + this.fontSize + '" ' : "", this.fontStyle ? 'font-style="' + this.fontStyle + '" ' : "", this.fontWeight ? 'font-weight="' + this.fontWeight + '" ' : "", this.textDecoration ? 'text-decoration="' + this.textDecoration + '" ' : "", 'style="', this.getSvgStyles(noShadow), '" >\n', textAndBg.textSpans.join(""), "\t\t</text>\n", "\t</g>\n");
        },
        getSvgStyles: function(skipShadow) {
            var svgStyle = fabric.Object.prototype.getSvgStyles.call(this, skipShadow);
            return svgStyle + " white-space: pre;";
        },
        _getSVGTextAndBg: function(textTopOffset, textLeftOffset) {
            var textSpans = [], textBgRects = [], height = 0;
            this._setSVGBg(textBgRects);
            for (var i = 0, len = this._textLines.length; i < len; i++) {
                if (this.textBackgroundColor) {
                    this._setSVGTextLineBg(textBgRects, i, textLeftOffset, textTopOffset, height);
                }
                this._setSVGTextLineText(i, textSpans, height, textLeftOffset, textTopOffset, textBgRects);
                height += this._getHeightOfLine(this.ctx, i);
            }
            return {
                textSpans: textSpans,
                textBgRects: textBgRects
            };
        },
        _setSVGTextLineText: function(i, textSpans, height, textLeftOffset, textTopOffset) {
            var yPos = this.fontSize * (this._fontSizeMult - this._fontSizeFraction) - textTopOffset + height - this.height / 2;
            if (this.textAlign === "justify") {
                this._setSVGTextLineJustifed(i, textSpans, yPos, textLeftOffset);
                return;
            }
            textSpans.push('\t\t\t<tspan x="', toFixed(textLeftOffset + this._getLineLeftOffset(this._getLineWidth(this.ctx, i)), NUM_FRACTION_DIGITS), '" ', 'y="', toFixed(yPos, NUM_FRACTION_DIGITS), '" ', this._getFillAttributes(this.fill), ">", fabric.util.string.escapeXml(this._textLines[i]), "</tspan>\n");
        },
        _setSVGTextLineJustifed: function(i, textSpans, yPos, textLeftOffset) {
            var ctx = fabric.util.createCanvasElement().getContext("2d");
            this._setTextStyles(ctx);
            var line = this._textLines[i], words = line.split(/\s+/), wordsWidth = this._getWidthOfWords(ctx, words.join("")), widthDiff = this.width - wordsWidth, numSpaces = words.length - 1, spaceWidth = numSpaces > 0 ? widthDiff / numSpaces : 0, word, attributes = this._getFillAttributes(this.fill), len;
            textLeftOffset += this._getLineLeftOffset(this._getLineWidth(ctx, i));
            for (i = 0, len = words.length; i < len; i++) {
                word = words[i];
                textSpans.push('\t\t\t<tspan x="', toFixed(textLeftOffset, NUM_FRACTION_DIGITS), '" ', 'y="', toFixed(yPos, NUM_FRACTION_DIGITS), '" ', attributes, ">", fabric.util.string.escapeXml(word), "</tspan>\n");
                textLeftOffset += this._getWidthOfWords(ctx, word) + spaceWidth;
            }
        },
        _setSVGTextLineBg: function(textBgRects, i, textLeftOffset, textTopOffset, height) {
            textBgRects.push("\t\t<rect ", this._getFillAttributes(this.textBackgroundColor), ' x="', toFixed(textLeftOffset + this._getLineLeftOffset(this._getLineWidth(this.ctx, i)), NUM_FRACTION_DIGITS), '" y="', toFixed(height - this.height / 2, NUM_FRACTION_DIGITS), '" width="', toFixed(this._getLineWidth(this.ctx, i), NUM_FRACTION_DIGITS), '" height="', toFixed(this._getHeightOfLine(this.ctx, i) / this.lineHeight, NUM_FRACTION_DIGITS), '"></rect>\n');
        },
        _setSVGBg: function(textBgRects) {
            if (this.backgroundColor) {
                textBgRects.push("\t\t<rect ", this._getFillAttributes(this.backgroundColor), ' x="', toFixed(-this.width / 2, NUM_FRACTION_DIGITS), '" y="', toFixed(-this.height / 2, NUM_FRACTION_DIGITS), '" width="', toFixed(this.width, NUM_FRACTION_DIGITS), '" height="', toFixed(this.height, NUM_FRACTION_DIGITS), '"></rect>\n');
            }
        },
        _getFillAttributes: function(value) {
            var fillColor = value && typeof value === "string" ? new fabric.Color(value) : "";
            if (!fillColor || !fillColor.getSource() || fillColor.getAlpha() === 1) {
                return 'fill="' + value + '"';
            }
            return 'opacity="' + fillColor.getAlpha() + '" fill="' + fillColor.setAlpha(1).toRgb() + '"';
        },
        _set: function(key, value) {
            this.callSuper("_set", key, value);
            if (this._dimensionAffectingProps.indexOf(key) > -1) {
                this._initDimensions();
                this.setCoords();
            }
        },
        complexity: function() {
            return 1;
        }
    });
    fabric.Text.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat("x y dx dy font-family font-style font-weight font-size text-decoration text-anchor".split(" "));
    fabric.Text.DEFAULT_SVG_FONT_SIZE = 16;
    fabric.Text.fromElement = function(element, options) {
        if (!element) {
            return null;
        }
        var parsedAttributes = fabric.parseAttributes(element, fabric.Text.ATTRIBUTE_NAMES);
        options = fabric.util.object.extend(options ? fabric.util.object.clone(options) : {}, parsedAttributes);
        options.top = options.top || 0;
        options.left = options.left || 0;
        if ("dx" in parsedAttributes) {
            options.left += parsedAttributes.dx;
        }
        if ("dy" in parsedAttributes) {
            options.top += parsedAttributes.dy;
        }
        if (!("fontSize" in options)) {
            options.fontSize = fabric.Text.DEFAULT_SVG_FONT_SIZE;
        }
        if (!options.originX) {
            options.originX = "left";
        }
        var textContent = "";
        if (!("textContent" in element)) {
            if ("firstChild" in element && element.firstChild !== null) {
                if ("data" in element.firstChild && element.firstChild.data !== null) {
                    textContent = element.firstChild.data;
                }
            }
        } else {
            textContent = element.textContent;
        }
        textContent = textContent.replace(/^\s+|\s+$|\n+/g, "").replace(/\s+/g, " ");
        var text = new fabric.Text(textContent, options), textHeightScaleFactor = text.getHeight() / text.height, lineHeightDiff = (text.height + text.strokeWidth) * text.lineHeight - text.height, scaledDiff = lineHeightDiff * textHeightScaleFactor, textHeight = text.getHeight() + scaledDiff, offX = 0;
        if (text.originX === "left") {
            offX = text.getWidth() / 2;
        }
        if (text.originX === "right") {
            offX = -text.getWidth() / 2;
        }
        text.set({
            left: text.getLeft() + offX,
            top: text.getTop() - textHeight / 2 + text.fontSize * (.18 + text._fontSizeFraction) / text.lineHeight
        });
        return text;
    };
    fabric.Text.fromObject = function(object, callback, forceAsync) {
        return fabric.Object._fromObject("Text", object, callback, forceAsync, "text");
    };
    fabric.util.createAccessors(fabric.Text);
})(typeof exports !== "undefined" ? exports : this);

window.fabric = fabric;

if (typeof define === "function" && define.amd) {
    define([], function() {
        return fabric;
    });
}