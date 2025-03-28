import {
  invariant
} from "./chunk-KDZ7CXOI.js";
import {
  isPropValid,
  require_jsx_runtime,
  require_react_is
} from "./chunk-4MY5LQSP.js";
import {
  clsx_default
} from "./chunk-2KHBIA62.js";
import {
  require_hoist_non_react_statics_cjs
} from "./chunk-PGVUIIT6.js";
import {
  require_react
} from "./chunk-W5UAQKRE.js";
import {
  __commonJS,
  __export,
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __privateWrapper,
  __publicField,
  __toESM
} from "./chunk-OL46QLBJ.js";

// node_modules/shallowequal/index.js
var require_shallowequal = __commonJS({
  "node_modules/shallowequal/index.js"(exports, module) {
    module.exports = function shallowEqual(objA, objB, compare, compareContext) {
      var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
      if (ret !== void 0) {
        return !!ret;
      }
      if (objA === objB) {
        return true;
      }
      if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
        return false;
      }
      var keysA = Object.keys(objA);
      var keysB = Object.keys(objB);
      if (keysA.length !== keysB.length) {
        return false;
      }
      var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
      for (var idx = 0; idx < keysA.length; idx++) {
        var key = keysA[idx];
        if (!bHasOwnProperty(key)) {
          return false;
        }
        var valueA = objA[key];
        var valueB = objB[key];
        ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
        if (ret === false || ret === void 0 && valueA !== valueB) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/wl-msg-reader/lib/DataStream.js
var require_DataStream = __commonJS({
  "node_modules/wl-msg-reader/lib/DataStream.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports === "object") {
        module.exports = factory();
      } else {
        root.DataStream = factory();
      }
    })(exports, function() {
      var DataStream = function(arrayBuffer, byteOffset, endianness) {
        this._byteOffset = byteOffset || 0;
        if (arrayBuffer instanceof ArrayBuffer) {
          this.buffer = arrayBuffer;
        } else if (typeof arrayBuffer == "object") {
          this.dataView = arrayBuffer;
          if (byteOffset) {
            this._byteOffset += byteOffset;
          }
        } else {
          this.buffer = new ArrayBuffer(arrayBuffer || 1);
        }
        this.position = 0;
        this.endianness = endianness == null ? DataStream.LITTLE_ENDIAN : endianness;
      };
      DataStream.prototype = {};
      if (Uint8Array.prototype.BYTES_PER_ELEMENT === void 0) {
        Uint8Array.prototype.BYTES_PER_ELEMENT = Uint8Array.BYTES_PER_ELEMENT;
        Int8Array.prototype.BYTES_PER_ELEMENT = Int8Array.BYTES_PER_ELEMENT;
        Uint8ClampedArray.prototype.BYTES_PER_ELEMENT = Uint8ClampedArray.BYTES_PER_ELEMENT;
        Uint16Array.prototype.BYTES_PER_ELEMENT = Uint16Array.BYTES_PER_ELEMENT;
        Int16Array.prototype.BYTES_PER_ELEMENT = Int16Array.BYTES_PER_ELEMENT;
        Uint32Array.prototype.BYTES_PER_ELEMENT = Uint32Array.BYTES_PER_ELEMENT;
        Int32Array.prototype.BYTES_PER_ELEMENT = Int32Array.BYTES_PER_ELEMENT;
        Float64Array.prototype.BYTES_PER_ELEMENT = Float64Array.BYTES_PER_ELEMENT;
      }
      DataStream.prototype.save = function(filename) {
        var blob = new Blob(this.buffer);
        var URL2 = window.webkitURL || window.URL;
        if (URL2 && URL2.createObjectURL) {
          var url = URL2.createObjectURL(blob);
          var a2 = document.createElement("a");
          a2.setAttribute("href", url);
          a2.setAttribute("download", filename);
          a2.click();
          URL2.revokeObjectURL(url);
        } else {
          throw "DataStream.save: Can't create object URL.";
        }
      };
      DataStream.BIG_ENDIAN = false;
      DataStream.LITTLE_ENDIAN = true;
      DataStream.prototype._dynamicSize = true;
      Object.defineProperty(
        DataStream.prototype,
        "dynamicSize",
        {
          get: function() {
            return this._dynamicSize;
          },
          set: function(v2) {
            if (!v2) {
              this._trimAlloc();
            }
            this._dynamicSize = v2;
          }
        }
      );
      DataStream.prototype._byteLength = 0;
      Object.defineProperty(
        DataStream.prototype,
        "byteLength",
        {
          get: function() {
            return this._byteLength - this._byteOffset;
          }
        }
      );
      Object.defineProperty(
        DataStream.prototype,
        "buffer",
        {
          get: function() {
            this._trimAlloc();
            return this._buffer;
          },
          set: function(v2) {
            this._buffer = v2;
            this._dataView = new DataView(this._buffer, this._byteOffset);
            this._byteLength = this._buffer.byteLength;
          }
        }
      );
      Object.defineProperty(
        DataStream.prototype,
        "byteOffset",
        {
          get: function() {
            return this._byteOffset;
          },
          set: function(v2) {
            this._byteOffset = v2;
            this._dataView = new DataView(this._buffer, this._byteOffset);
            this._byteLength = this._buffer.byteLength;
          }
        }
      );
      Object.defineProperty(
        DataStream.prototype,
        "dataView",
        {
          get: function() {
            return this._dataView;
          },
          set: function(v2) {
            this._byteOffset = v2.byteOffset;
            this._buffer = v2.buffer;
            this._dataView = new DataView(this._buffer, this._byteOffset);
            this._byteLength = this._byteOffset + v2.byteLength;
          }
        }
      );
      DataStream.prototype._realloc = function(extra) {
        if (!this._dynamicSize) {
          return;
        }
        var req = this._byteOffset + this.position + extra;
        var blen = this._buffer.byteLength;
        if (req <= blen) {
          if (req > this._byteLength) {
            this._byteLength = req;
          }
          return;
        }
        if (blen < 1) {
          blen = 1;
        }
        while (req > blen) {
          blen *= 2;
        }
        var buf = new ArrayBuffer(blen);
        var src = new Uint8Array(this._buffer);
        var dst = new Uint8Array(buf, 0, src.length);
        dst.set(src);
        this.buffer = buf;
        this._byteLength = req;
      };
      DataStream.prototype._trimAlloc = function() {
        if (this._byteLength == this._buffer.byteLength) {
          return;
        }
        var buf = new ArrayBuffer(this._byteLength);
        var dst = new Uint8Array(buf);
        var src = new Uint8Array(this._buffer, 0, dst.length);
        dst.set(src);
        this.buffer = buf;
      };
      DataStream.prototype.seek = function(pos) {
        var npos = Math.max(0, Math.min(this.byteLength, pos));
        this.position = isNaN(npos) || !isFinite(npos) ? 0 : npos;
      };
      DataStream.prototype.isEof = function() {
        return this.position >= this.byteLength;
      };
      DataStream.prototype.mapInt32Array = function(length, e2) {
        this._realloc(length * 4);
        var arr = new Int32Array(this._buffer, this.byteOffset + this.position, length);
        DataStream.arrayToNative(arr, e2 == null ? this.endianness : e2);
        this.position += length * 4;
        return arr;
      };
      DataStream.prototype.mapInt16Array = function(length, e2) {
        this._realloc(length * 2);
        var arr = new Int16Array(this._buffer, this.byteOffset + this.position, length);
        DataStream.arrayToNative(arr, e2 == null ? this.endianness : e2);
        this.position += length * 2;
        return arr;
      };
      DataStream.prototype.mapInt8Array = function(length) {
        this._realloc(length * 1);
        var arr = new Int8Array(this._buffer, this.byteOffset + this.position, length);
        this.position += length * 1;
        return arr;
      };
      DataStream.prototype.mapUint32Array = function(length, e2) {
        this._realloc(length * 4);
        var arr = new Uint32Array(this._buffer, this.byteOffset + this.position, length);
        DataStream.arrayToNative(arr, e2 == null ? this.endianness : e2);
        this.position += length * 4;
        return arr;
      };
      DataStream.prototype.mapUint16Array = function(length, e2) {
        this._realloc(length * 2);
        var arr = new Uint16Array(this._buffer, this.byteOffset + this.position, length);
        DataStream.arrayToNative(arr, e2 == null ? this.endianness : e2);
        this.position += length * 2;
        return arr;
      };
      DataStream.prototype.mapUint8Array = function(length) {
        this._realloc(length * 1);
        var arr = new Uint8Array(this._buffer, this.byteOffset + this.position, length);
        this.position += length * 1;
        return arr;
      };
      DataStream.prototype.mapFloat64Array = function(length, e2) {
        this._realloc(length * 8);
        var arr = new Float64Array(this._buffer, this.byteOffset + this.position, length);
        DataStream.arrayToNative(arr, e2 == null ? this.endianness : e2);
        this.position += length * 8;
        return arr;
      };
      DataStream.prototype.mapFloat32Array = function(length, e2) {
        this._realloc(length * 4);
        var arr = new Float32Array(this._buffer, this.byteOffset + this.position, length);
        DataStream.arrayToNative(arr, e2 == null ? this.endianness : e2);
        this.position += length * 4;
        return arr;
      };
      DataStream.prototype.readInt32Array = function(length, e2) {
        length = length == null ? this.byteLength - this.position / 4 : length;
        var arr = new Int32Array(length);
        DataStream.memcpy(
          arr.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          length * arr.BYTES_PER_ELEMENT
        );
        DataStream.arrayToNative(arr, e2 == null ? this.endianness : e2);
        this.position += arr.byteLength;
        return arr;
      };
      DataStream.prototype.readInt16Array = function(length, e2) {
        length = length == null ? this.byteLength - this.position / 2 : length;
        var arr = new Int16Array(length);
        DataStream.memcpy(
          arr.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          length * arr.BYTES_PER_ELEMENT
        );
        DataStream.arrayToNative(arr, e2 == null ? this.endianness : e2);
        this.position += arr.byteLength;
        return arr;
      };
      DataStream.prototype.readInt8Array = function(length) {
        length = length == null ? this.byteLength - this.position : length;
        var arr = new Int8Array(length);
        DataStream.memcpy(
          arr.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          length * arr.BYTES_PER_ELEMENT
        );
        this.position += arr.byteLength;
        return arr;
      };
      DataStream.prototype.readUint32Array = function(length, e2) {
        length = length == null ? this.byteLength - this.position / 4 : length;
        var arr = new Uint32Array(length);
        DataStream.memcpy(
          arr.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          length * arr.BYTES_PER_ELEMENT
        );
        DataStream.arrayToNative(arr, e2 == null ? this.endianness : e2);
        this.position += arr.byteLength;
        return arr;
      };
      DataStream.prototype.readUint16Array = function(length, e2) {
        length = length == null ? this.byteLength - this.position / 2 : length;
        var arr = new Uint16Array(length);
        DataStream.memcpy(
          arr.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          length * arr.BYTES_PER_ELEMENT
        );
        DataStream.arrayToNative(arr, e2 == null ? this.endianness : e2);
        this.position += arr.byteLength;
        return arr;
      };
      DataStream.prototype.readUint8Array = function(length) {
        length = length == null ? this.byteLength - this.position : length;
        var arr = new Uint8Array(length);
        DataStream.memcpy(
          arr.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          length * arr.BYTES_PER_ELEMENT
        );
        this.position += arr.byteLength;
        return arr;
      };
      DataStream.prototype.readFloat64Array = function(length, e2) {
        length = length == null ? this.byteLength - this.position / 8 : length;
        var arr = new Float64Array(length);
        DataStream.memcpy(
          arr.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          length * arr.BYTES_PER_ELEMENT
        );
        DataStream.arrayToNative(arr, e2 == null ? this.endianness : e2);
        this.position += arr.byteLength;
        return arr;
      };
      DataStream.prototype.readFloat32Array = function(length, e2) {
        length = length == null ? this.byteLength - this.position / 4 : length;
        var arr = new Float32Array(length);
        DataStream.memcpy(
          arr.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          length * arr.BYTES_PER_ELEMENT
        );
        DataStream.arrayToNative(arr, e2 == null ? this.endianness : e2);
        this.position += arr.byteLength;
        return arr;
      };
      DataStream.prototype.writeInt32Array = function(arr, e2) {
        this._realloc(arr.length * 4);
        if (arr instanceof Int32Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT == 0) {
          DataStream.memcpy(
            this._buffer,
            this.byteOffset + this.position,
            arr.buffer,
            0,
            arr.byteLength
          );
          this.mapInt32Array(arr.length, e2);
        } else {
          for (var i2 = 0; i2 < arr.length; i2++) {
            this.writeInt32(arr[i2], e2);
          }
        }
      };
      DataStream.prototype.writeInt16Array = function(arr, e2) {
        this._realloc(arr.length * 2);
        if (arr instanceof Int16Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT == 0) {
          DataStream.memcpy(
            this._buffer,
            this.byteOffset + this.position,
            arr.buffer,
            0,
            arr.byteLength
          );
          this.mapInt16Array(arr.length, e2);
        } else {
          for (var i2 = 0; i2 < arr.length; i2++) {
            this.writeInt16(arr[i2], e2);
          }
        }
      };
      DataStream.prototype.writeInt8Array = function(arr) {
        this._realloc(arr.length * 1);
        if (arr instanceof Int8Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT == 0) {
          DataStream.memcpy(
            this._buffer,
            this.byteOffset + this.position,
            arr.buffer,
            0,
            arr.byteLength
          );
          this.mapInt8Array(arr.length);
        } else {
          for (var i2 = 0; i2 < arr.length; i2++) {
            this.writeInt8(arr[i2]);
          }
        }
      };
      DataStream.prototype.writeUint32Array = function(arr, e2) {
        this._realloc(arr.length * 4);
        if (arr instanceof Uint32Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT == 0) {
          DataStream.memcpy(
            this._buffer,
            this.byteOffset + this.position,
            arr.buffer,
            0,
            arr.byteLength
          );
          this.mapUint32Array(arr.length, e2);
        } else {
          for (var i2 = 0; i2 < arr.length; i2++) {
            this.writeUint32(arr[i2], e2);
          }
        }
      };
      DataStream.prototype.writeUint16Array = function(arr, e2) {
        this._realloc(arr.length * 2);
        if (arr instanceof Uint16Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT == 0) {
          DataStream.memcpy(
            this._buffer,
            this.byteOffset + this.position,
            arr.buffer,
            0,
            arr.byteLength
          );
          this.mapUint16Array(arr.length, e2);
        } else {
          for (var i2 = 0; i2 < arr.length; i2++) {
            this.writeUint16(arr[i2], e2);
          }
        }
      };
      DataStream.prototype.writeUint8Array = function(arr) {
        this._realloc(arr.length * 1);
        if (arr instanceof Uint8Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT == 0) {
          DataStream.memcpy(
            this._buffer,
            this.byteOffset + this.position,
            arr.buffer,
            0,
            arr.byteLength
          );
          this.mapUint8Array(arr.length);
        } else {
          for (var i2 = 0; i2 < arr.length; i2++) {
            this.writeUint8(arr[i2]);
          }
        }
      };
      DataStream.prototype.writeFloat64Array = function(arr, e2) {
        this._realloc(arr.length * 8);
        if (arr instanceof Float64Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT == 0) {
          DataStream.memcpy(
            this._buffer,
            this.byteOffset + this.position,
            arr.buffer,
            0,
            arr.byteLength
          );
          this.mapFloat64Array(arr.length, e2);
        } else {
          for (var i2 = 0; i2 < arr.length; i2++) {
            this.writeFloat64(arr[i2], e2);
          }
        }
      };
      DataStream.prototype.writeFloat32Array = function(arr, e2) {
        this._realloc(arr.length * 4);
        if (arr instanceof Float32Array && this.byteOffset + this.position % arr.BYTES_PER_ELEMENT == 0) {
          DataStream.memcpy(
            this._buffer,
            this.byteOffset + this.position,
            arr.buffer,
            0,
            arr.byteLength
          );
          this.mapFloat32Array(arr.length, e2);
        } else {
          for (var i2 = 0; i2 < arr.length; i2++) {
            this.writeFloat32(arr[i2], e2);
          }
        }
      };
      DataStream.prototype.readInt32 = function(e2) {
        var v2 = this._dataView.getInt32(this.position, e2 == null ? this.endianness : e2);
        this.position += 4;
        return v2;
      };
      DataStream.prototype.readInt = function(offset) {
        this.seek(offset);
        return this.readInt32();
      };
      DataStream.prototype.readInt16 = function(e2) {
        var v2 = this._dataView.getInt16(this.position, e2 == null ? this.endianness : e2);
        this.position += 2;
        return v2;
      };
      DataStream.prototype.readShort = function(offset) {
        this.seek(offset);
        return this.readInt16();
      };
      DataStream.prototype.readInt8 = function() {
        var v2 = this._dataView.getInt8(this.position);
        this.position += 1;
        return v2;
      };
      DataStream.prototype.readByte = function(offset) {
        this.seek(offset);
        return this.readInt8();
      };
      DataStream.prototype.readUint32 = function(e2) {
        var v2 = this._dataView.getUint32(this.position, e2 == null ? this.endianness : e2);
        this.position += 4;
        return v2;
      };
      DataStream.prototype.readUint16 = function(e2) {
        var v2 = this._dataView.getUint16(this.position, e2 == null ? this.endianness : e2);
        this.position += 2;
        return v2;
      };
      DataStream.prototype.readUint8 = function() {
        var v2 = this._dataView.getUint8(this.position);
        this.position += 1;
        return v2;
      };
      DataStream.prototype.readFloat32 = function(e2) {
        var v2 = this._dataView.getFloat32(this.position, e2 == null ? this.endianness : e2);
        this.position += 4;
        return v2;
      };
      DataStream.prototype.readFloat64 = function(e2) {
        var v2 = this._dataView.getFloat64(this.position, e2 == null ? this.endianness : e2);
        this.position += 8;
        return v2;
      };
      DataStream.prototype.writeInt32 = function(v2, e2) {
        this._realloc(4);
        this._dataView.setInt32(this.position, v2, e2 == null ? this.endianness : e2);
        this.position += 4;
      };
      DataStream.prototype.writeInt16 = function(v2, e2) {
        this._realloc(2);
        this._dataView.setInt16(this.position, v2, e2 == null ? this.endianness : e2);
        this.position += 2;
      };
      DataStream.prototype.writeInt8 = function(v2) {
        this._realloc(1);
        this._dataView.setInt8(this.position, v2);
        this.position += 1;
      };
      DataStream.prototype.writeUint32 = function(v2, e2) {
        this._realloc(4);
        this._dataView.setUint32(this.position, v2, e2 == null ? this.endianness : e2);
        this.position += 4;
      };
      DataStream.prototype.writeUint16 = function(v2, e2) {
        this._realloc(2);
        this._dataView.setUint16(this.position, v2, e2 == null ? this.endianness : e2);
        this.position += 2;
      };
      DataStream.prototype.writeUint8 = function(v2) {
        this._realloc(1);
        this._dataView.setUint8(this.position, v2);
        this.position += 1;
      };
      DataStream.prototype.writeFloat32 = function(v2, e2) {
        this._realloc(4);
        this._dataView.setFloat32(this.position, v2, e2 == null ? this.endianness : e2);
        this.position += 4;
      };
      DataStream.prototype.writeFloat64 = function(v2, e2) {
        this._realloc(8);
        this._dataView.setFloat64(this.position, v2, e2 == null ? this.endianness : e2);
        this.position += 8;
      };
      DataStream.endianness = new Int8Array(new Int16Array([1]).buffer)[0] > 0;
      DataStream.memcpy = function(dst, dstOffset, src, srcOffset, byteLength) {
        var dstU8 = new Uint8Array(dst, dstOffset, byteLength);
        var srcU8 = new Uint8Array(src, srcOffset, byteLength);
        dstU8.set(srcU8);
      };
      DataStream.arrayToNative = function(array, arrayIsLittleEndian) {
        if (arrayIsLittleEndian == this.endianness) {
          return array;
        } else {
          return this.flipArrayEndianness(array);
        }
      };
      DataStream.nativeToEndian = function(array, littleEndian2) {
        if (this.endianness == littleEndian2) {
          return array;
        } else {
          return this.flipArrayEndianness(array);
        }
      };
      DataStream.flipArrayEndianness = function(array) {
        var u8 = new Uint8Array(array.buffer, array.byteOffset, array.byteLength);
        for (var i2 = 0; i2 < array.byteLength; i2 += array.BYTES_PER_ELEMENT) {
          for (var j2 = i2 + array.BYTES_PER_ELEMENT - 1, k2 = i2; j2 > k2; j2--, k2++) {
            var tmp = u8[k2];
            u8[k2] = u8[j2];
            u8[j2] = tmp;
          }
        }
        return array;
      };
      DataStream.createStringFromArray = function(array) {
        var str = "";
        for (var i2 = 0; i2 < array.length; i2++) {
          str += String.fromCharCode(array[i2]);
        }
        return str;
      };
      DataStream.prototype.failurePosition = 0;
      DataStream.prototype.readStruct = function(structDefinition) {
        var struct = {}, t2, v2, n2;
        var p = this.position;
        for (var i2 = 0; i2 < structDefinition.length; i2 += 2) {
          t2 = structDefinition[i2 + 1];
          v2 = this.readType(t2, struct);
          if (v2 == null) {
            if (this.failurePosition == 0) {
              this.failurePosition = this.position;
            }
            this.position = p;
            return null;
          }
          struct[structDefinition[i2]] = v2;
        }
        return struct;
      };
      DataStream.prototype.readUCS2String = function(length, endianness) {
        return DataStream.createStringFromArray(this.readUint16Array(length, endianness));
      };
      DataStream.prototype.readStringAt = function(offset, length) {
        this.seek(offset);
        return this.readUCS2String(length);
      };
      DataStream.prototype.writeUCS2String = function(str, endianness, lengthOverride) {
        if (lengthOverride == null) {
          lengthOverride = str.length;
        }
        for (var i2 = 0; i2 < str.length && i2 < lengthOverride; i2++) {
          this.writeUint16(str.charCodeAt(i2), endianness);
        }
        for (; i2 < lengthOverride; i2++) {
          this.writeUint16(0);
        }
      };
      DataStream.prototype.readString = function(length, encoding) {
        if (encoding == null || encoding == "ASCII") {
          return DataStream.createStringFromArray(this.mapUint8Array(length == null ? this.byteLength - this.position : length));
        } else {
          return new TextDecoder(encoding).decode(this.mapUint8Array(length));
        }
      };
      DataStream.prototype.writeString = function(s2, encoding, length) {
        if (encoding == null || encoding == "ASCII") {
          if (length != null) {
            var i2 = 0;
            var len = Math.min(s2.length, length);
            for (i2 = 0; i2 < len; i2++) {
              this.writeUint8(s2.charCodeAt(i2));
            }
            for (; i2 < length; i2++) {
              this.writeUint8(0);
            }
          } else {
            for (var i2 = 0; i2 < s2.length; i2++) {
              this.writeUint8(s2.charCodeAt(i2));
            }
          }
        } else {
          this.writeUint8Array(new TextEncoder(encoding).encode(s2.substring(0, length)));
        }
      };
      DataStream.prototype.readCString = function(length) {
        var blen = this.byteLength - this.position;
        var u8 = new Uint8Array(this._buffer, this._byteOffset + this.position);
        var len = blen;
        if (length != null) {
          len = Math.min(length, blen);
        }
        for (var i2 = 0; i2 < len && u8[i2] != 0; i2++) ;
        var s2 = DataStream.createStringFromArray(this.mapUint8Array(i2));
        if (length != null) {
          this.position += len - i2;
        } else if (i2 != blen) {
          this.position += 1;
        }
        return s2;
      };
      DataStream.prototype.writeCString = function(s2, length) {
        if (length != null) {
          var i2 = 0;
          var len = Math.min(s2.length, length);
          for (i2 = 0; i2 < len; i2++) {
            this.writeUint8(s2.charCodeAt(i2));
          }
          for (; i2 < length; i2++) {
            this.writeUint8(0);
          }
        } else {
          for (var i2 = 0; i2 < s2.length; i2++) {
            this.writeUint8(s2.charCodeAt(i2));
          }
          this.writeUint8(0);
        }
      };
      DataStream.prototype.readType = function(t2, struct) {
        if (typeof t2 == "function") {
          return t2(this, struct);
        } else if (typeof t2 == "object" && !(t2 instanceof Array)) {
          return t2.get(this, struct);
        } else if (t2 instanceof Array && t2.length != 3) {
          return this.readStruct(t2, struct);
        }
        var v2 = null;
        var lengthOverride = null;
        var charset = "ASCII";
        var pos = this.position;
        var len;
        if (typeof t2 == "string" && /:/.test(t2)) {
          var tp = t2.split(":");
          t2 = tp[0];
          len = tp[1];
          if (struct[len] != null) {
            lengthOverride = parseInt(struct[len]);
          } else {
            lengthOverride = parseInt(tp[1]);
          }
        }
        if (typeof t2 == "string" && /,/.test(t2)) {
          var tp = t2.split(",");
          t2 = tp[0];
          charset = parseInt(tp[1]);
        }
        switch (t2) {
          case "uint8":
            v2 = this.readUint8();
            break;
          case "int8":
            v2 = this.readInt8();
            break;
          case "uint16":
            v2 = this.readUint16(this.endianness);
            break;
          case "int16":
            v2 = this.readInt16(this.endianness);
            break;
          case "uint32":
            v2 = this.readUint32(this.endianness);
            break;
          case "int32":
            v2 = this.readInt32(this.endianness);
            break;
          case "float32":
            v2 = this.readFloat32(this.endianness);
            break;
          case "float64":
            v2 = this.readFloat64(this.endianness);
            break;
          case "uint16be":
            v2 = this.readUint16(DataStream.BIG_ENDIAN);
            break;
          case "int16be":
            v2 = this.readInt16(DataStream.BIG_ENDIAN);
            break;
          case "uint32be":
            v2 = this.readUint32(DataStream.BIG_ENDIAN);
            break;
          case "int32be":
            v2 = this.readInt32(DataStream.BIG_ENDIAN);
            break;
          case "float32be":
            v2 = this.readFloat32(DataStream.BIG_ENDIAN);
            break;
          case "float64be":
            v2 = this.readFloat64(DataStream.BIG_ENDIAN);
            break;
          case "uint16le":
            v2 = this.readUint16(DataStream.LITTLE_ENDIAN);
            break;
          case "int16le":
            v2 = this.readInt16(DataStream.LITTLE_ENDIAN);
            break;
          case "uint32le":
            v2 = this.readUint32(DataStream.LITTLE_ENDIAN);
            break;
          case "int32le":
            v2 = this.readInt32(DataStream.LITTLE_ENDIAN);
            break;
          case "float32le":
            v2 = this.readFloat32(DataStream.LITTLE_ENDIAN);
            break;
          case "float64le":
            v2 = this.readFloat64(DataStream.LITTLE_ENDIAN);
            break;
          case "cstring":
            v2 = this.readCString(lengthOverride);
            break;
          case "string":
            v2 = this.readString(lengthOverride, charset);
            break;
          case "u16string":
            v2 = this.readUCS2String(lengthOverride, this.endianness);
            break;
          case "u16stringle":
            v2 = this.readUCS2String(lengthOverride, DataStream.LITTLE_ENDIAN);
            break;
          case "u16stringbe":
            v2 = this.readUCS2String(lengthOverride, DataStream.BIG_ENDIAN);
            break;
          default:
            if (t2.length == 3) {
              var ta = t2[1];
              var len = t2[2];
              var length = 0;
              if (typeof len == "function") {
                length = len(struct, this, t2);
              } else if (typeof len == "string" && struct[len] != null) {
                length = parseInt(struct[len]);
              } else {
                length = parseInt(len);
              }
              if (typeof ta == "string") {
                var tap = ta.replace(/(le|be)$/, "");
                var endianness = null;
                if (/le$/.test(ta)) {
                  endianness = DataStream.LITTLE_ENDIAN;
                } else if (/be$/.test(ta)) {
                  endianness = DataStream.BIG_ENDIAN;
                }
                if (len == "*") {
                  length = null;
                }
                switch (tap) {
                  case "uint8":
                    v2 = this.readUint8Array(length);
                    break;
                  case "uint16":
                    v2 = this.readUint16Array(length, endianness);
                    break;
                  case "uint32":
                    v2 = this.readUint32Array(length, endianness);
                    break;
                  case "int8":
                    v2 = this.readInt8Array(length);
                    break;
                  case "int16":
                    v2 = this.readInt16Array(length, endianness);
                    break;
                  case "int32":
                    v2 = this.readInt32Array(length, endianness);
                    break;
                  case "float32":
                    v2 = this.readFloat32Array(length, endianness);
                    break;
                  case "float64":
                    v2 = this.readFloat64Array(length, endianness);
                    break;
                  case "cstring":
                  case "utf16string":
                  case "string":
                    if (length == null) {
                      v2 = [];
                      while (!this.isEof()) {
                        var u2 = this.readType(ta, struct);
                        if (u2 == null) break;
                        v2.push(u2);
                      }
                    } else {
                      v2 = new Array(length);
                      for (var i2 = 0; i2 < length; i2++) {
                        v2[i2] = this.readType(ta, struct);
                      }
                    }
                    break;
                }
              } else {
                if (len == "*") {
                  v2 = [];
                  this.buffer;
                  while (true) {
                    var p = this.position;
                    try {
                      var o2 = this.readType(ta, struct);
                      if (o2 == null) {
                        this.position = p;
                        break;
                      }
                      v2.push(o2);
                    } catch (e2) {
                      this.position = p;
                      break;
                    }
                  }
                } else {
                  v2 = new Array(length);
                  for (var i2 = 0; i2 < length; i2++) {
                    var u2 = this.readType(ta, struct);
                    if (u2 == null) return null;
                    v2[i2] = u2;
                  }
                }
              }
              break;
            }
        }
        if (lengthOverride != null) {
          this.position = pos + lengthOverride;
        }
        return v2;
      };
      DataStream.prototype.writeStruct = function(structDefinition, struct) {
        for (var i2 = 0; i2 < structDefinition.length; i2 += 2) {
          var t2 = structDefinition[i2 + 1];
          this.writeType(t2, struct[structDefinition[i2]], struct);
        }
      };
      DataStream.prototype.writeType = function(t2, v2, struct) {
        if (typeof t2 == "function") {
          return t2(this, v2);
        } else if (typeof t2 == "object" && !(t2 instanceof Array)) {
          return t2.set(this, v2, struct);
        }
        var lengthOverride = null;
        var charset = "ASCII";
        var pos = this.position;
        if (typeof t2 == "string" && /:/.test(t2)) {
          var tp = t2.split(":");
          t2 = tp[0];
          lengthOverride = parseInt(tp[1]);
        }
        if (typeof t2 == "string" && /,/.test(t2)) {
          var tp = t2.split(",");
          t2 = tp[0];
          charset = parseInt(tp[1]);
        }
        switch (t2) {
          case "uint8":
            this.writeUint8(v2);
            break;
          case "int8":
            this.writeInt8(v2);
            break;
          case "uint16":
            this.writeUint16(v2, this.endianness);
            break;
          case "int16":
            this.writeInt16(v2, this.endianness);
            break;
          case "uint32":
            this.writeUint32(v2, this.endianness);
            break;
          case "int32":
            this.writeInt32(v2, this.endianness);
            break;
          case "float32":
            this.writeFloat32(v2, this.endianness);
            break;
          case "float64":
            this.writeFloat64(v2, this.endianness);
            break;
          case "uint16be":
            this.writeUint16(v2, DataStream.BIG_ENDIAN);
            break;
          case "int16be":
            this.writeInt16(v2, DataStream.BIG_ENDIAN);
            break;
          case "uint32be":
            this.writeUint32(v2, DataStream.BIG_ENDIAN);
            break;
          case "int32be":
            this.writeInt32(v2, DataStream.BIG_ENDIAN);
            break;
          case "float32be":
            this.writeFloat32(v2, DataStream.BIG_ENDIAN);
            break;
          case "float64be":
            this.writeFloat64(v2, DataStream.BIG_ENDIAN);
            break;
          case "uint16le":
            this.writeUint16(v2, DataStream.LITTLE_ENDIAN);
            break;
          case "int16le":
            this.writeInt16(v2, DataStream.LITTLE_ENDIAN);
            break;
          case "uint32le":
            this.writeUint32(v2, DataStream.LITTLE_ENDIAN);
            break;
          case "int32le":
            this.writeInt32(v2, DataStream.LITTLE_ENDIAN);
            break;
          case "float32le":
            this.writeFloat32(v2, DataStream.LITTLE_ENDIAN);
            break;
          case "float64le":
            this.writeFloat64(v2, DataStream.LITTLE_ENDIAN);
            break;
          case "cstring":
            this.writeCString(v2, lengthOverride);
            break;
          case "string":
            this.writeString(v2, charset, lengthOverride);
            break;
          case "u16string":
            this.writeUCS2String(v2, this.endianness, lengthOverride);
            break;
          case "u16stringle":
            this.writeUCS2String(v2, DataStream.LITTLE_ENDIAN, lengthOverride);
            break;
          case "u16stringbe":
            this.writeUCS2String(v2, DataStream.BIG_ENDIAN, lengthOverride);
            break;
          default:
            if (t2.length == 3) {
              var ta = t2[1];
              for (var i2 = 0; i2 < v2.length; i2++) {
                this.writeType(ta, v2[i2]);
              }
              break;
            } else {
              this.writeStruct(t2, v2);
              break;
            }
        }
        if (lengthOverride != null) {
          this.position = pos;
          this._realloc(lengthOverride);
          this.position = pos + lengthOverride;
        }
      };
      return DataStream;
    });
  }
});

// node_modules/wl-msg-reader/lib/msg.reader.js
var require_msg_reader = __commonJS({
  "node_modules/wl-msg-reader/lib/msg.reader.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(["./DataStream"], factory);
      } else if (typeof exports === "object") {
        module.exports = factory(require_DataStream());
      } else {
        root.MSGReader = factory(root.DataStream);
      }
    })(exports, function(DataStream) {
      var CONST = {
        FILE_HEADER: uInt2int([208, 207, 17, 224, 161, 177, 26, 225]),
        MSG: {
          UNUSED_BLOCK: -1,
          END_OF_CHAIN: -2,
          S_BIG_BLOCK_SIZE: 512,
          S_BIG_BLOCK_MARK: 9,
          L_BIG_BLOCK_SIZE: 4096,
          L_BIG_BLOCK_MARK: 12,
          SMALL_BLOCK_SIZE: 64,
          BIG_BLOCK_MIN_DOC_SIZE: 4096,
          HEADER: {
            PROPERTY_START_OFFSET: 48,
            BAT_START_OFFSET: 76,
            BAT_COUNT_OFFSET: 44,
            SBAT_START_OFFSET: 60,
            SBAT_COUNT_OFFSET: 64,
            XBAT_START_OFFSET: 68,
            XBAT_COUNT_OFFSET: 72
          },
          PROP: {
            NO_INDEX: -1,
            PROPERTY_SIZE: 128,
            NAME_SIZE_OFFSET: 64,
            MAX_NAME_LENGTH: (
              /*NAME_SIZE_OFFSET*/
              64 / 2 - 1
            ),
            TYPE_OFFSET: 66,
            PREVIOUS_PROPERTY_OFFSET: 68,
            NEXT_PROPERTY_OFFSET: 72,
            CHILD_PROPERTY_OFFSET: 76,
            START_BLOCK_OFFSET: 116,
            SIZE_OFFSET: 120,
            TYPE_ENUM: {
              DIRECTORY: 1,
              DOCUMENT: 2,
              ROOT: 5
            }
          },
          FIELD: {
            PREFIX: {
              ATTACHMENT: "__attach_version1.0",
              RECIPIENT: "__recip_version1.0",
              DOCUMENT: "__substg1."
            },
            // example (use fields as needed)
            NAME_MAPPING: {
              // email specific
              "0037": "subject",
              "0c1a": "senderName",
              "5d02": "senderEmail",
              "1000": "body",
              "007d": "headers",
              // attachment specific
              "3703": "extension",
              "3704": "fileNameShort",
              "3707": "fileName",
              "3712": "pidContentId",
              // recipient specific
              "3001": "name",
              "39fe": "email"
            },
            CLASS_MAPPING: {
              ATTACHMENT_DATA: "3701"
            },
            TYPE_MAPPING: {
              "001e": "string",
              "001f": "unicode",
              "0102": "binary"
            },
            DIR_TYPE: {
              INNER_MSG: "000d"
            }
          }
        }
      };
      function arraysEqual(a2, b2) {
        if (a2 === b2) return true;
        if (a2 == null || b2 == null) return false;
        if (a2.length != b2.length) return false;
        for (var i2 = 0; i2 < a2.length; i2++) {
          if (a2[i2] !== b2[i2]) return false;
        }
        return true;
      }
      function uInt2int(data) {
        var result = new Array(data.length);
        for (var i2 = 0; i2 < data.length; i2++) {
          result[i2] = data[i2] << 24 >> 24;
        }
        return result;
      }
      function isMSGFile(ds) {
        ds.seek(0);
        return arraysEqual(CONST.FILE_HEADER, ds.readInt8Array(CONST.FILE_HEADER.length));
      }
      function getBlockOffsetAt(msgData, offset) {
        return (offset + 1) * msgData.bigBlockSize;
      }
      function getBlockAt(ds, msgData, offset) {
        var startOffset = getBlockOffsetAt(msgData, offset);
        ds.seek(startOffset);
        return ds.readInt32Array(msgData.bigBlockLength);
      }
      function getNextBlockInner(ds, msgData, offset, blockOffsetData) {
        var currentBlock = Math.floor(offset / msgData.bigBlockLength);
        var currentBlockIndex = offset % msgData.bigBlockLength;
        var startBlockOffset = blockOffsetData[currentBlock];
        return getBlockAt(ds, msgData, startBlockOffset)[currentBlockIndex];
      }
      function getNextBlock(ds, msgData, offset) {
        return getNextBlockInner(ds, msgData, offset, msgData.batData);
      }
      function getNextBlockSmall(ds, msgData, offset) {
        return getNextBlockInner(ds, msgData, offset, msgData.sbatData);
      }
      function parseMsgData(ds) {
        var msgData = headerData(ds);
        msgData.batData = batData(ds, msgData);
        msgData.sbatData = sbatData(ds, msgData);
        if (msgData.xbatCount > 0) {
          xbatData(ds, msgData);
        }
        msgData.propertyData = propertyData(ds, msgData);
        msgData.fieldsData = fieldsData(ds, msgData);
        return msgData;
      }
      function headerData(ds) {
        var headerData2 = {};
        headerData2.bigBlockSize = ds.readByte(
          /*const position*/
          30
        ) == CONST.MSG.L_BIG_BLOCK_MARK ? CONST.MSG.L_BIG_BLOCK_SIZE : CONST.MSG.S_BIG_BLOCK_SIZE;
        headerData2.bigBlockLength = headerData2.bigBlockSize / 4;
        headerData2.xBlockLength = headerData2.bigBlockLength - 1;
        headerData2.batCount = ds.readInt(CONST.MSG.HEADER.BAT_COUNT_OFFSET);
        headerData2.propertyStart = ds.readInt(CONST.MSG.HEADER.PROPERTY_START_OFFSET);
        headerData2.sbatStart = ds.readInt(CONST.MSG.HEADER.SBAT_START_OFFSET);
        headerData2.sbatCount = ds.readInt(CONST.MSG.HEADER.SBAT_COUNT_OFFSET);
        headerData2.xbatStart = ds.readInt(CONST.MSG.HEADER.XBAT_START_OFFSET);
        headerData2.xbatCount = ds.readInt(CONST.MSG.HEADER.XBAT_COUNT_OFFSET);
        return headerData2;
      }
      function batCountInHeader(msgData) {
        var maxBatsInHeader = (CONST.MSG.S_BIG_BLOCK_SIZE - CONST.MSG.HEADER.BAT_START_OFFSET) / 4;
        return Math.min(msgData.batCount, maxBatsInHeader);
      }
      function batData(ds, msgData) {
        var result = new Array(batCountInHeader(msgData));
        ds.seek(CONST.MSG.HEADER.BAT_START_OFFSET);
        for (var i2 = 0; i2 < result.length; i2++) {
          result[i2] = ds.readInt32();
        }
        return result;
      }
      function sbatData(ds, msgData) {
        var result = [];
        var startIndex = msgData.sbatStart;
        for (var i2 = 0; i2 < msgData.sbatCount && startIndex != CONST.MSG.END_OF_CHAIN; i2++) {
          result.push(startIndex);
          startIndex = getNextBlock(ds, msgData, startIndex);
        }
        return result;
      }
      function xbatData(ds, msgData) {
        var batCount = batCountInHeader(msgData);
        var batCountTotal = msgData.batCount;
        var remainingBlocks = batCountTotal - batCount;
        var nextBlockAt = msgData.xbatStart;
        for (var i2 = 0; i2 < msgData.xbatCount; i2++) {
          var xBatBlock = getBlockAt(ds, msgData, nextBlockAt);
          nextBlockAt = xBatBlock[msgData.xBlockLength];
          var blocksToProcess = Math.min(remainingBlocks, msgData.xBlockLength);
          for (var j2 = 0; j2 < blocksToProcess; j2++) {
            var blockStartAt = xBatBlock[j2];
            if (blockStartAt == CONST.MSG.UNUSED_BLOCK || blockStartAt == CONST.MSG.END_OF_CHAIN) {
              break;
            }
            msgData.batData.push(blockStartAt);
          }
          remainingBlocks -= blocksToProcess;
        }
      }
      function propertyData(ds, msgData) {
        var props = [];
        var currentOffset = msgData.propertyStart;
        while (currentOffset != CONST.MSG.END_OF_CHAIN) {
          convertBlockToProperties(ds, msgData, currentOffset, props);
          currentOffset = getNextBlock(ds, msgData, currentOffset);
        }
        createPropertyHierarchy(
          props,
          /*property with index 0 (zero) always as root*/
          props[0]
        );
        return props;
      }
      function convertName(ds, offset) {
        var nameLength = ds.readShort(offset + CONST.MSG.PROP.NAME_SIZE_OFFSET);
        if (nameLength < 1) {
          return "";
        } else {
          return ds.readStringAt(offset, nameLength / 2);
        }
      }
      function convertProperty(ds, index, offset) {
        return {
          index,
          type: ds.readByte(offset + CONST.MSG.PROP.TYPE_OFFSET),
          name: convertName(ds, offset),
          // hierarchy
          previousProperty: ds.readInt(offset + CONST.MSG.PROP.PREVIOUS_PROPERTY_OFFSET),
          nextProperty: ds.readInt(offset + CONST.MSG.PROP.NEXT_PROPERTY_OFFSET),
          childProperty: ds.readInt(offset + CONST.MSG.PROP.CHILD_PROPERTY_OFFSET),
          // data offset
          startBlock: ds.readInt(offset + CONST.MSG.PROP.START_BLOCK_OFFSET),
          sizeBlock: ds.readInt(offset + CONST.MSG.PROP.SIZE_OFFSET)
        };
      }
      function convertBlockToProperties(ds, msgData, propertyBlockOffset, props) {
        var propertyCount = msgData.bigBlockSize / CONST.MSG.PROP.PROPERTY_SIZE;
        var propertyOffset = getBlockOffsetAt(msgData, propertyBlockOffset);
        for (var i2 = 0; i2 < propertyCount; i2++) {
          var propertyType = ds.readByte(propertyOffset + CONST.MSG.PROP.TYPE_OFFSET);
          switch (propertyType) {
            case CONST.MSG.PROP.TYPE_ENUM.ROOT:
            case CONST.MSG.PROP.TYPE_ENUM.DIRECTORY:
            case CONST.MSG.PROP.TYPE_ENUM.DOCUMENT:
              props.push(convertProperty(ds, props.length, propertyOffset));
              break;
            default:
              props.push(null);
          }
          propertyOffset += CONST.MSG.PROP.PROPERTY_SIZE;
        }
      }
      function createPropertyHierarchy(props, nodeProperty) {
        if (nodeProperty.childProperty == CONST.MSG.PROP.NO_INDEX) {
          return;
        }
        nodeProperty.children = [];
        var children = [nodeProperty.childProperty];
        while (children.length != 0) {
          var currentIndex = children.shift();
          var current = props[currentIndex];
          if (current == null) {
            continue;
          }
          nodeProperty.children.push(currentIndex);
          if (current.type == CONST.MSG.PROP.TYPE_ENUM.DIRECTORY) {
            createPropertyHierarchy(props, current);
          }
          if (current.previousProperty != CONST.MSG.PROP.NO_INDEX) {
            children.push(current.previousProperty);
          }
          if (current.nextProperty != CONST.MSG.PROP.NO_INDEX) {
            children.push(current.nextProperty);
          }
        }
      }
      function fieldsData(ds, msgData) {
        var fields = {
          attachments: [],
          recipients: []
        };
        fieldsDataDir(ds, msgData, msgData.propertyData[0], fields);
        return fields;
      }
      function fieldsDataDir(ds, msgData, dirProperty, fields) {
        if (dirProperty.children && dirProperty.children.length > 0) {
          for (var i2 = 0; i2 < dirProperty.children.length; i2++) {
            var childProperty = msgData.propertyData[dirProperty.children[i2]];
            if (childProperty.type == CONST.MSG.PROP.TYPE_ENUM.DIRECTORY) {
              fieldsDataDirInner(ds, msgData, childProperty, fields);
            } else if (childProperty.type == CONST.MSG.PROP.TYPE_ENUM.DOCUMENT && childProperty.name.indexOf(CONST.MSG.FIELD.PREFIX.DOCUMENT) == 0) {
              fieldsDataDocument(ds, msgData, childProperty, fields);
            }
          }
        }
      }
      function fieldsDataDirInner(ds, msgData, dirProperty, fields) {
        if (dirProperty.name.indexOf(CONST.MSG.FIELD.PREFIX.ATTACHMENT) == 0) {
          var attachmentField = {};
          fields.attachments.push(attachmentField);
          fieldsDataDir(ds, msgData, dirProperty, attachmentField);
        } else if (dirProperty.name.indexOf(CONST.MSG.FIELD.PREFIX.RECIPIENT) == 0) {
          var recipientField = {};
          fields.recipients.push(recipientField);
          fieldsDataDir(ds, msgData, dirProperty, recipientField);
        } else {
          var childFieldType = getFieldType(dirProperty);
          if (childFieldType != CONST.MSG.FIELD.DIR_TYPE.INNER_MSG) {
            fieldsDataDir(ds, msgData, dirProperty, fields);
          } else {
            fields.innerMsgContent = true;
          }
        }
      }
      function fieldsDataDocument(ds, msgData, documentProperty, fields) {
        var value = documentProperty.name.substring(12).toLowerCase();
        var fieldClass = value.substring(0, 4);
        var fieldType = value.substring(4, 8);
        var fieldName = CONST.MSG.FIELD.NAME_MAPPING[fieldClass];
        if (fieldName) {
          fields[fieldName] = getFieldValue(ds, msgData, documentProperty, fieldType);
        }
        if (fieldClass == CONST.MSG.FIELD.CLASS_MAPPING.ATTACHMENT_DATA) {
          fields["dataId"] = documentProperty.index;
          fields["contentLength"] = documentProperty.sizeBlock;
        }
      }
      function getFieldType(fieldProperty) {
        var value = fieldProperty.name.substring(12).toLowerCase();
        return value.substring(4, 8);
      }
      var extractorFieldValue = {
        sbat: {
          "extractor": function extractDataViaSbat(ds, msgData, fieldProperty, dataTypeExtractor) {
            var chain = getChainByBlockSmall(ds, msgData, fieldProperty);
            if (chain.length == 1) {
              return readDataByBlockSmall(ds, msgData, fieldProperty.startBlock, fieldProperty.sizeBlock, dataTypeExtractor);
            } else if (chain.length > 1) {
              return readChainDataByBlockSmall(ds, msgData, fieldProperty, chain, dataTypeExtractor);
            }
            return null;
          },
          dataType: {
            "string": function extractBatString(ds, msgData, blockStartOffset, bigBlockOffset, blockSize) {
              ds.seek(blockStartOffset + bigBlockOffset);
              return ds.readString(blockSize);
            },
            "unicode": function extractBatUnicode(ds, msgData, blockStartOffset, bigBlockOffset, blockSize) {
              ds.seek(blockStartOffset + bigBlockOffset);
              return ds.readUCS2String(blockSize / 2);
            },
            "binary": function extractBatBinary(ds, msgData, blockStartOffset, bigBlockOffset, blockSize) {
              ds.seek(blockStartOffset + bigBlockOffset);
              var toReadLength = Math.min(Math.min(msgData.bigBlockSize - bigBlockOffset, blockSize), CONST.MSG.SMALL_BLOCK_SIZE);
              return ds.readUint8Array(toReadLength);
            }
          }
        },
        bat: {
          "extractor": function extractDataViaBat(ds, msgData, fieldProperty, dataTypeExtractor) {
            var offset = getBlockOffsetAt(msgData, fieldProperty.startBlock);
            ds.seek(offset);
            return dataTypeExtractor(ds, fieldProperty);
          },
          dataType: {
            "string": function extractSbatString(ds, fieldProperty) {
              return ds.readString(fieldProperty.sizeBlock);
            },
            "unicode": function extractSbatUnicode(ds, fieldProperty) {
              return ds.readUCS2String(fieldProperty.sizeBlock / 2);
            },
            "binary": function extractSbatBinary(ds, fieldProperty) {
              return ds.readUint8Array(fieldProperty.sizeBlock);
            }
          }
        }
      };
      function readDataByBlockSmall(ds, msgData, startBlock, blockSize, dataTypeExtractor) {
        var byteOffset = startBlock * CONST.MSG.SMALL_BLOCK_SIZE;
        var bigBlockNumber = Math.floor(byteOffset / msgData.bigBlockSize);
        var bigBlockOffset = byteOffset % msgData.bigBlockSize;
        var rootProp = msgData.propertyData[0];
        var nextBlock = rootProp.startBlock;
        for (var i2 = 0; i2 < bigBlockNumber; i2++) {
          nextBlock = getNextBlock(ds, msgData, nextBlock);
        }
        var blockStartOffset = getBlockOffsetAt(msgData, nextBlock);
        return dataTypeExtractor(ds, msgData, blockStartOffset, bigBlockOffset, blockSize);
      }
      function readChainDataByBlockSmall(ds, msgData, fieldProperty, chain, dataTypeExtractor) {
        var resultData = new Int8Array(fieldProperty.sizeBlock);
        for (var i2 = 0, idx = 0; i2 < chain.length; i2++) {
          var data = readDataByBlockSmall(ds, msgData, chain[i2], CONST.MSG.SMALL_BLOCK_SIZE, extractorFieldValue.sbat.dataType.binary);
          for (var j2 = 0; j2 < data.length; j2++) {
            resultData[idx++] = data[j2];
          }
        }
        var localDs = new DataStream(resultData, 0, DataStream.LITTLE_ENDIAN);
        return dataTypeExtractor(localDs, msgData, 0, 0, fieldProperty.sizeBlock);
      }
      function getChainByBlockSmall(ds, msgData, fieldProperty) {
        var blockChain = [];
        var nextBlockSmall = fieldProperty.startBlock;
        while (nextBlockSmall != CONST.MSG.END_OF_CHAIN) {
          blockChain.push(nextBlockSmall);
          nextBlockSmall = getNextBlockSmall(ds, msgData, nextBlockSmall);
        }
        return blockChain;
      }
      function getFieldValue(ds, msgData, fieldProperty, type) {
        var value = null;
        var valueExtractor = fieldProperty.sizeBlock < CONST.MSG.BIG_BLOCK_MIN_DOC_SIZE ? extractorFieldValue.sbat : extractorFieldValue.bat;
        var dataTypeExtractor = valueExtractor.dataType[CONST.MSG.FIELD.TYPE_MAPPING[type]];
        if (dataTypeExtractor) {
          value = valueExtractor.extractor(ds, msgData, fieldProperty, dataTypeExtractor);
        }
        return value;
      }
      var MSGReader2 = function(arrayBuffer) {
        this.ds = new DataStream(arrayBuffer, 0, DataStream.LITTLE_ENDIAN);
      };
      MSGReader2.prototype = {
        /**
             Converts bytes to fields information
        
             @return {Object} The fields data for MSG file
             */
        getFileData: function() {
          if (!isMSGFile(this.ds)) {
            return { error: "Unsupported file type!" };
          }
          if (this.fileData == null) {
            this.fileData = parseMsgData(this.ds);
          }
          return this.fileData.fieldsData;
        },
        /**
             Reads an attachment content by key/ID
        
             @return {Object} The attachment for specific attachment key
             */
        getAttachment: function(attach) {
          var attachData = typeof attach === "number" ? this.fileData.fieldsData.attachments[attach] : attach;
          var fieldProperty = this.fileData.propertyData[attachData.dataId];
          var fieldData = getFieldValue(this.ds, this.fileData, fieldProperty, getFieldType(fieldProperty));
          return { fileName: attachData.fileName, content: fieldData };
        }
      };
      return MSGReader2;
    });
  }
});

// node_modules/wl-msg-reader/index.js
var require_wl_msg_reader = __commonJS({
  "node_modules/wl-msg-reader/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataStream = require_DataStream();
    exports.MSGReader = require_msg_reader();
  }
});

// node_modules/warning/warning.js
var require_warning = __commonJS({
  "node_modules/warning/warning.js"(exports, module) {
    "use strict";
    var __DEV__ = true;
    var warning9 = function() {
    };
    if (__DEV__) {
      printWarning = function printWarning2(format, args) {
        var len = arguments.length;
        args = new Array(len > 1 ? len - 1 : 0);
        for (var key = 1; key < len; key++) {
          args[key - 1] = arguments[key];
        }
        var argIndex = 0;
        var message = "Warning: " + format.replace(/%s/g, function() {
          return args[argIndex++];
        });
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x2) {
        }
      };
      warning9 = function(condition, format, args) {
        var len = arguments.length;
        args = new Array(len > 2 ? len - 2 : 0);
        for (var key = 2; key < len; key++) {
          args[key - 2] = arguments[key];
        }
        if (format === void 0) {
          throw new Error(
            "`warning(condition, format, ...args)` requires a warning message argument"
          );
        }
        if (!condition) {
          printWarning.apply(null, [format].concat(args));
        }
      };
    }
    var printWarning;
    module.exports = warning9;
  }
});

// node_modules/react-doc-viewer/build/index.js
var import_react44 = __toESM(require_react());

// node_modules/styled-components/dist/styled-components.browser.esm.js
var import_react_is = __toESM(require_react_is());
var import_react = __toESM(require_react());
var import_shallowequal = __toESM(require_shallowequal());

// node_modules/@emotion/stylis/dist/stylis.browser.esm.js
function stylis_min(W2) {
  function M2(d2, c2, e2, h, a2) {
    for (var m2 = 0, b2 = 0, v2 = 0, n2 = 0, q2, g2, x2 = 0, K2 = 0, k2, u2 = k2 = q2 = 0, l2 = 0, r2 = 0, I2 = 0, t2 = 0, B3 = e2.length, J2 = B3 - 1, y2, f = "", p = "", F3 = "", G3 = "", C2; l2 < B3; ) {
      g2 = e2.charCodeAt(l2);
      l2 === J2 && 0 !== b2 + n2 + v2 + m2 && (0 !== b2 && (g2 = 47 === b2 ? 10 : 47), n2 = v2 = m2 = 0, B3++, J2++);
      if (0 === b2 + n2 + v2 + m2) {
        if (l2 === J2 && (0 < r2 && (f = f.replace(N2, "")), 0 < f.trim().length)) {
          switch (g2) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;
            default:
              f += e2.charAt(l2);
          }
          g2 = 59;
        }
        switch (g2) {
          case 123:
            f = f.trim();
            q2 = f.charCodeAt(0);
            k2 = 1;
            for (t2 = ++l2; l2 < B3; ) {
              switch (g2 = e2.charCodeAt(l2)) {
                case 123:
                  k2++;
                  break;
                case 125:
                  k2--;
                  break;
                case 47:
                  switch (g2 = e2.charCodeAt(l2 + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u2 = l2 + 1; u2 < J2; ++u2) {
                          switch (e2.charCodeAt(u2)) {
                            case 47:
                              if (42 === g2 && 42 === e2.charCodeAt(u2 - 1) && l2 + 2 !== u2) {
                                l2 = u2 + 1;
                                break a;
                              }
                              break;
                            case 10:
                              if (47 === g2) {
                                l2 = u2 + 1;
                                break a;
                              }
                          }
                        }
                        l2 = u2;
                      }
                  }
                  break;
                case 91:
                  g2++;
                case 40:
                  g2++;
                case 34:
                case 39:
                  for (; l2++ < J2 && e2.charCodeAt(l2) !== g2; ) {
                  }
              }
              if (0 === k2) break;
              l2++;
            }
            k2 = e2.substring(t2, l2);
            0 === q2 && (q2 = (f = f.replace(ca, "").trim()).charCodeAt(0));
            switch (q2) {
              case 64:
                0 < r2 && (f = f.replace(N2, ""));
                g2 = f.charCodeAt(1);
                switch (g2) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r2 = c2;
                    break;
                  default:
                    r2 = O2;
                }
                k2 = M2(c2, r2, k2, g2, a2 + 1);
                t2 = k2.length;
                0 < A && (r2 = X2(O2, f, I2), C2 = H2(3, k2, r2, c2, D2, z2, t2, g2, a2, h), f = r2.join(""), void 0 !== C2 && 0 === (t2 = (k2 = C2.trim()).length) && (g2 = 0, k2 = ""));
                if (0 < t2) switch (g2) {
                  case 115:
                    f = f.replace(da, ea);
                  case 100:
                  case 109:
                  case 45:
                    k2 = f + "{" + k2 + "}";
                    break;
                  case 107:
                    f = f.replace(fa, "$1 $2");
                    k2 = f + "{" + k2 + "}";
                    k2 = 1 === w2 || 2 === w2 && L2("@" + k2, 3) ? "@-webkit-" + k2 + "@" + k2 : "@" + k2;
                    break;
                  default:
                    k2 = f + k2, 112 === h && (k2 = (p += k2, ""));
                }
                else k2 = "";
                break;
              default:
                k2 = M2(c2, X2(c2, f, I2), k2, h, a2 + 1);
            }
            F3 += k2;
            k2 = I2 = r2 = u2 = q2 = 0;
            f = "";
            g2 = e2.charCodeAt(++l2);
            break;
          case 125:
          case 59:
            f = (0 < r2 ? f.replace(N2, "") : f).trim();
            if (1 < (t2 = f.length)) switch (0 === u2 && (q2 = f.charCodeAt(0), 45 === q2 || 96 < q2 && 123 > q2) && (t2 = (f = f.replace(" ", ":")).length), 0 < A && void 0 !== (C2 = H2(1, f, c2, d2, D2, z2, p.length, h, a2, h)) && 0 === (t2 = (f = C2.trim()).length) && (f = "\0\0"), q2 = f.charCodeAt(0), g2 = f.charCodeAt(1), q2) {
              case 0:
                break;
              case 64:
                if (105 === g2 || 99 === g2) {
                  G3 += f + e2.charAt(l2);
                  break;
                }
              default:
                58 !== f.charCodeAt(t2 - 1) && (p += P(f, q2, g2, f.charCodeAt(2)));
            }
            I2 = r2 = u2 = q2 = 0;
            f = "";
            g2 = e2.charCodeAt(++l2);
        }
      }
      switch (g2) {
        case 13:
        case 10:
          47 === b2 ? b2 = 0 : 0 === 1 + q2 && 107 !== h && 0 < f.length && (r2 = 1, f += "\0");
          0 < A * Y2 && H2(0, f, c2, d2, D2, z2, p.length, h, a2, h);
          z2 = 1;
          D2++;
          break;
        case 59:
        case 125:
          if (0 === b2 + n2 + v2 + m2) {
            z2++;
            break;
          }
        default:
          z2++;
          y2 = e2.charAt(l2);
          switch (g2) {
            case 9:
            case 32:
              if (0 === n2 + m2 + b2) switch (x2) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y2 = "";
                  break;
                default:
                  32 !== g2 && (y2 = " ");
              }
              break;
            case 0:
              y2 = "\\0";
              break;
            case 12:
              y2 = "\\f";
              break;
            case 11:
              y2 = "\\v";
              break;
            case 38:
              0 === n2 + b2 + m2 && (r2 = I2 = 1, y2 = "\f" + y2);
              break;
            case 108:
              if (0 === n2 + b2 + m2 + E2 && 0 < u2) switch (l2 - u2) {
                case 2:
                  112 === x2 && 58 === e2.charCodeAt(l2 - 3) && (E2 = x2);
                case 8:
                  111 === K2 && (E2 = K2);
              }
              break;
            case 58:
              0 === n2 + b2 + m2 && (u2 = l2);
              break;
            case 44:
              0 === b2 + v2 + n2 + m2 && (r2 = 1, y2 += "\r");
              break;
            case 34:
            case 39:
              0 === b2 && (n2 = n2 === g2 ? 0 : 0 === n2 ? g2 : n2);
              break;
            case 91:
              0 === n2 + b2 + v2 && m2++;
              break;
            case 93:
              0 === n2 + b2 + v2 && m2--;
              break;
            case 41:
              0 === n2 + b2 + m2 && v2--;
              break;
            case 40:
              if (0 === n2 + b2 + m2) {
                if (0 === q2) switch (2 * x2 + 3 * K2) {
                  case 533:
                    break;
                  default:
                    q2 = 1;
                }
                v2++;
              }
              break;
            case 64:
              0 === b2 + v2 + n2 + m2 + u2 + k2 && (k2 = 1);
              break;
            case 42:
            case 47:
              if (!(0 < n2 + m2 + v2)) switch (b2) {
                case 0:
                  switch (2 * g2 + 3 * e2.charCodeAt(l2 + 1)) {
                    case 235:
                      b2 = 47;
                      break;
                    case 220:
                      t2 = l2, b2 = 42;
                  }
                  break;
                case 42:
                  47 === g2 && 42 === x2 && t2 + 2 !== l2 && (33 === e2.charCodeAt(t2 + 2) && (p += e2.substring(t2, l2 + 1)), y2 = "", b2 = 0);
              }
          }
          0 === b2 && (f += y2);
      }
      K2 = x2;
      x2 = g2;
      l2++;
    }
    t2 = p.length;
    if (0 < t2) {
      r2 = c2;
      if (0 < A && (C2 = H2(2, p, r2, d2, D2, z2, t2, h, a2, h), void 0 !== C2 && 0 === (p = C2).length)) return G3 + p + F3;
      p = r2.join(",") + "{" + p + "}";
      if (0 !== w2 * E2) {
        2 !== w2 || L2(p, 2) || (E2 = 0);
        switch (E2) {
          case 111:
            p = p.replace(ha, ":-moz-$1") + p;
            break;
          case 112:
            p = p.replace(Q2, "::-webkit-input-$1") + p.replace(Q2, "::-moz-$1") + p.replace(Q2, ":-ms-input-$1") + p;
        }
        E2 = 0;
      }
    }
    return G3 + p + F3;
  }
  function X2(d2, c2, e2) {
    var h = c2.trim().split(ia);
    c2 = h;
    var a2 = h.length, m2 = d2.length;
    switch (m2) {
      case 0:
      case 1:
        var b2 = 0;
        for (d2 = 0 === m2 ? "" : d2[0] + " "; b2 < a2; ++b2) {
          c2[b2] = Z2(d2, c2[b2], e2).trim();
        }
        break;
      default:
        var v2 = b2 = 0;
        for (c2 = []; b2 < a2; ++b2) {
          for (var n2 = 0; n2 < m2; ++n2) {
            c2[v2++] = Z2(d2[n2] + " ", h[b2], e2).trim();
          }
        }
    }
    return c2;
  }
  function Z2(d2, c2, e2) {
    var h = c2.charCodeAt(0);
    33 > h && (h = (c2 = c2.trim()).charCodeAt(0));
    switch (h) {
      case 38:
        return c2.replace(F2, "$1" + d2.trim());
      case 58:
        return d2.trim() + c2.replace(F2, "$1" + d2.trim());
      default:
        if (0 < 1 * e2 && 0 < c2.indexOf("\f")) return c2.replace(F2, (58 === d2.charCodeAt(0) ? "" : "$1") + d2.trim());
    }
    return d2 + c2;
  }
  function P(d2, c2, e2, h) {
    var a2 = d2 + ";", m2 = 2 * c2 + 3 * e2 + 4 * h;
    if (944 === m2) {
      d2 = a2.indexOf(":", 9) + 1;
      var b2 = a2.substring(d2, a2.length - 1).trim();
      b2 = a2.substring(0, d2).trim() + b2 + ";";
      return 1 === w2 || 2 === w2 && L2(b2, 1) ? "-webkit-" + b2 + b2 : b2;
    }
    if (0 === w2 || 2 === w2 && !L2(a2, 1)) return a2;
    switch (m2) {
      case 1015:
        return 97 === a2.charCodeAt(10) ? "-webkit-" + a2 + a2 : a2;
      case 951:
        return 116 === a2.charCodeAt(3) ? "-webkit-" + a2 + a2 : a2;
      case 963:
        return 110 === a2.charCodeAt(5) ? "-webkit-" + a2 + a2 : a2;
      case 1009:
        if (100 !== a2.charCodeAt(4)) break;
      case 969:
      case 942:
        return "-webkit-" + a2 + a2;
      case 978:
        return "-webkit-" + a2 + "-moz-" + a2 + a2;
      case 1019:
      case 983:
        return "-webkit-" + a2 + "-moz-" + a2 + "-ms-" + a2 + a2;
      case 883:
        if (45 === a2.charCodeAt(8)) return "-webkit-" + a2 + a2;
        if (0 < a2.indexOf("image-set(", 11)) return a2.replace(ja, "$1-webkit-$2") + a2;
        break;
      case 932:
        if (45 === a2.charCodeAt(4)) switch (a2.charCodeAt(5)) {
          case 103:
            return "-webkit-box-" + a2.replace("-grow", "") + "-webkit-" + a2 + "-ms-" + a2.replace("grow", "positive") + a2;
          case 115:
            return "-webkit-" + a2 + "-ms-" + a2.replace("shrink", "negative") + a2;
          case 98:
            return "-webkit-" + a2 + "-ms-" + a2.replace("basis", "preferred-size") + a2;
        }
        return "-webkit-" + a2 + "-ms-" + a2 + a2;
      case 964:
        return "-webkit-" + a2 + "-ms-flex-" + a2 + a2;
      case 1023:
        if (99 !== a2.charCodeAt(8)) break;
        b2 = a2.substring(a2.indexOf(":", 15)).replace("flex-", "").replace("space-between", "justify");
        return "-webkit-box-pack" + b2 + "-webkit-" + a2 + "-ms-flex-pack" + b2 + a2;
      case 1005:
        return ka.test(a2) ? a2.replace(aa, ":-webkit-") + a2.replace(aa, ":-moz-") + a2 : a2;
      case 1e3:
        b2 = a2.substring(13).trim();
        c2 = b2.indexOf("-") + 1;
        switch (b2.charCodeAt(0) + b2.charCodeAt(c2)) {
          case 226:
            b2 = a2.replace(G2, "tb");
            break;
          case 232:
            b2 = a2.replace(G2, "tb-rl");
            break;
          case 220:
            b2 = a2.replace(G2, "lr");
            break;
          default:
            return a2;
        }
        return "-webkit-" + a2 + "-ms-" + b2 + a2;
      case 1017:
        if (-1 === a2.indexOf("sticky", 9)) break;
      case 975:
        c2 = (a2 = d2).length - 10;
        b2 = (33 === a2.charCodeAt(c2) ? a2.substring(0, c2) : a2).substring(d2.indexOf(":", 7) + 1).trim();
        switch (m2 = b2.charCodeAt(0) + (b2.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b2.charCodeAt(8)) break;
          case 115:
            a2 = a2.replace(b2, "-webkit-" + b2) + ";" + a2;
            break;
          case 207:
          case 102:
            a2 = a2.replace(b2, "-webkit-" + (102 < m2 ? "inline-" : "") + "box") + ";" + a2.replace(b2, "-webkit-" + b2) + ";" + a2.replace(b2, "-ms-" + b2 + "box") + ";" + a2;
        }
        return a2 + ";";
      case 938:
        if (45 === a2.charCodeAt(5)) switch (a2.charCodeAt(6)) {
          case 105:
            return b2 = a2.replace("-items", ""), "-webkit-" + a2 + "-webkit-box-" + b2 + "-ms-flex-" + b2 + a2;
          case 115:
            return "-webkit-" + a2 + "-ms-flex-item-" + a2.replace(ba, "") + a2;
          default:
            return "-webkit-" + a2 + "-ms-flex-line-pack" + a2.replace("align-content", "").replace(ba, "") + a2;
        }
        break;
      case 973:
      case 989:
        if (45 !== a2.charCodeAt(3) || 122 === a2.charCodeAt(4)) break;
      case 931:
      case 953:
        if (true === la.test(d2)) return 115 === (b2 = d2.substring(d2.indexOf(":") + 1)).charCodeAt(0) ? P(d2.replace("stretch", "fill-available"), c2, e2, h).replace(":fill-available", ":stretch") : a2.replace(b2, "-webkit-" + b2) + a2.replace(b2, "-moz-" + b2.replace("fill-", "")) + a2;
        break;
      case 962:
        if (a2 = "-webkit-" + a2 + (102 === a2.charCodeAt(5) ? "-ms-" + a2 : "") + a2, 211 === e2 + h && 105 === a2.charCodeAt(13) && 0 < a2.indexOf("transform", 10)) return a2.substring(0, a2.indexOf(";", 27) + 1).replace(ma, "$1-webkit-$2") + a2;
    }
    return a2;
  }
  function L2(d2, c2) {
    var e2 = d2.indexOf(1 === c2 ? ":" : "{"), h = d2.substring(0, 3 !== c2 ? e2 : 10);
    e2 = d2.substring(e2 + 1, d2.length - 1);
    return R2(2 !== c2 ? h : h.replace(na, "$1"), e2, c2);
  }
  function ea(d2, c2) {
    var e2 = P(c2, c2.charCodeAt(0), c2.charCodeAt(1), c2.charCodeAt(2));
    return e2 !== c2 + ";" ? e2.replace(oa, " or ($1)").substring(4) : "(" + c2 + ")";
  }
  function H2(d2, c2, e2, h, a2, m2, b2, v2, n2, q2) {
    for (var g2 = 0, x2 = c2, w3; g2 < A; ++g2) {
      switch (w3 = S2[g2].call(B2, d2, x2, e2, h, a2, m2, b2, v2, n2, q2)) {
        case void 0:
        case false:
        case true:
        case null:
          break;
        default:
          x2 = w3;
      }
    }
    if (x2 !== c2) return x2;
  }
  function T2(d2) {
    switch (d2) {
      case void 0:
      case null:
        A = S2.length = 0;
        break;
      default:
        if ("function" === typeof d2) S2[A++] = d2;
        else if ("object" === typeof d2) for (var c2 = 0, e2 = d2.length; c2 < e2; ++c2) {
          T2(d2[c2]);
        }
        else Y2 = !!d2 | 0;
    }
    return T2;
  }
  function U2(d2) {
    d2 = d2.prefix;
    void 0 !== d2 && (R2 = null, d2 ? "function" !== typeof d2 ? w2 = 1 : (w2 = 2, R2 = d2) : w2 = 0);
    return U2;
  }
  function B2(d2, c2) {
    var e2 = d2;
    33 > e2.charCodeAt(0) && (e2 = e2.trim());
    V2 = e2;
    e2 = [V2];
    if (0 < A) {
      var h = H2(-1, c2, e2, e2, D2, z2, 0, 0, 0, 0);
      void 0 !== h && "string" === typeof h && (c2 = h);
    }
    var a2 = M2(O2, e2, c2, 0, 0);
    0 < A && (h = H2(-2, a2, e2, e2, D2, z2, a2.length, 0, 0, 0), void 0 !== h && (a2 = h));
    V2 = "";
    E2 = 0;
    z2 = D2 = 1;
    return a2;
  }
  var ca = /^\0+/g, N2 = /[\0\r\f]/g, aa = /: */g, ka = /zoo|gra/, ma = /([,: ])(transform)/g, ia = /,\r+?/g, F2 = /([\t\r\n ])*\f?&/g, fa = /@(k\w+)\s*(\S*)\s*/, Q2 = /::(place)/g, ha = /:(read-only)/g, G2 = /[svh]\w+-[tblr]{2}/, da = /\(\s*(.*)\s*\)/g, oa = /([\s\S]*?);/g, ba = /-self|flex-/g, na = /[^]*?(:[rp][el]a[\w-]+)[^]*/, la = /stretch|:\s*\w+\-(?:conte|avail)/, ja = /([^-])(image-set\()/, z2 = 1, D2 = 1, E2 = 0, w2 = 1, O2 = [], S2 = [], A = 0, R2 = null, Y2 = 0, V2 = "";
  B2.use = T2;
  B2.set = U2;
  void 0 !== W2 && U2(W2);
  return B2;
}
var stylis_browser_esm_default = stylis_min;

// node_modules/styled-components/node_modules/@emotion/unitless/dist/unitless.browser.esm.js
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var unitless_browser_esm_default = unitlessKeys;

// node_modules/styled-components/dist/styled-components.browser.esm.js
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
function y() {
  return (y = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }).apply(this, arguments);
}
var v = function(e2, t2) {
  for (var n2 = [e2[0]], r2 = 0, o2 = t2.length; r2 < o2; r2 += 1) n2.push(t2[r2], e2[r2 + 1]);
  return n2;
};
var g = function(t2) {
  return null !== t2 && "object" == typeof t2 && "[object Object]" === (t2.toString ? t2.toString() : Object.prototype.toString.call(t2)) && !(0, import_react_is.typeOf)(t2);
};
var S = Object.freeze([]);
var w = Object.freeze({});
function E(e2) {
  return "function" == typeof e2;
}
function b(e2) {
  return "string" == typeof e2 && e2 || e2.displayName || e2.name || "Component";
}
function _(e2) {
  return e2 && "string" == typeof e2.styledComponentId;
}
var N = "undefined" != typeof process && void 0 !== process.env && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled";
var C = "undefined" != typeof window && "HTMLElement" in window;
var I = Boolean("boolean" == typeof SC_DISABLE_SPEEDY ? SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== process.env && (void 0 !== process.env.REACT_APP_SC_DISABLE_SPEEDY && "" !== process.env.REACT_APP_SC_DISABLE_SPEEDY ? "false" !== process.env.REACT_APP_SC_DISABLE_SPEEDY && process.env.REACT_APP_SC_DISABLE_SPEEDY : void 0 !== process.env.SC_DISABLE_SPEEDY && "" !== process.env.SC_DISABLE_SPEEDY ? "false" !== process.env.SC_DISABLE_SPEEDY && process.env.SC_DISABLE_SPEEDY : true));
var O = true ? { 1: "Cannot create styled-component for component: %s.\n\n", 2: "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n", 3: "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n", 4: "The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n", 5: "The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n", 6: "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n", 7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n', 8: 'ThemeProvider: Please make your "theme" prop an object.\n\n', 9: "Missing document `<head>`\n\n", 10: "Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n", 11: "_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n", 12: "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n", 13: "%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n", 14: 'ThemeProvider: "theme" prop is required.\n\n', 15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n", 16: "Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n", 17: "CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n" } : {};
function R() {
  for (var e2 = arguments.length <= 0 ? void 0 : arguments[0], t2 = [], n2 = 1, r2 = arguments.length; n2 < r2; n2 += 1) t2.push(n2 < 0 || arguments.length <= n2 ? void 0 : arguments[n2]);
  return t2.forEach(function(t3) {
    e2 = e2.replace(/%[a-z]/, t3);
  }), e2;
}
function D(e2) {
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++) n2[r2 - 1] = arguments[r2];
  throw false ? new Error("An error occurred. See https://git.io/JUIaE#" + e2 + " for more information." + (n2.length > 0 ? " Args: " + n2.join(", ") : "")) : new Error(R.apply(void 0, [O[e2]].concat(n2)).trim());
}
var j = function() {
  function e2(e3) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e3;
  }
  var t2 = e2.prototype;
  return t2.indexOfGroup = function(e3) {
    for (var t3 = 0, n2 = 0; n2 < e3; n2++) t3 += this.groupSizes[n2];
    return t3;
  }, t2.insertRules = function(e3, t3) {
    if (e3 >= this.groupSizes.length) {
      for (var n2 = this.groupSizes, r2 = n2.length, o2 = r2; e3 >= o2; ) (o2 <<= 1) < 0 && D(16, "" + e3);
      this.groupSizes = new Uint32Array(o2), this.groupSizes.set(n2), this.length = o2;
      for (var s2 = r2; s2 < o2; s2++) this.groupSizes[s2] = 0;
    }
    for (var i2 = this.indexOfGroup(e3 + 1), a2 = 0, c2 = t3.length; a2 < c2; a2++) this.tag.insertRule(i2, t3[a2]) && (this.groupSizes[e3]++, i2++);
  }, t2.clearGroup = function(e3) {
    if (e3 < this.length) {
      var t3 = this.groupSizes[e3], n2 = this.indexOfGroup(e3), r2 = n2 + t3;
      this.groupSizes[e3] = 0;
      for (var o2 = n2; o2 < r2; o2++) this.tag.deleteRule(n2);
    }
  }, t2.getGroup = function(e3) {
    var t3 = "";
    if (e3 >= this.length || 0 === this.groupSizes[e3]) return t3;
    for (var n2 = this.groupSizes[e3], r2 = this.indexOfGroup(e3), o2 = r2 + n2, s2 = r2; s2 < o2; s2++) t3 += this.tag.getRule(s2) + "/*!sc*/\n";
    return t3;
  }, e2;
}();
var T = /* @__PURE__ */ new Map();
var x = /* @__PURE__ */ new Map();
var k = 1;
var V = function(e2) {
  if (T.has(e2)) return T.get(e2);
  for (; x.has(k); ) k++;
  var t2 = k++;
  return ((0 | t2) < 0 || t2 > 1 << 30) && D(16, "" + t2), T.set(e2, t2), x.set(t2, e2), t2;
};
var B = function(e2) {
  return x.get(e2);
};
var z = function(e2, t2) {
  t2 >= k && (k = t2 + 1), T.set(e2, t2), x.set(t2, e2);
};
var M = "style[" + N + '][data-styled-version="5.3.11"]';
var G = new RegExp("^" + N + '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)');
var L = function(e2, t2, n2) {
  for (var r2, o2 = n2.split(","), s2 = 0, i2 = o2.length; s2 < i2; s2++) (r2 = o2[s2]) && e2.registerName(t2, r2);
};
var F = function(e2, t2) {
  for (var n2 = (t2.textContent || "").split("/*!sc*/\n"), r2 = [], o2 = 0, s2 = n2.length; o2 < s2; o2++) {
    var i2 = n2[o2].trim();
    if (i2) {
      var a2 = i2.match(G);
      if (a2) {
        var c2 = 0 | parseInt(a2[1], 10), u2 = a2[2];
        0 !== c2 && (z(u2, c2), L(e2, u2, a2[3]), e2.getTag().insertRules(c2, r2)), r2.length = 0;
      } else r2.push(i2);
    }
  }
};
var Y = function() {
  return "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : null;
};
var q = function(e2) {
  var t2 = document.head, n2 = e2 || t2, r2 = document.createElement("style"), o2 = function(e3) {
    for (var t3 = e3.childNodes, n3 = t3.length; n3 >= 0; n3--) {
      var r3 = t3[n3];
      if (r3 && 1 === r3.nodeType && r3.hasAttribute(N)) return r3;
    }
  }(n2), s2 = void 0 !== o2 ? o2.nextSibling : null;
  r2.setAttribute(N, "active"), r2.setAttribute("data-styled-version", "5.3.11");
  var i2 = Y();
  return i2 && r2.setAttribute("nonce", i2), n2.insertBefore(r2, s2), r2;
};
var H = function() {
  function e2(e3) {
    var t3 = this.element = q(e3);
    t3.appendChild(document.createTextNode("")), this.sheet = function(e4) {
      if (e4.sheet) return e4.sheet;
      for (var t4 = document.styleSheets, n2 = 0, r2 = t4.length; n2 < r2; n2++) {
        var o2 = t4[n2];
        if (o2.ownerNode === e4) return o2;
      }
      D(17);
    }(t3), this.length = 0;
  }
  var t2 = e2.prototype;
  return t2.insertRule = function(e3, t3) {
    try {
      return this.sheet.insertRule(t3, e3), this.length++, true;
    } catch (e4) {
      return false;
    }
  }, t2.deleteRule = function(e3) {
    this.sheet.deleteRule(e3), this.length--;
  }, t2.getRule = function(e3) {
    var t3 = this.sheet.cssRules[e3];
    return void 0 !== t3 && "string" == typeof t3.cssText ? t3.cssText : "";
  }, e2;
}();
var $ = function() {
  function e2(e3) {
    var t3 = this.element = q(e3);
    this.nodes = t3.childNodes, this.length = 0;
  }
  var t2 = e2.prototype;
  return t2.insertRule = function(e3, t3) {
    if (e3 <= this.length && e3 >= 0) {
      var n2 = document.createTextNode(t3), r2 = this.nodes[e3];
      return this.element.insertBefore(n2, r2 || null), this.length++, true;
    }
    return false;
  }, t2.deleteRule = function(e3) {
    this.element.removeChild(this.nodes[e3]), this.length--;
  }, t2.getRule = function(e3) {
    return e3 < this.length ? this.nodes[e3].textContent : "";
  }, e2;
}();
var W = function() {
  function e2(e3) {
    this.rules = [], this.length = 0;
  }
  var t2 = e2.prototype;
  return t2.insertRule = function(e3, t3) {
    return e3 <= this.length && (this.rules.splice(e3, 0, t3), this.length++, true);
  }, t2.deleteRule = function(e3) {
    this.rules.splice(e3, 1), this.length--;
  }, t2.getRule = function(e3) {
    return e3 < this.length ? this.rules[e3] : "";
  }, e2;
}();
var U = C;
var J = { isServer: !C, useCSSOMInjection: !I };
var X = function() {
  function e2(e3, t3, n2) {
    void 0 === e3 && (e3 = w), void 0 === t3 && (t3 = {}), this.options = y({}, J, {}, e3), this.gs = t3, this.names = new Map(n2), this.server = !!e3.isServer, !this.server && C && U && (U = false, function(e4) {
      for (var t4 = document.querySelectorAll(M), n3 = 0, r2 = t4.length; n3 < r2; n3++) {
        var o2 = t4[n3];
        o2 && "active" !== o2.getAttribute(N) && (F(e4, o2), o2.parentNode && o2.parentNode.removeChild(o2));
      }
    }(this));
  }
  e2.registerId = function(e3) {
    return V(e3);
  };
  var t2 = e2.prototype;
  return t2.reconstructWithOptions = function(t3, n2) {
    return void 0 === n2 && (n2 = true), new e2(y({}, this.options, {}, t3), this.gs, n2 && this.names || void 0);
  }, t2.allocateGSInstance = function(e3) {
    return this.gs[e3] = (this.gs[e3] || 0) + 1;
  }, t2.getTag = function() {
    return this.tag || (this.tag = (n2 = (t3 = this.options).isServer, r2 = t3.useCSSOMInjection, o2 = t3.target, e3 = n2 ? new W(o2) : r2 ? new H(o2) : new $(o2), new j(e3)));
    var e3, t3, n2, r2, o2;
  }, t2.hasNameForId = function(e3, t3) {
    return this.names.has(e3) && this.names.get(e3).has(t3);
  }, t2.registerName = function(e3, t3) {
    if (V(e3), this.names.has(e3)) this.names.get(e3).add(t3);
    else {
      var n2 = /* @__PURE__ */ new Set();
      n2.add(t3), this.names.set(e3, n2);
    }
  }, t2.insertRules = function(e3, t3, n2) {
    this.registerName(e3, t3), this.getTag().insertRules(V(e3), n2);
  }, t2.clearNames = function(e3) {
    this.names.has(e3) && this.names.get(e3).clear();
  }, t2.clearRules = function(e3) {
    this.getTag().clearGroup(V(e3)), this.clearNames(e3);
  }, t2.clearTag = function() {
    this.tag = void 0;
  }, t2.toString = function() {
    return function(e3) {
      for (var t3 = e3.getTag(), n2 = t3.length, r2 = "", o2 = 0; o2 < n2; o2++) {
        var s2 = B(o2);
        if (void 0 !== s2) {
          var i2 = e3.names.get(s2), a2 = t3.getGroup(o2);
          if (i2 && a2 && i2.size) {
            var c2 = N + ".g" + o2 + '[id="' + s2 + '"]', u2 = "";
            void 0 !== i2 && i2.forEach(function(e4) {
              e4.length > 0 && (u2 += e4 + ",");
            }), r2 += "" + a2 + c2 + '{content:"' + u2 + '"}/*!sc*/\n';
          }
        }
      }
      return r2;
    }(this);
  }, e2;
}();
var Z = /(a)(d)/gi;
var K = function(e2) {
  return String.fromCharCode(e2 + (e2 > 25 ? 39 : 97));
};
function Q(e2) {
  var t2, n2 = "";
  for (t2 = Math.abs(e2); t2 > 52; t2 = t2 / 52 | 0) n2 = K(t2 % 52) + n2;
  return (K(t2 % 52) + n2).replace(Z, "$1-$2");
}
var ee = function(e2, t2) {
  for (var n2 = t2.length; n2; ) e2 = 33 * e2 ^ t2.charCodeAt(--n2);
  return e2;
};
var te = function(e2) {
  return ee(5381, e2);
};
function ne(e2) {
  for (var t2 = 0; t2 < e2.length; t2 += 1) {
    var n2 = e2[t2];
    if (E(n2) && !_(n2)) return false;
  }
  return true;
}
var re = te("5.3.11");
var oe = function() {
  function e2(e3, t2, n2) {
    this.rules = e3, this.staticRulesId = "", this.isStatic = false, this.componentId = t2, this.baseHash = ee(re, t2), this.baseStyle = n2, X.registerId(t2);
  }
  return e2.prototype.generateAndInjectStyles = function(e3, t2, n2) {
    var r2 = this.componentId, o2 = [];
    if (this.baseStyle && o2.push(this.baseStyle.generateAndInjectStyles(e3, t2, n2)), this.isStatic && !n2.hash) if (this.staticRulesId && t2.hasNameForId(r2, this.staticRulesId)) o2.push(this.staticRulesId);
    else {
      var s2 = _e(this.rules, e3, t2, n2).join(""), i2 = Q(ee(this.baseHash, s2) >>> 0);
      if (!t2.hasNameForId(r2, i2)) {
        var a2 = n2(s2, "." + i2, void 0, r2);
        t2.insertRules(r2, i2, a2);
      }
      o2.push(i2), this.staticRulesId = i2;
    }
    else {
      for (var c2 = this.rules.length, u2 = ee(this.baseHash, n2.hash), l2 = "", d2 = 0; d2 < c2; d2++) {
        var h = this.rules[d2];
        if ("string" == typeof h) l2 += h, u2 = ee(u2, h + d2);
        else if (h) {
          var p = _e(h, e3, t2, n2), f = Array.isArray(p) ? p.join("") : p;
          u2 = ee(u2, f + d2), l2 += f;
        }
      }
      if (l2) {
        var m2 = Q(u2 >>> 0);
        if (!t2.hasNameForId(r2, m2)) {
          var y2 = n2(l2, "." + m2, void 0, r2);
          t2.insertRules(r2, m2, y2);
        }
        o2.push(m2);
      }
    }
    return o2.join(" ");
  }, e2;
}();
var se = /^\s*\/\/.*$/gm;
var ie = [":", "[", ".", "#"];
function ae(e2) {
  var t2, n2, r2, o2, s2 = void 0 === e2 ? w : e2, i2 = s2.options, a2 = void 0 === i2 ? w : i2, c2 = s2.plugins, u2 = void 0 === c2 ? S : c2, l2 = new stylis_browser_esm_default(a2), d2 = [], p = /* @__PURE__ */ function(e3) {
    function t3(t4) {
      if (t4) try {
        e3(t4 + "}");
      } catch (e4) {
      }
    }
    return function(n3, r3, o3, s3, i3, a3, c3, u3, l3, d3) {
      switch (n3) {
        case 1:
          if (0 === l3 && 64 === r3.charCodeAt(0)) return e3(r3 + ";"), "";
          break;
        case 2:
          if (0 === u3) return r3 + "/*|*/";
          break;
        case 3:
          switch (u3) {
            case 102:
            case 112:
              return e3(o3[0] + r3), "";
            default:
              return r3 + (0 === d3 ? "/*|*/" : "");
          }
        case -2:
          r3.split("/*|*/}").forEach(t3);
      }
    };
  }(function(e3) {
    d2.push(e3);
  }), f = function(e3, r3, s3) {
    return 0 === r3 && -1 !== ie.indexOf(s3[n2.length]) || s3.match(o2) ? e3 : "." + t2;
  };
  function m2(e3, s3, i3, a3) {
    void 0 === a3 && (a3 = "&");
    var c3 = e3.replace(se, ""), u3 = s3 && i3 ? i3 + " " + s3 + " { " + c3 + " }" : c3;
    return t2 = a3, n2 = s3, r2 = new RegExp("\\" + n2 + "\\b", "g"), o2 = new RegExp("(\\" + n2 + "\\b){2,}"), l2(i3 || !s3 ? "" : s3, u3);
  }
  return l2.use([].concat(u2, [function(e3, t3, o3) {
    2 === e3 && o3.length && o3[0].lastIndexOf(n2) > 0 && (o3[0] = o3[0].replace(r2, f));
  }, p, function(e3) {
    if (-2 === e3) {
      var t3 = d2;
      return d2 = [], t3;
    }
  }])), m2.hash = u2.length ? u2.reduce(function(e3, t3) {
    return t3.name || D(15), ee(e3, t3.name);
  }, 5381).toString() : "", m2;
}
var ce = import_react.default.createContext();
var ue = ce.Consumer;
var le = import_react.default.createContext();
var de = (le.Consumer, new X());
var he = ae();
function pe() {
  return (0, import_react.useContext)(ce) || de;
}
function fe() {
  return (0, import_react.useContext)(le) || he;
}
function me(e2) {
  var t2 = (0, import_react.useState)(e2.stylisPlugins), n2 = t2[0], s2 = t2[1], c2 = pe(), u2 = (0, import_react.useMemo)(function() {
    var t3 = c2;
    return e2.sheet ? t3 = e2.sheet : e2.target && (t3 = t3.reconstructWithOptions({ target: e2.target }, false)), e2.disableCSSOMInjection && (t3 = t3.reconstructWithOptions({ useCSSOMInjection: false })), t3;
  }, [e2.disableCSSOMInjection, e2.sheet, e2.target]), l2 = (0, import_react.useMemo)(function() {
    return ae({ options: { prefix: !e2.disableVendorPrefixes }, plugins: n2 });
  }, [e2.disableVendorPrefixes, n2]);
  return (0, import_react.useEffect)(function() {
    (0, import_shallowequal.default)(n2, e2.stylisPlugins) || s2(e2.stylisPlugins);
  }, [e2.stylisPlugins]), import_react.default.createElement(ce.Provider, { value: u2 }, import_react.default.createElement(le.Provider, { value: l2 }, true ? import_react.default.Children.only(e2.children) : e2.children));
}
var ye = function() {
  function e2(e3, t2) {
    var n2 = this;
    this.inject = function(e4, t3) {
      void 0 === t3 && (t3 = he);
      var r2 = n2.name + t3.hash;
      e4.hasNameForId(n2.id, r2) || e4.insertRules(n2.id, r2, t3(n2.rules, r2, "@keyframes"));
    }, this.toString = function() {
      return D(12, String(n2.name));
    }, this.name = e3, this.id = "sc-keyframes-" + e3, this.rules = t2;
  }
  return e2.prototype.getName = function(e3) {
    return void 0 === e3 && (e3 = he), this.name + e3.hash;
  }, e2;
}();
var ve = /([A-Z])/;
var ge = /([A-Z])/g;
var Se = /^ms-/;
var we = function(e2) {
  return "-" + e2.toLowerCase();
};
function Ee(e2) {
  return ve.test(e2) ? e2.replace(ge, we).replace(Se, "-ms-") : e2;
}
var be = function(e2) {
  return null == e2 || false === e2 || "" === e2;
};
function _e(e2, n2, r2, o2) {
  if (Array.isArray(e2)) {
    for (var s2, i2 = [], a2 = 0, c2 = e2.length; a2 < c2; a2 += 1) "" !== (s2 = _e(e2[a2], n2, r2, o2)) && (Array.isArray(s2) ? i2.push.apply(i2, s2) : i2.push(s2));
    return i2;
  }
  if (be(e2)) return "";
  if (_(e2)) return "." + e2.styledComponentId;
  if (E(e2)) {
    if ("function" != typeof (l2 = e2) || l2.prototype && l2.prototype.isReactComponent || !n2) return e2;
    var u2 = e2(n2);
    return (0, import_react_is.isElement)(u2) && console.warn(b(e2) + " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details."), _e(u2, n2, r2, o2);
  }
  var l2;
  return e2 instanceof ye ? r2 ? (e2.inject(r2, o2), e2.getName(o2)) : e2 : g(e2) ? function e3(t2, n3) {
    var r3, o3, s3 = [];
    for (var i3 in t2) t2.hasOwnProperty(i3) && !be(t2[i3]) && (Array.isArray(t2[i3]) && t2[i3].isCss || E(t2[i3]) ? s3.push(Ee(i3) + ":", t2[i3], ";") : g(t2[i3]) ? s3.push.apply(s3, e3(t2[i3], i3)) : s3.push(Ee(i3) + ": " + (r3 = i3, null == (o3 = t2[i3]) || "boolean" == typeof o3 || "" === o3 ? "" : "number" != typeof o3 || 0 === o3 || r3 in unitless_browser_esm_default || r3.startsWith("--") ? String(o3).trim() : o3 + "px") + ";"));
    return n3 ? [n3 + " {"].concat(s3, ["}"]) : s3;
  }(e2) : e2.toString();
}
var Ne = function(e2) {
  return Array.isArray(e2) && (e2.isCss = true), e2;
};
function Ae(e2) {
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++) n2[r2 - 1] = arguments[r2];
  return E(e2) || g(e2) ? Ne(_e(v(S, [e2].concat(n2)))) : 0 === n2.length && 1 === e2.length && "string" == typeof e2[0] ? e2 : Ne(_e(v(e2, n2)));
}
var Ce = /invalid hook call/i;
var Ie = /* @__PURE__ */ new Set();
var Pe = function(e2, t2) {
  if (true) {
    var n2 = "The component " + e2 + (t2 ? ' with the id of "' + t2 + '"' : "") + " has been created dynamically.\nYou may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.", r2 = console.error;
    try {
      var o2 = true;
      console.error = function(e3) {
        if (Ce.test(e3)) o2 = false, Ie.delete(n2);
        else {
          for (var t3 = arguments.length, s2 = new Array(t3 > 1 ? t3 - 1 : 0), i2 = 1; i2 < t3; i2++) s2[i2 - 1] = arguments[i2];
          r2.apply(void 0, [e3].concat(s2));
        }
      }, (0, import_react.useRef)(), o2 && !Ie.has(n2) && (console.warn(n2), Ie.add(n2));
    } catch (e3) {
      Ce.test(e3.message) && Ie.delete(n2);
    } finally {
      console.error = r2;
    }
  }
};
var Oe = function(e2, t2, n2) {
  return void 0 === n2 && (n2 = w), e2.theme !== n2.theme && e2.theme || t2 || n2.theme;
};
var Re = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g;
var De = /(^-|-$)/g;
function je(e2) {
  return e2.replace(Re, "-").replace(De, "");
}
var Te = function(e2) {
  return Q(te(e2) >>> 0);
};
function xe(e2) {
  return "string" == typeof e2 && e2.charAt(0) === e2.charAt(0).toLowerCase();
}
var ke = function(e2) {
  return "function" == typeof e2 || "object" == typeof e2 && null !== e2 && !Array.isArray(e2);
};
var Ve = function(e2) {
  return "__proto__" !== e2 && "constructor" !== e2 && "prototype" !== e2;
};
function Be(e2, t2, n2) {
  var r2 = e2[n2];
  ke(t2) && ke(r2) ? ze(r2, t2) : e2[n2] = t2;
}
function ze(e2) {
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++) n2[r2 - 1] = arguments[r2];
  for (var o2 = 0, s2 = n2; o2 < s2.length; o2++) {
    var i2 = s2[o2];
    if (ke(i2)) for (var a2 in i2) Ve(a2) && Be(e2, i2[a2], a2);
  }
  return e2;
}
var Me = import_react.default.createContext();
var Ge = Me.Consumer;
function Le(e2) {
  var t2 = (0, import_react.useContext)(Me), n2 = (0, import_react.useMemo)(function() {
    return function(e3, t3) {
      if (!e3) return D(14);
      if (E(e3)) {
        var n3 = e3(t3);
        return null !== n3 && !Array.isArray(n3) && "object" == typeof n3 ? n3 : D(7);
      }
      return Array.isArray(e3) || "object" != typeof e3 ? D(8) : t3 ? y({}, t3, {}, e3) : e3;
    }(e2.theme, t2);
  }, [e2.theme, t2]);
  return e2.children ? import_react.default.createElement(Me.Provider, { value: n2 }, e2.children) : null;
}
var Fe = {};
function Ye(e2, t2, n2) {
  var o2 = _(e2), i2 = !xe(e2), a2 = t2.attrs, c2 = void 0 === a2 ? S : a2, l2 = t2.componentId, d2 = void 0 === l2 ? function(e3, t3) {
    var n3 = "string" != typeof e3 ? "sc" : je(e3);
    Fe[n3] = (Fe[n3] || 0) + 1;
    var r2 = n3 + "-" + Te("5.3.11" + n3 + Fe[n3]);
    return t3 ? t3 + "-" + r2 : r2;
  }(t2.displayName, t2.parentComponentId) : l2, h = t2.displayName, p = void 0 === h ? function(e3) {
    return xe(e3) ? "styled." + e3 : "Styled(" + b(e3) + ")";
  }(e2) : h, v2 = t2.displayName && t2.componentId ? je(t2.displayName) + "-" + t2.componentId : t2.componentId || d2, g2 = o2 && e2.attrs ? Array.prototype.concat(e2.attrs, c2).filter(Boolean) : c2, N2 = t2.shouldForwardProp;
  o2 && e2.shouldForwardProp && (N2 = t2.shouldForwardProp ? function(n3, r2, o3) {
    return e2.shouldForwardProp(n3, r2, o3) && t2.shouldForwardProp(n3, r2, o3);
  } : e2.shouldForwardProp);
  var A, C2 = new oe(n2, v2, o2 ? e2.componentStyle : void 0), I2 = C2.isStatic && 0 === c2.length, P = function(e3, t3) {
    return function(e4, t4, n3, r2) {
      var o3 = e4.attrs, i3 = e4.componentStyle, a3 = e4.defaultProps, c3 = e4.foldedComponentIds, l3 = e4.shouldForwardProp, d3 = e4.styledComponentId, h2 = e4.target, p2 = function(e5, t5, n4) {
        void 0 === e5 && (e5 = w);
        var r3 = y({}, t5, { theme: e5 }), o4 = {};
        return n4.forEach(function(e6) {
          var t6, n5, s2, i4 = e6;
          for (t6 in E(i4) && (i4 = i4(r3)), i4) r3[t6] = o4[t6] = "className" === t6 ? (n5 = o4[t6], s2 = i4[t6], n5 && s2 ? n5 + " " + s2 : n5 || s2) : i4[t6];
        }), [r3, o4];
      }(Oe(t4, (0, import_react.useContext)(Me), a3) || w, t4, o3), m2 = p2[0], v3 = p2[1], g3 = function(e5, t5, n4, r3) {
        var o4 = pe(), s2 = fe(), i4 = t5 ? e5.generateAndInjectStyles(w, o4, s2) : e5.generateAndInjectStyles(n4, o4, s2);
        return !t5 && r3 && r3(i4), i4;
      }(i3, r2, m2, true ? e4.warnTooManyClasses : void 0), S2 = n3, b2 = v3.$as || t4.$as || v3.as || t4.as || h2, _2 = xe(b2), N3 = v3 !== t4 ? y({}, t4, {}, v3) : t4, A2 = {};
      for (var C3 in N3) "$" !== C3[0] && "as" !== C3 && ("forwardedAs" === C3 ? A2.as = N3[C3] : (l3 ? l3(C3, isPropValid, b2) : !_2 || isPropValid(C3)) && (A2[C3] = N3[C3]));
      return t4.style && v3.style !== t4.style && (A2.style = y({}, t4.style, {}, v3.style)), A2.className = Array.prototype.concat(c3, d3, g3 !== d3 ? g3 : null, t4.className, v3.className).filter(Boolean).join(" "), A2.ref = S2, (0, import_react.createElement)(b2, A2);
    }(A, e3, t3, I2);
  };
  return P.displayName = p, (A = import_react.default.forwardRef(P)).attrs = g2, A.componentStyle = C2, A.displayName = p, A.shouldForwardProp = N2, A.foldedComponentIds = o2 ? Array.prototype.concat(e2.foldedComponentIds, e2.styledComponentId) : S, A.styledComponentId = v2, A.target = o2 ? e2.target : e2, A.withComponent = function(e3) {
    var r2 = t2.componentId, o3 = function(e4, t3) {
      if (null == e4) return {};
      var n3, r3, o4 = {}, s3 = Object.keys(e4);
      for (r3 = 0; r3 < s3.length; r3++) n3 = s3[r3], t3.indexOf(n3) >= 0 || (o4[n3] = e4[n3]);
      return o4;
    }(t2, ["componentId"]), s2 = r2 && r2 + "-" + (xe(e3) ? e3 : je(b(e3)));
    return Ye(e3, y({}, o3, { attrs: g2, componentId: s2 }), n2);
  }, Object.defineProperty(A, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(t3) {
    this._foldedDefaultProps = o2 ? ze({}, e2.defaultProps, t3) : t3;
  } }), Pe(p, v2), A.warnTooManyClasses = /* @__PURE__ */ function(e3, t3) {
    var n3 = {}, r2 = false;
    return function(o3) {
      if (!r2 && (n3[o3] = true, Object.keys(n3).length >= 200)) {
        var s2 = t3 ? ' with the id of "' + t3 + '"' : "";
        console.warn("Over 200 classes were generated for component " + e3 + s2 + ".\nConsider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"), r2 = true, n3 = {};
      }
    };
  }(p, v2), Object.defineProperty(A, "toString", { value: function() {
    return "." + A.styledComponentId;
  } }), i2 && (0, import_hoist_non_react_statics.default)(A, e2, { attrs: true, componentStyle: true, displayName: true, foldedComponentIds: true, shouldForwardProp: true, styledComponentId: true, target: true, withComponent: true }), A;
}
var qe = function(e2) {
  return function e3(t2, r2, o2) {
    if (void 0 === o2 && (o2 = w), !(0, import_react_is.isValidElementType)(r2)) return D(1, String(r2));
    var s2 = function() {
      return t2(r2, o2, Ae.apply(void 0, arguments));
    };
    return s2.withConfig = function(n2) {
      return e3(t2, r2, y({}, o2, {}, n2));
    }, s2.attrs = function(n2) {
      return e3(t2, r2, y({}, o2, { attrs: Array.prototype.concat(o2.attrs, n2).filter(Boolean) }));
    }, s2;
  }(Ye, e2);
};
["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "textPath", "tspan"].forEach(function(e2) {
  qe[e2] = qe(e2);
});
var He = function() {
  function e2(e3, t3) {
    this.rules = e3, this.componentId = t3, this.isStatic = ne(e3), X.registerId(this.componentId + 1);
  }
  var t2 = e2.prototype;
  return t2.createStyles = function(e3, t3, n2, r2) {
    var o2 = r2(_e(this.rules, t3, n2, r2).join(""), ""), s2 = this.componentId + e3;
    n2.insertRules(s2, s2, o2);
  }, t2.removeStyles = function(e3, t3) {
    t3.clearRules(this.componentId + e3);
  }, t2.renderStyles = function(e3, t3, n2, r2) {
    e3 > 2 && X.registerId(this.componentId + e3), this.removeStyles(e3, n2), this.createStyles(e3, t3, n2, r2);
  }, e2;
}();
function We(e2) {
  "undefined" != typeof navigator && "ReactNative" === navigator.product && console.warn("`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.");
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++) n2[r2 - 1] = arguments[r2];
  var o2 = Ae.apply(void 0, [e2].concat(n2)).join(""), s2 = Te(o2);
  return new ye(s2, o2);
}
var Ue = function() {
  function e2() {
    var e3 = this;
    this._emitSheetCSS = function() {
      var t3 = e3.instance.toString();
      if (!t3) return "";
      var n2 = Y();
      return "<style " + [n2 && 'nonce="' + n2 + '"', N + '="true"', 'data-styled-version="5.3.11"'].filter(Boolean).join(" ") + ">" + t3 + "</style>";
    }, this.getStyleTags = function() {
      return e3.sealed ? D(2) : e3._emitSheetCSS();
    }, this.getStyleElement = function() {
      var t3;
      if (e3.sealed) return D(2);
      var n2 = ((t3 = {})[N] = "", t3["data-styled-version"] = "5.3.11", t3.dangerouslySetInnerHTML = { __html: e3.instance.toString() }, t3), o2 = Y();
      return o2 && (n2.nonce = o2), [import_react.default.createElement("style", y({}, n2, { key: "sc-0-0" }))];
    }, this.seal = function() {
      e3.sealed = true;
    }, this.instance = new X({ isServer: true }), this.sealed = false;
  }
  var t2 = e2.prototype;
  return t2.collectStyles = function(e3) {
    return this.sealed ? D(2) : import_react.default.createElement(me, { sheet: this.instance }, e3);
  }, t2.interleaveWithNodeStream = function(e3) {
    return D(3);
  }, e2;
}();
"undefined" != typeof navigator && "ReactNative" === navigator.product && console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native"), "undefined" != typeof window && (window["__styled-components-init__"] = window["__styled-components-init__"] || 0, 1 === window["__styled-components-init__"] && console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."), window["__styled-components-init__"] += 1);
var styled_components_browser_esm_default = qe;

// node_modules/react-doc-viewer/build/components/HeaderBar.js
var import_react6 = __toESM(require_react());

// node_modules/react-doc-viewer/build/state/index.js
var import_react2 = __toESM(require_react());

// node_modules/react-doc-viewer/build/state/actions.js
var SET_ALL_DOCUMENTS = "SET_ALL_DOCUMENTS";
var setAllDocuments = function(documents) {
  return {
    type: SET_ALL_DOCUMENTS,
    documents
  };
};
var SET_DOCUMENT_LOADING = "SET_DOCUMENT_LOADING";
var setDocumentLoading = function(value) {
  return {
    type: SET_DOCUMENT_LOADING,
    value
  };
};
var NEXT_DOCUMENT = "NEXT_DOCUMENT";
var nextDocument = function() {
  return { type: NEXT_DOCUMENT };
};
var PREVIOUS_DOCUMENT = "PREVIOUS_DOCUMENT";
var previousDocument = function() {
  return {
    type: PREVIOUS_DOCUMENT
  };
};
var UPDATE_CURRENT_DOCUMENT = "UPDATE_CURRENT_DOCUMENT";
var updateCurrentDocument = function(document2) {
  return { type: UPDATE_CURRENT_DOCUMENT, document: document2 };
};
var SET_RENDERER_RECT = "SET_RENDERER_RECT";
var setRendererRect = function(rect) {
  return {
    type: SET_RENDERER_RECT,
    rect
  };
};
var SET_MAIN_CONFIG = "SET_MAIN_CONFIG";
var setMainConfig = function(config) {
  return {
    type: SET_MAIN_CONFIG,
    config
  };
};

// node_modules/react-doc-viewer/build/state/reducer.js
var __assign = function() {
  __assign = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
var initialState = {
  currentFileNo: 0,
  documents: [],
  documentLoading: true,
  currentDocument: void 0,
  rendererRect: void 0,
  config: {},
  pluginRenderers: []
};
var mainStateReducer = function(state, action) {
  if (state === void 0) {
    state = initialState;
  }
  switch (action.type) {
    case SET_ALL_DOCUMENTS: {
      var documents = action.documents;
      return __assign(__assign({}, state), { documents, currentDocument: documents[0] || null });
    }
    case SET_DOCUMENT_LOADING: {
      var value = action.value;
      return __assign(__assign({}, state), { documentLoading: value });
    }
    case NEXT_DOCUMENT: {
      if (state.currentFileNo >= state.documents.length - 1)
        return state;
      var nextDocumentNo = state.currentFileNo + 1;
      return __assign(__assign({}, state), { currentFileNo: nextDocumentNo, currentDocument: state.documents[nextDocumentNo], documentLoading: true });
    }
    case PREVIOUS_DOCUMENT: {
      if (state.currentFileNo <= 0)
        return state;
      var prevDocumentNo = state.currentFileNo - 1;
      return __assign(__assign({}, state), { currentFileNo: state.currentFileNo - 1, currentDocument: state.documents[prevDocumentNo], documentLoading: true });
    }
    case UPDATE_CURRENT_DOCUMENT: {
      var document_1 = action.document;
      return __assign(__assign({}, state), { currentDocument: document_1 });
    }
    case SET_RENDERER_RECT: {
      var rect = action.rect;
      return __assign(__assign({}, state), { rendererRect: rect });
    }
    case SET_MAIN_CONFIG: {
      var config = action.config;
      return __assign(__assign({}, state), { config });
    }
    default:
      return state;
  }
};

// node_modules/react-doc-viewer/build/state/index.js
var __assign2 = function() {
  __assign2 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign2.apply(this, arguments);
};
var DocViewerContext = (0, import_react2.createContext)({ state: initialState, dispatch: function() {
  return null;
} });
var AppProvider = function(props) {
  var children = props.children, documents = props.documents, config = props.config, pluginRenderers = props.pluginRenderers;
  var _a2 = (0, import_react2.useReducer)(mainStateReducer, __assign2(__assign2({}, initialState), { documents: documents || [], currentDocument: documents && documents.length ? documents[0] : void 0, config, pluginRenderers })), state = _a2[0], dispatch = _a2[1];
  (0, import_react2.useEffect)(function() {
    dispatch(setAllDocuments(documents));
    config && dispatch(setMainConfig(config));
  }, [documents]);
  return import_react2.default.createElement(DocViewerContext.Provider, { value: { state, dispatch } }, children);
};

// node_modules/react-doc-viewer/build/components/DocumentNav.js
var import_react4 = __toESM(require_react());

// node_modules/react-doc-viewer/build/components/common/Button.js
var __makeTemplateObject = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var ButtonPrimaryStyle = Ae(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  color: ", ";\n"], ["\n  background-color: ", ";\n  color: ", ";\n"])), function(props) {
  return props.theme.primary;
}, function(props) {
  return props.theme.text_primary;
});
var ButtonSecondaryStyle = Ae(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background-color: ", ";\n  color: ", ";\n"], ["\n  background-color: ", ";\n  color: ", ";\n"])), function(props) {
  return props.theme.secondary;
}, function(props) {
  return props.theme.text_secondary;
});
var Button = styled_components_browser_esm_default.button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  ", "\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 35px;\n  height: 35px;\n  padding: 0;\n  margin: 0 0 0 5px;\n  text-align: center;\n  font-size: 18px;\n  border: 0;\n  outline: none;\n  cursor: pointer;\n  text-decoration: none;\n  border-radius: 35px;\n  opacity: ", ";\n  pointer-events: ", ";\n  box-shadow: 2px 2px 3px #00000033;\n\n  @media (max-width: 768px) {\n    width: 30px;\n    height: 30px;\n    font-size: 15px;\n  }\n"], ["\n  ", "\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 35px;\n  height: 35px;\n  padding: 0;\n  margin: 0 0 0 5px;\n  text-align: center;\n  font-size: 18px;\n  border: 0;\n  outline: none;\n  cursor: pointer;\n  text-decoration: none;\n  border-radius: 35px;\n  opacity: ", ";\n  pointer-events: ", ";\n  box-shadow: 2px 2px 3px #00000033;\n\n  @media (max-width: 768px) {\n    width: 30px;\n    height: 30px;\n    font-size: 15px;\n  }\n"])), ButtonPrimaryStyle, function(props) {
  return props.disabled ? 0.4 : 1;
}, function(props) {
  return props.disabled ? "none" : "all";
});
var LinkButton = styled_components_browser_esm_default.a(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border: 0;\n  outline: none;\n  cursor: pointer;\n  text-decoration: none;\n  border-radius: 35px;\n  background-color: ", ";\n  color: ", ";\n  box-shadow: 2px 2px 3px #00000033;\n\n  width: 35px;\n  height: 35px;\n  font-size: 18px;\n  @media (max-width: 768px) {\n    width: 30px;\n    height: 30px;\n    font-size: 15px;\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border: 0;\n  outline: none;\n  cursor: pointer;\n  text-decoration: none;\n  border-radius: 35px;\n  background-color: ", ";\n  color: ", ";\n  box-shadow: 2px 2px 3px #00000033;\n\n  width: 35px;\n  height: 35px;\n  font-size: 18px;\n  @media (max-width: 768px) {\n    width: 30px;\n    height: 30px;\n    font-size: 15px;\n  }\n"])), function(props) {
  return props.theme.primary;
}, function(props) {
  return props.theme.text_primary;
});
var ButtonPrimary = styled_components_browser_esm_default(Button)(templateObject_5 || (templateObject_5 = __makeTemplateObject([""], [""])));
var ButtonSecondary = styled_components_browser_esm_default(Button)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), ButtonSecondaryStyle);
var templateObject_1;
var templateObject_2;
var templateObject_3;
var templateObject_4;
var templateObject_5;
var templateObject_6;

// node_modules/react-doc-viewer/build/components/icons/index.js
var import_react3 = __toESM(require_react());
var __assign3 = function() {
  __assign3 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign3.apply(this, arguments);
};
var PrevDocIcon = function(props) {
  return import_react3.default.createElement(DocNavIcon, __assign3({}, props));
};
var NextDocIcon = function(props) {
  return import_react3.default.createElement(DocNavIcon, __assign3({}, props, { reverse: true }));
};
var DocNavIcon = function(props) {
  var color = props.color, size = props.size, reverse = props.reverse;
  return import_react3.default.createElement(
    "svg",
    { width: size || "100%", height: size || "100%", style: { transform: "".concat(reverse ? "rotate(180deg)" : "") }, id: "arrow_left", version: "1.1", viewBox: "0 0 32 32", xmlSpace: "preserve" },
    import_react3.default.createElement("path", { clipRule: "evenodd", d: "M31.106,15H3.278l8.325-8.293  c0.391-0.391,0.391-1.024,0-1.414c-0.391-0.391-1.024-0.391-1.414,0l-9.9,9.899c-0.385,0.385-0.385,1.029,0,1.414l9.9,9.9  c0.391,0.391,1.024,0.391,1.414,0c0.391-0.391,0.391-1.024,0-1.414L3.278,17h27.828c0.552,0,1-0.448,1-1  C32.106,15.448,31.658,15,31.106,15z", fill: color || "#aaa", fillRule: "evenodd", id: "Arrow_Back" })
  );
};
var LoadingIcon = function(props) {
  var color = props.color, size = props.size;
  return import_react3.default.createElement(
    "svg",
    { width: size || "100%", height: size || "100%", version: "1.1", id: "Icons", viewBox: "0 0 32 32", xmlSpace: "preserve", style: { alignSelf: "center", justifySelf: "center" } },
    import_react3.default.createElement(
      "g",
      null,
      import_react3.default.createElement("path", { fill: color || "#aaa", d: "M16,2c-0.6,0-1,0.4-1,1v5c0,0.6,0.4,1,1,1s1-0.4,1-1V3C17,2.4,16.6,2,16,2z" }),
      import_react3.default.createElement("path", { fill: color || "#aaa", d: "M7.5,6.1c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l3.5,3.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.5,6.1\n		z" }),
      import_react3.default.createElement("path", { fill: color || "#aaa", d: "M9,16c0-0.6-0.4-1-1-1H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h5C8.6,17,9,16.6,9,16z" }),
      import_react3.default.createElement("path", { fill: color || "#aaa", d: "M9.6,20.9l-3.5,3.5c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l3.5-3.5c0.4-0.4,0.4-1,0-1.4\n		S10,20.6,9.6,20.9z" }),
      import_react3.default.createElement("path", { fill: color || "#aaa", d: "M16,23c-0.6,0-1,0.4-1,1v5c0,0.6,0.4,1,1,1s1-0.4,1-1v-5C17,23.4,16.6,23,16,23z" }),
      import_react3.default.createElement("path", { fill: color || "#aaa", d: "M22.4,20.9c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l3.5,3.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4\n		L22.4,20.9z" }),
      import_react3.default.createElement("path", { fill: color || "#aaa", d: "M29,15h-5c-0.6,0-1,0.4-1,1s0.4,1,1,1h5c0.6,0,1-0.4,1-1S29.6,15,29,15z" }),
      import_react3.default.createElement("path", { fill: color || "#aaa", d: "M21.7,11.3c0.3,0,0.5-0.1,0.7-0.3l3.5-3.5c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-3.5,3.5c-0.4,0.4-0.4,1,0,1.4\n		C21.1,11.2,21.4,11.3,21.7,11.3z" })
    )
  );
};

// node_modules/react-doc-viewer/build/components/DocumentNav.js
var __makeTemplateObject2 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var DocumentNav = function() {
  var _a2 = (0, import_react4.useContext)(DocViewerContext), _b = _a2.state, currentDocument = _b.currentDocument, currentFileNo = _b.currentFileNo, documents = _b.documents, dispatch = _a2.dispatch;
  if (documents.length <= 1 || !currentDocument)
    return null;
  var fileName = currentDocument.uri;
  var splitURL = fileName.split("/");
  if (splitURL.length) {
    fileName = splitURL[splitURL.length - 1];
  }
  return import_react4.default.createElement(
    Container,
    { id: "doc-nav" },
    import_react4.default.createElement(
      "p",
      { id: "doc-nav-info" },
      "Doc ",
      currentFileNo + 1,
      " of ",
      documents.length
    ),
    import_react4.default.createElement(
      ButtonPrev,
      { id: "doc-nav-prev", onClick: function() {
        return dispatch(previousDocument());
      }, disabled: currentFileNo === 0 },
      import_react4.default.createElement(PrevDocIcon, { color: "#fff", size: "60%" })
    ),
    import_react4.default.createElement(
      ButtonNext,
      { id: "doc-nav-next", onClick: function() {
        return dispatch(nextDocument());
      }, disabled: currentFileNo >= documents.length - 1 },
      import_react4.default.createElement(NextDocIcon, { color: "#fff", size: "60%" })
    )
  );
};
var Container = styled_components_browser_esm_default.div(templateObject_12 || (templateObject_12 = __makeTemplateObject2(["\n  min-width: 150px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n  margin: 0 10px;\n  color: ", ";\n"], ["\n  min-width: 150px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n  margin: 0 10px;\n  color: ", ";\n"])), function(props) {
  return props.theme.text_primary;
});
var ButtonPrev = styled_components_browser_esm_default(ButtonSecondary)(templateObject_22 || (templateObject_22 = __makeTemplateObject2(["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px 0 10px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px 0 10px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var ButtonNext = styled_components_browser_esm_default(ButtonPrev)(templateObject_32 || (templateObject_32 = __makeTemplateObject2(["\n  margin: 0 5px;\n"], ["\n  margin: 0 5px;\n"])));
var templateObject_12;
var templateObject_22;
var templateObject_32;

// node_modules/react-doc-viewer/build/components/FileName.js
var import_react5 = __toESM(require_react());
var __makeTemplateObject3 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var FileName = function() {
  var _a2, _b;
  var _c = (0, import_react5.useContext)(DocViewerContext).state, config = _c.config, currentDocument = _c.currentDocument;
  if (!currentDocument || ((_a2 = config === null || config === void 0 ? void 0 : config.header) === null || _a2 === void 0 ? void 0 : _a2.disableFileName))
    return null;
  var fileName = currentDocument.uri || "";
  fileName = decodeURI(fileName);
  if (!((_b = config === null || config === void 0 ? void 0 : config.header) === null || _b === void 0 ? void 0 : _b.retainURLParams)) {
    fileName = fileName.split("?")[0];
  }
  var splitURL = fileName.split("/");
  if (splitURL.length) {
    fileName = splitURL[splitURL.length - 1];
  }
  return import_react5.default.createElement(Container2, { id: "file-name", "data-testid": "file-name" }, fileName);
};
var Container2 = styled_components_browser_esm_default.div(templateObject_13 || (templateObject_13 = __makeTemplateObject3(["\n  flex: 1;\n  text-align: left;\n  color: ", ";\n  font-weight: bold;\n  margin: 0 10px;\n  overflow: hidden;\n"], ["\n  flex: 1;\n  text-align: left;\n  color: ", ";\n  font-weight: bold;\n  margin: 0 10px;\n  overflow: hidden;\n"])), function(props) {
  return props.theme.text_primary;
});
var templateObject_13;

// node_modules/react-doc-viewer/build/components/HeaderBar.js
var __makeTemplateObject4 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var HeaderBar = function() {
  var _a2, _b, _c;
  var _d = (0, import_react6.useContext)(DocViewerContext), state = _d.state, dispatch = _d.dispatch;
  var config = state.config;
  if ((_a2 = config === null || config === void 0 ? void 0 : config.header) === null || _a2 === void 0 ? void 0 : _a2.disableHeader)
    return null;
  var override = (_c = (_b = config === null || config === void 0 ? void 0 : config.header) === null || _b === void 0 ? void 0 : _b.overrideComponent) === null || _c === void 0 ? void 0 : _c.call(_b, state, function() {
    return dispatch(previousDocument());
  }, function() {
    return dispatch(nextDocument());
  });
  if (override) {
    return override;
  } else {
    return import_react6.default.createElement(
      Container3,
      { id: "header-bar", "data-testid": "header-bar" },
      import_react6.default.createElement(FileName, null),
      import_react6.default.createElement(DocumentNav, null)
    );
  }
};
var Container3 = styled_components_browser_esm_default.div(templateObject_14 || (templateObject_14 = __makeTemplateObject4(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  z-index: 1;\n  padding: 0 10px;\n  background-color: ", ";\n  font-size: 16px;\n  min-height: 50px;\n\n  @media (max-width: 768px) {\n    min-height: 30px;\n    padding: 5px;\n    font-size: 10px;\n  }\n"], ["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  z-index: 1;\n  padding: 0 10px;\n  background-color: ", ";\n  font-size: 16px;\n  min-height: 50px;\n\n  @media (max-width: 768px) {\n    min-height: 30px;\n    padding: 5px;\n    font-size: 10px;\n  }\n"])), function(props) {
  return props.theme.primary;
});
var templateObject_14;

// node_modules/react-doc-viewer/build/components/ProxyRenderer.js
var import_react10 = __toESM(require_react());

// node_modules/react-doc-viewer/build/utils/useDocumentLoader.js
var import_react8 = __toESM(require_react());

// node_modules/react-doc-viewer/build/utils/fileLoaders.js
var __assign4 = function() {
  __assign4 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign4.apply(this, arguments);
};
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = function(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t2[0] & 1) throw t2[1];
    return t2[1];
  }, trys: [], ops: [] }, f, y2, t2, g2;
  return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g2 && (g2 = 0, op[0] && (_2 = 0)), _2) try {
      if (f = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done) return t2;
      if (y2 = 0, t2) op = [op[0] & 2, t2.value];
      switch (op[0]) {
        case 0:
        case 1:
          t2 = op;
          break;
        case 4:
          _2.label++;
          return { value: op[1], done: false };
        case 5:
          _2.label++;
          y2 = op[1];
          op = [0];
          continue;
        case 7:
          op = _2.ops.pop();
          _2.trys.pop();
          continue;
        default:
          if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _2 = 0;
            continue;
          }
          if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
            _2.label = op[1];
            break;
          }
          if (op[0] === 6 && _2.label < t2[1]) {
            _2.label = t2[1];
            t2 = op;
            break;
          }
          if (t2 && _2.label < t2[2]) {
            _2.label = t2[2];
            _2.ops.push(op);
            break;
          }
          if (t2[2]) _2.ops.pop();
          _2.trys.pop();
          continue;
      }
      op = body.call(thisArg, _2);
    } catch (e2) {
      op = [6, e2];
      y2 = 0;
    } finally {
      f = t2 = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var _fileLoader = function(_a2) {
  var documentURI = _a2.documentURI, signal = _a2.signal, fileLoaderComplete = _a2.fileLoaderComplete, readerTypeFunction = _a2.readerTypeFunction;
  return fetch(documentURI, { signal }).then(function(res) {
    return __awaiter(void 0, void 0, void 0, function() {
      var blob, fileReader;
      return __generator(this, function(_a3) {
        switch (_a3.label) {
          case 0:
            return [4, res.blob()];
          case 1:
            blob = _a3.sent();
            fileReader = new FileReader();
            fileReader.addEventListener("loadend", function() {
              return fileLoaderComplete(fileReader);
            });
            switch (readerTypeFunction) {
              case "arrayBuffer":
                fileReader.readAsArrayBuffer(blob);
                break;
              case "binaryString":
                fileReader.readAsBinaryString(blob);
                break;
              case "dataURL":
                fileReader.readAsDataURL(blob);
                break;
              case "text":
                fileReader.readAsText(blob);
                break;
              default:
                break;
            }
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }).catch(function(e2) {
    return e2;
  });
};
var arrayBufferFileLoader = function(props) {
  return _fileLoader(__assign4(__assign4({}, props), { readerTypeFunction: "arrayBuffer" }));
};
var dataURLFileLoader = function(props) {
  return _fileLoader(__assign4(__assign4({}, props), { readerTypeFunction: "dataURL" }));
};
var textFileLoader = function(props) {
  return _fileLoader(__assign4(__assign4({}, props), { readerTypeFunction: "text" }));
};
var binaryStringFileLoader = function(props) {
  return _fileLoader(__assign4(__assign4({}, props), { readerTypeFunction: "binaryString" }));
};
var defaultFileLoader = dataURLFileLoader;

// node_modules/react-doc-viewer/build/utils/useRendererSelector.js
var import_react7 = __toESM(require_react());
var useRendererSelector = function() {
  var _a2 = (0, import_react7.useContext)(DocViewerContext).state, currentDocument = _a2.currentDocument, pluginRenderers = _a2.pluginRenderers;
  var _b = (0, import_react7.useState)(), CurrentRenderer = _b[0], setCurrentRenderer = _b[1];
  (0, import_react7.useEffect)(function() {
    if (!currentDocument)
      return;
    if (!currentDocument.fileType) {
      setCurrentRenderer(void 0);
      return;
    }
    var matchingRenderers = [];
    pluginRenderers === null || pluginRenderers === void 0 ? void 0 : pluginRenderers.map(function(r2) {
      if (currentDocument.fileType === void 0)
        return;
      if (r2.fileTypes.indexOf(currentDocument.fileType) >= 0) {
        matchingRenderers.push(r2);
      }
    });
    var SelectedRenderer = matchingRenderers.sort(function(a2, b2) {
      return b2.weight - a2.weight;
    })[0];
    if (SelectedRenderer && SelectedRenderer !== void 0) {
      setCurrentRenderer(function() {
        return SelectedRenderer;
      });
    } else {
      setCurrentRenderer(null);
    }
  }, [currentDocument]);
  return { CurrentRenderer };
};

// node_modules/react-doc-viewer/build/utils/useDocumentLoader.js
var __assign5 = function() {
  __assign5 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign5.apply(this, arguments);
};
var useDocumentLoader = function() {
  var _a2 = (0, import_react8.useContext)(DocViewerContext), state = _a2.state, dispatch = _a2.dispatch;
  var currentFileNo = state.currentFileNo, currentDocument = state.currentDocument;
  var CurrentRenderer = useRendererSelector().CurrentRenderer;
  var documentURI = (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri) || "";
  (0, import_react8.useEffect)(
    function() {
      if (!currentDocument)
        return;
      if (currentDocument.fileType !== void 0)
        return;
      var controller = new AbortController();
      var signal = controller.signal;
      fetch(documentURI, { method: "HEAD", signal }).then(function(response) {
        var contentTypeRaw = response.headers.get("content-type");
        var contentTypes = (contentTypeRaw === null || contentTypeRaw === void 0 ? void 0 : contentTypeRaw.split(";")) || [];
        var contentType = contentTypes.length ? contentTypes[0] : void 0;
        dispatch(updateCurrentDocument(__assign5(__assign5({}, currentDocument), { fileType: contentType || void 0 })));
      });
      return function() {
        controller.abort();
      };
    },
    // eslint ignore added, because a warning appears for dispatch to
    // be a dependancy of the useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFileNo, documentURI]
  );
  (0, import_react8.useEffect)(function() {
    var _a3;
    if (!currentDocument || CurrentRenderer === void 0)
      return;
    var controller = new AbortController();
    var signal = controller.signal;
    var fileLoaderComplete = function(fileReader) {
      if (!currentDocument || !fileReader) {
        dispatch(setDocumentLoading(false));
        return;
      }
      var updatedDocument = __assign5({}, currentDocument);
      if (fileReader.result !== null) {
        updatedDocument.fileData = fileReader.result;
      }
      dispatch(updateCurrentDocument(updatedDocument));
      dispatch(setDocumentLoading(false));
    };
    if (CurrentRenderer === null) {
      dispatch(setDocumentLoading(false));
    } else if (CurrentRenderer.fileLoader !== void 0) {
      (_a3 = CurrentRenderer.fileLoader) === null || _a3 === void 0 ? void 0 : _a3.call(CurrentRenderer, { documentURI, signal, fileLoaderComplete });
    } else {
      defaultFileLoader({ documentURI, signal, fileLoaderComplete });
    }
    return function() {
      controller.abort();
    };
  }, [CurrentRenderer]);
  return { state, dispatch, CurrentRenderer };
};

// node_modules/react-doc-viewer/build/utils/useWindowSize.js
var import_react9 = __toESM(require_react());
var useWindowSize = function() {
  var _a2 = (0, import_react9.useState)({
    width: void 0,
    height: void 0
  }), windowSize = _a2[0], setWindowSize = _a2[1];
  (0, import_react9.useEffect)(function() {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return function() {
      return window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowSize;
};

// node_modules/react-doc-viewer/build/components/ProxyRenderer.js
var __makeTemplateObject5 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var ProxyRenderer = function() {
  var _a2 = useDocumentLoader(), state = _a2.state, dispatch = _a2.dispatch, CurrentRenderer = _a2.CurrentRenderer;
  var documents = state.documents, documentLoading = state.documentLoading, currentDocument = state.currentDocument;
  var size = useWindowSize();
  var containerRef = (0, import_react10.useCallback)(
    function(node) {
      node && dispatch(setRendererRect(node === null || node === void 0 ? void 0 : node.getBoundingClientRect()));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size]
  );
  var Contents = function() {
    if (!documents.length) {
      return import_react10.default.createElement("div", { id: "no-documents" });
    } else if (documentLoading) {
      return import_react10.default.createElement(
        LoadingContainer,
        { id: "loading-renderer", "data-testid": "loading-renderer" },
        import_react10.default.createElement(
          LoadingIconContainer,
          null,
          import_react10.default.createElement(LoadingIcon, { color: "#444", size: 40 })
        )
      );
    } else {
      if (CurrentRenderer) {
        return import_react10.default.createElement(CurrentRenderer, { mainState: state });
      } else if (CurrentRenderer === void 0) {
        return null;
      } else {
        return import_react10.default.createElement(
          "div",
          { id: "no-renderer", "data-testid": "no-renderer" },
          "No Renderer for file type ",
          currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileType,
          import_react10.default.createElement(DownloadButton, { id: "no-renderer-download", href: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri, download: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri }, "Download File")
        );
      }
    }
  };
  return import_react10.default.createElement(
    Container4,
    { id: "proxy-renderer", ref: containerRef },
    import_react10.default.createElement(Contents, null)
  );
};
var Container4 = styled_components_browser_esm_default.div(templateObject_15 || (templateObject_15 = __makeTemplateObject5(["\n  display: flex;\n  flex: 1;\n  overflow-y: auto;\n"], ["\n  display: flex;\n  flex: 1;\n  overflow-y: auto;\n"])));
var LoadingContainer = styled_components_browser_esm_default.div(templateObject_23 || (templateObject_23 = __makeTemplateObject5(["\n  display: flex;\n  flex: 1;\n  height: 75px;\n  align-items: center;\n  justify-content: center;\n"], ["\n  display: flex;\n  flex: 1;\n  height: 75px;\n  align-items: center;\n  justify-content: center;\n"])));
var spinAnim = We(templateObject_33 || (templateObject_33 = __makeTemplateObject5(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"], ["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var LoadingIconContainer = styled_components_browser_esm_default.div(templateObject_42 || (templateObject_42 = __makeTemplateObject5(["\n  animation-name: ", ";\n  animation-duration: 4s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n"], ["\n  animation-name: ", ";\n  animation-duration: 4s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n"])), spinAnim);
var DownloadButton = styled_components_browser_esm_default(LinkButton)(templateObject_52 || (templateObject_52 = __makeTemplateObject5(["\n  width: 130px;\n  height: 30px;\n  background-color: ", ";\n  @media (max-width: 768px) {\n    width: 125px;\n    height: 25px;\n  }\n"], ["\n  width: 130px;\n  height: 30px;\n  background-color: ", ";\n  @media (max-width: 768px) {\n    width: 125px;\n    height: 25px;\n  }\n"])), function(props) {
  return props.theme.primary;
});
var templateObject_15;
var templateObject_23;
var templateObject_33;
var templateObject_42;
var templateObject_52;

// node_modules/react-doc-viewer/build/plugins/bmp/index.js
var import_react12 = __toESM(require_react());

// node_modules/react-doc-viewer/build/plugins/image/index.js
var import_react11 = __toESM(require_react());
var __makeTemplateObject6 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var __assign6 = function() {
  __assign6 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign6.apply(this, arguments);
};
var ImageProxyRenderer = function(props) {
  var currentDocument = props.mainState.currentDocument, children = props.children;
  if (!currentDocument)
    return null;
  return import_react11.default.createElement(Container5, __assign6({ id: "image-renderer" }, props), children || import_react11.default.createElement(Img, { id: "image-img", src: currentDocument.fileData }));
};
var image_default = ImageProxyRenderer;
ImageProxyRenderer.fileTypes = [];
ImageProxyRenderer.weight = 0;
var Container5 = styled_components_browser_esm_default.div(templateObject_16 || (templateObject_16 = __makeTemplateObject6(["\n  display: flex;\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  background-color: #fff;\n"], ["\n  display: flex;\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  background-color: #fff;\n"])));
var Img = styled_components_browser_esm_default.img(templateObject_24 || (templateObject_24 = __makeTemplateObject6(["\n  max-width: 95%;\n  max-height: 95%;\n"], ["\n  max-width: 95%;\n  max-height: 95%;\n"])));
var templateObject_16;
var templateObject_24;

// node_modules/react-doc-viewer/build/plugins/bmp/index.js
var __assign7 = function() {
  __assign7 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign7.apply(this, arguments);
};
var BMPRenderer = function(props) {
  return import_react12.default.createElement(image_default, __assign7({}, props));
};
BMPRenderer.fileTypes = ["bmp", "image/bmp"];
BMPRenderer.weight = 0;
var bmp_default = BMPRenderer;

// node_modules/react-doc-viewer/build/plugins/html/index.js
var import_react13 = __toESM(require_react());
var __makeTemplateObject7 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var HTMLRenderer = function(_a2) {
  var currentDocument = _a2.mainState.currentDocument;
  (0, import_react13.useEffect)(function() {
    var b64String = currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData;
    var bodyBase64 = (b64String === null || b64String === void 0 ? void 0 : b64String.replace("data:text/html;base64,", "")) || "";
    var body = window.atob(bodyBase64);
    var iframeCont = document.getElementById("html-body");
    var iframe = (iframeCont === null || iframeCont === void 0 ? void 0 : iframeCont.contentWindow) && iframeCont.contentWindow;
    if (!iframe)
      return;
    var iframeDoc = iframe.document;
    iframeDoc.open();
    iframeDoc.write("".concat(body));
    iframeDoc.close();
  }, []);
  return import_react13.default.createElement(
    Container6,
    { id: "html-renderer" },
    import_react13.default.createElement(BodyIFrame, { id: "html-body", sandbox: "allow-same-origin" })
  );
};
var html_default = HTMLRenderer;
HTMLRenderer.fileTypes = ["htm", "html", "text/htm", "text/html"];
HTMLRenderer.weight = 0;
HTMLRenderer.fileLoader = dataURLFileLoader;
var Container6 = styled_components_browser_esm_default.div(templateObject_17 || (templateObject_17 = __makeTemplateObject7(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 30px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 30px;\n"])));
var BodyIFrame = styled_components_browser_esm_default.iframe(templateObject_25 || (templateObject_25 = __makeTemplateObject7(["\n  height: 100%;\n  padding: 15px;\n  margin: 20px 0 20px 0;\n  border: 1px solid ", ";\n"], ["\n  height: 100%;\n  padding: 15px;\n  margin: 20px 0 20px 0;\n  border: 1px solid ", ";\n"])), function(props) {
  return props.theme.secondary;
});
var templateObject_17;
var templateObject_25;

// node_modules/react-doc-viewer/build/plugins/jpg/index.js
var import_react14 = __toESM(require_react());
var __assign8 = function() {
  __assign8 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign8.apply(this, arguments);
};
var JPGRenderer = function(props) {
  return import_react14.default.createElement(image_default, __assign8({}, props));
};
JPGRenderer.fileTypes = ["jpg", "jpeg", "image/jpg", "image/jpeg"];
JPGRenderer.weight = 0;
var jpg_default = JPGRenderer;

// node_modules/react-doc-viewer/build/plugins/msdoc/index.js
var import_react15 = __toESM(require_react());
var __makeTemplateObject8 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i2 = 0, l2 = from.length, ar; i2 < l2; i2++) {
    if (ar || !(i2 in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i2);
      ar[i2] = from[i2];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var MSDocRenderer = function(_a2) {
  var currentDocument = _a2.mainState.currentDocument;
  if (!currentDocument)
    return null;
  return import_react15.default.createElement(
    Container7,
    { id: "msdoc-renderer" },
    import_react15.default.createElement(IFrame, { id: "msdoc-iframe", title: "msdoc-iframe", src: "https://view.officeapps.live.com/op/embed.aspx?src=".concat(encodeURIComponent(currentDocument.uri)), frameBorder: "0" })
  );
};
var msdoc_default = MSDocRenderer;
var MSDocFTMaps = {
  doc: ["doc", "application/msword"],
  docx: [
    "docx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ],
  xls: ["xls", "application/vnd.ms-excel"],
  xlsx: [
    "xlsx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ],
  ppt: ["ppt", "application/vnd.ms-powerpoint"],
  pptx: [
    "pptx",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ]
};
MSDocRenderer.fileTypes = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], MSDocFTMaps.doc, true), MSDocFTMaps.docx, true), MSDocFTMaps.xls, true), MSDocFTMaps.xlsx, true), MSDocFTMaps.ppt, true), MSDocFTMaps.pptx, true);
MSDocRenderer.weight = 0;
MSDocRenderer.fileLoader = function(_a2) {
  var fileLoaderComplete = _a2.fileLoaderComplete;
  return fileLoaderComplete();
};
var Container7 = styled_components_browser_esm_default.div(templateObject_18 || (templateObject_18 = __makeTemplateObject8(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var IFrame = styled_components_browser_esm_default.iframe(templateObject_26 || (templateObject_26 = __makeTemplateObject8(["\n  width: 100%;\n  height: 100%;\n  border: 0;\n"], ["\n  width: 100%;\n  height: 100%;\n  border: 0;\n"])));
var templateObject_18;
var templateObject_26;

// node_modules/react-doc-viewer/build/plugins/msg/index.js
var import_react16 = __toESM(require_react());
var import_wl_msg_reader = __toESM(require_wl_msg_reader());
var __makeTemplateObject9 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var MSGRenderer = function(_a2) {
  var currentDocument = _a2.mainState.currentDocument;
  var _b = (0, import_react16.useState)(), fileData = _b[0], setFileData = _b[1];
  (0, import_react16.useEffect)(function() {
    if (!currentDocument || !currentDocument.fileData)
      return;
    var _fd = new import_wl_msg_reader.MSGReader(currentDocument.fileData).getFileData();
    setFileData(_fd);
  }, [currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData]);
  (0, import_react16.useEffect)(function() {
    if (!fileData || fileData.hasOwnProperty("error"))
      return;
    var iframeCont = document.getElementById("msg-body");
    var iframe = (iframeCont === null || iframeCont === void 0 ? void 0 : iframeCont.contentWindow) && iframeCont.contentWindow;
    if (!iframe)
      return;
    var iframeDoc = iframe.document;
    var body = fileData.body.replace(/(\r\n|\n|\r)/gm, "<br />");
    iframeDoc.open();
    iframeDoc.write("".concat(body));
    iframeDoc.close();
  }, [fileData]);
  if (!fileData || fileData.hasOwnProperty("error")) {
    return import_react16.default.createElement("span", null, fileData === null || fileData === void 0 ? void 0 : fileData.error);
  }
  var _c = fileData, recipients = _c.recipients, subject = _c.subject, senderEmail = _c.senderEmail, senderName = _c.senderName;
  return import_react16.default.createElement(
    Container8,
    { id: "msg-renderer" },
    import_react16.default.createElement("h2", { id: "msg-subject-title", style: { marginBottom: 0 } }, subject),
    import_react16.default.createElement(Sender, { name: senderName, email: senderEmail }),
    import_react16.default.createElement(
      RecipientContainer,
      { id: "msg-recipient" },
      import_react16.default.createElement("h3", { id: "msg-recipient-title" }, "Recipients"),
      import_react16.default.createElement("ul", { id: "msg-recipient-ul" }, recipients.map(function(r2, i2) {
        return import_react16.default.createElement(
          "li",
          { key: i2, id: "msg-recipient-li" },
          import_react16.default.createElement("span", { id: "msg-recipient-name" }, r2.name),
          r2.hasOwnProperty("email") && import_react16.default.createElement(
            "span",
            { id: "msg-recipient-email" },
            " - ",
            r2.email
          )
        );
      }))
    ),
    import_react16.default.createElement(BodyIFrame2, { id: "msg-body", sandbox: "allow-same-origin" })
  );
};
var Sender = function(_a2) {
  var name = _a2.name, email = _a2.email;
  if (!name && !email)
    return null;
  return import_react16.default.createElement(
    SenderContainer,
    { id: "msg-sender" },
    import_react16.default.createElement("h3", { id: "msg-sender-title" }, "Sender"),
    name !== void 0 && import_react16.default.createElement("div", { id: "msg-sender-name" }, name),
    email !== void 0 && import_react16.default.createElement("div", { id: "msg-sender-email" }, email)
  );
};
var msg_default = MSGRenderer;
MSGRenderer.fileTypes = ["msg", "application/vnd.ms-outlook"];
MSGRenderer.weight = 0;
MSGRenderer.fileLoader = arrayBufferFileLoader;
var Container8 = styled_components_browser_esm_default.div(templateObject_19 || (templateObject_19 = __makeTemplateObject9(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 30px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 30px;\n"])));
var SenderContainer = styled_components_browser_esm_default.div(templateObject_27 || (templateObject_27 = __makeTemplateObject9(["\n  padding: 0 15px 15px 15px;\n  margin-top: 20px;\n  border: 1px solid ", ";\n"], ["\n  padding: 0 15px 15px 15px;\n  margin-top: 20px;\n  border: 1px solid ", ";\n"])), function(props) {
  return props.theme.secondary;
});
var RecipientContainer = styled_components_browser_esm_default.div(templateObject_34 || (templateObject_34 = __makeTemplateObject9(["\n  padding: 0 15px;\n  margin-top: 20px;\n  border: 1px solid ", ";\n"], ["\n  padding: 0 15px;\n  margin-top: 20px;\n  border: 1px solid ", ";\n"])), function(props) {
  return props.theme.secondary;
});
var BodyIFrame2 = styled_components_browser_esm_default.iframe(templateObject_43 || (templateObject_43 = __makeTemplateObject9(["\n  height: 100%;\n  padding: 15px;\n  margin: 20px 0 20px 0;\n  border: 1px solid ", ";\n"], ["\n  height: 100%;\n  padding: 15px;\n  margin: 20px 0 20px 0;\n  border: 1px solid ", ";\n"])), function(props) {
  return props.theme.secondary;
});
var templateObject_19;
var templateObject_27;
var templateObject_34;
var templateObject_43;

// node_modules/react-doc-viewer/build/plugins/pdf/index.js
var import_react40 = __toESM(require_react());

// node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.mjs
var pdf_exports = {};
__export(pdf_exports, {
  AbortException: () => __webpack_exports__AbortException,
  AnnotationEditorLayer: () => __webpack_exports__AnnotationEditorLayer,
  AnnotationEditorParamsType: () => __webpack_exports__AnnotationEditorParamsType,
  AnnotationEditorType: () => __webpack_exports__AnnotationEditorType,
  AnnotationEditorUIManager: () => __webpack_exports__AnnotationEditorUIManager,
  AnnotationLayer: () => __webpack_exports__AnnotationLayer,
  AnnotationMode: () => __webpack_exports__AnnotationMode,
  CMapCompressionType: () => __webpack_exports__CMapCompressionType,
  ColorPicker: () => __webpack_exports__ColorPicker,
  DOMSVGFactory: () => __webpack_exports__DOMSVGFactory,
  DrawLayer: () => __webpack_exports__DrawLayer,
  FeatureTest: () => __webpack_exports__FeatureTest,
  GlobalWorkerOptions: () => __webpack_exports__GlobalWorkerOptions,
  ImageKind: () => __webpack_exports__ImageKind,
  InvalidPDFException: () => __webpack_exports__InvalidPDFException,
  MissingPDFException: () => __webpack_exports__MissingPDFException,
  OPS: () => __webpack_exports__OPS,
  Outliner: () => __webpack_exports__Outliner,
  PDFDataRangeTransport: () => __webpack_exports__PDFDataRangeTransport,
  PDFDateString: () => __webpack_exports__PDFDateString,
  PDFWorker: () => __webpack_exports__PDFWorker,
  PasswordResponses: () => __webpack_exports__PasswordResponses,
  PermissionFlag: () => __webpack_exports__PermissionFlag,
  PixelsPerInch: () => __webpack_exports__PixelsPerInch,
  RenderingCancelledException: () => __webpack_exports__RenderingCancelledException,
  TextLayer: () => __webpack_exports__TextLayer,
  UnexpectedResponseException: () => __webpack_exports__UnexpectedResponseException,
  Util: () => __webpack_exports__Util,
  VerbosityLevel: () => __webpack_exports__VerbosityLevel,
  XfaLayer: () => __webpack_exports__XfaLayer,
  build: () => __webpack_exports__build,
  createValidAbsoluteUrl: () => __webpack_exports__createValidAbsoluteUrl,
  fetchData: () => __webpack_exports__fetchData,
  getDocument: () => __webpack_exports__getDocument,
  getFilenameFromUrl: () => __webpack_exports__getFilenameFromUrl,
  getPdfFilenameFromUrl: () => __webpack_exports__getPdfFilenameFromUrl,
  getXfaPageViewport: () => __webpack_exports__getXfaPageViewport,
  isDataScheme: () => __webpack_exports__isDataScheme,
  isPdfFile: () => __webpack_exports__isPdfFile,
  noContextMenu: () => __webpack_exports__noContextMenu,
  normalizeUnicode: () => __webpack_exports__normalizeUnicode,
  renderTextLayer: () => __webpack_exports__renderTextLayer,
  setLayerDimensions: () => __webpack_exports__setLayerDimensions,
  shadow: () => __webpack_exports__shadow,
  updateTextLayer: () => __webpack_exports__updateTextLayer,
  version: () => __webpack_exports__version
});
var __webpack_require__ = {};
(() => {
  __webpack_require__.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
var __webpack_exports__ = globalThis.pdfjsLib = {};
__webpack_require__.d(__webpack_exports__, {
  AbortException: () => (
    /* reexport */
    AbortException
  ),
  AnnotationEditorLayer: () => (
    /* reexport */
    AnnotationEditorLayer
  ),
  AnnotationEditorParamsType: () => (
    /* reexport */
    AnnotationEditorParamsType
  ),
  AnnotationEditorType: () => (
    /* reexport */
    AnnotationEditorType
  ),
  AnnotationEditorUIManager: () => (
    /* reexport */
    AnnotationEditorUIManager
  ),
  AnnotationLayer: () => (
    /* reexport */
    AnnotationLayer
  ),
  AnnotationMode: () => (
    /* reexport */
    AnnotationMode
  ),
  CMapCompressionType: () => (
    /* reexport */
    CMapCompressionType
  ),
  ColorPicker: () => (
    /* reexport */
    ColorPicker
  ),
  DOMSVGFactory: () => (
    /* reexport */
    DOMSVGFactory
  ),
  DrawLayer: () => (
    /* reexport */
    DrawLayer
  ),
  FeatureTest: () => (
    /* reexport */
    util_FeatureTest
  ),
  GlobalWorkerOptions: () => (
    /* reexport */
    GlobalWorkerOptions
  ),
  ImageKind: () => (
    /* reexport */
    util_ImageKind
  ),
  InvalidPDFException: () => (
    /* reexport */
    InvalidPDFException
  ),
  MissingPDFException: () => (
    /* reexport */
    MissingPDFException
  ),
  OPS: () => (
    /* reexport */
    OPS
  ),
  Outliner: () => (
    /* reexport */
    Outliner
  ),
  PDFDataRangeTransport: () => (
    /* reexport */
    PDFDataRangeTransport
  ),
  PDFDateString: () => (
    /* reexport */
    PDFDateString
  ),
  PDFWorker: () => (
    /* reexport */
    PDFWorker
  ),
  PasswordResponses: () => (
    /* reexport */
    PasswordResponses
  ),
  PermissionFlag: () => (
    /* reexport */
    PermissionFlag
  ),
  PixelsPerInch: () => (
    /* reexport */
    PixelsPerInch
  ),
  RenderingCancelledException: () => (
    /* reexport */
    RenderingCancelledException
  ),
  TextLayer: () => (
    /* reexport */
    TextLayer
  ),
  UnexpectedResponseException: () => (
    /* reexport */
    UnexpectedResponseException
  ),
  Util: () => (
    /* reexport */
    Util
  ),
  VerbosityLevel: () => (
    /* reexport */
    VerbosityLevel
  ),
  XfaLayer: () => (
    /* reexport */
    XfaLayer
  ),
  build: () => (
    /* reexport */
    build
  ),
  createValidAbsoluteUrl: () => (
    /* reexport */
    createValidAbsoluteUrl
  ),
  fetchData: () => (
    /* reexport */
    fetchData
  ),
  getDocument: () => (
    /* reexport */
    getDocument
  ),
  getFilenameFromUrl: () => (
    /* reexport */
    getFilenameFromUrl
  ),
  getPdfFilenameFromUrl: () => (
    /* reexport */
    getPdfFilenameFromUrl
  ),
  getXfaPageViewport: () => (
    /* reexport */
    getXfaPageViewport
  ),
  isDataScheme: () => (
    /* reexport */
    isDataScheme
  ),
  isPdfFile: () => (
    /* reexport */
    isPdfFile
  ),
  noContextMenu: () => (
    /* reexport */
    noContextMenu
  ),
  normalizeUnicode: () => (
    /* reexport */
    normalizeUnicode
  ),
  renderTextLayer: () => (
    /* reexport */
    renderTextLayer
  ),
  setLayerDimensions: () => (
    /* reexport */
    setLayerDimensions
  ),
  shadow: () => (
    /* reexport */
    shadow
  ),
  updateTextLayer: () => (
    /* reexport */
    updateTextLayer
  ),
  version: () => (
    /* reexport */
    version
  )
});
var isNodeJS = typeof process === "object" && process + "" === "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser");
var IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0];
var FONT_IDENTITY_MATRIX = [1e-3, 0, 0, 1e-3, 0, 0];
var MAX_IMAGE_SIZE_TO_CACHE = 1e7;
var LINE_FACTOR = 1.35;
var LINE_DESCENT_FACTOR = 0.35;
var BASELINE_FACTOR = LINE_DESCENT_FACTOR / LINE_FACTOR;
var RenderingIntentFlag = {
  ANY: 1,
  DISPLAY: 2,
  PRINT: 4,
  SAVE: 8,
  ANNOTATIONS_FORMS: 16,
  ANNOTATIONS_STORAGE: 32,
  ANNOTATIONS_DISABLE: 64,
  OPLIST: 256
};
var AnnotationMode = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_FORMS: 2,
  ENABLE_STORAGE: 3
};
var AnnotationEditorPrefix = "pdfjs_internal_editor_";
var AnnotationEditorType = {
  DISABLE: -1,
  NONE: 0,
  FREETEXT: 3,
  HIGHLIGHT: 9,
  STAMP: 13,
  INK: 15
};
var AnnotationEditorParamsType = {
  RESIZE: 1,
  CREATE: 2,
  FREETEXT_SIZE: 11,
  FREETEXT_COLOR: 12,
  FREETEXT_OPACITY: 13,
  INK_COLOR: 21,
  INK_THICKNESS: 22,
  INK_OPACITY: 23,
  HIGHLIGHT_COLOR: 31,
  HIGHLIGHT_DEFAULT_COLOR: 32,
  HIGHLIGHT_THICKNESS: 33,
  HIGHLIGHT_FREE: 34,
  HIGHLIGHT_SHOW_ALL: 35
};
var PermissionFlag = {
  PRINT: 4,
  MODIFY_CONTENTS: 8,
  COPY: 16,
  MODIFY_ANNOTATIONS: 32,
  FILL_INTERACTIVE_FORMS: 256,
  COPY_FOR_ACCESSIBILITY: 512,
  ASSEMBLE: 1024,
  PRINT_HIGH_QUALITY: 2048
};
var TextRenderingMode = {
  FILL: 0,
  STROKE: 1,
  FILL_STROKE: 2,
  INVISIBLE: 3,
  FILL_ADD_TO_PATH: 4,
  STROKE_ADD_TO_PATH: 5,
  FILL_STROKE_ADD_TO_PATH: 6,
  ADD_TO_PATH: 7,
  FILL_STROKE_MASK: 3,
  ADD_TO_PATH_FLAG: 4
};
var util_ImageKind = {
  GRAYSCALE_1BPP: 1,
  RGB_24BPP: 2,
  RGBA_32BPP: 3
};
var AnnotationType = {
  TEXT: 1,
  LINK: 2,
  FREETEXT: 3,
  LINE: 4,
  SQUARE: 5,
  CIRCLE: 6,
  POLYGON: 7,
  POLYLINE: 8,
  HIGHLIGHT: 9,
  UNDERLINE: 10,
  SQUIGGLY: 11,
  STRIKEOUT: 12,
  STAMP: 13,
  CARET: 14,
  INK: 15,
  POPUP: 16,
  FILEATTACHMENT: 17,
  SOUND: 18,
  MOVIE: 19,
  WIDGET: 20,
  SCREEN: 21,
  PRINTERMARK: 22,
  TRAPNET: 23,
  WATERMARK: 24,
  THREED: 25,
  REDACT: 26
};
var AnnotationBorderStyleType = {
  SOLID: 1,
  DASHED: 2,
  BEVELED: 3,
  INSET: 4,
  UNDERLINE: 5
};
var VerbosityLevel = {
  ERRORS: 0,
  WARNINGS: 1,
  INFOS: 5
};
var CMapCompressionType = {
  NONE: 0,
  BINARY: 1
};
var OPS = {
  dependency: 1,
  setLineWidth: 2,
  setLineCap: 3,
  setLineJoin: 4,
  setMiterLimit: 5,
  setDash: 6,
  setRenderingIntent: 7,
  setFlatness: 8,
  setGState: 9,
  save: 10,
  restore: 11,
  transform: 12,
  moveTo: 13,
  lineTo: 14,
  curveTo: 15,
  curveTo2: 16,
  curveTo3: 17,
  closePath: 18,
  rectangle: 19,
  stroke: 20,
  closeStroke: 21,
  fill: 22,
  eoFill: 23,
  fillStroke: 24,
  eoFillStroke: 25,
  closeFillStroke: 26,
  closeEOFillStroke: 27,
  endPath: 28,
  clip: 29,
  eoClip: 30,
  beginText: 31,
  endText: 32,
  setCharSpacing: 33,
  setWordSpacing: 34,
  setHScale: 35,
  setLeading: 36,
  setFont: 37,
  setTextRenderingMode: 38,
  setTextRise: 39,
  moveText: 40,
  setLeadingMoveText: 41,
  setTextMatrix: 42,
  nextLine: 43,
  showText: 44,
  showSpacedText: 45,
  nextLineShowText: 46,
  nextLineSetSpacingShowText: 47,
  setCharWidth: 48,
  setCharWidthAndBounds: 49,
  setStrokeColorSpace: 50,
  setFillColorSpace: 51,
  setStrokeColor: 52,
  setStrokeColorN: 53,
  setFillColor: 54,
  setFillColorN: 55,
  setStrokeGray: 56,
  setFillGray: 57,
  setStrokeRGBColor: 58,
  setFillRGBColor: 59,
  setStrokeCMYKColor: 60,
  setFillCMYKColor: 61,
  shadingFill: 62,
  beginInlineImage: 63,
  beginImageData: 64,
  endInlineImage: 65,
  paintXObject: 66,
  markPoint: 67,
  markPointProps: 68,
  beginMarkedContent: 69,
  beginMarkedContentProps: 70,
  endMarkedContent: 71,
  beginCompat: 72,
  endCompat: 73,
  paintFormXObjectBegin: 74,
  paintFormXObjectEnd: 75,
  beginGroup: 76,
  endGroup: 77,
  beginAnnotation: 80,
  endAnnotation: 81,
  paintImageMaskXObject: 83,
  paintImageMaskXObjectGroup: 84,
  paintImageXObject: 85,
  paintInlineImageXObject: 86,
  paintInlineImageXObjectGroup: 87,
  paintImageXObjectRepeat: 88,
  paintImageMaskXObjectRepeat: 89,
  paintSolidColorImageMask: 90,
  constructPath: 91
};
var PasswordResponses = {
  NEED_PASSWORD: 1,
  INCORRECT_PASSWORD: 2
};
var verbosity = VerbosityLevel.WARNINGS;
function setVerbosityLevel(level) {
  if (Number.isInteger(level)) {
    verbosity = level;
  }
}
function getVerbosityLevel() {
  return verbosity;
}
function info(msg) {
  if (verbosity >= VerbosityLevel.INFOS) {
    console.log(`Info: ${msg}`);
  }
}
function warn(msg) {
  if (verbosity >= VerbosityLevel.WARNINGS) {
    console.log(`Warning: ${msg}`);
  }
}
function unreachable(msg) {
  throw new Error(msg);
}
function assert(cond, msg) {
  if (!cond) {
    unreachable(msg);
  }
}
function _isValidProtocol(url) {
  switch (url == null ? void 0 : url.protocol) {
    case "http:":
    case "https:":
    case "ftp:":
    case "mailto:":
    case "tel:":
      return true;
    default:
      return false;
  }
}
function createValidAbsoluteUrl(url, baseUrl = null, options = null) {
  if (!url) {
    return null;
  }
  try {
    if (options && typeof url === "string") {
      if (options.addDefaultProtocol && url.startsWith("www.")) {
        const dots = url.match(/\./g);
        if ((dots == null ? void 0 : dots.length) >= 2) {
          url = `http://${url}`;
        }
      }
      if (options.tryConvertEncoding) {
        try {
          url = stringToUTF8String(url);
        } catch {
        }
      }
    }
    const absoluteUrl = baseUrl ? new URL(url, baseUrl) : new URL(url);
    if (_isValidProtocol(absoluteUrl)) {
      return absoluteUrl;
    }
  } catch {
  }
  return null;
}
function shadow(obj, prop, value, nonSerializable = false) {
  Object.defineProperty(obj, prop, {
    value,
    enumerable: !nonSerializable,
    configurable: true,
    writable: false
  });
  return value;
}
var BaseException = function BaseExceptionClosure() {
  function BaseException2(message, name) {
    if (this.constructor === BaseException2) {
      unreachable("Cannot initialize BaseException.");
    }
    this.message = message;
    this.name = name;
  }
  BaseException2.prototype = new Error();
  BaseException2.constructor = BaseException2;
  return BaseException2;
}();
var PasswordException = class extends BaseException {
  constructor(msg, code) {
    super(msg, "PasswordException");
    this.code = code;
  }
};
var UnknownErrorException = class extends BaseException {
  constructor(msg, details) {
    super(msg, "UnknownErrorException");
    this.details = details;
  }
};
var InvalidPDFException = class extends BaseException {
  constructor(msg) {
    super(msg, "InvalidPDFException");
  }
};
var MissingPDFException = class extends BaseException {
  constructor(msg) {
    super(msg, "MissingPDFException");
  }
};
var UnexpectedResponseException = class extends BaseException {
  constructor(msg, status) {
    super(msg, "UnexpectedResponseException");
    this.status = status;
  }
};
var FormatError = class extends BaseException {
  constructor(msg) {
    super(msg, "FormatError");
  }
};
var AbortException = class extends BaseException {
  constructor(msg) {
    super(msg, "AbortException");
  }
};
function bytesToString(bytes) {
  if (typeof bytes !== "object" || (bytes == null ? void 0 : bytes.length) === void 0) {
    unreachable("Invalid argument for bytesToString");
  }
  const length = bytes.length;
  const MAX_ARGUMENT_COUNT = 8192;
  if (length < MAX_ARGUMENT_COUNT) {
    return String.fromCharCode.apply(null, bytes);
  }
  const strBuf = [];
  for (let i2 = 0; i2 < length; i2 += MAX_ARGUMENT_COUNT) {
    const chunkEnd = Math.min(i2 + MAX_ARGUMENT_COUNT, length);
    const chunk = bytes.subarray(i2, chunkEnd);
    strBuf.push(String.fromCharCode.apply(null, chunk));
  }
  return strBuf.join("");
}
function stringToBytes(str) {
  if (typeof str !== "string") {
    unreachable("Invalid argument for stringToBytes");
  }
  const length = str.length;
  const bytes = new Uint8Array(length);
  for (let i2 = 0; i2 < length; ++i2) {
    bytes[i2] = str.charCodeAt(i2) & 255;
  }
  return bytes;
}
function string32(value) {
  return String.fromCharCode(value >> 24 & 255, value >> 16 & 255, value >> 8 & 255, value & 255);
}
function objectFromMap(map) {
  const obj = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}
function isLittleEndian() {
  const buffer8 = new Uint8Array(4);
  buffer8[0] = 1;
  const view32 = new Uint32Array(buffer8.buffer, 0, 1);
  return view32[0] === 1;
}
function isEvalSupported() {
  try {
    new Function("");
    return true;
  } catch {
    return false;
  }
}
var util_FeatureTest = class {
  static get isLittleEndian() {
    return shadow(this, "isLittleEndian", isLittleEndian());
  }
  static get isEvalSupported() {
    return shadow(this, "isEvalSupported", isEvalSupported());
  }
  static get isOffscreenCanvasSupported() {
    return shadow(this, "isOffscreenCanvasSupported", typeof OffscreenCanvas !== "undefined");
  }
  static get platform() {
    if (typeof navigator !== "undefined" && typeof (navigator == null ? void 0 : navigator.platform) === "string") {
      return shadow(this, "platform", {
        isMac: navigator.platform.includes("Mac")
      });
    }
    return shadow(this, "platform", {
      isMac: false
    });
  }
  static get isCSSRoundSupported() {
    var _a2, _b;
    return shadow(this, "isCSSRoundSupported", (_b = (_a2 = globalThis.CSS) == null ? void 0 : _a2.supports) == null ? void 0 : _b.call(_a2, "width: round(1.5px, 1px)"));
  }
};
var hexNumbers = Array.from(Array(256).keys(), (n2) => n2.toString(16).padStart(2, "0"));
var _Util_static, getExtremumOnCurve_fn, getExtremum_fn;
var Util = class {
  static makeHexColor(r2, g2, b2) {
    return `#${hexNumbers[r2]}${hexNumbers[g2]}${hexNumbers[b2]}`;
  }
  static scaleMinMax(transform, minMax) {
    let temp;
    if (transform[0]) {
      if (transform[0] < 0) {
        temp = minMax[0];
        minMax[0] = minMax[2];
        minMax[2] = temp;
      }
      minMax[0] *= transform[0];
      minMax[2] *= transform[0];
      if (transform[3] < 0) {
        temp = minMax[1];
        minMax[1] = minMax[3];
        minMax[3] = temp;
      }
      minMax[1] *= transform[3];
      minMax[3] *= transform[3];
    } else {
      temp = minMax[0];
      minMax[0] = minMax[1];
      minMax[1] = temp;
      temp = minMax[2];
      minMax[2] = minMax[3];
      minMax[3] = temp;
      if (transform[1] < 0) {
        temp = minMax[1];
        minMax[1] = minMax[3];
        minMax[3] = temp;
      }
      minMax[1] *= transform[1];
      minMax[3] *= transform[1];
      if (transform[2] < 0) {
        temp = minMax[0];
        minMax[0] = minMax[2];
        minMax[2] = temp;
      }
      minMax[0] *= transform[2];
      minMax[2] *= transform[2];
    }
    minMax[0] += transform[4];
    minMax[1] += transform[5];
    minMax[2] += transform[4];
    minMax[3] += transform[5];
  }
  static transform(m1, m2) {
    return [m1[0] * m2[0] + m1[2] * m2[1], m1[1] * m2[0] + m1[3] * m2[1], m1[0] * m2[2] + m1[2] * m2[3], m1[1] * m2[2] + m1[3] * m2[3], m1[0] * m2[4] + m1[2] * m2[5] + m1[4], m1[1] * m2[4] + m1[3] * m2[5] + m1[5]];
  }
  static applyTransform(p, m2) {
    const xt = p[0] * m2[0] + p[1] * m2[2] + m2[4];
    const yt = p[0] * m2[1] + p[1] * m2[3] + m2[5];
    return [xt, yt];
  }
  static applyInverseTransform(p, m2) {
    const d2 = m2[0] * m2[3] - m2[1] * m2[2];
    const xt = (p[0] * m2[3] - p[1] * m2[2] + m2[2] * m2[5] - m2[4] * m2[3]) / d2;
    const yt = (-p[0] * m2[1] + p[1] * m2[0] + m2[4] * m2[1] - m2[5] * m2[0]) / d2;
    return [xt, yt];
  }
  static getAxialAlignedBoundingBox(r2, m2) {
    const p1 = this.applyTransform(r2, m2);
    const p2 = this.applyTransform(r2.slice(2, 4), m2);
    const p3 = this.applyTransform([r2[0], r2[3]], m2);
    const p4 = this.applyTransform([r2[2], r2[1]], m2);
    return [Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1])];
  }
  static inverseTransform(m2) {
    const d2 = m2[0] * m2[3] - m2[1] * m2[2];
    return [m2[3] / d2, -m2[1] / d2, -m2[2] / d2, m2[0] / d2, (m2[2] * m2[5] - m2[4] * m2[3]) / d2, (m2[4] * m2[1] - m2[5] * m2[0]) / d2];
  }
  static singularValueDecompose2dScale(m2) {
    const transpose = [m2[0], m2[2], m2[1], m2[3]];
    const a2 = m2[0] * transpose[0] + m2[1] * transpose[2];
    const b2 = m2[0] * transpose[1] + m2[1] * transpose[3];
    const c2 = m2[2] * transpose[0] + m2[3] * transpose[2];
    const d2 = m2[2] * transpose[1] + m2[3] * transpose[3];
    const first = (a2 + d2) / 2;
    const second = Math.sqrt((a2 + d2) ** 2 - 4 * (a2 * d2 - c2 * b2)) / 2;
    const sx = first + second || 1;
    const sy = first - second || 1;
    return [Math.sqrt(sx), Math.sqrt(sy)];
  }
  static normalizeRect(rect) {
    const r2 = rect.slice(0);
    if (rect[0] > rect[2]) {
      r2[0] = rect[2];
      r2[2] = rect[0];
    }
    if (rect[1] > rect[3]) {
      r2[1] = rect[3];
      r2[3] = rect[1];
    }
    return r2;
  }
  static intersect(rect1, rect2) {
    const xLow = Math.max(Math.min(rect1[0], rect1[2]), Math.min(rect2[0], rect2[2]));
    const xHigh = Math.min(Math.max(rect1[0], rect1[2]), Math.max(rect2[0], rect2[2]));
    if (xLow > xHigh) {
      return null;
    }
    const yLow = Math.max(Math.min(rect1[1], rect1[3]), Math.min(rect2[1], rect2[3]));
    const yHigh = Math.min(Math.max(rect1[1], rect1[3]), Math.max(rect2[1], rect2[3]));
    if (yLow > yHigh) {
      return null;
    }
    return [xLow, yLow, xHigh, yHigh];
  }
  static bezierBoundingBox(x0, y0, x1, y1, x2, y2, x3, y3, minMax) {
    if (minMax) {
      minMax[0] = Math.min(minMax[0], x0, x3);
      minMax[1] = Math.min(minMax[1], y0, y3);
      minMax[2] = Math.max(minMax[2], x0, x3);
      minMax[3] = Math.max(minMax[3], y0, y3);
    } else {
      minMax = [Math.min(x0, x3), Math.min(y0, y3), Math.max(x0, x3), Math.max(y0, y3)];
    }
    __privateMethod(this, _Util_static, getExtremum_fn).call(this, x0, x1, x2, x3, y0, y1, y2, y3, 3 * (-x0 + 3 * (x1 - x2) + x3), 6 * (x0 - 2 * x1 + x2), 3 * (x1 - x0), minMax);
    __privateMethod(this, _Util_static, getExtremum_fn).call(this, x0, x1, x2, x3, y0, y1, y2, y3, 3 * (-y0 + 3 * (y1 - y2) + y3), 6 * (y0 - 2 * y1 + y2), 3 * (y1 - y0), minMax);
    return minMax;
  }
};
_Util_static = new WeakSet();
getExtremumOnCurve_fn = function(x0, x1, x2, x3, y0, y1, y2, y3, t2, minMax) {
  if (t2 <= 0 || t2 >= 1) {
    return;
  }
  const mt = 1 - t2;
  const tt = t2 * t2;
  const ttt = tt * t2;
  const x4 = mt * (mt * (mt * x0 + 3 * t2 * x1) + 3 * tt * x2) + ttt * x3;
  const y4 = mt * (mt * (mt * y0 + 3 * t2 * y1) + 3 * tt * y2) + ttt * y3;
  minMax[0] = Math.min(minMax[0], x4);
  minMax[1] = Math.min(minMax[1], y4);
  minMax[2] = Math.max(minMax[2], x4);
  minMax[3] = Math.max(minMax[3], y4);
};
getExtremum_fn = function(x0, x1, x2, x3, y0, y1, y2, y3, a2, b2, c2, minMax) {
  if (Math.abs(a2) < 1e-12) {
    if (Math.abs(b2) >= 1e-12) {
      __privateMethod(this, _Util_static, getExtremumOnCurve_fn).call(this, x0, x1, x2, x3, y0, y1, y2, y3, -c2 / b2, minMax);
    }
    return;
  }
  const delta = b2 ** 2 - 4 * c2 * a2;
  if (delta < 0) {
    return;
  }
  const sqrtDelta = Math.sqrt(delta);
  const a22 = 2 * a2;
  __privateMethod(this, _Util_static, getExtremumOnCurve_fn).call(this, x0, x1, x2, x3, y0, y1, y2, y3, (-b2 + sqrtDelta) / a22, minMax);
  __privateMethod(this, _Util_static, getExtremumOnCurve_fn).call(this, x0, x1, x2, x3, y0, y1, y2, y3, (-b2 - sqrtDelta) / a22, minMax);
};
__privateAdd(Util, _Util_static);
function stringToUTF8String(str) {
  return decodeURIComponent(escape(str));
}
var NormalizeRegex = null;
var NormalizationMap = null;
function normalizeUnicode(str) {
  if (!NormalizeRegex) {
    NormalizeRegex = /([\u00a0\u00b5\u037e\u0eb3\u2000-\u200a\u202f\u2126\ufb00-\ufb04\ufb06\ufb20-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufba1\ufba4-\ufba9\ufbae-\ufbb1\ufbd3-\ufbdc\ufbde-\ufbe7\ufbea-\ufbf8\ufbfc-\ufbfd\ufc00-\ufc5d\ufc64-\ufcf1\ufcf5-\ufd3d\ufd88\ufdf4\ufdfa-\ufdfb\ufe71\ufe77\ufe79\ufe7b\ufe7d]+)|(\ufb05+)/gu;
    NormalizationMap = /* @__PURE__ */ new Map([["ﬅ", "ſt"]]);
  }
  return str.replaceAll(NormalizeRegex, (_2, p1, p2) => p1 ? p1.normalize("NFKC") : NormalizationMap.get(p2));
}
function getUuid() {
  if (typeof crypto !== "undefined" && typeof (crypto == null ? void 0 : crypto.randomUUID) === "function") {
    return crypto.randomUUID();
  }
  const buf = new Uint8Array(32);
  if (typeof crypto !== "undefined" && typeof (crypto == null ? void 0 : crypto.getRandomValues) === "function") {
    crypto.getRandomValues(buf);
  } else {
    for (let i2 = 0; i2 < 32; i2++) {
      buf[i2] = Math.floor(Math.random() * 255);
    }
  }
  return bytesToString(buf);
}
var AnnotationPrefix = "pdfjs_internal_id_";
var FontRenderOps = {
  BEZIER_CURVE_TO: 0,
  MOVE_TO: 1,
  LINE_TO: 2,
  QUADRATIC_CURVE_TO: 3,
  RESTORE: 4,
  SAVE: 5,
  SCALE: 6,
  TRANSFORM: 7,
  TRANSLATE: 8
};
var BaseFilterFactory = class _BaseFilterFactory {
  constructor() {
    if (this.constructor === _BaseFilterFactory) {
      unreachable("Cannot initialize BaseFilterFactory.");
    }
  }
  addFilter(maps) {
    return "none";
  }
  addHCMFilter(fgColor, bgColor) {
    return "none";
  }
  addAlphaFilter(map) {
    return "none";
  }
  addLuminosityFilter(map) {
    return "none";
  }
  addHighlightHCMFilter(filterName, fgColor, bgColor, newFgColor, newBgColor) {
    return "none";
  }
  destroy(keepHCM = false) {
  }
};
var BaseCanvasFactory = class _BaseCanvasFactory {
  constructor() {
    if (this.constructor === _BaseCanvasFactory) {
      unreachable("Cannot initialize BaseCanvasFactory.");
    }
  }
  create(width, height) {
    if (width <= 0 || height <= 0) {
      throw new Error("Invalid canvas size");
    }
    const canvas = this._createCanvas(width, height);
    return {
      canvas,
      context: canvas.getContext("2d")
    };
  }
  reset(canvasAndContext, width, height) {
    if (!canvasAndContext.canvas) {
      throw new Error("Canvas is not specified");
    }
    if (width <= 0 || height <= 0) {
      throw new Error("Invalid canvas size");
    }
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }
  destroy(canvasAndContext) {
    if (!canvasAndContext.canvas) {
      throw new Error("Canvas is not specified");
    }
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
  _createCanvas(width, height) {
    unreachable("Abstract method `_createCanvas` called.");
  }
};
var BaseCMapReaderFactory = class _BaseCMapReaderFactory {
  constructor({
    baseUrl = null,
    isCompressed = true
  }) {
    if (this.constructor === _BaseCMapReaderFactory) {
      unreachable("Cannot initialize BaseCMapReaderFactory.");
    }
    this.baseUrl = baseUrl;
    this.isCompressed = isCompressed;
  }
  async fetch({
    name
  }) {
    if (!this.baseUrl) {
      throw new Error('The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.');
    }
    if (!name) {
      throw new Error("CMap name must be specified.");
    }
    const url = this.baseUrl + name + (this.isCompressed ? ".bcmap" : "");
    const compressionType = this.isCompressed ? CMapCompressionType.BINARY : CMapCompressionType.NONE;
    return this._fetchData(url, compressionType).catch((reason) => {
      throw new Error(`Unable to load ${this.isCompressed ? "binary " : ""}CMap at: ${url}`);
    });
  }
  _fetchData(url, compressionType) {
    unreachable("Abstract method `_fetchData` called.");
  }
};
var BaseStandardFontDataFactory = class _BaseStandardFontDataFactory {
  constructor({
    baseUrl = null
  }) {
    if (this.constructor === _BaseStandardFontDataFactory) {
      unreachable("Cannot initialize BaseStandardFontDataFactory.");
    }
    this.baseUrl = baseUrl;
  }
  async fetch({
    filename
  }) {
    if (!this.baseUrl) {
      throw new Error('The standard font "baseUrl" parameter must be specified, ensure that the "standardFontDataUrl" API parameter is provided.');
    }
    if (!filename) {
      throw new Error("Font filename must be specified.");
    }
    const url = `${this.baseUrl}${filename}`;
    return this._fetchData(url).catch((reason) => {
      throw new Error(`Unable to load font data at: ${url}`);
    });
  }
  _fetchData(url) {
    unreachable("Abstract method `_fetchData` called.");
  }
};
var BaseSVGFactory = class _BaseSVGFactory {
  constructor() {
    if (this.constructor === _BaseSVGFactory) {
      unreachable("Cannot initialize BaseSVGFactory.");
    }
  }
  create(width, height, skipDimensions = false) {
    if (width <= 0 || height <= 0) {
      throw new Error("Invalid SVG dimensions");
    }
    const svg = this._createSVG("svg:svg");
    svg.setAttribute("version", "1.1");
    if (!skipDimensions) {
      svg.setAttribute("width", `${width}px`);
      svg.setAttribute("height", `${height}px`);
    }
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    return svg;
  }
  createElement(type) {
    if (typeof type !== "string") {
      throw new Error("Invalid SVG element type");
    }
    return this._createSVG(type);
  }
  _createSVG(type) {
    unreachable("Abstract method `_createSVG` called.");
  }
};
var SVG_NS = "http://www.w3.org/2000/svg";
var _PixelsPerInch = class _PixelsPerInch {
};
__publicField(_PixelsPerInch, "CSS", 96);
__publicField(_PixelsPerInch, "PDF", 72);
__publicField(_PixelsPerInch, "PDF_TO_CSS_UNITS", _PixelsPerInch.CSS / _PixelsPerInch.PDF);
var PixelsPerInch = _PixelsPerInch;
var __cache, __defs, _docId, _document, __hcmCache, _id, _DOMFilterFactory_instances, cache_get, hcmCache_get, defs_get, createTables_fn, addLuminosityConversion_fn, addGrayConversion_fn, createFilter_fn, appendFeFunc_fn, addTransferMapConversion_fn, addTransferMapAlphaConversion_fn, getRGB_fn;
var DOMFilterFactory = class extends BaseFilterFactory {
  constructor({
    docId,
    ownerDocument = globalThis.document
  } = {}) {
    super();
    __privateAdd(this, _DOMFilterFactory_instances);
    __privateAdd(this, __cache);
    __privateAdd(this, __defs);
    __privateAdd(this, _docId);
    __privateAdd(this, _document);
    __privateAdd(this, __hcmCache);
    __privateAdd(this, _id, 0);
    __privateSet(this, _docId, docId);
    __privateSet(this, _document, ownerDocument);
  }
  addFilter(maps) {
    if (!maps) {
      return "none";
    }
    let value = __privateGet(this, _DOMFilterFactory_instances, cache_get).get(maps);
    if (value) {
      return value;
    }
    const [tableR, tableG, tableB] = __privateMethod(this, _DOMFilterFactory_instances, createTables_fn).call(this, maps);
    const key = maps.length === 1 ? tableR : `${tableR}${tableG}${tableB}`;
    value = __privateGet(this, _DOMFilterFactory_instances, cache_get).get(key);
    if (value) {
      __privateGet(this, _DOMFilterFactory_instances, cache_get).set(maps, value);
      return value;
    }
    const id = `g_${__privateGet(this, _docId)}_transfer_map_${__privateWrapper(this, _id)._++}`;
    const url = `url(#${id})`;
    __privateGet(this, _DOMFilterFactory_instances, cache_get).set(maps, url);
    __privateGet(this, _DOMFilterFactory_instances, cache_get).set(key, url);
    const filter = __privateMethod(this, _DOMFilterFactory_instances, createFilter_fn).call(this, id);
    __privateMethod(this, _DOMFilterFactory_instances, addTransferMapConversion_fn).call(this, tableR, tableG, tableB, filter);
    return url;
  }
  addHCMFilter(fgColor, bgColor) {
    var _a2;
    const key = `${fgColor}-${bgColor}`;
    const filterName = "base";
    let info2 = __privateGet(this, _DOMFilterFactory_instances, hcmCache_get).get(filterName);
    if ((info2 == null ? void 0 : info2.key) === key) {
      return info2.url;
    }
    if (info2) {
      (_a2 = info2.filter) == null ? void 0 : _a2.remove();
      info2.key = key;
      info2.url = "none";
      info2.filter = null;
    } else {
      info2 = {
        key,
        url: "none",
        filter: null
      };
      __privateGet(this, _DOMFilterFactory_instances, hcmCache_get).set(filterName, info2);
    }
    if (!fgColor || !bgColor) {
      return info2.url;
    }
    const fgRGB = __privateMethod(this, _DOMFilterFactory_instances, getRGB_fn).call(this, fgColor);
    fgColor = Util.makeHexColor(...fgRGB);
    const bgRGB = __privateMethod(this, _DOMFilterFactory_instances, getRGB_fn).call(this, bgColor);
    bgColor = Util.makeHexColor(...bgRGB);
    __privateGet(this, _DOMFilterFactory_instances, defs_get).style.color = "";
    if (fgColor === "#000000" && bgColor === "#ffffff" || fgColor === bgColor) {
      return info2.url;
    }
    const map = new Array(256);
    for (let i2 = 0; i2 <= 255; i2++) {
      const x2 = i2 / 255;
      map[i2] = x2 <= 0.03928 ? x2 / 12.92 : ((x2 + 0.055) / 1.055) ** 2.4;
    }
    const table = map.join(",");
    const id = `g_${__privateGet(this, _docId)}_hcm_filter`;
    const filter = info2.filter = __privateMethod(this, _DOMFilterFactory_instances, createFilter_fn).call(this, id);
    __privateMethod(this, _DOMFilterFactory_instances, addTransferMapConversion_fn).call(this, table, table, table, filter);
    __privateMethod(this, _DOMFilterFactory_instances, addGrayConversion_fn).call(this, filter);
    const getSteps = (c2, n2) => {
      const start = fgRGB[c2] / 255;
      const end = bgRGB[c2] / 255;
      const arr = new Array(n2 + 1);
      for (let i2 = 0; i2 <= n2; i2++) {
        arr[i2] = start + i2 / n2 * (end - start);
      }
      return arr.join(",");
    };
    __privateMethod(this, _DOMFilterFactory_instances, addTransferMapConversion_fn).call(this, getSteps(0, 5), getSteps(1, 5), getSteps(2, 5), filter);
    info2.url = `url(#${id})`;
    return info2.url;
  }
  addAlphaFilter(map) {
    let value = __privateGet(this, _DOMFilterFactory_instances, cache_get).get(map);
    if (value) {
      return value;
    }
    const [tableA] = __privateMethod(this, _DOMFilterFactory_instances, createTables_fn).call(this, [map]);
    const key = `alpha_${tableA}`;
    value = __privateGet(this, _DOMFilterFactory_instances, cache_get).get(key);
    if (value) {
      __privateGet(this, _DOMFilterFactory_instances, cache_get).set(map, value);
      return value;
    }
    const id = `g_${__privateGet(this, _docId)}_alpha_map_${__privateWrapper(this, _id)._++}`;
    const url = `url(#${id})`;
    __privateGet(this, _DOMFilterFactory_instances, cache_get).set(map, url);
    __privateGet(this, _DOMFilterFactory_instances, cache_get).set(key, url);
    const filter = __privateMethod(this, _DOMFilterFactory_instances, createFilter_fn).call(this, id);
    __privateMethod(this, _DOMFilterFactory_instances, addTransferMapAlphaConversion_fn).call(this, tableA, filter);
    return url;
  }
  addLuminosityFilter(map) {
    let value = __privateGet(this, _DOMFilterFactory_instances, cache_get).get(map || "luminosity");
    if (value) {
      return value;
    }
    let tableA, key;
    if (map) {
      [tableA] = __privateMethod(this, _DOMFilterFactory_instances, createTables_fn).call(this, [map]);
      key = `luminosity_${tableA}`;
    } else {
      key = "luminosity";
    }
    value = __privateGet(this, _DOMFilterFactory_instances, cache_get).get(key);
    if (value) {
      __privateGet(this, _DOMFilterFactory_instances, cache_get).set(map, value);
      return value;
    }
    const id = `g_${__privateGet(this, _docId)}_luminosity_map_${__privateWrapper(this, _id)._++}`;
    const url = `url(#${id})`;
    __privateGet(this, _DOMFilterFactory_instances, cache_get).set(map, url);
    __privateGet(this, _DOMFilterFactory_instances, cache_get).set(key, url);
    const filter = __privateMethod(this, _DOMFilterFactory_instances, createFilter_fn).call(this, id);
    __privateMethod(this, _DOMFilterFactory_instances, addLuminosityConversion_fn).call(this, filter);
    if (map) {
      __privateMethod(this, _DOMFilterFactory_instances, addTransferMapAlphaConversion_fn).call(this, tableA, filter);
    }
    return url;
  }
  addHighlightHCMFilter(filterName, fgColor, bgColor, newFgColor, newBgColor) {
    var _a2;
    const key = `${fgColor}-${bgColor}-${newFgColor}-${newBgColor}`;
    let info2 = __privateGet(this, _DOMFilterFactory_instances, hcmCache_get).get(filterName);
    if ((info2 == null ? void 0 : info2.key) === key) {
      return info2.url;
    }
    if (info2) {
      (_a2 = info2.filter) == null ? void 0 : _a2.remove();
      info2.key = key;
      info2.url = "none";
      info2.filter = null;
    } else {
      info2 = {
        key,
        url: "none",
        filter: null
      };
      __privateGet(this, _DOMFilterFactory_instances, hcmCache_get).set(filterName, info2);
    }
    if (!fgColor || !bgColor) {
      return info2.url;
    }
    const [fgRGB, bgRGB] = [fgColor, bgColor].map(__privateMethod(this, _DOMFilterFactory_instances, getRGB_fn).bind(this));
    let fgGray = Math.round(0.2126 * fgRGB[0] + 0.7152 * fgRGB[1] + 0.0722 * fgRGB[2]);
    let bgGray = Math.round(0.2126 * bgRGB[0] + 0.7152 * bgRGB[1] + 0.0722 * bgRGB[2]);
    let [newFgRGB, newBgRGB] = [newFgColor, newBgColor].map(__privateMethod(this, _DOMFilterFactory_instances, getRGB_fn).bind(this));
    if (bgGray < fgGray) {
      [fgGray, bgGray, newFgRGB, newBgRGB] = [bgGray, fgGray, newBgRGB, newFgRGB];
    }
    __privateGet(this, _DOMFilterFactory_instances, defs_get).style.color = "";
    const getSteps = (fg, bg, n2) => {
      const arr = new Array(256);
      const step = (bgGray - fgGray) / n2;
      const newStart = fg / 255;
      const newStep = (bg - fg) / (255 * n2);
      let prev = 0;
      for (let i2 = 0; i2 <= n2; i2++) {
        const k2 = Math.round(fgGray + i2 * step);
        const value = newStart + i2 * newStep;
        for (let j2 = prev; j2 <= k2; j2++) {
          arr[j2] = value;
        }
        prev = k2 + 1;
      }
      for (let i2 = prev; i2 < 256; i2++) {
        arr[i2] = arr[prev - 1];
      }
      return arr.join(",");
    };
    const id = `g_${__privateGet(this, _docId)}_hcm_${filterName}_filter`;
    const filter = info2.filter = __privateMethod(this, _DOMFilterFactory_instances, createFilter_fn).call(this, id);
    __privateMethod(this, _DOMFilterFactory_instances, addGrayConversion_fn).call(this, filter);
    __privateMethod(this, _DOMFilterFactory_instances, addTransferMapConversion_fn).call(this, getSteps(newFgRGB[0], newBgRGB[0], 5), getSteps(newFgRGB[1], newBgRGB[1], 5), getSteps(newFgRGB[2], newBgRGB[2], 5), filter);
    info2.url = `url(#${id})`;
    return info2.url;
  }
  destroy(keepHCM = false) {
    if (keepHCM && __privateGet(this, _DOMFilterFactory_instances, hcmCache_get).size !== 0) {
      return;
    }
    if (__privateGet(this, __defs)) {
      __privateGet(this, __defs).parentNode.parentNode.remove();
      __privateSet(this, __defs, null);
    }
    if (__privateGet(this, __cache)) {
      __privateGet(this, __cache).clear();
      __privateSet(this, __cache, null);
    }
    __privateSet(this, _id, 0);
  }
};
__cache = new WeakMap();
__defs = new WeakMap();
_docId = new WeakMap();
_document = new WeakMap();
__hcmCache = new WeakMap();
_id = new WeakMap();
_DOMFilterFactory_instances = new WeakSet();
cache_get = function() {
  return __privateGet(this, __cache) || __privateSet(this, __cache, /* @__PURE__ */ new Map());
};
hcmCache_get = function() {
  return __privateGet(this, __hcmCache) || __privateSet(this, __hcmCache, /* @__PURE__ */ new Map());
};
defs_get = function() {
  if (!__privateGet(this, __defs)) {
    const div = __privateGet(this, _document).createElement("div");
    const {
      style
    } = div;
    style.visibility = "hidden";
    style.contain = "strict";
    style.width = style.height = 0;
    style.position = "absolute";
    style.top = style.left = 0;
    style.zIndex = -1;
    const svg = __privateGet(this, _document).createElementNS(SVG_NS, "svg");
    svg.setAttribute("width", 0);
    svg.setAttribute("height", 0);
    __privateSet(this, __defs, __privateGet(this, _document).createElementNS(SVG_NS, "defs"));
    div.append(svg);
    svg.append(__privateGet(this, __defs));
    __privateGet(this, _document).body.append(div);
  }
  return __privateGet(this, __defs);
};
createTables_fn = function(maps) {
  if (maps.length === 1) {
    const mapR2 = maps[0];
    const buffer = new Array(256);
    for (let i2 = 0; i2 < 256; i2++) {
      buffer[i2] = mapR2[i2] / 255;
    }
    const table = buffer.join(",");
    return [table, table, table];
  }
  const [mapR, mapG, mapB] = maps;
  const bufferR = new Array(256);
  const bufferG = new Array(256);
  const bufferB = new Array(256);
  for (let i2 = 0; i2 < 256; i2++) {
    bufferR[i2] = mapR[i2] / 255;
    bufferG[i2] = mapG[i2] / 255;
    bufferB[i2] = mapB[i2] / 255;
  }
  return [bufferR.join(","), bufferG.join(","), bufferB.join(",")];
};
addLuminosityConversion_fn = function(filter) {
  const feColorMatrix = __privateGet(this, _document).createElementNS(SVG_NS, "feColorMatrix");
  feColorMatrix.setAttribute("type", "matrix");
  feColorMatrix.setAttribute("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0.59 0.11 0 0");
  filter.append(feColorMatrix);
};
addGrayConversion_fn = function(filter) {
  const feColorMatrix = __privateGet(this, _document).createElementNS(SVG_NS, "feColorMatrix");
  feColorMatrix.setAttribute("type", "matrix");
  feColorMatrix.setAttribute("values", "0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0");
  filter.append(feColorMatrix);
};
createFilter_fn = function(id) {
  const filter = __privateGet(this, _document).createElementNS(SVG_NS, "filter");
  filter.setAttribute("color-interpolation-filters", "sRGB");
  filter.setAttribute("id", id);
  __privateGet(this, _DOMFilterFactory_instances, defs_get).append(filter);
  return filter;
};
appendFeFunc_fn = function(feComponentTransfer, func, table) {
  const feFunc = __privateGet(this, _document).createElementNS(SVG_NS, func);
  feFunc.setAttribute("type", "discrete");
  feFunc.setAttribute("tableValues", table);
  feComponentTransfer.append(feFunc);
};
addTransferMapConversion_fn = function(rTable, gTable, bTable, filter) {
  const feComponentTransfer = __privateGet(this, _document).createElementNS(SVG_NS, "feComponentTransfer");
  filter.append(feComponentTransfer);
  __privateMethod(this, _DOMFilterFactory_instances, appendFeFunc_fn).call(this, feComponentTransfer, "feFuncR", rTable);
  __privateMethod(this, _DOMFilterFactory_instances, appendFeFunc_fn).call(this, feComponentTransfer, "feFuncG", gTable);
  __privateMethod(this, _DOMFilterFactory_instances, appendFeFunc_fn).call(this, feComponentTransfer, "feFuncB", bTable);
};
addTransferMapAlphaConversion_fn = function(aTable, filter) {
  const feComponentTransfer = __privateGet(this, _document).createElementNS(SVG_NS, "feComponentTransfer");
  filter.append(feComponentTransfer);
  __privateMethod(this, _DOMFilterFactory_instances, appendFeFunc_fn).call(this, feComponentTransfer, "feFuncA", aTable);
};
getRGB_fn = function(color) {
  __privateGet(this, _DOMFilterFactory_instances, defs_get).style.color = color;
  return getRGB(getComputedStyle(__privateGet(this, _DOMFilterFactory_instances, defs_get)).getPropertyValue("color"));
};
var DOMCanvasFactory = class extends BaseCanvasFactory {
  constructor({
    ownerDocument = globalThis.document
  } = {}) {
    super();
    this._document = ownerDocument;
  }
  _createCanvas(width, height) {
    const canvas = this._document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
};
async function fetchData(url, type = "text") {
  if (isValidFetchUrl(url, document.baseURI)) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    switch (type) {
      case "arraybuffer":
        return response.arrayBuffer();
      case "blob":
        return response.blob();
      case "json":
        return response.json();
    }
    return response.text();
  }
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = type;
    request.onreadystatechange = () => {
      if (request.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      if (request.status === 200 || request.status === 0) {
        switch (type) {
          case "arraybuffer":
          case "blob":
          case "json":
            resolve(request.response);
            return;
        }
        resolve(request.responseText);
        return;
      }
      reject(new Error(request.statusText));
    };
    request.send(null);
  });
}
var DOMCMapReaderFactory = class extends BaseCMapReaderFactory {
  _fetchData(url, compressionType) {
    return fetchData(url, this.isCompressed ? "arraybuffer" : "text").then((data) => ({
      cMapData: data instanceof ArrayBuffer ? new Uint8Array(data) : stringToBytes(data),
      compressionType
    }));
  }
};
var DOMStandardFontDataFactory = class extends BaseStandardFontDataFactory {
  _fetchData(url) {
    return fetchData(url, "arraybuffer").then((data) => new Uint8Array(data));
  }
};
var DOMSVGFactory = class extends BaseSVGFactory {
  _createSVG(type) {
    return document.createElementNS(SVG_NS, type);
  }
};
var PageViewport = class _PageViewport {
  constructor({
    viewBox,
    scale,
    rotation,
    offsetX = 0,
    offsetY = 0,
    dontFlip = false
  }) {
    this.viewBox = viewBox;
    this.scale = scale;
    this.rotation = rotation;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    const centerX = (viewBox[2] + viewBox[0]) / 2;
    const centerY = (viewBox[3] + viewBox[1]) / 2;
    let rotateA, rotateB, rotateC, rotateD;
    rotation %= 360;
    if (rotation < 0) {
      rotation += 360;
    }
    switch (rotation) {
      case 180:
        rotateA = -1;
        rotateB = 0;
        rotateC = 0;
        rotateD = 1;
        break;
      case 90:
        rotateA = 0;
        rotateB = 1;
        rotateC = 1;
        rotateD = 0;
        break;
      case 270:
        rotateA = 0;
        rotateB = -1;
        rotateC = -1;
        rotateD = 0;
        break;
      case 0:
        rotateA = 1;
        rotateB = 0;
        rotateC = 0;
        rotateD = -1;
        break;
      default:
        throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
    }
    if (dontFlip) {
      rotateC = -rotateC;
      rotateD = -rotateD;
    }
    let offsetCanvasX, offsetCanvasY;
    let width, height;
    if (rotateA === 0) {
      offsetCanvasX = Math.abs(centerY - viewBox[1]) * scale + offsetX;
      offsetCanvasY = Math.abs(centerX - viewBox[0]) * scale + offsetY;
      width = (viewBox[3] - viewBox[1]) * scale;
      height = (viewBox[2] - viewBox[0]) * scale;
    } else {
      offsetCanvasX = Math.abs(centerX - viewBox[0]) * scale + offsetX;
      offsetCanvasY = Math.abs(centerY - viewBox[1]) * scale + offsetY;
      width = (viewBox[2] - viewBox[0]) * scale;
      height = (viewBox[3] - viewBox[1]) * scale;
    }
    this.transform = [rotateA * scale, rotateB * scale, rotateC * scale, rotateD * scale, offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY, offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY];
    this.width = width;
    this.height = height;
  }
  get rawDims() {
    const {
      viewBox
    } = this;
    return shadow(this, "rawDims", {
      pageWidth: viewBox[2] - viewBox[0],
      pageHeight: viewBox[3] - viewBox[1],
      pageX: viewBox[0],
      pageY: viewBox[1]
    });
  }
  clone({
    scale = this.scale,
    rotation = this.rotation,
    offsetX = this.offsetX,
    offsetY = this.offsetY,
    dontFlip = false
  } = {}) {
    return new _PageViewport({
      viewBox: this.viewBox.slice(),
      scale,
      rotation,
      offsetX,
      offsetY,
      dontFlip
    });
  }
  convertToViewportPoint(x2, y2) {
    return Util.applyTransform([x2, y2], this.transform);
  }
  convertToViewportRectangle(rect) {
    const topLeft = Util.applyTransform([rect[0], rect[1]], this.transform);
    const bottomRight = Util.applyTransform([rect[2], rect[3]], this.transform);
    return [topLeft[0], topLeft[1], bottomRight[0], bottomRight[1]];
  }
  convertToPdfPoint(x2, y2) {
    return Util.applyInverseTransform([x2, y2], this.transform);
  }
};
var RenderingCancelledException = class extends BaseException {
  constructor(msg, extraDelay = 0) {
    super(msg, "RenderingCancelledException");
    this.extraDelay = extraDelay;
  }
};
function isDataScheme(url) {
  const ii = url.length;
  let i2 = 0;
  while (i2 < ii && url[i2].trim() === "") {
    i2++;
  }
  return url.substring(i2, i2 + 5).toLowerCase() === "data:";
}
function isPdfFile(filename) {
  return typeof filename === "string" && /\.pdf$/i.test(filename);
}
function getFilenameFromUrl(url) {
  [url] = url.split(/[#?]/, 1);
  return url.substring(url.lastIndexOf("/") + 1);
}
function getPdfFilenameFromUrl(url, defaultFilename = "document.pdf") {
  if (typeof url !== "string") {
    return defaultFilename;
  }
  if (isDataScheme(url)) {
    warn('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.');
    return defaultFilename;
  }
  const reURI = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/;
  const reFilename = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
  const splitURI = reURI.exec(url);
  let suggestedFilename = reFilename.exec(splitURI[1]) || reFilename.exec(splitURI[2]) || reFilename.exec(splitURI[3]);
  if (suggestedFilename) {
    suggestedFilename = suggestedFilename[0];
    if (suggestedFilename.includes("%")) {
      try {
        suggestedFilename = reFilename.exec(decodeURIComponent(suggestedFilename))[0];
      } catch {
      }
    }
  }
  return suggestedFilename || defaultFilename;
}
var StatTimer = class {
  constructor() {
    __publicField(this, "started", /* @__PURE__ */ Object.create(null));
    __publicField(this, "times", []);
  }
  time(name) {
    if (name in this.started) {
      warn(`Timer is already running for ${name}`);
    }
    this.started[name] = Date.now();
  }
  timeEnd(name) {
    if (!(name in this.started)) {
      warn(`Timer has not been started for ${name}`);
    }
    this.times.push({
      name,
      start: this.started[name],
      end: Date.now()
    });
    delete this.started[name];
  }
  toString() {
    const outBuf = [];
    let longest = 0;
    for (const {
      name
    } of this.times) {
      longest = Math.max(name.length, longest);
    }
    for (const {
      name,
      start,
      end
    } of this.times) {
      outBuf.push(`${name.padEnd(longest)} ${end - start}ms
`);
    }
    return outBuf.join("");
  }
};
function isValidFetchUrl(url, baseUrl) {
  try {
    const {
      protocol
    } = baseUrl ? new URL(url, baseUrl) : new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}
function noContextMenu(e2) {
  e2.preventDefault();
}
function deprecated(details) {
  console.log("Deprecated API usage: " + details);
}
var pdfDateStringRegex;
var PDFDateString = class {
  static toDateObject(input) {
    if (!input || typeof input !== "string") {
      return null;
    }
    pdfDateStringRegex || (pdfDateStringRegex = new RegExp("^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+|-])?(\\d{2})?'?(\\d{2})?'?"));
    const matches = pdfDateStringRegex.exec(input);
    if (!matches) {
      return null;
    }
    const year = parseInt(matches[1], 10);
    let month = parseInt(matches[2], 10);
    month = month >= 1 && month <= 12 ? month - 1 : 0;
    let day = parseInt(matches[3], 10);
    day = day >= 1 && day <= 31 ? day : 1;
    let hour = parseInt(matches[4], 10);
    hour = hour >= 0 && hour <= 23 ? hour : 0;
    let minute = parseInt(matches[5], 10);
    minute = minute >= 0 && minute <= 59 ? minute : 0;
    let second = parseInt(matches[6], 10);
    second = second >= 0 && second <= 59 ? second : 0;
    const universalTimeRelation = matches[7] || "Z";
    let offsetHour = parseInt(matches[8], 10);
    offsetHour = offsetHour >= 0 && offsetHour <= 23 ? offsetHour : 0;
    let offsetMinute = parseInt(matches[9], 10) || 0;
    offsetMinute = offsetMinute >= 0 && offsetMinute <= 59 ? offsetMinute : 0;
    if (universalTimeRelation === "-") {
      hour += offsetHour;
      minute += offsetMinute;
    } else if (universalTimeRelation === "+") {
      hour -= offsetHour;
      minute -= offsetMinute;
    }
    return new Date(Date.UTC(year, month, day, hour, minute, second));
  }
};
function getXfaPageViewport(xfaPage, {
  scale = 1,
  rotation = 0
}) {
  const {
    width,
    height
  } = xfaPage.attributes.style;
  const viewBox = [0, 0, parseInt(width), parseInt(height)];
  return new PageViewport({
    viewBox,
    scale,
    rotation
  });
}
function getRGB(color) {
  if (color.startsWith("#")) {
    const colorRGB = parseInt(color.slice(1), 16);
    return [(colorRGB & 16711680) >> 16, (colorRGB & 65280) >> 8, colorRGB & 255];
  }
  if (color.startsWith("rgb(")) {
    return color.slice(4, -1).split(",").map((x2) => parseInt(x2));
  }
  if (color.startsWith("rgba(")) {
    return color.slice(5, -1).split(",").map((x2) => parseInt(x2)).slice(0, 3);
  }
  warn(`Not a valid color format: "${color}"`);
  return [0, 0, 0];
}
function getColorValues(colors) {
  const span = document.createElement("span");
  span.style.visibility = "hidden";
  document.body.append(span);
  for (const name of colors.keys()) {
    span.style.color = name;
    const computedColor = window.getComputedStyle(span).color;
    colors.set(name, getRGB(computedColor));
  }
  span.remove();
}
function getCurrentTransform(ctx) {
  const {
    a: a2,
    b: b2,
    c: c2,
    d: d2,
    e: e2,
    f
  } = ctx.getTransform();
  return [a2, b2, c2, d2, e2, f];
}
function getCurrentTransformInverse(ctx) {
  const {
    a: a2,
    b: b2,
    c: c2,
    d: d2,
    e: e2,
    f
  } = ctx.getTransform().invertSelf();
  return [a2, b2, c2, d2, e2, f];
}
function setLayerDimensions(div, viewport, mustFlip = false, mustRotate = true) {
  if (viewport instanceof PageViewport) {
    const {
      pageWidth,
      pageHeight
    } = viewport.rawDims;
    const {
      style
    } = div;
    const useRound = util_FeatureTest.isCSSRoundSupported;
    const w2 = `var(--scale-factor) * ${pageWidth}px`, h = `var(--scale-factor) * ${pageHeight}px`;
    const widthStr = useRound ? `round(${w2}, 1px)` : `calc(${w2})`, heightStr = useRound ? `round(${h}, 1px)` : `calc(${h})`;
    if (!mustFlip || viewport.rotation % 180 === 0) {
      style.width = widthStr;
      style.height = heightStr;
    } else {
      style.width = heightStr;
      style.height = widthStr;
    }
  }
  if (mustRotate) {
    div.setAttribute("data-main-rotation", viewport.rotation);
  }
}
var _toolbar, _colorPicker, _editor, _buttons, _EditorToolbar_static, pointerDown_fn, _EditorToolbar_instances, focusIn_fn, focusOut_fn, addListenersToElement_fn, addDeleteButton_fn, divider_get;
var _EditorToolbar = class _EditorToolbar {
  constructor(editor) {
    __privateAdd(this, _EditorToolbar_instances);
    __privateAdd(this, _toolbar, null);
    __privateAdd(this, _colorPicker, null);
    __privateAdd(this, _editor);
    __privateAdd(this, _buttons, null);
    __privateSet(this, _editor, editor);
  }
  render() {
    const editToolbar = __privateSet(this, _toolbar, document.createElement("div"));
    editToolbar.className = "editToolbar";
    editToolbar.setAttribute("role", "toolbar");
    editToolbar.addEventListener("contextmenu", noContextMenu);
    editToolbar.addEventListener("pointerdown", __privateMethod(_EditorToolbar, _EditorToolbar_static, pointerDown_fn));
    const buttons = __privateSet(this, _buttons, document.createElement("div"));
    buttons.className = "buttons";
    editToolbar.append(buttons);
    const position = __privateGet(this, _editor).toolbarPosition;
    if (position) {
      const {
        style
      } = editToolbar;
      const x2 = __privateGet(this, _editor)._uiManager.direction === "ltr" ? 1 - position[0] : position[0];
      style.insetInlineEnd = `${100 * x2}%`;
      style.top = `calc(${100 * position[1]}% + var(--editor-toolbar-vert-offset))`;
    }
    __privateMethod(this, _EditorToolbar_instances, addDeleteButton_fn).call(this);
    return editToolbar;
  }
  hide() {
    var _a2;
    __privateGet(this, _toolbar).classList.add("hidden");
    (_a2 = __privateGet(this, _colorPicker)) == null ? void 0 : _a2.hideDropdown();
  }
  show() {
    __privateGet(this, _toolbar).classList.remove("hidden");
  }
  addAltTextButton(button) {
    __privateMethod(this, _EditorToolbar_instances, addListenersToElement_fn).call(this, button);
    __privateGet(this, _buttons).prepend(button, __privateGet(this, _EditorToolbar_instances, divider_get));
  }
  addColorPicker(colorPicker) {
    __privateSet(this, _colorPicker, colorPicker);
    const button = colorPicker.renderButton();
    __privateMethod(this, _EditorToolbar_instances, addListenersToElement_fn).call(this, button);
    __privateGet(this, _buttons).prepend(button, __privateGet(this, _EditorToolbar_instances, divider_get));
  }
  remove() {
    var _a2;
    __privateGet(this, _toolbar).remove();
    (_a2 = __privateGet(this, _colorPicker)) == null ? void 0 : _a2.destroy();
    __privateSet(this, _colorPicker, null);
  }
};
_toolbar = new WeakMap();
_colorPicker = new WeakMap();
_editor = new WeakMap();
_buttons = new WeakMap();
_EditorToolbar_static = new WeakSet();
pointerDown_fn = function(e2) {
  e2.stopPropagation();
};
_EditorToolbar_instances = new WeakSet();
focusIn_fn = function(e2) {
  __privateGet(this, _editor)._focusEventsAllowed = false;
  e2.preventDefault();
  e2.stopPropagation();
};
focusOut_fn = function(e2) {
  __privateGet(this, _editor)._focusEventsAllowed = true;
  e2.preventDefault();
  e2.stopPropagation();
};
addListenersToElement_fn = function(element) {
  element.addEventListener("focusin", __privateMethod(this, _EditorToolbar_instances, focusIn_fn).bind(this), {
    capture: true
  });
  element.addEventListener("focusout", __privateMethod(this, _EditorToolbar_instances, focusOut_fn).bind(this), {
    capture: true
  });
  element.addEventListener("contextmenu", noContextMenu);
};
addDeleteButton_fn = function() {
  const button = document.createElement("button");
  button.className = "delete";
  button.tabIndex = 0;
  button.setAttribute("data-l10n-id", `pdfjs-editor-remove-${__privateGet(this, _editor).editorType}-button`);
  __privateMethod(this, _EditorToolbar_instances, addListenersToElement_fn).call(this, button);
  button.addEventListener("click", (e2) => {
    __privateGet(this, _editor)._uiManager.delete();
  });
  __privateGet(this, _buttons).append(button);
};
divider_get = function() {
  const divider = document.createElement("div");
  divider.className = "divider";
  return divider;
};
__privateAdd(_EditorToolbar, _EditorToolbar_static);
var EditorToolbar = _EditorToolbar;
var _buttons2, _toolbar2, _uiManager, _HighlightToolbar_instances, render_fn, getLastPoint_fn, addHighlightButton_fn;
var HighlightToolbar = class {
  constructor(uiManager) {
    __privateAdd(this, _HighlightToolbar_instances);
    __privateAdd(this, _buttons2, null);
    __privateAdd(this, _toolbar2, null);
    __privateAdd(this, _uiManager);
    __privateSet(this, _uiManager, uiManager);
  }
  show(parent, boxes, isLTR) {
    const [x2, y2] = __privateMethod(this, _HighlightToolbar_instances, getLastPoint_fn).call(this, boxes, isLTR);
    const {
      style
    } = __privateGet(this, _toolbar2) || __privateSet(this, _toolbar2, __privateMethod(this, _HighlightToolbar_instances, render_fn).call(this));
    parent.append(__privateGet(this, _toolbar2));
    style.insetInlineEnd = `${100 * x2}%`;
    style.top = `calc(${100 * y2}% + var(--editor-toolbar-vert-offset))`;
  }
  hide() {
    __privateGet(this, _toolbar2).remove();
  }
};
_buttons2 = new WeakMap();
_toolbar2 = new WeakMap();
_uiManager = new WeakMap();
_HighlightToolbar_instances = new WeakSet();
render_fn = function() {
  const editToolbar = __privateSet(this, _toolbar2, document.createElement("div"));
  editToolbar.className = "editToolbar";
  editToolbar.setAttribute("role", "toolbar");
  editToolbar.addEventListener("contextmenu", noContextMenu);
  const buttons = __privateSet(this, _buttons2, document.createElement("div"));
  buttons.className = "buttons";
  editToolbar.append(buttons);
  __privateMethod(this, _HighlightToolbar_instances, addHighlightButton_fn).call(this);
  return editToolbar;
};
getLastPoint_fn = function(boxes, isLTR) {
  let lastY = 0;
  let lastX = 0;
  for (const box of boxes) {
    const y2 = box.y + box.height;
    if (y2 < lastY) {
      continue;
    }
    const x2 = box.x + (isLTR ? box.width : 0);
    if (y2 > lastY) {
      lastX = x2;
      lastY = y2;
      continue;
    }
    if (isLTR) {
      if (x2 > lastX) {
        lastX = x2;
      }
    } else if (x2 < lastX) {
      lastX = x2;
    }
  }
  return [isLTR ? 1 - lastX : lastX, lastY];
};
addHighlightButton_fn = function() {
  const button = document.createElement("button");
  button.className = "highlightButton";
  button.tabIndex = 0;
  button.setAttribute("data-l10n-id", `pdfjs-highlight-floating-button1`);
  const span = document.createElement("span");
  button.append(span);
  span.className = "visuallyHidden";
  span.setAttribute("data-l10n-id", "pdfjs-highlight-floating-button-label");
  button.addEventListener("contextmenu", noContextMenu);
  button.addEventListener("click", () => {
    __privateGet(this, _uiManager).highlightSelection("floating_button");
  });
  __privateGet(this, _buttons2).append(button);
};
function bindEvents(obj, element, names) {
  for (const name of names) {
    element.addEventListener(name, obj[name].bind(obj));
  }
}
function opacityToHex(opacity) {
  return Math.round(Math.min(255, Math.max(1, 255 * opacity))).toString(16).padStart(2, "0");
}
var _id2;
var IdManager = class {
  constructor() {
    __privateAdd(this, _id2, 0);
  }
  get id() {
    return `${AnnotationEditorPrefix}${__privateWrapper(this, _id2)._++}`;
  }
};
_id2 = new WeakMap();
var _baseId, _id3, _cache, _ImageManager_instances, get_fn;
var _ImageManager = class _ImageManager {
  constructor() {
    __privateAdd(this, _ImageManager_instances);
    __privateAdd(this, _baseId, getUuid());
    __privateAdd(this, _id3, 0);
    __privateAdd(this, _cache, null);
  }
  static get _isSVGFittingCanvas() {
    const svg = `data:image/svg+xml;charset=UTF-8,<svg viewBox="0 0 1 1" width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" style="fill:red;"/></svg>`;
    const canvas = new OffscreenCanvas(1, 3);
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = svg;
    const promise = image.decode().then(() => {
      ctx.drawImage(image, 0, 0, 1, 1, 0, 0, 1, 3);
      return new Uint32Array(ctx.getImageData(0, 0, 1, 1).data.buffer)[0] === 0;
    });
    return shadow(this, "_isSVGFittingCanvas", promise);
  }
  async getFromFile(file) {
    const {
      lastModified,
      name,
      size,
      type
    } = file;
    return __privateMethod(this, _ImageManager_instances, get_fn).call(this, `${lastModified}_${name}_${size}_${type}`, file);
  }
  async getFromUrl(url) {
    return __privateMethod(this, _ImageManager_instances, get_fn).call(this, url, url);
  }
  async getFromId(id) {
    __privateGet(this, _cache) || __privateSet(this, _cache, /* @__PURE__ */ new Map());
    const data = __privateGet(this, _cache).get(id);
    if (!data) {
      return null;
    }
    if (data.bitmap) {
      data.refCounter += 1;
      return data;
    }
    if (data.file) {
      return this.getFromFile(data.file);
    }
    return this.getFromUrl(data.url);
  }
  getSvgUrl(id) {
    const data = __privateGet(this, _cache).get(id);
    if (!(data == null ? void 0 : data.isSvg)) {
      return null;
    }
    return data.svgUrl;
  }
  deleteId(id) {
    __privateGet(this, _cache) || __privateSet(this, _cache, /* @__PURE__ */ new Map());
    const data = __privateGet(this, _cache).get(id);
    if (!data) {
      return;
    }
    data.refCounter -= 1;
    if (data.refCounter !== 0) {
      return;
    }
    data.bitmap = null;
  }
  isValidId(id) {
    return id.startsWith(`image_${__privateGet(this, _baseId)}_`);
  }
};
_baseId = new WeakMap();
_id3 = new WeakMap();
_cache = new WeakMap();
_ImageManager_instances = new WeakSet();
get_fn = async function(key, rawData) {
  __privateGet(this, _cache) || __privateSet(this, _cache, /* @__PURE__ */ new Map());
  let data = __privateGet(this, _cache).get(key);
  if (data === null) {
    return null;
  }
  if (data == null ? void 0 : data.bitmap) {
    data.refCounter += 1;
    return data;
  }
  try {
    data || (data = {
      bitmap: null,
      id: `image_${__privateGet(this, _baseId)}_${__privateWrapper(this, _id3)._++}`,
      refCounter: 0,
      isSvg: false
    });
    let image;
    if (typeof rawData === "string") {
      data.url = rawData;
      image = await fetchData(rawData, "blob");
    } else {
      image = data.file = rawData;
    }
    if (image.type === "image/svg+xml") {
      const mustRemoveAspectRatioPromise = _ImageManager._isSVGFittingCanvas;
      const fileReader = new FileReader();
      const imageElement = new Image();
      const imagePromise = new Promise((resolve, reject) => {
        imageElement.onload = () => {
          data.bitmap = imageElement;
          data.isSvg = true;
          resolve();
        };
        fileReader.onload = async () => {
          const url = data.svgUrl = fileReader.result;
          imageElement.src = await mustRemoveAspectRatioPromise ? `${url}#svgView(preserveAspectRatio(none))` : url;
        };
        imageElement.onerror = fileReader.onerror = reject;
      });
      fileReader.readAsDataURL(image);
      await imagePromise;
    } else {
      data.bitmap = await createImageBitmap(image);
    }
    data.refCounter = 1;
  } catch (e2) {
    console.error(e2);
    data = null;
  }
  __privateGet(this, _cache).set(key, data);
  if (data) {
    __privateGet(this, _cache).set(data.id, data);
  }
  return data;
};
var ImageManager = _ImageManager;
var _commands, _locked, _maxSize, _position;
var CommandManager = class {
  constructor(maxSize = 128) {
    __privateAdd(this, _commands, []);
    __privateAdd(this, _locked, false);
    __privateAdd(this, _maxSize);
    __privateAdd(this, _position, -1);
    __privateSet(this, _maxSize, maxSize);
  }
  add({
    cmd,
    undo,
    post,
    mustExec,
    type = NaN,
    overwriteIfSameType = false,
    keepUndo = false
  }) {
    if (mustExec) {
      cmd();
    }
    if (__privateGet(this, _locked)) {
      return;
    }
    const save = {
      cmd,
      undo,
      post,
      type
    };
    if (__privateGet(this, _position) === -1) {
      if (__privateGet(this, _commands).length > 0) {
        __privateGet(this, _commands).length = 0;
      }
      __privateSet(this, _position, 0);
      __privateGet(this, _commands).push(save);
      return;
    }
    if (overwriteIfSameType && __privateGet(this, _commands)[__privateGet(this, _position)].type === type) {
      if (keepUndo) {
        save.undo = __privateGet(this, _commands)[__privateGet(this, _position)].undo;
      }
      __privateGet(this, _commands)[__privateGet(this, _position)] = save;
      return;
    }
    const next = __privateGet(this, _position) + 1;
    if (next === __privateGet(this, _maxSize)) {
      __privateGet(this, _commands).splice(0, 1);
    } else {
      __privateSet(this, _position, next);
      if (next < __privateGet(this, _commands).length) {
        __privateGet(this, _commands).splice(next);
      }
    }
    __privateGet(this, _commands).push(save);
  }
  undo() {
    if (__privateGet(this, _position) === -1) {
      return;
    }
    __privateSet(this, _locked, true);
    const {
      undo,
      post
    } = __privateGet(this, _commands)[__privateGet(this, _position)];
    undo();
    post == null ? void 0 : post();
    __privateSet(this, _locked, false);
    __privateSet(this, _position, __privateGet(this, _position) - 1);
  }
  redo() {
    if (__privateGet(this, _position) < __privateGet(this, _commands).length - 1) {
      __privateSet(this, _position, __privateGet(this, _position) + 1);
      __privateSet(this, _locked, true);
      const {
        cmd,
        post
      } = __privateGet(this, _commands)[__privateGet(this, _position)];
      cmd();
      post == null ? void 0 : post();
      __privateSet(this, _locked, false);
    }
  }
  hasSomethingToUndo() {
    return __privateGet(this, _position) !== -1;
  }
  hasSomethingToRedo() {
    return __privateGet(this, _position) < __privateGet(this, _commands).length - 1;
  }
  destroy() {
    __privateSet(this, _commands, null);
  }
};
_commands = new WeakMap();
_locked = new WeakMap();
_maxSize = new WeakMap();
_position = new WeakMap();
var _KeyboardManager_instances, serialize_fn;
var KeyboardManager = class {
  constructor(callbacks) {
    __privateAdd(this, _KeyboardManager_instances);
    this.buffer = [];
    this.callbacks = /* @__PURE__ */ new Map();
    this.allKeys = /* @__PURE__ */ new Set();
    const {
      isMac
    } = util_FeatureTest.platform;
    for (const [keys, callback, options = {}] of callbacks) {
      for (const key of keys) {
        const isMacKey = key.startsWith("mac+");
        if (isMac && isMacKey) {
          this.callbacks.set(key.slice(4), {
            callback,
            options
          });
          this.allKeys.add(key.split("+").at(-1));
        } else if (!isMac && !isMacKey) {
          this.callbacks.set(key, {
            callback,
            options
          });
          this.allKeys.add(key.split("+").at(-1));
        }
      }
    }
  }
  exec(self, event) {
    if (!this.allKeys.has(event.key)) {
      return;
    }
    const info2 = this.callbacks.get(__privateMethod(this, _KeyboardManager_instances, serialize_fn).call(this, event));
    if (!info2) {
      return;
    }
    const {
      callback,
      options: {
        bubbles = false,
        args = [],
        checker = null
      }
    } = info2;
    if (checker && !checker(self, event)) {
      return;
    }
    callback.bind(self, ...args, event)();
    if (!bubbles) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
};
_KeyboardManager_instances = new WeakSet();
serialize_fn = function(event) {
  if (event.altKey) {
    this.buffer.push("alt");
  }
  if (event.ctrlKey) {
    this.buffer.push("ctrl");
  }
  if (event.metaKey) {
    this.buffer.push("meta");
  }
  if (event.shiftKey) {
    this.buffer.push("shift");
  }
  this.buffer.push(event.key);
  const str = this.buffer.join("+");
  this.buffer.length = 0;
  return str;
};
var _ColorManager = class _ColorManager {
  get _colors() {
    const colors = /* @__PURE__ */ new Map([["CanvasText", null], ["Canvas", null]]);
    getColorValues(colors);
    return shadow(this, "_colors", colors);
  }
  convert(color) {
    const rgb = getRGB(color);
    if (!window.matchMedia("(forced-colors: active)").matches) {
      return rgb;
    }
    for (const [name, RGB] of this._colors) {
      if (RGB.every((x2, i2) => x2 === rgb[i2])) {
        return _ColorManager._colorsMapping.get(name);
      }
    }
    return rgb;
  }
  getHexCode(name) {
    const rgb = this._colors.get(name);
    if (!rgb) {
      return name;
    }
    return Util.makeHexColor(...rgb);
  }
};
__publicField(_ColorManager, "_colorsMapping", /* @__PURE__ */ new Map([["CanvasText", [0, 0, 0]], ["Canvas", [255, 255, 255]]]));
var ColorManager = _ColorManager;
var _activeEditor, _allEditors, _allLayers, _altTextManager, _annotationStorage, _changedExistingAnnotations, _commandManager, _currentPageIndex, _deletedAnnotationsElementIds, _draggingEditors, _editorTypes, _editorsToRescale, _enableHighlightFloatingButton, _filterFactory, _focusMainContainerTimeoutId, _highlightColors, _highlightWhenShiftUp, _highlightToolbar, _idManager, _isEnabled, _isWaiting, _lastActiveElement, _mainHighlightColorPicker, _mlManager, _mode, _selectedEditors, _selectedTextNode, _pageColors, _showAllStates, _boundBlur, _boundFocus, _boundCopy, _boundCut, _boundPaste, _boundKeydown, _boundKeyup, _boundOnEditingAction, _boundOnPageChanging, _boundOnScaleChanging, _boundSelectionChange, _boundOnRotationChanging, _previousStates, _translation, _translationTimeoutId, _container, _viewer, _AnnotationEditorUIManager_instances, getAnchorElementForSelection_fn, displayHighlightToolbar_fn, selectionChange_fn, onSelectEnd_fn, addSelectionListener_fn, removeSelectionListener_fn, addFocusManager_fn, removeFocusManager_fn, addKeyboardManager_fn, removeKeyboardManager_fn, addCopyPasteListeners_fn, removeCopyPasteListeners_fn, dispatchUpdateStates_fn, dispatchUpdateUI_fn, enableAll_fn, disableAll_fn, addEditorToLayer_fn, lastSelectedEditor_get, isEmpty_fn, selectEditors_fn;
var _AnnotationEditorUIManager = class _AnnotationEditorUIManager {
  constructor(container, viewer, altTextManager, eventBus, pdfDocument, pageColors, highlightColors, enableHighlightFloatingButton, mlManager) {
    __privateAdd(this, _AnnotationEditorUIManager_instances);
    __privateAdd(this, _activeEditor, null);
    __privateAdd(this, _allEditors, /* @__PURE__ */ new Map());
    __privateAdd(this, _allLayers, /* @__PURE__ */ new Map());
    __privateAdd(this, _altTextManager, null);
    __privateAdd(this, _annotationStorage, null);
    __privateAdd(this, _changedExistingAnnotations, null);
    __privateAdd(this, _commandManager, new CommandManager());
    __privateAdd(this, _currentPageIndex, 0);
    __privateAdd(this, _deletedAnnotationsElementIds, /* @__PURE__ */ new Set());
    __privateAdd(this, _draggingEditors, null);
    __privateAdd(this, _editorTypes, null);
    __privateAdd(this, _editorsToRescale, /* @__PURE__ */ new Set());
    __privateAdd(this, _enableHighlightFloatingButton, false);
    __privateAdd(this, _filterFactory, null);
    __privateAdd(this, _focusMainContainerTimeoutId, null);
    __privateAdd(this, _highlightColors, null);
    __privateAdd(this, _highlightWhenShiftUp, false);
    __privateAdd(this, _highlightToolbar, null);
    __privateAdd(this, _idManager, new IdManager());
    __privateAdd(this, _isEnabled, false);
    __privateAdd(this, _isWaiting, false);
    __privateAdd(this, _lastActiveElement, null);
    __privateAdd(this, _mainHighlightColorPicker, null);
    __privateAdd(this, _mlManager, null);
    __privateAdd(this, _mode, AnnotationEditorType.NONE);
    __privateAdd(this, _selectedEditors, /* @__PURE__ */ new Set());
    __privateAdd(this, _selectedTextNode, null);
    __privateAdd(this, _pageColors, null);
    __privateAdd(this, _showAllStates, null);
    __privateAdd(this, _boundBlur, this.blur.bind(this));
    __privateAdd(this, _boundFocus, this.focus.bind(this));
    __privateAdd(this, _boundCopy, this.copy.bind(this));
    __privateAdd(this, _boundCut, this.cut.bind(this));
    __privateAdd(this, _boundPaste, this.paste.bind(this));
    __privateAdd(this, _boundKeydown, this.keydown.bind(this));
    __privateAdd(this, _boundKeyup, this.keyup.bind(this));
    __privateAdd(this, _boundOnEditingAction, this.onEditingAction.bind(this));
    __privateAdd(this, _boundOnPageChanging, this.onPageChanging.bind(this));
    __privateAdd(this, _boundOnScaleChanging, this.onScaleChanging.bind(this));
    __privateAdd(this, _boundSelectionChange, __privateMethod(this, _AnnotationEditorUIManager_instances, selectionChange_fn).bind(this));
    __privateAdd(this, _boundOnRotationChanging, this.onRotationChanging.bind(this));
    __privateAdd(this, _previousStates, {
      isEditing: false,
      isEmpty: true,
      hasSomethingToUndo: false,
      hasSomethingToRedo: false,
      hasSelectedEditor: false,
      hasSelectedText: false
    });
    __privateAdd(this, _translation, [0, 0]);
    __privateAdd(this, _translationTimeoutId, null);
    __privateAdd(this, _container, null);
    __privateAdd(this, _viewer, null);
    __privateSet(this, _container, container);
    __privateSet(this, _viewer, viewer);
    __privateSet(this, _altTextManager, altTextManager);
    this._eventBus = eventBus;
    this._eventBus._on("editingaction", __privateGet(this, _boundOnEditingAction));
    this._eventBus._on("pagechanging", __privateGet(this, _boundOnPageChanging));
    this._eventBus._on("scalechanging", __privateGet(this, _boundOnScaleChanging));
    this._eventBus._on("rotationchanging", __privateGet(this, _boundOnRotationChanging));
    __privateMethod(this, _AnnotationEditorUIManager_instances, addSelectionListener_fn).call(this);
    __privateMethod(this, _AnnotationEditorUIManager_instances, addKeyboardManager_fn).call(this);
    __privateSet(this, _annotationStorage, pdfDocument.annotationStorage);
    __privateSet(this, _filterFactory, pdfDocument.filterFactory);
    __privateSet(this, _pageColors, pageColors);
    __privateSet(this, _highlightColors, highlightColors || null);
    __privateSet(this, _enableHighlightFloatingButton, enableHighlightFloatingButton);
    __privateSet(this, _mlManager, mlManager || null);
    this.viewParameters = {
      realScale: PixelsPerInch.PDF_TO_CSS_UNITS,
      rotation: 0
    };
    this.isShiftKeyDown = false;
  }
  static get _keyboardManager() {
    const proto = _AnnotationEditorUIManager.prototype;
    const arrowChecker = (self) => __privateGet(self, _container).contains(document.activeElement) && document.activeElement.tagName !== "BUTTON" && self.hasSomethingToControl();
    const textInputChecker = (_self, {
      target: el
    }) => {
      if (el instanceof HTMLInputElement) {
        const {
          type
        } = el;
        return type !== "text" && type !== "number";
      }
      return true;
    };
    const small = this.TRANSLATE_SMALL;
    const big = this.TRANSLATE_BIG;
    return shadow(this, "_keyboardManager", new KeyboardManager([[["ctrl+a", "mac+meta+a"], proto.selectAll, {
      checker: textInputChecker
    }], [["ctrl+z", "mac+meta+z"], proto.undo, {
      checker: textInputChecker
    }], [["ctrl+y", "ctrl+shift+z", "mac+meta+shift+z", "ctrl+shift+Z", "mac+meta+shift+Z"], proto.redo, {
      checker: textInputChecker
    }], [["Backspace", "alt+Backspace", "ctrl+Backspace", "shift+Backspace", "mac+Backspace", "mac+alt+Backspace", "mac+ctrl+Backspace", "Delete", "ctrl+Delete", "shift+Delete", "mac+Delete"], proto.delete, {
      checker: textInputChecker
    }], [["Enter", "mac+Enter"], proto.addNewEditorFromKeyboard, {
      checker: (self, {
        target: el
      }) => !(el instanceof HTMLButtonElement) && __privateGet(self, _container).contains(el) && !self.isEnterHandled
    }], [[" ", "mac+ "], proto.addNewEditorFromKeyboard, {
      checker: (self, {
        target: el
      }) => !(el instanceof HTMLButtonElement) && __privateGet(self, _container).contains(document.activeElement)
    }], [["Escape", "mac+Escape"], proto.unselectAll], [["ArrowLeft", "mac+ArrowLeft"], proto.translateSelectedEditors, {
      args: [-small, 0],
      checker: arrowChecker
    }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], proto.translateSelectedEditors, {
      args: [-big, 0],
      checker: arrowChecker
    }], [["ArrowRight", "mac+ArrowRight"], proto.translateSelectedEditors, {
      args: [small, 0],
      checker: arrowChecker
    }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], proto.translateSelectedEditors, {
      args: [big, 0],
      checker: arrowChecker
    }], [["ArrowUp", "mac+ArrowUp"], proto.translateSelectedEditors, {
      args: [0, -small],
      checker: arrowChecker
    }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], proto.translateSelectedEditors, {
      args: [0, -big],
      checker: arrowChecker
    }], [["ArrowDown", "mac+ArrowDown"], proto.translateSelectedEditors, {
      args: [0, small],
      checker: arrowChecker
    }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], proto.translateSelectedEditors, {
      args: [0, big],
      checker: arrowChecker
    }]]));
  }
  destroy() {
    var _a2, _b;
    __privateMethod(this, _AnnotationEditorUIManager_instances, removeKeyboardManager_fn).call(this);
    __privateMethod(this, _AnnotationEditorUIManager_instances, removeFocusManager_fn).call(this);
    this._eventBus._off("editingaction", __privateGet(this, _boundOnEditingAction));
    this._eventBus._off("pagechanging", __privateGet(this, _boundOnPageChanging));
    this._eventBus._off("scalechanging", __privateGet(this, _boundOnScaleChanging));
    this._eventBus._off("rotationchanging", __privateGet(this, _boundOnRotationChanging));
    for (const layer of __privateGet(this, _allLayers).values()) {
      layer.destroy();
    }
    __privateGet(this, _allLayers).clear();
    __privateGet(this, _allEditors).clear();
    __privateGet(this, _editorsToRescale).clear();
    __privateSet(this, _activeEditor, null);
    __privateGet(this, _selectedEditors).clear();
    __privateGet(this, _commandManager).destroy();
    (_a2 = __privateGet(this, _altTextManager)) == null ? void 0 : _a2.destroy();
    (_b = __privateGet(this, _highlightToolbar)) == null ? void 0 : _b.hide();
    __privateSet(this, _highlightToolbar, null);
    if (__privateGet(this, _focusMainContainerTimeoutId)) {
      clearTimeout(__privateGet(this, _focusMainContainerTimeoutId));
      __privateSet(this, _focusMainContainerTimeoutId, null);
    }
    if (__privateGet(this, _translationTimeoutId)) {
      clearTimeout(__privateGet(this, _translationTimeoutId));
      __privateSet(this, _translationTimeoutId, null);
    }
    __privateMethod(this, _AnnotationEditorUIManager_instances, removeSelectionListener_fn).call(this);
  }
  async mlGuess(data) {
    var _a2;
    return ((_a2 = __privateGet(this, _mlManager)) == null ? void 0 : _a2.guess(data)) || null;
  }
  get hasMLManager() {
    return !!__privateGet(this, _mlManager);
  }
  get hcmFilter() {
    return shadow(this, "hcmFilter", __privateGet(this, _pageColors) ? __privateGet(this, _filterFactory).addHCMFilter(__privateGet(this, _pageColors).foreground, __privateGet(this, _pageColors).background) : "none");
  }
  get direction() {
    return shadow(this, "direction", getComputedStyle(__privateGet(this, _container)).direction);
  }
  get highlightColors() {
    return shadow(this, "highlightColors", __privateGet(this, _highlightColors) ? new Map(__privateGet(this, _highlightColors).split(",").map((pair) => pair.split("=").map((x2) => x2.trim()))) : null);
  }
  get highlightColorNames() {
    return shadow(this, "highlightColorNames", this.highlightColors ? new Map(Array.from(this.highlightColors, (e2) => e2.reverse())) : null);
  }
  setMainHighlightColorPicker(colorPicker) {
    __privateSet(this, _mainHighlightColorPicker, colorPicker);
  }
  editAltText(editor) {
    var _a2;
    (_a2 = __privateGet(this, _altTextManager)) == null ? void 0 : _a2.editAltText(this, editor);
  }
  onPageChanging({
    pageNumber
  }) {
    __privateSet(this, _currentPageIndex, pageNumber - 1);
  }
  focusMainContainer() {
    __privateGet(this, _container).focus();
  }
  findParent(x2, y2) {
    for (const layer of __privateGet(this, _allLayers).values()) {
      const {
        x: layerX,
        y: layerY,
        width,
        height
      } = layer.div.getBoundingClientRect();
      if (x2 >= layerX && x2 <= layerX + width && y2 >= layerY && y2 <= layerY + height) {
        return layer;
      }
    }
    return null;
  }
  disableUserSelect(value = false) {
    __privateGet(this, _viewer).classList.toggle("noUserSelect", value);
  }
  addShouldRescale(editor) {
    __privateGet(this, _editorsToRescale).add(editor);
  }
  removeShouldRescale(editor) {
    __privateGet(this, _editorsToRescale).delete(editor);
  }
  onScaleChanging({
    scale
  }) {
    this.commitOrRemove();
    this.viewParameters.realScale = scale * PixelsPerInch.PDF_TO_CSS_UNITS;
    for (const editor of __privateGet(this, _editorsToRescale)) {
      editor.onScaleChanging();
    }
  }
  onRotationChanging({
    pagesRotation
  }) {
    this.commitOrRemove();
    this.viewParameters.rotation = pagesRotation;
  }
  highlightSelection(methodOfCreation = "") {
    const selection = document.getSelection();
    if (!selection || selection.isCollapsed) {
      return;
    }
    const {
      anchorNode,
      anchorOffset,
      focusNode,
      focusOffset
    } = selection;
    const text = selection.toString();
    const anchorElement = __privateMethod(this, _AnnotationEditorUIManager_instances, getAnchorElementForSelection_fn).call(this, selection);
    const textLayer = anchorElement.closest(".textLayer");
    const boxes = this.getSelectionBoxes(textLayer);
    if (!boxes) {
      return;
    }
    selection.empty();
    if (__privateGet(this, _mode) === AnnotationEditorType.NONE) {
      this._eventBus.dispatch("showannotationeditorui", {
        source: this,
        mode: AnnotationEditorType.HIGHLIGHT
      });
      this.showAllEditors("highlight", true, true);
    }
    for (const layer of __privateGet(this, _allLayers).values()) {
      if (layer.hasTextLayer(textLayer)) {
        layer.createAndAddNewEditor({
          x: 0,
          y: 0
        }, false, {
          methodOfCreation,
          boxes,
          anchorNode,
          anchorOffset,
          focusNode,
          focusOffset,
          text
        });
        break;
      }
    }
  }
  addToAnnotationStorage(editor) {
    if (!editor.isEmpty() && __privateGet(this, _annotationStorage) && !__privateGet(this, _annotationStorage).has(editor.id)) {
      __privateGet(this, _annotationStorage).setValue(editor.id, editor);
    }
  }
  blur() {
    this.isShiftKeyDown = false;
    if (__privateGet(this, _highlightWhenShiftUp)) {
      __privateSet(this, _highlightWhenShiftUp, false);
      __privateMethod(this, _AnnotationEditorUIManager_instances, onSelectEnd_fn).call(this, "main_toolbar");
    }
    if (!this.hasSelection) {
      return;
    }
    const {
      activeElement
    } = document;
    for (const editor of __privateGet(this, _selectedEditors)) {
      if (editor.div.contains(activeElement)) {
        __privateSet(this, _lastActiveElement, [editor, activeElement]);
        editor._focusEventsAllowed = false;
        break;
      }
    }
  }
  focus() {
    if (!__privateGet(this, _lastActiveElement)) {
      return;
    }
    const [lastEditor, lastActiveElement] = __privateGet(this, _lastActiveElement);
    __privateSet(this, _lastActiveElement, null);
    lastActiveElement.addEventListener("focusin", () => {
      lastEditor._focusEventsAllowed = true;
    }, {
      once: true
    });
    lastActiveElement.focus();
  }
  addEditListeners() {
    __privateMethod(this, _AnnotationEditorUIManager_instances, addKeyboardManager_fn).call(this);
    __privateMethod(this, _AnnotationEditorUIManager_instances, addCopyPasteListeners_fn).call(this);
  }
  removeEditListeners() {
    __privateMethod(this, _AnnotationEditorUIManager_instances, removeKeyboardManager_fn).call(this);
    __privateMethod(this, _AnnotationEditorUIManager_instances, removeCopyPasteListeners_fn).call(this);
  }
  copy(event) {
    var _a2;
    event.preventDefault();
    (_a2 = __privateGet(this, _activeEditor)) == null ? void 0 : _a2.commitOrRemove();
    if (!this.hasSelection) {
      return;
    }
    const editors = [];
    for (const editor of __privateGet(this, _selectedEditors)) {
      const serialized = editor.serialize(true);
      if (serialized) {
        editors.push(serialized);
      }
    }
    if (editors.length === 0) {
      return;
    }
    event.clipboardData.setData("application/pdfjs", JSON.stringify(editors));
  }
  cut(event) {
    this.copy(event);
    this.delete();
  }
  paste(event) {
    event.preventDefault();
    const {
      clipboardData
    } = event;
    for (const item of clipboardData.items) {
      for (const editorType of __privateGet(this, _editorTypes)) {
        if (editorType.isHandlingMimeForPasting(item.type)) {
          editorType.paste(item, this.currentLayer);
          return;
        }
      }
    }
    let data = clipboardData.getData("application/pdfjs");
    if (!data) {
      return;
    }
    try {
      data = JSON.parse(data);
    } catch (ex) {
      warn(`paste: "${ex.message}".`);
      return;
    }
    if (!Array.isArray(data)) {
      return;
    }
    this.unselectAll();
    const layer = this.currentLayer;
    try {
      const newEditors = [];
      for (const editor of data) {
        const deserializedEditor = layer.deserialize(editor);
        if (!deserializedEditor) {
          return;
        }
        newEditors.push(deserializedEditor);
      }
      const cmd = () => {
        for (const editor of newEditors) {
          __privateMethod(this, _AnnotationEditorUIManager_instances, addEditorToLayer_fn).call(this, editor);
        }
        __privateMethod(this, _AnnotationEditorUIManager_instances, selectEditors_fn).call(this, newEditors);
      };
      const undo = () => {
        for (const editor of newEditors) {
          editor.remove();
        }
      };
      this.addCommands({
        cmd,
        undo,
        mustExec: true
      });
    } catch (ex) {
      warn(`paste: "${ex.message}".`);
    }
  }
  keydown(event) {
    if (!this.isShiftKeyDown && event.key === "Shift") {
      this.isShiftKeyDown = true;
    }
    if (__privateGet(this, _mode) !== AnnotationEditorType.NONE && !this.isEditorHandlingKeyboard) {
      _AnnotationEditorUIManager._keyboardManager.exec(this, event);
    }
  }
  keyup(event) {
    if (this.isShiftKeyDown && event.key === "Shift") {
      this.isShiftKeyDown = false;
      if (__privateGet(this, _highlightWhenShiftUp)) {
        __privateSet(this, _highlightWhenShiftUp, false);
        __privateMethod(this, _AnnotationEditorUIManager_instances, onSelectEnd_fn).call(this, "main_toolbar");
      }
    }
  }
  onEditingAction({
    name
  }) {
    switch (name) {
      case "undo":
      case "redo":
      case "delete":
      case "selectAll":
        this[name]();
        break;
      case "highlightSelection":
        this.highlightSelection("context_menu");
        break;
    }
  }
  setEditingState(isEditing) {
    if (isEditing) {
      __privateMethod(this, _AnnotationEditorUIManager_instances, addFocusManager_fn).call(this);
      __privateMethod(this, _AnnotationEditorUIManager_instances, addCopyPasteListeners_fn).call(this);
      __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
        isEditing: __privateGet(this, _mode) !== AnnotationEditorType.NONE,
        isEmpty: __privateMethod(this, _AnnotationEditorUIManager_instances, isEmpty_fn).call(this),
        hasSomethingToUndo: __privateGet(this, _commandManager).hasSomethingToUndo(),
        hasSomethingToRedo: __privateGet(this, _commandManager).hasSomethingToRedo(),
        hasSelectedEditor: false
      });
    } else {
      __privateMethod(this, _AnnotationEditorUIManager_instances, removeFocusManager_fn).call(this);
      __privateMethod(this, _AnnotationEditorUIManager_instances, removeCopyPasteListeners_fn).call(this);
      __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
        isEditing: false
      });
      this.disableUserSelect(false);
    }
  }
  registerEditorTypes(types) {
    if (__privateGet(this, _editorTypes)) {
      return;
    }
    __privateSet(this, _editorTypes, types);
    for (const editorType of __privateGet(this, _editorTypes)) {
      __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateUI_fn).call(this, editorType.defaultPropertiesToUpdate);
    }
  }
  getId() {
    return __privateGet(this, _idManager).id;
  }
  get currentLayer() {
    return __privateGet(this, _allLayers).get(__privateGet(this, _currentPageIndex));
  }
  getLayer(pageIndex) {
    return __privateGet(this, _allLayers).get(pageIndex);
  }
  get currentPageIndex() {
    return __privateGet(this, _currentPageIndex);
  }
  addLayer(layer) {
    __privateGet(this, _allLayers).set(layer.pageIndex, layer);
    if (__privateGet(this, _isEnabled)) {
      layer.enable();
    } else {
      layer.disable();
    }
  }
  removeLayer(layer) {
    __privateGet(this, _allLayers).delete(layer.pageIndex);
  }
  updateMode(mode, editId = null, isFromKeyboard = false) {
    if (__privateGet(this, _mode) === mode) {
      return;
    }
    __privateSet(this, _mode, mode);
    if (mode === AnnotationEditorType.NONE) {
      this.setEditingState(false);
      __privateMethod(this, _AnnotationEditorUIManager_instances, disableAll_fn).call(this);
      return;
    }
    this.setEditingState(true);
    __privateMethod(this, _AnnotationEditorUIManager_instances, enableAll_fn).call(this);
    this.unselectAll();
    for (const layer of __privateGet(this, _allLayers).values()) {
      layer.updateMode(mode);
    }
    if (!editId && isFromKeyboard) {
      this.addNewEditorFromKeyboard();
      return;
    }
    if (!editId) {
      return;
    }
    for (const editor of __privateGet(this, _allEditors).values()) {
      if (editor.annotationElementId === editId) {
        this.setSelected(editor);
        editor.enterInEditMode();
        break;
      }
    }
  }
  addNewEditorFromKeyboard() {
    if (this.currentLayer.canCreateNewEmptyEditor()) {
      this.currentLayer.addNewEditor();
    }
  }
  updateToolbar(mode) {
    if (mode === __privateGet(this, _mode)) {
      return;
    }
    this._eventBus.dispatch("switchannotationeditormode", {
      source: this,
      mode
    });
  }
  updateParams(type, value) {
    var _a2;
    if (!__privateGet(this, _editorTypes)) {
      return;
    }
    switch (type) {
      case AnnotationEditorParamsType.CREATE:
        this.currentLayer.addNewEditor();
        return;
      case AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR:
        (_a2 = __privateGet(this, _mainHighlightColorPicker)) == null ? void 0 : _a2.updateColor(value);
        break;
      case AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL:
        this._eventBus.dispatch("reporttelemetry", {
          source: this,
          details: {
            type: "editing",
            data: {
              type: "highlight",
              action: "toggle_visibility"
            }
          }
        });
        (__privateGet(this, _showAllStates) || __privateSet(this, _showAllStates, /* @__PURE__ */ new Map())).set(type, value);
        this.showAllEditors("highlight", value);
        break;
    }
    for (const editor of __privateGet(this, _selectedEditors)) {
      editor.updateParams(type, value);
    }
    for (const editorType of __privateGet(this, _editorTypes)) {
      editorType.updateDefaultParams(type, value);
    }
  }
  showAllEditors(type, visible, updateButton = false) {
    var _a2;
    for (const editor of __privateGet(this, _allEditors).values()) {
      if (editor.editorType === type) {
        editor.show(visible);
      }
    }
    const state = ((_a2 = __privateGet(this, _showAllStates)) == null ? void 0 : _a2.get(AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL)) ?? true;
    if (state !== visible) {
      __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateUI_fn).call(this, [[AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL, visible]]);
    }
  }
  enableWaiting(mustWait = false) {
    if (__privateGet(this, _isWaiting) === mustWait) {
      return;
    }
    __privateSet(this, _isWaiting, mustWait);
    for (const layer of __privateGet(this, _allLayers).values()) {
      if (mustWait) {
        layer.disableClick();
      } else {
        layer.enableClick();
      }
      layer.div.classList.toggle("waiting", mustWait);
    }
  }
  getEditors(pageIndex) {
    const editors = [];
    for (const editor of __privateGet(this, _allEditors).values()) {
      if (editor.pageIndex === pageIndex) {
        editors.push(editor);
      }
    }
    return editors;
  }
  getEditor(id) {
    return __privateGet(this, _allEditors).get(id);
  }
  addEditor(editor) {
    __privateGet(this, _allEditors).set(editor.id, editor);
  }
  removeEditor(editor) {
    var _a2;
    if (editor.div.contains(document.activeElement)) {
      if (__privateGet(this, _focusMainContainerTimeoutId)) {
        clearTimeout(__privateGet(this, _focusMainContainerTimeoutId));
      }
      __privateSet(this, _focusMainContainerTimeoutId, setTimeout(() => {
        this.focusMainContainer();
        __privateSet(this, _focusMainContainerTimeoutId, null);
      }, 0));
    }
    __privateGet(this, _allEditors).delete(editor.id);
    this.unselect(editor);
    if (!editor.annotationElementId || !__privateGet(this, _deletedAnnotationsElementIds).has(editor.annotationElementId)) {
      (_a2 = __privateGet(this, _annotationStorage)) == null ? void 0 : _a2.remove(editor.id);
    }
  }
  addDeletedAnnotationElement(editor) {
    __privateGet(this, _deletedAnnotationsElementIds).add(editor.annotationElementId);
    this.addChangedExistingAnnotation(editor);
    editor.deleted = true;
  }
  isDeletedAnnotationElement(annotationElementId) {
    return __privateGet(this, _deletedAnnotationsElementIds).has(annotationElementId);
  }
  removeDeletedAnnotationElement(editor) {
    __privateGet(this, _deletedAnnotationsElementIds).delete(editor.annotationElementId);
    this.removeChangedExistingAnnotation(editor);
    editor.deleted = false;
  }
  setActiveEditor(editor) {
    if (__privateGet(this, _activeEditor) === editor) {
      return;
    }
    __privateSet(this, _activeEditor, editor);
    if (editor) {
      __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateUI_fn).call(this, editor.propertiesToUpdate);
    }
  }
  updateUI(editor) {
    if (__privateGet(this, _AnnotationEditorUIManager_instances, lastSelectedEditor_get) === editor) {
      __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateUI_fn).call(this, editor.propertiesToUpdate);
    }
  }
  toggleSelected(editor) {
    if (__privateGet(this, _selectedEditors).has(editor)) {
      __privateGet(this, _selectedEditors).delete(editor);
      editor.unselect();
      __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
        hasSelectedEditor: this.hasSelection
      });
      return;
    }
    __privateGet(this, _selectedEditors).add(editor);
    editor.select();
    __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateUI_fn).call(this, editor.propertiesToUpdate);
    __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
      hasSelectedEditor: true
    });
  }
  setSelected(editor) {
    for (const ed of __privateGet(this, _selectedEditors)) {
      if (ed !== editor) {
        ed.unselect();
      }
    }
    __privateGet(this, _selectedEditors).clear();
    __privateGet(this, _selectedEditors).add(editor);
    editor.select();
    __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateUI_fn).call(this, editor.propertiesToUpdate);
    __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
      hasSelectedEditor: true
    });
  }
  isSelected(editor) {
    return __privateGet(this, _selectedEditors).has(editor);
  }
  get firstSelectedEditor() {
    return __privateGet(this, _selectedEditors).values().next().value;
  }
  unselect(editor) {
    editor.unselect();
    __privateGet(this, _selectedEditors).delete(editor);
    __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
      hasSelectedEditor: this.hasSelection
    });
  }
  get hasSelection() {
    return __privateGet(this, _selectedEditors).size !== 0;
  }
  get isEnterHandled() {
    return __privateGet(this, _selectedEditors).size === 1 && this.firstSelectedEditor.isEnterHandled;
  }
  undo() {
    __privateGet(this, _commandManager).undo();
    __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
      hasSomethingToUndo: __privateGet(this, _commandManager).hasSomethingToUndo(),
      hasSomethingToRedo: true,
      isEmpty: __privateMethod(this, _AnnotationEditorUIManager_instances, isEmpty_fn).call(this)
    });
  }
  redo() {
    __privateGet(this, _commandManager).redo();
    __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
      hasSomethingToUndo: true,
      hasSomethingToRedo: __privateGet(this, _commandManager).hasSomethingToRedo(),
      isEmpty: __privateMethod(this, _AnnotationEditorUIManager_instances, isEmpty_fn).call(this)
    });
  }
  addCommands(params) {
    __privateGet(this, _commandManager).add(params);
    __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
      hasSomethingToUndo: true,
      hasSomethingToRedo: false,
      isEmpty: __privateMethod(this, _AnnotationEditorUIManager_instances, isEmpty_fn).call(this)
    });
  }
  delete() {
    this.commitOrRemove();
    if (!this.hasSelection) {
      return;
    }
    const editors = [...__privateGet(this, _selectedEditors)];
    const cmd = () => {
      for (const editor of editors) {
        editor.remove();
      }
    };
    const undo = () => {
      for (const editor of editors) {
        __privateMethod(this, _AnnotationEditorUIManager_instances, addEditorToLayer_fn).call(this, editor);
      }
    };
    this.addCommands({
      cmd,
      undo,
      mustExec: true
    });
  }
  commitOrRemove() {
    var _a2;
    (_a2 = __privateGet(this, _activeEditor)) == null ? void 0 : _a2.commitOrRemove();
  }
  hasSomethingToControl() {
    return __privateGet(this, _activeEditor) || this.hasSelection;
  }
  selectAll() {
    for (const editor of __privateGet(this, _selectedEditors)) {
      editor.commit();
    }
    __privateMethod(this, _AnnotationEditorUIManager_instances, selectEditors_fn).call(this, __privateGet(this, _allEditors).values());
  }
  unselectAll() {
    if (__privateGet(this, _activeEditor)) {
      __privateGet(this, _activeEditor).commitOrRemove();
      if (__privateGet(this, _mode) !== AnnotationEditorType.NONE) {
        return;
      }
    }
    if (!this.hasSelection) {
      return;
    }
    for (const editor of __privateGet(this, _selectedEditors)) {
      editor.unselect();
    }
    __privateGet(this, _selectedEditors).clear();
    __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
      hasSelectedEditor: false
    });
  }
  translateSelectedEditors(x2, y2, noCommit = false) {
    if (!noCommit) {
      this.commitOrRemove();
    }
    if (!this.hasSelection) {
      return;
    }
    __privateGet(this, _translation)[0] += x2;
    __privateGet(this, _translation)[1] += y2;
    const [totalX, totalY] = __privateGet(this, _translation);
    const editors = [...__privateGet(this, _selectedEditors)];
    const TIME_TO_WAIT = 1e3;
    if (__privateGet(this, _translationTimeoutId)) {
      clearTimeout(__privateGet(this, _translationTimeoutId));
    }
    __privateSet(this, _translationTimeoutId, setTimeout(() => {
      __privateSet(this, _translationTimeoutId, null);
      __privateGet(this, _translation)[0] = __privateGet(this, _translation)[1] = 0;
      this.addCommands({
        cmd: () => {
          for (const editor of editors) {
            if (__privateGet(this, _allEditors).has(editor.id)) {
              editor.translateInPage(totalX, totalY);
            }
          }
        },
        undo: () => {
          for (const editor of editors) {
            if (__privateGet(this, _allEditors).has(editor.id)) {
              editor.translateInPage(-totalX, -totalY);
            }
          }
        },
        mustExec: false
      });
    }, TIME_TO_WAIT));
    for (const editor of editors) {
      editor.translateInPage(x2, y2);
    }
  }
  setUpDragSession() {
    if (!this.hasSelection) {
      return;
    }
    this.disableUserSelect(true);
    __privateSet(this, _draggingEditors, /* @__PURE__ */ new Map());
    for (const editor of __privateGet(this, _selectedEditors)) {
      __privateGet(this, _draggingEditors).set(editor, {
        savedX: editor.x,
        savedY: editor.y,
        savedPageIndex: editor.pageIndex,
        newX: 0,
        newY: 0,
        newPageIndex: -1
      });
    }
  }
  endDragSession() {
    if (!__privateGet(this, _draggingEditors)) {
      return false;
    }
    this.disableUserSelect(false);
    const map = __privateGet(this, _draggingEditors);
    __privateSet(this, _draggingEditors, null);
    let mustBeAddedInUndoStack = false;
    for (const [{
      x: x2,
      y: y2,
      pageIndex
    }, value] of map) {
      value.newX = x2;
      value.newY = y2;
      value.newPageIndex = pageIndex;
      mustBeAddedInUndoStack || (mustBeAddedInUndoStack = x2 !== value.savedX || y2 !== value.savedY || pageIndex !== value.savedPageIndex);
    }
    if (!mustBeAddedInUndoStack) {
      return false;
    }
    const move = (editor, x2, y2, pageIndex) => {
      if (__privateGet(this, _allEditors).has(editor.id)) {
        const parent = __privateGet(this, _allLayers).get(pageIndex);
        if (parent) {
          editor._setParentAndPosition(parent, x2, y2);
        } else {
          editor.pageIndex = pageIndex;
          editor.x = x2;
          editor.y = y2;
        }
      }
    };
    this.addCommands({
      cmd: () => {
        for (const [editor, {
          newX,
          newY,
          newPageIndex
        }] of map) {
          move(editor, newX, newY, newPageIndex);
        }
      },
      undo: () => {
        for (const [editor, {
          savedX,
          savedY,
          savedPageIndex
        }] of map) {
          move(editor, savedX, savedY, savedPageIndex);
        }
      },
      mustExec: true
    });
    return true;
  }
  dragSelectedEditors(tx, ty) {
    if (!__privateGet(this, _draggingEditors)) {
      return;
    }
    for (const editor of __privateGet(this, _draggingEditors).keys()) {
      editor.drag(tx, ty);
    }
  }
  rebuild(editor) {
    if (editor.parent === null) {
      const parent = this.getLayer(editor.pageIndex);
      if (parent) {
        parent.changeParent(editor);
        parent.addOrRebuild(editor);
      } else {
        this.addEditor(editor);
        this.addToAnnotationStorage(editor);
        editor.rebuild();
      }
    } else {
      editor.parent.addOrRebuild(editor);
    }
  }
  get isEditorHandlingKeyboard() {
    var _a2;
    return ((_a2 = this.getActive()) == null ? void 0 : _a2.shouldGetKeyboardEvents()) || __privateGet(this, _selectedEditors).size === 1 && this.firstSelectedEditor.shouldGetKeyboardEvents();
  }
  isActive(editor) {
    return __privateGet(this, _activeEditor) === editor;
  }
  getActive() {
    return __privateGet(this, _activeEditor);
  }
  getMode() {
    return __privateGet(this, _mode);
  }
  get imageManager() {
    return shadow(this, "imageManager", new ImageManager());
  }
  getSelectionBoxes(textLayer) {
    if (!textLayer) {
      return null;
    }
    const selection = document.getSelection();
    for (let i2 = 0, ii = selection.rangeCount; i2 < ii; i2++) {
      if (!textLayer.contains(selection.getRangeAt(i2).commonAncestorContainer)) {
        return null;
      }
    }
    const {
      x: layerX,
      y: layerY,
      width: parentWidth,
      height: parentHeight
    } = textLayer.getBoundingClientRect();
    let rotator;
    switch (textLayer.getAttribute("data-main-rotation")) {
      case "90":
        rotator = (x2, y2, w2, h) => ({
          x: (y2 - layerY) / parentHeight,
          y: 1 - (x2 + w2 - layerX) / parentWidth,
          width: h / parentHeight,
          height: w2 / parentWidth
        });
        break;
      case "180":
        rotator = (x2, y2, w2, h) => ({
          x: 1 - (x2 + w2 - layerX) / parentWidth,
          y: 1 - (y2 + h - layerY) / parentHeight,
          width: w2 / parentWidth,
          height: h / parentHeight
        });
        break;
      case "270":
        rotator = (x2, y2, w2, h) => ({
          x: 1 - (y2 + h - layerY) / parentHeight,
          y: (x2 - layerX) / parentWidth,
          width: h / parentHeight,
          height: w2 / parentWidth
        });
        break;
      default:
        rotator = (x2, y2, w2, h) => ({
          x: (x2 - layerX) / parentWidth,
          y: (y2 - layerY) / parentHeight,
          width: w2 / parentWidth,
          height: h / parentHeight
        });
        break;
    }
    const boxes = [];
    for (let i2 = 0, ii = selection.rangeCount; i2 < ii; i2++) {
      const range = selection.getRangeAt(i2);
      if (range.collapsed) {
        continue;
      }
      for (const {
        x: x2,
        y: y2,
        width,
        height
      } of range.getClientRects()) {
        if (width === 0 || height === 0) {
          continue;
        }
        boxes.push(rotator(x2, y2, width, height));
      }
    }
    return boxes.length === 0 ? null : boxes;
  }
  addChangedExistingAnnotation({
    annotationElementId,
    id
  }) {
    (__privateGet(this, _changedExistingAnnotations) || __privateSet(this, _changedExistingAnnotations, /* @__PURE__ */ new Map())).set(annotationElementId, id);
  }
  removeChangedExistingAnnotation({
    annotationElementId
  }) {
    var _a2;
    (_a2 = __privateGet(this, _changedExistingAnnotations)) == null ? void 0 : _a2.delete(annotationElementId);
  }
  renderAnnotationElement(annotation) {
    var _a2;
    const editorId = (_a2 = __privateGet(this, _changedExistingAnnotations)) == null ? void 0 : _a2.get(annotation.data.id);
    if (!editorId) {
      return;
    }
    const editor = __privateGet(this, _annotationStorage).getRawValue(editorId);
    if (!editor) {
      return;
    }
    if (__privateGet(this, _mode) === AnnotationEditorType.NONE && !editor.hasBeenModified) {
      return;
    }
    editor.renderAnnotationElement(annotation);
  }
};
_activeEditor = new WeakMap();
_allEditors = new WeakMap();
_allLayers = new WeakMap();
_altTextManager = new WeakMap();
_annotationStorage = new WeakMap();
_changedExistingAnnotations = new WeakMap();
_commandManager = new WeakMap();
_currentPageIndex = new WeakMap();
_deletedAnnotationsElementIds = new WeakMap();
_draggingEditors = new WeakMap();
_editorTypes = new WeakMap();
_editorsToRescale = new WeakMap();
_enableHighlightFloatingButton = new WeakMap();
_filterFactory = new WeakMap();
_focusMainContainerTimeoutId = new WeakMap();
_highlightColors = new WeakMap();
_highlightWhenShiftUp = new WeakMap();
_highlightToolbar = new WeakMap();
_idManager = new WeakMap();
_isEnabled = new WeakMap();
_isWaiting = new WeakMap();
_lastActiveElement = new WeakMap();
_mainHighlightColorPicker = new WeakMap();
_mlManager = new WeakMap();
_mode = new WeakMap();
_selectedEditors = new WeakMap();
_selectedTextNode = new WeakMap();
_pageColors = new WeakMap();
_showAllStates = new WeakMap();
_boundBlur = new WeakMap();
_boundFocus = new WeakMap();
_boundCopy = new WeakMap();
_boundCut = new WeakMap();
_boundPaste = new WeakMap();
_boundKeydown = new WeakMap();
_boundKeyup = new WeakMap();
_boundOnEditingAction = new WeakMap();
_boundOnPageChanging = new WeakMap();
_boundOnScaleChanging = new WeakMap();
_boundSelectionChange = new WeakMap();
_boundOnRotationChanging = new WeakMap();
_previousStates = new WeakMap();
_translation = new WeakMap();
_translationTimeoutId = new WeakMap();
_container = new WeakMap();
_viewer = new WeakMap();
_AnnotationEditorUIManager_instances = new WeakSet();
getAnchorElementForSelection_fn = function({
  anchorNode
}) {
  return anchorNode.nodeType === Node.TEXT_NODE ? anchorNode.parentElement : anchorNode;
};
displayHighlightToolbar_fn = function() {
  const selection = document.getSelection();
  if (!selection || selection.isCollapsed) {
    return;
  }
  const anchorElement = __privateMethod(this, _AnnotationEditorUIManager_instances, getAnchorElementForSelection_fn).call(this, selection);
  const textLayer = anchorElement.closest(".textLayer");
  const boxes = this.getSelectionBoxes(textLayer);
  if (!boxes) {
    return;
  }
  __privateGet(this, _highlightToolbar) || __privateSet(this, _highlightToolbar, new HighlightToolbar(this));
  __privateGet(this, _highlightToolbar).show(textLayer, boxes, this.direction === "ltr");
};
selectionChange_fn = function() {
  var _a2, _b, _c;
  const selection = document.getSelection();
  if (!selection || selection.isCollapsed) {
    if (__privateGet(this, _selectedTextNode)) {
      (_a2 = __privateGet(this, _highlightToolbar)) == null ? void 0 : _a2.hide();
      __privateSet(this, _selectedTextNode, null);
      __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
        hasSelectedText: false
      });
    }
    return;
  }
  const {
    anchorNode
  } = selection;
  if (anchorNode === __privateGet(this, _selectedTextNode)) {
    return;
  }
  const anchorElement = __privateMethod(this, _AnnotationEditorUIManager_instances, getAnchorElementForSelection_fn).call(this, selection);
  const textLayer = anchorElement.closest(".textLayer");
  if (!textLayer) {
    if (__privateGet(this, _selectedTextNode)) {
      (_b = __privateGet(this, _highlightToolbar)) == null ? void 0 : _b.hide();
      __privateSet(this, _selectedTextNode, null);
      __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
        hasSelectedText: false
      });
    }
    return;
  }
  (_c = __privateGet(this, _highlightToolbar)) == null ? void 0 : _c.hide();
  __privateSet(this, _selectedTextNode, anchorNode);
  __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
    hasSelectedText: true
  });
  if (__privateGet(this, _mode) !== AnnotationEditorType.HIGHLIGHT && __privateGet(this, _mode) !== AnnotationEditorType.NONE) {
    return;
  }
  if (__privateGet(this, _mode) === AnnotationEditorType.HIGHLIGHT) {
    this.showAllEditors("highlight", true, true);
  }
  __privateSet(this, _highlightWhenShiftUp, this.isShiftKeyDown);
  if (!this.isShiftKeyDown) {
    const pointerup = (e2) => {
      if (e2.type === "pointerup" && e2.button !== 0) {
        return;
      }
      window.removeEventListener("pointerup", pointerup);
      window.removeEventListener("blur", pointerup);
      if (e2.type === "pointerup") {
        __privateMethod(this, _AnnotationEditorUIManager_instances, onSelectEnd_fn).call(this, "main_toolbar");
      }
    };
    window.addEventListener("pointerup", pointerup);
    window.addEventListener("blur", pointerup);
  }
};
onSelectEnd_fn = function(methodOfCreation = "") {
  if (__privateGet(this, _mode) === AnnotationEditorType.HIGHLIGHT) {
    this.highlightSelection(methodOfCreation);
  } else if (__privateGet(this, _enableHighlightFloatingButton)) {
    __privateMethod(this, _AnnotationEditorUIManager_instances, displayHighlightToolbar_fn).call(this);
  }
};
addSelectionListener_fn = function() {
  document.addEventListener("selectionchange", __privateGet(this, _boundSelectionChange));
};
removeSelectionListener_fn = function() {
  document.removeEventListener("selectionchange", __privateGet(this, _boundSelectionChange));
};
addFocusManager_fn = function() {
  window.addEventListener("focus", __privateGet(this, _boundFocus));
  window.addEventListener("blur", __privateGet(this, _boundBlur));
};
removeFocusManager_fn = function() {
  window.removeEventListener("focus", __privateGet(this, _boundFocus));
  window.removeEventListener("blur", __privateGet(this, _boundBlur));
};
addKeyboardManager_fn = function() {
  window.addEventListener("keydown", __privateGet(this, _boundKeydown));
  window.addEventListener("keyup", __privateGet(this, _boundKeyup));
};
removeKeyboardManager_fn = function() {
  window.removeEventListener("keydown", __privateGet(this, _boundKeydown));
  window.removeEventListener("keyup", __privateGet(this, _boundKeyup));
};
addCopyPasteListeners_fn = function() {
  document.addEventListener("copy", __privateGet(this, _boundCopy));
  document.addEventListener("cut", __privateGet(this, _boundCut));
  document.addEventListener("paste", __privateGet(this, _boundPaste));
};
removeCopyPasteListeners_fn = function() {
  document.removeEventListener("copy", __privateGet(this, _boundCopy));
  document.removeEventListener("cut", __privateGet(this, _boundCut));
  document.removeEventListener("paste", __privateGet(this, _boundPaste));
};
dispatchUpdateStates_fn = function(details) {
  const hasChanged = Object.entries(details).some(([key, value]) => __privateGet(this, _previousStates)[key] !== value);
  if (hasChanged) {
    this._eventBus.dispatch("annotationeditorstateschanged", {
      source: this,
      details: Object.assign(__privateGet(this, _previousStates), details)
    });
    if (__privateGet(this, _mode) === AnnotationEditorType.HIGHLIGHT && details.hasSelectedEditor === false) {
      __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateUI_fn).call(this, [[AnnotationEditorParamsType.HIGHLIGHT_FREE, true]]);
    }
  }
};
dispatchUpdateUI_fn = function(details) {
  this._eventBus.dispatch("annotationeditorparamschanged", {
    source: this,
    details
  });
};
enableAll_fn = function() {
  if (!__privateGet(this, _isEnabled)) {
    __privateSet(this, _isEnabled, true);
    for (const layer of __privateGet(this, _allLayers).values()) {
      layer.enable();
    }
    for (const editor of __privateGet(this, _allEditors).values()) {
      editor.enable();
    }
  }
};
disableAll_fn = function() {
  this.unselectAll();
  if (__privateGet(this, _isEnabled)) {
    __privateSet(this, _isEnabled, false);
    for (const layer of __privateGet(this, _allLayers).values()) {
      layer.disable();
    }
    for (const editor of __privateGet(this, _allEditors).values()) {
      editor.disable();
    }
  }
};
addEditorToLayer_fn = function(editor) {
  const layer = __privateGet(this, _allLayers).get(editor.pageIndex);
  if (layer) {
    layer.addOrRebuild(editor);
  } else {
    this.addEditor(editor);
    this.addToAnnotationStorage(editor);
  }
};
lastSelectedEditor_get = function() {
  let ed = null;
  for (ed of __privateGet(this, _selectedEditors)) {
  }
  return ed;
};
isEmpty_fn = function() {
  if (__privateGet(this, _allEditors).size === 0) {
    return true;
  }
  if (__privateGet(this, _allEditors).size === 1) {
    for (const editor of __privateGet(this, _allEditors).values()) {
      return editor.isEmpty();
    }
  }
  return false;
};
selectEditors_fn = function(editors) {
  for (const editor of __privateGet(this, _selectedEditors)) {
    editor.unselect();
  }
  __privateGet(this, _selectedEditors).clear();
  for (const editor of editors) {
    if (editor.isEmpty()) {
      continue;
    }
    __privateGet(this, _selectedEditors).add(editor);
    editor.select();
  }
  __privateMethod(this, _AnnotationEditorUIManager_instances, dispatchUpdateStates_fn).call(this, {
    hasSelectedEditor: this.hasSelection
  });
};
__publicField(_AnnotationEditorUIManager, "TRANSLATE_SMALL", 1);
__publicField(_AnnotationEditorUIManager, "TRANSLATE_BIG", 10);
var AnnotationEditorUIManager = _AnnotationEditorUIManager;
var _altText, _altTextDecorative, _altTextButton, _altTextTooltip, _altTextTooltipTimeout, _altTextWasFromKeyBoard, _editor2, _AltText_instances, setState_fn;
var _AltText = class _AltText {
  constructor(editor) {
    __privateAdd(this, _AltText_instances);
    __privateAdd(this, _altText, "");
    __privateAdd(this, _altTextDecorative, false);
    __privateAdd(this, _altTextButton, null);
    __privateAdd(this, _altTextTooltip, null);
    __privateAdd(this, _altTextTooltipTimeout, null);
    __privateAdd(this, _altTextWasFromKeyBoard, false);
    __privateAdd(this, _editor2, null);
    __privateSet(this, _editor2, editor);
  }
  static initialize(l10nPromise) {
    _AltText._l10nPromise || (_AltText._l10nPromise = l10nPromise);
  }
  async render() {
    const altText = __privateSet(this, _altTextButton, document.createElement("button"));
    altText.className = "altText";
    const msg = await _AltText._l10nPromise.get("pdfjs-editor-alt-text-button-label");
    altText.textContent = msg;
    altText.setAttribute("aria-label", msg);
    altText.tabIndex = "0";
    altText.addEventListener("contextmenu", noContextMenu);
    altText.addEventListener("pointerdown", (event) => event.stopPropagation());
    const onClick = (event) => {
      event.preventDefault();
      __privateGet(this, _editor2)._uiManager.editAltText(__privateGet(this, _editor2));
    };
    altText.addEventListener("click", onClick, {
      capture: true
    });
    altText.addEventListener("keydown", (event) => {
      if (event.target === altText && event.key === "Enter") {
        __privateSet(this, _altTextWasFromKeyBoard, true);
        onClick(event);
      }
    });
    await __privateMethod(this, _AltText_instances, setState_fn).call(this);
    return altText;
  }
  finish() {
    if (!__privateGet(this, _altTextButton)) {
      return;
    }
    __privateGet(this, _altTextButton).focus({
      focusVisible: __privateGet(this, _altTextWasFromKeyBoard)
    });
    __privateSet(this, _altTextWasFromKeyBoard, false);
  }
  isEmpty() {
    return !__privateGet(this, _altText) && !__privateGet(this, _altTextDecorative);
  }
  get data() {
    return {
      altText: __privateGet(this, _altText),
      decorative: __privateGet(this, _altTextDecorative)
    };
  }
  set data({
    altText,
    decorative
  }) {
    if (__privateGet(this, _altText) === altText && __privateGet(this, _altTextDecorative) === decorative) {
      return;
    }
    __privateSet(this, _altText, altText);
    __privateSet(this, _altTextDecorative, decorative);
    __privateMethod(this, _AltText_instances, setState_fn).call(this);
  }
  toggle(enabled = false) {
    if (!__privateGet(this, _altTextButton)) {
      return;
    }
    if (!enabled && __privateGet(this, _altTextTooltipTimeout)) {
      clearTimeout(__privateGet(this, _altTextTooltipTimeout));
      __privateSet(this, _altTextTooltipTimeout, null);
    }
    __privateGet(this, _altTextButton).disabled = !enabled;
  }
  destroy() {
    var _a2;
    (_a2 = __privateGet(this, _altTextButton)) == null ? void 0 : _a2.remove();
    __privateSet(this, _altTextButton, null);
    __privateSet(this, _altTextTooltip, null);
  }
};
_altText = new WeakMap();
_altTextDecorative = new WeakMap();
_altTextButton = new WeakMap();
_altTextTooltip = new WeakMap();
_altTextTooltipTimeout = new WeakMap();
_altTextWasFromKeyBoard = new WeakMap();
_editor2 = new WeakMap();
_AltText_instances = new WeakSet();
setState_fn = async function() {
  var _a2;
  const button = __privateGet(this, _altTextButton);
  if (!button) {
    return;
  }
  if (!__privateGet(this, _altText) && !__privateGet(this, _altTextDecorative)) {
    button.classList.remove("done");
    (_a2 = __privateGet(this, _altTextTooltip)) == null ? void 0 : _a2.remove();
    return;
  }
  button.classList.add("done");
  _AltText._l10nPromise.get("pdfjs-editor-alt-text-edit-button-label").then((msg) => {
    button.setAttribute("aria-label", msg);
  });
  let tooltip = __privateGet(this, _altTextTooltip);
  if (!tooltip) {
    __privateSet(this, _altTextTooltip, tooltip = document.createElement("span"));
    tooltip.className = "tooltip";
    tooltip.setAttribute("role", "tooltip");
    const id = tooltip.id = `alt-text-tooltip-${__privateGet(this, _editor2).id}`;
    button.setAttribute("aria-describedby", id);
    const DELAY_TO_SHOW_TOOLTIP = 100;
    button.addEventListener("mouseenter", () => {
      __privateSet(this, _altTextTooltipTimeout, setTimeout(() => {
        __privateSet(this, _altTextTooltipTimeout, null);
        __privateGet(this, _altTextTooltip).classList.add("show");
        __privateGet(this, _editor2)._reportTelemetry({
          action: "alt_text_tooltip"
        });
      }, DELAY_TO_SHOW_TOOLTIP));
    });
    button.addEventListener("mouseleave", () => {
      var _a3;
      if (__privateGet(this, _altTextTooltipTimeout)) {
        clearTimeout(__privateGet(this, _altTextTooltipTimeout));
        __privateSet(this, _altTextTooltipTimeout, null);
      }
      (_a3 = __privateGet(this, _altTextTooltip)) == null ? void 0 : _a3.classList.remove("show");
    });
  }
  tooltip.innerText = __privateGet(this, _altTextDecorative) ? await _AltText._l10nPromise.get("pdfjs-editor-alt-text-decorative-tooltip") : __privateGet(this, _altText);
  if (!tooltip.parentNode) {
    button.append(tooltip);
  }
  const element = __privateGet(this, _editor2).getImageForAltText();
  element == null ? void 0 : element.setAttribute("aria-describedby", tooltip.id);
};
__publicField(_AltText, "_l10nPromise", null);
var AltText = _AltText;
var _allResizerDivs, _altText2, _disabled, _keepAspectRatio, _resizersDiv, _savedDimensions, _boundFocusin, _boundFocusout, _editToolbar, _focusedResizerName, _hasBeenClicked, _initialPosition, _isEditing, _isInEditMode, _isResizerEnabledForKeyboard, _moveInDOMTimeout, _prevDragX, _prevDragY, _telemetryTimeouts, _isDraggable, _zIndex, _AnnotationEditor_instances, translate_fn, _AnnotationEditor_static, rotatePoint_fn, getRotationMatrix_fn, createResizers_fn, resizerPointerdown_fn, addResizeToUndoStack_fn, resizerPointermove_fn, selectOnPointerEvent_fn, setUpDragSession_fn, resizerKeydown_fn, resizerBlur_fn, resizerFocus_fn, setResizerTabIndex_fn, stopResizing_fn;
var _AnnotationEditor = class _AnnotationEditor {
  constructor(parameters) {
    __privateAdd(this, _AnnotationEditor_instances);
    __privateAdd(this, _allResizerDivs, null);
    __privateAdd(this, _altText2, null);
    __privateAdd(this, _disabled, false);
    __privateAdd(this, _keepAspectRatio, false);
    __privateAdd(this, _resizersDiv, null);
    __privateAdd(this, _savedDimensions, null);
    __privateAdd(this, _boundFocusin, this.focusin.bind(this));
    __privateAdd(this, _boundFocusout, this.focusout.bind(this));
    __privateAdd(this, _editToolbar, null);
    __privateAdd(this, _focusedResizerName, "");
    __privateAdd(this, _hasBeenClicked, false);
    __privateAdd(this, _initialPosition, null);
    __privateAdd(this, _isEditing, false);
    __privateAdd(this, _isInEditMode, false);
    __privateAdd(this, _isResizerEnabledForKeyboard, false);
    __privateAdd(this, _moveInDOMTimeout, null);
    __privateAdd(this, _prevDragX, 0);
    __privateAdd(this, _prevDragY, 0);
    __privateAdd(this, _telemetryTimeouts, null);
    __publicField(this, "_initialOptions", /* @__PURE__ */ Object.create(null));
    __publicField(this, "_isVisible", true);
    __publicField(this, "_uiManager", null);
    __publicField(this, "_focusEventsAllowed", true);
    __publicField(this, "_l10nPromise", null);
    __privateAdd(this, _isDraggable, false);
    __privateAdd(this, _zIndex, _AnnotationEditor._zIndex++);
    if (this.constructor === _AnnotationEditor) {
      unreachable("Cannot initialize AnnotationEditor.");
    }
    this.parent = parameters.parent;
    this.id = parameters.id;
    this.width = this.height = null;
    this.pageIndex = parameters.parent.pageIndex;
    this.name = parameters.name;
    this.div = null;
    this._uiManager = parameters.uiManager;
    this.annotationElementId = null;
    this._willKeepAspectRatio = false;
    this._initialOptions.isCentered = parameters.isCentered;
    this._structTreeParentId = null;
    const {
      rotation,
      rawDims: {
        pageWidth,
        pageHeight,
        pageX,
        pageY
      }
    } = this.parent.viewport;
    this.rotation = rotation;
    this.pageRotation = (360 + rotation - this._uiManager.viewParameters.rotation) % 360;
    this.pageDimensions = [pageWidth, pageHeight];
    this.pageTranslation = [pageX, pageY];
    const [width, height] = this.parentDimensions;
    this.x = parameters.x / width;
    this.y = parameters.y / height;
    this.isAttachedToDOM = false;
    this.deleted = false;
  }
  static get _resizerKeyboardManager() {
    const resize = _AnnotationEditor.prototype._resizeWithKeyboard;
    const small = AnnotationEditorUIManager.TRANSLATE_SMALL;
    const big = AnnotationEditorUIManager.TRANSLATE_BIG;
    return shadow(this, "_resizerKeyboardManager", new KeyboardManager([[["ArrowLeft", "mac+ArrowLeft"], resize, {
      args: [-small, 0]
    }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], resize, {
      args: [-big, 0]
    }], [["ArrowRight", "mac+ArrowRight"], resize, {
      args: [small, 0]
    }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], resize, {
      args: [big, 0]
    }], [["ArrowUp", "mac+ArrowUp"], resize, {
      args: [0, -small]
    }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], resize, {
      args: [0, -big]
    }], [["ArrowDown", "mac+ArrowDown"], resize, {
      args: [0, small]
    }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], resize, {
      args: [0, big]
    }], [["Escape", "mac+Escape"], _AnnotationEditor.prototype._stopResizingWithKeyboard]]));
  }
  get editorType() {
    return Object.getPrototypeOf(this).constructor._type;
  }
  static get _defaultLineColor() {
    return shadow(this, "_defaultLineColor", this._colorManager.getHexCode("CanvasText"));
  }
  static deleteAnnotationElement(editor) {
    const fakeEditor = new FakeEditor({
      id: editor.parent.getNextId(),
      parent: editor.parent,
      uiManager: editor._uiManager
    });
    fakeEditor.annotationElementId = editor.annotationElementId;
    fakeEditor.deleted = true;
    fakeEditor._uiManager.addToAnnotationStorage(fakeEditor);
  }
  static initialize(l10n, _uiManager4, options) {
    _AnnotationEditor._l10nPromise || (_AnnotationEditor._l10nPromise = new Map(["pdfjs-editor-alt-text-button-label", "pdfjs-editor-alt-text-edit-button-label", "pdfjs-editor-alt-text-decorative-tooltip", "pdfjs-editor-resizer-label-topLeft", "pdfjs-editor-resizer-label-topMiddle", "pdfjs-editor-resizer-label-topRight", "pdfjs-editor-resizer-label-middleRight", "pdfjs-editor-resizer-label-bottomRight", "pdfjs-editor-resizer-label-bottomMiddle", "pdfjs-editor-resizer-label-bottomLeft", "pdfjs-editor-resizer-label-middleLeft"].map((str) => [str, l10n.get(str.replaceAll(/([A-Z])/g, (c2) => `-${c2.toLowerCase()}`))])));
    if (options == null ? void 0 : options.strings) {
      for (const str of options.strings) {
        _AnnotationEditor._l10nPromise.set(str, l10n.get(str));
      }
    }
    if (_AnnotationEditor._borderLineWidth !== -1) {
      return;
    }
    const style = getComputedStyle(document.documentElement);
    _AnnotationEditor._borderLineWidth = parseFloat(style.getPropertyValue("--outline-width")) || 0;
  }
  static updateDefaultParams(_type2, _value) {
  }
  static get defaultPropertiesToUpdate() {
    return [];
  }
  static isHandlingMimeForPasting(mime) {
    return false;
  }
  static paste(item, parent) {
    unreachable("Not implemented");
  }
  get propertiesToUpdate() {
    return [];
  }
  get _isDraggable() {
    return __privateGet(this, _isDraggable);
  }
  set _isDraggable(value) {
    var _a2;
    __privateSet(this, _isDraggable, value);
    (_a2 = this.div) == null ? void 0 : _a2.classList.toggle("draggable", value);
  }
  get isEnterHandled() {
    return true;
  }
  center() {
    const [pageWidth, pageHeight] = this.pageDimensions;
    switch (this.parentRotation) {
      case 90:
        this.x -= this.height * pageHeight / (pageWidth * 2);
        this.y += this.width * pageWidth / (pageHeight * 2);
        break;
      case 180:
        this.x += this.width / 2;
        this.y += this.height / 2;
        break;
      case 270:
        this.x += this.height * pageHeight / (pageWidth * 2);
        this.y -= this.width * pageWidth / (pageHeight * 2);
        break;
      default:
        this.x -= this.width / 2;
        this.y -= this.height / 2;
        break;
    }
    this.fixAndSetPosition();
  }
  addCommands(params) {
    this._uiManager.addCommands(params);
  }
  get currentLayer() {
    return this._uiManager.currentLayer;
  }
  setInBackground() {
    this.div.style.zIndex = 0;
  }
  setInForeground() {
    this.div.style.zIndex = __privateGet(this, _zIndex);
  }
  setParent(parent) {
    if (parent !== null) {
      this.pageIndex = parent.pageIndex;
      this.pageDimensions = parent.pageDimensions;
    } else {
      __privateMethod(this, _AnnotationEditor_instances, stopResizing_fn).call(this);
    }
    this.parent = parent;
  }
  focusin(event) {
    if (!this._focusEventsAllowed) {
      return;
    }
    if (!__privateGet(this, _hasBeenClicked)) {
      this.parent.setSelected(this);
    } else {
      __privateSet(this, _hasBeenClicked, false);
    }
  }
  focusout(event) {
    var _a2;
    if (!this._focusEventsAllowed) {
      return;
    }
    if (!this.isAttachedToDOM) {
      return;
    }
    const target = event.relatedTarget;
    if (target == null ? void 0 : target.closest(`#${this.id}`)) {
      return;
    }
    event.preventDefault();
    if (!((_a2 = this.parent) == null ? void 0 : _a2.isMultipleSelection)) {
      this.commitOrRemove();
    }
  }
  commitOrRemove() {
    if (this.isEmpty()) {
      this.remove();
    } else {
      this.commit();
    }
  }
  commit() {
    this.addToAnnotationStorage();
  }
  addToAnnotationStorage() {
    this._uiManager.addToAnnotationStorage(this);
  }
  setAt(x2, y2, tx, ty) {
    const [width, height] = this.parentDimensions;
    [tx, ty] = this.screenToPageTranslation(tx, ty);
    this.x = (x2 + tx) / width;
    this.y = (y2 + ty) / height;
    this.fixAndSetPosition();
  }
  translate(x2, y2) {
    __privateMethod(this, _AnnotationEditor_instances, translate_fn).call(this, this.parentDimensions, x2, y2);
  }
  translateInPage(x2, y2) {
    __privateGet(this, _initialPosition) || __privateSet(this, _initialPosition, [this.x, this.y]);
    __privateMethod(this, _AnnotationEditor_instances, translate_fn).call(this, this.pageDimensions, x2, y2);
    this.div.scrollIntoView({
      block: "nearest"
    });
  }
  drag(tx, ty) {
    __privateGet(this, _initialPosition) || __privateSet(this, _initialPosition, [this.x, this.y]);
    const [parentWidth, parentHeight] = this.parentDimensions;
    this.x += tx / parentWidth;
    this.y += ty / parentHeight;
    if (this.parent && (this.x < 0 || this.x > 1 || this.y < 0 || this.y > 1)) {
      const {
        x: x3,
        y: y3
      } = this.div.getBoundingClientRect();
      if (this.parent.findNewParent(this, x3, y3)) {
        this.x -= Math.floor(this.x);
        this.y -= Math.floor(this.y);
      }
    }
    let {
      x: x2,
      y: y2
    } = this;
    const [bx, by] = this.getBaseTranslation();
    x2 += bx;
    y2 += by;
    this.div.style.left = `${(100 * x2).toFixed(2)}%`;
    this.div.style.top = `${(100 * y2).toFixed(2)}%`;
    this.div.scrollIntoView({
      block: "nearest"
    });
  }
  get _hasBeenMoved() {
    return !!__privateGet(this, _initialPosition) && (__privateGet(this, _initialPosition)[0] !== this.x || __privateGet(this, _initialPosition)[1] !== this.y);
  }
  getBaseTranslation() {
    const [parentWidth, parentHeight] = this.parentDimensions;
    const {
      _borderLineWidth
    } = _AnnotationEditor;
    const x2 = _borderLineWidth / parentWidth;
    const y2 = _borderLineWidth / parentHeight;
    switch (this.rotation) {
      case 90:
        return [-x2, y2];
      case 180:
        return [x2, y2];
      case 270:
        return [x2, -y2];
      default:
        return [-x2, -y2];
    }
  }
  get _mustFixPosition() {
    return true;
  }
  fixAndSetPosition(rotation = this.rotation) {
    const [pageWidth, pageHeight] = this.pageDimensions;
    let {
      x: x2,
      y: y2,
      width,
      height
    } = this;
    width *= pageWidth;
    height *= pageHeight;
    x2 *= pageWidth;
    y2 *= pageHeight;
    if (this._mustFixPosition) {
      switch (rotation) {
        case 0:
          x2 = Math.max(0, Math.min(pageWidth - width, x2));
          y2 = Math.max(0, Math.min(pageHeight - height, y2));
          break;
        case 90:
          x2 = Math.max(0, Math.min(pageWidth - height, x2));
          y2 = Math.min(pageHeight, Math.max(width, y2));
          break;
        case 180:
          x2 = Math.min(pageWidth, Math.max(width, x2));
          y2 = Math.min(pageHeight, Math.max(height, y2));
          break;
        case 270:
          x2 = Math.min(pageWidth, Math.max(height, x2));
          y2 = Math.max(0, Math.min(pageHeight - width, y2));
          break;
      }
    }
    this.x = x2 /= pageWidth;
    this.y = y2 /= pageHeight;
    const [bx, by] = this.getBaseTranslation();
    x2 += bx;
    y2 += by;
    const {
      style
    } = this.div;
    style.left = `${(100 * x2).toFixed(2)}%`;
    style.top = `${(100 * y2).toFixed(2)}%`;
    this.moveInDOM();
  }
  screenToPageTranslation(x2, y2) {
    var _a2;
    return __privateMethod(_a2 = _AnnotationEditor, _AnnotationEditor_static, rotatePoint_fn).call(_a2, x2, y2, this.parentRotation);
  }
  pageTranslationToScreen(x2, y2) {
    var _a2;
    return __privateMethod(_a2 = _AnnotationEditor, _AnnotationEditor_static, rotatePoint_fn).call(_a2, x2, y2, 360 - this.parentRotation);
  }
  get parentScale() {
    return this._uiManager.viewParameters.realScale;
  }
  get parentRotation() {
    return (this._uiManager.viewParameters.rotation + this.pageRotation) % 360;
  }
  get parentDimensions() {
    const {
      parentScale,
      pageDimensions: [pageWidth, pageHeight]
    } = this;
    const scaledWidth = pageWidth * parentScale;
    const scaledHeight = pageHeight * parentScale;
    return util_FeatureTest.isCSSRoundSupported ? [Math.round(scaledWidth), Math.round(scaledHeight)] : [scaledWidth, scaledHeight];
  }
  setDims(width, height) {
    const [parentWidth, parentHeight] = this.parentDimensions;
    this.div.style.width = `${(100 * width / parentWidth).toFixed(2)}%`;
    if (!__privateGet(this, _keepAspectRatio)) {
      this.div.style.height = `${(100 * height / parentHeight).toFixed(2)}%`;
    }
  }
  fixDims() {
    const {
      style
    } = this.div;
    const {
      height,
      width
    } = style;
    const widthPercent = width.endsWith("%");
    const heightPercent = !__privateGet(this, _keepAspectRatio) && height.endsWith("%");
    if (widthPercent && heightPercent) {
      return;
    }
    const [parentWidth, parentHeight] = this.parentDimensions;
    if (!widthPercent) {
      style.width = `${(100 * parseFloat(width) / parentWidth).toFixed(2)}%`;
    }
    if (!__privateGet(this, _keepAspectRatio) && !heightPercent) {
      style.height = `${(100 * parseFloat(height) / parentHeight).toFixed(2)}%`;
    }
  }
  getInitialTranslation() {
    return [0, 0];
  }
  altTextFinish() {
    var _a2;
    (_a2 = __privateGet(this, _altText2)) == null ? void 0 : _a2.finish();
  }
  async addEditToolbar() {
    if (__privateGet(this, _editToolbar) || __privateGet(this, _isInEditMode)) {
      return __privateGet(this, _editToolbar);
    }
    __privateSet(this, _editToolbar, new EditorToolbar(this));
    this.div.append(__privateGet(this, _editToolbar).render());
    if (__privateGet(this, _altText2)) {
      __privateGet(this, _editToolbar).addAltTextButton(await __privateGet(this, _altText2).render());
    }
    return __privateGet(this, _editToolbar);
  }
  removeEditToolbar() {
    var _a2;
    if (!__privateGet(this, _editToolbar)) {
      return;
    }
    __privateGet(this, _editToolbar).remove();
    __privateSet(this, _editToolbar, null);
    (_a2 = __privateGet(this, _altText2)) == null ? void 0 : _a2.destroy();
  }
  getClientDimensions() {
    return this.div.getBoundingClientRect();
  }
  async addAltTextButton() {
    if (__privateGet(this, _altText2)) {
      return;
    }
    AltText.initialize(_AnnotationEditor._l10nPromise);
    __privateSet(this, _altText2, new AltText(this));
    await this.addEditToolbar();
  }
  get altTextData() {
    var _a2;
    return (_a2 = __privateGet(this, _altText2)) == null ? void 0 : _a2.data;
  }
  set altTextData(data) {
    if (!__privateGet(this, _altText2)) {
      return;
    }
    __privateGet(this, _altText2).data = data;
  }
  hasAltText() {
    var _a2;
    return !((_a2 = __privateGet(this, _altText2)) == null ? void 0 : _a2.isEmpty());
  }
  render() {
    this.div = document.createElement("div");
    this.div.setAttribute("data-editor-rotation", (360 - this.rotation) % 360);
    this.div.className = this.name;
    this.div.setAttribute("id", this.id);
    this.div.tabIndex = __privateGet(this, _disabled) ? -1 : 0;
    if (!this._isVisible) {
      this.div.classList.add("hidden");
    }
    this.setInForeground();
    this.div.addEventListener("focusin", __privateGet(this, _boundFocusin));
    this.div.addEventListener("focusout", __privateGet(this, _boundFocusout));
    const [parentWidth, parentHeight] = this.parentDimensions;
    if (this.parentRotation % 180 !== 0) {
      this.div.style.maxWidth = `${(100 * parentHeight / parentWidth).toFixed(2)}%`;
      this.div.style.maxHeight = `${(100 * parentWidth / parentHeight).toFixed(2)}%`;
    }
    const [tx, ty] = this.getInitialTranslation();
    this.translate(tx, ty);
    bindEvents(this, this.div, ["pointerdown"]);
    return this.div;
  }
  pointerdown(event) {
    const {
      isMac
    } = util_FeatureTest.platform;
    if (event.button !== 0 || event.ctrlKey && isMac) {
      event.preventDefault();
      return;
    }
    __privateSet(this, _hasBeenClicked, true);
    if (this._isDraggable) {
      __privateMethod(this, _AnnotationEditor_instances, setUpDragSession_fn).call(this, event);
      return;
    }
    __privateMethod(this, _AnnotationEditor_instances, selectOnPointerEvent_fn).call(this, event);
  }
  moveInDOM() {
    if (__privateGet(this, _moveInDOMTimeout)) {
      clearTimeout(__privateGet(this, _moveInDOMTimeout));
    }
    __privateSet(this, _moveInDOMTimeout, setTimeout(() => {
      var _a2;
      __privateSet(this, _moveInDOMTimeout, null);
      (_a2 = this.parent) == null ? void 0 : _a2.moveEditorInDOM(this);
    }, 0));
  }
  _setParentAndPosition(parent, x2, y2) {
    parent.changeParent(this);
    this.x = x2;
    this.y = y2;
    this.fixAndSetPosition();
  }
  getRect(tx, ty, rotation = this.rotation) {
    const scale = this.parentScale;
    const [pageWidth, pageHeight] = this.pageDimensions;
    const [pageX, pageY] = this.pageTranslation;
    const shiftX = tx / scale;
    const shiftY = ty / scale;
    const x2 = this.x * pageWidth;
    const y2 = this.y * pageHeight;
    const width = this.width * pageWidth;
    const height = this.height * pageHeight;
    switch (rotation) {
      case 0:
        return [x2 + shiftX + pageX, pageHeight - y2 - shiftY - height + pageY, x2 + shiftX + width + pageX, pageHeight - y2 - shiftY + pageY];
      case 90:
        return [x2 + shiftY + pageX, pageHeight - y2 + shiftX + pageY, x2 + shiftY + height + pageX, pageHeight - y2 + shiftX + width + pageY];
      case 180:
        return [x2 - shiftX - width + pageX, pageHeight - y2 + shiftY + pageY, x2 - shiftX + pageX, pageHeight - y2 + shiftY + height + pageY];
      case 270:
        return [x2 - shiftY - height + pageX, pageHeight - y2 - shiftX - width + pageY, x2 - shiftY + pageX, pageHeight - y2 - shiftX + pageY];
      default:
        throw new Error("Invalid rotation");
    }
  }
  getRectInCurrentCoords(rect, pageHeight) {
    const [x1, y1, x2, y2] = rect;
    const width = x2 - x1;
    const height = y2 - y1;
    switch (this.rotation) {
      case 0:
        return [x1, pageHeight - y2, width, height];
      case 90:
        return [x1, pageHeight - y1, height, width];
      case 180:
        return [x2, pageHeight - y1, width, height];
      case 270:
        return [x2, pageHeight - y2, height, width];
      default:
        throw new Error("Invalid rotation");
    }
  }
  onceAdded() {
  }
  isEmpty() {
    return false;
  }
  enableEditMode() {
    __privateSet(this, _isInEditMode, true);
  }
  disableEditMode() {
    __privateSet(this, _isInEditMode, false);
  }
  isInEditMode() {
    return __privateGet(this, _isInEditMode);
  }
  shouldGetKeyboardEvents() {
    return __privateGet(this, _isResizerEnabledForKeyboard);
  }
  needsToBeRebuilt() {
    return this.div && !this.isAttachedToDOM;
  }
  rebuild() {
    var _a2, _b;
    (_a2 = this.div) == null ? void 0 : _a2.addEventListener("focusin", __privateGet(this, _boundFocusin));
    (_b = this.div) == null ? void 0 : _b.addEventListener("focusout", __privateGet(this, _boundFocusout));
  }
  rotate(_angle) {
  }
  serialize(isForCopying = false, context = null) {
    unreachable("An editor must be serializable");
  }
  static deserialize(data, parent, uiManager) {
    const editor = new this.prototype.constructor({
      parent,
      id: parent.getNextId(),
      uiManager
    });
    editor.rotation = data.rotation;
    const [pageWidth, pageHeight] = editor.pageDimensions;
    const [x2, y2, width, height] = editor.getRectInCurrentCoords(data.rect, pageHeight);
    editor.x = x2 / pageWidth;
    editor.y = y2 / pageHeight;
    editor.width = width / pageWidth;
    editor.height = height / pageHeight;
    return editor;
  }
  get hasBeenModified() {
    return !!this.annotationElementId && (this.deleted || this.serialize() !== null);
  }
  remove() {
    this.div.removeEventListener("focusin", __privateGet(this, _boundFocusin));
    this.div.removeEventListener("focusout", __privateGet(this, _boundFocusout));
    if (!this.isEmpty()) {
      this.commit();
    }
    if (this.parent) {
      this.parent.remove(this);
    } else {
      this._uiManager.removeEditor(this);
    }
    if (__privateGet(this, _moveInDOMTimeout)) {
      clearTimeout(__privateGet(this, _moveInDOMTimeout));
      __privateSet(this, _moveInDOMTimeout, null);
    }
    __privateMethod(this, _AnnotationEditor_instances, stopResizing_fn).call(this);
    this.removeEditToolbar();
    if (__privateGet(this, _telemetryTimeouts)) {
      for (const timeout of __privateGet(this, _telemetryTimeouts).values()) {
        clearTimeout(timeout);
      }
      __privateSet(this, _telemetryTimeouts, null);
    }
    this.parent = null;
  }
  get isResizable() {
    return false;
  }
  makeResizable() {
    if (this.isResizable) {
      __privateMethod(this, _AnnotationEditor_instances, createResizers_fn).call(this);
      __privateGet(this, _resizersDiv).classList.remove("hidden");
      bindEvents(this, this.div, ["keydown"]);
    }
  }
  get toolbarPosition() {
    return null;
  }
  keydown(event) {
    if (!this.isResizable || event.target !== this.div || event.key !== "Enter") {
      return;
    }
    this._uiManager.setSelected(this);
    __privateSet(this, _savedDimensions, {
      savedX: this.x,
      savedY: this.y,
      savedWidth: this.width,
      savedHeight: this.height
    });
    const children = __privateGet(this, _resizersDiv).children;
    if (!__privateGet(this, _allResizerDivs)) {
      __privateSet(this, _allResizerDivs, Array.from(children));
      const boundResizerKeydown = __privateMethod(this, _AnnotationEditor_instances, resizerKeydown_fn).bind(this);
      const boundResizerBlur = __privateMethod(this, _AnnotationEditor_instances, resizerBlur_fn).bind(this);
      for (const div of __privateGet(this, _allResizerDivs)) {
        const name = div.getAttribute("data-resizer-name");
        div.setAttribute("role", "spinbutton");
        div.addEventListener("keydown", boundResizerKeydown);
        div.addEventListener("blur", boundResizerBlur);
        div.addEventListener("focus", __privateMethod(this, _AnnotationEditor_instances, resizerFocus_fn).bind(this, name));
        _AnnotationEditor._l10nPromise.get(`pdfjs-editor-resizer-label-${name}`).then((msg) => div.setAttribute("aria-label", msg));
      }
    }
    const first = __privateGet(this, _allResizerDivs)[0];
    let firstPosition = 0;
    for (const div of children) {
      if (div === first) {
        break;
      }
      firstPosition++;
    }
    const nextFirstPosition = (360 - this.rotation + this.parentRotation) % 360 / 90 * (__privateGet(this, _allResizerDivs).length / 4);
    if (nextFirstPosition !== firstPosition) {
      if (nextFirstPosition < firstPosition) {
        for (let i3 = 0; i3 < firstPosition - nextFirstPosition; i3++) {
          __privateGet(this, _resizersDiv).append(__privateGet(this, _resizersDiv).firstChild);
        }
      } else if (nextFirstPosition > firstPosition) {
        for (let i3 = 0; i3 < nextFirstPosition - firstPosition; i3++) {
          __privateGet(this, _resizersDiv).firstChild.before(__privateGet(this, _resizersDiv).lastChild);
        }
      }
      let i2 = 0;
      for (const child of children) {
        const div = __privateGet(this, _allResizerDivs)[i2++];
        const name = div.getAttribute("data-resizer-name");
        _AnnotationEditor._l10nPromise.get(`pdfjs-editor-resizer-label-${name}`).then((msg) => child.setAttribute("aria-label", msg));
      }
    }
    __privateMethod(this, _AnnotationEditor_instances, setResizerTabIndex_fn).call(this, 0);
    __privateSet(this, _isResizerEnabledForKeyboard, true);
    __privateGet(this, _resizersDiv).firstChild.focus({
      focusVisible: true
    });
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  _resizeWithKeyboard(x2, y2) {
    if (!__privateGet(this, _isResizerEnabledForKeyboard)) {
      return;
    }
    __privateMethod(this, _AnnotationEditor_instances, resizerPointermove_fn).call(this, __privateGet(this, _focusedResizerName), {
      movementX: x2,
      movementY: y2
    });
  }
  _stopResizingWithKeyboard() {
    __privateMethod(this, _AnnotationEditor_instances, stopResizing_fn).call(this);
    this.div.focus();
  }
  select() {
    var _a2, _b;
    this.makeResizable();
    (_a2 = this.div) == null ? void 0 : _a2.classList.add("selectedEditor");
    if (!__privateGet(this, _editToolbar)) {
      this.addEditToolbar().then(() => {
        var _a3, _b2;
        if ((_a3 = this.div) == null ? void 0 : _a3.classList.contains("selectedEditor")) {
          (_b2 = __privateGet(this, _editToolbar)) == null ? void 0 : _b2.show();
        }
      });
      return;
    }
    (_b = __privateGet(this, _editToolbar)) == null ? void 0 : _b.show();
  }
  unselect() {
    var _a2, _b, _c, _d;
    (_a2 = __privateGet(this, _resizersDiv)) == null ? void 0 : _a2.classList.add("hidden");
    (_b = this.div) == null ? void 0 : _b.classList.remove("selectedEditor");
    if ((_c = this.div) == null ? void 0 : _c.contains(document.activeElement)) {
      this._uiManager.currentLayer.div.focus({
        preventScroll: true
      });
    }
    (_d = __privateGet(this, _editToolbar)) == null ? void 0 : _d.hide();
  }
  updateParams(type, value) {
  }
  disableEditing() {
  }
  enableEditing() {
  }
  enterInEditMode() {
  }
  getImageForAltText() {
    return null;
  }
  get contentDiv() {
    return this.div;
  }
  get isEditing() {
    return __privateGet(this, _isEditing);
  }
  set isEditing(value) {
    __privateSet(this, _isEditing, value);
    if (!this.parent) {
      return;
    }
    if (value) {
      this.parent.setSelected(this);
      this.parent.setActiveEditor(this);
    } else {
      this.parent.setActiveEditor(null);
    }
  }
  setAspectRatio(width, height) {
    __privateSet(this, _keepAspectRatio, true);
    const aspectRatio = width / height;
    const {
      style
    } = this.div;
    style.aspectRatio = aspectRatio;
    style.height = "auto";
  }
  static get MIN_SIZE() {
    return 16;
  }
  static canCreateNewEmptyEditor() {
    return true;
  }
  get telemetryInitialData() {
    return {
      action: "added"
    };
  }
  get telemetryFinalData() {
    return null;
  }
  _reportTelemetry(data, mustWait = false) {
    if (mustWait) {
      __privateGet(this, _telemetryTimeouts) || __privateSet(this, _telemetryTimeouts, /* @__PURE__ */ new Map());
      const {
        action
      } = data;
      let timeout = __privateGet(this, _telemetryTimeouts).get(action);
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        this._reportTelemetry(data);
        __privateGet(this, _telemetryTimeouts).delete(action);
        if (__privateGet(this, _telemetryTimeouts).size === 0) {
          __privateSet(this, _telemetryTimeouts, null);
        }
      }, _AnnotationEditor._telemetryTimeout);
      __privateGet(this, _telemetryTimeouts).set(action, timeout);
      return;
    }
    data.type || (data.type = this.editorType);
    this._uiManager._eventBus.dispatch("reporttelemetry", {
      source: this,
      details: {
        type: "editing",
        data
      }
    });
  }
  show(visible = this._isVisible) {
    this.div.classList.toggle("hidden", !visible);
    this._isVisible = visible;
  }
  enable() {
    if (this.div) {
      this.div.tabIndex = 0;
    }
    __privateSet(this, _disabled, false);
  }
  disable() {
    if (this.div) {
      this.div.tabIndex = -1;
    }
    __privateSet(this, _disabled, true);
  }
  renderAnnotationElement(annotation) {
    let content = annotation.container.querySelector(".annotationContent");
    if (!content) {
      content = document.createElement("div");
      content.classList.add("annotationContent", this.editorType);
      annotation.container.prepend(content);
    } else if (content.nodeName === "CANVAS") {
      const canvas = content;
      content = document.createElement("div");
      content.classList.add("annotationContent", this.editorType);
      canvas.before(content);
    }
    return content;
  }
  resetAnnotationElement(annotation) {
    const {
      firstChild
    } = annotation.container;
    if (firstChild.nodeName === "DIV" && firstChild.classList.contains("annotationContent")) {
      firstChild.remove();
    }
  }
};
_allResizerDivs = new WeakMap();
_altText2 = new WeakMap();
_disabled = new WeakMap();
_keepAspectRatio = new WeakMap();
_resizersDiv = new WeakMap();
_savedDimensions = new WeakMap();
_boundFocusin = new WeakMap();
_boundFocusout = new WeakMap();
_editToolbar = new WeakMap();
_focusedResizerName = new WeakMap();
_hasBeenClicked = new WeakMap();
_initialPosition = new WeakMap();
_isEditing = new WeakMap();
_isInEditMode = new WeakMap();
_isResizerEnabledForKeyboard = new WeakMap();
_moveInDOMTimeout = new WeakMap();
_prevDragX = new WeakMap();
_prevDragY = new WeakMap();
_telemetryTimeouts = new WeakMap();
_isDraggable = new WeakMap();
_zIndex = new WeakMap();
_AnnotationEditor_instances = new WeakSet();
translate_fn = function([width, height], x2, y2) {
  [x2, y2] = this.screenToPageTranslation(x2, y2);
  this.x += x2 / width;
  this.y += y2 / height;
  this.fixAndSetPosition();
};
_AnnotationEditor_static = new WeakSet();
rotatePoint_fn = function(x2, y2, angle) {
  switch (angle) {
    case 90:
      return [y2, -x2];
    case 180:
      return [-x2, -y2];
    case 270:
      return [-y2, x2];
    default:
      return [x2, y2];
  }
};
getRotationMatrix_fn = function(rotation) {
  switch (rotation) {
    case 90: {
      const [pageWidth, pageHeight] = this.pageDimensions;
      return [0, -pageWidth / pageHeight, pageHeight / pageWidth, 0];
    }
    case 180:
      return [-1, 0, 0, -1];
    case 270: {
      const [pageWidth, pageHeight] = this.pageDimensions;
      return [0, pageWidth / pageHeight, -pageHeight / pageWidth, 0];
    }
    default:
      return [1, 0, 0, 1];
  }
};
createResizers_fn = function() {
  if (__privateGet(this, _resizersDiv)) {
    return;
  }
  __privateSet(this, _resizersDiv, document.createElement("div"));
  __privateGet(this, _resizersDiv).classList.add("resizers");
  const classes = this._willKeepAspectRatio ? ["topLeft", "topRight", "bottomRight", "bottomLeft"] : ["topLeft", "topMiddle", "topRight", "middleRight", "bottomRight", "bottomMiddle", "bottomLeft", "middleLeft"];
  for (const name of classes) {
    const div = document.createElement("div");
    __privateGet(this, _resizersDiv).append(div);
    div.classList.add("resizer", name);
    div.setAttribute("data-resizer-name", name);
    div.addEventListener("pointerdown", __privateMethod(this, _AnnotationEditor_instances, resizerPointerdown_fn).bind(this, name));
    div.addEventListener("contextmenu", noContextMenu);
    div.tabIndex = -1;
  }
  this.div.prepend(__privateGet(this, _resizersDiv));
};
resizerPointerdown_fn = function(name, event) {
  var _a2;
  event.preventDefault();
  const {
    isMac
  } = util_FeatureTest.platform;
  if (event.button !== 0 || event.ctrlKey && isMac) {
    return;
  }
  (_a2 = __privateGet(this, _altText2)) == null ? void 0 : _a2.toggle(false);
  const boundResizerPointermove = __privateMethod(this, _AnnotationEditor_instances, resizerPointermove_fn).bind(this, name);
  const savedDraggable = this._isDraggable;
  this._isDraggable = false;
  const pointerMoveOptions = {
    passive: true,
    capture: true
  };
  this.parent.togglePointerEvents(false);
  window.addEventListener("pointermove", boundResizerPointermove, pointerMoveOptions);
  window.addEventListener("contextmenu", noContextMenu);
  const savedX = this.x;
  const savedY = this.y;
  const savedWidth = this.width;
  const savedHeight = this.height;
  const savedParentCursor = this.parent.div.style.cursor;
  const savedCursor = this.div.style.cursor;
  this.div.style.cursor = this.parent.div.style.cursor = window.getComputedStyle(event.target).cursor;
  const pointerUpCallback = () => {
    var _a3;
    this.parent.togglePointerEvents(true);
    (_a3 = __privateGet(this, _altText2)) == null ? void 0 : _a3.toggle(true);
    this._isDraggable = savedDraggable;
    window.removeEventListener("pointerup", pointerUpCallback);
    window.removeEventListener("blur", pointerUpCallback);
    window.removeEventListener("pointermove", boundResizerPointermove, pointerMoveOptions);
    window.removeEventListener("contextmenu", noContextMenu);
    this.parent.div.style.cursor = savedParentCursor;
    this.div.style.cursor = savedCursor;
    __privateMethod(this, _AnnotationEditor_instances, addResizeToUndoStack_fn).call(this, savedX, savedY, savedWidth, savedHeight);
  };
  window.addEventListener("pointerup", pointerUpCallback);
  window.addEventListener("blur", pointerUpCallback);
};
addResizeToUndoStack_fn = function(savedX, savedY, savedWidth, savedHeight) {
  const newX = this.x;
  const newY = this.y;
  const newWidth = this.width;
  const newHeight = this.height;
  if (newX === savedX && newY === savedY && newWidth === savedWidth && newHeight === savedHeight) {
    return;
  }
  this.addCommands({
    cmd: () => {
      this.width = newWidth;
      this.height = newHeight;
      this.x = newX;
      this.y = newY;
      const [parentWidth, parentHeight] = this.parentDimensions;
      this.setDims(parentWidth * newWidth, parentHeight * newHeight);
      this.fixAndSetPosition();
    },
    undo: () => {
      this.width = savedWidth;
      this.height = savedHeight;
      this.x = savedX;
      this.y = savedY;
      const [parentWidth, parentHeight] = this.parentDimensions;
      this.setDims(parentWidth * savedWidth, parentHeight * savedHeight);
      this.fixAndSetPosition();
    },
    mustExec: true
  });
};
resizerPointermove_fn = function(name, event) {
  const [parentWidth, parentHeight] = this.parentDimensions;
  const savedX = this.x;
  const savedY = this.y;
  const savedWidth = this.width;
  const savedHeight = this.height;
  const minWidth = _AnnotationEditor.MIN_SIZE / parentWidth;
  const minHeight = _AnnotationEditor.MIN_SIZE / parentHeight;
  const round = (x2) => Math.round(x2 * 1e4) / 1e4;
  const rotationMatrix = __privateMethod(this, _AnnotationEditor_instances, getRotationMatrix_fn).call(this, this.rotation);
  const transf = (x2, y2) => [rotationMatrix[0] * x2 + rotationMatrix[2] * y2, rotationMatrix[1] * x2 + rotationMatrix[3] * y2];
  const invRotationMatrix = __privateMethod(this, _AnnotationEditor_instances, getRotationMatrix_fn).call(this, 360 - this.rotation);
  const invTransf = (x2, y2) => [invRotationMatrix[0] * x2 + invRotationMatrix[2] * y2, invRotationMatrix[1] * x2 + invRotationMatrix[3] * y2];
  let getPoint;
  let getOpposite;
  let isDiagonal = false;
  let isHorizontal = false;
  switch (name) {
    case "topLeft":
      isDiagonal = true;
      getPoint = (w2, h) => [0, 0];
      getOpposite = (w2, h) => [w2, h];
      break;
    case "topMiddle":
      getPoint = (w2, h) => [w2 / 2, 0];
      getOpposite = (w2, h) => [w2 / 2, h];
      break;
    case "topRight":
      isDiagonal = true;
      getPoint = (w2, h) => [w2, 0];
      getOpposite = (w2, h) => [0, h];
      break;
    case "middleRight":
      isHorizontal = true;
      getPoint = (w2, h) => [w2, h / 2];
      getOpposite = (w2, h) => [0, h / 2];
      break;
    case "bottomRight":
      isDiagonal = true;
      getPoint = (w2, h) => [w2, h];
      getOpposite = (w2, h) => [0, 0];
      break;
    case "bottomMiddle":
      getPoint = (w2, h) => [w2 / 2, h];
      getOpposite = (w2, h) => [w2 / 2, 0];
      break;
    case "bottomLeft":
      isDiagonal = true;
      getPoint = (w2, h) => [0, h];
      getOpposite = (w2, h) => [w2, 0];
      break;
    case "middleLeft":
      isHorizontal = true;
      getPoint = (w2, h) => [0, h / 2];
      getOpposite = (w2, h) => [w2, h / 2];
      break;
  }
  const point = getPoint(savedWidth, savedHeight);
  const oppositePoint = getOpposite(savedWidth, savedHeight);
  let transfOppositePoint = transf(...oppositePoint);
  const oppositeX = round(savedX + transfOppositePoint[0]);
  const oppositeY = round(savedY + transfOppositePoint[1]);
  let ratioX = 1;
  let ratioY = 1;
  let [deltaX, deltaY] = this.screenToPageTranslation(event.movementX, event.movementY);
  [deltaX, deltaY] = invTransf(deltaX / parentWidth, deltaY / parentHeight);
  if (isDiagonal) {
    const oldDiag = Math.hypot(savedWidth, savedHeight);
    ratioX = ratioY = Math.max(Math.min(Math.hypot(oppositePoint[0] - point[0] - deltaX, oppositePoint[1] - point[1] - deltaY) / oldDiag, 1 / savedWidth, 1 / savedHeight), minWidth / savedWidth, minHeight / savedHeight);
  } else if (isHorizontal) {
    ratioX = Math.max(minWidth, Math.min(1, Math.abs(oppositePoint[0] - point[0] - deltaX))) / savedWidth;
  } else {
    ratioY = Math.max(minHeight, Math.min(1, Math.abs(oppositePoint[1] - point[1] - deltaY))) / savedHeight;
  }
  const newWidth = round(savedWidth * ratioX);
  const newHeight = round(savedHeight * ratioY);
  transfOppositePoint = transf(...getOpposite(newWidth, newHeight));
  const newX = oppositeX - transfOppositePoint[0];
  const newY = oppositeY - transfOppositePoint[1];
  this.width = newWidth;
  this.height = newHeight;
  this.x = newX;
  this.y = newY;
  this.setDims(parentWidth * newWidth, parentHeight * newHeight);
  this.fixAndSetPosition();
};
selectOnPointerEvent_fn = function(event) {
  const {
    isMac
  } = util_FeatureTest.platform;
  if (event.ctrlKey && !isMac || event.shiftKey || event.metaKey && isMac) {
    this.parent.toggleSelected(this);
  } else {
    this.parent.setSelected(this);
  }
};
setUpDragSession_fn = function(event) {
  const isSelected = this._uiManager.isSelected(this);
  this._uiManager.setUpDragSession();
  let pointerMoveOptions, pointerMoveCallback;
  if (isSelected) {
    this.div.classList.add("moving");
    pointerMoveOptions = {
      passive: true,
      capture: true
    };
    __privateSet(this, _prevDragX, event.clientX);
    __privateSet(this, _prevDragY, event.clientY);
    pointerMoveCallback = (e2) => {
      const {
        clientX: x2,
        clientY: y2
      } = e2;
      const [tx, ty] = this.screenToPageTranslation(x2 - __privateGet(this, _prevDragX), y2 - __privateGet(this, _prevDragY));
      __privateSet(this, _prevDragX, x2);
      __privateSet(this, _prevDragY, y2);
      this._uiManager.dragSelectedEditors(tx, ty);
    };
    window.addEventListener("pointermove", pointerMoveCallback, pointerMoveOptions);
  }
  const pointerUpCallback = () => {
    window.removeEventListener("pointerup", pointerUpCallback);
    window.removeEventListener("blur", pointerUpCallback);
    if (isSelected) {
      this.div.classList.remove("moving");
      window.removeEventListener("pointermove", pointerMoveCallback, pointerMoveOptions);
    }
    __privateSet(this, _hasBeenClicked, false);
    if (!this._uiManager.endDragSession()) {
      __privateMethod(this, _AnnotationEditor_instances, selectOnPointerEvent_fn).call(this, event);
    }
  };
  window.addEventListener("pointerup", pointerUpCallback);
  window.addEventListener("blur", pointerUpCallback);
};
resizerKeydown_fn = function(event) {
  _AnnotationEditor._resizerKeyboardManager.exec(this, event);
};
resizerBlur_fn = function(event) {
  var _a2;
  if (__privateGet(this, _isResizerEnabledForKeyboard) && ((_a2 = event.relatedTarget) == null ? void 0 : _a2.parentNode) !== __privateGet(this, _resizersDiv)) {
    __privateMethod(this, _AnnotationEditor_instances, stopResizing_fn).call(this);
  }
};
resizerFocus_fn = function(name) {
  __privateSet(this, _focusedResizerName, __privateGet(this, _isResizerEnabledForKeyboard) ? name : "");
};
setResizerTabIndex_fn = function(value) {
  if (!__privateGet(this, _allResizerDivs)) {
    return;
  }
  for (const div of __privateGet(this, _allResizerDivs)) {
    div.tabIndex = value;
  }
};
stopResizing_fn = function() {
  __privateSet(this, _isResizerEnabledForKeyboard, false);
  __privateMethod(this, _AnnotationEditor_instances, setResizerTabIndex_fn).call(this, -1);
  if (__privateGet(this, _savedDimensions)) {
    const {
      savedX,
      savedY,
      savedWidth,
      savedHeight
    } = __privateGet(this, _savedDimensions);
    __privateMethod(this, _AnnotationEditor_instances, addResizeToUndoStack_fn).call(this, savedX, savedY, savedWidth, savedHeight);
    __privateSet(this, _savedDimensions, null);
  }
};
__privateAdd(_AnnotationEditor, _AnnotationEditor_static);
__publicField(_AnnotationEditor, "_borderLineWidth", -1);
__publicField(_AnnotationEditor, "_colorManager", new ColorManager());
__publicField(_AnnotationEditor, "_zIndex", 1);
__publicField(_AnnotationEditor, "_telemetryTimeout", 1e3);
var AnnotationEditor = _AnnotationEditor;
var FakeEditor = class extends AnnotationEditor {
  constructor(params) {
    super(params);
    this.annotationElementId = params.annotationElementId;
    this.deleted = true;
  }
  serialize() {
    return {
      id: this.annotationElementId,
      deleted: true,
      pageIndex: this.pageIndex
    };
  }
};
var SEED = 3285377520;
var MASK_HIGH = 4294901760;
var MASK_LOW = 65535;
var MurmurHash3_64 = class {
  constructor(seed) {
    this.h1 = seed ? seed & 4294967295 : SEED;
    this.h2 = seed ? seed & 4294967295 : SEED;
  }
  update(input) {
    let data, length;
    if (typeof input === "string") {
      data = new Uint8Array(input.length * 2);
      length = 0;
      for (let i2 = 0, ii = input.length; i2 < ii; i2++) {
        const code = input.charCodeAt(i2);
        if (code <= 255) {
          data[length++] = code;
        } else {
          data[length++] = code >>> 8;
          data[length++] = code & 255;
        }
      }
    } else if (ArrayBuffer.isView(input)) {
      data = input.slice();
      length = data.byteLength;
    } else {
      throw new Error("Invalid data format, must be a string or TypedArray.");
    }
    const blockCounts = length >> 2;
    const tailLength = length - blockCounts * 4;
    const dataUint32 = new Uint32Array(data.buffer, 0, blockCounts);
    let k1 = 0, k2 = 0;
    let h1 = this.h1, h2 = this.h2;
    const C1 = 3432918353, C2 = 461845907;
    const C1_LOW = C1 & MASK_LOW, C2_LOW = C2 & MASK_LOW;
    for (let i2 = 0; i2 < blockCounts; i2++) {
      if (i2 & 1) {
        k1 = dataUint32[i2];
        k1 = k1 * C1 & MASK_HIGH | k1 * C1_LOW & MASK_LOW;
        k1 = k1 << 15 | k1 >>> 17;
        k1 = k1 * C2 & MASK_HIGH | k1 * C2_LOW & MASK_LOW;
        h1 ^= k1;
        h1 = h1 << 13 | h1 >>> 19;
        h1 = h1 * 5 + 3864292196;
      } else {
        k2 = dataUint32[i2];
        k2 = k2 * C1 & MASK_HIGH | k2 * C1_LOW & MASK_LOW;
        k2 = k2 << 15 | k2 >>> 17;
        k2 = k2 * C2 & MASK_HIGH | k2 * C2_LOW & MASK_LOW;
        h2 ^= k2;
        h2 = h2 << 13 | h2 >>> 19;
        h2 = h2 * 5 + 3864292196;
      }
    }
    k1 = 0;
    switch (tailLength) {
      case 3:
        k1 ^= data[blockCounts * 4 + 2] << 16;
      case 2:
        k1 ^= data[blockCounts * 4 + 1] << 8;
      case 1:
        k1 ^= data[blockCounts * 4];
        k1 = k1 * C1 & MASK_HIGH | k1 * C1_LOW & MASK_LOW;
        k1 = k1 << 15 | k1 >>> 17;
        k1 = k1 * C2 & MASK_HIGH | k1 * C2_LOW & MASK_LOW;
        if (blockCounts & 1) {
          h1 ^= k1;
        } else {
          h2 ^= k1;
        }
    }
    this.h1 = h1;
    this.h2 = h2;
  }
  hexdigest() {
    let h1 = this.h1, h2 = this.h2;
    h1 ^= h2 >>> 1;
    h1 = h1 * 3981806797 & MASK_HIGH | h1 * 36045 & MASK_LOW;
    h2 = h2 * 4283543511 & MASK_HIGH | ((h2 << 16 | h1 >>> 16) * 2950163797 & MASK_HIGH) >>> 16;
    h1 ^= h2 >>> 1;
    h1 = h1 * 444984403 & MASK_HIGH | h1 * 60499 & MASK_LOW;
    h2 = h2 * 3301882366 & MASK_HIGH | ((h2 << 16 | h1 >>> 16) * 3120437893 & MASK_HIGH) >>> 16;
    h1 ^= h2 >>> 1;
    return (h1 >>> 0).toString(16).padStart(8, "0") + (h2 >>> 0).toString(16).padStart(8, "0");
  }
};
var SerializableEmpty = Object.freeze({
  map: null,
  hash: "",
  transfer: void 0
});
var _modified, _storage, _AnnotationStorage_instances, setModified_fn;
var AnnotationStorage = class {
  constructor() {
    __privateAdd(this, _AnnotationStorage_instances);
    __privateAdd(this, _modified, false);
    __privateAdd(this, _storage, /* @__PURE__ */ new Map());
    this.onSetModified = null;
    this.onResetModified = null;
    this.onAnnotationEditor = null;
  }
  getValue(key, defaultValue) {
    const value = __privateGet(this, _storage).get(key);
    if (value === void 0) {
      return defaultValue;
    }
    return Object.assign(defaultValue, value);
  }
  getRawValue(key) {
    return __privateGet(this, _storage).get(key);
  }
  remove(key) {
    __privateGet(this, _storage).delete(key);
    if (__privateGet(this, _storage).size === 0) {
      this.resetModified();
    }
    if (typeof this.onAnnotationEditor === "function") {
      for (const value of __privateGet(this, _storage).values()) {
        if (value instanceof AnnotationEditor) {
          return;
        }
      }
      this.onAnnotationEditor(null);
    }
  }
  setValue(key, value) {
    const obj = __privateGet(this, _storage).get(key);
    let modified = false;
    if (obj !== void 0) {
      for (const [entry, val] of Object.entries(value)) {
        if (obj[entry] !== val) {
          modified = true;
          obj[entry] = val;
        }
      }
    } else {
      modified = true;
      __privateGet(this, _storage).set(key, value);
    }
    if (modified) {
      __privateMethod(this, _AnnotationStorage_instances, setModified_fn).call(this);
    }
    if (value instanceof AnnotationEditor && typeof this.onAnnotationEditor === "function") {
      this.onAnnotationEditor(value.constructor._type);
    }
  }
  has(key) {
    return __privateGet(this, _storage).has(key);
  }
  getAll() {
    return __privateGet(this, _storage).size > 0 ? objectFromMap(__privateGet(this, _storage)) : null;
  }
  setAll(obj) {
    for (const [key, val] of Object.entries(obj)) {
      this.setValue(key, val);
    }
  }
  get size() {
    return __privateGet(this, _storage).size;
  }
  resetModified() {
    if (__privateGet(this, _modified)) {
      __privateSet(this, _modified, false);
      if (typeof this.onResetModified === "function") {
        this.onResetModified();
      }
    }
  }
  get print() {
    return new PrintAnnotationStorage(this);
  }
  get serializable() {
    if (__privateGet(this, _storage).size === 0) {
      return SerializableEmpty;
    }
    const map = /* @__PURE__ */ new Map(), hash = new MurmurHash3_64(), transfer = [];
    const context = /* @__PURE__ */ Object.create(null);
    let hasBitmap = false;
    for (const [key, val] of __privateGet(this, _storage)) {
      const serialized = val instanceof AnnotationEditor ? val.serialize(false, context) : val;
      if (serialized) {
        map.set(key, serialized);
        hash.update(`${key}:${JSON.stringify(serialized)}`);
        hasBitmap || (hasBitmap = !!serialized.bitmap);
      }
    }
    if (hasBitmap) {
      for (const value of map.values()) {
        if (value.bitmap) {
          transfer.push(value.bitmap);
        }
      }
    }
    return map.size > 0 ? {
      map,
      hash: hash.hexdigest(),
      transfer
    } : SerializableEmpty;
  }
  get editorStats() {
    let stats = null;
    const typeToEditor = /* @__PURE__ */ new Map();
    for (const value of __privateGet(this, _storage).values()) {
      if (!(value instanceof AnnotationEditor)) {
        continue;
      }
      const editorStats = value.telemetryFinalData;
      if (!editorStats) {
        continue;
      }
      const {
        type
      } = editorStats;
      if (!typeToEditor.has(type)) {
        typeToEditor.set(type, Object.getPrototypeOf(value).constructor);
      }
      stats || (stats = /* @__PURE__ */ Object.create(null));
      const map = stats[type] || (stats[type] = /* @__PURE__ */ new Map());
      for (const [key, val] of Object.entries(editorStats)) {
        if (key === "type") {
          continue;
        }
        let counters = map.get(key);
        if (!counters) {
          counters = /* @__PURE__ */ new Map();
          map.set(key, counters);
        }
        const count = counters.get(val) ?? 0;
        counters.set(val, count + 1);
      }
    }
    for (const [type, editor] of typeToEditor) {
      stats[type] = editor.computeTelemetryFinalData(stats[type]);
    }
    return stats;
  }
};
_modified = new WeakMap();
_storage = new WeakMap();
_AnnotationStorage_instances = new WeakSet();
setModified_fn = function() {
  if (!__privateGet(this, _modified)) {
    __privateSet(this, _modified, true);
    if (typeof this.onSetModified === "function") {
      this.onSetModified();
    }
  }
};
var _serializable;
var PrintAnnotationStorage = class extends AnnotationStorage {
  constructor(parent) {
    super();
    __privateAdd(this, _serializable);
    const {
      map,
      hash,
      transfer
    } = parent.serializable;
    const clone = structuredClone(map, transfer ? {
      transfer
    } : null);
    __privateSet(this, _serializable, {
      map: clone,
      hash,
      transfer
    });
  }
  get print() {
    unreachable("Should not call PrintAnnotationStorage.print");
  }
  get serializable() {
    return __privateGet(this, _serializable);
  }
};
_serializable = new WeakMap();
var _systemFonts;
var FontLoader = class {
  constructor({
    ownerDocument = globalThis.document,
    styleElement = null
  }) {
    __privateAdd(this, _systemFonts, /* @__PURE__ */ new Set());
    this._document = ownerDocument;
    this.nativeFontFaces = /* @__PURE__ */ new Set();
    this.styleElement = null;
    this.loadingRequests = [];
    this.loadTestFontId = 0;
  }
  addNativeFontFace(nativeFontFace) {
    this.nativeFontFaces.add(nativeFontFace);
    this._document.fonts.add(nativeFontFace);
  }
  removeNativeFontFace(nativeFontFace) {
    this.nativeFontFaces.delete(nativeFontFace);
    this._document.fonts.delete(nativeFontFace);
  }
  insertRule(rule) {
    if (!this.styleElement) {
      this.styleElement = this._document.createElement("style");
      this._document.documentElement.getElementsByTagName("head")[0].append(this.styleElement);
    }
    const styleSheet = this.styleElement.sheet;
    styleSheet.insertRule(rule, styleSheet.cssRules.length);
  }
  clear() {
    for (const nativeFontFace of this.nativeFontFaces) {
      this._document.fonts.delete(nativeFontFace);
    }
    this.nativeFontFaces.clear();
    __privateGet(this, _systemFonts).clear();
    if (this.styleElement) {
      this.styleElement.remove();
      this.styleElement = null;
    }
  }
  async loadSystemFont({
    systemFontInfo: info2,
    _inspectFont
  }) {
    if (!info2 || __privateGet(this, _systemFonts).has(info2.loadedName)) {
      return;
    }
    assert(!this.disableFontFace, "loadSystemFont shouldn't be called when `disableFontFace` is set.");
    if (this.isFontLoadingAPISupported) {
      const {
        loadedName,
        src,
        style
      } = info2;
      const fontFace = new FontFace(loadedName, src, style);
      this.addNativeFontFace(fontFace);
      try {
        await fontFace.load();
        __privateGet(this, _systemFonts).add(loadedName);
        _inspectFont == null ? void 0 : _inspectFont(info2);
      } catch {
        warn(`Cannot load system font: ${info2.baseFontName}, installing it could help to improve PDF rendering.`);
        this.removeNativeFontFace(fontFace);
      }
      return;
    }
    unreachable("Not implemented: loadSystemFont without the Font Loading API.");
  }
  async bind(font) {
    if (font.attached || font.missingFile && !font.systemFontInfo) {
      return;
    }
    font.attached = true;
    if (font.systemFontInfo) {
      await this.loadSystemFont(font);
      return;
    }
    if (this.isFontLoadingAPISupported) {
      const nativeFontFace = font.createNativeFontFace();
      if (nativeFontFace) {
        this.addNativeFontFace(nativeFontFace);
        try {
          await nativeFontFace.loaded;
        } catch (ex) {
          warn(`Failed to load font '${nativeFontFace.family}': '${ex}'.`);
          font.disableFontFace = true;
          throw ex;
        }
      }
      return;
    }
    const rule = font.createFontFaceRule();
    if (rule) {
      this.insertRule(rule);
      if (this.isSyncFontLoadingSupported) {
        return;
      }
      await new Promise((resolve) => {
        const request = this._queueLoadingCallback(resolve);
        this._prepareFontLoadEvent(font, request);
      });
    }
  }
  get isFontLoadingAPISupported() {
    var _a2;
    const hasFonts = !!((_a2 = this._document) == null ? void 0 : _a2.fonts);
    return shadow(this, "isFontLoadingAPISupported", hasFonts);
  }
  get isSyncFontLoadingSupported() {
    let supported = false;
    if (isNodeJS) {
      supported = true;
    } else if (typeof navigator !== "undefined" && typeof (navigator == null ? void 0 : navigator.userAgent) === "string" && /Mozilla\/5.0.*?rv:\d+.*? Gecko/.test(navigator.userAgent)) {
      supported = true;
    }
    return shadow(this, "isSyncFontLoadingSupported", supported);
  }
  _queueLoadingCallback(callback) {
    function completeRequest() {
      assert(!request.done, "completeRequest() cannot be called twice.");
      request.done = true;
      while (loadingRequests.length > 0 && loadingRequests[0].done) {
        const otherRequest = loadingRequests.shift();
        setTimeout(otherRequest.callback, 0);
      }
    }
    const {
      loadingRequests
    } = this;
    const request = {
      done: false,
      complete: completeRequest,
      callback
    };
    loadingRequests.push(request);
    return request;
  }
  get _loadTestFont() {
    const testFont = atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
    return shadow(this, "_loadTestFont", testFont);
  }
  _prepareFontLoadEvent(font, request) {
    function int32(data2, offset) {
      return data2.charCodeAt(offset) << 24 | data2.charCodeAt(offset + 1) << 16 | data2.charCodeAt(offset + 2) << 8 | data2.charCodeAt(offset + 3) & 255;
    }
    function spliceString(s2, offset, remove, insert) {
      const chunk1 = s2.substring(0, offset);
      const chunk2 = s2.substring(offset + remove);
      return chunk1 + insert + chunk2;
    }
    let i2, ii;
    const canvas = this._document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    let called = 0;
    function isFontReady(name, callback) {
      if (++called > 30) {
        warn("Load test font never loaded.");
        callback();
        return;
      }
      ctx.font = "30px " + name;
      ctx.fillText(".", 0, 20);
      const imageData = ctx.getImageData(0, 0, 1, 1);
      if (imageData.data[3] > 0) {
        callback();
        return;
      }
      setTimeout(isFontReady.bind(null, name, callback));
    }
    const loadTestFontId = `lt${Date.now()}${this.loadTestFontId++}`;
    let data = this._loadTestFont;
    const COMMENT_OFFSET = 976;
    data = spliceString(data, COMMENT_OFFSET, loadTestFontId.length, loadTestFontId);
    const CFF_CHECKSUM_OFFSET = 16;
    const XXXX_VALUE = 1482184792;
    let checksum = int32(data, CFF_CHECKSUM_OFFSET);
    for (i2 = 0, ii = loadTestFontId.length - 3; i2 < ii; i2 += 4) {
      checksum = checksum - XXXX_VALUE + int32(loadTestFontId, i2) | 0;
    }
    if (i2 < loadTestFontId.length) {
      checksum = checksum - XXXX_VALUE + int32(loadTestFontId + "XXX", i2) | 0;
    }
    data = spliceString(data, CFF_CHECKSUM_OFFSET, 4, string32(checksum));
    const url = `url(data:font/opentype;base64,${btoa(data)});`;
    const rule = `@font-face {font-family:"${loadTestFontId}";src:${url}}`;
    this.insertRule(rule);
    const div = this._document.createElement("div");
    div.style.visibility = "hidden";
    div.style.width = div.style.height = "10px";
    div.style.position = "absolute";
    div.style.top = div.style.left = "0px";
    for (const name of [font.loadedName, loadTestFontId]) {
      const span = this._document.createElement("span");
      span.textContent = "Hi";
      span.style.fontFamily = name;
      div.append(span);
    }
    this._document.body.append(div);
    isFontReady(loadTestFontId, () => {
      div.remove();
      request.complete();
    });
  }
};
_systemFonts = new WeakMap();
var FontFaceObject = class {
  constructor(translatedData, {
    disableFontFace = false,
    inspectFont = null
  }) {
    this.compiledGlyphs = /* @__PURE__ */ Object.create(null);
    for (const i2 in translatedData) {
      this[i2] = translatedData[i2];
    }
    this.disableFontFace = disableFontFace === true;
    this._inspectFont = inspectFont;
  }
  createNativeFontFace() {
    var _a2;
    if (!this.data || this.disableFontFace) {
      return null;
    }
    let nativeFontFace;
    if (!this.cssFontInfo) {
      nativeFontFace = new FontFace(this.loadedName, this.data, {});
    } else {
      const css = {
        weight: this.cssFontInfo.fontWeight
      };
      if (this.cssFontInfo.italicAngle) {
        css.style = `oblique ${this.cssFontInfo.italicAngle}deg`;
      }
      nativeFontFace = new FontFace(this.cssFontInfo.fontFamily, this.data, css);
    }
    (_a2 = this._inspectFont) == null ? void 0 : _a2.call(this, this);
    return nativeFontFace;
  }
  createFontFaceRule() {
    var _a2;
    if (!this.data || this.disableFontFace) {
      return null;
    }
    const data = bytesToString(this.data);
    const url = `url(data:${this.mimetype};base64,${btoa(data)});`;
    let rule;
    if (!this.cssFontInfo) {
      rule = `@font-face {font-family:"${this.loadedName}";src:${url}}`;
    } else {
      let css = `font-weight: ${this.cssFontInfo.fontWeight};`;
      if (this.cssFontInfo.italicAngle) {
        css += `font-style: oblique ${this.cssFontInfo.italicAngle}deg;`;
      }
      rule = `@font-face {font-family:"${this.cssFontInfo.fontFamily}";${css}src:${url}}`;
    }
    (_a2 = this._inspectFont) == null ? void 0 : _a2.call(this, this, url);
    return rule;
  }
  getPathGenerator(objs, character) {
    if (this.compiledGlyphs[character] !== void 0) {
      return this.compiledGlyphs[character];
    }
    let cmds;
    try {
      cmds = objs.get(this.loadedName + "_path_" + character);
    } catch (ex) {
      warn(`getPathGenerator - ignoring character: "${ex}".`);
    }
    if (!Array.isArray(cmds) || cmds.length === 0) {
      return this.compiledGlyphs[character] = function(c2, size) {
      };
    }
    const commands = [];
    for (let i2 = 0, ii = cmds.length; i2 < ii; ) {
      switch (cmds[i2++]) {
        case FontRenderOps.BEZIER_CURVE_TO:
          {
            const [a2, b2, c2, d2, e2, f] = cmds.slice(i2, i2 + 6);
            commands.push((ctx) => ctx.bezierCurveTo(a2, b2, c2, d2, e2, f));
            i2 += 6;
          }
          break;
        case FontRenderOps.MOVE_TO:
          {
            const [a2, b2] = cmds.slice(i2, i2 + 2);
            commands.push((ctx) => ctx.moveTo(a2, b2));
            i2 += 2;
          }
          break;
        case FontRenderOps.LINE_TO:
          {
            const [a2, b2] = cmds.slice(i2, i2 + 2);
            commands.push((ctx) => ctx.lineTo(a2, b2));
            i2 += 2;
          }
          break;
        case FontRenderOps.QUADRATIC_CURVE_TO:
          {
            const [a2, b2, c2, d2] = cmds.slice(i2, i2 + 4);
            commands.push((ctx) => ctx.quadraticCurveTo(a2, b2, c2, d2));
            i2 += 4;
          }
          break;
        case FontRenderOps.RESTORE:
          commands.push((ctx) => ctx.restore());
          break;
        case FontRenderOps.SAVE:
          commands.push((ctx) => ctx.save());
          break;
        case FontRenderOps.SCALE:
          assert(commands.length === 2, "Scale command is only valid at the third position.");
          break;
        case FontRenderOps.TRANSFORM:
          {
            const [a2, b2, c2, d2, e2, f] = cmds.slice(i2, i2 + 6);
            commands.push((ctx) => ctx.transform(a2, b2, c2, d2, e2, f));
            i2 += 6;
          }
          break;
        case FontRenderOps.TRANSLATE:
          {
            const [a2, b2] = cmds.slice(i2, i2 + 2);
            commands.push((ctx) => ctx.translate(a2, b2));
            i2 += 2;
          }
          break;
      }
    }
    return this.compiledGlyphs[character] = function glyphDrawer(ctx, size) {
      commands[0](ctx);
      commands[1](ctx);
      ctx.scale(size, -size);
      for (let i2 = 2, ii = commands.length; i2 < ii; i2++) {
        commands[i2](ctx);
      }
    };
  }
};
if (isNodeJS) {
  packageCapability = Promise.withResolvers();
  packageMap = null;
  const loadPackages = async () => {
    const fs = await import(
      /*webpackIgnore: true*/
      "./fs-DWFS4JPU.js"
    ), http = await import(
      /*webpackIgnore: true*/
      "./http-BS37DNE4.js"
    ), https = await import(
      /*webpackIgnore: true*/
      "./https-V6I6WUTD.js"
    ), url = await import(
      /*webpackIgnore: true*/
      "./url-D7NJLSYG.js"
    );
    let canvas, path2d;
    return new Map(Object.entries({
      fs,
      http,
      https,
      url,
      canvas,
      path2d
    }));
  };
  loadPackages().then((map) => {
    packageMap = map;
    packageCapability.resolve();
  }, (reason) => {
    warn(`loadPackages: ${reason}`);
    packageMap = /* @__PURE__ */ new Map();
    packageCapability.resolve();
  });
}
var packageCapability;
var packageMap;
var NodePackages = class {
  static get promise() {
    return packageCapability.promise;
  }
  static get(name) {
    return packageMap == null ? void 0 : packageMap.get(name);
  }
};
var node_utils_fetchData = function(url) {
  const fs = NodePackages.get("fs");
  return fs.promises.readFile(url).then((data) => new Uint8Array(data));
};
var NodeFilterFactory = class extends BaseFilterFactory {
};
var NodeCanvasFactory = class extends BaseCanvasFactory {
  _createCanvas(width, height) {
    const canvas = NodePackages.get("canvas");
    return canvas.createCanvas(width, height);
  }
};
var NodeCMapReaderFactory = class extends BaseCMapReaderFactory {
  _fetchData(url, compressionType) {
    return node_utils_fetchData(url).then((data) => ({
      cMapData: data,
      compressionType
    }));
  }
};
var NodeStandardFontDataFactory = class extends BaseStandardFontDataFactory {
  _fetchData(url) {
    return node_utils_fetchData(url);
  }
};
var PathType = {
  FILL: "Fill",
  STROKE: "Stroke",
  SHADING: "Shading"
};
function applyBoundingBox(ctx, bbox) {
  if (!bbox) {
    return;
  }
  const width = bbox[2] - bbox[0];
  const height = bbox[3] - bbox[1];
  const region = new Path2D();
  region.rect(bbox[0], bbox[1], width, height);
  ctx.clip(region);
}
var BaseShadingPattern = class _BaseShadingPattern {
  constructor() {
    if (this.constructor === _BaseShadingPattern) {
      unreachable("Cannot initialize BaseShadingPattern.");
    }
  }
  getPattern() {
    unreachable("Abstract method `getPattern` called.");
  }
};
var RadialAxialShadingPattern = class extends BaseShadingPattern {
  constructor(IR) {
    super();
    this._type = IR[1];
    this._bbox = IR[2];
    this._colorStops = IR[3];
    this._p0 = IR[4];
    this._p1 = IR[5];
    this._r0 = IR[6];
    this._r1 = IR[7];
    this.matrix = null;
  }
  _createGradient(ctx) {
    let grad;
    if (this._type === "axial") {
      grad = ctx.createLinearGradient(this._p0[0], this._p0[1], this._p1[0], this._p1[1]);
    } else if (this._type === "radial") {
      grad = ctx.createRadialGradient(this._p0[0], this._p0[1], this._r0, this._p1[0], this._p1[1], this._r1);
    }
    for (const colorStop of this._colorStops) {
      grad.addColorStop(colorStop[0], colorStop[1]);
    }
    return grad;
  }
  getPattern(ctx, owner, inverse, pathType) {
    let pattern;
    if (pathType === PathType.STROKE || pathType === PathType.FILL) {
      const ownerBBox = owner.current.getClippedPathBoundingBox(pathType, getCurrentTransform(ctx)) || [0, 0, 0, 0];
      const width = Math.ceil(ownerBBox[2] - ownerBBox[0]) || 1;
      const height = Math.ceil(ownerBBox[3] - ownerBBox[1]) || 1;
      const tmpCanvas = owner.cachedCanvases.getCanvas("pattern", width, height, true);
      const tmpCtx = tmpCanvas.context;
      tmpCtx.clearRect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
      tmpCtx.beginPath();
      tmpCtx.rect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
      tmpCtx.translate(-ownerBBox[0], -ownerBBox[1]);
      inverse = Util.transform(inverse, [1, 0, 0, 1, ownerBBox[0], ownerBBox[1]]);
      tmpCtx.transform(...owner.baseTransform);
      if (this.matrix) {
        tmpCtx.transform(...this.matrix);
      }
      applyBoundingBox(tmpCtx, this._bbox);
      tmpCtx.fillStyle = this._createGradient(tmpCtx);
      tmpCtx.fill();
      pattern = ctx.createPattern(tmpCanvas.canvas, "no-repeat");
      const domMatrix = new DOMMatrix(inverse);
      pattern.setTransform(domMatrix);
    } else {
      applyBoundingBox(ctx, this._bbox);
      pattern = this._createGradient(ctx);
    }
    return pattern;
  }
};
function drawTriangle(data, context, p1, p2, p3, c1, c2, c3) {
  const coords = context.coords, colors = context.colors;
  const bytes = data.data, rowSize = data.width * 4;
  let tmp;
  if (coords[p1 + 1] > coords[p2 + 1]) {
    tmp = p1;
    p1 = p2;
    p2 = tmp;
    tmp = c1;
    c1 = c2;
    c2 = tmp;
  }
  if (coords[p2 + 1] > coords[p3 + 1]) {
    tmp = p2;
    p2 = p3;
    p3 = tmp;
    tmp = c2;
    c2 = c3;
    c3 = tmp;
  }
  if (coords[p1 + 1] > coords[p2 + 1]) {
    tmp = p1;
    p1 = p2;
    p2 = tmp;
    tmp = c1;
    c1 = c2;
    c2 = tmp;
  }
  const x1 = (coords[p1] + context.offsetX) * context.scaleX;
  const y1 = (coords[p1 + 1] + context.offsetY) * context.scaleY;
  const x2 = (coords[p2] + context.offsetX) * context.scaleX;
  const y2 = (coords[p2 + 1] + context.offsetY) * context.scaleY;
  const x3 = (coords[p3] + context.offsetX) * context.scaleX;
  const y3 = (coords[p3 + 1] + context.offsetY) * context.scaleY;
  if (y1 >= y3) {
    return;
  }
  const c1r = colors[c1], c1g = colors[c1 + 1], c1b = colors[c1 + 2];
  const c2r = colors[c2], c2g = colors[c2 + 1], c2b = colors[c2 + 2];
  const c3r = colors[c3], c3g = colors[c3 + 1], c3b = colors[c3 + 2];
  const minY = Math.round(y1), maxY = Math.round(y3);
  let xa, car, cag, cab;
  let xb, cbr, cbg, cbb;
  for (let y4 = minY; y4 <= maxY; y4++) {
    if (y4 < y2) {
      const k3 = y4 < y1 ? 0 : (y1 - y4) / (y1 - y2);
      xa = x1 - (x1 - x2) * k3;
      car = c1r - (c1r - c2r) * k3;
      cag = c1g - (c1g - c2g) * k3;
      cab = c1b - (c1b - c2b) * k3;
    } else {
      let k3;
      if (y4 > y3) {
        k3 = 1;
      } else if (y2 === y3) {
        k3 = 0;
      } else {
        k3 = (y2 - y4) / (y2 - y3);
      }
      xa = x2 - (x2 - x3) * k3;
      car = c2r - (c2r - c3r) * k3;
      cag = c2g - (c2g - c3g) * k3;
      cab = c2b - (c2b - c3b) * k3;
    }
    let k2;
    if (y4 < y1) {
      k2 = 0;
    } else if (y4 > y3) {
      k2 = 1;
    } else {
      k2 = (y1 - y4) / (y1 - y3);
    }
    xb = x1 - (x1 - x3) * k2;
    cbr = c1r - (c1r - c3r) * k2;
    cbg = c1g - (c1g - c3g) * k2;
    cbb = c1b - (c1b - c3b) * k2;
    const x1_ = Math.round(Math.min(xa, xb));
    const x2_ = Math.round(Math.max(xa, xb));
    let j2 = rowSize * y4 + x1_ * 4;
    for (let x4 = x1_; x4 <= x2_; x4++) {
      k2 = (xa - x4) / (xa - xb);
      if (k2 < 0) {
        k2 = 0;
      } else if (k2 > 1) {
        k2 = 1;
      }
      bytes[j2++] = car - (car - cbr) * k2 | 0;
      bytes[j2++] = cag - (cag - cbg) * k2 | 0;
      bytes[j2++] = cab - (cab - cbb) * k2 | 0;
      bytes[j2++] = 255;
    }
  }
}
function drawFigure(data, figure, context) {
  const ps = figure.coords;
  const cs = figure.colors;
  let i2, ii;
  switch (figure.type) {
    case "lattice":
      const verticesPerRow = figure.verticesPerRow;
      const rows = Math.floor(ps.length / verticesPerRow) - 1;
      const cols = verticesPerRow - 1;
      for (i2 = 0; i2 < rows; i2++) {
        let q2 = i2 * verticesPerRow;
        for (let j2 = 0; j2 < cols; j2++, q2++) {
          drawTriangle(data, context, ps[q2], ps[q2 + 1], ps[q2 + verticesPerRow], cs[q2], cs[q2 + 1], cs[q2 + verticesPerRow]);
          drawTriangle(data, context, ps[q2 + verticesPerRow + 1], ps[q2 + 1], ps[q2 + verticesPerRow], cs[q2 + verticesPerRow + 1], cs[q2 + 1], cs[q2 + verticesPerRow]);
        }
      }
      break;
    case "triangles":
      for (i2 = 0, ii = ps.length; i2 < ii; i2 += 3) {
        drawTriangle(data, context, ps[i2], ps[i2 + 1], ps[i2 + 2], cs[i2], cs[i2 + 1], cs[i2 + 2]);
      }
      break;
    default:
      throw new Error("illegal figure");
  }
}
var MeshShadingPattern = class extends BaseShadingPattern {
  constructor(IR) {
    super();
    this._coords = IR[2];
    this._colors = IR[3];
    this._figures = IR[4];
    this._bounds = IR[5];
    this._bbox = IR[7];
    this._background = IR[8];
    this.matrix = null;
  }
  _createMeshCanvas(combinedScale, backgroundColor, cachedCanvases) {
    const EXPECTED_SCALE = 1.1;
    const MAX_PATTERN_SIZE = 3e3;
    const BORDER_SIZE = 2;
    const offsetX = Math.floor(this._bounds[0]);
    const offsetY = Math.floor(this._bounds[1]);
    const boundsWidth = Math.ceil(this._bounds[2]) - offsetX;
    const boundsHeight = Math.ceil(this._bounds[3]) - offsetY;
    const width = Math.min(Math.ceil(Math.abs(boundsWidth * combinedScale[0] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
    const height = Math.min(Math.ceil(Math.abs(boundsHeight * combinedScale[1] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
    const scaleX = boundsWidth / width;
    const scaleY = boundsHeight / height;
    const context = {
      coords: this._coords,
      colors: this._colors,
      offsetX: -offsetX,
      offsetY: -offsetY,
      scaleX: 1 / scaleX,
      scaleY: 1 / scaleY
    };
    const paddedWidth = width + BORDER_SIZE * 2;
    const paddedHeight = height + BORDER_SIZE * 2;
    const tmpCanvas = cachedCanvases.getCanvas("mesh", paddedWidth, paddedHeight, false);
    const tmpCtx = tmpCanvas.context;
    const data = tmpCtx.createImageData(width, height);
    if (backgroundColor) {
      const bytes = data.data;
      for (let i2 = 0, ii = bytes.length; i2 < ii; i2 += 4) {
        bytes[i2] = backgroundColor[0];
        bytes[i2 + 1] = backgroundColor[1];
        bytes[i2 + 2] = backgroundColor[2];
        bytes[i2 + 3] = 255;
      }
    }
    for (const figure of this._figures) {
      drawFigure(data, figure, context);
    }
    tmpCtx.putImageData(data, BORDER_SIZE, BORDER_SIZE);
    const canvas = tmpCanvas.canvas;
    return {
      canvas,
      offsetX: offsetX - BORDER_SIZE * scaleX,
      offsetY: offsetY - BORDER_SIZE * scaleY,
      scaleX,
      scaleY
    };
  }
  getPattern(ctx, owner, inverse, pathType) {
    applyBoundingBox(ctx, this._bbox);
    let scale;
    if (pathType === PathType.SHADING) {
      scale = Util.singularValueDecompose2dScale(getCurrentTransform(ctx));
    } else {
      scale = Util.singularValueDecompose2dScale(owner.baseTransform);
      if (this.matrix) {
        const matrixScale = Util.singularValueDecompose2dScale(this.matrix);
        scale = [scale[0] * matrixScale[0], scale[1] * matrixScale[1]];
      }
    }
    const temporaryPatternCanvas = this._createMeshCanvas(scale, pathType === PathType.SHADING ? null : this._background, owner.cachedCanvases);
    if (pathType !== PathType.SHADING) {
      ctx.setTransform(...owner.baseTransform);
      if (this.matrix) {
        ctx.transform(...this.matrix);
      }
    }
    ctx.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
    ctx.scale(temporaryPatternCanvas.scaleX, temporaryPatternCanvas.scaleY);
    return ctx.createPattern(temporaryPatternCanvas.canvas, "no-repeat");
  }
};
var DummyShadingPattern = class extends BaseShadingPattern {
  getPattern() {
    return "hotpink";
  }
};
function getShadingPattern(IR) {
  switch (IR[0]) {
    case "RadialAxial":
      return new RadialAxialShadingPattern(IR);
    case "Mesh":
      return new MeshShadingPattern(IR);
    case "Dummy":
      return new DummyShadingPattern();
  }
  throw new Error(`Unknown IR type: ${IR[0]}`);
}
var PaintType = {
  COLORED: 1,
  UNCOLORED: 2
};
var _TilingPattern = class _TilingPattern {
  constructor(IR, color, ctx, canvasGraphicsFactory, baseTransform) {
    this.operatorList = IR[2];
    this.matrix = IR[3];
    this.bbox = IR[4];
    this.xstep = IR[5];
    this.ystep = IR[6];
    this.paintType = IR[7];
    this.tilingType = IR[8];
    this.color = color;
    this.ctx = ctx;
    this.canvasGraphicsFactory = canvasGraphicsFactory;
    this.baseTransform = baseTransform;
  }
  createPatternCanvas(owner) {
    const operatorList = this.operatorList;
    const bbox = this.bbox;
    const xstep = this.xstep;
    const ystep = this.ystep;
    const paintType = this.paintType;
    const tilingType = this.tilingType;
    const color = this.color;
    const canvasGraphicsFactory = this.canvasGraphicsFactory;
    info("TilingType: " + tilingType);
    const x0 = bbox[0], y0 = bbox[1], x1 = bbox[2], y1 = bbox[3];
    const matrixScale = Util.singularValueDecompose2dScale(this.matrix);
    const curMatrixScale = Util.singularValueDecompose2dScale(this.baseTransform);
    const combinedScale = [matrixScale[0] * curMatrixScale[0], matrixScale[1] * curMatrixScale[1]];
    const dimx = this.getSizeAndScale(xstep, this.ctx.canvas.width, combinedScale[0]);
    const dimy = this.getSizeAndScale(ystep, this.ctx.canvas.height, combinedScale[1]);
    const tmpCanvas = owner.cachedCanvases.getCanvas("pattern", dimx.size, dimy.size, true);
    const tmpCtx = tmpCanvas.context;
    const graphics = canvasGraphicsFactory.createCanvasGraphics(tmpCtx);
    graphics.groupLevel = owner.groupLevel;
    this.setFillAndStrokeStyleToContext(graphics, paintType, color);
    let adjustedX0 = x0;
    let adjustedY0 = y0;
    let adjustedX1 = x1;
    let adjustedY1 = y1;
    if (x0 < 0) {
      adjustedX0 = 0;
      adjustedX1 += Math.abs(x0);
    }
    if (y0 < 0) {
      adjustedY0 = 0;
      adjustedY1 += Math.abs(y0);
    }
    tmpCtx.translate(-(dimx.scale * adjustedX0), -(dimy.scale * adjustedY0));
    graphics.transform(dimx.scale, 0, 0, dimy.scale, 0, 0);
    tmpCtx.save();
    this.clipBbox(graphics, adjustedX0, adjustedY0, adjustedX1, adjustedY1);
    graphics.baseTransform = getCurrentTransform(graphics.ctx);
    graphics.executeOperatorList(operatorList);
    graphics.endDrawing();
    return {
      canvas: tmpCanvas.canvas,
      scaleX: dimx.scale,
      scaleY: dimy.scale,
      offsetX: adjustedX0,
      offsetY: adjustedY0
    };
  }
  getSizeAndScale(step, realOutputSize, scale) {
    step = Math.abs(step);
    const maxSize = Math.max(_TilingPattern.MAX_PATTERN_SIZE, realOutputSize);
    let size = Math.ceil(step * scale);
    if (size >= maxSize) {
      size = maxSize;
    } else {
      scale = size / step;
    }
    return {
      scale,
      size
    };
  }
  clipBbox(graphics, x0, y0, x1, y1) {
    const bboxWidth = x1 - x0;
    const bboxHeight = y1 - y0;
    graphics.ctx.rect(x0, y0, bboxWidth, bboxHeight);
    graphics.current.updateRectMinMax(getCurrentTransform(graphics.ctx), [x0, y0, x1, y1]);
    graphics.clip();
    graphics.endPath();
  }
  setFillAndStrokeStyleToContext(graphics, paintType, color) {
    const context = graphics.ctx, current = graphics.current;
    switch (paintType) {
      case PaintType.COLORED:
        const ctx = this.ctx;
        context.fillStyle = ctx.fillStyle;
        context.strokeStyle = ctx.strokeStyle;
        current.fillColor = ctx.fillStyle;
        current.strokeColor = ctx.strokeStyle;
        break;
      case PaintType.UNCOLORED:
        const cssColor = Util.makeHexColor(color[0], color[1], color[2]);
        context.fillStyle = cssColor;
        context.strokeStyle = cssColor;
        current.fillColor = cssColor;
        current.strokeColor = cssColor;
        break;
      default:
        throw new FormatError(`Unsupported paint type: ${paintType}`);
    }
  }
  getPattern(ctx, owner, inverse, pathType) {
    let matrix = inverse;
    if (pathType !== PathType.SHADING) {
      matrix = Util.transform(matrix, owner.baseTransform);
      if (this.matrix) {
        matrix = Util.transform(matrix, this.matrix);
      }
    }
    const temporaryPatternCanvas = this.createPatternCanvas(owner);
    let domMatrix = new DOMMatrix(matrix);
    domMatrix = domMatrix.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
    domMatrix = domMatrix.scale(1 / temporaryPatternCanvas.scaleX, 1 / temporaryPatternCanvas.scaleY);
    const pattern = ctx.createPattern(temporaryPatternCanvas.canvas, "repeat");
    pattern.setTransform(domMatrix);
    return pattern;
  }
};
__publicField(_TilingPattern, "MAX_PATTERN_SIZE", 3e3);
var TilingPattern = _TilingPattern;
function convertBlackAndWhiteToRGBA({
  src,
  srcPos = 0,
  dest,
  width,
  height,
  nonBlackColor = 4294967295,
  inverseDecode = false
}) {
  const black = util_FeatureTest.isLittleEndian ? 4278190080 : 255;
  const [zeroMapping, oneMapping] = inverseDecode ? [nonBlackColor, black] : [black, nonBlackColor];
  const widthInSource = width >> 3;
  const widthRemainder = width & 7;
  const srcLength = src.length;
  dest = new Uint32Array(dest.buffer);
  let destPos = 0;
  for (let i2 = 0; i2 < height; i2++) {
    for (const max = srcPos + widthInSource; srcPos < max; srcPos++) {
      const elem2 = srcPos < srcLength ? src[srcPos] : 255;
      dest[destPos++] = elem2 & 128 ? oneMapping : zeroMapping;
      dest[destPos++] = elem2 & 64 ? oneMapping : zeroMapping;
      dest[destPos++] = elem2 & 32 ? oneMapping : zeroMapping;
      dest[destPos++] = elem2 & 16 ? oneMapping : zeroMapping;
      dest[destPos++] = elem2 & 8 ? oneMapping : zeroMapping;
      dest[destPos++] = elem2 & 4 ? oneMapping : zeroMapping;
      dest[destPos++] = elem2 & 2 ? oneMapping : zeroMapping;
      dest[destPos++] = elem2 & 1 ? oneMapping : zeroMapping;
    }
    if (widthRemainder === 0) {
      continue;
    }
    const elem = srcPos < srcLength ? src[srcPos++] : 255;
    for (let j2 = 0; j2 < widthRemainder; j2++) {
      dest[destPos++] = elem & 1 << 7 - j2 ? oneMapping : zeroMapping;
    }
  }
  return {
    srcPos,
    destPos
  };
}
var MIN_FONT_SIZE = 16;
var MAX_FONT_SIZE = 100;
var EXECUTION_TIME = 15;
var EXECUTION_STEPS = 10;
var MAX_SIZE_TO_COMPILE = 1e3;
var FULL_CHUNK_HEIGHT = 16;
function mirrorContextOperations(ctx, destCtx) {
  if (ctx._removeMirroring) {
    throw new Error("Context is already forwarding operations.");
  }
  ctx.__originalSave = ctx.save;
  ctx.__originalRestore = ctx.restore;
  ctx.__originalRotate = ctx.rotate;
  ctx.__originalScale = ctx.scale;
  ctx.__originalTranslate = ctx.translate;
  ctx.__originalTransform = ctx.transform;
  ctx.__originalSetTransform = ctx.setTransform;
  ctx.__originalResetTransform = ctx.resetTransform;
  ctx.__originalClip = ctx.clip;
  ctx.__originalMoveTo = ctx.moveTo;
  ctx.__originalLineTo = ctx.lineTo;
  ctx.__originalBezierCurveTo = ctx.bezierCurveTo;
  ctx.__originalRect = ctx.rect;
  ctx.__originalClosePath = ctx.closePath;
  ctx.__originalBeginPath = ctx.beginPath;
  ctx._removeMirroring = () => {
    ctx.save = ctx.__originalSave;
    ctx.restore = ctx.__originalRestore;
    ctx.rotate = ctx.__originalRotate;
    ctx.scale = ctx.__originalScale;
    ctx.translate = ctx.__originalTranslate;
    ctx.transform = ctx.__originalTransform;
    ctx.setTransform = ctx.__originalSetTransform;
    ctx.resetTransform = ctx.__originalResetTransform;
    ctx.clip = ctx.__originalClip;
    ctx.moveTo = ctx.__originalMoveTo;
    ctx.lineTo = ctx.__originalLineTo;
    ctx.bezierCurveTo = ctx.__originalBezierCurveTo;
    ctx.rect = ctx.__originalRect;
    ctx.closePath = ctx.__originalClosePath;
    ctx.beginPath = ctx.__originalBeginPath;
    delete ctx._removeMirroring;
  };
  ctx.save = function ctxSave() {
    destCtx.save();
    this.__originalSave();
  };
  ctx.restore = function ctxRestore() {
    destCtx.restore();
    this.__originalRestore();
  };
  ctx.translate = function ctxTranslate(x2, y2) {
    destCtx.translate(x2, y2);
    this.__originalTranslate(x2, y2);
  };
  ctx.scale = function ctxScale(x2, y2) {
    destCtx.scale(x2, y2);
    this.__originalScale(x2, y2);
  };
  ctx.transform = function ctxTransform(a2, b2, c2, d2, e2, f) {
    destCtx.transform(a2, b2, c2, d2, e2, f);
    this.__originalTransform(a2, b2, c2, d2, e2, f);
  };
  ctx.setTransform = function ctxSetTransform(a2, b2, c2, d2, e2, f) {
    destCtx.setTransform(a2, b2, c2, d2, e2, f);
    this.__originalSetTransform(a2, b2, c2, d2, e2, f);
  };
  ctx.resetTransform = function ctxResetTransform() {
    destCtx.resetTransform();
    this.__originalResetTransform();
  };
  ctx.rotate = function ctxRotate(angle) {
    destCtx.rotate(angle);
    this.__originalRotate(angle);
  };
  ctx.clip = function ctxRotate(rule) {
    destCtx.clip(rule);
    this.__originalClip(rule);
  };
  ctx.moveTo = function(x2, y2) {
    destCtx.moveTo(x2, y2);
    this.__originalMoveTo(x2, y2);
  };
  ctx.lineTo = function(x2, y2) {
    destCtx.lineTo(x2, y2);
    this.__originalLineTo(x2, y2);
  };
  ctx.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x2, y2) {
    destCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
    this.__originalBezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
  };
  ctx.rect = function(x2, y2, width, height) {
    destCtx.rect(x2, y2, width, height);
    this.__originalRect(x2, y2, width, height);
  };
  ctx.closePath = function() {
    destCtx.closePath();
    this.__originalClosePath();
  };
  ctx.beginPath = function() {
    destCtx.beginPath();
    this.__originalBeginPath();
  };
}
var CachedCanvases = class {
  constructor(canvasFactory) {
    this.canvasFactory = canvasFactory;
    this.cache = /* @__PURE__ */ Object.create(null);
  }
  getCanvas(id, width, height) {
    let canvasEntry;
    if (this.cache[id] !== void 0) {
      canvasEntry = this.cache[id];
      this.canvasFactory.reset(canvasEntry, width, height);
    } else {
      canvasEntry = this.canvasFactory.create(width, height);
      this.cache[id] = canvasEntry;
    }
    return canvasEntry;
  }
  delete(id) {
    delete this.cache[id];
  }
  clear() {
    for (const id in this.cache) {
      const canvasEntry = this.cache[id];
      this.canvasFactory.destroy(canvasEntry);
      delete this.cache[id];
    }
  }
};
function drawImageAtIntegerCoords(ctx, srcImg, srcX, srcY, srcW, srcH, destX, destY, destW, destH) {
  const [a2, b2, c2, d2, tx, ty] = getCurrentTransform(ctx);
  if (b2 === 0 && c2 === 0) {
    const tlX = destX * a2 + tx;
    const rTlX = Math.round(tlX);
    const tlY = destY * d2 + ty;
    const rTlY = Math.round(tlY);
    const brX = (destX + destW) * a2 + tx;
    const rWidth = Math.abs(Math.round(brX) - rTlX) || 1;
    const brY = (destY + destH) * d2 + ty;
    const rHeight = Math.abs(Math.round(brY) - rTlY) || 1;
    ctx.setTransform(Math.sign(a2), 0, 0, Math.sign(d2), rTlX, rTlY);
    ctx.drawImage(srcImg, srcX, srcY, srcW, srcH, 0, 0, rWidth, rHeight);
    ctx.setTransform(a2, b2, c2, d2, tx, ty);
    return [rWidth, rHeight];
  }
  if (a2 === 0 && d2 === 0) {
    const tlX = destY * c2 + tx;
    const rTlX = Math.round(tlX);
    const tlY = destX * b2 + ty;
    const rTlY = Math.round(tlY);
    const brX = (destY + destH) * c2 + tx;
    const rWidth = Math.abs(Math.round(brX) - rTlX) || 1;
    const brY = (destX + destW) * b2 + ty;
    const rHeight = Math.abs(Math.round(brY) - rTlY) || 1;
    ctx.setTransform(0, Math.sign(b2), Math.sign(c2), 0, rTlX, rTlY);
    ctx.drawImage(srcImg, srcX, srcY, srcW, srcH, 0, 0, rHeight, rWidth);
    ctx.setTransform(a2, b2, c2, d2, tx, ty);
    return [rHeight, rWidth];
  }
  ctx.drawImage(srcImg, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
  const scaleX = Math.hypot(a2, b2);
  const scaleY = Math.hypot(c2, d2);
  return [scaleX * destW, scaleY * destH];
}
function compileType3Glyph(imgData) {
  const {
    width,
    height
  } = imgData;
  if (width > MAX_SIZE_TO_COMPILE || height > MAX_SIZE_TO_COMPILE) {
    return null;
  }
  const POINT_TO_PROCESS_LIMIT = 1e3;
  const POINT_TYPES = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]);
  const width1 = width + 1;
  let points = new Uint8Array(width1 * (height + 1));
  let i2, j2, j0;
  const lineSize = width + 7 & ~7;
  let data = new Uint8Array(lineSize * height), pos = 0;
  for (const elem of imgData.data) {
    let mask = 128;
    while (mask > 0) {
      data[pos++] = elem & mask ? 0 : 255;
      mask >>= 1;
    }
  }
  let count = 0;
  pos = 0;
  if (data[pos] !== 0) {
    points[0] = 1;
    ++count;
  }
  for (j2 = 1; j2 < width; j2++) {
    if (data[pos] !== data[pos + 1]) {
      points[j2] = data[pos] ? 2 : 1;
      ++count;
    }
    pos++;
  }
  if (data[pos] !== 0) {
    points[j2] = 2;
    ++count;
  }
  for (i2 = 1; i2 < height; i2++) {
    pos = i2 * lineSize;
    j0 = i2 * width1;
    if (data[pos - lineSize] !== data[pos]) {
      points[j0] = data[pos] ? 1 : 8;
      ++count;
    }
    let sum = (data[pos] ? 4 : 0) + (data[pos - lineSize] ? 8 : 0);
    for (j2 = 1; j2 < width; j2++) {
      sum = (sum >> 2) + (data[pos + 1] ? 4 : 0) + (data[pos - lineSize + 1] ? 8 : 0);
      if (POINT_TYPES[sum]) {
        points[j0 + j2] = POINT_TYPES[sum];
        ++count;
      }
      pos++;
    }
    if (data[pos - lineSize] !== data[pos]) {
      points[j0 + j2] = data[pos] ? 2 : 4;
      ++count;
    }
    if (count > POINT_TO_PROCESS_LIMIT) {
      return null;
    }
  }
  pos = lineSize * (height - 1);
  j0 = i2 * width1;
  if (data[pos] !== 0) {
    points[j0] = 8;
    ++count;
  }
  for (j2 = 1; j2 < width; j2++) {
    if (data[pos] !== data[pos + 1]) {
      points[j0 + j2] = data[pos] ? 4 : 8;
      ++count;
    }
    pos++;
  }
  if (data[pos] !== 0) {
    points[j0 + j2] = 4;
    ++count;
  }
  if (count > POINT_TO_PROCESS_LIMIT) {
    return null;
  }
  const steps = new Int32Array([0, width1, -1, 0, -width1, 0, 0, 0, 1]);
  const path = new Path2D();
  for (i2 = 0; count && i2 <= height; i2++) {
    let p = i2 * width1;
    const end = p + width;
    while (p < end && !points[p]) {
      p++;
    }
    if (p === end) {
      continue;
    }
    path.moveTo(p % width1, i2);
    const p0 = p;
    let type = points[p];
    do {
      const step = steps[type];
      do {
        p += step;
      } while (!points[p]);
      const pp = points[p];
      if (pp !== 5 && pp !== 10) {
        type = pp;
        points[p] = 0;
      } else {
        type = pp & 51 * type >> 4;
        points[p] &= type >> 2 | type << 2;
      }
      path.lineTo(p % width1, p / width1 | 0);
      if (!points[p]) {
        --count;
      }
    } while (p0 !== p);
    --i2;
  }
  data = null;
  points = null;
  const drawOutline = function(c2) {
    c2.save();
    c2.scale(1 / width, -1 / height);
    c2.translate(0, -height);
    c2.fill(path);
    c2.beginPath();
    c2.restore();
  };
  return drawOutline;
}
var CanvasExtraState = class {
  constructor(width, height) {
    this.alphaIsShape = false;
    this.fontSize = 0;
    this.fontSizeScale = 1;
    this.textMatrix = IDENTITY_MATRIX;
    this.textMatrixScale = 1;
    this.fontMatrix = FONT_IDENTITY_MATRIX;
    this.leading = 0;
    this.x = 0;
    this.y = 0;
    this.lineX = 0;
    this.lineY = 0;
    this.charSpacing = 0;
    this.wordSpacing = 0;
    this.textHScale = 1;
    this.textRenderingMode = TextRenderingMode.FILL;
    this.textRise = 0;
    this.fillColor = "#000000";
    this.strokeColor = "#000000";
    this.patternFill = false;
    this.fillAlpha = 1;
    this.strokeAlpha = 1;
    this.lineWidth = 1;
    this.activeSMask = null;
    this.transferMaps = "none";
    this.startNewPathAndClipBox([0, 0, width, height]);
  }
  clone() {
    const clone = Object.create(this);
    clone.clipBox = this.clipBox.slice();
    return clone;
  }
  setCurrentPoint(x2, y2) {
    this.x = x2;
    this.y = y2;
  }
  updatePathMinMax(transform, x2, y2) {
    [x2, y2] = Util.applyTransform([x2, y2], transform);
    this.minX = Math.min(this.minX, x2);
    this.minY = Math.min(this.minY, y2);
    this.maxX = Math.max(this.maxX, x2);
    this.maxY = Math.max(this.maxY, y2);
  }
  updateRectMinMax(transform, rect) {
    const p1 = Util.applyTransform(rect, transform);
    const p2 = Util.applyTransform(rect.slice(2), transform);
    const p3 = Util.applyTransform([rect[0], rect[3]], transform);
    const p4 = Util.applyTransform([rect[2], rect[1]], transform);
    this.minX = Math.min(this.minX, p1[0], p2[0], p3[0], p4[0]);
    this.minY = Math.min(this.minY, p1[1], p2[1], p3[1], p4[1]);
    this.maxX = Math.max(this.maxX, p1[0], p2[0], p3[0], p4[0]);
    this.maxY = Math.max(this.maxY, p1[1], p2[1], p3[1], p4[1]);
  }
  updateScalingPathMinMax(transform, minMax) {
    Util.scaleMinMax(transform, minMax);
    this.minX = Math.min(this.minX, minMax[0]);
    this.minY = Math.min(this.minY, minMax[1]);
    this.maxX = Math.max(this.maxX, minMax[2]);
    this.maxY = Math.max(this.maxY, minMax[3]);
  }
  updateCurvePathMinMax(transform, x0, y0, x1, y1, x2, y2, x3, y3, minMax) {
    const box = Util.bezierBoundingBox(x0, y0, x1, y1, x2, y2, x3, y3, minMax);
    if (minMax) {
      return;
    }
    this.updateRectMinMax(transform, box);
  }
  getPathBoundingBox(pathType = PathType.FILL, transform = null) {
    const box = [this.minX, this.minY, this.maxX, this.maxY];
    if (pathType === PathType.STROKE) {
      if (!transform) {
        unreachable("Stroke bounding box must include transform.");
      }
      const scale = Util.singularValueDecompose2dScale(transform);
      const xStrokePad = scale[0] * this.lineWidth / 2;
      const yStrokePad = scale[1] * this.lineWidth / 2;
      box[0] -= xStrokePad;
      box[1] -= yStrokePad;
      box[2] += xStrokePad;
      box[3] += yStrokePad;
    }
    return box;
  }
  updateClipFromPath() {
    const intersect = Util.intersect(this.clipBox, this.getPathBoundingBox());
    this.startNewPathAndClipBox(intersect || [0, 0, 0, 0]);
  }
  isEmptyClip() {
    return this.minX === Infinity;
  }
  startNewPathAndClipBox(box) {
    this.clipBox = box;
    this.minX = Infinity;
    this.minY = Infinity;
    this.maxX = 0;
    this.maxY = 0;
  }
  getClippedPathBoundingBox(pathType = PathType.FILL, transform = null) {
    return Util.intersect(this.clipBox, this.getPathBoundingBox(pathType, transform));
  }
};
function putBinaryImageData(ctx, imgData) {
  if (typeof ImageData !== "undefined" && imgData instanceof ImageData) {
    ctx.putImageData(imgData, 0, 0);
    return;
  }
  const height = imgData.height, width = imgData.width;
  const partialChunkHeight = height % FULL_CHUNK_HEIGHT;
  const fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
  const totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
  const chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
  let srcPos = 0, destPos;
  const src = imgData.data;
  const dest = chunkImgData.data;
  let i2, j2, thisChunkHeight, elemsInThisChunk;
  if (imgData.kind === util_ImageKind.GRAYSCALE_1BPP) {
    const srcLength = src.byteLength;
    const dest32 = new Uint32Array(dest.buffer, 0, dest.byteLength >> 2);
    const dest32DataLength = dest32.length;
    const fullSrcDiff = width + 7 >> 3;
    const white = 4294967295;
    const black = util_FeatureTest.isLittleEndian ? 4278190080 : 255;
    for (i2 = 0; i2 < totalChunks; i2++) {
      thisChunkHeight = i2 < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
      destPos = 0;
      for (j2 = 0; j2 < thisChunkHeight; j2++) {
        const srcDiff = srcLength - srcPos;
        let k2 = 0;
        const kEnd = srcDiff > fullSrcDiff ? width : srcDiff * 8 - 7;
        const kEndUnrolled = kEnd & ~7;
        let mask = 0;
        let srcByte = 0;
        for (; k2 < kEndUnrolled; k2 += 8) {
          srcByte = src[srcPos++];
          dest32[destPos++] = srcByte & 128 ? white : black;
          dest32[destPos++] = srcByte & 64 ? white : black;
          dest32[destPos++] = srcByte & 32 ? white : black;
          dest32[destPos++] = srcByte & 16 ? white : black;
          dest32[destPos++] = srcByte & 8 ? white : black;
          dest32[destPos++] = srcByte & 4 ? white : black;
          dest32[destPos++] = srcByte & 2 ? white : black;
          dest32[destPos++] = srcByte & 1 ? white : black;
        }
        for (; k2 < kEnd; k2++) {
          if (mask === 0) {
            srcByte = src[srcPos++];
            mask = 128;
          }
          dest32[destPos++] = srcByte & mask ? white : black;
          mask >>= 1;
        }
      }
      while (destPos < dest32DataLength) {
        dest32[destPos++] = 0;
      }
      ctx.putImageData(chunkImgData, 0, i2 * FULL_CHUNK_HEIGHT);
    }
  } else if (imgData.kind === util_ImageKind.RGBA_32BPP) {
    j2 = 0;
    elemsInThisChunk = width * FULL_CHUNK_HEIGHT * 4;
    for (i2 = 0; i2 < fullChunks; i2++) {
      dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
      srcPos += elemsInThisChunk;
      ctx.putImageData(chunkImgData, 0, j2);
      j2 += FULL_CHUNK_HEIGHT;
    }
    if (i2 < totalChunks) {
      elemsInThisChunk = width * partialChunkHeight * 4;
      dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
      ctx.putImageData(chunkImgData, 0, j2);
    }
  } else if (imgData.kind === util_ImageKind.RGB_24BPP) {
    thisChunkHeight = FULL_CHUNK_HEIGHT;
    elemsInThisChunk = width * thisChunkHeight;
    for (i2 = 0; i2 < totalChunks; i2++) {
      if (i2 >= fullChunks) {
        thisChunkHeight = partialChunkHeight;
        elemsInThisChunk = width * thisChunkHeight;
      }
      destPos = 0;
      for (j2 = elemsInThisChunk; j2--; ) {
        dest[destPos++] = src[srcPos++];
        dest[destPos++] = src[srcPos++];
        dest[destPos++] = src[srcPos++];
        dest[destPos++] = 255;
      }
      ctx.putImageData(chunkImgData, 0, i2 * FULL_CHUNK_HEIGHT);
    }
  } else {
    throw new Error(`bad image kind: ${imgData.kind}`);
  }
}
function putBinaryImageMask(ctx, imgData) {
  if (imgData.bitmap) {
    ctx.drawImage(imgData.bitmap, 0, 0);
    return;
  }
  const height = imgData.height, width = imgData.width;
  const partialChunkHeight = height % FULL_CHUNK_HEIGHT;
  const fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
  const totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
  const chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
  let srcPos = 0;
  const src = imgData.data;
  const dest = chunkImgData.data;
  for (let i2 = 0; i2 < totalChunks; i2++) {
    const thisChunkHeight = i2 < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
    ({
      srcPos
    } = convertBlackAndWhiteToRGBA({
      src,
      srcPos,
      dest,
      width,
      height: thisChunkHeight,
      nonBlackColor: 0
    }));
    ctx.putImageData(chunkImgData, 0, i2 * FULL_CHUNK_HEIGHT);
  }
}
function copyCtxState(sourceCtx, destCtx) {
  const properties = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font", "filter"];
  for (const property of properties) {
    if (sourceCtx[property] !== void 0) {
      destCtx[property] = sourceCtx[property];
    }
  }
  if (sourceCtx.setLineDash !== void 0) {
    destCtx.setLineDash(sourceCtx.getLineDash());
    destCtx.lineDashOffset = sourceCtx.lineDashOffset;
  }
}
function resetCtxToDefault(ctx) {
  ctx.strokeStyle = ctx.fillStyle = "#000000";
  ctx.fillRule = "nonzero";
  ctx.globalAlpha = 1;
  ctx.lineWidth = 1;
  ctx.lineCap = "butt";
  ctx.lineJoin = "miter";
  ctx.miterLimit = 10;
  ctx.globalCompositeOperation = "source-over";
  ctx.font = "10px sans-serif";
  if (ctx.setLineDash !== void 0) {
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;
  }
  if (!isNodeJS) {
    const {
      filter
    } = ctx;
    if (filter !== "none" && filter !== "") {
      ctx.filter = "none";
    }
  }
}
function getImageSmoothingEnabled(transform, interpolate) {
  if (interpolate) {
    return true;
  }
  const scale = Util.singularValueDecompose2dScale(transform);
  scale[0] = Math.fround(scale[0]);
  scale[1] = Math.fround(scale[1]);
  const actualScale = Math.fround((globalThis.devicePixelRatio || 1) * PixelsPerInch.PDF_TO_CSS_UNITS);
  return scale[0] <= actualScale && scale[1] <= actualScale;
}
var LINE_CAP_STYLES = ["butt", "round", "square"];
var LINE_JOIN_STYLES = ["miter", "round", "bevel"];
var NORMAL_CLIP = {};
var EO_CLIP = {};
var _CanvasGraphics_instances, restoreInitialState_fn, drawFilter_fn;
var _CanvasGraphics = class _CanvasGraphics {
  constructor(canvasCtx, commonObjs, objs, canvasFactory, filterFactory, {
    optionalContentConfig,
    markedContentStack = null
  }, annotationCanvasMap, pageColors) {
    __privateAdd(this, _CanvasGraphics_instances);
    this.ctx = canvasCtx;
    this.current = new CanvasExtraState(this.ctx.canvas.width, this.ctx.canvas.height);
    this.stateStack = [];
    this.pendingClip = null;
    this.pendingEOFill = false;
    this.res = null;
    this.xobjs = null;
    this.commonObjs = commonObjs;
    this.objs = objs;
    this.canvasFactory = canvasFactory;
    this.filterFactory = filterFactory;
    this.groupStack = [];
    this.processingType3 = null;
    this.baseTransform = null;
    this.baseTransformStack = [];
    this.groupLevel = 0;
    this.smaskStack = [];
    this.smaskCounter = 0;
    this.tempSMask = null;
    this.suspendedCtx = null;
    this.contentVisible = true;
    this.markedContentStack = markedContentStack || [];
    this.optionalContentConfig = optionalContentConfig;
    this.cachedCanvases = new CachedCanvases(this.canvasFactory);
    this.cachedPatterns = /* @__PURE__ */ new Map();
    this.annotationCanvasMap = annotationCanvasMap;
    this.viewportScale = 1;
    this.outputScaleX = 1;
    this.outputScaleY = 1;
    this.pageColors = pageColors;
    this._cachedScaleForStroking = [-1, 0];
    this._cachedGetSinglePixelWidth = null;
    this._cachedBitmapsMap = /* @__PURE__ */ new Map();
  }
  getObject(data, fallback = null) {
    if (typeof data === "string") {
      return data.startsWith("g_") ? this.commonObjs.get(data) : this.objs.get(data);
    }
    return fallback;
  }
  beginDrawing({
    transform,
    viewport,
    transparency = false,
    background = null
  }) {
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    const savedFillStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = background || "#ffffff";
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.fillStyle = savedFillStyle;
    if (transparency) {
      const transparentCanvas = this.cachedCanvases.getCanvas("transparent", width, height);
      this.compositeCtx = this.ctx;
      this.transparentCanvas = transparentCanvas.canvas;
      this.ctx = transparentCanvas.context;
      this.ctx.save();
      this.ctx.transform(...getCurrentTransform(this.compositeCtx));
    }
    this.ctx.save();
    resetCtxToDefault(this.ctx);
    if (transform) {
      this.ctx.transform(...transform);
      this.outputScaleX = transform[0];
      this.outputScaleY = transform[0];
    }
    this.ctx.transform(...viewport.transform);
    this.viewportScale = viewport.scale;
    this.baseTransform = getCurrentTransform(this.ctx);
  }
  executeOperatorList(operatorList, executionStartIdx, continueCallback, stepper) {
    const argsArray = operatorList.argsArray;
    const fnArray = operatorList.fnArray;
    let i2 = executionStartIdx || 0;
    const argsArrayLen = argsArray.length;
    if (argsArrayLen === i2) {
      return i2;
    }
    const chunkOperations = argsArrayLen - i2 > EXECUTION_STEPS && typeof continueCallback === "function";
    const endTime = chunkOperations ? Date.now() + EXECUTION_TIME : 0;
    let steps = 0;
    const commonObjs = this.commonObjs;
    const objs = this.objs;
    let fnId;
    while (true) {
      if (stepper !== void 0 && i2 === stepper.nextBreakPoint) {
        stepper.breakIt(i2, continueCallback);
        return i2;
      }
      fnId = fnArray[i2];
      if (fnId !== OPS.dependency) {
        this[fnId].apply(this, argsArray[i2]);
      } else {
        for (const depObjId of argsArray[i2]) {
          const objsPool = depObjId.startsWith("g_") ? commonObjs : objs;
          if (!objsPool.has(depObjId)) {
            objsPool.get(depObjId, continueCallback);
            return i2;
          }
        }
      }
      i2++;
      if (i2 === argsArrayLen) {
        return i2;
      }
      if (chunkOperations && ++steps > EXECUTION_STEPS) {
        if (Date.now() > endTime) {
          continueCallback();
          return i2;
        }
        steps = 0;
      }
    }
  }
  endDrawing() {
    __privateMethod(this, _CanvasGraphics_instances, restoreInitialState_fn).call(this);
    this.cachedCanvases.clear();
    this.cachedPatterns.clear();
    for (const cache of this._cachedBitmapsMap.values()) {
      for (const canvas of cache.values()) {
        if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement) {
          canvas.width = canvas.height = 0;
        }
      }
      cache.clear();
    }
    this._cachedBitmapsMap.clear();
    __privateMethod(this, _CanvasGraphics_instances, drawFilter_fn).call(this);
  }
  _scaleImage(img, inverseTransform) {
    const width = img.width;
    const height = img.height;
    let widthScale = Math.max(Math.hypot(inverseTransform[0], inverseTransform[1]), 1);
    let heightScale = Math.max(Math.hypot(inverseTransform[2], inverseTransform[3]), 1);
    let paintWidth = width, paintHeight = height;
    let tmpCanvasId = "prescale1";
    let tmpCanvas, tmpCtx;
    while (widthScale > 2 && paintWidth > 1 || heightScale > 2 && paintHeight > 1) {
      let newWidth = paintWidth, newHeight = paintHeight;
      if (widthScale > 2 && paintWidth > 1) {
        newWidth = paintWidth >= 16384 ? Math.floor(paintWidth / 2) - 1 || 1 : Math.ceil(paintWidth / 2);
        widthScale /= paintWidth / newWidth;
      }
      if (heightScale > 2 && paintHeight > 1) {
        newHeight = paintHeight >= 16384 ? Math.floor(paintHeight / 2) - 1 || 1 : Math.ceil(paintHeight) / 2;
        heightScale /= paintHeight / newHeight;
      }
      tmpCanvas = this.cachedCanvases.getCanvas(tmpCanvasId, newWidth, newHeight);
      tmpCtx = tmpCanvas.context;
      tmpCtx.clearRect(0, 0, newWidth, newHeight);
      tmpCtx.drawImage(img, 0, 0, paintWidth, paintHeight, 0, 0, newWidth, newHeight);
      img = tmpCanvas.canvas;
      paintWidth = newWidth;
      paintHeight = newHeight;
      tmpCanvasId = tmpCanvasId === "prescale1" ? "prescale2" : "prescale1";
    }
    return {
      img,
      paintWidth,
      paintHeight
    };
  }
  _createMaskCanvas(img) {
    const ctx = this.ctx;
    const {
      width,
      height
    } = img;
    const fillColor = this.current.fillColor;
    const isPatternFill = this.current.patternFill;
    const currentTransform = getCurrentTransform(ctx);
    let cache, cacheKey, scaled, maskCanvas;
    if ((img.bitmap || img.data) && img.count > 1) {
      const mainKey = img.bitmap || img.data.buffer;
      cacheKey = JSON.stringify(isPatternFill ? currentTransform : [currentTransform.slice(0, 4), fillColor]);
      cache = this._cachedBitmapsMap.get(mainKey);
      if (!cache) {
        cache = /* @__PURE__ */ new Map();
        this._cachedBitmapsMap.set(mainKey, cache);
      }
      const cachedImage = cache.get(cacheKey);
      if (cachedImage && !isPatternFill) {
        const offsetX2 = Math.round(Math.min(currentTransform[0], currentTransform[2]) + currentTransform[4]);
        const offsetY2 = Math.round(Math.min(currentTransform[1], currentTransform[3]) + currentTransform[5]);
        return {
          canvas: cachedImage,
          offsetX: offsetX2,
          offsetY: offsetY2
        };
      }
      scaled = cachedImage;
    }
    if (!scaled) {
      maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
      putBinaryImageMask(maskCanvas.context, img);
    }
    let maskToCanvas = Util.transform(currentTransform, [1 / width, 0, 0, -1 / height, 0, 0]);
    maskToCanvas = Util.transform(maskToCanvas, [1, 0, 0, 1, 0, -height]);
    const [minX, minY, maxX, maxY] = Util.getAxialAlignedBoundingBox([0, 0, width, height], maskToCanvas);
    const drawnWidth = Math.round(maxX - minX) || 1;
    const drawnHeight = Math.round(maxY - minY) || 1;
    const fillCanvas = this.cachedCanvases.getCanvas("fillCanvas", drawnWidth, drawnHeight);
    const fillCtx = fillCanvas.context;
    const offsetX = minX;
    const offsetY = minY;
    fillCtx.translate(-offsetX, -offsetY);
    fillCtx.transform(...maskToCanvas);
    if (!scaled) {
      scaled = this._scaleImage(maskCanvas.canvas, getCurrentTransformInverse(fillCtx));
      scaled = scaled.img;
      if (cache && isPatternFill) {
        cache.set(cacheKey, scaled);
      }
    }
    fillCtx.imageSmoothingEnabled = getImageSmoothingEnabled(getCurrentTransform(fillCtx), img.interpolate);
    drawImageAtIntegerCoords(fillCtx, scaled, 0, 0, scaled.width, scaled.height, 0, 0, width, height);
    fillCtx.globalCompositeOperation = "source-in";
    const inverse = Util.transform(getCurrentTransformInverse(fillCtx), [1, 0, 0, 1, -offsetX, -offsetY]);
    fillCtx.fillStyle = isPatternFill ? fillColor.getPattern(ctx, this, inverse, PathType.FILL) : fillColor;
    fillCtx.fillRect(0, 0, width, height);
    if (cache && !isPatternFill) {
      this.cachedCanvases.delete("fillCanvas");
      cache.set(cacheKey, fillCanvas.canvas);
    }
    return {
      canvas: fillCanvas.canvas,
      offsetX: Math.round(offsetX),
      offsetY: Math.round(offsetY)
    };
  }
  setLineWidth(width) {
    if (width !== this.current.lineWidth) {
      this._cachedScaleForStroking[0] = -1;
    }
    this.current.lineWidth = width;
    this.ctx.lineWidth = width;
  }
  setLineCap(style) {
    this.ctx.lineCap = LINE_CAP_STYLES[style];
  }
  setLineJoin(style) {
    this.ctx.lineJoin = LINE_JOIN_STYLES[style];
  }
  setMiterLimit(limit) {
    this.ctx.miterLimit = limit;
  }
  setDash(dashArray, dashPhase) {
    const ctx = this.ctx;
    if (ctx.setLineDash !== void 0) {
      ctx.setLineDash(dashArray);
      ctx.lineDashOffset = dashPhase;
    }
  }
  setRenderingIntent(intent) {
  }
  setFlatness(flatness) {
  }
  setGState(states) {
    for (const [key, value] of states) {
      switch (key) {
        case "LW":
          this.setLineWidth(value);
          break;
        case "LC":
          this.setLineCap(value);
          break;
        case "LJ":
          this.setLineJoin(value);
          break;
        case "ML":
          this.setMiterLimit(value);
          break;
        case "D":
          this.setDash(value[0], value[1]);
          break;
        case "RI":
          this.setRenderingIntent(value);
          break;
        case "FL":
          this.setFlatness(value);
          break;
        case "Font":
          this.setFont(value[0], value[1]);
          break;
        case "CA":
          this.current.strokeAlpha = value;
          break;
        case "ca":
          this.current.fillAlpha = value;
          this.ctx.globalAlpha = value;
          break;
        case "BM":
          this.ctx.globalCompositeOperation = value;
          break;
        case "SMask":
          this.current.activeSMask = value ? this.tempSMask : null;
          this.tempSMask = null;
          this.checkSMaskState();
          break;
        case "TR":
          this.ctx.filter = this.current.transferMaps = this.filterFactory.addFilter(value);
          break;
      }
    }
  }
  get inSMaskMode() {
    return !!this.suspendedCtx;
  }
  checkSMaskState() {
    const inSMaskMode = this.inSMaskMode;
    if (this.current.activeSMask && !inSMaskMode) {
      this.beginSMaskMode();
    } else if (!this.current.activeSMask && inSMaskMode) {
      this.endSMaskMode();
    }
  }
  beginSMaskMode() {
    if (this.inSMaskMode) {
      throw new Error("beginSMaskMode called while already in smask mode");
    }
    const drawnWidth = this.ctx.canvas.width;
    const drawnHeight = this.ctx.canvas.height;
    const cacheId = "smaskGroupAt" + this.groupLevel;
    const scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight);
    this.suspendedCtx = this.ctx;
    this.ctx = scratchCanvas.context;
    const ctx = this.ctx;
    ctx.setTransform(...getCurrentTransform(this.suspendedCtx));
    copyCtxState(this.suspendedCtx, ctx);
    mirrorContextOperations(ctx, this.suspendedCtx);
    this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
  }
  endSMaskMode() {
    if (!this.inSMaskMode) {
      throw new Error("endSMaskMode called while not in smask mode");
    }
    this.ctx._removeMirroring();
    copyCtxState(this.ctx, this.suspendedCtx);
    this.ctx = this.suspendedCtx;
    this.suspendedCtx = null;
  }
  compose(dirtyBox) {
    if (!this.current.activeSMask) {
      return;
    }
    if (!dirtyBox) {
      dirtyBox = [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
    } else {
      dirtyBox[0] = Math.floor(dirtyBox[0]);
      dirtyBox[1] = Math.floor(dirtyBox[1]);
      dirtyBox[2] = Math.ceil(dirtyBox[2]);
      dirtyBox[3] = Math.ceil(dirtyBox[3]);
    }
    const smask = this.current.activeSMask;
    const suspendedCtx = this.suspendedCtx;
    this.composeSMask(suspendedCtx, smask, this.ctx, dirtyBox);
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.restore();
  }
  composeSMask(ctx, smask, layerCtx, layerBox) {
    const layerOffsetX = layerBox[0];
    const layerOffsetY = layerBox[1];
    const layerWidth = layerBox[2] - layerOffsetX;
    const layerHeight = layerBox[3] - layerOffsetY;
    if (layerWidth === 0 || layerHeight === 0) {
      return;
    }
    this.genericComposeSMask(smask.context, layerCtx, layerWidth, layerHeight, smask.subtype, smask.backdrop, smask.transferMap, layerOffsetX, layerOffsetY, smask.offsetX, smask.offsetY);
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(layerCtx.canvas, 0, 0);
    ctx.restore();
  }
  genericComposeSMask(maskCtx, layerCtx, width, height, subtype, backdrop, transferMap, layerOffsetX, layerOffsetY, maskOffsetX, maskOffsetY) {
    let maskCanvas = maskCtx.canvas;
    let maskX = layerOffsetX - maskOffsetX;
    let maskY = layerOffsetY - maskOffsetY;
    if (backdrop) {
      if (maskX < 0 || maskY < 0 || maskX + width > maskCanvas.width || maskY + height > maskCanvas.height) {
        const canvas = this.cachedCanvases.getCanvas("maskExtension", width, height);
        const ctx = canvas.context;
        ctx.drawImage(maskCanvas, -maskX, -maskY);
        if (backdrop.some((c2) => c2 !== 0)) {
          ctx.globalCompositeOperation = "destination-atop";
          ctx.fillStyle = Util.makeHexColor(...backdrop);
          ctx.fillRect(0, 0, width, height);
          ctx.globalCompositeOperation = "source-over";
        }
        maskCanvas = canvas.canvas;
        maskX = maskY = 0;
      } else if (backdrop.some((c2) => c2 !== 0)) {
        maskCtx.save();
        maskCtx.globalAlpha = 1;
        maskCtx.setTransform(1, 0, 0, 1, 0, 0);
        const clip2 = new Path2D();
        clip2.rect(maskX, maskY, width, height);
        maskCtx.clip(clip2);
        maskCtx.globalCompositeOperation = "destination-atop";
        maskCtx.fillStyle = Util.makeHexColor(...backdrop);
        maskCtx.fillRect(maskX, maskY, width, height);
        maskCtx.restore();
      }
    }
    layerCtx.save();
    layerCtx.globalAlpha = 1;
    layerCtx.setTransform(1, 0, 0, 1, 0, 0);
    if (subtype === "Alpha" && transferMap) {
      layerCtx.filter = this.filterFactory.addAlphaFilter(transferMap);
    } else if (subtype === "Luminosity") {
      layerCtx.filter = this.filterFactory.addLuminosityFilter(transferMap);
    }
    const clip = new Path2D();
    clip.rect(layerOffsetX, layerOffsetY, width, height);
    layerCtx.clip(clip);
    layerCtx.globalCompositeOperation = "destination-in";
    layerCtx.drawImage(maskCanvas, maskX, maskY, width, height, layerOffsetX, layerOffsetY, width, height);
    layerCtx.restore();
  }
  save() {
    if (this.inSMaskMode) {
      copyCtxState(this.ctx, this.suspendedCtx);
      this.suspendedCtx.save();
    } else {
      this.ctx.save();
    }
    const old = this.current;
    this.stateStack.push(old);
    this.current = old.clone();
  }
  restore() {
    if (this.stateStack.length === 0 && this.inSMaskMode) {
      this.endSMaskMode();
    }
    if (this.stateStack.length !== 0) {
      this.current = this.stateStack.pop();
      if (this.inSMaskMode) {
        this.suspendedCtx.restore();
        copyCtxState(this.suspendedCtx, this.ctx);
      } else {
        this.ctx.restore();
      }
      this.checkSMaskState();
      this.pendingClip = null;
      this._cachedScaleForStroking[0] = -1;
      this._cachedGetSinglePixelWidth = null;
    }
  }
  transform(a2, b2, c2, d2, e2, f) {
    this.ctx.transform(a2, b2, c2, d2, e2, f);
    this._cachedScaleForStroking[0] = -1;
    this._cachedGetSinglePixelWidth = null;
  }
  constructPath(ops, args, minMax) {
    const ctx = this.ctx;
    const current = this.current;
    let x2 = current.x, y2 = current.y;
    let startX, startY;
    const currentTransform = getCurrentTransform(ctx);
    const isScalingMatrix = currentTransform[0] === 0 && currentTransform[3] === 0 || currentTransform[1] === 0 && currentTransform[2] === 0;
    const minMaxForBezier = isScalingMatrix ? minMax.slice(0) : null;
    for (let i2 = 0, j2 = 0, ii = ops.length; i2 < ii; i2++) {
      switch (ops[i2] | 0) {
        case OPS.rectangle:
          x2 = args[j2++];
          y2 = args[j2++];
          const width = args[j2++];
          const height = args[j2++];
          const xw = x2 + width;
          const yh = y2 + height;
          ctx.moveTo(x2, y2);
          if (width === 0 || height === 0) {
            ctx.lineTo(xw, yh);
          } else {
            ctx.lineTo(xw, y2);
            ctx.lineTo(xw, yh);
            ctx.lineTo(x2, yh);
          }
          if (!isScalingMatrix) {
            current.updateRectMinMax(currentTransform, [x2, y2, xw, yh]);
          }
          ctx.closePath();
          break;
        case OPS.moveTo:
          x2 = args[j2++];
          y2 = args[j2++];
          ctx.moveTo(x2, y2);
          if (!isScalingMatrix) {
            current.updatePathMinMax(currentTransform, x2, y2);
          }
          break;
        case OPS.lineTo:
          x2 = args[j2++];
          y2 = args[j2++];
          ctx.lineTo(x2, y2);
          if (!isScalingMatrix) {
            current.updatePathMinMax(currentTransform, x2, y2);
          }
          break;
        case OPS.curveTo:
          startX = x2;
          startY = y2;
          x2 = args[j2 + 4];
          y2 = args[j2 + 5];
          ctx.bezierCurveTo(args[j2], args[j2 + 1], args[j2 + 2], args[j2 + 3], x2, y2);
          current.updateCurvePathMinMax(currentTransform, startX, startY, args[j2], args[j2 + 1], args[j2 + 2], args[j2 + 3], x2, y2, minMaxForBezier);
          j2 += 6;
          break;
        case OPS.curveTo2:
          startX = x2;
          startY = y2;
          ctx.bezierCurveTo(x2, y2, args[j2], args[j2 + 1], args[j2 + 2], args[j2 + 3]);
          current.updateCurvePathMinMax(currentTransform, startX, startY, x2, y2, args[j2], args[j2 + 1], args[j2 + 2], args[j2 + 3], minMaxForBezier);
          x2 = args[j2 + 2];
          y2 = args[j2 + 3];
          j2 += 4;
          break;
        case OPS.curveTo3:
          startX = x2;
          startY = y2;
          x2 = args[j2 + 2];
          y2 = args[j2 + 3];
          ctx.bezierCurveTo(args[j2], args[j2 + 1], x2, y2, x2, y2);
          current.updateCurvePathMinMax(currentTransform, startX, startY, args[j2], args[j2 + 1], x2, y2, x2, y2, minMaxForBezier);
          j2 += 4;
          break;
        case OPS.closePath:
          ctx.closePath();
          break;
      }
    }
    if (isScalingMatrix) {
      current.updateScalingPathMinMax(currentTransform, minMaxForBezier);
    }
    current.setCurrentPoint(x2, y2);
  }
  closePath() {
    this.ctx.closePath();
  }
  stroke(consumePath = true) {
    const ctx = this.ctx;
    const strokeColor = this.current.strokeColor;
    ctx.globalAlpha = this.current.strokeAlpha;
    if (this.contentVisible) {
      if (typeof strokeColor === "object" && (strokeColor == null ? void 0 : strokeColor.getPattern)) {
        ctx.save();
        ctx.strokeStyle = strokeColor.getPattern(ctx, this, getCurrentTransformInverse(ctx), PathType.STROKE);
        this.rescaleAndStroke(false);
        ctx.restore();
      } else {
        this.rescaleAndStroke(true);
      }
    }
    if (consumePath) {
      this.consumePath(this.current.getClippedPathBoundingBox());
    }
    ctx.globalAlpha = this.current.fillAlpha;
  }
  closeStroke() {
    this.closePath();
    this.stroke();
  }
  fill(consumePath = true) {
    const ctx = this.ctx;
    const fillColor = this.current.fillColor;
    const isPatternFill = this.current.patternFill;
    let needRestore = false;
    if (isPatternFill) {
      ctx.save();
      ctx.fillStyle = fillColor.getPattern(ctx, this, getCurrentTransformInverse(ctx), PathType.FILL);
      needRestore = true;
    }
    const intersect = this.current.getClippedPathBoundingBox();
    if (this.contentVisible && intersect !== null) {
      if (this.pendingEOFill) {
        ctx.fill("evenodd");
        this.pendingEOFill = false;
      } else {
        ctx.fill();
      }
    }
    if (needRestore) {
      ctx.restore();
    }
    if (consumePath) {
      this.consumePath(intersect);
    }
  }
  eoFill() {
    this.pendingEOFill = true;
    this.fill();
  }
  fillStroke() {
    this.fill(false);
    this.stroke(false);
    this.consumePath();
  }
  eoFillStroke() {
    this.pendingEOFill = true;
    this.fillStroke();
  }
  closeFillStroke() {
    this.closePath();
    this.fillStroke();
  }
  closeEOFillStroke() {
    this.pendingEOFill = true;
    this.closePath();
    this.fillStroke();
  }
  endPath() {
    this.consumePath();
  }
  clip() {
    this.pendingClip = NORMAL_CLIP;
  }
  eoClip() {
    this.pendingClip = EO_CLIP;
  }
  beginText() {
    this.current.textMatrix = IDENTITY_MATRIX;
    this.current.textMatrixScale = 1;
    this.current.x = this.current.lineX = 0;
    this.current.y = this.current.lineY = 0;
  }
  endText() {
    const paths = this.pendingTextPaths;
    const ctx = this.ctx;
    if (paths === void 0) {
      ctx.beginPath();
      return;
    }
    ctx.save();
    ctx.beginPath();
    for (const path of paths) {
      ctx.setTransform(...path.transform);
      ctx.translate(path.x, path.y);
      path.addToPath(ctx, path.fontSize);
    }
    ctx.restore();
    ctx.clip();
    ctx.beginPath();
    delete this.pendingTextPaths;
  }
  setCharSpacing(spacing) {
    this.current.charSpacing = spacing;
  }
  setWordSpacing(spacing) {
    this.current.wordSpacing = spacing;
  }
  setHScale(scale) {
    this.current.textHScale = scale / 100;
  }
  setLeading(leading) {
    this.current.leading = -leading;
  }
  setFont(fontRefName, size) {
    var _a2;
    const fontObj = this.commonObjs.get(fontRefName);
    const current = this.current;
    if (!fontObj) {
      throw new Error(`Can't find font for ${fontRefName}`);
    }
    current.fontMatrix = fontObj.fontMatrix || FONT_IDENTITY_MATRIX;
    if (current.fontMatrix[0] === 0 || current.fontMatrix[3] === 0) {
      warn("Invalid font matrix for font " + fontRefName);
    }
    if (size < 0) {
      size = -size;
      current.fontDirection = -1;
    } else {
      current.fontDirection = 1;
    }
    this.current.font = fontObj;
    this.current.fontSize = size;
    if (fontObj.isType3Font) {
      return;
    }
    const name = fontObj.loadedName || "sans-serif";
    const typeface = ((_a2 = fontObj.systemFontInfo) == null ? void 0 : _a2.css) || `"${name}", ${fontObj.fallbackName}`;
    let bold = "normal";
    if (fontObj.black) {
      bold = "900";
    } else if (fontObj.bold) {
      bold = "bold";
    }
    const italic = fontObj.italic ? "italic" : "normal";
    let browserFontSize = size;
    if (size < MIN_FONT_SIZE) {
      browserFontSize = MIN_FONT_SIZE;
    } else if (size > MAX_FONT_SIZE) {
      browserFontSize = MAX_FONT_SIZE;
    }
    this.current.fontSizeScale = size / browserFontSize;
    this.ctx.font = `${italic} ${bold} ${browserFontSize}px ${typeface}`;
  }
  setTextRenderingMode(mode) {
    this.current.textRenderingMode = mode;
  }
  setTextRise(rise) {
    this.current.textRise = rise;
  }
  moveText(x2, y2) {
    this.current.x = this.current.lineX += x2;
    this.current.y = this.current.lineY += y2;
  }
  setLeadingMoveText(x2, y2) {
    this.setLeading(-y2);
    this.moveText(x2, y2);
  }
  setTextMatrix(a2, b2, c2, d2, e2, f) {
    this.current.textMatrix = [a2, b2, c2, d2, e2, f];
    this.current.textMatrixScale = Math.hypot(a2, b2);
    this.current.x = this.current.lineX = 0;
    this.current.y = this.current.lineY = 0;
  }
  nextLine() {
    this.moveText(0, this.current.leading);
  }
  paintChar(character, x2, y2, patternTransform) {
    const ctx = this.ctx;
    const current = this.current;
    const font = current.font;
    const textRenderingMode = current.textRenderingMode;
    const fontSize = current.fontSize / current.fontSizeScale;
    const fillStrokeMode = textRenderingMode & TextRenderingMode.FILL_STROKE_MASK;
    const isAddToPathSet = !!(textRenderingMode & TextRenderingMode.ADD_TO_PATH_FLAG);
    const patternFill = current.patternFill && !font.missingFile;
    let addToPath;
    if (font.disableFontFace || isAddToPathSet || patternFill) {
      addToPath = font.getPathGenerator(this.commonObjs, character);
    }
    if (font.disableFontFace || patternFill) {
      ctx.save();
      ctx.translate(x2, y2);
      ctx.beginPath();
      addToPath(ctx, fontSize);
      if (patternTransform) {
        ctx.setTransform(...patternTransform);
      }
      if (fillStrokeMode === TextRenderingMode.FILL || fillStrokeMode === TextRenderingMode.FILL_STROKE) {
        ctx.fill();
      }
      if (fillStrokeMode === TextRenderingMode.STROKE || fillStrokeMode === TextRenderingMode.FILL_STROKE) {
        ctx.stroke();
      }
      ctx.restore();
    } else {
      if (fillStrokeMode === TextRenderingMode.FILL || fillStrokeMode === TextRenderingMode.FILL_STROKE) {
        ctx.fillText(character, x2, y2);
      }
      if (fillStrokeMode === TextRenderingMode.STROKE || fillStrokeMode === TextRenderingMode.FILL_STROKE) {
        ctx.strokeText(character, x2, y2);
      }
    }
    if (isAddToPathSet) {
      const paths = this.pendingTextPaths || (this.pendingTextPaths = []);
      paths.push({
        transform: getCurrentTransform(ctx),
        x: x2,
        y: y2,
        fontSize,
        addToPath
      });
    }
  }
  get isFontSubpixelAAEnabled() {
    const {
      context: ctx
    } = this.cachedCanvases.getCanvas("isFontSubpixelAAEnabled", 10, 10);
    ctx.scale(1.5, 1);
    ctx.fillText("I", 0, 10);
    const data = ctx.getImageData(0, 0, 10, 10).data;
    let enabled = false;
    for (let i2 = 3; i2 < data.length; i2 += 4) {
      if (data[i2] > 0 && data[i2] < 255) {
        enabled = true;
        break;
      }
    }
    return shadow(this, "isFontSubpixelAAEnabled", enabled);
  }
  showText(glyphs) {
    const current = this.current;
    const font = current.font;
    if (font.isType3Font) {
      return this.showType3Text(glyphs);
    }
    const fontSize = current.fontSize;
    if (fontSize === 0) {
      return void 0;
    }
    const ctx = this.ctx;
    const fontSizeScale = current.fontSizeScale;
    const charSpacing = current.charSpacing;
    const wordSpacing = current.wordSpacing;
    const fontDirection = current.fontDirection;
    const textHScale = current.textHScale * fontDirection;
    const glyphsLength = glyphs.length;
    const vertical = font.vertical;
    const spacingDir = vertical ? 1 : -1;
    const defaultVMetrics = font.defaultVMetrics;
    const widthAdvanceScale = fontSize * current.fontMatrix[0];
    const simpleFillText = current.textRenderingMode === TextRenderingMode.FILL && !font.disableFontFace && !current.patternFill;
    ctx.save();
    ctx.transform(...current.textMatrix);
    ctx.translate(current.x, current.y + current.textRise);
    if (fontDirection > 0) {
      ctx.scale(textHScale, -1);
    } else {
      ctx.scale(textHScale, 1);
    }
    let patternTransform;
    if (current.patternFill) {
      ctx.save();
      const pattern = current.fillColor.getPattern(ctx, this, getCurrentTransformInverse(ctx), PathType.FILL);
      patternTransform = getCurrentTransform(ctx);
      ctx.restore();
      ctx.fillStyle = pattern;
    }
    let lineWidth = current.lineWidth;
    const scale = current.textMatrixScale;
    if (scale === 0 || lineWidth === 0) {
      const fillStrokeMode = current.textRenderingMode & TextRenderingMode.FILL_STROKE_MASK;
      if (fillStrokeMode === TextRenderingMode.STROKE || fillStrokeMode === TextRenderingMode.FILL_STROKE) {
        lineWidth = this.getSinglePixelWidth();
      }
    } else {
      lineWidth /= scale;
    }
    if (fontSizeScale !== 1) {
      ctx.scale(fontSizeScale, fontSizeScale);
      lineWidth /= fontSizeScale;
    }
    ctx.lineWidth = lineWidth;
    if (font.isInvalidPDFjsFont) {
      const chars = [];
      let width = 0;
      for (const glyph of glyphs) {
        chars.push(glyph.unicode);
        width += glyph.width;
      }
      ctx.fillText(chars.join(""), 0, 0);
      current.x += width * widthAdvanceScale * textHScale;
      ctx.restore();
      this.compose();
      return void 0;
    }
    let x2 = 0, i2;
    for (i2 = 0; i2 < glyphsLength; ++i2) {
      const glyph = glyphs[i2];
      if (typeof glyph === "number") {
        x2 += spacingDir * glyph * fontSize / 1e3;
        continue;
      }
      let restoreNeeded = false;
      const spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
      const character = glyph.fontChar;
      const accent = glyph.accent;
      let scaledX, scaledY;
      let width = glyph.width;
      if (vertical) {
        const vmetric = glyph.vmetric || defaultVMetrics;
        const vx = -(glyph.vmetric ? vmetric[1] : width * 0.5) * widthAdvanceScale;
        const vy = vmetric[2] * widthAdvanceScale;
        width = vmetric ? -vmetric[0] : width;
        scaledX = vx / fontSizeScale;
        scaledY = (x2 + vy) / fontSizeScale;
      } else {
        scaledX = x2 / fontSizeScale;
        scaledY = 0;
      }
      if (font.remeasure && width > 0) {
        const measuredWidth = ctx.measureText(character).width * 1e3 / fontSize * fontSizeScale;
        if (width < measuredWidth && this.isFontSubpixelAAEnabled) {
          const characterScaleX = width / measuredWidth;
          restoreNeeded = true;
          ctx.save();
          ctx.scale(characterScaleX, 1);
          scaledX /= characterScaleX;
        } else if (width !== measuredWidth) {
          scaledX += (width - measuredWidth) / 2e3 * fontSize / fontSizeScale;
        }
      }
      if (this.contentVisible && (glyph.isInFont || font.missingFile)) {
        if (simpleFillText && !accent) {
          ctx.fillText(character, scaledX, scaledY);
        } else {
          this.paintChar(character, scaledX, scaledY, patternTransform);
          if (accent) {
            const scaledAccentX = scaledX + fontSize * accent.offset.x / fontSizeScale;
            const scaledAccentY = scaledY - fontSize * accent.offset.y / fontSizeScale;
            this.paintChar(accent.fontChar, scaledAccentX, scaledAccentY, patternTransform);
          }
        }
      }
      const charWidth = vertical ? width * widthAdvanceScale - spacing * fontDirection : width * widthAdvanceScale + spacing * fontDirection;
      x2 += charWidth;
      if (restoreNeeded) {
        ctx.restore();
      }
    }
    if (vertical) {
      current.y -= x2;
    } else {
      current.x += x2 * textHScale;
    }
    ctx.restore();
    this.compose();
    return void 0;
  }
  showType3Text(glyphs) {
    const ctx = this.ctx;
    const current = this.current;
    const font = current.font;
    const fontSize = current.fontSize;
    const fontDirection = current.fontDirection;
    const spacingDir = font.vertical ? 1 : -1;
    const charSpacing = current.charSpacing;
    const wordSpacing = current.wordSpacing;
    const textHScale = current.textHScale * fontDirection;
    const fontMatrix = current.fontMatrix || FONT_IDENTITY_MATRIX;
    const glyphsLength = glyphs.length;
    const isTextInvisible = current.textRenderingMode === TextRenderingMode.INVISIBLE;
    let i2, glyph, width, spacingLength;
    if (isTextInvisible || fontSize === 0) {
      return;
    }
    this._cachedScaleForStroking[0] = -1;
    this._cachedGetSinglePixelWidth = null;
    ctx.save();
    ctx.transform(...current.textMatrix);
    ctx.translate(current.x, current.y);
    ctx.scale(textHScale, fontDirection);
    for (i2 = 0; i2 < glyphsLength; ++i2) {
      glyph = glyphs[i2];
      if (typeof glyph === "number") {
        spacingLength = spacingDir * glyph * fontSize / 1e3;
        this.ctx.translate(spacingLength, 0);
        current.x += spacingLength * textHScale;
        continue;
      }
      const spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
      const operatorList = font.charProcOperatorList[glyph.operatorListId];
      if (!operatorList) {
        warn(`Type3 character "${glyph.operatorListId}" is not available.`);
        continue;
      }
      if (this.contentVisible) {
        this.processingType3 = glyph;
        this.save();
        ctx.scale(fontSize, fontSize);
        ctx.transform(...fontMatrix);
        this.executeOperatorList(operatorList);
        this.restore();
      }
      const transformed = Util.applyTransform([glyph.width, 0], fontMatrix);
      width = transformed[0] * fontSize + spacing;
      ctx.translate(width, 0);
      current.x += width * textHScale;
    }
    ctx.restore();
    this.processingType3 = null;
  }
  setCharWidth(xWidth, yWidth) {
  }
  setCharWidthAndBounds(xWidth, yWidth, llx, lly, urx, ury) {
    this.ctx.rect(llx, lly, urx - llx, ury - lly);
    this.ctx.clip();
    this.endPath();
  }
  getColorN_Pattern(IR) {
    let pattern;
    if (IR[0] === "TilingPattern") {
      const color = IR[1];
      const baseTransform = this.baseTransform || getCurrentTransform(this.ctx);
      const canvasGraphicsFactory = {
        createCanvasGraphics: (ctx) => new _CanvasGraphics(ctx, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
          optionalContentConfig: this.optionalContentConfig,
          markedContentStack: this.markedContentStack
        })
      };
      pattern = new TilingPattern(IR, color, this.ctx, canvasGraphicsFactory, baseTransform);
    } else {
      pattern = this._getPattern(IR[1], IR[2]);
    }
    return pattern;
  }
  setStrokeColorN() {
    this.current.strokeColor = this.getColorN_Pattern(arguments);
  }
  setFillColorN() {
    this.current.fillColor = this.getColorN_Pattern(arguments);
    this.current.patternFill = true;
  }
  setStrokeRGBColor(r2, g2, b2) {
    const color = Util.makeHexColor(r2, g2, b2);
    this.ctx.strokeStyle = color;
    this.current.strokeColor = color;
  }
  setFillRGBColor(r2, g2, b2) {
    const color = Util.makeHexColor(r2, g2, b2);
    this.ctx.fillStyle = color;
    this.current.fillColor = color;
    this.current.patternFill = false;
  }
  _getPattern(objId, matrix = null) {
    let pattern;
    if (this.cachedPatterns.has(objId)) {
      pattern = this.cachedPatterns.get(objId);
    } else {
      pattern = getShadingPattern(this.getObject(objId));
      this.cachedPatterns.set(objId, pattern);
    }
    if (matrix) {
      pattern.matrix = matrix;
    }
    return pattern;
  }
  shadingFill(objId) {
    if (!this.contentVisible) {
      return;
    }
    const ctx = this.ctx;
    this.save();
    const pattern = this._getPattern(objId);
    ctx.fillStyle = pattern.getPattern(ctx, this, getCurrentTransformInverse(ctx), PathType.SHADING);
    const inv = getCurrentTransformInverse(ctx);
    if (inv) {
      const {
        width,
        height
      } = ctx.canvas;
      const [x0, y0, x1, y1] = Util.getAxialAlignedBoundingBox([0, 0, width, height], inv);
      this.ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    } else {
      this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
    }
    this.compose(this.current.getClippedPathBoundingBox());
    this.restore();
  }
  beginInlineImage() {
    unreachable("Should not call beginInlineImage");
  }
  beginImageData() {
    unreachable("Should not call beginImageData");
  }
  paintFormXObjectBegin(matrix, bbox) {
    if (!this.contentVisible) {
      return;
    }
    this.save();
    this.baseTransformStack.push(this.baseTransform);
    if (matrix) {
      this.transform(...matrix);
    }
    this.baseTransform = getCurrentTransform(this.ctx);
    if (bbox) {
      const width = bbox[2] - bbox[0];
      const height = bbox[3] - bbox[1];
      this.ctx.rect(bbox[0], bbox[1], width, height);
      this.current.updateRectMinMax(getCurrentTransform(this.ctx), bbox);
      this.clip();
      this.endPath();
    }
  }
  paintFormXObjectEnd() {
    if (!this.contentVisible) {
      return;
    }
    this.restore();
    this.baseTransform = this.baseTransformStack.pop();
  }
  beginGroup(group) {
    if (!this.contentVisible) {
      return;
    }
    this.save();
    if (this.inSMaskMode) {
      this.endSMaskMode();
      this.current.activeSMask = null;
    }
    const currentCtx = this.ctx;
    if (!group.isolated) {
      info("TODO: Support non-isolated groups.");
    }
    if (group.knockout) {
      warn("Knockout groups not supported.");
    }
    const currentTransform = getCurrentTransform(currentCtx);
    if (group.matrix) {
      currentCtx.transform(...group.matrix);
    }
    if (!group.bbox) {
      throw new Error("Bounding box is required.");
    }
    let bounds = Util.getAxialAlignedBoundingBox(group.bbox, getCurrentTransform(currentCtx));
    const canvasBounds = [0, 0, currentCtx.canvas.width, currentCtx.canvas.height];
    bounds = Util.intersect(bounds, canvasBounds) || [0, 0, 0, 0];
    const offsetX = Math.floor(bounds[0]);
    const offsetY = Math.floor(bounds[1]);
    const drawnWidth = Math.max(Math.ceil(bounds[2]) - offsetX, 1);
    const drawnHeight = Math.max(Math.ceil(bounds[3]) - offsetY, 1);
    this.current.startNewPathAndClipBox([0, 0, drawnWidth, drawnHeight]);
    let cacheId = "groupAt" + this.groupLevel;
    if (group.smask) {
      cacheId += "_smask_" + this.smaskCounter++ % 2;
    }
    const scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight);
    const groupCtx = scratchCanvas.context;
    groupCtx.translate(-offsetX, -offsetY);
    groupCtx.transform(...currentTransform);
    if (group.smask) {
      this.smaskStack.push({
        canvas: scratchCanvas.canvas,
        context: groupCtx,
        offsetX,
        offsetY,
        subtype: group.smask.subtype,
        backdrop: group.smask.backdrop,
        transferMap: group.smask.transferMap || null,
        startTransformInverse: null
      });
    } else {
      currentCtx.setTransform(1, 0, 0, 1, 0, 0);
      currentCtx.translate(offsetX, offsetY);
      currentCtx.save();
    }
    copyCtxState(currentCtx, groupCtx);
    this.ctx = groupCtx;
    this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
    this.groupStack.push(currentCtx);
    this.groupLevel++;
  }
  endGroup(group) {
    if (!this.contentVisible) {
      return;
    }
    this.groupLevel--;
    const groupCtx = this.ctx;
    const ctx = this.groupStack.pop();
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
    if (group.smask) {
      this.tempSMask = this.smaskStack.pop();
      this.restore();
    } else {
      this.ctx.restore();
      const currentMtx = getCurrentTransform(this.ctx);
      this.restore();
      this.ctx.save();
      this.ctx.setTransform(...currentMtx);
      const dirtyBox = Util.getAxialAlignedBoundingBox([0, 0, groupCtx.canvas.width, groupCtx.canvas.height], currentMtx);
      this.ctx.drawImage(groupCtx.canvas, 0, 0);
      this.ctx.restore();
      this.compose(dirtyBox);
    }
  }
  beginAnnotation(id, rect, transform, matrix, hasOwnCanvas) {
    __privateMethod(this, _CanvasGraphics_instances, restoreInitialState_fn).call(this);
    resetCtxToDefault(this.ctx);
    this.ctx.save();
    this.save();
    if (this.baseTransform) {
      this.ctx.setTransform(...this.baseTransform);
    }
    if (rect) {
      const width = rect[2] - rect[0];
      const height = rect[3] - rect[1];
      if (hasOwnCanvas && this.annotationCanvasMap) {
        transform = transform.slice();
        transform[4] -= rect[0];
        transform[5] -= rect[1];
        rect = rect.slice();
        rect[0] = rect[1] = 0;
        rect[2] = width;
        rect[3] = height;
        const [scaleX, scaleY] = Util.singularValueDecompose2dScale(getCurrentTransform(this.ctx));
        const {
          viewportScale
        } = this;
        const canvasWidth = Math.ceil(width * this.outputScaleX * viewportScale);
        const canvasHeight = Math.ceil(height * this.outputScaleY * viewportScale);
        this.annotationCanvas = this.canvasFactory.create(canvasWidth, canvasHeight);
        const {
          canvas,
          context
        } = this.annotationCanvas;
        this.annotationCanvasMap.set(id, canvas);
        this.annotationCanvas.savedCtx = this.ctx;
        this.ctx = context;
        this.ctx.save();
        this.ctx.setTransform(scaleX, 0, 0, -scaleY, 0, height * scaleY);
        resetCtxToDefault(this.ctx);
      } else {
        resetCtxToDefault(this.ctx);
        this.ctx.rect(rect[0], rect[1], width, height);
        this.ctx.clip();
        this.endPath();
      }
    }
    this.current = new CanvasExtraState(this.ctx.canvas.width, this.ctx.canvas.height);
    this.transform(...transform);
    this.transform(...matrix);
  }
  endAnnotation() {
    if (this.annotationCanvas) {
      this.ctx.restore();
      __privateMethod(this, _CanvasGraphics_instances, drawFilter_fn).call(this);
      this.ctx = this.annotationCanvas.savedCtx;
      delete this.annotationCanvas.savedCtx;
      delete this.annotationCanvas;
    }
  }
  paintImageMaskXObject(img) {
    if (!this.contentVisible) {
      return;
    }
    const count = img.count;
    img = this.getObject(img.data, img);
    img.count = count;
    const ctx = this.ctx;
    const glyph = this.processingType3;
    if (glyph) {
      if (glyph.compiled === void 0) {
        glyph.compiled = compileType3Glyph(img);
      }
      if (glyph.compiled) {
        glyph.compiled(ctx);
        return;
      }
    }
    const mask = this._createMaskCanvas(img);
    const maskCanvas = mask.canvas;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(maskCanvas, mask.offsetX, mask.offsetY);
    ctx.restore();
    this.compose();
  }
  paintImageMaskXObjectRepeat(img, scaleX, skewX = 0, skewY = 0, scaleY, positions) {
    if (!this.contentVisible) {
      return;
    }
    img = this.getObject(img.data, img);
    const ctx = this.ctx;
    ctx.save();
    const currentTransform = getCurrentTransform(ctx);
    ctx.transform(scaleX, skewX, skewY, scaleY, 0, 0);
    const mask = this._createMaskCanvas(img);
    ctx.setTransform(1, 0, 0, 1, mask.offsetX - currentTransform[4], mask.offsetY - currentTransform[5]);
    for (let i2 = 0, ii = positions.length; i2 < ii; i2 += 2) {
      const trans = Util.transform(currentTransform, [scaleX, skewX, skewY, scaleY, positions[i2], positions[i2 + 1]]);
      const [x2, y2] = Util.applyTransform([0, 0], trans);
      ctx.drawImage(mask.canvas, x2, y2);
    }
    ctx.restore();
    this.compose();
  }
  paintImageMaskXObjectGroup(images) {
    if (!this.contentVisible) {
      return;
    }
    const ctx = this.ctx;
    const fillColor = this.current.fillColor;
    const isPatternFill = this.current.patternFill;
    for (const image of images) {
      const {
        data,
        width,
        height,
        transform
      } = image;
      const maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
      const maskCtx = maskCanvas.context;
      maskCtx.save();
      const img = this.getObject(data, image);
      putBinaryImageMask(maskCtx, img);
      maskCtx.globalCompositeOperation = "source-in";
      maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this, getCurrentTransformInverse(ctx), PathType.FILL) : fillColor;
      maskCtx.fillRect(0, 0, width, height);
      maskCtx.restore();
      ctx.save();
      ctx.transform(...transform);
      ctx.scale(1, -1);
      drawImageAtIntegerCoords(ctx, maskCanvas.canvas, 0, 0, width, height, 0, -1, 1, 1);
      ctx.restore();
    }
    this.compose();
  }
  paintImageXObject(objId) {
    if (!this.contentVisible) {
      return;
    }
    const imgData = this.getObject(objId);
    if (!imgData) {
      warn("Dependent image isn't ready yet");
      return;
    }
    this.paintInlineImageXObject(imgData);
  }
  paintImageXObjectRepeat(objId, scaleX, scaleY, positions) {
    if (!this.contentVisible) {
      return;
    }
    const imgData = this.getObject(objId);
    if (!imgData) {
      warn("Dependent image isn't ready yet");
      return;
    }
    const width = imgData.width;
    const height = imgData.height;
    const map = [];
    for (let i2 = 0, ii = positions.length; i2 < ii; i2 += 2) {
      map.push({
        transform: [scaleX, 0, 0, scaleY, positions[i2], positions[i2 + 1]],
        x: 0,
        y: 0,
        w: width,
        h: height
      });
    }
    this.paintInlineImageXObjectGroup(imgData, map);
  }
  applyTransferMapsToCanvas(ctx) {
    if (this.current.transferMaps !== "none") {
      ctx.filter = this.current.transferMaps;
      ctx.drawImage(ctx.canvas, 0, 0);
      ctx.filter = "none";
    }
    return ctx.canvas;
  }
  applyTransferMapsToBitmap(imgData) {
    if (this.current.transferMaps === "none") {
      return imgData.bitmap;
    }
    const {
      bitmap,
      width,
      height
    } = imgData;
    const tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", width, height);
    const tmpCtx = tmpCanvas.context;
    tmpCtx.filter = this.current.transferMaps;
    tmpCtx.drawImage(bitmap, 0, 0);
    tmpCtx.filter = "none";
    return tmpCanvas.canvas;
  }
  paintInlineImageXObject(imgData) {
    if (!this.contentVisible) {
      return;
    }
    const width = imgData.width;
    const height = imgData.height;
    const ctx = this.ctx;
    this.save();
    if (!isNodeJS) {
      const {
        filter
      } = ctx;
      if (filter !== "none" && filter !== "") {
        ctx.filter = "none";
      }
    }
    ctx.scale(1 / width, -1 / height);
    let imgToPaint;
    if (imgData.bitmap) {
      imgToPaint = this.applyTransferMapsToBitmap(imgData);
    } else if (typeof HTMLElement === "function" && imgData instanceof HTMLElement || !imgData.data) {
      imgToPaint = imgData;
    } else {
      const tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", width, height);
      const tmpCtx = tmpCanvas.context;
      putBinaryImageData(tmpCtx, imgData);
      imgToPaint = this.applyTransferMapsToCanvas(tmpCtx);
    }
    const scaled = this._scaleImage(imgToPaint, getCurrentTransformInverse(ctx));
    ctx.imageSmoothingEnabled = getImageSmoothingEnabled(getCurrentTransform(ctx), imgData.interpolate);
    drawImageAtIntegerCoords(ctx, scaled.img, 0, 0, scaled.paintWidth, scaled.paintHeight, 0, -height, width, height);
    this.compose();
    this.restore();
  }
  paintInlineImageXObjectGroup(imgData, map) {
    if (!this.contentVisible) {
      return;
    }
    const ctx = this.ctx;
    let imgToPaint;
    if (imgData.bitmap) {
      imgToPaint = imgData.bitmap;
    } else {
      const w2 = imgData.width;
      const h = imgData.height;
      const tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", w2, h);
      const tmpCtx = tmpCanvas.context;
      putBinaryImageData(tmpCtx, imgData);
      imgToPaint = this.applyTransferMapsToCanvas(tmpCtx);
    }
    for (const entry of map) {
      ctx.save();
      ctx.transform(...entry.transform);
      ctx.scale(1, -1);
      drawImageAtIntegerCoords(ctx, imgToPaint, entry.x, entry.y, entry.w, entry.h, 0, -1, 1, 1);
      ctx.restore();
    }
    this.compose();
  }
  paintSolidColorImageMask() {
    if (!this.contentVisible) {
      return;
    }
    this.ctx.fillRect(0, 0, 1, 1);
    this.compose();
  }
  markPoint(tag) {
  }
  markPointProps(tag, properties) {
  }
  beginMarkedContent(tag) {
    this.markedContentStack.push({
      visible: true
    });
  }
  beginMarkedContentProps(tag, properties) {
    if (tag === "OC") {
      this.markedContentStack.push({
        visible: this.optionalContentConfig.isVisible(properties)
      });
    } else {
      this.markedContentStack.push({
        visible: true
      });
    }
    this.contentVisible = this.isContentVisible();
  }
  endMarkedContent() {
    this.markedContentStack.pop();
    this.contentVisible = this.isContentVisible();
  }
  beginCompat() {
  }
  endCompat() {
  }
  consumePath(clipBox) {
    const isEmpty = this.current.isEmptyClip();
    if (this.pendingClip) {
      this.current.updateClipFromPath();
    }
    if (!this.pendingClip) {
      this.compose(clipBox);
    }
    const ctx = this.ctx;
    if (this.pendingClip) {
      if (!isEmpty) {
        if (this.pendingClip === EO_CLIP) {
          ctx.clip("evenodd");
        } else {
          ctx.clip();
        }
      }
      this.pendingClip = null;
    }
    this.current.startNewPathAndClipBox(this.current.clipBox);
    ctx.beginPath();
  }
  getSinglePixelWidth() {
    if (!this._cachedGetSinglePixelWidth) {
      const m2 = getCurrentTransform(this.ctx);
      if (m2[1] === 0 && m2[2] === 0) {
        this._cachedGetSinglePixelWidth = 1 / Math.min(Math.abs(m2[0]), Math.abs(m2[3]));
      } else {
        const absDet = Math.abs(m2[0] * m2[3] - m2[2] * m2[1]);
        const normX = Math.hypot(m2[0], m2[2]);
        const normY = Math.hypot(m2[1], m2[3]);
        this._cachedGetSinglePixelWidth = Math.max(normX, normY) / absDet;
      }
    }
    return this._cachedGetSinglePixelWidth;
  }
  getScaleForStroking() {
    if (this._cachedScaleForStroking[0] === -1) {
      const {
        lineWidth
      } = this.current;
      const {
        a: a2,
        b: b2,
        c: c2,
        d: d2
      } = this.ctx.getTransform();
      let scaleX, scaleY;
      if (b2 === 0 && c2 === 0) {
        const normX = Math.abs(a2);
        const normY = Math.abs(d2);
        if (normX === normY) {
          if (lineWidth === 0) {
            scaleX = scaleY = 1 / normX;
          } else {
            const scaledLineWidth = normX * lineWidth;
            scaleX = scaleY = scaledLineWidth < 1 ? 1 / scaledLineWidth : 1;
          }
        } else if (lineWidth === 0) {
          scaleX = 1 / normX;
          scaleY = 1 / normY;
        } else {
          const scaledXLineWidth = normX * lineWidth;
          const scaledYLineWidth = normY * lineWidth;
          scaleX = scaledXLineWidth < 1 ? 1 / scaledXLineWidth : 1;
          scaleY = scaledYLineWidth < 1 ? 1 / scaledYLineWidth : 1;
        }
      } else {
        const absDet = Math.abs(a2 * d2 - b2 * c2);
        const normX = Math.hypot(a2, b2);
        const normY = Math.hypot(c2, d2);
        if (lineWidth === 0) {
          scaleX = normY / absDet;
          scaleY = normX / absDet;
        } else {
          const baseArea = lineWidth * absDet;
          scaleX = normY > baseArea ? normY / baseArea : 1;
          scaleY = normX > baseArea ? normX / baseArea : 1;
        }
      }
      this._cachedScaleForStroking[0] = scaleX;
      this._cachedScaleForStroking[1] = scaleY;
    }
    return this._cachedScaleForStroking;
  }
  rescaleAndStroke(saveRestore) {
    const {
      ctx
    } = this;
    const {
      lineWidth
    } = this.current;
    const [scaleX, scaleY] = this.getScaleForStroking();
    ctx.lineWidth = lineWidth || 1;
    if (scaleX === 1 && scaleY === 1) {
      ctx.stroke();
      return;
    }
    const dashes = ctx.getLineDash();
    if (saveRestore) {
      ctx.save();
    }
    ctx.scale(scaleX, scaleY);
    if (dashes.length > 0) {
      const scale = Math.max(scaleX, scaleY);
      ctx.setLineDash(dashes.map((x2) => x2 / scale));
      ctx.lineDashOffset /= scale;
    }
    ctx.stroke();
    if (saveRestore) {
      ctx.restore();
    }
  }
  isContentVisible() {
    for (let i2 = this.markedContentStack.length - 1; i2 >= 0; i2--) {
      if (!this.markedContentStack[i2].visible) {
        return false;
      }
    }
    return true;
  }
};
_CanvasGraphics_instances = new WeakSet();
restoreInitialState_fn = function() {
  while (this.stateStack.length || this.inSMaskMode) {
    this.restore();
  }
  this.ctx.restore();
  if (this.transparentCanvas) {
    this.ctx = this.compositeCtx;
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.drawImage(this.transparentCanvas, 0, 0);
    this.ctx.restore();
    this.transparentCanvas = null;
  }
};
drawFilter_fn = function() {
  if (this.pageColors) {
    const hcmFilterId = this.filterFactory.addHCMFilter(this.pageColors.foreground, this.pageColors.background);
    if (hcmFilterId !== "none") {
      const savedFilter = this.ctx.filter;
      this.ctx.filter = hcmFilterId;
      this.ctx.drawImage(this.ctx.canvas, 0, 0);
      this.ctx.filter = savedFilter;
    }
  }
};
var CanvasGraphics = _CanvasGraphics;
for (const op in OPS) {
  if (CanvasGraphics.prototype[op] !== void 0) {
    CanvasGraphics.prototype[OPS[op]] = CanvasGraphics.prototype[op];
  }
}
var _port, _src;
var GlobalWorkerOptions = class {
  static get workerPort() {
    return __privateGet(this, _port);
  }
  static set workerPort(val) {
    if (!(typeof Worker !== "undefined" && val instanceof Worker) && val !== null) {
      throw new Error("Invalid `workerPort` type.");
    }
    __privateSet(this, _port, val);
  }
  static get workerSrc() {
    return __privateGet(this, _src);
  }
  static set workerSrc(val) {
    if (typeof val !== "string") {
      throw new Error("Invalid `workerSrc` type.");
    }
    __privateSet(this, _src, val);
  }
};
_port = new WeakMap();
_src = new WeakMap();
__privateAdd(GlobalWorkerOptions, _port, null);
__privateAdd(GlobalWorkerOptions, _src, "");
var CallbackKind = {
  UNKNOWN: 0,
  DATA: 1,
  ERROR: 2
};
var StreamKind = {
  UNKNOWN: 0,
  CANCEL: 1,
  CANCEL_COMPLETE: 2,
  CLOSE: 3,
  ENQUEUE: 4,
  ERROR: 5,
  PULL: 6,
  PULL_COMPLETE: 7,
  START_COMPLETE: 8
};
function wrapReason(reason) {
  if (!(reason instanceof Error || typeof reason === "object" && reason !== null)) {
    unreachable('wrapReason: Expected "reason" to be a (possibly cloned) Error.');
  }
  switch (reason.name) {
    case "AbortException":
      return new AbortException(reason.message);
    case "MissingPDFException":
      return new MissingPDFException(reason.message);
    case "PasswordException":
      return new PasswordException(reason.message, reason.code);
    case "UnexpectedResponseException":
      return new UnexpectedResponseException(reason.message, reason.status);
    case "UnknownErrorException":
      return new UnknownErrorException(reason.message, reason.details);
    default:
      return new UnknownErrorException(reason.message, reason.toString());
  }
}
var _MessageHandler_instances, createStreamSink_fn, processStreamMessage_fn, deleteStreamController_fn;
var MessageHandler = class {
  constructor(sourceName, targetName, comObj) {
    __privateAdd(this, _MessageHandler_instances);
    this.sourceName = sourceName;
    this.targetName = targetName;
    this.comObj = comObj;
    this.callbackId = 1;
    this.streamId = 1;
    this.streamSinks = /* @__PURE__ */ Object.create(null);
    this.streamControllers = /* @__PURE__ */ Object.create(null);
    this.callbackCapabilities = /* @__PURE__ */ Object.create(null);
    this.actionHandler = /* @__PURE__ */ Object.create(null);
    this._onComObjOnMessage = (event) => {
      const data = event.data;
      if (data.targetName !== this.sourceName) {
        return;
      }
      if (data.stream) {
        __privateMethod(this, _MessageHandler_instances, processStreamMessage_fn).call(this, data);
        return;
      }
      if (data.callback) {
        const callbackId = data.callbackId;
        const capability = this.callbackCapabilities[callbackId];
        if (!capability) {
          throw new Error(`Cannot resolve callback ${callbackId}`);
        }
        delete this.callbackCapabilities[callbackId];
        if (data.callback === CallbackKind.DATA) {
          capability.resolve(data.data);
        } else if (data.callback === CallbackKind.ERROR) {
          capability.reject(wrapReason(data.reason));
        } else {
          throw new Error("Unexpected callback case");
        }
        return;
      }
      const action = this.actionHandler[data.action];
      if (!action) {
        throw new Error(`Unknown action from worker: ${data.action}`);
      }
      if (data.callbackId) {
        const cbSourceName = this.sourceName;
        const cbTargetName = data.sourceName;
        new Promise(function(resolve) {
          resolve(action(data.data));
        }).then(function(result) {
          comObj.postMessage({
            sourceName: cbSourceName,
            targetName: cbTargetName,
            callback: CallbackKind.DATA,
            callbackId: data.callbackId,
            data: result
          });
        }, function(reason) {
          comObj.postMessage({
            sourceName: cbSourceName,
            targetName: cbTargetName,
            callback: CallbackKind.ERROR,
            callbackId: data.callbackId,
            reason: wrapReason(reason)
          });
        });
        return;
      }
      if (data.streamId) {
        __privateMethod(this, _MessageHandler_instances, createStreamSink_fn).call(this, data);
        return;
      }
      action(data.data);
    };
    comObj.addEventListener("message", this._onComObjOnMessage);
  }
  on(actionName, handler) {
    const ah = this.actionHandler;
    if (ah[actionName]) {
      throw new Error(`There is already an actionName called "${actionName}"`);
    }
    ah[actionName] = handler;
  }
  send(actionName, data, transfers) {
    this.comObj.postMessage({
      sourceName: this.sourceName,
      targetName: this.targetName,
      action: actionName,
      data
    }, transfers);
  }
  sendWithPromise(actionName, data, transfers) {
    const callbackId = this.callbackId++;
    const capability = Promise.withResolvers();
    this.callbackCapabilities[callbackId] = capability;
    try {
      this.comObj.postMessage({
        sourceName: this.sourceName,
        targetName: this.targetName,
        action: actionName,
        callbackId,
        data
      }, transfers);
    } catch (ex) {
      capability.reject(ex);
    }
    return capability.promise;
  }
  sendWithStream(actionName, data, queueingStrategy, transfers) {
    const streamId = this.streamId++, sourceName = this.sourceName, targetName = this.targetName, comObj = this.comObj;
    return new ReadableStream({
      start: (controller) => {
        const startCapability = Promise.withResolvers();
        this.streamControllers[streamId] = {
          controller,
          startCall: startCapability,
          pullCall: null,
          cancelCall: null,
          isClosed: false
        };
        comObj.postMessage({
          sourceName,
          targetName,
          action: actionName,
          streamId,
          data,
          desiredSize: controller.desiredSize
        }, transfers);
        return startCapability.promise;
      },
      pull: (controller) => {
        const pullCapability = Promise.withResolvers();
        this.streamControllers[streamId].pullCall = pullCapability;
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.PULL,
          streamId,
          desiredSize: controller.desiredSize
        });
        return pullCapability.promise;
      },
      cancel: (reason) => {
        assert(reason instanceof Error, "cancel must have a valid reason");
        const cancelCapability = Promise.withResolvers();
        this.streamControllers[streamId].cancelCall = cancelCapability;
        this.streamControllers[streamId].isClosed = true;
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.CANCEL,
          streamId,
          reason: wrapReason(reason)
        });
        return cancelCapability.promise;
      }
    }, queueingStrategy);
  }
  destroy() {
    this.comObj.removeEventListener("message", this._onComObjOnMessage);
  }
};
_MessageHandler_instances = new WeakSet();
createStreamSink_fn = function(data) {
  const streamId = data.streamId, sourceName = this.sourceName, targetName = data.sourceName, comObj = this.comObj;
  const self = this, action = this.actionHandler[data.action];
  const streamSink = {
    enqueue(chunk, size = 1, transfers) {
      if (this.isCancelled) {
        return;
      }
      const lastDesiredSize = this.desiredSize;
      this.desiredSize -= size;
      if (lastDesiredSize > 0 && this.desiredSize <= 0) {
        this.sinkCapability = Promise.withResolvers();
        this.ready = this.sinkCapability.promise;
      }
      comObj.postMessage({
        sourceName,
        targetName,
        stream: StreamKind.ENQUEUE,
        streamId,
        chunk
      }, transfers);
    },
    close() {
      if (this.isCancelled) {
        return;
      }
      this.isCancelled = true;
      comObj.postMessage({
        sourceName,
        targetName,
        stream: StreamKind.CLOSE,
        streamId
      });
      delete self.streamSinks[streamId];
    },
    error(reason) {
      assert(reason instanceof Error, "error must have a valid reason");
      if (this.isCancelled) {
        return;
      }
      this.isCancelled = true;
      comObj.postMessage({
        sourceName,
        targetName,
        stream: StreamKind.ERROR,
        streamId,
        reason: wrapReason(reason)
      });
    },
    sinkCapability: Promise.withResolvers(),
    onPull: null,
    onCancel: null,
    isCancelled: false,
    desiredSize: data.desiredSize,
    ready: null
  };
  streamSink.sinkCapability.resolve();
  streamSink.ready = streamSink.sinkCapability.promise;
  this.streamSinks[streamId] = streamSink;
  new Promise(function(resolve) {
    resolve(action(data.data, streamSink));
  }).then(function() {
    comObj.postMessage({
      sourceName,
      targetName,
      stream: StreamKind.START_COMPLETE,
      streamId,
      success: true
    });
  }, function(reason) {
    comObj.postMessage({
      sourceName,
      targetName,
      stream: StreamKind.START_COMPLETE,
      streamId,
      reason: wrapReason(reason)
    });
  });
};
processStreamMessage_fn = function(data) {
  const streamId = data.streamId, sourceName = this.sourceName, targetName = data.sourceName, comObj = this.comObj;
  const streamController = this.streamControllers[streamId], streamSink = this.streamSinks[streamId];
  switch (data.stream) {
    case StreamKind.START_COMPLETE:
      if (data.success) {
        streamController.startCall.resolve();
      } else {
        streamController.startCall.reject(wrapReason(data.reason));
      }
      break;
    case StreamKind.PULL_COMPLETE:
      if (data.success) {
        streamController.pullCall.resolve();
      } else {
        streamController.pullCall.reject(wrapReason(data.reason));
      }
      break;
    case StreamKind.PULL:
      if (!streamSink) {
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.PULL_COMPLETE,
          streamId,
          success: true
        });
        break;
      }
      if (streamSink.desiredSize <= 0 && data.desiredSize > 0) {
        streamSink.sinkCapability.resolve();
      }
      streamSink.desiredSize = data.desiredSize;
      new Promise(function(resolve) {
        var _a2;
        resolve((_a2 = streamSink.onPull) == null ? void 0 : _a2.call(streamSink));
      }).then(function() {
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.PULL_COMPLETE,
          streamId,
          success: true
        });
      }, function(reason) {
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.PULL_COMPLETE,
          streamId,
          reason: wrapReason(reason)
        });
      });
      break;
    case StreamKind.ENQUEUE:
      assert(streamController, "enqueue should have stream controller");
      if (streamController.isClosed) {
        break;
      }
      streamController.controller.enqueue(data.chunk);
      break;
    case StreamKind.CLOSE:
      assert(streamController, "close should have stream controller");
      if (streamController.isClosed) {
        break;
      }
      streamController.isClosed = true;
      streamController.controller.close();
      __privateMethod(this, _MessageHandler_instances, deleteStreamController_fn).call(this, streamController, streamId);
      break;
    case StreamKind.ERROR:
      assert(streamController, "error should have stream controller");
      streamController.controller.error(wrapReason(data.reason));
      __privateMethod(this, _MessageHandler_instances, deleteStreamController_fn).call(this, streamController, streamId);
      break;
    case StreamKind.CANCEL_COMPLETE:
      if (data.success) {
        streamController.cancelCall.resolve();
      } else {
        streamController.cancelCall.reject(wrapReason(data.reason));
      }
      __privateMethod(this, _MessageHandler_instances, deleteStreamController_fn).call(this, streamController, streamId);
      break;
    case StreamKind.CANCEL:
      if (!streamSink) {
        break;
      }
      new Promise(function(resolve) {
        var _a2;
        resolve((_a2 = streamSink.onCancel) == null ? void 0 : _a2.call(streamSink, wrapReason(data.reason)));
      }).then(function() {
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.CANCEL_COMPLETE,
          streamId,
          success: true
        });
      }, function(reason) {
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.CANCEL_COMPLETE,
          streamId,
          reason: wrapReason(reason)
        });
      });
      streamSink.sinkCapability.reject(wrapReason(data.reason));
      streamSink.isCancelled = true;
      delete this.streamSinks[streamId];
      break;
    default:
      throw new Error("Unexpected stream case");
  }
};
deleteStreamController_fn = async function(streamController, streamId) {
  var _a2, _b, _c;
  await Promise.allSettled([(_a2 = streamController.startCall) == null ? void 0 : _a2.promise, (_b = streamController.pullCall) == null ? void 0 : _b.promise, (_c = streamController.cancelCall) == null ? void 0 : _c.promise]);
  delete this.streamControllers[streamId];
};
var _metadataMap, _data;
var Metadata = class {
  constructor({
    parsedData,
    rawData
  }) {
    __privateAdd(this, _metadataMap);
    __privateAdd(this, _data);
    __privateSet(this, _metadataMap, parsedData);
    __privateSet(this, _data, rawData);
  }
  getRaw() {
    return __privateGet(this, _data);
  }
  get(name) {
    return __privateGet(this, _metadataMap).get(name) ?? null;
  }
  getAll() {
    return objectFromMap(__privateGet(this, _metadataMap));
  }
  has(name) {
    return __privateGet(this, _metadataMap).has(name);
  }
};
_metadataMap = new WeakMap();
_data = new WeakMap();
var INTERNAL = Symbol("INTERNAL");
var _isDisplay, _isPrint, _userSet, _visible;
var OptionalContentGroup = class {
  constructor(renderingIntent, {
    name,
    intent,
    usage
  }) {
    __privateAdd(this, _isDisplay, false);
    __privateAdd(this, _isPrint, false);
    __privateAdd(this, _userSet, false);
    __privateAdd(this, _visible, true);
    __privateSet(this, _isDisplay, !!(renderingIntent & RenderingIntentFlag.DISPLAY));
    __privateSet(this, _isPrint, !!(renderingIntent & RenderingIntentFlag.PRINT));
    this.name = name;
    this.intent = intent;
    this.usage = usage;
  }
  get visible() {
    if (__privateGet(this, _userSet)) {
      return __privateGet(this, _visible);
    }
    if (!__privateGet(this, _visible)) {
      return false;
    }
    const {
      print,
      view
    } = this.usage;
    if (__privateGet(this, _isDisplay)) {
      return (view == null ? void 0 : view.viewState) !== "OFF";
    } else if (__privateGet(this, _isPrint)) {
      return (print == null ? void 0 : print.printState) !== "OFF";
    }
    return true;
  }
  _setVisible(internal, visible, userSet = false) {
    if (internal !== INTERNAL) {
      unreachable("Internal method `_setVisible` called.");
    }
    __privateSet(this, _userSet, userSet);
    __privateSet(this, _visible, visible);
  }
};
_isDisplay = new WeakMap();
_isPrint = new WeakMap();
_userSet = new WeakMap();
_visible = new WeakMap();
var _cachedGetHash, _groups, _initialHash, _order, _OptionalContentConfig_instances, evaluateVisibilityExpression_fn;
var OptionalContentConfig = class {
  constructor(data, renderingIntent = RenderingIntentFlag.DISPLAY) {
    __privateAdd(this, _OptionalContentConfig_instances);
    __privateAdd(this, _cachedGetHash, null);
    __privateAdd(this, _groups, /* @__PURE__ */ new Map());
    __privateAdd(this, _initialHash, null);
    __privateAdd(this, _order, null);
    this.renderingIntent = renderingIntent;
    this.name = null;
    this.creator = null;
    if (data === null) {
      return;
    }
    this.name = data.name;
    this.creator = data.creator;
    __privateSet(this, _order, data.order);
    for (const group of data.groups) {
      __privateGet(this, _groups).set(group.id, new OptionalContentGroup(renderingIntent, group));
    }
    if (data.baseState === "OFF") {
      for (const group of __privateGet(this, _groups).values()) {
        group._setVisible(INTERNAL, false);
      }
    }
    for (const on of data.on) {
      __privateGet(this, _groups).get(on)._setVisible(INTERNAL, true);
    }
    for (const off of data.off) {
      __privateGet(this, _groups).get(off)._setVisible(INTERNAL, false);
    }
    __privateSet(this, _initialHash, this.getHash());
  }
  isVisible(group) {
    if (__privateGet(this, _groups).size === 0) {
      return true;
    }
    if (!group) {
      info("Optional content group not defined.");
      return true;
    }
    if (group.type === "OCG") {
      if (!__privateGet(this, _groups).has(group.id)) {
        warn(`Optional content group not found: ${group.id}`);
        return true;
      }
      return __privateGet(this, _groups).get(group.id).visible;
    } else if (group.type === "OCMD") {
      if (group.expression) {
        return __privateMethod(this, _OptionalContentConfig_instances, evaluateVisibilityExpression_fn).call(this, group.expression);
      }
      if (!group.policy || group.policy === "AnyOn") {
        for (const id of group.ids) {
          if (!__privateGet(this, _groups).has(id)) {
            warn(`Optional content group not found: ${id}`);
            return true;
          }
          if (__privateGet(this, _groups).get(id).visible) {
            return true;
          }
        }
        return false;
      } else if (group.policy === "AllOn") {
        for (const id of group.ids) {
          if (!__privateGet(this, _groups).has(id)) {
            warn(`Optional content group not found: ${id}`);
            return true;
          }
          if (!__privateGet(this, _groups).get(id).visible) {
            return false;
          }
        }
        return true;
      } else if (group.policy === "AnyOff") {
        for (const id of group.ids) {
          if (!__privateGet(this, _groups).has(id)) {
            warn(`Optional content group not found: ${id}`);
            return true;
          }
          if (!__privateGet(this, _groups).get(id).visible) {
            return true;
          }
        }
        return false;
      } else if (group.policy === "AllOff") {
        for (const id of group.ids) {
          if (!__privateGet(this, _groups).has(id)) {
            warn(`Optional content group not found: ${id}`);
            return true;
          }
          if (__privateGet(this, _groups).get(id).visible) {
            return false;
          }
        }
        return true;
      }
      warn(`Unknown optional content policy ${group.policy}.`);
      return true;
    }
    warn(`Unknown group type ${group.type}.`);
    return true;
  }
  setVisibility(id, visible = true) {
    const group = __privateGet(this, _groups).get(id);
    if (!group) {
      warn(`Optional content group not found: ${id}`);
      return;
    }
    group._setVisible(INTERNAL, !!visible, true);
    __privateSet(this, _cachedGetHash, null);
  }
  setOCGState({
    state,
    preserveRB
  }) {
    let operator;
    for (const elem of state) {
      switch (elem) {
        case "ON":
        case "OFF":
        case "Toggle":
          operator = elem;
          continue;
      }
      const group = __privateGet(this, _groups).get(elem);
      if (!group) {
        continue;
      }
      switch (operator) {
        case "ON":
          group._setVisible(INTERNAL, true);
          break;
        case "OFF":
          group._setVisible(INTERNAL, false);
          break;
        case "Toggle":
          group._setVisible(INTERNAL, !group.visible);
          break;
      }
    }
    __privateSet(this, _cachedGetHash, null);
  }
  get hasInitialVisibility() {
    return __privateGet(this, _initialHash) === null || this.getHash() === __privateGet(this, _initialHash);
  }
  getOrder() {
    if (!__privateGet(this, _groups).size) {
      return null;
    }
    if (__privateGet(this, _order)) {
      return __privateGet(this, _order).slice();
    }
    return [...__privateGet(this, _groups).keys()];
  }
  getGroups() {
    return __privateGet(this, _groups).size > 0 ? objectFromMap(__privateGet(this, _groups)) : null;
  }
  getGroup(id) {
    return __privateGet(this, _groups).get(id) || null;
  }
  getHash() {
    if (__privateGet(this, _cachedGetHash) !== null) {
      return __privateGet(this, _cachedGetHash);
    }
    const hash = new MurmurHash3_64();
    for (const [id, group] of __privateGet(this, _groups)) {
      hash.update(`${id}:${group.visible}`);
    }
    return __privateSet(this, _cachedGetHash, hash.hexdigest());
  }
};
_cachedGetHash = new WeakMap();
_groups = new WeakMap();
_initialHash = new WeakMap();
_order = new WeakMap();
_OptionalContentConfig_instances = new WeakSet();
evaluateVisibilityExpression_fn = function(array) {
  const length = array.length;
  if (length < 2) {
    return true;
  }
  const operator = array[0];
  for (let i2 = 1; i2 < length; i2++) {
    const element = array[i2];
    let state;
    if (Array.isArray(element)) {
      state = __privateMethod(this, _OptionalContentConfig_instances, evaluateVisibilityExpression_fn).call(this, element);
    } else if (__privateGet(this, _groups).has(element)) {
      state = __privateGet(this, _groups).get(element).visible;
    } else {
      warn(`Optional content group not found: ${element}`);
      return true;
    }
    switch (operator) {
      case "And":
        if (!state) {
          return false;
        }
        break;
      case "Or":
        if (state) {
          return true;
        }
        break;
      case "Not":
        return !state;
      default:
        return true;
    }
  }
  return operator === "And";
};
var PDFDataTransportStream = class {
  constructor(pdfDataRangeTransport, {
    disableRange = false,
    disableStream = false
  }) {
    assert(pdfDataRangeTransport, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.');
    const {
      length,
      initialData,
      progressiveDone,
      contentDispositionFilename
    } = pdfDataRangeTransport;
    this._queuedChunks = [];
    this._progressiveDone = progressiveDone;
    this._contentDispositionFilename = contentDispositionFilename;
    if ((initialData == null ? void 0 : initialData.length) > 0) {
      const buffer = initialData instanceof Uint8Array && initialData.byteLength === initialData.buffer.byteLength ? initialData.buffer : new Uint8Array(initialData).buffer;
      this._queuedChunks.push(buffer);
    }
    this._pdfDataRangeTransport = pdfDataRangeTransport;
    this._isStreamingSupported = !disableStream;
    this._isRangeSupported = !disableRange;
    this._contentLength = length;
    this._fullRequestReader = null;
    this._rangeReaders = [];
    pdfDataRangeTransport.addRangeListener((begin, chunk) => {
      this._onReceiveData({
        begin,
        chunk
      });
    });
    pdfDataRangeTransport.addProgressListener((loaded, total) => {
      this._onProgress({
        loaded,
        total
      });
    });
    pdfDataRangeTransport.addProgressiveReadListener((chunk) => {
      this._onReceiveData({
        chunk
      });
    });
    pdfDataRangeTransport.addProgressiveDoneListener(() => {
      this._onProgressiveDone();
    });
    pdfDataRangeTransport.transportReady();
  }
  _onReceiveData({
    begin,
    chunk
  }) {
    const buffer = chunk instanceof Uint8Array && chunk.byteLength === chunk.buffer.byteLength ? chunk.buffer : new Uint8Array(chunk).buffer;
    if (begin === void 0) {
      if (this._fullRequestReader) {
        this._fullRequestReader._enqueue(buffer);
      } else {
        this._queuedChunks.push(buffer);
      }
    } else {
      const found = this._rangeReaders.some(function(rangeReader) {
        if (rangeReader._begin !== begin) {
          return false;
        }
        rangeReader._enqueue(buffer);
        return true;
      });
      assert(found, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found.");
    }
  }
  get _progressiveDataLength() {
    var _a2;
    return ((_a2 = this._fullRequestReader) == null ? void 0 : _a2._loaded) ?? 0;
  }
  _onProgress(evt) {
    var _a2, _b, _c, _d;
    if (evt.total === void 0) {
      (_b = (_a2 = this._rangeReaders[0]) == null ? void 0 : _a2.onProgress) == null ? void 0 : _b.call(_a2, {
        loaded: evt.loaded
      });
    } else {
      (_d = (_c = this._fullRequestReader) == null ? void 0 : _c.onProgress) == null ? void 0 : _d.call(_c, {
        loaded: evt.loaded,
        total: evt.total
      });
    }
  }
  _onProgressiveDone() {
    var _a2;
    (_a2 = this._fullRequestReader) == null ? void 0 : _a2.progressiveDone();
    this._progressiveDone = true;
  }
  _removeRangeReader(reader) {
    const i2 = this._rangeReaders.indexOf(reader);
    if (i2 >= 0) {
      this._rangeReaders.splice(i2, 1);
    }
  }
  getFullReader() {
    assert(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once.");
    const queuedChunks = this._queuedChunks;
    this._queuedChunks = null;
    return new PDFDataTransportStreamReader(this, queuedChunks, this._progressiveDone, this._contentDispositionFilename);
  }
  getRangeReader(begin, end) {
    if (end <= this._progressiveDataLength) {
      return null;
    }
    const reader = new PDFDataTransportStreamRangeReader(this, begin, end);
    this._pdfDataRangeTransport.requestDataRange(begin, end);
    this._rangeReaders.push(reader);
    return reader;
  }
  cancelAllRequests(reason) {
    var _a2;
    (_a2 = this._fullRequestReader) == null ? void 0 : _a2.cancel(reason);
    for (const reader of this._rangeReaders.slice(0)) {
      reader.cancel(reason);
    }
    this._pdfDataRangeTransport.abort();
  }
};
var PDFDataTransportStreamReader = class {
  constructor(stream, queuedChunks, progressiveDone = false, contentDispositionFilename = null) {
    this._stream = stream;
    this._done = progressiveDone || false;
    this._filename = isPdfFile(contentDispositionFilename) ? contentDispositionFilename : null;
    this._queuedChunks = queuedChunks || [];
    this._loaded = 0;
    for (const chunk of this._queuedChunks) {
      this._loaded += chunk.byteLength;
    }
    this._requests = [];
    this._headersReady = Promise.resolve();
    stream._fullRequestReader = this;
    this.onProgress = null;
  }
  _enqueue(chunk) {
    if (this._done) {
      return;
    }
    if (this._requests.length > 0) {
      const requestCapability = this._requests.shift();
      requestCapability.resolve({
        value: chunk,
        done: false
      });
    } else {
      this._queuedChunks.push(chunk);
    }
    this._loaded += chunk.byteLength;
  }
  get headersReady() {
    return this._headersReady;
  }
  get filename() {
    return this._filename;
  }
  get isRangeSupported() {
    return this._stream._isRangeSupported;
  }
  get isStreamingSupported() {
    return this._stream._isStreamingSupported;
  }
  get contentLength() {
    return this._stream._contentLength;
  }
  async read() {
    if (this._queuedChunks.length > 0) {
      const chunk = this._queuedChunks.shift();
      return {
        value: chunk,
        done: false
      };
    }
    if (this._done) {
      return {
        value: void 0,
        done: true
      };
    }
    const requestCapability = Promise.withResolvers();
    this._requests.push(requestCapability);
    return requestCapability.promise;
  }
  cancel(reason) {
    this._done = true;
    for (const requestCapability of this._requests) {
      requestCapability.resolve({
        value: void 0,
        done: true
      });
    }
    this._requests.length = 0;
  }
  progressiveDone() {
    if (this._done) {
      return;
    }
    this._done = true;
  }
};
var PDFDataTransportStreamRangeReader = class {
  constructor(stream, begin, end) {
    this._stream = stream;
    this._begin = begin;
    this._end = end;
    this._queuedChunk = null;
    this._requests = [];
    this._done = false;
    this.onProgress = null;
  }
  _enqueue(chunk) {
    if (this._done) {
      return;
    }
    if (this._requests.length === 0) {
      this._queuedChunk = chunk;
    } else {
      const requestsCapability = this._requests.shift();
      requestsCapability.resolve({
        value: chunk,
        done: false
      });
      for (const requestCapability of this._requests) {
        requestCapability.resolve({
          value: void 0,
          done: true
        });
      }
      this._requests.length = 0;
    }
    this._done = true;
    this._stream._removeRangeReader(this);
  }
  get isStreamingSupported() {
    return false;
  }
  async read() {
    if (this._queuedChunk) {
      const chunk = this._queuedChunk;
      this._queuedChunk = null;
      return {
        value: chunk,
        done: false
      };
    }
    if (this._done) {
      return {
        value: void 0,
        done: true
      };
    }
    const requestCapability = Promise.withResolvers();
    this._requests.push(requestCapability);
    return requestCapability.promise;
  }
  cancel(reason) {
    this._done = true;
    for (const requestCapability of this._requests) {
      requestCapability.resolve({
        value: void 0,
        done: true
      });
    }
    this._requests.length = 0;
    this._stream._removeRangeReader(this);
  }
};
function getFilenameFromContentDispositionHeader(contentDisposition) {
  let needsEncodingFixup = true;
  let tmp = toParamRegExp("filename\\*", "i").exec(contentDisposition);
  if (tmp) {
    tmp = tmp[1];
    let filename = rfc2616unquote(tmp);
    filename = unescape(filename);
    filename = rfc5987decode(filename);
    filename = rfc2047decode(filename);
    return fixupEncoding(filename);
  }
  tmp = rfc2231getparam(contentDisposition);
  if (tmp) {
    const filename = rfc2047decode(tmp);
    return fixupEncoding(filename);
  }
  tmp = toParamRegExp("filename", "i").exec(contentDisposition);
  if (tmp) {
    tmp = tmp[1];
    let filename = rfc2616unquote(tmp);
    filename = rfc2047decode(filename);
    return fixupEncoding(filename);
  }
  function toParamRegExp(attributePattern, flags) {
    return new RegExp("(?:^|;)\\s*" + attributePattern + '\\s*=\\s*([^";\\s][^;\\s]*|"(?:[^"\\\\]|\\\\"?)+"?)', flags);
  }
  function textdecode(encoding, value) {
    if (encoding) {
      if (!/^[\x00-\xFF]+$/.test(value)) {
        return value;
      }
      try {
        const decoder = new TextDecoder(encoding, {
          fatal: true
        });
        const buffer = stringToBytes(value);
        value = decoder.decode(buffer);
        needsEncodingFixup = false;
      } catch {
      }
    }
    return value;
  }
  function fixupEncoding(value) {
    if (needsEncodingFixup && /[\x80-\xff]/.test(value)) {
      value = textdecode("utf-8", value);
      if (needsEncodingFixup) {
        value = textdecode("iso-8859-1", value);
      }
    }
    return value;
  }
  function rfc2231getparam(contentDispositionStr) {
    const matches = [];
    let match;
    const iter = toParamRegExp("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");
    while ((match = iter.exec(contentDispositionStr)) !== null) {
      let [, n2, quot, part] = match;
      n2 = parseInt(n2, 10);
      if (n2 in matches) {
        if (n2 === 0) {
          break;
        }
        continue;
      }
      matches[n2] = [quot, part];
    }
    const parts = [];
    for (let n2 = 0; n2 < matches.length; ++n2) {
      if (!(n2 in matches)) {
        break;
      }
      let [quot, part] = matches[n2];
      part = rfc2616unquote(part);
      if (quot) {
        part = unescape(part);
        if (n2 === 0) {
          part = rfc5987decode(part);
        }
      }
      parts.push(part);
    }
    return parts.join("");
  }
  function rfc2616unquote(value) {
    if (value.startsWith('"')) {
      const parts = value.slice(1).split('\\"');
      for (let i2 = 0; i2 < parts.length; ++i2) {
        const quotindex = parts[i2].indexOf('"');
        if (quotindex !== -1) {
          parts[i2] = parts[i2].slice(0, quotindex);
          parts.length = i2 + 1;
        }
        parts[i2] = parts[i2].replaceAll(/\\(.)/g, "$1");
      }
      value = parts.join('"');
    }
    return value;
  }
  function rfc5987decode(extvalue) {
    const encodingend = extvalue.indexOf("'");
    if (encodingend === -1) {
      return extvalue;
    }
    const encoding = extvalue.slice(0, encodingend);
    const langvalue = extvalue.slice(encodingend + 1);
    const value = langvalue.replace(/^[^']*'/, "");
    return textdecode(encoding, value);
  }
  function rfc2047decode(value) {
    if (!value.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(value)) {
      return value;
    }
    return value.replaceAll(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function(matches, charset, encoding, text) {
      if (encoding === "q" || encoding === "Q") {
        text = text.replaceAll("_", " ");
        text = text.replaceAll(/=([0-9a-fA-F]{2})/g, function(match, hex) {
          return String.fromCharCode(parseInt(hex, 16));
        });
        return textdecode(charset, text);
      }
      try {
        text = atob(text);
      } catch {
      }
      return textdecode(charset, text);
    });
  }
  return "";
}
function validateRangeRequestCapabilities({
  getResponseHeader,
  isHttp,
  rangeChunkSize,
  disableRange
}) {
  const returnValues = {
    allowRangeRequests: false,
    suggestedLength: void 0
  };
  const length = parseInt(getResponseHeader("Content-Length"), 10);
  if (!Number.isInteger(length)) {
    return returnValues;
  }
  returnValues.suggestedLength = length;
  if (length <= 2 * rangeChunkSize) {
    return returnValues;
  }
  if (disableRange || !isHttp) {
    return returnValues;
  }
  if (getResponseHeader("Accept-Ranges") !== "bytes") {
    return returnValues;
  }
  const contentEncoding = getResponseHeader("Content-Encoding") || "identity";
  if (contentEncoding !== "identity") {
    return returnValues;
  }
  returnValues.allowRangeRequests = true;
  return returnValues;
}
function extractFilenameFromHeader(getResponseHeader) {
  const contentDisposition = getResponseHeader("Content-Disposition");
  if (contentDisposition) {
    let filename = getFilenameFromContentDispositionHeader(contentDisposition);
    if (filename.includes("%")) {
      try {
        filename = decodeURIComponent(filename);
      } catch {
      }
    }
    if (isPdfFile(filename)) {
      return filename;
    }
  }
  return null;
}
function createResponseStatusError(status, url) {
  if (status === 404 || status === 0 && url.startsWith("file:")) {
    return new MissingPDFException('Missing PDF "' + url + '".');
  }
  return new UnexpectedResponseException(`Unexpected server response (${status}) while retrieving PDF "${url}".`, status);
}
function validateResponseStatus(status) {
  return status === 200 || status === 206;
}
function createFetchOptions(headers, withCredentials, abortController) {
  return {
    method: "GET",
    headers,
    signal: abortController.signal,
    mode: "cors",
    credentials: withCredentials ? "include" : "same-origin",
    redirect: "follow"
  };
}
function createHeaders(httpHeaders) {
  const headers = new Headers();
  for (const property in httpHeaders) {
    const value = httpHeaders[property];
    if (value === void 0) {
      continue;
    }
    headers.append(property, value);
  }
  return headers;
}
function getArrayBuffer(val) {
  if (val instanceof Uint8Array) {
    return val.buffer;
  }
  if (val instanceof ArrayBuffer) {
    return val;
  }
  warn(`getArrayBuffer - unexpected data format: ${val}`);
  return new Uint8Array(val).buffer;
}
var PDFFetchStream = class {
  constructor(source) {
    this.source = source;
    this.isHttp = /^https?:/i.test(source.url);
    this.httpHeaders = this.isHttp && source.httpHeaders || {};
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  }
  get _progressiveDataLength() {
    var _a2;
    return ((_a2 = this._fullRequestReader) == null ? void 0 : _a2._loaded) ?? 0;
  }
  getFullReader() {
    assert(!this._fullRequestReader, "PDFFetchStream.getFullReader can only be called once.");
    this._fullRequestReader = new PDFFetchStreamReader(this);
    return this._fullRequestReader;
  }
  getRangeReader(begin, end) {
    if (end <= this._progressiveDataLength) {
      return null;
    }
    const reader = new PDFFetchStreamRangeReader(this, begin, end);
    this._rangeRequestReaders.push(reader);
    return reader;
  }
  cancelAllRequests(reason) {
    var _a2;
    (_a2 = this._fullRequestReader) == null ? void 0 : _a2.cancel(reason);
    for (const reader of this._rangeRequestReaders.slice(0)) {
      reader.cancel(reason);
    }
  }
};
var PDFFetchStreamReader = class {
  constructor(stream) {
    this._stream = stream;
    this._reader = null;
    this._loaded = 0;
    this._filename = null;
    const source = stream.source;
    this._withCredentials = source.withCredentials || false;
    this._contentLength = source.length;
    this._headersCapability = Promise.withResolvers();
    this._disableRange = source.disableRange || false;
    this._rangeChunkSize = source.rangeChunkSize;
    if (!this._rangeChunkSize && !this._disableRange) {
      this._disableRange = true;
    }
    this._abortController = new AbortController();
    this._isStreamingSupported = !source.disableStream;
    this._isRangeSupported = !source.disableRange;
    this._headers = createHeaders(this._stream.httpHeaders);
    const url = source.url;
    fetch(url, createFetchOptions(this._headers, this._withCredentials, this._abortController)).then((response) => {
      if (!validateResponseStatus(response.status)) {
        throw createResponseStatusError(response.status, url);
      }
      this._reader = response.body.getReader();
      this._headersCapability.resolve();
      const getResponseHeader = (name) => response.headers.get(name);
      const {
        allowRangeRequests,
        suggestedLength
      } = validateRangeRequestCapabilities({
        getResponseHeader,
        isHttp: this._stream.isHttp,
        rangeChunkSize: this._rangeChunkSize,
        disableRange: this._disableRange
      });
      this._isRangeSupported = allowRangeRequests;
      this._contentLength = suggestedLength || this._contentLength;
      this._filename = extractFilenameFromHeader(getResponseHeader);
      if (!this._isStreamingSupported && this._isRangeSupported) {
        this.cancel(new AbortException("Streaming is disabled."));
      }
    }).catch(this._headersCapability.reject);
    this.onProgress = null;
  }
  get headersReady() {
    return this._headersCapability.promise;
  }
  get filename() {
    return this._filename;
  }
  get contentLength() {
    return this._contentLength;
  }
  get isRangeSupported() {
    return this._isRangeSupported;
  }
  get isStreamingSupported() {
    return this._isStreamingSupported;
  }
  async read() {
    var _a2;
    await this._headersCapability.promise;
    const {
      value,
      done
    } = await this._reader.read();
    if (done) {
      return {
        value,
        done
      };
    }
    this._loaded += value.byteLength;
    (_a2 = this.onProgress) == null ? void 0 : _a2.call(this, {
      loaded: this._loaded,
      total: this._contentLength
    });
    return {
      value: getArrayBuffer(value),
      done: false
    };
  }
  cancel(reason) {
    var _a2;
    (_a2 = this._reader) == null ? void 0 : _a2.cancel(reason);
    this._abortController.abort();
  }
};
var PDFFetchStreamRangeReader = class {
  constructor(stream, begin, end) {
    this._stream = stream;
    this._reader = null;
    this._loaded = 0;
    const source = stream.source;
    this._withCredentials = source.withCredentials || false;
    this._readCapability = Promise.withResolvers();
    this._isStreamingSupported = !source.disableStream;
    this._abortController = new AbortController();
    this._headers = createHeaders(this._stream.httpHeaders);
    this._headers.append("Range", `bytes=${begin}-${end - 1}`);
    const url = source.url;
    fetch(url, createFetchOptions(this._headers, this._withCredentials, this._abortController)).then((response) => {
      if (!validateResponseStatus(response.status)) {
        throw createResponseStatusError(response.status, url);
      }
      this._readCapability.resolve();
      this._reader = response.body.getReader();
    }).catch(this._readCapability.reject);
    this.onProgress = null;
  }
  get isStreamingSupported() {
    return this._isStreamingSupported;
  }
  async read() {
    var _a2;
    await this._readCapability.promise;
    const {
      value,
      done
    } = await this._reader.read();
    if (done) {
      return {
        value,
        done
      };
    }
    this._loaded += value.byteLength;
    (_a2 = this.onProgress) == null ? void 0 : _a2.call(this, {
      loaded: this._loaded
    });
    return {
      value: getArrayBuffer(value),
      done: false
    };
  }
  cancel(reason) {
    var _a2;
    (_a2 = this._reader) == null ? void 0 : _a2.cancel(reason);
    this._abortController.abort();
  }
};
var OK_RESPONSE = 200;
var PARTIAL_CONTENT_RESPONSE = 206;
function network_getArrayBuffer(xhr) {
  const data = xhr.response;
  if (typeof data !== "string") {
    return data;
  }
  return stringToBytes(data).buffer;
}
var NetworkManager = class {
  constructor(url, args = {}) {
    this.url = url;
    this.isHttp = /^https?:/i.test(url);
    this.httpHeaders = this.isHttp && args.httpHeaders || /* @__PURE__ */ Object.create(null);
    this.withCredentials = args.withCredentials || false;
    this.currXhrId = 0;
    this.pendingRequests = /* @__PURE__ */ Object.create(null);
  }
  requestRange(begin, end, listeners) {
    const args = {
      begin,
      end
    };
    for (const prop in listeners) {
      args[prop] = listeners[prop];
    }
    return this.request(args);
  }
  requestFull(listeners) {
    return this.request(listeners);
  }
  request(args) {
    const xhr = new XMLHttpRequest();
    const xhrId = this.currXhrId++;
    const pendingRequest = this.pendingRequests[xhrId] = {
      xhr
    };
    xhr.open("GET", this.url);
    xhr.withCredentials = this.withCredentials;
    for (const property in this.httpHeaders) {
      const value = this.httpHeaders[property];
      if (value === void 0) {
        continue;
      }
      xhr.setRequestHeader(property, value);
    }
    if (this.isHttp && "begin" in args && "end" in args) {
      xhr.setRequestHeader("Range", `bytes=${args.begin}-${args.end - 1}`);
      pendingRequest.expectedStatus = PARTIAL_CONTENT_RESPONSE;
    } else {
      pendingRequest.expectedStatus = OK_RESPONSE;
    }
    xhr.responseType = "arraybuffer";
    if (args.onError) {
      xhr.onerror = function(evt) {
        args.onError(xhr.status);
      };
    }
    xhr.onreadystatechange = this.onStateChange.bind(this, xhrId);
    xhr.onprogress = this.onProgress.bind(this, xhrId);
    pendingRequest.onHeadersReceived = args.onHeadersReceived;
    pendingRequest.onDone = args.onDone;
    pendingRequest.onError = args.onError;
    pendingRequest.onProgress = args.onProgress;
    xhr.send(null);
    return xhrId;
  }
  onProgress(xhrId, evt) {
    var _a2;
    const pendingRequest = this.pendingRequests[xhrId];
    if (!pendingRequest) {
      return;
    }
    (_a2 = pendingRequest.onProgress) == null ? void 0 : _a2.call(pendingRequest, evt);
  }
  onStateChange(xhrId, evt) {
    var _a2, _b, _c;
    const pendingRequest = this.pendingRequests[xhrId];
    if (!pendingRequest) {
      return;
    }
    const xhr = pendingRequest.xhr;
    if (xhr.readyState >= 2 && pendingRequest.onHeadersReceived) {
      pendingRequest.onHeadersReceived();
      delete pendingRequest.onHeadersReceived;
    }
    if (xhr.readyState !== 4) {
      return;
    }
    if (!(xhrId in this.pendingRequests)) {
      return;
    }
    delete this.pendingRequests[xhrId];
    if (xhr.status === 0 && this.isHttp) {
      (_a2 = pendingRequest.onError) == null ? void 0 : _a2.call(pendingRequest, xhr.status);
      return;
    }
    const xhrStatus = xhr.status || OK_RESPONSE;
    const ok_response_on_range_request = xhrStatus === OK_RESPONSE && pendingRequest.expectedStatus === PARTIAL_CONTENT_RESPONSE;
    if (!ok_response_on_range_request && xhrStatus !== pendingRequest.expectedStatus) {
      (_b = pendingRequest.onError) == null ? void 0 : _b.call(pendingRequest, xhr.status);
      return;
    }
    const chunk = network_getArrayBuffer(xhr);
    if (xhrStatus === PARTIAL_CONTENT_RESPONSE) {
      const rangeHeader = xhr.getResponseHeader("Content-Range");
      const matches = /bytes (\d+)-(\d+)\/(\d+)/.exec(rangeHeader);
      pendingRequest.onDone({
        begin: parseInt(matches[1], 10),
        chunk
      });
    } else if (chunk) {
      pendingRequest.onDone({
        begin: 0,
        chunk
      });
    } else {
      (_c = pendingRequest.onError) == null ? void 0 : _c.call(pendingRequest, xhr.status);
    }
  }
  getRequestXhr(xhrId) {
    return this.pendingRequests[xhrId].xhr;
  }
  isPendingRequest(xhrId) {
    return xhrId in this.pendingRequests;
  }
  abortRequest(xhrId) {
    const xhr = this.pendingRequests[xhrId].xhr;
    delete this.pendingRequests[xhrId];
    xhr.abort();
  }
};
var PDFNetworkStream = class {
  constructor(source) {
    this._source = source;
    this._manager = new NetworkManager(source.url, {
      httpHeaders: source.httpHeaders,
      withCredentials: source.withCredentials
    });
    this._rangeChunkSize = source.rangeChunkSize;
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  }
  _onRangeRequestReaderClosed(reader) {
    const i2 = this._rangeRequestReaders.indexOf(reader);
    if (i2 >= 0) {
      this._rangeRequestReaders.splice(i2, 1);
    }
  }
  getFullReader() {
    assert(!this._fullRequestReader, "PDFNetworkStream.getFullReader can only be called once.");
    this._fullRequestReader = new PDFNetworkStreamFullRequestReader(this._manager, this._source);
    return this._fullRequestReader;
  }
  getRangeReader(begin, end) {
    const reader = new PDFNetworkStreamRangeRequestReader(this._manager, begin, end);
    reader.onClosed = this._onRangeRequestReaderClosed.bind(this);
    this._rangeRequestReaders.push(reader);
    return reader;
  }
  cancelAllRequests(reason) {
    var _a2;
    (_a2 = this._fullRequestReader) == null ? void 0 : _a2.cancel(reason);
    for (const reader of this._rangeRequestReaders.slice(0)) {
      reader.cancel(reason);
    }
  }
};
var PDFNetworkStreamFullRequestReader = class {
  constructor(manager, source) {
    this._manager = manager;
    const args = {
      onHeadersReceived: this._onHeadersReceived.bind(this),
      onDone: this._onDone.bind(this),
      onError: this._onError.bind(this),
      onProgress: this._onProgress.bind(this)
    };
    this._url = source.url;
    this._fullRequestId = manager.requestFull(args);
    this._headersReceivedCapability = Promise.withResolvers();
    this._disableRange = source.disableRange || false;
    this._contentLength = source.length;
    this._rangeChunkSize = source.rangeChunkSize;
    if (!this._rangeChunkSize && !this._disableRange) {
      this._disableRange = true;
    }
    this._isStreamingSupported = false;
    this._isRangeSupported = false;
    this._cachedChunks = [];
    this._requests = [];
    this._done = false;
    this._storedError = void 0;
    this._filename = null;
    this.onProgress = null;
  }
  _onHeadersReceived() {
    const fullRequestXhrId = this._fullRequestId;
    const fullRequestXhr = this._manager.getRequestXhr(fullRequestXhrId);
    const getResponseHeader = (name) => fullRequestXhr.getResponseHeader(name);
    const {
      allowRangeRequests,
      suggestedLength
    } = validateRangeRequestCapabilities({
      getResponseHeader,
      isHttp: this._manager.isHttp,
      rangeChunkSize: this._rangeChunkSize,
      disableRange: this._disableRange
    });
    if (allowRangeRequests) {
      this._isRangeSupported = true;
    }
    this._contentLength = suggestedLength || this._contentLength;
    this._filename = extractFilenameFromHeader(getResponseHeader);
    if (this._isRangeSupported) {
      this._manager.abortRequest(fullRequestXhrId);
    }
    this._headersReceivedCapability.resolve();
  }
  _onDone(data) {
    if (data) {
      if (this._requests.length > 0) {
        const requestCapability = this._requests.shift();
        requestCapability.resolve({
          value: data.chunk,
          done: false
        });
      } else {
        this._cachedChunks.push(data.chunk);
      }
    }
    this._done = true;
    if (this._cachedChunks.length > 0) {
      return;
    }
    for (const requestCapability of this._requests) {
      requestCapability.resolve({
        value: void 0,
        done: true
      });
    }
    this._requests.length = 0;
  }
  _onError(status) {
    this._storedError = createResponseStatusError(status, this._url);
    this._headersReceivedCapability.reject(this._storedError);
    for (const requestCapability of this._requests) {
      requestCapability.reject(this._storedError);
    }
    this._requests.length = 0;
    this._cachedChunks.length = 0;
  }
  _onProgress(evt) {
    var _a2;
    (_a2 = this.onProgress) == null ? void 0 : _a2.call(this, {
      loaded: evt.loaded,
      total: evt.lengthComputable ? evt.total : this._contentLength
    });
  }
  get filename() {
    return this._filename;
  }
  get isRangeSupported() {
    return this._isRangeSupported;
  }
  get isStreamingSupported() {
    return this._isStreamingSupported;
  }
  get contentLength() {
    return this._contentLength;
  }
  get headersReady() {
    return this._headersReceivedCapability.promise;
  }
  async read() {
    if (this._storedError) {
      throw this._storedError;
    }
    if (this._cachedChunks.length > 0) {
      const chunk = this._cachedChunks.shift();
      return {
        value: chunk,
        done: false
      };
    }
    if (this._done) {
      return {
        value: void 0,
        done: true
      };
    }
    const requestCapability = Promise.withResolvers();
    this._requests.push(requestCapability);
    return requestCapability.promise;
  }
  cancel(reason) {
    this._done = true;
    this._headersReceivedCapability.reject(reason);
    for (const requestCapability of this._requests) {
      requestCapability.resolve({
        value: void 0,
        done: true
      });
    }
    this._requests.length = 0;
    if (this._manager.isPendingRequest(this._fullRequestId)) {
      this._manager.abortRequest(this._fullRequestId);
    }
    this._fullRequestReader = null;
  }
};
var PDFNetworkStreamRangeRequestReader = class {
  constructor(manager, begin, end) {
    this._manager = manager;
    const args = {
      onDone: this._onDone.bind(this),
      onError: this._onError.bind(this),
      onProgress: this._onProgress.bind(this)
    };
    this._url = manager.url;
    this._requestId = manager.requestRange(begin, end, args);
    this._requests = [];
    this._queuedChunk = null;
    this._done = false;
    this._storedError = void 0;
    this.onProgress = null;
    this.onClosed = null;
  }
  _close() {
    var _a2;
    (_a2 = this.onClosed) == null ? void 0 : _a2.call(this, this);
  }
  _onDone(data) {
    const chunk = data.chunk;
    if (this._requests.length > 0) {
      const requestCapability = this._requests.shift();
      requestCapability.resolve({
        value: chunk,
        done: false
      });
    } else {
      this._queuedChunk = chunk;
    }
    this._done = true;
    for (const requestCapability of this._requests) {
      requestCapability.resolve({
        value: void 0,
        done: true
      });
    }
    this._requests.length = 0;
    this._close();
  }
  _onError(status) {
    this._storedError = createResponseStatusError(status, this._url);
    for (const requestCapability of this._requests) {
      requestCapability.reject(this._storedError);
    }
    this._requests.length = 0;
    this._queuedChunk = null;
  }
  _onProgress(evt) {
    var _a2;
    if (!this.isStreamingSupported) {
      (_a2 = this.onProgress) == null ? void 0 : _a2.call(this, {
        loaded: evt.loaded
      });
    }
  }
  get isStreamingSupported() {
    return false;
  }
  async read() {
    if (this._storedError) {
      throw this._storedError;
    }
    if (this._queuedChunk !== null) {
      const chunk = this._queuedChunk;
      this._queuedChunk = null;
      return {
        value: chunk,
        done: false
      };
    }
    if (this._done) {
      return {
        value: void 0,
        done: true
      };
    }
    const requestCapability = Promise.withResolvers();
    this._requests.push(requestCapability);
    return requestCapability.promise;
  }
  cancel(reason) {
    this._done = true;
    for (const requestCapability of this._requests) {
      requestCapability.resolve({
        value: void 0,
        done: true
      });
    }
    this._requests.length = 0;
    if (this._manager.isPendingRequest(this._requestId)) {
      this._manager.abortRequest(this._requestId);
    }
    this._close();
  }
};
var fileUriRegex = /^file:\/\/\/[a-zA-Z]:\//;
function parseUrl(sourceUrl) {
  const url = NodePackages.get("url");
  const parsedUrl = url.parse(sourceUrl);
  if (parsedUrl.protocol === "file:" || parsedUrl.host) {
    return parsedUrl;
  }
  if (/^[a-z]:[/\\]/i.test(sourceUrl)) {
    return url.parse(`file:///${sourceUrl}`);
  }
  if (!parsedUrl.host) {
    parsedUrl.protocol = "file:";
  }
  return parsedUrl;
}
var PDFNodeStream = class {
  constructor(source) {
    this.source = source;
    this.url = parseUrl(source.url);
    this.isHttp = this.url.protocol === "http:" || this.url.protocol === "https:";
    this.isFsUrl = this.url.protocol === "file:";
    this.httpHeaders = this.isHttp && source.httpHeaders || {};
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  }
  get _progressiveDataLength() {
    var _a2;
    return ((_a2 = this._fullRequestReader) == null ? void 0 : _a2._loaded) ?? 0;
  }
  getFullReader() {
    assert(!this._fullRequestReader, "PDFNodeStream.getFullReader can only be called once.");
    this._fullRequestReader = this.isFsUrl ? new PDFNodeStreamFsFullReader(this) : new PDFNodeStreamFullReader(this);
    return this._fullRequestReader;
  }
  getRangeReader(start, end) {
    if (end <= this._progressiveDataLength) {
      return null;
    }
    const rangeReader = this.isFsUrl ? new PDFNodeStreamFsRangeReader(this, start, end) : new PDFNodeStreamRangeReader(this, start, end);
    this._rangeRequestReaders.push(rangeReader);
    return rangeReader;
  }
  cancelAllRequests(reason) {
    var _a2;
    (_a2 = this._fullRequestReader) == null ? void 0 : _a2.cancel(reason);
    for (const reader of this._rangeRequestReaders.slice(0)) {
      reader.cancel(reason);
    }
  }
};
var BaseFullReader = class {
  constructor(stream) {
    this._url = stream.url;
    this._done = false;
    this._storedError = null;
    this.onProgress = null;
    const source = stream.source;
    this._contentLength = source.length;
    this._loaded = 0;
    this._filename = null;
    this._disableRange = source.disableRange || false;
    this._rangeChunkSize = source.rangeChunkSize;
    if (!this._rangeChunkSize && !this._disableRange) {
      this._disableRange = true;
    }
    this._isStreamingSupported = !source.disableStream;
    this._isRangeSupported = !source.disableRange;
    this._readableStream = null;
    this._readCapability = Promise.withResolvers();
    this._headersCapability = Promise.withResolvers();
  }
  get headersReady() {
    return this._headersCapability.promise;
  }
  get filename() {
    return this._filename;
  }
  get contentLength() {
    return this._contentLength;
  }
  get isRangeSupported() {
    return this._isRangeSupported;
  }
  get isStreamingSupported() {
    return this._isStreamingSupported;
  }
  async read() {
    var _a2;
    await this._readCapability.promise;
    if (this._done) {
      return {
        value: void 0,
        done: true
      };
    }
    if (this._storedError) {
      throw this._storedError;
    }
    const chunk = this._readableStream.read();
    if (chunk === null) {
      this._readCapability = Promise.withResolvers();
      return this.read();
    }
    this._loaded += chunk.length;
    (_a2 = this.onProgress) == null ? void 0 : _a2.call(this, {
      loaded: this._loaded,
      total: this._contentLength
    });
    const buffer = new Uint8Array(chunk).buffer;
    return {
      value: buffer,
      done: false
    };
  }
  cancel(reason) {
    if (!this._readableStream) {
      this._error(reason);
      return;
    }
    this._readableStream.destroy(reason);
  }
  _error(reason) {
    this._storedError = reason;
    this._readCapability.resolve();
  }
  _setReadableStream(readableStream) {
    this._readableStream = readableStream;
    readableStream.on("readable", () => {
      this._readCapability.resolve();
    });
    readableStream.on("end", () => {
      readableStream.destroy();
      this._done = true;
      this._readCapability.resolve();
    });
    readableStream.on("error", (reason) => {
      this._error(reason);
    });
    if (!this._isStreamingSupported && this._isRangeSupported) {
      this._error(new AbortException("streaming is disabled"));
    }
    if (this._storedError) {
      this._readableStream.destroy(this._storedError);
    }
  }
};
var BaseRangeReader = class {
  constructor(stream) {
    this._url = stream.url;
    this._done = false;
    this._storedError = null;
    this.onProgress = null;
    this._loaded = 0;
    this._readableStream = null;
    this._readCapability = Promise.withResolvers();
    const source = stream.source;
    this._isStreamingSupported = !source.disableStream;
  }
  get isStreamingSupported() {
    return this._isStreamingSupported;
  }
  async read() {
    var _a2;
    await this._readCapability.promise;
    if (this._done) {
      return {
        value: void 0,
        done: true
      };
    }
    if (this._storedError) {
      throw this._storedError;
    }
    const chunk = this._readableStream.read();
    if (chunk === null) {
      this._readCapability = Promise.withResolvers();
      return this.read();
    }
    this._loaded += chunk.length;
    (_a2 = this.onProgress) == null ? void 0 : _a2.call(this, {
      loaded: this._loaded
    });
    const buffer = new Uint8Array(chunk).buffer;
    return {
      value: buffer,
      done: false
    };
  }
  cancel(reason) {
    if (!this._readableStream) {
      this._error(reason);
      return;
    }
    this._readableStream.destroy(reason);
  }
  _error(reason) {
    this._storedError = reason;
    this._readCapability.resolve();
  }
  _setReadableStream(readableStream) {
    this._readableStream = readableStream;
    readableStream.on("readable", () => {
      this._readCapability.resolve();
    });
    readableStream.on("end", () => {
      readableStream.destroy();
      this._done = true;
      this._readCapability.resolve();
    });
    readableStream.on("error", (reason) => {
      this._error(reason);
    });
    if (this._storedError) {
      this._readableStream.destroy(this._storedError);
    }
  }
};
function createRequestOptions(parsedUrl, headers) {
  return {
    protocol: parsedUrl.protocol,
    auth: parsedUrl.auth,
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.path,
    method: "GET",
    headers
  };
}
var PDFNodeStreamFullReader = class extends BaseFullReader {
  constructor(stream) {
    super(stream);
    const handleResponse = (response) => {
      if (response.statusCode === 404) {
        const error = new MissingPDFException(`Missing PDF "${this._url}".`);
        this._storedError = error;
        this._headersCapability.reject(error);
        return;
      }
      this._headersCapability.resolve();
      this._setReadableStream(response);
      const getResponseHeader = (name) => this._readableStream.headers[name.toLowerCase()];
      const {
        allowRangeRequests,
        suggestedLength
      } = validateRangeRequestCapabilities({
        getResponseHeader,
        isHttp: stream.isHttp,
        rangeChunkSize: this._rangeChunkSize,
        disableRange: this._disableRange
      });
      this._isRangeSupported = allowRangeRequests;
      this._contentLength = suggestedLength || this._contentLength;
      this._filename = extractFilenameFromHeader(getResponseHeader);
    };
    this._request = null;
    if (this._url.protocol === "http:") {
      const http = NodePackages.get("http");
      this._request = http.request(createRequestOptions(this._url, stream.httpHeaders), handleResponse);
    } else {
      const https = NodePackages.get("https");
      this._request = https.request(createRequestOptions(this._url, stream.httpHeaders), handleResponse);
    }
    this._request.on("error", (reason) => {
      this._storedError = reason;
      this._headersCapability.reject(reason);
    });
    this._request.end();
  }
};
var PDFNodeStreamRangeReader = class extends BaseRangeReader {
  constructor(stream, start, end) {
    super(stream);
    this._httpHeaders = {};
    for (const property in stream.httpHeaders) {
      const value = stream.httpHeaders[property];
      if (value === void 0) {
        continue;
      }
      this._httpHeaders[property] = value;
    }
    this._httpHeaders.Range = `bytes=${start}-${end - 1}`;
    const handleResponse = (response) => {
      if (response.statusCode === 404) {
        const error = new MissingPDFException(`Missing PDF "${this._url}".`);
        this._storedError = error;
        return;
      }
      this._setReadableStream(response);
    };
    this._request = null;
    if (this._url.protocol === "http:") {
      const http = NodePackages.get("http");
      this._request = http.request(createRequestOptions(this._url, this._httpHeaders), handleResponse);
    } else {
      const https = NodePackages.get("https");
      this._request = https.request(createRequestOptions(this._url, this._httpHeaders), handleResponse);
    }
    this._request.on("error", (reason) => {
      this._storedError = reason;
    });
    this._request.end();
  }
};
var PDFNodeStreamFsFullReader = class extends BaseFullReader {
  constructor(stream) {
    super(stream);
    let path = decodeURIComponent(this._url.path);
    if (fileUriRegex.test(this._url.href)) {
      path = path.replace(/^\//, "");
    }
    const fs = NodePackages.get("fs");
    fs.promises.lstat(path).then((stat) => {
      this._contentLength = stat.size;
      this._setReadableStream(fs.createReadStream(path));
      this._headersCapability.resolve();
    }, (error) => {
      if (error.code === "ENOENT") {
        error = new MissingPDFException(`Missing PDF "${path}".`);
      }
      this._storedError = error;
      this._headersCapability.reject(error);
    });
  }
};
var PDFNodeStreamFsRangeReader = class extends BaseRangeReader {
  constructor(stream, start, end) {
    super(stream);
    let path = decodeURIComponent(this._url.path);
    if (fileUriRegex.test(this._url.href)) {
      path = path.replace(/^\//, "");
    }
    const fs = NodePackages.get("fs");
    this._setReadableStream(fs.createReadStream(path, {
      start,
      end: end - 1
    }));
  }
};
var MAX_TEXT_DIVS_TO_RENDER = 1e5;
var DEFAULT_FONT_SIZE = 30;
var DEFAULT_FONT_ASCENT = 0.8;
var _a, _capability, _container2, _disableProcessItems, _fontInspectorEnabled, _lang, _layoutTextParams, _pageHeight, _pageWidth, _reader, _rootContainer, _rotation, _scale, _styleCache, _textContentItemsStr, _textContentSource, _textDivs, _textDivProperties, _transform, _ascentCache, _canvasContexts, _pendingTextLayers, _TextLayer_instances, processItems_fn, appendText_fn, layout_fn, _TextLayer_static, getCtx_fn, getAscent_fn;
var _TextLayer = class _TextLayer {
  constructor({
    textContentSource,
    container,
    viewport
  }) {
    __privateAdd(this, _TextLayer_instances);
    __privateAdd(this, _capability, Promise.withResolvers());
    __privateAdd(this, _container2, null);
    __privateAdd(this, _disableProcessItems, false);
    __privateAdd(this, _fontInspectorEnabled, !!((_a = globalThis.FontInspector) == null ? void 0 : _a.enabled));
    __privateAdd(this, _lang, null);
    __privateAdd(this, _layoutTextParams, null);
    __privateAdd(this, _pageHeight, 0);
    __privateAdd(this, _pageWidth, 0);
    __privateAdd(this, _reader, null);
    __privateAdd(this, _rootContainer, null);
    __privateAdd(this, _rotation, 0);
    __privateAdd(this, _scale, 0);
    __privateAdd(this, _styleCache, /* @__PURE__ */ Object.create(null));
    __privateAdd(this, _textContentItemsStr, []);
    __privateAdd(this, _textContentSource, null);
    __privateAdd(this, _textDivs, []);
    __privateAdd(this, _textDivProperties, /* @__PURE__ */ new WeakMap());
    __privateAdd(this, _transform, null);
    if (textContentSource instanceof ReadableStream) {
      __privateSet(this, _textContentSource, textContentSource);
    } else if (typeof textContentSource === "object") {
      __privateSet(this, _textContentSource, new ReadableStream({
        start(controller) {
          controller.enqueue(textContentSource);
          controller.close();
        }
      }));
    } else {
      throw new Error('No "textContentSource" parameter specified.');
    }
    __privateSet(this, _container2, __privateSet(this, _rootContainer, container));
    __privateSet(this, _scale, viewport.scale * (globalThis.devicePixelRatio || 1));
    __privateSet(this, _rotation, viewport.rotation);
    __privateSet(this, _layoutTextParams, {
      prevFontSize: null,
      prevFontFamily: null,
      div: null,
      properties: null,
      ctx: null
    });
    const {
      pageWidth,
      pageHeight,
      pageX,
      pageY
    } = viewport.rawDims;
    __privateSet(this, _transform, [1, 0, 0, -1, -pageX, pageY + pageHeight]);
    __privateSet(this, _pageWidth, pageWidth);
    __privateSet(this, _pageHeight, pageHeight);
    setLayerDimensions(container, viewport);
    __privateGet(this, _capability).promise.catch(() => {
    }).then(() => {
      __privateGet(_TextLayer, _pendingTextLayers).delete(this);
      __privateSet(this, _layoutTextParams, null);
      __privateSet(this, _styleCache, null);
    });
  }
  render() {
    const pump = () => {
      __privateGet(this, _reader).read().then(({
        value,
        done
      }) => {
        if (done) {
          __privateGet(this, _capability).resolve();
          return;
        }
        __privateGet(this, _lang) ?? __privateSet(this, _lang, value.lang);
        Object.assign(__privateGet(this, _styleCache), value.styles);
        __privateMethod(this, _TextLayer_instances, processItems_fn).call(this, value.items);
        pump();
      }, __privateGet(this, _capability).reject);
    };
    __privateSet(this, _reader, __privateGet(this, _textContentSource).getReader());
    __privateGet(_TextLayer, _pendingTextLayers).add(this);
    pump();
    return __privateGet(this, _capability).promise;
  }
  update({
    viewport,
    onBefore = null
  }) {
    var _a2;
    const scale = viewport.scale * (globalThis.devicePixelRatio || 1);
    const rotation = viewport.rotation;
    if (rotation !== __privateGet(this, _rotation)) {
      onBefore == null ? void 0 : onBefore();
      __privateSet(this, _rotation, rotation);
      setLayerDimensions(__privateGet(this, _rootContainer), {
        rotation
      });
    }
    if (scale !== __privateGet(this, _scale)) {
      onBefore == null ? void 0 : onBefore();
      __privateSet(this, _scale, scale);
      const params = {
        prevFontSize: null,
        prevFontFamily: null,
        div: null,
        properties: null,
        ctx: __privateMethod(_a2 = _TextLayer, _TextLayer_static, getCtx_fn).call(_a2, __privateGet(this, _lang))
      };
      for (const div of __privateGet(this, _textDivs)) {
        params.properties = __privateGet(this, _textDivProperties).get(div);
        params.div = div;
        __privateMethod(this, _TextLayer_instances, layout_fn).call(this, params);
      }
    }
  }
  cancel() {
    var _a2;
    const abortEx = new AbortException("TextLayer task cancelled.");
    (_a2 = __privateGet(this, _reader)) == null ? void 0 : _a2.cancel(abortEx).catch(() => {
    });
    __privateSet(this, _reader, null);
    __privateGet(this, _capability).reject(abortEx);
  }
  get textDivs() {
    return __privateGet(this, _textDivs);
  }
  get textContentItemsStr() {
    return __privateGet(this, _textContentItemsStr);
  }
  static cleanup() {
    if (__privateGet(this, _pendingTextLayers).size > 0) {
      return;
    }
    __privateGet(this, _ascentCache).clear();
    for (const {
      canvas
    } of __privateGet(this, _canvasContexts).values()) {
      canvas.remove();
    }
    __privateGet(this, _canvasContexts).clear();
  }
};
_capability = new WeakMap();
_container2 = new WeakMap();
_disableProcessItems = new WeakMap();
_fontInspectorEnabled = new WeakMap();
_lang = new WeakMap();
_layoutTextParams = new WeakMap();
_pageHeight = new WeakMap();
_pageWidth = new WeakMap();
_reader = new WeakMap();
_rootContainer = new WeakMap();
_rotation = new WeakMap();
_scale = new WeakMap();
_styleCache = new WeakMap();
_textContentItemsStr = new WeakMap();
_textContentSource = new WeakMap();
_textDivs = new WeakMap();
_textDivProperties = new WeakMap();
_transform = new WeakMap();
_ascentCache = new WeakMap();
_canvasContexts = new WeakMap();
_pendingTextLayers = new WeakMap();
_TextLayer_instances = new WeakSet();
processItems_fn = function(items) {
  var _a2, _b;
  if (__privateGet(this, _disableProcessItems)) {
    return;
  }
  (_b = __privateGet(this, _layoutTextParams)).ctx || (_b.ctx = __privateMethod(_a2 = _TextLayer, _TextLayer_static, getCtx_fn).call(_a2, __privateGet(this, _lang)));
  const textDivs = __privateGet(this, _textDivs), textContentItemsStr = __privateGet(this, _textContentItemsStr);
  for (const item of items) {
    if (textDivs.length > MAX_TEXT_DIVS_TO_RENDER) {
      warn("Ignoring additional textDivs for performance reasons.");
      __privateSet(this, _disableProcessItems, true);
      return;
    }
    if (item.str === void 0) {
      if (item.type === "beginMarkedContentProps" || item.type === "beginMarkedContent") {
        const parent = __privateGet(this, _container2);
        __privateSet(this, _container2, document.createElement("span"));
        __privateGet(this, _container2).classList.add("markedContent");
        if (item.id !== null) {
          __privateGet(this, _container2).setAttribute("id", `${item.id}`);
        }
        parent.append(__privateGet(this, _container2));
      } else if (item.type === "endMarkedContent") {
        __privateSet(this, _container2, __privateGet(this, _container2).parentNode);
      }
      continue;
    }
    textContentItemsStr.push(item.str);
    __privateMethod(this, _TextLayer_instances, appendText_fn).call(this, item);
  }
};
appendText_fn = function(geom) {
  var _a2;
  const textDiv = document.createElement("span");
  const textDivProperties = {
    angle: 0,
    canvasWidth: 0,
    hasText: geom.str !== "",
    hasEOL: geom.hasEOL,
    fontSize: 0
  };
  __privateGet(this, _textDivs).push(textDiv);
  const tx = Util.transform(__privateGet(this, _transform), geom.transform);
  let angle = Math.atan2(tx[1], tx[0]);
  const style = __privateGet(this, _styleCache)[geom.fontName];
  if (style.vertical) {
    angle += Math.PI / 2;
  }
  const fontFamily = __privateGet(this, _fontInspectorEnabled) && style.fontSubstitution || style.fontFamily;
  const fontHeight = Math.hypot(tx[2], tx[3]);
  const fontAscent = fontHeight * __privateMethod(_a2 = _TextLayer, _TextLayer_static, getAscent_fn).call(_a2, fontFamily, __privateGet(this, _lang));
  let left, top;
  if (angle === 0) {
    left = tx[4];
    top = tx[5] - fontAscent;
  } else {
    left = tx[4] + fontAscent * Math.sin(angle);
    top = tx[5] - fontAscent * Math.cos(angle);
  }
  const scaleFactorStr = "calc(var(--scale-factor)*";
  const divStyle = textDiv.style;
  if (__privateGet(this, _container2) === __privateGet(this, _rootContainer)) {
    divStyle.left = `${(100 * left / __privateGet(this, _pageWidth)).toFixed(2)}%`;
    divStyle.top = `${(100 * top / __privateGet(this, _pageHeight)).toFixed(2)}%`;
  } else {
    divStyle.left = `${scaleFactorStr}${left.toFixed(2)}px)`;
    divStyle.top = `${scaleFactorStr}${top.toFixed(2)}px)`;
  }
  divStyle.fontSize = `${scaleFactorStr}${fontHeight.toFixed(2)}px)`;
  divStyle.fontFamily = fontFamily;
  textDivProperties.fontSize = fontHeight;
  textDiv.setAttribute("role", "presentation");
  textDiv.textContent = geom.str;
  textDiv.dir = geom.dir;
  if (__privateGet(this, _fontInspectorEnabled)) {
    textDiv.dataset.fontName = style.fontSubstitutionLoadedName || geom.fontName;
  }
  if (angle !== 0) {
    textDivProperties.angle = angle * (180 / Math.PI);
  }
  let shouldScaleText = false;
  if (geom.str.length > 1) {
    shouldScaleText = true;
  } else if (geom.str !== " " && geom.transform[0] !== geom.transform[3]) {
    const absScaleX = Math.abs(geom.transform[0]), absScaleY = Math.abs(geom.transform[3]);
    if (absScaleX !== absScaleY && Math.max(absScaleX, absScaleY) / Math.min(absScaleX, absScaleY) > 1.5) {
      shouldScaleText = true;
    }
  }
  if (shouldScaleText) {
    textDivProperties.canvasWidth = style.vertical ? geom.height : geom.width;
  }
  __privateGet(this, _textDivProperties).set(textDiv, textDivProperties);
  __privateGet(this, _layoutTextParams).div = textDiv;
  __privateGet(this, _layoutTextParams).properties = textDivProperties;
  __privateMethod(this, _TextLayer_instances, layout_fn).call(this, __privateGet(this, _layoutTextParams));
  if (textDivProperties.hasText) {
    __privateGet(this, _container2).append(textDiv);
  }
  if (textDivProperties.hasEOL) {
    const br = document.createElement("br");
    br.setAttribute("role", "presentation");
    __privateGet(this, _container2).append(br);
  }
};
layout_fn = function(params) {
  const {
    div,
    properties,
    ctx,
    prevFontSize,
    prevFontFamily
  } = params;
  const {
    style
  } = div;
  let transform = "";
  if (properties.canvasWidth !== 0 && properties.hasText) {
    const {
      fontFamily
    } = style;
    const {
      canvasWidth,
      fontSize
    } = properties;
    if (prevFontSize !== fontSize || prevFontFamily !== fontFamily) {
      ctx.font = `${fontSize * __privateGet(this, _scale)}px ${fontFamily}`;
      params.prevFontSize = fontSize;
      params.prevFontFamily = fontFamily;
    }
    const {
      width
    } = ctx.measureText(div.textContent);
    if (width > 0) {
      transform = `scaleX(${canvasWidth * __privateGet(this, _scale) / width})`;
    }
  }
  if (properties.angle !== 0) {
    transform = `rotate(${properties.angle}deg) ${transform}`;
  }
  if (transform.length > 0) {
    style.transform = transform;
  }
};
_TextLayer_static = new WeakSet();
getCtx_fn = function(lang = null) {
  let canvasContext = __privateGet(this, _canvasContexts).get(lang || (lang = ""));
  if (!canvasContext) {
    const canvas = document.createElement("canvas");
    canvas.className = "hiddenCanvasElement";
    canvas.lang = lang;
    document.body.append(canvas);
    canvasContext = canvas.getContext("2d", {
      alpha: false
    });
    __privateGet(this, _canvasContexts).set(lang, canvasContext);
  }
  return canvasContext;
};
getAscent_fn = function(fontFamily, lang) {
  const cachedAscent = __privateGet(this, _ascentCache).get(fontFamily);
  if (cachedAscent) {
    return cachedAscent;
  }
  const ctx = __privateMethod(this, _TextLayer_static, getCtx_fn).call(this, lang);
  const savedFont = ctx.font;
  ctx.canvas.width = ctx.canvas.height = DEFAULT_FONT_SIZE;
  ctx.font = `${DEFAULT_FONT_SIZE}px ${fontFamily}`;
  const metrics = ctx.measureText("");
  let ascent = metrics.fontBoundingBoxAscent;
  let descent = Math.abs(metrics.fontBoundingBoxDescent);
  if (ascent) {
    const ratio2 = ascent / (ascent + descent);
    __privateGet(this, _ascentCache).set(fontFamily, ratio2);
    ctx.canvas.width = ctx.canvas.height = 0;
    ctx.font = savedFont;
    return ratio2;
  }
  ctx.strokeStyle = "red";
  ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE);
  ctx.strokeText("g", 0, 0);
  let pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE).data;
  descent = 0;
  for (let i2 = pixels.length - 1 - 3; i2 >= 0; i2 -= 4) {
    if (pixels[i2] > 0) {
      descent = Math.ceil(i2 / 4 / DEFAULT_FONT_SIZE);
      break;
    }
  }
  ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE);
  ctx.strokeText("A", 0, DEFAULT_FONT_SIZE);
  pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE).data;
  ascent = 0;
  for (let i2 = 0, ii = pixels.length; i2 < ii; i2 += 4) {
    if (pixels[i2] > 0) {
      ascent = DEFAULT_FONT_SIZE - Math.floor(i2 / 4 / DEFAULT_FONT_SIZE);
      break;
    }
  }
  ctx.canvas.width = ctx.canvas.height = 0;
  ctx.font = savedFont;
  const ratio = ascent ? ascent / (ascent + descent) : DEFAULT_FONT_ASCENT;
  __privateGet(this, _ascentCache).set(fontFamily, ratio);
  return ratio;
};
__privateAdd(_TextLayer, _TextLayer_static);
__privateAdd(_TextLayer, _ascentCache, /* @__PURE__ */ new Map());
__privateAdd(_TextLayer, _canvasContexts, /* @__PURE__ */ new Map());
__privateAdd(_TextLayer, _pendingTextLayers, /* @__PURE__ */ new Set());
var TextLayer = _TextLayer;
function renderTextLayer() {
  deprecated("`renderTextLayer`, please use `TextLayer` instead.");
  const {
    textContentSource,
    container,
    viewport,
    ...rest
  } = arguments[0];
  const restKeys = Object.keys(rest);
  if (restKeys.length > 0) {
    warn("Ignoring `renderTextLayer` parameters: " + restKeys.join(", "));
  }
  const textLayer = new TextLayer({
    textContentSource,
    container,
    viewport
  });
  const {
    textDivs,
    textContentItemsStr
  } = textLayer;
  const promise = textLayer.render();
  return {
    promise,
    textDivs,
    textContentItemsStr
  };
}
function updateTextLayer() {
  deprecated("`updateTextLayer`, please use `TextLayer` instead.");
}
var XfaText = class _XfaText {
  static textContent(xfa) {
    const items = [];
    const output = {
      items,
      styles: /* @__PURE__ */ Object.create(null)
    };
    function walk(node) {
      var _a2;
      if (!node) {
        return;
      }
      let str = null;
      const name = node.name;
      if (name === "#text") {
        str = node.value;
      } else if (!_XfaText.shouldBuildText(name)) {
        return;
      } else if ((_a2 = node == null ? void 0 : node.attributes) == null ? void 0 : _a2.textContent) {
        str = node.attributes.textContent;
      } else if (node.value) {
        str = node.value;
      }
      if (str !== null) {
        items.push({
          str
        });
      }
      if (!node.children) {
        return;
      }
      for (const child of node.children) {
        walk(child);
      }
    }
    walk(xfa);
    return output;
  }
  static shouldBuildText(name) {
    return !(name === "textarea" || name === "input" || name === "option" || name === "select");
  }
};
var DEFAULT_RANGE_CHUNK_SIZE = 65536;
var RENDERING_CANCELLED_TIMEOUT = 100;
var DELAYED_CLEANUP_TIMEOUT = 5e3;
var DefaultCanvasFactory = isNodeJS ? NodeCanvasFactory : DOMCanvasFactory;
var DefaultCMapReaderFactory = isNodeJS ? NodeCMapReaderFactory : DOMCMapReaderFactory;
var DefaultFilterFactory = isNodeJS ? NodeFilterFactory : DOMFilterFactory;
var DefaultStandardFontDataFactory = isNodeJS ? NodeStandardFontDataFactory : DOMStandardFontDataFactory;
function getDocument(src) {
  if (typeof src === "string" || src instanceof URL) {
    src = {
      url: src
    };
  } else if (src instanceof ArrayBuffer || ArrayBuffer.isView(src)) {
    src = {
      data: src
    };
  }
  if (typeof src !== "object") {
    throw new Error("Invalid parameter in getDocument, need parameter object.");
  }
  if (!src.url && !src.data && !src.range) {
    throw new Error("Invalid parameter object: need either .data, .range or .url");
  }
  const task = new PDFDocumentLoadingTask();
  const {
    docId
  } = task;
  const url = src.url ? getUrlProp(src.url) : null;
  const data = src.data ? getDataProp(src.data) : null;
  const httpHeaders = src.httpHeaders || null;
  const withCredentials = src.withCredentials === true;
  const password = src.password ?? null;
  const rangeTransport = src.range instanceof PDFDataRangeTransport ? src.range : null;
  const rangeChunkSize = Number.isInteger(src.rangeChunkSize) && src.rangeChunkSize > 0 ? src.rangeChunkSize : DEFAULT_RANGE_CHUNK_SIZE;
  let worker = src.worker instanceof PDFWorker ? src.worker : null;
  const verbosity2 = src.verbosity;
  const docBaseUrl = typeof src.docBaseUrl === "string" && !isDataScheme(src.docBaseUrl) ? src.docBaseUrl : null;
  const cMapUrl = typeof src.cMapUrl === "string" ? src.cMapUrl : null;
  const cMapPacked = src.cMapPacked !== false;
  const CMapReaderFactory = src.CMapReaderFactory || DefaultCMapReaderFactory;
  const standardFontDataUrl = typeof src.standardFontDataUrl === "string" ? src.standardFontDataUrl : null;
  const StandardFontDataFactory = src.StandardFontDataFactory || DefaultStandardFontDataFactory;
  const ignoreErrors = src.stopAtErrors !== true;
  const maxImageSize = Number.isInteger(src.maxImageSize) && src.maxImageSize > -1 ? src.maxImageSize : -1;
  const isEvalSupported2 = src.isEvalSupported !== false;
  const isOffscreenCanvasSupported = typeof src.isOffscreenCanvasSupported === "boolean" ? src.isOffscreenCanvasSupported : !isNodeJS;
  const canvasMaxAreaInBytes = Number.isInteger(src.canvasMaxAreaInBytes) ? src.canvasMaxAreaInBytes : -1;
  const disableFontFace = typeof src.disableFontFace === "boolean" ? src.disableFontFace : isNodeJS;
  const fontExtraProperties = src.fontExtraProperties === true;
  const enableXfa = src.enableXfa === true;
  const ownerDocument = src.ownerDocument || globalThis.document;
  const disableRange = src.disableRange === true;
  const disableStream = src.disableStream === true;
  const disableAutoFetch = src.disableAutoFetch === true;
  const pdfBug = src.pdfBug === true;
  const length = rangeTransport ? rangeTransport.length : src.length ?? NaN;
  const useSystemFonts = typeof src.useSystemFonts === "boolean" ? src.useSystemFonts : !isNodeJS && !disableFontFace;
  const useWorkerFetch = typeof src.useWorkerFetch === "boolean" ? src.useWorkerFetch : CMapReaderFactory === DOMCMapReaderFactory && StandardFontDataFactory === DOMStandardFontDataFactory && cMapUrl && standardFontDataUrl && isValidFetchUrl(cMapUrl, document.baseURI) && isValidFetchUrl(standardFontDataUrl, document.baseURI);
  const canvasFactory = src.canvasFactory || new DefaultCanvasFactory({
    ownerDocument
  });
  const filterFactory = src.filterFactory || new DefaultFilterFactory({
    docId,
    ownerDocument
  });
  const styleElement = null;
  setVerbosityLevel(verbosity2);
  const transportFactory = {
    canvasFactory,
    filterFactory
  };
  if (!useWorkerFetch) {
    transportFactory.cMapReaderFactory = new CMapReaderFactory({
      baseUrl: cMapUrl,
      isCompressed: cMapPacked
    });
    transportFactory.standardFontDataFactory = new StandardFontDataFactory({
      baseUrl: standardFontDataUrl
    });
  }
  if (!worker) {
    const workerParams = {
      verbosity: verbosity2,
      port: GlobalWorkerOptions.workerPort
    };
    worker = workerParams.port ? PDFWorker.fromPort(workerParams) : new PDFWorker(workerParams);
    task._worker = worker;
  }
  const docParams = {
    docId,
    apiVersion: "4.3.136",
    data,
    password,
    disableAutoFetch,
    rangeChunkSize,
    length,
    docBaseUrl,
    enableXfa,
    evaluatorOptions: {
      maxImageSize,
      disableFontFace,
      ignoreErrors,
      isEvalSupported: isEvalSupported2,
      isOffscreenCanvasSupported,
      canvasMaxAreaInBytes,
      fontExtraProperties,
      useSystemFonts,
      cMapUrl: useWorkerFetch ? cMapUrl : null,
      standardFontDataUrl: useWorkerFetch ? standardFontDataUrl : null
    }
  };
  const transportParams = {
    disableFontFace,
    fontExtraProperties,
    ownerDocument,
    pdfBug,
    styleElement,
    loadingParams: {
      disableAutoFetch,
      enableXfa
    }
  };
  worker.promise.then(function() {
    if (task.destroyed) {
      throw new Error("Loading aborted");
    }
    if (worker.destroyed) {
      throw new Error("Worker was destroyed");
    }
    const workerIdPromise = worker.messageHandler.sendWithPromise("GetDocRequest", docParams, data ? [data.buffer] : null);
    let networkStream;
    if (rangeTransport) {
      networkStream = new PDFDataTransportStream(rangeTransport, {
        disableRange,
        disableStream
      });
    } else if (!data) {
      const createPDFNetworkStream = (params) => {
        if (isNodeJS) {
          const isFetchSupported = function() {
            return typeof fetch !== "undefined" && typeof Response !== "undefined" && "body" in Response.prototype;
          };
          return isFetchSupported() && isValidFetchUrl(params.url) ? new PDFFetchStream(params) : new PDFNodeStream(params);
        }
        return isValidFetchUrl(params.url) ? new PDFFetchStream(params) : new PDFNetworkStream(params);
      };
      networkStream = createPDFNetworkStream({
        url,
        length,
        httpHeaders,
        withCredentials,
        rangeChunkSize,
        disableRange,
        disableStream
      });
    }
    return workerIdPromise.then((workerId) => {
      if (task.destroyed) {
        throw new Error("Loading aborted");
      }
      if (worker.destroyed) {
        throw new Error("Worker was destroyed");
      }
      const messageHandler = new MessageHandler(docId, workerId, worker.port);
      const transport = new WorkerTransport(messageHandler, task, networkStream, transportParams, transportFactory);
      task._transport = transport;
      messageHandler.send("Ready", null);
    });
  }).catch(task._capability.reject);
  return task;
}
function getUrlProp(val) {
  if (val instanceof URL) {
    return val.href;
  }
  try {
    return new URL(val, window.location).href;
  } catch {
    if (isNodeJS && typeof val === "string") {
      return val;
    }
  }
  throw new Error("Invalid PDF url data: either string or URL-object is expected in the url property.");
}
function getDataProp(val) {
  if (isNodeJS && typeof Buffer !== "undefined" && val instanceof Buffer) {
    throw new Error("Please provide binary data as `Uint8Array`, rather than `Buffer`.");
  }
  if (val instanceof Uint8Array && val.byteLength === val.buffer.byteLength) {
    return val;
  }
  if (typeof val === "string") {
    return stringToBytes(val);
  }
  if (val instanceof ArrayBuffer || ArrayBuffer.isView(val) || typeof val === "object" && !isNaN(val == null ? void 0 : val.length)) {
    return new Uint8Array(val);
  }
  throw new Error("Invalid PDF binary data: either TypedArray, string, or array-like object is expected in the data property.");
}
function isRefProxy(ref) {
  return typeof ref === "object" && Number.isInteger(ref == null ? void 0 : ref.num) && ref.num >= 0 && Number.isInteger(ref == null ? void 0 : ref.gen) && ref.gen >= 0;
}
var _docId2;
var _PDFDocumentLoadingTask = class _PDFDocumentLoadingTask {
  constructor() {
    this._capability = Promise.withResolvers();
    this._transport = null;
    this._worker = null;
    this.docId = `d${__privateWrapper(_PDFDocumentLoadingTask, _docId2)._++}`;
    this.destroyed = false;
    this.onPassword = null;
    this.onProgress = null;
  }
  get promise() {
    return this._capability.promise;
  }
  async destroy() {
    var _a2, _b, _c;
    this.destroyed = true;
    try {
      if ((_a2 = this._worker) == null ? void 0 : _a2.port) {
        this._worker._pendingDestroy = true;
      }
      await ((_b = this._transport) == null ? void 0 : _b.destroy());
    } catch (ex) {
      if ((_c = this._worker) == null ? void 0 : _c.port) {
        delete this._worker._pendingDestroy;
      }
      throw ex;
    }
    this._transport = null;
    if (this._worker) {
      this._worker.destroy();
      this._worker = null;
    }
  }
};
_docId2 = new WeakMap();
__privateAdd(_PDFDocumentLoadingTask, _docId2, 0);
var PDFDocumentLoadingTask = _PDFDocumentLoadingTask;
var PDFDataRangeTransport = class {
  constructor(length, initialData, progressiveDone = false, contentDispositionFilename = null) {
    this.length = length;
    this.initialData = initialData;
    this.progressiveDone = progressiveDone;
    this.contentDispositionFilename = contentDispositionFilename;
    this._rangeListeners = [];
    this._progressListeners = [];
    this._progressiveReadListeners = [];
    this._progressiveDoneListeners = [];
    this._readyCapability = Promise.withResolvers();
  }
  addRangeListener(listener) {
    this._rangeListeners.push(listener);
  }
  addProgressListener(listener) {
    this._progressListeners.push(listener);
  }
  addProgressiveReadListener(listener) {
    this._progressiveReadListeners.push(listener);
  }
  addProgressiveDoneListener(listener) {
    this._progressiveDoneListeners.push(listener);
  }
  onDataRange(begin, chunk) {
    for (const listener of this._rangeListeners) {
      listener(begin, chunk);
    }
  }
  onDataProgress(loaded, total) {
    this._readyCapability.promise.then(() => {
      for (const listener of this._progressListeners) {
        listener(loaded, total);
      }
    });
  }
  onDataProgressiveRead(chunk) {
    this._readyCapability.promise.then(() => {
      for (const listener of this._progressiveReadListeners) {
        listener(chunk);
      }
    });
  }
  onDataProgressiveDone() {
    this._readyCapability.promise.then(() => {
      for (const listener of this._progressiveDoneListeners) {
        listener();
      }
    });
  }
  transportReady() {
    this._readyCapability.resolve();
  }
  requestDataRange(begin, end) {
    unreachable("Abstract method PDFDataRangeTransport.requestDataRange");
  }
  abort() {
  }
};
var PDFDocumentProxy = class {
  constructor(pdfInfo, transport) {
    this._pdfInfo = pdfInfo;
    this._transport = transport;
  }
  get annotationStorage() {
    return this._transport.annotationStorage;
  }
  get filterFactory() {
    return this._transport.filterFactory;
  }
  get numPages() {
    return this._pdfInfo.numPages;
  }
  get fingerprints() {
    return this._pdfInfo.fingerprints;
  }
  get isPureXfa() {
    return shadow(this, "isPureXfa", !!this._transport._htmlForXfa);
  }
  get allXfaHtml() {
    return this._transport._htmlForXfa;
  }
  getPage(pageNumber) {
    return this._transport.getPage(pageNumber);
  }
  getPageIndex(ref) {
    return this._transport.getPageIndex(ref);
  }
  getDestinations() {
    return this._transport.getDestinations();
  }
  getDestination(id) {
    return this._transport.getDestination(id);
  }
  getPageLabels() {
    return this._transport.getPageLabels();
  }
  getPageLayout() {
    return this._transport.getPageLayout();
  }
  getPageMode() {
    return this._transport.getPageMode();
  }
  getViewerPreferences() {
    return this._transport.getViewerPreferences();
  }
  getOpenAction() {
    return this._transport.getOpenAction();
  }
  getAttachments() {
    return this._transport.getAttachments();
  }
  getJSActions() {
    return this._transport.getDocJSActions();
  }
  getOutline() {
    return this._transport.getOutline();
  }
  getOptionalContentConfig({
    intent = "display"
  } = {}) {
    const {
      renderingIntent
    } = this._transport.getRenderingIntent(intent);
    return this._transport.getOptionalContentConfig(renderingIntent);
  }
  getPermissions() {
    return this._transport.getPermissions();
  }
  getMetadata() {
    return this._transport.getMetadata();
  }
  getMarkInfo() {
    return this._transport.getMarkInfo();
  }
  getData() {
    return this._transport.getData();
  }
  saveDocument() {
    return this._transport.saveDocument();
  }
  getDownloadInfo() {
    return this._transport.downloadInfoCapability.promise;
  }
  cleanup(keepLoadedFonts = false) {
    return this._transport.startCleanup(keepLoadedFonts || this.isPureXfa);
  }
  destroy() {
    return this.loadingTask.destroy();
  }
  cachedPageNumber(ref) {
    return this._transport.cachedPageNumber(ref);
  }
  get loadingParams() {
    return this._transport.loadingParams;
  }
  get loadingTask() {
    return this._transport.loadingTask;
  }
  getFieldObjects() {
    return this._transport.getFieldObjects();
  }
  hasJSActions() {
    return this._transport.hasJSActions();
  }
  getCalculationOrderIds() {
    return this._transport.getCalculationOrderIds();
  }
};
var _delayedCleanupTimeout, _pendingCleanup, _PDFPageProxy_instances, tryCleanup_fn, abortDelayedCleanup_fn;
var PDFPageProxy = class {
  constructor(pageIndex, pageInfo, transport, pdfBug = false) {
    __privateAdd(this, _PDFPageProxy_instances);
    __privateAdd(this, _delayedCleanupTimeout, null);
    __privateAdd(this, _pendingCleanup, false);
    this._pageIndex = pageIndex;
    this._pageInfo = pageInfo;
    this._transport = transport;
    this._stats = pdfBug ? new StatTimer() : null;
    this._pdfBug = pdfBug;
    this.commonObjs = transport.commonObjs;
    this.objs = new PDFObjects();
    this._maybeCleanupAfterRender = false;
    this._intentStates = /* @__PURE__ */ new Map();
    this.destroyed = false;
  }
  get pageNumber() {
    return this._pageIndex + 1;
  }
  get rotate() {
    return this._pageInfo.rotate;
  }
  get ref() {
    return this._pageInfo.ref;
  }
  get userUnit() {
    return this._pageInfo.userUnit;
  }
  get view() {
    return this._pageInfo.view;
  }
  getViewport({
    scale,
    rotation = this.rotate,
    offsetX = 0,
    offsetY = 0,
    dontFlip = false
  } = {}) {
    return new PageViewport({
      viewBox: this.view,
      scale,
      rotation,
      offsetX,
      offsetY,
      dontFlip
    });
  }
  getAnnotations({
    intent = "display"
  } = {}) {
    const {
      renderingIntent
    } = this._transport.getRenderingIntent(intent);
    return this._transport.getAnnotations(this._pageIndex, renderingIntent);
  }
  getJSActions() {
    return this._transport.getPageJSActions(this._pageIndex);
  }
  get filterFactory() {
    return this._transport.filterFactory;
  }
  get isPureXfa() {
    return shadow(this, "isPureXfa", !!this._transport._htmlForXfa);
  }
  async getXfa() {
    var _a2;
    return ((_a2 = this._transport._htmlForXfa) == null ? void 0 : _a2.children[this._pageIndex]) || null;
  }
  render({
    canvasContext,
    viewport,
    intent = "display",
    annotationMode = AnnotationMode.ENABLE,
    transform = null,
    background = null,
    optionalContentConfigPromise = null,
    annotationCanvasMap = null,
    pageColors = null,
    printAnnotationStorage = null
  }) {
    var _a2, _b;
    (_a2 = this._stats) == null ? void 0 : _a2.time("Overall");
    const intentArgs = this._transport.getRenderingIntent(intent, annotationMode, printAnnotationStorage);
    const {
      renderingIntent,
      cacheKey
    } = intentArgs;
    __privateSet(this, _pendingCleanup, false);
    __privateMethod(this, _PDFPageProxy_instances, abortDelayedCleanup_fn).call(this);
    optionalContentConfigPromise || (optionalContentConfigPromise = this._transport.getOptionalContentConfig(renderingIntent));
    let intentState = this._intentStates.get(cacheKey);
    if (!intentState) {
      intentState = /* @__PURE__ */ Object.create(null);
      this._intentStates.set(cacheKey, intentState);
    }
    if (intentState.streamReaderCancelTimeout) {
      clearTimeout(intentState.streamReaderCancelTimeout);
      intentState.streamReaderCancelTimeout = null;
    }
    const intentPrint = !!(renderingIntent & RenderingIntentFlag.PRINT);
    if (!intentState.displayReadyCapability) {
      intentState.displayReadyCapability = Promise.withResolvers();
      intentState.operatorList = {
        fnArray: [],
        argsArray: [],
        lastChunk: false,
        separateAnnots: null
      };
      (_b = this._stats) == null ? void 0 : _b.time("Page Request");
      this._pumpOperatorList(intentArgs);
    }
    const complete = (error) => {
      var _a3;
      intentState.renderTasks.delete(internalRenderTask);
      if (this._maybeCleanupAfterRender || intentPrint) {
        __privateSet(this, _pendingCleanup, true);
      }
      __privateMethod(this, _PDFPageProxy_instances, tryCleanup_fn).call(this, !intentPrint);
      if (error) {
        internalRenderTask.capability.reject(error);
        this._abortOperatorList({
          intentState,
          reason: error instanceof Error ? error : new Error(error)
        });
      } else {
        internalRenderTask.capability.resolve();
      }
      if (this._stats) {
        this._stats.timeEnd("Rendering");
        this._stats.timeEnd("Overall");
        if ((_a3 = globalThis.Stats) == null ? void 0 : _a3.enabled) {
          globalThis.Stats.add(this.pageNumber, this._stats);
        }
      }
    };
    const internalRenderTask = new InternalRenderTask({
      callback: complete,
      params: {
        canvasContext,
        viewport,
        transform,
        background
      },
      objs: this.objs,
      commonObjs: this.commonObjs,
      annotationCanvasMap,
      operatorList: intentState.operatorList,
      pageIndex: this._pageIndex,
      canvasFactory: this._transport.canvasFactory,
      filterFactory: this._transport.filterFactory,
      useRequestAnimationFrame: !intentPrint,
      pdfBug: this._pdfBug,
      pageColors
    });
    (intentState.renderTasks || (intentState.renderTasks = /* @__PURE__ */ new Set())).add(internalRenderTask);
    const renderTask = internalRenderTask.task;
    Promise.all([intentState.displayReadyCapability.promise, optionalContentConfigPromise]).then(([transparency, optionalContentConfig]) => {
      var _a3;
      if (this.destroyed) {
        complete();
        return;
      }
      (_a3 = this._stats) == null ? void 0 : _a3.time("Rendering");
      if (!(optionalContentConfig.renderingIntent & renderingIntent)) {
        throw new Error("Must use the same `intent`-argument when calling the `PDFPageProxy.render` and `PDFDocumentProxy.getOptionalContentConfig` methods.");
      }
      internalRenderTask.initializeGraphics({
        transparency,
        optionalContentConfig
      });
      internalRenderTask.operatorListChanged();
    }).catch(complete);
    return renderTask;
  }
  getOperatorList({
    intent = "display",
    annotationMode = AnnotationMode.ENABLE,
    printAnnotationStorage = null
  } = {}) {
    var _a2;
    function operatorListChanged() {
      if (intentState.operatorList.lastChunk) {
        intentState.opListReadCapability.resolve(intentState.operatorList);
        intentState.renderTasks.delete(opListTask);
      }
    }
    const intentArgs = this._transport.getRenderingIntent(intent, annotationMode, printAnnotationStorage, true);
    let intentState = this._intentStates.get(intentArgs.cacheKey);
    if (!intentState) {
      intentState = /* @__PURE__ */ Object.create(null);
      this._intentStates.set(intentArgs.cacheKey, intentState);
    }
    let opListTask;
    if (!intentState.opListReadCapability) {
      opListTask = /* @__PURE__ */ Object.create(null);
      opListTask.operatorListChanged = operatorListChanged;
      intentState.opListReadCapability = Promise.withResolvers();
      (intentState.renderTasks || (intentState.renderTasks = /* @__PURE__ */ new Set())).add(opListTask);
      intentState.operatorList = {
        fnArray: [],
        argsArray: [],
        lastChunk: false,
        separateAnnots: null
      };
      (_a2 = this._stats) == null ? void 0 : _a2.time("Page Request");
      this._pumpOperatorList(intentArgs);
    }
    return intentState.opListReadCapability.promise;
  }
  streamTextContent({
    includeMarkedContent = false,
    disableNormalization = false
  } = {}) {
    const TEXT_CONTENT_CHUNK_SIZE = 100;
    return this._transport.messageHandler.sendWithStream("GetTextContent", {
      pageIndex: this._pageIndex,
      includeMarkedContent: includeMarkedContent === true,
      disableNormalization: disableNormalization === true
    }, {
      highWaterMark: TEXT_CONTENT_CHUNK_SIZE,
      size(textContent) {
        return textContent.items.length;
      }
    });
  }
  getTextContent(params = {}) {
    if (this._transport._htmlForXfa) {
      return this.getXfa().then((xfa) => XfaText.textContent(xfa));
    }
    const readableStream = this.streamTextContent(params);
    return new Promise(function(resolve, reject) {
      function pump() {
        reader.read().then(function({
          value,
          done
        }) {
          if (done) {
            resolve(textContent);
            return;
          }
          textContent.lang ?? (textContent.lang = value.lang);
          Object.assign(textContent.styles, value.styles);
          textContent.items.push(...value.items);
          pump();
        }, reject);
      }
      const reader = readableStream.getReader();
      const textContent = {
        items: [],
        styles: /* @__PURE__ */ Object.create(null),
        lang: null
      };
      pump();
    });
  }
  getStructTree() {
    return this._transport.getStructTree(this._pageIndex);
  }
  _destroy() {
    this.destroyed = true;
    const waitOn = [];
    for (const intentState of this._intentStates.values()) {
      this._abortOperatorList({
        intentState,
        reason: new Error("Page was destroyed."),
        force: true
      });
      if (intentState.opListReadCapability) {
        continue;
      }
      for (const internalRenderTask of intentState.renderTasks) {
        waitOn.push(internalRenderTask.completed);
        internalRenderTask.cancel();
      }
    }
    this.objs.clear();
    __privateSet(this, _pendingCleanup, false);
    __privateMethod(this, _PDFPageProxy_instances, abortDelayedCleanup_fn).call(this);
    return Promise.all(waitOn);
  }
  cleanup(resetStats = false) {
    __privateSet(this, _pendingCleanup, true);
    const success = __privateMethod(this, _PDFPageProxy_instances, tryCleanup_fn).call(this, false);
    if (resetStats && success) {
      this._stats && (this._stats = new StatTimer());
    }
    return success;
  }
  _startRenderPage(transparency, cacheKey) {
    var _a2, _b;
    const intentState = this._intentStates.get(cacheKey);
    if (!intentState) {
      return;
    }
    (_a2 = this._stats) == null ? void 0 : _a2.timeEnd("Page Request");
    (_b = intentState.displayReadyCapability) == null ? void 0 : _b.resolve(transparency);
  }
  _renderPageChunk(operatorListChunk, intentState) {
    for (let i2 = 0, ii = operatorListChunk.length; i2 < ii; i2++) {
      intentState.operatorList.fnArray.push(operatorListChunk.fnArray[i2]);
      intentState.operatorList.argsArray.push(operatorListChunk.argsArray[i2]);
    }
    intentState.operatorList.lastChunk = operatorListChunk.lastChunk;
    intentState.operatorList.separateAnnots = operatorListChunk.separateAnnots;
    for (const internalRenderTask of intentState.renderTasks) {
      internalRenderTask.operatorListChanged();
    }
    if (operatorListChunk.lastChunk) {
      __privateMethod(this, _PDFPageProxy_instances, tryCleanup_fn).call(this, true);
    }
  }
  _pumpOperatorList({
    renderingIntent,
    cacheKey,
    annotationStorageSerializable
  }) {
    const {
      map,
      transfer
    } = annotationStorageSerializable;
    const readableStream = this._transport.messageHandler.sendWithStream("GetOperatorList", {
      pageIndex: this._pageIndex,
      intent: renderingIntent,
      cacheKey,
      annotationStorage: map
    }, transfer);
    const reader = readableStream.getReader();
    const intentState = this._intentStates.get(cacheKey);
    intentState.streamReader = reader;
    const pump = () => {
      reader.read().then(({
        value,
        done
      }) => {
        if (done) {
          intentState.streamReader = null;
          return;
        }
        if (this._transport.destroyed) {
          return;
        }
        this._renderPageChunk(value, intentState);
        pump();
      }, (reason) => {
        intentState.streamReader = null;
        if (this._transport.destroyed) {
          return;
        }
        if (intentState.operatorList) {
          intentState.operatorList.lastChunk = true;
          for (const internalRenderTask of intentState.renderTasks) {
            internalRenderTask.operatorListChanged();
          }
          __privateMethod(this, _PDFPageProxy_instances, tryCleanup_fn).call(this, true);
        }
        if (intentState.displayReadyCapability) {
          intentState.displayReadyCapability.reject(reason);
        } else if (intentState.opListReadCapability) {
          intentState.opListReadCapability.reject(reason);
        } else {
          throw reason;
        }
      });
    };
    pump();
  }
  _abortOperatorList({
    intentState,
    reason,
    force = false
  }) {
    if (!intentState.streamReader) {
      return;
    }
    if (intentState.streamReaderCancelTimeout) {
      clearTimeout(intentState.streamReaderCancelTimeout);
      intentState.streamReaderCancelTimeout = null;
    }
    if (!force) {
      if (intentState.renderTasks.size > 0) {
        return;
      }
      if (reason instanceof RenderingCancelledException) {
        let delay = RENDERING_CANCELLED_TIMEOUT;
        if (reason.extraDelay > 0 && reason.extraDelay < 1e3) {
          delay += reason.extraDelay;
        }
        intentState.streamReaderCancelTimeout = setTimeout(() => {
          intentState.streamReaderCancelTimeout = null;
          this._abortOperatorList({
            intentState,
            reason,
            force: true
          });
        }, delay);
        return;
      }
    }
    intentState.streamReader.cancel(new AbortException(reason.message)).catch(() => {
    });
    intentState.streamReader = null;
    if (this._transport.destroyed) {
      return;
    }
    for (const [curCacheKey, curIntentState] of this._intentStates) {
      if (curIntentState === intentState) {
        this._intentStates.delete(curCacheKey);
        break;
      }
    }
    this.cleanup();
  }
  get stats() {
    return this._stats;
  }
};
_delayedCleanupTimeout = new WeakMap();
_pendingCleanup = new WeakMap();
_PDFPageProxy_instances = new WeakSet();
tryCleanup_fn = function(delayed = false) {
  __privateMethod(this, _PDFPageProxy_instances, abortDelayedCleanup_fn).call(this);
  if (!__privateGet(this, _pendingCleanup) || this.destroyed) {
    return false;
  }
  if (delayed) {
    __privateSet(this, _delayedCleanupTimeout, setTimeout(() => {
      __privateSet(this, _delayedCleanupTimeout, null);
      __privateMethod(this, _PDFPageProxy_instances, tryCleanup_fn).call(this, false);
    }, DELAYED_CLEANUP_TIMEOUT));
    return false;
  }
  for (const {
    renderTasks,
    operatorList
  } of this._intentStates.values()) {
    if (renderTasks.size > 0 || !operatorList.lastChunk) {
      return false;
    }
  }
  this._intentStates.clear();
  this.objs.clear();
  __privateSet(this, _pendingCleanup, false);
  return true;
};
abortDelayedCleanup_fn = function() {
  if (__privateGet(this, _delayedCleanupTimeout)) {
    clearTimeout(__privateGet(this, _delayedCleanupTimeout));
    __privateSet(this, _delayedCleanupTimeout, null);
  }
};
var _listeners, _deferred;
var LoopbackPort = class {
  constructor() {
    __privateAdd(this, _listeners, /* @__PURE__ */ new Set());
    __privateAdd(this, _deferred, Promise.resolve());
  }
  postMessage(obj, transfer) {
    const event = {
      data: structuredClone(obj, transfer ? {
        transfer
      } : null)
    };
    __privateGet(this, _deferred).then(() => {
      for (const listener of __privateGet(this, _listeners)) {
        listener.call(this, event);
      }
    });
  }
  addEventListener(name, listener) {
    __privateGet(this, _listeners).add(listener);
  }
  removeEventListener(name, listener) {
    __privateGet(this, _listeners).delete(listener);
  }
  terminate() {
    __privateGet(this, _listeners).clear();
  }
};
_listeners = new WeakMap();
_deferred = new WeakMap();
var PDFWorkerUtil = {
  isWorkerDisabled: false,
  fakeWorkerId: 0
};
{
  if (isNodeJS) {
    PDFWorkerUtil.isWorkerDisabled = true;
    GlobalWorkerOptions.workerSrc || (GlobalWorkerOptions.workerSrc = "./pdf.worker.mjs");
  }
  PDFWorkerUtil.isSameOrigin = function(baseUrl, otherUrl) {
    let base;
    try {
      base = new URL(baseUrl);
      if (!base.origin || base.origin === "null") {
        return false;
      }
    } catch {
      return false;
    }
    const other = new URL(otherUrl, base);
    return base.origin === other.origin;
  };
  PDFWorkerUtil.createCDNWrapper = function(url) {
    const wrapper = `await import("${url}");`;
    return URL.createObjectURL(new Blob([wrapper], {
      type: "text/javascript"
    }));
  };
}
var _workerPorts, _PDFWorker_static, mainThreadWorkerMessageHandler_get;
var _PDFWorker = class _PDFWorker {
  constructor({
    name = null,
    port = null,
    verbosity: verbosity2 = getVerbosityLevel()
  } = {}) {
    var _a2;
    this.name = name;
    this.destroyed = false;
    this.verbosity = verbosity2;
    this._readyCapability = Promise.withResolvers();
    this._port = null;
    this._webWorker = null;
    this._messageHandler = null;
    if (port) {
      if ((_a2 = __privateGet(_PDFWorker, _workerPorts)) == null ? void 0 : _a2.has(port)) {
        throw new Error("Cannot use more than one PDFWorker per port.");
      }
      (__privateGet(_PDFWorker, _workerPorts) || __privateSet(_PDFWorker, _workerPorts, /* @__PURE__ */ new WeakMap())).set(port, this);
      this._initializeFromPort(port);
      return;
    }
    this._initialize();
  }
  get promise() {
    if (isNodeJS) {
      return Promise.all([NodePackages.promise, this._readyCapability.promise]);
    }
    return this._readyCapability.promise;
  }
  get port() {
    return this._port;
  }
  get messageHandler() {
    return this._messageHandler;
  }
  _initializeFromPort(port) {
    this._port = port;
    this._messageHandler = new MessageHandler("main", "worker", port);
    this._messageHandler.on("ready", function() {
    });
    this._readyCapability.resolve();
    this._messageHandler.send("configure", {
      verbosity: this.verbosity
    });
  }
  _initialize() {
    if (!PDFWorkerUtil.isWorkerDisabled && !__privateGet(_PDFWorker, _PDFWorker_static, mainThreadWorkerMessageHandler_get)) {
      let {
        workerSrc
      } = _PDFWorker;
      try {
        if (!PDFWorkerUtil.isSameOrigin(window.location.href, workerSrc)) {
          workerSrc = PDFWorkerUtil.createCDNWrapper(new URL(workerSrc, window.location).href);
        }
        const worker = new Worker(workerSrc, {
          type: "module"
        });
        const messageHandler = new MessageHandler("main", "worker", worker);
        const terminateEarly = () => {
          worker.removeEventListener("error", onWorkerError);
          messageHandler.destroy();
          worker.terminate();
          if (this.destroyed) {
            this._readyCapability.reject(new Error("Worker was destroyed"));
          } else {
            this._setupFakeWorker();
          }
        };
        const onWorkerError = () => {
          if (!this._webWorker) {
            terminateEarly();
          }
        };
        worker.addEventListener("error", onWorkerError);
        messageHandler.on("test", (data) => {
          worker.removeEventListener("error", onWorkerError);
          if (this.destroyed) {
            terminateEarly();
            return;
          }
          if (data) {
            this._messageHandler = messageHandler;
            this._port = worker;
            this._webWorker = worker;
            this._readyCapability.resolve();
            messageHandler.send("configure", {
              verbosity: this.verbosity
            });
          } else {
            this._setupFakeWorker();
            messageHandler.destroy();
            worker.terminate();
          }
        });
        messageHandler.on("ready", (data) => {
          worker.removeEventListener("error", onWorkerError);
          if (this.destroyed) {
            terminateEarly();
            return;
          }
          try {
            sendTest();
          } catch {
            this._setupFakeWorker();
          }
        });
        const sendTest = () => {
          const testObj = new Uint8Array();
          messageHandler.send("test", testObj, [testObj.buffer]);
        };
        sendTest();
        return;
      } catch {
        info("The worker has been disabled.");
      }
    }
    this._setupFakeWorker();
  }
  _setupFakeWorker() {
    if (!PDFWorkerUtil.isWorkerDisabled) {
      warn("Setting up fake worker.");
      PDFWorkerUtil.isWorkerDisabled = true;
    }
    _PDFWorker._setupFakeWorkerGlobal.then((WorkerMessageHandler) => {
      if (this.destroyed) {
        this._readyCapability.reject(new Error("Worker was destroyed"));
        return;
      }
      const port = new LoopbackPort();
      this._port = port;
      const id = `fake${PDFWorkerUtil.fakeWorkerId++}`;
      const workerHandler = new MessageHandler(id + "_worker", id, port);
      WorkerMessageHandler.setup(workerHandler, port);
      const messageHandler = new MessageHandler(id, id + "_worker", port);
      this._messageHandler = messageHandler;
      this._readyCapability.resolve();
      messageHandler.send("configure", {
        verbosity: this.verbosity
      });
    }).catch((reason) => {
      this._readyCapability.reject(new Error(`Setting up fake worker failed: "${reason.message}".`));
    });
  }
  destroy() {
    var _a2;
    this.destroyed = true;
    if (this._webWorker) {
      this._webWorker.terminate();
      this._webWorker = null;
    }
    (_a2 = __privateGet(_PDFWorker, _workerPorts)) == null ? void 0 : _a2.delete(this._port);
    this._port = null;
    if (this._messageHandler) {
      this._messageHandler.destroy();
      this._messageHandler = null;
    }
  }
  static fromPort(params) {
    var _a2;
    if (!(params == null ? void 0 : params.port)) {
      throw new Error("PDFWorker.fromPort - invalid method signature.");
    }
    const cachedPort = (_a2 = __privateGet(this, _workerPorts)) == null ? void 0 : _a2.get(params.port);
    if (cachedPort) {
      if (cachedPort._pendingDestroy) {
        throw new Error("PDFWorker.fromPort - the worker is being destroyed.\nPlease remember to await `PDFDocumentLoadingTask.destroy()`-calls.");
      }
      return cachedPort;
    }
    return new _PDFWorker(params);
  }
  static get workerSrc() {
    if (GlobalWorkerOptions.workerSrc) {
      return GlobalWorkerOptions.workerSrc;
    }
    throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
  }
  static get _setupFakeWorkerGlobal() {
    const loader = async () => {
      if (__privateGet(this, _PDFWorker_static, mainThreadWorkerMessageHandler_get)) {
        return __privateGet(this, _PDFWorker_static, mainThreadWorkerMessageHandler_get);
      }
      const worker = await import(
        /*webpackIgnore: true*/
        this.workerSrc
      );
      return worker.WorkerMessageHandler;
    };
    return shadow(this, "_setupFakeWorkerGlobal", loader());
  }
};
_workerPorts = new WeakMap();
_PDFWorker_static = new WeakSet();
mainThreadWorkerMessageHandler_get = function() {
  var _a2;
  try {
    return ((_a2 = globalThis.pdfjsWorker) == null ? void 0 : _a2.WorkerMessageHandler) || null;
  } catch {
    return null;
  }
};
__privateAdd(_PDFWorker, _PDFWorker_static);
__privateAdd(_PDFWorker, _workerPorts);
var PDFWorker = _PDFWorker;
var _methodPromises, _pageCache, _pagePromises, _pageRefCache, _passwordCapability, _WorkerTransport_instances, cacheSimpleMethod_fn;
var WorkerTransport = class {
  constructor(messageHandler, loadingTask, networkStream, params, factory) {
    __privateAdd(this, _WorkerTransport_instances);
    __privateAdd(this, _methodPromises, /* @__PURE__ */ new Map());
    __privateAdd(this, _pageCache, /* @__PURE__ */ new Map());
    __privateAdd(this, _pagePromises, /* @__PURE__ */ new Map());
    __privateAdd(this, _pageRefCache, /* @__PURE__ */ new Map());
    __privateAdd(this, _passwordCapability, null);
    this.messageHandler = messageHandler;
    this.loadingTask = loadingTask;
    this.commonObjs = new PDFObjects();
    this.fontLoader = new FontLoader({
      ownerDocument: params.ownerDocument,
      styleElement: params.styleElement
    });
    this.loadingParams = params.loadingParams;
    this._params = params;
    this.canvasFactory = factory.canvasFactory;
    this.filterFactory = factory.filterFactory;
    this.cMapReaderFactory = factory.cMapReaderFactory;
    this.standardFontDataFactory = factory.standardFontDataFactory;
    this.destroyed = false;
    this.destroyCapability = null;
    this._networkStream = networkStream;
    this._fullReader = null;
    this._lastProgress = null;
    this.downloadInfoCapability = Promise.withResolvers();
    this.setupMessageHandler();
  }
  get annotationStorage() {
    return shadow(this, "annotationStorage", new AnnotationStorage());
  }
  getRenderingIntent(intent, annotationMode = AnnotationMode.ENABLE, printAnnotationStorage = null, isOpList = false) {
    let renderingIntent = RenderingIntentFlag.DISPLAY;
    let annotationStorageSerializable = SerializableEmpty;
    switch (intent) {
      case "any":
        renderingIntent = RenderingIntentFlag.ANY;
        break;
      case "display":
        break;
      case "print":
        renderingIntent = RenderingIntentFlag.PRINT;
        break;
      default:
        warn(`getRenderingIntent - invalid intent: ${intent}`);
    }
    switch (annotationMode) {
      case AnnotationMode.DISABLE:
        renderingIntent += RenderingIntentFlag.ANNOTATIONS_DISABLE;
        break;
      case AnnotationMode.ENABLE:
        break;
      case AnnotationMode.ENABLE_FORMS:
        renderingIntent += RenderingIntentFlag.ANNOTATIONS_FORMS;
        break;
      case AnnotationMode.ENABLE_STORAGE:
        renderingIntent += RenderingIntentFlag.ANNOTATIONS_STORAGE;
        const annotationStorage = renderingIntent & RenderingIntentFlag.PRINT && printAnnotationStorage instanceof PrintAnnotationStorage ? printAnnotationStorage : this.annotationStorage;
        annotationStorageSerializable = annotationStorage.serializable;
        break;
      default:
        warn(`getRenderingIntent - invalid annotationMode: ${annotationMode}`);
    }
    if (isOpList) {
      renderingIntent += RenderingIntentFlag.OPLIST;
    }
    return {
      renderingIntent,
      cacheKey: `${renderingIntent}_${annotationStorageSerializable.hash}`,
      annotationStorageSerializable
    };
  }
  destroy() {
    var _a2;
    if (this.destroyCapability) {
      return this.destroyCapability.promise;
    }
    this.destroyed = true;
    this.destroyCapability = Promise.withResolvers();
    (_a2 = __privateGet(this, _passwordCapability)) == null ? void 0 : _a2.reject(new Error("Worker was destroyed during onPassword callback"));
    const waitOn = [];
    for (const page of __privateGet(this, _pageCache).values()) {
      waitOn.push(page._destroy());
    }
    __privateGet(this, _pageCache).clear();
    __privateGet(this, _pagePromises).clear();
    __privateGet(this, _pageRefCache).clear();
    if (this.hasOwnProperty("annotationStorage")) {
      this.annotationStorage.resetModified();
    }
    const terminated = this.messageHandler.sendWithPromise("Terminate", null);
    waitOn.push(terminated);
    Promise.all(waitOn).then(() => {
      var _a3;
      this.commonObjs.clear();
      this.fontLoader.clear();
      __privateGet(this, _methodPromises).clear();
      this.filterFactory.destroy();
      TextLayer.cleanup();
      (_a3 = this._networkStream) == null ? void 0 : _a3.cancelAllRequests(new AbortException("Worker was terminated."));
      if (this.messageHandler) {
        this.messageHandler.destroy();
        this.messageHandler = null;
      }
      this.destroyCapability.resolve();
    }, this.destroyCapability.reject);
    return this.destroyCapability.promise;
  }
  setupMessageHandler() {
    const {
      messageHandler,
      loadingTask
    } = this;
    messageHandler.on("GetReader", (data, sink) => {
      assert(this._networkStream, "GetReader - no `IPDFStream` instance available.");
      this._fullReader = this._networkStream.getFullReader();
      this._fullReader.onProgress = (evt) => {
        this._lastProgress = {
          loaded: evt.loaded,
          total: evt.total
        };
      };
      sink.onPull = () => {
        this._fullReader.read().then(function({
          value,
          done
        }) {
          if (done) {
            sink.close();
            return;
          }
          assert(value instanceof ArrayBuffer, "GetReader - expected an ArrayBuffer.");
          sink.enqueue(new Uint8Array(value), 1, [value]);
        }).catch((reason) => {
          sink.error(reason);
        });
      };
      sink.onCancel = (reason) => {
        this._fullReader.cancel(reason);
        sink.ready.catch((readyReason) => {
          if (this.destroyed) {
            return;
          }
          throw readyReason;
        });
      };
    });
    messageHandler.on("ReaderHeadersReady", (data) => {
      const headersCapability = Promise.withResolvers();
      const fullReader = this._fullReader;
      fullReader.headersReady.then(() => {
        var _a2;
        if (!fullReader.isStreamingSupported || !fullReader.isRangeSupported) {
          if (this._lastProgress) {
            (_a2 = loadingTask.onProgress) == null ? void 0 : _a2.call(loadingTask, this._lastProgress);
          }
          fullReader.onProgress = (evt) => {
            var _a3;
            (_a3 = loadingTask.onProgress) == null ? void 0 : _a3.call(loadingTask, {
              loaded: evt.loaded,
              total: evt.total
            });
          };
        }
        headersCapability.resolve({
          isStreamingSupported: fullReader.isStreamingSupported,
          isRangeSupported: fullReader.isRangeSupported,
          contentLength: fullReader.contentLength
        });
      }, headersCapability.reject);
      return headersCapability.promise;
    });
    messageHandler.on("GetRangeReader", (data, sink) => {
      assert(this._networkStream, "GetRangeReader - no `IPDFStream` instance available.");
      const rangeReader = this._networkStream.getRangeReader(data.begin, data.end);
      if (!rangeReader) {
        sink.close();
        return;
      }
      sink.onPull = () => {
        rangeReader.read().then(function({
          value,
          done
        }) {
          if (done) {
            sink.close();
            return;
          }
          assert(value instanceof ArrayBuffer, "GetRangeReader - expected an ArrayBuffer.");
          sink.enqueue(new Uint8Array(value), 1, [value]);
        }).catch((reason) => {
          sink.error(reason);
        });
      };
      sink.onCancel = (reason) => {
        rangeReader.cancel(reason);
        sink.ready.catch((readyReason) => {
          if (this.destroyed) {
            return;
          }
          throw readyReason;
        });
      };
    });
    messageHandler.on("GetDoc", ({
      pdfInfo
    }) => {
      this._numPages = pdfInfo.numPages;
      this._htmlForXfa = pdfInfo.htmlForXfa;
      delete pdfInfo.htmlForXfa;
      loadingTask._capability.resolve(new PDFDocumentProxy(pdfInfo, this));
    });
    messageHandler.on("DocException", function(ex) {
      let reason;
      switch (ex.name) {
        case "PasswordException":
          reason = new PasswordException(ex.message, ex.code);
          break;
        case "InvalidPDFException":
          reason = new InvalidPDFException(ex.message);
          break;
        case "MissingPDFException":
          reason = new MissingPDFException(ex.message);
          break;
        case "UnexpectedResponseException":
          reason = new UnexpectedResponseException(ex.message, ex.status);
          break;
        case "UnknownErrorException":
          reason = new UnknownErrorException(ex.message, ex.details);
          break;
        default:
          unreachable("DocException - expected a valid Error.");
      }
      loadingTask._capability.reject(reason);
    });
    messageHandler.on("PasswordRequest", (exception) => {
      __privateSet(this, _passwordCapability, Promise.withResolvers());
      if (loadingTask.onPassword) {
        const updatePassword = (password) => {
          if (password instanceof Error) {
            __privateGet(this, _passwordCapability).reject(password);
          } else {
            __privateGet(this, _passwordCapability).resolve({
              password
            });
          }
        };
        try {
          loadingTask.onPassword(updatePassword, exception.code);
        } catch (ex) {
          __privateGet(this, _passwordCapability).reject(ex);
        }
      } else {
        __privateGet(this, _passwordCapability).reject(new PasswordException(exception.message, exception.code));
      }
      return __privateGet(this, _passwordCapability).promise;
    });
    messageHandler.on("DataLoaded", (data) => {
      var _a2;
      (_a2 = loadingTask.onProgress) == null ? void 0 : _a2.call(loadingTask, {
        loaded: data.length,
        total: data.length
      });
      this.downloadInfoCapability.resolve(data);
    });
    messageHandler.on("StartRenderPage", (data) => {
      if (this.destroyed) {
        return;
      }
      const page = __privateGet(this, _pageCache).get(data.pageIndex);
      page._startRenderPage(data.transparency, data.cacheKey);
    });
    messageHandler.on("commonobj", ([id, type, exportedData]) => {
      var _a2;
      if (this.destroyed) {
        return null;
      }
      if (this.commonObjs.has(id)) {
        return null;
      }
      switch (type) {
        case "Font":
          const {
            disableFontFace,
            fontExtraProperties,
            pdfBug
          } = this._params;
          if ("error" in exportedData) {
            const exportedError = exportedData.error;
            warn(`Error during font loading: ${exportedError}`);
            this.commonObjs.resolve(id, exportedError);
            break;
          }
          const inspectFont = pdfBug && ((_a2 = globalThis.FontInspector) == null ? void 0 : _a2.enabled) ? (font2, url) => globalThis.FontInspector.fontAdded(font2, url) : null;
          const font = new FontFaceObject(exportedData, {
            disableFontFace,
            inspectFont
          });
          this.fontLoader.bind(font).catch(() => messageHandler.sendWithPromise("FontFallback", {
            id
          })).finally(() => {
            if (!fontExtraProperties && font.data) {
              font.data = null;
            }
            this.commonObjs.resolve(id, font);
          });
          break;
        case "CopyLocalImage":
          const {
            imageRef
          } = exportedData;
          assert(imageRef, "The imageRef must be defined.");
          for (const pageProxy of __privateGet(this, _pageCache).values()) {
            for (const [, data] of pageProxy.objs) {
              if ((data == null ? void 0 : data.ref) !== imageRef) {
                continue;
              }
              if (!data.dataLen) {
                return null;
              }
              this.commonObjs.resolve(id, structuredClone(data));
              return data.dataLen;
            }
          }
          break;
        case "FontPath":
        case "Image":
        case "Pattern":
          this.commonObjs.resolve(id, exportedData);
          break;
        default:
          throw new Error(`Got unknown common object type ${type}`);
      }
      return null;
    });
    messageHandler.on("obj", ([id, pageIndex, type, imageData]) => {
      var _a2;
      if (this.destroyed) {
        return;
      }
      const pageProxy = __privateGet(this, _pageCache).get(pageIndex);
      if (pageProxy.objs.has(id)) {
        return;
      }
      if (pageProxy._intentStates.size === 0) {
        (_a2 = imageData == null ? void 0 : imageData.bitmap) == null ? void 0 : _a2.close();
        return;
      }
      switch (type) {
        case "Image":
          pageProxy.objs.resolve(id, imageData);
          if ((imageData == null ? void 0 : imageData.dataLen) > MAX_IMAGE_SIZE_TO_CACHE) {
            pageProxy._maybeCleanupAfterRender = true;
          }
          break;
        case "Pattern":
          pageProxy.objs.resolve(id, imageData);
          break;
        default:
          throw new Error(`Got unknown object type ${type}`);
      }
    });
    messageHandler.on("DocProgress", (data) => {
      var _a2;
      if (this.destroyed) {
        return;
      }
      (_a2 = loadingTask.onProgress) == null ? void 0 : _a2.call(loadingTask, {
        loaded: data.loaded,
        total: data.total
      });
    });
    messageHandler.on("FetchBuiltInCMap", (data) => {
      if (this.destroyed) {
        return Promise.reject(new Error("Worker was destroyed."));
      }
      if (!this.cMapReaderFactory) {
        return Promise.reject(new Error("CMapReaderFactory not initialized, see the `useWorkerFetch` parameter."));
      }
      return this.cMapReaderFactory.fetch(data);
    });
    messageHandler.on("FetchStandardFontData", (data) => {
      if (this.destroyed) {
        return Promise.reject(new Error("Worker was destroyed."));
      }
      if (!this.standardFontDataFactory) {
        return Promise.reject(new Error("StandardFontDataFactory not initialized, see the `useWorkerFetch` parameter."));
      }
      return this.standardFontDataFactory.fetch(data);
    });
  }
  getData() {
    return this.messageHandler.sendWithPromise("GetData", null);
  }
  saveDocument() {
    var _a2;
    if (this.annotationStorage.size <= 0) {
      warn("saveDocument called while `annotationStorage` is empty, please use the getData-method instead.");
    }
    const {
      map,
      transfer
    } = this.annotationStorage.serializable;
    return this.messageHandler.sendWithPromise("SaveDocument", {
      isPureXfa: !!this._htmlForXfa,
      numPages: this._numPages,
      annotationStorage: map,
      filename: ((_a2 = this._fullReader) == null ? void 0 : _a2.filename) ?? null
    }, transfer).finally(() => {
      this.annotationStorage.resetModified();
    });
  }
  getPage(pageNumber) {
    if (!Number.isInteger(pageNumber) || pageNumber <= 0 || pageNumber > this._numPages) {
      return Promise.reject(new Error("Invalid page request."));
    }
    const pageIndex = pageNumber - 1, cachedPromise = __privateGet(this, _pagePromises).get(pageIndex);
    if (cachedPromise) {
      return cachedPromise;
    }
    const promise = this.messageHandler.sendWithPromise("GetPage", {
      pageIndex
    }).then((pageInfo) => {
      if (this.destroyed) {
        throw new Error("Transport destroyed");
      }
      if (pageInfo.refStr) {
        __privateGet(this, _pageRefCache).set(pageInfo.refStr, pageNumber);
      }
      const page = new PDFPageProxy(pageIndex, pageInfo, this, this._params.pdfBug);
      __privateGet(this, _pageCache).set(pageIndex, page);
      return page;
    });
    __privateGet(this, _pagePromises).set(pageIndex, promise);
    return promise;
  }
  getPageIndex(ref) {
    if (!isRefProxy(ref)) {
      return Promise.reject(new Error("Invalid pageIndex request."));
    }
    return this.messageHandler.sendWithPromise("GetPageIndex", {
      num: ref.num,
      gen: ref.gen
    });
  }
  getAnnotations(pageIndex, intent) {
    return this.messageHandler.sendWithPromise("GetAnnotations", {
      pageIndex,
      intent
    });
  }
  getFieldObjects() {
    return __privateMethod(this, _WorkerTransport_instances, cacheSimpleMethod_fn).call(this, "GetFieldObjects");
  }
  hasJSActions() {
    return __privateMethod(this, _WorkerTransport_instances, cacheSimpleMethod_fn).call(this, "HasJSActions");
  }
  getCalculationOrderIds() {
    return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
  }
  getDestinations() {
    return this.messageHandler.sendWithPromise("GetDestinations", null);
  }
  getDestination(id) {
    if (typeof id !== "string") {
      return Promise.reject(new Error("Invalid destination request."));
    }
    return this.messageHandler.sendWithPromise("GetDestination", {
      id
    });
  }
  getPageLabels() {
    return this.messageHandler.sendWithPromise("GetPageLabels", null);
  }
  getPageLayout() {
    return this.messageHandler.sendWithPromise("GetPageLayout", null);
  }
  getPageMode() {
    return this.messageHandler.sendWithPromise("GetPageMode", null);
  }
  getViewerPreferences() {
    return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
  }
  getOpenAction() {
    return this.messageHandler.sendWithPromise("GetOpenAction", null);
  }
  getAttachments() {
    return this.messageHandler.sendWithPromise("GetAttachments", null);
  }
  getDocJSActions() {
    return __privateMethod(this, _WorkerTransport_instances, cacheSimpleMethod_fn).call(this, "GetDocJSActions");
  }
  getPageJSActions(pageIndex) {
    return this.messageHandler.sendWithPromise("GetPageJSActions", {
      pageIndex
    });
  }
  getStructTree(pageIndex) {
    return this.messageHandler.sendWithPromise("GetStructTree", {
      pageIndex
    });
  }
  getOutline() {
    return this.messageHandler.sendWithPromise("GetOutline", null);
  }
  getOptionalContentConfig(renderingIntent) {
    return __privateMethod(this, _WorkerTransport_instances, cacheSimpleMethod_fn).call(this, "GetOptionalContentConfig").then((data) => new OptionalContentConfig(data, renderingIntent));
  }
  getPermissions() {
    return this.messageHandler.sendWithPromise("GetPermissions", null);
  }
  getMetadata() {
    const name = "GetMetadata", cachedPromise = __privateGet(this, _methodPromises).get(name);
    if (cachedPromise) {
      return cachedPromise;
    }
    const promise = this.messageHandler.sendWithPromise(name, null).then((results) => {
      var _a2, _b;
      return {
        info: results[0],
        metadata: results[1] ? new Metadata(results[1]) : null,
        contentDispositionFilename: ((_a2 = this._fullReader) == null ? void 0 : _a2.filename) ?? null,
        contentLength: ((_b = this._fullReader) == null ? void 0 : _b.contentLength) ?? null
      };
    });
    __privateGet(this, _methodPromises).set(name, promise);
    return promise;
  }
  getMarkInfo() {
    return this.messageHandler.sendWithPromise("GetMarkInfo", null);
  }
  async startCleanup(keepLoadedFonts = false) {
    if (this.destroyed) {
      return;
    }
    await this.messageHandler.sendWithPromise("Cleanup", null);
    for (const page of __privateGet(this, _pageCache).values()) {
      const cleanupSuccessful = page.cleanup();
      if (!cleanupSuccessful) {
        throw new Error(`startCleanup: Page ${page.pageNumber} is currently rendering.`);
      }
    }
    this.commonObjs.clear();
    if (!keepLoadedFonts) {
      this.fontLoader.clear();
    }
    __privateGet(this, _methodPromises).clear();
    this.filterFactory.destroy(true);
    TextLayer.cleanup();
  }
  cachedPageNumber(ref) {
    if (!isRefProxy(ref)) {
      return null;
    }
    const refStr = ref.gen === 0 ? `${ref.num}R` : `${ref.num}R${ref.gen}`;
    return __privateGet(this, _pageRefCache).get(refStr) ?? null;
  }
};
_methodPromises = new WeakMap();
_pageCache = new WeakMap();
_pagePromises = new WeakMap();
_pageRefCache = new WeakMap();
_passwordCapability = new WeakMap();
_WorkerTransport_instances = new WeakSet();
cacheSimpleMethod_fn = function(name, data = null) {
  const cachedPromise = __privateGet(this, _methodPromises).get(name);
  if (cachedPromise) {
    return cachedPromise;
  }
  const promise = this.messageHandler.sendWithPromise(name, data);
  __privateGet(this, _methodPromises).set(name, promise);
  return promise;
};
var INITIAL_DATA = Symbol("INITIAL_DATA");
var _objs, _PDFObjects_instances, ensureObj_fn;
var PDFObjects = class {
  constructor() {
    __privateAdd(this, _PDFObjects_instances);
    __privateAdd(this, _objs, /* @__PURE__ */ Object.create(null));
  }
  get(objId, callback = null) {
    if (callback) {
      const obj2 = __privateMethod(this, _PDFObjects_instances, ensureObj_fn).call(this, objId);
      obj2.promise.then(() => callback(obj2.data));
      return null;
    }
    const obj = __privateGet(this, _objs)[objId];
    if (!obj || obj.data === INITIAL_DATA) {
      throw new Error(`Requesting object that isn't resolved yet ${objId}.`);
    }
    return obj.data;
  }
  has(objId) {
    const obj = __privateGet(this, _objs)[objId];
    return !!obj && obj.data !== INITIAL_DATA;
  }
  resolve(objId, data = null) {
    const obj = __privateMethod(this, _PDFObjects_instances, ensureObj_fn).call(this, objId);
    obj.data = data;
    obj.resolve();
  }
  clear() {
    var _a2;
    for (const objId in __privateGet(this, _objs)) {
      const {
        data
      } = __privateGet(this, _objs)[objId];
      (_a2 = data == null ? void 0 : data.bitmap) == null ? void 0 : _a2.close();
    }
    __privateSet(this, _objs, /* @__PURE__ */ Object.create(null));
  }
  *[Symbol.iterator]() {
    for (const objId in __privateGet(this, _objs)) {
      const {
        data
      } = __privateGet(this, _objs)[objId];
      if (data === INITIAL_DATA) {
        continue;
      }
      yield [objId, data];
    }
  }
};
_objs = new WeakMap();
_PDFObjects_instances = new WeakSet();
ensureObj_fn = function(objId) {
  var _a2;
  return (_a2 = __privateGet(this, _objs))[objId] || (_a2[objId] = {
    ...Promise.withResolvers(),
    data: INITIAL_DATA
  });
};
var _internalRenderTask;
var RenderTask = class {
  constructor(internalRenderTask) {
    __privateAdd(this, _internalRenderTask, null);
    __privateSet(this, _internalRenderTask, internalRenderTask);
    this.onContinue = null;
  }
  get promise() {
    return __privateGet(this, _internalRenderTask).capability.promise;
  }
  cancel(extraDelay = 0) {
    __privateGet(this, _internalRenderTask).cancel(null, extraDelay);
  }
  get separateAnnots() {
    const {
      separateAnnots
    } = __privateGet(this, _internalRenderTask).operatorList;
    if (!separateAnnots) {
      return false;
    }
    const {
      annotationCanvasMap
    } = __privateGet(this, _internalRenderTask);
    return separateAnnots.form || separateAnnots.canvas && (annotationCanvasMap == null ? void 0 : annotationCanvasMap.size) > 0;
  }
};
_internalRenderTask = new WeakMap();
var _canvasInUse;
var _InternalRenderTask = class _InternalRenderTask {
  constructor({
    callback,
    params,
    objs,
    commonObjs,
    annotationCanvasMap,
    operatorList,
    pageIndex,
    canvasFactory,
    filterFactory,
    useRequestAnimationFrame = false,
    pdfBug = false,
    pageColors = null
  }) {
    this.callback = callback;
    this.params = params;
    this.objs = objs;
    this.commonObjs = commonObjs;
    this.annotationCanvasMap = annotationCanvasMap;
    this.operatorListIdx = null;
    this.operatorList = operatorList;
    this._pageIndex = pageIndex;
    this.canvasFactory = canvasFactory;
    this.filterFactory = filterFactory;
    this._pdfBug = pdfBug;
    this.pageColors = pageColors;
    this.running = false;
    this.graphicsReadyCallback = null;
    this.graphicsReady = false;
    this._useRequestAnimationFrame = useRequestAnimationFrame === true && typeof window !== "undefined";
    this.cancelled = false;
    this.capability = Promise.withResolvers();
    this.task = new RenderTask(this);
    this._cancelBound = this.cancel.bind(this);
    this._continueBound = this._continue.bind(this);
    this._scheduleNextBound = this._scheduleNext.bind(this);
    this._nextBound = this._next.bind(this);
    this._canvas = params.canvasContext.canvas;
  }
  get completed() {
    return this.capability.promise.catch(function() {
    });
  }
  initializeGraphics({
    transparency = false,
    optionalContentConfig
  }) {
    var _a2, _b;
    if (this.cancelled) {
      return;
    }
    if (this._canvas) {
      if (__privateGet(_InternalRenderTask, _canvasInUse).has(this._canvas)) {
        throw new Error("Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.");
      }
      __privateGet(_InternalRenderTask, _canvasInUse).add(this._canvas);
    }
    if (this._pdfBug && ((_a2 = globalThis.StepperManager) == null ? void 0 : _a2.enabled)) {
      this.stepper = globalThis.StepperManager.create(this._pageIndex);
      this.stepper.init(this.operatorList);
      this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();
    }
    const {
      canvasContext,
      viewport,
      transform,
      background
    } = this.params;
    this.gfx = new CanvasGraphics(canvasContext, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
      optionalContentConfig
    }, this.annotationCanvasMap, this.pageColors);
    this.gfx.beginDrawing({
      transform,
      viewport,
      transparency,
      background
    });
    this.operatorListIdx = 0;
    this.graphicsReady = true;
    (_b = this.graphicsReadyCallback) == null ? void 0 : _b.call(this);
  }
  cancel(error = null, extraDelay = 0) {
    var _a2;
    this.running = false;
    this.cancelled = true;
    (_a2 = this.gfx) == null ? void 0 : _a2.endDrawing();
    __privateGet(_InternalRenderTask, _canvasInUse).delete(this._canvas);
    this.callback(error || new RenderingCancelledException(`Rendering cancelled, page ${this._pageIndex + 1}`, extraDelay));
  }
  operatorListChanged() {
    var _a2;
    if (!this.graphicsReady) {
      this.graphicsReadyCallback || (this.graphicsReadyCallback = this._continueBound);
      return;
    }
    (_a2 = this.stepper) == null ? void 0 : _a2.updateOperatorList(this.operatorList);
    if (this.running) {
      return;
    }
    this._continue();
  }
  _continue() {
    this.running = true;
    if (this.cancelled) {
      return;
    }
    if (this.task.onContinue) {
      this.task.onContinue(this._scheduleNextBound);
    } else {
      this._scheduleNext();
    }
  }
  _scheduleNext() {
    if (this._useRequestAnimationFrame) {
      window.requestAnimationFrame(() => {
        this._nextBound().catch(this._cancelBound);
      });
    } else {
      Promise.resolve().then(this._nextBound).catch(this._cancelBound);
    }
  }
  async _next() {
    if (this.cancelled) {
      return;
    }
    this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper);
    if (this.operatorListIdx === this.operatorList.argsArray.length) {
      this.running = false;
      if (this.operatorList.lastChunk) {
        this.gfx.endDrawing();
        __privateGet(_InternalRenderTask, _canvasInUse).delete(this._canvas);
        this.callback();
      }
    }
  }
};
_canvasInUse = new WeakMap();
__privateAdd(_InternalRenderTask, _canvasInUse, /* @__PURE__ */ new WeakSet());
var InternalRenderTask = _InternalRenderTask;
var version = "4.3.136";
var build = "0cec64437";
function makeColorComp(n2) {
  return Math.floor(Math.max(0, Math.min(1, n2)) * 255).toString(16).padStart(2, "0");
}
function scaleAndClamp(x2) {
  return Math.max(0, Math.min(255, 255 * x2));
}
var ColorConverters = class {
  static CMYK_G([c2, y2, m2, k2]) {
    return ["G", 1 - Math.min(1, 0.3 * c2 + 0.59 * m2 + 0.11 * y2 + k2)];
  }
  static G_CMYK([g2]) {
    return ["CMYK", 0, 0, 0, 1 - g2];
  }
  static G_RGB([g2]) {
    return ["RGB", g2, g2, g2];
  }
  static G_rgb([g2]) {
    g2 = scaleAndClamp(g2);
    return [g2, g2, g2];
  }
  static G_HTML([g2]) {
    const G2 = makeColorComp(g2);
    return `#${G2}${G2}${G2}`;
  }
  static RGB_G([r2, g2, b2]) {
    return ["G", 0.3 * r2 + 0.59 * g2 + 0.11 * b2];
  }
  static RGB_rgb(color) {
    return color.map(scaleAndClamp);
  }
  static RGB_HTML(color) {
    return `#${color.map(makeColorComp).join("")}`;
  }
  static T_HTML() {
    return "#00000000";
  }
  static T_rgb() {
    return [null];
  }
  static CMYK_RGB([c2, y2, m2, k2]) {
    return ["RGB", 1 - Math.min(1, c2 + k2), 1 - Math.min(1, m2 + k2), 1 - Math.min(1, y2 + k2)];
  }
  static CMYK_rgb([c2, y2, m2, k2]) {
    return [scaleAndClamp(1 - Math.min(1, c2 + k2)), scaleAndClamp(1 - Math.min(1, m2 + k2)), scaleAndClamp(1 - Math.min(1, y2 + k2))];
  }
  static CMYK_HTML(components) {
    const rgb = this.CMYK_RGB(components).slice(1);
    return this.RGB_HTML(rgb);
  }
  static RGB_CMYK([r2, g2, b2]) {
    const c2 = 1 - r2;
    const m2 = 1 - g2;
    const y2 = 1 - b2;
    const k2 = Math.min(c2, m2, y2);
    return ["CMYK", c2, m2, y2, k2];
  }
};
var XfaLayer = class {
  static setupStorage(html, id, element, storage, intent) {
    const storedData = storage.getValue(id, {
      value: null
    });
    switch (element.name) {
      case "textarea":
        if (storedData.value !== null) {
          html.textContent = storedData.value;
        }
        if (intent === "print") {
          break;
        }
        html.addEventListener("input", (event) => {
          storage.setValue(id, {
            value: event.target.value
          });
        });
        break;
      case "input":
        if (element.attributes.type === "radio" || element.attributes.type === "checkbox") {
          if (storedData.value === element.attributes.xfaOn) {
            html.setAttribute("checked", true);
          } else if (storedData.value === element.attributes.xfaOff) {
            html.removeAttribute("checked");
          }
          if (intent === "print") {
            break;
          }
          html.addEventListener("change", (event) => {
            storage.setValue(id, {
              value: event.target.checked ? event.target.getAttribute("xfaOn") : event.target.getAttribute("xfaOff")
            });
          });
        } else {
          if (storedData.value !== null) {
            html.setAttribute("value", storedData.value);
          }
          if (intent === "print") {
            break;
          }
          html.addEventListener("input", (event) => {
            storage.setValue(id, {
              value: event.target.value
            });
          });
        }
        break;
      case "select":
        if (storedData.value !== null) {
          html.setAttribute("value", storedData.value);
          for (const option of element.children) {
            if (option.attributes.value === storedData.value) {
              option.attributes.selected = true;
            } else if (option.attributes.hasOwnProperty("selected")) {
              delete option.attributes.selected;
            }
          }
        }
        html.addEventListener("input", (event) => {
          const options = event.target.options;
          const value = options.selectedIndex === -1 ? "" : options[options.selectedIndex].value;
          storage.setValue(id, {
            value
          });
        });
        break;
    }
  }
  static setAttributes({
    html,
    element,
    storage = null,
    intent,
    linkService
  }) {
    const {
      attributes
    } = element;
    const isHTMLAnchorElement = html instanceof HTMLAnchorElement;
    if (attributes.type === "radio") {
      attributes.name = `${attributes.name}-${intent}`;
    }
    for (const [key, value] of Object.entries(attributes)) {
      if (value === null || value === void 0) {
        continue;
      }
      switch (key) {
        case "class":
          if (value.length) {
            html.setAttribute(key, value.join(" "));
          }
          break;
        case "dataId":
          break;
        case "id":
          html.setAttribute("data-element-id", value);
          break;
        case "style":
          Object.assign(html.style, value);
          break;
        case "textContent":
          html.textContent = value;
          break;
        default:
          if (!isHTMLAnchorElement || key !== "href" && key !== "newWindow") {
            html.setAttribute(key, value);
          }
      }
    }
    if (isHTMLAnchorElement) {
      linkService.addLinkAttributes(html, attributes.href, attributes.newWindow);
    }
    if (storage && attributes.dataId) {
      this.setupStorage(html, attributes.dataId, element, storage);
    }
  }
  static render(parameters) {
    var _a2, _b;
    const storage = parameters.annotationStorage;
    const linkService = parameters.linkService;
    const root = parameters.xfaHtml;
    const intent = parameters.intent || "display";
    const rootHtml = document.createElement(root.name);
    if (root.attributes) {
      this.setAttributes({
        html: rootHtml,
        element: root,
        intent,
        linkService
      });
    }
    const isNotForRichText = intent !== "richText";
    const rootDiv = parameters.div;
    rootDiv.append(rootHtml);
    if (parameters.viewport) {
      const transform = `matrix(${parameters.viewport.transform.join(",")})`;
      rootDiv.style.transform = transform;
    }
    if (isNotForRichText) {
      rootDiv.setAttribute("class", "xfaLayer xfaFont");
    }
    const textDivs = [];
    if (root.children.length === 0) {
      if (root.value) {
        const node = document.createTextNode(root.value);
        rootHtml.append(node);
        if (isNotForRichText && XfaText.shouldBuildText(root.name)) {
          textDivs.push(node);
        }
      }
      return {
        textDivs
      };
    }
    const stack = [[root, -1, rootHtml]];
    while (stack.length > 0) {
      const [parent, i2, html] = stack.at(-1);
      if (i2 + 1 === parent.children.length) {
        stack.pop();
        continue;
      }
      const child = parent.children[++stack.at(-1)[1]];
      if (child === null) {
        continue;
      }
      const {
        name
      } = child;
      if (name === "#text") {
        const node = document.createTextNode(child.value);
        textDivs.push(node);
        html.append(node);
        continue;
      }
      const childHtml = ((_a2 = child == null ? void 0 : child.attributes) == null ? void 0 : _a2.xmlns) ? document.createElementNS(child.attributes.xmlns, name) : document.createElement(name);
      html.append(childHtml);
      if (child.attributes) {
        this.setAttributes({
          html: childHtml,
          element: child,
          storage,
          intent,
          linkService
        });
      }
      if (((_b = child.children) == null ? void 0 : _b.length) > 0) {
        stack.push([child, -1, childHtml]);
      } else if (child.value) {
        const node = document.createTextNode(child.value);
        if (isNotForRichText && XfaText.shouldBuildText(name)) {
          textDivs.push(node);
        }
        childHtml.append(node);
      }
    }
    for (const el of rootDiv.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea")) {
      el.setAttribute("readOnly", true);
    }
    return {
      textDivs
    };
  }
  static update(parameters) {
    const transform = `matrix(${parameters.viewport.transform.join(",")})`;
    parameters.div.style.transform = transform;
    parameters.div.hidden = false;
  }
};
var DEFAULT_TAB_INDEX = 1e3;
var annotation_layer_DEFAULT_FONT_SIZE = 9;
var GetElementsByNameSet = /* @__PURE__ */ new WeakSet();
function getRectDims(rect) {
  return {
    width: rect[2] - rect[0],
    height: rect[3] - rect[1]
  };
}
var AnnotationElementFactory = class {
  static create(parameters) {
    const subtype = parameters.data.annotationType;
    switch (subtype) {
      case AnnotationType.LINK:
        return new LinkAnnotationElement(parameters);
      case AnnotationType.TEXT:
        return new TextAnnotationElement(parameters);
      case AnnotationType.WIDGET:
        const fieldType = parameters.data.fieldType;
        switch (fieldType) {
          case "Tx":
            return new TextWidgetAnnotationElement(parameters);
          case "Btn":
            if (parameters.data.radioButton) {
              return new RadioButtonWidgetAnnotationElement(parameters);
            } else if (parameters.data.checkBox) {
              return new CheckboxWidgetAnnotationElement(parameters);
            }
            return new PushButtonWidgetAnnotationElement(parameters);
          case "Ch":
            return new ChoiceWidgetAnnotationElement(parameters);
          case "Sig":
            return new SignatureWidgetAnnotationElement(parameters);
        }
        return new WidgetAnnotationElement(parameters);
      case AnnotationType.POPUP:
        return new PopupAnnotationElement(parameters);
      case AnnotationType.FREETEXT:
        return new FreeTextAnnotationElement(parameters);
      case AnnotationType.LINE:
        return new LineAnnotationElement(parameters);
      case AnnotationType.SQUARE:
        return new SquareAnnotationElement(parameters);
      case AnnotationType.CIRCLE:
        return new CircleAnnotationElement(parameters);
      case AnnotationType.POLYLINE:
        return new PolylineAnnotationElement(parameters);
      case AnnotationType.CARET:
        return new CaretAnnotationElement(parameters);
      case AnnotationType.INK:
        return new InkAnnotationElement(parameters);
      case AnnotationType.POLYGON:
        return new PolygonAnnotationElement(parameters);
      case AnnotationType.HIGHLIGHT:
        return new HighlightAnnotationElement(parameters);
      case AnnotationType.UNDERLINE:
        return new UnderlineAnnotationElement(parameters);
      case AnnotationType.SQUIGGLY:
        return new SquigglyAnnotationElement(parameters);
      case AnnotationType.STRIKEOUT:
        return new StrikeOutAnnotationElement(parameters);
      case AnnotationType.STAMP:
        return new StampAnnotationElement(parameters);
      case AnnotationType.FILEATTACHMENT:
        return new FileAttachmentAnnotationElement(parameters);
      default:
        return new AnnotationElement(parameters);
    }
  }
};
var _updates, _hasBorder, _popupElement, _AnnotationElement_instances, setRectEdited_fn;
var _AnnotationElement = class _AnnotationElement {
  constructor(parameters, {
    isRenderable = false,
    ignoreBorder = false,
    createQuadrilaterals = false
  } = {}) {
    __privateAdd(this, _AnnotationElement_instances);
    __privateAdd(this, _updates, null);
    __privateAdd(this, _hasBorder, false);
    __privateAdd(this, _popupElement, null);
    this.isRenderable = isRenderable;
    this.data = parameters.data;
    this.layer = parameters.layer;
    this.linkService = parameters.linkService;
    this.downloadManager = parameters.downloadManager;
    this.imageResourcesPath = parameters.imageResourcesPath;
    this.renderForms = parameters.renderForms;
    this.svgFactory = parameters.svgFactory;
    this.annotationStorage = parameters.annotationStorage;
    this.enableScripting = parameters.enableScripting;
    this.hasJSActions = parameters.hasJSActions;
    this._fieldObjects = parameters.fieldObjects;
    this.parent = parameters.parent;
    if (isRenderable) {
      this.container = this._createContainer(ignoreBorder);
    }
    if (createQuadrilaterals) {
      this._createQuadrilaterals();
    }
  }
  static _hasPopupData({
    titleObj,
    contentsObj,
    richText
  }) {
    return !!((titleObj == null ? void 0 : titleObj.str) || (contentsObj == null ? void 0 : contentsObj.str) || (richText == null ? void 0 : richText.str));
  }
  get hasPopupData() {
    return _AnnotationElement._hasPopupData(this.data);
  }
  updateEdited(params) {
    var _a2;
    if (!this.container) {
      return;
    }
    __privateGet(this, _updates) || __privateSet(this, _updates, {
      rect: this.data.rect.slice(0)
    });
    const {
      rect
    } = params;
    if (rect) {
      __privateMethod(this, _AnnotationElement_instances, setRectEdited_fn).call(this, rect);
    }
    (_a2 = __privateGet(this, _popupElement)) == null ? void 0 : _a2.popup.updateEdited(params);
  }
  resetEdited() {
    var _a2;
    if (!__privateGet(this, _updates)) {
      return;
    }
    __privateMethod(this, _AnnotationElement_instances, setRectEdited_fn).call(this, __privateGet(this, _updates).rect);
    (_a2 = __privateGet(this, _popupElement)) == null ? void 0 : _a2.popup.resetEdited();
    __privateSet(this, _updates, null);
  }
  _createContainer(ignoreBorder) {
    const {
      data,
      parent: {
        page,
        viewport
      }
    } = this;
    const container = document.createElement("section");
    container.setAttribute("data-annotation-id", data.id);
    if (!(this instanceof WidgetAnnotationElement)) {
      container.tabIndex = DEFAULT_TAB_INDEX;
    }
    const {
      style
    } = container;
    style.zIndex = this.parent.zIndex++;
    if (data.popupRef) {
      container.setAttribute("aria-haspopup", "dialog");
    }
    if (data.alternativeText) {
      container.title = data.alternativeText;
    }
    if (data.noRotate) {
      container.classList.add("norotate");
    }
    if (!data.rect || this instanceof PopupAnnotationElement) {
      const {
        rotation: rotation2
      } = data;
      if (!data.hasOwnCanvas && rotation2 !== 0) {
        this.setRotation(rotation2, container);
      }
      return container;
    }
    const {
      width,
      height
    } = getRectDims(data.rect);
    if (!ignoreBorder && data.borderStyle.width > 0) {
      style.borderWidth = `${data.borderStyle.width}px`;
      const horizontalRadius = data.borderStyle.horizontalCornerRadius;
      const verticalRadius = data.borderStyle.verticalCornerRadius;
      if (horizontalRadius > 0 || verticalRadius > 0) {
        const radius = `calc(${horizontalRadius}px * var(--scale-factor)) / calc(${verticalRadius}px * var(--scale-factor))`;
        style.borderRadius = radius;
      } else if (this instanceof RadioButtonWidgetAnnotationElement) {
        const radius = `calc(${width}px * var(--scale-factor)) / calc(${height}px * var(--scale-factor))`;
        style.borderRadius = radius;
      }
      switch (data.borderStyle.style) {
        case AnnotationBorderStyleType.SOLID:
          style.borderStyle = "solid";
          break;
        case AnnotationBorderStyleType.DASHED:
          style.borderStyle = "dashed";
          break;
        case AnnotationBorderStyleType.BEVELED:
          warn("Unimplemented border style: beveled");
          break;
        case AnnotationBorderStyleType.INSET:
          warn("Unimplemented border style: inset");
          break;
        case AnnotationBorderStyleType.UNDERLINE:
          style.borderBottomStyle = "solid";
          break;
        default:
          break;
      }
      const borderColor = data.borderColor || null;
      if (borderColor) {
        __privateSet(this, _hasBorder, true);
        style.borderColor = Util.makeHexColor(borderColor[0] | 0, borderColor[1] | 0, borderColor[2] | 0);
      } else {
        style.borderWidth = 0;
      }
    }
    const rect = Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);
    const {
      pageWidth,
      pageHeight,
      pageX,
      pageY
    } = viewport.rawDims;
    style.left = `${100 * (rect[0] - pageX) / pageWidth}%`;
    style.top = `${100 * (rect[1] - pageY) / pageHeight}%`;
    const {
      rotation
    } = data;
    if (data.hasOwnCanvas || rotation === 0) {
      style.width = `${100 * width / pageWidth}%`;
      style.height = `${100 * height / pageHeight}%`;
    } else {
      this.setRotation(rotation, container);
    }
    return container;
  }
  setRotation(angle, container = this.container) {
    if (!this.data.rect) {
      return;
    }
    const {
      pageWidth,
      pageHeight
    } = this.parent.viewport.rawDims;
    const {
      width,
      height
    } = getRectDims(this.data.rect);
    let elementWidth, elementHeight;
    if (angle % 180 === 0) {
      elementWidth = 100 * width / pageWidth;
      elementHeight = 100 * height / pageHeight;
    } else {
      elementWidth = 100 * height / pageWidth;
      elementHeight = 100 * width / pageHeight;
    }
    container.style.width = `${elementWidth}%`;
    container.style.height = `${elementHeight}%`;
    container.setAttribute("data-main-rotation", (360 - angle) % 360);
  }
  get _commonActions() {
    const setColor = (jsName, styleName, event) => {
      const color = event.detail[jsName];
      const colorType = color[0];
      const colorArray = color.slice(1);
      event.target.style[styleName] = ColorConverters[`${colorType}_HTML`](colorArray);
      this.annotationStorage.setValue(this.data.id, {
        [styleName]: ColorConverters[`${colorType}_rgb`](colorArray)
      });
    };
    return shadow(this, "_commonActions", {
      display: (event) => {
        const {
          display
        } = event.detail;
        const hidden = display % 2 === 1;
        this.container.style.visibility = hidden ? "hidden" : "visible";
        this.annotationStorage.setValue(this.data.id, {
          noView: hidden,
          noPrint: display === 1 || display === 2
        });
      },
      print: (event) => {
        this.annotationStorage.setValue(this.data.id, {
          noPrint: !event.detail.print
        });
      },
      hidden: (event) => {
        const {
          hidden
        } = event.detail;
        this.container.style.visibility = hidden ? "hidden" : "visible";
        this.annotationStorage.setValue(this.data.id, {
          noPrint: hidden,
          noView: hidden
        });
      },
      focus: (event) => {
        setTimeout(() => event.target.focus({
          preventScroll: false
        }), 0);
      },
      userName: (event) => {
        event.target.title = event.detail.userName;
      },
      readonly: (event) => {
        event.target.disabled = event.detail.readonly;
      },
      required: (event) => {
        this._setRequired(event.target, event.detail.required);
      },
      bgColor: (event) => {
        setColor("bgColor", "backgroundColor", event);
      },
      fillColor: (event) => {
        setColor("fillColor", "backgroundColor", event);
      },
      fgColor: (event) => {
        setColor("fgColor", "color", event);
      },
      textColor: (event) => {
        setColor("textColor", "color", event);
      },
      borderColor: (event) => {
        setColor("borderColor", "borderColor", event);
      },
      strokeColor: (event) => {
        setColor("strokeColor", "borderColor", event);
      },
      rotation: (event) => {
        const angle = event.detail.rotation;
        this.setRotation(angle);
        this.annotationStorage.setValue(this.data.id, {
          rotation: angle
        });
      }
    });
  }
  _dispatchEventFromSandbox(actions, jsEvent) {
    const commonActions = this._commonActions;
    for (const name of Object.keys(jsEvent.detail)) {
      const action = actions[name] || commonActions[name];
      action == null ? void 0 : action(jsEvent);
    }
  }
  _setDefaultPropertiesFromJS(element) {
    if (!this.enableScripting) {
      return;
    }
    const storedData = this.annotationStorage.getRawValue(this.data.id);
    if (!storedData) {
      return;
    }
    const commonActions = this._commonActions;
    for (const [actionName, detail] of Object.entries(storedData)) {
      const action = commonActions[actionName];
      if (action) {
        const eventProxy = {
          detail: {
            [actionName]: detail
          },
          target: element
        };
        action(eventProxy);
        delete storedData[actionName];
      }
    }
  }
  _createQuadrilaterals() {
    if (!this.container) {
      return;
    }
    const {
      quadPoints
    } = this.data;
    if (!quadPoints) {
      return;
    }
    const [rectBlX, rectBlY, rectTrX, rectTrY] = this.data.rect;
    if (quadPoints.length === 1) {
      const [, {
        x: trX,
        y: trY
      }, {
        x: blX,
        y: blY
      }] = quadPoints[0];
      if (rectTrX === trX && rectTrY === trY && rectBlX === blX && rectBlY === blY) {
        return;
      }
    }
    const {
      style
    } = this.container;
    let svgBuffer;
    if (__privateGet(this, _hasBorder)) {
      const {
        borderColor,
        borderWidth
      } = style;
      style.borderWidth = 0;
      svgBuffer = ["url('data:image/svg+xml;utf8,", `<svg xmlns="http://www.w3.org/2000/svg"`, ` preserveAspectRatio="none" viewBox="0 0 1 1">`, `<g fill="transparent" stroke="${borderColor}" stroke-width="${borderWidth}">`];
      this.container.classList.add("hasBorder");
    }
    const width = rectTrX - rectBlX;
    const height = rectTrY - rectBlY;
    const {
      svgFactory
    } = this;
    const svg = svgFactory.createElement("svg");
    svg.classList.add("quadrilateralsContainer");
    svg.setAttribute("width", 0);
    svg.setAttribute("height", 0);
    const defs = svgFactory.createElement("defs");
    svg.append(defs);
    const clipPath = svgFactory.createElement("clipPath");
    const id = `clippath_${this.data.id}`;
    clipPath.setAttribute("id", id);
    clipPath.setAttribute("clipPathUnits", "objectBoundingBox");
    defs.append(clipPath);
    for (const [, {
      x: trX,
      y: trY
    }, {
      x: blX,
      y: blY
    }] of quadPoints) {
      const rect = svgFactory.createElement("rect");
      const x2 = (blX - rectBlX) / width;
      const y2 = (rectTrY - trY) / height;
      const rectWidth = (trX - blX) / width;
      const rectHeight = (trY - blY) / height;
      rect.setAttribute("x", x2);
      rect.setAttribute("y", y2);
      rect.setAttribute("width", rectWidth);
      rect.setAttribute("height", rectHeight);
      clipPath.append(rect);
      svgBuffer == null ? void 0 : svgBuffer.push(`<rect vector-effect="non-scaling-stroke" x="${x2}" y="${y2}" width="${rectWidth}" height="${rectHeight}"/>`);
    }
    if (__privateGet(this, _hasBorder)) {
      svgBuffer.push(`</g></svg>')`);
      style.backgroundImage = svgBuffer.join("");
    }
    this.container.append(svg);
    this.container.style.clipPath = `url(#${id})`;
  }
  _createPopup() {
    const {
      container,
      data
    } = this;
    container.setAttribute("aria-haspopup", "dialog");
    const popup = __privateSet(this, _popupElement, new PopupAnnotationElement({
      data: {
        color: data.color,
        titleObj: data.titleObj,
        modificationDate: data.modificationDate,
        contentsObj: data.contentsObj,
        richText: data.richText,
        parentRect: data.rect,
        borderStyle: 0,
        id: `popup_${data.id}`,
        rotation: data.rotation
      },
      parent: this.parent,
      elements: [this]
    }));
    this.parent.div.append(popup.render());
  }
  render() {
    unreachable("Abstract method `AnnotationElement.render` called");
  }
  _getElementsByName(name, skipId = null) {
    const fields = [];
    if (this._fieldObjects) {
      const fieldObj = this._fieldObjects[name];
      if (fieldObj) {
        for (const {
          page,
          id,
          exportValues
        } of fieldObj) {
          if (page === -1) {
            continue;
          }
          if (id === skipId) {
            continue;
          }
          const exportValue = typeof exportValues === "string" ? exportValues : null;
          const domElement = document.querySelector(`[data-element-id="${id}"]`);
          if (domElement && !GetElementsByNameSet.has(domElement)) {
            warn(`_getElementsByName - element not allowed: ${id}`);
            continue;
          }
          fields.push({
            id,
            exportValue,
            domElement
          });
        }
      }
      return fields;
    }
    for (const domElement of document.getElementsByName(name)) {
      const {
        exportValue
      } = domElement;
      const id = domElement.getAttribute("data-element-id");
      if (id === skipId) {
        continue;
      }
      if (!GetElementsByNameSet.has(domElement)) {
        continue;
      }
      fields.push({
        id,
        exportValue,
        domElement
      });
    }
    return fields;
  }
  show() {
    var _a2;
    if (this.container) {
      this.container.hidden = false;
    }
    (_a2 = this.popup) == null ? void 0 : _a2.maybeShow();
  }
  hide() {
    var _a2;
    if (this.container) {
      this.container.hidden = true;
    }
    (_a2 = this.popup) == null ? void 0 : _a2.forceHide();
  }
  getElementsToTriggerPopup() {
    return this.container;
  }
  addHighlightArea() {
    const triggers = this.getElementsToTriggerPopup();
    if (Array.isArray(triggers)) {
      for (const element of triggers) {
        element.classList.add("highlightArea");
      }
    } else {
      triggers.classList.add("highlightArea");
    }
  }
  get _isEditable() {
    return false;
  }
  _editOnDoubleClick() {
    if (!this._isEditable) {
      return;
    }
    const {
      annotationEditorType: mode,
      data: {
        id: editId
      }
    } = this;
    this.container.addEventListener("dblclick", () => {
      var _a2;
      (_a2 = this.linkService.eventBus) == null ? void 0 : _a2.dispatch("switchannotationeditormode", {
        source: this,
        mode,
        editId
      });
    });
  }
};
_updates = new WeakMap();
_hasBorder = new WeakMap();
_popupElement = new WeakMap();
_AnnotationElement_instances = new WeakSet();
setRectEdited_fn = function(rect) {
  const {
    container: {
      style
    },
    data: {
      rect: currentRect,
      rotation
    },
    parent: {
      viewport: {
        rawDims: {
          pageWidth,
          pageHeight,
          pageX,
          pageY
        }
      }
    }
  } = this;
  currentRect == null ? void 0 : currentRect.splice(0, 4, ...rect);
  const {
    width,
    height
  } = getRectDims(rect);
  style.left = `${100 * (rect[0] - pageX) / pageWidth}%`;
  style.top = `${100 * (pageHeight - rect[3] + pageY) / pageHeight}%`;
  if (rotation === 0) {
    style.width = `${100 * width / pageWidth}%`;
    style.height = `${100 * height / pageHeight}%`;
  } else {
    this.setRotation(rotation);
  }
};
var AnnotationElement = _AnnotationElement;
var _LinkAnnotationElement_instances, setInternalLink_fn, bindAttachment_fn, bindSetOCGState_fn;
var LinkAnnotationElement = class extends AnnotationElement {
  constructor(parameters, options = null) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: !!(options == null ? void 0 : options.ignoreBorder),
      createQuadrilaterals: true
    });
    __privateAdd(this, _LinkAnnotationElement_instances);
    this.isTooltipOnly = parameters.data.isTooltipOnly;
  }
  render() {
    const {
      data,
      linkService
    } = this;
    const link = document.createElement("a");
    link.setAttribute("data-element-id", data.id);
    let isBound = false;
    if (data.url) {
      linkService.addLinkAttributes(link, data.url, data.newWindow);
      isBound = true;
    } else if (data.action) {
      this._bindNamedAction(link, data.action);
      isBound = true;
    } else if (data.attachment) {
      __privateMethod(this, _LinkAnnotationElement_instances, bindAttachment_fn).call(this, link, data.attachment, data.attachmentDest);
      isBound = true;
    } else if (data.setOCGState) {
      __privateMethod(this, _LinkAnnotationElement_instances, bindSetOCGState_fn).call(this, link, data.setOCGState);
      isBound = true;
    } else if (data.dest) {
      this._bindLink(link, data.dest);
      isBound = true;
    } else {
      if (data.actions && (data.actions.Action || data.actions["Mouse Up"] || data.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions) {
        this._bindJSAction(link, data);
        isBound = true;
      }
      if (data.resetForm) {
        this._bindResetFormAction(link, data.resetForm);
        isBound = true;
      } else if (this.isTooltipOnly && !isBound) {
        this._bindLink(link, "");
        isBound = true;
      }
    }
    this.container.classList.add("linkAnnotation");
    if (isBound) {
      this.container.append(link);
    }
    return this.container;
  }
  _bindLink(link, destination) {
    link.href = this.linkService.getDestinationHash(destination);
    link.onclick = () => {
      if (destination) {
        this.linkService.goToDestination(destination);
      }
      return false;
    };
    if (destination || destination === "") {
      __privateMethod(this, _LinkAnnotationElement_instances, setInternalLink_fn).call(this);
    }
  }
  _bindNamedAction(link, action) {
    link.href = this.linkService.getAnchorUrl("");
    link.onclick = () => {
      this.linkService.executeNamedAction(action);
      return false;
    };
    __privateMethod(this, _LinkAnnotationElement_instances, setInternalLink_fn).call(this);
  }
  _bindJSAction(link, data) {
    link.href = this.linkService.getAnchorUrl("");
    const map = /* @__PURE__ */ new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);
    for (const name of Object.keys(data.actions)) {
      const jsName = map.get(name);
      if (!jsName) {
        continue;
      }
      link[jsName] = () => {
        var _a2;
        (_a2 = this.linkService.eventBus) == null ? void 0 : _a2.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: data.id,
            name
          }
        });
        return false;
      };
    }
    if (!link.onclick) {
      link.onclick = () => false;
    }
    __privateMethod(this, _LinkAnnotationElement_instances, setInternalLink_fn).call(this);
  }
  _bindResetFormAction(link, resetForm) {
    const otherClickAction = link.onclick;
    if (!otherClickAction) {
      link.href = this.linkService.getAnchorUrl("");
    }
    __privateMethod(this, _LinkAnnotationElement_instances, setInternalLink_fn).call(this);
    if (!this._fieldObjects) {
      warn(`_bindResetFormAction - "resetForm" action not supported, ensure that the \`fieldObjects\` parameter is provided.`);
      if (!otherClickAction) {
        link.onclick = () => false;
      }
      return;
    }
    link.onclick = () => {
      var _a2;
      otherClickAction == null ? void 0 : otherClickAction();
      const {
        fields: resetFormFields,
        refs: resetFormRefs,
        include
      } = resetForm;
      const allFields = [];
      if (resetFormFields.length !== 0 || resetFormRefs.length !== 0) {
        const fieldIds = new Set(resetFormRefs);
        for (const fieldName of resetFormFields) {
          const fields = this._fieldObjects[fieldName] || [];
          for (const {
            id
          } of fields) {
            fieldIds.add(id);
          }
        }
        for (const fields of Object.values(this._fieldObjects)) {
          for (const field of fields) {
            if (fieldIds.has(field.id) === include) {
              allFields.push(field);
            }
          }
        }
      } else {
        for (const fields of Object.values(this._fieldObjects)) {
          allFields.push(...fields);
        }
      }
      const storage = this.annotationStorage;
      const allIds = [];
      for (const field of allFields) {
        const {
          id
        } = field;
        allIds.push(id);
        switch (field.type) {
          case "text": {
            const value = field.defaultValue || "";
            storage.setValue(id, {
              value
            });
            break;
          }
          case "checkbox":
          case "radiobutton": {
            const value = field.defaultValue === field.exportValues;
            storage.setValue(id, {
              value
            });
            break;
          }
          case "combobox":
          case "listbox": {
            const value = field.defaultValue || "";
            storage.setValue(id, {
              value
            });
            break;
          }
          default:
            continue;
        }
        const domElement = document.querySelector(`[data-element-id="${id}"]`);
        if (!domElement) {
          continue;
        } else if (!GetElementsByNameSet.has(domElement)) {
          warn(`_bindResetFormAction - element not allowed: ${id}`);
          continue;
        }
        domElement.dispatchEvent(new Event("resetform"));
      }
      if (this.enableScripting) {
        (_a2 = this.linkService.eventBus) == null ? void 0 : _a2.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: "app",
            ids: allIds,
            name: "ResetForm"
          }
        });
      }
      return false;
    };
  }
};
_LinkAnnotationElement_instances = new WeakSet();
setInternalLink_fn = function() {
  this.container.setAttribute("data-internal-link", "");
};
bindAttachment_fn = function(link, attachment, dest = null) {
  link.href = this.linkService.getAnchorUrl("");
  if (attachment.description) {
    link.title = attachment.description;
  }
  link.onclick = () => {
    var _a2;
    (_a2 = this.downloadManager) == null ? void 0 : _a2.openOrDownloadData(attachment.content, attachment.filename, dest);
    return false;
  };
  __privateMethod(this, _LinkAnnotationElement_instances, setInternalLink_fn).call(this);
};
bindSetOCGState_fn = function(link, action) {
  link.href = this.linkService.getAnchorUrl("");
  link.onclick = () => {
    this.linkService.executeSetOCGState(action);
    return false;
  };
  __privateMethod(this, _LinkAnnotationElement_instances, setInternalLink_fn).call(this);
};
var TextAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true
    });
  }
  render() {
    this.container.classList.add("textAnnotation");
    const image = document.createElement("img");
    image.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg";
    image.setAttribute("data-l10n-id", "pdfjs-text-annotation-type");
    image.setAttribute("data-l10n-args", JSON.stringify({
      type: this.data.name
    }));
    if (!this.data.popupRef && this.hasPopupData) {
      this._createPopup();
    }
    this.container.append(image);
    return this.container;
  }
};
var WidgetAnnotationElement = class extends AnnotationElement {
  render() {
    return this.container;
  }
  showElementAndHideCanvas(element) {
    var _a2;
    if (this.data.hasOwnCanvas) {
      if (((_a2 = element.previousSibling) == null ? void 0 : _a2.nodeName) === "CANVAS") {
        element.previousSibling.hidden = true;
      }
      element.hidden = false;
    }
  }
  _getKeyModifier(event) {
    return util_FeatureTest.platform.isMac ? event.metaKey : event.ctrlKey;
  }
  _setEventListener(element, elementData, baseName, eventName, valueGetter) {
    if (baseName.includes("mouse")) {
      element.addEventListener(baseName, (event) => {
        var _a2;
        (_a2 = this.linkService.eventBus) == null ? void 0 : _a2.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: this.data.id,
            name: eventName,
            value: valueGetter(event),
            shift: event.shiftKey,
            modifier: this._getKeyModifier(event)
          }
        });
      });
    } else {
      element.addEventListener(baseName, (event) => {
        var _a2;
        if (baseName === "blur") {
          if (!elementData.focused || !event.relatedTarget) {
            return;
          }
          elementData.focused = false;
        } else if (baseName === "focus") {
          if (elementData.focused) {
            return;
          }
          elementData.focused = true;
        }
        if (!valueGetter) {
          return;
        }
        (_a2 = this.linkService.eventBus) == null ? void 0 : _a2.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: this.data.id,
            name: eventName,
            value: valueGetter(event)
          }
        });
      });
    }
  }
  _setEventListeners(element, elementData, names, getter) {
    var _a2, _b, _c;
    for (const [baseName, eventName] of names) {
      if (eventName === "Action" || ((_a2 = this.data.actions) == null ? void 0 : _a2[eventName])) {
        if (eventName === "Focus" || eventName === "Blur") {
          elementData || (elementData = {
            focused: false
          });
        }
        this._setEventListener(element, elementData, baseName, eventName, getter);
        if (eventName === "Focus" && !((_b = this.data.actions) == null ? void 0 : _b.Blur)) {
          this._setEventListener(element, elementData, "blur", "Blur", null);
        } else if (eventName === "Blur" && !((_c = this.data.actions) == null ? void 0 : _c.Focus)) {
          this._setEventListener(element, elementData, "focus", "Focus", null);
        }
      }
    }
  }
  _setBackgroundColor(element) {
    const color = this.data.backgroundColor || null;
    element.style.backgroundColor = color === null ? "transparent" : Util.makeHexColor(color[0], color[1], color[2]);
  }
  _setTextStyle(element) {
    const TEXT_ALIGNMENT = ["left", "center", "right"];
    const {
      fontColor
    } = this.data.defaultAppearanceData;
    const fontSize = this.data.defaultAppearanceData.fontSize || annotation_layer_DEFAULT_FONT_SIZE;
    const style = element.style;
    let computedFontSize;
    const BORDER_SIZE = 2;
    const roundToOneDecimal = (x2) => Math.round(10 * x2) / 10;
    if (this.data.multiLine) {
      const height = Math.abs(this.data.rect[3] - this.data.rect[1] - BORDER_SIZE);
      const numberOfLines = Math.round(height / (LINE_FACTOR * fontSize)) || 1;
      const lineHeight = height / numberOfLines;
      computedFontSize = Math.min(fontSize, roundToOneDecimal(lineHeight / LINE_FACTOR));
    } else {
      const height = Math.abs(this.data.rect[3] - this.data.rect[1] - BORDER_SIZE);
      computedFontSize = Math.min(fontSize, roundToOneDecimal(height / LINE_FACTOR));
    }
    style.fontSize = `calc(${computedFontSize}px * var(--scale-factor))`;
    style.color = Util.makeHexColor(fontColor[0], fontColor[1], fontColor[2]);
    if (this.data.textAlignment !== null) {
      style.textAlign = TEXT_ALIGNMENT[this.data.textAlignment];
    }
  }
  _setRequired(element, isRequired) {
    if (isRequired) {
      element.setAttribute("required", true);
    } else {
      element.removeAttribute("required");
    }
    element.setAttribute("aria-required", isRequired);
  }
};
var TextWidgetAnnotationElement = class extends WidgetAnnotationElement {
  constructor(parameters) {
    const isRenderable = parameters.renderForms || parameters.data.hasOwnCanvas || !parameters.data.hasAppearance && !!parameters.data.fieldValue;
    super(parameters, {
      isRenderable
    });
  }
  setPropertyOnSiblings(base, key, value, keyInStorage) {
    const storage = this.annotationStorage;
    for (const element of this._getElementsByName(base.name, base.id)) {
      if (element.domElement) {
        element.domElement[key] = value;
      }
      storage.setValue(element.id, {
        [keyInStorage]: value
      });
    }
  }
  render() {
    var _a2, _b;
    const storage = this.annotationStorage;
    const id = this.data.id;
    this.container.classList.add("textWidgetAnnotation");
    let element = null;
    if (this.renderForms) {
      const storedData = storage.getValue(id, {
        value: this.data.fieldValue
      });
      let textContent = storedData.value || "";
      const maxLen = storage.getValue(id, {
        charLimit: this.data.maxLen
      }).charLimit;
      if (maxLen && textContent.length > maxLen) {
        textContent = textContent.slice(0, maxLen);
      }
      let fieldFormattedValues = storedData.formattedValue || ((_a2 = this.data.textContent) == null ? void 0 : _a2.join("\n")) || null;
      if (fieldFormattedValues && this.data.comb) {
        fieldFormattedValues = fieldFormattedValues.replaceAll(/\s+/g, "");
      }
      const elementData = {
        userValue: textContent,
        formattedValue: fieldFormattedValues,
        lastCommittedValue: null,
        commitKey: 1,
        focused: false
      };
      if (this.data.multiLine) {
        element = document.createElement("textarea");
        element.textContent = fieldFormattedValues ?? textContent;
        if (this.data.doNotScroll) {
          element.style.overflowY = "hidden";
        }
      } else {
        element = document.createElement("input");
        element.type = "text";
        element.setAttribute("value", fieldFormattedValues ?? textContent);
        if (this.data.doNotScroll) {
          element.style.overflowX = "hidden";
        }
      }
      if (this.data.hasOwnCanvas) {
        element.hidden = true;
      }
      GetElementsByNameSet.add(element);
      element.setAttribute("data-element-id", id);
      element.disabled = this.data.readOnly;
      element.name = this.data.fieldName;
      element.tabIndex = DEFAULT_TAB_INDEX;
      this._setRequired(element, this.data.required);
      if (maxLen) {
        element.maxLength = maxLen;
      }
      element.addEventListener("input", (event) => {
        storage.setValue(id, {
          value: event.target.value
        });
        this.setPropertyOnSiblings(element, "value", event.target.value, "value");
        elementData.formattedValue = null;
      });
      element.addEventListener("resetform", (event) => {
        const defaultValue = this.data.defaultFieldValue ?? "";
        element.value = elementData.userValue = defaultValue;
        elementData.formattedValue = null;
      });
      let blurListener = (event) => {
        const {
          formattedValue
        } = elementData;
        if (formattedValue !== null && formattedValue !== void 0) {
          event.target.value = formattedValue;
        }
        event.target.scrollLeft = 0;
      };
      if (this.enableScripting && this.hasJSActions) {
        element.addEventListener("focus", (event) => {
          var _a3;
          if (elementData.focused) {
            return;
          }
          const {
            target
          } = event;
          if (elementData.userValue) {
            target.value = elementData.userValue;
          }
          elementData.lastCommittedValue = target.value;
          elementData.commitKey = 1;
          if (!((_a3 = this.data.actions) == null ? void 0 : _a3.Focus)) {
            elementData.focused = true;
          }
        });
        element.addEventListener("updatefromsandbox", (jsEvent) => {
          this.showElementAndHideCanvas(jsEvent.target);
          const actions = {
            value(event) {
              elementData.userValue = event.detail.value ?? "";
              storage.setValue(id, {
                value: elementData.userValue.toString()
              });
              event.target.value = elementData.userValue;
            },
            formattedValue(event) {
              const {
                formattedValue
              } = event.detail;
              elementData.formattedValue = formattedValue;
              if (formattedValue !== null && formattedValue !== void 0 && event.target !== document.activeElement) {
                event.target.value = formattedValue;
              }
              storage.setValue(id, {
                formattedValue
              });
            },
            selRange(event) {
              event.target.setSelectionRange(...event.detail.selRange);
            },
            charLimit: (event) => {
              var _a3;
              const {
                charLimit
              } = event.detail;
              const {
                target
              } = event;
              if (charLimit === 0) {
                target.removeAttribute("maxLength");
                return;
              }
              target.setAttribute("maxLength", charLimit);
              let value = elementData.userValue;
              if (!value || value.length <= charLimit) {
                return;
              }
              value = value.slice(0, charLimit);
              target.value = elementData.userValue = value;
              storage.setValue(id, {
                value
              });
              (_a3 = this.linkService.eventBus) == null ? void 0 : _a3.dispatch("dispatcheventinsandbox", {
                source: this,
                detail: {
                  id,
                  name: "Keystroke",
                  value,
                  willCommit: true,
                  commitKey: 1,
                  selStart: target.selectionStart,
                  selEnd: target.selectionEnd
                }
              });
            }
          };
          this._dispatchEventFromSandbox(actions, jsEvent);
        });
        element.addEventListener("keydown", (event) => {
          var _a3;
          elementData.commitKey = 1;
          let commitKey = -1;
          if (event.key === "Escape") {
            commitKey = 0;
          } else if (event.key === "Enter" && !this.data.multiLine) {
            commitKey = 2;
          } else if (event.key === "Tab") {
            elementData.commitKey = 3;
          }
          if (commitKey === -1) {
            return;
          }
          const {
            value
          } = event.target;
          if (elementData.lastCommittedValue === value) {
            return;
          }
          elementData.lastCommittedValue = value;
          elementData.userValue = value;
          (_a3 = this.linkService.eventBus) == null ? void 0 : _a3.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id,
              name: "Keystroke",
              value,
              willCommit: true,
              commitKey,
              selStart: event.target.selectionStart,
              selEnd: event.target.selectionEnd
            }
          });
        });
        const _blurListener = blurListener;
        blurListener = null;
        element.addEventListener("blur", (event) => {
          var _a3, _b2;
          if (!elementData.focused || !event.relatedTarget) {
            return;
          }
          if (!((_a3 = this.data.actions) == null ? void 0 : _a3.Blur)) {
            elementData.focused = false;
          }
          const {
            value
          } = event.target;
          elementData.userValue = value;
          if (elementData.lastCommittedValue !== value) {
            (_b2 = this.linkService.eventBus) == null ? void 0 : _b2.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id,
                name: "Keystroke",
                value,
                willCommit: true,
                commitKey: elementData.commitKey,
                selStart: event.target.selectionStart,
                selEnd: event.target.selectionEnd
              }
            });
          }
          _blurListener(event);
        });
        if ((_b = this.data.actions) == null ? void 0 : _b.Keystroke) {
          element.addEventListener("beforeinput", (event) => {
            var _a3;
            elementData.lastCommittedValue = null;
            const {
              data,
              target
            } = event;
            const {
              value,
              selectionStart,
              selectionEnd
            } = target;
            let selStart = selectionStart, selEnd = selectionEnd;
            switch (event.inputType) {
              case "deleteWordBackward": {
                const match = value.substring(0, selectionStart).match(/\w*[^\w]*$/);
                if (match) {
                  selStart -= match[0].length;
                }
                break;
              }
              case "deleteWordForward": {
                const match = value.substring(selectionStart).match(/^[^\w]*\w*/);
                if (match) {
                  selEnd += match[0].length;
                }
                break;
              }
              case "deleteContentBackward":
                if (selectionStart === selectionEnd) {
                  selStart -= 1;
                }
                break;
              case "deleteContentForward":
                if (selectionStart === selectionEnd) {
                  selEnd += 1;
                }
                break;
            }
            event.preventDefault();
            (_a3 = this.linkService.eventBus) == null ? void 0 : _a3.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id,
                name: "Keystroke",
                value,
                change: data || "",
                willCommit: false,
                selStart,
                selEnd
              }
            });
          });
        }
        this._setEventListeners(element, elementData, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (event) => event.target.value);
      }
      if (blurListener) {
        element.addEventListener("blur", blurListener);
      }
      if (this.data.comb) {
        const fieldWidth = this.data.rect[2] - this.data.rect[0];
        const combWidth = fieldWidth / maxLen;
        element.classList.add("comb");
        element.style.letterSpacing = `calc(${combWidth}px * var(--scale-factor) - 1ch)`;
      }
    } else {
      element = document.createElement("div");
      element.textContent = this.data.fieldValue;
      element.style.verticalAlign = "middle";
      element.style.display = "table-cell";
      if (this.data.hasOwnCanvas) {
        element.hidden = true;
      }
    }
    this._setTextStyle(element);
    this._setBackgroundColor(element);
    this._setDefaultPropertiesFromJS(element);
    this.container.append(element);
    return this.container;
  }
};
var SignatureWidgetAnnotationElement = class extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: !!parameters.data.hasOwnCanvas
    });
  }
};
var CheckboxWidgetAnnotationElement = class extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: parameters.renderForms
    });
  }
  render() {
    const storage = this.annotationStorage;
    const data = this.data;
    const id = data.id;
    let value = storage.getValue(id, {
      value: data.exportValue === data.fieldValue
    }).value;
    if (typeof value === "string") {
      value = value !== "Off";
      storage.setValue(id, {
        value
      });
    }
    this.container.classList.add("buttonWidgetAnnotation", "checkBox");
    const element = document.createElement("input");
    GetElementsByNameSet.add(element);
    element.setAttribute("data-element-id", id);
    element.disabled = data.readOnly;
    this._setRequired(element, this.data.required);
    element.type = "checkbox";
    element.name = data.fieldName;
    if (value) {
      element.setAttribute("checked", true);
    }
    element.setAttribute("exportValue", data.exportValue);
    element.tabIndex = DEFAULT_TAB_INDEX;
    element.addEventListener("change", (event) => {
      const {
        name,
        checked
      } = event.target;
      for (const checkbox of this._getElementsByName(name, id)) {
        const curChecked = checked && checkbox.exportValue === data.exportValue;
        if (checkbox.domElement) {
          checkbox.domElement.checked = curChecked;
        }
        storage.setValue(checkbox.id, {
          value: curChecked
        });
      }
      storage.setValue(id, {
        value: checked
      });
    });
    element.addEventListener("resetform", (event) => {
      const defaultValue = data.defaultFieldValue || "Off";
      event.target.checked = defaultValue === data.exportValue;
    });
    if (this.enableScripting && this.hasJSActions) {
      element.addEventListener("updatefromsandbox", (jsEvent) => {
        const actions = {
          value(event) {
            event.target.checked = event.detail.value !== "Off";
            storage.setValue(id, {
              value: event.target.checked
            });
          }
        };
        this._dispatchEventFromSandbox(actions, jsEvent);
      });
      this._setEventListeners(element, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (event) => event.target.checked);
    }
    this._setBackgroundColor(element);
    this._setDefaultPropertiesFromJS(element);
    this.container.append(element);
    return this.container;
  }
};
var RadioButtonWidgetAnnotationElement = class extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: parameters.renderForms
    });
  }
  render() {
    this.container.classList.add("buttonWidgetAnnotation", "radioButton");
    const storage = this.annotationStorage;
    const data = this.data;
    const id = data.id;
    let value = storage.getValue(id, {
      value: data.fieldValue === data.buttonValue
    }).value;
    if (typeof value === "string") {
      value = value !== data.buttonValue;
      storage.setValue(id, {
        value
      });
    }
    if (value) {
      for (const radio of this._getElementsByName(data.fieldName, id)) {
        storage.setValue(radio.id, {
          value: false
        });
      }
    }
    const element = document.createElement("input");
    GetElementsByNameSet.add(element);
    element.setAttribute("data-element-id", id);
    element.disabled = data.readOnly;
    this._setRequired(element, this.data.required);
    element.type = "radio";
    element.name = data.fieldName;
    if (value) {
      element.setAttribute("checked", true);
    }
    element.tabIndex = DEFAULT_TAB_INDEX;
    element.addEventListener("change", (event) => {
      const {
        name,
        checked
      } = event.target;
      for (const radio of this._getElementsByName(name, id)) {
        storage.setValue(radio.id, {
          value: false
        });
      }
      storage.setValue(id, {
        value: checked
      });
    });
    element.addEventListener("resetform", (event) => {
      const defaultValue = data.defaultFieldValue;
      event.target.checked = defaultValue !== null && defaultValue !== void 0 && defaultValue === data.buttonValue;
    });
    if (this.enableScripting && this.hasJSActions) {
      const pdfButtonValue = data.buttonValue;
      element.addEventListener("updatefromsandbox", (jsEvent) => {
        const actions = {
          value: (event) => {
            const checked = pdfButtonValue === event.detail.value;
            for (const radio of this._getElementsByName(event.target.name)) {
              const curChecked = checked && radio.id === id;
              if (radio.domElement) {
                radio.domElement.checked = curChecked;
              }
              storage.setValue(radio.id, {
                value: curChecked
              });
            }
          }
        };
        this._dispatchEventFromSandbox(actions, jsEvent);
      });
      this._setEventListeners(element, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (event) => event.target.checked);
    }
    this._setBackgroundColor(element);
    this._setDefaultPropertiesFromJS(element);
    this.container.append(element);
    return this.container;
  }
};
var PushButtonWidgetAnnotationElement = class extends LinkAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      ignoreBorder: parameters.data.hasAppearance
    });
  }
  render() {
    const container = super.render();
    container.classList.add("buttonWidgetAnnotation", "pushButton");
    const linkElement = container.lastChild;
    if (this.enableScripting && this.hasJSActions && linkElement) {
      this._setDefaultPropertiesFromJS(linkElement);
      linkElement.addEventListener("updatefromsandbox", (jsEvent) => {
        this._dispatchEventFromSandbox({}, jsEvent);
      });
    }
    return container;
  }
};
var ChoiceWidgetAnnotationElement = class extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: parameters.renderForms
    });
  }
  render() {
    this.container.classList.add("choiceWidgetAnnotation");
    const storage = this.annotationStorage;
    const id = this.data.id;
    const storedData = storage.getValue(id, {
      value: this.data.fieldValue
    });
    const selectElement = document.createElement("select");
    GetElementsByNameSet.add(selectElement);
    selectElement.setAttribute("data-element-id", id);
    selectElement.disabled = this.data.readOnly;
    this._setRequired(selectElement, this.data.required);
    selectElement.name = this.data.fieldName;
    selectElement.tabIndex = DEFAULT_TAB_INDEX;
    let addAnEmptyEntry = this.data.combo && this.data.options.length > 0;
    if (!this.data.combo) {
      selectElement.size = this.data.options.length;
      if (this.data.multiSelect) {
        selectElement.multiple = true;
      }
    }
    selectElement.addEventListener("resetform", (event) => {
      const defaultValue = this.data.defaultFieldValue;
      for (const option of selectElement.options) {
        option.selected = option.value === defaultValue;
      }
    });
    for (const option of this.data.options) {
      const optionElement = document.createElement("option");
      optionElement.textContent = option.displayValue;
      optionElement.value = option.exportValue;
      if (storedData.value.includes(option.exportValue)) {
        optionElement.setAttribute("selected", true);
        addAnEmptyEntry = false;
      }
      selectElement.append(optionElement);
    }
    let removeEmptyEntry = null;
    if (addAnEmptyEntry) {
      const noneOptionElement = document.createElement("option");
      noneOptionElement.value = " ";
      noneOptionElement.setAttribute("hidden", true);
      noneOptionElement.setAttribute("selected", true);
      selectElement.prepend(noneOptionElement);
      removeEmptyEntry = () => {
        noneOptionElement.remove();
        selectElement.removeEventListener("input", removeEmptyEntry);
        removeEmptyEntry = null;
      };
      selectElement.addEventListener("input", removeEmptyEntry);
    }
    const getValue = (isExport) => {
      const name = isExport ? "value" : "textContent";
      const {
        options,
        multiple
      } = selectElement;
      if (!multiple) {
        return options.selectedIndex === -1 ? null : options[options.selectedIndex][name];
      }
      return Array.prototype.filter.call(options, (option) => option.selected).map((option) => option[name]);
    };
    let selectedValues = getValue(false);
    const getItems = (event) => {
      const options = event.target.options;
      return Array.prototype.map.call(options, (option) => ({
        displayValue: option.textContent,
        exportValue: option.value
      }));
    };
    if (this.enableScripting && this.hasJSActions) {
      selectElement.addEventListener("updatefromsandbox", (jsEvent) => {
        const actions = {
          value(event) {
            removeEmptyEntry == null ? void 0 : removeEmptyEntry();
            const value = event.detail.value;
            const values = new Set(Array.isArray(value) ? value : [value]);
            for (const option of selectElement.options) {
              option.selected = values.has(option.value);
            }
            storage.setValue(id, {
              value: getValue(true)
            });
            selectedValues = getValue(false);
          },
          multipleSelection(event) {
            selectElement.multiple = true;
          },
          remove(event) {
            const options = selectElement.options;
            const index = event.detail.remove;
            options[index].selected = false;
            selectElement.remove(index);
            if (options.length > 0) {
              const i2 = Array.prototype.findIndex.call(options, (option) => option.selected);
              if (i2 === -1) {
                options[0].selected = true;
              }
            }
            storage.setValue(id, {
              value: getValue(true),
              items: getItems(event)
            });
            selectedValues = getValue(false);
          },
          clear(event) {
            while (selectElement.length !== 0) {
              selectElement.remove(0);
            }
            storage.setValue(id, {
              value: null,
              items: []
            });
            selectedValues = getValue(false);
          },
          insert(event) {
            const {
              index,
              displayValue,
              exportValue
            } = event.detail.insert;
            const selectChild = selectElement.children[index];
            const optionElement = document.createElement("option");
            optionElement.textContent = displayValue;
            optionElement.value = exportValue;
            if (selectChild) {
              selectChild.before(optionElement);
            } else {
              selectElement.append(optionElement);
            }
            storage.setValue(id, {
              value: getValue(true),
              items: getItems(event)
            });
            selectedValues = getValue(false);
          },
          items(event) {
            const {
              items
            } = event.detail;
            while (selectElement.length !== 0) {
              selectElement.remove(0);
            }
            for (const item of items) {
              const {
                displayValue,
                exportValue
              } = item;
              const optionElement = document.createElement("option");
              optionElement.textContent = displayValue;
              optionElement.value = exportValue;
              selectElement.append(optionElement);
            }
            if (selectElement.options.length > 0) {
              selectElement.options[0].selected = true;
            }
            storage.setValue(id, {
              value: getValue(true),
              items: getItems(event)
            });
            selectedValues = getValue(false);
          },
          indices(event) {
            const indices = new Set(event.detail.indices);
            for (const option of event.target.options) {
              option.selected = indices.has(option.index);
            }
            storage.setValue(id, {
              value: getValue(true)
            });
            selectedValues = getValue(false);
          },
          editable(event) {
            event.target.disabled = !event.detail.editable;
          }
        };
        this._dispatchEventFromSandbox(actions, jsEvent);
      });
      selectElement.addEventListener("input", (event) => {
        var _a2;
        const exportValue = getValue(true);
        const change = getValue(false);
        storage.setValue(id, {
          value: exportValue
        });
        event.preventDefault();
        (_a2 = this.linkService.eventBus) == null ? void 0 : _a2.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id,
            name: "Keystroke",
            value: selectedValues,
            change,
            changeEx: exportValue,
            willCommit: false,
            commitKey: 1,
            keyDown: false
          }
        });
      });
      this._setEventListeners(selectElement, null, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"], ["input", "Validate"]], (event) => event.target.value);
    } else {
      selectElement.addEventListener("input", function(event) {
        storage.setValue(id, {
          value: getValue(true)
        });
      });
    }
    if (this.data.combo) {
      this._setTextStyle(selectElement);
    } else {
    }
    this._setBackgroundColor(selectElement);
    this._setDefaultPropertiesFromJS(selectElement);
    this.container.append(selectElement);
    return this.container;
  }
};
var PopupAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    const {
      data,
      elements
    } = parameters;
    super(parameters, {
      isRenderable: AnnotationElement._hasPopupData(data)
    });
    this.elements = elements;
    this.popup = null;
  }
  render() {
    this.container.classList.add("popupAnnotation");
    const popup = this.popup = new PopupElement({
      container: this.container,
      color: this.data.color,
      titleObj: this.data.titleObj,
      modificationDate: this.data.modificationDate,
      contentsObj: this.data.contentsObj,
      richText: this.data.richText,
      rect: this.data.rect,
      parentRect: this.data.parentRect || null,
      parent: this.parent,
      elements: this.elements,
      open: this.data.open
    });
    const elementIds = [];
    for (const element of this.elements) {
      element.popup = popup;
      elementIds.push(element.data.id);
      element.addHighlightArea();
    }
    this.container.setAttribute("aria-controls", elementIds.map((id) => `${AnnotationPrefix}${id}`).join(","));
    return this.container;
  }
};
var _boundKeyDown, _boundHide, _boundShow, _boundToggle, _color, _container3, _contentsObj, _dateObj, _elements, _parent, _parentRect, _pinned, _popup, _position2, _rect, _richText, _titleObj, _updates2, _wasVisible, _PopupElement_instances, html_get, fontSize_get, fontColor_get, makePopupContent_fn, keyDown_fn, setPosition_fn, toggle_fn, show_fn, hide_fn;
var PopupElement = class {
  constructor({
    container,
    color,
    elements,
    titleObj,
    modificationDate,
    contentsObj,
    richText,
    parent,
    rect,
    parentRect,
    open
  }) {
    __privateAdd(this, _PopupElement_instances);
    __privateAdd(this, _boundKeyDown, __privateMethod(this, _PopupElement_instances, keyDown_fn).bind(this));
    __privateAdd(this, _boundHide, __privateMethod(this, _PopupElement_instances, hide_fn).bind(this));
    __privateAdd(this, _boundShow, __privateMethod(this, _PopupElement_instances, show_fn).bind(this));
    __privateAdd(this, _boundToggle, __privateMethod(this, _PopupElement_instances, toggle_fn).bind(this));
    __privateAdd(this, _color, null);
    __privateAdd(this, _container3, null);
    __privateAdd(this, _contentsObj, null);
    __privateAdd(this, _dateObj, null);
    __privateAdd(this, _elements, null);
    __privateAdd(this, _parent, null);
    __privateAdd(this, _parentRect, null);
    __privateAdd(this, _pinned, false);
    __privateAdd(this, _popup, null);
    __privateAdd(this, _position2, null);
    __privateAdd(this, _rect, null);
    __privateAdd(this, _richText, null);
    __privateAdd(this, _titleObj, null);
    __privateAdd(this, _updates2, null);
    __privateAdd(this, _wasVisible, false);
    var _a2;
    __privateSet(this, _container3, container);
    __privateSet(this, _titleObj, titleObj);
    __privateSet(this, _contentsObj, contentsObj);
    __privateSet(this, _richText, richText);
    __privateSet(this, _parent, parent);
    __privateSet(this, _color, color);
    __privateSet(this, _rect, rect);
    __privateSet(this, _parentRect, parentRect);
    __privateSet(this, _elements, elements);
    __privateSet(this, _dateObj, PDFDateString.toDateObject(modificationDate));
    this.trigger = elements.flatMap((e2) => e2.getElementsToTriggerPopup());
    for (const element of this.trigger) {
      element.addEventListener("click", __privateGet(this, _boundToggle));
      element.addEventListener("mouseenter", __privateGet(this, _boundShow));
      element.addEventListener("mouseleave", __privateGet(this, _boundHide));
      element.classList.add("popupTriggerArea");
    }
    for (const element of elements) {
      (_a2 = element.container) == null ? void 0 : _a2.addEventListener("keydown", __privateGet(this, _boundKeyDown));
    }
    __privateGet(this, _container3).hidden = true;
    if (open) {
      __privateMethod(this, _PopupElement_instances, toggle_fn).call(this);
    }
  }
  render() {
    if (__privateGet(this, _popup)) {
      return;
    }
    const popup = __privateSet(this, _popup, document.createElement("div"));
    popup.className = "popup";
    if (__privateGet(this, _color)) {
      const baseColor = popup.style.outlineColor = Util.makeHexColor(...__privateGet(this, _color));
      if (CSS.supports("background-color", "color-mix(in srgb, red 30%, white)")) {
        popup.style.backgroundColor = `color-mix(in srgb, ${baseColor} 30%, white)`;
      } else {
        const BACKGROUND_ENLIGHT = 0.7;
        popup.style.backgroundColor = Util.makeHexColor(...__privateGet(this, _color).map((c2) => Math.floor(BACKGROUND_ENLIGHT * (255 - c2) + c2)));
      }
    }
    const header = document.createElement("span");
    header.className = "header";
    const title = document.createElement("h1");
    header.append(title);
    ({
      dir: title.dir,
      str: title.textContent
    } = __privateGet(this, _titleObj));
    popup.append(header);
    if (__privateGet(this, _dateObj)) {
      const modificationDate = document.createElement("span");
      modificationDate.classList.add("popupDate");
      modificationDate.setAttribute("data-l10n-id", "pdfjs-annotation-date-string");
      modificationDate.setAttribute("data-l10n-args", JSON.stringify({
        date: __privateGet(this, _dateObj).toLocaleDateString(),
        time: __privateGet(this, _dateObj).toLocaleTimeString()
      }));
      header.append(modificationDate);
    }
    const html = __privateGet(this, _PopupElement_instances, html_get);
    if (html) {
      XfaLayer.render({
        xfaHtml: html,
        intent: "richText",
        div: popup
      });
      popup.lastChild.classList.add("richText", "popupContent");
    } else {
      const contents = this._formatContents(__privateGet(this, _contentsObj));
      popup.append(contents);
    }
    __privateGet(this, _container3).append(popup);
  }
  _formatContents({
    str,
    dir
  }) {
    const p = document.createElement("p");
    p.classList.add("popupContent");
    p.dir = dir;
    const lines = str.split(/(?:\r\n?|\n)/);
    for (let i2 = 0, ii = lines.length; i2 < ii; ++i2) {
      const line = lines[i2];
      p.append(document.createTextNode(line));
      if (i2 < ii - 1) {
        p.append(document.createElement("br"));
      }
    }
    return p;
  }
  updateEdited({
    rect,
    popupContent
  }) {
    var _a2;
    __privateGet(this, _updates2) || __privateSet(this, _updates2, {
      contentsObj: __privateGet(this, _contentsObj),
      richText: __privateGet(this, _richText)
    });
    if (rect) {
      __privateSet(this, _position2, null);
    }
    if (popupContent) {
      __privateSet(this, _richText, __privateMethod(this, _PopupElement_instances, makePopupContent_fn).call(this, popupContent));
      __privateSet(this, _contentsObj, null);
    }
    (_a2 = __privateGet(this, _popup)) == null ? void 0 : _a2.remove();
    __privateSet(this, _popup, null);
  }
  resetEdited() {
    var _a2;
    if (!__privateGet(this, _updates2)) {
      return;
    }
    ({
      contentsObj: __privateWrapper(this, _contentsObj)._,
      richText: __privateWrapper(this, _richText)._
    } = __privateGet(this, _updates2));
    __privateSet(this, _updates2, null);
    (_a2 = __privateGet(this, _popup)) == null ? void 0 : _a2.remove();
    __privateSet(this, _popup, null);
    __privateSet(this, _position2, null);
  }
  forceHide() {
    __privateSet(this, _wasVisible, this.isVisible);
    if (!__privateGet(this, _wasVisible)) {
      return;
    }
    __privateGet(this, _container3).hidden = true;
  }
  maybeShow() {
    if (!__privateGet(this, _wasVisible)) {
      return;
    }
    if (!__privateGet(this, _popup)) {
      __privateMethod(this, _PopupElement_instances, show_fn).call(this);
    }
    __privateSet(this, _wasVisible, false);
    __privateGet(this, _container3).hidden = false;
  }
  get isVisible() {
    return __privateGet(this, _container3).hidden === false;
  }
};
_boundKeyDown = new WeakMap();
_boundHide = new WeakMap();
_boundShow = new WeakMap();
_boundToggle = new WeakMap();
_color = new WeakMap();
_container3 = new WeakMap();
_contentsObj = new WeakMap();
_dateObj = new WeakMap();
_elements = new WeakMap();
_parent = new WeakMap();
_parentRect = new WeakMap();
_pinned = new WeakMap();
_popup = new WeakMap();
_position2 = new WeakMap();
_rect = new WeakMap();
_richText = new WeakMap();
_titleObj = new WeakMap();
_updates2 = new WeakMap();
_wasVisible = new WeakMap();
_PopupElement_instances = new WeakSet();
html_get = function() {
  const richText = __privateGet(this, _richText);
  const contentsObj = __privateGet(this, _contentsObj);
  if ((richText == null ? void 0 : richText.str) && (!(contentsObj == null ? void 0 : contentsObj.str) || contentsObj.str === richText.str)) {
    return __privateGet(this, _richText).html || null;
  }
  return null;
};
fontSize_get = function() {
  var _a2, _b, _c;
  return ((_c = (_b = (_a2 = __privateGet(this, _PopupElement_instances, html_get)) == null ? void 0 : _a2.attributes) == null ? void 0 : _b.style) == null ? void 0 : _c.fontSize) || 0;
};
fontColor_get = function() {
  var _a2, _b, _c;
  return ((_c = (_b = (_a2 = __privateGet(this, _PopupElement_instances, html_get)) == null ? void 0 : _a2.attributes) == null ? void 0 : _b.style) == null ? void 0 : _c.color) || null;
};
makePopupContent_fn = function(text) {
  const popupLines = [];
  const popupContent = {
    str: text,
    html: {
      name: "div",
      attributes: {
        dir: "auto"
      },
      children: [{
        name: "p",
        children: popupLines
      }]
    }
  };
  const lineAttributes = {
    style: {
      color: __privateGet(this, _PopupElement_instances, fontColor_get),
      fontSize: __privateGet(this, _PopupElement_instances, fontSize_get) ? `calc(${__privateGet(this, _PopupElement_instances, fontSize_get)}px * var(--scale-factor))` : ""
    }
  };
  for (const line of text.split("\n")) {
    popupLines.push({
      name: "span",
      value: line,
      attributes: lineAttributes
    });
  }
  return popupContent;
};
keyDown_fn = function(event) {
  if (event.altKey || event.shiftKey || event.ctrlKey || event.metaKey) {
    return;
  }
  if (event.key === "Enter" || event.key === "Escape" && __privateGet(this, _pinned)) {
    __privateMethod(this, _PopupElement_instances, toggle_fn).call(this);
  }
};
setPosition_fn = function() {
  if (__privateGet(this, _position2) !== null) {
    return;
  }
  const {
    page: {
      view
    },
    viewport: {
      rawDims: {
        pageWidth,
        pageHeight,
        pageX,
        pageY
      }
    }
  } = __privateGet(this, _parent);
  let useParentRect = !!__privateGet(this, _parentRect);
  let rect = useParentRect ? __privateGet(this, _parentRect) : __privateGet(this, _rect);
  for (const element of __privateGet(this, _elements)) {
    if (!rect || Util.intersect(element.data.rect, rect) !== null) {
      rect = element.data.rect;
      useParentRect = true;
      break;
    }
  }
  const normalizedRect = Util.normalizeRect([rect[0], view[3] - rect[1] + view[1], rect[2], view[3] - rect[3] + view[1]]);
  const HORIZONTAL_SPACE_AFTER_ANNOTATION = 5;
  const parentWidth = useParentRect ? rect[2] - rect[0] + HORIZONTAL_SPACE_AFTER_ANNOTATION : 0;
  const popupLeft = normalizedRect[0] + parentWidth;
  const popupTop = normalizedRect[1];
  __privateSet(this, _position2, [100 * (popupLeft - pageX) / pageWidth, 100 * (popupTop - pageY) / pageHeight]);
  const {
    style
  } = __privateGet(this, _container3);
  style.left = `${__privateGet(this, _position2)[0]}%`;
  style.top = `${__privateGet(this, _position2)[1]}%`;
};
toggle_fn = function() {
  __privateSet(this, _pinned, !__privateGet(this, _pinned));
  if (__privateGet(this, _pinned)) {
    __privateMethod(this, _PopupElement_instances, show_fn).call(this);
    __privateGet(this, _container3).addEventListener("click", __privateGet(this, _boundToggle));
    __privateGet(this, _container3).addEventListener("keydown", __privateGet(this, _boundKeyDown));
  } else {
    __privateMethod(this, _PopupElement_instances, hide_fn).call(this);
    __privateGet(this, _container3).removeEventListener("click", __privateGet(this, _boundToggle));
    __privateGet(this, _container3).removeEventListener("keydown", __privateGet(this, _boundKeyDown));
  }
};
show_fn = function() {
  if (!__privateGet(this, _popup)) {
    this.render();
  }
  if (!this.isVisible) {
    __privateMethod(this, _PopupElement_instances, setPosition_fn).call(this);
    __privateGet(this, _container3).hidden = false;
    __privateGet(this, _container3).style.zIndex = parseInt(__privateGet(this, _container3).style.zIndex) + 1e3;
  } else if (__privateGet(this, _pinned)) {
    __privateGet(this, _container3).classList.add("focused");
  }
};
hide_fn = function() {
  __privateGet(this, _container3).classList.remove("focused");
  if (__privateGet(this, _pinned) || !this.isVisible) {
    return;
  }
  __privateGet(this, _container3).hidden = true;
  __privateGet(this, _container3).style.zIndex = parseInt(__privateGet(this, _container3).style.zIndex) - 1e3;
};
var FreeTextAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    });
    this.textContent = parameters.data.textContent;
    this.textPosition = parameters.data.textPosition;
    this.annotationEditorType = AnnotationEditorType.FREETEXT;
  }
  render() {
    this.container.classList.add("freeTextAnnotation");
    if (this.textContent) {
      const content = document.createElement("div");
      content.classList.add("annotationTextContent");
      content.setAttribute("role", "comment");
      for (const line of this.textContent) {
        const lineSpan = document.createElement("span");
        lineSpan.textContent = line;
        content.append(lineSpan);
      }
      this.container.append(content);
    }
    if (!this.data.popupRef && this.hasPopupData) {
      this._createPopup();
    }
    this._editOnDoubleClick();
    return this.container;
  }
  get _isEditable() {
    return this.data.hasOwnCanvas;
  }
};
var _line;
var LineAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    });
    __privateAdd(this, _line, null);
  }
  render() {
    this.container.classList.add("lineAnnotation");
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height, true);
    const line = __privateSet(this, _line, this.svgFactory.createElement("svg:line"));
    line.setAttribute("x1", data.rect[2] - data.lineCoordinates[0]);
    line.setAttribute("y1", data.rect[3] - data.lineCoordinates[1]);
    line.setAttribute("x2", data.rect[2] - data.lineCoordinates[2]);
    line.setAttribute("y2", data.rect[3] - data.lineCoordinates[3]);
    line.setAttribute("stroke-width", data.borderStyle.width || 1);
    line.setAttribute("stroke", "transparent");
    line.setAttribute("fill", "transparent");
    svg.append(line);
    this.container.append(svg);
    if (!data.popupRef && this.hasPopupData) {
      this._createPopup();
    }
    return this.container;
  }
  getElementsToTriggerPopup() {
    return __privateGet(this, _line);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
};
_line = new WeakMap();
var _square;
var SquareAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    });
    __privateAdd(this, _square, null);
  }
  render() {
    this.container.classList.add("squareAnnotation");
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height, true);
    const borderWidth = data.borderStyle.width;
    const square = __privateSet(this, _square, this.svgFactory.createElement("svg:rect"));
    square.setAttribute("x", borderWidth / 2);
    square.setAttribute("y", borderWidth / 2);
    square.setAttribute("width", width - borderWidth);
    square.setAttribute("height", height - borderWidth);
    square.setAttribute("stroke-width", borderWidth || 1);
    square.setAttribute("stroke", "transparent");
    square.setAttribute("fill", "transparent");
    svg.append(square);
    this.container.append(svg);
    if (!data.popupRef && this.hasPopupData) {
      this._createPopup();
    }
    return this.container;
  }
  getElementsToTriggerPopup() {
    return __privateGet(this, _square);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
};
_square = new WeakMap();
var _circle;
var CircleAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    });
    __privateAdd(this, _circle, null);
  }
  render() {
    this.container.classList.add("circleAnnotation");
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height, true);
    const borderWidth = data.borderStyle.width;
    const circle = __privateSet(this, _circle, this.svgFactory.createElement("svg:ellipse"));
    circle.setAttribute("cx", width / 2);
    circle.setAttribute("cy", height / 2);
    circle.setAttribute("rx", width / 2 - borderWidth / 2);
    circle.setAttribute("ry", height / 2 - borderWidth / 2);
    circle.setAttribute("stroke-width", borderWidth || 1);
    circle.setAttribute("stroke", "transparent");
    circle.setAttribute("fill", "transparent");
    svg.append(circle);
    this.container.append(svg);
    if (!data.popupRef && this.hasPopupData) {
      this._createPopup();
    }
    return this.container;
  }
  getElementsToTriggerPopup() {
    return __privateGet(this, _circle);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
};
_circle = new WeakMap();
var _polyline;
var PolylineAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    });
    __privateAdd(this, _polyline, null);
    this.containerClassName = "polylineAnnotation";
    this.svgElementName = "svg:polyline";
  }
  render() {
    this.container.classList.add(this.containerClassName);
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height, true);
    let points = [];
    for (const coordinate of data.vertices) {
      const x2 = coordinate.x - data.rect[0];
      const y2 = data.rect[3] - coordinate.y;
      points.push(x2 + "," + y2);
    }
    points = points.join(" ");
    const polyline = __privateSet(this, _polyline, this.svgFactory.createElement(this.svgElementName));
    polyline.setAttribute("points", points);
    polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
    polyline.setAttribute("stroke", "transparent");
    polyline.setAttribute("fill", "transparent");
    svg.append(polyline);
    this.container.append(svg);
    if (!data.popupRef && this.hasPopupData) {
      this._createPopup();
    }
    return this.container;
  }
  getElementsToTriggerPopup() {
    return __privateGet(this, _polyline);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
};
_polyline = new WeakMap();
var PolygonAnnotationElement = class extends PolylineAnnotationElement {
  constructor(parameters) {
    super(parameters);
    this.containerClassName = "polygonAnnotation";
    this.svgElementName = "svg:polygon";
  }
};
var CaretAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    });
  }
  render() {
    this.container.classList.add("caretAnnotation");
    if (!this.data.popupRef && this.hasPopupData) {
      this._createPopup();
    }
    return this.container;
  }
};
var _polylines;
var InkAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    });
    __privateAdd(this, _polylines, []);
    this.containerClassName = "inkAnnotation";
    this.svgElementName = "svg:polyline";
    this.annotationEditorType = AnnotationEditorType.INK;
  }
  render() {
    this.container.classList.add(this.containerClassName);
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height, true);
    for (const inkList of data.inkLists) {
      let points = [];
      for (const coordinate of inkList) {
        const x2 = coordinate.x - data.rect[0];
        const y2 = data.rect[3] - coordinate.y;
        points.push(`${x2},${y2}`);
      }
      points = points.join(" ");
      const polyline = this.svgFactory.createElement(this.svgElementName);
      __privateGet(this, _polylines).push(polyline);
      polyline.setAttribute("points", points);
      polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
      polyline.setAttribute("stroke", "transparent");
      polyline.setAttribute("fill", "transparent");
      if (!data.popupRef && this.hasPopupData) {
        this._createPopup();
      }
      svg.append(polyline);
    }
    this.container.append(svg);
    return this.container;
  }
  getElementsToTriggerPopup() {
    return __privateGet(this, _polylines);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
};
_polylines = new WeakMap();
var HighlightAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }
  render() {
    if (!this.data.popupRef && this.hasPopupData) {
      this._createPopup();
    }
    this.container.classList.add("highlightAnnotation");
    return this.container;
  }
};
var UnderlineAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }
  render() {
    if (!this.data.popupRef && this.hasPopupData) {
      this._createPopup();
    }
    this.container.classList.add("underlineAnnotation");
    return this.container;
  }
};
var SquigglyAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }
  render() {
    if (!this.data.popupRef && this.hasPopupData) {
      this._createPopup();
    }
    this.container.classList.add("squigglyAnnotation");
    return this.container;
  }
};
var StrikeOutAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }
  render() {
    if (!this.data.popupRef && this.hasPopupData) {
      this._createPopup();
    }
    this.container.classList.add("strikeoutAnnotation");
    return this.container;
  }
};
var StampAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    });
  }
  render() {
    this.container.classList.add("stampAnnotation");
    if (!this.data.popupRef && this.hasPopupData) {
      this._createPopup();
    }
    return this.container;
  }
};
var _trigger, _FileAttachmentAnnotationElement_instances, download_fn;
var FileAttachmentAnnotationElement = class extends AnnotationElement {
  constructor(parameters) {
    var _a2;
    super(parameters, {
      isRenderable: true
    });
    __privateAdd(this, _FileAttachmentAnnotationElement_instances);
    __privateAdd(this, _trigger, null);
    const {
      file
    } = this.data;
    this.filename = file.filename;
    this.content = file.content;
    (_a2 = this.linkService.eventBus) == null ? void 0 : _a2.dispatch("fileattachmentannotation", {
      source: this,
      ...file
    });
  }
  render() {
    this.container.classList.add("fileAttachmentAnnotation");
    const {
      container,
      data
    } = this;
    let trigger;
    if (data.hasAppearance || data.fillAlpha === 0) {
      trigger = document.createElement("div");
    } else {
      trigger = document.createElement("img");
      trigger.src = `${this.imageResourcesPath}annotation-${/paperclip/i.test(data.name) ? "paperclip" : "pushpin"}.svg`;
      if (data.fillAlpha && data.fillAlpha < 1) {
        trigger.style = `filter: opacity(${Math.round(data.fillAlpha * 100)}%);`;
      }
    }
    trigger.addEventListener("dblclick", __privateMethod(this, _FileAttachmentAnnotationElement_instances, download_fn).bind(this));
    __privateSet(this, _trigger, trigger);
    const {
      isMac
    } = util_FeatureTest.platform;
    container.addEventListener("keydown", (evt) => {
      if (evt.key === "Enter" && (isMac ? evt.metaKey : evt.ctrlKey)) {
        __privateMethod(this, _FileAttachmentAnnotationElement_instances, download_fn).call(this);
      }
    });
    if (!data.popupRef && this.hasPopupData) {
      this._createPopup();
    } else {
      trigger.classList.add("popupTriggerArea");
    }
    container.append(trigger);
    return container;
  }
  getElementsToTriggerPopup() {
    return __privateGet(this, _trigger);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
};
_trigger = new WeakMap();
_FileAttachmentAnnotationElement_instances = new WeakSet();
download_fn = function() {
  var _a2;
  (_a2 = this.downloadManager) == null ? void 0 : _a2.openOrDownloadData(this.content, this.filename);
};
var _accessibilityManager, _annotationCanvasMap, _editableAnnotations, _AnnotationLayer_instances, appendElement_fn, setAnnotationCanvasMap_fn;
var AnnotationLayer = class {
  constructor({
    div,
    accessibilityManager,
    annotationCanvasMap,
    annotationEditorUIManager,
    page,
    viewport
  }) {
    __privateAdd(this, _AnnotationLayer_instances);
    __privateAdd(this, _accessibilityManager, null);
    __privateAdd(this, _annotationCanvasMap, null);
    __privateAdd(this, _editableAnnotations, /* @__PURE__ */ new Map());
    this.div = div;
    __privateSet(this, _accessibilityManager, accessibilityManager);
    __privateSet(this, _annotationCanvasMap, annotationCanvasMap);
    this.page = page;
    this.viewport = viewport;
    this.zIndex = 0;
    this._annotationEditorUIManager = annotationEditorUIManager;
  }
  async render(params) {
    var _a2;
    const {
      annotations
    } = params;
    const layer = this.div;
    setLayerDimensions(layer, this.viewport);
    const popupToElements = /* @__PURE__ */ new Map();
    const elementParams = {
      data: null,
      layer,
      linkService: params.linkService,
      downloadManager: params.downloadManager,
      imageResourcesPath: params.imageResourcesPath || "",
      renderForms: params.renderForms !== false,
      svgFactory: new DOMSVGFactory(),
      annotationStorage: params.annotationStorage || new AnnotationStorage(),
      enableScripting: params.enableScripting === true,
      hasJSActions: params.hasJSActions,
      fieldObjects: params.fieldObjects,
      parent: this,
      elements: null
    };
    for (const data of annotations) {
      if (data.noHTML) {
        continue;
      }
      const isPopupAnnotation = data.annotationType === AnnotationType.POPUP;
      if (!isPopupAnnotation) {
        const {
          width,
          height
        } = getRectDims(data.rect);
        if (width <= 0 || height <= 0) {
          continue;
        }
      } else {
        const elements = popupToElements.get(data.id);
        if (!elements) {
          continue;
        }
        elementParams.elements = elements;
      }
      elementParams.data = data;
      const element = AnnotationElementFactory.create(elementParams);
      if (!element.isRenderable) {
        continue;
      }
      if (!isPopupAnnotation && data.popupRef) {
        const elements = popupToElements.get(data.popupRef);
        if (!elements) {
          popupToElements.set(data.popupRef, [element]);
        } else {
          elements.push(element);
        }
      }
      const rendered = element.render();
      if (data.hidden) {
        rendered.style.visibility = "hidden";
      }
      __privateMethod(this, _AnnotationLayer_instances, appendElement_fn).call(this, rendered, data.id);
      if (element.annotationEditorType > 0) {
        __privateGet(this, _editableAnnotations).set(element.data.id, element);
        (_a2 = this._annotationEditorUIManager) == null ? void 0 : _a2.renderAnnotationElement(element);
      }
    }
    __privateMethod(this, _AnnotationLayer_instances, setAnnotationCanvasMap_fn).call(this);
  }
  update({
    viewport
  }) {
    const layer = this.div;
    this.viewport = viewport;
    setLayerDimensions(layer, {
      rotation: viewport.rotation
    });
    __privateMethod(this, _AnnotationLayer_instances, setAnnotationCanvasMap_fn).call(this);
    layer.hidden = false;
  }
  getEditableAnnotations() {
    return Array.from(__privateGet(this, _editableAnnotations).values());
  }
  getEditableAnnotation(id) {
    return __privateGet(this, _editableAnnotations).get(id);
  }
};
_accessibilityManager = new WeakMap();
_annotationCanvasMap = new WeakMap();
_editableAnnotations = new WeakMap();
_AnnotationLayer_instances = new WeakSet();
appendElement_fn = function(element, id) {
  var _a2;
  const contentElement = element.firstChild || element;
  contentElement.id = `${AnnotationPrefix}${id}`;
  this.div.append(element);
  (_a2 = __privateGet(this, _accessibilityManager)) == null ? void 0 : _a2.moveElementInDOM(this.div, element, contentElement, false);
};
setAnnotationCanvasMap_fn = function() {
  if (!__privateGet(this, _annotationCanvasMap)) {
    return;
  }
  const layer = this.div;
  for (const [id, canvas] of __privateGet(this, _annotationCanvasMap)) {
    const element = layer.querySelector(`[data-annotation-id="${id}"]`);
    if (!element) {
      continue;
    }
    canvas.className = "annotationContent";
    const {
      firstChild
    } = element;
    if (!firstChild) {
      element.append(canvas);
    } else if (firstChild.nodeName === "CANVAS") {
      firstChild.replaceWith(canvas);
    } else if (!firstChild.classList.contains("annotationContent")) {
      firstChild.before(canvas);
    } else {
      firstChild.after(canvas);
    }
  }
  __privateGet(this, _annotationCanvasMap).clear();
};
var EOL_PATTERN = /\r\n?|\n/g;
var _boundEditorDivBlur, _boundEditorDivFocus, _boundEditorDivInput, _boundEditorDivKeydown, _boundEditorDivPaste, _color2, _content, _editorDivId, _fontSize, _initialData, _FreeTextEditor_instances, updateFontSize_fn, updateColor_fn, extractText_fn, setEditorDimensions_fn, _FreeTextEditor_static, getNodeContent_fn, setContent_fn, serializeContent_fn, deserializeContent_fn, hasElementChanged_fn;
var _FreeTextEditor = class _FreeTextEditor extends AnnotationEditor {
  constructor(params) {
    super({
      ...params,
      name: "freeTextEditor"
    });
    __privateAdd(this, _FreeTextEditor_instances);
    __privateAdd(this, _boundEditorDivBlur, this.editorDivBlur.bind(this));
    __privateAdd(this, _boundEditorDivFocus, this.editorDivFocus.bind(this));
    __privateAdd(this, _boundEditorDivInput, this.editorDivInput.bind(this));
    __privateAdd(this, _boundEditorDivKeydown, this.editorDivKeydown.bind(this));
    __privateAdd(this, _boundEditorDivPaste, this.editorDivPaste.bind(this));
    __privateAdd(this, _color2);
    __privateAdd(this, _content, "");
    __privateAdd(this, _editorDivId, `${this.id}-editor`);
    __privateAdd(this, _fontSize);
    __privateAdd(this, _initialData, null);
    __privateSet(this, _color2, params.color || _FreeTextEditor._defaultColor || AnnotationEditor._defaultLineColor);
    __privateSet(this, _fontSize, params.fontSize || _FreeTextEditor._defaultFontSize);
  }
  static get _keyboardManager() {
    const proto = _FreeTextEditor.prototype;
    const arrowChecker = (self) => self.isEmpty();
    const small = AnnotationEditorUIManager.TRANSLATE_SMALL;
    const big = AnnotationEditorUIManager.TRANSLATE_BIG;
    return shadow(this, "_keyboardManager", new KeyboardManager([[["ctrl+s", "mac+meta+s", "ctrl+p", "mac+meta+p"], proto.commitOrRemove, {
      bubbles: true
    }], [["ctrl+Enter", "mac+meta+Enter", "Escape", "mac+Escape"], proto.commitOrRemove], [["ArrowLeft", "mac+ArrowLeft"], proto._translateEmpty, {
      args: [-small, 0],
      checker: arrowChecker
    }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], proto._translateEmpty, {
      args: [-big, 0],
      checker: arrowChecker
    }], [["ArrowRight", "mac+ArrowRight"], proto._translateEmpty, {
      args: [small, 0],
      checker: arrowChecker
    }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], proto._translateEmpty, {
      args: [big, 0],
      checker: arrowChecker
    }], [["ArrowUp", "mac+ArrowUp"], proto._translateEmpty, {
      args: [0, -small],
      checker: arrowChecker
    }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], proto._translateEmpty, {
      args: [0, -big],
      checker: arrowChecker
    }], [["ArrowDown", "mac+ArrowDown"], proto._translateEmpty, {
      args: [0, small],
      checker: arrowChecker
    }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], proto._translateEmpty, {
      args: [0, big],
      checker: arrowChecker
    }]]));
  }
  static initialize(l10n, uiManager) {
    AnnotationEditor.initialize(l10n, uiManager, {
      strings: ["pdfjs-free-text-default-content"]
    });
    const style = getComputedStyle(document.documentElement);
    this._internalPadding = parseFloat(style.getPropertyValue("--freetext-padding"));
  }
  static updateDefaultParams(type, value) {
    switch (type) {
      case AnnotationEditorParamsType.FREETEXT_SIZE:
        _FreeTextEditor._defaultFontSize = value;
        break;
      case AnnotationEditorParamsType.FREETEXT_COLOR:
        _FreeTextEditor._defaultColor = value;
        break;
    }
  }
  updateParams(type, value) {
    switch (type) {
      case AnnotationEditorParamsType.FREETEXT_SIZE:
        __privateMethod(this, _FreeTextEditor_instances, updateFontSize_fn).call(this, value);
        break;
      case AnnotationEditorParamsType.FREETEXT_COLOR:
        __privateMethod(this, _FreeTextEditor_instances, updateColor_fn).call(this, value);
        break;
    }
  }
  static get defaultPropertiesToUpdate() {
    return [[AnnotationEditorParamsType.FREETEXT_SIZE, _FreeTextEditor._defaultFontSize], [AnnotationEditorParamsType.FREETEXT_COLOR, _FreeTextEditor._defaultColor || AnnotationEditor._defaultLineColor]];
  }
  get propertiesToUpdate() {
    return [[AnnotationEditorParamsType.FREETEXT_SIZE, __privateGet(this, _fontSize)], [AnnotationEditorParamsType.FREETEXT_COLOR, __privateGet(this, _color2)]];
  }
  _translateEmpty(x2, y2) {
    this._uiManager.translateSelectedEditors(x2, y2, true);
  }
  getInitialTranslation() {
    const scale = this.parentScale;
    return [-_FreeTextEditor._internalPadding * scale, -(_FreeTextEditor._internalPadding + __privateGet(this, _fontSize)) * scale];
  }
  rebuild() {
    if (!this.parent) {
      return;
    }
    super.rebuild();
    if (this.div === null) {
      return;
    }
    if (!this.isAttachedToDOM) {
      this.parent.add(this);
    }
  }
  enableEditMode() {
    if (this.isInEditMode()) {
      return;
    }
    this.parent.setEditingState(false);
    this.parent.updateToolbar(AnnotationEditorType.FREETEXT);
    super.enableEditMode();
    this.overlayDiv.classList.remove("enabled");
    this.editorDiv.contentEditable = true;
    this._isDraggable = false;
    this.div.removeAttribute("aria-activedescendant");
    this.editorDiv.addEventListener("keydown", __privateGet(this, _boundEditorDivKeydown));
    this.editorDiv.addEventListener("focus", __privateGet(this, _boundEditorDivFocus));
    this.editorDiv.addEventListener("blur", __privateGet(this, _boundEditorDivBlur));
    this.editorDiv.addEventListener("input", __privateGet(this, _boundEditorDivInput));
    this.editorDiv.addEventListener("paste", __privateGet(this, _boundEditorDivPaste));
  }
  disableEditMode() {
    if (!this.isInEditMode()) {
      return;
    }
    this.parent.setEditingState(true);
    super.disableEditMode();
    this.overlayDiv.classList.add("enabled");
    this.editorDiv.contentEditable = false;
    this.div.setAttribute("aria-activedescendant", __privateGet(this, _editorDivId));
    this._isDraggable = true;
    this.editorDiv.removeEventListener("keydown", __privateGet(this, _boundEditorDivKeydown));
    this.editorDiv.removeEventListener("focus", __privateGet(this, _boundEditorDivFocus));
    this.editorDiv.removeEventListener("blur", __privateGet(this, _boundEditorDivBlur));
    this.editorDiv.removeEventListener("input", __privateGet(this, _boundEditorDivInput));
    this.editorDiv.removeEventListener("paste", __privateGet(this, _boundEditorDivPaste));
    this.div.focus({
      preventScroll: true
    });
    this.isEditing = false;
    this.parent.div.classList.add("freetextEditing");
  }
  focusin(event) {
    if (!this._focusEventsAllowed) {
      return;
    }
    super.focusin(event);
    if (event.target !== this.editorDiv) {
      this.editorDiv.focus();
    }
  }
  onceAdded() {
    var _a2;
    if (this.width) {
      return;
    }
    this.enableEditMode();
    this.editorDiv.focus();
    if ((_a2 = this._initialOptions) == null ? void 0 : _a2.isCentered) {
      this.center();
    }
    this._initialOptions = null;
  }
  isEmpty() {
    return !this.editorDiv || this.editorDiv.innerText.trim() === "";
  }
  remove() {
    this.isEditing = false;
    if (this.parent) {
      this.parent.setEditingState(true);
      this.parent.div.classList.add("freetextEditing");
    }
    super.remove();
  }
  commit() {
    if (!this.isInEditMode()) {
      return;
    }
    super.commit();
    this.disableEditMode();
    const savedText = __privateGet(this, _content);
    const newText = __privateSet(this, _content, __privateMethod(this, _FreeTextEditor_instances, extractText_fn).call(this).trimEnd());
    if (savedText === newText) {
      return;
    }
    const setText = (text) => {
      __privateSet(this, _content, text);
      if (!text) {
        this.remove();
        return;
      }
      __privateMethod(this, _FreeTextEditor_instances, setContent_fn).call(this);
      this._uiManager.rebuild(this);
      __privateMethod(this, _FreeTextEditor_instances, setEditorDimensions_fn).call(this);
    };
    this.addCommands({
      cmd: () => {
        setText(newText);
      },
      undo: () => {
        setText(savedText);
      },
      mustExec: false
    });
    __privateMethod(this, _FreeTextEditor_instances, setEditorDimensions_fn).call(this);
  }
  shouldGetKeyboardEvents() {
    return this.isInEditMode();
  }
  enterInEditMode() {
    this.enableEditMode();
    this.editorDiv.focus();
  }
  dblclick(event) {
    this.enterInEditMode();
  }
  keydown(event) {
    if (event.target === this.div && event.key === "Enter") {
      this.enterInEditMode();
      event.preventDefault();
    }
  }
  editorDivKeydown(event) {
    _FreeTextEditor._keyboardManager.exec(this, event);
  }
  editorDivFocus(event) {
    this.isEditing = true;
  }
  editorDivBlur(event) {
    this.isEditing = false;
  }
  editorDivInput(event) {
    this.parent.div.classList.toggle("freetextEditing", this.isEmpty());
  }
  disableEditing() {
    this.editorDiv.setAttribute("role", "comment");
    this.editorDiv.removeAttribute("aria-multiline");
  }
  enableEditing() {
    this.editorDiv.setAttribute("role", "textbox");
    this.editorDiv.setAttribute("aria-multiline", true);
  }
  render() {
    if (this.div) {
      return this.div;
    }
    let baseX, baseY;
    if (this.width) {
      baseX = this.x;
      baseY = this.y;
    }
    super.render();
    this.editorDiv = document.createElement("div");
    this.editorDiv.className = "internal";
    this.editorDiv.setAttribute("id", __privateGet(this, _editorDivId));
    this.editorDiv.setAttribute("data-l10n-id", "pdfjs-free-text");
    this.enableEditing();
    AnnotationEditor._l10nPromise.get("pdfjs-free-text-default-content").then((msg) => {
      var _a2;
      return (_a2 = this.editorDiv) == null ? void 0 : _a2.setAttribute("default-content", msg);
    });
    this.editorDiv.contentEditable = true;
    const {
      style
    } = this.editorDiv;
    style.fontSize = `calc(${__privateGet(this, _fontSize)}px * var(--scale-factor))`;
    style.color = __privateGet(this, _color2);
    this.div.append(this.editorDiv);
    this.overlayDiv = document.createElement("div");
    this.overlayDiv.classList.add("overlay", "enabled");
    this.div.append(this.overlayDiv);
    bindEvents(this, this.div, ["dblclick", "keydown"]);
    if (this.width) {
      const [parentWidth, parentHeight] = this.parentDimensions;
      if (this.annotationElementId) {
        const {
          position
        } = __privateGet(this, _initialData);
        let [tx, ty] = this.getInitialTranslation();
        [tx, ty] = this.pageTranslationToScreen(tx, ty);
        const [pageWidth, pageHeight] = this.pageDimensions;
        const [pageX, pageY] = this.pageTranslation;
        let posX, posY;
        switch (this.rotation) {
          case 0:
            posX = baseX + (position[0] - pageX) / pageWidth;
            posY = baseY + this.height - (position[1] - pageY) / pageHeight;
            break;
          case 90:
            posX = baseX + (position[0] - pageX) / pageWidth;
            posY = baseY - (position[1] - pageY) / pageHeight;
            [tx, ty] = [ty, -tx];
            break;
          case 180:
            posX = baseX - this.width + (position[0] - pageX) / pageWidth;
            posY = baseY - (position[1] - pageY) / pageHeight;
            [tx, ty] = [-tx, -ty];
            break;
          case 270:
            posX = baseX + (position[0] - pageX - this.height * pageHeight) / pageWidth;
            posY = baseY + (position[1] - pageY - this.width * pageWidth) / pageHeight;
            [tx, ty] = [-ty, tx];
            break;
        }
        this.setAt(posX * parentWidth, posY * parentHeight, tx, ty);
      } else {
        this.setAt(baseX * parentWidth, baseY * parentHeight, this.width * parentWidth, this.height * parentHeight);
      }
      __privateMethod(this, _FreeTextEditor_instances, setContent_fn).call(this);
      this._isDraggable = true;
      this.editorDiv.contentEditable = false;
    } else {
      this._isDraggable = false;
      this.editorDiv.contentEditable = true;
    }
    return this.div;
  }
  editorDivPaste(event) {
    var _a2, _b, _c;
    const clipboardData = event.clipboardData || window.clipboardData;
    const {
      types
    } = clipboardData;
    if (types.length === 1 && types[0] === "text/plain") {
      return;
    }
    event.preventDefault();
    const paste = __privateMethod(_a2 = _FreeTextEditor, _FreeTextEditor_static, deserializeContent_fn).call(_a2, clipboardData.getData("text") || "").replaceAll(EOL_PATTERN, "\n");
    if (!paste) {
      return;
    }
    const selection = window.getSelection();
    if (!selection.rangeCount) {
      return;
    }
    this.editorDiv.normalize();
    selection.deleteFromDocument();
    const range = selection.getRangeAt(0);
    if (!paste.includes("\n")) {
      range.insertNode(document.createTextNode(paste));
      this.editorDiv.normalize();
      selection.collapseToStart();
      return;
    }
    const {
      startContainer,
      startOffset
    } = range;
    const bufferBefore = [];
    const bufferAfter = [];
    if (startContainer.nodeType === Node.TEXT_NODE) {
      const parent = startContainer.parentElement;
      bufferAfter.push(startContainer.nodeValue.slice(startOffset).replaceAll(EOL_PATTERN, ""));
      if (parent !== this.editorDiv) {
        let buffer = bufferBefore;
        for (const child of this.editorDiv.childNodes) {
          if (child === parent) {
            buffer = bufferAfter;
            continue;
          }
          buffer.push(__privateMethod(_b = _FreeTextEditor, _FreeTextEditor_static, getNodeContent_fn).call(_b, child));
        }
      }
      bufferBefore.push(startContainer.nodeValue.slice(0, startOffset).replaceAll(EOL_PATTERN, ""));
    } else if (startContainer === this.editorDiv) {
      let buffer = bufferBefore;
      let i2 = 0;
      for (const child of this.editorDiv.childNodes) {
        if (i2++ === startOffset) {
          buffer = bufferAfter;
        }
        buffer.push(__privateMethod(_c = _FreeTextEditor, _FreeTextEditor_static, getNodeContent_fn).call(_c, child));
      }
    }
    __privateSet(this, _content, `${bufferBefore.join("\n")}${paste}${bufferAfter.join("\n")}`);
    __privateMethod(this, _FreeTextEditor_instances, setContent_fn).call(this);
    const newRange = new Range();
    let beforeLength = bufferBefore.reduce((acc, line) => acc + line.length, 0);
    for (const {
      firstChild
    } of this.editorDiv.childNodes) {
      if (firstChild.nodeType === Node.TEXT_NODE) {
        const length = firstChild.nodeValue.length;
        if (beforeLength <= length) {
          newRange.setStart(firstChild, beforeLength);
          newRange.setEnd(firstChild, beforeLength);
          break;
        }
        beforeLength -= length;
      }
    }
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
  get contentDiv() {
    return this.editorDiv;
  }
  static deserialize(data, parent, uiManager) {
    var _a2;
    let initialData = null;
    if (data instanceof FreeTextAnnotationElement) {
      const {
        data: {
          defaultAppearanceData: {
            fontSize,
            fontColor
          },
          rect,
          rotation,
          id
        },
        textContent,
        textPosition,
        parent: {
          page: {
            pageNumber
          }
        }
      } = data;
      if (!textContent || textContent.length === 0) {
        return null;
      }
      initialData = data = {
        annotationType: AnnotationEditorType.FREETEXT,
        color: Array.from(fontColor),
        fontSize,
        value: textContent.join("\n"),
        position: textPosition,
        pageIndex: pageNumber - 1,
        rect: rect.slice(0),
        rotation,
        id,
        deleted: false
      };
    }
    const editor = super.deserialize(data, parent, uiManager);
    __privateSet(editor, _fontSize, data.fontSize);
    __privateSet(editor, _color2, Util.makeHexColor(...data.color));
    __privateSet(editor, _content, __privateMethod(_a2 = _FreeTextEditor, _FreeTextEditor_static, deserializeContent_fn).call(_a2, data.value));
    editor.annotationElementId = data.id || null;
    __privateSet(editor, _initialData, initialData);
    return editor;
  }
  serialize(isForCopying = false) {
    if (this.isEmpty()) {
      return null;
    }
    if (this.deleted) {
      return {
        pageIndex: this.pageIndex,
        id: this.annotationElementId,
        deleted: true
      };
    }
    const padding = _FreeTextEditor._internalPadding * this.parentScale;
    const rect = this.getRect(padding, padding);
    const color = AnnotationEditor._colorManager.convert(this.isAttachedToDOM ? getComputedStyle(this.editorDiv).color : __privateGet(this, _color2));
    const serialized = {
      annotationType: AnnotationEditorType.FREETEXT,
      color,
      fontSize: __privateGet(this, _fontSize),
      value: __privateMethod(this, _FreeTextEditor_instances, serializeContent_fn).call(this),
      pageIndex: this.pageIndex,
      rect,
      rotation: this.rotation,
      structTreeParentId: this._structTreeParentId
    };
    if (isForCopying) {
      return serialized;
    }
    if (this.annotationElementId && !__privateMethod(this, _FreeTextEditor_instances, hasElementChanged_fn).call(this, serialized)) {
      return null;
    }
    serialized.id = this.annotationElementId;
    return serialized;
  }
  renderAnnotationElement(annotation) {
    const content = super.renderAnnotationElement(annotation);
    if (this.deleted) {
      return content;
    }
    const {
      style
    } = content;
    style.fontSize = `calc(${__privateGet(this, _fontSize)}px * var(--scale-factor))`;
    style.color = __privateGet(this, _color2);
    content.replaceChildren();
    for (const line of __privateGet(this, _content).split("\n")) {
      const div = document.createElement("div");
      div.append(line ? document.createTextNode(line) : document.createElement("br"));
      content.append(div);
    }
    const padding = _FreeTextEditor._internalPadding * this.parentScale;
    annotation.updateEdited({
      rect: this.getRect(padding, padding),
      popupContent: __privateGet(this, _content)
    });
    return content;
  }
  resetAnnotationElement(annotation) {
    super.resetAnnotationElement(annotation);
    annotation.resetEdited();
  }
};
_boundEditorDivBlur = new WeakMap();
_boundEditorDivFocus = new WeakMap();
_boundEditorDivInput = new WeakMap();
_boundEditorDivKeydown = new WeakMap();
_boundEditorDivPaste = new WeakMap();
_color2 = new WeakMap();
_content = new WeakMap();
_editorDivId = new WeakMap();
_fontSize = new WeakMap();
_initialData = new WeakMap();
_FreeTextEditor_instances = new WeakSet();
updateFontSize_fn = function(fontSize) {
  const setFontsize = (size) => {
    this.editorDiv.style.fontSize = `calc(${size}px * var(--scale-factor))`;
    this.translate(0, -(size - __privateGet(this, _fontSize)) * this.parentScale);
    __privateSet(this, _fontSize, size);
    __privateMethod(this, _FreeTextEditor_instances, setEditorDimensions_fn).call(this);
  };
  const savedFontsize = __privateGet(this, _fontSize);
  this.addCommands({
    cmd: setFontsize.bind(this, fontSize),
    undo: setFontsize.bind(this, savedFontsize),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: true,
    type: AnnotationEditorParamsType.FREETEXT_SIZE,
    overwriteIfSameType: true,
    keepUndo: true
  });
};
updateColor_fn = function(color) {
  const setColor = (col) => {
    __privateSet(this, _color2, this.editorDiv.style.color = col);
  };
  const savedColor = __privateGet(this, _color2);
  this.addCommands({
    cmd: setColor.bind(this, color),
    undo: setColor.bind(this, savedColor),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: true,
    type: AnnotationEditorParamsType.FREETEXT_COLOR,
    overwriteIfSameType: true,
    keepUndo: true
  });
};
extractText_fn = function() {
  var _a2;
  const buffer = [];
  this.editorDiv.normalize();
  for (const child of this.editorDiv.childNodes) {
    buffer.push(__privateMethod(_a2 = _FreeTextEditor, _FreeTextEditor_static, getNodeContent_fn).call(_a2, child));
  }
  return buffer.join("\n");
};
setEditorDimensions_fn = function() {
  const [parentWidth, parentHeight] = this.parentDimensions;
  let rect;
  if (this.isAttachedToDOM) {
    rect = this.div.getBoundingClientRect();
  } else {
    const {
      currentLayer,
      div
    } = this;
    const savedDisplay = div.style.display;
    const savedVisibility = div.classList.contains("hidden");
    div.classList.remove("hidden");
    div.style.display = "hidden";
    currentLayer.div.append(this.div);
    rect = div.getBoundingClientRect();
    div.remove();
    div.style.display = savedDisplay;
    div.classList.toggle("hidden", savedVisibility);
  }
  if (this.rotation % 180 === this.parentRotation % 180) {
    this.width = rect.width / parentWidth;
    this.height = rect.height / parentHeight;
  } else {
    this.width = rect.height / parentWidth;
    this.height = rect.width / parentHeight;
  }
  this.fixAndSetPosition();
};
_FreeTextEditor_static = new WeakSet();
getNodeContent_fn = function(node) {
  return (node.nodeType === Node.TEXT_NODE ? node.nodeValue : node.innerText).replaceAll(EOL_PATTERN, "");
};
setContent_fn = function() {
  this.editorDiv.replaceChildren();
  if (!__privateGet(this, _content)) {
    return;
  }
  for (const line of __privateGet(this, _content).split("\n")) {
    const div = document.createElement("div");
    div.append(line ? document.createTextNode(line) : document.createElement("br"));
    this.editorDiv.append(div);
  }
};
serializeContent_fn = function() {
  return __privateGet(this, _content).replaceAll(" ", " ");
};
deserializeContent_fn = function(content) {
  return content.replaceAll(" ", " ");
};
hasElementChanged_fn = function(serialized) {
  const {
    value,
    fontSize,
    color,
    pageIndex
  } = __privateGet(this, _initialData);
  return this._hasBeenMoved || serialized.value !== value || serialized.fontSize !== fontSize || serialized.color.some((c2, i2) => c2 !== color[i2]) || serialized.pageIndex !== pageIndex;
};
__privateAdd(_FreeTextEditor, _FreeTextEditor_static);
__publicField(_FreeTextEditor, "_freeTextDefaultContent", "");
__publicField(_FreeTextEditor, "_internalPadding", 0);
__publicField(_FreeTextEditor, "_defaultColor", null);
__publicField(_FreeTextEditor, "_defaultFontSize", 10);
__publicField(_FreeTextEditor, "_type", "freetext");
__publicField(_FreeTextEditor, "_editorType", AnnotationEditorType.FREETEXT);
var FreeTextEditor = _FreeTextEditor;
var _box, _verticalEdges, _intervals, _Outliner_instances, getOutlines_fn, binarySearch_fn, insert_fn, remove_fn, breakEdge_fn;
var Outliner = class {
  constructor(boxes, borderWidth = 0, innerMargin = 0, isLTR = true) {
    __privateAdd(this, _Outliner_instances);
    __privateAdd(this, _box);
    __privateAdd(this, _verticalEdges, []);
    __privateAdd(this, _intervals, []);
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    const NUMBER_OF_DIGITS = 4;
    const EPSILON = 10 ** -NUMBER_OF_DIGITS;
    for (const {
      x: x2,
      y: y2,
      width,
      height
    } of boxes) {
      const x1 = Math.floor((x2 - borderWidth) / EPSILON) * EPSILON;
      const x22 = Math.ceil((x2 + width + borderWidth) / EPSILON) * EPSILON;
      const y1 = Math.floor((y2 - borderWidth) / EPSILON) * EPSILON;
      const y22 = Math.ceil((y2 + height + borderWidth) / EPSILON) * EPSILON;
      const left = [x1, y1, y22, true];
      const right = [x22, y1, y22, false];
      __privateGet(this, _verticalEdges).push(left, right);
      minX = Math.min(minX, x1);
      maxX = Math.max(maxX, x22);
      minY = Math.min(minY, y1);
      maxY = Math.max(maxY, y22);
    }
    const bboxWidth = maxX - minX + 2 * innerMargin;
    const bboxHeight = maxY - minY + 2 * innerMargin;
    const shiftedMinX = minX - innerMargin;
    const shiftedMinY = minY - innerMargin;
    const lastEdge = __privateGet(this, _verticalEdges).at(isLTR ? -1 : -2);
    const lastPoint = [lastEdge[0], lastEdge[2]];
    for (const edge of __privateGet(this, _verticalEdges)) {
      const [x2, y1, y2] = edge;
      edge[0] = (x2 - shiftedMinX) / bboxWidth;
      edge[1] = (y1 - shiftedMinY) / bboxHeight;
      edge[2] = (y2 - shiftedMinY) / bboxHeight;
    }
    __privateSet(this, _box, {
      x: shiftedMinX,
      y: shiftedMinY,
      width: bboxWidth,
      height: bboxHeight,
      lastPoint
    });
  }
  getOutlines() {
    __privateGet(this, _verticalEdges).sort((a2, b2) => a2[0] - b2[0] || a2[1] - b2[1] || a2[2] - b2[2]);
    const outlineVerticalEdges = [];
    for (const edge of __privateGet(this, _verticalEdges)) {
      if (edge[3]) {
        outlineVerticalEdges.push(...__privateMethod(this, _Outliner_instances, breakEdge_fn).call(this, edge));
        __privateMethod(this, _Outliner_instances, insert_fn).call(this, edge);
      } else {
        __privateMethod(this, _Outliner_instances, remove_fn).call(this, edge);
        outlineVerticalEdges.push(...__privateMethod(this, _Outliner_instances, breakEdge_fn).call(this, edge));
      }
    }
    return __privateMethod(this, _Outliner_instances, getOutlines_fn).call(this, outlineVerticalEdges);
  }
};
_box = new WeakMap();
_verticalEdges = new WeakMap();
_intervals = new WeakMap();
_Outliner_instances = new WeakSet();
getOutlines_fn = function(outlineVerticalEdges) {
  const edges = [];
  const allEdges = /* @__PURE__ */ new Set();
  for (const edge of outlineVerticalEdges) {
    const [x2, y1, y2] = edge;
    edges.push([x2, y1, edge], [x2, y2, edge]);
  }
  edges.sort((a2, b2) => a2[1] - b2[1] || a2[0] - b2[0]);
  for (let i2 = 0, ii = edges.length; i2 < ii; i2 += 2) {
    const edge1 = edges[i2][2];
    const edge2 = edges[i2 + 1][2];
    edge1.push(edge2);
    edge2.push(edge1);
    allEdges.add(edge1);
    allEdges.add(edge2);
  }
  const outlines = [];
  let outline;
  while (allEdges.size > 0) {
    const edge = allEdges.values().next().value;
    let [x2, y1, y2, edge1, edge2] = edge;
    allEdges.delete(edge);
    let lastPointX = x2;
    let lastPointY = y1;
    outline = [x2, y2];
    outlines.push(outline);
    while (true) {
      let e2;
      if (allEdges.has(edge1)) {
        e2 = edge1;
      } else if (allEdges.has(edge2)) {
        e2 = edge2;
      } else {
        break;
      }
      allEdges.delete(e2);
      [x2, y1, y2, edge1, edge2] = e2;
      if (lastPointX !== x2) {
        outline.push(lastPointX, lastPointY, x2, lastPointY === y1 ? y1 : y2);
        lastPointX = x2;
      }
      lastPointY = lastPointY === y1 ? y2 : y1;
    }
    outline.push(lastPointX, lastPointY);
  }
  return new HighlightOutline(outlines, __privateGet(this, _box));
};
binarySearch_fn = function(y2) {
  const array = __privateGet(this, _intervals);
  let start = 0;
  let end = array.length - 1;
  while (start <= end) {
    const middle = start + end >> 1;
    const y1 = array[middle][0];
    if (y1 === y2) {
      return middle;
    }
    if (y1 < y2) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return end + 1;
};
insert_fn = function([, y1, y2]) {
  const index = __privateMethod(this, _Outliner_instances, binarySearch_fn).call(this, y1);
  __privateGet(this, _intervals).splice(index, 0, [y1, y2]);
};
remove_fn = function([, y1, y2]) {
  const index = __privateMethod(this, _Outliner_instances, binarySearch_fn).call(this, y1);
  for (let i2 = index; i2 < __privateGet(this, _intervals).length; i2++) {
    const [start, end] = __privateGet(this, _intervals)[i2];
    if (start !== y1) {
      break;
    }
    if (start === y1 && end === y2) {
      __privateGet(this, _intervals).splice(i2, 1);
      return;
    }
  }
  for (let i2 = index - 1; i2 >= 0; i2--) {
    const [start, end] = __privateGet(this, _intervals)[i2];
    if (start !== y1) {
      break;
    }
    if (start === y1 && end === y2) {
      __privateGet(this, _intervals).splice(i2, 1);
      return;
    }
  }
};
breakEdge_fn = function(edge) {
  const [x2, y1, y2] = edge;
  const results = [[x2, y1, y2]];
  const index = __privateMethod(this, _Outliner_instances, binarySearch_fn).call(this, y2);
  for (let i2 = 0; i2 < index; i2++) {
    const [start, end] = __privateGet(this, _intervals)[i2];
    for (let j2 = 0, jj = results.length; j2 < jj; j2++) {
      const [, y3, y4] = results[j2];
      if (end <= y3 || y4 <= start) {
        continue;
      }
      if (y3 >= start) {
        if (y4 > end) {
          results[j2][1] = end;
        } else {
          if (jj === 1) {
            return [];
          }
          results.splice(j2, 1);
          j2--;
          jj--;
        }
        continue;
      }
      results[j2][2] = start;
      if (y4 > end) {
        results.push([x2, end, y4]);
      }
    }
  }
  return results;
};
var Outline = class {
  toSVGPath() {
    throw new Error("Abstract method `toSVGPath` must be implemented.");
  }
  get box() {
    throw new Error("Abstract getter `box` must be implemented.");
  }
  serialize(_bbox2, _rotation2) {
    throw new Error("Abstract method `serialize` must be implemented.");
  }
  get free() {
    return this instanceof FreeHighlightOutline;
  }
};
var _box2, _outlines;
var HighlightOutline = class extends Outline {
  constructor(outlines, box) {
    super();
    __privateAdd(this, _box2);
    __privateAdd(this, _outlines);
    __privateSet(this, _outlines, outlines);
    __privateSet(this, _box2, box);
  }
  toSVGPath() {
    const buffer = [];
    for (const polygon of __privateGet(this, _outlines)) {
      let [prevX, prevY] = polygon;
      buffer.push(`M${prevX} ${prevY}`);
      for (let i2 = 2; i2 < polygon.length; i2 += 2) {
        const x2 = polygon[i2];
        const y2 = polygon[i2 + 1];
        if (x2 === prevX) {
          buffer.push(`V${y2}`);
          prevY = y2;
        } else if (y2 === prevY) {
          buffer.push(`H${x2}`);
          prevX = x2;
        }
      }
      buffer.push("Z");
    }
    return buffer.join(" ");
  }
  serialize([blX, blY, trX, trY], _rotation2) {
    const outlines = [];
    const width = trX - blX;
    const height = trY - blY;
    for (const outline of __privateGet(this, _outlines)) {
      const points = new Array(outline.length);
      for (let i2 = 0; i2 < outline.length; i2 += 2) {
        points[i2] = blX + outline[i2] * width;
        points[i2 + 1] = trY - outline[i2 + 1] * height;
      }
      outlines.push(points);
    }
    return outlines;
  }
  get box() {
    return __privateGet(this, _box2);
  }
};
_box2 = new WeakMap();
_outlines = new WeakMap();
var _box3, _bottom, _innerMargin, _isLTR, _top, _last, _lastX, _lastY, _min, _min_dist, _scaleFactor, _thickness, _points, _MIN_DIST, _MIN_DIFF, _MIN, _FreeOutliner_instances, getLastCoords_fn;
var _FreeOutliner = class _FreeOutliner {
  constructor({
    x: x2,
    y: y2
  }, box, scaleFactor, thickness, isLTR, innerMargin = 0) {
    __privateAdd(this, _FreeOutliner_instances);
    __privateAdd(this, _box3);
    __privateAdd(this, _bottom, []);
    __privateAdd(this, _innerMargin);
    __privateAdd(this, _isLTR);
    __privateAdd(this, _top, []);
    __privateAdd(this, _last, new Float64Array(18));
    __privateAdd(this, _lastX);
    __privateAdd(this, _lastY);
    __privateAdd(this, _min);
    __privateAdd(this, _min_dist);
    __privateAdd(this, _scaleFactor);
    __privateAdd(this, _thickness);
    __privateAdd(this, _points, []);
    __privateSet(this, _box3, box);
    __privateSet(this, _thickness, thickness * scaleFactor);
    __privateSet(this, _isLTR, isLTR);
    __privateGet(this, _last).set([NaN, NaN, NaN, NaN, x2, y2], 6);
    __privateSet(this, _innerMargin, innerMargin);
    __privateSet(this, _min_dist, __privateGet(_FreeOutliner, _MIN_DIST) * scaleFactor);
    __privateSet(this, _min, __privateGet(_FreeOutliner, _MIN) * scaleFactor);
    __privateSet(this, _scaleFactor, scaleFactor);
    __privateGet(this, _points).push(x2, y2);
  }
  get free() {
    return true;
  }
  isEmpty() {
    return isNaN(__privateGet(this, _last)[8]);
  }
  add({
    x: x2,
    y: y2
  }) {
    var _a2;
    __privateSet(this, _lastX, x2);
    __privateSet(this, _lastY, y2);
    const [layerX, layerY, layerWidth, layerHeight] = __privateGet(this, _box3);
    let [x1, y1, x22, y22] = __privateGet(this, _last).subarray(8, 12);
    const diffX = x2 - x22;
    const diffY = y2 - y22;
    const d2 = Math.hypot(diffX, diffY);
    if (d2 < __privateGet(this, _min)) {
      return false;
    }
    const diffD = d2 - __privateGet(this, _min_dist);
    const K2 = diffD / d2;
    const shiftX = K2 * diffX;
    const shiftY = K2 * diffY;
    let x0 = x1;
    let y0 = y1;
    x1 = x22;
    y1 = y22;
    x22 += shiftX;
    y22 += shiftY;
    (_a2 = __privateGet(this, _points)) == null ? void 0 : _a2.push(x2, y2);
    const nX = -shiftY / diffD;
    const nY = shiftX / diffD;
    const thX = nX * __privateGet(this, _thickness);
    const thY = nY * __privateGet(this, _thickness);
    __privateGet(this, _last).set(__privateGet(this, _last).subarray(2, 8), 0);
    __privateGet(this, _last).set([x22 + thX, y22 + thY], 4);
    __privateGet(this, _last).set(__privateGet(this, _last).subarray(14, 18), 12);
    __privateGet(this, _last).set([x22 - thX, y22 - thY], 16);
    if (isNaN(__privateGet(this, _last)[6])) {
      if (__privateGet(this, _top).length === 0) {
        __privateGet(this, _last).set([x1 + thX, y1 + thY], 2);
        __privateGet(this, _top).push(NaN, NaN, NaN, NaN, (x1 + thX - layerX) / layerWidth, (y1 + thY - layerY) / layerHeight);
        __privateGet(this, _last).set([x1 - thX, y1 - thY], 14);
        __privateGet(this, _bottom).push(NaN, NaN, NaN, NaN, (x1 - thX - layerX) / layerWidth, (y1 - thY - layerY) / layerHeight);
      }
      __privateGet(this, _last).set([x0, y0, x1, y1, x22, y22], 6);
      return !this.isEmpty();
    }
    __privateGet(this, _last).set([x0, y0, x1, y1, x22, y22], 6);
    const angle = Math.abs(Math.atan2(y0 - y1, x0 - x1) - Math.atan2(shiftY, shiftX));
    if (angle < Math.PI / 2) {
      [x1, y1, x22, y22] = __privateGet(this, _last).subarray(2, 6);
      __privateGet(this, _top).push(NaN, NaN, NaN, NaN, ((x1 + x22) / 2 - layerX) / layerWidth, ((y1 + y22) / 2 - layerY) / layerHeight);
      [x1, y1, x0, y0] = __privateGet(this, _last).subarray(14, 18);
      __privateGet(this, _bottom).push(NaN, NaN, NaN, NaN, ((x0 + x1) / 2 - layerX) / layerWidth, ((y0 + y1) / 2 - layerY) / layerHeight);
      return true;
    }
    [x0, y0, x1, y1, x22, y22] = __privateGet(this, _last).subarray(0, 6);
    __privateGet(this, _top).push(((x0 + 5 * x1) / 6 - layerX) / layerWidth, ((y0 + 5 * y1) / 6 - layerY) / layerHeight, ((5 * x1 + x22) / 6 - layerX) / layerWidth, ((5 * y1 + y22) / 6 - layerY) / layerHeight, ((x1 + x22) / 2 - layerX) / layerWidth, ((y1 + y22) / 2 - layerY) / layerHeight);
    [x22, y22, x1, y1, x0, y0] = __privateGet(this, _last).subarray(12, 18);
    __privateGet(this, _bottom).push(((x0 + 5 * x1) / 6 - layerX) / layerWidth, ((y0 + 5 * y1) / 6 - layerY) / layerHeight, ((5 * x1 + x22) / 6 - layerX) / layerWidth, ((5 * y1 + y22) / 6 - layerY) / layerHeight, ((x1 + x22) / 2 - layerX) / layerWidth, ((y1 + y22) / 2 - layerY) / layerHeight);
    return true;
  }
  toSVGPath() {
    if (this.isEmpty()) {
      return "";
    }
    const top = __privateGet(this, _top);
    const bottom = __privateGet(this, _bottom);
    const lastTop = __privateGet(this, _last).subarray(4, 6);
    const lastBottom = __privateGet(this, _last).subarray(16, 18);
    const [x2, y2, width, height] = __privateGet(this, _box3);
    const [lastTopX, lastTopY, lastBottomX, lastBottomY] = __privateMethod(this, _FreeOutliner_instances, getLastCoords_fn).call(this);
    if (isNaN(__privateGet(this, _last)[6]) && !this.isEmpty()) {
      return `M${(__privateGet(this, _last)[2] - x2) / width} ${(__privateGet(this, _last)[3] - y2) / height} L${(__privateGet(this, _last)[4] - x2) / width} ${(__privateGet(this, _last)[5] - y2) / height} L${lastTopX} ${lastTopY} L${lastBottomX} ${lastBottomY} L${(__privateGet(this, _last)[16] - x2) / width} ${(__privateGet(this, _last)[17] - y2) / height} L${(__privateGet(this, _last)[14] - x2) / width} ${(__privateGet(this, _last)[15] - y2) / height} Z`;
    }
    const buffer = [];
    buffer.push(`M${top[4]} ${top[5]}`);
    for (let i2 = 6; i2 < top.length; i2 += 6) {
      if (isNaN(top[i2])) {
        buffer.push(`L${top[i2 + 4]} ${top[i2 + 5]}`);
      } else {
        buffer.push(`C${top[i2]} ${top[i2 + 1]} ${top[i2 + 2]} ${top[i2 + 3]} ${top[i2 + 4]} ${top[i2 + 5]}`);
      }
    }
    buffer.push(`L${(lastTop[0] - x2) / width} ${(lastTop[1] - y2) / height} L${lastTopX} ${lastTopY} L${lastBottomX} ${lastBottomY} L${(lastBottom[0] - x2) / width} ${(lastBottom[1] - y2) / height}`);
    for (let i2 = bottom.length - 6; i2 >= 6; i2 -= 6) {
      if (isNaN(bottom[i2])) {
        buffer.push(`L${bottom[i2 + 4]} ${bottom[i2 + 5]}`);
      } else {
        buffer.push(`C${bottom[i2]} ${bottom[i2 + 1]} ${bottom[i2 + 2]} ${bottom[i2 + 3]} ${bottom[i2 + 4]} ${bottom[i2 + 5]}`);
      }
    }
    buffer.push(`L${bottom[4]} ${bottom[5]} Z`);
    return buffer.join(" ");
  }
  getOutlines() {
    var _a2;
    const top = __privateGet(this, _top);
    const bottom = __privateGet(this, _bottom);
    const last = __privateGet(this, _last);
    const lastTop = last.subarray(4, 6);
    const lastBottom = last.subarray(16, 18);
    const [layerX, layerY, layerWidth, layerHeight] = __privateGet(this, _box3);
    const points = new Float64Array((((_a2 = __privateGet(this, _points)) == null ? void 0 : _a2.length) ?? 0) + 2);
    for (let i2 = 0, ii = points.length - 2; i2 < ii; i2 += 2) {
      points[i2] = (__privateGet(this, _points)[i2] - layerX) / layerWidth;
      points[i2 + 1] = (__privateGet(this, _points)[i2 + 1] - layerY) / layerHeight;
    }
    points[points.length - 2] = (__privateGet(this, _lastX) - layerX) / layerWidth;
    points[points.length - 1] = (__privateGet(this, _lastY) - layerY) / layerHeight;
    const [lastTopX, lastTopY, lastBottomX, lastBottomY] = __privateMethod(this, _FreeOutliner_instances, getLastCoords_fn).call(this);
    if (isNaN(last[6]) && !this.isEmpty()) {
      const outline2 = new Float64Array(36);
      outline2.set([NaN, NaN, NaN, NaN, (last[2] - layerX) / layerWidth, (last[3] - layerY) / layerHeight, NaN, NaN, NaN, NaN, (last[4] - layerX) / layerWidth, (last[5] - layerY) / layerHeight, NaN, NaN, NaN, NaN, lastTopX, lastTopY, NaN, NaN, NaN, NaN, lastBottomX, lastBottomY, NaN, NaN, NaN, NaN, (last[16] - layerX) / layerWidth, (last[17] - layerY) / layerHeight, NaN, NaN, NaN, NaN, (last[14] - layerX) / layerWidth, (last[15] - layerY) / layerHeight], 0);
      return new FreeHighlightOutline(outline2, points, __privateGet(this, _box3), __privateGet(this, _scaleFactor), __privateGet(this, _innerMargin), __privateGet(this, _isLTR));
    }
    const outline = new Float64Array(__privateGet(this, _top).length + 24 + __privateGet(this, _bottom).length);
    let N2 = top.length;
    for (let i2 = 0; i2 < N2; i2 += 2) {
      if (isNaN(top[i2])) {
        outline[i2] = outline[i2 + 1] = NaN;
        continue;
      }
      outline[i2] = top[i2];
      outline[i2 + 1] = top[i2 + 1];
    }
    outline.set([NaN, NaN, NaN, NaN, (lastTop[0] - layerX) / layerWidth, (lastTop[1] - layerY) / layerHeight, NaN, NaN, NaN, NaN, lastTopX, lastTopY, NaN, NaN, NaN, NaN, lastBottomX, lastBottomY, NaN, NaN, NaN, NaN, (lastBottom[0] - layerX) / layerWidth, (lastBottom[1] - layerY) / layerHeight], N2);
    N2 += 24;
    for (let i2 = bottom.length - 6; i2 >= 6; i2 -= 6) {
      for (let j2 = 0; j2 < 6; j2 += 2) {
        if (isNaN(bottom[i2 + j2])) {
          outline[N2] = outline[N2 + 1] = NaN;
          N2 += 2;
          continue;
        }
        outline[N2] = bottom[i2 + j2];
        outline[N2 + 1] = bottom[i2 + j2 + 1];
        N2 += 2;
      }
    }
    outline.set([NaN, NaN, NaN, NaN, bottom[4], bottom[5]], N2);
    return new FreeHighlightOutline(outline, points, __privateGet(this, _box3), __privateGet(this, _scaleFactor), __privateGet(this, _innerMargin), __privateGet(this, _isLTR));
  }
};
_box3 = new WeakMap();
_bottom = new WeakMap();
_innerMargin = new WeakMap();
_isLTR = new WeakMap();
_top = new WeakMap();
_last = new WeakMap();
_lastX = new WeakMap();
_lastY = new WeakMap();
_min = new WeakMap();
_min_dist = new WeakMap();
_scaleFactor = new WeakMap();
_thickness = new WeakMap();
_points = new WeakMap();
_MIN_DIST = new WeakMap();
_MIN_DIFF = new WeakMap();
_MIN = new WeakMap();
_FreeOutliner_instances = new WeakSet();
getLastCoords_fn = function() {
  const lastTop = __privateGet(this, _last).subarray(4, 6);
  const lastBottom = __privateGet(this, _last).subarray(16, 18);
  const [x2, y2, width, height] = __privateGet(this, _box3);
  return [(__privateGet(this, _lastX) + (lastTop[0] - lastBottom[0]) / 2 - x2) / width, (__privateGet(this, _lastY) + (lastTop[1] - lastBottom[1]) / 2 - y2) / height, (__privateGet(this, _lastX) + (lastBottom[0] - lastTop[0]) / 2 - x2) / width, (__privateGet(this, _lastY) + (lastBottom[1] - lastTop[1]) / 2 - y2) / height];
};
__privateAdd(_FreeOutliner, _MIN_DIST, 8);
__privateAdd(_FreeOutliner, _MIN_DIFF, 2);
__privateAdd(_FreeOutliner, _MIN, __privateGet(_FreeOutliner, _MIN_DIST) + __privateGet(_FreeOutliner, _MIN_DIFF));
var FreeOutliner = _FreeOutliner;
var _box4, _bbox, _innerMargin2, _isLTR2, _points2, _scaleFactor2, _outline, _FreeHighlightOutline_instances, rescale_fn, rescaleAndSwap_fn, computeMinMax_fn;
var FreeHighlightOutline = class extends Outline {
  constructor(outline, points, box, scaleFactor, innerMargin, isLTR) {
    super();
    __privateAdd(this, _FreeHighlightOutline_instances);
    __privateAdd(this, _box4);
    __privateAdd(this, _bbox, null);
    __privateAdd(this, _innerMargin2);
    __privateAdd(this, _isLTR2);
    __privateAdd(this, _points2);
    __privateAdd(this, _scaleFactor2);
    __privateAdd(this, _outline);
    __privateSet(this, _outline, outline);
    __privateSet(this, _points2, points);
    __privateSet(this, _box4, box);
    __privateSet(this, _scaleFactor2, scaleFactor);
    __privateSet(this, _innerMargin2, innerMargin);
    __privateSet(this, _isLTR2, isLTR);
    __privateMethod(this, _FreeHighlightOutline_instances, computeMinMax_fn).call(this, isLTR);
    const {
      x: x2,
      y: y2,
      width,
      height
    } = __privateGet(this, _bbox);
    for (let i2 = 0, ii = outline.length; i2 < ii; i2 += 2) {
      outline[i2] = (outline[i2] - x2) / width;
      outline[i2 + 1] = (outline[i2 + 1] - y2) / height;
    }
    for (let i2 = 0, ii = points.length; i2 < ii; i2 += 2) {
      points[i2] = (points[i2] - x2) / width;
      points[i2 + 1] = (points[i2 + 1] - y2) / height;
    }
  }
  toSVGPath() {
    const buffer = [`M${__privateGet(this, _outline)[4]} ${__privateGet(this, _outline)[5]}`];
    for (let i2 = 6, ii = __privateGet(this, _outline).length; i2 < ii; i2 += 6) {
      if (isNaN(__privateGet(this, _outline)[i2])) {
        buffer.push(`L${__privateGet(this, _outline)[i2 + 4]} ${__privateGet(this, _outline)[i2 + 5]}`);
        continue;
      }
      buffer.push(`C${__privateGet(this, _outline)[i2]} ${__privateGet(this, _outline)[i2 + 1]} ${__privateGet(this, _outline)[i2 + 2]} ${__privateGet(this, _outline)[i2 + 3]} ${__privateGet(this, _outline)[i2 + 4]} ${__privateGet(this, _outline)[i2 + 5]}`);
    }
    buffer.push("Z");
    return buffer.join(" ");
  }
  serialize([blX, blY, trX, trY], rotation) {
    const width = trX - blX;
    const height = trY - blY;
    let outline;
    let points;
    switch (rotation) {
      case 0:
        outline = __privateMethod(this, _FreeHighlightOutline_instances, rescale_fn).call(this, __privateGet(this, _outline), blX, trY, width, -height);
        points = __privateMethod(this, _FreeHighlightOutline_instances, rescale_fn).call(this, __privateGet(this, _points2), blX, trY, width, -height);
        break;
      case 90:
        outline = __privateMethod(this, _FreeHighlightOutline_instances, rescaleAndSwap_fn).call(this, __privateGet(this, _outline), blX, blY, width, height);
        points = __privateMethod(this, _FreeHighlightOutline_instances, rescaleAndSwap_fn).call(this, __privateGet(this, _points2), blX, blY, width, height);
        break;
      case 180:
        outline = __privateMethod(this, _FreeHighlightOutline_instances, rescale_fn).call(this, __privateGet(this, _outline), trX, blY, -width, height);
        points = __privateMethod(this, _FreeHighlightOutline_instances, rescale_fn).call(this, __privateGet(this, _points2), trX, blY, -width, height);
        break;
      case 270:
        outline = __privateMethod(this, _FreeHighlightOutline_instances, rescaleAndSwap_fn).call(this, __privateGet(this, _outline), trX, trY, -width, -height);
        points = __privateMethod(this, _FreeHighlightOutline_instances, rescaleAndSwap_fn).call(this, __privateGet(this, _points2), trX, trY, -width, -height);
        break;
    }
    return {
      outline: Array.from(outline),
      points: [Array.from(points)]
    };
  }
  get box() {
    return __privateGet(this, _bbox);
  }
  getNewOutline(thickness, innerMargin) {
    const {
      x: x2,
      y: y2,
      width,
      height
    } = __privateGet(this, _bbox);
    const [layerX, layerY, layerWidth, layerHeight] = __privateGet(this, _box4);
    const sx = width * layerWidth;
    const sy = height * layerHeight;
    const tx = x2 * layerWidth + layerX;
    const ty = y2 * layerHeight + layerY;
    const outliner = new FreeOutliner({
      x: __privateGet(this, _points2)[0] * sx + tx,
      y: __privateGet(this, _points2)[1] * sy + ty
    }, __privateGet(this, _box4), __privateGet(this, _scaleFactor2), thickness, __privateGet(this, _isLTR2), innerMargin ?? __privateGet(this, _innerMargin2));
    for (let i2 = 2; i2 < __privateGet(this, _points2).length; i2 += 2) {
      outliner.add({
        x: __privateGet(this, _points2)[i2] * sx + tx,
        y: __privateGet(this, _points2)[i2 + 1] * sy + ty
      });
    }
    return outliner.getOutlines();
  }
};
_box4 = new WeakMap();
_bbox = new WeakMap();
_innerMargin2 = new WeakMap();
_isLTR2 = new WeakMap();
_points2 = new WeakMap();
_scaleFactor2 = new WeakMap();
_outline = new WeakMap();
_FreeHighlightOutline_instances = new WeakSet();
rescale_fn = function(src, tx, ty, sx, sy) {
  const dest = new Float64Array(src.length);
  for (let i2 = 0, ii = src.length; i2 < ii; i2 += 2) {
    dest[i2] = tx + src[i2] * sx;
    dest[i2 + 1] = ty + src[i2 + 1] * sy;
  }
  return dest;
};
rescaleAndSwap_fn = function(src, tx, ty, sx, sy) {
  const dest = new Float64Array(src.length);
  for (let i2 = 0, ii = src.length; i2 < ii; i2 += 2) {
    dest[i2] = tx + src[i2 + 1] * sx;
    dest[i2 + 1] = ty + src[i2] * sy;
  }
  return dest;
};
computeMinMax_fn = function(isLTR) {
  const outline = __privateGet(this, _outline);
  let lastX = outline[4];
  let lastY = outline[5];
  let minX = lastX;
  let minY = lastY;
  let maxX = lastX;
  let maxY = lastY;
  let lastPointX = lastX;
  let lastPointY = lastY;
  const ltrCallback = isLTR ? Math.max : Math.min;
  for (let i2 = 6, ii = outline.length; i2 < ii; i2 += 6) {
    if (isNaN(outline[i2])) {
      minX = Math.min(minX, outline[i2 + 4]);
      minY = Math.min(minY, outline[i2 + 5]);
      maxX = Math.max(maxX, outline[i2 + 4]);
      maxY = Math.max(maxY, outline[i2 + 5]);
      if (lastPointY < outline[i2 + 5]) {
        lastPointX = outline[i2 + 4];
        lastPointY = outline[i2 + 5];
      } else if (lastPointY === outline[i2 + 5]) {
        lastPointX = ltrCallback(lastPointX, outline[i2 + 4]);
      }
    } else {
      const bbox = Util.bezierBoundingBox(lastX, lastY, ...outline.slice(i2, i2 + 6));
      minX = Math.min(minX, bbox[0]);
      minY = Math.min(minY, bbox[1]);
      maxX = Math.max(maxX, bbox[2]);
      maxY = Math.max(maxY, bbox[3]);
      if (lastPointY < bbox[3]) {
        lastPointX = bbox[2];
        lastPointY = bbox[3];
      } else if (lastPointY === bbox[3]) {
        lastPointX = ltrCallback(lastPointX, bbox[2]);
      }
    }
    lastX = outline[i2 + 4];
    lastY = outline[i2 + 5];
  }
  const x2 = minX - __privateGet(this, _innerMargin2), y2 = minY - __privateGet(this, _innerMargin2), width = maxX - minX + 2 * __privateGet(this, _innerMargin2), height = maxY - minY + 2 * __privateGet(this, _innerMargin2);
  __privateSet(this, _bbox, {
    x: x2,
    y: y2,
    width,
    height,
    lastPoint: [lastPointX, lastPointY]
  });
};
var _boundKeyDown2, _boundPointerDown, _button, _buttonSwatch, _defaultColor, _dropdown, _dropdownWasFromKeyboard, _isMainColorPicker, _editor3, _eventBus, _uiManager2, _type, _ColorPicker_instances, getDropdownRoot_fn, colorSelect_fn, keyDown_fn2, openDropdown_fn, pointerDown_fn2, isDropdownVisible_get;
var _ColorPicker = class _ColorPicker {
  constructor({
    editor = null,
    uiManager = null
  }) {
    __privateAdd(this, _ColorPicker_instances);
    __privateAdd(this, _boundKeyDown2, __privateMethod(this, _ColorPicker_instances, keyDown_fn2).bind(this));
    __privateAdd(this, _boundPointerDown, __privateMethod(this, _ColorPicker_instances, pointerDown_fn2).bind(this));
    __privateAdd(this, _button, null);
    __privateAdd(this, _buttonSwatch, null);
    __privateAdd(this, _defaultColor);
    __privateAdd(this, _dropdown, null);
    __privateAdd(this, _dropdownWasFromKeyboard, false);
    __privateAdd(this, _isMainColorPicker, false);
    __privateAdd(this, _editor3, null);
    __privateAdd(this, _eventBus);
    __privateAdd(this, _uiManager2, null);
    __privateAdd(this, _type);
    var _a2;
    if (editor) {
      __privateSet(this, _isMainColorPicker, false);
      __privateSet(this, _type, AnnotationEditorParamsType.HIGHLIGHT_COLOR);
      __privateSet(this, _editor3, editor);
    } else {
      __privateSet(this, _isMainColorPicker, true);
      __privateSet(this, _type, AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR);
    }
    __privateSet(this, _uiManager2, (editor == null ? void 0 : editor._uiManager) || uiManager);
    __privateSet(this, _eventBus, __privateGet(this, _uiManager2)._eventBus);
    __privateSet(this, _defaultColor, (editor == null ? void 0 : editor.color) || ((_a2 = __privateGet(this, _uiManager2)) == null ? void 0 : _a2.highlightColors.values().next().value) || "#FFFF98");
  }
  static get _keyboardManager() {
    return shadow(this, "_keyboardManager", new KeyboardManager([[["Escape", "mac+Escape"], _ColorPicker.prototype._hideDropdownFromKeyboard], [[" ", "mac+ "], _ColorPicker.prototype._colorSelectFromKeyboard], [["ArrowDown", "ArrowRight", "mac+ArrowDown", "mac+ArrowRight"], _ColorPicker.prototype._moveToNext], [["ArrowUp", "ArrowLeft", "mac+ArrowUp", "mac+ArrowLeft"], _ColorPicker.prototype._moveToPrevious], [["Home", "mac+Home"], _ColorPicker.prototype._moveToBeginning], [["End", "mac+End"], _ColorPicker.prototype._moveToEnd]]));
  }
  renderButton() {
    const button = __privateSet(this, _button, document.createElement("button"));
    button.className = "colorPicker";
    button.tabIndex = "0";
    button.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-button");
    button.setAttribute("aria-haspopup", true);
    button.addEventListener("click", __privateMethod(this, _ColorPicker_instances, openDropdown_fn).bind(this));
    button.addEventListener("keydown", __privateGet(this, _boundKeyDown2));
    const swatch = __privateSet(this, _buttonSwatch, document.createElement("span"));
    swatch.className = "swatch";
    swatch.setAttribute("aria-hidden", true);
    swatch.style.backgroundColor = __privateGet(this, _defaultColor);
    button.append(swatch);
    return button;
  }
  renderMainDropdown() {
    const dropdown = __privateSet(this, _dropdown, __privateMethod(this, _ColorPicker_instances, getDropdownRoot_fn).call(this));
    dropdown.setAttribute("aria-orientation", "horizontal");
    dropdown.setAttribute("aria-labelledby", "highlightColorPickerLabel");
    return dropdown;
  }
  _colorSelectFromKeyboard(event) {
    if (event.target === __privateGet(this, _button)) {
      __privateMethod(this, _ColorPicker_instances, openDropdown_fn).call(this, event);
      return;
    }
    const color = event.target.getAttribute("data-color");
    if (!color) {
      return;
    }
    __privateMethod(this, _ColorPicker_instances, colorSelect_fn).call(this, color, event);
  }
  _moveToNext(event) {
    var _a2, _b;
    if (!__privateGet(this, _ColorPicker_instances, isDropdownVisible_get)) {
      __privateMethod(this, _ColorPicker_instances, openDropdown_fn).call(this, event);
      return;
    }
    if (event.target === __privateGet(this, _button)) {
      (_a2 = __privateGet(this, _dropdown).firstChild) == null ? void 0 : _a2.focus();
      return;
    }
    (_b = event.target.nextSibling) == null ? void 0 : _b.focus();
  }
  _moveToPrevious(event) {
    var _a2, _b;
    if (event.target === ((_a2 = __privateGet(this, _dropdown)) == null ? void 0 : _a2.firstChild) || event.target === __privateGet(this, _button)) {
      if (__privateGet(this, _ColorPicker_instances, isDropdownVisible_get)) {
        this._hideDropdownFromKeyboard();
      }
      return;
    }
    if (!__privateGet(this, _ColorPicker_instances, isDropdownVisible_get)) {
      __privateMethod(this, _ColorPicker_instances, openDropdown_fn).call(this, event);
    }
    (_b = event.target.previousSibling) == null ? void 0 : _b.focus();
  }
  _moveToBeginning(event) {
    var _a2;
    if (!__privateGet(this, _ColorPicker_instances, isDropdownVisible_get)) {
      __privateMethod(this, _ColorPicker_instances, openDropdown_fn).call(this, event);
      return;
    }
    (_a2 = __privateGet(this, _dropdown).firstChild) == null ? void 0 : _a2.focus();
  }
  _moveToEnd(event) {
    var _a2;
    if (!__privateGet(this, _ColorPicker_instances, isDropdownVisible_get)) {
      __privateMethod(this, _ColorPicker_instances, openDropdown_fn).call(this, event);
      return;
    }
    (_a2 = __privateGet(this, _dropdown).lastChild) == null ? void 0 : _a2.focus();
  }
  hideDropdown() {
    var _a2;
    (_a2 = __privateGet(this, _dropdown)) == null ? void 0 : _a2.classList.add("hidden");
    window.removeEventListener("pointerdown", __privateGet(this, _boundPointerDown));
  }
  _hideDropdownFromKeyboard() {
    var _a2;
    if (__privateGet(this, _isMainColorPicker)) {
      return;
    }
    if (!__privateGet(this, _ColorPicker_instances, isDropdownVisible_get)) {
      (_a2 = __privateGet(this, _editor3)) == null ? void 0 : _a2.unselect();
      return;
    }
    this.hideDropdown();
    __privateGet(this, _button).focus({
      preventScroll: true,
      focusVisible: __privateGet(this, _dropdownWasFromKeyboard)
    });
  }
  updateColor(color) {
    if (__privateGet(this, _buttonSwatch)) {
      __privateGet(this, _buttonSwatch).style.backgroundColor = color;
    }
    if (!__privateGet(this, _dropdown)) {
      return;
    }
    const i2 = __privateGet(this, _uiManager2).highlightColors.values();
    for (const child of __privateGet(this, _dropdown).children) {
      child.setAttribute("aria-selected", i2.next().value === color);
    }
  }
  destroy() {
    var _a2, _b;
    (_a2 = __privateGet(this, _button)) == null ? void 0 : _a2.remove();
    __privateSet(this, _button, null);
    __privateSet(this, _buttonSwatch, null);
    (_b = __privateGet(this, _dropdown)) == null ? void 0 : _b.remove();
    __privateSet(this, _dropdown, null);
  }
};
_boundKeyDown2 = new WeakMap();
_boundPointerDown = new WeakMap();
_button = new WeakMap();
_buttonSwatch = new WeakMap();
_defaultColor = new WeakMap();
_dropdown = new WeakMap();
_dropdownWasFromKeyboard = new WeakMap();
_isMainColorPicker = new WeakMap();
_editor3 = new WeakMap();
_eventBus = new WeakMap();
_uiManager2 = new WeakMap();
_type = new WeakMap();
_ColorPicker_instances = new WeakSet();
getDropdownRoot_fn = function() {
  const div = document.createElement("div");
  div.addEventListener("contextmenu", noContextMenu);
  div.className = "dropdown";
  div.role = "listbox";
  div.setAttribute("aria-multiselectable", false);
  div.setAttribute("aria-orientation", "vertical");
  div.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-dropdown");
  for (const [name, color] of __privateGet(this, _uiManager2).highlightColors) {
    const button = document.createElement("button");
    button.tabIndex = "0";
    button.role = "option";
    button.setAttribute("data-color", color);
    button.title = name;
    button.setAttribute("data-l10n-id", `pdfjs-editor-colorpicker-${name}`);
    const swatch = document.createElement("span");
    button.append(swatch);
    swatch.className = "swatch";
    swatch.style.backgroundColor = color;
    button.setAttribute("aria-selected", color === __privateGet(this, _defaultColor));
    button.addEventListener("click", __privateMethod(this, _ColorPicker_instances, colorSelect_fn).bind(this, color));
    div.append(button);
  }
  div.addEventListener("keydown", __privateGet(this, _boundKeyDown2));
  return div;
};
colorSelect_fn = function(color, event) {
  event.stopPropagation();
  __privateGet(this, _eventBus).dispatch("switchannotationeditorparams", {
    source: this,
    type: __privateGet(this, _type),
    value: color
  });
};
keyDown_fn2 = function(event) {
  _ColorPicker._keyboardManager.exec(this, event);
};
openDropdown_fn = function(event) {
  if (__privateGet(this, _ColorPicker_instances, isDropdownVisible_get)) {
    this.hideDropdown();
    return;
  }
  __privateSet(this, _dropdownWasFromKeyboard, event.detail === 0);
  window.addEventListener("pointerdown", __privateGet(this, _boundPointerDown));
  if (__privateGet(this, _dropdown)) {
    __privateGet(this, _dropdown).classList.remove("hidden");
    return;
  }
  const root = __privateSet(this, _dropdown, __privateMethod(this, _ColorPicker_instances, getDropdownRoot_fn).call(this));
  __privateGet(this, _button).append(root);
};
pointerDown_fn2 = function(event) {
  var _a2;
  if ((_a2 = __privateGet(this, _dropdown)) == null ? void 0 : _a2.contains(event.target)) {
    return;
  }
  this.hideDropdown();
};
isDropdownVisible_get = function() {
  return __privateGet(this, _dropdown) && !__privateGet(this, _dropdown).classList.contains("hidden");
};
var ColorPicker = _ColorPicker;
var _anchorNode, _anchorOffset, _boxes, _clipPathId, _colorPicker2, _focusOutlines, _focusNode, _focusOffset, _highlightDiv, _highlightOutlines, _id4, _isFreeHighlight, _boundKeydown2, _lastPoint, _opacity, _outlineId, _text, _thickness2, _methodOfCreation, _HighlightEditor_instances, createOutlines_fn, createFreeOutlines_fn, updateColor_fn2, updateThickness_fn, changeThickness_fn, cleanDrawLayer_fn, addToDrawLayer_fn, _HighlightEditor_static, rotateBbox_fn, keydown_fn, setCaret_fn, getRotation_fn, serializeBoxes_fn, serializeOutlines_fn, highlightMove_fn, endHighlight_fn;
var _HighlightEditor = class _HighlightEditor extends AnnotationEditor {
  constructor(params) {
    super({
      ...params,
      name: "highlightEditor"
    });
    __privateAdd(this, _HighlightEditor_instances);
    __privateAdd(this, _anchorNode, null);
    __privateAdd(this, _anchorOffset, 0);
    __privateAdd(this, _boxes);
    __privateAdd(this, _clipPathId, null);
    __privateAdd(this, _colorPicker2, null);
    __privateAdd(this, _focusOutlines, null);
    __privateAdd(this, _focusNode, null);
    __privateAdd(this, _focusOffset, 0);
    __privateAdd(this, _highlightDiv, null);
    __privateAdd(this, _highlightOutlines, null);
    __privateAdd(this, _id4, null);
    __privateAdd(this, _isFreeHighlight, false);
    __privateAdd(this, _boundKeydown2, __privateMethod(this, _HighlightEditor_instances, keydown_fn).bind(this));
    __privateAdd(this, _lastPoint, null);
    __privateAdd(this, _opacity);
    __privateAdd(this, _outlineId, null);
    __privateAdd(this, _text, "");
    __privateAdd(this, _thickness2);
    __privateAdd(this, _methodOfCreation, "");
    this.color = params.color || _HighlightEditor._defaultColor;
    __privateSet(this, _thickness2, params.thickness || _HighlightEditor._defaultThickness);
    __privateSet(this, _opacity, params.opacity || _HighlightEditor._defaultOpacity);
    __privateSet(this, _boxes, params.boxes || null);
    __privateSet(this, _methodOfCreation, params.methodOfCreation || "");
    __privateSet(this, _text, params.text || "");
    this._isDraggable = false;
    if (params.highlightId > -1) {
      __privateSet(this, _isFreeHighlight, true);
      __privateMethod(this, _HighlightEditor_instances, createFreeOutlines_fn).call(this, params);
      __privateMethod(this, _HighlightEditor_instances, addToDrawLayer_fn).call(this);
    } else {
      __privateSet(this, _anchorNode, params.anchorNode);
      __privateSet(this, _anchorOffset, params.anchorOffset);
      __privateSet(this, _focusNode, params.focusNode);
      __privateSet(this, _focusOffset, params.focusOffset);
      __privateMethod(this, _HighlightEditor_instances, createOutlines_fn).call(this);
      __privateMethod(this, _HighlightEditor_instances, addToDrawLayer_fn).call(this);
      this.rotate(this.rotation);
    }
  }
  static get _keyboardManager() {
    const proto = _HighlightEditor.prototype;
    return shadow(this, "_keyboardManager", new KeyboardManager([[["ArrowLeft", "mac+ArrowLeft"], proto._moveCaret, {
      args: [0]
    }], [["ArrowRight", "mac+ArrowRight"], proto._moveCaret, {
      args: [1]
    }], [["ArrowUp", "mac+ArrowUp"], proto._moveCaret, {
      args: [2]
    }], [["ArrowDown", "mac+ArrowDown"], proto._moveCaret, {
      args: [3]
    }]]));
  }
  get telemetryInitialData() {
    return {
      action: "added",
      type: __privateGet(this, _isFreeHighlight) ? "free_highlight" : "highlight",
      color: this._uiManager.highlightColorNames.get(this.color),
      thickness: __privateGet(this, _thickness2),
      methodOfCreation: __privateGet(this, _methodOfCreation)
    };
  }
  get telemetryFinalData() {
    return {
      type: "highlight",
      color: this._uiManager.highlightColorNames.get(this.color)
    };
  }
  static computeTelemetryFinalData(data) {
    return {
      numberOfColors: data.get("color").size
    };
  }
  static initialize(l10n, uiManager) {
    var _a2;
    AnnotationEditor.initialize(l10n, uiManager);
    _HighlightEditor._defaultColor || (_HighlightEditor._defaultColor = ((_a2 = uiManager.highlightColors) == null ? void 0 : _a2.values().next().value) || "#fff066");
  }
  static updateDefaultParams(type, value) {
    switch (type) {
      case AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR:
        _HighlightEditor._defaultColor = value;
        break;
      case AnnotationEditorParamsType.HIGHLIGHT_THICKNESS:
        _HighlightEditor._defaultThickness = value;
        break;
    }
  }
  translateInPage(x2, y2) {
  }
  get toolbarPosition() {
    return __privateGet(this, _lastPoint);
  }
  updateParams(type, value) {
    switch (type) {
      case AnnotationEditorParamsType.HIGHLIGHT_COLOR:
        __privateMethod(this, _HighlightEditor_instances, updateColor_fn2).call(this, value);
        break;
      case AnnotationEditorParamsType.HIGHLIGHT_THICKNESS:
        __privateMethod(this, _HighlightEditor_instances, updateThickness_fn).call(this, value);
        break;
    }
  }
  static get defaultPropertiesToUpdate() {
    return [[AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR, _HighlightEditor._defaultColor], [AnnotationEditorParamsType.HIGHLIGHT_THICKNESS, _HighlightEditor._defaultThickness]];
  }
  get propertiesToUpdate() {
    return [[AnnotationEditorParamsType.HIGHLIGHT_COLOR, this.color || _HighlightEditor._defaultColor], [AnnotationEditorParamsType.HIGHLIGHT_THICKNESS, __privateGet(this, _thickness2) || _HighlightEditor._defaultThickness], [AnnotationEditorParamsType.HIGHLIGHT_FREE, __privateGet(this, _isFreeHighlight)]];
  }
  async addEditToolbar() {
    const toolbar = await super.addEditToolbar();
    if (!toolbar) {
      return null;
    }
    if (this._uiManager.highlightColors) {
      __privateSet(this, _colorPicker2, new ColorPicker({
        editor: this
      }));
      toolbar.addColorPicker(__privateGet(this, _colorPicker2));
    }
    return toolbar;
  }
  disableEditing() {
    super.disableEditing();
    this.div.classList.toggle("disabled", true);
  }
  enableEditing() {
    super.enableEditing();
    this.div.classList.toggle("disabled", false);
  }
  fixAndSetPosition() {
    return super.fixAndSetPosition(__privateMethod(this, _HighlightEditor_instances, getRotation_fn).call(this));
  }
  getBaseTranslation() {
    return [0, 0];
  }
  getRect(tx, ty) {
    return super.getRect(tx, ty, __privateMethod(this, _HighlightEditor_instances, getRotation_fn).call(this));
  }
  onceAdded() {
    this.parent.addUndoableEditor(this);
    this.div.focus();
  }
  remove() {
    __privateMethod(this, _HighlightEditor_instances, cleanDrawLayer_fn).call(this);
    this._reportTelemetry({
      action: "deleted"
    });
    super.remove();
  }
  rebuild() {
    if (!this.parent) {
      return;
    }
    super.rebuild();
    if (this.div === null) {
      return;
    }
    __privateMethod(this, _HighlightEditor_instances, addToDrawLayer_fn).call(this);
    if (!this.isAttachedToDOM) {
      this.parent.add(this);
    }
  }
  setParent(parent) {
    var _a2;
    let mustBeSelected = false;
    if (this.parent && !parent) {
      __privateMethod(this, _HighlightEditor_instances, cleanDrawLayer_fn).call(this);
    } else if (parent) {
      __privateMethod(this, _HighlightEditor_instances, addToDrawLayer_fn).call(this, parent);
      mustBeSelected = !this.parent && ((_a2 = this.div) == null ? void 0 : _a2.classList.contains("selectedEditor"));
    }
    super.setParent(parent);
    this.show(this._isVisible);
    if (mustBeSelected) {
      this.select();
    }
  }
  rotate(angle) {
    var _a2, _b, _c;
    const {
      drawLayer
    } = this.parent;
    let box;
    if (__privateGet(this, _isFreeHighlight)) {
      angle = (angle - this.rotation + 360) % 360;
      box = __privateMethod(_a2 = _HighlightEditor, _HighlightEditor_static, rotateBbox_fn).call(_a2, __privateGet(this, _highlightOutlines).box, angle);
    } else {
      box = __privateMethod(_b = _HighlightEditor, _HighlightEditor_static, rotateBbox_fn).call(_b, this, angle);
    }
    drawLayer.rotate(__privateGet(this, _id4), angle);
    drawLayer.rotate(__privateGet(this, _outlineId), angle);
    drawLayer.updateBox(__privateGet(this, _id4), box);
    drawLayer.updateBox(__privateGet(this, _outlineId), __privateMethod(_c = _HighlightEditor, _HighlightEditor_static, rotateBbox_fn).call(_c, __privateGet(this, _focusOutlines).box, angle));
  }
  render() {
    if (this.div) {
      return this.div;
    }
    const div = super.render();
    if (__privateGet(this, _text)) {
      div.setAttribute("aria-label", __privateGet(this, _text));
      div.setAttribute("role", "mark");
    }
    if (__privateGet(this, _isFreeHighlight)) {
      div.classList.add("free");
    } else {
      this.div.addEventListener("keydown", __privateGet(this, _boundKeydown2));
    }
    const highlightDiv = __privateSet(this, _highlightDiv, document.createElement("div"));
    div.append(highlightDiv);
    highlightDiv.setAttribute("aria-hidden", "true");
    highlightDiv.className = "internal";
    highlightDiv.style.clipPath = __privateGet(this, _clipPathId);
    const [parentWidth, parentHeight] = this.parentDimensions;
    this.setDims(this.width * parentWidth, this.height * parentHeight);
    bindEvents(this, __privateGet(this, _highlightDiv), ["pointerover", "pointerleave"]);
    this.enableEditing();
    return div;
  }
  pointerover() {
    this.parent.drawLayer.addClass(__privateGet(this, _outlineId), "hovered");
  }
  pointerleave() {
    this.parent.drawLayer.removeClass(__privateGet(this, _outlineId), "hovered");
  }
  _moveCaret(direction) {
    this.parent.unselect(this);
    switch (direction) {
      case 0:
      case 2:
        __privateMethod(this, _HighlightEditor_instances, setCaret_fn).call(this, true);
        break;
      case 1:
      case 3:
        __privateMethod(this, _HighlightEditor_instances, setCaret_fn).call(this, false);
        break;
    }
  }
  select() {
    var _a2, _b;
    super.select();
    if (!__privateGet(this, _outlineId)) {
      return;
    }
    (_a2 = this.parent) == null ? void 0 : _a2.drawLayer.removeClass(__privateGet(this, _outlineId), "hovered");
    (_b = this.parent) == null ? void 0 : _b.drawLayer.addClass(__privateGet(this, _outlineId), "selected");
  }
  unselect() {
    var _a2;
    super.unselect();
    if (!__privateGet(this, _outlineId)) {
      return;
    }
    (_a2 = this.parent) == null ? void 0 : _a2.drawLayer.removeClass(__privateGet(this, _outlineId), "selected");
    if (!__privateGet(this, _isFreeHighlight)) {
      __privateMethod(this, _HighlightEditor_instances, setCaret_fn).call(this, false);
    }
  }
  get _mustFixPosition() {
    return !__privateGet(this, _isFreeHighlight);
  }
  show(visible = this._isVisible) {
    super.show(visible);
    if (this.parent) {
      this.parent.drawLayer.show(__privateGet(this, _id4), visible);
      this.parent.drawLayer.show(__privateGet(this, _outlineId), visible);
    }
  }
  static startHighlighting(parent, isLTR, {
    target: textLayer,
    x: x2,
    y: y2
  }) {
    const {
      x: layerX,
      y: layerY,
      width: parentWidth,
      height: parentHeight
    } = textLayer.getBoundingClientRect();
    const pointerMove = (e2) => {
      __privateMethod(this, _HighlightEditor_static, highlightMove_fn).call(this, parent, e2);
    };
    const pointerDownOptions = {
      capture: true,
      passive: false
    };
    const pointerDown = (e2) => {
      e2.preventDefault();
      e2.stopPropagation();
    };
    const pointerUpCallback = (e2) => {
      textLayer.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("blur", pointerUpCallback);
      window.removeEventListener("pointerup", pointerUpCallback);
      window.removeEventListener("pointerdown", pointerDown, pointerDownOptions);
      window.removeEventListener("contextmenu", noContextMenu);
      __privateMethod(this, _HighlightEditor_static, endHighlight_fn).call(this, parent, e2);
    };
    window.addEventListener("blur", pointerUpCallback);
    window.addEventListener("pointerup", pointerUpCallback);
    window.addEventListener("pointerdown", pointerDown, pointerDownOptions);
    window.addEventListener("contextmenu", noContextMenu);
    textLayer.addEventListener("pointermove", pointerMove);
    this._freeHighlight = new FreeOutliner({
      x: x2,
      y: y2
    }, [layerX, layerY, parentWidth, parentHeight], parent.scale, this._defaultThickness / 2, isLTR, 1e-3);
    ({
      id: this._freeHighlightId,
      clipPathId: this._freeHighlightClipId
    } = parent.drawLayer.highlight(this._freeHighlight, this._defaultColor, this._defaultOpacity, true));
  }
  static deserialize(data, parent, uiManager) {
    var _a2;
    const editor = super.deserialize(data, parent, uiManager);
    const {
      rect: [blX, blY, trX, trY],
      color,
      quadPoints
    } = data;
    editor.color = Util.makeHexColor(...color);
    __privateSet(editor, _opacity, data.opacity);
    const [pageWidth, pageHeight] = editor.pageDimensions;
    editor.width = (trX - blX) / pageWidth;
    editor.height = (trY - blY) / pageHeight;
    const boxes = __privateSet(editor, _boxes, []);
    for (let i2 = 0; i2 < quadPoints.length; i2 += 8) {
      boxes.push({
        x: (quadPoints[4] - trX) / pageWidth,
        y: (trY - (1 - quadPoints[i2 + 5])) / pageHeight,
        width: (quadPoints[i2 + 2] - quadPoints[i2]) / pageWidth,
        height: (quadPoints[i2 + 5] - quadPoints[i2 + 1]) / pageHeight
      });
    }
    __privateMethod(_a2 = editor, _HighlightEditor_instances, createOutlines_fn).call(_a2);
    return editor;
  }
  serialize(isForCopying = false) {
    if (this.isEmpty() || isForCopying) {
      return null;
    }
    const rect = this.getRect(0, 0);
    const color = AnnotationEditor._colorManager.convert(this.color);
    return {
      annotationType: AnnotationEditorType.HIGHLIGHT,
      color,
      opacity: __privateGet(this, _opacity),
      thickness: __privateGet(this, _thickness2),
      quadPoints: __privateMethod(this, _HighlightEditor_instances, serializeBoxes_fn).call(this),
      outlines: __privateMethod(this, _HighlightEditor_instances, serializeOutlines_fn).call(this, rect),
      pageIndex: this.pageIndex,
      rect,
      rotation: __privateMethod(this, _HighlightEditor_instances, getRotation_fn).call(this),
      structTreeParentId: this._structTreeParentId
    };
  }
  static canCreateNewEmptyEditor() {
    return false;
  }
};
_anchorNode = new WeakMap();
_anchorOffset = new WeakMap();
_boxes = new WeakMap();
_clipPathId = new WeakMap();
_colorPicker2 = new WeakMap();
_focusOutlines = new WeakMap();
_focusNode = new WeakMap();
_focusOffset = new WeakMap();
_highlightDiv = new WeakMap();
_highlightOutlines = new WeakMap();
_id4 = new WeakMap();
_isFreeHighlight = new WeakMap();
_boundKeydown2 = new WeakMap();
_lastPoint = new WeakMap();
_opacity = new WeakMap();
_outlineId = new WeakMap();
_text = new WeakMap();
_thickness2 = new WeakMap();
_methodOfCreation = new WeakMap();
_HighlightEditor_instances = new WeakSet();
createOutlines_fn = function() {
  const outliner = new Outliner(__privateGet(this, _boxes), 1e-3);
  __privateSet(this, _highlightOutlines, outliner.getOutlines());
  ({
    x: this.x,
    y: this.y,
    width: this.width,
    height: this.height
  } = __privateGet(this, _highlightOutlines).box);
  const outlinerForOutline = new Outliner(__privateGet(this, _boxes), 25e-4, 1e-3, this._uiManager.direction === "ltr");
  __privateSet(this, _focusOutlines, outlinerForOutline.getOutlines());
  const {
    lastPoint
  } = __privateGet(this, _focusOutlines).box;
  __privateSet(this, _lastPoint, [(lastPoint[0] - this.x) / this.width, (lastPoint[1] - this.y) / this.height]);
};
createFreeOutlines_fn = function({
  highlightOutlines,
  highlightId,
  clipPathId
}) {
  var _a2, _b;
  __privateSet(this, _highlightOutlines, highlightOutlines);
  const extraThickness = 1.5;
  __privateSet(this, _focusOutlines, highlightOutlines.getNewOutline(__privateGet(this, _thickness2) / 2 + extraThickness, 25e-4));
  if (highlightId >= 0) {
    __privateSet(this, _id4, highlightId);
    __privateSet(this, _clipPathId, clipPathId);
    this.parent.drawLayer.finalizeLine(highlightId, highlightOutlines);
    __privateSet(this, _outlineId, this.parent.drawLayer.highlightOutline(__privateGet(this, _focusOutlines)));
  } else if (this.parent) {
    const angle = this.parent.viewport.rotation;
    this.parent.drawLayer.updateLine(__privateGet(this, _id4), highlightOutlines);
    this.parent.drawLayer.updateBox(__privateGet(this, _id4), __privateMethod(_a2 = _HighlightEditor, _HighlightEditor_static, rotateBbox_fn).call(_a2, __privateGet(this, _highlightOutlines).box, (angle - this.rotation + 360) % 360));
    this.parent.drawLayer.updateLine(__privateGet(this, _outlineId), __privateGet(this, _focusOutlines));
    this.parent.drawLayer.updateBox(__privateGet(this, _outlineId), __privateMethod(_b = _HighlightEditor, _HighlightEditor_static, rotateBbox_fn).call(_b, __privateGet(this, _focusOutlines).box, angle));
  }
  const {
    x: x2,
    y: y2,
    width,
    height
  } = highlightOutlines.box;
  switch (this.rotation) {
    case 0:
      this.x = x2;
      this.y = y2;
      this.width = width;
      this.height = height;
      break;
    case 90: {
      const [pageWidth, pageHeight] = this.parentDimensions;
      this.x = y2;
      this.y = 1 - x2;
      this.width = width * pageHeight / pageWidth;
      this.height = height * pageWidth / pageHeight;
      break;
    }
    case 180:
      this.x = 1 - x2;
      this.y = 1 - y2;
      this.width = width;
      this.height = height;
      break;
    case 270: {
      const [pageWidth, pageHeight] = this.parentDimensions;
      this.x = 1 - y2;
      this.y = x2;
      this.width = width * pageHeight / pageWidth;
      this.height = height * pageWidth / pageHeight;
      break;
    }
  }
  const {
    lastPoint
  } = __privateGet(this, _focusOutlines).box;
  __privateSet(this, _lastPoint, [(lastPoint[0] - x2) / width, (lastPoint[1] - y2) / height]);
};
updateColor_fn2 = function(color) {
  const setColor = (col) => {
    var _a2, _b;
    this.color = col;
    (_a2 = this.parent) == null ? void 0 : _a2.drawLayer.changeColor(__privateGet(this, _id4), col);
    (_b = __privateGet(this, _colorPicker2)) == null ? void 0 : _b.updateColor(col);
  };
  const savedColor = this.color;
  this.addCommands({
    cmd: setColor.bind(this, color),
    undo: setColor.bind(this, savedColor),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: true,
    type: AnnotationEditorParamsType.HIGHLIGHT_COLOR,
    overwriteIfSameType: true,
    keepUndo: true
  });
  this._reportTelemetry({
    action: "color_changed",
    color: this._uiManager.highlightColorNames.get(color)
  }, true);
};
updateThickness_fn = function(thickness) {
  const savedThickness = __privateGet(this, _thickness2);
  const setThickness = (th) => {
    __privateSet(this, _thickness2, th);
    __privateMethod(this, _HighlightEditor_instances, changeThickness_fn).call(this, th);
  };
  this.addCommands({
    cmd: setThickness.bind(this, thickness),
    undo: setThickness.bind(this, savedThickness),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: true,
    type: AnnotationEditorParamsType.INK_THICKNESS,
    overwriteIfSameType: true,
    keepUndo: true
  });
  this._reportTelemetry({
    action: "thickness_changed",
    thickness
  }, true);
};
changeThickness_fn = function(thickness) {
  if (!__privateGet(this, _isFreeHighlight)) {
    return;
  }
  __privateMethod(this, _HighlightEditor_instances, createFreeOutlines_fn).call(this, {
    highlightOutlines: __privateGet(this, _highlightOutlines).getNewOutline(thickness / 2)
  });
  this.fixAndSetPosition();
  const [parentWidth, parentHeight] = this.parentDimensions;
  this.setDims(this.width * parentWidth, this.height * parentHeight);
};
cleanDrawLayer_fn = function() {
  if (__privateGet(this, _id4) === null || !this.parent) {
    return;
  }
  this.parent.drawLayer.remove(__privateGet(this, _id4));
  __privateSet(this, _id4, null);
  this.parent.drawLayer.remove(__privateGet(this, _outlineId));
  __privateSet(this, _outlineId, null);
};
addToDrawLayer_fn = function(parent = this.parent) {
  if (__privateGet(this, _id4) !== null) {
    return;
  }
  ({
    id: __privateWrapper(this, _id4)._,
    clipPathId: __privateWrapper(this, _clipPathId)._
  } = parent.drawLayer.highlight(__privateGet(this, _highlightOutlines), this.color, __privateGet(this, _opacity)));
  __privateSet(this, _outlineId, parent.drawLayer.highlightOutline(__privateGet(this, _focusOutlines)));
  if (__privateGet(this, _highlightDiv)) {
    __privateGet(this, _highlightDiv).style.clipPath = __privateGet(this, _clipPathId);
  }
};
_HighlightEditor_static = new WeakSet();
rotateBbox_fn = function({
  x: x2,
  y: y2,
  width,
  height
}, angle) {
  switch (angle) {
    case 90:
      return {
        x: 1 - y2 - height,
        y: x2,
        width: height,
        height: width
      };
    case 180:
      return {
        x: 1 - x2 - width,
        y: 1 - y2 - height,
        width,
        height
      };
    case 270:
      return {
        x: y2,
        y: 1 - x2 - width,
        width: height,
        height: width
      };
  }
  return {
    x: x2,
    y: y2,
    width,
    height
  };
};
keydown_fn = function(event) {
  _HighlightEditor._keyboardManager.exec(this, event);
};
setCaret_fn = function(start) {
  if (!__privateGet(this, _anchorNode)) {
    return;
  }
  const selection = window.getSelection();
  if (start) {
    selection.setPosition(__privateGet(this, _anchorNode), __privateGet(this, _anchorOffset));
  } else {
    selection.setPosition(__privateGet(this, _focusNode), __privateGet(this, _focusOffset));
  }
};
getRotation_fn = function() {
  return __privateGet(this, _isFreeHighlight) ? this.rotation : 0;
};
serializeBoxes_fn = function() {
  if (__privateGet(this, _isFreeHighlight)) {
    return null;
  }
  const [pageWidth, pageHeight] = this.pageDimensions;
  const boxes = __privateGet(this, _boxes);
  const quadPoints = new Array(boxes.length * 8);
  let i2 = 0;
  for (const {
    x: x2,
    y: y2,
    width,
    height
  } of boxes) {
    const sx = x2 * pageWidth;
    const sy = (1 - y2 - height) * pageHeight;
    quadPoints[i2] = quadPoints[i2 + 4] = sx;
    quadPoints[i2 + 1] = quadPoints[i2 + 3] = sy;
    quadPoints[i2 + 2] = quadPoints[i2 + 6] = sx + width * pageWidth;
    quadPoints[i2 + 5] = quadPoints[i2 + 7] = sy + height * pageHeight;
    i2 += 8;
  }
  return quadPoints;
};
serializeOutlines_fn = function(rect) {
  return __privateGet(this, _highlightOutlines).serialize(rect, __privateMethod(this, _HighlightEditor_instances, getRotation_fn).call(this));
};
highlightMove_fn = function(parent, event) {
  if (this._freeHighlight.add(event)) {
    parent.drawLayer.updatePath(this._freeHighlightId, this._freeHighlight);
  }
};
endHighlight_fn = function(parent, event) {
  if (!this._freeHighlight.isEmpty()) {
    parent.createAndAddNewEditor(event, false, {
      highlightId: this._freeHighlightId,
      highlightOutlines: this._freeHighlight.getOutlines(),
      clipPathId: this._freeHighlightClipId,
      methodOfCreation: "main_toolbar"
    });
  } else {
    parent.drawLayer.removeFreeHighlight(this._freeHighlightId);
  }
  this._freeHighlightId = -1;
  this._freeHighlight = null;
  this._freeHighlightClipId = "";
};
__privateAdd(_HighlightEditor, _HighlightEditor_static);
__publicField(_HighlightEditor, "_defaultColor", null);
__publicField(_HighlightEditor, "_defaultOpacity", 1);
__publicField(_HighlightEditor, "_defaultThickness", 12);
__publicField(_HighlightEditor, "_l10nPromise");
__publicField(_HighlightEditor, "_type", "highlight");
__publicField(_HighlightEditor, "_editorType", AnnotationEditorType.HIGHLIGHT);
__publicField(_HighlightEditor, "_freeHighlightId", -1);
__publicField(_HighlightEditor, "_freeHighlight", null);
__publicField(_HighlightEditor, "_freeHighlightClipId", "");
var HighlightEditor = _HighlightEditor;
var _baseHeight, _baseWidth, _boundCanvasPointermove, _boundCanvasPointerleave, _boundCanvasPointerup, _boundCanvasPointerdown, _canvasContextMenuTimeoutId, _currentPath2D, _disableEditing, _hasSomethingToDraw, _isCanvasInitialized, _observer, _realWidth, _realHeight, _requestFrameCallback, _InkEditor_instances, updateThickness_fn2, updateColor_fn3, updateOpacity_fn, getInitialBBox_fn, setStroke_fn, startDrawing_fn, draw_fn, endPath_fn, stopDrawing_fn, drawPoints_fn, makeBezierCurve_fn, generateBezierPoints_fn, redraw_fn, endDrawing_fn, createCanvas_fn, createObserver_fn, setCanvasDims_fn, setScaleFactor_fn, updateTransform_fn, _InkEditor_static, buildPath2D_fn, toPDFCoordinates_fn, fromPDFCoordinates_fn, serializePaths_fn, getBbox_fn, getPadding_fn, fitToContent_fn;
var _InkEditor = class _InkEditor extends AnnotationEditor {
  constructor(params) {
    super({
      ...params,
      name: "inkEditor"
    });
    __privateAdd(this, _InkEditor_instances);
    __privateAdd(this, _baseHeight, 0);
    __privateAdd(this, _baseWidth, 0);
    __privateAdd(this, _boundCanvasPointermove, this.canvasPointermove.bind(this));
    __privateAdd(this, _boundCanvasPointerleave, this.canvasPointerleave.bind(this));
    __privateAdd(this, _boundCanvasPointerup, this.canvasPointerup.bind(this));
    __privateAdd(this, _boundCanvasPointerdown, this.canvasPointerdown.bind(this));
    __privateAdd(this, _canvasContextMenuTimeoutId, null);
    __privateAdd(this, _currentPath2D, new Path2D());
    __privateAdd(this, _disableEditing, false);
    __privateAdd(this, _hasSomethingToDraw, false);
    __privateAdd(this, _isCanvasInitialized, false);
    __privateAdd(this, _observer, null);
    __privateAdd(this, _realWidth, 0);
    __privateAdd(this, _realHeight, 0);
    __privateAdd(this, _requestFrameCallback, null);
    this.color = params.color || null;
    this.thickness = params.thickness || null;
    this.opacity = params.opacity || null;
    this.paths = [];
    this.bezierPath2D = [];
    this.allRawPaths = [];
    this.currentPath = [];
    this.scaleFactor = 1;
    this.translationX = this.translationY = 0;
    this.x = 0;
    this.y = 0;
    this._willKeepAspectRatio = true;
  }
  static initialize(l10n, uiManager) {
    AnnotationEditor.initialize(l10n, uiManager);
  }
  static updateDefaultParams(type, value) {
    switch (type) {
      case AnnotationEditorParamsType.INK_THICKNESS:
        _InkEditor._defaultThickness = value;
        break;
      case AnnotationEditorParamsType.INK_COLOR:
        _InkEditor._defaultColor = value;
        break;
      case AnnotationEditorParamsType.INK_OPACITY:
        _InkEditor._defaultOpacity = value / 100;
        break;
    }
  }
  updateParams(type, value) {
    switch (type) {
      case AnnotationEditorParamsType.INK_THICKNESS:
        __privateMethod(this, _InkEditor_instances, updateThickness_fn2).call(this, value);
        break;
      case AnnotationEditorParamsType.INK_COLOR:
        __privateMethod(this, _InkEditor_instances, updateColor_fn3).call(this, value);
        break;
      case AnnotationEditorParamsType.INK_OPACITY:
        __privateMethod(this, _InkEditor_instances, updateOpacity_fn).call(this, value);
        break;
    }
  }
  static get defaultPropertiesToUpdate() {
    return [[AnnotationEditorParamsType.INK_THICKNESS, _InkEditor._defaultThickness], [AnnotationEditorParamsType.INK_COLOR, _InkEditor._defaultColor || AnnotationEditor._defaultLineColor], [AnnotationEditorParamsType.INK_OPACITY, Math.round(_InkEditor._defaultOpacity * 100)]];
  }
  get propertiesToUpdate() {
    return [[AnnotationEditorParamsType.INK_THICKNESS, this.thickness || _InkEditor._defaultThickness], [AnnotationEditorParamsType.INK_COLOR, this.color || _InkEditor._defaultColor || AnnotationEditor._defaultLineColor], [AnnotationEditorParamsType.INK_OPACITY, Math.round(100 * (this.opacity ?? _InkEditor._defaultOpacity))]];
  }
  rebuild() {
    if (!this.parent) {
      return;
    }
    super.rebuild();
    if (this.div === null) {
      return;
    }
    if (!this.canvas) {
      __privateMethod(this, _InkEditor_instances, createCanvas_fn).call(this);
      __privateMethod(this, _InkEditor_instances, createObserver_fn).call(this);
    }
    if (!this.isAttachedToDOM) {
      this.parent.add(this);
      __privateMethod(this, _InkEditor_instances, setCanvasDims_fn).call(this);
    }
    __privateMethod(this, _InkEditor_instances, fitToContent_fn).call(this);
  }
  remove() {
    if (this.canvas === null) {
      return;
    }
    if (!this.isEmpty()) {
      this.commit();
    }
    this.canvas.width = this.canvas.height = 0;
    this.canvas.remove();
    this.canvas = null;
    if (__privateGet(this, _canvasContextMenuTimeoutId)) {
      clearTimeout(__privateGet(this, _canvasContextMenuTimeoutId));
      __privateSet(this, _canvasContextMenuTimeoutId, null);
    }
    __privateGet(this, _observer).disconnect();
    __privateSet(this, _observer, null);
    super.remove();
  }
  setParent(parent) {
    if (!this.parent && parent) {
      this._uiManager.removeShouldRescale(this);
    } else if (this.parent && parent === null) {
      this._uiManager.addShouldRescale(this);
    }
    super.setParent(parent);
  }
  onScaleChanging() {
    const [parentWidth, parentHeight] = this.parentDimensions;
    const width = this.width * parentWidth;
    const height = this.height * parentHeight;
    this.setDimensions(width, height);
  }
  enableEditMode() {
    if (__privateGet(this, _disableEditing) || this.canvas === null) {
      return;
    }
    super.enableEditMode();
    this._isDraggable = false;
    this.canvas.addEventListener("pointerdown", __privateGet(this, _boundCanvasPointerdown));
  }
  disableEditMode() {
    if (!this.isInEditMode() || this.canvas === null) {
      return;
    }
    super.disableEditMode();
    this._isDraggable = !this.isEmpty();
    this.div.classList.remove("editing");
    this.canvas.removeEventListener("pointerdown", __privateGet(this, _boundCanvasPointerdown));
  }
  onceAdded() {
    this._isDraggable = !this.isEmpty();
  }
  isEmpty() {
    return this.paths.length === 0 || this.paths.length === 1 && this.paths[0].length === 0;
  }
  commit() {
    if (__privateGet(this, _disableEditing)) {
      return;
    }
    super.commit();
    this.isEditing = false;
    this.disableEditMode();
    this.setInForeground();
    __privateSet(this, _disableEditing, true);
    this.div.classList.add("disabled");
    __privateMethod(this, _InkEditor_instances, fitToContent_fn).call(this, true);
    this.select();
    this.parent.addInkEditorIfNeeded(true);
    this.moveInDOM();
    this.div.focus({
      preventScroll: true
    });
  }
  focusin(event) {
    if (!this._focusEventsAllowed) {
      return;
    }
    super.focusin(event);
    this.enableEditMode();
  }
  canvasPointerdown(event) {
    if (event.button !== 0 || !this.isInEditMode() || __privateGet(this, _disableEditing)) {
      return;
    }
    this.setInForeground();
    event.preventDefault();
    if (!this.div.contains(document.activeElement)) {
      this.div.focus({
        preventScroll: true
      });
    }
    __privateMethod(this, _InkEditor_instances, startDrawing_fn).call(this, event.offsetX, event.offsetY);
  }
  canvasPointermove(event) {
    event.preventDefault();
    __privateMethod(this, _InkEditor_instances, draw_fn).call(this, event.offsetX, event.offsetY);
  }
  canvasPointerup(event) {
    event.preventDefault();
    __privateMethod(this, _InkEditor_instances, endDrawing_fn).call(this, event);
  }
  canvasPointerleave(event) {
    __privateMethod(this, _InkEditor_instances, endDrawing_fn).call(this, event);
  }
  get isResizable() {
    return !this.isEmpty() && __privateGet(this, _disableEditing);
  }
  render() {
    if (this.div) {
      return this.div;
    }
    let baseX, baseY;
    if (this.width) {
      baseX = this.x;
      baseY = this.y;
    }
    super.render();
    this.div.setAttribute("data-l10n-id", "pdfjs-ink");
    const [x2, y2, w2, h] = __privateMethod(this, _InkEditor_instances, getInitialBBox_fn).call(this);
    this.setAt(x2, y2, 0, 0);
    this.setDims(w2, h);
    __privateMethod(this, _InkEditor_instances, createCanvas_fn).call(this);
    if (this.width) {
      const [parentWidth, parentHeight] = this.parentDimensions;
      this.setAspectRatio(this.width * parentWidth, this.height * parentHeight);
      this.setAt(baseX * parentWidth, baseY * parentHeight, this.width * parentWidth, this.height * parentHeight);
      __privateSet(this, _isCanvasInitialized, true);
      __privateMethod(this, _InkEditor_instances, setCanvasDims_fn).call(this);
      this.setDims(this.width * parentWidth, this.height * parentHeight);
      __privateMethod(this, _InkEditor_instances, redraw_fn).call(this);
      this.div.classList.add("disabled");
    } else {
      this.div.classList.add("editing");
      this.enableEditMode();
    }
    __privateMethod(this, _InkEditor_instances, createObserver_fn).call(this);
    return this.div;
  }
  setDimensions(width, height) {
    const roundedWidth = Math.round(width);
    const roundedHeight = Math.round(height);
    if (__privateGet(this, _realWidth) === roundedWidth && __privateGet(this, _realHeight) === roundedHeight) {
      return;
    }
    __privateSet(this, _realWidth, roundedWidth);
    __privateSet(this, _realHeight, roundedHeight);
    this.canvas.style.visibility = "hidden";
    const [parentWidth, parentHeight] = this.parentDimensions;
    this.width = width / parentWidth;
    this.height = height / parentHeight;
    this.fixAndSetPosition();
    if (__privateGet(this, _disableEditing)) {
      __privateMethod(this, _InkEditor_instances, setScaleFactor_fn).call(this, width, height);
    }
    __privateMethod(this, _InkEditor_instances, setCanvasDims_fn).call(this);
    __privateMethod(this, _InkEditor_instances, redraw_fn).call(this);
    this.canvas.style.visibility = "visible";
    this.fixDims();
  }
  static deserialize(data, parent, uiManager) {
    var _a2, _b, _c;
    if (data instanceof InkAnnotationElement) {
      return null;
    }
    const editor = super.deserialize(data, parent, uiManager);
    editor.thickness = data.thickness;
    editor.color = Util.makeHexColor(...data.color);
    editor.opacity = data.opacity;
    const [pageWidth, pageHeight] = editor.pageDimensions;
    const width = editor.width * pageWidth;
    const height = editor.height * pageHeight;
    const scaleFactor = editor.parentScale;
    const padding = data.thickness / 2;
    __privateSet(editor, _disableEditing, true);
    __privateSet(editor, _realWidth, Math.round(width));
    __privateSet(editor, _realHeight, Math.round(height));
    const {
      paths,
      rect,
      rotation
    } = data;
    for (let {
      bezier
    } of paths) {
      bezier = __privateMethod(_a2 = _InkEditor, _InkEditor_static, fromPDFCoordinates_fn).call(_a2, bezier, rect, rotation);
      const path = [];
      editor.paths.push(path);
      let p0 = scaleFactor * (bezier[0] - padding);
      let p1 = scaleFactor * (bezier[1] - padding);
      for (let i2 = 2, ii = bezier.length; i2 < ii; i2 += 6) {
        const p10 = scaleFactor * (bezier[i2] - padding);
        const p11 = scaleFactor * (bezier[i2 + 1] - padding);
        const p20 = scaleFactor * (bezier[i2 + 2] - padding);
        const p21 = scaleFactor * (bezier[i2 + 3] - padding);
        const p30 = scaleFactor * (bezier[i2 + 4] - padding);
        const p31 = scaleFactor * (bezier[i2 + 5] - padding);
        path.push([[p0, p1], [p10, p11], [p20, p21], [p30, p31]]);
        p0 = p30;
        p1 = p31;
      }
      const path2D = __privateMethod(this, _InkEditor_static, buildPath2D_fn).call(this, path);
      editor.bezierPath2D.push(path2D);
    }
    const bbox = __privateMethod(_b = editor, _InkEditor_instances, getBbox_fn).call(_b);
    __privateSet(editor, _baseWidth, Math.max(AnnotationEditor.MIN_SIZE, bbox[2] - bbox[0]));
    __privateSet(editor, _baseHeight, Math.max(AnnotationEditor.MIN_SIZE, bbox[3] - bbox[1]));
    __privateMethod(_c = editor, _InkEditor_instances, setScaleFactor_fn).call(_c, width, height);
    return editor;
  }
  serialize() {
    if (this.isEmpty()) {
      return null;
    }
    const rect = this.getRect(0, 0);
    const color = AnnotationEditor._colorManager.convert(this.ctx.strokeStyle);
    return {
      annotationType: AnnotationEditorType.INK,
      color,
      thickness: this.thickness,
      opacity: this.opacity,
      paths: __privateMethod(this, _InkEditor_instances, serializePaths_fn).call(this, this.scaleFactor / this.parentScale, this.translationX, this.translationY, rect),
      pageIndex: this.pageIndex,
      rect,
      rotation: this.rotation,
      structTreeParentId: this._structTreeParentId
    };
  }
};
_baseHeight = new WeakMap();
_baseWidth = new WeakMap();
_boundCanvasPointermove = new WeakMap();
_boundCanvasPointerleave = new WeakMap();
_boundCanvasPointerup = new WeakMap();
_boundCanvasPointerdown = new WeakMap();
_canvasContextMenuTimeoutId = new WeakMap();
_currentPath2D = new WeakMap();
_disableEditing = new WeakMap();
_hasSomethingToDraw = new WeakMap();
_isCanvasInitialized = new WeakMap();
_observer = new WeakMap();
_realWidth = new WeakMap();
_realHeight = new WeakMap();
_requestFrameCallback = new WeakMap();
_InkEditor_instances = new WeakSet();
updateThickness_fn2 = function(thickness) {
  const setThickness = (th) => {
    this.thickness = th;
    __privateMethod(this, _InkEditor_instances, fitToContent_fn).call(this);
  };
  const savedThickness = this.thickness;
  this.addCommands({
    cmd: setThickness.bind(this, thickness),
    undo: setThickness.bind(this, savedThickness),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: true,
    type: AnnotationEditorParamsType.INK_THICKNESS,
    overwriteIfSameType: true,
    keepUndo: true
  });
};
updateColor_fn3 = function(color) {
  const setColor = (col) => {
    this.color = col;
    __privateMethod(this, _InkEditor_instances, redraw_fn).call(this);
  };
  const savedColor = this.color;
  this.addCommands({
    cmd: setColor.bind(this, color),
    undo: setColor.bind(this, savedColor),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: true,
    type: AnnotationEditorParamsType.INK_COLOR,
    overwriteIfSameType: true,
    keepUndo: true
  });
};
updateOpacity_fn = function(opacity) {
  const setOpacity = (op) => {
    this.opacity = op;
    __privateMethod(this, _InkEditor_instances, redraw_fn).call(this);
  };
  opacity /= 100;
  const savedOpacity = this.opacity;
  this.addCommands({
    cmd: setOpacity.bind(this, opacity),
    undo: setOpacity.bind(this, savedOpacity),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: true,
    type: AnnotationEditorParamsType.INK_OPACITY,
    overwriteIfSameType: true,
    keepUndo: true
  });
};
getInitialBBox_fn = function() {
  const {
    parentRotation,
    parentDimensions: [width, height]
  } = this;
  switch (parentRotation) {
    case 90:
      return [0, height, height, width];
    case 180:
      return [width, height, width, height];
    case 270:
      return [width, 0, height, width];
    default:
      return [0, 0, width, height];
  }
};
setStroke_fn = function() {
  const {
    ctx,
    color,
    opacity,
    thickness,
    parentScale,
    scaleFactor
  } = this;
  ctx.lineWidth = thickness * parentScale / scaleFactor;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.miterLimit = 10;
  ctx.strokeStyle = `${color}${opacityToHex(opacity)}`;
};
startDrawing_fn = function(x2, y2) {
  this.canvas.addEventListener("contextmenu", noContextMenu);
  this.canvas.addEventListener("pointerleave", __privateGet(this, _boundCanvasPointerleave));
  this.canvas.addEventListener("pointermove", __privateGet(this, _boundCanvasPointermove));
  this.canvas.addEventListener("pointerup", __privateGet(this, _boundCanvasPointerup));
  this.canvas.removeEventListener("pointerdown", __privateGet(this, _boundCanvasPointerdown));
  this.isEditing = true;
  if (!__privateGet(this, _isCanvasInitialized)) {
    __privateSet(this, _isCanvasInitialized, true);
    __privateMethod(this, _InkEditor_instances, setCanvasDims_fn).call(this);
    this.thickness || (this.thickness = _InkEditor._defaultThickness);
    this.color || (this.color = _InkEditor._defaultColor || AnnotationEditor._defaultLineColor);
    this.opacity ?? (this.opacity = _InkEditor._defaultOpacity);
  }
  this.currentPath.push([x2, y2]);
  __privateSet(this, _hasSomethingToDraw, false);
  __privateMethod(this, _InkEditor_instances, setStroke_fn).call(this);
  __privateSet(this, _requestFrameCallback, () => {
    __privateMethod(this, _InkEditor_instances, drawPoints_fn).call(this);
    if (__privateGet(this, _requestFrameCallback)) {
      window.requestAnimationFrame(__privateGet(this, _requestFrameCallback));
    }
  });
  window.requestAnimationFrame(__privateGet(this, _requestFrameCallback));
};
draw_fn = function(x2, y2) {
  const [lastX, lastY] = this.currentPath.at(-1);
  if (this.currentPath.length > 1 && x2 === lastX && y2 === lastY) {
    return;
  }
  const currentPath = this.currentPath;
  let path2D = __privateGet(this, _currentPath2D);
  currentPath.push([x2, y2]);
  __privateSet(this, _hasSomethingToDraw, true);
  if (currentPath.length <= 2) {
    path2D.moveTo(...currentPath[0]);
    path2D.lineTo(x2, y2);
    return;
  }
  if (currentPath.length === 3) {
    __privateSet(this, _currentPath2D, path2D = new Path2D());
    path2D.moveTo(...currentPath[0]);
  }
  __privateMethod(this, _InkEditor_instances, makeBezierCurve_fn).call(this, path2D, ...currentPath.at(-3), ...currentPath.at(-2), x2, y2);
};
endPath_fn = function() {
  if (this.currentPath.length === 0) {
    return;
  }
  const lastPoint = this.currentPath.at(-1);
  __privateGet(this, _currentPath2D).lineTo(...lastPoint);
};
stopDrawing_fn = function(x2, y2) {
  __privateSet(this, _requestFrameCallback, null);
  x2 = Math.min(Math.max(x2, 0), this.canvas.width);
  y2 = Math.min(Math.max(y2, 0), this.canvas.height);
  __privateMethod(this, _InkEditor_instances, draw_fn).call(this, x2, y2);
  __privateMethod(this, _InkEditor_instances, endPath_fn).call(this);
  let bezier;
  if (this.currentPath.length !== 1) {
    bezier = __privateMethod(this, _InkEditor_instances, generateBezierPoints_fn).call(this);
  } else {
    const xy = [x2, y2];
    bezier = [[xy, xy.slice(), xy.slice(), xy]];
  }
  const path2D = __privateGet(this, _currentPath2D);
  const currentPath = this.currentPath;
  this.currentPath = [];
  __privateSet(this, _currentPath2D, new Path2D());
  const cmd = () => {
    this.allRawPaths.push(currentPath);
    this.paths.push(bezier);
    this.bezierPath2D.push(path2D);
    this._uiManager.rebuild(this);
  };
  const undo = () => {
    this.allRawPaths.pop();
    this.paths.pop();
    this.bezierPath2D.pop();
    if (this.paths.length === 0) {
      this.remove();
    } else {
      if (!this.canvas) {
        __privateMethod(this, _InkEditor_instances, createCanvas_fn).call(this);
        __privateMethod(this, _InkEditor_instances, createObserver_fn).call(this);
      }
      __privateMethod(this, _InkEditor_instances, fitToContent_fn).call(this);
    }
  };
  this.addCommands({
    cmd,
    undo,
    mustExec: true
  });
};
drawPoints_fn = function() {
  if (!__privateGet(this, _hasSomethingToDraw)) {
    return;
  }
  __privateSet(this, _hasSomethingToDraw, false);
  const thickness = Math.ceil(this.thickness * this.parentScale);
  const lastPoints = this.currentPath.slice(-3);
  const x2 = lastPoints.map((xy) => xy[0]);
  const y2 = lastPoints.map((xy) => xy[1]);
  const xMin = Math.min(...x2) - thickness;
  const xMax = Math.max(...x2) + thickness;
  const yMin = Math.min(...y2) - thickness;
  const yMax = Math.max(...y2) + thickness;
  const {
    ctx
  } = this;
  ctx.save();
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  for (const path of this.bezierPath2D) {
    ctx.stroke(path);
  }
  ctx.stroke(__privateGet(this, _currentPath2D));
  ctx.restore();
};
makeBezierCurve_fn = function(path2D, x0, y0, x1, y1, x2, y2) {
  const prevX = (x0 + x1) / 2;
  const prevY = (y0 + y1) / 2;
  const x3 = (x1 + x2) / 2;
  const y3 = (y1 + y2) / 2;
  path2D.bezierCurveTo(prevX + 2 * (x1 - prevX) / 3, prevY + 2 * (y1 - prevY) / 3, x3 + 2 * (x1 - x3) / 3, y3 + 2 * (y1 - y3) / 3, x3, y3);
};
generateBezierPoints_fn = function() {
  const path = this.currentPath;
  if (path.length <= 2) {
    return [[path[0], path[0], path.at(-1), path.at(-1)]];
  }
  const bezierPoints = [];
  let i2;
  let [x0, y0] = path[0];
  for (i2 = 1; i2 < path.length - 2; i2++) {
    const [x12, y12] = path[i2];
    const [x22, y22] = path[i2 + 1];
    const x3 = (x12 + x22) / 2;
    const y3 = (y12 + y22) / 2;
    const control12 = [x0 + 2 * (x12 - x0) / 3, y0 + 2 * (y12 - y0) / 3];
    const control22 = [x3 + 2 * (x12 - x3) / 3, y3 + 2 * (y12 - y3) / 3];
    bezierPoints.push([[x0, y0], control12, control22, [x3, y3]]);
    [x0, y0] = [x3, y3];
  }
  const [x1, y1] = path[i2];
  const [x2, y2] = path[i2 + 1];
  const control1 = [x0 + 2 * (x1 - x0) / 3, y0 + 2 * (y1 - y0) / 3];
  const control2 = [x2 + 2 * (x1 - x2) / 3, y2 + 2 * (y1 - y2) / 3];
  bezierPoints.push([[x0, y0], control1, control2, [x2, y2]]);
  return bezierPoints;
};
redraw_fn = function() {
  if (this.isEmpty()) {
    __privateMethod(this, _InkEditor_instances, updateTransform_fn).call(this);
    return;
  }
  __privateMethod(this, _InkEditor_instances, setStroke_fn).call(this);
  const {
    canvas,
    ctx
  } = this;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  __privateMethod(this, _InkEditor_instances, updateTransform_fn).call(this);
  for (const path of this.bezierPath2D) {
    ctx.stroke(path);
  }
};
endDrawing_fn = function(event) {
  this.canvas.removeEventListener("pointerleave", __privateGet(this, _boundCanvasPointerleave));
  this.canvas.removeEventListener("pointermove", __privateGet(this, _boundCanvasPointermove));
  this.canvas.removeEventListener("pointerup", __privateGet(this, _boundCanvasPointerup));
  this.canvas.addEventListener("pointerdown", __privateGet(this, _boundCanvasPointerdown));
  if (__privateGet(this, _canvasContextMenuTimeoutId)) {
    clearTimeout(__privateGet(this, _canvasContextMenuTimeoutId));
  }
  __privateSet(this, _canvasContextMenuTimeoutId, setTimeout(() => {
    __privateSet(this, _canvasContextMenuTimeoutId, null);
    this.canvas.removeEventListener("contextmenu", noContextMenu);
  }, 10));
  __privateMethod(this, _InkEditor_instances, stopDrawing_fn).call(this, event.offsetX, event.offsetY);
  this.addToAnnotationStorage();
  this.setInBackground();
};
createCanvas_fn = function() {
  this.canvas = document.createElement("canvas");
  this.canvas.width = this.canvas.height = 0;
  this.canvas.className = "inkEditorCanvas";
  this.canvas.setAttribute("data-l10n-id", "pdfjs-ink-canvas");
  this.div.append(this.canvas);
  this.ctx = this.canvas.getContext("2d");
};
createObserver_fn = function() {
  __privateSet(this, _observer, new ResizeObserver((entries) => {
    const rect = entries[0].contentRect;
    if (rect.width && rect.height) {
      this.setDimensions(rect.width, rect.height);
    }
  }));
  __privateGet(this, _observer).observe(this.div);
};
setCanvasDims_fn = function() {
  if (!__privateGet(this, _isCanvasInitialized)) {
    return;
  }
  const [parentWidth, parentHeight] = this.parentDimensions;
  this.canvas.width = Math.ceil(this.width * parentWidth);
  this.canvas.height = Math.ceil(this.height * parentHeight);
  __privateMethod(this, _InkEditor_instances, updateTransform_fn).call(this);
};
setScaleFactor_fn = function(width, height) {
  const padding = __privateMethod(this, _InkEditor_instances, getPadding_fn).call(this);
  const scaleFactorW = (width - padding) / __privateGet(this, _baseWidth);
  const scaleFactorH = (height - padding) / __privateGet(this, _baseHeight);
  this.scaleFactor = Math.min(scaleFactorW, scaleFactorH);
};
updateTransform_fn = function() {
  const padding = __privateMethod(this, _InkEditor_instances, getPadding_fn).call(this) / 2;
  this.ctx.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, this.translationX * this.scaleFactor + padding, this.translationY * this.scaleFactor + padding);
};
_InkEditor_static = new WeakSet();
buildPath2D_fn = function(bezier) {
  const path2D = new Path2D();
  for (let i2 = 0, ii = bezier.length; i2 < ii; i2++) {
    const [first, control1, control2, second] = bezier[i2];
    if (i2 === 0) {
      path2D.moveTo(...first);
    }
    path2D.bezierCurveTo(control1[0], control1[1], control2[0], control2[1], second[0], second[1]);
  }
  return path2D;
};
toPDFCoordinates_fn = function(points, rect, rotation) {
  const [blX, blY, trX, trY] = rect;
  switch (rotation) {
    case 0:
      for (let i2 = 0, ii = points.length; i2 < ii; i2 += 2) {
        points[i2] += blX;
        points[i2 + 1] = trY - points[i2 + 1];
      }
      break;
    case 90:
      for (let i2 = 0, ii = points.length; i2 < ii; i2 += 2) {
        const x2 = points[i2];
        points[i2] = points[i2 + 1] + blX;
        points[i2 + 1] = x2 + blY;
      }
      break;
    case 180:
      for (let i2 = 0, ii = points.length; i2 < ii; i2 += 2) {
        points[i2] = trX - points[i2];
        points[i2 + 1] += blY;
      }
      break;
    case 270:
      for (let i2 = 0, ii = points.length; i2 < ii; i2 += 2) {
        const x2 = points[i2];
        points[i2] = trX - points[i2 + 1];
        points[i2 + 1] = trY - x2;
      }
      break;
    default:
      throw new Error("Invalid rotation");
  }
  return points;
};
fromPDFCoordinates_fn = function(points, rect, rotation) {
  const [blX, blY, trX, trY] = rect;
  switch (rotation) {
    case 0:
      for (let i2 = 0, ii = points.length; i2 < ii; i2 += 2) {
        points[i2] -= blX;
        points[i2 + 1] = trY - points[i2 + 1];
      }
      break;
    case 90:
      for (let i2 = 0, ii = points.length; i2 < ii; i2 += 2) {
        const x2 = points[i2];
        points[i2] = points[i2 + 1] - blY;
        points[i2 + 1] = x2 - blX;
      }
      break;
    case 180:
      for (let i2 = 0, ii = points.length; i2 < ii; i2 += 2) {
        points[i2] = trX - points[i2];
        points[i2 + 1] -= blY;
      }
      break;
    case 270:
      for (let i2 = 0, ii = points.length; i2 < ii; i2 += 2) {
        const x2 = points[i2];
        points[i2] = trY - points[i2 + 1];
        points[i2 + 1] = trX - x2;
      }
      break;
    default:
      throw new Error("Invalid rotation");
  }
  return points;
};
serializePaths_fn = function(s2, tx, ty, rect) {
  var _a2, _b;
  const paths = [];
  const padding = this.thickness / 2;
  const shiftX = s2 * tx + padding;
  const shiftY = s2 * ty + padding;
  for (const bezier of this.paths) {
    const buffer = [];
    const points = [];
    for (let j2 = 0, jj = bezier.length; j2 < jj; j2++) {
      const [first, control1, control2, second] = bezier[j2];
      if (first[0] === second[0] && first[1] === second[1] && jj === 1) {
        const p0 = s2 * first[0] + shiftX;
        const p1 = s2 * first[1] + shiftY;
        buffer.push(p0, p1);
        points.push(p0, p1);
        break;
      }
      const p10 = s2 * first[0] + shiftX;
      const p11 = s2 * first[1] + shiftY;
      const p20 = s2 * control1[0] + shiftX;
      const p21 = s2 * control1[1] + shiftY;
      const p30 = s2 * control2[0] + shiftX;
      const p31 = s2 * control2[1] + shiftY;
      const p40 = s2 * second[0] + shiftX;
      const p41 = s2 * second[1] + shiftY;
      if (j2 === 0) {
        buffer.push(p10, p11);
        points.push(p10, p11);
      }
      buffer.push(p20, p21, p30, p31, p40, p41);
      points.push(p20, p21);
      if (j2 === jj - 1) {
        points.push(p40, p41);
      }
    }
    paths.push({
      bezier: __privateMethod(_a2 = _InkEditor, _InkEditor_static, toPDFCoordinates_fn).call(_a2, buffer, rect, this.rotation),
      points: __privateMethod(_b = _InkEditor, _InkEditor_static, toPDFCoordinates_fn).call(_b, points, rect, this.rotation)
    });
  }
  return paths;
};
getBbox_fn = function() {
  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;
  for (const path of this.paths) {
    for (const [first, control1, control2, second] of path) {
      const bbox = Util.bezierBoundingBox(...first, ...control1, ...control2, ...second);
      xMin = Math.min(xMin, bbox[0]);
      yMin = Math.min(yMin, bbox[1]);
      xMax = Math.max(xMax, bbox[2]);
      yMax = Math.max(yMax, bbox[3]);
    }
  }
  return [xMin, yMin, xMax, yMax];
};
getPadding_fn = function() {
  return __privateGet(this, _disableEditing) ? Math.ceil(this.thickness * this.parentScale) : 0;
};
fitToContent_fn = function(firstTime = false) {
  if (this.isEmpty()) {
    return;
  }
  if (!__privateGet(this, _disableEditing)) {
    __privateMethod(this, _InkEditor_instances, redraw_fn).call(this);
    return;
  }
  const bbox = __privateMethod(this, _InkEditor_instances, getBbox_fn).call(this);
  const padding = __privateMethod(this, _InkEditor_instances, getPadding_fn).call(this);
  __privateSet(this, _baseWidth, Math.max(AnnotationEditor.MIN_SIZE, bbox[2] - bbox[0]));
  __privateSet(this, _baseHeight, Math.max(AnnotationEditor.MIN_SIZE, bbox[3] - bbox[1]));
  const width = Math.ceil(padding + __privateGet(this, _baseWidth) * this.scaleFactor);
  const height = Math.ceil(padding + __privateGet(this, _baseHeight) * this.scaleFactor);
  const [parentWidth, parentHeight] = this.parentDimensions;
  this.width = width / parentWidth;
  this.height = height / parentHeight;
  this.setAspectRatio(width, height);
  const prevTranslationX = this.translationX;
  const prevTranslationY = this.translationY;
  this.translationX = -bbox[0];
  this.translationY = -bbox[1];
  __privateMethod(this, _InkEditor_instances, setCanvasDims_fn).call(this);
  __privateMethod(this, _InkEditor_instances, redraw_fn).call(this);
  __privateSet(this, _realWidth, width);
  __privateSet(this, _realHeight, height);
  this.setDims(width, height);
  const unscaledPadding = firstTime ? padding / this.scaleFactor / 2 : 0;
  this.translate(prevTranslationX - this.translationX - unscaledPadding, prevTranslationY - this.translationY - unscaledPadding);
};
__privateAdd(_InkEditor, _InkEditor_static);
__publicField(_InkEditor, "_defaultColor", null);
__publicField(_InkEditor, "_defaultOpacity", 1);
__publicField(_InkEditor, "_defaultThickness", 1);
__publicField(_InkEditor, "_type", "ink");
__publicField(_InkEditor, "_editorType", AnnotationEditorType.INK);
var InkEditor = _InkEditor;
var _bitmap, _bitmapId, _bitmapPromise, _bitmapUrl, _bitmapFile, _bitmapFileName, _canvas, _observer2, _resizeTimeoutId, _isSvg, _hasBeenAddedInUndoStack, _StampEditor_instances, getBitmapFetched_fn, getBitmapDone_fn, getBitmap_fn, createCanvas_fn2, setDimensions_fn, scaleBitmap_fn, drawBitmap_fn, serializeBitmap_fn, createObserver_fn2;
var _StampEditor = class _StampEditor extends AnnotationEditor {
  constructor(params) {
    super({
      ...params,
      name: "stampEditor"
    });
    __privateAdd(this, _StampEditor_instances);
    __privateAdd(this, _bitmap, null);
    __privateAdd(this, _bitmapId, null);
    __privateAdd(this, _bitmapPromise, null);
    __privateAdd(this, _bitmapUrl, null);
    __privateAdd(this, _bitmapFile, null);
    __privateAdd(this, _bitmapFileName, "");
    __privateAdd(this, _canvas, null);
    __privateAdd(this, _observer2, null);
    __privateAdd(this, _resizeTimeoutId, null);
    __privateAdd(this, _isSvg, false);
    __privateAdd(this, _hasBeenAddedInUndoStack, false);
    __privateSet(this, _bitmapUrl, params.bitmapUrl);
    __privateSet(this, _bitmapFile, params.bitmapFile);
  }
  static initialize(l10n, uiManager) {
    AnnotationEditor.initialize(l10n, uiManager);
  }
  static get supportedTypes() {
    const types = ["apng", "avif", "bmp", "gif", "jpeg", "png", "svg+xml", "webp", "x-icon"];
    return shadow(this, "supportedTypes", types.map((type) => `image/${type}`));
  }
  static get supportedTypesStr() {
    return shadow(this, "supportedTypesStr", this.supportedTypes.join(","));
  }
  static isHandlingMimeForPasting(mime) {
    return this.supportedTypes.includes(mime);
  }
  static paste(item, parent) {
    parent.pasteEditor(AnnotationEditorType.STAMP, {
      bitmapFile: item.getAsFile()
    });
  }
  remove() {
    var _a2, _b;
    if (__privateGet(this, _bitmapId)) {
      __privateSet(this, _bitmap, null);
      this._uiManager.imageManager.deleteId(__privateGet(this, _bitmapId));
      (_a2 = __privateGet(this, _canvas)) == null ? void 0 : _a2.remove();
      __privateSet(this, _canvas, null);
      (_b = __privateGet(this, _observer2)) == null ? void 0 : _b.disconnect();
      __privateSet(this, _observer2, null);
      if (__privateGet(this, _resizeTimeoutId)) {
        clearTimeout(__privateGet(this, _resizeTimeoutId));
        __privateSet(this, _resizeTimeoutId, null);
      }
    }
    super.remove();
  }
  rebuild() {
    if (!this.parent) {
      if (__privateGet(this, _bitmapId)) {
        __privateMethod(this, _StampEditor_instances, getBitmap_fn).call(this);
      }
      return;
    }
    super.rebuild();
    if (this.div === null) {
      return;
    }
    if (__privateGet(this, _bitmapId) && __privateGet(this, _canvas) === null) {
      __privateMethod(this, _StampEditor_instances, getBitmap_fn).call(this);
    }
    if (!this.isAttachedToDOM) {
      this.parent.add(this);
    }
  }
  onceAdded() {
    this._isDraggable = true;
    this.div.focus();
  }
  isEmpty() {
    return !(__privateGet(this, _bitmapPromise) || __privateGet(this, _bitmap) || __privateGet(this, _bitmapUrl) || __privateGet(this, _bitmapFile) || __privateGet(this, _bitmapId));
  }
  get isResizable() {
    return true;
  }
  render() {
    if (this.div) {
      return this.div;
    }
    let baseX, baseY;
    if (this.width) {
      baseX = this.x;
      baseY = this.y;
    }
    super.render();
    this.div.hidden = true;
    this.addAltTextButton();
    if (__privateGet(this, _bitmap)) {
      __privateMethod(this, _StampEditor_instances, createCanvas_fn2).call(this);
    } else {
      __privateMethod(this, _StampEditor_instances, getBitmap_fn).call(this);
    }
    if (this.width) {
      const [parentWidth, parentHeight] = this.parentDimensions;
      this.setAt(baseX * parentWidth, baseY * parentHeight, this.width * parentWidth, this.height * parentHeight);
    }
    return this.div;
  }
  getImageForAltText() {
    return __privateGet(this, _canvas);
  }
  static deserialize(data, parent, uiManager) {
    if (data instanceof StampAnnotationElement) {
      return null;
    }
    const editor = super.deserialize(data, parent, uiManager);
    const {
      rect,
      bitmapUrl,
      bitmapId,
      isSvg,
      accessibilityData
    } = data;
    if (bitmapId && uiManager.imageManager.isValidId(bitmapId)) {
      __privateSet(editor, _bitmapId, bitmapId);
    } else {
      __privateSet(editor, _bitmapUrl, bitmapUrl);
    }
    __privateSet(editor, _isSvg, isSvg);
    const [parentWidth, parentHeight] = editor.pageDimensions;
    editor.width = (rect[2] - rect[0]) / parentWidth;
    editor.height = (rect[3] - rect[1]) / parentHeight;
    if (accessibilityData) {
      editor.altTextData = accessibilityData;
    }
    return editor;
  }
  serialize(isForCopying = false, context = null) {
    if (this.isEmpty()) {
      return null;
    }
    const serialized = {
      annotationType: AnnotationEditorType.STAMP,
      bitmapId: __privateGet(this, _bitmapId),
      pageIndex: this.pageIndex,
      rect: this.getRect(0, 0),
      rotation: this.rotation,
      isSvg: __privateGet(this, _isSvg),
      structTreeParentId: this._structTreeParentId
    };
    if (isForCopying) {
      serialized.bitmapUrl = __privateMethod(this, _StampEditor_instances, serializeBitmap_fn).call(this, true);
      serialized.accessibilityData = this.altTextData;
      return serialized;
    }
    const {
      decorative,
      altText
    } = this.altTextData;
    if (!decorative && altText) {
      serialized.accessibilityData = {
        type: "Figure",
        alt: altText
      };
    }
    if (context === null) {
      return serialized;
    }
    context.stamps || (context.stamps = /* @__PURE__ */ new Map());
    const area = __privateGet(this, _isSvg) ? (serialized.rect[2] - serialized.rect[0]) * (serialized.rect[3] - serialized.rect[1]) : null;
    if (!context.stamps.has(__privateGet(this, _bitmapId))) {
      context.stamps.set(__privateGet(this, _bitmapId), {
        area,
        serialized
      });
      serialized.bitmap = __privateMethod(this, _StampEditor_instances, serializeBitmap_fn).call(this, false);
    } else if (__privateGet(this, _isSvg)) {
      const prevData = context.stamps.get(__privateGet(this, _bitmapId));
      if (area > prevData.area) {
        prevData.area = area;
        prevData.serialized.bitmap.close();
        prevData.serialized.bitmap = __privateMethod(this, _StampEditor_instances, serializeBitmap_fn).call(this, false);
      }
    }
    return serialized;
  }
};
_bitmap = new WeakMap();
_bitmapId = new WeakMap();
_bitmapPromise = new WeakMap();
_bitmapUrl = new WeakMap();
_bitmapFile = new WeakMap();
_bitmapFileName = new WeakMap();
_canvas = new WeakMap();
_observer2 = new WeakMap();
_resizeTimeoutId = new WeakMap();
_isSvg = new WeakMap();
_hasBeenAddedInUndoStack = new WeakMap();
_StampEditor_instances = new WeakSet();
getBitmapFetched_fn = function(data, fromId = false) {
  if (!data) {
    this.remove();
    return;
  }
  __privateSet(this, _bitmap, data.bitmap);
  if (!fromId) {
    __privateSet(this, _bitmapId, data.id);
    __privateSet(this, _isSvg, data.isSvg);
  }
  if (data.file) {
    __privateSet(this, _bitmapFileName, data.file.name);
  }
  __privateMethod(this, _StampEditor_instances, createCanvas_fn2).call(this);
};
getBitmapDone_fn = function() {
  __privateSet(this, _bitmapPromise, null);
  this._uiManager.enableWaiting(false);
  if (__privateGet(this, _canvas)) {
    this.div.focus();
  }
};
getBitmap_fn = function() {
  if (__privateGet(this, _bitmapId)) {
    this._uiManager.enableWaiting(true);
    this._uiManager.imageManager.getFromId(__privateGet(this, _bitmapId)).then((data) => __privateMethod(this, _StampEditor_instances, getBitmapFetched_fn).call(this, data, true)).finally(() => __privateMethod(this, _StampEditor_instances, getBitmapDone_fn).call(this));
    return;
  }
  if (__privateGet(this, _bitmapUrl)) {
    const url = __privateGet(this, _bitmapUrl);
    __privateSet(this, _bitmapUrl, null);
    this._uiManager.enableWaiting(true);
    __privateSet(this, _bitmapPromise, this._uiManager.imageManager.getFromUrl(url).then((data) => __privateMethod(this, _StampEditor_instances, getBitmapFetched_fn).call(this, data)).finally(() => __privateMethod(this, _StampEditor_instances, getBitmapDone_fn).call(this)));
    return;
  }
  if (__privateGet(this, _bitmapFile)) {
    const file = __privateGet(this, _bitmapFile);
    __privateSet(this, _bitmapFile, null);
    this._uiManager.enableWaiting(true);
    __privateSet(this, _bitmapPromise, this._uiManager.imageManager.getFromFile(file).then((data) => __privateMethod(this, _StampEditor_instances, getBitmapFetched_fn).call(this, data)).finally(() => __privateMethod(this, _StampEditor_instances, getBitmapDone_fn).call(this)));
    return;
  }
  const input = document.createElement("input");
  input.type = "file";
  input.accept = _StampEditor.supportedTypesStr;
  __privateSet(this, _bitmapPromise, new Promise((resolve) => {
    input.addEventListener("change", async () => {
      if (!input.files || input.files.length === 0) {
        this.remove();
      } else {
        this._uiManager.enableWaiting(true);
        const data = await this._uiManager.imageManager.getFromFile(input.files[0]);
        __privateMethod(this, _StampEditor_instances, getBitmapFetched_fn).call(this, data);
      }
      resolve();
    });
    input.addEventListener("cancel", () => {
      this.remove();
      resolve();
    });
  }).finally(() => __privateMethod(this, _StampEditor_instances, getBitmapDone_fn).call(this)));
  input.click();
};
createCanvas_fn2 = function() {
  const {
    div
  } = this;
  let {
    width,
    height
  } = __privateGet(this, _bitmap);
  const [pageWidth, pageHeight] = this.pageDimensions;
  const MAX_RATIO = 0.75;
  if (this.width) {
    width = this.width * pageWidth;
    height = this.height * pageHeight;
  } else if (width > MAX_RATIO * pageWidth || height > MAX_RATIO * pageHeight) {
    const factor = Math.min(MAX_RATIO * pageWidth / width, MAX_RATIO * pageHeight / height);
    width *= factor;
    height *= factor;
  }
  const [parentWidth, parentHeight] = this.parentDimensions;
  this.setDims(width * parentWidth / pageWidth, height * parentHeight / pageHeight);
  this._uiManager.enableWaiting(false);
  const canvas = __privateSet(this, _canvas, document.createElement("canvas"));
  div.append(canvas);
  div.hidden = false;
  __privateMethod(this, _StampEditor_instances, drawBitmap_fn).call(this, width, height);
  __privateMethod(this, _StampEditor_instances, createObserver_fn2).call(this);
  if (!__privateGet(this, _hasBeenAddedInUndoStack)) {
    this.parent.addUndoableEditor(this);
    __privateSet(this, _hasBeenAddedInUndoStack, true);
  }
  this._reportTelemetry({
    action: "inserted_image"
  });
  if (__privateGet(this, _bitmapFileName)) {
    canvas.setAttribute("aria-label", __privateGet(this, _bitmapFileName));
  }
};
setDimensions_fn = function(width, height) {
  var _a2;
  const [parentWidth, parentHeight] = this.parentDimensions;
  this.width = width / parentWidth;
  this.height = height / parentHeight;
  this.setDims(width, height);
  if ((_a2 = this._initialOptions) == null ? void 0 : _a2.isCentered) {
    this.center();
  } else {
    this.fixAndSetPosition();
  }
  this._initialOptions = null;
  if (__privateGet(this, _resizeTimeoutId) !== null) {
    clearTimeout(__privateGet(this, _resizeTimeoutId));
  }
  const TIME_TO_WAIT = 200;
  __privateSet(this, _resizeTimeoutId, setTimeout(() => {
    __privateSet(this, _resizeTimeoutId, null);
    __privateMethod(this, _StampEditor_instances, drawBitmap_fn).call(this, width, height);
  }, TIME_TO_WAIT));
};
scaleBitmap_fn = function(width, height) {
  const {
    width: bitmapWidth,
    height: bitmapHeight
  } = __privateGet(this, _bitmap);
  let newWidth = bitmapWidth;
  let newHeight = bitmapHeight;
  let bitmap = __privateGet(this, _bitmap);
  while (newWidth > 2 * width || newHeight > 2 * height) {
    const prevWidth = newWidth;
    const prevHeight = newHeight;
    if (newWidth > 2 * width) {
      newWidth = newWidth >= 16384 ? Math.floor(newWidth / 2) - 1 : Math.ceil(newWidth / 2);
    }
    if (newHeight > 2 * height) {
      newHeight = newHeight >= 16384 ? Math.floor(newHeight / 2) - 1 : Math.ceil(newHeight / 2);
    }
    const offscreen = new OffscreenCanvas(newWidth, newHeight);
    const ctx = offscreen.getContext("2d");
    ctx.drawImage(bitmap, 0, 0, prevWidth, prevHeight, 0, 0, newWidth, newHeight);
    bitmap = offscreen.transferToImageBitmap();
  }
  return bitmap;
};
drawBitmap_fn = function(width, height) {
  width = Math.ceil(width);
  height = Math.ceil(height);
  const canvas = __privateGet(this, _canvas);
  if (!canvas || canvas.width === width && canvas.height === height) {
    return;
  }
  canvas.width = width;
  canvas.height = height;
  const bitmap = __privateGet(this, _isSvg) ? __privateGet(this, _bitmap) : __privateMethod(this, _StampEditor_instances, scaleBitmap_fn).call(this, width, height);
  if (this._uiManager.hasMLManager && !this.hasAltText()) {
    const offscreen = new OffscreenCanvas(width, height);
    const ctx2 = offscreen.getContext("2d");
    ctx2.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, width, height);
    this._uiManager.mlGuess({
      service: "image-to-text",
      request: {
        data: ctx2.getImageData(0, 0, width, height).data,
        width,
        height,
        channels: 4
      }
    }).then((response) => {
      const altText = (response == null ? void 0 : response.output) || "";
      if (this.parent && altText && !this.hasAltText()) {
        this.altTextData = {
          altText,
          decorative: false
        };
      }
    });
  }
  const ctx = canvas.getContext("2d");
  ctx.filter = this._uiManager.hcmFilter;
  ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, width, height);
};
serializeBitmap_fn = function(toUrl) {
  if (toUrl) {
    if (__privateGet(this, _isSvg)) {
      const url = this._uiManager.imageManager.getSvgUrl(__privateGet(this, _bitmapId));
      if (url) {
        return url;
      }
    }
    const canvas = document.createElement("canvas");
    ({
      width: canvas.width,
      height: canvas.height
    } = __privateGet(this, _bitmap));
    const ctx = canvas.getContext("2d");
    ctx.drawImage(__privateGet(this, _bitmap), 0, 0);
    return canvas.toDataURL();
  }
  if (__privateGet(this, _isSvg)) {
    const [pageWidth, pageHeight] = this.pageDimensions;
    const width = Math.round(this.width * pageWidth * PixelsPerInch.PDF_TO_CSS_UNITS);
    const height = Math.round(this.height * pageHeight * PixelsPerInch.PDF_TO_CSS_UNITS);
    const offscreen = new OffscreenCanvas(width, height);
    const ctx = offscreen.getContext("2d");
    ctx.drawImage(__privateGet(this, _bitmap), 0, 0, __privateGet(this, _bitmap).width, __privateGet(this, _bitmap).height, 0, 0, width, height);
    return offscreen.transferToImageBitmap();
  }
  return structuredClone(__privateGet(this, _bitmap));
};
createObserver_fn2 = function() {
  __privateSet(this, _observer2, new ResizeObserver((entries) => {
    const rect = entries[0].contentRect;
    if (rect.width && rect.height) {
      __privateMethod(this, _StampEditor_instances, setDimensions_fn).call(this, rect.width, rect.height);
    }
  }));
  __privateGet(this, _observer2).observe(this.div);
};
__publicField(_StampEditor, "_type", "stamp");
__publicField(_StampEditor, "_editorType", AnnotationEditorType.STAMP);
var StampEditor = _StampEditor;
var _accessibilityManager2, _allowClick, _annotationLayer, _boundPointerup, _boundPointerdown, _boundTextLayerPointerDown, _editorFocusTimeoutId, _editors, _hadPointerDown, _isCleaningUp, _isDisabling, _textLayer, _uiManager3, _editorTypes2, _AnnotationEditorLayer_instances, textLayerPointerDown_fn, currentEditorType_get, createNewEditor_fn, getCenterPoint_fn, cleanup_fn;
var _AnnotationEditorLayer = class _AnnotationEditorLayer {
  constructor({
    uiManager,
    pageIndex,
    div,
    accessibilityManager,
    annotationLayer,
    drawLayer,
    textLayer,
    viewport,
    l10n
  }) {
    __privateAdd(this, _AnnotationEditorLayer_instances);
    __privateAdd(this, _accessibilityManager2);
    __privateAdd(this, _allowClick, false);
    __privateAdd(this, _annotationLayer, null);
    __privateAdd(this, _boundPointerup, null);
    __privateAdd(this, _boundPointerdown, null);
    __privateAdd(this, _boundTextLayerPointerDown, null);
    __privateAdd(this, _editorFocusTimeoutId, null);
    __privateAdd(this, _editors, /* @__PURE__ */ new Map());
    __privateAdd(this, _hadPointerDown, false);
    __privateAdd(this, _isCleaningUp, false);
    __privateAdd(this, _isDisabling, false);
    __privateAdd(this, _textLayer, null);
    __privateAdd(this, _uiManager3);
    const editorTypes = [...__privateGet(_AnnotationEditorLayer, _editorTypes2).values()];
    if (!_AnnotationEditorLayer._initialized) {
      _AnnotationEditorLayer._initialized = true;
      for (const editorType of editorTypes) {
        editorType.initialize(l10n, uiManager);
      }
    }
    uiManager.registerEditorTypes(editorTypes);
    __privateSet(this, _uiManager3, uiManager);
    this.pageIndex = pageIndex;
    this.div = div;
    __privateSet(this, _accessibilityManager2, accessibilityManager);
    __privateSet(this, _annotationLayer, annotationLayer);
    this.viewport = viewport;
    __privateSet(this, _textLayer, textLayer);
    this.drawLayer = drawLayer;
    __privateGet(this, _uiManager3).addLayer(this);
  }
  get isEmpty() {
    return __privateGet(this, _editors).size === 0;
  }
  get isInvisible() {
    return this.isEmpty && __privateGet(this, _uiManager3).getMode() === AnnotationEditorType.NONE;
  }
  updateToolbar(mode) {
    __privateGet(this, _uiManager3).updateToolbar(mode);
  }
  updateMode(mode = __privateGet(this, _uiManager3).getMode()) {
    __privateMethod(this, _AnnotationEditorLayer_instances, cleanup_fn).call(this);
    switch (mode) {
      case AnnotationEditorType.NONE:
        this.disableTextSelection();
        this.togglePointerEvents(false);
        this.toggleAnnotationLayerPointerEvents(true);
        this.disableClick();
        return;
      case AnnotationEditorType.INK:
        this.addInkEditorIfNeeded(false);
        this.disableTextSelection();
        this.togglePointerEvents(true);
        this.disableClick();
        break;
      case AnnotationEditorType.HIGHLIGHT:
        this.enableTextSelection();
        this.togglePointerEvents(false);
        this.disableClick();
        break;
      default:
        this.disableTextSelection();
        this.togglePointerEvents(true);
        this.enableClick();
    }
    this.toggleAnnotationLayerPointerEvents(false);
    const {
      classList
    } = this.div;
    for (const editorType of __privateGet(_AnnotationEditorLayer, _editorTypes2).values()) {
      classList.toggle(`${editorType._type}Editing`, mode === editorType._editorType);
    }
    this.div.hidden = false;
  }
  hasTextLayer(textLayer) {
    var _a2;
    return textLayer === ((_a2 = __privateGet(this, _textLayer)) == null ? void 0 : _a2.div);
  }
  addInkEditorIfNeeded(isCommitting) {
    if (__privateGet(this, _uiManager3).getMode() !== AnnotationEditorType.INK) {
      return;
    }
    if (!isCommitting) {
      for (const editor2 of __privateGet(this, _editors).values()) {
        if (editor2.isEmpty()) {
          editor2.setInBackground();
          return;
        }
      }
    }
    const editor = this.createAndAddNewEditor({
      offsetX: 0,
      offsetY: 0
    }, false);
    editor.setInBackground();
  }
  setEditingState(isEditing) {
    __privateGet(this, _uiManager3).setEditingState(isEditing);
  }
  addCommands(params) {
    __privateGet(this, _uiManager3).addCommands(params);
  }
  togglePointerEvents(enabled = false) {
    this.div.classList.toggle("disabled", !enabled);
  }
  toggleAnnotationLayerPointerEvents(enabled = false) {
    var _a2;
    (_a2 = __privateGet(this, _annotationLayer)) == null ? void 0 : _a2.div.classList.toggle("disabled", !enabled);
  }
  enable() {
    this.div.tabIndex = 0;
    this.togglePointerEvents(true);
    const annotationElementIds = /* @__PURE__ */ new Set();
    for (const editor of __privateGet(this, _editors).values()) {
      editor.enableEditing();
      editor.show(true);
      if (editor.annotationElementId) {
        __privateGet(this, _uiManager3).removeChangedExistingAnnotation(editor);
        annotationElementIds.add(editor.annotationElementId);
      }
    }
    if (!__privateGet(this, _annotationLayer)) {
      return;
    }
    const editables = __privateGet(this, _annotationLayer).getEditableAnnotations();
    for (const editable of editables) {
      editable.hide();
      if (__privateGet(this, _uiManager3).isDeletedAnnotationElement(editable.data.id)) {
        continue;
      }
      if (annotationElementIds.has(editable.data.id)) {
        continue;
      }
      const editor = this.deserialize(editable);
      if (!editor) {
        continue;
      }
      this.addOrRebuild(editor);
      editor.enableEditing();
    }
  }
  disable() {
    var _a2;
    __privateSet(this, _isDisabling, true);
    this.div.tabIndex = -1;
    this.togglePointerEvents(false);
    const changedAnnotations = /* @__PURE__ */ new Map();
    const resetAnnotations = /* @__PURE__ */ new Map();
    for (const editor of __privateGet(this, _editors).values()) {
      editor.disableEditing();
      if (!editor.annotationElementId) {
        continue;
      }
      if (editor.serialize() !== null) {
        changedAnnotations.set(editor.annotationElementId, editor);
        continue;
      } else {
        resetAnnotations.set(editor.annotationElementId, editor);
      }
      (_a2 = this.getEditableAnnotation(editor.annotationElementId)) == null ? void 0 : _a2.show();
      editor.remove();
    }
    if (__privateGet(this, _annotationLayer)) {
      const editables = __privateGet(this, _annotationLayer).getEditableAnnotations();
      for (const editable of editables) {
        const {
          id
        } = editable.data;
        if (__privateGet(this, _uiManager3).isDeletedAnnotationElement(id)) {
          continue;
        }
        let editor = resetAnnotations.get(id);
        if (editor) {
          editor.resetAnnotationElement(editable);
          editor.show(false);
          editable.show();
          continue;
        }
        editor = changedAnnotations.get(id);
        if (editor) {
          __privateGet(this, _uiManager3).addChangedExistingAnnotation(editor);
          editor.renderAnnotationElement(editable);
          editor.show(false);
        }
        editable.show();
      }
    }
    __privateMethod(this, _AnnotationEditorLayer_instances, cleanup_fn).call(this);
    if (this.isEmpty) {
      this.div.hidden = true;
    }
    const {
      classList
    } = this.div;
    for (const editorType of __privateGet(_AnnotationEditorLayer, _editorTypes2).values()) {
      classList.remove(`${editorType._type}Editing`);
    }
    this.disableTextSelection();
    this.toggleAnnotationLayerPointerEvents(true);
    __privateSet(this, _isDisabling, false);
  }
  getEditableAnnotation(id) {
    var _a2;
    return ((_a2 = __privateGet(this, _annotationLayer)) == null ? void 0 : _a2.getEditableAnnotation(id)) || null;
  }
  setActiveEditor(editor) {
    const currentActive = __privateGet(this, _uiManager3).getActive();
    if (currentActive === editor) {
      return;
    }
    __privateGet(this, _uiManager3).setActiveEditor(editor);
  }
  enableTextSelection() {
    var _a2;
    this.div.tabIndex = -1;
    if (((_a2 = __privateGet(this, _textLayer)) == null ? void 0 : _a2.div) && !__privateGet(this, _boundTextLayerPointerDown)) {
      __privateSet(this, _boundTextLayerPointerDown, __privateMethod(this, _AnnotationEditorLayer_instances, textLayerPointerDown_fn).bind(this));
      __privateGet(this, _textLayer).div.addEventListener("pointerdown", __privateGet(this, _boundTextLayerPointerDown));
      __privateGet(this, _textLayer).div.classList.add("highlighting");
    }
  }
  disableTextSelection() {
    var _a2;
    this.div.tabIndex = 0;
    if (((_a2 = __privateGet(this, _textLayer)) == null ? void 0 : _a2.div) && __privateGet(this, _boundTextLayerPointerDown)) {
      __privateGet(this, _textLayer).div.removeEventListener("pointerdown", __privateGet(this, _boundTextLayerPointerDown));
      __privateSet(this, _boundTextLayerPointerDown, null);
      __privateGet(this, _textLayer).div.classList.remove("highlighting");
    }
  }
  enableClick() {
    if (__privateGet(this, _boundPointerdown)) {
      return;
    }
    __privateSet(this, _boundPointerdown, this.pointerdown.bind(this));
    __privateSet(this, _boundPointerup, this.pointerup.bind(this));
    this.div.addEventListener("pointerdown", __privateGet(this, _boundPointerdown));
    this.div.addEventListener("pointerup", __privateGet(this, _boundPointerup));
  }
  disableClick() {
    if (!__privateGet(this, _boundPointerdown)) {
      return;
    }
    this.div.removeEventListener("pointerdown", __privateGet(this, _boundPointerdown));
    this.div.removeEventListener("pointerup", __privateGet(this, _boundPointerup));
    __privateSet(this, _boundPointerdown, null);
    __privateSet(this, _boundPointerup, null);
  }
  attach(editor) {
    __privateGet(this, _editors).set(editor.id, editor);
    const {
      annotationElementId
    } = editor;
    if (annotationElementId && __privateGet(this, _uiManager3).isDeletedAnnotationElement(annotationElementId)) {
      __privateGet(this, _uiManager3).removeDeletedAnnotationElement(editor);
    }
  }
  detach(editor) {
    var _a2;
    __privateGet(this, _editors).delete(editor.id);
    (_a2 = __privateGet(this, _accessibilityManager2)) == null ? void 0 : _a2.removePointerInTextLayer(editor.contentDiv);
    if (!__privateGet(this, _isDisabling) && editor.annotationElementId) {
      __privateGet(this, _uiManager3).addDeletedAnnotationElement(editor);
    }
  }
  remove(editor) {
    this.detach(editor);
    __privateGet(this, _uiManager3).removeEditor(editor);
    editor.div.remove();
    editor.isAttachedToDOM = false;
    if (!__privateGet(this, _isCleaningUp)) {
      this.addInkEditorIfNeeded(false);
    }
  }
  changeParent(editor) {
    var _a2;
    if (editor.parent === this) {
      return;
    }
    if (editor.parent && editor.annotationElementId) {
      __privateGet(this, _uiManager3).addDeletedAnnotationElement(editor.annotationElementId);
      AnnotationEditor.deleteAnnotationElement(editor);
      editor.annotationElementId = null;
    }
    this.attach(editor);
    (_a2 = editor.parent) == null ? void 0 : _a2.detach(editor);
    editor.setParent(this);
    if (editor.div && editor.isAttachedToDOM) {
      editor.div.remove();
      this.div.append(editor.div);
    }
  }
  add(editor) {
    if (editor.parent === this && editor.isAttachedToDOM) {
      return;
    }
    this.changeParent(editor);
    __privateGet(this, _uiManager3).addEditor(editor);
    this.attach(editor);
    if (!editor.isAttachedToDOM) {
      const div = editor.render();
      this.div.append(div);
      editor.isAttachedToDOM = true;
    }
    editor.fixAndSetPosition();
    editor.onceAdded();
    __privateGet(this, _uiManager3).addToAnnotationStorage(editor);
    editor._reportTelemetry(editor.telemetryInitialData);
  }
  moveEditorInDOM(editor) {
    var _a2;
    if (!editor.isAttachedToDOM) {
      return;
    }
    const {
      activeElement
    } = document;
    if (editor.div.contains(activeElement) && !__privateGet(this, _editorFocusTimeoutId)) {
      editor._focusEventsAllowed = false;
      __privateSet(this, _editorFocusTimeoutId, setTimeout(() => {
        __privateSet(this, _editorFocusTimeoutId, null);
        if (!editor.div.contains(document.activeElement)) {
          editor.div.addEventListener("focusin", () => {
            editor._focusEventsAllowed = true;
          }, {
            once: true
          });
          activeElement.focus();
        } else {
          editor._focusEventsAllowed = true;
        }
      }, 0));
    }
    editor._structTreeParentId = (_a2 = __privateGet(this, _accessibilityManager2)) == null ? void 0 : _a2.moveElementInDOM(this.div, editor.div, editor.contentDiv, true);
  }
  addOrRebuild(editor) {
    if (editor.needsToBeRebuilt()) {
      editor.parent || (editor.parent = this);
      editor.rebuild();
      editor.show();
    } else {
      this.add(editor);
    }
  }
  addUndoableEditor(editor) {
    const cmd = () => editor._uiManager.rebuild(editor);
    const undo = () => {
      editor.remove();
    };
    this.addCommands({
      cmd,
      undo,
      mustExec: false
    });
  }
  getNextId() {
    return __privateGet(this, _uiManager3).getId();
  }
  canCreateNewEmptyEditor() {
    var _a2;
    return (_a2 = __privateGet(this, _AnnotationEditorLayer_instances, currentEditorType_get)) == null ? void 0 : _a2.canCreateNewEmptyEditor();
  }
  pasteEditor(mode, params) {
    __privateGet(this, _uiManager3).updateToolbar(mode);
    __privateGet(this, _uiManager3).updateMode(mode);
    const {
      offsetX,
      offsetY
    } = __privateMethod(this, _AnnotationEditorLayer_instances, getCenterPoint_fn).call(this);
    const id = this.getNextId();
    const editor = __privateMethod(this, _AnnotationEditorLayer_instances, createNewEditor_fn).call(this, {
      parent: this,
      id,
      x: offsetX,
      y: offsetY,
      uiManager: __privateGet(this, _uiManager3),
      isCentered: true,
      ...params
    });
    if (editor) {
      this.add(editor);
    }
  }
  deserialize(data) {
    var _a2;
    return ((_a2 = __privateGet(_AnnotationEditorLayer, _editorTypes2).get(data.annotationType ?? data.annotationEditorType)) == null ? void 0 : _a2.deserialize(data, this, __privateGet(this, _uiManager3))) || null;
  }
  createAndAddNewEditor(event, isCentered, data = {}) {
    const id = this.getNextId();
    const editor = __privateMethod(this, _AnnotationEditorLayer_instances, createNewEditor_fn).call(this, {
      parent: this,
      id,
      x: event.offsetX,
      y: event.offsetY,
      uiManager: __privateGet(this, _uiManager3),
      isCentered,
      ...data
    });
    if (editor) {
      this.add(editor);
    }
    return editor;
  }
  addNewEditor() {
    this.createAndAddNewEditor(__privateMethod(this, _AnnotationEditorLayer_instances, getCenterPoint_fn).call(this), true);
  }
  setSelected(editor) {
    __privateGet(this, _uiManager3).setSelected(editor);
  }
  toggleSelected(editor) {
    __privateGet(this, _uiManager3).toggleSelected(editor);
  }
  isSelected(editor) {
    return __privateGet(this, _uiManager3).isSelected(editor);
  }
  unselect(editor) {
    __privateGet(this, _uiManager3).unselect(editor);
  }
  pointerup(event) {
    const {
      isMac
    } = util_FeatureTest.platform;
    if (event.button !== 0 || event.ctrlKey && isMac) {
      return;
    }
    if (event.target !== this.div) {
      return;
    }
    if (!__privateGet(this, _hadPointerDown)) {
      return;
    }
    __privateSet(this, _hadPointerDown, false);
    if (!__privateGet(this, _allowClick)) {
      __privateSet(this, _allowClick, true);
      return;
    }
    if (__privateGet(this, _uiManager3).getMode() === AnnotationEditorType.STAMP) {
      __privateGet(this, _uiManager3).unselectAll();
      return;
    }
    this.createAndAddNewEditor(event, false);
  }
  pointerdown(event) {
    if (__privateGet(this, _uiManager3).getMode() === AnnotationEditorType.HIGHLIGHT) {
      this.enableTextSelection();
    }
    if (__privateGet(this, _hadPointerDown)) {
      __privateSet(this, _hadPointerDown, false);
      return;
    }
    const {
      isMac
    } = util_FeatureTest.platform;
    if (event.button !== 0 || event.ctrlKey && isMac) {
      return;
    }
    if (event.target !== this.div) {
      return;
    }
    __privateSet(this, _hadPointerDown, true);
    const editor = __privateGet(this, _uiManager3).getActive();
    __privateSet(this, _allowClick, !editor || editor.isEmpty());
  }
  findNewParent(editor, x2, y2) {
    const layer = __privateGet(this, _uiManager3).findParent(x2, y2);
    if (layer === null || layer === this) {
      return false;
    }
    layer.changeParent(editor);
    return true;
  }
  destroy() {
    var _a2, _b;
    if (((_a2 = __privateGet(this, _uiManager3).getActive()) == null ? void 0 : _a2.parent) === this) {
      __privateGet(this, _uiManager3).commitOrRemove();
      __privateGet(this, _uiManager3).setActiveEditor(null);
    }
    if (__privateGet(this, _editorFocusTimeoutId)) {
      clearTimeout(__privateGet(this, _editorFocusTimeoutId));
      __privateSet(this, _editorFocusTimeoutId, null);
    }
    for (const editor of __privateGet(this, _editors).values()) {
      (_b = __privateGet(this, _accessibilityManager2)) == null ? void 0 : _b.removePointerInTextLayer(editor.contentDiv);
      editor.setParent(null);
      editor.isAttachedToDOM = false;
      editor.div.remove();
    }
    this.div = null;
    __privateGet(this, _editors).clear();
    __privateGet(this, _uiManager3).removeLayer(this);
  }
  render({
    viewport
  }) {
    this.viewport = viewport;
    setLayerDimensions(this.div, viewport);
    for (const editor of __privateGet(this, _uiManager3).getEditors(this.pageIndex)) {
      this.add(editor);
      editor.rebuild();
    }
    this.updateMode();
  }
  update({
    viewport
  }) {
    __privateGet(this, _uiManager3).commitOrRemove();
    __privateMethod(this, _AnnotationEditorLayer_instances, cleanup_fn).call(this);
    const oldRotation = this.viewport.rotation;
    const rotation = viewport.rotation;
    this.viewport = viewport;
    setLayerDimensions(this.div, {
      rotation
    });
    if (oldRotation !== rotation) {
      for (const editor of __privateGet(this, _editors).values()) {
        editor.rotate(rotation);
      }
    }
    this.addInkEditorIfNeeded(false);
  }
  get pageDimensions() {
    const {
      pageWidth,
      pageHeight
    } = this.viewport.rawDims;
    return [pageWidth, pageHeight];
  }
  get scale() {
    return __privateGet(this, _uiManager3).viewParameters.realScale;
  }
};
_accessibilityManager2 = new WeakMap();
_allowClick = new WeakMap();
_annotationLayer = new WeakMap();
_boundPointerup = new WeakMap();
_boundPointerdown = new WeakMap();
_boundTextLayerPointerDown = new WeakMap();
_editorFocusTimeoutId = new WeakMap();
_editors = new WeakMap();
_hadPointerDown = new WeakMap();
_isCleaningUp = new WeakMap();
_isDisabling = new WeakMap();
_textLayer = new WeakMap();
_uiManager3 = new WeakMap();
_editorTypes2 = new WeakMap();
_AnnotationEditorLayer_instances = new WeakSet();
textLayerPointerDown_fn = function(event) {
  __privateGet(this, _uiManager3).unselectAll();
  if (event.target === __privateGet(this, _textLayer).div) {
    const {
      isMac
    } = util_FeatureTest.platform;
    if (event.button !== 0 || event.ctrlKey && isMac) {
      return;
    }
    __privateGet(this, _uiManager3).showAllEditors("highlight", true, true);
    __privateGet(this, _textLayer).div.classList.add("free");
    HighlightEditor.startHighlighting(this, __privateGet(this, _uiManager3).direction === "ltr", event);
    __privateGet(this, _textLayer).div.addEventListener("pointerup", () => {
      __privateGet(this, _textLayer).div.classList.remove("free");
    }, {
      once: true
    });
    event.preventDefault();
  }
};
currentEditorType_get = function() {
  return __privateGet(_AnnotationEditorLayer, _editorTypes2).get(__privateGet(this, _uiManager3).getMode());
};
createNewEditor_fn = function(params) {
  const editorType = __privateGet(this, _AnnotationEditorLayer_instances, currentEditorType_get);
  return editorType ? new editorType.prototype.constructor(params) : null;
};
getCenterPoint_fn = function() {
  const {
    x: x2,
    y: y2,
    width,
    height
  } = this.div.getBoundingClientRect();
  const tlX = Math.max(0, x2);
  const tlY = Math.max(0, y2);
  const brX = Math.min(window.innerWidth, x2 + width);
  const brY = Math.min(window.innerHeight, y2 + height);
  const centerX = (tlX + brX) / 2 - x2;
  const centerY = (tlY + brY) / 2 - y2;
  const [offsetX, offsetY] = this.viewport.rotation % 180 === 0 ? [centerX, centerY] : [centerY, centerX];
  return {
    offsetX,
    offsetY
  };
};
cleanup_fn = function() {
  __privateSet(this, _isCleaningUp, true);
  for (const editor of __privateGet(this, _editors).values()) {
    if (editor.isEmpty()) {
      editor.remove();
    }
  }
  __privateSet(this, _isCleaningUp, false);
};
__publicField(_AnnotationEditorLayer, "_initialized", false);
__privateAdd(_AnnotationEditorLayer, _editorTypes2, new Map([FreeTextEditor, InkEditor, StampEditor, HighlightEditor].map((type) => [type._editorType, type])));
var AnnotationEditorLayer = _AnnotationEditorLayer;
var _parent2, _id5, _mapping, _toUpdate, _DrawLayer_static, setBox_fn, _DrawLayer_instances, createSVG_fn, createClipPath_fn;
var _DrawLayer = class _DrawLayer {
  constructor({
    pageIndex
  }) {
    __privateAdd(this, _DrawLayer_instances);
    __privateAdd(this, _parent2, null);
    __privateAdd(this, _id5, 0);
    __privateAdd(this, _mapping, /* @__PURE__ */ new Map());
    __privateAdd(this, _toUpdate, /* @__PURE__ */ new Map());
    this.pageIndex = pageIndex;
  }
  setParent(parent) {
    if (!__privateGet(this, _parent2)) {
      __privateSet(this, _parent2, parent);
      return;
    }
    if (__privateGet(this, _parent2) !== parent) {
      if (__privateGet(this, _mapping).size > 0) {
        for (const root of __privateGet(this, _mapping).values()) {
          root.remove();
          parent.append(root);
        }
      }
      __privateSet(this, _parent2, parent);
    }
  }
  static get _svgFactory() {
    return shadow(this, "_svgFactory", new DOMSVGFactory());
  }
  highlight(outlines, color, opacity, isPathUpdatable = false) {
    const id = __privateWrapper(this, _id5)._++;
    const root = __privateMethod(this, _DrawLayer_instances, createSVG_fn).call(this, outlines.box);
    root.classList.add("highlight");
    if (outlines.free) {
      root.classList.add("free");
    }
    const defs = _DrawLayer._svgFactory.createElement("defs");
    root.append(defs);
    const path = _DrawLayer._svgFactory.createElement("path");
    defs.append(path);
    const pathId = `path_p${this.pageIndex}_${id}`;
    path.setAttribute("id", pathId);
    path.setAttribute("d", outlines.toSVGPath());
    if (isPathUpdatable) {
      __privateGet(this, _toUpdate).set(id, path);
    }
    const clipPathId = __privateMethod(this, _DrawLayer_instances, createClipPath_fn).call(this, defs, pathId);
    const use = _DrawLayer._svgFactory.createElement("use");
    root.append(use);
    root.setAttribute("fill", color);
    root.setAttribute("fill-opacity", opacity);
    use.setAttribute("href", `#${pathId}`);
    __privateGet(this, _mapping).set(id, root);
    return {
      id,
      clipPathId: `url(#${clipPathId})`
    };
  }
  highlightOutline(outlines) {
    const id = __privateWrapper(this, _id5)._++;
    const root = __privateMethod(this, _DrawLayer_instances, createSVG_fn).call(this, outlines.box);
    root.classList.add("highlightOutline");
    const defs = _DrawLayer._svgFactory.createElement("defs");
    root.append(defs);
    const path = _DrawLayer._svgFactory.createElement("path");
    defs.append(path);
    const pathId = `path_p${this.pageIndex}_${id}`;
    path.setAttribute("id", pathId);
    path.setAttribute("d", outlines.toSVGPath());
    path.setAttribute("vector-effect", "non-scaling-stroke");
    let maskId;
    if (outlines.free) {
      root.classList.add("free");
      const mask = _DrawLayer._svgFactory.createElement("mask");
      defs.append(mask);
      maskId = `mask_p${this.pageIndex}_${id}`;
      mask.setAttribute("id", maskId);
      mask.setAttribute("maskUnits", "objectBoundingBox");
      const rect = _DrawLayer._svgFactory.createElement("rect");
      mask.append(rect);
      rect.setAttribute("width", "1");
      rect.setAttribute("height", "1");
      rect.setAttribute("fill", "white");
      const use = _DrawLayer._svgFactory.createElement("use");
      mask.append(use);
      use.setAttribute("href", `#${pathId}`);
      use.setAttribute("stroke", "none");
      use.setAttribute("fill", "black");
      use.setAttribute("fill-rule", "nonzero");
      use.classList.add("mask");
    }
    const use1 = _DrawLayer._svgFactory.createElement("use");
    root.append(use1);
    use1.setAttribute("href", `#${pathId}`);
    if (maskId) {
      use1.setAttribute("mask", `url(#${maskId})`);
    }
    const use2 = use1.cloneNode();
    root.append(use2);
    use1.classList.add("mainOutline");
    use2.classList.add("secondaryOutline");
    __privateGet(this, _mapping).set(id, root);
    return id;
  }
  finalizeLine(id, line) {
    const path = __privateGet(this, _toUpdate).get(id);
    __privateGet(this, _toUpdate).delete(id);
    this.updateBox(id, line.box);
    path.setAttribute("d", line.toSVGPath());
  }
  updateLine(id, line) {
    const root = __privateGet(this, _mapping).get(id);
    const defs = root.firstChild;
    const path = defs.firstChild;
    path.setAttribute("d", line.toSVGPath());
  }
  removeFreeHighlight(id) {
    this.remove(id);
    __privateGet(this, _toUpdate).delete(id);
  }
  updatePath(id, line) {
    __privateGet(this, _toUpdate).get(id).setAttribute("d", line.toSVGPath());
  }
  updateBox(id, box) {
    var _a2;
    __privateMethod(_a2 = _DrawLayer, _DrawLayer_static, setBox_fn).call(_a2, __privateGet(this, _mapping).get(id), box);
  }
  show(id, visible) {
    __privateGet(this, _mapping).get(id).classList.toggle("hidden", !visible);
  }
  rotate(id, angle) {
    __privateGet(this, _mapping).get(id).setAttribute("data-main-rotation", angle);
  }
  changeColor(id, color) {
    __privateGet(this, _mapping).get(id).setAttribute("fill", color);
  }
  changeOpacity(id, opacity) {
    __privateGet(this, _mapping).get(id).setAttribute("fill-opacity", opacity);
  }
  addClass(id, className) {
    __privateGet(this, _mapping).get(id).classList.add(className);
  }
  removeClass(id, className) {
    __privateGet(this, _mapping).get(id).classList.remove(className);
  }
  remove(id) {
    if (__privateGet(this, _parent2) === null) {
      return;
    }
    __privateGet(this, _mapping).get(id).remove();
    __privateGet(this, _mapping).delete(id);
  }
  destroy() {
    __privateSet(this, _parent2, null);
    for (const root of __privateGet(this, _mapping).values()) {
      root.remove();
    }
    __privateGet(this, _mapping).clear();
  }
};
_parent2 = new WeakMap();
_id5 = new WeakMap();
_mapping = new WeakMap();
_toUpdate = new WeakMap();
_DrawLayer_static = new WeakSet();
setBox_fn = function(element, {
  x: x2 = 0,
  y: y2 = 0,
  width = 1,
  height = 1
} = {}) {
  const {
    style
  } = element;
  style.top = `${100 * y2}%`;
  style.left = `${100 * x2}%`;
  style.width = `${100 * width}%`;
  style.height = `${100 * height}%`;
};
_DrawLayer_instances = new WeakSet();
createSVG_fn = function(box) {
  var _a2;
  const svg = _DrawLayer._svgFactory.create(1, 1, true);
  __privateGet(this, _parent2).append(svg);
  svg.setAttribute("aria-hidden", true);
  __privateMethod(_a2 = _DrawLayer, _DrawLayer_static, setBox_fn).call(_a2, svg, box);
  return svg;
};
createClipPath_fn = function(defs, pathId) {
  const clipPath = _DrawLayer._svgFactory.createElement("clipPath");
  defs.append(clipPath);
  const clipPathId = `clip_${pathId}`;
  clipPath.setAttribute("id", clipPathId);
  clipPath.setAttribute("clipPathUnits", "objectBoundingBox");
  const clipPathUse = _DrawLayer._svgFactory.createElement("use");
  clipPath.append(clipPathUse);
  clipPathUse.setAttribute("href", `#${pathId}`);
  clipPathUse.classList.add("clip");
  return clipPathId;
};
__privateAdd(_DrawLayer, _DrawLayer_static);
var DrawLayer = _DrawLayer;
var __webpack_exports__AbortException = __webpack_exports__.AbortException;
var __webpack_exports__AnnotationEditorLayer = __webpack_exports__.AnnotationEditorLayer;
var __webpack_exports__AnnotationEditorParamsType = __webpack_exports__.AnnotationEditorParamsType;
var __webpack_exports__AnnotationEditorType = __webpack_exports__.AnnotationEditorType;
var __webpack_exports__AnnotationEditorUIManager = __webpack_exports__.AnnotationEditorUIManager;
var __webpack_exports__AnnotationLayer = __webpack_exports__.AnnotationLayer;
var __webpack_exports__AnnotationMode = __webpack_exports__.AnnotationMode;
var __webpack_exports__CMapCompressionType = __webpack_exports__.CMapCompressionType;
var __webpack_exports__ColorPicker = __webpack_exports__.ColorPicker;
var __webpack_exports__DOMSVGFactory = __webpack_exports__.DOMSVGFactory;
var __webpack_exports__DrawLayer = __webpack_exports__.DrawLayer;
var __webpack_exports__FeatureTest = __webpack_exports__.FeatureTest;
var __webpack_exports__GlobalWorkerOptions = __webpack_exports__.GlobalWorkerOptions;
var __webpack_exports__ImageKind = __webpack_exports__.ImageKind;
var __webpack_exports__InvalidPDFException = __webpack_exports__.InvalidPDFException;
var __webpack_exports__MissingPDFException = __webpack_exports__.MissingPDFException;
var __webpack_exports__OPS = __webpack_exports__.OPS;
var __webpack_exports__Outliner = __webpack_exports__.Outliner;
var __webpack_exports__PDFDataRangeTransport = __webpack_exports__.PDFDataRangeTransport;
var __webpack_exports__PDFDateString = __webpack_exports__.PDFDateString;
var __webpack_exports__PDFWorker = __webpack_exports__.PDFWorker;
var __webpack_exports__PasswordResponses = __webpack_exports__.PasswordResponses;
var __webpack_exports__PermissionFlag = __webpack_exports__.PermissionFlag;
var __webpack_exports__PixelsPerInch = __webpack_exports__.PixelsPerInch;
var __webpack_exports__RenderingCancelledException = __webpack_exports__.RenderingCancelledException;
var __webpack_exports__TextLayer = __webpack_exports__.TextLayer;
var __webpack_exports__UnexpectedResponseException = __webpack_exports__.UnexpectedResponseException;
var __webpack_exports__Util = __webpack_exports__.Util;
var __webpack_exports__VerbosityLevel = __webpack_exports__.VerbosityLevel;
var __webpack_exports__XfaLayer = __webpack_exports__.XfaLayer;
var __webpack_exports__build = __webpack_exports__.build;
var __webpack_exports__createValidAbsoluteUrl = __webpack_exports__.createValidAbsoluteUrl;
var __webpack_exports__fetchData = __webpack_exports__.fetchData;
var __webpack_exports__getDocument = __webpack_exports__.getDocument;
var __webpack_exports__getFilenameFromUrl = __webpack_exports__.getFilenameFromUrl;
var __webpack_exports__getPdfFilenameFromUrl = __webpack_exports__.getPdfFilenameFromUrl;
var __webpack_exports__getXfaPageViewport = __webpack_exports__.getXfaPageViewport;
var __webpack_exports__isDataScheme = __webpack_exports__.isDataScheme;
var __webpack_exports__isPdfFile = __webpack_exports__.isPdfFile;
var __webpack_exports__noContextMenu = __webpack_exports__.noContextMenu;
var __webpack_exports__normalizeUnicode = __webpack_exports__.normalizeUnicode;
var __webpack_exports__renderTextLayer = __webpack_exports__.renderTextLayer;
var __webpack_exports__setLayerDimensions = __webpack_exports__.setLayerDimensions;
var __webpack_exports__shadow = __webpack_exports__.shadow;
var __webpack_exports__updateTextLayer = __webpack_exports__.updateTextLayer;
var __webpack_exports__version = __webpack_exports__.version;

// node_modules/react-pdf/dist/esm/Document.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var import_react19 = __toESM(require_react(), 1);

// node_modules/make-event-props/dist/esm/index.js
var __spreadArray2 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i2 = 0, l2 = from.length, ar; i2 < l2; i2++) {
    if (ar || !(i2 in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i2);
      ar[i2] = from[i2];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var clipboardEvents = ["onCopy", "onCut", "onPaste"];
var compositionEvents = [
  "onCompositionEnd",
  "onCompositionStart",
  "onCompositionUpdate"
];
var focusEvents = ["onFocus", "onBlur"];
var formEvents = ["onInput", "onInvalid", "onReset", "onSubmit"];
var imageEvents = ["onLoad", "onError"];
var keyboardEvents = ["onKeyDown", "onKeyPress", "onKeyUp"];
var mediaEvents = [
  "onAbort",
  "onCanPlay",
  "onCanPlayThrough",
  "onDurationChange",
  "onEmptied",
  "onEncrypted",
  "onEnded",
  "onError",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onPause",
  "onPlay",
  "onPlaying",
  "onProgress",
  "onRateChange",
  "onSeeked",
  "onSeeking",
  "onStalled",
  "onSuspend",
  "onTimeUpdate",
  "onVolumeChange",
  "onWaiting"
];
var mouseEvents = [
  "onClick",
  "onContextMenu",
  "onDoubleClick",
  "onMouseDown",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp"
];
var dragEvents = [
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop"
];
var selectionEvents = ["onSelect"];
var touchEvents = ["onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart"];
var pointerEvents = [
  "onPointerDown",
  "onPointerMove",
  "onPointerUp",
  "onPointerCancel",
  "onGotPointerCapture",
  "onLostPointerCapture",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerOver",
  "onPointerOut"
];
var uiEvents = ["onScroll"];
var wheelEvents = ["onWheel"];
var animationEvents = [
  "onAnimationStart",
  "onAnimationEnd",
  "onAnimationIteration"
];
var transitionEvents = ["onTransitionEnd"];
var otherEvents = ["onToggle"];
var changeEvents = ["onChange"];
var allEvents = __spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2(__spreadArray2([], clipboardEvents, true), compositionEvents, true), focusEvents, true), formEvents, true), imageEvents, true), keyboardEvents, true), mediaEvents, true), mouseEvents, true), dragEvents, true), selectionEvents, true), touchEvents, true), pointerEvents, true), uiEvents, true), wheelEvents, true), animationEvents, true), transitionEvents, true), changeEvents, true), otherEvents, true);
function makeEventProps(props, getArgs) {
  var eventProps = {};
  allEvents.forEach(function(eventName) {
    var eventHandler = props[eventName];
    if (!eventHandler) {
      return;
    }
    if (getArgs) {
      eventProps[eventName] = function(event) {
        return eventHandler(event, getArgs(eventName));
      };
    } else {
      eventProps[eventName] = eventHandler;
    }
  });
  return eventProps;
}

// node_modules/make-cancellable-promise/dist/esm/index.js
function makeCancellablePromise(promise) {
  var isCancelled = false;
  var wrappedPromise = new Promise(function(resolve, reject) {
    promise.then(function(value) {
      return !isCancelled && resolve(value);
    }).catch(function(error) {
      return !isCancelled && reject(error);
    });
  });
  return {
    promise: wrappedPromise,
    cancel: function() {
      isCancelled = true;
    }
  };
}

// node_modules/react-pdf/dist/esm/Document.js
var import_warning2 = __toESM(require_warning(), 1);

// node_modules/dequal/dist/index.mjs
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key) {
  for (key of iter.keys()) {
    if (dequal(key, tar)) return key;
  }
}
function dequal(foo, bar) {
  var ctor, len, tmp;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && dequal(foo[len], bar[len])) ;
      }
      return len === -1;
    }
    if (ctor === Set) {
      if (foo.size !== bar.size) {
        return false;
      }
      for (len of foo) {
        tmp = len;
        if (tmp && typeof tmp === "object") {
          tmp = find(bar, tmp);
          if (!tmp) return false;
        }
        if (!bar.has(tmp)) return false;
      }
      return true;
    }
    if (ctor === Map) {
      if (foo.size !== bar.size) {
        return false;
      }
      for (len of foo) {
        tmp = len[0];
        if (tmp && typeof tmp === "object") {
          tmp = find(bar, tmp);
          if (!tmp) return false;
        }
        if (!dequal(len[1], bar.get(tmp))) {
          return false;
        }
      }
      return true;
    }
    if (ctor === ArrayBuffer) {
      foo = new Uint8Array(foo);
      bar = new Uint8Array(bar);
    } else if (ctor === DataView) {
      if ((len = foo.byteLength) === bar.byteLength) {
        while (len-- && foo.getInt8(len) === bar.getInt8(len)) ;
      }
      return len === -1;
    }
    if (ArrayBuffer.isView(foo)) {
      if ((len = foo.byteLength) === bar.byteLength) {
        while (len-- && foo[len] === bar[len]) ;
      }
      return len === -1;
    }
    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}

// node_modules/react-pdf/dist/esm/DocumentContext.js
var import_react17 = __toESM(require_react(), 1);
var DocumentContext_default = (0, import_react17.createContext)(null);

// node_modules/react-pdf/dist/esm/Message.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function Message({ children, type }) {
  return (0, import_jsx_runtime.jsx)("div", { className: `react-pdf__message react-pdf__message--${type}`, children });
}

// node_modules/react-pdf/dist/esm/LinkService.js
var DEFAULT_LINK_REL = "noopener noreferrer nofollow";
var LinkService = class {
  constructor() {
    this.externalLinkEnabled = true;
    this.externalLinkRel = void 0;
    this.externalLinkTarget = void 0;
    this.isInPresentationMode = false;
    this.pdfDocument = void 0;
    this.pdfViewer = void 0;
  }
  setDocument(pdfDocument) {
    this.pdfDocument = pdfDocument;
  }
  setViewer(pdfViewer) {
    this.pdfViewer = pdfViewer;
  }
  setExternalLinkRel(externalLinkRel) {
    this.externalLinkRel = externalLinkRel;
  }
  setExternalLinkTarget(externalLinkTarget) {
    this.externalLinkTarget = externalLinkTarget;
  }
  setHistory() {
  }
  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  }
  get page() {
    invariant(this.pdfViewer, "PDF viewer is not initialized.");
    return this.pdfViewer.currentPageNumber || 0;
  }
  set page(value) {
    invariant(this.pdfViewer, "PDF viewer is not initialized.");
    this.pdfViewer.currentPageNumber = value;
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get rotation() {
    return 0;
  }
  set rotation(value) {
  }
  goToDestination(dest) {
    return new Promise((resolve) => {
      invariant(this.pdfDocument, "PDF document not loaded.");
      invariant(dest, "Destination is not specified.");
      if (typeof dest === "string") {
        this.pdfDocument.getDestination(dest).then(resolve);
      } else if (Array.isArray(dest)) {
        resolve(dest);
      } else {
        dest.then(resolve);
      }
    }).then((explicitDest) => {
      invariant(Array.isArray(explicitDest), `"${explicitDest}" is not a valid destination array.`);
      const destRef = explicitDest[0];
      new Promise((resolve) => {
        invariant(this.pdfDocument, "PDF document not loaded.");
        if (destRef instanceof Object) {
          this.pdfDocument.getPageIndex(destRef).then((pageIndex) => {
            resolve(pageIndex);
          }).catch(() => {
            invariant(false, `"${destRef}" is not a valid page reference.`);
          });
        } else if (typeof destRef === "number") {
          resolve(destRef);
        } else {
          invariant(false, `"${destRef}" is not a valid destination reference.`);
        }
      }).then((pageIndex) => {
        const pageNumber = pageIndex + 1;
        invariant(this.pdfViewer, "PDF viewer is not initialized.");
        invariant(pageNumber >= 1 && pageNumber <= this.pagesCount, `"${pageNumber}" is not a valid page number.`);
        this.pdfViewer.scrollPageIntoView({
          dest: explicitDest,
          pageIndex,
          pageNumber
        });
      });
    });
  }
  navigateTo(dest) {
    this.goToDestination(dest);
  }
  goToPage(pageNumber) {
    const pageIndex = pageNumber - 1;
    invariant(this.pdfViewer, "PDF viewer is not initialized.");
    invariant(pageNumber >= 1 && pageNumber <= this.pagesCount, `"${pageNumber}" is not a valid page number.`);
    this.pdfViewer.scrollPageIntoView({
      pageIndex,
      pageNumber
    });
  }
  addLinkAttributes(link, url, newWindow) {
    link.href = url;
    link.rel = this.externalLinkRel || DEFAULT_LINK_REL;
    link.target = newWindow ? "_blank" : this.externalLinkTarget || "";
  }
  getDestinationHash() {
    return "#";
  }
  getAnchorUrl() {
    return "#";
  }
  setHash() {
  }
  executeNamedAction() {
  }
  cachePageRef() {
  }
  isPageVisible() {
    return true;
  }
  isPageCached() {
    return true;
  }
  executeSetOCGState() {
  }
};

// node_modules/react-pdf/dist/esm/PasswordResponses.js
var PasswordResponses2 = {
  NEED_PASSWORD: 1,
  INCORRECT_PASSWORD: 2
};
var PasswordResponses_default = PasswordResponses2;

// node_modules/react-pdf/dist/esm/shared/utils.js
var import_warning = __toESM(require_warning(), 1);
var isBrowser = typeof document !== "undefined";
var isLocalFileSystem = isBrowser && window.location.protocol === "file:";
function isDefined(variable) {
  return typeof variable !== "undefined";
}
function isProvided(variable) {
  return isDefined(variable) && variable !== null;
}
function isString(variable) {
  return typeof variable === "string";
}
function isArrayBuffer(variable) {
  return variable instanceof ArrayBuffer;
}
function isBlob(variable) {
  invariant(isBrowser, "isBlob can only be used in a browser environment");
  return variable instanceof Blob;
}
function isDataURI(variable) {
  return isString(variable) && /^data:/.test(variable);
}
function dataURItoByteString(dataURI) {
  invariant(isDataURI(dataURI), "Invalid data URI.");
  const [headersString = "", dataString = ""] = dataURI.split(",");
  const headers = headersString.split(";");
  if (headers.indexOf("base64") !== -1) {
    return atob(dataString);
  }
  return unescape(dataString);
}
function getDevicePixelRatio() {
  return isBrowser && window.devicePixelRatio || 1;
}
var allowFileAccessFromFilesTip = "On Chromium based browsers, you can use --allow-file-access-from-files flag for debugging purposes.";
function displayCORSWarning() {
  (0, import_warning.default)(!isLocalFileSystem, `Loading PDF as base64 strings/URLs may not work on protocols other than HTTP/HTTPS. ${allowFileAccessFromFilesTip}`);
}
function displayWorkerWarning() {
  (0, import_warning.default)(!isLocalFileSystem, `Loading PDF.js worker may not work on protocols other than HTTP/HTTPS. ${allowFileAccessFromFilesTip}`);
}
function cancelRunningTask(runningTask) {
  if (runningTask && runningTask.cancel)
    runningTask.cancel();
}
function makePageCallback(page, scale) {
  Object.defineProperty(page, "width", {
    get() {
      return this.view[2] * scale;
    },
    configurable: true
  });
  Object.defineProperty(page, "height", {
    get() {
      return this.view[3] * scale;
    },
    configurable: true
  });
  Object.defineProperty(page, "originalWidth", {
    get() {
      return this.view[2];
    },
    configurable: true
  });
  Object.defineProperty(page, "originalHeight", {
    get() {
      return this.view[3];
    },
    configurable: true
  });
  return page;
}
function isCancelException(error) {
  return error.name === "RenderingCancelledException";
}
function loadFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) {
        return reject(new Error("Error while reading a file."));
      }
      resolve(reader.result);
    };
    reader.onerror = (event) => {
      if (!event.target) {
        return reject(new Error("Error while reading a file."));
      }
      const { error } = event.target;
      if (!error) {
        return reject(new Error("Error while reading a file."));
      }
      switch (error.code) {
        case error.NOT_FOUND_ERR:
          return reject(new Error("Error while reading a file: File not found."));
        case error.SECURITY_ERR:
          return reject(new Error("Error while reading a file: Security error."));
        case error.ABORT_ERR:
          return reject(new Error("Error while reading a file: Aborted."));
        default:
          return reject(new Error("Error while reading a file."));
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

// node_modules/react-pdf/dist/esm/shared/hooks/useResolver.js
var import_react18 = __toESM(require_react(), 1);
function reducer(state, action) {
  switch (action.type) {
    case "RESOLVE":
      return { value: action.value, error: void 0 };
    case "REJECT":
      return { value: false, error: action.error };
    case "RESET":
      return { value: void 0, error: void 0 };
    default:
      return state;
  }
}
function useResolver() {
  return (0, import_react18.useReducer)(reducer, { value: void 0, error: void 0 });
}

// node_modules/react-pdf/dist/esm/Document.js
var __awaiter2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __rest = function(s2, e2) {
  var t2 = {};
  for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
    t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
var { PDFDataRangeTransport: PDFDataRangeTransport2 } = pdf_exports;
var defaultOnPassword = (callback, reason) => {
  switch (reason) {
    case PasswordResponses_default.NEED_PASSWORD: {
      const password = prompt("Enter the password to open this PDF file.");
      callback(password);
      break;
    }
    case PasswordResponses_default.INCORRECT_PASSWORD: {
      const password = prompt("Invalid password. Please try again.");
      callback(password);
      break;
    }
    default:
  }
};
function isParameterObject(file) {
  return typeof file === "object" && file !== null && ("data" in file || "range" in file || "url" in file);
}
var Document = (0, import_react19.forwardRef)(function Document2(_a2, ref) {
  var { children, className, error = "Failed to load PDF file.", externalLinkRel, externalLinkTarget, file, inputRef, imageResourcesPath, loading = "Loading PDF…", noData = "No PDF file specified.", onItemClick, onLoadError: onLoadErrorProps, onLoadProgress, onLoadSuccess: onLoadSuccessProps, onPassword = defaultOnPassword, onSourceError: onSourceErrorProps, onSourceSuccess: onSourceSuccessProps, options, renderMode, rotate } = _a2, otherProps = __rest(_a2, ["children", "className", "error", "externalLinkRel", "externalLinkTarget", "file", "inputRef", "imageResourcesPath", "loading", "noData", "onItemClick", "onLoadError", "onLoadProgress", "onLoadSuccess", "onPassword", "onSourceError", "onSourceSuccess", "options", "renderMode", "rotate"]);
  const [sourceState, sourceDispatch] = useResolver();
  const { value: source, error: sourceError } = sourceState;
  const [pdfState, pdfDispatch] = useResolver();
  const { value: pdf, error: pdfError } = pdfState;
  const linkService = (0, import_react19.useRef)(new LinkService());
  const pages = (0, import_react19.useRef)([]);
  const prevFile = (0, import_react19.useRef)(void 0);
  const prevOptions = (0, import_react19.useRef)(void 0);
  if (file && file !== prevFile.current && isParameterObject(file)) {
    (0, import_warning2.default)(!dequal(file, prevFile.current), `File prop passed to <Document /> changed, but it's equal to previous one. This might result in unnecessary reloads. Consider memoizing the value passed to "file" prop.`);
    prevFile.current = file;
  }
  if (options && options !== prevOptions.current) {
    (0, import_warning2.default)(!dequal(options, prevOptions.current), `Options prop passed to <Document /> changed, but it's equal to previous one. This might result in unnecessary reloads. Consider memoizing the value passed to "options" prop.`);
    prevOptions.current = options;
  }
  const viewer = (0, import_react19.useRef)({
    // Handling jumping to internal links target
    scrollPageIntoView: (args) => {
      const { dest, pageNumber, pageIndex = pageNumber - 1 } = args;
      if (onItemClick) {
        onItemClick({ dest, pageIndex, pageNumber });
        return;
      }
      const page = pages.current[pageIndex];
      if (page) {
        page.scrollIntoView();
        return;
      }
      (0, import_warning2.default)(false, `An internal link leading to page ${pageNumber} was clicked, but neither <Document> was provided with onItemClick nor it was able to find the page within itself. Either provide onItemClick to <Document> and handle navigating by yourself or ensure that all pages are rendered within <Document>.`);
    }
  });
  (0, import_react19.useImperativeHandle)(ref, () => ({
    linkService,
    pages,
    viewer
  }), []);
  function onSourceSuccess() {
    if (onSourceSuccessProps) {
      onSourceSuccessProps();
    }
  }
  function onSourceError() {
    if (!sourceError) {
      return;
    }
    (0, import_warning2.default)(false, sourceError.toString());
    if (onSourceErrorProps) {
      onSourceErrorProps(sourceError);
    }
  }
  function resetSource() {
    sourceDispatch({ type: "RESET" });
  }
  (0, import_react19.useEffect)(resetSource, [file, sourceDispatch]);
  const findDocumentSource = (0, import_react19.useCallback)(() => __awaiter2(this, void 0, void 0, function* () {
    if (!file) {
      return null;
    }
    if (typeof file === "string") {
      if (isDataURI(file)) {
        const fileByteString = dataURItoByteString(file);
        return { data: fileByteString };
      }
      displayCORSWarning();
      return { url: file };
    }
    if (file instanceof PDFDataRangeTransport2) {
      return { range: file };
    }
    if (isArrayBuffer(file)) {
      return { data: file };
    }
    if (isBrowser) {
      if (isBlob(file)) {
        const data = yield loadFromFile(file);
        return { data };
      }
    }
    invariant(typeof file === "object", "Invalid parameter in file, need either Uint8Array, string or a parameter object");
    invariant(isParameterObject(file), "Invalid parameter object: need either .data, .range or .url");
    if ("url" in file && typeof file.url === "string") {
      if (isDataURI(file.url)) {
        const { url } = file, otherParams = __rest(file, ["url"]);
        const fileByteString = dataURItoByteString(url);
        return Object.assign({ data: fileByteString }, otherParams);
      }
      displayCORSWarning();
    }
    return file;
  }), [file]);
  (0, import_react19.useEffect)(() => {
    const cancellable = makeCancellablePromise(findDocumentSource());
    cancellable.promise.then((nextSource) => {
      sourceDispatch({ type: "RESOLVE", value: nextSource });
    }).catch((error2) => {
      sourceDispatch({ type: "REJECT", error: error2 });
    });
    return () => {
      cancelRunningTask(cancellable);
    };
  }, [findDocumentSource, sourceDispatch]);
  (0, import_react19.useEffect)(
    () => {
      if (typeof source === "undefined") {
        return;
      }
      if (source === false) {
        onSourceError();
        return;
      }
      onSourceSuccess();
    },
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [source]
  );
  function onLoadSuccess() {
    if (!pdf) {
      return;
    }
    if (onLoadSuccessProps) {
      onLoadSuccessProps(pdf);
    }
    pages.current = new Array(pdf.numPages);
    linkService.current.setDocument(pdf);
  }
  function onLoadError() {
    if (!pdfError) {
      return;
    }
    (0, import_warning2.default)(false, pdfError.toString());
    if (onLoadErrorProps) {
      onLoadErrorProps(pdfError);
    }
  }
  function resetDocument() {
    pdfDispatch({ type: "RESET" });
  }
  (0, import_react19.useEffect)(resetDocument, [pdfDispatch, source]);
  function loadDocument() {
    if (!source) {
      return;
    }
    const documentInitParams = Object.assign(Object.assign({}, source), options);
    const destroyable = __webpack_exports__getDocument(documentInitParams);
    if (onLoadProgress) {
      destroyable.onProgress = onLoadProgress;
    }
    if (onPassword) {
      destroyable.onPassword = onPassword;
    }
    const loadingTask = destroyable;
    loadingTask.promise.then((nextPdf) => {
      pdfDispatch({ type: "RESOLVE", value: nextPdf });
    }).catch((error2) => {
      if (loadingTask.destroyed) {
        return;
      }
      pdfDispatch({ type: "REJECT", error: error2 });
    });
    return () => {
      loadingTask.destroy();
    };
  }
  (0, import_react19.useEffect)(
    loadDocument,
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options, pdfDispatch, source]
  );
  (0, import_react19.useEffect)(
    () => {
      if (typeof pdf === "undefined") {
        return;
      }
      if (pdf === false) {
        onLoadError();
        return;
      }
      onLoadSuccess();
    },
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pdf]
  );
  function setupLinkService() {
    linkService.current.setViewer(viewer.current);
    linkService.current.setExternalLinkRel(externalLinkRel);
    linkService.current.setExternalLinkTarget(externalLinkTarget);
  }
  (0, import_react19.useEffect)(setupLinkService, [externalLinkRel, externalLinkTarget]);
  function registerPage(pageIndex, ref2) {
    pages.current[pageIndex] = ref2;
  }
  function unregisterPage(pageIndex) {
    delete pages.current[pageIndex];
  }
  const childContext = (0, import_react19.useMemo)(() => ({
    imageResourcesPath,
    linkService: linkService.current,
    onItemClick,
    pdf,
    registerPage,
    renderMode,
    rotate,
    unregisterPage
  }), [imageResourcesPath, onItemClick, pdf, renderMode, rotate]);
  const eventProps = (0, import_react19.useMemo)(() => makeEventProps(otherProps, () => pdf), [otherProps, pdf]);
  function renderChildren() {
    return (0, import_jsx_runtime2.jsx)(DocumentContext_default.Provider, { value: childContext, children });
  }
  function renderContent() {
    if (!file) {
      return (0, import_jsx_runtime2.jsx)(Message, { type: "no-data", children: typeof noData === "function" ? noData() : noData });
    }
    if (pdf === void 0 || pdf === null) {
      return (0, import_jsx_runtime2.jsx)(Message, { type: "loading", children: typeof loading === "function" ? loading() : loading });
    }
    if (pdf === false) {
      return (0, import_jsx_runtime2.jsx)(Message, { type: "error", children: typeof error === "function" ? error() : error });
    }
    return renderChildren();
  }
  return (0, import_jsx_runtime2.jsx)("div", Object.assign({
    className: clsx_default("react-pdf__Document", className),
    // Assertion is needed for React 18 compatibility
    ref: inputRef,
    style: {
      ["--scale-factor"]: "1"
    }
  }, eventProps, { children: renderContent() }));
});
var Document_default = Document;

// node_modules/react-pdf/dist/esm/Outline.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var import_react24 = __toESM(require_react(), 1);
var import_warning3 = __toESM(require_warning(), 1);

// node_modules/react-pdf/dist/esm/OutlineContext.js
var import_react20 = __toESM(require_react(), 1);
var OutlineContext_default = (0, import_react20.createContext)(null);

// node_modules/react-pdf/dist/esm/OutlineItem.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-pdf/dist/esm/shared/hooks/useCachedValue.js
var import_react21 = __toESM(require_react(), 1);

// node_modules/react-pdf/dist/esm/shared/hooks/useDocumentContext.js
var import_react22 = __toESM(require_react(), 1);
function useDocumentContext() {
  return (0, import_react22.useContext)(DocumentContext_default);
}

// node_modules/react-pdf/dist/esm/shared/hooks/useOutlineContext.js
var import_react23 = __toESM(require_react(), 1);

// node_modules/react-pdf/dist/esm/Page.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var import_react32 = __toESM(require_react(), 1);

// node_modules/merge-refs/dist/esm/index.js
function mergeRefs() {
  var inputRefs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    inputRefs[_i] = arguments[_i];
  }
  var filteredInputRefs = inputRefs.filter(Boolean);
  if (filteredInputRefs.length <= 1) {
    var firstRef = filteredInputRefs[0];
    return firstRef || null;
  }
  return function mergedRefs(ref) {
    filteredInputRefs.forEach(function(inputRef) {
      if (typeof inputRef === "function") {
        inputRef(ref);
      } else if (inputRef) {
        inputRef.current = ref;
      }
    });
  };
}

// node_modules/react-pdf/dist/esm/Page.js
var import_warning8 = __toESM(require_warning(), 1);

// node_modules/react-pdf/dist/esm/PageContext.js
var import_react25 = __toESM(require_react(), 1);
var PageContext_default = (0, import_react25.createContext)(null);

// node_modules/react-pdf/dist/esm/Page/Canvas.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var import_react29 = __toESM(require_react(), 1);
var import_warning5 = __toESM(require_warning(), 1);

// node_modules/react-pdf/dist/esm/StructTree.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var import_react28 = __toESM(require_react(), 1);
var import_warning4 = __toESM(require_warning(), 1);

// node_modules/react-pdf/dist/esm/StructTreeItem.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var import_react26 = __toESM(require_react(), 1);

// node_modules/react-pdf/dist/esm/shared/constants.js
var PDF_ROLE_TO_HTML_ROLE = {
  // Document level structure types
  Document: null,
  // There's a "document" role, but it doesn't make sense here.
  DocumentFragment: null,
  // Grouping level structure types
  Part: "group",
  Sect: "group",
  // XXX: There's a "section" role, but it's abstract.
  Div: "group",
  Aside: "note",
  NonStruct: "none",
  // Block level structure types
  P: null,
  // H<n>,
  H: "heading",
  Title: null,
  FENote: "note",
  // Sub-block level structure type
  Sub: "group",
  // General inline level structure types
  Lbl: null,
  Span: null,
  Em: null,
  Strong: null,
  Link: "link",
  Annot: "note",
  Form: "form",
  // Ruby and Warichu structure types
  Ruby: null,
  RB: null,
  RT: null,
  RP: null,
  Warichu: null,
  WT: null,
  WP: null,
  // List standard structure types
  L: "list",
  LI: "listitem",
  LBody: null,
  // Table standard structure types
  Table: "table",
  TR: "row",
  TH: "columnheader",
  TD: "cell",
  THead: "columnheader",
  TBody: null,
  TFoot: null,
  // Standard structure type Caption
  Caption: null,
  // Standard structure type Figure
  Figure: "figure",
  // Standard structure type Formula
  Formula: null,
  // standard structure type Artifact
  Artifact: null
};
var HEADING_PATTERN = /^H(\d+)$/;

// node_modules/react-pdf/dist/esm/shared/structTreeUtils.js
function isPdfRole(role) {
  return role in PDF_ROLE_TO_HTML_ROLE;
}
function isStructTreeNode(node) {
  return "children" in node;
}
function isStructTreeNodeWithOnlyContentChild(node) {
  if (!isStructTreeNode(node)) {
    return false;
  }
  return node.children.length === 1 && 0 in node.children && "id" in node.children[0];
}
function getRoleAttributes(node) {
  const attributes = {};
  if (isStructTreeNode(node)) {
    const { role } = node;
    const matches = role.match(HEADING_PATTERN);
    if (matches) {
      attributes.role = "heading";
      attributes["aria-level"] = Number(matches[1]);
    } else if (isPdfRole(role)) {
      const htmlRole = PDF_ROLE_TO_HTML_ROLE[role];
      if (htmlRole) {
        attributes.role = htmlRole;
      }
    }
  }
  return attributes;
}
function getBaseAttributes(node) {
  const attributes = {};
  if (isStructTreeNode(node)) {
    if (node.alt !== void 0) {
      attributes["aria-label"] = node.alt;
    }
    if (node.lang !== void 0) {
      attributes.lang = node.lang;
    }
    if (isStructTreeNodeWithOnlyContentChild(node)) {
      const [child] = node.children;
      if (child) {
        const childAttributes = getBaseAttributes(child);
        return Object.assign(Object.assign({}, attributes), childAttributes);
      }
    }
  } else {
    if ("id" in node) {
      attributes["aria-owns"] = node.id;
    }
  }
  return attributes;
}
function getAttributes(node) {
  if (!node) {
    return null;
  }
  return Object.assign(Object.assign({}, getRoleAttributes(node)), getBaseAttributes(node));
}

// node_modules/react-pdf/dist/esm/StructTreeItem.js
function StructTreeItem({ className, node }) {
  const attributes = (0, import_react26.useMemo)(() => getAttributes(node), [node]);
  const children = (0, import_react26.useMemo)(() => {
    if (!isStructTreeNode(node)) {
      return null;
    }
    if (isStructTreeNodeWithOnlyContentChild(node)) {
      return null;
    }
    return node.children.map((child, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        (0, import_jsx_runtime5.jsx)(StructTreeItem, { node: child }, index)
      );
    });
  }, [node]);
  return (0, import_jsx_runtime5.jsx)("span", Object.assign({ className }, attributes, { children }));
}

// node_modules/react-pdf/dist/esm/shared/hooks/usePageContext.js
var import_react27 = __toESM(require_react(), 1);
function usePageContext() {
  return (0, import_react27.useContext)(PageContext_default);
}

// node_modules/react-pdf/dist/esm/StructTree.js
function StructTree() {
  const pageContext = usePageContext();
  invariant(pageContext, "Unable to find Page context.");
  const { onGetStructTreeError: onGetStructTreeErrorProps, onGetStructTreeSuccess: onGetStructTreeSuccessProps } = pageContext;
  const [structTreeState, structTreeDispatch] = useResolver();
  const { value: structTree, error: structTreeError } = structTreeState;
  const { customTextRenderer, page } = pageContext;
  function onLoadSuccess() {
    if (!structTree) {
      return;
    }
    if (onGetStructTreeSuccessProps) {
      onGetStructTreeSuccessProps(structTree);
    }
  }
  function onLoadError() {
    if (!structTreeError) {
      return;
    }
    (0, import_warning4.default)(false, structTreeError.toString());
    if (onGetStructTreeErrorProps) {
      onGetStructTreeErrorProps(structTreeError);
    }
  }
  function resetAnnotations() {
    structTreeDispatch({ type: "RESET" });
  }
  (0, import_react28.useEffect)(resetAnnotations, [structTreeDispatch, page]);
  function loadStructTree() {
    if (customTextRenderer) {
      return;
    }
    if (!page) {
      return;
    }
    const cancellable = makeCancellablePromise(page.getStructTree());
    const runningTask = cancellable;
    cancellable.promise.then((nextStructTree) => {
      structTreeDispatch({ type: "RESOLVE", value: nextStructTree });
    }).catch((error) => {
      structTreeDispatch({ type: "REJECT", error });
    });
    return () => cancelRunningTask(runningTask);
  }
  (0, import_react28.useEffect)(loadStructTree, [customTextRenderer, page, structTreeDispatch]);
  (0, import_react28.useEffect)(
    () => {
      if (structTree === void 0) {
        return;
      }
      if (structTree === false) {
        onLoadError();
        return;
      }
      onLoadSuccess();
    },
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [structTree]
  );
  if (!structTree) {
    return null;
  }
  return (0, import_jsx_runtime6.jsx)(StructTreeItem, { className: "react-pdf__Page__structTree structTree", node: structTree });
}

// node_modules/react-pdf/dist/esm/Page/Canvas.js
var ANNOTATION_MODE = __webpack_exports__AnnotationMode;
function Canvas(props) {
  const pageContext = usePageContext();
  invariant(pageContext, "Unable to find Page context.");
  const mergedProps = Object.assign(Object.assign({}, pageContext), props);
  const { _className, canvasBackground, devicePixelRatio = getDevicePixelRatio(), onRenderError: onRenderErrorProps, onRenderSuccess: onRenderSuccessProps, page, renderForms, renderTextLayer: renderTextLayer2, rotate, scale } = mergedProps;
  const { canvasRef } = props;
  invariant(page, "Attempted to render page canvas, but no page was specified.");
  const canvasElement = (0, import_react29.useRef)(null);
  function onRenderSuccess() {
    if (!page) {
      return;
    }
    if (onRenderSuccessProps) {
      onRenderSuccessProps(makePageCallback(page, scale));
    }
  }
  function onRenderError(error) {
    if (isCancelException(error)) {
      return;
    }
    (0, import_warning5.default)(false, error.toString());
    if (onRenderErrorProps) {
      onRenderErrorProps(error);
    }
  }
  const renderViewport = (0, import_react29.useMemo)(() => page.getViewport({ scale: scale * devicePixelRatio, rotation: rotate }), [devicePixelRatio, page, rotate, scale]);
  const viewport = (0, import_react29.useMemo)(() => page.getViewport({ scale, rotation: rotate }), [page, rotate, scale]);
  function drawPageOnCanvas() {
    if (!page) {
      return;
    }
    page.cleanup();
    const { current: canvas } = canvasElement;
    if (!canvas) {
      return;
    }
    canvas.width = renderViewport.width;
    canvas.height = renderViewport.height;
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;
    canvas.style.visibility = "hidden";
    const renderContext = {
      annotationMode: renderForms ? ANNOTATION_MODE.ENABLE_FORMS : ANNOTATION_MODE.ENABLE,
      canvasContext: canvas.getContext("2d", { alpha: false }),
      viewport: renderViewport
    };
    if (canvasBackground) {
      renderContext.background = canvasBackground;
    }
    const cancellable = page.render(renderContext);
    const runningTask = cancellable;
    cancellable.promise.then(() => {
      canvas.style.visibility = "";
      onRenderSuccess();
    }).catch(onRenderError);
    return () => cancelRunningTask(runningTask);
  }
  (0, import_react29.useEffect)(
    drawPageOnCanvas,
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      canvasBackground,
      canvasElement,
      devicePixelRatio,
      page,
      renderForms,
      renderViewport,
      viewport
    ]
  );
  const cleanup = (0, import_react29.useCallback)(() => {
    const { current: canvas } = canvasElement;
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
  }, [canvasElement]);
  (0, import_react29.useEffect)(() => cleanup, [cleanup]);
  return (0, import_jsx_runtime7.jsx)("canvas", { className: `${_className}__canvas`, dir: "ltr", ref: mergeRefs(canvasRef, canvasElement), style: {
    display: "block",
    userSelect: "none"
  }, children: renderTextLayer2 ? (0, import_jsx_runtime7.jsx)(StructTree, {}) : null });
}

// node_modules/react-pdf/dist/esm/Page/TextLayer.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var import_react30 = __toESM(require_react(), 1);
var import_warning6 = __toESM(require_warning(), 1);
function isTextItem(item) {
  return "str" in item;
}
function TextLayer2() {
  const pageContext = usePageContext();
  invariant(pageContext, "Unable to find Page context.");
  const { customTextRenderer, onGetTextError, onGetTextSuccess, onRenderTextLayerError, onRenderTextLayerSuccess, page, pageIndex, pageNumber, rotate, scale } = pageContext;
  invariant(page, "Attempted to load page text content, but no page was specified.");
  const [textContentState, textContentDispatch] = useResolver();
  const { value: textContent, error: textContentError } = textContentState;
  const layerElement = (0, import_react30.useRef)(null);
  const endElement = (0, import_react30.useRef)(void 0);
  (0, import_warning6.default)(parseInt(window.getComputedStyle(document.body).getPropertyValue("--react-pdf-text-layer"), 10) === 1, "TextLayer styles not found. Read more: https://github.com/wojtekmaj/react-pdf#support-for-text-layer");
  function onLoadSuccess() {
    if (!textContent) {
      return;
    }
    if (onGetTextSuccess) {
      onGetTextSuccess(textContent);
    }
  }
  function onLoadError() {
    if (!textContentError) {
      return;
    }
    (0, import_warning6.default)(false, textContentError.toString());
    if (onGetTextError) {
      onGetTextError(textContentError);
    }
  }
  function resetTextContent() {
    textContentDispatch({ type: "RESET" });
  }
  (0, import_react30.useEffect)(resetTextContent, [page, textContentDispatch]);
  function loadTextContent() {
    if (!page) {
      return;
    }
    const cancellable = makeCancellablePromise(page.getTextContent());
    const runningTask = cancellable;
    cancellable.promise.then((nextTextContent) => {
      textContentDispatch({ type: "RESOLVE", value: nextTextContent });
    }).catch((error) => {
      textContentDispatch({ type: "REJECT", error });
    });
    return () => cancelRunningTask(runningTask);
  }
  (0, import_react30.useEffect)(loadTextContent, [page, textContentDispatch]);
  (0, import_react30.useEffect)(
    () => {
      if (textContent === void 0) {
        return;
      }
      if (textContent === false) {
        onLoadError();
        return;
      }
      onLoadSuccess();
    },
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textContent]
  );
  const onRenderSuccess = (0, import_react30.useCallback)(() => {
    if (onRenderTextLayerSuccess) {
      onRenderTextLayerSuccess();
    }
  }, [onRenderTextLayerSuccess]);
  const onRenderError = (0, import_react30.useCallback)((error) => {
    (0, import_warning6.default)(false, error.toString());
    if (onRenderTextLayerError) {
      onRenderTextLayerError(error);
    }
  }, [onRenderTextLayerError]);
  function onMouseDown() {
    const end = endElement.current;
    if (!end) {
      return;
    }
    end.classList.add("active");
  }
  function onMouseUp() {
    const end = endElement.current;
    if (!end) {
      return;
    }
    end.classList.remove("active");
  }
  const viewport = (0, import_react30.useMemo)(() => page.getViewport({ scale, rotation: rotate }), [page, rotate, scale]);
  function renderTextLayer2() {
    if (!page || !textContent) {
      return;
    }
    const { current: layer } = layerElement;
    if (!layer) {
      return;
    }
    layer.innerHTML = "";
    const textContentSource = page.streamTextContent({ includeMarkedContent: true });
    const parameters = {
      container: layer,
      textContentSource,
      viewport
    };
    const cancellable = new __webpack_exports__TextLayer(parameters);
    const runningTask = cancellable;
    cancellable.render().then(() => {
      const end = document.createElement("div");
      end.className = "endOfContent";
      layer.append(end);
      endElement.current = end;
      const layerChildren = layer.querySelectorAll('[role="presentation"]');
      if (customTextRenderer) {
        let index = 0;
        textContent.items.forEach((item, itemIndex) => {
          if (!isTextItem(item)) {
            return;
          }
          const child = layerChildren[index];
          if (!child) {
            return;
          }
          const content = customTextRenderer(Object.assign({
            pageIndex,
            pageNumber,
            itemIndex
          }, item));
          child.innerHTML = content;
          index += item.str && item.hasEOL ? 2 : 1;
        });
      }
      onRenderSuccess();
    }).catch(onRenderError);
    return () => cancelRunningTask(runningTask);
  }
  (0, import_react30.useLayoutEffect)(renderTextLayer2, [
    customTextRenderer,
    onRenderError,
    onRenderSuccess,
    page,
    pageIndex,
    pageNumber,
    textContent,
    viewport
  ]);
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    (0, import_jsx_runtime8.jsx)("div", { className: clsx_default("react-pdf__Page__textContent", "textLayer"), onMouseUp, onMouseDown, ref: layerElement })
  );
}

// node_modules/react-pdf/dist/esm/Page/AnnotationLayer.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var import_react31 = __toESM(require_react(), 1);
var import_warning7 = __toESM(require_warning(), 1);
function AnnotationLayer2() {
  const documentContext = useDocumentContext();
  const pageContext = usePageContext();
  invariant(pageContext, "Unable to find Page context.");
  const mergedProps = Object.assign(Object.assign({}, documentContext), pageContext);
  const { imageResourcesPath, linkService, onGetAnnotationsError: onGetAnnotationsErrorProps, onGetAnnotationsSuccess: onGetAnnotationsSuccessProps, onRenderAnnotationLayerError: onRenderAnnotationLayerErrorProps, onRenderAnnotationLayerSuccess: onRenderAnnotationLayerSuccessProps, page, pdf, renderForms, rotate, scale = 1 } = mergedProps;
  invariant(pdf, "Attempted to load page annotations, but no document was specified. Wrap <Page /> in a <Document /> or pass explicit `pdf` prop.");
  invariant(page, "Attempted to load page annotations, but no page was specified.");
  invariant(linkService, "Attempted to load page annotations, but no linkService was specified.");
  const [annotationsState, annotationsDispatch] = useResolver();
  const { value: annotations, error: annotationsError } = annotationsState;
  const layerElement = (0, import_react31.useRef)(null);
  (0, import_warning7.default)(parseInt(window.getComputedStyle(document.body).getPropertyValue("--react-pdf-annotation-layer"), 10) === 1, "AnnotationLayer styles not found. Read more: https://github.com/wojtekmaj/react-pdf#support-for-annotations");
  function onLoadSuccess() {
    if (!annotations) {
      return;
    }
    if (onGetAnnotationsSuccessProps) {
      onGetAnnotationsSuccessProps(annotations);
    }
  }
  function onLoadError() {
    if (!annotationsError) {
      return;
    }
    (0, import_warning7.default)(false, annotationsError.toString());
    if (onGetAnnotationsErrorProps) {
      onGetAnnotationsErrorProps(annotationsError);
    }
  }
  function resetAnnotations() {
    annotationsDispatch({ type: "RESET" });
  }
  (0, import_react31.useEffect)(resetAnnotations, [annotationsDispatch, page]);
  function loadAnnotations() {
    if (!page) {
      return;
    }
    const cancellable = makeCancellablePromise(page.getAnnotations());
    const runningTask = cancellable;
    cancellable.promise.then((nextAnnotations) => {
      annotationsDispatch({ type: "RESOLVE", value: nextAnnotations });
    }).catch((error) => {
      annotationsDispatch({ type: "REJECT", error });
    });
    return () => {
      cancelRunningTask(runningTask);
    };
  }
  (0, import_react31.useEffect)(loadAnnotations, [annotationsDispatch, page, renderForms]);
  (0, import_react31.useEffect)(
    () => {
      if (annotations === void 0) {
        return;
      }
      if (annotations === false) {
        onLoadError();
        return;
      }
      onLoadSuccess();
    },
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [annotations]
  );
  function onRenderSuccess() {
    if (onRenderAnnotationLayerSuccessProps) {
      onRenderAnnotationLayerSuccessProps();
    }
  }
  function onRenderError(error) {
    (0, import_warning7.default)(false, `${error}`);
    if (onRenderAnnotationLayerErrorProps) {
      onRenderAnnotationLayerErrorProps(error);
    }
  }
  const viewport = (0, import_react31.useMemo)(() => page.getViewport({ scale, rotation: rotate }), [page, rotate, scale]);
  function renderAnnotationLayer() {
    if (!pdf || !page || !linkService || !annotations) {
      return;
    }
    const { current: layer } = layerElement;
    if (!layer) {
      return;
    }
    const clonedViewport = viewport.clone({ dontFlip: true });
    const annotationLayerParameters = {
      accessibilityManager: null,
      // TODO: Implement this
      annotationCanvasMap: null,
      // TODO: Implement this
      annotationEditorUIManager: null,
      // TODO: Implement this
      div: layer,
      l10n: null,
      // TODO: Implement this
      page,
      viewport: clonedViewport
    };
    const renderParameters = {
      annotations,
      annotationStorage: pdf.annotationStorage,
      div: layer,
      imageResourcesPath,
      linkService,
      page,
      renderForms,
      viewport: clonedViewport
    };
    layer.innerHTML = "";
    try {
      new __webpack_exports__AnnotationLayer(annotationLayerParameters).render(renderParameters);
      onRenderSuccess();
    } catch (error) {
      onRenderError(error);
    }
    return () => {
    };
  }
  (0, import_react31.useEffect)(
    renderAnnotationLayer,
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [annotations, imageResourcesPath, linkService, page, renderForms, viewport]
  );
  return (0, import_jsx_runtime9.jsx)("div", { className: clsx_default("react-pdf__Page__annotations", "annotationLayer"), ref: layerElement });
}

// node_modules/react-pdf/dist/esm/Page.js
var __rest2 = function(s2, e2) {
  var t2 = {};
  for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
    t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
var defaultScale = 1;
function Page(props) {
  const documentContext = useDocumentContext();
  const mergedProps = Object.assign(Object.assign({}, documentContext), props);
  const { _className = "react-pdf__Page", _enableRegisterUnregisterPage = true, canvasBackground, canvasRef, children, className, customRenderer: CustomRenderer, customTextRenderer, devicePixelRatio, error = "Failed to load the page.", height, inputRef, loading = "Loading page…", noData = "No page specified.", onGetAnnotationsError: onGetAnnotationsErrorProps, onGetAnnotationsSuccess: onGetAnnotationsSuccessProps, onGetStructTreeError: onGetStructTreeErrorProps, onGetStructTreeSuccess: onGetStructTreeSuccessProps, onGetTextError: onGetTextErrorProps, onGetTextSuccess: onGetTextSuccessProps, onLoadError: onLoadErrorProps, onLoadSuccess: onLoadSuccessProps, onRenderAnnotationLayerError: onRenderAnnotationLayerErrorProps, onRenderAnnotationLayerSuccess: onRenderAnnotationLayerSuccessProps, onRenderError: onRenderErrorProps, onRenderSuccess: onRenderSuccessProps, onRenderTextLayerError: onRenderTextLayerErrorProps, onRenderTextLayerSuccess: onRenderTextLayerSuccessProps, pageIndex: pageIndexProps, pageNumber: pageNumberProps, pdf, registerPage, renderAnnotationLayer: renderAnnotationLayerProps = true, renderForms = false, renderMode = "canvas", renderTextLayer: renderTextLayerProps = true, rotate: rotateProps, scale: scaleProps = defaultScale, unregisterPage, width } = mergedProps, otherProps = __rest2(mergedProps, ["_className", "_enableRegisterUnregisterPage", "canvasBackground", "canvasRef", "children", "className", "customRenderer", "customTextRenderer", "devicePixelRatio", "error", "height", "inputRef", "loading", "noData", "onGetAnnotationsError", "onGetAnnotationsSuccess", "onGetStructTreeError", "onGetStructTreeSuccess", "onGetTextError", "onGetTextSuccess", "onLoadError", "onLoadSuccess", "onRenderAnnotationLayerError", "onRenderAnnotationLayerSuccess", "onRenderError", "onRenderSuccess", "onRenderTextLayerError", "onRenderTextLayerSuccess", "pageIndex", "pageNumber", "pdf", "registerPage", "renderAnnotationLayer", "renderForms", "renderMode", "renderTextLayer", "rotate", "scale", "unregisterPage", "width"]);
  const [pageState, pageDispatch] = useResolver();
  const { value: page, error: pageError } = pageState;
  const pageElement = (0, import_react32.useRef)(null);
  invariant(pdf, "Attempted to load a page, but no document was specified. Wrap <Page /> in a <Document /> or pass explicit `pdf` prop.");
  const pageIndex = isProvided(pageNumberProps) ? pageNumberProps - 1 : pageIndexProps !== null && pageIndexProps !== void 0 ? pageIndexProps : null;
  const pageNumber = pageNumberProps !== null && pageNumberProps !== void 0 ? pageNumberProps : isProvided(pageIndexProps) ? pageIndexProps + 1 : null;
  const rotate = rotateProps !== null && rotateProps !== void 0 ? rotateProps : page ? page.rotate : null;
  const scale = (0, import_react32.useMemo)(() => {
    if (!page) {
      return null;
    }
    let pageScale = 1;
    const scaleWithDefault = scaleProps !== null && scaleProps !== void 0 ? scaleProps : defaultScale;
    if (width || height) {
      const viewport = page.getViewport({ scale: 1, rotation: rotate });
      if (width) {
        pageScale = width / viewport.width;
      } else if (height) {
        pageScale = height / viewport.height;
      }
    }
    return scaleWithDefault * pageScale;
  }, [height, page, rotate, scaleProps, width]);
  function hook() {
    return () => {
      if (!isProvided(pageIndex)) {
        return;
      }
      if (_enableRegisterUnregisterPage && unregisterPage) {
        unregisterPage(pageIndex);
      }
    };
  }
  (0, import_react32.useEffect)(hook, [_enableRegisterUnregisterPage, pdf, pageIndex, unregisterPage]);
  function onLoadSuccess() {
    if (onLoadSuccessProps) {
      if (!page || !scale) {
        return;
      }
      onLoadSuccessProps(makePageCallback(page, scale));
    }
    if (_enableRegisterUnregisterPage && registerPage) {
      if (!isProvided(pageIndex) || !pageElement.current) {
        return;
      }
      registerPage(pageIndex, pageElement.current);
    }
  }
  function onLoadError() {
    if (!pageError) {
      return;
    }
    (0, import_warning8.default)(false, pageError.toString());
    if (onLoadErrorProps) {
      onLoadErrorProps(pageError);
    }
  }
  function resetPage() {
    pageDispatch({ type: "RESET" });
  }
  (0, import_react32.useEffect)(resetPage, [pageDispatch, pdf, pageIndex]);
  function loadPage() {
    if (!pdf || !pageNumber) {
      return;
    }
    const cancellable = makeCancellablePromise(pdf.getPage(pageNumber));
    const runningTask = cancellable;
    cancellable.promise.then((nextPage) => {
      pageDispatch({ type: "RESOLVE", value: nextPage });
    }).catch((error2) => {
      pageDispatch({ type: "REJECT", error: error2 });
    });
    return () => cancelRunningTask(runningTask);
  }
  (0, import_react32.useEffect)(loadPage, [pageDispatch, pdf, pageIndex, pageNumber, registerPage]);
  (0, import_react32.useEffect)(
    () => {
      if (page === void 0) {
        return;
      }
      if (page === false) {
        onLoadError();
        return;
      }
      onLoadSuccess();
    },
    // Ommitted callbacks so they are not called every time they change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, scale]
  );
  const childContext = (0, import_react32.useMemo)(() => (
    // Technically there cannot be page without pageIndex, pageNumber, rotate and scale, but TypeScript doesn't know that
    page && isProvided(pageIndex) && pageNumber && isProvided(rotate) && isProvided(scale) ? {
      _className,
      canvasBackground,
      customTextRenderer,
      devicePixelRatio,
      onGetAnnotationsError: onGetAnnotationsErrorProps,
      onGetAnnotationsSuccess: onGetAnnotationsSuccessProps,
      onGetStructTreeError: onGetStructTreeErrorProps,
      onGetStructTreeSuccess: onGetStructTreeSuccessProps,
      onGetTextError: onGetTextErrorProps,
      onGetTextSuccess: onGetTextSuccessProps,
      onRenderAnnotationLayerError: onRenderAnnotationLayerErrorProps,
      onRenderAnnotationLayerSuccess: onRenderAnnotationLayerSuccessProps,
      onRenderError: onRenderErrorProps,
      onRenderSuccess: onRenderSuccessProps,
      onRenderTextLayerError: onRenderTextLayerErrorProps,
      onRenderTextLayerSuccess: onRenderTextLayerSuccessProps,
      page,
      pageIndex,
      pageNumber,
      renderForms,
      renderTextLayer: renderTextLayerProps,
      rotate,
      scale
    } : null
  ), [
    _className,
    canvasBackground,
    customTextRenderer,
    devicePixelRatio,
    onGetAnnotationsErrorProps,
    onGetAnnotationsSuccessProps,
    onGetStructTreeErrorProps,
    onGetStructTreeSuccessProps,
    onGetTextErrorProps,
    onGetTextSuccessProps,
    onRenderAnnotationLayerErrorProps,
    onRenderAnnotationLayerSuccessProps,
    onRenderErrorProps,
    onRenderSuccessProps,
    onRenderTextLayerErrorProps,
    onRenderTextLayerSuccessProps,
    page,
    pageIndex,
    pageNumber,
    renderForms,
    renderTextLayerProps,
    rotate,
    scale
  ]);
  const eventProps = (0, import_react32.useMemo)(() => makeEventProps(otherProps, () => page ? scale ? makePageCallback(page, scale) : void 0 : page), [otherProps, page, scale]);
  const pageKey = `${pageIndex}@${scale}/${rotate}`;
  function renderMainLayer() {
    switch (renderMode) {
      case "custom": {
        invariant(CustomRenderer, `renderMode was set to "custom", but no customRenderer was passed.`);
        return (0, import_jsx_runtime10.jsx)(CustomRenderer, {}, `${pageKey}_custom`);
      }
      case "none":
        return null;
      case "canvas":
      default:
        return (0, import_jsx_runtime10.jsx)(Canvas, { canvasRef }, `${pageKey}_canvas`);
    }
  }
  function renderTextLayer2() {
    if (!renderTextLayerProps) {
      return null;
    }
    return (0, import_jsx_runtime10.jsx)(TextLayer2, {}, `${pageKey}_text`);
  }
  function renderAnnotationLayer() {
    if (!renderAnnotationLayerProps) {
      return null;
    }
    return (0, import_jsx_runtime10.jsx)(AnnotationLayer2, {}, `${pageKey}_annotations`);
  }
  function renderChildren() {
    return (0, import_jsx_runtime10.jsxs)(PageContext_default.Provider, { value: childContext, children: [renderMainLayer(), renderTextLayer2(), renderAnnotationLayer(), children] });
  }
  function renderContent() {
    if (!pageNumber) {
      return (0, import_jsx_runtime10.jsx)(Message, { type: "no-data", children: typeof noData === "function" ? noData() : noData });
    }
    if (pdf === null || page === void 0 || page === null) {
      return (0, import_jsx_runtime10.jsx)(Message, { type: "loading", children: typeof loading === "function" ? loading() : loading });
    }
    if (pdf === false || page === false) {
      return (0, import_jsx_runtime10.jsx)(Message, { type: "error", children: typeof error === "function" ? error() : error });
    }
    return renderChildren();
  }
  return (0, import_jsx_runtime10.jsx)("div", Object.assign({
    className: clsx_default(_className, className),
    "data-page-number": pageNumber,
    // Assertion is needed for React 18 compatibility
    ref: mergeRefs(inputRef, pageElement),
    style: {
      ["--scale-factor"]: `${scale}`,
      backgroundColor: canvasBackground || "white",
      position: "relative",
      minWidth: "min-content",
      minHeight: "min-content"
    }
  }, eventProps, { children: renderContent() }));
}

// node_modules/react-pdf/dist/esm/Thumbnail.js
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-pdf/dist/esm/index.js
displayWorkerWarning();
__webpack_exports__GlobalWorkerOptions.workerSrc = "pdf.worker.mjs";

// node_modules/react-doc-viewer/build/utils/importMeta.js
var getMetaURL = function() {
  return import.meta.url;
};

// node_modules/react-doc-viewer/build/plugins/pdf/components/PDFControls.js
var import_react36 = __toESM(require_react());

// node_modules/react-doc-viewer/build/plugins/pdf/state/index.js
var import_react33 = __toESM(require_react());

// node_modules/react-doc-viewer/build/plugins/pdf/state/actions.js
var SET_ZOOM_LEVEL = "SET_ZOOM_LEVEL";
var setZoomLevel = function(value) {
  return {
    type: SET_ZOOM_LEVEL,
    value
  };
};
var SET_PDF_PAGINATED = "SET_PDF_PAGINATED";
var setPDFPaginated = function(value) {
  return {
    type: SET_PDF_PAGINATED,
    value
  };
};
var SET_NUM_PAGES = "SET_NUM_PAGES";
var setNumPages = function(value) {
  return {
    type: SET_NUM_PAGES,
    value
  };
};
var SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
var setCurrentPage = function(value) {
  return {
    type: SET_CURRENT_PAGE,
    value
  };
};

// node_modules/react-doc-viewer/build/plugins/pdf/state/reducer.js
var __assign9 = function() {
  __assign9 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign9.apply(this, arguments);
};
var initialPDFState = {
  zoomLevel: 1,
  paginated: true,
  numPages: 0,
  currentPage: 1
};
var reducer2 = function(state, action) {
  if (state === void 0) {
    state = initialPDFState;
  }
  switch (action.type) {
    case SET_ZOOM_LEVEL: {
      var value = action.value;
      return __assign9(__assign9({}, state), { zoomLevel: value });
    }
    case SET_PDF_PAGINATED: {
      var value = action.value;
      return __assign9(__assign9({}, state), { paginated: value });
    }
    case SET_NUM_PAGES: {
      var value = action.value;
      return __assign9(__assign9({}, state), { numPages: value });
    }
    case SET_CURRENT_PAGE: {
      var value = action.value;
      return __assign9(__assign9({}, state), { currentPage: value });
    }
    default:
      return state;
  }
};

// node_modules/react-doc-viewer/build/plugins/pdf/state/index.js
var __assign10 = function() {
  __assign10 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign10.apply(this, arguments);
};
var PDFContext = (0, import_react33.createContext)({ state: initialPDFState, dispatch: function() {
  return null;
} });
var PDFProvider = function(_a2) {
  var children = _a2.children, mainState = _a2.mainState;
  var _b = (0, import_react33.useReducer)(reducer2, __assign10(__assign10({}, initialPDFState), { mainState })), state = _b[0], dispatch = _b[1];
  return import_react33.default.createElement(PDFContext.Provider, { value: { state, dispatch } }, children);
};

// node_modules/react-doc-viewer/build/plugins/pdf/components/icons/index.js
var import_react34 = __toESM(require_react());
var __assign11 = function() {
  __assign11 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign11.apply(this, arguments);
};
var PrevPDFNavIcon = function(props) {
  return import_react34.default.createElement(PDFNavArrow, __assign11({}, props, { reverse: true }));
};
var NextPDFNavIcon = function(props) {
  return import_react34.default.createElement(PDFNavArrow, __assign11({}, props));
};
var PDFNavArrow = function(props) {
  var color = props.color, size = props.size, reverse = props.reverse;
  return import_react34.default.createElement(
    "svg",
    { width: size || "100%", height: size || "100%", style: { transform: "".concat(reverse ? "rotate(180deg)" : "") }, viewBox: "0 0 12 12", version: "1.1" },
    import_react34.default.createElement(
      "g",
      { id: "Icons", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
      import_react34.default.createElement(
        "g",
        { id: "Rounded", transform: "translate(-548.000000, -1000.000000)" },
        import_react34.default.createElement(
          "g",
          { id: "AV", transform: "translate(100.000000, 852.000000)" },
          import_react34.default.createElement(
            "g",
            { id: "-Round-/-AV-/-skip_next", transform: "translate(442.000000, 142.000000)" },
            import_react34.default.createElement(
              "g",
              null,
              import_react34.default.createElement("rect", { id: "Rectangle-Copy-52", x: "0", y: "0", width: "24", height: "24" }),
              import_react34.default.createElement("path", { d: "M7.58,16.89 L13.35,12.82 C13.91,12.42 13.91,11.58 13.35,11.19 L7.58,7.11 C6.91,6.65 6,7.12 6,7.93 L6,16.07 C6,16.88 6.91,17.35 7.58,16.89 Z M16,7 L16,17 C16,17.55 16.45,18 17,18 C17.55,18 18,17.55 18,17 L18,7 C18,6.45 17.55,6 17,6 C16.45,6 16,6.45 16,7 Z", id: "icon_color", fill: color || "#aaa" })
            )
          )
        )
      )
    )
  );
};
var DownloadPDFIcon = function(props) {
  var color = props.color, size = props.size, reverse = props.reverse;
  return import_react34.default.createElement(
    "svg",
    { width: size || "100%", height: size || "100%", style: { transform: "".concat(reverse ? "rotate(180deg)" : "") }, id: "Layer_1", viewBox: "0 0 24 24" },
    import_react34.default.createElement("path", { d: "M20.57,9.43A8,8,0,0,0,5.26,10,5,5,0,1,0,5,20h5V18H5a3,3,0,0,1,0-6,3.1,3.1,0,0,1,.79.12l1.12.31.14-1.15a6,6,0,0,1,11.74-.82l.15.54.54.16A3.46,3.46,0,0,1,22,14.5,3.5,3.5,0,0,1,18.5,18H16v2h2.5A5.48,5.48,0,0,0,20.57,9.43Z", fill: color || "#aaa" }),
    import_react34.default.createElement("polygon", { points: "12 11 12 15.59 10.71 14.29 9.29 15.71 13 19.41 16.71 15.71 15.29 14.29 14 15.59 14 11 12 11", fill: color || "#aaa" })
  );
};
var ZoomInPDFIcon = function(props) {
  return import_react34.default.createElement(ZoomPDFIcon, __assign11({}, props));
};
var ZoomOutPDFIcon = function(props) {
  return import_react34.default.createElement(ZoomPDFIcon, __assign11({}, props, { reverse: true }));
};
var ZoomPDFIcon = function(props) {
  var color = props.color, size = props.size, reverse = props.reverse;
  return import_react34.default.createElement(
    "svg",
    { width: size || "100%", height: size || "100%", viewBox: "0 0 32 32", version: "1.1" },
    import_react34.default.createElement(
      "g",
      { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
      import_react34.default.createElement(
        "g",
        { id: "search-plus-icon", fill: color || "#aaa" },
        import_react34.default.createElement("path", { id: "search-plus", d: reverse ? "M 13 13 L 16 13 L 19 13 L 19 16 L 16 16 L 13 16 L 10 16 L 10 13 Z M 19.4271 21.4271 C 18.0372 22.4175 16.3367 23 14.5 23 C 9.8056 23 6 19.1944 6 14.5 C 6 9.8056 9.8056 6 14.5 6 C 19.1944 6 23 9.8056 23 14.5 C 23 16.3367 22.4175 18.0372 21.4271 19.4271 L 27.0119 25.0119 C 27.5621 25.5621 27.5575 26.4425 27.0117 26.9883 L 26.9883 27.0117 C 26.4439 27.5561 25.5576 27.5576 25.0119 27.0119 L 19.4271 21.4271 L 19.4271 21.4271 L 19.4271 21.4271 Z M 14.5 21 C 18.0899 21 21 18.0899 21 14.5 C 21 10.9101 18.0899 8 14.5 8 C 10.9101 8 8 10.9101 8 14.5 C 8 18.0899 10.9101 21 14.5 21 L 14.5 21 Z" : "M 13 13 L 13 10 L 16 10 L 16 13 L 19 13 L 19 16 L 16 16 L 16 19 L 13 19 L 13 16 L 10 16 L 10 13 Z M 19.4271 21.4271 C 18.0372 22.4175 16.3367 23 14.5 23 C 9.8056 23 6 19.1944 6 14.5 C 6 9.8056 9.8056 6 14.5 6 C 19.1944 6 23 9.8056 23 14.5 C 23 16.3367 22.4175 18.0372 21.4271 19.4271 L 27.0119 25.0119 C 27.5621 25.5621 27.5575 26.4425 27.0117 26.9883 L 26.9883 27.0117 C 26.4439 27.5561 25.5576 27.5576 25.0119 27.0119 L 19.4271 21.4271 L 19.4271 21.4271 L 19.4271 21.4271 Z M 14.5 21 C 18.0899 21 21 18.0899 21 14.5 C 21 10.9101 18.0899 8 14.5 8 C 10.9101 8 8 10.9101 8 14.5 C 8 18.0899 10.9101 21 14.5 21 L 14.5 21 Z" })
      )
    )
  );
};
var ResetZoomPDFIcon = function(props) {
  var color = props.color, size = props.size;
  return import_react34.default.createElement(
    "svg",
    { width: size || "100%", height: size || "100%", viewBox: "0 0 24 24" },
    import_react34.default.createElement("path", { fill: color || "#aaa", d: "M9.29,13.29,4,18.59V17a1,1,0,0,0-2,0v4a1,1,0,0,0,.08.38,1,1,0,0,0,.54.54A1,1,0,0,0,3,22H7a1,1,0,0,0,0-2H5.41l5.3-5.29a1,1,0,0,0-1.42-1.42ZM5.41,4H7A1,1,0,0,0,7,2H3a1,1,0,0,0-.38.08,1,1,0,0,0-.54.54A1,1,0,0,0,2,3V7A1,1,0,0,0,4,7V5.41l5.29,5.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM21,16a1,1,0,0,0-1,1v1.59l-5.29-5.3a1,1,0,0,0-1.42,1.42L18.59,20H17a1,1,0,0,0,0,2h4a1,1,0,0,0,.38-.08,1,1,0,0,0,.54-.54A1,1,0,0,0,22,21V17A1,1,0,0,0,21,16Zm.92-13.38a1,1,0,0,0-.54-.54A1,1,0,0,0,21,2H17a1,1,0,0,0,0,2h1.59l-5.3,5.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L20,5.41V7a1,1,0,0,0,2,0V3A1,1,0,0,0,21.92,2.62Z" })
  );
};
var TogglePaginationPDFIcon = function(props) {
  var color = props.color, size = props.size, reverse = props.reverse;
  return import_react34.default.createElement(
    "svg",
    { width: size || "100%", height: size || "100%", style: { transform: "".concat(reverse ? "rotate(90deg)" : "") }, version: "1.1", id: "Scroll_1", viewBox: "0 0 297 297", xmlSpace: "preserve" },
    import_react34.default.createElement("path", { fill: color || "#aaa", d: "M206.004,200.723h-31.231V96.277h31.231c0.005,0,0.014,0,0.019,0c5.289,0,9.575-4.287,9.575-9.574\n  c0-2.342-0.841-4.488-2.236-6.151L156.168,3.851C154.36,1.428,151.515,0,148.492,0c-3.023,0-5.868,1.428-7.675,3.851L83.302,80.98\n  c-2.166,2.902-2.507,6.779-0.883,10.017c1.624,3.236,4.936,5.28,8.559,5.28h31.231v104.445H90.978c-3.623,0-6.934,2.044-8.559,5.28\n  c-1.624,3.237-1.283,7.114,0.883,10.017l57.513,77.129c1.808,2.424,4.652,3.852,7.675,3.852c3.023,0,5.868-1.428,7.676-3.852\n  l57.514-77.129c2.164-2.902,2.507-6.779,0.883-10.017C212.938,202.767,209.627,200.723,206.004,200.723z" })
  );
};

// node_modules/react-doc-viewer/build/plugins/pdf/components/PDFPagination.js
var import_react35 = __toESM(require_react());
var __makeTemplateObject10 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var PDFPagination = function() {
  var _a2 = (0, import_react35.useContext)(PDFContext), _b = _a2.state, currentPage = _b.currentPage, numPages = _b.numPages, dispatch = _a2.dispatch;
  return import_react35.default.createElement(
    Container9,
    { id: "pdf-pagination" },
    import_react35.default.createElement(
      PageNavButtonLeft,
      { id: "pdf-pagination-prev", onClick: function() {
        return dispatch(setCurrentPage(currentPage - 1));
      }, disabled: currentPage === 1 },
      import_react35.default.createElement(PrevPDFNavIcon, { color: "#000", size: "50%" })
    ),
    import_react35.default.createElement(
      PageTag,
      { id: "pdf-pagination-info" },
      "Page ",
      currentPage,
      "/",
      numPages
    ),
    import_react35.default.createElement(
      PageNavButtonRight,
      { id: "pdf-pagination-next", onClick: function() {
        return dispatch(setCurrentPage(currentPage + 1));
      }, disabled: currentPage >= numPages },
      import_react35.default.createElement(NextPDFNavIcon, { color: "#000", size: "50%" })
    )
  );
};
var PDFPagination_default = PDFPagination;
var Container9 = styled_components_browser_esm_default.div(templateObject_110 || (templateObject_110 = __makeTemplateObject10(["\n  display: flex;\n  align-items: center;\n"], ["\n  display: flex;\n  align-items: center;\n"])));
var PageNavButtonLeft = styled_components_browser_esm_default(Button)(templateObject_28 || (templateObject_28 = __makeTemplateObject10(["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var PageNavButtonRight = styled_components_browser_esm_default(PageNavButtonLeft)(templateObject_35 || (templateObject_35 = __makeTemplateObject10(["\n  margin: 0 20px 0 5px;\n"], ["\n  margin: 0 20px 0 5px;\n"])));
var PageTag = styled_components_browser_esm_default.div(templateObject_44 || (templateObject_44 = __makeTemplateObject10(["\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"], ["\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"])), function(props) {
  return props.theme.text_primary;
});
var templateObject_110;
var templateObject_28;
var templateObject_35;
var templateObject_44;

// node_modules/react-doc-viewer/build/plugins/pdf/components/PDFControls.js
var __makeTemplateObject11 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var PDFControls = function() {
  var _a2 = (0, import_react36.useContext)(PDFContext), _b = _a2.state, mainState = _b.mainState, paginated = _b.paginated, zoomLevel = _b.zoomLevel, numPages = _b.numPages, dispatch = _a2.dispatch;
  var currentDocument = (mainState === null || mainState === void 0 ? void 0 : mainState.currentDocument) || null;
  return import_react36.default.createElement(
    Container10,
    { id: "pdf-controls" },
    paginated && numPages > 1 && import_react36.default.createElement(PDFPagination_default, null),
    (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData) && import_react36.default.createElement(
      DownloadButton2,
      { id: "pdf-download", href: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData, download: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri },
      import_react36.default.createElement(DownloadPDFIcon, { color: "#000", size: "75%" })
    ),
    import_react36.default.createElement(
      ControlButton,
      { id: "pdf-zoom-out", onMouseDown: function() {
        return dispatch(setZoomLevel(zoomLevel - 0.1));
      } },
      import_react36.default.createElement(ZoomOutPDFIcon, { color: "#000", size: "80%" })
    ),
    import_react36.default.createElement(
      ControlButton,
      { id: "pdf-zoom-in", onMouseDown: function() {
        return dispatch(setZoomLevel(zoomLevel + 0.1));
      } },
      import_react36.default.createElement(ZoomInPDFIcon, { color: "#000", size: "80%" })
    ),
    import_react36.default.createElement(
      ControlButton,
      { id: "pdf-zoom-reset", onMouseDown: function() {
        return dispatch(setZoomLevel(initialPDFState.zoomLevel));
      }, disabled: zoomLevel === initialPDFState.zoomLevel },
      import_react36.default.createElement(ResetZoomPDFIcon, { color: "#000", size: "70%" })
    ),
    numPages > 1 && import_react36.default.createElement(
      ControlButton,
      { id: "pdf-toggle-pagination", onMouseDown: function() {
        return dispatch(setPDFPaginated(!paginated));
      } },
      import_react36.default.createElement(TogglePaginationPDFIcon, { color: "#000", size: "70%", reverse: paginated })
    )
  );
};
var PDFControls_default = PDFControls;
var Container10 = styled_components_browser_esm_default.div(templateObject_111 || (templateObject_111 = __makeTemplateObject11(["\n  display: flex;\n  position: sticky;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  justify-content: flex-end;\n  padding: 8px;\n  background-color: ", ";\n  box-shadow: 0px 2px 3px #00000033;\n\n  @media (max-width: 768px) {\n    padding: 6px;\n  }\n"], ["\n  display: flex;\n  position: sticky;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  justify-content: flex-end;\n  padding: 8px;\n  background-color: ", ";\n  box-shadow: 0px 2px 3px #00000033;\n\n  @media (max-width: 768px) {\n    padding: 6px;\n  }\n"])), function(props) {
  return props.theme.tertiary;
});
var ControlButton = styled_components_browser_esm_default(Button)(templateObject_29 || (templateObject_29 = __makeTemplateObject11(["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var DownloadButton2 = styled_components_browser_esm_default(LinkButton)(templateObject_36 || (templateObject_36 = __makeTemplateObject11(["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var templateObject_111;
var templateObject_29;
var templateObject_36;

// node_modules/react-doc-viewer/build/plugins/pdf/components/pages/PDFPages.js
var import_react39 = __toESM(require_react());

// node_modules/react-doc-viewer/build/plugins/pdf/components/pages/PDFAllPages.js
var import_react38 = __toESM(require_react());

// node_modules/react-doc-viewer/build/plugins/pdf/components/pages/PDFSinglePage.js
var import_react37 = __toESM(require_react());
var __makeTemplateObject12 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var PDFSinglePage = function(props) {
  var pageNum = props.pageNum;
  var _a2 = (0, import_react37.useContext)(PDFContext).state, mainState = _a2.mainState, paginated = _a2.paginated, zoomLevel = _a2.zoomLevel, numPages = _a2.numPages, currentPage = _a2.currentPage;
  var rendererRect = (mainState === null || mainState === void 0 ? void 0 : mainState.rendererRect) || null;
  var _pageNum = pageNum || currentPage;
  return import_react37.default.createElement(
    PageWrapper,
    { id: "pdf-page-wrapper", last: _pageNum >= numPages },
    !paginated && import_react37.default.createElement(
      PageTag2,
      { id: "pdf-page-info" },
      "Page ",
      _pageNum,
      "/",
      numPages
    ),
    import_react37.default.createElement(Page, { pageNumber: _pageNum || currentPage, scale: zoomLevel, height: ((rendererRect === null || rendererRect === void 0 ? void 0 : rendererRect.height) || 100) - 100, width: ((rendererRect === null || rendererRect === void 0 ? void 0 : rendererRect.width) || 100) - 100 })
  );
};
var PDFSinglePage_default = PDFSinglePage;
var PageWrapper = styled_components_browser_esm_default.div(templateObject_112 || (templateObject_112 = __makeTemplateObject12(["\n  margin: 20px 0;\n"], ["\n  margin: 20px 0;\n"])));
var PageTag2 = styled_components_browser_esm_default.div(templateObject_210 || (templateObject_210 = __makeTemplateObject12(["\n  padding: 0 0 10px 10px;\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"], ["\n  padding: 0 0 10px 10px;\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"])), function(props) {
  return props.theme.text_tertiary;
});
var templateObject_112;
var templateObject_210;

// node_modules/react-doc-viewer/build/plugins/pdf/components/pages/PDFAllPages.js
var PDFAllPages = function(props) {
  var numPages = (0, import_react38.useContext)(PDFContext).state.numPages;
  var PagesArray = [];
  for (var i2 = 0; i2 < numPages; i2++) {
    PagesArray.push(import_react38.default.createElement(PDFSinglePage_default, { key: i2 + 1, pageNum: i2 + 1 }));
  }
  return import_react38.default.createElement(import_react38.default.Fragment, null, PagesArray);
};

// node_modules/react-doc-viewer/build/plugins/pdf/components/pages/PDFPages.js
var __makeTemplateObject13 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var PDFPages = function() {
  var _a2 = (0, import_react39.useContext)(PDFContext), _b = _a2.state, mainState = _b.mainState, paginated = _b.paginated, dispatch = _a2.dispatch;
  var currentDocument = (mainState === null || mainState === void 0 ? void 0 : mainState.currentDocument) || null;
  (0, import_react39.useEffect)(function() {
    dispatch(setNumPages(initialPDFState.numPages));
  }, [currentDocument]);
  if (!currentDocument || currentDocument.fileData === void 0)
    return null;
  return import_react39.default.createElement(DocumentPDF, { file: currentDocument.fileData, onLoadSuccess: function(_a3) {
    var numPages = _a3.numPages;
    return dispatch(setNumPages(numPages));
  }, loading: import_react39.default.createElement("span", null, "Loading...") }, paginated ? import_react39.default.createElement(PDFSinglePage_default, null) : import_react39.default.createElement(PDFAllPages, null));
};
var DocumentPDF = styled_components_browser_esm_default(Document_default)(templateObject_113 || (templateObject_113 = __makeTemplateObject13(["\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n"], ["\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n"])));
var PDFPages_default = PDFPages;
var templateObject_113;

// node_modules/react-doc-viewer/build/plugins/pdf/index.js
var __makeTemplateObject14 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
pdf_exports.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", getMetaURL()).toString();
var PDFRenderer = function(_a2) {
  var mainState = _a2.mainState;
  return import_react40.default.createElement(
    PDFProvider,
    { mainState },
    import_react40.default.createElement(
      Container11,
      { id: "pdf-renderer", "data-testid": "pdf-renderer" },
      import_react40.default.createElement(PDFControls_default, null),
      import_react40.default.createElement(PDFPages_default, null)
    )
  );
};
var pdf_default = PDFRenderer;
PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 0;
var Container11 = styled_components_browser_esm_default.div(templateObject_114 || (templateObject_114 = __makeTemplateObject14(["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  overflow-y: auto;\n\n  /* width */\n  &::-webkit-scrollbar {\n    ", ";\n  }\n  /* Track */\n  &::-webkit-scrollbar-track {\n    /* background: ", "; */\n  }\n  /* Handle */\n  &::-webkit-scrollbar-thumb {\n    background: ", ";\n  }\n  /* Handle on hover */\n  &::-webkit-scrollbar-thumb:hover {\n    background: ", ";\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  overflow-y: auto;\n\n  /* width */\n  &::-webkit-scrollbar {\n    ", ";\n  }\n  /* Track */\n  &::-webkit-scrollbar-track {\n    /* background: ", "; */\n  }\n  /* Handle */\n  &::-webkit-scrollbar-thumb {\n    background: ", ";\n  }\n  /* Handle on hover */\n  &::-webkit-scrollbar-thumb:hover {\n    background: ", ";\n  }\n"])), function(props) {
  return props.theme.disableThemeScrollbar ? "" : "width: 10px";
}, function(props) {
  return props.theme.secondary;
}, function(props) {
  return props.theme.tertiary;
}, function(props) {
  return props.theme.primary;
});
var templateObject_114;

// node_modules/react-doc-viewer/build/plugins/png/index.js
var import_react41 = __toESM(require_react());
var __makeTemplateObject15 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var __assign12 = function() {
  __assign12 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign12.apply(this, arguments);
};
var StyledImageRenderer = styled_components_browser_esm_default(image_default)(templateObject_115 || (templateObject_115 = __makeTemplateObject15(["\n  display: flex;\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  background-color: white;\n  background-image: linear-gradient(45deg, #e0e0e0 25%, transparent 25%),\n    linear-gradient(-45deg, #e0e0e0 25%, transparent 25%),\n    linear-gradient(45deg, transparent 75%, #e0e0e0 75%),\n    linear-gradient(-45deg, transparent 75%, #e0e0e0 75%);\n  background-size: 20px 20px;\n  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;\n"], ["\n  display: flex;\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  background-color: white;\n  background-image: linear-gradient(45deg, #e0e0e0 25%, transparent 25%),\n    linear-gradient(-45deg, #e0e0e0 25%, transparent 25%),\n    linear-gradient(45deg, transparent 75%, #e0e0e0 75%),\n    linear-gradient(-45deg, transparent 75%, #e0e0e0 75%);\n  background-size: 20px 20px;\n  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;\n"])));
var PNGRenderer = function(props) {
  return import_react41.default.createElement(StyledImageRenderer, __assign12({}, props));
};
PNGRenderer.fileTypes = ["png", "image/png"];
PNGRenderer.weight = 0;
var png_default = PNGRenderer;
var templateObject_115;

// node_modules/react-doc-viewer/build/plugins/tiff/index.js
var import_react42 = __toESM(require_react());

// node_modules/react-doc-viewer/build/plugins/tiff/tiffToCanvas.js
var _this = void 0;
var tiffDataView = void 0;
var littleEndian = void 0;
var fileDirectories = [];
var isLittleEndian2 = function() {
  var BOM = getBytes(2, 0);
  if (BOM === 18761) {
    littleEndian = true;
  } else if (BOM === 19789) {
    littleEndian = false;
  } else {
    throw TypeError("Invalid byte order value.");
  }
  return littleEndian;
};
var hasTowel = function() {
  if (getBytes(2, 2) !== 42) {
    throw RangeError("You forgot your towel!");
    return false;
  }
  return true;
};
var getFieldTagName = function(fieldTag) {
  var fieldTagNames = {
    // TIFF Baseline
    315: "Artist",
    258: "BitsPerSample",
    265: "CellLength",
    264: "CellWidth",
    320: "ColorMap",
    259: "Compression",
    33432: "Copyright",
    306: "DateTime",
    338: "ExtraSamples",
    266: "FillOrder",
    289: "FreeByteCounts",
    288: "FreeOffsets",
    291: "GrayResponseCurve",
    290: "GrayResponseUnit",
    316: "HostComputer",
    270: "ImageDescription",
    257: "ImageLength",
    256: "ImageWidth",
    271: "Make",
    281: "MaxSampleValue",
    280: "MinSampleValue",
    272: "Model",
    254: "NewSubfileType",
    274: "Orientation",
    262: "PhotometricInterpretation",
    284: "PlanarConfiguration",
    296: "ResolutionUnit",
    278: "RowsPerStrip",
    277: "SamplesPerPixel",
    305: "Software",
    279: "StripByteCounts",
    273: "StripOffsets",
    255: "SubfileType",
    263: "Threshholding",
    282: "XResolution",
    283: "YResolution",
    // TIFF Extended
    326: "BadFaxLines",
    327: "CleanFaxData",
    343: "ClipPath",
    328: "ConsecutiveBadFaxLines",
    433: "Decode",
    434: "DefaultImageColor",
    269: "DocumentName",
    336: "DotRange",
    321: "HalftoneHints",
    346: "Indexed",
    347: "JPEGTables",
    285: "PageName",
    297: "PageNumber",
    317: "Predictor",
    319: "PrimaryChromaticities",
    532: "ReferenceBlackWhite",
    339: "SampleFormat",
    559: "StripRowCounts",
    330: "SubIFDs",
    292: "T4Options",
    293: "T6Options",
    325: "TileByteCounts",
    323: "TileLength",
    324: "TileOffsets",
    322: "TileWidth",
    301: "TransferFunction",
    318: "WhitePoint",
    344: "XClipPathUnits",
    286: "XPosition",
    529: "YCbCrCoefficients",
    531: "YCbCrPositioning",
    530: "YCbCrSubSampling",
    345: "YClipPathUnits",
    287: "YPosition",
    // EXIF
    37378: "ApertureValue",
    40961: "ColorSpace",
    36868: "DateTimeDigitized",
    36867: "DateTimeOriginal",
    34665: "Exif IFD",
    36864: "ExifVersion",
    33434: "ExposureTime",
    41728: "FileSource",
    37385: "Flash",
    40960: "FlashpixVersion",
    33437: "FNumber",
    42016: "ImageUniqueID",
    37384: "LightSource",
    37500: "MakerNote",
    37377: "ShutterSpeedValue",
    37510: "UserComment",
    // IPTC
    33723: "IPTC",
    // ICC
    34675: "ICC Profile",
    // XMP
    700: "XMP",
    // GDAL
    42112: "GDAL_METADATA",
    42113: "GDAL_NODATA",
    // Photoshop
    34377: "Photoshop"
  };
  var fieldTagName;
  if (fieldTag in fieldTagNames) {
    fieldTagName = fieldTagNames[fieldTag];
  } else {
    fieldTagName = "Tag" + fieldTag;
  }
  return fieldTagName;
};
var getFieldTypeName = function(fieldType) {
  var fieldTypeNames = {
    1: "BYTE",
    2: "ASCII",
    3: "SHORT",
    4: "LONG",
    5: "RATIONAL",
    6: "SBYTE",
    7: "UNDEFINED",
    8: "SSHORT",
    9: "SLONG",
    10: "SRATIONAL",
    11: "FLOAT",
    12: "DOUBLE"
  };
  var fieldTypeName;
  if (fieldType in fieldTypeNames) {
    fieldTypeName = fieldTypeNames[fieldType];
  }
  return fieldTypeName;
};
var getFieldTypeLength = function(fieldTypeName) {
  var fieldTypeLength;
  if (["BYTE", "ASCII", "SBYTE", "UNDEFINED"].indexOf(fieldTypeName) !== -1) {
    fieldTypeLength = 1;
  } else if (["SHORT", "SSHORT"].indexOf(fieldTypeName) !== -1) {
    fieldTypeLength = 2;
  } else if (["LONG", "SLONG", "FLOAT"].indexOf(fieldTypeName) !== -1) {
    fieldTypeLength = 4;
  } else if (["RATIONAL", "SRATIONAL", "DOUBLE"].indexOf(fieldTypeName) !== -1) {
    fieldTypeLength = 8;
  }
  return fieldTypeLength;
};
var getBits = function(numBits, byteOffset, bitOffset) {
  bitOffset = bitOffset || 0;
  var extraBytes = Math.floor(bitOffset / 8);
  var newByteOffset = byteOffset + extraBytes;
  var totalBits = bitOffset + numBits;
  var shiftRight = 32 - numBits;
  if (totalBits <= 0) {
    throw RangeError("No bits requested");
  } else if (totalBits <= 8) {
    var shiftLeft = 24 + bitOffset;
    var rawBits = tiffDataView.getUint8(newByteOffset, littleEndian);
  } else if (totalBits <= 16) {
    var shiftLeft = 16 + bitOffset;
    var rawBits = tiffDataView.getUint16(newByteOffset, littleEndian);
  } else if (totalBits <= 32) {
    var shiftLeft = bitOffset;
    var rawBits = tiffDataView.getUint32(newByteOffset, littleEndian);
  } else {
    throw RangeError("Too many bits requested");
  }
  var chunkInfo = {
    bits: rawBits << shiftLeft >>> shiftRight,
    byteOffset: newByteOffset + Math.floor(totalBits / 8),
    bitOffset: totalBits % 8
  };
  return chunkInfo;
};
var getBytes = function(numBytes, offset) {
  if (numBytes <= 0) {
    throw RangeError("No bytes requested");
  } else if (numBytes <= 1) {
    return tiffDataView.getUint8(offset, littleEndian);
  } else if (numBytes <= 2) {
    return tiffDataView.getUint16(offset, littleEndian);
  } else if (numBytes <= 3) {
    return tiffDataView.getUint32(offset, littleEndian) >>> 8;
  } else if (numBytes <= 4) {
    return tiffDataView.getUint32(offset, littleEndian);
  } else {
    throw RangeError("Too many bytes requested");
  }
};
var getFieldValues = function(fieldTagName, fieldTypeName, typeCount, valueOffset) {
  var fieldValues = [];
  var fieldTypeLength = getFieldTypeLength(fieldTypeName);
  var fieldValueSize = fieldTypeLength * typeCount;
  if (fieldValueSize <= 4) {
    if (littleEndian === false) {
      var value = valueOffset >>> (4 - fieldTypeLength) * 8;
    } else {
      var value = valueOffset;
    }
    fieldValues.push(value);
  } else {
    for (var i2 = 0; i2 < typeCount; i2++) {
      var indexOffset = fieldTypeLength * i2;
      if (fieldTypeLength >= 8) {
        if (["RATIONAL", "SRATIONAL"].indexOf(fieldTypeName) !== -1) {
          fieldValues.push(getBytes(4, valueOffset + indexOffset));
          fieldValues.push(getBytes(4, valueOffset + indexOffset + 4));
        } else {
          throw TypeError("Can't handle this field type or size");
        }
      } else {
        fieldValues.push(getBytes(fieldTypeLength, valueOffset + indexOffset));
      }
    }
  }
  if (fieldTypeName === "ASCII") {
    fieldValues.forEach(function(e2, i3, a2) {
      a2[i3] = String.fromCharCode(e2);
    });
  }
  return fieldValues;
};
var clampColorSample = function(colorSample, bitsPerSample) {
  var multiplier = Math.pow(2, 8 - bitsPerSample);
  return Math.floor(colorSample * multiplier + (multiplier - 1));
};
var makeRGBAFillValue = function(r2, g2, b2, a2) {
  if (typeof a2 === "undefined") {
    a2 = 1;
  }
  return "rgba(" + r2 + ", " + g2 + ", " + b2 + ", " + a2 + ")";
};
var parseFileDirectory = function(byteOffset) {
  var numDirEntries = getBytes(2, byteOffset);
  var tiffFields = [];
  for (var i2 = byteOffset + 2, entryCount = 0; entryCount < numDirEntries; i2 += 12, entryCount++) {
    var fieldTag = getBytes(2, i2);
    var fieldType = getBytes(2, i2 + 2);
    var typeCount = getBytes(4, i2 + 4);
    var valueOffset = getBytes(4, i2 + 8);
    var fieldTagName = getFieldTagName(fieldTag);
    var fieldTypeName = getFieldTypeName(fieldType);
    var fieldValues = getFieldValues(fieldTagName, fieldTypeName, typeCount, valueOffset);
    tiffFields[fieldTagName] = { type: fieldTypeName, values: fieldValues };
  }
  fileDirectories.push(tiffFields);
  var nextIFDByteOffset = getBytes(4, i2);
  if (nextIFDByteOffset === 0) {
    return fileDirectories;
  } else {
    return parseFileDirectory(nextIFDByteOffset);
  }
};
var parseTIFF = function(tiffArrayBuffer, _canvas2) {
  var canvas = _canvas2 || document.createElement("canvas");
  if (!tiffArrayBuffer)
    return;
  tiffDataView = new DataView(tiffArrayBuffer);
  littleEndian = isLittleEndian2(tiffDataView);
  if (!hasTowel(tiffDataView, littleEndian))
    return;
  var firstIFDByteOffset = getBytes(4, 4);
  fileDirectories = parseFileDirectory(firstIFDByteOffset);
  var fileDirectory = fileDirectories[0];
  var imageWidth = fileDirectory.ImageWidth.values[0];
  var imageLength = fileDirectory.ImageLength.values[0];
  canvas.width = imageWidth;
  canvas.height = imageLength;
  var strips = [];
  var compression = fileDirectory.Compression ? fileDirectory.Compression.values[0] : 1;
  var samplesPerPixel = fileDirectory.SamplesPerPixel.values[0];
  var sampleProperties = [];
  var bitsPerPixel = 0;
  var hasBytesPerPixel = false;
  fileDirectory.BitsPerSample.values.forEach(function(bitsPerSample, i3, bitsPerSampleValues) {
    sampleProperties[i3] = {
      bitsPerSample,
      hasBytesPerSample: false,
      bytesPerSample: void 0
    };
    if (bitsPerSample % 8 === 0) {
      sampleProperties[i3].hasBytesPerSample = true;
      sampleProperties[i3].bytesPerSample = bitsPerSample / 8;
    }
    bitsPerPixel += bitsPerSample;
  }, _this);
  if (bitsPerPixel % 8 === 0) {
    hasBytesPerPixel = true;
    var bytesPerPixel = bitsPerPixel / 8;
  }
  var stripOffsetValues = fileDirectory.StripOffsets.values;
  var numStripOffsetValues = stripOffsetValues.length;
  if (fileDirectory.StripByteCounts) {
    var stripByteCountValues = fileDirectory.StripByteCounts.values;
  } else {
    if (numStripOffsetValues === 1) {
      var stripByteCountValues = [
        Math.ceil(imageWidth * imageLength * bitsPerPixel / 8)
      ];
    } else {
      throw Error("Cannot recover from missing StripByteCounts");
    }
  }
  for (var i2 = 0; i2 < numStripOffsetValues; i2++) {
    var stripOffset = stripOffsetValues[i2];
    strips[i2] = [];
    var stripByteCount = stripByteCountValues[i2];
    for (var byteOffset = 0, bitOffset = 0, jIncrement = 1, getHeader = true, pixel = [], numBytes = 0, sample = 0, currentSample = 0; byteOffset < stripByteCount; byteOffset += jIncrement) {
      switch (compression) {
        // Uncompressed
        case 1:
          for (var m2 = 0, pixel = []; m2 < samplesPerPixel; m2++) {
            if (sampleProperties[m2].hasBytesPerSample) {
              var sampleOffset = sampleProperties[m2].bytesPerSample * m2;
              pixel.push(getBytes(sampleProperties[m2].bytesPerSample, stripOffset + byteOffset + sampleOffset));
            } else {
              var sampleInfo = getBits(sampleProperties[m2].bitsPerSample, stripOffset + byteOffset, bitOffset);
              pixel.push(sampleInfo.bits);
              byteOffset = sampleInfo.byteOffset - stripOffset;
              bitOffset = sampleInfo.bitOffset;
              throw RangeError("Cannot handle sub-byte bits per sample");
            }
          }
          strips[i2].push(pixel);
          if (hasBytesPerPixel) {
            jIncrement = bytesPerPixel;
          } else {
            jIncrement = 0;
            throw RangeError("Cannot handle sub-byte bits per pixel");
          }
          break;
        // CITT Group 3 1-Dimensional Modified Huffman run-length encoding
        case 2:
          break;
        // Group 3 Fax
        case 3:
          break;
        // Group 4 Fax
        case 4:
          break;
        // LZW
        case 5:
          break;
        // Old-style JPEG (TIFF 6.0)
        case 6:
          break;
        // New-style JPEG (TIFF Specification Supplement 2)
        case 7:
          break;
        // PackBits
        case 32773:
          if (getHeader) {
            getHeader = false;
            var blockLength = 1;
            var iterations = 1;
            var header = tiffDataView.getInt8(stripOffset + byteOffset, littleEndian);
            if (header >= 0 && header <= 127) {
              blockLength = header + 1;
            } else if (header >= -127 && header <= -1) {
              iterations = -header + 1;
            } else {
              getHeader = true;
            }
          } else {
            var currentByte = getBytes(1, stripOffset + byteOffset);
            for (var m2 = 0; m2 < iterations; m2++) {
              if (sampleProperties[sample].hasBytesPerSample) {
                currentSample = currentSample << 8 * numBytes | currentByte;
                numBytes++;
                if (numBytes === sampleProperties[sample].bytesPerSample) {
                  pixel.push(currentSample);
                  currentSample = numBytes = 0;
                  sample++;
                }
              } else {
                throw RangeError("Cannot handle sub-byte bits per sample");
              }
              if (sample === samplesPerPixel) {
                strips[i2].push(pixel);
                pixel = [];
                sample = 0;
              }
            }
            blockLength--;
            if (blockLength === 0) {
              getHeader = true;
            }
          }
          jIncrement = 1;
          break;
        // Unknown compression algorithm
        default:
          break;
      }
    }
  }
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = makeRGBAFillValue(255, 255, 255, 0);
    if (fileDirectory.RowsPerStrip) {
      var rowsPerStrip = fileDirectory.RowsPerStrip.values[0];
    } else {
      var rowsPerStrip = imageLength;
    }
    var numStrips = strips.length;
    var imageLengthModRowsPerStrip = imageLength % rowsPerStrip;
    var rowsInLastStrip = imageLengthModRowsPerStrip === 0 ? rowsPerStrip : imageLengthModRowsPerStrip;
    var numRowsInStrip = rowsPerStrip;
    var numRowsInPreviousStrip = 0;
    var photometricInterpretation = fileDirectory.PhotometricInterpretation.values[0];
    var extraSamplesValues = [];
    var numExtraSamples = 0;
    if (fileDirectory.ExtraSamples) {
      extraSamplesValues = fileDirectory.ExtraSamples.values;
      numExtraSamples = extraSamplesValues.length;
    }
    if (fileDirectory.ColorMap) {
      var colorMapValues = fileDirectory.ColorMap.values;
      var colorMapSampleSize = Math.pow(2, sampleProperties[0].bitsPerSample);
    }
    for (var i2 = 0; i2 < numStrips; i2++) {
      if (i2 + 1 === numStrips) {
        numRowsInStrip = rowsInLastStrip;
      }
      var numPixels = strips[i2].length;
      var yPadding = numRowsInPreviousStrip * i2;
      for (var y2 = 0, j2 = 0; y2 < numRowsInStrip, j2 < numPixels; y2++) {
        for (var x2 = 0; x2 < imageWidth; x2++, j2++) {
          var pixelSamples = strips[i2][j2];
          var red = 0;
          var green = 0;
          var blue = 0;
          var opacity = 1;
          if (numExtraSamples > 0) {
            for (var k2 = 0; k2 < numExtraSamples; k2++) {
              if (extraSamplesValues[k2] === 1 || extraSamplesValues[k2] === 2) {
                opacity = pixelSamples[3 + k2] / 256;
                break;
              }
            }
          }
          switch (photometricInterpretation) {
            // Bilevel or Grayscale
            // WhiteIsZero
            case 0:
              if (sampleProperties[0].hasBytesPerSample) {
                var invertValue = Math.pow(16, sampleProperties[0].bytesPerSample * 2);
              }
              pixelSamples.forEach(function(sample2, index, samples) {
                samples[index] = invertValue - sample2;
              });
            // Bilevel or Grayscale
            // BlackIsZero
            case 1:
              red = green = blue = clampColorSample(pixelSamples[0], sampleProperties[0].bitsPerSample);
              break;
            // RGB Full Color
            case 2:
              red = clampColorSample(pixelSamples[0], sampleProperties[0].bitsPerSample);
              green = clampColorSample(pixelSamples[1], sampleProperties[1].bitsPerSample);
              blue = clampColorSample(pixelSamples[2], sampleProperties[2].bitsPerSample);
              break;
            // RGB Color Palette
            case 3:
              if (colorMapValues === void 0) {
                throw Error("Palette image missing color map");
              }
              var colorMapIndex = pixelSamples[0];
              red = clampColorSample(colorMapValues[colorMapIndex], 16);
              green = clampColorSample(colorMapValues[colorMapSampleSize + colorMapIndex], 16);
              blue = clampColorSample(colorMapValues[2 * colorMapSampleSize + colorMapIndex], 16);
              break;
            // Transparency mask
            case 4:
              throw RangeError("Not Yet Implemented: Transparency mask");
              break;
            // CMYK
            case 5:
              throw RangeError("Not Yet Implemented: CMYK");
              break;
            // YCbCr
            case 6:
              throw RangeError("Not Yet Implemented: YCbCr");
              break;
            // CIELab
            case 8:
              throw RangeError("Not Yet Implemented: CIELab");
              break;
            // Unknown Photometric Interpretation
            default:
              throw RangeError("Unknown Photometric Interpretation:", photometricInterpretation);
              break;
          }
          ctx.fillStyle = makeRGBAFillValue(red, green, blue, opacity);
          ctx.fillRect(x2, yPadding + y2, 1, 1);
        }
      }
      numRowsInPreviousStrip = numRowsInStrip;
    }
  }
  return canvas;
};

// node_modules/react-doc-viewer/build/plugins/tiff/index.js
var __makeTemplateObject16 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var __assign13 = function() {
  __assign13 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign13.apply(this, arguments);
};
var TIFFRenderer = function(props) {
  var currentDocument = props.mainState.currentDocument;
  var _a2 = (0, import_react42.useState)(false), loadedCanvas = _a2[0], setLoadedCanvas = _a2[1];
  var _b = (0, import_react42.useState)(false), corruptedFile = _b[0], setCorruptedFile = _b[1];
  (0, import_react42.useEffect)(function() {
    if (!currentDocument || loadedCanvas)
      return;
    var canvas = document.getElementById("tiff-img");
    try {
      canvas && parseTIFF(currentDocument.fileData, canvas);
      setLoadedCanvas(true);
    } catch (error) {
      setCorruptedFile(true);
    }
  }, []);
  if (corruptedFile) {
    return import_react42.default.createElement(
      image_default,
      __assign13({}, props),
      import_react42.default.createElement("div", null, "Your file is corrupted. Please check it on your machine.")
    );
  }
  return import_react42.default.createElement(
    image_default,
    __assign13({}, props),
    import_react42.default.createElement(Canvas2, { id: "tiff-img" })
  );
};
TIFFRenderer.fileTypes = ["tif", "tiff", "image/tif", "image/tiff"];
TIFFRenderer.weight = 0;
TIFFRenderer.fileLoader = arrayBufferFileLoader;
var tiff_default = TIFFRenderer;
var Canvas2 = styled_components_browser_esm_default.canvas(templateObject_116 || (templateObject_116 = __makeTemplateObject16(["\n  max-width: 95%;\n  max-height: 95%;\n"], ["\n  max-width: 95%;\n  max-height: 95%;\n"])));
var templateObject_116;

// node_modules/react-doc-viewer/build/plugins/txt/index.js
var import_react43 = __toESM(require_react());
var __makeTemplateObject17 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var TXTRenderer = function(_a2) {
  var currentDocument = _a2.mainState.currentDocument;
  return import_react43.default.createElement(Container12, { id: "txt-renderer" }, currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData);
};
var txt_default = TXTRenderer;
TXTRenderer.fileTypes = ["txt", "text/plain"];
TXTRenderer.weight = 0;
TXTRenderer.fileLoader = textFileLoader;
var Container12 = styled_components_browser_esm_default.div(templateObject_117 || (templateObject_117 = __makeTemplateObject17(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 30px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 30px;\n"])));
var templateObject_117;

// node_modules/react-doc-viewer/build/theme/index.js
var defaultTheme = {
  primary: "#fff",
  secondary: "#000",
  tertiary: "#ffffff99",
  text_primary: "#000",
  text_secondary: "#fff",
  text_tertiary: "#00000044",
  disableThemeScrollbar: false
};

// node_modules/react-doc-viewer/build/plugins/index.js
var DocViewerRenderers = [
  bmp_default,
  html_default,
  jpg_default,
  msdoc_default,
  msg_default,
  pdf_default,
  png_default,
  tiff_default,
  txt_default
];

// node_modules/react-doc-viewer/build/index.js
var __makeTemplateObject18 = function(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var __assign14 = function() {
  __assign14 = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t2[p] = s2[p];
    }
    return t2;
  };
  return __assign14.apply(this, arguments);
};
var DocViewer = function(props) {
  var documents = props.documents, theme = props.theme;
  if (!documents || documents === void 0) {
    throw new Error("Please provide an array of documents to DocViewer.\ne.g. <DocViewer documents={[ { uri: 'https://mypdf.pdf' } ]} />");
  }
  return import_react44.default.createElement(
    AppProvider,
    __assign14({}, props),
    import_react44.default.createElement(
      Le,
      { theme: theme ? __assign14(__assign14({}, defaultTheme), theme) : defaultTheme },
      import_react44.default.createElement(
        Container13,
        __assign14({ id: "react-doc-viewer", "data-testid": "react-doc-viewer" }, props),
        import_react44.default.createElement(HeaderBar, null),
        import_react44.default.createElement(ProxyRenderer, null)
      )
    )
  );
};
var build_default = DocViewer;
var Container13 = styled_components_browser_esm_default.div(templateObject_118 || (templateObject_118 = __makeTemplateObject18(["\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: #eee;\n"], ["\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: #eee;\n"])));
var templateObject_118;
export {
  bmp_default as BMPRenderer,
  DocViewerRenderers,
  html_default as HTMLRenderer,
  image_default as ImageProxyRenderer,
  jpg_default as JPGRenderer,
  msdoc_default as MSDocRenderer,
  msg_default as MSGRenderer,
  pdf_default as PDFRenderer,
  png_default as PNGRenderer,
  tiff_default as TIFFRenderer,
  txt_default as TXTRenderer,
  arrayBufferFileLoader,
  binaryStringFileLoader,
  dataURLFileLoader,
  build_default as default,
  defaultFileLoader,
  textFileLoader
};
//# sourceMappingURL=react-doc-viewer.js.map
