import {
  BaseComponent,
  BaseStyle
} from "./chunk-6QWP7YDZ.js";
import "./chunk-PJRWSDJ2.js";
import {
  NgControl,
  NgModel
} from "./chunk-VSLWFG2E.js";
import "./chunk-RLI5KEP3.js";
import {
  Directive,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  NgModule,
  Optional,
  Output,
  booleanAttribute,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵclassProp,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵlistener
} from "./chunk-N2APCJKI.js";
import "./chunk-P6U2JBMQ.js";
import "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-textarea.mjs
var theme = ({
  dt
}) => `
.p-textarea {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: ${dt("textarea.color")};
    background: ${dt("textarea.background")};
    padding: ${dt("textarea.padding.y")} ${dt("textarea.padding.x")};
    border: 1px solid ${dt("textarea.border.color")};
    transition: background ${dt("textarea.transition.duration")}, color ${dt("textarea.transition.duration")}, border-color ${dt("textarea.transition.duration")}, outline-color ${dt("textarea.transition.duration")}, box-shadow ${dt("textarea.transition.duration")};
    appearance: none;
    border-radius: ${dt("textarea.border.radius")};
    outline-color: transparent;
    box-shadow: ${dt("textarea.shadow")};
}

.p-textarea.ng-invalid.ng-dirty {
    border-color: ${dt("textarea.invalid.border.color")};
}

.p-textarea:enabled:hover {
    border-color: ${dt("textarea.hover.border.color")};
}

.p-textarea:enabled:focus {
    border-color: ${dt("textarea.focus.border.color")};
    box-shadow: ${dt("textarea.focus.ring.shadow")};
    outline: ${dt("textarea.focus.ring.width")} ${dt("textarea.focus.ring.style")} ${dt("textarea.focus.ring.color")};
    outline-offset: ${dt("textarea.focus.ring.offset")};
}

.p-textarea.p-invalid {
    border-color: ${dt("textarea.invalid.border.color")};
}

.p-textarea.p-variant-filled {
    background: ${dt("textarea.filled.background")};
}

.p-textarea.p-variant-filled:enabled:focus {
    background: ${dt("textarea.filled.focus.background")};
}

.p-textarea:disabled {
    opacity: 1;
    background: ${dt("textarea.disabled.background")};
    color: ${dt("textarea.disabled.color")};
}

.p-textarea::placeholder {
    color: ${dt("textarea.placeholder.color")};
}

.p-textarea.ng-invalid.ng-dirty::placeholder {
    color: ${dt("textarea.invalid.placeholder.color")};
}

.p-textarea-fluid {
    width: 100%;
}

.p-textarea-resizable {
    overflow: hidden;
    resize: none;
}

.p-textarea-sm {
    font-size: ${dt("textarea.sm.font.size")};
    padding-block: ${dt("textarea.sm.padding.y")};
    padding-inline: ${dt("textarea.sm.padding.x")};
}

.p-textarea-lg {
    font-size: ${dt("textarea.lg.font.size")};
    padding-block: ${dt("textarea.lg.padding.y")};
    padding-inline: ${dt("textarea.lg.padding.x")};
}
`;
var classes = {
  root: ({
    instance,
    props
  }) => ["p-textarea p-component", {
    "p-filled": instance.filled,
    "p-textarea-resizable ": props.autoResize,
    "p-invalid": props.invalid,
    "p-variant-filled": props.variant ? props.variant === "filled" : instance.config.inputStyle === "filled" || instance.config.inputVariant === "filled",
    "p-textarea-fluid": props.fluid
  }]
};
var TextareaStyle = class _TextareaStyle extends BaseStyle {
  name = "textarea";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTextareaStyle_BaseFactory;
    return function TextareaStyle_Factory(__ngFactoryType__) {
      return (ɵTextareaStyle_BaseFactory || (ɵTextareaStyle_BaseFactory = ɵɵgetInheritedFactory(_TextareaStyle)))(__ngFactoryType__ || _TextareaStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TextareaStyle,
    factory: _TextareaStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextareaStyle, [{
    type: Injectable
  }], null, null);
})();
var TextareaClasses;
(function(TextareaClasses2) {
  TextareaClasses2["root"] = "p-textarea";
})(TextareaClasses || (TextareaClasses = {}));
var Textarea = class _Textarea extends BaseComponent {
  ngModel;
  control;
  /**
   * When present, textarea size changes as being typed.
   * @group Props
   */
  autoResize;
  /**
   * Specifies the input variant of the component.
   * @group Props
   */
  variant;
  /**
   * Spans 100% width of the container when enabled.
   * @group Props
   */
  fluid = false;
  /**
   * Defines the size of the component.
   * @group Props
   */
  pSize;
  /**
   * Callback to invoke on textarea resize.
   * @param {(Event | {})} event - Custom resize event.
   * @group Emits
   */
  onResize = new EventEmitter();
  filled;
  cachedScrollHeight;
  ngModelSubscription;
  ngControlSubscription;
  _componentStyle = inject(TextareaStyle);
  constructor(ngModel, control) {
    super();
    this.ngModel = ngModel;
    this.control = control;
  }
  ngOnInit() {
    super.ngOnInit();
    if (this.ngModel) {
      this.ngModelSubscription = this.ngModel.valueChanges.subscribe(() => {
        this.updateState();
      });
    }
    if (this.control) {
      this.ngControlSubscription = this.control.valueChanges.subscribe(() => {
        this.updateState();
      });
    }
  }
  get hasFluid() {
    const nativeElement = this.el.nativeElement;
    const fluidComponent = nativeElement.closest("p-fluid");
    return this.fluid || !!fluidComponent;
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.autoResize) this.resize();
    this.updateFilledState();
    this.cd.detectChanges();
  }
  onInput(e) {
    this.updateState();
  }
  updateFilledState() {
    this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
  }
  resize(event) {
    this.el.nativeElement.style.height = "auto";
    this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + "px";
    if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
      this.el.nativeElement.style.overflowY = "scroll";
      this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
    } else {
      this.el.nativeElement.style.overflow = "hidden";
    }
    this.onResize.emit(event || {});
  }
  updateState() {
    this.updateFilledState();
    if (this.autoResize) {
      this.resize();
    }
  }
  ngOnDestroy() {
    if (this.ngModelSubscription) {
      this.ngModelSubscription.unsubscribe();
    }
    if (this.ngControlSubscription) {
      this.ngControlSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }
  static ɵfac = function Textarea_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Textarea)(ɵɵdirectiveInject(NgModel, 8), ɵɵdirectiveInject(NgControl, 8));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _Textarea,
    selectors: [["", "pTextarea", ""]],
    hostAttrs: [1, "p-textarea", "p-component"],
    hostVars: 16,
    hostBindings: function Textarea_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function Textarea_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        });
      }
      if (rf & 2) {
        ɵɵclassProp("p-filled", ctx.filled)("p-textarea-resizable", ctx.autoResize)("p-variant-filled", ctx.variant === "filled" || ctx.config.inputStyle() === "filled" || ctx.config.inputVariant() === "filled")("p-textarea-fluid", ctx.hasFluid)("p-textarea-sm", ctx.pSize === "small")("p-inputfield-sm", ctx.pSize === "small")("p-textarea-lg", ctx.pSize === "large")("p-inputfield-lg", ctx.pSize === "large");
      }
    },
    inputs: {
      autoResize: [2, "autoResize", "autoResize", booleanAttribute],
      variant: "variant",
      fluid: [2, "fluid", "fluid", booleanAttribute],
      pSize: "pSize"
    },
    outputs: {
      onResize: "onResize"
    },
    features: [ɵɵProvidersFeature([TextareaStyle]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Textarea, [{
    type: Directive,
    args: [{
      selector: "[pTextarea]",
      standalone: true,
      host: {
        class: "p-textarea p-component",
        "[class.p-filled]": "filled",
        "[class.p-textarea-resizable]": "autoResize",
        "[class.p-variant-filled]": 'variant === "filled" || config.inputStyle() === "filled" || config.inputVariant() === "filled"',
        "[class.p-textarea-fluid]": "hasFluid",
        "[class.p-textarea-sm]": 'pSize === "small"',
        "[class.p-inputfield-sm]": 'pSize === "small"',
        "[class.p-textarea-lg]": 'pSize === "large"',
        "[class.p-inputfield-lg]": 'pSize === "large"'
      },
      providers: [TextareaStyle]
    }]
  }], () => [{
    type: NgModel,
    decorators: [{
      type: Optional
    }]
  }, {
    type: NgControl,
    decorators: [{
      type: Optional
    }]
  }], {
    autoResize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    variant: [{
      type: Input
    }],
    fluid: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    pSize: [{
      type: Input
    }],
    onResize: [{
      type: Output
    }],
    onInput: [{
      type: HostListener,
      args: ["input", ["$event"]]
    }]
  });
})();
var TextareaModule = class _TextareaModule {
  static ɵfac = function TextareaModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TextareaModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TextareaModule,
    imports: [Textarea],
    exports: [Textarea]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextareaModule, [{
    type: NgModule,
    args: [{
      imports: [Textarea],
      exports: [Textarea]
    }]
  }], null, null);
})();
export {
  Textarea,
  TextareaClasses,
  TextareaModule,
  TextareaStyle
};
//# sourceMappingURL=primeng_textarea.js.map
