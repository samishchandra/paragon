import { jsxs as I, jsx as m, Fragment as ve } from "react/jsx-runtime";
import { ReactNodeViewRenderer as fo, NodeViewWrapper as vn, NodeViewContent as Hs, useEditorState as fc, useEditor as Bd, EditorContent as Fd } from "@tiptap/react";
import * as T from "react";
import X, { useState as U, useRef as j, useEffect as K, useCallback as B, useLayoutEffect as mo, memo as vt, useImperativeHandle as Ud, createContext as mc, useContext as pc, useMemo as Nt, Component as Yd, useReducer as jd, lazy as Vd, forwardRef as Kd, Suspense as Ka } from "react";
import Gd from "@tiptap/extension-code-block-lowlight";
import { createLowlight as qd } from "lowlight";
import { ChevronDown as Lt, Check as Kt, Copy as Gt, Image as Ws, X as pt, Link2 as zs, Type as po, Undo as Xd, Redo as Zd, Bold as Bs, Italic as Fs, Underline as Us, Strikethrough as Ys, Code as hc, Highlighter as gc, Link as js, List as Vs, ListOrdered as Ks, CheckSquare as Gs, Quote as qs, Code2 as yc, IndentIncrease as Qd, IndentDecrease as Jd, Table as hs, Minus as vc, Info as Qr, BookOpen as Xs, PenLine as ef, Library as tf, ListTodo as Zs, Columns as Ga, Trash2 as un, Rows as qa, ToggleLeft as Xa, ArrowUpDown as nf, Sparkles as ho, Search as rf, ChevronUp as of, MousePointerClick as sf, CaseSensitive as af, WholeWord as cf, Regex as lf, Replace as gs, ReplaceAll as uf, Plus as Qs, ClipboardList as df, MessageSquareText as bc, StickyNote as wc, ChevronRight as xc, ChevronLeftIcon as ff, ChevronRightIcon as mf, ChevronDownIcon as pf, Calendar as kc, Hash as Za, Cloud as hf, Loader2 as Cc, CloudOff as gf, AlertCircle as yf, RotateCcw as Js, Activity as vf, Maximize2 as Mc, Minimize2 as Tc, AlertTriangle as bf, CheckCircle2 as wf, Eye as xf, FileText as ea, FileCode as kf, ExternalLink as Cf, Pencil as Mf, Unlink as Tf, Heading1 as Sf, Heading2 as Ef, Heading3 as Df, Heading4 as Nf, Heading5 as Af, ImagePlus as Lf, MessageSquare as Sc, RefreshCw as If, SpellCheck as Rf, PanelRightClose as Pf, PanelRightOpen as Of } from "lucide-react";
import { Plugin as Me, PluginKey as Te, TextSelection as Ve, NodeSelection as _f, AllSelection as $f } from "@tiptap/pm/state";
import ta from "highlight.js/lib/languages/javascript";
import na from "highlight.js/lib/languages/typescript";
import Ec from "highlight.js/lib/languages/python";
import ra from "highlight.js/lib/languages/xml";
import Hf from "highlight.js/lib/languages/css";
import Wf from "highlight.js/lib/languages/json";
import go from "highlight.js/lib/languages/bash";
import * as Dc from "react-dom";
import zf, { createPortal as Bf } from "react-dom";
import { Fragment as Nc, Slice as jo, DOMSerializer as Ff } from "@tiptap/pm/model";
import Uf from "@tiptap/starter-kit";
import Yf from "@tiptap/extension-placeholder";
import jf from "@tiptap/extension-text-align";
import Vf from "@tiptap/extension-highlight";
import Kf from "@tiptap/extension-link";
import { Table as Gf } from "@tiptap/extension-table";
import qf from "@tiptap/extension-table-row";
import Xf from "@tiptap/extension-table-cell";
import Zf from "@tiptap/extension-table-header";
import { Extension as Ue, Node as yo, mergeAttributes as kn, InputRule as _e, Mark as Ac } from "@tiptap/core";
import { DecorationSet as je, Decoration as Ze } from "@tiptap/pm/view";
import Qf from "@tiptap/extension-bullet-list";
import Jf from "@tiptap/extension-ordered-list";
import em from "@tiptap/extension-list-item";
import tm from "@tiptap/extension-task-list";
import nm from "@tiptap/extension-task-item";
import { findWrapping as Qa, canJoin as rm } from "@tiptap/pm/transform";
import om from "@tiptap/extension-underline";
import sm from "@tiptap/extension-subscript";
import am from "@tiptap/extension-superscript";
import im from "@tiptap/extension-typography";
import cm from "@tiptap/extension-image";
import { createRoot as lm } from "react-dom/client";
import { liftListItem as Ja, sinkListItem as ei } from "@tiptap/pm/schema-list";
import { undo as um, redo as dm } from "@tiptap/pm/history";
import fm from "@tiptap/extension-horizontal-rule";
import mm from "@tiptap/extension-code";
import pm from "@tiptap/extension-bold";
import hm from "@tiptap/extension-italic";
import gm from "@tiptap/extension-strike";
const ye = qd();
ye.register("javascript", ta);
ye.register("js", ta);
ye.register("jsx", ta);
ye.register("typescript", na);
ye.register("ts", na);
ye.register("tsx", na);
ye.register("python", Ec);
ye.register("py", Ec);
ye.register("xml", ra);
ye.register("html", ra);
ye.register("svg", ra);
ye.register("css", Hf);
ye.register("json", Wf);
ye.register("bash", go);
ye.register("sh", go);
ye.register("shell", go);
ye.register("zsh", go);
const ys = {
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
}, Dr = /* @__PURE__ */ new Set(), Nr = /* @__PURE__ */ new Set();
async function ym(e) {
  if (ye.registered(e)) return !0;
  const t = ys[e];
  if (!t) return !1;
  if (Nr.has(e)) return !0;
  if (Dr.has(e))
    return new Promise((n) => {
      const r = () => {
        Nr.has(e) ? n(!0) : Dr.has(e) ? setTimeout(r, 50) : n(!1);
      };
      setTimeout(r, 50);
    });
  Dr.add(e);
  try {
    const r = (await t()).default;
    ye.register(e, r), Nr.add(e);
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
          i !== e && !ye.registered(i) && (ye.register(i, r), Nr.add(i));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Dr.delete(e);
  }
}
function vm({ node: e, updateAttributes: t, extension: n }) {
  const [r, o] = U(!1), [s, i] = U(!1), [a, c] = U(!0), l = j(null), u = e.attrs.language || "plaintext";
  K(() => {
    const h = l.current;
    if (!h || s) return;
    const y = new IntersectionObserver(
      (b) => {
        for (const v of b)
          v.isIntersecting && (i(!0), y.unobserve(h));
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: "200px 0px",
        threshold: 0
      }
    );
    return y.observe(h), () => {
      y.disconnect();
    };
  }, [s]), K(() => {
    if (s && u !== "plaintext") {
      if (ye.registered(u)) {
        c(!0);
        return;
      }
      ys[u] && (c(!1), ym(u).then((h) => {
        c(h);
      }));
    }
  }, [s, u]);
  const d = B(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), o(!0), setTimeout(() => o(!1), 2e3);
    } catch (h) {
      console.error("Failed to copy:", h);
    }
  }, [e.textContent]), f = n.options.lowlight?.listLanguages?.() || [], p = Array.from(/* @__PURE__ */ new Set([...f, ...Object.keys(ys)])).sort(), g = u === "plaintext" ? "Plain Text" : u.charAt(0).toUpperCase() + u.slice(1);
  return /* @__PURE__ */ I(vn, { className: "code-block-wrapper", ref: l, children: [
    /* @__PURE__ */ I("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ I("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ I(
          "select",
          {
            value: u,
            onChange: (h) => t({ language: h.target.value }),
            className: "code-block-language-select",
            children: [
              /* @__PURE__ */ m("option", { value: "plaintext", children: "Plain Text" }),
              p.map((h) => /* @__PURE__ */ m("option", { value: h, children: h.charAt(0).toUpperCase() + h.slice(1) }, h))
            ]
          }
        ),
        /* @__PURE__ */ m("span", { className: "code-block-language-label", children: g }),
        /* @__PURE__ */ m(Lt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: d,
          className: `code-block-copy-btn ${r ? "copied" : ""}`,
          title: r ? "Copied!" : "Copy code",
          children: r ? /* @__PURE__ */ m(Kt, { size: 14 }) : /* @__PURE__ */ m(Gt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!s || !a ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m(Hs, { className: s && a ? `language-${u}` : "language-plaintext" }) })
  ] });
}
const bm = Gd.configure({
  lowlight: ye,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
}).extend({
  addNodeView() {
    return fo(vm, {
      update: ({ oldNode: e, newNode: t, updateProps: n }) => {
        const r = e.attrs.language !== t.attrs.language, o = !e.content.eq(t.content);
        return (r || o) && n(), !0;
      }
    });
  },
  addKeyboardShortcuts() {
    return {
      ...this.parent?.() ?? {},
      "Mod-Alt-c": () => oa(this.editor)
    };
  },
  addProseMirrorPlugins() {
    const e = this.parent?.() ?? [], t = this.type;
    return [
      // Plugin: Handle ``` + Enter shortcut to create code block with cursor inside
      new Me({
        key: new Te("codeBlockEnterShortcut"),
        props: {
          handleKeyDown(n, r) {
            if (r.key !== "Enter") return !1;
            const { state: o } = n, { $from: s, empty: i } = o.selection;
            if (!i || s.parent.type.spec.code) return !1;
            const c = s.parent.textBetween(
              0,
              s.parentOffset,
              void 0,
              "￼"
            ).match(/^```([a-zA-Z]*)$/);
            if (!c) return !1;
            r.preventDefault();
            const l = c[1] || null, u = o.tr, d = o.schema.nodes.paragraph, f = t.create({ language: l }, void 0), p = s.before(s.depth), g = s.after(s.depth), h = d.create();
            u.replaceWith(p, g, [f, h]);
            const y = p + 1;
            return u.setSelection(Ve.create(u.doc, y)), n.dispatch(u), !0;
          }
        }
      }),
      ...e
    ];
  }
});
function oa(e) {
  const { state: t } = e, { from: n, to: r, empty: o } = t.selection;
  if (e.isActive("codeBlock") || o)
    return e.chain().focus().toggleCodeBlock().run();
  let s = 0;
  const i = [];
  if (t.doc.nodesBetween(n, r, (h) => h.isTextblock ? (s++, i.push(h.textContent), !1) : !0), s <= 1)
    return e.chain().focus().toggleCodeBlock().run();
  const a = i.join(`
`), c = t.schema.nodes.codeBlock, l = t.doc.resolve(n), u = t.doc.resolve(r), d = Math.max(1, l.depth), f = Math.max(1, u.depth), p = l.before(d), g = u.after(f);
  return e.chain().focus().command(({ tr: h }) => {
    const y = c.create(
      { language: null },
      a ? t.schema.text(a) : void 0
    );
    return h.replaceWith(p, g, y), !0;
  }).run();
}
function Lc({ isOpen: e, onClose: t, onInsert: n, position: r }) {
  const [o, s] = U(""), [i, a] = U(""), [c, l] = U(""), [u, d] = U(!1), f = j(null), p = j(null);
  K(() => {
    e && (s(""), a(""), l(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), K(() => {
    if (!e) return;
    const v = (w) => {
      p.current && !p.current.contains(w.target) && t();
    }, x = (w) => {
      w.key === "Escape" && t();
    }, S = setTimeout(() => {
      document.addEventListener("mousedown", v);
    }, 100);
    return document.addEventListener("keydown", x), () => {
      clearTimeout(S), document.removeEventListener("mousedown", v), document.removeEventListener("keydown", x);
    };
  }, [e, t]);
  const g = (v) => {
    if (!v.trim())
      return l("Please enter an image URL"), !1;
    try {
      const x = new URL(v);
      if (!["http:", "https:", "data:"].includes(x.protocol))
        return l("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return l("Please enter a valid URL"), !1;
    }
    return l(""), !0;
  }, h = async () => {
    if (!g(o)) return;
    d(!0);
    const v = new window.Image();
    v.onload = () => {
      d(!1), n(o.trim(), i.trim()), t();
    }, v.onerror = () => {
      d(!1), n(o.trim(), i.trim()), t();
    }, setTimeout(() => {
      u && (d(!1), n(o.trim(), i.trim()), t());
    }, 3e3), v.src = o.trim();
  }, y = (v) => {
    v.key === "Enter" && !v.shiftKey && (v.preventDefault(), h());
  };
  if (!e) return null;
  const b = r ? {
    top: r.top,
    left: Math.min(r.left, typeof window < "u" ? window.innerWidth - 340 : r.left)
  } : { top: "50%", left: "50%" };
  return /* @__PURE__ */ I(
    "div",
    {
      ref: p,
      className: "image-url-dialog fixed z-50",
      style: {
        top: (typeof b.top == "number", b.top),
        left: typeof b.left == "number" ? Math.max(8, b.left) : b.left,
        transform: r ? void 0 : "translate(-50%, -50%)"
      },
      children: [
        /* @__PURE__ */ I("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ I("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ m(Ws, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ m("span", { className: "font-medium text-sm", children: "Insert Image from URL" })
          ] }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: t,
              className: "image-url-dialog-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(pt, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ I("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ I("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ I("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(zs, { size: 12 }),
              "Image URL"
            ] }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: f,
                type: "url",
                value: o,
                onChange: (v) => {
                  s(v.target.value), c && l("");
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
              /* @__PURE__ */ m(po, { size: 12 }),
              "Alt Text (optional)"
            ] }),
            /* @__PURE__ */ m(
              "input",
              {
                type: "text",
                value: i,
                onChange: (v) => a(v.target.value),
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
                onClick: h,
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
function ti(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function vo(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = ti(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : ti(e[o], null);
        }
      };
  };
}
function Ie(...e) {
  return T.useCallback(vo(...e), e);
}
function Cn(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = T.createContext(i), c = n.length;
    n = [...n, i];
    const l = (d) => {
      const { scope: f, children: p, ...g } = d, h = f?.[e]?.[c] || a, y = T.useMemo(() => g, Object.values(g));
      return /* @__PURE__ */ m(h.Provider, { value: y, children: p });
    };
    l.displayName = s + "Provider";
    function u(d, f) {
      const p = f?.[e]?.[c] || a, g = T.useContext(p);
      if (g) return g;
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
  return o.scopeName = e, [r, wm(o, ...t)];
}
function wm(...e) {
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
var It = globalThis?.document ? T.useLayoutEffect : () => {
}, xm = T[" useInsertionEffect ".trim().toString()] || It;
function sa({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = km({
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
        const d = Cm(u) ? u(e) : u;
        d !== e && i.current?.(d);
      } else
        s(u);
    },
    [a, e, s, i]
  );
  return [c, l];
}
function km({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = T.useState(e), o = T.useRef(n), s = T.useRef(t);
  return xm(() => {
    s.current = t;
  }, [t]), T.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function Cm(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function Vn(e) {
  const t = /* @__PURE__ */ Tm(e), n = T.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = T.Children.toArray(s), c = a.find(Em);
    if (c) {
      const l = c.props.children, u = a.map((d) => d === c ? T.Children.count(l) > 1 ? T.Children.only(null) : T.isValidElement(l) ? l.props.children : null : d);
      return /* @__PURE__ */ m(t, { ...i, ref: o, children: T.isValidElement(l) ? T.cloneElement(l, void 0, u) : null });
    }
    return /* @__PURE__ */ m(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Mm = /* @__PURE__ */ Vn("Slot");
// @__NO_SIDE_EFFECTS__
function Tm(e) {
  const t = T.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (T.isValidElement(o)) {
      const i = Nm(o), a = Dm(s, o.props);
      return o.type !== T.Fragment && (a.ref = r ? vo(r, i) : i), T.cloneElement(o, a);
    }
    return T.Children.count(o) > 1 ? T.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Ic = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Sm(e) {
  const t = ({ children: n }) => /* @__PURE__ */ m(ve, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Ic, t;
}
function Em(e) {
  return T.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ic;
}
function Dm(e, t) {
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
function Nm(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Am = [
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
], Ae = Am.reduce((e, t) => {
  const n = /* @__PURE__ */ Vn(`Primitive.${t}`), r = T.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(c, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Rc(e, t) {
  e && Dc.flushSync(() => e.dispatchEvent(t));
}
function Pc(e) {
  const t = e + "CollectionProvider", [n, r] = Cn(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (h) => {
    const { scope: y, children: b } = h, v = X.useRef(null), x = X.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ m(o, { scope: y, itemMap: x, collectionRef: v, children: b });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ Vn(a), l = X.forwardRef(
    (h, y) => {
      const { scope: b, children: v } = h, x = s(a, b), S = Ie(y, x.collectionRef);
      return /* @__PURE__ */ m(c, { ref: S, children: v });
    }
  );
  l.displayName = a;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ Vn(u), p = X.forwardRef(
    (h, y) => {
      const { scope: b, children: v, ...x } = h, S = X.useRef(null), w = Ie(y, S), M = s(u, b);
      return X.useEffect(() => (M.itemMap.set(S, { ref: S, ...x }), () => void M.itemMap.delete(S))), /* @__PURE__ */ m(f, { [d]: "", ref: w, children: v });
    }
  );
  p.displayName = u;
  function g(h) {
    const y = s(e + "CollectionConsumer", h);
    return X.useCallback(() => {
      const v = y.collectionRef.current;
      if (!v) return [];
      const x = Array.from(v.querySelectorAll(`[${d}]`));
      return Array.from(y.itemMap.values()).sort(
        (M, E) => x.indexOf(M.ref.current) - x.indexOf(E.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: i, Slot: l, ItemSlot: p },
    g,
    r
  ];
}
var Lm = T.createContext(void 0);
function Oc(e) {
  const t = T.useContext(Lm);
  return e || t || "ltr";
}
function ht(e) {
  const t = T.useRef(e);
  return T.useEffect(() => {
    t.current = e;
  }), T.useMemo(() => (...n) => t.current?.(...n), []);
}
function Im(e, t = globalThis?.document) {
  const n = ht(e);
  T.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Rm = "DismissableLayer", vs = "dismissableLayer.update", Pm = "dismissableLayer.pointerDownOutside", Om = "dismissableLayer.focusOutside", ni, _c = T.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), aa = T.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...c
    } = e, l = T.useContext(_c), [u, d] = T.useState(null), f = u?.ownerDocument ?? globalThis?.document, [, p] = T.useState({}), g = Ie(t, (E) => d(E)), h = Array.from(l.layers), [y] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), b = h.indexOf(y), v = u ? h.indexOf(u) : -1, x = l.layersWithOutsidePointerEventsDisabled.size > 0, S = v >= b, w = Hm((E) => {
      const k = E.target, N = [...l.branches].some((C) => C.contains(k));
      !S || N || (o?.(E), i?.(E), E.defaultPrevented || a?.());
    }, f), M = Wm((E) => {
      const k = E.target;
      [...l.branches].some((C) => C.contains(k)) || (s?.(E), i?.(E), E.defaultPrevented || a?.());
    }, f);
    return Im((E) => {
      v === l.layers.size - 1 && (r?.(E), !E.defaultPrevented && a && (E.preventDefault(), a()));
    }, f), T.useEffect(() => {
      if (u)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (ni = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(u)), l.layers.add(u), ri(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = ni);
        };
    }, [u, f, n, l]), T.useEffect(() => () => {
      u && (l.layers.delete(u), l.layersWithOutsidePointerEventsDisabled.delete(u), ri());
    }, [u, l]), T.useEffect(() => {
      const E = () => p({});
      return document.addEventListener(vs, E), () => document.removeEventListener(vs, E);
    }, []), /* @__PURE__ */ m(
      Ae.div,
      {
        ...c,
        ref: g,
        style: {
          pointerEvents: x ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ie(e.onFocusCapture, M.onFocusCapture),
        onBlurCapture: ie(e.onBlurCapture, M.onBlurCapture),
        onPointerDownCapture: ie(
          e.onPointerDownCapture,
          w.onPointerDownCapture
        )
      }
    );
  }
);
aa.displayName = Rm;
var _m = "DismissableLayerBranch", $m = T.forwardRef((e, t) => {
  const n = T.useContext(_c), r = T.useRef(null), o = Ie(t, r);
  return T.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ m(Ae.div, { ...e, ref: o });
});
$m.displayName = _m;
function Hm(e, t = globalThis?.document) {
  const n = ht(e), r = T.useRef(!1), o = T.useRef(() => {
  });
  return T.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let c = function() {
          $c(
            Pm,
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
function Wm(e, t = globalThis?.document) {
  const n = ht(e), r = T.useRef(!1);
  return T.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && $c(Om, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function ri() {
  const e = new CustomEvent(vs);
  document.dispatchEvent(e);
}
function $c(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Rc(o, s) : o.dispatchEvent(s);
}
var Vo = 0;
function zm() {
  T.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? oi()), document.body.insertAdjacentElement("beforeend", e[1] ?? oi()), Vo++, () => {
      Vo === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Vo--;
    };
  }, []);
}
function oi() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Ko = "focusScope.autoFocusOnMount", Go = "focusScope.autoFocusOnUnmount", si = { bubbles: !1, cancelable: !0 }, Bm = "FocusScope", Hc = T.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, c] = T.useState(null), l = ht(o), u = ht(s), d = T.useRef(null), f = Ie(t, (h) => c(h)), p = T.useRef({
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
      let h = function(x) {
        if (p.paused || !a) return;
        const S = x.target;
        a.contains(S) ? d.current = S : Dt(d.current, { select: !0 });
      }, y = function(x) {
        if (p.paused || !a) return;
        const S = x.relatedTarget;
        S !== null && (a.contains(S) || Dt(d.current, { select: !0 }));
      }, b = function(x) {
        if (document.activeElement === document.body)
          for (const w of x)
            w.removedNodes.length > 0 && Dt(a);
      };
      document.addEventListener("focusin", h), document.addEventListener("focusout", y);
      const v = new MutationObserver(b);
      return a && v.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", h), document.removeEventListener("focusout", y), v.disconnect();
      };
    }
  }, [r, a, p.paused]), T.useEffect(() => {
    if (a) {
      ii.add(p);
      const h = document.activeElement;
      if (!a.contains(h)) {
        const b = new CustomEvent(Ko, si);
        a.addEventListener(Ko, l), a.dispatchEvent(b), b.defaultPrevented || (Fm(Km(Wc(a)), { select: !0 }), document.activeElement === h && Dt(a));
      }
      return () => {
        a.removeEventListener(Ko, l), setTimeout(() => {
          const b = new CustomEvent(Go, si);
          a.addEventListener(Go, u), a.dispatchEvent(b), b.defaultPrevented || Dt(h ?? document.body, { select: !0 }), a.removeEventListener(Go, u), ii.remove(p);
        }, 0);
      };
    }
  }, [a, l, u, p]);
  const g = T.useCallback(
    (h) => {
      if (!n && !r || p.paused) return;
      const y = h.key === "Tab" && !h.altKey && !h.ctrlKey && !h.metaKey, b = document.activeElement;
      if (y && b) {
        const v = h.currentTarget, [x, S] = Um(v);
        x && S ? !h.shiftKey && b === S ? (h.preventDefault(), n && Dt(x, { select: !0 })) : h.shiftKey && b === x && (h.preventDefault(), n && Dt(S, { select: !0 })) : b === v && h.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ m(Ae.div, { tabIndex: -1, ...i, ref: f, onKeyDown: g });
});
Hc.displayName = Bm;
function Fm(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Dt(r, { select: t }), document.activeElement !== n) return;
}
function Um(e) {
  const t = Wc(e), n = ai(t, e), r = ai(t.reverse(), e);
  return [n, r];
}
function Wc(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function ai(e, t) {
  for (const n of e)
    if (!Ym(n, { upTo: t })) return n;
}
function Ym(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function jm(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Dt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && jm(e) && t && e.select();
  }
}
var ii = Vm();
function Vm() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = ci(e, t), e.unshift(t);
    },
    remove(t) {
      e = ci(e, t), e[0]?.resume();
    }
  };
}
function ci(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Km(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Gm = T[" useId ".trim().toString()] || (() => {
}), qm = 0;
function Jr(e) {
  const [t, n] = T.useState(Gm());
  return It(() => {
    n((r) => r ?? String(qm++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Xm = ["top", "right", "bottom", "left"], Rt = Math.min, ze = Math.max, eo = Math.round, Ar = Math.floor, ot = (e) => ({
  x: e,
  y: e
}), Zm = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Qm = {
  start: "end",
  end: "start"
};
function bs(e, t, n) {
  return ze(e, Rt(t, n));
}
function gt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function yt(e) {
  return e.split("-")[0];
}
function Mn(e) {
  return e.split("-")[1];
}
function ia(e) {
  return e === "x" ? "y" : "x";
}
function ca(e) {
  return e === "y" ? "height" : "width";
}
const Jm = /* @__PURE__ */ new Set(["top", "bottom"]);
function nt(e) {
  return Jm.has(yt(e)) ? "y" : "x";
}
function la(e) {
  return ia(nt(e));
}
function ep(e, t, n) {
  n === void 0 && (n = !1);
  const r = Mn(e), o = la(e), s = ca(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = to(i)), [i, to(i)];
}
function tp(e) {
  const t = to(e);
  return [ws(e), t, ws(t)];
}
function ws(e) {
  return e.replace(/start|end/g, (t) => Qm[t]);
}
const li = ["left", "right"], ui = ["right", "left"], np = ["top", "bottom"], rp = ["bottom", "top"];
function op(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ui : li : t ? li : ui;
    case "left":
    case "right":
      return t ? np : rp;
    default:
      return [];
  }
}
function sp(e, t, n, r) {
  const o = Mn(e);
  let s = op(yt(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(ws)))), s;
}
function to(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Zm[t]);
}
function ap(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function zc(e) {
  return typeof e != "number" ? ap(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function no(e) {
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
function di(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = nt(t), i = la(t), a = ca(i), c = yt(t), l = s === "y", u = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
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
  switch (Mn(t)) {
    case "start":
      p[i] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      p[i] += f * (n && l ? -1 : 1);
      break;
  }
  return p;
}
const ip = async (e, t, n) => {
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
  } = di(l, r, c), f = r, p = {}, g = 0;
  for (let h = 0; h < a.length; h++) {
    const {
      name: y,
      fn: b
    } = a[h], {
      x: v,
      y: x,
      data: S,
      reset: w
    } = await b({
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
    u = v ?? u, d = x ?? d, p = {
      ...p,
      [y]: {
        ...p[y],
        ...S
      }
    }, w && g <= 50 && (g++, typeof w == "object" && (w.placement && (f = w.placement), w.rects && (l = w.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : w.rects), {
      x: u,
      y: d
    } = di(l, f, c)), h = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function Kn(e, t) {
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
  } = gt(t, e), g = zc(p), y = a[f ? d === "floating" ? "reference" : "floating" : d], b = no(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), v = d === "floating" ? {
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
  }, w = no(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: v,
    offsetParent: x,
    strategy: c
  }) : v);
  return {
    top: (b.top - w.top + g.top) / S.y,
    bottom: (w.bottom - b.bottom + g.bottom) / S.y,
    left: (b.left - w.left + g.left) / S.x,
    right: (w.right - b.right + g.right) / S.x
  };
}
const cp = (e) => ({
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
    } = gt(e, t) || {};
    if (l == null)
      return {};
    const d = zc(u), f = {
      x: n,
      y: r
    }, p = la(o), g = ca(p), h = await i.getDimensions(l), y = p === "y", b = y ? "top" : "left", v = y ? "bottom" : "right", x = y ? "clientHeight" : "clientWidth", S = s.reference[g] + s.reference[p] - f[p] - s.floating[g], w = f[p] - s.reference[p], M = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let E = M ? M[x] : 0;
    (!E || !await (i.isElement == null ? void 0 : i.isElement(M))) && (E = a.floating[x] || s.floating[g]);
    const k = S / 2 - w / 2, N = E / 2 - h[g] / 2 - 1, C = Rt(d[b], N), D = Rt(d[v], N), A = C, P = E - h[g] - D, O = E / 2 - h[g] / 2 + k, $ = bs(A, O, P), z = !c.arrow && Mn(o) != null && O !== $ && s.reference[g] / 2 - (O < A ? C : D) - h[g] / 2 < 0, V = z ? O < A ? O - A : O - P : 0;
    return {
      [p]: f[p] + V,
      data: {
        [p]: $,
        centerOffset: O - $ - V,
        ...z && {
          alignmentOffset: V
        }
      },
      reset: z
    };
  }
}), lp = function(e) {
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
        fallbackAxisSideDirection: g = "none",
        flipAlignment: h = !0,
        ...y
      } = gt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = yt(o), v = nt(a), x = yt(a) === a, S = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), w = f || (x || !h ? [to(a)] : tp(a)), M = g !== "none";
      !f && M && w.push(...sp(a, h, g, S));
      const E = [a, ...w], k = await Kn(t, y), N = [];
      let C = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (u && N.push(k[b]), d) {
        const O = ep(o, i, S);
        N.push(k[O[0]], k[O[1]]);
      }
      if (C = [...C, {
        placement: o,
        overflows: N
      }], !N.every((O) => O <= 0)) {
        var D, A;
        const O = (((D = s.flip) == null ? void 0 : D.index) || 0) + 1, $ = E[O];
        if ($ && (!(d === "alignment" ? v !== nt($) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        C.every((R) => nt(R.placement) === v ? R.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: C
            },
            reset: {
              placement: $
            }
          };
        let z = (A = C.filter((V) => V.overflows[0] <= 0).sort((V, R) => V.overflows[1] - R.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!z)
          switch (p) {
            case "bestFit": {
              var P;
              const V = (P = C.filter((R) => {
                if (M) {
                  const L = nt(R.placement);
                  return L === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  L === "y";
                }
                return !0;
              }).map((R) => [R.placement, R.overflows.filter((L) => L > 0).reduce((L, H) => L + H, 0)]).sort((R, L) => R[1] - L[1])[0]) == null ? void 0 : P[0];
              V && (z = V);
              break;
            }
            case "initialPlacement":
              z = a;
              break;
          }
        if (o !== z)
          return {
            reset: {
              placement: z
            }
          };
      }
      return {};
    }
  };
};
function fi(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function mi(e) {
  return Xm.some((t) => e[t] >= 0);
}
const up = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = gt(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await Kn(t, {
            ...o,
            elementContext: "reference"
          }), i = fi(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: mi(i)
            }
          };
        }
        case "escaped": {
          const s = await Kn(t, {
            ...o,
            altBoundary: !0
          }), i = fi(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: mi(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Bc = /* @__PURE__ */ new Set(["left", "top"]);
async function dp(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = yt(n), a = Mn(n), c = nt(n) === "y", l = Bc.has(i) ? -1 : 1, u = s && c ? -1 : 1, d = gt(t, e);
  let {
    mainAxis: f,
    crossAxis: p,
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
  return a && typeof g == "number" && (p = a === "end" ? g * -1 : g), c ? {
    x: p * u,
    y: f * l
  } : {
    x: f * l,
    y: p * u
  };
}
const fp = function(e) {
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
      } = t, c = await dp(t, e);
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
}, mp = function(e) {
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
              x: b,
              y: v
            } = y;
            return {
              x: b,
              y: v
            };
          }
        },
        ...c
      } = gt(e, t), l = {
        x: n,
        y: r
      }, u = await Kn(t, c), d = nt(yt(o)), f = ia(d);
      let p = l[f], g = l[d];
      if (s) {
        const y = f === "y" ? "top" : "left", b = f === "y" ? "bottom" : "right", v = p + u[y], x = p - u[b];
        p = bs(v, p, x);
      }
      if (i) {
        const y = d === "y" ? "top" : "left", b = d === "y" ? "bottom" : "right", v = g + u[y], x = g - u[b];
        g = bs(v, g, x);
      }
      const h = a.fn({
        ...t,
        [f]: p,
        [d]: g
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - r,
          enabled: {
            [f]: s,
            [d]: i
          }
        }
      };
    }
  };
}, pp = function(e) {
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
      } = gt(e, t), u = {
        x: n,
        y: r
      }, d = nt(o), f = ia(d);
      let p = u[f], g = u[d];
      const h = gt(a, t), y = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (c) {
        const x = f === "y" ? "height" : "width", S = s.reference[f] - s.floating[x] + y.mainAxis, w = s.reference[f] + s.reference[x] - y.mainAxis;
        p < S ? p = S : p > w && (p = w);
      }
      if (l) {
        var b, v;
        const x = f === "y" ? "width" : "height", S = Bc.has(yt(o)), w = s.reference[d] - s.floating[x] + (S && ((b = i.offset) == null ? void 0 : b[d]) || 0) + (S ? 0 : y.crossAxis), M = s.reference[d] + s.reference[x] + (S ? 0 : ((v = i.offset) == null ? void 0 : v[d]) || 0) - (S ? y.crossAxis : 0);
        g < w ? g = w : g > M && (g = M);
      }
      return {
        [f]: p,
        [d]: g
      };
    }
  };
}, hp = function(e) {
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
      } = gt(e, t), u = await Kn(t, l), d = yt(o), f = Mn(o), p = nt(o) === "y", {
        width: g,
        height: h
      } = s.floating;
      let y, b;
      d === "top" || d === "bottom" ? (y = d, b = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (b = d, y = f === "end" ? "top" : "bottom");
      const v = h - u.top - u.bottom, x = g - u.left - u.right, S = Rt(h - u[y], v), w = Rt(g - u[b], x), M = !t.middlewareData.shift;
      let E = S, k = w;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = x), (r = t.middlewareData.shift) != null && r.enabled.y && (E = v), M && !f) {
        const C = ze(u.left, 0), D = ze(u.right, 0), A = ze(u.top, 0), P = ze(u.bottom, 0);
        p ? k = g - 2 * (C !== 0 || D !== 0 ? C + D : ze(u.left, u.right)) : E = h - 2 * (A !== 0 || P !== 0 ? A + P : ze(u.top, u.bottom));
      }
      await c({
        ...t,
        availableWidth: k,
        availableHeight: E
      });
      const N = await i.getDimensions(a.floating);
      return g !== N.width || h !== N.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function bo() {
  return typeof window < "u";
}
function Tn(e) {
  return Fc(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Be(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function at(e) {
  var t;
  return (t = (Fc(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Fc(e) {
  return bo() ? e instanceof Node || e instanceof Be(e).Node : !1;
}
function Qe(e) {
  return bo() ? e instanceof Element || e instanceof Be(e).Element : !1;
}
function st(e) {
  return bo() ? e instanceof HTMLElement || e instanceof Be(e).HTMLElement : !1;
}
function pi(e) {
  return !bo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Be(e).ShadowRoot;
}
const gp = /* @__PURE__ */ new Set(["inline", "contents"]);
function er(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Je(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !gp.has(o);
}
const yp = /* @__PURE__ */ new Set(["table", "td", "th"]);
function vp(e) {
  return yp.has(Tn(e));
}
const bp = [":popover-open", ":modal"];
function wo(e) {
  return bp.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const wp = ["transform", "translate", "scale", "rotate", "perspective"], xp = ["transform", "translate", "scale", "rotate", "perspective", "filter"], kp = ["paint", "layout", "strict", "content"];
function ua(e) {
  const t = da(), n = Qe(e) ? Je(e) : e;
  return wp.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || xp.some((r) => (n.willChange || "").includes(r)) || kp.some((r) => (n.contain || "").includes(r));
}
function Cp(e) {
  let t = Pt(e);
  for (; st(t) && !bn(t); ) {
    if (ua(t))
      return t;
    if (wo(t))
      return null;
    t = Pt(t);
  }
  return null;
}
function da() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Mp = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function bn(e) {
  return Mp.has(Tn(e));
}
function Je(e) {
  return Be(e).getComputedStyle(e);
}
function xo(e) {
  return Qe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Pt(e) {
  if (Tn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    pi(e) && e.host || // Fallback.
    at(e)
  );
  return pi(t) ? t.host : t;
}
function Uc(e) {
  const t = Pt(e);
  return bn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : st(t) && er(t) ? t : Uc(t);
}
function Gn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Uc(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = Be(o);
  if (s) {
    const a = xs(i);
    return t.concat(i, i.visualViewport || [], er(o) ? o : [], a && n ? Gn(a) : []);
  }
  return t.concat(o, Gn(o, [], n));
}
function xs(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Yc(e) {
  const t = Je(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = st(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = eo(n) !== s || eo(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function fa(e) {
  return Qe(e) ? e : e.contextElement;
}
function dn(e) {
  const t = fa(e);
  if (!st(t))
    return ot(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Yc(t);
  let i = (s ? eo(n.width) : n.width) / r, a = (s ? eo(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const Tp = /* @__PURE__ */ ot(0);
function jc(e) {
  const t = Be(e);
  return !da() || !t.visualViewport ? Tp : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Sp(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Be(e) ? !1 : t;
}
function Vt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = fa(e);
  let i = ot(1);
  t && (r ? Qe(r) && (i = dn(r)) : i = dn(e));
  const a = Sp(s, n, r) ? jc(s) : ot(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, u = o.width / i.x, d = o.height / i.y;
  if (s) {
    const f = Be(s), p = r && Qe(r) ? Be(r) : r;
    let g = f, h = xs(g);
    for (; h && r && p !== g; ) {
      const y = dn(h), b = h.getBoundingClientRect(), v = Je(h), x = b.left + (h.clientLeft + parseFloat(v.paddingLeft)) * y.x, S = b.top + (h.clientTop + parseFloat(v.paddingTop)) * y.y;
      c *= y.x, l *= y.y, u *= y.x, d *= y.y, c += x, l += S, g = Be(h), h = xs(g);
    }
  }
  return no({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function ko(e, t) {
  const n = xo(e).scrollLeft;
  return t ? t.left + n : Vt(at(e)).left + n;
}
function Vc(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - ko(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Ep(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = at(r), a = t ? wo(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = ot(1);
  const u = ot(0), d = st(r);
  if ((d || !d && !s) && ((Tn(r) !== "body" || er(i)) && (c = xo(r)), st(r))) {
    const p = Vt(r);
    l = dn(r), u.x = p.x + r.clientLeft, u.y = p.y + r.clientTop;
  }
  const f = i && !d && !s ? Vc(i, c) : ot(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
  };
}
function Dp(e) {
  return Array.from(e.getClientRects());
}
function Np(e) {
  const t = at(e), n = xo(e), r = e.ownerDocument.body, o = ze(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = ze(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + ko(e);
  const a = -n.scrollTop;
  return Je(r).direction === "rtl" && (i += ze(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const hi = 25;
function Ap(e, t) {
  const n = Be(e), r = at(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const u = da();
    (!u || u && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = ko(r);
  if (l <= 0) {
    const u = r.ownerDocument, d = u.body, f = getComputedStyle(d), p = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, g = Math.abs(r.clientWidth - d.clientWidth - p);
    g <= hi && (s -= g);
  } else l <= hi && (s += l);
  return {
    width: s,
    height: i,
    x: a,
    y: c
  };
}
const Lp = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Ip(e, t) {
  const n = Vt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = st(e) ? dn(e) : ot(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function gi(e, t, n) {
  let r;
  if (t === "viewport")
    r = Ap(e, n);
  else if (t === "document")
    r = Np(at(e));
  else if (Qe(t))
    r = Ip(t, n);
  else {
    const o = jc(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return no(r);
}
function Kc(e, t) {
  const n = Pt(e);
  return n === t || !Qe(n) || bn(n) ? !1 : Je(n).position === "fixed" || Kc(n, t);
}
function Rp(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Gn(e, [], !1).filter((a) => Qe(a) && Tn(a) !== "body"), o = null;
  const s = Je(e).position === "fixed";
  let i = s ? Pt(e) : e;
  for (; Qe(i) && !bn(i); ) {
    const a = Je(i), c = ua(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && Lp.has(o.position) || er(i) && !c && Kc(e, i)) ? r = r.filter((u) => u !== i) : o = a, i = Pt(i);
  }
  return t.set(e, r), r;
}
function Pp(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? wo(t) ? [] : Rp(t, this._c) : [].concat(n), r], a = i[0], c = i.reduce((l, u) => {
    const d = gi(t, u, o);
    return l.top = ze(d.top, l.top), l.right = Rt(d.right, l.right), l.bottom = Rt(d.bottom, l.bottom), l.left = ze(d.left, l.left), l;
  }, gi(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Op(e) {
  const {
    width: t,
    height: n
  } = Yc(e);
  return {
    width: t,
    height: n
  };
}
function _p(e, t, n) {
  const r = st(t), o = at(t), s = n === "fixed", i = Vt(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = ot(0);
  function l() {
    c.x = ko(o);
  }
  if (r || !r && !s)
    if ((Tn(t) !== "body" || er(o)) && (a = xo(t)), r) {
      const p = Vt(t, !0, s, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && l();
  s && !r && o && l();
  const u = o && !r && !s ? Vc(o, a) : ot(0), d = i.left + a.scrollLeft - c.x - u.x, f = i.top + a.scrollTop - c.y - u.y;
  return {
    x: d,
    y: f,
    width: i.width,
    height: i.height
  };
}
function qo(e) {
  return Je(e).position === "static";
}
function yi(e, t) {
  if (!st(e) || Je(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return at(e) === n && (n = n.ownerDocument.body), n;
}
function Gc(e, t) {
  const n = Be(e);
  if (wo(e))
    return n;
  if (!st(e)) {
    let o = Pt(e);
    for (; o && !bn(o); ) {
      if (Qe(o) && !qo(o))
        return o;
      o = Pt(o);
    }
    return n;
  }
  let r = yi(e, t);
  for (; r && vp(r) && qo(r); )
    r = yi(r, t);
  return r && bn(r) && qo(r) && !ua(r) ? n : r || Cp(e) || n;
}
const $p = async function(e) {
  const t = this.getOffsetParent || Gc, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: _p(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Hp(e) {
  return Je(e).direction === "rtl";
}
const Wp = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ep,
  getDocumentElement: at,
  getClippingRect: Pp,
  getOffsetParent: Gc,
  getElementRects: $p,
  getClientRects: Dp,
  getDimensions: Op,
  getScale: dn,
  isElement: Qe,
  isRTL: Hp
};
function qc(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function zp(e, t) {
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
    const g = Ar(d), h = Ar(o.clientWidth - (u + f)), y = Ar(o.clientHeight - (d + p)), b = Ar(u), x = {
      rootMargin: -g + "px " + -h + "px " + -y + "px " + -b + "px",
      threshold: ze(0, Rt(1, c)) || 1
    };
    let S = !0;
    function w(M) {
      const E = M[0].intersectionRatio;
      if (E !== c) {
        if (!S)
          return i();
        E ? i(!1, E) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      E === 1 && !qc(l, e.getBoundingClientRect()) && i(), S = !1;
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
function Bp(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = fa(e), u = o || s ? [...l ? Gn(l) : [], ...Gn(t)] : [];
  u.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), s && b.addEventListener("resize", n);
  });
  const d = l && a ? zp(l, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((b) => {
    let [v] = b;
    v && v.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var x;
      (x = p) == null || x.observe(t);
    })), n();
  }), l && !c && p.observe(l), p.observe(t));
  let g, h = c ? Vt(e) : null;
  c && y();
  function y() {
    const b = Vt(e);
    h && !qc(h, b) && n(), h = b, g = requestAnimationFrame(y);
  }
  return n(), () => {
    var b;
    u.forEach((v) => {
      o && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), d?.(), (b = p) == null || b.disconnect(), p = null, c && cancelAnimationFrame(g);
  };
}
const Fp = fp, Up = mp, Yp = lp, jp = hp, Vp = up, vi = cp, Kp = pp, Gp = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Wp,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return ip(e, t, {
    ...o,
    platform: s
  });
};
var qp = typeof document < "u", Xp = function() {
}, Kr = qp ? mo : Xp;
function ro(e, t) {
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
        if (!ro(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !ro(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Xc(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function bi(e, t) {
  const n = Xc(e);
  return Math.round(t * n) / n;
}
function Xo(e) {
  const t = T.useRef(e);
  return Kr(() => {
    t.current = e;
  }), t;
}
function Zp(e) {
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
  ro(f, r) || p(r);
  const [g, h] = T.useState(null), [y, b] = T.useState(null), v = T.useCallback((R) => {
    R !== M.current && (M.current = R, h(R));
  }, []), x = T.useCallback((R) => {
    R !== E.current && (E.current = R, b(R));
  }, []), S = s || g, w = i || y, M = T.useRef(null), E = T.useRef(null), k = T.useRef(u), N = c != null, C = Xo(c), D = Xo(o), A = Xo(l), P = T.useCallback(() => {
    if (!M.current || !E.current)
      return;
    const R = {
      placement: t,
      strategy: n,
      middleware: f
    };
    D.current && (R.platform = D.current), Gp(M.current, E.current, R).then((L) => {
      const H = {
        ...L,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: A.current !== !1
      };
      O.current && !ro(k.current, H) && (k.current = H, Dc.flushSync(() => {
        d(H);
      }));
    });
  }, [f, t, n, D, A]);
  Kr(() => {
    l === !1 && k.current.isPositioned && (k.current.isPositioned = !1, d((R) => ({
      ...R,
      isPositioned: !1
    })));
  }, [l]);
  const O = T.useRef(!1);
  Kr(() => (O.current = !0, () => {
    O.current = !1;
  }), []), Kr(() => {
    if (S && (M.current = S), w && (E.current = w), S && w) {
      if (C.current)
        return C.current(S, w, P);
      P();
    }
  }, [S, w, P, C, N]);
  const $ = T.useMemo(() => ({
    reference: M,
    floating: E,
    setReference: v,
    setFloating: x
  }), [v, x]), z = T.useMemo(() => ({
    reference: S,
    floating: w
  }), [S, w]), V = T.useMemo(() => {
    const R = {
      position: n,
      left: 0,
      top: 0
    };
    if (!z.floating)
      return R;
    const L = bi(z.floating, u.x), H = bi(z.floating, u.y);
    return a ? {
      ...R,
      transform: "translate(" + L + "px, " + H + "px)",
      ...Xc(z.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: L,
      top: H
    };
  }, [n, a, z.floating, u.x, u.y]);
  return T.useMemo(() => ({
    ...u,
    update: P,
    refs: $,
    elements: z,
    floatingStyles: V
  }), [u, P, $, z, V]);
}
const Qp = (e) => {
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
      return r && t(r) ? r.current != null ? vi({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? vi({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Jp = (e, t) => ({
  ...Fp(e),
  options: [e, t]
}), eh = (e, t) => ({
  ...Up(e),
  options: [e, t]
}), th = (e, t) => ({
  ...Kp(e),
  options: [e, t]
}), nh = (e, t) => ({
  ...Yp(e),
  options: [e, t]
}), rh = (e, t) => ({
  ...jp(e),
  options: [e, t]
}), oh = (e, t) => ({
  ...Vp(e),
  options: [e, t]
}), sh = (e, t) => ({
  ...Qp(e),
  options: [e, t]
});
var ah = "Arrow", Zc = T.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ m(
    Ae.svg,
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
Zc.displayName = ah;
var ih = Zc;
function ch(e) {
  const [t, n] = T.useState(void 0);
  return It(() => {
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
var ma = "Popper", [Qc, Co] = Cn(ma), [lh, Jc] = Qc(ma), el = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = T.useState(null);
  return /* @__PURE__ */ m(lh, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
el.displayName = ma;
var tl = "PopperAnchor", nl = T.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = Jc(tl, n), i = T.useRef(null), a = Ie(t, i), c = T.useRef(null);
    return T.useEffect(() => {
      const l = c.current;
      c.current = r?.current || i.current, l !== c.current && s.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ m(Ae.div, { ...o, ref: a });
  }
);
nl.displayName = tl;
var pa = "PopperContent", [uh, dh] = Qc(pa), rl = T.forwardRef(
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
      onPlaced: g,
      ...h
    } = e, y = Jc(pa, n), [b, v] = T.useState(null), x = Ie(t, (_) => v(_)), [S, w] = T.useState(null), M = ch(S), E = M?.width ?? 0, k = M?.height ?? 0, N = r + (s !== "center" ? "-" + s : ""), C = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, D = Array.isArray(l) ? l : [l], A = D.length > 0, P = {
      padding: C,
      boundary: D.filter(mh),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: A
    }, { refs: O, floatingStyles: $, placement: z, isPositioned: V, middlewareData: R } = Zp({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: N,
      whileElementsMounted: (..._) => Bp(..._, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        Jp({ mainAxis: o + k, alignmentAxis: i }),
        c && eh({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? th() : void 0,
          ...P
        }),
        c && nh({ ...P }),
        rh({
          ...P,
          apply: ({ elements: _, rects: ee, availableWidth: ne, availableHeight: de }) => {
            const { width: we, height: be } = ee.reference, Oe = _.floating.style;
            Oe.setProperty("--radix-popper-available-width", `${ne}px`), Oe.setProperty("--radix-popper-available-height", `${de}px`), Oe.setProperty("--radix-popper-anchor-width", `${we}px`), Oe.setProperty("--radix-popper-anchor-height", `${be}px`);
          }
        }),
        S && sh({ element: S, padding: a }),
        ph({ arrowWidth: E, arrowHeight: k }),
        f && oh({ strategy: "referenceHidden", ...P })
      ]
    }), [L, H] = al(z), q = ht(g);
    It(() => {
      V && q?.();
    }, [V, q]);
    const F = R.arrow?.x, Y = R.arrow?.y, G = R.arrow?.centerOffset !== 0, [W, J] = T.useState();
    return It(() => {
      b && J(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ m(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...$,
          transform: V ? $.transform : "translate(0, -200%)",
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
          uh,
          {
            scope: n,
            placedSide: L,
            onArrowChange: w,
            arrowX: F,
            arrowY: Y,
            shouldHideArrow: G,
            children: /* @__PURE__ */ m(
              Ae.div,
              {
                "data-side": L,
                "data-align": H,
                ...h,
                ref: x,
                style: {
                  ...h.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: V ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
rl.displayName = pa;
var ol = "PopperArrow", fh = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, sl = T.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = dh(ol, r), i = fh[s.placedSide];
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
          ih,
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
sl.displayName = ol;
function mh(e) {
  return e !== null;
}
var ph = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, a = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [l, u] = al(n), d = { start: "0%", center: "50%", end: "100%" }[u], f = (o.arrow?.x ?? 0) + a / 2, p = (o.arrow?.y ?? 0) + c / 2;
    let g = "", h = "";
    return l === "bottom" ? (g = i ? d : `${f}px`, h = `${-c}px`) : l === "top" ? (g = i ? d : `${f}px`, h = `${r.floating.height + c}px`) : l === "right" ? (g = `${-c}px`, h = i ? d : `${p}px`) : l === "left" && (g = `${r.floating.width + c}px`, h = i ? d : `${p}px`), { data: { x: g, y: h } };
  }
});
function al(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var il = el, cl = nl, ll = rl, ul = sl, hh = "Portal", ha = T.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = T.useState(!1);
  It(() => s(!0), []);
  const i = n || o && globalThis?.document?.body;
  return i ? zf.createPortal(/* @__PURE__ */ m(Ae.div, { ...r, ref: t }), i) : null;
});
ha.displayName = hh;
function gh(e, t) {
  return T.useReducer((n, r) => t[n][r] ?? n, e);
}
var qt = (e) => {
  const { present: t, children: n } = e, r = yh(t), o = typeof n == "function" ? n({ present: r.isPresent }) : T.Children.only(n), s = Ie(r.ref, vh(o));
  return typeof n == "function" || r.isPresent ? T.cloneElement(o, { ref: s }) : null;
};
qt.displayName = "Presence";
function yh(e) {
  const [t, n] = T.useState(), r = T.useRef(null), o = T.useRef(e), s = T.useRef("none"), i = e ? "mounted" : "unmounted", [a, c] = gh(i, {
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
    const l = Lr(r.current);
    s.current = a === "mounted" ? l : "none";
  }, [a]), It(() => {
    const l = r.current, u = o.current;
    if (u !== e) {
      const f = s.current, p = Lr(l);
      e ? c("MOUNT") : p === "none" || l?.display === "none" ? c("UNMOUNT") : c(u && f !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), It(() => {
    if (t) {
      let l;
      const u = t.ownerDocument.defaultView ?? window, d = (p) => {
        const h = Lr(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && h && (c("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (p) => {
        p.target === t && (s.current = Lr(r.current));
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
function Lr(e) {
  return e?.animationName || "none";
}
function vh(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Zo = "rovingFocusGroup.onEntryFocus", bh = { bubbles: !1, cancelable: !0 }, tr = "RovingFocusGroup", [ks, dl, wh] = Pc(tr), [xh, fl] = Cn(
  tr,
  [wh]
), [kh, Ch] = xh(tr), ml = T.forwardRef(
  (e, t) => /* @__PURE__ */ m(ks.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(ks.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(Mh, { ...e, ref: t }) }) })
);
ml.displayName = tr;
var Mh = T.forwardRef((e, t) => {
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
  } = e, f = T.useRef(null), p = Ie(t, f), g = Oc(s), [h, y] = sa({
    prop: i,
    defaultProp: a ?? null,
    onChange: c,
    caller: tr
  }), [b, v] = T.useState(!1), x = ht(l), S = dl(n), w = T.useRef(!1), [M, E] = T.useState(0);
  return T.useEffect(() => {
    const k = f.current;
    if (k)
      return k.addEventListener(Zo, x), () => k.removeEventListener(Zo, x);
  }, [x]), /* @__PURE__ */ m(
    kh,
    {
      scope: n,
      orientation: r,
      dir: g,
      loop: o,
      currentTabStopId: h,
      onItemFocus: T.useCallback(
        (k) => y(k),
        [y]
      ),
      onItemShiftTab: T.useCallback(() => v(!0), []),
      onFocusableItemAdd: T.useCallback(
        () => E((k) => k + 1),
        []
      ),
      onFocusableItemRemove: T.useCallback(
        () => E((k) => k - 1),
        []
      ),
      children: /* @__PURE__ */ m(
        Ae.div,
        {
          tabIndex: b || M === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: ie(e.onMouseDown, () => {
            w.current = !0;
          }),
          onFocus: ie(e.onFocus, (k) => {
            const N = !w.current;
            if (k.target === k.currentTarget && N && !b) {
              const C = new CustomEvent(Zo, bh);
              if (k.currentTarget.dispatchEvent(C), !C.defaultPrevented) {
                const D = S().filter((z) => z.focusable), A = D.find((z) => z.active), P = D.find((z) => z.id === h), $ = [A, P, ...D].filter(
                  Boolean
                ).map((z) => z.ref.current);
                gl($, u);
              }
            }
            w.current = !1;
          }),
          onBlur: ie(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), pl = "RovingFocusGroupItem", hl = T.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, c = Jr(), l = s || c, u = Ch(pl, n), d = u.currentTabStopId === l, f = dl(n), { onFocusableItemAdd: p, onFocusableItemRemove: g, currentTabStopId: h } = u;
    return T.useEffect(() => {
      if (r)
        return p(), () => g();
    }, [r, p, g]), /* @__PURE__ */ m(
      ks.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ m(
          Ae.span,
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
              const b = Eh(y, u.orientation, u.dir);
              if (b !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let x = f().filter((S) => S.focusable).map((S) => S.ref.current);
                if (b === "last") x.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && x.reverse();
                  const S = x.indexOf(y.currentTarget);
                  x = u.loop ? Dh(x, S + 1) : x.slice(S + 1);
                }
                setTimeout(() => gl(x));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: d, hasTabStop: h != null }) : i
          }
        )
      }
    );
  }
);
hl.displayName = pl;
var Th = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Sh(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Eh(e, t, n) {
  const r = Sh(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Th[r];
}
function gl(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Dh(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Nh = ml, Ah = hl, Lh = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, tn = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap(), Rr = {}, Qo = 0, yl = function(e) {
  return e && (e.host || yl(e.parentNode));
}, Ih = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = yl(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Rh = function(e, t, n, r) {
  var o = Ih(t, Array.isArray(e) ? e : [e]);
  Rr[n] || (Rr[n] = /* @__PURE__ */ new WeakMap());
  var s = Rr[n], i = [], a = /* @__PURE__ */ new Set(), c = new Set(o), l = function(d) {
    !d || a.has(d) || (a.add(d), l(d.parentNode));
  };
  o.forEach(l);
  var u = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (a.has(f))
        u(f);
      else
        try {
          var p = f.getAttribute(r), g = p !== null && p !== "false", h = (tn.get(f) || 0) + 1, y = (s.get(f) || 0) + 1;
          tn.set(f, h), s.set(f, y), i.push(f), h === 1 && g && Ir.set(f, !0), y === 1 && f.setAttribute(n, "true"), g || f.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", f, b);
        }
    });
  };
  return u(t), a.clear(), Qo++, function() {
    i.forEach(function(d) {
      var f = tn.get(d) - 1, p = s.get(d) - 1;
      tn.set(d, f), s.set(d, p), f || (Ir.has(d) || d.removeAttribute(r), Ir.delete(d)), p || d.removeAttribute(n);
    }), Qo--, Qo || (tn = /* @__PURE__ */ new WeakMap(), tn = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap(), Rr = {});
  };
}, Ph = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Lh(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Rh(r, o, n, "aria-hidden")) : function() {
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
function vl(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Oh(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Gr = "right-scroll-bar-position", qr = "width-before-scroll-bar", _h = "with-scroll-bars-hidden", $h = "--removed-body-scroll-bar-size";
function Jo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Hh(e, t) {
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
var Wh = typeof window < "u" ? T.useLayoutEffect : T.useEffect, wi = /* @__PURE__ */ new WeakMap();
function zh(e, t) {
  var n = Hh(null, function(r) {
    return e.forEach(function(o) {
      return Jo(o, r);
    });
  });
  return Wh(function() {
    var r = wi.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || Jo(a, null);
      }), s.forEach(function(a) {
        o.has(a) || Jo(a, i);
      });
    }
    wi.set(n, e);
  }, [e]), n;
}
function Bh(e) {
  return e;
}
function Fh(e, t) {
  t === void 0 && (t = Bh);
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
function Uh(e) {
  e === void 0 && (e = {});
  var t = Fh(null);
  return t.options = tt({ async: !0, ssr: !1 }, e), t;
}
var bl = function(e) {
  var t = e.sideCar, n = vl(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return T.createElement(r, tt({}, n));
};
bl.isSideCarExport = !0;
function Yh(e, t) {
  return e.useMedium(t), bl;
}
var wl = Uh(), es = function() {
}, Mo = T.forwardRef(function(e, t) {
  var n = T.useRef(null), r = T.useState({
    onScrollCapture: es,
    onWheelCapture: es,
    onTouchMoveCapture: es
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, p = e.noRelative, g = e.noIsolation, h = e.inert, y = e.allowPinchZoom, b = e.as, v = b === void 0 ? "div" : b, x = e.gapMode, S = vl(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), w = f, M = zh([n, t]), E = tt(tt({}, S), o);
  return T.createElement(
    T.Fragment,
    null,
    u && T.createElement(w, { sideCar: wl, removeScrollBar: l, shards: d, noRelative: p, noIsolation: g, inert: h, setCallbacks: s, allowPinchZoom: !!y, lockRef: n, gapMode: x }),
    i ? T.cloneElement(T.Children.only(a), tt(tt({}, E), { ref: M })) : T.createElement(v, tt({}, E, { className: c, ref: M }), a)
  );
});
Mo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Mo.classNames = {
  fullWidth: qr,
  zeroRight: Gr
};
var jh = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Vh() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = jh();
  return t && e.setAttribute("nonce", t), e;
}
function Kh(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Gh(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var qh = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Vh()) && (Kh(t, n), Gh(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Xh = function() {
  var e = qh();
  return function(t, n) {
    T.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, xl = function() {
  var e = Xh(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Zh = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ts = function(e) {
  return parseInt(e || "", 10) || 0;
}, Qh = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [ts(n), ts(r), ts(o)];
}, Jh = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Zh;
  var t = Qh(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, eg = xl(), fn = "data-scroll-locked", tg = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(_h, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(fn, `] {
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
  
  .`).concat(Gr, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(qr, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Gr, " .").concat(Gr, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(qr, " .").concat(qr, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(fn, `] {
    `).concat($h, ": ").concat(a, `px;
  }
`);
}, xi = function() {
  var e = parseInt(document.body.getAttribute(fn) || "0", 10);
  return isFinite(e) ? e : 0;
}, ng = function() {
  T.useEffect(function() {
    return document.body.setAttribute(fn, (xi() + 1).toString()), function() {
      var e = xi() - 1;
      e <= 0 ? document.body.removeAttribute(fn) : document.body.setAttribute(fn, e.toString());
    };
  }, []);
}, rg = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  ng();
  var s = T.useMemo(function() {
    return Jh(o);
  }, [o]);
  return T.createElement(eg, { styles: tg(s, !t, o, n ? "" : "!important") });
}, Cs = !1;
if (typeof window < "u")
  try {
    var Pr = Object.defineProperty({}, "passive", {
      get: function() {
        return Cs = !0, !0;
      }
    });
    window.addEventListener("test", Pr, Pr), window.removeEventListener("test", Pr, Pr);
  } catch {
    Cs = !1;
  }
var nn = Cs ? { passive: !1 } : !1, og = function(e) {
  return e.tagName === "TEXTAREA";
}, kl = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !og(e) && n[t] === "visible")
  );
}, sg = function(e) {
  return kl(e, "overflowY");
}, ag = function(e) {
  return kl(e, "overflowX");
}, ki = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Cl(e, r);
    if (o) {
      var s = Ml(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, ig = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, cg = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Cl = function(e, t) {
  return e === "v" ? sg(t) : ag(t);
}, Ml = function(e, t) {
  return e === "v" ? ig(t) : cg(t);
}, lg = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, ug = function(e, t, n, r, o) {
  var s = lg(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, c = t.contains(a), l = !1, u = i > 0, d = 0, f = 0;
  do {
    if (!a)
      break;
    var p = Ml(e, a), g = p[0], h = p[1], y = p[2], b = h - y - s * g;
    (g || b) && Cl(e, a) && (d += b, f += g);
    var v = a.parentNode;
    a = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !c && a !== document.body || // self content
    c && (t.contains(a) || t === a)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(f) < 1) && (l = !0), l;
}, Or = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Ci = function(e) {
  return [e.deltaX, e.deltaY];
}, Mi = function(e) {
  return e && "current" in e ? e.current : e;
}, dg = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, fg = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, mg = 0, rn = [];
function pg(e) {
  var t = T.useRef([]), n = T.useRef([0, 0]), r = T.useRef(), o = T.useState(mg++)[0], s = T.useState(xl)[0], i = T.useRef(e);
  T.useEffect(function() {
    i.current = e;
  }, [e]), T.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var h = Oh([e.lockRef.current], (e.shards || []).map(Mi), !0).filter(Boolean);
      return h.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), h.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = T.useCallback(function(h, y) {
    if ("touches" in h && h.touches.length === 2 || h.type === "wheel" && h.ctrlKey)
      return !i.current.allowPinchZoom;
    var b = Or(h), v = n.current, x = "deltaX" in h ? h.deltaX : v[0] - b[0], S = "deltaY" in h ? h.deltaY : v[1] - b[1], w, M = h.target, E = Math.abs(x) > Math.abs(S) ? "h" : "v";
    if ("touches" in h && E === "h" && M.type === "range")
      return !1;
    var k = ki(E, M);
    if (!k)
      return !0;
    if (k ? w = E : (w = E === "v" ? "h" : "v", k = ki(E, M)), !k)
      return !1;
    if (!r.current && "changedTouches" in h && (x || S) && (r.current = w), !w)
      return !0;
    var N = r.current || w;
    return ug(N, y, h, N === "h" ? x : S);
  }, []), c = T.useCallback(function(h) {
    var y = h;
    if (!(!rn.length || rn[rn.length - 1] !== s)) {
      var b = "deltaY" in y ? Ci(y) : Or(y), v = t.current.filter(function(w) {
        return w.name === y.type && (w.target === y.target || y.target === w.shadowParent) && dg(w.delta, b);
      })[0];
      if (v && v.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!v) {
        var x = (i.current.shards || []).map(Mi).filter(Boolean).filter(function(w) {
          return w.contains(y.target);
        }), S = x.length > 0 ? a(y, x[0]) : !i.current.noIsolation;
        S && y.cancelable && y.preventDefault();
      }
    }
  }, []), l = T.useCallback(function(h, y, b, v) {
    var x = { name: h, delta: y, target: b, should: v, shadowParent: hg(b) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== x;
      });
    }, 1);
  }, []), u = T.useCallback(function(h) {
    n.current = Or(h), r.current = void 0;
  }, []), d = T.useCallback(function(h) {
    l(h.type, Ci(h), h.target, a(h, e.lockRef.current));
  }, []), f = T.useCallback(function(h) {
    l(h.type, Or(h), h.target, a(h, e.lockRef.current));
  }, []);
  T.useEffect(function() {
    return rn.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, nn), document.addEventListener("touchmove", c, nn), document.addEventListener("touchstart", u, nn), function() {
      rn = rn.filter(function(h) {
        return h !== s;
      }), document.removeEventListener("wheel", c, nn), document.removeEventListener("touchmove", c, nn), document.removeEventListener("touchstart", u, nn);
    };
  }, []);
  var p = e.removeScrollBar, g = e.inert;
  return T.createElement(
    T.Fragment,
    null,
    g ? T.createElement(s, { styles: fg(o) }) : null,
    p ? T.createElement(rg, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function hg(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const gg = Yh(wl, pg);
var Tl = T.forwardRef(function(e, t) {
  return T.createElement(Mo, tt({}, e, { ref: t, sideCar: gg }));
});
Tl.classNames = Mo.classNames;
var Ms = ["Enter", " "], yg = ["ArrowDown", "PageUp", "Home"], Sl = ["ArrowUp", "PageDown", "End"], vg = [...yg, ...Sl], bg = {
  ltr: [...Ms, "ArrowRight"],
  rtl: [...Ms, "ArrowLeft"]
}, wg = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, nr = "Menu", [qn, xg, kg] = Pc(nr), [Xt, El] = Cn(nr, [
  kg,
  Co,
  fl
]), To = Co(), Dl = fl(), [Cg, Zt] = Xt(nr), [Mg, rr] = Xt(nr), Nl = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: i = !0 } = e, a = To(t), [c, l] = T.useState(null), u = T.useRef(!1), d = ht(s), f = Oc(o);
  return T.useEffect(() => {
    const p = () => {
      u.current = !0, document.addEventListener("pointerdown", g, { capture: !0, once: !0 }), document.addEventListener("pointermove", g, { capture: !0, once: !0 });
    }, g = () => u.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", g, { capture: !0 }), document.removeEventListener("pointermove", g, { capture: !0 });
    };
  }, []), /* @__PURE__ */ m(il, { ...a, children: /* @__PURE__ */ m(
    Cg,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: c,
      onContentChange: l,
      children: /* @__PURE__ */ m(
        Mg,
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
Nl.displayName = nr;
var Tg = "MenuAnchor", ga = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = To(n);
    return /* @__PURE__ */ m(cl, { ...o, ...r, ref: t });
  }
);
ga.displayName = Tg;
var ya = "MenuPortal", [Sg, Al] = Xt(ya, {
  forceMount: void 0
}), Ll = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, s = Zt(ya, t);
  return /* @__PURE__ */ m(Sg, { scope: t, forceMount: n, children: /* @__PURE__ */ m(qt, { present: n || s.open, children: /* @__PURE__ */ m(ha, { asChild: !0, container: o, children: r }) }) });
};
Ll.displayName = ya;
var Ke = "MenuContent", [Eg, va] = Xt(Ke), Il = T.forwardRef(
  (e, t) => {
    const n = Al(Ke, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Zt(Ke, e.__scopeMenu), i = rr(Ke, e.__scopeMenu);
    return /* @__PURE__ */ m(qn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(qt, { present: r || s.open, children: /* @__PURE__ */ m(qn.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ m(Dg, { ...o, ref: t }) : /* @__PURE__ */ m(Ng, { ...o, ref: t }) }) }) });
  }
), Dg = T.forwardRef(
  (e, t) => {
    const n = Zt(Ke, e.__scopeMenu), r = T.useRef(null), o = Ie(t, r);
    return T.useEffect(() => {
      const s = r.current;
      if (s) return Ph(s);
    }, []), /* @__PURE__ */ m(
      ba,
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
), Ng = T.forwardRef((e, t) => {
  const n = Zt(Ke, e.__scopeMenu);
  return /* @__PURE__ */ m(
    ba,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), Ag = /* @__PURE__ */ Vn("MenuContent.ScrollLock"), ba = T.forwardRef(
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
      disableOutsideScroll: g,
      ...h
    } = e, y = Zt(Ke, n), b = rr(Ke, n), v = To(n), x = Dl(n), S = xg(n), [w, M] = T.useState(null), E = T.useRef(null), k = Ie(t, E, y.onContentChange), N = T.useRef(0), C = T.useRef(""), D = T.useRef(0), A = T.useRef(null), P = T.useRef("right"), O = T.useRef(0), $ = g ? Tl : T.Fragment, z = g ? { as: Ag, allowPinchZoom: !0 } : void 0, V = (L) => {
      const H = C.current + L, q = S().filter((_) => !_.disabled), F = document.activeElement, Y = q.find((_) => _.ref.current === F)?.textValue, G = q.map((_) => _.textValue), W = Fg(G, H, Y), J = q.find((_) => _.textValue === W)?.ref.current;
      (function _(ee) {
        C.current = ee, window.clearTimeout(N.current), ee !== "" && (N.current = window.setTimeout(() => _(""), 1e3));
      })(H), J && setTimeout(() => J.focus());
    };
    T.useEffect(() => () => window.clearTimeout(N.current), []), zm();
    const R = T.useCallback((L) => P.current === A.current?.side && Yg(L, A.current?.area), []);
    return /* @__PURE__ */ m(
      Eg,
      {
        scope: n,
        searchRef: C,
        onItemEnter: T.useCallback(
          (L) => {
            R(L) && L.preventDefault();
          },
          [R]
        ),
        onItemLeave: T.useCallback(
          (L) => {
            R(L) || (E.current?.focus(), M(null));
          },
          [R]
        ),
        onTriggerLeave: T.useCallback(
          (L) => {
            R(L) && L.preventDefault();
          },
          [R]
        ),
        pointerGraceTimerRef: D,
        onPointerGraceIntentChange: T.useCallback((L) => {
          A.current = L;
        }, []),
        children: /* @__PURE__ */ m($, { ...z, children: /* @__PURE__ */ m(
          Hc,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: ie(s, (L) => {
              L.preventDefault(), E.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ m(
              aa,
              {
                asChild: !0,
                disableOutsidePointerEvents: a,
                onEscapeKeyDown: l,
                onPointerDownOutside: u,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: p,
                children: /* @__PURE__ */ m(
                  Nh,
                  {
                    asChild: !0,
                    ...x,
                    dir: b.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: w,
                    onCurrentTabStopIdChange: M,
                    onEntryFocus: ie(c, (L) => {
                      b.isUsingKeyboardRef.current || L.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ m(
                      ll,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Gl(y.open),
                        "data-radix-menu-content": "",
                        dir: b.dir,
                        ...v,
                        ...h,
                        ref: k,
                        style: { outline: "none", ...h.style },
                        onKeyDown: ie(h.onKeyDown, (L) => {
                          const q = L.target.closest("[data-radix-menu-content]") === L.currentTarget, F = L.ctrlKey || L.altKey || L.metaKey, Y = L.key.length === 1;
                          q && (L.key === "Tab" && L.preventDefault(), !F && Y && V(L.key));
                          const G = E.current;
                          if (L.target !== G || !vg.includes(L.key)) return;
                          L.preventDefault();
                          const J = S().filter((_) => !_.disabled).map((_) => _.ref.current);
                          Sl.includes(L.key) && J.reverse(), zg(J);
                        }),
                        onBlur: ie(e.onBlur, (L) => {
                          L.currentTarget.contains(L.target) || (window.clearTimeout(N.current), C.current = "");
                        }),
                        onPointerMove: ie(
                          e.onPointerMove,
                          Xn((L) => {
                            const H = L.target, q = O.current !== L.clientX;
                            if (L.currentTarget.contains(H) && q) {
                              const F = L.clientX > O.current ? "right" : "left";
                              P.current = F, O.current = L.clientX;
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
Il.displayName = Ke;
var Lg = "MenuGroup", wa = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(Ae.div, { role: "group", ...r, ref: t });
  }
);
wa.displayName = Lg;
var Ig = "MenuLabel", Rl = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(Ae.div, { ...r, ref: t });
  }
);
Rl.displayName = Ig;
var oo = "MenuItem", Ti = "menu.itemSelect", So = T.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, s = T.useRef(null), i = rr(oo, e.__scopeMenu), a = va(oo, e.__scopeMenu), c = Ie(t, s), l = T.useRef(!1), u = () => {
      const d = s.current;
      if (!n && d) {
        const f = new CustomEvent(Ti, { bubbles: !0, cancelable: !0 });
        d.addEventListener(Ti, (p) => r?.(p), { once: !0 }), Rc(d, f), f.defaultPrevented ? l.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ m(
      Pl,
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
          n || f && d.key === " " || Ms.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
So.displayName = oo;
var Pl = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e, i = va(oo, n), a = Dl(n), c = T.useRef(null), l = Ie(t, c), [u, d] = T.useState(!1), [f, p] = T.useState("");
    return T.useEffect(() => {
      const g = c.current;
      g && p((g.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ m(
      qn.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? f,
        children: /* @__PURE__ */ m(Ah, { asChild: !0, ...a, focusable: !r, children: /* @__PURE__ */ m(
          Ae.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: l,
            onPointerMove: ie(
              e.onPointerMove,
              Xn((g) => {
                r ? i.onItemLeave(g) : (i.onItemEnter(g), g.defaultPrevented || g.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: ie(
              e.onPointerLeave,
              Xn((g) => i.onItemLeave(g))
            ),
            onFocus: ie(e.onFocus, () => d(!0)),
            onBlur: ie(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), Rg = "MenuCheckboxItem", Ol = T.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ m(zl, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ m(
      So,
      {
        role: "menuitemcheckbox",
        "aria-checked": so(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": ka(n),
        onSelect: ie(
          o.onSelect,
          () => r?.(so(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Ol.displayName = Rg;
var _l = "MenuRadioGroup", [Pg, Og] = Xt(
  _l,
  { value: void 0, onValueChange: () => {
  } }
), $l = T.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, s = ht(r);
    return /* @__PURE__ */ m(Pg, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ m(wa, { ...o, ref: t }) });
  }
);
$l.displayName = _l;
var Hl = "MenuRadioItem", Wl = T.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = Og(Hl, e.__scopeMenu), s = n === o.value;
    return /* @__PURE__ */ m(zl, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ m(
      So,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": ka(s),
        onSelect: ie(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Wl.displayName = Hl;
var xa = "MenuItemIndicator", [zl, _g] = Xt(
  xa,
  { checked: !1 }
), Bl = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, s = _g(xa, n);
    return /* @__PURE__ */ m(
      qt,
      {
        present: r || so(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ m(
          Ae.span,
          {
            ...o,
            ref: t,
            "data-state": ka(s.checked)
          }
        )
      }
    );
  }
);
Bl.displayName = xa;
var $g = "MenuSeparator", Fl = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(
      Ae.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Fl.displayName = $g;
var Hg = "MenuArrow", Ul = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = To(n);
    return /* @__PURE__ */ m(ul, { ...o, ...r, ref: t });
  }
);
Ul.displayName = Hg;
var Wg = "MenuSub", [U1, Yl] = Xt(Wg), Hn = "MenuSubTrigger", jl = T.forwardRef(
  (e, t) => {
    const n = Zt(Hn, e.__scopeMenu), r = rr(Hn, e.__scopeMenu), o = Yl(Hn, e.__scopeMenu), s = va(Hn, e.__scopeMenu), i = T.useRef(null), { pointerGraceTimerRef: a, onPointerGraceIntentChange: c } = s, l = { __scopeMenu: e.__scopeMenu }, u = T.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return T.useEffect(() => u, [u]), T.useEffect(() => {
      const d = a.current;
      return () => {
        window.clearTimeout(d), c(null);
      };
    }, [a, c]), /* @__PURE__ */ m(ga, { asChild: !0, ...l, children: /* @__PURE__ */ m(
      Pl,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Gl(n.open),
        ...e,
        ref: vo(t, o.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: ie(
          e.onPointerMove,
          Xn((d) => {
            s.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !i.current && (s.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), u();
            }, 100));
          })
        ),
        onPointerLeave: ie(
          e.onPointerLeave,
          Xn((d) => {
            u();
            const f = n.content?.getBoundingClientRect();
            if (f) {
              const p = n.content?.dataset.side, g = p === "right", h = g ? -5 : 5, y = f[g ? "left" : "right"], b = f[g ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + h, y: d.clientY },
                  { x: y, y: f.top },
                  { x: b, y: f.top },
                  { x: b, y: f.bottom },
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
          e.disabled || f && d.key === " " || bg[r.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
jl.displayName = Hn;
var Vl = "MenuSubContent", Kl = T.forwardRef(
  (e, t) => {
    const n = Al(Ke, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, s = Zt(Ke, e.__scopeMenu), i = rr(Ke, e.__scopeMenu), a = Yl(Vl, e.__scopeMenu), c = T.useRef(null), l = Ie(t, c);
    return /* @__PURE__ */ m(qn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(qt, { present: r || s.open, children: /* @__PURE__ */ m(qn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(
      ba,
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
          const d = u.currentTarget.contains(u.target), f = wg[i.dir].includes(u.key);
          d && f && (s.onOpenChange(!1), a.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
Kl.displayName = Vl;
function Gl(e) {
  return e ? "open" : "closed";
}
function so(e) {
  return e === "indeterminate";
}
function ka(e) {
  return so(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function zg(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Bg(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function Fg(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let i = Bg(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((l) => l !== n));
  const c = i.find(
    (l) => l.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function Ug(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, u = a.y, d = c.x, f = c.y;
    u > r != f > r && n < (d - l) * (r - u) / (f - u) + l && (o = !o);
  }
  return o;
}
function Yg(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Ug(n, t);
}
function Xn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var jg = Nl, Vg = ga, Kg = Ll, Gg = Il, qg = wa, Xg = Rl, Zg = So, Qg = Ol, Jg = $l, ey = Wl, ty = Bl, ny = Fl, ry = Ul, oy = jl, sy = Kl, Eo = "DropdownMenu", [ay] = Cn(
  Eo,
  [El]
), Pe = El(), [iy, ql] = ay(Eo), Xl = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: s,
    onOpenChange: i,
    modal: a = !0
  } = e, c = Pe(t), l = T.useRef(null), [u, d] = sa({
    prop: o,
    defaultProp: s ?? !1,
    onChange: i,
    caller: Eo
  });
  return /* @__PURE__ */ m(
    iy,
    {
      scope: t,
      triggerId: Jr(),
      triggerRef: l,
      contentId: Jr(),
      open: u,
      onOpenChange: d,
      onOpenToggle: T.useCallback(() => d((f) => !f), [d]),
      modal: a,
      children: /* @__PURE__ */ m(jg, { ...c, open: u, onOpenChange: d, dir: r, modal: a, children: n })
    }
  );
};
Xl.displayName = Eo;
var Zl = "DropdownMenuTrigger", Ql = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, s = ql(Zl, n), i = Pe(n);
    return /* @__PURE__ */ m(Vg, { asChild: !0, ...i, children: /* @__PURE__ */ m(
      Ae.button,
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
        ref: vo(t, s.triggerRef),
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
Ql.displayName = Zl;
var cy = "DropdownMenuPortal", Jl = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Pe(t);
  return /* @__PURE__ */ m(Kg, { ...r, ...n });
};
Jl.displayName = cy;
var eu = "DropdownMenuContent", tu = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = ql(eu, n), s = Pe(n), i = T.useRef(!1);
    return /* @__PURE__ */ m(
      Gg,
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
tu.displayName = eu;
var ly = "DropdownMenuGroup", uy = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ m(qg, { ...o, ...r, ref: t });
  }
);
uy.displayName = ly;
var dy = "DropdownMenuLabel", fy = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ m(Xg, { ...o, ...r, ref: t });
  }
);
fy.displayName = dy;
var my = "DropdownMenuItem", nu = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ m(Zg, { ...o, ...r, ref: t });
  }
);
nu.displayName = my;
var py = "DropdownMenuCheckboxItem", hy = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(Qg, { ...o, ...r, ref: t });
});
hy.displayName = py;
var gy = "DropdownMenuRadioGroup", yy = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(Jg, { ...o, ...r, ref: t });
});
yy.displayName = gy;
var vy = "DropdownMenuRadioItem", by = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(ey, { ...o, ...r, ref: t });
});
by.displayName = vy;
var wy = "DropdownMenuItemIndicator", xy = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(ty, { ...o, ...r, ref: t });
});
xy.displayName = wy;
var ky = "DropdownMenuSeparator", ru = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(ny, { ...o, ...r, ref: t });
});
ru.displayName = ky;
var Cy = "DropdownMenuArrow", My = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
    return /* @__PURE__ */ m(ry, { ...o, ...r, ref: t });
  }
);
My.displayName = Cy;
var Ty = "DropdownMenuSubTrigger", Sy = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(oy, { ...o, ...r, ref: t });
});
Sy.displayName = Ty;
var Ey = "DropdownMenuSubContent", Dy = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Pe(n);
  return /* @__PURE__ */ m(
    sy,
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
Dy.displayName = Ey;
var Ny = Xl, Ay = Ql, Ly = Jl, Iy = tu, Ry = nu, Py = ru;
function ou(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = ou(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function su() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = ou(e)) && (r && (r += " "), r += t);
  return r;
}
const Ca = "-", Oy = (e) => {
  const t = $y(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(Ca);
      return a[0] === "" && a.length !== 1 && a.shift(), au(a, t) || _y(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const c = n[i] || [];
      return a && r[i] ? [...c, ...r[i]] : c;
    }
  };
}, au = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? au(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(Ca);
  return t.validators.find(({
    validator: i
  }) => i(s))?.classGroupId;
}, Si = /^\[(.+)\]$/, _y = (e) => {
  if (Si.test(e)) {
    const t = Si.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, $y = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    Ts(n[o], r, o, t);
  return r;
}, Ts = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : Ei(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Hy(o)) {
        Ts(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      Ts(i, Ei(t, s), n, r);
    });
  });
}, Ei = (e, t) => {
  let n = e;
  return t.split(Ca).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Hy = (e) => e.isThemeGetter, Wy = (e) => {
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
}, Ss = "!", Es = ":", zy = Es.length, By = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const s = [];
    let i = 0, a = 0, c = 0, l;
    for (let g = 0; g < o.length; g++) {
      let h = o[g];
      if (i === 0 && a === 0) {
        if (h === Es) {
          s.push(o.slice(c, g)), c = g + zy;
          continue;
        }
        if (h === "/") {
          l = g;
          continue;
        }
      }
      h === "[" ? i++ : h === "]" ? i-- : h === "(" ? a++ : h === ")" && a--;
    }
    const u = s.length === 0 ? o : o.substring(c), d = Fy(u), f = d !== u, p = l && l > c ? l - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: d,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + Es, s = r;
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
}, Fy = (e) => e.endsWith(Ss) ? e.substring(0, e.length - 1) : e.startsWith(Ss) ? e.substring(1) : e, Uy = (e) => {
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
}, Yy = (e) => ({
  cache: Wy(e.cacheSize),
  parseClassName: By(e),
  sortModifiers: Uy(e),
  ...Oy(e)
}), jy = /\s+/, Vy = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(jy);
  let c = "";
  for (let l = a.length - 1; l >= 0; l -= 1) {
    const u = a[l], {
      isExternal: d,
      modifiers: f,
      hasImportantModifier: p,
      baseClassName: g,
      maybePostfixModifierPosition: h
    } = n(u);
    if (d) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let y = !!h, b = r(y ? g.substring(0, h) : g);
    if (!b) {
      if (!y) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (b = r(g), !b) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      y = !1;
    }
    const v = s(f).join(":"), x = p ? v + Ss : v, S = x + b;
    if (i.includes(S))
      continue;
    i.push(S);
    const w = o(b, y);
    for (let M = 0; M < w.length; ++M) {
      const E = w[M];
      i.push(x + E);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Ky() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = iu(t)) && (r && (r += " "), r += n);
  return r;
}
const iu = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = iu(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Gy(e, ...t) {
  let n, r, o, s = i;
  function i(c) {
    const l = t.reduce((u, d) => d(u), e());
    return n = Yy(l), r = n.cache.get, o = n.cache.set, s = a, a(c);
  }
  function a(c) {
    const l = r(c);
    if (l)
      return l;
    const u = Vy(c, n);
    return o(c, u), u;
  }
  return function() {
    return s(Ky.apply(null, arguments));
  };
}
const Ee = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, cu = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, lu = /^\((?:(\w[\w-]*):)?(.+)\)$/i, qy = /^\d+\/\d+$/, Xy = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Zy = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Qy = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Jy = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ev = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, on = (e) => qy.test(e), le = (e) => !!e && !Number.isNaN(Number(e)), Tt = (e) => !!e && Number.isInteger(Number(e)), ns = (e) => e.endsWith("%") && le(e.slice(0, -1)), ct = (e) => Xy.test(e), tv = () => !0, nv = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Zy.test(e) && !Qy.test(e)
), uu = () => !1, rv = (e) => Jy.test(e), ov = (e) => ev.test(e), sv = (e) => !Z(e) && !Q(e), av = (e) => Sn(e, mu, uu), Z = (e) => cu.test(e), zt = (e) => Sn(e, pu, nv), rs = (e) => Sn(e, dv, le), Di = (e) => Sn(e, du, uu), iv = (e) => Sn(e, fu, ov), _r = (e) => Sn(e, hu, rv), Q = (e) => lu.test(e), Pn = (e) => En(e, pu), cv = (e) => En(e, fv), Ni = (e) => En(e, du), lv = (e) => En(e, mu), uv = (e) => En(e, fu), $r = (e) => En(e, hu, !0), Sn = (e, t, n) => {
  const r = cu.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, En = (e, t, n = !1) => {
  const r = lu.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, du = (e) => e === "position" || e === "percentage", fu = (e) => e === "image" || e === "url", mu = (e) => e === "length" || e === "size" || e === "bg-size", pu = (e) => e === "length", dv = (e) => e === "number", fv = (e) => e === "family-name", hu = (e) => e === "shadow", mv = () => {
  const e = Ee("color"), t = Ee("font"), n = Ee("text"), r = Ee("font-weight"), o = Ee("tracking"), s = Ee("leading"), i = Ee("breakpoint"), a = Ee("container"), c = Ee("spacing"), l = Ee("radius"), u = Ee("shadow"), d = Ee("inset-shadow"), f = Ee("text-shadow"), p = Ee("drop-shadow"), g = Ee("blur"), h = Ee("perspective"), y = Ee("aspect"), b = Ee("ease"), v = Ee("animate"), x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
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
  ], w = () => [...S(), Q, Z], M = () => ["auto", "hidden", "clip", "visible", "scroll"], E = () => ["auto", "contain", "none"], k = () => [Q, Z, c], N = () => [on, "full", "auto", ...k()], C = () => [Tt, "none", "subgrid", Q, Z], D = () => ["auto", {
    span: ["full", Tt, Q, Z]
  }, Tt, Q, Z], A = () => [Tt, "auto", Q, Z], P = () => ["auto", "min", "max", "fr", Q, Z], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], $ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], z = () => ["auto", ...k()], V = () => [on, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], R = () => [e, Q, Z], L = () => [...S(), Ni, Di, {
    position: [Q, Z]
  }], H = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], q = () => ["auto", "cover", "contain", lv, av, {
    size: [Q, Z]
  }], F = () => [ns, Pn, zt], Y = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    Q,
    Z
  ], G = () => ["", le, Pn, zt], W = () => ["solid", "dashed", "dotted", "double"], J = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], _ = () => [le, ns, Ni, Di], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    Q,
    Z
  ], ne = () => ["none", le, Q, Z], de = () => ["none", le, Q, Z], we = () => [le, Q, Z], be = () => [on, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ct],
      breakpoint: [ct],
      color: [tv],
      container: [ct],
      "drop-shadow": [ct],
      ease: ["in", "out", "in-out"],
      font: [sv],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ct],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ct],
      shadow: [ct],
      spacing: ["px", le],
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
        aspect: ["auto", "square", on, Z, Q, y]
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
        columns: [le, Z, Q, a]
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
        overflow: M()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": M()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": M()
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
        z: [Tt, "auto", Q, Z]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [on, "full", "auto", a, ...k()]
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
        flex: [le, on, "auto", "initial", "none", Z]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", le, Q, Z]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", le, Q, Z]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Tt, "first", "last", "none", Q, Z]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": C()
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
        "grid-rows": C()
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
        m: z()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: z()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: z()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: z()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: z()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: z()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: z()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: z()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: z()
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
        size: V()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...V()]
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
          ...V()
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
          ...V()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...V()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...V()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...V()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Pn, zt]
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
        font: [r, Q, rs]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ns, Z]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [cv, Z, t]
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
        tracking: [o, Q, Z]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [le, "none", Q, rs]
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
        "list-image": ["none", Q, Z]
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
        list: ["disc", "decimal", "none", Q, Z]
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
        decoration: [le, "from-font", "auto", Q, zt]
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
        "underline-offset": [le, "auto", Q, Z]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", Q, Z]
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
        content: ["none", Q, Z]
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
        bg: L()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: H()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: q()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Tt, Q, Z],
          radial: ["", Q, Z],
          conic: [Tt, Q, Z]
        }, uv, iv]
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
        from: F()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: F()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: F()
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
        rounded: Y()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": Y()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": Y()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": Y()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": Y()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": Y()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": Y()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": Y()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": Y()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": Y()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": Y()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": Y()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": Y()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": Y()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": Y()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: G()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": G()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": G()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": G()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": G()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": G()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": G()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": G()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": G()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": G()
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
        "divide-y": G()
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
        "outline-offset": [le, Q, Z]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", le, Pn, zt]
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
          $r,
          _r
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
        "inset-shadow": ["none", d, $r, _r]
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
        ring: G()
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
        "ring-offset": [le, zt]
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
        "inset-ring": G()
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
        "text-shadow": ["none", f, $r, _r]
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
        opacity: [le, Q, Z]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...J(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": J()
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
        "mask-linear": [le]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": _()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": _()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": R()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": R()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": _()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": _()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": R()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": R()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": _()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": _()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": R()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": R()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": _()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": _()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": R()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": R()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": _()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": _()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": R()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": R()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": _()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": _()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": R()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": R()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": _()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": _()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": R()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": R()
      }],
      "mask-image-radial": [{
        "mask-radial": [Q, Z]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": _()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": _()
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
        "mask-conic": [le]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": _()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": _()
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
        mask: L()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: H()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: q()
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
        mask: ["none", Q, Z]
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
          Q,
          Z
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: ee()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [le, Q, Z]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [le, Q, Z]
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
          $r,
          _r
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
        grayscale: ["", le, Q, Z]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [le, Q, Z]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", le, Q, Z]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [le, Q, Z]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", le, Q, Z]
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
          Q,
          Z
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": ee()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [le, Q, Z]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [le, Q, Z]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", le, Q, Z]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [le, Q, Z]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", le, Q, Z]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [le, Q, Z]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [le, Q, Z]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", le, Q, Z]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", Q, Z]
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
        duration: [le, "initial", Q, Z]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", b, Q, Z]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [le, Q, Z]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", v, Q, Z]
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
        perspective: [h, Q, Z]
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
        rotate: ne()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ne()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ne()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ne()
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
        skew: we()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": we()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": we()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [Q, Z, "", "none", "gpu", "cpu"]
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
        translate: be()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": be()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": be()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": be()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", Q, Z]
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
        "will-change": ["auto", "scroll", "contents", "transform", Q, Z]
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
        stroke: [le, Pn, zt, rs]
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
}, pv = /* @__PURE__ */ Gy(mv);
function ae(...e) {
  return pv(su(e));
}
function os({
  ...e
}) {
  return /* @__PURE__ */ m(Ny, { "data-slot": "dropdown-menu", ...e });
}
function ss({
  ...e
}) {
  return /* @__PURE__ */ m(
    Ay,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function as({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ m(Ly, { children: /* @__PURE__ */ m(
    Iy,
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
function xe({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ m(
    Ry,
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
function is({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Py,
    {
      "data-slot": "dropdown-menu-separator",
      className: ae("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
const Ai = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Li = su, hv = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Li(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((l) => {
    const u = n?.[l], d = s?.[l];
    if (u === null) return null;
    const f = Ai(u) || Ai(d);
    return o[l][f];
  }), a = n && Object.entries(n).reduce((l, u) => {
    let [d, f] = u;
    return f === void 0 || (l[d] = f), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, u) => {
    let { class: d, className: f, ...p } = u;
    return Object.entries(p).every((g) => {
      let [h, y] = g;
      return Array.isArray(y) ? y.includes({
        ...s,
        ...a
      }[h]) : {
        ...s,
        ...a
      }[h] === y;
    }) ? [
      ...l,
      d,
      f
    ] : l;
  }, []);
  return Li(e, i, c, n?.class, n?.className);
}, Ds = hv(
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
function At({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ m(
    r ? Mm : "button",
    {
      "data-slot": "button",
      className: ae(Ds({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
var gv = Object.freeze({
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
}), yv = "VisuallyHidden", gu = T.forwardRef(
  (e, t) => /* @__PURE__ */ m(
    Ae.span,
    {
      ...e,
      ref: t,
      style: { ...gv, ...e.style }
    }
  )
);
gu.displayName = yv;
var vv = gu, [Do] = Cn("Tooltip", [
  Co
]), No = Co(), yu = "TooltipProvider", bv = 700, Ns = "tooltip.open", [wv, Ma] = Do(yu), vu = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = bv,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, i = T.useRef(!0), a = T.useRef(!1), c = T.useRef(0);
  return T.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ m(
    wv,
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
vu.displayName = yu;
var Zn = "Tooltip", [xv, or] = Do(Zn), bu = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: i,
    delayDuration: a
  } = e, c = Ma(Zn, e.__scopeTooltip), l = No(t), [u, d] = T.useState(null), f = Jr(), p = T.useRef(0), g = i ?? c.disableHoverableContent, h = a ?? c.delayDuration, y = T.useRef(!1), [b, v] = sa({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (E) => {
      E ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Ns))) : c.onClose(), s?.(E);
    },
    caller: Zn
  }), x = T.useMemo(() => b ? y.current ? "delayed-open" : "instant-open" : "closed", [b]), S = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y.current = !1, v(!0);
  }, [v]), w = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, v(!1);
  }, [v]), M = T.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      y.current = !0, v(!0), p.current = 0;
    }, h);
  }, [h, v]);
  return T.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ m(il, { ...l, children: /* @__PURE__ */ m(
    xv,
    {
      scope: t,
      contentId: f,
      open: b,
      stateAttribute: x,
      trigger: u,
      onTriggerChange: d,
      onTriggerEnter: T.useCallback(() => {
        c.isOpenDelayedRef.current ? M() : S();
      }, [c.isOpenDelayedRef, M, S]),
      onTriggerLeave: T.useCallback(() => {
        g ? w() : (window.clearTimeout(p.current), p.current = 0);
      }, [w, g]),
      onOpen: S,
      onClose: w,
      disableHoverableContent: g,
      children: n
    }
  ) });
};
bu.displayName = Zn;
var As = "TooltipTrigger", wu = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = or(As, n), s = Ma(As, n), i = No(n), a = T.useRef(null), c = Ie(t, a, o.onTriggerChange), l = T.useRef(!1), u = T.useRef(!1), d = T.useCallback(() => l.current = !1, []);
    return T.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ m(cl, { asChild: !0, ...i, children: /* @__PURE__ */ m(
      Ae.button,
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
wu.displayName = As;
var Ta = "TooltipPortal", [kv, Cv] = Do(Ta, {
  forceMount: void 0
}), xu = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = or(Ta, t);
  return /* @__PURE__ */ m(kv, { scope: t, forceMount: n, children: /* @__PURE__ */ m(qt, { present: n || s.open, children: /* @__PURE__ */ m(ha, { asChild: !0, container: o, children: r }) }) });
};
xu.displayName = Ta;
var wn = "TooltipContent", ku = T.forwardRef(
  (e, t) => {
    const n = Cv(wn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, i = or(wn, e.__scopeTooltip);
    return /* @__PURE__ */ m(qt, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ m(Cu, { side: o, ...s, ref: t }) : /* @__PURE__ */ m(Mv, { side: o, ...s, ref: t }) });
  }
), Mv = T.forwardRef((e, t) => {
  const n = or(wn, e.__scopeTooltip), r = Ma(wn, e.__scopeTooltip), o = T.useRef(null), s = Ie(t, o), [i, a] = T.useState(null), { trigger: c, onClose: l } = n, u = o.current, { onPointerInTransitChange: d } = r, f = T.useCallback(() => {
    a(null), d(!1);
  }, [d]), p = T.useCallback(
    (g, h) => {
      const y = g.currentTarget, b = { x: g.clientX, y: g.clientY }, v = Dv(b, y.getBoundingClientRect()), x = Nv(b, v), S = Av(h.getBoundingClientRect()), w = Iv([...x, ...S]);
      a(w), d(!0);
    },
    [d]
  );
  return T.useEffect(() => () => f(), [f]), T.useEffect(() => {
    if (c && u) {
      const g = (y) => p(y, u), h = (y) => p(y, c);
      return c.addEventListener("pointerleave", g), u.addEventListener("pointerleave", h), () => {
        c.removeEventListener("pointerleave", g), u.removeEventListener("pointerleave", h);
      };
    }
  }, [c, u, p, f]), T.useEffect(() => {
    if (i) {
      const g = (h) => {
        const y = h.target, b = { x: h.clientX, y: h.clientY }, v = c?.contains(y) || u?.contains(y), x = !Lv(b, i);
        v ? f() : x && (f(), l());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [c, u, i, l, f]), /* @__PURE__ */ m(Cu, { ...e, ref: s });
}), [Tv, Sv] = Do(Zn, { isInside: !1 }), Ev = /* @__PURE__ */ Sm("TooltipContent"), Cu = T.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      ...a
    } = e, c = or(wn, n), l = No(n), { onClose: u } = c;
    return T.useEffect(() => (document.addEventListener(Ns, u), () => document.removeEventListener(Ns, u)), [u]), T.useEffect(() => {
      if (c.trigger) {
        const d = (f) => {
          f.target?.contains(c.trigger) && u();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [c.trigger, u]), /* @__PURE__ */ m(
      aa,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ I(
          ll,
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
              /* @__PURE__ */ m(Ev, { children: r }),
              /* @__PURE__ */ m(Tv, { scope: n, isInside: !0, children: /* @__PURE__ */ m(vv, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
ku.displayName = wn;
var Mu = "TooltipArrow", Tu = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = No(n);
    return Sv(
      Mu,
      n
    ).isInside ? null : /* @__PURE__ */ m(ul, { ...o, ...r, ref: t });
  }
);
Tu.displayName = Mu;
function Dv(e, t) {
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
function Nv(e, t, n = 5) {
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
function Av(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function Lv(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s], c = t[i], l = a.x, u = a.y, d = c.x, f = c.y;
    u > r != f > r && n < (d - l) * (r - u) / (f - u) + l && (o = !o);
  }
  return o;
}
function Iv(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Rv(t);
}
function Rv(e) {
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
var Pv = vu, Ov = bu, _v = wu, $v = xu, Hv = ku, Wv = Tu;
function zv({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ m(
    Pv,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function Ls({
  ...e
}) {
  return /* @__PURE__ */ m(zv, { children: /* @__PURE__ */ m(Ov, { "data-slot": "tooltip", ...e }) });
}
function Is({
  ...e
}) {
  return /* @__PURE__ */ m(_v, { "data-slot": "tooltip-trigger", ...e });
}
function Rs({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ m($v, { children: /* @__PURE__ */ I(
    Hv,
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
        /* @__PURE__ */ m(Wv, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const ke = ({ onClick: e, isActive: t, disabled: n, children: r, tooltip: o }) => {
  const s = /* @__PURE__ */ m(
    "button",
    {
      onMouseDown: (i) => {
        i.preventDefault(), i.stopPropagation(), n || e();
      },
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
  return o ? /* @__PURE__ */ I(Ls, { children: [
    /* @__PURE__ */ m(Is, { asChild: !0, children: s }),
    /* @__PURE__ */ m(Rs, { side: "bottom", className: "text-xs", children: o })
  ] }) : s;
}, sn = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }), Bv = vt(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: r, className: o = "", autoReorderChecklist: s = !1, aiEnabled: i = !1, onAISparklesClick: a }) {
  const c = j(null), [l, u] = U(!1), [d, f] = U(void 0), p = fc({
    editor: t,
    selector: ({ editor: M }) => ({
      canUndo: M.can().undo(),
      canRedo: M.can().redo(),
      isBold: M.isActive("bold"),
      isItalic: M.isActive("italic"),
      isUnderline: M.isActive("underline"),
      isStrike: M.isActive("strike"),
      isCode: M.isActive("code"),
      isHighlight: M.isActive("highlight"),
      isH1: M.isActive("heading", { level: 1 }),
      isH2: M.isActive("heading", { level: 2 }),
      isH3: M.isActive("heading", { level: 3 }),
      isH4: M.isActive("heading", { level: 4 }),
      isH5: M.isActive("heading", { level: 5 }),
      isBlockquote: M.isActive("blockquote"),
      isBulletList: M.isActive("bulletList"),
      isOrderedList: M.isActive("orderedList"),
      isTaskList: M.isActive("taskList"),
      isCodeBlock: M.isActive("codeBlock"),
      isLink: M.isActive("link")
    })
  }), g = B(() => {
    const { view: M } = t, { from: E } = M.state.selection, k = M.coordsAtPos(E);
    f({ top: k.bottom + 8, left: k.left }), u(!0);
  }, [t]), h = B((M, E) => {
    t.chain().focus().setImage({ src: M, alt: E }).run(), u(!1);
  }, [t]), y = B(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), b = B((M) => {
    t.chain().focus().insertCallout({ type: M }).run();
  }, [t]), v = j(/* @__PURE__ */ new Map()), x = j(/* @__PURE__ */ new Map()), S = B((M) => {
    const { doc: E, tr: k } = M.state;
    let N = !1;
    const C = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), D = M.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), D.forEach((P, O) => {
      P.querySelectorAll(":scope > li").forEach((z) => {
        const V = z, R = (V.textContent || "").trim().substring(0, 50);
        v.current.set(`${O}-${R}`, V.getBoundingClientRect());
      });
    });
    const A = [];
    E.descendants((P, O, $, z) => {
      if (!C.has(P.type.name)) return !0;
      let V = !1;
      if (P.forEach((L) => {
        L.type.name === "taskItem" && (V = !0);
      }), !V) return !0;
      let R = 0;
      return E.nodesBetween(0, O, (L) => (C.has(L.type.name) && R++, !0)), A.push({ node: P, pos: O, depth: R }), !0;
    }), A.sort((P, O) => O.depth - P.depth);
    for (const { node: P, pos: O } of A) {
      const $ = [];
      let z = 0;
      P.forEach((W) => {
        $.push({
          node: W,
          isTask: W.type.name === "taskItem",
          checked: W.type.name === "taskItem" && W.attrs.checked === !0,
          originalIndex: z++
        });
      });
      const V = $.filter((W) => W.isTask && !W.checked), R = $.filter((W) => W.isTask && W.checked), L = [...$], H = $.map((W, J) => ({ index: J, isTask: W.isTask })).filter((W) => W.isTask).map((W) => W.index), q = [...V, ...R];
      if (H.forEach((W, J) => {
        L[W] = q[J];
      }), !L.some((W, J) => W.node !== $[J].node)) continue;
      const Y = P.type.create(
        P.attrs,
        L.map((W) => W.node)
      ), G = k.mapping.map(O);
      k.replaceWith(G, G + P.nodeSize, Y), N = !0;
    }
    N && (M.view.dispatch(k), requestAnimationFrame(() => {
      M.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((O) => {
        const $ = O.querySelectorAll(":scope > li"), z = /* @__PURE__ */ new Map();
        v.current.forEach((V, R) => {
          const L = R.replace(/^\d+-/, "");
          z.set(L, V);
        }), $.forEach((V) => {
          const R = V, L = (R.textContent || "").trim().substring(0, 50), H = z.get(L);
          if (!H) return;
          const q = R.getBoundingClientRect(), F = H.top - q.top;
          if (Math.abs(F) < 2) return;
          R.style.transform = `translateY(${F}px)`, R.style.transition = "none", R.style.zIndex = "1", R.offsetHeight, R.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", R.style.transform = "translateY(0)";
          const Y = () => {
            R.style.transform = "", R.style.transition = "", R.style.zIndex = "", R.removeEventListener("transitionend", Y);
          };
          R.addEventListener("transitionend", Y), setTimeout(Y, 400);
        });
      });
    }));
  }, []);
  K(() => {
    if (!s || !t) return;
    const M = /* @__PURE__ */ new Map();
    t.state.doc.descendants((k, N) => (k.type.name === "taskItem" && M.set(N, k.attrs.checked === !0), !0)), x.current = M;
    const E = ({ transaction: k }) => {
      if (!k.docChanged) return;
      const N = /* @__PURE__ */ new Map();
      t.state.doc.descendants((A, P) => (A.type.name === "taskItem" && N.set(P, A.attrs.checked === !0), !0));
      const C = x.current;
      let D = !1;
      if (C.size > 0 && N.size > 0) {
        let A = 0, P = 0;
        C.forEach((O) => {
          O && A++;
        }), N.forEach((O) => {
          O && P++;
        }), A !== P && (D = !0);
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
      ke,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !p?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Xd, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !p?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(Zd, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(sn, {}),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: p?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(Bs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: p?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m(Fs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: p?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(Us, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: p?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(Ys, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: p?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(hc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: p?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(gc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => r?.(),
        isActive: p?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(js, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(sn, {}),
    /* @__PURE__ */ I(os, { children: [
      /* @__PURE__ */ m(ss, { asChild: !0, children: /* @__PURE__ */ I(
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
            /* @__PURE__ */ m(Lt, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" })
          ]
        }
      ) }),
      /* @__PURE__ */ I(as, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ I(
          xe,
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
          xe,
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
          xe,
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
          xe,
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
          xe,
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
          xe,
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
    /* @__PURE__ */ m(sn, {}),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: p?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(Vs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: p?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m(Ks, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: p?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m(Gs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: p?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(qs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => oa(t),
        isActive: p?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(yc, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => {
          if (p?.isTaskList)
            t.chain().focus().sinkListItem("taskItem").run();
          else if ((p?.isBulletList || p?.isOrderedList) && (t.chain().focus().sinkListItem("listItem").run(), p?.isOrderedList)) {
            const { state: M, view: E } = t, { $from: k } = M.selection, N = M.schema.nodes.orderedList, C = M.schema.nodes.bulletList;
            if (N && C)
              for (let D = k.depth; D >= 0; D--) {
                const A = k.node(D);
                if (A.type === N && D >= 2) {
                  const P = k.node(D - 1);
                  if (P.type.name === "listItem" || P.type.name === "taskItem") {
                    const O = k.before(D);
                    E.dispatch(M.tr.setNodeMarkup(O, C, A.attrs));
                    break;
                  }
                }
                if (A.type.name === "bulletList" || A.type.name === "taskList") break;
              }
          }
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ m(Qd, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => {
          p?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (p?.isBulletList || p?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !p?.isBulletList && !p?.isOrderedList && !p?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(Jd, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(sn, {}),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: y,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m(hs, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: g,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m(Ws, { size: 16 })
      }
    ),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ m(vc, { size: 16 })
      }
    ),
    /* @__PURE__ */ I(os, { children: [
      /* @__PURE__ */ m(ss, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ m(Qr, { size: 16 })
        }
      ) }),
      /* @__PURE__ */ I(as, { align: "start", children: [
        /* @__PURE__ */ I(xe, { onClick: () => b("info"), children: [
          /* @__PURE__ */ m(Qr, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }),
          " Info"
        ] }),
        /* @__PURE__ */ I(xe, { onClick: () => b("note"), children: [
          /* @__PURE__ */ m(Xs, { size: 16, className: "mr-2", style: { color: "#FF8200" } }),
          " Note"
        ] }),
        /* @__PURE__ */ I(xe, { onClick: () => b("prompt"), children: [
          /* @__PURE__ */ m(ef, { size: 16, className: "mr-2", style: { color: "#B244B3" } }),
          " Prompt"
        ] }),
        /* @__PURE__ */ I(xe, { onClick: () => b("resources"), children: [
          /* @__PURE__ */ m(tf, { size: 16, className: "mr-2", style: { color: "#63B148" } }),
          " Resources"
        ] }),
        /* @__PURE__ */ I(xe, { onClick: () => b("todo"), children: [
          /* @__PURE__ */ m(Zs, { size: 16, className: "mr-2", style: { color: "#4479B3" } }),
          " Todo"
        ] })
      ] })
    ] }),
    t.isActive("table") && /* @__PURE__ */ I(os, { children: [
      /* @__PURE__ */ m(ss, { asChild: !0, children: /* @__PURE__ */ I(
        At,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ m(hs, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden sm:inline", children: "Table" })
          ]
        }
      ) }),
      /* @__PURE__ */ I(as, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ m(Ga, { size: 16, className: "mr-2" }),
              " Add Column Before"
            ]
          }
        ),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ m(Ga, { size: 16, className: "mr-2" }),
              " Add Column After"
            ]
          }
        ),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ m(un, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Column"
            ]
          }
        ),
        /* @__PURE__ */ m(is, {}),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ m(qa, { size: 16, className: "mr-2" }),
              " Add Row Before"
            ]
          }
        ),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ m(qa, { size: 16, className: "mr-2" }),
              " Add Row After"
            ]
          }
        ),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ m(un, { size: 16, className: "mr-2 text-destructive" }),
              " Delete Row"
            ]
          }
        ),
        /* @__PURE__ */ m(is, {}),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ m(Xa, { size: 16, className: "mr-2" }),
              " Toggle Header Row"
            ]
          }
        ),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ m(Xa, { size: 16, className: "mr-2" }),
              " Toggle Header Column"
            ]
          }
        ),
        /* @__PURE__ */ m(is, {}),
        /* @__PURE__ */ I(
          xe,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ m(un, { size: 16, className: "mr-2" }),
              " Delete Table"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ m(
      Lc,
      {
        isOpen: l,
        onClose: () => u(!1),
        onInsert: h,
        position: d
      }
    ),
    /* @__PURE__ */ m(sn, {}),
    /* @__PURE__ */ m(
      ke,
      {
        onClick: w,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m(nf, { size: 16 })
      }
    ),
    i && /* @__PURE__ */ I(ve, { children: [
      /* @__PURE__ */ m(sn, {}),
      /* @__PURE__ */ I(Ls, { children: [
        /* @__PURE__ */ m(Is, { asChild: !0, children: /* @__PURE__ */ m(
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
            children: /* @__PURE__ */ m(ho, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ m(Rs, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" })
      ] })
    ] }),
    /* @__PURE__ */ m("div", { className: "flex-1 min-w-2" }),
    n && /* @__PURE__ */ I(Ls, { children: [
      /* @__PURE__ */ m(Is, { asChild: !0, children: /* @__PURE__ */ I(
        At,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ m(Gt, { size: 16 }),
            /* @__PURE__ */ m("span", { className: "text-xs hidden md:inline", children: "Copy MD" })
          ]
        }
      ) }),
      /* @__PURE__ */ m(Rs, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" })
    ] })
  ] });
});
function Fv({ editor: e, isOpen: t, onClose: n, focusTrigger: r = 0, initialSearchQuery: o, editorMode: s = "wysiwyg", rawMarkdown: i = "", onRawMarkdownChange: a, onMatchesChange: c }) {
  const l = s === "markdown", [u, d] = U(""), [f, p] = U(""), [g, h] = U(!1), [y, b] = U(!1), [v, x] = U(!1), [S, w] = U(!1), [M, E] = U([]), [k, N] = U(0), [C, D] = U(null), [A, P] = U(!1), O = j(!1), $ = j(null), z = j(null), V = j(!1);
  K(() => {
    t && o && o.trim() && d(o);
  }, [t, o, r]);
  const R = B(() => {
    if (!u || !e) {
      E([]), N(0), D(null);
      return;
    }
    const W = [];
    let J;
    try {
      if (y)
        J = new RegExp(u, g ? "g" : "gi");
      else {
        let _ = u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        v && (_ = `\\b${_}\\b`), J = new RegExp(_, g ? "g" : "gi");
      }
      D(null);
    } catch (_) {
      D(_.message), E([]);
      return;
    }
    if (l) {
      let _;
      for (; (_ = J.exec(i)) !== null; )
        W.push({
          from: _.index,
          to: _.index + _[0].length,
          text: _[0]
        });
    } else {
      const { doc: _ } = e.state;
      _.descendants((ee, ne) => {
        if (ee.isText && ee.text) {
          let de;
          for (; (de = J.exec(ee.text)) !== null; )
            W.push({
              from: ne + de.index,
              to: ne + de.index + de[0].length,
              text: de[0]
            });
        }
        return !0;
      });
    }
    E(W), W.length > 0 && k >= W.length && N(0);
  }, [u, g, y, v, e, k, l, i]);
  K(() => {
    R();
  }, [R]), K(() => {
    l && c && (t && M.length > 0 ? c(M, k) : c([], 0));
  }, [l, t, M, k, c]), K(() => {
    if (!e) return;
    if (l) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const W = typeof e.commands.setSearchHighlight == "function";
    t && u && W ? e.commands.setSearchHighlight({
      searchTerm: u,
      caseSensitive: g,
      useRegex: y,
      currentMatchIndex: k
    }) : W && e.commands.clearSearchHighlight();
  }, [e, t, u, g, y, k, l, M, i]), K(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), c && c([], 0), O.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), P(!1)), O.current = !1);
  }, [t, e, c]), K(() => {
    if (M.length > 0 && k < M.length) {
      const W = M[k];
      if (l) {
        const _ = document.querySelector(".syntax-textarea");
        if (_ && V.current) {
          const ee = parseInt(getComputedStyle(_).lineHeight) || 22, de = i.substring(0, W.from).split(`
`).length;
          _.scrollTop = Math.max(0, (de - 3) * ee);
        }
        V.current && (V.current = !1);
        return;
      }
      const J = e.view.domAtPos(W.from);
      J.node && J.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), V.current && (V.current = !1);
    }
  }, [k, M, e, l, i]), K(() => {
    t && $.current && ($.current.focus(), $.current.select());
  }, [t, r]);
  const L = B(() => {
    M.length !== 0 && (V.current = !0, N((W) => (W + 1) % M.length));
  }, [M.length]), H = B(() => {
    M.length !== 0 && (V.current = !0, N((W) => (W - 1 + M.length) % M.length));
  }, [M.length]), q = B(() => {
    if (M.length === 0 || k >= M.length) return;
    const W = M[k];
    if (l && a) {
      const J = i.substring(0, W.from) + f + i.substring(W.to);
      a(J), setTimeout(R, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: W.from, to: W.to }).deleteSelection().insertContent(f).run(), setTimeout(R, 10);
  }, [M, k, f, e, R, l, i, a]), F = B(() => {
    if (M.length === 0) return;
    if (l && a) {
      const J = [...M].sort((ee, ne) => ne.from - ee.from);
      let _ = i;
      J.forEach((ee) => {
        _ = _.substring(0, ee.from) + f + _.substring(ee.to);
      }), a(_), setTimeout(R, 10);
      return;
    }
    const W = [...M].sort((J, _) => _.from - J.from);
    e.chain().focus(), W.forEach((J) => {
      e.chain().setTextSelection({ from: J.from, to: J.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(R, 10);
  }, [M, f, e, R, l, i, a]), Y = B(() => {
    if (M.length === 0 || !u || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: u,
      caseSensitive: g,
      useRegex: y,
      wholeWord: v
    }) && (P(!0), O.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [M, u, g, y, v, e, n]), G = B((W) => {
    W.key === "Enter" ? (W.preventDefault(), W.shiftKey ? H() : L(), $.current?.focus()) : W.key === "Escape" ? (W.preventDefault(), n()) : W.key === "h" && (W.ctrlKey || W.metaKey) ? (W.preventDefault(), w((J) => !J)) : W.key === "l" && (W.ctrlKey || W.metaKey) && W.shiftKey && (W.preventDefault(), Y());
  }, [L, H, n, Y]);
  return t ? /* @__PURE__ */ I(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: G,
      children: [
        /* @__PURE__ */ I("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ I("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(rf, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: $,
                type: "text",
                placeholder: "Find...",
                value: u,
                onChange: (W) => d(W.target.value),
                className: `find-replace-input ${C ? "has-error" : ""}`
              }
            ),
            C && /* @__PURE__ */ m("span", { className: "find-replace-error", title: C, children: "!" })
          ] }),
          /* @__PURE__ */ m("span", { className: "find-replace-count", children: M.length > 0 ? `${k + 1} of ${M.length}` : u ? "No results" : "" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: H,
              disabled: M.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ m(of, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: L,
              disabled: M.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ m(Lt, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: Y,
              disabled: M.length === 0,
              className: `find-replace-btn ${A ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${M.length} matches`,
              children: /* @__PURE__ */ m(sf, { size: 16 })
            }
          ),
          /* @__PURE__ */ m("div", { className: "find-replace-separator" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => h((W) => !W),
              className: `find-replace-btn ${g ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ m(af, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => x((W) => !W),
              className: `find-replace-btn ${v ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ m(cf, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => b((W) => !W),
              className: `find-replace-btn ${y ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ m(lf, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => w((W) => !W),
              className: `find-replace-btn ${S ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ m(gs, { size: 16 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: n,
              className: "find-replace-btn",
              title: "Close (Escape)",
              children: /* @__PURE__ */ m(pt, { size: 16 })
            }
          )
        ] }),
        S && /* @__PURE__ */ I("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ I("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(gs, { size: 14, className: "find-replace-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: z,
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
              onClick: q,
              disabled: M.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            }
          ),
          /* @__PURE__ */ I(
            "button",
            {
              onClick: F,
              disabled: M.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ m(uf, { size: 14 }),
                "All"
              ]
            }
          )
        ] })
      ]
    }
  ) : null;
}
const Uv = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), lt = Uv ? "⌘" : "Ctrl", Yv = ({ editor: e }) => {
  const [t, n] = U(!1), [r, o] = U(0), [s, i] = U(0), [a, c] = U(""), [l, u] = U(""), [d, f] = U(!1), [p, g] = U(!1);
  K(() => {
    if (!e) return;
    const E = () => {
      const N = e.storage.selectAllOccurrences;
      N ? (n(N.isActive), o(N.ranges.length), i(N.allMatches.length), c(N.searchTerm), u(N.typedBuffer), f(N.isTypingReplace), g(N.isIncremental)) : (n(!1), o(0), i(0));
    }, k = () => {
      E();
    };
    return e.on("transaction", k), E(), () => {
      e.off("transaction", k);
    };
  }, [e]);
  const h = B(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), y = B(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), b = B(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), v = B(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), x = B(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), S = B(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), w = B(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), M = B(() => {
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
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ I(ve, { children: [
        /* @__PURE__ */ m(po, { size: 12, className: "select-all-action-bar-preview-icon" }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-old", children: a }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-arrow", children: "→" }),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-new", children: l || "∅" })
      ] }) : /* @__PURE__ */ m(ve, { children: /* @__PURE__ */ I("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        a,
        '"'
      ] }) }) }),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }),
      p && r < s && /* @__PURE__ */ I(ve, { children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: w,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${lt}+D)`,
            children: /* @__PURE__ */ m(Qs, { size: 14 })
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: M,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${lt}+Shift+L)`,
            children: "All"
          }
        ),
        /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: h,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${lt}+B)`,
          children: /* @__PURE__ */ m(Bs, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn",
          title: `Italic all occurrences (${lt}+I)`,
          children: /* @__PURE__ */ m(Fs, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: b,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${lt}+U)`,
          children: /* @__PURE__ */ m(Us, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ m(Ys, { size: 14 })
        }
      ),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: x,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ m(un, { size: 14 })
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: S,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ m(pt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: p && r < s ? /* @__PURE__ */ I(ve, { children: [
      /* @__PURE__ */ I("kbd", { children: [
        lt,
        "+D"
      ] }),
      " next · ",
      /* @__PURE__ */ I("kbd", { children: [
        lt,
        "+Shift+L"
      ] }),
      " all · Type to replace · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ I("kbd", { children: [
        lt,
        "+Z"
      ] }),
      " undo"
    ] }) : /* @__PURE__ */ I(ve, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: "Backspace" }),
      " to delete · ",
      /* @__PURE__ */ I("kbd", { children: [
        lt,
        "+Z"
      ] }),
      " undo"
    ] }) })
  ] });
}, jv = vt(Yv), Hr = "-dismissed";
function Vv(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function Kv(e, t = {}) {
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
  }), l = j(null), u = j(""), d = j(0);
  K(() => {
    if (o && !(!e || e.isDestroyed))
      try {
        const b = localStorage.getItem(n), v = localStorage.getItem(n + Hr);
        if (b && !v) {
          let x = "";
          try {
            x = e.getHTML() || "";
          } catch {
            return;
          }
          b !== x && b.length > 50 && c((S) => ({ ...S, hasRecoverableContent: !0 }));
        }
      } catch (b) {
        console.warn("useAutoSave: Error checking for recoverable content", b);
      }
  }, [e, n, o]);
  const f = B(() => {
    if (!(!e || !o || e.isDestroyed))
      try {
        const b = e.getHTML(), v = Vv(b);
        if (v === d.current && b.length === u.current.length) {
          c((x) => ({ ...x, status: "saved" }));
          return;
        }
        if (b.length < 20)
          return;
        c((x) => ({ ...x, status: "saving" })), localStorage.setItem(n, b), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), u.current = b, d.current = v, c((x) => ({
          ...x,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(b), setTimeout(() => {
          c((x) => x.status === "saved" ? { ...x, status: "idle" } : x);
        }, 2e3);
      } catch (b) {
        console.error("useAutoSave: Error saving content", b), c((v) => ({
          ...v,
          status: "error",
          error: b instanceof Error ? b.message : "Failed to save"
        }));
      }
  }, [e, n, o, s]);
  K(() => {
    if (!e || !o || e.isDestroyed) return;
    const b = () => {
      e.isDestroyed || (l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        f();
      }, r));
    };
    return e.on("update", b), () => {
      e.off("update", b), l.current && clearTimeout(l.current);
    };
  }, [e, r, o, f]), K(() => {
    if (!e || !o || e.isDestroyed) return;
    const b = () => {
      if (!e.isDestroyed)
        try {
          const v = e.getHTML();
          v.length >= 20 && (localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()));
        } catch (v) {
          console.warn("useAutoSave: Error saving on unload", v);
        }
    };
    return window.addEventListener("beforeunload", b), () => {
      window.removeEventListener("beforeunload", b);
    };
  }, [e, n, o]);
  const p = B(() => {
    l.current && clearTimeout(l.current), f();
  }, [f]), g = B(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Hr), u.current = "", c({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (b) {
      console.warn("useAutoSave: Error clearing content", b);
    }
  }, [n]), h = B(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const b = localStorage.getItem(n);
      return b && e && !e.isDestroyed ? (c((v) => ({ ...v, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(b), u.current = b, localStorage.removeItem(n + Hr), i?.(b);
          } catch (v) {
            console.warn("useAutoSave: Error setting content during recovery", v);
          }
      }), b) : null;
    } catch (b) {
      return console.warn("useAutoSave: Error recovering content", b), null;
    }
  }, [e, n, i]), y = B(() => {
    try {
      localStorage.setItem(n + Hr, "true"), c((b) => ({ ...b, hasRecoverableContent: !1 }));
    } catch (b) {
      console.warn("useAutoSave: Error dismissing recovery", b);
    }
  }, [n]);
  return {
    ...a,
    save: p,
    clear: g,
    recover: h,
    dismissRecovery: y
  };
}
function Xr(e, t, n) {
  const { state: r } = e, { tr: o } = r;
  t !== n && o.delete(t, n);
  const s = o.doc.resolve(t), i = r.schema.nodes.horizontalRule.create(), a = s.before(s.depth), c = s.after(s.depth);
  o.replaceWith(a, c, i);
  const l = a + i.nodeSize;
  if (l < o.doc.content.size) {
    const u = o.doc.resolve(l);
    u.nodeAfter && u.nodeAfter.isTextblock ? o.setSelection(Ve.create(o.doc, l + 1)) : u.nodeAfter && o.setSelection(Ve.near(o.doc.resolve(l)));
  } else {
    const d = r.schema.nodes.paragraph.create();
    o.insert(l, d), o.setSelection(Ve.create(o.doc, l + 1));
  }
  o.scrollIntoView(), e.view.dispatch(o);
}
function Fn(e) {
  return e.replace(/^[ \t]*\u200B[ \t]*$/gm, "").replace(/\u200B/g, "");
}
function Gv(e, {
  editor: t,
  turndownService: n,
  editorModeRef: r,
  handleModeSwitch: o,
  wordCount: s,
  autoSaveState: i,
  setIsFindReplaceOpen: a,
  setFindReplaceFocusTrigger: c
}) {
  Ud(e, () => ({
    getEditor: () => t,
    getHTML: () => t?.getHTML() || "",
    getMarkdown: () => t ? Fn(n.turndown(t.getHTML())) : "",
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
      t && Xr(t, t.state.selection.from, t.state.selection.from);
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
              const p = f.getBoundingClientRect(), h = d.getBoundingClientRect().top - p.top + f.scrollTop;
              f.scrollTo({ top: h - 20, behavior: "smooth" });
            } else
              d.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          t.commands.setTextSelection(l + 1);
        } catch {
        }
    }
  }), [t, n, o, s, i, a]);
}
const qv = new Te("tableCellMenu");
function Xv(e) {
  return new Me({
    key: qv,
    props: {
      handleDOMEvents: {
        contextmenu(t, n) {
          const o = n.target.closest("td, th");
          if (o && o.closest(".ProseMirror")) {
            n.preventDefault();
            const s = t.posAtDOM(o, 0);
            return e.chain().focus().setTextSelection(s).run(), Zv(n, e, s), !0;
          }
          return !1;
        }
      }
    }
  });
}
function Zv(e, t, n) {
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
  let g = !1;
  for (let E = p.depth; E >= 0; E--)
    if (p.node(E).type.name === "table") {
      p.node(E).firstChild?.firstChild?.type.name === "tableHeader" && (g = !0);
      break;
    }
  const h = [
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
    { label: "Copy Table", icon: "copy", action: () => Qv(t) }
  ], y = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, b = l ? "#2a2a2a" : "#f5f5f5", v = l ? "#ff6b6b" : "#dc2626", x = l ? "#999999" : "#666666", S = l ? "#333333" : "#e5e5e5";
  h.forEach((E) => {
    if (E.label === "divider") {
      const k = document.createElement("div");
      k.style.cssText = "height:1px;background:" + S + ";margin:4px 0;", o.appendChild(k);
    } else {
      const k = document.createElement("button");
      k.type = "button";
      const N = E.destructive ? v : f;
      k.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + N + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const C = y[E.icon || ""] || "", D = E.destructive ? v : x;
      k.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + D + ';">' + C + '</span><span style="flex:1;white-space:nowrap;">' + E.label + "</span>", k.addEventListener("mouseenter", () => {
        k.style.background = E.destructive ? l ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : b;
      }), k.addEventListener("mouseleave", () => {
        k.style.background = "transparent";
      }), k.addEventListener("click", (A) => {
        A.preventDefault(), A.stopPropagation(), E.action && E.action(), o.remove();
      }), o.appendChild(k);
    }
  }), document.body.appendChild(o);
  const w = (E) => {
    const k = E.target;
    o.contains(k) || (o.remove(), document.removeEventListener("mousedown", w), document.removeEventListener("keydown", M));
  }, M = (E) => {
    E.key === "Escape" && (o.remove(), document.removeEventListener("mousedown", w), document.removeEventListener("keydown", M));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", w), document.addEventListener("keydown", M);
  }, 0);
}
function Qv(e) {
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
const Jv = Xf.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Xv(this.editor)
    ];
  }
}), eb = Zf.extend({}), Un = new Te("tableSorting");
let Ut = null, Wn = null;
function tb(e) {
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
function nb(e, t, n) {
  let r = 0;
  return e.type === "number" && t.type === "number" ? r = e.value - t.value : e.type === "date" && t.type === "date" ? r = e.value.getTime() - t.value.getTime() : r = String(e.value).localeCompare(String(t.value)), n === "asc" ? r : -r;
}
function rb(e, t, n) {
  const { state: r, view: o } = e;
  let s = null;
  if (r.doc.nodesBetween(t, t + 1, (g, h) => {
    if (g.type.name === "table" && h === t)
      return s = g, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const i = Ut?.tablePos === t && Ut?.columnIndex === n && Ut?.direction === "asc" ? "desc" : "asc";
  Ut = { tablePos: t, columnIndex: n, direction: i }, Wn = null;
  const a = [];
  s.forEach((g) => {
    if (g.type.name === "tableRow") {
      let h = !1;
      g.forEach((y) => {
        y.type.name === "tableHeader" && (h = !0);
      }), a.push({ node: g, isHeader: h });
    }
  });
  const c = a.filter((g) => g.isHeader), l = a.filter((g) => !g.isHeader);
  if (l.length < 2) {
    Ii(n, i), o.dispatch(r.tr.setMeta(Un, { updated: !0 }));
    return;
  }
  const u = l.map((g) => {
    let h = "", y = 0;
    return g.node.forEach((b) => {
      y === n && (h = b.textContent || ""), y++;
    }), { ...g, sortValue: tb(h) };
  }), d = u.map((g, h) => h);
  u.sort((g, h) => nb(g.sortValue, h.sortValue, i));
  const f = u.map((g, h) => l.indexOf(g));
  if (d.some((g, h) => g !== f[h])) {
    const g = [];
    c.forEach((b) => g.push(b.node)), u.forEach((b) => g.push(b.node));
    const h = s.type.create(s.attrs, g), { tr: y } = r;
    y.replaceWith(t, t + s.nodeSize, h), y.setMeta(Un, { updated: !0 }), o.dispatch(y);
  } else
    o.dispatch(r.tr.setMeta(Un, { updated: !0 }));
  Ii(n, i);
}
function Ii(e, t) {
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
function ob(e, t, n, r) {
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
    u.preventDefault(), u.stopPropagation(), rb(r, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), o.appendChild(s), o;
}
function sb(e) {
  return new Me({
    key: Un,
    state: {
      init() {
        return je.empty;
      },
      apply(t, n, r, o) {
        const s = t.getMeta(Un);
        return !t.docChanged && !s?.updated && Wn ? Wn.map(t.mapping, t.doc) : (Wn = ab(o.doc, e), Wn);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function ab(e, t) {
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
              const h = Ut?.tablePos === s && Ut?.columnIndex === c ? Ut.direction : null, y = c, b = s, v = Ze.widget(p, () => ob(h, b, y, t), { side: 1, key: "sort-" + s + "-" + y });
              n.push(v);
            }
            l += u.nodeSize, c++;
          });
        }
      });
    }
  }), je.create(e, n);
}
const ib = Ue.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [sb(this.editor)];
  }
});
function Sa(e, t, n, r, o, s = {}) {
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
const cb = Qf.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const g = s.node(p);
          if (g.type === i || g.type === a || g.type === c) {
            d = g.type, f = s.before(p);
            break;
          }
        }
        if (d === i)
          return e.liftListItem("listItem");
        if (d === a || d === c) {
          if (!r) return !0;
          if (Sa(n, f, i, l, u, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), lb = Jf.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: r }) => {
        const { selection: o } = t, { $from: s } = o, i = t.schema.nodes.bulletList, a = t.schema.nodes.taskList, c = t.schema.nodes.orderedList, l = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let p = s.depth; p > 0; p--) {
          const g = s.node(p);
          if (g.type === i || g.type === a || g.type === c) {
            d = g.type, f = s.before(p);
            break;
          }
        }
        if (d === c)
          return e.liftListItem("listItem");
        if (d === a || d === i) {
          if (!r) return !0;
          if (Sa(n, f, c, l, u, {}))
            return r(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), ub = tm.extend({
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
        const g = n.schema.nodes.bulletList, h = n.schema.nodes.orderedList, y = n.schema.nodes.listItem;
        let b = null, v = -1;
        for (let w = c.depth; w > 0; w--) {
          const M = c.node(w);
          if (M.type === g || M.type === h) {
            b = M, v = c.before(w);
            break;
          }
        }
        if (b) {
          if (!o) return !0;
          const w = v, M = r.doc.nodeAt(w);
          if (!M) return !1;
          r.setNodeMarkup(w, d, M.attrs);
          const E = r.doc.nodeAt(w);
          if (!E) return !1;
          const k = [];
          E.forEach((N, C) => {
            N.type === y && k.push(w + 1 + C);
          });
          for (let N = k.length - 1; N >= 0; N--) {
            const C = k[N], D = r.doc.nodeAt(C);
            D && D.type === y && r.setNodeMarkup(C, f, { checked: !1 });
          }
          return o(r), !0;
        }
        if (!o) return !0;
        const x = Qa(u, d);
        if (x) {
          r.wrap(u, x);
          const { $from: w } = r.selection;
          let M = -1;
          for (let E = w.depth; E > 0; E--)
            if (w.node(E).type === d) {
              M = w.before(E);
              break;
            }
          if (M >= 0) {
            const E = r.doc.nodeAt(M);
            if (E) {
              const k = [];
              E.forEach((N, C) => {
                N.type === y && k.push(M + 1 + C);
              });
              for (let N = k.length - 1; N >= 0; N--) {
                const C = k[N], D = r.doc.nodeAt(C);
                D && D.type === y && r.setNodeMarkup(C, f, { checked: !1 });
              }
            }
          }
          return o(r), !0;
        }
        const S = Qa(u, g);
        if (S) {
          r.wrap(u, S);
          const { $from: w } = r.selection;
          let M = -1;
          for (let E = w.depth; E > 0; E--)
            if (w.node(E).type === g) {
              M = w.before(E);
              break;
            }
          return M >= 0 && Sa(r, M, d, f, y, { checked: !1 }), o(r), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), db = nm.extend({
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
          const d = r.before(s), { tr: f } = n, p = n.schema.nodes.taskItem, g = n.schema.nodes.paragraph, h = p.create(
            { checked: !1 },
            g.create()
          );
          f.insert(d, h);
          const y = d + 1;
          return f.setSelection(Ve.create(f.doc, y)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
      new Me({
        key: new Te("taskItemInputRule"),
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
            const d = u[2] === "x", f = a.start() + (u.index || 0), p = r, g = i.tr;
            g.delete(f, p);
            const y = g.doc.resolve(f).blockRange();
            if (!y || !t || !e) return !1;
            const b = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: d } }
            ];
            if (g.wrap(y, b), f > 1) {
              const v = g.doc.resolve(f - 1).nodeBefore;
              v && v.type === t && rm(g.doc, f - 1) && g.join(f - 1);
            }
            return n.dispatch(g), !0;
          }
        }
      })
    ];
  }
}), fb = em.extend({
  content: "paragraph block*"
}), Ri = new Te("collapsibleList");
function Ps(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function ao(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((r) => {
    t.includes(r.type.name) && (n = !0);
  }), n;
}
function mb(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let r = -1, o = -1, s = t + 1;
  return e.forEach((i) => {
    n.includes(i.type.name) && (r === -1 && (r = s), o = s + i.nodeSize), s += i.nodeSize;
  }), r === -1 ? null : { start: r, end: o };
}
let mn = null;
function Pi(e, t) {
  const n = [];
  return e.descendants((r) => {
    t.includes(r.type.name) && n.push({
      hasNested: ao(r),
      text: r.firstChild?.textContent.slice(0, 50) ?? ""
    });
  }), n;
}
function pb(e, t, n) {
  const r = Pi(e, n), o = Pi(t, n);
  if (r.length !== o.length) return !0;
  for (let s = 0; s < r.length; s++)
    if (r[s].hasNested !== o[s].hasNested || r[s].text !== o[s].text) return !0;
  return !1;
}
function Wr(e, t, n) {
  const r = [];
  return e.descendants((o, s) => {
    if (!n.listItemTypes.includes(o.type.name) || !ao(o))
      return !0;
    const i = Ps(o, s), a = t.collapsedItems.has(i);
    r.push(
      Ze.node(s, s + o.nodeSize, {
        class: `collapsible-list-item ${a ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": i
      })
    );
    const c = o.firstChild;
    if (c && c.type.name === "paragraph") {
      const l = s + 1 + c.nodeSize - 1, u = Ze.widget(
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
          const g = document.createElement("button");
          return g.className = `collapsible-list-chevron ${a ? "collapsed" : "expanded"}`, g.setAttribute("data-list-item-id", i), g.setAttribute("contenteditable", "false"), g.setAttribute("tabindex", "-1"), g.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', g.title = a ? "Click to expand" : "Click to collapse", g.addEventListener("click", (h) => {
            h.preventDefault(), h.stopPropagation();
            const y = g.classList.contains("collapsed");
            g.classList.remove("collapsed", "expanded"), g.classList.add(y ? "expanded" : "collapsed"), g.title = y ? "Click to collapse" : "Click to expand", t.collapsedItems.has(i) ? t.collapsedItems.delete(i) : t.collapsedItems.add(i), mn && mn.dispatch(
              mn.state.tr.setMeta("collapsibleList", { toggled: i })
            );
          }), p.appendChild(g), p;
        },
        { side: 1, key: `list-chevron-${i}` }
      );
      r.push(u);
    }
    if (a && mb(o, s)) {
      let u = s + 1;
      o.forEach((d) => {
        ["bulletList", "orderedList", "taskList"].includes(d.type.name) && r.push(
          Ze.node(u, u + d.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), u += d.nodeSize;
      });
    }
    return !0;
  }), je.create(e, r);
}
const hb = Ue.create({
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
        if (!o || !this.options.listItemTypes.includes(o.type.name) || !ao(o))
          return !1;
        const s = Ps(o, e);
        return r.collapsedItems.has(s) ? r.collapsedItems.delete(s) : r.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((o, s) => {
          this.options.listItemTypes.includes(o.type.name) && ao(o) && n.collapsedItems.add(Ps(o, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Me({
        key: Ri,
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
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: Wr(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleList") ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: Wr(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : n.docChanged ? pb(o.doc, s.doc, t.listItemTypes) ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: Wr(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = Ri.getState(n);
            return r?.decorations ? r.decorations : Wr(n.doc, e, t);
          }
        }
      })
    ];
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
  return Bf(
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
const zr = {
  info: { icon: Qr, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: wc, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: bc, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: Xs, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: Zs, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" },
  summary: { icon: df, label: "Summary", color: "var(--callout-summary)", borderColor: "var(--callout-summary-border)" }
};
function gb({ node: e, updateAttributes: t, editor: n }) {
  const [r, o] = U(!1), [s, i] = U(!1), [a, c] = U(null), l = j(null), u = j(null), d = e.attrs.type || "info", f = zr[d] || zr.info, p = f.icon, g = B(() => {
    if (u.current) {
      const v = u.current.getBoundingClientRect();
      c({
        top: v.bottom + 4,
        left: v.left
      });
    }
  }, []);
  K(() => {
    if (!r) return;
    const v = (x) => {
      l.current && !l.current.contains(x.target) && u.current && !u.current.contains(x.target) && o(!1);
    };
    return document.addEventListener("mousedown", v), document.addEventListener("touchstart", v, { passive: !0 }), () => {
      document.removeEventListener("mousedown", v), document.removeEventListener("touchstart", v);
    };
  }, [r]), K(() => {
    if (!r) return;
    const v = () => o(!1);
    return window.addEventListener("scroll", v, !0), () => window.removeEventListener("scroll", v, !0);
  }, [r]);
  const h = B(() => {
    n.isEditable && (r || g(), o(!r));
  }, [n.isEditable, r, g]), y = (v) => {
    t({ type: v }), o(!1);
  }, b = B((v) => {
    v.stopPropagation(), i((x) => !x);
  }, []);
  return /* @__PURE__ */ I(vn, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
    /* @__PURE__ */ I(
      "div",
      {
        className: "callout-header",
        onClick: b,
        style: { cursor: "pointer", userSelect: "none", WebkitUserSelect: "none" },
        title: s ? "Click to expand" : "Click to collapse",
        children: [
          /* @__PURE__ */ I(
            "button",
            {
              ref: u,
              className: "callout-header-button",
              onClick: (v) => {
                v.stopPropagation(), h();
              },
              title: n.isEditable ? "Click to change callout type" : f.label,
              style: { color: f.borderColor, userSelect: "none", WebkitUserSelect: "none" },
              children: [
                /* @__PURE__ */ m(p, { size: 18 }),
                /* @__PURE__ */ m("span", { className: "callout-label", children: f.label }),
                n.isEditable && /* @__PURE__ */ m(Lt, { size: 12, className: "callout-type-chevron" })
              ]
            }
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: "callout-collapse-indicator",
              style: { color: f.borderColor },
              children: s ? /* @__PURE__ */ m(xc, { size: 16 }) : /* @__PURE__ */ m(Lt, { size: 16 })
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
              children: Object.keys(zr).map((v) => {
                const x = zr[v], S = x.icon;
                return /* @__PURE__ */ I(
                  "button",
                  {
                    className: `callout-type-option ${v === d ? "active" : ""}`,
                    onClick: (w) => {
                      w.stopPropagation(), y(v);
                    },
                    onMouseDown: (w) => w.stopPropagation(),
                    style: { "--callout-option-color": x.color },
                    children: [
                      /* @__PURE__ */ m(S, { size: 16, style: { color: x.borderColor } }),
                      /* @__PURE__ */ m("span", { children: x.label })
                    ]
                  },
                  v
                );
              })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ m("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ m(Hs, {}) })
  ] });
}
const yb = yo.create({
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
    return fo(gb, {
      update: ({ oldNode: e, newNode: t, updateProps: n }) => (e.attrs.type !== t.attrs.type && n(), !0)
    });
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
}), vb = cm.extend({
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
  addProseMirrorPlugins() {
    return [
      new Me({
        key: new Te("resizableImageCopy"),
        props: {
          handleDOMEvents: {
            copy(e, t) {
              const { state: n } = e;
              if (!(n.selection instanceof _f)) return !1;
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
      const i = (L) => {
        const H = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[L] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${H}`;
      };
      i(t.attrs.align || "left");
      const a = document.createElement("img");
      a.alt = t.attrs.alt || "", t.attrs.width && (a.style.width = `${t.attrs.width}px`);
      const c = (L) => !(!L || L.startsWith("data:") || L.startsWith("blob:") || L.startsWith("http://") || L.startsWith("https://")), l = (L) => {
        c(L) && e.resolveImageSrc ? (a.style.opacity = "0.5", a.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(L).then((H) => {
          a.src = H, a.style.opacity = "1";
        }).catch(() => {
          a.src = L, a.style.opacity = "1";
        })) : a.src = L;
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
      const p = (L, H, q) => {
        const F = document.createElement("button");
        return F.setAttribute("type", "button"), F.style.cssText = `
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
        `, F.innerHTML = `${H}<span>${L}</span>`, F.addEventListener("mouseenter", () => {
          F.style.background = "oklch(0.95 0 0)";
        }), F.addEventListener("mouseleave", () => {
          F.style.background = "transparent";
        }), F.addEventListener("click", (Y) => {
          Y.preventDefault(), Y.stopPropagation(), q(), f.style.display = "none", N = !1;
        }), F;
      }, g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', h = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', y = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(p("Edit", g, () => {
        const L = typeof r == "function" ? r() : null;
        if (L != null && e.onImageClick) {
          const H = a.getBoundingClientRect();
          e.onImageClick({
            src: o.attrs.src,
            alt: o.attrs.alt || "",
            pos: L,
            rect: H
          });
        }
      })), f.appendChild(p("Copy image", h, async () => {
        const L = o.attrs.src;
        try {
          const q = await (await fetch(L)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [q.type]: q })
          ]);
        } catch {
          try {
            const H = new window.Image();
            H.crossOrigin = "anonymous", await new Promise((Y, G) => {
              H.onload = () => Y(), H.onerror = () => G(new Error("Image load failed")), H.src = L;
            });
            const q = document.createElement("canvas");
            q.width = H.naturalWidth, q.height = H.naturalHeight;
            const F = q.getContext("2d");
            if (F) {
              F.drawImage(H, 0, 0);
              const Y = await new Promise(
                (G) => q.toBlob(G, "image/png")
              );
              Y ? await navigator.clipboard.write([
                new ClipboardItem({ "image/png": Y })
              ]) : await navigator.clipboard.writeText(L);
            }
          } catch {
            try {
              await navigator.clipboard.writeText(L);
            } catch {
            }
          }
        }
      })), f.appendChild(p("Copy URL", b, async () => {
        const L = o.attrs.src;
        try {
          await navigator.clipboard.writeText(L);
        } catch {
        }
      })), f.appendChild(p("Save image", y, () => {
        const L = o.attrs.src, H = o.attrs.alt || "image", q = document.createElement("a");
        q.href = L, q.download = H, q.target = "_blank", q.rel = "noopener noreferrer", document.body.appendChild(q), q.click(), setTimeout(() => {
          document.body.removeChild(q);
        }, 100);
      }));
      const v = document.createElement("div");
      v.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, f.appendChild(v);
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
      ], M = [], E = (L) => {
        M.forEach((H) => {
          (H.getAttribute("data-align-value") || "left") === L ? (H.style.background = "oklch(1 0 0)", H.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", H.style.color = "oklch(0.25 0 0)", H.style.fontWeight = "600") : (H.style.background = "transparent", H.style.boxShadow = "none", H.style.color = "oklch(0.5 0 0)", H.style.fontWeight = "400");
        });
      };
      w.forEach(({ value: L, label: H, icon: q }) => {
        const F = document.createElement("button");
        F.setAttribute("type", "button"), F.setAttribute("data-align-value", L), F.setAttribute("title", `Align ${H.toLowerCase()}`), F.style.cssText = `
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
        `, F.innerHTML = `${q}<span>${H}</span>`, F.addEventListener("click", (Y) => {
          Y.preventDefault(), Y.stopPropagation();
          const G = typeof r == "function" ? r() : null;
          if (G != null)
            try {
              const { state: W, dispatch: J } = n.view, _ = W.doc.nodeAt(G);
              if (_ && _.type.name === "resizableImage") {
                const ee = W.tr.setNodeMarkup(G, void 0, {
                  ..._.attrs,
                  align: L
                });
                J(ee);
              }
            } catch {
              n.chain().focus().setNodeSelection(G).updateAttributes("resizableImage", {
                align: L
              }).run();
            }
          E(L);
        }), M.push(F), S.appendChild(F);
      }), f.appendChild(S);
      const k = () => {
        const L = o.attrs.align || "left";
        E(L);
      };
      let N = !1;
      d.addEventListener("click", (L) => {
        if (L.preventDefault(), L.stopPropagation(), N)
          f.style.display = "none", N = !1;
        else {
          const H = d.getBoundingClientRect(), q = 200, F = f.closest('[role="dialog"]');
          let Y = 0, G = 0;
          if (F) {
            const de = F.getBoundingClientRect();
            Y = de.left, G = de.top;
          }
          let W = H.bottom + 4 - G, J = H.right - q - Y;
          const _ = window.innerHeight, ee = window.innerWidth, ne = 200;
          H.bottom + 4 + ne > _ && (W = H.top - ne - 4 - G), J + Y < 8 && (J = 8 - Y), J + q + Y > ee - 8 && (J = ee - q - 8 - Y), f.style.top = `${W}px`, f.style.left = `${J}px`, f.style.display = "flex", N = !0, k();
        }
      });
      const C = (L) => {
        !f.contains(L.target) && !d.contains(L.target) && (f.style.display = "none", N = !1);
      };
      document.addEventListener("click", C);
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
      const A = s.closest('[role="dialog"]');
      A ? A.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        u.style.opacity = "1", d.style.opacity = "1", D.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        u.style.opacity = "0", D.style.opacity = "0", N || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const P = (L) => {
        L.preventDefault(), L.stopPropagation();
        const H = document.createElement("div");
        H.style.cssText = `
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
        const q = document.createElement("img");
        q.src = a.src, q.alt = a.alt || "", q.style.cssText = `
          max-width: 95vw;
          max-height: 92vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
          transform: scale(0.92);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        `;
        const F = document.createElement("button");
        F.setAttribute("type", "button"), F.setAttribute("aria-label", "Close"), F.style.cssText = `
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
        `, F.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>', F.addEventListener("mouseenter", () => {
          F.style.background = "rgba(255, 255, 255, 0.25)";
        }), F.addEventListener("mouseleave", () => {
          F.style.background = "rgba(255, 255, 255, 0.15)";
        });
        const Y = o.attrs.alt;
        let G = null;
        Y && Y.trim() && (G = document.createElement("div"), G.style.cssText = `
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
          `, G.textContent = Y);
        const W = () => {
          H.style.opacity = "0", q.style.transform = "scale(0.92)", setTimeout(() => H.remove(), 200);
        };
        H.addEventListener("click", (ee) => {
          ee.target === H && W();
        }), F.addEventListener("click", W);
        const J = (ee) => {
          ee.key === "Escape" && (W(), document.removeEventListener("keydown", J));
        };
        document.addEventListener("keydown", J), H.appendChild(q), H.appendChild(F), G && H.appendChild(G);
        const _ = s.closest('[role="dialog"]');
        _ ? _.appendChild(H) : document.body.appendChild(H), requestAnimationFrame(() => {
          H.style.opacity = "1", q.style.transform = "scale(1)";
        });
      };
      D.addEventListener("click", P);
      let O, $;
      const z = (L) => {
        L.preventDefault(), O = L.clientX, $ = a.offsetWidth, document.addEventListener("mousemove", V), document.addEventListener("mouseup", R);
      }, V = (L) => {
        const H = L.clientX - O, q = Math.max(100, $ + H);
        a.style.width = `${q}px`;
      }, R = () => {
        document.removeEventListener("mousemove", V), document.removeEventListener("mouseup", R), setTimeout(() => {
        }, 100);
        const L = typeof r == "function" ? r() : null, H = a.offsetWidth;
        if (L != null)
          try {
            const { state: q, dispatch: F } = n.view, Y = q.doc.nodeAt(L);
            if (Y && Y.type.name === "resizableImage") {
              const G = q.tr.setNodeMarkup(L, void 0, {
                ...Y.attrs,
                width: H
              });
              F(G);
            }
          } catch {
            n.chain().focus().setNodeSelection(L).updateAttributes("resizableImage", {
              width: H
            }).run();
          }
      };
      return u.addEventListener("mousedown", z), {
        dom: s,
        update: (L) => L.type.name !== "resizableImage" ? !1 : (o = L, l(L.attrs.src), a.alt = L.attrs.alt || "", L.attrs.width && (a.style.width = `${L.attrs.width}px`), i(L.attrs.align || "left"), !0),
        destroy: () => {
          u.removeEventListener("mousedown", z), D.removeEventListener("click", P), document.removeEventListener("click", C), f.remove();
        }
      };
    };
  }
});
function bb(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const wb = {}, zn = {};
function Yt(e, t) {
  try {
    const r = (wb[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in zn ? zn[r] : Oi(r, r.split(":"));
  } catch {
    if (e in zn) return zn[e];
    const n = e?.match(xb);
    return n ? Oi(e, n.slice(1)) : NaN;
  }
}
const xb = /([+-]\d\d):?(\d\d)?/;
function Oi(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return zn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class rt extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Yt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Su(this), Os(this)) : this.setTime(Date.now());
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
    const t = -Yt(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Os(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new rt(+new Date(t), this.timeZone);
  }
  //#endregion
}
const _i = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!_i.test(e)) return;
  const t = e.replace(_i, "$1UTC");
  rt.prototype[t] && (e.startsWith("get") ? rt.prototype[e] = function() {
    return this.internal[t]();
  } : (rt.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), kb(this), +this;
  }, rt.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Os(this), +this;
  }));
});
function Os(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Yt(e.timeZone, e) * 60));
}
function kb(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Su(e);
}
function Su(e) {
  const t = Yt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - s, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const u = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, d = Math.round(-(Yt(e.timeZone, e) * 60)) % 60;
  (d || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + u));
  const f = Yt(e.timeZone, e), p = f > 0 ? Math.floor(f) : Math.ceil(f), h = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - p, y = p !== n, b = h - c;
  if (y && b) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + b);
    const v = Yt(e.timeZone, e), x = v > 0 ? Math.floor(v) : Math.ceil(v), S = p - x;
    S && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + S), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + S));
  }
}
class Le extends rt {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Le(...n, t) : new Le(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${bb(this.timeZone, this)})`;
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
    return new Le(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Le(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Eu = 6048e5, Cb = 864e5, $i = Symbol.for("constructDateFrom");
function Ce(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && $i in e ? e[$i](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function he(e, t) {
  return Ce(t || e, e);
}
function Du(e, t, n) {
  const r = he(e, n?.in);
  return isNaN(t) ? Ce(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Nu(e, t, n) {
  const r = he(e, n?.in);
  if (isNaN(t)) return Ce(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), s = Ce(e, r.getTime());
  s.setMonth(r.getMonth() + t + 1, 0);
  const i = s.getDate();
  return o >= i ? s : (r.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    o
  ), r);
}
let Mb = {};
function sr() {
  return Mb;
}
function xn(e, t) {
  const n = sr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = he(e, t?.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function Qn(e, t) {
  return xn(e, { ...t, weekStartsOn: 1 });
}
function Au(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = Ce(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = Qn(o), i = Ce(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = Qn(i);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function Hi(e) {
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
function Dn(e, ...t) {
  const n = Ce.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Jn(e, t) {
  const n = he(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Lu(e, t, n) {
  const [r, o] = Dn(
    n?.in,
    e,
    t
  ), s = Jn(r), i = Jn(o), a = +s - Hi(s), c = +i - Hi(i);
  return Math.round((a - c) / Cb);
}
function Tb(e, t) {
  const n = Au(e, t), r = Ce(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Qn(r);
}
function Sb(e, t, n) {
  return Du(e, t * 7, n);
}
function Eb(e, t, n) {
  return Nu(e, t * 12, n);
}
function Db(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ce.bind(null, o));
    const s = he(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), Ce(r, n || NaN);
}
function Nb(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Ce.bind(null, o));
    const s = he(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), Ce(r, n || NaN);
}
function Ab(e, t, n) {
  const [r, o] = Dn(
    n?.in,
    e,
    t
  );
  return +Jn(r) == +Jn(o);
}
function Iu(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Lb(e) {
  return !(!Iu(e) && typeof e != "number" || isNaN(+he(e)));
}
function Ib(e, t, n) {
  const [r, o] = Dn(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return s * 12 + i;
}
function Rb(e, t) {
  const n = he(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Ru(e, t) {
  const [n, r] = Dn(e, t.start, t.end);
  return { start: n, end: r };
}
function Pb(e, t) {
  const { start: n, end: r } = Ru(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Ce(n, i)), i.setMonth(i.getMonth() + a);
  return o ? c.reverse() : c;
}
function Ob(e, t) {
  const n = he(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function _b(e, t) {
  const n = he(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Pu(e, t) {
  const n = he(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function $b(e, t) {
  const { start: n, end: r } = Ru(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const c = [];
  for (; +i <= s; )
    c.push(Ce(n, i)), i.setFullYear(i.getFullYear() + a);
  return o ? c.reverse() : c;
}
function Ou(e, t) {
  const n = sr(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = he(e, t?.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function Hb(e, t) {
  return Ou(e, { ...t, weekStartsOn: 1 });
}
const Wb = {
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
}, zb = (e, t, n) => {
  let r;
  const o = Wb[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function cs(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Bb = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Fb = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Ub = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Yb = {
  date: cs({
    formats: Bb,
    defaultWidth: "full"
  }),
  time: cs({
    formats: Fb,
    defaultWidth: "full"
  }),
  dateTime: cs({
    formats: Ub,
    defaultWidth: "full"
  })
}, jb = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Vb = (e, t, n, r) => jb[e];
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
const Kb = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Gb = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, qb = {
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
}, Xb = {
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
}, Zb = {
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
}, Qb = {
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
}, Jb = (e, t) => {
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
}, ew = {
  ordinalNumber: Jb,
  era: On({
    values: Kb,
    defaultWidth: "wide"
  }),
  quarter: On({
    values: Gb,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: On({
    values: qb,
    defaultWidth: "wide"
  }),
  day: On({
    values: Xb,
    defaultWidth: "wide"
  }),
  dayPeriod: On({
    values: Zb,
    defaultWidth: "wide",
    formattingValues: Qb,
    defaultFormattingWidth: "wide"
  })
};
function _n(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(a) ? nw(a, (d) => d.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      tw(a, (d) => d.test(i))
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
function tw(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function nw(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function rw(e) {
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
const ow = /^(\d+)(th|st|nd|rd)?/i, sw = /\d+/i, aw = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, iw = {
  any: [/^b/i, /^(a|c)/i]
}, cw = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, lw = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, uw = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, dw = {
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
}, fw = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, mw = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, pw = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, hw = {
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
}, gw = {
  ordinalNumber: rw({
    matchPattern: ow,
    parsePattern: sw,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: _n({
    matchPatterns: aw,
    defaultMatchWidth: "wide",
    parsePatterns: iw,
    defaultParseWidth: "any"
  }),
  quarter: _n({
    matchPatterns: cw,
    defaultMatchWidth: "wide",
    parsePatterns: lw,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: _n({
    matchPatterns: uw,
    defaultMatchWidth: "wide",
    parsePatterns: dw,
    defaultParseWidth: "any"
  }),
  day: _n({
    matchPatterns: fw,
    defaultMatchWidth: "wide",
    parsePatterns: mw,
    defaultParseWidth: "any"
  }),
  dayPeriod: _n({
    matchPatterns: pw,
    defaultMatchWidth: "any",
    parsePatterns: hw,
    defaultParseWidth: "any"
  })
}, Ea = {
  code: "en-US",
  formatDistance: zb,
  formatLong: Yb,
  formatRelative: Vb,
  localize: ew,
  match: gw,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function yw(e, t) {
  const n = he(e, t?.in);
  return Lu(n, Pu(n)) + 1;
}
function _u(e, t) {
  const n = he(e, t?.in), r = +Qn(n) - +Tb(n);
  return Math.round(r / Eu) + 1;
}
function $u(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = sr(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = Ce(t?.in || e, 0);
  i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = xn(i, t), c = Ce(t?.in || e, 0);
  c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
  const l = xn(c, t);
  return +n >= +a ? r + 1 : +n >= +l ? r : r - 1;
}
function vw(e, t) {
  const n = sr(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = $u(e, t), s = Ce(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), xn(s, t);
}
function Hu(e, t) {
  const n = he(e, t?.in), r = +xn(n, t) - +vw(n, t);
  return Math.round(r / Eu) + 1;
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
}, an = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Wi = {
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
    const o = $u(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return pe(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : pe(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Au(e);
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
    const o = Hu(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : pe(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = _u(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : pe(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : St.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = yw(e);
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
    switch (r === 12 ? o = an.noon : r === 0 ? o = an.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = an.evening : r >= 12 ? o = an.afternoon : r >= 4 ? o = an.morning : o = an.night, t) {
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
        return Bi(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Bt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Bt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Bi(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Bt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Bt(r, ":");
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
        return "GMT" + zi(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Bt(r, ":");
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
        return "GMT" + zi(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Bt(r, ":");
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
function zi(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + pe(s, 2);
}
function Bi(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + pe(Math.abs(e) / 60, 2) : Bt(e, t);
}
function Bt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = pe(Math.trunc(r / 60), 2), s = pe(r % 60, 2);
  return n + o + t + s;
}
const Fi = (e, t) => {
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
}, Wu = (e, t) => {
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
}, bw = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Fi(e, t);
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
  return s.replace("{{date}}", Fi(r, t)).replace("{{time}}", Wu(o, t));
}, ww = {
  p: Wu,
  P: bw
}, xw = /^D+$/, kw = /^Y+$/, Cw = ["D", "DD", "YY", "YYYY"];
function Mw(e) {
  return xw.test(e);
}
function Tw(e) {
  return kw.test(e);
}
function Sw(e, t, n) {
  const r = Ew(e, t, n);
  if (console.warn(r), Cw.includes(e)) throw new RangeError(r);
}
function Ew(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Dw = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Nw = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Aw = /^'([^]*?)'?$/, Lw = /''/g, Iw = /[a-zA-Z]/;
function Rw(e, t, n) {
  const r = sr(), o = n?.locale ?? r.locale ?? Ea, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = he(e, n?.in);
  if (!Lb(a))
    throw new RangeError("Invalid time value");
  let c = t.match(Nw).map((u) => {
    const d = u[0];
    if (d === "p" || d === "P") {
      const f = ww[d];
      return f(u, o.formatLong);
    }
    return u;
  }).join("").match(Dw).map((u) => {
    if (u === "''")
      return { isToken: !1, value: "'" };
    const d = u[0];
    if (d === "'")
      return { isToken: !1, value: Pw(u) };
    if (Wi[d])
      return { isToken: !0, value: u };
    if (d.match(Iw))
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
    (!n?.useAdditionalWeekYearTokens && Tw(d) || !n?.useAdditionalDayOfYearTokens && Mw(d)) && Sw(d, t, String(e));
    const f = Wi[d[0]];
    return f(a, d, o.localize, l);
  }).join("");
}
function Pw(e) {
  const t = e.match(Aw);
  return t ? t[1].replace(Lw, "'") : e;
}
function Ow(e, t) {
  const n = he(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = Ce(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function _w(e, t) {
  return he(e, t?.in).getMonth();
}
function $w(e, t) {
  return he(e, t?.in).getFullYear();
}
function Hw(e, t) {
  return +he(e) > +he(t);
}
function Ww(e, t) {
  return +he(e) < +he(t);
}
function zw(e, t, n) {
  const [r, o] = Dn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Bw(e, t, n) {
  const [r, o] = Dn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Fw(e, t, n) {
  const r = he(e, n?.in), o = r.getFullYear(), s = r.getDate(), i = Ce(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const a = Ow(i);
  return r.setMonth(t, Math.min(s, a)), r;
}
function Uw(e, t, n) {
  const r = he(e, n?.in);
  return isNaN(+r) ? Ce(e, NaN) : (r.setFullYear(t), r);
}
const Ui = 5, Yw = 4;
function jw(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, Ui * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Ui : Yw;
}
function zu(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Vw(e, t) {
  const n = zu(e, t), r = jw(e, t);
  return t.addDays(n, r * 7 - 1);
}
class Fe {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Le.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new Le(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : Du(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Nu(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : Sb(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : Eb(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Lu(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Ib(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Pb(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : $b(r), s = new Set(o.map((a) => this.getYear(a)));
      if (s.size === o.length)
        return o;
      const i = [];
      return s.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Vw(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Hb(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : Rb(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Ou(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : _b(r), this.format = (r, o, s) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : Rw(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : _u(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : _w(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : $w(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Hu(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : Hw(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : Ww(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Iu(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : Ab(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : zw(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : Bw(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Db(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Nb(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : Fw(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : Uw(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : zu(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : Jn(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Qn(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : Ob(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : xn(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : Pu(r), this.options = { locale: Ea, ...t }, this.overrides = n;
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
    return t && Fe.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && Fe.yearFirstLocales.has(s))
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
Fe.yearFirstLocales = /* @__PURE__ */ new Set([
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
const it = new Fe();
class Bu {
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
class Kw {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Gw {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function qw(e) {
  return X.createElement("button", { ...e });
}
function Xw(e) {
  return X.createElement("span", { ...e });
}
function Zw(e) {
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
function Qw(e) {
  const { day: t, modifiers: n, ...r } = e;
  return X.createElement("td", { ...r });
}
function Jw(e) {
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
var Xe;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Xe || (Xe = {}));
var We;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(We || (We = {}));
function e0(e) {
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
function t0(e) {
  return X.createElement("div", { ...e });
}
function n0(e) {
  return X.createElement("div", { ...e });
}
function r0(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r }, e.children);
}
function o0(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return X.createElement("div", { ...r });
}
function s0(e) {
  return X.createElement("table", { ...e });
}
function a0(e) {
  return X.createElement("div", { ...e });
}
const Fu = mc(void 0);
function ar() {
  const e = pc(Fu);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function i0(e) {
  const { components: t } = ar();
  return X.createElement(t.Dropdown, { ...e });
}
function c0(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: c, labelNext: l } } = ar(), u = B((f) => {
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
function l0(e) {
  const { components: t } = ar();
  return X.createElement(t.Button, { ...e });
}
function u0(e) {
  return X.createElement("option", { ...e });
}
function d0(e) {
  const { components: t } = ar();
  return X.createElement(t.Button, { ...e });
}
function f0(e) {
  const { rootRef: t, ...n } = e;
  return X.createElement("div", { ...n, ref: t });
}
function m0(e) {
  return X.createElement("select", { ...e });
}
function p0(e) {
  const { week: t, ...n } = e;
  return X.createElement("tr", { ...n });
}
function h0(e) {
  return X.createElement("th", { ...e });
}
function g0(e) {
  return X.createElement(
    "thead",
    { "aria-hidden": !0 },
    X.createElement("tr", { ...e })
  );
}
function y0(e) {
  const { week: t, ...n } = e;
  return X.createElement("th", { ...n });
}
function v0(e) {
  return X.createElement("th", { ...e });
}
function b0(e) {
  return X.createElement("tbody", { ...e });
}
function w0(e) {
  const { components: t } = ar();
  return X.createElement(t.Dropdown, { ...e });
}
const x0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: qw,
  CaptionLabel: Xw,
  Chevron: Zw,
  Day: Qw,
  DayButton: Jw,
  Dropdown: e0,
  DropdownNav: t0,
  Footer: n0,
  Month: r0,
  MonthCaption: o0,
  MonthGrid: s0,
  Months: a0,
  MonthsDropdown: i0,
  Nav: c0,
  NextMonthButton: l0,
  Option: u0,
  PreviousMonthButton: d0,
  Root: f0,
  Select: m0,
  Week: p0,
  WeekNumber: y0,
  WeekNumberHeader: v0,
  Weekday: h0,
  Weekdays: g0,
  Weeks: b0,
  YearsDropdown: w0
}, Symbol.toStringTag, { value: "Module" }));
function dt(e, t, n = !1, r = it) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return o && s ? (i(s, o) < 0 && ([o, s] = [s, o]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : !1;
}
function Uu(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Da(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Yu(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function ju(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Vu(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Ku(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function ft(e, t, n = it) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return o(e, a);
    if (Ku(a, n))
      return a.includes(e);
    if (Da(a))
      return dt(a, e, !1, n);
    if (Vu(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (Uu(a)) {
      const c = s(a.before, e), l = s(a.after, e), u = c > 0, d = l < 0;
      return i(a.before, a.after) ? d && u : u || d;
    }
    return Yu(a) ? s(e, a.after) > 0 : ju(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function k0(e, t, n, r, o) {
  const { disabled: s, hidden: i, modifiers: a, showOutsideDays: c, broadcastCalendar: l, today: u } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: g, endOfMonth: h, isAfter: y } = o, b = n && p(n), v = r && h(r), x = {
    [ge.focused]: [],
    [ge.outside]: [],
    [ge.disabled]: [],
    [ge.hidden]: [],
    [ge.today]: []
  }, S = {};
  for (const w of e) {
    const { date: M, displayMonth: E } = w, k = !!(E && !f(M, E)), N = !!(b && g(M, b)), C = !!(v && y(M, v)), D = !!(s && ft(M, s, o)), A = !!(i && ft(M, i, o)) || N || C || // Broadcast calendar will show outside days as default
    !l && !c && k || l && c === !1 && k, P = d(M, u ?? o.today());
    k && x.outside.push(w), D && x.disabled.push(w), A && x.hidden.push(w), P && x.today.push(w), a && Object.keys(a).forEach((O) => {
      const $ = a?.[O];
      $ && ft(M, $, o) && (S[O] ? S[O].push(w) : S[O] = [w]);
    });
  }
  return (w) => {
    const M = {
      [ge.focused]: !1,
      [ge.disabled]: !1,
      [ge.hidden]: !1,
      [ge.outside]: !1,
      [ge.today]: !1
    }, E = {};
    for (const k in x) {
      const N = x[k];
      M[k] = N.some((C) => C === w);
    }
    for (const k in S)
      E[k] = S[k].some((N) => N === w);
    return {
      ...M,
      // custom modifiers should override all the previous ones
      ...E
    };
  };
}
function C0(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[ge[s]] ? o.push(t[ge[s]]) : t[Xe[s]] && o.push(t[Xe[s]]), o), [t[te.Day]]);
}
function M0(e) {
  return {
    ...x0,
    ...e
  };
}
function T0(e) {
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
function Na() {
  const e = {};
  for (const t in te)
    e[te[t]] = `rdp-${te[t]}`;
  for (const t in ge)
    e[ge[t]] = `rdp-${ge[t]}`;
  for (const t in Xe)
    e[Xe[t]] = `rdp-${Xe[t]}`;
  for (const t in We)
    e[We[t]] = `rdp-${We[t]}`;
  return e;
}
function Gu(e, t, n) {
  return (n ?? new Fe(t)).formatMonthYear(e);
}
const S0 = Gu;
function E0(e, t, n) {
  return (n ?? new Fe(t)).format(e, "d");
}
function D0(e, t = it) {
  return t.format(e, "LLLL");
}
function N0(e, t, n) {
  return (n ?? new Fe(t)).format(e, "cccccc");
}
function A0(e, t = it) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function L0() {
  return "";
}
function qu(e, t = it) {
  return t.format(e, "yyyy");
}
const I0 = qu, R0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Gu,
  formatDay: E0,
  formatMonthCaption: S0,
  formatMonthDropdown: D0,
  formatWeekNumber: A0,
  formatWeekNumberHeader: L0,
  formatWeekdayName: N0,
  formatYearCaption: I0,
  formatYearDropdown: qu
}, Symbol.toStringTag, { value: "Module" }));
function P0(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...R0,
    ...e
  };
}
function O0(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: i(e),
    end: a(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, o), g = l(f), h = t && f < s(t) || n && f > s(n) || !1;
    return { value: g, label: p, disabled: h };
  });
}
function _0(e, t = {}, n = {}) {
  let r = { ...t?.[te.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function $0(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(o, i);
    s.push(a);
  }
  return s;
}
function H0(e, t, n, r, o = !1) {
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
function Xu(e, t, n, r) {
  let o = (r ?? new Fe(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const W0 = Xu;
function Zu(e, t, n) {
  return (n ?? new Fe(t)).formatMonthYear(e);
}
const z0 = Zu;
function B0(e, t, n, r) {
  let o = (r ?? new Fe(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function F0(e) {
  return "Choose the Month";
}
function U0() {
  return "";
}
function Y0(e) {
  return "Go to the Next Month";
}
function j0(e) {
  return "Go to the Previous Month";
}
function V0(e, t, n) {
  return (n ?? new Fe(t)).format(e, "cccc");
}
function K0(e, t) {
  return `Week ${e}`;
}
function G0(e) {
  return "Week Number";
}
function q0(e) {
  return "Choose the Year";
}
const X0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: z0,
  labelDay: W0,
  labelDayButton: Xu,
  labelGrid: Zu,
  labelGridcell: B0,
  labelMonthDropdown: F0,
  labelNav: U0,
  labelNext: Y0,
  labelPrevious: j0,
  labelWeekNumber: K0,
  labelWeekNumberHeader: G0,
  labelWeekday: V0,
  labelYearDropdown: q0
}, Symbol.toStringTag, { value: "Module" })), ir = (e) => e instanceof HTMLElement ? e : null, ls = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Z0 = (e) => ir(e.querySelector("[data-animated-month]")), us = (e) => ir(e.querySelector("[data-animated-caption]")), ds = (e) => ir(e.querySelector("[data-animated-weeks]")), Q0 = (e) => ir(e.querySelector("[data-animated-nav]")), J0 = (e) => ir(e.querySelector("[data-animated-weekdays]"));
function ex(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const i = j(null), a = j(r), c = j(!1);
  mo(() => {
    const l = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const u = s.isSameMonth(r[0].date, l[0].date), d = s.isAfter(r[0].date, l[0].date), f = d ? n[We.caption_after_enter] : n[We.caption_before_enter], p = d ? n[We.weeks_after_enter] : n[We.weeks_before_enter], g = i.current, h = e.current.cloneNode(!0);
    if (h instanceof HTMLElement ? (ls(h).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const S = Z0(x);
      S && x.contains(S) && x.removeChild(S);
      const w = us(x);
      w && w.classList.remove(f);
      const M = ds(x);
      M && M.classList.remove(p);
    }), i.current = h) : i.current = null, c.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = g instanceof HTMLElement ? ls(g) : [], b = ls(e.current);
    if (b?.every((v) => v instanceof HTMLElement) && y && y.every((v) => v instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const v = Q0(e.current);
      v && (v.style.zIndex = "1"), b.forEach((x, S) => {
        const w = y[S];
        if (!w)
          return;
        x.style.position = "relative", x.style.overflow = "hidden";
        const M = us(x);
        M && M.classList.add(f);
        const E = ds(x);
        E && E.classList.add(p);
        const k = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), M && M.classList.remove(f), E && E.classList.remove(p), x.style.position = "", x.style.overflow = "", x.contains(w) && x.removeChild(w);
        };
        w.style.pointerEvents = "none", w.style.position = "absolute", w.style.overflow = "hidden", w.setAttribute("aria-hidden", "true");
        const N = J0(w);
        N && (N.style.opacity = "0");
        const C = us(w);
        C && (C.classList.add(d ? n[We.caption_before_exit] : n[We.caption_after_exit]), C.addEventListener("animationend", k));
        const D = ds(w);
        D && D.classList.add(d ? n[We.weeks_before_exit] : n[We.weeks_after_exit]), x.insertBefore(w, x.firstChild);
      });
    }
  });
}
function tx(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: g, endOfWeek: h, isAfter: y, startOfBroadcastWeek: b, startOfISOWeek: v, startOfWeek: x } = r, S = c ? b(o, r) : i ? v(o) : x(o), w = c ? f(s) : i ? p(g(s)) : h(g(s)), M = u(w, S), E = d(s, o) + 1, k = [];
  for (let D = 0; D <= M; D++) {
    const A = l(S, D);
    if (t && y(A, t))
      break;
    k.push(A);
  }
  const C = (c ? 35 : 42) * E;
  if (a && k.length < C) {
    const D = C - k.length;
    for (let A = 0; A < D; A++) {
      const P = l(k[k.length - 1], 1);
      k.push(P);
    }
  }
  return k;
}
function nx(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, i) => s.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function rx(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let i = 0; i < o; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    s.push(a);
  }
  return s;
}
function Yi(e, t, n, r) {
  const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let c = o || s || i;
  const { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
  if (n && l(n, c) < a - 1) {
    const f = -1 * (a - 1);
    c = u(n, f);
  }
  return t && l(c, t) < 0 && (c = t), d(c);
}
function ox(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, g = e.reduce((h, y) => {
    const b = n.broadcastCalendar ? d(y, r) : n.ISOWeek ? f(y) : p(y), v = n.broadcastCalendar ? s(y) : n.ISOWeek ? i(a(y)) : c(a(y)), x = t.filter((E) => E >= b && E <= v), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < S) {
      const E = t.filter((k) => {
        const N = S - x.length;
        return k > v && k <= o(v, N);
      });
      x.push(...E);
    }
    const w = x.reduce((E, k) => {
      const N = n.ISOWeek ? l(k) : u(k), C = E.find((A) => A.weekNumber === N), D = new Bu(k, y, r);
      return C ? C.days.push(D) : E.push(new Gw(N, [D])), E;
    }, []), M = new Kw(y, w);
    return h.push(M), h;
  }, []);
  return n.reverseMonths ? g.reverse() : g;
}
function sx(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: g, toMonth: h } = e;
  !n && g && (n = g), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && p && (r = u(p, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : f ? n = u(f, 0, 1) : !n && y && (n = o(c(e.today ?? d(), -100))), r ? r = a(r) : p ? r = u(p, 11, 31) : !r && y && (r = l(e.today ?? d())), [
    n && s(n),
    r && s(r)
  ];
}
function ax(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s : 1, u = i(e);
  if (!t)
    return a(u, l);
  if (!(c(t, e) < s))
    return a(u, l);
}
function ix(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, l = o ? s ?? 1 : 1, u = i(e);
  if (!t)
    return a(u, -l);
  if (!(c(u, t) <= 0))
    return a(u, -l);
}
function cx(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Ao(e, t) {
  const [n, r] = U(e);
  return [t === void 0 ? n : t, r];
}
function lx(e, t) {
  const [n, r] = sx(e, t), { startOfMonth: o, endOfMonth: s } = t, i = Yi(e, n, r, t), [a, c] = Ao(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  K(() => {
    const M = Yi(e, n, r, t);
    c(M);
  }, [e.timeZone]);
  const l = rx(a, r, e, t), u = tx(l, e.endMonth ? s(e.endMonth) : void 0, e, t), d = ox(l, u, e, t), f = cx(d), p = nx(d), g = ix(a, n, e, t), h = ax(a, r, e, t), { disableNavigation: y, onMonthChange: b } = e, v = (M) => f.some((E) => E.days.some((k) => k.isEqualTo(M))), x = (M) => {
    if (y)
      return;
    let E = o(M);
    n && E < o(n) && (E = o(n)), r && E > o(r) && (E = o(r)), c(E), b?.(E);
  };
  return {
    months: d,
    weeks: f,
    days: p,
    navStart: n,
    navEnd: r,
    previousMonth: g,
    nextMonth: h,
    goToMonth: x,
    goToDay: (M) => {
      v(M) || x(M.date);
    }
  };
}
var et;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(et || (et = {}));
function ji(e) {
  return !e[ge.disabled] && !e[ge.hidden] && !e[ge.outside];
}
function ux(e, t, n, r) {
  let o, s = -1;
  for (const i of e) {
    const a = t(i);
    ji(a) && (a[ge.focused] && s < et.FocusedModifier ? (o = i, s = et.FocusedModifier) : r?.isEqualTo(i) && s < et.LastFocused ? (o = i, s = et.LastFocused) : n(i.date) && s < et.Selected ? (o = i, s = et.Selected) : a[ge.today] && s < et.Today && (o = i, s = et.Today));
  }
  return o || (o = e.find((i) => ji(t(i)))), o;
}
function dx(e, t, n, r, o, s, i) {
  const { ISOWeek: a, broadcastCalendar: c } = s, { addDays: l, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: g, endOfWeek: h, max: y, min: b, startOfBroadcastWeek: v, startOfISOWeek: x, startOfWeek: S } = i;
  let M = {
    day: l,
    week: d,
    month: u,
    year: f,
    startOfWeek: (E) => c ? v(E, i) : a ? x(E) : S(E),
    endOfWeek: (E) => c ? p(E) : a ? g(E) : h(E)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? M = y([r, M]) : t === "after" && o && (M = b([o, M])), M;
}
function Qu(e, t, n, r, o, s, i, a = 0) {
  if (a > 365)
    return;
  const c = dx(e, t, n.date, r, o, s, i), l = !!(s.disabled && ft(c, s.disabled, i)), u = !!(s.hidden && ft(c, s.hidden, i)), d = c, f = new Bu(c, d, i);
  return !l && !u ? f : Qu(e, t, f, r, o, s, i, a + 1);
}
function fx(e, t, n, r, o) {
  const { autoFocus: s } = e, [i, a] = U(), c = ux(t.days, n, r || (() => !1), i), [l, u] = U(s ? c : void 0);
  return {
    isFocusTarget: (h) => !!c?.isEqualTo(h),
    setFocused: u,
    focused: l,
    blur: () => {
      a(l), u(void 0);
    },
    moveFocus: (h, y) => {
      if (!l)
        return;
      const b = Qu(h, y, l, t.navStart, t.navEnd, e, o);
      b && (e.disableNavigation && !t.days.some((x) => x.isEqualTo(b)) || (t.goToDay(b), u(b)));
    }
  };
}
function mx(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Ao(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t, l = (p) => a?.some((g) => c(g, p)) ?? !1, { min: u, max: d } = e;
  return {
    selected: a,
    select: (p, g, h) => {
      let y = [...a ?? []];
      if (l(p)) {
        if (a?.length === u || r && a?.length === 1)
          return;
        y = a?.filter((b) => !c(b, p));
      } else
        a?.length === d ? y = [p] : y = [...y, p];
      return o || i(y), o?.(y, p, g, h), y;
    },
    isSelected: l
  };
}
function px(e, t, n = 0, r = 0, o = !1, s = it) {
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
function hx(e, t, n = it) {
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
function Vi(e, t, n = it) {
  return dt(e, t.from, !1, n) || dt(e, t.to, !1, n) || dt(t, e.from, !1, n) || dt(t, e.to, !1, n);
}
function gx(e, t, n = it) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? dt(e, a, !1, n) : Ku(a, n) ? a.some((c) => dt(e, c, !1, n)) : Da(a) ? a.from && a.to ? Vi(e, { from: a.from, to: a.to }, n) : !1 : Vu(a) ? hx(e, a.dayOfWeek, n) : Uu(a) ? n.isAfter(a.before, a.after) ? Vi(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : ft(e.from, a, n) || ft(e.to, a, n) : Yu(a) || ju(a) ? ft(e.from, a, n) || ft(e.to, a, n) : !1))
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
function yx(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, c] = Ao(o, i ? o : void 0), l = i ? o : a;
  return {
    selected: l,
    select: (f, p, g) => {
      const { min: h, max: y } = e, b = f ? px(f, l, h, y, s, t) : void 0;
      return r && n && b?.from && b.to && gx({ from: b.from, to: b.to }, n, t) && (b.from = f, b.to = void 0), i || c(b), i?.(b, f, p, g), b;
    },
    isSelected: (f) => l && dt(l, f, !1, t)
  };
}
function vx(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, i] = Ao(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t;
  return {
    selected: a,
    select: (d, f, p) => {
      let g = d;
      return !r && a && a && c(d, a) && (g = void 0), o || i(g), o?.(g, d, f, p), g;
    },
    isSelected: (d) => a ? c(a, d) : !1
  };
}
function bx(e, t) {
  const n = vx(e, t), r = mx(e, t), o = yx(e, t);
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
function wx(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Le(t.today, t.timeZone)), t.month && (t.month = new Le(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Le(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Le(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Le(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Le(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ce) => new Le(ce, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Le(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Le(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = Nt(() => {
    const ce = { ...Ea, ...t.locale };
    return {
      dateLib: new Fe({
        locale: ce,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: M0(t.components),
      formatters: P0(t.formatters),
      labels: { ...X0, ...t.labels },
      locale: ce,
      classNames: { ...Na(), ...t.classNames }
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
  ]), { captionLayout: c, mode: l, navLayout: u, numberOfMonths: d = 1, onDayBlur: f, onDayClick: p, onDayFocus: g, onDayKeyDown: h, onDayMouseEnter: y, onDayMouseLeave: b, onNextClick: v, onPrevClick: x, showWeekNumber: S, styles: w } = t, { formatCaption: M, formatDay: E, formatMonthDropdown: k, formatWeekNumber: N, formatWeekNumberHeader: C, formatWeekdayName: D, formatYearDropdown: A } = r, P = lx(t, s), { days: O, months: $, navStart: z, navEnd: V, previousMonth: R, nextMonth: L, goToMonth: H } = P, q = k0(O, t, z, V, s), { isSelected: F, select: Y, selected: G } = bx(t, s) ?? {}, { blur: W, focused: J, isFocusTarget: _, moveFocus: ee, setFocused: ne } = fx(t, P, q, F ?? (() => !1), s), { labelDayButton: de, labelGridcell: we, labelGrid: be, labelMonthDropdown: Oe, labelNav: wt, labelPrevious: Ot, labelNext: Nn, labelWeekday: An, labelWeekNumber: cr, labelWeekNumberHeader: lr, labelYearDropdown: ur } = o, dr = Nt(() => $0(s, t.ISOWeek), [s, t.ISOWeek]), Ln = l !== void 0 || p !== void 0, xt = B(() => {
    R && (H(R), x?.(R));
  }, [R, H, x]), Qt = B(() => {
    L && (H(L), v?.(L));
  }, [H, L, v]), fr = B((ce, fe) => (re) => {
    re.preventDefault(), re.stopPropagation(), ne(ce), Y?.(ce.date, fe, re), p?.(ce.date, fe, re);
  }, [Y, p, ne]), mr = B((ce, fe) => (re) => {
    ne(ce), g?.(ce.date, fe, re);
  }, [g, ne]), pr = B((ce, fe) => (re) => {
    W(), f?.(ce.date, fe, re);
  }, [W, f]), Io = B((ce, fe) => (re) => {
    const me = {
      ArrowLeft: [
        re.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        re.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [re.shiftKey ? "year" : "week", "after"],
      ArrowUp: [re.shiftKey ? "year" : "week", "before"],
      PageUp: [re.shiftKey ? "year" : "month", "before"],
      PageDown: [re.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (me[re.key]) {
      re.preventDefault(), re.stopPropagation();
      const [Re, ue] = me[re.key];
      ee(Re, ue);
    }
    h?.(ce.date, fe, re);
  }, [ee, h, t.dir]), Ro = B((ce, fe) => (re) => {
    y?.(ce.date, fe, re);
  }, [y]), Po = B((ce, fe) => (re) => {
    b?.(ce.date, fe, re);
  }, [b]), Oo = B((ce) => (fe) => {
    const re = Number(fe.target.value), me = s.setMonth(s.startOfMonth(ce), re);
    H(me);
  }, [s, H]), _o = B((ce) => (fe) => {
    const re = Number(fe.target.value), me = s.setYear(s.startOfMonth(ce), re);
    H(me);
  }, [s, H]), { className: hr, style: $o } = Nt(() => ({
    className: [a[te.Root], t.className].filter(Boolean).join(" "),
    style: { ...w?.[te.Root], ...t.style }
  }), [a, t.className, t.style, w]), Ho = T0(t), gr = j(null);
  ex(gr, !!t.animate, {
    classNames: a,
    months: $,
    focused: J,
    dateLib: s
  });
  const In = {
    dayPickerProps: t,
    selected: G,
    select: Y,
    isSelected: F,
    months: $,
    nextMonth: L,
    previousMonth: R,
    goToMonth: H,
    getModifiers: q,
    components: n,
    classNames: a,
    styles: w,
    labels: o,
    formatters: r
  };
  return X.createElement(
    Fu.Provider,
    { value: In },
    X.createElement(
      n.Root,
      { rootRef: t.animate ? gr : void 0, className: hr, style: $o, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Ho },
      X.createElement(
        n.Months,
        { className: a[te.Months], style: w?.[te.Months] },
        !t.hideNavigation && !u && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[te.Nav], style: w?.[te.Nav], "aria-label": wt(), onPreviousClick: xt, onNextClick: Qt, previousMonth: R, nextMonth: L }),
        $.map((ce, fe) => X.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[te.Month],
            style: w?.[te.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: fe,
            displayIndex: fe,
            calendarMonth: ce
          },
          u === "around" && !t.hideNavigation && fe === 0 && X.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[te.PreviousMonthButton], tabIndex: R ? void 0 : -1, "aria-disabled": R ? void 0 : !0, "aria-label": Ot(R), onClick: xt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: R ? void 0 : !0, className: a[te.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          X.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[te.MonthCaption], style: w?.[te.MonthCaption], calendarMonth: ce, displayIndex: fe }, c?.startsWith("dropdown") ? X.createElement(
            n.DropdownNav,
            { className: a[te.Dropdowns], style: w?.[te.Dropdowns] },
            (() => {
              const re = c === "dropdown" || c === "dropdown-months" ? X.createElement(n.MonthsDropdown, { key: "month", className: a[te.MonthsDropdown], "aria-label": Oe(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Oo(ce.date), options: O0(ce.date, z, V, r, s), style: w?.[te.Dropdown], value: s.getMonth(ce.date) }) : X.createElement("span", { key: "month" }, k(ce.date, s)), me = c === "dropdown" || c === "dropdown-years" ? X.createElement(n.YearsDropdown, { key: "year", className: a[te.YearsDropdown], "aria-label": ur(s.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: _o(ce.date), options: H0(z, V, r, s, !!t.reverseYears), style: w?.[te.Dropdown], value: s.getYear(ce.date) }) : X.createElement("span", { key: "year" }, A(ce.date, s));
              return s.getMonthYearOrder() === "year-first" ? [me, re] : [re, me];
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
            } }, M(ce.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            X.createElement(n.CaptionLabel, { className: a[te.CaptionLabel], role: "status", "aria-live": "polite" }, M(ce.date, s.options, s))
          )),
          u === "around" && !t.hideNavigation && fe === d - 1 && X.createElement(
            n.NextMonthButton,
            { type: "button", className: a[te.NextMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": Nn(L), onClick: Qt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: L ? void 0 : !0, className: a[te.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          fe === d - 1 && u === "after" && !t.hideNavigation && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[te.Nav], style: w?.[te.Nav], "aria-label": wt(), onPreviousClick: xt, onNextClick: Qt, previousMonth: R, nextMonth: L }),
          X.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": be(ce.date, s.options, s) || void 0, className: a[te.MonthGrid], style: w?.[te.MonthGrid] },
            !t.hideWeekdays && X.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[te.Weekdays], style: w?.[te.Weekdays] },
              S && X.createElement(n.WeekNumberHeader, { "aria-label": lr(s.options), className: a[te.WeekNumberHeader], style: w?.[te.WeekNumberHeader], scope: "col" }, C()),
              dr.map((re) => X.createElement(n.Weekday, { "aria-label": An(re, s.options, s), className: a[te.Weekday], key: String(re), style: w?.[te.Weekday], scope: "col" }, D(re, s.options, s)))
            ),
            X.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[te.Weeks], style: w?.[te.Weeks] }, ce.weeks.map((re) => X.createElement(
              n.Week,
              { className: a[te.Week], key: re.weekNumber, style: w?.[te.Week], week: re },
              S && // biome-ignore lint/a11y/useSemanticElements: react component
              X.createElement(n.WeekNumber, { week: re, style: w?.[te.WeekNumber], "aria-label": cr(re.weekNumber, {
                locale: i
              }), className: a[te.WeekNumber], scope: "row", role: "rowheader" }, N(re.weekNumber, s)),
              re.days.map((me) => {
                const { date: Re } = me, ue = q(me);
                if (ue[ge.focused] = !ue.hidden && !!J?.isEqualTo(me), ue[Xe.selected] = F?.(Re) || ue.selected, Da(G)) {
                  const { from: _t, to: kt } = G;
                  ue[Xe.range_start] = !!(_t && kt && s.isSameDay(Re, _t)), ue[Xe.range_end] = !!(_t && kt && s.isSameDay(Re, kt)), ue[Xe.range_middle] = dt(G, Re, !0, s);
                }
                const Jt = _0(ue, w, t.modifiersStyles), Wo = C0(ue, a, t.modifiersClassNames), yr = !Ln && !ue.hidden ? we(Re, ue, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  X.createElement(n.Day, { key: `${s.format(Re, "yyyy-MM-dd")}_${s.format(me.displayMonth, "yyyy-MM")}`, day: me, modifiers: ue, className: Wo.join(" "), style: Jt, role: "gridcell", "aria-selected": ue.selected || void 0, "aria-label": yr, "data-day": s.format(Re, "yyyy-MM-dd"), "data-month": me.outside ? s.format(Re, "yyyy-MM") : void 0, "data-selected": ue.selected || void 0, "data-disabled": ue.disabled || void 0, "data-hidden": ue.hidden || void 0, "data-outside": me.outside || void 0, "data-focused": ue.focused || void 0, "data-today": ue.today || void 0 }, !ue.hidden && Ln ? X.createElement(n.DayButton, { className: a[te.DayButton], style: w?.[te.DayButton], type: "button", day: me, modifiers: ue, disabled: ue.disabled || void 0, tabIndex: _(me) ? 0 : -1, "aria-label": de(Re, ue, s.options, s), onClick: fr(me, ue), onBlur: pr(me, ue), onFocus: mr(me, ue), onKeyDown: Io(me, ue), onMouseEnter: Ro(me, ue), onMouseLeave: Po(me, ue) }, E(Re, s.options, s)) : !ue.hidden && E(me.date, s.options, s))
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
function xx({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: s,
  components: i,
  ...a
}) {
  const c = Na();
  return /* @__PURE__ */ m(
    wx,
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
          Ds({ variant: o }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          c.button_previous
        ),
        button_next: ae(
          Ds({ variant: o }),
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
        Chevron: ({ className: l, orientation: u, ...d }) => u === "left" ? /* @__PURE__ */ m(ff, { className: ae("size-4", l), ...d }) : u === "right" ? /* @__PURE__ */ m(
          mf,
          {
            className: ae("size-4", l),
            ...d
          }
        ) : /* @__PURE__ */ m(pf, { className: ae("size-4", l), ...d }),
        DayButton: kx,
        WeekNumber: ({ children: l, ...u }) => /* @__PURE__ */ m("td", { ...u, children: /* @__PURE__ */ m("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: l }) }),
        ...i
      },
      ...a
    }
  );
}
function kx({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Na(), s = T.useRef(null);
  return T.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), /* @__PURE__ */ m(
    At,
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
let pn = null;
const Ju = /* @__PURE__ */ new Map(), Cx = /* @__PURE__ */ new Map();
function Zr() {
  if (!pn) return;
  const e = pn;
  pn = null, setTimeout(() => {
    try {
      e.root.unmount();
    } catch {
    }
    e.container.remove();
  }, 0);
}
function Mx(e) {
  return pn?.pillDate === e;
}
function Tx({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: r,
  onClose: o
}) {
  const s = j(null), i = Lo(e);
  K(() => {
    const v = (x) => {
      x.key === "Escape" && (x.stopPropagation(), x.preventDefault(), o());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [o]), K(() => {
    const v = (S) => {
      s.current && !s.current.contains(S.target) && (S.target.closest(".date-pill") || o());
    }, x = setTimeout(() => {
      document.addEventListener("mousedown", v, !0);
    }, 50);
    return () => {
      clearTimeout(x), document.removeEventListener("mousedown", v, !0);
    };
  }, [o]);
  const a = B((v) => {
    v && r(gn(v)), o();
  }, [r, o]), c = B((v) => {
    const x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + v), r(gn(x)), o();
  }, [r, o]), l = B(() => {
    const x = (/* @__PURE__ */ new Date()).getDay(), S = x === 0 ? 1 : 8 - x, w = /* @__PURE__ */ new Date();
    w.setDate(w.getDate() + S), r(gn(w)), o();
  }, [r, o]), u = /* @__PURE__ */ new Date(), d = u.toDateString(), f = new Date(u);
  f.setDate(f.getDate() + 1);
  const p = f.toDateString(), g = u.getDay(), h = g === 0 ? 1 : 8 - g, y = new Date(u);
  y.setDate(y.getDate() + h);
  const b = y.toDateString();
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
            xx,
            {
              mode: "single",
              selected: i,
              onSelect: a
            }
          ) }),
          /* @__PURE__ */ m("div", { className: "border-t border-border" }),
          /* @__PURE__ */ I("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ m(
              At,
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
              At,
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
              At,
              {
                variant: "outline",
                size: "sm",
                className: ae(
                  "rounded-full text-xs",
                  i.toDateString() === b && "ring-2 ring-primary"
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
function Sx(e, t, n) {
  if (Mx(t)) {
    Zr();
    return;
  }
  Zr();
  const r = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, i = 320, a = 420, c = 10, l = 16, u = s - r.bottom - c - l, d = r.top - c - l, f = u >= a ? "below" : d >= a ? "above" : u >= d ? "below" : "above";
  let p;
  f === "below" ? p = r.bottom + c : p = r.top - a - c;
  const g = r.left + r.width / 2;
  let h = g - i / 2;
  h + i > o - l && (h = o - i - l), h < l && (h = l);
  const y = document.createElement("div");
  y.setAttribute("data-date-picker-standalone", t), y.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(y), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((w) => {
    y.addEventListener(w, (M) => {
      M.stopPropagation();
    }, !1);
  });
  const v = lm(y);
  pn = { container: y, root: v, pillDate: t };
  const x = () => {
    Zr();
  }, S = (w) => {
    const M = Ju.get(t);
    M && M(w);
  };
  v.render(
    /* @__PURE__ */ m(
      Tx,
      {
        currentDate: t,
        theme: n,
        position: { top: p, left: h, direction: f, pillCenter: g },
        onSelectDate: S,
        onClose: x
      }
    )
  );
}
function Ex({ node: e, updateAttributes: t, selected: n }) {
  const r = j(null), o = e.attrs.date || hn(), s = ed(o), i = Aa(o), a = B(() => {
    if (!r.current) return "";
    const c = r.current.closest(".markdown-editor-container");
    if (c) {
      const u = c.getAttribute("data-theme");
      if (u) return u;
    }
    return r.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return K(() => (Ju.set(o, (c) => {
    t({ date: c });
  }), Cx.set(o, a), () => {
  }), [o, t, a]), K(() => {
    const c = r.current;
    if (!c) return;
    const l = (u) => {
      u.preventDefault(), u.stopPropagation();
      const d = c.getAttribute("data-date") || hn(), f = a();
      Sx(c, d, f);
    };
    return c.addEventListener("click", l), () => c.removeEventListener("click", l);
  }, [a]), K(() => {
    const c = r.current?.closest(".ProseMirror") || document, l = () => {
      pn && Zr();
    };
    return c.addEventListener("scroll", l, { passive: !0 }), () => {
      c.removeEventListener("scroll", l);
    };
  }, []), /* @__PURE__ */ m(vn, { as: "span", className: "inline", children: /* @__PURE__ */ I(
    "span",
    {
      ref: r,
      className: `date-pill ${i} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": o,
      children: [
        /* @__PURE__ */ m(kc, { size: 14, className: "date-icon" }),
        /* @__PURE__ */ m("span", { className: "date-text", children: s })
      ]
    }
  ) });
}
function Lo(e) {
  const t = e.split("-");
  if (t.length === 3)
    return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]));
  const n = new Date(e);
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function hn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Yn(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function gn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function ed(e) {
  const t = Lo(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
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
function Dx(e) {
  return Lo(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function Ft(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return hn();
  if (n === "tomorrow") return Yn(1);
  if (n === "yesterday") return Yn(-1);
  if (n === "next monday") {
    const a = (/* @__PURE__ */ new Date()).getDay(), c = a === 0 ? 1 : 8 - a;
    return Yn(c);
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
      return gn(u);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const i = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return gn(i);
  }
  return null;
}
function Aa(e) {
  const t = Lo(e), n = /* @__PURE__ */ new Date(), r = new Date(n.getFullYear(), n.getMonth(), n.getDate()), o = new Date(r);
  return o.setDate(o.getDate() + 7), t.getTime() === r.getTime() ? "date-today" : t < r ? "date-overdue" : t <= o ? "date-upcoming" : "";
}
const Nx = new Te("datePillPaste"), Ax = yo.create({
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
        default: hn(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, r = ed(n), o = Aa(n);
    return [
      "span",
      kn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${o}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, r]
    ];
  },
  addNodeView() {
    return fo(Ex, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || hn();
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
    const e = new _e({
      find: /@today\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(hn()).run();
      }
    }), t = new _e({
      find: /@tomorrow\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(Yn(1)).run();
      }
    }), n = new _e({
      find: /@yesterday\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(Yn(-1)).run();
      }
    }), r = new _e({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), o = new _e({
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
          const h = (/* @__PURE__ */ new Date()).getFullYear(), y = new Date(h, g, parseInt(f[2], 10));
          d().deleteRange(u).insertDatePill(gn(y)).run();
        }
      }
    }), s = new _e({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Ft(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), i = new _e({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Ft(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), a = new _e({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), c = new _e({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Ft(f[1]);
        p && d().deleteRange(u).insertDatePill(p).run();
      }
    }), l = new _e({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const p = Ft(f[1]);
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
      new Me({
        key: Nx,
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
              if (Ft(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, p = [];
            let g = 0;
            const h = new RegExp(i.source, i.flags);
            let y;
            for (; (y = h.exec(o)) !== null; ) {
              const S = y[1], w = Ft(S);
              if (w) {
                const M = o.slice(g, y.index);
                M && p.push(f.text(M)), p.push(e.create({ date: w })), g = y.index + y[0].length;
              }
            }
            const b = o.slice(g);
            if (b && p.push(f.text(b)), p.length === 0) return !1;
            const v = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, p)
            ), { $from: x } = u.selection;
            if (x.parent.type.name === "paragraph") {
              const S = d;
              let w = u.selection.from;
              for (const M of p)
                S.insert(w, M), w += M.nodeSize;
              S.delete(u.selection.from, u.selection.to), t.dispatch(S);
            } else
              d.replaceSelectionWith(v), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), qe = /* @__PURE__ */ new Map();
function Lx({ node: e, selected: t, editor: n, getPos: r, deleteNode: o }) {
  const s = j(null), i = j(null), a = e.attrs.tag || "", c = j(!1), [l, u] = U(() => qe.has(a)), [d, f] = U(() => qe.get(a)?.value ?? a);
  K(() => {
    l || f(a);
  }, [a, l]), K(() => {
    if (l) {
      const v = qe.get(a);
      qe.set(a, {
        value: d,
        focusedAt: v?.focusedAt ?? Date.now()
      });
    }
  }, [l, d, a]);
  const p = B((v) => {
    if (c.current) return;
    c.current = !0;
    const x = v.trim().replace(/^#/, ""), S = jn(x);
    if (qe.delete(a), S && qe.delete(S), !S || !ln(S))
      o();
    else if (S !== a) {
      const w = r();
      if (typeof w == "number" && n) {
        const { tr: M } = n.state, E = e.nodeSize;
        M.delete(w, w + E), M.insert(w, n.schema.nodes.tagPill.create({ tag: S })), n.view.dispatch(M);
      }
    } else
      qe.delete(a);
    u(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [a, n, r, o, e.nodeSize]), g = B(() => {
    n && !n.isEditable || (qe.set(a, { value: a, focusedAt: Date.now() }), f(a), u(!0), c.current = !1);
  }, [n, a]);
  K(() => {
    const v = s.current;
    if (!v || l) return;
    const x = (w) => {
      w.preventDefault(), w.stopPropagation(), g();
    }, S = (w) => {
      w.preventDefault(), w.stopPropagation();
    };
    return v.addEventListener("dblclick", x), v.addEventListener("click", S), () => {
      v.removeEventListener("dblclick", x), v.removeEventListener("click", S);
    };
  }, [l, n, r, g]), K(() => {
    if (l) {
      const v = requestAnimationFrame(() => {
        if (i.current) {
          i.current.focus(), i.current.select();
          const x = qe.get(a);
          x && (x.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(v);
    }
  }, [l, a]);
  const h = B((v) => {
    v.key === "Enter" ? (v.preventDefault(), p(d)) : v.key === "Escape" && (v.preventDefault(), qe.delete(a), u(!1), c.current = !0, n?.commands.focus());
  }, [p, d, a, n]), y = B(() => {
    const x = qe.get(a)?.focusedAt ?? 0;
    Date.now() - x > 300 && p(d);
  }, [p, d, a]), b = B((v) => {
    f(v.target.value);
  }, []);
  return l ? /* @__PURE__ */ m(vn, { as: "span", className: "inline", children: /* @__PURE__ */ I(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ m(Za, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ m(
          "input",
          {
            ref: i,
            type: "text",
            className: "tag-pill-input",
            value: d,
            onChange: b,
            onKeyDown: h,
            onBlur: y,
            spellCheck: !1,
            autoComplete: "off"
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ m(vn, { as: "span", className: "inline", children: /* @__PURE__ */ I(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": a,
      children: [
        /* @__PURE__ */ m(Za, { size: 14, className: "tag-icon", strokeWidth: 2.5 }),
        /* @__PURE__ */ m("span", { className: "tag-text", children: a })
      ]
    }
  ) });
}
function ln(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function jn(e) {
  return e.toLowerCase().trim();
}
const Ix = new Te("tagPillPaste"), Rx = yo.create({
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
    return fo(Lx, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = jn(e);
        return ln(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return this.options.enableAutoDetect ? [new _e({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: r }) => {
        const o = jn(r[1]);
        if (ln(o)) {
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
      new Me({
        key: Ix,
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
              if (ln(c[1])) {
                a = !0;
                break;
              }
            if (!a) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, p = [];
            let g = 0;
            const h = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let y;
            for (; (y = h.exec(o)) !== null; ) {
              const x = jn(y[1]);
              if (ln(x)) {
                const S = y[0], w = S.startsWith(" ") || S.startsWith(`
`) ? 1 : 0, M = o.slice(g, y.index + w);
                M && p.push(f.text(M)), p.push(e.create({ tag: x })), g = y.index + S.length;
              }
            }
            const b = o.slice(g);
            if (b && p.push(f.text(b)), p.length === 0) return !1;
            const { $from: v } = u.selection;
            if (v.parent.type.name === "paragraph") {
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
}), Px = /\[\[([^\[\]]+)\]\]$/, Ox = Ac.create({
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
      new _e({
        find: Px,
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
}), ut = {
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
}, _x = ["info", "note", "prompt", "resources", "todo", "summary"];
function $x(e) {
  return e.length < 3 ? !1 : !!(ut.header.test(e) || ut.bold.test(e) || ut.list.test(e) || ut.taskList.test(e) || ut.codeBlock.test(e) || ut.callout.test(e) || ut.highlight.test(e) || ut.link.test(e) || ut.table.test(e));
}
function Hx(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", r = "left", o = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? o = t[1] : ["left", "center", "right"].includes(t[1]) && (r = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (r = t[1]), /^\d+$/.test(t[2]) && (o = t[2])), { alt: n, align: r, width: o };
}
function Wx(e, t) {
  const { alt: n, align: r, width: o } = Hx(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[r] || "margin-right: auto;", i = o ? ` width="${o}" style="width: ${o}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${r}"${i} /></figure>`;
}
function io(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Ki(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${io(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, r = e.split(n).filter((s) => s.trim()), o = [];
  for (const s of r) {
    const i = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    i ? o.push(Wx(i[1], i[2])) : o.push(`<p>${io(s.trim())}</p>`);
  }
  return o.join("");
}
function td(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^[-*+]\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^[-*+]\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^\d+\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[1].trim() } : null;
}
function nd(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", u = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, d = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += u; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${io(f.text)}</p>` : i += `<li><p>${io(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
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
function Gi(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:[-*+] |\d+\. )/i.test(e);
  if (!t && !n)
    return Ki(e);
  const r = e.split(/<br\s*\/?>/i).filter((a) => a.trim()), o = [];
  let s = [];
  const i = () => {
    s.length !== 0 && (o.push(nd(s)), s = []);
  };
  for (const a of r) {
    const c = td(a);
    if (c) {
      if (s.length > 0) {
        const l = s[0].type;
        c.depth === 0 && c.type !== l && i();
      }
      s.push(c);
    } else
      i(), o.push(Ki(a.trim()));
  }
  return i(), o.join("");
}
function zx(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const r = t[0].split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  if (r.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let i = "<table><thead><tr>";
  for (const a of r)
    i += "<th>" + Gi(a) + "</th>";
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
        i += "<td>" + Gi(d) + "</td>";
      }
      i += "</tr>";
    }
  }
  return i += "</tbody></table>", i;
}
function Bx(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, r = [];
  t = t.replace(n, (d) => {
    const f = d.split(`
`);
    if (f.length >= 2) {
      const p = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(p) && p.includes("-")) {
        const g = zx(d);
        if (g) {
          const h = `MANUSTABLEPLACEHOLDER${r.length}END`;
          return r.push(g), h;
        }
      }
    }
    return d;
  });
  const o = [];
  t = t.replace(/```(ad-\w+)\s*\n([\s\S]*?)```/g, (d, f, p) => {
    const g = f.replace("ad-", "");
    let h = p.trim();
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), h = h.replace(/__([^_]+)__/g, "<strong>$1</strong>"), h = h.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), h = h.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), h = h.replace(/`([^`]+)`/g, "<code>$1</code>"), h.startsWith("<") || (h = `<p>${h}</p>`);
    const y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<div data-callout="" data-type="${g}" class="callout callout-${g}">${h}</div>`), y;
  }), _x.forEach((d) => {
    const f = new RegExp(`\`\`\`${d}\\s*\\n([\\s\\S]*?)\`\`\``, "g");
    t = t.replace(f, (p, g) => {
      let h = g.trim();
      h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), h = h.replace(/__([^_]+)__/g, "<strong>$1</strong>"), h = h.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), h = h.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), h = h.replace(/`([^`]+)`/g, "<code>$1</code>"), h.startsWith("<") || (h = `<p>${h}</p>`);
      const y = `MANUSCODEPLACEHOLDER${o.length}END`;
      return o.push(`<div data-callout="" data-type="${d}" class="callout callout-${d}">${h}</div>`), y;
    });
  }), t = t.replace(/```([\w-]*)\n([\s\S]*?)```/g, (d, f, p) => {
    const g = f || "plaintext", h = p.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), y = `MANUSCODEPLACEHOLDER${o.length}END`;
    return o.push(`<pre><code class="language-${g}">${h}</code></pre>`), y;
  }), t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  const s = t.split(`
`), i = [];
  let a = [];
  const c = () => {
    a.length !== 0 && (i.push(nd(a)), a = []);
  };
  for (const d of s) {
    const f = td(d);
    if (f) {
      if (a.length > 0) {
        const g = a[0].type, h = Math.min(...a.map((y) => y.depth));
        f.depth === h && f.type !== g && c();
      }
      a.push(f);
      continue;
    }
    c();
    let p = d;
    p = p.replace(/^(#{1,6})\s+(.+)$/, (g, h, y) => {
      const b = h.length;
      return `<h${b}>${y}</h${b}>`;
    }), p = p.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), p = p.replace(/^[-*_]{3,}$/, "<hr>"), i.push(p);
  }
  c(), t = i.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (d, f, p) => {
    const g = f.split("|").map((x) => x.trim());
    let h = "", y = "left", b = null;
    g.length === 1 ? h = g[0] : g.length === 2 ? (h = g[0], /^\d+$/.test(g[1]) ? b = g[1] : ["left", "center", "right"].includes(g[1]) ? y = g[1] : h = f) : g.length === 3 ? (h = g[0], ["left", "center", "right"].includes(g[1]) && (y = g[1]), /^\d+$/.test(g[2]) && (b = g[2])) : h = f;
    const v = b ? ` width="${b}" style="width: ${b}px"` : "";
    return `<img src="${p.trim()}" alt="${h}" data-align="${y}"${v}>`;
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
const Fx = Ue.create({
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
      new Me({
        key: new Te("markdownPaste"),
        props: {
          handlePaste(t, n, r) {
            const o = n.clipboardData;
            if (!o) return !1;
            const s = o.getData("text/html");
            if (s && s.trim())
              return !1;
            const i = o.getData("text/plain");
            if (!i || !$x(i))
              return !1;
            n.preventDefault();
            const a = Bx(i);
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
}), qi = new Te("collapsibleHeading");
function Ux(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function co(e, t) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return e.descendants((o, s) => {
    if (o.type.name === "heading" && t.includes(o.attrs.level)) {
      const i = o.attrs.level, a = o.textContent.slice(0, 50), c = `h${i}-${a}`, l = r.get(c) ?? 0;
      r.set(c, l + 1), n.set(s, Ux(i, a, l));
    }
  }), n;
}
let yn = null;
function Br(e, t, n) {
  const r = [], o = co(e, n.levels), s = [];
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
        Ze.node(u, u + l.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${l.attrs.level} ${f ? "is-collapsed" : "is-expanded"}${p ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": d,
          "data-heading-level": String(l.attrs.level)
        })
      );
      const g = Ze.widget(u + l.nodeSize - 1, () => {
        const h = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${d}"]`);
        if (h) {
          h.classList.contains("collapsed") !== f && (h.classList.remove("collapsed", "expanded"), h.classList.add(f ? "collapsed" : "expanded"), h.title = f ? "Click to expand" : "Click to collapse");
          const x = h.parentElement;
          if (x) return x;
        }
        const y = document.createElement("span");
        y.className = "collapsible-heading-chevron-wrapper", y.setAttribute("contenteditable", "false");
        const b = document.createElement("button");
        return b.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, b.setAttribute("data-heading-id", d), b.setAttribute("data-heading-level", String(l.attrs.level)), b.setAttribute("contenteditable", "false"), b.setAttribute("tabindex", "-1"), b.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', b.title = f ? "Click to expand" : "Click to collapse", b.addEventListener("click", (v) => {
          v.preventDefault(), v.stopPropagation();
          const x = b.classList.contains("collapsed");
          b.classList.remove("collapsed", "expanded"), b.classList.add(x ? "expanded" : "collapsed"), b.title = x ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(d) ? t.collapsedHeadings.delete(d) : t.collapsedHeadings.add(d), yn && yn.dispatch(yn.state.tr.setMeta("collapsibleHeading", { toggled: d }));
        }), y.appendChild(b), y;
      }, { side: 1, key: `chevron-${d}` });
      r.push(g);
    } else l.isBlock && c(u) && r.push(
      Ze.node(u, u + l.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), je.create(e, r);
}
function Yx(e, t, n, r) {
  if (n.collapsedHeadings.size === 0) return;
  const o = co(t, r), s = new Set(o.values()), i = [];
  n.collapsedHeadings.forEach((a) => {
    s.has(a) || i.push(a);
  });
  for (const a of i)
    n.collapsedHeadings.delete(a);
}
function jx(e, t, n) {
  const r = [], o = [];
  if (e.descendants((s) => {
    s.type.name === "heading" && n.includes(s.attrs.level) && r.push({ level: s.attrs.level, text: s.textContent.slice(0, 50) });
  }), t.descendants((s) => {
    s.type.name === "heading" && n.includes(s.attrs.level) && o.push({ level: s.attrs.level, text: s.textContent.slice(0, 50) });
  }), r.length !== o.length) return !0;
  for (let s = 0; s < r.length; s++)
    if (r[s].level !== o[s].level || r[s].text !== o[s].text) return !0;
  return !1;
}
const Vx = Ue.create({
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
        const i = co(n.doc, this.options.levels).get(e);
        return i ? (r.collapsedHeadings.has(i) ? r.collapsedHeadings.delete(i) : r.collapsedHeadings.add(i), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: i })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return co(t.doc, this.options.levels).forEach((o) => {
          n.collapsedHeadings.add(o);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new Me({
        key: qi,
        view(n) {
          return yn = n, {
            update(r) {
              yn = r;
            },
            destroy() {
              yn = null;
            }
          };
        },
        state: {
          init(n, r) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: Br(r.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, r, o, s) {
            return n.getMeta("collapsibleHeading") ? {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: Br(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : n.docChanged ? (Yx(o.doc, s.doc, e, t.levels), jx(o.doc, s.doc, t.levels) ? {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: Br(s.doc, e, t),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            }) : {
              ...r,
              decorations: r.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const r = qi.getState(n);
            return r?.decorations ? r.decorations : Br(n.doc, e, t);
          }
        }
      })
    ];
  }
}), Kx = /\[([^\]]+)\]\(([^)]+)\)$/, Gx = /^(https?:\/\/|www\.)[^\s]+$/i, qx = Ue.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new _e({
        find: Kx,
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
      new Me({
        key: new Te("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const r = n.clipboardData;
            if (!r) return !1;
            const o = r.getData("text/plain");
            if (!o) return !1;
            const s = o.trim();
            if (!Gx.test(s)) return !1;
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
}), Xx = ["info", "note", "prompt", "resources", "todo"], Zx = Ue.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Me({
        key: new Te("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: r } = t, { selection: o, doc: s } = r, { $from: i } = o, a = i.start();
            i.end();
            const c = s.textBetween(a, i.pos, ""), l = c.trim();
            for (const u of Xx)
              if (l === `\`\`\`${u}`) {
                n.preventDefault();
                const d = r.tr, f = a + c.indexOf("```");
                d.delete(f, i.pos);
                const p = e.schema.nodes.callout, g = e.schema.nodes.paragraph;
                if (p && g) {
                  const h = g.create(), y = p.create({ type: u }, Nc.from(h));
                  d.insert(f, y);
                  const b = d.doc.resolve(f + 2);
                  d.setSelection(Ve.near(b)), t.dispatch(d);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), Fr = new Te("searchHighlight"), Qx = Ue.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: r }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, r && r(n.setMeta(Fr, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Fr, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Me({
        key: Fr,
        state: {
          init() {
            return je.empty;
          },
          apply(t, n, r, o) {
            const { searchTerm: s, caseSensitive: i, useRegex: a, currentMatchIndex: c } = e, l = t.getMeta(Fr), u = t.docChanged;
            if (!s)
              return je.empty;
            if (!u && !l)
              return n.map(t.mapping, o.doc);
            const d = [];
            let f = 0;
            try {
              let p;
              if (a)
                p = new RegExp(s, i ? "g" : "gi");
              else {
                const g = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                p = new RegExp(g, i ? "g" : "gi");
              }
              o.doc.descendants((g, h) => {
                if (g.isText && g.text) {
                  let y;
                  for (; (y = p.exec(g.text)) !== null; ) {
                    const b = h + y.index, v = h + y.index + y[0].length, x = f === c;
                    d.push(
                      Ze.inline(b, v, {
                        class: x ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return je.empty;
            }
            return je.create(o.doc, d);
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
}), Jx = new Te("tabIndent");
function ek(e) {
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
function Xi(e, t) {
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
const tk = Ue.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new Me({
        key: Jx,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: r } = e, o = ek(n);
            if (!o)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[o];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!Ja(s)(n, r)) {
                const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
                l && Ja(l)(n, r);
              }
            } else if (ei(s)(n, r))
              Xi(e.state, r);
            else {
              const c = o === "taskItem" ? "listItem" : "taskItem", l = n.schema.nodes[c];
              l && ei(l)(n, r) && Xi(e.state, r);
            }
            return !0;
          }
        }
      })
    ];
  }
}), nk = new Te("expandSelection");
function fs(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const rk = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), rd = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), ok = "tableRow", sk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function ak(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).isTextblock) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function ik(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (sk.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function ck(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--)
    if (r.node(o).type.name === ok) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  return null;
}
function lk(e, t, n) {
  const r = e.resolve(t);
  for (let o = r.depth; o >= 1; o--) {
    const s = r.node(o);
    if (rd.has(s.type.name)) {
      const i = r.start(o), a = r.end(o);
      if (i < t || a > n)
        return { from: i, to: a };
    }
  }
  return null;
}
function uk(e, t, n) {
  const r = e.resolve(t);
  let o = -1;
  for (let a = r.depth; a >= 1; a--) {
    const c = r.node(a);
    rk.has(c.type.name) && (o = a);
  }
  if (o === -1) return null;
  const s = r.start(o), i = r.end(o);
  return s < t || i > n ? { from: s, to: i } : null;
}
function dk(e) {
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
function fk(e, t, n) {
  const r = e.filter((o) => o.from <= t && o.to >= n);
  return r.sort((o, s) => o.to - o.from - (s.to - s.from)), r;
}
function mk(e, t) {
  const n = e.resolve(t);
  for (let r = n.depth; r >= 1; r--)
    if (n.node(r).type.name === "table") return !0;
  return !1;
}
function pk(e, t, n) {
  let r = !1;
  return e.nodesBetween(t, n, (o) => rd.has(o.type.name) ? (r = !0, !1) : !0), r;
}
function hk(e, t, n) {
  const r = [];
  let o = t, s = n;
  const i = (c) => c && (c.from < o || c.to > s) ? (r.push(c), o = c.from, s = c.to, !0) : !1;
  i(ak(e, o, s)), mk(e, t) && (i(ik(e, o, s)), i(ck(e, o, s))), i(uk(e, o, s)), i(lk(e, o, s));
  const a = dk(e);
  if (a.length > 0) {
    const c = fk(a, o, s);
    for (const l of c)
      pk(e, l.from, l.to) ? l.from === 0 && l.to === e.content.size ? i({ from: 0, to: e.content.size, useSelectAll: !0 }) : i({ from: l.from, to: l.to, useSelectAll: !0 }) : i({ from: l.from, to: l.to });
  }
  return (o > 0 || s < e.content.size) && r.push({ from: 0, to: e.content.size, useSelectAll: !0 }), r;
}
const gk = Ue.create({
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
        if (t.expansionDepth > 0 && o === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), r instanceof $f || o === 0 && s === n.content.size)
          return !0;
        const a = hk(n, o, s);
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
              const l = n.resolve(c.from), u = n.resolve(c.to), d = e.state.tr, f = Ve.between(l, u);
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
      new Me({
        key: nk,
        props: {
          handleClick() {
            return fs(e), !1;
          },
          handleTextInput() {
            return fs(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && fs(e), !1;
          }
        }
      })
    ];
  }
}), yk = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function vk(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, r = parseInt(t.slice(2, 4), 16) / 255, o = parseInt(t.slice(4, 6), 16) / 255, s = (a) => a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(r) + 0.0722 * s(o) > 0.4;
}
const bk = new Te("hexColorDecoration");
function od(e, t, n) {
  const r = [];
  return e.nodesBetween(t, n, (o, s) => {
    if (!o.isText) return;
    const i = o.text || "";
    let a;
    const c = new RegExp(yk.source, "g");
    for (; (a = c.exec(i)) !== null; ) {
      const l = s + a.index, u = l + a[0].length;
      if (u >= t && l <= n) {
        const d = a[0], f = vk(d);
        r.push(
          Ze.inline(l, u, {
            class: "hex-color-swatch",
            style: `background-color: ${d}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), r;
}
function wk(e) {
  const t = od(e, 0, e.content.size);
  return je.create(e, t);
}
const xk = Ac.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Me({
        key: bk,
        state: {
          init(e, { doc: t }) {
            return wk(t);
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
              const i = od(e.doc, s.from, s.to);
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
}), Ne = new Te("selectAllOccurrences");
function Zi(e, t, n, r, o) {
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
  const n = Ne.getState(e.state);
  if (!n) return [];
  const r = [];
  return n.find().forEach((o) => {
    if (o.from === o.to) return;
    const s = e.state.doc.textBetween(o.from, o.to, "");
    r.push({ from: o.from, to: o.to, text: s });
  }), r;
}
function kk(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function De(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const Ck = Ue.create({
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
        const c = Zi(t.state.doc, o, s, i, a);
        return c.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = c, this.storage.searchTerm = o, this.storage.caseSensitive = s, this.storage.useRegex = i, this.storage.wholeWord = a, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = o.length, this.storage.allMatches = c, this.storage.nextMatchIndex = c.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], r && r(n.setMeta(Ne, { activate: !0 })), !0);
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
              const p = f.textContent, g = d.parentOffset;
              let h = g, y = g;
              for (; h > 0 && /\w/.test(p[h - 1]); ) h--;
              for (; y < p.length && /\w/.test(p[y]); ) y++;
              h < y && (a = p.slice(h, y));
            }
          }
          if (!a) return !1;
          const c = Zi(o.doc, a, !1, !1, !1);
          if (c.length === 0) return !1;
          const l = kk(c, s), u = c[l];
          return r.isActive = !0, r.ranges = [u], r.searchTerm = a, r.caseSensitive = !1, r.useRegex = !1, r.wholeWord = !1, r.typedBuffer = "", r.isTypingReplace = !1, r.originalTermLength = a.length, r.allMatches = c, r.nextMatchIndex = (l + 1) % c.length, r.isIncremental = !0, r.undoStack = [], r.redoStack = [], n && n(t.setMeta(Ne, { activate: !0 })), setTimeout(() => {
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
          ) ? !1 : (r.ranges = [...r.ranges, s], r.nextMatchIndex = (o + 1) % r.allMatches.length, r.ranges.length >= r.allMatches.length && (r.isIncremental = !1), n && n(t.setMeta(Ne, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (De(this.storage), t && t(e.setMeta(Ne, { deactivate: !0 })), !0),
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
              this.storage.ranges = c, c.length === 0 && De(this.storage);
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
        return De(this.storage), !0;
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
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && De(this.storage);
            }
          } catch {
          }
        }, 10) : De(this.storage), !0;
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
      new Me({
        key: Ne,
        state: {
          init() {
            return je.empty;
          },
          apply(t, n, r, o) {
            const s = t.getMeta(Ne);
            if (s?.deactivate || !e.isActive)
              return je.empty;
            if (s?.activate || s?.refresh) {
              const i = [];
              for (const a of e.ranges) {
                i.push(
                  Ze.inline(a.from, a.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const c = document.createElement("span");
                c.className = "select-all-multi-cursor", c.setAttribute("aria-hidden", "true"), i.push(
                  Ze.widget(a.to, c, {
                    side: 1,
                    key: `cursor-${a.from}-${a.to}`
                  })
                );
              }
              return je.create(o.doc, i);
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
              De(e);
              const { tr: o } = t.state;
              t.dispatch(o.setMeta(Ne, { deactivate: !0 }));
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
              De(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ne, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const o = e.undoStack.pop();
                return e.typedBuffer = o, o === "" && (e.isTypingReplace = !1), um(t.state, t.dispatch), setTimeout(() => {
                  const s = Et(t);
                  e.ranges = s, s.length === 0 && De(e);
                }, 10), !0;
              }
              De(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ne, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const o = e.redoStack.pop();
                return e.typedBuffer = o, e.isTypingReplace = !0, dm(t.state, t.dispatch), setTimeout(() => {
                  const s = Et(t);
                  e.ranges = s, s.length === 0 && De(e);
                }, 10), !0;
              }
              De(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ne, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const r = Et(t);
                if (r.length === 0) {
                  De(e);
                  const { tr: a } = t.state;
                  return t.dispatch(a.setMeta(Ne, { deactivate: !0 })), !0;
                }
                const o = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...r].sort((a, c) => c.from - a.from), { tr: i } = t.state;
                for (const a of s)
                  i.replaceWith(a.from, a.to, t.state.schema.text(o));
                t.dispatch(i), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const a = Et(t);
                  e.ranges = a, a.length === 0 && De(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
                for (const i of r)
                  o.delete(i.from, i.to);
                t.dispatch(o), De(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Ne, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const r = [...e.ranges].sort((i, a) => a.from - i.from), { tr: o } = t.state;
              for (const i of r)
                o.delete(i.from, i.to);
              t.dispatch(o), De(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Ne, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              De(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ne, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              De(e);
              const { tr: r } = t.state;
              return t.dispatch(r.setMeta(Ne, { deactivate: !0 })), !1;
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
              De(e);
              const { tr: c } = t.state;
              return t.dispatch(c.setMeta(Ne, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += o : (e.isTypingReplace = !0, e.typedBuffer = o);
            const i = [...s].sort((c, l) => l.from - c.from), { tr: a } = t.state;
            for (const c of i)
              a.replaceWith(c.from, c.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(a), setTimeout(() => {
              const c = Et(t);
              e.ranges = c, c.length === 0 && De(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
}), Mk = new Te("linkBoundary"), Tk = Ue.create({
  name: "linkBoundary",
  addProseMirrorPlugins() {
    return [
      new Me({
        key: Mk,
        appendTransaction(e, t, n) {
          const { selection: r, schema: o } = n, s = o.marks.link;
          if (!s || !r.empty) return null;
          const { $from: i } = r;
          if (i.parentOffset !== 0 || !i.parent.isTextblock) return null;
          const a = i.parent.firstChild;
          if (!a || !a.isText || !s.isInSet(a.marks)) return null;
          const l = n.storedMarks || i.marks(), u = l.filter(
            (p) => p.type !== s
          );
          if (!l.some(
            (p) => p.type === s
          )) return null;
          const { tr: f } = n;
          return f.setStoredMarks(u), f;
        }
      })
    ];
  }
}), Sk = new Te("smartCopyPaste"), sd = /* @__PURE__ */ new Set(["codeBlock", "callout"]);
function Qi(e) {
  const { state: t } = e, { selection: n } = t, { $from: r, $to: o } = n;
  for (let s = r.depth; s > 0; s--) {
    const i = r.node(s);
    if (!sd.has(i.type.name)) continue;
    const a = r.start(s), c = r.end(s), l = o.depth;
    let u = !1;
    for (let g = l; g > 0; g--)
      if (o.start(g) === a && o.node(g) === i) {
        u = !0;
        break;
      }
    if (!u)
      return { isFullContainer: !1, containerType: null };
    const d = n.from, f = n.to;
    let p;
    if (i.type.name === "codeBlock")
      p = d <= a && f >= c;
    else {
      const g = i.firstChild, h = i.lastChild;
      !g || !h ? p = !1 : p = d <= a + 1 && f >= c - 1;
    }
    return {
      isFullContainer: p,
      containerType: i.type.name
    };
  }
  return { isFullContainer: !1, containerType: null };
}
const Ek = Ue.create({
  name: "smartCopyPaste",
  addProseMirrorPlugins() {
    const e = this.editor;
    let t = {
      isFullContainer: !1,
      containerType: null
    };
    return [
      new Me({
        key: Sk,
        props: {
          handleDOMEvents: {
            // Analyze the selection right before copy/cut happens
            copy(n) {
              return t = Qi(n), !1;
            },
            cut(n) {
              return t = Qi(n), !1;
            }
          },
          /**
           * transformCopied is called after the slice is created from the
           * selection but before it's serialized to the clipboard.
           * We use the analysis from the handleDOMEvents.copy/cut handler.
           */
          transformCopied(n) {
            const { containerType: r, isFullContainer: o } = t;
            if (t = { isFullContainer: !1, containerType: null }, !r || o)
              return n;
            const { content: s, openStart: i, openEnd: a } = n;
            if (s.childCount !== 1 || i === 0)
              return n;
            const c = s.firstChild;
            if (!c || !sd.has(c.type.name))
              return n;
            if (r === "codeBlock") {
              const l = e.schema, u = l.nodes.paragraph;
              if (!u) {
                const h = c.content;
                return new jo(h, Math.max(0, i - 1), Math.max(0, a - 1));
              }
              let d = "";
              c.content.forEach((h) => {
                d += h.text || "";
              });
              const f = d.split(`
`);
              f.length > 1 && f[f.length - 1] === "" && f.pop();
              const p = f.map((h) => h === "" ? u.create() : u.create(null, l.text(h))), g = Nc.from(p);
              return new jo(g, 0, 0);
            } else {
              const l = c.content, u = Math.max(0, i - 1), d = Math.max(0, a - 1);
              return new jo(l, u, d);
            }
          }
        }
      })
    ];
  }
});
function Dk() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function Nk(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => {
      typeof r.result == "string" ? t(r.result) : n(new Error("Failed to read file"));
    }, r.onerror = () => n(new Error("Failed to read file")), r.readAsDataURL(e);
  });
}
function Ak(e, t) {
  const [n, r] = e.split(","), o = n.match(/:(.*?);/), s = o ? o[1] : "image/jpeg", i = atob(r), a = new Uint8Array(i.length);
  for (let c = 0; c < i.length; c++)
    a[c] = i.charCodeAt(c);
  return new File([a], t, { type: s });
}
function Lk(e, t) {
  return t.includes(e.type);
}
function Ik(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function Rk(e, t, n) {
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
      const d = e.type === "image/png" || e.type === "image/gif", f = d ? "image/png" : "image/jpeg", p = d ? void 0 : n, g = l.toDataURL(f, p), h = Ak(g, e.name);
      r({ dataUrl: g, file: h, width: a, height: c });
    }, s.onerror = () => o(new Error("Failed to load image")), i.readAsDataURL(e);
  });
}
function Pk(e, t, n) {
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
async function Ji(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!Lk(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const o = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${o}MB`), !1;
  }
  const r = Dk();
  try {
    n.onUploadStart?.();
    let o, s, i;
    const a = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && a) {
      const p = await Rk(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      o = p.dataUrl, i = p.file, s = Math.min(p.width, 600);
    } else {
      o = await Nk(e), i = e;
      const p = await Ik(o);
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
        const g = p instanceof HTMLElement ? p : p.dom;
        g && g.classList.add("image-uploading");
      }
    }
    try {
      const p = await n.onImageUpload(i, {
        fileName: e.name,
        mimeType: i.type,
        fileSize: i.size,
        uploadId: r
      });
      let g = !1;
      return t.view.state.doc.descendants((h, y) => {
        if (g) return !1;
        if (h.type.name === "resizableImage" && h.attrs.src === o && h.attrs.alt === e.name) {
          try {
            const { state: b, dispatch: v } = t.view, x = b.doc.nodeAt(y);
            if (x) {
              const S = b.tr.setNodeMarkup(y, void 0, {
                ...x.attrs,
                src: p
              });
              v(S);
            }
          } catch (b) {
            console.warn("Failed to replace placeholder with uploaded reference:", b);
          }
          return g = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((h, y) => {
        if (h.type.name === "resizableImage" && h.attrs.src === p) {
          const b = t.view.nodeDOM(y);
          if (b) {
            const v = b instanceof HTMLElement ? b : b.dom;
            v && v.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (p) {
      return console.warn("Image upload failed, removing placeholder:", p), Pk(t, o, e.name), n.onUploadError?.(`Upload failed: ${p instanceof Error ? p.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (o) {
    return n.onUploadError?.(`Failed to process image: ${o instanceof Error ? o.message : "Unknown error"}`), !1;
  }
}
function ec(e) {
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
const Ok = Ue.create({
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
      new Me({
        key: new Te("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, r) {
            const o = r.clipboardData;
            if (!o) return !1;
            const s = ec(o);
            return s.length === 0 ? !1 : (r.preventDefault(), s.forEach((i) => {
              Ji(i, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, r, o, s) {
            if (s) return !1;
            const i = r.dataTransfer;
            if (!i) return !1;
            const a = ec(i);
            if (a.length === 0)
              return !1;
            r.preventDefault();
            const c = n.posAtCoords({
              left: r.clientX,
              top: r.clientY
            });
            if (c) {
              const l = n.state.tr.setSelection(
                Ve.near(n.state.doc.resolve(c.pos))
              );
              n.dispatch(l);
            }
            return a.forEach((l) => {
              Ji(l, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function _k({
  placeholder: e,
  isMobile: t,
  maxImageSize: n,
  headingLevels: r,
  collapsibleHeadingLevels: o,
  disabledFeatures: s,
  progressiveSelectAll: i,
  enableCollapsibleHeadings: a,
  enableCollapsibleLists: c,
  enableTagAutoDetect: l,
  enableHexColorHighlight: u,
  isLightweight: d,
  setImageEditState: f,
  callbackRefs: p
}) {
  return Nt(() => {
    const g = [
      Uf.configure({
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
        // Disable built-in Bold, Italic, Strike, and Code marks — we extend
        // them below with keepOnSplit: false so that pressing Enter at the end
        // of formatted text does not carry the formatting into the new line.
        bold: !1,
        italic: !1,
        strike: !1,
        code: !1
      }),
      // Inline formatting marks with keepOnSplit disabled — prevents bold,
      // italic, strikethrough, and code styles from carrying over when pressing
      // Enter to create a new line or list item.
      pm.configure({ HTMLAttributes: { class: "font-bold" } }).extend({ keepOnSplit: !1 }),
      hm.configure({ HTMLAttributes: { class: "italic" } }).extend({ keepOnSplit: !1 }),
      gm.configure({}).extend({ keepOnSplit: !1 }),
      mm.configure({}).extend({ keepOnSplit: !1 }),
      // Mixed list extensions - allow inter-mixing of bullet, ordered, and task list items
      cb,
      lb,
      fb,
      Yf.configure({
        placeholder: e,
        emptyEditorClass: "is-editor-empty"
      }),
      jf.configure({
        types: ["heading", "paragraph"]
      }),
      Vf.configure({
        multicolor: !0
      }),
      Kf.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      // Prevent typed text from being absorbed into a link mark at the start of a textblock
      Tk,
      // Smart copy-paste: partial selection inside code block/callout unwraps the container
      Ek,
      om,
      sm,
      am,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...d ? [] : [im],
      qx,
      Qx,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...d ? [] : [Ck],
      tk,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      fm.extend({
        addInputRules() {
          const h = this.type;
          return [
            new _e({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: y, range: b }) => {
                const { tr: v } = y, x = b.from, S = b.to;
                v.delete(x, S);
                const w = v.doc.resolve(x), M = h.create(), E = w.before(w.depth), k = w.after(w.depth);
                v.replaceWith(E, k, M);
                const N = E + M.nodeSize;
                if (N < v.doc.content.size) {
                  const C = v.doc.resolve(N);
                  C.nodeAfter && C.nodeAfter.isTextblock ? v.setSelection(Ve.create(v.doc, N + 1)) : C.nodeAfter && v.setSelection(Ve.near(v.doc.resolve(N)));
                } else {
                  const D = y.schema.nodes.paragraph.create();
                  v.insert(N, D), v.setSelection(Ve.create(v.doc, N + 1));
                }
                v.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return s.tables || g.push(
      Gf.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      qf,
      Jv,
      eb,
      ...d ? [] : [ib]
    ), s.taskLists || g.push(
      ub.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      db.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), c && !t && !d && g.push(
      hb.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || g.push(bm), s.callouts || g.push(yb, Zx), a && !s.collapsibleHeadings && !d && g.push(
      Vx.configure({
        levels: o
      })
    ), s.images || g.push(
      vb.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (h) => {
          f({
            isOpen: !0,
            src: h.src,
            alt: h.alt,
            pos: h.pos,
            position: { x: h.rect.left + h.rect.width / 2, y: h.rect.bottom }
          });
        },
        resolveImageSrc: p.resolveImageSrc.current ? ((...h) => p.resolveImageSrc.current(...h)) : void 0
      }),
      Ok.configure({
        maxFileSize: n,
        onUploadStart: p.onImageUploadStart.current ? ((...h) => p.onImageUploadStart.current(...h)) : void 0,
        onUploadComplete: p.onImageUploadComplete.current ? ((...h) => p.onImageUploadComplete.current(...h)) : void 0,
        onUploadError: p.onImageUploadError.current ? ((...h) => p.onImageUploadError.current(...h)) : void 0,
        onImageUpload: p.onImageUpload.current ? ((h, y) => p.onImageUpload.current(h, y)) : void 0
      })
    ), s.datePills || g.push(
      Ax.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), s.tagPills || g.push(
      Rx.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: l
      })
    ), s.wikiLinks || g.push(
      Ox.configure({
        onWikiLinkClick: (h) => {
          console.log("WikiLink clicked:", h), p.onWikiLinkClick.current?.(h);
        },
        validateLink: (h) => p.validateWikiLink.current ? p.validateWikiLink.current(h) : !0
      })
    ), i && g.push(gk), u && !d && g.push(xk), s.markdownPaste || g.push(
      Fx.configure({
        enableMarkdownPaste: !0
      })
    ), g;
  }, [e, t, n, r, o, s, i, a, c, l, u, d]);
}
let mt = null, lo = null;
async function ad() {
  if (mt) return mt;
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
      const u = l, d = u.getAttribute("src") || "", p = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = u.getAttribute("width"), h = g ? parseInt(g, 10) : null, y = u.getAttribute("data-align") || "left", b = [p], v = y !== "left", x = h && h > 0;
      return (v || x) && b.push(v ? y : "left"), x && b.push(String(h)), `![${b.join(" | ")}](${d})`;
    }
  }), n.addRule("imageResizer", {
    filter: (c) => c.nodeName === "FIGURE" && c.classList.contains("image-resizer"),
    replacement: (c, l) => {
      const u = l.querySelector("img");
      if (!u) return c;
      const d = u.getAttribute("src") || "", p = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = u.getAttribute("width"), h = g ? parseInt(g, 10) : null, y = u.getAttribute("data-align") || "left", b = [p], v = y !== "left", x = h && h > 0;
      (v || x) && b.push(v ? y : "left"), x && b.push(String(h));
      const S = `![${b.join(" | ")}](${d})`, w = l.parentNode;
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
        const h = Array.from(d.children).filter((b) => b.nodeName === "LI").indexOf(l);
        f = `${parseInt(d.getAttribute("start") || "1", 10) + h}. `;
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
    const l = c.getAttribute("src") || "", d = (c.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = c.getAttribute("width"), p = f ? parseInt(f, 10) : null, g = c.getAttribute("data-align") || "left", h = [d], y = g !== "left", b = p && p > 0;
    return (y || b) && h.push(y ? g : "left"), b && h.push(String(p)), `![${h.join(" \\| ")}](${l})`;
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
      (h) => h.nodeType === Node.ELEMENT_NODE && h.nodeName === "LI"
    ), g = f === "OL" ? parseInt(c.getAttribute("start") || "1", 10) : 1;
    p.forEach((h, y) => {
      const b = h.getAttribute("data-type") === "taskItem", v = h.getAttribute("data-checked") === "true", x = s(h);
      b ? l.push(`${d}- [${v ? "x" : " "}] ${x}`) : f === "OL" ? l.push(`${d}${g + y}. ${x}`) : l.push(`${d}- ${x}`);
      const S = Array.from(h.childNodes).filter(
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
        const g = (u.textContent || "").trim();
        g && l.push(g.replace(/\|/g, "\\|"));
        continue;
      }
      const d = u, f = d.nodeName;
      if (f === "UL" || f === "OL") {
        i(d, l, 0);
        continue;
      }
      if (f === "FIGURE") {
        const g = d.querySelector("img");
        g && l.push(r(g));
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
      d.forEach((h, y) => {
        const b = Array.from(h.querySelectorAll("th, td")), v = b.map((x) => a(x));
        if (y > 0 && b.length > 0 && b[0].nodeName === "TH" && (p = !0), f.push("| " + v.join(" | ") + " |"), y === 0) {
          const x = b.map(() => "---").join(" | ");
          f.push("| " + x + " |");
        }
      });
      const g = p ? `
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
      return u ? `@${Dx(u)}@` : c;
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
  }), mt = n, n;
}
function $k() {
  !lo && !mt && (lo = ad().then((e) => (mt = e, e)));
}
function Hk() {
  return $k(), {
    turndown(e) {
      return mt ? mt.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return mt !== null;
    },
    async ready() {
      mt || (lo ? await lo : await ad());
    }
  };
}
function Wk() {
  const e = j(null);
  return e.current || (e.current = Hk()), e.current;
}
const zk = 2e3;
function Bk(e) {
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
    markdownChangeDebounceMs: f,
    onReady: p,
    onDestroy: g,
    onFocus: h,
    onBlur: y,
    onSelectionChange: b,
    onLinkClick: v,
    editorModeRef: x,
    rawMarkdownRef: S,
    setRawMarkdown: w,
    setIsLightweight: M,
    lightweightCheckCounterRef: E,
    isLightweightRef: k
  } = e, N = n && n.length > zk, C = j(N ? n : null), D = N ? "" : n, A = j(null), P = j(null), O = j(l), $ = j(u), z = j(d), V = j(f), R = j(null);
  O.current = l, $.current = u, z.current = d, V.current = f;
  const L = Bd({
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
    onCreate: ({ editor: F }) => {
      window.__tiptapEditor = F, p?.(F);
    },
    onDestroy: () => {
      g?.();
    },
    extensions: t,
    content: D,
    editable: r,
    autofocus: o,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: s ? "true" : "false"
      },
      handleClick: (F, Y, G) => {
        if (v) {
          const J = G.target.closest("a");
          if (J) {
            const _ = J.getAttribute("href");
            if (_ && v(_, G) === !1)
              return G.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: F }) => {
      if (a === "auto" && (E.current++, E.current >= 50)) {
        E.current = 0;
        const G = F.state.doc.content.childCount > c;
        G !== k.current && M(G);
      }
      A.current && clearTimeout(A.current), A.current = setTimeout(() => {
        if (F.isDestroyed) return;
        const Y = F.getHTML();
        (O.current || $.current) && (O.current?.(Y), $.current?.(Y)), V.current > 0 && z.current && (P.current && clearTimeout(P.current), P.current = setTimeout(() => {
          if (!F.isDestroyed && x.current === "wysiwyg" && R.current) {
            const G = F.getHTML(), W = R.current.turndown(G);
            S.current = W, z.current?.(Fn(W));
          }
        }, V.current));
      }, 150);
    },
    onFocus: () => {
      h?.();
    },
    onBlur: () => {
      if (P.current && (clearTimeout(P.current), P.current = null), A.current && (clearTimeout(A.current), A.current = null, L && !L.isDestroyed)) {
        const F = L.getHTML();
        if ((O.current || $.current) && (O.current?.(F), $.current?.(F)), x.current === "wysiwyg" && R.current) {
          const Y = R.current.turndown(F);
          S.current = Y, z.current?.(Fn(Y));
        }
      }
      y?.();
    },
    onSelectionUpdate: ({ editor: F }) => {
      if (b) {
        const { from: Y, to: G, empty: W } = F.state.selection;
        b({ from: Y, to: G, empty: W });
      }
    }
  });
  K(() => {
    if (!C.current || !L || L.isDestroyed) return;
    const F = C.current;
    C.current = null;
    const Y = requestAnimationFrame(() => {
      const G = setTimeout(() => {
        L.isDestroyed || L.commands.setContent(F);
      }, 0);
      L.__deferredTimerId = G;
    });
    return () => {
      cancelAnimationFrame(Y);
      const G = L.__deferredTimerId;
      G && clearTimeout(G);
    };
  }, [L]), K(() => () => {
    if (P.current && (clearTimeout(P.current), P.current = null), A.current && (clearTimeout(A.current), A.current = null, L && !L.isDestroyed)) {
      const F = L.getHTML();
      if ((O.current || $.current) && (O.current?.(F), $.current?.(F)), x.current === "wysiwyg" && R.current) {
        const Y = R.current.turndown(F);
        S.current = Y, z.current?.(Fn(Y));
      }
    }
  }, []);
  const H = Wk();
  R.current = H;
  const q = j(!1);
  return K(() => {
    if (!q.current && i === "markdown" && L && !L.isDestroyed && H) {
      const F = L.getHTML(), Y = H.turndown(F);
      w(Y), S.current = Y, q.current = !0;
    }
  }, [L, H, i]), { editor: L, turndownService: H };
}
function Fk(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), r = n.body.firstElementChild;
  if (!r) return e;
  const o = (i) => {
    Array.from(i.querySelectorAll("ul")).forEach(o);
    const c = Array.from(i.children).filter((f) => f.tagName === "LI");
    let l = !1, u = !1;
    const d = (f) => {
      const p = f.querySelector(':scope > input[type="checkbox"]');
      if (p) return p;
      const g = f.querySelector(":scope > p");
      if (g) {
        const h = g.querySelector(':scope > input[type="checkbox"]');
        if (h) return h;
      }
      return null;
    };
    c.forEach((f) => {
      d(f) ? l = !0 : u = !0;
    }), l && (c.forEach((f) => {
      const p = d(f);
      if (p) {
        const g = p.hasAttribute("checked");
        f.setAttribute("data-type", "taskItem"), f.setAttribute("data-checked", String(g));
        const h = p.parentElement, y = h && h.tagName === "P" && h.parentElement === f;
        p.remove(), y && h.firstChild && h.firstChild.nodeType === Node.TEXT_NODE && (h.firstChild.textContent = (h.firstChild.textContent || "").replace(/^\s+/, ""));
        const b = Array.from(f.childNodes), v = [], x = [];
        b.forEach((w) => {
          if (w.nodeType === Node.ELEMENT_NODE) {
            const M = w;
            if (M.tagName === "UL" || M.tagName === "OL" || M.tagName === "P")
              x.push(w);
            else if (M.tagName === "IMG" || M.tagName === "FIGURE")
              if (M.tagName === "IMG") {
                const E = n.createElement("figure");
                E.className = "image-resizer";
                const k = M.getAttribute("data-align") || "left", N = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[k] || "margin-right: auto;";
                E.style.cssText = N, E.appendChild(M.cloneNode(!0)), x.push(E);
              } else
                x.push(w);
            else
              v.push(w);
          } else
            v.push(w);
        });
        const S = x.filter((w) => {
          if (w.nodeType === Node.ELEMENT_NODE) {
            const M = w;
            if (M.tagName === "P" && !M.textContent?.trim() && !M.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", v.length > 0) {
          const w = n.createElement("p");
          v.forEach((M) => w.appendChild(M)), w.firstChild && w.firstChild.nodeType === Node.TEXT_NODE && (w.firstChild.textContent = (w.firstChild.textContent || "").replace(/^\s+/, "")), (w.textContent?.trim() || w.querySelector("img, figure, code, br")) && f.appendChild(w);
        }
        S.forEach((w) => f.appendChild(w));
      }
    }), l && !u && i.setAttribute("data-type", "taskList"));
  };
  return Array.from(r.querySelectorAll(":scope > ul")).forEach(o), r.innerHTML;
}
function Uk(e) {
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
        const p = r(l), g = r(t[u]);
        if (p !== null && g !== null) {
          const h = o(l);
          if (o(t[u]) > h) {
            for (let b = f; b < u; b++)
              n.push(t[b]);
            c = u - 1;
            continue;
          }
          for (let b = f; b < u; b++)
            n.push(t[b]);
          n.push("<!-- list-break -->"), c = u - 1;
          continue;
        }
      }
    }
  }
  return n.join(`
`);
}
function Yk(e) {
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
          const g = d.getAttribute("data-align") || "left", h = {
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          };
          p.style.cssText = h[g] || "margin-right: auto;", p.appendChild(d.cloneNode(!0)), l.push(p);
        } else if (f === "P")
          if (d.querySelectorAll("img").length === 0)
            l.push(u);
          else {
            const g = Array.from(d.childNodes), h = [];
            if (g.forEach((y) => {
              if (y.nodeType === Node.ELEMENT_NODE && y.tagName === "IMG") {
                if (h.length > 0) {
                  const w = n.createElement("p");
                  h.forEach((M) => w.appendChild(M.cloneNode(!0))), w.textContent?.trim() && l.push(w), h.length = 0;
                }
                const b = y, v = n.createElement("figure");
                v.className = "image-resizer";
                const x = b.getAttribute("data-align") || "left", S = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                v.style.cssText = S[x] || "margin-right: auto;", v.appendChild(b.cloneNode(!0)), l.push(v);
              } else
                h.push(y);
            }), h.length > 0) {
              const y = n.createElement("p");
              h.forEach((b) => y.appendChild(b.cloneNode(!0))), y.textContent?.trim() && l.push(y);
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
function jk(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (r) => r.replace(/<tr>([\s\S]*?)<\/tr>/gi, (o, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function uo(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Vk(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function tc(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((r) => r.trim()).map((r) => /^<img\s/i.test(r) ? Vk(r) : r.trim() ? `<p>${uo(r.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${uo(e)}</p>`;
}
function Kk(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, r = Math.floor(n / 2), o = e.trimStart(), s = o.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: r, text: s[2].trim(), checked: s[1] === "x" };
  const i = o.match(/^-\s+(.+)$/);
  if (i)
    return { type: "ul", depth: r, text: i[1].trim() };
  const a = o.match(/^(\d+)\.\s+(.+)$/);
  return a ? { type: "ol", depth: r, text: a[2].trim(), index: parseInt(a[1], 10) } : null;
}
function Gk(e) {
  if (e.length === 0) return "";
  const t = (o, s) => {
    let i = "", a = o;
    const c = e[a]?.type || "ul", l = c === "task", u = l ? '<ul data-type="taskList">' : `<${c === "ol" ? "ol" : "ul"}>`, d = l ? "</ul>" : `</${c === "ol" ? "ol" : "ul"}>`;
    for (i += u; a < e.length && e[a].depth >= s; ) {
      const f = e[a];
      if (f.depth === s) {
        if (l ? i += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${uo(f.text)}</p>` : i += `<li><p>${uo(f.text)}</p>`, a + 1 < e.length && e[a + 1].depth > s) {
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
function qk(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, r, o) => {
      const s = /<img\s/i.test(r), i = /<br\s*\/?>/i.test(r), a = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(r);
      if (!s && !i && !a) return t;
      let c = r.trim();
      c = c.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const l = c.split(/<br\s*\/?>/i).filter((p) => p.trim());
      if (l.length <= 1 && !a)
        return s ? `${n}${tc(c)}${o}` : t;
      const u = [];
      let d = [];
      const f = () => {
        d.length !== 0 && (u.push(Gk(d)), d = []);
      };
      for (const p of l) {
        const g = Kk(p);
        if (g) {
          if (d.length > 0) {
            const h = d[0].type;
            g.depth === 0 && g.type !== h && f();
          }
          d.push(g);
        } else
          f(), u.push(tc(p.trim()));
      }
      return f(), `${n}${u.join("")}${o}`;
    }
  );
}
function Xk(e, t, n = {}) {
  const {
    enableTagAutoDetect: r = !1,
    disableTagPills: o = !1,
    isValidTag: s,
    normalizeTag: i,
    parseDateFromMarkdown: a,
    getDateVariant: c
  } = n;
  let l = e;
  l = Uk(l);
  const u = /* @__PURE__ */ new Set(["info", "note", "prompt", "resources", "todo", "summary"]), d = l.split(`
`), f = [];
  let p = null, g = [];
  for (let y = 0; y < d.length; y++) {
    const b = d[y];
    if (p !== null)
      if (b.trimEnd() === "```") {
        const v = g.join(`
`).trim(), x = v ? t(v) : "";
        f.push(`<div data-callout="" data-type="${p}" class="callout callout-${p}">${x}</div>`), p = null, g = [];
      } else
        g.push(b);
    else {
      const v = b.match(/^```(?:ad-)?(\w+)\s*$/);
      v && u.has(v[1]) ? (p = v[1], g = []) : f.push(b);
    }
  }
  return p !== null && (f.push(`\`\`\`ad-${p}`), f.push(...g)), l = f.join(`
`), l = l.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (y, b, v) => {
    const x = b.split("|").map((N) => N.trim());
    let S = "", w = "left", M = null;
    x.length === 1 ? S = x[0] : x.length === 2 ? (S = x[0], /^\d+$/.test(x[1]) ? M = x[1] : ["left", "center", "right"].includes(x[1]) ? w = x[1] : S = b) : x.length === 3 ? (S = x[0], ["left", "center", "right"].includes(x[1]) && (w = x[1]), /^\d+$/.test(x[2]) && (M = x[2])) : S = b;
    const E = M ? ` width="${M}" style="width: ${M}px"` : "", k = ` data-align="${w}"`;
    return `<img src="${v.trim()}" alt="${S}"${k}${E} />`;
  }), l = l.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), a && c && (l = l.replace(/@([^@\n]+)@/g, (y, b) => {
    const v = a(b);
    if (v) {
      const x = c(v);
      return `<span data-type="date-pill" data-date="${v}" class="date-pill ${x}"><span class="date-icon">📅</span><span class="date-text">${b.trim()}</span></span>`;
    }
    return y;
  })), r && !o && s && i && (l = l.replace(
    new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"),
    (y, b) => {
      const v = i(b);
      return s(v) ? `<span data-type="tag-pill" data-tag="${v}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${v}</span></span>` : y;
    }
  )), l = l.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((y, b) => b % 2 === 1 ? y : y.replace(/\[\[([^\[\]]+)\]\]/g, (v, x) => `<span data-wiki-link data-page-name="${x.trim()}" class="wiki-link">${x.trim()}</span>`)).join(""), l;
}
function Zk(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = Fk(t), t = Yk(t), t = jk(t), t = qk(t), t = t.replace(
    /(<pre[^>]*>\s*<code[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/g,
    (n, r, o, s) => r + o.replace(/\n+$/, "") + s
  ), t;
}
function Qk(e, t, n = {}) {
  const r = Xk(e, t, n), o = t(r);
  return Zk(o);
}
function Jk(e, t, n) {
  K(() => {
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
              const f = d[2] === "x", p = a.schema.nodes.taskList, g = a.schema.nodes.taskItem;
              if (p && g) {
                const h = a.tr, y = l.pos - u.length, b = l.pos;
                h.delete(y, b);
                const x = h.doc.resolve(y).blockRange();
                if (x) {
                  const S = [
                    { type: p, attrs: {} },
                    { type: g, attrs: { checked: f } }
                  ];
                  h.wrap(x, S), e.view.dispatch(h);
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
              o.preventDefault(), Xr(e, l.pos - 3, l.pos);
              return;
            }
            if (u === "—-") {
              o.preventDefault(), Xr(e, l.pos - 2, l.pos);
              return;
            }
            if (u === "—") {
              o.preventDefault(), Xr(e, l.pos - 1, l.pos);
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
function eC({
  editorModeRef: e,
  rawMarkdownRef: t,
  editorMode: n,
  handleModeSwitch: r,
  setIsFindReplaceOpen: o,
  setFindReplaceFocusTrigger: s
}) {
  K(() => {
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
  }, [r]), K(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: n } }));
  }, [n]);
}
function tC({
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
        const { marked: d } = await import("./marked.esm-Tjr8Gfse.js"), f = (h) => d.parse(h, { async: !1, breaks: !0 }), p = {
          enableTagAutoDetect: a,
          disableTagPills: !!c.tagPills,
          isValidTag: ln,
          normalizeTag: jn,
          parseDateFromMarkdown: Ft,
          getDateVariant: Aa
        }, g = Qk(r.current, f, p);
        queueMicrotask(() => {
          e.isDestroyed || e.commands.setContent(g);
        });
      }
      o(u), n.current = u, i?.(u);
    }
  }, [e, t, i]);
}
const nC = 200;
function rC(e, t = {}) {
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
  }), a = j(null), c = j(""), l = B((u) => {
    const d = u.trim(), f = d.length > 0 ? d.split(/\s+/).filter((v) => v.length > 0).length : 0, p = d.replace(/\s/g, "").length, g = u.length;
    let h = 0, y = 0;
    r && (h = d.length > 0 ? d.split(/\n\s*\n/).filter((v) => v.trim().length > 0).length : 0, y = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const b = Math.max(1, Math.ceil(f / nC));
    return {
      words: f,
      characters: p,
      charactersWithSpaces: g,
      paragraphs: h,
      sentences: y,
      readingTime: b,
      isCalculating: !1
    };
  }, [r]);
  return K(() => {
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
function oC({ status: e, lastSaved: t, className: n = "" }) {
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
        e === "idle" && t && /* @__PURE__ */ I(ve, { children: [
          /* @__PURE__ */ m(hf, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ I("span", { className: "text-muted-foreground", children: [
            "Saved ",
            r(t)
          ] })
        ] }),
        e === "saving" && /* @__PURE__ */ I(ve, { children: [
          /* @__PURE__ */ m(Cc, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }),
          /* @__PURE__ */ m("span", { className: "text-cyan-500", children: "Saving..." })
        ] }),
        e === "saved" && /* @__PURE__ */ I(ve, { children: [
          /* @__PURE__ */ m(Kt, { className: "w-3.5 h-3.5 text-emerald-500" }),
          /* @__PURE__ */ m("span", { className: "text-emerald-500", children: "Saved" })
        ] }),
        e === "error" && /* @__PURE__ */ I(ve, { children: [
          /* @__PURE__ */ m(gf, { className: "w-3.5 h-3.5 text-red-500" }),
          /* @__PURE__ */ m("span", { className: "text-red-500", children: "Save failed" })
        ] })
      ]
    }
  );
}
function sC({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ I(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ I("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ m(yf, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }),
          /* @__PURE__ */ m("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." })
        ] }),
        /* @__PURE__ */ I("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ I(
            "button",
            {
              onClick: e,
              className: "recovery-banner-btn flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              children: [
                /* @__PURE__ */ m(Js, { className: "w-4 h-4" }),
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
              children: /* @__PURE__ */ m(pt, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
function Ur(e) {
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
      const v = l[1].length;
      t.push({
        type: `heading${v}`,
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
      const v = u[2].toLowerCase() === "x";
      t.push({
        type: v ? "task-checked" : "task-list",
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
    ], h = [];
    for (const v of g) {
      let x;
      for (v.regex.lastIndex = 0; (x = v.regex.exec(a)) !== null; )
        h.push({
          start: c + x.index,
          end: c + x.index + x[0].length,
          type: v.type,
          content: x[0]
        });
    }
    h.sort((v, x) => v.start - x.start);
    const y = [];
    let b = c;
    for (const v of h)
      v.start >= b && (y.push(v), b = v.end);
    for (const v of y)
      v.start > c + p && t.push({
        type: "text",
        content: a.substring(p, v.start - c),
        start: c + p,
        end: v.start
      }), t.push({
        type: v.type,
        content: v.content,
        start: v.start,
        end: v.end
      }), p = v.end - c;
    p < a.length && t.push({
      type: "text",
      content: a.substring(p),
      start: c + p,
      end: c + a.length
    }), r += a.length + 1;
  }
  return t;
}
function nc(e) {
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
function jt(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function Yr(e, t, n, r) {
  if (t.length === 0 && (!n || n.length === 0))
    return jt(e);
  let o = "";
  const s = e.split(`
`);
  let i = 0;
  if (!n || n.length === 0) {
    for (let c = 0; c < s.length; c++) {
      const l = s[c], u = i + l.length, d = t.filter((p) => p.start >= i && p.start < u);
      let f = i;
      for (const p of d)
        p.start > f && (o += jt(e.substring(f, p.start))), o += `<span class="${nc(p.type)}">${jt(p.content)}</span>`, f = p.end;
      f < u && (o += jt(e.substring(f, u))), c < s.length - 1 && (o += `
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
      p.start > f && (o += ms(e, f, p.start, null, a)), o += ms(e, p.start, p.end, nc(p.type), a), f = p.end;
    f < u && (o += ms(e, f, u, null, a)), c < s.length - 1 && (o += `
`), i = u + 1;
  }
  return o;
}
function ms(e, t, n, r, o) {
  let s = "", i = t;
  for (; i < n; ) {
    const a = o.get(i);
    if (a) {
      const c = i;
      for (; i < n && o.get(i)?.matchIdx === a.matchIdx; )
        i++;
      const l = jt(e.substring(c, i)), u = a.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      r ? s += `<span class="${r}"><mark class="${u}">${l}</mark></span>` : s += `<mark class="${u}">${l}</mark>`;
    } else {
      const c = i;
      for (; i < n && !o.has(i); )
        i++;
      const l = jt(e.substring(c, i));
      r ? s += `<span class="${r}">${l}</span>` : s += l;
    }
  }
  return s;
}
function aC({
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
  const l = j(null), u = j(null), d = j(null), f = j(null), p = 5e3, g = 80, [h, y] = U(() => {
    const k = Ur(e);
    return Yr(e, k, i, a);
  }), b = j(null), v = Nt(() => {
    if (e.length <= p) {
      const k = Ur(e), N = Yr(e, k, i, a);
      return b.current && (clearTimeout(b.current), b.current = null), N;
    }
    return null;
  }, [e, i, a]);
  K(() => {
    if (e.length <= p) {
      const k = Ur(e);
      y(Yr(e, k, i, a));
      return;
    }
    return b.current && clearTimeout(b.current), b.current = setTimeout(() => {
      const k = Ur(e);
      y(Yr(e, k, i, a)), b.current = null;
    }, g), () => {
      b.current && clearTimeout(b.current);
    };
  }, [e, i, a]);
  const x = v ?? h, S = B(() => {
    const k = l.current, N = u.current, C = d.current;
    if (k) {
      const D = C?.parentElement, A = D ? D.clientHeight : 200;
      k.style.height = "auto";
      const P = Math.max(k.scrollHeight, A, 200);
      k.style.height = `${P}px`, N && (N.style.height = `${P}px`);
    }
  }, []);
  K(() => {
    const k = l.current;
    if (!k) return;
    const N = (C) => {
      const D = k.closest(".editor-content-wrapper");
      if (!D) return;
      const { scrollTop: A, scrollHeight: P, clientHeight: O } = D, $ = A <= 0, z = A + O >= P - 1;
      (C.deltaY > 0 && !z || C.deltaY < 0 && !$) && (C.preventDefault(), D.scrollTop += C.deltaY);
    };
    return k.addEventListener("wheel", N, { passive: !1 }), () => k.removeEventListener("wheel", N);
  }, []);
  const w = B(() => {
  }, []);
  K(() => {
    S();
  }, [e, S]), K(() => {
    o && l.current && l.current.focus();
  }, [o]), K(() => {
    if (f.current && l.current) {
      const { start: k, end: N } = f.current;
      l.current.selectionStart = k, l.current.selectionEnd = N, f.current = null;
    }
  }, [e]);
  const M = B((k) => {
    const N = k.target;
    f.current = {
      start: N.selectionStart,
      end: N.selectionEnd
    }, t(N.value);
  }, [t]), E = B((k) => {
    const N = k.currentTarget, C = N.selectionStart, D = N.selectionEnd, A = N.value, P = C !== D;
    if (c) {
      if (k.key === "`" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), P) {
          const O = A.substring(C, D), $ = A.substring(0, C) + "`" + O + "`" + A.substring(D);
          f.current = { start: C + 1, end: D + 1 }, t($);
        } else if (A[C] === "`")
          f.current = { start: C + 1, end: C + 1 }, t(A), N.selectionStart = N.selectionEnd = C + 1;
        else {
          const O = A.substring(0, C) + "``" + A.substring(D);
          f.current = { start: C + 1, end: C + 1 }, t(O);
        }
        return;
      }
      if (k.key === "*" && !k.ctrlKey && !k.metaKey) {
        if (A[C - 1] === "*" && A[C], P) {
          k.preventDefault();
          const z = A.substring(C, D), V = A.substring(0, C) + "*" + z + "*" + A.substring(D);
          f.current = { start: C + 1, end: D + 1 }, t(V);
          return;
        }
        if (A[C] === "*") {
          k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(A.substring(0, C) + A.substring(C));
          return;
        }
        k.preventDefault();
        const $ = A.substring(0, C) + "**" + A.substring(D);
        f.current = { start: C + 1, end: C + 1 }, t($);
        return;
      }
      if (k.key === "_" && !k.ctrlKey && !k.metaKey) {
        if (P) {
          k.preventDefault();
          const $ = A.substring(C, D), z = A.substring(0, C) + "_" + $ + "_" + A.substring(D);
          f.current = { start: C + 1, end: D + 1 }, t(z);
          return;
        }
        if (A[C] === "_") {
          k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(A.substring(0, C) + A.substring(C));
          return;
        }
        k.preventDefault();
        const O = A.substring(0, C) + "__" + A.substring(D);
        f.current = { start: C + 1, end: C + 1 }, t(O);
        return;
      }
      if (k.key === "~" && !k.ctrlKey && !k.metaKey) {
        if (P) {
          k.preventDefault();
          const $ = A.substring(C, D), z = A.substring(0, C) + "~" + $ + "~" + A.substring(D);
          f.current = { start: C + 1, end: D + 1 }, t(z);
          return;
        }
        if (A[C] === "~") {
          k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(A.substring(0, C) + A.substring(C));
          return;
        }
        k.preventDefault();
        const O = A.substring(0, C) + "~~" + A.substring(D);
        f.current = { start: C + 1, end: C + 1 }, t(O);
        return;
      }
      if (k.key === "[" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), P) {
          const O = A.substring(C, D), $ = A.substring(0, C) + "[" + O + "]()" + A.substring(D);
          f.current = { start: D + 3, end: D + 3 }, t($);
        } else {
          const O = A.substring(0, C) + "[]()" + A.substring(D);
          f.current = { start: C + 1, end: C + 1 }, t(O);
        }
        return;
      }
      if (k.key === "]" && !k.ctrlKey && !k.metaKey && A[C] === "]") {
        k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(A.substring(0, C) + A.substring(C));
        return;
      }
      if (k.key === ")" && !k.ctrlKey && !k.metaKey && A[C] === ")") {
        k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(A.substring(0, C) + A.substring(C));
        return;
      }
      if (k.key === "Backspace" && !P && C > 0) {
        const O = A[C - 1], $ = A[C], z = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [V, R] of z)
          if (O === V && $ === R) {
            k.preventDefault();
            const L = A.substring(0, C - 1) + A.substring(C + 1);
            f.current = { start: C - 1, end: C - 1 }, t(L);
            return;
          }
        if (O === "[" && A.substring(C, C + 3) === "]()") {
          k.preventDefault();
          const V = A.substring(0, C - 1) + A.substring(C + 3);
          f.current = { start: C - 1, end: C - 1 }, t(V);
          return;
        }
      }
    }
    if (k.key === "Tab")
      if (k.preventDefault(), k.shiftKey) {
        const O = A.substring(0, C), $ = A.substring(C, D), z = A.substring(D), R = O.lastIndexOf(`
`) + 1, L = O.substring(0, R), H = O.substring(R), q = (H + $).split(`
`), F = q.map((W) => W.startsWith("  ") ? W.substring(2) : W.startsWith("	") ? W.substring(1) : W), Y = L + F.join(`
`) + z, G = (H + $).length - F.join(`
`).length;
        f.current = {
          start: Math.max(R, C - (q[0].length - F[0].length)),
          end: D - G
        }, t(Y);
      } else if (C === D) {
        const O = A.substring(0, C) + "  " + A.substring(D);
        f.current = { start: C + 2, end: C + 2 }, t(O);
      } else {
        const O = A.substring(0, C), $ = A.substring(C, D), z = A.substring(D), R = O.lastIndexOf(`
`) + 1, L = O.substring(0, R), q = (O.substring(R) + $).split(`
`), F = q.map((G) => "  " + G), Y = L + F.join(`
`) + z;
        f.current = {
          start: C + 2,
          end: D + q.length * 2
        }, t(Y);
      }
  }, [t, c]);
  return /* @__PURE__ */ I("div", { ref: d, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: u,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: x || `<span class="md-placeholder">${jt(n)}</span>` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ m(
      "textarea",
      {
        ref: l,
        value: e,
        onChange: M,
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
let rc = 0, _s = 0, id = 0;
function iC(e) {
  _s++, id = e;
}
const cC = vt(function({
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
  }), c = j([]), l = j(performance.now()), u = j(0), d = j(0), f = j(0), p = j(0), [g, h] = U(new Array(60).fill(0)), [y, b] = U(new Array(60).fill(0));
  K(() => {
    if (!t || !r) return;
    const E = () => {
      const k = performance.now();
      queueMicrotask(() => {
        const N = performance.now() - k;
        iC(N);
      });
    };
    return r.on("transaction", E), () => {
      r.off("transaction", E);
    };
  }, [t, r]), K(() => {
    if (!t) return;
    let E = 0, k = performance.now(), N = 0;
    const C = (D) => {
      const A = D - l.current;
      if (l.current = D, c.current.push({ time: D, duration: A }), c.current.length > 120 && (c.current = c.current.slice(-120)), A > 16.67 && d.current++, E++, D - k >= 1e3) {
        N = E, E = 0, k = D;
        const P = c.current.slice(-60), O = P.length > 0 ? P.reduce((F, Y) => F + Y.duration, 0) / P.length : 0, $ = P.length > 0 ? Math.max(...P.map((F) => F.duration)) : 0, z = performance.memory, V = z ? z.usedJSHeapSize / (1024 * 1024) : 0, R = z ? z.jsHeapSizeLimit / (1024 * 1024) : 0, L = document.querySelectorAll("*").length, H = rc - f.current, q = _s - p.current;
        f.current = rc, p.current = _s, a({
          fps: N,
          frameTime: Math.round(O * 100) / 100,
          frameTimeMax: Math.round($ * 100) / 100,
          memoryUsed: Math.round(V * 10) / 10,
          memoryTotal: Math.round(R),
          renderCount: H,
          transactionCount: q,
          lastTransactionTime: Math.round(id * 100) / 100,
          domNodes: L,
          longFrames: d.current
        }), h((F) => [...F.slice(1), N]), b((F) => [...F.slice(1), O]), d.current = 0;
      }
      u.current = requestAnimationFrame(C);
    };
    return u.current = requestAnimationFrame(C), () => {
      cancelAnimationFrame(u.current);
    };
  }, [t]);
  const v = B(() => {
    n?.();
  }, [n]), x = B(() => {
    s((E) => !E);
  }, []);
  if (!t) return null;
  const S = (E) => E >= 55 ? "#4ade80" : E >= 30 ? "#fbbf24" : "#f87171", w = (E) => E <= 16.67 ? "#4ade80" : E <= 33.33 ? "#fbbf24" : "#f87171", M = (E, k, N) => {
    const A = E.map((P, O) => {
      const $ = O / (E.length - 1) * 120, z = 24 - Math.min(P, k) / k * 24;
      return `${$},${z}`;
    }).join(" ");
    return /* @__PURE__ */ m("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ m(
      "polyline",
      {
        points: A,
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
        /* @__PURE__ */ m(vf, { size: 14 }),
        /* @__PURE__ */ m("span", { children: "Performance" })
      ] }),
      /* @__PURE__ */ I("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ m("button", { onClick: x, title: o ? "Expand" : "Minimize", children: o ? /* @__PURE__ */ m(Mc, { size: 12 }) : /* @__PURE__ */ m(Tc, { size: 12 }) }),
        /* @__PURE__ */ m("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ m(pt, { size: 12 }) })
      ] })
    ] }),
    !o && /* @__PURE__ */ I("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ I("div", { className: "perf-section", children: [
        /* @__PURE__ */ I("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "FPS" }),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: S(i.fps) }, children: i.fps })
        ] }),
        M(g, 70, S(i.fps))
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
        M(y, 50, w(i.frameTime))
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
class lC extends Yd {
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
        /* @__PURE__ */ m("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ m(bf, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ I("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ m("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }),
          /* @__PURE__ */ m("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." })
        ] }),
        /* @__PURE__ */ I("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: [
          /* @__PURE__ */ I(
            At,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ m(Js, { className: "w-4 h-4" }),
                "Retry ",
                r > 0 && `(${r})`
              ]
            }
          ),
          s && this.props.onClearContent && /* @__PURE__ */ I(
            At,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ m(un, { className: "w-4 h-4" }),
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
                n ? /* @__PURE__ */ m(Lt, { className: "w-3 h-3" }) : /* @__PURE__ */ m(xc, { className: "w-3 h-3" }),
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
                  children: o ? /* @__PURE__ */ I(ve, { children: [
                    /* @__PURE__ */ m(wf, { className: "w-3 h-3 text-green-500" }),
                    /* @__PURE__ */ m("span", { className: "text-green-500", children: "Copied" })
                  ] }) : /* @__PURE__ */ I(ve, { children: [
                    /* @__PURE__ */ m(Gt, { className: "w-3 h-3" }),
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
function uC({ className: e = "", theme: t }) {
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
function dC({ editorMode: e, onModeSwitch: t }) {
  return /* @__PURE__ */ I("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
    /* @__PURE__ */ m(
      "button",
      {
        onClick: () => t("wysiwyg"),
        className: `editor-mode-toggle-btn ${e === "wysiwyg" ? "active" : ""}`,
        title: "Visual Editor",
        children: /* @__PURE__ */ m(xf, {})
      }
    ),
    /* @__PURE__ */ m(
      "button",
      {
        onClick: () => t("markdown"),
        className: `editor-mode-toggle-btn ${e === "markdown" ? "active" : ""}`,
        title: "Raw Markdown",
        children: /* @__PURE__ */ m(ea, {})
      }
    )
  ] });
}
const He = ({ onMouseDown: e, isActive: t, disabled: n, children: r, title: o }) => /* @__PURE__ */ m(
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
), ps = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }), oc = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], fC = vt(function({ editor: t, isH1: n, isH2: r, isH3: o, isH4: s, isH5: i, executeCommand: a }) {
  const [c, l] = U(!1), u = j(null), d = n ? "h1" : r ? "h2" : o ? "h3" : s ? "h4" : i ? "h5" : "paragraph", f = oc.find((g) => g.value === d)?.shortLabel || "P";
  K(() => {
    if (!c) return;
    const g = (h) => {
      u.current && !u.current.contains(h.target) && l(!1);
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [c]);
  const p = (g, h) => {
    if (g.preventDefault(), g.stopPropagation(), h === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const y = parseInt(h.replace("h", ""));
      t.chain().focus().toggleHeading({ level: y }).run();
    }
    l(!1);
  };
  return /* @__PURE__ */ I("div", { ref: u, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ I(
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
          /* @__PURE__ */ m("span", { className: "min-w-[18px] text-center", children: f }),
          /* @__PURE__ */ m(Lt, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${c ? "rotate-180" : ""}` })
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
        children: oc.map((g) => {
          const h = g.value === d;
          return /* @__PURE__ */ I(
            "button",
            {
              onMouseDown: (y) => p(y, g.value),
              className: `
                  flex items-center gap-2 w-full px-3 py-1.5 text-left text-sm
                  transition-colors duration-75
                  ${h ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"}
                `,
              children: [
                /* @__PURE__ */ m("span", { className: "w-6 text-xs font-normal text-muted-foreground", children: g.shortLabel }),
                /* @__PURE__ */ m("span", { children: g.label })
              ]
            },
            g.value
          );
        })
      }
    )
  ] });
}), mC = vt(function({ onCopy: t, iconSize: n }) {
  const [r, o] = U(!1), s = j(null);
  K(() => () => {
    s.current && clearTimeout(s.current);
  }, []);
  const i = B((a) => {
    a.preventDefault(), a.stopPropagation(), t(), o(!0), s.current && clearTimeout(s.current), s.current = setTimeout(() => o(!1), 1500);
  }, [t]);
  return /* @__PURE__ */ m(
    He,
    {
      onMouseDown: i,
      title: r ? "Copied!" : "Copy as Markdown",
      children: r ? /* @__PURE__ */ m(Kt, { size: n, className: "text-green-500" }) : /* @__PURE__ */ m(Gt, { size: n })
    }
  );
}), pC = vt(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: r = !1, aiEnabled: o = !1, onAISparklesClick: s, onCopySelectionAsMarkdown: i }) {
  const a = j(null), c = fc({
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
  }), [l, u] = U(!1), [d, f] = U(""), [p, g] = U(!1), [h, y] = U({ top: 0, left: 0 }), b = j(null), v = j(null), x = j(null), S = B(() => {
    if (d) {
      let C = d.trim();
      !/^https?:\/\//i.test(C) && !C.startsWith("mailto:") && (C = "https://" + C), t.chain().focus().extendMarkRange("link").setLink({ href: C }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    u(!1), f("");
  }, [t, d]), w = (C) => {
    C.preventDefault(), C.stopPropagation();
    const D = t.getAttributes("link").href;
    f(D || ""), u(!0);
  }, M = B((C, D) => {
    C.preventDefault(), C.stopPropagation(), D();
  }, []);
  K(() => {
    if (!t || t.isDestroyed) return;
    const C = () => {
      if (!t.isDestroyed)
        try {
          const { selection: D } = t.state, { empty: A, from: P, to: O } = D, V = ("node" in D && D.node ? D.node : null)?.type?.name === "resizableImage";
          if (A || V || t.isActive("codeBlock")) {
            x.current && (clearTimeout(x.current), x.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              g(!1), u(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const R = t.view.coordsAtPos(P), L = t.view.coordsAtPos(O), H = b.current?.offsetWidth || 500, q = b.current?.offsetHeight || 40, F = 8, Y = window.innerWidth;
          let G = 0, W = 0;
          if (b.current) {
            const de = b.current.closest('[data-slot="dialog-content"]');
            if (de) {
              const we = de.getBoundingClientRect();
              G = we.left, W = we.top;
            }
          }
          let _ = (R.left + L.left) / 2 - H / 2 - G;
          const ee = G ? Y - G : Y;
          _ = Math.max(F, Math.min(ee - H - F, _));
          let ne = R.top - q - 10 - W;
          ne < F && (ne = L.bottom + 10 - W), p ? y({ top: Math.max(F, ne), left: _ }) : (x.current && clearTimeout(x.current), x.current = setTimeout(() => {
            y({ top: Math.max(F, ne), left: _ }), g(!0);
          }, 50));
        } catch (D) {
          console.warn("FloatingToolbar: Error updating position", D);
        }
    };
    return t.on("selectionUpdate", C), () => {
      t.off("selectionUpdate", C), v.current && clearTimeout(v.current), x.current && clearTimeout(x.current);
    };
  }, [t, p]), K(() => {
    if (!p || !t || t.isDestroyed) return;
    const C = t.view.dom.closest(".editor-content") || t.view.dom.parentElement;
    if (!C) return;
    const D = () => {
      g(!1), u(!1);
    };
    return C.addEventListener("scroll", D, { passive: !0 }), window.addEventListener("scroll", D, { passive: !0 }), () => {
      C.removeEventListener("scroll", D), window.removeEventListener("scroll", D);
    };
  }, [p, t]);
  const E = (C) => {
    v.current && (clearTimeout(v.current), v.current = null);
  };
  if (!p || r)
    return null;
  const k = 15, N = l ? /* @__PURE__ */ m(
    "div",
    {
      ref: b,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: h.top,
        left: h.left
      },
      onMouseDown: E,
      children: /* @__PURE__ */ I("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ m(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: d,
            onChange: (C) => f(C.target.value),
            onKeyDown: (C) => {
              C.key === "Enter" && (C.preventDefault(), S()), C.key === "Escape" && (u(!1), f(""));
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
              onMouseDown: (C) => {
                C.preventDefault(), S();
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
              onMouseDown: (C) => {
                C.preventDefault(), u(!1), f("");
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
      ref: b,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: h.top,
        left: h.left
      },
      onMouseDown: E,
      children: [
        /* @__PURE__ */ m(
          He,
          {
            onMouseDown: (C) => M(C, () => t.chain().focus().toggleBold().run()),
            isActive: c?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(Bs, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          He,
          {
            onMouseDown: (C) => M(C, () => t.chain().focus().toggleItalic().run()),
            isActive: c?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m(Fs, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          He,
          {
            onMouseDown: (C) => M(C, () => t.chain().focus().toggleUnderline().run()),
            isActive: c?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(Us, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          He,
          {
            onMouseDown: (C) => M(C, () => t.chain().focus().toggleStrike().run()),
            isActive: c?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(Ys, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          He,
          {
            onMouseDown: (C) => M(C, () => t.chain().focus().toggleCode().run()),
            isActive: c?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(hc, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          He,
          {
            onMouseDown: (C) => M(C, () => t.chain().focus().toggleHighlight().run()),
            isActive: c?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ m(gc, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          He,
          {
            onMouseDown: w,
            isActive: c?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ m(js, { size: k })
          }
        ),
        /* @__PURE__ */ m(ps, {}),
        /* @__PURE__ */ m(
          fC,
          {
            editor: t,
            isH1: c?.isH1 ?? !1,
            isH2: c?.isH2 ?? !1,
            isH3: c?.isH3 ?? !1,
            isH4: c?.isH4 ?? !1,
            isH5: c?.isH5 ?? !1,
            executeCommand: M
          }
        ),
        /* @__PURE__ */ m(
          He,
          {
            onMouseDown: (C) => M(C, () => t.chain().focus().toggleBlockquote().run()),
            isActive: c?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(qs, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          He,
          {
            onMouseDown: (C) => M(C, () => t.chain().focus().toggleBulletList().run()),
            isActive: c?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(Vs, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          He,
          {
            onMouseDown: (C) => M(C, () => t.chain().focus().toggleOrderedList().run()),
            isActive: c?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m(Ks, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          He,
          {
            onMouseDown: (C) => M(C, () => t.chain().focus().toggleTaskList().run()),
            isActive: c?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m(Gs, { size: k })
          }
        ),
        /* @__PURE__ */ m(
          He,
          {
            onMouseDown: (C) => M(C, () => oa(t)),
            isActive: c?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(kf, { size: k })
          }
        ),
        i && /* @__PURE__ */ I(ve, { children: [
          /* @__PURE__ */ m(ps, {}),
          /* @__PURE__ */ m(mC, { onCopy: i, iconSize: k })
        ] }),
        o && /* @__PURE__ */ I(ve, { children: [
          /* @__PURE__ */ m(ps, {}),
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
              children: /* @__PURE__ */ m(ho, { size: k })
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(bt, { onMouseDown: E, children: N });
});
function hC({ editor: e, isOpen: t, onClose: n }) {
  const [r, o] = U(""), s = j(null), i = j(null), [a, c] = U({ top: 0, left: 0 });
  K(() => {
    if (t) {
      const g = e.getAttributes("link").href || "";
      o(g);
      try {
        const { view: h } = e, { from: y } = h.state.selection, b = h.coordsAtPos(y), v = b.bottom + 8, x = Math.max(16, Math.min(b.left, window.innerWidth - 420));
        c({ top: v, left: x });
      } catch {
        c({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), K(() => {
    if (!t) return;
    const g = (v) => {
      i.current && !i.current.contains(v.target) && n();
    }, h = () => {
      n();
    }, y = setTimeout(() => {
      document.addEventListener("mousedown", g);
    }, 10), b = e.view.dom.closest(".editor-content-wrapper");
    return b?.addEventListener("scroll", h), () => {
      clearTimeout(y), document.removeEventListener("mousedown", g), b?.removeEventListener("scroll", h);
    };
  }, [t, n, e]);
  const l = B((g) => {
    if (g?.preventDefault(), r.trim()) {
      let h = r.trim();
      !/^https?:\/\//i.test(h) && !h.startsWith("mailto:") && (h = "https://" + h), e.chain().focus().extendMarkRange("link").setLink({ href: h }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [r, e, n]), u = B((g) => {
    g.key === "Escape" ? (g.preventDefault(), n()) : g.key === "Enter" && (g.preventDefault(), l());
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
          /* @__PURE__ */ m(zs, { className: "link-popover-icon", size: 16 }),
          /* @__PURE__ */ m(
            "input",
            {
              ref: s,
              type: "text",
              value: r,
              onChange: (g) => o(g.target.value),
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
function gC() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
function yC({ editor: e, onEditLink: t }) {
  const [n, r] = U({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), o = j(null), s = j(null), i = j(null), a = B((w) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const M = w.getAttribute("href") || "", E = w.getBoundingClientRect(), k = E.bottom + 8, N = Math.max(16, Math.min(E.left, window.innerWidth - 340));
        i.current = w, r({
          isVisible: !0,
          url: M,
          position: { top: k, left: N },
          linkElement: w
        });
      } catch (M) {
        console.warn("LinkHoverTooltip: Error showing tooltip", M);
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
  K(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const M = (k) => {
      const C = k.target.closest("a");
      C && w.contains(C) && a(C);
    }, E = (k) => {
      const N = k.target, C = k.relatedTarget;
      if (N.closest("a")) {
        if (C && o.current?.contains(C))
          return;
        c();
      }
    };
    return w.addEventListener("mouseover", M), w.addEventListener("mouseout", E), () => {
      w.removeEventListener("mouseover", M), w.removeEventListener("mouseout", E), s.current && clearTimeout(s.current);
    };
  }, [e, a, c]), K(() => {
    if (!e || e.isDestroyed) return;
    const w = e.view.dom;
    if (!w) return;
    const M = (E) => {
      const N = E.target.closest("a");
      if (N && w.contains(N)) {
        if (i.current === N && n.isVisible)
          return;
        E.preventDefault(), E.stopPropagation(), a(N);
      }
    };
    return w.addEventListener("touchend", M, { capture: !0 }), () => {
      w.removeEventListener("touchend", M, { capture: !0 });
    };
  }, [e, a, n.isVisible]), K(() => {
    if (!n.isVisible || !gC()) return;
    const w = (E) => {
      const k = E.target;
      o.current?.contains(k) || i.current && i.current.contains(k) || l();
    }, M = setTimeout(() => {
      document.addEventListener("touchstart", w, { passive: !0 });
    }, 100);
    return () => {
      clearTimeout(M), document.removeEventListener("touchstart", w);
    };
  }, [n.isVisible, l]), K(() => {
    if (!n.isVisible) return;
    const w = () => {
      l();
    }, M = e.view.dom.closest(".editor-content-wrapper");
    return M?.addEventListener("scroll", w), window.addEventListener("scroll", w, !0), () => {
      M?.removeEventListener("scroll", w), window.removeEventListener("scroll", w, !0);
    };
  }, [n.isVisible, e, l]);
  const [d, f] = U(!1), p = B(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      f(!0), setTimeout(() => f(!1), 1500);
    });
  }, [n.url]), g = B(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), h = B(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: M } = w.state;
      let E = null, k = null;
      M.descendants((N, C) => {
        if (N.isText && N.marks.some((D) => D.type.name === "link")) {
          const D = w.nodeDOM(C);
          if (D && (D === n.linkElement || D.parentElement === n.linkElement))
            return E = C, k = C + N.nodeSize, !1;
        }
        return !0;
      }), E !== null && k !== null ? e.chain().focus().setTextSelection({ from: E, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    r((w) => ({ ...w, isVisible: !1 }));
  }, [e, n.linkElement]), y = B(() => {
    if (n.linkElement) {
      const { view: w } = e, { doc: M } = w.state;
      M.descendants((E, k) => {
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
  const b = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, x = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", S = /* @__PURE__ */ m(
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
            onClick: g,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ m(Cf, { size: 13, className: "link-hover-tooltip-link-icon" }),
              /* @__PURE__ */ m("span", { className: "link-hover-tooltip-url", children: b || "No URL" })
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
              children: /* @__PURE__ */ m(Mf, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: p,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: d ? /* @__PURE__ */ m(Kt, { size: 14, style: { color: "var(--primary)" } }) : /* @__PURE__ */ m(Gt, { size: 14 })
            }
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn link-hover-tooltip-btn-danger",
              title: "Remove link",
              children: /* @__PURE__ */ m(Tf, { size: 14 })
            }
          )
        ] })
      ] })
    }
  );
  return /* @__PURE__ */ m(bt, { children: S });
}
const vC = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(po, { size: 16 }),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(Sf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(Ef, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(Df, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(Nf, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(Af, { size: 16 }),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ m(Vs, { size: 16 }),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ m(Ks, { size: 16 }),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ m(Gs, { size: 16 }),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ m(qs, { size: 16 }),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ m(yc, { size: 16 }),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ m(hs, { size: 16 }),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ m(Ws, { size: 16 }),
    command: () => {
    },
    keywords: ["picture", "photo", "img"],
    isImageCommand: !0
  },
  {
    title: "Divider",
    icon: /* @__PURE__ */ m(vc, { size: 16 }),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ m(Qr, { size: 16, className: "text-blue-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ m(wc, { size: 16, className: "text-purple-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ m(bc, { size: 16, className: "text-amber-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ m(Xs, { size: 16, className: "text-green-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ m(Zs, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ m(kc, { size: 16, className: "text-cyan-400" }),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ m(zs, { size: 16, className: "text-cyan-400" }),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], bC = 32, wC = 8, xC = 320, kC = 210, jr = 12;
function sc(e) {
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
function CC({ editor: e }) {
  const [t, n] = U(!1), [r, o] = U(""), [s, i] = U(0), [a, c] = U(null), [l, u] = U(!1), [d, f] = U({ top: 0, left: 0 }), [p, g] = U("below"), h = j(null), y = j(-1), b = j(!1);
  K(() => {
    b.current = t;
  }, [t]);
  const v = vC.filter((N) => {
    if (!r) return !0;
    const C = r.toLowerCase();
    return N.title.toLowerCase().includes(C) || N.keywords?.some((D) => D.includes(C));
  }), x = Math.min(
    v.length * bC + wC,
    xC
  );
  mo(() => {
    if (!t || !a) return;
    const { top: N, bottom: C, left: D } = a, A = window.innerHeight, P = window.innerWidth, O = A - C - jr, $ = N - jr;
    let z;
    if (O >= x ? z = "below" : $ >= x ? z = "above" : z = O >= $ ? "below" : "above", g(z), h.current) {
      const V = Math.max(
        jr,
        Math.min(D, P - kC - jr)
      ), R = z === "below" ? C + 4 : N - x - 4;
      h.current.style.top = `${R}px`, h.current.style.left = `${V}px`;
    }
  }, [t, a, x, v.length]);
  const S = B(() => {
    const { state: N } = e, { selection: C } = N, D = C.from, A = y.current;
    if (A >= 0 && A <= D)
      e.chain().focus().deleteRange({ from: A, to: D }).run();
    else {
      const { $from: P } = C, $ = P.parent.textBetween(0, P.parentOffset, void 0, "￼").lastIndexOf("/");
      if ($ !== -1) {
        const z = P.pos - (P.parentOffset - $);
        e.chain().focus().deleteRange({ from: z, to: P.pos }).run();
      }
    }
  }, [e]), w = B(() => {
    n(!1), o(""), i(0), y.current = -1, c(null);
  }, []), M = B((N) => {
    const C = v[N];
    if (C) {
      if (S(), C.isImageCommand) {
        const { state: D } = e, A = e.view.coordsAtPos(D.selection.from);
        f({
          top: A.bottom + 8,
          left: A.left
        }), u(!0);
      } else
        C.command(e);
      w();
    }
  }, [e, v, S, w]), E = B((N, C) => {
    e.chain().focus().setImage({ src: N, alt: C }).run();
  }, [e]);
  return K(() => {
    if (!e) return;
    const N = () => {
      if (b.current) return;
      const { state: C } = e, { selection: D } = C, { $from: A } = D;
      if (A.parentOffset === 0) return;
      const P = A.parent.textBetween(0, A.parentOffset, void 0, "￼");
      if (!P.endsWith("/")) return;
      const O = P.length > 1 ? P.slice(-2, -1) : "";
      if (O && O !== " " && O !== `
`) return;
      y.current = A.pos - 1;
      const $ = sc(e);
      $ && (c($), n(!0), o(""), i(0));
    };
    return e.on("update", N), () => {
      e.off("update", N);
    };
  }, [e]), K(() => {
    if (!e || !t) return;
    const N = e.view.dom, C = (D) => {
      b.current && (D.key === "ArrowDown" ? (D.preventDefault(), D.stopPropagation(), i((A) => (A + 1) % v.length)) : D.key === "ArrowUp" ? (D.preventDefault(), D.stopPropagation(), i((A) => (A - 1 + v.length) % v.length)) : D.key === "Enter" ? (D.preventDefault(), D.stopPropagation(), M(s)) : D.key === "Escape" && (D.preventDefault(), D.stopPropagation(), w()));
    };
    return N.addEventListener("keydown", C, !0), () => {
      N.removeEventListener("keydown", C, !0);
    };
  }, [e, t, s, v, M, w]), K(() => {
    if (!e || !t) return;
    const N = () => {
      if (!b.current || y.current < 0) return;
      const { state: C } = e, { selection: D } = C, A = D.from, P = y.current;
      if (A <= P) {
        w();
        return;
      }
      try {
        const O = C.doc.textBetween(P + 1, A, void 0, "￼");
        if (O.includes(`
`)) {
          w();
          return;
        }
        o(O), i(0);
        const $ = sc(e);
        $ && c($);
      } catch {
        w();
      }
    };
    return e.on("update", N), e.on("selectionUpdate", N), () => {
      e.off("update", N), e.off("selectionUpdate", N);
    };
  }, [e, t, w]), K(() => {
    if (!t) return;
    const N = (C) => {
      h.current && !h.current.contains(C.target) && w();
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, [t, w]), K(() => {
    t && v.length === 0 && r.length > 2 && w();
  }, [t, v.length, r, w]), K(() => {
    s >= v.length && i(Math.max(0, v.length - 1));
  }, [v.length, s]), K(() => {
    if (!t || !h.current) return;
    const N = h.current.querySelector(".slash-item.is-selected");
    N && N.scrollIntoView({ block: "nearest" });
  }, [t, s]), l ? /* @__PURE__ */ m(
    Lc,
    {
      isOpen: l,
      onClose: () => u(!1),
      onInsert: E,
      position: d
    }
  ) : !t || v.length === 0 ? null : /* @__PURE__ */ m(bt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: h,
      className: `slash-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: v.map((N, C) => /* @__PURE__ */ I(
        "div",
        {
          className: `slash-item ${C === s ? "is-selected" : ""}`,
          onClick: (D) => {
            D.preventDefault(), D.stopPropagation(), M(C);
          },
          onMouseEnter: () => i(C),
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
const MC = 340, TC = 36, SC = 8, EC = 240, Vr = 8;
function ac(e) {
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
function DC({ editor: e, onSearch: t, onCreateItem: n }) {
  const [r, o] = U(!1), [s, i] = U(""), [a, c] = U([]), [l, u] = U(0), [d, f] = U(null), [p, g] = U("below"), [h, y] = U(!1), b = j(!1), v = j(null), x = j(-1), S = j(null);
  K(() => {
    b.current = r;
  }, [r]);
  const w = B(() => {
    o(!1), i(""), c([]), u(0), x.current = -1;
  }, []), M = B((D) => {
    const A = x.current;
    if (A < 0) return;
    const { state: P } = e, O = P.selection.from;
    try {
      const $ = P.tr.delete(A, O), z = P.schema.marks.wikiLink;
      if (z) {
        const V = z.create({ pageName: D }), R = P.schema.text(D, [V]);
        $.insert(A, R);
        const L = A + D.length;
        $.setSelection(Ve.create($.doc, L)), $.removeStoredMark(z);
      } else
        $.insertText(`[[${D}]]`, A);
      e.view.dispatch($), e.view.focus();
    } catch ($) {
      console.warn("WikiLinkAutocomplete: Error inserting link", $);
    }
    w();
  }, [e, w]);
  K(() => {
    if (!e) return;
    const D = () => {
      if (b.current) return;
      const { state: A } = e, { selection: P } = A, { $from: O } = P;
      if (O.parentOffset < 2 || !O.parent.textBetween(0, O.parentOffset, void 0, "￼").endsWith("[[")) return;
      x.current = O.pos - 2;
      const z = ac(e);
      z && (f(z), o(!0), i(""), c([]), u(0));
    };
    return e.on("update", D), () => {
      e.off("update", D);
    };
  }, [e]), K(() => {
    if (!e || !r) return;
    const D = e.view.dom, A = (P) => {
      if (b.current) {
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
          P.preventDefault(), P.stopPropagation(), l < a.length ? M(a[l].title) : s.trim() && n ? (n(s.trim()), w()) : s.trim() && M(s.trim());
          return;
        }
        if (P.key === "Escape") {
          P.preventDefault(), w();
          return;
        }
        P.key === "]" && setTimeout(() => {
          const { state: O } = e, { $from: $ } = O.selection;
          $.parent.textBetween(0, $.parentOffset, void 0, "￼").endsWith("]]") && w();
        }, 0);
      }
    };
    return D.addEventListener("keydown", A, !0), () => {
      D.removeEventListener("keydown", A, !0);
    };
  }, [e, r, a, l, s, M, w, n]), K(() => {
    if (!e || !r) return;
    const D = () => {
      const A = x.current;
      if (A < 0) {
        w();
        return;
      }
      const { state: P } = e, O = P.selection.from;
      if (O <= A) {
        w();
        return;
      }
      try {
        const $ = P.doc.textBetween(A + 2, O, void 0, "￼");
        if ($.includes(`
`) || $.includes("]]")) {
          w();
          return;
        }
        i($), u(0);
        const z = ac(e);
        z && f(z);
      } catch {
        w();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, r, w]), K(() => {
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
  }, [r, s, t]), K(() => {
    if (!r) return;
    const D = (A) => {
      v.current && !v.current.contains(A.target) && w();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [r, w]), K(() => {
    if (!r || !v.current) return;
    const D = v.current.querySelector(".wikilink-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [r, l]);
  const E = a.length + (s.trim() ? 1 : 0), k = Math.min(
    Math.max(E, 1) * TC + SC,
    EC
  );
  if (mo(() => {
    if (!r || !d) return;
    const { top: D, bottom: A, left: P } = d, O = window.innerHeight, $ = window.innerWidth, z = O - A - Vr, V = D - Vr;
    let R;
    if (z >= k ? R = "below" : V >= k ? R = "above" : R = z >= V ? "below" : "above", g(R), v.current) {
      const L = Math.max(
        Vr,
        Math.min(P, $ - MC - Vr)
      ), H = R === "below" ? A + 4 : D - k - 4;
      v.current.style.top = `${H}px`, v.current.style.left = `${L}px`;
    }
  }, [r, d, k, E]), !r) return null;
  const N = s.trim() && !a.some((D) => D.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ m(bt, { children: /* @__PURE__ */ I(
    "div",
    {
      ref: v,
      className: `wikilink-menu ${p === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: [
        h && a.length === 0 && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }) }),
        a.map((D, A) => /* @__PURE__ */ I(
          "div",
          {
            className: `wikilink-item ${A === l ? "is-selected" : ""}`,
            onMouseDown: (P) => {
              P.preventDefault(), M(D.title);
            },
            onMouseEnter: () => u(A),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(ea, { size: 14 }) }),
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
              D.preventDefault(), n ? (n(s.trim()), w()) : M(s.trim());
            },
            onMouseEnter: () => u(a.length),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Qs, { size: 14 }) }),
              /* @__PURE__ */ I("span", { className: "wikilink-label", children: [
                "Create “",
                s.trim(),
                "”"
              ] })
            ]
          }
        ),
        !h && a.length === 0 && !s.trim() && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }) })
      ]
    }
  ) });
}
function NC({
  src: e,
  alt: t,
  position: n,
  onSave: r,
  onDelete: o,
  onClose: s
}) {
  const [i, a] = U(e), [c, l] = U(t), u = j(null), d = j(null);
  K(() => {
    d.current?.focus(), d.current?.select();
  }, []), K(() => {
    const y = (v) => {
      u.current && !u.current.contains(v.target) && s();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 100);
    return () => {
      clearTimeout(b), document.removeEventListener("mousedown", y);
    };
  }, [s]), K(() => {
    const y = (b) => {
      b.key === "Escape" ? s() : b.key === "Enter" && (b.metaKey || b.ctrlKey) && f();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [i, c, s]);
  const f = () => {
    i.trim() && r(i.trim(), c.trim());
  }, g = (() => {
    let x = n.x - 160, S = n.y + 10;
    return x + 320 > window.innerWidth - 16 && (x = window.innerWidth - 320 - 16), x < 16 && (x = 16), S + 280 > window.innerHeight - 16 && (S = n.y - 280 - 10), S < 16 && (S = 16), { left: x, top: S };
  })(), h = /* @__PURE__ */ I(
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
        /* @__PURE__ */ I("div", { className: "image-edit-popover-header", children: [
          /* @__PURE__ */ m("span", { className: "image-edit-popover-title", children: "Edit Image" }),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: s,
              className: "image-edit-popover-close",
              "aria-label": "Close",
              children: /* @__PURE__ */ m(pt, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ I("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ I("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ I("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(js, { className: "w-3.5 h-3.5" }),
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
              /* @__PURE__ */ m(po, { className: "w-3.5 h-3.5" }),
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
              children: /* @__PURE__ */ m(un, { className: "w-4 h-4" })
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
                  /* @__PURE__ */ m(Kt, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ m(bt, { children: h });
}
function AC({ containerRef: e, enabled: t = !0 }) {
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
  return K(() => {
    if (!t || !e.current) return;
    const u = e.current;
    return u.addEventListener("dragenter", i), u.addEventListener("dragleave", a), u.addEventListener("dragover", c), u.addEventListener("drop", l), () => {
      u.removeEventListener("dragenter", i), u.removeEventListener("dragleave", a), u.removeEventListener("dragover", c), u.removeEventListener("drop", l);
    };
  }, [t, e, i, a, c, l]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ I("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(Lf, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ I("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ m("span", { className: "image-drop-zone-title", children: "Drop image here" }),
      /* @__PURE__ */ m("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" })
    ] })
  ] }) }) : null;
}
const LC = {
  SpellCheck: Rf,
  RefreshCw: If,
  Minimize2: Tc,
  Maximize2: Mc,
  FileText: ea,
  MessageSquare: Sc,
  Sparkles: ho
};
function IC({ actions: e, scope: t, onAction: n, onClose: r, position: o }) {
  const [s, i] = U(""), [a, c] = U(!1), l = j(null), u = j(null), d = e.filter((y) => y.scope === t || y.scope === "both");
  K(() => {
    const y = (v) => {
      l.current && !l.current.contains(v.target) && r();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", y);
    }, 50);
    return () => {
      clearTimeout(b), document.removeEventListener("mousedown", y);
    };
  }, [r]), K(() => {
    const y = (b) => {
      b.key === "Escape" && r();
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [r]), K(() => {
    a && u.current && u.current.focus();
  }, [a]);
  const p = B(() => {
    const b = d.length * 40 + (a ? 56 : 0) + 16, v = window.innerWidth, x = window.innerHeight;
    let S = o.top, w = o.left;
    return w + 260 > v - 8 && (w = v - 260 - 8), w < 8 && (w = 8), S + b > x - 8 && (S = o.top - b - 8), S < 8 && (S = 8), { top: S, left: w };
  }, [o, d.length, a])(), g = () => {
    s.trim() && (n("custom", s.trim()), i(""), c(!1));
  }, h = /* @__PURE__ */ m(
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
              /* @__PURE__ */ m(Sc, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ m(
                "input",
                {
                  ref: u,
                  type: "text",
                  placeholder: "Modify with prompt…",
                  value: s,
                  onChange: (y) => i(y.target.value),
                  onKeyDown: (y) => {
                    y.key === "Enter" && (y.preventDefault(), g()), y.stopPropagation();
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
              const b = y.icon ? LC[y.icon] : ho;
              return /* @__PURE__ */ I(
                "button",
                {
                  className: `
                  flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left
                  hover:bg-secondary/80 transition-colors duration-75
                  text-foreground
                `,
                  onMouseDown: (v) => {
                    v.preventDefault(), n(y.id);
                  },
                  children: [
                    b && /* @__PURE__ */ m(b, { size: 15, className: "text-muted-foreground shrink-0" }),
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
  return /* @__PURE__ */ m(bt, { onMouseDown: (y) => y.preventDefault(), children: h });
}
function RC({
  state: e,
  position: t,
  onReplace: n,
  onInsert: r,
  onRetry: o,
  onDiscard: s
}) {
  const i = j(null), a = j(null), [c, l] = U(!1), [u, d] = U(0);
  K(() => {
    if (i.current) {
      const w = new ResizeObserver((M) => {
        for (const E of M)
          d(E.contentRect.height);
      });
      return w.observe(i.current), () => w.disconnect();
    }
  }, []), K(() => {
    a.current && e.status === "streaming" && (a.current.scrollTop = a.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), K(() => {
    const w = (M) => {
      M.key === "Escape" && s();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [s]);
  const f = Nt(() => {
    const k = window.innerWidth, N = window.innerHeight;
    let C = t.selectionCenterX - 380 / 2;
    C + 380 > k - 8 && (C = k - 380 - 8), C < 8 && (C = 8);
    const D = N - t.selectionBottom - 8, A = t.selectionTop - 8, P = u || 200;
    let O, $ = !1;
    return D >= P || D >= A ? O = t.selectionBottom + 8 : (O = t.selectionTop - 8 - P, $ = !0), O < 8 && (O = 8), O + P > N - 8 && (O = N - P - 8), { top: O, left: C, placedAbove: $ };
  }, [t, u]), p = e.status === "streaming" || e.status === "complete" ? e.result : "", g = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", h = e.status === "streaming", y = e.status === "complete", b = e.status === "error", v = B(() => {
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
                h && /* @__PURE__ */ m(Cc, { size: 12, className: "animate-spin" }),
                /* @__PURE__ */ m("span", { className: "font-medium", children: b ? "Error" : g }),
                h && /* @__PURE__ */ m("span", { className: "opacity-60", children: "Generating…" })
              ] }),
              /* @__PURE__ */ m(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (w) => {
                    w.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ m(pt, { size: 14, className: "text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ m(
              "div",
              {
                ref: a,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: b ? /* @__PURE__ */ m("div", { className: "text-destructive", children: e.message }) : /* @__PURE__ */ I("div", { className: "whitespace-pre-wrap", children: [
                  p,
                  h && /* @__PURE__ */ m("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" })
                ] })
              }
            ),
            /* @__PURE__ */ I("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (y || b) && /* @__PURE__ */ I(ve, { children: [
                y && /* @__PURE__ */ I(ve, { children: [
                  /* @__PURE__ */ m(
                    cn,
                    {
                      icon: gs,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    }
                  ),
                  /* @__PURE__ */ m(
                    cn,
                    {
                      icon: Qs,
                      label: "Insert",
                      onClick: r
                    }
                  ),
                  /* @__PURE__ */ m(
                    cn,
                    {
                      icon: c ? Kt : Gt,
                      label: c ? "Copied" : "Copy",
                      onClick: v
                    }
                  )
                ] }),
                /* @__PURE__ */ m(
                  cn,
                  {
                    icon: Js,
                    label: "Retry",
                    onClick: o
                  }
                ),
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  cn,
                  {
                    icon: pt,
                    label: "Discard",
                    onClick: s
                  }
                )
              ] }),
              h && /* @__PURE__ */ I(ve, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }),
                /* @__PURE__ */ m(
                  cn,
                  {
                    icon: pt,
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
function cn({
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
function PC({
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
  onAIDropdownClose: g,
  aiState: h,
  aiPopoverPosition: y,
  onAIReplace: b,
  onAIInsert: v,
  onAIRetry: x,
  onAIDiscard: S,
  onLinkPopoverClose: w,
  onEditLink: M,
  onWikiLinkSearch: E,
  imageEditState: k,
  onImageSave: N,
  onImageDelete: C,
  onImageEditClose: D
}) {
  return /* @__PURE__ */ I(ve, { children: [
    !n.images && !n.dragAndDrop && /* @__PURE__ */ m(AC, { containerRef: r, enabled: o }),
    !t && s && /* @__PURE__ */ m(
      pC,
      {
        editor: e,
        suppressWhenLinkPopoverOpen: i,
        aiEnabled: a || !!c,
        onAISparklesClick: (A) => l(A),
        onCopySelectionAsMarkdown: u
      }
    ),
    d && f && /* @__PURE__ */ m(
      IC,
      {
        actions: f,
        scope: d.scope,
        position: d.position,
        onAction: p,
        onClose: g
      }
    ),
    h.status !== "idle" && /* @__PURE__ */ m(
      RC,
      {
        state: h,
        position: y,
        onReplace: b,
        onInsert: v,
        onRetry: x,
        onDiscard: S
      }
    ),
    !n.slashCommands && /* @__PURE__ */ m(CC, { editor: e, disabledFeatures: n }),
    !n.wikiLinks && E && /* @__PURE__ */ m(DC, { editor: e, onSearch: E }),
    /* @__PURE__ */ m(
      hC,
      {
        editor: e,
        isOpen: i,
        onClose: w
      }
    ),
    /* @__PURE__ */ m(yC, { editor: e, onEditLink: M }),
    !n.images && k?.isOpen && /* @__PURE__ */ m(
      NC,
      {
        src: k.src,
        alt: k.alt,
        position: k.position,
        onSave: N,
        onDelete: C,
        onClose: D
      }
    )
  ] });
}
function OC({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function _C(e, t) {
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
function $C(e) {
  const [t, n] = jd(_C, { status: "idle" }), r = j(null), o = B(async (a, c, l, u, d) => {
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
const ic = Vd(
  () => Promise.resolve().then(() => XC).then((e) => ({ default: e.TableOfContents }))
), HC = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, Y1 = Kd(function({
  content: t = "",
  onChange: n,
  onHTMLChange: r,
  onMarkdownChange: o,
  markdownChangeDebounceMs: s = 0,
  placeholder: i = 'Start writing... Use "/" for commands',
  editable: a = !0,
  autofocus: c = !1,
  className: l = "",
  showToolbar: u = !0,
  showWordCount: d = !0,
  theme: f,
  colorTheme: p = "colorful",
  autoSave: g = !0,
  autoSaveKey: h = "paragon-editor-content",
  autoSaveDelay: y = 1e3,
  showRecoveryBanner: b = !0,
  showFloatingToolbar: v = !0,
  maxImageSize: x = 5 * 1024 * 1024,
  onImageUploadStart: S,
  onImageUploadComplete: w,
  onImageUploadError: M,
  onImageUpload: E,
  resolveImageSrc: k,
  showModeToggle: N = !0,
  // New props
  initialMode: C = "wysiwyg",
  onModeChange: D,
  onReady: A,
  onFocus: P,
  onBlur: O,
  onSelectionChange: $,
  onDestroy: z,
  onSave: V,
  onRecover: R,
  onWikiLinkClick: L,
  validateWikiLink: H,
  onWikiLinkSearch: q,
  onLinkClick: F,
  findReplaceOpen: Y,
  onFindReplaceChange: G,
  renderToolbar: W,
  renderFooter: J,
  disabledFeatures: _ = {},
  minHeight: ee = "200px",
  maxHeight: ne,
  spellCheck: de = !0,
  headingLevels: we = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: be = [1, 2, 3],
  // TOC props
  showTableOfContents: Oe = !1,
  tocVisible: wt = !0,
  onTocVisibilityChange: Ot,
  tocTitle: Nn = "",
  tocMinLevel: An = 1,
  tocMaxLevel: cr = 4,
  tocShowLevelIndicators: lr = !1,
  tocHighlightActive: ur = !0,
  tocTreeView: dr = !1,
  tocWidth: Ln = "240px",
  tocPosition: xt = "right",
  tocScrollOffset: Qt = 20,
  onTocItemClick: fr,
  renderTocItem: mr,
  tocShowToggleButton: pr = !0,
  // Raw markdown editor
  autoClosePairs: Io = !0,
  // Performance profiler
  showPerformanceProfiler: Ro = !1,
  onPerformanceProfilerClose: Po,
  // Auto reorder checklist
  autoReorderChecklist: Oo = !1,
  // Expand selection
  progressiveSelectAll: _o = !1,
  // Auto-detection toggles
  enableTagAutoDetect: hr = !1,
  enableHexColorHighlight: $o = !1,
  enableCollapsibleHeadings: Ho = !1,
  enableCollapsibleLists: gr = !1,
  // Performance mode
  performanceMode: In = "auto",
  // Error boundary
  onEditorError: ce,
  // AI writing assistant
  aiActions: fe,
  onAIAction: re,
  onAISetupRequired: me
}, Re) {
  const [ue] = U(() => HC()), [Jt, Wo] = U(C), [yr, _t] = U(""), kt = j(C), vr = j(""), Rn = j(null), [md, La] = U(0), br = !!(fe && fe.length > 0 && re), { state: Ye, executeAction: wr, abort: pd, reset: Ct } = $C(re), [hd, zo] = U(null), [gd, yd] = U({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), vd = j(re);
  vd.current = re;
  const Ia = j(me);
  Ia.current = me;
  const [bd, wd] = U([]), [xd, kd] = U(0), Cd = B((se, Se) => {
    wd(se), kd(Se);
  }, []), Ra = j(S), Pa = j(w), Oa = j(M), _a = j(E), $a = j(k), Ha = j(L), Wa = j(H), za = j(q);
  Ra.current = S, Pa.current = w, Oa.current = M, _a.current = E, $a.current = k, Ha.current = L, Wa.current = H, za.current = q;
  const Ba = 2e3, [Bo, Md] = U(() => In === "lightweight" ? !0 : In === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > Ba : !1), Td = j(0), Fa = j(Bo);
  Fa.current = Bo;
  const [Fo, xr] = U(null), Sd = _k({
    placeholder: i,
    isMobile: ue,
    maxImageSize: x,
    headingLevels: we,
    collapsibleHeadingLevels: be,
    disabledFeatures: _,
    progressiveSelectAll: _o,
    enableCollapsibleHeadings: Ho,
    enableCollapsibleLists: gr,
    enableTagAutoDetect: hr,
    enableHexColorHighlight: $o,
    isLightweight: Bo,
    setImageEditState: xr,
    callbackRefs: {
      onImageUploadStart: Ra,
      onImageUploadComplete: Pa,
      onImageUploadError: Oa,
      onImageUpload: _a,
      resolveImageSrc: $a,
      onWikiLinkClick: Ha,
      validateWikiLink: Wa
    }
  }), { editor: oe, turndownService: kr } = Bk({
    extensions: Sd,
    content: t,
    editable: a,
    autofocus: c,
    spellCheck: de,
    initialMode: C,
    performanceMode: In,
    lightweightThreshold: Ba,
    onChange: n,
    onHTMLChange: r,
    onMarkdownChange: o,
    markdownChangeDebounceMs: s,
    onReady: A,
    onDestroy: z,
    onFocus: P,
    onBlur: O,
    onSelectionChange: $,
    onLinkClick: F,
    editorModeRef: kt,
    rawMarkdownRef: vr,
    setRawMarkdown: _t,
    setIsLightweight: Md,
    lightweightCheckCounterRef: Td,
    isLightweightRef: Fa
  }), [Ed, Cr] = U(!1), [Dd, Nd] = U(!1), Ad = Y !== void 0 ? Y : Dd, $t = B((se) => {
    Nd(se), G?.(se);
  }, [G]), [Ld, Mr] = U(0), [Id, Rd] = U(""), Ht = Kv(oe, {
    storageKey: h,
    debounceMs: y,
    enabled: g,
    onSave: (se) => {
      V?.(se);
    },
    onRecover: (se) => {
      R?.(se);
    }
  }), Uo = tC({
    editor: oe,
    turndownService: kr,
    editorModeRef: kt,
    rawMarkdownRef: vr,
    setEditorMode: Wo,
    setRawMarkdown: _t,
    onModeChange: D,
    enableTagAutoDetect: hr,
    disabledFeatures: _
  }), Ua = B((se) => {
    _t(se), vr.current = se, o?.(se);
  }, [o]), Tr = rC(oe, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: d
  });
  Gv(Re, {
    editor: oe,
    turndownService: kr,
    editorModeRef: kt,
    handleModeSwitch: Uo,
    wordCount: Tr,
    autoSaveState: Ht,
    setIsFindReplaceOpen: $t,
    setFindReplaceFocusTrigger: Mr
  }), eC({
    editorModeRef: kt,
    rawMarkdownRef: vr,
    editorMode: Jt,
    handleModeSwitch: Uo,
    setIsFindReplaceOpen: $t,
    setFindReplaceFocusTrigger: Mr
  });
  const Pd = Nt(() => ({
    openLinkPopover: () => Cr(!0),
    openFindReplace: (se) => {
      se && Rd(se), $t(!0), Mr((Se) => Se + 1);
    },
    openFindReplaceWithReplace: () => {
      $t(!0);
    }
  }), [$t]);
  Jk(oe, ue, Pd);
  const Ya = B((se, Se) => {
    if (!br) {
      Ia.current?.();
      return;
    }
    if (!oe) return;
    let Ge = { top: 0, left: 0 };
    if (Se) {
      const $e = Se.getBoundingClientRect();
      Ge = { top: $e.bottom + 4, left: $e.left };
    } else {
      const { from: $e, to: Mt } = oe.state.selection, Wt = oe.view.coordsAtPos($e), en = oe.view.coordsAtPos(Mt);
      Ge = { top: en.bottom + 8, left: (Wt.left + en.left) / 2 };
    }
    zo({ scope: se, position: Ge });
  }, [br, oe]), Od = B((se, Se) => {
    if (!oe || !fe) return;
    const Ge = fe.find((Yo) => Yo.id === se);
    if (!Ge) return;
    const { from: $e, to: Mt } = oe.state.selection, Wt = $e !== Mt ? oe.state.doc.textBetween($e, Mt, `
`) : "", en = Ge.scope === "document" || !Wt ? oe.getText() : Wt, Sr = oe.view.coordsAtPos($e), Er = oe.view.coordsAtPos(Mt);
    yd({
      selectionTop: Sr.top,
      selectionBottom: Er.bottom,
      selectionCenterX: (Sr.left + Er.right) / 2
    }), zo(null), wr(se, Ge.label, en, { from: $e, to: Mt }, Se);
  }, [oe, fe, wr]), _d = B(() => {
    if (!oe || Ye.status !== "complete") return;
    const { selectionRange: se, result: Se } = Ye;
    oe.chain().focus().setTextSelection(se).deleteSelection().insertContent(Se).run(), Ct();
  }, [oe, Ye, Ct]), $d = B(() => {
    if (!oe || Ye.status !== "complete") return;
    const { selectionRange: se, result: Se } = Ye;
    oe.chain().focus().setTextSelection(se.to).insertContent(`
` + Se).run(), Ct();
  }, [oe, Ye, Ct]), Hd = B(() => {
    if (!(Ye.status !== "complete" && Ye.status !== "error"))
      if (Ye.status === "complete") {
        const { action: se, actionLabel: Se, inputText: Ge, selectionRange: $e } = Ye;
        Ct(), wr(se, Se, Ge, $e);
      } else
        Ct();
  }, [Ye, Ct, wr]), Wd = B(() => {
    if (!oe) return;
    const { from: se, to: Se, empty: Ge } = oe.state.selection;
    if (Ge) return;
    const $e = oe.state.doc.slice(se, Se), Mt = Ff.fromSchema(oe.schema), Wt = document.createElement("div"), en = Mt.serializeFragment($e.content);
    Wt.appendChild(en);
    const Sr = Wt.innerHTML, Er = Fn(kr.turndown(Sr));
    navigator.clipboard.writeText(Er).catch(() => {
      const Yo = oe.state.doc.textBetween(se, Se, `
`);
      navigator.clipboard.writeText(Yo);
    });
  }, [oe, kr]);
  if (!oe)
    return /* @__PURE__ */ m(uC, { className: l, theme: f });
  const ja = /* @__PURE__ */ m(
    Bv,
    {
      editor: oe,
      onOpenLinkPopover: () => Cr(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        $t(!0), Mr((se) => se + 1);
      },
      disabledFeatures: _,
      autoReorderChecklist: Oo,
      aiEnabled: br || !!me,
      onAISparklesClick: (se) => Ya("document", se)
    }
  ), Va = /* @__PURE__ */ I("div", { className: "editor-footer", children: [
    g && /* @__PURE__ */ m(
      oC,
      {
        status: Ht.status,
        lastSaved: Ht.lastSaved
      }
    ),
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ I("span", { children: [
      Tr.words,
      " words"
    ] }) })
  ] }), zd = {
    minHeight: ee,
    ...ne && { maxHeight: ne, overflowY: "auto" }
  };
  return /* @__PURE__ */ I("div", { className: `markdown-editor-container ${p === "neutral" ? "color-theme-neutral" : ""} ${l}`, "data-theme": f, children: [
    g && b && Ht.hasRecoverableContent && /* @__PURE__ */ m(
      sC,
      {
        onRecover: () => {
          Ht.recover();
        },
        onDismiss: Ht.dismissRecovery
      }
    ),
    u && /* @__PURE__ */ I("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      W ? W(oe, ja) : ja,
      N && /* @__PURE__ */ m(dC, { editorMode: Jt, onModeSwitch: Uo })
    ] }),
    !ue && /* @__PURE__ */ m(
      Fv,
      {
        editor: oe,
        isOpen: Ad,
        onClose: () => $t(!1),
        focusTrigger: Ld,
        initialSearchQuery: Id,
        editorMode: Jt,
        rawMarkdown: yr,
        onRawMarkdownChange: Ua,
        onMatchesChange: Cd
      }
    ),
    /* @__PURE__ */ m(jv, { editor: oe }),
    /* @__PURE__ */ I("div", { className: `editor-main-area ${Oe ? "editor-with-toc" : ""}`, children: [
      Oe && xt === "left" && /* @__PURE__ */ m(Ka, { fallback: null, children: /* @__PURE__ */ m(
        ic,
        {
          editor: oe,
          visible: wt,
          onVisibilityChange: Ot,
          title: Nn,
          minLevel: An,
          maxLevel: cr,
          showLevelIndicators: lr,
          highlightActive: ur,
          treeView: dr,
          width: Ln,
          position: xt,
          scrollOffset: Qt,
          onItemClick: fr,
          renderItem: mr,
          showToggleButton: pr,
          scrollContainerRef: Rn
        }
      ) }),
      /* @__PURE__ */ I(
        lC,
        {
          resetKey: `${t}-${md}`,
          onRetry: () => La((se) => se + 1),
          onClearContent: () => {
            oe && oe.commands.clearContent(), n?.(""), r?.(""), o?.(""), La((se) => se + 1);
          },
          onError: ce,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: Rn, style: zd, children: Jt === "wysiwyg" ? /* @__PURE__ */ I(ve, { children: [
              /* @__PURE__ */ m(Fd, { editor: oe, className: "editor-content" }),
              /* @__PURE__ */ m(
                PC,
                {
                  editor: oe,
                  isMobile: ue,
                  disabledFeatures: _,
                  containerRef: Rn,
                  editable: a,
                  showFloatingToolbar: v,
                  isLinkPopoverOpen: Ed,
                  aiEnabled: br,
                  onAISetupRequired: me,
                  onAISparklesClick: (se) => Ya("selection", se),
                  onCopySelectionAsMarkdown: Wd,
                  aiDropdown: hd,
                  aiActions: fe,
                  onAIActionSelect: Od,
                  onAIDropdownClose: () => zo(null),
                  aiState: Ye,
                  aiPopoverPosition: gd,
                  onAIReplace: _d,
                  onAIInsert: $d,
                  onAIRetry: Hd,
                  onAIDiscard: () => {
                    pd(), Ct();
                  },
                  onLinkPopoverClose: () => Cr(!1),
                  onEditLink: () => Cr(!0),
                  onWikiLinkSearch: za.current,
                  imageEditState: Fo,
                  onImageSave: (se, Se) => {
                    oe.chain().focus().setNodeSelection(Fo.pos).updateAttributes("resizableImage", {
                      src: se,
                      alt: Se
                    }).run(), xr(null);
                  },
                  onImageDelete: () => {
                    oe.chain().focus().setNodeSelection(Fo.pos).deleteSelection().run(), xr(null);
                  },
                  onImageEditClose: () => xr(null)
                }
              )
            ] }) : /* @__PURE__ */ m(
              aC,
              {
                content: yr,
                onChange: Ua,
                placeholder: "Write your markdown here...",
                editable: a,
                autofocus: !0,
                searchMatches: bd,
                currentMatchIndex: xd,
                autoClosePairs: Io
              }
            ) }),
            /* @__PURE__ */ m(OC, { scrollContainerRef: Rn })
          ]
        }
      ),
      Oe && xt === "right" && /* @__PURE__ */ m(Ka, { fallback: null, children: /* @__PURE__ */ m(
        ic,
        {
          editor: oe,
          visible: wt,
          onVisibilityChange: Ot,
          title: Nn,
          minLevel: An,
          maxLevel: cr,
          showLevelIndicators: lr,
          highlightActive: ur,
          treeView: dr,
          width: Ln,
          position: xt,
          scrollOffset: Qt,
          onItemClick: fr,
          renderItem: mr,
          showToggleButton: pr,
          scrollContainerRef: Rn
        }
      ) })
    ] }),
    d && (J ? J(
      { words: Tr.words, characters: Tr.characters },
      Ht.status,
      Va
    ) : Va),
    /* @__PURE__ */ m(cC, { visible: Ro, onClose: Po, editor: oe })
  ] });
}), j1 = yo.create({
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
}), cd = {
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
}, WC = {
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
}, zC = {
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
}, BC = {
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
}, Bn = {
  dark: cd,
  light: WC,
  sepia: zC,
  nord: BC
};
function FC(e, t) {
  Object.entries(t.variables).forEach(([n, r]) => {
    e.style.setProperty(n, r);
  });
}
function V1(e, t, n, r) {
  const o = Bn[e] || cd;
  return {
    name: t,
    description: n,
    variables: {
      ...o.variables,
      ...r
    }
  };
}
const ld = mc(null);
function K1({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [r, o] = U(t), s = Bn[r] || Bn.dark, i = B((c) => {
    Bn[c] && o(c);
  }, []);
  K(() => {
    n?.current && FC(n.current, s);
  }, [s, n]);
  const a = {
    theme: s,
    themeName: r,
    setTheme: i,
    availableThemes: Object.keys(Bn)
  };
  return /* @__PURE__ */ m(ld.Provider, { value: a, children: e });
}
function G1() {
  const e = pc(ld);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const cc = [
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
function q1({ node: e, updateAttributes: t }) {
  const [n, r] = U(!1), o = e.attrs.language || "plaintext";
  cc.find((i) => i.value === o)?.label;
  const s = B(() => {
    const i = e.textContent;
    navigator.clipboard.writeText(i).then(() => {
      r(!0), setTimeout(() => r(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ I(vn, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ I("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ I("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: o,
            onChange: (i) => t({ language: i.target.value }),
            className: "code-block-language-select",
            children: cc.map(({ value: i, label: a }) => /* @__PURE__ */ m("option", { value: i, children: a }, i))
          }
        ),
        /* @__PURE__ */ m(Lt, { size: 12, className: "code-block-language-chevron" })
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ m(Kt, { size: 14 }) : /* @__PURE__ */ m(Gt, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m(Hs, {}) }) })
  ] });
}
const ud = "paragon-editor-toc-width", UC = 280, dd = 200, fd = 500, $n = 30, lc = 5;
function uc() {
  try {
    const e = localStorage.getItem(ud);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= dd && t <= fd)
        return t;
    }
  } catch {
  }
  return UC;
}
function YC(e) {
  try {
    localStorage.setItem(ud, String(e));
  } catch {
  }
}
function jC(e, t, n) {
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
function VC(e) {
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    t += `${r.pos}:${r.level}:${r.text};`;
  }
  return t;
}
function KC(e) {
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
function dc(e, t) {
  try {
    const n = e.state.doc.resolve(t), r = e.view.nodeDOM(n.before(n.depth + 1));
    if (r instanceof HTMLElement) return r;
    const o = e.view.nodeDOM(t);
    if (o instanceof HTMLElement) return o;
  } catch {
  }
  return null;
}
const $s = vt(function({
  item: t,
  isActive: n,
  minLevel: r,
  showLevelIndicators: o,
  hasChildren: s,
  isCollapsed: i,
  treeView: a,
  onItemClick: c,
  onToggleCollapse: l,
  style: u
}) {
  const d = (t.level - r) * 14;
  return /* @__PURE__ */ m(
    "div",
    {
      className: `toc-item ${n ? "toc-item-active" : ""} toc-level-${t.level}`,
      style: { paddingLeft: `${d + 10}px`, ...u },
      children: /* @__PURE__ */ I(
        "button",
        {
          className: "toc-item-button",
          onClick: () => c(t),
          title: t.text,
          children: [
            a && s && /* @__PURE__ */ m(
              "span",
              {
                className: "toc-collapse-toggle",
                onClick: (f) => {
                  f.stopPropagation(), l(t.id);
                },
                children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: i ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ m("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
              }
            ),
            o && /* @__PURE__ */ I("span", { className: "toc-level-indicator", children: [
              "H",
              t.level
            ] }),
            /* @__PURE__ */ m("span", { className: "toc-item-text", children: t.text })
          ]
        }
      )
    }
  );
}), GC = vt(function({
  headings: t,
  activeId: n,
  minLevel: r,
  showLevelIndicators: o,
  onItemClick: s,
  onToggleCollapse: i
}) {
  const a = j(null), [c, l] = U(0), [u, d] = U(0);
  K(() => {
    const b = a.current;
    if (!b) return;
    const v = () => {
      d(b.clientHeight);
    };
    v();
    let x = null;
    return typeof ResizeObserver < "u" && (x = new ResizeObserver(v), x.observe(b)), () => {
      x?.disconnect();
    };
  }, []);
  const f = B((b) => {
    l(b.currentTarget.scrollTop);
  }, []), p = t.length * $n, g = Math.max(0, Math.floor(c / $n) - lc), h = Math.min(
    t.length,
    Math.ceil((c + u) / $n) + lc
  ), y = Nt(() => {
    const b = [];
    for (let v = g; v < h; v++) {
      const x = t[v];
      b.push(
        /* @__PURE__ */ m(
          $s,
          {
            item: x,
            isActive: n === x.id,
            minLevel: r,
            showLevelIndicators: o,
            hasChildren: !1,
            isCollapsed: !1,
            treeView: !1,
            onItemClick: s,
            onToggleCollapse: i,
            style: {
              position: "absolute",
              top: `${v * $n}px`,
              left: 0,
              right: 0,
              height: `${$n}px`
            }
          },
          x.id
        )
      );
    }
    return b;
  }, [t, g, h, n, r, o, s, i]);
  return t.length < 30 ? /* @__PURE__ */ m(ve, { children: t.map((b) => /* @__PURE__ */ m(
    $s,
    {
      item: b,
      isActive: n === b.id,
      minLevel: r,
      showLevelIndicators: o,
      hasChildren: !1,
      isCollapsed: !1,
      treeView: !1,
      onItemClick: s,
      onToggleCollapse: i
    },
    b.id
  )) }) : /* @__PURE__ */ m(
    "div",
    {
      ref: a,
      className: "toc-virtual-container",
      onScroll: f,
      style: {
        height: "100%",
        overflow: "auto",
        position: "relative"
      },
      children: /* @__PURE__ */ m(
        "div",
        {
          style: {
            height: `${p}px`,
            position: "relative"
          },
          children: y
        }
      )
    }
  );
}), qC = vt(function({
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
  onItemClick: g,
  renderItem: h,
  showToggleButton: y = !0,
  scrollContainerRef: b
}) {
  const [v, x] = U([]), [S, w] = U(null), [M, E] = U(n), [k, N] = U(/* @__PURE__ */ new Set()), [C, D] = U(() => {
    if (d) {
      const _ = parseInt(d, 10);
      return isNaN(_) ? uc() : _;
    }
    return uc();
  }), A = j(null), P = j(null), O = j(!1), $ = j(0), z = j(0), V = j("");
  K(() => {
    E(n);
  }, [n]);
  const R = B((_) => {
    _.preventDefault(), _.stopPropagation(), O.current = !0, $.current = _.clientX, z.current = C, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [C]);
  K(() => {
    const _ = (ne) => {
      if (!O.current) return;
      const de = f === "right" ? $.current - ne.clientX : ne.clientX - $.current, we = Math.min(fd, Math.max(dd, z.current + de));
      D(we);
    }, ee = () => {
      O.current && (O.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", D((ne) => (YC(ne), ne)));
    };
    return document.addEventListener("mousemove", _), document.addEventListener("mouseup", ee), () => {
      document.removeEventListener("mousemove", _), document.removeEventListener("mouseup", ee);
    };
  }, [f]);
  const L = B(() => {
    if (!t || t.isDestroyed) return;
    const _ = jC(t, s, i), ee = VC(_);
    ee !== V.current && (V.current = ee, x(_));
  }, [t, s, i]);
  K(() => {
    if (!t) return;
    const _ = () => {
      P.current && clearTimeout(P.current), P.current = setTimeout(() => L(), 300);
    };
    return L(), t.on("update", _), t.on("create", _), () => {
      t.off("update", _), t.off("create", _), P.current && clearTimeout(P.current);
    };
  }, [t, L]), K(() => {
    if (!t || !c || !M || v.length === 0) return;
    const _ = b?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!_) return;
    const ee = () => {
      const we = _.getBoundingClientRect();
      let be = null;
      for (let Oe = v.length - 1; Oe >= 0; Oe--) {
        const wt = v[Oe], Ot = dc(t, wt.pos);
        if (Ot && Ot.getBoundingClientRect().top - we.top <= p + 10) {
          be = wt.id;
          break;
        }
      }
      !be && v.length > 0 && (be = v[0].id), w(be);
    };
    let ne;
    const de = () => {
      cancelAnimationFrame(ne), ne = requestAnimationFrame(ee);
    };
    return _.addEventListener("scroll", de, { passive: !0 }), ee(), () => {
      _.removeEventListener("scroll", de), cancelAnimationFrame(ne);
    };
  }, [t, v, c, M, p, b]);
  const H = B((_) => {
    if (!t || t.isDestroyed) return;
    const ee = dc(t, _.pos);
    if (ee) {
      const ne = b?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ne) {
        const de = ne.getBoundingClientRect(), be = ee.getBoundingClientRect().top - de.top + ne.scrollTop;
        ne.scrollTo({ top: be - p, behavior: "smooth" });
      } else
        ee.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(_.pos + 1);
    } catch {
    }
    w(_.id), g?.(_);
  }, [t, p, g, b]), q = B(() => {
    const _ = !M;
    E(_), r?.(_);
  }, [M, r]), F = B((_) => {
    N((ee) => {
      const ne = new Set(ee);
      return ne.has(_) ? ne.delete(_) : ne.add(_), ne;
    });
  }, []), Y = B((_, ee = 0) => {
    if (h) {
      const be = S === _.id;
      return h(_, be, () => H(_));
    }
    const ne = S === _.id, de = _.children && _.children.length > 0, we = k.has(_.id);
    return /* @__PURE__ */ I("div", { children: [
      /* @__PURE__ */ m(
        $s,
        {
          item: _,
          isActive: ne,
          minLevel: s,
          showLevelIndicators: a,
          hasChildren: !!de,
          isCollapsed: we,
          treeView: !0,
          onItemClick: H,
          onToggleCollapse: F
        }
      ),
      de && !we && /* @__PURE__ */ m("div", { className: "toc-children", children: _.children.map((be) => Y(be, ee + 1)) })
    ] }, _.id);
  }, [S, k, H, F, s, a, h]), G = B((_) => _.map((ee) => Y(ee)), [Y]), W = B(() => h ? v.map((_) => {
    const ee = S === _.id;
    return /* @__PURE__ */ m("div", { children: h(_, ee, () => H(_)) }, _.id);
  }) : null, [v, S, h, H]);
  if (!t) return null;
  const J = l ? KC(v) : [];
  return /* @__PURE__ */ I(ve, { children: [
    y && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: q,
        title: M ? "Hide Table of Contents" : "Show Table of Contents",
        children: M ? /* @__PURE__ */ m(Pf, { size: 16 }) : /* @__PURE__ */ m(Of, { size: 16 })
      }
    ),
    /* @__PURE__ */ I(
      "div",
      {
        ref: A,
        className: `toc-sidebar ${M ? "toc-visible" : "toc-hidden"} toc-${f} ${u}`,
        style: { width: M ? `${C}px` : "0px" },
        children: [
          M && /* @__PURE__ */ m(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: R
            }
          ),
          /* @__PURE__ */ I("div", { className: "toc-inner", children: [
            o && /* @__PURE__ */ m("div", { className: "toc-header", children: /* @__PURE__ */ m("span", { className: "toc-title", children: o }) }),
            /* @__PURE__ */ m("div", { className: "toc-content toc-content-with-toggle", children: v.length === 0 ? /* @__PURE__ */ I("div", { className: "toc-empty", children: [
              /* @__PURE__ */ m("p", { children: "No headings yet" }),
              /* @__PURE__ */ m("p", { className: "toc-empty-hint", children: "Add headings to see the outline." })
            ] }) : /* @__PURE__ */ m("div", { className: "toc-list", children: l ? G(J) : h ? W() : /* @__PURE__ */ m(
              GC,
              {
                headings: v,
                activeId: S,
                minLevel: s,
                showLevelIndicators: a,
                onItemClick: H,
                onToggleCollapse: F
              }
            ) }) })
          ] })
        ]
      }
    )
  ] });
}), XC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TableOfContents: qC
}, Symbol.toStringTag, { value: "Module" }));
export {
  oC as AutoSaveIndicator,
  j1 as Callout,
  Zx as CalloutInputRule,
  q1 as CodeBlockComponent,
  Vx as CollapsibleHeading,
  hb as CollapsibleList,
  Ax as DatePill,
  K1 as EditorThemeProvider,
  Bv as EditorToolbar,
  Fv as FindReplace,
  pC as FloatingToolbar,
  AC as ImageDropZone,
  Ok as ImageUpload,
  Y1 as MarkdownEditor,
  qx as MarkdownLinkInputRule,
  Fx as MarkdownPasteSafe,
  cb as MixedBulletList,
  fb as MixedListItem,
  lb as MixedOrderedList,
  db as MixedTaskItem,
  ub as MixedTaskList,
  sC as RecoveryBanner,
  vb as ResizableImage,
  Qx as SearchHighlight,
  jv as SelectAllActionBar,
  Ck as SelectAllOccurrences,
  CC as SlashCommands,
  tk as TabIndent,
  qC as TableOfContents,
  Rx as TagPill,
  Ox as WikiLinkSafe,
  FC as applyTheme,
  V1 as createCustomTheme,
  cd as darkTheme,
  Aa as getDateVariant,
  ln as isValidTag,
  WC as lightTheme,
  ym as loadLanguageIfNeeded,
  ye as lowlight,
  BC as nordTheme,
  jn as normalizeTag,
  Ft as parseDateFromMarkdown,
  zC as sepiaTheme,
  Bn as themes,
  Kv as useAutoSave,
  G1 as useEditorTheme,
  rC as useWordCount
};
//# sourceMappingURL=paragon.js.map
