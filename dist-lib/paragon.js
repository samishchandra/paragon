import { jsxs as L, jsx as m, Fragment as xe } from "react/jsx-runtime";
import { useEditorState as tc, ReactNodeViewRenderer as ro, NodeViewWrapper as pn, NodeViewContent as Ds, useEditor as Td, EditorContent as Dd } from "@tiptap/react";
import * as E from "react";
import X, { useState as Y, useRef as j, useEffect as q, useLayoutEffect as oo, memo as vn, useCallback as B, useImperativeHandle as Nd, createContext as nc, useContext as rc, useMemo as Ft, Component as Ad, useReducer as Ld, forwardRef as Rd } from "react";
import { Image as Ns, X as ht, Link2 as As, Type as so, Undo as Id, Redo as Pd, Bold as Ls, Italic as Rs, Underline as Is, Strikethrough as Ps, Code as oc, Highlighter as sc, Link as Os, ChevronDown as Nt, List as _s, ListOrdered as $s, CheckSquare as Hs, Quote as Ws, Code2 as ac, IndentIncrease as Od, IndentDecrease as _d, Table as ss, Minus as ic, Info as jr, BookOpen as zs, PenLine as $d, Library as Hd, ListTodo as Bs, Columns as Wa, Trash2 as sn, Rows as za, ToggleLeft as Ba, ArrowUpDown as Wd, Sparkles as ao, Copy as bn, Search as zd, ChevronUp as Bd, MousePointerClick as Fd, CaseSensitive as Ud, WholeWord as Yd, Regex as jd, Replace as as, ReplaceAll as Vd, Plus as Fs, Check as wn, MessageSquareText as cc, StickyNote as lc, ChevronRight as uc, ChevronLeftIcon as Kd, ChevronRightIcon as Gd, ChevronDownIcon as qd, Calendar as dc, Hash as Fa, Cloud as Xd, Loader2 as fc, CloudOff as Zd, AlertCircle as Qd, RotateCcw as Us, Activity as Jd, Maximize2 as mc, Minimize2 as pc, AlertTriangle as ef, CheckCircle2 as tf, Eye as nf, FileText as Ys, FileCode as rf, ExternalLink as of, Pencil as sf, Unlink as af, Heading1 as cf, Heading2 as lf, Heading3 as uf, Heading4 as df, Heading5 as ff, ImagePlus as mf, MessageSquare as hc, RefreshCw as pf, SpellCheck as hf, PanelRightClose as gf, PanelRightOpen as yf } from "lucide-react";
import * as gc from "react-dom";
import vf, { createPortal as bf } from "react-dom";
import { TextSelection as nt, Plugin as Re, PluginKey as Ie, AllSelection as wf } from "@tiptap/pm/state";
import xf from "@tiptap/starter-kit";
import kf from "@tiptap/extension-placeholder";
import Cf from "@tiptap/extension-text-align";
import Mf from "@tiptap/extension-highlight";
import Sf from "@tiptap/extension-link";
import { Table as Ef } from "@tiptap/extension-table";
import Tf from "@tiptap/extension-table-row";
import Df from "@tiptap/extension-table-cell";
import Nf from "@tiptap/extension-table-header";
import { DecorationSet as _e, Decoration as Ye } from "@tiptap/pm/view";
import { Extension as Ze, Node as io, mergeAttributes as xn, InputRule as Oe, Mark as yc } from "@tiptap/core";
import Af from "@tiptap/extension-bullet-list";
import Lf from "@tiptap/extension-ordered-list";
import Rf from "@tiptap/extension-list-item";
import If from "@tiptap/extension-task-list";
import Pf from "@tiptap/extension-task-item";
import { findWrapping as Ua, canJoin as Of } from "@tiptap/pm/transform";
import _f from "@tiptap/extension-underline";
import $f from "@tiptap/extension-subscript";
import Hf from "@tiptap/extension-superscript";
import Wf from "@tiptap/extension-typography";
import zf from "@tiptap/extension-code-block-lowlight";
import { createLowlight as Bf } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import Vs from "highlight.js/lib/languages/typescript";
import vc from "highlight.js/lib/languages/python";
import Ks from "highlight.js/lib/languages/xml";
import Ff from "highlight.js/lib/languages/css";
import Uf from "highlight.js/lib/languages/json";
import co from "highlight.js/lib/languages/bash";
import Yf from "@tiptap/extension-image";
import { createRoot as jf } from "react-dom/client";
import { Fragment as Vf } from "@tiptap/pm/model";
import { liftListItem as Ya, sinkListItem as ja } from "@tiptap/pm/schema-list";
import { undo as Kf, redo as Gf } from "@tiptap/pm/history";
import qf from "@tiptap/extension-horizontal-rule";
function bc({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = Y(""), [i, a] = Y(""), [c, l] = Y(""), [u, d] = Y(!1), f = j(null), p = j(null);
  q(() => {
    e && (s(""), a(""), l(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), q(() => {
    if (!e) return;
    const b = (x) => {
      p.current && !p.current.contains(x.target) && t();
    }, w = (x) => {
      x.key === "Escape" && t();
    }, S = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return document.addEventListener("keydown", w), () => {
      clearTimeout(S), document.removeEventListener("mousedown", b), document.removeEventListener("keydown", w);
    };
  }, [e, t]);
  const h = (b) => {
    if (!b.trim())
      return l("Please enter an image URL"), !1;
    try {
      const w = new URL(b);
      if (!["http:", "https:", "data:"].includes(w.protocol))
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
  return /* @__PURE__ */ L(
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
        /* @__PURE__ */ L("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ L("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ m(Ns, { size: 16, className: "text-primary" }),
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
        /* @__PURE__ */ L("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ L("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ L("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(As, { size: 12 }),
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
          /* @__PURE__ */ L("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ L("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(so, { size: 12 }),
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
          /* @__PURE__ */ L("div", { className: "image-url-dialog-actions", children: [
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
function se(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function Va(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function lo(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = Va(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : Va(e[o], null);
        }
      };
  };
}
function Le(...e) {
  return E.useCallback(lo(...e), e);
}
function kn(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = E.createContext(i), c = n.length;
    n = [...n, i];
    const l = (d) => {
      const { scope: f, children: p, ...h } = d, g = f?.[e]?.[c] || a, y = E.useMemo(() => h, Object.values(h));
      return /* @__PURE__ */ m(g.Provider, { value: y, children: p });
    };
    l.displayName = s + "Provider";
    function u(d, f) {
      const p = f?.[e]?.[c] || a, h = E.useContext(p);
      if (h) return h;
      if (i !== void 0) return i;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [l, u];
  }
  const o = () => {
    const s = n.map((i) => E.createContext(i));
    return function(a) {
      const c = a?.[e] || s;
      return E.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: c } }),
        [a, c]
      );
    };
  };
  return o.scopeName = e, [r, Xf(o, ...t)];
}
function Xf(...e) {
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
      return E.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var At = globalThis?.document ? E.useLayoutEffect : () => {
}, Zf = E[" useInsertionEffect ".trim().toString()] || At;
function Gs({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = Qf({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, c = a ? e : o;
  {
    const u = E.useRef(e !== void 0);
    E.useEffect(() => {
      const d = u.current;
      d !== a && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = a;
    }, [a, r]);
  }
  const l = E.useCallback(
    (u) => {
      if (a) {
        const d = Jf(u) ? u(e) : u;
        d !== e && i.current?.(d);
      } else
        s(u);
    },
    [a, e, s, i]
  );
  return [c, l];
}
function Qf({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = E.useState(e), o = E.useRef(n), s = E.useRef(t);
  return Zf(() => {
    s.current = t;
  }, [t]), E.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function Jf(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function Fn(e) {
  const t = /* @__PURE__ */ tm(e), n = E.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = E.Children.toArray(s), c = a.find(rm);
    if (c) {
      const l = c.props.children, u = a.map((d) => d === c ? E.Children.count(l) > 1 ? E.Children.only(null) : E.isValidElement(l) ? l.props.children : null : d);
      return /* @__PURE__ */ m(t, { ...i, ref: o, children: E.isValidElement(l) ? E.cloneElement(l, void 0, u) : null });
    }
    return /* @__PURE__ */ m(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var em = /* @__PURE__ */ Fn("Slot");
// @__NO_SIDE_EFFECTS__
function tm(e) {
  const t = E.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (E.isValidElement(o)) {
      const i = sm(o), a = om(s, o.props);
      return o.type !== E.Fragment && (a.ref = r ? lo(r, i) : i), E.cloneElement(o, a);
    }
    return E.Children.count(o) > 1 ? E.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var wc = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function nm(e) {
  const t = ({ children: n }) => /* @__PURE__ */ m(xe, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = wc, t;
}
function rm(e) {
  return E.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === wc;
}
function om(e, t) {
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
function sm(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var am = [
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
], De = am.reduce((e, t) => {
  const n = /* @__PURE__ */ Fn(`Primitive.${t}`), r = E.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(c, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function xc(e, t) {
  e && gc.flushSync(() => e.dispatchEvent(t));
}
function kc(e) {
  const t = e + "CollectionProvider", [n, r] = kn(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (g) => {
    const { scope: y, children: v } = g, b = X.useRef(null), w = X.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ m(o, { scope: y, itemMap: w, collectionRef: b, children: v });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ Fn(a), l = X.forwardRef(
    (g, y) => {
      const { scope: v, children: b } = g, w = s(a, v), S = Le(y, w.collectionRef);
      return /* @__PURE__ */ m(c, { ref: S, children: b });
    }
  );
  l.displayName = a;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ Fn(u), p = X.forwardRef(
    (g, y) => {
      const { scope: v, children: b, ...w } = g, S = X.useRef(null), x = Le(y, S), k = s(u, v);
      return X.useEffect(() => (k.itemMap.set(S, { ref: S, ...w }), () => void k.itemMap.delete(S))), /* @__PURE__ */ m(f, { [d]: "", ref: x, children: b });
    }
  );
  p.displayName = u;
  function h(g) {
    const y = s(e + "CollectionConsumer", g);
    return X.useCallback(() => {
      const b = y.collectionRef.current;
      if (!b) return [];
      const w = Array.from(b.querySelectorAll(`[${d}]`));
      return Array.from(y.itemMap.values()).sort(
        (k, D) => w.indexOf(k.ref.current) - w.indexOf(D.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: i, Slot: l, ItemSlot: p },
    h,
    r
  ];
}
var im = E.createContext(void 0);
function Cc(e) {
  const t = E.useContext(im);
  return e || t || "ltr";
}
function gt(e) {
  const t = E.useRef(e);
  return E.useEffect(() => {
    t.current = e;
  }), E.useMemo(() => (...n) => t.current?.(...n), []);
}
function cm(e, t = globalThis?.document) {
  const n = gt(e);
  E.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var lm = "DismissableLayer", is = "dismissableLayer.update", um = "dismissableLayer.pointerDownOutside", dm = "dismissableLayer.focusOutside", Ka, Mc = E.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), qs = E.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...c
    } = e, l = E.useContext(Mc), [u, d] = E.useState(null), f = u?.ownerDocument ?? globalThis?.document, [, p] = E.useState({}), h = Le(t, (D) => d(D)), g = Array.from(l.layers), [y] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), v = g.indexOf(y), b = u ? g.indexOf(u) : -1, w = l.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= v, x = pm((D) => {
      const C = D.target, M = [...l.branches].some((T) => T.contains(C));
      !S || M || (o?.(D), i?.(D), D.defaultPrevented || a?.());
    }, f), k = hm((D) => {
      const C = D.target;
      [...l.branches].some((T) => T.contains(C)) || (s?.(D), i?.(D), D.defaultPrevented || a?.());
    }, f);
    return cm((D) => {
      b === l.layers.size - 1 && (r?.(D), !D.defaultPrevented && a && (D.preventDefault(), a()));
    }, f), E.useEffect(() => {
      if (u)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (Ka = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(u)), l.layers.add(u), Ga(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = Ka);
        };
    }, [u, f, n, l]), E.useEffect(() => () => {
      u && (l.layers.delete(u), l.layersWithOutsidePointerEventsDisabled.delete(u), Ga());
    }, [u, l]), E.useEffect(() => {
      const D = () => p({});
      return document.addEventListener(is, D), () => document.removeEventListener(is, D);
    }, []), /* @__PURE__ */ m(
      De.div,
      {
        ...c,
        ref: h,
        style: {
          pointerEvents: w ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: se(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: se(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: se(
          e.onPointerDownCapture,
          x.onPointerDownCapture
        )
      }
    );
  }
);
qs.displayName = lm;
var fm = "DismissableLayerBranch", mm = E.forwardRef((e, t) => {
  const n = E.useContext(Mc), r = E.useRef(null), o = Le(t, r);
  return E.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ m(De.div, { ...e, ref: o });
});
mm.displayName = fm;
function pm(e, t = globalThis?.document) {
  const n = gt(e), r = E.useRef(!1), o = E.useRef(() => {
  });
  return E.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let c = function() {
          Sc(
            um,
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
function hm(e, t = globalThis?.document) {
  const n = gt(e), r = E.useRef(!1);
  return E.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Sc(dm, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Ga() {
  const e = new CustomEvent(is);
  document.dispatchEvent(e);
}
function Sc(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? xc(o, s) : o.dispatchEvent(s);
}
var Oo = 0;
function gm() {
  E.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? qa()), document.body.insertAdjacentElement("beforeend", e[1] ?? qa()), Oo++, () => {
      Oo === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Oo--;
    };
  }, []);
}
function qa() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var _o = "focusScope.autoFocusOnMount", $o = "focusScope.autoFocusOnUnmount", Xa = { bubbles: !1, cancelable: !0 }, ym = "FocusScope", Ec = E.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, c] = E.useState(null), l = gt(o), u = gt(s), d = E.useRef(null), f = Le(t, (g) => c(g)), p = E.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  E.useEffect(() => {
    if (r) {
      let g = function(w) {
        if (p.paused || !a) return;
        const S = w.target;
        a.contains(S) ? d.current = S : Tt(d.current, { select: !0 });
      }, y = function(w) {
        if (p.paused || !a) return;
        const S = w.relatedTarget;
        S !== null && (a.contains(S) || Tt(d.current, { select: !0 }));
      }, v = function(w) {
        if (document.activeElement === document.body)
          for (const x of w)
            x.removedNodes.length > 0 && Tt(a);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", y);
      const b = new MutationObserver(v);
      return a && b.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", y), b.disconnect();
      };
    }
  }, [r, a, p.paused]), E.useEffect(() => {
    if (a) {
      Qa.add(p);
      const g = document.activeElement;
      if (!a.contains(g)) {
        const v = new CustomEvent(_o, Xa);
        a.addEventListener(_o, l), a.dispatchEvent(v), v.defaultPrevented || (vm(Cm(Tc(a)), { select: !0 }), document.activeElement === g && Tt(a));
      }
      return () => {
        a.removeEventListener(_o, l), setTimeout(() => {
          const v = new CustomEvent($o, Xa);
          a.addEventListener($o, u), a.dispatchEvent(v), v.defaultPrevented || Tt(g ?? document.body, { select: !0 }), a.removeEventListener($o, u), Qa.remove(p);
        }, 0);
      };
    }
  }, [a, l, u, p]);
  const h = E.useCallback(
    (g) => {
      if (!n && !r || p.paused) return;
      const y = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, v = document.activeElement;
      if (y && v) {
        const b = g.currentTarget, [w, S] = bm(b);
        w && S ? !g.shiftKey && v === S ? (g.preventDefault(), n && Tt(w, { select: !0 })) : g.shiftKey && v === w && (g.preventDefault(), n && Tt(S, { select: !0 })) : v === b && g.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ m(De.div, { tabIndex: -1, ...i, ref: f, onKeyDown: h });
});
Ec.displayName = ym;
function vm(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Tt(r, { select: t }), document.activeElement !== n) return;
}
function bm(e) {
  const t = Tc(e), n = Za(t, e), r = Za(t.reverse(), e);
  return [n, r];
}
function Tc(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Za(e, t) {
  for (const n of e)
    if (!wm(n, { upTo: t })) return n;
}
function wm(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function xm(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Tt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && xm(e) && t && e.select();
  }
}
var Qa = km();
function km() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Ja(e, t), e.unshift(t);
    },
    remove(t) {
      e = Ja(e, t), e[0]?.resume();
    }
  };
}
function Ja(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Cm(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Mm = E[" useId ".trim().toString()] || (() => {
}), Sm = 0;
function Vr(e) {
  const [t, n] = E.useState(Mm());
  return At(() => {
    n((r) => r ?? String(Sm++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Em = ["top", "right", "bottom", "left"], Lt = Math.min, He = Math.max, Kr = Math.round, kr = Math.floor, rt = (e) => ({
  x: e,
  y: e
}), Tm = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Dm = {
  start: "end",
  end: "start"
};
function cs(e, t, n) {
  return He(e, Lt(t, n));
}
function yt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function vt(e) {
  return e.split("-")[0];
}
function Cn(e) {
  return e.split("-")[1];
}
function Xs(e) {
  return e === "x" ? "y" : "x";
}
function Zs(e) {
  return e === "y" ? "height" : "width";
}
const Nm = /* @__PURE__ */ new Set(["top", "bottom"]);
function et(e) {
  return Nm.has(vt(e)) ? "y" : "x";
}
function Qs(e) {
  return Xs(et(e));
}
function Am(e, t, n) {
  n === void 0 && (n = !1);
  const r = Cn(e), o = Qs(e), s = Zs(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = Gr(i)), [i, Gr(i)];
}
function Lm(e) {
  const t = Gr(e);
  return [ls(e), t, ls(t)];
}
function ls(e) {
  return e.replace(/start|end/g, (t) => Dm[t]);
}
const ei = ["left", "right"], ti = ["right", "left"], Rm = ["top", "bottom"], Im = ["bottom", "top"];
function Pm(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ti : ei : t ? ei : ti;
    case "left":
    case "right":
      return t ? Rm : Im;
    default:
      return [];
  }
}
function Om(e, t, n, r) {
  const o = Cn(e);
  let s = Pm(vt(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(ls)))), s;
}
function Gr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Tm[t]);
}
function _m(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Dc(e) {
  return typeof e != "number" ? _m(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function qr(e) {
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
function ni(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = et(t), i = Qs(t), a = Zs(i), c = vt(t), l = s === "y", u = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
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
  switch (Cn(t)) {
    case "start":
      p[i] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      p[i] += f * (n && l ? -1 : 1);
      break;
  }
  return p;
}
const $m = async (e, t, n) => {
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
  } = ni(l, r, c), f = r, p = {}, h = 0;
  for (let g = 0; g < a.length; g++) {
    const {
      name: y,
      fn: v
    } = a[g], {
      x: b,
      y: w,
      data: S,
      reset: x
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
    u = b ?? u, d = w ?? d, p = {
      ...p,
      [y]: {
        ...p[y],
        ...S
      }
    }, x && h <= 50 && (h++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : x.rects), {
      x: u,
      y: d
    } = ni(l, f, c)), g = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function Un(e, t) {
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
  } = yt(t, e), h = Dc(p), y = a[f ? d === "floating" ? "reference" : "floating" : d], v = qr(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), b = d === "floating" ? {
    x: r,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), S = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, x = qr(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: b,
    offsetParent: w,
    strategy: c
  }) : b);
  return {
    top: (v.top - x.top + h.top) / S.y,
    bottom: (x.bottom - v.bottom + h.bottom) / S.y,
    left: (v.left - x.left + h.left) / S.x,
    right: (x.right - v.right + h.right) / S.x
  };
}
const Hm = (e) => ({
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
    const d = Dc(u), f = {
      x: n,
      y: r
    }, p = Qs(o), h = Zs(p), g = await i.getDimensions(l), y = p === "y", v = y ? "top" : "left", b = y ? "bottom" : "right", w = y ? "clientHeight" : "clientWidth", S = s.reference[h] + s.reference[p] - f[p] - s.floating[h], x = f[p] - s.reference[p], k = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let D = k ? k[w] : 0;
    (!D || !await (i.isElement == null ? void 0 : i.isElement(k))) && (D = a.floating[w] || s.floating[h]);
    const C = S / 2 - x / 2, M = D / 2 - g[h] / 2 - 1, T = Lt(d[v], M), N = Lt(d[b], M), A = T, P = D - g[h] - N, O = D / 2 - g[h] / 2 + C, $ = cs(A, O, P), _ = !c.arrow && Cn(o) != null && O !== $ && s.reference[h] / 2 - (O < A ? T : N) - g[h] / 2 < 0, U = _ ? O < A ? O - A : O - P : 0;
    return {
      [p]: f[p] + U,
      data: {
        [p]: $,
        centerOffset: O - $ - U,
        ..._ && {
          alignmentOffset: U
        }
      },
      reset: _
    };
  }
}), Wm = function(e) {
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
      const v = vt(o), b = et(a), w = vt(a) === a, S = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), x = f || (w || !g ? [Gr(a)] : Lm(a)), k = h !== "none";
      !f && k && x.push(...Om(a, g, h, S));
      const D = [a, ...x], C = await Un(t, y), M = [];
      let T = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (u && M.push(C[v]), d) {
        const O = Am(o, i, S);
        M.push(C[O[0]], C[O[1]]);
      }
      if (T = [...T, {
        placement: o,
        overflows: M
      }], !M.every((O) => O <= 0)) {
        var N, A;
        const O = (((N = s.flip) == null ? void 0 : N.index) || 0) + 1, $ = D[O];
        if ($ && (!(d === "alignment" ? b !== et($) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        T.every((I) => et(I.placement) === b ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: T
            },
            reset: {
              placement: $
            }
          };
        let _ = (A = T.filter((U) => U.overflows[0] <= 0).sort((U, I) => U.overflows[1] - I.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!_)
          switch (p) {
            case "bestFit": {
              var P;
              const U = (P = T.filter((I) => {
                if (k) {
                  const R = et(I.placement);
                  return R === b || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  R === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((R) => R > 0).reduce((R, W) => R + W, 0)]).sort((I, R) => I[1] - R[1])[0]) == null ? void 0 : P[0];
              U && (_ = U);
              break;
            }
            case "initialPlacement":
              _ = a;
              break;
          }
        if (o !== _)
          return {
            reset: {
              placement: _
            }
          };
      }
      return {};
    }
  };
};
function ri(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function oi(e) {
  return Em.some((t) => e[t] >= 0);
}
const zm = function(e) {
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
          const s = await Un(t, {
            ...o,
            elementContext: "reference"
          }), i = ri(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: oi(i)
            }
          };
        }
        case "escaped": {
          const s = await Un(t, {
            ...o,
            altBoundary: !0
          }), i = ri(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: oi(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Nc = /* @__PURE__ */ new Set(["left", "top"]);
async function Bm(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = vt(n), a = Cn(n), c = et(n) === "y", l = Nc.has(i) ? -1 : 1, u = s && c ? -1 : 1, d = yt(t, e);
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
const Fm = function(e) {
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
      } = t, c = await Bm(t, e);
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
}, Um = function(e) {
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
      }, u = await Un(t, c), d = et(vt(o)), f = Xs(d);
      let p = l[f], h = l[d];
      if (s) {
        const y = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", b = p + u[y], w = p - u[v];
        p = cs(b, p, w);
      }
      if (i) {
        const y = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", b = h + u[y], w = h - u[v];
        h = cs(b, h, w);
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
}, Ym = function(e) {
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
      }, d = et(o), f = Xs(d);
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
        const w = f === "y" ? "height" : "width", S = s.reference[f] - s.floating[w] + y.mainAxis, x = s.reference[f] + s.reference[w] - y.mainAxis;
        p < S ? p = S : p > x && (p = x);
      }
      if (l) {
        var v, b;
        const w = f === "y" ? "width" : "height", S = Nc.has(vt(o)), x = s.reference[d] - s.floating[w] + (S && ((v = i.offset) == null ? void 0 : v[d]) || 0) + (S ? 0 : y.crossAxis), k = s.reference[d] + s.reference[w] + (S ? 0 : ((b = i.offset) == null ? void 0 : b[d]) || 0) - (S ? y.crossAxis : 0);
        h < x ? h = x : h > k && (h = k);
      }
      return {
        [f]: p,
        [d]: h
      };
    }
  };
}, jm = function(e) {
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
      } = yt(e, t), u = await Un(t, l), d = vt(o), f = Cn(o), p = et(o) === "y", {
        width: h,
        height: g
      } = s.floating;
      let y, v;
      d === "top" || d === "bottom" ? (y = d, v = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (v = d, y = f === "end" ? "top" : "bottom");
      const b = g - u.top - u.bottom, w = h - u.left - u.right, S = Lt(g - u[y], b), x = Lt(h - u[v], w), k = !t.middlewareData.shift;
      let D = S, C = x;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (C = w), (r = t.middlewareData.shift) != null && r.enabled.y && (D = b), k && !f) {
        const T = He(u.left, 0), N = He(u.right, 0), A = He(u.top, 0), P = He(u.bottom, 0);
        p ? C = h - 2 * (T !== 0 || N !== 0 ? T + N : He(u.left, u.right)) : D = g - 2 * (A !== 0 || P !== 0 ? A + P : He(u.top, u.bottom));
      }
      await c({
        ...t,
        availableWidth: C,
        availableHeight: D
      });
      const M = await i.getDimensions(a.floating);
      return h !== M.width || g !== M.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function uo() {
  return typeof window < "u";
}
function Mn(e) {
  return Ac(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function We(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function st(e) {
  var t;
  return (t = (Ac(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Ac(e) {
  return uo() ? e instanceof Node || e instanceof We(e).Node : !1;
}
function qe(e) {
  return uo() ? e instanceof Element || e instanceof We(e).Element : !1;
}
function ot(e) {
  return uo() ? e instanceof HTMLElement || e instanceof We(e).HTMLElement : !1;
}
function si(e) {
  return !uo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof We(e).ShadowRoot;
}
const Vm = /* @__PURE__ */ new Set(["inline", "contents"]);
function Xn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Xe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Vm.has(o);
}
const Km = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Gm(e) {
  return Km.has(Mn(e));
}
const qm = [":popover-open", ":modal"];
function fo(e) {
  return qm.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Xm = ["transform", "translate", "scale", "rotate", "perspective"], Zm = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Qm = ["paint", "layout", "strict", "content"];
function Js(e) {
  const t = ea(), n = qe(e) ? Xe(e) : e;
  return Xm.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Zm.some((r) => (n.willChange || "").includes(r)) || Qm.some((r) => (n.contain || "").includes(r));
}
function Jm(e) {
  let t = Rt(e);
  for (; ot(t) && !hn(t); ) {
    if (Js(t))
      return t;
    if (fo(t))
      return null;
    t = Rt(t);
  }
  return null;
}
function ea() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const ep = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function hn(e) {
  return ep.has(Mn(e));
}
function Xe(e) {
  return We(e).getComputedStyle(e);
}
function mo(e) {
  return qe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Rt(e) {
  if (Mn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    si(e) && e.host || // Fallback.
    st(e)
  );
  return si(t) ? t.host : t;
}
function Lc(e) {
  const t = Rt(e);
  return hn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ot(t) && Xn(t) ? t : Lc(t);
}
function Yn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Lc(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = We(o);
  if (s) {
    const a = us(i);
    return t.concat(i, i.visualViewport || [], Xn(o) ? o : [], a && n ? Yn(a) : []);
  }
  return t.concat(o, Yn(o, [], n));
}
function us(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Rc(e) {
  const t = Xe(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = ot(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = Kr(n) !== s || Kr(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function ta(e) {
  return qe(e) ? e : e.contextElement;
}
function an(e) {
  const t = ta(e);
  if (!ot(t))
    return rt(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Rc(t);
  let i = (s ? Kr(n.width) : n.width) / r, a = (s ? Kr(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const tp = /* @__PURE__ */ rt(0);
function Ic(e) {
  const t = We(e);
  return !ea() || !t.visualViewport ? tp : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function np(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== We(e) ? !1 : t;
}
function Ut(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = ta(e);
  let i = rt(1);
  t && (r ? qe(r) && (i = an(r)) : i = an(e));
  const a = np(s, n, r) ? Ic(s) : rt(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, u = o.width / i.x, d = o.height / i.y;
  if (s) {
    const f = We(s), p = r && qe(r) ? We(r) : r;
    let h = f, g = us(h);
    for (; g && r && p !== h; ) {
      const y = an(g), v = g.getBoundingClientRect(), b = Xe(g), w = v.left + (g.clientLeft + parseFloat(b.paddingLeft)) * y.x, S = v.top + (g.clientTop + parseFloat(b.paddingTop)) * y.y;
      c *= y.x, l *= y.y, u *= y.x, d *= y.y, c += w, l += S, h = We(g), g = us(h);
    }
  }
  return qr({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function po(e, t) {
  const n = mo(e).scrollLeft;
  return t ? t.left + n : Ut(st(e)).left + n;
}
function Pc(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - po(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function rp(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = st(r), a = t ? fo(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = rt(1);
  const u = rt(0), d = ot(r);
  if ((d || !d && !s) && ((Mn(r) !== "body" || Xn(i)) && (c = mo(r)), ot(r))) {
    const p = Ut(r);
    l = an(r), u.x = p.x + r.clientLeft, u.y = p.y + r.clientTop;
  }
  const f = i && !d && !s ? Pc(i, c) : rt(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
  };
}
function op(e) {
  return Array.from(e.getClientRects());
}
function sp(e) {
  const t = st(e), n = mo(e), r = e.ownerDocument.body, o = He(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = He(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + po(e);
  const a = -n.scrollTop;
  return Xe(r).direction === "rtl" && (i += He(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const ai = 25;
function ap(e, t) {
  const n = We(e), r = st(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const u = ea();
    (!u || u && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = po(r);
  if (l <= 0) {
    const u = r.ownerDocument, d = u.body, f = getComputedStyle(d), p = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, h = Math.abs(r.clientWidth - d.clientWidth - p);
    h <= ai && (s -= h);
  } else l <= ai && (s += l);
  return {
    width: s,
    height: i,
    x: a,
    y: c
  };
}
const ip = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function cp(e, t) {
  const n = Ut(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = ot(e) ? an(e) : rt(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function ii(e, t, n) {
  let r;
  if (t === "viewport")
    r = ap(e, n);
  else if (t === "document")
    r = sp(st(e));
  else if (qe(t))
    r = cp(t, n);
  else {
    const o = Ic(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return qr(r);
}
function Oc(e, t) {
  const n = Rt(e);
  return n === t || !qe(n) || hn(n) ? !1 : Xe(n).position === "fixed" || Oc(n, t);
}
function lp(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Yn(e, [], !1).filter((a) => qe(a) && Mn(a) !== "body"), o = null;
  const s = Xe(e).position === "fixed";
  let i = s ? Rt(e) : e;
  for (; qe(i) && !hn(i); ) {
    const a = Xe(i), c = Js(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && ip.has(o.position) || Xn(i) && !c && Oc(e, i)) ? r = r.filter((u) => u !== i) : o = a, i = Rt(i);
  }
  return t.set(e, r), r;
}
function up(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? fo(t) ? [] : lp(t, this._c) : [].concat(n), r], a = i[0], c = i.reduce((l, u) => {
    const d = ii(t, u, o);
    return l.top = He(d.top, l.top), l.right = Lt(d.right, l.right), l.bottom = Lt(d.bottom, l.bottom), l.left = He(d.left, l.left), l;
  }, ii(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function dp(e) {
  const {
    width: t,
    height: n
  } = Rc(e);
  return {
    width: t,
    height: n
  };
}
function fp(e, t, n) {
  const r = ot(t), o = st(t), s = n === "fixed", i = Ut(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = rt(0);
  function l() {
    c.x = po(o);
  }
  if (r || !r && !s)
    if ((Mn(t) !== "body" || Xn(o)) && (a = mo(t)), r) {
      const p = Ut(t, !0, s, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && l();
  s && !r && o && l();
  const u = o && !r && !s ? Pc(o, a) : rt(0), d = i.left + a.scrollLeft - c.x - u.x, f = i.top + a.scrollTop - c.y - u.y;
  return {
    x: d,
    y: f,
    width: i.width,
    height: i.height
  };
}
function Ho(e) {
  return Xe(e).position === "static";
}
function ci(e, t) {
  if (!ot(e) || Xe(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return st(e) === n && (n = n.ownerDocument.body), n;
}
function _c(e, t) {
  const n = We(e);
  if (fo(e))
    return n;
  if (!ot(e)) {
    let o = Rt(e);
    for (; o && !hn(o); ) {
      if (qe(o) && !Ho(o))
        return o;
      o = Rt(o);
    }
    return n;
  }
  let r = ci(e, t);
  for (; r && Gm(r) && Ho(r); )
    r = ci(r, t);
  return r && hn(r) && Ho(r) && !Js(r) ? n : r || Jm(e) || n;
}
const mp = async function(e) {
  const t = this.getOffsetParent || _c, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: fp(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function pp(e) {
  return Xe(e).direction === "rtl";
}
const hp = {
  convertOffsetParentRelativeRectToViewportRelativeRect: rp,
  getDocumentElement: st,
  getClippingRect: up,
  getOffsetParent: _c,
  getElementRects: mp,
  getClientRects: op,
  getDimensions: dp,
  getScale: an,
  isElement: qe,
  isRTL: pp
};
function $c(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function gp(e, t) {
  let n = null, r;
  const o = st(e);
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
    const h = kr(d), g = kr(o.clientWidth - (u + f)), y = kr(o.clientHeight - (d + p)), v = kr(u), w = {
      rootMargin: -h + "px " + -g + "px " + -y + "px " + -v + "px",
      threshold: He(0, Lt(1, c)) || 1
    };
    let S = !0;
    function x(k) {
      const D = k[0].intersectionRatio;
      if (D !== c) {
        if (!S)
          return i();
        D ? i(!1, D) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      D === 1 && !$c(l, e.getBoundingClientRect()) && i(), S = !1;
    }
    try {
      n = new IntersectionObserver(x, {
        ...w,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(x, w);
    }
    n.observe(e);
  }
  return i(!0), s;
}
function yp(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = ta(e), u = o || s ? [...l ? Yn(l) : [], ...Yn(t)] : [];
  u.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const d = l && a ? gp(l, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((v) => {
    let [b] = v;
    b && b.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var w;
      (w = p) == null || w.observe(t);
    })), n();
  }), l && !c && p.observe(l), p.observe(t));
  let h, g = c ? Ut(e) : null;
  c && y();
  function y() {
    const v = Ut(e);
    g && !$c(g, v) && n(), g = v, h = requestAnimationFrame(y);
  }
  return n(), () => {
    var v;
    u.forEach((b) => {
      o && b.removeEventListener("scroll", n), s && b.removeEventListener("resize", n);
    }), d?.(), (v = p) == null || v.disconnect(), p = null, c && cancelAnimationFrame(h);
  };
}
const vp = Fm, bp = Um, wp = Wm, xp = jm, kp = zm, li = Hm, Cp = Ym, Mp = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: hp,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return $m(e, t, {
    ...o,
    platform: s
  });
};
var Sp = typeof document < "u", Ep = function() {
}, zr = Sp ? oo : Ep;
function Xr(e, t) {
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
        if (!Xr(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !Xr(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Hc(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ui(e, t) {
  const n = Hc(e);
  return Math.round(t * n) / n;
}
function Wo(e) {
  const t = E.useRef(e);
  return zr(() => {
    t.current = e;
  }), t;
}
function Tp(e) {
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
  } = e, [u, d] = E.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, p] = E.useState(r);
  Xr(f, r) || p(r);
  const [h, g] = E.useState(null), [y, v] = E.useState(null), b = E.useCallback((I) => {
    I !== k.current && (k.current = I, g(I));
  }, []), w = E.useCallback((I) => {
    I !== D.current && (D.current = I, v(I));
  }, []), S = s || h, x = i || y, k = E.useRef(null), D = E.useRef(null), C = E.useRef(u), M = c != null, T = Wo(c), N = Wo(o), A = Wo(l), P = E.useCallback(() => {
    if (!k.current || !D.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    N.current && (I.platform = N.current), Mp(k.current, D.current, I).then((R) => {
      const W = {
        ...R,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: A.current !== !1
      };
      O.current && !Xr(C.current, W) && (C.current = W, gc.flushSync(() => {
        d(W);
      }));
    });
  }, [f, t, n, N, A]);
  zr(() => {
    l === !1 && C.current.isPositioned && (C.current.isPositioned = !1, d((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [l]);
  const O = E.useRef(!1);
  zr(() => (O.current = !0, () => {
    O.current = !1;
  }), []), zr(() => {
    if (S && (k.current = S), x && (D.current = x), S && x) {
      if (T.current)
        return T.current(S, x, P);
      P();
    }
  }, [S, x, P, T, M]);
  const $ = E.useMemo(() => ({
    reference: k,
    floating: D,
    setReference: b,
    setFloating: w
  }), [b, w]), _ = E.useMemo(() => ({
    reference: S,
    floating: x
  }), [S, x]), U = E.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!_.floating)
      return I;
    const R = ui(_.floating, u.x), W = ui(_.floating, u.y);
    return a ? {
      ...I,
      transform: "translate(" + R + "px, " + W + "px)",
      ...Hc(_.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: R,
      top: W
    };
  }, [n, a, _.floating, u.x, u.y]);
  return E.useMemo(() => ({
    ...u,
    update: P,
    refs: $,
    elements: _,
    floatingStyles: U
  }), [u, P, $, _, U]);
}
const Dp = (e) => {
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
      return r && t(r) ? r.current != null ? li({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? li({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Np = (e, t) => ({
  ...vp(e),
  options: [e, t]
}), Ap = (e, t) => ({
  ...bp(e),
  options: [e, t]
}), Lp = (e, t) => ({
  ...Cp(e),
  options: [e, t]
}), Rp = (e, t) => ({
  ...wp(e),
  options: [e, t]
}), Ip = (e, t) => ({
  ...xp(e),
  options: [e, t]
}), Pp = (e, t) => ({
  ...kp(e),
  options: [e, t]
}), Op = (e, t) => ({
  ...Dp(e),
  options: [e, t]
});
var _p = "Arrow", Wc = E.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ m(
    De.svg,
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
Wc.displayName = _p;
var $p = Wc;
function Hp(e) {
  const [t, n] = E.useState(void 0);
  return At(() => {
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
var na = "Popper", [zc, ho] = kn(na), [Wp, Bc] = zc(na), Fc = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = E.useState(null);
  return /* @__PURE__ */ m(Wp, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Fc.displayName = na;
var Uc = "PopperAnchor", Yc = E.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = Bc(Uc, n), i = E.useRef(null), a = Le(t, i), c = E.useRef(null);
    return E.useEffect(() => {
      const l = c.current;
      c.current = r?.current || i.current, l !== c.current && s.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ m(De.div, { ...o, ref: a });
  }
);
Yc.displayName = Uc;
var ra = "PopperContent", [zp, Bp] = zc(ra), jc = E.forwardRef(
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
    } = e, y = Bc(ra, n), [v, b] = E.useState(null), w = Le(t, (F) => b(F)), [S, x] = E.useState(null), k = Hp(S), D = k?.width ?? 0, C = k?.height ?? 0, M = r + (s !== "center" ? "-" + s : ""), T = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, N = Array.isArray(l) ? l : [l], A = N.length > 0, P = {
      padding: T,
      boundary: N.filter(Up),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: A
    }, { refs: O, floatingStyles: $, placement: _, isPositioned: U, middlewareData: I } = Tp({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: M,
      whileElementsMounted: (...F) => yp(...F, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        Np({ mainAxis: o + C, alignmentAxis: i }),
        c && Ap({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Lp() : void 0,
          ...P
        }),
        c && Rp({ ...P }),
        Ip({
          ...P,
          apply: ({ elements: F, rects: Z, availableWidth: le, availableHeight: ue }) => {
            const { width: ve, height: Se } = Z.reference, Be = F.floating.style;
            Be.setProperty("--radix-popper-available-width", `${le}px`), Be.setProperty("--radix-popper-available-height", `${ue}px`), Be.setProperty("--radix-popper-anchor-width", `${ve}px`), Be.setProperty("--radix-popper-anchor-height", `${Se}px`);
          }
        }),
        S && Op({ element: S, padding: a }),
        Yp({ arrowWidth: D, arrowHeight: C }),
        f && Pp({ strategy: "referenceHidden", ...P })
      ]
    }), [R, W] = Gc(_), K = gt(h);
    At(() => {
      U && K?.();
    }, [U, K]);
    const V = I.arrow?.x, G = I.arrow?.y, Q = I.arrow?.centerOffset !== 0, [z, H] = E.useState();
    return At(() => {
      v && H(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ m(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...$,
          transform: U ? $.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: z,
          "--radix-popper-transform-origin": [
            I.transformOrigin?.x,
            I.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...I.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ m(
          zp,
          {
            scope: n,
            placedSide: R,
            onArrowChange: x,
            arrowX: V,
            arrowY: G,
            shouldHideArrow: Q,
            children: /* @__PURE__ */ m(
              De.div,
              {
                "data-side": R,
                "data-align": W,
                ...g,
                ref: w,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: U ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
jc.displayName = ra;
var Vc = "PopperArrow", Fp = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Kc = E.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Bp(Vc, r), i = Fp[s.placedSide];
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
          $p,
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
Kc.displayName = Vc;
function Up(e) {
  return e !== null;
}
var Yp = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [l, u] = Gc(n), d = { start: "0%", center: "50%", end: "100%" }[u], f = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + c / 2;
    let h = "", g = "";
    return l === "bottom" ? (h = i ? d : `${f}px`, g = `${-c}px`) : l === "top" ? (h = i ? d : `${f}px`, g = `${r.floating.height + c}px`) : l === "right" ? (h = `${-c}px`, g = i ? d : `${p}px`) : l === "left" && (h = `${r.floating.width + c}px`, g = i ? d : `${p}px`), { data: { x: h, y: g } };
  }
});
function Gc(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var qc = Fc, Xc = Yc, Zc = jc, Qc = Kc, jp = "Portal", oa = E.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = E.useState(!1);
  At(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? vf.createPortal(/* @__PURE__ */ m(De.div, { ...r, ref: t }), i) : null;
});
oa.displayName = jp;
function Vp(e, t) {
  return E.useReducer((n, r) => t[n][r] ?? n, e);
}
var Yt = (e) => {
  const { present: t, children: n } = e, r = Kp(t), o = typeof n == "function" ? n({ present: r.isPresent }) : E.Children.only(n), s = Le(r.ref, Gp(o));
  return typeof n == "function" || r.isPresent ? E.cloneElement(o, { ref: s }) : null;
};
Yt.displayName = "Presence";
function Kp(e) {
  const [t, n] = E.useState(), r = E.useRef(null), o = E.useRef(e), s = E.useRef("none"), i = e ? "mounted" : "unmounted", [a, c] = Vp(i, {
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
  return E.useEffect(() => {
    const l = Cr(r.current);
    s.current = a === "mounted" ? l : "none";
  }, [a]), At(() => {
    const l = r.current, u = o.current;
    if (u !== e) {
      const f = s.current, p = Cr(l);
      e ? c("MOUNT") : p === "none" || l?.display === "none" ? c("UNMOUNT") : c(u && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), At(() => {
    if (t) {
      let l;
      const u = t.ownerDocument.defaultView ?? window, d = (p) => {
        const g = Cr(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && g && (c("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (p) => {
        p.target === t && (s.current = Cr(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        u.clearTimeout(l), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: E.useCallback((l) => {
      r.current = l ? getComputedStyle(l) : null, n(l);
    }, [])
  };
}
function Cr(e) {
  return e?.animationName || "none";
}
function Gp(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var zo = "rovingFocusGroup.onEntryFocus", qp = { bubbles: !1, cancelable: !0 }, Zn = "RovingFocusGroup", [ds, Jc, Xp] = kc(Zn), [Zp, el] = kn(
  Zn,
  [Xp]
), [Qp, Jp] = Zp(Zn), tl = E.forwardRef(
  (e, t) => /* @__PURE__ */ m(ds.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(ds.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(eh, { ...e, ref: t }) }) })
);
tl.displayName = Zn;
var eh = E.forwardRef((e, t) => {
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
  } = e, f = E.useRef(null), p = Le(t, f), h = Cc(s), [g, y] = Gs({
    prop: i,
    defaultProp: a ?? null,
    onChange: c,
    caller: Zn
  }), [v, b] = E.useState(!1), w = gt(l), S = Jc(n), x = E.useRef(!1), [k, D] = E.useState(0);
  return E.useEffect(() => {
    const C = f.current;
    if (C)
      return C.addEventListener(zo, w), () => C.removeEventListener(zo, w);
  }, [w]), /* @__PURE__ */ m(
    Qp,
    {
      scope: n,
      orientation: r,
      dir: h,
      loop: o,
      currentTabStopId: g,
      onItemFocus: E.useCallback(
        (C) => y(C),
        [y]
      ),
      onItemShiftTab: E.useCallback(() => b(!0), []),
      onFocusableItemAdd: E.useCallback(
        () => D((C) => C + 1),
        []
      ),
      onFocusableItemRemove: E.useCallback(
        () => D((C) => C - 1),
        []
      ),
      children: /* @__PURE__ */ m(
        De.div,
        {
          tabIndex: v || k === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: se(e.onMouseDown, () => {
            x.current = !0;
          }),
          onFocus: se(e.onFocus, (C) => {
            const M = !x.current;
            if (C.target === C.currentTarget && M && !v) {
              const T = new CustomEvent(zo, qp);
              if (C.currentTarget.dispatchEvent(T), !T.defaultPrevented) {
                const N = S().filter((_) => _.focusable), A = N.find((_) => _.active), P = N.find((_) => _.id === g), $ = [A, P, ...N].filter(
                  Boolean
                ).map((_) => _.ref.current);
                ol($, u);
              }
            }
            x.current = !1;
          }),
          onBlur: se(e.onBlur, () => b(!1))
        }
      )
    }
  );
}), nl = "RovingFocusGroupItem", rl = E.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, c = Vr(), l = s || c, u = Jp(nl, n), d = u.currentTabStopId === l, f = Jc(n), { onFocusableItemAdd: p, onFocusableItemRemove: h, currentTabStopId: g } = u;
    return E.useEffect(() => {
      if (r)
        return p(), () => h();
    }, [r, p, h]), /* @__PURE__ */ m(
      ds.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ m(
          De.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": u.orientation,
            ...a,
            ref: t,
            onMouseDown: se(e.onMouseDown, (y) => {
              r ? u.onItemFocus(l) : y.preventDefault();
            }),
            onFocus: se(e.onFocus, () => u.onItemFocus(l)),
            onKeyDown: se(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const v = rh(y, u.orientation, u.dir);
              if (v !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let w = f().filter((S) => S.focusable).map((S) => S.ref.current);
                if (v === "last") w.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && w.reverse();
                  const S = w.indexOf(y.currentTarget);
                  w = u.loop ? oh(w, S + 1) : w.slice(S + 1);
                }
                setTimeout(() => ol(w));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: d, hasTabStop: g != null }) : i
          }
        )
      }
    );
  }
);
rl.displayName = nl;
var th = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function nh(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function rh(e, t, n) {
  const r = nh(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return th[r];
}
function ol(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function oh(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var sh = tl, ah = rl, ih = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Zt = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ new WeakMap(), Sr = {}, Bo = 0, sl = function(e) {
  return e && (e.host || sl(e.parentNode));
}, ch = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = sl(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, lh = function(e, t, n, r) {
  var o = ch(t, Array.isArray(e) ? e : [e]);
  Sr[n] || (Sr[n] = /* @__PURE__ */ new WeakMap());
  var s = Sr[n], i = [], a = /* @__PURE__ */ new Set(), c = new Set(o), l = function(d) {
    !d || a.has(d) || (a.add(d), l(d.parentNode));
  };
  o.forEach(l);
  var u = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (a.has(f))
        u(f);
      else
        try {
          var p = f.getAttribute(r), h = p !== null && p !== "false", g = (Zt.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          Zt.set(f, g), s.set(f, y), i.push(f), g === 1 && h && Mr.set(f, !0), y === 1 && f.setAttribute(n, "true"), h || f.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return u(t), a.clear(), Bo++, function() {
    i.forEach(function(d) {
      var f = Zt.get(d) - 1, p = s.get(d) - 1;
      Zt.set(d, f), s.set(d, p), f || (Mr.has(d) || d.removeAttribute(r), Mr.delete(d)), p || d.removeAttribute(n);
    }), Bo--, Bo || (Zt = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ new WeakMap(), Sr = {});
  };
}, uh = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = ih(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), lh(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Je = function() {
  return Je = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, Je.apply(this, arguments);
};
function al(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function dh(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Br = "right-scroll-bar-position", Fr = "width-before-scroll-bar", fh = "with-scroll-bars-hidden", mh = "--removed-body-scroll-bar-size";
function Fo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function ph(e, t) {
  var n = Y(function() {
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
var hh = typeof window < "u" ? E.useLayoutEffect : E.useEffect, di = /* @__PURE__ */ new WeakMap();
function gh(e, t) {
  var n = ph(null, function(r) {
    return e.forEach(function(o) {
      return Fo(o, r);
    });
  });
  return hh(function() {
    var r = di.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || Fo(a, null);
      }), s.forEach(function(a) {
        o.has(a) || Fo(a, i);
      });
    }
    di.set(n, e);
  }, [e]), n;
}
function yh(e) {
  return e;
}
function vh(e, t) {
  t === void 0 && (t = yh);
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
function bh(e) {
  e === void 0 && (e = {});
  var t = vh(null);
  return t.options = Je({ async: !0, ssr: !1 }, e), t;
}
var il = function(e) {
  var t = e.sideCar, n = al(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return E.createElement(r, Je({}, n));
};
il.isSideCarExport = !0;
function wh(e, t) {
  return e.useMedium(t), il;
}
var cl = bh(), Uo = function() {
}, go = E.forwardRef(function(e, t) {
  var n = E.useRef(null), r = E.useState({
    onScrollCapture: Uo,
    onWheelCapture: Uo,
    onTouchMoveCapture: Uo
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, p = e.noRelative, h = e.noIsolation, g = e.inert, y = e.allowPinchZoom, v = e.as, b = v === void 0 ? "div" : v, w = e.gapMode, S = al(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), x = f, k = gh([n, t]), D = Je(Je({}, S), o);
  return E.createElement(
    E.Fragment,
    null,
    u && E.createElement(x, { sideCar: cl, removeScrollBar: l, shards: d, noRelative: p, noIsolation: h, inert: g, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: w }),
    i ? E.cloneElement(E.Children.only(a), Je(Je({}, D), { ref: k })) : E.createElement(b, Je({}, D, { className: c, ref: k }), a)
  );
});
go.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
go.classNames = {
  fullWidth: Fr,
  zeroRight: Br
};
var xh = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function kh() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = xh();
  return t && e.setAttribute("nonce", t), e;
}
function Ch(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Mh(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Sh = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = kh()) && (Ch(t, n), Mh(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Eh = function() {
  var e = Sh();
  return function(t, n) {
    E.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, ll = function() {
  var e = Eh(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Th = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Yo = function(e) {
  return parseInt(e || "", 10) || 0;
}, Dh = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Yo(n), Yo(r), Yo(o)];
}, Nh = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Th;
  var t = Dh(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Ah = ll(), cn = "data-scroll-locked", Lh = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(fh, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(cn, `] {
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
  
  .`).concat(Br, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Fr, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Br, " .").concat(Br, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Fr, " .").concat(Fr, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(cn, `] {
    `).concat(mh, ": ").concat(a, `px;
  }
`);
}, fi = function() {
  var e = parseInt(document.body.getAttribute(cn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Rh = function() {
  E.useEffect(function() {
    return document.body.setAttribute(cn, (fi() + 1).toString()), function() {
      var e = fi() - 1;
      e <= 0 ? document.body.removeAttribute(cn) : document.body.setAttribute(cn, e.toString());
    };
  }, []);
}, Ih = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Rh();
  var s = E.useMemo(function() {
    return Nh(o);
  }, [o]);
  return E.createElement(Ah, { styles: Lh(s, !t, o, n ? "" : "!important") });
}, fs = !1;
if (typeof window < "u")
  try {
    var Er = Object.defineProperty({}, "passive", {
      get: function() {
        return fs = !0, !0;
      }
    });
    window.addEventListener("test", Er, Er), window.removeEventListener("test", Er, Er);
  } catch {
    fs = !1;
  }
var Qt = fs ? { passive: !1 } : !1, Ph = function(e) {
  return e.tagName === "TEXTAREA";
}, ul = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Ph(e) && n[t] === "visible")
  );
}, Oh = function(e) {
  return ul(e, "overflowY");
}, _h = function(e) {
  return ul(e, "overflowX");
}, mi = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = dl(e, r);
    if (o) {
      var s = fl(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, $h = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Hh = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, dl = function(e, t) {
  return e === "v" ? Oh(t) : _h(t);
}, fl = function(e, t) {
  return e === "v" ? $h(t) : Hh(t);
}, Wh = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, zh = function(e, t, n, r, o) {
  var s = Wh(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, c = t.contains(a), l = !1, u = i > 0, d = 0, f = 0;
  do {
    if (!a)
      break;
    var p = fl(e, a), h = p[0], g = p[1], y = p[2], v = g - y - s * h;
    (h || v) && dl(e, a) && (d += v, f += h);
    var b = a.parentNode;
    a = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b;
  } while (
    // portaled content
    !c && a !== document.body || // self content
    c && (t.contains(a) || t === a)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(f) < 1) && (l = !0), l;
}, Tr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, pi = function(e) {
  return [e.deltaX, e.deltaY];
}, hi = function(e) {
  return e && "current" in e ? e.current : e;
}, Bh = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Fh = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Uh = 0, Jt = [];
function Yh(e) {
  var t = E.useRef([]), n = E.useRef([0, 0]), r = E.useRef(), o = E.useState(Uh++)[0], s = E.useState(ll)[0], i = E.useRef(e);
  E.useEffect(function() {
    i.current = e;
  }, [e]), E.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = dh([e.lockRef.current], (e.shards || []).map(hi), !0).filter(Boolean);
      return g.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = E.useCallback(function(g, y) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !i.current.allowPinchZoom;
    var v = Tr(g), b = n.current, w = "deltaX" in g ? g.deltaX : b[0] - v[0], S = "deltaY" in g ? g.deltaY : b[1] - v[1], x, k = g.target, D = Math.abs(w) > Math.abs(S) ? "h" : "v";
    if ("touches" in g && D === "h" && k.type === "range")
      return !1;
    var C = mi(D, k);
    if (!C)
      return !0;
    if (C ? x = D : (x = D === "v" ? "h" : "v", C = mi(D, k)), !C)
      return !1;
    if (!r.current && "changedTouches" in g && (w || S) && (r.current = x), !x)
      return !0;
    var M = r.current || x;
    return zh(M, y, g, M === "h" ? w : S);
  }, []), c = E.useCallback(function(g) {
    var y = g;
    if (!(!Jt.length || Jt[Jt.length - 1] !== s)) {
      var v = "deltaY" in y ? pi(y) : Tr(y), b = t.current.filter(function(x) {
        return x.name === y.type && (x.target === y.target || y.target === x.shadowParent) && Bh(x.delta, v);
      })[0];
      if (b && b.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!b) {
        var w = (i.current.shards || []).map(hi).filter(Boolean).filter(function(x) {
          return x.contains(y.target);
        }), S = w.length > 0 ? a(y, w[0]) : !i.current.noIsolation;
        S && y.cancelable && y.preventDefault();
      }
    }
  }, []), l = E.useCallback(function(g, y, v, b) {
    var w = { name: g, delta: y, target: v, should: b, shadowParent: jh(v) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== w;
      });
    }, 1);
  }, []), u = E.useCallback(function(g) {
    n.current = Tr(g), r.current = void 0;
  }, []), d = E.useCallback(function(g) {
    l(g.type, pi(g), g.target, a(g, e.lockRef.current));
  }, []), f = E.useCallback(function(g) {
    l(g.type, Tr(g), g.target, a(g, e.lockRef.current));
  }, []);
  E.useEffect(function() {
    return Jt.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, Qt), document.addEventListener("touchmove", c, Qt), document.addEventListener("touchstart", u, Qt), function() {
      Jt = Jt.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", c, Qt), document.removeEventListener("touchmove", c, Qt), document.removeEventListener("touchstart", u, Qt);
    };
  }, []);
  var p = e.removeScrollBar, h = e.inert;
  return E.createElement(
    E.Fragment,
    null,
    h ? E.createElement(s, { styles: Fh(o) }) : null,
    p ? E.createElement(Ih, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function jh(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Vh = wh(cl, Yh);
var ml = E.forwardRef(function(e, t) {
  return E.createElement(go, Je({}, e, { ref: t, sideCar: Vh }));
});
ml.classNames = go.classNames;
var ms = ["Enter", " "], Kh = ["ArrowDown", "PageUp", "Home"], pl = ["ArrowUp", "PageDown", "End"], Gh = [...Kh, ...pl], qh = {
  ltr: [...ms, "ArrowRight"],
  rtl: [...ms, "ArrowLeft"]
}, Xh = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Qn = "Menu", [jn, Zh, Qh] = kc(Qn), [jt, hl] = kn(Qn, [
  Qh,
  ho,
  el
]), yo = ho(), gl = el(), [Jh, Vt] = jt(Qn), [eg, Jn] = jt(Qn), yl = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = yo(t), [c, l] = E.useState(null), u = E.useRef(!1), d = gt(s), f = Cc(o);
  return E.useEffect(() => {
    const p = () => {
      u.current = !0, document.addEventListener("pointerdown", h, { capture: !0, once: !0 }), document.addEventListener("pointermove", h, { capture: !0, once: !0 });
    }, h = () => u.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", h, { capture: !0 }), document.removeEventListener("pointermove", h, { capture: !0 });
    };
  }, []), /* @__PURE__ */ m(qc, { ...a, children: /* @__PURE__ */ m(
    Jh,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: c,
      onContentChange: l,
      children: /* @__PURE__ */ m(
        eg,
        {
          scope: t,
          onClose: E.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: u,
          dir: f,
          modal: i,
          children: r
        }
      )
    }
  ) });
};
yl.displayName = Qn;
var tg = "MenuAnchor", sa = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = yo(n);
    return /* @__PURE__ */ m(Xc, { ...o, ...r, ref: t });
  }
);
sa.displayName = tg;
var aa = "MenuPortal", [ng, vl] = jt(aa, {
  forceMount: void 0
}), bl = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = Vt(aa, t);
  return /* @__PURE__ */ m(ng, { scope: t, forceMount: n, children: /* @__PURE__ */ m(Yt, { present: n || s.open, children: /* @__PURE__ */ m(oa, { asChild: !0, container: o, children: r }) }) });
};
bl.displayName = aa;
var je = "MenuContent", [rg, ia] = jt(je), wl = E.forwardRef(
  (e, t) => {
    const n = vl(je, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Vt(je, e.__scopeMenu), i = Jn(je, e.__scopeMenu);
    return /* @__PURE__ */ m(jn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(Yt, { present: r || s.open, children: /* @__PURE__ */ m(jn.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ m(og, { ...o, ref: t }) : /* @__PURE__ */ m(sg, { ...o, ref: t }) }) }) });
  }
), og = E.forwardRef(
  (e, t) => {
    const n = Vt(je, e.__scopeMenu), r = E.useRef(null), o = Le(t, r);
    return E.useEffect(() => {
      const s = r.current;
      if (s) return uh(s);
    }, []), /* @__PURE__ */ m(
      ca,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: se(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), sg = E.forwardRef((e, t) => {
  const n = Vt(je, e.__scopeMenu);
  return /* @__PURE__ */ m(
    ca,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), ag = /* @__PURE__ */ Fn("MenuContent.ScrollLock"), ca = E.forwardRef(
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
    } = e, y = Vt(je, n), v = Jn(je, n), b = yo(n), w = gl(n), S = Zh(n), [x, k] = E.useState(null), D = E.useRef(null), C = Le(t, D, y.onContentChange), M = E.useRef(0), T = E.useRef(""), N = E.useRef(0), A = E.useRef(null), P = E.useRef("right"), O = E.useRef(0), $ = h ? ml : E.Fragment, _ = h ? { as: ag, allowPinchZoom: !0 } : void 0, U = (R) => {
      const W = T.current + R, K = S().filter((F) => !F.disabled), V = document.activeElement, G = K.find((F) => F.ref.current === V)?.textValue, Q = K.map((F) => F.textValue), z = vg(Q, W, G), H = K.find((F) => F.textValue === z)?.ref.current;
      (function F(Z) {
        T.current = Z, window.clearTimeout(M.current), Z !== "" && (M.current = window.setTimeout(() => F(""), 1e3));
      })(W), H && setTimeout(() => H.focus());
    };
    E.useEffect(() => () => window.clearTimeout(M.current), []), gm();
    const I = E.useCallback((R) => P.current === A.current?.side && wg(R, A.current?.area), []);
    return /* @__PURE__ */ m(
      rg,
      {
        scope: n,
        searchRef: T,
        onItemEnter: E.useCallback(
          (R) => {
            I(R) && R.preventDefault();
          },
          [I]
        ),
        onItemLeave: E.useCallback(
          (R) => {
            I(R) || (D.current?.focus(), k(null));
          },
          [I]
        ),
        onTriggerLeave: E.useCallback(
          (R) => {
            I(R) && R.preventDefault();
          },
          [I]
        ),
        pointerGraceTimerRef: N,
        onPointerGraceIntentChange: E.useCallback((R) => {
          A.current = R;
        }, []),
        children: /* @__PURE__ */ m($, { ..._, children: /* @__PURE__ */ m(
          Ec,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: se(s, (R) => {
              R.preventDefault(), D.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ m(
              qs,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: l,
                onPointerDownOutside: u,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: p,
                children: /* @__PURE__ */ m(
                  sh,
                  {
                    asChild: !0,
                    ...w,
                    dir: v.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: x,
                    onCurrentTabStopIdChange: k,
                    onEntryFocus: se(c, (R) => {
                      v.isUsingKeyboardRef.current || R.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ m(
                      Zc,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": _l(y.open),
                        "data-radix-menu-content": "",
                        dir: v.dir,
                        ...b,
                        ...g,
                        ref: C,
                        style: { outline: "none", ...g.style },
                        onKeyDown: se(g.onKeyDown, (R) => {
                          const K = R.target.closest("[data-radix-menu-content]") === R.currentTarget, V = R.ctrlKey || R.altKey || R.metaKey, G = R.key.length === 1;
                          K && (R.key === "Tab" && R.preventDefault(), !V && G && U(R.key));
                          const Q = D.current;
                          if (R.target !== Q || !Gh.includes(R.key)) return;
                          R.preventDefault();
                          const H = S().filter((F) => !F.disabled).map((F) => F.ref.current);
                          pl.includes(R.key) && H.reverse(), gg(H);
                        }),
                        onBlur: se(e.onBlur, (R) => {
                          R.currentTarget.contains(R.target) || (window.clearTimeout(M.current), T.current = "");
                        }),
                        onPointerMove: se(
                          e.onPointerMove,
                          Vn((R) => {
                            const W = R.target, K = O.current !== R.clientX;
                            if (R.currentTarget.contains(W) && K) {
                              const V = R.clientX > O.current ? "right" : "left";
                              P.current = V, O.current = R.clientX;
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
wl.displayName = je;
var ig = "MenuGroup", la = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(De.div, { role: "group", ...r, ref: t });
  }
);
la.displayName = ig;
var cg = "MenuLabel", xl = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(De.div, { ...r, ref: t });
  }
);
xl.displayName = cg;
var Zr = "MenuItem", gi = "menu.itemSelect", vo = E.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = E.useRef(null), i = Jn(Zr, e.__scopeMenu), a = ia(Zr, e.__scopeMenu), c = Le(t, s), l = E.useRef(!1), u = () => {
      const d = s.current;
      if (!n && d) {
        const f = new CustomEvent(gi, { bubbles: !0, cancelable: !0 });
        d.addEventListener(gi, (p) => r?.(p), { once: !0 }), xc(d, f), f.defaultPrevented ? l.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ m(
      kl,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: se(e.onClick, u),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), l.current = !0;
        },
        onPointerUp: se(e.onPointerUp, (d) => {
          l.current || d.currentTarget?.click();
        }),
        onKeyDown: se(e.onKeyDown, (d) => {
          const f = a.searchRef.current !== "";
          n || f && d.key === " " || ms.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
vo.displayName = Zr;
var kl = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = ia(Zr, n), a = gl(n), c = E.useRef(null), l = Le(t, c), [u, d] = E.useState(!1), [f, p] = E.useState("");
    return E.useEffect(() => {
      const h = c.current;
      h && p((h.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ m(
      jn.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ m(ah, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ m(
          De.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: l,
            onPointerMove: se(
              e.onPointerMove,
              Vn((h) => {
                r ? i.onItemLeave(h) : (i.onItemEnter(h), h.defaultPrevented || h.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: se(
              e.onPointerLeave,
              Vn((h) => i.onItemLeave(h))
            ),
            onFocus: se(e.onFocus, () => d(!0)),
            onBlur: se(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), lg = "MenuCheckboxItem", Cl = E.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ m(Dl, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ m(
      vo,
      {
        role: "menuitemcheckbox",
        "aria-checked": Qr(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": da(n),
        onSelect: se(
          o.onSelect,
          () => r?.(Qr(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Cl.displayName = lg;
var Ml = "MenuRadioGroup", [ug, dg] = jt(
  Ml,
  { value: void 0, onValueChange: () => {
  } }
), Sl = E.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = gt(r);
    return /* @__PURE__ */ m(ug, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ m(la, { ...o, ref: t }) });
  }
);
Sl.displayName = Ml;
var El = "MenuRadioItem", Tl = E.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = dg(El, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ m(Dl, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ m(
      vo,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": da(s),
        onSelect: se(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Tl.displayName = El;
var ua = "MenuItemIndicator", [Dl, fg] = jt(
  ua,
  { checked: !1 }
), Nl = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = fg(ua, n);
    return /* @__PURE__ */ m(
      Yt,
      {
        present: r || Qr(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ m(
          De.span,
          {
            ...o,
            ref: t,
            "data-state": da(s.checked)
          }
        )
      }
    );
  }
);
Nl.displayName = ua;
var mg = "MenuSeparator", Al = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(
      De.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Al.displayName = mg;
var pg = "MenuArrow", Ll = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = yo(n);
    return /* @__PURE__ */ m(Qc, { ...o, ...r, ref: t });
  }
);
Ll.displayName = pg;
var hg = "MenuSub", [iC, Rl] = jt(hg), On = "MenuSubTrigger", Il = E.forwardRef(
  (e, t) => {
    const n = Vt(On, e.__scopeMenu), r = Jn(On, e.__scopeMenu), o = Rl(On, e.__scopeMenu), s = ia(On, e.__scopeMenu), i = E.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: c } = s, l = { __scopeMenu: e.__scopeMenu }, u = E.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return E.useEffect(() => u, [u]), E.useEffect(() => {
      const d = a.current;
      return () => {
        window.clearTimeout(d), c(null);
      };
    }, [a, c]), /* @__PURE__ */ m(sa, { asChild: !0, ...l, children: /* @__PURE__ */ m(
      kl,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": _l(n.open),
        ...e,
        ref: lo(t, o.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: se(
          e.onPointerMove,
          Vn((d) => {
            s.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), u();
            }, 100));
          })
        ),
        onPointerLeave: se(
          e.onPointerLeave,
          Vn((d) => {
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
        onKeyDown: se(e.onKeyDown, (d) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && d.key === " " || qh[r.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
Il.displayName = On;
var Pl = "MenuSubContent", Ol = E.forwardRef(
  (e, t) => {
    const n = vl(je, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Vt(je, e.__scopeMenu), i = Jn(je, e.__scopeMenu), a = Rl(Pl, e.__scopeMenu), c = E.useRef(null), l = Le(t, c);
    return /* @__PURE__ */ m(jn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(Yt, { present: r || s.open, children: /* @__PURE__ */ m(jn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(
      ca,
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
        onFocusOutside: se(e.onFocusOutside, (u) => {
          u.target !== a.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: se(e.onEscapeKeyDown, (u) => {
          i.onClose(), u.preventDefault();
        }),
        onKeyDown: se(e.onKeyDown, (u) => {
          const d = u.currentTarget.contains(u.target), f = Xh[i.dir].includes(u.key);
          d && f && (s.onOpenChange(!1), a.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
Ol.displayName = Pl;
function _l(e) {
  return e ? "open" : "closed";
}
function Qr(e) {
  return e === "indeterminate";
}
function da(e) {
  return Qr(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function gg(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function yg(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function vg(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = yg(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((l) => l !== n));
  const c = i.find(
    (l) => l.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function bg(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, u = a.y, d = c.x, f = c.y;
    u > r != f > r && n < (d - l) * (r - u) / (f - u) + l && (o = !o);
  }
  return o;
}
function wg(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return bg(n, t);
}
function Vn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var xg = yl, kg = sa, Cg = bl, Mg = wl, Sg = la, Eg = xl, Tg = vo, Dg = Cl, Ng = Sl, Ag = Tl, Lg = Nl, Rg = Al, Ig = Ll, Pg = Il, Og = Ol, bo = "DropdownMenu", [_g] = kn(
  bo,
  [hl]
), Pe = hl(), [$g, $l] = _g(bo), Hl = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, c = Pe(t), l = E.useRef(null), [u, d] = Gs({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: bo
  });
  return /* @__PURE__ */ m(
    $g,
    {
      scope: t,
      triggerId: Vr(),
      triggerRef: l,
      contentId: Vr(),
      open: u,
      onOpenChange: d,
      onOpenToggle: E.useCallback(() => d((f) => !f), [d]),
      modal: a,
      children: /* @__PURE__ */ m(xg, { ...c, open: u, onOpenChange: d, dir: r, modal: a, children: n })
    }
  );
};
Hl.displayName = bo;
var Wl = "DropdownMenuTrigger", zl = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = $l(Wl, n), i = Pe(n);
    return /* @__PURE__ */ m(kg, { asChild: !0, ...i, children: /* @__PURE__ */ m(
      De.button,
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
        ref: lo(t, s.triggerRef),
        onPointerDown: se(e.onPointerDown, (a) => {
          !r && a.button === 0 && a.ctrlKey === !1 && (s.onOpenToggle(), s.open || a.preventDefault());
        }),
        onKeyDown: se(e.onKeyDown, (a) => {
          r || (["Enter", " "].includes(a.key) && s.onOpenToggle(), a.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(a.key) && a.preventDefault());
        })
      }
    ) });
  }
);
zl.displayName = Wl;
var Hg = "DropdownMenuPortal", Bl = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Pe(t);
  return /* @__PURE__ */ m(Cg, { ...r, ...n });
};
Bl.displayName = Hg;
var Fl = "DropdownMenuContent", Ul = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $l(Fl, n), s = Pe(n), i = E.useRef(!1);
    return /* @__PURE__ */ m(
      Mg,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...s,
        ...r,
        ref: t,
        onCloseAutoFocus: se(e.onCloseAutoFocus, (a) => {
          i.current || o.triggerRef.current?.focus(), i.current = !1, a.preventDefault();
        }),
        onInteractOutside: se(e.onInteractOutside, (a) => {
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
Ul.displayName = Fl;
var Wg = "DropdownMenuGroup", zg = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ m(Sg, { ...o, ...r, ref: t });
  }
);
zg.displayName = Wg;
var Bg = "DropdownMenuLabel", Fg = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ m(Eg, { ...o, ...r, ref: t });
  }
);
Fg.displayName = Bg;
var Ug = "DropdownMenuItem", Yl = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ m(Tg, { ...o, ...r, ref: t });
  }
);
Yl.displayName = Ug;
var Yg = "DropdownMenuCheckboxItem", jg = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(Dg, { ...o, ...r, ref: t });
});
jg.displayName = Yg;
var Vg = "DropdownMenuRadioGroup", Kg = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(Ng, { ...o, ...r, ref: t });
});
Kg.displayName = Vg;
var Gg = "DropdownMenuRadioItem", qg = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(Ag, { ...o, ...r, ref: t });
});
qg.displayName = Gg;
var Xg = "DropdownMenuItemIndicator", Zg = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(Lg, { ...o, ...r, ref: t });
});
Zg.displayName = Xg;
var Qg = "DropdownMenuSeparator", jl = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(Rg, { ...o, ...r, ref: t });
});
jl.displayName = Qg;
var Jg = "DropdownMenuArrow", ey = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ m(Ig, { ...o, ...r, ref: t });
  }
);
ey.displayName = Jg;
var ty = "DropdownMenuSubTrigger", ny = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(Pg, { ...o, ...r, ref: t });
});
ny.displayName = ty;
var ry = "DropdownMenuSubContent", oy = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(
    Og,
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
oy.displayName = ry;
var sy = Hl, ay = zl, iy = Bl, cy = Ul, ly = Yl, uy = jl;
function Vl(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Vl(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Kl() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Vl(e)) && (r && (r += " "), r += t);
  return r;
}
const fa = "-", dy = (e) => {
  const t = my(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(fa);
      return a[0] === "" && a.length !== 1 && a.shift(), Gl(a, t) || fy(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const c = n[i] || [];
      return a && r[i] ? [...c, ...r[i]] : c;
    }
  };
}, Gl = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Gl(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(fa);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, yi = /^\[(.+)\]$/, fy = (e) => {
  if (yi.test(e)) {
    const t = yi.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, my = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    ps(n[o], r, o, t);
  return r;
}, ps = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : vi(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (py(o)) {
        ps(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      ps(i, vi(t, s), n, r);
    });
  });
}, vi = (e, t) => {
  let n = e;
  return t.split(fa).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, py = (e) => e.isThemeGetter, hy = (e) => {
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
}, hs = "!", gs = ":", gy = gs.length, yy = (e) => {
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
        if (g === gs) {
          s.push(o.slice(c, h)), c = h + gy;
          continue;
        }
        if (g === "/") {
          l = h;
          continue;
        }
      }
      g === "[" ? i++ : g === "]" ? i-- : g === "(" ? a++ : g === ")" && a--;
    }
    const u = s.length === 0 ? o : o.substring(c), d = vy(u), f = d !== u, p = l && l > c ? l - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: d,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + gs, s = r;
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
}, vy = (e) => e.endsWith(hs) ? e.substring(0, e.length - 1) : e.startsWith(hs) ? e.substring(1) : e, by = (e) => {
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
}, wy = (e) => ({
  cache: hy(e.cacheSize),
  parseClassName: yy(e),
  sortModifiers: by(e),
  ...dy(e)
}), xy = /\s+/, ky = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(xy);
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
    const b = s(f).join(":"), w = p ? b + hs : b, S = w + v;
    if (i.includes(S))
      continue;
    i.push(S);
    const x = o(v, y);
    for (let k = 0; k < x.length; ++k) {
      const D = x[k];
      i.push(w + D);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Cy() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = ql(t)) && (r && (r += " "), r += n);
  return r;
}
const ql = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = ql(e[r])) && (n && (n += " "), n += t);
  return n;
};
function My(e, ...t) {
  let n, r, o, s = i;
  function i(c) {
    const l = t.reduce((u, d) => d(u), e());
    return n = wy(l), r = n.cache.get, o = n.cache.set, s = a, a(c);
  }
  function a(c) {
    const l = r(c);
    if (l)
      return l;
    const u = ky(c, n);
    return o(c, u), u;
  }
  return function() {
    return s(Cy.apply(null, arguments));
  };
}
const Ce = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Xl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Zl = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Sy = /^\d+\/\d+$/, Ey = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ty = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Dy = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Ny = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ay = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, en = (e) => Sy.test(e), ie = (e) => !!e && !Number.isNaN(Number(e)), Mt = (e) => !!e && Number.isInteger(Number(e)), jo = (e) => e.endsWith("%") && ie(e.slice(0, -1)), lt = (e) => Ey.test(e), Ly = () => !0, Ry = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ty.test(e) && !Dy.test(e)
), Ql = () => !1, Iy = (e) => Ny.test(e), Py = (e) => Ay.test(e), Oy = (e) => !J(e) && !ee(e), _y = (e) => Sn(e, tu, Ql), J = (e) => Xl.test(e), _t = (e) => Sn(e, nu, Ry), Vo = (e) => Sn(e, By, ie), bi = (e) => Sn(e, Jl, Ql), $y = (e) => Sn(e, eu, Py), Dr = (e) => Sn(e, ru, Iy), ee = (e) => Zl.test(e), Rn = (e) => En(e, nu), Hy = (e) => En(e, Fy), wi = (e) => En(e, Jl), Wy = (e) => En(e, tu), zy = (e) => En(e, eu), Nr = (e) => En(e, ru, !0), Sn = (e, t, n) => {
  const r = Xl.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, En = (e, t, n = !1) => {
  const r = Zl.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, Jl = (e) => e === "position" || e === "percentage", eu = (e) => e === "image" || e === "url", tu = (e) => e === "length" || e === "size" || e === "bg-size", nu = (e) => e === "length", By = (e) => e === "number", Fy = (e) => e === "family-name", ru = (e) => e === "shadow", Uy = () => {
  const e = Ce("color"), t = Ce("font"), n = Ce("text"), r = Ce("font-weight"), o = Ce("tracking"), s = Ce("leading"), i = Ce("breakpoint"), a = Ce("container"), c = Ce("spacing"), l = Ce("radius"), u = Ce("shadow"), d = Ce("inset-shadow"), f = Ce("text-shadow"), p = Ce("drop-shadow"), h = Ce("blur"), g = Ce("perspective"), y = Ce("aspect"), v = Ce("ease"), b = Ce("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
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
  ], x = () => [...S(), ee, J], k = () => ["auto", "hidden", "clip", "visible", "scroll"], D = () => ["auto", "contain", "none"], C = () => [ee, J, c], M = () => [en, "full", "auto", ...C()], T = () => [Mt, "none", "subgrid", ee, J], N = () => ["auto", {
    span: ["full", Mt, ee, J]
  }, Mt, ee, J], A = () => [Mt, "auto", ee, J], P = () => ["auto", "min", "max", "fr", ee, J], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], $ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], _ = () => ["auto", ...C()], U = () => [en, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...C()], I = () => [e, ee, J], R = () => [...S(), wi, bi, {
    position: [ee, J]
  }], W = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], K = () => ["auto", "cover", "contain", Wy, _y, {
    size: [ee, J]
  }], V = () => [jo, Rn, _t], G = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    ee,
    J
  ], Q = () => ["", ie, Rn, _t], z = () => ["solid", "dashed", "dotted", "double"], H = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], F = () => [ie, jo, wi, bi], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    ee,
    J
  ], le = () => ["none", ie, ee, J], ue = () => ["none", ie, ee, J], ve = () => [ie, ee, J], Se = () => [en, "full", ...C()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [lt],
      breakpoint: [lt],
      color: [Ly],
      container: [lt],
      "drop-shadow": [lt],
      ease: ["in", "out", "in-out"],
      font: [Oy],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [lt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [lt],
      shadow: [lt],
      spacing: ["px", ie],
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
        aspect: ["auto", "square", en, J, ee, y]
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
        columns: [ie, J, ee, a]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": w()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": w()
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
        object: x()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: k()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": k()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": k()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: D()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": D()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": D()
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
        inset: M()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": M()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": M()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: M()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: M()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: M()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: M()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: M()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: M()
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
        z: [Mt, "auto", ee, J]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [en, "full", "auto", a, ...C()]
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
        flex: [ie, en, "auto", "initial", "none", J]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ie, ee, J]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ie, ee, J]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Mt, "first", "last", "none", ee, J]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": T()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: N()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": A()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": A()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": T()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: N()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": A()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": A()
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
        gap: C()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": C()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": C()
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
        "justify-items": [...$(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...$()]
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
        items: [...$(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...$(), {
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
        "place-items": [...$(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...$()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: C()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: C()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: C()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: C()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: C()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: C()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: C()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: C()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: C()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: _()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: _()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: _()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: _()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: _()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: _()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: _()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: _()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: _()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": C()
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
        "space-y": C()
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
        size: U()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...U()]
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
          ...U()
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
          ...U()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...U()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...U()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...U()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Rn, _t]
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
        font: [r, ee, Vo]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", jo, J]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Hy, J, t]
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
        "line-clamp": [ie, "none", ee, Vo]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...C()
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
        placeholder: I()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: I()
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
        decoration: [...z(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ie, "from-font", "auto", ee, _t]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: I()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [ie, "auto", ee, J]
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
        indent: C()
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
        bg: R()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: W()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: K()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Mt, ee, J],
          radial: ["", ee, J],
          conic: [Mt, ee, J]
        }, zy, $y]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: I()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: V()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: V()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: V()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: I()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: I()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: I()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: G()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": G()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": G()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": G()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": G()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": G()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": G()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": G()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": G()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": G()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": G()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": G()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": G()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": G()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": G()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: Q()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": Q()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": Q()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": Q()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": Q()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": Q()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": Q()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": Q()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": Q()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": Q()
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
        "divide-y": Q()
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
        border: [...z(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...z(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: I()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": I()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": I()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": I()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": I()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": I()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": I()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": I()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": I()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: I()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...z(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ie, ee, J]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ie, Rn, _t]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: I()
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
          Nr,
          Dr
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: I()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", d, Nr, Dr]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": I()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: Q()
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
        ring: I()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ie, _t]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": I()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": Q()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": I()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", f, Nr, Dr]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": I()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [ie, ee, J]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...H(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": H()
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
        "mask-linear": [ie]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": F()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": F()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": I()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": F()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": F()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": I()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": F()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": F()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": I()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": F()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": F()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": I()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": F()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": F()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": I()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": F()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": F()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": I()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": F()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": F()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": I()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": I()
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
        "mask-radial-from": I()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": I()
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
        "mask-conic": [ie]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": F()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": F()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": I()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": I()
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
        mask: R()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: W()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: K()
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
        blur: Z()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ie, ee, J]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ie, ee, J]
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
          Nr,
          Dr
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": I()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", ie, ee, J]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ie, ee, J]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ie, ee, J]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ie, ee, J]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ie, ee, J]
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
        "backdrop-blur": Z()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ie, ee, J]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ie, ee, J]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ie, ee, J]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ie, ee, J]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ie, ee, J]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ie, ee, J]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ie, ee, J]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ie, ee, J]
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
        "border-spacing": C()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": C()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": C()
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
        duration: [ie, "initial", ee, J]
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
        delay: [ie, ee, J]
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
        "perspective-origin": x()
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
        skew: ve()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ve()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ve()
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
        origin: x()
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
        accent: I()
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
        caret: I()
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
        "scroll-m": C()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": C()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": C()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": C()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": C()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": C()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": C()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": C()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": C()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": C()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": C()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": C()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": C()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": C()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": C()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": C()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": C()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": C()
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
        fill: ["none", ...I()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ie, Rn, _t, Vo]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...I()]
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
}, Yy = /* @__PURE__ */ My(Uy);
function oe(...e) {
  return Yy(Kl(e));
}
function Ko({
  ...e
}) {
  return /* @__PURE__ */ m(sy, { "data-slot": "dropdown-menu", ...e });
}
function Go({
  ...e
}) {
  return /* @__PURE__ */ m(
    ay,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function qo({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ m(iy, { children: /* @__PURE__ */ m(
    cy,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: oe(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    }
  ) });
}
function be({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ m(
    ly,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: oe(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r
    }
  );
}
function Xo({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    uy,
    {
      "data-slot": "dropdown-menu-separator",
      className: oe("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
const xi = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ki = Kl, jy = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return ki(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((l) => {
    const u = n?.[l], d = s?.[l];
    if (u === null) return null;
    const f = xi(u) || xi(d);
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
  return ki(e, i, c, n?.class, n?.className);
}, ys = jy(
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
function Dt({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ m(
    r ? em : "button",
    {
      "data-slot": "button",
      className: oe(ys({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
var Vy = Object.freeze({
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
}), Ky = "VisuallyHidden", ou = E.forwardRef(
  (e, t) => /* @__PURE__ */ m(
    De.span,
    {
      ...e,
      ref: t,
      style: { ...Vy, ...e.style }
    }
  )
);
ou.displayName = Ky;
var Gy = ou, [wo] = kn("Tooltip", [
  ho
]), xo = ho(), su = "TooltipProvider", qy = 700, vs = "tooltip.open", [Xy, ma] = wo(su), au = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = qy,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = E.useRef(!0), a = E.useRef(!1), c = E.useRef(0);
  return E.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ m(
    Xy,
    {
      scope: t,
      isOpenDelayedRef: i,
      delayDuration: n,
      onOpen: E.useCallback(() => {
        window.clearTimeout(c.current), i.current = !1;
      }, []),
      onClose: E.useCallback(() => {
        window.clearTimeout(c.current), c.current = window.setTimeout(
          () => i.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: a,
      onPointerInTransitChange: E.useCallback((l) => {
        a.current = l;
      }, []),
      disableHoverableContent: o,
      children: s
    }
  );
};
au.displayName = su;
var Kn = "Tooltip", [Zy, er] = wo(Kn), iu = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, c = ma(Kn, e.__scopeTooltip), l = xo(t), [u, d] = E.useState(null), f = Vr(), p = E.useRef(0), h = i ?? c.disableHoverableContent, g = a ?? c.delayDuration, y = E.useRef(!1), [v, b] = Gs({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (D) => {
      D ? (c.onOpen(), document.dispatchEvent(new CustomEvent(vs))) : c.onClose(), s?.(D);
    },
    caller: Kn
  }), w = E.useMemo(() => v ? y.current ? "delayed-open" : "instant-open" : "closed", [v]), S = E.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y.current = !1, b(!0);
  }, [b]), x = E.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, b(!1);
  }, [b]), k = E.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      y.current = !0, b(!0), p.current = 0;
    }, g);
  }, [g, b]);
  return E.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ m(qc, { ...l, children: /* @__PURE__ */ m(
    Zy,
    {
      scope: t,
      contentId: f,
      open: v,
      stateAttribute: w,
      trigger: u,
      onTriggerChange: d,
      onTriggerEnter: E.useCallback(() => {
        c.isOpenDelayedRef.current ? k() : S();
      }, [c.isOpenDelayedRef, k, S]),
      onTriggerLeave: E.useCallback(() => {
        h ? x() : (window.clearTimeout(p.current), p.current = 0);
      }, [x, h]),
      onOpen: S,
      onClose: x,
      disableHoverableContent: h,
      children: n
    }
  ) });
};
iu.displayName = Kn;
var bs = "TooltipTrigger", cu = E.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = er(bs, n), s = ma(bs, n), i = xo(n), a = E.useRef(null), c = Le(t, a, o.onTriggerChange), l = E.useRef(!1), u = E.useRef(!1), d = E.useCallback(() => l.current = !1, []);
    return E.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ m(Xc, { asChild: !0, ...i, children: /* @__PURE__ */ m(
      De.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: se(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !u.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: se(e.onPointerLeave, () => {
          o.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: se(e.onPointerDown, () => {
          o.open && o.onClose(), l.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: se(e.onFocus, () => {
          l.current || o.onOpen();
        }),
        onBlur: se(e.onBlur, o.onClose),
        onClick: se(e.onClick, o.onClose)
      }
    ) });
  }
);
cu.displayName = bs;
var pa = "TooltipPortal", [Qy, Jy] = wo(pa, {
  forceMount: void 0
}), lu = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = er(pa, t);
  return /* @__PURE__ */ m(Qy, { scope: t, forceMount: n, children: /* @__PURE__ */ m(Yt, { present: n || s.open, children: /* @__PURE__ */ m(oa, { asChild: !0, container: o, children: r }) }) });
};
lu.displayName = pa;
var gn = "TooltipContent", uu = E.forwardRef(
  (e, t) => {
    const n = Jy(gn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = er(gn, e.__scopeTooltip);
    return /* @__PURE__ */ m(Yt, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ m(du, { side: o, ...s, ref: t }) : /* @__PURE__ */ m(ev, { side: o, ...s, ref: t }) });
  }
), ev = E.forwardRef((e, t) => {
  const n = er(gn, e.__scopeTooltip), r = ma(gn, e.__scopeTooltip), o = E.useRef(null), s = Le(t, o), [i, a] = E.useState(null), { trigger: c, onClose: l } = n, u = o.current, { onPointerInTransitChange: d } = r, f = E.useCallback(() => {
    a(null), d(!1);
  }, [d]), p = E.useCallback(
    (h, g) => {
      const y = h.currentTarget, v = { x: h.clientX, y: h.clientY }, b = ov(v, y.getBoundingClientRect()), w = sv(v, b), S = av(g.getBoundingClientRect()), x = cv([...w, ...S]);
      a(x), d(!0);
    },
    [d]
  );
  return E.useEffect(() => () => f(), [f]), E.useEffect(() => {
    if (c && u) {
      const h = (y) => p(y, u), g = (y) => p(y, c);
      return c.addEventListener("pointerleave", h), u.addEventListener("pointerleave", g), () => {
        c.removeEventListener("pointerleave", h), u.removeEventListener("pointerleave", g);
      };
    }
  }, [c, u, p, f]), E.useEffect(() => {
    if (i) {
      const h = (g) => {
        const y = g.target, v = { x: g.clientX, y: g.clientY }, b = c?.contains(y) || u?.contains(y), w = !iv(v, i);
        b ? f() : w && (f(), l());
      };
      return document.addEventListener("pointermove", h), () => document.removeEventListener("pointermove", h);
    }
  }, [c, u, i, l, f]), /* @__PURE__ */ m(du, { ...e, ref: s });
}), [tv, nv] = wo(Kn, { isInside: !1 }), rv = /* @__PURE__ */ nm("TooltipContent"), du = E.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, c = er(gn, n), l = xo(n), { onClose: u } = c;
    return E.useEffect(() => (document.addEventListener(vs, u), () => document.removeEventListener(vs, u)), [u]), E.useEffect(() => {
      if (c.trigger) {
        const d = (f) => {
          f.target?.contains(c.trigger) && u();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [c.trigger, u]), /* @__PURE__ */ m(
      qs,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ L(
          Zc,
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
              /* @__PURE__ */ m(rv, { children: r }),
              /* @__PURE__ */ m(tv, { scope: n, isInside: !0, children: /* @__PURE__ */ m(Gy, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
uu.displayName = gn;
var fu = "TooltipArrow", mu = E.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = xo(n);
    return nv(
      fu,
      n
    ).isInside ? null : /* @__PURE__ */ m(Qc, { ...o, ...r, ref: t });
  }
);
mu.displayName = fu;
function ov(e, t) {
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
function sv(e, t, n = 5) {
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
function av(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function iv(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, u = a.y, d = c.x, f = c.y;
    u > r != f > r && n < (d - l) * (r - u) / (f - u) + l && (o = !o);
  }
  return o;
}
function cv(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), lv(t);
}
function lv(e) {
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
var uv = au, dv = iu, fv = cu, mv = lu, pv = uu, hv = mu;
function gv({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ m(
    uv,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function ws({
  ...e
}) {
  return /* @__PURE__ */ m(gv, { children: /* @__PURE__ */ m(dv, { "data-slot": "tooltip", ...e }) });
}
function xs({
  ...e
}) {
  return /* @__PURE__ */ m(fv, { "data-slot": "tooltip-trigger", ...e });
}
function ks({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ m(mv, { children: /* @__PURE__ */ L(
    pv,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: oe(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ m(hv, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const we = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
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
  return o ? /* @__PURE__ */ L(ws, { children: [
    /* @__PURE__ */ m(xs, { asChild: !0, children: s }),
    /* @__PURE__ */ m(ks, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, tn = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), yv = vn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const c = j(null), [l, u] = Y(!1), [d, f] = Y(void 0), p = tc({
    editor: t,
    selector: ({ editor: k }) => ({
      canUndo: k.can().undo(),
      canRedo: k.can().redo(),
      isBold: k.isActive("bold"),
      isItalic: k.isActive("italic"),
      isUnderline: k.isActive("underline"),
      isStrike: k.isActive("strike"),
      isCode: k.isActive("code"),
      isHighlight: k.isActive("highlight"),
      isH1: k.isActive("heading", { level: 1 }),
      isH2: k.isActive("heading", { level: 2 }),
      isH3: k.isActive("heading", { level: 3 }),
      isH4: k.isActive("heading", { level: 4 }),
      isH5: k.isActive("heading", { level: 5 }),
      isBlockquote: k.isActive("blockquote"),
      isBulletList: k.isActive("bulletList"),
      isOrderedList: k.isActive("orderedList"),
      isTaskList: k.isActive("taskList"),
      isCodeBlock: k.isActive("codeBlock"),
      isLink: k.isActive("link")
    })
  }), h = B(() => {
    const { view: k } = t, { from: D } = k.state.selection, C = k.coordsAtPos(D);
    f({ top: C.bottom + 8, left: C.left }), u(!0);
  }, [t]), g = B((k, D) => {
    t.chain().focus().setImage({ src: k, alt: D }).run(), u(!1);
  }, [t]), y = B(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), v = B((k) => {
    t.chain().focus().insertCallout({ type: k }).run();
  }, [t]), b = j(/* @__PURE__ */ new Map()), w = j(/* @__PURE__ */ new Map()), S = B((k) => {
    const { doc: D, tr: C } = k.state;
    let M = !1;
    const T = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), N = k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    b.current.clear(), N.forEach((P, O) => {
      P.querySelectorAll(":scope > li").forEach((_) => {
        const U = _, I = (U.textContent || "").trim().substring(0, 50);
        b.current.set(`${O}-${I}`, U.getBoundingClientRect());
      });
    });
    const A = [];
    D.descendants((P, O, $, _) => {
      if (!T.has(P.type.name)) return !0;
      let U = !1;
      if (P.forEach((R) => {
        R.type.name === "taskItem" && (U = !0);
      }), !U) return !0;
      let I = 0;
      return D.nodesBetween(0, O, (R) => (T.has(R.type.name) && I++, !0)), A.push({ node: P, pos: O, depth: I }), !0;
    }), A.sort((P, O) => O.depth - P.depth);
    for (const { node: P, pos: O } of A) {
      const $ = [];
      let _ = 0;
      P.forEach((z) => {
        $.push({
          node: z,
          isTask: z.type.name === "taskItem",
          checked: z.type.name === "taskItem" && z.attrs.checked === !0,
          originalIndex: _++
        });
      });
      const U = $.filter((z) => z.isTask && !z.checked), I = $.filter((z) => z.isTask && z.checked), R = [...$], W = $.map((z, H) => ({ index: H, isTask: z.isTask })).filter((z) => z.isTask).map((z) => z.index), K = [...U, ...I];
      if (W.forEach((z, H) => {
        R[z] = K[H];
      }), !R.some((z, H) => z.node !== $[H].node)) continue;
      const G = P.type.create(
        P.attrs,
        R.map((z) => z.node)
      ), Q = C.mapping.map(O);
      C.replaceWith(Q, Q + P.nodeSize, G), M = !0;
    }
    M && (k.view.dispatch(C), requestAnimationFrame(() => {
      k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const $ = O.querySelectorAll(":scope > li"), _ = /* @__PURE__ */ new Map();
        b.current.forEach((U, I) => {
          const R = I.replace(/^\d+-/, "");
          _.set(R, U);
        }), $.forEach((U) => {
          const I = U, R = (I.textContent || "").trim().substring(0, 50), W = _.get(R);
          if (!W) return;
          const K = I.getBoundingClientRect(), V = W.top - K.top;
          if (Math.abs(V) < 2) return;
          I.style.transform = `translateY(${V}px)`, I.style.transition = "none", I.style.zIndex = "1", I.offsetHeight, I.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", I.style.transform = "translateY(0)";
          const G = () => {
            I.style.transform = "", I.style.transition = "", I.style.zIndex = "", I.removeEventListener("transitionend", G);
          };
          I.addEventListener("transitionend", G), setTimeout(G, 400);
        });
      });
    }));
  }, []);
  q(() => {
    if (!s || !t) return;
    const k = /* @__PURE__ */ new Map();
    t.state.doc.descendants((C, M) => (C.type.name === "taskItem" && k.set(M, C.attrs.checked === !0), !0)), w.current = k;
    const D = ({ transaction: C }) => {
      if (!C.docChanged) return;
      const M = /* @__PURE__ */ new Map();
      t.state.doc.descendants((A, P) => (A.type.name === "taskItem" && M.set(P, A.attrs.checked === !0), !0));
      const T = w.current;
      let N = !1;
      if (T.size > 0 && M.size > 0) {
        let A = 0, P = 0;
        T.forEach((O) => {
          O && A++;
        }), M.forEach((O) => {
          O && P++;
        }), A !== P && (N = !0);
      }
      w.current = M, N && setTimeout(() => {
        S(t);
      }, 150);
    };
    return t.on("transaction", D), () => {
      t.off("transaction", D);
    };
  }, [t, s, S]);
  const x = B(() => {
    S(t);
  }, [t, S]);
  return /* @__PURE__ */ L("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${o}`, children: [
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Id, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(Pd, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(tn, {}),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(Ls, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m(Rs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(Is, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(Ps, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(oc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(sc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(Os, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(tn, {}),
    /* @__PURE__ */ L(Ko, { children: [
      /* @__PURE__ */ m(Go, { asChild: !0, children: /* @__PURE__ */ L(
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
            /* @__PURE__ */ m(Nt, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ L(qo, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !p?.isH1 && !p?.isH2 && !p?.isH3 && !p?.isH4 && !p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }),
              "Paragraph"
            ]
          }
        ),
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: p?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 1" })
            ]
          }
        ),
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: p?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 2" })
            ]
          }
        ),
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: p?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 3" })
            ]
          }
        ),
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: p?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 4" })
            ]
          }
        ),
        /* @__PURE__ */ L(
          be,
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
    /* @__PURE__ */ m(tn, {}),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(_s, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m($s, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m(Hs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(Ws, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(ac, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ m(Od, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(_d, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(tn, {}),
    /* @__PURE__ */ m(
      we,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m(ss, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: h,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m(Ns, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      we,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ m(ic, { size: 16 })
      }
    ),
    /* @__PURE__ */ L(Ko, { children: [
      /* @__PURE__ */ m(Go, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ m(jr, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ L(qo, { align: "start", children: [
        /* @__PURE__ */ L(be, { onClick: () => v("info"), children: [
          /* @__PURE__ */ m(jr, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ L(be, { onClick: () => v("note"), children: [
          /* @__PURE__ */ m(zs, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ L(be, { onClick: () => v("prompt"), children: [
          /* @__PURE__ */ m($d, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ L(be, { onClick: () => v("resources"), children: [
          /* @__PURE__ */ m(Hd, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ L(be, { onClick: () => v("todo"), children: [
          /* @__PURE__ */ m(Bs, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ L(Ko, { children: [
      /* @__PURE__ */ m(Go, { asChild: !0, children: /* @__PURE__ */ L(
        Dt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ m(ss, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ L(qo, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ m(Wa, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ m(Wa, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ m(sn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ m(Xo, {}),
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ m(za, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ m(za, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ m(sn, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ m(Xo, {}),
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ m(Ba, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ m(Ba, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ m(Xo, {}),
        /* @__PURE__ */ L(
          be,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ m(sn, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ m(
      bc,
      {
        isOpen: l,
        onClose: () => u(!1),
        onInsert: g,
        position: d
      }
    ),
    /* @__PURE__ */ m(tn, {}),
    /* @__PURE__ */ m(
      we,
      {
        onClick: x,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m(Wd, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ L(xe, { children: [
      /* @__PURE__ */ m(tn, {}),
      /* @__PURE__ */ L(ws, { children: [
        /* @__PURE__ */ m(xs, { asChild: !0, children: /* @__PURE__ */ m(
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
            children: /* @__PURE__ */ m(ao, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ m(ks, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ m("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ L(ws, { children: [
      /* @__PURE__ */ m(xs, { asChild: !0, children: /* @__PURE__ */ L(
        Dt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ m(bn, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ m(ks, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function vv({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: c }) {
  const l = s === "markdown", [u, d] = Y(""), [f, p] = Y(""), [h, g] = Y(!1), [y, v] = Y(!1), [b, w] = Y(!1), [S, x] = Y(!1), [k, D] = Y([]), [C, M] = Y(0), [T, N] = Y(null), [A, P] = Y(!1), O = j(!1), $ = j(null), _ = j(null), U = j(!1);
  q(() => {
    t && o && o.trim() && d(o);
  }, [t, o, r]);
  const I = B(() => {
    if (!u || !e) {
      D([]), M(0), N(null);
      return;
    }
    const z = [];
    let H;
    try {
      if (y)
        H = new RegExp(u, h ? "g" : "gi");
      else {
        let F = u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        b && (F = `\\b${F}\\b`), H = new RegExp(F, h ? "g" : "gi");
      }
      N(null);
    } catch (F) {
      N(F.message), D([]);
      return;
    }
    if (l) {
      let F;
      for (; (F = H.exec(i)) !== null; )
        z.push({
          from: F.index,
          to: F.index + F[0].length,
          text: F[0]
        });
    } else {
      const { doc: F } = e.state;
      F.descendants((Z, le) => {
        if (Z.isText && Z.text) {
          let ue;
          for (; (ue = H.exec(Z.text)) !== null; )
            z.push({
              from: le + ue.index,
              to: le + ue.index + ue[0].length,
              text: ue[0]
            });
        }
        return !0;
      });
    }
    D(z), z.length > 0 && C >= z.length && M(0);
  }, [u, h, y, b, e, C, l, i]);
  q(() => {
    I();
  }, [I]), q(() => {
    l && c && (t && k.length > 0 ? c(k, C) : c([], 0));
  }, [l, t, k, C, c]), q(() => {
    if (!e) return;
    if (l) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const z = typeof e.commands.setSearchHighlight == "function";
    t && u && z ? e.commands.setSearchHighlight({
      searchTerm: u,
      caseSensitive: h,
      useRegex: y,
      currentMatchIndex: C
    }) : z && e.commands.clearSearchHighlight();
  }, [e, t, u, h, y, C, l, k, i]), q(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), c && c([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), P(!1)), O.current = !1);
  }, [t, e, c]), q(() => {
    if (k.length > 0 && C < k.length) {
      const z = k[C];
      if (l) {
        const F = document.querySelector(".syntax-textarea");
        if (F && U.current) {
          const Z = parseInt(getComputedStyle(F).lineHeight) || 22, ue = i.substring(0, z.from).split(`
`).length;
          F.scrollTop = Math.max(0, (ue - 3) * Z);
        }
        U.current && (U.current = !1);
        return;
      }
      const H = e.view.domAtPos(z.from);
      H.node && H.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), U.current && (U.current = !1);
    }
  }, [C, k, e, l, i]), q(() => {
    t && $.current && ($.current.focus(), $.current.select());
  }, [t, r]);
  const R = B(() => {
    k.length !== 0 && (U.current = !0, M((z) => (z + 1) % k.length));
  }, [k.length]), W = B(() => {
    k.length !== 0 && (U.current = !0, M((z) => (z - 1 + k.length) % k.length));
  }, [k.length]), K = B(() => {
    if (k.length === 0 || C >= k.length) return;
    const z = k[C];
    if (l && a) {
      const H = i.substring(0, z.from) + f + i.substring(z.to);
      a(H), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: z.from, to: z.to }).deleteSelection().insertContent(f).run(), setTimeout(I, 10);
  }, [k, C, f, e, I, l, i, a]), V = B(() => {
    if (k.length === 0) return;
    if (l && a) {
      const H = [...k].sort((Z, le) => le.from - Z.from);
      let F = i;
      H.forEach((Z) => {
        F = F.substring(0, Z.from) + f + F.substring(Z.to);
      }), a(F), setTimeout(I, 10);
      return;
    }
    const z = [...k].sort((H, F) => F.from - H.from);
    e.chain().focus(), z.forEach((H) => {
      e.chain().setTextSelection({ from: H.from, to: H.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(I, 10);
  }, [k, f, e, I, l, i, a]), G = B(() => {
    if (k.length === 0 || !u || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: u,
      caseSensitive: h,
      useRegex: y,
      wholeWord: b
    }) && (P(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [k, u, h, y, b, e, n]), Q = B((z) => {
    z.key === "Enter" ? (z.preventDefault(), z.shiftKey ? W() : R(), $.current?.focus()) : z.key === "Escape" ? (z.preventDefault(), n()) : z.key === "h" && (z.ctrlKey || z.metaKey) ? (z.preventDefault(), x((H) => !H)) : z.key === "l" && (z.ctrlKey || z.metaKey) && z.shiftKey && (z.preventDefault(), G());
  }, [R, W, n, G]);
  return t ? /* @__PURE__ */ L(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: Q,
      children: [
        /* @__PURE__ */ L("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ L("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(zd, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: $,
                type: "text",
                placeholder: "Find...",
                value: u,
                onChange: (z) => d(z.target.value),
                className: `find-replace-input ${T ? "has-error" : ""}`
              }
            ),
            T && /* @__PURE__ */ m("span", { className: "find-replace-error", title: T, children: "!" })
          ] }),
          /* @__PURE__ */ m("span", { className: "find-replace-count", children: k.length > 0 ? `${C + 1} of ${k.length}` : u ? "No results" : "" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: W,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ m(Bd, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: R,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ m(Nt, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: G,
              disabled: k.length === 0,
              className: `find-replace-btn ${A ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${k.length} matches`,
              children: /* @__PURE__ */ m(Fd, { size: 16 })
            }
          ),
          /* @__PURE__ */ m("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => g((z) => !z),
              className: `find-replace-btn ${h ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ m(Ud, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => w((z) => !z),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ m(Yd, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => v((z) => !z),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ m(jd, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => x((z) => !z),
              className: `find-replace-btn ${S ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ m(as, { size: 16 })
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
        S && /* @__PURE__ */ L("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ L("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(as, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: _,
                type: "text",
                placeholder: "Replace with...",
                value: f,
                onChange: (z) => p(z.target.value),
                className: "find-replace-input"
              }
            )
          ] }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: K,
              disabled: k.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            }
          ),
          /* @__PURE__ */ L(
            "button",
            {
              onClick: V,
              disabled: k.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ m(Vd, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const bv = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), ut = bv ? "⌘" : "Ctrl", wv = ({ editor: e }) => {
  const [t, n] = Y(!1), [r, o] = Y(0), [s, i] = Y(0), [a, c] = Y(""), [l, u] = Y(""), [d, f] = Y(!1), [p, h] = Y(!1);
  q(() => {
    if (!e) return;
    const D = () => {
      const M = e.storage.selectAllOccurrences;
      M ? (n(M.isActive), o(M.ranges.length), i(M.allMatches.length), c(M.searchTerm), u(M.typedBuffer), f(M.isTypingReplace), h(M.isIncremental)) : (n(!1), o(0), i(0));
    }, C = () => {
      D();
    };
    return e.on("transaction", C), D(), () => {
      e.off("transaction", C);
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
  }, [e]), w = B(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), S = B(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), x = B(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), k = B(() => {
    a && (e.commands.selectAllOccurrences({
      searchTerm: a,
      caseSensitive: !1,
      useRegex: !1,
      wholeWord: !1
    }), e.commands.focus());
  }, [e, a]);
  return !t || r === 0 ? null : /* @__PURE__ */ L("div", { className: "select-all-action-bar", children: [
    /* @__PURE__ */ L("div", { className: "select-all-action-bar-inner", children: [
      /* @__PURE__ */ L("div", { className: "select-all-action-bar-count", children: [
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-number", children: p && s > 0 ? `${r}/${s}` : r }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-label", children: "selected" })
      ] }),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ L(xe, { children: [
        /* @__PURE__ */ m(so, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-old", children: a }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-new", children: l || "∅" })
      ] }) : /* @__PURE__ */ m(xe, { children: /* @__PURE__ */ L("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
        '"'
      ] }) }) }),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }),
      p && r < s && /* @__PURE__ */ L(xe, { children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: x,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${ut}+D)`,
            children: /* @__PURE__ */ m(Fs, { size: 14 })
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: k,
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
          children: /* @__PURE__ */ m(Ls, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${ut}+I)`,
          children: /* @__PURE__ */ m(Rs, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${ut}+U)`,
          children: /* @__PURE__ */ m(Is, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ m(Ps, { size: 14 })
        }
      ),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: w,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ m(sn, { size: 14 })
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
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ L(xe, { children: [
      /* @__PURE__ */ L("kbd", { children: [
        ut,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ L("kbd", { children: [
        ut,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ L("kbd", { children: [
        ut,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ L(xe, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ L("kbd", { children: [
        ut,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, xv = vn(wv), Ar = "-dismissed";
function kv(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function Cv(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: r = 1e3,
    enabled: o = !0,
    onSave: s,
    onRecover: i
  } = t, [a, c] = Y({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), l = j(null), u = j(""), d = j(0);
  q(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const v = localStorage.getItem(n), b = localStorage.getItem(n + Ar);
        if (v && !b) {
          let w = "";
          try {
            w = e.getHTML() || "";
          } catch {
            return;
          }
          v !== w && v.length > 50 && c((S) => ({ ...S, hasRecoverableContent: !0 }));
        }
      } catch (v) {
        console.warn("useAutoSave: Error checking for recoverable content", v);
      }
  }, [e, n, o]);
  const f = B(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const v = e.getHTML(), b = kv(v);
        if (b === d.current && v.length === u.current.length) {
          c((w) => ({ ...w, status: "saved" }));
          return;
        }
        if (v.length < 20)
          return;
        c((w) => ({ ...w, status: "saving" })), localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), u.current = v, d.current = b, c((w) => ({
          ...w,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(v), setTimeout(() => {
          c((w) => w.status === "saved" ? { ...w, status: "idle" } : w);
        }, 2e3);
      } catch (v) {
        console.error("useAutoSave: Error saving content", v), c((b) => ({
          ...b,
          status: "error",
          error: v instanceof Error ? v.message : "Failed to save"
        }));
      }
  }, [e, n, o, s]);
  q(() => {
    if (!e || !o || e.isDestroyed) return;
    const v = () => {
      e.isDestroyed || (l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        f();
      }, r));
    };
    return e.on("update", v), () => {
      e.off("update", v), l.current && clearTimeout(l.current);
    };
  }, [e, r, o, f]), q(() => {
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
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Ar), u.current = "", c({
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
            e.commands.setContent(v), u.current = v, localStorage.removeItem(n + Ar), i?.(v);
          } catch (b) {
            console.warn("useAutoSave: Error setting content during recovery", b);
          }
      }), v) : null;
    } catch (v) {
      return console.warn("useAutoSave: Error recovering content", v), null;
    }
  }, [e, n, i]), y = B(() => {
    try {
      localStorage.setItem(n + Ar, "true"), c((v) => ({ ...v, hasRecoverableContent: !1 }));
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
function Ur(e, t, n) {
  const { state: r } = e, { tr: o } = r;
  t !== n && o.delete(t, n);
  const s = o.doc.resolve(t), i = r.schema.nodes.horizontalRule.create(), a = s.before(s.depth), c = s.after(s.depth);
  o.replaceWith(a, c, i);
  const l = a + i.nodeSize;
  if (l < o.doc.content.size) {
    const u = o.doc.resolve(l);
    u.nodeAfter && u.nodeAfter.isTextblock ? o.setSelection(nt.create(o.doc, l + 1)) : u.nodeAfter && o.setSelection(nt.near(o.doc.resolve(l)));
  } else {
    const d = r.schema.nodes.paragraph.create();
    o.insert(l, d), o.setSelection(nt.create(o.doc, l + 1));
  }
  o.scrollIntoView(), e.view.dispatch(o);
}
function Mv(e, {
  editor: t,
  turndownService: n,
  editorModeRef: r,
  handleModeSwitch: o,
  wordCount: s,
  autoSaveState: i,
  setIsFindReplaceOpen: a,
  setFindReplaceFocusTrigger: c
}) {
  Nd(e, () => ({
    getEditor: () => t,
    getHTML: () => t?.getHTML() || "",
    getMarkdown: () => t ? n.turndown(t.getHTML()) : "",
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
      t && Ur(t, t.state.selection.from, t.state.selection.from);
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
const Sv = new Ie("tableCellMenu");
let Ci = !1, Lr = null;
function Ev() {
  Ci || (Ci = !0, document.addEventListener("mouseover", (e) => {
    const n = e.target.closest("td, th");
    if (n && n.closest(".ProseMirror")) {
      const r = n.querySelector(".table-cell-menu-btn");
      r && (r.style.opacity = "1");
    }
  }, !0), document.addEventListener("mouseout", (e) => {
    const t = e.target, n = e.relatedTarget, r = t.closest("td, th");
    if (r && r.closest(".ProseMirror")) {
      if (n && r.contains(n) || document.querySelector(".table-cell-menu-dropdown")) return;
      const s = r.querySelector(".table-cell-menu-btn");
      s && (s.style.opacity = "0");
    }
  }, !0));
}
function Tv(e) {
  return Ev(), new Re({
    key: Sv,
    state: {
      init() {
        return _e.empty;
      },
      apply(t, n, r, o) {
        return !t.docChanged && Lr ? Lr.map(t.mapping, t.doc) : (Lr = Dv(o.doc, e), Lr);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Dv(e, t) {
  const n = [];
  return e.descendants((r, o) => {
    if (r.type.name === "tableCell" || r.type.name === "tableHeader") {
      const s = Ye.widget(o + 1, (i) => {
        const a = document.createElement("div");
        a.className = "table-cell-menu-wrapper ProseMirror-widget", a.setAttribute("contenteditable", "false"), a.style.cssText = "position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;";
        const c = document.createElement("button");
        c.className = "table-cell-menu-btn", c.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>', c.title = "Table options", c.type = "button";
        const l = document.documentElement.classList.contains("dark"), u = l ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)", d = l ? "rgba(60,60,60,0.5)" : "rgba(200,200,200,0.5)", f = l ? "#999" : "#666", p = l ? "#2a2a2a" : "#f5f5f5";
        return c.style.cssText = "width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:" + u + ";border:1px solid " + d + ";border-radius:4px;cursor:pointer;opacity:0;transition:opacity 0.15s ease,background-color 0.15s ease,transform 0.1s ease;color:" + f + ";pointer-events:auto;padding:0;", c.addEventListener("mouseenter", () => {
          c.style.opacity = "1", c.style.background = p, c.style.transform = "scale(1.05)";
        }), c.addEventListener("mouseleave", () => {
          document.querySelector(".table-cell-menu-dropdown"), c.style.background = u, c.style.transform = "scale(1)";
        }), c.addEventListener("click", (h) => {
          h.preventDefault(), h.stopPropagation();
          const g = c.getBoundingClientRect();
          t.chain().focus().setTextSelection(o + 1).run(), Nv(h, t, o, g);
        }), a.appendChild(c), a;
      }, { side: -1, key: "menu-" + o });
      n.push(s);
    }
  }), _e.create(e, n);
}
function Nv(e, t, n, r) {
  const o = document.querySelector(".table-cell-menu-dropdown");
  o && o.remove();
  const s = document.createElement("div");
  s.className = "table-cell-menu-dropdown";
  const i = 170, a = 280;
  let c = Math.max(0, Math.min(r.top, window.innerHeight)), l = Math.max(0, Math.min(r.bottom, window.innerHeight)), u = Math.max(0, Math.min(r.left, window.innerWidth)), d = l + 4, f = u - i + r.width + 8;
  f + i > window.innerWidth - 12 && (f = window.innerWidth - i - 12), f < 12 && (f = 12), d + a > window.innerHeight - 12 && (d = c - a - 4), d < 12 && (d = 12), d + a > window.innerHeight - 12 && (d = window.innerHeight - a - 12);
  const p = document.documentElement.classList.contains("dark"), h = p ? "#1f1f1f" : "#ffffff", g = p ? "#3a3a3a" : "#e5e5e5", y = p ? "#e5e5e5" : "#333333";
  s.style.cssText = "position:fixed;top:" + d + "px;left:" + f + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + h + ";border:1px solid " + g + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + y + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const v = t.state.doc.resolve(n);
  let b = !1;
  for (let N = v.depth; N >= 0; N--)
    if (v.node(N).type.name === "table") {
      v.node(N).firstChild?.firstChild?.type.name === "tableHeader" && (b = !0);
      break;
    }
  const w = [
    { label: "Insert Column Left", icon: "col-left", action: () => t.chain().focus().setTextSelection(n + 1).addColumnBefore().run() },
    { label: "Insert Column Right", icon: "col-right", action: () => t.chain().focus().setTextSelection(n + 1).addColumnAfter().run() },
    { label: "Insert Row Above", icon: "row-up", action: () => t.chain().focus().setTextSelection(n + 1).addRowBefore().run() },
    { label: "Insert Row Below", icon: "row-down", action: () => t.chain().focus().setTextSelection(n + 1).addRowAfter().run() },
    { label: "divider" },
    { label: b ? "✓ Header Row" : "  Header Row", icon: "toggle-header", action: () => t.chain().focus().setTextSelection(n + 1).toggleHeaderRow().run() },
    { label: "divider" },
    { label: "Delete Column", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteColumn().run(), destructive: !0 },
    { label: "Delete Row", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteRow().run(), destructive: !0 },
    { label: "Delete Table", icon: "table-delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteTable().run(), destructive: !0 },
    { label: "divider" },
    { label: "Copy Table", icon: "copy", action: () => Av(t) }
  ], S = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, x = p ? "#2a2a2a" : "#f5f5f5", k = p ? "#ff6b6b" : "#dc2626", D = p ? "#999999" : "#666666", C = p ? "#333333" : "#e5e5e5";
  w.forEach((N) => {
    if (N.label === "divider") {
      const A = document.createElement("div");
      A.style.cssText = "height:1px;background:" + C + ";margin:4px 0;", s.appendChild(A);
    } else {
      const A = document.createElement("button");
      A.type = "button";
      const P = N.destructive ? k : y;
      A.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + P + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const O = S[N.icon || ""] || "", $ = N.destructive ? k : D;
      A.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + $ + ';">' + O + '</span><span style="flex:1;white-space:nowrap;">' + N.label + "</span>", A.addEventListener("mouseenter", () => {
        A.style.background = N.destructive ? p ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : x;
      }), A.addEventListener("mouseleave", () => {
        A.style.background = "transparent";
      }), A.addEventListener("click", (_) => {
        _.preventDefault(), _.stopPropagation(), N.action && N.action(), s.remove();
      }), s.appendChild(A);
    }
  }), document.body.appendChild(s);
  const M = (N) => {
    const A = N.target;
    if (s.contains(A) || A.classList.contains("table-cell-menu-btn"))
      return;
    const P = A.closest('[role="dialog"]');
    P && P.contains(s) || (s.remove(), document.removeEventListener("mousedown", M), document.removeEventListener("keydown", T));
  }, T = (N) => {
    N.key === "Escape" && (s.remove(), document.removeEventListener("mousedown", M), document.removeEventListener("keydown", T));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", M), document.addEventListener("keydown", T);
  }, 0);
}
function Av(e) {
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
const Lv = Df.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Tv(this.editor)
    ];
  }
}), Rv = Nf.extend({}), Wn = new Ie("tableSorting");
let Wt = null, _n = null;
function Iv(e) {
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
function Pv(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function Ov(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (h, g) => {
    if (h.type.name === "table" && g === t)
      return s = h, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const i = Wt?.tablePos === t && Wt?.columnIndex === n && Wt?.direction === "asc" ? "desc" : "asc";
  Wt = { tablePos: t, columnIndex: n, direction: i }, _n = null;
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
    Mi(n, i), o.dispatch(r.tr.setMeta(Wn, { updated: !0 }));
    return;
  }
  const u = l.map((h) => {
    let g = "", y = 0;
    return h.node.forEach((v) => {
      y === n && (g = v.textContent || ""), y++;
    }), { ...h, sortValue: Iv(g) };
  }), d = u.map((h, g) => g);
  u.sort((h, g) => Pv(h.sortValue, g.sortValue, i));
  const f = u.map((h, g) => l.indexOf(h));
  if (d.some((h, g) => h !== f[g])) {
    const h = [];
    c.forEach((v) => h.push(v.node)), u.forEach((v) => h.push(v.node));
    const g = s.type.create(s.attrs, h), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, g), y.setMeta(Wn, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(Wn, { updated: !0 }));
  Mi(n, i);
}
function Mi(e, t) {
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
function _v(e, t, n, r) {
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
    u.preventDefault(), u.stopPropagation(), Ov(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function $v(e) {
  return new Re({
    key: Wn,
    state: {
      init() {
        return _e.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(Wn);
        return !t.docChanged && !s?.updated && _n ? _n.map(t.mapping, t.doc) : (_n = Hv(o.doc, e), _n);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Hv(e, t) {
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
              u.forEach((w, S) => {
                w.type.name === "paragraph" && (p = f + 1 + S + w.nodeSize - 1);
              });
              const g = Wt?.tablePos === s && Wt?.columnIndex === c ? Wt.direction : null, y = c, v = s, b = Ye.widget(p, () => _v(g, v, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(b);
            }
            l += u.nodeSize, c++;
          });
        }
      });
    }
  }), _e.create(e, n);
}
const Wv = Ze.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [$v(this.editor)];
  }
});
function ha(e, t, n, r, o, s = {}) {
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
const zv = Af.extend({
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
          if (ha(n, f, i, l, u, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Bv = Lf.extend({
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
          if (ha(n, f, c, l, u, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Fv = If.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: r, dispatch: o, chain: s, can: i }) => {
        const { selection: a } = n, { $from: c, $to: l } = a, u = c.blockRange(l);
        if (!u)
          return !1;
        const d = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let p = !1;
        for (let x = c.depth; x > 0; x--)
          if (c.node(x).type === d) {
            p = !0, c.before(x);
            break;
          }
        if (p)
          return t.liftListItem("taskItem");
        const h = n.schema.nodes.bulletList, g = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let v = null, b = -1;
        for (let x = c.depth; x > 0; x--) {
          const k = c.node(x);
          if (k.type === h || k.type === g) {
            v = k, b = c.before(x);
            break;
          }
        }
        if (v) {
          if (!o) return !0;
          const x = b, k = r.doc.nodeAt(x);
          if (!k) return !1;
          r.setNodeMarkup(x, d, k.attrs);
          const D = r.doc.nodeAt(x);
          if (!D) return !1;
          const C = [];
          D.forEach((M, T) => {
            M.type === y && C.push(x + 1 + T);
          });
          for (let M = C.length - 1; M >= 0; M--) {
            const T = C[M], N = r.doc.nodeAt(T);
            N && N.type === y && r.setNodeMarkup(T, f, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const w = Ua(u, d);
        if (w) {
          r.wrap(u, w);
          const { $from: x } = r.selection;
          let k = -1;
          for (let D = x.depth; D > 0; D--)
            if (x.node(D).type === d) {
              k = x.before(D);
              break;
            }
          if (k >= 0) {
            const D = r.doc.nodeAt(k);
            if (D) {
              const C = [];
              D.forEach((M, T) => {
                M.type === y && C.push(k + 1 + T);
              });
              for (let M = C.length - 1; M >= 0; M--) {
                const T = C[M], N = r.doc.nodeAt(T);
                N && N.type === y && r.setNodeMarkup(T, f, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const S = Ua(u, h);
        if (S) {
          r.wrap(u, S);
          const { $from: x } = r.selection;
          let k = -1;
          for (let D = x.depth; D > 0; D--)
            if (x.node(D).type === h) {
              k = x.before(D);
              break;
            }
          return k >= 0 && ha(r, k, d, f, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Uv = Pf.extend({
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
          return f.setSelection(nt.create(f.doc, y)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
      new Re({
        key: new Ie("taskItemInputRule"),
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
              b && b.type === t && Of(h.doc, f - 1) && h.join(f - 1);
            }
            return n.dispatch(h), !0;
          }
        }
      })
    ];
  }
}), Yv = Rf.extend({
  content: "paragraph block*"
}), Si = new Ie("collapsibleList");
function Cs(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function Ms(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function jv(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((i) => {
    n.includes(i.type.name) && (r === -1 && (r = s), o = s + i.nodeSize), s += i.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let ln = null;
function Zo(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !Ms(o))
      return !0;
    const i = Cs(o, s), a = t.collapsedItems.has(i);
    r.push(
      Ye.node(s, s + o.nodeSize, {
        class: `collapsible-list-item ${a ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": i
      })
    );
    const c = o.firstChild;
    if (c && c.type.name === "paragraph") {
      const l = s + 1 + c.nodeSize - 1, u = Ye.widget(
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
            h.classList.remove("collapsed", "expanded"), h.classList.add(y ? "expanded" : "collapsed"), h.title = y ? "Click to collapse" : "Click to expand", t.collapsedItems.has(i) ? t.collapsedItems.delete(i) : t.collapsedItems.add(i), ln && ln.dispatch(
              ln.state.tr.setMeta("collapsibleList", { toggled: i })
            );
          }), p.appendChild(h), p;
        },
        { side: 1, key: `list-chevron-${i}` }
      );
      r.push(u);
    }
    if (a && jv(o, s)) {
      let u = s + 1;
      o.forEach((d) => {
        ["bulletList", "orderedList", "taskList"].includes(d.type.name) && r.push(
          Ye.node(u, u + d.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), u += d.nodeSize;
      });
    }
    return !0;
  }), _e.create(e, r);
}
const Vv = Ze.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !Ms(o))
          return !1;
        const s = Cs(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && Ms(o) && n.collapsedItems.add(Cs(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Re({
        key: Si,
        view(n) {
          return ln = n, {
            update(r) {
              ln = r;
            },
            destroy() {
              ln = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: Zo(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: Zo(s.doc, e, t),
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
            return r?.decorations ? r.decorations : Zo(n.doc, e, t);
          }
        }
      })
    ];
  }
}), ye = Bf();
ye.register("javascript", js);
ye.register("js", js);
ye.register("jsx", js);
ye.register("typescript", Vs);
ye.register("ts", Vs);
ye.register("tsx", Vs);
ye.register("python", vc);
ye.register("py", vc);
ye.register("xml", Ks);
ye.register("html", Ks);
ye.register("svg", Ks);
ye.register("css", Ff);
ye.register("json", Uf);
ye.register("bash", co);
ye.register("sh", co);
ye.register("shell", co);
ye.register("zsh", co);
const Ss = {
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
}, Rr = /* @__PURE__ */ new Set(), Ir = /* @__PURE__ */ new Set();
async function Kv(e) {
  if (ye.registered(e)) return !0;
  const t = Ss[e];
  if (!t) return !1;
  if (Ir.has(e)) return !0;
  if (Rr.has(e))
    return new Promise((n) => {
      const r = () => {
        Ir.has(e) ? n(!0) : Rr.has(e) ? setTimeout(r, 50) : n(!1);
      };
      setTimeout(r, 50);
    });
  Rr.add(e);
  try {
    const r = (await t()).default;
    ye.register(e, r), Ir.add(e);
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
          i !== e && !ye.registered(i) && (ye.register(i, r), Ir.add(i));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Rr.delete(e);
  }
}
function Gv({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = Y(!1), [s, i] = Y(!1), [a, c] = Y(!0), l = j(null), u = e.attrs.language || "plaintext";
  q(() => {
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
  }, [s]), q(() => {
    if (s && u !== "plaintext") {
      if (ye.registered(u)) {
        c(!0);
        return;
      }
      Ss[u] && (c(!1), Kv(u).then((g) => {
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
  }, [e.textContent]), f = n.options.lowlight?.listLanguages?.() || [], p = Array.from(/* @__PURE__ */ new Set([...f, ...Object.keys(Ss)])).sort(), h = u === "plaintext" ? "Plain Text" : u.charAt(0).toUpperCase() + u.slice(1);
  return /* @__PURE__ */ L(pn, { className: "code-block-wrapper", ref: l, children: [
    /* @__PURE__ */ L("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ L("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ L(
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
        /* @__PURE__ */ m(Nt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: d,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ m(wn, { size: 14 }) : /* @__PURE__ */ m(bn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!s || !a ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m(Ds, { className: s && a ? `language-${u}` : "language-plaintext" }) })
  ] });
}
const qv = zf.extend({
  addNodeView() {
    return ro(Gv);
  }
}).configure({
  lowlight: ye,
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
  return bf(
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
const Pr = {
  info: { icon: jr, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: lc, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: cc, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: zs, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: Bs, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function Xv({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = Y(!1), [s, i] = Y(!1), [a, c] = Y(null), l = j(null), u = j(null), d = e.attrs.type || "info", f = Pr[d] || Pr.info, p = f.icon, h = B(() => {
    if (u.current) {
      const b = u.current.getBoundingClientRect();
      c({
        top: b.bottom + 4,
        left: b.left
      });
    }
  }, []);
  q(() => {
    if (!r) return;
    const b = (w) => {
      l.current && !l.current.contains(w.target) && u.current && !u.current.contains(w.target) && o(!1);
    };
    return document.addEventListener("mousedown", b), document.addEventListener("touchstart", b, { passive: !0 }), () => {
      document.removeEventListener("mousedown", b), document.removeEventListener("touchstart", b);
    };
  }, [r]), q(() => {
    if (!r) return;
    const b = () => o(!1);
    return window.addEventListener("scroll", b, !0), () => window.removeEventListener("scroll", b, !0);
  }, [r]);
  const g = B(() => {
    n.isEditable && (r || h(), o(!r));
  }, [n.isEditable, r, h]), y = (b) => {
    t({ type: b }), o(!1);
  }, v = B((b) => {
    b.stopPropagation(), i((w) => !w);
  }, []);
  return /* @__PURE__ */ L(pn, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
    /* @__PURE__ */ L(
      "div",
      {
        className: "callout-header",
        contentEditable: !1,
        onClick: v,
        style: { cursor: "pointer" },
        title: s ? "Click to expand" : "Click to collapse",
        children: [
          /* @__PURE__ */ L(
            "button",
            {
              ref: u,
              className: "callout-header-button",
              onClick: (b) => {
                b.stopPropagation(), g();
              },
              title: n.isEditable ? "Click to change callout type" : f.label,
              style: { color: f.borderColor },
              contentEditable: !1,
              children: [
                /* @__PURE__ */ m(p, { size: 18 }),
                /* @__PURE__ */ m("span", { className: "callout-label", children: f.label }),
                n.isEditable && /* @__PURE__ */ m(Nt, { size: 12, className: "callout-type-chevron" })
              ]
            }
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: f.borderColor },
              children: s ? /* @__PURE__ */ m(uc, { size: 16 }) : /* @__PURE__ */ m(Nt, { size: 16 })
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
              children: Object.keys(Pr).map((b) => {
                const w = Pr[b], S = w.icon;
                return /* @__PURE__ */ L(
                  "button",
                  {
                    className: `callout-type-option ${b === d ? "active" : ""}`,
                    onClick: (x) => {
                      x.stopPropagation(), y(b);
                    },
                    onMouseDown: (x) => x.stopPropagation(),
                    style: { "--callout-option-color": w.color },
                    children: [
                      /* @__PURE__ */ m(S, { size: 16, style: { color: w.borderColor } }),
                      /* @__PURE__ */ m("span", { children: w.label })
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
    /* @__PURE__ */ m("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ m(Ds, {}) })
  ] });
}
const Zv = io.create({
  name: "callout",
  addOptions() {
    return {
      HTMLAttributes: {},
      types: ["info", "note", "prompt", "resources", "todo"]
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
      xn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return ro(Xv);
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
}), Qv = Yf.extend({
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
        xn(this.options.HTMLAttributes, e)
      ]
    ];
  },
  addNodeView() {
    const e = this.options;
    return ({ node: t, editor: n, getPos: r }) => {
      let o = t;
      const s = document.createElement("figure");
      s.classList.add("image-resizer");
      const i = (R) => {
        const W = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[R] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${W}`;
      };
      i(t.attrs.align || "left");
      const a = document.createElement("img");
      a.alt = t.attrs.alt || "", t.attrs.width && (a.style.width = `${t.attrs.width}px`);
      const c = (R) => !(!R || R.startsWith("data:") || R.startsWith("blob:") || R.startsWith("http://") || R.startsWith("https://")), l = (R) => {
        c(R) && e.resolveImageSrc ? (a.style.opacity = "0.5", a.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(R).then((W) => {
          a.src = W, a.style.opacity = "1";
        }).catch(() => {
          a.src = R, a.style.opacity = "1";
        })) : a.src = R;
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
      const p = (R, W, K) => {
        const V = document.createElement("button");
        return V.setAttribute("type", "button"), V.style.cssText = `
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
        `, V.innerHTML = `${W}<span>${R}</span>`, V.addEventListener("mouseenter", () => {
          V.style.background = "oklch(0.95 0 0)";
        }), V.addEventListener("mouseleave", () => {
          V.style.background = "transparent";
        }), V.addEventListener("click", (G) => {
          G.preventDefault(), G.stopPropagation(), K(), f.style.display = "none", M = !1;
        }), V;
      }, h = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', v = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(p("Edit", h, () => {
        const R = typeof r == "function" ? r() : null;
        if (R != null && e.onImageClick) {
          const W = a.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: R,
            rect: W
          });
        }
      })), f.appendChild(p("Copy image", g, async () => {
        const R = o.attrs.src;
        try {
          const K = await (await fetch(R)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [K.type]: K })
          ]);
        } catch {
          try {
            const W = new window.Image();
            W.crossOrigin = "anonymous", await new Promise((G, Q) => {
              W.onload = () => G(), W.onerror = () => Q(new Error("Image load failed")), W.src = R;
            });
            const K = document.createElement("canvas");
            K.width = W.naturalWidth, K.height = W.naturalHeight;
            const V = K.getContext("2d");
            if (V) {
              V.drawImage(W, 0, 0);
              const G = await new Promise(
                (Q) => K.toBlob(Q, "image/png")
              );
              G ? await navigator.clipboard.write([
                new ClipboardItem({ "image/png": G })
              ]) : await navigator.clipboard.writeText(R);
            }
          } catch {
            try {
              await navigator.clipboard.writeText(R);
            } catch {
            }
          }
        }
      })), f.appendChild(p("Copy URL", v, async () => {
        const R = o.attrs.src;
        try {
          await navigator.clipboard.writeText(R);
        } catch {
        }
      })), f.appendChild(p("Save image", y, () => {
        const R = o.attrs.src, W = o.attrs.alt || "image", K = document.createElement("a");
        K.href = R, K.download = W, K.target = "_blank", K.rel = "noopener noreferrer", document.body.appendChild(K), K.click(), setTimeout(() => {
          document.body.removeChild(K);
        }, 100);
      }));
      const b = document.createElement("div");
      b.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, f.appendChild(b);
      const w = document.createElement("div");
      w.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: oklch(0.55 0 0);
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, w.textContent = "Alignment", f.appendChild(w);
      const S = document.createElement("div");
      S.style.cssText = `
        display: flex;
        margin: 4px 8px 4px;
        background: oklch(0.94 0 0);
        border-radius: 8px;
        padding: 3px;
        gap: 2px;
      `;
      const x = [
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
      ], k = [], D = (R) => {
        k.forEach((W) => {
          (W.getAttribute("data-align-value") || "left") === R ? (W.style.background = "oklch(1 0 0)", W.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", W.style.color = "oklch(0.25 0 0)", W.style.fontWeight = "600") : (W.style.background = "transparent", W.style.boxShadow = "none", W.style.color = "oklch(0.5 0 0)", W.style.fontWeight = "400");
        });
      };
      x.forEach(({ value: R, label: W, icon: K }) => {
        const V = document.createElement("button");
        V.setAttribute("type", "button"), V.setAttribute("data-align-value", R), V.setAttribute("title", `Align ${W.toLowerCase()}`), V.style.cssText = `
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
        `, V.innerHTML = `${K}<span>${W}</span>`, V.addEventListener("click", (G) => {
          G.preventDefault(), G.stopPropagation();
          const Q = typeof r == "function" ? r() : null;
          if (Q != null)
            try {
              const { state: z, dispatch: H } = n.view, F = z.doc.nodeAt(Q);
              if (F && F.type.name === "resizableImage") {
                const Z = z.tr.setNodeMarkup(Q, void 0, {
                  ...F.attrs,
                  align: R
                });
                H(Z);
              }
            } catch {
              n.chain().focus().setNodeSelection(Q).updateAttributes("resizableImage", {
                align: R
              }).run();
            }
          D(R);
        }), k.push(V), S.appendChild(V);
      }), f.appendChild(S);
      const C = () => {
        const R = o.attrs.align || "left";
        D(R);
      };
      let M = !1;
      d.addEventListener("click", (R) => {
        if (R.preventDefault(), R.stopPropagation(), M)
          f.style.display = "none", M = !1;
        else {
          const W = d.getBoundingClientRect(), K = 200, V = f.closest('[role="dialog"]');
          let G = 0, Q = 0;
          if (V) {
            const ue = V.getBoundingClientRect();
            G = ue.left, Q = ue.top;
          }
          let z = W.bottom + 4 - Q, H = W.right - K - G;
          const F = window.innerHeight, Z = window.innerWidth, le = 200;
          W.bottom + 4 + le > F && (z = W.top - le - 4 - Q), H + G < 8 && (H = 8 - G), H + K + G > Z - 8 && (H = Z - K - 8 - G), f.style.top = `${z}px`, f.style.left = `${H}px`, f.style.display = "flex", M = !0, C();
        }
      });
      const T = (R) => {
        !f.contains(R.target) && !d.contains(R.target) && (f.style.display = "none", M = !1);
      };
      document.addEventListener("click", T);
      const N = document.createElement("button");
      N.setAttribute("type", "button"), N.setAttribute("title", "View full size"), N.style.cssText = `
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
      `, N.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      `, N.addEventListener("mouseenter", () => {
        N.style.background = "oklch(0.95 0 0)";
      }), N.addEventListener("mouseleave", () => {
        N.style.background = "oklch(0.98 0 0 / 0.95)";
      }), s.appendChild(a), s.appendChild(N), s.appendChild(u), s.appendChild(d);
      const A = s.closest('[role="dialog"]');
      A ? A.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        u.style.opacity = "1", d.style.opacity = "1", N.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        u.style.opacity = "0", N.style.opacity = "0", M || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const P = (R) => {
        R.preventDefault(), R.stopPropagation();
        const W = document.createElement("div");
        W.style.cssText = `
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
        const K = document.createElement("img");
        K.src = a.src, K.alt = a.alt || "", K.style.cssText = `
          max-width: 95vw;
          max-height: 92vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
          transform: scale(0.92);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        `;
        const V = document.createElement("button");
        V.setAttribute("type", "button"), V.setAttribute("aria-label", "Close"), V.style.cssText = `
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
        `, V.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>', V.addEventListener("mouseenter", () => {
          V.style.background = "rgba(255, 255, 255, 0.25)";
        }), V.addEventListener("mouseleave", () => {
          V.style.background = "rgba(255, 255, 255, 0.15)";
        });
        const G = o.attrs.alt;
        let Q = null;
        G && G.trim() && (Q = document.createElement("div"), Q.style.cssText = `
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
          `, Q.textContent = G);
        const z = () => {
          W.style.opacity = "0", K.style.transform = "scale(0.92)", setTimeout(() => W.remove(), 200);
        };
        W.addEventListener("click", (Z) => {
          Z.target === W && z();
        }), V.addEventListener("click", z);
        const H = (Z) => {
          Z.key === "Escape" && (z(), document.removeEventListener("keydown", H));
        };
        document.addEventListener("keydown", H), W.appendChild(K), W.appendChild(V), Q && W.appendChild(Q);
        const F = s.closest('[role="dialog"]');
        F ? F.appendChild(W) : document.body.appendChild(W), requestAnimationFrame(() => {
          W.style.opacity = "1", K.style.transform = "scale(1)";
        });
      };
      N.addEventListener("click", P);
      let O, $;
      const _ = (R) => {
        R.preventDefault(), O = R.clientX, $ = a.offsetWidth, document.addEventListener("mousemove", U), document.addEventListener("mouseup", I);
      }, U = (R) => {
        const W = R.clientX - O, K = Math.max(100, $ + W);
        a.style.width = `${K}px`;
      }, I = () => {
        document.removeEventListener("mousemove", U), document.removeEventListener("mouseup", I), setTimeout(() => {
        }, 100);
        const R = typeof r == "function" ? r() : null, W = a.offsetWidth;
        if (R != null)
          try {
            const { state: K, dispatch: V } = n.view, G = K.doc.nodeAt(R);
            if (G && G.type.name === "resizableImage") {
              const Q = K.tr.setNodeMarkup(R, void 0, {
                ...G.attrs,
                width: W
              });
              V(Q);
            }
          } catch {
            n.chain().focus().setNodeSelection(R).updateAttributes("resizableImage", {
              width: W
            }).run();
          }
      };
      return u.addEventListener("mousedown", _), {
        dom: s,
        update: (R) => R.type.name !== "resizableImage" ? !1 : (o = R, l(R.attrs.src), a.alt = R.attrs.alt || "", R.attrs.width && (a.style.width = `${R.attrs.width}px`), i(R.attrs.align || "left"), !0),
        destroy: () => {
          u.removeEventListener("mousedown", _), N.removeEventListener("click", P), document.removeEventListener("click", T), f.remove();
        }
      };
    };
  }
});
function Jv(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const eb = {}, $n = {};
function zt(e, t) {
  try {
    const r = (eb[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in $n ? $n[r] : Ei(r, r.split(":"));
  } catch {
    if (e in $n) return $n[e];
    const n = e?.match(tb);
    return n ? Ei(e, n.slice(1)) : NaN;
  }
}
const tb = /([+-]\d\d):?(\d\d)?/;
function Ei(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return $n[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class tt extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(zt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), pu(this), Es(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new tt(...n, t) : new tt(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new tt(+this, t);
  }
  getTimezoneOffset() {
    const t = -zt(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Es(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new tt(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ti = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Ti.test(e)) return;
  const t = e.replace(Ti, "$1UTC");
  tt.prototype[t] && (e.startsWith("get") ? tt.prototype[e] = function() {
    return this.internal[t]();
  } : (tt.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), nb(this), +this;
  }, tt.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Es(this), +this;
  }));
});
function Es(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-zt(e.timeZone, e) * 60));
}
function nb(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), pu(e);
}
function pu(e) {
  const t = zt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - s, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const u = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, d = Math.round(-(zt(e.timeZone, e) * 60)) % 60;
  (d || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + u));
  const f = zt(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, y = p !== n, v = g - c;
  if (y && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const b = zt(e.timeZone, e), w = b > 0 ? Math.floor(b) : Math.ceil(b), S = p - w;
    S && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + S), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + S));
  }
}
class Ae extends tt {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Ae(...n, t) : new Ae(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${Jv(this.timeZone, this)})`;
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
    return new Ae(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ae(+new Date(t), this.timeZone);
  }
  //#endregion
}
const hu = 6048e5, rb = 864e5, Di = Symbol.for("constructDateFrom");
function ke(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Di in e ? e[Di](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function he(e, t) {
  return ke(t || e, e);
}
function gu(e, t, n) {
  const r = he(e, n?.in);
  return isNaN(t) ? ke(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function yu(e, t, n) {
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
let ob = {};
function tr() {
  return ob;
}
function yn(e, t) {
  const n = tr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = he(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function Gn(e, t) {
  return yn(e, { ...t, weekStartsOn: 1 });
}
function vu(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = ke(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = Gn(o), i = ke(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = Gn(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function Ni(e) {
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
function Tn(e, ...t) {
  const n = ke.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function qn(e, t) {
  const n = he(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function bu(e, t, n) {
  const [r, o] = Tn(
    n?.in,
    e,
    t
  ), s = qn(r), i = qn(o), a = +s - Ni(s), c = +i - Ni(i);
  return Math.round((a - c) / rb);
}
function sb(e, t) {
  const n = vu(e, t), r = ke(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Gn(r);
}
function ab(e, t, n) {
  return gu(e, t * 7, n);
}
function ib(e, t, n) {
  return yu(e, t * 12, n);
}
function cb(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ke.bind(null, o));
    const s = he(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), ke(r, n || NaN);
}
function lb(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ke.bind(null, o));
    const s = he(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), ke(r, n || NaN);
}
function ub(e, t, n) {
  const [r, o] = Tn(
    n?.in,
    e,
    t
  );
  return +qn(r) == +qn(o);
}
function wu(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function db(e) {
  return !(!wu(e) && typeof e != "number" || isNaN(+he(e)));
}
function fb(e, t, n) {
  const [r, o] = Tn(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function mb(e, t) {
  const n = he(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function xu(e, t) {
  const [n, r] = Tn(e, t.start, t.end);
  return { start: n, end: r };
}
function pb(e, t) {
  const { start: n, end: r } = xu(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(ke(n, i)), i.setMonth(i.getMonth() + a);
  return o ? c.reverse() : c;
}
function hb(e, t) {
  const n = he(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function gb(e, t) {
  const n = he(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function ku(e, t) {
  const n = he(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function yb(e, t) {
  const { start: n, end: r } = xu(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(ke(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? c.reverse() : c;
}
function Cu(e, t) {
  const n = tr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = he(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function vb(e, t) {
  return Cu(e, { ...t, weekStartsOn: 1 });
}
const bb = {
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
}, wb = (e, t, n) => {
  let r;
  const o = bb[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Qo(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const xb = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, kb = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Cb = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Mb = {
  date: Qo({
    formats: xb,
    defaultWidth: "full"
  }),
  time: Qo({
    formats: kb,
    defaultWidth: "full"
  }),
  dateTime: Qo({
    formats: Cb,
    defaultWidth: "full"
  })
}, Sb = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Eb = (e, t, n, r) => Sb[e];
function In(e) {
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
const Tb = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Db = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Nb = {
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
}, Ab = {
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
}, Lb = {
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
}, Rb = {
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
}, Ib = (e, t) => {
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
}, Pb = {
  ordinalNumber: Ib,
  era: In({
    values: Tb,
    defaultWidth: "wide"
  }),
  quarter: In({
    values: Db,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: In({
    values: Nb,
    defaultWidth: "wide"
  }),
  day: In({
    values: Ab,
    defaultWidth: "wide"
  }),
  dayPeriod: In({
    values: Lb,
    defaultWidth: "wide",
    formattingValues: Rb,
    defaultFormattingWidth: "wide"
  })
};
function Pn(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(a) ? _b(a, (d) => d.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      Ob(a, (d) => d.test(i))
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
function Ob(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function _b(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function $b(e) {
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
const Hb = /^(\d+)(th|st|nd|rd)?/i, Wb = /\d+/i, zb = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Bb = {
  any: [/^b/i, /^(a|c)/i]
}, Fb = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Ub = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Yb = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, jb = {
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
}, Vb = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Kb = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Gb = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, qb = {
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
}, Xb = {
  ordinalNumber: $b({
    matchPattern: Hb,
    parsePattern: Wb,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Pn({
    matchPatterns: zb,
    defaultMatchWidth: "wide",
    parsePatterns: Bb,
    defaultParseWidth: "any"
  }),
  quarter: Pn({
    matchPatterns: Fb,
    defaultMatchWidth: "wide",
    parsePatterns: Ub,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Pn({
    matchPatterns: Yb,
    defaultMatchWidth: "wide",
    parsePatterns: jb,
    defaultParseWidth: "any"
  }),
  day: Pn({
    matchPatterns: Vb,
    defaultMatchWidth: "wide",
    parsePatterns: Kb,
    defaultParseWidth: "any"
  }),
  dayPeriod: Pn({
    matchPatterns: Gb,
    defaultMatchWidth: "any",
    parsePatterns: qb,
    defaultParseWidth: "any"
  })
}, ga = {
  code: "en-US",
  formatDistance: wb,
  formatLong: Mb,
  formatRelative: Eb,
  localize: Pb,
  match: Xb,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Zb(e, t) {
  const n = he(e, t?.in);
  return bu(n, ku(n)) + 1;
}
function Mu(e, t) {
  const n = he(e, t?.in), r = +Gn(n) - +sb(n);
  return Math.round(r / hu) + 1;
}
function Su(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = tr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = ke(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = yn(i, t), c = ke(t?.in || e, 0);
  c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
  const l = yn(c, t);
  return +n >= +a ? r + 1 : +n >= +l ? r : r - 1;
}
function Qb(e, t) {
  const n = tr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Su(e, t), s = ke(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), yn(s, t);
}
function Eu(e, t) {
  const n = he(e, t?.in), r = +yn(n, t) - +Qb(n, t);
  return Math.round(r / hu) + 1;
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
}, nn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Ai = {
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
    const n = vu(e);
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
    const r = Mu(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : pe(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : St.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Zb(e);
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
    switch (r === 12 ? o = nn.noon : r === 0 ? o = nn.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = nn.evening : r >= 12 ? o = nn.afternoon : r >= 4 ? o = nn.morning : o = nn.night, t) {
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
        return $t(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return $t(r, ":");
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
        return $t(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return $t(r, ":");
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
        return "GMT" + Li(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + $t(r, ":");
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
        return "GMT" + Li(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + $t(r, ":");
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
function Li(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + pe(s, 2);
}
function Ri(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + pe(Math.abs(e) / 60, 2) : $t(e, t);
}
function $t(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = pe(Math.trunc(r / 60), 2), s = pe(r % 60, 2);
  return n + o + t + s;
}
const Ii = (e, t) => {
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
}, Tu = (e, t) => {
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
}, Jb = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Ii(e, t);
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
  return s.replace("{{date}}", Ii(r, t)).replace("{{time}}", Tu(o, t));
}, ew = {
  p: Tu,
  P: Jb
}, tw = /^D+$/, nw = /^Y+$/, rw = ["D", "DD", "YY", "YYYY"];
function ow(e) {
  return tw.test(e);
}
function sw(e) {
  return nw.test(e);
}
function aw(e, t, n) {
  const r = iw(e, t, n);
  if (console.warn(r), rw.includes(e)) throw new RangeError(r);
}
function iw(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const cw = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, lw = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, uw = /^'([^]*?)'?$/, dw = /''/g, fw = /[a-zA-Z]/;
function mw(e, t, n) {
  const r = tr(), o = n?.locale ?? r.locale ?? ga, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = he(e, n?.in);
  if (!db(a))
    throw new RangeError("Invalid time value");
  let c = t.match(lw).map((u) => {
    const d = u[0];
    if (d === "p" || d === "P") {
      const f = ew[d];
      return f(u, o.formatLong);
    }
    return u;
  }).join("").match(cw).map((u) => {
    if (u === "''")
      return { isToken: !1, value: "'" };
    const d = u[0];
    if (d === "'")
      return { isToken: !1, value: pw(u) };
    if (Ai[d])
      return { isToken: !0, value: u };
    if (d.match(fw))
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
    (!n?.useAdditionalWeekYearTokens && sw(d) || !n?.useAdditionalDayOfYearTokens && ow(d)) && aw(d, t, String(e));
    const f = Ai[d[0]];
    return f(a, d, o.localize, l);
  }).join("");
}
function pw(e) {
  const t = e.match(uw);
  return t ? t[1].replace(dw, "'") : e;
}
function hw(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = ke(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function gw(e, t) {
  return he(e, t?.in).getMonth();
}
function yw(e, t) {
  return he(e, t?.in).getFullYear();
}
function vw(e, t) {
  return +he(e) > +he(t);
}
function bw(e, t) {
  return +he(e) < +he(t);
}
function ww(e, t, n) {
  const [r, o] = Tn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function xw(e, t, n) {
  const [r, o] = Tn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function kw(e, t, n) {
  const r = he(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = ke(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = hw(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function Cw(e, t, n) {
  const r = he(e, n?.in);
  return isNaN(+r) ? ke(e, NaN) : (r.setFullYear(t), r);
}
const Pi = 5, Mw = 4;
function Sw(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, Pi * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Pi : Mw;
}
function Du(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Ew(e, t) {
  const n = Du(e, t), r = Sw(e, t);
  return t.addDays(n, r * 7 - 1);
}
class ze {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ae.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Ae(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : gu(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : yu(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : ab(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : ib(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : bu(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : fb(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : pb(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : yb(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Ew(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : vb(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : mb(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Cu(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : gb(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : mw(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Mu(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : gw(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : yw(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Eu(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : vw(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : bw(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : wu(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : ub(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : ww(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : xw(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : cb(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : lb(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : kw(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : Cw(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Du(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : qn(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Gn(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : hb(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : yn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : ku(r), this.options = { locale: ga, ...t }, this.overrides = n;
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
    return t && ze.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && ze.yearFirstLocales.has(s))
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
ze.yearFirstLocales = /* @__PURE__ */ new Set([
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
const at = new ze();
class Nu {
  constructor(t, n, r = at) {
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
class Tw {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Dw {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Nw(e) {
  return X.createElement("button", { ...e });
}
function Aw(e) {
  return X.createElement("span", { ...e });
}
function Lw(e) {
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
function Rw(e) {
  const { day: t, modifiers: n, ...r } = e;
  return X.createElement("td", { ...r });
}
function Iw(e) {
  const { day: t, modifiers: n, ...r } = e, o = X.useRef(null);
  return X.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), X.createElement("button", { ref: o, ...r });
}
var te;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(te || (te = {}));
var ge;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(ge || (ge = {}));
var Ge;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ge || (Ge = {}));
var $e;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})($e || ($e = {}));
function Pw(e) {
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
function Ow(e) {
  return X.createElement("div", { ...e });
}
function _w(e) {
  return X.createElement("div", { ...e });
}
function $w(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r }, e.children);
}
function Hw(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r });
}
function Ww(e) {
  return X.createElement("table", { ...e });
}
function zw(e) {
  return X.createElement("div", { ...e });
}
const Au = nc(void 0);
function nr() {
  const e = rc(Au);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Bw(e) {
  const { components: t } = nr();
  return X.createElement(t.Dropdown, { ...e });
}
function Fw(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: c, labelNext: l } } = nr(), u = B((f) => {
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
function Uw(e) {
  const { components: t } = nr();
  return X.createElement(t.Button, { ...e });
}
function Yw(e) {
  return X.createElement("option", { ...e });
}
function jw(e) {
  const { components: t } = nr();
  return X.createElement(t.Button, { ...e });
}
function Vw(e) {
  const { rootRef: t, ...n } = e;
  return X.createElement("div", { ...n, ref: t });
}
function Kw(e) {
  return X.createElement("select", { ...e });
}
function Gw(e) {
  const { week: t, ...n } = e;
  return X.createElement("tr", { ...n });
}
function qw(e) {
  return X.createElement("th", { ...e });
}
function Xw(e) {
  return X.createElement(
    "thead",
    { "aria-hidden": !0 },
    X.createElement("tr", { ...e })
  );
}
function Zw(e) {
  const { week: t, ...n } = e;
  return X.createElement("th", { ...n });
}
function Qw(e) {
  return X.createElement("th", { ...e });
}
function Jw(e) {
  return X.createElement("tbody", { ...e });
}
function e0(e) {
  const { components: t } = nr();
  return X.createElement(t.Dropdown, { ...e });
}
const t0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Nw,
  CaptionLabel: Aw,
  Chevron: Lw,
  Day: Rw,
  DayButton: Iw,
  Dropdown: Pw,
  DropdownNav: Ow,
  Footer: _w,
  Month: $w,
  MonthCaption: Hw,
  MonthGrid: Ww,
  Months: zw,
  MonthsDropdown: Bw,
  Nav: Fw,
  NextMonthButton: Uw,
  Option: Yw,
  PreviousMonthButton: jw,
  Root: Vw,
  Select: Kw,
  Week: Gw,
  WeekNumber: Zw,
  WeekNumberHeader: Qw,
  Weekday: qw,
  Weekdays: Xw,
  Weeks: Jw,
  YearsDropdown: e0
}, Symbol.toStringTag, { value: "Module" }));
function ft(e, t, n = !1, r = at) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function Lu(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function ya(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Ru(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Iu(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Pu(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Ou(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function mt(e, t, n = at) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (Ou(a, n))
      return a.includes(e);
    if (ya(a))
      return ft(a, e, !1, n);
    if (Pu(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (Lu(a)) {
      const c = s(a.before, e), l = s(a.after, e), u = c > 0, d = l < 0;
      return i(a.before, a.after) ? d && u : u || d;
    }
    return Ru(a) ? s(e, a.after) > 0 : Iu(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function n0(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: c, broadcastCalendar: l, today: u } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: h, endOfMonth: g, isAfter: y } = o, v = n && p(n), b = r && g(r), w = {
    [ge.focused]: [],
    [ge.outside]: [],
    [ge.disabled]: [],
    [ge.hidden]: [],
    [ge.today]: []
  }, S = {};
  for (const x of e) {
    const { date: k, displayMonth: D } = x, C = !!(D && !f(k, D)), M = !!(v && h(k, v)), T = !!(b && y(k, b)), N = !!(s && mt(k, s, o)), A = !!(i && mt(k, i, o)) || M || T || // Broadcast calendar will show outside days as default
    !l && !c && C || l && c === !1 && C, P = d(k, u ?? o.today());
    C && w.outside.push(x), N && w.disabled.push(x), A && w.hidden.push(x), P && w.today.push(x), a && Object.keys(a).forEach((O) => {
      const $ = a?.[O];
      $ && mt(k, $, o) && (S[O] ? S[O].push(x) : S[O] = [x]);
    });
  }
  return (x) => {
    const k = {
      [ge.focused]: !1,
      [ge.disabled]: !1,
      [ge.hidden]: !1,
      [ge.outside]: !1,
      [ge.today]: !1
    }, D = {};
    for (const C in w) {
      const M = w[C];
      k[C] = M.some((T) => T === x);
    }
    for (const C in S)
      D[C] = S[C].some((M) => M === x);
    return {
      ...k,
      // custom modifiers should override all the previous ones
      ...D
    };
  };
}
function r0(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[ge[s]] ? o.push(t[ge[s]]) : t[Ge[s]] && o.push(t[Ge[s]]), o), [t[te.Day]]);
}
function o0(e) {
  return {
    ...t0,
    ...e
  };
}
function s0(e) {
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
function va() {
  const e = {};
  for (const t in te)
    e[te[t]] = `rdp-${te[t]}`;
  for (const t in ge)
    e[ge[t]] = `rdp-${ge[t]}`;
  for (const t in Ge)
    e[Ge[t]] = `rdp-${Ge[t]}`;
  for (const t in $e)
    e[$e[t]] = `rdp-${$e[t]}`;
  return e;
}
function _u(e, t, n) {
  return (n ?? new ze(t)).formatMonthYear(e);
}
const a0 = _u;
function i0(e, t, n) {
  return (n ?? new ze(t)).format(e, "d");
}
function c0(e, t = at) {
  return t.format(e, "LLLL");
}
function l0(e, t, n) {
  return (n ?? new ze(t)).format(e, "cccccc");
}
function u0(e, t = at) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function d0() {
  return "";
}
function $u(e, t = at) {
  return t.format(e, "yyyy");
}
const f0 = $u, m0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: _u,
  formatDay: i0,
  formatMonthCaption: a0,
  formatMonthDropdown: c0,
  formatWeekNumber: u0,
  formatWeekNumberHeader: d0,
  formatWeekdayName: l0,
  formatYearCaption: f0,
  formatYearDropdown: $u
}, Symbol.toStringTag, { value: "Module" }));
function p0(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...m0,
    ...e
  };
}
function h0(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: i(e),
    end: a(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, o), h = l(f), g = t && f < s(t) || n && f > s(n) || !1;
    return { value: h, label: p, disabled: g };
  });
}
function g0(e, t = {}, n = {}) {
  let r = { ...t?.[te.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function y0(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function v0(e, t, n, r, o = !1) {
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
function Hu(e, t, n, r) {
  let o = (r ?? new ze(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const b0 = Hu;
function Wu(e, t, n) {
  return (n ?? new ze(t)).formatMonthYear(e);
}
const w0 = Wu;
function x0(e, t, n, r) {
  let o = (r ?? new ze(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function k0(e) {
  return "Choose the Month";
}
function C0() {
  return "";
}
function M0(e) {
  return "Go to the Next Month";
}
function S0(e) {
  return "Go to the Previous Month";
}
function E0(e, t, n) {
  return (n ?? new ze(t)).format(e, "cccc");
}
function T0(e, t) {
  return `Week ${e}`;
}
function D0(e) {
  return "Week Number";
}
function N0(e) {
  return "Choose the Year";
}
const A0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: w0,
  labelDay: b0,
  labelDayButton: Hu,
  labelGrid: Wu,
  labelGridcell: x0,
  labelMonthDropdown: k0,
  labelNav: C0,
  labelNext: M0,
  labelPrevious: S0,
  labelWeekNumber: T0,
  labelWeekNumberHeader: D0,
  labelWeekday: E0,
  labelYearDropdown: N0
}, Symbol.toStringTag, { value: "Module" })), rr = (e) => e instanceof HTMLElement ? e : null, Jo = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], L0 = (e) => rr(e.querySelector("[data-animated-month]")), es = (e) => rr(e.querySelector("[data-animated-caption]")), ts = (e) => rr(e.querySelector("[data-animated-weeks]")), R0 = (e) => rr(e.querySelector("[data-animated-nav]")), I0 = (e) => rr(e.querySelector("[data-animated-weekdays]"));
function P0(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = j(null), a = j(r), c = j(!1);
  oo(() => {
    const l = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const u = s.isSameMonth(r[0].date, l[0].date), d = s.isAfter(r[0].date, l[0].date), f = d ? n[$e.caption_after_enter] : n[$e.caption_before_enter], p = d ? n[$e.weeks_after_enter] : n[$e.weeks_before_enter], h = i.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (Jo(g).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const S = L0(w);
      S && w.contains(S) && w.removeChild(S);
      const x = es(w);
      x && x.classList.remove(f);
      const k = ts(w);
      k && k.classList.remove(p);
    }), i.current = g) : i.current = null, c.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = h instanceof HTMLElement ? Jo(h) : [], v = Jo(e.current);
    if (v?.every((b) => b instanceof HTMLElement) && y && y.every((b) => b instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const b = R0(e.current);
      b && (b.style.zIndex = "1"), v.forEach((w, S) => {
        const x = y[S];
        if (!x)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const k = es(w);
        k && k.classList.add(f);
        const D = ts(w);
        D && D.classList.add(p);
        const C = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), b && (b.style.zIndex = ""), k && k.classList.remove(f), D && D.classList.remove(p), w.style.position = "", w.style.overflow = "", w.contains(x) && w.removeChild(x);
        };
        x.style.pointerEvents = "none", x.style.position = "absolute", x.style.overflow = "hidden", x.setAttribute("aria-hidden", "true");
        const M = I0(x);
        M && (M.style.opacity = "0");
        const T = es(x);
        T && (T.classList.add(d ? n[$e.caption_before_exit] : n[$e.caption_after_exit]), T.addEventListener("animationend", C));
        const N = ts(x);
        N && N.classList.add(d ? n[$e.weeks_before_exit] : n[$e.weeks_after_exit]), w.insertBefore(x, w.firstChild);
      });
    }
  });
}
function O0(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: h, endOfWeek: g, isAfter: y, startOfBroadcastWeek: v, startOfISOWeek: b, startOfWeek: w } = r, S = c ? v(o, r) : i ? b(o) : w(o), x = c ? f(s) : i ? p(h(s)) : g(h(s)), k = u(x, S), D = d(s, o) + 1, C = [];
  for (let N = 0; N <= k; N++) {
    const A = l(S, N);
    if (t && y(A, t))
      break;
    C.push(A);
  }
  const T = (c ? 35 : 42) * D;
  if (a && C.length < T) {
    const N = T - C.length;
    for (let A = 0; A < N; A++) {
      const P = l(C[C.length - 1], 1);
      C.push(P);
    }
  }
  return C;
}
function _0(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function $0(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function Oi(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let c = o || s || i;
  const { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
  if (n && l(n, c) < a - 1) {
    const f = -1 * (a - 1);
    c = u(n, f);
  }
  return t && l(c, t) < 0 && (c = t), d(c);
}
function H0(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, h = e.reduce((g, y) => {
    const v = n.broadcastCalendar ? d(y, r) : n.ISOWeek ? f(y) : p(y), b = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : c(a(y)), w = t.filter((D) => D >= v && D <= b), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < S) {
      const D = t.filter((C) => {
        const M = S - w.length;
        return C > b && C <= o(b, M);
      });
      w.push(...D);
    }
    const x = w.reduce((D, C) => {
      const M = n.ISOWeek ? l(C) : u(C), T = D.find((A) => A.weekNumber === M), N = new Nu(C, y, r);
      return T ? T.days.push(N) : D.push(new Dw(M, [N])), D;
    }, []), k = new Tw(y, x);
    return g.push(k), g;
  }, []);
  return n.reverseMonths ? h.reverse() : h;
}
function W0(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: h, toMonth: g } = e;
  !n && h && (n = h), !n && f && (n = t.newDate(f, 0, 1)), !r && g && (r = g), !r && p && (r = u(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : f ? n = u(f, 0, 1) : !n && y && (n = o(c(e.today ?? d(), -100))), r ? r = a(r) : p ? r = u(p, 11, 31) : !r && y && (r = l(e.today ?? d())), [
    n && s(n),
    r && s(r)
  ];
}
function z0(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s : 1, u = i(e);
  if (!t)
    return a(u, l);
  if (!(c(t, e) < s))
    return a(u, l);
}
function B0(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s ?? 1 : 1, u = i(e);
  if (!t)
    return a(u, -l);
  if (!(c(u, t) <= 0))
    return a(u, -l);
}
function F0(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function ko(e, t) {
  const [n, r] = Y(e);
  return [t === void 0 ? n : t, r];
}
function U0(e, t) {
  const [n, r] = W0(e, t), { startOfMonth: o, endOfMonth: s } = t, i = Oi(e, n, r, t), [a, c] = ko(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  q(() => {
    const k = Oi(e, n, r, t);
    c(k);
  }, [e.timeZone]);
  const l = $0(a, r, e, t), u = O0(l, e.endMonth ? s(e.endMonth) : void 0, e, t), d = H0(l, u, e, t), f = F0(d), p = _0(d), h = B0(a, n, e, t), g = z0(a, r, e, t), { disableNavigation: y, onMonthChange: v } = e, b = (k) => f.some((D) => D.days.some((C) => C.isEqualTo(k))), w = (k) => {
    if (y)
      return;
    let D = o(k);
    n && D < o(n) && (D = o(n)), r && D > o(r) && (D = o(r)), c(D), v?.(D);
  };
  return {
    months: d,
    weeks: f,
    days: p,
    navStart: n,
    navEnd: r,
    previousMonth: h,
    nextMonth: g,
    goToMonth: w,
    goToDay: (k) => {
      b(k) || w(k.date);
    }
  };
}
var Qe;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Qe || (Qe = {}));
function _i(e) {
  return !e[ge.disabled] && !e[ge.hidden] && !e[ge.outside];
}
function Y0(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    _i(a) && (a[ge.focused] && s < Qe.FocusedModifier ? (o = i, s = Qe.FocusedModifier) : r?.isEqualTo(i) && s < Qe.LastFocused ? (o = i, s = Qe.LastFocused) : n(i.date) && s < Qe.Selected ? (o = i, s = Qe.Selected) : a[ge.today] && s < Qe.Today && (o = i, s = Qe.Today));
  }
  return o || (o = e.find((i) => _i(t(i)))), o;
}
function j0(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: c } = s, { addDays: l, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: h, endOfWeek: g, max: y, min: v, startOfBroadcastWeek: b, startOfISOWeek: w, startOfWeek: S } = i;
  let k = {
    day: l,
    week: d,
    month: u,
    year: f,
    startOfWeek: (D) => c ? b(D, i) : a ? w(D) : S(D),
    endOfWeek: (D) => c ? p(D) : a ? h(D) : g(D)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? k = y([r, k]) : t === "after" && o && (k = v([o, k])), k;
}
function zu(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const c = j0(e, t, n.date, r, o, s, i), l = !!(s.disabled && mt(c, s.disabled, i)), u = !!(s.hidden && mt(c, s.hidden, i)), d = c, f = new Nu(c, d, i);
  return !l && !u ? f : zu(e, t, f, r, o, s, i, a + 1);
}
function V0(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = Y(), c = Y0(t.days, n, r || (() => !1), i), [l, u] = Y(s ? c : void 0);
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
      const v = zu(g, y, l, t.navStart, t.navEnd, e, o);
      v && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(v)) || (t.goToDay(v), u(v)));
    }
  };
}
function K0(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = ko(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t, l = (p) => a?.some((h) => c(h, p)) ?? !1, { min: u, max: d } = e;
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
function G0(e, t, n = 0, r = 0, o = !1, s = at) {
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
function q0(e, t, n = at) {
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
function $i(e, t, n = at) {
  return ft(e, t.from, !1, n) || ft(e, t.to, !1, n) || ft(t, e.from, !1, n) || ft(t, e.to, !1, n);
}
function X0(e, t, n = at) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? ft(e, a, !1, n) : Ou(a, n) ? a.some((c) => ft(e, c, !1, n)) : ya(a) ? a.from && a.to ? $i(e, { from: a.from, to: a.to }, n) : !1 : Pu(a) ? q0(e, a.dayOfWeek, n) : Lu(a) ? n.isAfter(a.before, a.after) ? $i(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : mt(e.from, a, n) || mt(e.to, a, n) : Ru(a) || Iu(a) ? mt(e.from, a, n) || mt(e.to, a, n) : !1))
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
function Z0(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, c] = ko(o, i ? o : void 0), l = i ? o : a;
  return {
    selected: l,
    select: (f, p, h) => {
      const { min: g, max: y } = e, v = f ? G0(f, l, g, y, s, t) : void 0;
      return r && n && v?.from && v.to && X0({ from: v.from, to: v.to }, n, t) && (v.from = f, v.to = void 0), i || c(v), i?.(v, f, p, h), v;
    },
    isSelected: (f) => l && ft(l, f, !1, t)
  };
}
function Q0(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = ko(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t;
  return {
    selected: a,
    select: (d, f, p) => {
      let h = d;
      return !r && a && a && c(d, a) && (h = void 0), o || i(h), o?.(h, d, f, p), h;
    },
    isSelected: (d) => a ? c(a, d) : !1
  };
}
function J0(e, t) {
  const n = Q0(e, t), r = K0(e, t), o = Z0(e, t);
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
function ex(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ae(t.today, t.timeZone)), t.month && (t.month = new Ae(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ae(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ae(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ae(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ae(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((re) => new Ae(re, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ae(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ae(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = Ft(() => {
    const re = { ...ga, ...t.locale };
    return {
      dateLib: new ze({
        locale: re,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: o0(t.components),
      formatters: p0(t.formatters),
      labels: { ...A0, ...t.labels },
      locale: re,
      classNames: { ...va(), ...t.classNames }
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
  ]), { captionLayout: c, mode: l, navLayout: u, numberOfMonths: d = 1, onDayBlur: f, onDayClick: p, onDayFocus: h, onDayKeyDown: g, onDayMouseEnter: y, onDayMouseLeave: v, onNextClick: b, onPrevClick: w, showWeekNumber: S, styles: x } = t, { formatCaption: k, formatDay: D, formatMonthDropdown: C, formatWeekNumber: M, formatWeekNumberHeader: T, formatWeekdayName: N, formatYearDropdown: A } = r, P = U0(t, s), { days: O, months: $, navStart: _, navEnd: U, previousMonth: I, nextMonth: R, goToMonth: W } = P, K = n0(O, t, _, U, s), { isSelected: V, select: G, selected: Q } = J0(t, s) ?? {}, { blur: z, focused: H, isFocusTarget: F, moveFocus: Z, setFocused: le } = V0(t, P, K, V ?? (() => !1), s), { labelDayButton: ue, labelGridcell: ve, labelGrid: Se, labelMonthDropdown: Be, labelNav: wt, labelPrevious: Dn, labelNext: Nn, labelWeekday: or, labelWeekNumber: sr, labelWeekNumberHeader: ar, labelYearDropdown: ir } = o, cr = Ft(() => y0(s, t.ISOWeek), [s, t.ISOWeek]), It = l !== void 0 || p !== void 0, Kt = B(() => {
    I && (W(I), w?.(I));
  }, [I, W, w]), Gt = B(() => {
    R && (W(R), b?.(R));
  }, [W, R, b]), lr = B((re, me) => (ne) => {
    ne.preventDefault(), ne.stopPropagation(), le(re), G?.(re.date, me, ne), p?.(re.date, me, ne);
  }, [G, p, le]), ur = B((re, me) => (ne) => {
    le(re), h?.(re.date, me, ne);
  }, [h, le]), Mo = B((re, me) => (ne) => {
    z(), f?.(re.date, me, ne);
  }, [z, f]), So = B((re, me) => (ne) => {
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
      Z(Ee, de);
    }
    g?.(re.date, me, ne);
  }, [Z, g, t.dir]), Eo = B((re, me) => (ne) => {
    y?.(re.date, me, ne);
  }, [y]), To = B((re, me) => (ne) => {
    v?.(re.date, me, ne);
  }, [v]), Do = B((re) => (me) => {
    const ne = Number(me.target.value), fe = s.setMonth(s.startOfMonth(re), ne);
    W(fe);
  }, [s, W]), dr = B((re) => (me) => {
    const ne = Number(me.target.value), fe = s.setYear(s.startOfMonth(re), ne);
    W(fe);
  }, [s, W]), { className: No, style: Ao } = Ft(() => ({
    className: [a[te.Root], t.className].filter(Boolean).join(" "),
    style: { ...x?.[te.Root], ...t.style }
  }), [a, t.className, t.style, x]), An = s0(t), fr = j(null);
  P0(fr, !!t.animate, {
    classNames: a,
    months: $,
    focused: H,
    dateLib: s
  });
  const xt = {
    dayPickerProps: t,
    selected: Q,
    select: G,
    isSelected: V,
    months: $,
    nextMonth: R,
    previousMonth: I,
    goToMonth: W,
    getModifiers: K,
    components: n,
    classNames: a,
    styles: x,
    labels: o,
    formatters: r
  };
  return X.createElement(
    Au.Provider,
    { value: xt },
    X.createElement(
      n.Root,
      { rootRef: t.animate ? fr : void 0, className: No, style: Ao, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...An },
      X.createElement(
        n.Months,
        { className: a[te.Months], style: x?.[te.Months] },
        !t.hideNavigation && !u && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[te.Nav], style: x?.[te.Nav], "aria-label": wt(), onPreviousClick: Kt, onNextClick: Gt, previousMonth: I, nextMonth: R }),
        $.map((re, me) => X.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[te.Month],
            style: x?.[te.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: me,
            displayIndex: me,
            calendarMonth: re
          },
          u === "around" && !t.hideNavigation && me === 0 && X.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[te.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": Dn(I), onClick: Kt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: I ? void 0 : !0, className: a[te.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          X.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[te.MonthCaption], style: x?.[te.MonthCaption], calendarMonth: re, displayIndex: me }, c?.startsWith("dropdown") ? X.createElement(
            n.DropdownNav,
            { className: a[te.Dropdowns], style: x?.[te.Dropdowns] },
            (() => {
              const ne = c === "dropdown" || c === "dropdown-months" ? X.createElement(n.MonthsDropdown, { key: "month", className: a[te.MonthsDropdown], "aria-label": Be(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Do(re.date), options: h0(re.date, _, U, r, s), style: x?.[te.Dropdown], value: s.getMonth(re.date) }) : X.createElement("span", { key: "month" }, C(re.date, s)), fe = c === "dropdown" || c === "dropdown-years" ? X.createElement(n.YearsDropdown, { key: "year", className: a[te.YearsDropdown], "aria-label": ir(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: dr(re.date), options: v0(_, U, r, s, !!t.reverseYears), style: x?.[te.Dropdown], value: s.getYear(re.date) }) : X.createElement("span", { key: "year" }, A(re.date, s));
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
            } }, k(re.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            X.createElement(n.CaptionLabel, { className: a[te.CaptionLabel], role: "status", "aria-live": "polite" }, k(re.date, s.options, s))
          )),
          u === "around" && !t.hideNavigation && me === d - 1 && X.createElement(
            n.NextMonthButton,
            { type: "button", className: a[te.NextMonthButton], tabIndex: R ? void 0 : -1, "aria-disabled": R ? void 0 : !0, "aria-label": Nn(R), onClick: Gt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: R ? void 0 : !0, className: a[te.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          me === d - 1 && u === "after" && !t.hideNavigation && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[te.Nav], style: x?.[te.Nav], "aria-label": wt(), onPreviousClick: Kt, onNextClick: Gt, previousMonth: I, nextMonth: R }),
          X.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": Se(re.date, s.options, s) || void 0, className: a[te.MonthGrid], style: x?.[te.MonthGrid] },
            !t.hideWeekdays && X.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[te.Weekdays], style: x?.[te.Weekdays] },
              S && X.createElement(n.WeekNumberHeader, { "aria-label": ar(s.options), className: a[te.WeekNumberHeader], style: x?.[te.WeekNumberHeader], scope: "col" }, T()),
              cr.map((ne) => X.createElement(n.Weekday, { "aria-label": or(ne, s.options, s), className: a[te.Weekday], key: String(ne), style: x?.[te.Weekday], scope: "col" }, N(ne, s.options, s)))
            ),
            X.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[te.Weeks], style: x?.[te.Weeks] }, re.weeks.map((ne) => X.createElement(
              n.Week,
              { className: a[te.Week], key: ne.weekNumber, style: x?.[te.Week], week: ne },
              S && // biome-ignore lint/a11y/useSemanticElements: react component
              X.createElement(n.WeekNumber, { week: ne, style: x?.[te.WeekNumber], "aria-label": sr(ne.weekNumber, {
                locale: i
              }), className: a[te.WeekNumber], scope: "row", role: "rowheader" }, M(ne.weekNumber, s)),
              ne.days.map((fe) => {
                const { date: Ee } = fe, de = K(fe);
                if (de[ge.focused] = !de.hidden && !!H?.isEqualTo(fe), de[Ge.selected] = V?.(Ee) || de.selected, ya(Q)) {
                  const { from: kt, to: it } = Q;
                  de[Ge.range_start] = !!(kt && it && s.isSameDay(Ee, kt)), de[Ge.range_end] = !!(kt && it && s.isSameDay(Ee, it)), de[Ge.range_middle] = ft(Q, Ee, !0, s);
                }
                const mr = g0(de, x, t.modifiersStyles), Ln = r0(de, a, t.modifiersClassNames), qt = !It && !de.hidden ? ve(Ee, de, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  X.createElement(n.Day, { key: `${s.format(Ee, "yyyy-MM-dd")}_${s.format(fe.displayMonth, "yyyy-MM")}`, day: fe, modifiers: de, className: Ln.join(" "), style: mr, role: "gridcell", "aria-selected": de.selected || void 0, "aria-label": qt, "data-day": s.format(Ee, "yyyy-MM-dd"), "data-month": fe.outside ? s.format(Ee, "yyyy-MM") : void 0, "data-selected": de.selected || void 0, "data-disabled": de.disabled || void 0, "data-hidden": de.hidden || void 0, "data-outside": fe.outside || void 0, "data-focused": de.focused || void 0, "data-today": de.today || void 0 }, !de.hidden && It ? X.createElement(n.DayButton, { className: a[te.DayButton], style: x?.[te.DayButton], type: "button", day: fe, modifiers: de, disabled: de.disabled || void 0, tabIndex: F(fe) ? 0 : -1, "aria-label": ue(Ee, de, s.options, s), onClick: lr(fe, de), onBlur: Mo(fe, de), onFocus: ur(fe, de), onKeyDown: So(fe, de), onMouseEnter: Eo(fe, de), onMouseLeave: To(fe, de) }, D(Ee, s.options, s)) : !de.hidden && D(fe.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      X.createElement(n.Footer, { className: a[te.Footer], style: x?.[te.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function tx({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: i,
  ...a
}) {
  const c = va();
  return /* @__PURE__ */ m(
    ex,
    {
      showOutsideDays: n,
      className: oe(
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
        root: oe("w-fit", c.root),
        months: oe(
          "flex gap-4 flex-col md:flex-row relative",
          c.months
        ),
        month: oe("flex flex-col w-full gap-4", c.month),
        nav: oe(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          c.nav
        ),
        button_previous: oe(
          ys({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_previous
        ),
        button_next: oe(
          ys({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_next
        ),
        month_caption: oe(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          c.month_caption
        ),
        dropdowns: oe(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          c.dropdowns
        ),
        dropdown_root: oe(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          c.dropdown_root
        ),
        dropdown: oe(
          "absolute bg-popover inset-0 opacity-0",
          c.dropdown
        ),
        caption_label: oe(
          "select-none font-medium",
          r === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: oe("flex", c.weekdays),
        weekday: oe(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          c.weekday
        ),
        week: oe("flex w-full mt-2", c.week),
        week_number_header: oe(
          "select-none w-(--cell-size)",
          c.week_number_header
        ),
        week_number: oe(
          "text-[0.8rem] select-none text-muted-foreground",
          c.week_number
        ),
        day: oe(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          c.day
        ),
        range_start: oe(
          "rounded-l-md bg-accent",
          c.range_start
        ),
        range_middle: oe("rounded-none", c.range_middle),
        range_end: oe("rounded-r-md bg-accent", c.range_end),
        today: oe(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          c.today
        ),
        outside: oe(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: oe(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: oe("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: l, rootRef: u, ...d }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: u,
            className: oe(l),
            ...d
          }
        ),
        Chevron: ({ className: l, orientation: u, ...d }) => u === "left" ? /* @__PURE__ */ m(Kd, { className: oe("size-4", l), ...d }) : u === "right" ? /* @__PURE__ */ m(
          Gd,
          {
            className: oe("size-4", l),
            ...d
          }
        ) : /* @__PURE__ */ m(qd, { className: oe("size-4", l), ...d }),
        DayButton: nx,
        WeekNumber: ({ children: l, ...u }) => /* @__PURE__ */ m("td", { ...u, children: /* @__PURE__ */ m("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: l }) }),
        ...i
      },
      ...a
    }
  );
}
function nx({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = va(), s = E.useRef(null);
  return E.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ m(
    Dt,
    {
      ref: s,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: oe(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
let un = null;
const Bu = /* @__PURE__ */ new Map(), rx = /* @__PURE__ */ new Map();
function Yr() {
  if (!un) return;
  const e = un;
  un = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function ox(e) {
  return un?.pillDate === e;
}
function sx({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = j(null), i = Co(e);
  q(() => {
    const b = (w) => {
      w.key === "Escape" && (w.stopPropagation(), w.preventDefault(), o());
    };
    return document.addEventListener("keydown", b, !0), () => document.removeEventListener("keydown", b, !0);
  }, [o]), q(() => {
    const b = (S) => {
      s.current && !s.current.contains(S.target) && (S.target.closest(".date-pill") || o());
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", b, !0);
    }, 50);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", b, !0);
    };
  }, [o]);
  const a = B((b) => {
    b && r(fn(b)), o();
  }, [r, o]), c = B((b) => {
    const w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + b), r(fn(w)), o();
  }, [r, o]), l = B(() => {
    const w = (/* @__PURE__ */ new Date()).getDay(), S = w === 0 ? 1 : 8 - w, x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + S), r(fn(x)), o();
  }, [r, o]), u = /* @__PURE__ */ new Date(), d = u.toDateString(), f = new Date(u);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), h = u.getDay(), g = h === 0 ? 1 : 8 - h, y = new Date(u);
  y.setDate(y.getDate() + g);
  const v = y.toDateString();
  return /* @__PURE__ */ L(
    "div",
    {
      ref: s,
      className: oe("date-picker-portal", t === "dark" ? "dark" : ""),
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
        /* @__PURE__ */ m("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ L("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ m("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ m(
            tx,
            {
              mode: "single",
              selected: i,
              onSelect: a
            }
          ) }),
          /* @__PURE__ */ m("div", { className: "border-t border-border" }),
          /* @__PURE__ */ L("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ m(
              Dt,
              {
                variant: "outline",
                size: "sm",
                className: oe(
                  "rounded-full text-xs",
                  i.toDateString() === d && "ring-2 ring-primary"
                ),
                onClick: () => c(0),
                children: "Today"
              }
            ),
            /* @__PURE__ */ m(
              Dt,
              {
                variant: "outline",
                size: "sm",
                className: oe(
                  "rounded-full text-xs",
                  i.toDateString() === p && "ring-2 ring-primary"
                ),
                onClick: () => c(1),
                children: "Tomorrow"
              }
            ),
            /* @__PURE__ */ m(
              Dt,
              {
                variant: "outline",
                size: "sm",
                className: oe(
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
function ax(e, t, n) {
  if (ox(t)) {
    Yr();
    return;
  }
  Yr();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, c = 10, l = 16, u = s - r.bottom - c - l, d = r.top - c - l, f = u >= a ? "below" : d >= a ? "above" : u >= d ? "below" : "above";
  let p;
  f === "below" ? p = r.bottom + c : p = r.top - a - c;
  const h = r.left + r.width / 2;
  let g = h - i / 2;
  g + i > o - l && (g = o - i - l), g < l && (g = l);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((x) => {
    y.addEventListener(x, (k) => {
      k.stopPropagation();
    }, !1);
  });
  const b = jf(y);
  un = { container: y, root: b, pillDate: t };
  const w = () => {
    Yr();
  }, S = (x) => {
    const k = Bu.get(t);
    k && k(x);
  };
  b.render(
    /* @__PURE__ */ m(
      sx,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: g, direction: f, pillCenter: h },
        onSelectDate: S,
        onClose: w
      }
    )
  );
}
function ix({ node: e, updateAttributes: t, selected: n }) {
  const r = j(null), o = e.attrs.date || dn(), s = Fu(o), i = ba(o), a = B(() => {
    if (!r.current) return "";
    const c = r.current.closest(".markdown-editor-container");
    if (c) {
      const u = c.getAttribute("data-theme");
      if (u) return u;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return q(() => (Bu.set(o, (c) => {
    t({ date: c });
  }), rx.set(o, a), () => {
  }), [o, t, a]), q(() => {
    const c = r.current;
    if (!c) return;
    const l = (u) => {
      u.preventDefault(), u.stopPropagation();
      const d = c.getAttribute("data-date") || dn(), f = a();
      ax(c, d, f);
    };
    return c.addEventListener("click", l), () => c.removeEventListener("click", l);
  }, [a]), q(() => {
    const c = r.current?.closest(".ProseMirror") || document, l = () => {
      un && Yr();
    };
    return c.addEventListener("scroll", l, { passive: !0 }), () => {
      c.removeEventListener("scroll", l);
    };
  }, []), /* @__PURE__ */ m(pn, { as: "span", className: "inline", children: /* @__PURE__ */ L(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ m(dc, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ m("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function Co(e) {
  const t = e.split("-");
  if (t.length === 3)
    return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]));
  const n = new Date(e);
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function dn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function zn(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function fn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Fu(e) {
  const t = Co(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
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
function cx(e) {
  return Co(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function Ht(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return dn();
  if (n === "tomorrow") return zn(1);
  if (n === "yesterday") return zn(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), c = a === 0 ? 1 : 8 - a;
    return zn(c);
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
      return fn(u);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const i = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return fn(i);
  }
  return null;
}
function ba(e) {
  const t = Co(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const lx = new Ie("datePillPaste"), ux = io.create({
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
        default: dn(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = Fu(n), o = ba(n);
    return [
      "span",
      xn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return ro(ix, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || dn();
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
        d().deleteRange(u).insertDatePill(dn()).run();
      }
    }), t = new Oe({
      find: /@tomorrow\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(zn(1)).run();
      }
    }), n = new Oe({
      find: /@yesterday\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(zn(-1)).run();
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
          d().deleteRange(u).insertDatePill(fn(y)).run();
        }
      }
    }), s = new Oe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Ht(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), i = new Oe({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Ht(f[1]);
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
        const p = Ht(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), l = new Oe({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Ht(f[1]);
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
      new Re({
        key: lx,
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
              if (Ht(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, p = [];
            let h = 0;
            const g = new RegExp(i.source, i.flags);
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const S = y[1], x = Ht(S);
              if (x) {
                const k = o.slice(h, y.index);
                k && p.push(f.text(k)), p.push(e.create({ date: x })), h = y.index + y[0].length;
              }
            }
            const v = o.slice(h);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const b = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, p)
            ), { $from: w } = u.selection;
            if (w.parent.type.name === "paragraph") {
              const S = d;
              let x = u.selection.from;
              for (const k of p)
                S.insert(x, k), x += k.nodeSize;
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
function dx({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = j(null), i = j(null), a = e.attrs.tag || "", c = j(!1), [l, u] = Y(() => Ke.has(a)), [d, f] = Y(() => Ke.get(a)?.value ?? a);
  q(() => {
    l || f(a);
  }, [a, l]), q(() => {
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
    const w = b.trim().replace(/^#/, ""), S = Bn(w);
    if (Ke.delete(a), S && Ke.delete(S), !S || !on(S))
      o();
    else if (S !== a) {
      const x = r();
      if (typeof x == "number" && n) {
        const { tr: k } = n.state, D = e.nodeSize;
        k.delete(x, x + D), k.insert(x, n.schema.nodes.tagPill.create({ tag: S })), n.view.dispatch(k);
      }
    } else
      Ke.delete(a);
    u(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), h = B(() => {
    n && !n.isEditable || (Ke.set(a, { value: a, focusedAt: Date.now() }), f(a), u(!0), c.current = !1);
  }, [n, a]);
  q(() => {
    const b = s.current;
    if (!b || l) return;
    const w = (x) => {
      x.preventDefault(), x.stopPropagation(), h();
    }, S = (x) => {
      x.preventDefault(), x.stopPropagation();
    };
    return b.addEventListener("dblclick", w), b.addEventListener("click", S), () => {
      b.removeEventListener("dblclick", w), b.removeEventListener("click", S);
    };
  }, [l, n, r, h]), q(() => {
    if (l) {
      const b = requestAnimationFrame(() => {
        if (i.current) {
          i.current.focus(), i.current.select();
          const w = Ke.get(a);
          w && (w.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(b);
    }
  }, [l, a]);
  const g = B((b) => {
    b.key === "Enter" ? (b.preventDefault(), p(d)) : b.key === "Escape" && (b.preventDefault(), Ke.delete(a), u(!1), c.current = !0, n?.commands.focus());
  }, [p, d, a, n]), y = B(() => {
    const w = Ke.get(a)?.focusedAt ?? 0;
    Date.now() - w > 300 && p(d);
  }, [p, d, a]), v = B((b) => {
    f(b.target.value);
  }, []);
  return l ? /* @__PURE__ */ m(pn, { as: "span", className: "inline", children: /* @__PURE__ */ L(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ m(Fa, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
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
  ) }) : /* @__PURE__ */ m(pn, { as: "span", className: "inline", children: /* @__PURE__ */ L(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ m(Fa, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ m("span", { className: "tag-text", children: a })
      ]
    }
  ) });
}
function on(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function Bn(e) {
  return e.toLowerCase().trim();
}
const fx = new Ie("tagPillPaste"), mx = io.create({
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
      xn(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return ro(dx, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = Bn(e);
        return on(n) ? t.insertContent({
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
        const o = Bn(r[1]);
        if (on(o)) {
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
      new Re({
        key: fx,
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
              if (on(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, p = [];
            let h = 0;
            const g = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = g.exec(o)) !== null; ) {
              const w = Bn(y[1]);
              if (on(w)) {
                const S = y[0], x = S.startsWith(" ") || S.startsWith(`
`) ? 1 : 0, k = o.slice(h, y.index + x);
                k && p.push(f.text(k)), p.push(e.create({ tag: w })), h = y.index + S.length;
              }
            }
            const v = o.slice(h);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const { $from: b } = u.selection;
            if (b.parent.type.name === "paragraph") {
              const w = d;
              let S = u.selection.from;
              for (const x of p)
                w.insert(S, x), S += x.nodeSize;
              w.delete(u.selection.from, u.selection.to), t.dispatch(w);
            } else {
              const w = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, p)
              );
              d.replaceSelectionWith(w), t.dispatch(d);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), px = /\[\[([^\[\]]+)\]\]$/, hx = yc.create({
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
      xn(
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
        find: px,
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
  list: /^\s*[-*]\s+/m,
  taskList: /^\s*[-*]\s*\[[ x]\]/im,
  link: /\[.+\]\(.+\)/,
  // Table pattern: header row with pipes, separator row with dashes, optional data rows
  // Allow headers and separators with or without trailing pipes
  table: /^\|[^\n]+\n\|[-:\s|]+/m,
  // Callout pattern: ```info, ```note, ```prompt, ```resources, ```todo, ```ad-*
  callout: /```(?:info|note|prompt|resources|todo|ad-\w+)\s*\n[\s\S]*?```/
}, gx = ["info", "note", "prompt", "resources", "todo"];
function yx(e) {
  return e.length < 3 ? !1 : !!(dt.header.test(e) || dt.bold.test(e) || dt.list.test(e) || dt.taskList.test(e) || dt.codeBlock.test(e) || dt.callout.test(e) || dt.highlight.test(e) || dt.link.test(e) || dt.table.test(e));
}
function vx(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function bx(e, t) {
  const { alt: n, align: r, width: o } = vx(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", i = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${i} /></figure>`;
}
function Jr(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Hi(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${Jr(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const i = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    i ? o.push(bx(i[1], i[2])) : o.push(`<p>${Jr(s.trim())}</p>`);
  }
  return o.join("");
}
function Uu(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^\d+\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[1].trim() } : null;
}
function Yu(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", u = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, d = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += u; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${Jr(f.text)}</p>` : i += `<li><p>${Jr(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
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
function Wi(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(e);
  if (!t && !n)
    return Hi(e);
  const r = e.split(/<br\s*\/?>/i).filter((a) => a.trim()), o = [];
  let s = [];
  const i = () => {
    s.length !== 0 && (o.push(Yu(s)), s = []);
  };
  for (const a of r) {
    const c = Uu(a);
    if (c) {
      if (s.length > 0) {
        const l = s[0].type;
        c.depth === 0 && c.type !== l && i();
      }
      s.push(c);
    } else
      i(), o.push(Hi(a.trim()));
  }
  return i(), o.join("");
}
function wx(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let i = "<table><thead><tr>";
  for (const a of r)
    i += "<th>" + Wi(a) + "</th>";
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
        i += "<td>" + Wi(d) + "</td>";
      }
      i += "</tr>";
    }
  }
  return i += "</tbody></table>", i;
}
function xx(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (d) => {
    const f = d.split(`
`);
    if (f.length >= 2) {
      const p = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const h = wx(d);
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
    let h = p.trim();
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), h = h.replace(/__([^_]+)__/g, "<strong>$1</strong>"), h = h.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), h = h.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), h = h.replace(/`([^`]+)`/g, "<code>$1</code>");
    const g = "info";
    h.startsWith("<") || (h = `<p>${h}</p>`);
    const y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<div data-callout="" data-type="${g}" class="callout callout-${g}">${h}</div>`), y;
  }), gx.forEach((d) => {
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
    a.length !== 0 && (i.push(Yu(a)), a = []);
  };
  for (const d of s) {
    const f = Uu(d);
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
    const h = f.split("|").map((w) => w.trim());
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
const kx = Ze.create({
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
      new Re({
        key: new Ie("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const i = o.getData("text/plain");
            if (!i || !yx(i))
              return !1;
            n.preventDefault();
            const a = xx(i);
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
}), zi = new Ie("collapsibleHeading");
function Cx(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function eo(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), c = `h${i}-${a}`, l = r.get(c) ?? 0;
      r.set(c, l + 1), n.set(s, Cx(i, a, l));
    }
  }), n;
}
let mn = null;
function ns(e, t, n) {
  const r = [], o = eo(e, n.levels), s = [];
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
        Ye.node(u, u + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${f ? "is-collapsed" : "is-expanded"}${p ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": d,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const h = Ye.widget(u + l.nodeSize - 1, () => {
        const g = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${d}"]`);
        if (g) {
          g.classList.contains("collapsed") !== f && (g.classList.remove("collapsed", "expanded"), g.classList.add(f ? "collapsed" : "expanded"), g.title = f ? "Click to expand" : "Click to collapse");
          const w = g.parentElement;
          if (w) return w;
        }
        const y = document.createElement("span");
        y.className = "collapsible-heading-chevron-wrapper", y.setAttribute("contenteditable", "false");
        const v = document.createElement("button");
        return v.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, v.setAttribute("data-heading-id", d), v.setAttribute("data-heading-level", String(l.attrs.level)), v.setAttribute("contenteditable", "false"), v.setAttribute("tabindex", "-1"), v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', v.title = f ? "Click to expand" : "Click to collapse", v.addEventListener("click", (b) => {
          b.preventDefault(), b.stopPropagation();
          const w = v.classList.contains("collapsed");
          v.classList.remove("collapsed", "expanded"), v.classList.add(w ? "expanded" : "collapsed"), v.title = w ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(d) ? t.collapsedHeadings.delete(d) : t.collapsedHeadings.add(d), mn && mn.dispatch(mn.state.tr.setMeta("collapsibleHeading", { toggled: d }));
        }), y.appendChild(v), y;
      }, { side: 1, key: `chevron-${d}` });
      r.push(h);
    } else l.isBlock && c(u) && r.push(
      Ye.node(u, u + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), _e.create(e, r);
}
function Mx(e, t, n, r) {
  if (n.collapsedHeadings.size === 0) return;
  const o = eo(t, r), s = new Set(o.values()), i = [];
  n.collapsedHeadings.forEach((a) => {
    s.has(a) || i.push(a);
  });
  for (const a of i)
    n.collapsedHeadings.delete(a);
}
const Sx = Ze.create({
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
        const i = eo(n.doc, this.options.levels).get(e);
        return i ? (r.collapsedHeadings.has(i) ? r.collapsedHeadings.delete(i) : r.collapsedHeadings.add(i), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: i })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return eo(t.doc, this.options.levels).forEach((o) => {
          n.collapsedHeadings.add(o);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Re({
        key: zi,
        view(n) {
          return mn = n, {
            update(r) {
              mn = r;
            },
            destroy() {
              mn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: ns(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            const i = n.getMeta("collapsibleHeading");
            return i || n.docChanged ? (n.docChanged && !i && Mx(o.doc, s.doc, e, t.levels), {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: ns(s.doc, e, t),
              docVersion: r.docVersion + 1
            }) : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = zi.getState(n);
            return r?.decorations ? r.decorations : ns(n.doc, e, t);
          }
        }
      })
    ];
  }
}), Ex = /\[([^\]]+)\]\(([^)]+)\)$/, Tx = /^(https?:\/\/|www\.)[^\s]+$/i, Dx = Ze.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Oe({
        find: Ex,
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
      new Re({
        key: new Ie("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!Tx.test(s)) return !1;
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
}), Nx = ["info", "note", "prompt", "resources", "todo"], Ax = Ze.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Re({
        key: new Ie("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: i } = o, a = i.start();
            i.end();
            const c = s.textBetween(a, i.pos, ""), l = c.trim();
            for (const u of Nx)
              if (l === `\`\`\`${u}`) {
                n.preventDefault();
                const d = r.tr, f = a + c.indexOf("```");
                d.delete(f, i.pos);
                const p = e.schema.nodes.callout, h = e.schema.nodes.paragraph;
                if (p && h) {
                  const g = h.create(), y = p.create({ type: u }, Vf.from(g));
                  d.insert(f, y);
                  const v = d.doc.resolve(f + 2);
                  d.setSelection(nt.near(v)), t.dispatch(d);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), Or = new Ie("searchHighlight"), Lx = Ze.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(Or, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Or, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Re({
        key: Or,
        state: {
          init() {
            return _e.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: c } = e, l = t.getMeta(Or), u = t.docChanged;
            if (!s)
              return _e.empty;
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
                    const v = g + y.index, b = g + y.index + y[0].length, w = f === c;
                    d.push(
                      Ye.inline(v, b, {
                        class: w ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return _e.empty;
            }
            return _e.create(o.doc, d);
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
}), Rx = new Ie("tabIndent");
function Ix(e) {
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
const Px = Ze.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Re({
        key: Rx,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = Ix(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!Ya(s)(n, r)) {
                const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
                l && Ya(l)(n, r);
              }
            } else if (!ja(s)(n, r)) {
              const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
              l && ja(l)(n, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), Ox = new Ie("expandSelection");
function rs(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const _x = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), $x = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), Hx = "tableRow", Wx = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function zx(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Bx(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (Wx.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Fx(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === Hx) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function Ux(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if ($x.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function Yx(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const c = r.node(a);
    _x.has(c.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function jx(e) {
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
function Vx(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function Kx(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function Gx(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (c) => c && (c.from < o || c.to > s) ? (r.push(c), o = c.from, s = c.to, !0) : !1;
  i(zx(e, o, s)), Kx(e, t) && (i(Bx(e, o, s)), i(Fx(e, o, s))), i(Yx(e, o, s)), i(Ux(e, o, s));
  const a = jx(e);
  if (a.length > 0) {
    const c = Vx(a, o, s);
    for (const l of c)
      i({ from: l.from, to: l.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size }), r;
}
const qx = Ze.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof wf || o === 0 && s === n.content.size)
          return !0;
        const a = Gx(n, o, s);
        let c = null;
        for (const l of a)
          if (l.from < o || l.to > s) {
            c = l;
            break;
          }
        return c ? (t.lastExpandedFrom = c.from, t.lastExpandedTo = c.to, t.expansionDepth++, t.isExpanding = !0, c.from === 0 && c.to === n.content.size ? e.commands.selectAll() : e.commands.setTextSelection({
          from: c.from,
          to: c.to
        }), t.isExpanding = !1, !0) : (t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size, t.expansionDepth++, t.isExpanding = !0, e.commands.selectAll(), t.isExpanding = !1, !0);
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Re({
        key: Ox,
        props: {
          handleClick() {
            return rs(e), !1;
          },
          handleTextInput() {
            return rs(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && rs(e), !1;
          }
        }
      })
    ];
  }
}), Xx = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Zx(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const Qx = new Ie("hexColorDecoration");
function ju(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const c = new RegExp(Xx.source, "g");
    for (; (a = c.exec(i)) !== null; ) {
      const l = s + a.index, u = l + a[0].length;
      if (u >= t && l <= n) {
        const d = a[0], f = Zx(d);
        r.push(
          Ye.inline(l, u, {
            class: "hex-color-swatch",
            style: `background-color: ${d}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), r;
}
function Jx(e) {
  const t = ju(e, 0, e.content.size);
  return _e.create(e, t);
}
const ek = yc.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Re({
        key: Qx,
        state: {
          init(e, { doc: t }) {
            return Jx(t);
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
              const i = ju(e.doc, s.from, s.to);
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
}), Te = new Ie("selectAllOccurrences");
function Bi(e, t, n, r, o) {
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
  const n = Te.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function tk(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Me(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const nk = Ze.create({
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
        const c = Bi(t.state.doc, o, s, i, a);
        return c.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = c, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = i, this.storage.wholeWord = a, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = c, this.storage.nextMatchIndex = c.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(Te, { activate: !0 })), !0);
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
          const c = Bi(o.doc, a, !1, !1, !1);
          if (c.length === 0) return !1;
          const l = tk(c, s), u = c[l];
          return r.isActive = !0, r.ranges = [u], r.searchTerm = a, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = a.length, r.allMatches = c, r.nextMatchIndex = (l + 1) % c.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(Te, { activate: !0 })), setTimeout(() => {
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
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(Te, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Me(this.storage), t && t(e.setMeta(Te, { deactivate: !0 })), !0),
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
              this.storage.ranges = c, c.length === 0 && Me(this.storage);
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
        return Me(this.storage), !0;
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
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && Me(this.storage);
            }
          } catch {
          }
        }, 10) : Me(this.storage), !0;
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
      new Re({
        key: Te,
        state: {
          init() {
            return _e.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(Te);
            if (s?.deactivate || !e.isActive)
              return _e.empty;
            if (s?.activate || s?.refresh) {
              const i = [];
              for (const a of e.ranges) {
                i.push(
                  Ye.inline(a.from, a.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const c = document.createElement("span");
                c.className = "select-all-multi-cursor", c.setAttribute("aria-hidden", "true"), i.push(
                  Ye.widget(a.to, c, {
                    side: 1,
                    key: `cursor-${a.from}-${a.to}`
                  })
                );
              }
              return _e.create(o.doc, i);
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
              Me(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(Te, { deactivate: !0 }));
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
              Me(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Te, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), Kf(t.state, t.dispatch), setTimeout(() => {
                  const s = Et(t);
                  e.ranges = s, s.length === 0 && Me(e);
                }, 10), !0;
              }
              Me(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Te, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, Gf(t.state, t.dispatch), setTimeout(() => {
                  const s = Et(t);
                  e.ranges = s, s.length === 0 && Me(e);
                }, 10), !0;
              }
              Me(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Te, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Et(t);
                if (r.length === 0) {
                  Me(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(Te, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, c) => c.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = Et(t);
                  e.ranges = a, a.length === 0 && Me(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
                for (const i of r)
                  o.delete(i.from, i.to);
                t.dispatch(o), Me(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Te, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
              for (const i of r)
                o.delete(i.from, i.to);
              t.dispatch(o), Me(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Te, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Me(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Te, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Me(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Te, { deactivate: !0 })), !1;
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
              Me(e);
              const { tr: c } = t.state;
              return t.dispatch(c.setMeta(Te, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((c, l) => l.from - c.from), { tr: a } = t.state;
            for (const c of i)
              a.replaceWith(c.from, c.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const c = Et(t);
              e.ranges = c, c.length === 0 && Me(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function rk() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function ok(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function sk(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let c = 0; c < i.length; c++)
    a[c] = i.charCodeAt(c);
  return new File([a], t, { type: s });
}
function ak(e, t) {
  return t.includes(e.type);
}
function ik(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function ck(e, t, n) {
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
      const d = e.type === "image/png" || e.type === "image/gif", f = d ? "image/png" : "image/jpeg", p = d ? void 0 : n, h = l.toDataURL(f, p), g = sk(h, e.name);
      r({ dataUrl: h, file: g, width: a, height: c });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function lk(e, t, n) {
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
async function Fi(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!ak(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = rk();
  try {
    n.onUploadStart?.();
    let o, s, i;
    const a = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && a) {
      const p = await ck(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = p.dataUrl, i = p.file, s = Math.min(p.width, 600);
    } else {
      o = await ok(e), i = e;
      const p = await ik(o);
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
            const { state: v, dispatch: b } = t.view, w = v.doc.nodeAt(y);
            if (w) {
              const S = v.tr.setNodeMarkup(y, void 0, {
                ...w.attrs,
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
      return console.warn("Image upload failed, removing placeholder:", p), lk(t, o, e.name), n.onUploadError?.(`Upload failed: ${p instanceof Error ? p.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function Ui(e) {
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
const uk = Ze.create({
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
      new Re({
        key: new Ie("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = Ui(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((i) => {
              Fi(i, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const i = r.dataTransfer;
            if (!i) return !1;
            const a = Ui(i);
            if (a.length === 0)
              return !1;
            r.preventDefault();
            const c = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (c) {
              const l = n.state.tr.setSelection(
                nt.near(n.state.doc.resolve(c.pos))
              );
              n.dispatch(l);
            }
            return a.forEach((l) => {
              Fi(l, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function dk({
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
  return Ft(() => {
    const p = [
      xf.configure({
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
        }
      }),
      // Mixed list extensions - allow inter-mixing of bullet, ordered, and task list items
      zv,
      Bv,
      Yv,
      kf.configure({
        placeholder: e,
        emptyEditorClass: "is-editor-empty"
      }),
      Cf.configure({
        types: ["heading", "paragraph"]
      }),
      Mf.configure({
        multicolor: !0
      }),
      Sf.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      _f,
      $f,
      Hf,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...u ? [] : [Wf],
      Dx,
      Lx,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...u ? [] : [nk],
      Px,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      qf.extend({
        addInputRules() {
          const h = this.type;
          return [
            new Oe({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: g, range: y }) => {
                const { tr: v } = g, b = y.from, w = y.to;
                v.delete(b, w);
                const S = v.doc.resolve(b), x = h.create(), k = S.before(S.depth), D = S.after(S.depth);
                v.replaceWith(k, D, x);
                const C = k + x.nodeSize;
                if (C < v.doc.content.size) {
                  const M = v.doc.resolve(C);
                  M.nodeAfter && M.nodeAfter.isTextblock ? v.setSelection(nt.create(v.doc, C + 1)) : M.nodeAfter && v.setSelection(nt.near(v.doc.resolve(C)));
                } else {
                  const T = g.schema.nodes.paragraph.create();
                  v.insert(C, T), v.setSelection(nt.create(v.doc, C + 1));
                }
                v.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return s.tables || p.push(
      Ef.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Tf,
      Lv,
      Rv,
      ...u ? [] : [Wv]
    ), s.taskLists || p.push(
      Fv.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Uv.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), !t && !u && p.push(
      Vv.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || p.push(qv), s.callouts || p.push(Zv, Ax), a && !s.collapsibleHeadings && !u && p.push(
      Sx.configure({
        levels: o
      })
    ), s.images || p.push(
      Qv.configure({
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
      uk.configure({
        maxFileSize: n,
        onUploadStart: f.onImageUploadStart.current ? ((...h) => f.onImageUploadStart.current(...h)) : void 0,
        onUploadComplete: f.onImageUploadComplete.current ? ((...h) => f.onImageUploadComplete.current(...h)) : void 0,
        onUploadError: f.onImageUploadError.current ? ((...h) => f.onImageUploadError.current(...h)) : void 0,
        onImageUpload: f.onImageUpload.current ? ((h, g) => f.onImageUpload.current(h, g)) : void 0
      })
    ), s.datePills || p.push(
      ux.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), s.tagPills || p.push(
      mx.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: c
      })
    ), s.wikiLinks || p.push(
      hx.configure({
        onWikiLinkClick: (h) => {
          console.log("WikiLink clicked:", h), f.onWikiLinkClick.current?.(h);
        },
        validateLink: (h) => f.validateWikiLink.current ? f.validateWikiLink.current(h) : !0
      })
    ), i && p.push(qx), l && !u && p.push(ek), s.markdownPaste || p.push(
      kx.configure({
        enableMarkdownPaste: !0
      })
    ), p;
  }, [e, t, n, r, o, s, i, a, c, l, u]);
}
let pt = null, to = null;
async function Vu() {
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
      const u = l, d = u.getAttribute("src") || "", p = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = u.getAttribute("width"), g = h ? parseInt(h, 10) : null, y = u.getAttribute("data-align") || "left", v = [p], b = y !== "left", w = g && g > 0;
      return (b || w) && v.push(b ? y : "left"), w && v.push(String(g)), `![${v.join(" | ")}](${d})`;
    }
  }), n.addRule("imageResizer", {
    filter: (c) => c.nodeName === "FIGURE" && c.classList.contains("image-resizer"),
    replacement: (c, l) => {
      const u = l.querySelector("img");
      if (!u) return c;
      const d = u.getAttribute("src") || "", p = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = u.getAttribute("width"), g = h ? parseInt(h, 10) : null, y = u.getAttribute("data-align") || "left", v = [p], b = y !== "left", w = g && g > 0;
      (b || w) && v.push(b ? y : "left"), w && v.push(String(g));
      const S = `![${v.join(" | ")}](${d})`, x = l.parentNode;
      return x && x.nodeName === "LI" ? `
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
      const v = g.getAttribute("data-type") === "taskItem", b = g.getAttribute("data-checked") === "true", w = s(g);
      v ? l.push(`${d}- [${b ? "x" : " "}] ${w}`) : f === "OL" ? l.push(`${d}${h + y}. ${w}`) : l.push(`${d}- ${w}`);
      const S = Array.from(g.childNodes).filter(
        (x) => x.nodeType === Node.ELEMENT_NODE && (x.nodeName === "UL" || x.nodeName === "OL")
      );
      for (const x of S)
        i(x, l, u + 1);
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
        const v = Array.from(g.querySelectorAll("th, td")), b = v.map((w) => a(w));
        if (y > 0 && v.length > 0 && v[0].nodeName === "TH" && (p = !0), f.push("| " + b.join(" | ") + " |"), y === 0) {
          const w = v.map(() => "---").join(" | ");
          f.push("| " + w + " |");
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
      return u ? `@${cx(u)}@` : c;
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
      const u = l.previousElementSibling, d = u && (u.nodeName === "UL" || u.nodeName === "OL");
      return `

` + c.trim() + `

`;
    }
  }), pt = n, n;
}
function fk() {
  !to && !pt && (to = Vu().then((e) => (pt = e, e)));
}
function mk() {
  return fk(), {
    turndown(e) {
      return pt ? pt.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return pt !== null;
    },
    async ready() {
      pt || (to ? await to : await Vu());
    }
  };
}
function pk() {
  const e = j(null);
  return e.current || (e.current = mk()), e.current;
}
function hk(e) {
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
    rawMarkdownRef: w,
    setRawMarkdown: S,
    setIsLightweight: x,
    lightweightCheckCounterRef: k,
    isLightweightRef: D
  } = e, C = j(null), M = j(l), T = j(u), N = j(d), A = j(null);
  M.current = l, T.current = u, N.current = d;
  const P = Td({
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
    onCreate: ({ editor: _ }) => {
      window.__tiptapEditor = _, f?.(_);
    },
    onDestroy: () => {
      p?.();
    },
    extensions: t,
    content: n,
    editable: r,
    autofocus: o,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: s ? "true" : "false"
      },
      handleClick: (_, U, I) => {
        if (v) {
          const W = I.target.closest("a");
          if (W) {
            const K = W.getAttribute("href");
            if (K && v(K, I) === !1)
              return I.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: _ }) => {
      if (a === "auto" && (k.current++, k.current >= 50)) {
        k.current = 0;
        const I = _.state.doc.content.childCount > c;
        I !== D.current && x(I);
      }
      C.current && clearTimeout(C.current), C.current = setTimeout(() => {
        if (_.isDestroyed) return;
        const U = _.getHTML();
        (M.current || T.current) && (M.current?.(U), T.current?.(U));
      }, 150);
    },
    onFocus: () => {
      h?.();
    },
    onBlur: () => {
      if (C.current && (clearTimeout(C.current), C.current = null, P && !P.isDestroyed)) {
        const _ = P.getHTML();
        if ((M.current || T.current) && (M.current?.(_), T.current?.(_)), b.current === "wysiwyg" && A.current) {
          const U = A.current.turndown(_);
          w.current = U, N.current?.(U);
        }
      }
      g?.();
    },
    onSelectionUpdate: ({ editor: _ }) => {
      if (y) {
        const { from: U, to: I, empty: R } = _.state.selection;
        y({ from: U, to: I, empty: R });
      }
    }
  });
  q(() => () => {
    if (C.current && (clearTimeout(C.current), C.current = null, P && !P.isDestroyed)) {
      const _ = P.getHTML();
      if ((M.current || T.current) && (M.current?.(_), T.current?.(_)), b.current === "wysiwyg" && A.current) {
        const U = A.current.turndown(_);
        w.current = U, N.current?.(U);
      }
    }
  }, []);
  const O = pk();
  A.current = O;
  const $ = j(!1);
  return q(() => {
    if (!$.current && i === "markdown" && P && !P.isDestroyed && O) {
      const _ = P.getHTML(), U = O.turndown(_);
      S(U), w.current = U, $.current = !0;
    }
  }, [P, O, i]), { editor: P, turndownService: O };
}
function gk(e) {
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
        const v = Array.from(f.childNodes), b = [], w = [];
        v.forEach((x) => {
          if (x.nodeType === Node.ELEMENT_NODE) {
            const k = x;
            if (k.tagName === "UL" || k.tagName === "OL" || k.tagName === "P")
              w.push(x);
            else if (k.tagName === "IMG" || k.tagName === "FIGURE")
              if (k.tagName === "IMG") {
                const D = n.createElement("figure");
                D.className = "image-resizer";
                const C = k.getAttribute("data-align") || "left", M = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[C] || "margin-right: auto;";
                D.style.cssText = M, D.appendChild(k.cloneNode(!0)), w.push(D);
              } else
                w.push(x);
            else
              b.push(x);
          } else
            b.push(x);
        });
        const S = w.filter((x) => {
          if (x.nodeType === Node.ELEMENT_NODE) {
            const k = x;
            if (k.tagName === "P" && !k.textContent?.trim() && !k.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", b.length > 0) {
          const x = n.createElement("p");
          b.forEach((k) => x.appendChild(k)), x.firstChild && x.firstChild.nodeType === Node.TEXT_NODE && (x.firstChild.textContent = (x.firstChild.textContent || "").replace(/^\s+/, "")), (x.textContent?.trim() || x.querySelector("img, figure, code, br")) && f.appendChild(x);
        }
        S.forEach((x) => f.appendChild(x));
      }
    }), l && !u && i.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
function yk(e) {
  const t = e.split(`
`), n = [], r = (a) => {
    const c = a.trimStart();
    return /^[-*+]\s+\[[ xX]\]\s/.test(c) ? "task" : /^[-*+]\s+/.test(c) ? "bullet" : /^\d+\.\s+/.test(c) ? "ordered" : null;
  }, o = (a) => /^\s{2,}\S/.test(a), s = (a) => a.trim() === "" || a.trim() === "​";
  let i = !1;
  for (let a = 0; a < t.length; a++) {
    const c = t[a];
    if (/^```/.test(c.trim())) {
      i = !i, n.push(c);
      continue;
    }
    if (i) {
      n.push(c);
      continue;
    }
    if (n.push(c), r(c) !== null || o(c)) {
      let l = a + 1;
      for (; l < t.length && o(t[l]); )
        l++;
      let u = 0;
      const d = l;
      for (; l < t.length && s(t[l]); )
        u++, l++;
      if (u > 0 && l < t.length) {
        const f = r(c), p = r(t[l]);
        if (f !== null && p !== null) {
          for (let h = d; h < l; h++)
            n.push(t[h]);
          n.push("<!-- list-break -->"), a = l - 1;
          continue;
        }
      }
    }
  }
  return n.join(`
`);
}
function vk(e) {
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
                  const x = n.createElement("p");
                  g.forEach((k) => x.appendChild(k.cloneNode(!0))), x.textContent?.trim() && l.push(x), g.length = 0;
                }
                const v = y, b = n.createElement("figure");
                b.className = "image-resizer";
                const w = v.getAttribute("data-align") || "left", S = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                b.style.cssText = S[w] || "margin-right: auto;", b.appendChild(v.cloneNode(!0)), l.push(b);
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
function bk(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (r) => r.replace(/<tr>([\s\S]*?)<\/tr>/gi, (o, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function no(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function wk(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function Yi(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((r) => r.trim()).map((r) => /^<img\s/i.test(r) ? wk(r) : r.trim() ? `<p>${no(r.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${no(e)}</p>`;
}
function xk(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^(\d+)\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[2].trim(), index: parseInt(a[1], 10) } : null;
}
function kk(e) {
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
function Ck(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, r, o) => {
      const s = /<img\s/i.test(r), i = /<br\s*\/?>/i.test(r), a = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(r);
      if (!s && !i && !a) return t;
      let c = r.trim();
      c = c.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const l = c.split(/<br\s*\/?>/i).filter((p) => p.trim());
      if (l.length <= 1 && !a)
        return s ? `${n}${Yi(c)}${o}` : t;
      const u = [];
      let d = [];
      const f = () => {
        d.length !== 0 && (u.push(kk(d)), d = []);
      };
      for (const p of l) {
        const h = xk(p);
        if (h) {
          if (d.length > 0) {
            const g = d[0].type;
            h.depth === 0 && h.type !== g && f();
          }
          d.push(h);
        } else
          f(), u.push(Yi(p.trim()));
      }
      return f(), `${n}${u.join("")}${o}`;
    }
  );
}
function Mk(e, t, n = {}) {
  const {
    enableTagAutoDetect: r = !1,
    disableTagPills: o = !1,
    isValidTag: s,
    normalizeTag: i,
    parseDateFromMarkdown: a,
    getDateVariant: c
  } = n;
  let l = e;
  l = yk(l);
  const u = ["info", "note", "prompt", "resources", "todo"];
  return u.forEach((f) => {
    const p = new RegExp(`\`\`\`ad-${f}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    l = l.replace(p, (h, g) => {
      const y = t(g.trim());
      return `<div data-callout="" data-type="${f}" class="callout callout-${f}">${y}</div>`;
    });
  }), u.forEach((f) => {
    const p = new RegExp(`\`\`\`${f}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    l = l.replace(p, (h, g) => {
      const y = t(g.trim());
      return `<div data-callout="" data-type="${f}" class="callout callout-${f}">${y}</div>`;
    });
  }), l = l.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (f, p, h) => {
    const g = p.split("|").map((x) => x.trim());
    let y = "", v = "left", b = null;
    g.length === 1 ? y = g[0] : g.length === 2 ? (y = g[0], /^\d+$/.test(g[1]) ? b = g[1] : ["left", "center", "right"].includes(g[1]) ? v = g[1] : y = p) : g.length === 3 ? (y = g[0], ["left", "center", "right"].includes(g[1]) && (v = g[1]), /^\d+$/.test(g[2]) && (b = g[2])) : y = p;
    const w = b ? ` width="${b}" style="width: ${b}px"` : "", S = ` data-align="${v}"`;
    return `<img src="${h.trim()}" alt="${y}"${S}${w} />`;
  }), l = l.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), a && c && (l = l.replace(/@([^@\n]+)@/g, (f, p) => {
    const h = a(p);
    if (h) {
      const g = c(h);
      return `<span data-type="date-pill" data-date="${h}" class="date-pill ${g}"><span class="date-icon">📅</span><span class="date-text">${p.trim()}</span></span>`;
    }
    return f;
  })), r && !o && s && i && (l = l.replace(
    new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"),
    (f, p) => {
      const h = i(p);
      return s(h) ? `<span data-type="tag-pill" data-tag="${h}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${h}</span></span>` : f;
    }
  )), l = l.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((f, p) => p % 2 === 1 ? f : f.replace(/\[\[([^\[\]]+)\]\]/g, (h, g) => `<span data-wiki-link data-page-name="${g.trim()}" class="wiki-link">${g.trim()}</span>`)).join(""), l;
}
function Sk(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = gk(t), t = vk(t), t = bk(t), t = Ck(t), t;
}
function Ek(e, t, n = {}) {
  const r = Mk(e, t, n), o = t(r);
  return Sk(o);
}
function Tk(e, t, n) {
  q(() => {
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
                const w = g.doc.resolve(y).blockRange();
                if (w) {
                  const S = [
                    { type: p, attrs: {} },
                    { type: h, attrs: { checked: f } }
                  ];
                  g.wrap(w, S), e.view.dispatch(g);
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
              o.preventDefault(), Ur(e, l.pos - 3, l.pos);
              return;
            }
            if (u === "—-") {
              o.preventDefault(), Ur(e, l.pos - 2, l.pos);
              return;
            }
            if (u === "—") {
              o.preventDefault(), Ur(e, l.pos - 1, l.pos);
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
function Dk({
  editorModeRef: e,
  rawMarkdownRef: t,
  editorMode: n,
  handleModeSwitch: r,
  setIsFindReplaceOpen: o,
  setFindReplaceFocusTrigger: s
}) {
  q(() => {
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
  }, [r]), q(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: n } }));
  }, [n]);
}
function Nk({
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
          isValidTag: on,
          normalizeTag: Bn,
          parseDateFromMarkdown: Ht,
          getDateVariant: ba
        }, h = Ek(r.current, f, p);
        queueMicrotask(() => {
          e.isDestroyed || e.commands.setContent(h);
        });
      }
      o(u), n.current = u, i?.(u);
    }
  }, [e, t, i]);
}
const Ak = 200;
function Lk(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: r = !1,
    enabled: o = !0
  } = t, [s, i] = Y({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), a = j(null), c = j(""), l = B((u) => {
    const d = u.trim(), f = d.length > 0 ? d.split(/\s+/).filter((b) => b.length > 0).length : 0, p = d.replace(/\s/g, "").length, h = u.length;
    let g = 0, y = 0;
    r && (g = d.length > 0 ? d.split(/\n\s*\n/).filter((b) => b.trim().length > 0).length : 0, y = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const v = Math.max(1, Math.ceil(f / Ak));
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
  return q(() => {
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
function Rk({ status: e, lastSaved: t, className: n = "" }) {
  const r = (o) => {
    if (!o) return "";
    const i = (/* @__PURE__ */ new Date()).getTime() - o.getTime(), a = Math.floor(i / 1e3), c = Math.floor(a / 60), l = Math.floor(c / 60);
    return a < 10 ? "Just now" : a < 60 ? `${a}s ago` : c < 60 ? `${c}m ago` : l < 24 ? `${l}h ago` : o.toLocaleDateString();
  };
  return /* @__PURE__ */ L(
    "div",
    {
      className: `auto-save-indicator flex items-center gap-1.5 text-xs ${n}`,
      title: t ? `Last saved: ${t.toLocaleString()}` : "Not saved yet",
      children: [
        e === "idle" && t && /* @__PURE__ */ L(xe, { children: [
          /* @__PURE__ */ m(Xd, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ L("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ L(xe, { children: [
          /* @__PURE__ */ m(fc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ m("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ L(xe, { children: [
          /* @__PURE__ */ m(wn, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ m("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ L(xe, { children: [
          /* @__PURE__ */ m(Zd, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ m("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function Ik({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ L(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ L("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ m(Qd, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ m("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ L("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ L(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ m(Us, { className: "w-4 h-4" }),
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
function _r(e) {
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
      let w;
      for (b.regex.lastIndex = 0; (w = b.regex.exec(a)) !== null; )
        g.push({
          start: c + w.index,
          end: c + w.index + w[0].length,
          type: b.type,
          content: w[0]
        });
    }
    g.sort((b, w) => b.start - w.start);
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
function ji(e) {
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
function Bt(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function $r(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return Bt(e);
  let o = "";
  const s = e.split(`
`);
  let i = 0;
  if (!n || n.length === 0) {
    for (let c = 0; c < s.length; c++) {
      const l = s[c], u = i + l.length, d = t.filter((p) => p.start >= i && p.start < u);
      let f = i;
      for (const p of d)
        p.start > f && (o += Bt(e.substring(f, p.start))), o += `<span class="${ji(p.type)}">${Bt(p.content)}</span>`, f = p.end;
      f < u && (o += Bt(e.substring(f, u))), c < s.length - 1 && (o += `
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
      p.start > f && (o += os(e, f, p.start, null, a)), o += os(e, p.start, p.end, ji(p.type), a), f = p.end;
    f < u && (o += os(e, f, u, null, a)), c < s.length - 1 && (o += `
`), i = u + 1;
  }
  return o;
}
function os(e, t, n, r, o) {
  let s = "", i = t;
  for (; i < n; ) {
    const a = o.get(i);
    if (a) {
      const c = i;
      for (; i < n && o.get(i)?.matchIdx === a.matchIdx; )
        i++;
      const l = Bt(e.substring(c, i)), u = a.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${u}">${l}</mark></span>` : s += `<mark class="${u}">${l}</mark>`;
    } else {
      const c = i;
      for (; i < n && !o.has(i); )
        i++;
      const l = Bt(e.substring(c, i));
      r ? s += `<span class="${r}">${l}</span>` : s += l;
    }
  }
  return s;
}
function Pk({
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
  const l = j(null), u = j(null), d = j(null), f = j(null), p = 5e3, h = 80, [g, y] = Y(() => {
    const C = _r(e);
    return $r(e, C, i, a);
  }), v = j(null), b = Ft(() => {
    if (e.length <= p) {
      const C = _r(e), M = $r(e, C, i, a);
      return v.current && (clearTimeout(v.current), v.current = null), M;
    }
    return null;
  }, [e, i, a]);
  q(() => {
    if (e.length <= p) {
      const C = _r(e);
      y($r(e, C, i, a));
      return;
    }
    return v.current && clearTimeout(v.current), v.current = setTimeout(() => {
      const C = _r(e);
      y($r(e, C, i, a)), v.current = null;
    }, h), () => {
      v.current && clearTimeout(v.current);
    };
  }, [e, i, a]);
  const w = b ?? g, S = B(() => {
    const C = l.current, M = u.current, T = d.current;
    if (C) {
      const N = T?.parentElement, A = N ? N.clientHeight : 200;
      C.style.height = "auto";
      const P = Math.max(C.scrollHeight, A, 200);
      C.style.height = `${P}px`, M && (M.style.height = `${P}px`);
    }
  }, []);
  q(() => {
    const C = l.current;
    if (!C) return;
    const M = (T) => {
      const N = C.closest(".editor-content-wrapper");
      if (!N) return;
      const { scrollTop: A, scrollHeight: P, clientHeight: O } = N, $ = A <= 0, _ = A + O >= P - 1;
      (T.deltaY > 0 && !_ || T.deltaY < 0 && !$) && (T.preventDefault(), N.scrollTop += T.deltaY);
    };
    return C.addEventListener("wheel", M, { passive: !1 }), () => C.removeEventListener("wheel", M);
  }, []);
  const x = B(() => {
  }, []);
  q(() => {
    S();
  }, [e, S]), q(() => {
    o && l.current && l.current.focus();
  }, [o]), q(() => {
    if (f.current && l.current) {
      const { start: C, end: M } = f.current;
      l.current.selectionStart = C, l.current.selectionEnd = M, f.current = null;
    }
  }, [e]);
  const k = B((C) => {
    const M = C.target;
    f.current = {
      start: M.selectionStart,
      end: M.selectionEnd
    }, t(M.value);
  }, [t]), D = B((C) => {
    const M = C.currentTarget, T = M.selectionStart, N = M.selectionEnd, A = M.value, P = T !== N;
    if (c) {
      if (C.key === "`" && !C.ctrlKey && !C.metaKey) {
        if (C.preventDefault(), P) {
          const O = A.substring(T, N), $ = A.substring(0, T) + "`" + O + "`" + A.substring(N);
          f.current = { start: T + 1, end: N + 1 }, t($);
        } else if (A[T] === "`")
          f.current = { start: T + 1, end: T + 1 }, t(A), M.selectionStart = M.selectionEnd = T + 1;
        else {
          const O = A.substring(0, T) + "``" + A.substring(N);
          f.current = { start: T + 1, end: T + 1 }, t(O);
        }
        return;
      }
      if (C.key === "*" && !C.ctrlKey && !C.metaKey) {
        if (A[T - 1] === "*" && A[T], P) {
          C.preventDefault();
          const _ = A.substring(T, N), U = A.substring(0, T) + "*" + _ + "*" + A.substring(N);
          f.current = { start: T + 1, end: N + 1 }, t(U);
          return;
        }
        if (A[T] === "*") {
          C.preventDefault(), f.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
          return;
        }
        C.preventDefault();
        const $ = A.substring(0, T) + "**" + A.substring(N);
        f.current = { start: T + 1, end: T + 1 }, t($);
        return;
      }
      if (C.key === "_" && !C.ctrlKey && !C.metaKey) {
        if (P) {
          C.preventDefault();
          const $ = A.substring(T, N), _ = A.substring(0, T) + "_" + $ + "_" + A.substring(N);
          f.current = { start: T + 1, end: N + 1 }, t(_);
          return;
        }
        if (A[T] === "_") {
          C.preventDefault(), f.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
          return;
        }
        C.preventDefault();
        const O = A.substring(0, T) + "__" + A.substring(N);
        f.current = { start: T + 1, end: T + 1 }, t(O);
        return;
      }
      if (C.key === "~" && !C.ctrlKey && !C.metaKey) {
        if (P) {
          C.preventDefault();
          const $ = A.substring(T, N), _ = A.substring(0, T) + "~" + $ + "~" + A.substring(N);
          f.current = { start: T + 1, end: N + 1 }, t(_);
          return;
        }
        if (A[T] === "~") {
          C.preventDefault(), f.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
          return;
        }
        C.preventDefault();
        const O = A.substring(0, T) + "~~" + A.substring(N);
        f.current = { start: T + 1, end: T + 1 }, t(O);
        return;
      }
      if (C.key === "[" && !C.ctrlKey && !C.metaKey) {
        if (C.preventDefault(), P) {
          const O = A.substring(T, N), $ = A.substring(0, T) + "[" + O + "]()" + A.substring(N);
          f.current = { start: N + 3, end: N + 3 }, t($);
        } else {
          const O = A.substring(0, T) + "[]()" + A.substring(N);
          f.current = { start: T + 1, end: T + 1 }, t(O);
        }
        return;
      }
      if (C.key === "]" && !C.ctrlKey && !C.metaKey && A[T] === "]") {
        C.preventDefault(), f.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
        return;
      }
      if (C.key === ")" && !C.ctrlKey && !C.metaKey && A[T] === ")") {
        C.preventDefault(), f.current = { start: T + 1, end: T + 1 }, t(A.substring(0, T) + A.substring(T));
        return;
      }
      if (C.key === "Backspace" && !P && T > 0) {
        const O = A[T - 1], $ = A[T], _ = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [U, I] of _)
          if (O === U && $ === I) {
            C.preventDefault();
            const R = A.substring(0, T - 1) + A.substring(T + 1);
            f.current = { start: T - 1, end: T - 1 }, t(R);
            return;
          }
        if (O === "[" && A.substring(T, T + 3) === "]()") {
          C.preventDefault();
          const U = A.substring(0, T - 1) + A.substring(T + 3);
          f.current = { start: T - 1, end: T - 1 }, t(U);
          return;
        }
      }
    }
    if (C.key === "Tab")
      if (C.preventDefault(), C.shiftKey) {
        const O = A.substring(0, T), $ = A.substring(T, N), _ = A.substring(N), I = O.lastIndexOf(`
`) + 1, R = O.substring(0, I), W = O.substring(I), K = (W + $).split(`
`), V = K.map((z) => z.startsWith("  ") ? z.substring(2) : z.startsWith("	") ? z.substring(1) : z), G = R + V.join(`
`) + _, Q = (W + $).length - V.join(`
`).length;
        f.current = {
          start: Math.max(I, T - (K[0].length - V[0].length)),
          end: N - Q
        }, t(G);
      } else if (T === N) {
        const O = A.substring(0, T) + "  " + A.substring(N);
        f.current = { start: T + 2, end: T + 2 }, t(O);
      } else {
        const O = A.substring(0, T), $ = A.substring(T, N), _ = A.substring(N), I = O.lastIndexOf(`
`) + 1, R = O.substring(0, I), K = (O.substring(I) + $).split(`
`), V = K.map((Q) => "  " + Q), G = R + V.join(`
`) + _;
        f.current = {
          start: T + 2,
          end: N + K.length * 2
        }, t(G);
      }
  }, [t, c]);
  return /* @__PURE__ */ L("div", { ref: d, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: u,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: w || `<span class="md-placeholder">${Bt(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ m(
      "textarea",
      {
        ref: l,
        value: e,
        onChange: k,
        onKeyDown: D,
        onScroll: x,
        placeholder: "",
        disabled: !r,
        className: "syntax-textarea",
        spellCheck: !1
      }
    )
  ] });
}
let Vi = 0, Ts = 0, Ku = 0;
function Ok(e) {
  Ts++, Ku = e;
}
const _k = vn(function({
  visible: t,
  onClose: n,
  editor: r
}) {
  const [o, s] = Y(!1), [i, a] = Y({
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
  }), c = j([]), l = j(performance.now()), u = j(0), d = j(0), f = j(0), p = j(0), [h, g] = Y(new Array(60).fill(0)), [y, v] = Y(new Array(60).fill(0));
  q(() => {
    if (!t || !r) return;
    const D = () => {
      const C = performance.now();
      queueMicrotask(() => {
        const M = performance.now() - C;
        Ok(M);
      });
    };
    return r.on("transaction", D), () => {
      r.off("transaction", D);
    };
  }, [t, r]), q(() => {
    if (!t) return;
    let D = 0, C = performance.now(), M = 0;
    const T = (N) => {
      const A = N - l.current;
      if (l.current = N, c.current.push({ time: N, duration: A }), c.current.length > 120 && (c.current = c.current.slice(-120)), A > 16.67 && d.current++, D++, N - C >= 1e3) {
        M = D, D = 0, C = N;
        const P = c.current.slice(-60), O = P.length > 0 ? P.reduce((V, G) => V + G.duration, 0) / P.length : 0, $ = P.length > 0 ? Math.max(...P.map((V) => V.duration)) : 0, _ = performance.memory, U = _ ? _.usedJSHeapSize / (1024 * 1024) : 0, I = _ ? _.jsHeapSizeLimit / (1024 * 1024) : 0, R = document.querySelectorAll("*").length, W = Vi - f.current, K = Ts - p.current;
        f.current = Vi, p.current = Ts, a({
          fps: M,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round($ * 100) / 100,
          memoryUsed: Math.round(U * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: W,
          transactionCount: K,
          lastTransactionTime: Math.round(Ku * 100) / 100,
          domNodes: R,
          longFrames: d.current
        }), g((V) => [...V.slice(1), M]), v((V) => [...V.slice(1), O]), d.current = 0;
      }
      u.current = requestAnimationFrame(T);
    };
    return u.current = requestAnimationFrame(T), () => {
      cancelAnimationFrame(u.current);
    };
  }, [t]);
  const b = B(() => {
    n?.();
  }, [n]), w = B(() => {
    s((D) => !D);
  }, []);
  if (!t) return null;
  const S = (D) => D >= 55 ? "#4ade80" : D >= 30 ? "#fbbf24" : "#f87171", x = (D) => D <= 16.67 ? "#4ade80" : D <= 33.33 ? "#fbbf24" : "#f87171", k = (D, C, M) => {
    const A = D.map((P, O) => {
      const $ = O / (D.length - 1) * 120, _ = 24 - Math.min(P, C) / C * 24;
      return `${$},${_}`;
    }).join(" ");
    return /* @__PURE__ */ m("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ m(
      "polyline",
      {
        points: A,
        fill: "none",
        stroke: M,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }
    ) });
  };
  return /* @__PURE__ */ L("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ L("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ L("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ m(Jd, { size: 14 }),
        /* @__PURE__ */ m("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ L("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ m("button", { onClick: w, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ m(mc, { size: 12 }) : /* @__PURE__ */ m(pc, { size: 12 }) }),
        /* @__PURE__ */ m("button", { onClick: b, title: "Close profiler", children: /* @__PURE__ */ m(ht, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ L("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ L("div", { className: "perf-section", children: [
        /* @__PURE__ */ L("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: S(i.fps) }, children: i.fps })
        ] }),
        k(h, 70, S(i.fps))
      ] }),
      /* @__PURE__ */ L("div", { className: "perf-section", children: [
        /* @__PURE__ */ L("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Frame Time" }),
          /* @__PURE__ */ L("span", { className: "perf-value", style: { color: x(i.frameTime) }, children: [
            i.frameTime,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ L("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Max" }),
          /* @__PURE__ */ L("span", { className: "perf-value-sub", style: { color: x(i.frameTimeMax) }, children: [
            i.frameTimeMax,
            "ms"
          ] })
        ] }),
        /* @__PURE__ */ L("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ L("span", { className: "perf-label-sub", children: [
            "Jank (",
            ">",
            " 16.7ms)"
          ] }),
          /* @__PURE__ */ L("span", { className: "perf-value-sub", style: { color: i.longFrames > 3 ? "#f87171" : "#4ade80" }, children: [
            i.longFrames,
            "/s"
          ] })
        ] }),
        k(y, 50, x(i.frameTime))
      ] }),
      /* @__PURE__ */ L("div", { className: "perf-section", children: [
        /* @__PURE__ */ L("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Renders/s" }),
          /* @__PURE__ */ m("span", { className: "perf-value", children: i.renderCount })
        ] }),
        /* @__PURE__ */ L("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Transactions/s" }),
          /* @__PURE__ */ m("span", { className: "perf-value", children: i.transactionCount })
        ] }),
        /* @__PURE__ */ L("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Last TX time" }),
          /* @__PURE__ */ L("span", { className: "perf-value-sub", children: [
            i.lastTransactionTime,
            "ms"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ L("div", { className: "perf-section", children: [
        /* @__PURE__ */ L("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "DOM Nodes" }),
          /* @__PURE__ */ m("span", { className: "perf-value", children: i.domNodes.toLocaleString() })
        ] }),
        i.memoryTotal > 0 && /* @__PURE__ */ L("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Memory" }),
          /* @__PURE__ */ L("span", { className: "perf-value", children: [
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
class $k extends Ad {
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
      return /* @__PURE__ */ m("div", { className: oe("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ L("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ m("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ m(ef, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ L("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ m("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ m("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ L("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ L(
            Dt,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ m(Us, { className: "w-4 h-4" }),
                "Retry ",
                r > 0 && `(${r})`
              ]
            }
          ),
          s && this.props.onClearContent && /* @__PURE__ */ L(
            Dt,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ m(sn, { className: "w-4 h-4" }),
                "Clear Content & Retry"
              ]
            }
          )
        ] }),
        t && /* @__PURE__ */ L("div", { className: "w-full max-w-xs", children: [
          /* @__PURE__ */ L(
            "button",
            {
              onClick: this.toggleDetails,
              className: oe(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ m(Nt, { className: "w-3 h-3" }) : /* @__PURE__ */ m(uc, { className: "w-3 h-3" }),
                "Error details"
              ]
            }
          ),
          n && /* @__PURE__ */ L("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ L("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ m("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }),
              /* @__PURE__ */ m(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: o ? /* @__PURE__ */ L(xe, { children: [
                    /* @__PURE__ */ m(tf, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ m("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ L(xe, { children: [
                    /* @__PURE__ */ m(bn, { className: "w-3 h-3" }),
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
function Hk({ className: e = "", theme: t }) {
  const n = (r) => ({
    height: "1rem",
    width: r,
    borderRadius: "0.25rem",
    background: "var(--color-muted, #e5e7eb)",
    opacity: 0.5,
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
  });
  return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${e}`, "data-theme": t, children: /* @__PURE__ */ L(
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
function Wk({ editorMode: e, onModeSwitch: t }) {
  return /* @__PURE__ */ L("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
    /* @__PURE__ */ m(
      "button",
      {
        onClick: () => t("wysiwyg"),
        className: `editor-mode-toggle-btn ${e === "wysiwyg" ? "active" : ""}`,
        title: "Visual Editor",
        children: /* @__PURE__ */ m(nf, {})
      }
    ),
    /* @__PURE__ */ m(
      "button",
      {
        onClick: () => t("markdown"),
        className: `editor-mode-toggle-btn ${e === "markdown" ? "active" : ""}`,
        title: "Raw Markdown",
        children: /* @__PURE__ */ m(Ys, {})
      }
    )
  ] });
}
const Ue = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ m(
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
), Ki = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), Gi = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], zk = vn(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [c, l] = Y(!1), u = j(null), d = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", f = Gi.find((h) => h.value === d)?.shortLabel || "P";
  q(() => {
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
  return /* @__PURE__ */ L("div", { ref: u, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ L(
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
          /* @__PURE__ */ m(Nt, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${c ? "rotate-180" : ""}` })
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
        children: Gi.map((h) => {
          const g = h.value === d;
          return /* @__PURE__ */ L(
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
}), Bk = vn(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s }) {
  const i = j(null), a = tc({
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
  }), [c, l] = Y(!1), [u, d] = Y(""), [f, p] = Y(!1), [h, g] = Y({ top: 0, left: 0 }), y = j(null), v = j(null), b = j(null), w = B(() => {
    if (u) {
      let M = u.trim();
      !/^https?:\/\//i.test(M) && !M.startsWith("mailto:") && (M = "https://" + M), t.chain().focus().extendMarkRange("link").setLink({ href: M }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    l(!1), d("");
  }, [t, u]), S = (M) => {
    M.preventDefault(), M.stopPropagation();
    const T = t.getAttributes("link").href;
    d(T || ""), l(!0);
  }, x = B((M, T) => {
    M.preventDefault(), M.stopPropagation(), T();
  }, []);
  q(() => {
    if (!t || t.isDestroyed) return;
    const M = () => {
      if (!t.isDestroyed)
        try {
          const { selection: T } = t.state, { empty: N, from: A, to: P } = T, _ = ("node" in T && T.node ? T.node : null)?.type?.name === "resizableImage";
          if (N || _ || t.isActive("codeBlock")) {
            b.current && (clearTimeout(b.current), b.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              p(!1), l(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const U = t.view.coordsAtPos(A), I = t.view.coordsAtPos(P), R = y.current?.offsetWidth || 500, W = y.current?.offsetHeight || 40, K = 8, V = window.innerWidth;
          let G = 0, Q = 0;
          if (y.current) {
            const le = y.current.closest('[data-slot="dialog-content"]');
            if (le) {
              const ue = le.getBoundingClientRect();
              G = ue.left, Q = ue.top;
            }
          }
          let H = (U.left + I.left) / 2 - R / 2 - G;
          const F = G ? V - G : V;
          H = Math.max(K, Math.min(F - R - K, H));
          let Z = U.top - W - 10 - Q;
          Z < K && (Z = I.bottom + 10 - Q), f ? g({ top: Math.max(K, Z), left: H }) : (b.current && clearTimeout(b.current), b.current = setTimeout(() => {
            g({ top: Math.max(K, Z), left: H }), p(!0);
          }, 50));
        } catch (T) {
          console.warn("FloatingToolbar: Error updating position", T);
        }
    };
    return t.on("selectionUpdate", M), () => {
      t.off("selectionUpdate", M), v.current && clearTimeout(v.current), b.current && clearTimeout(b.current);
    };
  }, [t, f]), q(() => {
    if (!f || !t || t.isDestroyed) return;
    const M = t.view.dom.closest(".editor-content") || t.view.dom.parentElement;
    if (!M) return;
    const T = () => {
      p(!1), l(!1);
    };
    return M.addEventListener("scroll", T, { passive: !0 }), window.addEventListener("scroll", T, { passive: !0 }), () => {
      M.removeEventListener("scroll", T), window.removeEventListener("scroll", T);
    };
  }, [f, t]);
  const k = (M) => {
    v.current && (clearTimeout(v.current), v.current = null);
  };
  if (!f || r)
    return null;
  const D = 15, C = c ? /* @__PURE__ */ m(
    "div",
    {
      ref: y,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: h.top,
        left: h.left
      },
      onMouseDown: k,
      children: /* @__PURE__ */ L("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ m(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: u,
            onChange: (M) => d(M.target.value),
            onKeyDown: (M) => {
              M.key === "Enter" && (M.preventDefault(), w()), M.key === "Escape" && (l(!1), d(""));
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
        /* @__PURE__ */ L("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (M) => {
                M.preventDefault(), w();
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
                M.preventDefault(), l(!1), d("");
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
  ) : /* @__PURE__ */ L(
    "div",
    {
      ref: y,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: h.top,
        left: h.left
      },
      onMouseDown: k,
      children: [
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (M) => x(M, () => t.chain().focus().toggleBold().run()),
            isActive: a?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(Ls, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (M) => x(M, () => t.chain().focus().toggleItalic().run()),
            isActive: a?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m(Rs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (M) => x(M, () => t.chain().focus().toggleUnderline().run()),
            isActive: a?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(Is, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (M) => x(M, () => t.chain().focus().toggleStrike().run()),
            isActive: a?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(Ps, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (M) => x(M, () => t.chain().focus().toggleCode().run()),
            isActive: a?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(oc, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (M) => x(M, () => t.chain().focus().toggleHighlight().run()),
            isActive: a?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ m(sc, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: S,
            isActive: a?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ m(Os, { size: D })
          }
        ),
        /* @__PURE__ */ m(Ki, {}),
        /* @__PURE__ */ m(
          zk,
          {
            editor: t,
            isH1: a?.isH1 ?? !1,
            isH2: a?.isH2 ?? !1,
            isH3: a?.isH3 ?? !1,
            isH4: a?.isH4 ?? !1,
            isH5: a?.isH5 ?? !1,
            executeCommand: x
          }
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (M) => x(M, () => t.chain().focus().toggleBlockquote().run()),
            isActive: a?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(Ws, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (M) => x(M, () => t.chain().focus().toggleBulletList().run()),
            isActive: a?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(_s, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (M) => x(M, () => t.chain().focus().toggleOrderedList().run()),
            isActive: a?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m($s, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (M) => x(M, () => t.chain().focus().toggleTaskList().run()),
            isActive: a?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m(Hs, { size: D })
          }
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (M) => x(M, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: a?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(rf, { size: D })
          }
        ),
        o && /* @__PURE__ */ L(xe, { children: [
          /* @__PURE__ */ m(Ki, {}),
          /* @__PURE__ */ m(
            "button",
            {
              ref: i,
              onMouseDown: (M) => {
                M.preventDefault(), M.stopPropagation(), i.current && s?.(i.current);
              },
              title: "AI Writing Assistant",
              className: `
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            `,
              children: /* @__PURE__ */ m(ao, { size: D })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(bt, { onMouseDown: k, children: C });
});
function Fk({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = Y(""), s = j(null), i = j(null), [a, c] = Y({ top: 0, left: 0 });
  q(() => {
    if (t) {
      const h = e.getAttributes("link").href || "";
      o(h);
      try {
        const { view: g } = e, { from: y } = g.state.selection, v = g.coordsAtPos(y), b = v.bottom + 8, w = Math.max(16, Math.min(v.left, window.innerWidth - 420));
        c({ top: b, left: w });
      } catch {
        c({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), q(() => {
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
      children: /* @__PURE__ */ L("form", { onSubmit: l, className: "link-popover-form", children: [
        /* @__PURE__ */ L("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ m(As, { className: "link-popover-icon", size: 16 }),
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
function Uk({ editor: e, onEditLink: t }) {
  const [n, r] = Y({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = j(null), s = j(null), i = B((w) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const S = w.getAttribute("href") || "", x = w.getBoundingClientRect(), k = x.bottom + 8, D = Math.max(16, Math.min(x.left, window.innerWidth - 340));
        r({
          isVisible: !0,
          url: S,
          position: { top: k, left: D },
          linkElement: w
        });
      } catch (S) {
        console.warn("LinkHoverTooltip: Error showing tooltip", S);
      }
    }
  }, [e]), a = B(() => {
    s.current = setTimeout(() => {
      r((w) => ({ ...w, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), c = B(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  q(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const S = (k) => {
      const C = k.target.closest("a");
      C && w.contains(C) && i(C);
    }, x = (k) => {
      const D = k.target, C = k.relatedTarget;
      if (D.closest("a")) {
        if (C && o.current?.contains(C))
          return;
        a();
      }
    };
    return w.addEventListener("mouseover", S), w.addEventListener("mouseout", x), () => {
      w.removeEventListener("mouseover", S), w.removeEventListener("mouseout", x), s.current && clearTimeout(s.current);
    };
  }, [e, i, a]), q(() => {
    if (!n.isVisible) return;
    const w = () => {
      r((x) => ({ ...x, isVisible: !1, linkElement: null }));
    }, S = e.view.dom.closest(".editor-content-wrapper");
    return S?.addEventListener("scroll", w), window.addEventListener("scroll", w, !0), () => {
      S?.removeEventListener("scroll", w), window.removeEventListener("scroll", w, !0);
    };
  }, [n.isVisible, e]);
  const [l, u] = Y(!1), d = B(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      u(!0), setTimeout(() => u(!1), 1500);
    });
  }, [n.url]), f = B(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), p = B(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: S } = w.state;
      let x = null, k = null;
      S.descendants((D, C) => {
        if (D.isText && D.marks.some((M) => M.type.name === "link")) {
          const M = w.nodeDOM(C);
          if (M && (M === n.linkElement || M.parentElement === n.linkElement))
            return x = C, k = C + D.nodeSize, !1;
        }
        return !0;
      }), x !== null && k !== null ? e.chain().focus().setTextSelection({ from: x, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((w) => ({ ...w, isVisible: !1 }));
  }, [e, n.linkElement]), h = B(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: S } = w.state;
      S.descendants((x, k) => {
        if (x.isText && x.marks.some((D) => D.type.name === "link")) {
          const D = w.nodeDOM(k);
          if (D && (D === n.linkElement || D.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: k, to: k + x.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    r((w) => ({ ...w, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const g = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, v = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", b = /* @__PURE__ */ m(
    "div",
    {
      ref: o,
      className: "link-hover-tooltip",
      "data-theme": v,
      style: {
        position: "fixed",
        top: `${n.position.top}px`,
        left: `${n.position.left}px`
      },
      onMouseEnter: c,
      onMouseLeave: a,
      children: /* @__PURE__ */ L("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ L(
          "button",
          {
            onClick: f,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ m(of, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ m("span", { className: "link-hover-tooltip-url", children: g || "No URL" })
            ]
          }
        ),
        /* @__PURE__ */ L("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ m(sf, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: d,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: l ? /* @__PURE__ */ m(wn, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ m(bn, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ m(af, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ m(bt, { children: b });
}
const Yk = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(so, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(cf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(lf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(uf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(df, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(ff, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ m(_s, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ m($s, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ m(Hs, { size: 16 }),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ m(Ws, { size: 16 }),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ m(ac, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ m(ss, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ m(Ns, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ m(ic, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ m(jr, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ m(lc, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ m(cc, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ m(zs, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ m(Bs, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ m(dc, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ m(As, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], jk = 32, Vk = 8, Kk = 320, Gk = 210, Hr = 12;
function qi(e) {
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
function qk({ editor: e }) {
  const [t, n] = Y(!1), [r, o] = Y(""), [s, i] = Y(0), [a, c] = Y(null), [l, u] = Y(!1), [d, f] = Y({ top: 0, left: 0 }), [p, h] = Y("below"), g = j(null), y = j(-1), v = j(!1);
  q(() => {
    v.current = t;
  }, [t]);
  const b = Yk.filter((M) => {
    if (!r) return !0;
    const T = r.toLowerCase();
    return M.title.toLowerCase().includes(T) || M.keywords?.some((N) => N.includes(T));
  }), w = Math.min(
    b.length * jk + Vk,
    Kk
  );
  oo(() => {
    if (!t || !a) return;
    const { top: M, bottom: T, left: N } = a, A = window.innerHeight, P = window.innerWidth, O = A - T - Hr, $ = M - Hr;
    let _;
    if (O >= w ? _ = "below" : $ >= w ? _ = "above" : _ = O >= $ ? "below" : "above", h(_), g.current) {
      const U = Math.max(
        Hr,
        Math.min(N, P - Gk - Hr)
      ), I = _ === "below" ? T + 4 : M - w - 4;
      g.current.style.top = `${I}px`, g.current.style.left = `${U}px`;
    }
  }, [t, a, w, b.length]);
  const S = B(() => {
    const { state: M } = e, { selection: T } = M, N = T.from, A = y.current;
    if (A >= 0 && A <= N)
      e.chain().focus().deleteRange({ from: A, to: N }).run();
    else {
      const { $from: P } = T, $ = P.parent.textBetween(0, P.parentOffset, void 0, "￼").lastIndexOf("/");
      if ($ !== -1) {
        const _ = P.pos - (P.parentOffset - $);
        e.chain().focus().deleteRange({ from: _, to: P.pos }).run();
      }
    }
  }, [e]), x = B(() => {
    n(!1), o(""), i(0), y.current = -1, c(null);
  }, []), k = B((M) => {
    const T = b[M];
    if (T) {
      if (S(), T.isImageCommand) {
        const { state: N } = e, A = e.view.coordsAtPos(N.selection.from);
        f({
          top: A.bottom + 8,
          left: A.left
        }), u(!0);
      } else
        T.command(e);
      x();
    }
  }, [e, b, S, x]), D = B((M, T) => {
    e.chain().focus().setImage({ src: M, alt: T }).run();
  }, [e]);
  return q(() => {
    if (!e) return;
    const M = () => {
      if (v.current) return;
      const { state: T } = e, { selection: N } = T, { $from: A } = N;
      if (A.parentOffset === 0) return;
      const P = A.parent.textBetween(0, A.parentOffset, void 0, "￼");
      if (!P.endsWith("/")) return;
      const O = P.length > 1 ? P.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = A.pos - 1;
      const $ = qi(e);
      $ && (c($), n(!0), o(""), i(0));
    };
    return e.on("update", M), () => {
      e.off("update", M);
    };
  }, [e]), q(() => {
    if (!e || !t) return;
    const M = e.view.dom, T = (N) => {
      v.current && (N.key === "ArrowDown" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A + 1) % b.length)) : N.key === "ArrowUp" ? (N.preventDefault(), N.stopPropagation(), i((A) => (A - 1 + b.length) % b.length)) : N.key === "Enter" ? (N.preventDefault(), N.stopPropagation(), k(s)) : N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), x()));
    };
    return M.addEventListener("keydown", T, !0), () => {
      M.removeEventListener("keydown", T, !0);
    };
  }, [e, t, s, b, k, x]), q(() => {
    if (!e || !t) return;
    const M = () => {
      if (!v.current || y.current < 0) return;
      const { state: T } = e, { selection: N } = T, A = N.from, P = y.current;
      if (A <= P) {
        x();
        return;
      }
      try {
        const O = T.doc.textBetween(P + 1, A, void 0, "￼");
        if (O.includes(`
`)) {
          x();
          return;
        }
        o(O), i(0);
        const $ = qi(e);
        $ && c($);
      } catch {
        x();
      }
    };
    return e.on("update", M), e.on("selectionUpdate", M), () => {
      e.off("update", M), e.off("selectionUpdate", M);
    };
  }, [e, t, x]), q(() => {
    if (!t) return;
    const M = (T) => {
      g.current && !g.current.contains(T.target) && x();
    };
    return document.addEventListener("mousedown", M), () => document.removeEventListener("mousedown", M);
  }, [t, x]), q(() => {
    t && b.length === 0 && r.length > 2 && x();
  }, [t, b.length, r, x]), q(() => {
    s >= b.length && i(Math.max(0, b.length - 1));
  }, [b.length, s]), q(() => {
    if (!t || !g.current) return;
    const M = g.current.querySelector(".slash-item.is-selected");
    M && M.scrollIntoView({ block: "nearest" });
  }, [t, s]), l ? /* @__PURE__ */ m(
    bc,
    {
      isOpen: l,
      onClose: () => u(!1),
      onInsert: D,
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
      children: b.map((M, T) => /* @__PURE__ */ L(
        "div",
        {
          className: `slash-item ${T === s ? "is-selected" : ""}`,
          onClick: (N) => {
            N.preventDefault(), N.stopPropagation(), k(T);
          },
          onMouseEnter: () => i(T),
          children: [
            /* @__PURE__ */ m("span", { className: "slash-icon", children: M.icon }),
            /* @__PURE__ */ m("span", { className: "slash-label", children: M.title })
          ]
        },
        M.title
      ))
    }
  ) });
}
const Xk = 340, Zk = 36, Qk = 8, Jk = 240, Wr = 8;
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
function e1({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = Y(!1), [s, i] = Y(""), [a, c] = Y([]), [l, u] = Y(0), [d, f] = Y(null), [p, h] = Y("below"), [g, y] = Y(!1), v = j(!1), b = j(null), w = j(-1), S = j(null);
  q(() => {
    v.current = r;
  }, [r]);
  const x = B(() => {
    o(!1), i(""), c([]), u(0), w.current = -1;
  }, []), k = B((N) => {
    const A = w.current;
    if (A < 0) return;
    const { state: P } = e, O = P.selection.from;
    try {
      const $ = P.tr.delete(A, O), _ = P.schema.marks.wikiLink;
      if (_) {
        const U = _.create({ pageName: N }), I = P.schema.text(N, [U]);
        $.insert(A, I);
        const R = A + N.length;
        $.setSelection(nt.create($.doc, R)), $.removeStoredMark(_);
      } else
        $.insertText(`[[${N}]]`, A);
      e.view.dispatch($), e.view.focus();
    } catch ($) {
      console.warn("WikiLinkAutocomplete: Error inserting link", $);
    }
    x();
  }, [e, x]);
  q(() => {
    if (!e) return;
    const N = () => {
      if (v.current) return;
      const { state: A } = e, { selection: P } = A, { $from: O } = P;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      w.current = O.pos - 2;
      const _ = Xi(e);
      _ && (f(_), o(!0), i(""), c([]), u(0));
    };
    return e.on("update", N), () => {
      e.off("update", N);
    };
  }, [e]), q(() => {
    if (!e || !r) return;
    const N = e.view.dom, A = (P) => {
      if (v.current) {
        if (P.key === "ArrowDown") {
          P.preventDefault();
          const O = a.length + (s.trim() ? 1 : 0) - 1;
          u(($) => Math.min($ + 1, O));
          return;
        }
        if (P.key === "ArrowUp") {
          P.preventDefault(), u((O) => Math.max(O - 1, 0));
          return;
        }
        if (P.key === "Enter" || P.key === "Tab") {
          P.preventDefault(), P.stopPropagation(), l < a.length ? k(a[l].title) : s.trim() && n ? (n(s.trim()), x()) : s.trim() && k(s.trim());
          return;
        }
        if (P.key === "Escape") {
          P.preventDefault(), x();
          return;
        }
        P.key === "]" && setTimeout(() => {
          const { state: O } = e, { $from: $ } = O.selection;
          $.parent.textBetween(0, $.parentOffset, void 0, "￼").endsWith("]]") && x();
        }, 0);
      }
    };
    return N.addEventListener("keydown", A, !0), () => {
      N.removeEventListener("keydown", A, !0);
    };
  }, [e, r, a, l, s, k, x, n]), q(() => {
    if (!e || !r) return;
    const N = () => {
      const A = w.current;
      if (A < 0) {
        x();
        return;
      }
      const { state: P } = e, O = P.selection.from;
      if (O <= A) {
        x();
        return;
      }
      try {
        const $ = P.doc.textBetween(A + 2, O, void 0, "￼");
        if ($.includes(`
`) || $.includes("]]")) {
          x();
          return;
        }
        i($), u(0);
        const _ = Xi(e);
        _ && f(_);
      } catch {
        x();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, r, x]), q(() => {
    if (r) {
      if (S.current && clearTimeout(S.current), !s.trim()) {
        y(!0), S.current = setTimeout(async () => {
          try {
            const N = await t("");
            c(N);
          } catch {
            c([]);
          }
          y(!1);
        }, 100);
        return;
      }
      return y(!0), S.current = setTimeout(async () => {
        try {
          const N = await t(s.trim());
          c(N);
        } catch {
          c([]);
        }
        y(!1);
      }, 150), () => {
        S.current && clearTimeout(S.current);
      };
    }
  }, [r, s, t]), q(() => {
    if (!r) return;
    const N = (A) => {
      b.current && !b.current.contains(A.target) && x();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [r, x]), q(() => {
    if (!r || !b.current) return;
    const N = b.current.querySelector(".wikilink-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [r, l]);
  const D = a.length + (s.trim() ? 1 : 0), C = Math.min(
    Math.max(D, 1) * Zk + Qk,
    Jk
  );
  if (oo(() => {
    if (!r || !d) return;
    const { top: N, bottom: A, left: P } = d, O = window.innerHeight, $ = window.innerWidth, _ = O - A - Wr, U = N - Wr;
    let I;
    if (_ >= C ? I = "below" : U >= C ? I = "above" : I = _ >= U ? "below" : "above", h(I), b.current) {
      const R = Math.max(
        Wr,
        Math.min(P, $ - Xk - Wr)
      ), W = I === "below" ? A + 4 : N - C - 4;
      b.current.style.top = `${W}px`, b.current.style.left = `${R}px`;
    }
  }, [r, d, C, D]), !r) return null;
  const M = s.trim() && !a.some((N) => N.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ m(bt, { children: /* @__PURE__ */ L(
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
        a.map((N, A) => /* @__PURE__ */ L(
          "div",
          {
            className: `wikilink-item ${A === l ? "is-selected" : ""}`,
            onMouseDown: (P) => {
              P.preventDefault(), k(N.title);
            },
            onMouseEnter: () => u(A),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Ys, { size: 14 }) }),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: N.title }),
              /* @__PURE__ */ m("span", { className: "wikilink-type", children: N.type })
            ]
          },
          N.id
        )),
        M && /* @__PURE__ */ L(
          "div",
          {
            className: `wikilink-item wikilink-create ${a.length === l ? "is-selected" : ""}`,
            onMouseDown: (N) => {
              N.preventDefault(), n ? (n(s.trim()), x()) : k(s.trim());
            },
            onMouseEnter: () => u(a.length),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Fs, { size: 14 }) }),
              /* @__PURE__ */ L("span", { className: "wikilink-label", children: [
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
function t1({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = Y(e), [c, l] = Y(t), u = j(null), d = j(null);
  q(() => {
    d.current?.focus(), d.current?.select();
  }, []), q(() => {
    const y = (b) => {
      u.current && !u.current.contains(b.target) && s();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 100);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", y);
    };
  }, [s]), q(() => {
    const y = (v) => {
      v.key === "Escape" ? s() : v.key === "Enter" && (v.metaKey || v.ctrlKey) && f();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [i, c, s]);
  const f = () => {
    i.trim() && r(i.trim(), c.trim());
  }, h = (() => {
    let w = n.x - 160, S = n.y + 10;
    return w + 320 > window.innerWidth - 16 && (w = window.innerWidth - 320 - 16), w < 16 && (w = 16), S + 280 > window.innerHeight - 16 && (S = n.y - 280 - 10), S < 16 && (S = 16), { left: w, top: S };
  })(), g = /* @__PURE__ */ L(
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
        /* @__PURE__ */ L("div", { className: "image-edit-popover-header", children: [
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
        /* @__PURE__ */ L("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ L("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ L("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(Os, { className: "w-3.5 h-3.5" }),
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
          /* @__PURE__ */ L("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ L("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(so, { className: "w-3.5 h-3.5" }),
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
        /* @__PURE__ */ L("div", { className: "image-edit-popover-footer", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: o,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ m(sn, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ L("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ m(
              "button",
              {
                onClick: s,
                className: "image-edit-popover-btn image-edit-popover-btn-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ L(
              "button",
              {
                onClick: f,
                className: "image-edit-popover-btn image-edit-popover-btn-save",
                disabled: !i.trim(),
                children: [
                  /* @__PURE__ */ m(wn, { className: "w-4 h-4" }),
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
function n1({ containerRef: e, enabled: t = !0 }) {
  const [n, r] = Y(!1), [o, s] = Y(0), i = B((u) => {
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
  return q(() => {
    if (!t || !e.current) return;
    const u = e.current;
    return u.addEventListener("dragenter", i), u.addEventListener("dragleave", a), u.addEventListener("dragover", c), u.addEventListener("drop", l), () => {
      u.removeEventListener("dragenter", i), u.removeEventListener("dragleave", a), u.removeEventListener("dragover", c), u.removeEventListener("drop", l);
    };
  }, [t, e, i, a, c, l]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ L("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(mf, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ L("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ m("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ m("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
const r1 = {
  SpellCheck: hf,
  RefreshCw: pf,
  Minimize2: pc,
  Maximize2: mc,
  FileText: Ys,
  MessageSquare: hc,
  Sparkles: ao
};
function o1({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = Y(""), [a, c] = Y(!1), l = j(null), u = j(null), d = e.filter((y) => y.scope === t || y.scope === "both");
  q(() => {
    const y = (b) => {
      l.current && !l.current.contains(b.target) && r();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 50);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", y);
    };
  }, [r]), q(() => {
    const y = (v) => {
      v.key === "Escape" && r();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [r]), q(() => {
    a && u.current && u.current.focus();
  }, [a]);
  const p = B(() => {
    const v = d.length * 40 + (a ? 56 : 0) + 16, b = window.innerWidth, w = window.innerHeight;
    let S = o.top, x = o.left;
    return x + 260 > b - 8 && (x = b - 260 - 8), x < 8 && (x = 8), S + v > w - 8 && (S = o.top - v - 8), S < 8 && (S = 8), { top: S, left: x };
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
      children: /* @__PURE__ */ L(
        "div",
        {
          className: `
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-lg overflow-hidden
          w-[260px] py-1
          animate-in fade-in-0 zoom-in-95 duration-100
        `,
          children: [
            /* @__PURE__ */ m("div", { className: "px-2 py-1.5", children: /* @__PURE__ */ L("div", { className: "flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50", children: [
              /* @__PURE__ */ m(hc, { size: 14, className: "text-muted-foreground shrink-0" }),
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
              const v = y.icon ? r1[y.icon] : ao;
              return /* @__PURE__ */ L(
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
function s1({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = j(null), a = j(null), [c, l] = Y(!1), [u, d] = Y(0);
  q(() => {
    if (i.current) {
      const x = new ResizeObserver((k) => {
        for (const D of k)
          d(D.contentRect.height);
      });
      return x.observe(i.current), () => x.disconnect();
    }
  }, []), q(() => {
    a.current && e.status === "streaming" && (a.current.scrollTop = a.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), q(() => {
    const x = (k) => {
      k.key === "Escape" && s();
    };
    return document.addEventListener("keydown", x), () => document.removeEventListener("keydown", x);
  }, [s]);
  const f = Ft(() => {
    const C = window.innerWidth, M = window.innerHeight;
    let T = t.selectionCenterX - 380 / 2;
    T + 380 > C - 8 && (T = C - 380 - 8), T < 8 && (T = 8);
    const N = M - t.selectionBottom - 8, A = t.selectionTop - 8, P = u || 200;
    let O, $ = !1;
    return N >= P || N >= A ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - P, $ = !0), O < 8 && (O = 8), O + P > M - 8 && (O = M - P - 8), { top: O, left: T, placedAbove: $ };
  }, [t, u]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", h = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", g = e.status === "streaming", y = e.status === "complete", v = e.status === "error", b = B(() => {
    navigator.clipboard.writeText(p), l(!0), setTimeout(() => l(!1), 1500);
  }, [p]);
  if (e.status === "idle") return null;
  const w = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", S = /* @__PURE__ */ m(
    "div",
    {
      ref: i,
      className: "ai-result-popover",
      style: {
        position: "fixed",
        top: f.top,
        left: f.left
      },
      children: /* @__PURE__ */ L(
        "div",
        {
          className: `
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-xl overflow-hidden
          w-[380px] max-w-[calc(100vw-16px)]
          ${w}
        `,
          children: [
            /* @__PURE__ */ L("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30", children: [
              /* @__PURE__ */ L("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                g && /* @__PURE__ */ m(fc, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ m("span", { className: "font-medium", children: v ? "Error" : h }),
                g && /* @__PURE__ */ m("span", { className: "opacity-60", children: "Generating…" })
              ] }),
              /* @__PURE__ */ m(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (x) => {
                    x.preventDefault(), s();
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
                children: v ? /* @__PURE__ */ m("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ L("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  g && /* @__PURE__ */ m("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ L("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || v) && /* @__PURE__ */ L(xe, { children: [
                y && /* @__PURE__ */ L(xe, { children: [
                  /* @__PURE__ */ m(
                    rn,
                    {
                      icon: as,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ m(
                    rn,
                    {
                      icon: Fs,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ m(
                    rn,
                    {
                      icon: c ? wn : bn,
                      label: c ? "Copied" : "Copy",
                      onClick: b
                    }
                  )
                ] }),
                /* @__PURE__ */ m(
                  rn,
                  {
                    icon: Us,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  rn,
                  {
                    icon: ht,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              g && /* @__PURE__ */ L(xe, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  rn,
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
  return /* @__PURE__ */ m(bt, { onMouseDown: (x) => x.preventDefault(), children: S });
}
function rn({
  icon: e,
  label: t,
  onClick: n,
  primary: r = !1
}) {
  return /* @__PURE__ */ L(
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
function a1({
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
  aiDropdown: u,
  aiActions: d,
  onAIActionSelect: f,
  onAIDropdownClose: p,
  aiState: h,
  aiPopoverPosition: g,
  onAIReplace: y,
  onAIInsert: v,
  onAIRetry: b,
  onAIDiscard: w,
  onLinkPopoverClose: S,
  onEditLink: x,
  onWikiLinkSearch: k,
  imageEditState: D,
  onImageSave: C,
  onImageDelete: M,
  onImageEditClose: T
}) {
  return /* @__PURE__ */ L(xe, { children: [
    !n.images && !n.dragAndDrop && /* @__PURE__ */ m(n1, { containerRef: r, enabled: o }),
    !t && s && /* @__PURE__ */ m(
      Bk,
      {
        editor: e,
        suppressWhenLinkPopoverOpen: i,
        aiEnabled: a || !!c,
        onAISparklesClick: (N) => l(N)
      }
    ),
    u && d && /* @__PURE__ */ m(
      o1,
      {
        actions: d,
        scope: u.scope,
        position: u.position,
        onAction: f,
        onClose: p
      }
    ),
    h.status !== "idle" && /* @__PURE__ */ m(
      s1,
      {
        state: h,
        position: g,
        onReplace: y,
        onInsert: v,
        onRetry: b,
        onDiscard: w
      }
    ),
    !n.slashCommands && /* @__PURE__ */ m(qk, { editor: e, disabledFeatures: n }),
    !n.wikiLinks && k && /* @__PURE__ */ m(e1, { editor: e, onSearch: k }),
    /* @__PURE__ */ m(
      Fk,
      {
        editor: e,
        isOpen: i,
        onClose: S
      }
    ),
    !t && /* @__PURE__ */ m(Uk, { editor: e, onEditLink: x }),
    !n.images && D?.isOpen && /* @__PURE__ */ m(
      t1,
      {
        src: D.src,
        alt: D.alt,
        position: D.position,
        onSave: C,
        onDelete: M,
        onClose: T
      }
    )
  ] });
}
function i1({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function c1(e, t) {
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
function l1(e) {
  const [t, n] = Ld(c1, { status: "idle" }), r = j(null), o = B(async (a, c, l, u, d) => {
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
const Gu = "paragon-editor-toc-width", u1 = 280, qu = 200, Xu = 500;
function Zi() {
  try {
    const e = localStorage.getItem(Gu);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= qu && t <= Xu)
        return t;
    }
  } catch {
  }
  return u1;
}
function d1(e) {
  try {
    localStorage.setItem(Gu, String(e));
  } catch {
  }
}
function f1(e, t, n) {
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
function m1(e) {
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
function Qi(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const Ji = vn(function({
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
  const [b, w] = Y([]), [S, x] = Y(null), [k, D] = Y(n), [C, M] = Y(/* @__PURE__ */ new Set()), [T, N] = Y(() => {
    if (d) {
      const H = parseInt(d, 10);
      return isNaN(H) ? Zi() : H;
    }
    return Zi();
  }), A = j(null), P = j(null), O = j(!1), $ = j(0), _ = j(0);
  q(() => {
    D(n);
  }, [n]);
  const U = B((H) => {
    H.preventDefault(), H.stopPropagation(), O.current = !0, $.current = H.clientX, _.current = T, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [T]);
  q(() => {
    const H = (Z) => {
      if (!O.current) return;
      const le = f === "right" ? $.current - Z.clientX : Z.clientX - $.current, ue = Math.min(Xu, Math.max(qu, _.current + le));
      N(ue);
    }, F = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", N((Z) => (d1(Z), Z)));
    };
    return document.addEventListener("mousemove", H), document.addEventListener("mouseup", F), () => {
      document.removeEventListener("mousemove", H), document.removeEventListener("mouseup", F);
    };
  }, [f]);
  const I = B(() => {
    if (!t || t.isDestroyed) return;
    const H = f1(t, s, i);
    w(H), S && !H.find((F) => F.id === S) && x(null);
  }, [t, s, i, S]);
  q(() => {
    if (!t) return;
    const H = () => {
      P.current && clearTimeout(P.current), P.current = setTimeout(() => I(), 300);
    };
    return I(), t.on("update", H), t.on("create", H), () => {
      t.off("update", H), t.off("create", H), P.current && clearTimeout(P.current);
    };
  }, [t, I]), q(() => {
    if (!t || !c || !k || b.length === 0) return;
    const H = v?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!H) return;
    const F = () => {
      const ue = H.getBoundingClientRect();
      let ve = null;
      for (let Se = b.length - 1; Se >= 0; Se--) {
        const Be = b[Se], wt = Qi(t, Be.pos);
        if (wt && wt.getBoundingClientRect().top - ue.top <= p + 10) {
          ve = Be.id;
          break;
        }
      }
      !ve && b.length > 0 && (ve = b[0].id), x(ve);
    };
    let Z;
    const le = () => {
      cancelAnimationFrame(Z), Z = requestAnimationFrame(F);
    };
    return H.addEventListener("scroll", le, { passive: !0 }), F(), () => {
      H.removeEventListener("scroll", le), cancelAnimationFrame(Z);
    };
  }, [t, b, c, k, p, v]);
  const R = B((H) => {
    if (!t || t.isDestroyed) return;
    const F = Qi(t, H.pos);
    if (F) {
      const Z = v?.current || t.view.dom.closest(".editor-content-wrapper");
      if (Z) {
        const le = Z.getBoundingClientRect(), ve = F.getBoundingClientRect().top - le.top + Z.scrollTop;
        Z.scrollTo({ top: ve - p, behavior: "smooth" });
      } else
        F.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(H.pos + 1);
    } catch {
    }
    x(H.id), h?.(H);
  }, [t, p, h, v]), W = B(() => {
    const H = !k;
    D(H), r?.(H);
  }, [k, r]), K = B((H) => {
    M((F) => {
      const Z = new Set(F);
      return Z.has(H) ? Z.delete(H) : Z.add(H), Z;
    });
  }, []), V = B((H, F, Z = 0) => {
    if (g)
      return g(H, F, () => R(H));
    const le = (H.level - s) * 14, ue = l && H.children && H.children.length > 0, ve = C.has(H.id);
    return /* @__PURE__ */ m(
      "div",
      {
        className: `toc-item ${F ? "toc-item-active" : ""} toc-level-${H.level}`,
        style: { paddingLeft: `${le + 10}px` },
        children: /* @__PURE__ */ L(
          "button",
          {
            className: "toc-item-button",
            onClick: () => R(H),
            title: H.text,
            children: [
              ue && /* @__PURE__ */ m(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (Se) => {
                    Se.stopPropagation(), K(H.id);
                  },
                  children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: ve ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ m("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                }
              ),
              a && /* @__PURE__ */ L("span", { className: "toc-level-indicator", children: [
                "H",
                H.level
              ] }),
              /* @__PURE__ */ m("span", { className: "toc-item-text", children: H.text })
            ]
          }
        )
      },
      H.id
    );
  }, [g, R, l, s, a, C, K]), G = B((H, F = 0) => H.map((Z) => {
    const le = S === Z.id, ue = C.has(Z.id), ve = Z.children && Z.children.length > 0;
    return /* @__PURE__ */ L("div", { children: [
      V(Z, le, F),
      ve && !ue && /* @__PURE__ */ m("div", { className: "toc-children", children: G(Z.children, F + 1) })
    ] }, Z.id);
  }), [S, C, V]), Q = B(() => b.map((H) => {
    const F = S === H.id;
    return V(H, F);
  }), [b, S, V]);
  if (!t) return null;
  const z = l ? m1(b) : [];
  return /* @__PURE__ */ L(xe, { children: [
    y && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: W,
        title: k ? "Hide Table of Contents" : "Show Table of Contents",
        children: k ? /* @__PURE__ */ m(gf, { size: 16 }) : /* @__PURE__ */ m(yf, { size: 16 })
      }
    ),
    /* @__PURE__ */ L(
      "div",
      {
        ref: A,
        className: `toc-sidebar ${k ? "toc-visible" : "toc-hidden"} toc-${f} ${u}`,
        style: { width: k ? `${T}px` : "0px" },
        children: [
          k && /* @__PURE__ */ m(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: U
            }
          ),
          /* @__PURE__ */ L("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ m("div", { className: "toc-header", children: /* @__PURE__ */ m("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ m("div", { className: "toc-content toc-content-with-toggle", children: b.length === 0 ? /* @__PURE__ */ L("div", { className: "toc-empty", children: [
              /* @__PURE__ */ m("p", { children: "No headings yet" }),
              /* @__PURE__ */ m("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ m("div", { className: "toc-list", children: l ? G(z) : Q() }) })
          ] })
        ]
      }
    )
  ] });
}), p1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, cC = Rd(function({
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
  onImageUploadStart: w,
  onImageUploadComplete: S,
  onImageUploadError: x,
  onImageUpload: k,
  resolveImageSrc: D,
  showModeToggle: C = !0,
  // New props
  initialMode: M = "wysiwyg",
  onModeChange: T,
  onReady: N,
  onFocus: A,
  onBlur: P,
  onSelectionChange: O,
  onDestroy: $,
  onSave: _,
  onRecover: U,
  onWikiLinkClick: I,
  validateWikiLink: R,
  onWikiLinkSearch: W,
  onLinkClick: K,
  findReplaceOpen: V,
  onFindReplaceChange: G,
  renderToolbar: Q,
  renderFooter: z,
  disabledFeatures: H = {},
  minHeight: F = "200px",
  maxHeight: Z,
  spellCheck: le = !0,
  headingLevels: ue = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: ve = [1, 2, 3],
  // TOC props
  showTableOfContents: Se = !1,
  tocVisible: Be = !0,
  onTocVisibilityChange: wt,
  tocTitle: Dn = "",
  tocMinLevel: Nn = 1,
  tocMaxLevel: or = 4,
  tocShowLevelIndicators: sr = !1,
  tocHighlightActive: ar = !0,
  tocTreeView: ir = !1,
  tocWidth: cr = "240px",
  tocPosition: It = "right",
  tocScrollOffset: Kt = 20,
  onTocItemClick: Gt,
  renderTocItem: lr,
  tocShowToggleButton: ur = !0,
  // Raw markdown editor
  autoClosePairs: Mo = !0,
  // Performance profiler
  showPerformanceProfiler: So = !1,
  onPerformanceProfilerClose: Eo,
  // Auto reorder checklist
  autoReorderChecklist: To = !1,
  // Expand selection
  progressiveSelectAll: Do = !1,
  // Auto-detection toggles
  enableTagAutoDetect: dr = !1,
  enableHexColorHighlight: No = !1,
  enableCollapsibleHeadings: Ao = !1,
  // Performance mode
  performanceMode: An = "auto",
  // Error boundary
  onEditorError: fr,
  // AI writing assistant
  aiActions: xt,
  onAIAction: re,
  onAISetupRequired: me
}, ne) {
  const [fe] = Y(() => p1()), [Ee, de] = Y(M), [mr, Ln] = Y(""), qt = j(M), kt = j(""), it = j(null), [Ju, wa] = Y(0), pr = !!(xt && xt.length > 0 && re), { state: Fe, executeAction: hr, abort: ed, reset: Ct } = l1(re), [td, Lo] = Y(null), [nd, rd] = Y({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), od = j(re);
  od.current = re;
  const xa = j(me);
  xa.current = me;
  const [sd, ad] = Y([]), [id, cd] = Y(0), ld = B((ae, Ne) => {
    ad(ae), cd(Ne);
  }, []), ka = j(w), Ca = j(S), Ma = j(x), Sa = j(k), Ea = j(D), Ta = j(I), Da = j(R), Na = j(W);
  ka.current = w, Ca.current = S, Ma.current = x, Sa.current = k, Ea.current = D, Ta.current = I, Da.current = R, Na.current = W;
  const Aa = 2e3, [Ro, ud] = Y(() => An === "lightweight" ? !0 : An === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > Aa : !1), dd = j(0), La = j(Ro);
  La.current = Ro;
  const [Io, gr] = Y(null), fd = dk({
    placeholder: s,
    isMobile: fe,
    maxImageSize: b,
    headingLevels: ue,
    collapsibleHeadingLevels: ve,
    disabledFeatures: H,
    progressiveSelectAll: Do,
    enableCollapsibleHeadings: Ao,
    enableTagAutoDetect: dr,
    enableHexColorHighlight: No,
    isLightweight: Ro,
    setImageEditState: gr,
    callbackRefs: {
      onImageUploadStart: ka,
      onImageUploadComplete: Ca,
      onImageUploadError: Ma,
      onImageUpload: Sa,
      resolveImageSrc: Ea,
      onWikiLinkClick: Ta,
      validateWikiLink: Da
    }
  }), { editor: ce, turndownService: Ra } = hk({
    extensions: fd,
    content: t,
    editable: i,
    autofocus: a,
    spellCheck: le,
    initialMode: M,
    performanceMode: An,
    lightweightThreshold: Aa,
    onChange: n,
    onHTMLChange: r,
    onMarkdownChange: o,
    onReady: N,
    onDestroy: $,
    onFocus: A,
    onBlur: P,
    onSelectionChange: O,
    onLinkClick: K,
    editorModeRef: qt,
    rawMarkdownRef: kt,
    setRawMarkdown: Ln,
    setIsLightweight: ud,
    lightweightCheckCounterRef: dd,
    isLightweightRef: La
  }), [md, yr] = Y(!1), [pd, hd] = Y(!1), gd = V !== void 0 ? V : pd, Pt = B((ae) => {
    hd(ae), G?.(ae);
  }, [G]), [yd, vr] = Y(0), [vd, bd] = Y(""), Ot = Cv(ce, {
    storageKey: h,
    debounceMs: g,
    enabled: p,
    onSave: (ae) => {
      _?.(ae);
    },
    onRecover: (ae) => {
      U?.(ae);
    }
  }), Po = Nk({
    editor: ce,
    turndownService: Ra,
    editorModeRef: qt,
    rawMarkdownRef: kt,
    setEditorMode: de,
    setRawMarkdown: Ln,
    onModeChange: T,
    enableTagAutoDetect: dr,
    disabledFeatures: H
  }), Ia = B((ae) => {
    Ln(ae), kt.current = ae, o?.(ae);
  }, [o]), br = Lk(ce, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: u
  });
  Mv(ne, {
    editor: ce,
    turndownService: Ra,
    editorModeRef: qt,
    handleModeSwitch: Po,
    wordCount: br,
    autoSaveState: Ot,
    setIsFindReplaceOpen: Pt,
    setFindReplaceFocusTrigger: vr
  }), Dk({
    editorModeRef: qt,
    rawMarkdownRef: kt,
    editorMode: Ee,
    handleModeSwitch: Po,
    setIsFindReplaceOpen: Pt,
    setFindReplaceFocusTrigger: vr
  });
  const wd = Ft(() => ({
    openLinkPopover: () => yr(!0),
    openFindReplace: (ae) => {
      ae && bd(ae), Pt(!0), vr((Ne) => Ne + 1);
    },
    openFindReplaceWithReplace: () => {
      Pt(!0);
    }
  }), [Pt]);
  Tk(ce, fe, wd);
  const Pa = B((ae, Ne) => {
    if (!pr) {
      xa.current?.();
      return;
    }
    if (!ce) return;
    let ct = { top: 0, left: 0 };
    if (Ne) {
      const Ve = Ne.getBoundingClientRect();
      ct = { top: Ve.bottom + 4, left: Ve.left };
    } else {
      const { from: Ve, to: Xt } = ce.state.selection, wr = ce.view.coordsAtPos(Ve), xr = ce.view.coordsAtPos(Xt);
      ct = { top: xr.bottom + 8, left: (wr.left + xr.left) / 2 };
    }
    Lo({ scope: ae, position: ct });
  }, [pr, ce]), xd = B((ae, Ne) => {
    if (!ce || !xt) return;
    const ct = xt.find((Ed) => Ed.id === ae);
    if (!ct) return;
    const { from: Ve, to: Xt } = ce.state.selection, wr = Ve !== Xt ? ce.state.doc.textBetween(Ve, Xt, `
`) : "", xr = ct.scope === "document" || !wr ? ce.getText() : wr, $a = ce.view.coordsAtPos(Ve), Ha = ce.view.coordsAtPos(Xt);
    rd({
      selectionTop: $a.top,
      selectionBottom: Ha.bottom,
      selectionCenterX: ($a.left + Ha.right) / 2
    }), Lo(null), hr(ae, ct.label, xr, { from: Ve, to: Xt }, Ne);
  }, [ce, xt, hr]), kd = B(() => {
    if (!ce || Fe.status !== "complete") return;
    const { selectionRange: ae, result: Ne } = Fe;
    ce.chain().focus().setTextSelection(ae).deleteSelection().insertContent(Ne).run(), Ct();
  }, [ce, Fe, Ct]), Cd = B(() => {
    if (!ce || Fe.status !== "complete") return;
    const { selectionRange: ae, result: Ne } = Fe;
    ce.chain().focus().setTextSelection(ae.to).insertContent(`
` + Ne).run(), Ct();
  }, [ce, Fe, Ct]), Md = B(() => {
    if (!(Fe.status !== "complete" && Fe.status !== "error"))
      if (Fe.status === "complete") {
        const { action: ae, actionLabel: Ne, inputText: ct, selectionRange: Ve } = Fe;
        Ct(), hr(ae, Ne, ct, Ve);
      } else
        Ct();
  }, [Fe, Ct, hr]);
  if (!ce)
    return /* @__PURE__ */ m(Hk, { className: c, theme: d });
  const Oa = /* @__PURE__ */ m(
    yv,
    {
      editor: ce,
      onOpenLinkPopover: () => yr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Pt(!0), vr((ae) => ae + 1);
      },
      disabledFeatures: H,
      autoReorderChecklist: To,
      aiEnabled: pr || !!me,
      onAISparklesClick: (ae) => Pa("document", ae)
    }
  ), _a = /* @__PURE__ */ L("div", { className: "editor-footer", children: [
    p && /* @__PURE__ */ m(
      Rk,
      {
        status: Ot.status,
        lastSaved: Ot.lastSaved
      }
    ),
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ L("span", { children: [
      br.words,
      " words"
    ] }) })
  ] }), Sd = {
    minHeight: F,
    ...Z && { maxHeight: Z, overflowY: "auto" }
  };
  return /* @__PURE__ */ L("div", { className: `markdown-editor-container ${f === "neutral" ? "color-theme-neutral" : ""} ${c}`, "data-theme": d, children: [
    p && y && Ot.hasRecoverableContent && /* @__PURE__ */ m(
      Ik,
      {
        onRecover: () => {
          Ot.recover();
        },
        onDismiss: Ot.dismissRecovery
      }
    ),
    l && /* @__PURE__ */ L("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Q ? Q(ce, Oa) : Oa,
      C && /* @__PURE__ */ m(Wk, { editorMode: Ee, onModeSwitch: Po })
    ] }),
    !fe && /* @__PURE__ */ m(
      vv,
      {
        editor: ce,
        isOpen: gd,
        onClose: () => Pt(!1),
        focusTrigger: yd,
        initialSearchQuery: vd,
        editorMode: Ee,
        rawMarkdown: mr,
        onRawMarkdownChange: Ia,
        onMatchesChange: ld
      }
    ),
    /* @__PURE__ */ m(xv, { editor: ce }),
    /* @__PURE__ */ L("div", { className: `editor-main-area ${Se ? "editor-with-toc" : ""}`, children: [
      Se && It === "left" && /* @__PURE__ */ m(
        Ji,
        {
          editor: ce,
          visible: Be,
          onVisibilityChange: wt,
          title: Dn,
          minLevel: Nn,
          maxLevel: or,
          showLevelIndicators: sr,
          highlightActive: ar,
          treeView: ir,
          width: cr,
          position: It,
          scrollOffset: Kt,
          onItemClick: Gt,
          renderItem: lr,
          showToggleButton: ur,
          scrollContainerRef: it
        }
      ),
      /* @__PURE__ */ L(
        $k,
        {
          resetKey: `${t}-${Ju}`,
          onRetry: () => wa((ae) => ae + 1),
          onClearContent: () => {
            ce && ce.commands.clearContent(), n?.(""), r?.(""), o?.(""), wa((ae) => ae + 1);
          },
          onError: fr,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: it, style: Sd, children: Ee === "wysiwyg" ? /* @__PURE__ */ L(xe, { children: [
              /* @__PURE__ */ m(Dd, { editor: ce, className: "editor-content" }),
              /* @__PURE__ */ m(
                a1,
                {
                  editor: ce,
                  isMobile: fe,
                  disabledFeatures: H,
                  containerRef: it,
                  editable: i,
                  showFloatingToolbar: v,
                  isLinkPopoverOpen: md,
                  aiEnabled: pr,
                  onAISetupRequired: me,
                  onAISparklesClick: (ae) => Pa("selection", ae),
                  aiDropdown: td,
                  aiActions: xt,
                  onAIActionSelect: xd,
                  onAIDropdownClose: () => Lo(null),
                  aiState: Fe,
                  aiPopoverPosition: nd,
                  onAIReplace: kd,
                  onAIInsert: Cd,
                  onAIRetry: Md,
                  onAIDiscard: () => {
                    ed(), Ct();
                  },
                  onLinkPopoverClose: () => yr(!1),
                  onEditLink: () => yr(!0),
                  onWikiLinkSearch: Na.current,
                  imageEditState: Io,
                  onImageSave: (ae, Ne) => {
                    ce.chain().focus().setNodeSelection(Io.pos).updateAttributes("resizableImage", {
                      src: ae,
                      alt: Ne
                    }).run(), gr(null);
                  },
                  onImageDelete: () => {
                    ce.chain().focus().setNodeSelection(Io.pos).deleteSelection().run(), gr(null);
                  },
                  onImageEditClose: () => gr(null)
                }
              )
            ] }) : /* @__PURE__ */ m(
              Pk,
              {
                content: mr,
                onChange: Ia,
                placeholder: "Write your markdown here...",
                editable: i,
                autofocus: !0,
                searchMatches: sd,
                currentMatchIndex: id,
                autoClosePairs: Mo
              }
            ) }),
            /* @__PURE__ */ m(i1, { scrollContainerRef: it })
          ]
        }
      ),
      Se && It === "right" && /* @__PURE__ */ m(
        Ji,
        {
          editor: ce,
          visible: Be,
          onVisibilityChange: wt,
          title: Dn,
          minLevel: Nn,
          maxLevel: or,
          showLevelIndicators: sr,
          highlightActive: ar,
          treeView: ir,
          width: cr,
          position: It,
          scrollOffset: Kt,
          onItemClick: Gt,
          renderItem: lr,
          showToggleButton: ur,
          scrollContainerRef: it
        }
      )
    ] }),
    u && (z ? z(
      { words: br.words, characters: br.characters },
      Ot.status,
      _a
    ) : _a),
    /* @__PURE__ */ m(_k, { visible: So, onClose: Eo, editor: ce })
  ] });
}), lC = io.create({
  name: "callout",
  addOptions() {
    return {
      HTMLAttributes: {},
      types: ["info", "note", "prompt", "resources", "todo"]
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
      xn(this.options.HTMLAttributes, t, {
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
}), Zu = {
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
}, h1 = {
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
}, g1 = {
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
}, y1 = {
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
}, Hn = {
  dark: Zu,
  light: h1,
  sepia: g1,
  nord: y1
};
function v1(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function uC(e, t, n, r) {
  const o = Hn[e] || Zu;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const Qu = nc(null);
function dC({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = Y(t), s = Hn[r] || Hn.dark, i = B((c) => {
    Hn[c] && o(c);
  }, []);
  q(() => {
    n?.current && v1(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(Hn)
  };
  return /* @__PURE__ */ m(Qu.Provider, { value: a, children: e });
}
function fC() {
  const e = rc(Qu);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const ec = [
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
function mC({ node: e, updateAttributes: t }) {
  const [n, r] = Y(!1), o = e.attrs.language || "plaintext";
  ec.find((i) => i.value === o)?.label;
  const s = B(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ L(pn, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ L("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ L("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: ec.map(({ value: i, label: a }) => /* @__PURE__ */ m("option", { value: i, children: a }, i))
          }
        ),
        /* @__PURE__ */ m(Nt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ m(wn, { size: 14 }) : /* @__PURE__ */ m(bn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m(Ds, {}) }) })
  ] });
}
export {
  Rk as AutoSaveIndicator,
  lC as Callout,
  Ax as CalloutInputRule,
  mC as CodeBlockComponent,
  Sx as CollapsibleHeading,
  Vv as CollapsibleList,
  ux as DatePill,
  dC as EditorThemeProvider,
  yv as EditorToolbar,
  vv as FindReplace,
  Bk as FloatingToolbar,
  n1 as ImageDropZone,
  uk as ImageUpload,
  cC as MarkdownEditor,
  Dx as MarkdownLinkInputRule,
  kx as MarkdownPasteSafe,
  zv as MixedBulletList,
  Yv as MixedListItem,
  Bv as MixedOrderedList,
  Uv as MixedTaskItem,
  Fv as MixedTaskList,
  Ik as RecoveryBanner,
  Qv as ResizableImage,
  Lx as SearchHighlight,
  xv as SelectAllActionBar,
  nk as SelectAllOccurrences,
  qk as SlashCommands,
  Px as TabIndent,
  Ji as TableOfContents,
  mx as TagPill,
  hx as WikiLinkSafe,
  v1 as applyTheme,
  uC as createCustomTheme,
  Zu as darkTheme,
  ba as getDateVariant,
  on as isValidTag,
  h1 as lightTheme,
  Kv as loadLanguageIfNeeded,
  ye as lowlight,
  y1 as nordTheme,
  Bn as normalizeTag,
  Ht as parseDateFromMarkdown,
  g1 as sepiaTheme,
  Hn as themes,
  Cv as useAutoSave,
  fC as useEditorTheme,
  Lk as useWordCount
};
//# sourceMappingURL=paragon.js.map
