import { jsxDEV as m, Fragment as Ce } from "react/jsx-dev-runtime";
import { useEditorState as tl, ReactNodeViewRenderer as rr, NodeViewWrapper as pn, NodeViewContent as Ms, useEditor as Sd, EditorContent as Md } from "@tiptap/react";
import * as T from "react";
import X, { useState as Y, useRef as j, useEffect as q, useLayoutEffect as sr, memo as vn, useCallback as H, useImperativeHandle as Dd, createContext as nl, useContext as ol, useMemo as zt, Component as Ad, useReducer as Pd, forwardRef as Id } from "react";
import { Image as Ds, X as ht, Link2 as As, Type as ir, Undo as Rd, Redo as Ld, Bold as Ps, Italic as Is, Underline as Rs, Strikethrough as Ls, Code as rl, Highlighter as sl, Link as Os, ChevronDown as Dt, List as _s, ListOrdered as $s, CheckSquare as Ws, Quote as Bs, Code2 as il, IndentIncrease as Od, IndentDecrease as _d, Table as ss, Minus as al, Info as Vo, BookOpen as Hs, PenLine as $d, Library as Wd, ListTodo as Fs, Columns as Bi, Trash2 as sn, Rows as Hi, ToggleLeft as Fi, ArrowUpDown as Bd, Sparkles as ar, Copy as Nn, Search as Hd, ChevronUp as Fd, MousePointerClick as zd, CaseSensitive as Ud, WholeWord as Yd, Regex as jd, Replace as is, ReplaceAll as Vd, Plus as zs, Check as yn, MessageSquareText as ll, StickyNote as cl, ChevronRight as ul, ChevronLeftIcon as Kd, ChevronRightIcon as Gd, ChevronDownIcon as qd, Calendar as dl, Hash as zi, Cloud as Xd, Loader2 as ml, CloudOff as Zd, AlertCircle as Qd, RotateCcw as Us, Activity as Jd, Maximize2 as fl, Minimize2 as pl, AlertTriangle as em, CheckCircle2 as tm, Eye as nm, FileText as Ys, FileCode as om, ExternalLink as rm, Pencil as sm, Unlink as im, Heading1 as am, Heading2 as lm, Heading3 as cm, Heading4 as um, Heading5 as dm, ImagePlus as mm, MessageSquare as hl, RefreshCw as fm, SpellCheck as pm, PanelRightClose as hm, PanelRightOpen as gm } from "lucide-react";
import { jsx as F, Fragment as bm, jsxs as vm } from "react/jsx-runtime";
import * as gl from "react-dom";
import Nm, { createPortal as ym } from "react-dom";
import { TextSelection as nt, Plugin as Ie, PluginKey as Re, AllSelection as xm } from "@tiptap/pm/state";
import wm from "@tiptap/starter-kit";
import km from "@tiptap/extension-placeholder";
import Cm from "@tiptap/extension-text-align";
import Em from "@tiptap/extension-highlight";
import Tm from "@tiptap/extension-link";
import { Table as Sm } from "@tiptap/extension-table";
import Mm from "@tiptap/extension-table-row";
import Dm from "@tiptap/extension-table-cell";
import Am from "@tiptap/extension-table-header";
import { DecorationSet as _e, Decoration as Ye } from "@tiptap/pm/view";
import { Extension as Ze, Node as lr, mergeAttributes as xn, InputRule as Oe, Mark as bl } from "@tiptap/core";
import Pm from "@tiptap/extension-bullet-list";
import Im from "@tiptap/extension-ordered-list";
import Rm from "@tiptap/extension-list-item";
import Lm from "@tiptap/extension-task-list";
import Om from "@tiptap/extension-task-item";
import { findWrapping as Ui, canJoin as _m } from "@tiptap/pm/transform";
import $m from "@tiptap/extension-underline";
import Wm from "@tiptap/extension-subscript";
import Bm from "@tiptap/extension-superscript";
import Hm from "@tiptap/extension-typography";
import Fm from "@tiptap/extension-code-block-lowlight";
import { createLowlight as zm } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import Vs from "highlight.js/lib/languages/typescript";
import vl from "highlight.js/lib/languages/python";
import Ks from "highlight.js/lib/languages/xml";
import Um from "highlight.js/lib/languages/css";
import Ym from "highlight.js/lib/languages/json";
import cr from "highlight.js/lib/languages/bash";
import jm from "@tiptap/extension-image";
import { createRoot as Vm } from "react-dom/client";
import { Fragment as Km } from "@tiptap/pm/model";
import { liftListItem as Yi, sinkListItem as ji } from "@tiptap/pm/schema-list";
import { undo as Gm, redo as qm } from "@tiptap/pm/history";
import Xm from "@tiptap/extension-horizontal-rule";
function Nl({ isOpen: e, onClose: t, onInsert: n, position: o }) {
  const [r, s] = Y(""), [a, i] = Y(""), [l, c] = Y(""), [u, d] = Y(!1), f = j(null), p = j(null);
  q(() => {
    e && (s(""), i(""), c(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), q(() => {
    if (!e) return;
    const N = (x) => {
      p.current && !p.current.contains(x.target) && t();
    }, y = (x) => {
      x.key === "Escape" && t();
    }, E = setTimeout(() => {
      document.addEventListener("mousedown", N);
    }, 100);
    return document.addEventListener("keydown", y), () => {
      clearTimeout(E), document.removeEventListener("mousedown", N), document.removeEventListener("keydown", y);
    };
  }, [e, t]);
  const h = (N) => {
    if (!N.trim())
      return c("Please enter an image URL"), !1;
    try {
      const y = new URL(N);
      if (!["http:", "https:", "data:"].includes(y.protocol))
        return c("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return c("Please enter a valid URL"), !1;
    }
    return c(""), !0;
  }, g = async () => {
    if (!h(r)) return;
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
    N.key === "Enter" && !N.shiftKey && (N.preventDefault(), g());
  };
  if (!e) return null;
  const v = o ? {
    top: o.top,
    left: Math.min(o.left, typeof window < "u" ? window.innerWidth - 340 : o.left)
  } : { top: "50%", left: "50%" };
  return /* @__PURE__ */ m(
    "div",
    {
      ref: p,
      className: "image-url-dialog fixed z-50",
      style: {
        top: (typeof v.top == "number", v.top),
        left: typeof v.left == "number" ? Math.max(8, v.left) : v.left,
        transform: o ? void 0 : "translate(-50%, -50%)"
      },
      children: [
        /* @__PURE__ */ m("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ m("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ m(Ds, { size: 16, className: "text-primary" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 148,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m("span", { className: "font-medium text-sm", children: "Insert Image from URL" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 149,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 147,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(ht, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 156,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 151,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
          lineNumber: 146,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ m("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ m("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(As, { size: 12 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 165,
                columnNumber: 13
              }, this),
              "Image URL"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
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
                  s(N.target.value), l && c("");
                },
                onKeyDown: b,
                placeholder: "https://example.com/image.jpg",
                className: `image-url-dialog-input ${l ? "error" : ""}`
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 168,
                columnNumber: 11
              },
              this
            ),
            l && /* @__PURE__ */ m("span", { className: "image-url-dialog-error", children: l }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 181,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 163,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ m("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(ir, { size: 12 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 188,
                columnNumber: 13
              }, this),
              "Alt Text (optional)"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
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
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 191,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
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
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 203,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ m(
              "button",
              {
                onClick: g,
                disabled: u || !r.trim(),
                className: "image-url-dialog-btn image-url-dialog-btn-insert",
                children: u ? "Validating..." : "Insert Image"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 209,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 202,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
          lineNumber: 161,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageURLDialog.tsx",
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
function Vi(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function ur(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = Vi(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : Vi(e[r], null);
        }
      };
  };
}
function Pe(...e) {
  return T.useCallback(ur(...e), e);
}
function wn(e, t = []) {
  let n = [];
  function o(s, a) {
    const i = T.createContext(a), l = n.length;
    n = [...n, a];
    const c = (d) => {
      const { scope: f, children: p, ...h } = d, g = f?.[e]?.[l] || i, b = T.useMemo(() => h, Object.values(h));
      return /* @__PURE__ */ F(g.Provider, { value: b, children: p });
    };
    c.displayName = s + "Provider";
    function u(d, f) {
      const p = f?.[e]?.[l] || i, h = T.useContext(p);
      if (h) return h;
      if (a !== void 0) return a;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [c, u];
  }
  const r = () => {
    const s = n.map((a) => T.createContext(a));
    return function(i) {
      const l = i?.[e] || s;
      return T.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
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
      const a = o.reduce((i, { useScope: l, scopeName: c }) => {
        const d = l(s)[`__scope${c}`];
        return { ...i, ...d };
      }, {});
      return T.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var At = globalThis?.document ? T.useLayoutEffect : () => {
}, Qm = T[" useInsertionEffect ".trim().toString()] || At;
function Gs({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = Jm({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : r;
  {
    const u = T.useRef(e !== void 0);
    T.useEffect(() => {
      const d = u.current;
      d !== i && console.warn(
        `${o} is changing from ${d ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = i;
    }, [i, o]);
  }
  const c = T.useCallback(
    (u) => {
      if (i) {
        const d = ef(u) ? u(e) : u;
        d !== e && a.current?.(d);
      } else
        s(u);
    },
    [i, e, s, a]
  );
  return [l, c];
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
    const { children: s, ...a } = o, i = T.Children.toArray(s), l = i.find(rf);
    if (l) {
      const c = l.props.children, u = i.map((d) => d === l ? T.Children.count(c) > 1 ? T.Children.only(null) : T.isValidElement(c) ? c.props.children : null : d);
      return /* @__PURE__ */ F(t, { ...a, ref: r, children: T.isValidElement(c) ? T.cloneElement(c, void 0, u) : null });
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
      return r.type !== T.Fragment && (i.ref = o ? ur(o, a) : a), T.cloneElement(r, i);
    }
    return T.Children.count(r) > 1 ? T.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var yl = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function of(e) {
  const t = ({ children: n }) => /* @__PURE__ */ F(bm, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = yl, t;
}
function rf(e) {
  return T.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === yl;
}
function sf(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...i) => {
      const l = s(...i);
      return r(...i), l;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function af(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var lf = [
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
], Me = lf.reduce((e, t) => {
  const n = /* @__PURE__ */ zn(`Primitive.${t}`), o = T.forwardRef((r, s) => {
    const { asChild: a, ...i } = r, l = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ F(l, { ...i, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function xl(e, t) {
  e && gl.flushSync(() => e.dispatchEvent(t));
}
function wl(e) {
  const t = e + "CollectionProvider", [n, o] = wn(t), [r, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (g) => {
    const { scope: b, children: v } = g, N = X.useRef(null), y = X.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ F(r, { scope: b, itemMap: y, collectionRef: N, children: v });
  };
  a.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ zn(i), c = X.forwardRef(
    (g, b) => {
      const { scope: v, children: N } = g, y = s(i, v), E = Pe(b, y.collectionRef);
      return /* @__PURE__ */ F(l, { ref: E, children: N });
    }
  );
  c.displayName = i;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ zn(u), p = X.forwardRef(
    (g, b) => {
      const { scope: v, children: N, ...y } = g, E = X.useRef(null), x = Pe(b, E), w = s(u, v);
      return X.useEffect(() => (w.itemMap.set(E, { ref: E, ...y }), () => void w.itemMap.delete(E))), /* @__PURE__ */ F(f, { [d]: "", ref: x, children: N });
    }
  );
  p.displayName = u;
  function h(g) {
    const b = s(e + "CollectionConsumer", g);
    return X.useCallback(() => {
      const N = b.collectionRef.current;
      if (!N) return [];
      const y = Array.from(N.querySelectorAll(`[${d}]`));
      return Array.from(b.itemMap.values()).sort(
        (w, M) => y.indexOf(w.ref.current) - y.indexOf(M.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: a, Slot: c, ItemSlot: p },
    h,
    o
  ];
}
var cf = T.createContext(void 0);
function kl(e) {
  const t = T.useContext(cf);
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
var df = "DismissableLayer", as = "dismissableLayer.update", mf = "dismissableLayer.pointerDownOutside", ff = "dismissableLayer.focusOutside", Ki, Cl = T.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), qs = T.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...l
    } = e, c = T.useContext(Cl), [u, d] = T.useState(null), f = u?.ownerDocument ?? globalThis?.document, [, p] = T.useState({}), h = Pe(t, (M) => d(M)), g = Array.from(c.layers), [b] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), v = g.indexOf(b), N = u ? g.indexOf(u) : -1, y = c.layersWithOutsidePointerEventsDisabled.size > 0, E = N >= v, x = gf((M) => {
      const k = M.target, C = [...c.branches].some((S) => S.contains(k));
      !E || C || (r?.(M), a?.(M), M.defaultPrevented || i?.());
    }, f), w = bf((M) => {
      const k = M.target;
      [...c.branches].some((S) => S.contains(k)) || (s?.(M), a?.(M), M.defaultPrevented || i?.());
    }, f);
    return uf((M) => {
      N === c.layers.size - 1 && (o?.(M), !M.defaultPrevented && i && (M.preventDefault(), i()));
    }, f), T.useEffect(() => {
      if (u)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (Ki = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(u)), c.layers.add(u), Gi(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = Ki);
        };
    }, [u, f, n, c]), T.useEffect(() => () => {
      u && (c.layers.delete(u), c.layersWithOutsidePointerEventsDisabled.delete(u), Gi());
    }, [u, c]), T.useEffect(() => {
      const M = () => p({});
      return document.addEventListener(as, M), () => document.removeEventListener(as, M);
    }, []), /* @__PURE__ */ F(
      Me.div,
      {
        ...l,
        ref: h,
        style: {
          pointerEvents: y ? E ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: se(e.onFocusCapture, w.onFocusCapture),
        onBlurCapture: se(e.onBlurCapture, w.onBlurCapture),
        onPointerDownCapture: se(
          e.onPointerDownCapture,
          x.onPointerDownCapture
        )
      }
    );
  }
);
qs.displayName = df;
var pf = "DismissableLayerBranch", hf = T.forwardRef((e, t) => {
  const n = T.useContext(Cl), o = T.useRef(null), r = Pe(t, o);
  return T.useEffect(() => {
    const s = o.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ F(Me.div, { ...e, ref: r });
});
hf.displayName = pf;
function gf(e, t = globalThis?.document) {
  const n = gt(e), o = T.useRef(!1), r = T.useRef(() => {
  });
  return T.useEffect(() => {
    const s = (i) => {
      if (i.target && !o.current) {
        let l = function() {
          El(
            mf,
            n,
            c,
            { discrete: !0 }
          );
        };
        const c = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = l, t.addEventListener("click", r.current, { once: !0 })) : l();
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
      s.target && !o.current && El(ff, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function Gi() {
  const e = new CustomEvent(as);
  document.dispatchEvent(e);
}
function El(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? xl(r, s) : r.dispatchEvent(s);
}
var Or = 0;
function vf() {
  T.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? qi()), document.body.insertAdjacentElement("beforeend", e[1] ?? qi()), Or++, () => {
      Or === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Or--;
    };
  }, []);
}
function qi() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var _r = "focusScope.autoFocusOnMount", $r = "focusScope.autoFocusOnUnmount", Xi = { bubbles: !1, cancelable: !0 }, Nf = "FocusScope", Tl = T.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: o = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, l] = T.useState(null), c = gt(r), u = gt(s), d = T.useRef(null), f = Pe(t, (g) => l(g)), p = T.useRef({
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
      let g = function(y) {
        if (p.paused || !i) return;
        const E = y.target;
        i.contains(E) ? d.current = E : St(d.current, { select: !0 });
      }, b = function(y) {
        if (p.paused || !i) return;
        const E = y.relatedTarget;
        E !== null && (i.contains(E) || St(d.current, { select: !0 }));
      }, v = function(y) {
        if (document.activeElement === document.body)
          for (const x of y)
            x.removedNodes.length > 0 && St(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", b);
      const N = new MutationObserver(v);
      return i && N.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", b), N.disconnect();
      };
    }
  }, [o, i, p.paused]), T.useEffect(() => {
    if (i) {
      Qi.add(p);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const v = new CustomEvent(_r, Xi);
        i.addEventListener(_r, c), i.dispatchEvent(v), v.defaultPrevented || (yf(Ef(Sl(i)), { select: !0 }), document.activeElement === g && St(i));
      }
      return () => {
        i.removeEventListener(_r, c), setTimeout(() => {
          const v = new CustomEvent($r, Xi);
          i.addEventListener($r, u), i.dispatchEvent(v), v.defaultPrevented || St(g ?? document.body, { select: !0 }), i.removeEventListener($r, u), Qi.remove(p);
        }, 0);
      };
    }
  }, [i, c, u, p]);
  const h = T.useCallback(
    (g) => {
      if (!n && !o || p.paused) return;
      const b = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, v = document.activeElement;
      if (b && v) {
        const N = g.currentTarget, [y, E] = xf(N);
        y && E ? !g.shiftKey && v === E ? (g.preventDefault(), n && St(y, { select: !0 })) : g.shiftKey && v === y && (g.preventDefault(), n && St(E, { select: !0 })) : v === N && g.preventDefault();
      }
    },
    [n, o, p.paused]
  );
  return /* @__PURE__ */ F(Me.div, { tabIndex: -1, ...a, ref: f, onKeyDown: h });
});
Tl.displayName = Nf;
function yf(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (St(o, { select: t }), document.activeElement !== n) return;
}
function xf(e) {
  const t = Sl(e), n = Zi(t, e), o = Zi(t.reverse(), e);
  return [n, o];
}
function Sl(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const r = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Zi(e, t) {
  for (const n of e)
    if (!wf(n, { upTo: t })) return n;
}
function wf(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function kf(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function St(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && kf(e) && t && e.select();
  }
}
var Qi = Cf();
function Cf() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Ji(e, t), e.unshift(t);
    },
    remove(t) {
      e = Ji(e, t), e[0]?.resume();
    }
  };
}
function Ji(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Ef(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Tf = T[" useId ".trim().toString()] || (() => {
}), Sf = 0;
function Ko(e) {
  const [t, n] = T.useState(Tf());
  return At(() => {
    n((o) => o ?? String(Sf++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Mf = ["top", "right", "bottom", "left"], Pt = Math.min, We = Math.max, Go = Math.round, ko = Math.floor, ot = (e) => ({
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
function ls(e, t, n) {
  return We(e, Pt(t, n));
}
function bt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function vt(e) {
  return e.split("-")[0];
}
function kn(e) {
  return e.split("-")[1];
}
function Xs(e) {
  return e === "x" ? "y" : "x";
}
function Zs(e) {
  return e === "y" ? "height" : "width";
}
const Pf = /* @__PURE__ */ new Set(["top", "bottom"]);
function et(e) {
  return Pf.has(vt(e)) ? "y" : "x";
}
function Qs(e) {
  return Xs(et(e));
}
function If(e, t, n) {
  n === void 0 && (n = !1);
  const o = kn(e), r = Qs(e), s = Zs(r);
  let a = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = qo(a)), [a, qo(a)];
}
function Rf(e) {
  const t = qo(e);
  return [cs(e), t, cs(t)];
}
function cs(e) {
  return e.replace(/start|end/g, (t) => Af[t]);
}
const ea = ["left", "right"], ta = ["right", "left"], Lf = ["top", "bottom"], Of = ["bottom", "top"];
function _f(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ta : ea : t ? ea : ta;
    case "left":
    case "right":
      return t ? Lf : Of;
    default:
      return [];
  }
}
function $f(e, t, n, o) {
  const r = kn(e);
  let s = _f(vt(e), n === "start", o);
  return r && (s = s.map((a) => a + "-" + r), t && (s = s.concat(s.map(cs)))), s;
}
function qo(e) {
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
function Ml(e) {
  return typeof e != "number" ? Wf(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Xo(e) {
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
function na(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const s = et(t), a = Qs(t), i = Zs(a), l = vt(t), c = s === "y", u = o.x + o.width / 2 - r.width / 2, d = o.y + o.height / 2 - r.height / 2, f = o[i] / 2 - r[i] / 2;
  let p;
  switch (l) {
    case "top":
      p = {
        x: u,
        y: o.y - r.height
      };
      break;
    case "bottom":
      p = {
        x: u,
        y: o.y + o.height
      };
      break;
    case "right":
      p = {
        x: o.x + o.width,
        y: d
      };
      break;
    case "left":
      p = {
        x: o.x - r.width,
        y: d
      };
      break;
    default:
      p = {
        x: o.x,
        y: o.y
      };
  }
  switch (kn(t)) {
    case "start":
      p[a] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      p[a] += f * (n && c ? -1 : 1);
      break;
  }
  return p;
}
const Bf = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: s = [],
    platform: a
  } = n, i = s.filter(Boolean), l = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let c = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: u,
    y: d
  } = na(c, o, l), f = o, p = {}, h = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: b,
      fn: v
    } = i[g], {
      x: N,
      y,
      data: E,
      reset: x
    } = await v({
      x: u,
      y: d,
      initialPlacement: o,
      placement: f,
      strategy: r,
      middlewareData: p,
      rects: c,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = N ?? u, d = y ?? d, p = {
      ...p,
      [b]: {
        ...p[b],
        ...E
      }
    }, x && h <= 50 && (h++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (c = x.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : x.rects), {
      x: u,
      y: d
    } = na(c, f, l)), g = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: r,
    middlewareData: p
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
    strategy: l
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: f = !1,
    padding: p = 0
  } = bt(t, e), h = Ml(p), b = i[f ? d === "floating" ? "reference" : "floating" : d], v = Xo(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(b))) == null || n ? b : b.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
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
  }, x = Xo(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: N,
    offsetParent: y,
    strategy: l
  }) : N);
  return {
    top: (v.top - x.top + h.top) / E.y,
    bottom: (x.bottom - v.bottom + h.bottom) / E.y,
    left: (v.left - x.left + h.left) / E.x,
    right: (x.right - v.right + h.right) / E.x
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
      middlewareData: l
    } = t, {
      element: c,
      padding: u = 0
    } = bt(e, t) || {};
    if (c == null)
      return {};
    const d = Ml(u), f = {
      x: n,
      y: o
    }, p = Qs(r), h = Zs(p), g = await a.getDimensions(c), b = p === "y", v = b ? "top" : "left", N = b ? "bottom" : "right", y = b ? "clientHeight" : "clientWidth", E = s.reference[h] + s.reference[p] - f[p] - s.floating[h], x = f[p] - s.reference[p], w = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let M = w ? w[y] : 0;
    (!M || !await (a.isElement == null ? void 0 : a.isElement(w))) && (M = i.floating[y] || s.floating[h]);
    const k = E / 2 - x / 2, C = M / 2 - g[h] / 2 - 1, S = Pt(d[v], C), D = Pt(d[N], C), A = S, R = M - g[h] - D, L = M / 2 - g[h] / 2 + k, _ = ls(A, L, R), O = !l.arrow && kn(r) != null && L !== _ && s.reference[h] / 2 - (L < A ? S : D) - g[h] / 2 < 0, U = O ? L < A ? L - A : L - R : 0;
    return {
      [p]: f[p] + U,
      data: {
        [p]: _,
        centerOffset: L - _ - U,
        ...O && {
          alignmentOffset: U
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
        platform: l,
        elements: c
      } = t, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: g = !0,
        ...b
      } = bt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = vt(r), N = et(i), y = vt(i) === i, E = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), x = f || (y || !g ? [qo(i)] : Rf(i)), w = h !== "none";
      !f && w && x.push(...$f(i, g, h, E));
      const M = [i, ...x], k = await Un(t, b), C = [];
      let S = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (u && C.push(k[v]), d) {
        const L = If(r, a, E);
        C.push(k[L[0]], k[L[1]]);
      }
      if (S = [...S, {
        placement: r,
        overflows: C
      }], !C.every((L) => L <= 0)) {
        var D, A;
        const L = (((D = s.flip) == null ? void 0 : D.index) || 0) + 1, _ = M[L];
        if (_ && (!(d === "alignment" ? N !== et(_) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        S.every((I) => et(I.placement) === N ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: L,
              overflows: S
            },
            reset: {
              placement: _
            }
          };
        let O = (A = S.filter((U) => U.overflows[0] <= 0).sort((U, I) => U.overflows[1] - I.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!O)
          switch (p) {
            case "bestFit": {
              var R;
              const U = (R = S.filter((I) => {
                if (w) {
                  const P = et(I.placement);
                  return P === N || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  P === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((P) => P > 0).reduce((P, W) => P + W, 0)]).sort((I, P) => I[1] - P[1])[0]) == null ? void 0 : R[0];
              U && (O = U);
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
function oa(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function ra(e) {
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
          }), a = oa(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: ra(a)
            }
          };
        }
        case "escaped": {
          const s = await Un(t, {
            ...r,
            altBoundary: !0
          }), a = oa(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: ra(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Dl = /* @__PURE__ */ new Set(["left", "top"]);
async function Uf(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), a = vt(n), i = kn(n), l = et(n) === "y", c = Dl.has(a) ? -1 : 1, u = s && l ? -1 : 1, d = bt(t, e);
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
  return i && typeof h == "number" && (p = i === "end" ? h * -1 : h), l ? {
    x: p * u,
    y: f * c
  } : {
    x: f * c,
    y: p * u
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
      } = t, l = await Uf(t, e);
      return a === ((n = i.offset) == null ? void 0 : n.placement) && (o = i.arrow) != null && o.alignmentOffset ? {} : {
        x: r + l.x,
        y: s + l.y,
        data: {
          ...l,
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
        ...l
      } = bt(e, t), c = {
        x: n,
        y: o
      }, u = await Un(t, l), d = et(vt(r)), f = Xs(d);
      let p = c[f], h = c[d];
      if (s) {
        const b = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", N = p + u[b], y = p - u[v];
        p = ls(N, p, y);
      }
      if (a) {
        const b = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", N = h + u[b], y = h - u[v];
        h = ls(N, h, y);
      }
      const g = i.fn({
        ...t,
        [f]: p,
        [d]: h
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - o,
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
        mainAxis: l = !0,
        crossAxis: c = !0
      } = bt(e, t), u = {
        x: n,
        y: o
      }, d = et(r), f = Xs(d);
      let p = u[f], h = u[d];
      const g = bt(i, t), b = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const y = f === "y" ? "height" : "width", E = s.reference[f] - s.floating[y] + b.mainAxis, x = s.reference[f] + s.reference[y] - b.mainAxis;
        p < E ? p = E : p > x && (p = x);
      }
      if (c) {
        var v, N;
        const y = f === "y" ? "width" : "height", E = Dl.has(vt(r)), x = s.reference[d] - s.floating[y] + (E && ((v = a.offset) == null ? void 0 : v[d]) || 0) + (E ? 0 : b.crossAxis), w = s.reference[d] + s.reference[y] + (E ? 0 : ((N = a.offset) == null ? void 0 : N[d]) || 0) - (E ? b.crossAxis : 0);
        h < x ? h = x : h > w && (h = w);
      }
      return {
        [f]: p,
        [d]: h
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
        apply: l = () => {
        },
        ...c
      } = bt(e, t), u = await Un(t, c), d = vt(r), f = kn(r), p = et(r) === "y", {
        width: h,
        height: g
      } = s.floating;
      let b, v;
      d === "top" || d === "bottom" ? (b = d, v = f === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = d, b = f === "end" ? "top" : "bottom");
      const N = g - u.top - u.bottom, y = h - u.left - u.right, E = Pt(g - u[b], N), x = Pt(h - u[v], y), w = !t.middlewareData.shift;
      let M = E, k = x;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = y), (o = t.middlewareData.shift) != null && o.enabled.y && (M = N), w && !f) {
        const S = We(u.left, 0), D = We(u.right, 0), A = We(u.top, 0), R = We(u.bottom, 0);
        p ? k = h - 2 * (S !== 0 || D !== 0 ? S + D : We(u.left, u.right)) : M = g - 2 * (A !== 0 || R !== 0 ? A + R : We(u.top, u.bottom));
      }
      await l({
        ...t,
        availableWidth: k,
        availableHeight: M
      });
      const C = await a.getDimensions(i.floating);
      return h !== C.width || g !== C.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function dr() {
  return typeof window < "u";
}
function Cn(e) {
  return Al(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Be(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function st(e) {
  var t;
  return (t = (Al(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Al(e) {
  return dr() ? e instanceof Node || e instanceof Be(e).Node : !1;
}
function qe(e) {
  return dr() ? e instanceof Element || e instanceof Be(e).Element : !1;
}
function rt(e) {
  return dr() ? e instanceof HTMLElement || e instanceof Be(e).HTMLElement : !1;
}
function sa(e) {
  return !dr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Be(e).ShadowRoot;
}
const Gf = /* @__PURE__ */ new Set(["inline", "contents"]);
function Xn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = Xe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !Gf.has(r);
}
const qf = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Xf(e) {
  return qf.has(Cn(e));
}
const Zf = [":popover-open", ":modal"];
function mr(e) {
  return Zf.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Qf = ["transform", "translate", "scale", "rotate", "perspective"], Jf = ["transform", "translate", "scale", "rotate", "perspective", "filter"], ep = ["paint", "layout", "strict", "content"];
function Js(e) {
  const t = ei(), n = qe(e) ? Xe(e) : e;
  return Qf.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Jf.some((o) => (n.willChange || "").includes(o)) || ep.some((o) => (n.contain || "").includes(o));
}
function tp(e) {
  let t = It(e);
  for (; rt(t) && !hn(t); ) {
    if (Js(t))
      return t;
    if (mr(t))
      return null;
    t = It(t);
  }
  return null;
}
function ei() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const np = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function hn(e) {
  return np.has(Cn(e));
}
function Xe(e) {
  return Be(e).getComputedStyle(e);
}
function fr(e) {
  return qe(e) ? {
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
    sa(e) && e.host || // Fallback.
    st(e)
  );
  return sa(t) ? t.host : t;
}
function Pl(e) {
  const t = It(e);
  return hn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : rt(t) && Xn(t) ? t : Pl(t);
}
function Yn(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = Pl(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), a = Be(r);
  if (s) {
    const i = us(a);
    return t.concat(a, a.visualViewport || [], Xn(r) ? r : [], i && n ? Yn(i) : []);
  }
  return t.concat(r, Yn(r, [], n));
}
function us(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Il(e) {
  const t = Xe(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = rt(e), s = r ? e.offsetWidth : n, a = r ? e.offsetHeight : o, i = Go(n) !== s || Go(o) !== a;
  return i && (n = s, o = a), {
    width: n,
    height: o,
    $: i
  };
}
function ti(e) {
  return qe(e) ? e : e.contextElement;
}
function an(e) {
  const t = ti(e);
  if (!rt(t))
    return ot(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: s
  } = Il(t);
  let a = (s ? Go(n.width) : n.width) / o, i = (s ? Go(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const op = /* @__PURE__ */ ot(0);
function Rl(e) {
  const t = Be(e);
  return !ei() || !t.visualViewport ? op : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function rp(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Be(e) ? !1 : t;
}
function Ut(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), s = ti(e);
  let a = ot(1);
  t && (o ? qe(o) && (a = an(o)) : a = an(e));
  const i = rp(s, n, o) ? Rl(s) : ot(0);
  let l = (r.left + i.x) / a.x, c = (r.top + i.y) / a.y, u = r.width / a.x, d = r.height / a.y;
  if (s) {
    const f = Be(s), p = o && qe(o) ? Be(o) : o;
    let h = f, g = us(h);
    for (; g && o && p !== h; ) {
      const b = an(g), v = g.getBoundingClientRect(), N = Xe(g), y = v.left + (g.clientLeft + parseFloat(N.paddingLeft)) * b.x, E = v.top + (g.clientTop + parseFloat(N.paddingTop)) * b.y;
      l *= b.x, c *= b.y, u *= b.x, d *= b.y, l += y, c += E, h = Be(g), g = us(h);
    }
  }
  return Xo({
    width: u,
    height: d,
    x: l,
    y: c
  });
}
function pr(e, t) {
  const n = fr(e).scrollLeft;
  return t ? t.left + n : Ut(st(e)).left + n;
}
function Ll(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - pr(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function sp(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const s = r === "fixed", a = st(o), i = t ? mr(t.floating) : !1;
  if (o === a || i && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = ot(1);
  const u = ot(0), d = rt(o);
  if ((d || !d && !s) && ((Cn(o) !== "body" || Xn(a)) && (l = fr(o)), rt(o))) {
    const p = Ut(o);
    c = an(o), u.x = p.x + o.clientLeft, u.y = p.y + o.clientTop;
  }
  const f = a && !d && !s ? Ll(a, l) : ot(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - l.scrollLeft * c.x + u.x + f.x,
    y: n.y * c.y - l.scrollTop * c.y + u.y + f.y
  };
}
function ip(e) {
  return Array.from(e.getClientRects());
}
function ap(e) {
  const t = st(e), n = fr(e), o = e.ownerDocument.body, r = We(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), s = We(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + pr(e);
  const i = -n.scrollTop;
  return Xe(o).direction === "rtl" && (a += We(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: s,
    x: a,
    y: i
  };
}
const ia = 25;
function lp(e, t) {
  const n = Be(e), o = st(e), r = n.visualViewport;
  let s = o.clientWidth, a = o.clientHeight, i = 0, l = 0;
  if (r) {
    s = r.width, a = r.height;
    const u = ei();
    (!u || u && t === "fixed") && (i = r.offsetLeft, l = r.offsetTop);
  }
  const c = pr(o);
  if (c <= 0) {
    const u = o.ownerDocument, d = u.body, f = getComputedStyle(d), p = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, h = Math.abs(o.clientWidth - d.clientWidth - p);
    h <= ia && (s -= h);
  } else c <= ia && (s += c);
  return {
    width: s,
    height: a,
    x: i,
    y: l
  };
}
const cp = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function up(e, t) {
  const n = Ut(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = rt(e) ? an(e) : ot(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, l = r * s.x, c = o * s.y;
  return {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function aa(e, t, n) {
  let o;
  if (t === "viewport")
    o = lp(e, n);
  else if (t === "document")
    o = ap(st(e));
  else if (qe(t))
    o = up(t, n);
  else {
    const r = Rl(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return Xo(o);
}
function Ol(e, t) {
  const n = It(e);
  return n === t || !qe(n) || hn(n) ? !1 : Xe(n).position === "fixed" || Ol(n, t);
}
function dp(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = Yn(e, [], !1).filter((i) => qe(i) && Cn(i) !== "body"), r = null;
  const s = Xe(e).position === "fixed";
  let a = s ? It(e) : e;
  for (; qe(a) && !hn(a); ) {
    const i = Xe(a), l = Js(a);
    !l && i.position === "fixed" && (r = null), (s ? !l && !r : !l && i.position === "static" && !!r && cp.has(r.position) || Xn(a) && !l && Ol(e, a)) ? o = o.filter((u) => u !== a) : r = i, a = It(a);
  }
  return t.set(e, o), o;
}
function mp(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const a = [...n === "clippingAncestors" ? mr(t) ? [] : dp(t, this._c) : [].concat(n), o], i = a[0], l = a.reduce((c, u) => {
    const d = aa(t, u, r);
    return c.top = We(d.top, c.top), c.right = Pt(d.right, c.right), c.bottom = Pt(d.bottom, c.bottom), c.left = We(d.left, c.left), c;
  }, aa(t, i, r));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function fp(e) {
  const {
    width: t,
    height: n
  } = Il(e);
  return {
    width: t,
    height: n
  };
}
function pp(e, t, n) {
  const o = rt(t), r = st(t), s = n === "fixed", a = Ut(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = ot(0);
  function c() {
    l.x = pr(r);
  }
  if (o || !o && !s)
    if ((Cn(t) !== "body" || Xn(r)) && (i = fr(t)), o) {
      const p = Ut(t, !0, s, t);
      l.x = p.x + t.clientLeft, l.y = p.y + t.clientTop;
    } else r && c();
  s && !o && r && c();
  const u = r && !o && !s ? Ll(r, i) : ot(0), d = a.left + i.scrollLeft - l.x - u.x, f = a.top + i.scrollTop - l.y - u.y;
  return {
    x: d,
    y: f,
    width: a.width,
    height: a.height
  };
}
function Wr(e) {
  return Xe(e).position === "static";
}
function la(e, t) {
  if (!rt(e) || Xe(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return st(e) === n && (n = n.ownerDocument.body), n;
}
function _l(e, t) {
  const n = Be(e);
  if (mr(e))
    return n;
  if (!rt(e)) {
    let r = It(e);
    for (; r && !hn(r); ) {
      if (qe(r) && !Wr(r))
        return r;
      r = It(r);
    }
    return n;
  }
  let o = la(e, t);
  for (; o && Xf(o) && Wr(o); )
    o = la(o, t);
  return o && hn(o) && Wr(o) && !Js(o) ? n : o || tp(e) || n;
}
const hp = async function(e) {
  const t = this.getOffsetParent || _l, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: pp(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function gp(e) {
  return Xe(e).direction === "rtl";
}
const bp = {
  convertOffsetParentRelativeRectToViewportRelativeRect: sp,
  getDocumentElement: st,
  getClippingRect: mp,
  getOffsetParent: _l,
  getElementRects: hp,
  getClientRects: ip,
  getDimensions: fp,
  getScale: an,
  isElement: qe,
  isRTL: gp
};
function $l(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function vp(e, t) {
  let n = null, o;
  const r = st(e);
  function s() {
    var i;
    clearTimeout(o), (i = n) == null || i.disconnect(), n = null;
  }
  function a(i, l) {
    i === void 0 && (i = !1), l === void 0 && (l = 1), s();
    const c = e.getBoundingClientRect(), {
      left: u,
      top: d,
      width: f,
      height: p
    } = c;
    if (i || t(), !f || !p)
      return;
    const h = ko(d), g = ko(r.clientWidth - (u + f)), b = ko(r.clientHeight - (d + p)), v = ko(u), y = {
      rootMargin: -h + "px " + -g + "px " + -b + "px " + -v + "px",
      threshold: We(0, Pt(1, l)) || 1
    };
    let E = !0;
    function x(w) {
      const M = w[0].intersectionRatio;
      if (M !== l) {
        if (!E)
          return a();
        M ? a(!1, M) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      M === 1 && !$l(c, e.getBoundingClientRect()) && a(), E = !1;
    }
    try {
      n = new IntersectionObserver(x, {
        ...y,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(x, y);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function Np(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = o, c = ti(e), u = r || s ? [...c ? Yn(c) : [], ...Yn(t)] : [];
  u.forEach((v) => {
    r && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const d = c && i ? vp(c, n) : null;
  let f = -1, p = null;
  a && (p = new ResizeObserver((v) => {
    let [N] = v;
    N && N.target === c && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var y;
      (y = p) == null || y.observe(t);
    })), n();
  }), c && !l && p.observe(c), p.observe(t));
  let h, g = l ? Ut(e) : null;
  l && b();
  function b() {
    const v = Ut(e);
    g && !$l(g, v) && n(), g = v, h = requestAnimationFrame(b);
  }
  return n(), () => {
    var v;
    u.forEach((N) => {
      r && N.removeEventListener("scroll", n), s && N.removeEventListener("resize", n);
    }), d?.(), (v = p) == null || v.disconnect(), p = null, l && cancelAnimationFrame(h);
  };
}
const yp = Yf, xp = jf, wp = Ff, kp = Kf, Cp = zf, ca = Hf, Ep = Vf, Tp = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: bp,
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
var Sp = typeof document < "u", Mp = function() {
}, Fo = Sp ? sr : Mp;
function Zo(e, t) {
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
        if (!Zo(e[o], t[o]))
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
      if (!(s === "_owner" && e.$$typeof) && !Zo(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Wl(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ua(e, t) {
  const n = Wl(e);
  return Math.round(t * n) / n;
}
function Br(e) {
  const t = T.useRef(e);
  return Fo(() => {
    t.current = e;
  }), t;
}
function Dp(e) {
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
    whileElementsMounted: l,
    open: c
  } = e, [u, d] = T.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, p] = T.useState(o);
  Zo(f, o) || p(o);
  const [h, g] = T.useState(null), [b, v] = T.useState(null), N = T.useCallback((I) => {
    I !== w.current && (w.current = I, g(I));
  }, []), y = T.useCallback((I) => {
    I !== M.current && (M.current = I, v(I));
  }, []), E = s || h, x = a || b, w = T.useRef(null), M = T.useRef(null), k = T.useRef(u), C = l != null, S = Br(l), D = Br(r), A = Br(c), R = T.useCallback(() => {
    if (!w.current || !M.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    D.current && (I.platform = D.current), Tp(w.current, M.current, I).then((P) => {
      const W = {
        ...P,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: A.current !== !1
      };
      L.current && !Zo(k.current, W) && (k.current = W, gl.flushSync(() => {
        d(W);
      }));
    });
  }, [f, t, n, D, A]);
  Fo(() => {
    c === !1 && k.current.isPositioned && (k.current.isPositioned = !1, d((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [c]);
  const L = T.useRef(!1);
  Fo(() => (L.current = !0, () => {
    L.current = !1;
  }), []), Fo(() => {
    if (E && (w.current = E), x && (M.current = x), E && x) {
      if (S.current)
        return S.current(E, x, R);
      R();
    }
  }, [E, x, R, S, C]);
  const _ = T.useMemo(() => ({
    reference: w,
    floating: M,
    setReference: N,
    setFloating: y
  }), [N, y]), O = T.useMemo(() => ({
    reference: E,
    floating: x
  }), [E, x]), U = T.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!O.floating)
      return I;
    const P = ua(O.floating, u.x), W = ua(O.floating, u.y);
    return i ? {
      ...I,
      transform: "translate(" + P + "px, " + W + "px)",
      ...Wl(O.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: P,
      top: W
    };
  }, [n, i, O.floating, u.x, u.y]);
  return T.useMemo(() => ({
    ...u,
    update: R,
    refs: _,
    elements: O,
    floatingStyles: U
  }), [u, R, _, O, U]);
}
const Ap = (e) => {
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
}, Pp = (e, t) => ({
  ...yp(e),
  options: [e, t]
}), Ip = (e, t) => ({
  ...xp(e),
  options: [e, t]
}), Rp = (e, t) => ({
  ...Ep(e),
  options: [e, t]
}), Lp = (e, t) => ({
  ...wp(e),
  options: [e, t]
}), Op = (e, t) => ({
  ...kp(e),
  options: [e, t]
}), _p = (e, t) => ({
  ...Cp(e),
  options: [e, t]
}), $p = (e, t) => ({
  ...Ap(e),
  options: [e, t]
});
var Wp = "Arrow", Bl = T.forwardRef((e, t) => {
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
Bl.displayName = Wp;
var Bp = Bl;
function Hp(e) {
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
          const l = s.borderBoxSize, c = Array.isArray(l) ? l[0] : l;
          a = c.inlineSize, i = c.blockSize;
        } else
          a = e.offsetWidth, i = e.offsetHeight;
        n({ width: a, height: i });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var ni = "Popper", [Hl, hr] = wn(ni), [Fp, Fl] = Hl(ni), zl = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = T.useState(null);
  return /* @__PURE__ */ F(Fp, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
zl.displayName = ni;
var Ul = "PopperAnchor", Yl = T.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, s = Fl(Ul, n), a = T.useRef(null), i = Pe(t, a), l = T.useRef(null);
    return T.useEffect(() => {
      const c = l.current;
      l.current = o?.current || a.current, c !== l.current && s.onAnchorChange(l.current);
    }), o ? null : /* @__PURE__ */ F(Me.div, { ...r, ref: i });
  }
);
Yl.displayName = Ul;
var oi = "PopperContent", [zp, Up] = Hl(oi), jl = T.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: i = 0,
      avoidCollisions: l = !0,
      collisionBoundary: c = [],
      collisionPadding: u = 0,
      sticky: d = "partial",
      hideWhenDetached: f = !1,
      updatePositionStrategy: p = "optimized",
      onPlaced: h,
      ...g
    } = e, b = Fl(oi, n), [v, N] = T.useState(null), y = Pe(t, (z) => N(z)), [E, x] = T.useState(null), w = Hp(E), M = w?.width ?? 0, k = w?.height ?? 0, C = o + (s !== "center" ? "-" + s : ""), S = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, D = Array.isArray(c) ? c : [c], A = D.length > 0, R = {
      padding: S,
      boundary: D.filter(jp),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: A
    }, { refs: L, floatingStyles: _, placement: O, isPositioned: U, middlewareData: I } = Dp({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: C,
      whileElementsMounted: (...z) => Np(...z, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        Pp({ mainAxis: r + k, alignmentAxis: a }),
        l && Ip({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Rp() : void 0,
          ...R
        }),
        l && Lp({ ...R }),
        Op({
          ...R,
          apply: ({ elements: z, rects: Z, availableWidth: ce, availableHeight: ue }) => {
            const { width: ve, height: Ee } = Z.reference, Fe = z.floating.style;
            Fe.setProperty("--radix-popper-available-width", `${ce}px`), Fe.setProperty("--radix-popper-available-height", `${ue}px`), Fe.setProperty("--radix-popper-anchor-width", `${ve}px`), Fe.setProperty("--radix-popper-anchor-height", `${Ee}px`);
          }
        }),
        E && $p({ element: E, padding: i }),
        Vp({ arrowWidth: M, arrowHeight: k }),
        f && _p({ strategy: "referenceHidden", ...R })
      ]
    }), [P, W] = Gl(O), K = gt(h);
    At(() => {
      U && K?.();
    }, [U, K]);
    const V = I.arrow?.x, G = I.arrow?.y, Q = I.arrow?.centerOffset !== 0, [B, $] = T.useState();
    return At(() => {
      v && $(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ F(
      "div",
      {
        ref: L.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ..._,
          transform: U ? _.transform : "translate(0, -200%)",
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
          zp,
          {
            scope: n,
            placedSide: P,
            onArrowChange: x,
            arrowX: V,
            arrowY: G,
            shouldHideArrow: Q,
            children: /* @__PURE__ */ F(
              Me.div,
              {
                "data-side": P,
                "data-align": W,
                ...g,
                ref: y,
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
jl.displayName = oi;
var Vl = "PopperArrow", Yp = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Kl = T.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = Up(Vl, o), a = Yp[s.placedSide];
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
          Bp,
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
Kl.displayName = Vl;
function jp(e) {
  return e !== null;
}
var Vp = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, i = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [c, u] = Gl(n), d = { start: "0%", center: "50%", end: "100%" }[u], f = (r.arrow?.x ?? 0) + i / 2, p = (r.arrow?.y ?? 0) + l / 2;
    let h = "", g = "";
    return c === "bottom" ? (h = a ? d : `${f}px`, g = `${-l}px`) : c === "top" ? (h = a ? d : `${f}px`, g = `${o.floating.height + l}px`) : c === "right" ? (h = `${-l}px`, g = a ? d : `${p}px`) : c === "left" && (h = `${o.floating.width + l}px`, g = a ? d : `${p}px`), { data: { x: h, y: g } };
  }
});
function Gl(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var ql = zl, Xl = Yl, Zl = jl, Ql = Kl, Kp = "Portal", ri = T.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, s] = T.useState(!1);
  At(() => s(!0), []);
  const a = n || r && globalThis?.document?.body;
  return a ? Nm.createPortal(/* @__PURE__ */ F(Me.div, { ...o, ref: t }), a) : null;
});
ri.displayName = Kp;
function Gp(e, t) {
  return T.useReducer((n, o) => t[n][o] ?? n, e);
}
var Yt = (e) => {
  const { present: t, children: n } = e, o = qp(t), r = typeof n == "function" ? n({ present: o.isPresent }) : T.Children.only(n), s = Pe(o.ref, Xp(r));
  return typeof n == "function" || o.isPresent ? T.cloneElement(r, { ref: s }) : null;
};
Yt.displayName = "Presence";
function qp(e) {
  const [t, n] = T.useState(), o = T.useRef(null), r = T.useRef(e), s = T.useRef("none"), a = e ? "mounted" : "unmounted", [i, l] = Gp(a, {
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
    const c = Co(o.current);
    s.current = i === "mounted" ? c : "none";
  }, [i]), At(() => {
    const c = o.current, u = r.current;
    if (u !== e) {
      const f = s.current, p = Co(c);
      e ? l("MOUNT") : p === "none" || c?.display === "none" ? l("UNMOUNT") : l(u && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), At(() => {
    if (t) {
      let c;
      const u = t.ownerDocument.defaultView ?? window, d = (p) => {
        const g = Co(o.current).includes(CSS.escape(p.animationName));
        if (p.target === t && g && (l("ANIMATION_END"), !r.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, f = (p) => {
        p.target === t && (s.current = Co(o.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        u.clearTimeout(c), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: T.useCallback((c) => {
      o.current = c ? getComputedStyle(c) : null, n(c);
    }, [])
  };
}
function Co(e) {
  return e?.animationName || "none";
}
function Xp(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Hr = "rovingFocusGroup.onEntryFocus", Zp = { bubbles: !1, cancelable: !0 }, Zn = "RovingFocusGroup", [ds, Jl, Qp] = wl(Zn), [Jp, ec] = wn(
  Zn,
  [Qp]
), [eh, th] = Jp(Zn), tc = T.forwardRef(
  (e, t) => /* @__PURE__ */ F(ds.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ F(ds.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ F(nh, { ...e, ref: t }) }) })
);
tc.displayName = Zn;
var nh = T.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: o,
    loop: r = !1,
    dir: s,
    currentTabStopId: a,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: l,
    onEntryFocus: c,
    preventScrollOnEntryFocus: u = !1,
    ...d
  } = e, f = T.useRef(null), p = Pe(t, f), h = kl(s), [g, b] = Gs({
    prop: a,
    defaultProp: i ?? null,
    onChange: l,
    caller: Zn
  }), [v, N] = T.useState(!1), y = gt(c), E = Jl(n), x = T.useRef(!1), [w, M] = T.useState(0);
  return T.useEffect(() => {
    const k = f.current;
    if (k)
      return k.addEventListener(Hr, y), () => k.removeEventListener(Hr, y);
  }, [y]), /* @__PURE__ */ F(
    eh,
    {
      scope: n,
      orientation: o,
      dir: h,
      loop: r,
      currentTabStopId: g,
      onItemFocus: T.useCallback(
        (k) => b(k),
        [b]
      ),
      onItemShiftTab: T.useCallback(() => N(!0), []),
      onFocusableItemAdd: T.useCallback(
        () => M((k) => k + 1),
        []
      ),
      onFocusableItemRemove: T.useCallback(
        () => M((k) => k - 1),
        []
      ),
      children: /* @__PURE__ */ F(
        Me.div,
        {
          tabIndex: v || w === 0 ? -1 : 0,
          "data-orientation": o,
          ...d,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: se(e.onMouseDown, () => {
            x.current = !0;
          }),
          onFocus: se(e.onFocus, (k) => {
            const C = !x.current;
            if (k.target === k.currentTarget && C && !v) {
              const S = new CustomEvent(Hr, Zp);
              if (k.currentTarget.dispatchEvent(S), !S.defaultPrevented) {
                const D = E().filter((O) => O.focusable), A = D.find((O) => O.active), R = D.find((O) => O.id === g), _ = [A, R, ...D].filter(
                  Boolean
                ).map((O) => O.ref.current);
                rc(_, u);
              }
            }
            x.current = !1;
          }),
          onBlur: se(e.onBlur, () => N(!1))
        }
      )
    }
  );
}), nc = "RovingFocusGroupItem", oc = T.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: o = !0,
      active: r = !1,
      tabStopId: s,
      children: a,
      ...i
    } = e, l = Ko(), c = s || l, u = th(nc, n), d = u.currentTabStopId === c, f = Jl(n), { onFocusableItemAdd: p, onFocusableItemRemove: h, currentTabStopId: g } = u;
    return T.useEffect(() => {
      if (o)
        return p(), () => h();
    }, [o, p, h]), /* @__PURE__ */ F(
      ds.ItemSlot,
      {
        scope: n,
        id: c,
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
              o ? u.onItemFocus(c) : b.preventDefault();
            }),
            onFocus: se(e.onFocus, () => u.onItemFocus(c)),
            onKeyDown: se(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const v = sh(b, u.orientation, u.dir);
              if (v !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let y = f().filter((E) => E.focusable).map((E) => E.ref.current);
                if (v === "last") y.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && y.reverse();
                  const E = y.indexOf(b.currentTarget);
                  y = u.loop ? ih(y, E + 1) : y.slice(E + 1);
                }
                setTimeout(() => rc(y));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: d, hasTabStop: g != null }) : a
          }
        )
      }
    );
  }
);
oc.displayName = nc;
var oh = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function rh(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function sh(e, t, n) {
  const o = rh(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return oh[o];
}
function rc(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function ih(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var ah = tc, lh = oc, ch = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Zt = /* @__PURE__ */ new WeakMap(), Eo = /* @__PURE__ */ new WeakMap(), To = {}, Fr = 0, sc = function(e) {
  return e && (e.host || sc(e.parentNode));
}, uh = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = sc(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, dh = function(e, t, n, o) {
  var r = uh(t, Array.isArray(e) ? e : [e]);
  To[n] || (To[n] = /* @__PURE__ */ new WeakMap());
  var s = To[n], a = [], i = /* @__PURE__ */ new Set(), l = new Set(r), c = function(d) {
    !d || i.has(d) || (i.add(d), c(d.parentNode));
  };
  r.forEach(c);
  var u = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (i.has(f))
        u(f);
      else
        try {
          var p = f.getAttribute(o), h = p !== null && p !== "false", g = (Zt.get(f) || 0) + 1, b = (s.get(f) || 0) + 1;
          Zt.set(f, g), s.set(f, b), a.push(f), g === 1 && h && Eo.set(f, !0), b === 1 && f.setAttribute(n, "true"), h || f.setAttribute(o, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return u(t), i.clear(), Fr++, function() {
    a.forEach(function(d) {
      var f = Zt.get(d) - 1, p = s.get(d) - 1;
      Zt.set(d, f), s.set(d, p), f || (Eo.has(d) || d.removeAttribute(o), Eo.delete(d)), p || d.removeAttribute(n);
    }), Fr--, Fr || (Zt = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ new WeakMap(), Eo = /* @__PURE__ */ new WeakMap(), To = {});
  };
}, mh = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = ch(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), dh(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, Je = function() {
  return Je = Object.assign || function(t) {
    for (var n, o = 1, r = arguments.length; o < r; o++) {
      n = arguments[o];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, Je.apply(this, arguments);
};
function ic(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
  return n;
}
function fh(e, t, n) {
  if (n || arguments.length === 2) for (var o = 0, r = t.length, s; o < r; o++)
    (s || !(o in t)) && (s || (s = Array.prototype.slice.call(t, 0, o)), s[o] = t[o]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var zo = "right-scroll-bar-position", Uo = "width-before-scroll-bar", ph = "with-scroll-bars-hidden", hh = "--removed-body-scroll-bar-size";
function zr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function gh(e, t) {
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
var bh = typeof window < "u" ? T.useLayoutEffect : T.useEffect, da = /* @__PURE__ */ new WeakMap();
function vh(e, t) {
  var n = gh(null, function(o) {
    return e.forEach(function(r) {
      return zr(r, o);
    });
  });
  return bh(function() {
    var o = da.get(n);
    if (o) {
      var r = new Set(o), s = new Set(e), a = n.current;
      r.forEach(function(i) {
        s.has(i) || zr(i, null);
      }), s.forEach(function(i) {
        r.has(i) || zr(i, a);
      });
    }
    da.set(n, e);
  }, [e]), n;
}
function Nh(e) {
  return e;
}
function yh(e, t) {
  t === void 0 && (t = Nh);
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
      var l = function() {
        var u = a;
        a = [], u.forEach(s);
      }, c = function() {
        return Promise.resolve().then(l);
      };
      c(), n = {
        push: function(u) {
          a.push(u), c();
        },
        filter: function(u) {
          return a = a.filter(u), n;
        }
      };
    }
  };
  return r;
}
function xh(e) {
  e === void 0 && (e = {});
  var t = yh(null);
  return t.options = Je({ async: !0, ssr: !1 }, e), t;
}
var ac = function(e) {
  var t = e.sideCar, n = ic(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return T.createElement(o, Je({}, n));
};
ac.isSideCarExport = !0;
function wh(e, t) {
  return e.useMedium(t), ac;
}
var lc = xh(), Ur = function() {
}, gr = T.forwardRef(function(e, t) {
  var n = T.useRef(null), o = T.useState({
    onScrollCapture: Ur,
    onWheelCapture: Ur,
    onTouchMoveCapture: Ur
  }), r = o[0], s = o[1], a = e.forwardProps, i = e.children, l = e.className, c = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, p = e.noRelative, h = e.noIsolation, g = e.inert, b = e.allowPinchZoom, v = e.as, N = v === void 0 ? "div" : v, y = e.gapMode, E = ic(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), x = f, w = vh([n, t]), M = Je(Je({}, E), r);
  return T.createElement(
    T.Fragment,
    null,
    u && T.createElement(x, { sideCar: lc, removeScrollBar: c, shards: d, noRelative: p, noIsolation: h, inert: g, setCallbacks: s, allowPinchZoom: !!b, lockRef: n, gapMode: y }),
    a ? T.cloneElement(T.Children.only(i), Je(Je({}, M), { ref: w })) : T.createElement(N, Je({}, M, { className: l, ref: w }), i)
  );
});
gr.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
gr.classNames = {
  fullWidth: Uo,
  zeroRight: zo
};
var kh = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Ch() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = kh();
  return t && e.setAttribute("nonce", t), e;
}
function Eh(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Th(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Sh = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Ch()) && (Eh(t, n), Th(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Mh = function() {
  var e = Sh();
  return function(t, n) {
    T.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, cc = function() {
  var e = Mh(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, Dh = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Yr = function(e) {
  return parseInt(e || "", 10) || 0;
}, Ah = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Yr(n), Yr(o), Yr(r)];
}, Ph = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Dh;
  var t = Ah(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, o - n + t[2] - t[0])
  };
}, Ih = cc(), ln = "data-scroll-locked", Rh = function(e, t, n, o) {
  var r = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(ph, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(i, "px ").concat(o, `;
  }
  body[`).concat(ln, `] {
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
  
  .`).concat(zo, ` {
    right: `).concat(i, "px ").concat(o, `;
  }
  
  .`).concat(Uo, ` {
    margin-right: `).concat(i, "px ").concat(o, `;
  }
  
  .`).concat(zo, " .").concat(zo, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(Uo, " .").concat(Uo, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(ln, `] {
    `).concat(hh, ": ").concat(i, `px;
  }
`);
}, ma = function() {
  var e = parseInt(document.body.getAttribute(ln) || "0", 10);
  return isFinite(e) ? e : 0;
}, Lh = function() {
  T.useEffect(function() {
    return document.body.setAttribute(ln, (ma() + 1).toString()), function() {
      var e = ma() - 1;
      e <= 0 ? document.body.removeAttribute(ln) : document.body.setAttribute(ln, e.toString());
    };
  }, []);
}, Oh = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  Lh();
  var s = T.useMemo(function() {
    return Ph(r);
  }, [r]);
  return T.createElement(Ih, { styles: Rh(s, !t, r, n ? "" : "!important") });
}, ms = !1;
if (typeof window < "u")
  try {
    var So = Object.defineProperty({}, "passive", {
      get: function() {
        return ms = !0, !0;
      }
    });
    window.addEventListener("test", So, So), window.removeEventListener("test", So, So);
  } catch {
    ms = !1;
  }
var Qt = ms ? { passive: !1 } : !1, _h = function(e) {
  return e.tagName === "TEXTAREA";
}, uc = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !_h(e) && n[t] === "visible")
  );
}, $h = function(e) {
  return uc(e, "overflowY");
}, Wh = function(e) {
  return uc(e, "overflowX");
}, fa = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = dc(e, o);
    if (r) {
      var s = mc(e, o), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return !1;
}, Bh = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [
    t,
    n,
    o
  ];
}, Hh = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [
    t,
    n,
    o
  ];
}, dc = function(e, t) {
  return e === "v" ? $h(t) : Wh(t);
}, mc = function(e, t) {
  return e === "v" ? Bh(t) : Hh(t);
}, Fh = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, zh = function(e, t, n, o, r) {
  var s = Fh(e, window.getComputedStyle(t).direction), a = s * o, i = n.target, l = t.contains(i), c = !1, u = a > 0, d = 0, f = 0;
  do {
    if (!i)
      break;
    var p = mc(e, i), h = p[0], g = p[1], b = p[2], v = g - b - s * h;
    (h || v) && dc(e, i) && (d += v, f += h);
    var N = i.parentNode;
    i = N && N.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? N.host : N;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(f) < 1) && (c = !0), c;
}, Mo = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, pa = function(e) {
  return [e.deltaX, e.deltaY];
}, ha = function(e) {
  return e && "current" in e ? e.current : e;
}, Uh = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Yh = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, jh = 0, Jt = [];
function Vh(e) {
  var t = T.useRef([]), n = T.useRef([0, 0]), o = T.useRef(), r = T.useState(jh++)[0], s = T.useState(cc)[0], a = T.useRef(e);
  T.useEffect(function() {
    a.current = e;
  }, [e]), T.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var g = fh([e.lockRef.current], (e.shards || []).map(ha), !0).filter(Boolean);
      return g.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), g.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = T.useCallback(function(g, b) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !a.current.allowPinchZoom;
    var v = Mo(g), N = n.current, y = "deltaX" in g ? g.deltaX : N[0] - v[0], E = "deltaY" in g ? g.deltaY : N[1] - v[1], x, w = g.target, M = Math.abs(y) > Math.abs(E) ? "h" : "v";
    if ("touches" in g && M === "h" && w.type === "range")
      return !1;
    var k = fa(M, w);
    if (!k)
      return !0;
    if (k ? x = M : (x = M === "v" ? "h" : "v", k = fa(M, w)), !k)
      return !1;
    if (!o.current && "changedTouches" in g && (y || E) && (o.current = x), !x)
      return !0;
    var C = o.current || x;
    return zh(C, b, g, C === "h" ? y : E);
  }, []), l = T.useCallback(function(g) {
    var b = g;
    if (!(!Jt.length || Jt[Jt.length - 1] !== s)) {
      var v = "deltaY" in b ? pa(b) : Mo(b), N = t.current.filter(function(x) {
        return x.name === b.type && (x.target === b.target || b.target === x.shadowParent) && Uh(x.delta, v);
      })[0];
      if (N && N.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!N) {
        var y = (a.current.shards || []).map(ha).filter(Boolean).filter(function(x) {
          return x.contains(b.target);
        }), E = y.length > 0 ? i(b, y[0]) : !a.current.noIsolation;
        E && b.cancelable && b.preventDefault();
      }
    }
  }, []), c = T.useCallback(function(g, b, v, N) {
    var y = { name: g, delta: b, target: v, should: N, shadowParent: Kh(v) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(E) {
        return E !== y;
      });
    }, 1);
  }, []), u = T.useCallback(function(g) {
    n.current = Mo(g), o.current = void 0;
  }, []), d = T.useCallback(function(g) {
    c(g.type, pa(g), g.target, i(g, e.lockRef.current));
  }, []), f = T.useCallback(function(g) {
    c(g.type, Mo(g), g.target, i(g, e.lockRef.current));
  }, []);
  T.useEffect(function() {
    return Jt.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, Qt), document.addEventListener("touchmove", l, Qt), document.addEventListener("touchstart", u, Qt), function() {
      Jt = Jt.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", l, Qt), document.removeEventListener("touchmove", l, Qt), document.removeEventListener("touchstart", u, Qt);
    };
  }, []);
  var p = e.removeScrollBar, h = e.inert;
  return T.createElement(
    T.Fragment,
    null,
    h ? T.createElement(s, { styles: Yh(r) }) : null,
    p ? T.createElement(Oh, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Kh(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Gh = wh(lc, Vh);
var fc = T.forwardRef(function(e, t) {
  return T.createElement(gr, Je({}, e, { ref: t, sideCar: Gh }));
});
fc.classNames = gr.classNames;
var fs = ["Enter", " "], qh = ["ArrowDown", "PageUp", "Home"], pc = ["ArrowUp", "PageDown", "End"], Xh = [...qh, ...pc], Zh = {
  ltr: [...fs, "ArrowRight"],
  rtl: [...fs, "ArrowLeft"]
}, Qh = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Qn = "Menu", [jn, Jh, eg] = wl(Qn), [jt, hc] = wn(Qn, [
  eg,
  hr,
  ec
]), br = hr(), gc = ec(), [tg, Vt] = jt(Qn), [ng, Jn] = jt(Qn), bc = (e) => {
  const { __scopeMenu: t, open: n = !1, children: o, dir: r, onOpenChange: s, modal: a = !0 } = e, i = br(t), [l, c] = T.useState(null), u = T.useRef(!1), d = gt(s), f = kl(r);
  return T.useEffect(() => {
    const p = () => {
      u.current = !0, document.addEventListener("pointerdown", h, { capture: !0, once: !0 }), document.addEventListener("pointermove", h, { capture: !0, once: !0 });
    }, h = () => u.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", h, { capture: !0 }), document.removeEventListener("pointermove", h, { capture: !0 });
    };
  }, []), /* @__PURE__ */ F(ql, { ...i, children: /* @__PURE__ */ F(
    tg,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: l,
      onContentChange: c,
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
bc.displayName = Qn;
var og = "MenuAnchor", si = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = br(n);
    return /* @__PURE__ */ F(Xl, { ...r, ...o, ref: t });
  }
);
si.displayName = og;
var ii = "MenuPortal", [rg, vc] = jt(ii, {
  forceMount: void 0
}), Nc = (e) => {
  const { __scopeMenu: t, forceMount: n, children: o, container: r } = e, s = Vt(ii, t);
  return /* @__PURE__ */ F(rg, { scope: t, forceMount: n, children: /* @__PURE__ */ F(Yt, { present: n || s.open, children: /* @__PURE__ */ F(ri, { asChild: !0, container: r, children: o }) }) });
};
Nc.displayName = ii;
var je = "MenuContent", [sg, ai] = jt(je), yc = T.forwardRef(
  (e, t) => {
    const n = vc(je, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, s = Vt(je, e.__scopeMenu), a = Jn(je, e.__scopeMenu);
    return /* @__PURE__ */ F(jn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ F(Yt, { present: o || s.open, children: /* @__PURE__ */ F(jn.Slot, { scope: e.__scopeMenu, children: a.modal ? /* @__PURE__ */ F(ig, { ...r, ref: t }) : /* @__PURE__ */ F(ag, { ...r, ref: t }) }) }) });
  }
), ig = T.forwardRef(
  (e, t) => {
    const n = Vt(je, e.__scopeMenu), o = T.useRef(null), r = Pe(t, o);
    return T.useEffect(() => {
      const s = o.current;
      if (s) return mh(s);
    }, []), /* @__PURE__ */ F(
      li,
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
  const n = Vt(je, e.__scopeMenu);
  return /* @__PURE__ */ F(
    li,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), lg = /* @__PURE__ */ zn("MenuContent.ScrollLock"), li = T.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: o = !1,
      trapFocus: r,
      onOpenAutoFocus: s,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: i,
      onEntryFocus: l,
      onEscapeKeyDown: c,
      onPointerDownOutside: u,
      onFocusOutside: d,
      onInteractOutside: f,
      onDismiss: p,
      disableOutsideScroll: h,
      ...g
    } = e, b = Vt(je, n), v = Jn(je, n), N = br(n), y = gc(n), E = Jh(n), [x, w] = T.useState(null), M = T.useRef(null), k = Pe(t, M, b.onContentChange), C = T.useRef(0), S = T.useRef(""), D = T.useRef(0), A = T.useRef(null), R = T.useRef("right"), L = T.useRef(0), _ = h ? fc : T.Fragment, O = h ? { as: lg, allowPinchZoom: !0 } : void 0, U = (P) => {
      const W = S.current + P, K = E().filter((z) => !z.disabled), V = document.activeElement, G = K.find((z) => z.ref.current === V)?.textValue, Q = K.map((z) => z.textValue), B = yg(Q, W, G), $ = K.find((z) => z.textValue === B)?.ref.current;
      (function z(Z) {
        S.current = Z, window.clearTimeout(C.current), Z !== "" && (C.current = window.setTimeout(() => z(""), 1e3));
      })(W), $ && setTimeout(() => $.focus());
    };
    T.useEffect(() => () => window.clearTimeout(C.current), []), vf();
    const I = T.useCallback((P) => R.current === A.current?.side && wg(P, A.current?.area), []);
    return /* @__PURE__ */ F(
      sg,
      {
        scope: n,
        searchRef: S,
        onItemEnter: T.useCallback(
          (P) => {
            I(P) && P.preventDefault();
          },
          [I]
        ),
        onItemLeave: T.useCallback(
          (P) => {
            I(P) || (M.current?.focus(), w(null));
          },
          [I]
        ),
        onTriggerLeave: T.useCallback(
          (P) => {
            I(P) && P.preventDefault();
          },
          [I]
        ),
        pointerGraceTimerRef: D,
        onPointerGraceIntentChange: T.useCallback((P) => {
          A.current = P;
        }, []),
        children: /* @__PURE__ */ F(_, { ...O, children: /* @__PURE__ */ F(
          Tl,
          {
            asChild: !0,
            trapped: r,
            onMountAutoFocus: se(s, (P) => {
              P.preventDefault(), M.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: a,
            children: /* @__PURE__ */ F(
              qs,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: c,
                onPointerDownOutside: u,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: p,
                children: /* @__PURE__ */ F(
                  ah,
                  {
                    asChild: !0,
                    ...y,
                    dir: v.dir,
                    orientation: "vertical",
                    loop: o,
                    currentTabStopId: x,
                    onCurrentTabStopIdChange: w,
                    onEntryFocus: se(l, (P) => {
                      v.isUsingKeyboardRef.current || P.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ F(
                      Zl,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": _c(b.open),
                        "data-radix-menu-content": "",
                        dir: v.dir,
                        ...N,
                        ...g,
                        ref: k,
                        style: { outline: "none", ...g.style },
                        onKeyDown: se(g.onKeyDown, (P) => {
                          const K = P.target.closest("[data-radix-menu-content]") === P.currentTarget, V = P.ctrlKey || P.altKey || P.metaKey, G = P.key.length === 1;
                          K && (P.key === "Tab" && P.preventDefault(), !V && G && U(P.key));
                          const Q = M.current;
                          if (P.target !== Q || !Xh.includes(P.key)) return;
                          P.preventDefault();
                          const $ = E().filter((z) => !z.disabled).map((z) => z.ref.current);
                          pc.includes(P.key) && $.reverse(), vg($);
                        }),
                        onBlur: se(e.onBlur, (P) => {
                          P.currentTarget.contains(P.target) || (window.clearTimeout(C.current), S.current = "");
                        }),
                        onPointerMove: se(
                          e.onPointerMove,
                          Vn((P) => {
                            const W = P.target, K = L.current !== P.clientX;
                            if (P.currentTarget.contains(W) && K) {
                              const V = P.clientX > L.current ? "right" : "left";
                              R.current = V, L.current = P.clientX;
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
yc.displayName = je;
var cg = "MenuGroup", ci = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ F(Me.div, { role: "group", ...o, ref: t });
  }
);
ci.displayName = cg;
var ug = "MenuLabel", xc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ F(Me.div, { ...o, ref: t });
  }
);
xc.displayName = ug;
var Qo = "MenuItem", ga = "menu.itemSelect", vr = T.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: o, ...r } = e, s = T.useRef(null), a = Jn(Qo, e.__scopeMenu), i = ai(Qo, e.__scopeMenu), l = Pe(t, s), c = T.useRef(!1), u = () => {
      const d = s.current;
      if (!n && d) {
        const f = new CustomEvent(ga, { bubbles: !0, cancelable: !0 });
        d.addEventListener(ga, (p) => o?.(p), { once: !0 }), xl(d, f), f.defaultPrevented ? c.current = !1 : a.onClose();
      }
    };
    return /* @__PURE__ */ F(
      wc,
      {
        ...r,
        ref: l,
        disabled: n,
        onClick: se(e.onClick, u),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), c.current = !0;
        },
        onPointerUp: se(e.onPointerUp, (d) => {
          c.current || d.currentTarget?.click();
        }),
        onKeyDown: se(e.onKeyDown, (d) => {
          const f = i.searchRef.current !== "";
          n || f && d.key === " " || fs.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
vr.displayName = Qo;
var wc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: o = !1, textValue: r, ...s } = e, a = ai(Qo, n), i = gc(n), l = T.useRef(null), c = Pe(t, l), [u, d] = T.useState(!1), [f, p] = T.useState("");
    return T.useEffect(() => {
      const h = l.current;
      h && p((h.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ F(
      jn.ItemSlot,
      {
        scope: n,
        disabled: o,
        textValue: r ?? f,
        children: /* @__PURE__ */ F(lh, { asChild: !0, ...i, focusable: !o, children: /* @__PURE__ */ F(
          Me.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": o || void 0,
            "data-disabled": o ? "" : void 0,
            ...s,
            ref: c,
            onPointerMove: se(
              e.onPointerMove,
              Vn((h) => {
                o ? a.onItemLeave(h) : (a.onItemEnter(h), h.defaultPrevented || h.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: se(
              e.onPointerLeave,
              Vn((h) => a.onItemLeave(h))
            ),
            onFocus: se(e.onFocus, () => d(!0)),
            onBlur: se(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), dg = "MenuCheckboxItem", kc = T.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: o, ...r } = e;
    return /* @__PURE__ */ F(Mc, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ F(
      vr,
      {
        role: "menuitemcheckbox",
        "aria-checked": Jo(n) ? "mixed" : n,
        ...r,
        ref: t,
        "data-state": di(n),
        onSelect: se(
          r.onSelect,
          () => o?.(Jo(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
kc.displayName = dg;
var Cc = "MenuRadioGroup", [mg, fg] = jt(
  Cc,
  { value: void 0, onValueChange: () => {
  } }
), Ec = T.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: o, ...r } = e, s = gt(o);
    return /* @__PURE__ */ F(mg, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ F(ci, { ...r, ref: t }) });
  }
);
Ec.displayName = Cc;
var Tc = "MenuRadioItem", Sc = T.forwardRef(
  (e, t) => {
    const { value: n, ...o } = e, r = fg(Tc, e.__scopeMenu), s = n === r.value;
    return /* @__PURE__ */ F(Mc, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ F(
      vr,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...o,
        ref: t,
        "data-state": di(s),
        onSelect: se(
          o.onSelect,
          () => r.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Sc.displayName = Tc;
var ui = "MenuItemIndicator", [Mc, pg] = jt(
  ui,
  { checked: !1 }
), Dc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: o, ...r } = e, s = pg(ui, n);
    return /* @__PURE__ */ F(
      Yt,
      {
        present: o || Jo(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ F(
          Me.span,
          {
            ...r,
            ref: t,
            "data-state": di(s.checked)
          }
        )
      }
    );
  }
);
Dc.displayName = ui;
var hg = "MenuSeparator", Ac = T.forwardRef(
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
Ac.displayName = hg;
var gg = "MenuArrow", Pc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = br(n);
    return /* @__PURE__ */ F(Ql, { ...r, ...o, ref: t });
  }
);
Pc.displayName = gg;
var bg = "MenuSub", [uk, Ic] = jt(bg), On = "MenuSubTrigger", Rc = T.forwardRef(
  (e, t) => {
    const n = Vt(On, e.__scopeMenu), o = Jn(On, e.__scopeMenu), r = Ic(On, e.__scopeMenu), s = ai(On, e.__scopeMenu), a = T.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = s, c = { __scopeMenu: e.__scopeMenu }, u = T.useCallback(() => {
      a.current && window.clearTimeout(a.current), a.current = null;
    }, []);
    return T.useEffect(() => u, [u]), T.useEffect(() => {
      const d = i.current;
      return () => {
        window.clearTimeout(d), l(null);
      };
    }, [i, l]), /* @__PURE__ */ F(si, { asChild: !0, ...c, children: /* @__PURE__ */ F(
      wc,
      {
        id: r.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": r.contentId,
        "data-state": _c(n.open),
        ...e,
        ref: ur(t, r.onTriggerChange),
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
              const p = n.content?.dataset.side, h = p === "right", g = h ? -5 : 5, b = f[h ? "left" : "right"], v = f[h ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + g, y: d.clientY },
                  { x: b, y: f.top },
                  { x: v, y: f.top },
                  { x: v, y: f.bottom },
                  { x: b, y: f.bottom }
                ],
                side: p
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
          e.disabled || f && d.key === " " || Zh[o.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
Rc.displayName = On;
var Lc = "MenuSubContent", Oc = T.forwardRef(
  (e, t) => {
    const n = vc(je, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, s = Vt(je, e.__scopeMenu), a = Jn(je, e.__scopeMenu), i = Ic(Lc, e.__scopeMenu), l = T.useRef(null), c = Pe(t, l);
    return /* @__PURE__ */ F(jn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ F(Yt, { present: o || s.open, children: /* @__PURE__ */ F(jn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ F(
      li,
      {
        id: i.contentId,
        "aria-labelledby": i.triggerId,
        ...r,
        ref: c,
        align: "start",
        side: a.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (u) => {
          a.isUsingKeyboardRef.current && l.current?.focus(), u.preventDefault();
        },
        onCloseAutoFocus: (u) => u.preventDefault(),
        onFocusOutside: se(e.onFocusOutside, (u) => {
          u.target !== i.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: se(e.onEscapeKeyDown, (u) => {
          a.onClose(), u.preventDefault();
        }),
        onKeyDown: se(e.onKeyDown, (u) => {
          const d = u.currentTarget.contains(u.target), f = Qh[a.dir].includes(u.key);
          d && f && (s.onOpenChange(!1), i.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
Oc.displayName = Lc;
function _c(e) {
  return e ? "open" : "closed";
}
function Jo(e) {
  return e === "indeterminate";
}
function di(e) {
  return Jo(e) ? "indeterminate" : e ? "checked" : "unchecked";
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
  const r = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = Ng(e, Math.max(s, 0));
  r.length === 1 && (a = a.filter((c) => c !== n));
  const l = a.find(
    (c) => c.toLowerCase().startsWith(r.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function xg(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], c = i.x, u = i.y, d = l.x, f = l.y;
    u > o != f > o && n < (d - c) * (o - u) / (f - u) + c && (r = !r);
  }
  return r;
}
function wg(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return xg(n, t);
}
function Vn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var kg = bc, Cg = si, Eg = Nc, Tg = yc, Sg = ci, Mg = xc, Dg = vr, Ag = kc, Pg = Ec, Ig = Sc, Rg = Dc, Lg = Ac, Og = Pc, _g = Rc, $g = Oc, Nr = "DropdownMenu", [Wg] = wn(
  Nr,
  [hc]
), Le = hc(), [Bg, $c] = Wg(Nr), Wc = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: o,
    open: r,
    defaultOpen: s,
    onOpenChange: a,
    modal: i = !0
  } = e, l = Le(t), c = T.useRef(null), [u, d] = Gs({
    prop: r,
    defaultProp: s ?? !1,
    onChange: a,
    caller: Nr
  });
  return /* @__PURE__ */ F(
    Bg,
    {
      scope: t,
      triggerId: Ko(),
      triggerRef: c,
      contentId: Ko(),
      open: u,
      onOpenChange: d,
      onOpenToggle: T.useCallback(() => d((f) => !f), [d]),
      modal: i,
      children: /* @__PURE__ */ F(kg, { ...l, open: u, onOpenChange: d, dir: o, modal: i, children: n })
    }
  );
};
Wc.displayName = Nr;
var Bc = "DropdownMenuTrigger", Hc = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: o = !1, ...r } = e, s = $c(Bc, n), a = Le(n);
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
        ref: ur(t, s.triggerRef),
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
Hc.displayName = Bc;
var Hg = "DropdownMenuPortal", Fc = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, o = Le(t);
  return /* @__PURE__ */ F(Eg, { ...o, ...n });
};
Fc.displayName = Hg;
var zc = "DropdownMenuContent", Uc = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = $c(zc, n), s = Le(n), a = T.useRef(!1);
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
          const l = i.detail.originalEvent, c = l.button === 0 && l.ctrlKey === !0, u = l.button === 2 || c;
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
Uc.displayName = zc;
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
var jg = "DropdownMenuItem", Yc = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ F(Dg, { ...r, ...o, ref: t });
  }
);
Yc.displayName = jg;
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
var eb = "DropdownMenuSeparator", jc = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(Lg, { ...r, ...o, ref: t });
});
jc.displayName = eb;
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
var ab = Wc, lb = Hc, cb = Fc, ub = Uc, db = Yc, mb = jc;
function Vc(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = Vc(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function Kc() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = Vc(e)) && (o && (o += " "), o += t);
  return o;
}
const mi = "-", fb = (e) => {
  const t = hb(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(mi);
      return i[0] === "" && i.length !== 1 && i.shift(), Gc(i, t) || pb(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const l = n[a] || [];
      return i && o[a] ? [...l, ...o[a]] : l;
    }
  };
}, Gc = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], o = t.nextPart.get(n), r = o ? Gc(e.slice(1), o) : void 0;
  if (r)
    return r;
  if (t.validators.length === 0)
    return;
  const s = e.join(mi);
  return t.validators.find(({
    validator: a
  }) => a(s))?.classGroupId;
}, ba = /^\[(.+)\]$/, pb = (e) => {
  if (ba.test(e)) {
    const t = ba.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, hb = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const r in n)
    ps(n[r], o, r, t);
  return o;
}, ps = (e, t, n, o) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const s = r === "" ? t : va(t, r);
      s.classGroupId = n;
      return;
    }
    if (typeof r == "function") {
      if (gb(r)) {
        ps(r(o), t, n, o);
        return;
      }
      t.validators.push({
        validator: r,
        classGroupId: n
      });
      return;
    }
    Object.entries(r).forEach(([s, a]) => {
      ps(a, va(t, s), n, o);
    });
  });
}, va = (e, t) => {
  let n = e;
  return t.split(mi).forEach((o) => {
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
}, hs = "!", gs = ":", vb = gs.length, Nb = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const s = [];
    let a = 0, i = 0, l = 0, c;
    for (let h = 0; h < r.length; h++) {
      let g = r[h];
      if (a === 0 && i === 0) {
        if (g === gs) {
          s.push(r.slice(l, h)), l = h + vb;
          continue;
        }
        if (g === "/") {
          c = h;
          continue;
        }
      }
      g === "[" ? a++ : g === "]" ? a-- : g === "(" ? i++ : g === ")" && i--;
    }
    const u = s.length === 0 ? r : r.substring(l), d = yb(u), f = d !== u, p = c && c > l ? c - l : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: d,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const r = t + gs, s = o;
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
}, yb = (e) => e.endsWith(hs) ? e.substring(0, e.length - 1) : e.startsWith(hs) ? e.substring(1) : e, xb = (e) => {
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
}, wb = (e) => ({
  cache: bb(e.cacheSize),
  parseClassName: Nb(e),
  sortModifiers: xb(e),
  ...fb(e)
}), kb = /\s+/, Cb = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: s
  } = t, a = [], i = e.trim().split(kb);
  let l = "";
  for (let c = i.length - 1; c >= 0; c -= 1) {
    const u = i[c], {
      isExternal: d,
      modifiers: f,
      hasImportantModifier: p,
      baseClassName: h,
      maybePostfixModifierPosition: g
    } = n(u);
    if (d) {
      l = u + (l.length > 0 ? " " + l : l);
      continue;
    }
    let b = !!g, v = o(b ? h.substring(0, g) : h);
    if (!v) {
      if (!b) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (v = o(h), !v) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      b = !1;
    }
    const N = s(f).join(":"), y = p ? N + hs : N, E = y + v;
    if (a.includes(E))
      continue;
    a.push(E);
    const x = r(v, b);
    for (let w = 0; w < x.length; ++w) {
      const M = x[w];
      a.push(y + M);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function Eb() {
  let e = 0, t, n, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = qc(t)) && (o && (o += " "), o += n);
  return o;
}
const qc = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = qc(e[o])) && (n && (n += " "), n += t);
  return n;
};
function Tb(e, ...t) {
  let n, o, r, s = a;
  function a(l) {
    const c = t.reduce((u, d) => d(u), e());
    return n = wb(c), o = n.cache.get, r = n.cache.set, s = i, i(l);
  }
  function i(l) {
    const c = o(l);
    if (c)
      return c;
    const u = Cb(l, n);
    return r(l, u), u;
  }
  return function() {
    return s(Eb.apply(null, arguments));
  };
}
const we = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Xc = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Zc = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Sb = /^\d+\/\d+$/, Mb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Db = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ab = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Pb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ib = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, en = (e) => Sb.test(e), ae = (e) => !!e && !Number.isNaN(Number(e)), Ct = (e) => !!e && Number.isInteger(Number(e)), jr = (e) => e.endsWith("%") && ae(e.slice(0, -1)), ct = (e) => Mb.test(e), Rb = () => !0, Lb = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Db.test(e) && !Ab.test(e)
), Qc = () => !1, Ob = (e) => Pb.test(e), _b = (e) => Ib.test(e), $b = (e) => !J(e) && !ee(e), Wb = (e) => En(e, tu, Qc), J = (e) => Xc.test(e), _t = (e) => En(e, nu, Lb), Vr = (e) => En(e, Ub, ae), Na = (e) => En(e, Jc, Qc), Bb = (e) => En(e, eu, _b), Do = (e) => En(e, ou, Ob), ee = (e) => Zc.test(e), In = (e) => Tn(e, nu), Hb = (e) => Tn(e, Yb), ya = (e) => Tn(e, Jc), Fb = (e) => Tn(e, tu), zb = (e) => Tn(e, eu), Ao = (e) => Tn(e, ou, !0), En = (e, t, n) => {
  const o = Xc.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, Tn = (e, t, n = !1) => {
  const o = Zc.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, Jc = (e) => e === "position" || e === "percentage", eu = (e) => e === "image" || e === "url", tu = (e) => e === "length" || e === "size" || e === "bg-size", nu = (e) => e === "length", Ub = (e) => e === "number", Yb = (e) => e === "family-name", ou = (e) => e === "shadow", jb = () => {
  const e = we("color"), t = we("font"), n = we("text"), o = we("font-weight"), r = we("tracking"), s = we("leading"), a = we("breakpoint"), i = we("container"), l = we("spacing"), c = we("radius"), u = we("shadow"), d = we("inset-shadow"), f = we("text-shadow"), p = we("drop-shadow"), h = we("blur"), g = we("perspective"), b = we("aspect"), v = we("ease"), N = we("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], E = () => [
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
  ], x = () => [...E(), ee, J], w = () => ["auto", "hidden", "clip", "visible", "scroll"], M = () => ["auto", "contain", "none"], k = () => [ee, J, l], C = () => [en, "full", "auto", ...k()], S = () => [Ct, "none", "subgrid", ee, J], D = () => ["auto", {
    span: ["full", Ct, ee, J]
  }, Ct, ee, J], A = () => [Ct, "auto", ee, J], R = () => ["auto", "min", "max", "fr", ee, J], L = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], _ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], O = () => ["auto", ...k()], U = () => [en, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], I = () => [e, ee, J], P = () => [...E(), ya, Na, {
    position: [ee, J]
  }], W = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], K = () => ["auto", "cover", "contain", Fb, Wb, {
    size: [ee, J]
  }], V = () => [jr, In, _t], G = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    ee,
    J
  ], Q = () => ["", ae, In, _t], B = () => ["solid", "dashed", "dotted", "double"], $ = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], z = () => [ae, jr, ya, Na], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    ee,
    J
  ], ce = () => ["none", ae, ee, J], ue = () => ["none", ae, ee, J], ve = () => [ae, ee, J], Ee = () => [en, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ct],
      breakpoint: [ct],
      color: [Rb],
      container: [ct],
      "drop-shadow": [ct],
      ease: ["in", "out", "in-out"],
      font: [$b],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ct],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ct],
      shadow: [ct],
      spacing: ["px", ae],
      text: [ct],
      "text-shadow": [ct],
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
        object: x()
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
        overscroll: M()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": M()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": M()
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
        basis: [en, "full", "auto", i, ...k()]
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
        "grid-cols": S()
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
        "grid-rows": S()
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
        justify: [...L(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [..._(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ..._()]
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
        items: [..._(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ..._(), {
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
        "place-items": [..._(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ..._()]
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
        size: U()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [i, "screen", ...U()]
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
          ...U()
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
        font: [o, ee, Vr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", jr, J]
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
        "line-clamp": [ae, "none", ee, Vr]
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
        bg: P()
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
        "mix-blend": [...$(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": $()
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
        mask: P()
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
          p,
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
        rotate: ce()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ce()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ce()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ce()
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
        fill: ["none", ...I()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ae, In, _t, Vr]
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
  return Vb(Kc(e));
}
function Kr({
  ...e
}) {
  return /* @__PURE__ */ m(ab, { "data-slot": "dropdown-menu", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/ui/dropdown-menu.tsx",
    lineNumber: 10,
    columnNumber: 10
  }, this);
}
function Gr({
  ...e
}) {
  return /* @__PURE__ */ m(
    lb,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 25,
      columnNumber: 5
    },
    this
  );
}
function qr({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ m(cb, { children: /* @__PURE__ */ m(
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
      fileName: "/home/ubuntu/paragon/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 39,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/ui/dropdown-menu.tsx",
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
      fileName: "/home/ubuntu/paragon/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 70,
      columnNumber: 5
    },
    this
  );
}
function Xr({
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
      fileName: "/home/ubuntu/paragon/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 169,
      columnNumber: 5
    },
    this
  );
}
const xa = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, wa = Kc, Kb = (e, t) => (n) => {
  var o;
  if (t?.variants == null) return wa(e, n?.class, n?.className);
  const { variants: r, defaultVariants: s } = t, a = Object.keys(r).map((c) => {
    const u = n?.[c], d = s?.[c];
    if (u === null) return null;
    const f = xa(u) || xa(d);
    return r[c][f];
  }), i = n && Object.entries(n).reduce((c, u) => {
    let [d, f] = u;
    return f === void 0 || (c[d] = f), c;
  }, {}), l = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((c, u) => {
    let { class: d, className: f, ...p } = u;
    return Object.entries(p).every((h) => {
      let [g, b] = h;
      return Array.isArray(b) ? b.includes({
        ...s,
        ...i
      }[g]) : {
        ...s,
        ...i
      }[g] === b;
    }) ? [
      ...c,
      d,
      f
    ] : c;
  }, []);
  return wa(e, a, l, n?.class, n?.className);
}, bs = Kb(
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
      className: re(bs({ variant: t, size: n, className: e })),
      ...r
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/ui/button.tsx",
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
}), qb = "VisuallyHidden", ru = T.forwardRef(
  (e, t) => /* @__PURE__ */ F(
    Me.span,
    {
      ...e,
      ref: t,
      style: { ...Gb, ...e.style }
    }
  )
);
ru.displayName = qb;
var Xb = ru, [yr] = wn("Tooltip", [
  hr
]), xr = hr(), su = "TooltipProvider", Zb = 700, vs = "tooltip.open", [Qb, fi] = yr(su), iu = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = Zb,
    skipDelayDuration: o = 300,
    disableHoverableContent: r = !1,
    children: s
  } = e, a = T.useRef(!0), i = T.useRef(!1), l = T.useRef(0);
  return T.useEffect(() => {
    const c = l.current;
    return () => window.clearTimeout(c);
  }, []), /* @__PURE__ */ F(
    Qb,
    {
      scope: t,
      isOpenDelayedRef: a,
      delayDuration: n,
      onOpen: T.useCallback(() => {
        window.clearTimeout(l.current), a.current = !1;
      }, []),
      onClose: T.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => a.current = !0,
          o
        );
      }, [o]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: T.useCallback((c) => {
        i.current = c;
      }, []),
      disableHoverableContent: r,
      children: s
    }
  );
};
iu.displayName = su;
var Kn = "Tooltip", [Jb, eo] = yr(Kn), au = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: i
  } = e, l = fi(Kn, e.__scopeTooltip), c = xr(t), [u, d] = T.useState(null), f = Ko(), p = T.useRef(0), h = a ?? l.disableHoverableContent, g = i ?? l.delayDuration, b = T.useRef(!1), [v, N] = Gs({
    prop: o,
    defaultProp: r ?? !1,
    onChange: (M) => {
      M ? (l.onOpen(), document.dispatchEvent(new CustomEvent(vs))) : l.onClose(), s?.(M);
    },
    caller: Kn
  }), y = T.useMemo(() => v ? b.current ? "delayed-open" : "instant-open" : "closed", [v]), E = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, b.current = !1, N(!0);
  }, [N]), x = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, N(!1);
  }, [N]), w = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      b.current = !0, N(!0), p.current = 0;
    }, g);
  }, [g, N]);
  return T.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ F(ql, { ...c, children: /* @__PURE__ */ F(
    Jb,
    {
      scope: t,
      contentId: f,
      open: v,
      stateAttribute: y,
      trigger: u,
      onTriggerChange: d,
      onTriggerEnter: T.useCallback(() => {
        l.isOpenDelayedRef.current ? w() : E();
      }, [l.isOpenDelayedRef, w, E]),
      onTriggerLeave: T.useCallback(() => {
        h ? x() : (window.clearTimeout(p.current), p.current = 0);
      }, [x, h]),
      onOpen: E,
      onClose: x,
      disableHoverableContent: h,
      children: n
    }
  ) });
};
au.displayName = Kn;
var Ns = "TooltipTrigger", lu = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = eo(Ns, n), s = fi(Ns, n), a = xr(n), i = T.useRef(null), l = Pe(t, i, r.onTriggerChange), c = T.useRef(!1), u = T.useRef(!1), d = T.useCallback(() => c.current = !1, []);
    return T.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ F(Xl, { asChild: !0, ...a, children: /* @__PURE__ */ F(
      Me.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...o,
        ref: l,
        onPointerMove: se(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !u.current && !s.isPointerInTransitRef.current && (r.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: se(e.onPointerLeave, () => {
          r.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: se(e.onPointerDown, () => {
          r.open && r.onClose(), c.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: se(e.onFocus, () => {
          c.current || r.onOpen();
        }),
        onBlur: se(e.onBlur, r.onClose),
        onClick: se(e.onClick, r.onClose)
      }
    ) });
  }
);
lu.displayName = Ns;
var pi = "TooltipPortal", [ev, tv] = yr(pi, {
  forceMount: void 0
}), cu = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, s = eo(pi, t);
  return /* @__PURE__ */ F(ev, { scope: t, forceMount: n, children: /* @__PURE__ */ F(Yt, { present: n || s.open, children: /* @__PURE__ */ F(ri, { asChild: !0, container: r, children: o }) }) });
};
cu.displayName = pi;
var gn = "TooltipContent", uu = T.forwardRef(
  (e, t) => {
    const n = tv(gn, e.__scopeTooltip), { forceMount: o = n.forceMount, side: r = "top", ...s } = e, a = eo(gn, e.__scopeTooltip);
    return /* @__PURE__ */ F(Yt, { present: o || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ F(du, { side: r, ...s, ref: t }) : /* @__PURE__ */ F(nv, { side: r, ...s, ref: t }) });
  }
), nv = T.forwardRef((e, t) => {
  const n = eo(gn, e.__scopeTooltip), o = fi(gn, e.__scopeTooltip), r = T.useRef(null), s = Pe(t, r), [a, i] = T.useState(null), { trigger: l, onClose: c } = n, u = r.current, { onPointerInTransitChange: d } = o, f = T.useCallback(() => {
    i(null), d(!1);
  }, [d]), p = T.useCallback(
    (h, g) => {
      const b = h.currentTarget, v = { x: h.clientX, y: h.clientY }, N = iv(v, b.getBoundingClientRect()), y = av(v, N), E = lv(g.getBoundingClientRect()), x = uv([...y, ...E]);
      i(x), d(!0);
    },
    [d]
  );
  return T.useEffect(() => () => f(), [f]), T.useEffect(() => {
    if (l && u) {
      const h = (b) => p(b, u), g = (b) => p(b, l);
      return l.addEventListener("pointerleave", h), u.addEventListener("pointerleave", g), () => {
        l.removeEventListener("pointerleave", h), u.removeEventListener("pointerleave", g);
      };
    }
  }, [l, u, p, f]), T.useEffect(() => {
    if (a) {
      const h = (g) => {
        const b = g.target, v = { x: g.clientX, y: g.clientY }, N = l?.contains(b) || u?.contains(b), y = !cv(v, a);
        N ? f() : y && (f(), c());
      };
      return document.addEventListener("pointermove", h), () => document.removeEventListener("pointermove", h);
    }
  }, [l, u, a, c, f]), /* @__PURE__ */ F(du, { ...e, ref: s });
}), [ov, rv] = yr(Kn, { isInside: !1 }), sv = /* @__PURE__ */ of("TooltipContent"), du = T.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: o,
      "aria-label": r,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...i
    } = e, l = eo(gn, n), c = xr(n), { onClose: u } = l;
    return T.useEffect(() => (document.addEventListener(vs, u), () => document.removeEventListener(vs, u)), [u]), T.useEffect(() => {
      if (l.trigger) {
        const d = (f) => {
          f.target?.contains(l.trigger) && u();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [l.trigger, u]), /* @__PURE__ */ F(
      qs,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ vm(
          Zl,
          {
            "data-state": l.stateAttribute,
            ...c,
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
              /* @__PURE__ */ F(ov, { scope: n, isInside: !0, children: /* @__PURE__ */ F(Xb, { id: l.contentId, role: "tooltip", children: r || o }) })
            ]
          }
        )
      }
    );
  }
);
uu.displayName = gn;
var mu = "TooltipArrow", fu = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = xr(n);
    return rv(
      mu,
      n
    ).isInside ? null : /* @__PURE__ */ F(Ql, { ...r, ...o, ref: t });
  }
);
fu.displayName = mu;
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
function lv(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: o },
    { x: r, y: o }
  ];
}
function cv(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], c = i.x, u = i.y, d = l.x, f = l.y;
    u > o != f > o && n < (d - c) * (o - u) / (f - u) + c && (r = !r);
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
var mv = iu, fv = au, pv = lu, hv = cu, gv = uu, bv = fu;
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
      fileName: "/home/ubuntu/paragon/client/src/components/ui/tooltip.tsx",
      lineNumber: 11,
      columnNumber: 5
    },
    this
  );
}
function ys({
  ...e
}) {
  return /* @__PURE__ */ m(vv, { children: /* @__PURE__ */ m(fv, { "data-slot": "tooltip", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/ui/tooltip.tsx",
    lineNumber: 24,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/ui/tooltip.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
function xs({
  ...e
}) {
  return /* @__PURE__ */ m(pv, { "data-slot": "tooltip-trigger", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/ui/tooltip.tsx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
function ws({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...o
}) {
  return /* @__PURE__ */ m(hv, { children: /* @__PURE__ */ m(
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
          fileName: "/home/ubuntu/paragon/client/src/components/ui/tooltip.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/ui/tooltip.tsx",
      lineNumber: 43,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/ui/tooltip.tsx",
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
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 100,
      columnNumber: 5
    },
    void 0
  );
  return r ? /* @__PURE__ */ m(ys, { children: [
    /* @__PURE__ */ m(xs, { asChild: !0, children: s }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 120,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ m(ws, { side: "bottom", className: "text-xs", children: r }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 121,
      columnNumber: 9
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 119,
    columnNumber: 7
  }, void 0) : s;
}, tn = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }, void 0, !1, {
  fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
  lineNumber: 132,
  columnNumber: 3
}, void 0), Nv = vn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: o, className: r = "", autoReorderChecklist: s = !1, aiEnabled: a = !1, onAISparklesClick: i }) {
  const l = j(null), [c, u] = Y(!1), [d, f] = Y(void 0), p = tl({
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
  }), h = H(() => {
    const { view: w } = t, { from: M } = w.state.selection, k = w.coordsAtPos(M);
    f({ top: k.bottom + 8, left: k.left }), u(!0);
  }, [t]), g = H((w, M) => {
    t.chain().focus().setImage({ src: w, alt: M }).run(), u(!1);
  }, [t]), b = H(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), v = H((w) => {
    t.chain().focus().insertCallout({ type: w }).run();
  }, [t]), N = j(/* @__PURE__ */ new Map()), y = j(/* @__PURE__ */ new Map()), E = H((w) => {
    const { doc: M, tr: k } = w.state;
    let C = !1;
    const S = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), D = w.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    N.current.clear(), D.forEach((R, L) => {
      R.querySelectorAll(":scope > li").forEach((O) => {
        const U = O, I = (U.textContent || "").trim().substring(0, 50);
        N.current.set(`${L}-${I}`, U.getBoundingClientRect());
      });
    });
    const A = [];
    M.descendants((R, L, _, O) => {
      if (!S.has(R.type.name)) return !0;
      let U = !1;
      if (R.forEach((P) => {
        P.type.name === "taskItem" && (U = !0);
      }), !U) return !0;
      let I = 0;
      return M.nodesBetween(0, L, (P) => (S.has(P.type.name) && I++, !0)), A.push({ node: R, pos: L, depth: I }), !0;
    }), A.sort((R, L) => L.depth - R.depth);
    for (const { node: R, pos: L } of A) {
      const _ = [];
      let O = 0;
      R.forEach((B) => {
        _.push({
          node: B,
          isTask: B.type.name === "taskItem",
          checked: B.type.name === "taskItem" && B.attrs.checked === !0,
          originalIndex: O++
        });
      });
      const U = _.filter((B) => B.isTask && !B.checked), I = _.filter((B) => B.isTask && B.checked), P = [..._], W = _.map((B, $) => ({ index: $, isTask: B.isTask })).filter((B) => B.isTask).map((B) => B.index), K = [...U, ...I];
      if (W.forEach((B, $) => {
        P[B] = K[$];
      }), !P.some((B, $) => B.node !== _[$].node)) continue;
      const G = R.type.create(
        R.attrs,
        P.map((B) => B.node)
      ), Q = k.mapping.map(L);
      k.replaceWith(Q, Q + R.nodeSize, G), C = !0;
    }
    C && (w.view.dispatch(k), requestAnimationFrame(() => {
      w.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((L) => {
        const _ = L.querySelectorAll(":scope > li"), O = /* @__PURE__ */ new Map();
        N.current.forEach((U, I) => {
          const P = I.replace(/^\d+-/, "");
          O.set(P, U);
        }), _.forEach((U) => {
          const I = U, P = (I.textContent || "").trim().substring(0, 50), W = O.get(P);
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
    const w = /* @__PURE__ */ new Map();
    t.state.doc.descendants((k, C) => (k.type.name === "taskItem" && w.set(C, k.attrs.checked === !0), !0)), y.current = w;
    const M = ({ transaction: k }) => {
      if (!k.docChanged) return;
      const C = /* @__PURE__ */ new Map();
      t.state.doc.descendants((A, R) => (A.type.name === "taskItem" && C.set(R, A.attrs.checked === !0), !0));
      const S = y.current;
      let D = !1;
      if (S.size > 0 && C.size > 0) {
        let A = 0, R = 0;
        S.forEach((L) => {
          L && A++;
        }), C.forEach((L) => {
          L && R++;
        }), A !== R && (D = !0);
      }
      y.current = C, D && setTimeout(() => {
        E(t);
      }, 150);
    };
    return t.on("transaction", M), () => {
      t.off("transaction", M);
    };
  }, [t, s, E]);
  const x = H(() => {
    E(t);
  }, [t, E]);
  return /* @__PURE__ */ m("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${r}`, children: [
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Rd, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 384,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 379,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(Ld, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 391,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 386,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(tn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 394,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(Ps, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 402,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 397,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m(Is, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 409,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 404,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(Rs, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 416,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 411,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(Ls, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 423,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 418,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(rl, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 430,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 425,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(sl, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 437,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 432,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => o?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(Os, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 444,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 439,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(tn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 447,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(Kr, { children: [
      /* @__PURE__ */ m(Gr, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: `
              flex items-center gap-1 h-8 px-2 rounded-md shrink-0
              transition-all duration-100 ease-out touch-manipulation
              text-xs font-semibold
              ${p?.isH1 || p?.isH2 || p?.isH3 || p?.isH4 || p?.isH5 ? "bg-secondary text-foreground" : "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80"}
            `,
          children: [
            /* @__PURE__ */ m("span", { className: "min-w-[18px] text-center", children: p?.isH1 ? "H1" : p?.isH2 ? "H2" : p?.isH3 ? "H3" : p?.isH4 ? "H4" : p?.isH5 ? "H5" : "P" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 463,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m(Dt, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 466,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 452,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 451,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(qr, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !p?.isH1 && !p?.isH2 && !p?.isH3 && !p?.isH4 && !p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 474,
                columnNumber: 13
              }, this),
              "Paragraph"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 470,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: p?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 481,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 1" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 482,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 477,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: p?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 488,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 489,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 484,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: p?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 495,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 3" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 496,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 491,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: p?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 502,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 4" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 503,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 498,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 5 }).run(),
            className: p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 509,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 510,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 505,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 469,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 450,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(tn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 515,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(_s, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 523,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 518,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m($s, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 530,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 525,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m(Ws, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 537,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 532,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(Bs, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 544,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 539,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(il, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 551,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 546,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ m(Od, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 564,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 553,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(_d, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 577,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 566,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(tn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 580,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: b,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m(ss, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 587,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 583,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: h,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m(Ds, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 593,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
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
        children: /* @__PURE__ */ m(al, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 599,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 595,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(Kr, { children: [
      /* @__PURE__ */ m(Gr, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ m(Vo, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 608,
            columnNumber: 13
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 604,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 603,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(qr, { align: "start", children: [
        /* @__PURE__ */ m(Ne, { onClick: () => v("info"), children: [
          /* @__PURE__ */ m(Vo, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 613,
            columnNumber: 13
          }, this),
          " Info"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 612,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Ne, { onClick: () => v("note"), children: [
          /* @__PURE__ */ m(Hs, { size: 16, className: "mr-2", style: { color: "#FF8200" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 616,
            columnNumber: 13
          }, this),
          " Note"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 615,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Ne, { onClick: () => v("prompt"), children: [
          /* @__PURE__ */ m($d, { size: 16, className: "mr-2", style: { color: "#B244B3" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 619,
            columnNumber: 13
          }, this),
          " Prompt"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 618,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Ne, { onClick: () => v("resources"), children: [
          /* @__PURE__ */ m(Wd, { size: 16, className: "mr-2", style: { color: "#63B148" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 622,
            columnNumber: 13
          }, this),
          " Resources"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 621,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Ne, { onClick: () => v("todo"), children: [
          /* @__PURE__ */ m(Fs, { size: 16, className: "mr-2", style: { color: "#4479B3" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 625,
            columnNumber: 13
          }, this),
          " Todo"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 624,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 611,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 602,
      columnNumber: 7
    }, this),
    t.isActive("table") && /* @__PURE__ */ m(Kr, { children: [
      /* @__PURE__ */ m(Gr, { asChild: !0, children: /* @__PURE__ */ m(
        Mt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ m(ss, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 639,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m("span", { className: "text-xs hidden sm:inline", children: "Table" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 640,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 634,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 633,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(qr, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ m(Bi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 648,
                columnNumber: 15
              }, this),
              " Add Column Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
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
              /* @__PURE__ */ m(Bi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 654,
                columnNumber: 15
              }, this),
              " Add Column After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
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
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 660,
                columnNumber: 15
              }, this),
              " Delete Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 656,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(Xr, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 662,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ m(Hi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 667,
                columnNumber: 15
              }, this),
              " Add Row Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
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
              /* @__PURE__ */ m(Hi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 673,
                columnNumber: 15
              }, this),
              " Add Row After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
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
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 679,
                columnNumber: 15
              }, this),
              " Delete Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 675,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(Xr, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 681,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ m(Fi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 686,
                columnNumber: 15
              }, this),
              " Toggle Header Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
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
              /* @__PURE__ */ m(Fi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 692,
                columnNumber: 15
              }, this),
              " Toggle Header Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 688,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(Xr, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
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
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 701,
                columnNumber: 15
              }, this),
              " Delete Table"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 696,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 643,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 632,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m(
      Nl,
      {
        isOpen: c,
        onClose: () => u(!1),
        onInsert: g,
        position: d
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 708,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(tn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 716,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: x,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m(Bd, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 721,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 717,
        columnNumber: 7
      },
      this
    ),
    a && /* @__PURE__ */ m(Ce, { children: [
      /* @__PURE__ */ m(tn, {}, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 727,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(ys, { children: [
        /* @__PURE__ */ m(xs, { asChild: !0, children: /* @__PURE__ */ m(
          "button",
          {
            ref: l,
            onClick: () => {
              l.current && i?.(l.current);
            },
            className: `
                  flex items-center justify-center w-8 h-8 rounded-md shrink-0
                  transition-all duration-100 ease-out touch-manipulation
                  bg-transparent text-muted-foreground hover:bg-secondary active:bg-secondary/80
                  hover:text-foreground
                `,
            children: /* @__PURE__ */ m(ar, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 744,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 730,
            columnNumber: 15
          },
          this
        ) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 729,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(ws, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 747,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 728,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 726,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m("div", { className: "flex-1 min-w-2" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 755,
      columnNumber: 7
    }, this),
    n && /* @__PURE__ */ m(ys, { children: [
      /* @__PURE__ */ m(xs, { asChild: !0, children: /* @__PURE__ */ m(
        Mt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ m(Nn, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 767,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m("span", { className: "text-xs hidden md:inline", children: "Copy MD" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 768,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 761,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 760,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(ws, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 771,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 759,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 377,
    columnNumber: 5
  }, this);
});
function yv({ editor: e, isOpen: t, onClose: n, focusTrigger: o = 0, initialSearchQuery: r, editorMode: s = "wysiwyg", rawMarkdown: a = "", onRawMarkdownChange: i, onMatchesChange: l }) {
  const c = s === "markdown", [u, d] = Y(""), [f, p] = Y(""), [h, g] = Y(!1), [b, v] = Y(!1), [N, y] = Y(!1), [E, x] = Y(!1), [w, M] = Y([]), [k, C] = Y(0), [S, D] = Y(null), [A, R] = Y(!1), L = j(!1), _ = j(null), O = j(null), U = j(!1);
  q(() => {
    t && r && r.trim() && d(r);
  }, [t, r, o]);
  const I = H(() => {
    if (!u || !e) {
      M([]), C(0), D(null);
      return;
    }
    const B = [];
    let $;
    try {
      if (b)
        $ = new RegExp(u, h ? "g" : "gi");
      else {
        let z = u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        N && (z = `\\b${z}\\b`), $ = new RegExp(z, h ? "g" : "gi");
      }
      D(null);
    } catch (z) {
      D(z.message), M([]);
      return;
    }
    if (c) {
      let z;
      for (; (z = $.exec(a)) !== null; )
        B.push({
          from: z.index,
          to: z.index + z[0].length,
          text: z[0]
        });
    } else {
      const { doc: z } = e.state;
      z.descendants((Z, ce) => {
        if (Z.isText && Z.text) {
          let ue;
          for (; (ue = $.exec(Z.text)) !== null; )
            B.push({
              from: ce + ue.index,
              to: ce + ue.index + ue[0].length,
              text: ue[0]
            });
        }
        return !0;
      });
    }
    M(B), B.length > 0 && k >= B.length && C(0);
  }, [u, h, b, N, e, k, c, a]);
  q(() => {
    I();
  }, [I]), q(() => {
    c && l && (t && w.length > 0 ? l(w, k) : l([], 0));
  }, [c, t, w, k, l]), q(() => {
    if (!e) return;
    if (c) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const B = typeof e.commands.setSearchHighlight == "function";
    t && u && B ? e.commands.setSearchHighlight({
      searchTerm: u,
      caseSensitive: h,
      useRegex: b,
      currentMatchIndex: k
    }) : B && e.commands.clearSearchHighlight();
  }, [e, t, u, h, b, k, c, w, a]), q(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), l && l([], 0), L.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), R(!1)), L.current = !1);
  }, [t, e, l]), q(() => {
    if (w.length > 0 && k < w.length) {
      const B = w[k];
      if (c) {
        const z = document.querySelector(".syntax-textarea");
        if (z && U.current) {
          const Z = parseInt(getComputedStyle(z).lineHeight) || 22, ue = a.substring(0, B.from).split(`
`).length;
          z.scrollTop = Math.max(0, (ue - 3) * Z);
        }
        U.current && (U.current = !1);
        return;
      }
      const $ = e.view.domAtPos(B.from);
      $.node && $.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), U.current && (U.current = !1);
    }
  }, [k, w, e, c, a]), q(() => {
    t && _.current && (_.current.focus(), _.current.select());
  }, [t, o]);
  const P = H(() => {
    w.length !== 0 && (U.current = !0, C((B) => (B + 1) % w.length));
  }, [w.length]), W = H(() => {
    w.length !== 0 && (U.current = !0, C((B) => (B - 1 + w.length) % w.length));
  }, [w.length]), K = H(() => {
    if (w.length === 0 || k >= w.length) return;
    const B = w[k];
    if (c && i) {
      const $ = a.substring(0, B.from) + f + a.substring(B.to);
      i($), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: B.from, to: B.to }).deleteSelection().insertContent(f).run(), setTimeout(I, 10);
  }, [w, k, f, e, I, c, a, i]), V = H(() => {
    if (w.length === 0) return;
    if (c && i) {
      const $ = [...w].sort((Z, ce) => ce.from - Z.from);
      let z = a;
      $.forEach((Z) => {
        z = z.substring(0, Z.from) + f + z.substring(Z.to);
      }), i(z), setTimeout(I, 10);
      return;
    }
    const B = [...w].sort(($, z) => z.from - $.from);
    e.chain().focus(), B.forEach(($) => {
      e.chain().setTextSelection({ from: $.from, to: $.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(I, 10);
  }, [w, f, e, I, c, a, i]), G = H(() => {
    if (w.length === 0 || !u || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: u,
      caseSensitive: h,
      useRegex: b,
      wholeWord: N
    }) && (R(!0), L.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [w, u, h, b, N, e, n]), Q = H((B) => {
    B.key === "Enter" ? (B.preventDefault(), B.shiftKey ? W() : P(), _.current?.focus()) : B.key === "Escape" ? (B.preventDefault(), n()) : B.key === "h" && (B.ctrlKey || B.metaKey) ? (B.preventDefault(), x(($) => !$)) : B.key === "l" && (B.ctrlKey || B.metaKey) && B.shiftKey && (B.preventDefault(), G());
  }, [P, W, n, G]);
  return t ? /* @__PURE__ */ m(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: Q,
      children: [
        /* @__PURE__ */ m("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ m("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(Hd, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 381,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                ref: _,
                type: "text",
                placeholder: "Find...",
                value: u,
                onChange: (B) => d(B.target.value),
                className: `find-replace-input ${S ? "has-error" : ""}`
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 382,
                columnNumber: 11
              },
              this
            ),
            S && /* @__PURE__ */ m("span", { className: "find-replace-error", title: S, children: "!" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 391,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
            lineNumber: 380,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("span", { className: "find-replace-count", children: w.length > 0 ? `${k + 1} of ${w.length}` : u ? "No results" : "" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
            lineNumber: 396,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: W,
              disabled: w.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ m(Fd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 410,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 404,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: P,
              disabled: w.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ m(Dt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 418,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
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
              className: `find-replace-btn ${A ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${w.length} matches`,
              children: /* @__PURE__ */ m(zd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 428,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 422,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m("div", { className: "find-replace-separator" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
            lineNumber: 432,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => g((B) => !B),
              className: `find-replace-btn ${h ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ m(Ud, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 440,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
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
              children: /* @__PURE__ */ m(Yd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 447,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
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
              children: /* @__PURE__ */ m(jd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 454,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 449,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => x((B) => !B),
              className: `find-replace-btn ${E ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ m(is, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 463,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
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
              children: /* @__PURE__ */ m(ht, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 472,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 467,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
          lineNumber: 379,
          columnNumber: 7
        }, this),
        E && /* @__PURE__ */ m("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ m("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(is, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
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
                onChange: (B) => p(B.target.value),
                className: "find-replace-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
                lineNumber: 481,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
            lineNumber: 479,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: K,
              disabled: w.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
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
                /* @__PURE__ */ m(Vd, { size: 14 }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
                  lineNumber: 505,
                  columnNumber: 13
                }, this),
                "All"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
              lineNumber: 499,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
          lineNumber: 478,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/FindReplace.tsx",
      lineNumber: 374,
      columnNumber: 5
    },
    this
  ) : null;
}
const xv = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), ut = xv ? "⌘" : "Ctrl", wv = ({ editor: e }) => {
  const [t, n] = Y(!1), [o, r] = Y(0), [s, a] = Y(0), [i, l] = Y(""), [c, u] = Y(""), [d, f] = Y(!1), [p, h] = Y(!1);
  q(() => {
    if (!e) return;
    const M = () => {
      const C = e.storage.selectAllOccurrences;
      C ? (n(C.isActive), r(C.ranges.length), a(C.allMatches.length), l(C.searchTerm), u(C.typedBuffer), f(C.isTypingReplace), h(C.isIncremental)) : (n(!1), r(0), a(0));
    }, k = () => {
      M();
    };
    return e.on("transaction", k), M(), () => {
      e.off("transaction", k);
    };
  }, [e]);
  const g = H(() => {
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
  }, [e]), x = H(() => {
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
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-number", children: p && s > 0 ? `${o}/${s}` : o }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 131,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-label", children: "selected" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 134,
          columnNumber: 11
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 130,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ m(Ce, { children: [
        /* @__PURE__ */ m(ir, { size: 12, className: "select-all-action-bar-preview-icon" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 141,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-old", children: i }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 142,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-arrow", children: "→" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 143,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-new", children: c || "∅" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 144,
          columnNumber: 15
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 140,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ m(Ce, { children: /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        i,
        '"'
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 148,
        columnNumber: 15
      }, void 0) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 147,
        columnNumber: 13
      }, void 0) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 138,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 154,
        columnNumber: 9
      }, void 0),
      p && o < s && /* @__PURE__ */ m(Ce, { children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: x,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${ut}+D)`,
            children: /* @__PURE__ */ m(zs, { size: 14 }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
              lineNumber: 164,
              columnNumber: 15
            }, void 0)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
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
            fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 166,
            columnNumber: 13
          },
          void 0
        ),
        /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 173,
          columnNumber: 13
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 158,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: g,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${ut}+B)`,
          children: /* @__PURE__ */ m(Ps, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 183,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
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
          children: /* @__PURE__ */ m(Is, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 190,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
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
          children: /* @__PURE__ */ m(Rs, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 197,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
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
          children: /* @__PURE__ */ m(Ls, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 204,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 199,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
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
            fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 216,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
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
          children: /* @__PURE__ */ m(ht, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 225,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 220,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 128,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: p && o < s ? /* @__PURE__ */ m(Ce, { children: [
      /* @__PURE__ */ m("kbd", { children: [
        ut,
        "+D"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 13
      }, void 0),
      " next · ",
      /* @__PURE__ */ m("kbd", { children: [
        ut,
        "+Shift+L"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 42
      }, void 0),
      " all · Type to replace · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 94
      }, void 0),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: [
        ut,
        "+Z"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 119
      }, void 0),
      " undo"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 232,
      columnNumber: 11
    }, void 0) : /* @__PURE__ */ m(Ce, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 35
      }, void 0),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: "Backspace" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 60
      }, void 0),
      " to delete · ",
      /* @__PURE__ */ m("kbd", { children: [
        ut,
        "+Z"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 93
      }, void 0),
      " undo"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 236,
      columnNumber: 11
    }, void 0) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 230,
      columnNumber: 7
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/SelectAllActionBar.tsx",
    lineNumber: 127,
    columnNumber: 5
  }, void 0);
}, kv = vn(wv), Po = "-dismissed";
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
  } = t, [i, l] = Y({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), c = j(null), u = j(""), d = j(0);
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
          v !== y && v.length > 50 && l((E) => ({ ...E, hasRecoverableContent: !0 }));
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
          l((y) => ({ ...y, status: "saved" }));
          return;
        }
        if (v.length < 20)
          return;
        l((y) => ({ ...y, status: "saving" })), localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), u.current = v, d.current = N, l((y) => ({
          ...y,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(v), setTimeout(() => {
          l((y) => y.status === "saved" ? { ...y, status: "idle" } : y);
        }, 2e3);
      } catch (v) {
        console.error("useAutoSave: Error saving content", v), l((N) => ({
          ...N,
          status: "error",
          error: v instanceof Error ? v.message : "Failed to save"
        }));
      }
  }, [e, n, r, s]);
  q(() => {
    if (!e || !r || e.isDestroyed) return;
    const v = () => {
      e.isDestroyed || (c.current && clearTimeout(c.current), c.current = setTimeout(() => {
        f();
      }, o));
    };
    return e.on("update", v), () => {
      e.off("update", v), c.current && clearTimeout(c.current);
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
  const p = H(() => {
    c.current && clearTimeout(c.current), f();
  }, [f]), h = H(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Po), u.current = "", l({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (v) {
      console.warn("useAutoSave: Error clearing content", v);
    }
  }, [n]), g = H(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const v = localStorage.getItem(n);
      return v && e && !e.isDestroyed ? (l((N) => ({ ...N, hasRecoverableContent: !1 })), queueMicrotask(() => {
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
      localStorage.setItem(n + Po, "true"), l((v) => ({ ...v, hasRecoverableContent: !1 }));
    } catch (v) {
      console.warn("useAutoSave: Error dismissing recovery", v);
    }
  }, [n]);
  return {
    ...i,
    save: p,
    clear: h,
    recover: g,
    dismissRecovery: b
  };
}
function Yo(e, t, n) {
  const { state: o } = e, { tr: r } = o;
  t !== n && r.delete(t, n);
  const s = r.doc.resolve(t), a = o.schema.nodes.horizontalRule.create(), i = s.before(s.depth), l = s.after(s.depth);
  r.replaceWith(i, l, a);
  const c = i + a.nodeSize;
  if (c < r.doc.content.size) {
    const u = r.doc.resolve(c);
    u.nodeAfter && u.nodeAfter.isTextblock ? r.setSelection(nt.create(r.doc, c + 1)) : u.nodeAfter && r.setSelection(nt.near(r.doc.resolve(c)));
  } else {
    const d = o.schema.nodes.paragraph.create();
    r.insert(c, d), r.setSelection(nt.create(r.doc, c + 1));
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
  setFindReplaceFocusTrigger: l
}) {
  Dd(e, () => ({
    getEditor: () => t,
    getHTML: () => t?.getHTML() || "",
    getMarkdown: () => t ? n.turndown(t.getHTML()) : "",
    getText: () => t?.getText() || "",
    setContent: (c) => {
      t && !t.isDestroyed && queueMicrotask(() => {
        t.commands.setContent(c);
      });
    },
    clearContent: () => {
      t && !t.isDestroyed && t.commands.clearContent();
    },
    focus: (c) => {
      t && !t.isDestroyed && t.commands.focus(c);
    },
    blur: () => {
      t && !t.isDestroyed && t.commands.blur();
    },
    isEmpty: () => t?.isEmpty || !0,
    isFocused: () => t?.isFocused || !1,
    getMode: () => o.current,
    setMode: (c) => r(c),
    toggleMode: () => {
      const c = o.current === "wysiwyg" ? "markdown" : "wysiwyg";
      return r(c), c;
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
    insertContent: (c) => t?.commands.insertContent(c),
    insertImage: (c, u = "") => t?.commands.setImage({ src: c, alt: u }),
    insertTable: (c = 3, u = 3) => t?.commands.insertTable({ rows: c, cols: u, withHeaderRow: !0 }),
    insertCodeBlock: (c) => {
      c ? t?.commands.setCodeBlock({ language: c }) : t?.commands.setCodeBlock();
    },
    insertCallout: (c = "info") => t?.commands.insertCallout?.({ type: c }),
    insertHorizontalRule: () => {
      t && Yo(t, t.state.selection.from, t.state.selection.from);
    },
    toggleBold: () => t?.commands.toggleBold(),
    toggleItalic: () => t?.commands.toggleItalic(),
    toggleUnderline: () => t?.commands.toggleUnderline(),
    toggleStrike: () => t?.commands.toggleStrike(),
    toggleCode: () => t?.commands.toggleCode(),
    toggleHighlight: () => t?.commands.toggleHighlight(),
    setHeading: (c) => {
      c === 0 ? t?.commands.setParagraph() : t?.commands.setHeading({ level: c });
    },
    toggleBulletList: () => t?.commands.toggleBulletList(),
    toggleOrderedList: () => t?.commands.toggleOrderedList(),
    toggleTaskList: () => t?.commands.toggleTaskList(),
    toggleBlockquote: () => t?.commands.toggleBlockquote(),
    setLink: (c) => t?.commands.setLink({ href: c }),
    unsetLink: () => t?.commands.unsetLink(),
    openFindReplace: () => {
      i(!0), l((c) => c + 1);
    },
    closeFindReplace: () => i(!1),
    save: () => a.save(),
    clearSavedContent: () => a.clear(),
    getSelectedText: () => {
      if (!t) return "";
      const { from: c, to: u } = t.state.selection;
      return t.state.doc.textBetween(c, u, " ");
    },
    isEditable: () => t?.isEditable || !1,
    setEditable: (c) => t?.setEditable(c),
    /** Get the table of contents headings */
    getTableOfContents: () => {
      if (!t) return [];
      const c = [];
      return t.state.doc.descendants((u, d) => {
        if (u.type.name === "heading") {
          const f = u.attrs.level, p = u.textContent.trim();
          p && c.push({ id: `toc-heading-${d}`, text: p, level: f, pos: d });
        }
      }), c;
    },
    /** Scroll to a heading by position */
    scrollToHeading: (c) => {
      if (!(!t || t.isDestroyed))
        try {
          const u = t.state.doc.resolve(c), d = t.view.nodeDOM(u.before(u.depth + 1));
          if (d instanceof HTMLElement) {
            const f = t.view.dom.closest(".editor-content-wrapper");
            if (f) {
              const p = f.getBoundingClientRect(), g = d.getBoundingClientRect().top - p.top + f.scrollTop;
              f.scrollTo({ top: g - 20, behavior: "smooth" });
            } else
              d.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          t.commands.setTextSelection(c + 1);
        } catch {
        }
    }
  }), [t, n, r, s, a, i]);
}
const Sv = new Re("tableCellMenu");
let ka = !1, Io = null;
function Mv() {
  ka || (ka = !0, document.addEventListener("mouseover", (e) => {
    const n = e.target.closest("td, th");
    if (n && n.closest(".ProseMirror")) {
      const o = n.querySelector(".table-cell-menu-btn");
      o && (o.style.opacity = "1");
    }
  }, !0), document.addEventListener("mouseout", (e) => {
    const t = e.target, n = e.relatedTarget, o = t.closest("td, th");
    if (o && o.closest(".ProseMirror")) {
      if (n && o.contains(n) || document.querySelector(".table-cell-menu-dropdown")) return;
      const s = o.querySelector(".table-cell-menu-btn");
      s && (s.style.opacity = "0");
    }
  }, !0));
}
function Dv(e) {
  return Mv(), new Ie({
    key: Sv,
    state: {
      init() {
        return _e.empty;
      },
      apply(t, n, o, r) {
        return !t.docChanged && Io ? Io.map(t.mapping, t.doc) : (Io = Av(r.doc, e), Io);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Av(e, t) {
  const n = [];
  return e.descendants((o, r) => {
    if (o.type.name === "tableCell" || o.type.name === "tableHeader") {
      const s = Ye.widget(r + 1, (a) => {
        const i = document.createElement("div");
        i.className = "table-cell-menu-wrapper ProseMirror-widget", i.setAttribute("contenteditable", "false"), i.style.cssText = "position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;";
        const l = document.createElement("button");
        l.className = "table-cell-menu-btn", l.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>', l.title = "Table options", l.type = "button";
        const c = document.documentElement.classList.contains("dark"), u = c ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)", d = c ? "rgba(60,60,60,0.5)" : "rgba(200,200,200,0.5)", f = c ? "#999" : "#666", p = c ? "#2a2a2a" : "#f5f5f5";
        return l.style.cssText = "width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:" + u + ";border:1px solid " + d + ";border-radius:4px;cursor:pointer;opacity:0;transition:opacity 0.15s ease,background-color 0.15s ease,transform 0.1s ease;color:" + f + ";pointer-events:auto;padding:0;", l.addEventListener("mouseenter", () => {
          l.style.opacity = "1", l.style.background = p, l.style.transform = "scale(1.05)";
        }), l.addEventListener("mouseleave", () => {
          document.querySelector(".table-cell-menu-dropdown"), l.style.background = u, l.style.transform = "scale(1)";
        }), l.addEventListener("click", (h) => {
          h.preventDefault(), h.stopPropagation();
          const g = l.getBoundingClientRect();
          t.chain().focus().setTextSelection(r + 1).run(), Pv(h, t, r, g);
        }), i.appendChild(l), i;
      }, { side: -1, key: "menu-" + r });
      n.push(s);
    }
  }), _e.create(e, n);
}
function Pv(e, t, n, o) {
  const r = document.querySelector(".table-cell-menu-dropdown");
  r && r.remove();
  const s = document.createElement("div");
  s.className = "table-cell-menu-dropdown";
  const a = 170, i = 280;
  let l = Math.max(0, Math.min(o.top, window.innerHeight)), c = Math.max(0, Math.min(o.bottom, window.innerHeight)), u = Math.max(0, Math.min(o.left, window.innerWidth)), d = c + 4, f = u - a + o.width + 8;
  f + a > window.innerWidth - 12 && (f = window.innerWidth - a - 12), f < 12 && (f = 12), d + i > window.innerHeight - 12 && (d = l - i - 4), d < 12 && (d = 12), d + i > window.innerHeight - 12 && (d = window.innerHeight - i - 12);
  const p = document.documentElement.classList.contains("dark"), h = p ? "#1f1f1f" : "#ffffff", g = p ? "#3a3a3a" : "#e5e5e5", b = p ? "#e5e5e5" : "#333333";
  s.style.cssText = "position:fixed;top:" + d + "px;left:" + f + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + h + ";border:1px solid " + g + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + b + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const v = t.state.doc.resolve(n);
  let N = !1;
  for (let D = v.depth; D >= 0; D--)
    if (v.node(D).type.name === "table") {
      v.node(D).firstChild?.firstChild?.type.name === "tableHeader" && (N = !0);
      break;
    }
  const y = [
    { label: "Insert Column Left", icon: "col-left", action: () => t.chain().focus().setTextSelection(n + 1).addColumnBefore().run() },
    { label: "Insert Column Right", icon: "col-right", action: () => t.chain().focus().setTextSelection(n + 1).addColumnAfter().run() },
    { label: "Insert Row Above", icon: "row-up", action: () => t.chain().focus().setTextSelection(n + 1).addRowBefore().run() },
    { label: "Insert Row Below", icon: "row-down", action: () => t.chain().focus().setTextSelection(n + 1).addRowAfter().run() },
    { label: "divider" },
    { label: N ? "✓ Header Row" : "  Header Row", icon: "toggle-header", action: () => t.chain().focus().setTextSelection(n + 1).toggleHeaderRow().run() },
    { label: "divider" },
    { label: "Delete Column", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteColumn().run(), destructive: !0 },
    { label: "Delete Row", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteRow().run(), destructive: !0 },
    { label: "Delete Table", icon: "table-delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteTable().run(), destructive: !0 },
    { label: "divider" },
    { label: "Copy Table", icon: "copy", action: () => Iv(t) }
  ], E = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, x = p ? "#2a2a2a" : "#f5f5f5", w = p ? "#ff6b6b" : "#dc2626", M = p ? "#999999" : "#666666", k = p ? "#333333" : "#e5e5e5";
  y.forEach((D) => {
    if (D.label === "divider") {
      const A = document.createElement("div");
      A.style.cssText = "height:1px;background:" + k + ";margin:4px 0;", s.appendChild(A);
    } else {
      const A = document.createElement("button");
      A.type = "button";
      const R = D.destructive ? w : b;
      A.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + R + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const L = E[D.icon || ""] || "", _ = D.destructive ? w : M;
      A.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + _ + ';">' + L + '</span><span style="flex:1;white-space:nowrap;">' + D.label + "</span>", A.addEventListener("mouseenter", () => {
        A.style.background = D.destructive ? p ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : x;
      }), A.addEventListener("mouseleave", () => {
        A.style.background = "transparent";
      }), A.addEventListener("click", (O) => {
        O.preventDefault(), O.stopPropagation(), D.action && D.action(), s.remove();
      }), s.appendChild(A);
    }
  }), document.body.appendChild(s);
  const C = (D) => {
    const A = D.target;
    if (s.contains(A) || A.classList.contains("table-cell-menu-btn"))
      return;
    const R = A.closest('[role="dialog"]');
    R && R.contains(s) || (s.remove(), document.removeEventListener("mousedown", C), document.removeEventListener("keydown", S));
  }, S = (D) => {
    D.key === "Escape" && (s.remove(), document.removeEventListener("mousedown", C), document.removeEventListener("keydown", S));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", C), document.addEventListener("keydown", S);
  }, 0);
}
function Iv(e) {
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
        const i = a.attrs, l = i.colspan > 1 ? ' colspan="' + i.colspan + '"' : "", c = i.rowspan > 1 ? ' rowspan="' + i.rowspan + '"' : "";
        return "<td" + l + c + ">" + a.textContent + "</td>";
      }
      if (a.type.name === "tableHeader") {
        const i = a.attrs, l = i.colspan > 1 ? ' colspan="' + i.colspan + '"' : "", c = i.rowspan > 1 ? ' rowspan="' + i.rowspan + '"' : "";
        return "<th" + l + c + ">" + a.textContent + "</th>";
      }
      return a.textContent || "";
    }, s = r(o);
    navigator.clipboard.writeText(s).then(() => {
      const a = document.createElement("div");
      a.className = "tcm-toast", a.textContent = "Table copied to clipboard", a.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:6px;font-size:13px;z-index:99999;animation:fadeInOut 2s ease-in-out forwards;", document.body.appendChild(a), setTimeout(() => a.remove(), 2e3);
    });
  }
}
const Rv = Dm.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Dv(this.editor)
    ];
  }
}), Lv = Am.extend({}), Bn = new Re("tableSorting");
let Bt = null, _n = null;
function Ov(e) {
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
function _v(e, t, n) {
  let o = 0;
  return e.type === "number" && t.type === "number" ? o = e.value - t.value : e.type === "date" && t.type === "date" ? o = e.value.getTime() - t.value.getTime() : o = String(e.value).localeCompare(String(t.value)), n === "asc" ? o : -o;
}
function $v(e, t, n) {
  const { state: o, view: r } = e;
  let s = null;
  if (o.doc.nodesBetween(t, t + 1, (h, g) => {
    if (h.type.name === "table" && g === t)
      return s = h, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const a = Bt?.tablePos === t && Bt?.columnIndex === n && Bt?.direction === "asc" ? "desc" : "asc";
  Bt = { tablePos: t, columnIndex: n, direction: a }, _n = null;
  const i = [];
  s.forEach((h) => {
    if (h.type.name === "tableRow") {
      let g = !1;
      h.forEach((b) => {
        b.type.name === "tableHeader" && (g = !0);
      }), i.push({ node: h, isHeader: g });
    }
  });
  const l = i.filter((h) => h.isHeader), c = i.filter((h) => !h.isHeader);
  if (c.length < 2) {
    Ca(n, a), r.dispatch(o.tr.setMeta(Bn, { updated: !0 }));
    return;
  }
  const u = c.map((h) => {
    let g = "", b = 0;
    return h.node.forEach((v) => {
      b === n && (g = v.textContent || ""), b++;
    }), { ...h, sortValue: Ov(g) };
  }), d = u.map((h, g) => g);
  u.sort((h, g) => _v(h.sortValue, g.sortValue, a));
  const f = u.map((h, g) => c.indexOf(h));
  if (d.some((h, g) => h !== f[g])) {
    const h = [];
    l.forEach((v) => h.push(v.node)), u.forEach((v) => h.push(v.node));
    const g = s.type.create(s.attrs, h), { tr: b } = o;
    b.replaceWith(t, t + s.nodeSize, g), b.setMeta(Bn, { updated: !0 }), r.dispatch(b);
  } else
    r.dispatch(o.tr.setMeta(Bn, { updated: !0 }));
  Ca(n, a);
}
function Ca(e, t) {
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
function Wv(e, t, n, o) {
  const r = document.createElement("span");
  r.className = "table-sort-btn-inline", r.setAttribute("contenteditable", "false"), r.style.cssText = "display:inline-flex;align-items:center;margin-left:4px;vertical-align:middle;pointer-events:auto;";
  const s = document.createElement("button");
  s.className = "table-sort-btn", s.setAttribute("contenteditable", "false"), s.type = "button";
  const a = document.documentElement.classList.contains("dark"), i = a ? "#60a5fa" : "#3b82f6", l = a ? "#666" : "#aaa", c = a ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  return s.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;font-size:10px;color:" + (e ? i : l) + ";background:transparent;border:none;border-radius:3px;cursor:pointer;user-select:none;transition:all 0.15s ease;opacity:" + (e ? "1" : "0.5") + ";pointer-events:auto;vertical-align:middle;", s.addEventListener("mouseenter", () => {
    s.style.background = c, s.style.opacity = "1", s.style.color = i;
  }), s.addEventListener("mouseleave", () => {
    s.style.background = "transparent", s.style.opacity = e ? "1" : "0.5", s.style.color = e ? i : l;
  }), s.addEventListener("click", (u) => {
    u.preventDefault(), u.stopPropagation(), $v(o, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), r.appendChild(s), r;
}
function Bv(e) {
  return new Ie({
    key: Bn,
    state: {
      init() {
        return _e.empty;
      },
      apply(t, n, o, r) {
        const s = t.getMeta(Bn);
        return !t.docChanged && !s?.updated && _n ? _n.map(t.mapping, t.doc) : (_n = Hv(r.doc, e), _n);
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
  return e.descendants((o, r) => {
    if (o.type.name === "table") {
      const s = r;
      o.forEach((a, i) => {
        if (a.type.name === "tableRow") {
          let l = 0, c = 0;
          a.forEach((u, d) => {
            if (u.type.name === "tableHeader") {
              const f = r + 1 + i + 1 + c;
              let p = f + 1;
              u.forEach((y, E) => {
                y.type.name === "paragraph" && (p = f + 1 + E + y.nodeSize - 1);
              });
              const g = Bt?.tablePos === s && Bt?.columnIndex === l ? Bt.direction : null, b = l, v = s, N = Ye.widget(p, () => Wv(g, v, b, t), { side: 1, key: "sort-" + s + "-" + b });
              n.push(N);
            }
            c += u.nodeSize, l++;
          });
        }
      });
    }
  }), _e.create(e, n);
}
const Fv = Ze.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [Bv(this.editor)];
  }
});
function hi(e, t, n, o, r, s = {}) {
  const a = e.doc.nodeAt(t);
  if (!a) return !1;
  e.setNodeMarkup(t, n, a.attrs);
  const i = e.doc.nodeAt(t);
  if (!i) return !1;
  const l = [];
  i.forEach((c, u) => {
    c.type === r && l.push(t + 1 + u);
  });
  for (let c = l.length - 1; c >= 0; c--) {
    const u = l[c], d = e.doc.nodeAt(u);
    d && d.type === r && e.setNodeMarkup(u, o, s);
  }
  return !0;
}
const zv = Pm.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: o }) => {
        const { selection: r } = t, { $from: s } = r, a = t.schema.nodes.bulletList, i = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, c = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const h = s.node(p);
          if (h.type === a || h.type === i || h.type === l) {
            d = h.type, f = s.before(p);
            break;
          }
        }
        if (d === a)
          return e.liftListItem("listItem");
        if (d === i || d === l) {
          if (!o) return !0;
          if (hi(n, f, a, c, u, {}))
            return o(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Uv = Im.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: o }) => {
        const { selection: r } = t, { $from: s } = r, a = t.schema.nodes.bulletList, i = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, c = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const h = s.node(p);
          if (h.type === a || h.type === i || h.type === l) {
            d = h.type, f = s.before(p);
            break;
          }
        }
        if (d === l)
          return e.liftListItem("listItem");
        if (d === i || d === a) {
          if (!o) return !0;
          if (hi(n, f, l, c, u, {}))
            return o(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Yv = Lm.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: o, dispatch: r, chain: s, can: a }) => {
        const { selection: i } = n, { $from: l, $to: c } = i, u = l.blockRange(c);
        if (!u)
          return !1;
        const d = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let p = !1;
        for (let x = l.depth; x > 0; x--)
          if (l.node(x).type === d) {
            p = !0, l.before(x);
            break;
          }
        if (p)
          return t.liftListItem("taskItem");
        const h = n.schema.nodes.bulletList, g = n.schema.nodes.orderedList, b = n.schema.nodes.listItem;
        let v = null, N = -1;
        for (let x = l.depth; x > 0; x--) {
          const w = l.node(x);
          if (w.type === h || w.type === g) {
            v = w, N = l.before(x);
            break;
          }
        }
        if (v) {
          if (!r) return !0;
          const x = N, w = o.doc.nodeAt(x);
          if (!w) return !1;
          o.setNodeMarkup(x, d, w.attrs);
          const M = o.doc.nodeAt(x);
          if (!M) return !1;
          const k = [];
          M.forEach((C, S) => {
            C.type === b && k.push(x + 1 + S);
          });
          for (let C = k.length - 1; C >= 0; C--) {
            const S = k[C], D = o.doc.nodeAt(S);
            D && D.type === b && o.setNodeMarkup(S, f, { checked: !1 });
          }
          return r(o), !0;
        }
        if (!r) return !0;
        const y = Ui(u, d);
        if (y) {
          o.wrap(u, y);
          const { $from: x } = o.selection;
          let w = -1;
          for (let M = x.depth; M > 0; M--)
            if (x.node(M).type === d) {
              w = x.before(M);
              break;
            }
          if (w >= 0) {
            const M = o.doc.nodeAt(w);
            if (M) {
              const k = [];
              M.forEach((C, S) => {
                C.type === b && k.push(w + 1 + S);
              });
              for (let C = k.length - 1; C >= 0; C--) {
                const S = k[C], D = o.doc.nodeAt(S);
                D && D.type === b && o.setNodeMarkup(S, f, { checked: !1 });
              }
            }
          }
          return r(o), !0;
        }
        const E = Ui(u, h);
        if (E) {
          o.wrap(u, E);
          const { $from: x } = o.selection;
          let w = -1;
          for (let M = x.depth; M > 0; M--)
            if (x.node(M).type === h) {
              w = x.before(M);
              break;
            }
          return w >= 0 && hi(o, w, d, f, b, { checked: !1 }), r(o), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), jv = Om.extend({
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
        const l = o.start(s), c = a.firstChild;
        if (!c || !c.isTextblock)
          return t.commands.splitListItem(this.name);
        if (o.pos - l <= 1) {
          const d = o.before(s), { tr: f } = n, p = n.schema.nodes.taskItem, h = n.schema.nodes.paragraph, g = p.create(
            { checked: !1 },
            h.create()
          );
          f.insert(d, g);
          const b = d + 1;
          return f.setSelection(nt.create(f.doc, b)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
            const { state: a } = n, i = a.doc.resolve(o), l = i.parent.textBetween(
              0,
              i.parentOffset,
              void 0,
              "￼"
            ), u = /^\s*(-\s*)?\[([( |x])?\]$/.exec(l);
            if (!u) return !1;
            const d = u[2] === "x", f = i.start() + (u.index || 0), p = o, h = a.tr;
            h.delete(f, p);
            const b = h.doc.resolve(f).blockRange();
            if (!b || !t || !e) return !1;
            const v = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: d } }
            ];
            if (h.wrap(b, v), f > 1) {
              const N = h.doc.resolve(f - 1).nodeBefore;
              N && N.type === t && _m(h.doc, f - 1) && h.join(f - 1);
            }
            return n.dispatch(h), !0;
          }
        }
      })
    ];
  }
}), Vv = Rm.extend({
  content: "paragraph block*"
}), Ea = new Re("collapsibleList");
function ks(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function Cs(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((o) => {
    t.includes(o.type.name) && (n = !0);
  }), n;
}
function Kv(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let o = -1, r = -1, s = t + 1;
  return e.forEach((a) => {
    n.includes(a.type.name) && (o === -1 && (o = s), r = s + a.nodeSize), s += a.nodeSize;
  }), o === -1 ? null : { start: o, end: r };
}
let cn = null;
function Zr(e, t, n) {
  const o = [];
  return e.descendants((r, s) => {
    if (!n.listItemTypes.includes(r.type.name) || !Cs(r))
      return !0;
    const a = ks(r, s), i = t.collapsedItems.has(a);
    o.push(
      Ye.node(s, s + r.nodeSize, {
        class: `collapsible-list-item ${i ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": a
      })
    );
    const l = r.firstChild;
    if (l && l.type.name === "paragraph") {
      const c = s + 1 + l.nodeSize - 1, u = Ye.widget(
        c,
        () => {
          const d = CSS.escape(a), f = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${d}"]`
          );
          if (f) {
            f.classList.contains("collapsed") !== i && (f.classList.remove("collapsed", "expanded"), f.classList.add(i ? "collapsed" : "expanded"), f.title = i ? "Click to expand" : "Click to collapse");
            const b = f.parentElement;
            if (b) return b;
          }
          const p = document.createElement("span");
          p.className = "collapsible-list-chevron-wrapper", p.setAttribute("contenteditable", "false");
          const h = document.createElement("button");
          return h.className = `collapsible-list-chevron ${i ? "collapsed" : "expanded"}`, h.setAttribute("data-list-item-id", a), h.setAttribute("contenteditable", "false"), h.setAttribute("tabindex", "-1"), h.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', h.title = i ? "Click to expand" : "Click to collapse", h.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const b = h.classList.contains("collapsed");
            h.classList.remove("collapsed", "expanded"), h.classList.add(b ? "expanded" : "collapsed"), h.title = b ? "Click to collapse" : "Click to expand", t.collapsedItems.has(a) ? t.collapsedItems.delete(a) : t.collapsedItems.add(a), cn && cn.dispatch(
              cn.state.tr.setMeta("collapsibleList", { toggled: a })
            );
          }), p.appendChild(h), p;
        },
        { side: 1, key: `list-chevron-${a}` }
      );
      o.push(u);
    }
    if (i && Kv(r, s)) {
      let u = s + 1;
      r.forEach((d) => {
        ["bulletList", "orderedList", "taskList"].includes(d.type.name) && o.push(
          Ye.node(u, u + d.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), u += d.nodeSize;
      });
    }
    return !0;
  }), _e.create(e, o);
}
const Gv = Ze.create({
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
        if (!r || !this.options.listItemTypes.includes(r.type.name) || !Cs(r))
          return !1;
        const s = ks(r, e);
        return o.collapsedItems.has(s) ? o.collapsedItems.delete(s) : o.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((r, s) => {
          this.options.listItemTypes.includes(r.type.name) && Cs(r) && n.collapsedItems.add(ks(r, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ie({
        key: Ea,
        view(n) {
          return cn = n, {
            update(o) {
              cn = o;
            },
            destroy() {
              cn = null;
            }
          };
        },
        state: {
          init(n, o) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: Zr(o.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, o, r, s) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: Zr(s.doc, e, t),
              docVersion: o.docVersion + 1
            } : {
              ...o,
              decorations: o.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const o = Ea.getState(n);
            return o?.decorations ? o.decorations : Zr(n.doc, e, t);
          }
        }
      })
    ];
  }
}), be = zm();
be.register("javascript", js);
be.register("js", js);
be.register("jsx", js);
be.register("typescript", Vs);
be.register("ts", Vs);
be.register("tsx", Vs);
be.register("python", vl);
be.register("py", vl);
be.register("xml", Ks);
be.register("html", Ks);
be.register("svg", Ks);
be.register("css", Um);
be.register("json", Ym);
be.register("bash", cr);
be.register("sh", cr);
be.register("shell", cr);
be.register("zsh", cr);
const Es = {
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
}, Ro = /* @__PURE__ */ new Set(), Lo = /* @__PURE__ */ new Set();
async function qv(e) {
  if (be.registered(e)) return !0;
  const t = Es[e];
  if (!t) return !1;
  if (Lo.has(e)) return !0;
  if (Ro.has(e))
    return new Promise((n) => {
      const o = () => {
        Lo.has(e) ? n(!0) : Ro.has(e) ? setTimeout(o, 50) : n(!1);
      };
      setTimeout(o, 50);
    });
  Ro.add(e);
  try {
    const o = (await t()).default;
    be.register(e, o), Lo.add(e);
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
          a !== e && !be.registered(a) && (be.register(a, o), Lo.add(a));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Ro.delete(e);
  }
}
function Xv({ node: e, updateAttributes: t, extension: n }) {
  const [o, r] = Y(!1), [s, a] = Y(!1), [i, l] = Y(!0), c = j(null), u = e.attrs.language || "plaintext";
  q(() => {
    const g = c.current;
    if (!g || s) return;
    const b = new IntersectionObserver(
      (v) => {
        for (const N of v)
          N.isIntersecting && (a(!0), b.unobserve(g));
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: "200px 0px",
        threshold: 0
      }
    );
    return b.observe(g), () => {
      b.disconnect();
    };
  }, [s]), q(() => {
    if (s && u !== "plaintext") {
      if (be.registered(u)) {
        l(!0);
        return;
      }
      Es[u] && (l(!1), qv(u).then((g) => {
        l(g);
      }));
    }
  }, [s, u]);
  const d = H(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), r(!0), setTimeout(() => r(!1), 2e3);
    } catch (g) {
      console.error("Failed to copy:", g);
    }
  }, [e.textContent]), f = n.options.lowlight?.listLanguages?.() || [], p = Array.from(/* @__PURE__ */ new Set([...f, ...Object.keys(Es)])).sort(), h = u === "plaintext" ? "Plain Text" : u.charAt(0).toUpperCase() + u.slice(1);
  return /* @__PURE__ */ m(pn, { className: "code-block-wrapper", ref: c, children: [
    /* @__PURE__ */ m("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ m("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: u,
            onChange: (g) => t({ language: g.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ m("option", { value: "plaintext", children: "Plain Text" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 265,
                columnNumber: 13
              }, this),
              p.map((g) => /* @__PURE__ */ m("option", { value: g, children: g.charAt(0).toUpperCase() + g.slice(1) }, g, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 267,
                columnNumber: 15
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 260,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m("span", { className: "code-block-language-label", children: h }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 272,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Dt, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 273,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
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
            fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 281,
            columnNumber: 21
          }, this) : /* @__PURE__ */ m(Nn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 281,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 275,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 258,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!s || !i ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m(Ms, { className: s && i ? `language-${u}` : "language-plaintext" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 288,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 287,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
    lineNumber: 256,
    columnNumber: 5
  }, this);
}
const Zv = Fm.extend({
  addNodeView() {
    return rr(Xv);
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
        fileName: "/home/ubuntu/paragon/client/src/components/editor/DialogSafePortal.tsx",
        lineNumber: 65,
        columnNumber: 5
      },
      this
    ),
    document.body
  );
}
const Oo = {
  info: { icon: Vo, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: cl, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: ll, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: Hs, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: Fs, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function Qv({ node: e, updateAttributes: t, editor: n }) {
  const [o, r] = Y(!1), [s, a] = Y(!1), [i, l] = Y(null), c = j(null), u = j(null), d = e.attrs.type || "info", f = Oo[d] || Oo.info, p = f.icon, h = H(() => {
    if (u.current) {
      const N = u.current.getBoundingClientRect();
      l({
        top: N.bottom + 4,
        left: N.left
      });
    }
  }, []);
  q(() => {
    if (!o) return;
    const N = (y) => {
      c.current && !c.current.contains(y.target) && u.current && !u.current.contains(y.target) && r(!1);
    };
    return document.addEventListener("mousedown", N), document.addEventListener("touchstart", N, { passive: !0 }), () => {
      document.removeEventListener("mousedown", N), document.removeEventListener("touchstart", N);
    };
  }, [o]), q(() => {
    if (!o) return;
    const N = () => r(!1);
    return window.addEventListener("scroll", N, !0), () => window.removeEventListener("scroll", N, !0);
  }, [o]);
  const g = H(() => {
    n.isEditable && (o || h(), r(!o));
  }, [n.isEditable, o, h]), b = (N) => {
    t({ type: N }), r(!1);
  }, v = H((N) => {
    N.stopPropagation(), a((y) => !y);
  }, []);
  return /* @__PURE__ */ m(pn, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
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
                N.stopPropagation(), g();
              },
              title: n.isEditable ? "Click to change callout type" : f.label,
              style: { color: f.borderColor, userSelect: "none", WebkitUserSelect: "none" },
              children: [
                /* @__PURE__ */ m(p, { size: 18 }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 129,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ m("span", { className: "callout-label", children: f.label }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 130,
                  columnNumber: 11
                }, this),
                n.isEditable && /* @__PURE__ */ m(Dt, { size: 12, className: "callout-type-chevron" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 131,
                  columnNumber: 33
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 119,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: f.borderColor },
              children: s ? /* @__PURE__ */ m(ul, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 137,
                columnNumber: 24
              }, this) : /* @__PURE__ */ m(Dt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 137,
                columnNumber: 53
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 133,
              columnNumber: 9
            },
            this
          ),
          o && n.isEditable && i && /* @__PURE__ */ m(Nt, { children: /* @__PURE__ */ m(
            "div",
            {
              ref: c,
              className: "callout-type-dropdown",
              contentEditable: !1,
              style: {
                position: "fixed",
                top: i.top,
                left: i.left
              },
              children: Object.keys(Oo).map((N) => {
                const y = Oo[N], E = y.icon;
                return /* @__PURE__ */ m(
                  "button",
                  {
                    className: `callout-type-option ${N === d ? "active" : ""}`,
                    onClick: (x) => {
                      x.stopPropagation(), b(N);
                    },
                    onMouseDown: (x) => x.stopPropagation(),
                    style: { "--callout-option-color": y.color },
                    children: [
                      /* @__PURE__ */ m(E, { size: 16, style: { color: y.borderColor } }, void 0, !1, {
                        fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                        lineNumber: 166,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ m("span", { children: y.label }, void 0, !1, {
                        fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                        lineNumber: 167,
                        columnNumber: 19
                      }, this)
                    ]
                  },
                  N,
                  !0,
                  {
                    fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                    lineNumber: 156,
                    columnNumber: 17
                  },
                  this
                );
              })
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 142,
              columnNumber: 11
            },
            this
          ) }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
            lineNumber: 141,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
        lineNumber: 113,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ m(Ms, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 178,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 177,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/extensions/CalloutWithMenu.tsx",
    lineNumber: 106,
    columnNumber: 5
  }, this);
}
const Jv = lr.create({
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
    return rr(Qv);
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
}), eN = jm.extend({
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
    return ({ node: t, editor: n, getPos: o }) => {
      let r = t;
      const s = document.createElement("figure");
      s.classList.add("image-resizer");
      const a = (P) => {
        const W = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[P] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${W}`;
      };
      a(t.attrs.align || "left");
      const i = document.createElement("img");
      i.alt = t.attrs.alt || "", t.attrs.width && (i.style.width = `${t.attrs.width}px`);
      const l = (P) => !(!P || P.startsWith("data:") || P.startsWith("blob:") || P.startsWith("http://") || P.startsWith("https://")), c = (P) => {
        l(P) && e.resolveImageSrc ? (i.style.opacity = "0.5", i.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(P).then((W) => {
          i.src = W, i.style.opacity = "1";
        }).catch(() => {
          i.src = P, i.style.opacity = "1";
        })) : i.src = P;
      };
      c(t.attrs.src);
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
      const p = (P, W, K) => {
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
        `, V.innerHTML = `${W}<span>${P}</span>`, V.addEventListener("mouseenter", () => {
          V.style.background = "oklch(0.95 0 0)";
        }), V.addEventListener("mouseleave", () => {
          V.style.background = "transparent";
        }), V.addEventListener("click", (G) => {
          G.preventDefault(), G.stopPropagation(), K(), f.style.display = "none", C = !1;
        }), V;
      }, h = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', v = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(p("Edit", h, () => {
        const P = typeof o == "function" ? o() : null;
        if (P != null && e.onImageClick) {
          const W = i.getBoundingClientRect();
          e.onImageClick({
            src: r.attrs.src,
            alt: r.attrs.alt || "",
            pos: P,
            rect: W
          });
        }
      })), f.appendChild(p("Copy image", g, async () => {
        const P = r.attrs.src;
        try {
          const K = await (await fetch(P)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [K.type]: K })
          ]);
        } catch {
          try {
            const W = new window.Image();
            W.crossOrigin = "anonymous", await new Promise((G, Q) => {
              W.onload = () => G(), W.onerror = () => Q(new Error("Image load failed")), W.src = P;
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
              ]) : await navigator.clipboard.writeText(P);
            }
          } catch {
            try {
              await navigator.clipboard.writeText(P);
            } catch {
            }
          }
        }
      })), f.appendChild(p("Copy URL", v, async () => {
        const P = r.attrs.src;
        try {
          await navigator.clipboard.writeText(P);
        } catch {
        }
      })), f.appendChild(p("Save image", b, () => {
        const P = r.attrs.src, W = r.attrs.alt || "image", K = document.createElement("a");
        K.href = P, K.download = W, K.target = "_blank", K.rel = "noopener noreferrer", document.body.appendChild(K), K.click(), setTimeout(() => {
          document.body.removeChild(K);
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
      ], w = [], M = (P) => {
        w.forEach((W) => {
          (W.getAttribute("data-align-value") || "left") === P ? (W.style.background = "oklch(1 0 0)", W.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", W.style.color = "oklch(0.25 0 0)", W.style.fontWeight = "600") : (W.style.background = "transparent", W.style.boxShadow = "none", W.style.color = "oklch(0.5 0 0)", W.style.fontWeight = "400");
        });
      };
      x.forEach(({ value: P, label: W, icon: K }) => {
        const V = document.createElement("button");
        V.setAttribute("type", "button"), V.setAttribute("data-align-value", P), V.setAttribute("title", `Align ${W.toLowerCase()}`), V.style.cssText = `
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
          const Q = typeof o == "function" ? o() : null;
          if (Q != null)
            try {
              const { state: B, dispatch: $ } = n.view, z = B.doc.nodeAt(Q);
              if (z && z.type.name === "resizableImage") {
                const Z = B.tr.setNodeMarkup(Q, void 0, {
                  ...z.attrs,
                  align: P
                });
                $(Z);
              }
            } catch {
              n.chain().focus().setNodeSelection(Q).updateAttributes("resizableImage", {
                align: P
              }).run();
            }
          M(P);
        }), w.push(V), E.appendChild(V);
      }), f.appendChild(E);
      const k = () => {
        const P = r.attrs.align || "left";
        M(P);
      };
      let C = !1;
      d.addEventListener("click", (P) => {
        if (P.preventDefault(), P.stopPropagation(), C)
          f.style.display = "none", C = !1;
        else {
          const W = d.getBoundingClientRect(), K = 200, V = f.closest('[role="dialog"]');
          let G = 0, Q = 0;
          if (V) {
            const ue = V.getBoundingClientRect();
            G = ue.left, Q = ue.top;
          }
          let B = W.bottom + 4 - Q, $ = W.right - K - G;
          const z = window.innerHeight, Z = window.innerWidth, ce = 200;
          W.bottom + 4 + ce > z && (B = W.top - ce - 4 - Q), $ + G < 8 && ($ = 8 - G), $ + K + G > Z - 8 && ($ = Z - K - 8 - G), f.style.top = `${B}px`, f.style.left = `${$}px`, f.style.display = "flex", C = !0, k();
        }
      });
      const S = (P) => {
        !f.contains(P.target) && !d.contains(P.target) && (f.style.display = "none", C = !1);
      };
      document.addEventListener("click", S);
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
      const A = s.closest('[role="dialog"]');
      A ? A.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        u.style.opacity = "1", d.style.opacity = "1", D.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        u.style.opacity = "0", D.style.opacity = "0", C || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const R = (P) => {
        P.preventDefault(), P.stopPropagation();
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
        K.src = i.src, K.alt = i.alt || "", K.style.cssText = `
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
          W.style.opacity = "0", K.style.transform = "scale(0.92)", setTimeout(() => W.remove(), 200);
        };
        W.addEventListener("click", (Z) => {
          Z.target === W && B();
        }), V.addEventListener("click", B);
        const $ = (Z) => {
          Z.key === "Escape" && (B(), document.removeEventListener("keydown", $));
        };
        document.addEventListener("keydown", $), W.appendChild(K), W.appendChild(V), Q && W.appendChild(Q);
        const z = s.closest('[role="dialog"]');
        z ? z.appendChild(W) : document.body.appendChild(W), requestAnimationFrame(() => {
          W.style.opacity = "1", K.style.transform = "scale(1)";
        });
      };
      D.addEventListener("click", R);
      let L, _;
      const O = (P) => {
        P.preventDefault(), L = P.clientX, _ = i.offsetWidth, document.addEventListener("mousemove", U), document.addEventListener("mouseup", I);
      }, U = (P) => {
        const W = P.clientX - L, K = Math.max(100, _ + W);
        i.style.width = `${K}px`;
      }, I = () => {
        document.removeEventListener("mousemove", U), document.removeEventListener("mouseup", I), setTimeout(() => {
        }, 100);
        const P = typeof o == "function" ? o() : null, W = i.offsetWidth;
        if (P != null)
          try {
            const { state: K, dispatch: V } = n.view, G = K.doc.nodeAt(P);
            if (G && G.type.name === "resizableImage") {
              const Q = K.tr.setNodeMarkup(P, void 0, {
                ...G.attrs,
                width: W
              });
              V(Q);
            }
          } catch {
            n.chain().focus().setNodeSelection(P).updateAttributes("resizableImage", {
              width: W
            }).run();
          }
      };
      return u.addEventListener("mousedown", O), {
        dom: s,
        update: (P) => P.type.name !== "resizableImage" ? !1 : (r = P, c(P.attrs.src), i.alt = P.attrs.alt || "", P.attrs.width && (i.style.width = `${P.attrs.width}px`), a(P.attrs.align || "left"), !0),
        destroy: () => {
          u.removeEventListener("mousedown", O), D.removeEventListener("click", R), document.removeEventListener("click", S), f.remove();
        }
      };
    };
  }
});
function tN(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const nN = {}, $n = {};
function Ht(e, t) {
  try {
    const o = (nN[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return o in $n ? $n[o] : Ta(o, o.split(":"));
  } catch {
    if (e in $n) return $n[e];
    const n = e?.match(oN);
    return n ? Ta(e, n.slice(1)) : NaN;
  }
}
const oN = /([+-]\d\d):?(\d\d)?/;
function Ta(e, t) {
  const n = +(t[0] || 0), o = +(t[1] || 0), r = +(t[2] || 0) / 60;
  return $n[e] = n * 60 + o > 0 ? n * 60 + o + r : n * 60 - o - r;
}
class tt extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Ht(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), pu(this), Ts(this)) : this.setTime(Date.now());
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
    const t = -Ht(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Ts(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new tt(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Sa = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Sa.test(e)) return;
  const t = e.replace(Sa, "$1UTC");
  tt.prototype[t] && (e.startsWith("get") ? tt.prototype[e] = function() {
    return this.internal[t]();
  } : (tt.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), rN(this), +this;
  }, tt.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Ts(this), +this;
  }));
});
function Ts(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Ht(e.timeZone, e) * 60));
}
function rN(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), pu(e);
}
function pu(e) {
  const t = Ht(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), o = /* @__PURE__ */ new Date(+e);
  o.setUTCHours(o.getUTCHours() - 1);
  const r = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+o)).getTimezoneOffset(), a = r - s, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const l = r - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const c = /* @__PURE__ */ new Date(+e);
  c.setUTCSeconds(0);
  const u = r > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, d = Math.round(-(Ht(e.timeZone, e) * 60)) % 60;
  (d || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + u));
  const f = Ht(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, b = p !== n, v = g - l;
  if (b && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const N = Ht(e.timeZone, e), y = N > 0 ? Math.floor(N) : Math.ceil(N), E = p - y;
    E && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + E), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + E));
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
    return `${t} GMT${n}${o}${r} (${tN(this.timeZone, this)})`;
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
const hu = 6048e5, sN = 864e5, Ma = Symbol.for("constructDateFrom");
function xe(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ma in e ? e[Ma](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function he(e, t) {
  return xe(t || e, e);
}
function gu(e, t, n) {
  const o = he(e, n?.in);
  return isNaN(t) ? xe(e, NaN) : (t && o.setDate(o.getDate() + t), o);
}
function bu(e, t, n) {
  const o = he(e, n?.in);
  if (isNaN(t)) return xe(e, NaN);
  if (!t)
    return o;
  const r = o.getDate(), s = xe(e, o.getTime());
  s.setMonth(o.getMonth() + t + 1, 0);
  const a = s.getDate();
  return r >= a ? s : (o.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    r
  ), o);
}
let iN = {};
function to() {
  return iN;
}
function bn(e, t) {
  const n = to(), o = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = he(e, t?.in), s = r.getDay(), a = (s < o ? 7 : 0) + s - o;
  return r.setDate(r.getDate() - a), r.setHours(0, 0, 0, 0), r;
}
function Gn(e, t) {
  return bn(e, { ...t, weekStartsOn: 1 });
}
function vu(e, t) {
  const n = he(e, t?.in), o = n.getFullYear(), r = xe(n, 0);
  r.setFullYear(o + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Gn(r), a = xe(n, 0);
  a.setFullYear(o, 0, 4), a.setHours(0, 0, 0, 0);
  const i = Gn(a);
  return n.getTime() >= s.getTime() ? o + 1 : n.getTime() >= i.getTime() ? o : o - 1;
}
function Da(e) {
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
function Sn(e, ...t) {
  const n = xe.bind(
    null,
    t.find((o) => typeof o == "object")
  );
  return t.map(n);
}
function qn(e, t) {
  const n = he(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Nu(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  ), s = qn(o), a = qn(r), i = +s - Da(s), l = +a - Da(a);
  return Math.round((i - l) / sN);
}
function aN(e, t) {
  const n = vu(e, t), o = xe(e, 0);
  return o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0), Gn(o);
}
function lN(e, t, n) {
  return gu(e, t * 7, n);
}
function cN(e, t, n) {
  return bu(e, t * 12, n);
}
function uN(e, t) {
  let n, o = t?.in;
  return e.forEach((r) => {
    !o && typeof r == "object" && (o = xe.bind(null, r));
    const s = he(r, o);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), xe(o, n || NaN);
}
function dN(e, t) {
  let n, o = t?.in;
  return e.forEach((r) => {
    !o && typeof r == "object" && (o = xe.bind(null, r));
    const s = he(r, o);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), xe(o, n || NaN);
}
function mN(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  );
  return +qn(o) == +qn(r);
}
function yu(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function fN(e) {
  return !(!yu(e) && typeof e != "number" || isNaN(+he(e)));
}
function pN(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  ), s = o.getFullYear() - r.getFullYear(), a = o.getMonth() - r.getMonth();
  return s * 12 + a;
}
function hN(e, t) {
  const n = he(e, t?.in), o = n.getMonth();
  return n.setFullYear(n.getFullYear(), o + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function xu(e, t) {
  const [n, o] = Sn(e, t.start, t.end);
  return { start: n, end: o };
}
function gN(e, t) {
  const { start: n, end: o } = xu(t?.in, e);
  let r = +n > +o;
  const s = r ? +n : +o, a = r ? o : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(xe(n, a)), a.setMonth(a.getMonth() + i);
  return r ? l.reverse() : l;
}
function bN(e, t) {
  const n = he(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function vN(e, t) {
  const n = he(e, t?.in), o = n.getFullYear();
  return n.setFullYear(o + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function wu(e, t) {
  const n = he(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function NN(e, t) {
  const { start: n, end: o } = xu(t?.in, e);
  let r = +n > +o;
  const s = r ? +n : +o, a = r ? o : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(xe(n, a)), a.setFullYear(a.getFullYear() + i);
  return r ? l.reverse() : l;
}
function ku(e, t) {
  const n = to(), o = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = he(e, t?.in), s = r.getDay(), a = (s < o ? -7 : 0) + 6 - (s - o);
  return r.setDate(r.getDate() + a), r.setHours(23, 59, 59, 999), r;
}
function yN(e, t) {
  return ku(e, { ...t, weekStartsOn: 1 });
}
const xN = {
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
}, wN = (e, t, n) => {
  let o;
  const r = xN[e];
  return typeof r == "string" ? o = r : t === 1 ? o = r.one : o = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + o : o + " ago" : o;
};
function Qr(e) {
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
}, CN = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, EN = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, TN = {
  date: Qr({
    formats: kN,
    defaultWidth: "full"
  }),
  time: Qr({
    formats: CN,
    defaultWidth: "full"
  }),
  dateTime: Qr({
    formats: EN,
    defaultWidth: "full"
  })
}, SN = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, MN = (e, t, n, o) => SN[e];
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
const DN = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, AN = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, PN = {
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
}, IN = {
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
}, RN = {
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
}, LN = {
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
}, ON = (e, t) => {
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
}, _N = {
  ordinalNumber: ON,
  era: Rn({
    values: DN,
    defaultWidth: "wide"
  }),
  quarter: Rn({
    values: AN,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Rn({
    values: PN,
    defaultWidth: "wide"
  }),
  day: Rn({
    values: IN,
    defaultWidth: "wide"
  }),
  dayPeriod: Rn({
    values: RN,
    defaultWidth: "wide",
    formattingValues: LN,
    defaultFormattingWidth: "wide"
  })
};
function Ln(e) {
  return (t, n = {}) => {
    const o = n.width, r = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth], s = t.match(r);
    if (!s)
      return null;
    const a = s[0], i = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? WN(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      $N(i, (d) => d.test(a))
    );
    let c;
    c = e.valueCallback ? e.valueCallback(l) : l, c = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(c)
    ) : c;
    const u = t.slice(a.length);
    return { value: c, rest: u };
  };
}
function $N(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function WN(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function BN(e) {
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
const HN = /^(\d+)(th|st|nd|rd)?/i, FN = /\d+/i, zN = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, UN = {
  any: [/^b/i, /^(a|c)/i]
}, YN = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, jN = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, VN = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, KN = {
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
}, GN = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, qN = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, XN = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, ZN = {
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
}, QN = {
  ordinalNumber: BN({
    matchPattern: HN,
    parsePattern: FN,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ln({
    matchPatterns: zN,
    defaultMatchWidth: "wide",
    parsePatterns: UN,
    defaultParseWidth: "any"
  }),
  quarter: Ln({
    matchPatterns: YN,
    defaultMatchWidth: "wide",
    parsePatterns: jN,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ln({
    matchPatterns: VN,
    defaultMatchWidth: "wide",
    parsePatterns: KN,
    defaultParseWidth: "any"
  }),
  day: Ln({
    matchPatterns: GN,
    defaultMatchWidth: "wide",
    parsePatterns: qN,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ln({
    matchPatterns: XN,
    defaultMatchWidth: "any",
    parsePatterns: ZN,
    defaultParseWidth: "any"
  })
}, gi = {
  code: "en-US",
  formatDistance: wN,
  formatLong: TN,
  formatRelative: MN,
  localize: _N,
  match: QN,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function JN(e, t) {
  const n = he(e, t?.in);
  return Nu(n, wu(n)) + 1;
}
function Cu(e, t) {
  const n = he(e, t?.in), o = +Gn(n) - +aN(n);
  return Math.round(o / hu) + 1;
}
function Eu(e, t) {
  const n = he(e, t?.in), o = n.getFullYear(), r = to(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = xe(t?.in || e, 0);
  a.setFullYear(o + 1, 0, s), a.setHours(0, 0, 0, 0);
  const i = bn(a, t), l = xe(t?.in || e, 0);
  l.setFullYear(o, 0, s), l.setHours(0, 0, 0, 0);
  const c = bn(l, t);
  return +n >= +i ? o + 1 : +n >= +c ? o : o - 1;
}
function e0(e, t) {
  const n = to(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, r = Eu(e, t), s = xe(t?.in || e, 0);
  return s.setFullYear(r, 0, o), s.setHours(0, 0, 0, 0), bn(s, t);
}
function Tu(e, t) {
  const n = he(e, t?.in), o = +bn(n, t) - +e0(n, t);
  return Math.round(o / hu) + 1;
}
function pe(e, t) {
  const n = e < 0 ? "-" : "", o = Math.abs(e).toString().padStart(t, "0");
  return n + o;
}
const Et = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), o = n > 0 ? n : 1 - n;
    return pe(t === "yy" ? o % 100 : o, t.length);
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
    const n = t.length, o = e.getMilliseconds(), r = Math.trunc(
      o * Math.pow(10, n - 3)
    );
    return pe(r, t.length);
  }
}, nn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Aa = {
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
    const r = Eu(e, o), s = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const a = s % 100;
      return pe(a, 2);
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
    const o = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(o);
      // 01, 02, 03, 04
      case "QQ":
        return pe(o, 2);
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
        return pe(o, 2);
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
        return pe(o + 1, 2);
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
    const r = Tu(e, o);
    return t === "wo" ? n.ordinalNumber(r, { unit: "week" }) : pe(r, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const o = Cu(e);
    return t === "Io" ? n.ordinalNumber(o, { unit: "week" }) : pe(o, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Et.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const o = JN(e);
    return t === "Do" ? n.ordinalNumber(o, { unit: "dayOfYear" }) : pe(o, t.length);
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
        return pe(s, 2);
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
        return pe(s, t.length);
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
        return pe(r, t.length);
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
    return t === "Ko" ? n.ordinalNumber(o, { unit: "hour" }) : pe(o, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let o = e.getHours();
    return o === 0 && (o = 24), t === "ko" ? n.ordinalNumber(o, { unit: "hour" }) : pe(o, t.length);
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
        return Ia(o);
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
        return Ia(o);
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
        return "GMT" + Pa(o, ":");
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
        return "GMT" + Pa(o, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + $t(o, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const o = Math.trunc(+e / 1e3);
    return pe(o, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return pe(+e, t.length);
  }
};
function Pa(e, t = "") {
  const n = e > 0 ? "-" : "+", o = Math.abs(e), r = Math.trunc(o / 60), s = o % 60;
  return s === 0 ? n + String(r) : n + String(r) + t + pe(s, 2);
}
function Ia(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + pe(Math.abs(e) / 60, 2) : $t(e, t);
}
function $t(e, t = "") {
  const n = e > 0 ? "-" : "+", o = Math.abs(e), r = pe(Math.trunc(o / 60), 2), s = pe(o % 60, 2);
  return n + r + t + s;
}
const Ra = (e, t) => {
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
}, Su = (e, t) => {
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
}, t0 = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], o = n[1], r = n[2];
  if (!r)
    return Ra(e, t);
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
  return s.replace("{{date}}", Ra(o, t)).replace("{{time}}", Su(r, t));
}, n0 = {
  p: Su,
  P: t0
}, o0 = /^D+$/, r0 = /^Y+$/, s0 = ["D", "DD", "YY", "YYYY"];
function i0(e) {
  return o0.test(e);
}
function a0(e) {
  return r0.test(e);
}
function l0(e, t, n) {
  const o = c0(e, t, n);
  if (console.warn(o), s0.includes(e)) throw new RangeError(o);
}
function c0(e, t, n) {
  const o = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${o} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const u0 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, d0 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, m0 = /^'([^]*?)'?$/, f0 = /''/g, p0 = /[a-zA-Z]/;
function h0(e, t, n) {
  const o = to(), r = n?.locale ?? o.locale ?? gi, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? o.weekStartsOn ?? o.locale?.options?.weekStartsOn ?? 0, i = he(e, n?.in);
  if (!fN(i))
    throw new RangeError("Invalid time value");
  let l = t.match(d0).map((u) => {
    const d = u[0];
    if (d === "p" || d === "P") {
      const f = n0[d];
      return f(u, r.formatLong);
    }
    return u;
  }).join("").match(u0).map((u) => {
    if (u === "''")
      return { isToken: !1, value: "'" };
    const d = u[0];
    if (d === "'")
      return { isToken: !1, value: g0(u) };
    if (Aa[d])
      return { isToken: !0, value: u };
    if (d.match(p0))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: u };
  });
  r.localize.preprocessor && (l = r.localize.preprocessor(i, l));
  const c = {
    firstWeekContainsDate: s,
    weekStartsOn: a,
    locale: r
  };
  return l.map((u) => {
    if (!u.isToken) return u.value;
    const d = u.value;
    (!n?.useAdditionalWeekYearTokens && a0(d) || !n?.useAdditionalDayOfYearTokens && i0(d)) && l0(d, t, String(e));
    const f = Aa[d[0]];
    return f(i, d, r.localize, c);
  }).join("");
}
function g0(e) {
  const t = e.match(m0);
  return t ? t[1].replace(f0, "'") : e;
}
function b0(e, t) {
  const n = he(e, t?.in), o = n.getFullYear(), r = n.getMonth(), s = xe(n, 0);
  return s.setFullYear(o, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function v0(e, t) {
  return he(e, t?.in).getMonth();
}
function N0(e, t) {
  return he(e, t?.in).getFullYear();
}
function y0(e, t) {
  return +he(e) > +he(t);
}
function x0(e, t) {
  return +he(e) < +he(t);
}
function w0(e, t, n) {
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
function C0(e, t, n) {
  const o = he(e, n?.in), r = o.getFullYear(), s = o.getDate(), a = xe(e, 0);
  a.setFullYear(r, t, 15), a.setHours(0, 0, 0, 0);
  const i = b0(a);
  return o.setMonth(t, Math.min(s, i)), o;
}
function E0(e, t, n) {
  const o = he(e, n?.in);
  return isNaN(+o) ? xe(e, NaN) : (o.setFullYear(t), o);
}
const La = 5, T0 = 4;
function S0(e, t) {
  const n = t.startOfMonth(e), o = n.getDay() > 0 ? n.getDay() : 7, r = t.addDays(e, -o + 1), s = t.addDays(r, La * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? La : T0;
}
function Mu(e, t) {
  const n = t.startOfMonth(e), o = n.getDay();
  return o === 1 ? n : o === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (o - 1));
}
function M0(e, t) {
  const n = Mu(e, t), o = S0(e, t);
  return t.addDays(n, o * 7 - 1);
}
class He {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ae.tz(this.options.timeZone) : new this.Date(), this.newDate = (o, r, s) => this.overrides?.newDate ? this.overrides.newDate(o, r, s) : this.options.timeZone ? new Ae(o, r, s, this.options.timeZone) : new Date(o, r, s), this.addDays = (o, r) => this.overrides?.addDays ? this.overrides.addDays(o, r) : gu(o, r), this.addMonths = (o, r) => this.overrides?.addMonths ? this.overrides.addMonths(o, r) : bu(o, r), this.addWeeks = (o, r) => this.overrides?.addWeeks ? this.overrides.addWeeks(o, r) : lN(o, r), this.addYears = (o, r) => this.overrides?.addYears ? this.overrides.addYears(o, r) : cN(o, r), this.differenceInCalendarDays = (o, r) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(o, r) : Nu(o, r), this.differenceInCalendarMonths = (o, r) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(o, r) : pN(o, r), this.eachMonthOfInterval = (o) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(o) : gN(o), this.eachYearOfInterval = (o) => {
      const r = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(o) : NN(o), s = new Set(r.map((i) => this.getYear(i)));
      if (s.size === r.length)
        return r;
      const a = [];
      return s.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (o) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(o) : M0(o, this), this.endOfISOWeek = (o) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(o) : yN(o), this.endOfMonth = (o) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(o) : hN(o), this.endOfWeek = (o, r) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(o, r) : ku(o, this.options), this.endOfYear = (o) => this.overrides?.endOfYear ? this.overrides.endOfYear(o) : vN(o), this.format = (o, r, s) => {
      const a = this.overrides?.format ? this.overrides.format(o, r, this.options) : h0(o, r, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (o) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(o) : Cu(o), this.getMonth = (o, r) => this.overrides?.getMonth ? this.overrides.getMonth(o, this.options) : v0(o, this.options), this.getYear = (o, r) => this.overrides?.getYear ? this.overrides.getYear(o, this.options) : N0(o, this.options), this.getWeek = (o, r) => this.overrides?.getWeek ? this.overrides.getWeek(o, this.options) : Tu(o, this.options), this.isAfter = (o, r) => this.overrides?.isAfter ? this.overrides.isAfter(o, r) : y0(o, r), this.isBefore = (o, r) => this.overrides?.isBefore ? this.overrides.isBefore(o, r) : x0(o, r), this.isDate = (o) => this.overrides?.isDate ? this.overrides.isDate(o) : yu(o), this.isSameDay = (o, r) => this.overrides?.isSameDay ? this.overrides.isSameDay(o, r) : mN(o, r), this.isSameMonth = (o, r) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(o, r) : w0(o, r), this.isSameYear = (o, r) => this.overrides?.isSameYear ? this.overrides.isSameYear(o, r) : k0(o, r), this.max = (o) => this.overrides?.max ? this.overrides.max(o) : uN(o), this.min = (o) => this.overrides?.min ? this.overrides.min(o) : dN(o), this.setMonth = (o, r) => this.overrides?.setMonth ? this.overrides.setMonth(o, r) : C0(o, r), this.setYear = (o, r) => this.overrides?.setYear ? this.overrides.setYear(o, r) : E0(o, r), this.startOfBroadcastWeek = (o, r) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(o, this) : Mu(o, this), this.startOfDay = (o) => this.overrides?.startOfDay ? this.overrides.startOfDay(o) : qn(o), this.startOfISOWeek = (o) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(o) : Gn(o), this.startOfMonth = (o) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(o) : bN(o), this.startOfWeek = (o, r) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(o, this.options) : bn(o, this.options), this.startOfYear = (o) => this.overrides?.startOfYear ? this.overrides.startOfYear(o) : wu(o), this.options = { locale: gi, ...t }, this.overrides = n;
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
    return t && He.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: o, numerals: r } = this.options, s = n?.code;
    if (s && He.yearFirstLocales.has(s))
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
He.yearFirstLocales = /* @__PURE__ */ new Set([
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
const it = new He();
class Du {
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
class D0 {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class A0 {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function P0(e) {
  return X.createElement("button", { ...e });
}
function I0(e) {
  return X.createElement("span", { ...e });
}
function R0(e) {
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
function L0(e) {
  const { day: t, modifiers: n, ...o } = e;
  return X.createElement("td", { ...o });
}
function O0(e) {
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
var Ge;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ge || (Ge = {}));
var $e;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})($e || ($e = {}));
function _0(e) {
  const { options: t, className: n, components: o, classNames: r, ...s } = e, a = [r[te.Dropdown], n].join(" "), i = t?.find(({ value: l }) => l === s.value);
  return X.createElement(
    "span",
    { "data-disabled": s.disabled, className: r[te.DropdownRoot] },
    X.createElement(o.Select, { className: a, ...s }, t?.map(({ value: l, label: c, disabled: u }) => X.createElement(o.Option, { key: l, value: l, disabled: u }, c))),
    X.createElement(
      "span",
      { className: r[te.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      X.createElement(o.Chevron, { orientation: "down", size: 18, className: r[te.Chevron] })
    )
  );
}
function $0(e) {
  return X.createElement("div", { ...e });
}
function W0(e) {
  return X.createElement("div", { ...e });
}
function B0(e) {
  const { calendarMonth: t, displayIndex: n, ...o } = e;
  return X.createElement("div", { ...o }, e.children);
}
function H0(e) {
  const { calendarMonth: t, displayIndex: n, ...o } = e;
  return X.createElement("div", { ...o });
}
function F0(e) {
  return X.createElement("table", { ...e });
}
function z0(e) {
  return X.createElement("div", { ...e });
}
const Au = nl(void 0);
function no() {
  const e = ol(Au);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function U0(e) {
  const { components: t } = no();
  return X.createElement(t.Dropdown, { ...e });
}
function Y0(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: o, nextMonth: r, ...s } = e, { components: a, classNames: i, labels: { labelPrevious: l, labelNext: c } } = no(), u = H((f) => {
    r && n?.(f);
  }, [r, n]), d = H((f) => {
    o && t?.(f);
  }, [o, t]);
  return X.createElement(
    "nav",
    { ...s },
    X.createElement(
      a.PreviousMonthButton,
      { type: "button", className: i[te.PreviousMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: d },
      X.createElement(a.Chevron, { disabled: o ? void 0 : !0, className: i[te.Chevron], orientation: "left" })
    ),
    X.createElement(
      a.NextMonthButton,
      { type: "button", className: i[te.NextMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: u },
      X.createElement(a.Chevron, { disabled: r ? void 0 : !0, orientation: "right", className: i[te.Chevron] })
    )
  );
}
function j0(e) {
  const { components: t } = no();
  return X.createElement(t.Button, { ...e });
}
function V0(e) {
  return X.createElement("option", { ...e });
}
function K0(e) {
  const { components: t } = no();
  return X.createElement(t.Button, { ...e });
}
function G0(e) {
  const { rootRef: t, ...n } = e;
  return X.createElement("div", { ...n, ref: t });
}
function q0(e) {
  return X.createElement("select", { ...e });
}
function X0(e) {
  const { week: t, ...n } = e;
  return X.createElement("tr", { ...n });
}
function Z0(e) {
  return X.createElement("th", { ...e });
}
function Q0(e) {
  return X.createElement(
    "thead",
    { "aria-hidden": !0 },
    X.createElement("tr", { ...e })
  );
}
function J0(e) {
  const { week: t, ...n } = e;
  return X.createElement("th", { ...n });
}
function ey(e) {
  return X.createElement("th", { ...e });
}
function ty(e) {
  return X.createElement("tbody", { ...e });
}
function ny(e) {
  const { components: t } = no();
  return X.createElement(t.Dropdown, { ...e });
}
const oy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: P0,
  CaptionLabel: I0,
  Chevron: R0,
  Day: L0,
  DayButton: O0,
  Dropdown: _0,
  DropdownNav: $0,
  Footer: W0,
  Month: B0,
  MonthCaption: H0,
  MonthGrid: F0,
  Months: z0,
  MonthsDropdown: U0,
  Nav: Y0,
  NextMonthButton: j0,
  Option: V0,
  PreviousMonthButton: K0,
  Root: G0,
  Select: q0,
  Week: X0,
  WeekNumber: J0,
  WeekNumberHeader: ey,
  Weekday: Z0,
  Weekdays: Q0,
  Weeks: ty,
  YearsDropdown: ny
}, Symbol.toStringTag, { value: "Module" }));
function mt(e, t, n = !1, o = it) {
  let { from: r, to: s } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = o;
  return r && s ? (a(s, r) < 0 && ([r, s] = [s, r]), a(t, r) >= (n ? 1 : 0) && a(s, t) >= (n ? 1 : 0)) : !n && s ? i(s, t) : !n && r ? i(r, t) : !1;
}
function Pu(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function bi(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Iu(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Ru(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Lu(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Ou(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function ft(e, t, n = it) {
  const o = Array.isArray(t) ? t : [t], { isSameDay: r, differenceInCalendarDays: s, isAfter: a } = n;
  return o.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return r(e, i);
    if (Ou(i, n))
      return i.includes(e);
    if (bi(i))
      return mt(i, e, !1, n);
    if (Lu(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Pu(i)) {
      const l = s(i.before, e), c = s(i.after, e), u = l > 0, d = c < 0;
      return a(i.before, i.after) ? d && u : u || d;
    }
    return Iu(i) ? s(e, i.after) > 0 : Ru(i) ? s(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function ry(e, t, n, o, r) {
  const { disabled: s, hidden: a, modifiers: i, showOutsideDays: l, broadcastCalendar: c, today: u } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: h, endOfMonth: g, isAfter: b } = r, v = n && p(n), N = o && g(o), y = {
    [ge.focused]: [],
    [ge.outside]: [],
    [ge.disabled]: [],
    [ge.hidden]: [],
    [ge.today]: []
  }, E = {};
  for (const x of e) {
    const { date: w, displayMonth: M } = x, k = !!(M && !f(w, M)), C = !!(v && h(w, v)), S = !!(N && b(w, N)), D = !!(s && ft(w, s, r)), A = !!(a && ft(w, a, r)) || C || S || // Broadcast calendar will show outside days as default
    !c && !l && k || c && l === !1 && k, R = d(w, u ?? r.today());
    k && y.outside.push(x), D && y.disabled.push(x), A && y.hidden.push(x), R && y.today.push(x), i && Object.keys(i).forEach((L) => {
      const _ = i?.[L];
      _ && ft(w, _, r) && (E[L] ? E[L].push(x) : E[L] = [x]);
    });
  }
  return (x) => {
    const w = {
      [ge.focused]: !1,
      [ge.disabled]: !1,
      [ge.hidden]: !1,
      [ge.outside]: !1,
      [ge.today]: !1
    }, M = {};
    for (const k in y) {
      const C = y[k];
      w[k] = C.some((S) => S === x);
    }
    for (const k in E)
      M[k] = E[k].some((C) => C === x);
    return {
      ...w,
      // custom modifiers should override all the previous ones
      ...M
    };
  };
}
function sy(e, t, n = {}) {
  return Object.entries(e).filter(([, r]) => r === !0).reduce((r, [s]) => (n[s] ? r.push(n[s]) : t[ge[s]] ? r.push(t[ge[s]]) : t[Ge[s]] && r.push(t[Ge[s]]), r), [t[te.Day]]);
}
function iy(e) {
  return {
    ...oy,
    ...e
  };
}
function ay(e) {
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
function vi() {
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
  return (n ?? new He(t)).formatMonthYear(e);
}
const ly = _u;
function cy(e, t, n) {
  return (n ?? new He(t)).format(e, "d");
}
function uy(e, t = it) {
  return t.format(e, "LLLL");
}
function dy(e, t, n) {
  return (n ?? new He(t)).format(e, "cccccc");
}
function my(e, t = it) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function fy() {
  return "";
}
function $u(e, t = it) {
  return t.format(e, "yyyy");
}
const py = $u, hy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: _u,
  formatDay: cy,
  formatMonthCaption: ly,
  formatMonthDropdown: uy,
  formatWeekNumber: my,
  formatWeekNumberHeader: fy,
  formatWeekdayName: dy,
  formatYearCaption: py,
  formatYearDropdown: $u
}, Symbol.toStringTag, { value: "Module" }));
function gy(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...hy,
    ...e
  };
}
function by(e, t, n, o, r) {
  const { startOfMonth: s, startOfYear: a, endOfYear: i, eachMonthOfInterval: l, getMonth: c } = r;
  return l({
    start: a(e),
    end: i(e)
  }).map((f) => {
    const p = o.formatMonthDropdown(f, r), h = c(f), g = t && f < s(t) || n && f > s(n) || !1;
    return { value: h, label: p, disabled: g };
  });
}
function vy(e, t = {}, n = {}) {
  let o = { ...t?.[te.Day] };
  return Object.entries(e).filter(([, r]) => r === !0).forEach(([r]) => {
    o = {
      ...o,
      ...n?.[r]
    };
  }), o;
}
function Ny(e, t, n) {
  const o = e.today(), r = t ? e.startOfISOWeek(o) : e.startOfWeek(o), s = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(r, a);
    s.push(i);
  }
  return s;
}
function yy(e, t, n, o, r = !1) {
  if (!e || !t)
    return;
  const { startOfYear: s, endOfYear: a, eachYearOfInterval: i, getYear: l } = o, c = s(e), u = a(t), d = i({ start: c, end: u });
  return r && d.reverse(), d.map((f) => {
    const p = n.formatYearDropdown(f, o);
    return {
      value: l(f),
      label: p,
      disabled: !1
    };
  });
}
function Wu(e, t, n, o) {
  let r = (o ?? new He(n)).format(e, "PPPP");
  return t.today && (r = `Today, ${r}`), t.selected && (r = `${r}, selected`), r;
}
const xy = Wu;
function Bu(e, t, n) {
  return (n ?? new He(t)).formatMonthYear(e);
}
const wy = Bu;
function ky(e, t, n, o) {
  let r = (o ?? new He(n)).format(e, "PPPP");
  return t?.today && (r = `Today, ${r}`), r;
}
function Cy(e) {
  return "Choose the Month";
}
function Ey() {
  return "";
}
function Ty(e) {
  return "Go to the Next Month";
}
function Sy(e) {
  return "Go to the Previous Month";
}
function My(e, t, n) {
  return (n ?? new He(t)).format(e, "cccc");
}
function Dy(e, t) {
  return `Week ${e}`;
}
function Ay(e) {
  return "Week Number";
}
function Py(e) {
  return "Choose the Year";
}
const Iy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: wy,
  labelDay: xy,
  labelDayButton: Wu,
  labelGrid: Bu,
  labelGridcell: ky,
  labelMonthDropdown: Cy,
  labelNav: Ey,
  labelNext: Ty,
  labelPrevious: Sy,
  labelWeekNumber: Dy,
  labelWeekNumberHeader: Ay,
  labelWeekday: My,
  labelYearDropdown: Py
}, Symbol.toStringTag, { value: "Module" })), oo = (e) => e instanceof HTMLElement ? e : null, Jr = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Ry = (e) => oo(e.querySelector("[data-animated-month]")), es = (e) => oo(e.querySelector("[data-animated-caption]")), ts = (e) => oo(e.querySelector("[data-animated-weeks]")), Ly = (e) => oo(e.querySelector("[data-animated-nav]")), Oy = (e) => oo(e.querySelector("[data-animated-weekdays]"));
function _y(e, t, { classNames: n, months: o, focused: r, dateLib: s }) {
  const a = j(null), i = j(o), l = j(!1);
  sr(() => {
    const c = i.current;
    if (i.current = o, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    o.length === 0 || c.length === 0 || o.length !== c.length)
      return;
    const u = s.isSameMonth(o[0].date, c[0].date), d = s.isAfter(o[0].date, c[0].date), f = d ? n[$e.caption_after_enter] : n[$e.caption_before_enter], p = d ? n[$e.weeks_after_enter] : n[$e.weeks_before_enter], h = a.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (Jr(g).forEach((y) => {
      if (!(y instanceof HTMLElement))
        return;
      const E = Ry(y);
      E && y.contains(E) && y.removeChild(E);
      const x = es(y);
      x && x.classList.remove(f);
      const w = ts(y);
      w && w.classList.remove(p);
    }), a.current = g) : a.current = null, l.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    r)
      return;
    const b = h instanceof HTMLElement ? Jr(h) : [], v = Jr(e.current);
    if (v?.every((N) => N instanceof HTMLElement) && b && b.every((N) => N instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const N = Ly(e.current);
      N && (N.style.zIndex = "1"), v.forEach((y, E) => {
        const x = b[E];
        if (!x)
          return;
        y.style.position = "relative", y.style.overflow = "hidden";
        const w = es(y);
        w && w.classList.add(f);
        const M = ts(y);
        M && M.classList.add(p);
        const k = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), N && (N.style.zIndex = ""), w && w.classList.remove(f), M && M.classList.remove(p), y.style.position = "", y.style.overflow = "", y.contains(x) && y.removeChild(x);
        };
        x.style.pointerEvents = "none", x.style.position = "absolute", x.style.overflow = "hidden", x.setAttribute("aria-hidden", "true");
        const C = Oy(x);
        C && (C.style.opacity = "0");
        const S = es(x);
        S && (S.classList.add(d ? n[$e.caption_before_exit] : n[$e.caption_after_exit]), S.addEventListener("animationend", k));
        const D = ts(x);
        D && D.classList.add(d ? n[$e.weeks_before_exit] : n[$e.weeks_after_exit]), y.insertBefore(x, y.firstChild);
      });
    }
  });
}
function $y(e, t, n, o) {
  const r = e[0], s = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: c, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: h, endOfWeek: g, isAfter: b, startOfBroadcastWeek: v, startOfISOWeek: N, startOfWeek: y } = o, E = l ? v(r, o) : a ? N(r) : y(r), x = l ? f(s) : a ? p(h(s)) : g(h(s)), w = u(x, E), M = d(s, r) + 1, k = [];
  for (let D = 0; D <= w; D++) {
    const A = c(E, D);
    if (t && b(A, t))
      break;
    k.push(A);
  }
  const S = (l ? 35 : 42) * M;
  if (i && k.length < S) {
    const D = S - k.length;
    for (let A = 0; A < D; A++) {
      const R = c(k[k.length - 1], 1);
      k.push(R);
    }
  }
  return k;
}
function Wy(e) {
  const t = [];
  return e.reduce((n, o) => {
    const r = o.weeks.reduce((s, a) => s.concat(a.days.slice()), t.slice());
    return n.concat(r.slice());
  }, t.slice());
}
function By(e, t, n, o) {
  const { numberOfMonths: r = 1 } = n, s = [];
  for (let a = 0; a < r; a++) {
    const i = o.addMonths(e, a);
    if (t && i > t)
      break;
    s.push(i);
  }
  return s;
}
function Oa(e, t, n, o) {
  const { month: r, defaultMonth: s, today: a = o.today(), numberOfMonths: i = 1 } = e;
  let l = r || s || a;
  const { differenceInCalendarMonths: c, addMonths: u, startOfMonth: d } = o;
  if (n && c(n, l) < i - 1) {
    const f = -1 * (i - 1);
    l = u(n, f);
  }
  return t && c(l, t) < 0 && (l = t), d(l);
}
function Hy(e, t, n, o) {
  const { addDays: r, endOfBroadcastWeek: s, endOfISOWeek: a, endOfMonth: i, endOfWeek: l, getISOWeek: c, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = o, h = e.reduce((g, b) => {
    const v = n.broadcastCalendar ? d(b, o) : n.ISOWeek ? f(b) : p(b), N = n.broadcastCalendar ? s(b) : n.ISOWeek ? a(i(b)) : l(i(b)), y = t.filter((M) => M >= v && M <= N), E = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && y.length < E) {
      const M = t.filter((k) => {
        const C = E - y.length;
        return k > N && k <= r(N, C);
      });
      y.push(...M);
    }
    const x = y.reduce((M, k) => {
      const C = n.ISOWeek ? c(k) : u(k), S = M.find((A) => A.weekNumber === C), D = new Du(k, b, o);
      return S ? S.days.push(D) : M.push(new A0(C, [D])), M;
    }, []), w = new D0(b, x);
    return g.push(w), g;
  }, []);
  return n.reverseMonths ? h.reverse() : h;
}
function Fy(e, t) {
  let { startMonth: n, endMonth: o } = e;
  const { startOfYear: r, startOfDay: s, startOfMonth: a, endOfMonth: i, addYears: l, endOfYear: c, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: h, toMonth: g } = e;
  !n && h && (n = h), !n && f && (n = t.newDate(f, 0, 1)), !o && g && (o = g), !o && p && (o = u(p, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : f ? n = u(f, 0, 1) : !n && b && (n = r(l(e.today ?? d(), -100))), o ? o = i(o) : p ? o = u(p, 11, 31) : !o && b && (o = c(e.today ?? d())), [
    n && s(n),
    o && s(o)
  ];
}
function zy(e, t, n, o) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: r, numberOfMonths: s = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = o, c = r ? s : 1, u = a(e);
  if (!t)
    return i(u, c);
  if (!(l(t, e) < s))
    return i(u, c);
}
function Uy(e, t, n, o) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: r, numberOfMonths: s } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = o, c = r ? s ?? 1 : 1, u = a(e);
  if (!t)
    return i(u, -c);
  if (!(l(u, t) <= 0))
    return i(u, -c);
}
function Yy(e) {
  const t = [];
  return e.reduce((n, o) => n.concat(o.weeks.slice()), t.slice());
}
function wr(e, t) {
  const [n, o] = Y(e);
  return [t === void 0 ? n : t, o];
}
function jy(e, t) {
  const [n, o] = Fy(e, t), { startOfMonth: r, endOfMonth: s } = t, a = Oa(e, n, o, t), [i, l] = wr(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  q(() => {
    const w = Oa(e, n, o, t);
    l(w);
  }, [e.timeZone]);
  const c = By(i, o, e, t), u = $y(c, e.endMonth ? s(e.endMonth) : void 0, e, t), d = Hy(c, u, e, t), f = Yy(d), p = Wy(d), h = Uy(i, n, e, t), g = zy(i, o, e, t), { disableNavigation: b, onMonthChange: v } = e, N = (w) => f.some((M) => M.days.some((k) => k.isEqualTo(w))), y = (w) => {
    if (b)
      return;
    let M = r(w);
    n && M < r(n) && (M = r(n)), o && M > r(o) && (M = r(o)), l(M), v?.(M);
  };
  return {
    months: d,
    weeks: f,
    days: p,
    navStart: n,
    navEnd: o,
    previousMonth: h,
    nextMonth: g,
    goToMonth: y,
    goToDay: (w) => {
      N(w) || y(w.date);
    }
  };
}
var Qe;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Qe || (Qe = {}));
function _a(e) {
  return !e[ge.disabled] && !e[ge.hidden] && !e[ge.outside];
}
function Vy(e, t, n, o) {
  let r, s = -1;
  for (const a of e) {
    const i = t(a);
    _a(i) && (i[ge.focused] && s < Qe.FocusedModifier ? (r = a, s = Qe.FocusedModifier) : o?.isEqualTo(a) && s < Qe.LastFocused ? (r = a, s = Qe.LastFocused) : n(a.date) && s < Qe.Selected ? (r = a, s = Qe.Selected) : i[ge.today] && s < Qe.Today && (r = a, s = Qe.Today));
  }
  return r || (r = e.find((a) => _a(t(a)))), r;
}
function Ky(e, t, n, o, r, s, a) {
  const { ISOWeek: i, broadcastCalendar: l } = s, { addDays: c, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: h, endOfWeek: g, max: b, min: v, startOfBroadcastWeek: N, startOfISOWeek: y, startOfWeek: E } = a;
  let w = {
    day: c,
    week: d,
    month: u,
    year: f,
    startOfWeek: (M) => l ? N(M, a) : i ? y(M) : E(M),
    endOfWeek: (M) => l ? p(M) : i ? h(M) : g(M)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && o ? w = b([o, w]) : t === "after" && r && (w = v([r, w])), w;
}
function Hu(e, t, n, o, r, s, a, i = 0) {
  if (i > 365)
    return;
  const l = Ky(e, t, n.date, o, r, s, a), c = !!(s.disabled && ft(l, s.disabled, a)), u = !!(s.hidden && ft(l, s.hidden, a)), d = l, f = new Du(l, d, a);
  return !c && !u ? f : Hu(e, t, f, o, r, s, a, i + 1);
}
function Gy(e, t, n, o, r) {
  const { autoFocus: s } = e, [a, i] = Y(), l = Vy(t.days, n, o || (() => !1), a), [c, u] = Y(s ? l : void 0);
  return {
    isFocusTarget: (g) => !!l?.isEqualTo(g),
    setFocused: u,
    focused: c,
    blur: () => {
      i(c), u(void 0);
    },
    moveFocus: (g, b) => {
      if (!c)
        return;
      const v = Hu(g, b, c, t.navStart, t.navEnd, e, r);
      v && (e.disableNavigation && !t.days.some((y) => y.isEqualTo(v)) || (t.goToDay(v), u(v)));
    }
  };
}
function qy(e, t) {
  const { selected: n, required: o, onSelect: r } = e, [s, a] = wr(n, r ? n : void 0), i = r ? n : s, { isSameDay: l } = t, c = (p) => i?.some((h) => l(h, p)) ?? !1, { min: u, max: d } = e;
  return {
    selected: i,
    select: (p, h, g) => {
      let b = [...i ?? []];
      if (c(p)) {
        if (i?.length === u || o && i?.length === 1)
          return;
        b = i?.filter((v) => !l(v, p));
      } else
        i?.length === d ? b = [p] : b = [...b, p];
      return r || a(b), r?.(b, p, h, g), b;
    },
    isSelected: c
  };
}
function Xy(e, t, n = 0, o = 0, r = !1, s = it) {
  const { from: a, to: i } = t || {}, { isSameDay: l, isAfter: c, isBefore: u } = s;
  let d;
  if (!a && !i)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (a && !i)
    l(a, e) ? n === 0 ? d = { from: a, to: e } : r ? d = { from: a, to: void 0 } : d = void 0 : u(e, a) ? d = { from: e, to: a } : d = { from: a, to: e };
  else if (a && i)
    if (l(a, e) && l(i, e))
      r ? d = { from: a, to: i } : d = void 0;
    else if (l(a, e))
      d = { from: a, to: n > 0 ? void 0 : e };
    else if (l(i, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (u(e, a))
      d = { from: e, to: i };
    else if (c(e, a))
      d = { from: a, to: e };
    else if (c(e, i))
      d = { from: a, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const f = s.differenceInCalendarDays(d.to, d.from);
    o > 0 && f > o ? d = { from: e, to: void 0 } : n > 1 && f < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function Zy(e, t, n = it) {
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
function $a(e, t, n = it) {
  return mt(e, t.from, !1, n) || mt(e, t.to, !1, n) || mt(t, e.from, !1, n) || mt(t, e.to, !1, n);
}
function Qy(e, t, n = it) {
  const o = Array.isArray(t) ? t : [t];
  if (o.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? mt(e, i, !1, n) : Ou(i, n) ? i.some((l) => mt(e, l, !1, n)) : bi(i) ? i.from && i.to ? $a(e, { from: i.from, to: i.to }, n) : !1 : Lu(i) ? Zy(e, i.dayOfWeek, n) : Pu(i) ? n.isAfter(i.before, i.after) ? $a(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : ft(e.from, i, n) || ft(e.to, i, n) : Iu(i) || Ru(i) ? ft(e.from, i, n) || ft(e.to, i, n) : !1))
    return !0;
  const a = o.filter((i) => typeof i == "function");
  if (a.length) {
    let i = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let c = 0; c <= l; c++) {
      if (a.some((u) => u(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function Jy(e, t) {
  const { disabled: n, excludeDisabled: o, selected: r, required: s, onSelect: a } = e, [i, l] = wr(r, a ? r : void 0), c = a ? r : i;
  return {
    selected: c,
    select: (f, p, h) => {
      const { min: g, max: b } = e, v = f ? Xy(f, c, g, b, s, t) : void 0;
      return o && n && v?.from && v.to && Qy({ from: v.from, to: v.to }, n, t) && (v.from = f, v.to = void 0), a || l(v), a?.(v, f, p, h), v;
    },
    isSelected: (f) => c && mt(c, f, !1, t)
  };
}
function ex(e, t) {
  const { selected: n, required: o, onSelect: r } = e, [s, a] = wr(n, r ? n : void 0), i = r ? n : s, { isSameDay: l } = t;
  return {
    selected: i,
    select: (d, f, p) => {
      let h = d;
      return !o && i && i && l(d, i) && (h = void 0), r || a(h), r?.(h, d, f, p), h;
    },
    isSelected: (d) => i ? l(i, d) : !1
  };
}
function tx(e, t) {
  const n = ex(e, t), o = qy(e, t), r = Jy(e, t);
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
function nx(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ae(t.today, t.timeZone)), t.month && (t.month = new Ae(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ae(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ae(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ae(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ae(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((oe) => new Ae(oe, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ae(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ae(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: o, labels: r, dateLib: s, locale: a, classNames: i } = zt(() => {
    const oe = { ...gi, ...t.locale };
    return {
      dateLib: new He({
        locale: oe,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: iy(t.components),
      formatters: gy(t.formatters),
      labels: { ...Iy, ...t.labels },
      locale: oe,
      classNames: { ...vi(), ...t.classNames }
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
  ]), { captionLayout: l, mode: c, navLayout: u, numberOfMonths: d = 1, onDayBlur: f, onDayClick: p, onDayFocus: h, onDayKeyDown: g, onDayMouseEnter: b, onDayMouseLeave: v, onNextClick: N, onPrevClick: y, showWeekNumber: E, styles: x } = t, { formatCaption: w, formatDay: M, formatMonthDropdown: k, formatWeekNumber: C, formatWeekNumberHeader: S, formatWeekdayName: D, formatYearDropdown: A } = o, R = jy(t, s), { days: L, months: _, navStart: O, navEnd: U, previousMonth: I, nextMonth: P, goToMonth: W } = R, K = ry(L, t, O, U, s), { isSelected: V, select: G, selected: Q } = tx(t, s) ?? {}, { blur: B, focused: $, isFocusTarget: z, moveFocus: Z, setFocused: ce } = Gy(t, R, K, V ?? (() => !1), s), { labelDayButton: ue, labelGridcell: ve, labelGrid: Ee, labelMonthDropdown: Fe, labelNav: yt, labelPrevious: Mn, labelNext: Dn, labelWeekday: ro, labelWeekNumber: so, labelWeekNumberHeader: io, labelYearDropdown: ao } = r, lo = zt(() => Ny(s, t.ISOWeek), [s, t.ISOWeek]), Rt = c !== void 0 || p !== void 0, Kt = H(() => {
    I && (W(I), y?.(I));
  }, [I, W, y]), Gt = H(() => {
    P && (W(P), N?.(P));
  }, [W, P, N]), co = H((oe, fe) => (ne) => {
    ne.preventDefault(), ne.stopPropagation(), ce(oe), G?.(oe.date, fe, ne), p?.(oe.date, fe, ne);
  }, [G, p, ce]), uo = H((oe, fe) => (ne) => {
    ce(oe), h?.(oe.date, fe, ne);
  }, [h, ce]), Cr = H((oe, fe) => (ne) => {
    B(), f?.(oe.date, fe, ne);
  }, [B, f]), Er = H((oe, fe) => (ne) => {
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
    g?.(oe.date, fe, ne);
  }, [Z, g, t.dir]), Tr = H((oe, fe) => (ne) => {
    b?.(oe.date, fe, ne);
  }, [b]), Sr = H((oe, fe) => (ne) => {
    v?.(oe.date, fe, ne);
  }, [v]), Mr = H((oe) => (fe) => {
    const ne = Number(fe.target.value), me = s.setMonth(s.startOfMonth(oe), ne);
    W(me);
  }, [s, W]), mo = H((oe) => (fe) => {
    const ne = Number(fe.target.value), me = s.setYear(s.startOfMonth(oe), ne);
    W(me);
  }, [s, W]), { className: Dr, style: Ar } = zt(() => ({
    className: [i[te.Root], t.className].filter(Boolean).join(" "),
    style: { ...x?.[te.Root], ...t.style }
  }), [i, t.className, t.style, x]), An = ay(t), fo = j(null);
  _y(fo, !!t.animate, {
    classNames: i,
    months: _,
    focused: $,
    dateLib: s
  });
  const xt = {
    dayPickerProps: t,
    selected: Q,
    select: G,
    isSelected: V,
    months: _,
    nextMonth: P,
    previousMonth: I,
    goToMonth: W,
    getModifiers: K,
    components: n,
    classNames: i,
    styles: x,
    labels: r,
    formatters: o
  };
  return X.createElement(
    Au.Provider,
    { value: xt },
    X.createElement(
      n.Root,
      { rootRef: t.animate ? fo : void 0, className: Dr, style: Ar, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...An },
      X.createElement(
        n.Months,
        { className: i[te.Months], style: x?.[te.Months] },
        !t.hideNavigation && !u && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[te.Nav], style: x?.[te.Nav], "aria-label": yt(), onPreviousClick: Kt, onNextClick: Gt, previousMonth: I, nextMonth: P }),
        _.map((oe, fe) => X.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[te.Month],
            style: x?.[te.Month],
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
          X.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[te.MonthCaption], style: x?.[te.MonthCaption], calendarMonth: oe, displayIndex: fe }, l?.startsWith("dropdown") ? X.createElement(
            n.DropdownNav,
            { className: i[te.Dropdowns], style: x?.[te.Dropdowns] },
            (() => {
              const ne = l === "dropdown" || l === "dropdown-months" ? X.createElement(n.MonthsDropdown, { key: "month", className: i[te.MonthsDropdown], "aria-label": Fe(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Mr(oe.date), options: by(oe.date, O, U, o, s), style: x?.[te.Dropdown], value: s.getMonth(oe.date) }) : X.createElement("span", { key: "month" }, k(oe.date, s)), me = l === "dropdown" || l === "dropdown-years" ? X.createElement(n.YearsDropdown, { key: "year", className: i[te.YearsDropdown], "aria-label": ao(s.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: mo(oe.date), options: yy(O, U, o, s, !!t.reverseYears), style: x?.[te.Dropdown], value: s.getYear(oe.date) }) : X.createElement("span", { key: "year" }, A(oe.date, s));
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
            { type: "button", className: i[te.NextMonthButton], tabIndex: P ? void 0 : -1, "aria-disabled": P ? void 0 : !0, "aria-label": Dn(P), onClick: Gt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: P ? void 0 : !0, className: i[te.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          fe === d - 1 && u === "after" && !t.hideNavigation && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[te.Nav], style: x?.[te.Nav], "aria-label": yt(), onPreviousClick: Kt, onNextClick: Gt, previousMonth: I, nextMonth: P }),
          X.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": c === "multiple" || c === "range", "aria-label": Ee(oe.date, s.options, s) || void 0, className: i[te.MonthGrid], style: x?.[te.MonthGrid] },
            !t.hideWeekdays && X.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[te.Weekdays], style: x?.[te.Weekdays] },
              E && X.createElement(n.WeekNumberHeader, { "aria-label": io(s.options), className: i[te.WeekNumberHeader], style: x?.[te.WeekNumberHeader], scope: "col" }, S()),
              lo.map((ne) => X.createElement(n.Weekday, { "aria-label": ro(ne, s.options, s), className: i[te.Weekday], key: String(ne), style: x?.[te.Weekday], scope: "col" }, D(ne, s.options, s)))
            ),
            X.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[te.Weeks], style: x?.[te.Weeks] }, oe.weeks.map((ne) => X.createElement(
              n.Week,
              { className: i[te.Week], key: ne.weekNumber, style: x?.[te.Week], week: ne },
              E && // biome-ignore lint/a11y/useSemanticElements: react component
              X.createElement(n.WeekNumber, { week: ne, style: x?.[te.WeekNumber], "aria-label": so(ne.weekNumber, {
                locale: a
              }), className: i[te.WeekNumber], scope: "row", role: "rowheader" }, C(ne.weekNumber, s)),
              ne.days.map((me) => {
                const { date: Te } = me, de = K(me);
                if (de[ge.focused] = !de.hidden && !!$?.isEqualTo(me), de[Ge.selected] = V?.(Te) || de.selected, bi(Q)) {
                  const { from: wt, to: at } = Q;
                  de[Ge.range_start] = !!(wt && at && s.isSameDay(Te, wt)), de[Ge.range_end] = !!(wt && at && s.isSameDay(Te, at)), de[Ge.range_middle] = mt(Q, Te, !0, s);
                }
                const po = vy(de, x, t.modifiersStyles), Pn = sy(de, i, t.modifiersClassNames), qt = !Rt && !de.hidden ? ve(Te, de, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  X.createElement(n.Day, { key: `${s.format(Te, "yyyy-MM-dd")}_${s.format(me.displayMonth, "yyyy-MM")}`, day: me, modifiers: de, className: Pn.join(" "), style: po, role: "gridcell", "aria-selected": de.selected || void 0, "aria-label": qt, "data-day": s.format(Te, "yyyy-MM-dd"), "data-month": me.outside ? s.format(Te, "yyyy-MM") : void 0, "data-selected": de.selected || void 0, "data-disabled": de.disabled || void 0, "data-hidden": de.hidden || void 0, "data-outside": me.outside || void 0, "data-focused": de.focused || void 0, "data-today": de.today || void 0 }, !de.hidden && Rt ? X.createElement(n.DayButton, { className: i[te.DayButton], style: x?.[te.DayButton], type: "button", day: me, modifiers: de, disabled: de.disabled || void 0, tabIndex: z(me) ? 0 : -1, "aria-label": ue(Te, de, s.options, s), onClick: co(me, de), onBlur: Cr(me, de), onFocus: uo(me, de), onKeyDown: Er(me, de), onMouseEnter: Tr(me, de), onMouseLeave: Sr(me, de) }, M(Te, s.options, s)) : !de.hidden && M(me.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      X.createElement(n.Footer, { className: i[te.Footer], style: x?.[te.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function ox({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: o = "label",
  buttonVariant: r = "ghost",
  formatters: s,
  components: a,
  ...i
}) {
  const l = vi();
  return /* @__PURE__ */ m(
    nx,
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
        formatMonthDropdown: (c) => c.toLocaleString("default", { month: "short" }),
        ...s
      },
      classNames: {
        root: re("w-fit", l.root),
        months: re(
          "flex gap-4 flex-col md:flex-row relative",
          l.months
        ),
        month: re("flex flex-col w-full gap-4", l.month),
        nav: re(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          l.nav
        ),
        button_previous: re(
          bs({ variant: r }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_previous
        ),
        button_next: re(
          bs({ variant: r }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_next
        ),
        month_caption: re(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          l.month_caption
        ),
        dropdowns: re(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          l.dropdowns
        ),
        dropdown_root: re(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          l.dropdown_root
        ),
        dropdown: re(
          "absolute bg-popover inset-0 opacity-0",
          l.dropdown
        ),
        caption_label: re(
          "select-none font-medium",
          o === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          l.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: re("flex", l.weekdays),
        weekday: re(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          l.weekday
        ),
        week: re("flex w-full mt-2", l.week),
        week_number_header: re(
          "select-none w-(--cell-size)",
          l.week_number_header
        ),
        week_number: re(
          "text-[0.8rem] select-none text-muted-foreground",
          l.week_number
        ),
        day: re(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          l.day
        ),
        range_start: re(
          "rounded-l-md bg-accent",
          l.range_start
        ),
        range_middle: re("rounded-none", l.range_middle),
        range_end: re("rounded-r-md bg-accent", l.range_end),
        today: re(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          l.today
        ),
        outside: re(
          "text-muted-foreground aria-selected:text-muted-foreground",
          l.outside
        ),
        disabled: re(
          "text-muted-foreground opacity-50",
          l.disabled
        ),
        hidden: re("invisible", l.hidden),
        ...t
      },
      components: {
        Root: ({ className: c, rootRef: u, ...d }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: u,
            className: re(c),
            ...d
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/ui/calendar.tsx",
            lineNumber: 128,
            columnNumber: 13
          },
          this
        ),
        Chevron: ({ className: c, orientation: u, ...d }) => u === "left" ? /* @__PURE__ */ m(Kd, { className: re("size-4", c), ...d }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/ui/calendar.tsx",
          lineNumber: 139,
          columnNumber: 15
        }, this) : u === "right" ? /* @__PURE__ */ m(
          Gd,
          {
            className: re("size-4", c),
            ...d
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/ui/calendar.tsx",
            lineNumber: 145,
            columnNumber: 15
          },
          this
        ) : /* @__PURE__ */ m(qd, { className: re("size-4", c), ...d }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/ui/calendar.tsx",
          lineNumber: 153,
          columnNumber: 13
        }, this),
        DayButton: rx,
        WeekNumber: ({ children: c, ...u }) => /* @__PURE__ */ m("td", { ...u, children: /* @__PURE__ */ m("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: c }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/ui/calendar.tsx",
          lineNumber: 160,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/ui/calendar.tsx",
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
      fileName: "/home/ubuntu/paragon/client/src/components/ui/calendar.tsx",
      lineNumber: 27,
      columnNumber: 5
    },
    this
  );
}
function rx({
  className: e,
  day: t,
  modifiers: n,
  ...o
}) {
  const r = vi(), s = T.useRef(null);
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
      fileName: "/home/ubuntu/paragon/client/src/components/ui/calendar.tsx",
      lineNumber: 187,
      columnNumber: 5
    },
    this
  );
}
let un = null;
const Fu = /* @__PURE__ */ new Map(), sx = /* @__PURE__ */ new Map();
function jo() {
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
function ix(e) {
  return un?.pillDate === e;
}
function ax({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: o,
  onClose: r
}) {
  const s = j(null), a = kr(e);
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
  }, [o, r]), l = H((N) => {
    const y = /* @__PURE__ */ new Date();
    y.setDate(y.getDate() + N), o(mn(y)), r();
  }, [o, r]), c = H(() => {
    const y = (/* @__PURE__ */ new Date()).getDay(), E = y === 0 ? 1 : 8 - y, x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + E), o(mn(x)), r();
  }, [o, r]), u = /* @__PURE__ */ new Date(), d = u.toDateString(), f = new Date(u);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), h = u.getDay(), g = h === 0 ? 1 : 8 - h, b = new Date(u);
  b.setDate(b.getDate() + g);
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
            fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 180,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ m("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ m("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ m(
            ox,
            {
              mode: "single",
              selected: a,
              onSelect: i
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
              lineNumber: 197,
              columnNumber: 13
            },
            this
          ) }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 196,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("div", { className: "border-t border-border" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
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
                onClick: () => l(0),
                children: "Today"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
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
                  a.toDateString() === p && "ring-2 ring-primary"
                ),
                onClick: () => l(1),
                children: "Tomorrow"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
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
                onClick: c,
                children: "Next Monday"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 227,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 204,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 195,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 194,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
      lineNumber: 163,
      columnNumber: 5
    },
    this
  );
}
function lx(e, t, n) {
  if (ix(t)) {
    jo();
    return;
  }
  jo();
  const o = e.getBoundingClientRect(), r = window.innerWidth, s = window.innerHeight, a = 320, i = 420, l = 10, c = 16, u = s - o.bottom - l - c, d = o.top - l - c, f = u >= i ? "below" : d >= i ? "above" : u >= d ? "below" : "above";
  let p;
  f === "below" ? p = o.bottom + l : p = o.top - i - l;
  const h = o.left + o.width / 2;
  let g = h - a / 2;
  g + a > r - c && (g = r - a - c), g < c && (g = c);
  const b = document.createElement("div");
  b.setAttribute("data-date-picker-standalone", t), b.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(b), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((x) => {
    b.addEventListener(x, (w) => {
      w.stopPropagation();
    }, !1);
  });
  const N = Vm(b);
  un = { container: b, root: N, pillDate: t };
  const y = () => {
    jo();
  }, E = (x) => {
    const w = Fu.get(t);
    w && w(x);
  };
  N.render(
    /* @__PURE__ */ m(
      ax,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: g, direction: f, pillCenter: h },
        onSelectDate: E,
        onClose: y
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
        lineNumber: 327,
        columnNumber: 5
      },
      this
    )
  );
}
function cx({ node: e, updateAttributes: t, selected: n }) {
  const o = j(null), r = e.attrs.date || dn(), s = zu(r), a = Ni(r), i = H(() => {
    if (!o.current) return "";
    const l = o.current.closest(".markdown-editor-container");
    if (l) {
      const u = l.getAttribute("data-theme");
      if (u) return u;
    }
    return o.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return q(() => (Fu.set(r, (l) => {
    t({ date: l });
  }), sx.set(r, i), () => {
  }), [r, t, i]), q(() => {
    const l = o.current;
    if (!l) return;
    const c = (u) => {
      u.preventDefault(), u.stopPropagation();
      const d = l.getAttribute("data-date") || dn(), f = i();
      lx(l, d, f);
    };
    return l.addEventListener("click", c), () => l.removeEventListener("click", c);
  }, [i]), q(() => {
    const l = o.current?.closest(".ProseMirror") || document, c = () => {
      un && jo();
    };
    return l.addEventListener("scroll", c, { passive: !0 }), () => {
      l.removeEventListener("scroll", c);
    };
  }, []), /* @__PURE__ */ m(pn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: o,
      className: `date-pill ${a} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": r,
      children: [
        /* @__PURE__ */ m(dl, { size: 14, className: "date-icon" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 410,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("span", { className: "date-text", children: s }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 411,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
      lineNumber: 403,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/DatePillComponent.tsx",
    lineNumber: 402,
    columnNumber: 5
  }, this);
}
function kr(e) {
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
function zu(e) {
  const t = kr(e), n = /* @__PURE__ */ new Date(), o = new Date(n.getFullYear(), n.getMonth(), n.getDate()), r = new Date(o);
  r.setDate(r.getDate() + 1);
  const s = new Date(o);
  s.setDate(s.getDate() - 1);
  const a = o.getDay(), i = a === 0 ? 1 : 8 - a, l = new Date(o);
  if (l.setDate(l.getDate() + i), t.getTime() === o.getTime()) return "Today";
  if (t.getTime() === r.getTime()) return "Tomorrow";
  if (t.getTime() === s.getTime()) return "Yesterday";
  if (t.getTime() === l.getTime()) return "Next Monday";
  const c = { month: "short", day: "numeric" };
  return t.getFullYear() !== o.getFullYear() && (c.year = "numeric"), t.toLocaleDateString("en-US", c);
}
function ux(e) {
  return kr(e).toLocaleDateString("en-US", {
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
    const i = (/* @__PURE__ */ new Date()).getDay(), l = i === 0 ? 1 : 8 - i;
    return Hn(l);
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
      const l = parseInt(o[2], 10), c = o[3] ? parseInt(o[3], 10) : (/* @__PURE__ */ new Date()).getFullYear(), u = new Date(c, i, l);
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
function Ni(e) {
  const t = kr(e), n = /* @__PURE__ */ new Date(), o = new Date(n.getFullYear(), n.getMonth(), n.getDate()), r = new Date(o);
  return r.setDate(r.getDate() + 7), t.getTime() === o.getTime() ? "date-today" : t < o ? "date-overdue" : t <= r ? "date-upcoming" : "";
}
const dx = new Re("datePillPaste"), mx = lr.create({
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
    const n = e.attrs.date, o = zu(n), r = Ni(n);
    return [
      "span",
      xn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${r}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, o]
    ];
  },
  addNodeView() {
    return rr(cx, {
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
          const g = (/* @__PURE__ */ new Date()).getFullYear(), b = new Date(g, h, parseInt(f[2], 10));
          d().deleteRange(u).insertDatePill(mn(b)).run();
        }
      }
    }), s = new Oe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Wt(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), a = new Oe({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Wt(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), i = new Oe({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), l = new Oe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Wt(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), c = new Oe({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Wt(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
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
      l,
      c
    ];
  },
  addProseMirrorPlugins() {
    const e = this.type;
    return [
      new Ie({
        key: dx,
        props: {
          handlePaste(t, n) {
            const o = n.clipboardData;
            if (!o) return !1;
            const r = o.getData("text/plain"), s = o.getData("text/html");
            if (s && s.includes('data-type="date-pill"')) return !1;
            const a = /@([^@\n]+)@/g;
            let i = !1, l;
            const c = new RegExp(a.source, a.flags);
            for (; (l = c.exec(r)) !== null; )
              if (Wt(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, p = [];
            let h = 0;
            const g = new RegExp(a.source, a.flags);
            let b;
            for (; (b = g.exec(r)) !== null; ) {
              const E = b[1], x = Wt(E);
              if (x) {
                const w = r.slice(h, b.index);
                w && p.push(f.text(w)), p.push(e.create({ date: x })), h = b.index + b[0].length;
              }
            }
            const v = r.slice(h);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const N = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, p)
            ), { $from: y } = u.selection;
            if (y.parent.type.name === "paragraph") {
              const E = d;
              let x = u.selection.from;
              for (const w of p)
                E.insert(x, w), x += w.nodeSize;
              E.delete(u.selection.from, u.selection.to), t.dispatch(E);
            } else
              d.replaceSelectionWith(N), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), Ke = /* @__PURE__ */ new Map();
function fx({ node: e, selected: t, editor: n, getPos: o, deleteNode: r }) {
  const s = j(null), a = j(null), i = e.attrs.tag || "", l = j(!1), [c, u] = Y(() => Ke.has(i)), [d, f] = Y(() => Ke.get(i)?.value ?? i);
  q(() => {
    c || f(i);
  }, [i, c]), q(() => {
    if (c) {
      const N = Ke.get(i);
      Ke.set(i, {
        value: d,
        focusedAt: N?.focusedAt ?? Date.now()
      });
    }
  }, [c, d, i]);
  const p = H((N) => {
    if (l.current) return;
    l.current = !0;
    const y = N.trim().replace(/^#/, ""), E = Fn(y);
    if (Ke.delete(i), E && Ke.delete(E), !E || !rn(E))
      r();
    else if (E !== i) {
      const x = o();
      if (typeof x == "number" && n) {
        const { tr: w } = n.state, M = e.nodeSize;
        w.delete(x, x + M), w.insert(x, n.schema.nodes.tagPill.create({ tag: E })), n.view.dispatch(w);
      }
    } else
      Ke.delete(i);
    u(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [i, n, o, r, e.nodeSize]), h = H(() => {
    n && !n.isEditable || (Ke.set(i, { value: i, focusedAt: Date.now() }), f(i), u(!0), l.current = !1);
  }, [n, i]);
  q(() => {
    const N = s.current;
    if (!N || c) return;
    const y = (x) => {
      x.preventDefault(), x.stopPropagation(), h();
    }, E = (x) => {
      x.preventDefault(), x.stopPropagation();
    };
    return N.addEventListener("dblclick", y), N.addEventListener("click", E), () => {
      N.removeEventListener("dblclick", y), N.removeEventListener("click", E);
    };
  }, [c, n, o, h]), q(() => {
    if (c) {
      const N = requestAnimationFrame(() => {
        if (a.current) {
          a.current.focus(), a.current.select();
          const y = Ke.get(i);
          y && (y.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(N);
    }
  }, [c, i]);
  const g = H((N) => {
    N.key === "Enter" ? (N.preventDefault(), p(d)) : N.key === "Escape" && (N.preventDefault(), Ke.delete(i), u(!1), l.current = !0, n?.commands.focus());
  }, [p, d, i, n]), b = H(() => {
    const y = Ke.get(i)?.focusedAt ?? 0;
    Date.now() - y > 300 && p(d);
  }, [p, d, i]), v = H((N) => {
    f(N.target.value);
  }, []);
  return c ? /* @__PURE__ */ m(pn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": i,
      children: [
        /* @__PURE__ */ m(zi, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/TagPillComponent.tsx",
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
            onKeyDown: g,
            onBlur: b,
            spellCheck: !1,
            autoComplete: "off"
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/TagPillComponent.tsx",
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
      fileName: "/home/ubuntu/paragon/client/src/components/editor/TagPillComponent.tsx",
      lineNumber: 171,
      columnNumber: 9
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/TagPillComponent.tsx",
    lineNumber: 170,
    columnNumber: 7
  }, this) : /* @__PURE__ */ m(pn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": i,
      children: [
        /* @__PURE__ */ m(zi, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/TagPillComponent.tsx",
          lineNumber: 203,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("span", { className: "tag-text", children: i }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/TagPillComponent.tsx",
          lineNumber: 204,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/TagPillComponent.tsx",
      lineNumber: 196,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/TagPillComponent.tsx",
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
const px = new Re("tagPillPaste"), hx = lr.create({
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
    return rr(fx, {
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
        key: px,
        props: {
          handlePaste(t, n) {
            const o = n.clipboardData;
            if (!o) return !1;
            const r = o.getData("text/plain"), s = o.getData("text/html");
            if (s && s.includes('data-type="tag-pill"')) return !1;
            const a = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let i = !1, l;
            const c = new RegExp(a.source, a.flags);
            for (; (l = c.exec(r)) !== null; )
              if (rn(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, p = [];
            let h = 0;
            const g = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let b;
            for (; (b = g.exec(r)) !== null; ) {
              const y = Fn(b[1]);
              if (rn(y)) {
                const E = b[0], x = E.startsWith(" ") || E.startsWith(`
`) ? 1 : 0, w = r.slice(h, b.index + x);
                w && p.push(f.text(w)), p.push(e.create({ tag: y })), h = b.index + E.length;
              }
            }
            const v = r.slice(h);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const { $from: N } = u.selection;
            if (N.parent.type.name === "paragraph") {
              const y = d;
              let E = u.selection.from;
              for (const x of p)
                y.insert(E, x), E += x.nodeSize;
              y.delete(u.selection.from, u.selection.to), t.dispatch(y);
            } else {
              const y = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, p)
              );
              d.replaceSelectionWith(y), t.dispatch(d);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), gx = /\[\[([^\[\]]+)\]\]$/, bx = bl.create({
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
        find: gx,
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
  // Callout pattern: ```info, ```note, ```prompt, ```resources, ```todo, ```ad-*
  callout: /```(?:info|note|prompt|resources|todo|ad-\w+)\s*\n[\s\S]*?```/
}, vx = ["info", "note", "prompt", "resources", "todo"];
function Nx(e) {
  return e.length < 3 ? !1 : !!(dt.header.test(e) || dt.bold.test(e) || dt.list.test(e) || dt.taskList.test(e) || dt.codeBlock.test(e) || dt.callout.test(e) || dt.highlight.test(e) || dt.link.test(e) || dt.table.test(e));
}
function yx(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", o = "left", r = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? r = t[1] : ["left", "center", "right"].includes(t[1]) && (o = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (o = t[1]), /^\d+$/.test(t[2]) && (r = t[2])), { alt: n, align: o, width: r };
}
function xx(e, t) {
  const { alt: n, align: o, width: r } = yx(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[o] || "margin-right: auto;", a = r ? ` width="${r}" style="width: ${r}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${o}"${a} /></figure>`;
}
function er(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Wa(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${er(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, o = e.split(n).filter((s) => s.trim()), r = [];
  for (const s of o) {
    const a = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    a ? r.push(xx(a[1], a[2])) : r.push(`<p>${er(s.trim())}</p>`);
  }
  return r.join("");
}
function Uu(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, o = Math.floor(n / 2), r = e.trimStart(), s = r.match(/^[-*+]\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: o, text: s[2].trim(), checked: s[1] === "x" };
  const a = r.match(/^[-*+]\s+(.+)$/);
  if (a)
    return { type: "ul", depth: o, text: a[1].trim() };
  const i = r.match(/^\d+\.\s+(.+)$/);
  return i ? { type: "ol", depth: o, text: i[1].trim() } : null;
}
function Yu(e) {
  if (e.length === 0) return "";
  const t = (r, s) => {
    let a = "", i = r;
    const l = e[i]?.type || "ul", c = l === "task", u = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, d = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (a += u; i < e.length && e[i].depth >= s; ) {
      const f = e[i];
      if (f.depth === s) {
        if (c ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${er(f.text)}</p>` : a += `<li><p>${er(f.text)}</p>`, i + 1 < e.length && e[i + 1].depth > s) {
          const p = t(i + 1, e[i + 1].depth);
          a += p.html, i = p.nextIdx;
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
function Ba(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:[-*+] |\d+\. )/i.test(e);
  if (!t && !n)
    return Wa(e);
  const o = e.split(/<br\s*\/?>/i).filter((i) => i.trim()), r = [];
  let s = [];
  const a = () => {
    s.length !== 0 && (r.push(Yu(s)), s = []);
  };
  for (const i of o) {
    const l = Uu(i);
    if (l) {
      if (s.length > 0) {
        const c = s[0].type;
        l.depth === 0 && l.type !== c && a();
      }
      s.push(l);
    } else
      a(), r.push(Wa(i.trim()));
  }
  return a(), r.join("");
}
function wx(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const o = t[0].split("|").map((i) => i.trim()).filter((i) => i.length > 0);
  if (o.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let a = "<table><thead><tr>";
  for (const i of o)
    a += "<th>" + Ba(i) + "</th>";
  a += "</tr></thead><tbody>";
  for (const i of s) {
    if (!i.trim()) continue;
    const l = i.split("|"), c = [];
    for (let u = 0; u < l.length; u++) {
      const d = l[u].trim();
      u === 0 && d === "" && i.trim().startsWith("|") || u === l.length - 1 && d === "" && i.trim().endsWith("|") || c.push(d);
    }
    if (c.length !== 0) {
      a += "<tr>";
      for (let u = 0; u < o.length; u++) {
        const d = c[u] || "";
        a += "<td>" + Ba(d) + "</td>";
      }
      a += "</tr>";
    }
  }
  return a += "</tbody></table>", a;
}
function kx(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, o = [];
  t = t.replace(n, (d) => {
    const f = d.split(`
`);
    if (f.length >= 2) {
      const p = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const h = wx(d);
        if (h) {
          const g = `MANUSTABLEPLACEHOLDER${o.length}END`;
          return o.push(h), g;
        }
      }
    }
    return d;
  });
  const r = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (d, f, p) => {
    let h = p.trim();
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), h = h.replace(/__([^_]+)__/g, "<strong>$1</strong>"), h = h.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), h = h.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), h = h.replace(/`([^`]+)`/g, "<code>$1</code>");
    const g = "info";
    h.startsWith("<") || (h = `<p>${h}</p>`);
    const b = `MANUSCODEPLACEHOLDER${r.length}END`;
    return r.push(`<div data-callout="" data-type="${g}" class="callout callout-${g}">${h}</div>`), b;
  }), vx.forEach((d) => {
    const f = new RegExp(`\`\`\`${d}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(f, (p, h) => {
      let g = h.trim();
      g = g.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), g = g.replace(/__([^_]+)__/g, "<strong>$1</strong>"), g = g.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), g = g.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), g = g.replace(/`([^`]+)`/g, "<code>$1</code>"), g.startsWith("<") || (g = `<p>${g}</p>`);
      const b = `MANUSCODEPLACEHOLDER${r.length}END`;
      return r.push(`<div data-callout="" data-type="${d}" class="callout callout-${d}">${g}</div>`), b;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (d, f, p) => {
    const h = f || "plaintext", g = p.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), b = `MANUSCODEPLACEHOLDER${r.length}END`;
    return r.push(`<pre><code class="language-${h}">${g}</code></pre>`), b;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  const s = t.split(`
`), a = [];
  let i = [];
  const l = () => {
    i.length !== 0 && (a.push(Yu(i)), i = []);
  };
  for (const d of s) {
    const f = Uu(d);
    if (f) {
      if (i.length > 0) {
        const h = i[0].type, g = Math.min(...i.map((b) => b.depth));
        f.depth === g && f.type !== h && l();
      }
      i.push(f);
      continue;
    }
    l();
    let p = d;
    p = p.replace(/^(#{1,6})\s+(.+)$/, (h, g, b) => {
      const v = g.length;
      return `<h${v}>${b}</h${v}>`;
    }), p = p.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), p = p.replace(/^[-*_]{3,}$/, "<hr>"), a.push(p);
  }
  l(), t = a.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (d, f, p) => {
    const h = f.split("|").map((y) => y.trim());
    let g = "", b = "left", v = null;
    h.length === 1 ? g = h[0] : h.length === 2 ? (g = h[0], /^\d+$/.test(h[1]) ? v = h[1] : ["left", "center", "right"].includes(h[1]) ? b = h[1] : g = f) : h.length === 3 ? (g = h[0], ["left", "center", "right"].includes(h[1]) && (b = h[1]), /^\d+$/.test(h[2]) && (v = h[2])) : g = f;
    const N = v ? ` width="${v}" style="width: ${v}px"` : "";
    return `<img src="${p.trim()}" alt="${g}" data-align="${b}"${N}>`;
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
const Cx = Ze.create({
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
            if (!a || !Nx(a))
              return !1;
            n.preventDefault();
            const i = kx(a);
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
}), Ha = new Re("collapsibleHeading");
function Ex(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function tr(e, t) {
  const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  return e.descendants((r, s) => {
    if (r.type.name === "heading" && t.includes(r.attrs.level)) {
      const a = r.attrs.level, i = r.textContent.slice(0, 50), l = `h${a}-${i}`, c = o.get(l) ?? 0;
      o.set(l, c + 1), n.set(s, Ex(a, i, c));
    }
  }), n;
}
let fn = null;
function ns(e, t, n) {
  const o = [], r = tr(e, n.levels), s = [];
  e.descendants((c, u) => {
    if (c.type.name === "heading" && n.levels.includes(c.attrs.level)) {
      const d = r.get(u) ?? "";
      s.push({
        pos: u,
        level: c.attrs.level,
        id: d,
        isCollapsed: t.collapsedHeadings.has(d),
        nodeSize: c.nodeSize
      });
    }
  });
  const a = [];
  for (let c = 0; c < s.length; c++) {
    const u = s[c];
    if (u.isCollapsed) {
      const d = u.pos + u.nodeSize;
      let f = e.content.size;
      for (let p = c + 1; p < s.length; p++)
        if (s[p].level <= u.level) {
          f = s[p].pos;
          break;
        }
      d < f && a.push({ start: d, end: f });
    }
  }
  const i = [];
  for (const c of a)
    if (i.length === 0)
      i.push(c);
    else {
      const u = i[i.length - 1];
      c.start <= u.end ? u.end = Math.max(u.end, c.end) : i.push(c);
    }
  function l(c) {
    for (const u of i)
      if (c >= u.start && c < u.end) return !0;
    return !1;
  }
  return e.descendants((c, u) => {
    if (c.type.name === "heading" && n.levels.includes(c.attrs.level)) {
      const d = r.get(u) ?? "", f = t.collapsedHeadings.has(d), p = l(u);
      o.push(
        Ye.node(u, u + c.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${c.attrs.level} ${f ? "is-collapsed" : "is-expanded"}${p ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": d,
          "data-heading-level": String(c.attrs.level)
        })
      );
      const h = Ye.widget(u + c.nodeSize - 1, () => {
        const g = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${d}"]`);
        if (g) {
          g.classList.contains("collapsed") !== f && (g.classList.remove("collapsed", "expanded"), g.classList.add(f ? "collapsed" : "expanded"), g.title = f ? "Click to expand" : "Click to collapse");
          const y = g.parentElement;
          if (y) return y;
        }
        const b = document.createElement("span");
        b.className = "collapsible-heading-chevron-wrapper", b.setAttribute("contenteditable", "false");
        const v = document.createElement("button");
        return v.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, v.setAttribute("data-heading-id", d), v.setAttribute("data-heading-level", String(c.attrs.level)), v.setAttribute("contenteditable", "false"), v.setAttribute("tabindex", "-1"), v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', v.title = f ? "Click to expand" : "Click to collapse", v.addEventListener("click", (N) => {
          N.preventDefault(), N.stopPropagation();
          const y = v.classList.contains("collapsed");
          v.classList.remove("collapsed", "expanded"), v.classList.add(y ? "expanded" : "collapsed"), v.title = y ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(d) ? t.collapsedHeadings.delete(d) : t.collapsedHeadings.add(d), fn && fn.dispatch(fn.state.tr.setMeta("collapsibleHeading", { toggled: d }));
        }), b.appendChild(v), b;
      }, { side: 1, key: `chevron-${d}` });
      o.push(h);
    } else c.isBlock && l(u) && o.push(
      Ye.node(u, u + c.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), _e.create(e, o);
}
function Tx(e, t, n, o) {
  if (n.collapsedHeadings.size === 0) return;
  const r = tr(t, o), s = new Set(r.values()), a = [];
  n.collapsedHeadings.forEach((i) => {
    s.has(i) || a.push(i);
  });
  for (const i of a)
    n.collapsedHeadings.delete(i);
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
        const o = this.storage, r = n.doc.nodeAt(e);
        if (!r || r.type.name !== "heading")
          return !1;
        const a = tr(n.doc, this.options.levels).get(e);
        return a ? (o.collapsedHeadings.has(a) ? o.collapsedHeadings.delete(a) : o.collapsedHeadings.add(a), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: a })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return tr(t.doc, this.options.levels).forEach((r) => {
          n.collapsedHeadings.add(r);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Ie({
        key: Ha,
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
              decorations: ns(o.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, o, r, s) {
            const a = n.getMeta("collapsibleHeading");
            return a || n.docChanged ? (n.docChanged && !a && Tx(r.doc, s.doc, e, t.levels), {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: ns(s.doc, e, t),
              docVersion: o.docVersion + 1
            }) : {
              ...o,
              decorations: o.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const o = Ha.getState(n);
            return o?.decorations ? o.decorations : ns(n.doc, e, t);
          }
        }
      })
    ];
  }
}), Mx = /\[([^\]]+)\]\(([^)]+)\)$/, Dx = /^(https?:\/\/|www\.)[^\s]+$/i, Ax = Ze.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Oe({
        find: Mx,
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
            if (!Dx.test(s)) return !1;
            const { state: a } = t, { selection: i } = a, { from: l, to: c, empty: u } = i;
            let d = s;
            if (!d.startsWith("http://") && !d.startsWith("https://") && (d.startsWith("www."), d = "https://" + d), !u && a.doc.textBetween(l, c))
              return e.chain().focus().extendMarkRange("link").setLink({ href: d }).run(), !0;
            const f = a.schema.marks.link.create({ href: d }), p = a.tr;
            return p.insertText(d, l, c), p.addMark(l, l + d.length, f), t.dispatch(p), !0;
          }
        }
      })
    ];
  }
}), Px = ["info", "note", "prompt", "resources", "todo"], Ix = Ze.create({
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
            const l = s.textBetween(i, a.pos, ""), c = l.trim();
            for (const u of Px)
              if (c === `\`\`\`${u}`) {
                n.preventDefault();
                const d = o.tr, f = i + l.indexOf("```");
                d.delete(f, a.pos);
                const p = e.schema.nodes.callout, h = e.schema.nodes.paragraph;
                if (p && h) {
                  const g = h.create(), b = p.create({ type: u }, Km.from(g));
                  d.insert(f, b);
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
}), _o = new Re("searchHighlight"), Rx = Ze.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: o }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, o && o(n.setMeta(_o, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(_o, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ie({
        key: _o,
        state: {
          init() {
            return _e.empty;
          },
          apply(t, n, o, r) {
            const { searchTerm: s, caseSensitive: a, useRegex: i, currentMatchIndex: l } = e, c = t.getMeta(_o), u = t.docChanged;
            if (!s)
              return _e.empty;
            if (!u && !c)
              return n.map(t.mapping, r.doc);
            const d = [];
            let f = 0;
            try {
              let p;
              if (i)
                p = new RegExp(s, a ? "g" : "gi");
              else {
                const h = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                p = new RegExp(h, a ? "g" : "gi");
              }
              r.doc.descendants((h, g) => {
                if (h.isText && h.text) {
                  let b;
                  for (; (b = p.exec(h.text)) !== null; ) {
                    const v = g + b.index, N = g + b.index + b[0].length, y = f === l;
                    d.push(
                      Ye.inline(v, N, {
                        class: y ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return _e.empty;
            }
            return _e.create(r.doc, d);
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
}), Lx = new Re("tabIndent");
function Ox(e) {
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
const _x = Ze.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Ie({
        key: Lx,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: o } = e, r = Ox(n);
            if (!r)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[r];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!Yi(s)(n, o)) {
                const l = r === "taskItem" ? "listItem" : "taskItem", c = n.schema.nodes[l];
                c && Yi(c)(n, o);
              }
            } else if (!ji(s)(n, o)) {
              const l = r === "taskItem" ? "listItem" : "taskItem", c = n.schema.nodes[l];
              c && ji(c)(n, o);
            }
            return !0;
          }
        }
      })
    ];
  }
}), $x = new Re("expandSelection");
function os(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const Wx = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), Bx = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), Hx = "tableRow", Fx = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function zx(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--)
    if (o.node(r).isTextblock) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function Ux(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--) {
    const s = o.node(r);
    if (Fx.has(s.type.name)) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function Yx(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--)
    if (o.node(r).type.name === Hx) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function jx(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--) {
    const s = o.node(r);
    if (Bx.has(s.type.name)) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function Vx(e, t, n) {
  const o = e.resolve(t);
  let r = -1;
  for (let i = o.depth; i >= 1; i--) {
    const l = o.node(i);
    Wx.has(l.type.name) && (r = i);
  }
  if (r === -1) return null;
  const s = o.start(r), a = o.end(r);
  return s < t || a > n ? { from: s, to: a } : null;
}
function Kx(e) {
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
function Gx(e, t, n) {
  const o = e.filter((r) => r.from <= t && r.to >= n);
  return o.sort((r, s) => r.to - r.from - (s.to - s.from)), o;
}
function qx(e, t) {
  const n = e.resolve(t);
  for (let o = n.depth; o >= 1; o--)
    if (n.node(o).type.name === "table") return !0;
  return !1;
}
function Xx(e, t, n) {
  const o = [];
  let r = t, s = n;
  const a = (l) => l && (l.from < r || l.to > s) ? (o.push(l), r = l.from, s = l.to, !0) : !1;
  a(zx(e, r, s)), qx(e, t) && (a(Ux(e, r, s)), a(Yx(e, r, s))), a(Vx(e, r, s)), a(jx(e, r, s));
  const i = Kx(e);
  if (i.length > 0) {
    const l = Gx(i, r, s);
    for (const c of l)
      a({ from: c.from, to: c.to });
  }
  return (r > 0 || s < e.content.size) && o.push({ from: 0, to: e.content.size }), o;
}
const Zx = Ze.create({
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
        if (t.expansionDepth > 0 && r === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), o instanceof xm || r === 0 && s === n.content.size)
          return !0;
        const i = Xx(n, r, s);
        let l = null;
        for (const c of i)
          if (c.from < r || c.to > s) {
            l = c;
            break;
          }
        return l ? (t.lastExpandedFrom = l.from, t.lastExpandedTo = l.to, t.expansionDepth++, t.isExpanding = !0, l.from === 0 && l.to === n.content.size ? e.commands.selectAll() : e.commands.setTextSelection({
          from: l.from,
          to: l.to
        }), t.isExpanding = !1, !0) : (t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size, t.expansionDepth++, t.isExpanding = !0, e.commands.selectAll(), t.isExpanding = !1, !0);
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Ie({
        key: $x,
        props: {
          handleClick() {
            return os(e), !1;
          },
          handleTextInput() {
            return os(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && os(e), !1;
          }
        }
      })
    ];
  }
}), Qx = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Jx(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, o = parseInt(t.slice(2, 4), 16) / 255, r = parseInt(t.slice(4, 6), 16) / 255, s = (i) => i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(o) + 0.0722 * s(r) > 0.4;
}
const ew = new Re("hexColorDecoration");
function ju(e, t, n) {
  const o = [];
  return e.nodesBetween(t, n, (r, s) => {
    if (!r.isText) return;
    const a = r.text || "";
    let i;
    const l = new RegExp(Qx.source, "g");
    for (; (i = l.exec(a)) !== null; ) {
      const c = s + i.index, u = c + i[0].length;
      if (u >= t && c <= n) {
        const d = i[0], f = Jx(d);
        o.push(
          Ye.inline(c, u, {
            class: "hex-color-swatch",
            style: `background-color: ${d}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), o;
}
function tw(e) {
  const t = ju(e, 0, e.content.size);
  return _e.create(e, t);
}
const nw = bl.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Ie({
        key: ew,
        state: {
          init(e, { doc: t }) {
            return tw(t);
          },
          apply(e, t) {
            if (!e.docChanged)
              return t;
            let n = t.map(e.mapping, e.doc);
            const o = [];
            if (e.mapping.maps.forEach((s, a) => {
              s.forEach((i, l, c, u) => {
                const d = Math.max(0, c - 10), f = Math.min(e.doc.content.size, u + 10);
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
              const a = ju(e.doc, s.from, s.to);
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
function Fa(e, t, n, o, r) {
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
  return e.descendants((i, l) => {
    if (i.isText && i.text) {
      let c;
      for (; (c = a.exec(i.text)) !== null; )
        s.push({
          from: l + c.index,
          to: l + c.index + c[0].length,
          text: c[0]
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
function ow(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function ke(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const rw = Ze.create({
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
        const l = Fa(t.state.doc, r, s, a, i);
        return l.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = l, this.storage.searchTerm = r, this.storage.caseSensitive = s, this.storage.useRegex = a, this.storage.wholeWord = i, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = r.length, this.storage.allMatches = l, this.storage.nextMatchIndex = l.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], o && o(n.setMeta(Se, { activate: !0 })), !0);
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
              const p = f.textContent, h = d.parentOffset;
              let g = h, b = h;
              for (; g > 0 && /\w/.test(p[g - 1]); ) g--;
              for (; b < p.length && /\w/.test(p[b]); ) b++;
              g < b && (i = p.slice(g, b));
            }
          }
          if (!i) return !1;
          const l = Fa(r.doc, i, !1, !1, !1);
          if (l.length === 0) return !1;
          const c = ow(l, s), u = l[c];
          return o.isActive = !0, o.ranges = [u], o.searchTerm = i, o.caseSensitive = !1, o.useRegex = !1, o.wholeWord = !1, o.typedBuffer = "", o.isTypingReplace = !1, o.originalTermLength = i.length, o.allMatches = l, o.nextMatchIndex = (c + 1) % l.length, o.isIncremental = !0, o.undoStack = [], o.redoStack = [], n && n(t.setMeta(Se, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (ke(this.storage), t && t(e.setMeta(Se, { deactivate: !0 })), !0),
      /**
       * Apply a mark (bold, italic, etc.) to all selected occurrences in one transaction.
       * All changes are in a single transaction for proper undo/redo.
       */
      toggleMarkOnAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: o }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        const r = t.schema.marks[e];
        if (!r) return !1;
        const { ranges: s } = this.storage, a = s.every((i) => {
          let l = !0;
          return t.state.doc.nodesBetween(i.from, i.to, (c) => {
            c.isText && !r.isInSet(c.marks) && (l = !1);
          }), l;
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
              const l = Tt(i, this.storage);
              this.storage.ranges = l, l.length === 0 && ke(this.storage);
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
        return ke(this.storage), !0;
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
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && ke(this.storage);
            }
          } catch {
          }
        }, 10) : ke(this.storage), !0;
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
            return _e.empty;
          },
          apply(t, n, o, r) {
            const s = t.getMeta(Se);
            if (s?.deactivate || !e.isActive)
              return _e.empty;
            if (s?.activate || s?.refresh) {
              const a = [];
              for (const i of e.ranges) {
                a.push(
                  Ye.inline(i.from, i.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const l = document.createElement("span");
                l.className = "select-all-multi-cursor", l.setAttribute("aria-hidden", "true"), a.push(
                  Ye.widget(i.to, l, {
                    side: 1,
                    key: `cursor-${i.from}-${i.to}`
                  })
                );
              }
              return _e.create(r.doc, a);
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
              ke(e);
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
              ke(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Se, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const r = e.undoStack.pop();
                return e.typedBuffer = r, r === "" && (e.isTypingReplace = !1), Gm(t.state, t.dispatch), setTimeout(() => {
                  const s = Tt(t);
                  e.ranges = s, s.length === 0 && ke(e);
                }, 10), !0;
              }
              ke(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Se, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const r = e.redoStack.pop();
                return e.typedBuffer = r, e.isTypingReplace = !0, qm(t.state, t.dispatch), setTimeout(() => {
                  const s = Tt(t);
                  e.ranges = s, s.length === 0 && ke(e);
                }, 10), !0;
              }
              ke(e);
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
                  ke(e);
                  const { tr: i } = t.state;
                  return t.dispatch(i.setMeta(Se, { deactivate: !0 })), !0;
                }
                const r = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...o].sort((i, l) => l.from - i.from), { tr: a } = t.state;
                for (const i of s)
                  a.replaceWith(i.from, i.to, t.state.schema.text(r));
                t.dispatch(a), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const i = Tt(t);
                  e.ranges = i, i.length === 0 && ke(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const o = [...e.ranges].sort((a, i) => i.from - a.from), { tr: r } = t.state;
                for (const a of o)
                  r.delete(a.from, a.to);
                t.dispatch(r), ke(e);
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
              t.dispatch(r), ke(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Se, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              ke(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Se, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              ke(e);
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
              ke(e);
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(Se, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += r : (e.isTypingReplace = !0, e.typedBuffer = r);
            const a = [...s].sort((l, c) => c.from - l.from), { tr: i } = t.state;
            for (const l of a)
              i.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(i), setTimeout(() => {
              const l = Tt(t);
              e.ranges = l, l.length === 0 && ke(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
});
function sw() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function iw(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => {
      typeof o.result == "string" ? t(o.result) : n(new Error("Failed to read file"));
    }, o.onerror = () => n(new Error("Failed to read file")), o.readAsDataURL(e);
  });
}
function aw(e, t) {
  const [n, o] = e.split(","), r = n.match(/:(.*?);/), s = r ? r[1] : "image/jpeg", a = atob(o), i = new Uint8Array(a.length);
  for (let l = 0; l < a.length; l++)
    i[l] = a.charCodeAt(l);
  return new File([i], t, { type: s });
}
function lw(e, t) {
  return t.includes(e.type);
}
function cw(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function uw(e, t, n) {
  return new Promise((o, r) => {
    const s = new window.Image(), a = new FileReader();
    a.onload = (i) => {
      s.src = i.target?.result;
    }, a.onerror = () => r(new Error("Failed to read file")), s.onload = () => {
      let i = s.width, l = s.height;
      if (i > t) {
        const b = t / i;
        i = t, l = Math.round(l * b);
      }
      const c = document.createElement("canvas");
      c.width = i, c.height = l;
      const u = c.getContext("2d");
      if (!u) {
        r(new Error("Failed to get canvas context"));
        return;
      }
      u.imageSmoothingEnabled = !0, u.imageSmoothingQuality = "high", u.drawImage(s, 0, 0, i, l);
      const d = e.type === "image/png" || e.type === "image/gif", f = d ? "image/png" : "image/jpeg", p = d ? void 0 : n, h = c.toDataURL(f, p), g = aw(h, e.name);
      o({ dataUrl: h, file: g, width: i, height: l });
    }, s.onerror = () => r(new Error("Failed to load image")), a.readAsDataURL(e);
  });
}
function dw(e, t, n) {
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
async function za(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!lw(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const r = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${r}MB`), !1;
  }
  const o = sw();
  try {
    n.onUploadStart?.();
    let r, s, a;
    const i = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && i) {
      const p = await uw(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      r = p.dataUrl, a = p.file, s = Math.min(p.width, 600);
    } else {
      r = await iw(e), a = e;
      const p = await cw(r);
      s = Math.min(p.width, 600);
    }
    const { doc: l } = t.view.state;
    l.content.size === 0 || l.childCount === 1 && l.firstChild?.isTextblock && l.firstChild.content.size === 0 ? t.chain().focus().insertContent({
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
      const p = t.view.nodeDOM(d);
      if (p) {
        const h = p instanceof HTMLElement ? p : p.dom;
        h && h.classList.add("image-uploading");
      }
    }
    try {
      const p = await n.onImageUpload(a, {
        fileName: e.name,
        mimeType: a.type,
        fileSize: a.size,
        uploadId: o
      });
      let h = !1;
      return t.view.state.doc.descendants((g, b) => {
        if (h) return !1;
        if (g.type.name === "resizableImage" && g.attrs.src === r && g.attrs.alt === e.name) {
          try {
            const { state: v, dispatch: N } = t.view, y = v.doc.nodeAt(b);
            if (y) {
              const E = v.tr.setNodeMarkup(b, void 0, {
                ...y.attrs,
                src: p
              });
              N(E);
            }
          } catch (v) {
            console.warn("Failed to replace placeholder with uploaded reference:", v);
          }
          return h = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((g, b) => {
        if (g.type.name === "resizableImage" && g.attrs.src === p) {
          const v = t.view.nodeDOM(b);
          if (v) {
            const N = v instanceof HTMLElement ? v : v.dom;
            N && N.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (p) {
      return console.warn("Image upload failed, removing placeholder:", p), dw(t, r, e.name), n.onUploadError?.(`Upload failed: ${p instanceof Error ? p.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (r) {
    return n.onUploadError?.(`Failed to process image: ${r instanceof Error ? r.message : "Unknown error"}`), !1;
  }
}
function Ua(e) {
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
const mw = Ze.create({
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
            const s = Ua(r);
            return s.length === 0 ? !1 : (o.preventDefault(), s.forEach((a) => {
              za(a, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, o, r, s) {
            if (s) return !1;
            const a = o.dataTransfer;
            if (!a) return !1;
            const i = Ua(a);
            if (i.length === 0)
              return !1;
            o.preventDefault();
            const l = n.posAtCoords({
              left: o.clientX,
              top: o.clientY
            });
            if (l) {
              const c = n.state.tr.setSelection(
                nt.near(n.state.doc.resolve(l.pos))
              );
              n.dispatch(c);
            }
            return i.forEach((c) => {
              za(c, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function fw({
  placeholder: e,
  isMobile: t,
  maxImageSize: n,
  headingLevels: o,
  collapsibleHeadingLevels: r,
  disabledFeatures: s,
  progressiveSelectAll: a,
  enableCollapsibleHeadings: i,
  enableTagAutoDetect: l,
  enableHexColorHighlight: c,
  isLightweight: u,
  setImageEditState: d,
  callbackRefs: f
}) {
  return zt(() => {
    const p = [
      wm.configure({
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
      zv,
      Uv,
      Vv,
      km.configure({
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
      Ax,
      Rx,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...u ? [] : [rw],
      _x,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      Xm.extend({
        addInputRules() {
          const h = this.type;
          return [
            new Oe({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: g, range: b }) => {
                const { tr: v } = g, N = b.from, y = b.to;
                v.delete(N, y);
                const E = v.doc.resolve(N), x = h.create(), w = E.before(E.depth), M = E.after(E.depth);
                v.replaceWith(w, M, x);
                const k = w + x.nodeSize;
                if (k < v.doc.content.size) {
                  const C = v.doc.resolve(k);
                  C.nodeAfter && C.nodeAfter.isTextblock ? v.setSelection(nt.create(v.doc, k + 1)) : C.nodeAfter && v.setSelection(nt.near(v.doc.resolve(k)));
                } else {
                  const S = g.schema.nodes.paragraph.create();
                  v.insert(k, S), v.setSelection(nt.create(v.doc, k + 1));
                }
                v.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return s.tables || p.push(
      Sm.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Mm,
      Rv,
      Lv,
      ...u ? [] : [Fv]
    ), s.taskLists || p.push(
      Yv.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      jv.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), !t && !u && p.push(
      Gv.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || p.push(Zv), s.callouts || p.push(Jv, Ix), i && !s.collapsibleHeadings && !u && p.push(
      Sx.configure({
        levels: r
      })
    ), s.images || p.push(
      eN.configure({
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
      mw.configure({
        maxFileSize: n,
        onUploadStart: f.onImageUploadStart.current ? ((...h) => f.onImageUploadStart.current(...h)) : void 0,
        onUploadComplete: f.onImageUploadComplete.current ? ((...h) => f.onImageUploadComplete.current(...h)) : void 0,
        onUploadError: f.onImageUploadError.current ? ((...h) => f.onImageUploadError.current(...h)) : void 0,
        onImageUpload: f.onImageUpload.current ? ((h, g) => f.onImageUpload.current(h, g)) : void 0
      })
    ), s.datePills || p.push(
      mx.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), s.tagPills || p.push(
      hx.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: l
      })
    ), s.wikiLinks || p.push(
      bx.configure({
        onWikiLinkClick: (h) => {
          console.log("WikiLink clicked:", h), f.onWikiLinkClick.current?.(h);
        },
        validateLink: (h) => f.validateWikiLink.current ? f.validateWikiLink.current(h) : !0
      })
    ), a && p.push(Zx), c && !u && p.push(nw), s.markdownPaste || p.push(
      Cx.configure({
        enableMarkdownPaste: !0
      })
    ), p;
  }, [e, t, n, o, r, s, a, i, l, c, u]);
}
let pt = null, nr = null;
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
    blankReplacement: (l, c) => c.nodeName === "P" ? `

​

` : c.isBlock ? `

` : ""
  });
  n.use(t), n.addRule("highlight", {
    filter: (l) => l.nodeName === "MARK",
    replacement: (l) => `==${l}==`
  }), n.addRule("resizableImage", {
    filter: "img",
    replacement: (l, c) => {
      const u = c, d = u.getAttribute("src") || "", p = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = u.getAttribute("width"), g = h ? parseInt(h, 10) : null, b = u.getAttribute("data-align") || "left", v = [p], N = b !== "left", y = g && g > 0;
      return (N || y) && v.push(N ? b : "left"), y && v.push(String(g)), `![${v.join(" | ")}](${d})`;
    }
  }), n.addRule("imageResizer", {
    filter: (l) => l.nodeName === "FIGURE" && l.classList.contains("image-resizer"),
    replacement: (l, c) => {
      const u = c.querySelector("img");
      if (!u) return l;
      const d = u.getAttribute("src") || "", p = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = u.getAttribute("width"), g = h ? parseInt(h, 10) : null, b = u.getAttribute("data-align") || "left", v = [p], N = b !== "left", y = g && g > 0;
      (N || y) && v.push(N ? b : "left"), y && v.push(String(g));
      const E = `![${v.join(" | ")}](${d})`, x = c.parentNode;
      return x && x.nodeName === "LI" ? `
` + E + `
` : `

` + E + `

`;
    }
  }), n.addRule("taskListItem", {
    filter: (l) => l.nodeName === "LI" && l.getAttribute("data-type") === "taskItem",
    replacement: (l, c) => {
      const u = c, d = u.querySelector('input[type="checkbox"]'), f = d?.hasAttribute("checked") || d?.checked || u.getAttribute("data-checked") === "true";
      return l = l.replace(/^\n+/, "").replace(/\n+$/, "").replace(/\n\n+/g, `

`), l = l.replace(/\n\n(- |\d+\. )/g, `
$1`), l = l.replace(/\u200B/g, "").trim(), `- [${f ? "x" : " "}] ` + (l || "​").replace(/\n/gm, `
    `) + `
`;
    }
  }), n.addRule("tightListParagraph", {
    filter: (l) => l.nodeName === "P" && l.parentNode !== null && l.parentNode.nodeName === "LI",
    replacement: (l) => l
  }), n.addRule("blankLinePreservation", {
    filter: (l) => l.nodeName === "P" && (l.textContent === "" || l.textContent === "​") && l.parentNode !== null && l.parentNode.nodeName !== "LI",
    replacement: () => `

​

`
  });
  function o(l) {
    const c = l.getAttribute("src") || "", d = (l.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = l.getAttribute("width"), p = f ? parseInt(f, 10) : null, h = l.getAttribute("data-align") || "left", g = [d], b = h !== "left", v = p && p > 0;
    return (b || v) && g.push(b ? h : "left"), v && g.push(String(p)), `![${g.join(" \\| ")}](${c})`;
  }
  function r(l) {
    if (l.nodeType === Node.TEXT_NODE)
      return (l.textContent || "").replace(/\|/g, "\\|");
    if (l.nodeType === Node.ELEMENT_NODE) {
      const c = l;
      if (c.nodeName === "IMG") return o(c);
      if (c.nodeName === "BR") return "";
      let u = "";
      for (const d of Array.from(c.childNodes))
        u += r(d);
      if (c.nodeName === "STRONG" || c.nodeName === "B") return `**${u}**`;
      if (c.nodeName === "EM" || c.nodeName === "I") return `*${u}*`;
      if (c.nodeName === "S" || c.nodeName === "DEL") return `~~${u}~~`;
      if (c.nodeName === "CODE") return `\`${u}\``;
      if (c.nodeName === "MARK") return `==${u}==`;
      if (c.nodeName === "A") {
        const d = c.getAttribute("href") || "";
        return `[${u}](${d})`;
      }
      return u;
    }
    return "";
  }
  function s(l) {
    let c = "";
    for (const u of Array.from(l.childNodes))
      if (u.nodeType === Node.ELEMENT_NODE) {
        const d = u, f = d.nodeName;
        if (f === "UL" || f === "OL" || f === "LABEL" || f === "INPUT") continue;
        c += r(d);
      } else
        c += r(u);
    return c.trim();
  }
  function a(l, c, u = 0) {
    const d = "  ".repeat(u), f = l.nodeName, p = Array.from(l.childNodes).filter(
      (g) => g.nodeType === Node.ELEMENT_NODE && g.nodeName === "LI"
    ), h = f === "OL" ? parseInt(l.getAttribute("start") || "1", 10) : 1;
    p.forEach((g, b) => {
      const v = g.getAttribute("data-type") === "taskItem", N = g.getAttribute("data-checked") === "true", y = s(g);
      v ? c.push(`${d}- [${N ? "x" : " "}] ${y}`) : f === "OL" ? c.push(`${d}${h + b}. ${y}`) : c.push(`${d}- ${y}`);
      const E = Array.from(g.childNodes).filter(
        (x) => x.nodeType === Node.ELEMENT_NODE && (x.nodeName === "UL" || x.nodeName === "OL")
      );
      for (const x of E)
        a(x, c, u + 1);
    });
  }
  function i(l) {
    const c = [];
    for (const u of Array.from(l.childNodes)) {
      if (u.nodeType !== Node.ELEMENT_NODE) {
        const h = (u.textContent || "").trim();
        h && c.push(h.replace(/\|/g, "\\|"));
        continue;
      }
      const d = u, f = d.nodeName;
      if (f === "UL" || f === "OL") {
        a(d, c, 0);
        continue;
      }
      if (f === "FIGURE") {
        const h = d.querySelector("img");
        h && c.push(o(h));
        continue;
      }
      if (f === "IMG") {
        c.push(o(d));
        continue;
      }
      const p = r(d).trim();
      p && c.push(p);
    }
    return c.join(" <br> ") || "";
  }
  return n.addRule("table", {
    filter: "table",
    replacement: function(l, c) {
      const u = c, d = Array.from(u.querySelectorAll("tr"));
      if (d.length === 0) return "";
      const f = [];
      let p = !1;
      d.forEach((g, b) => {
        const v = Array.from(g.querySelectorAll("th, td")), N = v.map((y) => i(y));
        if (b > 0 && v.length > 0 && v[0].nodeName === "TH" && (p = !0), f.push("| " + N.join(" | ") + " |"), b === 0) {
          const y = v.map(() => "---").join(" | ");
          f.push("| " + y + " |");
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
    replacement: function(l) {
      return l;
    }
  }), n.addRule("datePill", {
    filter: (l) => l.nodeName === "SPAN" && l.getAttribute("data-type") === "date-pill",
    replacement: (l, c) => {
      const u = c.getAttribute("data-date");
      return u ? `@${ux(u)}@` : l;
    }
  }), n.addRule("tagPill", {
    filter: (l) => l.nodeName === "SPAN" && l.getAttribute("data-type") === "tag-pill",
    replacement: (l, c) => {
      const u = c.getAttribute("data-tag");
      return u ? `#${u}` : l;
    }
  }), n.addRule("wikiLink", {
    filter: (l) => l.nodeName === "SPAN" && l.hasAttribute("data-wiki-link"),
    replacement: (l, c) => {
      const u = c.getAttribute("data-page-name");
      return u ? `[[${u}]]` : l;
    }
  }), n.addRule("callout", {
    filter: (l) => l.nodeName === "DIV" && l.hasAttribute("data-callout"),
    replacement: (l, c) => {
      const u = c.getAttribute("data-type") || "info", d = l.trim().replace(/\n{3,}/g, `

`);
      return `

\`\`\`ad-${u}
${d}
\`\`\`

`;
    }
  }), n.addRule("listSeparation", {
    filter: (l) => l.nodeName === "UL" || l.nodeName === "OL",
    replacement: (l, c) => {
      const u = c.previousElementSibling, d = u && (u.nodeName === "UL" || u.nodeName === "OL");
      return `

` + l.trim() + `

`;
    }
  }), pt = n, n;
}
function pw() {
  !nr && !pt && (nr = Vu().then((e) => (pt = e, e)));
}
function hw() {
  return pw(), {
    turndown(e) {
      return pt ? pt.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return pt !== null;
    },
    async ready() {
      pt || (nr ? await nr : await Vu());
    }
  };
}
function gw() {
  const e = j(null);
  return e.current || (e.current = hw()), e.current;
}
function bw(e) {
  const {
    extensions: t,
    content: n,
    editable: o,
    autofocus: r,
    spellCheck: s,
    initialMode: a,
    performanceMode: i,
    lightweightThreshold: l,
    onChange: c,
    onHTMLChange: u,
    onMarkdownChange: d,
    onReady: f,
    onDestroy: p,
    onFocus: h,
    onBlur: g,
    onSelectionChange: b,
    onLinkClick: v,
    editorModeRef: N,
    rawMarkdownRef: y,
    setRawMarkdown: E,
    setIsLightweight: x,
    lightweightCheckCounterRef: w,
    isLightweightRef: M
  } = e, k = j(null), C = j(c), S = j(u), D = j(d), A = j(null);
  C.current = c, S.current = u, D.current = d;
  const R = Sd({
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
    onCreate: ({ editor: O }) => {
      window.__tiptapEditor = O, f?.(O);
    },
    onDestroy: () => {
      p?.();
    },
    extensions: t,
    content: n,
    editable: o,
    autofocus: r,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: s ? "true" : "false"
      },
      handleClick: (O, U, I) => {
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
    onUpdate: ({ editor: O }) => {
      if (i === "auto" && (w.current++, w.current >= 50)) {
        w.current = 0;
        const I = O.state.doc.content.childCount > l;
        I !== M.current && x(I);
      }
      k.current && clearTimeout(k.current), k.current = setTimeout(() => {
        if (O.isDestroyed) return;
        const U = O.getHTML();
        (C.current || S.current) && (C.current?.(U), S.current?.(U));
      }, 150);
    },
    onFocus: () => {
      h?.();
    },
    onBlur: () => {
      if (k.current && (clearTimeout(k.current), k.current = null, R && !R.isDestroyed)) {
        const O = R.getHTML();
        if ((C.current || S.current) && (C.current?.(O), S.current?.(O)), N.current === "wysiwyg" && A.current) {
          const U = A.current.turndown(O);
          y.current = U, D.current?.(U);
        }
      }
      g?.();
    },
    onSelectionUpdate: ({ editor: O }) => {
      if (b) {
        const { from: U, to: I, empty: P } = O.state.selection;
        b({ from: U, to: I, empty: P });
      }
    }
  });
  q(() => () => {
    if (k.current && (clearTimeout(k.current), k.current = null, R && !R.isDestroyed)) {
      const O = R.getHTML();
      if ((C.current || S.current) && (C.current?.(O), S.current?.(O)), N.current === "wysiwyg" && A.current) {
        const U = A.current.turndown(O);
        y.current = U, D.current?.(U);
      }
    }
  }, []);
  const L = gw();
  A.current = L;
  const _ = j(!1);
  return q(() => {
    if (!_.current && a === "markdown" && R && !R.isDestroyed && L) {
      const O = R.getHTML(), U = L.turndown(O);
      E(U), y.current = U, _.current = !0;
    }
  }, [R, L, a]), { editor: R, turndownService: L };
}
function vw(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), o = n.body.firstElementChild;
  if (!o) return e;
  const r = (a) => {
    Array.from(a.querySelectorAll("ul")).forEach(r);
    const l = Array.from(a.children).filter((f) => f.tagName === "LI");
    let c = !1, u = !1;
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
    l.forEach((f) => {
      d(f) ? c = !0 : u = !0;
    }), c && (l.forEach((f) => {
      const p = d(f);
      if (p) {
        const h = p.hasAttribute("checked");
        f.setAttribute("data-type", "taskItem"), f.setAttribute("data-checked", String(h));
        const g = p.parentElement, b = g && g.tagName === "P" && g.parentElement === f;
        p.remove(), b && g.firstChild && g.firstChild.nodeType === Node.TEXT_NODE && (g.firstChild.textContent = (g.firstChild.textContent || "").replace(/^\s+/, ""));
        const v = Array.from(f.childNodes), N = [], y = [];
        v.forEach((x) => {
          if (x.nodeType === Node.ELEMENT_NODE) {
            const w = x;
            if (w.tagName === "UL" || w.tagName === "OL" || w.tagName === "P")
              y.push(x);
            else if (w.tagName === "IMG" || w.tagName === "FIGURE")
              if (w.tagName === "IMG") {
                const M = n.createElement("figure");
                M.className = "image-resizer";
                const k = w.getAttribute("data-align") || "left", C = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[k] || "margin-right: auto;";
                M.style.cssText = C, M.appendChild(w.cloneNode(!0)), y.push(M);
              } else
                y.push(x);
            else
              N.push(x);
          } else
            N.push(x);
        });
        const E = y.filter((x) => {
          if (x.nodeType === Node.ELEMENT_NODE) {
            const w = x;
            if (w.tagName === "P" && !w.textContent?.trim() && !w.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", N.length > 0) {
          const x = n.createElement("p");
          N.forEach((w) => x.appendChild(w)), x.firstChild && x.firstChild.nodeType === Node.TEXT_NODE && (x.firstChild.textContent = (x.firstChild.textContent || "").replace(/^\s+/, "")), (x.textContent?.trim() || x.querySelector("img, figure, code, br")) && f.appendChild(x);
        }
        E.forEach((x) => f.appendChild(x));
      }
    }), c && !u && a.setAttribute("data-type", "taskList"));
  };
  return Array.from(o.querySelectorAll(":scope > ul")).forEach(r), o.innerHTML;
}
function Nw(e) {
  const t = e.split(`
`), n = [], o = (i) => {
    const l = i.trimStart();
    return /^[-*+]\s+\[[ xX]\]\s/.test(l) ? "task" : /^[-*+]\s+/.test(l) ? "bullet" : /^\d+\.\s+/.test(l) ? "ordered" : null;
  }, r = (i) => /^\s{2,}\S/.test(i), s = (i) => i.trim() === "" || i.trim() === "​";
  let a = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (/^```/.test(l.trim())) {
      a = !a, n.push(l);
      continue;
    }
    if (a) {
      n.push(l);
      continue;
    }
    if (n.push(l), o(l) !== null || r(l)) {
      let c = i + 1;
      for (; c < t.length && r(t[c]); )
        c++;
      let u = 0;
      const d = c;
      for (; c < t.length && s(t[c]); )
        u++, c++;
      if (u > 0 && c < t.length) {
        const f = o(l), p = o(t[c]);
        if (f !== null && p !== null) {
          for (let h = d; h < c; h++)
            n.push(t[h]);
          n.push("<!-- list-break -->"), i = c - 1;
          continue;
        }
      }
    }
  }
  return n.join(`
`);
}
function yw(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), o = n.body.firstElementChild;
  if (!o) return e;
  const r = Array.from(o.querySelectorAll("li"));
  for (const s of r) {
    if (s.getAttribute("data-type") === "taskItem" || !s.querySelector(":scope > img, :scope > p > img, :scope > figure")) continue;
    const i = Array.from(s.childNodes), l = [], c = [];
    if (i.forEach((u) => {
      if (u.nodeType === Node.ELEMENT_NODE) {
        const d = u, f = d.tagName;
        if (f === "UL" || f === "OL")
          c.push(u);
        else if (f === "FIGURE")
          c.push(u);
        else if (f === "IMG") {
          const p = n.createElement("figure");
          p.className = "image-resizer";
          const h = d.getAttribute("data-align") || "left", g = {
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          };
          p.style.cssText = g[h] || "margin-right: auto;", p.appendChild(d.cloneNode(!0)), c.push(p);
        } else if (f === "P")
          if (d.querySelectorAll("img").length === 0)
            c.push(u);
          else {
            const h = Array.from(d.childNodes), g = [];
            if (h.forEach((b) => {
              if (b.nodeType === Node.ELEMENT_NODE && b.tagName === "IMG") {
                if (g.length > 0) {
                  const x = n.createElement("p");
                  g.forEach((w) => x.appendChild(w.cloneNode(!0))), x.textContent?.trim() && c.push(x), g.length = 0;
                }
                const v = b, N = n.createElement("figure");
                N.className = "image-resizer";
                const y = v.getAttribute("data-align") || "left", E = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                N.style.cssText = E[y] || "margin-right: auto;", N.appendChild(v.cloneNode(!0)), c.push(N);
              } else
                g.push(b);
            }), g.length > 0) {
              const b = n.createElement("p");
              g.forEach((v) => b.appendChild(v.cloneNode(!0))), b.textContent?.trim() && c.push(b);
            }
          }
        else
          l.push(u);
      } else
        l.push(u);
    }), s.innerHTML = "", l.length > 0 && l.some((d) => (d.textContent || "").trim().length > 0)) {
      const d = n.createElement("p");
      l.forEach((f) => d.appendChild(f)), s.appendChild(d);
    }
    c.forEach((u) => s.appendChild(u));
  }
  return o.innerHTML;
}
function xw(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (o) => o.replace(/<tr>([\s\S]*?)<\/tr>/gi, (r, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function or(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function ww(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function Ya(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((o) => o.trim()).map((o) => /^<img\s/i.test(o) ? ww(o) : o.trim() ? `<p>${or(o.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${or(e)}</p>`;
}
function kw(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, o = Math.floor(n / 2), r = e.trimStart(), s = r.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: o, text: s[2].trim(), checked: s[1] === "x" };
  const a = r.match(/^-\s+(.+)$/);
  if (a)
    return { type: "ul", depth: o, text: a[1].trim() };
  const i = r.match(/^(\d+)\.\s+(.+)$/);
  return i ? { type: "ol", depth: o, text: i[2].trim(), index: parseInt(i[1], 10) } : null;
}
function Cw(e) {
  if (e.length === 0) return "";
  const t = (r, s) => {
    let a = "", i = r;
    const l = e[i]?.type || "ul", c = l === "task", u = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, d = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (a += u; i < e.length && e[i].depth >= s; ) {
      const f = e[i];
      if (f.depth === s) {
        if (c ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${or(f.text)}</p>` : a += `<li><p>${or(f.text)}</p>`, i + 1 < e.length && e[i + 1].depth > s) {
          const p = t(i + 1, e[i + 1].depth);
          a += p.html, i = p.nextIdx;
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
function Ew(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, o, r) => {
      const s = /<img\s/i.test(o), a = /<br\s*\/?>/i.test(o), i = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(o);
      if (!s && !a && !i) return t;
      let l = o.trim();
      l = l.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const c = l.split(/<br\s*\/?>/i).filter((p) => p.trim());
      if (c.length <= 1 && !i)
        return s ? `${n}${Ya(l)}${r}` : t;
      const u = [];
      let d = [];
      const f = () => {
        d.length !== 0 && (u.push(Cw(d)), d = []);
      };
      for (const p of c) {
        const h = kw(p);
        if (h) {
          if (d.length > 0) {
            const g = d[0].type;
            h.depth === 0 && h.type !== g && f();
          }
          d.push(h);
        } else
          f(), u.push(Ya(p.trim()));
      }
      return f(), `${n}${u.join("")}${r}`;
    }
  );
}
function Tw(e, t, n = {}) {
  const {
    enableTagAutoDetect: o = !1,
    disableTagPills: r = !1,
    isValidTag: s,
    normalizeTag: a,
    parseDateFromMarkdown: i,
    getDateVariant: l
  } = n;
  let c = e;
  c = Nw(c);
  const u = ["info", "note", "prompt", "resources", "todo"];
  return u.forEach((f) => {
    const p = new RegExp(`\`\`\`ad-${f}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    c = c.replace(p, (h, g) => {
      const b = t(g.trim());
      return `<div data-callout="" data-type="${f}" class="callout callout-${f}">${b}</div>`;
    });
  }), u.forEach((f) => {
    const p = new RegExp(`\`\`\`${f}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    c = c.replace(p, (h, g) => {
      const b = t(g.trim());
      return `<div data-callout="" data-type="${f}" class="callout callout-${f}">${b}</div>`;
    });
  }), c = c.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (f, p, h) => {
    const g = p.split("|").map((x) => x.trim());
    let b = "", v = "left", N = null;
    g.length === 1 ? b = g[0] : g.length === 2 ? (b = g[0], /^\d+$/.test(g[1]) ? N = g[1] : ["left", "center", "right"].includes(g[1]) ? v = g[1] : b = p) : g.length === 3 ? (b = g[0], ["left", "center", "right"].includes(g[1]) && (v = g[1]), /^\d+$/.test(g[2]) && (N = g[2])) : b = p;
    const y = N ? ` width="${N}" style="width: ${N}px"` : "", E = ` data-align="${v}"`;
    return `<img src="${h.trim()}" alt="${b}"${E}${y} />`;
  }), c = c.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), i && l && (c = c.replace(/@([^@\n]+)@/g, (f, p) => {
    const h = i(p);
    if (h) {
      const g = l(h);
      return `<span data-type="date-pill" data-date="${h}" class="date-pill ${g}"><span class="date-icon">📅</span><span class="date-text">${p.trim()}</span></span>`;
    }
    return f;
  })), o && !r && s && a && (c = c.replace(
    new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"),
    (f, p) => {
      const h = a(p);
      return s(h) ? `<span data-type="tag-pill" data-tag="${h}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${h}</span></span>` : f;
    }
  )), c = c.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((f, p) => p % 2 === 1 ? f : f.replace(/\[\[([^\[\]]+)\]\]/g, (h, g) => `<span data-wiki-link data-page-name="${g.trim()}" class="wiki-link">${g.trim()}</span>`)).join(""), c;
}
function Sw(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = vw(t), t = yw(t), t = xw(t), t = Ew(t), t;
}
function Mw(e, t, n = {}) {
  const o = Tw(e, t, n), r = t(o);
  return Sw(r);
}
function Dw(e, t, n) {
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
          const { state: i } = e, { from: l, to: c } = i.selection;
          if (l !== c) {
            const u = i.doc.textBetween(l, c, " ");
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
            const { state: i } = e, { selection: l } = i, { $from: c } = l, u = c.nodeBefore?.textContent || "";
            if (u === "#####") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 5, to: c.pos }).setHeading({ level: 5 }).run();
              return;
            }
            if (u === "####") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 4, to: c.pos }).setHeading({ level: 4 }).run();
              return;
            }
            if (u === "###") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 3, to: c.pos }).setHeading({ level: 3 }).run();
              return;
            }
            if (u === "##") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 2, to: c.pos }).setHeading({ level: 2 }).run();
              return;
            }
            if (u === "#") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 1, to: c.pos }).setHeading({ level: 1 }).run();
              return;
            }
            if (u === "-" || u === "*") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 1, to: c.pos }).toggleBulletList().run();
              return;
            }
            if (/^\d+\.$/.test(u)) {
              r.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - u.length, to: c.pos }).toggleOrderedList().run();
              return;
            }
            const d = /^(-\s*)?\[([ x])?\]$/.exec(u);
            if (d) {
              r.preventDefault();
              const f = d[2] === "x", p = i.schema.nodes.taskList, h = i.schema.nodes.taskItem;
              if (p && h) {
                const g = i.tr, b = c.pos - u.length, v = c.pos;
                g.delete(b, v);
                const y = g.doc.resolve(b).blockRange();
                if (y) {
                  const E = [
                    { type: p, attrs: {} },
                    { type: h, attrs: { checked: f } }
                  ];
                  g.wrap(y, E), e.view.dispatch(g);
                  return;
                }
              }
              e.chain().focus().deleteRange({ from: c.pos - u.length, to: c.pos }).toggleTaskList().run();
              return;
            }
            if (u === ">") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 1, to: c.pos }).toggleBlockquote().run();
              return;
            }
            if (u === "```") {
              r.preventDefault(), e.chain().focus().deleteRange({ from: c.pos - 3, to: c.pos }).toggleCodeBlock().run();
              return;
            }
            if (u === "---" || u === "***") {
              r.preventDefault(), Yo(e, c.pos - 3, c.pos);
              return;
            }
            if (u === "—-") {
              r.preventDefault(), Yo(e, c.pos - 2, c.pos);
              return;
            }
            if (u === "—") {
              r.preventDefault(), Yo(e, c.pos - 1, c.pos);
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
function Aw({
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
        const l = (c) => {
          i(c.detail.mode);
        };
        return window.addEventListener("paragon-editor-mode-change", l), () => window.removeEventListener("paragon-editor-mode-change", l);
      }
    };
    return window.__paragonEditorModeAPI = a, console.log("Paragon Editor Mode API exposed globally as window.__paragonEditorModeAPI"), console.log("Available methods: getMode(), setMode(mode), toggleMode(), switchToVisual(), switchToMarkdown(), isVisualMode(), isMarkdownMode(), getRawMarkdown(), onModeChange(callback)"), () => {
      delete window.__paragonEditorModeAPI;
    };
  }, [o]), q(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: n } }));
  }, [n]);
}
function Pw({
  editor: e,
  turndownService: t,
  editorModeRef: n,
  rawMarkdownRef: o,
  setEditorMode: r,
  setRawMarkdown: s,
  onModeChange: a,
  enableTagAutoDetect: i,
  disabledFeatures: l
}) {
  return H(async (u) => {
    if (e) {
      if (u === "markdown" && n.current === "wysiwyg") {
        const d = e.getHTML(), f = t.turndown(d);
        s(f), o.current = f;
      } else if (u === "wysiwyg" && n.current === "markdown") {
        const { marked: d } = await import("./marked.esm-Tjr8Gfse.js"), f = (g) => d.parse(g, { async: !1, breaks: !0 }), p = {
          enableTagAutoDetect: i,
          disableTagPills: !!l.tagPills,
          isValidTag: rn,
          normalizeTag: Fn,
          parseDateFromMarkdown: Wt,
          getDateVariant: Ni
        }, h = Mw(o.current, f, p);
        queueMicrotask(() => {
          e.isDestroyed || e.commands.setContent(h);
        });
      }
      r(u), n.current = u, a?.(u);
    }
  }, [e, t, a]);
}
const Iw = 200;
function Rw(e, t = {}) {
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
  }), i = j(null), l = j(""), c = H((u) => {
    const d = u.trim(), f = d.length > 0 ? d.split(/\s+/).filter((N) => N.length > 0).length : 0, p = d.replace(/\s/g, "").length, h = u.length;
    let g = 0, b = 0;
    o && (g = d.length > 0 ? d.split(/\n\s*\n/).filter((N) => N.trim().length > 0).length : 0, b = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const v = Math.max(1, Math.ceil(f / Iw));
    return {
      words: f,
      characters: p,
      charactersWithSpaces: h,
      paragraphs: g,
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
          if (d === l.current) {
            a((p) => ({ ...p, isCalculating: !1 }));
            return;
          }
          l.current = d;
          const f = c(d);
          a(f);
        } catch (d) {
          console.warn("useWordCount: Error calculating word count", d), a((f) => ({ ...f, isCalculating: !1 }));
        }
      }, n);
    };
    return u(), e.on("update", u), () => {
      e.off("update", u), i.current && clearTimeout(i.current);
    };
  }, [e, n, r, c]), s;
}
function Lw({ status: e, lastSaved: t, className: n = "" }) {
  const o = (r) => {
    if (!r) return "";
    const a = (/* @__PURE__ */ new Date()).getTime() - r.getTime(), i = Math.floor(a / 1e3), l = Math.floor(i / 60), c = Math.floor(l / 60);
    return i < 10 ? "Just now" : i < 60 ? `${i}s ago` : l < 60 ? `${l}m ago` : c < 24 ? `${c}h ago` : r.toLocaleDateString();
  };
  return /* @__PURE__ */ m(
    "div",
    {
      className: `auto-save-indicator flex items-center gap-1.5 text-xs ${n}`,
      title: t ? `Last saved: ${t.toLocaleString()}` : "Not saved yet",
      children: [
        e === "idle" && t && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(Xd, { className: "w-3.5 h-3.5 text-muted-foreground" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 40,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-muted-foreground", children: [
            "Saved ",
            o(t)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 41,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 39,
          columnNumber: 9
        }, this),
        e === "saving" && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(ml, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 47,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-cyan-500", children: "Saving..." }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 48,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 46,
          columnNumber: 9
        }, this),
        e === "saved" && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(yn, { className: "w-3.5 h-3.5 text-emerald-500" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 54,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-emerald-500", children: "Saved" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 55,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this),
        e === "error" && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(Zd, { className: "w-3.5 h-3.5 text-red-500" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 61,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-red-500", children: "Save failed" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 62,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 60,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/AutoSaveIndicator.tsx",
      lineNumber: 34,
      columnNumber: 5
    },
    this
  );
}
function Ow({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ m(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ m("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ m(Qd, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/RecoveryBanner.tsx",
            lineNumber: 22,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/RecoveryBanner.tsx",
            lineNumber: 23,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/RecoveryBanner.tsx",
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
                /* @__PURE__ */ m(Us, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/RecoveryBanner.tsx",
                  lineNumber: 33,
                  columnNumber: 11
                }, this),
                "Recover"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/RecoveryBanner.tsx",
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
              children: /* @__PURE__ */ m(ht, { className: "w-5 h-5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/RecoveryBanner.tsx",
                lineNumber: 43,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/RecoveryBanner.tsx",
              lineNumber: 37,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/RecoveryBanner.tsx",
          lineNumber: 28,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/RecoveryBanner.tsx",
      lineNumber: 18,
      columnNumber: 5
    },
    this
  );
}
function $o(e) {
  const t = [], n = e.split(`
`);
  let o = 0, r = !1, s = "";
  for (let a = 0; a < n.length; a++) {
    const i = n[a], l = o;
    if (i.startsWith("```")) {
      r ? (r = !1, t.push({
        type: "code-block",
        content: i,
        start: l,
        end: l + i.length
      })) : (r = !0, s = i.slice(3).trim(), t.push({
        type: "code-block",
        content: "```",
        start: l,
        end: l + 3
      }), s && t.push({
        type: "code-block-lang",
        content: s,
        start: l + 3,
        end: l + 3 + s.length
      })), o += i.length + 1;
      continue;
    }
    if (r) {
      t.push({
        type: "code-block",
        content: i,
        start: l,
        end: l + i.length
      }), o += i.length + 1;
      continue;
    }
    const c = i.match(/^(#{1,6})\s+(.*)$/);
    if (c) {
      const N = c[1].length;
      t.push({
        type: `heading${N}`,
        content: i,
        start: l,
        end: l + i.length
      }), o += i.length + 1;
      continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(i.trim())) {
      t.push({
        type: "horizontal-rule",
        content: i,
        start: l,
        end: l + i.length
      }), o += i.length + 1;
      continue;
    }
    if (i.startsWith(">")) {
      t.push({
        type: "blockquote",
        content: i,
        start: l,
        end: l + i.length
      }), o += i.length + 1;
      continue;
    }
    if (/^\|?[\s-:|]+\|?$/.test(i) && i.includes("-")) {
      t.push({
        type: "table-separator",
        content: i,
        start: l,
        end: l + i.length
      }), o += i.length + 1;
      continue;
    }
    if (i.includes("|") && (i.startsWith("|") || i.trim().includes(" | "))) {
      t.push({
        type: "table-cell",
        content: i,
        start: l,
        end: l + i.length
      }), o += i.length + 1;
      continue;
    }
    const u = i.match(/^(\s*[-*+]\s+)\[([xX ])\]\s+(.*)$/);
    if (u) {
      const N = u[2].toLowerCase() === "x";
      t.push({
        type: N ? "task-checked" : "task-list",
        content: i,
        start: l,
        end: l + i.length
      }), o += i.length + 1;
      continue;
    }
    if (i.match(/^(\s*[-*+])\s+(.*)$/)) {
      t.push({
        type: "list-bullet",
        content: i,
        start: l,
        end: l + i.length
      }), o += i.length + 1;
      continue;
    }
    if (i.match(/^(\s*\d+\.)\s+(.*)$/)) {
      t.push({
        type: "list-number",
        content: i,
        start: l,
        end: l + i.length
      }), o += i.length + 1;
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
    for (const N of h) {
      let y;
      for (N.regex.lastIndex = 0; (y = N.regex.exec(i)) !== null; )
        g.push({
          start: l + y.index,
          end: l + y.index + y[0].length,
          type: N.type,
          content: y[0]
        });
    }
    g.sort((N, y) => N.start - y.start);
    const b = [];
    let v = l;
    for (const N of g)
      N.start >= v && (b.push(N), v = N.end);
    for (const N of b)
      N.start > l + p && t.push({
        type: "text",
        content: i.substring(p, N.start - l),
        start: l + p,
        end: N.start
      }), t.push({
        type: N.type,
        content: N.content,
        start: N.start,
        end: N.end
      }), p = N.end - l;
    p < i.length && t.push({
      type: "text",
      content: i.substring(p),
      start: l + p,
      end: l + i.length
    }), o += i.length + 1;
  }
  return t;
}
function ja(e) {
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
function Wo(e, t, n, o) {
  if (t.length === 0 && (!n || n.length === 0))
    return Ft(e);
  let r = "";
  const s = e.split(`
`);
  let a = 0;
  if (!n || n.length === 0) {
    for (let l = 0; l < s.length; l++) {
      const c = s[l], u = a + c.length, d = t.filter((p) => p.start >= a && p.start < u);
      let f = a;
      for (const p of d)
        p.start > f && (r += Ft(e.substring(f, p.start))), r += `<span class="${ja(p.type)}">${Ft(p.content)}</span>`, f = p.end;
      f < u && (r += Ft(e.substring(f, u))), l < s.length - 1 && (r += `
`), a = u + 1;
    }
    return r;
  }
  const i = /* @__PURE__ */ new Map();
  n.forEach((l, c) => {
    for (let u = l.from; u < l.to; u++)
      i.set(u, { matchIdx: c, isCurrent: c === o });
  }), a = 0;
  for (let l = 0; l < s.length; l++) {
    const c = s[l], u = a + c.length, d = t.filter((p) => p.start >= a && p.start < u);
    let f = a;
    for (const p of d)
      p.start > f && (r += rs(e, f, p.start, null, i)), r += rs(e, p.start, p.end, ja(p.type), i), f = p.end;
    f < u && (r += rs(e, f, u, null, i)), l < s.length - 1 && (r += `
`), a = u + 1;
  }
  return r;
}
function rs(e, t, n, o, r) {
  let s = "", a = t;
  for (; a < n; ) {
    const i = r.get(a);
    if (i) {
      const l = a;
      for (; a < n && r.get(a)?.matchIdx === i.matchIdx; )
        a++;
      const c = Ft(e.substring(l, a)), u = i.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      o ? s += `<span class="${o}"><mark class="${u}">${c}</mark></span>` : s += `<mark class="${u}">${c}</mark>`;
    } else {
      const l = a;
      for (; a < n && !r.has(a); )
        a++;
      const c = Ft(e.substring(l, a));
      o ? s += `<span class="${o}">${c}</span>` : s += c;
    }
  }
  return s;
}
function _w({
  content: e,
  onChange: t,
  placeholder: n = "Write your markdown here...",
  editable: o = !0,
  autofocus: r = !1,
  className: s = "",
  searchMatches: a,
  currentMatchIndex: i,
  autoClosePairs: l = !0
}) {
  const c = j(null), u = j(null), d = j(null), f = j(null), p = 5e3, h = 80, [g, b] = Y(() => {
    const k = $o(e);
    return Wo(e, k, a, i);
  }), v = j(null), N = zt(() => {
    if (e.length <= p) {
      const k = $o(e), C = Wo(e, k, a, i);
      return v.current && (clearTimeout(v.current), v.current = null), C;
    }
    return null;
  }, [e, a, i]);
  q(() => {
    if (e.length <= p) {
      const k = $o(e);
      b(Wo(e, k, a, i));
      return;
    }
    return v.current && clearTimeout(v.current), v.current = setTimeout(() => {
      const k = $o(e);
      b(Wo(e, k, a, i)), v.current = null;
    }, h), () => {
      v.current && clearTimeout(v.current);
    };
  }, [e, a, i]);
  const y = N ?? g, E = H(() => {
    const k = c.current, C = u.current, S = d.current;
    if (k) {
      const D = S?.parentElement, A = D ? D.clientHeight : 200;
      k.style.height = "auto";
      const R = Math.max(k.scrollHeight, A, 200);
      k.style.height = `${R}px`, C && (C.style.height = `${R}px`);
    }
  }, []);
  q(() => {
    const k = c.current;
    if (!k) return;
    const C = (S) => {
      const D = k.closest(".editor-content-wrapper");
      if (!D) return;
      const { scrollTop: A, scrollHeight: R, clientHeight: L } = D, _ = A <= 0, O = A + L >= R - 1;
      (S.deltaY > 0 && !O || S.deltaY < 0 && !_) && (S.preventDefault(), D.scrollTop += S.deltaY);
    };
    return k.addEventListener("wheel", C, { passive: !1 }), () => k.removeEventListener("wheel", C);
  }, []);
  const x = H(() => {
  }, []);
  q(() => {
    E();
  }, [e, E]), q(() => {
    r && c.current && c.current.focus();
  }, [r]), q(() => {
    if (f.current && c.current) {
      const { start: k, end: C } = f.current;
      c.current.selectionStart = k, c.current.selectionEnd = C, f.current = null;
    }
  }, [e]);
  const w = H((k) => {
    const C = k.target;
    f.current = {
      start: C.selectionStart,
      end: C.selectionEnd
    }, t(C.value);
  }, [t]), M = H((k) => {
    const C = k.currentTarget, S = C.selectionStart, D = C.selectionEnd, A = C.value, R = S !== D;
    if (l) {
      if (k.key === "`" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), R) {
          const L = A.substring(S, D), _ = A.substring(0, S) + "`" + L + "`" + A.substring(D);
          f.current = { start: S + 1, end: D + 1 }, t(_);
        } else if (A[S] === "`")
          f.current = { start: S + 1, end: S + 1 }, t(A), C.selectionStart = C.selectionEnd = S + 1;
        else {
          const L = A.substring(0, S) + "``" + A.substring(D);
          f.current = { start: S + 1, end: S + 1 }, t(L);
        }
        return;
      }
      if (k.key === "*" && !k.ctrlKey && !k.metaKey) {
        if (A[S - 1] === "*" && A[S], R) {
          k.preventDefault();
          const O = A.substring(S, D), U = A.substring(0, S) + "*" + O + "*" + A.substring(D);
          f.current = { start: S + 1, end: D + 1 }, t(U);
          return;
        }
        if (A[S] === "*") {
          k.preventDefault(), f.current = { start: S + 1, end: S + 1 }, t(A.substring(0, S) + A.substring(S));
          return;
        }
        k.preventDefault();
        const _ = A.substring(0, S) + "**" + A.substring(D);
        f.current = { start: S + 1, end: S + 1 }, t(_);
        return;
      }
      if (k.key === "_" && !k.ctrlKey && !k.metaKey) {
        if (R) {
          k.preventDefault();
          const _ = A.substring(S, D), O = A.substring(0, S) + "_" + _ + "_" + A.substring(D);
          f.current = { start: S + 1, end: D + 1 }, t(O);
          return;
        }
        if (A[S] === "_") {
          k.preventDefault(), f.current = { start: S + 1, end: S + 1 }, t(A.substring(0, S) + A.substring(S));
          return;
        }
        k.preventDefault();
        const L = A.substring(0, S) + "__" + A.substring(D);
        f.current = { start: S + 1, end: S + 1 }, t(L);
        return;
      }
      if (k.key === "~" && !k.ctrlKey && !k.metaKey) {
        if (R) {
          k.preventDefault();
          const _ = A.substring(S, D), O = A.substring(0, S) + "~" + _ + "~" + A.substring(D);
          f.current = { start: S + 1, end: D + 1 }, t(O);
          return;
        }
        if (A[S] === "~") {
          k.preventDefault(), f.current = { start: S + 1, end: S + 1 }, t(A.substring(0, S) + A.substring(S));
          return;
        }
        k.preventDefault();
        const L = A.substring(0, S) + "~~" + A.substring(D);
        f.current = { start: S + 1, end: S + 1 }, t(L);
        return;
      }
      if (k.key === "[" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), R) {
          const L = A.substring(S, D), _ = A.substring(0, S) + "[" + L + "]()" + A.substring(D);
          f.current = { start: D + 3, end: D + 3 }, t(_);
        } else {
          const L = A.substring(0, S) + "[]()" + A.substring(D);
          f.current = { start: S + 1, end: S + 1 }, t(L);
        }
        return;
      }
      if (k.key === "]" && !k.ctrlKey && !k.metaKey && A[S] === "]") {
        k.preventDefault(), f.current = { start: S + 1, end: S + 1 }, t(A.substring(0, S) + A.substring(S));
        return;
      }
      if (k.key === ")" && !k.ctrlKey && !k.metaKey && A[S] === ")") {
        k.preventDefault(), f.current = { start: S + 1, end: S + 1 }, t(A.substring(0, S) + A.substring(S));
        return;
      }
      if (k.key === "Backspace" && !R && S > 0) {
        const L = A[S - 1], _ = A[S], O = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [U, I] of O)
          if (L === U && _ === I) {
            k.preventDefault();
            const P = A.substring(0, S - 1) + A.substring(S + 1);
            f.current = { start: S - 1, end: S - 1 }, t(P);
            return;
          }
        if (L === "[" && A.substring(S, S + 3) === "]()") {
          k.preventDefault();
          const U = A.substring(0, S - 1) + A.substring(S + 3);
          f.current = { start: S - 1, end: S - 1 }, t(U);
          return;
        }
      }
    }
    if (k.key === "Tab")
      if (k.preventDefault(), k.shiftKey) {
        const L = A.substring(0, S), _ = A.substring(S, D), O = A.substring(D), I = L.lastIndexOf(`
`) + 1, P = L.substring(0, I), W = L.substring(I), K = (W + _).split(`
`), V = K.map((B) => B.startsWith("  ") ? B.substring(2) : B.startsWith("	") ? B.substring(1) : B), G = P + V.join(`
`) + O, Q = (W + _).length - V.join(`
`).length;
        f.current = {
          start: Math.max(I, S - (K[0].length - V[0].length)),
          end: D - Q
        }, t(G);
      } else if (S === D) {
        const L = A.substring(0, S) + "  " + A.substring(D);
        f.current = { start: S + 2, end: S + 2 }, t(L);
      } else {
        const L = A.substring(0, S), _ = A.substring(S, D), O = A.substring(D), I = L.lastIndexOf(`
`) + 1, P = L.substring(0, I), K = (L.substring(I) + _).split(`
`), V = K.map((Q) => "  " + Q), G = P + V.join(`
`) + O;
        f.current = {
          start: S + 2,
          end: D + K.length * 2
        }, t(G);
      }
  }, [t, l]);
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
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
        lineNumber: 880,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      "textarea",
      {
        ref: c,
        value: e,
        onChange: w,
        onKeyDown: M,
        onScroll: x,
        placeholder: "",
        disabled: !o,
        className: "syntax-textarea",
        spellCheck: !1
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
        lineNumber: 886,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
    lineNumber: 879,
    columnNumber: 5
  }, this);
}
let Va = 0, Ss = 0, Ku = 0;
function $w(e) {
  Ss++, Ku = e;
}
const Ww = vn(function({
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
  }), l = j([]), c = j(performance.now()), u = j(0), d = j(0), f = j(0), p = j(0), [h, g] = Y(new Array(60).fill(0)), [b, v] = Y(new Array(60).fill(0));
  q(() => {
    if (!t || !o) return;
    const M = () => {
      const k = performance.now();
      queueMicrotask(() => {
        const C = performance.now() - k;
        $w(C);
      });
    };
    return o.on("transaction", M), () => {
      o.off("transaction", M);
    };
  }, [t, o]), q(() => {
    if (!t) return;
    let M = 0, k = performance.now(), C = 0;
    const S = (D) => {
      const A = D - c.current;
      if (c.current = D, l.current.push({ time: D, duration: A }), l.current.length > 120 && (l.current = l.current.slice(-120)), A > 16.67 && d.current++, M++, D - k >= 1e3) {
        C = M, M = 0, k = D;
        const R = l.current.slice(-60), L = R.length > 0 ? R.reduce((V, G) => V + G.duration, 0) / R.length : 0, _ = R.length > 0 ? Math.max(...R.map((V) => V.duration)) : 0, O = performance.memory, U = O ? O.usedJSHeapSize / (1024 * 1024) : 0, I = O ? O.jsHeapSizeLimit / (1024 * 1024) : 0, P = document.querySelectorAll("*").length, W = Va - f.current, K = Ss - p.current;
        f.current = Va, p.current = Ss, i({
          fps: C,
          frameTime: Math.round(L * 100) / 100,
          frameTimeMax: Math.round(_ * 100) / 100,
          memoryUsed: Math.round(U * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: W,
          transactionCount: K,
          lastTransactionTime: Math.round(Ku * 100) / 100,
          domNodes: P,
          longFrames: d.current
        }), g((V) => [...V.slice(1), C]), v((V) => [...V.slice(1), L]), d.current = 0;
      }
      u.current = requestAnimationFrame(S);
    };
    return u.current = requestAnimationFrame(S), () => {
      cancelAnimationFrame(u.current);
    };
  }, [t]);
  const N = H(() => {
    n?.();
  }, [n]), y = H(() => {
    s((M) => !M);
  }, []);
  if (!t) return null;
  const E = (M) => M >= 55 ? "#4ade80" : M >= 30 ? "#fbbf24" : "#f87171", x = (M) => M <= 16.67 ? "#4ade80" : M <= 33.33 ? "#fbbf24" : "#f87171", w = (M, k, C) => {
    const A = M.map((R, L) => {
      const _ = L / (M.length - 1) * 120, O = 24 - Math.min(R, k) / k * 24;
      return `${_},${O}`;
    }).join(" ");
    return /* @__PURE__ */ m("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ m(
      "polyline",
      {
        points: A,
        fill: "none",
        stroke: C,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 225,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 224,
      columnNumber: 7
    }, this);
  };
  return /* @__PURE__ */ m("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ m("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ m("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ m(Jd, { size: 14 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 241,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m("span", { children: "Performance" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 242,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 240,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ m("button", { onClick: y, title: r ? "Expand" : "Minimize", children: r ? /* @__PURE__ */ m(fl, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 28
        }, this) : /* @__PURE__ */ m(pl, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 54
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 245,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m("button", { onClick: N, title: "Close profiler", children: /* @__PURE__ */ m(ht, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 249,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 248,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 244,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 239,
      columnNumber: 7
    }, this),
    !r && /* @__PURE__ */ m("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "FPS" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 259,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: E(a.fps) }, children: a.fps }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 260,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 258,
          columnNumber: 13
        }, this),
        w(h, 70, E(a.fps))
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 257,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Frame Time" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 270,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: x(a.frameTime) }, children: [
            a.frameTime,
            "ms"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 271,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 269,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Max" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 276,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value-sub", style: { color: x(a.frameTimeMax) }, children: [
            a.frameTimeMax,
            "ms"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 277,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 275,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: [
            "Jank (",
            ">",
            " 16.7ms)"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 282,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value-sub", style: { color: a.longFrames > 3 ? "#f87171" : "#4ade80" }, children: [
            a.longFrames,
            "/s"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 283,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 281,
          columnNumber: 13
        }, this),
        w(b, 50, x(a.frameTime))
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 268,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Renders/s" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 293,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: a.renderCount }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 294,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 292,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Transactions/s" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 297,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: a.transactionCount }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 298,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 296,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Last TX time" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 301,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value-sub", children: [
            a.lastTransactionTime,
            "ms"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 302,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 300,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 291,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "DOM Nodes" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 309,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: a.domNodes.toLocaleString() }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 310,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 308,
          columnNumber: 13
        }, this),
        a.memoryTotal > 0 && /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Memory" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 314,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: [
            a.memoryUsed,
            "MB / ",
            a.memoryTotal,
            "MB"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 315,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 313,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 307,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 255,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/PerformanceProfiler.tsx",
    lineNumber: 237,
    columnNumber: 5
  }, this);
});
class Bw extends Ad {
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
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 140,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 139,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ m("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 145,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 148,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
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
                /* @__PURE__ */ m(Us, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
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
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
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
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 176,
                  columnNumber: 19
                }, this),
                "Clear Content & Retry"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 170,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
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
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 193,
                  columnNumber: 21
                }, this) : /* @__PURE__ */ m(ul, { className: "w-3 h-3" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 195,
                  columnNumber: 21
                }, this),
                "Error details"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 185,
              columnNumber: 17
            },
            this
          ),
          n && /* @__PURE__ */ m("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ m("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ m("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
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
                      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 210,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ m("span", { className: "text-green-500", children: "Copied" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 211,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                    lineNumber: 209,
                    columnNumber: 27
                  }, this) : /* @__PURE__ */ m(Ce, { children: [
                    /* @__PURE__ */ m(Nn, { className: "w-3 h-3" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 215,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ m("span", { children: "Copy" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 216,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                    lineNumber: 214,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 204,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 202,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ m("p", { className: "text-xs font-mono text-muted-foreground break-all", children: t.message }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 221,
              columnNumber: 21
            }, this),
            t.stack && /* @__PURE__ */ m("pre", { className: "text-[10px] font-mono text-muted-foreground/70 mt-2 whitespace-pre-wrap break-all", children: t.stack.split(`
`).slice(1, 6).join(`
`) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 225,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 201,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 184,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
        lineNumber: 137,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorErrorBoundary.tsx",
        lineNumber: 136,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
function Hw({ className: e = "", theme: t }) {
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
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 28,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("83%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 29,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("66%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 30,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: { height: "0.75rem" } }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 31,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("100%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 32,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("75%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 33,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorLoadingSkeleton.tsx",
      lineNumber: 24,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorLoadingSkeleton.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
function Fw({ editorMode: e, onModeSwitch: t }) {
  return /* @__PURE__ */ m("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
    /* @__PURE__ */ m(
      "button",
      {
        onClick: () => t("wysiwyg"),
        className: `editor-mode-toggle-btn ${e === "wysiwyg" ? "active" : ""}`,
        title: "Visual Editor",
        children: /* @__PURE__ */ m(nm, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorModeToggle.tsx",
          lineNumber: 19,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorModeToggle.tsx",
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
        children: /* @__PURE__ */ m(Ys, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorModeToggle.tsx",
          lineNumber: 26,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorModeToggle.tsx",
        lineNumber: 21,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/EditorModeToggle.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}
const Ue = ({ onMouseDown: e, isActive: t, disabled: n, children: o, title: r }) => /* @__PURE__ */ m(
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
    fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 50,
    columnNumber: 3
  },
  void 0
), Ka = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }, void 0, !1, {
  fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
  lineNumber: 69,
  columnNumber: 3
}, void 0), Ga = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], zw = vn(function({ editor: t, isH1: n, isH2: o, isH3: r, isH4: s, isH5: a, executeCommand: i }) {
  const [l, c] = Y(!1), u = j(null), d = n ? "h1" : o ? "h2" : r ? "h3" : s ? "h4" : a ? "h5" : "paragraph", f = Ga.find((h) => h.value === d)?.shortLabel || "P";
  q(() => {
    if (!l) return;
    const h = (g) => {
      u.current && !u.current.contains(g.target) && c(!1);
    };
    return document.addEventListener("mousedown", h), () => document.removeEventListener("mousedown", h);
  }, [l]);
  const p = (h, g) => {
    if (h.preventDefault(), h.stopPropagation(), g === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const b = parseInt(g.replace("h", ""));
      t.chain().focus().toggleHeading({ level: b }).run();
    }
    c(!1);
  };
  return /* @__PURE__ */ m("div", { ref: u, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ m(
      "button",
      {
        onMouseDown: (h) => {
          h.preventDefault(), h.stopPropagation(), c(!l);
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
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 143,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(Dt, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${l ? "rotate-180" : ""}` }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 144,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 126,
        columnNumber: 7
      },
      this
    ),
    l && /* @__PURE__ */ m(
      "div",
      {
        className: `
            absolute top-full left-0 mt-1.5
            bg-popover text-popover-foreground
            border border-border rounded-lg shadow-lg
            py-1 min-w-[130px] z-[10000]
          `,
        style: { animation: "slash-fade-in-below 0.12s ease-out" },
        children: Ga.map((h) => {
          const g = h.value === d;
          return /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (b) => p(b, h.value),
              className: `
                  flex items-center gap-2 w-full px-3 py-1.5 text-left text-sm
                  transition-colors duration-75
                  ${g ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"}
                `,
              children: [
                /* @__PURE__ */ m("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: h.shortLabel }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
                  lineNumber: 172,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ m("span", { children: h.label }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
                  lineNumber: 173,
                  columnNumber: 17
                }, this)
              ]
            },
            h.value,
            !0,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
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
        fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 148,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 125,
    columnNumber: 5
  }, this);
}), Uw = vn(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: o = !1, aiEnabled: r = !1, onAISparklesClick: s }) {
  const a = j(null), i = tl({
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
  }), [l, c] = Y(!1), [u, d] = Y(""), [f, p] = Y(!1), [h, g] = Y({ top: 0, left: 0 }), b = j(null), v = j(null), N = j(null), y = H(() => {
    if (u) {
      let C = u.trim();
      !/^https?:\/\//i.test(C) && !C.startsWith("mailto:") && (C = "https://" + C), t.chain().focus().extendMarkRange("link").setLink({ href: C }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    c(!1), d("");
  }, [t, u]), E = (C) => {
    C.preventDefault(), C.stopPropagation();
    const S = t.getAttributes("link").href;
    d(S || ""), c(!0);
  }, x = H((C, S) => {
    C.preventDefault(), C.stopPropagation(), S();
  }, []);
  q(() => {
    if (!t || t.isDestroyed) return;
    const C = () => {
      if (!t.isDestroyed)
        try {
          const { selection: S } = t.state, { empty: D, from: A, to: R } = S, O = ("node" in S && S.node ? S.node : null)?.type?.name === "resizableImage";
          if (D || O || t.isActive("codeBlock")) {
            N.current && (clearTimeout(N.current), N.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              p(!1), c(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const U = t.view.coordsAtPos(A), I = t.view.coordsAtPos(R), P = b.current?.offsetWidth || 500, W = b.current?.offsetHeight || 40, K = 8, V = window.innerWidth;
          let G = 0, Q = 0;
          if (b.current) {
            const ce = b.current.closest('[data-slot="dialog-content"]');
            if (ce) {
              const ue = ce.getBoundingClientRect();
              G = ue.left, Q = ue.top;
            }
          }
          let $ = (U.left + I.left) / 2 - P / 2 - G;
          const z = G ? V - G : V;
          $ = Math.max(K, Math.min(z - P - K, $));
          let Z = U.top - W - 10 - Q;
          Z < K && (Z = I.bottom + 10 - Q), f ? g({ top: Math.max(K, Z), left: $ }) : (N.current && clearTimeout(N.current), N.current = setTimeout(() => {
            g({ top: Math.max(K, Z), left: $ }), p(!0);
          }, 50));
        } catch (S) {
          console.warn("FloatingToolbar: Error updating position", S);
        }
    };
    return t.on("selectionUpdate", C), () => {
      t.off("selectionUpdate", C), v.current && clearTimeout(v.current), N.current && clearTimeout(N.current);
    };
  }, [t, f]), q(() => {
    if (!f || !t || t.isDestroyed) return;
    const C = t.view.dom.closest(".editor-content") || t.view.dom.parentElement;
    if (!C) return;
    const S = () => {
      p(!1), c(!1);
    };
    return C.addEventListener("scroll", S, { passive: !0 }), window.addEventListener("scroll", S, { passive: !0 }), () => {
      C.removeEventListener("scroll", S), window.removeEventListener("scroll", S);
    };
  }, [f, t]);
  const w = (C) => {
    v.current && (clearTimeout(v.current), v.current = null);
  };
  if (!f || o)
    return null;
  const M = 15, k = l ? /* @__PURE__ */ m(
    "div",
    {
      ref: b,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: h.top,
        left: h.left
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
              C.key === "Enter" && (C.preventDefault(), y()), C.key === "Escape" && (c(!1), d(""));
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
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
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
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 430,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (C) => {
                C.preventDefault(), c(!1), d("");
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
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 443,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 429,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 405,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
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
        top: h.top,
        left: h.left
      },
      onMouseDown: w,
      children: [
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleBold().run()),
            isActive: i?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(Ps, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 477,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 472,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleItalic().run()),
            isActive: i?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m(Is, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 484,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 479,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleUnderline().run()),
            isActive: i?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(Rs, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 491,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 486,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleStrike().run()),
            isActive: i?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(Ls, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 498,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 493,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleCode().run()),
            isActive: i?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(rl, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 505,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 500,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleHighlight().run()),
            isActive: i?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ m(sl, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 512,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 507,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: E,
            isActive: i?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ m(Os, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 520,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 515,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(Ka, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 523,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m(
          zw,
          {
            editor: t,
            isH1: i?.isH1 ?? !1,
            isH2: i?.isH2 ?? !1,
            isH3: i?.isH3 ?? !1,
            isH4: i?.isH4 ?? !1,
            isH5: i?.isH5 ?? !1,
            executeCommand: x
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 526,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleBlockquote().run()),
            isActive: i?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(Bs, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 540,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 535,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleBulletList().run()),
            isActive: i?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(_s, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 547,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 542,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleOrderedList().run()),
            isActive: i?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m($s, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 554,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 549,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleTaskList().run()),
            isActive: i?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m(Ws, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 561,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 556,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: i?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(om, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 568,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 563,
            columnNumber: 7
          },
          this
        ),
        r && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(Ka, {}, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
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
              children: /* @__PURE__ */ m(ar, { size: M }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
                lineNumber: 592,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 575,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 573,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 461,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { onMouseDown: w, children: k }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 600,
    columnNumber: 5
  }, this);
});
function Yw({ editor: e, isOpen: t, onClose: n }) {
  const [o, r] = Y(""), s = j(null), a = j(null), [i, l] = Y({ top: 0, left: 0 });
  q(() => {
    if (t) {
      const h = e.getAttributes("link").href || "";
      r(h);
      try {
        const { view: g } = e, { from: b } = g.state.selection, v = g.coordsAtPos(b), N = v.bottom + 8, y = Math.max(16, Math.min(v.left, window.innerWidth - 420));
        l({ top: N, left: y });
      } catch {
        l({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), q(() => {
    if (!t) return;
    const h = (N) => {
      a.current && !a.current.contains(N.target) && n();
    }, g = () => {
      n();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", h);
    }, 10), v = e.view.dom.closest(".editor-content-wrapper");
    return v?.addEventListener("scroll", g), () => {
      clearTimeout(b), document.removeEventListener("mousedown", h), v?.removeEventListener("scroll", g);
    };
  }, [t, n, e]);
  const c = H((h) => {
    if (h?.preventDefault(), o.trim()) {
      let g = o.trim();
      !/^https?:\/\//i.test(g) && !g.startsWith("mailto:") && (g = "https://" + g), e.chain().focus().extendMarkRange("link").setLink({ href: g }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [o, e, n]), u = H((h) => {
    h.key === "Escape" ? (h.preventDefault(), n()) : h.key === "Enter" && (h.preventDefault(), c());
  }, [n, c]);
  if (!t) return null;
  const f = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", p = /* @__PURE__ */ m(
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
      children: /* @__PURE__ */ m("form", { onSubmit: c, className: "link-popover-form", children: [
        /* @__PURE__ */ m("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ m(As, { className: "link-popover-icon", size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkPopover.tsx",
            lineNumber: 140,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(
            "input",
            {
              ref: s,
              type: "text",
              value: o,
              onChange: (h) => r(h.target.value),
              onKeyDown: u,
              placeholder: "Enter URL or paste link",
              className: "link-popover-input",
              autoComplete: "off",
              spellCheck: !1
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkPopover.tsx",
              lineNumber: 141,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkPopover.tsx",
          lineNumber: 139,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { className: "link-popover-hint", children: "Press Enter to save · Escape to cancel" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkPopover.tsx",
          lineNumber: 153,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkPopover.tsx",
        lineNumber: 138,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkPopover.tsx",
      lineNumber: 128,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { children: p }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkPopover.tsx",
    lineNumber: 161,
    columnNumber: 10
  }, this);
}
function jw({ editor: e, onEditLink: t }) {
  const [n, o] = Y({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), r = j(null), s = j(null), a = H((y) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const E = y.getAttribute("href") || "", x = y.getBoundingClientRect(), w = x.bottom + 8, M = Math.max(16, Math.min(x.left, window.innerWidth - 340));
        o({
          isVisible: !0,
          url: E,
          position: { top: w, left: M },
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
  }, []), l = H(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  q(() => {
    if (!e || e.isDestroyed) return;
    const y = e.view.dom;
    if (!y) return;
    const E = (w) => {
      const k = w.target.closest("a");
      k && y.contains(k) && a(k);
    }, x = (w) => {
      const M = w.target, k = w.relatedTarget;
      if (M.closest("a")) {
        if (k && r.current?.contains(k))
          return;
        i();
      }
    };
    return y.addEventListener("mouseover", E), y.addEventListener("mouseout", x), () => {
      y.removeEventListener("mouseover", E), y.removeEventListener("mouseout", x), s.current && clearTimeout(s.current);
    };
  }, [e, a, i]), q(() => {
    if (!n.isVisible) return;
    const y = () => {
      o((x) => ({ ...x, isVisible: !1, linkElement: null }));
    }, E = e.view.dom.closest(".editor-content-wrapper");
    return E?.addEventListener("scroll", y), window.addEventListener("scroll", y, !0), () => {
      E?.removeEventListener("scroll", y), window.removeEventListener("scroll", y, !0);
    };
  }, [n.isVisible, e]);
  const [c, u] = Y(!1), d = H(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      u(!0), setTimeout(() => u(!1), 1500);
    });
  }, [n.url]), f = H(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), p = H(() => {
    if (n.linkElement) {
      const { view: y } = e, { doc: E } = y.state;
      let x = null, w = null;
      E.descendants((M, k) => {
        if (M.isText && M.marks.some((C) => C.type.name === "link")) {
          const C = y.nodeDOM(k);
          if (C && (C === n.linkElement || C.parentElement === n.linkElement))
            return x = k, w = k + M.nodeSize, !1;
        }
        return !0;
      }), x !== null && w !== null ? e.chain().focus().setTextSelection({ from: x, to: w }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    o((y) => ({ ...y, isVisible: !1 }));
  }, [e, n.linkElement]), h = H(() => {
    if (n.linkElement) {
      const { view: y } = e, { doc: E } = y.state;
      E.descendants((x, w) => {
        if (x.isText && x.marks.some((M) => M.type.name === "link")) {
          const M = y.nodeDOM(w);
          if (M && (M === n.linkElement || M.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: w, to: w + x.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    o((y) => ({ ...y, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const g = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, v = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", N = /* @__PURE__ */ m(
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
      onMouseEnter: l,
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
                fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 247,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "link-hover-tooltip-url", children: g || "No URL" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 248,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
            lineNumber: 242,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ m("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ m(sm, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 259,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
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
              children: c ? /* @__PURE__ */ m(yn, { size: 14, style: { color: "var(--primary)" } }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 268,
                columnNumber: 23
              }, this) : /* @__PURE__ */ m(Nn, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 268,
                columnNumber: 81
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 263,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ m(im, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 277,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 272,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
          lineNumber: 252,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
        lineNumber: 240,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
      lineNumber: 228,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { children: N }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/LinkHoverTooltip.tsx",
    lineNumber: 285,
    columnNumber: 10
  }, this);
}
const Vw = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(ir, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 64,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(am, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 70,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(lm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 76,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(cm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 82,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(um, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 88,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(dm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 94,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ m(_s, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 100,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ m($s, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 106,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ m(Ws, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 112,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ m(Bs, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 118,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ m(il, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 124,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ m(ss, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 130,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ m(Ds, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
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
    icon: /* @__PURE__ */ m(al, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 143,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ m(Vo, { size: 16, className: "text-blue-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 149,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ m(cl, { size: 16, className: "text-purple-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 155,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ m(ll, { size: 16, className: "text-amber-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 161,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ m(Hs, { size: 16, className: "text-green-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 167,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ m(Fs, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 173,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ m(dl, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 179,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ m(As, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 185,
      columnNumber: 11
    }, void 0),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], Kw = 32, Gw = 8, qw = 320, Xw = 210, Bo = 12;
function qa(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const r = t.getRangeAt(0), s = r.getBoundingClientRect();
      if (s.width === 0 && s.height === 0 && s.top === 0) {
        const a = document.createElement("span");
        a.textContent = "​", r.cloneRange().insertNode(a);
        const l = a.getBoundingClientRect(), c = { top: l.top, bottom: l.bottom, left: l.left };
        return a.parentNode?.removeChild(a), t.removeAllRanges(), t.addRange(r), c;
      }
      return { top: s.top, bottom: s.bottom, left: s.left };
    }
    const n = e.state.selection.from, o = e.view.coordsAtPos(n);
    return { top: o.top, bottom: o.bottom, left: o.left };
  } catch {
    return null;
  }
}
function Zw({ editor: e }) {
  const [t, n] = Y(!1), [o, r] = Y(""), [s, a] = Y(0), [i, l] = Y(null), [c, u] = Y(!1), [d, f] = Y({ top: 0, left: 0 }), [p, h] = Y("below"), g = j(null), b = j(-1), v = j(!1);
  q(() => {
    v.current = t;
  }, [t]);
  const N = Vw.filter((C) => {
    if (!o) return !0;
    const S = o.toLowerCase();
    return C.title.toLowerCase().includes(S) || C.keywords?.some((D) => D.includes(S));
  }), y = Math.min(
    N.length * Kw + Gw,
    qw
  );
  sr(() => {
    if (!t || !i) return;
    const { top: C, bottom: S, left: D } = i, A = window.innerHeight, R = window.innerWidth, L = A - S - Bo, _ = C - Bo;
    let O;
    if (L >= y ? O = "below" : _ >= y ? O = "above" : O = L >= _ ? "below" : "above", h(O), g.current) {
      const U = Math.max(
        Bo,
        Math.min(D, R - Xw - Bo)
      ), I = O === "below" ? S + 4 : C - y - 4;
      g.current.style.top = `${I}px`, g.current.style.left = `${U}px`;
    }
  }, [t, i, y, N.length]);
  const E = H(() => {
    const { state: C } = e, { selection: S } = C, D = S.from, A = b.current;
    if (A >= 0 && A <= D)
      e.chain().focus().deleteRange({ from: A, to: D }).run();
    else {
      const { $from: R } = S, _ = R.parent.textBetween(0, R.parentOffset, void 0, "￼").lastIndexOf("/");
      if (_ !== -1) {
        const O = R.pos - (R.parentOffset - _);
        e.chain().focus().deleteRange({ from: O, to: R.pos }).run();
      }
    }
  }, [e]), x = H(() => {
    n(!1), r(""), a(0), b.current = -1, l(null);
  }, []), w = H((C) => {
    const S = N[C];
    if (S) {
      if (E(), S.isImageCommand) {
        const { state: D } = e, A = e.view.coordsAtPos(D.selection.from);
        f({
          top: A.bottom + 8,
          left: A.left
        }), u(!0);
      } else
        S.command(e);
      x();
    }
  }, [e, N, E, x]), M = H((C, S) => {
    e.chain().focus().setImage({ src: C, alt: S }).run();
  }, [e]);
  return q(() => {
    if (!e) return;
    const C = () => {
      if (v.current) return;
      const { state: S } = e, { selection: D } = S, { $from: A } = D;
      if (A.parentOffset === 0) return;
      const R = A.parent.textBetween(0, A.parentOffset, void 0, "￼");
      if (!R.endsWith("/")) return;
      const L = R.length > 1 ? R.slice(-2, -1) : "";
      if (L && L !== " " && L !== `
`) return;
      b.current = A.pos - 1;
      const _ = qa(e);
      _ && (l(_), n(!0), r(""), a(0));
    };
    return e.on("update", C), () => {
      e.off("update", C);
    };
  }, [e]), q(() => {
    if (!e || !t) return;
    const C = e.view.dom, S = (D) => {
      v.current && (D.key === "ArrowDown" ? (D.preventDefault(), D.stopPropagation(), a((A) => (A + 1) % N.length)) : D.key === "ArrowUp" ? (D.preventDefault(), D.stopPropagation(), a((A) => (A - 1 + N.length) % N.length)) : D.key === "Enter" ? (D.preventDefault(), D.stopPropagation(), w(s)) : D.key === "Escape" && (D.preventDefault(), D.stopPropagation(), x()));
    };
    return C.addEventListener("keydown", S, !0), () => {
      C.removeEventListener("keydown", S, !0);
    };
  }, [e, t, s, N, w, x]), q(() => {
    if (!e || !t) return;
    const C = () => {
      if (!v.current || b.current < 0) return;
      const { state: S } = e, { selection: D } = S, A = D.from, R = b.current;
      if (A <= R) {
        x();
        return;
      }
      try {
        const L = S.doc.textBetween(R + 1, A, void 0, "￼");
        if (L.includes(`
`)) {
          x();
          return;
        }
        r(L), a(0);
        const _ = qa(e);
        _ && l(_);
      } catch {
        x();
      }
    };
    return e.on("update", C), e.on("selectionUpdate", C), () => {
      e.off("update", C), e.off("selectionUpdate", C);
    };
  }, [e, t, x]), q(() => {
    if (!t) return;
    const C = (S) => {
      g.current && !g.current.contains(S.target) && x();
    };
    return document.addEventListener("mousedown", C), () => document.removeEventListener("mousedown", C);
  }, [t, x]), q(() => {
    t && N.length === 0 && o.length > 2 && x();
  }, [t, N.length, o, x]), q(() => {
    s >= N.length && a(Math.max(0, N.length - 1));
  }, [N.length, s]), q(() => {
    if (!t || !g.current) return;
    const C = g.current.querySelector(".slash-item.is-selected");
    C && C.scrollIntoView({ block: "nearest" });
  }, [t, s]), c ? /* @__PURE__ */ m(
    Nl,
    {
      isOpen: c,
      onClose: () => u(!1),
      onInsert: M,
      position: d
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 530,
      columnNumber: 7
    },
    this
  ) : !t || N.length === 0 ? null : /* @__PURE__ */ m(Nt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: g,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: N.map((C, S) => /* @__PURE__ */ m(
        "div",
        {
          className: `slash-item ${S === s ? "is-selected" : ""}`,
          onClick: (D) => {
            D.preventDefault(), D.stopPropagation(), w(S);
          },
          onMouseEnter: () => a(S),
          children: [
            /* @__PURE__ */ m("span", { className: "slash-icon", children: C.icon }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
              lineNumber: 569,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m("span", { className: "slash-label", children: C.title }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
              lineNumber: 570,
              columnNumber: 11
            }, this)
          ]
        },
        C.title,
        !0,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
          lineNumber: 559,
          columnNumber: 9
        },
        this
      ))
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 549,
      columnNumber: 5
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/SlashCommands.tsx",
    lineNumber: 548,
    columnNumber: 5
  }, this);
}
const Qw = 340, Jw = 36, e1 = 8, t1 = 240, Ho = 8;
function Xa(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const r = t.getRangeAt(0), s = r.getBoundingClientRect();
      if (s.width === 0 && s.height === 0 && s.top === 0) {
        const a = document.createElement("span");
        a.textContent = "​", r.cloneRange().insertNode(a);
        const l = a.getBoundingClientRect(), c = { top: l.top, bottom: l.bottom, left: l.left };
        return a.parentNode?.removeChild(a), t.removeAllRanges(), t.addRange(r), c;
      }
      return { top: s.top, bottom: s.bottom, left: s.left };
    }
    const n = e.state.selection.from, o = e.view.coordsAtPos(n);
    return { top: o.top, bottom: o.bottom, left: o.left };
  } catch {
    return null;
  }
}
function n1({ editor: e, onSearch: t, onCreateItem: n }) {
  const [o, r] = Y(!1), [s, a] = Y(""), [i, l] = Y([]), [c, u] = Y(0), [d, f] = Y(null), [p, h] = Y("below"), [g, b] = Y(!1), v = j(!1), N = j(null), y = j(-1), E = j(null);
  q(() => {
    v.current = o;
  }, [o]);
  const x = H(() => {
    r(!1), a(""), l([]), u(0), y.current = -1;
  }, []), w = H((D) => {
    const A = y.current;
    if (A < 0) return;
    const { state: R } = e, L = R.selection.from;
    try {
      const _ = R.tr.delete(A, L), O = R.schema.marks.wikiLink;
      if (O) {
        const U = O.create({ pageName: D }), I = R.schema.text(D, [U]);
        _.insert(A, I);
        const P = A + D.length;
        _.setSelection(nt.create(_.doc, P)), _.removeStoredMark(O);
      } else
        _.insertText(`[[${D}]]`, A);
      e.view.dispatch(_), e.view.focus();
    } catch (_) {
      console.warn("WikiLinkAutocomplete: Error inserting link", _);
    }
    x();
  }, [e, x]);
  q(() => {
    if (!e) return;
    const D = () => {
      if (v.current) return;
      const { state: A } = e, { selection: R } = A, { $from: L } = R;
      if (L.parentOffset < 2 || !L.parent.textBetween(0, L.parentOffset, void 0, "￼").endsWith("[[")) return;
      y.current = L.pos - 2;
      const O = Xa(e);
      O && (f(O), r(!0), a(""), l([]), u(0));
    };
    return e.on("update", D), () => {
      e.off("update", D);
    };
  }, [e]), q(() => {
    if (!e || !o) return;
    const D = e.view.dom, A = (R) => {
      if (v.current) {
        if (R.key === "ArrowDown") {
          R.preventDefault();
          const L = i.length + (s.trim() ? 1 : 0) - 1;
          u((_) => Math.min(_ + 1, L));
          return;
        }
        if (R.key === "ArrowUp") {
          R.preventDefault(), u((L) => Math.max(L - 1, 0));
          return;
        }
        if (R.key === "Enter" || R.key === "Tab") {
          R.preventDefault(), R.stopPropagation(), c < i.length ? w(i[c].title) : s.trim() && n ? (n(s.trim()), x()) : s.trim() && w(s.trim());
          return;
        }
        if (R.key === "Escape") {
          R.preventDefault(), x();
          return;
        }
        R.key === "]" && setTimeout(() => {
          const { state: L } = e, { $from: _ } = L.selection;
          _.parent.textBetween(0, _.parentOffset, void 0, "￼").endsWith("]]") && x();
        }, 0);
      }
    };
    return D.addEventListener("keydown", A, !0), () => {
      D.removeEventListener("keydown", A, !0);
    };
  }, [e, o, i, c, s, w, x, n]), q(() => {
    if (!e || !o) return;
    const D = () => {
      const A = y.current;
      if (A < 0) {
        x();
        return;
      }
      const { state: R } = e, L = R.selection.from;
      if (L <= A) {
        x();
        return;
      }
      try {
        const _ = R.doc.textBetween(A + 2, L, void 0, "￼");
        if (_.includes(`
`) || _.includes("]]")) {
          x();
          return;
        }
        a(_), u(0);
        const O = Xa(e);
        O && f(O);
      } catch {
        x();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, o, x]), q(() => {
    if (o) {
      if (E.current && clearTimeout(E.current), !s.trim()) {
        b(!0), E.current = setTimeout(async () => {
          try {
            const D = await t("");
            l(D);
          } catch {
            l([]);
          }
          b(!1);
        }, 100);
        return;
      }
      return b(!0), E.current = setTimeout(async () => {
        try {
          const D = await t(s.trim());
          l(D);
        } catch {
          l([]);
        }
        b(!1);
      }, 150), () => {
        E.current && clearTimeout(E.current);
      };
    }
  }, [o, s, t]), q(() => {
    if (!o) return;
    const D = (A) => {
      N.current && !N.current.contains(A.target) && x();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [o, x]), q(() => {
    if (!o || !N.current) return;
    const D = N.current.querySelector(".wikilink-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [o, c]);
  const M = i.length + (s.trim() ? 1 : 0), k = Math.min(
    Math.max(M, 1) * Jw + e1,
    t1
  );
  if (sr(() => {
    if (!o || !d) return;
    const { top: D, bottom: A, left: R } = d, L = window.innerHeight, _ = window.innerWidth, O = L - A - Ho, U = D - Ho;
    let I;
    if (O >= k ? I = "below" : U >= k ? I = "above" : I = O >= U ? "below" : "above", h(I), N.current) {
      const P = Math.max(
        Ho,
        Math.min(R, _ - Qw - Ho)
      ), W = I === "below" ? A + 4 : D - k - 4;
      N.current.style.top = `${W}px`, N.current.style.left = `${P}px`;
    }
  }, [o, d, k, M]), !o) return null;
  const C = s.trim() && !i.some((D) => D.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ m(Nt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: N,
      className: `wikilink-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: [
        g && i.length === 0 && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 366,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 365,
          columnNumber: 9
        }, this),
        i.map((D, A) => /* @__PURE__ */ m(
          "div",
          {
            className: `wikilink-item ${A === c ? "is-selected" : ""}`,
            onMouseDown: (R) => {
              R.preventDefault(), w(D.title);
            },
            onMouseEnter: () => u(A),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Ys, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 380,
                columnNumber: 13
              }, this) }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 379,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: D.title }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 382,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-type", children: D.type }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 383,
                columnNumber: 11
              }, this)
            ]
          },
          D.id,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 370,
            columnNumber: 9
          },
          this
        )),
        C && /* @__PURE__ */ m(
          "div",
          {
            className: `wikilink-item wikilink-create ${i.length === c ? "is-selected" : ""}`,
            onMouseDown: (D) => {
              D.preventDefault(), n ? (n(s.trim()), x()) : w(s.trim());
            },
            onMouseEnter: () => u(i.length),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(zs, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 401,
                columnNumber: 13
              }, this) }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 400,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: [
                "Create “",
                s.trim(),
                "”"
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 403,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 387,
            columnNumber: 9
          },
          this
        ),
        !g && i.length === 0 && !s.trim() && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 408,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 407,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
      lineNumber: 355,
      columnNumber: 5
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/WikiLinkAutocomplete.tsx",
    lineNumber: 354,
    columnNumber: 5
  }, this);
}
function o1({
  src: e,
  alt: t,
  position: n,
  onSave: o,
  onDelete: r,
  onClose: s
}) {
  const [a, i] = Y(e), [l, c] = Y(t), u = j(null), d = j(null);
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
  }, [a, l, s]);
  const f = () => {
    a.trim() && o(a.trim(), l.trim());
  }, h = (() => {
    let y = n.x - 160, E = n.y + 10;
    return y + 320 > window.innerWidth - 16 && (y = window.innerWidth - 320 - 16), y < 16 && (y = 16), E + 280 > window.innerHeight - 16 && (E = n.y - 280 - 10), E < 16 && (E = 16), { left: y, top: E };
  })(), g = /* @__PURE__ */ m(
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
        /* @__PURE__ */ m("div", { className: "image-edit-popover-header", children: [
          /* @__PURE__ */ m("span", { className: "image-edit-popover-title", children: "Edit Image" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 140,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: s,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(ht, { className: "w-4 h-4" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 146,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 141,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 139,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ m("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ m("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(Os, { className: "w-3.5 h-3.5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 155,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { children: "Image URL" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 156,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
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
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 158,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 153,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ m("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(ir, { className: "w-3.5 h-3.5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 171,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { children: "Alt Text" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 172,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 170,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                type: "text",
                value: l,
                onChange: (b) => c(b.target.value),
                placeholder: "Describe the image...",
                className: "image-edit-popover-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 174,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 169,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
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
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 191,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
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
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
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
                    fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
                    lineNumber: 205,
                    columnNumber: 13
                  }, this),
                  "Save"
                ]
              },
              void 0,
              !0,
              {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 200,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 193,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 185,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
      lineNumber: 129,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { children: g }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageEditPopover.tsx",
    lineNumber: 213,
    columnNumber: 10
  }, this);
}
function r1({ containerRef: e, enabled: t = !0 }) {
  const [n, o] = Y(!1), [r, s] = Y(0), a = H((u) => {
    u.preventDefault(), u.stopPropagation(), u.dataTransfer?.types.includes("Files") && (s((d) => d + 1), o(!0));
  }, []), i = H((u) => {
    u.preventDefault(), u.stopPropagation(), s((d) => {
      const f = d - 1;
      return f === 0 && o(!1), f;
    });
  }, []), l = H((u) => {
    u.preventDefault(), u.stopPropagation();
  }, []), c = H((u) => {
    u.preventDefault(), u.stopPropagation(), o(!1), s(0);
  }, []);
  return q(() => {
    if (!t || !e.current) return;
    const u = e.current;
    return u.addEventListener("dragenter", a), u.addEventListener("dragleave", i), u.addEventListener("dragover", l), u.addEventListener("drop", c), () => {
      u.removeEventListener("dragenter", a), u.removeEventListener("dragleave", i), u.removeEventListener("dragover", l), u.removeEventListener("drop", c);
    };
  }, [t, e, a, i, l, c]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ m("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(mm, { className: "w-12 h-12" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 84,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ m("span", { className: "image-drop-zone-title", children: "Drop image here" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageDropZone.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageDropZone.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 86,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageDropZone.tsx",
    lineNumber: 82,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/ImageDropZone.tsx",
    lineNumber: 81,
    columnNumber: 5
  }, this) : null;
}
const s1 = {
  SpellCheck: pm,
  RefreshCw: fm,
  Minimize2: pl,
  Maximize2: fl,
  FileText: Ys,
  MessageSquare: hl,
  Sparkles: ar
};
function i1({ actions: e, scope: t, onAction: n, onClose: o, position: r }) {
  const [s, a] = Y(""), [i, l] = Y(!1), c = j(null), u = j(null), d = e.filter((b) => b.scope === t || b.scope === "both");
  q(() => {
    const b = (N) => {
      c.current && !c.current.contains(N.target) && o();
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
  const p = H(() => {
    const v = d.length * 40 + (i ? 56 : 0) + 16, N = window.innerWidth, y = window.innerHeight;
    let E = r.top, x = r.left;
    return x + 260 > N - 8 && (x = N - 260 - 8), x < 8 && (x = 8), E + v > y - 8 && (E = r.top - v - 8), E < 8 && (E = 8), { top: E, left: x };
  }, [r, d.length, i])(), h = () => {
    s.trim() && (n("custom", s.trim()), a(""), l(!1));
  }, g = /* @__PURE__ */ m(
    "div",
    {
      ref: c,
      className: "ai-dropdown-menu",
      style: {
        position: "fixed",
        top: p.top,
        left: p.left
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
              /* @__PURE__ */ m(hl, { size: 14, className: "text-muted-foreground shrink-0" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
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
                    b.key === "Enter" && (b.preventDefault(), h()), b.stopPropagation();
                  },
                  onFocus: () => l(!0),
                  className: `
                flex-1 bg-transparent text-sm text-foreground
                placeholder:text-muted-foreground
                outline-none min-w-0
              `
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
                  lineNumber: 143,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 141,
              columnNumber: 11
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 140,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ m("div", { className: "h-px bg-border mx-2 my-0.5" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 167,
              columnNumber: 9
            }, this),
            d.filter((b) => !b.showCustomPrompt).map((b) => {
              const v = b.icon ? s1[b.icon] : ar;
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
                      fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
                      lineNumber: 187,
                      columnNumber: 35
                    }, this),
                    /* @__PURE__ */ m("span", { children: b.label }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
                      lineNumber: 188,
                      columnNumber: 17
                    }, this)
                  ]
                },
                b.id,
                !0,
                {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
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
          fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
          lineNumber: 131,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
      lineNumber: 122,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { onMouseDown: (b) => b.preventDefault(), children: g }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIDropdownMenu.tsx",
    lineNumber: 197,
    columnNumber: 5
  }, this);
}
function a1({
  state: e,
  position: t,
  onReplace: n,
  onInsert: o,
  onRetry: r,
  onDiscard: s
}) {
  const a = j(null), i = j(null), [l, c] = Y(!1), [u, d] = Y(0);
  q(() => {
    if (a.current) {
      const x = new ResizeObserver((w) => {
        for (const M of w)
          d(M.contentRect.height);
      });
      return x.observe(a.current), () => x.disconnect();
    }
  }, []), q(() => {
    i.current && e.status === "streaming" && (i.current.scrollTop = i.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), q(() => {
    const x = (w) => {
      w.key === "Escape" && s();
    };
    return document.addEventListener("keydown", x), () => document.removeEventListener("keydown", x);
  }, [s]);
  const f = zt(() => {
    const k = window.innerWidth, C = window.innerHeight;
    let S = t.selectionCenterX - 380 / 2;
    S + 380 > k - 8 && (S = k - 380 - 8), S < 8 && (S = 8);
    const D = C - t.selectionBottom - 8, A = t.selectionTop - 8, R = u || 200;
    let L, _ = !1;
    return D >= R || D >= A ? L = t.selectionBottom + 8 : (L = t.selectionTop - 8 - R, _ = !0), L < 8 && (L = 8), L + R > C - 8 && (L = C - R - 8), { top: L, left: S, placedAbove: _ };
  }, [t, u]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", h = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", g = e.status === "streaming", b = e.status === "complete", v = e.status === "error", N = H(() => {
    navigator.clipboard.writeText(p), c(!0), setTimeout(() => c(!1), 1500);
  }, [p]);
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
                g && /* @__PURE__ */ m(ml, { size: 12, className: "animate-spin" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 173,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ m("span", { className: "font-medium", children: v ? "Error" : h }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 174,
                  columnNumber: 13
                }, this),
                g && /* @__PURE__ */ m("span", { className: "opacity-60", children: "Generating…" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 177,
                  columnNumber: 29
                }, this)
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 172,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (x) => {
                    x.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ m(ht, { size: 14, className: "text-muted-foreground" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 184,
                    columnNumber: 13
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 179,
                  columnNumber: 11
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
              lineNumber: 171,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ m(
              "div",
              {
                ref: i,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: v ? /* @__PURE__ */ m("div", { className: "text-destructive", children: e.message }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 194,
                  columnNumber: 13
                }, this) : /* @__PURE__ */ m("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  g && /* @__PURE__ */ m("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 201,
                    columnNumber: 17
                  }, this)
                ] }, void 0, !0, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 198,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
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
                      icon: is,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 213,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ m(
                    on,
                    {
                      icon: zs,
                      label: "Insert",
                      onClick: o
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 219,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ m(
                    on,
                    {
                      icon: l ? yn : Nn,
                      label: l ? "Copied" : "Copy",
                      onClick: N
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 224,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 212,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ m(
                  on,
                  {
                    icon: Us,
                    label: "Retry",
                    onClick: r
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 231,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ m("div", { className: "flex-1" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 236,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ m(
                  on,
                  {
                    icon: ht,
                    label: "Discard",
                    onClick: s
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 237,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 210,
                columnNumber: 13
              }, this),
              g && /* @__PURE__ */ m(Ce, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 246,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ m(
                  on,
                  {
                    icon: ht,
                    label: "Stop",
                    onClick: s
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 247,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 245,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
              lineNumber: 208,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 162,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
      lineNumber: 153,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { onMouseDown: (x) => x.preventDefault(), children: E }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
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
          fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 291,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("span", { children: t }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 292,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/ai/AIResultPopover.tsx",
      lineNumber: 280,
      columnNumber: 5
    },
    this
  );
}
function l1({
  editor: e,
  isMobile: t,
  disabledFeatures: n,
  containerRef: o,
  editable: r,
  showFloatingToolbar: s,
  isLinkPopoverOpen: a,
  aiEnabled: i,
  onAISetupRequired: l,
  onAISparklesClick: c,
  aiDropdown: u,
  aiActions: d,
  onAIActionSelect: f,
  onAIDropdownClose: p,
  aiState: h,
  aiPopoverPosition: g,
  onAIReplace: b,
  onAIInsert: v,
  onAIRetry: N,
  onAIDiscard: y,
  onLinkPopoverClose: E,
  onEditLink: x,
  onWikiLinkSearch: w,
  imageEditState: M,
  onImageSave: k,
  onImageDelete: C,
  onImageEditClose: S
}) {
  return /* @__PURE__ */ m(Ce, { children: [
    !n.images && !n.dragAndDrop && /* @__PURE__ */ m(r1, { containerRef: o, enabled: r }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 112,
      columnNumber: 9
    }, this),
    !t && s && /* @__PURE__ */ m(
      Uw,
      {
        editor: e,
        suppressWhenLinkPopoverOpen: a,
        aiEnabled: i || !!l,
        onAISparklesClick: (D) => c(D)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 117,
        columnNumber: 9
      },
      this
    ),
    u && d && /* @__PURE__ */ m(
      i1,
      {
        actions: d,
        scope: u.scope,
        position: u.position,
        onAction: f,
        onClose: p
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 127,
        columnNumber: 9
      },
      this
    ),
    h.status !== "idle" && /* @__PURE__ */ m(
      a1,
      {
        state: h,
        position: g,
        onReplace: b,
        onInsert: v,
        onRetry: N,
        onDiscard: y
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 138,
        columnNumber: 9
      },
      this
    ),
    !n.slashCommands && /* @__PURE__ */ m(Zw, { editor: e, disabledFeatures: n }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 150,
      columnNumber: 9
    }, this),
    !n.wikiLinks && w && /* @__PURE__ */ m(n1, { editor: e, onSearch: w }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 155,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m(
      Yw,
      {
        editor: e,
        isOpen: a,
        onClose: E
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 159,
        columnNumber: 7
      },
      this
    ),
    !t && /* @__PURE__ */ m(jw, { editor: e, onEditLink: x }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 167,
      columnNumber: 9
    }, this),
    !n.images && M?.isOpen && /* @__PURE__ */ m(
      o1,
      {
        src: M.src,
        alt: M.alt,
        position: M.position,
        onSave: k,
        onDelete: C,
        onClose: S
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 172,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/WYSIWYGOverlays.tsx",
    lineNumber: 109,
    columnNumber: 5
  }, this);
}
function c1({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function u1(e, t) {
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
function d1(e) {
  const [t, n] = Pd(u1, { status: "idle" }), o = j(null), r = H(async (i, l, c, u, d) => {
    if (e) {
      n({
        type: "start-streaming",
        action: i,
        actionLabel: l,
        inputText: c,
        selectionRange: u
      });
      try {
        const f = e(i, c, d);
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
  }, [e]), s = H(() => {
    o.current?.(), n({ type: "reset" });
  }, []), a = H(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: r, abort: s, reset: a };
}
const Gu = "paragon-editor-toc-width", m1 = 280, qu = 200, Xu = 500;
function Za() {
  try {
    const e = localStorage.getItem(Gu);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= qu && t <= Xu)
        return t;
    }
  } catch {
  }
  return m1;
}
function f1(e) {
  try {
    localStorage.setItem(Gu, String(e));
  } catch {
  }
}
function p1(e, t, n) {
  const o = [];
  return e.state.doc.descendants((s, a) => {
    if (s.type.name === "heading") {
      const i = s.attrs.level;
      if (i >= t && i <= n) {
        const l = s.textContent;
        l.trim() && o.push({ id: `toc-heading-${a}`, text: l.trim(), level: i, pos: a });
      }
    }
  }), o;
}
function h1(e) {
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
function Qa(e, t) {
  try {
    const n = e.state.doc.resolve(t), o = e.view.nodeDOM(n.before(n.depth + 1));
    if (o instanceof HTMLElement) return o;
    const r = e.view.nodeDOM(t);
    if (r instanceof HTMLElement) return r;
  } catch {
  }
  return null;
}
const Ja = vn(function({
  editor: t,
  visible: n = !0,
  onVisibilityChange: o,
  title: r = "",
  minLevel: s = 1,
  maxLevel: a = 4,
  showLevelIndicators: i = !1,
  highlightActive: l = !0,
  treeView: c = !1,
  className: u = "",
  width: d,
  position: f = "right",
  scrollOffset: p = 20,
  onItemClick: h,
  renderItem: g,
  showToggleButton: b = !0,
  scrollContainerRef: v
}) {
  const [N, y] = Y([]), [E, x] = Y(null), [w, M] = Y(n), [k, C] = Y(/* @__PURE__ */ new Set()), [S, D] = Y(() => {
    if (d) {
      const $ = parseInt(d, 10);
      return isNaN($) ? Za() : $;
    }
    return Za();
  }), A = j(null), R = j(null), L = j(!1), _ = j(0), O = j(0);
  q(() => {
    M(n);
  }, [n]);
  const U = H(($) => {
    $.preventDefault(), $.stopPropagation(), L.current = !0, _.current = $.clientX, O.current = S, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [S]);
  q(() => {
    const $ = (Z) => {
      if (!L.current) return;
      const ce = f === "right" ? _.current - Z.clientX : Z.clientX - _.current, ue = Math.min(Xu, Math.max(qu, O.current + ce));
      D(ue);
    }, z = () => {
      L.current && (L.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", D((Z) => (f1(Z), Z)));
    };
    return document.addEventListener("mousemove", $), document.addEventListener("mouseup", z), () => {
      document.removeEventListener("mousemove", $), document.removeEventListener("mouseup", z);
    };
  }, [f]);
  const I = H(() => {
    if (!t || t.isDestroyed) return;
    const $ = p1(t, s, a);
    y($), E && !$.find((z) => z.id === E) && x(null);
  }, [t, s, a, E]);
  q(() => {
    if (!t) return;
    const $ = () => {
      R.current && clearTimeout(R.current), R.current = setTimeout(() => I(), 300);
    };
    return I(), t.on("update", $), t.on("create", $), () => {
      t.off("update", $), t.off("create", $), R.current && clearTimeout(R.current);
    };
  }, [t, I]), q(() => {
    if (!t || !l || !w || N.length === 0) return;
    const $ = v?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!$) return;
    const z = () => {
      const ue = $.getBoundingClientRect();
      let ve = null;
      for (let Ee = N.length - 1; Ee >= 0; Ee--) {
        const Fe = N[Ee], yt = Qa(t, Fe.pos);
        if (yt && yt.getBoundingClientRect().top - ue.top <= p + 10) {
          ve = Fe.id;
          break;
        }
      }
      !ve && N.length > 0 && (ve = N[0].id), x(ve);
    };
    let Z;
    const ce = () => {
      cancelAnimationFrame(Z), Z = requestAnimationFrame(z);
    };
    return $.addEventListener("scroll", ce, { passive: !0 }), z(), () => {
      $.removeEventListener("scroll", ce), cancelAnimationFrame(Z);
    };
  }, [t, N, l, w, p, v]);
  const P = H(($) => {
    if (!t || t.isDestroyed) return;
    const z = Qa(t, $.pos);
    if (z) {
      const Z = v?.current || t.view.dom.closest(".editor-content-wrapper");
      if (Z) {
        const ce = Z.getBoundingClientRect(), ve = z.getBoundingClientRect().top - ce.top + Z.scrollTop;
        Z.scrollTo({ top: ve - p, behavior: "smooth" });
      } else
        z.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection($.pos + 1);
    } catch {
    }
    x($.id), h?.($);
  }, [t, p, h, v]), W = H(() => {
    const $ = !w;
    M($), o?.($);
  }, [w, o]), K = H(($) => {
    C((z) => {
      const Z = new Set(z);
      return Z.has($) ? Z.delete($) : Z.add($), Z;
    });
  }, []), V = H(($, z, Z = 0) => {
    if (g)
      return g($, z, () => P($));
    const ce = ($.level - s) * 14, ue = c && $.children && $.children.length > 0, ve = k.has($.id);
    return /* @__PURE__ */ m(
      "div",
      {
        className: `toc-item ${z ? "toc-item-active" : ""} toc-level-${$.level}`,
        style: { paddingLeft: `${ce + 10}px` },
        children: /* @__PURE__ */ m(
          "button",
          {
            className: "toc-item-button",
            onClick: () => P($),
            title: $.text,
            children: [
              ue && /* @__PURE__ */ m(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (Ee) => {
                    Ee.stopPropagation(), K($.id);
                  },
                  children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: ve ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 340,
                    columnNumber: 21
                  }, this) : /* @__PURE__ */ m("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 341,
                    columnNumber: 21
                  }, this) }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 338,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
                  lineNumber: 331,
                  columnNumber: 13
                },
                this
              ),
              i && /* @__PURE__ */ m("span", { className: "toc-level-indicator", children: [
                "H",
                $.level
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 347,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "toc-item-text", children: $.text }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 349,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 325,
            columnNumber: 9
          },
          this
        )
      },
      $.id,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 320,
        columnNumber: 7
      },
      this
    );
  }, [g, P, c, s, i, k, K]), G = H(($, z = 0) => $.map((Z) => {
    const ce = E === Z.id, ue = k.has(Z.id), ve = Z.children && Z.children.length > 0;
    return /* @__PURE__ */ m("div", { children: [
      V(Z, ce, z),
      ve && !ue && /* @__PURE__ */ m("div", { className: "toc-children", children: G(Z.children, z + 1) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 364,
        columnNumber: 13
      }, this)
    ] }, Z.id, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
      lineNumber: 361,
      columnNumber: 9
    }, this);
  }), [E, k, V]), Q = H(() => N.map(($) => {
    const z = E === $.id;
    return V($, z);
  }), [N, E, V]);
  if (!t) return null;
  const B = c ? h1(N) : [];
  return /* @__PURE__ */ m(Ce, { children: [
    b && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: W,
        title: w ? "Hide Table of Contents" : "Show Table of Contents",
        children: w ? /* @__PURE__ */ m(hm, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 393,
          columnNumber: 24
        }, this) : /* @__PURE__ */ m(gm, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 393,
          columnNumber: 56
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 388,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m(
      "div",
      {
        ref: A,
        className: `toc-sidebar ${w ? "toc-visible" : "toc-hidden"} toc-${f} ${u}`,
        style: { width: w ? `${S}px` : "0px" },
        children: [
          w && /* @__PURE__ */ m(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: U
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 405,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m("div", { className: "toc-inner", children: [
            r && /* @__PURE__ */ m("div", { className: "toc-header", children: /* @__PURE__ */ m("span", { className: "toc-title", children: r }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 415,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 414,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m("div", { className: "toc-content toc-content-with-toggle", children: N.length === 0 ? /* @__PURE__ */ m("div", { className: "toc-empty", children: [
              /* @__PURE__ */ m("p", { children: "No headings yet" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 423,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ m("p", { className: "toc-empty-hint", children: "Add headings to see the outline." }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 424,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 422,
              columnNumber: 15
            }, this) : /* @__PURE__ */ m("div", { className: "toc-list", children: c ? G(B) : Q() }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 427,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 420,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 411,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 398,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/TableOfContents.tsx",
    lineNumber: 385,
    columnNumber: 5
  }, this);
}), g1 = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, dk = Id(function({
  content: t = "",
  onChange: n,
  onHTMLChange: o,
  onMarkdownChange: r,
  placeholder: s = 'Start writing... Use "/" for commands',
  editable: a = !0,
  autofocus: i = !1,
  className: l = "",
  showToolbar: c = !0,
  showWordCount: u = !0,
  theme: d,
  colorTheme: f = "colorful",
  autoSave: p = !0,
  autoSaveKey: h = "paragon-editor-content",
  autoSaveDelay: g = 1e3,
  showRecoveryBanner: b = !0,
  showFloatingToolbar: v = !0,
  maxImageSize: N = 5 * 1024 * 1024,
  onImageUploadStart: y,
  onImageUploadComplete: E,
  onImageUploadError: x,
  onImageUpload: w,
  resolveImageSrc: M,
  showModeToggle: k = !0,
  // New props
  initialMode: C = "wysiwyg",
  onModeChange: S,
  onReady: D,
  onFocus: A,
  onBlur: R,
  onSelectionChange: L,
  onDestroy: _,
  onSave: O,
  onRecover: U,
  onWikiLinkClick: I,
  validateWikiLink: P,
  onWikiLinkSearch: W,
  onLinkClick: K,
  findReplaceOpen: V,
  onFindReplaceChange: G,
  renderToolbar: Q,
  renderFooter: B,
  disabledFeatures: $ = {},
  minHeight: z = "200px",
  maxHeight: Z,
  spellCheck: ce = !0,
  headingLevels: ue = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: ve = [1, 2, 3],
  // TOC props
  showTableOfContents: Ee = !1,
  tocVisible: Fe = !0,
  onTocVisibilityChange: yt,
  tocTitle: Mn = "",
  tocMinLevel: Dn = 1,
  tocMaxLevel: ro = 4,
  tocShowLevelIndicators: so = !1,
  tocHighlightActive: io = !0,
  tocTreeView: ao = !1,
  tocWidth: lo = "240px",
  tocPosition: Rt = "right",
  tocScrollOffset: Kt = 20,
  onTocItemClick: Gt,
  renderTocItem: co,
  tocShowToggleButton: uo = !0,
  // Raw markdown editor
  autoClosePairs: Cr = !0,
  // Performance profiler
  showPerformanceProfiler: Er = !1,
  onPerformanceProfilerClose: Tr,
  // Auto reorder checklist
  autoReorderChecklist: Sr = !1,
  // Expand selection
  progressiveSelectAll: Mr = !1,
  // Auto-detection toggles
  enableTagAutoDetect: mo = !1,
  enableHexColorHighlight: Dr = !1,
  enableCollapsibleHeadings: Ar = !1,
  // Performance mode
  performanceMode: An = "auto",
  // Error boundary
  onEditorError: fo,
  // AI writing assistant
  aiActions: xt,
  onAIAction: oe,
  onAISetupRequired: fe
}, ne) {
  const [me] = Y(() => g1()), [Te, de] = Y(C), [po, Pn] = Y(""), qt = j(C), wt = j(""), at = j(null), [Ju, yi] = Y(0), ho = !!(xt && xt.length > 0 && oe), { state: ze, executeAction: go, abort: ed, reset: kt } = d1(oe), [td, Pr] = Y(null), [nd, od] = Y({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), rd = j(oe);
  rd.current = oe;
  const xi = j(fe);
  xi.current = fe;
  const [sd, id] = Y([]), [ad, ld] = Y(0), cd = H((ie, De) => {
    id(ie), ld(De);
  }, []), wi = j(y), ki = j(E), Ci = j(x), Ei = j(w), Ti = j(M), Si = j(I), Mi = j(P), Di = j(W);
  wi.current = y, ki.current = E, Ci.current = x, Ei.current = w, Ti.current = M, Si.current = I, Mi.current = P, Di.current = W;
  const Ai = 2e3, [Ir, ud] = Y(() => An === "lightweight" ? !0 : An === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > Ai : !1), dd = j(0), Pi = j(Ir);
  Pi.current = Ir;
  const [Rr, bo] = Y(null), md = fw({
    placeholder: s,
    isMobile: me,
    maxImageSize: N,
    headingLevels: ue,
    collapsibleHeadingLevels: ve,
    disabledFeatures: $,
    progressiveSelectAll: Mr,
    enableCollapsibleHeadings: Ar,
    enableTagAutoDetect: mo,
    enableHexColorHighlight: Dr,
    isLightweight: Ir,
    setImageEditState: bo,
    callbackRefs: {
      onImageUploadStart: wi,
      onImageUploadComplete: ki,
      onImageUploadError: Ci,
      onImageUpload: Ei,
      resolveImageSrc: Ti,
      onWikiLinkClick: Si,
      validateWikiLink: Mi
    }
  }), { editor: le, turndownService: Ii } = bw({
    extensions: md,
    content: t,
    editable: a,
    autofocus: i,
    spellCheck: ce,
    initialMode: C,
    performanceMode: An,
    lightweightThreshold: Ai,
    onChange: n,
    onHTMLChange: o,
    onMarkdownChange: r,
    onReady: D,
    onDestroy: _,
    onFocus: A,
    onBlur: R,
    onSelectionChange: L,
    onLinkClick: K,
    editorModeRef: qt,
    rawMarkdownRef: wt,
    setRawMarkdown: Pn,
    setIsLightweight: ud,
    lightweightCheckCounterRef: dd,
    isLightweightRef: Pi
  }), [fd, vo] = Y(!1), [pd, hd] = Y(!1), gd = V !== void 0 ? V : pd, Lt = H((ie) => {
    hd(ie), G?.(ie);
  }, [G]), [bd, No] = Y(0), [vd, Nd] = Y(""), Ot = Ev(le, {
    storageKey: h,
    debounceMs: g,
    enabled: p,
    onSave: (ie) => {
      O?.(ie);
    },
    onRecover: (ie) => {
      U?.(ie);
    }
  }), Lr = Pw({
    editor: le,
    turndownService: Ii,
    editorModeRef: qt,
    rawMarkdownRef: wt,
    setEditorMode: de,
    setRawMarkdown: Pn,
    onModeChange: S,
    enableTagAutoDetect: mo,
    disabledFeatures: $
  }), Ri = H((ie) => {
    Pn(ie), wt.current = ie, r?.(ie);
  }, [r]), yo = Rw(le, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: u
  });
  Tv(ne, {
    editor: le,
    turndownService: Ii,
    editorModeRef: qt,
    handleModeSwitch: Lr,
    wordCount: yo,
    autoSaveState: Ot,
    setIsFindReplaceOpen: Lt,
    setFindReplaceFocusTrigger: No
  }), Aw({
    editorModeRef: qt,
    rawMarkdownRef: wt,
    editorMode: Te,
    handleModeSwitch: Lr,
    setIsFindReplaceOpen: Lt,
    setFindReplaceFocusTrigger: No
  });
  const yd = zt(() => ({
    openLinkPopover: () => vo(!0),
    openFindReplace: (ie) => {
      ie && Nd(ie), Lt(!0), No((De) => De + 1);
    },
    openFindReplaceWithReplace: () => {
      Lt(!0);
    }
  }), [Lt]);
  Dw(le, me, yd);
  const Li = H((ie, De) => {
    if (!ho) {
      xi.current?.();
      return;
    }
    if (!le) return;
    let lt = { top: 0, left: 0 };
    if (De) {
      const Ve = De.getBoundingClientRect();
      lt = { top: Ve.bottom + 4, left: Ve.left };
    } else {
      const { from: Ve, to: Xt } = le.state.selection, xo = le.view.coordsAtPos(Ve), wo = le.view.coordsAtPos(Xt);
      lt = { top: wo.bottom + 8, left: (xo.left + wo.left) / 2 };
    }
    Pr({ scope: ie, position: lt });
  }, [ho, le]), xd = H((ie, De) => {
    if (!le || !xt) return;
    const lt = xt.find((Td) => Td.id === ie);
    if (!lt) return;
    const { from: Ve, to: Xt } = le.state.selection, xo = Ve !== Xt ? le.state.doc.textBetween(Ve, Xt, `
`) : "", wo = lt.scope === "document" || !xo ? le.getText() : xo, $i = le.view.coordsAtPos(Ve), Wi = le.view.coordsAtPos(Xt);
    od({
      selectionTop: $i.top,
      selectionBottom: Wi.bottom,
      selectionCenterX: ($i.left + Wi.right) / 2
    }), Pr(null), go(ie, lt.label, wo, { from: Ve, to: Xt }, De);
  }, [le, xt, go]), wd = H(() => {
    if (!le || ze.status !== "complete") return;
    const { selectionRange: ie, result: De } = ze;
    le.chain().focus().setTextSelection(ie).deleteSelection().insertContent(De).run(), kt();
  }, [le, ze, kt]), kd = H(() => {
    if (!le || ze.status !== "complete") return;
    const { selectionRange: ie, result: De } = ze;
    le.chain().focus().setTextSelection(ie.to).insertContent(`
` + De).run(), kt();
  }, [le, ze, kt]), Cd = H(() => {
    if (!(ze.status !== "complete" && ze.status !== "error"))
      if (ze.status === "complete") {
        const { action: ie, actionLabel: De, inputText: lt, selectionRange: Ve } = ze;
        kt(), go(ie, De, lt, Ve);
      } else
        kt();
  }, [ze, kt, go]);
  if (!le)
    return /* @__PURE__ */ m(Hw, { className: l, theme: d }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 832,
      columnNumber: 12
    }, this);
  const Oi = /* @__PURE__ */ m(
    Nv,
    {
      editor: le,
      onOpenLinkPopover: () => vo(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Lt(!0), No((ie) => ie + 1);
      },
      disabledFeatures: $,
      autoReorderChecklist: Sr,
      aiEnabled: ho || !!fe,
      onAISparklesClick: (ie) => Li("document", ie)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 837,
      columnNumber: 5
    },
    this
  ), _i = /* @__PURE__ */ m("div", { className: "editor-footer", children: [
    p && /* @__PURE__ */ m(
      Lw,
      {
        status: Ot.status,
        lastSaved: Ot.lastSaved
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 856,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ m("span", { children: [
      yo.words,
      " words"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 862,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 861,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 854,
    columnNumber: 5
  }, this), Ed = {
    minHeight: z,
    ...Z && { maxHeight: Z, overflowY: "auto" }
  };
  return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${f === "neutral" ? "color-theme-neutral" : ""} ${l}`, "data-theme": d, children: [
    p && b && Ot.hasRecoverableContent && /* @__PURE__ */ m(
      Ow,
      {
        onRecover: () => {
          Ot.recover();
        },
        onDismiss: Ot.dismissRecovery
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 877,
        columnNumber: 9
      },
      this
    ),
    c && /* @__PURE__ */ m("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Q ? Q(le, Oi) : Oi,
      k && /* @__PURE__ */ m(Fw, { editorMode: Te, onModeSwitch: Lr }, void 0, !1, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 890,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 887,
      columnNumber: 9
    }, this),
    !me && /* @__PURE__ */ m(
      yv,
      {
        editor: le,
        isOpen: gd,
        onClose: () => Lt(!1),
        focusTrigger: bd,
        initialSearchQuery: vd,
        editorMode: Te,
        rawMarkdown: po,
        onRawMarkdownChange: Ri,
        onMatchesChange: cd
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 897,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m(kv, { editor: le }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 911,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("div", { className: `editor-main-area ${Ee ? "editor-with-toc" : ""}`, children: [
      Ee && Rt === "left" && /* @__PURE__ */ m(
        Ja,
        {
          editor: le,
          visible: Fe,
          onVisibilityChange: yt,
          title: Mn,
          minLevel: Dn,
          maxLevel: ro,
          showLevelIndicators: so,
          highlightActive: io,
          treeView: ao,
          width: lo,
          position: Rt,
          scrollOffset: Kt,
          onItemClick: Gt,
          renderItem: co,
          showToggleButton: uo,
          scrollContainerRef: at
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 917,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ m(
        Bw,
        {
          resetKey: `${t}-${Ju}`,
          onRetry: () => yi((ie) => ie + 1),
          onClearContent: () => {
            le && le.commands.clearContent(), n?.(""), o?.(""), r?.(""), yi((ie) => ie + 1);
          },
          onError: fo,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: at, style: Ed, children: Te === "wysiwyg" ? /* @__PURE__ */ m(Ce, { children: [
              /* @__PURE__ */ m(Md, { editor: le, className: "editor-content" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 954,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m(
                l1,
                {
                  editor: le,
                  isMobile: me,
                  disabledFeatures: $,
                  containerRef: at,
                  editable: a,
                  showFloatingToolbar: v,
                  isLinkPopoverOpen: fd,
                  aiEnabled: ho,
                  onAISetupRequired: fe,
                  onAISparklesClick: (ie) => Li("selection", ie),
                  aiDropdown: td,
                  aiActions: xt,
                  onAIActionSelect: xd,
                  onAIDropdownClose: () => Pr(null),
                  aiState: ze,
                  aiPopoverPosition: nd,
                  onAIReplace: wd,
                  onAIInsert: kd,
                  onAIRetry: Cd,
                  onAIDiscard: () => {
                    ed(), kt();
                  },
                  onLinkPopoverClose: () => vo(!1),
                  onEditLink: () => vo(!0),
                  onWikiLinkSearch: Di.current,
                  imageEditState: Rr,
                  onImageSave: (ie, De) => {
                    le.chain().focus().setNodeSelection(Rr.pos).updateAttributes("resizableImage", {
                      src: ie,
                      alt: De
                    }).run(), bo(null);
                  },
                  onImageDelete: () => {
                    le.chain().focus().setNodeSelection(Rr.pos).deleteSelection().run(), bo(null);
                  },
                  onImageEditClose: () => bo(null)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 955,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 953,
              columnNumber: 11
            }, this) : /* @__PURE__ */ m(
              _w,
              {
                content: po,
                onChange: Ri,
                placeholder: "Write your markdown here...",
                editable: a,
                autofocus: !0,
                searchMatches: sd,
                currentMatchIndex: ad,
                autoClosePairs: Cr
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 995,
                columnNumber: 11
              },
              this
            ) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 951,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ m(c1, { scrollContainerRef: at }, void 0, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1007,
              columnNumber: 7
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 936,
          columnNumber: 7
        },
        this
      ),
      Ee && Rt === "right" && /* @__PURE__ */ m(
        Ja,
        {
          editor: le,
          visible: Fe,
          onVisibilityChange: yt,
          title: Mn,
          minLevel: Dn,
          maxLevel: ro,
          showLevelIndicators: so,
          highlightActive: io,
          treeView: ao,
          width: lo,
          position: Rt,
          scrollOffset: Kt,
          onItemClick: Gt,
          renderItem: co,
          showToggleButton: uo,
          scrollContainerRef: at
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1011,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 914,
      columnNumber: 7
    }, this),
    u && (B ? B(
      { words: yo.words, characters: yo.characters },
      Ot.status,
      _i
    ) : _i),
    /* @__PURE__ */ m(Ww, { visible: Er, onClose: Tr, editor: le }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1044,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 874,
    columnNumber: 5
  }, this);
}), mk = lr.create({
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
}, b1 = {
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
}, v1 = {
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
}, N1 = {
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
  dark: Zu,
  light: b1,
  sepia: v1,
  nord: N1
};
function y1(e, t) {
  Object.entries(t.variables).forEach(([n, o]) => {
    e.style.setProperty(n, o);
  });
}
function fk(e, t, n, o) {
  const r = Wn[e] || Zu;
  return {
    name: t,
    description: n,
    variables: {
      ...r.variables,
      ...o
    }
  };
}
const Qu = nl(null);
function pk({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [o, r] = Y(t), s = Wn[o] || Wn.dark, a = H((l) => {
    Wn[l] && r(l);
  }, []);
  q(() => {
    n?.current && y1(n.current, s);
  }, [s, n]);
  const i = {
    theme: s,
    themeName: o,
    setTheme: a,
    availableThemes: Object.keys(Wn)
  };
  return /* @__PURE__ */ m(Qu.Provider, { value: i, children: e }, void 0, !1, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/ThemeProvider.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function hk() {
  const e = ol(Qu);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const el = [
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
function gk({ node: e, updateAttributes: t }) {
  const [n, o] = Y(!1), r = e.attrs.language || "plaintext";
  el.find((a) => a.value === r)?.label;
  const s = H(() => {
    const a = e.textContent;
    navigator.clipboard.writeText(a).then(() => {
      o(!0), setTimeout(() => o(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ m(pn, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ m("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ m("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: r,
            onChange: (a) => t({ language: a.target.value }),
            className: "code-block-language-select",
            children: el.map(({ value: a, label: i }) => /* @__PURE__ */ m("option", { value: a, children: i }, a, !1, {
              fileName: "/home/ubuntu/paragon/client/src/components/editor/CodeBlockComponent.tsx",
              lineNumber: 64,
              columnNumber: 15
            }, this))
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 58,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(Dt, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/CodeBlockComponent.tsx",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon/client/src/components/editor/CodeBlockComponent.tsx",
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
            fileName: "/home/ubuntu/paragon/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 76,
            columnNumber: 21
          }, this) : /* @__PURE__ */ m(Nn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 76,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon/client/src/components/editor/CodeBlockComponent.tsx",
          lineNumber: 71,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m(Ms, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 83,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon/client/src/components/editor/CodeBlockComponent.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
export {
  Lw as AutoSaveIndicator,
  mk as Callout,
  Ix as CalloutInputRule,
  gk as CodeBlockComponent,
  Sx as CollapsibleHeading,
  Gv as CollapsibleList,
  mx as DatePill,
  pk as EditorThemeProvider,
  Nv as EditorToolbar,
  yv as FindReplace,
  Uw as FloatingToolbar,
  r1 as ImageDropZone,
  mw as ImageUpload,
  dk as MarkdownEditor,
  Ax as MarkdownLinkInputRule,
  Cx as MarkdownPasteSafe,
  zv as MixedBulletList,
  Vv as MixedListItem,
  Uv as MixedOrderedList,
  jv as MixedTaskItem,
  Yv as MixedTaskList,
  Ow as RecoveryBanner,
  eN as ResizableImage,
  Rx as SearchHighlight,
  kv as SelectAllActionBar,
  rw as SelectAllOccurrences,
  Zw as SlashCommands,
  _x as TabIndent,
  Ja as TableOfContents,
  hx as TagPill,
  bx as WikiLinkSafe,
  y1 as applyTheme,
  fk as createCustomTheme,
  Zu as darkTheme,
  Ni as getDateVariant,
  rn as isValidTag,
  b1 as lightTheme,
  qv as loadLanguageIfNeeded,
  be as lowlight,
  N1 as nordTheme,
  Fn as normalizeTag,
  Wt as parseDateFromMarkdown,
  v1 as sepiaTheme,
  Wn as themes,
  Ev as useAutoSave,
  hk as useEditorTheme,
  Rw as useWordCount
};
//# sourceMappingURL=paragon.js.map
