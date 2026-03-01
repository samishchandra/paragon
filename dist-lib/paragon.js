import { jsxDEV as m, Fragment as Ce } from "react/jsx-dev-runtime";
import { useEditorState as Ja, ReactNodeViewRenderer as or, NodeViewWrapper as hn, NodeViewContent as Ss, useEditor as Td, EditorContent as Sd } from "@tiptap/react";
import * as T from "react";
import X, { useState as Y, useRef as j, useEffect as q, useLayoutEffect as rr, memo as vn, useCallback as H, useImperativeHandle as Md, createContext as ec, useContext as tc, useMemo as zt, Component as Dd, useReducer as Ad, forwardRef as Pd } from "react";
import { Image as Ms, X as pt, Link2 as Ds, Type as sr, Undo as Id, Redo as Rd, Bold as As, Italic as Ps, Underline as Is, Strikethrough as Rs, Code as nc, Highlighter as oc, Link as Ls, ChevronDown as Dt, List as Os, ListOrdered as _s, CheckSquare as $s, Quote as Ws, Code2 as rc, IndentIncrease as Ld, IndentDecrease as Od, Table as rs, Minus as sc, Info as jo, BookOpen as Bs, PenLine as _d, Library as $d, ListTodo as Hs, Columns as Wi, Trash2 as sn, Rows as Bi, ToggleLeft as Hi, ArrowUpDown as Wd, Sparkles as ir, Copy as Nn, Search as Bd, ChevronUp as Hd, MousePointerClick as Fd, CaseSensitive as zd, WholeWord as Ud, Regex as Yd, Replace as ss, ReplaceAll as jd, Plus as Fs, Check as yn, ClipboardList as Vd, MessageSquareText as ic, StickyNote as ac, ChevronRight as cc, ChevronLeftIcon as Kd, ChevronRightIcon as Gd, ChevronDownIcon as qd, Calendar as lc, Hash as Fi, Cloud as Xd, Loader2 as uc, CloudOff as Zd, AlertCircle as Qd, RotateCcw as zs, Activity as Jd, Maximize2 as dc, Minimize2 as mc, AlertTriangle as em, CheckCircle2 as tm, Eye as nm, FileText as Us, FileCode as om, ExternalLink as rm, Pencil as sm, Unlink as im, Heading1 as am, Heading2 as cm, Heading3 as lm, Heading4 as um, Heading5 as dm, ImagePlus as mm, MessageSquare as fc, RefreshCw as fm, SpellCheck as hm, PanelRightClose as pm, PanelRightOpen as gm } from "lucide-react";
import { jsx as F, Fragment as bm, jsxs as vm } from "react/jsx-runtime";
import * as hc from "react-dom";
import Nm, { createPortal as ym } from "react-dom";
import { TextSelection as Ge, Plugin as Ie, PluginKey as Re, AllSelection as km } from "@tiptap/pm/state";
import xm from "@tiptap/starter-kit";
import wm from "@tiptap/extension-placeholder";
import Cm from "@tiptap/extension-text-align";
import Em from "@tiptap/extension-highlight";
import Tm from "@tiptap/extension-link";
import { Table as Sm } from "@tiptap/extension-table";
import Mm from "@tiptap/extension-table-row";
import Dm from "@tiptap/extension-table-cell";
import Am from "@tiptap/extension-table-header";
import { Extension as Qe, Node as ar, mergeAttributes as kn, InputRule as Oe, Mark as pc } from "@tiptap/core";
import { DecorationSet as Ue, Decoration as qe } from "@tiptap/pm/view";
import Pm from "@tiptap/extension-bullet-list";
import Im from "@tiptap/extension-ordered-list";
import Rm from "@tiptap/extension-list-item";
import Lm from "@tiptap/extension-task-list";
import Om from "@tiptap/extension-task-item";
import { findWrapping as zi, canJoin as _m } from "@tiptap/pm/transform";
import $m from "@tiptap/extension-underline";
import Wm from "@tiptap/extension-subscript";
import Bm from "@tiptap/extension-superscript";
import Hm from "@tiptap/extension-typography";
import Fm from "@tiptap/extension-code-block-lowlight";
import { createLowlight as zm } from "lowlight";
import Ys from "highlight.js/lib/languages/javascript";
import js from "highlight.js/lib/languages/typescript";
import gc from "highlight.js/lib/languages/python";
import Vs from "highlight.js/lib/languages/xml";
import Um from "highlight.js/lib/languages/css";
import Ym from "highlight.js/lib/languages/json";
import cr from "highlight.js/lib/languages/bash";
import jm from "@tiptap/extension-image";
import { createRoot as Vm } from "react-dom/client";
import { Fragment as Km } from "@tiptap/pm/model";
import { liftListItem as Ui, sinkListItem as Yi } from "@tiptap/pm/schema-list";
import { undo as Gm, redo as qm } from "@tiptap/pm/history";
import Xm from "@tiptap/extension-horizontal-rule";
function bc({ isOpen: e, onClose: t, onInsert: n, position: o }) {
  const [r, s] = Y(""), [a, i] = Y(""), [c, l] = Y(""), [u, d] = Y(!1), f = j(null), h = j(null);
  q(() => {
    e && (s(""), i(""), l(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), q(() => {
    if (!e) return;
    const N = (k) => {
      h.current && !h.current.contains(k.target) && t();
    }, y = (k) => {
      k.key === "Escape" && t();
    }, E = setTimeout(() => {
      document.addEventListener("mousedown", N);
    }, 100);
    return document.addEventListener("keydown", y), () => {
      clearTimeout(E), document.removeEventListener("mousedown", N), document.removeEventListener("keydown", y);
    };
  }, [e, t]);
  const g = (N) => {
    if (!N.trim())
      return l("Please enter an image URL"), !1;
    try {
      const y = new URL(N);
      if (!["http:", "https:", "data:"].includes(y.protocol))
        return l("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return l("Please enter a valid URL"), !1;
    }
    return l(""), !0;
  }, p = async () => {
    if (!g(r)) return;
    d(!0);
    const N = new window.Image();
    N.onload = () => {
      d(!1), n(r.trim(), a.trim()), t();
    }, N.onerror = () => {
      d(!1), n(r.trim(), a.trim()), t();
    }, setTimeout(() => {
      u && (d(!1), n(r.trim(), a.trim()), t());
    }, 3e3), N.src = r.trim();
  }, b = (N) => {
    N.key === "Enter" && !N.shiftKey && (N.preventDefault(), p());
  };
  if (!e) return null;
  const v = o ? {
    top: o.top,
    left: Math.min(o.left, typeof window < "u" ? window.innerWidth - 340 : o.left)
  } : { top: "50%", left: "50%" };
  return /* @__PURE__ */ m(
    "div",
    {
      ref: h,
      className: "image-url-dialog fixed z-50",
      style: {
        top: (typeof v.top == "number", v.top),
        left: typeof v.left == "number" ? Math.max(8, v.left) : v.left,
        transform: o ? void 0 : "translate(-50%, -50%)"
      },
      children: [
        /* @__PURE__ */ m("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ m("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ m(Ms, { size: 16, className: "text-primary" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 148,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m("span", { className: "font-medium text-sm", children: "Insert Image from URL" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 149,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 147,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(pt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 156,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 151,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
          lineNumber: 146,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ m("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ m("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(Ds, { size: 12 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 165,
                columnNumber: 13
              }, this),
              "Image URL"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 164,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                ref: f,
                type: "url",
                value: r,
                onChange: (N) => {
                  s(N.target.value), c && l("");
                },
                onKeyDown: b,
                placeholder: "https://example.com/image.jpg",
                className: `image-url-dialog-input ${c ? "error" : ""}`
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 168,
                columnNumber: 11
              },
              this
            ),
            c && /* @__PURE__ */ m("span", { className: "image-url-dialog-error", children: c }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 181,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 163,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ m("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(sr, { size: 12 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 188,
                columnNumber: 13
              }, this),
              "Alt Text (optional)"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 187,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                type: "text",
                value: a,
                onChange: (N) => i(N.target.value),
                onKeyDown: b,
                placeholder: "Describe the image",
                className: "image-url-dialog-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 191,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 186,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("div", { className: "image-url-dialog-actions", children: [
            /* @__PURE__ */ m(
              "button",
              {
                onClick: t,
                className: "image-url-dialog-btn image-url-dialog-btn-cancel",
                children: "Cancel"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 203,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ m(
              "button",
              {
                onClick: p,
                disabled: u || !r.trim(),
                className: "image-url-dialog-btn image-url-dialog-btn-insert",
                children: u ? "Validating..." : "Insert Image"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 209,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 202,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
          lineNumber: 161,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageURLDialog.tsx",
      lineNumber: 136,
      columnNumber: 5
    },
    this
  );
}
function se(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function ji(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function lr(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = ji(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : ji(e[r], null);
        }
      };
  };
}
function Pe(...e) {
  return T.useCallback(lr(...e), e);
}
function xn(e, t = []) {
  let n = [];
  function o(s, a) {
    const i = T.createContext(a), c = n.length;
    n = [...n, a];
    const l = (d) => {
      const { scope: f, children: h, ...g } = d, p = f?.[e]?.[c] || i, b = T.useMemo(() => g, Object.values(g));
      return /* @__PURE__ */ F(p.Provider, { value: b, children: h });
    };
    l.displayName = s + "Provider";
    function u(d, f) {
      const h = f?.[e]?.[c] || i, g = T.useContext(h);
      if (g) return g;
      if (a !== void 0) return a;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [l, u];
  }
  const r = () => {
    const s = n.map((a) => T.createContext(a));
    return function(i) {
      const c = i?.[e] || s;
      return T.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: c } }),
        [i, c]
      );
    };
  };
  return r.scopeName = e, [o, Zm(r, ...t)];
}
function Zm(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(s) {
      const a = o.reduce((i, { useScope: c, scopeName: l }) => {
        const d = c(s)[`__scope${l}`];
        return { ...i, ...d };
      }, {});
      return T.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var At = globalThis?.document ? T.useLayoutEffect : () => {
}, Qm = T[" useInsertionEffect ".trim().toString()] || At;
function Ks({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = Jm({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, c = i ? e : r;
  {
    const u = T.useRef(e !== void 0);
    T.useEffect(() => {
      const d = u.current;
      d !== i && console.warn(
        `${o} is changing from ${d ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = i;
    }, [i, o]);
  }
  const l = T.useCallback(
    (u) => {
      if (i) {
        const d = ef(u) ? u(e) : u;
        d !== e && a.current?.(d);
      } else
        s(u);
    },
    [i, e, s, a]
  );
  return [c, l];
}
function Jm({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = T.useState(e), r = T.useRef(n), s = T.useRef(t);
  return Qm(() => {
    s.current = t;
  }, [t]), T.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function ef(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function zn(e) {
  const t = /* @__PURE__ */ nf(e), n = T.forwardRef((o, r) => {
    const { children: s, ...a } = o, i = T.Children.toArray(s), c = i.find(rf);
    if (c) {
      const l = c.props.children, u = i.map((d) => d === c ? T.Children.count(l) > 1 ? T.Children.only(null) : T.isValidElement(l) ? l.props.children : null : d);
      return /* @__PURE__ */ F(t, { ...a, ref: r, children: T.isValidElement(l) ? T.cloneElement(l, void 0, u) : null });
    }
    return /* @__PURE__ */ F(t, { ...a, ref: r, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var tf = /* @__PURE__ */ zn("Slot");
// @__NO_SIDE_EFFECTS__
function nf(e) {
  const t = T.forwardRef((n, o) => {
    const { children: r, ...s } = n;
    if (T.isValidElement(r)) {
      const a = af(r), i = sf(s, r.props);
      return r.type !== T.Fragment && (i.ref = o ? lr(o, a) : a), T.cloneElement(r, i);
    }
    return T.Children.count(r) > 1 ? T.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var vc = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function of(e) {
  const t = ({ children: n }) => /* @__PURE__ */ F(bm, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = vc, t;
}
function rf(e) {
  return T.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === vc;
}
function sf(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...i) => {
      const c = s(...i);
      return r(...i), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function af(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var cf = [
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
], Me = cf.reduce((e, t) => {
  const n = /* @__PURE__ */ zn(`Primitive.${t}`), o = T.forwardRef((r, s) => {
    const { asChild: a, ...i } = r, c = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ F(c, { ...i, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Nc(e, t) {
  e && hc.flushSync(() => e.dispatchEvent(t));
}
function yc(e) {
  const t = e + "CollectionProvider", [n, o] = xn(t), [r, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (p) => {
    const { scope: b, children: v } = p, N = X.useRef(null), y = X.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ F(r, { scope: b, itemMap: y, collectionRef: N, children: v });
  };
  a.displayName = t;
  const i = e + "CollectionSlot", c = /* @__PURE__ */ zn(i), l = X.forwardRef(
    (p, b) => {
      const { scope: v, children: N } = p, y = s(i, v), E = Pe(b, y.collectionRef);
      return /* @__PURE__ */ F(c, { ref: E, children: N });
    }
  );
  l.displayName = i;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ zn(u), h = X.forwardRef(
    (p, b) => {
      const { scope: v, children: N, ...y } = p, E = X.useRef(null), k = Pe(b, E), w = s(u, v);
      return X.useEffect(() => (w.itemMap.set(E, { ref: E, ...y }), () => void w.itemMap.delete(E))), /* @__PURE__ */ F(f, { [d]: "", ref: k, children: N });
    }
  );
  h.displayName = u;
  function g(p) {
    const b = s(e + "CollectionConsumer", p);
    return X.useCallback(() => {
      const N = b.collectionRef.current;
      if (!N) return [];
      const y = Array.from(N.querySelectorAll(`[${d}]`));
      return Array.from(b.itemMap.values()).sort(
        (w, S) => y.indexOf(w.ref.current) - y.indexOf(S.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: a, Slot: l, ItemSlot: h },
    g,
    o
  ];
}
var lf = T.createContext(void 0);
function kc(e) {
  const t = T.useContext(lf);
  return e || t || "ltr";
}
function gt(e) {
  const t = T.useRef(e);
  return T.useEffect(() => {
    t.current = e;
  }), T.useMemo(() => (...n) => t.current?.(...n), []);
}
function uf(e, t = globalThis?.document) {
  const n = gt(e);
  T.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var df = "DismissableLayer", is = "dismissableLayer.update", mf = "dismissableLayer.pointerDownOutside", ff = "dismissableLayer.focusOutside", Vi, xc = T.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Gs = T.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...c
    } = e, l = T.useContext(xc), [u, d] = T.useState(null), f = u?.ownerDocument ?? globalThis?.document, [, h] = T.useState({}), g = Pe(t, (S) => d(S)), p = Array.from(l.layers), [b] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), v = p.indexOf(b), N = u ? p.indexOf(u) : -1, y = l.layersWithOutsidePointerEventsDisabled.size > 0, E = N >= v, k = gf((S) => {
      const x = S.target, C = [...l.branches].some((M) => M.contains(x));
      !E || C || (r?.(S), a?.(S), S.defaultPrevented || i?.());
    }, f), w = bf((S) => {
      const x = S.target;
      [...l.branches].some((M) => M.contains(x)) || (s?.(S), a?.(S), S.defaultPrevented || i?.());
    }, f);
    return uf((S) => {
      N === l.layers.size - 1 && (o?.(S), !S.defaultPrevented && i && (S.preventDefault(), i()));
    }, f), T.useEffect(() => {
      if (u)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (Vi = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(u)), l.layers.add(u), Ki(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = Vi);
        };
    }, [u, f, n, l]), T.useEffect(() => () => {
      u && (l.layers.delete(u), l.layersWithOutsidePointerEventsDisabled.delete(u), Ki());
    }, [u, l]), T.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(is, S), () => document.removeEventListener(is, S);
    }, []), /* @__PURE__ */ F(
      Me.div,
      {
        ...c,
        ref: g,
        style: {
          pointerEvents: y ? E ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: se(e.onFocusCapture, w.onFocusCapture),
        onBlurCapture: se(e.onBlurCapture, w.onBlurCapture),
        onPointerDownCapture: se(
          e.onPointerDownCapture,
          k.onPointerDownCapture
        )
      }
    );
  }
);
Gs.displayName = df;
var hf = "DismissableLayerBranch", pf = T.forwardRef((e, t) => {
  const n = T.useContext(xc), o = T.useRef(null), r = Pe(t, o);
  return T.useEffect(() => {
    const s = o.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ F(Me.div, { ...e, ref: r });
});
pf.displayName = hf;
function gf(e, t = globalThis?.document) {
  const n = gt(e), o = T.useRef(!1), r = T.useRef(() => {
  });
  return T.useEffect(() => {
    const s = (i) => {
      if (i.target && !o.current) {
        let c = function() {
          wc(
            mf,
            n,
            l,
            { discrete: !0 }
          );
        };
        const l = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = c, t.addEventListener("click", r.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", r.current);
      o.current = !1;
    }, a = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(a), t.removeEventListener("pointerdown", s), t.removeEventListener("click", r.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => o.current = !0
  };
}
function bf(e, t = globalThis?.document) {
  const n = gt(e), o = T.useRef(!1);
  return T.useEffect(() => {
    const r = (s) => {
      s.target && !o.current && wc(ff, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function Ki() {
  const e = new CustomEvent(is);
  document.dispatchEvent(e);
}
function wc(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? Nc(r, s) : r.dispatchEvent(s);
}
var Lr = 0;
function vf() {
  T.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Gi()), document.body.insertAdjacentElement("beforeend", e[1] ?? Gi()), Lr++, () => {
      Lr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Lr--;
    };
  }, []);
}
function Gi() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Or = "focusScope.autoFocusOnMount", _r = "focusScope.autoFocusOnUnmount", qi = { bubbles: !1, cancelable: !0 }, Nf = "FocusScope", Cc = T.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: o = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, c] = T.useState(null), l = gt(r), u = gt(s), d = T.useRef(null), f = Pe(t, (p) => c(p)), h = T.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  T.useEffect(() => {
    if (o) {
      let p = function(y) {
        if (h.paused || !i) return;
        const E = y.target;
        i.contains(E) ? d.current = E : St(d.current, { select: !0 });
      }, b = function(y) {
        if (h.paused || !i) return;
        const E = y.relatedTarget;
        E !== null && (i.contains(E) || St(d.current, { select: !0 }));
      }, v = function(y) {
        if (document.activeElement === document.body)
          for (const k of y)
            k.removedNodes.length > 0 && St(i);
      };
      document.addEventListener("focusin", p), document.addEventListener("focusout", b);
      const N = new MutationObserver(v);
      return i && N.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", b), N.disconnect();
      };
    }
  }, [o, i, h.paused]), T.useEffect(() => {
    if (i) {
      Zi.add(h);
      const p = document.activeElement;
      if (!i.contains(p)) {
        const v = new CustomEvent(Or, qi);
        i.addEventListener(Or, l), i.dispatchEvent(v), v.defaultPrevented || (yf(Ef(Ec(i)), { select: !0 }), document.activeElement === p && St(i));
      }
      return () => {
        i.removeEventListener(Or, l), setTimeout(() => {
          const v = new CustomEvent(_r, qi);
          i.addEventListener(_r, u), i.dispatchEvent(v), v.defaultPrevented || St(p ?? document.body, { select: !0 }), i.removeEventListener(_r, u), Zi.remove(h);
        }, 0);
      };
    }
  }, [i, l, u, h]);
  const g = T.useCallback(
    (p) => {
      if (!n && !o || h.paused) return;
      const b = p.key === "Tab" && !p.altKey && !p.ctrlKey && !p.metaKey, v = document.activeElement;
      if (b && v) {
        const N = p.currentTarget, [y, E] = kf(N);
        y && E ? !p.shiftKey && v === E ? (p.preventDefault(), n && St(y, { select: !0 })) : p.shiftKey && v === y && (p.preventDefault(), n && St(E, { select: !0 })) : v === N && p.preventDefault();
      }
    },
    [n, o, h.paused]
  );
  return /* @__PURE__ */ F(Me.div, { tabIndex: -1, ...a, ref: f, onKeyDown: g });
});
Cc.displayName = Nf;
function yf(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (St(o, { select: t }), document.activeElement !== n) return;
}
function kf(e) {
  const t = Ec(e), n = Xi(t, e), o = Xi(t.reverse(), e);
  return [n, o];
}
function Ec(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const r = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Xi(e, t) {
  for (const n of e)
    if (!xf(n, { upTo: t })) return n;
}
function xf(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function wf(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function St(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && wf(e) && t && e.select();
  }
}
var Zi = Cf();
function Cf() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Qi(e, t), e.unshift(t);
    },
    remove(t) {
      e = Qi(e, t), e[0]?.resume();
    }
  };
}
function Qi(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Ef(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Tf = T[" useId ".trim().toString()] || (() => {
}), Sf = 0;
function Vo(e) {
  const [t, n] = T.useState(Tf());
  return At(() => {
    n((o) => o ?? String(Sf++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Mf = ["top", "right", "bottom", "left"], Pt = Math.min, $e = Math.max, Ko = Math.round, wo = Math.floor, ot = (e) => ({
  x: e,
  y: e
}), Df = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Af = {
  start: "end",
  end: "start"
};
function as(e, t, n) {
  return $e(e, Pt(t, n));
}
function bt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function vt(e) {
  return e.split("-")[0];
}
function wn(e) {
  return e.split("-")[1];
}
function qs(e) {
  return e === "x" ? "y" : "x";
}
function Xs(e) {
  return e === "y" ? "height" : "width";
}
const Pf = /* @__PURE__ */ new Set(["top", "bottom"]);
function tt(e) {
  return Pf.has(vt(e)) ? "y" : "x";
}
function Zs(e) {
  return qs(tt(e));
}
function If(e, t, n) {
  n === void 0 && (n = !1);
  const o = wn(e), r = Zs(e), s = Xs(r);
  let a = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Go(a)), [a, Go(a)];
}
function Rf(e) {
  const t = Go(e);
  return [cs(e), t, cs(t)];
}
function cs(e) {
  return e.replace(/start|end/g, (t) => Af[t]);
}
const Ji = ["left", "right"], ea = ["right", "left"], Lf = ["top", "bottom"], Of = ["bottom", "top"];
function _f(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ea : Ji : t ? Ji : ea;
    case "left":
    case "right":
      return t ? Lf : Of;
    default:
      return [];
  }
}
function $f(e, t, n, o) {
  const r = wn(e);
  let s = _f(vt(e), n === "start", o);
  return r && (s = s.map((a) => a + "-" + r), t && (s = s.concat(s.map(cs)))), s;
}
function Go(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Df[t]);
}
function Wf(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Tc(e) {
  return typeof e != "number" ? Wf(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function qo(e) {
  const {
    x: t,
    y: n,
    width: o,
    height: r
  } = e;
  return {
    width: o,
    height: r,
    top: n,
    left: t,
    right: t + o,
    bottom: n + r,
    x: t,
    y: n
  };
}
function ta(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const s = tt(t), a = Zs(t), i = Xs(a), c = vt(t), l = s === "y", u = o.x + o.width / 2 - r.width / 2, d = o.y + o.height / 2 - r.height / 2, f = o[i] / 2 - r[i] / 2;
  let h;
  switch (c) {
    case "top":
      h = {
        x: u,
        y: o.y - r.height
      };
      break;
    case "bottom":
      h = {
        x: u,
        y: o.y + o.height
      };
      break;
    case "right":
      h = {
        x: o.x + o.width,
        y: d
      };
      break;
    case "left":
      h = {
        x: o.x - r.width,
        y: d
      };
      break;
    default:
      h = {
        x: o.x,
        y: o.y
      };
  }
  switch (wn(t)) {
    case "start":
      h[a] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      h[a] += f * (n && l ? -1 : 1);
      break;
  }
  return h;
}
const Bf = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: s = [],
    platform: a
  } = n, i = s.filter(Boolean), c = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let l = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: u,
    y: d
  } = ta(l, o, c), f = o, h = {}, g = 0;
  for (let p = 0; p < i.length; p++) {
    const {
      name: b,
      fn: v
    } = i[p], {
      x: N,
      y,
      data: E,
      reset: k
    } = await v({
      x: u,
      y: d,
      initialPlacement: o,
      placement: f,
      strategy: r,
      middlewareData: h,
      rects: l,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = N ?? u, d = y ?? d, h = {
      ...h,
      [b]: {
        ...h[b],
        ...E
      }
    }, k && g <= 50 && (g++, typeof k == "object" && (k.placement && (f = k.placement), k.rects && (l = k.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : k.rects), {
      x: u,
      y: d
    } = ta(l, f, c)), p = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: r,
    middlewareData: h
  };
};
async function Un(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: s,
    rects: a,
    elements: i,
    strategy: c
  } = e, {
    boundary: l = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: f = !1,
    padding: h = 0
  } = bt(t, e), g = Tc(h), b = i[f ? d === "floating" ? "reference" : "floating" : d], v = qo(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(b))) == null || n ? b : b.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), N = d === "floating" ? {
    x: o,
    y: r,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, y = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)), E = await (s.isElement == null ? void 0 : s.isElement(y)) ? await (s.getScale == null ? void 0 : s.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, k = qo(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: N,
    offsetParent: y,
    strategy: c
  }) : N);
  return {
    top: (v.top - k.top + g.top) / E.y,
    bottom: (k.bottom - v.bottom + g.bottom) / E.y,
    left: (v.left - k.left + g.left) / E.x,
    right: (k.right - v.right + g.right) / E.x
  };
}
const Hf = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: s,
      platform: a,
      elements: i,
      middlewareData: c
    } = t, {
      element: l,
      padding: u = 0
    } = bt(e, t) || {};
    if (l == null)
      return {};
    const d = Tc(u), f = {
      x: n,
      y: o
    }, h = Zs(r), g = Xs(h), p = await a.getDimensions(l), b = h === "y", v = b ? "top" : "left", N = b ? "bottom" : "right", y = b ? "clientHeight" : "clientWidth", E = s.reference[g] + s.reference[h] - f[h] - s.floating[g], k = f[h] - s.reference[h], w = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(l));
    let S = w ? w[y] : 0;
    (!S || !await (a.isElement == null ? void 0 : a.isElement(w))) && (S = i.floating[y] || s.floating[g]);
    const x = E / 2 - k / 2, C = S / 2 - p[g] / 2 - 1, M = Pt(d[v], C), D = Pt(d[N], C), P = M, R = S - p[g] - D, L = S / 2 - p[g] / 2 + x, $ = as(P, L, R), O = !c.arrow && wn(r) != null && L !== $ && s.reference[g] / 2 - (L < P ? M : D) - p[g] / 2 < 0, K = O ? L < P ? L - P : L - R : 0;
    return {
      [h]: f[h] + K,
      data: {
        [h]: $,
        centerOffset: L - $ - K,
        ...O && {
          alignmentOffset: K
        }
      },
      reset: O
    };
  }
}), Ff = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        middlewareData: s,
        rects: a,
        initialPlacement: i,
        platform: c,
        elements: l
      } = t, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: p = !0,
        ...b
      } = bt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = vt(r), N = tt(i), y = vt(i) === i, E = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), k = f || (y || !p ? [Go(i)] : Rf(i)), w = g !== "none";
      !f && w && k.push(...$f(i, p, g, E));
      const S = [i, ...k], x = await Un(t, b), C = [];
      let M = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (u && C.push(x[v]), d) {
        const L = If(r, a, E);
        C.push(x[L[0]], x[L[1]]);
      }
      if (M = [...M, {
        placement: r,
        overflows: C
      }], !C.every((L) => L <= 0)) {
        var D, P;
        const L = (((D = s.flip) == null ? void 0 : D.index) || 0) + 1, $ = S[L];
        if ($ && (!(d === "alignment" ? N !== tt($) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        M.every((I) => tt(I.placement) === N ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: L,
              overflows: M
            },
            reset: {
              placement: $
            }
          };
        let O = (P = M.filter((K) => K.overflows[0] <= 0).sort((K, I) => K.overflows[1] - I.overflows[1])[0]) == null ? void 0 : P.placement;
        if (!O)
          switch (h) {
            case "bestFit": {
              var R;
              const K = (R = M.filter((I) => {
                if (w) {
                  const A = tt(I.placement);
                  return A === N || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  A === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((A) => A > 0).reduce((A, _) => A + _, 0)]).sort((I, A) => I[1] - A[1])[0]) == null ? void 0 : R[0];
              K && (O = K);
              break;
            }
            case "initialPlacement":
              O = i;
              break;
          }
        if (r !== O)
          return {
            reset: {
              placement: O
            }
          };
      }
      return {};
    }
  };
};
function na(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function oa(e) {
  return Mf.some((t) => e[t] >= 0);
}
const zf = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: o = "referenceHidden",
        ...r
      } = bt(e, t);
      switch (o) {
        case "referenceHidden": {
          const s = await Un(t, {
            ...r,
            elementContext: "reference"
          }), a = na(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: oa(a)
            }
          };
        }
        case "escaped": {
          const s = await Un(t, {
            ...r,
            altBoundary: !0
          }), a = na(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: oa(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Sc = /* @__PURE__ */ new Set(["left", "top"]);
async function Uf(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), a = vt(n), i = wn(n), c = tt(n) === "y", l = Sc.has(a) ? -1 : 1, u = s && c ? -1 : 1, d = bt(t, e);
  let {
    mainAxis: f,
    crossAxis: h,
    alignmentAxis: g
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return i && typeof g == "number" && (h = i === "end" ? g * -1 : g), c ? {
    x: h * u,
    y: f * l
  } : {
    x: f * l,
    y: h * u
  };
}
const Yf = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: s,
        placement: a,
        middlewareData: i
      } = t, c = await Uf(t, e);
      return a === ((n = i.offset) == null ? void 0 : n.placement) && (o = i.arrow) != null && o.alignmentOffset ? {} : {
        x: r + c.x,
        y: s + c.y,
        data: {
          ...c,
          placement: a
        }
      };
    }
  };
}, jf = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: r
      } = t, {
        mainAxis: s = !0,
        crossAxis: a = !1,
        limiter: i = {
          fn: (b) => {
            let {
              x: v,
              y: N
            } = b;
            return {
              x: v,
              y: N
            };
          }
        },
        ...c
      } = bt(e, t), l = {
        x: n,
        y: o
      }, u = await Un(t, c), d = tt(vt(r)), f = qs(d);
      let h = l[f], g = l[d];
      if (s) {
        const b = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", N = h + u[b], y = h - u[v];
        h = as(N, h, y);
      }
      if (a) {
        const b = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", N = g + u[b], y = g - u[v];
        g = as(N, g, y);
      }
      const p = i.fn({
        ...t,
        [f]: h,
        [d]: g
      });
      return {
        ...p,
        data: {
          x: p.x - n,
          y: p.y - o,
          enabled: {
            [f]: s,
            [d]: a
          }
        }
      };
    }
  };
}, Vf = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: o,
        placement: r,
        rects: s,
        middlewareData: a
      } = t, {
        offset: i = 0,
        mainAxis: c = !0,
        crossAxis: l = !0
      } = bt(e, t), u = {
        x: n,
        y: o
      }, d = tt(r), f = qs(d);
      let h = u[f], g = u[d];
      const p = bt(i, t), b = typeof p == "number" ? {
        mainAxis: p,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...p
      };
      if (c) {
        const y = f === "y" ? "height" : "width", E = s.reference[f] - s.floating[y] + b.mainAxis, k = s.reference[f] + s.reference[y] - b.mainAxis;
        h < E ? h = E : h > k && (h = k);
      }
      if (l) {
        var v, N;
        const y = f === "y" ? "width" : "height", E = Sc.has(vt(r)), k = s.reference[d] - s.floating[y] + (E && ((v = a.offset) == null ? void 0 : v[d]) || 0) + (E ? 0 : b.crossAxis), w = s.reference[d] + s.reference[y] + (E ? 0 : ((N = a.offset) == null ? void 0 : N[d]) || 0) - (E ? b.crossAxis : 0);
        g < k ? g = k : g > w && (g = w);
      }
      return {
        [f]: h,
        [d]: g
      };
    }
  };
}, Kf = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        rects: s,
        platform: a,
        elements: i
      } = t, {
        apply: c = () => {
        },
        ...l
      } = bt(e, t), u = await Un(t, l), d = vt(r), f = wn(r), h = tt(r) === "y", {
        width: g,
        height: p
      } = s.floating;
      let b, v;
      d === "top" || d === "bottom" ? (b = d, v = f === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = d, b = f === "end" ? "top" : "bottom");
      const N = p - u.top - u.bottom, y = g - u.left - u.right, E = Pt(p - u[b], N), k = Pt(g - u[v], y), w = !t.middlewareData.shift;
      let S = E, x = k;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (x = y), (o = t.middlewareData.shift) != null && o.enabled.y && (S = N), w && !f) {
        const M = $e(u.left, 0), D = $e(u.right, 0), P = $e(u.top, 0), R = $e(u.bottom, 0);
        h ? x = g - 2 * (M !== 0 || D !== 0 ? M + D : $e(u.left, u.right)) : S = p - 2 * (P !== 0 || R !== 0 ? P + R : $e(u.top, u.bottom));
      }
      await c({
        ...t,
        availableWidth: x,
        availableHeight: S
      });
      const C = await a.getDimensions(i.floating);
      return g !== C.width || p !== C.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ur() {
  return typeof window < "u";
}
function Cn(e) {
  return Mc(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function We(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function st(e) {
  var t;
  return (t = (Mc(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Mc(e) {
  return ur() ? e instanceof Node || e instanceof We(e).Node : !1;
}
function Xe(e) {
  return ur() ? e instanceof Element || e instanceof We(e).Element : !1;
}
function rt(e) {
  return ur() ? e instanceof HTMLElement || e instanceof We(e).HTMLElement : !1;
}
function ra(e) {
  return !ur() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof We(e).ShadowRoot;
}
const Gf = /* @__PURE__ */ new Set(["inline", "contents"]);
function Xn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = Ze(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !Gf.has(r);
}
const qf = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Xf(e) {
  return qf.has(Cn(e));
}
const Zf = [":popover-open", ":modal"];
function dr(e) {
  return Zf.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Qf = ["transform", "translate", "scale", "rotate", "perspective"], Jf = ["transform", "translate", "scale", "rotate", "perspective", "filter"], eh = ["paint", "layout", "strict", "content"];
function Qs(e) {
  const t = Js(), n = Xe(e) ? Ze(e) : e;
  return Qf.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Jf.some((o) => (n.willChange || "").includes(o)) || eh.some((o) => (n.contain || "").includes(o));
}
function th(e) {
  let t = It(e);
  for (; rt(t) && !pn(t); ) {
    if (Qs(t))
      return t;
    if (dr(t))
      return null;
    t = It(t);
  }
  return null;
}
function Js() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const nh = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function pn(e) {
  return nh.has(Cn(e));
}
function Ze(e) {
  return We(e).getComputedStyle(e);
}
function mr(e) {
  return Xe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function It(e) {
  if (Cn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ra(e) && e.host || // Fallback.
    st(e)
  );
  return ra(t) ? t.host : t;
}
function Dc(e) {
  const t = It(e);
  return pn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : rt(t) && Xn(t) ? t : Dc(t);
}
function Yn(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = Dc(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), a = We(r);
  if (s) {
    const i = ls(a);
    return t.concat(a, a.visualViewport || [], Xn(r) ? r : [], i && n ? Yn(i) : []);
  }
  return t.concat(r, Yn(r, [], n));
}
function ls(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ac(e) {
  const t = Ze(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = rt(e), s = r ? e.offsetWidth : n, a = r ? e.offsetHeight : o, i = Ko(n) !== s || Ko(o) !== a;
  return i && (n = s, o = a), {
    width: n,
    height: o,
    $: i
  };
}
function ei(e) {
  return Xe(e) ? e : e.contextElement;
}
function an(e) {
  const t = ei(e);
  if (!rt(t))
    return ot(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: s
  } = Ac(t);
  let a = (s ? Ko(n.width) : n.width) / o, i = (s ? Ko(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const oh = /* @__PURE__ */ ot(0);
function Pc(e) {
  const t = We(e);
  return !Js() || !t.visualViewport ? oh : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function rh(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== We(e) ? !1 : t;
}
function Ut(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), s = ei(e);
  let a = ot(1);
  t && (o ? Xe(o) && (a = an(o)) : a = an(e));
  const i = rh(s, n, o) ? Pc(s) : ot(0);
  let c = (r.left + i.x) / a.x, l = (r.top + i.y) / a.y, u = r.width / a.x, d = r.height / a.y;
  if (s) {
    const f = We(s), h = o && Xe(o) ? We(o) : o;
    let g = f, p = ls(g);
    for (; p && o && h !== g; ) {
      const b = an(p), v = p.getBoundingClientRect(), N = Ze(p), y = v.left + (p.clientLeft + parseFloat(N.paddingLeft)) * b.x, E = v.top + (p.clientTop + parseFloat(N.paddingTop)) * b.y;
      c *= b.x, l *= b.y, u *= b.x, d *= b.y, c += y, l += E, g = We(p), p = ls(g);
    }
  }
  return qo({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function fr(e, t) {
  const n = mr(e).scrollLeft;
  return t ? t.left + n : Ut(st(e)).left + n;
}
function Ic(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - fr(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function sh(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const s = r === "fixed", a = st(o), i = t ? dr(t.floating) : !1;
  if (o === a || i && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = ot(1);
  const u = ot(0), d = rt(o);
  if ((d || !d && !s) && ((Cn(o) !== "body" || Xn(a)) && (c = mr(o)), rt(o))) {
    const h = Ut(o);
    l = an(o), u.x = h.x + o.clientLeft, u.y = h.y + o.clientTop;
  }
  const f = a && !d && !s ? Ic(a, c) : ot(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
  };
}
function ih(e) {
  return Array.from(e.getClientRects());
}
function ah(e) {
  const t = st(e), n = mr(e), o = e.ownerDocument.body, r = $e(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), s = $e(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + fr(e);
  const i = -n.scrollTop;
  return Ze(o).direction === "rtl" && (a += $e(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: s,
    x: a,
    y: i
  };
}
const sa = 25;
function ch(e, t) {
  const n = We(e), o = st(e), r = n.visualViewport;
  let s = o.clientWidth, a = o.clientHeight, i = 0, c = 0;
  if (r) {
    s = r.width, a = r.height;
    const u = Js();
    (!u || u && t === "fixed") && (i = r.offsetLeft, c = r.offsetTop);
  }
  const l = fr(o);
  if (l <= 0) {
    const u = o.ownerDocument, d = u.body, f = getComputedStyle(d), h = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, g = Math.abs(o.clientWidth - d.clientWidth - h);
    g <= sa && (s -= g);
  } else l <= sa && (s += l);
  return {
    width: s,
    height: a,
    x: i,
    y: c
  };
}
const lh = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function uh(e, t) {
  const n = Ut(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = rt(e) ? an(e) : ot(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, c = r * s.x, l = o * s.y;
  return {
    width: a,
    height: i,
    x: c,
    y: l
  };
}
function ia(e, t, n) {
  let o;
  if (t === "viewport")
    o = ch(e, n);
  else if (t === "document")
    o = ah(st(e));
  else if (Xe(t))
    o = uh(t, n);
  else {
    const r = Pc(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return qo(o);
}
function Rc(e, t) {
  const n = It(e);
  return n === t || !Xe(n) || pn(n) ? !1 : Ze(n).position === "fixed" || Rc(n, t);
}
function dh(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = Yn(e, [], !1).filter((i) => Xe(i) && Cn(i) !== "body"), r = null;
  const s = Ze(e).position === "fixed";
  let a = s ? It(e) : e;
  for (; Xe(a) && !pn(a); ) {
    const i = Ze(a), c = Qs(a);
    !c && i.position === "fixed" && (r = null), (s ? !c && !r : !c && i.position === "static" && !!r && lh.has(r.position) || Xn(a) && !c && Rc(e, a)) ? o = o.filter((u) => u !== a) : r = i, a = It(a);
  }
  return t.set(e, o), o;
}
function mh(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const a = [...n === "clippingAncestors" ? dr(t) ? [] : dh(t, this._c) : [].concat(n), o], i = a[0], c = a.reduce((l, u) => {
    const d = ia(t, u, r);
    return l.top = $e(d.top, l.top), l.right = Pt(d.right, l.right), l.bottom = Pt(d.bottom, l.bottom), l.left = $e(d.left, l.left), l;
  }, ia(t, i, r));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function fh(e) {
  const {
    width: t,
    height: n
  } = Ac(e);
  return {
    width: t,
    height: n
  };
}
function hh(e, t, n) {
  const o = rt(t), r = st(t), s = n === "fixed", a = Ut(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = ot(0);
  function l() {
    c.x = fr(r);
  }
  if (o || !o && !s)
    if ((Cn(t) !== "body" || Xn(r)) && (i = mr(t)), o) {
      const h = Ut(t, !0, s, t);
      c.x = h.x + t.clientLeft, c.y = h.y + t.clientTop;
    } else r && l();
  s && !o && r && l();
  const u = r && !o && !s ? Ic(r, i) : ot(0), d = a.left + i.scrollLeft - c.x - u.x, f = a.top + i.scrollTop - c.y - u.y;
  return {
    x: d,
    y: f,
    width: a.width,
    height: a.height
  };
}
function $r(e) {
  return Ze(e).position === "static";
}
function aa(e, t) {
  if (!rt(e) || Ze(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return st(e) === n && (n = n.ownerDocument.body), n;
}
function Lc(e, t) {
  const n = We(e);
  if (dr(e))
    return n;
  if (!rt(e)) {
    let r = It(e);
    for (; r && !pn(r); ) {
      if (Xe(r) && !$r(r))
        return r;
      r = It(r);
    }
    return n;
  }
  let o = aa(e, t);
  for (; o && Xf(o) && $r(o); )
    o = aa(o, t);
  return o && pn(o) && $r(o) && !Qs(o) ? n : o || th(e) || n;
}
const ph = async function(e) {
  const t = this.getOffsetParent || Lc, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: hh(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function gh(e) {
  return Ze(e).direction === "rtl";
}
const bh = {
  convertOffsetParentRelativeRectToViewportRelativeRect: sh,
  getDocumentElement: st,
  getClippingRect: mh,
  getOffsetParent: Lc,
  getElementRects: ph,
  getClientRects: ih,
  getDimensions: fh,
  getScale: an,
  isElement: Xe,
  isRTL: gh
};
function Oc(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function vh(e, t) {
  let n = null, o;
  const r = st(e);
  function s() {
    var i;
    clearTimeout(o), (i = n) == null || i.disconnect(), n = null;
  }
  function a(i, c) {
    i === void 0 && (i = !1), c === void 0 && (c = 1), s();
    const l = e.getBoundingClientRect(), {
      left: u,
      top: d,
      width: f,
      height: h
    } = l;
    if (i || t(), !f || !h)
      return;
    const g = wo(d), p = wo(r.clientWidth - (u + f)), b = wo(r.clientHeight - (d + h)), v = wo(u), y = {
      rootMargin: -g + "px " + -p + "px " + -b + "px " + -v + "px",
      threshold: $e(0, Pt(1, c)) || 1
    };
    let E = !0;
    function k(w) {
      const S = w[0].intersectionRatio;
      if (S !== c) {
        if (!E)
          return a();
        S ? a(!1, S) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !Oc(l, e.getBoundingClientRect()) && a(), E = !1;
    }
    try {
      n = new IntersectionObserver(k, {
        ...y,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(k, y);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function Nh(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = o, l = ei(e), u = r || s ? [...l ? Yn(l) : [], ...Yn(t)] : [];
  u.forEach((v) => {
    r && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const d = l && i ? vh(l, n) : null;
  let f = -1, h = null;
  a && (h = new ResizeObserver((v) => {
    let [N] = v;
    N && N.target === l && h && (h.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var y;
      (y = h) == null || y.observe(t);
    })), n();
  }), l && !c && h.observe(l), h.observe(t));
  let g, p = c ? Ut(e) : null;
  c && b();
  function b() {
    const v = Ut(e);
    p && !Oc(p, v) && n(), p = v, g = requestAnimationFrame(b);
  }
  return n(), () => {
    var v;
    u.forEach((N) => {
      r && N.removeEventListener("scroll", n), s && N.removeEventListener("resize", n);
    }), d?.(), (v = h) == null || v.disconnect(), h = null, c && cancelAnimationFrame(g);
  };
}
const yh = Yf, kh = jf, xh = Ff, wh = Kf, Ch = zf, ca = Hf, Eh = Vf, Th = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: bh,
    ...n
  }, s = {
    ...r.platform,
    _c: o
  };
  return Bf(e, t, {
    ...r,
    platform: s
  });
};
var Sh = typeof document < "u", Mh = function() {
}, Ho = Sh ? rr : Mh;
function Xo(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, o, r;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (o = n; o-- !== 0; )
        if (!Xo(e[o], t[o]))
          return !1;
      return !0;
    }
    if (r = Object.keys(e), n = r.length, n !== Object.keys(t).length)
      return !1;
    for (o = n; o-- !== 0; )
      if (!{}.hasOwnProperty.call(t, r[o]))
        return !1;
    for (o = n; o-- !== 0; ) {
      const s = r[o];
      if (!(s === "_owner" && e.$$typeof) && !Xo(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function _c(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function la(e, t) {
  const n = _c(e);
  return Math.round(t * n) / n;
}
function Wr(e) {
  const t = T.useRef(e);
  return Ho(() => {
    t.current = e;
  }), t;
}
function Dh(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: o = [],
    platform: r,
    elements: {
      reference: s,
      floating: a
    } = {},
    transform: i = !0,
    whileElementsMounted: c,
    open: l
  } = e, [u, d] = T.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, h] = T.useState(o);
  Xo(f, o) || h(o);
  const [g, p] = T.useState(null), [b, v] = T.useState(null), N = T.useCallback((I) => {
    I !== w.current && (w.current = I, p(I));
  }, []), y = T.useCallback((I) => {
    I !== S.current && (S.current = I, v(I));
  }, []), E = s || g, k = a || b, w = T.useRef(null), S = T.useRef(null), x = T.useRef(u), C = c != null, M = Wr(c), D = Wr(r), P = Wr(l), R = T.useCallback(() => {
    if (!w.current || !S.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    D.current && (I.platform = D.current), Th(w.current, S.current, I).then((A) => {
      const _ = {
        ...A,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: P.current !== !1
      };
      L.current && !Xo(x.current, _) && (x.current = _, hc.flushSync(() => {
        d(_);
      }));
    });
  }, [f, t, n, D, P]);
  Ho(() => {
    l === !1 && x.current.isPositioned && (x.current.isPositioned = !1, d((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [l]);
  const L = T.useRef(!1);
  Ho(() => (L.current = !0, () => {
    L.current = !1;
  }), []), Ho(() => {
    if (E && (w.current = E), k && (S.current = k), E && k) {
      if (M.current)
        return M.current(E, k, R);
      R();
    }
  }, [E, k, R, M, C]);
  const $ = T.useMemo(() => ({
    reference: w,
    floating: S,
    setReference: N,
    setFloating: y
  }), [N, y]), O = T.useMemo(() => ({
    reference: E,
    floating: k
  }), [E, k]), K = T.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!O.floating)
      return I;
    const A = la(O.floating, u.x), _ = la(O.floating, u.y);
    return i ? {
      ...I,
      transform: "translate(" + A + "px, " + _ + "px)",
      ..._c(O.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: A,
      top: _
    };
  }, [n, i, O.floating, u.x, u.y]);
  return T.useMemo(() => ({
    ...u,
    update: R,
    refs: $,
    elements: O,
    floatingStyles: K
  }), [u, R, $, O, K]);
}
const Ah = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: o,
        padding: r
      } = typeof e == "function" ? e(n) : e;
      return o && t(o) ? o.current != null ? ca({
        element: o.current,
        padding: r
      }).fn(n) : {} : o ? ca({
        element: o,
        padding: r
      }).fn(n) : {};
    }
  };
}, Ph = (e, t) => ({
  ...yh(e),
  options: [e, t]
}), Ih = (e, t) => ({
  ...kh(e),
  options: [e, t]
}), Rh = (e, t) => ({
  ...Eh(e),
  options: [e, t]
}), Lh = (e, t) => ({
  ...xh(e),
  options: [e, t]
}), Oh = (e, t) => ({
  ...wh(e),
  options: [e, t]
}), _h = (e, t) => ({
  ...Ch(e),
  options: [e, t]
}), $h = (e, t) => ({
  ...Ah(e),
  options: [e, t]
});
var Wh = "Arrow", $c = T.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...s } = e;
  return /* @__PURE__ */ F(
    Me.svg,
    {
      ...s,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ F("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
$c.displayName = Wh;
var Bh = $c;
function Hh(e) {
  const [t, n] = T.useState(void 0);
  return At(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const s = r[0];
        let a, i;
        if ("borderBoxSize" in s) {
          const c = s.borderBoxSize, l = Array.isArray(c) ? c[0] : c;
          a = l.inlineSize, i = l.blockSize;
        } else
          a = e.offsetWidth, i = e.offsetHeight;
        n({ width: a, height: i });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var ti = "Popper", [Wc, hr] = xn(ti), [Fh, Bc] = Wc(ti), Hc = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = T.useState(null);
  return /* @__PURE__ */ F(Fh, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
Hc.displayName = ti;
var Fc = "PopperAnchor", zc = T.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, s = Bc(Fc, n), a = T.useRef(null), i = Pe(t, a), c = T.useRef(null);
    return T.useEffect(() => {
      const l = c.current;
      c.current = o?.current || a.current, l !== c.current && s.onAnchorChange(c.current);
    }), o ? null : /* @__PURE__ */ F(Me.div, { ...r, ref: i });
  }
);
zc.displayName = Fc;
var ni = "PopperContent", [zh, Uh] = Wc(ni), Uc = T.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: i = 0,
      avoidCollisions: c = !0,
      collisionBoundary: l = [],
      collisionPadding: u = 0,
      sticky: d = "partial",
      hideWhenDetached: f = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: g,
      ...p
    } = e, b = Bc(ni, n), [v, N] = T.useState(null), y = Pe(t, (z) => N(z)), [E, k] = T.useState(null), w = Hh(E), S = w?.width ?? 0, x = w?.height ?? 0, C = o + (s !== "center" ? "-" + s : ""), M = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, D = Array.isArray(l) ? l : [l], P = D.length > 0, R = {
      padding: M,
      boundary: D.filter(jh),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: P
    }, { refs: L, floatingStyles: $, placement: O, isPositioned: K, middlewareData: I } = Dh({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: C,
      whileElementsMounted: (...z) => Nh(...z, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        Ph({ mainAxis: r + x, alignmentAxis: a }),
        c && Ih({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Rh() : void 0,
          ...R
        }),
        c && Lh({ ...R }),
        Oh({
          ...R,
          apply: ({ elements: z, rects: Z, availableWidth: le, availableHeight: ue }) => {
            const { width: ve, height: Ee } = Z.reference, He = z.floating.style;
            He.setProperty("--radix-popper-available-width", `${le}px`), He.setProperty("--radix-popper-available-height", `${ue}px`), He.setProperty("--radix-popper-anchor-width", `${ve}px`), He.setProperty("--radix-popper-anchor-height", `${Ee}px`);
          }
        }),
        E && $h({ element: E, padding: i }),
        Vh({ arrowWidth: S, arrowHeight: x }),
        f && _h({ strategy: "referenceHidden", ...R })
      ]
    }), [A, _] = Vc(O), U = gt(g);
    At(() => {
      K && U?.();
    }, [K, U]);
    const V = I.arrow?.x, G = I.arrow?.y, Q = I.arrow?.centerOffset !== 0, [B, W] = T.useState();
    return At(() => {
      v && W(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ F(
      "div",
      {
        ref: L.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...$,
          transform: K ? $.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: B,
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
        children: /* @__PURE__ */ F(
          zh,
          {
            scope: n,
            placedSide: A,
            onArrowChange: k,
            arrowX: V,
            arrowY: G,
            shouldHideArrow: Q,
            children: /* @__PURE__ */ F(
              Me.div,
              {
                "data-side": A,
                "data-align": _,
                ...p,
                ref: y,
                style: {
                  ...p.style,
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
Uc.displayName = ni;
var Yc = "PopperArrow", Yh = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, jc = T.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = Uh(Yc, o), a = Yh[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ F(
      "span",
      {
        ref: s.onArrowChange,
        style: {
          position: "absolute",
          left: s.arrowX,
          top: s.arrowY,
          [a]: 0,
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
        children: /* @__PURE__ */ F(
          Bh,
          {
            ...r,
            ref: n,
            style: {
              ...r.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
jc.displayName = Yc;
function jh(e) {
  return e !== null;
}
var Vh = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, i = a ? 0 : e.arrowWidth, c = a ? 0 : e.arrowHeight, [l, u] = Vc(n), d = { start: "0%", center: "50%", end: "100%" }[u], f = (r.arrow?.x ?? 0) + i / 2, h = (r.arrow?.y ?? 0) + c / 2;
    let g = "", p = "";
    return l === "bottom" ? (g = a ? d : `${f}px`, p = `${-c}px`) : l === "top" ? (g = a ? d : `${f}px`, p = `${o.floating.height + c}px`) : l === "right" ? (g = `${-c}px`, p = a ? d : `${h}px`) : l === "left" && (g = `${o.floating.width + c}px`, p = a ? d : `${h}px`), { data: { x: g, y: p } };
  }
});
function Vc(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Kc = Hc, Gc = zc, qc = Uc, Xc = jc, Kh = "Portal", oi = T.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, s] = T.useState(!1);
  At(() => s(!0), []);
  const a = n || r && globalThis?.document?.body;
  return a ? Nm.createPortal(/* @__PURE__ */ F(Me.div, { ...o, ref: t }), a) : null;
});
oi.displayName = Kh;
function Gh(e, t) {
  return T.useReducer((n, o) => t[n][o] ?? n, e);
}
var Yt = (e) => {
  const { present: t, children: n } = e, o = qh(t), r = typeof n == "function" ? n({ present: o.isPresent }) : T.Children.only(n), s = Pe(o.ref, Xh(r));
  return typeof n == "function" || o.isPresent ? T.cloneElement(r, { ref: s }) : null;
};
Yt.displayName = "Presence";
function qh(e) {
  const [t, n] = T.useState(), o = T.useRef(null), r = T.useRef(e), s = T.useRef("none"), a = e ? "mounted" : "unmounted", [i, c] = Gh(a, {
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
    const l = Co(o.current);
    s.current = i === "mounted" ? l : "none";
  }, [i]), At(() => {
    const l = o.current, u = r.current;
    if (u !== e) {
      const f = s.current, h = Co(l);
      e ? c("MOUNT") : h === "none" || l?.display === "none" ? c("UNMOUNT") : c(u && f !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, c]), At(() => {
    if (t) {
      let l;
      const u = t.ownerDocument.defaultView ?? window, d = (h) => {
        const p = Co(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && p && (c("ANIMATION_END"), !r.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, f = (h) => {
        h.target === t && (s.current = Co(o.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        u.clearTimeout(l), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: T.useCallback((l) => {
      o.current = l ? getComputedStyle(l) : null, n(l);
    }, [])
  };
}
function Co(e) {
  return e?.animationName || "none";
}
function Xh(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Br = "rovingFocusGroup.onEntryFocus", Zh = { bubbles: !1, cancelable: !0 }, Zn = "RovingFocusGroup", [us, Zc, Qh] = yc(Zn), [Jh, Qc] = xn(
  Zn,
  [Qh]
), [ep, tp] = Jh(Zn), Jc = T.forwardRef(
  (e, t) => /* @__PURE__ */ F(us.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ F(us.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ F(np, { ...e, ref: t }) }) })
);
Jc.displayName = Zn;
var np = T.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: o,
    loop: r = !1,
    dir: s,
    currentTabStopId: a,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: c,
    onEntryFocus: l,
    preventScrollOnEntryFocus: u = !1,
    ...d
  } = e, f = T.useRef(null), h = Pe(t, f), g = kc(s), [p, b] = Ks({
    prop: a,
    defaultProp: i ?? null,
    onChange: c,
    caller: Zn
  }), [v, N] = T.useState(!1), y = gt(l), E = Zc(n), k = T.useRef(!1), [w, S] = T.useState(0);
  return T.useEffect(() => {
    const x = f.current;
    if (x)
      return x.addEventListener(Br, y), () => x.removeEventListener(Br, y);
  }, [y]), /* @__PURE__ */ F(
    ep,
    {
      scope: n,
      orientation: o,
      dir: g,
      loop: r,
      currentTabStopId: p,
      onItemFocus: T.useCallback(
        (x) => b(x),
        [b]
      ),
      onItemShiftTab: T.useCallback(() => N(!0), []),
      onFocusableItemAdd: T.useCallback(
        () => S((x) => x + 1),
        []
      ),
      onFocusableItemRemove: T.useCallback(
        () => S((x) => x - 1),
        []
      ),
      children: /* @__PURE__ */ F(
        Me.div,
        {
          tabIndex: v || w === 0 ? -1 : 0,
          "data-orientation": o,
          ...d,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: se(e.onMouseDown, () => {
            k.current = !0;
          }),
          onFocus: se(e.onFocus, (x) => {
            const C = !k.current;
            if (x.target === x.currentTarget && C && !v) {
              const M = new CustomEvent(Br, Zh);
              if (x.currentTarget.dispatchEvent(M), !M.defaultPrevented) {
                const D = E().filter((O) => O.focusable), P = D.find((O) => O.active), R = D.find((O) => O.id === p), $ = [P, R, ...D].filter(
                  Boolean
                ).map((O) => O.ref.current);
                nl($, u);
              }
            }
            k.current = !1;
          }),
          onBlur: se(e.onBlur, () => N(!1))
        }
      )
    }
  );
}), el = "RovingFocusGroupItem", tl = T.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: o = !0,
      active: r = !1,
      tabStopId: s,
      children: a,
      ...i
    } = e, c = Vo(), l = s || c, u = tp(el, n), d = u.currentTabStopId === l, f = Zc(n), { onFocusableItemAdd: h, onFocusableItemRemove: g, currentTabStopId: p } = u;
    return T.useEffect(() => {
      if (o)
        return h(), () => g();
    }, [o, h, g]), /* @__PURE__ */ F(
      us.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: o,
        active: r,
        children: /* @__PURE__ */ F(
          Me.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": u.orientation,
            ...i,
            ref: t,
            onMouseDown: se(e.onMouseDown, (b) => {
              o ? u.onItemFocus(l) : b.preventDefault();
            }),
            onFocus: se(e.onFocus, () => u.onItemFocus(l)),
            onKeyDown: se(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const v = sp(b, u.orientation, u.dir);
              if (v !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let y = f().filter((E) => E.focusable).map((E) => E.ref.current);
                if (v === "last") y.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && y.reverse();
                  const E = y.indexOf(b.currentTarget);
                  y = u.loop ? ip(y, E + 1) : y.slice(E + 1);
                }
                setTimeout(() => nl(y));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: d, hasTabStop: p != null }) : a
          }
        )
      }
    );
  }
);
tl.displayName = el;
var op = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function rp(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function sp(e, t, n) {
  const o = rp(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return op[o];
}
function nl(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function ip(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var ap = Jc, cp = tl, lp = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Zt = /* @__PURE__ */ new WeakMap(), Eo = /* @__PURE__ */ new WeakMap(), To = {}, Hr = 0, ol = function(e) {
  return e && (e.host || ol(e.parentNode));
}, up = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = ol(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, dp = function(e, t, n, o) {
  var r = up(t, Array.isArray(e) ? e : [e]);
  To[n] || (To[n] = /* @__PURE__ */ new WeakMap());
  var s = To[n], a = [], i = /* @__PURE__ */ new Set(), c = new Set(r), l = function(d) {
    !d || i.has(d) || (i.add(d), l(d.parentNode));
  };
  r.forEach(l);
  var u = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (i.has(f))
        u(f);
      else
        try {
          var h = f.getAttribute(o), g = h !== null && h !== "false", p = (Zt.get(f) || 0) + 1, b = (s.get(f) || 0) + 1;
          Zt.set(f, p), s.set(f, b), a.push(f), p === 1 && g && Eo.set(f, !0), b === 1 && f.setAttribute(n, "true"), g || f.setAttribute(o, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return u(t), i.clear(), Hr++, function() {
    a.forEach(function(d) {
      var f = Zt.get(d) - 1, h = s.get(d) - 1;
      Zt.set(d, f), s.set(d, h), f || (Eo.has(d) || d.removeAttribute(o), Eo.delete(d)), h || d.removeAttribute(n);
    }), Hr--, Hr || (Zt = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ new WeakMap(), Eo = /* @__PURE__ */ new WeakMap(), To = {});
  };
}, mp = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = lp(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), dp(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, et = function() {
  return et = Object.assign || function(t) {
    for (var n, o = 1, r = arguments.length; o < r; o++) {
      n = arguments[o];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, et.apply(this, arguments);
};
function rl(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
  return n;
}
function fp(e, t, n) {
  if (n || arguments.length === 2) for (var o = 0, r = t.length, s; o < r; o++)
    (s || !(o in t)) && (s || (s = Array.prototype.slice.call(t, 0, o)), s[o] = t[o]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Fo = "right-scroll-bar-position", zo = "width-before-scroll-bar", hp = "with-scroll-bars-hidden", pp = "--removed-body-scroll-bar-size";
function Fr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function gp(e, t) {
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
        set current(o) {
          var r = n.value;
          r !== o && (n.value = o, n.callback(o, r));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var bp = typeof window < "u" ? T.useLayoutEffect : T.useEffect, ua = /* @__PURE__ */ new WeakMap();
function vp(e, t) {
  var n = gp(null, function(o) {
    return e.forEach(function(r) {
      return Fr(r, o);
    });
  });
  return bp(function() {
    var o = ua.get(n);
    if (o) {
      var r = new Set(o), s = new Set(e), a = n.current;
      r.forEach(function(i) {
        s.has(i) || Fr(i, null);
      }), s.forEach(function(i) {
        r.has(i) || Fr(i, a);
      });
    }
    ua.set(n, e);
  }, [e]), n;
}
function Np(e) {
  return e;
}
function yp(e, t) {
  t === void 0 && (t = Np);
  var n = [], o = !1, r = {
    read: function() {
      if (o)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(s) {
      var a = t(s, o);
      return n.push(a), function() {
        n = n.filter(function(i) {
          return i !== a;
        });
      };
    },
    assignSyncMedium: function(s) {
      for (o = !0; n.length; ) {
        var a = n;
        n = [], a.forEach(s);
      }
      n = {
        push: function(i) {
          return s(i);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(s) {
      o = !0;
      var a = [];
      if (n.length) {
        var i = n;
        n = [], i.forEach(s), a = n;
      }
      var c = function() {
        var u = a;
        a = [], u.forEach(s);
      }, l = function() {
        return Promise.resolve().then(c);
      };
      l(), n = {
        push: function(u) {
          a.push(u), l();
        },
        filter: function(u) {
          return a = a.filter(u), n;
        }
      };
    }
  };
  return r;
}
function kp(e) {
  e === void 0 && (e = {});
  var t = yp(null);
  return t.options = et({ async: !0, ssr: !1 }, e), t;
}
var sl = function(e) {
  var t = e.sideCar, n = rl(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return T.createElement(o, et({}, n));
};
sl.isSideCarExport = !0;
function xp(e, t) {
  return e.useMedium(t), sl;
}
var il = kp(), zr = function() {
}, pr = T.forwardRef(function(e, t) {
  var n = T.useRef(null), o = T.useState({
    onScrollCapture: zr,
    onWheelCapture: zr,
    onTouchMoveCapture: zr
  }), r = o[0], s = o[1], a = e.forwardProps, i = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, h = e.noRelative, g = e.noIsolation, p = e.inert, b = e.allowPinchZoom, v = e.as, N = v === void 0 ? "div" : v, y = e.gapMode, E = rl(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), k = f, w = vp([n, t]), S = et(et({}, E), r);
  return T.createElement(
    T.Fragment,
    null,
    u && T.createElement(k, { sideCar: il, removeScrollBar: l, shards: d, noRelative: h, noIsolation: g, inert: p, setCallbacks: s, allowPinchZoom: !!b, lockRef: n, gapMode: y }),
    a ? T.cloneElement(T.Children.only(i), et(et({}, S), { ref: w })) : T.createElement(N, et({}, S, { className: c, ref: w }), i)
  );
});
pr.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
pr.classNames = {
  fullWidth: zo,
  zeroRight: Fo
};
var wp = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Cp() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = wp();
  return t && e.setAttribute("nonce", t), e;
}
function Ep(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Tp(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Sp = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Cp()) && (Ep(t, n), Tp(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Mp = function() {
  var e = Sp();
  return function(t, n) {
    T.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, al = function() {
  var e = Mp(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, Dp = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Ur = function(e) {
  return parseInt(e || "", 10) || 0;
}, Ap = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Ur(n), Ur(o), Ur(r)];
}, Pp = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Dp;
  var t = Ap(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, o - n + t[2] - t[0])
  };
}, Ip = al(), cn = "data-scroll-locked", Rp = function(e, t, n, o) {
  var r = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(hp, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(i, "px ").concat(o, `;
  }
  body[`).concat(cn, `] {
    overflow: hidden `).concat(o, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(o, ";"),
    n === "margin" && `
    padding-left: `.concat(r, `px;
    padding-top: `).concat(s, `px;
    padding-right: `).concat(a, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(o, `;
    `),
    n === "padding" && "padding-right: ".concat(i, "px ").concat(o, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Fo, ` {
    right: `).concat(i, "px ").concat(o, `;
  }
  
  .`).concat(zo, ` {
    margin-right: `).concat(i, "px ").concat(o, `;
  }
  
  .`).concat(Fo, " .").concat(Fo, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(zo, " .").concat(zo, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(cn, `] {
    `).concat(pp, ": ").concat(i, `px;
  }
`);
}, da = function() {
  var e = parseInt(document.body.getAttribute(cn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Lp = function() {
  T.useEffect(function() {
    return document.body.setAttribute(cn, (da() + 1).toString()), function() {
      var e = da() - 1;
      e <= 0 ? document.body.removeAttribute(cn) : document.body.setAttribute(cn, e.toString());
    };
  }, []);
}, Op = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  Lp();
  var s = T.useMemo(function() {
    return Pp(r);
  }, [r]);
  return T.createElement(Ip, { styles: Rp(s, !t, r, n ? "" : "!important") });
}, ds = !1;
if (typeof window < "u")
  try {
    var So = Object.defineProperty({}, "passive", {
      get: function() {
        return ds = !0, !0;
      }
    });
    window.addEventListener("test", So, So), window.removeEventListener("test", So, So);
  } catch {
    ds = !1;
  }
var Qt = ds ? { passive: !1 } : !1, _p = function(e) {
  return e.tagName === "TEXTAREA";
}, cl = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !_p(e) && n[t] === "visible")
  );
}, $p = function(e) {
  return cl(e, "overflowY");
}, Wp = function(e) {
  return cl(e, "overflowX");
}, ma = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = ll(e, o);
    if (r) {
      var s = ul(e, o), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return !1;
}, Bp = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [
    t,
    n,
    o
  ];
}, Hp = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [
    t,
    n,
    o
  ];
}, ll = function(e, t) {
  return e === "v" ? $p(t) : Wp(t);
}, ul = function(e, t) {
  return e === "v" ? Bp(t) : Hp(t);
}, Fp = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, zp = function(e, t, n, o, r) {
  var s = Fp(e, window.getComputedStyle(t).direction), a = s * o, i = n.target, c = t.contains(i), l = !1, u = a > 0, d = 0, f = 0;
  do {
    if (!i)
      break;
    var h = ul(e, i), g = h[0], p = h[1], b = h[2], v = p - b - s * g;
    (g || v) && ll(e, i) && (d += v, f += g);
    var N = i.parentNode;
    i = N && N.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? N.host : N;
  } while (
    // portaled content
    !c && i !== document.body || // self content
    c && (t.contains(i) || t === i)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(f) < 1) && (l = !0), l;
}, Mo = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, fa = function(e) {
  return [e.deltaX, e.deltaY];
}, ha = function(e) {
  return e && "current" in e ? e.current : e;
}, Up = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Yp = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, jp = 0, Jt = [];
function Vp(e) {
  var t = T.useRef([]), n = T.useRef([0, 0]), o = T.useRef(), r = T.useState(jp++)[0], s = T.useState(al)[0], a = T.useRef(e);
  T.useEffect(function() {
    a.current = e;
  }, [e]), T.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var p = fp([e.lockRef.current], (e.shards || []).map(ha), !0).filter(Boolean);
      return p.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), p.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = T.useCallback(function(p, b) {
    if ("touches" in p && p.touches.length === 2 || p.type === "wheel" && p.ctrlKey)
      return !a.current.allowPinchZoom;
    var v = Mo(p), N = n.current, y = "deltaX" in p ? p.deltaX : N[0] - v[0], E = "deltaY" in p ? p.deltaY : N[1] - v[1], k, w = p.target, S = Math.abs(y) > Math.abs(E) ? "h" : "v";
    if ("touches" in p && S === "h" && w.type === "range")
      return !1;
    var x = ma(S, w);
    if (!x)
      return !0;
    if (x ? k = S : (k = S === "v" ? "h" : "v", x = ma(S, w)), !x)
      return !1;
    if (!o.current && "changedTouches" in p && (y || E) && (o.current = k), !k)
      return !0;
    var C = o.current || k;
    return zp(C, b, p, C === "h" ? y : E);
  }, []), c = T.useCallback(function(p) {
    var b = p;
    if (!(!Jt.length || Jt[Jt.length - 1] !== s)) {
      var v = "deltaY" in b ? fa(b) : Mo(b), N = t.current.filter(function(k) {
        return k.name === b.type && (k.target === b.target || b.target === k.shadowParent) && Up(k.delta, v);
      })[0];
      if (N && N.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!N) {
        var y = (a.current.shards || []).map(ha).filter(Boolean).filter(function(k) {
          return k.contains(b.target);
        }), E = y.length > 0 ? i(b, y[0]) : !a.current.noIsolation;
        E && b.cancelable && b.preventDefault();
      }
    }
  }, []), l = T.useCallback(function(p, b, v, N) {
    var y = { name: p, delta: b, target: v, should: N, shadowParent: Kp(v) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(E) {
        return E !== y;
      });
    }, 1);
  }, []), u = T.useCallback(function(p) {
    n.current = Mo(p), o.current = void 0;
  }, []), d = T.useCallback(function(p) {
    l(p.type, fa(p), p.target, i(p, e.lockRef.current));
  }, []), f = T.useCallback(function(p) {
    l(p.type, Mo(p), p.target, i(p, e.lockRef.current));
  }, []);
  T.useEffect(function() {
    return Jt.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, Qt), document.addEventListener("touchmove", c, Qt), document.addEventListener("touchstart", u, Qt), function() {
      Jt = Jt.filter(function(p) {
        return p !== s;
      }), document.removeEventListener("wheel", c, Qt), document.removeEventListener("touchmove", c, Qt), document.removeEventListener("touchstart", u, Qt);
    };
  }, []);
  var h = e.removeScrollBar, g = e.inert;
  return T.createElement(
    T.Fragment,
    null,
    g ? T.createElement(s, { styles: Yp(r) }) : null,
    h ? T.createElement(Op, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Kp(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Gp = xp(il, Vp);
var dl = T.forwardRef(function(e, t) {
  return T.createElement(pr, et({}, e, { ref: t, sideCar: Gp }));
});
dl.classNames = pr.classNames;
var ms = ["Enter", " "], qp = ["ArrowDown", "PageUp", "Home"], ml = ["ArrowUp", "PageDown", "End"], Xp = [...qp, ...ml], Zp = {
  ltr: [...ms, "ArrowRight"],
  rtl: [...ms, "ArrowLeft"]
}, Qp = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Qn = "Menu", [jn, Jp, eg] = yc(Qn), [jt, fl] = xn(Qn, [
  eg,
  hr,
  Qc
]), gr = hr(), hl = Qc(), [tg, Vt] = jt(Qn), [ng, Jn] = jt(Qn), pl = (e) => {
  const { __scopeMenu: t, open: n = !1, children: o, dir: r, onOpenChange: s, modal: a = !0 } = e, i = gr(t), [c, l] = T.useState(null), u = T.useRef(!1), d = gt(s), f = kc(r);
  return T.useEffect(() => {
    const h = () => {
      u.current = !0, document.addEventListener("pointerdown", g, { capture: !0, once: !0 }), document.addEventListener("pointermove", g, { capture: !0, once: !0 });
    }, g = () => u.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", g, { capture: !0 }), document.removeEventListener("pointermove", g, { capture: !0 });
    };
  }, []), /* @__PURE__ */ F(Kc, { ...i, children: /* @__PURE__ */ F(
    tg,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: c,
      onContentChange: l,
      children: /* @__PURE__ */ F(
        ng,
        {
          scope: t,
          onClose: T.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: u,
          dir: f,
          modal: a,
          children: o
        }
      )
    }
  ) });
};
pl.displayName = Qn;
var og = "MenuAnchor", ri = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = gr(n);
    return /* @__PURE__ */ F(Gc, { ...r, ...o, ref: t });
  }
);
ri.displayName = og;
var si = "MenuPortal", [rg, gl] = jt(si, {
  forceMount: void 0
}), bl = (e) => {
  const { __scopeMenu: t, forceMount: n, children: o, container: r } = e, s = Vt(si, t);
  return /* @__PURE__ */ F(rg, { scope: t, forceMount: n, children: /* @__PURE__ */ F(Yt, { present: n || s.open, children: /* @__PURE__ */ F(oi, { asChild: !0, container: r, children: o }) }) });
};
bl.displayName = si;
var Ye = "MenuContent", [sg, ii] = jt(Ye), vl = T.forwardRef(
  (e, t) => {
    const n = gl(Ye, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, s = Vt(Ye, e.__scopeMenu), a = Jn(Ye, e.__scopeMenu);
    return /* @__PURE__ */ F(jn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ F(Yt, { present: o || s.open, children: /* @__PURE__ */ F(jn.Slot, { scope: e.__scopeMenu, children: a.modal ? /* @__PURE__ */ F(ig, { ...r, ref: t }) : /* @__PURE__ */ F(ag, { ...r, ref: t }) }) }) });
  }
), ig = T.forwardRef(
  (e, t) => {
    const n = Vt(Ye, e.__scopeMenu), o = T.useRef(null), r = Pe(t, o);
    return T.useEffect(() => {
      const s = o.current;
      if (s) return mp(s);
    }, []), /* @__PURE__ */ F(
      ai,
      {
        ...e,
        ref: r,
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
), ag = T.forwardRef((e, t) => {
  const n = Vt(Ye, e.__scopeMenu);
  return /* @__PURE__ */ F(
    ai,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), cg = /* @__PURE__ */ zn("MenuContent.ScrollLock"), ai = T.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: o = !1,
      trapFocus: r,
      onOpenAutoFocus: s,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: i,
      onEntryFocus: c,
      onEscapeKeyDown: l,
      onPointerDownOutside: u,
      onFocusOutside: d,
      onInteractOutside: f,
      onDismiss: h,
      disableOutsideScroll: g,
      ...p
    } = e, b = Vt(Ye, n), v = Jn(Ye, n), N = gr(n), y = hl(n), E = Jp(n), [k, w] = T.useState(null), S = T.useRef(null), x = Pe(t, S, b.onContentChange), C = T.useRef(0), M = T.useRef(""), D = T.useRef(0), P = T.useRef(null), R = T.useRef("right"), L = T.useRef(0), $ = g ? dl : T.Fragment, O = g ? { as: cg, allowPinchZoom: !0 } : void 0, K = (A) => {
      const _ = M.current + A, U = E().filter((z) => !z.disabled), V = document.activeElement, G = U.find((z) => z.ref.current === V)?.textValue, Q = U.map((z) => z.textValue), B = yg(Q, _, G), W = U.find((z) => z.textValue === B)?.ref.current;
      (function z(Z) {
        M.current = Z, window.clearTimeout(C.current), Z !== "" && (C.current = window.setTimeout(() => z(""), 1e3));
      })(_), W && setTimeout(() => W.focus());
    };
    T.useEffect(() => () => window.clearTimeout(C.current), []), vf();
    const I = T.useCallback((A) => R.current === P.current?.side && xg(A, P.current?.area), []);
    return /* @__PURE__ */ F(
      sg,
      {
        scope: n,
        searchRef: M,
        onItemEnter: T.useCallback(
          (A) => {
            I(A) && A.preventDefault();
          },
          [I]
        ),
        onItemLeave: T.useCallback(
          (A) => {
            I(A) || (S.current?.focus(), w(null));
          },
          [I]
        ),
        onTriggerLeave: T.useCallback(
          (A) => {
            I(A) && A.preventDefault();
          },
          [I]
        ),
        pointerGraceTimerRef: D,
        onPointerGraceIntentChange: T.useCallback((A) => {
          P.current = A;
        }, []),
        children: /* @__PURE__ */ F($, { ...O, children: /* @__PURE__ */ F(
          Cc,
          {
            asChild: !0,
            trapped: r,
            onMountAutoFocus: se(s, (A) => {
              A.preventDefault(), S.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: a,
            children: /* @__PURE__ */ F(
              Gs,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: l,
                onPointerDownOutside: u,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: h,
                children: /* @__PURE__ */ F(
                  ap,
                  {
                    asChild: !0,
                    ...y,
                    dir: v.dir,
                    orientation: "vertical",
                    loop: o,
                    currentTabStopId: k,
                    onCurrentTabStopIdChange: w,
                    onEntryFocus: se(c, (A) => {
                      v.isUsingKeyboardRef.current || A.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ F(
                      qc,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Ll(b.open),
                        "data-radix-menu-content": "",
                        dir: v.dir,
                        ...N,
                        ...p,
                        ref: x,
                        style: { outline: "none", ...p.style },
                        onKeyDown: se(p.onKeyDown, (A) => {
                          const U = A.target.closest("[data-radix-menu-content]") === A.currentTarget, V = A.ctrlKey || A.altKey || A.metaKey, G = A.key.length === 1;
                          U && (A.key === "Tab" && A.preventDefault(), !V && G && K(A.key));
                          const Q = S.current;
                          if (A.target !== Q || !Xp.includes(A.key)) return;
                          A.preventDefault();
                          const W = E().filter((z) => !z.disabled).map((z) => z.ref.current);
                          ml.includes(A.key) && W.reverse(), vg(W);
                        }),
                        onBlur: se(e.onBlur, (A) => {
                          A.currentTarget.contains(A.target) || (window.clearTimeout(C.current), M.current = "");
                        }),
                        onPointerMove: se(
                          e.onPointerMove,
                          Vn((A) => {
                            const _ = A.target, U = L.current !== A.clientX;
                            if (A.currentTarget.contains(_) && U) {
                              const V = A.clientX > L.current ? "right" : "left";
                              R.current = V, L.current = A.clientX;
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
vl.displayName = Ye;
var lg = "MenuGroup", ci = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ F(Me.div, { role: "group", ...o, ref: t });
  }
);
ci.displayName = lg;
var ug = "MenuLabel", Nl = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ F(Me.div, { ...o, ref: t });
  }
);
Nl.displayName = ug;
var Zo = "MenuItem", pa = "menu.itemSelect", br = T.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: o, ...r } = e, s = T.useRef(null), a = Jn(Zo, e.__scopeMenu), i = ii(Zo, e.__scopeMenu), c = Pe(t, s), l = T.useRef(!1), u = () => {
      const d = s.current;
      if (!n && d) {
        const f = new CustomEvent(pa, { bubbles: !0, cancelable: !0 });
        d.addEventListener(pa, (h) => o?.(h), { once: !0 }), Nc(d, f), f.defaultPrevented ? l.current = !1 : a.onClose();
      }
    };
    return /* @__PURE__ */ F(
      yl,
      {
        ...r,
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
          const f = i.searchRef.current !== "";
          n || f && d.key === " " || ms.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
br.displayName = Zo;
var yl = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: o = !1, textValue: r, ...s } = e, a = ii(Zo, n), i = hl(n), c = T.useRef(null), l = Pe(t, c), [u, d] = T.useState(!1), [f, h] = T.useState("");
    return T.useEffect(() => {
      const g = c.current;
      g && h((g.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ F(
      jn.ItemSlot,
      {
        scope: n,
        disabled: o,
        textValue: r ?? f,
        children: /* @__PURE__ */ F(cp, { asChild: !0, ...i, focusable: !o, children: /* @__PURE__ */ F(
          Me.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": o || void 0,
            "data-disabled": o ? "" : void 0,
            ...s,
            ref: l,
            onPointerMove: se(
              e.onPointerMove,
              Vn((g) => {
                o ? a.onItemLeave(g) : (a.onItemEnter(g), g.defaultPrevented || g.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: se(
              e.onPointerLeave,
              Vn((g) => a.onItemLeave(g))
            ),
            onFocus: se(e.onFocus, () => d(!0)),
            onBlur: se(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), dg = "MenuCheckboxItem", kl = T.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: o, ...r } = e;
    return /* @__PURE__ */ F(Tl, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ F(
      br,
      {
        role: "menuitemcheckbox",
        "aria-checked": Qo(n) ? "mixed" : n,
        ...r,
        ref: t,
        "data-state": ui(n),
        onSelect: se(
          r.onSelect,
          () => o?.(Qo(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
kl.displayName = dg;
var xl = "MenuRadioGroup", [mg, fg] = jt(
  xl,
  { value: void 0, onValueChange: () => {
  } }
), wl = T.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: o, ...r } = e, s = gt(o);
    return /* @__PURE__ */ F(mg, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ F(ci, { ...r, ref: t }) });
  }
);
wl.displayName = xl;
var Cl = "MenuRadioItem", El = T.forwardRef(
  (e, t) => {
    const { value: n, ...o } = e, r = fg(Cl, e.__scopeMenu), s = n === r.value;
    return /* @__PURE__ */ F(Tl, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ F(
      br,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...o,
        ref: t,
        "data-state": ui(s),
        onSelect: se(
          o.onSelect,
          () => r.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
El.displayName = Cl;
var li = "MenuItemIndicator", [Tl, hg] = jt(
  li,
  { checked: !1 }
), Sl = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: o, ...r } = e, s = hg(li, n);
    return /* @__PURE__ */ F(
      Yt,
      {
        present: o || Qo(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ F(
          Me.span,
          {
            ...r,
            ref: t,
            "data-state": ui(s.checked)
          }
        )
      }
    );
  }
);
Sl.displayName = li;
var pg = "MenuSeparator", Ml = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ F(
      Me.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...o,
        ref: t
      }
    );
  }
);
Ml.displayName = pg;
var gg = "MenuArrow", Dl = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = gr(n);
    return /* @__PURE__ */ F(Xc, { ...r, ...o, ref: t });
  }
);
Dl.displayName = gg;
var bg = "MenuSub", [l1, Al] = jt(bg), On = "MenuSubTrigger", Pl = T.forwardRef(
  (e, t) => {
    const n = Vt(On, e.__scopeMenu), o = Jn(On, e.__scopeMenu), r = Al(On, e.__scopeMenu), s = ii(On, e.__scopeMenu), a = T.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: c } = s, l = { __scopeMenu: e.__scopeMenu }, u = T.useCallback(() => {
      a.current && window.clearTimeout(a.current), a.current = null;
    }, []);
    return T.useEffect(() => u, [u]), T.useEffect(() => {
      const d = i.current;
      return () => {
        window.clearTimeout(d), c(null);
      };
    }, [i, c]), /* @__PURE__ */ F(ri, { asChild: !0, ...l, children: /* @__PURE__ */ F(
      yl,
      {
        id: r.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": r.contentId,
        "data-state": Ll(n.open),
        ...e,
        ref: lr(t, r.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: se(
          e.onPointerMove,
          Vn((d) => {
            s.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !a.current && (s.onPointerGraceIntentChange(null), a.current = window.setTimeout(() => {
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
              const h = n.content?.dataset.side, g = h === "right", p = g ? -5 : 5, b = f[g ? "left" : "right"], v = f[g ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + p, y: d.clientY },
                  { x: b, y: f.top },
                  { x: v, y: f.top },
                  { x: v, y: f.bottom },
                  { x: b, y: f.bottom }
                ],
                side: h
              }), window.clearTimeout(i.current), i.current = window.setTimeout(
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
          e.disabled || f && d.key === " " || Zp[o.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
Pl.displayName = On;
var Il = "MenuSubContent", Rl = T.forwardRef(
  (e, t) => {
    const n = gl(Ye, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, s = Vt(Ye, e.__scopeMenu), a = Jn(Ye, e.__scopeMenu), i = Al(Il, e.__scopeMenu), c = T.useRef(null), l = Pe(t, c);
    return /* @__PURE__ */ F(jn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ F(Yt, { present: o || s.open, children: /* @__PURE__ */ F(jn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ F(
      ai,
      {
        id: i.contentId,
        "aria-labelledby": i.triggerId,
        ...r,
        ref: l,
        align: "start",
        side: a.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (u) => {
          a.isUsingKeyboardRef.current && c.current?.focus(), u.preventDefault();
        },
        onCloseAutoFocus: (u) => u.preventDefault(),
        onFocusOutside: se(e.onFocusOutside, (u) => {
          u.target !== i.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: se(e.onEscapeKeyDown, (u) => {
          a.onClose(), u.preventDefault();
        }),
        onKeyDown: se(e.onKeyDown, (u) => {
          const d = u.currentTarget.contains(u.target), f = Qp[a.dir].includes(u.key);
          d && f && (s.onOpenChange(!1), i.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
Rl.displayName = Il;
function Ll(e) {
  return e ? "open" : "closed";
}
function Qo(e) {
  return e === "indeterminate";
}
function ui(e) {
  return Qo(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function vg(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Ng(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function yg(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = Ng(e, Math.max(s, 0));
  r.length === 1 && (a = a.filter((l) => l !== n));
  const c = a.find(
    (l) => l.toLowerCase().startsWith(r.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function kg(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], c = t[a], l = i.x, u = i.y, d = c.x, f = c.y;
    u > o != f > o && n < (d - l) * (o - u) / (f - u) + l && (r = !r);
  }
  return r;
}
function xg(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return kg(n, t);
}
function Vn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var wg = pl, Cg = ri, Eg = bl, Tg = vl, Sg = ci, Mg = Nl, Dg = br, Ag = kl, Pg = wl, Ig = El, Rg = Sl, Lg = Ml, Og = Dl, _g = Pl, $g = Rl, vr = "DropdownMenu", [Wg] = xn(
  vr,
  [fl]
), Le = fl(), [Bg, Ol] = Wg(vr), _l = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: o,
    open: r,
    defaultOpen: s,
    onOpenChange: a,
    modal: i = !0
  } = e, c = Le(t), l = T.useRef(null), [u, d] = Ks({
    prop: r,
    defaultProp: s ?? !1,
    onChange: a,
    caller: vr
  });
  return /* @__PURE__ */ F(
    Bg,
    {
      scope: t,
      triggerId: Vo(),
      triggerRef: l,
      contentId: Vo(),
      open: u,
      onOpenChange: d,
      onOpenToggle: T.useCallback(() => d((f) => !f), [d]),
      modal: i,
      children: /* @__PURE__ */ F(wg, { ...c, open: u, onOpenChange: d, dir: o, modal: i, children: n })
    }
  );
};
_l.displayName = vr;
var $l = "DropdownMenuTrigger", Wl = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: o = !1, ...r } = e, s = Ol($l, n), a = Le(n);
    return /* @__PURE__ */ F(Cg, { asChild: !0, ...a, children: /* @__PURE__ */ F(
      Me.button,
      {
        type: "button",
        id: s.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": s.open,
        "aria-controls": s.open ? s.contentId : void 0,
        "data-state": s.open ? "open" : "closed",
        "data-disabled": o ? "" : void 0,
        disabled: o,
        ...r,
        ref: lr(t, s.triggerRef),
        onPointerDown: se(e.onPointerDown, (i) => {
          !o && i.button === 0 && i.ctrlKey === !1 && (s.onOpenToggle(), s.open || i.preventDefault());
        }),
        onKeyDown: se(e.onKeyDown, (i) => {
          o || (["Enter", " "].includes(i.key) && s.onOpenToggle(), i.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
Wl.displayName = $l;
var Hg = "DropdownMenuPortal", Bl = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, o = Le(t);
  return /* @__PURE__ */ F(Eg, { ...o, ...n });
};
Bl.displayName = Hg;
var Hl = "DropdownMenuContent", Fl = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Ol(Hl, n), s = Le(n), a = T.useRef(!1);
    return /* @__PURE__ */ F(
      Tg,
      {
        id: r.contentId,
        "aria-labelledby": r.triggerId,
        ...s,
        ...o,
        ref: t,
        onCloseAutoFocus: se(e.onCloseAutoFocus, (i) => {
          a.current || r.triggerRef.current?.focus(), a.current = !1, i.preventDefault();
        }),
        onInteractOutside: se(e.onInteractOutside, (i) => {
          const c = i.detail.originalEvent, l = c.button === 0 && c.ctrlKey === !0, u = c.button === 2 || l;
          (!r.modal || u) && (a.current = !0);
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
Fl.displayName = Hl;
var Fg = "DropdownMenuGroup", zg = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ F(Sg, { ...r, ...o, ref: t });
  }
);
zg.displayName = Fg;
var Ug = "DropdownMenuLabel", Yg = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ F(Mg, { ...r, ...o, ref: t });
  }
);
Yg.displayName = Ug;
var jg = "DropdownMenuItem", zl = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ F(Dg, { ...r, ...o, ref: t });
  }
);
zl.displayName = jg;
var Vg = "DropdownMenuCheckboxItem", Kg = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(Ag, { ...r, ...o, ref: t });
});
Kg.displayName = Vg;
var Gg = "DropdownMenuRadioGroup", qg = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(Pg, { ...r, ...o, ref: t });
});
qg.displayName = Gg;
var Xg = "DropdownMenuRadioItem", Zg = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(Ig, { ...r, ...o, ref: t });
});
Zg.displayName = Xg;
var Qg = "DropdownMenuItemIndicator", Jg = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(Rg, { ...r, ...o, ref: t });
});
Jg.displayName = Qg;
var eb = "DropdownMenuSeparator", Ul = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(Lg, { ...r, ...o, ref: t });
});
Ul.displayName = eb;
var tb = "DropdownMenuArrow", nb = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ F(Og, { ...r, ...o, ref: t });
  }
);
nb.displayName = tb;
var ob = "DropdownMenuSubTrigger", rb = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(_g, { ...r, ...o, ref: t });
});
rb.displayName = ob;
var sb = "DropdownMenuSubContent", ib = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(
    $g,
    {
      ...r,
      ...o,
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
ib.displayName = sb;
var ab = _l, cb = Wl, lb = Bl, ub = Fl, db = zl, mb = Ul;
function Yl(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = Yl(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function jl() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = Yl(e)) && (o && (o += " "), o += t);
  return o;
}
const di = "-", fb = (e) => {
  const t = pb(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(di);
      return i[0] === "" && i.length !== 1 && i.shift(), Vl(i, t) || hb(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const c = n[a] || [];
      return i && o[a] ? [...c, ...o[a]] : c;
    }
  };
}, Vl = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], o = t.nextPart.get(n), r = o ? Vl(e.slice(1), o) : void 0;
  if (r)
    return r;
  if (t.validators.length === 0)
    return;
  const s = e.join(di);
  return t.validators.find(({
    validator: a
  }) => a(s))?.classGroupId;
}, ga = /^\[(.+)\]$/, hb = (e) => {
  if (ga.test(e)) {
    const t = ga.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, pb = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const r in n)
    fs(n[r], o, r, t);
  return o;
}, fs = (e, t, n, o) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const s = r === "" ? t : ba(t, r);
      s.classGroupId = n;
      return;
    }
    if (typeof r == "function") {
      if (gb(r)) {
        fs(r(o), t, n, o);
        return;
      }
      t.validators.push({
        validator: r,
        classGroupId: n
      });
      return;
    }
    Object.entries(r).forEach(([s, a]) => {
      fs(a, ba(t, s), n, o);
    });
  });
}, ba = (e, t) => {
  let n = e;
  return t.split(di).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}, gb = (e) => e.isThemeGetter, bb = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const r = (s, a) => {
    n.set(s, a), t++, t > e && (t = 0, o = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let a = n.get(s);
      if (a !== void 0)
        return a;
      if ((a = o.get(s)) !== void 0)
        return r(s, a), a;
    },
    set(s, a) {
      n.has(s) ? n.set(s, a) : r(s, a);
    }
  };
}, hs = "!", ps = ":", vb = ps.length, Nb = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const s = [];
    let a = 0, i = 0, c = 0, l;
    for (let g = 0; g < r.length; g++) {
      let p = r[g];
      if (a === 0 && i === 0) {
        if (p === ps) {
          s.push(r.slice(c, g)), c = g + vb;
          continue;
        }
        if (p === "/") {
          l = g;
          continue;
        }
      }
      p === "[" ? a++ : p === "]" ? a-- : p === "(" ? i++ : p === ")" && i--;
    }
    const u = s.length === 0 ? r : r.substring(c), d = yb(u), f = d !== u, h = l && l > c ? l - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: d,
      maybePostfixModifierPosition: h
    };
  };
  if (t) {
    const r = t + ps, s = o;
    o = (a) => a.startsWith(r) ? s(a.substring(r.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: a,
      maybePostfixModifierPosition: void 0
    };
  }
  if (n) {
    const r = o;
    o = (s) => n({
      className: s,
      parseClassName: r
    });
  }
  return o;
}, yb = (e) => e.endsWith(hs) ? e.substring(0, e.length - 1) : e.startsWith(hs) ? e.substring(1) : e, kb = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((o) => [o, !0]));
  return (o) => {
    if (o.length <= 1)
      return o;
    const r = [];
    let s = [];
    return o.forEach((a) => {
      a[0] === "[" || t[a] ? (r.push(...s.sort(), a), s = []) : s.push(a);
    }), r.push(...s.sort()), r;
  };
}, xb = (e) => ({
  cache: bb(e.cacheSize),
  parseClassName: Nb(e),
  sortModifiers: kb(e),
  ...fb(e)
}), wb = /\s+/, Cb = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: s
  } = t, a = [], i = e.trim().split(wb);
  let c = "";
  for (let l = i.length - 1; l >= 0; l -= 1) {
    const u = i[l], {
      isExternal: d,
      modifiers: f,
      hasImportantModifier: h,
      baseClassName: g,
      maybePostfixModifierPosition: p
    } = n(u);
    if (d) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let b = !!p, v = o(b ? g.substring(0, p) : g);
    if (!v) {
      if (!b) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (v = o(g), !v) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      b = !1;
    }
    const N = s(f).join(":"), y = h ? N + hs : N, E = y + v;
    if (a.includes(E))
      continue;
    a.push(E);
    const k = r(v, b);
    for (let w = 0; w < k.length; ++w) {
      const S = k[w];
      a.push(y + S);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Eb() {
  let e = 0, t, n, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Kl(t)) && (o && (o += " "), o += n);
  return o;
}
const Kl = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = Kl(e[o])) && (n && (n += " "), n += t);
  return n;
};
function Tb(e, ...t) {
  let n, o, r, s = a;
  function a(c) {
    const l = t.reduce((u, d) => d(u), e());
    return n = xb(l), o = n.cache.get, r = n.cache.set, s = i, i(c);
  }
  function i(c) {
    const l = o(c);
    if (l)
      return l;
    const u = Cb(c, n);
    return r(c, u), u;
  }
  return function() {
    return s(Eb.apply(null, arguments));
  };
}
const xe = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Gl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ql = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Sb = /^\d+\/\d+$/, Mb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Db = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ab = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Pb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ib = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, en = (e) => Sb.test(e), ae = (e) => !!e && !Number.isNaN(Number(e)), Ct = (e) => !!e && Number.isInteger(Number(e)), Yr = (e) => e.endsWith("%") && ae(e.slice(0, -1)), lt = (e) => Mb.test(e), Rb = () => !0, Lb = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Db.test(e) && !Ab.test(e)
), Xl = () => !1, Ob = (e) => Pb.test(e), _b = (e) => Ib.test(e), $b = (e) => !J(e) && !ee(e), Wb = (e) => En(e, Jl, Xl), J = (e) => Gl.test(e), _t = (e) => En(e, eu, Lb), jr = (e) => En(e, Ub, ae), va = (e) => En(e, Zl, Xl), Bb = (e) => En(e, Ql, _b), Do = (e) => En(e, tu, Ob), ee = (e) => ql.test(e), In = (e) => Tn(e, eu), Hb = (e) => Tn(e, Yb), Na = (e) => Tn(e, Zl), Fb = (e) => Tn(e, Jl), zb = (e) => Tn(e, Ql), Ao = (e) => Tn(e, tu, !0), En = (e, t, n) => {
  const o = Gl.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, Tn = (e, t, n = !1) => {
  const o = ql.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, Zl = (e) => e === "position" || e === "percentage", Ql = (e) => e === "image" || e === "url", Jl = (e) => e === "length" || e === "size" || e === "bg-size", eu = (e) => e === "length", Ub = (e) => e === "number", Yb = (e) => e === "family-name", tu = (e) => e === "shadow", jb = () => {
  const e = xe("color"), t = xe("font"), n = xe("text"), o = xe("font-weight"), r = xe("tracking"), s = xe("leading"), a = xe("breakpoint"), i = xe("container"), c = xe("spacing"), l = xe("radius"), u = xe("shadow"), d = xe("inset-shadow"), f = xe("text-shadow"), h = xe("drop-shadow"), g = xe("blur"), p = xe("perspective"), b = xe("aspect"), v = xe("ease"), N = xe("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], E = () => [
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
  ], k = () => [...E(), ee, J], w = () => ["auto", "hidden", "clip", "visible", "scroll"], S = () => ["auto", "contain", "none"], x = () => [ee, J, c], C = () => [en, "full", "auto", ...x()], M = () => [Ct, "none", "subgrid", ee, J], D = () => ["auto", {
    span: ["full", Ct, ee, J]
  }, Ct, ee, J], P = () => [Ct, "auto", ee, J], R = () => ["auto", "min", "max", "fr", ee, J], L = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], $ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], O = () => ["auto", ...x()], K = () => [en, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...x()], I = () => [e, ee, J], A = () => [...E(), Na, va, {
    position: [ee, J]
  }], _ = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], U = () => ["auto", "cover", "contain", Fb, Wb, {
    size: [ee, J]
  }], V = () => [Yr, In, _t], G = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    ee,
    J
  ], Q = () => ["", ae, In, _t], B = () => ["solid", "dashed", "dotted", "double"], W = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], z = () => [ae, Yr, Na, va], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    ee,
    J
  ], le = () => ["none", ae, ee, J], ue = () => ["none", ae, ee, J], ve = () => [ae, ee, J], Ee = () => [en, "full", ...x()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [lt],
      breakpoint: [lt],
      color: [Rb],
      container: [lt],
      "drop-shadow": [lt],
      ease: ["in", "out", "in-out"],
      font: [$b],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [lt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [lt],
      shadow: [lt],
      spacing: ["px", ae],
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
        aspect: ["auto", "square", en, J, ee, b]
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
        columns: [ae, J, ee, i]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": y()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": y()
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
        object: k()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: w()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": w()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": w()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: S()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": S()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": S()
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
        inset: C()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": C()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": C()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: C()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: C()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: C()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: C()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: C()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: C()
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
        z: [Ct, "auto", ee, J]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [en, "full", "auto", i, ...x()]
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
        flex: [ae, en, "auto", "initial", "none", J]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ae, ee, J]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ae, ee, J]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ct, "first", "last", "none", ee, J]
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
        "col-start": P()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": P()
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
        "row-start": P()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": P()
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
        "auto-cols": R()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": R()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: x()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": x()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": x()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...L(), "normal"]
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
        content: ["normal", ...L()]
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
        "place-content": L()
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
        p: x()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: x()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: x()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: x()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: x()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: x()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: x()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: x()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: x()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: O()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: O()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: O()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: O()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: O()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: O()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: O()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: O()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: O()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": x()
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
        "space-y": x()
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
        w: [i, "screen", ...K()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          i,
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
          i,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [a]
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
        text: ["base", n, In, _t]
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
        font: [o, ee, jr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Yr, J]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Hb, J, t]
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
        tracking: [r, ee, J]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ae, "none", ee, jr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...x()
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
        decoration: [...B(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ae, "from-font", "auto", ee, _t]
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
        "underline-offset": [ae, "auto", ee, J]
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
        indent: x()
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
        bg: U()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ct, ee, J],
          radial: ["", ee, J],
          conic: [Ct, ee, J]
        }, zb, Bb]
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
        border: [...B(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...B(), "hidden", "none"]
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
        outline: [...B(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ae, ee, J]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ae, In, _t]
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
          Ao,
          Do
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
        "inset-shadow": ["none", d, Ao, Do]
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
        "ring-offset": [ae, _t]
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
        "text-shadow": ["none", f, Ao, Do]
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
        opacity: [ae, ee, J]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...W(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": W()
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
        "mask-linear": [ae]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": z()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": z()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": I()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": z()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": z()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": I()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": z()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": z()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": I()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": z()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": z()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": I()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": z()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": z()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": I()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": z()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": z()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": I()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": z()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": z()
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
        "mask-radial-from": z()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": z()
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
        "mask-radial-at": E()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ae]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": z()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": z()
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
        mask: U()
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
        brightness: [ae, ee, J]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ae, ee, J]
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
          h,
          Ao,
          Do
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
        grayscale: ["", ae, ee, J]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ae, ee, J]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ae, ee, J]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ae, ee, J]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ae, ee, J]
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
        "backdrop-brightness": [ae, ee, J]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ae, ee, J]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ae, ee, J]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ae, ee, J]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ae, ee, J]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ae, ee, J]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ae, ee, J]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ae, ee, J]
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
        "border-spacing": x()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": x()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": x()
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
        duration: [ae, "initial", ee, J]
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
        delay: [ae, ee, J]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", N, ee, J]
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
        perspective: [p, ee, J]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": k()
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
        origin: k()
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
        translate: Ee()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Ee()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Ee()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Ee()
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
        "scroll-m": x()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": x()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": x()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": x()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": x()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": x()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": x()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": x()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": x()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": x()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": x()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": x()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": x()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": x()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": x()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": x()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": x()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": x()
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
        stroke: [ae, In, _t, jr]
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
}, Vb = /* @__PURE__ */ Tb(jb);
function re(...e) {
  return Vb(jl(e));
}
function Vr({
  ...e
}) {
  return /* @__PURE__ */ m(ab, { "data-slot": "dropdown-menu", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/ui/dropdown-menu.tsx",
    lineNumber: 10,
    columnNumber: 10
  }, this);
}
function Kr({
  ...e
}) {
  return /* @__PURE__ */ m(
    cb,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 25,
      columnNumber: 5
    },
    this
  );
}
function Gr({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ m(lb, { children: /* @__PURE__ */ m(
    ub,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: re(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 39,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/ui/dropdown-menu.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}
function Ne({
  className: e,
  inset: t,
  variant: n = "default",
  ...o
}) {
  return /* @__PURE__ */ m(
    db,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: re(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...o
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 70,
      columnNumber: 5
    },
    this
  );
}
function qr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    mb,
    {
      "data-slot": "dropdown-menu-separator",
      className: re("bg-border -mx-1 my-1 h-px", e),
      ...t
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 169,
      columnNumber: 5
    },
    this
  );
}
const ya = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ka = jl, Kb = (e, t) => (n) => {
  var o;
  if (t?.variants == null) return ka(e, n?.class, n?.className);
  const { variants: r, defaultVariants: s } = t, a = Object.keys(r).map((l) => {
    const u = n?.[l], d = s?.[l];
    if (u === null) return null;
    const f = ya(u) || ya(d);
    return r[l][f];
  }), i = n && Object.entries(n).reduce((l, u) => {
    let [d, f] = u;
    return f === void 0 || (l[d] = f), l;
  }, {}), c = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((l, u) => {
    let { class: d, className: f, ...h } = u;
    return Object.entries(h).every((g) => {
      let [p, b] = g;
      return Array.isArray(b) ? b.includes({
        ...s,
        ...i
      }[p]) : {
        ...s,
        ...i
      }[p] === b;
    }) ? [
      ...l,
      d,
      f
    ] : l;
  }, []);
  return ka(e, a, c, n?.class, n?.className);
}, gs = Kb(
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
function Mt({
  className: e,
  variant: t,
  size: n,
  asChild: o = !1,
  ...r
}) {
  return /* @__PURE__ */ m(
    o ? tf : "button",
    {
      "data-slot": "button",
      className: re(gs({ variant: t, size: n, className: e })),
      ...r
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/ui/button.tsx",
      lineNumber: 52,
      columnNumber: 5
    },
    this
  );
}
var Gb = Object.freeze({
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
}), qb = "VisuallyHidden", nu = T.forwardRef(
  (e, t) => /* @__PURE__ */ F(
    Me.span,
    {
      ...e,
      ref: t,
      style: { ...Gb, ...e.style }
    }
  )
);
nu.displayName = qb;
var Xb = nu, [Nr] = xn("Tooltip", [
  hr
]), yr = hr(), ou = "TooltipProvider", Zb = 700, bs = "tooltip.open", [Qb, mi] = Nr(ou), ru = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = Zb,
    skipDelayDuration: o = 300,
    disableHoverableContent: r = !1,
    children: s
  } = e, a = T.useRef(!0), i = T.useRef(!1), c = T.useRef(0);
  return T.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ F(
    Qb,
    {
      scope: t,
      isOpenDelayedRef: a,
      delayDuration: n,
      onOpen: T.useCallback(() => {
        window.clearTimeout(c.current), a.current = !1;
      }, []),
      onClose: T.useCallback(() => {
        window.clearTimeout(c.current), c.current = window.setTimeout(
          () => a.current = !0,
          o
        );
      }, [o]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: T.useCallback((l) => {
        i.current = l;
      }, []),
      disableHoverableContent: r,
      children: s
    }
  );
};
ru.displayName = ou;
var Kn = "Tooltip", [Jb, eo] = Nr(Kn), su = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: i
  } = e, c = mi(Kn, e.__scopeTooltip), l = yr(t), [u, d] = T.useState(null), f = Vo(), h = T.useRef(0), g = a ?? c.disableHoverableContent, p = i ?? c.delayDuration, b = T.useRef(!1), [v, N] = Ks({
    prop: o,
    defaultProp: r ?? !1,
    onChange: (S) => {
      S ? (c.onOpen(), document.dispatchEvent(new CustomEvent(bs))) : c.onClose(), s?.(S);
    },
    caller: Kn
  }), y = T.useMemo(() => v ? b.current ? "delayed-open" : "instant-open" : "closed", [v]), E = T.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, b.current = !1, N(!0);
  }, [N]), k = T.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, N(!1);
  }, [N]), w = T.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      b.current = !0, N(!0), h.current = 0;
    }, p);
  }, [p, N]);
  return T.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ F(Kc, { ...l, children: /* @__PURE__ */ F(
    Jb,
    {
      scope: t,
      contentId: f,
      open: v,
      stateAttribute: y,
      trigger: u,
      onTriggerChange: d,
      onTriggerEnter: T.useCallback(() => {
        c.isOpenDelayedRef.current ? w() : E();
      }, [c.isOpenDelayedRef, w, E]),
      onTriggerLeave: T.useCallback(() => {
        g ? k() : (window.clearTimeout(h.current), h.current = 0);
      }, [k, g]),
      onOpen: E,
      onClose: k,
      disableHoverableContent: g,
      children: n
    }
  ) });
};
su.displayName = Kn;
var vs = "TooltipTrigger", iu = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = eo(vs, n), s = mi(vs, n), a = yr(n), i = T.useRef(null), c = Pe(t, i, r.onTriggerChange), l = T.useRef(!1), u = T.useRef(!1), d = T.useCallback(() => l.current = !1, []);
    return T.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ F(Gc, { asChild: !0, ...a, children: /* @__PURE__ */ F(
      Me.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...o,
        ref: c,
        onPointerMove: se(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !u.current && !s.isPointerInTransitRef.current && (r.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: se(e.onPointerLeave, () => {
          r.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: se(e.onPointerDown, () => {
          r.open && r.onClose(), l.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: se(e.onFocus, () => {
          l.current || r.onOpen();
        }),
        onBlur: se(e.onBlur, r.onClose),
        onClick: se(e.onClick, r.onClose)
      }
    ) });
  }
);
iu.displayName = vs;
var fi = "TooltipPortal", [ev, tv] = Nr(fi, {
  forceMount: void 0
}), au = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, s = eo(fi, t);
  return /* @__PURE__ */ F(ev, { scope: t, forceMount: n, children: /* @__PURE__ */ F(Yt, { present: n || s.open, children: /* @__PURE__ */ F(oi, { asChild: !0, container: r, children: o }) }) });
};
au.displayName = fi;
var gn = "TooltipContent", cu = T.forwardRef(
  (e, t) => {
    const n = tv(gn, e.__scopeTooltip), { forceMount: o = n.forceMount, side: r = "top", ...s } = e, a = eo(gn, e.__scopeTooltip);
    return /* @__PURE__ */ F(Yt, { present: o || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ F(lu, { side: r, ...s, ref: t }) : /* @__PURE__ */ F(nv, { side: r, ...s, ref: t }) });
  }
), nv = T.forwardRef((e, t) => {
  const n = eo(gn, e.__scopeTooltip), o = mi(gn, e.__scopeTooltip), r = T.useRef(null), s = Pe(t, r), [a, i] = T.useState(null), { trigger: c, onClose: l } = n, u = r.current, { onPointerInTransitChange: d } = o, f = T.useCallback(() => {
    i(null), d(!1);
  }, [d]), h = T.useCallback(
    (g, p) => {
      const b = g.currentTarget, v = { x: g.clientX, y: g.clientY }, N = iv(v, b.getBoundingClientRect()), y = av(v, N), E = cv(p.getBoundingClientRect()), k = uv([...y, ...E]);
      i(k), d(!0);
    },
    [d]
  );
  return T.useEffect(() => () => f(), [f]), T.useEffect(() => {
    if (c && u) {
      const g = (b) => h(b, u), p = (b) => h(b, c);
      return c.addEventListener("pointerleave", g), u.addEventListener("pointerleave", p), () => {
        c.removeEventListener("pointerleave", g), u.removeEventListener("pointerleave", p);
      };
    }
  }, [c, u, h, f]), T.useEffect(() => {
    if (a) {
      const g = (p) => {
        const b = p.target, v = { x: p.clientX, y: p.clientY }, N = c?.contains(b) || u?.contains(b), y = !lv(v, a);
        N ? f() : y && (f(), l());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [c, u, a, l, f]), /* @__PURE__ */ F(lu, { ...e, ref: s });
}), [ov, rv] = Nr(Kn, { isInside: !1 }), sv = /* @__PURE__ */ of("TooltipContent"), lu = T.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: o,
      "aria-label": r,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...i
    } = e, c = eo(gn, n), l = yr(n), { onClose: u } = c;
    return T.useEffect(() => (document.addEventListener(bs, u), () => document.removeEventListener(bs, u)), [u]), T.useEffect(() => {
      if (c.trigger) {
        const d = (f) => {
          f.target?.contains(c.trigger) && u();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [c.trigger, u]), /* @__PURE__ */ F(
      Gs,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ vm(
          qc,
          {
            "data-state": c.stateAttribute,
            ...l,
            ...i,
            ref: t,
            style: {
              ...i.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ F(sv, { children: o }),
              /* @__PURE__ */ F(ov, { scope: n, isInside: !0, children: /* @__PURE__ */ F(Xb, { id: c.contentId, role: "tooltip", children: r || o }) })
            ]
          }
        )
      }
    );
  }
);
cu.displayName = gn;
var uu = "TooltipArrow", du = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = yr(n);
    return rv(
      uu,
      n
    ).isInside ? null : /* @__PURE__ */ F(Xc, { ...r, ...o, ref: t });
  }
);
du.displayName = uu;
function iv(e, t) {
  const n = Math.abs(t.top - e.y), o = Math.abs(t.bottom - e.y), r = Math.abs(t.right - e.x), s = Math.abs(t.left - e.x);
  switch (Math.min(n, o, r, s)) {
    case s:
      return "left";
    case r:
      return "right";
    case n:
      return "top";
    case o:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function av(e, t, n = 5) {
  const o = [];
  switch (t) {
    case "top":
      o.push(
        { x: e.x - n, y: e.y + n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "bottom":
      o.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x + n, y: e.y - n }
      );
      break;
    case "left":
      o.push(
        { x: e.x + n, y: e.y - n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "right":
      o.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x - n, y: e.y + n }
      );
      break;
  }
  return o;
}
function cv(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: o },
    { x: r, y: o }
  ];
}
function lv(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], c = t[a], l = i.x, u = i.y, d = c.x, f = c.y;
    u > o != f > o && n < (d - l) * (o - u) / (f - u) + l && (r = !r);
  }
  return r;
}
function uv(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), dv(t);
}
function dv(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    for (; t.length >= 2; ) {
      const s = t[t.length - 1], a = t[t.length - 2];
      if ((s.x - a.x) * (r.y - a.y) >= (s.y - a.y) * (r.x - a.x)) t.pop();
      else break;
    }
    t.push(r);
  }
  t.pop();
  const n = [];
  for (let o = e.length - 1; o >= 0; o--) {
    const r = e[o];
    for (; n.length >= 2; ) {
      const s = n[n.length - 1], a = n[n.length - 2];
      if ((s.x - a.x) * (r.y - a.y) >= (s.y - a.y) * (r.x - a.x)) n.pop();
      else break;
    }
    n.push(r);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var mv = ru, fv = su, hv = iu, pv = au, gv = cu, bv = du;
function vv({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ m(
    mv,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/ui/tooltip.tsx",
      lineNumber: 11,
      columnNumber: 5
    },
    this
  );
}
function Ns({
  ...e
}) {
  return /* @__PURE__ */ m(vv, { children: /* @__PURE__ */ m(fv, { "data-slot": "tooltip", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/ui/tooltip.tsx",
    lineNumber: 24,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/ui/tooltip.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
function ys({
  ...e
}) {
  return /* @__PURE__ */ m(hv, { "data-slot": "tooltip-trigger", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/ui/tooltip.tsx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
function ks({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...o
}) {
  return /* @__PURE__ */ m(pv, { children: /* @__PURE__ */ m(
    gv,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: re(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ m(bv, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/ui/tooltip.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/ui/tooltip.tsx",
      lineNumber: 43,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/ui/tooltip.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}
const ye = ({ onClick: e, isActive: t, disabled: n, children: o, tooltip: r }) => {
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
      children: o
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 100,
      columnNumber: 5
    },
    void 0
  );
  return r ? /* @__PURE__ */ m(Ns, { children: [
    /* @__PURE__ */ m(ys, { asChild: !0, children: s }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 120,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ m(ks, { side: "bottom", className: "text-xs", children: r }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 121,
      columnNumber: 9
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 119,
    columnNumber: 7
  }, void 0) : s;
}, tn = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }, void 0, !1, {
  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
  lineNumber: 132,
  columnNumber: 3
}, void 0), Nv = vn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: o, className: r = "", autoReorderChecklist: s = !1, aiEnabled: a = !1, onAISparklesClick: i }) {
  const c = j(null), [l, u] = Y(!1), [d, f] = Y(void 0), h = Ja({
    editor: t,
    selector: ({ editor: w }) => ({
      canUndo: w.can().undo(),
      canRedo: w.can().redo(),
      isBold: w.isActive("bold"),
      isItalic: w.isActive("italic"),
      isUnderline: w.isActive("underline"),
      isStrike: w.isActive("strike"),
      isCode: w.isActive("code"),
      isHighlight: w.isActive("highlight"),
      isH1: w.isActive("heading", { level: 1 }),
      isH2: w.isActive("heading", { level: 2 }),
      isH3: w.isActive("heading", { level: 3 }),
      isH4: w.isActive("heading", { level: 4 }),
      isH5: w.isActive("heading", { level: 5 }),
      isBlockquote: w.isActive("blockquote"),
      isBulletList: w.isActive("bulletList"),
      isOrderedList: w.isActive("orderedList"),
      isTaskList: w.isActive("taskList"),
      isCodeBlock: w.isActive("codeBlock"),
      isLink: w.isActive("link")
    })
  }), g = H(() => {
    const { view: w } = t, { from: S } = w.state.selection, x = w.coordsAtPos(S);
    f({ top: x.bottom + 8, left: x.left }), u(!0);
  }, [t]), p = H((w, S) => {
    t.chain().focus().setImage({ src: w, alt: S }).run(), u(!1);
  }, [t]), b = H(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), v = H((w) => {
    t.chain().focus().insertCallout({ type: w }).run();
  }, [t]), N = j(/* @__PURE__ */ new Map()), y = j(/* @__PURE__ */ new Map()), E = H((w) => {
    const { doc: S, tr: x } = w.state;
    let C = !1;
    const M = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), D = w.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    N.current.clear(), D.forEach((R, L) => {
      R.querySelectorAll(":scope > li").forEach((O) => {
        const K = O, I = (K.textContent || "").trim().substring(0, 50);
        N.current.set(`${L}-${I}`, K.getBoundingClientRect());
      });
    });
    const P = [];
    S.descendants((R, L, $, O) => {
      if (!M.has(R.type.name)) return !0;
      let K = !1;
      if (R.forEach((A) => {
        A.type.name === "taskItem" && (K = !0);
      }), !K) return !0;
      let I = 0;
      return S.nodesBetween(0, L, (A) => (M.has(A.type.name) && I++, !0)), P.push({ node: R, pos: L, depth: I }), !0;
    }), P.sort((R, L) => L.depth - R.depth);
    for (const { node: R, pos: L } of P) {
      const $ = [];
      let O = 0;
      R.forEach((B) => {
        $.push({
          node: B,
          isTask: B.type.name === "taskItem",
          checked: B.type.name === "taskItem" && B.attrs.checked === !0,
          originalIndex: O++
        });
      });
      const K = $.filter((B) => B.isTask && !B.checked), I = $.filter((B) => B.isTask && B.checked), A = [...$], _ = $.map((B, W) => ({ index: W, isTask: B.isTask })).filter((B) => B.isTask).map((B) => B.index), U = [...K, ...I];
      if (_.forEach((B, W) => {
        A[B] = U[W];
      }), !A.some((B, W) => B.node !== $[W].node)) continue;
      const G = R.type.create(
        R.attrs,
        A.map((B) => B.node)
      ), Q = x.mapping.map(L);
      x.replaceWith(Q, Q + R.nodeSize, G), C = !0;
    }
    C && (w.view.dispatch(x), requestAnimationFrame(() => {
      w.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((L) => {
        const $ = L.querySelectorAll(":scope > li"), O = /* @__PURE__ */ new Map();
        N.current.forEach((K, I) => {
          const A = I.replace(/^\d+-/, "");
          O.set(A, K);
        }), $.forEach((K) => {
          const I = K, A = (I.textContent || "").trim().substring(0, 50), _ = O.get(A);
          if (!_) return;
          const U = I.getBoundingClientRect(), V = _.top - U.top;
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
    const w = /* @__PURE__ */ new Map();
    t.state.doc.descendants((x, C) => (x.type.name === "taskItem" && w.set(C, x.attrs.checked === !0), !0)), y.current = w;
    const S = ({ transaction: x }) => {
      if (!x.docChanged) return;
      const C = /* @__PURE__ */ new Map();
      t.state.doc.descendants((P, R) => (P.type.name === "taskItem" && C.set(R, P.attrs.checked === !0), !0));
      const M = y.current;
      let D = !1;
      if (M.size > 0 && C.size > 0) {
        let P = 0, R = 0;
        M.forEach((L) => {
          L && P++;
        }), C.forEach((L) => {
          L && R++;
        }), P !== R && (D = !0);
      }
      y.current = C, D && setTimeout(() => {
        E(t);
      }, 150);
    };
    return t.on("transaction", S), () => {
      t.off("transaction", S);
    };
  }, [t, s, E]);
  const k = H(() => {
    E(t);
  }, [t, E]);
  return /* @__PURE__ */ m("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${r}`, children: [
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !h?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Id, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 384,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 379,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !h?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(Rd, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 391,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 386,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(tn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 394,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: h?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(As, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 402,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 397,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: h?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m(Ps, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 409,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 404,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: h?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(Is, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 416,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 411,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: h?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(Rs, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 423,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 418,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: h?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(nc, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 430,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 425,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: h?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(oc, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 437,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 432,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => o?.(),
        isActive: h?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(Ls, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 444,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 439,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(tn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 447,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(Vr, { children: [
      /* @__PURE__ */ m(Kr, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: `
              flex items-center gap-1 h-8 px-2 rounded-md shrink-0
              transition-all duration-100 ease-out touch-manipulation
              text-xs font-semibold
              ${h?.isH1 || h?.isH2 || h?.isH3 || h?.isH4 || h?.isH5 ? "bg-secondary text-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
            `,
          children: [
            /* @__PURE__ */ m("span", { className: "min-w-[18px] text-center", children: h?.isH1 ? "H1" : h?.isH2 ? "H2" : h?.isH3 ? "H3" : h?.isH4 ? "H4" : h?.isH5 ? "H5" : "P" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 463,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m(Dt, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 466,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 452,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 451,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(Gr, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !h?.isH1 && !h?.isH2 && !h?.isH3 && !h?.isH4 && !h?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 474,
                columnNumber: 13
              }, this),
              "Paragraph"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 470,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: h?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 481,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 1" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 482,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 477,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: h?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 488,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 489,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 484,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: h?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 495,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 3" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 496,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 491,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: h?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 502,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 4" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 503,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 498,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 5 }).run(),
            className: h?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 509,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 510,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 505,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 469,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 450,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(tn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 515,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: h?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(Os, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 523,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 518,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: h?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m(_s, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 530,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 525,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: h?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m($s, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 537,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 532,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: h?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(Ws, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 544,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 539,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: h?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(rc, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 551,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 546,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ m(Ld, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 564,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 553,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(Od, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 577,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 566,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(tn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 580,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: b,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m(rs, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 587,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 583,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: g,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m(Ms, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 593,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 589,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ m(sc, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 599,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 595,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(Vr, { children: [
      /* @__PURE__ */ m(Kr, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ m(jo, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 608,
            columnNumber: 13
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 604,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 603,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(Gr, { align: "start", children: [
        /* @__PURE__ */ m(Ne, { onClick: () => v("info"), children: [
          /* @__PURE__ */ m(jo, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 613,
            columnNumber: 13
          }, this),
          " Info"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 612,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Ne, { onClick: () => v("note"), children: [
          /* @__PURE__ */ m(Bs, { size: 16, className: "mr-2", style: { color: "#FF8200" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 616,
            columnNumber: 13
          }, this),
          " Note"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 615,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Ne, { onClick: () => v("prompt"), children: [
          /* @__PURE__ */ m(_d, { size: 16, className: "mr-2", style: { color: "#B244B3" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 619,
            columnNumber: 13
          }, this),
          " Prompt"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 618,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Ne, { onClick: () => v("resources"), children: [
          /* @__PURE__ */ m($d, { size: 16, className: "mr-2", style: { color: "#63B148" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 622,
            columnNumber: 13
          }, this),
          " Resources"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 621,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Ne, { onClick: () => v("todo"), children: [
          /* @__PURE__ */ m(Hs, { size: 16, className: "mr-2", style: { color: "#4479B3" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 625,
            columnNumber: 13
          }, this),
          " Todo"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 624,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 611,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 602,
      columnNumber: 7
    }, this),
    t.isActive("table") && /* @__PURE__ */ m(Vr, { children: [
      /* @__PURE__ */ m(Kr, { asChild: !0, children: /* @__PURE__ */ m(
        Mt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ m(rs, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 639,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m("span", { className: "text-xs hidden sm:inline", children: "Table" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 640,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 634,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 633,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(Gr, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ m(Wi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 648,
                columnNumber: 15
              }, this),
              " Add Column Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 644,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ m(Wi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 654,
                columnNumber: 15
              }, this),
              " Add Column After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 650,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ m(sn, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 660,
                columnNumber: 15
              }, this),
              " Delete Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 656,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(qr, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 662,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ m(Bi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 667,
                columnNumber: 15
              }, this),
              " Add Row Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 663,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ m(Bi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 673,
                columnNumber: 15
              }, this),
              " Add Row After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 669,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ m(sn, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 679,
                columnNumber: 15
              }, this),
              " Delete Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 675,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(qr, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 681,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ m(Hi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 686,
                columnNumber: 15
              }, this),
              " Toggle Header Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 682,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ m(Hi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 692,
                columnNumber: 15
              }, this),
              " Toggle Header Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 688,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(qr, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 695,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ m(sn, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 701,
                columnNumber: 15
              }, this),
              " Delete Table"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 696,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 643,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 632,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m(
      bc,
      {
        isOpen: l,
        onClose: () => u(!1),
        onInsert: p,
        position: d
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 708,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(tn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 716,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: k,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m(Wd, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 721,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 717,
        columnNumber: 7
      },
      this
    ),
    a && /* @__PURE__ */ m(Ce, { children: [
      /* @__PURE__ */ m(tn, {}, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 727,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(Ns, { children: [
        /* @__PURE__ */ m(ys, { asChild: !0, children: /* @__PURE__ */ m(
          "button",
          {
            ref: c,
            onClick: () => {
              c.current && i?.(c.current);
            },
            className: `
                  flex items-center justify-center w-8 h-8 rounded-md shrink-0
                  transition-all duration-100 ease-out touch-manipulation
                  bg-transparent text-muted-foreground hover:bg-secondary active:bg-secondary/80
                  hover:text-foreground
                `,
            children: /* @__PURE__ */ m(ir, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 744,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 730,
            columnNumber: 15
          },
          this
        ) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 729,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(ks, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 747,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 728,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 726,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m("div", { className: "flex-1 min-w-2" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 755,
      columnNumber: 7
    }, this),
    n && /* @__PURE__ */ m(Ns, { children: [
      /* @__PURE__ */ m(ys, { asChild: !0, children: /* @__PURE__ */ m(
        Mt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ m(Nn, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 767,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m("span", { className: "text-xs hidden md:inline", children: "Copy MD" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 768,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 761,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 760,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(ks, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 771,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 759,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 377,
    columnNumber: 5
  }, this);
});
function yv({ editor: e, isOpen: t, onClose: n, focusTrigger: o = 0, initialSearchQuery: r, editorMode: s = "wysiwyg", rawMarkdown: a = "", onRawMarkdownChange: i, onMatchesChange: c }) {
  const l = s === "markdown", [u, d] = Y(""), [f, h] = Y(""), [g, p] = Y(!1), [b, v] = Y(!1), [N, y] = Y(!1), [E, k] = Y(!1), [w, S] = Y([]), [x, C] = Y(0), [M, D] = Y(null), [P, R] = Y(!1), L = j(!1), $ = j(null), O = j(null), K = j(!1);
  q(() => {
    t && r && r.trim() && d(r);
  }, [t, r, o]);
  const I = H(() => {
    if (!u || !e) {
      S([]), C(0), D(null);
      return;
    }
    const B = [];
    let W;
    try {
      if (b)
        W = new RegExp(u, g ? "g" : "gi");
      else {
        let z = u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        N && (z = `\\b${z}\\b`), W = new RegExp(z, g ? "g" : "gi");
      }
      D(null);
    } catch (z) {
      D(z.message), S([]);
      return;
    }
    if (l) {
      let z;
      for (; (z = W.exec(a)) !== null; )
        B.push({
          from: z.index,
          to: z.index + z[0].length,
          text: z[0]
        });
    } else {
      const { doc: z } = e.state;
      z.descendants((Z, le) => {
        if (Z.isText && Z.text) {
          let ue;
          for (; (ue = W.exec(Z.text)) !== null; )
            B.push({
              from: le + ue.index,
              to: le + ue.index + ue[0].length,
              text: ue[0]
            });
        }
        return !0;
      });
    }
    S(B), B.length > 0 && x >= B.length && C(0);
  }, [u, g, b, N, e, x, l, a]);
  q(() => {
    I();
  }, [I]), q(() => {
    l && c && (t && w.length > 0 ? c(w, x) : c([], 0));
  }, [l, t, w, x, c]), q(() => {
    if (!e) return;
    if (l) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const B = typeof e.commands.setSearchHighlight == "function";
    t && u && B ? e.commands.setSearchHighlight({
      searchTerm: u,
      caseSensitive: g,
      useRegex: b,
      currentMatchIndex: x
    }) : B && e.commands.clearSearchHighlight();
  }, [e, t, u, g, b, x, l, w, a]), q(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), c && c([], 0), L.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), R(!1)), L.current = !1);
  }, [t, e, c]), q(() => {
    if (w.length > 0 && x < w.length) {
      const B = w[x];
      if (l) {
        const z = document.querySelector(".syntax-textarea");
        if (z && K.current) {
          const Z = parseInt(getComputedStyle(z).lineHeight) || 22, ue = a.substring(0, B.from).split(`
`).length;
          z.scrollTop = Math.max(0, (ue - 3) * Z);
        }
        K.current && (K.current = !1);
        return;
      }
      const W = e.view.domAtPos(B.from);
      W.node && W.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), K.current && (K.current = !1);
    }
  }, [x, w, e, l, a]), q(() => {
    t && $.current && ($.current.focus(), $.current.select());
  }, [t, o]);
  const A = H(() => {
    w.length !== 0 && (K.current = !0, C((B) => (B + 1) % w.length));
  }, [w.length]), _ = H(() => {
    w.length !== 0 && (K.current = !0, C((B) => (B - 1 + w.length) % w.length));
  }, [w.length]), U = H(() => {
    if (w.length === 0 || x >= w.length) return;
    const B = w[x];
    if (l && i) {
      const W = a.substring(0, B.from) + f + a.substring(B.to);
      i(W), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: B.from, to: B.to }).deleteSelection().insertContent(f).run(), setTimeout(I, 10);
  }, [w, x, f, e, I, l, a, i]), V = H(() => {
    if (w.length === 0) return;
    if (l && i) {
      const W = [...w].sort((Z, le) => le.from - Z.from);
      let z = a;
      W.forEach((Z) => {
        z = z.substring(0, Z.from) + f + z.substring(Z.to);
      }), i(z), setTimeout(I, 10);
      return;
    }
    const B = [...w].sort((W, z) => z.from - W.from);
    e.chain().focus(), B.forEach((W) => {
      e.chain().setTextSelection({ from: W.from, to: W.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(I, 10);
  }, [w, f, e, I, l, a, i]), G = H(() => {
    if (w.length === 0 || !u || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: u,
      caseSensitive: g,
      useRegex: b,
      wholeWord: N
    }) && (R(!0), L.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [w, u, g, b, N, e, n]), Q = H((B) => {
    B.key === "Enter" ? (B.preventDefault(), B.shiftKey ? _() : A(), $.current?.focus()) : B.key === "Escape" ? (B.preventDefault(), n()) : B.key === "h" && (B.ctrlKey || B.metaKey) ? (B.preventDefault(), k((W) => !W)) : B.key === "l" && (B.ctrlKey || B.metaKey) && B.shiftKey && (B.preventDefault(), G());
  }, [A, _, n, G]);
  return t ? /* @__PURE__ */ m(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: Q,
      children: [
        /* @__PURE__ */ m("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ m("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(Bd, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 381,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                ref: $,
                type: "text",
                placeholder: "Find...",
                value: u,
                onChange: (B) => d(B.target.value),
                className: `find-replace-input ${M ? "has-error" : ""}`
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
                lineNumber: 382,
                columnNumber: 11
              },
              this
            ),
            M && /* @__PURE__ */ m("span", { className: "find-replace-error", title: M, children: "!" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 391,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
            lineNumber: 380,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("span", { className: "find-replace-count", children: w.length > 0 ? `${x + 1} of ${w.length}` : u ? "No results" : "" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
            lineNumber: 396,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: _,
              disabled: w.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ m(Hd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
                lineNumber: 410,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 404,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: A,
              disabled: w.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ m(Dt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
                lineNumber: 418,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 412,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: G,
              disabled: w.length === 0,
              className: `find-replace-btn ${P ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${w.length} matches`,
              children: /* @__PURE__ */ m(Fd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
                lineNumber: 428,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 422,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m("div", { className: "find-replace-separator" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
            lineNumber: 432,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => p((B) => !B),
              className: `find-replace-btn ${g ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ m(zd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
                lineNumber: 440,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 435,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => y((B) => !B),
              className: `find-replace-btn ${N ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ m(Ud, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
                lineNumber: 447,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 442,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => v((B) => !B),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ m(Yd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
                lineNumber: 454,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 449,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => k((B) => !B),
              className: `find-replace-btn ${E ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ m(ss, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
                lineNumber: 463,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 458,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ m(pt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
                lineNumber: 472,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 467,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
          lineNumber: 379,
          columnNumber: 7
        }, this),
        E && /* @__PURE__ */ m("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ m("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(ss, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 480,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                ref: O,
                type: "text",
                placeholder: "Replace with...",
                value: f,
                onChange: (B) => h(B.target.value),
                className: "find-replace-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
                lineNumber: 481,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
            lineNumber: 479,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: U,
              disabled: w.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 491,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: V,
              disabled: w.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ m(jd, { size: 14 }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
                  lineNumber: 505,
                  columnNumber: 13
                }, this),
                "All"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
              lineNumber: 499,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
          lineNumber: 478,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FindReplace.tsx",
      lineNumber: 374,
      columnNumber: 5
    },
    this
  ) : null;
}
const kv = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), ut = kv ? "⌘" : "Ctrl", xv = ({ editor: e }) => {
  const [t, n] = Y(!1), [o, r] = Y(0), [s, a] = Y(0), [i, c] = Y(""), [l, u] = Y(""), [d, f] = Y(!1), [h, g] = Y(!1);
  q(() => {
    if (!e) return;
    const S = () => {
      const C = e.storage.selectAllOccurrences;
      C ? (n(C.isActive), r(C.ranges.length), a(C.allMatches.length), c(C.searchTerm), u(C.typedBuffer), f(C.isTypingReplace), g(C.isIncremental)) : (n(!1), r(0), a(0));
    }, x = () => {
      S();
    };
    return e.on("transaction", x), S(), () => {
      e.off("transaction", x);
    };
  }, [e]);
  const p = H(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), b = H(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), v = H(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), N = H(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), y = H(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), E = H(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), k = H(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), w = H(() => {
    i && (e.commands.selectAllOccurrences({
      searchTerm: i,
      caseSensitive: !1,
      useRegex: !1,
      wholeWord: !1
    }), e.commands.focus());
  }, [e, i]);
  return !t || o === 0 ? null : /* @__PURE__ */ m("div", { className: "select-all-action-bar", children: [
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-inner", children: [
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-count", children: [
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-number", children: h && s > 0 ? `${o}/${s}` : o }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 131,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-label", children: "selected" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 134,
          columnNumber: 11
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 130,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ m(Ce, { children: [
        /* @__PURE__ */ m(sr, { size: 12, className: "select-all-action-bar-preview-icon" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 141,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-old", children: i }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 142,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-arrow", children: "→" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 143,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-new", children: l || "∅" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 144,
          columnNumber: 15
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 140,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ m(Ce, { children: /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        i,
        '"'
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 148,
        columnNumber: 15
      }, void 0) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 147,
        columnNumber: 13
      }, void 0) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 138,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 154,
        columnNumber: 9
      }, void 0),
      h && o < s && /* @__PURE__ */ m(Ce, { children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: k,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${ut}+D)`,
            children: /* @__PURE__ */ m(Fs, { size: 14 }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
              lineNumber: 164,
              columnNumber: 15
            }, void 0)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 159,
            columnNumber: 13
          },
          void 0
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: w,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${ut}+Shift+L)`,
            children: "All"
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 166,
            columnNumber: 13
          },
          void 0
        ),
        /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 173,
          columnNumber: 13
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 158,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: p,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${ut}+B)`,
          children: /* @__PURE__ */ m(As, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 183,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 178,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${ut}+I)`,
          children: /* @__PURE__ */ m(Ps, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 190,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 185,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${ut}+U)`,
          children: /* @__PURE__ */ m(Is, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 197,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 192,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: N,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ m(Rs, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 204,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 199,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 208,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ m(sn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 216,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 211,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: E,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ m(pt, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 225,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 220,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 128,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: h && o < s ? /* @__PURE__ */ m(Ce, { children: [
      /* @__PURE__ */ m("kbd", { children: [
        ut,
        "+D"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 13
      }, void 0),
      " next · ",
      /* @__PURE__ */ m("kbd", { children: [
        ut,
        "+Shift+L"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 42
      }, void 0),
      " all · Type to replace · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 94
      }, void 0),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: [
        ut,
        "+Z"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 119
      }, void 0),
      " undo"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 232,
      columnNumber: 11
    }, void 0) : /* @__PURE__ */ m(Ce, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 35
      }, void 0),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: "Backspace" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 60
      }, void 0),
      " to delete · ",
      /* @__PURE__ */ m("kbd", { children: [
        ut,
        "+Z"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 93
      }, void 0),
      " undo"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 236,
      columnNumber: 11
    }, void 0) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 230,
      columnNumber: 7
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SelectAllActionBar.tsx",
    lineNumber: 127,
    columnNumber: 5
  }, void 0);
}, wv = vn(xv), Po = "-dismissed";
function Cv(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const o = e.charCodeAt(n);
    t = (t << 5) - t + o, t = t & t;
  }
  return t;
}
function Ev(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: o = 1e3,
    enabled: r = !0,
    onSave: s,
    onRecover: a
  } = t, [i, c] = Y({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), l = j(null), u = j(""), d = j(0);
  q(() => {
    if (r && !(!e || e.isDestroyed))
      try {
        const v = localStorage.getItem(n), N = localStorage.getItem(n + Po);
        if (v && !N) {
          let y = "";
          try {
            y = e.getHTML() || "";
          } catch {
            return;
          }
          v !== y && v.length > 50 && c((E) => ({ ...E, hasRecoverableContent: !0 }));
        }
      } catch (v) {
        console.warn("useAutoSave: Error checking for recoverable content", v);
      }
  }, [e, n, r]);
  const f = H(() => {
    if (!(!e || !r || e.isDestroyed))
      try {
        const v = e.getHTML(), N = Cv(v);
        if (N === d.current && v.length === u.current.length) {
          c((y) => ({ ...y, status: "saved" }));
          return;
        }
        if (v.length < 20)
          return;
        c((y) => ({ ...y, status: "saving" })), localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), u.current = v, d.current = N, c((y) => ({
          ...y,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(v), setTimeout(() => {
          c((y) => y.status === "saved" ? { ...y, status: "idle" } : y);
        }, 2e3);
      } catch (v) {
        console.error("useAutoSave: Error saving content", v), c((N) => ({
          ...N,
          status: "error",
          error: v instanceof Error ? v.message : "Failed to save"
        }));
      }
  }, [e, n, r, s]);
  q(() => {
    if (!e || !r || e.isDestroyed) return;
    const v = () => {
      e.isDestroyed || (l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        f();
      }, o));
    };
    return e.on("update", v), () => {
      e.off("update", v), l.current && clearTimeout(l.current);
    };
  }, [e, o, r, f]), q(() => {
    if (!e || !r || e.isDestroyed) return;
    const v = () => {
      if (!e.isDestroyed)
        try {
          const N = e.getHTML();
          N.length >= 20 && (localStorage.setItem(n, N), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()));
        } catch (N) {
          console.warn("useAutoSave: Error saving on unload", N);
        }
    };
    return window.addEventListener("beforeunload", v), () => {
      window.removeEventListener("beforeunload", v);
    };
  }, [e, n, r]);
  const h = H(() => {
    l.current && clearTimeout(l.current), f();
  }, [f]), g = H(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Po), u.current = "", c({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (v) {
      console.warn("useAutoSave: Error clearing content", v);
    }
  }, [n]), p = H(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const v = localStorage.getItem(n);
      return v && e && !e.isDestroyed ? (c((N) => ({ ...N, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(v), u.current = v, localStorage.removeItem(n + Po), a?.(v);
          } catch (N) {
            console.warn("useAutoSave: Error setting content during recovery", N);
          }
      }), v) : null;
    } catch (v) {
      return console.warn("useAutoSave: Error recovering content", v), null;
    }
  }, [e, n, a]), b = H(() => {
    try {
      localStorage.setItem(n + Po, "true"), c((v) => ({ ...v, hasRecoverableContent: !1 }));
    } catch (v) {
      console.warn("useAutoSave: Error dismissing recovery", v);
    }
  }, [n]);
  return {
    ...i,
    save: h,
    clear: g,
    recover: p,
    dismissRecovery: b
  };
}
function Uo(e, t, n) {
  const { state: o } = e, { tr: r } = o;
  t !== n && r.delete(t, n);
  const s = r.doc.resolve(t), a = o.schema.nodes.horizontalRule.create(), i = s.before(s.depth), c = s.after(s.depth);
  r.replaceWith(i, c, a);
  const l = i + a.nodeSize;
  if (l < r.doc.content.size) {
    const u = r.doc.resolve(l);
    u.nodeAfter && u.nodeAfter.isTextblock ? r.setSelection(Ge.create(r.doc, l + 1)) : u.nodeAfter && r.setSelection(Ge.near(r.doc.resolve(l)));
  } else {
    const d = o.schema.nodes.paragraph.create();
    r.insert(l, d), r.setSelection(Ge.create(r.doc, l + 1));
  }
  r.scrollIntoView(), e.view.dispatch(r);
}
function Tv(e, {
  editor: t,
  turndownService: n,
  editorModeRef: o,
  handleModeSwitch: r,
  wordCount: s,
  autoSaveState: a,
  setIsFindReplaceOpen: i,
  setFindReplaceFocusTrigger: c
}) {
  Md(e, () => ({
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
    getMode: () => o.current,
    setMode: (l) => r(l),
    toggleMode: () => {
      const l = o.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return r(l), l;
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
      t && Uo(t, t.state.selection.from, t.state.selection.from);
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
      i(!0), c((l) => l + 1);
    },
    closeFindReplace: () => i(!1),
    save: () => a.save(),
    clearSavedContent: () => a.clear(),
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
          const f = u.attrs.level, h = u.textContent.trim();
          h && l.push({ id: `toc-heading-${d}`, text: h, level: f, pos: d });
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
              const h = f.getBoundingClientRect(), p = d.getBoundingClientRect().top - h.top + f.scrollTop;
              f.scrollTo({ top: p - 20, behavior: "smooth" });
            } else
              d.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          t.commands.setTextSelection(l + 1);
        } catch {
        }
    }
  }), [t, n, r, s, a, i]);
}
const Sv = new Re("tableCellMenu");
function Mv(e) {
  return new Ie({
    key: Sv,
    props: {
      handleDOMEvents: {
        contextmenu(t, n) {
          const r = n.target.closest("td, th");
          if (r && r.closest(".ProseMirror")) {
            n.preventDefault();
            const s = t.posAtDOM(r, 0);
            return e.chain().focus().setTextSelection(s).run(), Dv(n, e, s), !0;
          }
          return !1;
        }
      }
    }
  });
}
function Dv(e, t, n) {
  const o = document.querySelector(".table-cell-menu-dropdown");
  o && o.remove();
  const r = document.createElement("div");
  r.className = "table-cell-menu-dropdown";
  const s = 170, a = 280;
  let i = e.clientY, c = e.clientX;
  c + s > window.innerWidth - 12 && (c = window.innerWidth - s - 12), c < 12 && (c = 12), i + a > window.innerHeight - 12 && (i = e.clientY - a), i < 12 && (i = 12);
  const l = document.documentElement.classList.contains("dark"), u = l ? "#1f1f1f" : "#ffffff", d = l ? "#3a3a3a" : "#e5e5e5", f = l ? "#e5e5e5" : "#333333";
  r.style.cssText = "position:fixed;top:" + i + "px;left:" + c + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + u + ";border:1px solid " + d + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + f + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const h = t.state.doc.resolve(n);
  let g = !1;
  for (let S = h.depth; S >= 0; S--)
    if (h.node(S).type.name === "table") {
      h.node(S).firstChild?.firstChild?.type.name === "tableHeader" && (g = !0);
      break;
    }
  const p = [
    { label: "Insert Column Left", icon: "col-left", action: () => t.chain().focus().setTextSelection(n).addColumnBefore().run() },
    { label: "Insert Column Right", icon: "col-right", action: () => t.chain().focus().setTextSelection(n).addColumnAfter().run() },
    { label: "Insert Row Above", icon: "row-up", action: () => t.chain().focus().setTextSelection(n).addRowBefore().run() },
    { label: "Insert Row Below", icon: "row-down", action: () => t.chain().focus().setTextSelection(n).addRowAfter().run() },
    { label: "divider" },
    { label: g ? "✓ Header Row" : "  Header Row", icon: "toggle-header", action: () => t.chain().focus().setTextSelection(n).toggleHeaderRow().run() },
    { label: "divider" },
    { label: "Delete Column", icon: "delete", action: () => t.chain().focus().setTextSelection(n).deleteColumn().run(), destructive: !0 },
    { label: "Delete Row", icon: "delete", action: () => t.chain().focus().setTextSelection(n).deleteRow().run(), destructive: !0 },
    { label: "Delete Table", icon: "table-delete", action: () => t.chain().focus().setTextSelection(n).deleteTable().run(), destructive: !0 },
    { label: "divider" },
    { label: "Copy Table", icon: "copy", action: () => Av(t) }
  ], b = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, v = l ? "#2a2a2a" : "#f5f5f5", N = l ? "#ff6b6b" : "#dc2626", y = l ? "#999999" : "#666666", E = l ? "#333333" : "#e5e5e5";
  p.forEach((S) => {
    if (S.label === "divider") {
      const x = document.createElement("div");
      x.style.cssText = "height:1px;background:" + E + ";margin:4px 0;", r.appendChild(x);
    } else {
      const x = document.createElement("button");
      x.type = "button";
      const C = S.destructive ? N : f;
      x.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + C + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const M = b[S.icon || ""] || "", D = S.destructive ? N : y;
      x.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + D + ';">' + M + '</span><span style="flex:1;white-space:nowrap;">' + S.label + "</span>", x.addEventListener("mouseenter", () => {
        x.style.background = S.destructive ? l ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : v;
      }), x.addEventListener("mouseleave", () => {
        x.style.background = "transparent";
      }), x.addEventListener("click", (P) => {
        P.preventDefault(), P.stopPropagation(), S.action && S.action(), r.remove();
      }), r.appendChild(x);
    }
  }), document.body.appendChild(r);
  const k = (S) => {
    const x = S.target;
    r.contains(x) || (r.remove(), document.removeEventListener("mousedown", k), document.removeEventListener("keydown", w));
  }, w = (S) => {
    S.key === "Escape" && (r.remove(), document.removeEventListener("mousedown", k), document.removeEventListener("keydown", w));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", k), document.addEventListener("keydown", w);
  }, 0);
}
function Av(e) {
  const { state: t } = e, { selection: n } = t;
  let o = null;
  if (t.doc.descendants((r, s) => {
    if (r.type.name === "table" && s <= n.from && s + r.nodeSize >= n.to)
      return o = r, !1;
  }), o) {
    const r = (a) => {
      if (a.type.name === "table") return "<table>" + a.content.content.map(r).join("") + "</table>";
      if (a.type.name === "tableRow") return "<tr>" + a.content.content.map(r).join("") + "</tr>";
      if (a.type.name === "tableCell") {
        const i = a.attrs, c = i.colspan > 1 ? ' colspan="' + i.colspan + '"' : "", l = i.rowspan > 1 ? ' rowspan="' + i.rowspan + '"' : "";
        return "<td" + c + l + ">" + a.textContent + "</td>";
      }
      if (a.type.name === "tableHeader") {
        const i = a.attrs, c = i.colspan > 1 ? ' colspan="' + i.colspan + '"' : "", l = i.rowspan > 1 ? ' rowspan="' + i.rowspan + '"' : "";
        return "<th" + c + l + ">" + a.textContent + "</th>";
      }
      return a.textContent || "";
    }, s = r(o);
    navigator.clipboard.writeText(s).then(() => {
      const a = document.createElement("div");
      a.className = "tcm-toast", a.textContent = "Table copied to clipboard", a.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:6px;font-size:13px;z-index:99999;animation:fadeInOut 2s ease-in-out forwards;", document.body.appendChild(a), setTimeout(() => a.remove(), 2e3);
    });
  }
}
const Pv = Dm.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Mv(this.editor)
    ];
  }
}), Iv = Am.extend({}), Bn = new Re("tableSorting");
let Bt = null, _n = null;
function Rv(e) {
  const t = parseFloat(e.replace(/[,$%]/g, ""));
  if (!isNaN(t) && e.match(/^[\d,.$%\-+]+$/))
    return { type: "number", value: t };
  const n = [/^\d{4}-\d{2}-\d{2}/, /^\d{1,2}\/\d{1,2}\/\d{2,4}/, /^\d{1,2}-\d{1,2}-\d{2,4}/];
  for (const o of n)
    if (o.test(e)) {
      const r = new Date(e);
      if (!isNaN(r.getTime()))
        return { type: "date", value: r };
    }
  return { type: "string", value: e.toLowerCase() };
}
function Lv(e, t, n) {
  let o = 0;
  return e.type === "number" && t.type === "number" ? o = e.value - t.value : e.type === "date" && t.type === "date" ? o = e.value.getTime() - t.value.getTime() : o = String(e.value).localeCompare(String(t.value)), n === "asc" ? o : -o;
}
function Ov(e, t, n) {
  const { state: o, view: r } = e;
  let s = null;
  if (o.doc.nodesBetween(t, t + 1, (g, p) => {
    if (g.type.name === "table" && p === t)
      return s = g, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const a = Bt?.tablePos === t && Bt?.columnIndex === n && Bt?.direction === "asc" ? "desc" : "asc";
  Bt = { tablePos: t, columnIndex: n, direction: a }, _n = null;
  const i = [];
  s.forEach((g) => {
    if (g.type.name === "tableRow") {
      let p = !1;
      g.forEach((b) => {
        b.type.name === "tableHeader" && (p = !0);
      }), i.push({ node: g, isHeader: p });
    }
  });
  const c = i.filter((g) => g.isHeader), l = i.filter((g) => !g.isHeader);
  if (l.length < 2) {
    xa(n, a), r.dispatch(o.tr.setMeta(Bn, { updated: !0 }));
    return;
  }
  const u = l.map((g) => {
    let p = "", b = 0;
    return g.node.forEach((v) => {
      b === n && (p = v.textContent || ""), b++;
    }), { ...g, sortValue: Rv(p) };
  }), d = u.map((g, p) => p);
  u.sort((g, p) => Lv(g.sortValue, p.sortValue, a));
  const f = u.map((g, p) => l.indexOf(g));
  if (d.some((g, p) => g !== f[p])) {
    const g = [];
    c.forEach((v) => g.push(v.node)), u.forEach((v) => g.push(v.node));
    const p = s.type.create(s.attrs, g), { tr: b } = o;
    b.replaceWith(t, t + s.nodeSize, p), b.setMeta(Bn, { updated: !0 }), r.dispatch(b);
  } else
    r.dispatch(o.tr.setMeta(Bn, { updated: !0 }));
  xa(n, a);
}
function xa(e, t) {
  const n = document.querySelector(".table-sort-toast");
  n && n.remove();
  const o = document.createElement("div");
  o.className = "table-sort-toast";
  const r = t === "asc" ? "ascending" : "descending", s = t === "asc" ? "↑" : "↓";
  o.innerHTML = '<span style="margin-right:6px;">' + s + "</span> Sorted column " + (e + 1) + " " + r;
  const a = document.documentElement.classList.contains("dark");
  o.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:" + (a ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)") + ";color:" + (a ? "#e5e5e5" : "#333") + ";padding:10px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1px solid " + (a ? "#3a3a3a" : "#e5e5e5") + ";animation:sortToastIn 0.2s ease;", document.body.appendChild(o), setTimeout(() => {
    o.style.animation = "sortToastOut 0.2s ease forwards", setTimeout(() => o.remove(), 200);
  }, 1500);
}
function _v(e, t, n, o) {
  const r = document.createElement("span");
  r.className = "table-sort-btn-inline", r.setAttribute("contenteditable", "false"), r.style.cssText = "display:inline-flex;align-items:center;margin-left:4px;vertical-align:middle;pointer-events:auto;";
  const s = document.createElement("button");
  s.className = "table-sort-btn", s.setAttribute("contenteditable", "false"), s.type = "button";
  const a = document.documentElement.classList.contains("dark"), i = a ? "#60a5fa" : "#3b82f6", c = a ? "#666" : "#aaa", l = a ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  return s.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;font-size:10px;color:" + (e ? i : c) + ";background:transparent;border:none;border-radius:3px;cursor:pointer;user-select:none;transition:all 0.15s ease;opacity:" + (e ? "1" : "0.5") + ";pointer-events:auto;vertical-align:middle;", s.addEventListener("mouseenter", () => {
    s.style.background = l, s.style.opacity = "1", s.style.color = i;
  }), s.addEventListener("mouseleave", () => {
    s.style.background = "transparent", s.style.opacity = e ? "1" : "0.5", s.style.color = e ? i : c;
  }), s.addEventListener("click", (u) => {
    u.preventDefault(), u.stopPropagation(), Ov(o, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), r.appendChild(s), r;
}
function $v(e) {
  return new Ie({
    key: Bn,
    state: {
      init() {
        return Ue.empty;
      },
      apply(t, n, o, r) {
        const s = t.getMeta(Bn);
        return !t.docChanged && !s?.updated && _n ? _n.map(t.mapping, t.doc) : (_n = Wv(r.doc, e), _n);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Wv(e, t) {
  const n = [];
  return e.descendants((o, r) => {
    if (o.type.name === "table") {
      const s = r;
      o.forEach((a, i) => {
        if (a.type.name === "tableRow") {
          let c = 0, l = 0;
          a.forEach((u, d) => {
            if (u.type.name === "tableHeader") {
              const f = r + 1 + i + 1 + l;
              let h = f + 1;
              u.forEach((y, E) => {
                y.type.name === "paragraph" && (h = f + 1 + E + y.nodeSize - 1);
              });
              const p = Bt?.tablePos === s && Bt?.columnIndex === c ? Bt.direction : null, b = c, v = s, N = qe.widget(h, () => _v(p, v, b, t), { side: 1, key: "sort-" + s + "-" + b });
              n.push(N);
            }
            l += u.nodeSize, c++;
          });
        }
      });
    }
  }), Ue.create(e, n);
}
const Bv = Qe.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [$v(this.editor)];
  }
});
function hi(e, t, n, o, r, s = {}) {
  const a = e.doc.nodeAt(t);
  if (!a) return !1;
  e.setNodeMarkup(t, n, a.attrs);
  const i = e.doc.nodeAt(t);
  if (!i) return !1;
  const c = [];
  i.forEach((l, u) => {
    l.type === r && c.push(t + 1 + u);
  });
  for (let l = c.length - 1; l >= 0; l--) {
    const u = c[l], d = e.doc.nodeAt(u);
    d && d.type === r && e.setNodeMarkup(u, o, s);
  }
  return !0;
}
const Hv = Pm.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: o }) => {
        const { selection: r } = t, { $from: s } = r, a = t.schema.nodes.bulletList, i = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let h = s.depth; h > 0; h--) {
          const g = s.node(h);
          if (g.type === a || g.type === i || g.type === c) {
            d = g.type, f = s.before(h);
            break;
          }
        }
        if (d === a)
          return e.liftListItem("listItem");
        if (d === i || d === c) {
          if (!o) return !0;
          if (hi(n, f, a, l, u, {}))
            return o(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Fv = Im.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: o }) => {
        const { selection: r } = t, { $from: s } = r, a = t.schema.nodes.bulletList, i = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let h = s.depth; h > 0; h--) {
          const g = s.node(h);
          if (g.type === a || g.type === i || g.type === c) {
            d = g.type, f = s.before(h);
            break;
          }
        }
        if (d === c)
          return e.liftListItem("listItem");
        if (d === i || d === a) {
          if (!o) return !0;
          if (hi(n, f, c, l, u, {}))
            return o(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), zv = Lm.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: o, dispatch: r, chain: s, can: a }) => {
        const { selection: i } = n, { $from: c, $to: l } = i, u = c.blockRange(l);
        if (!u)
          return !1;
        const d = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let h = !1;
        for (let k = c.depth; k > 0; k--)
          if (c.node(k).type === d) {
            h = !0, c.before(k);
            break;
          }
        if (h)
          return t.liftListItem("taskItem");
        const g = n.schema.nodes.bulletList, p = n.schema.nodes.orderedList, b = n.schema.nodes.listItem;
        let v = null, N = -1;
        for (let k = c.depth; k > 0; k--) {
          const w = c.node(k);
          if (w.type === g || w.type === p) {
            v = w, N = c.before(k);
            break;
          }
        }
        if (v) {
          if (!r) return !0;
          const k = N, w = o.doc.nodeAt(k);
          if (!w) return !1;
          o.setNodeMarkup(k, d, w.attrs);
          const S = o.doc.nodeAt(k);
          if (!S) return !1;
          const x = [];
          S.forEach((C, M) => {
            C.type === b && x.push(k + 1 + M);
          });
          for (let C = x.length - 1; C >= 0; C--) {
            const M = x[C], D = o.doc.nodeAt(M);
            D && D.type === b && o.setNodeMarkup(M, f, { checked: !1 });
          }
          return r(o), !0;
        }
        if (!r) return !0;
        const y = zi(u, d);
        if (y) {
          o.wrap(u, y);
          const { $from: k } = o.selection;
          let w = -1;
          for (let S = k.depth; S > 0; S--)
            if (k.node(S).type === d) {
              w = k.before(S);
              break;
            }
          if (w >= 0) {
            const S = o.doc.nodeAt(w);
            if (S) {
              const x = [];
              S.forEach((C, M) => {
                C.type === b && x.push(w + 1 + M);
              });
              for (let C = x.length - 1; C >= 0; C--) {
                const M = x[C], D = o.doc.nodeAt(M);
                D && D.type === b && o.setNodeMarkup(M, f, { checked: !1 });
              }
            }
          }
          return r(o), !0;
        }
        const E = zi(u, g);
        if (E) {
          o.wrap(u, E);
          const { $from: k } = o.selection;
          let w = -1;
          for (let S = k.depth; S > 0; S--)
            if (k.node(S).type === g) {
              w = k.before(S);
              break;
            }
          return w >= 0 && hi(o, w, d, f, b, { checked: !1 }), r(o), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Uv = Om.extend({
  content: "paragraph block*",
  addKeyboardShortcuts() {
    return {
      ...this.parent?.() || {},
      Enter: () => {
        const { editor: t } = this, { state: n } = t, { $from: o, $to: r } = n.selection;
        if (!o.sameParent(r) || o.pos !== r.pos)
          return t.commands.splitListItem(this.name);
        let s = -1;
        for (let d = o.depth; d >= 1; d--)
          if (o.node(d).type.name === "taskItem") {
            s = d;
            break;
          }
        if (s === -1)
          return t.commands.splitListItem(this.name);
        const a = o.node(s);
        if (!a.attrs.checked)
          return t.commands.splitListItem(this.name);
        const c = o.start(s), l = a.firstChild;
        if (!l || !l.isTextblock)
          return t.commands.splitListItem(this.name);
        if (o.pos - c <= 1) {
          const d = o.before(s), { tr: f } = n, h = n.schema.nodes.taskItem, g = n.schema.nodes.paragraph, p = h.create(
            { checked: !1 },
            g.create()
          );
          f.insert(d, p);
          const b = d + 1;
          return f.setSelection(Ge.create(f.doc, b)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
      new Ie({
        key: new Re("taskItemInputRule"),
        props: {
          handleTextInput(n, o, r, s) {
            if (s !== " ") return !1;
            const { state: a } = n, i = a.doc.resolve(o), c = i.parent.textBetween(
              0,
              i.parentOffset,
              void 0,
              "￼"
            ), u = /^\s*(-\s*)?\[([( |x])?\]$/.exec(c);
            if (!u) return !1;
            const d = u[2] === "x", f = i.start() + (u.index || 0), h = o, g = a.tr;
            g.delete(f, h);
            const b = g.doc.resolve(f).blockRange();
            if (!b || !t || !e) return !1;
            const v = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: d } }
            ];
            if (g.wrap(b, v), f > 1) {
              const N = g.doc.resolve(f - 1).nodeBefore;
              N && N.type === t && _m(g.doc, f - 1) && g.join(f - 1);
            }
            return n.dispatch(g), !0;
          }
        }
      })
    ];
  }
}), Yv = Rm.extend({
  content: "paragraph block*"
}), wa = new Re("collapsibleList");
function xs(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function ws(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((o) => {
    t.includes(o.type.name) && (n = !0);
  }), n;
}
function jv(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let o = -1, r = -1, s = t + 1;
  return e.forEach((a) => {
    n.includes(a.type.name) && (o === -1 && (o = s), r = s + a.nodeSize), s += a.nodeSize;
  }), o === -1 ? null : { start: o, end: r };
}
let ln = null;
function Xr(e, t, n) {
  const o = [];
  return e.descendants((r, s) => {
    if (!n.listItemTypes.includes(r.type.name) || !ws(r))
      return !0;
    const a = xs(r, s), i = t.collapsedItems.has(a);
    o.push(
      qe.node(s, s + r.nodeSize, {
        class: `collapsible-list-item ${i ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": a
      })
    );
    const c = r.firstChild;
    if (c && c.type.name === "paragraph") {
      const l = s + 1 + c.nodeSize - 1, u = qe.widget(
        l,
        () => {
          const d = CSS.escape(a), f = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${d}"]`
          );
          if (f) {
            f.classList.contains("collapsed") !== i && (f.classList.remove("collapsed", "expanded"), f.classList.add(i ? "collapsed" : "expanded"), f.title = i ? "Click to expand" : "Click to collapse");
            const b = f.parentElement;
            if (b) return b;
          }
          const h = document.createElement("span");
          h.className = "collapsible-list-chevron-wrapper", h.setAttribute("contenteditable", "false");
          const g = document.createElement("button");
          return g.className = `collapsible-list-chevron ${i ? "collapsed" : "expanded"}`, g.setAttribute("data-list-item-id", a), g.setAttribute("contenteditable", "false"), g.setAttribute("tabindex", "-1"), g.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', g.title = i ? "Click to expand" : "Click to collapse", g.addEventListener("click", (p) => {
            p.preventDefault(), p.stopPropagation();
            const b = g.classList.contains("collapsed");
            g.classList.remove("collapsed", "expanded"), g.classList.add(b ? "expanded" : "collapsed"), g.title = b ? "Click to collapse" : "Click to expand", t.collapsedItems.has(a) ? t.collapsedItems.delete(a) : t.collapsedItems.add(a), ln && ln.dispatch(
              ln.state.tr.setMeta("collapsibleList", { toggled: a })
            );
          }), h.appendChild(g), h;
        },
        { side: 1, key: `list-chevron-${a}` }
      );
      o.push(u);
    }
    if (i && jv(r, s)) {
      let u = s + 1;
      r.forEach((d) => {
        ["bulletList", "orderedList", "taskList"].includes(d.type.name) && o.push(
          qe.node(u, u + d.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), u += d.nodeSize;
      });
    }
    return !0;
  }), Ue.create(e, o);
}
const Vv = Qe.create({
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
        const o = this.storage, r = n.doc.nodeAt(e);
        if (!r || !this.options.listItemTypes.includes(r.type.name) || !ws(r))
          return !1;
        const s = xs(r, e);
        return o.collapsedItems.has(s) ? o.collapsedItems.delete(s) : o.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((r, s) => {
          this.options.listItemTypes.includes(r.type.name) && ws(r) && n.collapsedItems.add(xs(r, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ie({
        key: wa,
        view(n) {
          return ln = n, {
            update(o) {
              ln = o;
            },
            destroy() {
              ln = null;
            }
          };
        },
        state: {
          init(n, o) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: Xr(o.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, o, r, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: Xr(s.doc, e, t),
              docVersion: o.docVersion + 1
            } : {
              ...o,
              decorations: o.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const o = wa.getState(n);
            return o?.decorations ? o.decorations : Xr(n.doc, e, t);
          }
        }
      })
    ];
  }
}), be = zm();
be.register("javascript", Ys);
be.register("js", Ys);
be.register("jsx", Ys);
be.register("typescript", js);
be.register("ts", js);
be.register("tsx", js);
be.register("python", gc);
be.register("py", gc);
be.register("xml", Vs);
be.register("html", Vs);
be.register("svg", Vs);
be.register("css", Um);
be.register("json", Ym);
be.register("bash", cr);
be.register("sh", cr);
be.register("shell", cr);
be.register("zsh", cr);
const Cs = {
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
}, Io = /* @__PURE__ */ new Set(), Ro = /* @__PURE__ */ new Set();
async function Kv(e) {
  if (be.registered(e)) return !0;
  const t = Cs[e];
  if (!t) return !1;
  if (Ro.has(e)) return !0;
  if (Io.has(e))
    return new Promise((n) => {
      const o = () => {
        Ro.has(e) ? n(!0) : Io.has(e) ? setTimeout(o, 50) : n(!1);
      };
      setTimeout(o, 50);
    });
  Io.add(e);
  try {
    const o = (await t()).default;
    be.register(e, o), Ro.add(e);
    const r = [
      ["cpp", "c"],
      ["go", "golang"],
      ["rust", "rs"],
      ["markdown", "md"],
      ["yaml", "yml"],
      ["diff", "patch"]
    ];
    for (const s of r)
      if (s.includes(e))
        for (const a of s)
          a !== e && !be.registered(a) && (be.register(a, o), Ro.add(a));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Io.delete(e);
  }
}
function Gv({ node: e, updateAttributes: t, extension: n }) {
  const [o, r] = Y(!1), [s, a] = Y(!1), [i, c] = Y(!0), l = j(null), u = e.attrs.language || "plaintext";
  q(() => {
    const p = l.current;
    if (!p || s) return;
    const b = new IntersectionObserver(
      (v) => {
        for (const N of v)
          N.isIntersecting && (a(!0), b.unobserve(p));
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: "200px 0px",
        threshold: 0
      }
    );
    return b.observe(p), () => {
      b.disconnect();
    };
  }, [s]), q(() => {
    if (s && u !== "plaintext") {
      if (be.registered(u)) {
        c(!0);
        return;
      }
      Cs[u] && (c(!1), Kv(u).then((p) => {
        c(p);
      }));
    }
  }, [s, u]);
  const d = H(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), r(!0), setTimeout(() => r(!1), 2e3);
    } catch (p) {
      console.error("Failed to copy:", p);
    }
  }, [e.textContent]), f = n.options.lowlight?.listLanguages?.() || [], h = Array.from(/* @__PURE__ */ new Set([...f, ...Object.keys(Cs)])).sort(), g = u === "plaintext" ? "Plain Text" : u.charAt(0).toUpperCase() + u.slice(1);
  return /* @__PURE__ */ m(hn, { className: "code-block-wrapper", ref: l, children: [
    /* @__PURE__ */ m("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ m("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: u,
            onChange: (p) => t({ language: p.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ m("option", { value: "plaintext", children: "Plain Text" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 265,
                columnNumber: 13
              }, this),
              h.map((p) => /* @__PURE__ */ m("option", { value: p, children: p.charAt(0).toUpperCase() + p.slice(1) }, p, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 267,
                columnNumber: 15
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 260,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m("span", { className: "code-block-language-label", children: g }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 272,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Dt, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 273,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
        lineNumber: 259,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: d,
          className: `code-block-copy-btn ${o ? "copied" : ""}`,
          title: o ? "Copied!" : "Copy code",
          children: o ? /* @__PURE__ */ m(yn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 281,
            columnNumber: 21
          }, this) : /* @__PURE__ */ m(Nn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 281,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 275,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 258,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!s || !i ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m(Ss, { className: s && i ? `language-${u}` : "language-plaintext" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 288,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 287,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
    lineNumber: 256,
    columnNumber: 5
  }, this);
}
const qv = Fm.extend({
  addNodeView() {
    return or(Gv);
  }
}).configure({
  lowlight: be,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
});
function Nt({
  children: e,
  className: t,
  zIndex: n = 99999,
  onMouseDown: o
}) {
  const r = H(
    (i) => {
      o?.(i), i.stopPropagation();
    },
    [o]
  ), s = H((i) => {
    i.stopPropagation();
  }, []), a = H((i) => {
    i.stopPropagation();
  }, []);
  return ym(
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
        onMouseDown: r,
        onPointerDown: s,
        onClick: a,
        children: e
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DialogSafePortal.tsx",
        lineNumber: 65,
        columnNumber: 5
      },
      this
    ),
    document.body
  );
}
const Lo = {
  info: { icon: jo, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: ac, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: ic, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: Bs, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: Hs, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" },
  summary: { icon: Vd, label: "Summary", color: "var(--callout-summary)", borderColor: "var(--callout-summary-border)" }
};
function Xv({ node: e, updateAttributes: t, editor: n }) {
  const [o, r] = Y(!1), [s, a] = Y(!1), [i, c] = Y(null), l = j(null), u = j(null), d = e.attrs.type || "info", f = Lo[d] || Lo.info, h = f.icon, g = H(() => {
    if (u.current) {
      const N = u.current.getBoundingClientRect();
      c({
        top: N.bottom + 4,
        left: N.left
      });
    }
  }, []);
  q(() => {
    if (!o) return;
    const N = (y) => {
      l.current && !l.current.contains(y.target) && u.current && !u.current.contains(y.target) && r(!1);
    };
    return document.addEventListener("mousedown", N), document.addEventListener("touchstart", N, { passive: !0 }), () => {
      document.removeEventListener("mousedown", N), document.removeEventListener("touchstart", N);
    };
  }, [o]), q(() => {
    if (!o) return;
    const N = () => r(!1);
    return window.addEventListener("scroll", N, !0), () => window.removeEventListener("scroll", N, !0);
  }, [o]);
  const p = H(() => {
    n.isEditable && (o || g(), r(!o));
  }, [n.isEditable, o, g]), b = (N) => {
    t({ type: N }), r(!1);
  }, v = H((N) => {
    N.stopPropagation(), a((y) => !y);
  }, []);
  return /* @__PURE__ */ m(hn, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
    /* @__PURE__ */ m(
      "div",
      {
        className: "callout-header",
        onClick: v,
        style: { cursor: "pointer", userSelect: "none", WebkitUserSelect: "none" },
        title: s ? "Click to expand" : "Click to collapse",
        children: [
          /* @__PURE__ */ m(
            "button",
            {
              ref: u,
              className: "callout-header-button",
              onClick: (N) => {
                N.stopPropagation(), p();
              },
              title: n.isEditable ? "Click to change callout type" : f.label,
              style: { color: f.borderColor, userSelect: "none", WebkitUserSelect: "none" },
              children: [
                /* @__PURE__ */ m(h, { size: 18 }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 130,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ m("span", { className: "callout-label", children: f.label }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 131,
                  columnNumber: 11
                }, this),
                n.isEditable && /* @__PURE__ */ m(Dt, { size: 12, className: "callout-type-chevron" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 132,
                  columnNumber: 33
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 120,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: f.borderColor },
              children: s ? /* @__PURE__ */ m(cc, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 138,
                columnNumber: 24
              }, this) : /* @__PURE__ */ m(Dt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 138,
                columnNumber: 53
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 134,
              columnNumber: 9
            },
            this
          ),
          o && n.isEditable && i && /* @__PURE__ */ m(Nt, { children: /* @__PURE__ */ m(
            "div",
            {
              ref: l,
              className: "callout-type-dropdown",
              contentEditable: !1,
              style: {
                position: "fixed",
                top: i.top,
                left: i.left
              },
              children: Object.keys(Lo).map((N) => {
                const y = Lo[N], E = y.icon;
                return /* @__PURE__ */ m(
                  "button",
                  {
                    className: `callout-type-option ${N === d ? "active" : ""}`,
                    onClick: (k) => {
                      k.stopPropagation(), b(N);
                    },
                    onMouseDown: (k) => k.stopPropagation(),
                    style: { "--callout-option-color": y.color },
                    children: [
                      /* @__PURE__ */ m(E, { size: 16, style: { color: y.borderColor } }, void 0, !1, {
                        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                        lineNumber: 167,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ m("span", { children: y.label }, void 0, !1, {
                        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                        lineNumber: 168,
                        columnNumber: 19
                      }, this)
                    ]
                  },
                  N,
                  !0,
                  {
                    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                    lineNumber: 157,
                    columnNumber: 17
                  },
                  this
                );
              })
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 143,
              columnNumber: 11
            },
            this
          ) }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
            lineNumber: 142,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
        lineNumber: 114,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ m(Ss, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 179,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 178,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/extensions/CalloutWithMenu.tsx",
    lineNumber: 107,
    columnNumber: 5
  }, this);
}
const Zv = ar.create({
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
      kn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return or(Xv);
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
}), Qv = jm.extend({
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
        kn(this.options.HTMLAttributes, e)
      ]
    ];
  },
  addNodeView() {
    const e = this.options;
    return ({ node: t, editor: n, getPos: o }) => {
      let r = t;
      const s = document.createElement("figure");
      s.classList.add("image-resizer");
      const a = (A) => {
        const _ = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[A] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${_}`;
      };
      a(t.attrs.align || "left");
      const i = document.createElement("img");
      i.alt = t.attrs.alt || "", t.attrs.width && (i.style.width = `${t.attrs.width}px`);
      const c = (A) => !(!A || A.startsWith("data:") || A.startsWith("blob:") || A.startsWith("http://") || A.startsWith("https://")), l = (A) => {
        c(A) && e.resolveImageSrc ? (i.style.opacity = "0.5", i.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(A).then((_) => {
          i.src = _, i.style.opacity = "1";
        }).catch(() => {
          i.src = A, i.style.opacity = "1";
        })) : i.src = A;
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
      const h = (A, _, U) => {
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
        `, V.innerHTML = `${_}<span>${A}</span>`, V.addEventListener("mouseenter", () => {
          V.style.background = "oklch(0.95 0 0)";
        }), V.addEventListener("mouseleave", () => {
          V.style.background = "transparent";
        }), V.addEventListener("click", (G) => {
          G.preventDefault(), G.stopPropagation(), U(), f.style.display = "none", C = !1;
        }), V;
      }, g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', p = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', v = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(h("Edit", g, () => {
        const A = typeof o == "function" ? o() : null;
        if (A != null && e.onImageClick) {
          const _ = i.getBoundingClientRect();
          e.onImageClick({
            src: r.attrs.src,
            alt: r.attrs.alt || "",
            pos: A,
            rect: _
          });
        }
      })), f.appendChild(h("Copy image", p, async () => {
        const A = r.attrs.src;
        try {
          const U = await (await fetch(A)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [U.type]: U })
          ]);
        } catch {
          try {
            const _ = new window.Image();
            _.crossOrigin = "anonymous", await new Promise((G, Q) => {
              _.onload = () => G(), _.onerror = () => Q(new Error("Image load failed")), _.src = A;
            });
            const U = document.createElement("canvas");
            U.width = _.naturalWidth, U.height = _.naturalHeight;
            const V = U.getContext("2d");
            if (V) {
              V.drawImage(_, 0, 0);
              const G = await new Promise(
                (Q) => U.toBlob(Q, "image/png")
              );
              G ? await navigator.clipboard.write([
                new ClipboardItem({ "image/png": G })
              ]) : await navigator.clipboard.writeText(A);
            }
          } catch {
            try {
              await navigator.clipboard.writeText(A);
            } catch {
            }
          }
        }
      })), f.appendChild(h("Copy URL", v, async () => {
        const A = r.attrs.src;
        try {
          await navigator.clipboard.writeText(A);
        } catch {
        }
      })), f.appendChild(h("Save image", b, () => {
        const A = r.attrs.src, _ = r.attrs.alt || "image", U = document.createElement("a");
        U.href = A, U.download = _, U.target = "_blank", U.rel = "noopener noreferrer", document.body.appendChild(U), U.click(), setTimeout(() => {
          document.body.removeChild(U);
        }, 100);
      }));
      const N = document.createElement("div");
      N.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, f.appendChild(N);
      const y = document.createElement("div");
      y.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: oklch(0.55 0 0);
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, y.textContent = "Alignment", f.appendChild(y);
      const E = document.createElement("div");
      E.style.cssText = `
        display: flex;
        margin: 4px 8px 4px;
        background: oklch(0.94 0 0);
        border-radius: 8px;
        padding: 3px;
        gap: 2px;
      `;
      const k = [
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
      ], w = [], S = (A) => {
        w.forEach((_) => {
          (_.getAttribute("data-align-value") || "left") === A ? (_.style.background = "oklch(1 0 0)", _.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", _.style.color = "oklch(0.25 0 0)", _.style.fontWeight = "600") : (_.style.background = "transparent", _.style.boxShadow = "none", _.style.color = "oklch(0.5 0 0)", _.style.fontWeight = "400");
        });
      };
      k.forEach(({ value: A, label: _, icon: U }) => {
        const V = document.createElement("button");
        V.setAttribute("type", "button"), V.setAttribute("data-align-value", A), V.setAttribute("title", `Align ${_.toLowerCase()}`), V.style.cssText = `
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
        `, V.innerHTML = `${U}<span>${_}</span>`, V.addEventListener("click", (G) => {
          G.preventDefault(), G.stopPropagation();
          const Q = typeof o == "function" ? o() : null;
          if (Q != null)
            try {
              const { state: B, dispatch: W } = n.view, z = B.doc.nodeAt(Q);
              if (z && z.type.name === "resizableImage") {
                const Z = B.tr.setNodeMarkup(Q, void 0, {
                  ...z.attrs,
                  align: A
                });
                W(Z);
              }
            } catch {
              n.chain().focus().setNodeSelection(Q).updateAttributes("resizableImage", {
                align: A
              }).run();
            }
          S(A);
        }), w.push(V), E.appendChild(V);
      }), f.appendChild(E);
      const x = () => {
        const A = r.attrs.align || "left";
        S(A);
      };
      let C = !1;
      d.addEventListener("click", (A) => {
        if (A.preventDefault(), A.stopPropagation(), C)
          f.style.display = "none", C = !1;
        else {
          const _ = d.getBoundingClientRect(), U = 200, V = f.closest('[role="dialog"]');
          let G = 0, Q = 0;
          if (V) {
            const ue = V.getBoundingClientRect();
            G = ue.left, Q = ue.top;
          }
          let B = _.bottom + 4 - Q, W = _.right - U - G;
          const z = window.innerHeight, Z = window.innerWidth, le = 200;
          _.bottom + 4 + le > z && (B = _.top - le - 4 - Q), W + G < 8 && (W = 8 - G), W + U + G > Z - 8 && (W = Z - U - 8 - G), f.style.top = `${B}px`, f.style.left = `${W}px`, f.style.display = "flex", C = !0, x();
        }
      });
      const M = (A) => {
        !f.contains(A.target) && !d.contains(A.target) && (f.style.display = "none", C = !1);
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
      }), s.appendChild(i), s.appendChild(D), s.appendChild(u), s.appendChild(d);
      const P = s.closest('[role="dialog"]');
      P ? P.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        u.style.opacity = "1", d.style.opacity = "1", D.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        u.style.opacity = "0", D.style.opacity = "0", C || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const R = (A) => {
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
        const U = document.createElement("img");
        U.src = i.src, U.alt = i.alt || "", U.style.cssText = `
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
        const G = r.attrs.alt;
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
        const B = () => {
          _.style.opacity = "0", U.style.transform = "scale(0.92)", setTimeout(() => _.remove(), 200);
        };
        _.addEventListener("click", (Z) => {
          Z.target === _ && B();
        }), V.addEventListener("click", B);
        const W = (Z) => {
          Z.key === "Escape" && (B(), document.removeEventListener("keydown", W));
        };
        document.addEventListener("keydown", W), _.appendChild(U), _.appendChild(V), Q && _.appendChild(Q);
        const z = s.closest('[role="dialog"]');
        z ? z.appendChild(_) : document.body.appendChild(_), requestAnimationFrame(() => {
          _.style.opacity = "1", U.style.transform = "scale(1)";
        });
      };
      D.addEventListener("click", R);
      let L, $;
      const O = (A) => {
        A.preventDefault(), L = A.clientX, $ = i.offsetWidth, document.addEventListener("mousemove", K), document.addEventListener("mouseup", I);
      }, K = (A) => {
        const _ = A.clientX - L, U = Math.max(100, $ + _);
        i.style.width = `${U}px`;
      }, I = () => {
        document.removeEventListener("mousemove", K), document.removeEventListener("mouseup", I), setTimeout(() => {
        }, 100);
        const A = typeof o == "function" ? o() : null, _ = i.offsetWidth;
        if (A != null)
          try {
            const { state: U, dispatch: V } = n.view, G = U.doc.nodeAt(A);
            if (G && G.type.name === "resizableImage") {
              const Q = U.tr.setNodeMarkup(A, void 0, {
                ...G.attrs,
                width: _
              });
              V(Q);
            }
          } catch {
            n.chain().focus().setNodeSelection(A).updateAttributes("resizableImage", {
              width: _
            }).run();
          }
      };
      return u.addEventListener("mousedown", O), {
        dom: s,
        update: (A) => A.type.name !== "resizableImage" ? !1 : (r = A, l(A.attrs.src), i.alt = A.attrs.alt || "", A.attrs.width && (i.style.width = `${A.attrs.width}px`), a(A.attrs.align || "left"), !0),
        destroy: () => {
          u.removeEventListener("mousedown", O), D.removeEventListener("click", R), document.removeEventListener("click", M), f.remove();
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
const eN = {}, $n = {};
function Ht(e, t) {
  try {
    const o = (eN[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return o in $n ? $n[o] : Ca(o, o.split(":"));
  } catch {
    if (e in $n) return $n[e];
    const n = e?.match(tN);
    return n ? Ca(e, n.slice(1)) : NaN;
  }
}
const tN = /([+-]\d\d):?(\d\d)?/;
function Ca(e, t) {
  const n = +(t[0] || 0), o = +(t[1] || 0), r = +(t[2] || 0) / 60;
  return $n[e] = n * 60 + o > 0 ? n * 60 + o + r : n * 60 - o - r;
}
class nt extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Ht(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), mu(this), Es(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new nt(...n, t) : new nt(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new nt(+this, t);
  }
  getTimezoneOffset() {
    const t = -Ht(this.timeZone, this);
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
    return new nt(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ea = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Ea.test(e)) return;
  const t = e.replace(Ea, "$1UTC");
  nt.prototype[t] && (e.startsWith("get") ? nt.prototype[e] = function() {
    return this.internal[t]();
  } : (nt.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), nN(this), +this;
  }, nt.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Es(this), +this;
  }));
});
function Es(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Ht(e.timeZone, e) * 60));
}
function nN(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), mu(e);
}
function mu(e) {
  const t = Ht(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), o = /* @__PURE__ */ new Date(+e);
  o.setUTCHours(o.getUTCHours() - 1);
  const r = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+o)).getTimezoneOffset(), a = r - s, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const c = r - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const u = r > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, d = Math.round(-(Ht(e.timeZone, e) * 60)) % 60;
  (d || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + u));
  const f = Ht(e.timeZone, e), h = f > 0 ? Math.floor(f) : Math.ceil(f), p = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, b = h !== n, v = p - c;
  if (b && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const N = Ht(e.timeZone, e), y = N > 0 ? Math.floor(N) : Math.ceil(N), E = h - y;
    E && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + E), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + E));
  }
}
class Ae extends nt {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Ae(...n, t) : new Ae(Date.now(), t);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [t, n, o] = this.tzComponents(), r = `${t}${n}:${o}`;
    return this.internal.toISOString().slice(0, -1) + r;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [t, n, o, r] = this.internal.toUTCString().split(" ");
    return `${t?.slice(0, -1)} ${o} ${n} ${r}`;
  }
  toTimeString() {
    const t = this.internal.toUTCString().split(" ")[4], [n, o, r] = this.tzComponents();
    return `${t} GMT${n}${o}${r} (${Jv(this.timeZone, this)})`;
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
    const t = this.getTimezoneOffset(), n = t > 0 ? "-" : "+", o = String(Math.floor(Math.abs(t) / 60)).padStart(2, "0"), r = String(Math.abs(t) % 60).padStart(2, "0");
    return [n, o, r];
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
const fu = 6048e5, oN = 864e5, Ta = Symbol.for("constructDateFrom");
function ke(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ta in e ? e[Ta](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function pe(e, t) {
  return ke(t || e, e);
}
function hu(e, t, n) {
  const o = pe(e, n?.in);
  return isNaN(t) ? ke(e, NaN) : (t && o.setDate(o.getDate() + t), o);
}
function pu(e, t, n) {
  const o = pe(e, n?.in);
  if (isNaN(t)) return ke(e, NaN);
  if (!t)
    return o;
  const r = o.getDate(), s = ke(e, o.getTime());
  s.setMonth(o.getMonth() + t + 1, 0);
  const a = s.getDate();
  return r >= a ? s : (o.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    r
  ), o);
}
let rN = {};
function to() {
  return rN;
}
function bn(e, t) {
  const n = to(), o = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = pe(e, t?.in), s = r.getDay(), a = (s < o ? 7 : 0) + s - o;
  return r.setDate(r.getDate() - a), r.setHours(0, 0, 0, 0), r;
}
function Gn(e, t) {
  return bn(e, { ...t, weekStartsOn: 1 });
}
function gu(e, t) {
  const n = pe(e, t?.in), o = n.getFullYear(), r = ke(n, 0);
  r.setFullYear(o + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Gn(r), a = ke(n, 0);
  a.setFullYear(o, 0, 4), a.setHours(0, 0, 0, 0);
  const i = Gn(a);
  return n.getTime() >= s.getTime() ? o + 1 : n.getTime() >= i.getTime() ? o : o - 1;
}
function Sa(e) {
  const t = pe(e), n = new Date(
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
function Sn(e, ...t) {
  const n = ke.bind(
    null,
    t.find((o) => typeof o == "object")
  );
  return t.map(n);
}
function qn(e, t) {
  const n = pe(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function bu(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  ), s = qn(o), a = qn(r), i = +s - Sa(s), c = +a - Sa(a);
  return Math.round((i - c) / oN);
}
function sN(e, t) {
  const n = gu(e, t), o = ke(e, 0);
  return o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0), Gn(o);
}
function iN(e, t, n) {
  return hu(e, t * 7, n);
}
function aN(e, t, n) {
  return pu(e, t * 12, n);
}
function cN(e, t) {
  let n, o = t?.in;
  return e.forEach((r) => {
    !o && typeof r == "object" && (o = ke.bind(null, r));
    const s = pe(r, o);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), ke(o, n || NaN);
}
function lN(e, t) {
  let n, o = t?.in;
  return e.forEach((r) => {
    !o && typeof r == "object" && (o = ke.bind(null, r));
    const s = pe(r, o);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), ke(o, n || NaN);
}
function uN(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  );
  return +qn(o) == +qn(r);
}
function vu(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function dN(e) {
  return !(!vu(e) && typeof e != "number" || isNaN(+pe(e)));
}
function mN(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  ), s = o.getFullYear() - r.getFullYear(), a = o.getMonth() - r.getMonth();
  return s * 12 + a;
}
function fN(e, t) {
  const n = pe(e, t?.in), o = n.getMonth();
  return n.setFullYear(n.getFullYear(), o + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Nu(e, t) {
  const [n, o] = Sn(e, t.start, t.end);
  return { start: n, end: o };
}
function hN(e, t) {
  const { start: n, end: o } = Nu(t?.in, e);
  let r = +n > +o;
  const s = r ? +n : +o, a = r ? o : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const c = [];
  for (; +a <= s; )
    c.push(ke(n, a)), a.setMonth(a.getMonth() + i);
  return r ? c.reverse() : c;
}
function pN(e, t) {
  const n = pe(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function gN(e, t) {
  const n = pe(e, t?.in), o = n.getFullYear();
  return n.setFullYear(o + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function yu(e, t) {
  const n = pe(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function bN(e, t) {
  const { start: n, end: o } = Nu(t?.in, e);
  let r = +n > +o;
  const s = r ? +n : +o, a = r ? o : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +a <= s; )
    c.push(ke(n, a)), a.setFullYear(a.getFullYear() + i);
  return r ? c.reverse() : c;
}
function ku(e, t) {
  const n = to(), o = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = pe(e, t?.in), s = r.getDay(), a = (s < o ? -7 : 0) + 6 - (s - o);
  return r.setDate(r.getDate() + a), r.setHours(23, 59, 59, 999), r;
}
function vN(e, t) {
  return ku(e, { ...t, weekStartsOn: 1 });
}
const NN = {
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
}, yN = (e, t, n) => {
  let o;
  const r = NN[e];
  return typeof r == "string" ? o = r : t === 1 ? o = r.one : o = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + o : o + " ago" : o;
};
function Zr(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const kN = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, xN = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, wN = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, CN = {
  date: Zr({
    formats: kN,
    defaultWidth: "full"
  }),
  time: Zr({
    formats: xN,
    defaultWidth: "full"
  }),
  dateTime: Zr({
    formats: wN,
    defaultWidth: "full"
  })
}, EN = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, TN = (e, t, n, o) => EN[e];
function Rn(e) {
  return (t, n) => {
    const o = n?.context ? String(n.context) : "standalone";
    let r;
    if (o === "formatting" && e.formattingValues) {
      const a = e.defaultFormattingWidth || e.defaultWidth, i = n?.width ? String(n.width) : a;
      r = e.formattingValues[i] || e.formattingValues[a];
    } else {
      const a = e.defaultWidth, i = n?.width ? String(n.width) : e.defaultWidth;
      r = e.values[i] || e.values[a];
    }
    const s = e.argumentCallback ? e.argumentCallback(t) : t;
    return r[s];
  };
}
const SN = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, MN = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, DN = {
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
}, AN = {
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
}, PN = {
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
}, IN = {
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
}, RN = (e, t) => {
  const n = Number(e), o = n % 100;
  if (o > 20 || o < 10)
    switch (o % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, LN = {
  ordinalNumber: RN,
  era: Rn({
    values: SN,
    defaultWidth: "wide"
  }),
  quarter: Rn({
    values: MN,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Rn({
    values: DN,
    defaultWidth: "wide"
  }),
  day: Rn({
    values: AN,
    defaultWidth: "wide"
  }),
  dayPeriod: Rn({
    values: PN,
    defaultWidth: "wide",
    formattingValues: IN,
    defaultFormattingWidth: "wide"
  })
};
function Ln(e) {
  return (t, n = {}) => {
    const o = n.width, r = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth], s = t.match(r);
    if (!s)
      return null;
    const a = s[0], i = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? _N(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      ON(i, (d) => d.test(a))
    );
    let l;
    l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(l)
    ) : l;
    const u = t.slice(a.length);
    return { value: l, rest: u };
  };
}
function ON(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function _N(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function $N(e) {
  return (t, n = {}) => {
    const o = t.match(e.matchPattern);
    if (!o) return null;
    const r = o[0], s = t.match(e.parsePattern);
    if (!s) return null;
    let a = e.valueCallback ? e.valueCallback(s[0]) : s[0];
    a = n.valueCallback ? n.valueCallback(a) : a;
    const i = t.slice(r.length);
    return { value: a, rest: i };
  };
}
const WN = /^(\d+)(th|st|nd|rd)?/i, BN = /\d+/i, HN = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, FN = {
  any: [/^b/i, /^(a|c)/i]
}, zN = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, UN = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, YN = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, jN = {
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
}, VN = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, KN = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, GN = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, qN = {
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
}, XN = {
  ordinalNumber: $N({
    matchPattern: WN,
    parsePattern: BN,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ln({
    matchPatterns: HN,
    defaultMatchWidth: "wide",
    parsePatterns: FN,
    defaultParseWidth: "any"
  }),
  quarter: Ln({
    matchPatterns: zN,
    defaultMatchWidth: "wide",
    parsePatterns: UN,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ln({
    matchPatterns: YN,
    defaultMatchWidth: "wide",
    parsePatterns: jN,
    defaultParseWidth: "any"
  }),
  day: Ln({
    matchPatterns: VN,
    defaultMatchWidth: "wide",
    parsePatterns: KN,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ln({
    matchPatterns: GN,
    defaultMatchWidth: "any",
    parsePatterns: qN,
    defaultParseWidth: "any"
  })
}, pi = {
  code: "en-US",
  formatDistance: yN,
  formatLong: CN,
  formatRelative: TN,
  localize: LN,
  match: XN,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function ZN(e, t) {
  const n = pe(e, t?.in);
  return bu(n, yu(n)) + 1;
}
function xu(e, t) {
  const n = pe(e, t?.in), o = +Gn(n) - +sN(n);
  return Math.round(o / fu) + 1;
}
function wu(e, t) {
  const n = pe(e, t?.in), o = n.getFullYear(), r = to(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = ke(t?.in || e, 0);
  a.setFullYear(o + 1, 0, s), a.setHours(0, 0, 0, 0);
  const i = bn(a, t), c = ke(t?.in || e, 0);
  c.setFullYear(o, 0, s), c.setHours(0, 0, 0, 0);
  const l = bn(c, t);
  return +n >= +i ? o + 1 : +n >= +l ? o : o - 1;
}
function QN(e, t) {
  const n = to(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, r = wu(e, t), s = ke(t?.in || e, 0);
  return s.setFullYear(r, 0, o), s.setHours(0, 0, 0, 0), bn(s, t);
}
function Cu(e, t) {
  const n = pe(e, t?.in), o = +bn(n, t) - +QN(n, t);
  return Math.round(o / fu) + 1;
}
function he(e, t) {
  const n = e < 0 ? "-" : "", o = Math.abs(e).toString().padStart(t, "0");
  return n + o;
}
const Et = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), o = n > 0 ? n : 1 - n;
    return he(t === "yy" ? o % 100 : o, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : he(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return he(e.getDate(), t.length);
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
    return he(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return he(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return he(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return he(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, o = e.getMilliseconds(), r = Math.trunc(
      o * Math.pow(10, n - 3)
    );
    return he(r, t.length);
  }
}, nn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Ma = {
  // Era
  G: function(e, t, n) {
    const o = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return n.era(o, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return n.era(o, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return n.era(o, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const o = e.getFullYear(), r = o > 0 ? o : 1 - o;
      return n.ordinalNumber(r, { unit: "year" });
    }
    return Et.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, o) {
    const r = wu(e, o), s = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const a = s % 100;
      return he(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : he(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = gu(e);
    return he(n, t.length);
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
    return he(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const o = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(o);
      // 01, 02, 03, 04
      case "QQ":
        return he(o, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return n.ordinalNumber(o, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return n.quarter(o, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return n.quarter(o, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return n.quarter(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const o = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "q":
        return String(o);
      // 01, 02, 03, 04
      case "qq":
        return he(o, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return n.ordinalNumber(o, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return n.quarter(o, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return n.quarter(o, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return n.quarter(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const o = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Et.M(e, t);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return n.ordinalNumber(o + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return n.month(o, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return n.month(o, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return n.month(o, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const o = e.getMonth();
    switch (t) {
      // 1, 2, ..., 12
      case "L":
        return String(o + 1);
      // 01, 02, ..., 12
      case "LL":
        return he(o + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return n.ordinalNumber(o + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return n.month(o, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return n.month(o, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return n.month(o, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, o) {
    const r = Cu(e, o);
    return t === "wo" ? n.ordinalNumber(r, { unit: "week" }) : he(r, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const o = xu(e);
    return t === "Io" ? n.ordinalNumber(o, { unit: "week" }) : he(o, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Et.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const o = ZN(e);
    return t === "Do" ? n.ordinalNumber(o, { unit: "dayOfYear" }) : he(o, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const o = e.getDay();
    switch (t) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return n.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return n.day(o, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return n.day(o, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return n.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, o) {
    const r = e.getDay(), s = (r - o.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(s);
      // Padded numerical value
      case "ee":
        return he(s, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return n.ordinalNumber(s, { unit: "day" });
      case "eee":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, o) {
    const r = e.getDay(), s = (r - o.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(s);
      // Padded numerical value
      case "cc":
        return he(s, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return n.ordinalNumber(s, { unit: "day" });
      case "ccc":
        return n.day(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return n.day(r, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return n.day(r, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return n.day(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const o = e.getDay(), r = o === 0 ? 7 : o;
    switch (t) {
      // 2
      case "i":
        return String(r);
      // 02
      case "ii":
        return he(r, t.length);
      // 2nd
      case "io":
        return n.ordinalNumber(r, { unit: "day" });
      // Tue
      case "iii":
        return n.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return n.day(o, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return n.day(o, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return n.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const r = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const o = e.getHours();
    let r;
    switch (o === 12 ? r = nn.noon : o === 0 ? r = nn.midnight : r = o / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const o = e.getHours();
    let r;
    switch (o >= 17 ? r = nn.evening : o >= 12 ? r = nn.afternoon : o >= 4 ? r = nn.morning : r = nn.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let o = e.getHours() % 12;
      return o === 0 && (o = 12), n.ordinalNumber(o, { unit: "hour" });
    }
    return Et.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Et.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const o = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(o, { unit: "hour" }) : he(o, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let o = e.getHours();
    return o === 0 && (o = 24), t === "ko" ? n.ordinalNumber(o, { unit: "hour" }) : he(o, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Et.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Et.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Et.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const o = e.getTimezoneOffset();
    if (o === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Aa(o);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return $t(o);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return $t(o, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const o = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Aa(o);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return $t(o);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return $t(o, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const o = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Da(o, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + $t(o, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const o = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Da(o, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + $t(o, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const o = Math.trunc(+e / 1e3);
    return he(o, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return he(+e, t.length);
  }
};
function Da(e, t = "") {
  const n = e > 0 ? "-" : "+", o = Math.abs(e), r = Math.trunc(o / 60), s = o % 60;
  return s === 0 ? n + String(r) : n + String(r) + t + he(s, 2);
}
function Aa(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + he(Math.abs(e) / 60, 2) : $t(e, t);
}
function $t(e, t = "") {
  const n = e > 0 ? "-" : "+", o = Math.abs(e), r = he(Math.trunc(o / 60), 2), s = he(o % 60, 2);
  return n + r + t + s;
}
const Pa = (e, t) => {
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
}, Eu = (e, t) => {
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
}, JN = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], o = n[1], r = n[2];
  if (!r)
    return Pa(e, t);
  let s;
  switch (o) {
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
  return s.replace("{{date}}", Pa(o, t)).replace("{{time}}", Eu(r, t));
}, e0 = {
  p: Eu,
  P: JN
}, t0 = /^D+$/, n0 = /^Y+$/, o0 = ["D", "DD", "YY", "YYYY"];
function r0(e) {
  return t0.test(e);
}
function s0(e) {
  return n0.test(e);
}
function i0(e, t, n) {
  const o = a0(e, t, n);
  if (console.warn(o), o0.includes(e)) throw new RangeError(o);
}
function a0(e, t, n) {
  const o = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${o} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const c0 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, l0 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, u0 = /^'([^]*?)'?$/, d0 = /''/g, m0 = /[a-zA-Z]/;
function f0(e, t, n) {
  const o = to(), r = n?.locale ?? o.locale ?? pi, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? o.weekStartsOn ?? o.locale?.options?.weekStartsOn ?? 0, i = pe(e, n?.in);
  if (!dN(i))
    throw new RangeError("Invalid time value");
  let c = t.match(l0).map((u) => {
    const d = u[0];
    if (d === "p" || d === "P") {
      const f = e0[d];
      return f(u, r.formatLong);
    }
    return u;
  }).join("").match(c0).map((u) => {
    if (u === "''")
      return { isToken: !1, value: "'" };
    const d = u[0];
    if (d === "'")
      return { isToken: !1, value: h0(u) };
    if (Ma[d])
      return { isToken: !0, value: u };
    if (d.match(m0))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: u };
  });
  r.localize.preprocessor && (c = r.localize.preprocessor(i, c));
  const l = {
    firstWeekContainsDate: s,
    weekStartsOn: a,
    locale: r
  };
  return c.map((u) => {
    if (!u.isToken) return u.value;
    const d = u.value;
    (!n?.useAdditionalWeekYearTokens && s0(d) || !n?.useAdditionalDayOfYearTokens && r0(d)) && i0(d, t, String(e));
    const f = Ma[d[0]];
    return f(i, d, r.localize, l);
  }).join("");
}
function h0(e) {
  const t = e.match(u0);
  return t ? t[1].replace(d0, "'") : e;
}
function p0(e, t) {
  const n = pe(e, t?.in), o = n.getFullYear(), r = n.getMonth(), s = ke(n, 0);
  return s.setFullYear(o, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function g0(e, t) {
  return pe(e, t?.in).getMonth();
}
function b0(e, t) {
  return pe(e, t?.in).getFullYear();
}
function v0(e, t) {
  return +pe(e) > +pe(t);
}
function N0(e, t) {
  return +pe(e) < +pe(t);
}
function y0(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  );
  return o.getFullYear() === r.getFullYear() && o.getMonth() === r.getMonth();
}
function k0(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  );
  return o.getFullYear() === r.getFullYear();
}
function x0(e, t, n) {
  const o = pe(e, n?.in), r = o.getFullYear(), s = o.getDate(), a = ke(e, 0);
  a.setFullYear(r, t, 15), a.setHours(0, 0, 0, 0);
  const i = p0(a);
  return o.setMonth(t, Math.min(s, i)), o;
}
function w0(e, t, n) {
  const o = pe(e, n?.in);
  return isNaN(+o) ? ke(e, NaN) : (o.setFullYear(t), o);
}
const Ia = 5, C0 = 4;
function E0(e, t) {
  const n = t.startOfMonth(e), o = n.getDay() > 0 ? n.getDay() : 7, r = t.addDays(e, -o + 1), s = t.addDays(r, Ia * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Ia : C0;
}
function Tu(e, t) {
  const n = t.startOfMonth(e), o = n.getDay();
  return o === 1 ? n : o === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (o - 1));
}
function T0(e, t) {
  const n = Tu(e, t), o = E0(e, t);
  return t.addDays(n, o * 7 - 1);
}
class Be {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ae.tz(this.options.timeZone) : new this.Date(), this.newDate = (o, r, s) => this.overrides?.newDate ? this.overrides.newDate(o, r, s) : this.options.timeZone ? new Ae(o, r, s, this.options.timeZone) : new Date(o, r, s), this.addDays = (o, r) => this.overrides?.addDays ? this.overrides.addDays(o, r) : hu(o, r), this.addMonths = (o, r) => this.overrides?.addMonths ? this.overrides.addMonths(o, r) : pu(o, r), this.addWeeks = (o, r) => this.overrides?.addWeeks ? this.overrides.addWeeks(o, r) : iN(o, r), this.addYears = (o, r) => this.overrides?.addYears ? this.overrides.addYears(o, r) : aN(o, r), this.differenceInCalendarDays = (o, r) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(o, r) : bu(o, r), this.differenceInCalendarMonths = (o, r) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(o, r) : mN(o, r), this.eachMonthOfInterval = (o) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(o) : hN(o), this.eachYearOfInterval = (o) => {
      const r = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(o) : bN(o), s = new Set(r.map((i) => this.getYear(i)));
      if (s.size === r.length)
        return r;
      const a = [];
      return s.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (o) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(o) : T0(o, this), this.endOfISOWeek = (o) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(o) : vN(o), this.endOfMonth = (o) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(o) : fN(o), this.endOfWeek = (o, r) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(o, r) : ku(o, this.options), this.endOfYear = (o) => this.overrides?.endOfYear ? this.overrides.endOfYear(o) : gN(o), this.format = (o, r, s) => {
      const a = this.overrides?.format ? this.overrides.format(o, r, this.options) : f0(o, r, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (o) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(o) : xu(o), this.getMonth = (o, r) => this.overrides?.getMonth ? this.overrides.getMonth(o, this.options) : g0(o, this.options), this.getYear = (o, r) => this.overrides?.getYear ? this.overrides.getYear(o, this.options) : b0(o, this.options), this.getWeek = (o, r) => this.overrides?.getWeek ? this.overrides.getWeek(o, this.options) : Cu(o, this.options), this.isAfter = (o, r) => this.overrides?.isAfter ? this.overrides.isAfter(o, r) : v0(o, r), this.isBefore = (o, r) => this.overrides?.isBefore ? this.overrides.isBefore(o, r) : N0(o, r), this.isDate = (o) => this.overrides?.isDate ? this.overrides.isDate(o) : vu(o), this.isSameDay = (o, r) => this.overrides?.isSameDay ? this.overrides.isSameDay(o, r) : uN(o, r), this.isSameMonth = (o, r) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(o, r) : y0(o, r), this.isSameYear = (o, r) => this.overrides?.isSameYear ? this.overrides.isSameYear(o, r) : k0(o, r), this.max = (o) => this.overrides?.max ? this.overrides.max(o) : cN(o), this.min = (o) => this.overrides?.min ? this.overrides.min(o) : lN(o), this.setMonth = (o, r) => this.overrides?.setMonth ? this.overrides.setMonth(o, r) : x0(o, r), this.setYear = (o, r) => this.overrides?.setYear ? this.overrides.setYear(o, r) : w0(o, r), this.startOfBroadcastWeek = (o, r) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(o, this) : Tu(o, this), this.startOfDay = (o) => this.overrides?.startOfDay ? this.overrides.startOfDay(o) : qn(o), this.startOfISOWeek = (o) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(o) : Gn(o), this.startOfMonth = (o) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(o) : pN(o), this.startOfWeek = (o, r) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(o, this.options) : bn(o, this.options), this.startOfYear = (o) => this.overrides?.startOfYear ? this.overrides.startOfYear(o) : yu(o), this.options = { locale: pi, ...t }, this.overrides = n;
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
    }), o = {};
    for (let r = 0; r < 10; r++)
      o[r.toString()] = n.format(r);
    return o;
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
    return t.replace(/\d/g, (o) => n[o] || o);
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
    const { locale: n, timeZone: o, numerals: r } = this.options, s = n?.code;
    if (s && Be.yearFirstLocales.has(s))
      try {
        return new Intl.DateTimeFormat(s, {
          month: "long",
          year: "numeric",
          timeZone: o,
          numberingSystem: r
        }).format(t);
      } catch {
      }
    const a = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, a);
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
class Su {
  constructor(t, n, o = it) {
    this.date = t, this.displayMonth = n, this.outside = !!(n && !o.isSameMonth(t, n)), this.dateLib = o;
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
class S0 {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class M0 {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function D0(e) {
  return X.createElement("button", { ...e });
}
function A0(e) {
  return X.createElement("span", { ...e });
}
function P0(e) {
  const { size: t = 24, orientation: n = "left", className: o } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    X.createElement(
      "svg",
      { className: o, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && X.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && X.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && X.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && X.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function I0(e) {
  const { day: t, modifiers: n, ...o } = e;
  return X.createElement("td", { ...o });
}
function R0(e) {
  const { day: t, modifiers: n, ...o } = e, r = X.useRef(null);
  return X.useEffect(() => {
    n.focused && r.current?.focus();
  }, [n.focused]), X.createElement("button", { ref: r, ...o });
}
var te;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(te || (te = {}));
var ge;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(ge || (ge = {}));
var Ke;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ke || (Ke = {}));
var _e;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(_e || (_e = {}));
function L0(e) {
  const { options: t, className: n, components: o, classNames: r, ...s } = e, a = [r[te.Dropdown], n].join(" "), i = t?.find(({ value: c }) => c === s.value);
  return X.createElement(
    "span",
    { "data-disabled": s.disabled, className: r[te.DropdownRoot] },
    X.createElement(o.Select, { className: a, ...s }, t?.map(({ value: c, label: l, disabled: u }) => X.createElement(o.Option, { key: c, value: c, disabled: u }, l))),
    X.createElement(
      "span",
      { className: r[te.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      X.createElement(o.Chevron, { orientation: "down", size: 18, className: r[te.Chevron] })
    )
  );
}
function O0(e) {
  return X.createElement("div", { ...e });
}
function _0(e) {
  return X.createElement("div", { ...e });
}
function $0(e) {
  const { calendarMonth: t, displayIndex: n, ...o } = e;
  return X.createElement("div", { ...o }, e.children);
}
function W0(e) {
  const { calendarMonth: t, displayIndex: n, ...o } = e;
  return X.createElement("div", { ...o });
}
function B0(e) {
  return X.createElement("table", { ...e });
}
function H0(e) {
  return X.createElement("div", { ...e });
}
const Mu = ec(void 0);
function no() {
  const e = tc(Mu);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function F0(e) {
  const { components: t } = no();
  return X.createElement(t.Dropdown, { ...e });
}
function z0(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: o, nextMonth: r, ...s } = e, { components: a, classNames: i, labels: { labelPrevious: c, labelNext: l } } = no(), u = H((f) => {
    r && n?.(f);
  }, [r, n]), d = H((f) => {
    o && t?.(f);
  }, [o, t]);
  return X.createElement(
    "nav",
    { ...s },
    X.createElement(
      a.PreviousMonthButton,
      { type: "button", className: i[te.PreviousMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": c(o), onClick: d },
      X.createElement(a.Chevron, { disabled: o ? void 0 : !0, className: i[te.Chevron], orientation: "left" })
    ),
    X.createElement(
      a.NextMonthButton,
      { type: "button", className: i[te.NextMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: u },
      X.createElement(a.Chevron, { disabled: r ? void 0 : !0, orientation: "right", className: i[te.Chevron] })
    )
  );
}
function U0(e) {
  const { components: t } = no();
  return X.createElement(t.Button, { ...e });
}
function Y0(e) {
  return X.createElement("option", { ...e });
}
function j0(e) {
  const { components: t } = no();
  return X.createElement(t.Button, { ...e });
}
function V0(e) {
  const { rootRef: t, ...n } = e;
  return X.createElement("div", { ...n, ref: t });
}
function K0(e) {
  return X.createElement("select", { ...e });
}
function G0(e) {
  const { week: t, ...n } = e;
  return X.createElement("tr", { ...n });
}
function q0(e) {
  return X.createElement("th", { ...e });
}
function X0(e) {
  return X.createElement(
    "thead",
    { "aria-hidden": !0 },
    X.createElement("tr", { ...e })
  );
}
function Z0(e) {
  const { week: t, ...n } = e;
  return X.createElement("th", { ...n });
}
function Q0(e) {
  return X.createElement("th", { ...e });
}
function J0(e) {
  return X.createElement("tbody", { ...e });
}
function ey(e) {
  const { components: t } = no();
  return X.createElement(t.Dropdown, { ...e });
}
const ty = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: D0,
  CaptionLabel: A0,
  Chevron: P0,
  Day: I0,
  DayButton: R0,
  Dropdown: L0,
  DropdownNav: O0,
  Footer: _0,
  Month: $0,
  MonthCaption: W0,
  MonthGrid: B0,
  Months: H0,
  MonthsDropdown: F0,
  Nav: z0,
  NextMonthButton: U0,
  Option: Y0,
  PreviousMonthButton: j0,
  Root: V0,
  Select: K0,
  Week: G0,
  WeekNumber: Z0,
  WeekNumberHeader: Q0,
  Weekday: q0,
  Weekdays: X0,
  Weeks: J0,
  YearsDropdown: ey
}, Symbol.toStringTag, { value: "Module" }));
function mt(e, t, n = !1, o = it) {
  let { from: r, to: s } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = o;
  return r && s ? (a(s, r) < 0 && ([r, s] = [s, r]), a(t, r) >= (n ? 1 : 0) && a(s, t) >= (n ? 1 : 0)) : !n && s ? i(s, t) : !n && r ? i(r, t) : !1;
}
function Du(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function gi(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Au(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Pu(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Iu(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Ru(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function ft(e, t, n = it) {
  const o = Array.isArray(t) ? t : [t], { isSameDay: r, differenceInCalendarDays: s, isAfter: a } = n;
  return o.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return r(e, i);
    if (Ru(i, n))
      return i.includes(e);
    if (gi(i))
      return mt(i, e, !1, n);
    if (Iu(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Du(i)) {
      const c = s(i.before, e), l = s(i.after, e), u = c > 0, d = l < 0;
      return a(i.before, i.after) ? d && u : u || d;
    }
    return Au(i) ? s(e, i.after) > 0 : Pu(i) ? s(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function ny(e, t, n, o, r) {
  const { disabled: s, hidden: a, modifiers: i, showOutsideDays: c, broadcastCalendar: l, today: u } = t, { isSameDay: d, isSameMonth: f, startOfMonth: h, isBefore: g, endOfMonth: p, isAfter: b } = r, v = n && h(n), N = o && p(o), y = {
    [ge.focused]: [],
    [ge.outside]: [],
    [ge.disabled]: [],
    [ge.hidden]: [],
    [ge.today]: []
  }, E = {};
  for (const k of e) {
    const { date: w, displayMonth: S } = k, x = !!(S && !f(w, S)), C = !!(v && g(w, v)), M = !!(N && b(w, N)), D = !!(s && ft(w, s, r)), P = !!(a && ft(w, a, r)) || C || M || // Broadcast calendar will show outside days as default
    !l && !c && x || l && c === !1 && x, R = d(w, u ?? r.today());
    x && y.outside.push(k), D && y.disabled.push(k), P && y.hidden.push(k), R && y.today.push(k), i && Object.keys(i).forEach((L) => {
      const $ = i?.[L];
      $ && ft(w, $, r) && (E[L] ? E[L].push(k) : E[L] = [k]);
    });
  }
  return (k) => {
    const w = {
      [ge.focused]: !1,
      [ge.disabled]: !1,
      [ge.hidden]: !1,
      [ge.outside]: !1,
      [ge.today]: !1
    }, S = {};
    for (const x in y) {
      const C = y[x];
      w[x] = C.some((M) => M === k);
    }
    for (const x in E)
      S[x] = E[x].some((C) => C === k);
    return {
      ...w,
      // custom modifiers should override all the previous ones
      ...S
    };
  };
}
function oy(e, t, n = {}) {
  return Object.entries(e).filter(([, r]) => r === !0).reduce((r, [s]) => (n[s] ? r.push(n[s]) : t[ge[s]] ? r.push(t[ge[s]]) : t[Ke[s]] && r.push(t[Ke[s]]), r), [t[te.Day]]);
}
function ry(e) {
  return {
    ...ty,
    ...e
  };
}
function sy(e) {
  const t = {
    "data-mode": e.mode ?? void 0,
    "data-required": "required" in e ? e.required : void 0,
    "data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
    "data-week-numbers": e.showWeekNumber || void 0,
    "data-broadcast-calendar": e.broadcastCalendar || void 0,
    "data-nav-layout": e.navLayout || void 0
  };
  return Object.entries(e).forEach(([n, o]) => {
    n.startsWith("data-") && (t[n] = o);
  }), t;
}
function bi() {
  const e = {};
  for (const t in te)
    e[te[t]] = `rdp-${te[t]}`;
  for (const t in ge)
    e[ge[t]] = `rdp-${ge[t]}`;
  for (const t in Ke)
    e[Ke[t]] = `rdp-${Ke[t]}`;
  for (const t in _e)
    e[_e[t]] = `rdp-${_e[t]}`;
  return e;
}
function Lu(e, t, n) {
  return (n ?? new Be(t)).formatMonthYear(e);
}
const iy = Lu;
function ay(e, t, n) {
  return (n ?? new Be(t)).format(e, "d");
}
function cy(e, t = it) {
  return t.format(e, "LLLL");
}
function ly(e, t, n) {
  return (n ?? new Be(t)).format(e, "cccccc");
}
function uy(e, t = it) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function dy() {
  return "";
}
function Ou(e, t = it) {
  return t.format(e, "yyyy");
}
const my = Ou, fy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Lu,
  formatDay: ay,
  formatMonthCaption: iy,
  formatMonthDropdown: cy,
  formatWeekNumber: uy,
  formatWeekNumberHeader: dy,
  formatWeekdayName: ly,
  formatYearCaption: my,
  formatYearDropdown: Ou
}, Symbol.toStringTag, { value: "Module" }));
function hy(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...fy,
    ...e
  };
}
function py(e, t, n, o, r) {
  const { startOfMonth: s, startOfYear: a, endOfYear: i, eachMonthOfInterval: c, getMonth: l } = r;
  return c({
    start: a(e),
    end: i(e)
  }).map((f) => {
    const h = o.formatMonthDropdown(f, r), g = l(f), p = t && f < s(t) || n && f > s(n) || !1;
    return { value: g, label: h, disabled: p };
  });
}
function gy(e, t = {}, n = {}) {
  let o = { ...t?.[te.Day] };
  return Object.entries(e).filter(([, r]) => r === !0).forEach(([r]) => {
    o = {
      ...o,
      ...n?.[r]
    };
  }), o;
}
function by(e, t, n) {
  const o = e.today(), r = t ? e.startOfISOWeek(o) : e.startOfWeek(o), s = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(r, a);
    s.push(i);
  }
  return s;
}
function vy(e, t, n, o, r = !1) {
  if (!e || !t)
    return;
  const { startOfYear: s, endOfYear: a, eachYearOfInterval: i, getYear: c } = o, l = s(e), u = a(t), d = i({ start: l, end: u });
  return r && d.reverse(), d.map((f) => {
    const h = n.formatYearDropdown(f, o);
    return {
      value: c(f),
      label: h,
      disabled: !1
    };
  });
}
function _u(e, t, n, o) {
  let r = (o ?? new Be(n)).format(e, "PPPP");
  return t.today && (r = `Today, ${r}`), t.selected && (r = `${r}, selected`), r;
}
const Ny = _u;
function $u(e, t, n) {
  return (n ?? new Be(t)).formatMonthYear(e);
}
const yy = $u;
function ky(e, t, n, o) {
  let r = (o ?? new Be(n)).format(e, "PPPP");
  return t?.today && (r = `Today, ${r}`), r;
}
function xy(e) {
  return "Choose the Month";
}
function wy() {
  return "";
}
function Cy(e) {
  return "Go to the Next Month";
}
function Ey(e) {
  return "Go to the Previous Month";
}
function Ty(e, t, n) {
  return (n ?? new Be(t)).format(e, "cccc");
}
function Sy(e, t) {
  return `Week ${e}`;
}
function My(e) {
  return "Week Number";
}
function Dy(e) {
  return "Choose the Year";
}
const Ay = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: yy,
  labelDay: Ny,
  labelDayButton: _u,
  labelGrid: $u,
  labelGridcell: ky,
  labelMonthDropdown: xy,
  labelNav: wy,
  labelNext: Cy,
  labelPrevious: Ey,
  labelWeekNumber: Sy,
  labelWeekNumberHeader: My,
  labelWeekday: Ty,
  labelYearDropdown: Dy
}, Symbol.toStringTag, { value: "Module" })), oo = (e) => e instanceof HTMLElement ? e : null, Qr = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Py = (e) => oo(e.querySelector("[data-animated-month]")), Jr = (e) => oo(e.querySelector("[data-animated-caption]")), es = (e) => oo(e.querySelector("[data-animated-weeks]")), Iy = (e) => oo(e.querySelector("[data-animated-nav]")), Ry = (e) => oo(e.querySelector("[data-animated-weekdays]"));
function Ly(e, t, { classNames: n, months: o, focused: r, dateLib: s }) {
  const a = j(null), i = j(o), c = j(!1);
  rr(() => {
    const l = i.current;
    if (i.current = o, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    o.length === 0 || l.length === 0 || o.length !== l.length)
      return;
    const u = s.isSameMonth(o[0].date, l[0].date), d = s.isAfter(o[0].date, l[0].date), f = d ? n[_e.caption_after_enter] : n[_e.caption_before_enter], h = d ? n[_e.weeks_after_enter] : n[_e.weeks_before_enter], g = a.current, p = e.current.cloneNode(!0);
    if (p instanceof HTMLElement ? (Qr(p).forEach((y) => {
      if (!(y instanceof HTMLElement))
        return;
      const E = Py(y);
      E && y.contains(E) && y.removeChild(E);
      const k = Jr(y);
      k && k.classList.remove(f);
      const w = es(y);
      w && w.classList.remove(h);
    }), a.current = p) : a.current = null, c.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    r)
      return;
    const b = g instanceof HTMLElement ? Qr(g) : [], v = Qr(e.current);
    if (v?.every((N) => N instanceof HTMLElement) && b && b.every((N) => N instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const N = Iy(e.current);
      N && (N.style.zIndex = "1"), v.forEach((y, E) => {
        const k = b[E];
        if (!k)
          return;
        y.style.position = "relative", y.style.overflow = "hidden";
        const w = Jr(y);
        w && w.classList.add(f);
        const S = es(y);
        S && S.classList.add(h);
        const x = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), N && (N.style.zIndex = ""), w && w.classList.remove(f), S && S.classList.remove(h), y.style.position = "", y.style.overflow = "", y.contains(k) && y.removeChild(k);
        };
        k.style.pointerEvents = "none", k.style.position = "absolute", k.style.overflow = "hidden", k.setAttribute("aria-hidden", "true");
        const C = Ry(k);
        C && (C.style.opacity = "0");
        const M = Jr(k);
        M && (M.classList.add(d ? n[_e.caption_before_exit] : n[_e.caption_after_exit]), M.addEventListener("animationend", x));
        const D = es(k);
        D && D.classList.add(d ? n[_e.weeks_before_exit] : n[_e.weeks_after_exit]), y.insertBefore(k, y.firstChild);
      });
    }
  });
}
function Oy(e, t, n, o) {
  const r = e[0], s = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: h, endOfMonth: g, endOfWeek: p, isAfter: b, startOfBroadcastWeek: v, startOfISOWeek: N, startOfWeek: y } = o, E = c ? v(r, o) : a ? N(r) : y(r), k = c ? f(s) : a ? h(g(s)) : p(g(s)), w = u(k, E), S = d(s, r) + 1, x = [];
  for (let D = 0; D <= w; D++) {
    const P = l(E, D);
    if (t && b(P, t))
      break;
    x.push(P);
  }
  const M = (c ? 35 : 42) * S;
  if (i && x.length < M) {
    const D = M - x.length;
    for (let P = 0; P < D; P++) {
      const R = l(x[x.length - 1], 1);
      x.push(R);
    }
  }
  return x;
}
function _y(e) {
  const t = [];
  return e.reduce((n, o) => {
    const r = o.weeks.reduce((s, a) => s.concat(a.days.slice()), t.slice());
    return n.concat(r.slice());
  }, t.slice());
}
function $y(e, t, n, o) {
  const { numberOfMonths: r = 1 } = n, s = [];
  for (let a = 0; a < r; a++) {
    const i = o.addMonths(e, a);
    if (t && i > t)
      break;
    s.push(i);
  }
  return s;
}
function Ra(e, t, n, o) {
  const { month: r, defaultMonth: s, today: a = o.today(), numberOfMonths: i = 1 } = e;
  let c = r || s || a;
  const { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = o;
  if (n && l(n, c) < i - 1) {
    const f = -1 * (i - 1);
    c = u(n, f);
  }
  return t && l(c, t) < 0 && (c = t), d(c);
}
function Wy(e, t, n, o) {
  const { addDays: r, endOfBroadcastWeek: s, endOfISOWeek: a, endOfMonth: i, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: h } = o, g = e.reduce((p, b) => {
    const v = n.broadcastCalendar ? d(b, o) : n.ISOWeek ? f(b) : h(b), N = n.broadcastCalendar ? s(b) : n.ISOWeek ? a(i(b)) : c(i(b)), y = t.filter((S) => S >= v && S <= N), E = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && y.length < E) {
      const S = t.filter((x) => {
        const C = E - y.length;
        return x > N && x <= r(N, C);
      });
      y.push(...S);
    }
    const k = y.reduce((S, x) => {
      const C = n.ISOWeek ? l(x) : u(x), M = S.find((P) => P.weekNumber === C), D = new Su(x, b, o);
      return M ? M.days.push(D) : S.push(new M0(C, [D])), S;
    }, []), w = new S0(b, k);
    return p.push(w), p;
  }, []);
  return n.reverseMonths ? g.reverse() : g;
}
function By(e, t) {
  let { startMonth: n, endMonth: o } = e;
  const { startOfYear: r, startOfDay: s, startOfMonth: a, endOfMonth: i, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: h, fromMonth: g, toMonth: p } = e;
  !n && g && (n = g), !n && f && (n = t.newDate(f, 0, 1)), !o && p && (o = p), !o && h && (o = u(h, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : f ? n = u(f, 0, 1) : !n && b && (n = r(c(e.today ?? d(), -100))), o ? o = i(o) : h ? o = u(h, 11, 31) : !o && b && (o = l(e.today ?? d())), [
    n && s(n),
    o && s(o)
  ];
}
function Hy(e, t, n, o) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: r, numberOfMonths: s = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: c } = o, l = r ? s : 1, u = a(e);
  if (!t)
    return i(u, l);
  if (!(c(t, e) < s))
    return i(u, l);
}
function Fy(e, t, n, o) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: r, numberOfMonths: s } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: c } = o, l = r ? s ?? 1 : 1, u = a(e);
  if (!t)
    return i(u, -l);
  if (!(c(u, t) <= 0))
    return i(u, -l);
}
function zy(e) {
  const t = [];
  return e.reduce((n, o) => n.concat(o.weeks.slice()), t.slice());
}
function kr(e, t) {
  const [n, o] = Y(e);
  return [t === void 0 ? n : t, o];
}
function Uy(e, t) {
  const [n, o] = By(e, t), { startOfMonth: r, endOfMonth: s } = t, a = Ra(e, n, o, t), [i, c] = kr(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  q(() => {
    const w = Ra(e, n, o, t);
    c(w);
  }, [e.timeZone]);
  const l = $y(i, o, e, t), u = Oy(l, e.endMonth ? s(e.endMonth) : void 0, e, t), d = Wy(l, u, e, t), f = zy(d), h = _y(d), g = Fy(i, n, e, t), p = Hy(i, o, e, t), { disableNavigation: b, onMonthChange: v } = e, N = (w) => f.some((S) => S.days.some((x) => x.isEqualTo(w))), y = (w) => {
    if (b)
      return;
    let S = r(w);
    n && S < r(n) && (S = r(n)), o && S > r(o) && (S = r(o)), c(S), v?.(S);
  };
  return {
    months: d,
    weeks: f,
    days: h,
    navStart: n,
    navEnd: o,
    previousMonth: g,
    nextMonth: p,
    goToMonth: y,
    goToDay: (w) => {
      N(w) || y(w.date);
    }
  };
}
var Je;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Je || (Je = {}));
function La(e) {
  return !e[ge.disabled] && !e[ge.hidden] && !e[ge.outside];
}
function Yy(e, t, n, o) {
  let r, s = -1;
  for (const a of e) {
    const i = t(a);
    La(i) && (i[ge.focused] && s < Je.FocusedModifier ? (r = a, s = Je.FocusedModifier) : o?.isEqualTo(a) && s < Je.LastFocused ? (r = a, s = Je.LastFocused) : n(a.date) && s < Je.Selected ? (r = a, s = Je.Selected) : i[ge.today] && s < Je.Today && (r = a, s = Je.Today));
  }
  return r || (r = e.find((a) => La(t(a)))), r;
}
function jy(e, t, n, o, r, s, a) {
  const { ISOWeek: i, broadcastCalendar: c } = s, { addDays: l, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: h, endOfISOWeek: g, endOfWeek: p, max: b, min: v, startOfBroadcastWeek: N, startOfISOWeek: y, startOfWeek: E } = a;
  let w = {
    day: l,
    week: d,
    month: u,
    year: f,
    startOfWeek: (S) => c ? N(S, a) : i ? y(S) : E(S),
    endOfWeek: (S) => c ? h(S) : i ? g(S) : p(S)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && o ? w = b([o, w]) : t === "after" && r && (w = v([r, w])), w;
}
function Wu(e, t, n, o, r, s, a, i = 0) {
  if (i > 365)
    return;
  const c = jy(e, t, n.date, o, r, s, a), l = !!(s.disabled && ft(c, s.disabled, a)), u = !!(s.hidden && ft(c, s.hidden, a)), d = c, f = new Su(c, d, a);
  return !l && !u ? f : Wu(e, t, f, o, r, s, a, i + 1);
}
function Vy(e, t, n, o, r) {
  const { autoFocus: s } = e, [a, i] = Y(), c = Yy(t.days, n, o || (() => !1), a), [l, u] = Y(s ? c : void 0);
  return {
    isFocusTarget: (p) => !!c?.isEqualTo(p),
    setFocused: u,
    focused: l,
    blur: () => {
      i(l), u(void 0);
    },
    moveFocus: (p, b) => {
      if (!l)
        return;
      const v = Wu(p, b, l, t.navStart, t.navEnd, e, r);
      v && (e.disableNavigation && !t.days.some((y) => y.isEqualTo(v)) || (t.goToDay(v), u(v)));
    }
  };
}
function Ky(e, t) {
  const { selected: n, required: o, onSelect: r } = e, [s, a] = kr(n, r ? n : void 0), i = r ? n : s, { isSameDay: c } = t, l = (h) => i?.some((g) => c(g, h)) ?? !1, { min: u, max: d } = e;
  return {
    selected: i,
    select: (h, g, p) => {
      let b = [...i ?? []];
      if (l(h)) {
        if (i?.length === u || o && i?.length === 1)
          return;
        b = i?.filter((v) => !c(v, h));
      } else
        i?.length === d ? b = [h] : b = [...b, h];
      return r || a(b), r?.(b, h, g, p), b;
    },
    isSelected: l
  };
}
function Gy(e, t, n = 0, o = 0, r = !1, s = it) {
  const { from: a, to: i } = t || {}, { isSameDay: c, isAfter: l, isBefore: u } = s;
  let d;
  if (!a && !i)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (a && !i)
    c(a, e) ? n === 0 ? d = { from: a, to: e } : r ? d = { from: a, to: void 0 } : d = void 0 : u(e, a) ? d = { from: e, to: a } : d = { from: a, to: e };
  else if (a && i)
    if (c(a, e) && c(i, e))
      r ? d = { from: a, to: i } : d = void 0;
    else if (c(a, e))
      d = { from: a, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (u(e, a))
      d = { from: e, to: i };
    else if (l(e, a))
      d = { from: a, to: e };
    else if (l(e, i))
      d = { from: a, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const f = s.differenceInCalendarDays(d.to, d.from);
    o > 0 && f > o ? d = { from: e, to: void 0 } : n > 1 && f < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function qy(e, t, n = it) {
  const o = Array.isArray(t) ? t : [t];
  let r = e.from;
  const s = n.differenceInCalendarDays(e.to, e.from), a = Math.min(s, 6);
  for (let i = 0; i <= a; i++) {
    if (o.includes(r.getDay()))
      return !0;
    r = n.addDays(r, 1);
  }
  return !1;
}
function Oa(e, t, n = it) {
  return mt(e, t.from, !1, n) || mt(e, t.to, !1, n) || mt(t, e.from, !1, n) || mt(t, e.to, !1, n);
}
function Xy(e, t, n = it) {
  const o = Array.isArray(t) ? t : [t];
  if (o.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? mt(e, i, !1, n) : Ru(i, n) ? i.some((c) => mt(e, c, !1, n)) : gi(i) ? i.from && i.to ? Oa(e, { from: i.from, to: i.to }, n) : !1 : Iu(i) ? qy(e, i.dayOfWeek, n) : Du(i) ? n.isAfter(i.before, i.after) ? Oa(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : ft(e.from, i, n) || ft(e.to, i, n) : Au(i) || Pu(i) ? ft(e.from, i, n) || ft(e.to, i, n) : !1))
    return !0;
  const a = o.filter((i) => typeof i == "function");
  if (a.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let l = 0; l <= c; l++) {
      if (a.some((u) => u(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function Zy(e, t) {
  const { disabled: n, excludeDisabled: o, selected: r, required: s, onSelect: a } = e, [i, c] = kr(r, a ? r : void 0), l = a ? r : i;
  return {
    selected: l,
    select: (f, h, g) => {
      const { min: p, max: b } = e, v = f ? Gy(f, l, p, b, s, t) : void 0;
      return o && n && v?.from && v.to && Xy({ from: v.from, to: v.to }, n, t) && (v.from = f, v.to = void 0), a || c(v), a?.(v, f, h, g), v;
    },
    isSelected: (f) => l && mt(l, f, !1, t)
  };
}
function Qy(e, t) {
  const { selected: n, required: o, onSelect: r } = e, [s, a] = kr(n, r ? n : void 0), i = r ? n : s, { isSameDay: c } = t;
  return {
    selected: i,
    select: (d, f, h) => {
      let g = d;
      return !o && i && i && c(d, i) && (g = void 0), r || a(g), r?.(g, d, f, h), g;
    },
    isSelected: (d) => i ? c(i, d) : !1
  };
}
function Jy(e, t) {
  const n = Qy(e, t), o = Ky(e, t), r = Zy(e, t);
  switch (e.mode) {
    case "single":
      return n;
    case "multiple":
      return o;
    case "range":
      return r;
    default:
      return;
  }
}
function ek(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ae(t.today, t.timeZone)), t.month && (t.month = new Ae(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ae(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ae(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ae(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ae(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((oe) => new Ae(oe, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ae(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ae(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: o, labels: r, dateLib: s, locale: a, classNames: i } = zt(() => {
    const oe = { ...pi, ...t.locale };
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
      components: ry(t.components),
      formatters: hy(t.formatters),
      labels: { ...Ay, ...t.labels },
      locale: oe,
      classNames: { ...bi(), ...t.classNames }
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
  ]), { captionLayout: c, mode: l, navLayout: u, numberOfMonths: d = 1, onDayBlur: f, onDayClick: h, onDayFocus: g, onDayKeyDown: p, onDayMouseEnter: b, onDayMouseLeave: v, onNextClick: N, onPrevClick: y, showWeekNumber: E, styles: k } = t, { formatCaption: w, formatDay: S, formatMonthDropdown: x, formatWeekNumber: C, formatWeekNumberHeader: M, formatWeekdayName: D, formatYearDropdown: P } = o, R = Uy(t, s), { days: L, months: $, navStart: O, navEnd: K, previousMonth: I, nextMonth: A, goToMonth: _ } = R, U = ny(L, t, O, K, s), { isSelected: V, select: G, selected: Q } = Jy(t, s) ?? {}, { blur: B, focused: W, isFocusTarget: z, moveFocus: Z, setFocused: le } = Vy(t, R, U, V ?? (() => !1), s), { labelDayButton: ue, labelGridcell: ve, labelGrid: Ee, labelMonthDropdown: He, labelNav: yt, labelPrevious: Mn, labelNext: Dn, labelWeekday: ro, labelWeekNumber: so, labelWeekNumberHeader: io, labelYearDropdown: ao } = r, co = zt(() => by(s, t.ISOWeek), [s, t.ISOWeek]), Rt = l !== void 0 || h !== void 0, Kt = H(() => {
    I && (_(I), y?.(I));
  }, [I, _, y]), Gt = H(() => {
    A && (_(A), N?.(A));
  }, [_, A, N]), lo = H((oe, fe) => (ne) => {
    ne.preventDefault(), ne.stopPropagation(), le(oe), G?.(oe.date, fe, ne), h?.(oe.date, fe, ne);
  }, [G, h, le]), uo = H((oe, fe) => (ne) => {
    le(oe), g?.(oe.date, fe, ne);
  }, [g, le]), wr = H((oe, fe) => (ne) => {
    B(), f?.(oe.date, fe, ne);
  }, [B, f]), Cr = H((oe, fe) => (ne) => {
    const me = {
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
    if (me[ne.key]) {
      ne.preventDefault(), ne.stopPropagation();
      const [Te, de] = me[ne.key];
      Z(Te, de);
    }
    p?.(oe.date, fe, ne);
  }, [Z, p, t.dir]), Er = H((oe, fe) => (ne) => {
    b?.(oe.date, fe, ne);
  }, [b]), Tr = H((oe, fe) => (ne) => {
    v?.(oe.date, fe, ne);
  }, [v]), Sr = H((oe) => (fe) => {
    const ne = Number(fe.target.value), me = s.setMonth(s.startOfMonth(oe), ne);
    _(me);
  }, [s, _]), mo = H((oe) => (fe) => {
    const ne = Number(fe.target.value), me = s.setYear(s.startOfMonth(oe), ne);
    _(me);
  }, [s, _]), { className: Mr, style: Dr } = zt(() => ({
    className: [i[te.Root], t.className].filter(Boolean).join(" "),
    style: { ...k?.[te.Root], ...t.style }
  }), [i, t.className, t.style, k]), An = sy(t), fo = j(null);
  Ly(fo, !!t.animate, {
    classNames: i,
    months: $,
    focused: W,
    dateLib: s
  });
  const kt = {
    dayPickerProps: t,
    selected: Q,
    select: G,
    isSelected: V,
    months: $,
    nextMonth: A,
    previousMonth: I,
    goToMonth: _,
    getModifiers: U,
    components: n,
    classNames: i,
    styles: k,
    labels: r,
    formatters: o
  };
  return X.createElement(
    Mu.Provider,
    { value: kt },
    X.createElement(
      n.Root,
      { rootRef: t.animate ? fo : void 0, className: Mr, style: Dr, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...An },
      X.createElement(
        n.Months,
        { className: i[te.Months], style: k?.[te.Months] },
        !t.hideNavigation && !u && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[te.Nav], style: k?.[te.Nav], "aria-label": yt(), onPreviousClick: Kt, onNextClick: Gt, previousMonth: I, nextMonth: A }),
        $.map((oe, fe) => X.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[te.Month],
            style: k?.[te.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: fe,
            displayIndex: fe,
            calendarMonth: oe
          },
          u === "around" && !t.hideNavigation && fe === 0 && X.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[te.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": Mn(I), onClick: Kt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: I ? void 0 : !0, className: i[te.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          X.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[te.MonthCaption], style: k?.[te.MonthCaption], calendarMonth: oe, displayIndex: fe }, c?.startsWith("dropdown") ? X.createElement(
            n.DropdownNav,
            { className: i[te.Dropdowns], style: k?.[te.Dropdowns] },
            (() => {
              const ne = c === "dropdown" || c === "dropdown-months" ? X.createElement(n.MonthsDropdown, { key: "month", className: i[te.MonthsDropdown], "aria-label": He(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Sr(oe.date), options: py(oe.date, O, K, o, s), style: k?.[te.Dropdown], value: s.getMonth(oe.date) }) : X.createElement("span", { key: "month" }, x(oe.date, s)), me = c === "dropdown" || c === "dropdown-years" ? X.createElement(n.YearsDropdown, { key: "year", className: i[te.YearsDropdown], "aria-label": ao(s.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: mo(oe.date), options: vy(O, K, o, s, !!t.reverseYears), style: k?.[te.Dropdown], value: s.getYear(oe.date) }) : X.createElement("span", { key: "year" }, P(oe.date, s));
              return s.getMonthYearOrder() === "year-first" ? [me, ne] : [ne, me];
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
            } }, w(oe.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            X.createElement(n.CaptionLabel, { className: i[te.CaptionLabel], role: "status", "aria-live": "polite" }, w(oe.date, s.options, s))
          )),
          u === "around" && !t.hideNavigation && fe === d - 1 && X.createElement(
            n.NextMonthButton,
            { type: "button", className: i[te.NextMonthButton], tabIndex: A ? void 0 : -1, "aria-disabled": A ? void 0 : !0, "aria-label": Dn(A), onClick: Gt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: A ? void 0 : !0, className: i[te.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          fe === d - 1 && u === "after" && !t.hideNavigation && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[te.Nav], style: k?.[te.Nav], "aria-label": yt(), onPreviousClick: Kt, onNextClick: Gt, previousMonth: I, nextMonth: A }),
          X.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": Ee(oe.date, s.options, s) || void 0, className: i[te.MonthGrid], style: k?.[te.MonthGrid] },
            !t.hideWeekdays && X.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[te.Weekdays], style: k?.[te.Weekdays] },
              E && X.createElement(n.WeekNumberHeader, { "aria-label": io(s.options), className: i[te.WeekNumberHeader], style: k?.[te.WeekNumberHeader], scope: "col" }, M()),
              co.map((ne) => X.createElement(n.Weekday, { "aria-label": ro(ne, s.options, s), className: i[te.Weekday], key: String(ne), style: k?.[te.Weekday], scope: "col" }, D(ne, s.options, s)))
            ),
            X.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[te.Weeks], style: k?.[te.Weeks] }, oe.weeks.map((ne) => X.createElement(
              n.Week,
              { className: i[te.Week], key: ne.weekNumber, style: k?.[te.Week], week: ne },
              E && // biome-ignore lint/a11y/useSemanticElements: react component
              X.createElement(n.WeekNumber, { week: ne, style: k?.[te.WeekNumber], "aria-label": so(ne.weekNumber, {
                locale: a
              }), className: i[te.WeekNumber], scope: "row", role: "rowheader" }, C(ne.weekNumber, s)),
              ne.days.map((me) => {
                const { date: Te } = me, de = U(me);
                if (de[ge.focused] = !de.hidden && !!W?.isEqualTo(me), de[Ke.selected] = V?.(Te) || de.selected, gi(Q)) {
                  const { from: xt, to: at } = Q;
                  de[Ke.range_start] = !!(xt && at && s.isSameDay(Te, xt)), de[Ke.range_end] = !!(xt && at && s.isSameDay(Te, at)), de[Ke.range_middle] = mt(Q, Te, !0, s);
                }
                const ho = gy(de, k, t.modifiersStyles), Pn = oy(de, i, t.modifiersClassNames), qt = !Rt && !de.hidden ? ve(Te, de, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  X.createElement(n.Day, { key: `${s.format(Te, "yyyy-MM-dd")}_${s.format(me.displayMonth, "yyyy-MM")}`, day: me, modifiers: de, className: Pn.join(" "), style: ho, role: "gridcell", "aria-selected": de.selected || void 0, "aria-label": qt, "data-day": s.format(Te, "yyyy-MM-dd"), "data-month": me.outside ? s.format(Te, "yyyy-MM") : void 0, "data-selected": de.selected || void 0, "data-disabled": de.disabled || void 0, "data-hidden": de.hidden || void 0, "data-outside": me.outside || void 0, "data-focused": de.focused || void 0, "data-today": de.today || void 0 }, !de.hidden && Rt ? X.createElement(n.DayButton, { className: i[te.DayButton], style: k?.[te.DayButton], type: "button", day: me, modifiers: de, disabled: de.disabled || void 0, tabIndex: z(me) ? 0 : -1, "aria-label": ue(Te, de, s.options, s), onClick: lo(me, de), onBlur: wr(me, de), onFocus: uo(me, de), onKeyDown: Cr(me, de), onMouseEnter: Er(me, de), onMouseLeave: Tr(me, de) }, S(Te, s.options, s)) : !de.hidden && S(me.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      X.createElement(n.Footer, { className: i[te.Footer], style: k?.[te.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function tk({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: o = "label",
  buttonVariant: r = "ghost",
  formatters: s,
  components: a,
  ...i
}) {
  const c = bi();
  return /* @__PURE__ */ m(
    ek,
    {
      showOutsideDays: n,
      className: re(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        e
      ),
      captionLayout: o,
      formatters: {
        formatMonthDropdown: (l) => l.toLocaleString("default", { month: "short" }),
        ...s
      },
      classNames: {
        root: re("w-fit", c.root),
        months: re(
          "flex gap-4 flex-col md:flex-row relative",
          c.months
        ),
        month: re("flex flex-col w-full gap-4", c.month),
        nav: re(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          c.nav
        ),
        button_previous: re(
          gs({ variant: r }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_previous
        ),
        button_next: re(
          gs({ variant: r }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_next
        ),
        month_caption: re(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          c.month_caption
        ),
        dropdowns: re(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          c.dropdowns
        ),
        dropdown_root: re(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          c.dropdown_root
        ),
        dropdown: re(
          "absolute bg-popover inset-0 opacity-0",
          c.dropdown
        ),
        caption_label: re(
          "select-none font-medium",
          o === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: re("flex", c.weekdays),
        weekday: re(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          c.weekday
        ),
        week: re("flex w-full mt-2", c.week),
        week_number_header: re(
          "select-none w-(--cell-size)",
          c.week_number_header
        ),
        week_number: re(
          "text-[0.8rem] select-none text-muted-foreground",
          c.week_number
        ),
        day: re(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          c.day
        ),
        range_start: re(
          "rounded-l-md bg-accent",
          c.range_start
        ),
        range_middle: re("rounded-none", c.range_middle),
        range_end: re("rounded-r-md bg-accent", c.range_end),
        today: re(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          c.today
        ),
        outside: re(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: re(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: re("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: l, rootRef: u, ...d }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: u,
            className: re(l),
            ...d
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/ui/calendar.tsx",
            lineNumber: 128,
            columnNumber: 13
          },
          this
        ),
        Chevron: ({ className: l, orientation: u, ...d }) => u === "left" ? /* @__PURE__ */ m(Kd, { className: re("size-4", l), ...d }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/ui/calendar.tsx",
          lineNumber: 139,
          columnNumber: 15
        }, this) : u === "right" ? /* @__PURE__ */ m(
          Gd,
          {
            className: re("size-4", l),
            ...d
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/ui/calendar.tsx",
            lineNumber: 145,
            columnNumber: 15
          },
          this
        ) : /* @__PURE__ */ m(qd, { className: re("size-4", l), ...d }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/ui/calendar.tsx",
          lineNumber: 153,
          columnNumber: 13
        }, this),
        DayButton: nk,
        WeekNumber: ({ children: l, ...u }) => /* @__PURE__ */ m("td", { ...u, children: /* @__PURE__ */ m("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: l }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/ui/calendar.tsx",
          lineNumber: 160,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/ui/calendar.tsx",
          lineNumber: 159,
          columnNumber: 13
        }, this),
        ...a
      },
      ...i
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/ui/calendar.tsx",
      lineNumber: 27,
      columnNumber: 5
    },
    this
  );
}
function nk({
  className: e,
  day: t,
  modifiers: n,
  ...o
}) {
  const r = bi(), s = T.useRef(null);
  return T.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ m(
    Mt,
    {
      ref: s,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: re(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        r.day,
        e
      ),
      ...o
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/ui/calendar.tsx",
      lineNumber: 187,
      columnNumber: 5
    },
    this
  );
}
let un = null;
const Bu = /* @__PURE__ */ new Map(), ok = /* @__PURE__ */ new Map();
function Yo() {
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
function rk(e) {
  return un?.pillDate === e;
}
function sk({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: o,
  onClose: r
}) {
  const s = j(null), a = xr(e);
  q(() => {
    const N = (y) => {
      y.key === "Escape" && (y.stopPropagation(), y.preventDefault(), r());
    };
    return document.addEventListener("keydown", N, !0), () => document.removeEventListener("keydown", N, !0);
  }, [r]), q(() => {
    const N = (E) => {
      s.current && !s.current.contains(E.target) && (E.target.closest(".date-pill") || r());
    }, y = setTimeout(() => {
      document.addEventListener("mousedown", N, !0);
    }, 50);
    return () => {
      clearTimeout(y), document.removeEventListener("mousedown", N, !0);
    };
  }, [r]);
  const i = H((N) => {
    N && o(mn(N)), r();
  }, [o, r]), c = H((N) => {
    const y = /* @__PURE__ */ new Date();
    y.setDate(y.getDate() + N), o(mn(y)), r();
  }, [o, r]), l = H(() => {
    const y = (/* @__PURE__ */ new Date()).getDay(), E = y === 0 ? 1 : 8 - y, k = /* @__PURE__ */ new Date();
    k.setDate(k.getDate() + E), o(mn(k)), r();
  }, [o, r]), u = /* @__PURE__ */ new Date(), d = u.toDateString(), f = new Date(u);
  f.setDate(f.getDate() + 1);
  const h = f.toDateString(), g = u.getDay(), p = g === 0 ? 1 : 8 - g, b = new Date(u);
  b.setDate(b.getDate() + p);
  const v = b.toDateString();
  return /* @__PURE__ */ m(
    "div",
    {
      ref: s,
      className: re("date-picker-portal", t === "dark" ? "dark" : ""),
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
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 180,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ m("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ m("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ m(
            tk,
            {
              mode: "single",
              selected: a,
              onSelect: i
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
              lineNumber: 197,
              columnNumber: 13
            },
            this
          ) }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 196,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("div", { className: "border-t border-border" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 203,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ m(
              Mt,
              {
                variant: "outline",
                size: "sm",
                className: re(
                  "rounded-full text-xs",
                  a.toDateString() === d && "ring-2 ring-primary"
                ),
                onClick: () => c(0),
                children: "Today"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 205,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ m(
              Mt,
              {
                variant: "outline",
                size: "sm",
                className: re(
                  "rounded-full text-xs",
                  a.toDateString() === h && "ring-2 ring-primary"
                ),
                onClick: () => c(1),
                children: "Tomorrow"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 216,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ m(
              Mt,
              {
                variant: "outline",
                size: "sm",
                className: re(
                  "rounded-full text-xs",
                  a.toDateString() === v && "ring-2 ring-primary"
                ),
                onClick: l,
                children: "Next Monday"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 227,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 204,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 195,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 194,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
      lineNumber: 163,
      columnNumber: 5
    },
    this
  );
}
function ik(e, t, n) {
  if (rk(t)) {
    Yo();
    return;
  }
  Yo();
  const o = e.getBoundingClientRect(), r = window.innerWidth, s = window.innerHeight, a = 320, i = 420, c = 10, l = 16, u = s - o.bottom - c - l, d = o.top - c - l, f = u >= i ? "below" : d >= i ? "above" : u >= d ? "below" : "above";
  let h;
  f === "below" ? h = o.bottom + c : h = o.top - i - c;
  const g = o.left + o.width / 2;
  let p = g - a / 2;
  p + a > r - l && (p = r - a - l), p < l && (p = l);
  const b = document.createElement("div");
  b.setAttribute("data-date-picker-standalone", t), b.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(b), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((k) => {
    b.addEventListener(k, (w) => {
      w.stopPropagation();
    }, !1);
  });
  const N = Vm(b);
  un = { container: b, root: N, pillDate: t };
  const y = () => {
    Yo();
  }, E = (k) => {
    const w = Bu.get(t);
    w && w(k);
  };
  N.render(
    /* @__PURE__ */ m(
      sk,
      {
        currentDate: t,
        theme: n,
        position: { top: h, left: p, direction: f, pillCenter: g },
        onSelectDate: E,
        onClose: y
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
        lineNumber: 327,
        columnNumber: 5
      },
      this
    )
  );
}
function ak({ node: e, updateAttributes: t, selected: n }) {
  const o = j(null), r = e.attrs.date || dn(), s = Hu(r), a = vi(r), i = H(() => {
    if (!o.current) return "";
    const c = o.current.closest(".markdown-editor-container");
    if (c) {
      const u = c.getAttribute("data-theme");
      if (u) return u;
    }
    return o.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return q(() => (Bu.set(r, (c) => {
    t({ date: c });
  }), ok.set(r, i), () => {
  }), [r, t, i]), q(() => {
    const c = o.current;
    if (!c) return;
    const l = (u) => {
      u.preventDefault(), u.stopPropagation();
      const d = c.getAttribute("data-date") || dn(), f = i();
      ik(c, d, f);
    };
    return c.addEventListener("click", l), () => c.removeEventListener("click", l);
  }, [i]), q(() => {
    const c = o.current?.closest(".ProseMirror") || document, l = () => {
      un && Yo();
    };
    return c.addEventListener("scroll", l, { passive: !0 }), () => {
      c.removeEventListener("scroll", l);
    };
  }, []), /* @__PURE__ */ m(hn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: o,
      className: `date-pill ${a} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": r,
      children: [
        /* @__PURE__ */ m(lc, { size: 14, className: "date-icon" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 410,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("span", { className: "date-text", children: s }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 411,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
      lineNumber: 403,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/DatePillComponent.tsx",
    lineNumber: 402,
    columnNumber: 5
  }, this);
}
function xr(e) {
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
function Hn(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function mn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Hu(e) {
  const t = xr(e), n = /* @__PURE__ */ new Date(), o = new Date(n.getFullYear(), n.getMonth(), n.getDate()), r = new Date(o);
  r.setDate(r.getDate() + 1);
  const s = new Date(o);
  s.setDate(s.getDate() - 1);
  const a = o.getDay(), i = a === 0 ? 1 : 8 - a, c = new Date(o);
  if (c.setDate(c.getDate() + i), t.getTime() === o.getTime()) return "Today";
  if (t.getTime() === r.getTime()) return "Tomorrow";
  if (t.getTime() === s.getTime()) return "Yesterday";
  if (t.getTime() === c.getTime()) return "Next Monday";
  const l = { month: "short", day: "numeric" };
  return t.getFullYear() !== o.getFullYear() && (l.year = "numeric"), t.toLocaleDateString("en-US", l);
}
function ck(e) {
  return xr(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function Wt(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return dn();
  if (n === "tomorrow") return Hn(1);
  if (n === "yesterday") return Hn(-1);
  if (n === "next monday") {
    const i = (/* @__PURE__ */ new Date()).getDay(), c = i === 0 ? 1 : 8 - i;
    return Hn(c);
  }
  const o = t.match(/^([A-Za-z]+)\s+(\d{1,2})(?:,?\s*(\d{4}))?$/);
  if (o) {
    const i = {
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
    }[o[1].toLowerCase()];
    if (i !== void 0) {
      const c = parseInt(o[2], 10), l = o[3] ? parseInt(o[3], 10) : (/* @__PURE__ */ new Date()).getFullYear(), u = new Date(l, i, c);
      return mn(u);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const a = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return mn(a);
  }
  return null;
}
function vi(e) {
  const t = xr(e), n = /* @__PURE__ */ new Date(), o = new Date(n.getFullYear(), n.getMonth(), n.getDate()), r = new Date(o);
  return r.setDate(r.getDate() + 7), t.getTime() === o.getTime() ? "date-today" : t < o ? "date-overdue" : t <= r ? "date-upcoming" : "";
}
const lk = new Re("datePillPaste"), uk = ar.create({
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
    const n = e.attrs.date, o = Hu(n), r = vi(n);
    return [
      "span",
      kn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${r}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, o]
    ];
  },
  addNodeView() {
    return or(ak, {
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
        d().deleteRange(u).insertDatePill(Hn(1)).run();
      }
    }), n = new Oe({
      find: /@yesterday\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(Hn(-1)).run();
      }
    }), o = new Oe({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), r = new Oe({
      find: /@([A-Za-z]{3})\s?(\d{1,2})\s$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const g = {
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
        if (g !== void 0) {
          const p = (/* @__PURE__ */ new Date()).getFullYear(), b = new Date(p, g, parseInt(f[2], 10));
          d().deleteRange(u).insertDatePill(mn(b)).run();
        }
      }
    }), s = new Oe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = Wt(f[1]);
        h && d().deleteRange(u).insertDatePill(h).run();
      }
    }), a = new Oe({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = Wt(f[1]);
        h && d().deleteRange(u).insertDatePill(h).run();
      }
    }), i = new Oe({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), c = new Oe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = Wt(f[1]);
        h && d().deleteRange(u).insertDatePill(h).run();
      }
    }), l = new Oe({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = Wt(f[1]);
        h && d().deleteRange(u).insertDatePill(h).run();
      }
    });
    return [
      e,
      t,
      n,
      o,
      r,
      s,
      a,
      i,
      c,
      l
    ];
  },
  addProseMirrorPlugins() {
    const e = this.type;
    return [
      new Ie({
        key: lk,
        props: {
          handlePaste(t, n) {
            const o = n.clipboardData;
            if (!o) return !1;
            const r = o.getData("text/plain"), s = o.getData("text/html");
            if (s && s.includes('data-type="date-pill"')) return !1;
            const a = /@([^@\n]+)@/g;
            let i = !1, c;
            const l = new RegExp(a.source, a.flags);
            for (; (c = l.exec(r)) !== null; )
              if (Wt(c[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, h = [];
            let g = 0;
            const p = new RegExp(a.source, a.flags);
            let b;
            for (; (b = p.exec(r)) !== null; ) {
              const E = b[1], k = Wt(E);
              if (k) {
                const w = r.slice(g, b.index);
                w && h.push(f.text(w)), h.push(e.create({ date: k })), g = b.index + b[0].length;
              }
            }
            const v = r.slice(g);
            if (v && h.push(f.text(v)), h.length === 0) return !1;
            const N = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, h)
            ), { $from: y } = u.selection;
            if (y.parent.type.name === "paragraph") {
              const E = d;
              let k = u.selection.from;
              for (const w of h)
                E.insert(k, w), k += w.nodeSize;
              E.delete(u.selection.from, u.selection.to), t.dispatch(E);
            } else
              d.replaceSelectionWith(N), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), Ve = /* @__PURE__ */ new Map();
function dk({ node: e, selected: t, editor: n, getPos: o, deleteNode: r }) {
  const s = j(null), a = j(null), i = e.attrs.tag || "", c = j(!1), [l, u] = Y(() => Ve.has(i)), [d, f] = Y(() => Ve.get(i)?.value ?? i);
  q(() => {
    l || f(i);
  }, [i, l]), q(() => {
    if (l) {
      const N = Ve.get(i);
      Ve.set(i, {
        value: d,
        focusedAt: N?.focusedAt ?? Date.now()
      });
    }
  }, [l, d, i]);
  const h = H((N) => {
    if (c.current) return;
    c.current = !0;
    const y = N.trim().replace(/^#/, ""), E = Fn(y);
    if (Ve.delete(i), E && Ve.delete(E), !E || !rn(E))
      r();
    else if (E !== i) {
      const k = o();
      if (typeof k == "number" && n) {
        const { tr: w } = n.state, S = e.nodeSize;
        w.delete(k, k + S), w.insert(k, n.schema.nodes.tagPill.create({ tag: E })), n.view.dispatch(w);
      }
    } else
      Ve.delete(i);
    u(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [i, n, o, r, e.nodeSize]), g = H(() => {
    n && !n.isEditable || (Ve.set(i, { value: i, focusedAt: Date.now() }), f(i), u(!0), c.current = !1);
  }, [n, i]);
  q(() => {
    const N = s.current;
    if (!N || l) return;
    const y = (k) => {
      k.preventDefault(), k.stopPropagation(), g();
    }, E = (k) => {
      k.preventDefault(), k.stopPropagation();
    };
    return N.addEventListener("dblclick", y), N.addEventListener("click", E), () => {
      N.removeEventListener("dblclick", y), N.removeEventListener("click", E);
    };
  }, [l, n, o, g]), q(() => {
    if (l) {
      const N = requestAnimationFrame(() => {
        if (a.current) {
          a.current.focus(), a.current.select();
          const y = Ve.get(i);
          y && (y.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(N);
    }
  }, [l, i]);
  const p = H((N) => {
    N.key === "Enter" ? (N.preventDefault(), h(d)) : N.key === "Escape" && (N.preventDefault(), Ve.delete(i), u(!1), c.current = !0, n?.commands.focus());
  }, [h, d, i, n]), b = H(() => {
    const y = Ve.get(i)?.focusedAt ?? 0;
    Date.now() - y > 300 && h(d);
  }, [h, d, i]), v = H((N) => {
    f(N.target.value);
  }, []);
  return l ? /* @__PURE__ */ m(hn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": i,
      children: [
        /* @__PURE__ */ m(Fi, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TagPillComponent.tsx",
          lineNumber: 177,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(
          "input",
          {
            ref: a,
            type: "text",
            className: "tag-pill-input",
            value: d,
            onChange: v,
            onKeyDown: p,
            onBlur: b,
            spellCheck: !1,
            autoComplete: "off"
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TagPillComponent.tsx",
            lineNumber: 178,
            columnNumber: 11
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TagPillComponent.tsx",
      lineNumber: 171,
      columnNumber: 9
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TagPillComponent.tsx",
    lineNumber: 170,
    columnNumber: 7
  }, this) : /* @__PURE__ */ m(hn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": i,
      children: [
        /* @__PURE__ */ m(Fi, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TagPillComponent.tsx",
          lineNumber: 203,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("span", { className: "tag-text", children: i }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TagPillComponent.tsx",
          lineNumber: 204,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TagPillComponent.tsx",
      lineNumber: 196,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TagPillComponent.tsx",
    lineNumber: 195,
    columnNumber: 5
  }, this);
}
function rn(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function Fn(e) {
  return e.toLowerCase().trim();
}
const mk = new Re("tagPillPaste"), fk = ar.create({
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
      kn(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return or(dk, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = Fn(e);
        return rn(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return this.options.enableAutoDetect ? [new Oe({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: o }) => {
        const r = Fn(o[1]);
        if (rn(r)) {
          const a = o[0].startsWith(" ") ? 1 : 0, i = t.from + a;
          n().deleteRange({ from: i, to: t.to }).insertTagPill(r).run();
        }
      }
    })] : [];
  },
  addProseMirrorPlugins() {
    if (!this.options.enableAutoDetect) return [];
    const e = this.type;
    return [
      new Ie({
        key: mk,
        props: {
          handlePaste(t, n) {
            const o = n.clipboardData;
            if (!o) return !1;
            const r = o.getData("text/plain"), s = o.getData("text/html");
            if (s && s.includes('data-type="tag-pill"')) return !1;
            const a = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let i = !1, c;
            const l = new RegExp(a.source, a.flags);
            for (; (c = l.exec(r)) !== null; )
              if (rn(c[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, h = [];
            let g = 0;
            const p = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let b;
            for (; (b = p.exec(r)) !== null; ) {
              const y = Fn(b[1]);
              if (rn(y)) {
                const E = b[0], k = E.startsWith(" ") || E.startsWith(`
`) ? 1 : 0, w = r.slice(g, b.index + k);
                w && h.push(f.text(w)), h.push(e.create({ tag: y })), g = b.index + E.length;
              }
            }
            const v = r.slice(g);
            if (v && h.push(f.text(v)), h.length === 0) return !1;
            const { $from: N } = u.selection;
            if (N.parent.type.name === "paragraph") {
              const y = d;
              let E = u.selection.from;
              for (const k of h)
                y.insert(E, k), E += k.nodeSize;
              y.delete(u.selection.from, u.selection.to), t.dispatch(y);
            } else {
              const y = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, h)
              );
              d.replaceSelectionWith(y), t.dispatch(d);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), hk = /\[\[([^\[\]]+)\]\]$/, pk = pc.create({
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
      kn(
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
        find: hk,
        handler: ({ state: e, range: t, match: n, chain: o }) => {
          try {
            const r = n[1];
            if (!r) return;
            const s = t.from, a = t.to;
            o().deleteRange({ from: s, to: a }).insertContentAt(s, {
              type: "text",
              text: r,
              marks: [{ type: "wikiLink", attrs: { pageName: r } }]
            }).run();
          } catch (r) {
            console.warn("WikiLinkSafe: Error in input rule", r);
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
      const o = n.target;
      if (o.hasAttribute("data-wiki-link")) {
        const r = o.getAttribute("data-page-name");
        r && (n.preventDefault(), e(r));
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
}, gk = ["info", "note", "prompt", "resources", "todo", "summary"];
function bk(e) {
  return e.length < 3 ? !1 : !!(dt.header.test(e) || dt.bold.test(e) || dt.list.test(e) || dt.taskList.test(e) || dt.codeBlock.test(e) || dt.callout.test(e) || dt.highlight.test(e) || dt.link.test(e) || dt.table.test(e));
}
function vk(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", o = "left", r = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? r = t[1] : ["left", "center", "right"].includes(t[1]) && (o = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (o = t[1]), /^\d+$/.test(t[2]) && (r = t[2])), { alt: n, align: o, width: r };
}
function Nk(e, t) {
  const { alt: n, align: o, width: r } = vk(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[o] || "margin-right: auto;", a = r ? ` width="${r}" style="width: ${r}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${o}"${a} /></figure>`;
}
function Jo(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function _a(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${Jo(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, o = e.split(n).filter((s) => s.trim()), r = [];
  for (const s of o) {
    const a = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    a ? r.push(Nk(a[1], a[2])) : r.push(`<p>${Jo(s.trim())}</p>`);
  }
  return r.join("");
}
function Fu(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, o = Math.floor(n / 2), r = e.trimStart(), s = r.match(/^[-*+]\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: o, text: s[2].trim(), checked: s[1] === "x" };
  const a = r.match(/^[-*+]\s+(.+)$/);
  if (a)
    return { type: "ul", depth: o, text: a[1].trim() };
  const i = r.match(/^\d+\.\s+(.+)$/);
  return i ? { type: "ol", depth: o, text: i[1].trim() } : null;
}
function zu(e) {
  if (e.length === 0) return "";
  const t = (r, s) => {
    let a = "", i = r;
    const c = e[i]?.type || "ul", l = c === "task", u = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, d = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (a += u; i < e.length && e[i].depth >= s; ) {
      const f = e[i];
      if (f.depth === s) {
        if (l ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${Jo(f.text)}</p>` : a += `<li><p>${Jo(f.text)}</p>`, i + 1 < e.length && e[i + 1].depth > s) {
          const h = t(i + 1, e[i + 1].depth);
          a += h.html, i = h.nextIdx;
        } else
          i++;
        a += "</li>";
      } else
        i++;
    }
    return a += d, { html: a, nextIdx: i };
  }, n = Math.min(...e.map((r) => r.depth));
  return t(0, n).html;
}
function $a(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:[-*+] |\d+\. )/i.test(e);
  if (!t && !n)
    return _a(e);
  const o = e.split(/<br\s*\/?>/i).filter((i) => i.trim()), r = [];
  let s = [];
  const a = () => {
    s.length !== 0 && (r.push(zu(s)), s = []);
  };
  for (const i of o) {
    const c = Fu(i);
    if (c) {
      if (s.length > 0) {
        const l = s[0].type;
        c.depth === 0 && c.type !== l && a();
      }
      s.push(c);
    } else
      a(), r.push(_a(i.trim()));
  }
  return a(), r.join("");
}
function yk(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const o = t[0].split("|").map((i) => i.trim()).filter((i) => i.length > 0);
  if (o.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let a = "<table><thead><tr>";
  for (const i of o)
    a += "<th>" + $a(i) + "</th>";
  a += "</tr></thead><tbody>";
  for (const i of s) {
    if (!i.trim()) continue;
    const c = i.split("|"), l = [];
    for (let u = 0; u < c.length; u++) {
      const d = c[u].trim();
      u === 0 && d === "" && i.trim().startsWith("|") || u === c.length - 1 && d === "" && i.trim().endsWith("|") || l.push(d);
    }
    if (l.length !== 0) {
      a += "<tr>";
      for (let u = 0; u < o.length; u++) {
        const d = l[u] || "";
        a += "<td>" + $a(d) + "</td>";
      }
      a += "</tr>";
    }
  }
  return a += "</tbody></table>", a;
}
function kk(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, o = [];
  t = t.replace(n, (d) => {
    const f = d.split(`
`);
    if (f.length >= 2) {
      const h = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(h) && h.includes("-")) {
        const g = yk(d);
        if (g) {
          const p = `MANUSTABLEPLACEHOLDER${o.length}END`;
          return o.push(g), p;
        }
      }
    }
    return d;
  });
  const r = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (d, f, h) => {
    const g = f.replace("ad-", "");
    let p = h.trim();
    p = p.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), p = p.replace(/__([^_]+)__/g, "<strong>$1</strong>"), p = p.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), p = p.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), p = p.replace(/`([^`]+)`/g, "<code>$1</code>"), p.startsWith("<") || (p = `<p>${p}</p>`);
    const b = `MANUSCODEPLACEHOLDER${r.length}END`;
    return r.push(`<div data-callout="" data-type="${g}" class="callout callout-${g}">${p}</div>`), b;
  }), gk.forEach((d) => {
    const f = new RegExp(`\`\`\`${d}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(f, (h, g) => {
      let p = g.trim();
      p = p.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), p = p.replace(/__([^_]+)__/g, "<strong>$1</strong>"), p = p.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), p = p.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), p = p.replace(/`([^`]+)`/g, "<code>$1</code>"), p.startsWith("<") || (p = `<p>${p}</p>`);
      const b = `MANUSCODEPLACEHOLDER${r.length}END`;
      return r.push(`<div data-callout="" data-type="${d}" class="callout callout-${d}">${p}</div>`), b;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (d, f, h) => {
    const g = f || "plaintext", p = h.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), b = `MANUSCODEPLACEHOLDER${r.length}END`;
    return r.push(`<pre><code class="language-${g}">${p}</code></pre>`), b;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  const s = t.split(`
`), a = [];
  let i = [];
  const c = () => {
    i.length !== 0 && (a.push(zu(i)), i = []);
  };
  for (const d of s) {
    const f = Fu(d);
    if (f) {
      if (i.length > 0) {
        const g = i[0].type, p = Math.min(...i.map((b) => b.depth));
        f.depth === p && f.type !== g && c();
      }
      i.push(f);
      continue;
    }
    c();
    let h = d;
    h = h.replace(/^(#{1,6})\s+(.+)$/, (g, p, b) => {
      const v = p.length;
      return `<h${v}>${b}</h${v}>`;
    }), h = h.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), h = h.replace(/^[-*_]{3,}$/, "<hr>"), a.push(h);
  }
  c(), t = a.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (d, f, h) => {
    const g = f.split("|").map((y) => y.trim());
    let p = "", b = "left", v = null;
    g.length === 1 ? p = g[0] : g.length === 2 ? (p = g[0], /^\d+$/.test(g[1]) ? v = g[1] : ["left", "center", "right"].includes(g[1]) ? b = g[1] : p = f) : g.length === 3 ? (p = g[0], ["left", "center", "right"].includes(g[1]) && (b = g[1]), /^\d+$/.test(g[2]) && (v = g[2])) : p = f;
    const N = v ? ` width="${v}" style="width: ${v}px"` : "";
    return `<img src="${h.trim()}" alt="${p}" data-align="${b}"${N}>`;
  }), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t = t.split(`
`).map((d) => {
    const f = d.trim();
    return f ? /^<[a-z]/.test(f) || /^<\//.test(f) || f.startsWith("MANUSTABLEPLACEHOLDER") || f.startsWith("MANUSCODEPLACEHOLDER") ? d : `<p>${f}</p>` : "";
  }).join(`
`), t = t.replace(/<p>\s*<\/p>/g, "");
  for (let d = 0; d < o.length; d++)
    t = t.replace(`MANUSTABLEPLACEHOLDER${d}END`, o[d]);
  for (let d = 0; d < r.length; d++)
    t = t.replace(`MANUSCODEPLACEHOLDER${d}END`, r[d]);
  return t;
}
const xk = Qe.create({
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
      new Ie({
        key: new Re("markdownPaste"),
        props: {
          handlePaste(t, n, o) {
            const r = n.clipboardData;
            if (!r) return !1;
            const s = r.getData("text/html");
            if (s && s.trim())
              return !1;
            const a = r.getData("text/plain");
            if (!a || !bk(a))
              return !1;
            n.preventDefault();
            const i = kk(a);
            return e.commands.insertContent(i, {
              parseOptions: {
                preserveWhitespace: !1
              }
            }), !0;
          }
        }
      })
    ];
  }
}), Wa = new Re("collapsibleHeading");
function wk(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function er(e, t) {
  const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  return e.descendants((r, s) => {
    if (r.type.name === "heading" && t.includes(r.attrs.level)) {
      const a = r.attrs.level, i = r.textContent.slice(0, 50), c = `h${a}-${i}`, l = o.get(c) ?? 0;
      o.set(c, l + 1), n.set(s, wk(a, i, l));
    }
  }), n;
}
let fn = null;
function ts(e, t, n) {
  const o = [], r = er(e, n.levels), s = [];
  e.descendants((l, u) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const d = r.get(u) ?? "";
      s.push({
        pos: u,
        level: l.attrs.level,
        id: d,
        isCollapsed: t.collapsedHeadings.has(d),
        nodeSize: l.nodeSize
      });
    }
  });
  const a = [];
  for (let l = 0; l < s.length; l++) {
    const u = s[l];
    if (u.isCollapsed) {
      const d = u.pos + u.nodeSize;
      let f = e.content.size;
      for (let h = l + 1; h < s.length; h++)
        if (s[h].level <= u.level) {
          f = s[h].pos;
          break;
        }
      d < f && a.push({ start: d, end: f });
    }
  }
  const i = [];
  for (const l of a)
    if (i.length === 0)
      i.push(l);
    else {
      const u = i[i.length - 1];
      l.start <= u.end ? u.end = Math.max(u.end, l.end) : i.push(l);
    }
  function c(l) {
    for (const u of i)
      if (l >= u.start && l < u.end) return !0;
    return !1;
  }
  return e.descendants((l, u) => {
    if (l.type.name === "heading" && n.levels.includes(l.attrs.level)) {
      const d = r.get(u) ?? "", f = t.collapsedHeadings.has(d), h = c(u);
      o.push(
        qe.node(u, u + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${f ? "is-collapsed" : "is-expanded"}${h ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": d,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const g = qe.widget(u + l.nodeSize - 1, () => {
        const p = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${d}"]`);
        if (p) {
          p.classList.contains("collapsed") !== f && (p.classList.remove("collapsed", "expanded"), p.classList.add(f ? "collapsed" : "expanded"), p.title = f ? "Click to expand" : "Click to collapse");
          const y = p.parentElement;
          if (y) return y;
        }
        const b = document.createElement("span");
        b.className = "collapsible-heading-chevron-wrapper", b.setAttribute("contenteditable", "false");
        const v = document.createElement("button");
        return v.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, v.setAttribute("data-heading-id", d), v.setAttribute("data-heading-level", String(l.attrs.level)), v.setAttribute("contenteditable", "false"), v.setAttribute("tabindex", "-1"), v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', v.title = f ? "Click to expand" : "Click to collapse", v.addEventListener("click", (N) => {
          N.preventDefault(), N.stopPropagation();
          const y = v.classList.contains("collapsed");
          v.classList.remove("collapsed", "expanded"), v.classList.add(y ? "expanded" : "collapsed"), v.title = y ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(d) ? t.collapsedHeadings.delete(d) : t.collapsedHeadings.add(d), fn && fn.dispatch(fn.state.tr.setMeta("collapsibleHeading", { toggled: d }));
        }), b.appendChild(v), b;
      }, { side: 1, key: `chevron-${d}` });
      o.push(g);
    } else l.isBlock && c(u) && o.push(
      qe.node(u, u + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Ue.create(e, o);
}
function Ck(e, t, n, o) {
  if (n.collapsedHeadings.size === 0) return;
  const r = er(t, o), s = new Set(r.values()), a = [];
  n.collapsedHeadings.forEach((i) => {
    s.has(i) || a.push(i);
  });
  for (const i of a)
    n.collapsedHeadings.delete(i);
}
const Ek = Qe.create({
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
        const o = this.storage, r = n.doc.nodeAt(e);
        if (!r || r.type.name !== "heading")
          return !1;
        const a = er(n.doc, this.options.levels).get(e);
        return a ? (o.collapsedHeadings.has(a) ? o.collapsedHeadings.delete(a) : o.collapsedHeadings.add(a), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: a })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return er(t.doc, this.options.levels).forEach((r) => {
          n.collapsedHeadings.add(r);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ie({
        key: Wa,
        view(n) {
          return fn = n, {
            update(o) {
              fn = o;
            },
            destroy() {
              fn = null;
            }
          };
        },
        state: {
          init(n, o) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: ts(o.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, o, r, s) {
            const a = n.getMeta("collapsibleHeading");
            return a || n.docChanged ? (n.docChanged && !a && Ck(r.doc, s.doc, e, t.levels), {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: ts(s.doc, e, t),
              docVersion: o.docVersion + 1
            }) : {
              ...o,
              decorations: o.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const o = Wa.getState(n);
            return o?.decorations ? o.decorations : ts(n.doc, e, t);
          }
        }
      })
    ];
  }
}), Tk = /\[([^\]]+)\]\(([^)]+)\)$/, Sk = /^(https?:\/\/|www\.)[^\s]+$/i, Mk = Qe.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Oe({
        find: Tk,
        handler: ({ state: e, range: t, match: n, chain: o }) => {
          const r = n[1];
          let s = n[2];
          s && !s.startsWith("http://") && !s.startsWith("https://") && (s.startsWith("www."), s = "https://" + s), o().deleteRange(t).insertContent({
            type: "text",
            text: r,
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
      new Ie({
        key: new Re("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const o = n.clipboardData;
            if (!o) return !1;
            const r = o.getData("text/plain");
            if (!r) return !1;
            const s = r.trim();
            if (!Sk.test(s)) return !1;
            const { state: a } = t, { selection: i } = a, { from: c, to: l, empty: u } = i;
            let d = s;
            if (!d.startsWith("http://") && !d.startsWith("https://") && (d.startsWith("www."), d = "https://" + d), !u && a.doc.textBetween(c, l))
              return e.chain().focus().extendMarkRange("link").setLink({ href: d }).run(), !0;
            const f = a.schema.marks.link.create({ href: d }), h = a.tr;
            return h.insertText(d, c, l), h.addMark(c, c + d.length, f), t.dispatch(h), !0;
          }
        }
      })
    ];
  }
}), Dk = ["info", "note", "prompt", "resources", "todo"], Ak = Qe.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Ie({
        key: new Re("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: o } = t, { selection: r, doc: s } = o, { $from: a } = r, i = a.start();
            a.end();
            const c = s.textBetween(i, a.pos, ""), l = c.trim();
            for (const u of Dk)
              if (l === `\`\`\`${u}`) {
                n.preventDefault();
                const d = o.tr, f = i + c.indexOf("```");
                d.delete(f, a.pos);
                const h = e.schema.nodes.callout, g = e.schema.nodes.paragraph;
                if (h && g) {
                  const p = g.create(), b = h.create({ type: u }, Km.from(p));
                  d.insert(f, b);
                  const v = d.doc.resolve(f + 2);
                  d.setSelection(Ge.near(v)), t.dispatch(d);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), Oo = new Re("searchHighlight"), Pk = Qe.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: o }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, o && o(n.setMeta(Oo, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Oo, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ie({
        key: Oo,
        state: {
          init() {
            return Ue.empty;
          },
          apply(t, n, o, r) {
            const { searchTerm: s, caseSensitive: a, useRegex: i, currentMatchIndex: c } = e, l = t.getMeta(Oo), u = t.docChanged;
            if (!s)
              return Ue.empty;
            if (!u && !l)
              return n.map(t.mapping, r.doc);
            const d = [];
            let f = 0;
            try {
              let h;
              if (i)
                h = new RegExp(s, a ? "g" : "gi");
              else {
                const g = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                h = new RegExp(g, a ? "g" : "gi");
              }
              r.doc.descendants((g, p) => {
                if (g.isText && g.text) {
                  let b;
                  for (; (b = h.exec(g.text)) !== null; ) {
                    const v = p + b.index, N = p + b.index + b[0].length, y = f === c;
                    d.push(
                      qe.inline(v, N, {
                        class: y ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return Ue.empty;
            }
            return Ue.create(r.doc, d);
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
}), Ik = new Re("tabIndent");
function Rk(e) {
  const { $from: t } = e.selection;
  for (let n = t.depth; n >= 0; n--) {
    const o = t.node(n);
    if (o.type.name === "taskItem")
      return "taskItem";
    if (o.type.name === "listItem")
      return "listItem";
  }
  return null;
}
const Lk = Qe.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Ie({
        key: Ik,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: o } = e, r = Rk(n);
            if (!r)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[r];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!Ui(s)(n, o)) {
                const c = r === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
                l && Ui(l)(n, o);
              }
            } else if (!Yi(s)(n, o)) {
              const c = r === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
              l && Yi(l)(n, o);
            }
            return !0;
          }
        }
      })
    ];
  }
}), Ok = new Re("expandSelection");
function ns(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const _k = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), Uu = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), $k = "tableRow", Wk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function Bk(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--)
    if (o.node(r).isTextblock) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function Hk(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--) {
    const s = o.node(r);
    if (Wk.has(s.type.name)) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function Fk(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--)
    if (o.node(r).type.name === $k) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function zk(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--) {
    const s = o.node(r);
    if (Uu.has(s.type.name)) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function Uk(e, t, n) {
  const o = e.resolve(t);
  let r = -1;
  for (let i = o.depth; i >= 1; i--) {
    const c = o.node(i);
    _k.has(c.type.name) && (r = i);
  }
  if (r === -1) return null;
  const s = o.start(r), a = o.end(r);
  return s < t || a > n ? { from: s, to: a } : null;
}
function Yk(e) {
  const t = [];
  if (e.forEach((o, r) => {
    o.type.name === "heading" && t.push({ level: o.attrs.level, from: r });
  }), t.length === 0) return [];
  const n = [];
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
    let s = e.content.size;
    for (let a = o + 1; a < t.length; a++)
      if (t[a].level <= r.level) {
        s = t[a].from;
        break;
      }
    n.push({
      level: r.level,
      from: r.from,
      to: s
    });
  }
  return n;
}
function jk(e, t, n) {
  const o = e.filter((r) => r.from <= t && r.to >= n);
  return o.sort((r, s) => r.to - r.from - (s.to - s.from)), o;
}
function Vk(e, t) {
  const n = e.resolve(t);
  for (let o = n.depth; o >= 1; o--)
    if (n.node(o).type.name === "table") return !0;
  return !1;
}
function Kk(e, t, n) {
  let o = !1;
  return e.nodesBetween(t, n, (r) => Uu.has(r.type.name) ? (o = !0, !1) : !0), o;
}
function Gk(e, t, n) {
  const o = [];
  let r = t, s = n;
  const a = (c) => c && (c.from < r || c.to > s) ? (o.push(c), r = c.from, s = c.to, !0) : !1;
  a(Bk(e, r, s)), Vk(e, t) && (a(Hk(e, r, s)), a(Fk(e, r, s))), a(Uk(e, r, s)), a(zk(e, r, s));
  const i = Yk(e);
  if (i.length > 0) {
    const c = jk(i, r, s);
    for (const l of c)
      Kk(e, l.from, l.to) ? l.from === 0 && l.to === e.content.size ? a({ from: 0, to: e.content.size, useSelectAll: !0 }) : a({ from: l.from, to: l.to, useSelectAll: !0 }) : a({ from: l.from, to: l.to });
  }
  return (r > 0 || s < e.content.size) && o.push({ from: 0, to: e.content.size, useSelectAll: !0 }), o;
}
const qk = Qe.create({
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
        const t = this.storage, { doc: n, selection: o } = e.state, { from: r, to: s } = o;
        if (t.expansionDepth > 0 && r === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), o instanceof km || r === 0 && s === n.content.size)
          return !0;
        const i = Gk(n, r, s);
        let c = null;
        for (const l of i)
          if (l.from < r || l.to > s) {
            c = l;
            break;
          }
        if (c) {
          if (t.isExpanding = !0, c.from === 0 && c.to === n.content.size)
            e.commands.selectAll(), t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size;
          else if (c.useSelectAll)
            try {
              const l = n.resolve(c.from), u = n.resolve(c.to), d = e.state.tr, f = Ge.between(l, u);
              e.view.dispatch(d.setSelection(f).scrollIntoView());
              const h = e.state.selection;
              t.lastExpandedFrom = h.from, t.lastExpandedTo = h.to;
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
      new Ie({
        key: Ok,
        props: {
          handleClick() {
            return ns(e), !1;
          },
          handleTextInput() {
            return ns(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && ns(e), !1;
          }
        }
      })
    ];
  }
}), Xk = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Zk(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, o = parseInt(t.slice(2, 4), 16) / 255, r = parseInt(t.slice(4, 6), 16) / 255, s = (i) => i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(o) + 0.0722 * s(r) > 0.4;
}
const Qk = new Re("hexColorDecoration");
function Yu(e, t, n) {
  const o = [];
  return e.nodesBetween(t, n, (r, s) => {
    if (!r.isText) return;
    const a = r.text || "";
    let i;
    const c = new RegExp(Xk.source, "g");
    for (; (i = c.exec(a)) !== null; ) {
      const l = s + i.index, u = l + i[0].length;
      if (u >= t && l <= n) {
        const d = i[0], f = Zk(d);
        o.push(
          qe.inline(l, u, {
            class: "hex-color-swatch",
            style: `background-color: ${d}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), o;
}
function Jk(e) {
  const t = Yu(e, 0, e.content.size);
  return Ue.create(e, t);
}
const ex = pc.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Ie({
        key: Qk,
        state: {
          init(e, { doc: t }) {
            return Jk(t);
          },
          apply(e, t) {
            if (!e.docChanged)
              return t;
            let n = t.map(e.mapping, e.doc);
            const o = [];
            if (e.mapping.maps.forEach((s, a) => {
              s.forEach((i, c, l, u) => {
                const d = Math.max(0, l - 10), f = Math.min(e.doc.content.size, u + 10);
                o.push({ from: d, to: f });
              });
            }), o.length === 0)
              return n;
            o.sort((s, a) => s.from - a.from);
            const r = [o[0]];
            for (let s = 1; s < o.length; s++) {
              const a = r[r.length - 1];
              o[s].from <= a.to ? a.to = Math.max(a.to, o[s].to) : r.push(o[s]);
            }
            for (const s of r) {
              n = n.remove(
                n.find(s.from, s.to)
              );
              const a = Yu(e.doc, s.from, s.to);
              a.length > 0 && (n = n.add(e.doc, a));
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
}), Se = new Re("selectAllOccurrences");
function Ba(e, t, n, o, r) {
  const s = [];
  if (!t) return s;
  let a;
  try {
    if (o)
      a = new RegExp(t, n ? "g" : "gi");
    else {
      let i = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      r && (i = `\\b${i}\\b`), a = new RegExp(i, n ? "g" : "gi");
    }
  } catch {
    return s;
  }
  return e.descendants((i, c) => {
    if (i.isText && i.text) {
      let l;
      for (; (l = a.exec(i.text)) !== null; )
        s.push({
          from: c + l.index,
          to: c + l.index + l[0].length,
          text: l[0]
        });
    }
    return !0;
  }), s;
}
function Tt(e, t) {
  const n = Se.getState(e.state);
  if (!n) return [];
  const o = [];
  return n.find().forEach((r) => {
    if (r.from === r.to) return;
    const s = e.state.doc.textBetween(r.from, r.to, "");
    o.push({ from: r.from, to: r.to, text: s });
  }), o;
}
function tx(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function we(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const nx = Qe.create({
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
      selectAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: o }) => {
        const {
          searchTerm: r,
          caseSensitive: s = !1,
          useRegex: a = !1,
          wholeWord: i = !1
        } = e;
        if (!r) return !1;
        const c = Ba(t.state.doc, r, s, a, i);
        return c.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = c, this.storage.searchTerm = r, this.storage.caseSensitive = s, this.storage.useRegex = a, this.storage.wholeWord = i, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = r.length, this.storage.allMatches = c, this.storage.nextMatchIndex = c.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], o && o(n.setMeta(Se, { activate: !0 })), !0);
      },
      /**
       * Select the next occurrence incrementally (Cmd+D behavior).
       * First call: selects the word under cursor or current selection.
       * Subsequent calls: add the next match to the selection.
       */
      selectNextOccurrence: () => ({ editor: e, tr: t, dispatch: n }) => {
        const o = this.storage;
        if (!o.isActive) {
          const { state: r } = e, { from: s, to: a } = r.selection;
          let i = "";
          if (s !== a)
            i = r.doc.textBetween(s, a, "");
          else {
            const d = r.doc.resolve(s), f = d.parent;
            if (f.isTextblock) {
              const h = f.textContent, g = d.parentOffset;
              let p = g, b = g;
              for (; p > 0 && /\w/.test(h[p - 1]); ) p--;
              for (; b < h.length && /\w/.test(h[b]); ) b++;
              p < b && (i = h.slice(p, b));
            }
          }
          if (!i) return !1;
          const c = Ba(r.doc, i, !1, !1, !1);
          if (c.length === 0) return !1;
          const l = tx(c, s), u = c[l];
          return o.isActive = !0, o.ranges = [u], o.searchTerm = i, o.caseSensitive = !1, o.useRegex = !1, o.wholeWord = !1, o.typedBuffer = "", o.isTypingReplace = !1, o.originalTermLength = i.length, o.allMatches = c, o.nextMatchIndex = (l + 1) % c.length, o.isIncremental = !0, o.undoStack = [], o.redoStack = [], n && n(t.setMeta(Se, { activate: !0 })), setTimeout(() => {
            try {
              const d = e.view.domAtPos(u.from);
              d.node && d.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {
            }
          }, 20), !0;
        }
        if (o.isIncremental && o.allMatches.length > 0) {
          const r = o.nextMatchIndex, s = o.allMatches[r];
          return o.ranges.some(
            (i) => i.from === s.from && i.to === s.to
          ) ? !1 : (o.ranges = [...o.ranges, s], o.nextMatchIndex = (r + 1) % o.allMatches.length, o.ranges.length >= o.allMatches.length && (o.isIncremental = !1), n && n(t.setMeta(Se, { activate: !0 })), setTimeout(() => {
            try {
              const i = e.view.domAtPos(s.from);
              i.node && i.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {
            }
          }, 20), !0);
        }
        return !1;
      },
      /**
       * Deactivate "Select All Occurrences" mode and clear highlights.
       */
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (we(this.storage), t && t(e.setMeta(Se, { deactivate: !0 })), !0),
      /**
       * Apply a mark (bold, italic, etc.) to all selected occurrences in one transaction.
       * All changes are in a single transaction for proper undo/redo.
       */
      toggleMarkOnAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: o }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        const r = t.schema.marks[e];
        if (!r) return !1;
        const { ranges: s } = this.storage, a = s.every((i) => {
          let c = !0;
          return t.state.doc.nodesBetween(i.from, i.to, (l) => {
            l.isText && !r.isInSet(l.marks) && (c = !1);
          }), c;
        });
        if (o) {
          for (const i of s)
            a ? n.removeMark(i.from, i.to, r) : n.addMark(i.from, i.to, r.create());
          o(n);
        }
        return setTimeout(() => {
          try {
            const i = t.view;
            if (i) {
              const c = Tt(i, this.storage);
              this.storage.ranges = c, c.length === 0 && we(this.storage);
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
          const o = [...this.storage.ranges].sort((r, s) => s.from - r.from);
          for (const r of o)
            t.delete(r.from, r.to);
          n(t);
        }
        return we(this.storage), !0;
      },
      /**
       * Replace all selected occurrences with new text in a single transaction.
       */
      replaceAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: o }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        if (o) {
          const r = [...this.storage.ranges].sort((s, a) => a.from - s.from);
          for (const s of r)
            n.replaceWith(s.from, s.to, t.schema.text(e));
          o(n);
        }
        return e ? setTimeout(() => {
          try {
            const r = t.view;
            if (r) {
              const s = Tt(r, this.storage);
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && we(this.storage);
            }
          } catch {
          }
        }, 10) : we(this.storage), !0;
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
      new Ie({
        key: Se,
        state: {
          init() {
            return Ue.empty;
          },
          apply(t, n, o, r) {
            const s = t.getMeta(Se);
            if (s?.deactivate || !e.isActive)
              return Ue.empty;
            if (s?.activate || s?.refresh) {
              const a = [];
              for (const i of e.ranges) {
                a.push(
                  qe.inline(i.from, i.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const c = document.createElement("span");
                c.className = "select-all-multi-cursor", c.setAttribute("aria-hidden", "true"), a.push(
                  qe.widget(i.to, c, {
                    side: 1,
                    key: `cursor-${i.from}-${i.to}`
                  })
                );
              }
              return Ue.create(r.doc, a);
            }
            return t.docChanged ? n.map(t.mapping, r.doc) : n;
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
              (r) => n >= r.from && n <= r.to
            )) {
              we(e);
              const { tr: r } = t.state;
              t.dispatch(r.setMeta(Se, { deactivate: !0 }));
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
              we(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Se, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const r = e.undoStack.pop();
                return e.typedBuffer = r, r === "" && (e.isTypingReplace = !1), Gm(t.state, t.dispatch), setTimeout(() => {
                  const s = Tt(t);
                  e.ranges = s, s.length === 0 && we(e);
                }, 10), !0;
              }
              we(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Se, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const r = e.redoStack.pop();
                return e.typedBuffer = r, e.isTypingReplace = !0, qm(t.state, t.dispatch), setTimeout(() => {
                  const s = Tt(t);
                  e.ranges = s, s.length === 0 && we(e);
                }, 10), !0;
              }
              we(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Se, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const o = Tt(t);
                if (o.length === 0) {
                  we(e);
                  const { tr: i } = t.state;
                  return t.dispatch(i.setMeta(Se, { deactivate: !0 })), !0;
                }
                const r = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...o].sort((i, c) => c.from - i.from), { tr: a } = t.state;
                for (const i of s)
                  a.replaceWith(i.from, i.to, t.state.schema.text(r));
                t.dispatch(a), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const i = Tt(t);
                  e.ranges = i, i.length === 0 && we(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const o = [...e.ranges].sort((a, i) => i.from - a.from), { tr: r } = t.state;
                for (const a of o)
                  r.delete(a.from, a.to);
                t.dispatch(r), we(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Se, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const o = [...e.ranges].sort((a, i) => i.from - a.from), { tr: r } = t.state;
              for (const a of o)
                r.delete(a.from, a.to);
              t.dispatch(r), we(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Se, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              we(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Se, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              we(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Se, { deactivate: !0 })), !1;
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
          handleTextInput(t, n, o, r) {
            if (!e.isActive || !r) return !1;
            const s = Tt(t);
            if (s.length === 0) {
              we(e);
              const { tr: c } = t.state;
              return t.dispatch(c.setMeta(Se, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += r : (e.isTypingReplace = !0, e.typedBuffer = r);
            const a = [...s].sort((c, l) => l.from - c.from), { tr: i } = t.state;
            for (const c of a)
              i.replaceWith(c.from, c.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(i), setTimeout(() => {
              const c = Tt(t);
              e.ranges = c, c.length === 0 && we(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function ox() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function rx(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => {
      typeof o.result == "string" ? t(o.result) : n(new Error("Failed to read file"));
    }, o.onerror = () => n(new Error("Failed to read file")), o.readAsDataURL(e);
  });
}
function sx(e, t) {
  const [n, o] = e.split(","), r = n.match(/:(.*?);/), s = r ? r[1] : "image/jpeg", a = atob(o), i = new Uint8Array(a.length);
  for (let c = 0; c < a.length; c++)
    i[c] = a.charCodeAt(c);
  return new File([i], t, { type: s });
}
function ix(e, t) {
  return t.includes(e.type);
}
function ax(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function cx(e, t, n) {
  return new Promise((o, r) => {
    const s = new window.Image(), a = new FileReader();
    a.onload = (i) => {
      s.src = i.target?.result;
    }, a.onerror = () => r(new Error("Failed to read file")), s.onload = () => {
      let i = s.width, c = s.height;
      if (i > t) {
        const b = t / i;
        i = t, c = Math.round(c * b);
      }
      const l = document.createElement("canvas");
      l.width = i, l.height = c;
      const u = l.getContext("2d");
      if (!u) {
        r(new Error("Failed to get canvas context"));
        return;
      }
      u.imageSmoothingEnabled = !0, u.imageSmoothingQuality = "high", u.drawImage(s, 0, 0, i, c);
      const d = e.type === "image/png" || e.type === "image/gif", f = d ? "image/png" : "image/jpeg", h = d ? void 0 : n, g = l.toDataURL(f, h), p = sx(g, e.name);
      o({ dataUrl: g, file: p, width: i, height: c });
    }, s.onerror = () => r(new Error("Failed to load image")), a.readAsDataURL(e);
  });
}
function lx(e, t, n) {
  e.view.state.doc.descendants((o, r) => {
    if (o.type.name === "resizableImage" && o.attrs.src === t && o.attrs.alt === n) {
      try {
        const { state: s, dispatch: a } = e.view, i = s.tr.delete(r, r + o.nodeSize);
        a(i);
      } catch {
      }
      return !1;
    }
    return !0;
  });
}
async function Ha(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!ix(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const r = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${r}MB`), !1;
  }
  const o = ox();
  try {
    n.onUploadStart?.();
    let r, s, a;
    const i = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && i) {
      const h = await cx(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      r = h.dataUrl, a = h.file, s = Math.min(h.width, 600);
    } else {
      r = await rx(e), a = e;
      const h = await ax(r);
      s = Math.min(h.width, 600);
    }
    const { doc: c } = t.view.state;
    c.content.size === 0 || c.childCount === 1 && c.firstChild?.isTextblock && c.firstChild.content.size === 0 ? t.chain().focus().insertContent({
      type: "resizableImage",
      attrs: {
        src: r,
        alt: e.name,
        width: s
      }
    }).run() : t.chain().focus().setImage({
      src: r,
      alt: e.name,
      width: s
    }).run();
    const { state: u } = t.view, d = u.selection.from - 1, f = u.doc.nodeAt(d);
    if (f && f.type.name === "resizableImage") {
      const h = t.view.nodeDOM(d);
      if (h) {
        const g = h instanceof HTMLElement ? h : h.dom;
        g && g.classList.add("image-uploading");
      }
    }
    try {
      const h = await n.onImageUpload(a, {
        fileName: e.name,
        mimeType: a.type,
        fileSize: a.size,
        uploadId: o
      });
      let g = !1;
      return t.view.state.doc.descendants((p, b) => {
        if (g) return !1;
        if (p.type.name === "resizableImage" && p.attrs.src === r && p.attrs.alt === e.name) {
          try {
            const { state: v, dispatch: N } = t.view, y = v.doc.nodeAt(b);
            if (y) {
              const E = v.tr.setNodeMarkup(b, void 0, {
                ...y.attrs,
                src: h
              });
              N(E);
            }
          } catch (v) {
            console.warn("Failed to replace placeholder with uploaded reference:", v);
          }
          return g = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((p, b) => {
        if (p.type.name === "resizableImage" && p.attrs.src === h) {
          const v = t.view.nodeDOM(b);
          if (v) {
            const N = v instanceof HTMLElement ? v : v.dom;
            N && N.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (h) {
      return console.warn("Image upload failed, removing placeholder:", h), lx(t, r, e.name), n.onUploadError?.(`Upload failed: ${h instanceof Error ? h.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (r) {
    return n.onUploadError?.(`Failed to process image: ${r instanceof Error ? r.message : "Unknown error"}`), !1;
  }
}
function Fa(e) {
  const t = [];
  if (e.items)
    for (let n = 0; n < e.items.length; n++) {
      const o = e.items[n];
      if (o.kind === "file" && o.type.startsWith("image/")) {
        const r = o.getAsFile();
        r && t.push(r);
      }
    }
  if (t.length === 0 && e.files)
    for (let n = 0; n < e.files.length; n++) {
      const o = e.files[n];
      o.type.startsWith("image/") && t.push(o);
    }
  return t;
}
const ux = Qe.create({
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
      new Ie({
        key: new Re("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, o) {
            const r = o.clipboardData;
            if (!r) return !1;
            const s = Fa(r);
            return s.length === 0 ? !1 : (o.preventDefault(), s.forEach((a) => {
              Ha(a, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, o, r, s) {
            if (s) return !1;
            const a = o.dataTransfer;
            if (!a) return !1;
            const i = Fa(a);
            if (i.length === 0)
              return !1;
            o.preventDefault();
            const c = n.posAtCoords({
              left: o.clientX,
              top: o.clientY
            });
            if (c) {
              const l = n.state.tr.setSelection(
                Ge.near(n.state.doc.resolve(c.pos))
              );
              n.dispatch(l);
            }
            return i.forEach((l) => {
              Ha(l, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function dx({
  placeholder: e,
  isMobile: t,
  maxImageSize: n,
  headingLevels: o,
  collapsibleHeadingLevels: r,
  disabledFeatures: s,
  progressiveSelectAll: a,
  enableCollapsibleHeadings: i,
  enableTagAutoDetect: c,
  enableHexColorHighlight: l,
  isLightweight: u,
  setImageEditState: d,
  callbackRefs: f
}) {
  return zt(() => {
    const h = [
      xm.configure({
        heading: {
          levels: o
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
      Hv,
      Fv,
      Yv,
      wm.configure({
        placeholder: e,
        emptyEditorClass: "is-editor-empty"
      }),
      Cm.configure({
        types: ["heading", "paragraph"]
      }),
      Em.configure({
        multicolor: !0
      }),
      Tm.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      $m,
      Wm,
      Bm,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...u ? [] : [Hm],
      Mk,
      Pk,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...u ? [] : [nx],
      Lk,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      Xm.extend({
        addInputRules() {
          const g = this.type;
          return [
            new Oe({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: p, range: b }) => {
                const { tr: v } = p, N = b.from, y = b.to;
                v.delete(N, y);
                const E = v.doc.resolve(N), k = g.create(), w = E.before(E.depth), S = E.after(E.depth);
                v.replaceWith(w, S, k);
                const x = w + k.nodeSize;
                if (x < v.doc.content.size) {
                  const C = v.doc.resolve(x);
                  C.nodeAfter && C.nodeAfter.isTextblock ? v.setSelection(Ge.create(v.doc, x + 1)) : C.nodeAfter && v.setSelection(Ge.near(v.doc.resolve(x)));
                } else {
                  const M = p.schema.nodes.paragraph.create();
                  v.insert(x, M), v.setSelection(Ge.create(v.doc, x + 1));
                }
                v.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return s.tables || h.push(
      Sm.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Mm,
      Pv,
      Iv,
      ...u ? [] : [Bv]
    ), s.taskLists || h.push(
      zv.configure({
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
    ), !t && !u && h.push(
      Vv.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || h.push(qv), s.callouts || h.push(Zv, Ak), i && !s.collapsibleHeadings && !u && h.push(
      Ek.configure({
        levels: r
      })
    ), s.images || h.push(
      Qv.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (g) => {
          d({
            isOpen: !0,
            src: g.src,
            alt: g.alt,
            pos: g.pos,
            position: { x: g.rect.left + g.rect.width / 2, y: g.rect.bottom }
          });
        },
        resolveImageSrc: f.resolveImageSrc.current ? ((...g) => f.resolveImageSrc.current(...g)) : void 0
      }),
      ux.configure({
        maxFileSize: n,
        onUploadStart: f.onImageUploadStart.current ? ((...g) => f.onImageUploadStart.current(...g)) : void 0,
        onUploadComplete: f.onImageUploadComplete.current ? ((...g) => f.onImageUploadComplete.current(...g)) : void 0,
        onUploadError: f.onImageUploadError.current ? ((...g) => f.onImageUploadError.current(...g)) : void 0,
        onImageUpload: f.onImageUpload.current ? ((g, p) => f.onImageUpload.current(g, p)) : void 0
      })
    ), s.datePills || h.push(
      uk.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), s.tagPills || h.push(
      fk.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: c
      })
    ), s.wikiLinks || h.push(
      pk.configure({
        onWikiLinkClick: (g) => {
          console.log("WikiLink clicked:", g), f.onWikiLinkClick.current?.(g);
        },
        validateLink: (g) => f.validateWikiLink.current ? f.validateWikiLink.current(g) : !0
      })
    ), a && h.push(qk), l && !u && h.push(ex), s.markdownPaste || h.push(
      xk.configure({
        enableMarkdownPaste: !0
      })
    ), h;
  }, [e, t, n, o, r, s, a, i, c, l, u]);
}
let ht = null, tr = null;
async function ju() {
  if (ht) return ht;
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
      const u = l, d = u.getAttribute("src") || "", h = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = u.getAttribute("width"), p = g ? parseInt(g, 10) : null, b = u.getAttribute("data-align") || "left", v = [h], N = b !== "left", y = p && p > 0;
      return (N || y) && v.push(N ? b : "left"), y && v.push(String(p)), `![${v.join(" | ")}](${d})`;
    }
  }), n.addRule("imageResizer", {
    filter: (c) => c.nodeName === "FIGURE" && c.classList.contains("image-resizer"),
    replacement: (c, l) => {
      const u = l.querySelector("img");
      if (!u) return c;
      const d = u.getAttribute("src") || "", h = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = u.getAttribute("width"), p = g ? parseInt(g, 10) : null, b = u.getAttribute("data-align") || "left", v = [h], N = b !== "left", y = p && p > 0;
      (N || y) && v.push(N ? b : "left"), y && v.push(String(p));
      const E = `![${v.join(" | ")}](${d})`, k = l.parentNode;
      return k && k.nodeName === "LI" ? `
` + E + `
` : `

` + E + `

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
  function o(c) {
    const l = c.getAttribute("src") || "", d = (c.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = c.getAttribute("width"), h = f ? parseInt(f, 10) : null, g = c.getAttribute("data-align") || "left", p = [d], b = g !== "left", v = h && h > 0;
    return (b || v) && p.push(b ? g : "left"), v && p.push(String(h)), `![${p.join(" \\| ")}](${l})`;
  }
  function r(c) {
    if (c.nodeType === Node.TEXT_NODE)
      return (c.textContent || "").replace(/\|/g, "\\|");
    if (c.nodeType === Node.ELEMENT_NODE) {
      const l = c;
      if (l.nodeName === "IMG") return o(l);
      if (l.nodeName === "BR") return "";
      let u = "";
      for (const d of Array.from(l.childNodes))
        u += r(d);
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
        l += r(d);
      } else
        l += r(u);
    return l.trim();
  }
  function a(c, l, u = 0) {
    const d = "  ".repeat(u), f = c.nodeName, h = Array.from(c.childNodes).filter(
      (p) => p.nodeType === Node.ELEMENT_NODE && p.nodeName === "LI"
    ), g = f === "OL" ? parseInt(c.getAttribute("start") || "1", 10) : 1;
    h.forEach((p, b) => {
      const v = p.getAttribute("data-type") === "taskItem", N = p.getAttribute("data-checked") === "true", y = s(p);
      v ? l.push(`${d}- [${N ? "x" : " "}] ${y}`) : f === "OL" ? l.push(`${d}${g + b}. ${y}`) : l.push(`${d}- ${y}`);
      const E = Array.from(p.childNodes).filter(
        (k) => k.nodeType === Node.ELEMENT_NODE && (k.nodeName === "UL" || k.nodeName === "OL")
      );
      for (const k of E)
        a(k, l, u + 1);
    });
  }
  function i(c) {
    const l = [];
    for (const u of Array.from(c.childNodes)) {
      if (u.nodeType !== Node.ELEMENT_NODE) {
        const g = (u.textContent || "").trim();
        g && l.push(g.replace(/\|/g, "\\|"));
        continue;
      }
      const d = u, f = d.nodeName;
      if (f === "UL" || f === "OL") {
        a(d, l, 0);
        continue;
      }
      if (f === "FIGURE") {
        const g = d.querySelector("img");
        g && l.push(o(g));
        continue;
      }
      if (f === "IMG") {
        l.push(o(d));
        continue;
      }
      const h = r(d).trim();
      h && l.push(h);
    }
    return l.join(" <br> ") || "";
  }
  return n.addRule("table", {
    filter: "table",
    replacement: function(c, l) {
      const u = l, d = Array.from(u.querySelectorAll("tr"));
      if (d.length === 0) return "";
      const f = [];
      let h = !1;
      d.forEach((p, b) => {
        const v = Array.from(p.querySelectorAll("th, td")), N = v.map((y) => i(y));
        if (b > 0 && v.length > 0 && v[0].nodeName === "TH" && (h = !0), f.push("| " + N.join(" | ") + " |"), b === 0) {
          const y = v.map(() => "---").join(" | ");
          f.push("| " + y + " |");
        }
      });
      const g = h ? `
<!-- header-column -->` : "";
      return `

` + f.join(`
`) + g + `

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
      return u ? `@${ck(u)}@` : c;
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
  }), ht = n, n;
}
function mx() {
  !tr && !ht && (tr = ju().then((e) => (ht = e, e)));
}
function fx() {
  return mx(), {
    turndown(e) {
      return ht ? ht.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return ht !== null;
    },
    async ready() {
      ht || (tr ? await tr : await ju());
    }
  };
}
function hx() {
  const e = j(null);
  return e.current || (e.current = fx()), e.current;
}
const px = 2e3;
function gx(e) {
  const {
    extensions: t,
    content: n,
    editable: o,
    autofocus: r,
    spellCheck: s,
    initialMode: a,
    performanceMode: i,
    lightweightThreshold: c,
    onChange: l,
    onHTMLChange: u,
    onMarkdownChange: d,
    onReady: f,
    onDestroy: h,
    onFocus: g,
    onBlur: p,
    onSelectionChange: b,
    onLinkClick: v,
    editorModeRef: N,
    rawMarkdownRef: y,
    setRawMarkdown: E,
    setIsLightweight: k,
    lightweightCheckCounterRef: w,
    isLightweightRef: S
  } = e, x = n && n.length > px, C = j(x ? n : null), M = x ? "" : n, D = j(null), P = j(l), R = j(u), L = j(d), $ = j(null);
  P.current = l, R.current = u, L.current = d;
  const O = Td({
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
      h?.();
    },
    extensions: t,
    content: M,
    editable: o,
    autofocus: r,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: s ? "true" : "false"
      },
      handleClick: (A, _, U) => {
        if (v) {
          const G = U.target.closest("a");
          if (G) {
            const Q = G.getAttribute("href");
            if (Q && v(Q, U) === !1)
              return U.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: A }) => {
      if (i === "auto" && (w.current++, w.current >= 50)) {
        w.current = 0;
        const U = A.state.doc.content.childCount > c;
        U !== S.current && k(U);
      }
      D.current && clearTimeout(D.current), D.current = setTimeout(() => {
        if (A.isDestroyed) return;
        const _ = A.getHTML();
        (P.current || R.current) && (P.current?.(_), R.current?.(_));
      }, 150);
    },
    onFocus: () => {
      g?.();
    },
    onBlur: () => {
      if (D.current && (clearTimeout(D.current), D.current = null, O && !O.isDestroyed)) {
        const A = O.getHTML();
        if ((P.current || R.current) && (P.current?.(A), R.current?.(A)), N.current === "wysiwyg" && $.current) {
          const _ = $.current.turndown(A);
          y.current = _, L.current?.(_);
        }
      }
      p?.();
    },
    onSelectionUpdate: ({ editor: A }) => {
      if (b) {
        const { from: _, to: U, empty: V } = A.state.selection;
        b({ from: _, to: U, empty: V });
      }
    }
  });
  q(() => {
    if (!C.current || !O || O.isDestroyed) return;
    const A = C.current;
    C.current = null;
    const _ = requestAnimationFrame(() => {
      const U = setTimeout(() => {
        O.isDestroyed || O.commands.setContent(A);
      }, 0);
      O.__deferredTimerId = U;
    });
    return () => {
      cancelAnimationFrame(_);
      const U = O.__deferredTimerId;
      U && clearTimeout(U);
    };
  }, [O]), q(() => () => {
    if (D.current && (clearTimeout(D.current), D.current = null, O && !O.isDestroyed)) {
      const A = O.getHTML();
      if ((P.current || R.current) && (P.current?.(A), R.current?.(A)), N.current === "wysiwyg" && $.current) {
        const _ = $.current.turndown(A);
        y.current = _, L.current?.(_);
      }
    }
  }, []);
  const K = hx();
  $.current = K;
  const I = j(!1);
  return q(() => {
    if (!I.current && a === "markdown" && O && !O.isDestroyed && K) {
      const A = O.getHTML(), _ = K.turndown(A);
      E(_), y.current = _, I.current = !0;
    }
  }, [O, K, a]), { editor: O, turndownService: K };
}
function bx(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), o = n.body.firstElementChild;
  if (!o) return e;
  const r = (a) => {
    Array.from(a.querySelectorAll("ul")).forEach(r);
    const c = Array.from(a.children).filter((f) => f.tagName === "LI");
    let l = !1, u = !1;
    const d = (f) => {
      const h = f.querySelector(':scope > input[type="checkbox"]');
      if (h) return h;
      const g = f.querySelector(":scope > p");
      if (g) {
        const p = g.querySelector(':scope > input[type="checkbox"]');
        if (p) return p;
      }
      return null;
    };
    c.forEach((f) => {
      d(f) ? l = !0 : u = !0;
    }), l && (c.forEach((f) => {
      const h = d(f);
      if (h) {
        const g = h.hasAttribute("checked");
        f.setAttribute("data-type", "taskItem"), f.setAttribute("data-checked", String(g));
        const p = h.parentElement, b = p && p.tagName === "P" && p.parentElement === f;
        h.remove(), b && p.firstChild && p.firstChild.nodeType === Node.TEXT_NODE && (p.firstChild.textContent = (p.firstChild.textContent || "").replace(/^\s+/, ""));
        const v = Array.from(f.childNodes), N = [], y = [];
        v.forEach((k) => {
          if (k.nodeType === Node.ELEMENT_NODE) {
            const w = k;
            if (w.tagName === "UL" || w.tagName === "OL" || w.tagName === "P")
              y.push(k);
            else if (w.tagName === "IMG" || w.tagName === "FIGURE")
              if (w.tagName === "IMG") {
                const S = n.createElement("figure");
                S.className = "image-resizer";
                const x = w.getAttribute("data-align") || "left", C = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[x] || "margin-right: auto;";
                S.style.cssText = C, S.appendChild(w.cloneNode(!0)), y.push(S);
              } else
                y.push(k);
            else
              N.push(k);
          } else
            N.push(k);
        });
        const E = y.filter((k) => {
          if (k.nodeType === Node.ELEMENT_NODE) {
            const w = k;
            if (w.tagName === "P" && !w.textContent?.trim() && !w.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", N.length > 0) {
          const k = n.createElement("p");
          N.forEach((w) => k.appendChild(w)), k.firstChild && k.firstChild.nodeType === Node.TEXT_NODE && (k.firstChild.textContent = (k.firstChild.textContent || "").replace(/^\s+/, "")), (k.textContent?.trim() || k.querySelector("img, figure, code, br")) && f.appendChild(k);
        }
        E.forEach((k) => f.appendChild(k));
      }
    }), l && !u && a.setAttribute("data-type", "taskList"));
  };
  return Array.from(o.querySelectorAll(":scope > ul")).forEach(r), o.innerHTML;
}
function vx(e) {
  const t = e.split(`
`), n = [], o = (i) => {
    const c = i.trimStart();
    return /^[-*+]\s+\[[ xX]\]\s/.test(c) ? "task" : /^[-*+]\s+/.test(c) ? "bullet" : /^\d+\.\s+/.test(c) ? "ordered" : null;
  }, r = (i) => /^\s{2,}\S/.test(i), s = (i) => i.trim() === "" || i.trim() === "​";
  let a = !1;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (/^```/.test(c.trim())) {
      a = !a, n.push(c);
      continue;
    }
    if (a) {
      n.push(c);
      continue;
    }
    if (n.push(c), o(c) !== null || r(c)) {
      let l = i + 1;
      for (; l < t.length && r(t[l]); )
        l++;
      let u = 0;
      const d = l;
      for (; l < t.length && s(t[l]); )
        u++, l++;
      if (u > 0 && l < t.length) {
        const f = o(c), h = o(t[l]);
        if (f !== null && h !== null) {
          for (let g = d; g < l; g++)
            n.push(t[g]);
          n.push("<!-- list-break -->"), i = l - 1;
          continue;
        }
      }
    }
  }
  return n.join(`
`);
}
function Nx(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), o = n.body.firstElementChild;
  if (!o) return e;
  const r = Array.from(o.querySelectorAll("li"));
  for (const s of r) {
    if (s.getAttribute("data-type") === "taskItem" || !s.querySelector(":scope > img, :scope > p > img, :scope > figure")) continue;
    const i = Array.from(s.childNodes), c = [], l = [];
    if (i.forEach((u) => {
      if (u.nodeType === Node.ELEMENT_NODE) {
        const d = u, f = d.tagName;
        if (f === "UL" || f === "OL")
          l.push(u);
        else if (f === "FIGURE")
          l.push(u);
        else if (f === "IMG") {
          const h = n.createElement("figure");
          h.className = "image-resizer";
          const g = d.getAttribute("data-align") || "left", p = {
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          };
          h.style.cssText = p[g] || "margin-right: auto;", h.appendChild(d.cloneNode(!0)), l.push(h);
        } else if (f === "P")
          if (d.querySelectorAll("img").length === 0)
            l.push(u);
          else {
            const g = Array.from(d.childNodes), p = [];
            if (g.forEach((b) => {
              if (b.nodeType === Node.ELEMENT_NODE && b.tagName === "IMG") {
                if (p.length > 0) {
                  const k = n.createElement("p");
                  p.forEach((w) => k.appendChild(w.cloneNode(!0))), k.textContent?.trim() && l.push(k), p.length = 0;
                }
                const v = b, N = n.createElement("figure");
                N.className = "image-resizer";
                const y = v.getAttribute("data-align") || "left", E = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                N.style.cssText = E[y] || "margin-right: auto;", N.appendChild(v.cloneNode(!0)), l.push(N);
              } else
                p.push(b);
            }), p.length > 0) {
              const b = n.createElement("p");
              p.forEach((v) => b.appendChild(v.cloneNode(!0))), b.textContent?.trim() && l.push(b);
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
  return o.innerHTML;
}
function yx(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (o) => o.replace(/<tr>([\s\S]*?)<\/tr>/gi, (r, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function nr(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function kx(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function za(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((o) => o.trim()).map((o) => /^<img\s/i.test(o) ? kx(o) : o.trim() ? `<p>${nr(o.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${nr(e)}</p>`;
}
function xx(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, o = Math.floor(n / 2), r = e.trimStart(), s = r.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: o, text: s[2].trim(), checked: s[1] === "x" };
  const a = r.match(/^-\s+(.+)$/);
  if (a)
    return { type: "ul", depth: o, text: a[1].trim() };
  const i = r.match(/^(\d+)\.\s+(.+)$/);
  return i ? { type: "ol", depth: o, text: i[2].trim(), index: parseInt(i[1], 10) } : null;
}
function wx(e) {
  if (e.length === 0) return "";
  const t = (r, s) => {
    let a = "", i = r;
    const c = e[i]?.type || "ul", l = c === "task", u = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, d = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (a += u; i < e.length && e[i].depth >= s; ) {
      const f = e[i];
      if (f.depth === s) {
        if (l ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${nr(f.text)}</p>` : a += `<li><p>${nr(f.text)}</p>`, i + 1 < e.length && e[i + 1].depth > s) {
          const h = t(i + 1, e[i + 1].depth);
          a += h.html, i = h.nextIdx;
        } else
          i++;
        a += "</li>";
      } else
        i++;
    }
    return a += d, { html: a, nextIdx: i };
  }, n = Math.min(...e.map((r) => r.depth));
  return t(0, n).html;
}
function Cx(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, o, r) => {
      const s = /<img\s/i.test(o), a = /<br\s*\/?>/i.test(o), i = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(o);
      if (!s && !a && !i) return t;
      let c = o.trim();
      c = c.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const l = c.split(/<br\s*\/?>/i).filter((h) => h.trim());
      if (l.length <= 1 && !i)
        return s ? `${n}${za(c)}${r}` : t;
      const u = [];
      let d = [];
      const f = () => {
        d.length !== 0 && (u.push(wx(d)), d = []);
      };
      for (const h of l) {
        const g = xx(h);
        if (g) {
          if (d.length > 0) {
            const p = d[0].type;
            g.depth === 0 && g.type !== p && f();
          }
          d.push(g);
        } else
          f(), u.push(za(h.trim()));
      }
      return f(), `${n}${u.join("")}${r}`;
    }
  );
}
function Ex(e, t, n = {}) {
  const {
    enableTagAutoDetect: o = !1,
    disableTagPills: r = !1,
    isValidTag: s,
    normalizeTag: a,
    parseDateFromMarkdown: i,
    getDateVariant: c
  } = n;
  let l = e;
  l = vx(l);
  const u = ["info", "note", "prompt", "resources", "todo"];
  return u.forEach((f) => {
    const h = new RegExp(`\`\`\`ad-${f}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    l = l.replace(h, (g, p) => {
      const b = t(p.trim());
      return `<div data-callout="" data-type="${f}" class="callout callout-${f}">${b}</div>`;
    });
  }), u.forEach((f) => {
    const h = new RegExp(`\`\`\`${f}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    l = l.replace(h, (g, p) => {
      const b = t(p.trim());
      return `<div data-callout="" data-type="${f}" class="callout callout-${f}">${b}</div>`;
    });
  }), l = l.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (f, h, g) => {
    const p = h.split("|").map((k) => k.trim());
    let b = "", v = "left", N = null;
    p.length === 1 ? b = p[0] : p.length === 2 ? (b = p[0], /^\d+$/.test(p[1]) ? N = p[1] : ["left", "center", "right"].includes(p[1]) ? v = p[1] : b = h) : p.length === 3 ? (b = p[0], ["left", "center", "right"].includes(p[1]) && (v = p[1]), /^\d+$/.test(p[2]) && (N = p[2])) : b = h;
    const y = N ? ` width="${N}" style="width: ${N}px"` : "", E = ` data-align="${v}"`;
    return `<img src="${g.trim()}" alt="${b}"${E}${y} />`;
  }), l = l.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), i && c && (l = l.replace(/@([^@\n]+)@/g, (f, h) => {
    const g = i(h);
    if (g) {
      const p = c(g);
      return `<span data-type="date-pill" data-date="${g}" class="date-pill ${p}"><span class="date-icon">📅</span><span class="date-text">${h.trim()}</span></span>`;
    }
    return f;
  })), o && !r && s && a && (l = l.replace(
    new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"),
    (f, h) => {
      const g = a(h);
      return s(g) ? `<span data-type="tag-pill" data-tag="${g}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${g}</span></span>` : f;
    }
  )), l = l.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((f, h) => h % 2 === 1 ? f : f.replace(/\[\[([^\[\]]+)\]\]/g, (g, p) => `<span data-wiki-link data-page-name="${p.trim()}" class="wiki-link">${p.trim()}</span>`)).join(""), l;
}
function Tx(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = bx(t), t = Nx(t), t = yx(t), t = Cx(t), t;
}
function Sx(e, t, n = {}) {
  const o = Ex(e, t, n), r = t(o);
  return Tx(r);
}
function Mx(e, t, n) {
  q(() => {
    if (!e || e.isDestroyed) return;
    const o = (r) => {
      if (e.isDestroyed) return;
      const s = r.key;
      if (!(!(r.metaKey || r.ctrlKey) && s !== " ")) {
        if ((r.metaKey || r.ctrlKey) && r.key === "k") {
          r.preventDefault(), n.openLinkPopover();
          return;
        }
        if (!t && (r.metaKey || r.ctrlKey) && r.key === "f") {
          r.preventDefault();
          const { state: i } = e, { from: c, to: l } = i.selection;
          if (c !== l) {
            const u = i.doc.textBetween(c, l, " ");
            if (u.trim()) {
              n.openFindReplace(u.trim());
              return;
            }
          }
          n.openFindReplace();
          return;
        }
        if (!t && (r.metaKey || r.ctrlKey) && r.key === "h") {
          r.preventDefault(), n.openFindReplaceWithReplace();
          return;
        }
        if (r.key === " ")
          try {
            const { state: i } = e, { selection: c } = i, { $from: l } = c, u = l.nodeBefore?.textContent || "";
            if (u === "#####") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 5, to: l.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (u === "####") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 4, to: l.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (u === "###") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 3, to: l.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (u === "##") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 2, to: l.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (u === "#") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (u === "-" || u === "*") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(u)) {
              r.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - u.length, to: l.pos }).toggleOrderedList().run();
              return;
            }
            const d = /^(-\s*)?\[([ x])?\]$/.exec(u);
            if (d) {
              r.preventDefault();
              const f = d[2] === "x", h = i.schema.nodes.taskList, g = i.schema.nodes.taskItem;
              if (h && g) {
                const p = i.tr, b = l.pos - u.length, v = l.pos;
                p.delete(b, v);
                const y = p.doc.resolve(b).blockRange();
                if (y) {
                  const E = [
                    { type: h, attrs: {} },
                    { type: g, attrs: { checked: f } }
                  ];
                  p.wrap(y, E), e.view.dispatch(p);
                  return;
                }
              }
              e.chain().focus().deleteRange({ from: l.pos - u.length, to: l.pos }).toggleTaskList().run();
              return;
            }
            if (u === ">") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 1, to: l.pos }).toggleBlockquote().run();
              return;
            }
            if (u === "```") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: l.pos - 3, to: l.pos }).toggleCodeBlock().run();
              return;
            }
            if (u === "---" || u === "***") {
              r.preventDefault(), Uo(e, l.pos - 3, l.pos);
              return;
            }
            if (u === "—-") {
              r.preventDefault(), Uo(e, l.pos - 2, l.pos);
              return;
            }
            if (u === "—") {
              r.preventDefault(), Uo(e, l.pos - 1, l.pos);
              return;
            }
          } catch (i) {
            console.warn("Space shortcut error:", i);
          }
      }
    };
    return document.addEventListener("keydown", o, !0), () => document.removeEventListener("keydown", o, !0);
  }, [e, t, n]);
}
function Dx({
  editorModeRef: e,
  rawMarkdownRef: t,
  editorMode: n,
  handleModeSwitch: o,
  setIsFindReplaceOpen: r,
  setFindReplaceFocusTrigger: s
}) {
  q(() => {
    const a = {
      /**
       * Get the current editor mode
       * @returns {'wysiwyg' | 'markdown'} The current mode
       */
      getMode: () => e.current,
      /**
       * Set the editor mode
       * @param mode {'wysiwyg' | 'markdown'} The mode to switch to
       */
      setMode: (i) => {
        if (i !== "wysiwyg" && i !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        o(i);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const i = e.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return o(i), i;
      },
      /**
       * Switch to visual (WYSIWYG) mode
       */
      switchToVisual: () => {
        o("wysiwyg");
      },
      /**
       * Switch to raw markdown mode
       */
      switchToMarkdown: () => {
        o("markdown");
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
      onModeChange: (i) => {
        const c = (l) => {
          i(l.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", c), () => window.removeEventListener("paragon-editor-mode-change", c);
      }
    };
    return window.__paragonEditorModeAPI = a, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [o]), q(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: n } }));
  }, [n]);
}
function Ax({
  editor: e,
  turndownService: t,
  editorModeRef: n,
  rawMarkdownRef: o,
  setEditorMode: r,
  setRawMarkdown: s,
  onModeChange: a,
  enableTagAutoDetect: i,
  disabledFeatures: c
}) {
  return H(async (u) => {
    if (e) {
      if (u === "markdown" && n.current === "wysiwyg") {
        const d = e.getHTML(), f = t.turndown(d);
        s(f), o.current = f;
      } else if (u === "wysiwyg" && n.current === "markdown") {
        const { marked: d } = await import("./marked.esm-Tjr8Gfse.js"), f = (p) => d.parse(p, { async: !1, breaks: !0 }), h = {
          enableTagAutoDetect: i,
          disableTagPills: !!c.tagPills,
          isValidTag: rn,
          normalizeTag: Fn,
          parseDateFromMarkdown: Wt,
          getDateVariant: vi
        }, g = Sx(o.current, f, h);
        queueMicrotask(() => {
          e.isDestroyed || e.commands.setContent(g);
        });
      }
      r(u), n.current = u, a?.(u);
    }
  }, [e, t, a]);
}
const Px = 200;
function Ix(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: o = !1,
    enabled: r = !0
  } = t, [s, a] = Y({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), i = j(null), c = j(""), l = H((u) => {
    const d = u.trim(), f = d.length > 0 ? d.split(/\s+/).filter((N) => N.length > 0).length : 0, h = d.replace(/\s/g, "").length, g = u.length;
    let p = 0, b = 0;
    o && (p = d.length > 0 ? d.split(/\n\s*\n/).filter((N) => N.trim().length > 0).length : 0, b = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const v = Math.max(1, Math.ceil(f / Px));
    return {
      words: f,
      characters: h,
      charactersWithSpaces: g,
      paragraphs: p,
      sentences: b,
      readingTime: v,
      isCalculating: !1
    };
  }, [o]);
  return q(() => {
    if (!e || !r) return;
    const u = () => {
      i.current && clearTimeout(i.current), a((d) => ({ ...d, isCalculating: !0 })), i.current = setTimeout(() => {
        try {
          const d = e.getText();
          if (d === c.current) {
            a((h) => ({ ...h, isCalculating: !1 }));
            return;
          }
          c.current = d;
          const f = l(d);
          a(f);
        } catch (d) {
          console.warn("useWordCount: Error calculating word count", d), a((f) => ({ ...f, isCalculating: !1 }));
        }
      }, n);
    };
    return u(), e.on("update", u), () => {
      e.off("update", u), i.current && clearTimeout(i.current);
    };
  }, [e, n, r, l]), s;
}
function Rx({ status: e, lastSaved: t, className: n = "" }) {
  const o = (r) => {
    if (!r) return "";
    const a = (/* @__PURE__ */ new Date()).getTime() - r.getTime(), i = Math.floor(a / 1e3), c = Math.floor(i / 60), l = Math.floor(c / 60);
    return i < 10 ? "Just now" : i < 60 ? `${i}s ago` : c < 60 ? `${c}m ago` : l < 24 ? `${l}h ago` : r.toLocaleDateString();
  };
  return /* @__PURE__ */ m(
    "div",
    {
      className: `auto-save-indicator flex items-center gap-1.5 text-xs ${n}`,
      title: t ? `Last saved: ${t.toLocaleString()}` : "Not saved yet",
      children: [
        e === "idle" && t && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(Xd, { className: "w-3.5 h-3.5 text-muted-foreground" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 40,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-muted-foreground", children: [
            "Saved ",
            o(t)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 41,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 39,
          columnNumber: 9
        }, this),
        e === "saving" && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(uc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 47,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-cyan-500", children: "Saving..." }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 48,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 46,
          columnNumber: 9
        }, this),
        e === "saved" && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(yn, { className: "w-3.5 h-3.5 text-emerald-500" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 54,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-emerald-500", children: "Saved" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 55,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this),
        e === "error" && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(Zd, { className: "w-3.5 h-3.5 text-red-500" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 61,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-red-500", children: "Save failed" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 62,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 60,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/AutoSaveIndicator.tsx",
      lineNumber: 34,
      columnNumber: 5
    },
    this
  );
}
function Lx({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ m(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ m("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ m(Qd, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/RecoveryBanner.tsx",
            lineNumber: 22,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/RecoveryBanner.tsx",
            lineNumber: 23,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/RecoveryBanner.tsx",
          lineNumber: 21,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ m(zs, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/RecoveryBanner.tsx",
                  lineNumber: 33,
                  columnNumber: 11
                }, this),
                "Recover"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/RecoveryBanner.tsx",
              lineNumber: 29,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: t,
              className: "recovery-banner-dismiss p-2 rounded-md transition-colors duration-150",
              title: "Dismiss",
              "aria-label": "Dismiss recovery banner",
              children: /* @__PURE__ */ m(pt, { className: "w-5 h-5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/RecoveryBanner.tsx",
                lineNumber: 43,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/RecoveryBanner.tsx",
              lineNumber: 37,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/RecoveryBanner.tsx",
          lineNumber: 28,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/RecoveryBanner.tsx",
      lineNumber: 18,
      columnNumber: 5
    },
    this
  );
}
function _o(e) {
  const t = [], n = e.split(`
`);
  let o = 0, r = !1, s = "";
  for (let a = 0; a < n.length; a++) {
    const i = n[a], c = o;
    if (i.startsWith("```")) {
      r ? (r = !1, t.push({
        type: "code-block",
        content: i,
        start: c,
        end: c + i.length
      })) : (r = !0, s = i.slice(3).trim(), t.push({
        type: "code-block",
        content: "```",
        start: c,
        end: c + 3
      }), s && t.push({
        type: "code-block-lang",
        content: s,
        start: c + 3,
        end: c + 3 + s.length
      })), o += i.length + 1;
      continue;
    }
    if (r) {
      t.push({
        type: "code-block",
        content: i,
        start: c,
        end: c + i.length
      }), o += i.length + 1;
      continue;
    }
    const l = i.match(/^(#{1,6})\s+(.*)$/);
    if (l) {
      const N = l[1].length;
      t.push({
        type: `heading${N}`,
        content: i,
        start: c,
        end: c + i.length
      }), o += i.length + 1;
      continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(i.trim())) {
      t.push({
        type: "horizontal-rule",
        content: i,
        start: c,
        end: c + i.length
      }), o += i.length + 1;
      continue;
    }
    if (i.startsWith(">")) {
      t.push({
        type: "blockquote",
        content: i,
        start: c,
        end: c + i.length
      }), o += i.length + 1;
      continue;
    }
    if (/^\|?[\s-:|]+\|?$/.test(i) && i.includes("-")) {
      t.push({
        type: "table-separator",
        content: i,
        start: c,
        end: c + i.length
      }), o += i.length + 1;
      continue;
    }
    if (i.includes("|") && (i.startsWith("|") || i.trim().includes(" | "))) {
      t.push({
        type: "table-cell",
        content: i,
        start: c,
        end: c + i.length
      }), o += i.length + 1;
      continue;
    }
    const u = i.match(/^(\s*[-*+]\s+)\[([xX ])\]\s+(.*)$/);
    if (u) {
      const N = u[2].toLowerCase() === "x";
      t.push({
        type: N ? "task-checked" : "task-list",
        content: i,
        start: c,
        end: c + i.length
      }), o += i.length + 1;
      continue;
    }
    if (i.match(/^(\s*[-*+])\s+(.*)$/)) {
      t.push({
        type: "list-bullet",
        content: i,
        start: c,
        end: c + i.length
      }), o += i.length + 1;
      continue;
    }
    if (i.match(/^(\s*\d+\.)\s+(.*)$/)) {
      t.push({
        type: "list-number",
        content: i,
        start: c,
        end: c + i.length
      }), o += i.length + 1;
      continue;
    }
    let h = 0;
    const g = [
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
    ], p = [];
    for (const N of g) {
      let y;
      for (N.regex.lastIndex = 0; (y = N.regex.exec(i)) !== null; )
        p.push({
          start: c + y.index,
          end: c + y.index + y[0].length,
          type: N.type,
          content: y[0]
        });
    }
    p.sort((N, y) => N.start - y.start);
    const b = [];
    let v = c;
    for (const N of p)
      N.start >= v && (b.push(N), v = N.end);
    for (const N of b)
      N.start > c + h && t.push({
        type: "text",
        content: i.substring(h, N.start - c),
        start: c + h,
        end: N.start
      }), t.push({
        type: N.type,
        content: N.content,
        start: N.start,
        end: N.end
      }), h = N.end - c;
    h < i.length && t.push({
      type: "text",
      content: i.substring(h),
      start: c + h,
      end: c + i.length
    }), o += i.length + 1;
  }
  return t;
}
function Ua(e) {
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
function Ft(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function $o(e, t, n, o) {
  if (t.length === 0 && (!n || n.length === 0))
    return Ft(e);
  let r = "";
  const s = e.split(`
`);
  let a = 0;
  if (!n || n.length === 0) {
    for (let c = 0; c < s.length; c++) {
      const l = s[c], u = a + l.length, d = t.filter((h) => h.start >= a && h.start < u);
      let f = a;
      for (const h of d)
        h.start > f && (r += Ft(e.substring(f, h.start))), r += `<span class="${Ua(h.type)}">${Ft(h.content)}</span>`, f = h.end;
      f < u && (r += Ft(e.substring(f, u))), c < s.length - 1 && (r += `
`), a = u + 1;
    }
    return r;
  }
  const i = /* @__PURE__ */ new Map();
  n.forEach((c, l) => {
    for (let u = c.from; u < c.to; u++)
      i.set(u, { matchIdx: l, isCurrent: l === o });
  }), a = 0;
  for (let c = 0; c < s.length; c++) {
    const l = s[c], u = a + l.length, d = t.filter((h) => h.start >= a && h.start < u);
    let f = a;
    for (const h of d)
      h.start > f && (r += os(e, f, h.start, null, i)), r += os(e, h.start, h.end, Ua(h.type), i), f = h.end;
    f < u && (r += os(e, f, u, null, i)), c < s.length - 1 && (r += `
`), a = u + 1;
  }
  return r;
}
function os(e, t, n, o, r) {
  let s = "", a = t;
  for (; a < n; ) {
    const i = r.get(a);
    if (i) {
      const c = a;
      for (; a < n && r.get(a)?.matchIdx === i.matchIdx; )
        a++;
      const l = Ft(e.substring(c, a)), u = i.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      o ? s += `<span class="${o}"><mark class="${u}">${l}</mark></span>` : s += `<mark class="${u}">${l}</mark>`;
    } else {
      const c = a;
      for (; a < n && !r.has(a); )
        a++;
      const l = Ft(e.substring(c, a));
      o ? s += `<span class="${o}">${l}</span>` : s += l;
    }
  }
  return s;
}
function Ox({
  content: e,
  onChange: t,
  placeholder: n = "Write your markdown here...",
  editable: o = !0,
  autofocus: r = !1,
  className: s = "",
  searchMatches: a,
  currentMatchIndex: i,
  autoClosePairs: c = !0
}) {
  const l = j(null), u = j(null), d = j(null), f = j(null), h = 5e3, g = 80, [p, b] = Y(() => {
    const x = _o(e);
    return $o(e, x, a, i);
  }), v = j(null), N = zt(() => {
    if (e.length <= h) {
      const x = _o(e), C = $o(e, x, a, i);
      return v.current && (clearTimeout(v.current), v.current = null), C;
    }
    return null;
  }, [e, a, i]);
  q(() => {
    if (e.length <= h) {
      const x = _o(e);
      b($o(e, x, a, i));
      return;
    }
    return v.current && clearTimeout(v.current), v.current = setTimeout(() => {
      const x = _o(e);
      b($o(e, x, a, i)), v.current = null;
    }, g), () => {
      v.current && clearTimeout(v.current);
    };
  }, [e, a, i]);
  const y = N ?? p, E = H(() => {
    const x = l.current, C = u.current, M = d.current;
    if (x) {
      const D = M?.parentElement, P = D ? D.clientHeight : 200;
      x.style.height = "auto";
      const R = Math.max(x.scrollHeight, P, 200);
      x.style.height = `${R}px`, C && (C.style.height = `${R}px`);
    }
  }, []);
  q(() => {
    const x = l.current;
    if (!x) return;
    const C = (M) => {
      const D = x.closest(".editor-content-wrapper");
      if (!D) return;
      const { scrollTop: P, scrollHeight: R, clientHeight: L } = D, $ = P <= 0, O = P + L >= R - 1;
      (M.deltaY > 0 && !O || M.deltaY < 0 && !$) && (M.preventDefault(), D.scrollTop += M.deltaY);
    };
    return x.addEventListener("wheel", C, { passive: !1 }), () => x.removeEventListener("wheel", C);
  }, []);
  const k = H(() => {
  }, []);
  q(() => {
    E();
  }, [e, E]), q(() => {
    r && l.current && l.current.focus();
  }, [r]), q(() => {
    if (f.current && l.current) {
      const { start: x, end: C } = f.current;
      l.current.selectionStart = x, l.current.selectionEnd = C, f.current = null;
    }
  }, [e]);
  const w = H((x) => {
    const C = x.target;
    f.current = {
      start: C.selectionStart,
      end: C.selectionEnd
    }, t(C.value);
  }, [t]), S = H((x) => {
    const C = x.currentTarget, M = C.selectionStart, D = C.selectionEnd, P = C.value, R = M !== D;
    if (c) {
      if (x.key === "`" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), R) {
          const L = P.substring(M, D), $ = P.substring(0, M) + "`" + L + "`" + P.substring(D);
          f.current = { start: M + 1, end: D + 1 }, t($);
        } else if (P[M] === "`")
          f.current = { start: M + 1, end: M + 1 }, t(P), C.selectionStart = C.selectionEnd = M + 1;
        else {
          const L = P.substring(0, M) + "``" + P.substring(D);
          f.current = { start: M + 1, end: M + 1 }, t(L);
        }
        return;
      }
      if (x.key === "*" && !x.ctrlKey && !x.metaKey) {
        if (P[M - 1] === "*" && P[M], R) {
          x.preventDefault();
          const O = P.substring(M, D), K = P.substring(0, M) + "*" + O + "*" + P.substring(D);
          f.current = { start: M + 1, end: D + 1 }, t(K);
          return;
        }
        if (P[M] === "*") {
          x.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(P.substring(0, M) + P.substring(M));
          return;
        }
        x.preventDefault();
        const $ = P.substring(0, M) + "**" + P.substring(D);
        f.current = { start: M + 1, end: M + 1 }, t($);
        return;
      }
      if (x.key === "_" && !x.ctrlKey && !x.metaKey) {
        if (R) {
          x.preventDefault();
          const $ = P.substring(M, D), O = P.substring(0, M) + "_" + $ + "_" + P.substring(D);
          f.current = { start: M + 1, end: D + 1 }, t(O);
          return;
        }
        if (P[M] === "_") {
          x.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(P.substring(0, M) + P.substring(M));
          return;
        }
        x.preventDefault();
        const L = P.substring(0, M) + "__" + P.substring(D);
        f.current = { start: M + 1, end: M + 1 }, t(L);
        return;
      }
      if (x.key === "~" && !x.ctrlKey && !x.metaKey) {
        if (R) {
          x.preventDefault();
          const $ = P.substring(M, D), O = P.substring(0, M) + "~" + $ + "~" + P.substring(D);
          f.current = { start: M + 1, end: D + 1 }, t(O);
          return;
        }
        if (P[M] === "~") {
          x.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(P.substring(0, M) + P.substring(M));
          return;
        }
        x.preventDefault();
        const L = P.substring(0, M) + "~~" + P.substring(D);
        f.current = { start: M + 1, end: M + 1 }, t(L);
        return;
      }
      if (x.key === "[" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), R) {
          const L = P.substring(M, D), $ = P.substring(0, M) + "[" + L + "]()" + P.substring(D);
          f.current = { start: D + 3, end: D + 3 }, t($);
        } else {
          const L = P.substring(0, M) + "[]()" + P.substring(D);
          f.current = { start: M + 1, end: M + 1 }, t(L);
        }
        return;
      }
      if (x.key === "]" && !x.ctrlKey && !x.metaKey && P[M] === "]") {
        x.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(P.substring(0, M) + P.substring(M));
        return;
      }
      if (x.key === ")" && !x.ctrlKey && !x.metaKey && P[M] === ")") {
        x.preventDefault(), f.current = { start: M + 1, end: M + 1 }, t(P.substring(0, M) + P.substring(M));
        return;
      }
      if (x.key === "Backspace" && !R && M > 0) {
        const L = P[M - 1], $ = P[M], O = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [K, I] of O)
          if (L === K && $ === I) {
            x.preventDefault();
            const A = P.substring(0, M - 1) + P.substring(M + 1);
            f.current = { start: M - 1, end: M - 1 }, t(A);
            return;
          }
        if (L === "[" && P.substring(M, M + 3) === "]()") {
          x.preventDefault();
          const K = P.substring(0, M - 1) + P.substring(M + 3);
          f.current = { start: M - 1, end: M - 1 }, t(K);
          return;
        }
      }
    }
    if (x.key === "Tab")
      if (x.preventDefault(), x.shiftKey) {
        const L = P.substring(0, M), $ = P.substring(M, D), O = P.substring(D), I = L.lastIndexOf(`
`) + 1, A = L.substring(0, I), _ = L.substring(I), U = (_ + $).split(`
`), V = U.map((B) => B.startsWith("  ") ? B.substring(2) : B.startsWith("	") ? B.substring(1) : B), G = A + V.join(`
`) + O, Q = (_ + $).length - V.join(`
`).length;
        f.current = {
          start: Math.max(I, M - (U[0].length - V[0].length)),
          end: D - Q
        }, t(G);
      } else if (M === D) {
        const L = P.substring(0, M) + "  " + P.substring(D);
        f.current = { start: M + 2, end: M + 2 }, t(L);
      } else {
        const L = P.substring(0, M), $ = P.substring(M, D), O = P.substring(D), I = L.lastIndexOf(`
`) + 1, A = L.substring(0, I), U = (L.substring(I) + $).split(`
`), V = U.map((Q) => "  " + Q), G = A + V.join(`
`) + O;
        f.current = {
          start: M + 2,
          end: D + U.length * 2
        }, t(G);
      }
  }, [t, c]);
  return /* @__PURE__ */ m("div", { ref: d, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: u,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: y || `<span class="md-placeholder">${Ft(n)}</span>` },
        "aria-hidden": "true"
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
        lineNumber: 880,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      "textarea",
      {
        ref: l,
        value: e,
        onChange: w,
        onKeyDown: S,
        onScroll: k,
        placeholder: "",
        disabled: !o,
        className: "syntax-textarea",
        spellCheck: !1
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
        lineNumber: 886,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
    lineNumber: 879,
    columnNumber: 5
  }, this);
}
let Ya = 0, Ts = 0, Vu = 0;
function _x(e) {
  Ts++, Vu = e;
}
const $x = vn(function({
  visible: t,
  onClose: n,
  editor: o
}) {
  const [r, s] = Y(!1), [a, i] = Y({
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
  }), c = j([]), l = j(performance.now()), u = j(0), d = j(0), f = j(0), h = j(0), [g, p] = Y(new Array(60).fill(0)), [b, v] = Y(new Array(60).fill(0));
  q(() => {
    if (!t || !o) return;
    const S = () => {
      const x = performance.now();
      queueMicrotask(() => {
        const C = performance.now() - x;
        _x(C);
      });
    };
    return o.on("transaction", S), () => {
      o.off("transaction", S);
    };
  }, [t, o]), q(() => {
    if (!t) return;
    let S = 0, x = performance.now(), C = 0;
    const M = (D) => {
      const P = D - l.current;
      if (l.current = D, c.current.push({ time: D, duration: P }), c.current.length > 120 && (c.current = c.current.slice(-120)), P > 16.67 && d.current++, S++, D - x >= 1e3) {
        C = S, S = 0, x = D;
        const R = c.current.slice(-60), L = R.length > 0 ? R.reduce((V, G) => V + G.duration, 0) / R.length : 0, $ = R.length > 0 ? Math.max(...R.map((V) => V.duration)) : 0, O = performance.memory, K = O ? O.usedJSHeapSize / (1024 * 1024) : 0, I = O ? O.jsHeapSizeLimit / (1024 * 1024) : 0, A = document.querySelectorAll("*").length, _ = Ya - f.current, U = Ts - h.current;
        f.current = Ya, h.current = Ts, i({
          fps: C,
          frameTime: Math.round(L * 100) / 100,
          frameTimeMax: Math.round($ * 100) / 100,
          memoryUsed: Math.round(K * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: _,
          transactionCount: U,
          lastTransactionTime: Math.round(Vu * 100) / 100,
          domNodes: A,
          longFrames: d.current
        }), p((V) => [...V.slice(1), C]), v((V) => [...V.slice(1), L]), d.current = 0;
      }
      u.current = requestAnimationFrame(M);
    };
    return u.current = requestAnimationFrame(M), () => {
      cancelAnimationFrame(u.current);
    };
  }, [t]);
  const N = H(() => {
    n?.();
  }, [n]), y = H(() => {
    s((S) => !S);
  }, []);
  if (!t) return null;
  const E = (S) => S >= 55 ? "#4ade80" : S >= 30 ? "#fbbf24" : "#f87171", k = (S) => S <= 16.67 ? "#4ade80" : S <= 33.33 ? "#fbbf24" : "#f87171", w = (S, x, C) => {
    const P = S.map((R, L) => {
      const $ = L / (S.length - 1) * 120, O = 24 - Math.min(R, x) / x * 24;
      return `${$},${O}`;
    }).join(" ");
    return /* @__PURE__ */ m("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ m(
      "polyline",
      {
        points: P,
        fill: "none",
        stroke: C,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 225,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 224,
      columnNumber: 7
    }, this);
  };
  return /* @__PURE__ */ m("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ m("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ m("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ m(Jd, { size: 14 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 241,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m("span", { children: "Performance" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 242,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 240,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ m("button", { onClick: y, title: r ? "Expand" : "Minimize", children: r ? /* @__PURE__ */ m(dc, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 28
        }, this) : /* @__PURE__ */ m(mc, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 54
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 245,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m("button", { onClick: N, title: "Close profiler", children: /* @__PURE__ */ m(pt, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 249,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 248,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 244,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 239,
      columnNumber: 7
    }, this),
    !r && /* @__PURE__ */ m("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "FPS" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 259,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: E(a.fps) }, children: a.fps }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 260,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 258,
          columnNumber: 13
        }, this),
        w(g, 70, E(a.fps))
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 257,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Frame Time" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 270,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: k(a.frameTime) }, children: [
            a.frameTime,
            "ms"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 271,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 269,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Max" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 276,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value-sub", style: { color: k(a.frameTimeMax) }, children: [
            a.frameTimeMax,
            "ms"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 277,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 275,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: [
            "Jank (",
            ">",
            " 16.7ms)"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 282,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value-sub", style: { color: a.longFrames > 3 ? "#f87171" : "#4ade80" }, children: [
            a.longFrames,
            "/s"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 283,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 281,
          columnNumber: 13
        }, this),
        w(b, 50, k(a.frameTime))
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 268,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Renders/s" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 293,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: a.renderCount }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 294,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 292,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Transactions/s" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 297,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: a.transactionCount }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 298,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 296,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Last TX time" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 301,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value-sub", children: [
            a.lastTransactionTime,
            "ms"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 302,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 300,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 291,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "DOM Nodes" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 309,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: a.domNodes.toLocaleString() }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 310,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 308,
          columnNumber: 13
        }, this),
        a.memoryTotal > 0 && /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Memory" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 314,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: [
            a.memoryUsed,
            "MB / ",
            a.memoryTotal,
            "MB"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 315,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 313,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 307,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 255,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/PerformanceProfiler.tsx",
    lineNumber: 237,
    columnNumber: 5
  }, this);
});
class Wx extends Dd {
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
      const { error: n, errorInfo: o } = this.state;
      if (!n) return;
      const r = [
        `Error: ${n.message}`,
        "",
        "Stack trace:",
        n.stack || "(no stack trace)",
        "",
        "Component stack:",
        o?.componentStack || "(no component stack)"
      ].join(`
`);
      navigator.clipboard.writeText(r).then(() => {
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
      const { error: t, showDetails: n, retryCount: o, copied: r } = this.state, s = o >= 2;
      return /* @__PURE__ */ m("div", { className: re("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ m("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ m("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ m(em, { className: "w-6 h-6 text-destructive" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 140,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 139,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ m("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 145,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 148,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 144,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ m(
            Mt,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ m(zs, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 164,
                  columnNumber: 17
                }, this),
                "Retry ",
                o > 0 && `(${o})`
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 158,
              columnNumber: 15
            },
            this
          ),
          s && this.props.onClearContent && /* @__PURE__ */ m(
            Mt,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ m(sn, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 176,
                  columnNumber: 19
                }, this),
                "Clear Content & Retry"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 170,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 156,
          columnNumber: 13
        }, this),
        t && /* @__PURE__ */ m("div", { className: "w-full max-w-xs", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: this.toggleDetails,
              className: re(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ m(Dt, { className: "w-3 h-3" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 193,
                  columnNumber: 21
                }, this) : /* @__PURE__ */ m(cc, { className: "w-3 h-3" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 195,
                  columnNumber: 21
                }, this),
                "Error details"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 185,
              columnNumber: 17
            },
            this
          ),
          n && /* @__PURE__ */ m("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ m("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ m("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
                lineNumber: 203,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ m(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: r ? /* @__PURE__ */ m(Ce, { children: [
                    /* @__PURE__ */ m(tm, { className: "w-3 h-3 text-green-500" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 210,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ m("span", { className: "text-green-500", children: "Copied" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 211,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
                    lineNumber: 209,
                    columnNumber: 27
                  }, this) : /* @__PURE__ */ m(Ce, { children: [
                    /* @__PURE__ */ m(Nn, { className: "w-3 h-3" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 215,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ m("span", { children: "Copy" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 216,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
                    lineNumber: 214,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 204,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 202,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ m("p", { className: "text-xs font-mono text-muted-foreground break-all", children: t.message }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 221,
              columnNumber: 21
            }, this),
            t.stack && /* @__PURE__ */ m("pre", { className: "text-[10px] font-mono text-muted-foreground/70 mt-2 whitespace-pre-wrap break-all", children: t.stack.split(`
`).slice(1, 6).join(`
`) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 225,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 201,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 184,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
        lineNumber: 137,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorErrorBoundary.tsx",
        lineNumber: 136,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
function Bx({ className: e = "", theme: t }) {
  const n = (o) => ({
    height: "1rem",
    width: o,
    borderRadius: "0.25rem",
    background: "var(--color-muted, #e5e7eb)",
    opacity: 0.5,
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
  });
  return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${e}`, "data-theme": t, children: /* @__PURE__ */ m(
    "div",
    {
      className: "editor-loading",
      style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" },
      children: [
        /* @__PURE__ */ m("div", { style: n("100%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 28,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("83%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 29,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("66%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 30,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: { height: "0.75rem" } }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 31,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("100%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 32,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("75%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 33,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorLoadingSkeleton.tsx",
      lineNumber: 24,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorLoadingSkeleton.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
function Hx({ editorMode: e, onModeSwitch: t }) {
  return /* @__PURE__ */ m("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
    /* @__PURE__ */ m(
      "button",
      {
        onClick: () => t("wysiwyg"),
        className: `editor-mode-toggle-btn ${e === "wysiwyg" ? "active" : ""}`,
        title: "Visual Editor",
        children: /* @__PURE__ */ m(nm, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorModeToggle.tsx",
          lineNumber: 19,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorModeToggle.tsx",
        lineNumber: 14,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      "button",
      {
        onClick: () => t("markdown"),
        className: `editor-mode-toggle-btn ${e === "markdown" ? "active" : ""}`,
        title: "Raw Markdown",
        children: /* @__PURE__ */ m(Us, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorModeToggle.tsx",
          lineNumber: 26,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorModeToggle.tsx",
        lineNumber: 21,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/EditorModeToggle.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}
const ze = ({ onMouseDown: e, isActive: t, disabled: n, children: o, title: r }) => /* @__PURE__ */ m(
  "button",
  {
    onMouseDown: e,
    disabled: n,
    title: r,
    className: `
      flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
      transition-all duration-100 ease-out touch-manipulation
      ${t ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
      ${n ? "opacity-50 cursor-not-allowed" : ""}
    `,
    children: o
  },
  void 0,
  !1,
  {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 50,
    columnNumber: 3
  },
  void 0
), ja = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }, void 0, !1, {
  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
  lineNumber: 69,
  columnNumber: 3
}, void 0), Va = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], Fx = vn(function({ editor: t, isH1: n, isH2: o, isH3: r, isH4: s, isH5: a, executeCommand: i }) {
  const [c, l] = Y(!1), u = j(null), d = n ? "h1" : o ? "h2" : r ? "h3" : s ? "h4" : a ? "h5" : "paragraph", f = Va.find((g) => g.value === d)?.shortLabel || "P";
  q(() => {
    if (!c) return;
    const g = (p) => {
      u.current && !u.current.contains(p.target) && l(!1);
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [c]);
  const h = (g, p) => {
    if (g.preventDefault(), g.stopPropagation(), p === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const b = parseInt(p.replace("h", ""));
      t.chain().focus().toggleHeading({ level: b }).run();
    }
    l(!1);
  };
  return /* @__PURE__ */ m("div", { ref: u, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ m(
      "button",
      {
        onMouseDown: (g) => {
          g.preventDefault(), g.stopPropagation(), l(!c);
        },
        title: "Text style",
        className: `
          flex items-center gap-1 h-7 px-2 rounded-md flex-shrink-0
          transition-all duration-100 ease-out touch-manipulation
          text-xs font-normal overflow-visible
          ${d !== "paragraph" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
        `,
        children: [
          /* @__PURE__ */ m("span", { className: "min-w-[18px] text-center", children: f }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 143,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(Dt, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${c ? "rotate-180" : ""}` }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 144,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 126,
        columnNumber: 7
      },
      this
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
        children: Va.map((g) => {
          const p = g.value === d;
          return /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (b) => h(b, g.value),
              className: `
                  flex items-center gap-2 w-full px-3 py-1.5 text-left text-sm
                  transition-colors duration-75
                  ${p ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"}
                `,
              children: [
                /* @__PURE__ */ m("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: g.shortLabel }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
                  lineNumber: 172,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ m("span", { children: g.label }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
                  lineNumber: 173,
                  columnNumber: 17
                }, this)
              ]
            },
            g.value,
            !0,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 160,
              columnNumber: 15
            },
            this
          );
        })
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 148,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 125,
    columnNumber: 5
  }, this);
}), zx = vn(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: o = !1, aiEnabled: r = !1, onAISparklesClick: s }) {
  const a = j(null), i = Ja({
    editor: t,
    selector: ({ editor: C }) => ({
      isBold: C.isActive("bold"),
      isItalic: C.isActive("italic"),
      isUnderline: C.isActive("underline"),
      isStrike: C.isActive("strike"),
      isCode: C.isActive("code"),
      isHighlight: C.isActive("highlight"),
      isLink: C.isActive("link"),
      isH1: C.isActive("heading", { level: 1 }),
      isH2: C.isActive("heading", { level: 2 }),
      isH3: C.isActive("heading", { level: 3 }),
      isH4: C.isActive("heading", { level: 4 }),
      isH5: C.isActive("heading", { level: 5 }),
      isBulletList: C.isActive("bulletList"),
      isOrderedList: C.isActive("orderedList"),
      isTaskList: C.isActive("taskList"),
      isBlockquote: C.isActive("blockquote"),
      isCodeBlock: C.isActive("codeBlock")
    })
  }), [c, l] = Y(!1), [u, d] = Y(""), [f, h] = Y(!1), [g, p] = Y({ top: 0, left: 0 }), b = j(null), v = j(null), N = j(null), y = H(() => {
    if (u) {
      let C = u.trim();
      !/^https?:\/\//i.test(C) && !C.startsWith("mailto:") && (C = "https://" + C), t.chain().focus().extendMarkRange("link").setLink({ href: C }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    l(!1), d("");
  }, [t, u]), E = (C) => {
    C.preventDefault(), C.stopPropagation();
    const M = t.getAttributes("link").href;
    d(M || ""), l(!0);
  }, k = H((C, M) => {
    C.preventDefault(), C.stopPropagation(), M();
  }, []);
  q(() => {
    if (!t || t.isDestroyed) return;
    const C = () => {
      if (!t.isDestroyed)
        try {
          const { selection: M } = t.state, { empty: D, from: P, to: R } = M, O = ("node" in M && M.node ? M.node : null)?.type?.name === "resizableImage";
          if (D || O || t.isActive("codeBlock")) {
            N.current && (clearTimeout(N.current), N.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              h(!1), l(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const K = t.view.coordsAtPos(P), I = t.view.coordsAtPos(R), A = b.current?.offsetWidth || 500, _ = b.current?.offsetHeight || 40, U = 8, V = window.innerWidth;
          let G = 0, Q = 0;
          if (b.current) {
            const le = b.current.closest('[data-slot="dialog-content"]');
            if (le) {
              const ue = le.getBoundingClientRect();
              G = ue.left, Q = ue.top;
            }
          }
          let W = (K.left + I.left) / 2 - A / 2 - G;
          const z = G ? V - G : V;
          W = Math.max(U, Math.min(z - A - U, W));
          let Z = K.top - _ - 10 - Q;
          Z < U && (Z = I.bottom + 10 - Q), f ? p({ top: Math.max(U, Z), left: W }) : (N.current && clearTimeout(N.current), N.current = setTimeout(() => {
            p({ top: Math.max(U, Z), left: W }), h(!0);
          }, 50));
        } catch (M) {
          console.warn("FloatingToolbar: Error updating position", M);
        }
    };
    return t.on("selectionUpdate", C), () => {
      t.off("selectionUpdate", C), v.current && clearTimeout(v.current), N.current && clearTimeout(N.current);
    };
  }, [t, f]), q(() => {
    if (!f || !t || t.isDestroyed) return;
    const C = t.view.dom.closest(".editor-content") || t.view.dom.parentElement;
    if (!C) return;
    const M = () => {
      h(!1), l(!1);
    };
    return C.addEventListener("scroll", M, { passive: !0 }), window.addEventListener("scroll", M, { passive: !0 }), () => {
      C.removeEventListener("scroll", M), window.removeEventListener("scroll", M);
    };
  }, [f, t]);
  const w = (C) => {
    v.current && (clearTimeout(v.current), v.current = null);
  };
  if (!f || o)
    return null;
  const S = 15, x = c ? /* @__PURE__ */ m(
    "div",
    {
      ref: b,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: g.top,
        left: g.left
      },
      onMouseDown: w,
      children: /* @__PURE__ */ m("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ m(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: u,
            onChange: (C) => d(C.target.value),
            onKeyDown: (C) => {
              C.key === "Enter" && (C.preventDefault(), y()), C.key === "Escape" && (l(!1), d(""));
            },
            className: `
            bg-secondary/50 rounded px-3 py-2 sm:py-1
            text-sm text-foreground placeholder:text-muted-foreground
            outline-none border border-border/50
            w-full sm:w-48
          `,
            autoFocus: !0
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 406,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ m("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (C) => {
                C.preventDefault(), y();
              },
              className: `
              flex-1 sm:flex-none px-4 sm:px-3 py-2 sm:py-1 text-sm sm:text-xs font-medium rounded
              bg-primary text-primary-foreground
              hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation
            `,
              children: "Apply"
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 430,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (C) => {
                C.preventDefault(), l(!1), d("");
              },
              className: `
              flex-1 sm:flex-none px-4 sm:px-2 py-2 sm:py-1 text-sm sm:text-xs font-medium rounded
              bg-secondary text-secondary-foreground
              hover:bg-accent active:bg-accent/80 transition-colors touch-manipulation
            `,
              children: "Cancel"
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 443,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 429,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 405,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 395,
      columnNumber: 5
    },
    this
  ) : /* @__PURE__ */ m(
    "div",
    {
      ref: b,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: g.top,
        left: g.left
      },
      onMouseDown: w,
      children: [
        /* @__PURE__ */ m(
          ze,
          {
            onMouseDown: (C) => k(C, () => t.chain().focus().toggleBold().run()),
            isActive: i?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(As, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 477,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 472,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          ze,
          {
            onMouseDown: (C) => k(C, () => t.chain().focus().toggleItalic().run()),
            isActive: i?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m(Ps, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 484,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 479,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          ze,
          {
            onMouseDown: (C) => k(C, () => t.chain().focus().toggleUnderline().run()),
            isActive: i?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(Is, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 491,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 486,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          ze,
          {
            onMouseDown: (C) => k(C, () => t.chain().focus().toggleStrike().run()),
            isActive: i?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(Rs, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 498,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 493,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          ze,
          {
            onMouseDown: (C) => k(C, () => t.chain().focus().toggleCode().run()),
            isActive: i?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(nc, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 505,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 500,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          ze,
          {
            onMouseDown: (C) => k(C, () => t.chain().focus().toggleHighlight().run()),
            isActive: i?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ m(oc, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 512,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 507,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          ze,
          {
            onMouseDown: E,
            isActive: i?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ m(Ls, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 520,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 515,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(ja, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 523,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m(
          Fx,
          {
            editor: t,
            isH1: i?.isH1 ?? !1,
            isH2: i?.isH2 ?? !1,
            isH3: i?.isH3 ?? !1,
            isH4: i?.isH4 ?? !1,
            isH5: i?.isH5 ?? !1,
            executeCommand: k
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 526,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          ze,
          {
            onMouseDown: (C) => k(C, () => t.chain().focus().toggleBlockquote().run()),
            isActive: i?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(Ws, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 540,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 535,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          ze,
          {
            onMouseDown: (C) => k(C, () => t.chain().focus().toggleBulletList().run()),
            isActive: i?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(Os, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 547,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 542,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          ze,
          {
            onMouseDown: (C) => k(C, () => t.chain().focus().toggleOrderedList().run()),
            isActive: i?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m(_s, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 554,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 549,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          ze,
          {
            onMouseDown: (C) => k(C, () => t.chain().focus().toggleTaskList().run()),
            isActive: i?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m($s, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 561,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 556,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          ze,
          {
            onMouseDown: (C) => k(C, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: i?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(om, { size: S }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 568,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 563,
            columnNumber: 7
          },
          this
        ),
        r && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(ja, {}, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 574,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              ref: a,
              onMouseDown: (C) => {
                C.preventDefault(), C.stopPropagation(), a.current && s?.(a.current);
              },
              title: "AI Writing Assistant",
              className: `
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            `,
              children: /* @__PURE__ */ m(ir, { size: S }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
                lineNumber: 592,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 575,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 573,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 461,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { onMouseDown: w, children: x }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 600,
    columnNumber: 5
  }, this);
});
function Ux({ editor: e, isOpen: t, onClose: n }) {
  const [o, r] = Y(""), s = j(null), a = j(null), [i, c] = Y({ top: 0, left: 0 });
  q(() => {
    if (t) {
      const g = e.getAttributes("link").href || "";
      r(g);
      try {
        const { view: p } = e, { from: b } = p.state.selection, v = p.coordsAtPos(b), N = v.bottom + 8, y = Math.max(16, Math.min(v.left, window.innerWidth - 420));
        c({ top: N, left: y });
      } catch {
        c({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), q(() => {
    if (!t) return;
    const g = (N) => {
      a.current && !a.current.contains(N.target) && n();
    }, p = () => {
      n();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", g);
    }, 10), v = e.view.dom.closest(".editor-content-wrapper");
    return v?.addEventListener("scroll", p), () => {
      clearTimeout(b), document.removeEventListener("mousedown", g), v?.removeEventListener("scroll", p);
    };
  }, [t, n, e]);
  const l = H((g) => {
    if (g?.preventDefault(), o.trim()) {
      let p = o.trim();
      !/^https?:\/\//i.test(p) && !p.startsWith("mailto:") && (p = "https://" + p), e.chain().focus().extendMarkRange("link").setLink({ href: p }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [o, e, n]), u = H((g) => {
    g.key === "Escape" ? (g.preventDefault(), n()) : g.key === "Enter" && (g.preventDefault(), l());
  }, [n, l]);
  if (!t) return null;
  const f = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", h = /* @__PURE__ */ m(
    "div",
    {
      ref: a,
      className: "link-popover",
      "data-theme": f,
      style: {
        position: "fixed",
        top: `${i.top}px`,
        left: `${i.left}px`
      },
      children: /* @__PURE__ */ m("form", { onSubmit: l, className: "link-popover-form", children: [
        /* @__PURE__ */ m("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ m(Ds, { className: "link-popover-icon", size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkPopover.tsx",
            lineNumber: 140,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(
            "input",
            {
              ref: s,
              type: "text",
              value: o,
              onChange: (g) => r(g.target.value),
              onKeyDown: u,
              placeholder: "Enter URL or paste link",
              className: "link-popover-input",
              autoComplete: "off",
              spellCheck: !1
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkPopover.tsx",
              lineNumber: 141,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkPopover.tsx",
          lineNumber: 139,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { className: "link-popover-hint", children: "Press Enter to save · Escape to cancel" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkPopover.tsx",
          lineNumber: 153,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkPopover.tsx",
        lineNumber: 138,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkPopover.tsx",
      lineNumber: 128,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { children: h }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkPopover.tsx",
    lineNumber: 161,
    columnNumber: 10
  }, this);
}
function Yx({ editor: e, onEditLink: t }) {
  const [n, o] = Y({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), r = j(null), s = j(null), a = H((y) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const E = y.getAttribute("href") || "", k = y.getBoundingClientRect(), w = k.bottom + 8, S = Math.max(16, Math.min(k.left, window.innerWidth - 340));
        o({
          isVisible: !0,
          url: E,
          position: { top: w, left: S },
          linkElement: y
        });
      } catch (E) {
        console.warn("LinkHoverTooltip: Error showing tooltip", E);
      }
    }
  }, [e]), i = H(() => {
    s.current = setTimeout(() => {
      o((y) => ({ ...y, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), c = H(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  q(() => {
    if (!e || e.isDestroyed) return;
    const y = e.view.dom;
    if (!y) return;
    const E = (w) => {
      const x = w.target.closest("a");
      x && y.contains(x) && a(x);
    }, k = (w) => {
      const S = w.target, x = w.relatedTarget;
      if (S.closest("a")) {
        if (x && r.current?.contains(x))
          return;
        i();
      }
    };
    return y.addEventListener("mouseover", E), y.addEventListener("mouseout", k), () => {
      y.removeEventListener("mouseover", E), y.removeEventListener("mouseout", k), s.current && clearTimeout(s.current);
    };
  }, [e, a, i]), q(() => {
    if (!n.isVisible) return;
    const y = () => {
      o((k) => ({ ...k, isVisible: !1, linkElement: null }));
    }, E = e.view.dom.closest(".editor-content-wrapper");
    return E?.addEventListener("scroll", y), window.addEventListener("scroll", y, !0), () => {
      E?.removeEventListener("scroll", y), window.removeEventListener("scroll", y, !0);
    };
  }, [n.isVisible, e]);
  const [l, u] = Y(!1), d = H(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      u(!0), setTimeout(() => u(!1), 1500);
    });
  }, [n.url]), f = H(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), h = H(() => {
    if (n.linkElement) {
      const { view: y } = e, { doc: E } = y.state;
      let k = null, w = null;
      E.descendants((S, x) => {
        if (S.isText && S.marks.some((C) => C.type.name === "link")) {
          const C = y.nodeDOM(x);
          if (C && (C === n.linkElement || C.parentElement === n.linkElement))
            return k = x, w = x + S.nodeSize, !1;
        }
        return !0;
      }), k !== null && w !== null ? e.chain().focus().setTextSelection({ from: k, to: w }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    o((y) => ({ ...y, isVisible: !1 }));
  }, [e, n.linkElement]), g = H(() => {
    if (n.linkElement) {
      const { view: y } = e, { doc: E } = y.state;
      E.descendants((k, w) => {
        if (k.isText && k.marks.some((S) => S.type.name === "link")) {
          const S = y.nodeDOM(w);
          if (S && (S === n.linkElement || S.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: w, to: w + k.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    o((y) => ({ ...y, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const p = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, v = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", N = /* @__PURE__ */ m(
    "div",
    {
      ref: r,
      className: "link-hover-tooltip",
      "data-theme": v,
      style: {
        position: "fixed",
        top: `${n.position.top}px`,
        left: `${n.position.left}px`
      },
      onMouseEnter: c,
      onMouseLeave: i,
      children: /* @__PURE__ */ m("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: f,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ m(rm, { size: 13, className: "link-hover-tooltip-link-icon" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 247,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "link-hover-tooltip-url", children: p || "No URL" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 248,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
            lineNumber: 242,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ m("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: g,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ m(sm, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 259,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 254,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: d,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: l ? /* @__PURE__ */ m(yn, { size: 14, style: { color: "var(--primary)" } }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 268,
                columnNumber: 23
              }, this) : /* @__PURE__ */ m(Nn, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 268,
                columnNumber: 81
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 263,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ m(im, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 277,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 272,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
          lineNumber: 252,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
        lineNumber: 240,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
      lineNumber: 228,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { children: N }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/LinkHoverTooltip.tsx",
    lineNumber: 285,
    columnNumber: 10
  }, this);
}
const jx = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(sr, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 64,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(am, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 70,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(cm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 76,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(lm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 82,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(um, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 88,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(dm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 94,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ m(Os, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 100,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ m(_s, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 106,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ m($s, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 112,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ m(Ws, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 118,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ m(rc, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 124,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ m(rs, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 130,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ m(Ms, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 136,
      columnNumber: 11
    }, void 0),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ m(sc, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 143,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ m(jo, { size: 16, className: "text-blue-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 149,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ m(ac, { size: 16, className: "text-purple-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 155,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ m(ic, { size: 16, className: "text-amber-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 161,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ m(Bs, { size: 16, className: "text-green-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 167,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ m(Hs, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 173,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ m(lc, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 179,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ m(Ds, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 185,
      columnNumber: 11
    }, void 0),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], Vx = 32, Kx = 8, Gx = 320, qx = 210, Wo = 12;
function Ka(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const r = t.getRangeAt(0), s = r.getBoundingClientRect();
      if (s.width === 0 && s.height === 0 && s.top === 0) {
        const a = document.createElement("span");
        a.textContent = "​", r.cloneRange().insertNode(a);
        const c = a.getBoundingClientRect(), l = { top: c.top, bottom: c.bottom, left: c.left };
        return a.parentNode?.removeChild(a), t.removeAllRanges(), t.addRange(r), l;
      }
      return { top: s.top, bottom: s.bottom, left: s.left };
    }
    const n = e.state.selection.from, o = e.view.coordsAtPos(n);
    return { top: o.top, bottom: o.bottom, left: o.left };
  } catch {
    return null;
  }
}
function Xx({ editor: e }) {
  const [t, n] = Y(!1), [o, r] = Y(""), [s, a] = Y(0), [i, c] = Y(null), [l, u] = Y(!1), [d, f] = Y({ top: 0, left: 0 }), [h, g] = Y("below"), p = j(null), b = j(-1), v = j(!1);
  q(() => {
    v.current = t;
  }, [t]);
  const N = jx.filter((C) => {
    if (!o) return !0;
    const M = o.toLowerCase();
    return C.title.toLowerCase().includes(M) || C.keywords?.some((D) => D.includes(M));
  }), y = Math.min(
    N.length * Vx + Kx,
    Gx
  );
  rr(() => {
    if (!t || !i) return;
    const { top: C, bottom: M, left: D } = i, P = window.innerHeight, R = window.innerWidth, L = P - M - Wo, $ = C - Wo;
    let O;
    if (L >= y ? O = "below" : $ >= y ? O = "above" : O = L >= $ ? "below" : "above", g(O), p.current) {
      const K = Math.max(
        Wo,
        Math.min(D, R - qx - Wo)
      ), I = O === "below" ? M + 4 : C - y - 4;
      p.current.style.top = `${I}px`, p.current.style.left = `${K}px`;
    }
  }, [t, i, y, N.length]);
  const E = H(() => {
    const { state: C } = e, { selection: M } = C, D = M.from, P = b.current;
    if (P >= 0 && P <= D)
      e.chain().focus().deleteRange({ from: P, to: D }).run();
    else {
      const { $from: R } = M, $ = R.parent.textBetween(0, R.parentOffset, void 0, "￼").lastIndexOf("/");
      if ($ !== -1) {
        const O = R.pos - (R.parentOffset - $);
        e.chain().focus().deleteRange({ from: O, to: R.pos }).run();
      }
    }
  }, [e]), k = H(() => {
    n(!1), r(""), a(0), b.current = -1, c(null);
  }, []), w = H((C) => {
    const M = N[C];
    if (M) {
      if (E(), M.isImageCommand) {
        const { state: D } = e, P = e.view.coordsAtPos(D.selection.from);
        f({
          top: P.bottom + 8,
          left: P.left
        }), u(!0);
      } else
        M.command(e);
      k();
    }
  }, [e, N, E, k]), S = H((C, M) => {
    e.chain().focus().setImage({ src: C, alt: M }).run();
  }, [e]);
  return q(() => {
    if (!e) return;
    const C = () => {
      if (v.current) return;
      const { state: M } = e, { selection: D } = M, { $from: P } = D;
      if (P.parentOffset === 0) return;
      const R = P.parent.textBetween(0, P.parentOffset, void 0, "￼");
      if (!R.endsWith("/")) return;
      const L = R.length > 1 ? R.slice(-2, -1) : "";
      if (L && L !== " " && L !== `
`) return;
      b.current = P.pos - 1;
      const $ = Ka(e);
      $ && (c($), n(!0), r(""), a(0));
    };
    return e.on("update", C), () => {
      e.off("update", C);
    };
  }, [e]), q(() => {
    if (!e || !t) return;
    const C = e.view.dom, M = (D) => {
      v.current && (D.key === "ArrowDown" ? (D.preventDefault(), D.stopPropagation(), a((P) => (P + 1) % N.length)) : D.key === "ArrowUp" ? (D.preventDefault(), D.stopPropagation(), a((P) => (P - 1 + N.length) % N.length)) : D.key === "Enter" ? (D.preventDefault(), D.stopPropagation(), w(s)) : D.key === "Escape" && (D.preventDefault(), D.stopPropagation(), k()));
    };
    return C.addEventListener("keydown", M, !0), () => {
      C.removeEventListener("keydown", M, !0);
    };
  }, [e, t, s, N, w, k]), q(() => {
    if (!e || !t) return;
    const C = () => {
      if (!v.current || b.current < 0) return;
      const { state: M } = e, { selection: D } = M, P = D.from, R = b.current;
      if (P <= R) {
        k();
        return;
      }
      try {
        const L = M.doc.textBetween(R + 1, P, void 0, "￼");
        if (L.includes(`
`)) {
          k();
          return;
        }
        r(L), a(0);
        const $ = Ka(e);
        $ && c($);
      } catch {
        k();
      }
    };
    return e.on("update", C), e.on("selectionUpdate", C), () => {
      e.off("update", C), e.off("selectionUpdate", C);
    };
  }, [e, t, k]), q(() => {
    if (!t) return;
    const C = (M) => {
      p.current && !p.current.contains(M.target) && k();
    };
    return document.addEventListener("mousedown", C), () => document.removeEventListener("mousedown", C);
  }, [t, k]), q(() => {
    t && N.length === 0 && o.length > 2 && k();
  }, [t, N.length, o, k]), q(() => {
    s >= N.length && a(Math.max(0, N.length - 1));
  }, [N.length, s]), q(() => {
    if (!t || !p.current) return;
    const C = p.current.querySelector(".slash-item.is-selected");
    C && C.scrollIntoView({ block: "nearest" });
  }, [t, s]), l ? /* @__PURE__ */ m(
    bc,
    {
      isOpen: l,
      onClose: () => u(!1),
      onInsert: S,
      position: d
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 530,
      columnNumber: 7
    },
    this
  ) : !t || N.length === 0 ? null : /* @__PURE__ */ m(Nt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: p,
      className: `slash-menu ${h === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: N.map((C, M) => /* @__PURE__ */ m(
        "div",
        {
          className: `slash-item ${M === s ? "is-selected" : ""}`,
          onClick: (D) => {
            D.preventDefault(), D.stopPropagation(), w(M);
          },
          onMouseEnter: () => a(M),
          children: [
            /* @__PURE__ */ m("span", { className: "slash-icon", children: C.icon }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
              lineNumber: 569,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m("span", { className: "slash-label", children: C.title }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
              lineNumber: 570,
              columnNumber: 11
            }, this)
          ]
        },
        C.title,
        !0,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
          lineNumber: 559,
          columnNumber: 9
        },
        this
      ))
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 549,
      columnNumber: 5
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/SlashCommands.tsx",
    lineNumber: 548,
    columnNumber: 5
  }, this);
}
const Zx = 340, Qx = 36, Jx = 8, ew = 240, Bo = 8;
function Ga(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const r = t.getRangeAt(0), s = r.getBoundingClientRect();
      if (s.width === 0 && s.height === 0 && s.top === 0) {
        const a = document.createElement("span");
        a.textContent = "​", r.cloneRange().insertNode(a);
        const c = a.getBoundingClientRect(), l = { top: c.top, bottom: c.bottom, left: c.left };
        return a.parentNode?.removeChild(a), t.removeAllRanges(), t.addRange(r), l;
      }
      return { top: s.top, bottom: s.bottom, left: s.left };
    }
    const n = e.state.selection.from, o = e.view.coordsAtPos(n);
    return { top: o.top, bottom: o.bottom, left: o.left };
  } catch {
    return null;
  }
}
function tw({ editor: e, onSearch: t, onCreateItem: n }) {
  const [o, r] = Y(!1), [s, a] = Y(""), [i, c] = Y([]), [l, u] = Y(0), [d, f] = Y(null), [h, g] = Y("below"), [p, b] = Y(!1), v = j(!1), N = j(null), y = j(-1), E = j(null);
  q(() => {
    v.current = o;
  }, [o]);
  const k = H(() => {
    r(!1), a(""), c([]), u(0), y.current = -1;
  }, []), w = H((D) => {
    const P = y.current;
    if (P < 0) return;
    const { state: R } = e, L = R.selection.from;
    try {
      const $ = R.tr.delete(P, L), O = R.schema.marks.wikiLink;
      if (O) {
        const K = O.create({ pageName: D }), I = R.schema.text(D, [K]);
        $.insert(P, I);
        const A = P + D.length;
        $.setSelection(Ge.create($.doc, A)), $.removeStoredMark(O);
      } else
        $.insertText(`[[${D}]]`, P);
      e.view.dispatch($), e.view.focus();
    } catch ($) {
      console.warn("WikiLinkAutocomplete: Error inserting link", $);
    }
    k();
  }, [e, k]);
  q(() => {
    if (!e) return;
    const D = () => {
      if (v.current) return;
      const { state: P } = e, { selection: R } = P, { $from: L } = R;
      if (L.parentOffset < 2 || !L.parent.textBetween(0, L.parentOffset, void 0, "￼").endsWith("[[")) return;
      y.current = L.pos - 2;
      const O = Ga(e);
      O && (f(O), r(!0), a(""), c([]), u(0));
    };
    return e.on("update", D), () => {
      e.off("update", D);
    };
  }, [e]), q(() => {
    if (!e || !o) return;
    const D = e.view.dom, P = (R) => {
      if (v.current) {
        if (R.key === "ArrowDown") {
          R.preventDefault();
          const L = i.length + (s.trim() ? 1 : 0) - 1;
          u(($) => Math.min($ + 1, L));
          return;
        }
        if (R.key === "ArrowUp") {
          R.preventDefault(), u((L) => Math.max(L - 1, 0));
          return;
        }
        if (R.key === "Enter" || R.key === "Tab") {
          R.preventDefault(), R.stopPropagation(), l < i.length ? w(i[l].title) : s.trim() && n ? (n(s.trim()), k()) : s.trim() && w(s.trim());
          return;
        }
        if (R.key === "Escape") {
          R.preventDefault(), k();
          return;
        }
        R.key === "]" && setTimeout(() => {
          const { state: L } = e, { $from: $ } = L.selection;
          $.parent.textBetween(0, $.parentOffset, void 0, "￼").endsWith("]]") && k();
        }, 0);
      }
    };
    return D.addEventListener("keydown", P, !0), () => {
      D.removeEventListener("keydown", P, !0);
    };
  }, [e, o, i, l, s, w, k, n]), q(() => {
    if (!e || !o) return;
    const D = () => {
      const P = y.current;
      if (P < 0) {
        k();
        return;
      }
      const { state: R } = e, L = R.selection.from;
      if (L <= P) {
        k();
        return;
      }
      try {
        const $ = R.doc.textBetween(P + 2, L, void 0, "￼");
        if ($.includes(`
`) || $.includes("]]")) {
          k();
          return;
        }
        a($), u(0);
        const O = Ga(e);
        O && f(O);
      } catch {
        k();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, o, k]), q(() => {
    if (o) {
      if (E.current && clearTimeout(E.current), !s.trim()) {
        b(!0), E.current = setTimeout(async () => {
          try {
            const D = await t("");
            c(D);
          } catch {
            c([]);
          }
          b(!1);
        }, 100);
        return;
      }
      return b(!0), E.current = setTimeout(async () => {
        try {
          const D = await t(s.trim());
          c(D);
        } catch {
          c([]);
        }
        b(!1);
      }, 150), () => {
        E.current && clearTimeout(E.current);
      };
    }
  }, [o, s, t]), q(() => {
    if (!o) return;
    const D = (P) => {
      N.current && !N.current.contains(P.target) && k();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [o, k]), q(() => {
    if (!o || !N.current) return;
    const D = N.current.querySelector(".wikilink-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [o, l]);
  const S = i.length + (s.trim() ? 1 : 0), x = Math.min(
    Math.max(S, 1) * Qx + Jx,
    ew
  );
  if (rr(() => {
    if (!o || !d) return;
    const { top: D, bottom: P, left: R } = d, L = window.innerHeight, $ = window.innerWidth, O = L - P - Bo, K = D - Bo;
    let I;
    if (O >= x ? I = "below" : K >= x ? I = "above" : I = O >= K ? "below" : "above", g(I), N.current) {
      const A = Math.max(
        Bo,
        Math.min(R, $ - Zx - Bo)
      ), _ = I === "below" ? P + 4 : D - x - 4;
      N.current.style.top = `${_}px`, N.current.style.left = `${A}px`;
    }
  }, [o, d, x, S]), !o) return null;
  const C = s.trim() && !i.some((D) => D.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ m(Nt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: N,
      className: `wikilink-menu ${h === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: [
        p && i.length === 0 && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 366,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 365,
          columnNumber: 9
        }, this),
        i.map((D, P) => /* @__PURE__ */ m(
          "div",
          {
            className: `wikilink-item ${P === l ? "is-selected" : ""}`,
            onMouseDown: (R) => {
              R.preventDefault(), w(D.title);
            },
            onMouseEnter: () => u(P),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Us, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 380,
                columnNumber: 13
              }, this) }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 379,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: D.title }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 382,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-type", children: D.type }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 383,
                columnNumber: 11
              }, this)
            ]
          },
          D.id,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 370,
            columnNumber: 9
          },
          this
        )),
        C && /* @__PURE__ */ m(
          "div",
          {
            className: `wikilink-item wikilink-create ${i.length === l ? "is-selected" : ""}`,
            onMouseDown: (D) => {
              D.preventDefault(), n ? (n(s.trim()), k()) : w(s.trim());
            },
            onMouseEnter: () => u(i.length),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Fs, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 401,
                columnNumber: 13
              }, this) }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 400,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: [
                "Create “",
                s.trim(),
                "”"
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 403,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 387,
            columnNumber: 9
          },
          this
        ),
        !p && i.length === 0 && !s.trim() && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 408,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 407,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
      lineNumber: 355,
      columnNumber: 5
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WikiLinkAutocomplete.tsx",
    lineNumber: 354,
    columnNumber: 5
  }, this);
}
function nw({
  src: e,
  alt: t,
  position: n,
  onSave: o,
  onDelete: r,
  onClose: s
}) {
  const [a, i] = Y(e), [c, l] = Y(t), u = j(null), d = j(null);
  q(() => {
    d.current?.focus(), d.current?.select();
  }, []), q(() => {
    const b = (N) => {
      u.current && !u.current.contains(N.target) && s();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", b);
    };
  }, [s]), q(() => {
    const b = (v) => {
      v.key === "Escape" ? s() : v.key === "Enter" && (v.metaKey || v.ctrlKey) && f();
    };
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, [a, c, s]);
  const f = () => {
    a.trim() && o(a.trim(), c.trim());
  }, g = (() => {
    let y = n.x - 160, E = n.y + 10;
    return y + 320 > window.innerWidth - 16 && (y = window.innerWidth - 320 - 16), y < 16 && (y = 16), E + 280 > window.innerHeight - 16 && (E = n.y - 280 - 10), E < 16 && (E = 16), { left: y, top: E };
  })(), p = /* @__PURE__ */ m(
    "div",
    {
      ref: u,
      className: "image-edit-popover",
      style: {
        position: "fixed",
        left: g.left,
        top: g.top
      },
      children: [
        /* @__PURE__ */ m("div", { className: "image-edit-popover-header", children: [
          /* @__PURE__ */ m("span", { className: "image-edit-popover-title", children: "Edit Image" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 140,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: s,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(pt, { className: "w-4 h-4" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 146,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 141,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 139,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ m("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ m("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(Ls, { className: "w-3.5 h-3.5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 155,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { children: "Image URL" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 156,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 154,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                ref: d,
                type: "text",
                value: a,
                onChange: (b) => i(b.target.value),
                placeholder: "https://example.com/image.jpg",
                className: "image-edit-popover-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 158,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 153,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ m("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(sr, { className: "w-3.5 h-3.5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 171,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { children: "Alt Text" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 172,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 170,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                type: "text",
                value: c,
                onChange: (b) => l(b.target.value),
                placeholder: "Describe the image...",
                className: "image-edit-popover-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 174,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 169,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 151,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("div", { className: "image-edit-popover-footer", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: r,
              className: "image-edit-popover-btn image-edit-popover-btn-delete",
              title: "Delete image",
              children: /* @__PURE__ */ m(sn, { className: "w-4 h-4" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 191,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 186,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ m(
              "button",
              {
                onClick: s,
                className: "image-edit-popover-btn image-edit-popover-btn-cancel",
                children: "Cancel"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 194,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ m(
              "button",
              {
                onClick: f,
                className: "image-edit-popover-btn image-edit-popover-btn-save",
                disabled: !a.trim(),
                children: [
                  /* @__PURE__ */ m(yn, { className: "w-4 h-4" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
                    lineNumber: 205,
                    columnNumber: 13
                  }, this),
                  "Save"
                ]
              },
              void 0,
              !0,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 200,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 193,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 185,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
      lineNumber: 129,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { children: p }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageEditPopover.tsx",
    lineNumber: 213,
    columnNumber: 10
  }, this);
}
function ow({ containerRef: e, enabled: t = !0 }) {
  const [n, o] = Y(!1), [r, s] = Y(0), a = H((u) => {
    u.preventDefault(), u.stopPropagation(), u.dataTransfer?.types.includes("Files") && (s((d) => d + 1), o(!0));
  }, []), i = H((u) => {
    u.preventDefault(), u.stopPropagation(), s((d) => {
      const f = d - 1;
      return f === 0 && o(!1), f;
    });
  }, []), c = H((u) => {
    u.preventDefault(), u.stopPropagation();
  }, []), l = H((u) => {
    u.preventDefault(), u.stopPropagation(), o(!1), s(0);
  }, []);
  return q(() => {
    if (!t || !e.current) return;
    const u = e.current;
    return u.addEventListener("dragenter", a), u.addEventListener("dragleave", i), u.addEventListener("dragover", c), u.addEventListener("drop", l), () => {
      u.removeEventListener("dragenter", a), u.removeEventListener("dragleave", i), u.removeEventListener("dragover", c), u.removeEventListener("drop", l);
    };
  }, [t, e, a, i, c, l]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ m("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(mm, { className: "w-12 h-12" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 84,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ m("span", { className: "image-drop-zone-title", children: "Drop image here" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageDropZone.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageDropZone.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 86,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageDropZone.tsx",
    lineNumber: 82,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ImageDropZone.tsx",
    lineNumber: 81,
    columnNumber: 5
  }, this) : null;
}
const rw = {
  SpellCheck: hm,
  RefreshCw: fm,
  Minimize2: mc,
  Maximize2: dc,
  FileText: Us,
  MessageSquare: fc,
  Sparkles: ir
};
function sw({ actions: e, scope: t, onAction: n, onClose: o, position: r }) {
  const [s, a] = Y(""), [i, c] = Y(!1), l = j(null), u = j(null), d = e.filter((b) => b.scope === t || b.scope === "both");
  q(() => {
    const b = (N) => {
      l.current && !l.current.contains(N.target) && o();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 50);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", b);
    };
  }, [o]), q(() => {
    const b = (v) => {
      v.key === "Escape" && o();
    };
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, [o]), q(() => {
    i && u.current && u.current.focus();
  }, [i]);
  const h = H(() => {
    const v = d.length * 40 + (i ? 56 : 0) + 16, N = window.innerWidth, y = window.innerHeight;
    let E = r.top, k = r.left;
    return k + 260 > N - 8 && (k = N - 260 - 8), k < 8 && (k = 8), E + v > y - 8 && (E = r.top - v - 8), E < 8 && (E = 8), { top: E, left: k };
  }, [r, d.length, i])(), g = () => {
    s.trim() && (n("custom", s.trim()), a(""), c(!1));
  }, p = /* @__PURE__ */ m(
    "div",
    {
      ref: l,
      className: "ai-dropdown-menu",
      style: {
        position: "fixed",
        top: h.top,
        left: h.left
      },
      children: /* @__PURE__ */ m(
        "div",
        {
          className: `
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-lg overflow-hidden
          w-[260px] py-1
          animate-in fade-in-0 zoom-in-95 duration-100
        `,
          children: [
            /* @__PURE__ */ m("div", { className: "px-2 py-1.5", children: /* @__PURE__ */ m("div", { className: "flex items-center gap-2 bg-secondary/50 rounded-md px-2.5 py-1.5 border border-border/50", children: [
              /* @__PURE__ */ m(fc, { size: 14, className: "text-muted-foreground shrink-0" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIDropdownMenu.tsx",
                lineNumber: 142,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m(
                "input",
                {
                  ref: u,
                  type: "text",
                  placeholder: "Modify with prompt…",
                  value: s,
                  onChange: (b) => a(b.target.value),
                  onKeyDown: (b) => {
                    b.key === "Enter" && (b.preventDefault(), g()), b.stopPropagation();
                  },
                  onFocus: () => c(!0),
                  className: `
                flex-1 bg-transparent text-sm text-foreground
                placeholder:text-muted-foreground
                outline-none min-w-0
              `
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIDropdownMenu.tsx",
                  lineNumber: 143,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 141,
              columnNumber: 11
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 140,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ m("div", { className: "h-px bg-border mx-2 my-0.5" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 167,
              columnNumber: 9
            }, this),
            d.filter((b) => !b.showCustomPrompt).map((b) => {
              const v = b.icon ? rw[b.icon] : ir;
              return /* @__PURE__ */ m(
                "button",
                {
                  className: `
                  flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left
                  hover:bg-secondary/80 transition-colors duration-75
                  text-foreground
                `,
                  onMouseDown: (N) => {
                    N.preventDefault(), n(b.id);
                  },
                  children: [
                    v && /* @__PURE__ */ m(v, { size: 15, className: "text-muted-foreground shrink-0" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIDropdownMenu.tsx",
                      lineNumber: 187,
                      columnNumber: 35
                    }, this),
                    /* @__PURE__ */ m("span", { children: b.label }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIDropdownMenu.tsx",
                      lineNumber: 188,
                      columnNumber: 17
                    }, this)
                  ]
                },
                b.id,
                !0,
                {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIDropdownMenu.tsx",
                  lineNumber: 175,
                  columnNumber: 15
                },
                this
              );
            })
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIDropdownMenu.tsx",
          lineNumber: 131,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIDropdownMenu.tsx",
      lineNumber: 122,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { onMouseDown: (b) => b.preventDefault(), children: p }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIDropdownMenu.tsx",
    lineNumber: 197,
    columnNumber: 5
  }, this);
}
function iw({
  state: e,
  position: t,
  onReplace: n,
  onInsert: o,
  onRetry: r,
  onDiscard: s
}) {
  const a = j(null), i = j(null), [c, l] = Y(!1), [u, d] = Y(0);
  q(() => {
    if (a.current) {
      const k = new ResizeObserver((w) => {
        for (const S of w)
          d(S.contentRect.height);
      });
      return k.observe(a.current), () => k.disconnect();
    }
  }, []), q(() => {
    i.current && e.status === "streaming" && (i.current.scrollTop = i.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), q(() => {
    const k = (w) => {
      w.key === "Escape" && s();
    };
    return document.addEventListener("keydown", k), () => document.removeEventListener("keydown", k);
  }, [s]);
  const f = zt(() => {
    const x = window.innerWidth, C = window.innerHeight;
    let M = t.selectionCenterX - 380 / 2;
    M + 380 > x - 8 && (M = x - 380 - 8), M < 8 && (M = 8);
    const D = C - t.selectionBottom - 8, P = t.selectionTop - 8, R = u || 200;
    let L, $ = !1;
    return D >= R || D >= P ? L = t.selectionBottom + 8 : (L = t.selectionTop - 8 - R, $ = !0), L < 8 && (L = 8), L + R > C - 8 && (L = C - R - 8), { top: L, left: M, placedAbove: $ };
  }, [t, u]), h = e.status === "streaming" || e.status === "complete" ? e.result : "", g = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", p = e.status === "streaming", b = e.status === "complete", v = e.status === "error", N = H(() => {
    navigator.clipboard.writeText(h), l(!0), setTimeout(() => l(!1), 1500);
  }, [h]);
  if (e.status === "idle") return null;
  const y = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", E = /* @__PURE__ */ m(
    "div",
    {
      ref: a,
      className: "ai-result-popover",
      style: {
        position: "fixed",
        top: f.top,
        left: f.left
      },
      children: /* @__PURE__ */ m(
        "div",
        {
          className: `
          bg-popover text-popover-foreground border border-border
          rounded-lg shadow-xl overflow-hidden
          w-[380px] max-w-[calc(100vw-16px)]
          ${y}
        `,
          children: [
            /* @__PURE__ */ m("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30", children: [
              /* @__PURE__ */ m("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                p && /* @__PURE__ */ m(uc, { size: 12, className: "animate-spin" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 173,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ m("span", { className: "font-medium", children: v ? "Error" : g }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 174,
                  columnNumber: 13
                }, this),
                p && /* @__PURE__ */ m("span", { className: "opacity-60", children: "Generating…" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 177,
                  columnNumber: 29
                }, this)
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 172,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (k) => {
                    k.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ m(pt, { size: 14, className: "text-muted-foreground" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 184,
                    columnNumber: 13
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 179,
                  columnNumber: 11
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
              lineNumber: 171,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ m(
              "div",
              {
                ref: i,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: v ? /* @__PURE__ */ m("div", { className: "text-destructive", children: e.message }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 194,
                  columnNumber: 13
                }, this) : /* @__PURE__ */ m("div", { className: "whitespace-pre-wrap", children: [
                  h,
                  p && /* @__PURE__ */ m("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 201,
                    columnNumber: 17
                  }, this)
                ] }, void 0, !0, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 198,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 189,
                columnNumber: 9
              },
              this
            ),
            /* @__PURE__ */ m("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (b || v) && /* @__PURE__ */ m(Ce, { children: [
                b && /* @__PURE__ */ m(Ce, { children: [
                  /* @__PURE__ */ m(
                    on,
                    {
                      icon: ss,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 213,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ m(
                    on,
                    {
                      icon: Fs,
                      label: "Insert",
                      onClick: o
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 219,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ m(
                    on,
                    {
                      icon: c ? yn : Nn,
                      label: c ? "Copied" : "Copy",
                      onClick: N
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 224,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 212,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ m(
                  on,
                  {
                    icon: zs,
                    label: "Retry",
                    onClick: r
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 231,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ m("div", { className: "flex-1" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 236,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ m(
                  on,
                  {
                    icon: pt,
                    label: "Discard",
                    onClick: s
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 237,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 210,
                columnNumber: 13
              }, this),
              p && /* @__PURE__ */ m(Ce, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 246,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ m(
                  on,
                  {
                    icon: pt,
                    label: "Stop",
                    onClick: s
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 247,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 245,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
              lineNumber: 208,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 162,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
      lineNumber: 153,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { onMouseDown: (k) => k.preventDefault(), children: E }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
    lineNumber: 260,
    columnNumber: 5
  }, this);
}
function on({
  icon: e,
  label: t,
  onClick: n,
  primary: o = !1
}) {
  return /* @__PURE__ */ m(
    "button",
    {
      className: `
        flex items-center gap-1 px-2 py-1 rounded text-xs font-medium
        transition-colors duration-75
        ${o ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}
      `,
      onMouseDown: (r) => {
        r.preventDefault(), n();
      },
      children: [
        /* @__PURE__ */ m(e, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 291,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("span", { children: t }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 292,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ai/AIResultPopover.tsx",
      lineNumber: 280,
      columnNumber: 5
    },
    this
  );
}
function aw({
  editor: e,
  isMobile: t,
  disabledFeatures: n,
  containerRef: o,
  editable: r,
  showFloatingToolbar: s,
  isLinkPopoverOpen: a,
  aiEnabled: i,
  onAISetupRequired: c,
  onAISparklesClick: l,
  aiDropdown: u,
  aiActions: d,
  onAIActionSelect: f,
  onAIDropdownClose: h,
  aiState: g,
  aiPopoverPosition: p,
  onAIReplace: b,
  onAIInsert: v,
  onAIRetry: N,
  onAIDiscard: y,
  onLinkPopoverClose: E,
  onEditLink: k,
  onWikiLinkSearch: w,
  imageEditState: S,
  onImageSave: x,
  onImageDelete: C,
  onImageEditClose: M
}) {
  return /* @__PURE__ */ m(Ce, { children: [
    !n.images && !n.dragAndDrop && /* @__PURE__ */ m(ow, { containerRef: o, enabled: r }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 112,
      columnNumber: 9
    }, this),
    !t && s && /* @__PURE__ */ m(
      zx,
      {
        editor: e,
        suppressWhenLinkPopoverOpen: a,
        aiEnabled: i || !!c,
        onAISparklesClick: (D) => l(D)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 117,
        columnNumber: 9
      },
      this
    ),
    u && d && /* @__PURE__ */ m(
      sw,
      {
        actions: d,
        scope: u.scope,
        position: u.position,
        onAction: f,
        onClose: h
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 127,
        columnNumber: 9
      },
      this
    ),
    g.status !== "idle" && /* @__PURE__ */ m(
      iw,
      {
        state: g,
        position: p,
        onReplace: b,
        onInsert: v,
        onRetry: N,
        onDiscard: y
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 138,
        columnNumber: 9
      },
      this
    ),
    !n.slashCommands && /* @__PURE__ */ m(Xx, { editor: e, disabledFeatures: n }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 150,
      columnNumber: 9
    }, this),
    !n.wikiLinks && w && /* @__PURE__ */ m(tw, { editor: e, onSearch: w }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 155,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m(
      Ux,
      {
        editor: e,
        isOpen: a,
        onClose: E
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 159,
        columnNumber: 7
      },
      this
    ),
    !t && /* @__PURE__ */ m(Yx, { editor: e, onEditLink: k }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 167,
      columnNumber: 9
    }, this),
    !n.images && S?.isOpen && /* @__PURE__ */ m(
      nw,
      {
        src: S.src,
        alt: S.alt,
        position: S.position,
        onSave: x,
        onDelete: C,
        onClose: M
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 172,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/WYSIWYGOverlays.tsx",
    lineNumber: 109,
    columnNumber: 5
  }, this);
}
function cw({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function lw(e, t) {
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
function uw(e) {
  const [t, n] = Ad(lw, { status: "idle" }), o = j(null), r = H(async (i, c, l, u, d) => {
    if (e) {
      n({
        type: "start-streaming",
        action: i,
        actionLabel: c,
        inputText: l,
        selectionRange: u
      });
      try {
        const f = e(i, l, d);
        if (Symbol.asyncIterator in Object(f))
          for await (const h of f)
            n({ type: "append-chunk", text: h });
        else {
          const h = await f;
          n({ type: "append-chunk", text: h });
        }
        n({ type: "complete" });
      } catch (f) {
        if (f instanceof DOMException && f.name === "AbortError") {
          n({ type: "reset" });
          return;
        }
        const h = f instanceof Error ? f.message : "AI action failed";
        n({ type: "error", message: h });
      }
    }
  }, [e]), s = H(() => {
    o.current?.(), n({ type: "reset" });
  }, []), a = H(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: r, abort: s, reset: a };
}
const Ku = "paragon-editor-toc-width", dw = 280, Gu = 200, qu = 500;
function qa() {
  try {
    const e = localStorage.getItem(Ku);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= Gu && t <= qu)
        return t;
    }
  } catch {
  }
  return dw;
}
function mw(e) {
  try {
    localStorage.setItem(Ku, String(e));
  } catch {
  }
}
function fw(e, t, n) {
  const o = [];
  return e.state.doc.descendants((s, a) => {
    if (s.type.name === "heading") {
      const i = s.attrs.level;
      if (i >= t && i <= n) {
        const c = s.textContent;
        c.trim() && o.push({ id: `toc-heading-${a}`, text: c.trim(), level: i, pos: a });
      }
    }
  }), o;
}
function hw(e) {
  if (e.length === 0) return [];
  const t = [], n = [];
  for (const o of e) {
    const r = { ...o, children: [] };
    for (; n.length > 0 && n[n.length - 1].level >= o.level; )
      n.pop();
    if (n.length === 0)
      t.push(r);
    else {
      const s = n[n.length - 1].item;
      s.children || (s.children = []), s.children.push(r);
    }
    n.push({ item: r, level: o.level });
  }
  return t;
}
function Xa(e, t) {
  try {
    const n = e.state.doc.resolve(t), o = e.view.nodeDOM(n.before(n.depth + 1));
    if (o instanceof HTMLElement) return o;
    const r = e.view.nodeDOM(t);
    if (r instanceof HTMLElement) return r;
  } catch {
  }
  return null;
}
const Za = vn(function({
  editor: t,
  visible: n = !0,
  onVisibilityChange: o,
  title: r = "",
  minLevel: s = 1,
  maxLevel: a = 4,
  showLevelIndicators: i = !1,
  highlightActive: c = !0,
  treeView: l = !1,
  className: u = "",
  width: d,
  position: f = "right",
  scrollOffset: h = 20,
  onItemClick: g,
  renderItem: p,
  showToggleButton: b = !0,
  scrollContainerRef: v
}) {
  const [N, y] = Y([]), [E, k] = Y(null), [w, S] = Y(n), [x, C] = Y(/* @__PURE__ */ new Set()), [M, D] = Y(() => {
    if (d) {
      const W = parseInt(d, 10);
      return isNaN(W) ? qa() : W;
    }
    return qa();
  }), P = j(null), R = j(null), L = j(!1), $ = j(0), O = j(0);
  q(() => {
    S(n);
  }, [n]);
  const K = H((W) => {
    W.preventDefault(), W.stopPropagation(), L.current = !0, $.current = W.clientX, O.current = M, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [M]);
  q(() => {
    const W = (Z) => {
      if (!L.current) return;
      const le = f === "right" ? $.current - Z.clientX : Z.clientX - $.current, ue = Math.min(qu, Math.max(Gu, O.current + le));
      D(ue);
    }, z = () => {
      L.current && (L.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", D((Z) => (mw(Z), Z)));
    };
    return document.addEventListener("mousemove", W), document.addEventListener("mouseup", z), () => {
      document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", z);
    };
  }, [f]);
  const I = H(() => {
    if (!t || t.isDestroyed) return;
    const W = fw(t, s, a);
    y(W), E && !W.find((z) => z.id === E) && k(null);
  }, [t, s, a, E]);
  q(() => {
    if (!t) return;
    const W = () => {
      R.current && clearTimeout(R.current), R.current = setTimeout(() => I(), 300);
    };
    return I(), t.on("update", W), t.on("create", W), () => {
      t.off("update", W), t.off("create", W), R.current && clearTimeout(R.current);
    };
  }, [t, I]), q(() => {
    if (!t || !c || !w || N.length === 0) return;
    const W = v?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!W) return;
    const z = () => {
      const ue = W.getBoundingClientRect();
      let ve = null;
      for (let Ee = N.length - 1; Ee >= 0; Ee--) {
        const He = N[Ee], yt = Xa(t, He.pos);
        if (yt && yt.getBoundingClientRect().top - ue.top <= h + 10) {
          ve = He.id;
          break;
        }
      }
      !ve && N.length > 0 && (ve = N[0].id), k(ve);
    };
    let Z;
    const le = () => {
      cancelAnimationFrame(Z), Z = requestAnimationFrame(z);
    };
    return W.addEventListener("scroll", le, { passive: !0 }), z(), () => {
      W.removeEventListener("scroll", le), cancelAnimationFrame(Z);
    };
  }, [t, N, c, w, h, v]);
  const A = H((W) => {
    if (!t || t.isDestroyed) return;
    const z = Xa(t, W.pos);
    if (z) {
      const Z = v?.current || t.view.dom.closest(".editor-content-wrapper");
      if (Z) {
        const le = Z.getBoundingClientRect(), ve = z.getBoundingClientRect().top - le.top + Z.scrollTop;
        Z.scrollTo({ top: ve - h, behavior: "smooth" });
      } else
        z.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(W.pos + 1);
    } catch {
    }
    k(W.id), g?.(W);
  }, [t, h, g, v]), _ = H(() => {
    const W = !w;
    S(W), o?.(W);
  }, [w, o]), U = H((W) => {
    C((z) => {
      const Z = new Set(z);
      return Z.has(W) ? Z.delete(W) : Z.add(W), Z;
    });
  }, []), V = H((W, z, Z = 0) => {
    if (p)
      return p(W, z, () => A(W));
    const le = (W.level - s) * 14, ue = l && W.children && W.children.length > 0, ve = x.has(W.id);
    return /* @__PURE__ */ m(
      "div",
      {
        className: `toc-item ${z ? "toc-item-active" : ""} toc-level-${W.level}`,
        style: { paddingLeft: `${le + 10}px` },
        children: /* @__PURE__ */ m(
          "button",
          {
            className: "toc-item-button",
            onClick: () => A(W),
            title: W.text,
            children: [
              ue && /* @__PURE__ */ m(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (Ee) => {
                    Ee.stopPropagation(), U(W.id);
                  },
                  children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: ve ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 340,
                    columnNumber: 21
                  }, this) : /* @__PURE__ */ m("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 341,
                    columnNumber: 21
                  }, this) }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 338,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
                  lineNumber: 331,
                  columnNumber: 13
                },
                this
              ),
              i && /* @__PURE__ */ m("span", { className: "toc-level-indicator", children: [
                "H",
                W.level
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 347,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "toc-item-text", children: W.text }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 349,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 325,
            columnNumber: 9
          },
          this
        )
      },
      W.id,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 320,
        columnNumber: 7
      },
      this
    );
  }, [p, A, l, s, i, x, U]), G = H((W, z = 0) => W.map((Z) => {
    const le = E === Z.id, ue = x.has(Z.id), ve = Z.children && Z.children.length > 0;
    return /* @__PURE__ */ m("div", { children: [
      V(Z, le, z),
      ve && !ue && /* @__PURE__ */ m("div", { className: "toc-children", children: G(Z.children, z + 1) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 364,
        columnNumber: 13
      }, this)
    ] }, Z.id, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
      lineNumber: 361,
      columnNumber: 9
    }, this);
  }), [E, x, V]), Q = H(() => N.map((W) => {
    const z = E === W.id;
    return V(W, z);
  }), [N, E, V]);
  if (!t) return null;
  const B = l ? hw(N) : [];
  return /* @__PURE__ */ m(Ce, { children: [
    b && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: _,
        title: w ? "Hide Table of Contents" : "Show Table of Contents",
        children: w ? /* @__PURE__ */ m(pm, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 393,
          columnNumber: 24
        }, this) : /* @__PURE__ */ m(gm, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 393,
          columnNumber: 56
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 388,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m(
      "div",
      {
        ref: P,
        className: `toc-sidebar ${w ? "toc-visible" : "toc-hidden"} toc-${f} ${u}`,
        style: { width: w ? `${M}px` : "0px" },
        children: [
          w && /* @__PURE__ */ m(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: K
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 405,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m("div", { className: "toc-inner", children: [
            r && /* @__PURE__ */ m("div", { className: "toc-header", children: /* @__PURE__ */ m("span", { className: "toc-title", children: r }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 415,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 414,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m("div", { className: "toc-content toc-content-with-toggle", children: N.length === 0 ? /* @__PURE__ */ m("div", { className: "toc-empty", children: [
              /* @__PURE__ */ m("p", { children: "No headings yet" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 423,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ m("p", { className: "toc-empty-hint", children: "Add headings to see the outline." }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 424,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 422,
              columnNumber: 15
            }, this) : /* @__PURE__ */ m("div", { className: "toc-list", children: l ? G(B) : Q() }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 427,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 420,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 411,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 398,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/TableOfContents.tsx",
    lineNumber: 385,
    columnNumber: 5
  }, this);
}), pw = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, u1 = Pd(function({
  content: t = "",
  onChange: n,
  onHTMLChange: o,
  onMarkdownChange: r,
  placeholder: s = 'Start writing... Use "/" for commands',
  editable: a = !0,
  autofocus: i = !1,
  className: c = "",
  showToolbar: l = !0,
  showWordCount: u = !0,
  theme: d,
  colorTheme: f = "colorful",
  autoSave: h = !0,
  autoSaveKey: g = "paragon-editor-content",
  autoSaveDelay: p = 1e3,
  showRecoveryBanner: b = !0,
  showFloatingToolbar: v = !0,
  maxImageSize: N = 5 * 1024 * 1024,
  onImageUploadStart: y,
  onImageUploadComplete: E,
  onImageUploadError: k,
  onImageUpload: w,
  resolveImageSrc: S,
  showModeToggle: x = !0,
  // New props
  initialMode: C = "wysiwyg",
  onModeChange: M,
  onReady: D,
  onFocus: P,
  onBlur: R,
  onSelectionChange: L,
  onDestroy: $,
  onSave: O,
  onRecover: K,
  onWikiLinkClick: I,
  validateWikiLink: A,
  onWikiLinkSearch: _,
  onLinkClick: U,
  findReplaceOpen: V,
  onFindReplaceChange: G,
  renderToolbar: Q,
  renderFooter: B,
  disabledFeatures: W = {},
  minHeight: z = "200px",
  maxHeight: Z,
  spellCheck: le = !0,
  headingLevels: ue = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: ve = [1, 2, 3],
  // TOC props
  showTableOfContents: Ee = !1,
  tocVisible: He = !0,
  onTocVisibilityChange: yt,
  tocTitle: Mn = "",
  tocMinLevel: Dn = 1,
  tocMaxLevel: ro = 4,
  tocShowLevelIndicators: so = !1,
  tocHighlightActive: io = !0,
  tocTreeView: ao = !1,
  tocWidth: co = "240px",
  tocPosition: Rt = "right",
  tocScrollOffset: Kt = 20,
  onTocItemClick: Gt,
  renderTocItem: lo,
  tocShowToggleButton: uo = !0,
  // Raw markdown editor
  autoClosePairs: wr = !0,
  // Performance profiler
  showPerformanceProfiler: Cr = !1,
  onPerformanceProfilerClose: Er,
  // Auto reorder checklist
  autoReorderChecklist: Tr = !1,
  // Expand selection
  progressiveSelectAll: Sr = !1,
  // Auto-detection toggles
  enableTagAutoDetect: mo = !1,
  enableHexColorHighlight: Mr = !1,
  enableCollapsibleHeadings: Dr = !1,
  // Performance mode
  performanceMode: An = "auto",
  // Error boundary
  onEditorError: fo,
  // AI writing assistant
  aiActions: kt,
  onAIAction: oe,
  onAISetupRequired: fe
}, ne) {
  const [me] = Y(() => pw()), [Te, de] = Y(C), [ho, Pn] = Y(""), qt = j(C), xt = j(""), at = j(null), [Qu, Ni] = Y(0), po = !!(kt && kt.length > 0 && oe), { state: Fe, executeAction: go, abort: Ju, reset: wt } = uw(oe), [ed, Ar] = Y(null), [td, nd] = Y({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), od = j(oe);
  od.current = oe;
  const yi = j(fe);
  yi.current = fe;
  const [rd, sd] = Y([]), [id, ad] = Y(0), cd = H((ie, De) => {
    sd(ie), ad(De);
  }, []), ki = j(y), xi = j(E), wi = j(k), Ci = j(w), Ei = j(S), Ti = j(I), Si = j(A), Mi = j(_);
  ki.current = y, xi.current = E, wi.current = k, Ci.current = w, Ei.current = S, Ti.current = I, Si.current = A, Mi.current = _;
  const Di = 2e3, [Pr, ld] = Y(() => An === "lightweight" ? !0 : An === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > Di : !1), ud = j(0), Ai = j(Pr);
  Ai.current = Pr;
  const [Ir, bo] = Y(null), dd = dx({
    placeholder: s,
    isMobile: me,
    maxImageSize: N,
    headingLevels: ue,
    collapsibleHeadingLevels: ve,
    disabledFeatures: W,
    progressiveSelectAll: Sr,
    enableCollapsibleHeadings: Dr,
    enableTagAutoDetect: mo,
    enableHexColorHighlight: Mr,
    isLightweight: Pr,
    setImageEditState: bo,
    callbackRefs: {
      onImageUploadStart: ki,
      onImageUploadComplete: xi,
      onImageUploadError: wi,
      onImageUpload: Ci,
      resolveImageSrc: Ei,
      onWikiLinkClick: Ti,
      validateWikiLink: Si
    }
  }), { editor: ce, turndownService: Pi } = gx({
    extensions: dd,
    content: t,
    editable: a,
    autofocus: i,
    spellCheck: le,
    initialMode: C,
    performanceMode: An,
    lightweightThreshold: Di,
    onChange: n,
    onHTMLChange: o,
    onMarkdownChange: r,
    onReady: D,
    onDestroy: $,
    onFocus: P,
    onBlur: R,
    onSelectionChange: L,
    onLinkClick: U,
    editorModeRef: qt,
    rawMarkdownRef: xt,
    setRawMarkdown: Pn,
    setIsLightweight: ld,
    lightweightCheckCounterRef: ud,
    isLightweightRef: Ai
  }), [md, vo] = Y(!1), [fd, hd] = Y(!1), pd = V !== void 0 ? V : fd, Lt = H((ie) => {
    hd(ie), G?.(ie);
  }, [G]), [gd, No] = Y(0), [bd, vd] = Y(""), Ot = Ev(ce, {
    storageKey: g,
    debounceMs: p,
    enabled: h,
    onSave: (ie) => {
      O?.(ie);
    },
    onRecover: (ie) => {
      K?.(ie);
    }
  }), Rr = Ax({
    editor: ce,
    turndownService: Pi,
    editorModeRef: qt,
    rawMarkdownRef: xt,
    setEditorMode: de,
    setRawMarkdown: Pn,
    onModeChange: M,
    enableTagAutoDetect: mo,
    disabledFeatures: W
  }), Ii = H((ie) => {
    Pn(ie), xt.current = ie, r?.(ie);
  }, [r]), yo = Ix(ce, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: u
  });
  Tv(ne, {
    editor: ce,
    turndownService: Pi,
    editorModeRef: qt,
    handleModeSwitch: Rr,
    wordCount: yo,
    autoSaveState: Ot,
    setIsFindReplaceOpen: Lt,
    setFindReplaceFocusTrigger: No
  }), Dx({
    editorModeRef: qt,
    rawMarkdownRef: xt,
    editorMode: Te,
    handleModeSwitch: Rr,
    setIsFindReplaceOpen: Lt,
    setFindReplaceFocusTrigger: No
  });
  const Nd = zt(() => ({
    openLinkPopover: () => vo(!0),
    openFindReplace: (ie) => {
      ie && vd(ie), Lt(!0), No((De) => De + 1);
    },
    openFindReplaceWithReplace: () => {
      Lt(!0);
    }
  }), [Lt]);
  Mx(ce, me, Nd);
  const Ri = H((ie, De) => {
    if (!po) {
      yi.current?.();
      return;
    }
    if (!ce) return;
    let ct = { top: 0, left: 0 };
    if (De) {
      const je = De.getBoundingClientRect();
      ct = { top: je.bottom + 4, left: je.left };
    } else {
      const { from: je, to: Xt } = ce.state.selection, ko = ce.view.coordsAtPos(je), xo = ce.view.coordsAtPos(Xt);
      ct = { top: xo.bottom + 8, left: (ko.left + xo.left) / 2 };
    }
    Ar({ scope: ie, position: ct });
  }, [po, ce]), yd = H((ie, De) => {
    if (!ce || !kt) return;
    const ct = kt.find((Ed) => Ed.id === ie);
    if (!ct) return;
    const { from: je, to: Xt } = ce.state.selection, ko = je !== Xt ? ce.state.doc.textBetween(je, Xt, `
`) : "", xo = ct.scope === "document" || !ko ? ce.getText() : ko, _i = ce.view.coordsAtPos(je), $i = ce.view.coordsAtPos(Xt);
    nd({
      selectionTop: _i.top,
      selectionBottom: $i.bottom,
      selectionCenterX: (_i.left + $i.right) / 2
    }), Ar(null), go(ie, ct.label, xo, { from: je, to: Xt }, De);
  }, [ce, kt, go]), kd = H(() => {
    if (!ce || Fe.status !== "complete") return;
    const { selectionRange: ie, result: De } = Fe;
    ce.chain().focus().setTextSelection(ie).deleteSelection().insertContent(De).run(), wt();
  }, [ce, Fe, wt]), xd = H(() => {
    if (!ce || Fe.status !== "complete") return;
    const { selectionRange: ie, result: De } = Fe;
    ce.chain().focus().setTextSelection(ie.to).insertContent(`
` + De).run(), wt();
  }, [ce, Fe, wt]), wd = H(() => {
    if (!(Fe.status !== "complete" && Fe.status !== "error"))
      if (Fe.status === "complete") {
        const { action: ie, actionLabel: De, inputText: ct, selectionRange: je } = Fe;
        wt(), go(ie, De, ct, je);
      } else
        wt();
  }, [Fe, wt, go]);
  if (!ce)
    return /* @__PURE__ */ m(Bx, { className: c, theme: d }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 832,
      columnNumber: 12
    }, this);
  const Li = /* @__PURE__ */ m(
    Nv,
    {
      editor: ce,
      onOpenLinkPopover: () => vo(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Lt(!0), No((ie) => ie + 1);
      },
      disabledFeatures: W,
      autoReorderChecklist: Tr,
      aiEnabled: po || !!fe,
      onAISparklesClick: (ie) => Ri("document", ie)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 837,
      columnNumber: 5
    },
    this
  ), Oi = /* @__PURE__ */ m("div", { className: "editor-footer", children: [
    h && /* @__PURE__ */ m(
      Rx,
      {
        status: Ot.status,
        lastSaved: Ot.lastSaved
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 856,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ m("span", { children: [
      yo.words,
      " words"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 862,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 861,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 854,
    columnNumber: 5
  }, this), Cd = {
    minHeight: z,
    ...Z && { maxHeight: Z, overflowY: "auto" }
  };
  return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${f === "neutral" ? "color-theme-neutral" : ""} ${c}`, "data-theme": d, children: [
    h && b && Ot.hasRecoverableContent && /* @__PURE__ */ m(
      Lx,
      {
        onRecover: () => {
          Ot.recover();
        },
        onDismiss: Ot.dismissRecovery
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 877,
        columnNumber: 9
      },
      this
    ),
    l && /* @__PURE__ */ m("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Q ? Q(ce, Li) : Li,
      x && /* @__PURE__ */ m(Hx, { editorMode: Te, onModeSwitch: Rr }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 890,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 887,
      columnNumber: 9
    }, this),
    !me && /* @__PURE__ */ m(
      yv,
      {
        editor: ce,
        isOpen: pd,
        onClose: () => Lt(!1),
        focusTrigger: gd,
        initialSearchQuery: bd,
        editorMode: Te,
        rawMarkdown: ho,
        onRawMarkdownChange: Ii,
        onMatchesChange: cd
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 897,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m(wv, { editor: ce }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 911,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("div", { className: `editor-main-area ${Ee ? "editor-with-toc" : ""}`, children: [
      Ee && Rt === "left" && /* @__PURE__ */ m(
        Za,
        {
          editor: ce,
          visible: He,
          onVisibilityChange: yt,
          title: Mn,
          minLevel: Dn,
          maxLevel: ro,
          showLevelIndicators: so,
          highlightActive: io,
          treeView: ao,
          width: co,
          position: Rt,
          scrollOffset: Kt,
          onItemClick: Gt,
          renderItem: lo,
          showToggleButton: uo,
          scrollContainerRef: at
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 917,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ m(
        Wx,
        {
          resetKey: `${t}-${Qu}`,
          onRetry: () => Ni((ie) => ie + 1),
          onClearContent: () => {
            ce && ce.commands.clearContent(), n?.(""), o?.(""), r?.(""), Ni((ie) => ie + 1);
          },
          onError: fo,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: at, style: Cd, children: Te === "wysiwyg" ? /* @__PURE__ */ m(Ce, { children: [
              /* @__PURE__ */ m(Sd, { editor: ce, className: "editor-content" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 954,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m(
                aw,
                {
                  editor: ce,
                  isMobile: me,
                  disabledFeatures: W,
                  containerRef: at,
                  editable: a,
                  showFloatingToolbar: v,
                  isLinkPopoverOpen: md,
                  aiEnabled: po,
                  onAISetupRequired: fe,
                  onAISparklesClick: (ie) => Ri("selection", ie),
                  aiDropdown: ed,
                  aiActions: kt,
                  onAIActionSelect: yd,
                  onAIDropdownClose: () => Ar(null),
                  aiState: Fe,
                  aiPopoverPosition: td,
                  onAIReplace: kd,
                  onAIInsert: xd,
                  onAIRetry: wd,
                  onAIDiscard: () => {
                    Ju(), wt();
                  },
                  onLinkPopoverClose: () => vo(!1),
                  onEditLink: () => vo(!0),
                  onWikiLinkSearch: Mi.current,
                  imageEditState: Ir,
                  onImageSave: (ie, De) => {
                    ce.chain().focus().setNodeSelection(Ir.pos).updateAttributes("resizableImage", {
                      src: ie,
                      alt: De
                    }).run(), bo(null);
                  },
                  onImageDelete: () => {
                    ce.chain().focus().setNodeSelection(Ir.pos).deleteSelection().run(), bo(null);
                  },
                  onImageEditClose: () => bo(null)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 955,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 953,
              columnNumber: 11
            }, this) : /* @__PURE__ */ m(
              Ox,
              {
                content: ho,
                onChange: Ii,
                placeholder: "Write your markdown here...",
                editable: a,
                autofocus: !0,
                searchMatches: rd,
                currentMatchIndex: id,
                autoClosePairs: wr
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 995,
                columnNumber: 11
              },
              this
            ) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 951,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ m(cw, { scrollContainerRef: at }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1007,
              columnNumber: 7
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 936,
          columnNumber: 7
        },
        this
      ),
      Ee && Rt === "right" && /* @__PURE__ */ m(
        Za,
        {
          editor: ce,
          visible: He,
          onVisibilityChange: yt,
          title: Mn,
          minLevel: Dn,
          maxLevel: ro,
          showLevelIndicators: so,
          highlightActive: io,
          treeView: ao,
          width: co,
          position: Rt,
          scrollOffset: Kt,
          onItemClick: Gt,
          renderItem: lo,
          showToggleButton: uo,
          scrollContainerRef: at
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1011,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 914,
      columnNumber: 7
    }, this),
    u && (B ? B(
      { words: yo.words, characters: yo.characters },
      Ot.status,
      Oi
    ) : Oi),
    /* @__PURE__ */ m($x, { visible: Cr, onClose: Er, editor: ce }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1044,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 874,
    columnNumber: 5
  }, this);
}), d1 = ar.create({
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
      kn(this.options.HTMLAttributes, t, {
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
}), Xu = {
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
}, gw = {
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
}, bw = {
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
}, vw = {
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
}, Wn = {
  dark: Xu,
  light: gw,
  sepia: bw,
  nord: vw
};
function Nw(e, t) {
  Object.entries(t.variables).forEach(([n, o]) => {
    e.style.setProperty(n, o);
  });
}
function m1(e, t, n, o) {
  const r = Wn[e] || Xu;
  return {
    name: t,
    description: n,
    variables: {
      ...r.variables,
      ...o
    }
  };
}
const Zu = ec(null);
function f1({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [o, r] = Y(t), s = Wn[o] || Wn.dark, a = H((c) => {
    Wn[c] && r(c);
  }, []);
  q(() => {
    n?.current && Nw(n.current, s);
  }, [s, n]);
  const i = {
    theme: s,
    themeName: o,
    setTheme: a,
    availableThemes: Object.keys(Wn)
  };
  return /* @__PURE__ */ m(Zu.Provider, { value: i, children: e }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/ThemeProvider.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function h1() {
  const e = tc(Zu);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const Qa = [
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
function p1({ node: e, updateAttributes: t }) {
  const [n, o] = Y(!1), r = e.attrs.language || "plaintext";
  Qa.find((a) => a.value === r)?.label;
  const s = H(() => {
    const a = e.textContent;
    navigator.clipboard.writeText(a).then(() => {
      o(!0), setTimeout(() => o(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ m(hn, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ m("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ m("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: r,
            onChange: (a) => t({ language: a.target.value }),
            className: "code-block-language-select",
            children: Qa.map(({ value: a, label: i }) => /* @__PURE__ */ m("option", { value: a, children: i }, a, !1, {
              fileName: "/home/ubuntu/paragon-check/client/src/components/editor/CodeBlockComponent.tsx",
              lineNumber: 64,
              columnNumber: 15
            }, this))
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 58,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(Dt, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/CodeBlockComponent.tsx",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-check/client/src/components/editor/CodeBlockComponent.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ m(yn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 76,
            columnNumber: 21
          }, this) : /* @__PURE__ */ m(Nn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-check/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 76,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-check/client/src/components/editor/CodeBlockComponent.tsx",
          lineNumber: 71,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m(Ss, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 83,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-check/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-check/client/src/components/editor/CodeBlockComponent.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
export {
  Rx as AutoSaveIndicator,
  d1 as Callout,
  Ak as CalloutInputRule,
  p1 as CodeBlockComponent,
  Ek as CollapsibleHeading,
  Vv as CollapsibleList,
  uk as DatePill,
  f1 as EditorThemeProvider,
  Nv as EditorToolbar,
  yv as FindReplace,
  zx as FloatingToolbar,
  ow as ImageDropZone,
  ux as ImageUpload,
  u1 as MarkdownEditor,
  Mk as MarkdownLinkInputRule,
  xk as MarkdownPasteSafe,
  Hv as MixedBulletList,
  Yv as MixedListItem,
  Fv as MixedOrderedList,
  Uv as MixedTaskItem,
  zv as MixedTaskList,
  Lx as RecoveryBanner,
  Qv as ResizableImage,
  Pk as SearchHighlight,
  wv as SelectAllActionBar,
  nx as SelectAllOccurrences,
  Xx as SlashCommands,
  Lk as TabIndent,
  Za as TableOfContents,
  fk as TagPill,
  pk as WikiLinkSafe,
  Nw as applyTheme,
  m1 as createCustomTheme,
  Xu as darkTheme,
  vi as getDateVariant,
  rn as isValidTag,
  gw as lightTheme,
  Kv as loadLanguageIfNeeded,
  be as lowlight,
  vw as nordTheme,
  Fn as normalizeTag,
  Wt as parseDateFromMarkdown,
  bw as sepiaTheme,
  Wn as themes,
  Ev as useAutoSave,
  h1 as useEditorTheme,
  Ix as useWordCount
};
//# sourceMappingURL=paragon.js.map
