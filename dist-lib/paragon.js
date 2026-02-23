import { jsxDEV as m, Fragment as Ce } from "react/jsx-dev-runtime";
import { useEditorState as tl, ReactNodeViewRenderer as or, NodeViewWrapper as hn, NodeViewContent as Mi, useEditor as Td, EditorContent as Sd } from "@tiptap/react";
import * as T from "react";
import X, { useState as Y, useRef as j, useEffect as q, useLayoutEffect as rr, memo as wn, useCallback as H, useImperativeHandle as Md, createContext as nl, useContext as ol, useMemo as Ht, Component as Dd, useReducer as Ad, forwardRef as Pd } from "react";
import { Image as Di, X as gt, Link2 as Ai, Type as ir, Undo as Id, Redo as Rd, Bold as Pi, Italic as Ii, Underline as Ri, Strikethrough as Li, Code as rl, Highlighter as il, Link as Oi, ChevronDown as Mt, List as _i, ListOrdered as $i, CheckSquare as Wi, Quote as Bi, Code2 as sl, IndentIncrease as Ld, IndentDecrease as Od, Table as ii, Minus as al, Info as jo, BookOpen as Hi, PenLine as _d, Library as $d, ListTodo as Fi, Columns as Bs, Trash2 as an, Rows as Hs, ToggleLeft as Fs, ArrowUpDown as Wd, Sparkles as sr, Copy as Nn, Search as Bd, ChevronUp as Hd, MousePointerClick as Fd, CaseSensitive as zd, WholeWord as Ud, Regex as Yd, Replace as si, ReplaceAll as jd, Plus as zi, Check as yn, MessageSquareText as ll, StickyNote as cl, ChevronRight as ul, ChevronLeftIcon as Vd, ChevronRightIcon as Kd, ChevronDownIcon as Gd, Calendar as dl, Hash as zs, Cloud as qd, Loader2 as ml, CloudOff as Xd, AlertCircle as Zd, RotateCcw as Ui, Activity as Qd, Maximize2 as fl, Minimize2 as pl, AlertTriangle as Jd, CheckCircle2 as em, Eye as tm, FileText as Yi, FileCode as nm, ExternalLink as om, Pencil as rm, Unlink as im, Heading1 as sm, Heading2 as am, Heading3 as lm, Heading4 as cm, Heading5 as um, ImagePlus as dm, MessageSquare as hl, RefreshCw as mm, SpellCheck as fm, PanelRightClose as pm, PanelRightOpen as hm } from "lucide-react";
import { jsx as F, Fragment as gm, jsxs as bm } from "react/jsx-runtime";
import * as gl from "react-dom";
import vm, { createPortal as wm } from "react-dom";
import { TextSelection as nt, Plugin as Pe, PluginKey as Ie, AllSelection as Nm } from "@tiptap/pm/state";
import ym from "@tiptap/starter-kit";
import km from "@tiptap/extension-placeholder";
import xm from "@tiptap/extension-text-align";
import Cm from "@tiptap/extension-highlight";
import Em from "@tiptap/extension-link";
import { Table as Tm } from "@tiptap/extension-table";
import Sm from "@tiptap/extension-table-row";
import Mm from "@tiptap/extension-table-cell";
import Dm from "@tiptap/extension-table-header";
import { DecorationSet as _e, Decoration as Ye } from "@tiptap/pm/view";
import { Extension as Ze, Node as ar, mergeAttributes as kn, InputRule as Oe, Mark as bl } from "@tiptap/core";
import Am from "@tiptap/extension-bullet-list";
import Pm from "@tiptap/extension-ordered-list";
import Im from "@tiptap/extension-list-item";
import Rm from "@tiptap/extension-task-list";
import Lm from "@tiptap/extension-task-item";
import { findWrapping as Us, canJoin as Om } from "@tiptap/pm/transform";
import _m from "@tiptap/extension-underline";
import $m from "@tiptap/extension-subscript";
import Wm from "@tiptap/extension-superscript";
import Bm from "@tiptap/extension-typography";
import Hm from "@tiptap/extension-code-block-lowlight";
import { createLowlight as Fm } from "lowlight";
import ji from "highlight.js/lib/languages/javascript";
import Vi from "highlight.js/lib/languages/typescript";
import vl from "highlight.js/lib/languages/python";
import Ki from "highlight.js/lib/languages/xml";
import zm from "highlight.js/lib/languages/css";
import Um from "highlight.js/lib/languages/json";
import lr from "highlight.js/lib/languages/bash";
import Ym from "@tiptap/extension-image";
import { createRoot as jm } from "react-dom/client";
import { Fragment as Vm } from "@tiptap/pm/model";
import { liftListItem as Ys, sinkListItem as js } from "@tiptap/pm/schema-list";
import { undo as Km, redo as Gm } from "@tiptap/pm/history";
import qm from "@tiptap/extension-horizontal-rule";
function wl({ isOpen: e, onClose: t, onInsert: n, position: o }) {
  const [r, i] = Y(""), [a, s] = Y(""), [l, c] = Y(""), [u, d] = Y(!1), f = j(null), p = j(null);
  q(() => {
    e && (i(""), s(""), c(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), q(() => {
    if (!e) return;
    const w = (y) => {
      p.current && !p.current.contains(y.target) && t();
    }, N = (y) => {
      y.key === "Escape" && t();
    }, E = setTimeout(() => {
      document.addEventListener("mousedown", w);
    }, 100);
    return document.addEventListener("keydown", N), () => {
      clearTimeout(E), document.removeEventListener("mousedown", w), document.removeEventListener("keydown", N);
    };
  }, [e, t]);
  const h = (w) => {
    if (!w.trim())
      return c("Please enter an image URL"), !1;
    try {
      const N = new URL(w);
      if (!["http:", "https:", "data:"].includes(N.protocol))
        return c("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return c("Please enter a valid URL"), !1;
    }
    return c(""), !0;
  }, g = async () => {
    if (!h(r)) return;
    d(!0);
    const w = new window.Image();
    w.onload = () => {
      d(!1), n(r.trim(), a.trim()), t();
    }, w.onerror = () => {
      d(!1), n(r.trim(), a.trim()), t();
    }, setTimeout(() => {
      u && (d(!1), n(r.trim(), a.trim()), t());
    }, 3e3), w.src = r.trim();
  }, b = (w) => {
    w.key === "Enter" && !w.shiftKey && (w.preventDefault(), g());
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
            /* @__PURE__ */ m(Di, { size: 16, className: "text-primary" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 148,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m("span", { className: "font-medium text-sm", children: "Insert Image from URL" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 149,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 147,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(gt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 156,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 151,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
          lineNumber: 146,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ m("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ m("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(Ai, { size: 12 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 165,
                columnNumber: 13
              }, this),
              "Image URL"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 164,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                ref: f,
                type: "url",
                value: r,
                onChange: (w) => {
                  i(w.target.value), l && c("");
                },
                onKeyDown: b,
                placeholder: "https://example.com/image.jpg",
                className: `image-url-dialog-input ${l ? "error" : ""}`
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 168,
                columnNumber: 11
              },
              this
            ),
            l && /* @__PURE__ */ m("span", { className: "image-url-dialog-error", children: l }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 181,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 163,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ m("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(ir, { size: 12 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 188,
                columnNumber: 13
              }, this),
              "Alt Text (optional)"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 187,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                type: "text",
                value: a,
                onChange: (w) => s(w.target.value),
                onKeyDown: b,
                placeholder: "Describe the image",
                className: "image-url-dialog-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 191,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
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
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
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
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 209,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 202,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
          lineNumber: 161,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageURLDialog.tsx",
      lineNumber: 136,
      columnNumber: 5
    },
    this
  );
}
function ie(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Vs(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function cr(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const i = Vs(r, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          typeof i == "function" ? i() : Vs(e[r], null);
        }
      };
  };
}
function Ae(...e) {
  return T.useCallback(cr(...e), e);
}
function xn(e, t = []) {
  let n = [];
  function o(i, a) {
    const s = T.createContext(a), l = n.length;
    n = [...n, a];
    const c = (d) => {
      const { scope: f, children: p, ...h } = d, g = f?.[e]?.[l] || s, b = T.useMemo(() => h, Object.values(h));
      return /* @__PURE__ */ F(g.Provider, { value: b, children: p });
    };
    c.displayName = i + "Provider";
    function u(d, f) {
      const p = f?.[e]?.[l] || s, h = T.useContext(p);
      if (h) return h;
      if (a !== void 0) return a;
      throw new Error(`\`${d}\` must be used within \`${i}\``);
    }
    return [c, u];
  }
  const r = () => {
    const i = n.map((a) => T.createContext(a));
    return function(s) {
      const l = s?.[e] || i;
      return T.useMemo(
        () => ({ [`__scope${e}`]: { ...s, [e]: l } }),
        [s, l]
      );
    };
  };
  return r.scopeName = e, [o, Xm(r, ...t)];
}
function Xm(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(i) {
      const a = o.reduce((s, { useScope: l, scopeName: c }) => {
        const d = l(i)[`__scope${c}`];
        return { ...s, ...d };
      }, {});
      return T.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Dt = globalThis?.document ? T.useLayoutEffect : () => {
}, Zm = T[" useInsertionEffect ".trim().toString()] || Dt;
function Gi({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, i, a] = Qm({
    defaultProp: t,
    onChange: n
  }), s = e !== void 0, l = s ? e : r;
  {
    const u = T.useRef(e !== void 0);
    T.useEffect(() => {
      const d = u.current;
      d !== s && console.warn(
        `${o} is changing from ${d ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = s;
    }, [s, o]);
  }
  const c = T.useCallback(
    (u) => {
      if (s) {
        const d = Jm(u) ? u(e) : u;
        d !== e && a.current?.(d);
      } else
        i(u);
    },
    [s, e, i, a]
  );
  return [l, c];
}
function Qm({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = T.useState(e), r = T.useRef(n), i = T.useRef(t);
  return Zm(() => {
    i.current = t;
  }, [t]), T.useEffect(() => {
    r.current !== n && (i.current?.(n), r.current = n);
  }, [n, r]), [n, o, i];
}
function Jm(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function jn(e) {
  const t = /* @__PURE__ */ tf(e), n = T.forwardRef((o, r) => {
    const { children: i, ...a } = o, s = T.Children.toArray(i), l = s.find(of);
    if (l) {
      const c = l.props.children, u = s.map((d) => d === l ? T.Children.count(c) > 1 ? T.Children.only(null) : T.isValidElement(c) ? c.props.children : null : d);
      return /* @__PURE__ */ F(t, { ...a, ref: r, children: T.isValidElement(c) ? T.cloneElement(c, void 0, u) : null });
    }
    return /* @__PURE__ */ F(t, { ...a, ref: r, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
var ef = /* @__PURE__ */ jn("Slot");
// @__NO_SIDE_EFFECTS__
function tf(e) {
  const t = T.forwardRef((n, o) => {
    const { children: r, ...i } = n;
    if (T.isValidElement(r)) {
      const a = sf(r), s = rf(i, r.props);
      return r.type !== T.Fragment && (s.ref = o ? cr(o, a) : a), T.cloneElement(r, s);
    }
    return T.Children.count(r) > 1 ? T.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Nl = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function nf(e) {
  const t = ({ children: n }) => /* @__PURE__ */ F(gm, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Nl, t;
}
function of(e) {
  return T.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Nl;
}
function rf(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...s) => {
      const l = i(...s);
      return r(...s), l;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function sf(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var af = [
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
], Se = af.reduce((e, t) => {
  const n = /* @__PURE__ */ jn(`Primitive.${t}`), o = T.forwardRef((r, i) => {
    const { asChild: a, ...s } = r, l = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ F(l, { ...s, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function yl(e, t) {
  e && gl.flushSync(() => e.dispatchEvent(t));
}
function kl(e) {
  const t = e + "CollectionProvider", [n, o] = xn(t), [r, i] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (g) => {
    const { scope: b, children: v } = g, w = X.useRef(null), N = X.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ F(r, { scope: b, itemMap: N, collectionRef: w, children: v });
  };
  a.displayName = t;
  const s = e + "CollectionSlot", l = /* @__PURE__ */ jn(s), c = X.forwardRef(
    (g, b) => {
      const { scope: v, children: w } = g, N = i(s, v), E = Ae(b, N.collectionRef);
      return /* @__PURE__ */ F(l, { ref: E, children: w });
    }
  );
  c.displayName = s;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ jn(u), p = X.forwardRef(
    (g, b) => {
      const { scope: v, children: w, ...N } = g, E = X.useRef(null), y = Ae(b, E), k = i(u, v);
      return X.useEffect(() => (k.itemMap.set(E, { ref: E, ...N }), () => void k.itemMap.delete(E))), /* @__PURE__ */ F(f, { [d]: "", ref: y, children: w });
    }
  );
  p.displayName = u;
  function h(g) {
    const b = i(e + "CollectionConsumer", g);
    return X.useCallback(() => {
      const w = b.collectionRef.current;
      if (!w) return [];
      const N = Array.from(w.querySelectorAll(`[${d}]`));
      return Array.from(b.itemMap.values()).sort(
        (k, M) => N.indexOf(k.ref.current) - N.indexOf(M.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: a, Slot: c, ItemSlot: p },
    h,
    o
  ];
}
var lf = T.createContext(void 0);
function xl(e) {
  const t = T.useContext(lf);
  return e || t || "ltr";
}
function bt(e) {
  const t = T.useRef(e);
  return T.useEffect(() => {
    t.current = e;
  }), T.useMemo(() => (...n) => t.current?.(...n), []);
}
function cf(e, t = globalThis?.document) {
  const n = bt(e);
  T.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var uf = "DismissableLayer", ai = "dismissableLayer.update", df = "dismissableLayer.pointerDownOutside", mf = "dismissableLayer.focusOutside", Ks, Cl = T.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), qi = T.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: i,
      onInteractOutside: a,
      onDismiss: s,
      ...l
    } = e, c = T.useContext(Cl), [u, d] = T.useState(null), f = u?.ownerDocument ?? globalThis?.document, [, p] = T.useState({}), h = Ae(t, (M) => d(M)), g = Array.from(c.layers), [b] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), v = g.indexOf(b), w = u ? g.indexOf(u) : -1, N = c.layersWithOutsidePointerEventsDisabled.size > 0, E = w >= v, y = hf((M) => {
      const x = M.target, C = [...c.branches].some((S) => S.contains(x));
      !E || C || (r?.(M), a?.(M), M.defaultPrevented || s?.());
    }, f), k = gf((M) => {
      const x = M.target;
      [...c.branches].some((S) => S.contains(x)) || (i?.(M), a?.(M), M.defaultPrevented || s?.());
    }, f);
    return cf((M) => {
      w === c.layers.size - 1 && (o?.(M), !M.defaultPrevented && s && (M.preventDefault(), s()));
    }, f), T.useEffect(() => {
      if (u)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (Ks = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(u)), c.layers.add(u), Gs(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = Ks);
        };
    }, [u, f, n, c]), T.useEffect(() => () => {
      u && (c.layers.delete(u), c.layersWithOutsidePointerEventsDisabled.delete(u), Gs());
    }, [u, c]), T.useEffect(() => {
      const M = () => p({});
      return document.addEventListener(ai, M), () => document.removeEventListener(ai, M);
    }, []), /* @__PURE__ */ F(
      Se.div,
      {
        ...l,
        ref: h,
        style: {
          pointerEvents: N ? E ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ie(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: ie(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: ie(
          e.onPointerDownCapture,
          y.onPointerDownCapture
        )
      }
    );
  }
);
qi.displayName = uf;
var ff = "DismissableLayerBranch", pf = T.forwardRef((e, t) => {
  const n = T.useContext(Cl), o = T.useRef(null), r = Ae(t, o);
  return T.useEffect(() => {
    const i = o.current;
    if (i)
      return n.branches.add(i), () => {
        n.branches.delete(i);
      };
  }, [n.branches]), /* @__PURE__ */ F(Se.div, { ...e, ref: r });
});
pf.displayName = ff;
function hf(e, t = globalThis?.document) {
  const n = bt(e), o = T.useRef(!1), r = T.useRef(() => {
  });
  return T.useEffect(() => {
    const i = (s) => {
      if (s.target && !o.current) {
        let l = function() {
          El(
            df,
            n,
            c,
            { discrete: !0 }
          );
        };
        const c = { originalEvent: s };
        s.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = l, t.addEventListener("click", r.current, { once: !0 })) : l();
      } else
        t.removeEventListener("click", r.current);
      o.current = !1;
    }, a = window.setTimeout(() => {
      t.addEventListener("pointerdown", i);
    }, 0);
    return () => {
      window.clearTimeout(a), t.removeEventListener("pointerdown", i), t.removeEventListener("click", r.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => o.current = !0
  };
}
function gf(e, t = globalThis?.document) {
  const n = bt(e), o = T.useRef(!1);
  return T.useEffect(() => {
    const r = (i) => {
      i.target && !o.current && El(mf, n, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function Gs() {
  const e = new CustomEvent(ai);
  document.dispatchEvent(e);
}
function El(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? yl(r, i) : r.dispatchEvent(i);
}
var Or = 0;
function bf() {
  T.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? qs()), document.body.insertAdjacentElement("beforeend", e[1] ?? qs()), Or++, () => {
      Or === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Or--;
    };
  }, []);
}
function qs() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var _r = "focusScope.autoFocusOnMount", $r = "focusScope.autoFocusOnUnmount", Xs = { bubbles: !1, cancelable: !0 }, vf = "FocusScope", Tl = T.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: o = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: i,
    ...a
  } = e, [s, l] = T.useState(null), c = bt(r), u = bt(i), d = T.useRef(null), f = Ae(t, (g) => l(g)), p = T.useRef({
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
      let g = function(N) {
        if (p.paused || !s) return;
        const E = N.target;
        s.contains(E) ? d.current = E : Tt(d.current, { select: !0 });
      }, b = function(N) {
        if (p.paused || !s) return;
        const E = N.relatedTarget;
        E !== null && (s.contains(E) || Tt(d.current, { select: !0 }));
      }, v = function(N) {
        if (document.activeElement === document.body)
          for (const y of N)
            y.removedNodes.length > 0 && Tt(s);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", b);
      const w = new MutationObserver(v);
      return s && w.observe(s, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", b), w.disconnect();
      };
    }
  }, [o, s, p.paused]), T.useEffect(() => {
    if (s) {
      Qs.add(p);
      const g = document.activeElement;
      if (!s.contains(g)) {
        const v = new CustomEvent(_r, Xs);
        s.addEventListener(_r, c), s.dispatchEvent(v), v.defaultPrevented || (wf(Cf(Sl(s)), { select: !0 }), document.activeElement === g && Tt(s));
      }
      return () => {
        s.removeEventListener(_r, c), setTimeout(() => {
          const v = new CustomEvent($r, Xs);
          s.addEventListener($r, u), s.dispatchEvent(v), v.defaultPrevented || Tt(g ?? document.body, { select: !0 }), s.removeEventListener($r, u), Qs.remove(p);
        }, 0);
      };
    }
  }, [s, c, u, p]);
  const h = T.useCallback(
    (g) => {
      if (!n && !o || p.paused) return;
      const b = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, v = document.activeElement;
      if (b && v) {
        const w = g.currentTarget, [N, E] = Nf(w);
        N && E ? !g.shiftKey && v === E ? (g.preventDefault(), n && Tt(N, { select: !0 })) : g.shiftKey && v === N && (g.preventDefault(), n && Tt(E, { select: !0 })) : v === w && g.preventDefault();
      }
    },
    [n, o, p.paused]
  );
  return /* @__PURE__ */ F(Se.div, { tabIndex: -1, ...a, ref: f, onKeyDown: h });
});
Tl.displayName = vf;
function wf(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (Tt(o, { select: t }), document.activeElement !== n) return;
}
function Nf(e) {
  const t = Sl(e), n = Zs(t, e), o = Zs(t.reverse(), e);
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
function Zs(e, t) {
  for (const n of e)
    if (!yf(n, { upTo: t })) return n;
}
function yf(e, { upTo: t }) {
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
function Tt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && kf(e) && t && e.select();
  }
}
var Qs = xf();
function xf() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Js(e, t), e.unshift(t);
    },
    remove(t) {
      e = Js(e, t), e[0]?.resume();
    }
  };
}
function Js(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Cf(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Ef = T[" useId ".trim().toString()] || (() => {
}), Tf = 0;
function Vo(e) {
  const [t, n] = T.useState(Ef());
  return Dt(() => {
    n((o) => o ?? String(Tf++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Sf = ["top", "right", "bottom", "left"], At = Math.min, We = Math.max, Ko = Math.round, ko = Math.floor, ot = (e) => ({
  x: e,
  y: e
}), Mf = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Df = {
  start: "end",
  end: "start"
};
function li(e, t, n) {
  return We(e, At(t, n));
}
function vt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function wt(e) {
  return e.split("-")[0];
}
function Cn(e) {
  return e.split("-")[1];
}
function Xi(e) {
  return e === "x" ? "y" : "x";
}
function Zi(e) {
  return e === "y" ? "height" : "width";
}
const Af = /* @__PURE__ */ new Set(["top", "bottom"]);
function et(e) {
  return Af.has(wt(e)) ? "y" : "x";
}
function Qi(e) {
  return Xi(et(e));
}
function Pf(e, t, n) {
  n === void 0 && (n = !1);
  const o = Cn(e), r = Qi(e), i = Zi(r);
  let a = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (a = Go(a)), [a, Go(a)];
}
function If(e) {
  const t = Go(e);
  return [ci(e), t, ci(t)];
}
function ci(e) {
  return e.replace(/start|end/g, (t) => Df[t]);
}
const ea = ["left", "right"], ta = ["right", "left"], Rf = ["top", "bottom"], Lf = ["bottom", "top"];
function Of(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ta : ea : t ? ea : ta;
    case "left":
    case "right":
      return t ? Rf : Lf;
    default:
      return [];
  }
}
function _f(e, t, n, o) {
  const r = Cn(e);
  let i = Of(wt(e), n === "start", o);
  return r && (i = i.map((a) => a + "-" + r), t && (i = i.concat(i.map(ci)))), i;
}
function Go(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Mf[t]);
}
function $f(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ml(e) {
  return typeof e != "number" ? $f(e) : {
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
function na(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const i = et(t), a = Qi(t), s = Zi(a), l = wt(t), c = i === "y", u = o.x + o.width / 2 - r.width / 2, d = o.y + o.height / 2 - r.height / 2, f = o[s] / 2 - r[s] / 2;
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
  switch (Cn(t)) {
    case "start":
      p[a] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      p[a] += f * (n && c ? -1 : 1);
      break;
  }
  return p;
}
const Wf = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: i = [],
    platform: a
  } = n, s = i.filter(Boolean), l = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let c = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: u,
    y: d
  } = na(c, o, l), f = o, p = {}, h = 0;
  for (let g = 0; g < s.length; g++) {
    const {
      name: b,
      fn: v
    } = s[g], {
      x: w,
      y: N,
      data: E,
      reset: y
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
    u = w ?? u, d = N ?? d, p = {
      ...p,
      [b]: {
        ...p[b],
        ...E
      }
    }, y && h <= 50 && (h++, typeof y == "object" && (y.placement && (f = y.placement), y.rects && (c = y.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : y.rects), {
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
async function Vn(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: i,
    rects: a,
    elements: s,
    strategy: l
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: f = !1,
    padding: p = 0
  } = vt(t, e), h = Ml(p), b = s[f ? d === "floating" ? "reference" : "floating" : d], v = qo(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(b))) == null || n ? b : b.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(s.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), w = d === "floating" ? {
    x: o,
    y: r,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, N = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(s.floating)), E = await (i.isElement == null ? void 0 : i.isElement(N)) ? await (i.getScale == null ? void 0 : i.getScale(N)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, y = qo(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: w,
    offsetParent: N,
    strategy: l
  }) : w);
  return {
    top: (v.top - y.top + h.top) / E.y,
    bottom: (y.bottom - v.bottom + h.bottom) / E.y,
    left: (v.left - y.left + h.left) / E.x,
    right: (y.right - v.right + h.right) / E.x
  };
}
const Bf = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: i,
      platform: a,
      elements: s,
      middlewareData: l
    } = t, {
      element: c,
      padding: u = 0
    } = vt(e, t) || {};
    if (c == null)
      return {};
    const d = Ml(u), f = {
      x: n,
      y: o
    }, p = Qi(r), h = Zi(p), g = await a.getDimensions(c), b = p === "y", v = b ? "top" : "left", w = b ? "bottom" : "right", N = b ? "clientHeight" : "clientWidth", E = i.reference[h] + i.reference[p] - f[p] - i.floating[h], y = f[p] - i.reference[p], k = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let M = k ? k[N] : 0;
    (!M || !await (a.isElement == null ? void 0 : a.isElement(k))) && (M = s.floating[N] || i.floating[h]);
    const x = E / 2 - y / 2, C = M / 2 - g[h] / 2 - 1, S = At(d[v], C), D = At(d[w], C), A = S, R = M - g[h] - D, L = M / 2 - g[h] / 2 + x, _ = li(A, L, R), O = !l.arrow && Cn(r) != null && L !== _ && i.reference[h] / 2 - (L < A ? S : D) - g[h] / 2 < 0, U = O ? L < A ? L - A : L - R : 0;
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
}), Hf = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        middlewareData: i,
        rects: a,
        initialPlacement: s,
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
      } = vt(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const v = wt(r), w = et(s), N = wt(s) === s, E = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), y = f || (N || !g ? [Go(s)] : If(s)), k = h !== "none";
      !f && k && y.push(..._f(s, g, h, E));
      const M = [s, ...y], x = await Vn(t, b), C = [];
      let S = ((o = i.flip) == null ? void 0 : o.overflows) || [];
      if (u && C.push(x[v]), d) {
        const L = Pf(r, a, E);
        C.push(x[L[0]], x[L[1]]);
      }
      if (S = [...S, {
        placement: r,
        overflows: C
      }], !C.every((L) => L <= 0)) {
        var D, A;
        const L = (((D = i.flip) == null ? void 0 : D.index) || 0) + 1, _ = M[L];
        if (_ && (!(d === "alignment" ? w !== et(_) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        S.every((I) => et(I.placement) === w ? I.overflows[0] > 0 : !0)))
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
                if (k) {
                  const P = et(I.placement);
                  return P === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  P === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((P) => P > 0).reduce((P, B) => P + B, 0)]).sort((I, P) => I[1] - P[1])[0]) == null ? void 0 : R[0];
              U && (O = U);
              break;
            }
            case "initialPlacement":
              O = s;
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
  return Sf.some((t) => e[t] >= 0);
}
const Ff = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: o = "referenceHidden",
        ...r
      } = vt(e, t);
      switch (o) {
        case "referenceHidden": {
          const i = await Vn(t, {
            ...r,
            elementContext: "reference"
          }), a = oa(i, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: ra(a)
            }
          };
        }
        case "escaped": {
          const i = await Vn(t, {
            ...r,
            altBoundary: !0
          }), a = oa(i, n.floating);
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
async function zf(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, i = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), a = wt(n), s = Cn(n), l = et(n) === "y", c = Dl.has(a) ? -1 : 1, u = i && l ? -1 : 1, d = vt(t, e);
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
  return s && typeof h == "number" && (p = s === "end" ? h * -1 : h), l ? {
    x: p * u,
    y: f * c
  } : {
    x: f * c,
    y: p * u
  };
}
const Uf = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: i,
        placement: a,
        middlewareData: s
      } = t, l = await zf(t, e);
      return a === ((n = s.offset) == null ? void 0 : n.placement) && (o = s.arrow) != null && o.alignmentOffset ? {} : {
        x: r + l.x,
        y: i + l.y,
        data: {
          ...l,
          placement: a
        }
      };
    }
  };
}, Yf = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: r
      } = t, {
        mainAxis: i = !0,
        crossAxis: a = !1,
        limiter: s = {
          fn: (b) => {
            let {
              x: v,
              y: w
            } = b;
            return {
              x: v,
              y: w
            };
          }
        },
        ...l
      } = vt(e, t), c = {
        x: n,
        y: o
      }, u = await Vn(t, l), d = et(wt(r)), f = Xi(d);
      let p = c[f], h = c[d];
      if (i) {
        const b = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", w = p + u[b], N = p - u[v];
        p = li(w, p, N);
      }
      if (a) {
        const b = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", w = h + u[b], N = h - u[v];
        h = li(w, h, N);
      }
      const g = s.fn({
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
            [f]: i,
            [d]: a
          }
        }
      };
    }
  };
}, jf = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: o,
        placement: r,
        rects: i,
        middlewareData: a
      } = t, {
        offset: s = 0,
        mainAxis: l = !0,
        crossAxis: c = !0
      } = vt(e, t), u = {
        x: n,
        y: o
      }, d = et(r), f = Xi(d);
      let p = u[f], h = u[d];
      const g = vt(s, t), b = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const N = f === "y" ? "height" : "width", E = i.reference[f] - i.floating[N] + b.mainAxis, y = i.reference[f] + i.reference[N] - b.mainAxis;
        p < E ? p = E : p > y && (p = y);
      }
      if (c) {
        var v, w;
        const N = f === "y" ? "width" : "height", E = Dl.has(wt(r)), y = i.reference[d] - i.floating[N] + (E && ((v = a.offset) == null ? void 0 : v[d]) || 0) + (E ? 0 : b.crossAxis), k = i.reference[d] + i.reference[N] + (E ? 0 : ((w = a.offset) == null ? void 0 : w[d]) || 0) - (E ? b.crossAxis : 0);
        h < y ? h = y : h > k && (h = k);
      }
      return {
        [f]: p,
        [d]: h
      };
    }
  };
}, Vf = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        rects: i,
        platform: a,
        elements: s
      } = t, {
        apply: l = () => {
        },
        ...c
      } = vt(e, t), u = await Vn(t, c), d = wt(r), f = Cn(r), p = et(r) === "y", {
        width: h,
        height: g
      } = i.floating;
      let b, v;
      d === "top" || d === "bottom" ? (b = d, v = f === (await (a.isRTL == null ? void 0 : a.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (v = d, b = f === "end" ? "top" : "bottom");
      const w = g - u.top - u.bottom, N = h - u.left - u.right, E = At(g - u[b], w), y = At(h - u[v], N), k = !t.middlewareData.shift;
      let M = E, x = y;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (x = N), (o = t.middlewareData.shift) != null && o.enabled.y && (M = w), k && !f) {
        const S = We(u.left, 0), D = We(u.right, 0), A = We(u.top, 0), R = We(u.bottom, 0);
        p ? x = h - 2 * (S !== 0 || D !== 0 ? S + D : We(u.left, u.right)) : M = g - 2 * (A !== 0 || R !== 0 ? A + R : We(u.top, u.bottom));
      }
      await l({
        ...t,
        availableWidth: x,
        availableHeight: M
      });
      const C = await a.getDimensions(s.floating);
      return h !== C.width || g !== C.height ? {
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
function En(e) {
  return Al(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Be(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function it(e) {
  var t;
  return (t = (Al(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Al(e) {
  return ur() ? e instanceof Node || e instanceof Be(e).Node : !1;
}
function qe(e) {
  return ur() ? e instanceof Element || e instanceof Be(e).Element : !1;
}
function rt(e) {
  return ur() ? e instanceof HTMLElement || e instanceof Be(e).HTMLElement : !1;
}
function ia(e) {
  return !ur() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Be(e).ShadowRoot;
}
const Kf = /* @__PURE__ */ new Set(["inline", "contents"]);
function Jn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = Xe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !Kf.has(r);
}
const Gf = /* @__PURE__ */ new Set(["table", "td", "th"]);
function qf(e) {
  return Gf.has(En(e));
}
const Xf = [":popover-open", ":modal"];
function dr(e) {
  return Xf.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Zf = ["transform", "translate", "scale", "rotate", "perspective"], Qf = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Jf = ["paint", "layout", "strict", "content"];
function Ji(e) {
  const t = es(), n = qe(e) ? Xe(e) : e;
  return Zf.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Qf.some((o) => (n.willChange || "").includes(o)) || Jf.some((o) => (n.contain || "").includes(o));
}
function ep(e) {
  let t = Pt(e);
  for (; rt(t) && !gn(t); ) {
    if (Ji(t))
      return t;
    if (dr(t))
      return null;
    t = Pt(t);
  }
  return null;
}
function es() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const tp = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function gn(e) {
  return tp.has(En(e));
}
function Xe(e) {
  return Be(e).getComputedStyle(e);
}
function mr(e) {
  return qe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Pt(e) {
  if (En(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ia(e) && e.host || // Fallback.
    it(e)
  );
  return ia(t) ? t.host : t;
}
function Pl(e) {
  const t = Pt(e);
  return gn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : rt(t) && Jn(t) ? t : Pl(t);
}
function Kn(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = Pl(e), i = r === ((o = e.ownerDocument) == null ? void 0 : o.body), a = Be(r);
  if (i) {
    const s = ui(a);
    return t.concat(a, a.visualViewport || [], Jn(r) ? r : [], s && n ? Kn(s) : []);
  }
  return t.concat(r, Kn(r, [], n));
}
function ui(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Il(e) {
  const t = Xe(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = rt(e), i = r ? e.offsetWidth : n, a = r ? e.offsetHeight : o, s = Ko(n) !== i || Ko(o) !== a;
  return s && (n = i, o = a), {
    width: n,
    height: o,
    $: s
  };
}
function ts(e) {
  return qe(e) ? e : e.contextElement;
}
function ln(e) {
  const t = ts(e);
  if (!rt(t))
    return ot(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: i
  } = Il(t);
  let a = (i ? Ko(n.width) : n.width) / o, s = (i ? Ko(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: a,
    y: s
  };
}
const np = /* @__PURE__ */ ot(0);
function Rl(e) {
  const t = Be(e);
  return !es() || !t.visualViewport ? np : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function op(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Be(e) ? !1 : t;
}
function Ft(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), i = ts(e);
  let a = ot(1);
  t && (o ? qe(o) && (a = ln(o)) : a = ln(e));
  const s = op(i, n, o) ? Rl(i) : ot(0);
  let l = (r.left + s.x) / a.x, c = (r.top + s.y) / a.y, u = r.width / a.x, d = r.height / a.y;
  if (i) {
    const f = Be(i), p = o && qe(o) ? Be(o) : o;
    let h = f, g = ui(h);
    for (; g && o && p !== h; ) {
      const b = ln(g), v = g.getBoundingClientRect(), w = Xe(g), N = v.left + (g.clientLeft + parseFloat(w.paddingLeft)) * b.x, E = v.top + (g.clientTop + parseFloat(w.paddingTop)) * b.y;
      l *= b.x, c *= b.y, u *= b.x, d *= b.y, l += N, c += E, h = Be(g), g = ui(h);
    }
  }
  return qo({
    width: u,
    height: d,
    x: l,
    y: c
  });
}
function fr(e, t) {
  const n = mr(e).scrollLeft;
  return t ? t.left + n : Ft(it(e)).left + n;
}
function Ll(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - fr(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function rp(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const i = r === "fixed", a = it(o), s = t ? dr(t.floating) : !1;
  if (o === a || s && i)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = ot(1);
  const u = ot(0), d = rt(o);
  if ((d || !d && !i) && ((En(o) !== "body" || Jn(a)) && (l = mr(o)), rt(o))) {
    const p = Ft(o);
    c = ln(o), u.x = p.x + o.clientLeft, u.y = p.y + o.clientTop;
  }
  const f = a && !d && !i ? Ll(a, l) : ot(0);
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
function sp(e) {
  const t = it(e), n = mr(e), o = e.ownerDocument.body, r = We(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), i = We(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + fr(e);
  const s = -n.scrollTop;
  return Xe(o).direction === "rtl" && (a += We(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: i,
    x: a,
    y: s
  };
}
const sa = 25;
function ap(e, t) {
  const n = Be(e), o = it(e), r = n.visualViewport;
  let i = o.clientWidth, a = o.clientHeight, s = 0, l = 0;
  if (r) {
    i = r.width, a = r.height;
    const u = es();
    (!u || u && t === "fixed") && (s = r.offsetLeft, l = r.offsetTop);
  }
  const c = fr(o);
  if (c <= 0) {
    const u = o.ownerDocument, d = u.body, f = getComputedStyle(d), p = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, h = Math.abs(o.clientWidth - d.clientWidth - p);
    h <= sa && (i -= h);
  } else c <= sa && (i += c);
  return {
    width: i,
    height: a,
    x: s,
    y: l
  };
}
const lp = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function cp(e, t) {
  const n = Ft(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, i = rt(e) ? ln(e) : ot(1), a = e.clientWidth * i.x, s = e.clientHeight * i.y, l = r * i.x, c = o * i.y;
  return {
    width: a,
    height: s,
    x: l,
    y: c
  };
}
function aa(e, t, n) {
  let o;
  if (t === "viewport")
    o = ap(e, n);
  else if (t === "document")
    o = sp(it(e));
  else if (qe(t))
    o = cp(t, n);
  else {
    const r = Rl(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return qo(o);
}
function Ol(e, t) {
  const n = Pt(e);
  return n === t || !qe(n) || gn(n) ? !1 : Xe(n).position === "fixed" || Ol(n, t);
}
function up(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = Kn(e, [], !1).filter((s) => qe(s) && En(s) !== "body"), r = null;
  const i = Xe(e).position === "fixed";
  let a = i ? Pt(e) : e;
  for (; qe(a) && !gn(a); ) {
    const s = Xe(a), l = Ji(a);
    !l && s.position === "fixed" && (r = null), (i ? !l && !r : !l && s.position === "static" && !!r && lp.has(r.position) || Jn(a) && !l && Ol(e, a)) ? o = o.filter((u) => u !== a) : r = s, a = Pt(a);
  }
  return t.set(e, o), o;
}
function dp(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const a = [...n === "clippingAncestors" ? dr(t) ? [] : up(t, this._c) : [].concat(n), o], s = a[0], l = a.reduce((c, u) => {
    const d = aa(t, u, r);
    return c.top = We(d.top, c.top), c.right = At(d.right, c.right), c.bottom = At(d.bottom, c.bottom), c.left = We(d.left, c.left), c;
  }, aa(t, s, r));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function mp(e) {
  const {
    width: t,
    height: n
  } = Il(e);
  return {
    width: t,
    height: n
  };
}
function fp(e, t, n) {
  const o = rt(t), r = it(t), i = n === "fixed", a = Ft(e, !0, i, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = ot(0);
  function c() {
    l.x = fr(r);
  }
  if (o || !o && !i)
    if ((En(t) !== "body" || Jn(r)) && (s = mr(t)), o) {
      const p = Ft(t, !0, i, t);
      l.x = p.x + t.clientLeft, l.y = p.y + t.clientTop;
    } else r && c();
  i && !o && r && c();
  const u = r && !o && !i ? Ll(r, s) : ot(0), d = a.left + s.scrollLeft - l.x - u.x, f = a.top + s.scrollTop - l.y - u.y;
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
  return it(e) === n && (n = n.ownerDocument.body), n;
}
function _l(e, t) {
  const n = Be(e);
  if (dr(e))
    return n;
  if (!rt(e)) {
    let r = Pt(e);
    for (; r && !gn(r); ) {
      if (qe(r) && !Wr(r))
        return r;
      r = Pt(r);
    }
    return n;
  }
  let o = la(e, t);
  for (; o && qf(o) && Wr(o); )
    o = la(o, t);
  return o && gn(o) && Wr(o) && !Ji(o) ? n : o || ep(e) || n;
}
const pp = async function(e) {
  const t = this.getOffsetParent || _l, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: fp(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function hp(e) {
  return Xe(e).direction === "rtl";
}
const gp = {
  convertOffsetParentRelativeRectToViewportRelativeRect: rp,
  getDocumentElement: it,
  getClippingRect: dp,
  getOffsetParent: _l,
  getElementRects: pp,
  getClientRects: ip,
  getDimensions: mp,
  getScale: ln,
  isElement: qe,
  isRTL: hp
};
function $l(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function bp(e, t) {
  let n = null, o;
  const r = it(e);
  function i() {
    var s;
    clearTimeout(o), (s = n) == null || s.disconnect(), n = null;
  }
  function a(s, l) {
    s === void 0 && (s = !1), l === void 0 && (l = 1), i();
    const c = e.getBoundingClientRect(), {
      left: u,
      top: d,
      width: f,
      height: p
    } = c;
    if (s || t(), !f || !p)
      return;
    const h = ko(d), g = ko(r.clientWidth - (u + f)), b = ko(r.clientHeight - (d + p)), v = ko(u), N = {
      rootMargin: -h + "px " + -g + "px " + -b + "px " + -v + "px",
      threshold: We(0, At(1, l)) || 1
    };
    let E = !0;
    function y(k) {
      const M = k[0].intersectionRatio;
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
      n = new IntersectionObserver(y, {
        ...N,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(y, N);
    }
    n.observe(e);
  }
  return a(!0), i;
}
function vp(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: i = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = o, c = ts(e), u = r || i ? [...c ? Kn(c) : [], ...Kn(t)] : [];
  u.forEach((v) => {
    r && v.addEventListener("scroll", n, {
      passive: !0
    }), i && v.addEventListener("resize", n);
  });
  const d = c && s ? bp(c, n) : null;
  let f = -1, p = null;
  a && (p = new ResizeObserver((v) => {
    let [w] = v;
    w && w.target === c && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var N;
      (N = p) == null || N.observe(t);
    })), n();
  }), c && !l && p.observe(c), p.observe(t));
  let h, g = l ? Ft(e) : null;
  l && b();
  function b() {
    const v = Ft(e);
    g && !$l(g, v) && n(), g = v, h = requestAnimationFrame(b);
  }
  return n(), () => {
    var v;
    u.forEach((w) => {
      r && w.removeEventListener("scroll", n), i && w.removeEventListener("resize", n);
    }), d?.(), (v = p) == null || v.disconnect(), p = null, l && cancelAnimationFrame(h);
  };
}
const wp = Uf, Np = Yf, yp = Hf, kp = Vf, xp = Ff, ca = Bf, Cp = jf, Ep = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: gp,
    ...n
  }, i = {
    ...r.platform,
    _c: o
  };
  return Wf(e, t, {
    ...r,
    platform: i
  });
};
var Tp = typeof document < "u", Sp = function() {
}, Ho = Tp ? rr : Sp;
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
      const i = r[o];
      if (!(i === "_owner" && e.$$typeof) && !Xo(e[i], t[i]))
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
  return Ho(() => {
    t.current = e;
  }), t;
}
function Mp(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: o = [],
    platform: r,
    elements: {
      reference: i,
      floating: a
    } = {},
    transform: s = !0,
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
  Xo(f, o) || p(o);
  const [h, g] = T.useState(null), [b, v] = T.useState(null), w = T.useCallback((I) => {
    I !== k.current && (k.current = I, g(I));
  }, []), N = T.useCallback((I) => {
    I !== M.current && (M.current = I, v(I));
  }, []), E = i || h, y = a || b, k = T.useRef(null), M = T.useRef(null), x = T.useRef(u), C = l != null, S = Br(l), D = Br(r), A = Br(c), R = T.useCallback(() => {
    if (!k.current || !M.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    D.current && (I.platform = D.current), Ep(k.current, M.current, I).then((P) => {
      const B = {
        ...P,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: A.current !== !1
      };
      L.current && !Xo(x.current, B) && (x.current = B, gl.flushSync(() => {
        d(B);
      }));
    });
  }, [f, t, n, D, A]);
  Ho(() => {
    c === !1 && x.current.isPositioned && (x.current.isPositioned = !1, d((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [c]);
  const L = T.useRef(!1);
  Ho(() => (L.current = !0, () => {
    L.current = !1;
  }), []), Ho(() => {
    if (E && (k.current = E), y && (M.current = y), E && y) {
      if (S.current)
        return S.current(E, y, R);
      R();
    }
  }, [E, y, R, S, C]);
  const _ = T.useMemo(() => ({
    reference: k,
    floating: M,
    setReference: w,
    setFloating: N
  }), [w, N]), O = T.useMemo(() => ({
    reference: E,
    floating: y
  }), [E, y]), U = T.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!O.floating)
      return I;
    const P = ua(O.floating, u.x), B = ua(O.floating, u.y);
    return s ? {
      ...I,
      transform: "translate(" + P + "px, " + B + "px)",
      ...Wl(O.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: P,
      top: B
    };
  }, [n, s, O.floating, u.x, u.y]);
  return T.useMemo(() => ({
    ...u,
    update: R,
    refs: _,
    elements: O,
    floatingStyles: U
  }), [u, R, _, O, U]);
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
}, Ap = (e, t) => ({
  ...wp(e),
  options: [e, t]
}), Pp = (e, t) => ({
  ...Np(e),
  options: [e, t]
}), Ip = (e, t) => ({
  ...Cp(e),
  options: [e, t]
}), Rp = (e, t) => ({
  ...yp(e),
  options: [e, t]
}), Lp = (e, t) => ({
  ...kp(e),
  options: [e, t]
}), Op = (e, t) => ({
  ...xp(e),
  options: [e, t]
}), _p = (e, t) => ({
  ...Dp(e),
  options: [e, t]
});
var $p = "Arrow", Bl = T.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...i } = e;
  return /* @__PURE__ */ F(
    Se.svg,
    {
      ...i,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ F("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Bl.displayName = $p;
var Wp = Bl;
function Bp(e) {
  const [t, n] = T.useState(void 0);
  return Dt(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const i = r[0];
        let a, s;
        if ("borderBoxSize" in i) {
          const l = i.borderBoxSize, c = Array.isArray(l) ? l[0] : l;
          a = c.inlineSize, s = c.blockSize;
        } else
          a = e.offsetWidth, s = e.offsetHeight;
        n({ width: a, height: s });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var ns = "Popper", [Hl, pr] = xn(ns), [Hp, Fl] = Hl(ns), zl = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = T.useState(null);
  return /* @__PURE__ */ F(Hp, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
zl.displayName = ns;
var Ul = "PopperAnchor", Yl = T.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, i = Fl(Ul, n), a = T.useRef(null), s = Ae(t, a), l = T.useRef(null);
    return T.useEffect(() => {
      const c = l.current;
      l.current = o?.current || a.current, c !== l.current && i.onAnchorChange(l.current);
    }), o ? null : /* @__PURE__ */ F(Se.div, { ...r, ref: s });
  }
);
Yl.displayName = Ul;
var os = "PopperContent", [Fp, zp] = Hl(os), jl = T.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: i = "center",
      alignOffset: a = 0,
      arrowPadding: s = 0,
      avoidCollisions: l = !0,
      collisionBoundary: c = [],
      collisionPadding: u = 0,
      sticky: d = "partial",
      hideWhenDetached: f = !1,
      updatePositionStrategy: p = "optimized",
      onPlaced: h,
      ...g
    } = e, b = Fl(os, n), [v, w] = T.useState(null), N = Ae(t, (z) => w(z)), [E, y] = T.useState(null), k = Bp(E), M = k?.width ?? 0, x = k?.height ?? 0, C = o + (i !== "center" ? "-" + i : ""), S = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, D = Array.isArray(c) ? c : [c], A = D.length > 0, R = {
      padding: S,
      boundary: D.filter(Yp),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: A
    }, { refs: L, floatingStyles: _, placement: O, isPositioned: U, middlewareData: I } = Mp({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: C,
      whileElementsMounted: (...z) => vp(...z, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        Ap({ mainAxis: r + x, alignmentAxis: a }),
        l && Pp({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Ip() : void 0,
          ...R
        }),
        l && Rp({ ...R }),
        Lp({
          ...R,
          apply: ({ elements: z, rects: Z, availableWidth: ce, availableHeight: de }) => {
            const { width: ve, height: Ee } = Z.reference, Fe = z.floating.style;
            Fe.setProperty("--radix-popper-available-width", `${ce}px`), Fe.setProperty("--radix-popper-available-height", `${de}px`), Fe.setProperty("--radix-popper-anchor-width", `${ve}px`), Fe.setProperty("--radix-popper-anchor-height", `${Ee}px`);
          }
        }),
        E && _p({ element: E, padding: s }),
        jp({ arrowWidth: M, arrowHeight: x }),
        f && Op({ strategy: "referenceHidden", ...R })
      ]
    }), [P, B] = Gl(O), K = bt(h);
    Dt(() => {
      U && K?.();
    }, [U, K]);
    const V = I.arrow?.x, G = I.arrow?.y, Q = I.arrow?.centerOffset !== 0, [W, $] = T.useState();
    return Dt(() => {
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
          zIndex: W,
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
          Fp,
          {
            scope: n,
            placedSide: P,
            onArrowChange: y,
            arrowX: V,
            arrowY: G,
            shouldHideArrow: Q,
            children: /* @__PURE__ */ F(
              Se.div,
              {
                "data-side": P,
                "data-align": B,
                ...g,
                ref: N,
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
jl.displayName = os;
var Vl = "PopperArrow", Up = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Kl = T.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, i = zp(Vl, o), a = Up[i.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ F(
      "span",
      {
        ref: i.onArrowChange,
        style: {
          position: "absolute",
          left: i.arrowX,
          top: i.arrowY,
          [a]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[i.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[i.placedSide],
          visibility: i.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ F(
          Wp,
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
function Yp(e) {
  return e !== null;
}
var jp = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, s = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [c, u] = Gl(n), d = { start: "0%", center: "50%", end: "100%" }[u], f = (r.arrow?.x ?? 0) + s / 2, p = (r.arrow?.y ?? 0) + l / 2;
    let h = "", g = "";
    return c === "bottom" ? (h = a ? d : `${f}px`, g = `${-l}px`) : c === "top" ? (h = a ? d : `${f}px`, g = `${o.floating.height + l}px`) : c === "right" ? (h = `${-l}px`, g = a ? d : `${p}px`) : c === "left" && (h = `${o.floating.width + l}px`, g = a ? d : `${p}px`), { data: { x: h, y: g } };
  }
});
function Gl(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var ql = zl, Xl = Yl, Zl = jl, Ql = Kl, Vp = "Portal", rs = T.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, i] = T.useState(!1);
  Dt(() => i(!0), []);
  const a = n || r && globalThis?.document?.body;
  return a ? vm.createPortal(/* @__PURE__ */ F(Se.div, { ...o, ref: t }), a) : null;
});
rs.displayName = Vp;
function Kp(e, t) {
  return T.useReducer((n, o) => t[n][o] ?? n, e);
}
var zt = (e) => {
  const { present: t, children: n } = e, o = Gp(t), r = typeof n == "function" ? n({ present: o.isPresent }) : T.Children.only(n), i = Ae(o.ref, qp(r));
  return typeof n == "function" || o.isPresent ? T.cloneElement(r, { ref: i }) : null;
};
zt.displayName = "Presence";
function Gp(e) {
  const [t, n] = T.useState(), o = T.useRef(null), r = T.useRef(e), i = T.useRef("none"), a = e ? "mounted" : "unmounted", [s, l] = Kp(a, {
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
    const c = xo(o.current);
    i.current = s === "mounted" ? c : "none";
  }, [s]), Dt(() => {
    const c = o.current, u = r.current;
    if (u !== e) {
      const f = i.current, p = xo(c);
      e ? l("MOUNT") : p === "none" || c?.display === "none" ? l("UNMOUNT") : l(u && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), Dt(() => {
    if (t) {
      let c;
      const u = t.ownerDocument.defaultView ?? window, d = (p) => {
        const g = xo(o.current).includes(CSS.escape(p.animationName));
        if (p.target === t && g && (l("ANIMATION_END"), !r.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, f = (p) => {
        p.target === t && (i.current = xo(o.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        u.clearTimeout(c), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(s),
    ref: T.useCallback((c) => {
      o.current = c ? getComputedStyle(c) : null, n(c);
    }, [])
  };
}
function xo(e) {
  return e?.animationName || "none";
}
function qp(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Hr = "rovingFocusGroup.onEntryFocus", Xp = { bubbles: !1, cancelable: !0 }, eo = "RovingFocusGroup", [di, Jl, Zp] = kl(eo), [Qp, ec] = xn(
  eo,
  [Zp]
), [Jp, eh] = Qp(eo), tc = T.forwardRef(
  (e, t) => /* @__PURE__ */ F(di.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ F(di.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ F(th, { ...e, ref: t }) }) })
);
tc.displayName = eo;
var th = T.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: o,
    loop: r = !1,
    dir: i,
    currentTabStopId: a,
    defaultCurrentTabStopId: s,
    onCurrentTabStopIdChange: l,
    onEntryFocus: c,
    preventScrollOnEntryFocus: u = !1,
    ...d
  } = e, f = T.useRef(null), p = Ae(t, f), h = xl(i), [g, b] = Gi({
    prop: a,
    defaultProp: s ?? null,
    onChange: l,
    caller: eo
  }), [v, w] = T.useState(!1), N = bt(c), E = Jl(n), y = T.useRef(!1), [k, M] = T.useState(0);
  return T.useEffect(() => {
    const x = f.current;
    if (x)
      return x.addEventListener(Hr, N), () => x.removeEventListener(Hr, N);
  }, [N]), /* @__PURE__ */ F(
    Jp,
    {
      scope: n,
      orientation: o,
      dir: h,
      loop: r,
      currentTabStopId: g,
      onItemFocus: T.useCallback(
        (x) => b(x),
        [b]
      ),
      onItemShiftTab: T.useCallback(() => w(!0), []),
      onFocusableItemAdd: T.useCallback(
        () => M((x) => x + 1),
        []
      ),
      onFocusableItemRemove: T.useCallback(
        () => M((x) => x - 1),
        []
      ),
      children: /* @__PURE__ */ F(
        Se.div,
        {
          tabIndex: v || k === 0 ? -1 : 0,
          "data-orientation": o,
          ...d,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: ie(e.onMouseDown, () => {
            y.current = !0;
          }),
          onFocus: ie(e.onFocus, (x) => {
            const C = !y.current;
            if (x.target === x.currentTarget && C && !v) {
              const S = new CustomEvent(Hr, Xp);
              if (x.currentTarget.dispatchEvent(S), !S.defaultPrevented) {
                const D = E().filter((O) => O.focusable), A = D.find((O) => O.active), R = D.find((O) => O.id === g), _ = [A, R, ...D].filter(
                  Boolean
                ).map((O) => O.ref.current);
                rc(_, u);
              }
            }
            y.current = !1;
          }),
          onBlur: ie(e.onBlur, () => w(!1))
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
      tabStopId: i,
      children: a,
      ...s
    } = e, l = Vo(), c = i || l, u = eh(nc, n), d = u.currentTabStopId === c, f = Jl(n), { onFocusableItemAdd: p, onFocusableItemRemove: h, currentTabStopId: g } = u;
    return T.useEffect(() => {
      if (o)
        return p(), () => h();
    }, [o, p, h]), /* @__PURE__ */ F(
      di.ItemSlot,
      {
        scope: n,
        id: c,
        focusable: o,
        active: r,
        children: /* @__PURE__ */ F(
          Se.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": u.orientation,
            ...s,
            ref: t,
            onMouseDown: ie(e.onMouseDown, (b) => {
              o ? u.onItemFocus(c) : b.preventDefault();
            }),
            onFocus: ie(e.onFocus, () => u.onItemFocus(c)),
            onKeyDown: ie(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const v = rh(b, u.orientation, u.dir);
              if (v !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let N = f().filter((E) => E.focusable).map((E) => E.ref.current);
                if (v === "last") N.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && N.reverse();
                  const E = N.indexOf(b.currentTarget);
                  N = u.loop ? ih(N, E + 1) : N.slice(E + 1);
                }
                setTimeout(() => rc(N));
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
var nh = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function oh(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function rh(e, t, n) {
  const o = oh(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return nh[o];
}
function rc(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function ih(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var sh = tc, ah = oc, lh = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Qt = /* @__PURE__ */ new WeakMap(), Co = /* @__PURE__ */ new WeakMap(), Eo = {}, Fr = 0, ic = function(e) {
  return e && (e.host || ic(e.parentNode));
}, ch = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = ic(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, uh = function(e, t, n, o) {
  var r = ch(t, Array.isArray(e) ? e : [e]);
  Eo[n] || (Eo[n] = /* @__PURE__ */ new WeakMap());
  var i = Eo[n], a = [], s = /* @__PURE__ */ new Set(), l = new Set(r), c = function(d) {
    !d || s.has(d) || (s.add(d), c(d.parentNode));
  };
  r.forEach(c);
  var u = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (s.has(f))
        u(f);
      else
        try {
          var p = f.getAttribute(o), h = p !== null && p !== "false", g = (Qt.get(f) || 0) + 1, b = (i.get(f) || 0) + 1;
          Qt.set(f, g), i.set(f, b), a.push(f), g === 1 && h && Co.set(f, !0), b === 1 && f.setAttribute(n, "true"), h || f.setAttribute(o, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return u(t), s.clear(), Fr++, function() {
    a.forEach(function(d) {
      var f = Qt.get(d) - 1, p = i.get(d) - 1;
      Qt.set(d, f), i.set(d, p), f || (Co.has(d) || d.removeAttribute(o), Co.delete(d)), p || d.removeAttribute(n);
    }), Fr--, Fr || (Qt = /* @__PURE__ */ new WeakMap(), Qt = /* @__PURE__ */ new WeakMap(), Co = /* @__PURE__ */ new WeakMap(), Eo = {});
  };
}, dh = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = lh(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), uh(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, Je = function() {
  return Je = Object.assign || function(t) {
    for (var n, o = 1, r = arguments.length; o < r; o++) {
      n = arguments[o];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Je.apply(this, arguments);
};
function sc(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
  return n;
}
function mh(e, t, n) {
  if (n || arguments.length === 2) for (var o = 0, r = t.length, i; o < r; o++)
    (i || !(o in t)) && (i || (i = Array.prototype.slice.call(t, 0, o)), i[o] = t[o]);
  return e.concat(i || Array.prototype.slice.call(t));
}
var Fo = "right-scroll-bar-position", zo = "width-before-scroll-bar", fh = "with-scroll-bars-hidden", ph = "--removed-body-scroll-bar-size";
function zr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function hh(e, t) {
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
var gh = typeof window < "u" ? T.useLayoutEffect : T.useEffect, da = /* @__PURE__ */ new WeakMap();
function bh(e, t) {
  var n = hh(null, function(o) {
    return e.forEach(function(r) {
      return zr(r, o);
    });
  });
  return gh(function() {
    var o = da.get(n);
    if (o) {
      var r = new Set(o), i = new Set(e), a = n.current;
      r.forEach(function(s) {
        i.has(s) || zr(s, null);
      }), i.forEach(function(s) {
        r.has(s) || zr(s, a);
      });
    }
    da.set(n, e);
  }, [e]), n;
}
function vh(e) {
  return e;
}
function wh(e, t) {
  t === void 0 && (t = vh);
  var n = [], o = !1, r = {
    read: function() {
      if (o)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(i) {
      var a = t(i, o);
      return n.push(a), function() {
        n = n.filter(function(s) {
          return s !== a;
        });
      };
    },
    assignSyncMedium: function(i) {
      for (o = !0; n.length; ) {
        var a = n;
        n = [], a.forEach(i);
      }
      n = {
        push: function(s) {
          return i(s);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(i) {
      o = !0;
      var a = [];
      if (n.length) {
        var s = n;
        n = [], s.forEach(i), a = n;
      }
      var l = function() {
        var u = a;
        a = [], u.forEach(i);
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
function Nh(e) {
  e === void 0 && (e = {});
  var t = wh(null);
  return t.options = Je({ async: !0, ssr: !1 }, e), t;
}
var ac = function(e) {
  var t = e.sideCar, n = sc(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return T.createElement(o, Je({}, n));
};
ac.isSideCarExport = !0;
function yh(e, t) {
  return e.useMedium(t), ac;
}
var lc = Nh(), Ur = function() {
}, hr = T.forwardRef(function(e, t) {
  var n = T.useRef(null), o = T.useState({
    onScrollCapture: Ur,
    onWheelCapture: Ur,
    onTouchMoveCapture: Ur
  }), r = o[0], i = o[1], a = e.forwardProps, s = e.children, l = e.className, c = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, p = e.noRelative, h = e.noIsolation, g = e.inert, b = e.allowPinchZoom, v = e.as, w = v === void 0 ? "div" : v, N = e.gapMode, E = sc(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), y = f, k = bh([n, t]), M = Je(Je({}, E), r);
  return T.createElement(
    T.Fragment,
    null,
    u && T.createElement(y, { sideCar: lc, removeScrollBar: c, shards: d, noRelative: p, noIsolation: h, inert: g, setCallbacks: i, allowPinchZoom: !!b, lockRef: n, gapMode: N }),
    a ? T.cloneElement(T.Children.only(s), Je(Je({}, M), { ref: k })) : T.createElement(w, Je({}, M, { className: l, ref: k }), s)
  );
});
hr.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
hr.classNames = {
  fullWidth: zo,
  zeroRight: Fo
};
var kh = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function xh() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = kh();
  return t && e.setAttribute("nonce", t), e;
}
function Ch(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Eh(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Th = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = xh()) && (Ch(t, n), Eh(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Sh = function() {
  var e = Th();
  return function(t, n) {
    T.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, cc = function() {
  var e = Sh(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, Mh = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Yr = function(e) {
  return parseInt(e || "", 10) || 0;
}, Dh = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Yr(n), Yr(o), Yr(r)];
}, Ah = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Mh;
  var t = Dh(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, o - n + t[2] - t[0])
  };
}, Ph = cc(), cn = "data-scroll-locked", Ih = function(e, t, n, o) {
  var r = e.left, i = e.top, a = e.right, s = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(fh, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(s, "px ").concat(o, `;
  }
  body[`).concat(cn, `] {
    overflow: hidden `).concat(o, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(o, ";"),
    n === "margin" && `
    padding-left: `.concat(r, `px;
    padding-top: `).concat(i, `px;
    padding-right: `).concat(a, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(s, "px ").concat(o, `;
    `),
    n === "padding" && "padding-right: ".concat(s, "px ").concat(o, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Fo, ` {
    right: `).concat(s, "px ").concat(o, `;
  }
  
  .`).concat(zo, ` {
    margin-right: `).concat(s, "px ").concat(o, `;
  }
  
  .`).concat(Fo, " .").concat(Fo, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(zo, " .").concat(zo, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(cn, `] {
    `).concat(ph, ": ").concat(s, `px;
  }
`);
}, ma = function() {
  var e = parseInt(document.body.getAttribute(cn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Rh = function() {
  T.useEffect(function() {
    return document.body.setAttribute(cn, (ma() + 1).toString()), function() {
      var e = ma() - 1;
      e <= 0 ? document.body.removeAttribute(cn) : document.body.setAttribute(cn, e.toString());
    };
  }, []);
}, Lh = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  Rh();
  var i = T.useMemo(function() {
    return Ah(r);
  }, [r]);
  return T.createElement(Ph, { styles: Ih(i, !t, r, n ? "" : "!important") });
}, mi = !1;
if (typeof window < "u")
  try {
    var To = Object.defineProperty({}, "passive", {
      get: function() {
        return mi = !0, !0;
      }
    });
    window.addEventListener("test", To, To), window.removeEventListener("test", To, To);
  } catch {
    mi = !1;
  }
var Jt = mi ? { passive: !1 } : !1, Oh = function(e) {
  return e.tagName === "TEXTAREA";
}, uc = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Oh(e) && n[t] === "visible")
  );
}, _h = function(e) {
  return uc(e, "overflowY");
}, $h = function(e) {
  return uc(e, "overflowX");
}, fa = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = dc(e, o);
    if (r) {
      var i = mc(e, o), a = i[1], s = i[2];
      if (a > s)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return !1;
}, Wh = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [
    t,
    n,
    o
  ];
}, Bh = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [
    t,
    n,
    o
  ];
}, dc = function(e, t) {
  return e === "v" ? _h(t) : $h(t);
}, mc = function(e, t) {
  return e === "v" ? Wh(t) : Bh(t);
}, Hh = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Fh = function(e, t, n, o, r) {
  var i = Hh(e, window.getComputedStyle(t).direction), a = i * o, s = n.target, l = t.contains(s), c = !1, u = a > 0, d = 0, f = 0;
  do {
    if (!s)
      break;
    var p = mc(e, s), h = p[0], g = p[1], b = p[2], v = g - b - i * h;
    (h || v) && dc(e, s) && (d += v, f += h);
    var w = s.parentNode;
    s = w && w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? w.host : w;
  } while (
    // portaled content
    !l && s !== document.body || // self content
    l && (t.contains(s) || t === s)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(f) < 1) && (c = !0), c;
}, So = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, pa = function(e) {
  return [e.deltaX, e.deltaY];
}, ha = function(e) {
  return e && "current" in e ? e.current : e;
}, zh = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Uh = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Yh = 0, en = [];
function jh(e) {
  var t = T.useRef([]), n = T.useRef([0, 0]), o = T.useRef(), r = T.useState(Yh++)[0], i = T.useState(cc)[0], a = T.useRef(e);
  T.useEffect(function() {
    a.current = e;
  }, [e]), T.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var g = mh([e.lockRef.current], (e.shards || []).map(ha), !0).filter(Boolean);
      return g.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), g.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var s = T.useCallback(function(g, b) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !a.current.allowPinchZoom;
    var v = So(g), w = n.current, N = "deltaX" in g ? g.deltaX : w[0] - v[0], E = "deltaY" in g ? g.deltaY : w[1] - v[1], y, k = g.target, M = Math.abs(N) > Math.abs(E) ? "h" : "v";
    if ("touches" in g && M === "h" && k.type === "range")
      return !1;
    var x = fa(M, k);
    if (!x)
      return !0;
    if (x ? y = M : (y = M === "v" ? "h" : "v", x = fa(M, k)), !x)
      return !1;
    if (!o.current && "changedTouches" in g && (N || E) && (o.current = y), !y)
      return !0;
    var C = o.current || y;
    return Fh(C, b, g, C === "h" ? N : E);
  }, []), l = T.useCallback(function(g) {
    var b = g;
    if (!(!en.length || en[en.length - 1] !== i)) {
      var v = "deltaY" in b ? pa(b) : So(b), w = t.current.filter(function(y) {
        return y.name === b.type && (y.target === b.target || b.target === y.shadowParent) && zh(y.delta, v);
      })[0];
      if (w && w.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!w) {
        var N = (a.current.shards || []).map(ha).filter(Boolean).filter(function(y) {
          return y.contains(b.target);
        }), E = N.length > 0 ? s(b, N[0]) : !a.current.noIsolation;
        E && b.cancelable && b.preventDefault();
      }
    }
  }, []), c = T.useCallback(function(g, b, v, w) {
    var N = { name: g, delta: b, target: v, should: w, shadowParent: Vh(v) };
    t.current.push(N), setTimeout(function() {
      t.current = t.current.filter(function(E) {
        return E !== N;
      });
    }, 1);
  }, []), u = T.useCallback(function(g) {
    n.current = So(g), o.current = void 0;
  }, []), d = T.useCallback(function(g) {
    c(g.type, pa(g), g.target, s(g, e.lockRef.current));
  }, []), f = T.useCallback(function(g) {
    c(g.type, So(g), g.target, s(g, e.lockRef.current));
  }, []);
  T.useEffect(function() {
    return en.push(i), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, Jt), document.addEventListener("touchmove", l, Jt), document.addEventListener("touchstart", u, Jt), function() {
      en = en.filter(function(g) {
        return g !== i;
      }), document.removeEventListener("wheel", l, Jt), document.removeEventListener("touchmove", l, Jt), document.removeEventListener("touchstart", u, Jt);
    };
  }, []);
  var p = e.removeScrollBar, h = e.inert;
  return T.createElement(
    T.Fragment,
    null,
    h ? T.createElement(i, { styles: Uh(r) }) : null,
    p ? T.createElement(Lh, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Vh(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Kh = yh(lc, jh);
var fc = T.forwardRef(function(e, t) {
  return T.createElement(hr, Je({}, e, { ref: t, sideCar: Kh }));
});
fc.classNames = hr.classNames;
var fi = ["Enter", " "], Gh = ["ArrowDown", "PageUp", "Home"], pc = ["ArrowUp", "PageDown", "End"], qh = [...Gh, ...pc], Xh = {
  ltr: [...fi, "ArrowRight"],
  rtl: [...fi, "ArrowLeft"]
}, Zh = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, to = "Menu", [Gn, Qh, Jh] = kl(to), [Ut, hc] = xn(to, [
  Jh,
  pr,
  ec
]), gr = pr(), gc = ec(), [eg, Yt] = Ut(to), [tg, no] = Ut(to), bc = (e) => {
  const { __scopeMenu: t, open: n = !1, children: o, dir: r, onOpenChange: i, modal: a = !0 } = e, s = gr(t), [l, c] = T.useState(null), u = T.useRef(!1), d = bt(i), f = xl(r);
  return T.useEffect(() => {
    const p = () => {
      u.current = !0, document.addEventListener("pointerdown", h, { capture: !0, once: !0 }), document.addEventListener("pointermove", h, { capture: !0, once: !0 });
    }, h = () => u.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", h, { capture: !0 }), document.removeEventListener("pointermove", h, { capture: !0 });
    };
  }, []), /* @__PURE__ */ F(ql, { ...s, children: /* @__PURE__ */ F(
    eg,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: l,
      onContentChange: c,
      children: /* @__PURE__ */ F(
        tg,
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
bc.displayName = to;
var ng = "MenuAnchor", is = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = gr(n);
    return /* @__PURE__ */ F(Xl, { ...r, ...o, ref: t });
  }
);
is.displayName = ng;
var ss = "MenuPortal", [og, vc] = Ut(ss, {
  forceMount: void 0
}), wc = (e) => {
  const { __scopeMenu: t, forceMount: n, children: o, container: r } = e, i = Yt(ss, t);
  return /* @__PURE__ */ F(og, { scope: t, forceMount: n, children: /* @__PURE__ */ F(zt, { present: n || i.open, children: /* @__PURE__ */ F(rs, { asChild: !0, container: r, children: o }) }) });
};
wc.displayName = ss;
var je = "MenuContent", [rg, as] = Ut(je), Nc = T.forwardRef(
  (e, t) => {
    const n = vc(je, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, i = Yt(je, e.__scopeMenu), a = no(je, e.__scopeMenu);
    return /* @__PURE__ */ F(Gn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ F(zt, { present: o || i.open, children: /* @__PURE__ */ F(Gn.Slot, { scope: e.__scopeMenu, children: a.modal ? /* @__PURE__ */ F(ig, { ...r, ref: t }) : /* @__PURE__ */ F(sg, { ...r, ref: t }) }) }) });
  }
), ig = T.forwardRef(
  (e, t) => {
    const n = Yt(je, e.__scopeMenu), o = T.useRef(null), r = Ae(t, o);
    return T.useEffect(() => {
      const i = o.current;
      if (i) return dh(i);
    }, []), /* @__PURE__ */ F(
      ls,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: ie(
          e.onFocusOutside,
          (i) => i.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), sg = T.forwardRef((e, t) => {
  const n = Yt(je, e.__scopeMenu);
  return /* @__PURE__ */ F(
    ls,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), ag = /* @__PURE__ */ jn("MenuContent.ScrollLock"), ls = T.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: o = !1,
      trapFocus: r,
      onOpenAutoFocus: i,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: s,
      onEntryFocus: l,
      onEscapeKeyDown: c,
      onPointerDownOutside: u,
      onFocusOutside: d,
      onInteractOutside: f,
      onDismiss: p,
      disableOutsideScroll: h,
      ...g
    } = e, b = Yt(je, n), v = no(je, n), w = gr(n), N = gc(n), E = Qh(n), [y, k] = T.useState(null), M = T.useRef(null), x = Ae(t, M, b.onContentChange), C = T.useRef(0), S = T.useRef(""), D = T.useRef(0), A = T.useRef(null), R = T.useRef("right"), L = T.useRef(0), _ = h ? fc : T.Fragment, O = h ? { as: ag, allowPinchZoom: !0 } : void 0, U = (P) => {
      const B = S.current + P, K = E().filter((z) => !z.disabled), V = document.activeElement, G = K.find((z) => z.ref.current === V)?.textValue, Q = K.map((z) => z.textValue), W = wg(Q, B, G), $ = K.find((z) => z.textValue === W)?.ref.current;
      (function z(Z) {
        S.current = Z, window.clearTimeout(C.current), Z !== "" && (C.current = window.setTimeout(() => z(""), 1e3));
      })(B), $ && setTimeout(() => $.focus());
    };
    T.useEffect(() => () => window.clearTimeout(C.current), []), bf();
    const I = T.useCallback((P) => R.current === A.current?.side && yg(P, A.current?.area), []);
    return /* @__PURE__ */ F(
      rg,
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
            I(P) || (M.current?.focus(), k(null));
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
            onMountAutoFocus: ie(i, (P) => {
              P.preventDefault(), M.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: a,
            children: /* @__PURE__ */ F(
              qi,
              {
                asChild: !0,
                disableOutsidePointerEvents: s,
                onEscapeKeyDown: c,
                onPointerDownOutside: u,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: p,
                children: /* @__PURE__ */ F(
                  sh,
                  {
                    asChild: !0,
                    ...N,
                    dir: v.dir,
                    orientation: "vertical",
                    loop: o,
                    currentTabStopId: y,
                    onCurrentTabStopIdChange: k,
                    onEntryFocus: ie(l, (P) => {
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
                        ...w,
                        ...g,
                        ref: x,
                        style: { outline: "none", ...g.style },
                        onKeyDown: ie(g.onKeyDown, (P) => {
                          const K = P.target.closest("[data-radix-menu-content]") === P.currentTarget, V = P.ctrlKey || P.altKey || P.metaKey, G = P.key.length === 1;
                          K && (P.key === "Tab" && P.preventDefault(), !V && G && U(P.key));
                          const Q = M.current;
                          if (P.target !== Q || !qh.includes(P.key)) return;
                          P.preventDefault();
                          const $ = E().filter((z) => !z.disabled).map((z) => z.ref.current);
                          pc.includes(P.key) && $.reverse(), bg($);
                        }),
                        onBlur: ie(e.onBlur, (P) => {
                          P.currentTarget.contains(P.target) || (window.clearTimeout(C.current), S.current = "");
                        }),
                        onPointerMove: ie(
                          e.onPointerMove,
                          qn((P) => {
                            const B = P.target, K = L.current !== P.clientX;
                            if (P.currentTarget.contains(B) && K) {
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
Nc.displayName = je;
var lg = "MenuGroup", cs = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ F(Se.div, { role: "group", ...o, ref: t });
  }
);
cs.displayName = lg;
var cg = "MenuLabel", yc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ F(Se.div, { ...o, ref: t });
  }
);
yc.displayName = cg;
var Zo = "MenuItem", ga = "menu.itemSelect", br = T.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: o, ...r } = e, i = T.useRef(null), a = no(Zo, e.__scopeMenu), s = as(Zo, e.__scopeMenu), l = Ae(t, i), c = T.useRef(!1), u = () => {
      const d = i.current;
      if (!n && d) {
        const f = new CustomEvent(ga, { bubbles: !0, cancelable: !0 });
        d.addEventListener(ga, (p) => o?.(p), { once: !0 }), yl(d, f), f.defaultPrevented ? c.current = !1 : a.onClose();
      }
    };
    return /* @__PURE__ */ F(
      kc,
      {
        ...r,
        ref: l,
        disabled: n,
        onClick: ie(e.onClick, u),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), c.current = !0;
        },
        onPointerUp: ie(e.onPointerUp, (d) => {
          c.current || d.currentTarget?.click();
        }),
        onKeyDown: ie(e.onKeyDown, (d) => {
          const f = s.searchRef.current !== "";
          n || f && d.key === " " || fi.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
br.displayName = Zo;
var kc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: o = !1, textValue: r, ...i } = e, a = as(Zo, n), s = gc(n), l = T.useRef(null), c = Ae(t, l), [u, d] = T.useState(!1), [f, p] = T.useState("");
    return T.useEffect(() => {
      const h = l.current;
      h && p((h.textContent ?? "").trim());
    }, [i.children]), /* @__PURE__ */ F(
      Gn.ItemSlot,
      {
        scope: n,
        disabled: o,
        textValue: r ?? f,
        children: /* @__PURE__ */ F(ah, { asChild: !0, ...s, focusable: !o, children: /* @__PURE__ */ F(
          Se.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": o || void 0,
            "data-disabled": o ? "" : void 0,
            ...i,
            ref: c,
            onPointerMove: ie(
              e.onPointerMove,
              qn((h) => {
                o ? a.onItemLeave(h) : (a.onItemEnter(h), h.defaultPrevented || h.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: ie(
              e.onPointerLeave,
              qn((h) => a.onItemLeave(h))
            ),
            onFocus: ie(e.onFocus, () => d(!0)),
            onBlur: ie(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), ug = "MenuCheckboxItem", xc = T.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: o, ...r } = e;
    return /* @__PURE__ */ F(Mc, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ F(
      br,
      {
        role: "menuitemcheckbox",
        "aria-checked": Qo(n) ? "mixed" : n,
        ...r,
        ref: t,
        "data-state": ds(n),
        onSelect: ie(
          r.onSelect,
          () => o?.(Qo(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
xc.displayName = ug;
var Cc = "MenuRadioGroup", [dg, mg] = Ut(
  Cc,
  { value: void 0, onValueChange: () => {
  } }
), Ec = T.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: o, ...r } = e, i = bt(o);
    return /* @__PURE__ */ F(dg, { scope: e.__scopeMenu, value: n, onValueChange: i, children: /* @__PURE__ */ F(cs, { ...r, ref: t }) });
  }
);
Ec.displayName = Cc;
var Tc = "MenuRadioItem", Sc = T.forwardRef(
  (e, t) => {
    const { value: n, ...o } = e, r = mg(Tc, e.__scopeMenu), i = n === r.value;
    return /* @__PURE__ */ F(Mc, { scope: e.__scopeMenu, checked: i, children: /* @__PURE__ */ F(
      br,
      {
        role: "menuitemradio",
        "aria-checked": i,
        ...o,
        ref: t,
        "data-state": ds(i),
        onSelect: ie(
          o.onSelect,
          () => r.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Sc.displayName = Tc;
var us = "MenuItemIndicator", [Mc, fg] = Ut(
  us,
  { checked: !1 }
), Dc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: o, ...r } = e, i = fg(us, n);
    return /* @__PURE__ */ F(
      zt,
      {
        present: o || Qo(i.checked) || i.checked === !0,
        children: /* @__PURE__ */ F(
          Se.span,
          {
            ...r,
            ref: t,
            "data-state": ds(i.checked)
          }
        )
      }
    );
  }
);
Dc.displayName = us;
var pg = "MenuSeparator", Ac = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ F(
      Se.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...o,
        ref: t
      }
    );
  }
);
Ac.displayName = pg;
var hg = "MenuArrow", Pc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = gr(n);
    return /* @__PURE__ */ F(Ql, { ...r, ...o, ref: t });
  }
);
Pc.displayName = hg;
var gg = "MenuSub", [c1, Ic] = Ut(gg), Wn = "MenuSubTrigger", Rc = T.forwardRef(
  (e, t) => {
    const n = Yt(Wn, e.__scopeMenu), o = no(Wn, e.__scopeMenu), r = Ic(Wn, e.__scopeMenu), i = as(Wn, e.__scopeMenu), a = T.useRef(null), { pointerGraceTimerRef: s, onPointerGraceIntentChange: l } = i, c = { __scopeMenu: e.__scopeMenu }, u = T.useCallback(() => {
      a.current && window.clearTimeout(a.current), a.current = null;
    }, []);
    return T.useEffect(() => u, [u]), T.useEffect(() => {
      const d = s.current;
      return () => {
        window.clearTimeout(d), l(null);
      };
    }, [s, l]), /* @__PURE__ */ F(is, { asChild: !0, ...c, children: /* @__PURE__ */ F(
      kc,
      {
        id: r.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": r.contentId,
        "data-state": _c(n.open),
        ...e,
        ref: cr(t, r.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: ie(
          e.onPointerMove,
          qn((d) => {
            i.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !a.current && (i.onPointerGraceIntentChange(null), a.current = window.setTimeout(() => {
              n.onOpenChange(!0), u();
            }, 100));
          })
        ),
        onPointerLeave: ie(
          e.onPointerLeave,
          qn((d) => {
            u();
            const f = n.content?.getBoundingClientRect();
            if (f) {
              const p = n.content?.dataset.side, h = p === "right", g = h ? -5 : 5, b = f[h ? "left" : "right"], v = f[h ? "right" : "left"];
              i.onPointerGraceIntentChange({
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
              }), window.clearTimeout(s.current), s.current = window.setTimeout(
                () => i.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (i.onTriggerLeave(d), d.defaultPrevented) return;
              i.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: ie(e.onKeyDown, (d) => {
          const f = i.searchRef.current !== "";
          e.disabled || f && d.key === " " || Xh[o.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
Rc.displayName = Wn;
var Lc = "MenuSubContent", Oc = T.forwardRef(
  (e, t) => {
    const n = vc(je, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, i = Yt(je, e.__scopeMenu), a = no(je, e.__scopeMenu), s = Ic(Lc, e.__scopeMenu), l = T.useRef(null), c = Ae(t, l);
    return /* @__PURE__ */ F(Gn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ F(zt, { present: o || i.open, children: /* @__PURE__ */ F(Gn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ F(
      ls,
      {
        id: s.contentId,
        "aria-labelledby": s.triggerId,
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
        onFocusOutside: ie(e.onFocusOutside, (u) => {
          u.target !== s.trigger && i.onOpenChange(!1);
        }),
        onEscapeKeyDown: ie(e.onEscapeKeyDown, (u) => {
          a.onClose(), u.preventDefault();
        }),
        onKeyDown: ie(e.onKeyDown, (u) => {
          const d = u.currentTarget.contains(u.target), f = Zh[a.dir].includes(u.key);
          d && f && (i.onOpenChange(!1), s.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
Oc.displayName = Lc;
function _c(e) {
  return e ? "open" : "closed";
}
function Qo(e) {
  return e === "indeterminate";
}
function ds(e) {
  return Qo(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function bg(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function vg(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function wg(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1;
  let a = vg(e, Math.max(i, 0));
  r.length === 1 && (a = a.filter((c) => c !== n));
  const l = a.find(
    (c) => c.toLowerCase().startsWith(r.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function Ng(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let i = 0, a = t.length - 1; i < t.length; a = i++) {
    const s = t[i], l = t[a], c = s.x, u = s.y, d = l.x, f = l.y;
    u > o != f > o && n < (d - c) * (o - u) / (f - u) + c && (r = !r);
  }
  return r;
}
function yg(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Ng(n, t);
}
function qn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var kg = bc, xg = is, Cg = wc, Eg = Nc, Tg = cs, Sg = yc, Mg = br, Dg = xc, Ag = Ec, Pg = Sc, Ig = Dc, Rg = Ac, Lg = Pc, Og = Rc, _g = Oc, vr = "DropdownMenu", [$g] = xn(
  vr,
  [hc]
), Le = hc(), [Wg, $c] = $g(vr), Wc = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: o,
    open: r,
    defaultOpen: i,
    onOpenChange: a,
    modal: s = !0
  } = e, l = Le(t), c = T.useRef(null), [u, d] = Gi({
    prop: r,
    defaultProp: i ?? !1,
    onChange: a,
    caller: vr
  });
  return /* @__PURE__ */ F(
    Wg,
    {
      scope: t,
      triggerId: Vo(),
      triggerRef: c,
      contentId: Vo(),
      open: u,
      onOpenChange: d,
      onOpenToggle: T.useCallback(() => d((f) => !f), [d]),
      modal: s,
      children: /* @__PURE__ */ F(kg, { ...l, open: u, onOpenChange: d, dir: o, modal: s, children: n })
    }
  );
};
Wc.displayName = vr;
var Bc = "DropdownMenuTrigger", Hc = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: o = !1, ...r } = e, i = $c(Bc, n), a = Le(n);
    return /* @__PURE__ */ F(xg, { asChild: !0, ...a, children: /* @__PURE__ */ F(
      Se.button,
      {
        type: "button",
        id: i.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? i.contentId : void 0,
        "data-state": i.open ? "open" : "closed",
        "data-disabled": o ? "" : void 0,
        disabled: o,
        ...r,
        ref: cr(t, i.triggerRef),
        onPointerDown: ie(e.onPointerDown, (s) => {
          !o && s.button === 0 && s.ctrlKey === !1 && (i.onOpenToggle(), i.open || s.preventDefault());
        }),
        onKeyDown: ie(e.onKeyDown, (s) => {
          o || (["Enter", " "].includes(s.key) && i.onOpenToggle(), s.key === "ArrowDown" && i.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(s.key) && s.preventDefault());
        })
      }
    ) });
  }
);
Hc.displayName = Bc;
var Bg = "DropdownMenuPortal", Fc = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, o = Le(t);
  return /* @__PURE__ */ F(Cg, { ...o, ...n });
};
Fc.displayName = Bg;
var zc = "DropdownMenuContent", Uc = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = $c(zc, n), i = Le(n), a = T.useRef(!1);
    return /* @__PURE__ */ F(
      Eg,
      {
        id: r.contentId,
        "aria-labelledby": r.triggerId,
        ...i,
        ...o,
        ref: t,
        onCloseAutoFocus: ie(e.onCloseAutoFocus, (s) => {
          a.current || r.triggerRef.current?.focus(), a.current = !1, s.preventDefault();
        }),
        onInteractOutside: ie(e.onInteractOutside, (s) => {
          const l = s.detail.originalEvent, c = l.button === 0 && l.ctrlKey === !0, u = l.button === 2 || c;
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
var Hg = "DropdownMenuGroup", Fg = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ F(Tg, { ...r, ...o, ref: t });
  }
);
Fg.displayName = Hg;
var zg = "DropdownMenuLabel", Ug = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ F(Sg, { ...r, ...o, ref: t });
  }
);
Ug.displayName = zg;
var Yg = "DropdownMenuItem", Yc = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ F(Mg, { ...r, ...o, ref: t });
  }
);
Yc.displayName = Yg;
var jg = "DropdownMenuCheckboxItem", Vg = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(Dg, { ...r, ...o, ref: t });
});
Vg.displayName = jg;
var Kg = "DropdownMenuRadioGroup", Gg = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(Ag, { ...r, ...o, ref: t });
});
Gg.displayName = Kg;
var qg = "DropdownMenuRadioItem", Xg = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(Pg, { ...r, ...o, ref: t });
});
Xg.displayName = qg;
var Zg = "DropdownMenuItemIndicator", Qg = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(Ig, { ...r, ...o, ref: t });
});
Qg.displayName = Zg;
var Jg = "DropdownMenuSeparator", jc = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(Rg, { ...r, ...o, ref: t });
});
jc.displayName = Jg;
var eb = "DropdownMenuArrow", tb = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ F(Lg, { ...r, ...o, ref: t });
  }
);
tb.displayName = eb;
var nb = "DropdownMenuSubTrigger", ob = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(Og, { ...r, ...o, ref: t });
});
ob.displayName = nb;
var rb = "DropdownMenuSubContent", ib = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ F(
    _g,
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
ib.displayName = rb;
var sb = Wc, ab = Hc, lb = Fc, cb = Uc, ub = Yc, db = jc;
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
const ms = "-", mb = (e) => {
  const t = pb(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (a) => {
      const s = a.split(ms);
      return s[0] === "" && s.length !== 1 && s.shift(), Gc(s, t) || fb(a);
    },
    getConflictingClassGroupIds: (a, s) => {
      const l = n[a] || [];
      return s && o[a] ? [...l, ...o[a]] : l;
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
  const i = e.join(ms);
  return t.validators.find(({
    validator: a
  }) => a(i))?.classGroupId;
}, ba = /^\[(.+)\]$/, fb = (e) => {
  if (ba.test(e)) {
    const t = ba.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
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
    pi(n[r], o, r, t);
  return o;
}, pi = (e, t, n, o) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const i = r === "" ? t : va(t, r);
      i.classGroupId = n;
      return;
    }
    if (typeof r == "function") {
      if (hb(r)) {
        pi(r(o), t, n, o);
        return;
      }
      t.validators.push({
        validator: r,
        classGroupId: n
      });
      return;
    }
    Object.entries(r).forEach(([i, a]) => {
      pi(a, va(t, i), n, o);
    });
  });
}, va = (e, t) => {
  let n = e;
  return t.split(ms).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}, hb = (e) => e.isThemeGetter, gb = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const r = (i, a) => {
    n.set(i, a), t++, t > e && (t = 0, o = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let a = n.get(i);
      if (a !== void 0)
        return a;
      if ((a = o.get(i)) !== void 0)
        return r(i, a), a;
    },
    set(i, a) {
      n.has(i) ? n.set(i, a) : r(i, a);
    }
  };
}, hi = "!", gi = ":", bb = gi.length, vb = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const i = [];
    let a = 0, s = 0, l = 0, c;
    for (let h = 0; h < r.length; h++) {
      let g = r[h];
      if (a === 0 && s === 0) {
        if (g === gi) {
          i.push(r.slice(l, h)), l = h + bb;
          continue;
        }
        if (g === "/") {
          c = h;
          continue;
        }
      }
      g === "[" ? a++ : g === "]" ? a-- : g === "(" ? s++ : g === ")" && s--;
    }
    const u = i.length === 0 ? r : r.substring(l), d = wb(u), f = d !== u, p = c && c > l ? c - l : void 0;
    return {
      modifiers: i,
      hasImportantModifier: f,
      baseClassName: d,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const r = t + gi, i = o;
    o = (a) => a.startsWith(r) ? i(a.substring(r.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: a,
      maybePostfixModifierPosition: void 0
    };
  }
  if (n) {
    const r = o;
    o = (i) => n({
      className: i,
      parseClassName: r
    });
  }
  return o;
}, wb = (e) => e.endsWith(hi) ? e.substring(0, e.length - 1) : e.startsWith(hi) ? e.substring(1) : e, Nb = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((o) => [o, !0]));
  return (o) => {
    if (o.length <= 1)
      return o;
    const r = [];
    let i = [];
    return o.forEach((a) => {
      a[0] === "[" || t[a] ? (r.push(...i.sort(), a), i = []) : i.push(a);
    }), r.push(...i.sort()), r;
  };
}, yb = (e) => ({
  cache: gb(e.cacheSize),
  parseClassName: vb(e),
  sortModifiers: Nb(e),
  ...mb(e)
}), kb = /\s+/, xb = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: i
  } = t, a = [], s = e.trim().split(kb);
  let l = "";
  for (let c = s.length - 1; c >= 0; c -= 1) {
    const u = s[c], {
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
    const w = i(f).join(":"), N = p ? w + hi : w, E = N + v;
    if (a.includes(E))
      continue;
    a.push(E);
    const y = r(v, b);
    for (let k = 0; k < y.length; ++k) {
      const M = y[k];
      a.push(N + M);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function Cb() {
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
function Eb(e, ...t) {
  let n, o, r, i = a;
  function a(l) {
    const c = t.reduce((u, d) => d(u), e());
    return n = yb(c), o = n.cache.get, r = n.cache.set, i = s, s(l);
  }
  function s(l) {
    const c = o(l);
    if (c)
      return c;
    const u = xb(l, n);
    return r(l, u), u;
  }
  return function() {
    return i(Cb.apply(null, arguments));
  };
}
const ke = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Xc = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Zc = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Tb = /^\d+\/\d+$/, Sb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Mb = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Db = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Ab = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Pb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, tn = (e) => Tb.test(e), ae = (e) => !!e && !Number.isNaN(Number(e)), xt = (e) => !!e && Number.isInteger(Number(e)), jr = (e) => e.endsWith("%") && ae(e.slice(0, -1)), ut = (e) => Sb.test(e), Ib = () => !0, Rb = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Mb.test(e) && !Db.test(e)
), Qc = () => !1, Lb = (e) => Ab.test(e), Ob = (e) => Pb.test(e), _b = (e) => !J(e) && !ee(e), $b = (e) => Tn(e, tu, Qc), J = (e) => Xc.test(e), Lt = (e) => Tn(e, nu, Rb), Vr = (e) => Tn(e, zb, ae), wa = (e) => Tn(e, Jc, Qc), Wb = (e) => Tn(e, eu, Ob), Mo = (e) => Tn(e, ou, Lb), ee = (e) => Zc.test(e), On = (e) => Sn(e, nu), Bb = (e) => Sn(e, Ub), Na = (e) => Sn(e, Jc), Hb = (e) => Sn(e, tu), Fb = (e) => Sn(e, eu), Do = (e) => Sn(e, ou, !0), Tn = (e, t, n) => {
  const o = Xc.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, Sn = (e, t, n = !1) => {
  const o = Zc.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, Jc = (e) => e === "position" || e === "percentage", eu = (e) => e === "image" || e === "url", tu = (e) => e === "length" || e === "size" || e === "bg-size", nu = (e) => e === "length", zb = (e) => e === "number", Ub = (e) => e === "family-name", ou = (e) => e === "shadow", Yb = () => {
  const e = ke("color"), t = ke("font"), n = ke("text"), o = ke("font-weight"), r = ke("tracking"), i = ke("leading"), a = ke("breakpoint"), s = ke("container"), l = ke("spacing"), c = ke("radius"), u = ke("shadow"), d = ke("inset-shadow"), f = ke("text-shadow"), p = ke("drop-shadow"), h = ke("blur"), g = ke("perspective"), b = ke("aspect"), v = ke("ease"), w = ke("animate"), N = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], E = () => [
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
  ], y = () => [...E(), ee, J], k = () => ["auto", "hidden", "clip", "visible", "scroll"], M = () => ["auto", "contain", "none"], x = () => [ee, J, l], C = () => [tn, "full", "auto", ...x()], S = () => [xt, "none", "subgrid", ee, J], D = () => ["auto", {
    span: ["full", xt, ee, J]
  }, xt, ee, J], A = () => [xt, "auto", ee, J], R = () => ["auto", "min", "max", "fr", ee, J], L = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], _ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], O = () => ["auto", ...x()], U = () => [tn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...x()], I = () => [e, ee, J], P = () => [...E(), Na, wa, {
    position: [ee, J]
  }], B = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], K = () => ["auto", "cover", "contain", Hb, $b, {
    size: [ee, J]
  }], V = () => [jr, On, Lt], G = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    ee,
    J
  ], Q = () => ["", ae, On, Lt], W = () => ["solid", "dashed", "dotted", "double"], $ = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], z = () => [ae, jr, Na, wa], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    ee,
    J
  ], ce = () => ["none", ae, ee, J], de = () => ["none", ae, ee, J], ve = () => [ae, ee, J], Ee = () => [tn, "full", ...x()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ut],
      breakpoint: [ut],
      color: [Ib],
      container: [ut],
      "drop-shadow": [ut],
      ease: ["in", "out", "in-out"],
      font: [_b],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ut],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ut],
      shadow: [ut],
      spacing: ["px", ae],
      text: [ut],
      "text-shadow": [ut],
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
        aspect: ["auto", "square", tn, J, ee, b]
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
        columns: [ae, J, ee, s]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": N()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": N()
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
        object: y()
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
        z: [xt, "auto", ee, J]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [tn, "full", "auto", s, ...x()]
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
        flex: [ae, tn, "auto", "initial", "none", J]
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
        order: [xt, "first", "last", "none", ee, J]
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
        size: U()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [s, "screen", ...U()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          s,
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
          s,
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
        text: ["base", n, On, Lt]
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
        font: [Bb, J, t]
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
          i,
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
        decoration: [...W(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ae, "from-font", "auto", ee, Lt]
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
        bg: P()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: B()
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
          }, xt, ee, J],
          radial: ["", ee, J],
          conic: [xt, ee, J]
        }, Fb, Wb]
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
        outline: [...W(), "none", "hidden"]
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
        outline: ["", ae, On, Lt]
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
          Do,
          Mo
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
        "inset-shadow": ["none", d, Do, Mo]
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
        "ring-offset": [ae, Lt]
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
        "text-shadow": ["none", f, Do, Mo]
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
        mask: B()
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
          Do,
          Mo
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
        animate: ["none", w, ee, J]
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
        "perspective-origin": y()
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
        scale: de()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": de()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": de()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": de()
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
        origin: y()
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
        stroke: [ae, On, Lt, Vr]
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
}, jb = /* @__PURE__ */ Eb(Yb);
function re(...e) {
  return jb(Kc(e));
}
function Kr({
  ...e
}) {
  return /* @__PURE__ */ m(sb, { "data-slot": "dropdown-menu", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/dropdown-menu.tsx",
    lineNumber: 10,
    columnNumber: 10
  }, this);
}
function Gr({
  ...e
}) {
  return /* @__PURE__ */ m(
    ab,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/dropdown-menu.tsx",
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
  return /* @__PURE__ */ m(lb, { children: /* @__PURE__ */ m(
    cb,
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
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 39,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/dropdown-menu.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}
function we({
  className: e,
  inset: t,
  variant: n = "default",
  ...o
}) {
  return /* @__PURE__ */ m(
    ub,
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
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/dropdown-menu.tsx",
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
    db,
    {
      "data-slot": "dropdown-menu-separator",
      className: re("bg-border -mx-1 my-1 h-px", e),
      ...t
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 169,
      columnNumber: 5
    },
    this
  );
}
const ya = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ka = Kc, Vb = (e, t) => (n) => {
  var o;
  if (t?.variants == null) return ka(e, n?.class, n?.className);
  const { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((c) => {
    const u = n?.[c], d = i?.[c];
    if (u === null) return null;
    const f = ya(u) || ya(d);
    return r[c][f];
  }), s = n && Object.entries(n).reduce((c, u) => {
    let [d, f] = u;
    return f === void 0 || (c[d] = f), c;
  }, {}), l = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((c, u) => {
    let { class: d, className: f, ...p } = u;
    return Object.entries(p).every((h) => {
      let [g, b] = h;
      return Array.isArray(b) ? b.includes({
        ...i,
        ...s
      }[g]) : {
        ...i,
        ...s
      }[g] === b;
    }) ? [
      ...c,
      d,
      f
    ] : c;
  }, []);
  return ka(e, a, l, n?.class, n?.className);
}, bi = Vb(
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
function St({
  className: e,
  variant: t,
  size: n,
  asChild: o = !1,
  ...r
}) {
  return /* @__PURE__ */ m(
    o ? ef : "button",
    {
      "data-slot": "button",
      className: re(bi({ variant: t, size: n, className: e })),
      ...r
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/button.tsx",
      lineNumber: 52,
      columnNumber: 5
    },
    this
  );
}
var Kb = Object.freeze({
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
}), Gb = "VisuallyHidden", ru = T.forwardRef(
  (e, t) => /* @__PURE__ */ F(
    Se.span,
    {
      ...e,
      ref: t,
      style: { ...Kb, ...e.style }
    }
  )
);
ru.displayName = Gb;
var qb = ru, [wr] = xn("Tooltip", [
  pr
]), Nr = pr(), iu = "TooltipProvider", Xb = 700, vi = "tooltip.open", [Zb, fs] = wr(iu), su = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = Xb,
    skipDelayDuration: o = 300,
    disableHoverableContent: r = !1,
    children: i
  } = e, a = T.useRef(!0), s = T.useRef(!1), l = T.useRef(0);
  return T.useEffect(() => {
    const c = l.current;
    return () => window.clearTimeout(c);
  }, []), /* @__PURE__ */ F(
    Zb,
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
      isPointerInTransitRef: s,
      onPointerInTransitChange: T.useCallback((c) => {
        s.current = c;
      }, []),
      disableHoverableContent: r,
      children: i
    }
  );
};
su.displayName = iu;
var Xn = "Tooltip", [Qb, oo] = wr(Xn), au = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: i,
    disableHoverableContent: a,
    delayDuration: s
  } = e, l = fs(Xn, e.__scopeTooltip), c = Nr(t), [u, d] = T.useState(null), f = Vo(), p = T.useRef(0), h = a ?? l.disableHoverableContent, g = s ?? l.delayDuration, b = T.useRef(!1), [v, w] = Gi({
    prop: o,
    defaultProp: r ?? !1,
    onChange: (M) => {
      M ? (l.onOpen(), document.dispatchEvent(new CustomEvent(vi))) : l.onClose(), i?.(M);
    },
    caller: Xn
  }), N = T.useMemo(() => v ? b.current ? "delayed-open" : "instant-open" : "closed", [v]), E = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, b.current = !1, w(!0);
  }, [w]), y = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, w(!1);
  }, [w]), k = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      b.current = !0, w(!0), p.current = 0;
    }, g);
  }, [g, w]);
  return T.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ F(ql, { ...c, children: /* @__PURE__ */ F(
    Qb,
    {
      scope: t,
      contentId: f,
      open: v,
      stateAttribute: N,
      trigger: u,
      onTriggerChange: d,
      onTriggerEnter: T.useCallback(() => {
        l.isOpenDelayedRef.current ? k() : E();
      }, [l.isOpenDelayedRef, k, E]),
      onTriggerLeave: T.useCallback(() => {
        h ? y() : (window.clearTimeout(p.current), p.current = 0);
      }, [y, h]),
      onOpen: E,
      onClose: y,
      disableHoverableContent: h,
      children: n
    }
  ) });
};
au.displayName = Xn;
var wi = "TooltipTrigger", lu = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = oo(wi, n), i = fs(wi, n), a = Nr(n), s = T.useRef(null), l = Ae(t, s, r.onTriggerChange), c = T.useRef(!1), u = T.useRef(!1), d = T.useCallback(() => c.current = !1, []);
    return T.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ F(Xl, { asChild: !0, ...a, children: /* @__PURE__ */ F(
      Se.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...o,
        ref: l,
        onPointerMove: ie(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !u.current && !i.isPointerInTransitRef.current && (r.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: ie(e.onPointerLeave, () => {
          r.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: ie(e.onPointerDown, () => {
          r.open && r.onClose(), c.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: ie(e.onFocus, () => {
          c.current || r.onOpen();
        }),
        onBlur: ie(e.onBlur, r.onClose),
        onClick: ie(e.onClick, r.onClose)
      }
    ) });
  }
);
lu.displayName = wi;
var ps = "TooltipPortal", [Jb, ev] = wr(ps, {
  forceMount: void 0
}), cu = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, i = oo(ps, t);
  return /* @__PURE__ */ F(Jb, { scope: t, forceMount: n, children: /* @__PURE__ */ F(zt, { present: n || i.open, children: /* @__PURE__ */ F(rs, { asChild: !0, container: r, children: o }) }) });
};
cu.displayName = ps;
var bn = "TooltipContent", uu = T.forwardRef(
  (e, t) => {
    const n = ev(bn, e.__scopeTooltip), { forceMount: o = n.forceMount, side: r = "top", ...i } = e, a = oo(bn, e.__scopeTooltip);
    return /* @__PURE__ */ F(zt, { present: o || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ F(du, { side: r, ...i, ref: t }) : /* @__PURE__ */ F(tv, { side: r, ...i, ref: t }) });
  }
), tv = T.forwardRef((e, t) => {
  const n = oo(bn, e.__scopeTooltip), o = fs(bn, e.__scopeTooltip), r = T.useRef(null), i = Ae(t, r), [a, s] = T.useState(null), { trigger: l, onClose: c } = n, u = r.current, { onPointerInTransitChange: d } = o, f = T.useCallback(() => {
    s(null), d(!1);
  }, [d]), p = T.useCallback(
    (h, g) => {
      const b = h.currentTarget, v = { x: h.clientX, y: h.clientY }, w = iv(v, b.getBoundingClientRect()), N = sv(v, w), E = av(g.getBoundingClientRect()), y = cv([...N, ...E]);
      s(y), d(!0);
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
        const b = g.target, v = { x: g.clientX, y: g.clientY }, w = l?.contains(b) || u?.contains(b), N = !lv(v, a);
        w ? f() : N && (f(), c());
      };
      return document.addEventListener("pointermove", h), () => document.removeEventListener("pointermove", h);
    }
  }, [l, u, a, c, f]), /* @__PURE__ */ F(du, { ...e, ref: i });
}), [nv, ov] = wr(Xn, { isInside: !1 }), rv = /* @__PURE__ */ nf("TooltipContent"), du = T.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: o,
      "aria-label": r,
      onEscapeKeyDown: i,
      onPointerDownOutside: a,
      ...s
    } = e, l = oo(bn, n), c = Nr(n), { onClose: u } = l;
    return T.useEffect(() => (document.addEventListener(vi, u), () => document.removeEventListener(vi, u)), [u]), T.useEffect(() => {
      if (l.trigger) {
        const d = (f) => {
          f.target?.contains(l.trigger) && u();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [l.trigger, u]), /* @__PURE__ */ F(
      qi,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: a,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ bm(
          Zl,
          {
            "data-state": l.stateAttribute,
            ...c,
            ...s,
            ref: t,
            style: {
              ...s.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ F(rv, { children: o }),
              /* @__PURE__ */ F(nv, { scope: n, isInside: !0, children: /* @__PURE__ */ F(qb, { id: l.contentId, role: "tooltip", children: r || o }) })
            ]
          }
        )
      }
    );
  }
);
uu.displayName = bn;
var mu = "TooltipArrow", fu = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = Nr(n);
    return ov(
      mu,
      n
    ).isInside ? null : /* @__PURE__ */ F(Ql, { ...r, ...o, ref: t });
  }
);
fu.displayName = mu;
function iv(e, t) {
  const n = Math.abs(t.top - e.y), o = Math.abs(t.bottom - e.y), r = Math.abs(t.right - e.x), i = Math.abs(t.left - e.x);
  switch (Math.min(n, o, r, i)) {
    case i:
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
function sv(e, t, n = 5) {
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
function av(e) {
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
  for (let i = 0, a = t.length - 1; i < t.length; a = i++) {
    const s = t[i], l = t[a], c = s.x, u = s.y, d = l.x, f = l.y;
    u > o != f > o && n < (d - c) * (o - u) / (f - u) + c && (r = !r);
  }
  return r;
}
function cv(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), uv(t);
}
function uv(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    for (; t.length >= 2; ) {
      const i = t[t.length - 1], a = t[t.length - 2];
      if ((i.x - a.x) * (r.y - a.y) >= (i.y - a.y) * (r.x - a.x)) t.pop();
      else break;
    }
    t.push(r);
  }
  t.pop();
  const n = [];
  for (let o = e.length - 1; o >= 0; o--) {
    const r = e[o];
    for (; n.length >= 2; ) {
      const i = n[n.length - 1], a = n[n.length - 2];
      if ((i.x - a.x) * (r.y - a.y) >= (i.y - a.y) * (r.x - a.x)) n.pop();
      else break;
    }
    n.push(r);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var dv = su, mv = au, fv = lu, pv = cu, hv = uu, gv = fu;
function bv({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ m(
    dv,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/tooltip.tsx",
      lineNumber: 11,
      columnNumber: 5
    },
    this
  );
}
function Ni({
  ...e
}) {
  return /* @__PURE__ */ m(bv, { children: /* @__PURE__ */ m(mv, { "data-slot": "tooltip", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/tooltip.tsx",
    lineNumber: 24,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/tooltip.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
function yi({
  ...e
}) {
  return /* @__PURE__ */ m(fv, { "data-slot": "tooltip-trigger", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/tooltip.tsx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
function ki({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...o
}) {
  return /* @__PURE__ */ m(pv, { children: /* @__PURE__ */ m(
    hv,
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
        /* @__PURE__ */ m(gv, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/tooltip.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/tooltip.tsx",
      lineNumber: 43,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/tooltip.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}
const Ne = ({ onClick: e, isActive: t, disabled: n, children: o, tooltip: r }) => {
  const i = /* @__PURE__ */ m(
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
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 100,
      columnNumber: 5
    },
    void 0
  );
  return r ? /* @__PURE__ */ m(Ni, { children: [
    /* @__PURE__ */ m(yi, { asChild: !0, children: i }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 120,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ m(ki, { side: "bottom", className: "text-xs", children: r }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 121,
      columnNumber: 9
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 119,
    columnNumber: 7
  }, void 0) : i;
}, nn = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }, void 0, !1, {
  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
  lineNumber: 132,
  columnNumber: 3
}, void 0), vv = wn(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: o, className: r = "", autoReorderChecklist: i = !1, aiEnabled: a = !1, onAISparklesClick: s }) {
  const l = j(null), [c, u] = Y(!1), [d, f] = Y(void 0), p = tl({
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
  }), h = H(() => {
    const { view: k } = t, { from: M } = k.state.selection, x = k.coordsAtPos(M);
    f({ top: x.bottom + 8, left: x.left }), u(!0);
  }, [t]), g = H((k, M) => {
    t.chain().focus().setImage({ src: k, alt: M }).run(), u(!1);
  }, [t]), b = H(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), v = H((k) => {
    t.chain().focus().insertCallout({ type: k }).run();
  }, [t]), w = j(/* @__PURE__ */ new Map()), N = j(/* @__PURE__ */ new Map()), E = H((k) => {
    const { doc: M, tr: x } = k.state;
    let C = !1;
    const S = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), D = k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    w.current.clear(), D.forEach((R, L) => {
      R.querySelectorAll(":scope > li").forEach((O) => {
        const U = O, I = (U.textContent || "").trim().substring(0, 50);
        w.current.set(`${L}-${I}`, U.getBoundingClientRect());
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
      R.forEach((W) => {
        _.push({
          node: W,
          isTask: W.type.name === "taskItem",
          checked: W.type.name === "taskItem" && W.attrs.checked === !0,
          originalIndex: O++
        });
      });
      const U = _.filter((W) => W.isTask && !W.checked), I = _.filter((W) => W.isTask && W.checked), P = [..._], B = _.map((W, $) => ({ index: $, isTask: W.isTask })).filter((W) => W.isTask).map((W) => W.index), K = [...U, ...I];
      if (B.forEach((W, $) => {
        P[W] = K[$];
      }), !P.some((W, $) => W.node !== _[$].node)) continue;
      const G = R.type.create(
        R.attrs,
        P.map((W) => W.node)
      ), Q = x.mapping.map(L);
      x.replaceWith(Q, Q + R.nodeSize, G), C = !0;
    }
    C && (k.view.dispatch(x), requestAnimationFrame(() => {
      k.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((L) => {
        const _ = L.querySelectorAll(":scope > li"), O = /* @__PURE__ */ new Map();
        w.current.forEach((U, I) => {
          const P = I.replace(/^\d+-/, "");
          O.set(P, U);
        }), _.forEach((U) => {
          const I = U, P = (I.textContent || "").trim().substring(0, 50), B = O.get(P);
          if (!B) return;
          const K = I.getBoundingClientRect(), V = B.top - K.top;
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
    if (!i || !t) return;
    const k = /* @__PURE__ */ new Map();
    t.state.doc.descendants((x, C) => (x.type.name === "taskItem" && k.set(C, x.attrs.checked === !0), !0)), N.current = k;
    const M = ({ transaction: x }) => {
      if (!x.docChanged) return;
      const C = /* @__PURE__ */ new Map();
      t.state.doc.descendants((A, R) => (A.type.name === "taskItem" && C.set(R, A.attrs.checked === !0), !0));
      const S = N.current;
      let D = !1;
      if (S.size > 0 && C.size > 0) {
        let A = 0, R = 0;
        S.forEach((L) => {
          L && A++;
        }), C.forEach((L) => {
          L && R++;
        }), A !== R && (D = !0);
      }
      N.current = C, D && setTimeout(() => {
        E(t);
      }, 150);
    };
    return t.on("transaction", M), () => {
      t.off("transaction", M);
    };
  }, [t, i, E]);
  const y = H(() => {
    E(t);
  }, [t, E]);
  return /* @__PURE__ */ m("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${r}`, children: [
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Id, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 384,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 379,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(Rd, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 391,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 386,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(nn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 394,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(Pi, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 402,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 397,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m(Ii, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 409,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 404,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(Ri, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 416,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 411,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(Li, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 423,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 418,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(rl, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 430,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 425,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(il, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 437,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 432,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => o?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(Oi, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 444,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 439,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(nn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
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
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 463,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m(Mt, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 466,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 452,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 451,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(qr, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !p?.isH1 && !p?.isH2 && !p?.isH3 && !p?.isH4 && !p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 474,
                columnNumber: 13
              }, this),
              "Paragraph"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 470,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: p?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 481,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 1" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 482,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 477,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: p?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 488,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 489,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 484,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: p?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 495,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 3" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 496,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 491,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: p?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 502,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 4" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 503,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 498,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 5 }).run(),
            className: p?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 509,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 510,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 505,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 469,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 450,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(nn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 515,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(_i, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 523,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 518,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m($i, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 530,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 525,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m(Wi, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 537,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 532,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(Bi, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 544,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 539,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleCodeBlock().run(),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(sl, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 551,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 546,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().sinkListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().sinkListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ m(Ld, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 564,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 553,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(Od, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 577,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 566,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(nn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 580,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: b,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m(ii, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 587,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 583,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: h,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m(Di, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 593,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 589,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ m(al, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 599,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
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
          children: /* @__PURE__ */ m(jo, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 608,
            columnNumber: 13
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 604,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 603,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(qr, { align: "start", children: [
        /* @__PURE__ */ m(we, { onClick: () => v("info"), children: [
          /* @__PURE__ */ m(jo, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 613,
            columnNumber: 13
          }, this),
          " Info"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 612,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(we, { onClick: () => v("note"), children: [
          /* @__PURE__ */ m(Hi, { size: 16, className: "mr-2", style: { color: "#FF8200" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 616,
            columnNumber: 13
          }, this),
          " Note"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 615,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(we, { onClick: () => v("prompt"), children: [
          /* @__PURE__ */ m(_d, { size: 16, className: "mr-2", style: { color: "#B244B3" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 619,
            columnNumber: 13
          }, this),
          " Prompt"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 618,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(we, { onClick: () => v("resources"), children: [
          /* @__PURE__ */ m($d, { size: 16, className: "mr-2", style: { color: "#63B148" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 622,
            columnNumber: 13
          }, this),
          " Resources"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 621,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(we, { onClick: () => v("todo"), children: [
          /* @__PURE__ */ m(Fi, { size: 16, className: "mr-2", style: { color: "#4479B3" } }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 625,
            columnNumber: 13
          }, this),
          " Todo"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 624,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 611,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 602,
      columnNumber: 7
    }, this),
    t.isActive("table") && /* @__PURE__ */ m(Kr, { children: [
      /* @__PURE__ */ m(Gr, { asChild: !0, children: /* @__PURE__ */ m(
        St,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ m(ii, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 639,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m("span", { className: "text-xs hidden sm:inline", children: "Table" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 640,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 634,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 633,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(qr, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ m(Bs, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 648,
                columnNumber: 15
              }, this),
              " Add Column Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 644,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ m(Bs, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 654,
                columnNumber: 15
              }, this),
              " Add Column After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 650,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ m(an, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 660,
                columnNumber: 15
              }, this),
              " Delete Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 656,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(Xr, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 662,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ m(Hs, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 667,
                columnNumber: 15
              }, this),
              " Add Row Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 663,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ m(Hs, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 673,
                columnNumber: 15
              }, this),
              " Add Row After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 669,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ m(an, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 679,
                columnNumber: 15
              }, this),
              " Delete Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 675,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(Xr, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 681,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ m(Fs, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 686,
                columnNumber: 15
              }, this),
              " Toggle Header Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 682,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ m(Fs, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 692,
                columnNumber: 15
              }, this),
              " Toggle Header Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 688,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(Xr, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 695,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ m(an, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 701,
                columnNumber: 15
              }, this),
              " Delete Table"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 696,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 643,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 632,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m(
      wl,
      {
        isOpen: c,
        onClose: () => u(!1),
        onInsert: g,
        position: d
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 708,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(nn, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 716,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: y,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m(Wd, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 721,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 717,
        columnNumber: 7
      },
      this
    ),
    a && /* @__PURE__ */ m(Ce, { children: [
      /* @__PURE__ */ m(nn, {}, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 727,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(Ni, { children: [
        /* @__PURE__ */ m(yi, { asChild: !0, children: /* @__PURE__ */ m(
          "button",
          {
            ref: l,
            onClick: () => {
              l.current && s?.(l.current);
            },
            className: `
                  flex items-center justify-center w-8 h-8 rounded-md shrink-0
                  transition-all duration-100 ease-out touch-manipulation
                  bg-transparent text-muted-foreground hover:bg-secondary active:bg-secondary/80
                  hover:text-foreground
                `,
            children: /* @__PURE__ */ m(sr, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 744,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 730,
            columnNumber: 15
          },
          this
        ) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 729,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(ki, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 747,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 728,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 726,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m("div", { className: "flex-1 min-w-2" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 755,
      columnNumber: 7
    }, this),
    n && /* @__PURE__ */ m(Ni, { children: [
      /* @__PURE__ */ m(yi, { asChild: !0, children: /* @__PURE__ */ m(
        St,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ m(Nn, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 767,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m("span", { className: "text-xs hidden md:inline", children: "Copy MD" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 768,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 761,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 760,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(ki, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 771,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 759,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 377,
    columnNumber: 5
  }, this);
});
function wv({ editor: e, isOpen: t, onClose: n, focusTrigger: o = 0, initialSearchQuery: r, editorMode: i = "wysiwyg", rawMarkdown: a = "", onRawMarkdownChange: s, onMatchesChange: l }) {
  const c = i === "markdown", [u, d] = Y(""), [f, p] = Y(""), [h, g] = Y(!1), [b, v] = Y(!1), [w, N] = Y(!1), [E, y] = Y(!1), [k, M] = Y([]), [x, C] = Y(0), [S, D] = Y(null), [A, R] = Y(!1), L = j(!1), _ = j(null), O = j(null), U = j(!1);
  q(() => {
    t && r && r.trim() && d(r);
  }, [t, r, o]);
  const I = H(() => {
    if (!u || !e) {
      M([]), C(0), D(null);
      return;
    }
    const W = [];
    let $;
    try {
      if (b)
        $ = new RegExp(u, h ? "g" : "gi");
      else {
        let z = u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        w && (z = `\\b${z}\\b`), $ = new RegExp(z, h ? "g" : "gi");
      }
      D(null);
    } catch (z) {
      D(z.message), M([]);
      return;
    }
    if (c) {
      let z;
      for (; (z = $.exec(a)) !== null; )
        W.push({
          from: z.index,
          to: z.index + z[0].length,
          text: z[0]
        });
    } else {
      const { doc: z } = e.state;
      z.descendants((Z, ce) => {
        if (Z.isText && Z.text) {
          let de;
          for (; (de = $.exec(Z.text)) !== null; )
            W.push({
              from: ce + de.index,
              to: ce + de.index + de[0].length,
              text: de[0]
            });
        }
        return !0;
      });
    }
    M(W), W.length > 0 && x >= W.length && C(0);
  }, [u, h, b, w, e, x, c, a]);
  q(() => {
    I();
  }, [I]), q(() => {
    c && l && (t && k.length > 0 ? l(k, x) : l([], 0));
  }, [c, t, k, x, l]), q(() => {
    if (!e) return;
    if (c) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const W = typeof e.commands.setSearchHighlight == "function";
    t && u && W ? e.commands.setSearchHighlight({
      searchTerm: u,
      caseSensitive: h,
      useRegex: b,
      currentMatchIndex: x
    }) : W && e.commands.clearSearchHighlight();
  }, [e, t, u, h, b, x, c, k, a]), q(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), l && l([], 0), L.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), R(!1)), L.current = !1);
  }, [t, e, l]), q(() => {
    if (k.length > 0 && x < k.length) {
      const W = k[x];
      if (c) {
        const z = document.querySelector(".syntax-textarea");
        if (z && U.current) {
          const Z = parseInt(getComputedStyle(z).lineHeight) || 22, de = a.substring(0, W.from).split(`
`).length;
          z.scrollTop = Math.max(0, (de - 3) * Z);
        }
        U.current && (U.current = !1);
        return;
      }
      const $ = e.view.domAtPos(W.from);
      $.node && $.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), U.current && (U.current = !1);
    }
  }, [x, k, e, c, a]), q(() => {
    t && _.current && (_.current.focus(), _.current.select());
  }, [t, o]);
  const P = H(() => {
    k.length !== 0 && (U.current = !0, C((W) => (W + 1) % k.length));
  }, [k.length]), B = H(() => {
    k.length !== 0 && (U.current = !0, C((W) => (W - 1 + k.length) % k.length));
  }, [k.length]), K = H(() => {
    if (k.length === 0 || x >= k.length) return;
    const W = k[x];
    if (c && s) {
      const $ = a.substring(0, W.from) + f + a.substring(W.to);
      s($), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: W.from, to: W.to }).deleteSelection().insertContent(f).run(), setTimeout(I, 10);
  }, [k, x, f, e, I, c, a, s]), V = H(() => {
    if (k.length === 0) return;
    if (c && s) {
      const $ = [...k].sort((Z, ce) => ce.from - Z.from);
      let z = a;
      $.forEach((Z) => {
        z = z.substring(0, Z.from) + f + z.substring(Z.to);
      }), s(z), setTimeout(I, 10);
      return;
    }
    const W = [...k].sort(($, z) => z.from - $.from);
    e.chain().focus(), W.forEach(($) => {
      e.chain().setTextSelection({ from: $.from, to: $.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(I, 10);
  }, [k, f, e, I, c, a, s]), G = H(() => {
    if (k.length === 0 || !u || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: u,
      caseSensitive: h,
      useRegex: b,
      wholeWord: w
    }) && (R(!0), L.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [k, u, h, b, w, e, n]), Q = H((W) => {
    W.key === "Enter" ? (W.preventDefault(), W.shiftKey ? B() : P(), _.current?.focus()) : W.key === "Escape" ? (W.preventDefault(), n()) : W.key === "h" && (W.ctrlKey || W.metaKey) ? (W.preventDefault(), y(($) => !$)) : W.key === "l" && (W.ctrlKey || W.metaKey) && W.shiftKey && (W.preventDefault(), G());
  }, [P, B, n, G]);
  return t ? /* @__PURE__ */ m(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: Q,
      children: [
        /* @__PURE__ */ m("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ m("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(Bd, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
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
                onChange: (W) => d(W.target.value),
                className: `find-replace-input ${S ? "has-error" : ""}`
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
                lineNumber: 382,
                columnNumber: 11
              },
              this
            ),
            S && /* @__PURE__ */ m("span", { className: "find-replace-error", title: S, children: "!" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
              lineNumber: 391,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
            lineNumber: 380,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("span", { className: "find-replace-count", children: k.length > 0 ? `${x + 1} of ${k.length}` : u ? "No results" : "" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
            lineNumber: 396,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: B,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ m(Hd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
                lineNumber: 410,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
              lineNumber: 404,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: P,
              disabled: k.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ m(Mt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
                lineNumber: 418,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
              lineNumber: 412,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: G,
              disabled: k.length === 0,
              className: `find-replace-btn ${A ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${k.length} matches`,
              children: /* @__PURE__ */ m(Fd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
                lineNumber: 428,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
              lineNumber: 422,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m("div", { className: "find-replace-separator" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
            lineNumber: 432,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => g((W) => !W),
              className: `find-replace-btn ${h ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ m(zd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
                lineNumber: 440,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
              lineNumber: 435,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => N((W) => !W),
              className: `find-replace-btn ${w ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ m(Ud, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
                lineNumber: 447,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
              lineNumber: 442,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => v((W) => !W),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ m(Yd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
                lineNumber: 454,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
              lineNumber: 449,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => y((W) => !W),
              className: `find-replace-btn ${E ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ m(si, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
                lineNumber: 463,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
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
              children: /* @__PURE__ */ m(gt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
                lineNumber: 472,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
              lineNumber: 467,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
          lineNumber: 379,
          columnNumber: 7
        }, this),
        E && /* @__PURE__ */ m("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ m("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(si, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
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
                onChange: (W) => p(W.target.value),
                className: "find-replace-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
                lineNumber: 481,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
            lineNumber: 479,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: K,
              disabled: k.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
              lineNumber: 491,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: V,
              disabled: k.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ m(jd, { size: 14 }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
                  lineNumber: 505,
                  columnNumber: 13
                }, this),
                "All"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
              lineNumber: 499,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
          lineNumber: 478,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FindReplace.tsx",
      lineNumber: 374,
      columnNumber: 5
    },
    this
  ) : null;
}
const Nv = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), dt = Nv ? "⌘" : "Ctrl", yv = ({ editor: e }) => {
  const [t, n] = Y(!1), [o, r] = Y(0), [i, a] = Y(0), [s, l] = Y(""), [c, u] = Y(""), [d, f] = Y(!1), [p, h] = Y(!1);
  q(() => {
    if (!e) return;
    const M = () => {
      const C = e.storage.selectAllOccurrences;
      C ? (n(C.isActive), r(C.ranges.length), a(C.allMatches.length), l(C.searchTerm), u(C.typedBuffer), f(C.isTypingReplace), h(C.isIncremental)) : (n(!1), r(0), a(0));
    }, x = () => {
      M();
    };
    return e.on("transaction", x), M(), () => {
      e.off("transaction", x);
    };
  }, [e]);
  const g = H(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), b = H(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), v = H(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), w = H(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), N = H(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), E = H(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), y = H(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), k = H(() => {
    s && (e.commands.selectAllOccurrences({
      searchTerm: s,
      caseSensitive: !1,
      useRegex: !1,
      wholeWord: !1
    }), e.commands.focus());
  }, [e, s]);
  return !t || o === 0 ? null : /* @__PURE__ */ m("div", { className: "select-all-action-bar", children: [
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-inner", children: [
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-count", children: [
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-number", children: p && i > 0 ? `${o}/${i}` : o }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 131,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-label", children: "selected" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 134,
          columnNumber: 11
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 130,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ m(Ce, { children: [
        /* @__PURE__ */ m(ir, { size: 12, className: "select-all-action-bar-preview-icon" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 141,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-old", children: s }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 142,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-arrow", children: "→" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 143,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-new", children: c || "∅" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 144,
          columnNumber: 15
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 140,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ m(Ce, { children: /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        s,
        '"'
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 148,
        columnNumber: 15
      }, void 0) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 147,
        columnNumber: 13
      }, void 0) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 138,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 154,
        columnNumber: 9
      }, void 0),
      p && o < i && /* @__PURE__ */ m(Ce, { children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: y,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${dt}+D)`,
            children: /* @__PURE__ */ m(zi, { size: 14 }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
              lineNumber: 164,
              columnNumber: 15
            }, void 0)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 159,
            columnNumber: 13
          },
          void 0
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: k,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${dt}+Shift+L)`,
            children: "All"
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 166,
            columnNumber: 13
          },
          void 0
        ),
        /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 173,
          columnNumber: 13
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 158,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: g,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${dt}+B)`,
          children: /* @__PURE__ */ m(Pi, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 183,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
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
          title: `Italic all occurrences (${dt}+I)`,
          children: /* @__PURE__ */ m(Ii, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 190,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
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
          title: `Underline all occurrences (${dt}+U)`,
          children: /* @__PURE__ */ m(Ri, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 197,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 192,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: w,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ m(Li, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 204,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 199,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 208,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: N,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ m(an, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 216,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
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
          children: /* @__PURE__ */ m(gt, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 225,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 220,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 128,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: p && o < i ? /* @__PURE__ */ m(Ce, { children: [
      /* @__PURE__ */ m("kbd", { children: [
        dt,
        "+D"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 13
      }, void 0),
      " next · ",
      /* @__PURE__ */ m("kbd", { children: [
        dt,
        "+Shift+L"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 42
      }, void 0),
      " all · Type to replace · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 94
      }, void 0),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: [
        dt,
        "+Z"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 119
      }, void 0),
      " undo"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 232,
      columnNumber: 11
    }, void 0) : /* @__PURE__ */ m(Ce, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 35
      }, void 0),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: "Backspace" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 60
      }, void 0),
      " to delete · ",
      /* @__PURE__ */ m("kbd", { children: [
        dt,
        "+Z"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 93
      }, void 0),
      " undo"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 236,
      columnNumber: 11
    }, void 0) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 230,
      columnNumber: 7
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SelectAllActionBar.tsx",
    lineNumber: 127,
    columnNumber: 5
  }, void 0);
}, kv = wn(yv), Ao = "-dismissed";
function xv(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const o = e.charCodeAt(n);
    t = (t << 5) - t + o, t = t & t;
  }
  return t;
}
function Cv(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: o = 1e3,
    enabled: r = !0,
    onSave: i,
    onRecover: a
  } = t, [s, l] = Y({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), c = j(null), u = j(""), d = j(0);
  q(() => {
    if (r && !(!e || e.isDestroyed))
      try {
        const v = localStorage.getItem(n), w = localStorage.getItem(n + Ao);
        if (v && !w) {
          let N = "";
          try {
            N = e.getHTML() || "";
          } catch {
            return;
          }
          v !== N && v.length > 50 && l((E) => ({ ...E, hasRecoverableContent: !0 }));
        }
      } catch (v) {
        console.warn("useAutoSave: Error checking for recoverable content", v);
      }
  }, [e, n, r]);
  const f = H(() => {
    if (!(!e || !r || e.isDestroyed))
      try {
        const v = e.getHTML(), w = xv(v);
        if (w === d.current && v.length === u.current.length) {
          l((N) => ({ ...N, status: "saved" }));
          return;
        }
        if (v.length < 20)
          return;
        l((N) => ({ ...N, status: "saving" })), localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), u.current = v, d.current = w, l((N) => ({
          ...N,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), i?.(v), setTimeout(() => {
          l((N) => N.status === "saved" ? { ...N, status: "idle" } : N);
        }, 2e3);
      } catch (v) {
        console.error("useAutoSave: Error saving content", v), l((w) => ({
          ...w,
          status: "error",
          error: v instanceof Error ? v.message : "Failed to save"
        }));
      }
  }, [e, n, r, i]);
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
          const w = e.getHTML();
          w.length >= 20 && (localStorage.setItem(n, w), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()));
        } catch (w) {
          console.warn("useAutoSave: Error saving on unload", w);
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
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Ao), u.current = "", l({
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
      return v && e && !e.isDestroyed ? (l((w) => ({ ...w, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(v), u.current = v, localStorage.removeItem(n + Ao), a?.(v);
          } catch (w) {
            console.warn("useAutoSave: Error setting content during recovery", w);
          }
      }), v) : null;
    } catch (v) {
      return console.warn("useAutoSave: Error recovering content", v), null;
    }
  }, [e, n, a]), b = H(() => {
    try {
      localStorage.setItem(n + Ao, "true"), l((v) => ({ ...v, hasRecoverableContent: !1 }));
    } catch (v) {
      console.warn("useAutoSave: Error dismissing recovery", v);
    }
  }, [n]);
  return {
    ...s,
    save: p,
    clear: h,
    recover: g,
    dismissRecovery: b
  };
}
function Uo(e, t, n) {
  const { state: o } = e, { tr: r } = o;
  t !== n && r.delete(t, n);
  const i = r.doc.resolve(t), a = o.schema.nodes.horizontalRule.create(), s = i.before(i.depth), l = i.after(i.depth);
  r.replaceWith(s, l, a);
  const c = s + a.nodeSize;
  if (c < r.doc.content.size) {
    const u = r.doc.resolve(c);
    u.nodeAfter && u.nodeAfter.isTextblock ? r.setSelection(nt.create(r.doc, c + 1)) : u.nodeAfter && r.setSelection(nt.near(r.doc.resolve(c)));
  } else {
    const d = o.schema.nodes.paragraph.create();
    r.insert(c, d), r.setSelection(nt.create(r.doc, c + 1));
  }
  r.scrollIntoView(), e.view.dispatch(r);
}
function Ev(e, {
  editor: t,
  turndownService: n,
  editorModeRef: o,
  handleModeSwitch: r,
  wordCount: i,
  autoSaveState: a,
  setIsFindReplaceOpen: s,
  setFindReplaceFocusTrigger: l
}) {
  Md(e, () => ({
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
      words: i.words,
      characters: i.characters,
      charactersWithSpaces: i.charactersWithSpaces
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
      t && Uo(t, t.state.selection.from, t.state.selection.from);
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
      s(!0), l((c) => c + 1);
    },
    closeFindReplace: () => s(!1),
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
  }), [t, n, r, i, a, s]);
}
const Tv = new Ie("tableCellMenu");
let xa = !1, Po = null;
function Sv() {
  xa || (xa = !0, document.addEventListener("mouseover", (e) => {
    const n = e.target.closest("td, th");
    if (n && n.closest(".ProseMirror")) {
      const o = n.querySelector(".table-cell-menu-btn");
      o && (o.style.opacity = "1");
    }
  }, !0), document.addEventListener("mouseout", (e) => {
    const t = e.target, n = e.relatedTarget, o = t.closest("td, th");
    if (o && o.closest(".ProseMirror")) {
      if (n && o.contains(n) || document.querySelector(".table-cell-menu-dropdown")) return;
      const i = o.querySelector(".table-cell-menu-btn");
      i && (i.style.opacity = "0");
    }
  }, !0));
}
function Mv(e) {
  return Sv(), new Pe({
    key: Tv,
    state: {
      init() {
        return _e.empty;
      },
      apply(t, n, o, r) {
        return !t.docChanged && Po ? Po.map(t.mapping, t.doc) : (Po = Dv(r.doc, e), Po);
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
  return e.descendants((o, r) => {
    if (o.type.name === "tableCell" || o.type.name === "tableHeader") {
      const i = Ye.widget(r + 1, (a) => {
        const s = document.createElement("div");
        s.className = "table-cell-menu-wrapper ProseMirror-widget", s.setAttribute("contenteditable", "false"), s.style.cssText = "position:absolute;top:2px;right:2px;z-index:50;pointer-events:auto;";
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
          t.chain().focus().setTextSelection(r + 1).run(), Av(h, t, r, g);
        }), s.appendChild(l), s;
      }, { side: -1, key: "menu-" + r });
      n.push(i);
    }
  }), _e.create(e, n);
}
function Av(e, t, n, o) {
  const r = document.querySelector(".table-cell-menu-dropdown");
  r && r.remove();
  const i = document.createElement("div");
  i.className = "table-cell-menu-dropdown";
  const a = 170, s = 280;
  let l = Math.max(0, Math.min(o.top, window.innerHeight)), c = Math.max(0, Math.min(o.bottom, window.innerHeight)), u = Math.max(0, Math.min(o.left, window.innerWidth)), d = c + 4, f = u - a + o.width + 8;
  f + a > window.innerWidth - 12 && (f = window.innerWidth - a - 12), f < 12 && (f = 12), d + s > window.innerHeight - 12 && (d = l - s - 4), d < 12 && (d = 12), d + s > window.innerHeight - 12 && (d = window.innerHeight - s - 12);
  const p = document.documentElement.classList.contains("dark"), h = p ? "#1f1f1f" : "#ffffff", g = p ? "#3a3a3a" : "#e5e5e5", b = p ? "#e5e5e5" : "#333333";
  i.style.cssText = "position:fixed;top:" + d + "px;left:" + f + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + h + ";border:1px solid " + g + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + b + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
  const v = t.state.doc.resolve(n);
  let w = !1;
  for (let D = v.depth; D >= 0; D--)
    if (v.node(D).type.name === "table") {
      v.node(D).firstChild?.firstChild?.type.name === "tableHeader" && (w = !0);
      break;
    }
  const N = [
    { label: "Insert Column Left", icon: "col-left", action: () => t.chain().focus().setTextSelection(n + 1).addColumnBefore().run() },
    { label: "Insert Column Right", icon: "col-right", action: () => t.chain().focus().setTextSelection(n + 1).addColumnAfter().run() },
    { label: "Insert Row Above", icon: "row-up", action: () => t.chain().focus().setTextSelection(n + 1).addRowBefore().run() },
    { label: "Insert Row Below", icon: "row-down", action: () => t.chain().focus().setTextSelection(n + 1).addRowAfter().run() },
    { label: "divider" },
    { label: w ? "✓ Header Row" : "  Header Row", icon: "toggle-header", action: () => t.chain().focus().setTextSelection(n + 1).toggleHeaderRow().run() },
    { label: "divider" },
    { label: "Delete Column", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteColumn().run(), destructive: !0 },
    { label: "Delete Row", icon: "delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteRow().run(), destructive: !0 },
    { label: "Delete Table", icon: "table-delete", action: () => t.chain().focus().setTextSelection(n + 1).deleteTable().run(), destructive: !0 },
    { label: "divider" },
    { label: "Copy Table", icon: "copy", action: () => Pv(t) }
  ], E = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, y = p ? "#2a2a2a" : "#f5f5f5", k = p ? "#ff6b6b" : "#dc2626", M = p ? "#999999" : "#666666", x = p ? "#333333" : "#e5e5e5";
  N.forEach((D) => {
    if (D.label === "divider") {
      const A = document.createElement("div");
      A.style.cssText = "height:1px;background:" + x + ";margin:4px 0;", i.appendChild(A);
    } else {
      const A = document.createElement("button");
      A.type = "button";
      const R = D.destructive ? k : b;
      A.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + R + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const L = E[D.icon || ""] || "", _ = D.destructive ? k : M;
      A.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + _ + ';">' + L + '</span><span style="flex:1;white-space:nowrap;">' + D.label + "</span>", A.addEventListener("mouseenter", () => {
        A.style.background = D.destructive ? p ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : y;
      }), A.addEventListener("mouseleave", () => {
        A.style.background = "transparent";
      }), A.addEventListener("click", (O) => {
        O.preventDefault(), O.stopPropagation(), D.action && D.action(), i.remove();
      }), i.appendChild(A);
    }
  }), document.body.appendChild(i);
  const C = (D) => {
    const A = D.target;
    if (i.contains(A) || A.classList.contains("table-cell-menu-btn"))
      return;
    const R = A.closest('[role="dialog"]');
    R && R.contains(i) || (i.remove(), document.removeEventListener("mousedown", C), document.removeEventListener("keydown", S));
  }, S = (D) => {
    D.key === "Escape" && (i.remove(), document.removeEventListener("mousedown", C), document.removeEventListener("keydown", S));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", C), document.addEventListener("keydown", S);
  }, 0);
}
function Pv(e) {
  const { state: t } = e, { selection: n } = t;
  let o = null;
  if (t.doc.descendants((r, i) => {
    if (r.type.name === "table" && i <= n.from && i + r.nodeSize >= n.to)
      return o = r, !1;
  }), o) {
    const r = (a) => {
      if (a.type.name === "table") return "<table>" + a.content.content.map(r).join("") + "</table>";
      if (a.type.name === "tableRow") return "<tr>" + a.content.content.map(r).join("") + "</tr>";
      if (a.type.name === "tableCell") {
        const s = a.attrs, l = s.colspan > 1 ? ' colspan="' + s.colspan + '"' : "", c = s.rowspan > 1 ? ' rowspan="' + s.rowspan + '"' : "";
        return "<td" + l + c + ">" + a.textContent + "</td>";
      }
      if (a.type.name === "tableHeader") {
        const s = a.attrs, l = s.colspan > 1 ? ' colspan="' + s.colspan + '"' : "", c = s.rowspan > 1 ? ' rowspan="' + s.rowspan + '"' : "";
        return "<th" + l + c + ">" + a.textContent + "</th>";
      }
      return a.textContent || "";
    }, i = r(o);
    navigator.clipboard.writeText(i).then(() => {
      const a = document.createElement("div");
      a.className = "tcm-toast", a.textContent = "Table copied to clipboard", a.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:6px;font-size:13px;z-index:99999;animation:fadeInOut 2s ease-in-out forwards;", document.body.appendChild(a), setTimeout(() => a.remove(), 2e3);
    });
  }
}
const Iv = Mm.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Mv(this.editor)
    ];
  }
}), Rv = Dm.extend({}), zn = new Ie("tableSorting");
let $t = null, Bn = null;
function Lv(e) {
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
function Ov(e, t, n) {
  let o = 0;
  return e.type === "number" && t.type === "number" ? o = e.value - t.value : e.type === "date" && t.type === "date" ? o = e.value.getTime() - t.value.getTime() : o = String(e.value).localeCompare(String(t.value)), n === "asc" ? o : -o;
}
function _v(e, t, n) {
  const { state: o, view: r } = e;
  let i = null;
  if (o.doc.nodesBetween(t, t + 1, (h, g) => {
    if (h.type.name === "table" && g === t)
      return i = h, !1;
  }), !i) {
    console.log("Table not found at position", t);
    return;
  }
  const a = $t?.tablePos === t && $t?.columnIndex === n && $t?.direction === "asc" ? "desc" : "asc";
  $t = { tablePos: t, columnIndex: n, direction: a }, Bn = null;
  const s = [];
  i.forEach((h) => {
    if (h.type.name === "tableRow") {
      let g = !1;
      h.forEach((b) => {
        b.type.name === "tableHeader" && (g = !0);
      }), s.push({ node: h, isHeader: g });
    }
  });
  const l = s.filter((h) => h.isHeader), c = s.filter((h) => !h.isHeader);
  if (c.length < 2) {
    Ca(n, a), r.dispatch(o.tr.setMeta(zn, { updated: !0 }));
    return;
  }
  const u = c.map((h) => {
    let g = "", b = 0;
    return h.node.forEach((v) => {
      b === n && (g = v.textContent || ""), b++;
    }), { ...h, sortValue: Lv(g) };
  }), d = u.map((h, g) => g);
  u.sort((h, g) => Ov(h.sortValue, g.sortValue, a));
  const f = u.map((h, g) => c.indexOf(h));
  if (d.some((h, g) => h !== f[g])) {
    const h = [];
    l.forEach((v) => h.push(v.node)), u.forEach((v) => h.push(v.node));
    const g = i.type.create(i.attrs, h), { tr: b } = o;
    b.replaceWith(t, t + i.nodeSize, g), b.setMeta(zn, { updated: !0 }), r.dispatch(b);
  } else
    r.dispatch(o.tr.setMeta(zn, { updated: !0 }));
  Ca(n, a);
}
function Ca(e, t) {
  const n = document.querySelector(".table-sort-toast");
  n && n.remove();
  const o = document.createElement("div");
  o.className = "table-sort-toast";
  const r = t === "asc" ? "ascending" : "descending", i = t === "asc" ? "↑" : "↓";
  o.innerHTML = '<span style="margin-right:6px;">' + i + "</span> Sorted column " + (e + 1) + " " + r;
  const a = document.documentElement.classList.contains("dark");
  o.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:" + (a ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)") + ";color:" + (a ? "#e5e5e5" : "#333") + ";padding:10px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1px solid " + (a ? "#3a3a3a" : "#e5e5e5") + ";animation:sortToastIn 0.2s ease;", document.body.appendChild(o), setTimeout(() => {
    o.style.animation = "sortToastOut 0.2s ease forwards", setTimeout(() => o.remove(), 200);
  }, 1500);
}
function $v(e, t, n, o) {
  const r = document.createElement("span");
  r.className = "table-sort-btn-inline", r.setAttribute("contenteditable", "false"), r.style.cssText = "display:inline-flex;align-items:center;margin-left:4px;vertical-align:middle;pointer-events:auto;";
  const i = document.createElement("button");
  i.className = "table-sort-btn", i.setAttribute("contenteditable", "false"), i.type = "button";
  const a = document.documentElement.classList.contains("dark"), s = a ? "#60a5fa" : "#3b82f6", l = a ? "#666" : "#aaa", c = a ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  return i.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;font-size:10px;color:" + (e ? s : l) + ";background:transparent;border:none;border-radius:3px;cursor:pointer;user-select:none;transition:all 0.15s ease;opacity:" + (e ? "1" : "0.5") + ";pointer-events:auto;vertical-align:middle;", i.addEventListener("mouseenter", () => {
    i.style.background = c, i.style.opacity = "1", i.style.color = s;
  }), i.addEventListener("mouseleave", () => {
    i.style.background = "transparent", i.style.opacity = e ? "1" : "0.5", i.style.color = e ? s : l;
  }), i.addEventListener("click", (u) => {
    u.preventDefault(), u.stopPropagation(), _v(o, t, n);
  }), e === "asc" ? (i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', i.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', i.title = "Sorted descending - Click to sort ascending") : (i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', i.title = "Click to sort this column"), r.appendChild(i), r;
}
function Wv(e) {
  return new Pe({
    key: zn,
    state: {
      init() {
        return _e.empty;
      },
      apply(t, n, o, r) {
        const i = t.getMeta(zn);
        return !t.docChanged && !i?.updated && Bn ? Bn.map(t.mapping, t.doc) : (Bn = Bv(r.doc, e), Bn);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function Bv(e, t) {
  const n = [];
  return e.descendants((o, r) => {
    if (o.type.name === "table") {
      const i = r;
      o.forEach((a, s) => {
        if (a.type.name === "tableRow") {
          let l = 0, c = 0;
          a.forEach((u, d) => {
            if (u.type.name === "tableHeader") {
              const f = r + 1 + s + 1 + c;
              let p = f + 1;
              u.forEach((N, E) => {
                N.type.name === "paragraph" && (p = f + 1 + E + N.nodeSize - 1);
              });
              const g = $t?.tablePos === i && $t?.columnIndex === l ? $t.direction : null, b = l, v = i, w = Ye.widget(p, () => $v(g, v, b, t), { side: 1, key: "sort-" + i + "-" + b });
              n.push(w);
            }
            c += u.nodeSize, l++;
          });
        }
      });
    }
  }), _e.create(e, n);
}
const Hv = Ze.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [Wv(this.editor)];
  }
});
function hs(e, t, n, o, r, i = {}) {
  const a = e.doc.nodeAt(t);
  if (!a) return !1;
  e.setNodeMarkup(t, n, a.attrs);
  const s = e.doc.nodeAt(t);
  if (!s) return !1;
  const l = [];
  s.forEach((c, u) => {
    c.type === r && l.push(t + 1 + u);
  });
  for (let c = l.length - 1; c >= 0; c--) {
    const u = l[c], d = e.doc.nodeAt(u);
    d && d.type === r && e.setNodeMarkup(u, o, i);
  }
  return !0;
}
const Fv = Am.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: o }) => {
        const { selection: r } = t, { $from: i } = r, a = t.schema.nodes.bulletList, s = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, c = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let p = i.depth; p > 0; p--) {
          const h = i.node(p);
          if (h.type === a || h.type === s || h.type === l) {
            d = h.type, f = i.before(p);
            break;
          }
        }
        if (d === a)
          return e.liftListItem("listItem");
        if (d === s || d === l) {
          if (!o) return !0;
          if (hs(n, f, a, c, u, {}))
            return o(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), zv = Pm.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: o }) => {
        const { selection: r } = t, { $from: i } = r, a = t.schema.nodes.bulletList, s = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, c = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let p = i.depth; p > 0; p--) {
          const h = i.node(p);
          if (h.type === a || h.type === s || h.type === l) {
            d = h.type, f = i.before(p);
            break;
          }
        }
        if (d === l)
          return e.liftListItem("listItem");
        if (d === s || d === a) {
          if (!o) return !0;
          if (hs(n, f, l, c, u, {}))
            return o(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Uv = Rm.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: o, dispatch: r, chain: i, can: a }) => {
        const { selection: s } = n, { $from: l, $to: c } = s, u = l.blockRange(c);
        if (!u)
          return !1;
        const d = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let p = !1;
        for (let y = l.depth; y > 0; y--)
          if (l.node(y).type === d) {
            p = !0, l.before(y);
            break;
          }
        if (p)
          return t.liftListItem("taskItem");
        const h = n.schema.nodes.bulletList, g = n.schema.nodes.orderedList, b = n.schema.nodes.listItem;
        let v = null, w = -1;
        for (let y = l.depth; y > 0; y--) {
          const k = l.node(y);
          if (k.type === h || k.type === g) {
            v = k, w = l.before(y);
            break;
          }
        }
        if (v) {
          if (!r) return !0;
          const y = w, k = o.doc.nodeAt(y);
          if (!k) return !1;
          o.setNodeMarkup(y, d, k.attrs);
          const M = o.doc.nodeAt(y);
          if (!M) return !1;
          const x = [];
          M.forEach((C, S) => {
            C.type === b && x.push(y + 1 + S);
          });
          for (let C = x.length - 1; C >= 0; C--) {
            const S = x[C], D = o.doc.nodeAt(S);
            D && D.type === b && o.setNodeMarkup(S, f, { checked: !1 });
          }
          return r(o), !0;
        }
        if (!r) return !0;
        const N = Us(u, d);
        if (N) {
          o.wrap(u, N);
          const { $from: y } = o.selection;
          let k = -1;
          for (let M = y.depth; M > 0; M--)
            if (y.node(M).type === d) {
              k = y.before(M);
              break;
            }
          if (k >= 0) {
            const M = o.doc.nodeAt(k);
            if (M) {
              const x = [];
              M.forEach((C, S) => {
                C.type === b && x.push(k + 1 + S);
              });
              for (let C = x.length - 1; C >= 0; C--) {
                const S = x[C], D = o.doc.nodeAt(S);
                D && D.type === b && o.setNodeMarkup(S, f, { checked: !1 });
              }
            }
          }
          return r(o), !0;
        }
        const E = Us(u, h);
        if (E) {
          o.wrap(u, E);
          const { $from: y } = o.selection;
          let k = -1;
          for (let M = y.depth; M > 0; M--)
            if (y.node(M).type === h) {
              k = y.before(M);
              break;
            }
          return k >= 0 && hs(o, k, d, f, b, { checked: !1 }), r(o), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), Yv = Lm.extend({
  content: "paragraph block*",
  addKeyboardShortcuts() {
    return {
      ...this.parent?.() || {},
      Enter: () => {
        const { editor: t } = this, { state: n } = t, { $from: o, $to: r } = n.selection;
        if (!o.sameParent(r) || o.pos !== r.pos)
          return t.commands.splitListItem(this.name);
        let i = -1;
        for (let d = o.depth; d >= 1; d--)
          if (o.node(d).type.name === "taskItem") {
            i = d;
            break;
          }
        if (i === -1)
          return t.commands.splitListItem(this.name);
        const a = o.node(i);
        if (!a.attrs.checked)
          return t.commands.splitListItem(this.name);
        const l = o.start(i), c = a.firstChild;
        if (!c || !c.isTextblock)
          return t.commands.splitListItem(this.name);
        if (o.pos - l <= 1) {
          const d = o.before(i), { tr: f } = n, p = n.schema.nodes.taskItem, h = n.schema.nodes.paragraph, g = p.create(
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
      new Pe({
        key: new Ie("taskItemInputRule"),
        props: {
          handleTextInput(n, o, r, i) {
            if (i !== " ") return !1;
            const { state: a } = n, s = a.doc.resolve(o), l = s.parent.textBetween(
              0,
              s.parentOffset,
              void 0,
              "￼"
            ), u = /^\s*(-\s*)?\[([( |x])?\]$/.exec(l);
            if (!u) return !1;
            const d = u[2] === "x", f = s.start() + (u.index || 0), p = o, h = a.tr;
            h.delete(f, p);
            const b = h.doc.resolve(f).blockRange();
            if (!b || !t || !e) return !1;
            const v = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: d } }
            ];
            if (h.wrap(b, v), f > 1) {
              const w = h.doc.resolve(f - 1).nodeBefore;
              w && w.type === t && Om(h.doc, f - 1) && h.join(f - 1);
            }
            return n.dispatch(h), !0;
          }
        }
      })
    ];
  }
}), jv = Im.extend({
  content: "paragraph block*"
}), Ea = new Ie("collapsibleList");
function xi(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function Ci(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((o) => {
    t.includes(o.type.name) && (n = !0);
  }), n;
}
function Vv(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let o = -1, r = -1, i = t + 1;
  return e.forEach((a) => {
    n.includes(a.type.name) && (o === -1 && (o = i), r = i + a.nodeSize), i += a.nodeSize;
  }), o === -1 ? null : { start: o, end: r };
}
let un = null;
function Zr(e, t, n) {
  const o = [];
  return e.descendants((r, i) => {
    if (!n.listItemTypes.includes(r.type.name) || !Ci(r))
      return !0;
    const a = xi(r, i), s = t.collapsedItems.has(a);
    o.push(
      Ye.node(i, i + r.nodeSize, {
        class: `collapsible-list-item ${s ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": a
      })
    );
    const l = r.firstChild;
    if (l && l.type.name === "paragraph") {
      const c = i + 1 + l.nodeSize - 1, u = Ye.widget(
        c,
        () => {
          const d = CSS.escape(a), f = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${d}"]`
          );
          if (f) {
            f.classList.contains("collapsed") !== s && (f.classList.remove("collapsed", "expanded"), f.classList.add(s ? "collapsed" : "expanded"), f.title = s ? "Click to expand" : "Click to collapse");
            const b = f.parentElement;
            if (b) return b;
          }
          const p = document.createElement("span");
          p.className = "collapsible-list-chevron-wrapper", p.setAttribute("contenteditable", "false");
          const h = document.createElement("button");
          return h.className = `collapsible-list-chevron ${s ? "collapsed" : "expanded"}`, h.setAttribute("data-list-item-id", a), h.setAttribute("contenteditable", "false"), h.setAttribute("tabindex", "-1"), h.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', h.title = s ? "Click to expand" : "Click to collapse", h.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const b = h.classList.contains("collapsed");
            h.classList.remove("collapsed", "expanded"), h.classList.add(b ? "expanded" : "collapsed"), h.title = b ? "Click to collapse" : "Click to expand", t.collapsedItems.has(a) ? t.collapsedItems.delete(a) : t.collapsedItems.add(a), un && un.dispatch(
              un.state.tr.setMeta("collapsibleList", { toggled: a })
            );
          }), p.appendChild(h), p;
        },
        { side: 1, key: `list-chevron-${a}` }
      );
      o.push(u);
    }
    if (s && Vv(r, i)) {
      let u = i + 1;
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
const Kv = Ze.create({
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
        if (!r || !this.options.listItemTypes.includes(r.type.name) || !Ci(r))
          return !1;
        const i = xi(r, e);
        return o.collapsedItems.has(i) ? o.collapsedItems.delete(i) : o.collapsedItems.add(i), t.view.dispatch(n.setMeta("collapsibleList", { toggled: i })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((r, i) => {
          this.options.listItemTypes.includes(r.type.name) && Ci(r) && n.collapsedItems.add(xi(r, i));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Pe({
        key: Ea,
        view(n) {
          return un = n, {
            update(o) {
              un = o;
            },
            destroy() {
              un = null;
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
          apply(n, o, r, i) {
            return n.getMeta("collapsibleList") || n.docChanged ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: Zr(i.doc, e, t),
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
}), be = Fm();
be.register("javascript", ji);
be.register("js", ji);
be.register("jsx", ji);
be.register("typescript", Vi);
be.register("ts", Vi);
be.register("tsx", Vi);
be.register("python", vl);
be.register("py", vl);
be.register("xml", Ki);
be.register("html", Ki);
be.register("svg", Ki);
be.register("css", zm);
be.register("json", Um);
be.register("bash", lr);
be.register("sh", lr);
be.register("shell", lr);
be.register("zsh", lr);
const Ei = {
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
async function Gv(e) {
  if (be.registered(e)) return !0;
  const t = Ei[e];
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
    for (const i of r)
      if (i.includes(e))
        for (const a of i)
          a !== e && !be.registered(a) && (be.register(a, o), Ro.add(a));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Io.delete(e);
  }
}
function qv({ node: e, updateAttributes: t, extension: n }) {
  const [o, r] = Y(!1), [i, a] = Y(!1), [s, l] = Y(!0), c = j(null), u = e.attrs.language || "plaintext";
  q(() => {
    const g = c.current;
    if (!g || i) return;
    const b = new IntersectionObserver(
      (v) => {
        for (const w of v)
          w.isIntersecting && (a(!0), b.unobserve(g));
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
  }, [i]), q(() => {
    if (i && u !== "plaintext") {
      if (be.registered(u)) {
        l(!0);
        return;
      }
      Ei[u] && (l(!1), Gv(u).then((g) => {
        l(g);
      }));
    }
  }, [i, u]);
  const d = H(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), r(!0), setTimeout(() => r(!1), 2e3);
    } catch (g) {
      console.error("Failed to copy:", g);
    }
  }, [e.textContent]), f = n.options.lowlight?.listLanguages?.() || [], p = Array.from(/* @__PURE__ */ new Set([...f, ...Object.keys(Ei)])).sort(), h = u === "plaintext" ? "Plain Text" : u.charAt(0).toUpperCase() + u.slice(1);
  return /* @__PURE__ */ m(hn, { className: "code-block-wrapper", ref: c, children: [
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
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 265,
                columnNumber: 13
              }, this),
              p.map((g) => /* @__PURE__ */ m("option", { value: g, children: g.charAt(0).toUpperCase() + g.slice(1) }, g, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 267,
                columnNumber: 15
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 260,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m("span", { className: "code-block-language-label", children: h }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 272,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Mt, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 273,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
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
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 281,
            columnNumber: 21
          }, this) : /* @__PURE__ */ m(Nn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 281,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 275,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 258,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!i || !s ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m(Mi, { className: i && s ? `language-${u}` : "language-plaintext" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 288,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 287,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
    lineNumber: 256,
    columnNumber: 5
  }, this);
}
const Xv = Hm.extend({
  addNodeView() {
    return or(qv);
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
    (s) => {
      o?.(s), s.stopPropagation();
    },
    [o]
  ), i = H((s) => {
    s.stopPropagation();
  }, []), a = H((s) => {
    s.stopPropagation();
  }, []);
  return wm(
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
        onPointerDown: i,
        onClick: a,
        children: e
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DialogSafePortal.tsx",
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
  note: { icon: cl, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: ll, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: Hi, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: Fi, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" }
};
function Zv({ node: e, updateAttributes: t, editor: n }) {
  const [o, r] = Y(!1), [i, a] = Y(!1), [s, l] = Y(null), c = j(null), u = j(null), d = e.attrs.type || "info", f = Lo[d] || Lo.info, p = f.icon, h = H(() => {
    if (u.current) {
      const w = u.current.getBoundingClientRect();
      l({
        top: w.bottom + 4,
        left: w.left
      });
    }
  }, []);
  q(() => {
    if (!o) return;
    const w = (N) => {
      c.current && !c.current.contains(N.target) && u.current && !u.current.contains(N.target) && r(!1);
    };
    return document.addEventListener("mousedown", w), document.addEventListener("touchstart", w, { passive: !0 }), () => {
      document.removeEventListener("mousedown", w), document.removeEventListener("touchstart", w);
    };
  }, [o]), q(() => {
    if (!o) return;
    const w = () => r(!1);
    return window.addEventListener("scroll", w, !0), () => window.removeEventListener("scroll", w, !0);
  }, [o]);
  const g = H(() => {
    n.isEditable && (o || h(), r(!o));
  }, [n.isEditable, o, h]), b = (w) => {
    t({ type: w }), r(!1);
  }, v = H((w) => {
    w.stopPropagation(), a((N) => !N);
  }, []);
  return /* @__PURE__ */ m(hn, { className: `callout callout-${d}${i ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
    /* @__PURE__ */ m(
      "div",
      {
        className: "callout-header",
        contentEditable: !1,
        onClick: v,
        style: { cursor: "pointer" },
        title: i ? "Click to expand" : "Click to collapse",
        children: [
          /* @__PURE__ */ m(
            "button",
            {
              ref: u,
              className: "callout-header-button",
              onClick: (w) => {
                w.stopPropagation(), g();
              },
              title: n.isEditable ? "Click to change callout type" : f.label,
              style: { color: f.borderColor },
              contentEditable: !1,
              children: [
                /* @__PURE__ */ m(p, { size: 18 }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 126,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ m("span", { className: "callout-label", children: f.label }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 127,
                  columnNumber: 11
                }, this),
                n.isEditable && /* @__PURE__ */ m(Mt, { size: 12, className: "callout-type-chevron" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 128,
                  columnNumber: 33
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 115,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: f.borderColor },
              children: i ? /* @__PURE__ */ m(ul, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 134,
                columnNumber: 24
              }, this) : /* @__PURE__ */ m(Mt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 134,
                columnNumber: 53
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 130,
              columnNumber: 9
            },
            this
          ),
          o && n.isEditable && s && /* @__PURE__ */ m(Nt, { children: /* @__PURE__ */ m(
            "div",
            {
              ref: c,
              className: "callout-type-dropdown",
              contentEditable: !1,
              style: {
                position: "fixed",
                top: s.top,
                left: s.left
              },
              children: Object.keys(Lo).map((w) => {
                const N = Lo[w], E = N.icon;
                return /* @__PURE__ */ m(
                  "button",
                  {
                    className: `callout-type-option ${w === d ? "active" : ""}`,
                    onClick: (y) => {
                      y.stopPropagation(), b(w);
                    },
                    onMouseDown: (y) => y.stopPropagation(),
                    style: { "--callout-option-color": N.color },
                    children: [
                      /* @__PURE__ */ m(E, { size: 16, style: { color: N.borderColor } }, void 0, !1, {
                        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                        lineNumber: 163,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ m("span", { children: N.label }, void 0, !1, {
                        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                        lineNumber: 164,
                        columnNumber: 19
                      }, this)
                    ]
                  },
                  w,
                  !0,
                  {
                    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                    lineNumber: 153,
                    columnNumber: 17
                  },
                  this
                );
              })
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 139,
              columnNumber: 11
            },
            this
          ) }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
            lineNumber: 138,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
        lineNumber: 108,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m("div", { className: `callout-content${i ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ m(Mi, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 175,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 174,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/extensions/CalloutWithMenu.tsx",
    lineNumber: 106,
    columnNumber: 5
  }, this);
}
const Qv = ar.create({
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
      kn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return or(Zv);
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
}), Jv = Ym.extend({
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
      const i = document.createElement("figure");
      i.classList.add("image-resizer");
      const a = (P) => {
        const B = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[P] || "margin-left: auto; margin-right: auto;";
        i.style.cssText = `display: block; position: relative; width: fit-content; ${B}`;
      };
      a(t.attrs.align || "left");
      const s = document.createElement("img");
      s.alt = t.attrs.alt || "", t.attrs.width && (s.style.width = `${t.attrs.width}px`);
      const l = (P) => !(!P || P.startsWith("data:") || P.startsWith("blob:") || P.startsWith("http://") || P.startsWith("https://")), c = (P) => {
        l(P) && e.resolveImageSrc ? (s.style.opacity = "0.5", s.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(P).then((B) => {
          s.src = B, s.style.opacity = "1";
        }).catch(() => {
          s.src = P, s.style.opacity = "1";
        })) : s.src = P;
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
      const p = (P, B, K) => {
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
        `, V.innerHTML = `${B}<span>${P}</span>`, V.addEventListener("mouseenter", () => {
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
          const B = s.getBoundingClientRect();
          e.onImageClick({
            src: r.attrs.src,
            alt: r.attrs.alt || "",
            pos: P,
            rect: B
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
            const B = new window.Image();
            B.crossOrigin = "anonymous", await new Promise((G, Q) => {
              B.onload = () => G(), B.onerror = () => Q(new Error("Image load failed")), B.src = P;
            });
            const K = document.createElement("canvas");
            K.width = B.naturalWidth, K.height = B.naturalHeight;
            const V = K.getContext("2d");
            if (V) {
              V.drawImage(B, 0, 0);
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
        const P = r.attrs.src, B = r.attrs.alt || "image", K = document.createElement("a");
        K.href = P, K.download = B, K.target = "_blank", K.rel = "noopener noreferrer", document.body.appendChild(K), K.click(), setTimeout(() => {
          document.body.removeChild(K);
        }, 100);
      }));
      const w = document.createElement("div");
      w.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, f.appendChild(w);
      const N = document.createElement("div");
      N.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: oklch(0.55 0 0);
        padding: 4px 12px 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `, N.textContent = "Alignment", f.appendChild(N);
      const E = document.createElement("div");
      E.style.cssText = `
        display: flex;
        margin: 4px 8px 4px;
        background: oklch(0.94 0 0);
        border-radius: 8px;
        padding: 3px;
        gap: 2px;
      `;
      const y = [
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
      ], k = [], M = (P) => {
        k.forEach((B) => {
          (B.getAttribute("data-align-value") || "left") === P ? (B.style.background = "oklch(1 0 0)", B.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", B.style.color = "oklch(0.25 0 0)", B.style.fontWeight = "600") : (B.style.background = "transparent", B.style.boxShadow = "none", B.style.color = "oklch(0.5 0 0)", B.style.fontWeight = "400");
        });
      };
      y.forEach(({ value: P, label: B, icon: K }) => {
        const V = document.createElement("button");
        V.setAttribute("type", "button"), V.setAttribute("data-align-value", P), V.setAttribute("title", `Align ${B.toLowerCase()}`), V.style.cssText = `
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
        `, V.innerHTML = `${K}<span>${B}</span>`, V.addEventListener("click", (G) => {
          G.preventDefault(), G.stopPropagation();
          const Q = typeof o == "function" ? o() : null;
          if (Q != null)
            try {
              const { state: W, dispatch: $ } = n.view, z = W.doc.nodeAt(Q);
              if (z && z.type.name === "resizableImage") {
                const Z = W.tr.setNodeMarkup(Q, void 0, {
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
        }), k.push(V), E.appendChild(V);
      }), f.appendChild(E);
      const x = () => {
        const P = r.attrs.align || "left";
        M(P);
      };
      let C = !1;
      d.addEventListener("click", (P) => {
        if (P.preventDefault(), P.stopPropagation(), C)
          f.style.display = "none", C = !1;
        else {
          const B = d.getBoundingClientRect(), K = 200, V = f.closest('[role="dialog"]');
          let G = 0, Q = 0;
          if (V) {
            const de = V.getBoundingClientRect();
            G = de.left, Q = de.top;
          }
          let W = B.bottom + 4 - Q, $ = B.right - K - G;
          const z = window.innerHeight, Z = window.innerWidth, ce = 200;
          B.bottom + 4 + ce > z && (W = B.top - ce - 4 - Q), $ + G < 8 && ($ = 8 - G), $ + K + G > Z - 8 && ($ = Z - K - 8 - G), f.style.top = `${W}px`, f.style.left = `${$}px`, f.style.display = "flex", C = !0, x();
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
      }), i.appendChild(s), i.appendChild(D), i.appendChild(u), i.appendChild(d);
      const A = i.closest('[role="dialog"]');
      A ? A.appendChild(f) : document.body.appendChild(f), i.addEventListener("mouseenter", () => {
        u.style.opacity = "1", d.style.opacity = "1", D.style.opacity = "1";
      }), i.addEventListener("mouseleave", () => {
        u.style.opacity = "0", D.style.opacity = "0", C || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const R = (P) => {
        P.preventDefault(), P.stopPropagation();
        const B = document.createElement("div");
        B.style.cssText = `
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
        K.src = s.src, K.alt = s.alt || "", K.style.cssText = `
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
        const W = () => {
          B.style.opacity = "0", K.style.transform = "scale(0.92)", setTimeout(() => B.remove(), 200);
        };
        B.addEventListener("click", (Z) => {
          Z.target === B && W();
        }), V.addEventListener("click", W);
        const $ = (Z) => {
          Z.key === "Escape" && (W(), document.removeEventListener("keydown", $));
        };
        document.addEventListener("keydown", $), B.appendChild(K), B.appendChild(V), Q && B.appendChild(Q);
        const z = i.closest('[role="dialog"]');
        z ? z.appendChild(B) : document.body.appendChild(B), requestAnimationFrame(() => {
          B.style.opacity = "1", K.style.transform = "scale(1)";
        });
      };
      D.addEventListener("click", R);
      let L, _;
      const O = (P) => {
        P.preventDefault(), L = P.clientX, _ = s.offsetWidth, document.addEventListener("mousemove", U), document.addEventListener("mouseup", I);
      }, U = (P) => {
        const B = P.clientX - L, K = Math.max(100, _ + B);
        s.style.width = `${K}px`;
      }, I = () => {
        document.removeEventListener("mousemove", U), document.removeEventListener("mouseup", I), setTimeout(() => {
        }, 100);
        const P = typeof o == "function" ? o() : null, B = s.offsetWidth;
        if (P != null)
          try {
            const { state: K, dispatch: V } = n.view, G = K.doc.nodeAt(P);
            if (G && G.type.name === "resizableImage") {
              const Q = K.tr.setNodeMarkup(P, void 0, {
                ...G.attrs,
                width: B
              });
              V(Q);
            }
          } catch {
            n.chain().focus().setNodeSelection(P).updateAttributes("resizableImage", {
              width: B
            }).run();
          }
      };
      return u.addEventListener("mousedown", O), {
        dom: i,
        update: (P) => P.type.name !== "resizableImage" ? !1 : (r = P, c(P.attrs.src), s.alt = P.attrs.alt || "", P.attrs.width && (s.style.width = `${P.attrs.width}px`), a(P.attrs.align || "left"), !0),
        destroy: () => {
          u.removeEventListener("mousedown", O), D.removeEventListener("click", R), document.removeEventListener("click", S), f.remove();
        }
      };
    };
  }
});
function ew(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const tw = {}, Hn = {};
function Wt(e, t) {
  try {
    const o = (tw[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return o in Hn ? Hn[o] : Ta(o, o.split(":"));
  } catch {
    if (e in Hn) return Hn[e];
    const n = e?.match(nw);
    return n ? Ta(e, n.slice(1)) : NaN;
  }
}
const nw = /([+-]\d\d):?(\d\d)?/;
function Ta(e, t) {
  const n = +(t[0] || 0), o = +(t[1] || 0), r = +(t[2] || 0) / 60;
  return Hn[e] = n * 60 + o > 0 ? n * 60 + o + r : n * 60 - o - r;
}
class tt extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Wt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), pu(this), Ti(this)) : this.setTime(Date.now());
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
    const t = -Wt(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Ti(this), +this;
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
    return Date.prototype[t].apply(this.internal, arguments), ow(this), +this;
  }, tt.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Ti(this), +this;
  }));
});
function Ti(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Wt(e.timeZone, e) * 60));
}
function ow(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), pu(e);
}
function pu(e) {
  const t = Wt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), o = /* @__PURE__ */ new Date(+e);
  o.setUTCHours(o.getUTCHours() - 1);
  const r = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), i = -(/* @__PURE__ */ new Date(+o)).getTimezoneOffset(), a = r - i, s = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && s && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const l = r - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const c = /* @__PURE__ */ new Date(+e);
  c.setUTCSeconds(0);
  const u = r > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, d = Math.round(-(Wt(e.timeZone, e) * 60)) % 60;
  (d || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + u));
  const f = Wt(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, b = p !== n, v = g - l;
  if (b && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const w = Wt(e.timeZone, e), N = w > 0 ? Math.floor(w) : Math.ceil(w), E = p - N;
    E && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + E), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + E));
  }
}
class De extends tt {
  //#region static
  static tz(t, ...n) {
    return n.length ? new De(...n, t) : new De(Date.now(), t);
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
    return `${t} GMT${n}${o}${r} (${ew(this.timeZone, this)})`;
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
    return new De(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new De(+new Date(t), this.timeZone);
  }
  //#endregion
}
const hu = 6048e5, rw = 864e5, Ma = Symbol.for("constructDateFrom");
function ye(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ma in e ? e[Ma](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function pe(e, t) {
  return ye(t || e, e);
}
function gu(e, t, n) {
  const o = pe(e, n?.in);
  return isNaN(t) ? ye(e, NaN) : (t && o.setDate(o.getDate() + t), o);
}
function bu(e, t, n) {
  const o = pe(e, n?.in);
  if (isNaN(t)) return ye(e, NaN);
  if (!t)
    return o;
  const r = o.getDate(), i = ye(e, o.getTime());
  i.setMonth(o.getMonth() + t + 1, 0);
  const a = i.getDate();
  return r >= a ? i : (o.setFullYear(
    i.getFullYear(),
    i.getMonth(),
    r
  ), o);
}
let iw = {};
function ro() {
  return iw;
}
function vn(e, t) {
  const n = ro(), o = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = pe(e, t?.in), i = r.getDay(), a = (i < o ? 7 : 0) + i - o;
  return r.setDate(r.getDate() - a), r.setHours(0, 0, 0, 0), r;
}
function Zn(e, t) {
  return vn(e, { ...t, weekStartsOn: 1 });
}
function vu(e, t) {
  const n = pe(e, t?.in), o = n.getFullYear(), r = ye(n, 0);
  r.setFullYear(o + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const i = Zn(r), a = ye(n, 0);
  a.setFullYear(o, 0, 4), a.setHours(0, 0, 0, 0);
  const s = Zn(a);
  return n.getTime() >= i.getTime() ? o + 1 : n.getTime() >= s.getTime() ? o : o - 1;
}
function Da(e) {
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
function Mn(e, ...t) {
  const n = ye.bind(
    null,
    t.find((o) => typeof o == "object")
  );
  return t.map(n);
}
function Qn(e, t) {
  const n = pe(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function wu(e, t, n) {
  const [o, r] = Mn(
    n?.in,
    e,
    t
  ), i = Qn(o), a = Qn(r), s = +i - Da(i), l = +a - Da(a);
  return Math.round((s - l) / rw);
}
function sw(e, t) {
  const n = vu(e, t), o = ye(e, 0);
  return o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0), Zn(o);
}
function aw(e, t, n) {
  return gu(e, t * 7, n);
}
function lw(e, t, n) {
  return bu(e, t * 12, n);
}
function cw(e, t) {
  let n, o = t?.in;
  return e.forEach((r) => {
    !o && typeof r == "object" && (o = ye.bind(null, r));
    const i = pe(r, o);
    (!n || n < i || isNaN(+i)) && (n = i);
  }), ye(o, n || NaN);
}
function uw(e, t) {
  let n, o = t?.in;
  return e.forEach((r) => {
    !o && typeof r == "object" && (o = ye.bind(null, r));
    const i = pe(r, o);
    (!n || n > i || isNaN(+i)) && (n = i);
  }), ye(o, n || NaN);
}
function dw(e, t, n) {
  const [o, r] = Mn(
    n?.in,
    e,
    t
  );
  return +Qn(o) == +Qn(r);
}
function Nu(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function mw(e) {
  return !(!Nu(e) && typeof e != "number" || isNaN(+pe(e)));
}
function fw(e, t, n) {
  const [o, r] = Mn(
    n?.in,
    e,
    t
  ), i = o.getFullYear() - r.getFullYear(), a = o.getMonth() - r.getMonth();
  return i * 12 + a;
}
function pw(e, t) {
  const n = pe(e, t?.in), o = n.getMonth();
  return n.setFullYear(n.getFullYear(), o + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function yu(e, t) {
  const [n, o] = Mn(e, t.start, t.end);
  return { start: n, end: o };
}
function hw(e, t) {
  const { start: n, end: o } = yu(t?.in, e);
  let r = +n > +o;
  const i = r ? +n : +o, a = r ? o : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let s = 1;
  const l = [];
  for (; +a <= i; )
    l.push(ye(n, a)), a.setMonth(a.getMonth() + s);
  return r ? l.reverse() : l;
}
function gw(e, t) {
  const n = pe(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function bw(e, t) {
  const n = pe(e, t?.in), o = n.getFullYear();
  return n.setFullYear(o + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function ku(e, t) {
  const n = pe(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function vw(e, t) {
  const { start: n, end: o } = yu(t?.in, e);
  let r = +n > +o;
  const i = r ? +n : +o, a = r ? o : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let s = 1;
  const l = [];
  for (; +a <= i; )
    l.push(ye(n, a)), a.setFullYear(a.getFullYear() + s);
  return r ? l.reverse() : l;
}
function xu(e, t) {
  const n = ro(), o = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = pe(e, t?.in), i = r.getDay(), a = (i < o ? -7 : 0) + 6 - (i - o);
  return r.setDate(r.getDate() + a), r.setHours(23, 59, 59, 999), r;
}
function ww(e, t) {
  return xu(e, { ...t, weekStartsOn: 1 });
}
const Nw = {
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
}, yw = (e, t, n) => {
  let o;
  const r = Nw[e];
  return typeof r == "string" ? o = r : t === 1 ? o = r.one : o = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + o : o + " ago" : o;
};
function Qr(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const kw = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, xw = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Cw = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Ew = {
  date: Qr({
    formats: kw,
    defaultWidth: "full"
  }),
  time: Qr({
    formats: xw,
    defaultWidth: "full"
  }),
  dateTime: Qr({
    formats: Cw,
    defaultWidth: "full"
  })
}, Tw = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Sw = (e, t, n, o) => Tw[e];
function _n(e) {
  return (t, n) => {
    const o = n?.context ? String(n.context) : "standalone";
    let r;
    if (o === "formatting" && e.formattingValues) {
      const a = e.defaultFormattingWidth || e.defaultWidth, s = n?.width ? String(n.width) : a;
      r = e.formattingValues[s] || e.formattingValues[a];
    } else {
      const a = e.defaultWidth, s = n?.width ? String(n.width) : e.defaultWidth;
      r = e.values[s] || e.values[a];
    }
    const i = e.argumentCallback ? e.argumentCallback(t) : t;
    return r[i];
  };
}
const Mw = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Dw = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Aw = {
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
}, Pw = {
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
}, Iw = {
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
}, Rw = {
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
}, Lw = (e, t) => {
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
}, Ow = {
  ordinalNumber: Lw,
  era: _n({
    values: Mw,
    defaultWidth: "wide"
  }),
  quarter: _n({
    values: Dw,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: _n({
    values: Aw,
    defaultWidth: "wide"
  }),
  day: _n({
    values: Pw,
    defaultWidth: "wide"
  }),
  dayPeriod: _n({
    values: Iw,
    defaultWidth: "wide",
    formattingValues: Rw,
    defaultFormattingWidth: "wide"
  })
};
function $n(e) {
  return (t, n = {}) => {
    const o = n.width, r = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth], i = t.match(r);
    if (!i)
      return null;
    const a = i[0], s = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(s) ? $w(s, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      _w(s, (d) => d.test(a))
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
function _w(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function $w(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Ww(e) {
  return (t, n = {}) => {
    const o = t.match(e.matchPattern);
    if (!o) return null;
    const r = o[0], i = t.match(e.parsePattern);
    if (!i) return null;
    let a = e.valueCallback ? e.valueCallback(i[0]) : i[0];
    a = n.valueCallback ? n.valueCallback(a) : a;
    const s = t.slice(r.length);
    return { value: a, rest: s };
  };
}
const Bw = /^(\d+)(th|st|nd|rd)?/i, Hw = /\d+/i, Fw = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, zw = {
  any: [/^b/i, /^(a|c)/i]
}, Uw = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Yw = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, jw = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Vw = {
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
}, Kw = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Gw = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, qw = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Xw = {
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
}, Zw = {
  ordinalNumber: Ww({
    matchPattern: Bw,
    parsePattern: Hw,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: $n({
    matchPatterns: Fw,
    defaultMatchWidth: "wide",
    parsePatterns: zw,
    defaultParseWidth: "any"
  }),
  quarter: $n({
    matchPatterns: Uw,
    defaultMatchWidth: "wide",
    parsePatterns: Yw,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: $n({
    matchPatterns: jw,
    defaultMatchWidth: "wide",
    parsePatterns: Vw,
    defaultParseWidth: "any"
  }),
  day: $n({
    matchPatterns: Kw,
    defaultMatchWidth: "wide",
    parsePatterns: Gw,
    defaultParseWidth: "any"
  }),
  dayPeriod: $n({
    matchPatterns: qw,
    defaultMatchWidth: "any",
    parsePatterns: Xw,
    defaultParseWidth: "any"
  })
}, gs = {
  code: "en-US",
  formatDistance: yw,
  formatLong: Ew,
  formatRelative: Sw,
  localize: Ow,
  match: Zw,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Qw(e, t) {
  const n = pe(e, t?.in);
  return wu(n, ku(n)) + 1;
}
function Cu(e, t) {
  const n = pe(e, t?.in), o = +Zn(n) - +sw(n);
  return Math.round(o / hu) + 1;
}
function Eu(e, t) {
  const n = pe(e, t?.in), o = n.getFullYear(), r = ro(), i = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = ye(t?.in || e, 0);
  a.setFullYear(o + 1, 0, i), a.setHours(0, 0, 0, 0);
  const s = vn(a, t), l = ye(t?.in || e, 0);
  l.setFullYear(o, 0, i), l.setHours(0, 0, 0, 0);
  const c = vn(l, t);
  return +n >= +s ? o + 1 : +n >= +c ? o : o - 1;
}
function Jw(e, t) {
  const n = ro(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, r = Eu(e, t), i = ye(t?.in || e, 0);
  return i.setFullYear(r, 0, o), i.setHours(0, 0, 0, 0), vn(i, t);
}
function Tu(e, t) {
  const n = pe(e, t?.in), o = +vn(n, t) - +Jw(n, t);
  return Math.round(o / hu) + 1;
}
function fe(e, t) {
  const n = e < 0 ? "-" : "", o = Math.abs(e).toString().padStart(t, "0");
  return n + o;
}
const Ct = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), o = n > 0 ? n : 1 - n;
    return fe(t === "yy" ? o % 100 : o, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : fe(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return fe(e.getDate(), t.length);
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
    return fe(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return fe(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return fe(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return fe(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, o = e.getMilliseconds(), r = Math.trunc(
      o * Math.pow(10, n - 3)
    );
    return fe(r, t.length);
  }
}, on = {
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
    return Ct.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, o) {
    const r = Eu(e, o), i = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const a = i % 100;
      return fe(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(i, { unit: "year" }) : fe(i, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = vu(e);
    return fe(n, t.length);
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
    return fe(n, t.length);
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
        return fe(o, 2);
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
        return fe(o, 2);
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
        return Ct.M(e, t);
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
        return fe(o + 1, 2);
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
    return t === "wo" ? n.ordinalNumber(r, { unit: "week" }) : fe(r, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const o = Cu(e);
    return t === "Io" ? n.ordinalNumber(o, { unit: "week" }) : fe(o, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Ct.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const o = Qw(e);
    return t === "Do" ? n.ordinalNumber(o, { unit: "dayOfYear" }) : fe(o, t.length);
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
    const r = e.getDay(), i = (r - o.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(i);
      // Padded numerical value
      case "ee":
        return fe(i, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return n.ordinalNumber(i, { unit: "day" });
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
    const r = e.getDay(), i = (r - o.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(i);
      // Padded numerical value
      case "cc":
        return fe(i, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return n.ordinalNumber(i, { unit: "day" });
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
        return fe(r, t.length);
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
    switch (o === 12 ? r = on.noon : o === 0 ? r = on.midnight : r = o / 12 >= 1 ? "pm" : "am", t) {
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
    switch (o >= 17 ? r = on.evening : o >= 12 ? r = on.afternoon : o >= 4 ? r = on.morning : r = on.night, t) {
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
    return Ct.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Ct.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const o = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(o, { unit: "hour" }) : fe(o, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let o = e.getHours();
    return o === 0 && (o = 24), t === "ko" ? n.ordinalNumber(o, { unit: "hour" }) : fe(o, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Ct.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Ct.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Ct.S(e, t);
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
        return Ot(o);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Ot(o, ":");
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
        return Ot(o);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Ot(o, ":");
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
        return "GMT" + Ot(o, ":");
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
        return "GMT" + Ot(o, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const o = Math.trunc(+e / 1e3);
    return fe(o, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return fe(+e, t.length);
  }
};
function Pa(e, t = "") {
  const n = e > 0 ? "-" : "+", o = Math.abs(e), r = Math.trunc(o / 60), i = o % 60;
  return i === 0 ? n + String(r) : n + String(r) + t + fe(i, 2);
}
function Ia(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + fe(Math.abs(e) / 60, 2) : Ot(e, t);
}
function Ot(e, t = "") {
  const n = e > 0 ? "-" : "+", o = Math.abs(e), r = fe(Math.trunc(o / 60), 2), i = fe(o % 60, 2);
  return n + r + t + i;
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
}, eN = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], o = n[1], r = n[2];
  if (!r)
    return Ra(e, t);
  let i;
  switch (o) {
    case "P":
      i = t.dateTime({ width: "short" });
      break;
    case "PP":
      i = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      i = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      i = t.dateTime({ width: "full" });
      break;
  }
  return i.replace("{{date}}", Ra(o, t)).replace("{{time}}", Su(r, t));
}, tN = {
  p: Su,
  P: eN
}, nN = /^D+$/, oN = /^Y+$/, rN = ["D", "DD", "YY", "YYYY"];
function iN(e) {
  return nN.test(e);
}
function sN(e) {
  return oN.test(e);
}
function aN(e, t, n) {
  const o = lN(e, t, n);
  if (console.warn(o), rN.includes(e)) throw new RangeError(o);
}
function lN(e, t, n) {
  const o = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${o} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const cN = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, uN = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, dN = /^'([^]*?)'?$/, mN = /''/g, fN = /[a-zA-Z]/;
function pN(e, t, n) {
  const o = ro(), r = n?.locale ?? o.locale ?? gs, i = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? o.weekStartsOn ?? o.locale?.options?.weekStartsOn ?? 0, s = pe(e, n?.in);
  if (!mw(s))
    throw new RangeError("Invalid time value");
  let l = t.match(uN).map((u) => {
    const d = u[0];
    if (d === "p" || d === "P") {
      const f = tN[d];
      return f(u, r.formatLong);
    }
    return u;
  }).join("").match(cN).map((u) => {
    if (u === "''")
      return { isToken: !1, value: "'" };
    const d = u[0];
    if (d === "'")
      return { isToken: !1, value: hN(u) };
    if (Aa[d])
      return { isToken: !0, value: u };
    if (d.match(fN))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: u };
  });
  r.localize.preprocessor && (l = r.localize.preprocessor(s, l));
  const c = {
    firstWeekContainsDate: i,
    weekStartsOn: a,
    locale: r
  };
  return l.map((u) => {
    if (!u.isToken) return u.value;
    const d = u.value;
    (!n?.useAdditionalWeekYearTokens && sN(d) || !n?.useAdditionalDayOfYearTokens && iN(d)) && aN(d, t, String(e));
    const f = Aa[d[0]];
    return f(s, d, r.localize, c);
  }).join("");
}
function hN(e) {
  const t = e.match(dN);
  return t ? t[1].replace(mN, "'") : e;
}
function gN(e, t) {
  const n = pe(e, t?.in), o = n.getFullYear(), r = n.getMonth(), i = ye(n, 0);
  return i.setFullYear(o, r + 1, 0), i.setHours(0, 0, 0, 0), i.getDate();
}
function bN(e, t) {
  return pe(e, t?.in).getMonth();
}
function vN(e, t) {
  return pe(e, t?.in).getFullYear();
}
function wN(e, t) {
  return +pe(e) > +pe(t);
}
function NN(e, t) {
  return +pe(e) < +pe(t);
}
function yN(e, t, n) {
  const [o, r] = Mn(
    n?.in,
    e,
    t
  );
  return o.getFullYear() === r.getFullYear() && o.getMonth() === r.getMonth();
}
function kN(e, t, n) {
  const [o, r] = Mn(
    n?.in,
    e,
    t
  );
  return o.getFullYear() === r.getFullYear();
}
function xN(e, t, n) {
  const o = pe(e, n?.in), r = o.getFullYear(), i = o.getDate(), a = ye(e, 0);
  a.setFullYear(r, t, 15), a.setHours(0, 0, 0, 0);
  const s = gN(a);
  return o.setMonth(t, Math.min(i, s)), o;
}
function CN(e, t, n) {
  const o = pe(e, n?.in);
  return isNaN(+o) ? ye(e, NaN) : (o.setFullYear(t), o);
}
const La = 5, EN = 4;
function TN(e, t) {
  const n = t.startOfMonth(e), o = n.getDay() > 0 ? n.getDay() : 7, r = t.addDays(e, -o + 1), i = t.addDays(r, La * 7 - 1);
  return t.getMonth(e) === t.getMonth(i) ? La : EN;
}
function Mu(e, t) {
  const n = t.startOfMonth(e), o = n.getDay();
  return o === 1 ? n : o === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (o - 1));
}
function SN(e, t) {
  const n = Mu(e, t), o = TN(e, t);
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
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? De.tz(this.options.timeZone) : new this.Date(), this.newDate = (o, r, i) => this.overrides?.newDate ? this.overrides.newDate(o, r, i) : this.options.timeZone ? new De(o, r, i, this.options.timeZone) : new Date(o, r, i), this.addDays = (o, r) => this.overrides?.addDays ? this.overrides.addDays(o, r) : gu(o, r), this.addMonths = (o, r) => this.overrides?.addMonths ? this.overrides.addMonths(o, r) : bu(o, r), this.addWeeks = (o, r) => this.overrides?.addWeeks ? this.overrides.addWeeks(o, r) : aw(o, r), this.addYears = (o, r) => this.overrides?.addYears ? this.overrides.addYears(o, r) : lw(o, r), this.differenceInCalendarDays = (o, r) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(o, r) : wu(o, r), this.differenceInCalendarMonths = (o, r) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(o, r) : fw(o, r), this.eachMonthOfInterval = (o) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(o) : hw(o), this.eachYearOfInterval = (o) => {
      const r = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(o) : vw(o), i = new Set(r.map((s) => this.getYear(s)));
      if (i.size === r.length)
        return r;
      const a = [];
      return i.forEach((s) => {
        a.push(new Date(s, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (o) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(o) : SN(o, this), this.endOfISOWeek = (o) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(o) : ww(o), this.endOfMonth = (o) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(o) : pw(o), this.endOfWeek = (o, r) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(o, r) : xu(o, this.options), this.endOfYear = (o) => this.overrides?.endOfYear ? this.overrides.endOfYear(o) : bw(o), this.format = (o, r, i) => {
      const a = this.overrides?.format ? this.overrides.format(o, r, this.options) : pN(o, r, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (o) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(o) : Cu(o), this.getMonth = (o, r) => this.overrides?.getMonth ? this.overrides.getMonth(o, this.options) : bN(o, this.options), this.getYear = (o, r) => this.overrides?.getYear ? this.overrides.getYear(o, this.options) : vN(o, this.options), this.getWeek = (o, r) => this.overrides?.getWeek ? this.overrides.getWeek(o, this.options) : Tu(o, this.options), this.isAfter = (o, r) => this.overrides?.isAfter ? this.overrides.isAfter(o, r) : wN(o, r), this.isBefore = (o, r) => this.overrides?.isBefore ? this.overrides.isBefore(o, r) : NN(o, r), this.isDate = (o) => this.overrides?.isDate ? this.overrides.isDate(o) : Nu(o), this.isSameDay = (o, r) => this.overrides?.isSameDay ? this.overrides.isSameDay(o, r) : dw(o, r), this.isSameMonth = (o, r) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(o, r) : yN(o, r), this.isSameYear = (o, r) => this.overrides?.isSameYear ? this.overrides.isSameYear(o, r) : kN(o, r), this.max = (o) => this.overrides?.max ? this.overrides.max(o) : cw(o), this.min = (o) => this.overrides?.min ? this.overrides.min(o) : uw(o), this.setMonth = (o, r) => this.overrides?.setMonth ? this.overrides.setMonth(o, r) : xN(o, r), this.setYear = (o, r) => this.overrides?.setYear ? this.overrides.setYear(o, r) : CN(o, r), this.startOfBroadcastWeek = (o, r) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(o, this) : Mu(o, this), this.startOfDay = (o) => this.overrides?.startOfDay ? this.overrides.startOfDay(o) : Qn(o), this.startOfISOWeek = (o) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(o) : Zn(o), this.startOfMonth = (o) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(o) : gw(o), this.startOfWeek = (o, r) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(o, this.options) : vn(o, this.options), this.startOfYear = (o) => this.overrides?.startOfYear ? this.overrides.startOfYear(o) : ku(o), this.options = { locale: gs, ...t }, this.overrides = n;
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
    const { locale: n, timeZone: o, numerals: r } = this.options, i = n?.code;
    if (i && He.yearFirstLocales.has(i))
      try {
        return new Intl.DateTimeFormat(i, {
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
const st = new He();
class Du {
  constructor(t, n, o = st) {
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
class MN {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class DN {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function AN(e) {
  return X.createElement("button", { ...e });
}
function PN(e) {
  return X.createElement("span", { ...e });
}
function IN(e) {
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
function RN(e) {
  const { day: t, modifiers: n, ...o } = e;
  return X.createElement("td", { ...o });
}
function LN(e) {
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
function ON(e) {
  const { options: t, className: n, components: o, classNames: r, ...i } = e, a = [r[te.Dropdown], n].join(" "), s = t?.find(({ value: l }) => l === i.value);
  return X.createElement(
    "span",
    { "data-disabled": i.disabled, className: r[te.DropdownRoot] },
    X.createElement(o.Select, { className: a, ...i }, t?.map(({ value: l, label: c, disabled: u }) => X.createElement(o.Option, { key: l, value: l, disabled: u }, c))),
    X.createElement(
      "span",
      { className: r[te.CaptionLabel], "aria-hidden": !0 },
      s?.label,
      X.createElement(o.Chevron, { orientation: "down", size: 18, className: r[te.Chevron] })
    )
  );
}
function _N(e) {
  return X.createElement("div", { ...e });
}
function $N(e) {
  return X.createElement("div", { ...e });
}
function WN(e) {
  const { calendarMonth: t, displayIndex: n, ...o } = e;
  return X.createElement("div", { ...o }, e.children);
}
function BN(e) {
  const { calendarMonth: t, displayIndex: n, ...o } = e;
  return X.createElement("div", { ...o });
}
function HN(e) {
  return X.createElement("table", { ...e });
}
function FN(e) {
  return X.createElement("div", { ...e });
}
const Au = nl(void 0);
function io() {
  const e = ol(Au);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function zN(e) {
  const { components: t } = io();
  return X.createElement(t.Dropdown, { ...e });
}
function UN(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: o, nextMonth: r, ...i } = e, { components: a, classNames: s, labels: { labelPrevious: l, labelNext: c } } = io(), u = H((f) => {
    r && n?.(f);
  }, [r, n]), d = H((f) => {
    o && t?.(f);
  }, [o, t]);
  return X.createElement(
    "nav",
    { ...i },
    X.createElement(
      a.PreviousMonthButton,
      { type: "button", className: s[te.PreviousMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: d },
      X.createElement(a.Chevron, { disabled: o ? void 0 : !0, className: s[te.Chevron], orientation: "left" })
    ),
    X.createElement(
      a.NextMonthButton,
      { type: "button", className: s[te.NextMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: u },
      X.createElement(a.Chevron, { disabled: r ? void 0 : !0, orientation: "right", className: s[te.Chevron] })
    )
  );
}
function YN(e) {
  const { components: t } = io();
  return X.createElement(t.Button, { ...e });
}
function jN(e) {
  return X.createElement("option", { ...e });
}
function VN(e) {
  const { components: t } = io();
  return X.createElement(t.Button, { ...e });
}
function KN(e) {
  const { rootRef: t, ...n } = e;
  return X.createElement("div", { ...n, ref: t });
}
function GN(e) {
  return X.createElement("select", { ...e });
}
function qN(e) {
  const { week: t, ...n } = e;
  return X.createElement("tr", { ...n });
}
function XN(e) {
  return X.createElement("th", { ...e });
}
function ZN(e) {
  return X.createElement(
    "thead",
    { "aria-hidden": !0 },
    X.createElement("tr", { ...e })
  );
}
function QN(e) {
  const { week: t, ...n } = e;
  return X.createElement("th", { ...n });
}
function JN(e) {
  return X.createElement("th", { ...e });
}
function e0(e) {
  return X.createElement("tbody", { ...e });
}
function t0(e) {
  const { components: t } = io();
  return X.createElement(t.Dropdown, { ...e });
}
const n0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: AN,
  CaptionLabel: PN,
  Chevron: IN,
  Day: RN,
  DayButton: LN,
  Dropdown: ON,
  DropdownNav: _N,
  Footer: $N,
  Month: WN,
  MonthCaption: BN,
  MonthGrid: HN,
  Months: FN,
  MonthsDropdown: zN,
  Nav: UN,
  NextMonthButton: YN,
  Option: jN,
  PreviousMonthButton: VN,
  Root: KN,
  Select: GN,
  Week: qN,
  WeekNumber: QN,
  WeekNumberHeader: JN,
  Weekday: XN,
  Weekdays: ZN,
  Weeks: e0,
  YearsDropdown: t0
}, Symbol.toStringTag, { value: "Module" }));
function ft(e, t, n = !1, o = st) {
  let { from: r, to: i } = e;
  const { differenceInCalendarDays: a, isSameDay: s } = o;
  return r && i ? (a(i, r) < 0 && ([r, i] = [i, r]), a(t, r) >= (n ? 1 : 0) && a(i, t) >= (n ? 1 : 0)) : !n && i ? s(i, t) : !n && r ? s(r, t) : !1;
}
function Pu(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function bs(e) {
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
function pt(e, t, n = st) {
  const o = Array.isArray(t) ? t : [t], { isSameDay: r, differenceInCalendarDays: i, isAfter: a } = n;
  return o.some((s) => {
    if (typeof s == "boolean")
      return s;
    if (n.isDate(s))
      return r(e, s);
    if (Ou(s, n))
      return s.includes(e);
    if (bs(s))
      return ft(s, e, !1, n);
    if (Lu(s))
      return Array.isArray(s.dayOfWeek) ? s.dayOfWeek.includes(e.getDay()) : s.dayOfWeek === e.getDay();
    if (Pu(s)) {
      const l = i(s.before, e), c = i(s.after, e), u = l > 0, d = c < 0;
      return a(s.before, s.after) ? d && u : u || d;
    }
    return Iu(s) ? i(e, s.after) > 0 : Ru(s) ? i(s.before, e) > 0 : typeof s == "function" ? s(e) : !1;
  });
}
function o0(e, t, n, o, r) {
  const { disabled: i, hidden: a, modifiers: s, showOutsideDays: l, broadcastCalendar: c, today: u } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: h, endOfMonth: g, isAfter: b } = r, v = n && p(n), w = o && g(o), N = {
    [ge.focused]: [],
    [ge.outside]: [],
    [ge.disabled]: [],
    [ge.hidden]: [],
    [ge.today]: []
  }, E = {};
  for (const y of e) {
    const { date: k, displayMonth: M } = y, x = !!(M && !f(k, M)), C = !!(v && h(k, v)), S = !!(w && b(k, w)), D = !!(i && pt(k, i, r)), A = !!(a && pt(k, a, r)) || C || S || // Broadcast calendar will show outside days as default
    !c && !l && x || c && l === !1 && x, R = d(k, u ?? r.today());
    x && N.outside.push(y), D && N.disabled.push(y), A && N.hidden.push(y), R && N.today.push(y), s && Object.keys(s).forEach((L) => {
      const _ = s?.[L];
      _ && pt(k, _, r) && (E[L] ? E[L].push(y) : E[L] = [y]);
    });
  }
  return (y) => {
    const k = {
      [ge.focused]: !1,
      [ge.disabled]: !1,
      [ge.hidden]: !1,
      [ge.outside]: !1,
      [ge.today]: !1
    }, M = {};
    for (const x in N) {
      const C = N[x];
      k[x] = C.some((S) => S === y);
    }
    for (const x in E)
      M[x] = E[x].some((C) => C === y);
    return {
      ...k,
      // custom modifiers should override all the previous ones
      ...M
    };
  };
}
function r0(e, t, n = {}) {
  return Object.entries(e).filter(([, r]) => r === !0).reduce((r, [i]) => (n[i] ? r.push(n[i]) : t[ge[i]] ? r.push(t[ge[i]]) : t[Ge[i]] && r.push(t[Ge[i]]), r), [t[te.Day]]);
}
function i0(e) {
  return {
    ...n0,
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
  return Object.entries(e).forEach(([n, o]) => {
    n.startsWith("data-") && (t[n] = o);
  }), t;
}
function vs() {
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
const a0 = _u;
function l0(e, t, n) {
  return (n ?? new He(t)).format(e, "d");
}
function c0(e, t = st) {
  return t.format(e, "LLLL");
}
function u0(e, t, n) {
  return (n ?? new He(t)).format(e, "cccccc");
}
function d0(e, t = st) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function m0() {
  return "";
}
function $u(e, t = st) {
  return t.format(e, "yyyy");
}
const f0 = $u, p0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: _u,
  formatDay: l0,
  formatMonthCaption: a0,
  formatMonthDropdown: c0,
  formatWeekNumber: d0,
  formatWeekNumberHeader: m0,
  formatWeekdayName: u0,
  formatYearCaption: f0,
  formatYearDropdown: $u
}, Symbol.toStringTag, { value: "Module" }));
function h0(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...p0,
    ...e
  };
}
function g0(e, t, n, o, r) {
  const { startOfMonth: i, startOfYear: a, endOfYear: s, eachMonthOfInterval: l, getMonth: c } = r;
  return l({
    start: a(e),
    end: s(e)
  }).map((f) => {
    const p = o.formatMonthDropdown(f, r), h = c(f), g = t && f < i(t) || n && f > i(n) || !1;
    return { value: h, label: p, disabled: g };
  });
}
function b0(e, t = {}, n = {}) {
  let o = { ...t?.[te.Day] };
  return Object.entries(e).filter(([, r]) => r === !0).forEach(([r]) => {
    o = {
      ...o,
      ...n?.[r]
    };
  }), o;
}
function v0(e, t, n) {
  const o = e.today(), r = t ? e.startOfISOWeek(o) : e.startOfWeek(o), i = [];
  for (let a = 0; a < 7; a++) {
    const s = e.addDays(r, a);
    i.push(s);
  }
  return i;
}
function w0(e, t, n, o, r = !1) {
  if (!e || !t)
    return;
  const { startOfYear: i, endOfYear: a, eachYearOfInterval: s, getYear: l } = o, c = i(e), u = a(t), d = s({ start: c, end: u });
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
const N0 = Wu;
function Bu(e, t, n) {
  return (n ?? new He(t)).formatMonthYear(e);
}
const y0 = Bu;
function k0(e, t, n, o) {
  let r = (o ?? new He(n)).format(e, "PPPP");
  return t?.today && (r = `Today, ${r}`), r;
}
function x0(e) {
  return "Choose the Month";
}
function C0() {
  return "";
}
function E0(e) {
  return "Go to the Next Month";
}
function T0(e) {
  return "Go to the Previous Month";
}
function S0(e, t, n) {
  return (n ?? new He(t)).format(e, "cccc");
}
function M0(e, t) {
  return `Week ${e}`;
}
function D0(e) {
  return "Week Number";
}
function A0(e) {
  return "Choose the Year";
}
const P0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: y0,
  labelDay: N0,
  labelDayButton: Wu,
  labelGrid: Bu,
  labelGridcell: k0,
  labelMonthDropdown: x0,
  labelNav: C0,
  labelNext: E0,
  labelPrevious: T0,
  labelWeekNumber: M0,
  labelWeekNumberHeader: D0,
  labelWeekday: S0,
  labelYearDropdown: A0
}, Symbol.toStringTag, { value: "Module" })), so = (e) => e instanceof HTMLElement ? e : null, Jr = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], I0 = (e) => so(e.querySelector("[data-animated-month]")), ei = (e) => so(e.querySelector("[data-animated-caption]")), ti = (e) => so(e.querySelector("[data-animated-weeks]")), R0 = (e) => so(e.querySelector("[data-animated-nav]")), L0 = (e) => so(e.querySelector("[data-animated-weekdays]"));
function O0(e, t, { classNames: n, months: o, focused: r, dateLib: i }) {
  const a = j(null), s = j(o), l = j(!1);
  rr(() => {
    const c = s.current;
    if (s.current = o, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    o.length === 0 || c.length === 0 || o.length !== c.length)
      return;
    const u = i.isSameMonth(o[0].date, c[0].date), d = i.isAfter(o[0].date, c[0].date), f = d ? n[$e.caption_after_enter] : n[$e.caption_before_enter], p = d ? n[$e.weeks_after_enter] : n[$e.weeks_before_enter], h = a.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (Jr(g).forEach((N) => {
      if (!(N instanceof HTMLElement))
        return;
      const E = I0(N);
      E && N.contains(E) && N.removeChild(E);
      const y = ei(N);
      y && y.classList.remove(f);
      const k = ti(N);
      k && k.classList.remove(p);
    }), a.current = g) : a.current = null, l.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    r)
      return;
    const b = h instanceof HTMLElement ? Jr(h) : [], v = Jr(e.current);
    if (v?.every((w) => w instanceof HTMLElement) && b && b.every((w) => w instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const w = R0(e.current);
      w && (w.style.zIndex = "1"), v.forEach((N, E) => {
        const y = b[E];
        if (!y)
          return;
        N.style.position = "relative", N.style.overflow = "hidden";
        const k = ei(N);
        k && k.classList.add(f);
        const M = ti(N);
        M && M.classList.add(p);
        const x = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), w && (w.style.zIndex = ""), k && k.classList.remove(f), M && M.classList.remove(p), N.style.position = "", N.style.overflow = "", N.contains(y) && N.removeChild(y);
        };
        y.style.pointerEvents = "none", y.style.position = "absolute", y.style.overflow = "hidden", y.setAttribute("aria-hidden", "true");
        const C = L0(y);
        C && (C.style.opacity = "0");
        const S = ei(y);
        S && (S.classList.add(d ? n[$e.caption_before_exit] : n[$e.caption_after_exit]), S.addEventListener("animationend", x));
        const D = ti(y);
        D && D.classList.add(d ? n[$e.weeks_before_exit] : n[$e.weeks_after_exit]), N.insertBefore(y, N.firstChild);
      });
    }
  });
}
function _0(e, t, n, o) {
  const r = e[0], i = e[e.length - 1], { ISOWeek: a, fixedWeeks: s, broadcastCalendar: l } = n ?? {}, { addDays: c, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: h, endOfWeek: g, isAfter: b, startOfBroadcastWeek: v, startOfISOWeek: w, startOfWeek: N } = o, E = l ? v(r, o) : a ? w(r) : N(r), y = l ? f(i) : a ? p(h(i)) : g(h(i)), k = u(y, E), M = d(i, r) + 1, x = [];
  for (let D = 0; D <= k; D++) {
    const A = c(E, D);
    if (t && b(A, t))
      break;
    x.push(A);
  }
  const S = (l ? 35 : 42) * M;
  if (s && x.length < S) {
    const D = S - x.length;
    for (let A = 0; A < D; A++) {
      const R = c(x[x.length - 1], 1);
      x.push(R);
    }
  }
  return x;
}
function $0(e) {
  const t = [];
  return e.reduce((n, o) => {
    const r = o.weeks.reduce((i, a) => i.concat(a.days.slice()), t.slice());
    return n.concat(r.slice());
  }, t.slice());
}
function W0(e, t, n, o) {
  const { numberOfMonths: r = 1 } = n, i = [];
  for (let a = 0; a < r; a++) {
    const s = o.addMonths(e, a);
    if (t && s > t)
      break;
    i.push(s);
  }
  return i;
}
function Oa(e, t, n, o) {
  const { month: r, defaultMonth: i, today: a = o.today(), numberOfMonths: s = 1 } = e;
  let l = r || i || a;
  const { differenceInCalendarMonths: c, addMonths: u, startOfMonth: d } = o;
  if (n && c(n, l) < s - 1) {
    const f = -1 * (s - 1);
    l = u(n, f);
  }
  return t && c(l, t) < 0 && (l = t), d(l);
}
function B0(e, t, n, o) {
  const { addDays: r, endOfBroadcastWeek: i, endOfISOWeek: a, endOfMonth: s, endOfWeek: l, getISOWeek: c, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = o, h = e.reduce((g, b) => {
    const v = n.broadcastCalendar ? d(b, o) : n.ISOWeek ? f(b) : p(b), w = n.broadcastCalendar ? i(b) : n.ISOWeek ? a(s(b)) : l(s(b)), N = t.filter((M) => M >= v && M <= w), E = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && N.length < E) {
      const M = t.filter((x) => {
        const C = E - N.length;
        return x > w && x <= r(w, C);
      });
      N.push(...M);
    }
    const y = N.reduce((M, x) => {
      const C = n.ISOWeek ? c(x) : u(x), S = M.find((A) => A.weekNumber === C), D = new Du(x, b, o);
      return S ? S.days.push(D) : M.push(new DN(C, [D])), M;
    }, []), k = new MN(b, y);
    return g.push(k), g;
  }, []);
  return n.reverseMonths ? h.reverse() : h;
}
function H0(e, t) {
  let { startMonth: n, endMonth: o } = e;
  const { startOfYear: r, startOfDay: i, startOfMonth: a, endOfMonth: s, addYears: l, endOfYear: c, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: h, toMonth: g } = e;
  !n && h && (n = h), !n && f && (n = t.newDate(f, 0, 1)), !o && g && (o = g), !o && p && (o = u(p, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : f ? n = u(f, 0, 1) : !n && b && (n = r(l(e.today ?? d(), -100))), o ? o = s(o) : p ? o = u(p, 11, 31) : !o && b && (o = c(e.today ?? d())), [
    n && i(n),
    o && i(o)
  ];
}
function F0(e, t, n, o) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: r, numberOfMonths: i = 1 } = n, { startOfMonth: a, addMonths: s, differenceInCalendarMonths: l } = o, c = r ? i : 1, u = a(e);
  if (!t)
    return s(u, c);
  if (!(l(t, e) < i))
    return s(u, c);
}
function z0(e, t, n, o) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: r, numberOfMonths: i } = n, { startOfMonth: a, addMonths: s, differenceInCalendarMonths: l } = o, c = r ? i ?? 1 : 1, u = a(e);
  if (!t)
    return s(u, -c);
  if (!(l(u, t) <= 0))
    return s(u, -c);
}
function U0(e) {
  const t = [];
  return e.reduce((n, o) => n.concat(o.weeks.slice()), t.slice());
}
function yr(e, t) {
  const [n, o] = Y(e);
  return [t === void 0 ? n : t, o];
}
function Y0(e, t) {
  const [n, o] = H0(e, t), { startOfMonth: r, endOfMonth: i } = t, a = Oa(e, n, o, t), [s, l] = yr(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  q(() => {
    const k = Oa(e, n, o, t);
    l(k);
  }, [e.timeZone]);
  const c = W0(s, o, e, t), u = _0(c, e.endMonth ? i(e.endMonth) : void 0, e, t), d = B0(c, u, e, t), f = U0(d), p = $0(d), h = z0(s, n, e, t), g = F0(s, o, e, t), { disableNavigation: b, onMonthChange: v } = e, w = (k) => f.some((M) => M.days.some((x) => x.isEqualTo(k))), N = (k) => {
    if (b)
      return;
    let M = r(k);
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
    goToMonth: N,
    goToDay: (k) => {
      w(k) || N(k.date);
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
function j0(e, t, n, o) {
  let r, i = -1;
  for (const a of e) {
    const s = t(a);
    _a(s) && (s[ge.focused] && i < Qe.FocusedModifier ? (r = a, i = Qe.FocusedModifier) : o?.isEqualTo(a) && i < Qe.LastFocused ? (r = a, i = Qe.LastFocused) : n(a.date) && i < Qe.Selected ? (r = a, i = Qe.Selected) : s[ge.today] && i < Qe.Today && (r = a, i = Qe.Today));
  }
  return r || (r = e.find((a) => _a(t(a)))), r;
}
function V0(e, t, n, o, r, i, a) {
  const { ISOWeek: s, broadcastCalendar: l } = i, { addDays: c, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: h, endOfWeek: g, max: b, min: v, startOfBroadcastWeek: w, startOfISOWeek: N, startOfWeek: E } = a;
  let k = {
    day: c,
    week: d,
    month: u,
    year: f,
    startOfWeek: (M) => l ? w(M, a) : s ? N(M) : E(M),
    endOfWeek: (M) => l ? p(M) : s ? h(M) : g(M)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && o ? k = b([o, k]) : t === "after" && r && (k = v([r, k])), k;
}
function Hu(e, t, n, o, r, i, a, s = 0) {
  if (s > 365)
    return;
  const l = V0(e, t, n.date, o, r, i, a), c = !!(i.disabled && pt(l, i.disabled, a)), u = !!(i.hidden && pt(l, i.hidden, a)), d = l, f = new Du(l, d, a);
  return !c && !u ? f : Hu(e, t, f, o, r, i, a, s + 1);
}
function K0(e, t, n, o, r) {
  const { autoFocus: i } = e, [a, s] = Y(), l = j0(t.days, n, o || (() => !1), a), [c, u] = Y(i ? l : void 0);
  return {
    isFocusTarget: (g) => !!l?.isEqualTo(g),
    setFocused: u,
    focused: c,
    blur: () => {
      s(c), u(void 0);
    },
    moveFocus: (g, b) => {
      if (!c)
        return;
      const v = Hu(g, b, c, t.navStart, t.navEnd, e, r);
      v && (e.disableNavigation && !t.days.some((N) => N.isEqualTo(v)) || (t.goToDay(v), u(v)));
    }
  };
}
function G0(e, t) {
  const { selected: n, required: o, onSelect: r } = e, [i, a] = yr(n, r ? n : void 0), s = r ? n : i, { isSameDay: l } = t, c = (p) => s?.some((h) => l(h, p)) ?? !1, { min: u, max: d } = e;
  return {
    selected: s,
    select: (p, h, g) => {
      let b = [...s ?? []];
      if (c(p)) {
        if (s?.length === u || o && s?.length === 1)
          return;
        b = s?.filter((v) => !l(v, p));
      } else
        s?.length === d ? b = [p] : b = [...b, p];
      return r || a(b), r?.(b, p, h, g), b;
    },
    isSelected: c
  };
}
function q0(e, t, n = 0, o = 0, r = !1, i = st) {
  const { from: a, to: s } = t || {}, { isSameDay: l, isAfter: c, isBefore: u } = i;
  let d;
  if (!a && !s)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (a && !s)
    l(a, e) ? n === 0 ? d = { from: a, to: e } : r ? d = { from: a, to: void 0 } : d = void 0 : u(e, a) ? d = { from: e, to: a } : d = { from: a, to: e };
  else if (a && s)
    if (l(a, e) && l(s, e))
      r ? d = { from: a, to: s } : d = void 0;
    else if (l(a, e))
      d = { from: a, to: n > 0 ? void 0 : e };
    else if (l(s, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (u(e, a))
      d = { from: e, to: s };
    else if (c(e, a))
      d = { from: a, to: e };
    else if (c(e, s))
      d = { from: a, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const f = i.differenceInCalendarDays(d.to, d.from);
    o > 0 && f > o ? d = { from: e, to: void 0 } : n > 1 && f < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function X0(e, t, n = st) {
  const o = Array.isArray(t) ? t : [t];
  let r = e.from;
  const i = n.differenceInCalendarDays(e.to, e.from), a = Math.min(i, 6);
  for (let s = 0; s <= a; s++) {
    if (o.includes(r.getDay()))
      return !0;
    r = n.addDays(r, 1);
  }
  return !1;
}
function $a(e, t, n = st) {
  return ft(e, t.from, !1, n) || ft(e, t.to, !1, n) || ft(t, e.from, !1, n) || ft(t, e.to, !1, n);
}
function Z0(e, t, n = st) {
  const o = Array.isArray(t) ? t : [t];
  if (o.filter((s) => typeof s != "function").some((s) => typeof s == "boolean" ? s : n.isDate(s) ? ft(e, s, !1, n) : Ou(s, n) ? s.some((l) => ft(e, l, !1, n)) : bs(s) ? s.from && s.to ? $a(e, { from: s.from, to: s.to }, n) : !1 : Lu(s) ? X0(e, s.dayOfWeek, n) : Pu(s) ? n.isAfter(s.before, s.after) ? $a(e, {
    from: n.addDays(s.after, 1),
    to: n.addDays(s.before, -1)
  }, n) : pt(e.from, s, n) || pt(e.to, s, n) : Iu(s) || Ru(s) ? pt(e.from, s, n) || pt(e.to, s, n) : !1))
    return !0;
  const a = o.filter((s) => typeof s == "function");
  if (a.length) {
    let s = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let c = 0; c <= l; c++) {
      if (a.some((u) => u(s)))
        return !0;
      s = n.addDays(s, 1);
    }
  }
  return !1;
}
function Q0(e, t) {
  const { disabled: n, excludeDisabled: o, selected: r, required: i, onSelect: a } = e, [s, l] = yr(r, a ? r : void 0), c = a ? r : s;
  return {
    selected: c,
    select: (f, p, h) => {
      const { min: g, max: b } = e, v = f ? q0(f, c, g, b, i, t) : void 0;
      return o && n && v?.from && v.to && Z0({ from: v.from, to: v.to }, n, t) && (v.from = f, v.to = void 0), a || l(v), a?.(v, f, p, h), v;
    },
    isSelected: (f) => c && ft(c, f, !1, t)
  };
}
function J0(e, t) {
  const { selected: n, required: o, onSelect: r } = e, [i, a] = yr(n, r ? n : void 0), s = r ? n : i, { isSameDay: l } = t;
  return {
    selected: s,
    select: (d, f, p) => {
      let h = d;
      return !o && s && s && l(d, s) && (h = void 0), r || a(h), r?.(h, d, f, p), h;
    },
    isSelected: (d) => s ? l(s, d) : !1
  };
}
function ey(e, t) {
  const n = J0(e, t), o = G0(e, t), r = Q0(e, t);
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
function ty(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new De(t.today, t.timeZone)), t.month && (t.month = new De(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new De(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new De(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new De(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new De(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((oe) => new De(oe, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new De(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new De(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: o, labels: r, dateLib: i, locale: a, classNames: s } = Ht(() => {
    const oe = { ...gs, ...t.locale };
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
      components: i0(t.components),
      formatters: h0(t.formatters),
      labels: { ...P0, ...t.labels },
      locale: oe,
      classNames: { ...vs(), ...t.classNames }
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
  ]), { captionLayout: l, mode: c, navLayout: u, numberOfMonths: d = 1, onDayBlur: f, onDayClick: p, onDayFocus: h, onDayKeyDown: g, onDayMouseEnter: b, onDayMouseLeave: v, onNextClick: w, onPrevClick: N, showWeekNumber: E, styles: y } = t, { formatCaption: k, formatDay: M, formatMonthDropdown: x, formatWeekNumber: C, formatWeekNumberHeader: S, formatWeekdayName: D, formatYearDropdown: A } = o, R = Y0(t, i), { days: L, months: _, navStart: O, navEnd: U, previousMonth: I, nextMonth: P, goToMonth: B } = R, K = o0(L, t, O, U, i), { isSelected: V, select: G, selected: Q } = ey(t, i) ?? {}, { blur: W, focused: $, isFocusTarget: z, moveFocus: Z, setFocused: ce } = K0(t, R, K, V ?? (() => !1), i), { labelDayButton: de, labelGridcell: ve, labelGrid: Ee, labelMonthDropdown: Fe, labelNav: yt, labelPrevious: Dn, labelNext: An, labelWeekday: ao, labelWeekNumber: lo, labelWeekNumberHeader: co, labelYearDropdown: uo } = r, jt = Ht(() => v0(i, t.ISOWeek), [i, t.ISOWeek]), Pn = c !== void 0 || p !== void 0, Vt = H(() => {
    I && (B(I), N?.(I));
  }, [I, B, N]), Kt = H(() => {
    P && (B(P), w?.(P));
  }, [B, P, w]), mo = H((oe, he) => (ne) => {
    ne.preventDefault(), ne.stopPropagation(), ce(oe), G?.(oe.date, he, ne), p?.(oe.date, he, ne);
  }, [G, p, ce]), xr = H((oe, he) => (ne) => {
    ce(oe), h?.(oe.date, he, ne);
  }, [h, ce]), Cr = H((oe, he) => (ne) => {
    W(), f?.(oe.date, he, ne);
  }, [W, f]), Er = H((oe, he) => (ne) => {
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
      const [Re, ue] = me[ne.key];
      Z(Re, ue);
    }
    g?.(oe.date, he, ne);
  }, [Z, g, t.dir]), Tr = H((oe, he) => (ne) => {
    b?.(oe.date, he, ne);
  }, [b]), Sr = H((oe, he) => (ne) => {
    v?.(oe.date, he, ne);
  }, [v]), fo = H((oe) => (he) => {
    const ne = Number(he.target.value), me = i.setMonth(i.startOfMonth(oe), ne);
    B(me);
  }, [i, B]), Mr = H((oe) => (he) => {
    const ne = Number(he.target.value), me = i.setYear(i.startOfMonth(oe), ne);
    B(me);
  }, [i, B]), { className: Dr, style: In } = Ht(() => ({
    className: [s[te.Root], t.className].filter(Boolean).join(" "),
    style: { ...y?.[te.Root], ...t.style }
  }), [s, t.className, t.style, y]), Ar = s0(t), at = j(null);
  O0(at, !!t.animate, {
    classNames: s,
    months: _,
    focused: $,
    dateLib: i
  });
  const Gt = {
    dayPickerProps: t,
    selected: Q,
    select: G,
    isSelected: V,
    months: _,
    nextMonth: P,
    previousMonth: I,
    goToMonth: B,
    getModifiers: K,
    components: n,
    classNames: s,
    styles: y,
    labels: r,
    formatters: o
  };
  return X.createElement(
    Au.Provider,
    { value: Gt },
    X.createElement(
      n.Root,
      { rootRef: t.animate ? at : void 0, className: Dr, style: In, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Ar },
      X.createElement(
        n.Months,
        { className: s[te.Months], style: y?.[te.Months] },
        !t.hideNavigation && !u && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: s[te.Nav], style: y?.[te.Nav], "aria-label": yt(), onPreviousClick: Vt, onNextClick: Kt, previousMonth: I, nextMonth: P }),
        _.map((oe, he) => X.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: s[te.Month],
            style: y?.[te.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: he,
            displayIndex: he,
            calendarMonth: oe
          },
          u === "around" && !t.hideNavigation && he === 0 && X.createElement(
            n.PreviousMonthButton,
            { type: "button", className: s[te.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": Dn(I), onClick: Vt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: I ? void 0 : !0, className: s[te.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          X.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: s[te.MonthCaption], style: y?.[te.MonthCaption], calendarMonth: oe, displayIndex: he }, l?.startsWith("dropdown") ? X.createElement(
            n.DropdownNav,
            { className: s[te.Dropdowns], style: y?.[te.Dropdowns] },
            (() => {
              const ne = l === "dropdown" || l === "dropdown-months" ? X.createElement(n.MonthsDropdown, { key: "month", className: s[te.MonthsDropdown], "aria-label": Fe(), classNames: s, components: n, disabled: !!t.disableNavigation, onChange: fo(oe.date), options: g0(oe.date, O, U, o, i), style: y?.[te.Dropdown], value: i.getMonth(oe.date) }) : X.createElement("span", { key: "month" }, x(oe.date, i)), me = l === "dropdown" || l === "dropdown-years" ? X.createElement(n.YearsDropdown, { key: "year", className: s[te.YearsDropdown], "aria-label": uo(i.options), classNames: s, components: n, disabled: !!t.disableNavigation, onChange: Mr(oe.date), options: w0(O, U, o, i, !!t.reverseYears), style: y?.[te.Dropdown], value: i.getYear(oe.date) }) : X.createElement("span", { key: "year" }, A(oe.date, i));
              return i.getMonthYearOrder() === "year-first" ? [me, ne] : [ne, me];
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
            } }, k(oe.date, i.options, i))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            X.createElement(n.CaptionLabel, { className: s[te.CaptionLabel], role: "status", "aria-live": "polite" }, k(oe.date, i.options, i))
          )),
          u === "around" && !t.hideNavigation && he === d - 1 && X.createElement(
            n.NextMonthButton,
            { type: "button", className: s[te.NextMonthButton], tabIndex: P ? void 0 : -1, "aria-disabled": P ? void 0 : !0, "aria-label": An(P), onClick: Kt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: P ? void 0 : !0, className: s[te.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          he === d - 1 && u === "after" && !t.hideNavigation && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: s[te.Nav], style: y?.[te.Nav], "aria-label": yt(), onPreviousClick: Vt, onNextClick: Kt, previousMonth: I, nextMonth: P }),
          X.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": c === "multiple" || c === "range", "aria-label": Ee(oe.date, i.options, i) || void 0, className: s[te.MonthGrid], style: y?.[te.MonthGrid] },
            !t.hideWeekdays && X.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: s[te.Weekdays], style: y?.[te.Weekdays] },
              E && X.createElement(n.WeekNumberHeader, { "aria-label": co(i.options), className: s[te.WeekNumberHeader], style: y?.[te.WeekNumberHeader], scope: "col" }, S()),
              jt.map((ne) => X.createElement(n.Weekday, { "aria-label": ao(ne, i.options, i), className: s[te.Weekday], key: String(ne), style: y?.[te.Weekday], scope: "col" }, D(ne, i.options, i)))
            ),
            X.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: s[te.Weeks], style: y?.[te.Weeks] }, oe.weeks.map((ne) => X.createElement(
              n.Week,
              { className: s[te.Week], key: ne.weekNumber, style: y?.[te.Week], week: ne },
              E && // biome-ignore lint/a11y/useSemanticElements: react component
              X.createElement(n.WeekNumber, { week: ne, style: y?.[te.WeekNumber], "aria-label": lo(ne.weekNumber, {
                locale: a
              }), className: s[te.WeekNumber], scope: "row", role: "rowheader" }, C(ne.weekNumber, i)),
              ne.days.map((me) => {
                const { date: Re } = me, ue = K(me);
                if (ue[ge.focused] = !ue.hidden && !!$?.isEqualTo(me), ue[Ge.selected] = V?.(Re) || ue.selected, bs(Q)) {
                  const { from: lt, to: Ln } = Q;
                  ue[Ge.range_start] = !!(lt && Ln && i.isSameDay(Re, lt)), ue[Ge.range_end] = !!(lt && Ln && i.isSameDay(Re, Ln)), ue[Ge.range_middle] = ft(Q, Re, !0, i);
                }
                const Rn = b0(ue, y, t.modifiersStyles), qt = r0(ue, s, t.modifiersClassNames), Xt = !Pn && !ue.hidden ? ve(Re, ue, i.options, i) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  X.createElement(n.Day, { key: `${i.format(Re, "yyyy-MM-dd")}_${i.format(me.displayMonth, "yyyy-MM")}`, day: me, modifiers: ue, className: qt.join(" "), style: Rn, role: "gridcell", "aria-selected": ue.selected || void 0, "aria-label": Xt, "data-day": i.format(Re, "yyyy-MM-dd"), "data-month": me.outside ? i.format(Re, "yyyy-MM") : void 0, "data-selected": ue.selected || void 0, "data-disabled": ue.disabled || void 0, "data-hidden": ue.hidden || void 0, "data-outside": me.outside || void 0, "data-focused": ue.focused || void 0, "data-today": ue.today || void 0 }, !ue.hidden && Pn ? X.createElement(n.DayButton, { className: s[te.DayButton], style: y?.[te.DayButton], type: "button", day: me, modifiers: ue, disabled: ue.disabled || void 0, tabIndex: z(me) ? 0 : -1, "aria-label": de(Re, ue, i.options, i), onClick: mo(me, ue), onBlur: Cr(me, ue), onFocus: xr(me, ue), onKeyDown: Er(me, ue), onMouseEnter: Tr(me, ue), onMouseLeave: Sr(me, ue) }, M(Re, i.options, i)) : !ue.hidden && M(me.date, i.options, i))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      X.createElement(n.Footer, { className: s[te.Footer], style: y?.[te.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function ny({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: o = "label",
  buttonVariant: r = "ghost",
  formatters: i,
  components: a,
  ...s
}) {
  const l = vs();
  return /* @__PURE__ */ m(
    ty,
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
        ...i
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
          bi({ variant: r }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_previous
        ),
        button_next: re(
          bi({ variant: r }),
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
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/calendar.tsx",
            lineNumber: 128,
            columnNumber: 13
          },
          this
        ),
        Chevron: ({ className: c, orientation: u, ...d }) => u === "left" ? /* @__PURE__ */ m(Vd, { className: re("size-4", c), ...d }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/calendar.tsx",
          lineNumber: 139,
          columnNumber: 15
        }, this) : u === "right" ? /* @__PURE__ */ m(
          Kd,
          {
            className: re("size-4", c),
            ...d
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/calendar.tsx",
            lineNumber: 145,
            columnNumber: 15
          },
          this
        ) : /* @__PURE__ */ m(Gd, { className: re("size-4", c), ...d }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/calendar.tsx",
          lineNumber: 153,
          columnNumber: 13
        }, this),
        DayButton: oy,
        WeekNumber: ({ children: c, ...u }) => /* @__PURE__ */ m("td", { ...u, children: /* @__PURE__ */ m("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: c }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/calendar.tsx",
          lineNumber: 160,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/calendar.tsx",
          lineNumber: 159,
          columnNumber: 13
        }, this),
        ...a
      },
      ...s
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/calendar.tsx",
      lineNumber: 27,
      columnNumber: 5
    },
    this
  );
}
function oy({
  className: e,
  day: t,
  modifiers: n,
  ...o
}) {
  const r = vs(), i = T.useRef(null);
  return T.useEffect(() => {
    n.focused && i.current?.focus();
  }, [n.focused]), /* @__PURE__ */ m(
    St,
    {
      ref: i,
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
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/ui/calendar.tsx",
      lineNumber: 187,
      columnNumber: 5
    },
    this
  );
}
let dn = null;
const Fu = /* @__PURE__ */ new Map(), ry = /* @__PURE__ */ new Map();
function Yo() {
  if (!dn) return;
  const e = dn;
  dn = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function iy(e) {
  return dn?.pillDate === e;
}
function sy({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: o,
  onClose: r
}) {
  const i = j(null), a = kr(e);
  q(() => {
    const w = (N) => {
      N.key === "Escape" && (N.stopPropagation(), N.preventDefault(), r());
    };
    return document.addEventListener("keydown", w, !0), () => document.removeEventListener("keydown", w, !0);
  }, [r]), q(() => {
    const w = (E) => {
      i.current && !i.current.contains(E.target) && (E.target.closest(".date-pill") || r());
    }, N = setTimeout(() => {
      document.addEventListener("mousedown", w, !0);
    }, 50);
    return () => {
      clearTimeout(N), document.removeEventListener("mousedown", w, !0);
    };
  }, [r]);
  const s = H((w) => {
    w && o(fn(w)), r();
  }, [o, r]), l = H((w) => {
    const N = /* @__PURE__ */ new Date();
    N.setDate(N.getDate() + w), o(fn(N)), r();
  }, [o, r]), c = H(() => {
    const N = (/* @__PURE__ */ new Date()).getDay(), E = N === 0 ? 1 : 8 - N, y = /* @__PURE__ */ new Date();
    y.setDate(y.getDate() + E), o(fn(y)), r();
  }, [o, r]), u = /* @__PURE__ */ new Date(), d = u.toDateString(), f = new Date(u);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), h = u.getDay(), g = h === 0 ? 1 : 8 - h, b = new Date(u);
  b.setDate(b.getDate() + g);
  const v = b.toDateString();
  return /* @__PURE__ */ m(
    "div",
    {
      ref: i,
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
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 180,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ m("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ m("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ m(
            ny,
            {
              mode: "single",
              selected: a,
              onSelect: s
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
              lineNumber: 197,
              columnNumber: 13
            },
            this
          ) }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 196,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("div", { className: "border-t border-border" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 203,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ m(
              St,
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
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 205,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ m(
              St,
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
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 216,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ m(
              St,
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
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 227,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 204,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 195,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 194,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
      lineNumber: 163,
      columnNumber: 5
    },
    this
  );
}
function ay(e, t, n) {
  if (iy(t)) {
    Yo();
    return;
  }
  Yo();
  const o = e.getBoundingClientRect(), r = window.innerWidth, i = window.innerHeight, a = 320, s = 420, l = 10, c = 16, u = i - o.bottom - l - c, d = o.top - l - c, f = u >= s ? "below" : d >= s ? "above" : u >= d ? "below" : "above";
  let p;
  f === "below" ? p = o.bottom + l : p = o.top - s - l;
  const h = o.left + o.width / 2;
  let g = h - a / 2;
  g + a > r - c && (g = r - a - c), g < c && (g = c);
  const b = document.createElement("div");
  b.setAttribute("data-date-picker-standalone", t), b.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(b), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((y) => {
    b.addEventListener(y, (k) => {
      k.stopPropagation();
    }, !1);
  });
  const w = jm(b);
  dn = { container: b, root: w, pillDate: t };
  const N = () => {
    Yo();
  }, E = (y) => {
    const k = Fu.get(t);
    k && k(y);
  };
  w.render(
    /* @__PURE__ */ m(
      sy,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: g, direction: f, pillCenter: h },
        onSelectDate: E,
        onClose: N
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
        lineNumber: 327,
        columnNumber: 5
      },
      this
    )
  );
}
function ly({ node: e, updateAttributes: t, selected: n }) {
  const o = j(null), r = e.attrs.date || mn(), i = zu(r), a = ws(r), s = H(() => {
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
  }), ry.set(r, s), () => {
  }), [r, t, s]), q(() => {
    const l = o.current;
    if (!l) return;
    const c = (u) => {
      u.preventDefault(), u.stopPropagation();
      const d = l.getAttribute("data-date") || mn(), f = s();
      ay(l, d, f);
    };
    return l.addEventListener("click", c), () => l.removeEventListener("click", c);
  }, [s]), q(() => {
    const l = o.current?.closest(".ProseMirror") || document, c = () => {
      dn && Yo();
    };
    return l.addEventListener("scroll", c, { passive: !0 }), () => {
      l.removeEventListener("scroll", c);
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
        /* @__PURE__ */ m(dl, { size: 14, className: "date-icon" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 410,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("span", { className: "date-text", children: i }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 411,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
      lineNumber: 403,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/DatePillComponent.tsx",
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
function mn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Un(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function fn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function zu(e) {
  const t = kr(e), n = /* @__PURE__ */ new Date(), o = new Date(n.getFullYear(), n.getMonth(), n.getDate()), r = new Date(o);
  r.setDate(r.getDate() + 1);
  const i = new Date(o);
  i.setDate(i.getDate() - 1);
  const a = o.getDay(), s = a === 0 ? 1 : 8 - a, l = new Date(o);
  if (l.setDate(l.getDate() + s), t.getTime() === o.getTime()) return "Today";
  if (t.getTime() === r.getTime()) return "Tomorrow";
  if (t.getTime() === i.getTime()) return "Yesterday";
  if (t.getTime() === l.getTime()) return "Next Monday";
  const c = { month: "short", day: "numeric" };
  return t.getFullYear() !== o.getFullYear() && (c.year = "numeric"), t.toLocaleDateString("en-US", c);
}
function cy(e) {
  return kr(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function _t(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return mn();
  if (n === "tomorrow") return Un(1);
  if (n === "yesterday") return Un(-1);
  if (n === "next monday") {
    const s = (/* @__PURE__ */ new Date()).getDay(), l = s === 0 ? 1 : 8 - s;
    return Un(l);
  }
  const o = t.match(/^([A-Za-z]+)\s+(\d{1,2})(?:,?\s*(\d{4}))?$/);
  if (o) {
    const s = {
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
    if (s !== void 0) {
      const l = parseInt(o[2], 10), c = o[3] ? parseInt(o[3], 10) : (/* @__PURE__ */ new Date()).getFullYear(), u = new Date(c, s, l);
      return fn(u);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const i = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (i) {
    const a = new Date(parseInt(i[3], 10), parseInt(i[1], 10) - 1, parseInt(i[2], 10));
    return fn(a);
  }
  return null;
}
function ws(e) {
  const t = kr(e), n = /* @__PURE__ */ new Date(), o = new Date(n.getFullYear(), n.getMonth(), n.getDate()), r = new Date(o);
  return r.setDate(r.getDate() + 7), t.getTime() === o.getTime() ? "date-today" : t < o ? "date-overdue" : t <= r ? "date-upcoming" : "";
}
const uy = new Ie("datePillPaste"), dy = ar.create({
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
        default: mn(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, o = zu(n), r = ws(n);
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
    return or(ly, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || mn();
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
        d().deleteRange(u).insertDatePill(mn()).run();
      }
    }), t = new Oe({
      find: /@tomorrow\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(Un(1)).run();
      }
    }), n = new Oe({
      find: /@yesterday\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(Un(-1)).run();
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
          d().deleteRange(u).insertDatePill(fn(b)).run();
        }
      }
    }), i = new Oe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = _t(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), a = new Oe({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = _t(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), s = new Oe({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), l = new Oe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = _t(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), c = new Oe({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = _t(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    });
    return [
      e,
      t,
      n,
      o,
      r,
      i,
      a,
      s,
      l,
      c
    ];
  },
  addProseMirrorPlugins() {
    const e = this.type;
    return [
      new Pe({
        key: uy,
        props: {
          handlePaste(t, n) {
            const o = n.clipboardData;
            if (!o) return !1;
            const r = o.getData("text/plain"), i = o.getData("text/html");
            if (i && i.includes('data-type="date-pill"')) return !1;
            const a = /@([^@\n]+)@/g;
            let s = !1, l;
            const c = new RegExp(a.source, a.flags);
            for (; (l = c.exec(r)) !== null; )
              if (_t(l[1])) {
                s = !0;
                break;
              }
            if (!s) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, p = [];
            let h = 0;
            const g = new RegExp(a.source, a.flags);
            let b;
            for (; (b = g.exec(r)) !== null; ) {
              const E = b[1], y = _t(E);
              if (y) {
                const k = r.slice(h, b.index);
                k && p.push(f.text(k)), p.push(e.create({ date: y })), h = b.index + b[0].length;
              }
            }
            const v = r.slice(h);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const w = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, p)
            ), { $from: N } = u.selection;
            if (N.parent.type.name === "paragraph") {
              const E = d;
              let y = u.selection.from;
              for (const k of p)
                E.insert(y, k), y += k.nodeSize;
              E.delete(u.selection.from, u.selection.to), t.dispatch(E);
            } else
              d.replaceSelectionWith(w), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), Ke = /* @__PURE__ */ new Map();
function my({ node: e, selected: t, editor: n, getPos: o, deleteNode: r }) {
  const i = j(null), a = j(null), s = e.attrs.tag || "", l = j(!1), [c, u] = Y(() => Ke.has(s)), [d, f] = Y(() => Ke.get(s)?.value ?? s);
  q(() => {
    c || f(s);
  }, [s, c]), q(() => {
    if (c) {
      const w = Ke.get(s);
      Ke.set(s, {
        value: d,
        focusedAt: w?.focusedAt ?? Date.now()
      });
    }
  }, [c, d, s]);
  const p = H((w) => {
    if (l.current) return;
    l.current = !0;
    const N = w.trim().replace(/^#/, ""), E = Yn(N);
    if (Ke.delete(s), E && Ke.delete(E), !E || !sn(E))
      r();
    else if (E !== s) {
      const y = o();
      if (typeof y == "number" && n) {
        const { tr: k } = n.state, M = e.nodeSize;
        k.delete(y, y + M), k.insert(y, n.schema.nodes.tagPill.create({ tag: E })), n.view.dispatch(k);
      }
    } else
      Ke.delete(s);
    u(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [s, n, o, r, e.nodeSize]), h = H(() => {
    n && !n.isEditable || (Ke.set(s, { value: s, focusedAt: Date.now() }), f(s), u(!0), l.current = !1);
  }, [n, s]);
  q(() => {
    const w = i.current;
    if (!w || c) return;
    const N = (y) => {
      y.preventDefault(), y.stopPropagation(), h();
    }, E = (y) => {
      y.preventDefault(), y.stopPropagation();
    };
    return w.addEventListener("dblclick", N), w.addEventListener("click", E), () => {
      w.removeEventListener("dblclick", N), w.removeEventListener("click", E);
    };
  }, [c, n, o, h]), q(() => {
    if (c) {
      const w = requestAnimationFrame(() => {
        if (a.current) {
          a.current.focus(), a.current.select();
          const N = Ke.get(s);
          N && (N.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(w);
    }
  }, [c, s]);
  const g = H((w) => {
    w.key === "Enter" ? (w.preventDefault(), p(d)) : w.key === "Escape" && (w.preventDefault(), Ke.delete(s), u(!1), l.current = !0, n?.commands.focus());
  }, [p, d, s, n]), b = H(() => {
    const N = Ke.get(s)?.focusedAt ?? 0;
    Date.now() - N > 300 && p(d);
  }, [p, d, s]), v = H((w) => {
    f(w.target.value);
  }, []);
  return c ? /* @__PURE__ */ m(hn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: i,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": s,
      children: [
        /* @__PURE__ */ m(zs, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TagPillComponent.tsx",
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
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TagPillComponent.tsx",
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
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TagPillComponent.tsx",
      lineNumber: 171,
      columnNumber: 9
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TagPillComponent.tsx",
    lineNumber: 170,
    columnNumber: 7
  }, this) : /* @__PURE__ */ m(hn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: i,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": s,
      children: [
        /* @__PURE__ */ m(zs, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TagPillComponent.tsx",
          lineNumber: 203,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("span", { className: "tag-text", children: s }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TagPillComponent.tsx",
          lineNumber: 204,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TagPillComponent.tsx",
      lineNumber: 196,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TagPillComponent.tsx",
    lineNumber: 195,
    columnNumber: 5
  }, this);
}
function sn(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function Yn(e) {
  return e.toLowerCase().trim();
}
const fy = new Ie("tagPillPaste"), py = ar.create({
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
    return or(my, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = Yn(e);
        return sn(n) ? t.insertContent({
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
        const r = Yn(o[1]);
        if (sn(r)) {
          const a = o[0].startsWith(" ") ? 1 : 0, s = t.from + a;
          n().deleteRange({ from: s, to: t.to }).insertTagPill(r).run();
        }
      }
    })] : [];
  },
  addProseMirrorPlugins() {
    if (!this.options.enableAutoDetect) return [];
    const e = this.type;
    return [
      new Pe({
        key: fy,
        props: {
          handlePaste(t, n) {
            const o = n.clipboardData;
            if (!o) return !1;
            const r = o.getData("text/plain"), i = o.getData("text/html");
            if (i && i.includes('data-type="tag-pill"')) return !1;
            const a = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let s = !1, l;
            const c = new RegExp(a.source, a.flags);
            for (; (l = c.exec(r)) !== null; )
              if (sn(l[1])) {
                s = !0;
                break;
              }
            if (!s) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, p = [];
            let h = 0;
            const g = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let b;
            for (; (b = g.exec(r)) !== null; ) {
              const N = Yn(b[1]);
              if (sn(N)) {
                const E = b[0], y = E.startsWith(" ") || E.startsWith(`
`) ? 1 : 0, k = r.slice(h, b.index + y);
                k && p.push(f.text(k)), p.push(e.create({ tag: N })), h = b.index + E.length;
              }
            }
            const v = r.slice(h);
            if (v && p.push(f.text(v)), p.length === 0) return !1;
            const { $from: w } = u.selection;
            if (w.parent.type.name === "paragraph") {
              const N = d;
              let E = u.selection.from;
              for (const y of p)
                N.insert(E, y), E += y.nodeSize;
              N.delete(u.selection.from, u.selection.to), t.dispatch(N);
            } else {
              const N = f.nodes.doc.create(
                null,
                f.nodes.paragraph.create(null, p)
              );
              d.replaceSelectionWith(N), t.dispatch(d);
            }
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), hy = /\[\[([^\[\]]+)\]\]$/, gy = bl.create({
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
        find: hy,
        handler: ({ state: e, range: t, match: n, chain: o }) => {
          try {
            const r = n[1];
            if (!r) return;
            const i = t.from, a = t.to;
            o().deleteRange({ from: i, to: a }).insertContentAt(i, {
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
}), mt = {
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
}, by = ["info", "note", "prompt", "resources", "todo"];
function vy(e) {
  return e.length < 3 ? !1 : !!(mt.header.test(e) || mt.bold.test(e) || mt.list.test(e) || mt.taskList.test(e) || mt.codeBlock.test(e) || mt.callout.test(e) || mt.highlight.test(e) || mt.link.test(e) || mt.table.test(e));
}
function wy(e) {
  const t = e.split(/\s*\\?\|\s*/).map((i) => i.trim());
  let n = "", o = "left", r = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? r = t[1] : ["left", "center", "right"].includes(t[1]) && (o = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (o = t[1]), /^\d+$/.test(t[2]) && (r = t[2])), { alt: n, align: o, width: r };
}
function Ny(e, t) {
  const { alt: n, align: o, width: r } = wy(e), i = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[o] || "margin-right: auto;", a = r ? ` width="${r}" style="width: ${r}px"` : "";
  return `<figure class="image-resizer" style="${i}"><img src="${t.trim()}" alt="${n}" data-align="${o}"${a} /></figure>`;
}
function Jo(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Wa(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${Jo(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, o = e.split(n).filter((i) => i.trim()), r = [];
  for (const i of o) {
    const a = i.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    a ? r.push(Ny(a[1], a[2])) : r.push(`<p>${Jo(i.trim())}</p>`);
  }
  return r.join("");
}
function Uu(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, o = Math.floor(n / 2), r = e.trimStart(), i = r.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (i)
    return { type: "task", depth: o, text: i[2].trim(), checked: i[1] === "x" };
  const a = r.match(/^-\s+(.+)$/);
  if (a)
    return { type: "ul", depth: o, text: a[1].trim() };
  const s = r.match(/^\d+\.\s+(.+)$/);
  return s ? { type: "ol", depth: o, text: s[1].trim() } : null;
}
function Yu(e) {
  if (e.length === 0) return "";
  const t = (r, i) => {
    let a = "", s = r;
    const l = e[s]?.type || "ul", c = l === "task", u = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, d = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (a += u; s < e.length && e[s].depth >= i; ) {
      const f = e[s];
      if (f.depth === i) {
        if (c ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${Jo(f.text)}</p>` : a += `<li><p>${Jo(f.text)}</p>`, s + 1 < e.length && e[s + 1].depth > i) {
          const p = t(s + 1, e[s + 1].depth);
          a += p.html, s = p.nextIdx;
        } else
          s++;
        a += "</li>";
      } else
        s++;
    }
    return a += d, { html: a, nextIdx: s };
  }, n = Math.min(...e.map((r) => r.depth));
  return t(0, n).html;
}
function Ba(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(e);
  if (!t && !n)
    return Wa(e);
  const o = e.split(/<br\s*\/?>/i).filter((s) => s.trim()), r = [];
  let i = [];
  const a = () => {
    i.length !== 0 && (r.push(Yu(i)), i = []);
  };
  for (const s of o) {
    const l = Uu(s);
    if (l) {
      if (i.length > 0) {
        const c = i[0].type;
        l.depth === 0 && l.type !== c && a();
      }
      i.push(l);
    } else
      a(), r.push(Wa(s.trim()));
  }
  return a(), r.join("");
}
function yy(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const o = t[0].split("|").map((s) => s.trim()).filter((s) => s.length > 0);
  if (o.length === 0 || !t[1].includes("-")) return "";
  const i = t.slice(2);
  let a = "<table><thead><tr>";
  for (const s of o)
    a += "<th>" + Ba(s) + "</th>";
  a += "</tr></thead><tbody>";
  for (const s of i) {
    if (!s.trim()) continue;
    const l = s.split("|"), c = [];
    for (let u = 0; u < l.length; u++) {
      const d = l[u].trim();
      u === 0 && d === "" && s.trim().startsWith("|") || u === l.length - 1 && d === "" && s.trim().endsWith("|") || c.push(d);
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
function ky(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, o = [];
  t = t.replace(n, (d) => {
    const f = d.split(`
`);
    if (f.length >= 2) {
      const p = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const h = yy(d);
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
  }), by.forEach((d) => {
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
  const i = t.split(`
`), a = [];
  let s = [];
  const l = () => {
    s.length !== 0 && (a.push(Yu(s)), s = []);
  };
  for (const d of i) {
    const f = Uu(d);
    if (f) {
      if (s.length > 0) {
        const h = s[0].type, g = Math.min(...s.map((b) => b.depth));
        f.depth === g && f.type !== h && l();
      }
      s.push(f);
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
    const h = f.split("|").map((N) => N.trim());
    let g = "", b = "left", v = null;
    h.length === 1 ? g = h[0] : h.length === 2 ? (g = h[0], /^\d+$/.test(h[1]) ? v = h[1] : ["left", "center", "right"].includes(h[1]) ? b = h[1] : g = f) : h.length === 3 ? (g = h[0], ["left", "center", "right"].includes(h[1]) && (b = h[1]), /^\d+$/.test(h[2]) && (v = h[2])) : g = f;
    const w = v ? ` width="${v}" style="width: ${v}px"` : "";
    return `<img src="${p.trim()}" alt="${g}" data-align="${b}"${w}>`;
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
const xy = Ze.create({
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
      new Pe({
        key: new Ie("markdownPaste"),
        props: {
          handlePaste(t, n, o) {
            const r = n.clipboardData;
            if (!r) return !1;
            const i = r.getData("text/html");
            if (i && i.trim())
              return !1;
            const a = r.getData("text/plain");
            if (!a || !vy(a))
              return !1;
            n.preventDefault();
            const s = ky(a);
            return e.commands.insertContent(s, {
              parseOptions: {
                preserveWhitespace: !1
              }
            }), !0;
          }
        }
      })
    ];
  }
}), Ha = new Ie("collapsibleHeading");
function Cy(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function er(e, t) {
  const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  return e.descendants((r, i) => {
    if (r.type.name === "heading" && t.includes(r.attrs.level)) {
      const a = r.attrs.level, s = r.textContent.slice(0, 50), l = `h${a}-${s}`, c = o.get(l) ?? 0;
      o.set(l, c + 1), n.set(i, Cy(a, s, c));
    }
  }), n;
}
let pn = null;
function ni(e, t, n) {
  const o = [], r = er(e, n.levels), i = [];
  e.descendants((c, u) => {
    if (c.type.name === "heading" && n.levels.includes(c.attrs.level)) {
      const d = r.get(u) ?? "";
      i.push({
        pos: u,
        level: c.attrs.level,
        id: d,
        isCollapsed: t.collapsedHeadings.has(d),
        nodeSize: c.nodeSize
      });
    }
  });
  const a = [];
  for (let c = 0; c < i.length; c++) {
    const u = i[c];
    if (u.isCollapsed) {
      const d = u.pos + u.nodeSize;
      let f = e.content.size;
      for (let p = c + 1; p < i.length; p++)
        if (i[p].level <= u.level) {
          f = i[p].pos;
          break;
        }
      d < f && a.push({ start: d, end: f });
    }
  }
  const s = [];
  for (const c of a)
    if (s.length === 0)
      s.push(c);
    else {
      const u = s[s.length - 1];
      c.start <= u.end ? u.end = Math.max(u.end, c.end) : s.push(c);
    }
  function l(c) {
    for (const u of s)
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
          const N = g.parentElement;
          if (N) return N;
        }
        const b = document.createElement("span");
        b.className = "collapsible-heading-chevron-wrapper", b.setAttribute("contenteditable", "false");
        const v = document.createElement("button");
        return v.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, v.setAttribute("data-heading-id", d), v.setAttribute("data-heading-level", String(c.attrs.level)), v.setAttribute("contenteditable", "false"), v.setAttribute("tabindex", "-1"), v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', v.title = f ? "Click to expand" : "Click to collapse", v.addEventListener("click", (w) => {
          w.preventDefault(), w.stopPropagation();
          const N = v.classList.contains("collapsed");
          v.classList.remove("collapsed", "expanded"), v.classList.add(N ? "expanded" : "collapsed"), v.title = N ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(d) ? t.collapsedHeadings.delete(d) : t.collapsedHeadings.add(d), pn && pn.dispatch(pn.state.tr.setMeta("collapsibleHeading", { toggled: d }));
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
function Ey(e, t, n, o) {
  if (n.collapsedHeadings.size === 0) return;
  const r = er(t, o), i = new Set(r.values()), a = [];
  n.collapsedHeadings.forEach((s) => {
    i.has(s) || a.push(s);
  });
  for (const s of a)
    n.collapsedHeadings.delete(s);
}
const Ty = Ze.create({
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
      new Pe({
        key: Ha,
        view(n) {
          return pn = n, {
            update(o) {
              pn = o;
            },
            destroy() {
              pn = null;
            }
          };
        },
        state: {
          init(n, o) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: ni(o.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, o, r, i) {
            const a = n.getMeta("collapsibleHeading");
            return a || n.docChanged ? (n.docChanged && !a && Ey(r.doc, i.doc, e, t.levels), {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: ni(i.doc, e, t),
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
            return o?.decorations ? o.decorations : ni(n.doc, e, t);
          }
        }
      })
    ];
  }
}), Sy = /\[([^\]]+)\]\(([^)]+)\)$/, My = /^(https?:\/\/|www\.)[^\s]+$/i, Dy = Ze.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Oe({
        find: Sy,
        handler: ({ state: e, range: t, match: n, chain: o }) => {
          const r = n[1];
          let i = n[2];
          i && !i.startsWith("http://") && !i.startsWith("https://") && (i.startsWith("www."), i = "https://" + i), o().deleteRange(t).insertContent({
            type: "text",
            text: r,
            marks: [
              {
                type: "link",
                attrs: {
                  href: i,
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
      new Pe({
        key: new Ie("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const o = n.clipboardData;
            if (!o) return !1;
            const r = o.getData("text/plain");
            if (!r) return !1;
            const i = r.trim();
            if (!My.test(i)) return !1;
            const { state: a } = t, { selection: s } = a, { from: l, to: c, empty: u } = s;
            let d = i;
            if (!d.startsWith("http://") && !d.startsWith("https://") && (d.startsWith("www."), d = "https://" + d), !u && a.doc.textBetween(l, c))
              return e.chain().focus().extendMarkRange("link").setLink({ href: d }).run(), !0;
            const f = a.schema.marks.link.create({ href: d }), p = a.tr;
            return p.insertText(d, l, c), p.addMark(l, l + d.length, f), t.dispatch(p), !0;
          }
        }
      })
    ];
  }
}), Ay = ["info", "note", "prompt", "resources", "todo"], Py = Ze.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Pe({
        key: new Ie("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: o } = t, { selection: r, doc: i } = o, { $from: a } = r, s = a.start();
            a.end();
            const l = i.textBetween(s, a.pos, ""), c = l.trim();
            for (const u of Ay)
              if (c === `\`\`\`${u}`) {
                n.preventDefault();
                const d = o.tr, f = s + l.indexOf("```");
                d.delete(f, a.pos);
                const p = e.schema.nodes.callout, h = e.schema.nodes.paragraph;
                if (p && h) {
                  const g = h.create(), b = p.create({ type: u }, Vm.from(g));
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
}), Oo = new Ie("searchHighlight"), Iy = Ze.create({
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
      new Pe({
        key: Oo,
        state: {
          init() {
            return _e.empty;
          },
          apply(t, n, o, r) {
            const { searchTerm: i, caseSensitive: a, useRegex: s, currentMatchIndex: l } = e, c = t.getMeta(Oo), u = t.docChanged;
            if (!i)
              return _e.empty;
            if (!u && !c)
              return n.map(t.mapping, r.doc);
            const d = [];
            let f = 0;
            try {
              let p;
              if (s)
                p = new RegExp(i, a ? "g" : "gi");
              else {
                const h = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                p = new RegExp(h, a ? "g" : "gi");
              }
              r.doc.descendants((h, g) => {
                if (h.isText && h.text) {
                  let b;
                  for (; (b = p.exec(h.text)) !== null; ) {
                    const v = g + b.index, w = g + b.index + b[0].length, N = f === l;
                    d.push(
                      Ye.inline(v, w, {
                        class: N ? "search-highlight-current" : "search-highlight"
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
}), Ry = new Ie("tabIndent");
function Ly(e) {
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
const Oy = Ze.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Pe({
        key: Ry,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: o } = e, r = Ly(n);
            if (!r)
              return t.preventDefault(), !0;
            t.preventDefault();
            const i = n.schema.nodes[r];
            if (!i) return !0;
            if (t.shiftKey) {
              if (!Ys(i)(n, o)) {
                const l = r === "taskItem" ? "listItem" : "taskItem", c = n.schema.nodes[l];
                c && Ys(c)(n, o);
              }
            } else if (!js(i)(n, o)) {
              const l = r === "taskItem" ? "listItem" : "taskItem", c = n.schema.nodes[l];
              c && js(c)(n, o);
            }
            return !0;
          }
        }
      })
    ];
  }
}), _y = new Ie("expandSelection");
function oi(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const $y = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), Wy = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), By = "tableRow", Hy = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function Fy(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--)
    if (o.node(r).isTextblock) {
      const a = o.start(r), s = o.end(r);
      if (a < t || s > n)
        return { from: a, to: s };
    }
  return null;
}
function zy(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--) {
    const i = o.node(r);
    if (Hy.has(i.type.name)) {
      const a = o.start(r), s = o.end(r);
      if (a < t || s > n)
        return { from: a, to: s };
    }
  }
  return null;
}
function Uy(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--)
    if (o.node(r).type.name === By) {
      const a = o.start(r), s = o.end(r);
      if (a < t || s > n)
        return { from: a, to: s };
    }
  return null;
}
function Yy(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--) {
    const i = o.node(r);
    if (Wy.has(i.type.name)) {
      const a = o.start(r), s = o.end(r);
      if (a < t || s > n)
        return { from: a, to: s };
    }
  }
  return null;
}
function jy(e, t, n) {
  const o = e.resolve(t);
  let r = -1;
  for (let s = o.depth; s >= 1; s--) {
    const l = o.node(s);
    $y.has(l.type.name) && (r = s);
  }
  if (r === -1) return null;
  const i = o.start(r), a = o.end(r);
  return i < t || a > n ? { from: i, to: a } : null;
}
function Vy(e) {
  const t = [];
  if (e.forEach((o, r) => {
    o.type.name === "heading" && t.push({ level: o.attrs.level, from: r });
  }), t.length === 0) return [];
  const n = [];
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
    let i = e.content.size;
    for (let a = o + 1; a < t.length; a++)
      if (t[a].level <= r.level) {
        i = t[a].from;
        break;
      }
    n.push({
      level: r.level,
      from: r.from,
      to: i
    });
  }
  return n;
}
function Ky(e, t, n) {
  const o = e.filter((r) => r.from <= t && r.to >= n);
  return o.sort((r, i) => r.to - r.from - (i.to - i.from)), o;
}
function Gy(e, t) {
  const n = e.resolve(t);
  for (let o = n.depth; o >= 1; o--)
    if (n.node(o).type.name === "table") return !0;
  return !1;
}
function qy(e, t, n) {
  const o = [];
  let r = t, i = n;
  const a = (l) => l && (l.from < r || l.to > i) ? (o.push(l), r = l.from, i = l.to, !0) : !1;
  a(Fy(e, r, i)), Gy(e, t) && (a(zy(e, r, i)), a(Uy(e, r, i))), a(jy(e, r, i)), a(Yy(e, r, i));
  const s = Vy(e);
  if (s.length > 0) {
    const l = Ky(s, r, i);
    for (const c of l)
      a({ from: c.from, to: c.to });
  }
  return (r > 0 || i < e.content.size) && o.push({ from: 0, to: e.content.size }), o;
}
const Xy = Ze.create({
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
        const t = this.storage, { doc: n, selection: o } = e.state, { from: r, to: i } = o;
        if (t.expansionDepth > 0 && r === t.lastExpandedFrom && i === t.lastExpandedTo || (t.expansionDepth = 0), o instanceof Nm || r === 0 && i === n.content.size)
          return !0;
        const s = qy(n, r, i);
        let l = null;
        for (const c of s)
          if (c.from < r || c.to > i) {
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
      new Pe({
        key: _y,
        props: {
          handleClick() {
            return oi(e), !1;
          },
          handleTextInput() {
            return oi(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && oi(e), !1;
          }
        }
      })
    ];
  }
}), Zy = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function Qy(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, o = parseInt(t.slice(2, 4), 16) / 255, r = parseInt(t.slice(4, 6), 16) / 255, i = (s) => s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  return 0.2126 * i(n) + 0.7152 * i(o) + 0.0722 * i(r) > 0.4;
}
const Jy = new Ie("hexColorDecoration");
function ju(e, t, n) {
  const o = [];
  return e.nodesBetween(t, n, (r, i) => {
    if (!r.isText) return;
    const a = r.text || "";
    let s;
    const l = new RegExp(Zy.source, "g");
    for (; (s = l.exec(a)) !== null; ) {
      const c = i + s.index, u = c + s[0].length;
      if (u >= t && c <= n) {
        const d = s[0], f = Qy(d);
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
function ek(e) {
  const t = ju(e, 0, e.content.size);
  return _e.create(e, t);
}
const tk = bl.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Pe({
        key: Jy,
        state: {
          init(e, { doc: t }) {
            return ek(t);
          },
          apply(e, t) {
            if (!e.docChanged)
              return t;
            let n = t.map(e.mapping, e.doc);
            const o = [];
            if (e.mapping.maps.forEach((i, a) => {
              i.forEach((s, l, c, u) => {
                const d = Math.max(0, c - 10), f = Math.min(e.doc.content.size, u + 10);
                o.push({ from: d, to: f });
              });
            }), o.length === 0)
              return n;
            o.sort((i, a) => i.from - a.from);
            const r = [o[0]];
            for (let i = 1; i < o.length; i++) {
              const a = r[r.length - 1];
              o[i].from <= a.to ? a.to = Math.max(a.to, o[i].to) : r.push(o[i]);
            }
            for (const i of r) {
              n = n.remove(
                n.find(i.from, i.to)
              );
              const a = ju(e.doc, i.from, i.to);
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
}), Te = new Ie("selectAllOccurrences");
function Fa(e, t, n, o, r) {
  const i = [];
  if (!t) return i;
  let a;
  try {
    if (o)
      a = new RegExp(t, n ? "g" : "gi");
    else {
      let s = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      r && (s = `\\b${s}\\b`), a = new RegExp(s, n ? "g" : "gi");
    }
  } catch {
    return i;
  }
  return e.descendants((s, l) => {
    if (s.isText && s.text) {
      let c;
      for (; (c = a.exec(s.text)) !== null; )
        i.push({
          from: l + c.index,
          to: l + c.index + c[0].length,
          text: c[0]
        });
    }
    return !0;
  }), i;
}
function Et(e, t) {
  const n = Te.getState(e.state);
  if (!n) return [];
  const o = [];
  return n.find().forEach((r) => {
    if (r.from === r.to) return;
    const i = e.state.doc.textBetween(r.from, r.to, "");
    o.push({ from: r.from, to: r.to, text: i });
  }), o;
}
function nk(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function xe(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const ok = Ze.create({
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
          caseSensitive: i = !1,
          useRegex: a = !1,
          wholeWord: s = !1
        } = e;
        if (!r) return !1;
        const l = Fa(t.state.doc, r, i, a, s);
        return l.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = l, this.storage.searchTerm = r, this.storage.caseSensitive = i, this.storage.useRegex = a, this.storage.wholeWord = s, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = r.length, this.storage.allMatches = l, this.storage.nextMatchIndex = l.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], o && o(n.setMeta(Te, { activate: !0 })), !0);
      },
      /**
       * Select the next occurrence incrementally (Cmd+D behavior).
       * First call: selects the word under cursor or current selection.
       * Subsequent calls: add the next match to the selection.
       */
      selectNextOccurrence: () => ({ editor: e, tr: t, dispatch: n }) => {
        const o = this.storage;
        if (!o.isActive) {
          const { state: r } = e, { from: i, to: a } = r.selection;
          let s = "";
          if (i !== a)
            s = r.doc.textBetween(i, a, "");
          else {
            const d = r.doc.resolve(i), f = d.parent;
            if (f.isTextblock) {
              const p = f.textContent, h = d.parentOffset;
              let g = h, b = h;
              for (; g > 0 && /\w/.test(p[g - 1]); ) g--;
              for (; b < p.length && /\w/.test(p[b]); ) b++;
              g < b && (s = p.slice(g, b));
            }
          }
          if (!s) return !1;
          const l = Fa(r.doc, s, !1, !1, !1);
          if (l.length === 0) return !1;
          const c = nk(l, i), u = l[c];
          return o.isActive = !0, o.ranges = [u], o.searchTerm = s, o.caseSensitive = !1, o.useRegex = !1, o.wholeWord = !1, o.typedBuffer = "", o.isTypingReplace = !1, o.originalTermLength = s.length, o.allMatches = l, o.nextMatchIndex = (c + 1) % l.length, o.isIncremental = !0, o.undoStack = [], o.redoStack = [], n && n(t.setMeta(Te, { activate: !0 })), setTimeout(() => {
            try {
              const d = e.view.domAtPos(u.from);
              d.node && d.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {
            }
          }, 20), !0;
        }
        if (o.isIncremental && o.allMatches.length > 0) {
          const r = o.nextMatchIndex, i = o.allMatches[r];
          return o.ranges.some(
            (s) => s.from === i.from && s.to === i.to
          ) ? !1 : (o.ranges = [...o.ranges, i], o.nextMatchIndex = (r + 1) % o.allMatches.length, o.ranges.length >= o.allMatches.length && (o.isIncremental = !1), n && n(t.setMeta(Te, { activate: !0 })), setTimeout(() => {
            try {
              const s = e.view.domAtPos(i.from);
              s.node && s.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {
            }
          }, 20), !0);
        }
        return !1;
      },
      /**
       * Deactivate "Select All Occurrences" mode and clear highlights.
       */
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (xe(this.storage), t && t(e.setMeta(Te, { deactivate: !0 })), !0),
      /**
       * Apply a mark (bold, italic, etc.) to all selected occurrences in one transaction.
       * All changes are in a single transaction for proper undo/redo.
       */
      toggleMarkOnAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: o }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        const r = t.schema.marks[e];
        if (!r) return !1;
        const { ranges: i } = this.storage, a = i.every((s) => {
          let l = !0;
          return t.state.doc.nodesBetween(s.from, s.to, (c) => {
            c.isText && !r.isInSet(c.marks) && (l = !1);
          }), l;
        });
        if (o) {
          for (const s of i)
            a ? n.removeMark(s.from, s.to, r) : n.addMark(s.from, s.to, r.create());
          o(n);
        }
        return setTimeout(() => {
          try {
            const s = t.view;
            if (s) {
              const l = Et(s, this.storage);
              this.storage.ranges = l, l.length === 0 && xe(this.storage);
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
          const o = [...this.storage.ranges].sort((r, i) => i.from - r.from);
          for (const r of o)
            t.delete(r.from, r.to);
          n(t);
        }
        return xe(this.storage), !0;
      },
      /**
       * Replace all selected occurrences with new text in a single transaction.
       */
      replaceAllOccurrences: (e) => ({ editor: t, tr: n, dispatch: o }) => {
        if (!this.storage.isActive || this.storage.ranges.length === 0) return !1;
        if (o) {
          const r = [...this.storage.ranges].sort((i, a) => a.from - i.from);
          for (const i of r)
            n.replaceWith(i.from, i.to, t.schema.text(e));
          o(n);
        }
        return e ? setTimeout(() => {
          try {
            const r = t.view;
            if (r) {
              const i = Et(r, this.storage);
              this.storage.ranges = i, this.storage.searchTerm = e, i.length === 0 && xe(this.storage);
            }
          } catch {
          }
        }, 10) : xe(this.storage), !0;
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
      new Pe({
        key: Te,
        state: {
          init() {
            return _e.empty;
          },
          apply(t, n, o, r) {
            const i = t.getMeta(Te);
            if (i?.deactivate || !e.isActive)
              return _e.empty;
            if (i?.activate || i?.refresh) {
              const a = [];
              for (const s of e.ranges) {
                a.push(
                  Ye.inline(s.from, s.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const l = document.createElement("span");
                l.className = "select-all-multi-cursor", l.setAttribute("aria-hidden", "true"), a.push(
                  Ye.widget(s.to, l, {
                    side: 1,
                    key: `cursor-${s.from}-${s.to}`
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
              xe(e);
              const { tr: r } = t.state;
              t.dispatch(r.setMeta(Te, { deactivate: !0 }));
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
              xe(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Te, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const r = e.undoStack.pop();
                return e.typedBuffer = r, r === "" && (e.isTypingReplace = !1), Km(t.state, t.dispatch), setTimeout(() => {
                  const i = Et(t);
                  e.ranges = i, i.length === 0 && xe(e);
                }, 10), !0;
              }
              xe(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Te, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const r = e.redoStack.pop();
                return e.typedBuffer = r, e.isTypingReplace = !0, Gm(t.state, t.dispatch), setTimeout(() => {
                  const i = Et(t);
                  e.ranges = i, i.length === 0 && xe(e);
                }, 10), !0;
              }
              xe(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Te, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const o = Et(t);
                if (o.length === 0) {
                  xe(e);
                  const { tr: s } = t.state;
                  return t.dispatch(s.setMeta(Te, { deactivate: !0 })), !0;
                }
                const r = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, i = [...o].sort((s, l) => l.from - s.from), { tr: a } = t.state;
                for (const s of i)
                  a.replaceWith(s.from, s.to, t.state.schema.text(r));
                t.dispatch(a), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const s = Et(t);
                  e.ranges = s, s.length === 0 && xe(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const o = [...e.ranges].sort((a, s) => s.from - a.from), { tr: r } = t.state;
                for (const a of o)
                  r.delete(a.from, a.to);
                t.dispatch(r), xe(e);
                const { tr: i } = t.state;
                t.dispatch(i.setMeta(Te, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const o = [...e.ranges].sort((a, s) => s.from - a.from), { tr: r } = t.state;
              for (const a of o)
                r.delete(a.from, a.to);
              t.dispatch(r), xe(e);
              const { tr: i } = t.state;
              return t.dispatch(i.setMeta(Te, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              xe(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Te, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              xe(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Te, { deactivate: !0 })), !1;
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
            const i = Et(t);
            if (i.length === 0) {
              xe(e);
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(Te, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += r : (e.isTypingReplace = !0, e.typedBuffer = r);
            const a = [...i].sort((l, c) => c.from - l.from), { tr: s } = t.state;
            for (const l of a)
              s.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(s), setTimeout(() => {
              const l = Et(t);
              e.ranges = l, l.length === 0 && xe(e);
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
function ik(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => {
      typeof o.result == "string" ? t(o.result) : n(new Error("Failed to read file"));
    }, o.onerror = () => n(new Error("Failed to read file")), o.readAsDataURL(e);
  });
}
function sk(e, t) {
  const [n, o] = e.split(","), r = n.match(/:(.*?);/), i = r ? r[1] : "image/jpeg", a = atob(o), s = new Uint8Array(a.length);
  for (let l = 0; l < a.length; l++)
    s[l] = a.charCodeAt(l);
  return new File([s], t, { type: i });
}
function ak(e, t) {
  return t.includes(e.type);
}
function lk(e) {
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
  return new Promise((o, r) => {
    const i = new window.Image(), a = new FileReader();
    a.onload = (s) => {
      i.src = s.target?.result;
    }, a.onerror = () => r(new Error("Failed to read file")), i.onload = () => {
      let s = i.width, l = i.height;
      if (s > t) {
        const b = t / s;
        s = t, l = Math.round(l * b);
      }
      const c = document.createElement("canvas");
      c.width = s, c.height = l;
      const u = c.getContext("2d");
      if (!u) {
        r(new Error("Failed to get canvas context"));
        return;
      }
      u.imageSmoothingEnabled = !0, u.imageSmoothingQuality = "high", u.drawImage(i, 0, 0, s, l);
      const d = e.type === "image/png" || e.type === "image/gif", f = d ? "image/png" : "image/jpeg", p = d ? void 0 : n, h = c.toDataURL(f, p), g = sk(h, e.name);
      o({ dataUrl: h, file: g, width: s, height: l });
    }, i.onerror = () => r(new Error("Failed to load image")), a.readAsDataURL(e);
  });
}
function uk(e, t, n) {
  e.view.state.doc.descendants((o, r) => {
    if (o.type.name === "resizableImage" && o.attrs.src === t && o.attrs.alt === n) {
      try {
        const { state: i, dispatch: a } = e.view, s = i.tr.delete(r, r + o.nodeSize);
        a(s);
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
  if (!ak(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const r = (n.maxFileSize / 1048576).toFixed(1), i = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${i}MB. Maximum size: ${r}MB`), !1;
  }
  const o = rk();
  try {
    n.onUploadStart?.();
    let r, i, a;
    const s = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && s) {
      const d = await ck(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      r = d.dataUrl, a = d.file, i = Math.min(d.width, 600);
    } else {
      r = await ik(e), a = e;
      const d = await lk(r);
      i = Math.min(d.width, 600);
    }
    t.chain().focus().setImage({
      src: r,
      alt: e.name,
      width: i
    }).run();
    const { state: l } = t.view, c = l.selection.from - 1, u = l.doc.nodeAt(c);
    if (u && u.type.name === "resizableImage") {
      const d = t.view.nodeDOM(c);
      if (d) {
        const f = d instanceof HTMLElement ? d : d.dom;
        f && f.classList.add("image-uploading");
      }
    }
    try {
      const d = await n.onImageUpload(a, {
        fileName: e.name,
        mimeType: a.type,
        fileSize: a.size,
        uploadId: o
      });
      let f = !1;
      return t.view.state.doc.descendants((p, h) => {
        if (f) return !1;
        if (p.type.name === "resizableImage" && p.attrs.src === r && p.attrs.alt === e.name) {
          try {
            const { state: g, dispatch: b } = t.view, v = g.doc.nodeAt(h);
            if (v) {
              const w = g.tr.setNodeMarkup(h, void 0, {
                ...v.attrs,
                src: d
              });
              b(w);
            }
          } catch (g) {
            console.warn("Failed to replace placeholder with uploaded reference:", g);
          }
          return f = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((p, h) => {
        if (p.type.name === "resizableImage" && p.attrs.src === d) {
          const g = t.view.nodeDOM(h);
          if (g) {
            const b = g instanceof HTMLElement ? g : g.dom;
            b && b.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (d) {
      return console.warn("Image upload failed, removing placeholder:", d), uk(t, r, e.name), n.onUploadError?.(`Upload failed: ${d instanceof Error ? d.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
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
const dk = Ze.create({
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
      new Pe({
        key: new Ie("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, o) {
            const r = o.clipboardData;
            if (!r) return !1;
            const i = Ua(r);
            return i.length === 0 ? !1 : (o.preventDefault(), i.forEach((a) => {
              za(a, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, o, r, i) {
            if (i) return !1;
            const a = o.dataTransfer;
            if (!a) return !1;
            const s = Ua(a);
            if (s.length === 0)
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
            return s.forEach((c) => {
              za(c, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function mk({
  placeholder: e,
  isMobile: t,
  maxImageSize: n,
  headingLevels: o,
  collapsibleHeadingLevels: r,
  disabledFeatures: i,
  progressiveSelectAll: a,
  enableCollapsibleHeadings: s,
  enableTagAutoDetect: l,
  enableHexColorHighlight: c,
  isLightweight: u,
  setImageEditState: d,
  callbackRefs: f
}) {
  return Ht(() => {
    const p = [
      ym.configure({
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
      Fv,
      zv,
      jv,
      km.configure({
        placeholder: e,
        emptyEditorClass: "is-editor-empty"
      }),
      xm.configure({
        types: ["heading", "paragraph"]
      }),
      Cm.configure({
        multicolor: !0
      }),
      Em.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      _m,
      $m,
      Wm,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...u ? [] : [Bm],
      Dy,
      Iy,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...u ? [] : [ok],
      Oy,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      qm.extend({
        addInputRules() {
          const h = this.type;
          return [
            new Oe({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: g, range: b }) => {
                const { tr: v } = g, w = b.from, N = b.to;
                v.delete(w, N);
                const E = v.doc.resolve(w), y = h.create(), k = E.before(E.depth), M = E.after(E.depth);
                v.replaceWith(k, M, y);
                const x = k + y.nodeSize;
                if (x < v.doc.content.size) {
                  const C = v.doc.resolve(x);
                  C.nodeAfter && C.nodeAfter.isTextblock ? v.setSelection(nt.create(v.doc, x + 1)) : C.nodeAfter && v.setSelection(nt.near(v.doc.resolve(x)));
                } else {
                  const S = g.schema.nodes.paragraph.create();
                  v.insert(x, S), v.setSelection(nt.create(v.doc, x + 1));
                }
                v.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return i.tables || p.push(
      Tm.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Sm,
      Iv,
      Rv,
      ...u ? [] : [Hv]
    ), i.taskLists || p.push(
      Uv.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      Yv.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), !t && !u && p.push(
      Kv.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), i.codeBlocks || p.push(Xv), i.callouts || p.push(Qv, Py), s && !i.collapsibleHeadings && !u && p.push(
      Ty.configure({
        levels: r
      })
    ), i.images || p.push(
      Jv.configure({
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
      dk.configure({
        maxFileSize: n,
        onUploadStart: f.onImageUploadStart.current ? ((...h) => f.onImageUploadStart.current(...h)) : void 0,
        onUploadComplete: f.onImageUploadComplete.current ? ((...h) => f.onImageUploadComplete.current(...h)) : void 0,
        onUploadError: f.onImageUploadError.current ? ((...h) => f.onImageUploadError.current(...h)) : void 0,
        onImageUpload: f.onImageUpload.current ? ((h, g) => f.onImageUpload.current(h, g)) : void 0
      })
    ), i.datePills || p.push(
      dy.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), i.tagPills || p.push(
      py.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: l
      })
    ), i.wikiLinks || p.push(
      gy.configure({
        onWikiLinkClick: (h) => {
          console.log("WikiLink clicked:", h), f.onWikiLinkClick.current?.(h);
        },
        validateLink: (h) => f.validateWikiLink.current ? f.validateWikiLink.current(h) : !0
      })
    ), a && p.push(Xy), c && !u && p.push(tk), i.markdownPaste || p.push(
      xy.configure({
        enableMarkdownPaste: !0
      })
    ), p;
  }, [e, t, n, o, r, i, a, s, l, c, u]);
}
let ht = null, tr = null;
async function Vu() {
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
      const u = c, d = u.getAttribute("src") || "", p = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = u.getAttribute("width"), g = h ? parseInt(h, 10) : null, b = u.getAttribute("data-align") || "left", v = [p], w = b !== "left", N = g && g > 0;
      return (w || N) && v.push(w ? b : "left"), N && v.push(String(g)), `![${v.join(" | ")}](${d})`;
    }
  }), n.addRule("imageResizer", {
    filter: (l) => l.nodeName === "FIGURE" && l.classList.contains("image-resizer"),
    replacement: (l, c) => {
      const u = c.querySelector("img");
      if (!u) return l;
      const d = u.getAttribute("src") || "", p = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), h = u.getAttribute("width"), g = h ? parseInt(h, 10) : null, b = u.getAttribute("data-align") || "left", v = [p], w = b !== "left", N = g && g > 0;
      (w || N) && v.push(w ? b : "left"), N && v.push(String(g));
      const E = `![${v.join(" | ")}](${d})`, y = c.parentNode;
      return y && y.nodeName === "LI" ? `
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
  function i(l) {
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
      const v = g.getAttribute("data-type") === "taskItem", w = g.getAttribute("data-checked") === "true", N = i(g);
      v ? c.push(`${d}- [${w ? "x" : " "}] ${N}`) : f === "OL" ? c.push(`${d}${h + b}. ${N}`) : c.push(`${d}- ${N}`);
      const E = Array.from(g.childNodes).filter(
        (y) => y.nodeType === Node.ELEMENT_NODE && (y.nodeName === "UL" || y.nodeName === "OL")
      );
      for (const y of E)
        a(y, c, u + 1);
    });
  }
  function s(l) {
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
        const v = Array.from(g.querySelectorAll("th, td")), w = v.map((N) => s(N));
        if (b > 0 && v.length > 0 && v[0].nodeName === "TH" && (p = !0), f.push("| " + w.join(" | ") + " |"), b === 0) {
          const N = v.map(() => "---").join(" | ");
          f.push("| " + N + " |");
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
      return u ? `@${cy(u)}@` : l;
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
  }), ht = n, n;
}
function fk() {
  !tr && !ht && (tr = Vu().then((e) => (ht = e, e)));
}
function pk() {
  return fk(), {
    turndown(e) {
      return ht ? ht.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return ht !== null;
    },
    async ready() {
      ht || (tr ? await tr : await Vu());
    }
  };
}
function hk() {
  const e = j(null);
  return e.current || (e.current = pk()), e.current;
}
function gk(e) {
  const {
    extensions: t,
    content: n,
    editable: o,
    autofocus: r,
    spellCheck: i,
    initialMode: a,
    performanceMode: s,
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
    editorModeRef: w,
    rawMarkdownRef: N,
    setRawMarkdown: E,
    setIsLightweight: y,
    lightweightCheckCounterRef: k,
    isLightweightRef: M
  } = e, x = j(null), C = j(c), S = j(u), D = j(d), A = j(null);
  C.current = c, S.current = u, D.current = d;
  const R = Td({
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
        spellcheck: i ? "true" : "false"
      },
      handleClick: (O, U, I) => {
        if (v) {
          const B = I.target.closest("a");
          if (B) {
            const K = B.getAttribute("href");
            if (K && v(K, I) === !1)
              return I.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: O }) => {
      if (s === "auto" && (k.current++, k.current >= 50)) {
        k.current = 0;
        const I = O.state.doc.content.childCount > l;
        I !== M.current && y(I);
      }
      x.current && clearTimeout(x.current), x.current = setTimeout(() => {
        if (O.isDestroyed) return;
        const U = O.getHTML();
        (C.current || S.current) && (C.current?.(U), S.current?.(U));
      }, 150);
    },
    onFocus: () => {
      h?.();
    },
    onBlur: () => {
      if (x.current && (clearTimeout(x.current), x.current = null, R && !R.isDestroyed)) {
        const O = R.getHTML();
        if ((C.current || S.current) && (C.current?.(O), S.current?.(O)), w.current === "wysiwyg" && A.current) {
          const U = A.current.turndown(O);
          N.current = U, D.current?.(U);
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
    if (x.current && (clearTimeout(x.current), x.current = null, R && !R.isDestroyed)) {
      const O = R.getHTML();
      if ((C.current || S.current) && (C.current?.(O), S.current?.(O)), w.current === "wysiwyg" && A.current) {
        const U = A.current.turndown(O);
        N.current = U, D.current?.(U);
      }
    }
  }, []);
  const L = hk();
  A.current = L;
  const _ = j(!1);
  return q(() => {
    if (!_.current && a === "markdown" && R && !R.isDestroyed && L) {
      const O = R.getHTML(), U = L.turndown(O);
      E(U), N.current = U, _.current = !0;
    }
  }, [R, L, a]), { editor: R, turndownService: L };
}
function bk(e) {
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
        const v = Array.from(f.childNodes), w = [], N = [];
        v.forEach((y) => {
          if (y.nodeType === Node.ELEMENT_NODE) {
            const k = y;
            if (k.tagName === "UL" || k.tagName === "OL" || k.tagName === "P")
              N.push(y);
            else if (k.tagName === "IMG" || k.tagName === "FIGURE")
              if (k.tagName === "IMG") {
                const M = n.createElement("figure");
                M.className = "image-resizer";
                const x = k.getAttribute("data-align") || "left", C = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[x] || "margin-right: auto;";
                M.style.cssText = C, M.appendChild(k.cloneNode(!0)), N.push(M);
              } else
                N.push(y);
            else
              w.push(y);
          } else
            w.push(y);
        });
        const E = N.filter((y) => {
          if (y.nodeType === Node.ELEMENT_NODE) {
            const k = y;
            if (k.tagName === "P" && !k.textContent?.trim() && !k.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", w.length > 0) {
          const y = n.createElement("p");
          w.forEach((k) => y.appendChild(k)), y.firstChild && y.firstChild.nodeType === Node.TEXT_NODE && (y.firstChild.textContent = (y.firstChild.textContent || "").replace(/^\s+/, "")), (y.textContent?.trim() || y.querySelector("img, figure, code, br")) && f.appendChild(y);
        }
        E.forEach((y) => f.appendChild(y));
      }
    }), c && !u && a.setAttribute("data-type", "taskList"));
  };
  return Array.from(o.querySelectorAll(":scope > ul")).forEach(r), o.innerHTML;
}
function vk(e) {
  const t = e.split(`
`), n = [], o = (s) => {
    const l = s.trimStart();
    return /^[-*+]\s+\[[ xX]\]\s/.test(l) ? "task" : /^[-*+]\s+/.test(l) ? "bullet" : /^\d+\.\s+/.test(l) ? "ordered" : null;
  }, r = (s) => /^\s{2,}\S/.test(s), i = (s) => s.trim() === "" || s.trim() === "​";
  let a = !1;
  for (let s = 0; s < t.length; s++) {
    const l = t[s];
    if (/^```/.test(l.trim())) {
      a = !a, n.push(l);
      continue;
    }
    if (a) {
      n.push(l);
      continue;
    }
    if (n.push(l), o(l) !== null || r(l)) {
      let c = s + 1;
      for (; c < t.length && r(t[c]); )
        c++;
      let u = 0;
      const d = c;
      for (; c < t.length && i(t[c]); )
        u++, c++;
      if (u > 0 && c < t.length) {
        const f = o(l), p = o(t[c]);
        if (f !== null && p !== null) {
          for (let h = d; h < c; h++)
            n.push(t[h]);
          n.push("<!-- list-break -->"), s = c - 1;
          continue;
        }
      }
    }
  }
  return n.join(`
`);
}
function wk(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), o = n.body.firstElementChild;
  if (!o) return e;
  const r = Array.from(o.querySelectorAll("li"));
  for (const i of r) {
    if (i.getAttribute("data-type") === "taskItem" || !i.querySelector(":scope > img, :scope > p > img, :scope > figure")) continue;
    const s = Array.from(i.childNodes), l = [], c = [];
    if (s.forEach((u) => {
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
                  const y = n.createElement("p");
                  g.forEach((k) => y.appendChild(k.cloneNode(!0))), y.textContent?.trim() && c.push(y), g.length = 0;
                }
                const v = b, w = n.createElement("figure");
                w.className = "image-resizer";
                const N = v.getAttribute("data-align") || "left", E = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                w.style.cssText = E[N] || "margin-right: auto;", w.appendChild(v.cloneNode(!0)), c.push(w);
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
    }), i.innerHTML = "", l.length > 0 && l.some((d) => (d.textContent || "").trim().length > 0)) {
      const d = n.createElement("p");
      l.forEach((f) => d.appendChild(f)), i.appendChild(d);
    }
    c.forEach((u) => i.appendChild(u));
  }
  return o.innerHTML;
}
function Nk(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (o) => o.replace(/<tr>([\s\S]*?)<\/tr>/gi, (r, i) => `<tr>${i.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function nr(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function yk(e) {
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
    return e.split(t).filter((o) => o.trim()).map((o) => /^<img\s/i.test(o) ? yk(o) : o.trim() ? `<p>${nr(o.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${nr(e)}</p>`;
}
function kk(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, o = Math.floor(n / 2), r = e.trimStart(), i = r.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (i)
    return { type: "task", depth: o, text: i[2].trim(), checked: i[1] === "x" };
  const a = r.match(/^-\s+(.+)$/);
  if (a)
    return { type: "ul", depth: o, text: a[1].trim() };
  const s = r.match(/^(\d+)\.\s+(.+)$/);
  return s ? { type: "ol", depth: o, text: s[2].trim(), index: parseInt(s[1], 10) } : null;
}
function xk(e) {
  if (e.length === 0) return "";
  const t = (r, i) => {
    let a = "", s = r;
    const l = e[s]?.type || "ul", c = l === "task", u = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, d = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (a += u; s < e.length && e[s].depth >= i; ) {
      const f = e[s];
      if (f.depth === i) {
        if (c ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${nr(f.text)}</p>` : a += `<li><p>${nr(f.text)}</p>`, s + 1 < e.length && e[s + 1].depth > i) {
          const p = t(s + 1, e[s + 1].depth);
          a += p.html, s = p.nextIdx;
        } else
          s++;
        a += "</li>";
      } else
        s++;
    }
    return a += d, { html: a, nextIdx: s };
  }, n = Math.min(...e.map((r) => r.depth));
  return t(0, n).html;
}
function Ck(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, o, r) => {
      const i = /<img\s/i.test(o), a = /<br\s*\/?>/i.test(o), s = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(o);
      if (!i && !a && !s) return t;
      let l = o.trim();
      l = l.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const c = l.split(/<br\s*\/?>/i).filter((p) => p.trim());
      if (c.length <= 1 && !s)
        return i ? `${n}${Ya(l)}${r}` : t;
      const u = [];
      let d = [];
      const f = () => {
        d.length !== 0 && (u.push(xk(d)), d = []);
      };
      for (const p of c) {
        const h = kk(p);
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
function Ek(e, t, n = {}) {
  const {
    enableTagAutoDetect: o = !1,
    disableTagPills: r = !1,
    isValidTag: i,
    normalizeTag: a,
    parseDateFromMarkdown: s,
    getDateVariant: l
  } = n;
  let c = e;
  c = vk(c);
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
    const g = p.split("|").map((y) => y.trim());
    let b = "", v = "left", w = null;
    g.length === 1 ? b = g[0] : g.length === 2 ? (b = g[0], /^\d+$/.test(g[1]) ? w = g[1] : ["left", "center", "right"].includes(g[1]) ? v = g[1] : b = p) : g.length === 3 ? (b = g[0], ["left", "center", "right"].includes(g[1]) && (v = g[1]), /^\d+$/.test(g[2]) && (w = g[2])) : b = p;
    const N = w ? ` width="${w}" style="width: ${w}px"` : "", E = ` data-align="${v}"`;
    return `<img src="${h.trim()}" alt="${b}"${E}${N} />`;
  }), c = c.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), s && l && (c = c.replace(/@([^@\n]+)@/g, (f, p) => {
    const h = s(p);
    if (h) {
      const g = l(h);
      return `<span data-type="date-pill" data-date="${h}" class="date-pill ${g}"><span class="date-icon">📅</span><span class="date-text">${p.trim()}</span></span>`;
    }
    return f;
  })), o && !r && i && a && (c = c.replace(
    new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"),
    (f, p) => {
      const h = a(p);
      return i(h) ? `<span data-type="tag-pill" data-tag="${h}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${h}</span></span>` : f;
    }
  )), c = c.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((f, p) => p % 2 === 1 ? f : f.replace(/\[\[([^\[\]]+)\]\]/g, (h, g) => `<span data-wiki-link data-page-name="${g.trim()}" class="wiki-link">${g.trim()}</span>`)).join(""), c;
}
function Tk(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = bk(t), t = wk(t), t = Nk(t), t = Ck(t), t;
}
function Sk(e, t, n = {}) {
  const o = Ek(e, t, n), r = t(o);
  return Tk(r);
}
function Mk(e, t, n) {
  q(() => {
    if (!e || e.isDestroyed) return;
    const o = (r) => {
      if (e.isDestroyed) return;
      const i = r.key;
      if (!(!(r.metaKey || r.ctrlKey) && i !== " ")) {
        if ((r.metaKey || r.ctrlKey) && r.key === "k") {
          r.preventDefault(), n.openLinkPopover();
          return;
        }
        if (!t && (r.metaKey || r.ctrlKey) && r.key === "f") {
          r.preventDefault();
          const { state: s } = e, { from: l, to: c } = s.selection;
          if (l !== c) {
            const u = s.doc.textBetween(l, c, " ");
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
            const { state: s } = e, { selection: l } = s, { $from: c } = l, u = c.nodeBefore?.textContent || "";
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
              const f = d[2] === "x", p = s.schema.nodes.taskList, h = s.schema.nodes.taskItem;
              if (p && h) {
                const g = s.tr, b = c.pos - u.length, v = c.pos;
                g.delete(b, v);
                const N = g.doc.resolve(b).blockRange();
                if (N) {
                  const E = [
                    { type: p, attrs: {} },
                    { type: h, attrs: { checked: f } }
                  ];
                  g.wrap(N, E), e.view.dispatch(g);
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
              r.preventDefault(), Uo(e, c.pos - 3, c.pos);
              return;
            }
            if (u === "—-") {
              r.preventDefault(), Uo(e, c.pos - 2, c.pos);
              return;
            }
            if (u === "—") {
              r.preventDefault(), Uo(e, c.pos - 1, c.pos);
              return;
            }
          } catch (s) {
            console.warn("Space shortcut error:", s);
          }
      }
    };
    return document.addEventListener("keydown", o, !0), () => document.removeEventListener("keydown", o, !0);
  }, [e, t, n]);
}
function Dk({
  editorModeRef: e,
  rawMarkdownRef: t,
  editorMode: n,
  handleModeSwitch: o,
  setIsFindReplaceOpen: r,
  setFindReplaceFocusTrigger: i
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
      setMode: (s) => {
        if (s !== "wysiwyg" && s !== "markdown") {
          console.error('Invalid mode. Use "wysiwyg" or "markdown"');
          return;
        }
        o(s);
      },
      /**
       * Toggle between wysiwyg and markdown modes
       * @returns {'wysiwyg' | 'markdown'} The new mode after toggle
       */
      toggleMode: () => {
        const s = e.current === "wysiwyg" ? "markdown" : "wysiwyg";
        return o(s), s;
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
      onModeChange: (s) => {
        const l = (c) => {
          s(c.detail.mode);
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
function Ak({
  editor: e,
  turndownService: t,
  editorModeRef: n,
  rawMarkdownRef: o,
  setEditorMode: r,
  setRawMarkdown: i,
  onModeChange: a,
  enableTagAutoDetect: s,
  disabledFeatures: l
}) {
  return H(async (u) => {
    if (e) {
      if (u === "markdown" && n.current === "wysiwyg") {
        const d = e.getHTML(), f = t.turndown(d);
        i(f), o.current = f;
      } else if (u === "wysiwyg" && n.current === "markdown") {
        const { marked: d } = await import("./marked.esm-Tjr8Gfse.js"), f = (g) => d.parse(g, { async: !1, breaks: !0 }), p = {
          enableTagAutoDetect: s,
          disableTagPills: !!l.tagPills,
          isValidTag: sn,
          normalizeTag: Yn,
          parseDateFromMarkdown: _t,
          getDateVariant: ws
        }, h = Sk(o.current, f, p);
        queueMicrotask(() => {
          e.isDestroyed || e.commands.setContent(h);
        });
      }
      r(u), n.current = u, a?.(u);
    }
  }, [e, t, a]);
}
const Pk = 200;
function Ik(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: o = !1,
    enabled: r = !0
  } = t, [i, a] = Y({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), s = j(null), l = j(""), c = H((u) => {
    const d = u.trim(), f = d.length > 0 ? d.split(/\s+/).filter((w) => w.length > 0).length : 0, p = d.replace(/\s/g, "").length, h = u.length;
    let g = 0, b = 0;
    o && (g = d.length > 0 ? d.split(/\n\s*\n/).filter((w) => w.trim().length > 0).length : 0, b = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const v = Math.max(1, Math.ceil(f / Pk));
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
      s.current && clearTimeout(s.current), a((d) => ({ ...d, isCalculating: !0 })), s.current = setTimeout(() => {
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
      e.off("update", u), s.current && clearTimeout(s.current);
    };
  }, [e, n, r, c]), i;
}
function Rk({ status: e, lastSaved: t, className: n = "" }) {
  const o = (r) => {
    if (!r) return "";
    const a = (/* @__PURE__ */ new Date()).getTime() - r.getTime(), s = Math.floor(a / 1e3), l = Math.floor(s / 60), c = Math.floor(l / 60);
    return s < 10 ? "Just now" : s < 60 ? `${s}s ago` : l < 60 ? `${l}m ago` : c < 24 ? `${c}h ago` : r.toLocaleDateString();
  };
  return /* @__PURE__ */ m(
    "div",
    {
      className: `auto-save-indicator flex items-center gap-1.5 text-xs ${n}`,
      title: t ? `Last saved: ${t.toLocaleString()}` : "Not saved yet",
      children: [
        e === "idle" && t && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(qd, { className: "w-3.5 h-3.5 text-muted-foreground" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 40,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-muted-foreground", children: [
            "Saved ",
            o(t)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 41,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 39,
          columnNumber: 9
        }, this),
        e === "saving" && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(ml, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 47,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-cyan-500", children: "Saving..." }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 48,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 46,
          columnNumber: 9
        }, this),
        e === "saved" && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(yn, { className: "w-3.5 h-3.5 text-emerald-500" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 54,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-emerald-500", children: "Saved" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 55,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this),
        e === "error" && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(Xd, { className: "w-3.5 h-3.5 text-red-500" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 61,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-red-500", children: "Save failed" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 62,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 60,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/AutoSaveIndicator.tsx",
      lineNumber: 34,
      columnNumber: 5
    },
    this
  );
}
function Lk({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ m(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ m("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ m(Zd, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/RecoveryBanner.tsx",
            lineNumber: 22,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/RecoveryBanner.tsx",
            lineNumber: 23,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/RecoveryBanner.tsx",
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
                /* @__PURE__ */ m(Ui, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/RecoveryBanner.tsx",
                  lineNumber: 33,
                  columnNumber: 11
                }, this),
                "Recover"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/RecoveryBanner.tsx",
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
              children: /* @__PURE__ */ m(gt, { className: "w-5 h-5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/RecoveryBanner.tsx",
                lineNumber: 43,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/RecoveryBanner.tsx",
              lineNumber: 37,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/RecoveryBanner.tsx",
          lineNumber: 28,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/RecoveryBanner.tsx",
      lineNumber: 18,
      columnNumber: 5
    },
    this
  );
}
function _o(e) {
  const t = [], n = e.split(`
`);
  let o = 0, r = !1, i = "";
  for (let a = 0; a < n.length; a++) {
    const s = n[a], l = o;
    if (s.startsWith("```")) {
      r ? (r = !1, t.push({
        type: "code-block",
        content: s,
        start: l,
        end: l + s.length
      })) : (r = !0, i = s.slice(3).trim(), t.push({
        type: "code-block",
        content: "```",
        start: l,
        end: l + 3
      }), i && t.push({
        type: "code-block-lang",
        content: i,
        start: l + 3,
        end: l + 3 + i.length
      })), o += s.length + 1;
      continue;
    }
    if (r) {
      t.push({
        type: "code-block",
        content: s,
        start: l,
        end: l + s.length
      }), o += s.length + 1;
      continue;
    }
    const c = s.match(/^(#{1,6})\s+(.*)$/);
    if (c) {
      const w = c[1].length;
      t.push({
        type: `heading${w}`,
        content: s,
        start: l,
        end: l + s.length
      }), o += s.length + 1;
      continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(s.trim())) {
      t.push({
        type: "horizontal-rule",
        content: s,
        start: l,
        end: l + s.length
      }), o += s.length + 1;
      continue;
    }
    if (s.startsWith(">")) {
      t.push({
        type: "blockquote",
        content: s,
        start: l,
        end: l + s.length
      }), o += s.length + 1;
      continue;
    }
    if (/^\|?[\s-:|]+\|?$/.test(s) && s.includes("-")) {
      t.push({
        type: "table-separator",
        content: s,
        start: l,
        end: l + s.length
      }), o += s.length + 1;
      continue;
    }
    if (s.includes("|") && (s.startsWith("|") || s.trim().includes(" | "))) {
      t.push({
        type: "table-cell",
        content: s,
        start: l,
        end: l + s.length
      }), o += s.length + 1;
      continue;
    }
    const u = s.match(/^(\s*[-*+]\s+)\[([xX ])\]\s+(.*)$/);
    if (u) {
      const w = u[2].toLowerCase() === "x";
      t.push({
        type: w ? "task-checked" : "task-list",
        content: s,
        start: l,
        end: l + s.length
      }), o += s.length + 1;
      continue;
    }
    if (s.match(/^(\s*[-*+])\s+(.*)$/)) {
      t.push({
        type: "list-bullet",
        content: s,
        start: l,
        end: l + s.length
      }), o += s.length + 1;
      continue;
    }
    if (s.match(/^(\s*\d+\.)\s+(.*)$/)) {
      t.push({
        type: "list-number",
        content: s,
        start: l,
        end: l + s.length
      }), o += s.length + 1;
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
    for (const w of h) {
      let N;
      for (w.regex.lastIndex = 0; (N = w.regex.exec(s)) !== null; )
        g.push({
          start: l + N.index,
          end: l + N.index + N[0].length,
          type: w.type,
          content: N[0]
        });
    }
    g.sort((w, N) => w.start - N.start);
    const b = [];
    let v = l;
    for (const w of g)
      w.start >= v && (b.push(w), v = w.end);
    for (const w of b)
      w.start > l + p && t.push({
        type: "text",
        content: s.substring(p, w.start - l),
        start: l + p,
        end: w.start
      }), t.push({
        type: w.type,
        content: w.content,
        start: w.start,
        end: w.end
      }), p = w.end - l;
    p < s.length && t.push({
      type: "text",
      content: s.substring(p),
      start: l + p,
      end: l + s.length
    }), o += s.length + 1;
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
function Bt(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function $o(e, t, n, o) {
  if (t.length === 0 && (!n || n.length === 0))
    return Bt(e);
  let r = "";
  const i = e.split(`
`);
  let a = 0;
  if (!n || n.length === 0) {
    for (let l = 0; l < i.length; l++) {
      const c = i[l], u = a + c.length, d = t.filter((p) => p.start >= a && p.start < u);
      let f = a;
      for (const p of d)
        p.start > f && (r += Bt(e.substring(f, p.start))), r += `<span class="${ja(p.type)}">${Bt(p.content)}</span>`, f = p.end;
      f < u && (r += Bt(e.substring(f, u))), l < i.length - 1 && (r += `
`), a = u + 1;
    }
    return r;
  }
  const s = /* @__PURE__ */ new Map();
  n.forEach((l, c) => {
    for (let u = l.from; u < l.to; u++)
      s.set(u, { matchIdx: c, isCurrent: c === o });
  }), a = 0;
  for (let l = 0; l < i.length; l++) {
    const c = i[l], u = a + c.length, d = t.filter((p) => p.start >= a && p.start < u);
    let f = a;
    for (const p of d)
      p.start > f && (r += ri(e, f, p.start, null, s)), r += ri(e, p.start, p.end, ja(p.type), s), f = p.end;
    f < u && (r += ri(e, f, u, null, s)), l < i.length - 1 && (r += `
`), a = u + 1;
  }
  return r;
}
function ri(e, t, n, o, r) {
  let i = "", a = t;
  for (; a < n; ) {
    const s = r.get(a);
    if (s) {
      const l = a;
      for (; a < n && r.get(a)?.matchIdx === s.matchIdx; )
        a++;
      const c = Bt(e.substring(l, a)), u = s.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      o ? i += `<span class="${o}"><mark class="${u}">${c}</mark></span>` : i += `<mark class="${u}">${c}</mark>`;
    } else {
      const l = a;
      for (; a < n && !r.has(a); )
        a++;
      const c = Bt(e.substring(l, a));
      o ? i += `<span class="${o}">${c}</span>` : i += c;
    }
  }
  return i;
}
function Ok({
  content: e,
  onChange: t,
  placeholder: n = "Write your markdown here...",
  editable: o = !0,
  autofocus: r = !1,
  className: i = "",
  searchMatches: a,
  currentMatchIndex: s,
  autoClosePairs: l = !0
}) {
  const c = j(null), u = j(null), d = j(null), f = j(null), p = 5e3, h = 80, [g, b] = Y(() => {
    const x = _o(e);
    return $o(e, x, a, s);
  }), v = j(null), w = Ht(() => {
    if (e.length <= p) {
      const x = _o(e), C = $o(e, x, a, s);
      return v.current && (clearTimeout(v.current), v.current = null), C;
    }
    return null;
  }, [e, a, s]);
  q(() => {
    if (e.length <= p) {
      const x = _o(e);
      b($o(e, x, a, s));
      return;
    }
    return v.current && clearTimeout(v.current), v.current = setTimeout(() => {
      const x = _o(e);
      b($o(e, x, a, s)), v.current = null;
    }, h), () => {
      v.current && clearTimeout(v.current);
    };
  }, [e, a, s]);
  const N = w ?? g, E = H(() => {
    const x = c.current, C = u.current, S = d.current;
    if (x) {
      const D = S?.parentElement, A = D ? D.clientHeight : 200;
      x.style.height = "auto";
      const R = Math.max(x.scrollHeight, A, 200);
      x.style.height = `${R}px`, C && (C.style.height = `${R}px`);
    }
  }, []);
  q(() => {
    const x = c.current;
    if (!x) return;
    const C = (S) => {
      const D = x.closest(".editor-content-wrapper");
      if (!D) return;
      const { scrollTop: A, scrollHeight: R, clientHeight: L } = D, _ = A <= 0, O = A + L >= R - 1;
      (S.deltaY > 0 && !O || S.deltaY < 0 && !_) && (S.preventDefault(), D.scrollTop += S.deltaY);
    };
    return x.addEventListener("wheel", C, { passive: !1 }), () => x.removeEventListener("wheel", C);
  }, []);
  const y = H(() => {
  }, []);
  q(() => {
    E();
  }, [e, E]), q(() => {
    r && c.current && c.current.focus();
  }, [r]), q(() => {
    if (f.current && c.current) {
      const { start: x, end: C } = f.current;
      c.current.selectionStart = x, c.current.selectionEnd = C, f.current = null;
    }
  }, [e]);
  const k = H((x) => {
    const C = x.target;
    f.current = {
      start: C.selectionStart,
      end: C.selectionEnd
    }, t(C.value);
  }, [t]), M = H((x) => {
    const C = x.currentTarget, S = C.selectionStart, D = C.selectionEnd, A = C.value, R = S !== D;
    if (l) {
      if (x.key === "`" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), R) {
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
      if (x.key === "*" && !x.ctrlKey && !x.metaKey) {
        if (A[S - 1] === "*" && A[S], R) {
          x.preventDefault();
          const O = A.substring(S, D), U = A.substring(0, S) + "*" + O + "*" + A.substring(D);
          f.current = { start: S + 1, end: D + 1 }, t(U);
          return;
        }
        if (A[S] === "*") {
          x.preventDefault(), f.current = { start: S + 1, end: S + 1 }, t(A.substring(0, S) + A.substring(S));
          return;
        }
        x.preventDefault();
        const _ = A.substring(0, S) + "**" + A.substring(D);
        f.current = { start: S + 1, end: S + 1 }, t(_);
        return;
      }
      if (x.key === "_" && !x.ctrlKey && !x.metaKey) {
        if (R) {
          x.preventDefault();
          const _ = A.substring(S, D), O = A.substring(0, S) + "_" + _ + "_" + A.substring(D);
          f.current = { start: S + 1, end: D + 1 }, t(O);
          return;
        }
        if (A[S] === "_") {
          x.preventDefault(), f.current = { start: S + 1, end: S + 1 }, t(A.substring(0, S) + A.substring(S));
          return;
        }
        x.preventDefault();
        const L = A.substring(0, S) + "__" + A.substring(D);
        f.current = { start: S + 1, end: S + 1 }, t(L);
        return;
      }
      if (x.key === "~" && !x.ctrlKey && !x.metaKey) {
        if (R) {
          x.preventDefault();
          const _ = A.substring(S, D), O = A.substring(0, S) + "~" + _ + "~" + A.substring(D);
          f.current = { start: S + 1, end: D + 1 }, t(O);
          return;
        }
        if (A[S] === "~") {
          x.preventDefault(), f.current = { start: S + 1, end: S + 1 }, t(A.substring(0, S) + A.substring(S));
          return;
        }
        x.preventDefault();
        const L = A.substring(0, S) + "~~" + A.substring(D);
        f.current = { start: S + 1, end: S + 1 }, t(L);
        return;
      }
      if (x.key === "[" && !x.ctrlKey && !x.metaKey) {
        if (x.preventDefault(), R) {
          const L = A.substring(S, D), _ = A.substring(0, S) + "[" + L + "]()" + A.substring(D);
          f.current = { start: D + 3, end: D + 3 }, t(_);
        } else {
          const L = A.substring(0, S) + "[]()" + A.substring(D);
          f.current = { start: S + 1, end: S + 1 }, t(L);
        }
        return;
      }
      if (x.key === "]" && !x.ctrlKey && !x.metaKey && A[S] === "]") {
        x.preventDefault(), f.current = { start: S + 1, end: S + 1 }, t(A.substring(0, S) + A.substring(S));
        return;
      }
      if (x.key === ")" && !x.ctrlKey && !x.metaKey && A[S] === ")") {
        x.preventDefault(), f.current = { start: S + 1, end: S + 1 }, t(A.substring(0, S) + A.substring(S));
        return;
      }
      if (x.key === "Backspace" && !R && S > 0) {
        const L = A[S - 1], _ = A[S], O = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [U, I] of O)
          if (L === U && _ === I) {
            x.preventDefault();
            const P = A.substring(0, S - 1) + A.substring(S + 1);
            f.current = { start: S - 1, end: S - 1 }, t(P);
            return;
          }
        if (L === "[" && A.substring(S, S + 3) === "]()") {
          x.preventDefault();
          const U = A.substring(0, S - 1) + A.substring(S + 3);
          f.current = { start: S - 1, end: S - 1 }, t(U);
          return;
        }
      }
    }
    if (x.key === "Tab")
      if (x.preventDefault(), x.shiftKey) {
        const L = A.substring(0, S), _ = A.substring(S, D), O = A.substring(D), I = L.lastIndexOf(`
`) + 1, P = L.substring(0, I), B = L.substring(I), K = (B + _).split(`
`), V = K.map((W) => W.startsWith("  ") ? W.substring(2) : W.startsWith("	") ? W.substring(1) : W), G = P + V.join(`
`) + O, Q = (B + _).length - V.join(`
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
  return /* @__PURE__ */ m("div", { ref: d, className: `syntax-highlighted-editor ${i}`, children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: u,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: N || `<span class="md-placeholder">${Bt(n)}</span>` },
        "aria-hidden": "true"
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
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
        onChange: k,
        onKeyDown: M,
        onScroll: y,
        placeholder: "",
        disabled: !o,
        className: "syntax-textarea",
        spellCheck: !1
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
        lineNumber: 886,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
    lineNumber: 879,
    columnNumber: 5
  }, this);
}
let Va = 0, Si = 0, Ku = 0;
function _k(e) {
  Si++, Ku = e;
}
const $k = wn(function({
  visible: t,
  onClose: n,
  editor: o
}) {
  const [r, i] = Y(!1), [a, s] = Y({
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
      const x = performance.now();
      queueMicrotask(() => {
        const C = performance.now() - x;
        _k(C);
      });
    };
    return o.on("transaction", M), () => {
      o.off("transaction", M);
    };
  }, [t, o]), q(() => {
    if (!t) return;
    let M = 0, x = performance.now(), C = 0;
    const S = (D) => {
      const A = D - c.current;
      if (c.current = D, l.current.push({ time: D, duration: A }), l.current.length > 120 && (l.current = l.current.slice(-120)), A > 16.67 && d.current++, M++, D - x >= 1e3) {
        C = M, M = 0, x = D;
        const R = l.current.slice(-60), L = R.length > 0 ? R.reduce((V, G) => V + G.duration, 0) / R.length : 0, _ = R.length > 0 ? Math.max(...R.map((V) => V.duration)) : 0, O = performance.memory, U = O ? O.usedJSHeapSize / (1024 * 1024) : 0, I = O ? O.jsHeapSizeLimit / (1024 * 1024) : 0, P = document.querySelectorAll("*").length, B = Va - f.current, K = Si - p.current;
        f.current = Va, p.current = Si, s({
          fps: C,
          frameTime: Math.round(L * 100) / 100,
          frameTimeMax: Math.round(_ * 100) / 100,
          memoryUsed: Math.round(U * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: B,
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
  const w = H(() => {
    n?.();
  }, [n]), N = H(() => {
    i((M) => !M);
  }, []);
  if (!t) return null;
  const E = (M) => M >= 55 ? "#4ade80" : M >= 30 ? "#fbbf24" : "#f87171", y = (M) => M <= 16.67 ? "#4ade80" : M <= 33.33 ? "#fbbf24" : "#f87171", k = (M, x, C) => {
    const A = M.map((R, L) => {
      const _ = L / (M.length - 1) * 120, O = 24 - Math.min(R, x) / x * 24;
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
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 225,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 224,
      columnNumber: 7
    }, this);
  };
  return /* @__PURE__ */ m("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ m("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ m("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ m(Qd, { size: 14 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 241,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m("span", { children: "Performance" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 242,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 240,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ m("button", { onClick: N, title: r ? "Expand" : "Minimize", children: r ? /* @__PURE__ */ m(fl, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 28
        }, this) : /* @__PURE__ */ m(pl, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 54
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 245,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m("button", { onClick: w, title: "Close profiler", children: /* @__PURE__ */ m(gt, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 249,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 248,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 244,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 239,
      columnNumber: 7
    }, this),
    !r && /* @__PURE__ */ m("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "FPS" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 259,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: E(a.fps) }, children: a.fps }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 260,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 258,
          columnNumber: 13
        }, this),
        k(h, 70, E(a.fps))
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 257,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Frame Time" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 270,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: y(a.frameTime) }, children: [
            a.frameTime,
            "ms"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 271,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 269,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Max" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 276,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value-sub", style: { color: y(a.frameTimeMax) }, children: [
            a.frameTimeMax,
            "ms"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 277,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 275,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: [
            "Jank (",
            ">",
            " 16.7ms)"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 282,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value-sub", style: { color: a.longFrames > 3 ? "#f87171" : "#4ade80" }, children: [
            a.longFrames,
            "/s"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 283,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 281,
          columnNumber: 13
        }, this),
        k(b, 50, y(a.frameTime))
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 268,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Renders/s" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 293,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: a.renderCount }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 294,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 292,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Transactions/s" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 297,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: a.transactionCount }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 298,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 296,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Last TX time" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 301,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value-sub", children: [
            a.lastTransactionTime,
            "ms"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 302,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 300,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 291,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "DOM Nodes" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 309,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: a.domNodes.toLocaleString() }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 310,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 308,
          columnNumber: 13
        }, this),
        a.memoryTotal > 0 && /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Memory" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 314,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: [
            a.memoryUsed,
            "MB / ",
            a.memoryTotal,
            "MB"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 315,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 313,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 307,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 255,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/PerformanceProfiler.tsx",
    lineNumber: 237,
    columnNumber: 5
  }, this);
});
class Wk extends Dd {
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
      const { error: t, showDetails: n, retryCount: o, copied: r } = this.state, i = o >= 2;
      return /* @__PURE__ */ m("div", { className: re("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ m("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ m("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ m(Jd, { className: "w-6 h-6 text-destructive" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 140,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 139,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ m("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 145,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("p", { className: "text-sm text-muted-foreground leading-relaxed", children: i ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 148,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 144,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ m(
            St,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ m(Ui, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
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
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 158,
              columnNumber: 15
            },
            this
          ),
          i && this.props.onClearContent && /* @__PURE__ */ m(
            St,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ m(an, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 176,
                  columnNumber: 19
                }, this),
                "Clear Content & Retry"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 170,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
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
                n ? /* @__PURE__ */ m(Mt, { className: "w-3 h-3" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 193,
                  columnNumber: 21
                }, this) : /* @__PURE__ */ m(ul, { className: "w-3 h-3" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 195,
                  columnNumber: 21
                }, this),
                "Error details"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 185,
              columnNumber: 17
            },
            this
          ),
          n && /* @__PURE__ */ m("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ m("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ m("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
                lineNumber: 203,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ m(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: r ? /* @__PURE__ */ m(Ce, { children: [
                    /* @__PURE__ */ m(em, { className: "w-3 h-3 text-green-500" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 210,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ m("span", { className: "text-green-500", children: "Copied" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 211,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
                    lineNumber: 209,
                    columnNumber: 27
                  }, this) : /* @__PURE__ */ m(Ce, { children: [
                    /* @__PURE__ */ m(Nn, { className: "w-3 h-3" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 215,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ m("span", { children: "Copy" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 216,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
                    lineNumber: 214,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 204,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 202,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ m("p", { className: "text-xs font-mono text-muted-foreground break-all", children: t.message }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 221,
              columnNumber: 21
            }, this),
            t.stack && /* @__PURE__ */ m("pre", { className: "text-[10px] font-mono text-muted-foreground/70 mt-2 whitespace-pre-wrap break-all", children: t.stack.split(`
`).slice(1, 6).join(`
`) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 225,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 201,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 184,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
        lineNumber: 137,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorErrorBoundary.tsx",
        lineNumber: 136,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
function Bk({ className: e = "", theme: t }) {
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
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 28,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("83%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 29,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("66%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 30,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: { height: "0.75rem" } }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 31,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("100%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 32,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("75%") }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 33,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorLoadingSkeleton.tsx",
      lineNumber: 24,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorLoadingSkeleton.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
function Hk({ editorMode: e, onModeSwitch: t }) {
  return /* @__PURE__ */ m("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
    /* @__PURE__ */ m(
      "button",
      {
        onClick: () => t("wysiwyg"),
        className: `editor-mode-toggle-btn ${e === "wysiwyg" ? "active" : ""}`,
        title: "Visual Editor",
        children: /* @__PURE__ */ m(tm, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorModeToggle.tsx",
          lineNumber: 19,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorModeToggle.tsx",
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
        children: /* @__PURE__ */ m(Yi, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorModeToggle.tsx",
          lineNumber: 26,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorModeToggle.tsx",
        lineNumber: 21,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/EditorModeToggle.tsx",
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
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 50,
    columnNumber: 3
  },
  void 0
), Ka = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }, void 0, !1, {
  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
  lineNumber: 69,
  columnNumber: 3
}, void 0), Ga = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], Fk = wn(function({ editor: t, isH1: n, isH2: o, isH3: r, isH4: i, isH5: a, executeCommand: s }) {
  const [l, c] = Y(!1), u = j(null), d = n ? "h1" : o ? "h2" : r ? "h3" : i ? "h4" : a ? "h5" : "paragraph", f = Ga.find((h) => h.value === d)?.shortLabel || "P";
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
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 143,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(Mt, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${l ? "rotate-180" : ""}` }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 144,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
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
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
                  lineNumber: 172,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ m("span", { children: h.label }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
                  lineNumber: 173,
                  columnNumber: 17
                }, this)
              ]
            },
            h.value,
            !0,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
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
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 148,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 125,
    columnNumber: 5
  }, this);
}), zk = wn(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: o = !1, aiEnabled: r = !1, onAISparklesClick: i }) {
  const a = j(null), s = tl({
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
  }), [l, c] = Y(!1), [u, d] = Y(""), [f, p] = Y(!1), [h, g] = Y({ top: 0, left: 0 }), b = j(null), v = j(null), w = j(null), N = H(() => {
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
  }, y = H((C, S) => {
    C.preventDefault(), C.stopPropagation(), S();
  }, []);
  q(() => {
    if (!t || t.isDestroyed) return;
    const C = () => {
      if (!t.isDestroyed)
        try {
          const { selection: S } = t.state, { empty: D, from: A, to: R } = S, O = ("node" in S && S.node ? S.node : null)?.type?.name === "resizableImage";
          if (D || O || t.isActive("codeBlock")) {
            w.current && (clearTimeout(w.current), w.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              p(!1), c(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const U = t.view.coordsAtPos(A), I = t.view.coordsAtPos(R), P = b.current?.offsetWidth || 500, B = b.current?.offsetHeight || 40, K = 8, V = window.innerWidth;
          let G = 0, Q = 0;
          if (b.current) {
            const ce = b.current.closest('[data-slot="dialog-content"]');
            if (ce) {
              const de = ce.getBoundingClientRect();
              G = de.left, Q = de.top;
            }
          }
          let $ = (U.left + I.left) / 2 - P / 2 - G;
          const z = G ? V - G : V;
          $ = Math.max(K, Math.min(z - P - K, $));
          let Z = U.top - B - 10 - Q;
          Z < K && (Z = I.bottom + 10 - Q), f ? g({ top: Math.max(K, Z), left: $ }) : (w.current && clearTimeout(w.current), w.current = setTimeout(() => {
            g({ top: Math.max(K, Z), left: $ }), p(!0);
          }, 50));
        } catch (S) {
          console.warn("FloatingToolbar: Error updating position", S);
        }
    };
    return t.on("selectionUpdate", C), () => {
      t.off("selectionUpdate", C), v.current && clearTimeout(v.current), w.current && clearTimeout(w.current);
    };
  }, [t, f]);
  const k = (C) => {
    v.current && (clearTimeout(v.current), v.current = null);
  };
  if (!f || o)
    return null;
  const M = 15, x = l ? /* @__PURE__ */ m(
    "div",
    {
      ref: b,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: h.top,
        left: h.left
      },
      onMouseDown: k,
      children: /* @__PURE__ */ m("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ m(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: u,
            onChange: (C) => d(C.target.value),
            onKeyDown: (C) => {
              C.key === "Enter" && (C.preventDefault(), N()), C.key === "Escape" && (c(!1), d(""));
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
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 384,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ m("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (C) => {
                C.preventDefault(), N();
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
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 408,
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
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 421,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 407,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 383,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 373,
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
      onMouseDown: k,
      children: [
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => y(C, () => t.chain().focus().toggleBold().run()),
            isActive: s?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(Pi, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 455,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 450,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => y(C, () => t.chain().focus().toggleItalic().run()),
            isActive: s?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m(Ii, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 462,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 457,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => y(C, () => t.chain().focus().toggleUnderline().run()),
            isActive: s?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(Ri, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 469,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 464,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => y(C, () => t.chain().focus().toggleStrike().run()),
            isActive: s?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(Li, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 476,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 471,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => y(C, () => t.chain().focus().toggleCode().run()),
            isActive: s?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(rl, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 483,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 478,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => y(C, () => t.chain().focus().toggleHighlight().run()),
            isActive: s?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ m(il, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 490,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 485,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: E,
            isActive: s?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ m(Oi, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 498,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 493,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(Ka, {}, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 501,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m(
          Fk,
          {
            editor: t,
            isH1: s?.isH1 ?? !1,
            isH2: s?.isH2 ?? !1,
            isH3: s?.isH3 ?? !1,
            isH4: s?.isH4 ?? !1,
            isH5: s?.isH5 ?? !1,
            executeCommand: y
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 504,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => y(C, () => t.chain().focus().toggleBlockquote().run()),
            isActive: s?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(Bi, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 518,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 513,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => y(C, () => t.chain().focus().toggleBulletList().run()),
            isActive: s?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(_i, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 525,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 520,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => y(C, () => t.chain().focus().toggleOrderedList().run()),
            isActive: s?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m($i, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 532,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 527,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => y(C, () => t.chain().focus().toggleTaskList().run()),
            isActive: s?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m(Wi, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 539,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 534,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          Ue,
          {
            onMouseDown: (C) => y(C, () => t.chain().focus().toggleCodeBlock().run()),
            isActive: s?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(nm, { size: M }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 546,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 541,
            columnNumber: 7
          },
          this
        ),
        r && /* @__PURE__ */ m(Ce, { children: [
          /* @__PURE__ */ m(Ka, {}, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 552,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              ref: a,
              onMouseDown: (C) => {
                C.preventDefault(), C.stopPropagation(), a.current && i?.(a.current);
              },
              title: "AI Writing Assistant",
              className: `
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            `,
              children: /* @__PURE__ */ m(sr, { size: M }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
                lineNumber: 570,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 553,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 551,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 439,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { onMouseDown: k, children: x }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 578,
    columnNumber: 5
  }, this);
});
function Uk({ editor: e, isOpen: t, onClose: n }) {
  const [o, r] = Y(""), i = j(null), a = j(null), [s, l] = Y({ top: 0, left: 0 });
  q(() => {
    if (t) {
      const h = e.getAttributes("link").href || "";
      r(h);
      try {
        const { view: g } = e, { from: b } = g.state.selection, v = g.coordsAtPos(b), w = v.bottom + 8, N = Math.max(16, Math.min(v.left, window.innerWidth - 420));
        l({ top: w, left: N });
      } catch {
        l({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        i.current?.focus(), i.current?.select();
      }, 50);
    }
  }, [t, e]), q(() => {
    if (!t) return;
    const h = (w) => {
      a.current && !a.current.contains(w.target) && n();
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
        top: `${s.top}px`,
        left: `${s.left}px`
      },
      children: /* @__PURE__ */ m("form", { onSubmit: c, className: "link-popover-form", children: [
        /* @__PURE__ */ m("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ m(Ai, { className: "link-popover-icon", size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkPopover.tsx",
            lineNumber: 140,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(
            "input",
            {
              ref: i,
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
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkPopover.tsx",
              lineNumber: 141,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkPopover.tsx",
          lineNumber: 139,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { className: "link-popover-hint", children: "Press Enter to save · Escape to cancel" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkPopover.tsx",
          lineNumber: 153,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkPopover.tsx",
        lineNumber: 138,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkPopover.tsx",
      lineNumber: 128,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { children: p }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkPopover.tsx",
    lineNumber: 161,
    columnNumber: 10
  }, this);
}
function Yk({ editor: e, onEditLink: t }) {
  const [n, o] = Y({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), r = j(null), i = j(null), a = H((N) => {
    if (!(!e || e.isDestroyed)) {
      i.current && (clearTimeout(i.current), i.current = null);
      try {
        const E = N.getAttribute("href") || "", y = N.getBoundingClientRect(), k = y.bottom + 8, M = Math.max(16, Math.min(y.left, window.innerWidth - 340));
        o({
          isVisible: !0,
          url: E,
          position: { top: k, left: M },
          linkElement: N
        });
      } catch (E) {
        console.warn("LinkHoverTooltip: Error showing tooltip", E);
      }
    }
  }, [e]), s = H(() => {
    i.current = setTimeout(() => {
      o((N) => ({ ...N, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), l = H(() => {
    i.current && (clearTimeout(i.current), i.current = null);
  }, []);
  q(() => {
    if (!e || e.isDestroyed) return;
    const N = e.view.dom;
    if (!N) return;
    const E = (k) => {
      const x = k.target.closest("a");
      x && N.contains(x) && a(x);
    }, y = (k) => {
      const M = k.target, x = k.relatedTarget;
      if (M.closest("a")) {
        if (x && r.current?.contains(x))
          return;
        s();
      }
    };
    return N.addEventListener("mouseover", E), N.addEventListener("mouseout", y), () => {
      N.removeEventListener("mouseover", E), N.removeEventListener("mouseout", y), i.current && clearTimeout(i.current);
    };
  }, [e, a, s]), q(() => {
    if (!n.isVisible) return;
    const N = () => {
      o((y) => ({ ...y, isVisible: !1, linkElement: null }));
    }, E = e.view.dom.closest(".editor-content-wrapper");
    return E?.addEventListener("scroll", N), window.addEventListener("scroll", N, !0), () => {
      E?.removeEventListener("scroll", N), window.removeEventListener("scroll", N, !0);
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
      const { view: N } = e, { doc: E } = N.state;
      let y = null, k = null;
      E.descendants((M, x) => {
        if (M.isText && M.marks.some((C) => C.type.name === "link")) {
          const C = N.nodeDOM(x);
          if (C && (C === n.linkElement || C.parentElement === n.linkElement))
            return y = x, k = x + M.nodeSize, !1;
        }
        return !0;
      }), y !== null && k !== null ? e.chain().focus().setTextSelection({ from: y, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    o((N) => ({ ...N, isVisible: !1 }));
  }, [e, n.linkElement]), h = H(() => {
    if (n.linkElement) {
      const { view: N } = e, { doc: E } = N.state;
      E.descendants((y, k) => {
        if (y.isText && y.marks.some((M) => M.type.name === "link")) {
          const M = N.nodeDOM(k);
          if (M && (M === n.linkElement || M.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: k, to: k + y.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    o((N) => ({ ...N, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const g = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, v = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", w = /* @__PURE__ */ m(
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
      onMouseLeave: s,
      children: /* @__PURE__ */ m("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: f,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ m(om, { size: 13, className: "link-hover-tooltip-link-icon" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 247,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "link-hover-tooltip-url", children: g || "No URL" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 248,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
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
              children: /* @__PURE__ */ m(rm, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 259,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
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
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 268,
                columnNumber: 23
              }, this) : /* @__PURE__ */ m(Nn, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 268,
                columnNumber: 81
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
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
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 277,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 272,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
          lineNumber: 252,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
        lineNumber: 240,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
      lineNumber: 228,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { children: w }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/LinkHoverTooltip.tsx",
    lineNumber: 285,
    columnNumber: 10
  }, this);
}
const jk = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(ir, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 64,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(sm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 70,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(am, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 76,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(lm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 82,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(cm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 88,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(um, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 94,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ m(_i, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 100,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ m($i, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 106,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ m(Wi, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 112,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ m(Bi, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 118,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ m(sl, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 124,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ m(ii, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 130,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ m(Di, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
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
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 143,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ m(jo, { size: 16, className: "text-blue-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 149,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ m(cl, { size: 16, className: "text-purple-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 155,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ m(ll, { size: 16, className: "text-amber-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 161,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ m(Hi, { size: 16, className: "text-green-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 167,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ m(Fi, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 173,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ m(dl, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 179,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ m(Ai, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 185,
      columnNumber: 11
    }, void 0),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], Vk = 32, Kk = 8, Gk = 320, qk = 210, Wo = 12;
function qa(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const r = t.getRangeAt(0), i = r.getBoundingClientRect();
      if (i.width === 0 && i.height === 0 && i.top === 0) {
        const a = document.createElement("span");
        a.textContent = "​", r.cloneRange().insertNode(a);
        const l = a.getBoundingClientRect(), c = { top: l.top, bottom: l.bottom, left: l.left };
        return a.parentNode?.removeChild(a), t.removeAllRanges(), t.addRange(r), c;
      }
      return { top: i.top, bottom: i.bottom, left: i.left };
    }
    const n = e.state.selection.from, o = e.view.coordsAtPos(n);
    return { top: o.top, bottom: o.bottom, left: o.left };
  } catch {
    return null;
  }
}
function Xk({ editor: e }) {
  const [t, n] = Y(!1), [o, r] = Y(""), [i, a] = Y(0), [s, l] = Y(null), [c, u] = Y(!1), [d, f] = Y({ top: 0, left: 0 }), [p, h] = Y("below"), g = j(null), b = j(-1), v = j(!1);
  q(() => {
    v.current = t;
  }, [t]);
  const w = jk.filter((C) => {
    if (!o) return !0;
    const S = o.toLowerCase();
    return C.title.toLowerCase().includes(S) || C.keywords?.some((D) => D.includes(S));
  }), N = Math.min(
    w.length * Vk + Kk,
    Gk
  );
  rr(() => {
    if (!t || !s) return;
    const { top: C, bottom: S, left: D } = s, A = window.innerHeight, R = window.innerWidth, L = A - S - Wo, _ = C - Wo;
    let O;
    if (L >= N ? O = "below" : _ >= N ? O = "above" : O = L >= _ ? "below" : "above", h(O), g.current) {
      const U = Math.max(
        Wo,
        Math.min(D, R - qk - Wo)
      ), I = O === "below" ? S + 4 : C - N - 4;
      g.current.style.top = `${I}px`, g.current.style.left = `${U}px`;
    }
  }, [t, s, N, w.length]);
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
  }, [e]), y = H(() => {
    n(!1), r(""), a(0), b.current = -1, l(null);
  }, []), k = H((C) => {
    const S = w[C];
    if (S) {
      if (E(), S.isImageCommand) {
        const { state: D } = e, A = e.view.coordsAtPos(D.selection.from);
        f({
          top: A.bottom + 8,
          left: A.left
        }), u(!0);
      } else
        S.command(e);
      y();
    }
  }, [e, w, E, y]), M = H((C, S) => {
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
      v.current && (D.key === "ArrowDown" ? (D.preventDefault(), D.stopPropagation(), a((A) => (A + 1) % w.length)) : D.key === "ArrowUp" ? (D.preventDefault(), D.stopPropagation(), a((A) => (A - 1 + w.length) % w.length)) : D.key === "Enter" ? (D.preventDefault(), D.stopPropagation(), k(i)) : D.key === "Escape" && (D.preventDefault(), D.stopPropagation(), y()));
    };
    return C.addEventListener("keydown", S, !0), () => {
      C.removeEventListener("keydown", S, !0);
    };
  }, [e, t, i, w, k, y]), q(() => {
    if (!e || !t) return;
    const C = () => {
      if (!v.current || b.current < 0) return;
      const { state: S } = e, { selection: D } = S, A = D.from, R = b.current;
      if (A <= R) {
        y();
        return;
      }
      try {
        const L = S.doc.textBetween(R + 1, A, void 0, "￼");
        if (L.includes(`
`)) {
          y();
          return;
        }
        r(L), a(0);
        const _ = qa(e);
        _ && l(_);
      } catch {
        y();
      }
    };
    return e.on("update", C), e.on("selectionUpdate", C), () => {
      e.off("update", C), e.off("selectionUpdate", C);
    };
  }, [e, t, y]), q(() => {
    if (!t) return;
    const C = (S) => {
      g.current && !g.current.contains(S.target) && y();
    };
    return document.addEventListener("mousedown", C), () => document.removeEventListener("mousedown", C);
  }, [t, y]), q(() => {
    t && w.length === 0 && o.length > 2 && y();
  }, [t, w.length, o, y]), q(() => {
    i >= w.length && a(Math.max(0, w.length - 1));
  }, [w.length, i]), q(() => {
    if (!t || !g.current) return;
    const C = g.current.querySelector(".slash-item.is-selected");
    C && C.scrollIntoView({ block: "nearest" });
  }, [t, i]), c ? /* @__PURE__ */ m(
    wl,
    {
      isOpen: c,
      onClose: () => u(!1),
      onInsert: M,
      position: d
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 530,
      columnNumber: 7
    },
    this
  ) : !t || w.length === 0 ? null : /* @__PURE__ */ m(Nt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: g,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: w.map((C, S) => /* @__PURE__ */ m(
        "div",
        {
          className: `slash-item ${S === i ? "is-selected" : ""}`,
          onClick: (D) => {
            D.preventDefault(), D.stopPropagation(), k(S);
          },
          onMouseEnter: () => a(S),
          children: [
            /* @__PURE__ */ m("span", { className: "slash-icon", children: C.icon }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
              lineNumber: 569,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m("span", { className: "slash-label", children: C.title }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
              lineNumber: 570,
              columnNumber: 11
            }, this)
          ]
        },
        C.title,
        !0,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
          lineNumber: 559,
          columnNumber: 9
        },
        this
      ))
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 549,
      columnNumber: 5
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/SlashCommands.tsx",
    lineNumber: 548,
    columnNumber: 5
  }, this);
}
const Zk = 340, Qk = 36, Jk = 8, ex = 240, Bo = 8;
function Xa(e) {
  try {
    const t = window.getSelection();
    if (t && t.rangeCount > 0) {
      const r = t.getRangeAt(0), i = r.getBoundingClientRect();
      if (i.width === 0 && i.height === 0 && i.top === 0) {
        const a = document.createElement("span");
        a.textContent = "​", r.cloneRange().insertNode(a);
        const l = a.getBoundingClientRect(), c = { top: l.top, bottom: l.bottom, left: l.left };
        return a.parentNode?.removeChild(a), t.removeAllRanges(), t.addRange(r), c;
      }
      return { top: i.top, bottom: i.bottom, left: i.left };
    }
    const n = e.state.selection.from, o = e.view.coordsAtPos(n);
    return { top: o.top, bottom: o.bottom, left: o.left };
  } catch {
    return null;
  }
}
function tx({ editor: e, onSearch: t, onCreateItem: n }) {
  const [o, r] = Y(!1), [i, a] = Y(""), [s, l] = Y([]), [c, u] = Y(0), [d, f] = Y(null), [p, h] = Y("below"), [g, b] = Y(!1), v = j(!1), w = j(null), N = j(-1), E = j(null);
  q(() => {
    v.current = o;
  }, [o]);
  const y = H(() => {
    r(!1), a(""), l([]), u(0), N.current = -1;
  }, []), k = H((D) => {
    const A = N.current;
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
    y();
  }, [e, y]);
  q(() => {
    if (!e) return;
    const D = () => {
      if (v.current) return;
      const { state: A } = e, { selection: R } = A, { $from: L } = R;
      if (L.parentOffset < 2 || !L.parent.textBetween(0, L.parentOffset, void 0, "￼").endsWith("[[")) return;
      N.current = L.pos - 2;
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
          const L = s.length + (i.trim() ? 1 : 0) - 1;
          u((_) => Math.min(_ + 1, L));
          return;
        }
        if (R.key === "ArrowUp") {
          R.preventDefault(), u((L) => Math.max(L - 1, 0));
          return;
        }
        if (R.key === "Enter" || R.key === "Tab") {
          R.preventDefault(), R.stopPropagation(), c < s.length ? k(s[c].title) : i.trim() && n ? (n(i.trim()), y()) : i.trim() && k(i.trim());
          return;
        }
        if (R.key === "Escape") {
          R.preventDefault(), y();
          return;
        }
        R.key === "]" && setTimeout(() => {
          const { state: L } = e, { $from: _ } = L.selection;
          _.parent.textBetween(0, _.parentOffset, void 0, "￼").endsWith("]]") && y();
        }, 0);
      }
    };
    return D.addEventListener("keydown", A, !0), () => {
      D.removeEventListener("keydown", A, !0);
    };
  }, [e, o, s, c, i, k, y, n]), q(() => {
    if (!e || !o) return;
    const D = () => {
      const A = N.current;
      if (A < 0) {
        y();
        return;
      }
      const { state: R } = e, L = R.selection.from;
      if (L <= A) {
        y();
        return;
      }
      try {
        const _ = R.doc.textBetween(A + 2, L, void 0, "￼");
        if (_.includes(`
`) || _.includes("]]")) {
          y();
          return;
        }
        a(_), u(0);
        const O = Xa(e);
        O && f(O);
      } catch {
        y();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, o, y]), q(() => {
    if (o) {
      if (E.current && clearTimeout(E.current), !i.trim()) {
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
          const D = await t(i.trim());
          l(D);
        } catch {
          l([]);
        }
        b(!1);
      }, 150), () => {
        E.current && clearTimeout(E.current);
      };
    }
  }, [o, i, t]), q(() => {
    if (!o) return;
    const D = (A) => {
      w.current && !w.current.contains(A.target) && y();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [o, y]), q(() => {
    if (!o || !w.current) return;
    const D = w.current.querySelector(".wikilink-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [o, c]);
  const M = s.length + (i.trim() ? 1 : 0), x = Math.min(
    Math.max(M, 1) * Qk + Jk,
    ex
  );
  if (rr(() => {
    if (!o || !d) return;
    const { top: D, bottom: A, left: R } = d, L = window.innerHeight, _ = window.innerWidth, O = L - A - Bo, U = D - Bo;
    let I;
    if (O >= x ? I = "below" : U >= x ? I = "above" : I = O >= U ? "below" : "above", h(I), w.current) {
      const P = Math.max(
        Bo,
        Math.min(R, _ - Zk - Bo)
      ), B = I === "below" ? A + 4 : D - x - 4;
      w.current.style.top = `${B}px`, w.current.style.left = `${P}px`;
    }
  }, [o, d, x, M]), !o) return null;
  const C = i.trim() && !s.some((D) => D.title.toLowerCase() === i.trim().toLowerCase());
  return /* @__PURE__ */ m(Nt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: w,
      className: `wikilink-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: [
        g && s.length === 0 && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 366,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 365,
          columnNumber: 9
        }, this),
        s.map((D, A) => /* @__PURE__ */ m(
          "div",
          {
            className: `wikilink-item ${A === c ? "is-selected" : ""}`,
            onMouseDown: (R) => {
              R.preventDefault(), k(D.title);
            },
            onMouseEnter: () => u(A),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Yi, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 380,
                columnNumber: 13
              }, this) }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 379,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: D.title }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 382,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-type", children: D.type }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 383,
                columnNumber: 11
              }, this)
            ]
          },
          D.id,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 370,
            columnNumber: 9
          },
          this
        )),
        C && /* @__PURE__ */ m(
          "div",
          {
            className: `wikilink-item wikilink-create ${s.length === c ? "is-selected" : ""}`,
            onMouseDown: (D) => {
              D.preventDefault(), n ? (n(i.trim()), y()) : k(i.trim());
            },
            onMouseEnter: () => u(s.length),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(zi, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 401,
                columnNumber: 13
              }, this) }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 400,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: [
                "Create “",
                i.trim(),
                "”"
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 403,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 387,
            columnNumber: 9
          },
          this
        ),
        !g && s.length === 0 && !i.trim() && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 408,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 407,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
      lineNumber: 355,
      columnNumber: 5
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WikiLinkAutocomplete.tsx",
    lineNumber: 354,
    columnNumber: 5
  }, this);
}
function nx({
  src: e,
  alt: t,
  position: n,
  onSave: o,
  onDelete: r,
  onClose: i
}) {
  const [a, s] = Y(e), [l, c] = Y(t), u = j(null), d = j(null);
  q(() => {
    d.current?.focus(), d.current?.select();
  }, []), q(() => {
    const b = (w) => {
      u.current && !u.current.contains(w.target) && i();
    }, v = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return () => {
      clearTimeout(v), document.removeEventListener("mousedown", b);
    };
  }, [i]), q(() => {
    const b = (v) => {
      v.key === "Escape" ? i() : v.key === "Enter" && (v.metaKey || v.ctrlKey) && f();
    };
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, [a, l, i]);
  const f = () => {
    a.trim() && o(a.trim(), l.trim());
  }, h = (() => {
    let N = n.x - 160, E = n.y + 10;
    return N + 320 > window.innerWidth - 16 && (N = window.innerWidth - 320 - 16), N < 16 && (N = 16), E + 280 > window.innerHeight - 16 && (E = n.y - 280 - 10), E < 16 && (E = 16), { left: N, top: E };
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
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 140,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: i,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(gt, { className: "w-4 h-4" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 146,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 141,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 139,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ m("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ m("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(Oi, { className: "w-3.5 h-3.5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 155,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { children: "Image URL" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 156,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 154,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                ref: d,
                type: "text",
                value: a,
                onChange: (b) => s(b.target.value),
                placeholder: "https://example.com/image.jpg",
                className: "image-edit-popover-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 158,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 153,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ m("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(ir, { className: "w-3.5 h-3.5" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 171,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { children: "Alt Text" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 172,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
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
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 174,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 169,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
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
              children: /* @__PURE__ */ m(an, { className: "w-4 h-4" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 191,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 186,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m("div", { className: "image-edit-popover-actions", children: [
            /* @__PURE__ */ m(
              "button",
              {
                onClick: i,
                className: "image-edit-popover-btn image-edit-popover-btn-cancel",
                children: "Cancel"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
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
                    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
                    lineNumber: 205,
                    columnNumber: 13
                  }, this),
                  "Save"
                ]
              },
              void 0,
              !0,
              {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 200,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 193,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 185,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
      lineNumber: 129,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { children: g }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageEditPopover.tsx",
    lineNumber: 213,
    columnNumber: 10
  }, this);
}
function ox({ containerRef: e, enabled: t = !0 }) {
  const [n, o] = Y(!1), [r, i] = Y(0), a = H((u) => {
    u.preventDefault(), u.stopPropagation(), u.dataTransfer?.types.includes("Files") && (i((d) => d + 1), o(!0));
  }, []), s = H((u) => {
    u.preventDefault(), u.stopPropagation(), i((d) => {
      const f = d - 1;
      return f === 0 && o(!1), f;
    });
  }, []), l = H((u) => {
    u.preventDefault(), u.stopPropagation();
  }, []), c = H((u) => {
    u.preventDefault(), u.stopPropagation(), o(!1), i(0);
  }, []);
  return q(() => {
    if (!t || !e.current) return;
    const u = e.current;
    return u.addEventListener("dragenter", a), u.addEventListener("dragleave", s), u.addEventListener("dragover", l), u.addEventListener("drop", c), () => {
      u.removeEventListener("dragenter", a), u.removeEventListener("dragleave", s), u.removeEventListener("dragover", l), u.removeEventListener("drop", c);
    };
  }, [t, e, a, s, l, c]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ m("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(dm, { className: "w-12 h-12" }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 84,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ m("span", { className: "image-drop-zone-title", children: "Drop image here" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageDropZone.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageDropZone.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 86,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageDropZone.tsx",
    lineNumber: 82,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ImageDropZone.tsx",
    lineNumber: 81,
    columnNumber: 5
  }, this) : null;
}
const rx = {
  SpellCheck: fm,
  RefreshCw: mm,
  Minimize2: pl,
  Maximize2: fl,
  FileText: Yi,
  MessageSquare: hl,
  Sparkles: sr
};
function ix({ actions: e, scope: t, onAction: n, onClose: o, position: r }) {
  const [i, a] = Y(""), [s, l] = Y(!1), c = j(null), u = j(null), d = e.filter((b) => b.scope === t || b.scope === "both");
  q(() => {
    const b = (w) => {
      c.current && !c.current.contains(w.target) && o();
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
    s && u.current && u.current.focus();
  }, [s]);
  const p = H(() => {
    const v = d.length * 40 + (s ? 56 : 0) + 16, w = window.innerWidth, N = window.innerHeight;
    let E = r.top, y = r.left;
    return y + 260 > w - 8 && (y = w - 260 - 8), y < 8 && (y = 8), E + v > N - 8 && (E = r.top - v - 8), E < 8 && (E = 8), { top: E, left: y };
  }, [r, d.length, s])(), h = () => {
    i.trim() && (n("custom", i.trim()), a(""), l(!1));
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
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIDropdownMenu.tsx",
                lineNumber: 142,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m(
                "input",
                {
                  ref: u,
                  type: "text",
                  placeholder: "Modify with prompt…",
                  value: i,
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
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIDropdownMenu.tsx",
                  lineNumber: 143,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 141,
              columnNumber: 11
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 140,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ m("div", { className: "h-px bg-border mx-2 my-0.5" }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 167,
              columnNumber: 9
            }, this),
            d.filter((b) => !b.showCustomPrompt).map((b) => {
              const v = b.icon ? rx[b.icon] : sr;
              return /* @__PURE__ */ m(
                "button",
                {
                  className: `
                  flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left
                  hover:bg-secondary/80 transition-colors duration-75
                  text-foreground
                `,
                  onMouseDown: (w) => {
                    w.preventDefault(), n(b.id);
                  },
                  children: [
                    v && /* @__PURE__ */ m(v, { size: 15, className: "text-muted-foreground shrink-0" }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIDropdownMenu.tsx",
                      lineNumber: 187,
                      columnNumber: 35
                    }, this),
                    /* @__PURE__ */ m("span", { children: b.label }, void 0, !1, {
                      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIDropdownMenu.tsx",
                      lineNumber: 188,
                      columnNumber: 17
                    }, this)
                  ]
                },
                b.id,
                !0,
                {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIDropdownMenu.tsx",
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
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIDropdownMenu.tsx",
          lineNumber: 131,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIDropdownMenu.tsx",
      lineNumber: 122,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { onMouseDown: (b) => b.preventDefault(), children: g }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIDropdownMenu.tsx",
    lineNumber: 197,
    columnNumber: 5
  }, this);
}
function sx({
  state: e,
  position: t,
  onReplace: n,
  onInsert: o,
  onRetry: r,
  onDiscard: i
}) {
  const a = j(null), s = j(null), [l, c] = Y(!1), [u, d] = Y(0);
  q(() => {
    if (a.current) {
      const y = new ResizeObserver((k) => {
        for (const M of k)
          d(M.contentRect.height);
      });
      return y.observe(a.current), () => y.disconnect();
    }
  }, []), q(() => {
    s.current && e.status === "streaming" && (s.current.scrollTop = s.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), q(() => {
    const y = (k) => {
      k.key === "Escape" && i();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [i]);
  const f = Ht(() => {
    const x = window.innerWidth, C = window.innerHeight;
    let S = t.selectionCenterX - 380 / 2;
    S + 380 > x - 8 && (S = x - 380 - 8), S < 8 && (S = 8);
    const D = C - t.selectionBottom - 8, A = t.selectionTop - 8, R = u || 200;
    let L, _ = !1;
    return D >= R || D >= A ? L = t.selectionBottom + 8 : (L = t.selectionTop - 8 - R, _ = !0), L < 8 && (L = 8), L + R > C - 8 && (L = C - R - 8), { top: L, left: S, placedAbove: _ };
  }, [t, u]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", h = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", g = e.status === "streaming", b = e.status === "complete", v = e.status === "error", w = H(() => {
    navigator.clipboard.writeText(p), c(!0), setTimeout(() => c(!1), 1500);
  }, [p]);
  if (e.status === "idle") return null;
  const N = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", E = /* @__PURE__ */ m(
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
          ${N}
        `,
          children: [
            /* @__PURE__ */ m("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/30", children: [
              /* @__PURE__ */ m("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                g && /* @__PURE__ */ m(ml, { size: 12, className: "animate-spin" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 173,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ m("span", { className: "font-medium", children: v ? "Error" : h }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 174,
                  columnNumber: 13
                }, this),
                g && /* @__PURE__ */ m("span", { className: "opacity-60", children: "Generating…" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 177,
                  columnNumber: 29
                }, this)
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 172,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (y) => {
                    y.preventDefault(), i();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ m(gt, { size: 14, className: "text-muted-foreground" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 184,
                    columnNumber: 13
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 179,
                  columnNumber: 11
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
              lineNumber: 171,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ m(
              "div",
              {
                ref: s,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: v ? /* @__PURE__ */ m("div", { className: "text-destructive", children: e.message }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 194,
                  columnNumber: 13
                }, this) : /* @__PURE__ */ m("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  g && /* @__PURE__ */ m("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 201,
                    columnNumber: 17
                  }, this)
                ] }, void 0, !0, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 198,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 189,
                columnNumber: 9
              },
              this
            ),
            /* @__PURE__ */ m("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (b || v) && /* @__PURE__ */ m(Ce, { children: [
                b && /* @__PURE__ */ m(Ce, { children: [
                  /* @__PURE__ */ m(
                    rn,
                    {
                      icon: si,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 213,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ m(
                    rn,
                    {
                      icon: zi,
                      label: "Insert",
                      onClick: o
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 219,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ m(
                    rn,
                    {
                      icon: l ? yn : Nn,
                      label: l ? "Copied" : "Copy",
                      onClick: w
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 224,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 212,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ m(
                  rn,
                  {
                    icon: Ui,
                    label: "Retry",
                    onClick: r
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 231,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ m("div", { className: "flex-1" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 236,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ m(
                  rn,
                  {
                    icon: gt,
                    label: "Discard",
                    onClick: i
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 237,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 210,
                columnNumber: 13
              }, this),
              g && /* @__PURE__ */ m(Ce, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }, void 0, !1, {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 246,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ m(
                  rn,
                  {
                    icon: gt,
                    label: "Stop",
                    onClick: i
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 247,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 245,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
              lineNumber: 208,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 162,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
      lineNumber: 153,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(Nt, { onMouseDown: (y) => y.preventDefault(), children: E }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
    lineNumber: 260,
    columnNumber: 5
  }, this);
}
function rn({
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
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 291,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("span", { children: t }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 292,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ai/AIResultPopover.tsx",
      lineNumber: 280,
      columnNumber: 5
    },
    this
  );
}
function ax({
  editor: e,
  isMobile: t,
  disabledFeatures: n,
  containerRef: o,
  editable: r,
  showFloatingToolbar: i,
  isLinkPopoverOpen: a,
  aiEnabled: s,
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
  onAIRetry: w,
  onAIDiscard: N,
  onLinkPopoverClose: E,
  onEditLink: y,
  onWikiLinkSearch: k,
  imageEditState: M,
  onImageSave: x,
  onImageDelete: C,
  onImageEditClose: S
}) {
  return /* @__PURE__ */ m(Ce, { children: [
    !n.images && !n.dragAndDrop && /* @__PURE__ */ m(ox, { containerRef: o, enabled: r }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 112,
      columnNumber: 9
    }, this),
    !t && i && /* @__PURE__ */ m(
      zk,
      {
        editor: e,
        suppressWhenLinkPopoverOpen: a,
        aiEnabled: s || !!l,
        onAISparklesClick: (D) => c(D)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 117,
        columnNumber: 9
      },
      this
    ),
    u && d && /* @__PURE__ */ m(
      ix,
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
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 127,
        columnNumber: 9
      },
      this
    ),
    h.status !== "idle" && /* @__PURE__ */ m(
      sx,
      {
        state: h,
        position: g,
        onReplace: b,
        onInsert: v,
        onRetry: w,
        onDiscard: N
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 138,
        columnNumber: 9
      },
      this
    ),
    !n.slashCommands && /* @__PURE__ */ m(Xk, { editor: e, disabledFeatures: n }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 150,
      columnNumber: 9
    }, this),
    !n.wikiLinks && k && /* @__PURE__ */ m(tx, { editor: e, onSearch: k }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 155,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m(
      Uk,
      {
        editor: e,
        isOpen: a,
        onClose: E
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 159,
        columnNumber: 7
      },
      this
    ),
    !t && /* @__PURE__ */ m(Yk, { editor: e, onEditLink: y }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 167,
      columnNumber: 9
    }, this),
    !n.images && M?.isOpen && /* @__PURE__ */ m(
      nx,
      {
        src: M.src,
        alt: M.alt,
        position: M.position,
        onSave: x,
        onDelete: C,
        onClose: S
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 172,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/WYSIWYGOverlays.tsx",
    lineNumber: 109,
    columnNumber: 5
  }, this);
}
function lx({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function cx(e, t) {
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
function ux(e) {
  const [t, n] = Ad(cx, { status: "idle" }), o = j(null), r = H(async (s, l, c, u, d) => {
    if (e) {
      n({
        type: "start-streaming",
        action: s,
        actionLabel: l,
        inputText: c,
        selectionRange: u
      });
      try {
        const f = e(s, c, d);
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
  }, [e]), i = H(() => {
    o.current?.(), n({ type: "reset" });
  }, []), a = H(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: r, abort: i, reset: a };
}
const Gu = "paragon-editor-toc-width", dx = 280, qu = 200, Xu = 500;
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
  return dx;
}
function mx(e) {
  try {
    localStorage.setItem(Gu, String(e));
  } catch {
  }
}
function fx(e, t, n) {
  const o = [];
  return e.state.doc.descendants((i, a) => {
    if (i.type.name === "heading") {
      const s = i.attrs.level;
      if (s >= t && s <= n) {
        const l = i.textContent;
        l.trim() && o.push({ id: `toc-heading-${a}`, text: l.trim(), level: s, pos: a });
      }
    }
  }), o;
}
function px(e) {
  if (e.length === 0) return [];
  const t = [], n = [];
  for (const o of e) {
    const r = { ...o, children: [] };
    for (; n.length > 0 && n[n.length - 1].level >= o.level; )
      n.pop();
    if (n.length === 0)
      t.push(r);
    else {
      const i = n[n.length - 1].item;
      i.children || (i.children = []), i.children.push(r);
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
const Ja = wn(function({
  editor: t,
  visible: n = !0,
  onVisibilityChange: o,
  title: r = "",
  minLevel: i = 1,
  maxLevel: a = 4,
  showLevelIndicators: s = !1,
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
  const [w, N] = Y([]), [E, y] = Y(null), [k, M] = Y(n), [x, C] = Y(/* @__PURE__ */ new Set()), [S, D] = Y(() => {
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
      const ce = f === "right" ? _.current - Z.clientX : Z.clientX - _.current, de = Math.min(Xu, Math.max(qu, O.current + ce));
      D(de);
    }, z = () => {
      L.current && (L.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", D((Z) => (mx(Z), Z)));
    };
    return document.addEventListener("mousemove", $), document.addEventListener("mouseup", z), () => {
      document.removeEventListener("mousemove", $), document.removeEventListener("mouseup", z);
    };
  }, [f]);
  const I = H(() => {
    if (!t || t.isDestroyed) return;
    const $ = fx(t, i, a);
    N($), E && !$.find((z) => z.id === E) && y(null);
  }, [t, i, a, E]);
  q(() => {
    if (!t) return;
    const $ = () => {
      R.current && clearTimeout(R.current), R.current = setTimeout(() => I(), 300);
    };
    return I(), t.on("update", $), t.on("create", $), () => {
      t.off("update", $), t.off("create", $), R.current && clearTimeout(R.current);
    };
  }, [t, I]), q(() => {
    if (!t || !l || !k || w.length === 0) return;
    const $ = v?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!$) return;
    const z = () => {
      const de = $.getBoundingClientRect();
      let ve = null;
      for (let Ee = w.length - 1; Ee >= 0; Ee--) {
        const Fe = w[Ee], yt = Qa(t, Fe.pos);
        if (yt && yt.getBoundingClientRect().top - de.top <= p + 10) {
          ve = Fe.id;
          break;
        }
      }
      !ve && w.length > 0 && (ve = w[0].id), y(ve);
    };
    let Z;
    const ce = () => {
      cancelAnimationFrame(Z), Z = requestAnimationFrame(z);
    };
    return $.addEventListener("scroll", ce, { passive: !0 }), z(), () => {
      $.removeEventListener("scroll", ce), cancelAnimationFrame(Z);
    };
  }, [t, w, l, k, p, v]);
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
    y($.id), h?.($);
  }, [t, p, h, v]), B = H(() => {
    const $ = !k;
    M($), o?.($);
  }, [k, o]), K = H(($) => {
    C((z) => {
      const Z = new Set(z);
      return Z.has($) ? Z.delete($) : Z.add($), Z;
    });
  }, []), V = H(($, z, Z = 0) => {
    if (g)
      return g($, z, () => P($));
    const ce = ($.level - i) * 14, de = c && $.children && $.children.length > 0, ve = x.has($.id);
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
              de && /* @__PURE__ */ m(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (Ee) => {
                    Ee.stopPropagation(), K($.id);
                  },
                  children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: ve ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 340,
                    columnNumber: 21
                  }, this) : /* @__PURE__ */ m("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 341,
                    columnNumber: 21
                  }, this) }, void 0, !1, {
                    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 338,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
                  lineNumber: 331,
                  columnNumber: 13
                },
                this
              ),
              s && /* @__PURE__ */ m("span", { className: "toc-level-indicator", children: [
                "H",
                $.level
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 347,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "toc-item-text", children: $.text }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 349,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 325,
            columnNumber: 9
          },
          this
        )
      },
      $.id,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 320,
        columnNumber: 7
      },
      this
    );
  }, [g, P, c, i, s, x, K]), G = H(($, z = 0) => $.map((Z) => {
    const ce = E === Z.id, de = x.has(Z.id), ve = Z.children && Z.children.length > 0;
    return /* @__PURE__ */ m("div", { children: [
      V(Z, ce, z),
      ve && !de && /* @__PURE__ */ m("div", { className: "toc-children", children: G(Z.children, z + 1) }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 364,
        columnNumber: 13
      }, this)
    ] }, Z.id, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
      lineNumber: 361,
      columnNumber: 9
    }, this);
  }), [E, x, V]), Q = H(() => w.map(($) => {
    const z = E === $.id;
    return V($, z);
  }), [w, E, V]);
  if (!t) return null;
  const W = c ? px(w) : [];
  return /* @__PURE__ */ m(Ce, { children: [
    b && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: B,
        title: k ? "Hide Table of Contents" : "Show Table of Contents",
        children: k ? /* @__PURE__ */ m(pm, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 393,
          columnNumber: 24
        }, this) : /* @__PURE__ */ m(hm, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 393,
          columnNumber: 56
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 388,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m(
      "div",
      {
        ref: A,
        className: `toc-sidebar ${k ? "toc-visible" : "toc-hidden"} toc-${f} ${u}`,
        style: { width: k ? `${S}px` : "0px" },
        children: [
          k && /* @__PURE__ */ m(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: U
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 405,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m("div", { className: "toc-inner", children: [
            r && /* @__PURE__ */ m("div", { className: "toc-header", children: /* @__PURE__ */ m("span", { className: "toc-title", children: r }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 415,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 414,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m("div", { className: "toc-content toc-content-with-toggle", children: w.length === 0 ? /* @__PURE__ */ m("div", { className: "toc-empty", children: [
              /* @__PURE__ */ m("p", { children: "No headings yet" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 423,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ m("p", { className: "toc-empty-hint", children: "Add headings to see the outline." }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 424,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 422,
              columnNumber: 15
            }, this) : /* @__PURE__ */ m("div", { className: "toc-list", children: c ? G(W) : Q() }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 427,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 420,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 411,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 398,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/TableOfContents.tsx",
    lineNumber: 385,
    columnNumber: 5
  }, this);
}), hx = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, u1 = Pd(function({
  content: t = "",
  onChange: n,
  onHTMLChange: o,
  onMarkdownChange: r,
  placeholder: i = 'Start writing... Use "/" for commands',
  editable: a = !0,
  autofocus: s = !1,
  className: l = "",
  showToolbar: c = !0,
  showWordCount: u = !0,
  theme: d,
  autoSave: f = !0,
  autoSaveKey: p = "paragon-editor-content",
  autoSaveDelay: h = 1e3,
  showRecoveryBanner: g = !0,
  showFloatingToolbar: b = !0,
  maxImageSize: v = 5 * 1024 * 1024,
  onImageUploadStart: w,
  onImageUploadComplete: N,
  onImageUploadError: E,
  onImageUpload: y,
  resolveImageSrc: k,
  showModeToggle: M = !0,
  // New props
  initialMode: x = "wysiwyg",
  onModeChange: C,
  onReady: S,
  onFocus: D,
  onBlur: A,
  onSelectionChange: R,
  onDestroy: L,
  onSave: _,
  onRecover: O,
  onWikiLinkClick: U,
  validateWikiLink: I,
  onWikiLinkSearch: P,
  onLinkClick: B,
  findReplaceOpen: K,
  onFindReplaceChange: V,
  renderToolbar: G,
  renderFooter: Q,
  disabledFeatures: W = {},
  minHeight: $ = "200px",
  maxHeight: z,
  spellCheck: Z = !0,
  headingLevels: ce = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: de = [1, 2, 3],
  // TOC props
  showTableOfContents: ve = !1,
  tocVisible: Ee = !0,
  onTocVisibilityChange: Fe,
  tocTitle: yt = "",
  tocMinLevel: Dn = 1,
  tocMaxLevel: An = 4,
  tocShowLevelIndicators: ao = !1,
  tocHighlightActive: lo = !0,
  tocTreeView: co = !1,
  tocWidth: uo = "240px",
  tocPosition: jt = "right",
  tocScrollOffset: Pn = 20,
  onTocItemClick: Vt,
  renderTocItem: Kt,
  tocShowToggleButton: mo = !0,
  // Raw markdown editor
  autoClosePairs: xr = !0,
  // Performance profiler
  showPerformanceProfiler: Cr = !1,
  onPerformanceProfilerClose: Er,
  // Auto reorder checklist
  autoReorderChecklist: Tr = !1,
  // Expand selection
  progressiveSelectAll: Sr = !1,
  // Auto-detection toggles
  enableTagAutoDetect: fo = !1,
  enableHexColorHighlight: Mr = !1,
  enableCollapsibleHeadings: Dr = !1,
  // Performance mode
  performanceMode: In = "auto",
  // Error boundary
  onEditorError: Ar,
  // AI writing assistant
  aiActions: at,
  onAIAction: Gt,
  onAISetupRequired: oe
}, he) {
  const [ne] = Y(() => hx()), [me, Re] = Y(x), [ue, Rn] = Y(""), qt = j(x), Xt = j(""), lt = j(null), [Ln, Ns] = Y(0), po = !!(at && at.length > 0 && Gt), { state: ze, executeAction: ho, abort: Ju, reset: kt } = ux(Gt), [ed, Pr] = Y(null), [td, nd] = Y({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), od = j(Gt);
  od.current = Gt;
  const ys = j(oe);
  ys.current = oe;
  const [rd, id] = Y([]), [sd, ad] = Y(0), ld = H((se, Me) => {
    id(se), ad(Me);
  }, []), ks = j(w), xs = j(N), Cs = j(E), Es = j(y), Ts = j(k), Ss = j(U), Ms = j(I), Ds = j(P);
  ks.current = w, xs.current = N, Cs.current = E, Es.current = y, Ts.current = k, Ss.current = U, Ms.current = I, Ds.current = P;
  const As = 2e3, [Ir, cd] = Y(() => In === "lightweight" ? !0 : In === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > As : !1), ud = j(0), Ps = j(Ir);
  Ps.current = Ir;
  const [Rr, go] = Y(null), dd = mk({
    placeholder: i,
    isMobile: ne,
    maxImageSize: v,
    headingLevels: ce,
    collapsibleHeadingLevels: de,
    disabledFeatures: W,
    progressiveSelectAll: Sr,
    enableCollapsibleHeadings: Dr,
    enableTagAutoDetect: fo,
    enableHexColorHighlight: Mr,
    isLightweight: Ir,
    setImageEditState: go,
    callbackRefs: {
      onImageUploadStart: ks,
      onImageUploadComplete: xs,
      onImageUploadError: Cs,
      onImageUpload: Es,
      resolveImageSrc: Ts,
      onWikiLinkClick: Ss,
      validateWikiLink: Ms
    }
  }), { editor: le, turndownService: Is } = gk({
    extensions: dd,
    content: t,
    editable: a,
    autofocus: s,
    spellCheck: Z,
    initialMode: x,
    performanceMode: In,
    lightweightThreshold: As,
    onChange: n,
    onHTMLChange: o,
    onMarkdownChange: r,
    onReady: S,
    onDestroy: L,
    onFocus: D,
    onBlur: A,
    onSelectionChange: R,
    onLinkClick: B,
    editorModeRef: qt,
    rawMarkdownRef: Xt,
    setRawMarkdown: Rn,
    setIsLightweight: cd,
    lightweightCheckCounterRef: ud,
    isLightweightRef: Ps
  }), [md, bo] = Y(!1), [fd, pd] = Y(!1), hd = K !== void 0 ? K : fd, It = H((se) => {
    pd(se), V?.(se);
  }, [V]), [gd, vo] = Y(0), [bd, vd] = Y(""), Rt = Cv(le, {
    storageKey: p,
    debounceMs: h,
    enabled: f,
    onSave: (se) => {
      _?.(se);
    },
    onRecover: (se) => {
      O?.(se);
    }
  }), Lr = Ak({
    editor: le,
    turndownService: Is,
    editorModeRef: qt,
    rawMarkdownRef: Xt,
    setEditorMode: Re,
    setRawMarkdown: Rn,
    onModeChange: C,
    enableTagAutoDetect: fo,
    disabledFeatures: W
  }), Rs = H((se) => {
    Rn(se), Xt.current = se, r?.(se);
  }, [r]), wo = Ik(le, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: u
  });
  Ev(he, {
    editor: le,
    turndownService: Is,
    editorModeRef: qt,
    handleModeSwitch: Lr,
    wordCount: wo,
    autoSaveState: Rt,
    setIsFindReplaceOpen: It,
    setFindReplaceFocusTrigger: vo
  }), Dk({
    editorModeRef: qt,
    rawMarkdownRef: Xt,
    editorMode: me,
    handleModeSwitch: Lr,
    setIsFindReplaceOpen: It,
    setFindReplaceFocusTrigger: vo
  });
  const wd = Ht(() => ({
    openLinkPopover: () => bo(!0),
    openFindReplace: (se) => {
      se && vd(se), It(!0), vo((Me) => Me + 1);
    },
    openFindReplaceWithReplace: () => {
      It(!0);
    }
  }), [It]);
  Mk(le, ne, wd);
  const Ls = H((se, Me) => {
    if (!po) {
      ys.current?.();
      return;
    }
    if (!le) return;
    let ct = { top: 0, left: 0 };
    if (Me) {
      const Ve = Me.getBoundingClientRect();
      ct = { top: Ve.bottom + 4, left: Ve.left };
    } else {
      const { from: Ve, to: Zt } = le.state.selection, No = le.view.coordsAtPos(Ve), yo = le.view.coordsAtPos(Zt);
      ct = { top: yo.bottom + 8, left: (No.left + yo.left) / 2 };
    }
    Pr({ scope: se, position: ct });
  }, [po, le]), Nd = H((se, Me) => {
    if (!le || !at) return;
    const ct = at.find((Ed) => Ed.id === se);
    if (!ct) return;
    const { from: Ve, to: Zt } = le.state.selection, No = Ve !== Zt ? le.state.doc.textBetween(Ve, Zt, `
`) : "", yo = ct.scope === "document" || !No ? le.getText() : No, $s = le.view.coordsAtPos(Ve), Ws = le.view.coordsAtPos(Zt);
    nd({
      selectionTop: $s.top,
      selectionBottom: Ws.bottom,
      selectionCenterX: ($s.left + Ws.right) / 2
    }), Pr(null), ho(se, ct.label, yo, { from: Ve, to: Zt }, Me);
  }, [le, at, ho]), yd = H(() => {
    if (!le || ze.status !== "complete") return;
    const { selectionRange: se, result: Me } = ze;
    le.chain().focus().setTextSelection(se).deleteSelection().insertContent(Me).run(), kt();
  }, [le, ze, kt]), kd = H(() => {
    if (!le || ze.status !== "complete") return;
    const { selectionRange: se, result: Me } = ze;
    le.chain().focus().setTextSelection(se.to).insertContent(`
` + Me).run(), kt();
  }, [le, ze, kt]), xd = H(() => {
    if (!(ze.status !== "complete" && ze.status !== "error"))
      if (ze.status === "complete") {
        const { action: se, actionLabel: Me, inputText: ct, selectionRange: Ve } = ze;
        kt(), ho(se, Me, ct, Ve);
      } else
        kt();
  }, [ze, kt, ho]);
  if (!le)
    return /* @__PURE__ */ m(Bk, { className: l, theme: d }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 829,
      columnNumber: 12
    }, this);
  const Os = /* @__PURE__ */ m(
    vv,
    {
      editor: le,
      onOpenLinkPopover: () => bo(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        It(!0), vo((se) => se + 1);
      },
      disabledFeatures: W,
      autoReorderChecklist: Tr,
      aiEnabled: po || !!oe,
      onAISparklesClick: (se) => Ls("document", se)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 834,
      columnNumber: 5
    },
    this
  ), _s = /* @__PURE__ */ m("div", { className: "editor-footer", children: [
    f && /* @__PURE__ */ m(
      Rk,
      {
        status: Rt.status,
        lastSaved: Rt.lastSaved
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 853,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ m("span", { children: [
      wo.words,
      " words"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 859,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 858,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 851,
    columnNumber: 5
  }, this), Cd = {
    minHeight: $,
    ...z && { maxHeight: z, overflowY: "auto" }
  };
  return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${l}`, "data-theme": d, children: [
    f && g && Rt.hasRecoverableContent && /* @__PURE__ */ m(
      Lk,
      {
        onRecover: () => {
          Rt.recover();
        },
        onDismiss: Rt.dismissRecovery
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 874,
        columnNumber: 9
      },
      this
    ),
    c && /* @__PURE__ */ m("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      G ? G(le, Os) : Os,
      M && /* @__PURE__ */ m(Hk, { editorMode: me, onModeSwitch: Lr }, void 0, !1, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 887,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 884,
      columnNumber: 9
    }, this),
    !ne && /* @__PURE__ */ m(
      wv,
      {
        editor: le,
        isOpen: hd,
        onClose: () => It(!1),
        focusTrigger: gd,
        initialSearchQuery: bd,
        editorMode: me,
        rawMarkdown: ue,
        onRawMarkdownChange: Rs,
        onMatchesChange: ld
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 894,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m(kv, { editor: le }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 908,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("div", { className: `editor-main-area ${ve ? "editor-with-toc" : ""}`, children: [
      ve && jt === "left" && /* @__PURE__ */ m(
        Ja,
        {
          editor: le,
          visible: Ee,
          onVisibilityChange: Fe,
          title: yt,
          minLevel: Dn,
          maxLevel: An,
          showLevelIndicators: ao,
          highlightActive: lo,
          treeView: co,
          width: uo,
          position: jt,
          scrollOffset: Pn,
          onItemClick: Vt,
          renderItem: Kt,
          showToggleButton: mo,
          scrollContainerRef: lt
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 914,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ m(
        Wk,
        {
          resetKey: `${t}-${Ln}`,
          onRetry: () => Ns((se) => se + 1),
          onClearContent: () => {
            le && le.commands.clearContent(), n?.(""), o?.(""), r?.(""), Ns((se) => se + 1);
          },
          onError: Ar,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: lt, style: Cd, children: me === "wysiwyg" ? /* @__PURE__ */ m(Ce, { children: [
              /* @__PURE__ */ m(Sd, { editor: le, className: "editor-content" }, void 0, !1, {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 951,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m(
                ax,
                {
                  editor: le,
                  isMobile: ne,
                  disabledFeatures: W,
                  containerRef: lt,
                  editable: a,
                  showFloatingToolbar: b,
                  isLinkPopoverOpen: md,
                  aiEnabled: po,
                  onAISetupRequired: oe,
                  onAISparklesClick: (se) => Ls("selection", se),
                  aiDropdown: ed,
                  aiActions: at,
                  onAIActionSelect: Nd,
                  onAIDropdownClose: () => Pr(null),
                  aiState: ze,
                  aiPopoverPosition: td,
                  onAIReplace: yd,
                  onAIInsert: kd,
                  onAIRetry: xd,
                  onAIDiscard: () => {
                    Ju(), kt();
                  },
                  onLinkPopoverClose: () => bo(!1),
                  onEditLink: () => bo(!0),
                  onWikiLinkSearch: Ds.current,
                  imageEditState: Rr,
                  onImageSave: (se, Me) => {
                    le.chain().focus().setNodeSelection(Rr.pos).updateAttributes("resizableImage", {
                      src: se,
                      alt: Me
                    }).run(), go(null);
                  },
                  onImageDelete: () => {
                    le.chain().focus().setNodeSelection(Rr.pos).deleteSelection().run(), go(null);
                  },
                  onImageEditClose: () => go(null)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 952,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 950,
              columnNumber: 11
            }, this) : /* @__PURE__ */ m(
              Ok,
              {
                content: ue,
                onChange: Rs,
                placeholder: "Write your markdown here...",
                editable: a,
                autofocus: !0,
                searchMatches: rd,
                currentMatchIndex: sd,
                autoClosePairs: xr
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 992,
                columnNumber: 11
              },
              this
            ) }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 948,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ m(lx, { scrollContainerRef: lt }, void 0, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1004,
              columnNumber: 7
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 933,
          columnNumber: 7
        },
        this
      ),
      ve && jt === "right" && /* @__PURE__ */ m(
        Ja,
        {
          editor: le,
          visible: Ee,
          onVisibilityChange: Fe,
          title: yt,
          minLevel: Dn,
          maxLevel: An,
          showLevelIndicators: ao,
          highlightActive: lo,
          treeView: co,
          width: uo,
          position: jt,
          scrollOffset: Pn,
          onItemClick: Vt,
          renderItem: Kt,
          showToggleButton: mo,
          scrollContainerRef: lt
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1008,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 911,
      columnNumber: 7
    }, this),
    u && (Q ? Q(
      { words: wo.words, characters: wo.characters },
      Rt.status,
      _s
    ) : _s),
    /* @__PURE__ */ m($k, { visible: Cr, onClose: Er, editor: le }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1041,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 871,
    columnNumber: 5
  }, this);
}), d1 = ar.create({
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
}, gx = {
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
}, bx = {
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
}, vx = {
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
}, Fn = {
  dark: Zu,
  light: gx,
  sepia: bx,
  nord: vx
};
function wx(e, t) {
  Object.entries(t.variables).forEach(([n, o]) => {
    e.style.setProperty(n, o);
  });
}
function m1(e, t, n, o) {
  const r = Fn[e] || Zu;
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
function f1({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [o, r] = Y(t), i = Fn[o] || Fn.dark, a = H((l) => {
    Fn[l] && r(l);
  }, []);
  q(() => {
    n?.current && wx(n.current, i);
  }, [i, n]);
  const s = {
    theme: i,
    themeName: o,
    setTheme: a,
    availableThemes: Object.keys(Fn)
  };
  return /* @__PURE__ */ m(Qu.Provider, { value: s, children: e }, void 0, !1, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/ThemeProvider.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function p1() {
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
function h1({ node: e, updateAttributes: t }) {
  const [n, o] = Y(!1), r = e.attrs.language || "plaintext";
  el.find((a) => a.value === r)?.label;
  const i = H(() => {
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
            children: el.map(({ value: a, label: s }) => /* @__PURE__ */ m("option", { value: a, children: s }, a, !1, {
              fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/CodeBlockComponent.tsx",
              lineNumber: 64,
              columnNumber: 15
            }, this))
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 58,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(Mt, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/CodeBlockComponent.tsx",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/CodeBlockComponent.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: i,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ m(yn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 76,
            columnNumber: 21
          }, this) : /* @__PURE__ */ m(Nn, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 76,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/CodeBlockComponent.tsx",
          lineNumber: 71,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m(Mi, {}, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 83,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/paragon-git-work/client/src/components/editor/CodeBlockComponent.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
export {
  Rk as AutoSaveIndicator,
  d1 as Callout,
  Py as CalloutInputRule,
  h1 as CodeBlockComponent,
  Ty as CollapsibleHeading,
  Kv as CollapsibleList,
  dy as DatePill,
  f1 as EditorThemeProvider,
  vv as EditorToolbar,
  wv as FindReplace,
  zk as FloatingToolbar,
  ox as ImageDropZone,
  dk as ImageUpload,
  u1 as MarkdownEditor,
  Dy as MarkdownLinkInputRule,
  xy as MarkdownPasteSafe,
  Fv as MixedBulletList,
  jv as MixedListItem,
  zv as MixedOrderedList,
  Yv as MixedTaskItem,
  Uv as MixedTaskList,
  Lk as RecoveryBanner,
  Jv as ResizableImage,
  Iy as SearchHighlight,
  kv as SelectAllActionBar,
  ok as SelectAllOccurrences,
  Xk as SlashCommands,
  Oy as TabIndent,
  Ja as TableOfContents,
  py as TagPill,
  gy as WikiLinkSafe,
  wx as applyTheme,
  m1 as createCustomTheme,
  Zu as darkTheme,
  ws as getDateVariant,
  sn as isValidTag,
  gx as lightTheme,
  Gv as loadLanguageIfNeeded,
  be as lowlight,
  vx as nordTheme,
  Yn as normalizeTag,
  _t as parseDateFromMarkdown,
  bx as sepiaTheme,
  Fn as themes,
  Cv as useAutoSave,
  p1 as useEditorTheme,
  Ik as useWordCount
};
//# sourceMappingURL=paragon.js.map
