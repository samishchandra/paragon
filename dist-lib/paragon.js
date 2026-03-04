import { jsxs as I, jsx as m, Fragment as be } from "react/jsx-runtime";
import { useEditorState as nc, ReactNodeViewRenderer as ao, NodeViewWrapper as bn, NodeViewContent as Rs, useEditor as Nd, EditorContent as Ad } from "@tiptap/react";
import * as T from "react";
import X, { useState as U, useRef as V, useEffect as G, useLayoutEffect as io, memo as Vt, useCallback as B, useImperativeHandle as Ld, createContext as rc, useContext as oc, useMemo as Yt, Component as Id, useReducer as Rd, forwardRef as Pd } from "react";
import { Image as Ps, X as ht, Link2 as Os, Type as co, Undo as Od, Redo as _d, Bold as _s, Italic as $s, Underline as Hs, Strikethrough as Ws, Code as sc, Highlighter as ac, Link as zs, ChevronDown as At, List as Bs, ListOrdered as Fs, CheckSquare as Us, Quote as Ys, Code2 as ic, IndentIncrease as $d, IndentDecrease as Hd, Table as us, Minus as cc, Info as Kr, BookOpen as js, PenLine as Wd, Library as zd, ListTodo as Vs, Columns as Ba, Trash2 as dn, Rows as Fa, ToggleLeft as Ua, ArrowUpDown as Bd, Sparkles as lo, Copy as Kt, Search as Fd, ChevronUp as Ud, MousePointerClick as Yd, CaseSensitive as jd, WholeWord as Vd, Regex as Kd, Replace as ds, ReplaceAll as Gd, Plus as Ks, Check as Gt, ClipboardList as qd, MessageSquareText as lc, StickyNote as uc, ChevronRight as dc, ChevronLeftIcon as Xd, ChevronRightIcon as Zd, ChevronDownIcon as Qd, Calendar as fc, Hash as Ya, Cloud as Jd, Loader2 as mc, CloudOff as ef, AlertCircle as tf, RotateCcw as Gs, Activity as nf, Maximize2 as pc, Minimize2 as hc, AlertTriangle as rf, CheckCircle2 as of, Eye as sf, FileText as qs, FileCode as af, ExternalLink as cf, Pencil as lf, Unlink as uf, Heading1 as df, Heading2 as ff, Heading3 as mf, Heading4 as pf, Heading5 as hf, ImagePlus as gf, MessageSquare as gc, RefreshCw as yf, SpellCheck as vf, PanelRightClose as bf, PanelRightOpen as wf } from "lucide-react";
import * as yc from "react-dom";
import xf, { createPortal as kf } from "react-dom";
import { TextSelection as qe, Plugin as Ne, PluginKey as Ae, NodeSelection as Cf, AllSelection as Mf } from "@tiptap/pm/state";
import { Fragment as Tf, DOMSerializer as Sf } from "@tiptap/pm/model";
import Ef from "@tiptap/starter-kit";
import Df from "@tiptap/extension-placeholder";
import Nf from "@tiptap/extension-text-align";
import Af from "@tiptap/extension-highlight";
import Lf from "@tiptap/extension-link";
import { Table as If } from "@tiptap/extension-table";
import Rf from "@tiptap/extension-table-row";
import Pf from "@tiptap/extension-table-cell";
import Of from "@tiptap/extension-table-header";
import { Extension as Je, Node as uo, mergeAttributes as Cn, InputRule as Oe, Mark as vc } from "@tiptap/core";
import { DecorationSet as Ye, Decoration as Xe } from "@tiptap/pm/view";
import _f from "@tiptap/extension-bullet-list";
import $f from "@tiptap/extension-ordered-list";
import Hf from "@tiptap/extension-list-item";
import Wf from "@tiptap/extension-task-list";
import zf from "@tiptap/extension-task-item";
import { findWrapping as ja, canJoin as Bf } from "@tiptap/pm/transform";
import Ff from "@tiptap/extension-underline";
import Uf from "@tiptap/extension-subscript";
import Yf from "@tiptap/extension-superscript";
import jf from "@tiptap/extension-typography";
import Vf from "@tiptap/extension-code-block-lowlight";
import { createLowlight as Kf } from "lowlight";
import Xs from "highlight.js/lib/languages/javascript";
import Zs from "highlight.js/lib/languages/typescript";
import bc from "highlight.js/lib/languages/python";
import Qs from "highlight.js/lib/languages/xml";
import Gf from "highlight.js/lib/languages/css";
import qf from "highlight.js/lib/languages/json";
import fo from "highlight.js/lib/languages/bash";
import Xf from "@tiptap/extension-image";
import { createRoot as Zf } from "react-dom/client";
import { liftListItem as Va, sinkListItem as Ka } from "@tiptap/pm/schema-list";
import { undo as Qf, redo as Jf } from "@tiptap/pm/history";
import em from "@tiptap/extension-horizontal-rule";
import tm from "@tiptap/extension-code";
function wc({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = U(""), [i, a] = U(""), [c, l] = U(""), [u, d] = U(!1), f = V(null), p = V(null);
  G(() => {
    e && (s(""), a(""), l(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), G(() => {
    if (!e) return;
    const b = (w) => {
      p.current && !p.current.contains(w.target) && t();
    }, x = (w) => {
      w.key === "Escape" && t();
    }, S = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return document.addEventListener("keydown", x), () => {
      clearTimeout(S), document.removeEventListener("mousedown", b), document.removeEventListener("keydown", x);
    };
  }, [e, t]);
  const h = (b) => {
    if (!b.trim())
      return l("Please enter an image URL"), !1;
    try {
      const x = new URL(b);
      if (!["http:", "https:", "data:"].includes(x.protocol))
        return l("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return l("Please enter a valid URL"), !1;
    }
    return l(""), !0;
  }, g = async () => {
    if (!h(o)) return;
    d(!0);
    const b = new window.Image();
    b.onload = () => {
      d(!1), n(o.trim(), i.trim()), t();
    }, b.onerror = () => {
      d(!1), n(o.trim(), i.trim()), t();
    }, setTimeout(() => {
      u && (d(!1), n(o.trim(), i.trim()), t());
    }, 3e3), b.src = o.trim();
  }, y = (b) => {
    b.key === "Enter" && !b.shiftKey && (b.preventDefault(), g());
  };
  if (!e) return null;
  const v = r ? {
    top: r.top,
    left: Math.min(r.left, typeof window < "u" ? window.innerWidth - 340 : r.left)
  } : { top: "50%", left: "50%" };
  return /* @__PURE__ */ I(
    "div",
    {
      ref: p,
      className: "image-url-dialog fixed z-50",
      style: {
        top: (typeof v.top == "number", v.top),
        left: typeof v.left == "number" ? Math.max(8, v.left) : v.left,
        transform: r ? void 0 : "translate(-50%, -50%)"
      },
      children: [
        /* @__PURE__ */ I("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ I("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ m(Ps, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ m("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(ht, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ I("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ I("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ I("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(Os, { size: 12 }),
              "Image URL"
            ] }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: f,
                type: "url",
                value: o,
                onChange: (b) => {
                  s(b.target.value), c && l("");
                },
                onKeyDown: y,
                placeholder: "https://example.com/image.jpg",
                className: `image-url-dialog-input ${c ? "error" : ""}`
              }
            ),
            c && /* @__PURE__ */ m("span", { className: "image-url-dialog-error", children: c })
          ] }),
          /* @__PURE__ */ I("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ I("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(co, { size: 12 }),
              "Alt Text (optional)"
            ] }),
            /* @__PURE__ */ m(
              "input",
              {
                type: "text",
                value: i,
                onChange: (b) => a(b.target.value),
                onKeyDown: y,
                placeholder: "Describe the image",
                className: "image-url-dialog-input"
              }
            )
          ] }),
          /* @__PURE__ */ I("div", { className: "image-url-dialog-actions", children: [
            /* @__PURE__ */ m(
              "button",
              {
                onClick: t,
                className: "image-url-dialog-btn image-url-dialog-btn-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ m(
              "button",
              {
                onClick: g,
                disabled: u || !o.trim(),
                className: "image-url-dialog-btn image-url-dialog-btn-insert",
                children: u ? "Validating..." : "Insert Image"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ie(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function Ga(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function mo(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = Ga(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : Ga(e[o], null);
        }
      };
  };
}
function Re(...e) {
  return T.useCallback(mo(...e), e);
}
function Mn(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = T.createContext(i), c = n.length;
    n = [...n, i];
    const l = (d) => {
      const { scope: f, children: p, ...h } = d, g = f?.[e]?.[c] || a, y = T.useMemo(() => h, Object.values(h));
      return /* @__PURE__ */ m(g.Provider, { value: y, children: p });
    };
    l.displayName = s + "Provider";
    function u(d, f) {
      const p = f?.[e]?.[c] || a, h = T.useContext(p);
      if (h) return h;
      if (i !== void 0) return i;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [l, u];
  }
  const o = () => {
    const s = n.map((i) => T.createContext(i));
    return function(a) {
      const c = a?.[e] || s;
      return T.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: c } }),
        [a, c]
      );
    };
  };
  return o.scopeName = e, [r, nm(o, ...t)];
}
function nm(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const i = r.reduce((a, { useScope: c, scopeName: l }) => {
        const d = c(s)[`__scope${l}`];
        return { ...a, ...d };
      }, {});
      return T.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Lt = globalThis?.document ? T.useLayoutEffect : () => {
}, rm = T[" useInsertionEffect ".trim().toString()] || Lt;
function Js({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = om({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, c = a ? e : o;
  {
    const u = T.useRef(e !== void 0);
    T.useEffect(() => {
      const d = u.current;
      d !== a && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = a;
    }, [a, r]);
  }
  const l = T.useCallback(
    (u) => {
      if (a) {
        const d = sm(u) ? u(e) : u;
        d !== e && i.current?.(d);
      } else
        s(u);
    },
    [a, e, s, i]
  );
  return [c, l];
}
function om({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = T.useState(e), o = T.useRef(n), s = T.useRef(t);
  return rm(() => {
    s.current = t;
  }, [t]), T.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function sm(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function Yn(e) {
  const t = /* @__PURE__ */ im(e), n = T.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = T.Children.toArray(s), c = a.find(lm);
    if (c) {
      const l = c.props.children, u = a.map((d) => d === c ? T.Children.count(l) > 1 ? T.Children.only(null) : T.isValidElement(l) ? l.props.children : null : d);
      return /* @__PURE__ */ m(t, { ...i, ref: o, children: T.isValidElement(l) ? T.cloneElement(l, void 0, u) : null });
    }
    return /* @__PURE__ */ m(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var am = /* @__PURE__ */ Yn("Slot");
// @__NO_SIDE_EFFECTS__
function im(e) {
  const t = T.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (T.isValidElement(o)) {
      const i = dm(o), a = um(s, o.props);
      return o.type !== T.Fragment && (a.ref = r ? mo(r, i) : i), T.cloneElement(o, a);
    }
    return T.Children.count(o) > 1 ? T.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var xc = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function cm(e) {
  const t = ({ children: n }) => /* @__PURE__ */ m(be, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = xc, t;
}
function lm(e) {
  return T.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === xc;
}
function um(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...a) => {
      const c = s(...a);
      return o(...a), c;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function dm(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var fm = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Le = fm.reduce((e, t) => {
  const n = /* @__PURE__ */ Yn(`Primitive.${t}`), r = T.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(c, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function kc(e, t) {
  e && yc.flushSync(() => e.dispatchEvent(t));
}
function Cc(e) {
  const t = e + "CollectionProvider", [n, r] = Mn(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (g) => {
    const { scope: y, children: v } = g, b = X.useRef(null), x = X.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ m(o, { scope: y, itemMap: x, collectionRef: b, children: v });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ Yn(a), l = X.forwardRef(
    (g, y) => {
      const { scope: v, children: b } = g, x = s(a, v), S = Re(y, x.collectionRef);
      return /* @__PURE__ */ m(c, { ref: S, children: b });
    }
  );
  l.displayName = a;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ Yn(u), p = X.forwardRef(
    (g, y) => {
      const { scope: v, children: b, ...x } = g, S = X.useRef(null), w = Re(y, S), C = s(u, v);
      return X.useEffect(() => (C.itemMap.set(S, { ref: S, ...x }), () => void C.itemMap.delete(S))), /* @__PURE__ */ m(f, { [d]: "", ref: w, children: b });
    }
  );
  p.displayName = u;
  function h(g) {
    const y = s(e + "CollectionConsumer", g);
    return X.useCallback(() => {
      const b = y.collectionRef.current;
      if (!b) return [];
      const x = Array.from(b.querySelectorAll(`[${d}]`));
      return Array.from(y.itemMap.values()).sort(
        (C, E) => x.indexOf(C.ref.current) - x.indexOf(E.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: i, Slot: l, ItemSlot: p },
    h,
    r
  ];
}
var mm = T.createContext(void 0);
function Mc(e) {
  const t = T.useContext(mm);
  return e || t || "ltr";
}
function gt(e) {
  const t = T.useRef(e);
  return T.useEffect(() => {
    t.current = e;
  }), T.useMemo(() => (...n) => t.current?.(...n), []);
}
function pm(e, t = globalThis?.document) {
  const n = gt(e);
  T.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var hm = "DismissableLayer", fs = "dismissableLayer.update", gm = "dismissableLayer.pointerDownOutside", ym = "dismissableLayer.focusOutside", qa, Tc = T.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), ea = T.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...c
    } = e, l = T.useContext(Tc), [u, d] = T.useState(null), f = u?.ownerDocument ?? globalThis?.document, [, p] = T.useState({}), h = Re(t, (E) => d(E)), g = Array.from(l.layers), [y] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), v = g.indexOf(y), b = u ? g.indexOf(u) : -1, x = l.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= v, w = wm((E) => {
      const k = E.target, N = [...l.branches].some((M) => M.contains(k));
      !S || N || (o?.(E), i?.(E), E.defaultPrevented || a?.());
    }, f), C = xm((E) => {
      const k = E.target;
      [...l.branches].some((M) => M.contains(k)) || (s?.(E), i?.(E), E.defaultPrevented || a?.());
    }, f);
    return pm((E) => {
      b === l.layers.size - 1 && (r?.(E), !E.defaultPrevented && a && (E.preventDefault(), a()));
    }, f), T.useEffect(() => {
      if (u)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (qa = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(u)), l.layers.add(u), Xa(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = qa);
        };
    }, [u, f, n, l]), T.useEffect(() => () => {
      u && (l.layers.delete(u), l.layersWithOutsidePointerEventsDisabled.delete(u), Xa());
    }, [u, l]), T.useEffect(() => {
      const E = () => p({});
      return document.addEventListener(fs, E), () => document.removeEventListener(fs, E);
    }, []), /* @__PURE__ */ m(
      Le.div,
      {
        ...c,
        ref: h,
        style: {
          pointerEvents: x ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ie(e.onFocusCapture, C.onFocusCapture),
        onBlurCapture: ie(e.onBlurCapture, C.onBlurCapture),
        onPointerDownCapture: ie(
          e.onPointerDownCapture,
          w.onPointerDownCapture
        )
      }
    );
  }
);
ea.displayName = hm;
var vm = "DismissableLayerBranch", bm = T.forwardRef((e, t) => {
  const n = T.useContext(Tc), r = T.useRef(null), o = Re(t, r);
  return T.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ m(Le.div, { ...e, ref: o });
});
bm.displayName = vm;
function wm(e, t = globalThis?.document) {
  const n = gt(e), r = T.useRef(!1), o = T.useRef(() => {
  });
  return T.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let c = function() {
          Sc(
            gm,
            n,
            l,
            { discrete: !0 }
          );
        };
        const l = { originalEvent: a };
        a.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = c, t.addEventListener("click", o.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, i = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(i), t.removeEventListener("pointerdown", s), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function xm(e, t = globalThis?.document) {
  const n = gt(e), r = T.useRef(!1);
  return T.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Sc(ym, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Xa() {
  const e = new CustomEvent(fs);
  document.dispatchEvent(e);
}
function Sc(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? kc(o, s) : o.dispatchEvent(s);
}
var Wo = 0;
function km() {
  T.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Za()), document.body.insertAdjacentElement("beforeend", e[1] ?? Za()), Wo++, () => {
      Wo === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Wo--;
    };
  }, []);
}
function Za() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var zo = "focusScope.autoFocusOnMount", Bo = "focusScope.autoFocusOnUnmount", Qa = { bubbles: !1, cancelable: !0 }, Cm = "FocusScope", Ec = T.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, c] = T.useState(null), l = gt(o), u = gt(s), d = T.useRef(null), f = Re(t, (g) => c(g)), p = T.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  T.useEffect(() => {
    if (r) {
      let g = function(x) {
        if (p.paused || !a) return;
        const S = x.target;
        a.contains(S) ? d.current = S : Dt(d.current, { select: !0 });
      }, y = function(x) {
        if (p.paused || !a) return;
        const S = x.relatedTarget;
        S !== null && (a.contains(S) || Dt(d.current, { select: !0 }));
      }, v = function(x) {
        if (document.activeElement === document.body)
          for (const w of x)
            w.removedNodes.length > 0 && Dt(a);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", y);
      const b = new MutationObserver(v);
      return a && b.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", y), b.disconnect();
      };
    }
  }, [r, a, p.paused]), T.useEffect(() => {
    if (a) {
      ei.add(p);
      const g = document.activeElement;
      if (!a.contains(g)) {
        const v = new CustomEvent(zo, Qa);
        a.addEventListener(zo, l), a.dispatchEvent(v), v.defaultPrevented || (Mm(Nm(Dc(a)), { select: !0 }), document.activeElement === g && Dt(a));
      }
      return () => {
        a.removeEventListener(zo, l), setTimeout(() => {
          const v = new CustomEvent(Bo, Qa);
          a.addEventListener(Bo, u), a.dispatchEvent(v), v.defaultPrevented || Dt(g ?? document.body, { select: !0 }), a.removeEventListener(Bo, u), ei.remove(p);
        }, 0);
      };
    }
  }, [a, l, u, p]);
  const h = T.useCallback(
    (g) => {
      if (!n && !r || p.paused) return;
      const y = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, v = document.activeElement;
      if (y && v) {
        const b = g.currentTarget, [x, S] = Tm(b);
        x && S ? !g.shiftKey && v === S ? (g.preventDefault(), n && Dt(x, { select: !0 })) : g.shiftKey && v === x && (g.preventDefault(), n && Dt(S, { select: !0 })) : v === b && g.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ m(Le.div, { tabIndex: -1, ...i, ref: f, onKeyDown: h });
});
Ec.displayName = Cm;
function Mm(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Dt(r, { select: t }), document.activeElement !== n) return;
}
function Tm(e) {
  const t = Dc(e), n = Ja(t, e), r = Ja(t.reverse(), e);
  return [n, r];
}
function Dc(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Ja(e, t) {
  for (const n of e)
    if (!Sm(n, { upTo: t })) return n;
}
function Sm(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Em(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Dt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Em(e) && t && e.select();
  }
}
var ei = Dm();
function Dm() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = ti(e, t), e.unshift(t);
    },
    remove(t) {
      e = ti(e, t), e[0]?.resume();
    }
  };
}
function ti(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Nm(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Am = T[" useId ".trim().toString()] || (() => {
}), Lm = 0;
function Gr(e) {
  const [t, n] = T.useState(Am());
  return Lt(() => {
    n((r) => r ?? String(Lm++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Im = ["top", "right", "bottom", "left"], It = Math.min, We = Math.max, qr = Math.round, Tr = Math.floor, ot = (e) => ({
  x: e,
  y: e
}), Rm = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Pm = {
  start: "end",
  end: "start"
};
function ms(e, t, n) {
  return We(e, It(t, n));
}
function yt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function vt(e) {
  return e.split("-")[0];
}
function Tn(e) {
  return e.split("-")[1];
}
function ta(e) {
  return e === "x" ? "y" : "x";
}
function na(e) {
  return e === "y" ? "height" : "width";
}
const Om = /* @__PURE__ */ new Set(["top", "bottom"]);
function nt(e) {
  return Om.has(vt(e)) ? "y" : "x";
}
function ra(e) {
  return ta(nt(e));
}
function _m(e, t, n) {
  n === void 0 && (n = !1);
  const r = Tn(e), o = ra(e), s = na(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = Xr(i)), [i, Xr(i)];
}
function $m(e) {
  const t = Xr(e);
  return [ps(e), t, ps(t)];
}
function ps(e) {
  return e.replace(/start|end/g, (t) => Pm[t]);
}
const ni = ["left", "right"], ri = ["right", "left"], Hm = ["top", "bottom"], Wm = ["bottom", "top"];
function zm(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ri : ni : t ? ni : ri;
    case "left":
    case "right":
      return t ? Hm : Wm;
    default:
      return [];
  }
}
function Bm(e, t, n, r) {
  const o = Tn(e);
  let s = zm(vt(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(ps)))), s;
}
function Xr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Rm[t]);
}
function Fm(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Nc(e) {
  return typeof e != "number" ? Fm(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Zr(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n
  };
}
function oi(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = nt(t), i = ra(t), a = na(i), c = vt(t), l = s === "y", u = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
  let p;
  switch (c) {
    case "top":
      p = {
        x: u,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: u,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: d
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (Tn(t)) {
    case "start":
      p[i] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      p[i] += f * (n && l ? -1 : 1);
      break;
  }
  return p;
}
const Um = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: i
  } = n, a = s.filter(Boolean), c = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let l = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: u,
    y: d
  } = oi(l, r, c), f = r, p = {}, h = 0;
  for (let g = 0; g < a.length; g++) {
    const {
      name: y,
      fn: v
    } = a[g], {
      x: b,
      y: x,
      data: S,
      reset: w
    } = await v({
      x: u,
      y: d,
      initialPlacement: r,
      placement: f,
      strategy: o,
      middlewareData: p,
      rects: l,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = b ?? u, d = x ?? d, p = {
      ...p,
      [y]: {
        ...p[y],
        ...S
      }
    }, w && h <= 50 && (h++, typeof w == "object" && (w.placement && (f = w.placement), w.rects && (l = w.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : w.rects), {
      x: u,
      y: d
    } = oi(l, f, c)), g = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function jn(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: s,
    rects: i,
    elements: a,
    strategy: c
  } = e, {
    boundary: l = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: f = !1,
    padding: p = 0
  } = yt(t, e), h = Nc(p), y = a[f ? d === "floating" ? "reference" : "floating" : d], v = Zr(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), b = d === "floating" ? {
    x: r,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, x = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), S = await (s.isElement == null ? void 0 : s.isElement(x)) ? await (s.getScale == null ? void 0 : s.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, w = Zr(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: b,
    offsetParent: x,
    strategy: c
  }) : b);
  return {
    top: (v.top - w.top + h.top) / S.y,
    bottom: (w.bottom - v.bottom + h.bottom) / S.y,
    left: (v.left - w.left + h.left) / S.x,
    right: (w.right - v.right + h.right) / S.x
  };
}
const Ym = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: s,
      platform: i,
      elements: a,
      middlewareData: c
    } = t, {
      element: l,
      padding: u = 0
    } = yt(e, t) || {};
    if (l == null)
      return {};
    const d = Nc(u), f = {
      x: n,
      y: r
    }, p = ra(o), h = na(p), g = await i.getDimensions(l), y = p === "y", v = y ? "top" : "left", b = y ? "bottom" : "right", x = y ? "clientHeight" : "clientWidth", S = s.reference[h] + s.reference[p] - f[p] - s.floating[h], w = f[p] - s.reference[p], C = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let E = C ? C[x] : 0;
    (!E || !await (i.isElement == null ? void 0 : i.isElement(C))) && (E = a.floating[x] || s.floating[h]);
    const k = S / 2 - w / 2, N = E / 2 - g[h] / 2 - 1, M = It(d[v], N), D = It(d[b], N), L = M, P = E - g[h] - D, O = E / 2 - g[h] / 2 + k, H = ms(L, O, P), $ = !c.arrow && Tn(o) != null && O !== H && s.reference[h] / 2 - (O < L ? M : D) - g[h] / 2 < 0, K = $ ? O < L ? O - L : O - P : 0;
    return {
      [p]: f[p] + K,
      data: {
        [p]: H,
        centerOffset: O - H - K,
        ...$ && {
          alignmentOffset: K
        }
      },
      reset: $
    };
  }
}), jm = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: s,
        rects: i,
        initialPlacement: a,
        platform: c,
        elements: l
      } = t, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: g = !0,
        ...y
      } = yt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = vt(o), b = nt(a), x = vt(a) === a, S = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), w = f || (x || !g ? [Xr(a)] : $m(a)), C = h !== "none";
      !f && C && w.push(...Bm(a, g, h, S));
      const E = [a, ...w], k = await jn(t, y), N = [];
      let M = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (u && N.push(k[v]), d) {
        const O = _m(o, i, S);
        N.push(k[O[0]], k[O[1]]);
      }
      if (M = [...M, {
        placement: o,
        overflows: N
      }], !N.every((O) => O <= 0)) {
        var D, L;
        const O = (((D = s.flip) == null ? void 0 : D.index) || 0) + 1, H = E[O];
        if (H && (!(d === "alignment" ? b !== nt(H) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        M.every((R) => nt(R.placement) === b ? R.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: M
            },
            reset: {
              placement: H
            }
          };
        let $ = (L = M.filter((K) => K.overflows[0] <= 0).sort((K, R) => K.overflows[1] - R.overflows[1])[0]) == null ? void 0 : L.placement;
        if (!$)
          switch (p) {
            case "bestFit": {
              var P;
              const K = (P = M.filter((R) => {
                if (C) {
                  const A = nt(R.placement);
                  return A === b || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  A === "y";
                }
                return !0;
              }).map((R) => [R.placement, R.overflows.filter((A) => A > 0).reduce((A, _) => A + _, 0)]).sort((R, A) => R[1] - A[1])[0]) == null ? void 0 : P[0];
              K && ($ = K);
              break;
            }
            case "initialPlacement":
              $ = a;
              break;
          }
        if (o !== $)
          return {
            reset: {
              placement: $
            }
          };
      }
      return {};
    }
  };
};
function si(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function ai(e) {
  return Im.some((t) => e[t] >= 0);
}
const Vm = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = yt(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await jn(t, {
            ...o,
            elementContext: "reference"
          }), i = si(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: ai(i)
            }
          };
        }
        case "escaped": {
          const s = await jn(t, {
            ...o,
            altBoundary: !0
          }), i = si(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: ai(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Ac = /* @__PURE__ */ new Set(["left", "top"]);
async function Km(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = vt(n), a = Tn(n), c = nt(n) === "y", l = Ac.has(i) ? -1 : 1, u = s && c ? -1 : 1, d = yt(t, e);
  let {
    mainAxis: f,
    crossAxis: p,
    alignmentAxis: h
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return a && typeof h == "number" && (p = a === "end" ? h * -1 : h), c ? {
    x: p * u,
    y: f * l
  } : {
    x: f * l,
    y: p * u
  };
}
const Gm = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: s,
        placement: i,
        middlewareData: a
      } = t, c = await Km(t, e);
      return i === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: o + c.x,
        y: s + c.y,
        data: {
          ...c,
          placement: i
        }
      };
    }
  };
}, qm = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: s = !0,
        crossAxis: i = !1,
        limiter: a = {
          fn: (y) => {
            let {
              x: v,
              y: b
            } = y;
            return {
              x: v,
              y: b
            };
          }
        },
        ...c
      } = yt(e, t), l = {
        x: n,
        y: r
      }, u = await jn(t, c), d = nt(vt(o)), f = ta(d);
      let p = l[f], h = l[d];
      if (s) {
        const y = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", b = p + u[y], x = p - u[v];
        p = ms(b, p, x);
      }
      if (i) {
        const y = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", b = h + u[y], x = h - u[v];
        h = ms(b, h, x);
      }
      const g = a.fn({
        ...t,
        [f]: p,
        [d]: h
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [f]: s,
            [d]: i
          }
        }
      };
    }
  };
}, Xm = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: s,
        middlewareData: i
      } = t, {
        offset: a = 0,
        mainAxis: c = !0,
        crossAxis: l = !0
      } = yt(e, t), u = {
        x: n,
        y: r
      }, d = nt(o), f = ta(d);
      let p = u[f], h = u[d];
      const g = yt(a, t), y = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const x = f === "y" ? "height" : "width", S = s.reference[f] - s.floating[x] + y.mainAxis, w = s.reference[f] + s.reference[x] - y.mainAxis;
        p < S ? p = S : p > w && (p = w);
      }
      if (l) {
        var v, b;
        const x = f === "y" ? "width" : "height", S = Ac.has(vt(o)), w = s.reference[d] - s.floating[x] + (S && ((v = i.offset) == null ? void 0 : v[d]) || 0) + (S ? 0 : y.crossAxis), C = s.reference[d] + s.reference[x] + (S ? 0 : ((b = i.offset) == null ? void 0 : b[d]) || 0) - (S ? y.crossAxis : 0);
        h < w ? h = w : h > C && (h = C);
      }
      return {
        [f]: p,
        [d]: h
      };
    }
  };
}, Zm = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: s,
        platform: i,
        elements: a
      } = t, {
        apply: c = () => {
        },
        ...l
      } = yt(e, t), u = await jn(t, l), d = vt(o), f = Tn(o), p = nt(o) === "y", {
        width: h,
        height: g
      } = s.floating;
      let y, v;
      d === "top" || d === "bottom" ? (y = d, v = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (v = d, y = f === "end" ? "top" : "bottom");
      const b = g - u.top - u.bottom, x = h - u.left - u.right, S = It(g - u[y], b), w = It(h - u[v], x), C = !t.middlewareData.shift;
      let E = S, k = w;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = x), (r = t.middlewareData.shift) != null && r.enabled.y && (E = b), C && !f) {
        const M = We(u.left, 0), D = We(u.right, 0), L = We(u.top, 0), P = We(u.bottom, 0);
        p ? k = h - 2 * (M !== 0 || D !== 0 ? M + D : We(u.left, u.right)) : E = g - 2 * (L !== 0 || P !== 0 ? L + P : We(u.top, u.bottom));
      }
      await c({
        ...t,
        availableWidth: k,
        availableHeight: E
      });
      const N = await i.getDimensions(a.floating);
      return h !== N.width || g !== N.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function po() {
  return typeof window < "u";
}
function Sn(e) {
  return Lc(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ze(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function at(e) {
  var t;
  return (t = (Lc(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Lc(e) {
  return po() ? e instanceof Node || e instanceof ze(e).Node : !1;
}
function Ze(e) {
  return po() ? e instanceof Element || e instanceof ze(e).Element : !1;
}
function st(e) {
  return po() ? e instanceof HTMLElement || e instanceof ze(e).HTMLElement : !1;
}
function ii(e) {
  return !po() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ze(e).ShadowRoot;
}
const Qm = /* @__PURE__ */ new Set(["inline", "contents"]);
function Qn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Qe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Qm.has(o);
}
const Jm = /* @__PURE__ */ new Set(["table", "td", "th"]);
function ep(e) {
  return Jm.has(Sn(e));
}
const tp = [":popover-open", ":modal"];
function ho(e) {
  return tp.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const np = ["transform", "translate", "scale", "rotate", "perspective"], rp = ["transform", "translate", "scale", "rotate", "perspective", "filter"], op = ["paint", "layout", "strict", "content"];
function oa(e) {
  const t = sa(), n = Ze(e) ? Qe(e) : e;
  return np.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || rp.some((r) => (n.willChange || "").includes(r)) || op.some((r) => (n.contain || "").includes(r));
}
function sp(e) {
  let t = Rt(e);
  for (; st(t) && !wn(t); ) {
    if (oa(t))
      return t;
    if (ho(t))
      return null;
    t = Rt(t);
  }
  return null;
}
function sa() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const ap = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function wn(e) {
  return ap.has(Sn(e));
}
function Qe(e) {
  return ze(e).getComputedStyle(e);
}
function go(e) {
  return Ze(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Rt(e) {
  if (Sn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ii(e) && e.host || // Fallback.
    at(e)
  );
  return ii(t) ? t.host : t;
}
function Ic(e) {
  const t = Rt(e);
  return wn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : st(t) && Qn(t) ? t : Ic(t);
}
function Vn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Ic(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = ze(o);
  if (s) {
    const a = hs(i);
    return t.concat(i, i.visualViewport || [], Qn(o) ? o : [], a && n ? Vn(a) : []);
  }
  return t.concat(o, Vn(o, [], n));
}
function hs(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Rc(e) {
  const t = Qe(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = st(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = qr(n) !== s || qr(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function aa(e) {
  return Ze(e) ? e : e.contextElement;
}
function fn(e) {
  const t = aa(e);
  if (!st(t))
    return ot(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Rc(t);
  let i = (s ? qr(n.width) : n.width) / r, a = (s ? qr(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const ip = /* @__PURE__ */ ot(0);
function Pc(e) {
  const t = ze(e);
  return !sa() || !t.visualViewport ? ip : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function cp(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== ze(e) ? !1 : t;
}
function jt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = aa(e);
  let i = ot(1);
  t && (r ? Ze(r) && (i = fn(r)) : i = fn(e));
  const a = cp(s, n, r) ? Pc(s) : ot(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, u = o.width / i.x, d = o.height / i.y;
  if (s) {
    const f = ze(s), p = r && Ze(r) ? ze(r) : r;
    let h = f, g = hs(h);
    for (; g && r && p !== h; ) {
      const y = fn(g), v = g.getBoundingClientRect(), b = Qe(g), x = v.left + (g.clientLeft + parseFloat(b.paddingLeft)) * y.x, S = v.top + (g.clientTop + parseFloat(b.paddingTop)) * y.y;
      c *= y.x, l *= y.y, u *= y.x, d *= y.y, c += x, l += S, h = ze(g), g = hs(h);
    }
  }
  return Zr({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function yo(e, t) {
  const n = go(e).scrollLeft;
  return t ? t.left + n : jt(at(e)).left + n;
}
function Oc(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - yo(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function lp(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = at(r), a = t ? ho(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = ot(1);
  const u = ot(0), d = st(r);
  if ((d || !d && !s) && ((Sn(r) !== "body" || Qn(i)) && (c = go(r)), st(r))) {
    const p = jt(r);
    l = fn(r), u.x = p.x + r.clientLeft, u.y = p.y + r.clientTop;
  }
  const f = i && !d && !s ? Oc(i, c) : ot(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
  };
}
function up(e) {
  return Array.from(e.getClientRects());
}
function dp(e) {
  const t = at(e), n = go(e), r = e.ownerDocument.body, o = We(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = We(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + yo(e);
  const a = -n.scrollTop;
  return Qe(r).direction === "rtl" && (i += We(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const ci = 25;
function fp(e, t) {
  const n = ze(e), r = at(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const u = sa();
    (!u || u && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = yo(r);
  if (l <= 0) {
    const u = r.ownerDocument, d = u.body, f = getComputedStyle(d), p = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, h = Math.abs(r.clientWidth - d.clientWidth - p);
    h <= ci && (s -= h);
  } else l <= ci && (s += l);
  return {
    width: s,
    height: i,
    x: a,
    y: c
  };
}
const mp = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function pp(e, t) {
  const n = jt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = st(e) ? fn(e) : ot(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function li(e, t, n) {
  let r;
  if (t === "viewport")
    r = fp(e, n);
  else if (t === "document")
    r = dp(at(e));
  else if (Ze(t))
    r = pp(t, n);
  else {
    const o = Pc(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Zr(r);
}
function _c(e, t) {
  const n = Rt(e);
  return n === t || !Ze(n) || wn(n) ? !1 : Qe(n).position === "fixed" || _c(n, t);
}
function hp(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Vn(e, [], !1).filter((a) => Ze(a) && Sn(a) !== "body"), o = null;
  const s = Qe(e).position === "fixed";
  let i = s ? Rt(e) : e;
  for (; Ze(i) && !wn(i); ) {
    const a = Qe(i), c = oa(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && mp.has(o.position) || Qn(i) && !c && _c(e, i)) ? r = r.filter((u) => u !== i) : o = a, i = Rt(i);
  }
  return t.set(e, r), r;
}
function gp(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? ho(t) ? [] : hp(t, this._c) : [].concat(n), r], a = i[0], c = i.reduce((l, u) => {
    const d = li(t, u, o);
    return l.top = We(d.top, l.top), l.right = It(d.right, l.right), l.bottom = It(d.bottom, l.bottom), l.left = We(d.left, l.left), l;
  }, li(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function yp(e) {
  const {
    width: t,
    height: n
  } = Rc(e);
  return {
    width: t,
    height: n
  };
}
function vp(e, t, n) {
  const r = st(t), o = at(t), s = n === "fixed", i = jt(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = ot(0);
  function l() {
    c.x = yo(o);
  }
  if (r || !r && !s)
    if ((Sn(t) !== "body" || Qn(o)) && (a = go(t)), r) {
      const p = jt(t, !0, s, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && l();
  s && !r && o && l();
  const u = o && !r && !s ? Oc(o, a) : ot(0), d = i.left + a.scrollLeft - c.x - u.x, f = i.top + a.scrollTop - c.y - u.y;
  return {
    x: d,
    y: f,
    width: i.width,
    height: i.height
  };
}
function Fo(e) {
  return Qe(e).position === "static";
}
function ui(e, t) {
  if (!st(e) || Qe(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return at(e) === n && (n = n.ownerDocument.body), n;
}
function $c(e, t) {
  const n = ze(e);
  if (ho(e))
    return n;
  if (!st(e)) {
    let o = Rt(e);
    for (; o && !wn(o); ) {
      if (Ze(o) && !Fo(o))
        return o;
      o = Rt(o);
    }
    return n;
  }
  let r = ui(e, t);
  for (; r && ep(r) && Fo(r); )
    r = ui(r, t);
  return r && wn(r) && Fo(r) && !oa(r) ? n : r || sp(e) || n;
}
const bp = async function(e) {
  const t = this.getOffsetParent || $c, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: vp(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function wp(e) {
  return Qe(e).direction === "rtl";
}
const xp = {
  convertOffsetParentRelativeRectToViewportRelativeRect: lp,
  getDocumentElement: at,
  getClippingRect: gp,
  getOffsetParent: $c,
  getElementRects: bp,
  getClientRects: up,
  getDimensions: yp,
  getScale: fn,
  isElement: Ze,
  isRTL: wp
};
function Hc(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function kp(e, t) {
  let n = null, r;
  const o = at(e);
  function s() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function i(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), s();
    const l = e.getBoundingClientRect(), {
      left: u,
      top: d,
      width: f,
      height: p
    } = l;
    if (a || t(), !f || !p)
      return;
    const h = Tr(d), g = Tr(o.clientWidth - (u + f)), y = Tr(o.clientHeight - (d + p)), v = Tr(u), x = {
      rootMargin: -h + "px " + -g + "px " + -y + "px " + -v + "px",
      threshold: We(0, It(1, c)) || 1
    };
    let S = !0;
    function w(C) {
      const E = C[0].intersectionRatio;
      if (E !== c) {
        if (!S)
          return i();
        E ? i(!1, E) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      E === 1 && !Hc(l, e.getBoundingClientRect()) && i(), S = !1;
    }
    try {
      n = new IntersectionObserver(w, {
        ...x,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(w, x);
    }
    n.observe(e);
  }
  return i(!0), s;
}
function Cp(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = aa(e), u = o || s ? [...l ? Vn(l) : [], ...Vn(t)] : [];
  u.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const d = l && a ? kp(l, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((v) => {
    let [b] = v;
    b && b.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var x;
      (x = p) == null || x.observe(t);
    })), n();
  }), l && !c && p.observe(l), p.observe(t));
  let h, g = c ? jt(e) : null;
  c && y();
  function y() {
    const v = jt(e);
    g && !Hc(g, v) && n(), g = v, h = requestAnimationFrame(y);
  }
  return n(), () => {
    var v;
    u.forEach((b) => {
      o && b.removeEventListener("scroll", n), s && b.removeEventListener("resize", n);
    }), d?.(), (v = p) == null || v.disconnect(), p = null, c && cancelAnimationFrame(h);
  };
}
const Mp = Gm, Tp = qm, Sp = jm, Ep = Zm, Dp = Vm, di = Ym, Np = Xm, Ap = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: xp,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Um(e, t, {
    ...o,
    platform: s
  });
};
var Lp = typeof document < "u", Ip = function() {
}, Fr = Lp ? io : Ip;
function Qr(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!Qr(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const s = o[r];
      if (!(s === "_owner" && e.$$typeof) && !Qr(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Wc(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function fi(e, t) {
  const n = Wc(e);
  return Math.round(t * n) / n;
}
function Uo(e) {
  const t = T.useRef(e);
  return Fr(() => {
    t.current = e;
  }), t;
}
function Rp(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: s,
      floating: i
    } = {},
    transform: a = !0,
    whileElementsMounted: c,
    open: l
  } = e, [u, d] = T.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, p] = T.useState(r);
  Qr(f, r) || p(r);
  const [h, g] = T.useState(null), [y, v] = T.useState(null), b = T.useCallback((R) => {
    R !== C.current && (C.current = R, g(R));
  }, []), x = T.useCallback((R) => {
    R !== E.current && (E.current = R, v(R));
  }, []), S = s || h, w = i || y, C = T.useRef(null), E = T.useRef(null), k = T.useRef(u), N = c != null, M = Uo(c), D = Uo(o), L = Uo(l), P = T.useCallback(() => {
    if (!C.current || !E.current)
      return;
    const R = {
      placement: t,
      strategy: n,
      middleware: f
    };
    D.current && (R.platform = D.current), Ap(C.current, E.current, R).then((A) => {
      const _ = {
        ...A,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: L.current !== !1
      };
      O.current && !Qr(k.current, _) && (k.current = _, yc.flushSync(() => {
        d(_);
      }));
    });
  }, [f, t, n, D, L]);
  Fr(() => {
    l === !1 && k.current.isPositioned && (k.current.isPositioned = !1, d((R) => ({
      ...R,
      isPositioned: !1
    })));
  }, [l]);
  const O = T.useRef(!1);
  Fr(() => (O.current = !0, () => {
    O.current = !1;
  }), []), Fr(() => {
    if (S && (C.current = S), w && (E.current = w), S && w) {
      if (M.current)
        return M.current(S, w, P);
      P();
    }
  }, [S, w, P, M, N]);
  const H = T.useMemo(() => ({
    reference: C,
    floating: E,
    setReference: b,
    setFloating: x
  }), [b, x]), $ = T.useMemo(() => ({
    reference: S,
    floating: w
  }), [S, w]), K = T.useMemo(() => {
    const R = {
      position: n,
      left: 0,
      top: 0
    };
    if (!$.floating)
      return R;
    const A = fi($.floating, u.x), _ = fi($.floating, u.y);
    return a ? {
      ...R,
      transform: "translate(" + A + "px, " + _ + "px)",
      ...Wc($.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: A,
      top: _
    };
  }, [n, a, $.floating, u.x, u.y]);
  return T.useMemo(() => ({
    ...u,
    update: P,
    refs: H,
    elements: $,
    floatingStyles: K
  }), [u, P, H, $, K]);
}
const Pp = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: r,
        padding: o
      } = typeof e == "function" ? e(n) : e;
      return r && t(r) ? r.current != null ? di({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? di({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Op = (e, t) => ({
  ...Mp(e),
  options: [e, t]
}), _p = (e, t) => ({
  ...Tp(e),
  options: [e, t]
}), $p = (e, t) => ({
  ...Np(e),
  options: [e, t]
}), Hp = (e, t) => ({
  ...Sp(e),
  options: [e, t]
}), Wp = (e, t) => ({
  ...Ep(e),
  options: [e, t]
}), zp = (e, t) => ({
  ...Dp(e),
  options: [e, t]
}), Bp = (e, t) => ({
  ...Pp(e),
  options: [e, t]
});
var Fp = "Arrow", zc = T.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ m(
    Le.svg,
    {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ m("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
zc.displayName = Fp;
var Up = zc;
function Yp(e) {
  const [t, n] = T.useState(void 0);
  return Lt(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let i, a;
        if ("borderBoxSize" in s) {
          const c = s.borderBoxSize, l = Array.isArray(c) ? c[0] : c;
          i = l.inlineSize, a = l.blockSize;
        } else
          i = e.offsetWidth, a = e.offsetHeight;
        n({ width: i, height: a });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var ia = "Popper", [Bc, vo] = Mn(ia), [jp, Fc] = Bc(ia), Uc = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = T.useState(null);
  return /* @__PURE__ */ m(jp, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Uc.displayName = ia;
var Yc = "PopperAnchor", jc = T.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = Fc(Yc, n), i = T.useRef(null), a = Re(t, i), c = T.useRef(null);
    return T.useEffect(() => {
      const l = c.current;
      c.current = r?.current || i.current, l !== c.current && s.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ m(Le.div, { ...o, ref: a });
  }
);
jc.displayName = Yc;
var ca = "PopperContent", [Vp, Kp] = Bc(ca), Vc = T.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: s = "center",
      alignOffset: i = 0,
      arrowPadding: a = 0,
      avoidCollisions: c = !0,
      collisionBoundary: l = [],
      collisionPadding: u = 0,
      sticky: d = "partial",
      hideWhenDetached: f = !1,
      updatePositionStrategy: p = "optimized",
      onPlaced: h,
      ...g
    } = e, y = Fc(ca, n), [v, b] = T.useState(null), x = Re(t, (F) => b(F)), [S, w] = T.useState(null), C = Yp(S), E = C?.width ?? 0, k = C?.height ?? 0, N = r + (s !== "center" ? "-" + s : ""), M = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, D = Array.isArray(l) ? l : [l], L = D.length > 0, P = {
      padding: M,
      boundary: D.filter(qp),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: L
    }, { refs: O, floatingStyles: H, placement: $, isPositioned: K, middlewareData: R } = Rp({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: N,
      whileElementsMounted: (...F) => Cp(...F, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        Op({ mainAxis: o + k, alignmentAxis: i }),
        c && _p({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? $p() : void 0,
          ...P
        }),
        c && Hp({ ...P }),
        Wp({
          ...P,
          apply: ({ elements: F, rects: Q, availableWidth: le, availableHeight: ue }) => {
            const { width: ge, height: Se } = Q.reference, Fe = F.floating.style;
            Fe.setProperty("--radix-popper-available-width", `${le}px`), Fe.setProperty("--radix-popper-available-height", `${ue}px`), Fe.setProperty("--radix-popper-anchor-width", `${ge}px`), Fe.setProperty("--radix-popper-anchor-height", `${Se}px`);
          }
        }),
        S && Bp({ element: S, padding: a }),
        Xp({ arrowWidth: E, arrowHeight: k }),
        f && zp({ strategy: "referenceHidden", ...P })
      ]
    }), [A, _] = qc($), Y = gt(h);
    Lt(() => {
      K && Y?.();
    }, [K, Y]);
    const j = R.arrow?.x, q = R.arrow?.y, Z = R.arrow?.centerOffset !== 0, [W, z] = T.useState();
    return Lt(() => {
      v && z(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ m(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...H,
          transform: K ? H.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: W,
          "--radix-popper-transform-origin": [
            R.transformOrigin?.x,
            R.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...R.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ m(
          Vp,
          {
            scope: n,
            placedSide: A,
            onArrowChange: w,
            arrowX: j,
            arrowY: q,
            shouldHideArrow: Z,
            children: /* @__PURE__ */ m(
              Le.div,
              {
                "data-side": A,
                "data-align": _,
                ...g,
                ref: x,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: K ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Vc.displayName = ca;
var Kc = "PopperArrow", Gp = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Gc = T.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Kp(Kc, r), i = Gp[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ m(
      "span",
      {
        ref: s.onArrowChange,
        style: {
          position: "absolute",
          left: s.arrowX,
          top: s.arrowY,
          [i]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[s.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[s.placedSide],
          visibility: s.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ m(
          Up,
          {
            ...o,
            ref: n,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
Gc.displayName = Kc;
function qp(e) {
  return e !== null;
}
var Xp = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [l, u] = qc(n), d = { start: "0%", center: "50%", end: "100%" }[u], f = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + c / 2;
    let h = "", g = "";
    return l === "bottom" ? (h = i ? d : `${f}px`, g = `${-c}px`) : l === "top" ? (h = i ? d : `${f}px`, g = `${r.floating.height + c}px`) : l === "right" ? (h = `${-c}px`, g = i ? d : `${p}px`) : l === "left" && (h = `${r.floating.width + c}px`, g = i ? d : `${p}px`), { data: { x: h, y: g } };
  }
});
function qc(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Xc = Uc, Zc = jc, Qc = Vc, Jc = Gc, Zp = "Portal", la = T.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = T.useState(!1);
  Lt(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? xf.createPortal(/* @__PURE__ */ m(Le.div, { ...r, ref: t }), i) : null;
});
la.displayName = Zp;
function Qp(e, t) {
  return T.useReducer((n, r) => t[n][r] ?? n, e);
}
var qt = (e) => {
  const { present: t, children: n } = e, r = Jp(t), o = typeof n == "function" ? n({ present: r.isPresent }) : T.Children.only(n), s = Re(r.ref, eh(o));
  return typeof n == "function" || r.isPresent ? T.cloneElement(o, { ref: s }) : null;
};
qt.displayName = "Presence";
function Jp(e) {
  const [t, n] = T.useState(), r = T.useRef(null), o = T.useRef(e), s = T.useRef("none"), i = e ? "mounted" : "unmounted", [a, c] = Qp(i, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return T.useEffect(() => {
    const l = Sr(r.current);
    s.current = a === "mounted" ? l : "none";
  }, [a]), Lt(() => {
    const l = r.current, u = o.current;
    if (u !== e) {
      const f = s.current, p = Sr(l);
      e ? c("MOUNT") : p === "none" || l?.display === "none" ? c("UNMOUNT") : c(u && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), Lt(() => {
    if (t) {
      let l;
      const u = t.ownerDocument.defaultView ?? window, d = (p) => {
        const g = Sr(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && g && (c("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (p) => {
        p.target === t && (s.current = Sr(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        u.clearTimeout(l), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: T.useCallback((l) => {
      r.current = l ? getComputedStyle(l) : null, n(l);
    }, [])
  };
}
function Sr(e) {
  return e?.animationName || "none";
}
function eh(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Yo = "rovingFocusGroup.onEntryFocus", th = { bubbles: !1, cancelable: !0 }, Jn = "RovingFocusGroup", [gs, el, nh] = Cc(Jn), [rh, tl] = Mn(
  Jn,
  [nh]
), [oh, sh] = rh(Jn), nl = T.forwardRef(
  (e, t) => /* @__PURE__ */ m(gs.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(gs.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(ah, { ...e, ref: t }) }) })
);
nl.displayName = Jn;
var ah = T.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: s,
    currentTabStopId: i,
    defaultCurrentTabStopId: a,
    onCurrentTabStopIdChange: c,
    onEntryFocus: l,
    preventScrollOnEntryFocus: u = !1,
    ...d
  } = e, f = T.useRef(null), p = Re(t, f), h = Mc(s), [g, y] = Js({
    prop: i,
    defaultProp: a ?? null,
    onChange: c,
    caller: Jn
  }), [v, b] = T.useState(!1), x = gt(l), S = el(n), w = T.useRef(!1), [C, E] = T.useState(0);
  return T.useEffect(() => {
    const k = f.current;
    if (k)
      return k.addEventListener(Yo, x), () => k.removeEventListener(Yo, x);
  }, [x]), /* @__PURE__ */ m(
    oh,
    {
      scope: n,
      orientation: r,
      dir: h,
      loop: o,
      currentTabStopId: g,
      onItemFocus: T.useCallback(
        (k) => y(k),
        [y]
      ),
      onItemShiftTab: T.useCallback(() => b(!0), []),
      onFocusableItemAdd: T.useCallback(
        () => E((k) => k + 1),
        []
      ),
      onFocusableItemRemove: T.useCallback(
        () => E((k) => k - 1),
        []
      ),
      children: /* @__PURE__ */ m(
        Le.div,
        {
          tabIndex: v || C === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: ie(e.onMouseDown, () => {
            w.current = !0;
          }),
          onFocus: ie(e.onFocus, (k) => {
            const N = !w.current;
            if (k.target === k.currentTarget && N && !v) {
              const M = new CustomEvent(Yo, th);
              if (k.currentTarget.dispatchEvent(M), !M.defaultPrevented) {
                const D = S().filter(($) => $.focusable), L = D.find(($) => $.active), P = D.find(($) => $.id === g), H = [L, P, ...D].filter(
                  Boolean
                ).map(($) => $.ref.current);
                sl(H, u);
              }
            }
            w.current = !1;
          }),
          onBlur: ie(e.onBlur, () => b(!1))
        }
      )
    }
  );
}), rl = "RovingFocusGroupItem", ol = T.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, c = Gr(), l = s || c, u = sh(rl, n), d = u.currentTabStopId === l, f = el(n), { onFocusableItemAdd: p, onFocusableItemRemove: h, currentTabStopId: g } = u;
    return T.useEffect(() => {
      if (r)
        return p(), () => h();
    }, [r, p, h]), /* @__PURE__ */ m(
      gs.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ m(
          Le.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": u.orientation,
            ...a,
            ref: t,
            onMouseDown: ie(e.onMouseDown, (y) => {
              r ? u.onItemFocus(l) : y.preventDefault();
            }),
            onFocus: ie(e.onFocus, () => u.onItemFocus(l)),
            onKeyDown: ie(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const v = lh(y, u.orientation, u.dir);
              if (v !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let x = f().filter((S) => S.focusable).map((S) => S.ref.current);
                if (v === "last") x.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && x.reverse();
                  const S = x.indexOf(y.currentTarget);
                  x = u.loop ? uh(x, S + 1) : x.slice(S + 1);
                }
                setTimeout(() => sl(x));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: d, hasTabStop: g != null }) : i
          }
        )
      }
    );
  }
);
ol.displayName = rl;
var ih = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function ch(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function lh(e, t, n) {
  const r = ch(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return ih[r];
}
function sl(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function uh(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var dh = nl, fh = ol, mh = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, nn = /* @__PURE__ */ new WeakMap(), Er = /* @__PURE__ */ new WeakMap(), Dr = {}, jo = 0, al = function(e) {
  return e && (e.host || al(e.parentNode));
}, ph = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = al(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, hh = function(e, t, n, r) {
  var o = ph(t, Array.isArray(e) ? e : [e]);
  Dr[n] || (Dr[n] = /* @__PURE__ */ new WeakMap());
  var s = Dr[n], i = [], a = /* @__PURE__ */ new Set(), c = new Set(o), l = function(d) {
    !d || a.has(d) || (a.add(d), l(d.parentNode));
  };
  o.forEach(l);
  var u = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (a.has(f))
        u(f);
      else
        try {
          var p = f.getAttribute(r), h = p !== null && p !== "false", g = (nn.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          nn.set(f, g), s.set(f, y), i.push(f), g === 1 && h && Er.set(f, !0), y === 1 && f.setAttribute(n, "true"), h || f.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return u(t), a.clear(), jo++, function() {
    i.forEach(function(d) {
      var f = nn.get(d) - 1, p = s.get(d) - 1;
      nn.set(d, f), s.set(d, p), f || (Er.has(d) || d.removeAttribute(r), Er.delete(d)), p || d.removeAttribute(n);
    }), jo--, jo || (nn = /* @__PURE__ */ new WeakMap(), nn = /* @__PURE__ */ new WeakMap(), Er = /* @__PURE__ */ new WeakMap(), Dr = {});
  };
}, gh = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = mh(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), hh(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, tt = function() {
  return tt = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, tt.apply(this, arguments);
};
function il(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function yh(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Ur = "right-scroll-bar-position", Yr = "width-before-scroll-bar", vh = "with-scroll-bars-hidden", bh = "--removed-body-scroll-bar-size";
function Vo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function wh(e, t) {
  var n = U(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && (n.value = r, n.callback(r, o));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var xh = typeof window < "u" ? T.useLayoutEffect : T.useEffect, mi = /* @__PURE__ */ new WeakMap();
function kh(e, t) {
  var n = wh(null, function(r) {
    return e.forEach(function(o) {
      return Vo(o, r);
    });
  });
  return xh(function() {
    var r = mi.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || Vo(a, null);
      }), s.forEach(function(a) {
        o.has(a) || Vo(a, i);
      });
    }
    mi.set(n, e);
  }, [e]), n;
}
function Ch(e) {
  return e;
}
function Mh(e, t) {
  t === void 0 && (t = Ch);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(s) {
      var i = t(s, r);
      return n.push(i), function() {
        n = n.filter(function(a) {
          return a !== i;
        });
      };
    },
    assignSyncMedium: function(s) {
      for (r = !0; n.length; ) {
        var i = n;
        n = [], i.forEach(s);
      }
      n = {
        push: function(a) {
          return s(a);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(s) {
      r = !0;
      var i = [];
      if (n.length) {
        var a = n;
        n = [], a.forEach(s), i = n;
      }
      var c = function() {
        var u = i;
        i = [], u.forEach(s);
      }, l = function() {
        return Promise.resolve().then(c);
      };
      l(), n = {
        push: function(u) {
          i.push(u), l();
        },
        filter: function(u) {
          return i = i.filter(u), n;
        }
      };
    }
  };
  return o;
}
function Th(e) {
  e === void 0 && (e = {});
  var t = Mh(null);
  return t.options = tt({ async: !0, ssr: !1 }, e), t;
}
var cl = function(e) {
  var t = e.sideCar, n = il(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return T.createElement(r, tt({}, n));
};
cl.isSideCarExport = !0;
function Sh(e, t) {
  return e.useMedium(t), cl;
}
var ll = Th(), Ko = function() {
}, bo = T.forwardRef(function(e, t) {
  var n = T.useRef(null), r = T.useState({
    onScrollCapture: Ko,
    onWheelCapture: Ko,
    onTouchMoveCapture: Ko
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, p = e.noRelative, h = e.noIsolation, g = e.inert, y = e.allowPinchZoom, v = e.as, b = v === void 0 ? "div" : v, x = e.gapMode, S = il(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), w = f, C = kh([n, t]), E = tt(tt({}, S), o);
  return T.createElement(
    T.Fragment,
    null,
    u && T.createElement(w, { sideCar: ll, removeScrollBar: l, shards: d, noRelative: p, noIsolation: h, inert: g, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: x }),
    i ? T.cloneElement(T.Children.only(a), tt(tt({}, E), { ref: C })) : T.createElement(b, tt({}, E, { className: c, ref: C }), a)
  );
});
bo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
bo.classNames = {
  fullWidth: Yr,
  zeroRight: Ur
};
var Eh = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Dh() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Eh();
  return t && e.setAttribute("nonce", t), e;
}
function Nh(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Ah(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Lh = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Dh()) && (Nh(t, n), Ah(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Ih = function() {
  var e = Lh();
  return function(t, n) {
    T.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, ul = function() {
  var e = Ih(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Rh = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Go = function(e) {
  return parseInt(e || "", 10) || 0;
}, Ph = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Go(n), Go(r), Go(o)];
}, Oh = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Rh;
  var t = Ph(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, _h = ul(), mn = "data-scroll-locked", $h = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(vh, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(mn, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(s, `px;
    padding-right: `).concat(i, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(a, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Ur, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Yr, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Ur, " .").concat(Ur, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Yr, " .").concat(Yr, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(mn, `] {
    `).concat(bh, ": ").concat(a, `px;
  }
`);
}, pi = function() {
  var e = parseInt(document.body.getAttribute(mn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Hh = function() {
  T.useEffect(function() {
    return document.body.setAttribute(mn, (pi() + 1).toString()), function() {
      var e = pi() - 1;
      e <= 0 ? document.body.removeAttribute(mn) : document.body.setAttribute(mn, e.toString());
    };
  }, []);
}, Wh = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Hh();
  var s = T.useMemo(function() {
    return Oh(o);
  }, [o]);
  return T.createElement(_h, { styles: $h(s, !t, o, n ? "" : "!important") });
}, ys = !1;
if (typeof window < "u")
  try {
    var Nr = Object.defineProperty({}, "passive", {
      get: function() {
        return ys = !0, !0;
      }
    });
    window.addEventListener("test", Nr, Nr), window.removeEventListener("test", Nr, Nr);
  } catch {
    ys = !1;
  }
var rn = ys ? { passive: !1 } : !1, zh = function(e) {
  return e.tagName === "TEXTAREA";
}, dl = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !zh(e) && n[t] === "visible")
  );
}, Bh = function(e) {
  return dl(e, "overflowY");
}, Fh = function(e) {
  return dl(e, "overflowX");
}, hi = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = fl(e, r);
    if (o) {
      var s = ml(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Uh = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Yh = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, fl = function(e, t) {
  return e === "v" ? Bh(t) : Fh(t);
}, ml = function(e, t) {
  return e === "v" ? Uh(t) : Yh(t);
}, jh = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Vh = function(e, t, n, r, o) {
  var s = jh(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, c = t.contains(a), l = !1, u = i > 0, d = 0, f = 0;
  do {
    if (!a)
      break;
    var p = ml(e, a), h = p[0], g = p[1], y = p[2], v = g - y - s * h;
    (h || v) && fl(e, a) && (d += v, f += h);
    var b = a.parentNode;
    a = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b;
  } while (
    // portaled content
    !c && a !== document.body || // self content
    c && (t.contains(a) || t === a)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(f) < 1) && (l = !0), l;
}, Ar = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, gi = function(e) {
  return [e.deltaX, e.deltaY];
}, yi = function(e) {
  return e && "current" in e ? e.current : e;
}, Kh = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Gh = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, qh = 0, on = [];
function Xh(e) {
  var t = T.useRef([]), n = T.useRef([0, 0]), r = T.useRef(), o = T.useState(qh++)[0], s = T.useState(ul)[0], i = T.useRef(e);
  T.useEffect(function() {
    i.current = e;
  }, [e]), T.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = yh([e.lockRef.current], (e.shards || []).map(yi), !0).filter(Boolean);
      return g.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = T.useCallback(function(g, y) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !i.current.allowPinchZoom;
    var v = Ar(g), b = n.current, x = "deltaX" in g ? g.deltaX : b[0] - v[0], S = "deltaY" in g ? g.deltaY : b[1] - v[1], w, C = g.target, E = Math.abs(x) > Math.abs(S) ? "h" : "v";
    if ("touches" in g && E === "h" && C.type === "range")
      return !1;
    var k = hi(E, C);
    if (!k)
      return !0;
    if (k ? w = E : (w = E === "v" ? "h" : "v", k = hi(E, C)), !k)
      return !1;
    if (!r.current && "changedTouches" in g && (x || S) && (r.current = w), !w)
      return !0;
    var N = r.current || w;
    return Vh(N, y, g, N === "h" ? x : S);
  }, []), c = T.useCallback(function(g) {
    var y = g;
    if (!(!on.length || on[on.length - 1] !== s)) {
      var v = "deltaY" in y ? gi(y) : Ar(y), b = t.current.filter(function(w) {
        return w.name === y.type && (w.target === y.target || y.target === w.shadowParent) && Kh(w.delta, v);
      })[0];
      if (b && b.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!b) {
        var x = (i.current.shards || []).map(yi).filter(Boolean).filter(function(w) {
          return w.contains(y.target);
        }), S = x.length > 0 ? a(y, x[0]) : !i.current.noIsolation;
        S && y.cancelable && y.preventDefault();
      }
    }
  }, []), l = T.useCallback(function(g, y, v, b) {
    var x = { name: g, delta: y, target: v, should: b, shadowParent: Zh(v) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== x;
      });
    }, 1);
  }, []), u = T.useCallback(function(g) {
    n.current = Ar(g), r.current = void 0;
  }, []), d = T.useCallback(function(g) {
    l(g.type, gi(g), g.target, a(g, e.lockRef.current));
  }, []), f = T.useCallback(function(g) {
    l(g.type, Ar(g), g.target, a(g, e.lockRef.current));
  }, []);
  T.useEffect(function() {
    return on.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, rn), document.addEventListener("touchmove", c, rn), document.addEventListener("touchstart", u, rn), function() {
      on = on.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", c, rn), document.removeEventListener("touchmove", c, rn), document.removeEventListener("touchstart", u, rn);
    };
  }, []);
  var p = e.removeScrollBar, h = e.inert;
  return T.createElement(
    T.Fragment,
    null,
    h ? T.createElement(s, { styles: Gh(o) }) : null,
    p ? T.createElement(Wh, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Zh(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Qh = Sh(ll, Xh);
var pl = T.forwardRef(function(e, t) {
  return T.createElement(bo, tt({}, e, { ref: t, sideCar: Qh }));
});
pl.classNames = bo.classNames;
var vs = ["Enter", " "], Jh = ["ArrowDown", "PageUp", "Home"], hl = ["ArrowUp", "PageDown", "End"], eg = [...Jh, ...hl], tg = {
  ltr: [...vs, "ArrowRight"],
  rtl: [...vs, "ArrowLeft"]
}, ng = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, er = "Menu", [Kn, rg, og] = Cc(er), [Xt, gl] = Mn(er, [
  og,
  vo,
  tl
]), wo = vo(), yl = tl(), [sg, Zt] = Xt(er), [ag, tr] = Xt(er), vl = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = wo(t), [c, l] = T.useState(null), u = T.useRef(!1), d = gt(s), f = Mc(o);
  return T.useEffect(() => {
    const p = () => {
      u.current = !0, document.addEventListener("pointerdown", h, { capture: !0, once: !0 }), document.addEventListener("pointermove", h, { capture: !0, once: !0 });
    }, h = () => u.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", h, { capture: !0 }), document.removeEventListener("pointermove", h, { capture: !0 });
    };
  }, []), /* @__PURE__ */ m(Xc, { ...a, children: /* @__PURE__ */ m(
    sg,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: c,
      onContentChange: l,
      children: /* @__PURE__ */ m(
        ag,
        {
          scope: t,
          onClose: T.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: u,
          dir: f,
          modal: i,
          children: r
        }
      )
    }
  ) });
};
vl.displayName = er;
var ig = "MenuAnchor", ua = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = wo(n);
    return /* @__PURE__ */ m(Zc, { ...o, ...r, ref: t });
  }
);
ua.displayName = ig;
var da = "MenuPortal", [cg, bl] = Xt(da, {
  forceMount: void 0
}), wl = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = Zt(da, t);
  return /* @__PURE__ */ m(cg, { scope: t, forceMount: n, children: /* @__PURE__ */ m(qt, { present: n || s.open, children: /* @__PURE__ */ m(la, { asChild: !0, container: o, children: r }) }) });
};
wl.displayName = da;
var je = "MenuContent", [lg, fa] = Xt(je), xl = T.forwardRef(
  (e, t) => {
    const n = bl(je, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Zt(je, e.__scopeMenu), i = tr(je, e.__scopeMenu);
    return /* @__PURE__ */ m(Kn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(qt, { present: r || s.open, children: /* @__PURE__ */ m(Kn.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ m(ug, { ...o, ref: t }) : /* @__PURE__ */ m(dg, { ...o, ref: t }) }) }) });
  }
), ug = T.forwardRef(
  (e, t) => {
    const n = Zt(je, e.__scopeMenu), r = T.useRef(null), o = Re(t, r);
    return T.useEffect(() => {
      const s = r.current;
      if (s) return gh(s);
    }, []), /* @__PURE__ */ m(
      ma,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: ie(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), dg = T.forwardRef((e, t) => {
  const n = Zt(je, e.__scopeMenu);
  return /* @__PURE__ */ m(
    ma,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), fg = /* @__PURE__ */ Yn("MenuContent.ScrollLock"), ma = T.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: s,
      onCloseAutoFocus: i,
      disableOutsidePointerEvents: a,
      onEntryFocus: c,
      onEscapeKeyDown: l,
      onPointerDownOutside: u,
      onFocusOutside: d,
      onInteractOutside: f,
      onDismiss: p,
      disableOutsideScroll: h,
      ...g
    } = e, y = Zt(je, n), v = tr(je, n), b = wo(n), x = yl(n), S = rg(n), [w, C] = T.useState(null), E = T.useRef(null), k = Re(t, E, y.onContentChange), N = T.useRef(0), M = T.useRef(""), D = T.useRef(0), L = T.useRef(null), P = T.useRef("right"), O = T.useRef(0), H = h ? pl : T.Fragment, $ = h ? { as: fg, allowPinchZoom: !0 } : void 0, K = (A) => {
      const _ = M.current + A, Y = S().filter((F) => !F.disabled), j = document.activeElement, q = Y.find((F) => F.ref.current === j)?.textValue, Z = Y.map((F) => F.textValue), W = Mg(Z, _, q), z = Y.find((F) => F.textValue === W)?.ref.current;
      (function F(Q) {
        M.current = Q, window.clearTimeout(N.current), Q !== "" && (N.current = window.setTimeout(() => F(""), 1e3));
      })(_), z && setTimeout(() => z.focus());
    };
    T.useEffect(() => () => window.clearTimeout(N.current), []), km();
    const R = T.useCallback((A) => P.current === L.current?.side && Sg(A, L.current?.area), []);
    return /* @__PURE__ */ m(
      lg,
      {
        scope: n,
        searchRef: M,
        onItemEnter: T.useCallback(
          (A) => {
            R(A) && A.preventDefault();
          },
          [R]
        ),
        onItemLeave: T.useCallback(
          (A) => {
            R(A) || (E.current?.focus(), C(null));
          },
          [R]
        ),
        onTriggerLeave: T.useCallback(
          (A) => {
            R(A) && A.preventDefault();
          },
          [R]
        ),
        pointerGraceTimerRef: D,
        onPointerGraceIntentChange: T.useCallback((A) => {
          L.current = A;
        }, []),
        children: /* @__PURE__ */ m(H, { ...$, children: /* @__PURE__ */ m(
          Ec,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: ie(s, (A) => {
              A.preventDefault(), E.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ m(
              ea,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: l,
                onPointerDownOutside: u,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: p,
                children: /* @__PURE__ */ m(
                  dh,
                  {
                    asChild: !0,
                    ...x,
                    dir: v.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: w,
                    onCurrentTabStopIdChange: C,
                    onEntryFocus: ie(c, (A) => {
                      v.isUsingKeyboardRef.current || A.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ m(
                      Qc,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": $l(y.open),
                        "data-radix-menu-content": "",
                        dir: v.dir,
                        ...b,
                        ...g,
                        ref: k,
                        style: { outline: "none", ...g.style },
                        onKeyDown: ie(g.onKeyDown, (A) => {
                          const Y = A.target.closest("[data-radix-menu-content]") === A.currentTarget, j = A.ctrlKey || A.altKey || A.metaKey, q = A.key.length === 1;
                          Y && (A.key === "Tab" && A.preventDefault(), !j && q && K(A.key));
                          const Z = E.current;
                          if (A.target !== Z || !eg.includes(A.key)) return;
                          A.preventDefault();
                          const z = S().filter((F) => !F.disabled).map((F) => F.ref.current);
                          hl.includes(A.key) && z.reverse(), kg(z);
                        }),
                        onBlur: ie(e.onBlur, (A) => {
                          A.currentTarget.contains(A.target) || (window.clearTimeout(N.current), M.current = "");
                        }),
                        onPointerMove: ie(
                          e.onPointerMove,
                          Gn((A) => {
                            const _ = A.target, Y = O.current !== A.clientX;
                            if (A.currentTarget.contains(_) && Y) {
                              const j = A.clientX > O.current ? "right" : "left";
                              P.current = j, O.current = A.clientX;
                            }
                          })
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
xl.displayName = je;
var mg = "MenuGroup", pa = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(Le.div, { role: "group", ...r, ref: t });
  }
);
pa.displayName = mg;
var pg = "MenuLabel", kl = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(Le.div, { ...r, ref: t });
  }
);
kl.displayName = pg;
var Jr = "MenuItem", vi = "menu.itemSelect", xo = T.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = T.useRef(null), i = tr(Jr, e.__scopeMenu), a = fa(Jr, e.__scopeMenu), c = Re(t, s), l = T.useRef(!1), u = () => {
      const d = s.current;
      if (!n && d) {
        const f = new CustomEvent(vi, { bubbles: !0, cancelable: !0 });
        d.addEventListener(vi, (p) => r?.(p), { once: !0 }), kc(d, f), f.defaultPrevented ? l.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ m(
      Cl,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: ie(e.onClick, u),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), l.current = !0;
        },
        onPointerUp: ie(e.onPointerUp, (d) => {
          l.current || d.currentTarget?.click();
        }),
        onKeyDown: ie(e.onKeyDown, (d) => {
          const f = a.searchRef.current !== "";
          n || f && d.key === " " || vs.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
xo.displayName = Jr;
var Cl = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = fa(Jr, n), a = yl(n), c = T.useRef(null), l = Re(t, c), [u, d] = T.useState(!1), [f, p] = T.useState("");
    return T.useEffect(() => {
      const h = c.current;
      h && p((h.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ m(
      Kn.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ m(fh, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ m(
          Le.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: l,
            onPointerMove: ie(
              e.onPointerMove,
              Gn((h) => {
                r ? i.onItemLeave(h) : (i.onItemEnter(h), h.defaultPrevented || h.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: ie(
              e.onPointerLeave,
              Gn((h) => i.onItemLeave(h))
            ),
            onFocus: ie(e.onFocus, () => d(!0)),
            onBlur: ie(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), hg = "MenuCheckboxItem", Ml = T.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ m(Nl, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ m(
      xo,
      {
        role: "menuitemcheckbox",
        "aria-checked": eo(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": ga(n),
        onSelect: ie(
          o.onSelect,
          () => r?.(eo(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Ml.displayName = hg;
var Tl = "MenuRadioGroup", [gg, yg] = Xt(
  Tl,
  { value: void 0, onValueChange: () => {
  } }
), Sl = T.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = gt(r);
    return /* @__PURE__ */ m(gg, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ m(pa, { ...o, ref: t }) });
  }
);
Sl.displayName = Tl;
var El = "MenuRadioItem", Dl = T.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = yg(El, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ m(Nl, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ m(
      xo,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": ga(s),
        onSelect: ie(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Dl.displayName = El;
var ha = "MenuItemIndicator", [Nl, vg] = Xt(
  ha,
  { checked: !1 }
), Al = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = vg(ha, n);
    return /* @__PURE__ */ m(
      qt,
      {
        present: r || eo(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ m(
          Le.span,
          {
            ...o,
            ref: t,
            "data-state": ga(s.checked)
          }
        )
      }
    );
  }
);
Al.displayName = ha;
var bg = "MenuSeparator", Ll = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(
      Le.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Ll.displayName = bg;
var wg = "MenuArrow", Il = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = wo(n);
    return /* @__PURE__ */ m(Jc, { ...o, ...r, ref: t });
  }
);
Il.displayName = wg;
var xg = "MenuSub", [hC, Rl] = Xt(xg), $n = "MenuSubTrigger", Pl = T.forwardRef(
  (e, t) => {
    const n = Zt($n, e.__scopeMenu), r = tr($n, e.__scopeMenu), o = Rl($n, e.__scopeMenu), s = fa($n, e.__scopeMenu), i = T.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: c } = s, l = { __scopeMenu: e.__scopeMenu }, u = T.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return T.useEffect(() => u, [u]), T.useEffect(() => {
      const d = a.current;
      return () => {
        window.clearTimeout(d), c(null);
      };
    }, [a, c]), /* @__PURE__ */ m(ua, { asChild: !0, ...l, children: /* @__PURE__ */ m(
      Cl,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": $l(n.open),
        ...e,
        ref: mo(t, o.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: ie(
          e.onPointerMove,
          Gn((d) => {
            s.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), u();
            }, 100));
          })
        ),
        onPointerLeave: ie(
          e.onPointerLeave,
          Gn((d) => {
            u();
            const f = n.content?.getBoundingClientRect();
            if (f) {
              const p = n.content?.dataset.side, h = p === "right", g = h ? -5 : 5, y = f[h ? "left" : "right"], v = f[h ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + g, y: d.clientY },
                  { x: y, y: f.top },
                  { x: v, y: f.top },
                  { x: v, y: f.bottom },
                  { x: y, y: f.bottom }
                ],
                side: p
              }), window.clearTimeout(a.current), a.current = window.setTimeout(
                () => s.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (s.onTriggerLeave(d), d.defaultPrevented) return;
              s.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: ie(e.onKeyDown, (d) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && d.key === " " || tg[r.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
Pl.displayName = $n;
var Ol = "MenuSubContent", _l = T.forwardRef(
  (e, t) => {
    const n = bl(je, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Zt(je, e.__scopeMenu), i = tr(je, e.__scopeMenu), a = Rl(Ol, e.__scopeMenu), c = T.useRef(null), l = Re(t, c);
    return /* @__PURE__ */ m(Kn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(qt, { present: r || s.open, children: /* @__PURE__ */ m(Kn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(
      ma,
      {
        id: a.contentId,
        "aria-labelledby": a.triggerId,
        ...o,
        ref: l,
        align: "start",
        side: i.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (u) => {
          i.isUsingKeyboardRef.current && c.current?.focus(), u.preventDefault();
        },
        onCloseAutoFocus: (u) => u.preventDefault(),
        onFocusOutside: ie(e.onFocusOutside, (u) => {
          u.target !== a.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: ie(e.onEscapeKeyDown, (u) => {
          i.onClose(), u.preventDefault();
        }),
        onKeyDown: ie(e.onKeyDown, (u) => {
          const d = u.currentTarget.contains(u.target), f = ng[i.dir].includes(u.key);
          d && f && (s.onOpenChange(!1), a.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
_l.displayName = Ol;
function $l(e) {
  return e ? "open" : "closed";
}
function eo(e) {
  return e === "indeterminate";
}
function ga(e) {
  return eo(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function kg(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Cg(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function Mg(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = Cg(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((l) => l !== n));
  const c = i.find(
    (l) => l.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function Tg(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, u = a.y, d = c.x, f = c.y;
    u > r != f > r && n < (d - l) * (r - u) / (f - u) + l && (o = !o);
  }
  return o;
}
function Sg(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Tg(n, t);
}
function Gn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Eg = vl, Dg = ua, Ng = wl, Ag = xl, Lg = pa, Ig = kl, Rg = xo, Pg = Ml, Og = Sl, _g = Dl, $g = Al, Hg = Ll, Wg = Il, zg = Pl, Bg = _l, ko = "DropdownMenu", [Fg] = Mn(
  ko,
  [gl]
), Pe = gl(), [Ug, Hl] = Fg(ko), Wl = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, c = Pe(t), l = T.useRef(null), [u, d] = Js({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: ko
  });
  return /* @__PURE__ */ m(
    Ug,
    {
      scope: t,
      triggerId: Gr(),
      triggerRef: l,
      contentId: Gr(),
      open: u,
      onOpenChange: d,
      onOpenToggle: T.useCallback(() => d((f) => !f), [d]),
      modal: a,
      children: /* @__PURE__ */ m(Eg, { ...c, open: u, onOpenChange: d, dir: r, modal: a, children: n })
    }
  );
};
Wl.displayName = ko;
var zl = "DropdownMenuTrigger", Bl = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = Hl(zl, n), i = Pe(n);
    return /* @__PURE__ */ m(Dg, { asChild: !0, ...i, children: /* @__PURE__ */ m(
      Le.button,
      {
        type: "button",
        id: s.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": s.open,
        "aria-controls": s.open ? s.contentId : void 0,
        "data-state": s.open ? "open" : "closed",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        ...o,
        ref: mo(t, s.triggerRef),
        onPointerDown: ie(e.onPointerDown, (a) => {
          !r && a.button === 0 && a.ctrlKey === !1 && (s.onOpenToggle(), s.open || a.preventDefault());
        }),
        onKeyDown: ie(e.onKeyDown, (a) => {
          r || (["Enter", " "].includes(a.key) && s.onOpenToggle(), a.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(a.key) && a.preventDefault());
        })
      }
    ) });
  }
);
Bl.displayName = zl;
var Yg = "DropdownMenuPortal", Fl = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Pe(t);
  return /* @__PURE__ */ m(Ng, { ...r, ...n });
};
Fl.displayName = Yg;
var Ul = "DropdownMenuContent", Yl = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Hl(Ul, n), s = Pe(n), i = T.useRef(!1);
    return /* @__PURE__ */ m(
      Ag,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: ie(e.onCloseAutoFocus, (a) => {
          i.current || o.triggerRef.current?.focus(), i.current = !1, a.preventDefault();
        }),
        onInteractOutside: ie(e.onInteractOutside, (a) => {
          const c = a.detail.originalEvent, l = c.button === 0 && c.ctrlKey === !0, u = c.button === 2 || l;
          (!o.modal || u) && (i.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
Yl.displayName = Ul;
var jg = "DropdownMenuGroup", Vg = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ m(Lg, { ...o, ...r, ref: t });
  }
);
Vg.displayName = jg;
var Kg = "DropdownMenuLabel", Gg = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ m(Ig, { ...o, ...r, ref: t });
  }
);
Gg.displayName = Kg;
var qg = "DropdownMenuItem", jl = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ m(Rg, { ...o, ...r, ref: t });
  }
);
jl.displayName = qg;
var Xg = "DropdownMenuCheckboxItem", Zg = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(Pg, { ...o, ...r, ref: t });
});
Zg.displayName = Xg;
var Qg = "DropdownMenuRadioGroup", Jg = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(Og, { ...o, ...r, ref: t });
});
Jg.displayName = Qg;
var ey = "DropdownMenuRadioItem", ty = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(_g, { ...o, ...r, ref: t });
});
ty.displayName = ey;
var ny = "DropdownMenuItemIndicator", ry = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m($g, { ...o, ...r, ref: t });
});
ry.displayName = ny;
var oy = "DropdownMenuSeparator", Vl = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(Hg, { ...o, ...r, ref: t });
});
Vl.displayName = oy;
var sy = "DropdownMenuArrow", ay = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ m(Wg, { ...o, ...r, ref: t });
  }
);
ay.displayName = sy;
var iy = "DropdownMenuSubTrigger", cy = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(zg, { ...o, ...r, ref: t });
});
cy.displayName = iy;
var ly = "DropdownMenuSubContent", uy = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(
    Bg,
    {
      ...o,
      ...r,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
uy.displayName = ly;
var dy = Wl, fy = Bl, my = Fl, py = Yl, hy = jl, gy = Vl;
function Kl(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Kl(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Gl() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Kl(e)) && (r && (r += " "), r += t);
  return r;
}
const ya = "-", yy = (e) => {
  const t = by(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(ya);
      return a[0] === "" && a.length !== 1 && a.shift(), ql(a, t) || vy(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const c = n[i] || [];
      return a && r[i] ? [...c, ...r[i]] : c;
    }
  };
}, ql = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? ql(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(ya);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, bi = /^\[(.+)\]$/, vy = (e) => {
  if (bi.test(e)) {
    const t = bi.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, by = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    bs(n[o], r, o, t);
  return r;
}, bs = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : wi(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (wy(o)) {
        bs(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      bs(i, wi(t, s), n, r);
    });
  });
}, wi = (e, t) => {
  let n = e;
  return t.split(ya).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, wy = (e) => e.isThemeGetter, xy = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (s, i) => {
    n.set(s, i), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let i = n.get(s);
      if (i !== void 0)
        return i;
      if ((i = r.get(s)) !== void 0)
        return o(s, i), i;
    },
    set(s, i) {
      n.has(s) ? n.set(s, i) : o(s, i);
    }
  };
}, ws = "!", xs = ":", ky = xs.length, Cy = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const s = [];
    let i = 0, a = 0, c = 0, l;
    for (let h = 0; h < o.length; h++) {
      let g = o[h];
      if (i === 0 && a === 0) {
        if (g === xs) {
          s.push(o.slice(c, h)), c = h + ky;
          continue;
        }
        if (g === "/") {
          l = h;
          continue;
        }
      }
      g === "[" ? i++ : g === "]" ? i-- : g === "(" ? a++ : g === ")" && a--;
    }
    const u = s.length === 0 ? o : o.substring(c), d = My(u), f = d !== u, p = l && l > c ? l - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: d,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + xs, s = r;
    r = (i) => i.startsWith(o) ? s(i.substring(o.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: i,
      maybePostfixModifierPosition: void 0
    };
  }
  if (n) {
    const o = r;
    r = (s) => n({
      className: s,
      parseClassName: o
    });
  }
  return r;
}, My = (e) => e.endsWith(ws) ? e.substring(0, e.length - 1) : e.startsWith(ws) ? e.substring(1) : e, Ty = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const o = [];
    let s = [];
    return r.forEach((i) => {
      i[0] === "[" || t[i] ? (o.push(...s.sort(), i), s = []) : s.push(i);
    }), o.push(...s.sort()), o;
  };
}, Sy = (e) => ({
  cache: xy(e.cacheSize),
  parseClassName: Cy(e),
  sortModifiers: Ty(e),
  ...yy(e)
}), Ey = /\s+/, Dy = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(Ey);
  let c = "";
  for (let l = a.length - 1; l >= 0; l -= 1) {
    const u = a[l], {
      isExternal: d,
      modifiers: f,
      hasImportantModifier: p,
      baseClassName: h,
      maybePostfixModifierPosition: g
    } = n(u);
    if (d) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let y = !!g, v = r(y ? h.substring(0, g) : h);
    if (!v) {
      if (!y) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (v = r(h), !v) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      y = !1;
    }
    const b = s(f).join(":"), x = p ? b + ws : b, S = x + v;
    if (i.includes(S))
      continue;
    i.push(S);
    const w = o(v, y);
    for (let C = 0; C < w.length; ++C) {
      const E = w[C];
      i.push(x + E);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Ny() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Xl(t)) && (r && (r += " "), r += n);
  return r;
}
const Xl = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Xl(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Ay(e, ...t) {
  let n, r, o, s = i;
  function i(c) {
    const l = t.reduce((u, d) => d(u), e());
    return n = Sy(l), r = n.cache.get, o = n.cache.set, s = a, a(c);
  }
  function a(c) {
    const l = r(c);
    if (l)
      return l;
    const u = Dy(c, n);
    return o(c, u), u;
  }
  return function() {
    return s(Ny.apply(null, arguments));
  };
}
const Me = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Zl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ql = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Ly = /^\d+\/\d+$/, Iy = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ry = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Py = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Oy = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, _y = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, sn = (e) => Ly.test(e), ce = (e) => !!e && !Number.isNaN(Number(e)), Tt = (e) => !!e && Number.isInteger(Number(e)), qo = (e) => e.endsWith("%") && ce(e.slice(0, -1)), lt = (e) => Iy.test(e), $y = () => !0, Hy = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ry.test(e) && !Py.test(e)
), Jl = () => !1, Wy = (e) => Oy.test(e), zy = (e) => _y.test(e), By = (e) => !J(e) && !ee(e), Fy = (e) => En(e, nu, Jl), J = (e) => Zl.test(e), Ht = (e) => En(e, ru, Hy), Xo = (e) => En(e, Ky, ce), xi = (e) => En(e, eu, Jl), Uy = (e) => En(e, tu, zy), Lr = (e) => En(e, ou, Wy), ee = (e) => Ql.test(e), Pn = (e) => Dn(e, ru), Yy = (e) => Dn(e, Gy), ki = (e) => Dn(e, eu), jy = (e) => Dn(e, nu), Vy = (e) => Dn(e, tu), Ir = (e) => Dn(e, ou, !0), En = (e, t, n) => {
  const r = Zl.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Dn = (e, t, n = !1) => {
  const r = Ql.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, eu = (e) => e === "position" || e === "percentage", tu = (e) => e === "image" || e === "url", nu = (e) => e === "length" || e === "size" || e === "bg-size", ru = (e) => e === "length", Ky = (e) => e === "number", Gy = (e) => e === "family-name", ou = (e) => e === "shadow", qy = () => {
  const e = Me("color"), t = Me("font"), n = Me("text"), r = Me("font-weight"), o = Me("tracking"), s = Me("leading"), i = Me("breakpoint"), a = Me("container"), c = Me("spacing"), l = Me("radius"), u = Me("shadow"), d = Me("inset-shadow"), f = Me("text-shadow"), p = Me("drop-shadow"), h = Me("blur"), g = Me("perspective"), y = Me("aspect"), v = Me("ease"), b = Me("animate"), x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], w = () => [...S(), ee, J], C = () => ["auto", "hidden", "clip", "visible", "scroll"], E = () => ["auto", "contain", "none"], k = () => [ee, J, c], N = () => [sn, "full", "auto", ...k()], M = () => [Tt, "none", "subgrid", ee, J], D = () => ["auto", {
    span: ["full", Tt, ee, J]
  }, Tt, ee, J], L = () => [Tt, "auto", ee, J], P = () => ["auto", "min", "max", "fr", ee, J], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], H = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], $ = () => ["auto", ...k()], K = () => [sn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], R = () => [e, ee, J], A = () => [...S(), ki, xi, {
    position: [ee, J]
  }], _ = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Y = () => ["auto", "cover", "contain", jy, Fy, {
    size: [ee, J]
  }], j = () => [qo, Pn, Ht], q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    ee,
    J
  ], Z = () => ["", ce, Pn, Ht], W = () => ["solid", "dashed", "dotted", "double"], z = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], F = () => [ce, qo, ki, xi], Q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    ee,
    J
  ], le = () => ["none", ce, ee, J], ue = () => ["none", ce, ee, J], ge = () => [ce, ee, J], Se = () => [sn, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [lt],
      breakpoint: [lt],
      color: [$y],
      container: [lt],
      "drop-shadow": [lt],
      ease: ["in", "out", "in-out"],
      font: [By],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [lt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [lt],
      shadow: [lt],
      spacing: ["px", ce],
      text: [lt],
      "text-shadow": [lt],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", sn, J, ee, y]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ce, J, ee, a]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": x()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": x()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: w()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: C()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": C()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": C()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: E()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": E()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": E()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: N()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": N()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": N()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: N()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: N()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: N()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: N()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: N()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: N()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Tt, "auto", ee, J]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [sn, "full", "auto", a, ...k()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [ce, sn, "auto", "initial", "none", J]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ce, ee, J]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ce, ee, J]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Tt, "first", "last", "none", ee, J]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": M()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: D()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": L()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": L()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": M()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: D()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": L()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": L()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": P()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": P()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: k()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": k()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": k()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...O(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...H(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...H()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...O()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...H(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...H(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": O()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...H(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...H()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: k()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: k()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: k()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: k()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: k()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: k()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: k()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: k()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: k()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: $()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: $()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: $()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: $()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: $()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: $()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: $()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: $()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: $()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": k()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": k()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: K()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...K()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          a,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...K()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          a,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [i]
          },
          ...K()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...K()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...K()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...K()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Pn, Ht]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [r, ee, Xo]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", qo, J]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Yy, J, t]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [o, ee, J]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ce, "none", ee, Xo]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...k()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", ee, J]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", ee, J]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: R()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: R()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...W(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ce, "from-font", "auto", ee, Ht]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: R()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [ce, "auto", ee, J]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: k()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ee, J]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", ee, J]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: A()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: _()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Y()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Tt, ee, J],
          radial: ["", ee, J],
          conic: [Tt, ee, J]
        }, Vy, Uy]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: R()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: j()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: j()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: j()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: R()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: R()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: R()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: q()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": q()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": q()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": q()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": q()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": q()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": q()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": q()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": q()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": q()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": q()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": q()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": q()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": q()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": q()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: Z()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": Z()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": Z()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": Z()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": Z()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": Z()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": Z()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": Z()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": Z()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": Z()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": Z()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...W(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...W(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: R()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": R()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": R()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": R()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": R()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": R()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": R()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": R()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": R()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: R()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...W(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ce, ee, J]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ce, Pn, Ht]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: R()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          u,
          Ir,
          Lr
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: R()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", d, Ir, Lr]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": R()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: Z()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: R()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ce, Ht]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": R()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": Z()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": R()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", f, Ir, Lr]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": R()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [ce, ee, J]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...z(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": z()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [ce]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": F()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": F()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": R()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": R()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": F()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": F()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": R()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": R()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": F()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": F()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": R()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": R()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": F()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": F()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": R()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": R()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": F()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": F()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": R()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": R()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": F()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": F()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": R()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": R()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": F()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": F()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": R()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": R()
      }],
      "mask-image-radial": [{
        "mask-radial": [ee, J]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": F()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": F()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": R()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": R()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": S()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ce]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": F()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": F()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": R()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": R()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: A()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: _()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Y()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", ee, J]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          ee,
          J
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Q()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ce, ee, J]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ce, ee, J]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          p,
          Ir,
          Lr
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": R()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", ce, ee, J]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ce, ee, J]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ce, ee, J]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ce, ee, J]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ce, ee, J]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          ee,
          J
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Q()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ce, ee, J]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ce, ee, J]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ce, ee, J]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ce, ee, J]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ce, ee, J]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ce, ee, J]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ce, ee, J]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ce, ee, J]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": k()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": k()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": k()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", ee, J]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [ce, "initial", ee, J]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", v, ee, J]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ce, ee, J]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", b, ee, J]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [g, ee, J]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": w()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: le()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": le()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": le()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": le()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ue()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ue()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ue()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ue()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: ge()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ge()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ge()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [ee, J, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: w()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: Se()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Se()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Se()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Se()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: R()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: R()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ee, J]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": k()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": k()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": k()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": k()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": k()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": k()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": k()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": k()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": k()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": k()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": k()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": k()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": k()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": k()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": k()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": k()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": k()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": k()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", ee, J]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...R()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ce, Pn, Ht, Xo]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...R()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Xy = /* @__PURE__ */ Ay(qy);
function ae(...e) {
  return Xy(Gl(e));
}
function Zo({
  ...e
}) {
  return /* @__PURE__ */ m(dy, { "data-slot": "dropdown-menu", ...e });
}
function Qo({
  ...e
}) {
  return /* @__PURE__ */ m(
    fy,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function Jo({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ m(my, { children: /* @__PURE__ */ m(
    py,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: ae(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    }
  ) });
}
function we({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ m(
    hy,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: ae(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r
    }
  );
}
function es({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    gy,
    {
      "data-slot": "dropdown-menu-separator",
      className: ae("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
const Ci = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Mi = Gl, Zy = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Mi(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((l) => {
    const u = n?.[l], d = s?.[l];
    if (u === null) return null;
    const f = Ci(u) || Ci(d);
    return o[l][f];
  }), a = n && Object.entries(n).reduce((l, u) => {
    let [d, f] = u;
    return f === void 0 || (l[d] = f), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, u) => {
    let { class: d, className: f, ...p } = u;
    return Object.entries(p).every((h) => {
      let [g, y] = h;
      return Array.isArray(y) ? y.includes({
        ...s,
        ...a
      }[g]) : {
        ...s,
        ...a
      }[g] === y;
    }) ? [
      ...l,
      d,
      f
    ] : l;
  }, []);
  return Mi(e, i, c, n?.class, n?.className);
}, ks = Zy(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-transparent shadow-xs hover:bg-accent dark:bg-transparent dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Nt({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ m(
    r ? am : "button",
    {
      "data-slot": "button",
      className: ae(ks({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
var Qy = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), Jy = "VisuallyHidden", su = T.forwardRef(
  (e, t) => /* @__PURE__ */ m(
    Le.span,
    {
      ...e,
      ref: t,
      style: { ...Qy, ...e.style }
    }
  )
);
su.displayName = Jy;
var ev = su, [Co] = Mn("Tooltip", [
  vo
]), Mo = vo(), au = "TooltipProvider", tv = 700, Cs = "tooltip.open", [nv, va] = Co(au), iu = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = tv,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = T.useRef(!0), a = T.useRef(!1), c = T.useRef(0);
  return T.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ m(
    nv,
    {
      scope: t,
      isOpenDelayedRef: i,
      delayDuration: n,
      onOpen: T.useCallback(() => {
        window.clearTimeout(c.current), i.current = !1;
      }, []),
      onClose: T.useCallback(() => {
        window.clearTimeout(c.current), c.current = window.setTimeout(
          () => i.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: a,
      onPointerInTransitChange: T.useCallback((l) => {
        a.current = l;
      }, []),
      disableHoverableContent: o,
      children: s
    }
  );
};
iu.displayName = au;
var qn = "Tooltip", [rv, nr] = Co(qn), cu = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, c = va(qn, e.__scopeTooltip), l = Mo(t), [u, d] = T.useState(null), f = Gr(), p = T.useRef(0), h = i ?? c.disableHoverableContent, g = a ?? c.delayDuration, y = T.useRef(!1), [v, b] = Js({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (E) => {
      E ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Cs))) : c.onClose(), s?.(E);
    },
    caller: qn
  }), x = T.useMemo(() => v ? y.current ? "delayed-open" : "instant-open" : "closed", [v]), S = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y.current = !1, b(!0);
  }, [b]), w = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, b(!1);
  }, [b]), C = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      y.current = !0, b(!0), p.current = 0;
    }, g);
  }, [g, b]);
  return T.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ m(Xc, { ...l, children: /* @__PURE__ */ m(
    rv,
    {
      scope: t,
      contentId: f,
      open: v,
      stateAttribute: x,
      trigger: u,
      onTriggerChange: d,
      onTriggerEnter: T.useCallback(() => {
        c.isOpenDelayedRef.current ? C() : S();
      }, [c.isOpenDelayedRef, C, S]),
      onTriggerLeave: T.useCallback(() => {
        h ? w() : (window.clearTimeout(p.current), p.current = 0);
      }, [w, h]),
      onOpen: S,
      onClose: w,
      disableHoverableContent: h,
      children: n
    }
  ) });
};
cu.displayName = qn;
var Ms = "TooltipTrigger", lu = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = nr(Ms, n), s = va(Ms, n), i = Mo(n), a = T.useRef(null), c = Re(t, a, o.onTriggerChange), l = T.useRef(!1), u = T.useRef(!1), d = T.useCallback(() => l.current = !1, []);
    return T.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ m(Zc, { asChild: !0, ...i, children: /* @__PURE__ */ m(
      Le.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: ie(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !u.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: ie(e.onPointerLeave, () => {
          o.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: ie(e.onPointerDown, () => {
          o.open && o.onClose(), l.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: ie(e.onFocus, () => {
          l.current || o.onOpen();
        }),
        onBlur: ie(e.onBlur, o.onClose),
        onClick: ie(e.onClick, o.onClose)
      }
    ) });
  }
);
lu.displayName = Ms;
var ba = "TooltipPortal", [ov, sv] = Co(ba, {
  forceMount: void 0
}), uu = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = nr(ba, t);
  return /* @__PURE__ */ m(ov, { scope: t, forceMount: n, children: /* @__PURE__ */ m(qt, { present: n || s.open, children: /* @__PURE__ */ m(la, { asChild: !0, container: o, children: r }) }) });
};
uu.displayName = ba;
var xn = "TooltipContent", du = T.forwardRef(
  (e, t) => {
    const n = sv(xn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = nr(xn, e.__scopeTooltip);
    return /* @__PURE__ */ m(qt, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ m(fu, { side: o, ...s, ref: t }) : /* @__PURE__ */ m(av, { side: o, ...s, ref: t }) });
  }
), av = T.forwardRef((e, t) => {
  const n = nr(xn, e.__scopeTooltip), r = va(xn, e.__scopeTooltip), o = T.useRef(null), s = Re(t, o), [i, a] = T.useState(null), { trigger: c, onClose: l } = n, u = o.current, { onPointerInTransitChange: d } = r, f = T.useCallback(() => {
    a(null), d(!1);
  }, [d]), p = T.useCallback(
    (h, g) => {
      const y = h.currentTarget, v = { x: h.clientX, y: h.clientY }, b = uv(v, y.getBoundingClientRect()), x = dv(v, b), S = fv(g.getBoundingClientRect()), w = pv([...x, ...S]);
      a(w), d(!0);
    },
    [d]
  );
  return T.useEffect(() => () => f(), [f]), T.useEffect(() => {
    if (c && u) {
      const h = (y) => p(y, u), g = (y) => p(y, c);
      return c.addEventListener("pointerleave", h), u.addEventListener("pointerleave", g), () => {
        c.removeEventListener("pointerleave", h), u.removeEventListener("pointerleave", g);
      };
    }
  }, [c, u, p, f]), T.useEffect(() => {
    if (i) {
      const h = (g) => {
        const y = g.target, v = { x: g.clientX, y: g.clientY }, b = c?.contains(y) || u?.contains(y), x = !mv(v, i);
        b ? f() : x && (f(), l());
      };
      return document.addEventListener("pointermove", h), () => document.removeEventListener("pointermove", h);
    }
  }, [c, u, i, l, f]), /* @__PURE__ */ m(fu, { ...e, ref: s });
}), [iv, cv] = Co(qn, { isInside: !1 }), lv = /* @__PURE__ */ cm("TooltipContent"), fu = T.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, c = nr(xn, n), l = Mo(n), { onClose: u } = c;
    return T.useEffect(() => (document.addEventListener(Cs, u), () => document.removeEventListener(Cs, u)), [u]), T.useEffect(() => {
      if (c.trigger) {
        const d = (f) => {
          f.target?.contains(c.trigger) && u();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [c.trigger, u]), /* @__PURE__ */ m(
      ea,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ I(
          Qc,
          {
            "data-state": c.stateAttribute,
            ...l,
            ...a,
            ref: t,
            style: {
              ...a.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ m(lv, { children: r }),
              /* @__PURE__ */ m(iv, { scope: n, isInside: !0, children: /* @__PURE__ */ m(ev, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
du.displayName = xn;
var mu = "TooltipArrow", pu = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Mo(n);
    return cv(
      mu,
      n
    ).isInside ? null : /* @__PURE__ */ m(Jc, { ...o, ...r, ref: t });
  }
);
pu.displayName = mu;
function uv(e, t) {
  const n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), o = Math.abs(t.right - e.x), s = Math.abs(t.left - e.x);
  switch (Math.min(n, r, o, s)) {
    case s:
      return "left";
    case o:
      return "right";
    case n:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function dv(e, t, n = 5) {
  const r = [];
  switch (t) {
    case "top":
      r.push(
        { x: e.x - n, y: e.y + n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "bottom":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x + n, y: e.y - n }
      );
      break;
    case "left":
      r.push(
        { x: e.x + n, y: e.y - n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "right":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x - n, y: e.y + n }
      );
      break;
  }
  return r;
}
function fv(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function mv(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, u = a.y, d = c.x, f = c.y;
    u > r != f > r && n < (d - l) * (r - u) / (f - u) + l && (o = !o);
  }
  return o;
}
function pv(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), hv(t);
}
function hv(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (; t.length >= 2; ) {
      const s = t[t.length - 1], i = t[t.length - 2];
      if ((s.x - i.x) * (o.y - i.y) >= (s.y - i.y) * (o.x - i.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    for (; n.length >= 2; ) {
      const s = n[n.length - 1], i = n[n.length - 2];
      if ((s.x - i.x) * (o.y - i.y) >= (s.y - i.y) * (o.x - i.x)) n.pop();
      else break;
    }
    n.push(o);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var gv = iu, yv = cu, vv = lu, bv = uu, wv = du, xv = pu;
function kv({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ m(
    gv,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function Ts({
  ...e
}) {
  return /* @__PURE__ */ m(kv, { children: /* @__PURE__ */ m(yv, { "data-slot": "tooltip", ...e }) });
}
function Ss({
  ...e
}) {
  return /* @__PURE__ */ m(vv, { "data-slot": "tooltip-trigger", ...e });
}
function Es({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ m(bv, { children: /* @__PURE__ */ I(
    wv,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: ae(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ m(xv, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const xe = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
  const s = /* @__PURE__ */ m(
    "button",
    {
      onClick: e,
      disabled: n,
      className: `
        flex items-center justify-center w-8 h-8 rounded-md shrink-0
        transition-all duration-100 ease-out touch-manipulation
        ${t ? "bg-secondary text-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
        ${n ? "opacity-50 cursor-not-allowed" : ""}
      `,
      children: r
    }
  );
  return o ? /* @__PURE__ */ I(Ts, { children: [
    /* @__PURE__ */ m(Ss, { asChild: !0, children: s }),
    /* @__PURE__ */ m(Es, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, an = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), Cv = Vt(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const c = V(null), [l, u] = U(!1), [d, f] = U(void 0), p = nc({
    editor: t,
    selector: ({ editor: C }) => ({
      canUndo: C.can().undo(),
      canRedo: C.can().redo(),
      isBold: C.isActive("bold"),
      isItalic: C.isActive("italic"),
      isUnderline: C.isActive("underline"),
      isStrike: C.isActive("strike"),
      isCode: C.isActive("code"),
      isHighlight: C.isActive("highlight"),
      isH1: C.isActive("heading", { level: 1 }),
      isH2: C.isActive("heading", { level: 2 }),
      isH3: C.isActive("heading", { level: 3 }),
      isH4: C.isActive("heading", { level: 4 }),
      isH5: C.isActive("heading", { level: 5 }),
      isBlockquote: C.isActive("blockquote"),
      isBulletList: C.isActive("bulletList"),
      isOrderedList: C.isActive("orderedList"),
      isTaskList: C.isActive("taskList"),
      isCodeBlock: C.isActive("codeBlock"),
      isLink: C.isActive("link")
    })
  }), h = B(() => {
    const { view: C } = t, { from: E } = C.state.selection, k = C.coordsAtPos(E);
    f({ top: k.bottom + 8, left: k.left }), u(!0);
  }, [t]), g = B((C, E) => {
    t.chain().focus().setImage({ src: C, alt: E }).run(), u(!1);
  }, [t]), y = B(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), v = B((C) => {
    t.chain().focus().insertCallout({ type: C }).run();
  }, [t]), b = V(/* @__PURE__ */ new Map()), x = V(/* @__PURE__ */ new Map()), S = B((C) => {
    const { doc: E, tr: k } = C.state;
    let N = !1;
    const M = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), D = C.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    b.current.clear(), D.forEach((P, O) => {
      P.querySelectorAll(":scope > li").forEach(($) => {
        const K = $, R = (K.textContent || "").trim().substring(0, 50);
        b.current.set(`${O}-${R}`, K.getBoundingClientRect());
      });
    });
    const L = [];
    E.descendants((P, O, H, $) => {
      if (!M.has(P.type.name)) return !0;
      let K = !1;
      if (P.forEach((A) => {
        A.type.name === "taskItem" && (K = !0);
      }), !K) return !0;
      let R = 0;
      return E.nodesBetween(0, O, (A) => (M.has(A.type.name) && R++, !0)), L.push({ node: P, pos: O, depth: R }), !0;
    }), L.sort((P, O) => O.depth - P.depth);
    for (const { node: P, pos: O } of L) {
      const H = [];
      let $ = 0;
      P.forEach((W) => {
        H.push({
          node: W,
          isTask: W.type.name === "taskItem",
          checked: W.type.name === "taskItem" && W.attrs.checked === !0,
          originalIndex: $++
        });
      });
      const K = H.filter((W) => W.isTask && !W.checked), R = H.filter((W) => W.isTask && W.checked), A = [...H], _ = H.map((W, z) => ({ index: z, isTask: W.isTask })).filter((W) => W.isTask).map((W) => W.index), Y = [...K, ...R];
      if (_.forEach((W, z) => {
        A[W] = Y[z];
      }), !A.some((W, z) => W.node !== H[z].node)) continue;
      const q = P.type.create(
        P.attrs,
        A.map((W) => W.node)
      ), Z = k.mapping.map(O);
      k.replaceWith(Z, Z + P.nodeSize, q), N = !0;
    }
    N && (C.view.dispatch(k), requestAnimationFrame(() => {
      C.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const H = O.querySelectorAll(":scope > li"), $ = /* @__PURE__ */ new Map();
        b.current.forEach((K, R) => {
          const A = R.replace(/^\d+-/, "");
          $.set(A, K);
        }), H.forEach((K) => {
          const R = K, A = (R.textContent || "").trim().substring(0, 50), _ = $.get(A);
          if (!_) return;
          const Y = R.getBoundingClientRect(), j = _.top - Y.top;
          if (Math.abs(j) < 2) return;
          R.style.transform = `translateY(${j}px)`, R.style.transition = "none", R.style.zIndex = "1", R.offsetHeight, R.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", R.style.transform = "translateY(0)";
          const q = () => {
            R.style.transform = "", R.style.transition = "", R.style.zIndex = "", R.removeEventListener("transitionend", q);
          };
          R.addEventListener("transitionend", q), setTimeout(q, 400);
        });
      });
    }));
  }, []);
  G(() => {
    if (!s || !t) return;
    const C = /* @__PURE__ */ new Map();
    t.state.doc.descendants((k, N) => (k.type.name === "taskItem" && C.set(N, k.attrs.checked === !0), !0)), x.current = C;
    const E = ({ transaction: k }) => {
      if (!k.docChanged) return;
      const N = /* @__PURE__ */ new Map();
      t.state.doc.descendants((L, P) => (L.type.name === "taskItem" && N.set(P, L.attrs.checked === !0), !0));
      const M = x.current;
      let D = !1;
      if (M.size > 0 && N.size > 0) {
        let L = 0, P = 0;
        M.forEach((O) => {
          O && L++;
        }), N.forEach((O) => {
          O && P++;
        }), L !== P && (D = !0);
      }
      x.current = N, D && setTimeout(() => {
        S(t);
      }, 150);
    };
    return t.on("transaction", E), () => {
      t.off("transaction", E);
    };
  }, [t, s, S]);
  const w = B(() => {
    S(t);
  }, [t, S]);
  return /* @__PURE__ */ I("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Od, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(_d, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(an, {}),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(_s, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m($s, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(Hs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(Ws, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(sc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(ac, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(zs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(an, {}),
    /* @__PURE__ */ I(Zo, { children: [
      /* @__PURE__ */ m(Qo, { asChild: !0, children: /* @__PURE__ */ I(
        "button",
        {
          className: `
              flex items-center gap-1 h-8 px-2 rounded-md shrink-0
              transition-all duration-100 ease-out touch-manipulation
              text-xs font-semibold
              ${p?.isH1 || p?.isH2 || p?.isH3 || p?.isH4 || p?.isH5 ? "bg-secondary text-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
            `,
          children: [
            /* @__PURE__ */ m("span", { className: "min-w-[18px] text-center", children: p?.isH1 ? "H1" : p?.isH2 ? "H2" : p?.isH3 ? "H3" : p?.isH4 ? "H4" : p?.isH5 ? "H5" : "P" }),
            /* @__PURE__ */ m(At, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ I(Jo, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !p?.isH1 && !p?.isH2 && !p?.isH3 && !p?.isH4 && !p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }),
              "Paragraph"
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: p?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 1" })
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: p?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 2" })
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: p?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 3" })
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: p?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 4" })
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 5 }).run(),
            className: p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H5" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 5" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ m(an, {}),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(Bs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m(Fs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m(Us, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(Ys, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(ic, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => {
          if (p?.isTaskList)
            t.chain().focus().sinkListItem("taskItem").run();
          else if ((p?.isBulletList || p?.isOrderedList) && (t.chain().focus().sinkListItem("listItem").run(), p?.isOrderedList)) {
            const { state: C, view: E } = t, { $from: k } = C.selection, N = C.schema.nodes.orderedList, M = C.schema.nodes.bulletList;
            if (N && M)
              for (let D = k.depth; D >= 0; D--) {
                const L = k.node(D);
                if (L.type === N && D >= 2) {
                  const P = k.node(D - 1);
                  if (P.type.name === "listItem" || P.type.name === "taskItem") {
                    const O = k.before(D);
                    E.dispatch(C.tr.setNodeMarkup(O, M, L.attrs));
                    break;
                  }
                }
                if (L.type.name === "bulletList" || L.type.name === "taskList") break;
              }
          }
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ m($d, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(Hd, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(an, {}),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m(us, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: h,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m(Ps, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ m(cc, { size: 16 })
      }
    ),
    /* @__PURE__ */ I(Zo, { children: [
      /* @__PURE__ */ m(Qo, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ m(Kr, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ I(Jo, { align: "start", children: [
        /* @__PURE__ */ I(we, { onClick: () => v("info"), children: [
          /* @__PURE__ */ m(Kr, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ I(we, { onClick: () => v("note"), children: [
          /* @__PURE__ */ m(js, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ I(we, { onClick: () => v("prompt"), children: [
          /* @__PURE__ */ m(Wd, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ I(we, { onClick: () => v("resources"), children: [
          /* @__PURE__ */ m(zd, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ I(we, { onClick: () => v("todo"), children: [
          /* @__PURE__ */ m(Vs, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ I(Zo, { children: [
      /* @__PURE__ */ m(Qo, { asChild: !0, children: /* @__PURE__ */ I(
        Nt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ m(us, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ I(Jo, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ m(Ba, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ m(Ba, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ m(dn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ m(es, {}),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ m(Fa, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ m(Fa, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ m(dn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ m(es, {}),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ m(Ua, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ m(Ua, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ m(es, {}),
        /* @__PURE__ */ I(
          we,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ m(dn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ m(
      wc,
      {
        isOpen: l,
        onClose: () => u(!1),
        onInsert: g,
        position: d
      }
    ),
    /* @__PURE__ */ m(an, {}),
    /* @__PURE__ */ m(
      xe,
      {
        onClick: w,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m(Bd, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ I(be, { children: [
      /* @__PURE__ */ m(an, {}),
      /* @__PURE__ */ I(Ts, { children: [
        /* @__PURE__ */ m(Ss, { asChild: !0, children: /* @__PURE__ */ m(
          "button",
          {
            ref: c,
            onClick: () => {
              c.current && a?.(c.current);
            },
            className: `
                  flex items-center justify-center w-8 h-8 rounded-md shrink-0
                  transition-all duration-100 ease-out touch-manipulation
                  bg-transparent text-muted-foreground hover:bg-secondary active:bg-secondary/80
                  hover:text-foreground
                `,
            children: /* @__PURE__ */ m(lo, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ m(Es, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ m("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ I(Ts, { children: [
      /* @__PURE__ */ m(Ss, { asChild: !0, children: /* @__PURE__ */ I(
        Nt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ m(Kt, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ m(Es, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function Mv({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: c }) {
  const l = s === "markdown", [u, d] = U(""), [f, p] = U(""), [h, g] = U(!1), [y, v] = U(!1), [b, x] = U(!1), [S, w] = U(!1), [C, E] = U([]), [k, N] = U(0), [M, D] = U(null), [L, P] = U(!1), O = V(!1), H = V(null), $ = V(null), K = V(!1);
  G(() => {
    t && o && o.trim() && d(o);
  }, [t, o, r]);
  const R = B(() => {
    if (!u || !e) {
      E([]), N(0), D(null);
      return;
    }
    const W = [];
    let z;
    try {
      if (y)
        z = new RegExp(u, h ? "g" : "gi");
      else {
        let F = u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        b && (F = `\\b${F}\\b`), z = new RegExp(F, h ? "g" : "gi");
      }
      D(null);
    } catch (F) {
      D(F.message), E([]);
      return;
    }
    if (l) {
      let F;
      for (; (F = z.exec(i)) !== null; )
        W.push({
          from: F.index,
          to: F.index + F[0].length,
          text: F[0]
        });
    } else {
      const { doc: F } = e.state;
      F.descendants((Q, le) => {
        if (Q.isText && Q.text) {
          let ue;
          for (; (ue = z.exec(Q.text)) !== null; )
            W.push({
              from: le + ue.index,
              to: le + ue.index + ue[0].length,
              text: ue[0]
            });
        }
        return !0;
      });
    }
    E(W), W.length > 0 && k >= W.length && N(0);
  }, [u, h, y, b, e, k, l, i]);
  G(() => {
    R();
  }, [R]), G(() => {
    l && c && (t && C.length > 0 ? c(C, k) : c([], 0));
  }, [l, t, C, k, c]), G(() => {
    if (!e) return;
    if (l) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const W = typeof e.commands.setSearchHighlight == "function";
    t && u && W ? e.commands.setSearchHighlight({
      searchTerm: u,
      caseSensitive: h,
      useRegex: y,
      currentMatchIndex: k
    }) : W && e.commands.clearSearchHighlight();
  }, [e, t, u, h, y, k, l, C, i]), G(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), c && c([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), P(!1)), O.current = !1);
  }, [t, e, c]), G(() => {
    if (C.length > 0 && k < C.length) {
      const W = C[k];
      if (l) {
        const F = document.querySelector(".syntax-textarea");
        if (F && K.current) {
          const Q = parseInt(getComputedStyle(F).lineHeight) || 22, ue = i.substring(0, W.from).split(`
`).length;
          F.scrollTop = Math.max(0, (ue - 3) * Q);
        }
        K.current && (K.current = !1);
        return;
      }
      const z = e.view.domAtPos(W.from);
      z.node && z.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), K.current && (K.current = !1);
    }
  }, [k, C, e, l, i]), G(() => {
    t && H.current && (H.current.focus(), H.current.select());
  }, [t, r]);
  const A = B(() => {
    C.length !== 0 && (K.current = !0, N((W) => (W + 1) % C.length));
  }, [C.length]), _ = B(() => {
    C.length !== 0 && (K.current = !0, N((W) => (W - 1 + C.length) % C.length));
  }, [C.length]), Y = B(() => {
    if (C.length === 0 || k >= C.length) return;
    const W = C[k];
    if (l && a) {
      const z = i.substring(0, W.from) + f + i.substring(W.to);
      a(z), setTimeout(R, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: W.from, to: W.to }).deleteSelection().insertContent(f).run(), setTimeout(R, 10);
  }, [C, k, f, e, R, l, i, a]), j = B(() => {
    if (C.length === 0) return;
    if (l && a) {
      const z = [...C].sort((Q, le) => le.from - Q.from);
      let F = i;
      z.forEach((Q) => {
        F = F.substring(0, Q.from) + f + F.substring(Q.to);
      }), a(F), setTimeout(R, 10);
      return;
    }
    const W = [...C].sort((z, F) => F.from - z.from);
    e.chain().focus(), W.forEach((z) => {
      e.chain().setTextSelection({ from: z.from, to: z.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(R, 10);
  }, [C, f, e, R, l, i, a]), q = B(() => {
    if (C.length === 0 || !u || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: u,
      caseSensitive: h,
      useRegex: y,
      wholeWord: b
    }) && (P(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [C, u, h, y, b, e, n]), Z = B((W) => {
    W.key === "Enter" ? (W.preventDefault(), W.shiftKey ? _() : A(), H.current?.focus()) : W.key === "Escape" ? (W.preventDefault(), n()) : W.key === "h" && (W.ctrlKey || W.metaKey) ? (W.preventDefault(), w((z) => !z)) : W.key === "l" && (W.ctrlKey || W.metaKey) && W.shiftKey && (W.preventDefault(), q());
  }, [A, _, n, q]);
  return t ? /* @__PURE__ */ I(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: Z,
      children: [
        /* @__PURE__ */ I("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ I("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(Fd, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: H,
                type: "text",
                placeholder: "Find...",
                value: u,
                onChange: (W) => d(W.target.value),
                className: `find-replace-input ${M ? "has-error" : ""}`
              }
            ),
            M && /* @__PURE__ */ m("span", { className: "find-replace-error", title: M, children: "!" })
          ] }),
          /* @__PURE__ */ m("span", { className: "find-replace-count", children: C.length > 0 ? `${k + 1} of ${C.length}` : u ? "No results" : "" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: _,
              disabled: C.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ m(Ud, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: A,
              disabled: C.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ m(At, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: q,
              disabled: C.length === 0,
              className: `find-replace-btn ${L ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${C.length} matches`,
              children: /* @__PURE__ */ m(Yd, { size: 16 })
            }
          ),
          /* @__PURE__ */ m("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => g((W) => !W),
              className: `find-replace-btn ${h ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ m(jd, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => x((W) => !W),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ m(Vd, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => v((W) => !W),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ m(Kd, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => w((W) => !W),
              className: `find-replace-btn ${S ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ m(ds, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ m(ht, { size: 16 })
            }
          )
        ] }),
        S && /* @__PURE__ */ I("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ I("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(ds, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: $,
                type: "text",
                placeholder: "Replace with...",
                value: f,
                onChange: (W) => p(W.target.value),
                className: "find-replace-input"
              }
            )
          ] }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: Y,
              disabled: C.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            }
          ),
          /* @__PURE__ */ I(
            "button",
            {
              onClick: j,
              disabled: C.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ m(Gd, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const Tv = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), ut = Tv ? "⌘" : "Ctrl", Sv = ({ editor: e }) => {
  const [t, n] = U(!1), [r, o] = U(0), [s, i] = U(0), [a, c] = U(""), [l, u] = U(""), [d, f] = U(!1), [p, h] = U(!1);
  G(() => {
    if (!e) return;
    const E = () => {
      const N = e.storage.selectAllOccurrences;
      N ? (n(N.isActive), o(N.ranges.length), i(N.allMatches.length), c(N.searchTerm), u(N.typedBuffer), f(N.isTypingReplace), h(N.isIncremental)) : (n(!1), o(0), i(0));
    }, k = () => {
      E();
    };
    return e.on("transaction", k), E(), () => {
      e.off("transaction", k);
    };
  }, [e]);
  const g = B(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), y = B(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), v = B(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), b = B(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), x = B(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), S = B(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), w = B(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), C = B(() => {
    a && (e.commands.selectAllOccurrences({
      searchTerm: a,
      caseSensitive: !1,
      useRegex: !1,
      wholeWord: !1
    }), e.commands.focus());
  }, [e, a]);
  return !t || r === 0 ? null : /* @__PURE__ */ I("div", { className: "select-all-action-bar", children: [
    /* @__PURE__ */ I("div", { className: "select-all-action-bar-inner", children: [
      /* @__PURE__ */ I("div", { className: "select-all-action-bar-count", children: [
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-number", children: p && s > 0 ? `${r}/${s}` : r }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-label", children: "selected" })
      ] }),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ I(be, { children: [
        /* @__PURE__ */ m(co, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-old", children: a }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-new", children: l || "∅" })
      ] }) : /* @__PURE__ */ m(be, { children: /* @__PURE__ */ I("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
        '"'
      ] }) }) }),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }),
      p && r < s && /* @__PURE__ */ I(be, { children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: w,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${ut}+D)`,
            children: /* @__PURE__ */ m(Ks, { size: 14 })
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: C,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${ut}+Shift+L)`,
            children: "All"
          }
        ),
        /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: g,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${ut}+B)`,
          children: /* @__PURE__ */ m(_s, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${ut}+I)`,
          children: /* @__PURE__ */ m($s, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${ut}+U)`,
          children: /* @__PURE__ */ m(Hs, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ m(Ws, { size: 14 })
        }
      ),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: x,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ m(dn, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: S,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ m(ht, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ I(be, { children: [
      /* @__PURE__ */ I("kbd", { children: [
        ut,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ I("kbd", { children: [
        ut,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ I("kbd", { children: [
        ut,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ I(be, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ I("kbd", { children: [
        ut,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, Ev = Vt(Sv), Rr = "-dismissed";
function Dv(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function Nv(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: r = 1e3,
    enabled: o = !0,
    onSave: s,
    onRecover: i
  } = t, [a, c] = U({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), l = V(null), u = V(""), d = V(0);
  G(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const v = localStorage.getItem(n), b = localStorage.getItem(n + Rr);
        if (v && !b) {
          let x = "";
          try {
            x = e.getHTML() || "";
          } catch {
            return;
          }
          v !== x && v.length > 50 && c((S) => ({ ...S, hasRecoverableContent: !0 }));
        }
      } catch (v) {
        console.warn("useAutoSave: Error checking for recoverable content", v);
      }
  }, [e, n, o]);
  const f = B(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const v = e.getHTML(), b = Dv(v);
        if (b === d.current && v.length === u.current.length) {
          c((x) => ({ ...x, status: "saved" }));
          return;
        }
        if (v.length < 20)
          return;
        c((x) => ({ ...x, status: "saving" })), localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), u.current = v, d.current = b, c((x) => ({
          ...x,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(v), setTimeout(() => {
          c((x) => x.status === "saved" ? { ...x, status: "idle" } : x);
        }, 2e3);
      } catch (v) {
        console.error("useAutoSave: Error saving content", v), c((b) => ({
          ...b,
          status: "error",
          error: v instanceof Error ? v.message : "Failed to save"
        }));
      }
  }, [e, n, o, s]);
  G(() => {
    if (!e || !o || e.isDestroyed) return;
    const v = () => {
      e.isDestroyed || (l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        f();
      }, r));
    };
    return e.on("update", v), () => {
      e.off("update", v), l.current && clearTimeout(l.current);
    };
  }, [e, r, o, f]), G(() => {
    if (!e || !o || e.isDestroyed) return;
    const v = () => {
      if (!e.isDestroyed)
        try {
          const b = e.getHTML();
          b.length >= 20 && (localStorage.setItem(n, b), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()));
        } catch (b) {
          console.warn("useAutoSave: Error saving on unload", b);
        }
    };
    return window.addEventListener("beforeunload", v), () => {
      window.removeEventListener("beforeunload", v);
    };
  }, [e, n, o]);
  const p = B(() => {
    l.current && clearTimeout(l.current), f();
  }, [f]), h = B(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Rr), u.current = "", c({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (v) {
      console.warn("useAutoSave: Error clearing content", v);
    }
  }, [n]), g = B(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const v = localStorage.getItem(n);
      return v && e && !e.isDestroyed ? (c((b) => ({ ...b, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(v), u.current = v, localStorage.removeItem(n + Rr), i?.(v);
          } catch (b) {
            console.warn("useAutoSave: Error setting content during recovery", b);
          }
      }), v) : null;
    } catch (v) {
      return console.warn("useAutoSave: Error recovering content", v), null;
    }
  }, [e, n, i]), y = B(() => {
    try {
      localStorage.setItem(n + Rr, "true"), c((v) => ({ ...v, hasRecoverableContent: !1 }));
    } catch (v) {
      console.warn("useAutoSave: Error dismissing recovery", v);
    }
  }, [n]);
  return {
    ...a,
    save: p,
    clear: h,
    recover: g,
    dismissRecovery: y
  };
}
function jr(e, t, n) {
  const { state: r } = e, { tr: o } = r;
  t !== n && o.delete(t, n);
  const s = o.doc.resolve(t), i = r.schema.nodes.horizontalRule.create(), a = s.before(s.depth), c = s.after(s.depth);
  o.replaceWith(a, c, i);
  const l = a + i.nodeSize;
  if (l < o.doc.content.size) {
    const u = o.doc.resolve(l);
    u.nodeAfter && u.nodeAfter.isTextblock ? o.setSelection(qe.create(o.doc, l + 1)) : u.nodeAfter && o.setSelection(qe.near(o.doc.resolve(l)));
  } else {
    const d = r.schema.nodes.paragraph.create();
    o.insert(l, d), o.setSelection(qe.create(o.doc, l + 1));
  }
  o.scrollIntoView(), e.view.dispatch(o);
}
function to(e) {
  return e.replace(/^[ \t]*\u200B[ \t]*$/gm, "").replace(/\u200B/g, "");
}
function Av(e, {
  editor: t,
  turndownService: n,
  editorModeRef: r,
  handleModeSwitch: o,
  wordCount: s,
  autoSaveState: i,
  setIsFindReplaceOpen: a,
  setFindReplaceFocusTrigger: c
}) {
  Ld(e, () => ({
    getEditor: () => t,
    getHTML: () => t?.getHTML() || "",
    getMarkdown: () => t ? to(n.turndown(t.getHTML())) : "",
    getText: () => t?.getText() || "",
    setContent: (l) => {
      t && !t.isDestroyed && queueMicrotask(() => {
        t.commands.setContent(l);
      });
    },
    clearContent: () => {
      t && !t.isDestroyed && t.commands.clearContent();
    },
    focus: (l) => {
      t && !t.isDestroyed && t.commands.focus(l);
    },
    blur: () => {
      t && !t.isDestroyed && t.commands.blur();
    },
    isEmpty: () => t?.isEmpty || !0,
    isFocused: () => t?.isFocused || !1,
    getMode: () => r.current,
    setMode: (l) => o(l),
    toggleMode: () => {
      const l = r.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return o(l), l;
    },
    getWordCount: () => ({
      words: s.words,
      characters: s.characters,
      charactersWithSpaces: s.charactersWithSpaces
    }),
    undo: () => t?.commands.undo(),
    redo: () => t?.commands.redo(),
    canUndo: () => t?.can().undo() || !1,
    canRedo: () => t?.can().redo() || !1,
    insertContent: (l) => t?.commands.insertContent(l),
    insertImage: (l, u = "") => t?.commands.setImage({ src: l, alt: u }),
    insertTable: (l = 3, u = 3) => t?.commands.insertTable({ rows: l, cols: u, withHeaderRow: !0 }),
    insertCodeBlock: (l) => {
      l ? t?.commands.setCodeBlock({ language: l }) : t?.commands.setCodeBlock();
    },
    insertCallout: (l = "info") => t?.commands.insertCallout?.({ type: l }),
    insertHorizontalRule: () => {
      t && jr(t, t.state.selection.from, t.state.selection.from);
    },
    toggleBold: () => t?.commands.toggleBold(),
    toggleItalic: () => t?.commands.toggleItalic(),
    toggleUnderline: () => t?.commands.toggleUnderline(),
    toggleStrike: () => t?.commands.toggleStrike(),
    toggleCode: () => t?.commands.toggleCode(),
    toggleHighlight: () => t?.commands.toggleHighlight(),
    setHeading: (l) => {
      l === 0 ? t?.commands.setParagraph() : t?.commands.setHeading({ level: l });
    },
    toggleBulletList: () => t?.commands.toggleBulletList(),
    toggleOrderedList: () => t?.commands.toggleOrderedList(),
    toggleTaskList: () => t?.commands.toggleTaskList(),
    toggleBlockquote: () => t?.commands.toggleBlockquote(),
    setLink: (l) => t?.commands.setLink({ href: l }),
    unsetLink: () => t?.commands.unsetLink(),
    openFindReplace: () => {
      a(!0), c((l) => l + 1);
    },
    closeFindReplace: () => a(!1),
    save: () => i.save(),
    clearSavedContent: () => i.clear(),
    getSelectedText: () => {
      if (!t) return "";
      const { from: l, to: u } = t.state.selection;
      return t.state.doc.textBetween(l, u, " ");
    },
    isEditable: () => t?.isEditable || !1,
    setEditable: (l) => t?.setEditable(l),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!t) return [];
      const l = [];
      return t.state.doc.descendants((u, d) => {
        if (u.type.name === "heading") {
          const f = u.attrs.level, p = u.textContent.trim();
          p && l.push({ id: `toc-heading-${d}`, text: p, level: f, pos: d });
        }
      }), l;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (l) => {
      if (!(!t || t.isDestroyed))
        try {
          const u = t.state.doc.resolve(l), d = t.view.nodeDOM(u.before(u.depth + 1));
          if (d instanceof HTMLElement) {
            const f = t.view.dom.closest(".editor-content-wrapper");
            if (f) {
              const p = f.getBoundingClientRect(), g = d.getBoundingClientRect().top - p.top + f.scrollTop;
              f.scrollTo({ top: g - 20, behavior: "smooth" });
            } else
              d.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          t.commands.setTextSelection(l + 1);
        } catch {
        }
    }
  }), [t, n, o, s, i, a]);
}
const Lv = new Ae("tableCellMenu");
function Iv(e) {
  return new Ne({
    key: Lv,
    props: {
      handleDOMEvents: {
        contextmenu(t, n) {
          const o = n.target.closest("td, th");
          if (o && o.closest(".ProseMirror")) {
            n.preventDefault();
            const s = t.posAtDOM(o, 0);
            return e.chain().focus().setTextSelection(s).run(), Rv(n, e, s), !0;
          }
          return !1;
        }
      }
    }
  });
}
function Rv(e, t, n) {
  const r = document.querySelector(".table-cell-menu-dropdown");
  r && r.remove();
  const o = document.createElement("div");
  o.className = "table-cell-menu-dropdown";
  const s = 170, i = 280;
  let a = e.clientY, c = e.clientX;
  c + s > window.innerWidth - 12 && (c = window.innerWidth - s - 12), c < 12 && (c = 12), a + i > window.innerHeight - 12 && (a = e.clientY - i), a < 12 && (a = 12);
  const l = document.documentElement.classList.contains("dark"), u = l ? "#1f1f1f" : "#ffffff", d = l ? "#3a3a3a" : "#e5e5e5", f = l ? "#e5e5e5" : "#333333";
  o.style.cssText = "position:fixed;top:" + a + "px;left:" + c + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + u + ";border:1px solid " + d + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + f + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const p = t.state.doc.resolve(n);
  let h = !1;
  for (let E = p.depth; E >= 0; E--)
    if (p.node(E).type.name === "table") {
      p.node(E).firstChild?.firstChild?.type.name === "tableHeader" && (h = !0);
      break;
    }
  const g = [
    { label: "Insert Column Left", icon: "col-left", action: () => t.chain().focus().setTextSelection(n).addColumnBefore().run() },
    { label: "Insert Column Right", icon: "col-right", action: () => t.chain().focus().setTextSelection(n).addColumnAfter().run() },
    { label: "Insert Row Above", icon: "row-up", action: () => t.chain().focus().setTextSelection(n).addRowBefore().run() },
    { label: "Insert Row Below", icon: "row-down", action: () => t.chain().focus().setTextSelection(n).addRowAfter().run() },
    { label: "divider" },
    { label: h ? "✓ Header Row" : "  Header Row", icon: "toggle-header", action: () => t.chain().focus().setTextSelection(n).toggleHeaderRow().run() },
    { label: "divider" },
    { label: "Delete Column", icon: "delete", action: () => t.chain().focus().setTextSelection(n).deleteColumn().run(), destructive: !0 },
    { label: "Delete Row", icon: "delete", action: () => t.chain().focus().setTextSelection(n).deleteRow().run(), destructive: !0 },
    { label: "Delete Table", icon: "table-delete", action: () => t.chain().focus().setTextSelection(n).deleteTable().run(), destructive: !0 },
    { label: "divider" },
    { label: "Copy Table", icon: "copy", action: () => Pv(t) }
  ], y = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, v = l ? "#2a2a2a" : "#f5f5f5", b = l ? "#ff6b6b" : "#dc2626", x = l ? "#999999" : "#666666", S = l ? "#333333" : "#e5e5e5";
  g.forEach((E) => {
    if (E.label === "divider") {
      const k = document.createElement("div");
      k.style.cssText = "height:1px;background:" + S + ";margin:4px 0;", o.appendChild(k);
    } else {
      const k = document.createElement("button");
      k.type = "button";
      const N = E.destructive ? b : f;
      k.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + N + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const M = y[E.icon || ""] || "", D = E.destructive ? b : x;
      k.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + D + ';">' + M + '</span><span style="flex:1;white-space:nowrap;">' + E.label + "</span>", k.addEventListener("mouseenter", () => {
        k.style.background = E.destructive ? l ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : v;
      }), k.addEventListener("mouseleave", () => {
        k.style.background = "transparent";
      }), k.addEventListener("click", (L) => {
        L.preventDefault(), L.stopPropagation(), E.action && E.action(), o.remove();
      }), o.appendChild(k);
    }
  }), document.body.appendChild(o);
  const w = (E) => {
    const k = E.target;
    o.contains(k) || (o.remove(), document.removeEventListener("mousedown", w), document.removeEventListener("keydown", C));
  }, C = (E) => {
    E.key === "Escape" && (o.remove(), document.removeEventListener("mousedown", w), document.removeEventListener("keydown", C));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", w), document.addEventListener("keydown", C);
  }, 0);
}
function Pv(e) {
  const { state: t } = e, { selection: n } = t;
  let r = null;
  if (t.doc.descendants((o, s) => {
    if (o.type.name === "table" && s <= n.from && s + o.nodeSize >= n.to)
      return r = o, !1;
  }), r) {
    const o = (i) => {
      if (i.type.name === "table") return "<table>" + i.content.content.map(o).join("") + "</table>";
      if (i.type.name === "tableRow") return "<tr>" + i.content.content.map(o).join("") + "</tr>";
      if (i.type.name === "tableCell") {
        const a = i.attrs, c = a.colspan > 1 ? ' colspan="' + a.colspan + '"' : "", l = a.rowspan > 1 ? ' rowspan="' + a.rowspan + '"' : "";
        return "<td" + c + l + ">" + i.textContent + "</td>";
      }
      if (i.type.name === "tableHeader") {
        const a = i.attrs, c = a.colspan > 1 ? ' colspan="' + a.colspan + '"' : "", l = a.rowspan > 1 ? ' rowspan="' + a.rowspan + '"' : "";
        return "<th" + c + l + ">" + i.textContent + "</th>";
      }
      return i.textContent || "";
    }, s = o(r);
    navigator.clipboard.writeText(s).then(() => {
      const i = document.createElement("div");
      i.className = "tcm-toast", i.textContent = "Table copied to clipboard", i.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:6px;font-size:13px;z-index:99999;animation:fadeInOut 2s ease-in-out forwards;", document.body.appendChild(i), setTimeout(() => i.remove(), 2e3);
    });
  }
}
const Ov = Pf.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Iv(this.editor)
    ];
  }
}), _v = Of.extend({}), Bn = new Ae("tableSorting");
let Bt = null, Hn = null;
function $v(e) {
  const t = parseFloat(e.replace(/[,$%]/g, ""));
  if (!isNaN(t) && e.match(/^[\d,.$%\-+]+$/))
    return { type: "number", value: t };
  const n = [/^\d{4}-\d{2}-\d{2}/, /^\d{1,2}\/\d{1,2}\/\d{2,4}/, /^\d{1,2}-\d{1,2}-\d{2,4}/];
  for (const r of n)
    if (r.test(e)) {
      const o = new Date(e);
      if (!isNaN(o.getTime()))
        return { type: "date", value: o };
    }
  return { type: "string", value: e.toLowerCase() };
}
function Hv(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function Wv(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (h, g) => {
    if (h.type.name === "table" && g === t)
      return s = h, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const i = Bt?.tablePos === t && Bt?.columnIndex === n && Bt?.direction === "asc" ? "desc" : "asc";
  Bt = { tablePos: t, columnIndex: n, direction: i }, Hn = null;
  const a = [];
  s.forEach((h) => {
    if (h.type.name === "tableRow") {
      let g = !1;
      h.forEach((y) => {
        y.type.name === "tableHeader" && (g = !0);
      }), a.push({ node: h, isHeader: g });
    }
  });
  const c = a.filter((h) => h.isHeader), l = a.filter((h) => !h.isHeader);
  if (l.length < 2) {
    Ti(n, i), o.dispatch(r.tr.setMeta(Bn, { updated: !0 }));
    return;
  }
  const u = l.map((h) => {
    let g = "", y = 0;
    return h.node.forEach((v) => {
      y === n && (g = v.textContent || ""), y++;
    }), { ...h, sortValue: $v(g) };
  }), d = u.map((h, g) => g);
  u.sort((h, g) => Hv(h.sortValue, g.sortValue, i));
  const f = u.map((h, g) => l.indexOf(h));
  if (d.some((h, g) => h !== f[g])) {
    const h = [];
    c.forEach((v) => h.push(v.node)), u.forEach((v) => h.push(v.node));
    const g = s.type.create(s.attrs, h), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, g), y.setMeta(Bn, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(Bn, { updated: !0 }));
  Ti(n, i);
}
function Ti(e, t) {
  const n = document.querySelector(".table-sort-toast");
  n && n.remove();
  const r = document.createElement("div");
  r.className = "table-sort-toast";
  const o = t === "asc" ? "ascending" : "descending", s = t === "asc" ? "↑" : "↓";
  r.innerHTML = '<span style="margin-right:6px;">' + s + "</span> Sorted column " + (e + 1) + " " + o;
  const i = document.documentElement.classList.contains("dark");
  r.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:" + (i ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)") + ";color:" + (i ? "#e5e5e5" : "#333") + ";padding:10px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1px solid " + (i ? "#3a3a3a" : "#e5e5e5") + ";animation:sortToastIn 0.2s ease;", document.body.appendChild(r), setTimeout(() => {
    r.style.animation = "sortToastOut 0.2s ease forwards", setTimeout(() => r.remove(), 200);
  }, 1500);
}
function zv(e, t, n, r) {
  const o = document.createElement("span");
  o.className = "table-sort-btn-inline", o.setAttribute("contenteditable", "false"), o.style.cssText = "display:inline-flex;align-items:center;margin-left:4px;vertical-align:middle;pointer-events:auto;";
  const s = document.createElement("button");
  s.className = "table-sort-btn", s.setAttribute("contenteditable", "false"), s.type = "button";
  const i = document.documentElement.classList.contains("dark"), a = i ? "#60a5fa" : "#3b82f6", c = i ? "#666" : "#aaa", l = i ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  return s.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;font-size:10px;color:" + (e ? a : c) + ";background:transparent;border:none;border-radius:3px;cursor:pointer;user-select:none;transition:all 0.15s ease;opacity:" + (e ? "1" : "0.5") + ";pointer-events:auto;vertical-align:middle;", s.addEventListener("mouseenter", () => {
    s.style.background = l, s.style.opacity = "1", s.style.color = a;
  }), s.addEventListener("mouseleave", () => {
    s.style.background = "transparent", s.style.opacity = e ? "1" : "0.5", s.style.color = e ? a : c;
  }), s.addEventListener("click", (u) => {
    u.preventDefault(), u.stopPropagation(), Wv(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function Bv(e) {
  return new Ne({
    key: Bn,
    state: {
      init() {
        return Ye.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(Bn);
        return !t.docChanged && !s?.updated && Hn ? Hn.map(t.mapping, t.doc) : (Hn = Fv(o.doc, e), Hn);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Fv(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "table") {
      const s = o;
      r.forEach((i, a) => {
        if (i.type.name === "tableRow") {
          let c = 0, l = 0;
          i.forEach((u, d) => {
            if (u.type.name === "tableHeader") {
              const f = o + 1 + a + 1 + l;
              let p = f + 1;
              u.forEach((x, S) => {
                x.type.name === "paragraph" && (p = f + 1 + S + x.nodeSize - 1);
              });
              const g = Bt?.tablePos === s && Bt?.columnIndex === c ? Bt.direction : null, y = c, v = s, b = Xe.widget(p, () => zv(g, v, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(b);
            }
            l += u.nodeSize, c++;
          });
        }
      });
    }
  }), Ye.create(e, n);
}
const Uv = Je.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [Bv(this.editor)];
  }
});
function wa(e, t, n, r, o, s = {}) {
  const i = e.doc.nodeAt(t);
  if (!i) return !1;
  e.setNodeMarkup(t, n, i.attrs);
  const a = e.doc.nodeAt(t);
  if (!a) return !1;
  const c = [];
  a.forEach((l, u) => {
    l.type === o && c.push(t + 1 + u);
  });
  for (let l = c.length - 1; l >= 0; l--) {
    const u = c[l], d = e.doc.nodeAt(u);
    d && d.type === o && e.setNodeMarkup(u, r, s);
  }
  return !0;
}
const Yv = _f.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const h = s.node(p);
          if (h.type === i || h.type === a || h.type === c) {
            d = h.type, f = s.before(p);
            break;
          }
        }
        if (d === i)
          return e.liftListItem("listItem");
        if (d === a || d === c) {
          if (!r) return !0;
          if (wa(n, f, i, l, u, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), jv = $f.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const h = s.node(p);
          if (h.type === i || h.type === a || h.type === c) {
            d = h.type, f = s.before(p);
            break;
          }
        }
        if (d === c)
          return e.liftListItem("listItem");
        if (d === a || d === i) {
          if (!r) return !0;
          if (wa(n, f, c, l, u, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Vv = Wf.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: i }) => {
        const { selection: a } = n, { $from: c, $to: l } = a, u = c.blockRange(l);
        if (!u)
          return !1;
        const d = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let p = !1;
        for (let w = c.depth; w > 0; w--)
          if (c.node(w).type === d) {
            p = !0, c.before(w);
            break;
          }
        if (p)
          return t.liftListItem("taskItem");
        const h = n.schema.nodes.bulletList, g = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let v = null, b = -1;
        for (let w = c.depth; w > 0; w--) {
          const C = c.node(w);
          if (C.type === h || C.type === g) {
            v = C, b = c.before(w);
            break;
          }
        }
        if (v) {
          if (!o) return !0;
          const w = b, C = r.doc.nodeAt(w);
          if (!C) return !1;
          r.setNodeMarkup(w, d, C.attrs);
          const E = r.doc.nodeAt(w);
          if (!E) return !1;
          const k = [];
          E.forEach((N, M) => {
            N.type === y && k.push(w + 1 + M);
          });
          for (let N = k.length - 1; N >= 0; N--) {
            const M = k[N], D = r.doc.nodeAt(M);
            D && D.type === y && r.setNodeMarkup(M, f, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const x = ja(u, d);
        if (x) {
          r.wrap(u, x);
          const { $from: w } = r.selection;
          let C = -1;
          for (let E = w.depth; E > 0; E--)
            if (w.node(E).type === d) {
              C = w.before(E);
              break;
            }
          if (C >= 0) {
            const E = r.doc.nodeAt(C);
            if (E) {
              const k = [];
              E.forEach((N, M) => {
                N.type === y && k.push(C + 1 + M);
              });
              for (let N = k.length - 1; N >= 0; N--) {
                const M = k[N], D = r.doc.nodeAt(M);
                D && D.type === y && r.setNodeMarkup(M, f, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const S = ja(u, h);
        if (S) {
          r.wrap(u, S);
          const { $from: w } = r.selection;
          let C = -1;
          for (let E = w.depth; E > 0; E--)
            if (w.node(E).type === h) {
              C = w.before(E);
              break;
            }
          return C >= 0 && wa(r, C, d, f, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Kv = zf.extend({
  content: "paragraph block*",
  addKeyboardShortcuts() {
    return {
      ...this.parent?.() || {},
      Enter: () => {
        const { editor: t } = this, { state: n } = t, { $from: r, $to: o } = n.selection;
        if (!r.sameParent(o) || r.pos !== o.pos)
          return t.commands.splitListItem(this.name);
        let s = -1;
        for (let d = r.depth; d >= 1; d--)
          if (r.node(d).type.name === "taskItem") {
            s = d;
            break;
          }
        if (s === -1)
          return t.commands.splitListItem(this.name);
        const i = r.node(s);
        if (!i.attrs.checked)
          return t.commands.splitListItem(this.name);
        const c = r.start(s), l = i.firstChild;
        if (!l || !l.isTextblock)
          return t.commands.splitListItem(this.name);
        if (r.pos - c <= 1) {
          const d = r.before(s), { tr: f } = n, p = n.schema.nodes.taskItem, h = n.schema.nodes.paragraph, g = p.create(
            { checked: !1 },
            h.create()
          );
          f.insert(d, g);
          const y = d + 1;
          return f.setSelection(qe.create(f.doc, y)), f.scrollIntoView(), t.view.dispatch(f), !0;
        }
        return t.commands.splitListItem(this.name);
      }
    };
  },
  addInputRules() {
    return [];
  },
  addProseMirrorPlugins() {
    const e = this.type, t = this.editor.schema.nodes.taskList;
    return [
      new Ne({
        key: new Ae("taskItemInputRule"),
        props: {
          handleTextInput(n, r, o, s) {
            if (s !== " ") return !1;
            const { state: i } = n, a = i.doc.resolve(r), c = a.parent.textBetween(
              0,
              a.parentOffset,
              void 0,
              "￼"
            ), u = /^\s*(-\s*)?\[([( |x])?\]$/.exec(c);
            if (!u) return !1;
            const d = u[2] === "x", f = a.start() + (u.index || 0), p = r, h = i.tr;
            h.delete(f, p);
            const y = h.doc.resolve(f).blockRange();
            if (!y || !t || !e) return !1;
            const v = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: d } }
            ];
            if (h.wrap(y, v), f > 1) {
              const b = h.doc.resolve(f - 1).nodeBefore;
              b && b.type === t && Bf(h.doc, f - 1) && h.join(f - 1);
            }
            return n.dispatch(h), !0;
          }
        }
      })
    ];
  }
}), Gv = Hf.extend({
  content: "paragraph block*"
}), Si = new Ae("collapsibleList");
function Ds(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function Ns(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function qv(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((i) => {
    n.includes(i.type.name) && (r === -1 && (r = s), o = s + i.nodeSize), s += i.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let pn = null;
function ts(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !Ns(o))
      return !0;
    const i = Ds(o, s), a = t.collapsedItems.has(i);
    r.push(
      Xe.node(s, s + o.nodeSize, {
        class: `collapsible-list-item ${a ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": i
      })
    );
    const c = o.firstChild;
    if (c && c.type.name === "paragraph") {
      const l = s + 1 + c.nodeSize - 1, u = Xe.widget(
        l,
        () => {
          const d = CSS.escape(i), f = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${d}"]`
          );
          if (f) {
            f.classList.contains("collapsed") !== a && (f.classList.remove("collapsed", "expanded"), f.classList.add(a ? "collapsed" : "expanded"), f.title = a ? "Click to expand" : "Click to collapse");
            const y = f.parentElement;
            if (y) return y;
          }
          const p = document.createElement("span");
          p.className = "collapsible-list-chevron-wrapper", p.setAttribute("contenteditable", "false");
          const h = document.createElement("button");
          return h.className = `collapsible-list-chevron ${a ? "collapsed" : "expanded"}`, h.setAttribute("data-list-item-id", i), h.setAttribute("contenteditable", "false"), h.setAttribute("tabindex", "-1"), h.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', h.title = a ? "Click to expand" : "Click to collapse", h.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const y = h.classList.contains("collapsed");
            h.classList.remove("collapsed", "expanded"), h.classList.add(y ? "expanded" : "collapsed"), h.title = y ? "Click to collapse" : "Click to expand", t.collapsedItems.has(i) ? t.collapsedItems.delete(i) : t.collapsedItems.add(i), pn && pn.dispatch(
              pn.state.tr.setMeta("collapsibleList", { toggled: i })
            );
          }), p.appendChild(h), p;
        },
        { side: 1, key: `list-chevron-${i}` }
      );
      r.push(u);
    }
    if (a && qv(o, s)) {
      let u = s + 1;
      o.forEach((d) => {
        ["bulletList", "orderedList", "taskList"].includes(d.type.name) && r.push(
          Xe.node(u, u + d.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), u += d.nodeSize;
      });
    }
    return !0;
  }), Ye.create(e, r);
}
const Xv = Je.create({
  name: "collapsibleList",
  addOptions() {
    return {
      listItemTypes: ["listItem", "taskItem"]
    };
  },
  addStorage() {
    return {
      collapsedItems: /* @__PURE__ */ new Set()
    };
  },
  addCommands() {
    return {
      toggleListItemCollapse: (e) => ({ editor: t, tr: n }) => {
        const r = this.storage, o = n.doc.nodeAt(e);
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !Ns(o))
          return !1;
        const s = Ds(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && Ns(o) && n.collapsedItems.add(Ds(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ne({
        key: Si,
        view(n) {
          return pn = n, {
            update(r) {
              pn = r;
            },
            destroy() {
              pn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: ts(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: ts(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = Si.getState(n);
            return r?.decorations ? r.decorations : ts(n.doc, e, t);
          }
        }
      })
    ];
  }
}), ve = Kf();
ve.register("javascript", Xs);
ve.register("js", Xs);
ve.register("jsx", Xs);
ve.register("typescript", Zs);
ve.register("ts", Zs);
ve.register("tsx", Zs);
ve.register("python", bc);
ve.register("py", bc);
ve.register("xml", Qs);
ve.register("html", Qs);
ve.register("svg", Qs);
ve.register("css", Gf);
ve.register("json", qf);
ve.register("bash", fo);
ve.register("sh", fo);
ve.register("shell", fo);
ve.register("zsh", fo);
const As = {
  sql: () => import("highlight.js/lib/languages/sql"),
  java: () => import("highlight.js/lib/languages/java"),
  cpp: () => import("highlight.js/lib/languages/cpp"),
  c: () => import("highlight.js/lib/languages/cpp"),
  go: () => import("highlight.js/lib/languages/go"),
  golang: () => import("highlight.js/lib/languages/go"),
  rust: () => import("highlight.js/lib/languages/rust"),
  rs: () => import("highlight.js/lib/languages/rust"),
  markdown: () => import("highlight.js/lib/languages/markdown"),
  md: () => import("highlight.js/lib/languages/markdown"),
  yaml: () => import("highlight.js/lib/languages/yaml"),
  yml: () => import("highlight.js/lib/languages/yaml"),
  diff: () => import("highlight.js/lib/languages/diff"),
  patch: () => import("highlight.js/lib/languages/diff")
}, Pr = /* @__PURE__ */ new Set(), Or = /* @__PURE__ */ new Set();
async function Zv(e) {
  if (ve.registered(e)) return !0;
  const t = As[e];
  if (!t) return !1;
  if (Or.has(e)) return !0;
  if (Pr.has(e))
    return new Promise((n) => {
      const r = () => {
        Or.has(e) ? n(!0) : Pr.has(e) ? setTimeout(r, 50) : n(!1);
      };
      setTimeout(r, 50);
    });
  Pr.add(e);
  try {
    const r = (await t()).default;
    ve.register(e, r), Or.add(e);
    const o = [
      ["cpp", "c"],
      ["go", "golang"],
      ["rust", "rs"],
      ["markdown", "md"],
      ["yaml", "yml"],
      ["diff", "patch"]
    ];
    for (const s of o)
      if (s.includes(e))
        for (const i of s)
          i !== e && !ve.registered(i) && (ve.register(i, r), Or.add(i));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Pr.delete(e);
  }
}
function Qv({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = U(!1), [s, i] = U(!1), [a, c] = U(!0), l = V(null), u = e.attrs.language || "plaintext";
  G(() => {
    const g = l.current;
    if (!g || s) return;
    const y = new IntersectionObserver(
      (v) => {
        for (const b of v)
          b.isIntersecting && (i(!0), y.unobserve(g));
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: "200px 0px",
        threshold: 0
      }
    );
    return y.observe(g), () => {
      y.disconnect();
    };
  }, [s]), G(() => {
    if (s && u !== "plaintext") {
      if (ve.registered(u)) {
        c(!0);
        return;
      }
      As[u] && (c(!1), Zv(u).then((g) => {
        c(g);
      }));
    }
  }, [s, u]);
  const d = B(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (g) {
      console.error("Failed to copy:", g);
    }
  }, [e.textContent]), f = n.options.lowlight?.listLanguages?.() || [], p = Array.from(/* @__PURE__ */ new Set([...f, ...Object.keys(As)])).sort(), h = u === "plaintext" ? "Plain Text" : u.charAt(0).toUpperCase() + u.slice(1);
  return /* @__PURE__ */ I(bn, { className: "code-block-wrapper", ref: l, children: [
    /* @__PURE__ */ I("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ I("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ I(
          "select",
          {
            value: u,
            onChange: (g) => t({ language: g.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ m("option", { value: "plaintext", children: "Plain Text" }),
              p.map((g) => /* @__PURE__ */ m("option", { value: g, children: g.charAt(0).toUpperCase() + g.slice(1) }, g))
            ]
          }
        ),
        /* @__PURE__ */ m("span", { className: "code-block-language-label", children: h }),
        /* @__PURE__ */ m(At, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: d,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ m(Gt, { size: 14 }) : /* @__PURE__ */ m(Kt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!s || !a ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m(Rs, { className: s && a ? `language-${u}` : "language-plaintext" }) })
  ] });
}
const Jv = Vf.extend({
  addNodeView() {
    return ao(Qv);
  }
}).configure({
  lowlight: ve,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
});
function bt({
  children: e,
  className: t,
  zIndex: n = 99999,
  onMouseDown: r
}) {
  const o = B(
    (a) => {
      r?.(a), a.stopPropagation();
    },
    [r]
  ), s = B((a) => {
    a.stopPropagation();
  }, []), i = B((a) => {
    a.stopPropagation();
  }, []);
  return kf(
    /* @__PURE__ */ m(
      "div",
      {
        className: t,
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          overflow: "visible",
          zIndex: n,
          pointerEvents: "auto"
        },
        onMouseDown: o,
        onPointerDown: s,
        onClick: i,
        children: e
      }
    ),
    document.body
  );
}
const _r = {
  info: { icon: Kr, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: uc, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: lc, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: js, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: Vs, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" },
  summary: { icon: qd, label: "Summary", color: "var(--callout-summary)", borderColor: "var(--callout-summary-border)" }
};
function eb({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = U(!1), [s, i] = U(!1), [a, c] = U(null), l = V(null), u = V(null), d = e.attrs.type || "info", f = _r[d] || _r.info, p = f.icon, h = B(() => {
    if (u.current) {
      const b = u.current.getBoundingClientRect();
      c({
        top: b.bottom + 4,
        left: b.left
      });
    }
  }, []);
  G(() => {
    if (!r) return;
    const b = (x) => {
      l.current && !l.current.contains(x.target) && u.current && !u.current.contains(x.target) && o(!1);
    };
    return document.addEventListener("mousedown", b), document.addEventListener("touchstart", b, { passive: !0 }), () => {
      document.removeEventListener("mousedown", b), document.removeEventListener("touchstart", b);
    };
  }, [r]), G(() => {
    if (!r) return;
    const b = () => o(!1);
    return window.addEventListener("scroll", b, !0), () => window.removeEventListener("scroll", b, !0);
  }, [r]);
  const g = B(() => {
    n.isEditable && (r || h(), o(!r));
  }, [n.isEditable, r, h]), y = (b) => {
    t({ type: b }), o(!1);
  }, v = B((b) => {
    b.stopPropagation(), i((x) => !x);
  }, []);
  return /* @__PURE__ */ I(bn, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
    /* @__PURE__ */ I(
      "div",
      {
        className: "callout-header",
        onClick: v,
        style: { cursor: "pointer", userSelect: "none", WebkitUserSelect: "none" },
        title: s ? "Click to expand" : "Click to collapse",
        children: [
          /* @__PURE__ */ I(
            "button",
            {
              ref: u,
              className: "callout-header-button",
              onClick: (b) => {
                b.stopPropagation(), g();
              },
              title: n.isEditable ? "Click to change callout type" : f.label,
              style: { color: f.borderColor, userSelect: "none", WebkitUserSelect: "none" },
              children: [
                /* @__PURE__ */ m(p, { size: 18 }),
                /* @__PURE__ */ m("span", { className: "callout-label", children: f.label }),
                n.isEditable && /* @__PURE__ */ m(At, { size: 12, className: "callout-type-chevron" })
              ]
            }
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: f.borderColor },
              children: s ? /* @__PURE__ */ m(dc, { size: 16 }) : /* @__PURE__ */ m(At, { size: 16 })
            }
          ),
          r && n.isEditable && a && /* @__PURE__ */ m(bt, { children: /* @__PURE__ */ m(
            "div",
            {
              ref: l,
              className: "callout-type-dropdown",
              contentEditable: !1,
              style: {
                position: "fixed",
                top: a.top,
                left: a.left
              },
              children: Object.keys(_r).map((b) => {
                const x = _r[b], S = x.icon;
                return /* @__PURE__ */ I(
                  "button",
                  {
                    className: `callout-type-option ${b === d ? "active" : ""}`,
                    onClick: (w) => {
                      w.stopPropagation(), y(b);
                    },
                    onMouseDown: (w) => w.stopPropagation(),
                    style: { "--callout-option-color": x.color },
                    children: [
                      /* @__PURE__ */ m(S, { size: 16, style: { color: x.borderColor } }),
                      /* @__PURE__ */ m("span", { children: x.label })
                    ]
                  },
                  b
                );
              })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ m("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ m(Rs, {}) })
  ] });
}
const tb = uo.create({
  name: "callout",
  addOptions() {
    return {
      HTMLAttributes: {},
      types: ["info", "note", "prompt", "resources", "todo", "summary"]
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      type: {
        default: "info",
        parseHTML: (e) => e.getAttribute("data-type") || "info",
        renderHTML: (e) => ({
          "data-type": e.type
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-callout]"
      }
    ];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.type;
    return [
      "div",
      Cn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return ao(eb);
  },
  addCommands() {
    return {
      setCallout: (e) => ({ commands: t }) => t.wrapIn(this.name, e),
      toggleCallout: (e) => ({ commands: t }) => t.toggleWrap(this.name, e),
      unsetCallout: () => ({ commands: e }) => e.lift(this.name),
      insertCallout: (e) => ({ chain: t }) => {
        const n = e?.type || "info";
        return t().insertContent({
          type: this.name,
          attrs: { type: n },
          content: [{ type: "paragraph" }]
        }).focus().run();
      },
      updateCalloutType: (e) => ({ commands: t }) => t.updateAttributes(this.name, { type: e })
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-c": () => this.editor.commands.toggleCallout({ type: "info" })
    };
  }
}), nb = Xf.extend({
  name: "resizableImage",
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {},
      allowBase64: !0,
      onImageClick: void 0,
      resolveImageSrc: void 0
    };
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (e) => {
          const t = e.getAttribute("width") || e.style.width;
          return t ? parseInt(t, 10) : null;
        },
        renderHTML: (e) => e.width ? {
          width: e.width,
          style: `width: ${e.width}px`
        } : {}
      },
      height: {
        default: null,
        parseHTML: (e) => {
          const t = e.getAttribute("height") || e.style.height;
          return t ? parseInt(t, 10) : null;
        },
        renderHTML: (e) => e.height ? {
          height: e.height
        } : {}
      },
      align: {
        default: "left",
        parseHTML: (e) => e.getAttribute("data-align") || "left",
        renderHTML: (e) => ({
          "data-align": e.align
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "img[src]"
      },
      {
        tag: "figure.image-resizer img[src]"
      }
    ];
  },
  addCommands() {
    return {
      ...this.parent?.(),
      updateImage: (e) => ({ commands: t }) => t.updateAttributes("resizableImage", e),
      setImageAlign: (e) => ({ commands: t }) => t.updateAttributes("resizableImage", { align: e })
    };
  },
  renderHTML({ HTMLAttributes: e }) {
    const t = e["data-align"] || "center";
    return [
      "figure",
      {
        class: "image-resizer",
        style: {
          left: "margin-right: auto;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto;"
        }[t] || "margin-left: auto; margin-right: auto;"
      },
      [
        "img",
        Cn(this.options.HTMLAttributes, e)
      ]
    ];
  },
  addProseMirrorPlugins() {
    return [
      new Ne({
        key: new Ae("resizableImageCopy"),
        props: {
          handleDOMEvents: {
            copy(e, t) {
              const { state: n } = e;
              if (!(n.selection instanceof Cf)) return !1;
              const r = n.selection.node;
              if (r.type.name !== "resizableImage") return !1;
              const o = r.attrs.src;
              if (!o) return !1;
              t.preventDefault();
              const i = `![${r.attrs.alt || ""}](${o})`;
              return (async () => {
                try {
                  const c = await (await fetch(o)).blob();
                  await navigator.clipboard.write([
                    new ClipboardItem({
                      [c.type]: c,
                      "text/plain": new Blob([i], { type: "text/plain" })
                    })
                  ]);
                } catch {
                  try {
                    const a = new window.Image();
                    a.crossOrigin = "anonymous", await new Promise((u, d) => {
                      a.onload = () => u(), a.onerror = () => d(new Error("Image load failed")), a.src = o;
                    });
                    const c = document.createElement("canvas");
                    c.width = a.naturalWidth, c.height = a.naturalHeight;
                    const l = c.getContext("2d");
                    if (l) {
                      l.drawImage(a, 0, 0);
                      const u = await new Promise(
                        (d) => c.toBlob(d, "image/png")
                      );
                      if (u) {
                        await navigator.clipboard.write([
                          new ClipboardItem({
                            "image/png": u,
                            "text/plain": new Blob([i], { type: "text/plain" })
                          })
                        ]);
                        return;
                      }
                    }
                    await navigator.clipboard.writeText(i);
                  } catch {
                    try {
                      await navigator.clipboard.writeText(i);
                    } catch {
                    }
                  }
                }
              })(), !0;
            }
          }
        }
      })
    ];
  },
  addNodeView() {
    const e = this.options;
    return ({ node: t, editor: n, getPos: r }) => {
      let o = t;
      const s = document.createElement("figure");
      s.classList.add("image-resizer");
      const i = (A) => {
        const _ = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[A] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${_}`;
      };
      i(t.attrs.align || "left");
      const a = document.createElement("img");
      a.alt = t.attrs.alt || "", t.attrs.width && (a.style.width = `${t.attrs.width}px`);
      const c = (A) => !(!A || A.startsWith("data:") || A.startsWith("blob:") || A.startsWith("http://") || A.startsWith("https://")), l = (A) => {
        c(A) && e.resolveImageSrc ? (a.style.opacity = "0.5", a.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(A).then((_) => {
          a.src = _, a.style.opacity = "1";
        }).catch(() => {
          a.src = A, a.style.opacity = "1";
        })) : a.src = A;
      };
      l(t.attrs.src);
      const u = document.createElement("div");
      u.classList.add("resize-handle"), u.style.cssText = `
        position: absolute;
        bottom: 4px;
        right: 4px;
        width: 24px;
        height: 24px;
        background: oklch(0.98 0 0 / 0.95);
        border: 1px solid oklch(0.85 0 0);
        border-radius: 6px;
        cursor: se-resize;
        opacity: 0;
        transition: opacity 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px oklch(0 0 0 / 0.15);
      `, u.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(90deg);">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      `;
      const d = document.createElement("button");
      d.classList.add("image-menu-btn"), d.setAttribute("type", "button"), d.setAttribute("title", "Image options"), d.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        width: 28px;
        height: 28px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: oklch(0.98 0 0 / 0.95);
        border: 1px solid oklch(0.85 0 0);
        border-radius: 6px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.15s ease, background 0.15s ease;
        box-shadow: 0 2px 8px oklch(0 0 0 / 0.15);
        z-index: 10;
      `, d.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      `;
      const f = document.createElement("div");
      f.classList.add("image-menu-dropdown"), f.style.cssText = `
        position: fixed;
        display: none;
        flex-direction: column;
        min-width: 200px;
        padding: 4px;
        background: oklch(0.99 0 0);
        border: 1px solid oklch(0.9 0 0);
        border-radius: 8px;
        box-shadow: 0 4px 16px oklch(0 0 0 / 0.15);
        z-index: 9999;
        pointer-events: auto;
      `;
      const p = (A, _, Y) => {
        const j = document.createElement("button");
        return j.setAttribute("type", "button"), j.style.cssText = `
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 12px;
          font-size: 13px;
          color: oklch(0.3 0 0);
          background: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
        `, j.innerHTML = `${_}<span>${A}</span>`, j.addEventListener("mouseenter", () => {
          j.style.background = "oklch(0.95 0 0)";
        }), j.addEventListener("mouseleave", () => {
          j.style.background = "transparent";
        }), j.addEventListener("click", (q) => {
          q.preventDefault(), q.stopPropagation(), Y(), f.style.display = "none", N = !1;
        }), j;
      }, h = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', v = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(p("Edit", h, () => {
        const A = typeof r == "function" ? r() : null;
        if (A != null && e.onImageClick) {
          const _ = a.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: A,
            rect: _
          });
        }
      })), f.appendChild(p("Copy image", g, async () => {
        const A = o.attrs.src;
        try {
          const Y = await (await fetch(A)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [Y.type]: Y })
          ]);
        } catch {
          try {
            const _ = new window.Image();
            _.crossOrigin = "anonymous", await new Promise((q, Z) => {
              _.onload = () => q(), _.onerror = () => Z(new Error("Image load failed")), _.src = A;
            });
            const Y = document.createElement("canvas");
            Y.width = _.naturalWidth, Y.height = _.naturalHeight;
            const j = Y.getContext("2d");
            if (j) {
              j.drawImage(_, 0, 0);
              const q = await new Promise(
                (Z) => Y.toBlob(Z, "image/png")
              );
              q ? await navigator.clipboard.write([
                new ClipboardItem({ "image/png": q })
              ]) : await navigator.clipboard.writeText(A);
            }
          } catch {
            try {
              await navigator.clipboard.writeText(A);
            } catch {
            }
          }
        }
      })), f.appendChild(p("Copy URL", v, async () => {
        const A = o.attrs.src;
        try {
          await navigator.clipboard.writeText(A);
        } catch {
        }
      })), f.appendChild(p("Save image", y, () => {
        const A = o.attrs.src, _ = o.attrs.alt || "image", Y = document.createElement("a");
        Y.href = A, Y.download = _, Y.target = "_blank", Y.rel = "noopener noreferrer", document.body.appendChild(Y), Y.click(), setTimeout(() => {
          document.body.removeChild(Y);
        }, 100);
      }));
      const b = document.createElement("div");
      b.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, f.appendChild(b);
      const x = document.createElement("div");
      x.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: oklch(0.55 0 0);
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, x.textContent = "Alignment", f.appendChild(x);
      const S = document.createElement("div");
      S.style.cssText = `
        display: flex;
        margin: 4px 8px 4px;
        background: oklch(0.94 0 0);
        border-radius: 8px;
        padding: 3px;
        gap: 2px;
      `;
      const w = [
        {
          value: "left",
          label: "Left",
          icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>'
        },
        {
          value: "center",
          label: "Center",
          icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>'
        },
        {
          value: "right",
          label: "Right",
          icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>'
        }
      ], C = [], E = (A) => {
        C.forEach((_) => {
          (_.getAttribute("data-align-value") || "left") === A ? (_.style.background = "oklch(1 0 0)", _.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", _.style.color = "oklch(0.25 0 0)", _.style.fontWeight = "600") : (_.style.background = "transparent", _.style.boxShadow = "none", _.style.color = "oklch(0.5 0 0)", _.style.fontWeight = "400");
        });
      };
      w.forEach(({ value: A, label: _, icon: Y }) => {
        const j = document.createElement("button");
        j.setAttribute("type", "button"), j.setAttribute("data-align-value", A), j.setAttribute("title", `Align ${_.toLowerCase()}`), j.style.cssText = `
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 5px 8px;
          font-size: 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        `, j.innerHTML = `${Y}<span>${_}</span>`, j.addEventListener("click", (q) => {
          q.preventDefault(), q.stopPropagation();
          const Z = typeof r == "function" ? r() : null;
          if (Z != null)
            try {
              const { state: W, dispatch: z } = n.view, F = W.doc.nodeAt(Z);
              if (F && F.type.name === "resizableImage") {
                const Q = W.tr.setNodeMarkup(Z, void 0, {
                  ...F.attrs,
                  align: A
                });
                z(Q);
              }
            } catch {
              n.chain().focus().setNodeSelection(Z).updateAttributes("resizableImage", {
                align: A
              }).run();
            }
          E(A);
        }), C.push(j), S.appendChild(j);
      }), f.appendChild(S);
      const k = () => {
        const A = o.attrs.align || "left";
        E(A);
      };
      let N = !1;
      d.addEventListener("click", (A) => {
        if (A.preventDefault(), A.stopPropagation(), N)
          f.style.display = "none", N = !1;
        else {
          const _ = d.getBoundingClientRect(), Y = 200, j = f.closest('[role="dialog"]');
          let q = 0, Z = 0;
          if (j) {
            const ue = j.getBoundingClientRect();
            q = ue.left, Z = ue.top;
          }
          let W = _.bottom + 4 - Z, z = _.right - Y - q;
          const F = window.innerHeight, Q = window.innerWidth, le = 200;
          _.bottom + 4 + le > F && (W = _.top - le - 4 - Z), z + q < 8 && (z = 8 - q), z + Y + q > Q - 8 && (z = Q - Y - 8 - q), f.style.top = `${W}px`, f.style.left = `${z}px`, f.style.display = "flex", N = !0, k();
        }
      });
      const M = (A) => {
        !f.contains(A.target) && !d.contains(A.target) && (f.style.display = "none", N = !1);
      };
      document.addEventListener("click", M);
      const D = document.createElement("button");
      D.setAttribute("type", "button"), D.setAttribute("title", "View full size"), D.style.cssText = `
        position: absolute;
        top: 8px;
        right: 40px;
        width: 28px;
        height: 28px;
        background: oklch(0.98 0 0 / 0.95);
        border: 1px solid oklch(0.85 0 0);
        border-radius: 6px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.15s ease, background 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px oklch(0 0 0 / 0.15);
        z-index: 10;
        padding: 0;
      `, D.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      `, D.addEventListener("mouseenter", () => {
        D.style.background = "oklch(0.95 0 0)";
      }), D.addEventListener("mouseleave", () => {
        D.style.background = "oklch(0.98 0 0 / 0.95)";
      }), s.appendChild(a), s.appendChild(D), s.appendChild(u), s.appendChild(d);
      const L = s.closest('[role="dialog"]');
      L ? L.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        u.style.opacity = "1", d.style.opacity = "1", D.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        u.style.opacity = "0", D.style.opacity = "0", N || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const P = (A) => {
        A.preventDefault(), A.stopPropagation();
        const _ = document.createElement("div");
        _.style.cssText = `
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: zoom-out;
          opacity: 0;
          transition: opacity 0.2s ease;
          padding: 24px;
        `;
        const Y = document.createElement("img");
        Y.src = a.src, Y.alt = a.alt || "", Y.style.cssText = `
          max-width: 95vw;
          max-height: 92vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
          transform: scale(0.92);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        `;
        const j = document.createElement("button");
        j.setAttribute("type", "button"), j.setAttribute("aria-label", "Close"), j.style.cssText = `
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.15);
          color: white;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
          z-index: 1;
        `, j.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>', j.addEventListener("mouseenter", () => {
          j.style.background = "rgba(255, 255, 255, 0.25)";
        }), j.addEventListener("mouseleave", () => {
          j.style.background = "rgba(255, 255, 255, 0.15)";
        });
        const q = o.attrs.alt;
        let Z = null;
        q && q.trim() && (Z = document.createElement("div"), Z.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            max-width: 80vw;
            padding: 8px 16px;
            background: rgba(0, 0, 0, 0.6);
            color: rgba(255, 255, 255, 0.9);
            font-size: 13px;
            border-radius: 6px;
            text-align: center;
            pointer-events: none;
          `, Z.textContent = q);
        const W = () => {
          _.style.opacity = "0", Y.style.transform = "scale(0.92)", setTimeout(() => _.remove(), 200);
        };
        _.addEventListener("click", (Q) => {
          Q.target === _ && W();
        }), j.addEventListener("click", W);
        const z = (Q) => {
          Q.key === "Escape" && (W(), document.removeEventListener("keydown", z));
        };
        document.addEventListener("keydown", z), _.appendChild(Y), _.appendChild(j), Z && _.appendChild(Z);
        const F = s.closest('[role="dialog"]');
        F ? F.appendChild(_) : document.body.appendChild(_), requestAnimationFrame(() => {
          _.style.opacity = "1", Y.style.transform = "scale(1)";
        });
      };
      D.addEventListener("click", P);
      let O, H;
      const $ = (A) => {
        A.preventDefault(), O = A.clientX, H = a.offsetWidth, document.addEventListener("mousemove", K), document.addEventListener("mouseup", R);
      }, K = (A) => {
        const _ = A.clientX - O, Y = Math.max(100, H + _);
        a.style.width = `${Y}px`;
      }, R = () => {
        document.removeEventListener("mousemove", K), document.removeEventListener("mouseup", R), setTimeout(() => {
        }, 100);
        const A = typeof r == "function" ? r() : null, _ = a.offsetWidth;
        if (A != null)
          try {
            const { state: Y, dispatch: j } = n.view, q = Y.doc.nodeAt(A);
            if (q && q.type.name === "resizableImage") {
              const Z = Y.tr.setNodeMarkup(A, void 0, {
                ...q.attrs,
                width: _
              });
              j(Z);
            }
          } catch {
            n.chain().focus().setNodeSelection(A).updateAttributes("resizableImage", {
              width: _
            }).run();
          }
      };
      return u.addEventListener("mousedown", $), {
        dom: s,
        update: (A) => A.type.name !== "resizableImage" ? !1 : (o = A, l(A.attrs.src), a.alt = A.attrs.alt || "", A.attrs.width && (a.style.width = `${A.attrs.width}px`), i(A.attrs.align || "left"), !0),
        destroy: () => {
          u.removeEventListener("mousedown", $), D.removeEventListener("click", P), document.removeEventListener("click", M), f.remove();
        }
      };
    };
  }
});
function rb(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const ob = {}, Wn = {};
function Ft(e, t) {
  try {
    const r = (ob[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in Wn ? Wn[r] : Ei(r, r.split(":"));
  } catch {
    if (e in Wn) return Wn[e];
    const n = e?.match(sb);
    return n ? Ei(e, n.slice(1)) : NaN;
  }
}
const sb = /([+-]\d\d):?(\d\d)?/;
function Ei(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return Wn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class rt extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Ft(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), hu(this), Ls(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new rt(...n, t) : new rt(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new rt(+this, t);
  }
  getTimezoneOffset() {
    const t = -Ft(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Ls(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new rt(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Di = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Di.test(e)) return;
  const t = e.replace(Di, "$1UTC");
  rt.prototype[t] && (e.startsWith("get") ? rt.prototype[e] = function() {
    return this.internal[t]();
  } : (rt.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), ab(this), +this;
  }, rt.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Ls(this), +this;
  }));
});
function Ls(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Ft(e.timeZone, e) * 60));
}
function ab(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), hu(e);
}
function hu(e) {
  const t = Ft(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - s, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const u = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, d = Math.round(-(Ft(e.timeZone, e) * 60)) % 60;
  (d || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + u));
  const f = Ft(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, y = p !== n, v = g - c;
  if (y && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const b = Ft(e.timeZone, e), x = b > 0 ? Math.floor(b) : Math.ceil(b), S = p - x;
    S && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + S), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + S));
  }
}
class Ie extends rt {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Ie(...n, t) : new Ie(Date.now(), t);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [t, n, r] = this.tzComponents(), o = `${t}${n}:${r}`;
    return this.internal.toISOString().slice(0, -1) + o;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [t, n, r, o] = this.internal.toUTCString().split(" ");
    return `${t?.slice(0, -1)} ${r} ${n} ${o}`;
  }
  toTimeString() {
    const t = this.internal.toUTCString().split(" ")[4], [n, r, o] = this.tzComponents();
    return `${t} GMT${n}${r}${o} (${rb(this.timeZone, this)})`;
  }
  toLocaleString(t, n) {
    return Date.prototype.toLocaleString.call(this, t, {
      ...n,
      timeZone: n?.timeZone || this.timeZone
    });
  }
  toLocaleDateString(t, n) {
    return Date.prototype.toLocaleDateString.call(this, t, {
      ...n,
      timeZone: n?.timeZone || this.timeZone
    });
  }
  toLocaleTimeString(t, n) {
    return Date.prototype.toLocaleTimeString.call(this, t, {
      ...n,
      timeZone: n?.timeZone || this.timeZone
    });
  }
  //#endregion
  //#region private
  tzComponents() {
    const t = this.getTimezoneOffset(), n = t > 0 ? "-" : "+", r = String(Math.floor(Math.abs(t) / 60)).padStart(2, "0"), o = String(Math.abs(t) % 60).padStart(2, "0");
    return [n, r, o];
  }
  //#endregion
  withTimeZone(t) {
    return new Ie(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ie(+new Date(t), this.timeZone);
  }
  //#endregion
}
const gu = 6048e5, ib = 864e5, Ni = Symbol.for("constructDateFrom");
function ke(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ni in e ? e[Ni](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function he(e, t) {
  return ke(t || e, e);
}
function yu(e, t, n) {
  const r = he(e, n?.in);
  return isNaN(t) ? ke(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function vu(e, t, n) {
  const r = he(e, n?.in);
  if (isNaN(t)) return ke(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), s = ke(e, r.getTime());
  s.setMonth(r.getMonth() + t + 1, 0);
  const i = s.getDate();
  return o >= i ? s : (r.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    o
  ), r);
}
let cb = {};
function rr() {
  return cb;
}
function kn(e, t) {
  const n = rr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = he(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function Xn(e, t) {
  return kn(e, { ...t, weekStartsOn: 1 });
}
function bu(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = ke(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = Xn(o), i = ke(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = Xn(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function Ai(e) {
  const t = he(e), n = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function Nn(e, ...t) {
  const n = ke.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Zn(e, t) {
  const n = he(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function wu(e, t, n) {
  const [r, o] = Nn(
    n?.in,
    e,
    t
  ), s = Zn(r), i = Zn(o), a = +s - Ai(s), c = +i - Ai(i);
  return Math.round((a - c) / ib);
}
function lb(e, t) {
  const n = bu(e, t), r = ke(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Xn(r);
}
function ub(e, t, n) {
  return yu(e, t * 7, n);
}
function db(e, t, n) {
  return vu(e, t * 12, n);
}
function fb(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ke.bind(null, o));
    const s = he(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), ke(r, n || NaN);
}
function mb(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ke.bind(null, o));
    const s = he(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), ke(r, n || NaN);
}
function pb(e, t, n) {
  const [r, o] = Nn(
    n?.in,
    e,
    t
  );
  return +Zn(r) == +Zn(o);
}
function xu(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function hb(e) {
  return !(!xu(e) && typeof e != "number" || isNaN(+he(e)));
}
function gb(e, t, n) {
  const [r, o] = Nn(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function yb(e, t) {
  const n = he(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function ku(e, t) {
  const [n, r] = Nn(e, t.start, t.end);
  return { start: n, end: r };
}
function vb(e, t) {
  const { start: n, end: r } = ku(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(ke(n, i)), i.setMonth(i.getMonth() + a);
  return o ? c.reverse() : c;
}
function bb(e, t) {
  const n = he(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function wb(e, t) {
  const n = he(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Cu(e, t) {
  const n = he(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function xb(e, t) {
  const { start: n, end: r } = ku(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(ke(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? c.reverse() : c;
}
function Mu(e, t) {
  const n = rr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = he(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function kb(e, t) {
  return Mu(e, { ...t, weekStartsOn: 1 });
}
const Cb = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, Mb = (e, t, n) => {
  let r;
  const o = Cb[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ns(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Tb = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Sb = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Eb = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Db = {
  date: ns({
    formats: Tb,
    defaultWidth: "full"
  }),
  time: ns({
    formats: Sb,
    defaultWidth: "full"
  }),
  dateTime: ns({
    formats: Eb,
    defaultWidth: "full"
  })
}, Nb = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Ab = (e, t, n, r) => Nb[e];
function On(e) {
  return (t, n) => {
    const r = n?.context ? String(n.context) : "standalone";
    let o;
    if (r === "formatting" && e.formattingValues) {
      const i = e.defaultFormattingWidth || e.defaultWidth, a = n?.width ? String(n.width) : i;
      o = e.formattingValues[a] || e.formattingValues[i];
    } else {
      const i = e.defaultWidth, a = n?.width ? String(n.width) : e.defaultWidth;
      o = e.values[a] || e.values[i];
    }
    const s = e.argumentCallback ? e.argumentCallback(t) : t;
    return o[s];
  };
}
const Lb = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Ib = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Rb = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, Pb = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, Ob = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, _b = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, $b = (e, t) => {
  const n = Number(e), r = n % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, Hb = {
  ordinalNumber: $b,
  era: On({
    values: Lb,
    defaultWidth: "wide"
  }),
  quarter: On({
    values: Ib,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: On({
    values: Rb,
    defaultWidth: "wide"
  }),
  day: On({
    values: Pb,
    defaultWidth: "wide"
  }),
  dayPeriod: On({
    values: Ob,
    defaultWidth: "wide",
    formattingValues: _b,
    defaultFormattingWidth: "wide"
  })
};
function _n(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(a) ? zb(a, (d) => d.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      Wb(a, (d) => d.test(i))
    );
    let l;
    l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(l)
    ) : l;
    const u = t.slice(i.length);
    return { value: l, rest: u };
  };
}
function Wb(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function zb(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Bb(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const o = r[0], s = t.match(e.parsePattern);
    if (!s) return null;
    let i = e.valueCallback ? e.valueCallback(s[0]) : s[0];
    i = n.valueCallback ? n.valueCallback(i) : i;
    const a = t.slice(o.length);
    return { value: i, rest: a };
  };
}
const Fb = /^(\d+)(th|st|nd|rd)?/i, Ub = /\d+/i, Yb = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, jb = {
  any: [/^b/i, /^(a|c)/i]
}, Vb = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Kb = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Gb = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, qb = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, Xb = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Zb = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Qb = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Jb = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, ew = {
  ordinalNumber: Bb({
    matchPattern: Fb,
    parsePattern: Ub,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: _n({
    matchPatterns: Yb,
    defaultMatchWidth: "wide",
    parsePatterns: jb,
    defaultParseWidth: "any"
  }),
  quarter: _n({
    matchPatterns: Vb,
    defaultMatchWidth: "wide",
    parsePatterns: Kb,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: _n({
    matchPatterns: Gb,
    defaultMatchWidth: "wide",
    parsePatterns: qb,
    defaultParseWidth: "any"
  }),
  day: _n({
    matchPatterns: Xb,
    defaultMatchWidth: "wide",
    parsePatterns: Zb,
    defaultParseWidth: "any"
  }),
  dayPeriod: _n({
    matchPatterns: Qb,
    defaultMatchWidth: "any",
    parsePatterns: Jb,
    defaultParseWidth: "any"
  })
}, xa = {
  code: "en-US",
  formatDistance: Mb,
  formatLong: Db,
  formatRelative: Ab,
  localize: Hb,
  match: ew,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function tw(e, t) {
  const n = he(e, t?.in);
  return wu(n, Cu(n)) + 1;
}
function Tu(e, t) {
  const n = he(e, t?.in), r = +Xn(n) - +lb(n);
  return Math.round(r / gu) + 1;
}
function Su(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = rr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = ke(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = kn(i, t), c = ke(t?.in || e, 0);
  c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
  const l = kn(c, t);
  return +n >= +a ? r + 1 : +n >= +l ? r : r - 1;
}
function nw(e, t) {
  const n = rr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Su(e, t), s = ke(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), kn(s, t);
}
function Eu(e, t) {
  const n = he(e, t?.in), r = +kn(n, t) - +nw(n, t);
  return Math.round(r / gu) + 1;
}
function pe(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const St = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return pe(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : pe(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return pe(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const n = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return pe(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return pe(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return pe(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return pe(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return pe(o, t.length);
  }
}, cn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Li = {
  // Era
  G: function(e, t, n) {
    const r = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return n.era(r, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return n.era(r, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return n.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const r = e.getFullYear(), o = r > 0 ? r : 1 - r;
      return n.ordinalNumber(o, { unit: "year" });
    }
    return St.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Su(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return pe(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : pe(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = bu(e);
    return pe(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const n = e.getFullYear();
    return pe(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(r);
      // 01, 02, 03, 04
      case "QQ":
        return pe(r, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return n.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return n.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "q":
        return String(r);
      // 01, 02, 03, 04
      case "qq":
        return pe(r, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return n.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return n.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return St.M(e, t);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return n.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return n.month(r, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return n.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      // 1, 2, ..., 12
      case "L":
        return String(r + 1);
      // 01, 02, ..., 12
      case "LL":
        return pe(r + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return n.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return n.month(r, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return n.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, r) {
    const o = Eu(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : pe(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Tu(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : pe(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : St.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = tw(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : pe(r, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const r = e.getDay();
    switch (t) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, r) {
    const o = e.getDay(), s = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(s);
      // Padded numerical value
      case "ee":
        return pe(s, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return n.ordinalNumber(s, { unit: "day" });
      case "eee":
        return n.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return n.day(o, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return n.day(o, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return n.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, r) {
    const o = e.getDay(), s = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(s);
      // Padded numerical value
      case "cc":
        return pe(s, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return n.ordinalNumber(s, { unit: "day" });
      case "ccc":
        return n.day(o, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return n.day(o, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return n.day(o, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return n.day(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const r = e.getDay(), o = r === 0 ? 7 : r;
    switch (t) {
      // 2
      case "i":
        return String(o);
      // 02
      case "ii":
        return pe(o, t.length);
      // 2nd
      case "io":
        return n.ordinalNumber(o, { unit: "day" });
      // Tue
      case "iii":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const o = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const r = e.getHours();
    let o;
    switch (r === 12 ? o = cn.noon : r === 0 ? o = cn.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const r = e.getHours();
    let o;
    switch (r >= 17 ? o = cn.evening : r >= 12 ? o = cn.afternoon : r >= 4 ? o = cn.morning : o = cn.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let r = e.getHours() % 12;
      return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
    }
    return St.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : St.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : pe(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : pe(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : St.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : St.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return St.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Ri(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Wt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Wt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Ri(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Wt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Wt(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Ii(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Wt(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Ii(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Wt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return pe(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return pe(+e, t.length);
  }
};
function Ii(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + pe(s, 2);
}
function Ri(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + pe(Math.abs(e) / 60, 2) : Wt(e, t);
}
function Wt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = pe(Math.trunc(r / 60), 2), s = pe(r % 60, 2);
  return n + o + t + s;
}
const Pi = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, Du = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, rw = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Pi(e, t);
  let s;
  switch (r) {
    case "P":
      s = t.dateTime({ width: "short" });
      break;
    case "PP":
      s = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      s = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      s = t.dateTime({ width: "full" });
      break;
  }
  return s.replace("{{date}}", Pi(r, t)).replace("{{time}}", Du(o, t));
}, ow = {
  p: Du,
  P: rw
}, sw = /^D+$/, aw = /^Y+$/, iw = ["D", "DD", "YY", "YYYY"];
function cw(e) {
  return sw.test(e);
}
function lw(e) {
  return aw.test(e);
}
function uw(e, t, n) {
  const r = dw(e, t, n);
  if (console.warn(r), iw.includes(e)) throw new RangeError(r);
}
function dw(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const fw = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, mw = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, pw = /^'([^]*?)'?$/, hw = /''/g, gw = /[a-zA-Z]/;
function yw(e, t, n) {
  const r = rr(), o = n?.locale ?? r.locale ?? xa, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = he(e, n?.in);
  if (!hb(a))
    throw new RangeError("Invalid time value");
  let c = t.match(mw).map((u) => {
    const d = u[0];
    if (d === "p" || d === "P") {
      const f = ow[d];
      return f(u, o.formatLong);
    }
    return u;
  }).join("").match(fw).map((u) => {
    if (u === "''")
      return { isToken: !1, value: "'" };
    const d = u[0];
    if (d === "'")
      return { isToken: !1, value: vw(u) };
    if (Li[d])
      return { isToken: !0, value: u };
    if (d.match(gw))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: u };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(a, c));
  const l = {
    firstWeekContainsDate: s,
    weekStartsOn: i,
    locale: o
  };
  return c.map((u) => {
    if (!u.isToken) return u.value;
    const d = u.value;
    (!n?.useAdditionalWeekYearTokens && lw(d) || !n?.useAdditionalDayOfYearTokens && cw(d)) && uw(d, t, String(e));
    const f = Li[d[0]];
    return f(a, d, o.localize, l);
  }).join("");
}
function vw(e) {
  const t = e.match(pw);
  return t ? t[1].replace(hw, "'") : e;
}
function bw(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = ke(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function ww(e, t) {
  return he(e, t?.in).getMonth();
}
function xw(e, t) {
  return he(e, t?.in).getFullYear();
}
function kw(e, t) {
  return +he(e) > +he(t);
}
function Cw(e, t) {
  return +he(e) < +he(t);
}
function Mw(e, t, n) {
  const [r, o] = Nn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Tw(e, t, n) {
  const [r, o] = Nn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Sw(e, t, n) {
  const r = he(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = ke(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = bw(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function Ew(e, t, n) {
  const r = he(e, n?.in);
  return isNaN(+r) ? ke(e, NaN) : (r.setFullYear(t), r);
}
const Oi = 5, Dw = 4;
function Nw(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, Oi * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Oi : Dw;
}
function Nu(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Aw(e, t) {
  const n = Nu(e, t), r = Nw(e, t);
  return t.addDays(n, r * 7 - 1);
}
class Be {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ie.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Ie(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : yu(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : vu(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : ub(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : db(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : wu(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : gb(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : vb(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : xb(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Aw(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : kb(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : yb(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Mu(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : wb(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : yw(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Tu(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : ww(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : xw(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Eu(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : kw(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : Cw(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : xu(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : pb(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : Mw(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : Tw(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : fb(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : mb(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : Sw(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : Ew(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Nu(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : Zn(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Xn(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : bb(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : kn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : Cu(r), this.options = { locale: xa, ...t }, this.overrides = n;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals: t = "latn" } = this.options, n = new Intl.NumberFormat("en-US", {
      numberingSystem: t
    }), r = {};
    for (let o = 0; o < 10; o++)
      r[o.toString()] = n.format(o);
    return r;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(t) {
    const n = this.getDigitMap();
    return t.replace(/\d/g, (r) => n[r] || r);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(t) {
    return this.replaceDigits(t.toString());
  }
  /**
   * Returns the preferred ordering for month and year labels for the current
   * locale.
   */
  getMonthYearOrder() {
    const t = this.options.locale?.code;
    return t && Be.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && Be.yearFirstLocales.has(s))
      try {
        return new Intl.DateTimeFormat(s, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: o
        }).format(t);
      } catch {
      }
    const i = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, i);
  }
}
Be.yearFirstLocales = /* @__PURE__ */ new Set([
  "eu",
  "hu",
  "ja",
  "ja-Hira",
  "ja-JP",
  "ko",
  "ko-KR",
  "lt",
  "lt-LT",
  "lv",
  "lv-LV",
  "mn",
  "mn-MN",
  "zh",
  "zh-CN",
  "zh-HK",
  "zh-TW"
]);
const it = new Be();
class Au {
  constructor(t, n, r = it) {
    this.date = t, this.displayMonth = n, this.outside = !!(n && !r.isSameMonth(t, n)), this.dateLib = r;
  }
  /**
   * Checks if this day is equal to another `CalendarDay`, considering both the
   * date and the displayed month.
   *
   * @param day The `CalendarDay` to compare with.
   * @returns `true` if the days are equal, otherwise `false`.
   */
  isEqualTo(t) {
    return this.dateLib.isSameDay(t.date, this.date) && this.dateLib.isSameMonth(t.displayMonth, this.displayMonth);
  }
}
class Lw {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Iw {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Rw(e) {
  return X.createElement("button", { ...e });
}
function Pw(e) {
  return X.createElement("span", { ...e });
}
function Ow(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    X.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && X.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && X.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && X.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && X.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function _w(e) {
  const { day: t, modifiers: n, ...r } = e;
  return X.createElement("td", { ...r });
}
function $w(e) {
  const { day: t, modifiers: n, ...r } = e, o = X.useRef(null);
  return X.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), X.createElement("button", { ref: o, ...r });
}
var te;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(te || (te = {}));
var ye;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(ye || (ye = {}));
var Ge;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ge || (Ge = {}));
var He;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(He || (He = {}));
function Hw(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, i = [o[te.Dropdown], n].join(" "), a = t?.find(({ value: c }) => c === s.value);
  return X.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[te.DropdownRoot] },
    X.createElement(r.Select, { className: i, ...s }, t?.map(({ value: c, label: l, disabled: u }) => X.createElement(r.Option, { key: c, value: c, disabled: u }, l))),
    X.createElement(
      "span",
      { className: o[te.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      X.createElement(r.Chevron, { orientation: "down", size: 18, className: o[te.Chevron] })
    )
  );
}
function Ww(e) {
  return X.createElement("div", { ...e });
}
function zw(e) {
  return X.createElement("div", { ...e });
}
function Bw(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r }, e.children);
}
function Fw(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r });
}
function Uw(e) {
  return X.createElement("table", { ...e });
}
function Yw(e) {
  return X.createElement("div", { ...e });
}
const Lu = rc(void 0);
function or() {
  const e = oc(Lu);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function jw(e) {
  const { components: t } = or();
  return X.createElement(t.Dropdown, { ...e });
}
function Vw(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: c, labelNext: l } } = or(), u = B((f) => {
    o && n?.(f);
  }, [o, n]), d = B((f) => {
    r && t?.(f);
  }, [r, t]);
  return X.createElement(
    "nav",
    { ...s },
    X.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[te.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: d },
      X.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[te.Chevron], orientation: "left" })
    ),
    X.createElement(
      i.NextMonthButton,
      { type: "button", className: a[te.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: u },
      X.createElement(i.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: a[te.Chevron] })
    )
  );
}
function Kw(e) {
  const { components: t } = or();
  return X.createElement(t.Button, { ...e });
}
function Gw(e) {
  return X.createElement("option", { ...e });
}
function qw(e) {
  const { components: t } = or();
  return X.createElement(t.Button, { ...e });
}
function Xw(e) {
  const { rootRef: t, ...n } = e;
  return X.createElement("div", { ...n, ref: t });
}
function Zw(e) {
  return X.createElement("select", { ...e });
}
function Qw(e) {
  const { week: t, ...n } = e;
  return X.createElement("tr", { ...n });
}
function Jw(e) {
  return X.createElement("th", { ...e });
}
function e0(e) {
  return X.createElement(
    "thead",
    { "aria-hidden": !0 },
    X.createElement("tr", { ...e })
  );
}
function t0(e) {
  const { week: t, ...n } = e;
  return X.createElement("th", { ...n });
}
function n0(e) {
  return X.createElement("th", { ...e });
}
function r0(e) {
  return X.createElement("tbody", { ...e });
}
function o0(e) {
  const { components: t } = or();
  return X.createElement(t.Dropdown, { ...e });
}
const s0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Rw,
  CaptionLabel: Pw,
  Chevron: Ow,
  Day: _w,
  DayButton: $w,
  Dropdown: Hw,
  DropdownNav: Ww,
  Footer: zw,
  Month: Bw,
  MonthCaption: Fw,
  MonthGrid: Uw,
  Months: Yw,
  MonthsDropdown: jw,
  Nav: Vw,
  NextMonthButton: Kw,
  Option: Gw,
  PreviousMonthButton: qw,
  Root: Xw,
  Select: Zw,
  Week: Qw,
  WeekNumber: t0,
  WeekNumberHeader: n0,
  Weekday: Jw,
  Weekdays: e0,
  Weeks: r0,
  YearsDropdown: o0
}, Symbol.toStringTag, { value: "Module" }));
function ft(e, t, n = !1, r = it) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function Iu(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function ka(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Ru(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Pu(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Ou(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function _u(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function mt(e, t, n = it) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (_u(a, n))
      return a.includes(e);
    if (ka(a))
      return ft(a, e, !1, n);
    if (Ou(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (Iu(a)) {
      const c = s(a.before, e), l = s(a.after, e), u = c > 0, d = l < 0;
      return i(a.before, a.after) ? d && u : u || d;
    }
    return Ru(a) ? s(e, a.after) > 0 : Pu(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function a0(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: c, broadcastCalendar: l, today: u } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: h, endOfMonth: g, isAfter: y } = o, v = n && p(n), b = r && g(r), x = {
    [ye.focused]: [],
    [ye.outside]: [],
    [ye.disabled]: [],
    [ye.hidden]: [],
    [ye.today]: []
  }, S = {};
  for (const w of e) {
    const { date: C, displayMonth: E } = w, k = !!(E && !f(C, E)), N = !!(v && h(C, v)), M = !!(b && y(C, b)), D = !!(s && mt(C, s, o)), L = !!(i && mt(C, i, o)) || N || M || // Broadcast calendar will show outside days as default
    !l && !c && k || l && c === !1 && k, P = d(C, u ?? o.today());
    k && x.outside.push(w), D && x.disabled.push(w), L && x.hidden.push(w), P && x.today.push(w), a && Object.keys(a).forEach((O) => {
      const H = a?.[O];
      H && mt(C, H, o) && (S[O] ? S[O].push(w) : S[O] = [w]);
    });
  }
  return (w) => {
    const C = {
      [ye.focused]: !1,
      [ye.disabled]: !1,
      [ye.hidden]: !1,
      [ye.outside]: !1,
      [ye.today]: !1
    }, E = {};
    for (const k in x) {
      const N = x[k];
      C[k] = N.some((M) => M === w);
    }
    for (const k in S)
      E[k] = S[k].some((N) => N === w);
    return {
      ...C,
      // custom modifiers should override all the previous ones
      ...E
    };
  };
}
function i0(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[ye[s]] ? o.push(t[ye[s]]) : t[Ge[s]] && o.push(t[Ge[s]]), o), [t[te.Day]]);
}
function c0(e) {
  return {
    ...s0,
    ...e
  };
}
function l0(e) {
  const t = {
    "data-mode": e.mode ?? void 0,
    "data-required": "required" in e ? e.required : void 0,
    "data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
    "data-week-numbers": e.showWeekNumber || void 0,
    "data-broadcast-calendar": e.broadcastCalendar || void 0,
    "data-nav-layout": e.navLayout || void 0
  };
  return Object.entries(e).forEach(([n, r]) => {
    n.startsWith("data-") && (t[n] = r);
  }), t;
}
function Ca() {
  const e = {};
  for (const t in te)
    e[te[t]] = `rdp-${te[t]}`;
  for (const t in ye)
    e[ye[t]] = `rdp-${ye[t]}`;
  for (const t in Ge)
    e[Ge[t]] = `rdp-${Ge[t]}`;
  for (const t in He)
    e[He[t]] = `rdp-${He[t]}`;
  return e;
}
function $u(e, t, n) {
  return (n ?? new Be(t)).formatMonthYear(e);
}
const u0 = $u;
function d0(e, t, n) {
  return (n ?? new Be(t)).format(e, "d");
}
function f0(e, t = it) {
  return t.format(e, "LLLL");
}
function m0(e, t, n) {
  return (n ?? new Be(t)).format(e, "cccccc");
}
function p0(e, t = it) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function h0() {
  return "";
}
function Hu(e, t = it) {
  return t.format(e, "yyyy");
}
const g0 = Hu, y0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: $u,
  formatDay: d0,
  formatMonthCaption: u0,
  formatMonthDropdown: f0,
  formatWeekNumber: p0,
  formatWeekNumberHeader: h0,
  formatWeekdayName: m0,
  formatYearCaption: g0,
  formatYearDropdown: Hu
}, Symbol.toStringTag, { value: "Module" }));
function v0(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...y0,
    ...e
  };
}
function b0(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: i(e),
    end: a(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, o), h = l(f), g = t && f < s(t) || n && f > s(n) || !1;
    return { value: h, label: p, disabled: g };
  });
}
function w0(e, t = {}, n = {}) {
  let r = { ...t?.[te.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function x0(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function k0(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: s, endOfYear: i, eachYearOfInterval: a, getYear: c } = r, l = s(e), u = i(t), d = a({ start: l, end: u });
  return o && d.reverse(), d.map((f) => {
    const p = n.formatYearDropdown(f, r);
    return {
      value: c(f),
      label: p,
      disabled: !1
    };
  });
}
function Wu(e, t, n, r) {
  let o = (r ?? new Be(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const C0 = Wu;
function zu(e, t, n) {
  return (n ?? new Be(t)).formatMonthYear(e);
}
const M0 = zu;
function T0(e, t, n, r) {
  let o = (r ?? new Be(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function S0(e) {
  return "Choose the Month";
}
function E0() {
  return "";
}
function D0(e) {
  return "Go to the Next Month";
}
function N0(e) {
  return "Go to the Previous Month";
}
function A0(e, t, n) {
  return (n ?? new Be(t)).format(e, "cccc");
}
function L0(e, t) {
  return `Week ${e}`;
}
function I0(e) {
  return "Week Number";
}
function R0(e) {
  return "Choose the Year";
}
const P0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: M0,
  labelDay: C0,
  labelDayButton: Wu,
  labelGrid: zu,
  labelGridcell: T0,
  labelMonthDropdown: S0,
  labelNav: E0,
  labelNext: D0,
  labelPrevious: N0,
  labelWeekNumber: L0,
  labelWeekNumberHeader: I0,
  labelWeekday: A0,
  labelYearDropdown: R0
}, Symbol.toStringTag, { value: "Module" })), sr = (e) => e instanceof HTMLElement ? e : null, rs = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], O0 = (e) => sr(e.querySelector("[data-animated-month]")), os = (e) => sr(e.querySelector("[data-animated-caption]")), ss = (e) => sr(e.querySelector("[data-animated-weeks]")), _0 = (e) => sr(e.querySelector("[data-animated-nav]")), $0 = (e) => sr(e.querySelector("[data-animated-weekdays]"));
function H0(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = V(null), a = V(r), c = V(!1);
  io(() => {
    const l = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const u = s.isSameMonth(r[0].date, l[0].date), d = s.isAfter(r[0].date, l[0].date), f = d ? n[He.caption_after_enter] : n[He.caption_before_enter], p = d ? n[He.weeks_after_enter] : n[He.weeks_before_enter], h = i.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (rs(g).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const S = O0(x);
      S && x.contains(S) && x.removeChild(S);
      const w = os(x);
      w && w.classList.remove(f);
      const C = ss(x);
      C && C.classList.remove(p);
    }), i.current = g) : i.current = null, c.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = h instanceof HTMLElement ? rs(h) : [], v = rs(e.current);
    if (v?.every((b) => b instanceof HTMLElement) && y && y.every((b) => b instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const b = _0(e.current);
      b && (b.style.zIndex = "1"), v.forEach((x, S) => {
        const w = y[S];
        if (!w)
          return;
        x.style.position = "relative", x.style.overflow = "hidden";
        const C = os(x);
        C && C.classList.add(f);
        const E = ss(x);
        E && E.classList.add(p);
        const k = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), b && (b.style.zIndex = ""), C && C.classList.remove(f), E && E.classList.remove(p), x.style.position = "", x.style.overflow = "", x.contains(w) && x.removeChild(w);
        };
        w.style.pointerEvents = "none", w.style.position = "absolute", w.style.overflow = "hidden", w.setAttribute("aria-hidden", "true");
        const N = $0(w);
        N && (N.style.opacity = "0");
        const M = os(w);
        M && (M.classList.add(d ? n[He.caption_before_exit] : n[He.caption_after_exit]), M.addEventListener("animationend", k));
        const D = ss(w);
        D && D.classList.add(d ? n[He.weeks_before_exit] : n[He.weeks_after_exit]), x.insertBefore(w, x.firstChild);
      });
    }
  });
}
function W0(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: h, endOfWeek: g, isAfter: y, startOfBroadcastWeek: v, startOfISOWeek: b, startOfWeek: x } = r, S = c ? v(o, r) : i ? b(o) : x(o), w = c ? f(s) : i ? p(h(s)) : g(h(s)), C = u(w, S), E = d(s, o) + 1, k = [];
  for (let D = 0; D <= C; D++) {
    const L = l(S, D);
    if (t && y(L, t))
      break;
    k.push(L);
  }
  const M = (c ? 35 : 42) * E;
  if (a && k.length < M) {
    const D = M - k.length;
    for (let L = 0; L < D; L++) {
      const P = l(k[k.length - 1], 1);
      k.push(P);
    }
  }
  return k;
}
function z0(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function B0(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function _i(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let c = o || s || i;
  const { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
  if (n && l(n, c) < a - 1) {
    const f = -1 * (a - 1);
    c = u(n, f);
  }
  return t && l(c, t) < 0 && (c = t), d(c);
}
function F0(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, h = e.reduce((g, y) => {
    const v = n.broadcastCalendar ? d(y, r) : n.ISOWeek ? f(y) : p(y), b = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : c(a(y)), x = t.filter((E) => E >= v && E <= b), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < S) {
      const E = t.filter((k) => {
        const N = S - x.length;
        return k > b && k <= o(b, N);
      });
      x.push(...E);
    }
    const w = x.reduce((E, k) => {
      const N = n.ISOWeek ? l(k) : u(k), M = E.find((L) => L.weekNumber === N), D = new Au(k, y, r);
      return M ? M.days.push(D) : E.push(new Iw(N, [D])), E;
    }, []), C = new Lw(y, w);
    return g.push(C), g;
  }, []);
  return n.reverseMonths ? h.reverse() : h;
}
function U0(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: h, toMonth: g } = e;
  !n && h && (n = h), !n && f && (n = t.newDate(f, 0, 1)), !r && g && (r = g), !r && p && (r = u(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : f ? n = u(f, 0, 1) : !n && y && (n = o(c(e.today ?? d(), -100))), r ? r = a(r) : p ? r = u(p, 11, 31) : !r && y && (r = l(e.today ?? d())), [
    n && s(n),
    r && s(r)
  ];
}
function Y0(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s : 1, u = i(e);
  if (!t)
    return a(u, l);
  if (!(c(t, e) < s))
    return a(u, l);
}
function j0(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s ?? 1 : 1, u = i(e);
  if (!t)
    return a(u, -l);
  if (!(c(u, t) <= 0))
    return a(u, -l);
}
function V0(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function To(e, t) {
  const [n, r] = U(e);
  return [t === void 0 ? n : t, r];
}
function K0(e, t) {
  const [n, r] = U0(e, t), { startOfMonth: o, endOfMonth: s } = t, i = _i(e, n, r, t), [a, c] = To(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  G(() => {
    const C = _i(e, n, r, t);
    c(C);
  }, [e.timeZone]);
  const l = B0(a, r, e, t), u = W0(l, e.endMonth ? s(e.endMonth) : void 0, e, t), d = F0(l, u, e, t), f = V0(d), p = z0(d), h = j0(a, n, e, t), g = Y0(a, r, e, t), { disableNavigation: y, onMonthChange: v } = e, b = (C) => f.some((E) => E.days.some((k) => k.isEqualTo(C))), x = (C) => {
    if (y)
      return;
    let E = o(C);
    n && E < o(n) && (E = o(n)), r && E > o(r) && (E = o(r)), c(E), v?.(E);
  };
  return {
    months: d,
    weeks: f,
    days: p,
    navStart: n,
    navEnd: r,
    previousMonth: h,
    nextMonth: g,
    goToMonth: x,
    goToDay: (C) => {
      b(C) || x(C.date);
    }
  };
}
var et;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(et || (et = {}));
function $i(e) {
  return !e[ye.disabled] && !e[ye.hidden] && !e[ye.outside];
}
function G0(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    $i(a) && (a[ye.focused] && s < et.FocusedModifier ? (o = i, s = et.FocusedModifier) : r?.isEqualTo(i) && s < et.LastFocused ? (o = i, s = et.LastFocused) : n(i.date) && s < et.Selected ? (o = i, s = et.Selected) : a[ye.today] && s < et.Today && (o = i, s = et.Today));
  }
  return o || (o = e.find((i) => $i(t(i)))), o;
}
function q0(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: c } = s, { addDays: l, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: h, endOfWeek: g, max: y, min: v, startOfBroadcastWeek: b, startOfISOWeek: x, startOfWeek: S } = i;
  let C = {
    day: l,
    week: d,
    month: u,
    year: f,
    startOfWeek: (E) => c ? b(E, i) : a ? x(E) : S(E),
    endOfWeek: (E) => c ? p(E) : a ? h(E) : g(E)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? C = y([r, C]) : t === "after" && o && (C = v([o, C])), C;
}
function Bu(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const c = q0(e, t, n.date, r, o, s, i), l = !!(s.disabled && mt(c, s.disabled, i)), u = !!(s.hidden && mt(c, s.hidden, i)), d = c, f = new Au(c, d, i);
  return !l && !u ? f : Bu(e, t, f, r, o, s, i, a + 1);
}
function X0(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = U(), c = G0(t.days, n, r || (() => !1), i), [l, u] = U(s ? c : void 0);
  return {
    isFocusTarget: (g) => !!c?.isEqualTo(g),
    setFocused: u,
    focused: l,
    blur: () => {
      a(l), u(void 0);
    },
    moveFocus: (g, y) => {
      if (!l)
        return;
      const v = Bu(g, y, l, t.navStart, t.navEnd, e, o);
      v && (e.disableNavigation && !t.days.some((x) => x.isEqualTo(v)) || (t.goToDay(v), u(v)));
    }
  };
}
function Z0(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = To(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t, l = (p) => a?.some((h) => c(h, p)) ?? !1, { min: u, max: d } = e;
  return {
    selected: a,
    select: (p, h, g) => {
      let y = [...a ?? []];
      if (l(p)) {
        if (a?.length === u || r && a?.length === 1)
          return;
        y = a?.filter((v) => !c(v, p));
      } else
        a?.length === d ? y = [p] : y = [...y, p];
      return o || i(y), o?.(y, p, h, g), y;
    },
    isSelected: l
  };
}
function Q0(e, t, n = 0, r = 0, o = !1, s = it) {
  const { from: i, to: a } = t || {}, { isSameDay: c, isAfter: l, isBefore: u } = s;
  let d;
  if (!i && !a)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (i && !a)
    c(i, e) ? n === 0 ? d = { from: i, to: e } : o ? d = { from: i, to: void 0 } : d = void 0 : u(e, i) ? d = { from: e, to: i } : d = { from: i, to: e };
  else if (i && a)
    if (c(i, e) && c(a, e))
      o ? d = { from: i, to: a } : d = void 0;
    else if (c(i, e))
      d = { from: i, to: n > 0 ? void 0 : e };
    else if (c(a, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (u(e, i))
      d = { from: e, to: a };
    else if (l(e, i))
      d = { from: i, to: e };
    else if (l(e, a))
      d = { from: i, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const f = s.differenceInCalendarDays(d.to, d.from);
    r > 0 && f > r ? d = { from: e, to: void 0 } : n > 1 && f < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function J0(e, t, n = it) {
  const r = Array.isArray(t) ? t : [t];
  let o = e.from;
  const s = n.differenceInCalendarDays(e.to, e.from), i = Math.min(s, 6);
  for (let a = 0; a <= i; a++) {
    if (r.includes(o.getDay()))
      return !0;
    o = n.addDays(o, 1);
  }
  return !1;
}
function Hi(e, t, n = it) {
  return ft(e, t.from, !1, n) || ft(e, t.to, !1, n) || ft(t, e.from, !1, n) || ft(t, e.to, !1, n);
}
function ex(e, t, n = it) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? ft(e, a, !1, n) : _u(a, n) ? a.some((c) => ft(e, c, !1, n)) : ka(a) ? a.from && a.to ? Hi(e, { from: a.from, to: a.to }, n) : !1 : Ou(a) ? J0(e, a.dayOfWeek, n) : Iu(a) ? n.isAfter(a.before, a.after) ? Hi(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : mt(e.from, a, n) || mt(e.to, a, n) : Ru(a) || Pu(a) ? mt(e.from, a, n) || mt(e.to, a, n) : !1))
    return !0;
  const i = r.filter((a) => typeof a == "function");
  if (i.length) {
    let a = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let l = 0; l <= c; l++) {
      if (i.some((u) => u(a)))
        return !0;
      a = n.addDays(a, 1);
    }
  }
  return !1;
}
function tx(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, c] = To(o, i ? o : void 0), l = i ? o : a;
  return {
    selected: l,
    select: (f, p, h) => {
      const { min: g, max: y } = e, v = f ? Q0(f, l, g, y, s, t) : void 0;
      return r && n && v?.from && v.to && ex({ from: v.from, to: v.to }, n, t) && (v.from = f, v.to = void 0), i || c(v), i?.(v, f, p, h), v;
    },
    isSelected: (f) => l && ft(l, f, !1, t)
  };
}
function nx(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = To(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t;
  return {
    selected: a,
    select: (d, f, p) => {
      let h = d;
      return !r && a && a && c(d, a) && (h = void 0), o || i(h), o?.(h, d, f, p), h;
    },
    isSelected: (d) => a ? c(a, d) : !1
  };
}
function rx(e, t) {
  const n = nx(e, t), r = Z0(e, t), o = tx(e, t);
  switch (e.mode) {
    case "single":
      return n;
    case "multiple":
      return r;
    case "range":
      return o;
    default:
      return;
  }
}
function ox(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ie(t.today, t.timeZone)), t.month && (t.month = new Ie(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ie(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ie(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ie(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ie(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((oe) => new Ie(oe, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ie(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ie(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = Yt(() => {
    const oe = { ...xa, ...t.locale };
    return {
      dateLib: new Be({
        locale: oe,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: c0(t.components),
      formatters: v0(t.formatters),
      labels: { ...P0, ...t.labels },
      locale: oe,
      classNames: { ...Ca(), ...t.classNames }
    };
  }, [
    t.locale,
    t.broadcastCalendar,
    t.weekStartsOn,
    t.firstWeekContainsDate,
    t.useAdditionalWeekYearTokens,
    t.useAdditionalDayOfYearTokens,
    t.timeZone,
    t.numerals,
    t.dateLib,
    t.components,
    t.formatters,
    t.labels,
    t.classNames
  ]), { captionLayout: c, mode: l, navLayout: u, numberOfMonths: d = 1, onDayBlur: f, onDayClick: p, onDayFocus: h, onDayKeyDown: g, onDayMouseEnter: y, onDayMouseLeave: v, onNextClick: b, onPrevClick: x, showWeekNumber: S, styles: w } = t, { formatCaption: C, formatDay: E, formatMonthDropdown: k, formatWeekNumber: N, formatWeekNumberHeader: M, formatWeekdayName: D, formatYearDropdown: L } = r, P = K0(t, s), { days: O, months: H, navStart: $, navEnd: K, previousMonth: R, nextMonth: A, goToMonth: _ } = P, Y = a0(O, t, $, K, s), { isSelected: j, select: q, selected: Z } = rx(t, s) ?? {}, { blur: W, focused: z, isFocusTarget: F, moveFocus: Q, setFocused: le } = X0(t, P, Y, j ?? (() => !1), s), { labelDayButton: ue, labelGridcell: ge, labelGrid: Se, labelMonthDropdown: Fe, labelNav: wt, labelPrevious: An, labelNext: Ln, labelWeekday: ar, labelWeekNumber: ir, labelWeekNumberHeader: cr, labelYearDropdown: lr } = o, ur = Yt(() => x0(s, t.ISOWeek), [s, t.ISOWeek]), Pt = l !== void 0 || p !== void 0, Qt = B(() => {
    R && (_(R), x?.(R));
  }, [R, _, x]), Jt = B(() => {
    A && (_(A), b?.(A));
  }, [_, A, b]), dr = B((oe, me) => (ne) => {
    ne.preventDefault(), ne.stopPropagation(), le(oe), q?.(oe.date, me, ne), p?.(oe.date, me, ne);
  }, [q, p, le]), fr = B((oe, me) => (ne) => {
    le(oe), h?.(oe.date, me, ne);
  }, [h, le]), Eo = B((oe, me) => (ne) => {
    W(), f?.(oe.date, me, ne);
  }, [W, f]), Do = B((oe, me) => (ne) => {
    const fe = {
      ArrowLeft: [
        ne.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        ne.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [ne.shiftKey ? "year" : "week", "after"],
      ArrowUp: [ne.shiftKey ? "year" : "week", "before"],
      PageUp: [ne.shiftKey ? "year" : "month", "before"],
      PageDown: [ne.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (fe[ne.key]) {
      ne.preventDefault(), ne.stopPropagation();
      const [Ee, de] = fe[ne.key];
      Q(Ee, de);
    }
    g?.(oe.date, me, ne);
  }, [Q, g, t.dir]), No = B((oe, me) => (ne) => {
    y?.(oe.date, me, ne);
  }, [y]), Ao = B((oe, me) => (ne) => {
    v?.(oe.date, me, ne);
  }, [v]), Lo = B((oe) => (me) => {
    const ne = Number(me.target.value), fe = s.setMonth(s.startOfMonth(oe), ne);
    _(fe);
  }, [s, _]), mr = B((oe) => (me) => {
    const ne = Number(me.target.value), fe = s.setYear(s.startOfMonth(oe), ne);
    _(fe);
  }, [s, _]), { className: Io, style: Ro } = Yt(() => ({
    className: [a[te.Root], t.className].filter(Boolean).join(" "),
    style: { ...w?.[te.Root], ...t.style }
  }), [a, t.className, t.style, w]), In = l0(t), pr = V(null);
  H0(pr, !!t.animate, {
    classNames: a,
    months: H,
    focused: z,
    dateLib: s
  });
  const xt = {
    dayPickerProps: t,
    selected: Z,
    select: q,
    isSelected: j,
    months: H,
    nextMonth: A,
    previousMonth: R,
    goToMonth: _,
    getModifiers: Y,
    components: n,
    classNames: a,
    styles: w,
    labels: o,
    formatters: r
  };
  return X.createElement(
    Lu.Provider,
    { value: xt },
    X.createElement(
      n.Root,
      { rootRef: t.animate ? pr : void 0, className: Io, style: Ro, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...In },
      X.createElement(
        n.Months,
        { className: a[te.Months], style: w?.[te.Months] },
        !t.hideNavigation && !u && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[te.Nav], style: w?.[te.Nav], "aria-label": wt(), onPreviousClick: Qt, onNextClick: Jt, previousMonth: R, nextMonth: A }),
        H.map((oe, me) => X.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[te.Month],
            style: w?.[te.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: me,
            displayIndex: me,
            calendarMonth: oe
          },
          u === "around" && !t.hideNavigation && me === 0 && X.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[te.PreviousMonthButton], tabIndex: R ? void 0 : -1, "aria-disabled": R ? void 0 : !0, "aria-label": An(R), onClick: Qt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: R ? void 0 : !0, className: a[te.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          X.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[te.MonthCaption], style: w?.[te.MonthCaption], calendarMonth: oe, displayIndex: me }, c?.startsWith("dropdown") ? X.createElement(
            n.DropdownNav,
            { className: a[te.Dropdowns], style: w?.[te.Dropdowns] },
            (() => {
              const ne = c === "dropdown" || c === "dropdown-months" ? X.createElement(n.MonthsDropdown, { key: "month", className: a[te.MonthsDropdown], "aria-label": Fe(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Lo(oe.date), options: b0(oe.date, $, K, r, s), style: w?.[te.Dropdown], value: s.getMonth(oe.date) }) : X.createElement("span", { key: "month" }, k(oe.date, s)), fe = c === "dropdown" || c === "dropdown-years" ? X.createElement(n.YearsDropdown, { key: "year", className: a[te.YearsDropdown], "aria-label": lr(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: mr(oe.date), options: k0($, K, r, s, !!t.reverseYears), style: w?.[te.Dropdown], value: s.getYear(oe.date) }) : X.createElement("span", { key: "year" }, L(oe.date, s));
              return s.getMonthYearOrder() === "year-first" ? [fe, ne] : [ne, fe];
            })(),
            X.createElement("span", { role: "status", "aria-live": "polite", style: {
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              width: "1px",
              whiteSpace: "nowrap",
              wordWrap: "normal"
            } }, C(oe.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            X.createElement(n.CaptionLabel, { className: a[te.CaptionLabel], role: "status", "aria-live": "polite" }, C(oe.date, s.options, s))
          )),
          u === "around" && !t.hideNavigation && me === d - 1 && X.createElement(
            n.NextMonthButton,
            { type: "button", className: a[te.NextMonthButton], tabIndex: A ? void 0 : -1, "aria-disabled": A ? void 0 : !0, "aria-label": Ln(A), onClick: Jt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: A ? void 0 : !0, className: a[te.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          me === d - 1 && u === "after" && !t.hideNavigation && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[te.Nav], style: w?.[te.Nav], "aria-label": wt(), onPreviousClick: Qt, onNextClick: Jt, previousMonth: R, nextMonth: A }),
          X.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": Se(oe.date, s.options, s) || void 0, className: a[te.MonthGrid], style: w?.[te.MonthGrid] },
            !t.hideWeekdays && X.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[te.Weekdays], style: w?.[te.Weekdays] },
              S && X.createElement(n.WeekNumberHeader, { "aria-label": cr(s.options), className: a[te.WeekNumberHeader], style: w?.[te.WeekNumberHeader], scope: "col" }, M()),
              ur.map((ne) => X.createElement(n.Weekday, { "aria-label": ar(ne, s.options, s), className: a[te.Weekday], key: String(ne), style: w?.[te.Weekday], scope: "col" }, D(ne, s.options, s)))
            ),
            X.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[te.Weeks], style: w?.[te.Weeks] }, oe.weeks.map((ne) => X.createElement(
              n.Week,
              { className: a[te.Week], key: ne.weekNumber, style: w?.[te.Week], week: ne },
              S && // biome-ignore lint/a11y/useSemanticElements: react component
              X.createElement(n.WeekNumber, { week: ne, style: w?.[te.WeekNumber], "aria-label": ir(ne.weekNumber, {
                locale: i
              }), className: a[te.WeekNumber], scope: "row", role: "rowheader" }, N(ne.weekNumber, s)),
              ne.days.map((fe) => {
                const { date: Ee } = fe, de = Y(fe);
                if (de[ye.focused] = !de.hidden && !!z?.isEqualTo(fe), de[Ge.selected] = j?.(Ee) || de.selected, ka(Z)) {
                  const { from: kt, to: ct } = Z;
                  de[Ge.range_start] = !!(kt && ct && s.isSameDay(Ee, kt)), de[Ge.range_end] = !!(kt && ct && s.isSameDay(Ee, ct)), de[Ge.range_middle] = ft(Z, Ee, !0, s);
                }
                const hr = w0(de, w, t.modifiersStyles), Rn = i0(de, a, t.modifiersClassNames), en = !Pt && !de.hidden ? ge(Ee, de, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  X.createElement(n.Day, { key: `${s.format(Ee, "yyyy-MM-dd")}_${s.format(fe.displayMonth, "yyyy-MM")}`, day: fe, modifiers: de, className: Rn.join(" "), style: hr, role: "gridcell", "aria-selected": de.selected || void 0, "aria-label": en, "data-day": s.format(Ee, "yyyy-MM-dd"), "data-month": fe.outside ? s.format(Ee, "yyyy-MM") : void 0, "data-selected": de.selected || void 0, "data-disabled": de.disabled || void 0, "data-hidden": de.hidden || void 0, "data-outside": fe.outside || void 0, "data-focused": de.focused || void 0, "data-today": de.today || void 0 }, !de.hidden && Pt ? X.createElement(n.DayButton, { className: a[te.DayButton], style: w?.[te.DayButton], type: "button", day: fe, modifiers: de, disabled: de.disabled || void 0, tabIndex: F(fe) ? 0 : -1, "aria-label": ue(Ee, de, s.options, s), onClick: dr(fe, de), onBlur: Eo(fe, de), onFocus: fr(fe, de), onKeyDown: Do(fe, de), onMouseEnter: No(fe, de), onMouseLeave: Ao(fe, de) }, E(Ee, s.options, s)) : !de.hidden && E(fe.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      X.createElement(n.Footer, { className: a[te.Footer], style: w?.[te.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function sx({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: i,
  ...a
}) {
  const c = Ca();
  return /* @__PURE__ */ m(
    ox,
    {
      showOutsideDays: n,
      className: ae(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        e
      ),
      captionLayout: r,
      formatters: {
        formatMonthDropdown: (l) => l.toLocaleString("default", { month: "short" }),
        ...s
      },
      classNames: {
        root: ae("w-fit", c.root),
        months: ae(
          "flex gap-4 flex-col md:flex-row relative",
          c.months
        ),
        month: ae("flex flex-col w-full gap-4", c.month),
        nav: ae(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          c.nav
        ),
        button_previous: ae(
          ks({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_previous
        ),
        button_next: ae(
          ks({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_next
        ),
        month_caption: ae(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          c.month_caption
        ),
        dropdowns: ae(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          c.dropdowns
        ),
        dropdown_root: ae(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          c.dropdown_root
        ),
        dropdown: ae(
          "absolute bg-popover inset-0 opacity-0",
          c.dropdown
        ),
        caption_label: ae(
          "select-none font-medium",
          r === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: ae("flex", c.weekdays),
        weekday: ae(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          c.weekday
        ),
        week: ae("flex w-full mt-2", c.week),
        week_number_header: ae(
          "select-none w-(--cell-size)",
          c.week_number_header
        ),
        week_number: ae(
          "text-[0.8rem] select-none text-muted-foreground",
          c.week_number
        ),
        day: ae(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          c.day
        ),
        range_start: ae(
          "rounded-l-md bg-accent",
          c.range_start
        ),
        range_middle: ae("rounded-none", c.range_middle),
        range_end: ae("rounded-r-md bg-accent", c.range_end),
        today: ae(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          c.today
        ),
        outside: ae(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: ae(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: ae("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: l, rootRef: u, ...d }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: u,
            className: ae(l),
            ...d
          }
        ),
        Chevron: ({ className: l, orientation: u, ...d }) => u === "left" ? /* @__PURE__ */ m(Xd, { className: ae("size-4", l), ...d }) : u === "right" ? /* @__PURE__ */ m(
          Zd,
          {
            className: ae("size-4", l),
            ...d
          }
        ) : /* @__PURE__ */ m(Qd, { className: ae("size-4", l), ...d }),
        DayButton: ax,
        WeekNumber: ({ children: l, ...u }) => /* @__PURE__ */ m("td", { ...u, children: /* @__PURE__ */ m("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: l }) }),
        ...i
      },
      ...a
    }
  );
}
function ax({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Ca(), s = T.useRef(null);
  return T.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ m(
    Nt,
    {
      ref: s,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: ae(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
let hn = null;
const Fu = /* @__PURE__ */ new Map(), ix = /* @__PURE__ */ new Map();
function Vr() {
  if (!hn) return;
  const e = hn;
  hn = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function cx(e) {
  return hn?.pillDate === e;
}
function lx({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = V(null), i = So(e);
  G(() => {
    const b = (x) => {
      x.key === "Escape" && (x.stopPropagation(), x.preventDefault(), o());
    };
    return document.addEventListener("keydown", b, !0), () => document.removeEventListener("keydown", b, !0);
  }, [o]), G(() => {
    const b = (S) => {
      s.current && !s.current.contains(S.target) && (S.target.closest(".date-pill") || o());
    }, x = setTimeout(() => {
      document.addEventListener("mousedown", b, !0);
    }, 50);
    return () => {
      clearTimeout(x), document.removeEventListener("mousedown", b, !0);
    };
  }, [o]);
  const a = B((b) => {
    b && r(yn(b)), o();
  }, [r, o]), c = B((b) => {
    const x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + b), r(yn(x)), o();
  }, [r, o]), l = B(() => {
    const x = (/* @__PURE__ */ new Date()).getDay(), S = x === 0 ? 1 : 8 - x, w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + S), r(yn(w)), o();
  }, [r, o]), u = /* @__PURE__ */ new Date(), d = u.toDateString(), f = new Date(u);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), h = u.getDay(), g = h === 0 ? 1 : 8 - h, y = new Date(u);
  y.setDate(y.getDate() + g);
  const v = y.toDateString();
  return /* @__PURE__ */ I(
    "div",
    {
      ref: s,
      className: ae("date-picker-portal", t === "dark" ? "dark" : ""),
      "data-theme": t,
      style: {
        position: "fixed",
        top: n.top,
        left: n.left,
        zIndex: 99999,
        pointerEvents: "auto",
        animation: n.direction === "above" ? "picker-slide-up 0.15s ease-out" : "picker-slide-down 0.15s ease-out",
        transformOrigin: n.direction === "above" ? "bottom center" : "top center"
      },
      children: [
        /* @__PURE__ */ m(
          "div",
          {
            className: "date-picker-arrow",
            style: {
              position: "absolute",
              left: Math.max(12, Math.min(n.pillCenter - n.left, 280)) + "px",
              ...n.direction === "below" ? { top: "-6px" } : { bottom: "-6px" },
              width: "12px",
              height: "12px",
              transform: n.direction === "below" ? "rotate(45deg)" : "rotate(225deg)",
              zIndex: -1
            }
          }
        ),
        /* @__PURE__ */ m("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ I("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ m("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ m(
            sx,
            {
              mode: "single",
              selected: i,
              onSelect: a
            }
          ) }),
          /* @__PURE__ */ m("div", { className: "border-t border-border" }),
          /* @__PURE__ */ I("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ m(
              Nt,
              {
                variant: "outline",
                size: "sm",
                className: ae(
                  "rounded-full text-xs",
                  i.toDateString() === d && "ring-2 ring-primary"
                ),
                onClick: () => c(0),
                children: "Today"
              }
            ),
            /* @__PURE__ */ m(
              Nt,
              {
                variant: "outline",
                size: "sm",
                className: ae(
                  "rounded-full text-xs",
                  i.toDateString() === p && "ring-2 ring-primary"
                ),
                onClick: () => c(1),
                children: "Tomorrow"
              }
            ),
            /* @__PURE__ */ m(
              Nt,
              {
                variant: "outline",
                size: "sm",
                className: ae(
                  "rounded-full text-xs",
                  i.toDateString() === v && "ring-2 ring-primary"
                ),
                onClick: l,
                children: "Next Monday"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
function ux(e, t, n) {
  if (cx(t)) {
    Vr();
    return;
  }
  Vr();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, c = 10, l = 16, u = s - r.bottom - c - l, d = r.top - c - l, f = u >= a ? "below" : d >= a ? "above" : u >= d ? "below" : "above";
  let p;
  f === "below" ? p = r.bottom + c : p = r.top - a - c;
  const h = r.left + r.width / 2;
  let g = h - i / 2;
  g + i > o - l && (g = o - i - l), g < l && (g = l);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((w) => {
    y.addEventListener(w, (C) => {
      C.stopPropagation();
    }, !1);
  });
  const b = Zf(y);
  hn = { container: y, root: b, pillDate: t };
  const x = () => {
    Vr();
  }, S = (w) => {
    const C = Fu.get(t);
    C && C(w);
  };
  b.render(
    /* @__PURE__ */ m(
      lx,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: g, direction: f, pillCenter: h },
        onSelectDate: S,
        onClose: x
      }
    )
  );
}
function dx({ node: e, updateAttributes: t, selected: n }) {
  const r = V(null), o = e.attrs.date || gn(), s = Uu(o), i = Ma(o), a = B(() => {
    if (!r.current) return "";
    const c = r.current.closest(".markdown-editor-container");
    if (c) {
      const u = c.getAttribute("data-theme");
      if (u) return u;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return G(() => (Fu.set(o, (c) => {
    t({ date: c });
  }), ix.set(o, a), () => {
  }), [o, t, a]), G(() => {
    const c = r.current;
    if (!c) return;
    const l = (u) => {
      u.preventDefault(), u.stopPropagation();
      const d = c.getAttribute("data-date") || gn(), f = a();
      ux(c, d, f);
    };
    return c.addEventListener("click", l), () => c.removeEventListener("click", l);
  }, [a]), G(() => {
    const c = r.current?.closest(".ProseMirror") || document, l = () => {
      hn && Vr();
    };
    return c.addEventListener("scroll", l, { passive: !0 }), () => {
      c.removeEventListener("scroll", l);
    };
  }, []), /* @__PURE__ */ m(bn, { as: "span", className: "inline", children: /* @__PURE__ */ I(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ m(fc, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ m("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function So(e) {
  const t = e.split("-");
  if (t.length === 3)
    return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]));
  const n = new Date(e);
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function gn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Fn(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function yn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Uu(e) {
  const t = So(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  o.setDate(o.getDate() + 1);
  const s = new Date(r);
  s.setDate(s.getDate() - 1);
  const i = r.getDay(), a = i === 0 ? 1 : 8 - i, c = new Date(r);
  if (c.setDate(c.getDate() + a), t.getTime() === r.getTime()) return "Today";
  if (t.getTime() === o.getTime()) return "Tomorrow";
  if (t.getTime() === s.getTime()) return "Yesterday";
  if (t.getTime() === c.getTime()) return "Next Monday";
  const l = { month: "short", day: "numeric" };
  return t.getFullYear() !== r.getFullYear() && (l.year = "numeric"), t.toLocaleDateString("en-US", l);
}
function fx(e) {
  return So(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function zt(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return gn();
  if (n === "tomorrow") return Fn(1);
  if (n === "yesterday") return Fn(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), c = a === 0 ? 1 : 8 - a;
    return Fn(c);
  }
  const r = t.match(/^([A-Za-z]+)\s+(\d{1,2})(?:,?\s*(\d{4}))?$/);
  if (r) {
    const a = {
      jan: 0,
      january: 0,
      feb: 1,
      february: 1,
      mar: 2,
      march: 2,
      apr: 3,
      april: 3,
      may: 4,
      jun: 5,
      june: 5,
      jul: 6,
      july: 6,
      aug: 7,
      august: 7,
      sep: 8,
      september: 8,
      oct: 9,
      october: 9,
      nov: 10,
      november: 10,
      dec: 11,
      december: 11
    }[r[1].toLowerCase()];
    if (a !== void 0) {
      const c = parseInt(r[2], 10), l = r[3] ? parseInt(r[3], 10) : (/* @__PURE__ */ new Date()).getFullYear(), u = new Date(l, a, c);
      return yn(u);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const i = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return yn(i);
  }
  return null;
}
function Ma(e) {
  const t = So(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const mx = new Ae("datePillPaste"), px = uo.create({
  name: "datePill",
  group: "inline",
  inline: !0,
  atom: !0,
  addOptions() {
    return { HTMLAttributes: {} };
  },
  addAttributes() {
    return {
      date: {
        default: gn(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = Uu(n), o = Ma(n);
    return [
      "span",
      Cn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return ao(dx, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || gn();
        return t.insertContent({
          type: this.name,
          attrs: { date: n }
        });
      },
      updateDatePill: (e) => ({ commands: t }) => t.updateAttributes(this.name, { date: e })
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-d": () => this.editor.commands.insertDatePill()
    };
  },
  addInputRules() {
    const e = new Oe({
      find: /@today\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(gn()).run();
      }
    }), t = new Oe({
      find: /@tomorrow\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(Fn(1)).run();
      }
    }), n = new Oe({
      find: /@yesterday\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(Fn(-1)).run();
      }
    }), r = new Oe({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), o = new Oe({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = {
          jan: 0,
          feb: 1,
          mar: 2,
          apr: 3,
          may: 4,
          jun: 5,
          jul: 6,
          aug: 7,
          sep: 8,
          oct: 9,
          nov: 10,
          dec: 11
        }[f[1].toLowerCase()];
        if (h !== void 0) {
          const g = (/* @__PURE__ */ new Date()).getFullYear(), y = new Date(g, h, parseInt(f[2], 10));
          d().deleteRange(u).insertDatePill(yn(y)).run();
        }
      }
    }), s = new Oe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = zt(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), i = new Oe({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = zt(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), a = new Oe({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), c = new Oe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = zt(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), l = new Oe({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = zt(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    });
    return [
      e,
      t,
      n,
      r,
      o,
      s,
      i,
      a,
      c,
      l
    ];
  },
  addProseMirrorPlugins() {
    const e = this.type;
    return [
      new Ne({
        key: mx,
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain"), s = r.getData("text/html");
            if (s && s.includes('data-type="date-pill"')) return !1;
            const i = /@([^@\n]+)@/g;
            let a = !1, c;
            const l = new RegExp(i.source, i.flags);
            for (; (c = l.exec(o)) !== null; )
              if (zt(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, p = [];
            let h = 0;
            const g = new RegExp(i.source, i.flags);
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const S = y[1], w = zt(S);
              if (w) {
                const C = o.slice(h, y.index);
                C && p.push(f.text(C)), p.push(e.create({ date: w })), h = y.index + y[0].length;
              }
            }
            const v = o.slice(h);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const b = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, p)
            ), { $from: x } = u.selection;
            if (x.parent.type.name === "paragraph") {
              const S = d;
              let w = u.selection.from;
              for (const C of p)
                S.insert(w, C), w += C.nodeSize;
              S.delete(u.selection.from, u.selection.to), t.dispatch(S);
            } else
              d.replaceSelectionWith(b), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), Ke = /* @__PURE__ */ new Map();
function hx({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = V(null), i = V(null), a = e.attrs.tag || "", c = V(!1), [l, u] = U(() => Ke.has(a)), [d, f] = U(() => Ke.get(a)?.value ?? a);
  G(() => {
    l || f(a);
  }, [a, l]), G(() => {
    if (l) {
      const b = Ke.get(a);
      Ke.set(a, {
        value: d,
        focusedAt: b?.focusedAt ?? Date.now()
      });
    }
  }, [l, d, a]);
  const p = B((b) => {
    if (c.current) return;
    c.current = !0;
    const x = b.trim().replace(/^#/, ""), S = Un(x);
    if (Ke.delete(a), S && Ke.delete(S), !S || !un(S))
      o();
    else if (S !== a) {
      const w = r();
      if (typeof w == "number" && n) {
        const { tr: C } = n.state, E = e.nodeSize;
        C.delete(w, w + E), C.insert(w, n.schema.nodes.tagPill.create({ tag: S })), n.view.dispatch(C);
      }
    } else
      Ke.delete(a);
    u(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), h = B(() => {
    n && !n.isEditable || (Ke.set(a, { value: a, focusedAt: Date.now() }), f(a), u(!0), c.current = !1);
  }, [n, a]);
  G(() => {
    const b = s.current;
    if (!b || l) return;
    const x = (w) => {
      w.preventDefault(), w.stopPropagation(), h();
    }, S = (w) => {
      w.preventDefault(), w.stopPropagation();
    };
    return b.addEventListener("dblclick", x), b.addEventListener("click", S), () => {
      b.removeEventListener("dblclick", x), b.removeEventListener("click", S);
    };
  }, [l, n, r, h]), G(() => {
    if (l) {
      const b = requestAnimationFrame(() => {
        if (i.current) {
          i.current.focus(), i.current.select();
          const x = Ke.get(a);
          x && (x.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(b);
    }
  }, [l, a]);
  const g = B((b) => {
    b.key === "Enter" ? (b.preventDefault(), p(d)) : b.key === "Escape" && (b.preventDefault(), Ke.delete(a), u(!1), c.current = !0, n?.commands.focus());
  }, [p, d, a, n]), y = B(() => {
    const x = Ke.get(a)?.focusedAt ?? 0;
    Date.now() - x > 300 && p(d);
  }, [p, d, a]), v = B((b) => {
    f(b.target.value);
  }, []);
  return l ? /* @__PURE__ */ m(bn, { as: "span", className: "inline", children: /* @__PURE__ */ I(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ m(Ya, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ m(
          "input",
          {
            ref: i,
            type: "text",
            className: "tag-pill-input",
            value: d,
            onChange: v,
            onKeyDown: g,
            onBlur: y,
            spellCheck: !1,
            autoComplete: "off"
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ m(bn, { as: "span", className: "inline", children: /* @__PURE__ */ I(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ m(Ya, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ m("span", { className: "tag-text", children: a })
      ]
    }
  ) });
}
function un(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function Un(e) {
  return e.toLowerCase().trim();
}
const gx = new Ae("tagPillPaste"), yx = uo.create({
  name: "tagPill",
  group: "inline",
  inline: !0,
  atom: !0,
  addOptions() {
    return {
      HTMLAttributes: {},
      onTagClick: void 0,
      enableAutoDetect: !0
    };
  },
  addAttributes() {
    return {
      tag: {
        default: "",
        parseHTML: (e) => e.getAttribute("data-tag"),
        renderHTML: (e) => ({ "data-tag": e.tag })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="tag-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.tag;
    return [
      "span",
      Cn(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return ao(hx, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = Un(e);
        return un(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return this.options.enableAutoDetect ? [new Oe({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = Un(r[1]);
        if (un(o)) {
          const i = r[0].startsWith(" ") ? 1 : 0, a = t.from + i;
          n().deleteRange({ from: a, to: t.to }).insertTagPill(o).run();
        }
      }
    })] : [];
  },
  addProseMirrorPlugins() {
    if (!this.options.enableAutoDetect) return [];
    const e = this.type;
    return [
      new Ne({
        key: gx,
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain"), s = r.getData("text/html");
            if (s && s.includes('data-type="tag-pill"')) return !1;
            const i = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let a = !1, c;
            const l = new RegExp(i.source, i.flags);
            for (; (c = l.exec(o)) !== null; )
              if (un(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, p = [];
            let h = 0;
            const g = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const x = Un(y[1]);
              if (un(x)) {
                const S = y[0], w = S.startsWith(" ") || S.startsWith(`
`) ? 1 : 0, C = o.slice(h, y.index + w);
                C && p.push(f.text(C)), p.push(e.create({ tag: x })), h = y.index + S.length;
              }
            }
            const v = o.slice(h);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const { $from: b } = u.selection;
            if (b.parent.type.name === "paragraph") {
              const x = d;
              let S = u.selection.from;
              for (const w of p)
                x.insert(S, w), S += w.nodeSize;
              x.delete(u.selection.from, u.selection.to), t.dispatch(x);
            } else {
              const x = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, p)
              );
              d.replaceSelectionWith(x), t.dispatch(d);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), vx = /\[\[([^\[\]]+)\]\]$/, bx = vc.create({
  name: "wikiLink",
  addOptions() {
    return {
      HTMLAttributes: {},
      onWikiLinkClick: void 0,
      validateLink: void 0,
      linkClass: "wiki-link",
      invalidLinkClass: "wiki-link-invalid"
    };
  },
  addAttributes() {
    return {
      pageName: {
        default: null,
        parseHTML: (e) => e.getAttribute("data-page-name"),
        renderHTML: (e) => e.pageName ? {
          "data-page-name": e.pageName
        } : {}
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "span[data-wiki-link]"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    const t = e["data-page-name"] || "", n = this.options.validateLink ? this.options.validateLink(t) : !0;
    return [
      "span",
      Cn(
        this.options.HTMLAttributes,
        e,
        {
          "data-wiki-link": "",
          class: n ? this.options.linkClass : `${this.options.linkClass} ${this.options.invalidLinkClass}`
        }
      ),
      0
    ];
  },
  addCommands() {
    return {
      setWikiLink: (e) => ({ commands: t }) => t.setMark(this.name, e),
      unsetWikiLink: () => ({ commands: e }) => e.unsetMark(this.name)
    };
  },
  addInputRules() {
    return this.type, [
      new Oe({
        find: vx,
        handler: ({ state: e, range: t, match: n, chain: r }) => {
          try {
            const o = n[1];
            if (!o) return;
            const s = t.from, i = t.to;
            r().deleteRange({ from: s, to: i }).insertContentAt(s, {
              type: "text",
              text: o,
              marks: [{ type: "wikiLink", attrs: { pageName: o } }]
            }).run();
          } catch (o) {
            console.warn("WikiLinkSafe: Error in input rule", o);
          }
        }
      })
    ];
  },
  // Handle clicks on wiki links using native event delegation
  onCreate() {
    const { onWikiLinkClick: e } = this.options;
    if (!e) return;
    const t = (n) => {
      const r = n.target;
      if (r.hasAttribute("data-wiki-link")) {
        const o = r.getAttribute("data-page-name");
        o && (n.preventDefault(), e(o));
      }
    };
    this.editor.view.dom.addEventListener("click", t), this._clickHandler = t;
  },
  onDestroy() {
    const e = this._clickHandler;
    e && this.editor.view.dom.removeEventListener("click", e);
  }
}), dt = {
  header: /^#{1,6}\s+/m,
  bold: /\*\*[^*]+\*\*/,
  highlight: /==[^=]+==/,
  codeBlock: /```[\s\S]*?```/,
  list: /^\s*[-*+]\s+/m,
  taskList: /^\s*[-*+]\s*\[[ x]\]/im,
  link: /\[.+\]\(.+\)/,
  // Table pattern: header row with pipes, separator row with dashes, optional data rows
  // Allow headers and separators with or without trailing pipes
  table: /^\|[^\n]+\n\|[-:\s|]+/m,
  // Callout pattern: ```info, ```note, ```prompt, ```resources, ```todo, ```summary, ```ad-*
  callout: /```(?:info|note|prompt|resources|todo|summary|ad-\w+)\s*\n[\s\S]*?```/
}, wx = ["info", "note", "prompt", "resources", "todo", "summary"];
function xx(e) {
  return e.length < 3 ? !1 : !!(dt.header.test(e) || dt.bold.test(e) || dt.list.test(e) || dt.taskList.test(e) || dt.codeBlock.test(e) || dt.callout.test(e) || dt.highlight.test(e) || dt.link.test(e) || dt.table.test(e));
}
function kx(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function Cx(e, t) {
  const { alt: n, align: r, width: o } = kx(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", i = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${i} /></figure>`;
}
function no(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Wi(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${no(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const i = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    i ? o.push(Cx(i[1], i[2])) : o.push(`<p>${no(s.trim())}</p>`);
  }
  return o.join("");
}
function Yu(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^[-*+]\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^[-*+]\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^\d+\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[1].trim() } : null;
}
function ju(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", u = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, d = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += u; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${no(f.text)}</p>` : i += `<li><p>${no(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
          const p = t(a + 1, e[a + 1].depth);
          i += p.html, a = p.nextIdx;
        } else
          a++;
        i += "</li>";
      } else
        a++;
    }
    return i += d, { html: i, nextIdx: a };
  }, n = Math.min(...e.map((o) => o.depth));
  return t(0, n).html;
}
function zi(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:[-*+] |\d+\. )/i.test(e);
  if (!t && !n)
    return Wi(e);
  const r = e.split(/<br\s*\/?>/i).filter((a) => a.trim()), o = [];
  let s = [];
  const i = () => {
    s.length !== 0 && (o.push(ju(s)), s = []);
  };
  for (const a of r) {
    const c = Yu(a);
    if (c) {
      if (s.length > 0) {
        const l = s[0].type;
        c.depth === 0 && c.type !== l && i();
      }
      s.push(c);
    } else
      i(), o.push(Wi(a.trim()));
  }
  return i(), o.join("");
}
function Mx(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let i = "<table><thead><tr>";
  for (const a of r)
    i += "<th>" + zi(a) + "</th>";
  i += "</tr></thead><tbody>";
  for (const a of s) {
    if (!a.trim()) continue;
    const c = a.split("|"), l = [];
    for (let u = 0; u < c.length; u++) {
      const d = c[u].trim();
      u === 0 && d === "" && a.trim().startsWith("|") || u === c.length - 1 && d === "" && a.trim().endsWith("|") || l.push(d);
    }
    if (l.length !== 0) {
      i += "<tr>";
      for (let u = 0; u < r.length; u++) {
        const d = l[u] || "";
        i += "<td>" + zi(d) + "</td>";
      }
      i += "</tr>";
    }
  }
  return i += "</tbody></table>", i;
}
function Tx(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (d) => {
    const f = d.split(`
`);
    if (f.length >= 2) {
      const p = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const h = Mx(d);
        if (h) {
          const g = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(h), g;
        }
      }
    }
    return d;
  });
  const o = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (d, f, p) => {
    const h = f.replace("ad-", "");
    let g = p.trim();
    g = g.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), g = g.replace(/__([^_]+)__/g, "<strong>$1</strong>"), g = g.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), g = g.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), g = g.replace(/`([^`]+)`/g, "<code>$1</code>"), g.startsWith("<") || (g = `<p>${g}</p>`);
    const y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<div data-callout="" data-type="${h}" class="callout callout-${h}">${g}</div>`), y;
  }), wx.forEach((d) => {
    const f = new RegExp(`\`\`\`${d}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(f, (p, h) => {
      let g = h.trim();
      g = g.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), g = g.replace(/__([^_]+)__/g, "<strong>$1</strong>"), g = g.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), g = g.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), g = g.replace(/`([^`]+)`/g, "<code>$1</code>"), g.startsWith("<") || (g = `<p>${g}</p>`);
      const y = `MANUSCODEPLACEHOLDER${o.length}END`;
      return o.push(`<div data-callout="" data-type="${d}" class="callout callout-${d}">${g}</div>`), y;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (d, f, p) => {
    const h = f || "plaintext", g = p.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<pre><code class="language-${h}">${g}</code></pre>`), y;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  const s = t.split(`
`), i = [];
  let a = [];
  const c = () => {
    a.length !== 0 && (i.push(ju(a)), a = []);
  };
  for (const d of s) {
    const f = Yu(d);
    if (f) {
      if (a.length > 0) {
        const h = a[0].type, g = Math.min(...a.map((y) => y.depth));
        f.depth === g && f.type !== h && c();
      }
      a.push(f);
      continue;
    }
    c();
    let p = d;
    p = p.replace(/^(#{1,6})\s+(.+)$/, (h, g, y) => {
      const v = g.length;
      return `<h${v}>${y}</h${v}>`;
    }), p = p.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), p = p.replace(/^[-*_]{3,}$/, "<hr>"), i.push(p);
  }
  c(), t = i.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (d, f, p) => {
    const h = f.split("|").map((x) => x.trim());
    let g = "", y = "left", v = null;
    h.length === 1 ? g = h[0] : h.length === 2 ? (g = h[0], /^\d+$/.test(h[1]) ? v = h[1] : ["left", "center", "right"].includes(h[1]) ? y = h[1] : g = f) : h.length === 3 ? (g = h[0], ["left", "center", "right"].includes(h[1]) && (y = h[1]), /^\d+$/.test(h[2]) && (v = h[2])) : g = f;
    const b = v ? ` width="${v}" style="width: ${v}px"` : "";
    return `<img src="${p.trim()}" alt="${g}" data-align="${y}"${b}>`;
  }), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t = t.split(`
`).map((d) => {
    const f = d.trim();
    return f ? /^<[a-z]/.test(f) || /^<\//.test(f) || f.startsWith("MANUSTABLEPLACEHOLDER") || f.startsWith("MANUSCODEPLACEHOLDER") ? d : `<p>${f}</p>` : "";
  }).join(`
`), t = t.replace(/<p>\s*<\/p>/g, "");
  for (let d = 0; d < r.length; d++)
    t = t.replace(`MANUSTABLEPLACEHOLDER${d}END`, r[d]);
  for (let d = 0; d < o.length; d++)
    t = t.replace(`MANUSCODEPLACEHOLDER${d}END`, o[d]);
  return t;
}
const Sx = Je.create({
  name: "markdownPasteSafe",
  addOptions() {
    return {
      enableMarkdownPaste: !0
    };
  },
  addProseMirrorPlugins() {
    if (!this.options.enableMarkdownPaste)
      return [];
    const e = this.editor;
    return [
      new Ne({
        key: new Ae("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const i = o.getData("text/plain");
            if (!i || !xx(i))
              return !1;
            n.preventDefault();
            const a = Tx(i);
            return e.commands.insertContent(a, {
              parseOptions: {
                preserveWhitespace: !1
              }
            }), !0;
          }
        }
      })
    ];
  }
}), Bi = new Ae("collapsibleHeading");
function Ex(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function ro(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), c = `h${i}-${a}`, l = r.get(c) ?? 0;
      r.set(c, l + 1), n.set(s, Ex(i, a, l));
    }
  }), n;
}
let vn = null;
function as(e, t, n) {
  const r = [], o = ro(e, n.levels), s = [];
  e.descendants((l, u) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const d = o.get(u) ?? "";
      s.push({
        pos: u,
        level: l.attrs.level,
        id: d,
        isCollapsed: t.collapsedHeadings.has(d),
        nodeSize: l.nodeSize
      });
    }
  });
  const i = [];
  for (let l = 0; l < s.length; l++) {
    const u = s[l];
    if (u.isCollapsed) {
      const d = u.pos + u.nodeSize;
      let f = e.content.size;
      for (let p = l + 1; p < s.length; p++)
        if (s[p].level <= u.level) {
          f = s[p].pos;
          break;
        }
      d < f && i.push({ start: d, end: f });
    }
  }
  const a = [];
  for (const l of i)
    if (a.length === 0)
      a.push(l);
    else {
      const u = a[a.length - 1];
      l.start <= u.end ? u.end = Math.max(u.end, l.end) : a.push(l);
    }
  function c(l) {
    for (const u of a)
      if (l >= u.start && l < u.end) return !0;
    return !1;
  }
  return e.descendants((l, u) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const d = o.get(u) ?? "", f = t.collapsedHeadings.has(d), p = c(u);
      r.push(
        Xe.node(u, u + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${f ? "is-collapsed" : "is-expanded"}${p ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": d,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const h = Xe.widget(u + l.nodeSize - 1, () => {
        const g = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${d}"]`);
        if (g) {
          g.classList.contains("collapsed") !== f && (g.classList.remove("collapsed", "expanded"), g.classList.add(f ? "collapsed" : "expanded"), g.title = f ? "Click to expand" : "Click to collapse");
          const x = g.parentElement;
          if (x) return x;
        }
        const y = document.createElement("span");
        y.className = "collapsible-heading-chevron-wrapper", y.setAttribute("contenteditable", "false");
        const v = document.createElement("button");
        return v.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, v.setAttribute("data-heading-id", d), v.setAttribute("data-heading-level", String(l.attrs.level)), v.setAttribute("contenteditable", "false"), v.setAttribute("tabindex", "-1"), v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', v.title = f ? "Click to expand" : "Click to collapse", v.addEventListener("click", (b) => {
          b.preventDefault(), b.stopPropagation();
          const x = v.classList.contains("collapsed");
          v.classList.remove("collapsed", "expanded"), v.classList.add(x ? "expanded" : "collapsed"), v.title = x ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(d) ? t.collapsedHeadings.delete(d) : t.collapsedHeadings.add(d), vn && vn.dispatch(vn.state.tr.setMeta("collapsibleHeading", { toggled: d }));
        }), y.appendChild(v), y;
      }, { side: 1, key: `chevron-${d}` });
      r.push(h);
    } else l.isBlock && c(u) && r.push(
      Xe.node(u, u + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Ye.create(e, r);
}
function Dx(e, t, n, r) {
  if (n.collapsedHeadings.size === 0) return;
  const o = ro(t, r), s = new Set(o.values()), i = [];
  n.collapsedHeadings.forEach((a) => {
    s.has(a) || i.push(a);
  });
  for (const a of i)
    n.collapsedHeadings.delete(a);
}
const Nx = Je.create({
  name: "collapsibleHeading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6]
    };
  },
  addStorage() {
    return {
      collapsedHeadings: /* @__PURE__ */ new Set()
    };
  },
  addCommands() {
    return {
      toggleHeadingCollapse: (e) => ({ editor: t, tr: n }) => {
        const r = this.storage, o = n.doc.nodeAt(e);
        if (!o || o.type.name !== "heading")
          return !1;
        const i = ro(n.doc, this.options.levels).get(e);
        return i ? (r.collapsedHeadings.has(i) ? r.collapsedHeadings.delete(i) : r.collapsedHeadings.add(i), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: i })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return ro(t.doc, this.options.levels).forEach((o) => {
          n.collapsedHeadings.add(o);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ne({
        key: Bi,
        view(n) {
          return vn = n, {
            update(r) {
              vn = r;
            },
            destroy() {
              vn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: as(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            const i = n.getMeta("collapsibleHeading");
            return i || n.docChanged ? (n.docChanged && !i && Dx(o.doc, s.doc, e, t.levels), {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: as(s.doc, e, t),
              docVersion: r.docVersion + 1
            }) : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = Bi.getState(n);
            return r?.decorations ? r.decorations : as(n.doc, e, t);
          }
        }
      })
    ];
  }
}), Ax = /\[([^\]]+)\]\(([^)]+)\)$/, Lx = /^(https?:\/\/|www\.)[^\s]+$/i, Ix = Je.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Oe({
        find: Ax,
        handler: ({ state: e, range: t, match: n, chain: r }) => {
          const o = n[1];
          let s = n[2];
          s && !s.startsWith("http://") && !s.startsWith("https://") && (s.startsWith("www."), s = "https://" + s), r().deleteRange(t).insertContent({
            type: "text",
            text: o,
            marks: [
              {
                type: "link",
                attrs: {
                  href: s,
                  target: "_blank",
                  rel: "noopener noreferrer"
                }
              }
            ]
          }).run();
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Ne({
        key: new Ae("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!Lx.test(s)) return !1;
            const { state: i } = t, { selection: a } = i, { from: c, to: l, empty: u } = a;
            let d = s;
            if (!d.startsWith("http://") && !d.startsWith("https://") && (d.startsWith("www."), d = "https://" + d), !u && i.doc.textBetween(c, l))
              return e.chain().focus().extendMarkRange("link").setLink({ href: d }).run(), !0;
            const f = i.schema.marks.link.create({ href: d }), p = i.tr;
            return p.insertText(d, c, l), p.addMark(c, c + d.length, f), t.dispatch(p), !0;
          }
        }
      })
    ];
  }
}), Rx = ["info", "note", "prompt", "resources", "todo"], Px = Je.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Ne({
        key: new Ae("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: i } = o, a = i.start();
            i.end();
            const c = s.textBetween(a, i.pos, ""), l = c.trim();
            for (const u of Rx)
              if (l === `\`\`\`${u}`) {
                n.preventDefault();
                const d = r.tr, f = a + c.indexOf("```");
                d.delete(f, i.pos);
                const p = e.schema.nodes.callout, h = e.schema.nodes.paragraph;
                if (p && h) {
                  const g = h.create(), y = p.create({ type: u }, Tf.from(g));
                  d.insert(f, y);
                  const v = d.doc.resolve(f + 2);
                  d.setSelection(qe.near(v)), t.dispatch(d);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), $r = new Ae("searchHighlight"), Ox = Je.create({
  name: "searchHighlight",
  addOptions() {
    return {
      searchTerm: "",
      caseSensitive: !1,
      useRegex: !1,
      currentMatchIndex: 0
    };
  },
  addStorage() {
    return {
      searchTerm: "",
      caseSensitive: !1,
      useRegex: !1,
      currentMatchIndex: 0
    };
  },
  addCommands() {
    return {
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta($r, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta($r, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ne({
        key: $r,
        state: {
          init() {
            return Ye.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: c } = e, l = t.getMeta($r), u = t.docChanged;
            if (!s)
              return Ye.empty;
            if (!u && !l)
              return n.map(t.mapping, o.doc);
            const d = [];
            let f = 0;
            try {
              let p;
              if (a)
                p = new RegExp(s, i ? "g" : "gi");
              else {
                const h = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                p = new RegExp(h, i ? "g" : "gi");
              }
              o.doc.descendants((h, g) => {
                if (h.isText && h.text) {
                  let y;
                  for (; (y = p.exec(h.text)) !== null; ) {
                    const v = g + y.index, b = g + y.index + y[0].length, x = f === c;
                    d.push(
                      Xe.inline(v, b, {
                        class: x ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return Ye.empty;
            }
            return Ye.create(o.doc, d);
          }
        },
        props: {
          decorations(t) {
            return this.getState(t);
          }
        }
      })
    ];
  }
}), _x = new Ae("tabIndent");
function $x(e) {
  const { $from: t } = e.selection;
  for (let n = t.depth; n >= 0; n--) {
    const r = t.node(n);
    if (r.type.name === "taskItem")
      return "taskItem";
    if (r.type.name === "listItem")
      return "listItem";
  }
  return null;
}
function Fi(e, t) {
  const { $from: n } = e.selection, r = e.schema.nodes.orderedList, o = e.schema.nodes.bulletList;
  if (!r || !o) return !1;
  for (let s = n.depth; s >= 0; s--) {
    const i = n.node(s);
    if (i.type === r) {
      if (s >= 2) {
        const a = n.node(s - 1);
        if (a.type.name === "listItem" || a.type.name === "taskItem") {
          if (t) {
            const c = n.before(s), l = e.tr.setNodeMarkup(c, o, i.attrs);
            t(l);
          }
          return !0;
        }
      }
      break;
    }
    if (i.type.name === "bulletList" || i.type.name === "taskList")
      break;
  }
  return !1;
}
const Hx = Je.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Ne({
        key: _x,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = $x(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!Va(s)(n, r)) {
                const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
                l && Va(l)(n, r);
              }
            } else if (Ka(s)(n, r))
              Fi(e.state, r);
            else {
              const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
              l && Ka(l)(n, r) && Fi(e.state, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), Wx = new Ae("expandSelection");
function is(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const zx = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), Vu = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), Bx = "tableRow", Fx = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function Ux(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Yx(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (Fx.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function jx(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === Bx) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Vx(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (Vu.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Kx(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const c = r.node(a);
    zx.has(c.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function Gx(e) {
  const t = [];
  if (e.forEach((r, o) => {
    r.type.name === "heading" && t.push({ level: r.attrs.level, from: o });
  }), t.length === 0) return [];
  const n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    let s = e.content.size;
    for (let i = r + 1; i < t.length; i++)
      if (t[i].level <= o.level) {
        s = t[i].from;
        break;
      }
    n.push({
      level: o.level,
      from: o.from,
      to: s
    });
  }
  return n;
}
function qx(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function Xx(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function Zx(e, t, n) {
  let r = !1;
  return e.nodesBetween(t, n, (o) => Vu.has(o.type.name) ? (r = !0, !1) : !0), r;
}
function Qx(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (c) => c && (c.from < o || c.to > s) ? (r.push(c), o = c.from, s = c.to, !0) : !1;
  i(Ux(e, o, s)), Xx(e, t) && (i(Yx(e, o, s)), i(jx(e, o, s))), i(Kx(e, o, s)), i(Vx(e, o, s));
  const a = Gx(e);
  if (a.length > 0) {
    const c = qx(a, o, s);
    for (const l of c)
      Zx(e, l.from, l.to) ? l.from === 0 && l.to === e.content.size ? i({ from: 0, to: e.content.size, useSelectAll: !0 }) : i({ from: l.from, to: l.to, useSelectAll: !0 }) : i({ from: l.from, to: l.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size, useSelectAll: !0 }), r;
}
const Jx = Je.create({
  name: "expandSelection",
  priority: 1e3,
  addStorage() {
    return {
      lastExpandedFrom: -1,
      lastExpandedTo: -1,
      expansionDepth: 0,
      isExpanding: !1
    };
  },
  addKeyboardShortcuts() {
    return {
      // Expand selection (Cmd+A / Ctrl+A)
      // Move cursor to beginning of document (Cmd+Up / Ctrl+Up)
      "Mod-ArrowUp": ({ editor: e }) => {
        e.commands.setTextSelection(0);
        const t = e.view;
        return t.dispatch(t.state.tr.scrollIntoView()), !0;
      },
      // Move cursor to end of document (Cmd+Down / Ctrl+Down)
      "Mod-ArrowDown": ({ editor: e }) => {
        const t = e.state.doc.content.size;
        e.commands.setTextSelection(t);
        const n = e.view;
        return n.dispatch(n.state.tr.scrollIntoView()), !0;
      },
      "Mod-a": ({ editor: e }) => {
        const t = this.storage, { doc: n, selection: r } = e.state, { from: o, to: s } = r;
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof Mf || o === 0 && s === n.content.size)
          return !0;
        const a = Qx(n, o, s);
        let c = null;
        for (const l of a)
          if (l.from < o || l.to > s) {
            c = l;
            break;
          }
        if (c) {
          if (t.isExpanding = !0, c.from === 0 && c.to === n.content.size)
            e.commands.selectAll(), t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size;
          else if (c.useSelectAll)
            try {
              const l = n.resolve(c.from), u = n.resolve(c.to), d = e.state.tr, f = qe.between(l, u);
              e.view.dispatch(d.setSelection(f).scrollIntoView());
              const p = e.state.selection;
              t.lastExpandedFrom = p.from, t.lastExpandedTo = p.to;
            } catch {
              e.commands.selectAll(), t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size;
            }
          else {
            e.commands.setTextSelection({
              from: c.from,
              to: c.to
            });
            const l = e.state.selection;
            l.from !== c.from || l.to !== c.to ? (e.commands.selectAll(), t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size) : (t.lastExpandedFrom = c.from, t.lastExpandedTo = c.to);
          }
          return t.expansionDepth++, t.isExpanding = !1, !0;
        }
        return t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size, t.expansionDepth++, t.isExpanding = !0, e.commands.selectAll(), t.isExpanding = !1, !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ne({
        key: Wx,
        props: {
          handleClick() {
            return is(e), !1;
          },
          handleTextInput() {
            return is(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && is(e), !1;
          }
        }
      })
    ];
  }
}), ek = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function tk(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const nk = new Ae("hexColorDecoration");
function Ku(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const c = new RegExp(ek.source, "g");
    for (; (a = c.exec(i)) !== null; ) {
      const l = s + a.index, u = l + a[0].length;
      if (u >= t && l <= n) {
        const d = a[0], f = tk(d);
        r.push(
          Xe.inline(l, u, {
            class: "hex-color-swatch",
            style: `background-color: ${d}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), r;
}
function rk(e) {
  const t = Ku(e, 0, e.content.size);
  return Ye.create(e, t);
}
const ok = vc.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Ne({
        key: nk,
        state: {
          init(e, { doc: t }) {
            return rk(t);
          },
          apply(e, t) {
            if (!e.docChanged)
              return t;
            let n = t.map(e.mapping, e.doc);
            const r = [];
            if (e.mapping.maps.forEach((s, i) => {
              s.forEach((a, c, l, u) => {
                const d = Math.max(0, l - 10), f = Math.min(e.doc.content.size, u + 10);
                r.push({ from: d, to: f });
              });
            }), r.length === 0)
              return n;
            r.sort((s, i) => s.from - i.from);
            const o = [r[0]];
            for (let s = 1; s < r.length; s++) {
              const i = o[o.length - 1];
              r[s].from <= i.to ? i.to = Math.max(i.to, r[s].to) : o.push(r[s]);
            }
            for (const s of o) {
              n = n.remove(
                n.find(s.from, s.to)
              );
              const i = Ku(e.doc, s.from, s.to);
              i.length > 0 && (n = n.add(e.doc, i));
            }
            return n;
          }
        },
        props: {
          decorations(e) {
            return this.getState(e);
          }
        }
      })
    ];
  }
}), De = new Ae("selectAllOccurrences");
function Ui(e, t, n, r, o) {
  const s = [];
  if (!t) return s;
  let i;
  try {
    if (r)
      i = new RegExp(t, n ? "g" : "gi");
    else {
      let a = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      o && (a = `\\b${a}\\b`), i = new RegExp(a, n ? "g" : "gi");
    }
  } catch {
    return s;
  }
  return e.descendants((a, c) => {
    if (a.isText && a.text) {
      let l;
      for (; (l = i.exec(a.text)) !== null; )
        s.push({
          from: c + l.index,
          to: c + l.index + l[0].length,
          text: l[0]
        });
    }
    return !0;
  }), s;
}
function Et(e, t) {
  const n = De.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function sk(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Te(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const ak = Je.create({
  name: "selectAllOccurrences",
  addStorage() {
    return {
      isActive: !1,
      ranges: [],
      searchTerm: "",
      caseSensitive: !1,
      useRegex: !1,
      wholeWord: !1,
      typedBuffer: "",
      isTypingReplace: !1,
      originalTermLength: 0,
      allMatches: [],
      nextMatchIndex: 0,
      isIncremental: !1,
      undoStack: [],
      redoStack: []
    };
  },
  addCommands() {
    return {
      /**
       * Activate "Select All Occurrences" mode — highlights ALL matches at once.
       */
      selectAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: r }) => {
        const {
          searchTerm: o,
          caseSensitive: s = !1,
          useRegex: i = !1,
          wholeWord: a = !1
        } = e;
        if (!o) return !1;
        const c = Ui(t.state.doc, o, s, i, a);
        return c.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = c, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = i, this.storage.wholeWord = a, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = c, this.storage.nextMatchIndex = c.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(De, { activate: !0 })), !0);
      },
      /**
       * Select the next occurrence incrementally (Cmd+D behavior).
       * First call: selects the word under cursor or current selection.
       * Subsequent calls: add the next match to the selection.
       */
      selectNextOccurrence: () => ({ editor: e, tr: t, dispatch: n }) => {
        const r = this.storage;
        if (!r.isActive) {
          const { state: o } = e, { from: s, to: i } = o.selection;
          let a = "";
          if (s !== i)
            a = o.doc.textBetween(s, i, "");
          else {
            const d = o.doc.resolve(s), f = d.parent;
            if (f.isTextblock) {
              const p = f.textContent, h = d.parentOffset;
              let g = h, y = h;
              for (; g > 0 && /\w/.test(p[g - 1]); ) g--;
              for (; y < p.length && /\w/.test(p[y]); ) y++;
              g < y && (a = p.slice(g, y));
            }
          }
          if (!a) return !1;
          const c = Ui(o.doc, a, !1, !1, !1);
          if (c.length === 0) return !1;
          const l = sk(c, s), u = c[l];
          return r.isActive = !0, r.ranges = [u], r.searchTerm = a, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = a.length, r.allMatches = c, r.nextMatchIndex = (l + 1) % c.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(De, { activate: !0 })), setTimeout(() => {
            try {
              const d = e.view.domAtPos(u.from);
              d.node && d.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {
            }
          }, 20), !0;
        }
        if (r.isIncremental && r.allMatches.length > 0) {
          const o = r.nextMatchIndex, s = r.allMatches[o];
          return r.ranges.some(
            (a) => a.from === s.from && a.to === s.to
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(De, { activate: !0 })), setTimeout(() => {
            try {
              const a = e.view.domAtPos(s.from);
              a.node && a.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {
            }
          }, 20), !0);
        }
        return !1;
      },
      /**
       * Deactivate "Select All Occurrences" mode and clear highlights.
       */
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Te(this.storage), t && t(e.setMeta(De, { deactivate: !0 })), !0),
      /**
       * Apply a mark (bold, italic, etc.) to all selected occurrences in one transaction.
       * All changes are in a single transaction for proper undo/redo.
       */
      toggleMarkOnAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: r }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        const o = t.schema.marks[e];
        if (!o) return !1;
        const { ranges: s } = this.storage, i = s.every((a) => {
          let c = !0;
          return t.state.doc.nodesBetween(a.from, a.to, (l) => {
            l.isText && !o.isInSet(l.marks) && (c = !1);
          }), c;
        });
        if (r) {
          for (const a of s)
            i ? n.removeMark(a.from, a.to, o) : n.addMark(a.from, a.to, o.create());
          r(n);
        }
        return setTimeout(() => {
          try {
            const a = t.view;
            if (a) {
              const c = Et(a, this.storage);
              this.storage.ranges = c, c.length === 0 && Te(this.storage);
            }
          } catch {
          }
        }, 10), !0;
      },
      /**
       * Delete all selected occurrences in a single transaction.
       */
      deleteAllOccurrences: () => ({ editor: e, tr: t, dispatch: n }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        if (n) {
          const r = [...this.storage.ranges].sort((o, s) => s.from - o.from);
          for (const o of r)
            t.delete(o.from, o.to);
          n(t);
        }
        return Te(this.storage), !0;
      },
      /**
       * Replace all selected occurrences with new text in a single transaction.
       */
      replaceAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: r }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        if (r) {
          const o = [...this.storage.ranges].sort((s, i) => i.from - s.from);
          for (const s of o)
            n.replaceWith(s.from, s.to, t.schema.text(e));
          r(n);
        }
        return e ? setTimeout(() => {
          try {
            const o = t.view;
            if (o) {
              const s = Et(o, this.storage);
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && Te(this.storage);
            }
          } catch {
          }
        }, 10) : Te(this.storage), !0;
      },
      /**
       * Get the current state of Select All Occurrences mode.
       */
      getOccurrencesState: () => () => !0
    };
  },
  addKeyboardShortcuts() {
    return {
      // Cmd+D / Ctrl+D: select next occurrence incrementally
      "Mod-d": () => this.editor.commands.selectNextOccurrence()
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ne({
        key: De,
        state: {
          init() {
            return Ye.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(De);
            if (s?.deactivate || !e.isActive)
              return Ye.empty;
            if (s?.activate || s?.refresh) {
              const i = [];
              for (const a of e.ranges) {
                i.push(
                  Xe.inline(a.from, a.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const c = document.createElement("span");
                c.className = "select-all-multi-cursor", c.setAttribute("aria-hidden", "true"), i.push(
                  Xe.widget(a.to, c, {
                    side: 1,
                    key: `cursor-${a.from}-${a.to}`
                  })
                );
              }
              return Ye.create(o.doc, i);
            }
            return t.docChanged ? n.map(t.mapping, o.doc) : n;
          }
        },
        props: {
          decorations(t) {
            return this.getState(t);
          },
          // Clicking outside the highlighted ranges exits the mode
          handleClick(t, n) {
            if (!e.isActive) return !1;
            if (!e.ranges.some(
              (o) => n >= o.from && n <= o.to
            )) {
              Te(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(De, { deactivate: !0 }));
            }
            return !1;
          },
          /**
           * Intercept keystrokes when Select All mode is active.
           * - Escape: exit mode
           * - Backspace: delete one char from typed buffer, or delete all occurrences if buffer empty
           * - Cmd+Z / Ctrl+Z: undo the last batch replacement step
           * - Formatting shortcuts (Cmd+B, Cmd+I, etc.): let them through for batch formatting
           */
          handleKeyDown(t, n) {
            if (!e.isActive) return !1;
            if (n.key === "Escape") {
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(De, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), Qf(t.state, t.dispatch), setTimeout(() => {
                  const s = Et(t);
                  e.ranges = s, s.length === 0 && Te(e);
                }, 10), !0;
              }
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(De, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, Jf(t.state, t.dispatch), setTimeout(() => {
                  const s = Et(t);
                  e.ranges = s, s.length === 0 && Te(e);
                }, 10), !0;
              }
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(De, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Et(t);
                if (r.length === 0) {
                  Te(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(De, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, c) => c.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = Et(t);
                  e.ranges = a, a.length === 0 && Te(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
                for (const i of r)
                  o.delete(i.from, i.to);
                t.dispatch(o), Te(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(De, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
              for (const i of r)
                o.delete(i.from, i.to);
              t.dispatch(o), Te(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(De, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(De, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Te(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(De, { deactivate: !0 })), !1;
            }
            return !1;
          },
          /**
           * Intercept text input (typed characters) for batch replacement.
           * 
           * Each keystroke creates a single transaction that replaces all occurrences,
           * making each step individually undoable via Cmd+Z.
           * 
           * KEY FIX: Instead of re-searching the document after replacement (which
           * would find false matches), we rely on ProseMirror's decoration mapping
           * to track where the replaced text lives.
           */
          handleTextInput(t, n, r, o) {
            if (!e.isActive || !o) return !1;
            const s = Et(t);
            if (s.length === 0) {
              Te(e);
              const { tr: c } = t.state;
              return t.dispatch(c.setMeta(De, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((c, l) => l.from - c.from), { tr: a } = t.state;
            for (const c of i)
              a.replaceWith(c.from, c.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const c = Et(t);
              e.ranges = c, c.length === 0 && Te(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function ik() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function ck(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function lk(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let c = 0; c < i.length; c++)
    a[c] = i.charCodeAt(c);
  return new File([a], t, { type: s });
}
function uk(e, t) {
  return t.includes(e.type);
}
function dk(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function fk(e, t, n) {
  return new Promise((r, o) => {
    const s = new window.Image(), i = new FileReader();
    i.onload = (a) => {
      s.src = a.target?.result;
    }, i.onerror = () => o(new Error("Failed to read file")), s.onload = () => {
      let a = s.width, c = s.height;
      if (a > t) {
        const y = t / a;
        a = t, c = Math.round(c * y);
      }
      const l = document.createElement("canvas");
      l.width = a, l.height = c;
      const u = l.getContext("2d");
      if (!u) {
        o(new Error("Failed to get canvas context"));
        return;
      }
      u.imageSmoothingEnabled = !0, u.imageSmoothingQuality = "high", u.drawImage(s, 0, 0, a, c);
      const d = e.type === "image/png" || e.type === "image/gif", f = d ? "image/png" : "image/jpeg", p = d ? void 0 : n, h = l.toDataURL(f, p), g = lk(h, e.name);
      r({ dataUrl: h, file: g, width: a, height: c });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function mk(e, t, n) {
  e.view.state.doc.descendants((r, o) => {
    if (r.type.name === "resizableImage" && r.attrs.src === t && r.attrs.alt === n) {
      try {
        const { state: s, dispatch: i } = e.view, a = s.tr.delete(o, o + r.nodeSize);
        i(a);
      } catch {
      }
      return !1;
    }
    return !0;
  });
}
async function Yi(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!uk(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = ik();
  try {
    n.onUploadStart?.();
    let o, s, i;
    const a = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && a) {
      const p = await fk(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = p.dataUrl, i = p.file, s = Math.min(p.width, 600);
    } else {
      o = await ck(e), i = e;
      const p = await dk(o);
      s = Math.min(p.width, 600);
    }
    const { doc: c } = t.view.state;
    c.content.size === 0 || c.childCount === 1 && c.firstChild?.isTextblock && c.firstChild.content.size === 0 ? t.chain().focus().insertContent({
      type: "resizableImage",
      attrs: {
        src: o,
        alt: e.name,
        width: s
      }
    }).run() : t.chain().focus().setImage({
      src: o,
      alt: e.name,
      width: s
    }).run();
    const { state: u } = t.view, d = u.selection.from - 1, f = u.doc.nodeAt(d);
    if (f && f.type.name === "resizableImage") {
      const p = t.view.nodeDOM(d);
      if (p) {
        const h = p instanceof HTMLElement ? p : p.dom;
        h && h.classList.add("image-uploading");
      }
    }
    try {
      const p = await n.onImageUpload(i, {
        fileName: e.name,
        mimeType: i.type,
        fileSize: i.size,
        uploadId: r
      });
      let h = !1;
      return t.view.state.doc.descendants((g, y) => {
        if (h) return !1;
        if (g.type.name === "resizableImage" && g.attrs.src === o && g.attrs.alt === e.name) {
          try {
            const { state: v, dispatch: b } = t.view, x = v.doc.nodeAt(y);
            if (x) {
              const S = v.tr.setNodeMarkup(y, void 0, {
                ...x.attrs,
                src: p
              });
              b(S);
            }
          } catch (v) {
            console.warn("Failed to replace placeholder with uploaded reference:", v);
          }
          return h = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((g, y) => {
        if (g.type.name === "resizableImage" && g.attrs.src === p) {
          const v = t.view.nodeDOM(y);
          if (v) {
            const b = v instanceof HTMLElement ? v : v.dom;
            b && b.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (p) {
      return console.warn("Image upload failed, removing placeholder:", p), mk(t, o, e.name), n.onUploadError?.(`Upload failed: ${p instanceof Error ? p.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function ji(e) {
  const t = [];
  if (e.items)
    for (let n = 0; n < e.items.length; n++) {
      const r = e.items[n];
      if (r.kind === "file" && r.type.startsWith("image/")) {
        const o = r.getAsFile();
        o && t.push(o);
      }
    }
  if (t.length === 0 && e.files)
    for (let n = 0; n < e.files.length; n++) {
      const r = e.files[n];
      r.type.startsWith("image/") && t.push(r);
    }
  return t;
}
const pk = Je.create({
  name: "imageUpload",
  addOptions() {
    return {
      maxFileSize: 10 * 1024 * 1024,
      // 10MB default
      allowedMimeTypes: [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml"
      ],
      enableCompression: !0,
      maxCompressedWidth: 1200,
      compressionQuality: 0.8,
      onUploadStart: void 0,
      onUploadComplete: void 0,
      onUploadError: void 0,
      onImageUpload: void 0
    };
  },
  addProseMirrorPlugins() {
    const e = this.options, t = this.editor;
    return [
      new Ne({
        key: new Ae("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = ji(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((i) => {
              Yi(i, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const i = r.dataTransfer;
            if (!i) return !1;
            const a = ji(i);
            if (a.length === 0)
              return !1;
            r.preventDefault();
            const c = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (c) {
              const l = n.state.tr.setSelection(
                qe.near(n.state.doc.resolve(c.pos))
              );
              n.dispatch(l);
            }
            return a.forEach((l) => {
              Yi(l, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function hk({
  placeholder: e,
  isMobile: t,
  maxImageSize: n,
  headingLevels: r,
  collapsibleHeadingLevels: o,
  disabledFeatures: s,
  progressiveSelectAll: i,
  enableCollapsibleHeadings: a,
  enableTagAutoDetect: c,
  enableHexColorHighlight: l,
  isLightweight: u,
  setImageEditState: d,
  callbackRefs: f
}) {
  return Yt(() => {
    const p = [
      Ef.configure({
        heading: {
          levels: r
        },
        codeBlock: !1,
        // We use CodeBlockWithFeatures instead
        dropcursor: {
          color: "var(--primary)",
          width: 2
        },
        // Disable default list extensions - we use MixedLists instead
        bulletList: !1,
        orderedList: !1,
        listItem: !1,
        // Disable extensions that we configure separately to avoid duplicates
        link: !1,
        // We configure Link separately with custom options
        underline: !1,
        // We add Underline separately
        // Disable built-in HorizontalRule input rules - we handle HR creation
        // via our custom space shortcut handler (insertHorizontalRuleClean)
        // to avoid the extra empty paragraph that the default command creates
        horizontalRule: !1,
        bold: {
          HTMLAttributes: {
            class: "font-bold"
          }
        },
        italic: {
          HTMLAttributes: {
            class: "italic"
          }
        },
        // Disable built-in Code mark — we extend it below with keepOnSplit: false
        // so that pressing Enter in a list item with inline code does not carry
        // the code formatting into the new list item.
        code: !1
      }),
      // Inline code mark with keepOnSplit disabled — prevents the code style
      // from carrying over when pressing Enter to create a new list item.
      tm.configure({}).extend({ keepOnSplit: !1 }),
      // Mixed list extensions - allow inter-mixing of bullet, ordered, and task list items
      Yv,
      jv,
      Gv,
      Df.configure({
        placeholder: e,
        emptyEditorClass: "is-editor-empty"
      }),
      Nf.configure({
        types: ["heading", "paragraph"]
      }),
      Af.configure({
        multicolor: !0
      }),
      Lf.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      Ff,
      Uf,
      Yf,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...u ? [] : [jf],
      Ix,
      Ox,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...u ? [] : [ak],
      Hx,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      em.extend({
        addInputRules() {
          const h = this.type;
          return [
            new Oe({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: g, range: y }) => {
                const { tr: v } = g, b = y.from, x = y.to;
                v.delete(b, x);
                const S = v.doc.resolve(b), w = h.create(), C = S.before(S.depth), E = S.after(S.depth);
                v.replaceWith(C, E, w);
                const k = C + w.nodeSize;
                if (k < v.doc.content.size) {
                  const N = v.doc.resolve(k);
                  N.nodeAfter && N.nodeAfter.isTextblock ? v.setSelection(qe.create(v.doc, k + 1)) : N.nodeAfter && v.setSelection(qe.near(v.doc.resolve(k)));
                } else {
                  const M = g.schema.nodes.paragraph.create();
                  v.insert(k, M), v.setSelection(qe.create(v.doc, k + 1));
                }
                v.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return s.tables || p.push(
      If.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Rf,
      Ov,
      _v,
      ...u ? [] : [Uv]
    ), s.taskLists || p.push(
      Vv.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Kv.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), !t && !u && p.push(
      Xv.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || p.push(Jv), s.callouts || p.push(tb, Px), a && !s.collapsibleHeadings && !u && p.push(
      Nx.configure({
        levels: o
      })
    ), s.images || p.push(
      nb.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (h) => {
          d({
            isOpen: !0,
            src: h.src,
            alt: h.alt,
            pos: h.pos,
            position: { x: h.rect.left + h.rect.width / 2, y: h.rect.bottom }
          });
        },
        resolveImageSrc: f.resolveImageSrc.current ? ((...h) => f.resolveImageSrc.current(...h)) : void 0
      }),
      pk.configure({
        maxFileSize: n,
        onUploadStart: f.onImageUploadStart.current ? ((...h) => f.onImageUploadStart.current(...h)) : void 0,
        onUploadComplete: f.onImageUploadComplete.current ? ((...h) => f.onImageUploadComplete.current(...h)) : void 0,
        onUploadError: f.onImageUploadError.current ? ((...h) => f.onImageUploadError.current(...h)) : void 0,
        onImageUpload: f.onImageUpload.current ? ((h, g) => f.onImageUpload.current(h, g)) : void 0
      })
    ), s.datePills || p.push(
      px.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), s.tagPills || p.push(
      yx.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: c
      })
    ), s.wikiLinks || p.push(
      bx.configure({
        onWikiLinkClick: (h) => {
          console.log("WikiLink clicked:", h), f.onWikiLinkClick.current?.(h);
        },
        validateLink: (h) => f.validateWikiLink.current ? f.validateWikiLink.current(h) : !0
      })
    ), i && p.push(Jx), l && !u && p.push(ok), s.markdownPaste || p.push(
      Sx.configure({
        enableMarkdownPaste: !0
      })
    ), p;
  }, [e, t, n, r, o, s, i, a, c, l, u]);
}
let pt = null, oo = null;
async function Gu() {
  if (pt) return pt;
  const [{ default: e }, { gfm: t }] = await Promise.all([
    import("./turndown.browser.es-C_NdrW92.js"),
    import("./turndown-plugin-gfm.es-BmmRUgTd.js")
  ]), n = new e({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
    strongDelimiter: "**",
    // CRITICAL: Handle empty elements that Turndown considers "blank".
    // TipTap's getHTML() can produce <p></p> (no children) for empty lines.
    // Turndown's custom rules only run for non-blank nodes.
    // Blank nodes (empty textContent, no meaningful children) go through
    // blankReplacement instead. Without this, empty paragraphs are silently
    // dropped, causing user-intentional blank lines to disappear on reload.
    blankReplacement: (c, l) => l.nodeName === "P" ? `

​

` : l.isBlock ? `

` : ""
  });
  n.use(t), n.addRule("highlight", {
    filter: (c) => c.nodeName === "MARK",
    replacement: (c) => `==${c}==`
  }), n.addRule("resizableImage", {
    filter: "img",
    replacement: (c, l) => {
      const u = l, d = u.getAttribute("src") || "", p = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = u.getAttribute("width"), g = h ? parseInt(h, 10) : null, y = u.getAttribute("data-align") || "left", v = [p], b = y !== "left", x = g && g > 0;
      return (b || x) && v.push(b ? y : "left"), x && v.push(String(g)), `![${v.join(" | ")}](${d})`;
    }
  }), n.addRule("imageResizer", {
    filter: (c) => c.nodeName === "FIGURE" && c.classList.contains("image-resizer"),
    replacement: (c, l) => {
      const u = l.querySelector("img");
      if (!u) return c;
      const d = u.getAttribute("src") || "", p = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = u.getAttribute("width"), g = h ? parseInt(h, 10) : null, y = u.getAttribute("data-align") || "left", v = [p], b = y !== "left", x = g && g > 0;
      (b || x) && v.push(b ? y : "left"), x && v.push(String(g));
      const S = `![${v.join(" | ")}](${d})`, w = l.parentNode;
      return w && w.nodeName === "LI" ? `
` + S + `
` : `

` + S + `

`;
    }
  }), n.addRule("taskListItem", {
    filter: (c) => c.nodeName === "LI" && c.getAttribute("data-type") === "taskItem",
    replacement: (c, l) => {
      const u = l, d = u.querySelector('input[type="checkbox"]'), f = d?.hasAttribute("checked") || d?.checked || u.getAttribute("data-checked") === "true";
      return c = c.replace(/^\n+/, "").replace(/\n+$/, "").replace(/\n\n+/g, `

`), c = c.replace(/\n\n(- |\d+\. )/g, `
$1`), c = c.replace(/\u200B/g, "").trim(), `- [${f ? "x" : " "}] ` + (c || "​").replace(/\n/gm, `
    `) + `
`;
    }
  }), n.addRule("listItem", {
    filter: (c) => c.nodeName === "LI" && c.getAttribute("data-type") !== "taskItem",
    replacement: (c, l) => {
      c = c.replace(/^\n+/, "").replace(/\n+$/, ""), c = c.replace(/\n\n+(- |\d+\. )/g, `
$1`), c = c.replace(/\u200B/g, "").trim();
      const u = c || "​", d = l.parentNode;
      let f;
      if (d && d.nodeName === "OL") {
        const g = Array.from(d.children).filter((v) => v.nodeName === "LI").indexOf(l);
        f = `${parseInt(d.getAttribute("start") || "1", 10) + g}. `;
      } else
        f = "-   ";
      const p = " ".repeat(f.length);
      return f + u.replace(/\n/gm, `
` + p) + `
`;
    }
  }), n.addRule("tightListParagraph", {
    filter: (c) => c.nodeName === "P" && c.parentNode !== null && c.parentNode.nodeName === "LI",
    replacement: (c) => c
  }), n.addRule("blankLinePreservation", {
    filter: (c) => c.nodeName === "P" && (c.textContent === "" || c.textContent === "​") && c.parentNode !== null && c.parentNode.nodeName !== "LI",
    replacement: () => `

​

`
  });
  function r(c) {
    const l = c.getAttribute("src") || "", d = (c.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = c.getAttribute("width"), p = f ? parseInt(f, 10) : null, h = c.getAttribute("data-align") || "left", g = [d], y = h !== "left", v = p && p > 0;
    return (y || v) && g.push(y ? h : "left"), v && g.push(String(p)), `![${g.join(" \\| ")}](${l})`;
  }
  function o(c) {
    if (c.nodeType === Node.TEXT_NODE)
      return (c.textContent || "").replace(/\|/g, "\\|");
    if (c.nodeType === Node.ELEMENT_NODE) {
      const l = c;
      if (l.nodeName === "IMG") return r(l);
      if (l.nodeName === "BR") return "";
      let u = "";
      for (const d of Array.from(l.childNodes))
        u += o(d);
      if (l.nodeName === "STRONG" || l.nodeName === "B") return `**${u}**`;
      if (l.nodeName === "EM" || l.nodeName === "I") return `*${u}*`;
      if (l.nodeName === "S" || l.nodeName === "DEL") return `~~${u}~~`;
      if (l.nodeName === "CODE") return `\`${u}\``;
      if (l.nodeName === "MARK") return `==${u}==`;
      if (l.nodeName === "A") {
        const d = l.getAttribute("href") || "";
        return `[${u}](${d})`;
      }
      return u;
    }
    return "";
  }
  function s(c) {
    let l = "";
    for (const u of Array.from(c.childNodes))
      if (u.nodeType === Node.ELEMENT_NODE) {
        const d = u, f = d.nodeName;
        if (f === "UL" || f === "OL" || f === "LABEL" || f === "INPUT") continue;
        l += o(d);
      } else
        l += o(u);
    return l.trim();
  }
  function i(c, l, u = 0) {
    const d = "  ".repeat(u), f = c.nodeName, p = Array.from(c.childNodes).filter(
      (g) => g.nodeType === Node.ELEMENT_NODE && g.nodeName === "LI"
    ), h = f === "OL" ? parseInt(c.getAttribute("start") || "1", 10) : 1;
    p.forEach((g, y) => {
      const v = g.getAttribute("data-type") === "taskItem", b = g.getAttribute("data-checked") === "true", x = s(g);
      v ? l.push(`${d}- [${b ? "x" : " "}] ${x}`) : f === "OL" ? l.push(`${d}${h + y}. ${x}`) : l.push(`${d}- ${x}`);
      const S = Array.from(g.childNodes).filter(
        (w) => w.nodeType === Node.ELEMENT_NODE && (w.nodeName === "UL" || w.nodeName === "OL")
      );
      for (const w of S)
        i(w, l, u + 1);
    });
  }
  function a(c) {
    const l = [];
    for (const u of Array.from(c.childNodes)) {
      if (u.nodeType !== Node.ELEMENT_NODE) {
        const h = (u.textContent || "").trim();
        h && l.push(h.replace(/\|/g, "\\|"));
        continue;
      }
      const d = u, f = d.nodeName;
      if (f === "UL" || f === "OL") {
        i(d, l, 0);
        continue;
      }
      if (f === "FIGURE") {
        const h = d.querySelector("img");
        h && l.push(r(h));
        continue;
      }
      if (f === "IMG") {
        l.push(r(d));
        continue;
      }
      const p = o(d).trim();
      p && l.push(p);
    }
    return l.join(" <br> ") || "";
  }
  return n.addRule("table", {
    filter: "table",
    replacement: function(c, l) {
      const u = l, d = Array.from(u.querySelectorAll("tr"));
      if (d.length === 0) return "";
      const f = [];
      let p = !1;
      d.forEach((g, y) => {
        const v = Array.from(g.querySelectorAll("th, td")), b = v.map((x) => a(x));
        if (y > 0 && v.length > 0 && v[0].nodeName === "TH" && (p = !0), f.push("| " + b.join(" | ") + " |"), y === 0) {
          const x = v.map(() => "---").join(" | ");
          f.push("| " + x + " |");
        }
      });
      const h = p ? `
<!-- header-column -->` : "";
      return `

` + f.join(`
`) + h + `

`;
    }
  }), n.addRule("tableCell", {
    filter: ["th", "td"],
    replacement: function(c) {
      return c;
    }
  }), n.addRule("datePill", {
    filter: (c) => c.nodeName === "SPAN" && c.getAttribute("data-type") === "date-pill",
    replacement: (c, l) => {
      const u = l.getAttribute("data-date");
      return u ? `@${fx(u)}@` : c;
    }
  }), n.addRule("tagPill", {
    filter: (c) => c.nodeName === "SPAN" && c.getAttribute("data-type") === "tag-pill",
    replacement: (c, l) => {
      const u = l.getAttribute("data-tag");
      return u ? `#${u}` : c;
    }
  }), n.addRule("wikiLink", {
    filter: (c) => c.nodeName === "SPAN" && c.hasAttribute("data-wiki-link"),
    replacement: (c, l) => {
      const u = l.getAttribute("data-page-name");
      return u ? `[[${u}]]` : c;
    }
  }), n.addRule("callout", {
    filter: (c) => c.nodeName === "DIV" && c.hasAttribute("data-callout"),
    replacement: (c, l) => {
      const u = l.getAttribute("data-type") || "info", d = c.trim().replace(/\n{3,}/g, `

`);
      return `

\`\`\`ad-${u}
${d}
\`\`\`

`;
    }
  }), n.addRule("listSeparation", {
    filter: (c) => c.nodeName === "UL" || c.nodeName === "OL",
    replacement: (c, l) => {
      const u = l.parentNode;
      if (u && u.nodeName === "LI")
        return `
` + c.trimEnd() + `
`;
      const f = l.previousElementSibling, p = f && (f.nodeName === "UL" || f.nodeName === "OL");
      return `

` + c.trim() + `

`;
    }
  }), pt = n, n;
}
function gk() {
  !oo && !pt && (oo = Gu().then((e) => (pt = e, e)));
}
function yk() {
  return gk(), {
    turndown(e) {
      return pt ? pt.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return pt !== null;
    },
    async ready() {
      pt || (oo ? await oo : await Gu());
    }
  };
}
function vk() {
  const e = V(null);
  return e.current || (e.current = yk()), e.current;
}
const bk = 2e3;
function wk(e) {
  const {
    extensions: t,
    content: n,
    editable: r,
    autofocus: o,
    spellCheck: s,
    initialMode: i,
    performanceMode: a,
    lightweightThreshold: c,
    onChange: l,
    onHTMLChange: u,
    onMarkdownChange: d,
    onReady: f,
    onDestroy: p,
    onFocus: h,
    onBlur: g,
    onSelectionChange: y,
    onLinkClick: v,
    editorModeRef: b,
    rawMarkdownRef: x,
    setRawMarkdown: S,
    setIsLightweight: w,
    lightweightCheckCounterRef: C,
    isLightweightRef: E
  } = e, k = n && n.length > bk, N = V(k ? n : null), M = k ? "" : n, D = V(null), L = V(l), P = V(u), O = V(d), H = V(null);
  L.current = l, P.current = u, O.current = d;
  const $ = Nd({
    /**
     * Performance: Render immediately without waiting for next tick
     */
    immediatelyRender: !1,
    /**
     * Performance: Prevent React re-renders on every ProseMirror transaction.
     * The editor DOM updates are handled by ProseMirror directly.
     * Only toolbar state and other React UI need selective re-renders via useEditorState.
     */
    shouldRerenderOnTransaction: !1,
    // @ts-ignore - Expose editor globally for debugging
    onCreate: ({ editor: A }) => {
      window.__tiptapEditor = A, f?.(A);
    },
    onDestroy: () => {
      p?.();
    },
    extensions: t,
    content: M,
    editable: r,
    autofocus: o,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: s ? "true" : "false"
      },
      handleClick: (A, _, Y) => {
        if (v) {
          const q = Y.target.closest("a");
          if (q) {
            const Z = q.getAttribute("href");
            if (Z && v(Z, Y) === !1)
              return Y.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: A }) => {
      if (a === "auto" && (C.current++, C.current >= 50)) {
        C.current = 0;
        const Y = A.state.doc.content.childCount > c;
        Y !== E.current && w(Y);
      }
      D.current && clearTimeout(D.current), D.current = setTimeout(() => {
        if (A.isDestroyed) return;
        const _ = A.getHTML();
        (L.current || P.current) && (L.current?.(_), P.current?.(_));
      }, 150);
    },
    onFocus: () => {
      h?.();
    },
    onBlur: () => {
      if (D.current && (clearTimeout(D.current), D.current = null, $ && !$.isDestroyed)) {
        const A = $.getHTML();
        if ((L.current || P.current) && (L.current?.(A), P.current?.(A)), b.current === "wysiwyg" && H.current) {
          const _ = H.current.turndown(A);
          x.current = _, O.current?.(to(_));
        }
      }
      g?.();
    },
    onSelectionUpdate: ({ editor: A }) => {
      if (y) {
        const { from: _, to: Y, empty: j } = A.state.selection;
        y({ from: _, to: Y, empty: j });
      }
    }
  });
  G(() => {
    if (!N.current || !$ || $.isDestroyed) return;
    const A = N.current;
    N.current = null;
    const _ = requestAnimationFrame(() => {
      const Y = setTimeout(() => {
        $.isDestroyed || $.commands.setContent(A);
      }, 0);
      $.__deferredTimerId = Y;
    });
    return () => {
      cancelAnimationFrame(_);
      const Y = $.__deferredTimerId;
      Y && clearTimeout(Y);
    };
  }, [$]), G(() => () => {
    if (D.current && (clearTimeout(D.current), D.current = null, $ && !$.isDestroyed)) {
      const A = $.getHTML();
      if ((L.current || P.current) && (L.current?.(A), P.current?.(A)), b.current === "wysiwyg" && H.current) {
        const _ = H.current.turndown(A);
        x.current = _, O.current?.(to(_));
      }
    }
  }, []);
  const K = vk();
  H.current = K;
  const R = V(!1);
  return G(() => {
    if (!R.current && i === "markdown" && $ && !$.isDestroyed && K) {
      const A = $.getHTML(), _ = K.turndown(A);
      S(_), x.current = _, R.current = !0;
    }
  }, [$, K, i]), { editor: $, turndownService: K };
}
function xk(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = (i) => {
    Array.from(i.querySelectorAll("ul")).forEach(o);
    const c = Array.from(i.children).filter((f) => f.tagName === "LI");
    let l = !1, u = !1;
    const d = (f) => {
      const p = f.querySelector(':scope > input[type="checkbox"]');
      if (p) return p;
      const h = f.querySelector(":scope > p");
      if (h) {
        const g = h.querySelector(':scope > input[type="checkbox"]');
        if (g) return g;
      }
      return null;
    };
    c.forEach((f) => {
      d(f) ? l = !0 : u = !0;
    }), l && (c.forEach((f) => {
      const p = d(f);
      if (p) {
        const h = p.hasAttribute("checked");
        f.setAttribute("data-type", "taskItem"), f.setAttribute("data-checked", String(h));
        const g = p.parentElement, y = g && g.tagName === "P" && g.parentElement === f;
        p.remove(), y && g.firstChild && g.firstChild.nodeType === Node.TEXT_NODE && (g.firstChild.textContent = (g.firstChild.textContent || "").replace(/^\s+/, ""));
        const v = Array.from(f.childNodes), b = [], x = [];
        v.forEach((w) => {
          if (w.nodeType === Node.ELEMENT_NODE) {
            const C = w;
            if (C.tagName === "UL" || C.tagName === "OL" || C.tagName === "P")
              x.push(w);
            else if (C.tagName === "IMG" || C.tagName === "FIGURE")
              if (C.tagName === "IMG") {
                const E = n.createElement("figure");
                E.className = "image-resizer";
                const k = C.getAttribute("data-align") || "left", N = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[k] || "margin-right: auto;";
                E.style.cssText = N, E.appendChild(C.cloneNode(!0)), x.push(E);
              } else
                x.push(w);
            else
              b.push(w);
          } else
            b.push(w);
        });
        const S = x.filter((w) => {
          if (w.nodeType === Node.ELEMENT_NODE) {
            const C = w;
            if (C.tagName === "P" && !C.textContent?.trim() && !C.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", b.length > 0) {
          const w = n.createElement("p");
          b.forEach((C) => w.appendChild(C)), w.firstChild && w.firstChild.nodeType === Node.TEXT_NODE && (w.firstChild.textContent = (w.firstChild.textContent || "").replace(/^\s+/, "")), (w.textContent?.trim() || w.querySelector("img, figure, code, br")) && f.appendChild(w);
        }
        S.forEach((w) => f.appendChild(w));
      }
    }), l && !u && i.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
function kk(e) {
  const t = e.split(`
`), n = [], r = (c) => {
    const l = c.trimStart();
    return /^[-*+]\s+\[[ xX]\]\s/.test(l) ? "task" : /^[-*+]\s+/.test(l) ? "bullet" : /^\d+\.\s+/.test(l) ? "ordered" : null;
  }, o = (c) => {
    const l = c.match(/^( *)/);
    return l ? l[1].length : 0;
  }, s = (c) => /^\s{2,}\S/.test(c), i = (c) => c.trim() === "" || c.trim() === "​";
  let a = !1;
  for (let c = 0; c < t.length; c++) {
    const l = t[c];
    if (/^```/.test(l.trim())) {
      a = !a, n.push(l);
      continue;
    }
    if (a) {
      n.push(l);
      continue;
    }
    if (n.push(l), r(l) !== null || s(l)) {
      let u = c + 1;
      for (; u < t.length && s(t[u]); )
        u++;
      let d = 0;
      const f = u;
      for (; u < t.length && i(t[u]); )
        d++, u++;
      if (d > 0 && u < t.length) {
        const p = r(l), h = r(t[u]);
        if (p !== null && h !== null) {
          const g = o(l);
          if (o(t[u]) > g) {
            for (let v = f; v < u; v++)
              n.push(t[v]);
            c = u - 1;
            continue;
          }
          for (let v = f; v < u; v++)
            n.push(t[v]);
          n.push("<!-- list-break -->"), c = u - 1;
          continue;
        }
      }
    }
  }
  return n.join(`
`);
}
function Ck(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = Array.from(r.querySelectorAll("li"));
  for (const s of o) {
    if (s.getAttribute("data-type") === "taskItem" || !s.querySelector(":scope > img, :scope > p > img, :scope > figure")) continue;
    const a = Array.from(s.childNodes), c = [], l = [];
    if (a.forEach((u) => {
      if (u.nodeType === Node.ELEMENT_NODE) {
        const d = u, f = d.tagName;
        if (f === "UL" || f === "OL")
          l.push(u);
        else if (f === "FIGURE")
          l.push(u);
        else if (f === "IMG") {
          const p = n.createElement("figure");
          p.className = "image-resizer";
          const h = d.getAttribute("data-align") || "left", g = {
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          };
          p.style.cssText = g[h] || "margin-right: auto;", p.appendChild(d.cloneNode(!0)), l.push(p);
        } else if (f === "P")
          if (d.querySelectorAll("img").length === 0)
            l.push(u);
          else {
            const h = Array.from(d.childNodes), g = [];
            if (h.forEach((y) => {
              if (y.nodeType === Node.ELEMENT_NODE && y.tagName === "IMG") {
                if (g.length > 0) {
                  const w = n.createElement("p");
                  g.forEach((C) => w.appendChild(C.cloneNode(!0))), w.textContent?.trim() && l.push(w), g.length = 0;
                }
                const v = y, b = n.createElement("figure");
                b.className = "image-resizer";
                const x = v.getAttribute("data-align") || "left", S = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                b.style.cssText = S[x] || "margin-right: auto;", b.appendChild(v.cloneNode(!0)), l.push(b);
              } else
                g.push(y);
            }), g.length > 0) {
              const y = n.createElement("p");
              g.forEach((v) => y.appendChild(v.cloneNode(!0))), y.textContent?.trim() && l.push(y);
            }
          }
        else
          c.push(u);
      } else
        c.push(u);
    }), s.innerHTML = "", c.length > 0 && c.some((d) => (d.textContent || "").trim().length > 0)) {
      const d = n.createElement("p");
      c.forEach((f) => d.appendChild(f)), s.appendChild(d);
    }
    l.forEach((u) => s.appendChild(u));
  }
  return r.innerHTML;
}
function Mk(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (r) => r.replace(/<tr>([\s\S]*?)<\/tr>/gi, (o, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function so(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Tk(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function Vi(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((r) => r.trim()).map((r) => /^<img\s/i.test(r) ? Tk(r) : r.trim() ? `<p>${so(r.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${so(e)}</p>`;
}
function Sk(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^(\d+)\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[2].trim(), index: parseInt(a[1], 10) } : null;
}
function Ek(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", u = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, d = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += u; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${so(f.text)}</p>` : i += `<li><p>${so(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
          const p = t(a + 1, e[a + 1].depth);
          i += p.html, a = p.nextIdx;
        } else
          a++;
        i += "</li>";
      } else
        a++;
    }
    return i += d, { html: i, nextIdx: a };
  }, n = Math.min(...e.map((o) => o.depth));
  return t(0, n).html;
}
function Dk(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, r, o) => {
      const s = /<img\s/i.test(r), i = /<br\s*\/?>/i.test(r), a = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(r);
      if (!s && !i && !a) return t;
      let c = r.trim();
      c = c.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const l = c.split(/<br\s*\/?>/i).filter((p) => p.trim());
      if (l.length <= 1 && !a)
        return s ? `${n}${Vi(c)}${o}` : t;
      const u = [];
      let d = [];
      const f = () => {
        d.length !== 0 && (u.push(Ek(d)), d = []);
      };
      for (const p of l) {
        const h = Sk(p);
        if (h) {
          if (d.length > 0) {
            const g = d[0].type;
            h.depth === 0 && h.type !== g && f();
          }
          d.push(h);
        } else
          f(), u.push(Vi(p.trim()));
      }
      return f(), `${n}${u.join("")}${o}`;
    }
  );
}
function Nk(e, t, n = {}) {
  const {
    enableTagAutoDetect: r = !1,
    disableTagPills: o = !1,
    isValidTag: s,
    normalizeTag: i,
    parseDateFromMarkdown: a,
    getDateVariant: c
  } = n;
  let l = e;
  l = kk(l);
  const u = /* @__PURE__ */ new Set(["info", "note", "prompt", "resources", "todo", "summary"]), d = l.split(`
`), f = [];
  let p = null, h = [];
  for (let y = 0; y < d.length; y++) {
    const v = d[y];
    if (p !== null)
      if (v.trimEnd() === "```") {
        const b = h.join(`
`).trim(), x = b ? t(b) : "";
        f.push(`<div data-callout="" data-type="${p}" class="callout callout-${p}">${x}</div>`), p = null, h = [];
      } else
        h.push(v);
    else {
      const b = v.match(/^```(?:ad-)?(\w+)\s*$/);
      b && u.has(b[1]) ? (p = b[1], h = []) : f.push(v);
    }
  }
  return p !== null && (f.push(`\`\`\`ad-${p}`), f.push(...h)), l = f.join(`
`), l = l.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (y, v, b) => {
    const x = v.split("|").map((N) => N.trim());
    let S = "", w = "left", C = null;
    x.length === 1 ? S = x[0] : x.length === 2 ? (S = x[0], /^\d+$/.test(x[1]) ? C = x[1] : ["left", "center", "right"].includes(x[1]) ? w = x[1] : S = v) : x.length === 3 ? (S = x[0], ["left", "center", "right"].includes(x[1]) && (w = x[1]), /^\d+$/.test(x[2]) && (C = x[2])) : S = v;
    const E = C ? ` width="${C}" style="width: ${C}px"` : "", k = ` data-align="${w}"`;
    return `<img src="${b.trim()}" alt="${S}"${k}${E} />`;
  }), l = l.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), a && c && (l = l.replace(/@([^@\n]+)@/g, (y, v) => {
    const b = a(v);
    if (b) {
      const x = c(b);
      return `<span data-type="date-pill" data-date="${b}" class="date-pill ${x}"><span class="date-icon">📅</span><span class="date-text">${v.trim()}</span></span>`;
    }
    return y;
  })), r && !o && s && i && (l = l.replace(
    new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"),
    (y, v) => {
      const b = i(v);
      return s(b) ? `<span data-type="tag-pill" data-tag="${b}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${b}</span></span>` : y;
    }
  )), l = l.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((y, v) => v % 2 === 1 ? y : y.replace(/\[\[([^\[\]]+)\]\]/g, (b, x) => `<span data-wiki-link data-page-name="${x.trim()}" class="wiki-link">${x.trim()}</span>`)).join(""), l;
}
function Ak(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = xk(t), t = Ck(t), t = Mk(t), t = Dk(t), t = t.replace(
    /(<pre[^>]*>\s*<code[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/g,
    (n, r, o, s) => r + o.replace(/\n+$/, "") + s
  ), t;
}
function Lk(e, t, n = {}) {
  const r = Nk(e, t, n), o = t(r);
  return Ak(o);
}
function Ik(e, t, n) {
  G(() => {
    if (!e || e.isDestroyed) return;
    const r = (o) => {
      if (e.isDestroyed) return;
      const s = o.key;
      if (!(!(o.metaKey || o.ctrlKey) && s !== " ")) {
        if ((o.metaKey || o.ctrlKey) && o.key === "k") {
          o.preventDefault(), n.openLinkPopover();
          return;
        }
        if (!t && (o.metaKey || o.ctrlKey) && o.key === "f") {
          o.preventDefault();
          const { state: a } = e, { from: c, to: l } = a.selection;
          if (c !== l) {
            const u = a.doc.textBetween(c, l, " ");
            if (u.trim()) {
              n.openFindReplace(u.trim());
              return;
            }
          }
          n.openFindReplace();
          return;
        }
        if (!t && (o.metaKey || o.ctrlKey) && o.key === "h") {
          o.preventDefault(), n.openFindReplaceWithReplace();
          return;
        }
        if (o.key === " ")
          try {
            const { state: a } = e, { selection: c } = a, { $from: l } = c, u = l.nodeBefore?.textContent || "";
            if (u === "#####") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 5, to: l.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (u === "####") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 4, to: l.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (u === "###") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 3, to: l.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (u === "##") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 2, to: l.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (u === "#") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (u === "-" || u === "*") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(u)) {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - u.length, to: l.pos }).toggleOrderedList().run();
              return;
            }
            const d = /^(-\s*)?\[([ x])?\]$/.exec(u);
            if (d) {
              o.preventDefault();
              const f = d[2] === "x", p = a.schema.nodes.taskList, h = a.schema.nodes.taskItem;
              if (p && h) {
                const g = a.tr, y = l.pos - u.length, v = l.pos;
                g.delete(y, v);
                const x = g.doc.resolve(y).blockRange();
                if (x) {
                  const S = [
                    { type: p, attrs: {} },
                    { type: h, attrs: { checked: f } }
                  ];
                  g.wrap(x, S), e.view.dispatch(g);
                  return;
                }
              }
              e.chain().focus().deleteRange({ from: l.pos - u.length, to: l.pos }).toggleTaskList().run();
              return;
            }
            if (u === ">") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).toggleBlockquote().run();
              return;
            }
            if (u === "```") {
              o.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 3, to: l.pos }).toggleCodeBlock().run();
              return;
            }
            if (u === "---" || u === "***") {
              o.preventDefault(), jr(e, l.pos - 3, l.pos);
              return;
            }
            if (u === "—-") {
              o.preventDefault(), jr(e, l.pos - 2, l.pos);
              return;
            }
            if (u === "—") {
              o.preventDefault(), jr(e, l.pos - 1, l.pos);
              return;
            }
          } catch (a) {
            console.warn("Space shortcut error:", a);
          }
      }
    };
    return document.addEventListener("keydown", r, !0), () => document.removeEventListener("keydown", r, !0);
  }, [e, t, n]);
}
function Rk({
  editorModeRef: e,
  rawMarkdownRef: t,
  editorMode: n,
  handleModeSwitch: r,
  setIsFindReplaceOpen: o,
  setFindReplaceFocusTrigger: s
}) {
  G(() => {
    const i = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => e.current,
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (a) => {
        if (a !== "wysiwyg" && a !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        r(a);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const a = e.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return r(a), a;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        r("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        r("markdown");
      },
      /**
       * Check if currently in visual mode
       * @returns {boolean}
       */
      isVisualMode: () => e.current === "wysiwyg",
      /**
       * Check if currently in markdown mode
       * @returns {boolean}
       */
      isMarkdownMode: () => e.current === "markdown",
      /**
       * Get the raw markdown content (only available in markdown mode)
       * @returns {string | null} The raw markdown or null if in visual mode
       */
      getRawMarkdown: () => e.current === "markdown" ? t.current : null,
      /**
       * Subscribe to mode changes
       * @param callback Function to call when mode changes
       * @returns Function to unsubscribe
       */
      onModeChange: (a) => {
        const c = (l) => {
          a(l.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", c), () => window.removeEventListener("paragon-editor-mode-change", c);
      }
    };
    return window.__paragonEditorModeAPI = i, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [r]), G(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: n } }));
  }, [n]);
}
function Pk({
  editor: e,
  turndownService: t,
  editorModeRef: n,
  rawMarkdownRef: r,
  setEditorMode: o,
  setRawMarkdown: s,
  onModeChange: i,
  enableTagAutoDetect: a,
  disabledFeatures: c
}) {
  return B(async (u) => {
    if (e) {
      if (u === "markdown" && n.current === "wysiwyg") {
        const d = e.getHTML(), f = t.turndown(d);
        s(f), r.current = f;
      } else if (u === "wysiwyg" && n.current === "markdown") {
        const { marked: d } = await import("./marked.esm-Tjr8Gfse.js"), f = (g) => d.parse(g, { async: !1, breaks: !0 }), p = {
          enableTagAutoDetect: a,
          disableTagPills: !!c.tagPills,
          isValidTag: un,
          normalizeTag: Un,
          parseDateFromMarkdown: zt,
          getDateVariant: Ma
        }, h = Lk(r.current, f, p);
        queueMicrotask(() => {
          e.isDestroyed || e.commands.setContent(h);
        });
      }
      o(u), n.current = u, i?.(u);
    }
  }, [e, t, i]);
}
const Ok = 200;
function _k(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: r = !1,
    enabled: o = !0
  } = t, [s, i] = U({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), a = V(null), c = V(""), l = B((u) => {
    const d = u.trim(), f = d.length > 0 ? d.split(/\s+/).filter((b) => b.length > 0).length : 0, p = d.replace(/\s/g, "").length, h = u.length;
    let g = 0, y = 0;
    r && (g = d.length > 0 ? d.split(/\n\s*\n/).filter((b) => b.trim().length > 0).length : 0, y = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const v = Math.max(1, Math.ceil(f / Ok));
    return {
      words: f,
      characters: p,
      charactersWithSpaces: h,
      paragraphs: g,
      sentences: y,
      readingTime: v,
      isCalculating: !1
    };
  }, [r]);
  return G(() => {
    if (!e || !o) return;
    const u = () => {
      a.current && clearTimeout(a.current), i((d) => ({ ...d, isCalculating: !0 })), a.current = setTimeout(() => {
        try {
          const d = e.getText();
          if (d === c.current) {
            i((p) => ({ ...p, isCalculating: !1 }));
            return;
          }
          c.current = d;
          const f = l(d);
          i(f);
        } catch (d) {
          console.warn("useWordCount: Error calculating word count", d), i((f) => ({ ...f, isCalculating: !1 }));
        }
      }, n);
    };
    return u(), e.on("update", u), () => {
      e.off("update", u), a.current && clearTimeout(a.current);
    };
  }, [e, n, o, l]), s;
}
function $k({ status: e, lastSaved: t, className: n = "" }) {
  const r = (o) => {
    if (!o) return "";
    const i = (/* @__PURE__ */ new Date()).getTime() - o.getTime(), a = Math.floor(i / 1e3), c = Math.floor(a / 60), l = Math.floor(c / 60);
    return a < 10 ? "Just now" : a < 60 ? `${a}s ago` : c < 60 ? `${c}m ago` : l < 24 ? `${l}h ago` : o.toLocaleDateString();
  };
  return /* @__PURE__ */ I(
    "div",
    {
      className: `auto-save-indicator flex items-center gap-1.5 text-xs ${n}`,
      title: t ? `Last saved: ${t.toLocaleString()}` : "Not saved yet",
      children: [
        e === "idle" && t && /* @__PURE__ */ I(be, { children: [
          /* @__PURE__ */ m(Jd, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ I("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ I(be, { children: [
          /* @__PURE__ */ m(mc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ m("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ I(be, { children: [
          /* @__PURE__ */ m(Gt, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ m("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ I(be, { children: [
          /* @__PURE__ */ m(ef, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ m("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function Hk({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ I(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ I("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ m(tf, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ m("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ I("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ I(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ m(Gs, { className: "w-4 h-4" }),
                "Recover"
              ]
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: t,
              className: "recovery-banner-dismiss p-2 rounded-md transition-colors duration-150",
              title: "Dismiss",
              "aria-label": "Dismiss recovery banner",
              children: /* @__PURE__ */ m(ht, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
function Hr(e) {
  const t = [], n = e.split(`
`);
  let r = 0, o = !1, s = "";
  for (let i = 0; i < n.length; i++) {
    const a = n[i], c = r;
    if (a.startsWith("```")) {
      o ? (o = !1, t.push({
        type: "code-block",
        content: a,
        start: c,
        end: c + a.length
      })) : (o = !0, s = a.slice(3).trim(), t.push({
        type: "code-block",
        content: "```",
        start: c,
        end: c + 3
      }), s && t.push({
        type: "code-block-lang",
        content: s,
        start: c + 3,
        end: c + 3 + s.length
      })), r += a.length + 1;
      continue;
    }
    if (o) {
      t.push({
        type: "code-block",
        content: a,
        start: c,
        end: c + a.length
      }), r += a.length + 1;
      continue;
    }
    const l = a.match(/^(#{1,6})\s+(.*)$/);
    if (l) {
      const b = l[1].length;
      t.push({
        type: `heading${b}`,
        content: a,
        start: c,
        end: c + a.length
      }), r += a.length + 1;
      continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(a.trim())) {
      t.push({
        type: "horizontal-rule",
        content: a,
        start: c,
        end: c + a.length
      }), r += a.length + 1;
      continue;
    }
    if (a.startsWith(">")) {
      t.push({
        type: "blockquote",
        content: a,
        start: c,
        end: c + a.length
      }), r += a.length + 1;
      continue;
    }
    if (/^\|?[\s-:|]+\|?$/.test(a) && a.includes("-")) {
      t.push({
        type: "table-separator",
        content: a,
        start: c,
        end: c + a.length
      }), r += a.length + 1;
      continue;
    }
    if (a.includes("|") && (a.startsWith("|") || a.trim().includes(" | "))) {
      t.push({
        type: "table-cell",
        content: a,
        start: c,
        end: c + a.length
      }), r += a.length + 1;
      continue;
    }
    const u = a.match(/^(\s*[-*+]\s+)\[([xX ])\]\s+(.*)$/);
    if (u) {
      const b = u[2].toLowerCase() === "x";
      t.push({
        type: b ? "task-checked" : "task-list",
        content: a,
        start: c,
        end: c + a.length
      }), r += a.length + 1;
      continue;
    }
    if (a.match(/^(\s*[-*+])\s+(.*)$/)) {
      t.push({
        type: "list-bullet",
        content: a,
        start: c,
        end: c + a.length
      }), r += a.length + 1;
      continue;
    }
    if (a.match(/^(\s*\d+\.)\s+(.*)$/)) {
      t.push({
        type: "list-number",
        content: a,
        start: c,
        end: c + a.length
      }), r += a.length + 1;
      continue;
    }
    let p = 0;
    const h = [
      // Date pills (@Mon DD, YYYY@)
      { regex: /@[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4}@/g, type: "date-pill" },
      // Bold italic (must come before bold and italic)
      { regex: /\*\*\*(.+?)\*\*\*|___(.+?)___/g, type: "bold-italic" },
      // Bold
      { regex: /\*\*(.+?)\*\*|__(.+?)__/g, type: "bold" },
      // Italic
      { regex: /\*(.+?)\*|_(.+?)_/g, type: "italic" },
      // Strikethrough
      { regex: /~~(.+?)~~/g, type: "strikethrough" },
      // Inline code
      { regex: /`([^`]+)`/g, type: "code-inline" },
      // Images (must come before links)
      { regex: /!\[([^\]]*)\]\(([^)]+)\)/g, type: "image" },
      // Links
      { regex: /\[([^\]]+)\]\(([^)]+)\)/g, type: "link" }
    ], g = [];
    for (const b of h) {
      let x;
      for (b.regex.lastIndex = 0; (x = b.regex.exec(a)) !== null; )
        g.push({
          start: c + x.index,
          end: c + x.index + x[0].length,
          type: b.type,
          content: x[0]
        });
    }
    g.sort((b, x) => b.start - x.start);
    const y = [];
    let v = c;
    for (const b of g)
      b.start >= v && (y.push(b), v = b.end);
    for (const b of y)
      b.start > c + p && t.push({
        type: "text",
        content: a.substring(p, b.start - c),
        start: c + p,
        end: b.start
      }), t.push({
        type: b.type,
        content: b.content,
        start: b.start,
        end: b.end
      }), p = b.end - c;
    p < a.length && t.push({
      type: "text",
      content: a.substring(p),
      start: c + p,
      end: c + a.length
    }), r += a.length + 1;
  }
  return t;
}
function Ki(e) {
  return {
    heading1: "md-heading md-h1",
    heading2: "md-heading md-h2",
    heading3: "md-heading md-h3",
    heading4: "md-heading md-h4",
    heading5: "md-heading md-h5",
    heading6: "md-heading md-h6",
    bold: "md-bold",
    italic: "md-italic",
    "bold-italic": "md-bold-italic",
    strikethrough: "md-strikethrough",
    "code-inline": "md-code-inline",
    "code-block": "md-code-block",
    "code-block-lang": "md-code-lang",
    link: "md-link",
    "link-text": "md-link-text",
    "link-url": "md-link-url",
    image: "md-image",
    "list-bullet": "md-list-bullet",
    "list-number": "md-list-number",
    "task-list": "md-task",
    "task-checked": "md-task-checked",
    blockquote: "md-blockquote",
    "horizontal-rule": "md-hr",
    "table-header": "md-table-header",
    "table-separator": "md-table-separator",
    "table-cell": "md-table-cell",
    "date-pill": "md-date-pill",
    text: "md-text"
  }[e] || "md-text";
}
function Ut(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function Wr(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return Ut(e);
  let o = "";
  const s = e.split(`
`);
  let i = 0;
  if (!n || n.length === 0) {
    for (let c = 0; c < s.length; c++) {
      const l = s[c], u = i + l.length, d = t.filter((p) => p.start >= i && p.start < u);
      let f = i;
      for (const p of d)
        p.start > f && (o += Ut(e.substring(f, p.start))), o += `<span class="${Ki(p.type)}">${Ut(p.content)}</span>`, f = p.end;
      f < u && (o += Ut(e.substring(f, u))), c < s.length - 1 && (o += `
`), i = u + 1;
    }
    return o;
  }
  const a = /* @__PURE__ */ new Map();
  n.forEach((c, l) => {
    for (let u = c.from; u < c.to; u++)
      a.set(u, { matchIdx: l, isCurrent: l === r });
  }), i = 0;
  for (let c = 0; c < s.length; c++) {
    const l = s[c], u = i + l.length, d = t.filter((p) => p.start >= i && p.start < u);
    let f = i;
    for (const p of d)
      p.start > f && (o += cs(e, f, p.start, null, a)), o += cs(e, p.start, p.end, Ki(p.type), a), f = p.end;
    f < u && (o += cs(e, f, u, null, a)), c < s.length - 1 && (o += `
`), i = u + 1;
  }
  return o;
}
function cs(e, t, n, r, o) {
  let s = "", i = t;
  for (; i < n; ) {
    const a = o.get(i);
    if (a) {
      const c = i;
      for (; i < n && o.get(i)?.matchIdx === a.matchIdx; )
        i++;
      const l = Ut(e.substring(c, i)), u = a.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${u}">${l}</mark></span>` : s += `<mark class="${u}">${l}</mark>`;
    } else {
      const c = i;
      for (; i < n && !o.has(i); )
        i++;
      const l = Ut(e.substring(c, i));
      r ? s += `<span class="${r}">${l}</span>` : s += l;
    }
  }
  return s;
}
function Wk({
  content: e,
  onChange: t,
  placeholder: n = "Write your markdown here...",
  editable: r = !0,
  autofocus: o = !1,
  className: s = "",
  searchMatches: i,
  currentMatchIndex: a,
  autoClosePairs: c = !0
}) {
  const l = V(null), u = V(null), d = V(null), f = V(null), p = 5e3, h = 80, [g, y] = U(() => {
    const k = Hr(e);
    return Wr(e, k, i, a);
  }), v = V(null), b = Yt(() => {
    if (e.length <= p) {
      const k = Hr(e), N = Wr(e, k, i, a);
      return v.current && (clearTimeout(v.current), v.current = null), N;
    }
    return null;
  }, [e, i, a]);
  G(() => {
    if (e.length <= p) {
      const k = Hr(e);
      y(Wr(e, k, i, a));
      return;
    }
    return v.current && clearTimeout(v.current), v.current = setTimeout(() => {
      const k = Hr(e);
      y(Wr(e, k, i, a)), v.current = null;
    }, h), () => {
      v.current && clearTimeout(v.current);
    };
  }, [e, i, a]);
  const x = b ?? g, S = B(() => {
    const k = l.current, N = u.current, M = d.current;
    if (k) {
      const D = M?.parentElement, L = D ? D.clientHeight : 200;
      k.style.height = "auto";
      const P = Math.max(k.scrollHeight, L, 200);
      k.style.height = `${P}px`, N && (N.style.height = `${P}px`);
    }
  }, []);
  G(() => {
    const k = l.current;
    if (!k) return;
    const N = (M) => {
      const D = k.closest(".editor-content-wrapper");
      if (!D) return;
      const { scrollTop: L, scrollHeight: P, clientHeight: O } = D, H = L <= 0, $ = L + O >= P - 1;
      (M.deltaY > 0 && !$ || M.deltaY < 0 && !H) && (M.preventDefault(), D.scrollTop += M.deltaY);
    };
    return k.addEventListener("wheel", N, { passive: !1 }), () => k.removeEventListener("wheel", N);
  }, []);
  const w = B(() => {
  }, []);
  G(() => {
    S();
  }, [e, S]), G(() => {
    o && l.current && l.current.focus();
  }, [o]), G(() => {
    if (f.current && l.current) {
      const { start: k, end: N } = f.current;
      l.current.selectionStart = k, l.current.selectionEnd = N, f.current = null;
    }
  }, [e]);
  const C = B((k) => {
    const N = k.target;
    f.current = {
      start: N.selectionStart,
      end: N.selectionEnd
    }, t(N.value);
  }, [t]), E = B((k) => {
    const N = k.currentTarget, M = N.selectionStart, D = N.selectionEnd, L = N.value, P = M !== D;
    if (c) {
      if (k.key === "`" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), P) {
          const O = L.substring(M, D), H = L.substring(0, M) + "`" + O + "`" + L.substring(D);
          f.current = { start: M + 1, end: D + 1 }, t(H);
        } else if (L[M] === "`")
          f.current = { start: M + 1, end: M + 1 }, t(L), N.selectionStart = N.selectionEnd = M + 1;
        else {
          const O = L.substring(0, M) + "``" + L.substring(D);
          f.current = { start: M + 1, end: M + 1 }, t(O);
        }
        return;
      }
      if (k.key === "*" && !k.ctrlKey && !k.metaKey) {
        if (L[M - 1] === "*" && L[M], P) {
          k.preventDefault();
          const $ = L.substring(M, D), K = L.substring(0, M) + "*" + $ + "*" + L.substring(D);
          f.current = { start: M + 1, end: D + 1 }, t(K);
          return;
        }
        if (L[M] === "*") {
          k.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(L.substring(0, M) + L.substring(M));
          return;
        }
        k.preventDefault();
        const H = L.substring(0, M) + "**" + L.substring(D);
        f.current = { start: M + 1, end: M + 1 }, t(H);
        return;
      }
      if (k.key === "_" && !k.ctrlKey && !k.metaKey) {
        if (P) {
          k.preventDefault();
          const H = L.substring(M, D), $ = L.substring(0, M) + "_" + H + "_" + L.substring(D);
          f.current = { start: M + 1, end: D + 1 }, t($);
          return;
        }
        if (L[M] === "_") {
          k.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(L.substring(0, M) + L.substring(M));
          return;
        }
        k.preventDefault();
        const O = L.substring(0, M) + "__" + L.substring(D);
        f.current = { start: M + 1, end: M + 1 }, t(O);
        return;
      }
      if (k.key === "~" && !k.ctrlKey && !k.metaKey) {
        if (P) {
          k.preventDefault();
          const H = L.substring(M, D), $ = L.substring(0, M) + "~" + H + "~" + L.substring(D);
          f.current = { start: M + 1, end: D + 1 }, t($);
          return;
        }
        if (L[M] === "~") {
          k.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(L.substring(0, M) + L.substring(M));
          return;
        }
        k.preventDefault();
        const O = L.substring(0, M) + "~~" + L.substring(D);
        f.current = { start: M + 1, end: M + 1 }, t(O);
        return;
      }
      if (k.key === "[" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), P) {
          const O = L.substring(M, D), H = L.substring(0, M) + "[" + O + "]()" + L.substring(D);
          f.current = { start: D + 3, end: D + 3 }, t(H);
        } else {
          const O = L.substring(0, M) + "[]()" + L.substring(D);
          f.current = { start: M + 1, end: M + 1 }, t(O);
        }
        return;
      }
      if (k.key === "]" && !k.ctrlKey && !k.metaKey && L[M] === "]") {
        k.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(L.substring(0, M) + L.substring(M));
        return;
      }
      if (k.key === ")" && !k.ctrlKey && !k.metaKey && L[M] === ")") {
        k.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(L.substring(0, M) + L.substring(M));
        return;
      }
      if (k.key === "Backspace" && !P && M > 0) {
        const O = L[M - 1], H = L[M], $ = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [K, R] of $)
          if (O === K && H === R) {
            k.preventDefault();
            const A = L.substring(0, M - 1) + L.substring(M + 1);
            f.current = { start: M - 1, end: M - 1 }, t(A);
            return;
          }
        if (O === "[" && L.substring(M, M + 3) === "]()") {
          k.preventDefault();
          const K = L.substring(0, M - 1) + L.substring(M + 3);
          f.current = { start: M - 1, end: M - 1 }, t(K);
          return;
        }
      }
    }
    if (k.key === "Tab")
      if (k.preventDefault(), k.shiftKey) {
        const O = L.substring(0, M), H = L.substring(M, D), $ = L.substring(D), R = O.lastIndexOf(`
`) + 1, A = O.substring(0, R), _ = O.substring(R), Y = (_ + H).split(`
`), j = Y.map((W) => W.startsWith("  ") ? W.substring(2) : W.startsWith("	") ? W.substring(1) : W), q = A + j.join(`
`) + $, Z = (_ + H).length - j.join(`
`).length;
        f.current = {
          start: Math.max(R, M - (Y[0].length - j[0].length)),
          end: D - Z
        }, t(q);
      } else if (M === D) {
        const O = L.substring(0, M) + "  " + L.substring(D);
        f.current = { start: M + 2, end: M + 2 }, t(O);
      } else {
        const O = L.substring(0, M), H = L.substring(M, D), $ = L.substring(D), R = O.lastIndexOf(`
`) + 1, A = O.substring(0, R), Y = (O.substring(R) + H).split(`
`), j = Y.map((Z) => "  " + Z), q = A + j.join(`
`) + $;
        f.current = {
          start: M + 2,
          end: D + Y.length * 2
        }, t(q);
      }
  }, [t, c]);
  return /* @__PURE__ */ I("div", { ref: d, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: u,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: x || `<span class="md-placeholder">${Ut(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ m(
      "textarea",
      {
        ref: l,
        value: e,
        onChange: C,
        onKeyDown: E,
        onScroll: w,
        placeholder: "",
        disabled: !r,
        className: "syntax-textarea",
        spellCheck: !1
      }
    )
  ] });
}
let Gi = 0, Is = 0, qu = 0;
function zk(e) {
  Is++, qu = e;
}
const Bk = Vt(function({
  visible: t,
  onClose: n,
  editor: r
}) {
  const [o, s] = U(!1), [i, a] = U({
    fps: 0,
    frameTime: 0,
    frameTimeMax: 0,
    memoryUsed: 0,
    memoryTotal: 0,
    renderCount: 0,
    transactionCount: 0,
    lastTransactionTime: 0,
    domNodes: 0,
    longFrames: 0
  }), c = V([]), l = V(performance.now()), u = V(0), d = V(0), f = V(0), p = V(0), [h, g] = U(new Array(60).fill(0)), [y, v] = U(new Array(60).fill(0));
  G(() => {
    if (!t || !r) return;
    const E = () => {
      const k = performance.now();
      queueMicrotask(() => {
        const N = performance.now() - k;
        zk(N);
      });
    };
    return r.on("transaction", E), () => {
      r.off("transaction", E);
    };
  }, [t, r]), G(() => {
    if (!t) return;
    let E = 0, k = performance.now(), N = 0;
    const M = (D) => {
      const L = D - l.current;
      if (l.current = D, c.current.push({ time: D, duration: L }), c.current.length > 120 && (c.current = c.current.slice(-120)), L > 16.67 && d.current++, E++, D - k >= 1e3) {
        N = E, E = 0, k = D;
        const P = c.current.slice(-60), O = P.length > 0 ? P.reduce((j, q) => j + q.duration, 0) / P.length : 0, H = P.length > 0 ? Math.max(...P.map((j) => j.duration)) : 0, $ = performance.memory, K = $ ? $.usedJSHeapSize / (1024 * 1024) : 0, R = $ ? $.jsHeapSizeLimit / (1024 * 1024) : 0, A = document.querySelectorAll("*").length, _ = Gi - f.current, Y = Is - p.current;
        f.current = Gi, p.current = Is, a({
          fps: N,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round(H * 100) / 100,
          memoryUsed: Math.round(K * 10) / 10,
          memoryTotal: Math.round(R),
          renderCount: _,
          transactionCount: Y,
          lastTransactionTime: Math.round(qu * 100) / 100,
          domNodes: A,
          longFrames: d.current
        }), g((j) => [...j.slice(1), N]), v((j) => [...j.slice(1), O]), d.current = 0;
      }
      u.current = requestAnimationFrame(M);
    };
    return u.current = requestAnimationFrame(M), () => {
      cancelAnimationFrame(u.current);
    };
  }, [t]);
  const b = B(() => {
    n?.();
  }, [n]), x = B(() => {
    s((E) => !E);
  }, []);
  if (!t) return null;
  const S = (E) => E >= 55 ? "#4ade80" : E >= 30 ? "#fbbf24" : "#f87171", w = (E) => E <= 16.67 ? "#4ade80" : E <= 33.33 ? "#fbbf24" : "#f87171", C = (E, k, N) => {
    const L = E.map((P, O) => {
      const H = O / (E.length - 1) * 120, $ = 24 - Math.min(P, k) / k * 24;
      return `${H},${$}`;
    }).join(" ");
    return /* @__PURE__ */ m("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ m(
      "polyline",
      {
        points: L,
        fill: "none",
        stroke: N,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }
    ) });
  };
  return /* @__PURE__ */ I("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ I("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ I("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ m(nf, { size: 14 }),
        /* @__PURE__ */ m("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ I("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ m("button", { onClick: x, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ m(pc, { size: 12 }) : /* @__PURE__ */ m(hc, { size: 12 }) }),
        /* @__PURE__ */ m("button", { onClick: b, title: "Close profiler", children: /* @__PURE__ */ m(ht, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ I("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ I("div", { className: "perf-section", children: [
        /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: S(i.fps) }, children: i.fps })
        ] }),
        C(h, 70, S(i.fps))
      ] }),
      /* @__PURE__ */ I("div", { className: "perf-section", children: [
        /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ I("span", { className: "perf-value", style: { color: w(i.frameTime) }, children: [
            i.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ I("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Max" }),
          /* @__PURE__ */ I("span", { className: "perf-value-sub", style: { color: w(i.frameTimeMax) }, children: [
            i.frameTimeMax,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ I("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ I("span", { className: "perf-label-sub", children: [
            "Jank (",
            ">",
            " 16.7ms)"
          ] }),
          /* @__PURE__ */ I("span", { className: "perf-value-sub", style: { color: i.longFrames > 3 ? "#f87171" : "#4ade80" }, children: [
            i.longFrames,
            "/s"
          ] })
        ] }),
        C(y, 50, w(i.frameTime))
      ] }),
      /* @__PURE__ */ I("div", { className: "perf-section", children: [
        /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Renders/s" }),
          /* @__PURE__ */ m("span", { className: "perf-value", children: i.renderCount })
        ] }),
        /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Transactions/s" }),
          /* @__PURE__ */ m("span", { className: "perf-value", children: i.transactionCount })
        ] }),
        /* @__PURE__ */ I("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Last TX time" }),
          /* @__PURE__ */ I("span", { className: "perf-value-sub", children: [
            i.lastTransactionTime,
            "ms"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ I("div", { className: "perf-section", children: [
        /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "DOM Nodes" }),
          /* @__PURE__ */ m("span", { className: "perf-value", children: i.domNodes.toLocaleString() })
        ] }),
        i.memoryTotal > 0 && /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Memory" }),
          /* @__PURE__ */ I("span", { className: "perf-value", children: [
            i.memoryUsed,
            "MB / ",
            i.memoryTotal,
            "MB"
          ] })
        ] })
      ] })
    ] })
  ] });
});
class Fk extends Id {
  constructor(t) {
    super(t), this.handleRetry = () => {
      this.setState((n) => ({
        hasError: !1,
        error: null,
        errorInfo: null,
        showDetails: !1,
        retryCount: n.retryCount + 1,
        copied: !1
      })), this.props.onRetry?.();
    }, this.handleClearContent = () => {
      this.setState({
        hasError: !1,
        error: null,
        errorInfo: null,
        showDetails: !1,
        retryCount: 0,
        copied: !1
      }), this.props.onClearContent?.();
    }, this.handleCopyError = () => {
      const { error: n, errorInfo: r } = this.state;
      if (!n) return;
      const o = [
        `Error: ${n.message}`,
        "",
        "Stack trace:",
        n.stack || "(no stack trace)",
        "",
        "Component stack:",
        r?.componentStack || "(no component stack)"
      ].join(`
`);
      navigator.clipboard.writeText(o).then(() => {
        this.setState({ copied: !0 }), setTimeout(() => this.setState({ copied: !1 }), 2e3);
      }).catch(() => {
      });
    }, this.toggleDetails = () => {
      this.setState((n) => ({ showDetails: !n.showDetails }));
    }, this.state = {
      hasError: !1,
      error: null,
      errorInfo: null,
      showDetails: !1,
      retryCount: 0,
      copied: !1
    };
  }
  static getDerivedStateFromError(t) {
    return { hasError: !0, error: t };
  }
  componentDidCatch(t, n) {
    this.setState({ errorInfo: n }), console.error("[Paragon EditorErrorBoundary] Editor crashed:", t, n), this.props.onError?.(t, n);
  }
  // Reset the error state when the resetKey changes (e.g., switching documents)
  componentDidUpdate(t) {
    t.resetKey !== this.props.resetKey && this.state.hasError && this.setState({
      hasError: !1,
      error: null,
      errorInfo: null,
      showDetails: !1,
      retryCount: 0,
      copied: !1
    });
  }
  render() {
    if (this.state.hasError) {
      const { error: t, showDetails: n, retryCount: r, copied: o } = this.state, s = r >= 2;
      return /* @__PURE__ */ m("div", { className: ae("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ I("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ m("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ m(rf, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ I("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ m("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ m("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ I("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ I(
            Nt,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ m(Gs, { className: "w-4 h-4" }),
                "Retry ",
                r > 0 && `(${r})`
              ]
            }
          ),
          s && this.props.onClearContent && /* @__PURE__ */ I(
            Nt,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ m(dn, { className: "w-4 h-4" }),
                "Clear Content & Retry"
              ]
            }
          )
        ] }),
        t && /* @__PURE__ */ I("div", { className: "w-full max-w-xs", children: [
          /* @__PURE__ */ I(
            "button",
            {
              onClick: this.toggleDetails,
              className: ae(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ m(At, { className: "w-3 h-3" }) : /* @__PURE__ */ m(dc, { className: "w-3 h-3" }),
                "Error details"
              ]
            }
          ),
          n && /* @__PURE__ */ I("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ I("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ m("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }),
              /* @__PURE__ */ m(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: o ? /* @__PURE__ */ I(be, { children: [
                    /* @__PURE__ */ m(of, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ m("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ I(be, { children: [
                    /* @__PURE__ */ m(Kt, { className: "w-3 h-3" }),
                    /* @__PURE__ */ m("span", { children: "Copy" })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ m("p", { className: "text-xs font-mono text-muted-foreground break-all", children: t.message }),
            t.stack && /* @__PURE__ */ m("pre", { className: "text-[10px] font-mono text-muted-foreground/70 mt-2 whitespace-pre-wrap break-all", children: t.stack.split(`
`).slice(1, 6).join(`
`) })
          ] })
        ] })
      ] }) });
    }
    return this.props.children;
  }
}
function Uk({ className: e = "", theme: t }) {
  const n = (r) => ({
    height: "1rem",
    width: r,
    borderRadius: "0.25rem",
    background: "var(--color-muted, #e5e7eb)",
    opacity: 0.5,
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
  });
  return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${e}`, "data-theme": t, children: /* @__PURE__ */ I(
    "div",
    {
      className: "editor-loading",
      style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" },
      children: [
        /* @__PURE__ */ m("div", { style: n("100%") }),
        /* @__PURE__ */ m("div", { style: n("83%") }),
        /* @__PURE__ */ m("div", { style: n("66%") }),
        /* @__PURE__ */ m("div", { style: { height: "0.75rem" } }),
        /* @__PURE__ */ m("div", { style: n("100%") }),
        /* @__PURE__ */ m("div", { style: n("75%") })
      ]
    }
  ) });
}
function Yk({ editorMode: e, onModeSwitch: t }) {
  return /* @__PURE__ */ I("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
    /* @__PURE__ */ m(
      "button",
      {
        onClick: () => t("wysiwyg"),
        className: `editor-mode-toggle-btn ${e === "wysiwyg" ? "active" : ""}`,
        title: "Visual Editor",
        children: /* @__PURE__ */ m(sf, {})
      }
    ),
    /* @__PURE__ */ m(
      "button",
      {
        onClick: () => t("markdown"),
        className: `editor-mode-toggle-btn ${e === "markdown" ? "active" : ""}`,
        title: "Raw Markdown",
        children: /* @__PURE__ */ m(qs, {})
      }
    )
  ] });
}
const $e = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ m(
  "button",
  {
    onMouseDown: e,
    disabled: n,
    title: o,
    className: `
      flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
      transition-all duration-100 ease-out touch-manipulation
      ${t ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
      ${n ? "opacity-50 cursor-not-allowed" : ""}
    `,
    children: r
  }
), ls = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), qi = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], jk = Vt(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [c, l] = U(!1), u = V(null), d = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", f = qi.find((h) => h.value === d)?.shortLabel || "P";
  G(() => {
    if (!c) return;
    const h = (g) => {
      u.current && !u.current.contains(g.target) && l(!1);
    };
    return document.addEventListener("mousedown", h), () => document.removeEventListener("mousedown", h);
  }, [c]);
  const p = (h, g) => {
    if (h.preventDefault(), h.stopPropagation(), g === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const y = parseInt(g.replace("h", ""));
      t.chain().focus().toggleHeading({ level: y }).run();
    }
    l(!1);
  };
  return /* @__PURE__ */ I("div", { ref: u, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ I(
      "button",
      {
        onMouseDown: (h) => {
          h.preventDefault(), h.stopPropagation(), l(!c);
        },
        title: "Text style",
        className: `
          flex items-center gap-1 h-7 px-2 rounded-md flex-shrink-0
          transition-all duration-100 ease-out touch-manipulation
          text-xs font-normal overflow-visible
          ${d !== "paragraph" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
        `,
        children: [
          /* @__PURE__ */ m("span", { className: "min-w-[18px] text-center", children: f }),
          /* @__PURE__ */ m(At, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${c ? "rotate-180" : ""}` })
        ]
      }
    ),
    c && /* @__PURE__ */ m(
      "div",
      {
        className: `
            absolute top-full left-0 mt-1.5
            bg-popover text-popover-foreground
            border border-border rounded-lg shadow-lg
            py-1 min-w-[130px] z-[10000]
          `,
        style: { animation: "slash-fade-in-below 0.12s ease-out" },
        children: qi.map((h) => {
          const g = h.value === d;
          return /* @__PURE__ */ I(
            "button",
            {
              onMouseDown: (y) => p(y, h.value),
              className: `
                  flex items-center gap-2 w-full px-3 py-1.5 text-left text-sm
                  transition-colors duration-75
                  ${g ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"}
                `,
              children: [
                /* @__PURE__ */ m("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: h.shortLabel }),
                /* @__PURE__ */ m("span", { children: h.label })
              ]
            },
            h.value
          );
        })
      }
    )
  ] });
}), Vk = Vt(function({ onCopy: t, iconSize: n }) {
  const [r, o] = U(!1), s = V(null);
  G(() => () => {
    s.current && clearTimeout(s.current);
  }, []);
  const i = B((a) => {
    a.preventDefault(), a.stopPropagation(), t(), o(!0), s.current && clearTimeout(s.current), s.current = setTimeout(() => o(!1), 1500);
  }, [t]);
  return /* @__PURE__ */ m(
    $e,
    {
      onMouseDown: i,
      title: r ? "Copied!" : "Copy as Markdown",
      children: r ? /* @__PURE__ */ m(Gt, { size: n, className: "text-green-500" }) : /* @__PURE__ */ m(Kt, { size: n })
    }
  );
}), Kk = Vt(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s, onCopySelectionAsMarkdown: i }) {
  const a = V(null), c = nc({
    editor: t,
    selector: ({ editor: M }) => ({
      isBold: M.isActive("bold"),
      isItalic: M.isActive("italic"),
      isUnderline: M.isActive("underline"),
      isStrike: M.isActive("strike"),
      isCode: M.isActive("code"),
      isHighlight: M.isActive("highlight"),
      isLink: M.isActive("link"),
      isH1: M.isActive("heading", { level: 1 }),
      isH2: M.isActive("heading", { level: 2 }),
      isH3: M.isActive("heading", { level: 3 }),
      isH4: M.isActive("heading", { level: 4 }),
      isH5: M.isActive("heading", { level: 5 }),
      isBulletList: M.isActive("bulletList"),
      isOrderedList: M.isActive("orderedList"),
      isTaskList: M.isActive("taskList"),
      isBlockquote: M.isActive("blockquote"),
      isCodeBlock: M.isActive("codeBlock")
    })
  }), [l, u] = U(!1), [d, f] = U(""), [p, h] = U(!1), [g, y] = U({ top: 0, left: 0 }), v = V(null), b = V(null), x = V(null), S = B(() => {
    if (d) {
      let M = d.trim();
      !/^https?:\/\//i.test(M) && !M.startsWith("mailto:") && (M = "https://" + M), t.chain().focus().extendMarkRange("link").setLink({ href: M }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    u(!1), f("");
  }, [t, d]), w = (M) => {
    M.preventDefault(), M.stopPropagation();
    const D = t.getAttributes("link").href;
    f(D || ""), u(!0);
  }, C = B((M, D) => {
    M.preventDefault(), M.stopPropagation(), D();
  }, []);
  G(() => {
    if (!t || t.isDestroyed) return;
    const M = () => {
      if (!t.isDestroyed)
        try {
          const { selection: D } = t.state, { empty: L, from: P, to: O } = D, K = ("node" in D && D.node ? D.node : null)?.type?.name === "resizableImage";
          if (L || K || t.isActive("codeBlock")) {
            x.current && (clearTimeout(x.current), x.current = null), b.current && clearTimeout(b.current), b.current = setTimeout(() => {
              h(!1), u(!1);
            }, 150);
            return;
          }
          b.current && (clearTimeout(b.current), b.current = null);
          const R = t.view.coordsAtPos(P), A = t.view.coordsAtPos(O), _ = v.current?.offsetWidth || 500, Y = v.current?.offsetHeight || 40, j = 8, q = window.innerWidth;
          let Z = 0, W = 0;
          if (v.current) {
            const ue = v.current.closest('[data-slot="dialog-content"]');
            if (ue) {
              const ge = ue.getBoundingClientRect();
              Z = ge.left, W = ge.top;
            }
          }
          let F = (R.left + A.left) / 2 - _ / 2 - Z;
          const Q = Z ? q - Z : q;
          F = Math.max(j, Math.min(Q - _ - j, F));
          let le = R.top - Y - 10 - W;
          le < j && (le = A.bottom + 10 - W), p ? y({ top: Math.max(j, le), left: F }) : (x.current && clearTimeout(x.current), x.current = setTimeout(() => {
            y({ top: Math.max(j, le), left: F }), h(!0);
          }, 50));
        } catch (D) {
          console.warn("FloatingToolbar: Error updating position", D);
        }
    };
    return t.on("selectionUpdate", M), () => {
      t.off("selectionUpdate", M), b.current && clearTimeout(b.current), x.current && clearTimeout(x.current);
    };
  }, [t, p]), G(() => {
    if (!p || !t || t.isDestroyed) return;
    const M = t.view.dom.closest(".editor-content") || t.view.dom.parentElement;
    if (!M) return;
    const D = () => {
      h(!1), u(!1);
    };
    return M.addEventListener("scroll", D, { passive: !0 }), window.addEventListener("scroll", D, { passive: !0 }), () => {
      M.removeEventListener("scroll", D), window.removeEventListener("scroll", D);
    };
  }, [p, t]);
  const E = (M) => {
    b.current && (clearTimeout(b.current), b.current = null);
  };
  if (!p || r)
    return null;
  const k = 15, N = l ? /* @__PURE__ */ m(
    "div",
    {
      ref: v,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: g.top,
        left: g.left
      },
      onMouseDown: E,
      children: /* @__PURE__ */ I("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ m(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: d,
            onChange: (M) => f(M.target.value),
            onKeyDown: (M) => {
              M.key === "Enter" && (M.preventDefault(), S()), M.key === "Escape" && (u(!1), f(""));
            },
            className: `
            bg-secondary/50 rounded px-3 py-2 sm:py-1
            text-sm text-foreground placeholder:text-muted-foreground
            outline-none border border-border/50
            w-full sm:w-48
          `,
            autoFocus: !0
          }
        ),
        /* @__PURE__ */ I("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (M) => {
                M.preventDefault(), S();
              },
              className: `
              flex-1 sm:flex-none px-4 sm:px-3 py-2 sm:py-1 text-sm sm:text-xs font-medium rounded
              bg-primary text-primary-foreground
              hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation
            `,
              children: "Apply"
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (M) => {
                M.preventDefault(), u(!1), f("");
              },
              className: `
              flex-1 sm:flex-none px-4 sm:px-2 py-2 sm:py-1 text-sm sm:text-xs font-medium rounded
              bg-secondary text-secondary-foreground
              hover:bg-accent active:bg-accent/80 transition-colors touch-manipulation
            `,
              children: "Cancel"
            }
          )
        ] })
      ] })
    }
  ) : /* @__PURE__ */ I(
    "div",
    {
      ref: v,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: g.top,
        left: g.left
      },
      onMouseDown: E,
      children: [
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (M) => C(M, () => t.chain().focus().toggleBold().run()),
            isActive: c?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(_s, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (M) => C(M, () => t.chain().focus().toggleItalic().run()),
            isActive: c?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m($s, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (M) => C(M, () => t.chain().focus().toggleUnderline().run()),
            isActive: c?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(Hs, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (M) => C(M, () => t.chain().focus().toggleStrike().run()),
            isActive: c?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(Ws, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (M) => C(M, () => t.chain().focus().toggleCode().run()),
            isActive: c?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(sc, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (M) => C(M, () => t.chain().focus().toggleHighlight().run()),
            isActive: c?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ m(ac, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: w,
            isActive: c?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ m(zs, { size: k })
          }
        ),
        /* @__PURE__ */ m(ls, {}),
        /* @__PURE__ */ m(
          jk,
          {
            editor: t,
            isH1: c?.isH1 ?? !1,
            isH2: c?.isH2 ?? !1,
            isH3: c?.isH3 ?? !1,
            isH4: c?.isH4 ?? !1,
            isH5: c?.isH5 ?? !1,
            executeCommand: C
          }
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (M) => C(M, () => t.chain().focus().toggleBlockquote().run()),
            isActive: c?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(Ys, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (M) => C(M, () => t.chain().focus().toggleBulletList().run()),
            isActive: c?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(Bs, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (M) => C(M, () => t.chain().focus().toggleOrderedList().run()),
            isActive: c?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m(Fs, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (M) => C(M, () => t.chain().focus().toggleTaskList().run()),
            isActive: c?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m(Us, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (M) => C(M, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: c?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(af, { size: k })
          }
        ),
        i && /* @__PURE__ */ I(be, { children: [
          /* @__PURE__ */ m(ls, {}),
          /* @__PURE__ */ m(Vk, { onCopy: i, iconSize: k })
        ] }),
        o && /* @__PURE__ */ I(be, { children: [
          /* @__PURE__ */ m(ls, {}),
          /* @__PURE__ */ m(
            "button",
            {
              ref: a,
              onMouseDown: (M) => {
                M.preventDefault(), M.stopPropagation(), a.current && s?.(a.current);
              },
              title: "AI Writing Assistant",
              className: `
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            `,
              children: /* @__PURE__ */ m(lo, { size: k })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(bt, { onMouseDown: E, children: N });
});
function Gk({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = U(""), s = V(null), i = V(null), [a, c] = U({ top: 0, left: 0 });
  G(() => {
    if (t) {
      const h = e.getAttributes("link").href || "";
      o(h);
      try {
        const { view: g } = e, { from: y } = g.state.selection, v = g.coordsAtPos(y), b = v.bottom + 8, x = Math.max(16, Math.min(v.left, window.innerWidth - 420));
        c({ top: b, left: x });
      } catch {
        c({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), G(() => {
    if (!t) return;
    const h = (b) => {
      i.current && !i.current.contains(b.target) && n();
    }, g = () => {
      n();
    }, y = setTimeout(() => {
      document.addEventListener("mousedown", h);
    }, 10), v = e.view.dom.closest(".editor-content-wrapper");
    return v?.addEventListener("scroll", g), () => {
      clearTimeout(y), document.removeEventListener("mousedown", h), v?.removeEventListener("scroll", g);
    };
  }, [t, n, e]);
  const l = B((h) => {
    if (h?.preventDefault(), r.trim()) {
      let g = r.trim();
      !/^https?:\/\//i.test(g) && !g.startsWith("mailto:") && (g = "https://" + g), e.chain().focus().extendMarkRange("link").setLink({ href: g }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), u = B((h) => {
    h.key === "Escape" ? (h.preventDefault(), n()) : h.key === "Enter" && (h.preventDefault(), l());
  }, [n, l]);
  if (!t) return null;
  const f = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", p = /* @__PURE__ */ m(
    "div",
    {
      ref: i,
      className: "link-popover",
      "data-theme": f,
      style: {
        position: "fixed",
        top: `${a.top}px`,
        left: `${a.left}px`
      },
      children: /* @__PURE__ */ I("form", { onSubmit: l, className: "link-popover-form", children: [
        /* @__PURE__ */ I("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ m(Os, { className: "link-popover-icon", size: 16 }),
          /* @__PURE__ */ m(
            "input",
            {
              ref: s,
              type: "text",
              value: r,
              onChange: (h) => o(h.target.value),
              onKeyDown: u,
              placeholder: "Enter URL or paste link",
              className: "link-popover-input",
              autoComplete: "off",
              spellCheck: !1
            }
          )
        ] }),
        /* @__PURE__ */ m("div", { className: "link-popover-hint", children: "Press Enter to save · Escape to cancel" })
      ] })
    }
  );
  return /* @__PURE__ */ m(bt, { children: p });
}
function qk() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
function Xk({ editor: e, onEditLink: t }) {
  const [n, r] = U({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = V(null), s = V(null), i = V(null), a = B((w) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const C = w.getAttribute("href") || "", E = w.getBoundingClientRect(), k = E.bottom + 8, N = Math.max(16, Math.min(E.left, window.innerWidth - 340));
        i.current = w, r({
          isVisible: !0,
          url: C,
          position: { top: k, left: N },
          linkElement: w
        });
      } catch (C) {
        console.warn("LinkHoverTooltip: Error showing tooltip", C);
      }
    }
  }, [e]), c = B(() => {
    s.current = setTimeout(() => {
      i.current = null, r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), l = B(() => {
    s.current && (clearTimeout(s.current), s.current = null), i.current = null, r((w) => ({ ...w, isVisible: !1, linkElement: null }));
  }, []), u = B(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  G(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const C = (k) => {
      const M = k.target.closest("a");
      M && w.contains(M) && a(M);
    }, E = (k) => {
      const N = k.target, M = k.relatedTarget;
      if (N.closest("a")) {
        if (M && o.current?.contains(M))
          return;
        c();
      }
    };
    return w.addEventListener("mouseover", C), w.addEventListener("mouseout", E), () => {
      w.removeEventListener("mouseover", C), w.removeEventListener("mouseout", E), s.current && clearTimeout(s.current);
    };
  }, [e, a, c]), G(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const C = (E) => {
      const N = E.target.closest("a");
      if (N && w.contains(N)) {
        if (i.current === N && n.isVisible)
          return;
        E.preventDefault(), E.stopPropagation(), a(N);
      }
    };
    return w.addEventListener("touchend", C, { capture: !0 }), () => {
      w.removeEventListener("touchend", C, { capture: !0 });
    };
  }, [e, a, n.isVisible]), G(() => {
    if (!n.isVisible || !qk()) return;
    const w = (E) => {
      const k = E.target;
      o.current?.contains(k) || i.current && i.current.contains(k) || l();
    }, C = setTimeout(() => {
      document.addEventListener("touchstart", w, { passive: !0 });
    }, 100);
    return () => {
      clearTimeout(C), document.removeEventListener("touchstart", w);
    };
  }, [n.isVisible, l]), G(() => {
    if (!n.isVisible) return;
    const w = () => {
      l();
    }, C = e.view.dom.closest(".editor-content-wrapper");
    return C?.addEventListener("scroll", w), window.addEventListener("scroll", w, !0), () => {
      C?.removeEventListener("scroll", w), window.removeEventListener("scroll", w, !0);
    };
  }, [n.isVisible, e, l]);
  const [d, f] = U(!1), p = B(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      f(!0), setTimeout(() => f(!1), 1500);
    });
  }, [n.url]), h = B(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), g = B(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: C } = w.state;
      let E = null, k = null;
      C.descendants((N, M) => {
        if (N.isText && N.marks.some((D) => D.type.name === "link")) {
          const D = w.nodeDOM(M);
          if (D && (D === n.linkElement || D.parentElement === n.linkElement))
            return E = M, k = M + N.nodeSize, !1;
        }
        return !0;
      }), E !== null && k !== null ? e.chain().focus().setTextSelection({ from: E, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((w) => ({ ...w, isVisible: !1 }));
  }, [e, n.linkElement]), y = B(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: C } = w.state;
      C.descendants((E, k) => {
        if (E.isText && E.marks.some((N) => N.type.name === "link")) {
          const N = w.nodeDOM(k);
          if (N && (N === n.linkElement || N.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: k, to: k + E.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    r((w) => ({ ...w, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const v = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, x = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", S = /* @__PURE__ */ m(
    "div",
    {
      ref: o,
      className: "link-hover-tooltip",
      "data-theme": x,
      style: {
        position: "fixed",
        top: `${n.position.top}px`,
        left: `${n.position.left}px`
      },
      onMouseEnter: u,
      onMouseLeave: c,
      children: /* @__PURE__ */ I("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ I(
          "button",
          {
            onClick: h,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ m(cf, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ m("span", { className: "link-hover-tooltip-url", children: v || "No URL" })
            ]
          }
        ),
        /* @__PURE__ */ I("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: y,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ m(lf, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: d ? /* @__PURE__ */ m(Gt, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ m(Kt, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: g,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ m(uf, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ m(bt, { children: S });
}
const Zk = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(co, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(df, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(ff, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(mf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(pf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(hf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ m(Bs, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ m(Fs, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ m(Us, { size: 16 }),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ m(Ys, { size: 16 }),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ m(ic, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ m(us, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ m(Ps, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ m(cc, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ m(Kr, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ m(uc, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ m(lc, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ m(js, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ m(Vs, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ m(fc, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ m(Os, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], Qk = 32, Jk = 8, e1 = 320, t1 = 210, zr = 12;
function Xi(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const o = t.getRangeAt(0), s = o.getBoundingClientRect();
      if (s.width === 0 && s.height === 0 && s.top === 0) {
        const i = document.createElement("span");
        i.textContent = "​", o.cloneRange().insertNode(i);
        const c = i.getBoundingClientRect(), l = { top: c.top, bottom: c.bottom, left: c.left };
        return i.parentNode?.removeChild(i), t.removeAllRanges(), t.addRange(o), l;
      }
      return { top: s.top, bottom: s.bottom, left: s.left };
    }
    const n = e.state.selection.from, r = e.view.coordsAtPos(n);
    return { top: r.top, bottom: r.bottom, left: r.left };
  } catch {
    return null;
  }
}
function n1({ editor: e }) {
  const [t, n] = U(!1), [r, o] = U(""), [s, i] = U(0), [a, c] = U(null), [l, u] = U(!1), [d, f] = U({ top: 0, left: 0 }), [p, h] = U("below"), g = V(null), y = V(-1), v = V(!1);
  G(() => {
    v.current = t;
  }, [t]);
  const b = Zk.filter((N) => {
    if (!r) return !0;
    const M = r.toLowerCase();
    return N.title.toLowerCase().includes(M) || N.keywords?.some((D) => D.includes(M));
  }), x = Math.min(
    b.length * Qk + Jk,
    e1
  );
  io(() => {
    if (!t || !a) return;
    const { top: N, bottom: M, left: D } = a, L = window.innerHeight, P = window.innerWidth, O = L - M - zr, H = N - zr;
    let $;
    if (O >= x ? $ = "below" : H >= x ? $ = "above" : $ = O >= H ? "below" : "above", h($), g.current) {
      const K = Math.max(
        zr,
        Math.min(D, P - t1 - zr)
      ), R = $ === "below" ? M + 4 : N - x - 4;
      g.current.style.top = `${R}px`, g.current.style.left = `${K}px`;
    }
  }, [t, a, x, b.length]);
  const S = B(() => {
    const { state: N } = e, { selection: M } = N, D = M.from, L = y.current;
    if (L >= 0 && L <= D)
      e.chain().focus().deleteRange({ from: L, to: D }).run();
    else {
      const { $from: P } = M, H = P.parent.textBetween(0, P.parentOffset, void 0, "￼").lastIndexOf("/");
      if (H !== -1) {
        const $ = P.pos - (P.parentOffset - H);
        e.chain().focus().deleteRange({ from: $, to: P.pos }).run();
      }
    }
  }, [e]), w = B(() => {
    n(!1), o(""), i(0), y.current = -1, c(null);
  }, []), C = B((N) => {
    const M = b[N];
    if (M) {
      if (S(), M.isImageCommand) {
        const { state: D } = e, L = e.view.coordsAtPos(D.selection.from);
        f({
          top: L.bottom + 8,
          left: L.left
        }), u(!0);
      } else
        M.command(e);
      w();
    }
  }, [e, b, S, w]), E = B((N, M) => {
    e.chain().focus().setImage({ src: N, alt: M }).run();
  }, [e]);
  return G(() => {
    if (!e) return;
    const N = () => {
      if (v.current) return;
      const { state: M } = e, { selection: D } = M, { $from: L } = D;
      if (L.parentOffset === 0) return;
      const P = L.parent.textBetween(0, L.parentOffset, void 0, "￼");
      if (!P.endsWith("/")) return;
      const O = P.length > 1 ? P.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = L.pos - 1;
      const H = Xi(e);
      H && (c(H), n(!0), o(""), i(0));
    };
    return e.on("update", N), () => {
      e.off("update", N);
    };
  }, [e]), G(() => {
    if (!e || !t) return;
    const N = e.view.dom, M = (D) => {
      v.current && (D.key === "ArrowDown" ? (D.preventDefault(), D.stopPropagation(), i((L) => (L + 1) % b.length)) : D.key === "ArrowUp" ? (D.preventDefault(), D.stopPropagation(), i((L) => (L - 1 + b.length) % b.length)) : D.key === "Enter" ? (D.preventDefault(), D.stopPropagation(), C(s)) : D.key === "Escape" && (D.preventDefault(), D.stopPropagation(), w()));
    };
    return N.addEventListener("keydown", M, !0), () => {
      N.removeEventListener("keydown", M, !0);
    };
  }, [e, t, s, b, C, w]), G(() => {
    if (!e || !t) return;
    const N = () => {
      if (!v.current || y.current < 0) return;
      const { state: M } = e, { selection: D } = M, L = D.from, P = y.current;
      if (L <= P) {
        w();
        return;
      }
      try {
        const O = M.doc.textBetween(P + 1, L, void 0, "￼");
        if (O.includes(`
`)) {
          w();
          return;
        }
        o(O), i(0);
        const H = Xi(e);
        H && c(H);
      } catch {
        w();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, t, w]), G(() => {
    if (!t) return;
    const N = (M) => {
      g.current && !g.current.contains(M.target) && w();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [t, w]), G(() => {
    t && b.length === 0 && r.length > 2 && w();
  }, [t, b.length, r, w]), G(() => {
    s >= b.length && i(Math.max(0, b.length - 1));
  }, [b.length, s]), G(() => {
    if (!t || !g.current) return;
    const N = g.current.querySelector(".slash-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [t, s]), l ? /* @__PURE__ */ m(
    wc,
    {
      isOpen: l,
      onClose: () => u(!1),
      onInsert: E,
      position: d
    }
  ) : !t || b.length === 0 ? null : /* @__PURE__ */ m(bt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: g,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: b.map((N, M) => /* @__PURE__ */ I(
        "div",
        {
          className: `slash-item ${M === s ? "is-selected" : ""}`,
          onClick: (D) => {
            D.preventDefault(), D.stopPropagation(), C(M);
          },
          onMouseEnter: () => i(M),
          children: [
            /* @__PURE__ */ m("span", { className: "slash-icon", children: N.icon }),
            /* @__PURE__ */ m("span", { className: "slash-label", children: N.title })
          ]
        },
        N.title
      ))
    }
  ) });
}
const r1 = 340, o1 = 36, s1 = 8, a1 = 240, Br = 8;
function Zi(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const o = t.getRangeAt(0), s = o.getBoundingClientRect();
      if (s.width === 0 && s.height === 0 && s.top === 0) {
        const i = document.createElement("span");
        i.textContent = "​", o.cloneRange().insertNode(i);
        const c = i.getBoundingClientRect(), l = { top: c.top, bottom: c.bottom, left: c.left };
        return i.parentNode?.removeChild(i), t.removeAllRanges(), t.addRange(o), l;
      }
      return { top: s.top, bottom: s.bottom, left: s.left };
    }
    const n = e.state.selection.from, r = e.view.coordsAtPos(n);
    return { top: r.top, bottom: r.bottom, left: r.left };
  } catch {
    return null;
  }
}
function i1({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = U(!1), [s, i] = U(""), [a, c] = U([]), [l, u] = U(0), [d, f] = U(null), [p, h] = U("below"), [g, y] = U(!1), v = V(!1), b = V(null), x = V(-1), S = V(null);
  G(() => {
    v.current = r;
  }, [r]);
  const w = B(() => {
    o(!1), i(""), c([]), u(0), x.current = -1;
  }, []), C = B((D) => {
    const L = x.current;
    if (L < 0) return;
    const { state: P } = e, O = P.selection.from;
    try {
      const H = P.tr.delete(L, O), $ = P.schema.marks.wikiLink;
      if ($) {
        const K = $.create({ pageName: D }), R = P.schema.text(D, [K]);
        H.insert(L, R);
        const A = L + D.length;
        H.setSelection(qe.create(H.doc, A)), H.removeStoredMark($);
      } else
        H.insertText(`[[${D}]]`, L);
      e.view.dispatch(H), e.view.focus();
    } catch (H) {
      console.warn("WikiLinkAutocomplete: Error inserting link", H);
    }
    w();
  }, [e, w]);
  G(() => {
    if (!e) return;
    const D = () => {
      if (v.current) return;
      const { state: L } = e, { selection: P } = L, { $from: O } = P;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      x.current = O.pos - 2;
      const $ = Zi(e);
      $ && (f($), o(!0), i(""), c([]), u(0));
    };
    return e.on("update", D), () => {
      e.off("update", D);
    };
  }, [e]), G(() => {
    if (!e || !r) return;
    const D = e.view.dom, L = (P) => {
      if (v.current) {
        if (P.key === "ArrowDown") {
          P.preventDefault();
          const O = a.length + (s.trim() ? 1 : 0) - 1;
          u((H) => Math.min(H + 1, O));
          return;
        }
        if (P.key === "ArrowUp") {
          P.preventDefault(), u((O) => Math.max(O - 1, 0));
          return;
        }
        if (P.key === "Enter" || P.key === "Tab") {
          P.preventDefault(), P.stopPropagation(), l < a.length ? C(a[l].title) : s.trim() && n ? (n(s.trim()), w()) : s.trim() && C(s.trim());
          return;
        }
        if (P.key === "Escape") {
          P.preventDefault(), w();
          return;
        }
        P.key === "]" && setTimeout(() => {
          const { state: O } = e, { $from: H } = O.selection;
          H.parent.textBetween(0, H.parentOffset, void 0, "￼").endsWith("]]") && w();
        }, 0);
      }
    };
    return D.addEventListener("keydown", L, !0), () => {
      D.removeEventListener("keydown", L, !0);
    };
  }, [e, r, a, l, s, C, w, n]), G(() => {
    if (!e || !r) return;
    const D = () => {
      const L = x.current;
      if (L < 0) {
        w();
        return;
      }
      const { state: P } = e, O = P.selection.from;
      if (O <= L) {
        w();
        return;
      }
      try {
        const H = P.doc.textBetween(L + 2, O, void 0, "￼");
        if (H.includes(`
`) || H.includes("]]")) {
          w();
          return;
        }
        i(H), u(0);
        const $ = Zi(e);
        $ && f($);
      } catch {
        w();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, r, w]), G(() => {
    if (r) {
      if (S.current && clearTimeout(S.current), !s.trim()) {
        y(!0), S.current = setTimeout(async () => {
          try {
            const D = await t("");
            c(D);
          } catch {
            c([]);
          }
          y(!1);
        }, 100);
        return;
      }
      return y(!0), S.current = setTimeout(async () => {
        try {
          const D = await t(s.trim());
          c(D);
        } catch {
          c([]);
        }
        y(!1);
      }, 150), () => {
        S.current && clearTimeout(S.current);
      };
    }
  }, [r, s, t]), G(() => {
    if (!r) return;
    const D = (L) => {
      b.current && !b.current.contains(L.target) && w();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [r, w]), G(() => {
    if (!r || !b.current) return;
    const D = b.current.querySelector(".wikilink-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [r, l]);
  const E = a.length + (s.trim() ? 1 : 0), k = Math.min(
    Math.max(E, 1) * o1 + s1,
    a1
  );
  if (io(() => {
    if (!r || !d) return;
    const { top: D, bottom: L, left: P } = d, O = window.innerHeight, H = window.innerWidth, $ = O - L - Br, K = D - Br;
    let R;
    if ($ >= k ? R = "below" : K >= k ? R = "above" : R = $ >= K ? "below" : "above", h(R), b.current) {
      const A = Math.max(
        Br,
        Math.min(P, H - r1 - Br)
      ), _ = R === "below" ? L + 4 : D - k - 4;
      b.current.style.top = `${_}px`, b.current.style.left = `${A}px`;
    }
  }, [r, d, k, E]), !r) return null;
  const N = s.trim() && !a.some((D) => D.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ m(bt, { children: /* @__PURE__ */ I(
    "div",
    {
      ref: b,
      className: `wikilink-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: [
        g && a.length === 0 && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }) }),
        a.map((D, L) => /* @__PURE__ */ I(
          "div",
          {
            className: `wikilink-item ${L === l ? "is-selected" : ""}`,
            onMouseDown: (P) => {
              P.preventDefault(), C(D.title);
            },
            onMouseEnter: () => u(L),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(qs, { size: 14 }) }),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: D.title }),
              /* @__PURE__ */ m("span", { className: "wikilink-type", children: D.type })
            ]
          },
          D.id
        )),
        N && /* @__PURE__ */ I(
          "div",
          {
            className: `wikilink-item wikilink-create ${a.length === l ? "is-selected" : ""}`,
            onMouseDown: (D) => {
              D.preventDefault(), n ? (n(s.trim()), w()) : C(s.trim());
            },
            onMouseEnter: () => u(a.length),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Ks, { size: 14 }) }),
              /* @__PURE__ */ I("span", { className: "wikilink-label", children: [
                "Create “",
                s.trim(),
                "”"
              ] })
            ]
          }
        ),
        !g && a.length === 0 && !s.trim() && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }) })
      ]
    }
  ) });
}
function c1({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = U(e), [c, l] = U(t), u = V(null), d = V(null);
  G(() => {
    d.current?.focus(), d.current?.select();
  }, []), G(() => {
    const y = (b) => {
      u.current && !u.current.contains(b.target) && s();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 100);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", y);
    };
  }, [s]), G(() => {
    const y = (v) => {
      v.key === "Escape" ? s() : v.key === "Enter" && (v.metaKey || v.ctrlKey) && f();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [i, c, s]);
  const f = () => {
    i.trim() && r(i.trim(), c.trim());
  }, h = (() => {
    let x = n.x - 160, S = n.y + 10;
    return x + 320 > window.innerWidth - 16 && (x = window.innerWidth - 320 - 16), x < 16 && (x = 16), S + 280 > window.innerHeight - 16 && (S = n.y - 280 - 10), S < 16 && (S = 16), { left: x, top: S };
  })(), g = /* @__PURE__ */ I(
    "div",
    {
      ref: u,
      className: "image-edit-popover",
      style: {
        position: "fixed",
        left: h.left,
        top: h.top
      },
      children: [
        /* @__PURE__ */ I("div", { className: "image-edit-popover-header", children: [
          /* @__PURE__ */ m("span", { className: "image-edit-popover-title", children: "Edit Image" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: s,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(ht, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ I("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ I("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ I("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(zs, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ m("span", { children: "Image URL" })
            ] }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: d,
                type: "text",
                value: i,
                onChange: (y) => a(y.target.value),
                placeholder: "https://example.com/image.jpg",
                className: "image-edit-popover-input"
              }
            )
          ] }),
          /* @__PURE__ */ I("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ I("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(co, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ m("span", { children: "Alt Text" })
            ] }),
            /* @__PURE__ */ m(
              "input",
              {
                type: "text",
                value: c,
                onChange: (y) => l(y.target.value),
                placeholder: "Describe the image...",
                className: "image-edit-popover-input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ I("div", { className: "image-edit-popover-footer", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: o,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ m(dn, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ I("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ m(
              "button",
              {
                onClick: s,
                className: "image-edit-popover-btn image-edit-popover-btn-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ I(
              "button",
              {
                onClick: f,
                className: "image-edit-popover-btn image-edit-popover-btn-save",
                disabled: !i.trim(),
                children: [
                  /* @__PURE__ */ m(Gt, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(bt, { children: g });
}
function l1({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = U(!1), [o, s] = U(0), i = B((u) => {
    u.preventDefault(), u.stopPropagation(), u.dataTransfer?.types.includes("Files") && (s((d) => d + 1), r(!0));
  }, []), a = B((u) => {
    u.preventDefault(), u.stopPropagation(), s((d) => {
      const f = d - 1;
      return f === 0 && r(!1), f;
    });
  }, []), c = B((u) => {
    u.preventDefault(), u.stopPropagation();
  }, []), l = B((u) => {
    u.preventDefault(), u.stopPropagation(), r(!1), s(0);
  }, []);
  return G(() => {
    if (!t || !e.current) return;
    const u = e.current;
    return u.addEventListener("dragenter", i), u.addEventListener("dragleave", a), u.addEventListener("dragover", c), u.addEventListener("drop", l), () => {
      u.removeEventListener("dragenter", i), u.removeEventListener("dragleave", a), u.removeEventListener("dragover", c), u.removeEventListener("drop", l);
    };
  }, [t, e, i, a, c, l]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ I("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(gf, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ I("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ m("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ m("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
const u1 = {
  SpellCheck: vf,
  RefreshCw: yf,
  Minimize2: hc,
  Maximize2: pc,
  FileText: qs,
  MessageSquare: gc,
  Sparkles: lo
};
function d1({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = U(""), [a, c] = U(!1), l = V(null), u = V(null), d = e.filter((y) => y.scope === t || y.scope === "both");
  G(() => {
    const y = (b) => {
      l.current && !l.current.contains(b.target) && r();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 50);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", y);
    };
  }, [r]), G(() => {
    const y = (v) => {
      v.key === "Escape" && r();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [r]), G(() => {
    a && u.current && u.current.focus();
  }, [a]);
  const p = B(() => {
    const v = d.length * 40 + (a ? 56 : 0) + 16, b = window.innerWidth, x = window.innerHeight;
    let S = o.top, w = o.left;
    return w + 260 > b - 8 && (w = b - 260 - 8), w < 8 && (w = 8), S + v > x - 8 && (S = o.top - v - 8), S < 8 && (S = 8), { top: S, left: w };
  }, [o, d.length, a])(), h = () => {
    s.trim() && (n("custom", s.trim()), i(""), c(!1));
  }, g = /* @__PURE__ */ m(
    "div",
    {
      ref: l,
      className: "ai-dropdown-menu",
      style: {
        position: "fixed",
        top: p.top,
        left: p.left
      },
      children: /* @__PURE__ */ I(
        "div",
        {
          className: `
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-lg overflow-hidden
          w-[260px] py-1
          animate-in fade-in-0 zoom-in-95 duration-100
        `,
          children: [
            /* @__PURE__ */ m("div", { className: "px-2 py-1.5", children: /* @__PURE__ */ I("div", { className: "flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50", children: [
              /* @__PURE__ */ m(gc, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ m(
                "input",
                {
                  ref: u,
                  type: "text",
                  placeholder: "Modify with prompt…",
                  value: s,
                  onChange: (y) => i(y.target.value),
                  onKeyDown: (y) => {
                    y.key === "Enter" && (y.preventDefault(), h()), y.stopPropagation();
                  },
                  onFocus: () => c(!0),
                  className: `
                flex-1 bg-transparent text-sm text-foreground
                placeholder:text-muted-foreground
                outline-none min-w-0
              `
                }
              )
            ] }) }),
            /* @__PURE__ */ m("div", { className: "h-px bg-border mx-2 my-0.5" }),
            d.filter((y) => !y.showCustomPrompt).map((y) => {
              const v = y.icon ? u1[y.icon] : lo;
              return /* @__PURE__ */ I(
                "button",
                {
                  className: `
                  flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left
                  hover:bg-secondary/80 transition-colors duration-75
                  text-foreground
                `,
                  onMouseDown: (b) => {
                    b.preventDefault(), n(y.id);
                  },
                  children: [
                    v && /* @__PURE__ */ m(v, { size: 15, className: "text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ m("span", { children: y.label })
                  ]
                },
                y.id
              );
            })
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ m(bt, { onMouseDown: (y) => y.preventDefault(), children: g });
}
function f1({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = V(null), a = V(null), [c, l] = U(!1), [u, d] = U(0);
  G(() => {
    if (i.current) {
      const w = new ResizeObserver((C) => {
        for (const E of C)
          d(E.contentRect.height);
      });
      return w.observe(i.current), () => w.disconnect();
    }
  }, []), G(() => {
    a.current && e.status === "streaming" && (a.current.scrollTop = a.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), G(() => {
    const w = (C) => {
      C.key === "Escape" && s();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [s]);
  const f = Yt(() => {
    const k = window.innerWidth, N = window.innerHeight;
    let M = t.selectionCenterX - 380 / 2;
    M + 380 > k - 8 && (M = k - 380 - 8), M < 8 && (M = 8);
    const D = N - t.selectionBottom - 8, L = t.selectionTop - 8, P = u || 200;
    let O, H = !1;
    return D >= P || D >= L ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - P, H = !0), O < 8 && (O = 8), O + P > N - 8 && (O = N - P - 8), { top: O, left: M, placedAbove: H };
  }, [t, u]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", h = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", g = e.status === "streaming", y = e.status === "complete", v = e.status === "error", b = B(() => {
    navigator.clipboard.writeText(p), l(!0), setTimeout(() => l(!1), 1500);
  }, [p]);
  if (e.status === "idle") return null;
  const x = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", S = /* @__PURE__ */ m(
    "div",
    {
      ref: i,
      className: "ai-result-popover",
      style: {
        position: "fixed",
        top: f.top,
        left: f.left
      },
      children: /* @__PURE__ */ I(
        "div",
        {
          className: `
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-xl overflow-hidden
          w-[380px] max-w-[calc(100vw-16px)]
          ${x}
        `,
          children: [
            /* @__PURE__ */ I("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30", children: [
              /* @__PURE__ */ I("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                g && /* @__PURE__ */ m(mc, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ m("span", { className: "font-medium", children: v ? "Error" : h }),
                g && /* @__PURE__ */ m("span", { className: "opacity-60", children: "Generating…" })
              ] }),
              /* @__PURE__ */ m(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (w) => {
                    w.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ m(ht, { size: 14, className: "text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ m(
              "div",
              {
                ref: a,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: v ? /* @__PURE__ */ m("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ I("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  g && /* @__PURE__ */ m("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ I("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || v) && /* @__PURE__ */ I(be, { children: [
                y && /* @__PURE__ */ I(be, { children: [
                  /* @__PURE__ */ m(
                    ln,
                    {
                      icon: ds,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ m(
                    ln,
                    {
                      icon: Ks,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ m(
                    ln,
                    {
                      icon: c ? Gt : Kt,
                      label: c ? "Copied" : "Copy",
                      onClick: b
                    }
                  )
                ] }),
                /* @__PURE__ */ m(
                  ln,
                  {
                    icon: Gs,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  ln,
                  {
                    icon: ht,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              g && /* @__PURE__ */ I(be, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  ln,
                  {
                    icon: ht,
                    label: "Stop",
                    onClick: s
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ m(bt, { onMouseDown: (w) => w.preventDefault(), children: S });
}
function ln({
  icon: e,
  label: t,
  onClick: n,
  primary: r = !1
}) {
  return /* @__PURE__ */ I(
    "button",
    {
      className: `
        flex items-center gap-1 px-2 py-1 rounded text-xs font-medium
        transition-colors duration-75
        ${r ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}
      `,
      onMouseDown: (o) => {
        o.preventDefault(), n();
      },
      children: [
        /* @__PURE__ */ m(e, { size: 12 }),
        /* @__PURE__ */ m("span", { children: t })
      ]
    }
  );
}
function m1({
  editor: e,
  isMobile: t,
  disabledFeatures: n,
  containerRef: r,
  editable: o,
  showFloatingToolbar: s,
  isLinkPopoverOpen: i,
  aiEnabled: a,
  onAISetupRequired: c,
  onAISparklesClick: l,
  onCopySelectionAsMarkdown: u,
  aiDropdown: d,
  aiActions: f,
  onAIActionSelect: p,
  onAIDropdownClose: h,
  aiState: g,
  aiPopoverPosition: y,
  onAIReplace: v,
  onAIInsert: b,
  onAIRetry: x,
  onAIDiscard: S,
  onLinkPopoverClose: w,
  onEditLink: C,
  onWikiLinkSearch: E,
  imageEditState: k,
  onImageSave: N,
  onImageDelete: M,
  onImageEditClose: D
}) {
  return /* @__PURE__ */ I(be, { children: [
    !n.images && !n.dragAndDrop && /* @__PURE__ */ m(l1, { containerRef: r, enabled: o }),
    !t && s && /* @__PURE__ */ m(
      Kk,
      {
        editor: e,
        suppressWhenLinkPopoverOpen: i,
        aiEnabled: a || !!c,
        onAISparklesClick: (L) => l(L),
        onCopySelectionAsMarkdown: u
      }
    ),
    d && f && /* @__PURE__ */ m(
      d1,
      {
        actions: f,
        scope: d.scope,
        position: d.position,
        onAction: p,
        onClose: h
      }
    ),
    g.status !== "idle" && /* @__PURE__ */ m(
      f1,
      {
        state: g,
        position: y,
        onReplace: v,
        onInsert: b,
        onRetry: x,
        onDiscard: S
      }
    ),
    !n.slashCommands && /* @__PURE__ */ m(n1, { editor: e, disabledFeatures: n }),
    !n.wikiLinks && E && /* @__PURE__ */ m(i1, { editor: e, onSearch: E }),
    /* @__PURE__ */ m(
      Gk,
      {
        editor: e,
        isOpen: i,
        onClose: w
      }
    ),
    /* @__PURE__ */ m(Xk, { editor: e, onEditLink: C }),
    !n.images && k?.isOpen && /* @__PURE__ */ m(
      c1,
      {
        src: k.src,
        alt: k.alt,
        position: k.position,
        onSave: N,
        onDelete: M,
        onClose: D
      }
    )
  ] });
}
function p1({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function h1(e, t) {
  switch (t.type) {
    case "start-streaming":
      return {
        status: "streaming",
        action: t.action,
        actionLabel: t.actionLabel,
        inputText: t.inputText,
        result: "",
        selectionRange: t.selectionRange
      };
    case "append-chunk":
      return e.status !== "streaming" ? e : { ...e, result: e.result + t.text };
    case "complete":
      return e.status !== "streaming" ? e : { ...e, status: "complete" };
    case "error":
      return { status: "error", message: t.message, action: e.status === "streaming" ? e.action : void 0 };
    case "reset":
      return { status: "idle" };
    default:
      return e;
  }
}
function g1(e) {
  const [t, n] = Rd(h1, { status: "idle" }), r = V(null), o = B(async (a, c, l, u, d) => {
    if (e) {
      n({
        type: "start-streaming",
        action: a,
        actionLabel: c,
        inputText: l,
        selectionRange: u
      });
      try {
        const f = e(a, l, d);
        if (Symbol.asyncIterator in Object(f))
          for await (const p of f)
            n({ type: "append-chunk", text: p });
        else {
          const p = await f;
          n({ type: "append-chunk", text: p });
        }
        n({ type: "complete" });
      } catch (f) {
        if (f instanceof DOMException && f.name === "AbortError") {
          n({ type: "reset" });
          return;
        }
        const p = f instanceof Error ? f.message : "AI action failed";
        n({ type: "error", message: p });
      }
    }
  }, [e]), s = B(() => {
    r.current?.(), n({ type: "reset" });
  }, []), i = B(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: o, abort: s, reset: i };
}
const Xu = "paragon-editor-toc-width", y1 = 280, Zu = 200, Qu = 500;
function Qi() {
  try {
    const e = localStorage.getItem(Xu);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= Zu && t <= Qu)
        return t;
    }
  } catch {
  }
  return y1;
}
function v1(e) {
  try {
    localStorage.setItem(Xu, String(e));
  } catch {
  }
}
function b1(e, t, n) {
  const r = [];
  return e.state.doc.descendants((s, i) => {
    if (s.type.name === "heading") {
      const a = s.attrs.level;
      if (a >= t && a <= n) {
        const c = s.textContent;
        c.trim() && r.push({ id: `toc-heading-${i}`, text: c.trim(), level: a, pos: i });
      }
    }
  }), r;
}
function w1(e) {
  if (e.length === 0) return [];
  const t = [], n = [];
  for (const r of e) {
    const o = { ...r, children: [] };
    for (; n.length > 0 && n[n.length - 1].level >= r.level; )
      n.pop();
    if (n.length === 0)
      t.push(o);
    else {
      const s = n[n.length - 1].item;
      s.children || (s.children = []), s.children.push(o);
    }
    n.push({ item: o, level: r.level });
  }
  return t;
}
function Ji(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const ec = Vt(function({
  editor: t,
  visible: n = !0,
  onVisibilityChange: r,
  title: o = "",
  minLevel: s = 1,
  maxLevel: i = 4,
  showLevelIndicators: a = !1,
  highlightActive: c = !0,
  treeView: l = !1,
  className: u = "",
  width: d,
  position: f = "right",
  scrollOffset: p = 20,
  onItemClick: h,
  renderItem: g,
  showToggleButton: y = !0,
  scrollContainerRef: v
}) {
  const [b, x] = U([]), [S, w] = U(null), [C, E] = U(n), [k, N] = U(/* @__PURE__ */ new Set()), [M, D] = U(() => {
    if (d) {
      const z = parseInt(d, 10);
      return isNaN(z) ? Qi() : z;
    }
    return Qi();
  }), L = V(null), P = V(null), O = V(!1), H = V(0), $ = V(0);
  G(() => {
    E(n);
  }, [n]);
  const K = B((z) => {
    z.preventDefault(), z.stopPropagation(), O.current = !0, H.current = z.clientX, $.current = M, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [M]);
  G(() => {
    const z = (Q) => {
      if (!O.current) return;
      const le = f === "right" ? H.current - Q.clientX : Q.clientX - H.current, ue = Math.min(Qu, Math.max(Zu, $.current + le));
      D(ue);
    }, F = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", D((Q) => (v1(Q), Q)));
    };
    return document.addEventListener("mousemove", z), document.addEventListener("mouseup", F), () => {
      document.removeEventListener("mousemove", z), document.removeEventListener("mouseup", F);
    };
  }, [f]);
  const R = B(() => {
    if (!t || t.isDestroyed) return;
    const z = b1(t, s, i);
    x(z), S && !z.find((F) => F.id === S) && w(null);
  }, [t, s, i, S]);
  G(() => {
    if (!t) return;
    const z = () => {
      P.current && clearTimeout(P.current), P.current = setTimeout(() => R(), 300);
    };
    return R(), t.on("update", z), t.on("create", z), () => {
      t.off("update", z), t.off("create", z), P.current && clearTimeout(P.current);
    };
  }, [t, R]), G(() => {
    if (!t || !c || !C || b.length === 0) return;
    const z = v?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!z) return;
    const F = () => {
      const ue = z.getBoundingClientRect();
      let ge = null;
      for (let Se = b.length - 1; Se >= 0; Se--) {
        const Fe = b[Se], wt = Ji(t, Fe.pos);
        if (wt && wt.getBoundingClientRect().top - ue.top <= p + 10) {
          ge = Fe.id;
          break;
        }
      }
      !ge && b.length > 0 && (ge = b[0].id), w(ge);
    };
    let Q;
    const le = () => {
      cancelAnimationFrame(Q), Q = requestAnimationFrame(F);
    };
    return z.addEventListener("scroll", le, { passive: !0 }), F(), () => {
      z.removeEventListener("scroll", le), cancelAnimationFrame(Q);
    };
  }, [t, b, c, C, p, v]);
  const A = B((z) => {
    if (!t || t.isDestroyed) return;
    const F = Ji(t, z.pos);
    if (F) {
      const Q = v?.current || t.view.dom.closest(".editor-content-wrapper");
      if (Q) {
        const le = Q.getBoundingClientRect(), ge = F.getBoundingClientRect().top - le.top + Q.scrollTop;
        Q.scrollTo({ top: ge - p, behavior: "smooth" });
      } else
        F.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(z.pos + 1);
    } catch {
    }
    w(z.id), h?.(z);
  }, [t, p, h, v]), _ = B(() => {
    const z = !C;
    E(z), r?.(z);
  }, [C, r]), Y = B((z) => {
    N((F) => {
      const Q = new Set(F);
      return Q.has(z) ? Q.delete(z) : Q.add(z), Q;
    });
  }, []), j = B((z, F, Q = 0) => {
    if (g)
      return g(z, F, () => A(z));
    const le = (z.level - s) * 14, ue = l && z.children && z.children.length > 0, ge = k.has(z.id);
    return /* @__PURE__ */ m(
      "div",
      {
        className: `toc-item ${F ? "toc-item-active" : ""} toc-level-${z.level}`,
        style: { paddingLeft: `${le + 10}px` },
        children: /* @__PURE__ */ I(
          "button",
          {
            className: "toc-item-button",
            onClick: () => A(z),
            title: z.text,
            children: [
              ue && /* @__PURE__ */ m(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (Se) => {
                    Se.stopPropagation(), Y(z.id);
                  },
                  children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: ge ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ m("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                }
              ),
              a && /* @__PURE__ */ I("span", { className: "toc-level-indicator", children: [
                "H",
                z.level
              ] }),
              /* @__PURE__ */ m("span", { className: "toc-item-text", children: z.text })
            ]
          }
        )
      },
      z.id
    );
  }, [g, A, l, s, a, k, Y]), q = B((z, F = 0) => z.map((Q) => {
    const le = S === Q.id, ue = k.has(Q.id), ge = Q.children && Q.children.length > 0;
    return /* @__PURE__ */ I("div", { children: [
      j(Q, le, F),
      ge && !ue && /* @__PURE__ */ m("div", { className: "toc-children", children: q(Q.children, F + 1) })
    ] }, Q.id);
  }), [S, k, j]), Z = B(() => b.map((z) => {
    const F = S === z.id;
    return j(z, F);
  }), [b, S, j]);
  if (!t) return null;
  const W = l ? w1(b) : [];
  return /* @__PURE__ */ I(be, { children: [
    y && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: _,
        title: C ? "Hide Table of Contents" : "Show Table of Contents",
        children: C ? /* @__PURE__ */ m(bf, { size: 16 }) : /* @__PURE__ */ m(wf, { size: 16 })
      }
    ),
    /* @__PURE__ */ I(
      "div",
      {
        ref: L,
        className: `toc-sidebar ${C ? "toc-visible" : "toc-hidden"} toc-${f} ${u}`,
        style: { width: C ? `${M}px` : "0px" },
        children: [
          C && /* @__PURE__ */ m(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: K
            }
          ),
          /* @__PURE__ */ I("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ m("div", { className: "toc-header", children: /* @__PURE__ */ m("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ m("div", { className: "toc-content toc-content-with-toggle", children: b.length === 0 ? /* @__PURE__ */ I("div", { className: "toc-empty", children: [
              /* @__PURE__ */ m("p", { children: "No headings yet" }),
              /* @__PURE__ */ m("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ m("div", { className: "toc-list", children: l ? q(W) : Z() }) })
          ] })
        ]
      }
    )
  ] });
}), x1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, gC = Pd(function({
  content: t = "",
  onChange: n,
  onHTMLChange: r,
  onMarkdownChange: o,
  placeholder: s = 'Start writing... Use "/" for commands',
  editable: i = !0,
  autofocus: a = !1,
  className: c = "",
  showToolbar: l = !0,
  showWordCount: u = !0,
  theme: d,
  colorTheme: f = "colorful",
  autoSave: p = !0,
  autoSaveKey: h = "paragon-editor-content",
  autoSaveDelay: g = 1e3,
  showRecoveryBanner: y = !0,
  showFloatingToolbar: v = !0,
  maxImageSize: b = 5 * 1024 * 1024,
  onImageUploadStart: x,
  onImageUploadComplete: S,
  onImageUploadError: w,
  onImageUpload: C,
  resolveImageSrc: E,
  showModeToggle: k = !0,
  // New props
  initialMode: N = "wysiwyg",
  onModeChange: M,
  onReady: D,
  onFocus: L,
  onBlur: P,
  onSelectionChange: O,
  onDestroy: H,
  onSave: $,
  onRecover: K,
  onWikiLinkClick: R,
  validateWikiLink: A,
  onWikiLinkSearch: _,
  onLinkClick: Y,
  findReplaceOpen: j,
  onFindReplaceChange: q,
  renderToolbar: Z,
  renderFooter: W,
  disabledFeatures: z = {},
  minHeight: F = "200px",
  maxHeight: Q,
  spellCheck: le = !0,
  headingLevels: ue = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: ge = [1, 2, 3],
  // TOC props
  showTableOfContents: Se = !1,
  tocVisible: Fe = !0,
  onTocVisibilityChange: wt,
  tocTitle: An = "",
  tocMinLevel: Ln = 1,
  tocMaxLevel: ar = 4,
  tocShowLevelIndicators: ir = !1,
  tocHighlightActive: cr = !0,
  tocTreeView: lr = !1,
  tocWidth: ur = "240px",
  tocPosition: Pt = "right",
  tocScrollOffset: Qt = 20,
  onTocItemClick: Jt,
  renderTocItem: dr,
  tocShowToggleButton: fr = !0,
  // Raw markdown editor
  autoClosePairs: Eo = !0,
  // Performance profiler
  showPerformanceProfiler: Do = !1,
  onPerformanceProfilerClose: No,
  // Auto reorder checklist
  autoReorderChecklist: Ao = !1,
  // Expand selection
  progressiveSelectAll: Lo = !1,
  // Auto-detection toggles
  enableTagAutoDetect: mr = !1,
  enableHexColorHighlight: Io = !1,
  enableCollapsibleHeadings: Ro = !1,
  // Performance mode
  performanceMode: In = "auto",
  // Error boundary
  onEditorError: pr,
  // AI writing assistant
  aiActions: xt,
  onAIAction: oe,
  onAISetupRequired: me
}, ne) {
  const [fe] = U(() => x1()), [Ee, de] = U(N), [hr, Rn] = U(""), en = V(N), kt = V(""), ct = V(null), [td, Ta] = U(0), gr = !!(xt && xt.length > 0 && oe), { state: Ue, executeAction: yr, abort: nd, reset: Ct } = g1(oe), [rd, Po] = U(null), [od, sd] = U({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), ad = V(oe);
  ad.current = oe;
  const Sa = V(me);
  Sa.current = me;
  const [id, cd] = U([]), [ld, ud] = U(0), dd = B((se, Ce) => {
    cd(se), ud(Ce);
  }, []), Ea = V(x), Da = V(S), Na = V(w), Aa = V(C), La = V(E), Ia = V(R), Ra = V(A), Pa = V(_);
  Ea.current = x, Da.current = S, Na.current = w, Aa.current = C, La.current = E, Ia.current = R, Ra.current = A, Pa.current = _;
  const Oa = 2e3, [Oo, fd] = U(() => In === "lightweight" ? !0 : In === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > Oa : !1), md = V(0), _a = V(Oo);
  _a.current = Oo;
  const [_o, vr] = U(null), pd = hk({
    placeholder: s,
    isMobile: fe,
    maxImageSize: b,
    headingLevels: ue,
    collapsibleHeadingLevels: ge,
    disabledFeatures: z,
    progressiveSelectAll: Lo,
    enableCollapsibleHeadings: Ro,
    enableTagAutoDetect: mr,
    enableHexColorHighlight: Io,
    isLightweight: Oo,
    setImageEditState: vr,
    callbackRefs: {
      onImageUploadStart: Ea,
      onImageUploadComplete: Da,
      onImageUploadError: Na,
      onImageUpload: Aa,
      resolveImageSrc: La,
      onWikiLinkClick: Ia,
      validateWikiLink: Ra
    }
  }), { editor: re, turndownService: br } = wk({
    extensions: pd,
    content: t,
    editable: i,
    autofocus: a,
    spellCheck: le,
    initialMode: N,
    performanceMode: In,
    lightweightThreshold: Oa,
    onChange: n,
    onHTMLChange: r,
    onMarkdownChange: o,
    onReady: D,
    onDestroy: H,
    onFocus: L,
    onBlur: P,
    onSelectionChange: O,
    onLinkClick: Y,
    editorModeRef: en,
    rawMarkdownRef: kt,
    setRawMarkdown: Rn,
    setIsLightweight: fd,
    lightweightCheckCounterRef: md,
    isLightweightRef: _a
  }), [hd, wr] = U(!1), [gd, yd] = U(!1), vd = j !== void 0 ? j : gd, Ot = B((se) => {
    yd(se), q?.(se);
  }, [q]), [bd, xr] = U(0), [wd, xd] = U(""), _t = Nv(re, {
    storageKey: h,
    debounceMs: g,
    enabled: p,
    onSave: (se) => {
      $?.(se);
    },
    onRecover: (se) => {
      K?.(se);
    }
  }), $o = Pk({
    editor: re,
    turndownService: br,
    editorModeRef: en,
    rawMarkdownRef: kt,
    setEditorMode: de,
    setRawMarkdown: Rn,
    onModeChange: M,
    enableTagAutoDetect: mr,
    disabledFeatures: z
  }), $a = B((se) => {
    Rn(se), kt.current = se, o?.(se);
  }, [o]), kr = _k(re, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: u
  });
  Av(ne, {
    editor: re,
    turndownService: br,
    editorModeRef: en,
    handleModeSwitch: $o,
    wordCount: kr,
    autoSaveState: _t,
    setIsFindReplaceOpen: Ot,
    setFindReplaceFocusTrigger: xr
  }), Rk({
    editorModeRef: en,
    rawMarkdownRef: kt,
    editorMode: Ee,
    handleModeSwitch: $o,
    setIsFindReplaceOpen: Ot,
    setFindReplaceFocusTrigger: xr
  });
  const kd = Yt(() => ({
    openLinkPopover: () => wr(!0),
    openFindReplace: (se) => {
      se && xd(se), Ot(!0), xr((Ce) => Ce + 1);
    },
    openFindReplaceWithReplace: () => {
      Ot(!0);
    }
  }), [Ot]);
  Ik(re, fe, kd);
  const Ha = B((se, Ce) => {
    if (!gr) {
      Sa.current?.();
      return;
    }
    if (!re) return;
    let Ve = { top: 0, left: 0 };
    if (Ce) {
      const _e = Ce.getBoundingClientRect();
      Ve = { top: _e.bottom + 4, left: _e.left };
    } else {
      const { from: _e, to: Mt } = re.state.selection, $t = re.view.coordsAtPos(_e), tn = re.view.coordsAtPos(Mt);
      Ve = { top: tn.bottom + 8, left: ($t.left + tn.left) / 2 };
    }
    Po({ scope: se, position: Ve });
  }, [gr, re]), Cd = B((se, Ce) => {
    if (!re || !xt) return;
    const Ve = xt.find((Ho) => Ho.id === se);
    if (!Ve) return;
    const { from: _e, to: Mt } = re.state.selection, $t = _e !== Mt ? re.state.doc.textBetween(_e, Mt, `
`) : "", tn = Ve.scope === "document" || !$t ? re.getText() : $t, Cr = re.view.coordsAtPos(_e), Mr = re.view.coordsAtPos(Mt);
    sd({
      selectionTop: Cr.top,
      selectionBottom: Mr.bottom,
      selectionCenterX: (Cr.left + Mr.right) / 2
    }), Po(null), yr(se, Ve.label, tn, { from: _e, to: Mt }, Ce);
  }, [re, xt, yr]), Md = B(() => {
    if (!re || Ue.status !== "complete") return;
    const { selectionRange: se, result: Ce } = Ue;
    re.chain().focus().setTextSelection(se).deleteSelection().insertContent(Ce).run(), Ct();
  }, [re, Ue, Ct]), Td = B(() => {
    if (!re || Ue.status !== "complete") return;
    const { selectionRange: se, result: Ce } = Ue;
    re.chain().focus().setTextSelection(se.to).insertContent(`
` + Ce).run(), Ct();
  }, [re, Ue, Ct]), Sd = B(() => {
    if (!(Ue.status !== "complete" && Ue.status !== "error"))
      if (Ue.status === "complete") {
        const { action: se, actionLabel: Ce, inputText: Ve, selectionRange: _e } = Ue;
        Ct(), yr(se, Ce, Ve, _e);
      } else
        Ct();
  }, [Ue, Ct, yr]), Ed = B(() => {
    if (!re) return;
    const { from: se, to: Ce, empty: Ve } = re.state.selection;
    if (Ve) return;
    const _e = re.state.doc.slice(se, Ce), Mt = Sf.fromSchema(re.schema), $t = document.createElement("div"), tn = Mt.serializeFragment(_e.content);
    $t.appendChild(tn);
    const Cr = $t.innerHTML, Mr = to(br.turndown(Cr));
    navigator.clipboard.writeText(Mr).catch(() => {
      const Ho = re.state.doc.textBetween(se, Ce, `
`);
      navigator.clipboard.writeText(Ho);
    });
  }, [re, br]);
  if (!re)
    return /* @__PURE__ */ m(Uk, { className: c, theme: d });
  const Wa = /* @__PURE__ */ m(
    Cv,
    {
      editor: re,
      onOpenLinkPopover: () => wr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Ot(!0), xr((se) => se + 1);
      },
      disabledFeatures: z,
      autoReorderChecklist: Ao,
      aiEnabled: gr || !!me,
      onAISparklesClick: (se) => Ha("document", se)
    }
  ), za = /* @__PURE__ */ I("div", { className: "editor-footer", children: [
    p && /* @__PURE__ */ m(
      $k,
      {
        status: _t.status,
        lastSaved: _t.lastSaved
      }
    ),
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ I("span", { children: [
      kr.words,
      " words"
    ] }) })
  ] }), Dd = {
    minHeight: F,
    ...Q && { maxHeight: Q, overflowY: "auto" }
  };
  return /* @__PURE__ */ I("div", { className: `markdown-editor-container ${f === "neutral" ? "color-theme-neutral" : ""} ${c}`, "data-theme": d, children: [
    p && y && _t.hasRecoverableContent && /* @__PURE__ */ m(
      Hk,
      {
        onRecover: () => {
          _t.recover();
        },
        onDismiss: _t.dismissRecovery
      }
    ),
    l && /* @__PURE__ */ I("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Z ? Z(re, Wa) : Wa,
      k && /* @__PURE__ */ m(Yk, { editorMode: Ee, onModeSwitch: $o })
    ] }),
    !fe && /* @__PURE__ */ m(
      Mv,
      {
        editor: re,
        isOpen: vd,
        onClose: () => Ot(!1),
        focusTrigger: bd,
        initialSearchQuery: wd,
        editorMode: Ee,
        rawMarkdown: hr,
        onRawMarkdownChange: $a,
        onMatchesChange: dd
      }
    ),
    /* @__PURE__ */ m(Ev, { editor: re }),
    /* @__PURE__ */ I("div", { className: `editor-main-area ${Se ? "editor-with-toc" : ""}`, children: [
      Se && Pt === "left" && /* @__PURE__ */ m(
        ec,
        {
          editor: re,
          visible: Fe,
          onVisibilityChange: wt,
          title: An,
          minLevel: Ln,
          maxLevel: ar,
          showLevelIndicators: ir,
          highlightActive: cr,
          treeView: lr,
          width: ur,
          position: Pt,
          scrollOffset: Qt,
          onItemClick: Jt,
          renderItem: dr,
          showToggleButton: fr,
          scrollContainerRef: ct
        }
      ),
      /* @__PURE__ */ I(
        Fk,
        {
          resetKey: `${t}-${td}`,
          onRetry: () => Ta((se) => se + 1),
          onClearContent: () => {
            re && re.commands.clearContent(), n?.(""), r?.(""), o?.(""), Ta((se) => se + 1);
          },
          onError: pr,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: ct, style: Dd, children: Ee === "wysiwyg" ? /* @__PURE__ */ I(be, { children: [
              /* @__PURE__ */ m(Ad, { editor: re, className: "editor-content" }),
              /* @__PURE__ */ m(
                m1,
                {
                  editor: re,
                  isMobile: fe,
                  disabledFeatures: z,
                  containerRef: ct,
                  editable: i,
                  showFloatingToolbar: v,
                  isLinkPopoverOpen: hd,
                  aiEnabled: gr,
                  onAISetupRequired: me,
                  onAISparklesClick: (se) => Ha("selection", se),
                  onCopySelectionAsMarkdown: Ed,
                  aiDropdown: rd,
                  aiActions: xt,
                  onAIActionSelect: Cd,
                  onAIDropdownClose: () => Po(null),
                  aiState: Ue,
                  aiPopoverPosition: od,
                  onAIReplace: Md,
                  onAIInsert: Td,
                  onAIRetry: Sd,
                  onAIDiscard: () => {
                    nd(), Ct();
                  },
                  onLinkPopoverClose: () => wr(!1),
                  onEditLink: () => wr(!0),
                  onWikiLinkSearch: Pa.current,
                  imageEditState: _o,
                  onImageSave: (se, Ce) => {
                    re.chain().focus().setNodeSelection(_o.pos).updateAttributes("resizableImage", {
                      src: se,
                      alt: Ce
                    }).run(), vr(null);
                  },
                  onImageDelete: () => {
                    re.chain().focus().setNodeSelection(_o.pos).deleteSelection().run(), vr(null);
                  },
                  onImageEditClose: () => vr(null)
                }
              )
            ] }) : /* @__PURE__ */ m(
              Wk,
              {
                content: hr,
                onChange: $a,
                placeholder: "Write your markdown here...",
                editable: i,
                autofocus: !0,
                searchMatches: id,
                currentMatchIndex: ld,
                autoClosePairs: Eo
              }
            ) }),
            /* @__PURE__ */ m(p1, { scrollContainerRef: ct })
          ]
        }
      ),
      Se && Pt === "right" && /* @__PURE__ */ m(
        ec,
        {
          editor: re,
          visible: Fe,
          onVisibilityChange: wt,
          title: An,
          minLevel: Ln,
          maxLevel: ar,
          showLevelIndicators: ir,
          highlightActive: cr,
          treeView: lr,
          width: ur,
          position: Pt,
          scrollOffset: Qt,
          onItemClick: Jt,
          renderItem: dr,
          showToggleButton: fr,
          scrollContainerRef: ct
        }
      )
    ] }),
    u && (W ? W(
      { words: kr.words, characters: kr.characters },
      _t.status,
      za
    ) : za),
    /* @__PURE__ */ m(Bk, { visible: Do, onClose: No, editor: re })
  ] });
}), yC = uo.create({
  name: "callout",
  addOptions() {
    return {
      HTMLAttributes: {},
      types: ["info", "note", "prompt", "resources", "todo", "summary"]
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      type: {
        default: "info",
        parseHTML: (e) => e.getAttribute("data-type") || "info",
        renderHTML: (e) => ({
          "data-type": e.type
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-callout]"
      }
    ];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.type;
    return [
      "div",
      Cn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addCommands() {
    return {
      setCallout: (e) => ({ commands: t }) => t.wrapIn(this.name, e),
      toggleCallout: (e) => ({ commands: t }) => t.toggleWrap(this.name, e),
      unsetCallout: () => ({ commands: e }) => e.lift(this.name),
      insertCallout: (e) => ({ chain: t }) => {
        const n = e?.type || "info";
        return t().insertContent({
          type: this.name,
          attrs: { type: n },
          content: [{ type: "paragraph" }]
        }).focus().run();
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-c": () => this.editor.commands.toggleCallout({ type: "info" })
    };
  }
}), Ju = {
  name: "dark",
  description: "Dark theme inspired by VS Code and GitHub Dark",
  variables: {
    // Base colors
    "--editor-bg": "oklch(0.13 0.01 250)",
    "--editor-fg": "oklch(0.93 0.01 250)",
    "--editor-border": "oklch(0.28 0.01 250)",
    // Primary accent
    "--editor-primary": "oklch(0.7 0.15 220)",
    "--editor-primary-fg": "oklch(0.13 0.01 250)",
    // Secondary
    "--editor-secondary": "oklch(0.22 0.01 250)",
    "--editor-secondary-fg": "oklch(0.75 0.02 250)",
    // Muted
    "--editor-muted": "oklch(0.25 0.01 250)",
    "--editor-muted-fg": "oklch(0.6 0.02 250)",
    // Selection
    "--editor-selection": "oklch(0.35 0.08 220 / 0.4)",
    "--editor-cursor": "oklch(0.7 0.15 220)",
    // Code block
    "--editor-code-bg": "oklch(0.17 0.01 250)",
    "--editor-line-number": "oklch(0.45 0.02 250)",
    // Callouts
    "--editor-callout-info": "oklch(0.5 0.12 220)",
    "--editor-callout-warning": "oklch(0.6 0.15 70)",
    "--editor-callout-error": "oklch(0.5 0.15 25)",
    "--editor-callout-success": "oklch(0.5 0.12 160)",
    "--editor-callout-note": "oklch(0.5 0.12 280)",
    // Syntax highlighting
    "--syntax-keyword": "oklch(0.7 0.18 320)",
    "--syntax-string": "oklch(0.7 0.12 160)",
    "--syntax-number": "oklch(0.75 0.12 70)",
    "--syntax-comment": "oklch(0.5 0.02 250)",
    "--syntax-function": "oklch(0.75 0.15 280)",
    "--syntax-variable": "oklch(0.8 0.1 220)"
  }
}, k1 = {
  name: "light",
  description: "Light theme for bright environments",
  variables: {
    // Base colors
    "--editor-bg": "oklch(0.99 0.005 250)",
    "--editor-fg": "oklch(0.2 0.01 250)",
    "--editor-border": "oklch(0.88 0.01 250)",
    // Primary accent
    "--editor-primary": "oklch(0.55 0.2 220)",
    "--editor-primary-fg": "oklch(0.99 0.005 250)",
    // Secondary
    "--editor-secondary": "oklch(0.95 0.01 250)",
    "--editor-secondary-fg": "oklch(0.4 0.02 250)",
    // Muted
    "--editor-muted": "oklch(0.92 0.01 250)",
    "--editor-muted-fg": "oklch(0.5 0.02 250)",
    // Selection
    "--editor-selection": "oklch(0.7 0.12 220 / 0.3)",
    "--editor-cursor": "oklch(0.55 0.2 220)",
    // Code block
    "--editor-code-bg": "oklch(0.96 0.005 250)",
    "--editor-line-number": "oklch(0.6 0.02 250)",
    // Callouts
    "--editor-callout-info": "oklch(0.6 0.15 220)",
    "--editor-callout-warning": "oklch(0.7 0.18 70)",
    "--editor-callout-error": "oklch(0.6 0.18 25)",
    "--editor-callout-success": "oklch(0.6 0.15 160)",
    "--editor-callout-note": "oklch(0.6 0.15 280)",
    // Syntax highlighting
    "--syntax-keyword": "oklch(0.5 0.2 320)",
    "--syntax-string": "oklch(0.45 0.15 160)",
    "--syntax-number": "oklch(0.5 0.15 70)",
    "--syntax-comment": "oklch(0.55 0.02 250)",
    "--syntax-function": "oklch(0.5 0.18 280)",
    "--syntax-variable": "oklch(0.45 0.12 220)"
  }
}, C1 = {
  name: "sepia",
  description: "Warm sepia tones for comfortable reading",
  variables: {
    // Base colors
    "--editor-bg": "oklch(0.95 0.02 80)",
    "--editor-fg": "oklch(0.25 0.02 60)",
    "--editor-border": "oklch(0.85 0.03 70)",
    // Primary accent
    "--editor-primary": "oklch(0.55 0.15 50)",
    "--editor-primary-fg": "oklch(0.98 0.01 80)",
    // Secondary
    "--editor-secondary": "oklch(0.9 0.025 75)",
    "--editor-secondary-fg": "oklch(0.4 0.02 60)",
    // Muted
    "--editor-muted": "oklch(0.88 0.02 75)",
    "--editor-muted-fg": "oklch(0.5 0.02 60)",
    // Selection
    "--editor-selection": "oklch(0.7 0.1 50 / 0.3)",
    "--editor-cursor": "oklch(0.55 0.15 50)",
    // Code block
    "--editor-code-bg": "oklch(0.92 0.02 75)",
    "--editor-line-number": "oklch(0.6 0.02 60)",
    // Callouts
    "--editor-callout-info": "oklch(0.55 0.12 220)",
    "--editor-callout-warning": "oklch(0.65 0.15 50)",
    "--editor-callout-error": "oklch(0.55 0.15 25)",
    "--editor-callout-success": "oklch(0.55 0.12 160)",
    "--editor-callout-note": "oklch(0.55 0.12 280)",
    // Syntax highlighting
    "--syntax-keyword": "oklch(0.5 0.15 320)",
    "--syntax-string": "oklch(0.45 0.12 160)",
    "--syntax-number": "oklch(0.5 0.12 50)",
    "--syntax-comment": "oklch(0.55 0.02 60)",
    "--syntax-function": "oklch(0.5 0.15 280)",
    "--syntax-variable": "oklch(0.45 0.1 220)"
  }
}, M1 = {
  name: "nord",
  description: "Arctic, north-bluish color palette",
  variables: {
    // Base colors (Nord Polar Night)
    "--editor-bg": "oklch(0.23 0.02 240)",
    "--editor-fg": "oklch(0.9 0.01 230)",
    "--editor-border": "oklch(0.32 0.02 240)",
    // Primary accent (Nord Frost)
    "--editor-primary": "oklch(0.72 0.1 210)",
    "--editor-primary-fg": "oklch(0.23 0.02 240)",
    // Secondary
    "--editor-secondary": "oklch(0.28 0.02 240)",
    "--editor-secondary-fg": "oklch(0.75 0.01 230)",
    // Muted
    "--editor-muted": "oklch(0.35 0.02 240)",
    "--editor-muted-fg": "oklch(0.6 0.01 230)",
    // Selection
    "--editor-selection": "oklch(0.5 0.08 210 / 0.4)",
    "--editor-cursor": "oklch(0.72 0.1 210)",
    // Code block
    "--editor-code-bg": "oklch(0.26 0.02 240)",
    "--editor-line-number": "oklch(0.5 0.01 230)",
    // Callouts (Nord Aurora)
    "--editor-callout-info": "oklch(0.68 0.12 210)",
    "--editor-callout-warning": "oklch(0.75 0.12 80)",
    "--editor-callout-error": "oklch(0.65 0.15 15)",
    "--editor-callout-success": "oklch(0.7 0.12 150)",
    "--editor-callout-note": "oklch(0.7 0.1 280)",
    // Syntax highlighting
    "--syntax-keyword": "oklch(0.7 0.12 280)",
    "--syntax-string": "oklch(0.7 0.1 150)",
    "--syntax-number": "oklch(0.75 0.1 280)",
    "--syntax-comment": "oklch(0.55 0.01 230)",
    "--syntax-function": "oklch(0.72 0.1 210)",
    "--syntax-variable": "oklch(0.9 0.01 230)"
  }
}, zn = {
  dark: Ju,
  light: k1,
  sepia: C1,
  nord: M1
};
function T1(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function vC(e, t, n, r) {
  const o = zn[e] || Ju;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const ed = rc(null);
function bC({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = U(t), s = zn[r] || zn.dark, i = B((c) => {
    zn[c] && o(c);
  }, []);
  G(() => {
    n?.current && T1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(zn)
  };
  return /* @__PURE__ */ m(ed.Provider, { value: a, children: e });
}
function wC() {
  const e = oc(ed);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const tc = [
  { value: "plaintext", label: "Plain Text" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "scss", label: "SCSS" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "markdown", label: "Markdown" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
  { value: "shell", label: "Shell" }
];
function xC({ node: e, updateAttributes: t }) {
  const [n, r] = U(!1), o = e.attrs.language || "plaintext";
  tc.find((i) => i.value === o)?.label;
  const s = B(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ I(bn, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ I("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ I("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: tc.map(({ value: i, label: a }) => /* @__PURE__ */ m("option", { value: i, children: a }, i))
          }
        ),
        /* @__PURE__ */ m(At, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ m(Gt, { size: 14 }) : /* @__PURE__ */ m(Kt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m(Rs, {}) }) })
  ] });
}
export {
  $k as AutoSaveIndicator,
  yC as Callout,
  Px as CalloutInputRule,
  xC as CodeBlockComponent,
  Nx as CollapsibleHeading,
  Xv as CollapsibleList,
  px as DatePill,
  bC as EditorThemeProvider,
  Cv as EditorToolbar,
  Mv as FindReplace,
  Kk as FloatingToolbar,
  l1 as ImageDropZone,
  pk as ImageUpload,
  gC as MarkdownEditor,
  Ix as MarkdownLinkInputRule,
  Sx as MarkdownPasteSafe,
  Yv as MixedBulletList,
  Gv as MixedListItem,
  jv as MixedOrderedList,
  Kv as MixedTaskItem,
  Vv as MixedTaskList,
  Hk as RecoveryBanner,
  nb as ResizableImage,
  Ox as SearchHighlight,
  Ev as SelectAllActionBar,
  ak as SelectAllOccurrences,
  n1 as SlashCommands,
  Hx as TabIndent,
  ec as TableOfContents,
  yx as TagPill,
  bx as WikiLinkSafe,
  T1 as applyTheme,
  vC as createCustomTheme,
  Ju as darkTheme,
  Ma as getDateVariant,
  un as isValidTag,
  k1 as lightTheme,
  Zv as loadLanguageIfNeeded,
  ve as lowlight,
  M1 as nordTheme,
  Un as normalizeTag,
  zt as parseDateFromMarkdown,
  C1 as sepiaTheme,
  zn as themes,
  Nv as useAutoSave,
  wC as useEditorTheme,
  _k as useWordCount
};
//# sourceMappingURL=paragon.js.map
