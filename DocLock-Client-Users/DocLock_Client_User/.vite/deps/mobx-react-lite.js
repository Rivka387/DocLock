import {
  Reaction,
  configure,
  getDependencyTree,
  makeObservable,
  observable,
  runInAction
} from "./chunk-EO3B5VLT.js";
import {
  require_react_dom
} from "./chunk-YLU6T4TF.js";
import {
  require_react
} from "./chunk-W5UAQKRE.js";
import {
  __commonJS,
  __toESM
} from "./chunk-OL46QLBJ.js";

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    (function() {
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React2.startTransition || (didWarnOld18Alpha = true, console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
          var cachedValue = getSnapshot();
          objectIs(value, cachedValue) || (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true);
        }
        cachedValue = useState5({
          inst: { value, getSnapshot }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          },
          [subscribe, value, getSnapshot]
        );
        useEffect(
          function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            return subscribe(function() {
              checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            });
          },
          [subscribe]
        );
        useDebugValue(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React2 = require_react(), objectIs = "function" === typeof Object.is ? Object.is : is, useState5 = React2.useState, useEffect = React2.useEffect, useLayoutEffect = React2.useLayoutEffect, useDebugValue = React2.useDebugValue, didWarnOld18Alpha = false, didWarnUncachedGetSnapshot = false, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
      exports.useSyncExternalStore = void 0 !== React2.useSyncExternalStore ? React2.useSyncExternalStore : shim;
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/mobx-react-lite/es/utils/assertEnvironment.js
var import_react = __toESM(require_react());
if (!import_react.useState) {
  throw new Error("mobx-react-lite requires React with Hooks support");
}
if (!makeObservable) {
  throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");
}

// node_modules/mobx-react-lite/es/utils/reactBatchedUpdates.js
var import_react_dom = __toESM(require_react_dom());

// node_modules/mobx-react-lite/es/utils/observerBatching.js
function defaultNoopBatch(callback) {
  callback();
}
function observerBatching(reactionScheduler) {
  if (!reactionScheduler) {
    reactionScheduler = defaultNoopBatch;
    if (true) {
      console.warn("[MobX] Failed to get unstable_batched updates from react-dom / react-native");
    }
  }
  configure({ reactionScheduler });
}
var isObserverBatched = function() {
  if (true) {
    console.warn("[MobX] Deprecated");
  }
  return true;
};

// node_modules/mobx-react-lite/es/utils/utils.js
var deprecatedMessages = [];
function useDeprecated(msg) {
  if (!deprecatedMessages.includes(msg)) {
    deprecatedMessages.push(msg);
    console.warn(msg);
  }
}

// node_modules/mobx-react-lite/es/useObserver.js
var import_react2 = __toESM(require_react());

// node_modules/mobx-react-lite/es/utils/printDebugValue.js
function printDebugValue(v) {
  return getDependencyTree(v);
}

// node_modules/mobx-react-lite/es/staticRendering.js
var globalIsUsingStaticRendering = false;
function enableStaticRendering(enable) {
  globalIsUsingStaticRendering = enable;
}
function isUsingStaticRendering() {
  return globalIsUsingStaticRendering;
}

// node_modules/mobx-react-lite/es/utils/UniversalFinalizationRegistry.js
var REGISTRY_FINALIZE_AFTER = 1e4;
var REGISTRY_SWEEP_INTERVAL = 1e4;
var TimerBasedFinalizationRegistry = (
  /** @class */
  function() {
    function TimerBasedFinalizationRegistry2(finalize) {
      var _this = this;
      Object.defineProperty(this, "finalize", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: finalize
      });
      Object.defineProperty(this, "registrations", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /* @__PURE__ */ new Map()
      });
      Object.defineProperty(this, "sweepTimeout", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "sweep", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function(maxAge) {
          if (maxAge === void 0) {
            maxAge = REGISTRY_FINALIZE_AFTER;
          }
          clearTimeout(_this.sweepTimeout);
          _this.sweepTimeout = void 0;
          var now = Date.now();
          _this.registrations.forEach(function(registration, token) {
            if (now - registration.registeredAt >= maxAge) {
              _this.finalize(registration.value);
              _this.registrations.delete(token);
            }
          });
          if (_this.registrations.size > 0) {
            _this.scheduleSweep();
          }
        }
      });
      Object.defineProperty(this, "finalizeAllImmediately", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function() {
          _this.sweep(0);
        }
      });
    }
    Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "register", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(target, value, token) {
        this.registrations.set(token, {
          value,
          registeredAt: Date.now()
        });
        this.scheduleSweep();
      }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "unregister", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(token) {
        this.registrations.delete(token);
      }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "scheduleSweep", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function() {
        if (this.sweepTimeout === void 0) {
          this.sweepTimeout = setTimeout(this.sweep, REGISTRY_SWEEP_INTERVAL);
        }
      }
    });
    return TimerBasedFinalizationRegistry2;
  }()
);
var UniversalFinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : TimerBasedFinalizationRegistry;

// node_modules/mobx-react-lite/es/utils/observerFinalizationRegistry.js
var observerFinalizationRegistry = new UniversalFinalizationRegistry(function(adm) {
  var _a3;
  (_a3 = adm.reaction) === null || _a3 === void 0 ? void 0 : _a3.dispose();
  adm.reaction = null;
});

// node_modules/mobx-react-lite/es/useObserver.js
var import_shim = __toESM(require_shim());
function createReaction(adm) {
  adm.reaction = new Reaction("observer".concat(adm.name), function() {
    var _a3;
    adm.stateVersion = Symbol();
    (_a3 = adm.onStoreChange) === null || _a3 === void 0 ? void 0 : _a3.call(adm);
  });
}
function useObserver(render, baseComponentName) {
  if (baseComponentName === void 0) {
    baseComponentName = "observed";
  }
  if (isUsingStaticRendering()) {
    return render();
  }
  var admRef = import_react2.default.useRef(null);
  if (!admRef.current) {
    var adm_1 = {
      reaction: null,
      onStoreChange: null,
      stateVersion: Symbol(),
      name: baseComponentName,
      subscribe: function(onStoreChange) {
        observerFinalizationRegistry.unregister(adm_1);
        adm_1.onStoreChange = onStoreChange;
        if (!adm_1.reaction) {
          createReaction(adm_1);
          adm_1.stateVersion = Symbol();
        }
        return function() {
          var _a3;
          adm_1.onStoreChange = null;
          (_a3 = adm_1.reaction) === null || _a3 === void 0 ? void 0 : _a3.dispose();
          adm_1.reaction = null;
        };
      },
      getSnapshot: function() {
        return adm_1.stateVersion;
      }
    };
    admRef.current = adm_1;
  }
  var adm = admRef.current;
  if (!adm.reaction) {
    createReaction(adm);
    observerFinalizationRegistry.register(admRef, adm, adm);
  }
  import_react2.default.useDebugValue(adm.reaction, printDebugValue);
  (0, import_shim.useSyncExternalStore)(
    // Both of these must be stable, otherwise it would keep resubscribing every render.
    adm.subscribe,
    adm.getSnapshot,
    adm.getSnapshot
  );
  var renderResult;
  var exception;
  adm.reaction.track(function() {
    try {
      renderResult = render();
    } catch (e) {
      exception = e;
    }
  });
  if (exception) {
    throw exception;
  }
  return renderResult;
}

// node_modules/mobx-react-lite/es/observer.js
var import_react3 = __toESM(require_react());
var _a;
var _b;
var warnObserverOptionsDeprecated = true;
var warnLegacyContextTypes = true;
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var isFunctionNameConfigurable = (_b = (_a = Object.getOwnPropertyDescriptor(function() {
}, "name")) === null || _a === void 0 ? void 0 : _a.configurable) !== null && _b !== void 0 ? _b : false;
var ReactForwardRefSymbol = hasSymbol ? Symbol.for("react.forward_ref") : typeof import_react3.forwardRef === "function" && (0, import_react3.forwardRef)(function(props) {
  return null;
})["$$typeof"];
var ReactMemoSymbol = hasSymbol ? Symbol.for("react.memo") : typeof import_react3.memo === "function" && (0, import_react3.memo)(function(props) {
  return null;
})["$$typeof"];
function observer(baseComponent, options) {
  var _a3;
  if (warnObserverOptionsDeprecated && options) {
    warnObserverOptionsDeprecated = false;
    console.warn("[mobx-react-lite] `observer(fn, { forwardRef: true })` is deprecated, use `observer(React.forwardRef(fn))`");
  }
  if (ReactMemoSymbol && baseComponent["$$typeof"] === ReactMemoSymbol) {
    throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
  }
  if (isUsingStaticRendering()) {
    return baseComponent;
  }
  var useForwardRef = (_a3 = options === null || options === void 0 ? void 0 : options.forwardRef) !== null && _a3 !== void 0 ? _a3 : false;
  var render = baseComponent;
  var baseComponentName = baseComponent.displayName || baseComponent.name;
  if (ReactForwardRefSymbol && baseComponent["$$typeof"] === ReactForwardRefSymbol) {
    useForwardRef = true;
    render = baseComponent["render"];
    if (typeof render !== "function") {
      throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");
    }
  }
  var observerComponent = function(props, ref) {
    return useObserver(function() {
      return render(props, ref);
    }, baseComponentName);
  };
  observerComponent.displayName = baseComponent.displayName;
  if (isFunctionNameConfigurable) {
    Object.defineProperty(observerComponent, "name", {
      value: baseComponent.name,
      writable: true,
      configurable: true
    });
  }
  if (baseComponent.contextTypes) {
    ;
    observerComponent.contextTypes = baseComponent.contextTypes;
    if (warnLegacyContextTypes) {
      warnLegacyContextTypes = false;
      console.warn("[mobx-react-lite] Support for Legacy Context in function components will be removed in the next major release.");
    }
  }
  if (useForwardRef) {
    observerComponent = (0, import_react3.forwardRef)(observerComponent);
  }
  observerComponent = (0, import_react3.memo)(observerComponent);
  copyStaticProperties(baseComponent, observerComponent);
  if (true) {
    Object.defineProperty(observerComponent, "contextTypes", {
      set: function() {
        var _a4, _b2;
        throw new Error("[mobx-react-lite] `".concat(this.displayName || ((_a4 = this.type) === null || _a4 === void 0 ? void 0 : _a4.displayName) || ((_b2 = this.type) === null || _b2 === void 0 ? void 0 : _b2.name) || "Component", ".contextTypes` must be set before applying `observer`."));
      }
    });
  }
  return observerComponent;
}
var hoistBlackList = {
  $$typeof: true,
  render: true,
  compare: true,
  type: true,
  // Don't redefine `displayName`,
  // it's defined as getter-setter pair on `memo` (see #3192).
  displayName: true
};
function copyStaticProperties(base, target) {
  Object.keys(base).forEach(function(key) {
    if (!hoistBlackList[key]) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
    }
  });
}

// node_modules/mobx-react-lite/es/ObserverComponent.js
function ObserverComponent(_a3) {
  var children = _a3.children, render = _a3.render;
  if (children && render) {
    console.error("MobX Observer: Do not use children and render in the same time in `Observer`");
  }
  var component = children || render;
  if (typeof component !== "function") {
    return null;
  }
  return useObserver(component);
}
if (true) {
  ObserverComponent.propTypes = {
    children: ObserverPropsCheck,
    render: ObserverPropsCheck
  };
}
ObserverComponent.displayName = "Observer";
function ObserverPropsCheck(props, key, componentName, location, propFullName) {
  var extraKey = key === "children" ? "render" : "children";
  var hasProp = typeof props[key] === "function";
  var hasExtraProp = typeof props[extraKey] === "function";
  if (hasProp && hasExtraProp) {
    return new Error("MobX Observer: Do not use children and render in the same time in`" + componentName);
  }
  if (hasProp || hasExtraProp) {
    return null;
  }
  return new Error("Invalid prop `" + propFullName + "` of type `" + typeof props[key] + "` supplied to `" + componentName + "`, expected `function`.");
}

// node_modules/mobx-react-lite/es/useLocalObservable.js
var import_react4 = __toESM(require_react());
function useLocalObservable(initializer, annotations) {
  return (0, import_react4.useState)(function() {
    return observable(initializer(), annotations, { autoBind: true });
  })[0];
}

// node_modules/mobx-react-lite/es/useLocalStore.js
var import_react6 = __toESM(require_react());

// node_modules/mobx-react-lite/es/useAsObservableSource.js
var import_react5 = __toESM(require_react());
function useAsObservableSource(current) {
  if (true)
    useDeprecated("[mobx-react-lite] 'useAsObservableSource' is deprecated, please store the values directly in an observable, for example by using 'useLocalObservable', and sync future updates using 'useEffect' when needed. See the README for examples.");
  var res = (0, import_react5.useState)(function() {
    return observable(current, {}, { deep: false });
  })[0];
  runInAction(function() {
    Object.assign(res, current);
  });
  return res;
}

// node_modules/mobx-react-lite/es/useLocalStore.js
function useLocalStore(initializer, current) {
  if (true) {
    useDeprecated("[mobx-react-lite] 'useLocalStore' is deprecated, use 'useLocalObservable' instead.");
  }
  var source = current && useAsObservableSource(current);
  return (0, import_react6.useState)(function() {
    return observable(initializer(source), void 0, { autoBind: true });
  })[0];
}

// node_modules/mobx-react-lite/es/index.js
var _a2;
observerBatching(import_react_dom.unstable_batchedUpdates);
var clearTimers = (_a2 = observerFinalizationRegistry["finalizeAllImmediately"]) !== null && _a2 !== void 0 ? _a2 : function() {
};
function useObserver2(fn, baseComponentName) {
  if (baseComponentName === void 0) {
    baseComponentName = "observed";
  }
  if (true) {
    useDeprecated("[mobx-react-lite] 'useObserver(fn)' is deprecated. Use `<Observer>{fn}</Observer>` instead, or wrap the entire component in `observer`.");
  }
  return useObserver(fn, baseComponentName);
}
function useStaticRendering(enable) {
  if (true) {
    console.warn("[mobx-react-lite] 'useStaticRendering' is deprecated, use 'enableStaticRendering' instead");
  }
  enableStaticRendering(enable);
}
export {
  ObserverComponent as Observer,
  observerFinalizationRegistry as _observerFinalizationRegistry,
  clearTimers,
  enableStaticRendering,
  isObserverBatched,
  isUsingStaticRendering,
  observer,
  observerBatching,
  useAsObservableSource,
  useLocalObservable,
  useLocalStore,
  useObserver2 as useObserver,
  useStaticRendering
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=mobx-react-lite.js.map
