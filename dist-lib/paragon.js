import { jsxDEV as m, Fragment as ye } from "react/jsx-dev-runtime";
import { ReactNodeViewRenderer as lr, NodeViewWrapper as vn, NodeViewContent as Os, useEditorState as al, useEditor as _d, EditorContent as $d } from "@tiptap/react";
import * as T from "react";
import X, { useState as U, useRef as V, useEffect as G, useCallback as H, useLayoutEffect as cr, memo as jt, useImperativeHandle as Bd, createContext as ll, useContext as cl, useMemo as Ut, Component as Wd, useReducer as Hd, forwardRef as Fd } from "react";
import zd from "@tiptap/extension-code-block-lowlight";
import { createLowlight as Ud } from "lowlight";
import { ChevronDown as Dt, Check as Vt, Copy as Kt, Image as _s, X as ht, Link2 as $s, Type as ur, Undo as Yd, Redo as jd, Bold as Bs, Italic as Ws, Underline as Hs, Strikethrough as Fs, Code as ul, Highlighter as dl, Link as zs, List as Us, ListOrdered as Ys, CheckSquare as js, Quote as Vs, Code2 as ml, IndentIncrease as Vd, IndentDecrease as Kd, Table as fs, Minus as fl, Info as Go, BookOpen as Ks, PenLine as Gd, Library as qd, ListTodo as Gs, Columns as Yi, Trash2 as un, Rows as ji, ToggleLeft as Vi, ArrowUpDown as Xd, Sparkles as dr, Search as Zd, ChevronUp as Qd, MousePointerClick as Jd, CaseSensitive as em, WholeWord as tm, Regex as nm, Replace as hs, ReplaceAll as om, Plus as qs, ClipboardList as rm, MessageSquareText as hl, StickyNote as pl, ChevronRight as gl, ChevronLeftIcon as sm, ChevronRightIcon as im, ChevronDownIcon as am, Calendar as bl, Hash as Ki, Cloud as lm, Loader2 as vl, CloudOff as cm, AlertCircle as um, RotateCcw as Xs, Activity as dm, Maximize2 as wl, Minimize2 as Nl, AlertTriangle as mm, CheckCircle2 as fm, Eye as hm, FileText as Zs, FileCode as pm, ExternalLink as gm, Pencil as bm, Unlink as vm, Heading1 as wm, Heading2 as Nm, Heading3 as ym, Heading4 as km, Heading5 as xm, ImagePlus as Cm, MessageSquare as yl, RefreshCw as Tm, SpellCheck as Em, PanelRightClose as Sm, PanelRightOpen as Mm } from "lucide-react";
import { Plugin as xe, PluginKey as Ce, TextSelection as Ve, NodeSelection as Dm, AllSelection as Am } from "@tiptap/pm/state";
import Qs from "highlight.js/lib/languages/javascript";
import Js from "highlight.js/lib/languages/typescript";
import kl from "highlight.js/lib/languages/python";
import ei from "highlight.js/lib/languages/xml";
import Pm from "highlight.js/lib/languages/css";
import Im from "highlight.js/lib/languages/json";
import mr from "highlight.js/lib/languages/bash";
import { jsx as z, Fragment as Rm, jsxs as Lm } from "react/jsx-runtime";
import * as xl from "react-dom";
import Om, { createPortal as _m } from "react-dom";
import { Fragment as Cl, Slice as Ur, DOMSerializer as $m } from "@tiptap/pm/model";
import Bm from "@tiptap/starter-kit";
import Wm from "@tiptap/extension-placeholder";
import Hm from "@tiptap/extension-text-align";
import Fm from "@tiptap/extension-highlight";
import zm from "@tiptap/extension-link";
import { Table as Um } from "@tiptap/extension-table";
import Ym from "@tiptap/extension-table-row";
import jm from "@tiptap/extension-table-cell";
import Vm from "@tiptap/extension-table-header";
import { Extension as ze, Node as fr, mergeAttributes as kn, InputRule as Oe, Mark as Tl } from "@tiptap/core";
import { DecorationSet as je, Decoration as Ze } from "@tiptap/pm/view";
import Km from "@tiptap/extension-bullet-list";
import Gm from "@tiptap/extension-ordered-list";
import qm from "@tiptap/extension-list-item";
import Xm from "@tiptap/extension-task-list";
import Zm from "@tiptap/extension-task-item";
import { findWrapping as Gi, canJoin as Qm } from "@tiptap/pm/transform";
import Jm from "@tiptap/extension-underline";
import ef from "@tiptap/extension-subscript";
import tf from "@tiptap/extension-superscript";
import nf from "@tiptap/extension-typography";
import of from "@tiptap/extension-image";
import { createRoot as rf } from "react-dom/client";
import { liftListItem as qi, sinkListItem as Xi } from "@tiptap/pm/schema-list";
import { undo as sf, redo as af } from "@tiptap/pm/history";
import lf from "@tiptap/extension-horizontal-rule";
import cf from "@tiptap/extension-code";
import uf from "@tiptap/extension-bold";
import df from "@tiptap/extension-italic";
import mf from "@tiptap/extension-strike";
const ve = Ud();
ve.register("javascript", Qs);
ve.register("js", Qs);
ve.register("jsx", Qs);
ve.register("typescript", Js);
ve.register("ts", Js);
ve.register("tsx", Js);
ve.register("python", kl);
ve.register("py", kl);
ve.register("xml", ei);
ve.register("html", ei);
ve.register("svg", ei);
ve.register("css", Pm);
ve.register("json", Im);
ve.register("bash", mr);
ve.register("sh", mr);
ve.register("shell", mr);
ve.register("zsh", mr);
const ps = {
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
}, Co = /* @__PURE__ */ new Set(), To = /* @__PURE__ */ new Set();
async function ff(e) {
  if (ve.registered(e)) return !0;
  const t = ps[e];
  if (!t) return !1;
  if (To.has(e)) return !0;
  if (Co.has(e))
    return new Promise((n) => {
      const o = () => {
        To.has(e) ? n(!0) : Co.has(e) ? setTimeout(o, 50) : n(!1);
      };
      setTimeout(o, 50);
    });
  Co.add(e);
  try {
    const o = (await t()).default;
    ve.register(e, o), To.add(e);
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
          a !== e && !ve.registered(a) && (ve.register(a, o), To.add(a));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Co.delete(e);
  }
}
function hf({ node: e, updateAttributes: t, extension: n }) {
  const [o, r] = U(!1), [s, a] = U(!1), [i, l] = U(!0), c = V(null), u = e.attrs.language || "plaintext";
  G(() => {
    const p = c.current;
    if (!p || s) return;
    const b = new IntersectionObserver(
      (w) => {
        for (const v of w)
          v.isIntersecting && (a(!0), b.unobserve(p));
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
  }, [s]), G(() => {
    if (s && u !== "plaintext") {
      if (ve.registered(u)) {
        l(!0);
        return;
      }
      ps[u] && (l(!1), ff(u).then((p) => {
        l(p);
      }));
    }
  }, [s, u]);
  const d = H(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), r(!0), setTimeout(() => r(!1), 2e3);
    } catch (p) {
      console.error("Failed to copy:", p);
    }
  }, [e.textContent]), f = n.options.lowlight?.listLanguages?.() || [], h = Array.from(/* @__PURE__ */ new Set([...f, ...Object.keys(ps)])).sort(), g = u === "plaintext" ? "Plain Text" : u.charAt(0).toUpperCase() + u.slice(1);
  return /* @__PURE__ */ m(vn, { className: "code-block-wrapper", ref: c, children: [
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
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 267,
                columnNumber: 13
              }, this),
              h.map((p) => /* @__PURE__ */ m("option", { value: p, children: p.charAt(0).toUpperCase() + p.slice(1) }, p, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 269,
                columnNumber: 15
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 262,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m("span", { className: "code-block-language-label", children: g }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 274,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(Dt, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 275,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
        lineNumber: 261,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: d,
          className: `code-block-copy-btn ${o ? "copied" : ""}`,
          title: o ? "Copied!" : "Copy code",
          children: o ? /* @__PURE__ */ m(Vt, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 283,
            columnNumber: 21
          }, this) : /* @__PURE__ */ m(Kt, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 283,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 277,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 260,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!s || !i ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m(Os, { className: s && i ? `language-${u}` : "language-plaintext" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 290,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 289,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
    lineNumber: 258,
    columnNumber: 5
  }, this);
}
const pf = zd.configure({
  lowlight: ve,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
}).extend({
  addNodeView() {
    return lr(hf, {
      update: ({ oldNode: e, newNode: t, updateProps: n }) => {
        const o = e.attrs.language !== t.attrs.language, r = !e.content.eq(t.content);
        return (o || r) && n(), !0;
      }
    });
  },
  addKeyboardShortcuts() {
    return {
      ...this.parent?.() ?? {},
      "Mod-Alt-c": () => ti(this.editor)
    };
  },
  addProseMirrorPlugins() {
    const e = this.parent?.() ?? [], t = this.type;
    return [
      // Plugin: Handle ``` + Enter shortcut to create code block with cursor inside
      new xe({
        key: new Ce("codeBlockEnterShortcut"),
        props: {
          handleKeyDown(n, o) {
            if (o.key !== "Enter") return !1;
            const { state: r } = n, { $from: s, empty: a } = r.selection;
            if (!a || s.parent.type.spec.code) return !1;
            const l = s.parent.textBetween(
              0,
              s.parentOffset,
              void 0,
              "￼"
            ).match(/^```([a-zA-Z]*)$/);
            if (!l) return !1;
            o.preventDefault();
            const c = l[1] || null, u = r.tr, d = r.schema.nodes.paragraph, f = t.create({ language: c }, void 0), h = s.before(s.depth), g = s.after(s.depth), p = d.create();
            u.replaceWith(h, g, [f, p]);
            const b = h + 1;
            return u.setSelection(Ve.create(u.doc, b)), n.dispatch(u), !0;
          }
        }
      }),
      ...e
    ];
  }
});
function ti(e) {
  const { state: t } = e, { from: n, to: o, empty: r } = t.selection;
  if (e.isActive("codeBlock") || r)
    return e.chain().focus().toggleCodeBlock().run();
  let s = 0;
  const a = [];
  if (t.doc.nodesBetween(n, o, (p) => p.isTextblock ? (s++, a.push(p.textContent), !1) : !0), s <= 1)
    return e.chain().focus().toggleCodeBlock().run();
  const i = a.join(`
`), l = t.schema.nodes.codeBlock, c = t.doc.resolve(n), u = t.doc.resolve(o), d = Math.max(1, c.depth), f = Math.max(1, u.depth), h = c.before(d), g = u.after(f);
  return e.chain().focus().command(({ tr: p }) => {
    const b = l.create(
      { language: null },
      i ? t.schema.text(i) : void 0
    );
    return p.replaceWith(h, g, b), !0;
  }).run();
}
function El({ isOpen: e, onClose: t, onInsert: n, position: o }) {
  const [r, s] = U(""), [a, i] = U(""), [l, c] = U(""), [u, d] = U(!1), f = V(null), h = V(null);
  G(() => {
    e && (s(""), i(""), c(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), G(() => {
    if (!e) return;
    const v = (N) => {
      h.current && !h.current.contains(N.target) && t();
    }, y = (N) => {
      N.key === "Escape" && t();
    }, E = setTimeout(() => {
      document.addEventListener("mousedown", v);
    }, 100);
    return document.addEventListener("keydown", y), () => {
      clearTimeout(E), document.removeEventListener("mousedown", v), document.removeEventListener("keydown", y);
    };
  }, [e, t]);
  const g = (v) => {
    if (!v.trim())
      return c("Please enter an image URL"), !1;
    try {
      const y = new URL(v);
      if (!["http:", "https:", "data:"].includes(y.protocol))
        return c("URL must start with http://, https://, or be a data URL"), !1;
    } catch {
      return c("Please enter a valid URL"), !1;
    }
    return c(""), !0;
  }, p = async () => {
    if (!g(r)) return;
    d(!0);
    const v = new window.Image();
    v.onload = () => {
      d(!1), n(r.trim(), a.trim()), t();
    }, v.onerror = () => {
      d(!1), n(r.trim(), a.trim()), t();
    }, setTimeout(() => {
      u && (d(!1), n(r.trim(), a.trim()), t());
    }, 3e3), v.src = r.trim();
  }, b = (v) => {
    v.key === "Enter" && !v.shiftKey && (v.preventDefault(), p());
  };
  if (!e) return null;
  const w = o ? {
    top: o.top,
    left: Math.min(o.left, typeof window < "u" ? window.innerWidth - 340 : o.left)
  } : { top: "50%", left: "50%" };
  return /* @__PURE__ */ m(
    "div",
    {
      ref: h,
      className: "image-url-dialog fixed z-50",
      style: {
        top: (typeof w.top == "number", w.top),
        left: typeof w.left == "number" ? Math.max(8, w.left) : w.left,
        transform: o ? void 0 : "translate(-50%, -50%)"
      },
      children: [
        /* @__PURE__ */ m("div", { className: "image-url-dialog-header", children: [
          /* @__PURE__ */ m("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ m(_s, { size: 16, className: "text-primary" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 148,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m("span", { className: "font-medium text-sm", children: "Insert Image from URL" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 149,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
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
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 156,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 151,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
          lineNumber: 146,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("div", { className: "image-url-dialog-content", children: [
          /* @__PURE__ */ m("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ m("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m($s, { size: 12 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 165,
                columnNumber: 13
              }, this),
              "Image URL"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 164,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                ref: f,
                type: "url",
                value: r,
                onChange: (v) => {
                  s(v.target.value), l && c("");
                },
                onKeyDown: b,
                placeholder: "https://example.com/image.jpg",
                className: `image-url-dialog-input ${l ? "error" : ""}`
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 168,
                columnNumber: 11
              },
              this
            ),
            l && /* @__PURE__ */ m("span", { className: "image-url-dialog-error", children: l }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 181,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 163,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("div", { className: "image-url-dialog-field", children: [
            /* @__PURE__ */ m("label", { className: "image-url-dialog-label", children: [
              /* @__PURE__ */ m(ur, { size: 12 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 188,
                columnNumber: 13
              }, this),
              "Alt Text (optional)"
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
              lineNumber: 187,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                type: "text",
                value: a,
                onChange: (v) => i(v.target.value),
                onKeyDown: b,
                placeholder: "Describe the image",
                className: "image-url-dialog-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 191,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
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
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
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
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
                lineNumber: 209,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
            lineNumber: 202,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
          lineNumber: 161,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageURLDialog.tsx",
      lineNumber: 136,
      columnNumber: 5
    },
    this
  );
}
function ae(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
function Zi(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function hr(...e) {
  return (t) => {
    let n = !1;
    const o = e.map((r) => {
      const s = Zi(r, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const s = o[r];
          typeof s == "function" ? s() : Zi(e[r], null);
        }
      };
  };
}
function Re(...e) {
  return T.useCallback(hr(...e), e);
}
function xn(e, t = []) {
  let n = [];
  function o(s, a) {
    const i = T.createContext(a), l = n.length;
    n = [...n, a];
    const c = (d) => {
      const { scope: f, children: h, ...g } = d, p = f?.[e]?.[l] || i, b = T.useMemo(() => g, Object.values(g));
      return /* @__PURE__ */ z(p.Provider, { value: b, children: h });
    };
    c.displayName = s + "Provider";
    function u(d, f) {
      const h = f?.[e]?.[l] || i, g = T.useContext(h);
      if (g) return g;
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
  return r.scopeName = e, [o, gf(r, ...t)];
}
function gf(...e) {
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
}, bf = T[" useInsertionEffect ".trim().toString()] || At;
function ni({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = vf({
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
        const d = wf(u) ? u(e) : u;
        d !== e && a.current?.(d);
      } else
        s(u);
    },
    [i, e, s, a]
  );
  return [l, c];
}
function vf({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = T.useState(e), r = T.useRef(n), s = T.useRef(t);
  return bf(() => {
    s.current = t;
  }, [t]), T.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function wf(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function Un(e) {
  const t = /* @__PURE__ */ yf(e), n = T.forwardRef((o, r) => {
    const { children: s, ...a } = o, i = T.Children.toArray(s), l = i.find(xf);
    if (l) {
      const c = l.props.children, u = i.map((d) => d === l ? T.Children.count(c) > 1 ? T.Children.only(null) : T.isValidElement(c) ? c.props.children : null : d);
      return /* @__PURE__ */ z(t, { ...a, ref: r, children: T.isValidElement(c) ? T.cloneElement(c, void 0, u) : null });
    }
    return /* @__PURE__ */ z(t, { ...a, ref: r, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Nf = /* @__PURE__ */ Un("Slot");
// @__NO_SIDE_EFFECTS__
function yf(e) {
  const t = T.forwardRef((n, o) => {
    const { children: r, ...s } = n;
    if (T.isValidElement(r)) {
      const a = Tf(r), i = Cf(s, r.props);
      return r.type !== T.Fragment && (i.ref = o ? hr(o, a) : a), T.cloneElement(r, i);
    }
    return T.Children.count(r) > 1 ? T.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Sl = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function kf(e) {
  const t = ({ children: n }) => /* @__PURE__ */ z(Rm, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Sl, t;
}
function xf(e) {
  return T.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Sl;
}
function Cf(e, t) {
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
function Tf(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Ef = [
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
], Pe = Ef.reduce((e, t) => {
  const n = /* @__PURE__ */ Un(`Primitive.${t}`), o = T.forwardRef((r, s) => {
    const { asChild: a, ...i } = r, l = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ z(l, { ...i, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Ml(e, t) {
  e && xl.flushSync(() => e.dispatchEvent(t));
}
function Dl(e) {
  const t = e + "CollectionProvider", [n, o] = xn(t), [r, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (p) => {
    const { scope: b, children: w } = p, v = X.useRef(null), y = X.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ z(r, { scope: b, itemMap: y, collectionRef: v, children: w });
  };
  a.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ Un(i), c = X.forwardRef(
    (p, b) => {
      const { scope: w, children: v } = p, y = s(i, w), E = Re(b, y.collectionRef);
      return /* @__PURE__ */ z(l, { ref: E, children: v });
    }
  );
  c.displayName = i;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ Un(u), h = X.forwardRef(
    (p, b) => {
      const { scope: w, children: v, ...y } = p, E = X.useRef(null), N = Re(b, E), x = s(u, w);
      return X.useEffect(() => (x.itemMap.set(E, { ref: E, ...y }), () => void x.itemMap.delete(E))), /* @__PURE__ */ z(f, { [d]: "", ref: N, children: v });
    }
  );
  h.displayName = u;
  function g(p) {
    const b = s(e + "CollectionConsumer", p);
    return X.useCallback(() => {
      const v = b.collectionRef.current;
      if (!v) return [];
      const y = Array.from(v.querySelectorAll(`[${d}]`));
      return Array.from(b.itemMap.values()).sort(
        (x, S) => y.indexOf(x.ref.current) - y.indexOf(S.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: a, Slot: c, ItemSlot: h },
    g,
    o
  ];
}
var Sf = T.createContext(void 0);
function Al(e) {
  const t = T.useContext(Sf);
  return e || t || "ltr";
}
function pt(e) {
  const t = T.useRef(e);
  return T.useEffect(() => {
    t.current = e;
  }), T.useMemo(() => (...n) => t.current?.(...n), []);
}
function Mf(e, t = globalThis?.document) {
  const n = pt(e);
  T.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var Df = "DismissableLayer", gs = "dismissableLayer.update", Af = "dismissableLayer.pointerDownOutside", Pf = "dismissableLayer.focusOutside", Qi, Pl = T.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), oi = T.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...l
    } = e, c = T.useContext(Pl), [u, d] = T.useState(null), f = u?.ownerDocument ?? globalThis?.document, [, h] = T.useState({}), g = Re(t, (S) => d(S)), p = Array.from(c.layers), [b] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), w = p.indexOf(b), v = u ? p.indexOf(u) : -1, y = c.layersWithOutsidePointerEventsDisabled.size > 0, E = v >= w, N = Lf((S) => {
      const k = S.target, D = [...c.branches].some((C) => C.contains(k));
      !E || D || (r?.(S), a?.(S), S.defaultPrevented || i?.());
    }, f), x = Of((S) => {
      const k = S.target;
      [...c.branches].some((C) => C.contains(k)) || (s?.(S), a?.(S), S.defaultPrevented || i?.());
    }, f);
    return Mf((S) => {
      v === c.layers.size - 1 && (o?.(S), !S.defaultPrevented && i && (S.preventDefault(), i()));
    }, f), T.useEffect(() => {
      if (u)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (Qi = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(u)), c.layers.add(u), Ji(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = Qi);
        };
    }, [u, f, n, c]), T.useEffect(() => () => {
      u && (c.layers.delete(u), c.layersWithOutsidePointerEventsDisabled.delete(u), Ji());
    }, [u, c]), T.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(gs, S), () => document.removeEventListener(gs, S);
    }, []), /* @__PURE__ */ z(
      Pe.div,
      {
        ...l,
        ref: g,
        style: {
          pointerEvents: y ? E ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ae(e.onFocusCapture, x.onFocusCapture),
        onBlurCapture: ae(e.onBlurCapture, x.onBlurCapture),
        onPointerDownCapture: ae(
          e.onPointerDownCapture,
          N.onPointerDownCapture
        )
      }
    );
  }
);
oi.displayName = Df;
var If = "DismissableLayerBranch", Rf = T.forwardRef((e, t) => {
  const n = T.useContext(Pl), o = T.useRef(null), r = Re(t, o);
  return T.useEffect(() => {
    const s = o.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ z(Pe.div, { ...e, ref: r });
});
Rf.displayName = If;
function Lf(e, t = globalThis?.document) {
  const n = pt(e), o = T.useRef(!1), r = T.useRef(() => {
  });
  return T.useEffect(() => {
    const s = (i) => {
      if (i.target && !o.current) {
        let l = function() {
          Il(
            Af,
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
function Of(e, t = globalThis?.document) {
  const n = pt(e), o = T.useRef(!1);
  return T.useEffect(() => {
    const r = (s) => {
      s.target && !o.current && Il(Pf, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function Ji() {
  const e = new CustomEvent(gs);
  document.dispatchEvent(e);
}
function Il(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? Ml(r, s) : r.dispatchEvent(s);
}
var Yr = 0;
function _f() {
  T.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? ea()), document.body.insertAdjacentElement("beforeend", e[1] ?? ea()), Yr++, () => {
      Yr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Yr--;
    };
  }, []);
}
function ea() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var jr = "focusScope.autoFocusOnMount", Vr = "focusScope.autoFocusOnUnmount", ta = { bubbles: !1, cancelable: !0 }, $f = "FocusScope", Rl = T.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: o = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, l] = T.useState(null), c = pt(r), u = pt(s), d = T.useRef(null), f = Re(t, (p) => l(p)), h = T.useRef({
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
      }, w = function(y) {
        if (document.activeElement === document.body)
          for (const N of y)
            N.removedNodes.length > 0 && St(i);
      };
      document.addEventListener("focusin", p), document.addEventListener("focusout", b);
      const v = new MutationObserver(w);
      return i && v.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", b), v.disconnect();
      };
    }
  }, [o, i, h.paused]), T.useEffect(() => {
    if (i) {
      oa.add(h);
      const p = document.activeElement;
      if (!i.contains(p)) {
        const w = new CustomEvent(jr, ta);
        i.addEventListener(jr, c), i.dispatchEvent(w), w.defaultPrevented || (Bf(Uf(Ll(i)), { select: !0 }), document.activeElement === p && St(i));
      }
      return () => {
        i.removeEventListener(jr, c), setTimeout(() => {
          const w = new CustomEvent(Vr, ta);
          i.addEventListener(Vr, u), i.dispatchEvent(w), w.defaultPrevented || St(p ?? document.body, { select: !0 }), i.removeEventListener(Vr, u), oa.remove(h);
        }, 0);
      };
    }
  }, [i, c, u, h]);
  const g = T.useCallback(
    (p) => {
      if (!n && !o || h.paused) return;
      const b = p.key === "Tab" && !p.altKey && !p.ctrlKey && !p.metaKey, w = document.activeElement;
      if (b && w) {
        const v = p.currentTarget, [y, E] = Wf(v);
        y && E ? !p.shiftKey && w === E ? (p.preventDefault(), n && St(y, { select: !0 })) : p.shiftKey && w === y && (p.preventDefault(), n && St(E, { select: !0 })) : w === v && p.preventDefault();
      }
    },
    [n, o, h.paused]
  );
  return /* @__PURE__ */ z(Pe.div, { tabIndex: -1, ...a, ref: f, onKeyDown: g });
});
Rl.displayName = $f;
function Bf(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (St(o, { select: t }), document.activeElement !== n) return;
}
function Wf(e) {
  const t = Ll(e), n = na(t, e), o = na(t.reverse(), e);
  return [n, o];
}
function Ll(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const r = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function na(e, t) {
  for (const n of e)
    if (!Hf(n, { upTo: t })) return n;
}
function Hf(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Ff(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function St(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Ff(e) && t && e.select();
  }
}
var oa = zf();
function zf() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = ra(e, t), e.unshift(t);
    },
    remove(t) {
      e = ra(e, t), e[0]?.resume();
    }
  };
}
function ra(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Uf(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Yf = T[" useId ".trim().toString()] || (() => {
}), jf = 0;
function qo(e) {
  const [t, n] = T.useState(Yf());
  return At(() => {
    n((o) => o ?? String(jf++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Vf = ["top", "right", "bottom", "left"], Pt = Math.min, We = Math.max, Xo = Math.round, Eo = Math.floor, rt = (e) => ({
  x: e,
  y: e
}), Kf = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Gf = {
  start: "end",
  end: "start"
};
function bs(e, t, n) {
  return We(e, Pt(t, n));
}
function gt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function bt(e) {
  return e.split("-")[0];
}
function Cn(e) {
  return e.split("-")[1];
}
function ri(e) {
  return e === "x" ? "y" : "x";
}
function si(e) {
  return e === "y" ? "height" : "width";
}
const qf = /* @__PURE__ */ new Set(["top", "bottom"]);
function nt(e) {
  return qf.has(bt(e)) ? "y" : "x";
}
function ii(e) {
  return ri(nt(e));
}
function Xf(e, t, n) {
  n === void 0 && (n = !1);
  const o = Cn(e), r = ii(e), s = si(r);
  let a = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Zo(a)), [a, Zo(a)];
}
function Zf(e) {
  const t = Zo(e);
  return [vs(e), t, vs(t)];
}
function vs(e) {
  return e.replace(/start|end/g, (t) => Gf[t]);
}
const sa = ["left", "right"], ia = ["right", "left"], Qf = ["top", "bottom"], Jf = ["bottom", "top"];
function eh(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ia : sa : t ? sa : ia;
    case "left":
    case "right":
      return t ? Qf : Jf;
    default:
      return [];
  }
}
function th(e, t, n, o) {
  const r = Cn(e);
  let s = eh(bt(e), n === "start", o);
  return r && (s = s.map((a) => a + "-" + r), t && (s = s.concat(s.map(vs)))), s;
}
function Zo(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Kf[t]);
}
function nh(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ol(e) {
  return typeof e != "number" ? nh(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Qo(e) {
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
function aa(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const s = nt(t), a = ii(t), i = si(a), l = bt(t), c = s === "y", u = o.x + o.width / 2 - r.width / 2, d = o.y + o.height / 2 - r.height / 2, f = o[i] / 2 - r[i] / 2;
  let h;
  switch (l) {
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
  switch (Cn(t)) {
    case "start":
      h[a] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      h[a] += f * (n && c ? -1 : 1);
      break;
  }
  return h;
}
const oh = async (e, t, n) => {
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
  } = aa(c, o, l), f = o, h = {}, g = 0;
  for (let p = 0; p < i.length; p++) {
    const {
      name: b,
      fn: w
    } = i[p], {
      x: v,
      y,
      data: E,
      reset: N
    } = await w({
      x: u,
      y: d,
      initialPlacement: o,
      placement: f,
      strategy: r,
      middlewareData: h,
      rects: c,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = v ?? u, d = y ?? d, h = {
      ...h,
      [b]: {
        ...h[b],
        ...E
      }
    }, N && g <= 50 && (g++, typeof N == "object" && (N.placement && (f = N.placement), N.rects && (c = N.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : N.rects), {
      x: u,
      y: d
    } = aa(c, f, l)), p = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: r,
    middlewareData: h
  };
};
async function Yn(e, t) {
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
    padding: h = 0
  } = gt(t, e), g = Ol(h), b = i[f ? d === "floating" ? "reference" : "floating" : d], w = Qo(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(b))) == null || n ? b : b.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), v = d === "floating" ? {
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
  }, N = Qo(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: v,
    offsetParent: y,
    strategy: l
  }) : v);
  return {
    top: (w.top - N.top + g.top) / E.y,
    bottom: (N.bottom - w.bottom + g.bottom) / E.y,
    left: (w.left - N.left + g.left) / E.x,
    right: (N.right - w.right + g.right) / E.x
  };
}
const rh = (e) => ({
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
    } = gt(e, t) || {};
    if (c == null)
      return {};
    const d = Ol(u), f = {
      x: n,
      y: o
    }, h = ii(r), g = si(h), p = await a.getDimensions(c), b = h === "y", w = b ? "top" : "left", v = b ? "bottom" : "right", y = b ? "clientHeight" : "clientWidth", E = s.reference[g] + s.reference[h] - f[h] - s.floating[g], N = f[h] - s.reference[h], x = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let S = x ? x[y] : 0;
    (!S || !await (a.isElement == null ? void 0 : a.isElement(x))) && (S = i.floating[y] || s.floating[g]);
    const k = E / 2 - N / 2, D = S / 2 - p[g] / 2 - 1, C = Pt(d[w], D), M = Pt(d[v], D), P = C, R = S - p[g] - M, L = S / 2 - p[g] / 2 + k, $ = bs(P, L, R), _ = !l.arrow && Cn(r) != null && L !== $ && s.reference[g] / 2 - (L < P ? C : M) - p[g] / 2 < 0, K = _ ? L < P ? L - P : L - R : 0;
    return {
      [h]: f[h] + K,
      data: {
        [h]: $,
        centerOffset: L - $ - K,
        ..._ && {
          alignmentOffset: K
        }
      },
      reset: _
    };
  }
}), sh = function(e) {
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
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: p = !0,
        ...b
      } = gt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const w = bt(r), v = nt(i), y = bt(i) === i, E = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), N = f || (y || !p ? [Zo(i)] : Zf(i)), x = g !== "none";
      !f && x && N.push(...th(i, p, g, E));
      const S = [i, ...N], k = await Yn(t, b), D = [];
      let C = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (u && D.push(k[w]), d) {
        const L = Xf(r, a, E);
        D.push(k[L[0]], k[L[1]]);
      }
      if (C = [...C, {
        placement: r,
        overflows: D
      }], !D.every((L) => L <= 0)) {
        var M, P;
        const L = (((M = s.flip) == null ? void 0 : M.index) || 0) + 1, $ = S[L];
        if ($ && (!(d === "alignment" ? v !== nt($) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        C.every((I) => nt(I.placement) === v ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: L,
              overflows: C
            },
            reset: {
              placement: $
            }
          };
        let _ = (P = C.filter((K) => K.overflows[0] <= 0).sort((K, I) => K.overflows[1] - I.overflows[1])[0]) == null ? void 0 : P.placement;
        if (!_)
          switch (h) {
            case "bestFit": {
              var R;
              const K = (R = C.filter((I) => {
                if (x) {
                  const A = nt(I.placement);
                  return A === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  A === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((A) => A > 0).reduce((A, O) => A + O, 0)]).sort((I, A) => I[1] - A[1])[0]) == null ? void 0 : R[0];
              K && (_ = K);
              break;
            }
            case "initialPlacement":
              _ = i;
              break;
          }
        if (r !== _)
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
function la(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function ca(e) {
  return Vf.some((t) => e[t] >= 0);
}
const ih = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: o = "referenceHidden",
        ...r
      } = gt(e, t);
      switch (o) {
        case "referenceHidden": {
          const s = await Yn(t, {
            ...r,
            elementContext: "reference"
          }), a = la(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: ca(a)
            }
          };
        }
        case "escaped": {
          const s = await Yn(t, {
            ...r,
            altBoundary: !0
          }), a = la(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: ca(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, _l = /* @__PURE__ */ new Set(["left", "top"]);
async function ah(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), a = bt(n), i = Cn(n), l = nt(n) === "y", c = _l.has(a) ? -1 : 1, u = s && l ? -1 : 1, d = gt(t, e);
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
  return i && typeof g == "number" && (h = i === "end" ? g * -1 : g), l ? {
    x: h * u,
    y: f * c
  } : {
    x: f * c,
    y: h * u
  };
}
const lh = function(e) {
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
      } = t, l = await ah(t, e);
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
}, ch = function(e) {
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
              x: w,
              y: v
            } = b;
            return {
              x: w,
              y: v
            };
          }
        },
        ...l
      } = gt(e, t), c = {
        x: n,
        y: o
      }, u = await Yn(t, l), d = nt(bt(r)), f = ri(d);
      let h = c[f], g = c[d];
      if (s) {
        const b = f === "y" ? "top" : "left", w = f === "y" ? "bottom" : "right", v = h + u[b], y = h - u[w];
        h = bs(v, h, y);
      }
      if (a) {
        const b = d === "y" ? "top" : "left", w = d === "y" ? "bottom" : "right", v = g + u[b], y = g - u[w];
        g = bs(v, g, y);
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
}, uh = function(e) {
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
      } = gt(e, t), u = {
        x: n,
        y: o
      }, d = nt(r), f = ri(d);
      let h = u[f], g = u[d];
      const p = gt(i, t), b = typeof p == "number" ? {
        mainAxis: p,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...p
      };
      if (l) {
        const y = f === "y" ? "height" : "width", E = s.reference[f] - s.floating[y] + b.mainAxis, N = s.reference[f] + s.reference[y] - b.mainAxis;
        h < E ? h = E : h > N && (h = N);
      }
      if (c) {
        var w, v;
        const y = f === "y" ? "width" : "height", E = _l.has(bt(r)), N = s.reference[d] - s.floating[y] + (E && ((w = a.offset) == null ? void 0 : w[d]) || 0) + (E ? 0 : b.crossAxis), x = s.reference[d] + s.reference[y] + (E ? 0 : ((v = a.offset) == null ? void 0 : v[d]) || 0) - (E ? b.crossAxis : 0);
        g < N ? g = N : g > x && (g = x);
      }
      return {
        [f]: h,
        [d]: g
      };
    }
  };
}, dh = function(e) {
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
      } = gt(e, t), u = await Yn(t, c), d = bt(r), f = Cn(r), h = nt(r) === "y", {
        width: g,
        height: p
      } = s.floating;
      let b, w;
      d === "top" || d === "bottom" ? (b = d, w = f === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (w = d, b = f === "end" ? "top" : "bottom");
      const v = p - u.top - u.bottom, y = g - u.left - u.right, E = Pt(p - u[b], v), N = Pt(g - u[w], y), x = !t.middlewareData.shift;
      let S = E, k = N;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = y), (o = t.middlewareData.shift) != null && o.enabled.y && (S = v), x && !f) {
        const C = We(u.left, 0), M = We(u.right, 0), P = We(u.top, 0), R = We(u.bottom, 0);
        h ? k = g - 2 * (C !== 0 || M !== 0 ? C + M : We(u.left, u.right)) : S = p - 2 * (P !== 0 || R !== 0 ? P + R : We(u.top, u.bottom));
      }
      await l({
        ...t,
        availableWidth: k,
        availableHeight: S
      });
      const D = await a.getDimensions(i.floating);
      return g !== D.width || p !== D.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function pr() {
  return typeof window < "u";
}
function Tn(e) {
  return $l(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function He(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function it(e) {
  var t;
  return (t = ($l(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function $l(e) {
  return pr() ? e instanceof Node || e instanceof He(e).Node : !1;
}
function Qe(e) {
  return pr() ? e instanceof Element || e instanceof He(e).Element : !1;
}
function st(e) {
  return pr() ? e instanceof HTMLElement || e instanceof He(e).HTMLElement : !1;
}
function ua(e) {
  return !pr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof He(e).ShadowRoot;
}
const mh = /* @__PURE__ */ new Set(["inline", "contents"]);
function Zn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = Je(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !mh.has(r);
}
const fh = /* @__PURE__ */ new Set(["table", "td", "th"]);
function hh(e) {
  return fh.has(Tn(e));
}
const ph = [":popover-open", ":modal"];
function gr(e) {
  return ph.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const gh = ["transform", "translate", "scale", "rotate", "perspective"], bh = ["transform", "translate", "scale", "rotate", "perspective", "filter"], vh = ["paint", "layout", "strict", "content"];
function ai(e) {
  const t = li(), n = Qe(e) ? Je(e) : e;
  return gh.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || bh.some((o) => (n.willChange || "").includes(o)) || vh.some((o) => (n.contain || "").includes(o));
}
function wh(e) {
  let t = It(e);
  for (; st(t) && !wn(t); ) {
    if (ai(t))
      return t;
    if (gr(t))
      return null;
    t = It(t);
  }
  return null;
}
function li() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Nh = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function wn(e) {
  return Nh.has(Tn(e));
}
function Je(e) {
  return He(e).getComputedStyle(e);
}
function br(e) {
  return Qe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function It(e) {
  if (Tn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ua(e) && e.host || // Fallback.
    it(e)
  );
  return ua(t) ? t.host : t;
}
function Bl(e) {
  const t = It(e);
  return wn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : st(t) && Zn(t) ? t : Bl(t);
}
function jn(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = Bl(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), a = He(r);
  if (s) {
    const i = ws(a);
    return t.concat(a, a.visualViewport || [], Zn(r) ? r : [], i && n ? jn(i) : []);
  }
  return t.concat(r, jn(r, [], n));
}
function ws(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Wl(e) {
  const t = Je(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = st(e), s = r ? e.offsetWidth : n, a = r ? e.offsetHeight : o, i = Xo(n) !== s || Xo(o) !== a;
  return i && (n = s, o = a), {
    width: n,
    height: o,
    $: i
  };
}
function ci(e) {
  return Qe(e) ? e : e.contextElement;
}
function dn(e) {
  const t = ci(e);
  if (!st(t))
    return rt(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: s
  } = Wl(t);
  let a = (s ? Xo(n.width) : n.width) / o, i = (s ? Xo(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const yh = /* @__PURE__ */ rt(0);
function Hl(e) {
  const t = He(e);
  return !li() || !t.visualViewport ? yh : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function kh(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== He(e) ? !1 : t;
}
function Yt(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), s = ci(e);
  let a = rt(1);
  t && (o ? Qe(o) && (a = dn(o)) : a = dn(e));
  const i = kh(s, n, o) ? Hl(s) : rt(0);
  let l = (r.left + i.x) / a.x, c = (r.top + i.y) / a.y, u = r.width / a.x, d = r.height / a.y;
  if (s) {
    const f = He(s), h = o && Qe(o) ? He(o) : o;
    let g = f, p = ws(g);
    for (; p && o && h !== g; ) {
      const b = dn(p), w = p.getBoundingClientRect(), v = Je(p), y = w.left + (p.clientLeft + parseFloat(v.paddingLeft)) * b.x, E = w.top + (p.clientTop + parseFloat(v.paddingTop)) * b.y;
      l *= b.x, c *= b.y, u *= b.x, d *= b.y, l += y, c += E, g = He(p), p = ws(g);
    }
  }
  return Qo({
    width: u,
    height: d,
    x: l,
    y: c
  });
}
function vr(e, t) {
  const n = br(e).scrollLeft;
  return t ? t.left + n : Yt(it(e)).left + n;
}
function Fl(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - vr(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function xh(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const s = r === "fixed", a = it(o), i = t ? gr(t.floating) : !1;
  if (o === a || i && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = rt(1);
  const u = rt(0), d = st(o);
  if ((d || !d && !s) && ((Tn(o) !== "body" || Zn(a)) && (l = br(o)), st(o))) {
    const h = Yt(o);
    c = dn(o), u.x = h.x + o.clientLeft, u.y = h.y + o.clientTop;
  }
  const f = a && !d && !s ? Fl(a, l) : rt(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - l.scrollLeft * c.x + u.x + f.x,
    y: n.y * c.y - l.scrollTop * c.y + u.y + f.y
  };
}
function Ch(e) {
  return Array.from(e.getClientRects());
}
function Th(e) {
  const t = it(e), n = br(e), o = e.ownerDocument.body, r = We(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), s = We(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + vr(e);
  const i = -n.scrollTop;
  return Je(o).direction === "rtl" && (a += We(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: s,
    x: a,
    y: i
  };
}
const da = 25;
function Eh(e, t) {
  const n = He(e), o = it(e), r = n.visualViewport;
  let s = o.clientWidth, a = o.clientHeight, i = 0, l = 0;
  if (r) {
    s = r.width, a = r.height;
    const u = li();
    (!u || u && t === "fixed") && (i = r.offsetLeft, l = r.offsetTop);
  }
  const c = vr(o);
  if (c <= 0) {
    const u = o.ownerDocument, d = u.body, f = getComputedStyle(d), h = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, g = Math.abs(o.clientWidth - d.clientWidth - h);
    g <= da && (s -= g);
  } else c <= da && (s += c);
  return {
    width: s,
    height: a,
    x: i,
    y: l
  };
}
const Sh = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Mh(e, t) {
  const n = Yt(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = st(e) ? dn(e) : rt(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, l = r * s.x, c = o * s.y;
  return {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function ma(e, t, n) {
  let o;
  if (t === "viewport")
    o = Eh(e, n);
  else if (t === "document")
    o = Th(it(e));
  else if (Qe(t))
    o = Mh(t, n);
  else {
    const r = Hl(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return Qo(o);
}
function zl(e, t) {
  const n = It(e);
  return n === t || !Qe(n) || wn(n) ? !1 : Je(n).position === "fixed" || zl(n, t);
}
function Dh(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = jn(e, [], !1).filter((i) => Qe(i) && Tn(i) !== "body"), r = null;
  const s = Je(e).position === "fixed";
  let a = s ? It(e) : e;
  for (; Qe(a) && !wn(a); ) {
    const i = Je(a), l = ai(a);
    !l && i.position === "fixed" && (r = null), (s ? !l && !r : !l && i.position === "static" && !!r && Sh.has(r.position) || Zn(a) && !l && zl(e, a)) ? o = o.filter((u) => u !== a) : r = i, a = It(a);
  }
  return t.set(e, o), o;
}
function Ah(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const a = [...n === "clippingAncestors" ? gr(t) ? [] : Dh(t, this._c) : [].concat(n), o], i = a[0], l = a.reduce((c, u) => {
    const d = ma(t, u, r);
    return c.top = We(d.top, c.top), c.right = Pt(d.right, c.right), c.bottom = Pt(d.bottom, c.bottom), c.left = We(d.left, c.left), c;
  }, ma(t, i, r));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Ph(e) {
  const {
    width: t,
    height: n
  } = Wl(e);
  return {
    width: t,
    height: n
  };
}
function Ih(e, t, n) {
  const o = st(t), r = it(t), s = n === "fixed", a = Yt(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = rt(0);
  function c() {
    l.x = vr(r);
  }
  if (o || !o && !s)
    if ((Tn(t) !== "body" || Zn(r)) && (i = br(t)), o) {
      const h = Yt(t, !0, s, t);
      l.x = h.x + t.clientLeft, l.y = h.y + t.clientTop;
    } else r && c();
  s && !o && r && c();
  const u = r && !o && !s ? Fl(r, i) : rt(0), d = a.left + i.scrollLeft - l.x - u.x, f = a.top + i.scrollTop - l.y - u.y;
  return {
    x: d,
    y: f,
    width: a.width,
    height: a.height
  };
}
function Kr(e) {
  return Je(e).position === "static";
}
function fa(e, t) {
  if (!st(e) || Je(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return it(e) === n && (n = n.ownerDocument.body), n;
}
function Ul(e, t) {
  const n = He(e);
  if (gr(e))
    return n;
  if (!st(e)) {
    let r = It(e);
    for (; r && !wn(r); ) {
      if (Qe(r) && !Kr(r))
        return r;
      r = It(r);
    }
    return n;
  }
  let o = fa(e, t);
  for (; o && hh(o) && Kr(o); )
    o = fa(o, t);
  return o && wn(o) && Kr(o) && !ai(o) ? n : o || wh(e) || n;
}
const Rh = async function(e) {
  const t = this.getOffsetParent || Ul, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: Ih(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Lh(e) {
  return Je(e).direction === "rtl";
}
const Oh = {
  convertOffsetParentRelativeRectToViewportRelativeRect: xh,
  getDocumentElement: it,
  getClippingRect: Ah,
  getOffsetParent: Ul,
  getElementRects: Rh,
  getClientRects: Ch,
  getDimensions: Ph,
  getScale: dn,
  isElement: Qe,
  isRTL: Lh
};
function Yl(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function _h(e, t) {
  let n = null, o;
  const r = it(e);
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
      height: h
    } = c;
    if (i || t(), !f || !h)
      return;
    const g = Eo(d), p = Eo(r.clientWidth - (u + f)), b = Eo(r.clientHeight - (d + h)), w = Eo(u), y = {
      rootMargin: -g + "px " + -p + "px " + -b + "px " + -w + "px",
      threshold: We(0, Pt(1, l)) || 1
    };
    let E = !0;
    function N(x) {
      const S = x[0].intersectionRatio;
      if (S !== l) {
        if (!E)
          return a();
        S ? a(!1, S) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !Yl(c, e.getBoundingClientRect()) && a(), E = !1;
    }
    try {
      n = new IntersectionObserver(N, {
        ...y,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(N, y);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function $h(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = o, c = ci(e), u = r || s ? [...c ? jn(c) : [], ...jn(t)] : [];
  u.forEach((w) => {
    r && w.addEventListener("scroll", n, {
      passive: !0
    }), s && w.addEventListener("resize", n);
  });
  const d = c && i ? _h(c, n) : null;
  let f = -1, h = null;
  a && (h = new ResizeObserver((w) => {
    let [v] = w;
    v && v.target === c && h && (h.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var y;
      (y = h) == null || y.observe(t);
    })), n();
  }), c && !l && h.observe(c), h.observe(t));
  let g, p = l ? Yt(e) : null;
  l && b();
  function b() {
    const w = Yt(e);
    p && !Yl(p, w) && n(), p = w, g = requestAnimationFrame(b);
  }
  return n(), () => {
    var w;
    u.forEach((v) => {
      r && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), d?.(), (w = h) == null || w.disconnect(), h = null, l && cancelAnimationFrame(g);
  };
}
const Bh = lh, Wh = ch, Hh = sh, Fh = dh, zh = ih, ha = rh, Uh = uh, Yh = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: Oh,
    ...n
  }, s = {
    ...r.platform,
    _c: o
  };
  return oh(e, t, {
    ...r,
    platform: s
  });
};
var jh = typeof document < "u", Vh = function() {
}, Uo = jh ? cr : Vh;
function Jo(e, t) {
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
        if (!Jo(e[o], t[o]))
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
      if (!(s === "_owner" && e.$$typeof) && !Jo(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function jl(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function pa(e, t) {
  const n = jl(e);
  return Math.round(t * n) / n;
}
function Gr(e) {
  const t = T.useRef(e);
  return Uo(() => {
    t.current = e;
  }), t;
}
function Kh(e) {
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
  }), [f, h] = T.useState(o);
  Jo(f, o) || h(o);
  const [g, p] = T.useState(null), [b, w] = T.useState(null), v = T.useCallback((I) => {
    I !== x.current && (x.current = I, p(I));
  }, []), y = T.useCallback((I) => {
    I !== S.current && (S.current = I, w(I));
  }, []), E = s || g, N = a || b, x = T.useRef(null), S = T.useRef(null), k = T.useRef(u), D = l != null, C = Gr(l), M = Gr(r), P = Gr(c), R = T.useCallback(() => {
    if (!x.current || !S.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    M.current && (I.platform = M.current), Yh(x.current, S.current, I).then((A) => {
      const O = {
        ...A,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: P.current !== !1
      };
      L.current && !Jo(k.current, O) && (k.current = O, xl.flushSync(() => {
        d(O);
      }));
    });
  }, [f, t, n, M, P]);
  Uo(() => {
    c === !1 && k.current.isPositioned && (k.current.isPositioned = !1, d((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [c]);
  const L = T.useRef(!1);
  Uo(() => (L.current = !0, () => {
    L.current = !1;
  }), []), Uo(() => {
    if (E && (x.current = E), N && (S.current = N), E && N) {
      if (C.current)
        return C.current(E, N, R);
      R();
    }
  }, [E, N, R, C, D]);
  const $ = T.useMemo(() => ({
    reference: x,
    floating: S,
    setReference: v,
    setFloating: y
  }), [v, y]), _ = T.useMemo(() => ({
    reference: E,
    floating: N
  }), [E, N]), K = T.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!_.floating)
      return I;
    const A = pa(_.floating, u.x), O = pa(_.floating, u.y);
    return i ? {
      ...I,
      transform: "translate(" + A + "px, " + O + "px)",
      ...jl(_.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: A,
      top: O
    };
  }, [n, i, _.floating, u.x, u.y]);
  return T.useMemo(() => ({
    ...u,
    update: R,
    refs: $,
    elements: _,
    floatingStyles: K
  }), [u, R, $, _, K]);
}
const Gh = (e) => {
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
      return o && t(o) ? o.current != null ? ha({
        element: o.current,
        padding: r
      }).fn(n) : {} : o ? ha({
        element: o,
        padding: r
      }).fn(n) : {};
    }
  };
}, qh = (e, t) => ({
  ...Bh(e),
  options: [e, t]
}), Xh = (e, t) => ({
  ...Wh(e),
  options: [e, t]
}), Zh = (e, t) => ({
  ...Uh(e),
  options: [e, t]
}), Qh = (e, t) => ({
  ...Hh(e),
  options: [e, t]
}), Jh = (e, t) => ({
  ...Fh(e),
  options: [e, t]
}), ep = (e, t) => ({
  ...zh(e),
  options: [e, t]
}), tp = (e, t) => ({
  ...Gh(e),
  options: [e, t]
});
var np = "Arrow", Vl = T.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...s } = e;
  return /* @__PURE__ */ z(
    Pe.svg,
    {
      ...s,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ z("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Vl.displayName = np;
var op = Vl;
function rp(e) {
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
var ui = "Popper", [Kl, wr] = xn(ui), [sp, Gl] = Kl(ui), ql = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = T.useState(null);
  return /* @__PURE__ */ z(sp, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
ql.displayName = ui;
var Xl = "PopperAnchor", Zl = T.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, s = Gl(Xl, n), a = T.useRef(null), i = Re(t, a), l = T.useRef(null);
    return T.useEffect(() => {
      const c = l.current;
      l.current = o?.current || a.current, c !== l.current && s.onAnchorChange(l.current);
    }), o ? null : /* @__PURE__ */ z(Pe.div, { ...r, ref: i });
  }
);
Zl.displayName = Xl;
var di = "PopperContent", [ip, ap] = Kl(di), Ql = T.forwardRef(
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
      updatePositionStrategy: h = "optimized",
      onPlaced: g,
      ...p
    } = e, b = Gl(di, n), [w, v] = T.useState(null), y = Re(t, (F) => v(F)), [E, N] = T.useState(null), x = rp(E), S = x?.width ?? 0, k = x?.height ?? 0, D = o + (s !== "center" ? "-" + s : ""), C = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, M = Array.isArray(c) ? c : [c], P = M.length > 0, R = {
      padding: C,
      boundary: M.filter(cp),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: P
    }, { refs: L, floatingStyles: $, placement: _, isPositioned: K, middlewareData: I } = Kh({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: D,
      whileElementsMounted: (...F) => $h(...F, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        qh({ mainAxis: r + k, alignmentAxis: a }),
        l && Xh({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Zh() : void 0,
          ...R
        }),
        l && Qh({ ...R }),
        Jh({
          ...R,
          apply: ({ elements: F, rects: Q, availableWidth: ce, availableHeight: de }) => {
            const { width: ge, height: Me } = Q.reference, Ue = F.floating.style;
            Ue.setProperty("--radix-popper-available-width", `${ce}px`), Ue.setProperty("--radix-popper-available-height", `${de}px`), Ue.setProperty("--radix-popper-anchor-width", `${ge}px`), Ue.setProperty("--radix-popper-anchor-height", `${Me}px`);
          }
        }),
        E && tp({ element: E, padding: i }),
        up({ arrowWidth: S, arrowHeight: k }),
        f && ep({ strategy: "referenceHidden", ...R })
      ]
    }), [A, O] = tc(_), Y = pt(g);
    At(() => {
      K && Y?.();
    }, [K, Y]);
    const j = I.arrow?.x, q = I.arrow?.y, Z = I.arrow?.centerOffset !== 0, [B, W] = T.useState();
    return At(() => {
      w && W(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ z(
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
        children: /* @__PURE__ */ z(
          ip,
          {
            scope: n,
            placedSide: A,
            onArrowChange: N,
            arrowX: j,
            arrowY: q,
            shouldHideArrow: Z,
            children: /* @__PURE__ */ z(
              Pe.div,
              {
                "data-side": A,
                "data-align": O,
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
Ql.displayName = di;
var Jl = "PopperArrow", lp = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ec = T.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = ap(Jl, o), a = lp[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ z(
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
        children: /* @__PURE__ */ z(
          op,
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
ec.displayName = Jl;
function cp(e) {
  return e !== null;
}
var up = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, i = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [c, u] = tc(n), d = { start: "0%", center: "50%", end: "100%" }[u], f = (r.arrow?.x ?? 0) + i / 2, h = (r.arrow?.y ?? 0) + l / 2;
    let g = "", p = "";
    return c === "bottom" ? (g = a ? d : `${f}px`, p = `${-l}px`) : c === "top" ? (g = a ? d : `${f}px`, p = `${o.floating.height + l}px`) : c === "right" ? (g = `${-l}px`, p = a ? d : `${h}px`) : c === "left" && (g = `${o.floating.width + l}px`, p = a ? d : `${h}px`), { data: { x: g, y: p } };
  }
});
function tc(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var nc = ql, oc = Zl, rc = Ql, sc = ec, dp = "Portal", mi = T.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, s] = T.useState(!1);
  At(() => s(!0), []);
  const a = n || r && globalThis?.document?.body;
  return a ? Om.createPortal(/* @__PURE__ */ z(Pe.div, { ...o, ref: t }), a) : null;
});
mi.displayName = dp;
function mp(e, t) {
  return T.useReducer((n, o) => t[n][o] ?? n, e);
}
var Gt = (e) => {
  const { present: t, children: n } = e, o = fp(t), r = typeof n == "function" ? n({ present: o.isPresent }) : T.Children.only(n), s = Re(o.ref, hp(r));
  return typeof n == "function" || o.isPresent ? T.cloneElement(r, { ref: s }) : null;
};
Gt.displayName = "Presence";
function fp(e) {
  const [t, n] = T.useState(), o = T.useRef(null), r = T.useRef(e), s = T.useRef("none"), a = e ? "mounted" : "unmounted", [i, l] = mp(a, {
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
    const c = So(o.current);
    s.current = i === "mounted" ? c : "none";
  }, [i]), At(() => {
    const c = o.current, u = r.current;
    if (u !== e) {
      const f = s.current, h = So(c);
      e ? l("MOUNT") : h === "none" || c?.display === "none" ? l("UNMOUNT") : l(u && f !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), At(() => {
    if (t) {
      let c;
      const u = t.ownerDocument.defaultView ?? window, d = (h) => {
        const p = So(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && p && (l("ANIMATION_END"), !r.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, f = (h) => {
        h.target === t && (s.current = So(o.current));
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
function So(e) {
  return e?.animationName || "none";
}
function hp(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var qr = "rovingFocusGroup.onEntryFocus", pp = { bubbles: !1, cancelable: !0 }, Qn = "RovingFocusGroup", [Ns, ic, gp] = Dl(Qn), [bp, ac] = xn(
  Qn,
  [gp]
), [vp, wp] = bp(Qn), lc = T.forwardRef(
  (e, t) => /* @__PURE__ */ z(Ns.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ z(Ns.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ z(Np, { ...e, ref: t }) }) })
);
lc.displayName = Qn;
var Np = T.forwardRef((e, t) => {
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
  } = e, f = T.useRef(null), h = Re(t, f), g = Al(s), [p, b] = ni({
    prop: a,
    defaultProp: i ?? null,
    onChange: l,
    caller: Qn
  }), [w, v] = T.useState(!1), y = pt(c), E = ic(n), N = T.useRef(!1), [x, S] = T.useState(0);
  return T.useEffect(() => {
    const k = f.current;
    if (k)
      return k.addEventListener(qr, y), () => k.removeEventListener(qr, y);
  }, [y]), /* @__PURE__ */ z(
    vp,
    {
      scope: n,
      orientation: o,
      dir: g,
      loop: r,
      currentTabStopId: p,
      onItemFocus: T.useCallback(
        (k) => b(k),
        [b]
      ),
      onItemShiftTab: T.useCallback(() => v(!0), []),
      onFocusableItemAdd: T.useCallback(
        () => S((k) => k + 1),
        []
      ),
      onFocusableItemRemove: T.useCallback(
        () => S((k) => k - 1),
        []
      ),
      children: /* @__PURE__ */ z(
        Pe.div,
        {
          tabIndex: w || x === 0 ? -1 : 0,
          "data-orientation": o,
          ...d,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: ae(e.onMouseDown, () => {
            N.current = !0;
          }),
          onFocus: ae(e.onFocus, (k) => {
            const D = !N.current;
            if (k.target === k.currentTarget && D && !w) {
              const C = new CustomEvent(qr, pp);
              if (k.currentTarget.dispatchEvent(C), !C.defaultPrevented) {
                const M = E().filter((_) => _.focusable), P = M.find((_) => _.active), R = M.find((_) => _.id === p), $ = [P, R, ...M].filter(
                  Boolean
                ).map((_) => _.ref.current);
                dc($, u);
              }
            }
            N.current = !1;
          }),
          onBlur: ae(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), cc = "RovingFocusGroupItem", uc = T.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: o = !0,
      active: r = !1,
      tabStopId: s,
      children: a,
      ...i
    } = e, l = qo(), c = s || l, u = wp(cc, n), d = u.currentTabStopId === c, f = ic(n), { onFocusableItemAdd: h, onFocusableItemRemove: g, currentTabStopId: p } = u;
    return T.useEffect(() => {
      if (o)
        return h(), () => g();
    }, [o, h, g]), /* @__PURE__ */ z(
      Ns.ItemSlot,
      {
        scope: n,
        id: c,
        focusable: o,
        active: r,
        children: /* @__PURE__ */ z(
          Pe.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": u.orientation,
            ...i,
            ref: t,
            onMouseDown: ae(e.onMouseDown, (b) => {
              o ? u.onItemFocus(c) : b.preventDefault();
            }),
            onFocus: ae(e.onFocus, () => u.onItemFocus(c)),
            onKeyDown: ae(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const w = xp(b, u.orientation, u.dir);
              if (w !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let y = f().filter((E) => E.focusable).map((E) => E.ref.current);
                if (w === "last") y.reverse();
                else if (w === "prev" || w === "next") {
                  w === "prev" && y.reverse();
                  const E = y.indexOf(b.currentTarget);
                  y = u.loop ? Cp(y, E + 1) : y.slice(E + 1);
                }
                setTimeout(() => dc(y));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: d, hasTabStop: p != null }) : a
          }
        )
      }
    );
  }
);
uc.displayName = cc;
var yp = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function kp(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function xp(e, t, n) {
  const o = kp(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return yp[o];
}
function dc(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Cp(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var Tp = lc, Ep = uc, Sp = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, tn = /* @__PURE__ */ new WeakMap(), Mo = /* @__PURE__ */ new WeakMap(), Do = {}, Xr = 0, mc = function(e) {
  return e && (e.host || mc(e.parentNode));
}, Mp = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = mc(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Dp = function(e, t, n, o) {
  var r = Mp(t, Array.isArray(e) ? e : [e]);
  Do[n] || (Do[n] = /* @__PURE__ */ new WeakMap());
  var s = Do[n], a = [], i = /* @__PURE__ */ new Set(), l = new Set(r), c = function(d) {
    !d || i.has(d) || (i.add(d), c(d.parentNode));
  };
  r.forEach(c);
  var u = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (i.has(f))
        u(f);
      else
        try {
          var h = f.getAttribute(o), g = h !== null && h !== "false", p = (tn.get(f) || 0) + 1, b = (s.get(f) || 0) + 1;
          tn.set(f, p), s.set(f, b), a.push(f), p === 1 && g && Mo.set(f, !0), b === 1 && f.setAttribute(n, "true"), g || f.setAttribute(o, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", f, w);
        }
    });
  };
  return u(t), i.clear(), Xr++, function() {
    a.forEach(function(d) {
      var f = tn.get(d) - 1, h = s.get(d) - 1;
      tn.set(d, f), s.set(d, h), f || (Mo.has(d) || d.removeAttribute(o), Mo.delete(d)), h || d.removeAttribute(n);
    }), Xr--, Xr || (tn = /* @__PURE__ */ new WeakMap(), tn = /* @__PURE__ */ new WeakMap(), Mo = /* @__PURE__ */ new WeakMap(), Do = {});
  };
}, Ap = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = Sp(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), Dp(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, tt = function() {
  return tt = Object.assign || function(t) {
    for (var n, o = 1, r = arguments.length; o < r; o++) {
      n = arguments[o];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, tt.apply(this, arguments);
};
function fc(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
  return n;
}
function Pp(e, t, n) {
  if (n || arguments.length === 2) for (var o = 0, r = t.length, s; o < r; o++)
    (s || !(o in t)) && (s || (s = Array.prototype.slice.call(t, 0, o)), s[o] = t[o]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Yo = "right-scroll-bar-position", jo = "width-before-scroll-bar", Ip = "with-scroll-bars-hidden", Rp = "--removed-body-scroll-bar-size";
function Zr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Lp(e, t) {
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
        set current(o) {
          var r = n.value;
          r !== o && (n.value = o, n.callback(o, r));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var Op = typeof window < "u" ? T.useLayoutEffect : T.useEffect, ga = /* @__PURE__ */ new WeakMap();
function _p(e, t) {
  var n = Lp(null, function(o) {
    return e.forEach(function(r) {
      return Zr(r, o);
    });
  });
  return Op(function() {
    var o = ga.get(n);
    if (o) {
      var r = new Set(o), s = new Set(e), a = n.current;
      r.forEach(function(i) {
        s.has(i) || Zr(i, null);
      }), s.forEach(function(i) {
        r.has(i) || Zr(i, a);
      });
    }
    ga.set(n, e);
  }, [e]), n;
}
function $p(e) {
  return e;
}
function Bp(e, t) {
  t === void 0 && (t = $p);
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
function Wp(e) {
  e === void 0 && (e = {});
  var t = Bp(null);
  return t.options = tt({ async: !0, ssr: !1 }, e), t;
}
var hc = function(e) {
  var t = e.sideCar, n = fc(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return T.createElement(o, tt({}, n));
};
hc.isSideCarExport = !0;
function Hp(e, t) {
  return e.useMedium(t), hc;
}
var pc = Wp(), Qr = function() {
}, Nr = T.forwardRef(function(e, t) {
  var n = T.useRef(null), o = T.useState({
    onScrollCapture: Qr,
    onWheelCapture: Qr,
    onTouchMoveCapture: Qr
  }), r = o[0], s = o[1], a = e.forwardProps, i = e.children, l = e.className, c = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, h = e.noRelative, g = e.noIsolation, p = e.inert, b = e.allowPinchZoom, w = e.as, v = w === void 0 ? "div" : w, y = e.gapMode, E = fc(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), N = f, x = _p([n, t]), S = tt(tt({}, E), r);
  return T.createElement(
    T.Fragment,
    null,
    u && T.createElement(N, { sideCar: pc, removeScrollBar: c, shards: d, noRelative: h, noIsolation: g, inert: p, setCallbacks: s, allowPinchZoom: !!b, lockRef: n, gapMode: y }),
    a ? T.cloneElement(T.Children.only(i), tt(tt({}, S), { ref: x })) : T.createElement(v, tt({}, S, { className: l, ref: x }), i)
  );
});
Nr.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Nr.classNames = {
  fullWidth: jo,
  zeroRight: Yo
};
var Fp = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function zp() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Fp();
  return t && e.setAttribute("nonce", t), e;
}
function Up(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Yp(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var jp = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = zp()) && (Up(t, n), Yp(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Vp = function() {
  var e = jp();
  return function(t, n) {
    T.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, gc = function() {
  var e = Vp(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, Kp = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Jr = function(e) {
  return parseInt(e || "", 10) || 0;
}, Gp = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Jr(n), Jr(o), Jr(r)];
}, qp = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Kp;
  var t = Gp(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, o - n + t[2] - t[0])
  };
}, Xp = gc(), mn = "data-scroll-locked", Zp = function(e, t, n, o) {
  var r = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Ip, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(i, "px ").concat(o, `;
  }
  body[`).concat(mn, `] {
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
  
  .`).concat(Yo, ` {
    right: `).concat(i, "px ").concat(o, `;
  }
  
  .`).concat(jo, ` {
    margin-right: `).concat(i, "px ").concat(o, `;
  }
  
  .`).concat(Yo, " .").concat(Yo, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(jo, " .").concat(jo, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(mn, `] {
    `).concat(Rp, ": ").concat(i, `px;
  }
`);
}, ba = function() {
  var e = parseInt(document.body.getAttribute(mn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Qp = function() {
  T.useEffect(function() {
    return document.body.setAttribute(mn, (ba() + 1).toString()), function() {
      var e = ba() - 1;
      e <= 0 ? document.body.removeAttribute(mn) : document.body.setAttribute(mn, e.toString());
    };
  }, []);
}, Jp = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  Qp();
  var s = T.useMemo(function() {
    return qp(r);
  }, [r]);
  return T.createElement(Xp, { styles: Zp(s, !t, r, n ? "" : "!important") });
}, ys = !1;
if (typeof window < "u")
  try {
    var Ao = Object.defineProperty({}, "passive", {
      get: function() {
        return ys = !0, !0;
      }
    });
    window.addEventListener("test", Ao, Ao), window.removeEventListener("test", Ao, Ao);
  } catch {
    ys = !1;
  }
var nn = ys ? { passive: !1 } : !1, eg = function(e) {
  return e.tagName === "TEXTAREA";
}, bc = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !eg(e) && n[t] === "visible")
  );
}, tg = function(e) {
  return bc(e, "overflowY");
}, ng = function(e) {
  return bc(e, "overflowX");
}, va = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = vc(e, o);
    if (r) {
      var s = wc(e, o), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return !1;
}, og = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [
    t,
    n,
    o
  ];
}, rg = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [
    t,
    n,
    o
  ];
}, vc = function(e, t) {
  return e === "v" ? tg(t) : ng(t);
}, wc = function(e, t) {
  return e === "v" ? og(t) : rg(t);
}, sg = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, ig = function(e, t, n, o, r) {
  var s = sg(e, window.getComputedStyle(t).direction), a = s * o, i = n.target, l = t.contains(i), c = !1, u = a > 0, d = 0, f = 0;
  do {
    if (!i)
      break;
    var h = wc(e, i), g = h[0], p = h[1], b = h[2], w = p - b - s * g;
    (g || w) && vc(e, i) && (d += w, f += g);
    var v = i.parentNode;
    i = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(f) < 1) && (c = !0), c;
}, Po = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, wa = function(e) {
  return [e.deltaX, e.deltaY];
}, Na = function(e) {
  return e && "current" in e ? e.current : e;
}, ag = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, lg = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, cg = 0, on = [];
function ug(e) {
  var t = T.useRef([]), n = T.useRef([0, 0]), o = T.useRef(), r = T.useState(cg++)[0], s = T.useState(gc)[0], a = T.useRef(e);
  T.useEffect(function() {
    a.current = e;
  }, [e]), T.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var p = Pp([e.lockRef.current], (e.shards || []).map(Na), !0).filter(Boolean);
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
    var w = Po(p), v = n.current, y = "deltaX" in p ? p.deltaX : v[0] - w[0], E = "deltaY" in p ? p.deltaY : v[1] - w[1], N, x = p.target, S = Math.abs(y) > Math.abs(E) ? "h" : "v";
    if ("touches" in p && S === "h" && x.type === "range")
      return !1;
    var k = va(S, x);
    if (!k)
      return !0;
    if (k ? N = S : (N = S === "v" ? "h" : "v", k = va(S, x)), !k)
      return !1;
    if (!o.current && "changedTouches" in p && (y || E) && (o.current = N), !N)
      return !0;
    var D = o.current || N;
    return ig(D, b, p, D === "h" ? y : E);
  }, []), l = T.useCallback(function(p) {
    var b = p;
    if (!(!on.length || on[on.length - 1] !== s)) {
      var w = "deltaY" in b ? wa(b) : Po(b), v = t.current.filter(function(N) {
        return N.name === b.type && (N.target === b.target || b.target === N.shadowParent) && ag(N.delta, w);
      })[0];
      if (v && v.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!v) {
        var y = (a.current.shards || []).map(Na).filter(Boolean).filter(function(N) {
          return N.contains(b.target);
        }), E = y.length > 0 ? i(b, y[0]) : !a.current.noIsolation;
        E && b.cancelable && b.preventDefault();
      }
    }
  }, []), c = T.useCallback(function(p, b, w, v) {
    var y = { name: p, delta: b, target: w, should: v, shadowParent: dg(w) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(E) {
        return E !== y;
      });
    }, 1);
  }, []), u = T.useCallback(function(p) {
    n.current = Po(p), o.current = void 0;
  }, []), d = T.useCallback(function(p) {
    c(p.type, wa(p), p.target, i(p, e.lockRef.current));
  }, []), f = T.useCallback(function(p) {
    c(p.type, Po(p), p.target, i(p, e.lockRef.current));
  }, []);
  T.useEffect(function() {
    return on.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, nn), document.addEventListener("touchmove", l, nn), document.addEventListener("touchstart", u, nn), function() {
      on = on.filter(function(p) {
        return p !== s;
      }), document.removeEventListener("wheel", l, nn), document.removeEventListener("touchmove", l, nn), document.removeEventListener("touchstart", u, nn);
    };
  }, []);
  var h = e.removeScrollBar, g = e.inert;
  return T.createElement(
    T.Fragment,
    null,
    g ? T.createElement(s, { styles: lg(r) }) : null,
    h ? T.createElement(Jp, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function dg(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const mg = Hp(pc, ug);
var Nc = T.forwardRef(function(e, t) {
  return T.createElement(Nr, tt({}, e, { ref: t, sideCar: mg }));
});
Nc.classNames = Nr.classNames;
var ks = ["Enter", " "], fg = ["ArrowDown", "PageUp", "Home"], yc = ["ArrowUp", "PageDown", "End"], hg = [...fg, ...yc], pg = {
  ltr: [...ks, "ArrowRight"],
  rtl: [...ks, "ArrowLeft"]
}, gg = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Jn = "Menu", [Vn, bg, vg] = Dl(Jn), [qt, kc] = xn(Jn, [
  vg,
  wr,
  ac
]), yr = wr(), xc = ac(), [wg, Xt] = qt(Jn), [Ng, eo] = qt(Jn), Cc = (e) => {
  const { __scopeMenu: t, open: n = !1, children: o, dir: r, onOpenChange: s, modal: a = !0 } = e, i = yr(t), [l, c] = T.useState(null), u = T.useRef(!1), d = pt(s), f = Al(r);
  return T.useEffect(() => {
    const h = () => {
      u.current = !0, document.addEventListener("pointerdown", g, { capture: !0, once: !0 }), document.addEventListener("pointermove", g, { capture: !0, once: !0 });
    }, g = () => u.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", g, { capture: !0 }), document.removeEventListener("pointermove", g, { capture: !0 });
    };
  }, []), /* @__PURE__ */ z(nc, { ...i, children: /* @__PURE__ */ z(
    wg,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: l,
      onContentChange: c,
      children: /* @__PURE__ */ z(
        Ng,
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
Cc.displayName = Jn;
var yg = "MenuAnchor", fi = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = yr(n);
    return /* @__PURE__ */ z(oc, { ...r, ...o, ref: t });
  }
);
fi.displayName = yg;
var hi = "MenuPortal", [kg, Tc] = qt(hi, {
  forceMount: void 0
}), Ec = (e) => {
  const { __scopeMenu: t, forceMount: n, children: o, container: r } = e, s = Xt(hi, t);
  return /* @__PURE__ */ z(kg, { scope: t, forceMount: n, children: /* @__PURE__ */ z(Gt, { present: n || s.open, children: /* @__PURE__ */ z(mi, { asChild: !0, container: r, children: o }) }) });
};
Ec.displayName = hi;
var Ke = "MenuContent", [xg, pi] = qt(Ke), Sc = T.forwardRef(
  (e, t) => {
    const n = Tc(Ke, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, s = Xt(Ke, e.__scopeMenu), a = eo(Ke, e.__scopeMenu);
    return /* @__PURE__ */ z(Vn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ z(Gt, { present: o || s.open, children: /* @__PURE__ */ z(Vn.Slot, { scope: e.__scopeMenu, children: a.modal ? /* @__PURE__ */ z(Cg, { ...r, ref: t }) : /* @__PURE__ */ z(Tg, { ...r, ref: t }) }) }) });
  }
), Cg = T.forwardRef(
  (e, t) => {
    const n = Xt(Ke, e.__scopeMenu), o = T.useRef(null), r = Re(t, o);
    return T.useEffect(() => {
      const s = o.current;
      if (s) return Ap(s);
    }, []), /* @__PURE__ */ z(
      gi,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: ae(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), Tg = T.forwardRef((e, t) => {
  const n = Xt(Ke, e.__scopeMenu);
  return /* @__PURE__ */ z(
    gi,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), Eg = /* @__PURE__ */ Un("MenuContent.ScrollLock"), gi = T.forwardRef(
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
      onDismiss: h,
      disableOutsideScroll: g,
      ...p
    } = e, b = Xt(Ke, n), w = eo(Ke, n), v = yr(n), y = xc(n), E = bg(n), [N, x] = T.useState(null), S = T.useRef(null), k = Re(t, S, b.onContentChange), D = T.useRef(0), C = T.useRef(""), M = T.useRef(0), P = T.useRef(null), R = T.useRef("right"), L = T.useRef(0), $ = g ? Nc : T.Fragment, _ = g ? { as: Eg, allowPinchZoom: !0 } : void 0, K = (A) => {
      const O = C.current + A, Y = E().filter((F) => !F.disabled), j = document.activeElement, q = Y.find((F) => F.ref.current === j)?.textValue, Z = Y.map((F) => F.textValue), B = Bg(Z, O, q), W = Y.find((F) => F.textValue === B)?.ref.current;
      (function F(Q) {
        C.current = Q, window.clearTimeout(D.current), Q !== "" && (D.current = window.setTimeout(() => F(""), 1e3));
      })(O), W && setTimeout(() => W.focus());
    };
    T.useEffect(() => () => window.clearTimeout(D.current), []), _f();
    const I = T.useCallback((A) => R.current === P.current?.side && Hg(A, P.current?.area), []);
    return /* @__PURE__ */ z(
      xg,
      {
        scope: n,
        searchRef: C,
        onItemEnter: T.useCallback(
          (A) => {
            I(A) && A.preventDefault();
          },
          [I]
        ),
        onItemLeave: T.useCallback(
          (A) => {
            I(A) || (S.current?.focus(), x(null));
          },
          [I]
        ),
        onTriggerLeave: T.useCallback(
          (A) => {
            I(A) && A.preventDefault();
          },
          [I]
        ),
        pointerGraceTimerRef: M,
        onPointerGraceIntentChange: T.useCallback((A) => {
          P.current = A;
        }, []),
        children: /* @__PURE__ */ z($, { ..._, children: /* @__PURE__ */ z(
          Rl,
          {
            asChild: !0,
            trapped: r,
            onMountAutoFocus: ae(s, (A) => {
              A.preventDefault(), S.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: a,
            children: /* @__PURE__ */ z(
              oi,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: c,
                onPointerDownOutside: u,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: h,
                children: /* @__PURE__ */ z(
                  Tp,
                  {
                    asChild: !0,
                    ...y,
                    dir: w.dir,
                    orientation: "vertical",
                    loop: o,
                    currentTabStopId: N,
                    onCurrentTabStopIdChange: x,
                    onEntryFocus: ae(l, (A) => {
                      w.isUsingKeyboardRef.current || A.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ z(
                      rc,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Uc(b.open),
                        "data-radix-menu-content": "",
                        dir: w.dir,
                        ...v,
                        ...p,
                        ref: k,
                        style: { outline: "none", ...p.style },
                        onKeyDown: ae(p.onKeyDown, (A) => {
                          const Y = A.target.closest("[data-radix-menu-content]") === A.currentTarget, j = A.ctrlKey || A.altKey || A.metaKey, q = A.key.length === 1;
                          Y && (A.key === "Tab" && A.preventDefault(), !j && q && K(A.key));
                          const Z = S.current;
                          if (A.target !== Z || !hg.includes(A.key)) return;
                          A.preventDefault();
                          const W = E().filter((F) => !F.disabled).map((F) => F.ref.current);
                          yc.includes(A.key) && W.reverse(), _g(W);
                        }),
                        onBlur: ae(e.onBlur, (A) => {
                          A.currentTarget.contains(A.target) || (window.clearTimeout(D.current), C.current = "");
                        }),
                        onPointerMove: ae(
                          e.onPointerMove,
                          Kn((A) => {
                            const O = A.target, Y = L.current !== A.clientX;
                            if (A.currentTarget.contains(O) && Y) {
                              const j = A.clientX > L.current ? "right" : "left";
                              R.current = j, L.current = A.clientX;
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
Sc.displayName = Ke;
var Sg = "MenuGroup", bi = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ z(Pe.div, { role: "group", ...o, ref: t });
  }
);
bi.displayName = Sg;
var Mg = "MenuLabel", Mc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ z(Pe.div, { ...o, ref: t });
  }
);
Mc.displayName = Mg;
var er = "MenuItem", ya = "menu.itemSelect", kr = T.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: o, ...r } = e, s = T.useRef(null), a = eo(er, e.__scopeMenu), i = pi(er, e.__scopeMenu), l = Re(t, s), c = T.useRef(!1), u = () => {
      const d = s.current;
      if (!n && d) {
        const f = new CustomEvent(ya, { bubbles: !0, cancelable: !0 });
        d.addEventListener(ya, (h) => o?.(h), { once: !0 }), Ml(d, f), f.defaultPrevented ? c.current = !1 : a.onClose();
      }
    };
    return /* @__PURE__ */ z(
      Dc,
      {
        ...r,
        ref: l,
        disabled: n,
        onClick: ae(e.onClick, u),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), c.current = !0;
        },
        onPointerUp: ae(e.onPointerUp, (d) => {
          c.current || d.currentTarget?.click();
        }),
        onKeyDown: ae(e.onKeyDown, (d) => {
          const f = i.searchRef.current !== "";
          n || f && d.key === " " || ks.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
kr.displayName = er;
var Dc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: o = !1, textValue: r, ...s } = e, a = pi(er, n), i = xc(n), l = T.useRef(null), c = Re(t, l), [u, d] = T.useState(!1), [f, h] = T.useState("");
    return T.useEffect(() => {
      const g = l.current;
      g && h((g.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ z(
      Vn.ItemSlot,
      {
        scope: n,
        disabled: o,
        textValue: r ?? f,
        children: /* @__PURE__ */ z(Ep, { asChild: !0, ...i, focusable: !o, children: /* @__PURE__ */ z(
          Pe.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": o || void 0,
            "data-disabled": o ? "" : void 0,
            ...s,
            ref: c,
            onPointerMove: ae(
              e.onPointerMove,
              Kn((g) => {
                o ? a.onItemLeave(g) : (a.onItemEnter(g), g.defaultPrevented || g.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: ae(
              e.onPointerLeave,
              Kn((g) => a.onItemLeave(g))
            ),
            onFocus: ae(e.onFocus, () => d(!0)),
            onBlur: ae(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), Dg = "MenuCheckboxItem", Ac = T.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: o, ...r } = e;
    return /* @__PURE__ */ z(Oc, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ z(
      kr,
      {
        role: "menuitemcheckbox",
        "aria-checked": tr(n) ? "mixed" : n,
        ...r,
        ref: t,
        "data-state": wi(n),
        onSelect: ae(
          r.onSelect,
          () => o?.(tr(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Ac.displayName = Dg;
var Pc = "MenuRadioGroup", [Ag, Pg] = qt(
  Pc,
  { value: void 0, onValueChange: () => {
  } }
), Ic = T.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: o, ...r } = e, s = pt(o);
    return /* @__PURE__ */ z(Ag, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ z(bi, { ...r, ref: t }) });
  }
);
Ic.displayName = Pc;
var Rc = "MenuRadioItem", Lc = T.forwardRef(
  (e, t) => {
    const { value: n, ...o } = e, r = Pg(Rc, e.__scopeMenu), s = n === r.value;
    return /* @__PURE__ */ z(Oc, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ z(
      kr,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...o,
        ref: t,
        "data-state": wi(s),
        onSelect: ae(
          o.onSelect,
          () => r.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Lc.displayName = Rc;
var vi = "MenuItemIndicator", [Oc, Ig] = qt(
  vi,
  { checked: !1 }
), _c = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: o, ...r } = e, s = Ig(vi, n);
    return /* @__PURE__ */ z(
      Gt,
      {
        present: o || tr(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ z(
          Pe.span,
          {
            ...r,
            ref: t,
            "data-state": wi(s.checked)
          }
        )
      }
    );
  }
);
_c.displayName = vi;
var Rg = "MenuSeparator", $c = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ z(
      Pe.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...o,
        ref: t
      }
    );
  }
);
$c.displayName = Rg;
var Lg = "MenuArrow", Bc = T.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = yr(n);
    return /* @__PURE__ */ z(sc, { ...r, ...o, ref: t });
  }
);
Bc.displayName = Lg;
var Og = "MenuSub", [_1, Wc] = qt(Og), _n = "MenuSubTrigger", Hc = T.forwardRef(
  (e, t) => {
    const n = Xt(_n, e.__scopeMenu), o = eo(_n, e.__scopeMenu), r = Wc(_n, e.__scopeMenu), s = pi(_n, e.__scopeMenu), a = T.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = s, c = { __scopeMenu: e.__scopeMenu }, u = T.useCallback(() => {
      a.current && window.clearTimeout(a.current), a.current = null;
    }, []);
    return T.useEffect(() => u, [u]), T.useEffect(() => {
      const d = i.current;
      return () => {
        window.clearTimeout(d), l(null);
      };
    }, [i, l]), /* @__PURE__ */ z(fi, { asChild: !0, ...c, children: /* @__PURE__ */ z(
      Dc,
      {
        id: r.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": r.contentId,
        "data-state": Uc(n.open),
        ...e,
        ref: hr(t, r.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: ae(
          e.onPointerMove,
          Kn((d) => {
            s.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !a.current && (s.onPointerGraceIntentChange(null), a.current = window.setTimeout(() => {
              n.onOpenChange(!0), u();
            }, 100));
          })
        ),
        onPointerLeave: ae(
          e.onPointerLeave,
          Kn((d) => {
            u();
            const f = n.content?.getBoundingClientRect();
            if (f) {
              const h = n.content?.dataset.side, g = h === "right", p = g ? -5 : 5, b = f[g ? "left" : "right"], w = f[g ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + p, y: d.clientY },
                  { x: b, y: f.top },
                  { x: w, y: f.top },
                  { x: w, y: f.bottom },
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
        onKeyDown: ae(e.onKeyDown, (d) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && d.key === " " || pg[o.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
Hc.displayName = _n;
var Fc = "MenuSubContent", zc = T.forwardRef(
  (e, t) => {
    const n = Tc(Ke, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, s = Xt(Ke, e.__scopeMenu), a = eo(Ke, e.__scopeMenu), i = Wc(Fc, e.__scopeMenu), l = T.useRef(null), c = Re(t, l);
    return /* @__PURE__ */ z(Vn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ z(Gt, { present: o || s.open, children: /* @__PURE__ */ z(Vn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ z(
      gi,
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
        onFocusOutside: ae(e.onFocusOutside, (u) => {
          u.target !== i.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: ae(e.onEscapeKeyDown, (u) => {
          a.onClose(), u.preventDefault();
        }),
        onKeyDown: ae(e.onKeyDown, (u) => {
          const d = u.currentTarget.contains(u.target), f = gg[a.dir].includes(u.key);
          d && f && (s.onOpenChange(!1), i.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
zc.displayName = Fc;
function Uc(e) {
  return e ? "open" : "closed";
}
function tr(e) {
  return e === "indeterminate";
}
function wi(e) {
  return tr(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function _g(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function $g(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function Bg(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = $g(e, Math.max(s, 0));
  r.length === 1 && (a = a.filter((c) => c !== n));
  const l = a.find(
    (c) => c.toLowerCase().startsWith(r.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function Wg(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], c = i.x, u = i.y, d = l.x, f = l.y;
    u > o != f > o && n < (d - c) * (o - u) / (f - u) + c && (r = !r);
  }
  return r;
}
function Hg(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Wg(n, t);
}
function Kn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Fg = Cc, zg = fi, Ug = Ec, Yg = Sc, jg = bi, Vg = Mc, Kg = kr, Gg = Ac, qg = Ic, Xg = Lc, Zg = _c, Qg = $c, Jg = Bc, eb = Hc, tb = zc, xr = "DropdownMenu", [nb] = xn(
  xr,
  [kc]
), Le = kc(), [ob, Yc] = nb(xr), jc = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: o,
    open: r,
    defaultOpen: s,
    onOpenChange: a,
    modal: i = !0
  } = e, l = Le(t), c = T.useRef(null), [u, d] = ni({
    prop: r,
    defaultProp: s ?? !1,
    onChange: a,
    caller: xr
  });
  return /* @__PURE__ */ z(
    ob,
    {
      scope: t,
      triggerId: qo(),
      triggerRef: c,
      contentId: qo(),
      open: u,
      onOpenChange: d,
      onOpenToggle: T.useCallback(() => d((f) => !f), [d]),
      modal: i,
      children: /* @__PURE__ */ z(Fg, { ...l, open: u, onOpenChange: d, dir: o, modal: i, children: n })
    }
  );
};
jc.displayName = xr;
var Vc = "DropdownMenuTrigger", Kc = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: o = !1, ...r } = e, s = Yc(Vc, n), a = Le(n);
    return /* @__PURE__ */ z(zg, { asChild: !0, ...a, children: /* @__PURE__ */ z(
      Pe.button,
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
        ref: hr(t, s.triggerRef),
        onPointerDown: ae(e.onPointerDown, (i) => {
          !o && i.button === 0 && i.ctrlKey === !1 && (s.onOpenToggle(), s.open || i.preventDefault());
        }),
        onKeyDown: ae(e.onKeyDown, (i) => {
          o || (["Enter", " "].includes(i.key) && s.onOpenToggle(), i.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
Kc.displayName = Vc;
var rb = "DropdownMenuPortal", Gc = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, o = Le(t);
  return /* @__PURE__ */ z(Ug, { ...o, ...n });
};
Gc.displayName = rb;
var qc = "DropdownMenuContent", Xc = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Yc(qc, n), s = Le(n), a = T.useRef(!1);
    return /* @__PURE__ */ z(
      Yg,
      {
        id: r.contentId,
        "aria-labelledby": r.triggerId,
        ...s,
        ...o,
        ref: t,
        onCloseAutoFocus: ae(e.onCloseAutoFocus, (i) => {
          a.current || r.triggerRef.current?.focus(), a.current = !1, i.preventDefault();
        }),
        onInteractOutside: ae(e.onInteractOutside, (i) => {
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
Xc.displayName = qc;
var sb = "DropdownMenuGroup", ib = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ z(jg, { ...r, ...o, ref: t });
  }
);
ib.displayName = sb;
var ab = "DropdownMenuLabel", lb = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ z(Vg, { ...r, ...o, ref: t });
  }
);
lb.displayName = ab;
var cb = "DropdownMenuItem", Zc = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ z(Kg, { ...r, ...o, ref: t });
  }
);
Zc.displayName = cb;
var ub = "DropdownMenuCheckboxItem", db = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ z(Gg, { ...r, ...o, ref: t });
});
db.displayName = ub;
var mb = "DropdownMenuRadioGroup", fb = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ z(qg, { ...r, ...o, ref: t });
});
fb.displayName = mb;
var hb = "DropdownMenuRadioItem", pb = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ z(Xg, { ...r, ...o, ref: t });
});
pb.displayName = hb;
var gb = "DropdownMenuItemIndicator", bb = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ z(Zg, { ...r, ...o, ref: t });
});
bb.displayName = gb;
var vb = "DropdownMenuSeparator", Qc = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ z(Qg, { ...r, ...o, ref: t });
});
Qc.displayName = vb;
var wb = "DropdownMenuArrow", Nb = T.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
    return /* @__PURE__ */ z(Jg, { ...r, ...o, ref: t });
  }
);
Nb.displayName = wb;
var yb = "DropdownMenuSubTrigger", kb = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ z(eb, { ...r, ...o, ref: t });
});
kb.displayName = yb;
var xb = "DropdownMenuSubContent", Cb = T.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Le(n);
  return /* @__PURE__ */ z(
    tb,
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
Cb.displayName = xb;
var Tb = jc, Eb = Kc, Sb = Gc, Mb = Xc, Db = Zc, Ab = Qc;
function Jc(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = Jc(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function eu() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = Jc(e)) && (o && (o += " "), o += t);
  return o;
}
const Ni = "-", Pb = (e) => {
  const t = Rb(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(Ni);
      return i[0] === "" && i.length !== 1 && i.shift(), tu(i, t) || Ib(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const l = n[a] || [];
      return i && o[a] ? [...l, ...o[a]] : l;
    }
  };
}, tu = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], o = t.nextPart.get(n), r = o ? tu(e.slice(1), o) : void 0;
  if (r)
    return r;
  if (t.validators.length === 0)
    return;
  const s = e.join(Ni);
  return t.validators.find(({
    validator: a
  }) => a(s))?.classGroupId;
}, ka = /^\[(.+)\]$/, Ib = (e) => {
  if (ka.test(e)) {
    const t = ka.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Rb = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const r in n)
    xs(n[r], o, r, t);
  return o;
}, xs = (e, t, n, o) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const s = r === "" ? t : xa(t, r);
      s.classGroupId = n;
      return;
    }
    if (typeof r == "function") {
      if (Lb(r)) {
        xs(r(o), t, n, o);
        return;
      }
      t.validators.push({
        validator: r,
        classGroupId: n
      });
      return;
    }
    Object.entries(r).forEach(([s, a]) => {
      xs(a, xa(t, s), n, o);
    });
  });
}, xa = (e, t) => {
  let n = e;
  return t.split(Ni).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}, Lb = (e) => e.isThemeGetter, Ob = (e) => {
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
}, Cs = "!", Ts = ":", _b = Ts.length, $b = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const s = [];
    let a = 0, i = 0, l = 0, c;
    for (let g = 0; g < r.length; g++) {
      let p = r[g];
      if (a === 0 && i === 0) {
        if (p === Ts) {
          s.push(r.slice(l, g)), l = g + _b;
          continue;
        }
        if (p === "/") {
          c = g;
          continue;
        }
      }
      p === "[" ? a++ : p === "]" ? a-- : p === "(" ? i++ : p === ")" && i--;
    }
    const u = s.length === 0 ? r : r.substring(l), d = Bb(u), f = d !== u, h = c && c > l ? c - l : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: d,
      maybePostfixModifierPosition: h
    };
  };
  if (t) {
    const r = t + Ts, s = o;
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
}, Bb = (e) => e.endsWith(Cs) ? e.substring(0, e.length - 1) : e.startsWith(Cs) ? e.substring(1) : e, Wb = (e) => {
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
}, Hb = (e) => ({
  cache: Ob(e.cacheSize),
  parseClassName: $b(e),
  sortModifiers: Wb(e),
  ...Pb(e)
}), Fb = /\s+/, zb = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: s
  } = t, a = [], i = e.trim().split(Fb);
  let l = "";
  for (let c = i.length - 1; c >= 0; c -= 1) {
    const u = i[c], {
      isExternal: d,
      modifiers: f,
      hasImportantModifier: h,
      baseClassName: g,
      maybePostfixModifierPosition: p
    } = n(u);
    if (d) {
      l = u + (l.length > 0 ? " " + l : l);
      continue;
    }
    let b = !!p, w = o(b ? g.substring(0, p) : g);
    if (!w) {
      if (!b) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (w = o(g), !w) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      b = !1;
    }
    const v = s(f).join(":"), y = h ? v + Cs : v, E = y + w;
    if (a.includes(E))
      continue;
    a.push(E);
    const N = r(w, b);
    for (let x = 0; x < N.length; ++x) {
      const S = N[x];
      a.push(y + S);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function Ub() {
  let e = 0, t, n, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = nu(t)) && (o && (o += " "), o += n);
  return o;
}
const nu = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = nu(e[o])) && (n && (n += " "), n += t);
  return n;
};
function Yb(e, ...t) {
  let n, o, r, s = a;
  function a(l) {
    const c = t.reduce((u, d) => d(u), e());
    return n = Hb(c), o = n.cache.get, r = n.cache.set, s = i, i(l);
  }
  function i(l) {
    const c = o(l);
    if (c)
      return c;
    const u = zb(l, n);
    return r(l, u), u;
  }
  return function() {
    return s(Ub.apply(null, arguments));
  };
}
const Ee = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, ou = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ru = /^\((?:(\w[\w-]*):)?(.+)\)$/i, jb = /^\d+\/\d+$/, Vb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Kb = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Gb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, qb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Xb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, rn = (e) => jb.test(e), le = (e) => !!e && !Number.isNaN(Number(e)), Ct = (e) => !!e && Number.isInteger(Number(e)), es = (e) => e.endsWith("%") && le(e.slice(0, -1)), lt = (e) => Vb.test(e), Zb = () => !0, Qb = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Kb.test(e) && !Gb.test(e)
), su = () => !1, Jb = (e) => qb.test(e), ev = (e) => Xb.test(e), tv = (e) => !J(e) && !ee(e), nv = (e) => En(e, lu, su), J = (e) => ou.test(e), $t = (e) => En(e, cu, Qb), ts = (e) => En(e, av, le), Ca = (e) => En(e, iu, su), ov = (e) => En(e, au, ev), Io = (e) => En(e, uu, Jb), ee = (e) => ru.test(e), Rn = (e) => Sn(e, cu), rv = (e) => Sn(e, lv), Ta = (e) => Sn(e, iu), sv = (e) => Sn(e, lu), iv = (e) => Sn(e, au), Ro = (e) => Sn(e, uu, !0), En = (e, t, n) => {
  const o = ou.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, Sn = (e, t, n = !1) => {
  const o = ru.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, iu = (e) => e === "position" || e === "percentage", au = (e) => e === "image" || e === "url", lu = (e) => e === "length" || e === "size" || e === "bg-size", cu = (e) => e === "length", av = (e) => e === "number", lv = (e) => e === "family-name", uu = (e) => e === "shadow", cv = () => {
  const e = Ee("color"), t = Ee("font"), n = Ee("text"), o = Ee("font-weight"), r = Ee("tracking"), s = Ee("leading"), a = Ee("breakpoint"), i = Ee("container"), l = Ee("spacing"), c = Ee("radius"), u = Ee("shadow"), d = Ee("inset-shadow"), f = Ee("text-shadow"), h = Ee("drop-shadow"), g = Ee("blur"), p = Ee("perspective"), b = Ee("aspect"), w = Ee("ease"), v = Ee("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], E = () => [
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
  ], N = () => [...E(), ee, J], x = () => ["auto", "hidden", "clip", "visible", "scroll"], S = () => ["auto", "contain", "none"], k = () => [ee, J, l], D = () => [rn, "full", "auto", ...k()], C = () => [Ct, "none", "subgrid", ee, J], M = () => ["auto", {
    span: ["full", Ct, ee, J]
  }, Ct, ee, J], P = () => [Ct, "auto", ee, J], R = () => ["auto", "min", "max", "fr", ee, J], L = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], $ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], _ = () => ["auto", ...k()], K = () => [rn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], I = () => [e, ee, J], A = () => [...E(), Ta, Ca, {
    position: [ee, J]
  }], O = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Y = () => ["auto", "cover", "contain", sv, nv, {
    size: [ee, J]
  }], j = () => [es, Rn, $t], q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    ee,
    J
  ], Z = () => ["", le, Rn, $t], B = () => ["solid", "dashed", "dotted", "double"], W = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], F = () => [le, es, Ta, Ca], Q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    ee,
    J
  ], ce = () => ["none", le, ee, J], de = () => ["none", le, ee, J], ge = () => [le, ee, J], Me = () => [rn, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [lt],
      breakpoint: [lt],
      color: [Zb],
      container: [lt],
      "drop-shadow": [lt],
      ease: ["in", "out", "in-out"],
      font: [tv],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [lt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [lt],
      shadow: [lt],
      spacing: ["px", le],
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
        aspect: ["auto", "square", rn, J, ee, b]
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
        columns: [le, J, ee, i]
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
        object: N()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: x()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": x()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": x()
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
        inset: D()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": D()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": D()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: D()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: D()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: D()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: D()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: D()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: D()
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
        basis: [rn, "full", "auto", i, ...k()]
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
        flex: [le, rn, "auto", "initial", "none", J]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", le, ee, J]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", le, ee, J]
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
        "grid-cols": C()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: M()
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
        "grid-rows": C()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: M()
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
        text: ["base", n, Rn, $t]
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
        font: [o, ee, ts]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", es, J]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [rv, J, t]
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
        "line-clamp": [le, "none", ee, ts]
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
        decoration: [le, "from-font", "auto", ee, $t]
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
        "underline-offset": [le, "auto", ee, J]
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
        bg: O()
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
          }, Ct, ee, J],
          radial: ["", ee, J],
          conic: [Ct, ee, J]
        }, iv, ov]
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
        "outline-offset": [le, ee, J]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", le, Rn, $t]
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
          Ro,
          Io
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
        "inset-shadow": ["none", d, Ro, Io]
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
        ring: I()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [le, $t]
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
        "inset-ring": Z()
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
        "text-shadow": ["none", f, Ro, Io]
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
        opacity: [le, ee, J]
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
        "mask-linear": [le]
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
        "mask-radial-at": E()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [le]
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
        mask: A()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: O()
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
        brightness: [le, ee, J]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [le, ee, J]
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
          Ro,
          Io
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
        grayscale: ["", le, ee, J]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [le, ee, J]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", le, ee, J]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [le, ee, J]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", le, ee, J]
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
        "backdrop-brightness": [le, ee, J]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [le, ee, J]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", le, ee, J]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [le, ee, J]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", le, ee, J]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [le, ee, J]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [le, ee, J]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", le, ee, J]
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
        duration: [le, "initial", ee, J]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", w, ee, J]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [le, ee, J]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", v, ee, J]
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
        "perspective-origin": N()
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
        origin: N()
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
        translate: Me()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Me()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Me()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Me()
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
        stroke: [le, Rn, $t, ts]
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
}, uv = /* @__PURE__ */ Yb(cv);
function ie(...e) {
  return uv(eu(e));
}
function ns({
  ...e
}) {
  return /* @__PURE__ */ m(Tb, { "data-slot": "dropdown-menu", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
    lineNumber: 10,
    columnNumber: 10
  }, this);
}
function os({
  ...e
}) {
  return /* @__PURE__ */ m(
    Eb,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 25,
      columnNumber: 5
    },
    this
  );
}
function rs({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ m(Sb, { children: /* @__PURE__ */ m(
    Mb,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: ie(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 39,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
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
    Db,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: ie(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...o
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 70,
      columnNumber: 5
    },
    this
  );
}
function ss({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Ab,
    {
      "data-slot": "dropdown-menu-separator",
      className: ie("bg-border -mx-1 my-1 h-px", e),
      ...t
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
      lineNumber: 169,
      columnNumber: 5
    },
    this
  );
}
const Ea = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Sa = eu, dv = (e, t) => (n) => {
  var o;
  if (t?.variants == null) return Sa(e, n?.class, n?.className);
  const { variants: r, defaultVariants: s } = t, a = Object.keys(r).map((c) => {
    const u = n?.[c], d = s?.[c];
    if (u === null) return null;
    const f = Ea(u) || Ea(d);
    return r[c][f];
  }), i = n && Object.entries(n).reduce((c, u) => {
    let [d, f] = u;
    return f === void 0 || (c[d] = f), c;
  }, {}), l = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((c, u) => {
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
      ...c,
      d,
      f
    ] : c;
  }, []);
  return Sa(e, a, l, n?.class, n?.className);
}, Es = dv(
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
    o ? Nf : "button",
    {
      "data-slot": "button",
      className: ie(Es({ variant: t, size: n, className: e })),
      ...r
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/button.tsx",
      lineNumber: 52,
      columnNumber: 5
    },
    this
  );
}
var mv = Object.freeze({
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
}), fv = "VisuallyHidden", du = T.forwardRef(
  (e, t) => /* @__PURE__ */ z(
    Pe.span,
    {
      ...e,
      ref: t,
      style: { ...mv, ...e.style }
    }
  )
);
du.displayName = fv;
var hv = du, [Cr] = xn("Tooltip", [
  wr
]), Tr = wr(), mu = "TooltipProvider", pv = 700, Ss = "tooltip.open", [gv, yi] = Cr(mu), fu = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = pv,
    skipDelayDuration: o = 300,
    disableHoverableContent: r = !1,
    children: s
  } = e, a = T.useRef(!0), i = T.useRef(!1), l = T.useRef(0);
  return T.useEffect(() => {
    const c = l.current;
    return () => window.clearTimeout(c);
  }, []), /* @__PURE__ */ z(
    gv,
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
fu.displayName = mu;
var Gn = "Tooltip", [bv, to] = Cr(Gn), hu = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: i
  } = e, l = yi(Gn, e.__scopeTooltip), c = Tr(t), [u, d] = T.useState(null), f = qo(), h = T.useRef(0), g = a ?? l.disableHoverableContent, p = i ?? l.delayDuration, b = T.useRef(!1), [w, v] = ni({
    prop: o,
    defaultProp: r ?? !1,
    onChange: (S) => {
      S ? (l.onOpen(), document.dispatchEvent(new CustomEvent(Ss))) : l.onClose(), s?.(S);
    },
    caller: Gn
  }), y = T.useMemo(() => w ? b.current ? "delayed-open" : "instant-open" : "closed", [w]), E = T.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, b.current = !1, v(!0);
  }, [v]), N = T.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, v(!1);
  }, [v]), x = T.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      b.current = !0, v(!0), h.current = 0;
    }, p);
  }, [p, v]);
  return T.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ z(nc, { ...c, children: /* @__PURE__ */ z(
    bv,
    {
      scope: t,
      contentId: f,
      open: w,
      stateAttribute: y,
      trigger: u,
      onTriggerChange: d,
      onTriggerEnter: T.useCallback(() => {
        l.isOpenDelayedRef.current ? x() : E();
      }, [l.isOpenDelayedRef, x, E]),
      onTriggerLeave: T.useCallback(() => {
        g ? N() : (window.clearTimeout(h.current), h.current = 0);
      }, [N, g]),
      onOpen: E,
      onClose: N,
      disableHoverableContent: g,
      children: n
    }
  ) });
};
hu.displayName = Gn;
var Ms = "TooltipTrigger", pu = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = to(Ms, n), s = yi(Ms, n), a = Tr(n), i = T.useRef(null), l = Re(t, i, r.onTriggerChange), c = T.useRef(!1), u = T.useRef(!1), d = T.useCallback(() => c.current = !1, []);
    return T.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ z(oc, { asChild: !0, ...a, children: /* @__PURE__ */ z(
      Pe.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...o,
        ref: l,
        onPointerMove: ae(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !u.current && !s.isPointerInTransitRef.current && (r.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: ae(e.onPointerLeave, () => {
          r.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: ae(e.onPointerDown, () => {
          r.open && r.onClose(), c.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: ae(e.onFocus, () => {
          c.current || r.onOpen();
        }),
        onBlur: ae(e.onBlur, r.onClose),
        onClick: ae(e.onClick, r.onClose)
      }
    ) });
  }
);
pu.displayName = Ms;
var ki = "TooltipPortal", [vv, wv] = Cr(ki, {
  forceMount: void 0
}), gu = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, s = to(ki, t);
  return /* @__PURE__ */ z(vv, { scope: t, forceMount: n, children: /* @__PURE__ */ z(Gt, { present: n || s.open, children: /* @__PURE__ */ z(mi, { asChild: !0, container: r, children: o }) }) });
};
gu.displayName = ki;
var Nn = "TooltipContent", bu = T.forwardRef(
  (e, t) => {
    const n = wv(Nn, e.__scopeTooltip), { forceMount: o = n.forceMount, side: r = "top", ...s } = e, a = to(Nn, e.__scopeTooltip);
    return /* @__PURE__ */ z(Gt, { present: o || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ z(vu, { side: r, ...s, ref: t }) : /* @__PURE__ */ z(Nv, { side: r, ...s, ref: t }) });
  }
), Nv = T.forwardRef((e, t) => {
  const n = to(Nn, e.__scopeTooltip), o = yi(Nn, e.__scopeTooltip), r = T.useRef(null), s = Re(t, r), [a, i] = T.useState(null), { trigger: l, onClose: c } = n, u = r.current, { onPointerInTransitChange: d } = o, f = T.useCallback(() => {
    i(null), d(!1);
  }, [d]), h = T.useCallback(
    (g, p) => {
      const b = g.currentTarget, w = { x: g.clientX, y: g.clientY }, v = Cv(w, b.getBoundingClientRect()), y = Tv(w, v), E = Ev(p.getBoundingClientRect()), N = Mv([...y, ...E]);
      i(N), d(!0);
    },
    [d]
  );
  return T.useEffect(() => () => f(), [f]), T.useEffect(() => {
    if (l && u) {
      const g = (b) => h(b, u), p = (b) => h(b, l);
      return l.addEventListener("pointerleave", g), u.addEventListener("pointerleave", p), () => {
        l.removeEventListener("pointerleave", g), u.removeEventListener("pointerleave", p);
      };
    }
  }, [l, u, h, f]), T.useEffect(() => {
    if (a) {
      const g = (p) => {
        const b = p.target, w = { x: p.clientX, y: p.clientY }, v = l?.contains(b) || u?.contains(b), y = !Sv(w, a);
        v ? f() : y && (f(), c());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [l, u, a, c, f]), /* @__PURE__ */ z(vu, { ...e, ref: s });
}), [yv, kv] = Cr(Gn, { isInside: !1 }), xv = /* @__PURE__ */ kf("TooltipContent"), vu = T.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: o,
      "aria-label": r,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...i
    } = e, l = to(Nn, n), c = Tr(n), { onClose: u } = l;
    return T.useEffect(() => (document.addEventListener(Ss, u), () => document.removeEventListener(Ss, u)), [u]), T.useEffect(() => {
      if (l.trigger) {
        const d = (f) => {
          f.target?.contains(l.trigger) && u();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [l.trigger, u]), /* @__PURE__ */ z(
      oi,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ Lm(
          rc,
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
              /* @__PURE__ */ z(xv, { children: o }),
              /* @__PURE__ */ z(yv, { scope: n, isInside: !0, children: /* @__PURE__ */ z(hv, { id: l.contentId, role: "tooltip", children: r || o }) })
            ]
          }
        )
      }
    );
  }
);
bu.displayName = Nn;
var wu = "TooltipArrow", Nu = T.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = Tr(n);
    return kv(
      wu,
      n
    ).isInside ? null : /* @__PURE__ */ z(sc, { ...r, ...o, ref: t });
  }
);
Nu.displayName = wu;
function Cv(e, t) {
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
function Tv(e, t, n = 5) {
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
function Ev(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: o },
    { x: r, y: o }
  ];
}
function Sv(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], c = i.x, u = i.y, d = l.x, f = l.y;
    u > o != f > o && n < (d - c) * (o - u) / (f - u) + c && (r = !r);
  }
  return r;
}
function Mv(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), Dv(t);
}
function Dv(e) {
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
var Av = fu, Pv = hu, Iv = pu, Rv = gu, Lv = bu, Ov = Nu;
function _v({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ m(
    Av,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
      lineNumber: 11,
      columnNumber: 5
    },
    this
  );
}
function Ds({
  ...e
}) {
  return /* @__PURE__ */ m(_v, { children: /* @__PURE__ */ m(Pv, { "data-slot": "tooltip", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
    lineNumber: 24,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
function As({
  ...e
}) {
  return /* @__PURE__ */ m(Iv, { "data-slot": "tooltip-trigger", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
function Ps({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...o
}) {
  return /* @__PURE__ */ m(Rv, { children: /* @__PURE__ */ m(
    Lv,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: ie(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ m(Ov, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
      lineNumber: 43,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/tooltip.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}
const Ne = ({ onClick: e, isActive: t, disabled: n, children: o, tooltip: r }) => {
  const s = /* @__PURE__ */ m(
    "button",
    {
      onMouseDown: (a) => {
        a.preventDefault(), a.stopPropagation(), n || e();
      },
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
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 101,
      columnNumber: 5
    },
    void 0
  );
  return r ? /* @__PURE__ */ m(Ds, { children: [
    /* @__PURE__ */ m(As, { asChild: !0, children: s }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 125,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ m(Ps, { side: "bottom", className: "text-xs", children: r }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 126,
      columnNumber: 9
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 124,
    columnNumber: 7
  }, void 0) : s;
}, sn = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }, void 0, !1, {
  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
  lineNumber: 137,
  columnNumber: 3
}, void 0), $v = jt(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: o, className: r = "", autoReorderChecklist: s = !1, aiEnabled: a = !1, onAISparklesClick: i }) {
  const l = V(null), [c, u] = U(!1), [d, f] = U(void 0), h = al({
    editor: t,
    selector: ({ editor: x }) => ({
      canUndo: x.can().undo(),
      canRedo: x.can().redo(),
      isBold: x.isActive("bold"),
      isItalic: x.isActive("italic"),
      isUnderline: x.isActive("underline"),
      isStrike: x.isActive("strike"),
      isCode: x.isActive("code"),
      isHighlight: x.isActive("highlight"),
      isH1: x.isActive("heading", { level: 1 }),
      isH2: x.isActive("heading", { level: 2 }),
      isH3: x.isActive("heading", { level: 3 }),
      isH4: x.isActive("heading", { level: 4 }),
      isH5: x.isActive("heading", { level: 5 }),
      isBlockquote: x.isActive("blockquote"),
      isBulletList: x.isActive("bulletList"),
      isOrderedList: x.isActive("orderedList"),
      isTaskList: x.isActive("taskList"),
      isCodeBlock: x.isActive("codeBlock"),
      isLink: x.isActive("link")
    })
  }), g = H(() => {
    const { view: x } = t, { from: S } = x.state.selection, k = x.coordsAtPos(S);
    f({ top: k.bottom + 8, left: k.left }), u(!0);
  }, [t]), p = H((x, S) => {
    t.chain().focus().setImage({ src: x, alt: S }).run(), u(!1);
  }, [t]), b = H(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), w = H((x) => {
    t.chain().focus().insertCallout({ type: x }).run();
  }, [t]), v = V(/* @__PURE__ */ new Map()), y = V(/* @__PURE__ */ new Map()), E = H((x) => {
    const { doc: S, tr: k } = x.state;
    let D = !1;
    const C = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), M = x.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), M.forEach((R, L) => {
      R.querySelectorAll(":scope > li").forEach((_) => {
        const K = _, I = (K.textContent || "").trim().substring(0, 50);
        v.current.set(`${L}-${I}`, K.getBoundingClientRect());
      });
    });
    const P = [];
    S.descendants((R, L, $, _) => {
      if (!C.has(R.type.name)) return !0;
      let K = !1;
      if (R.forEach((A) => {
        A.type.name === "taskItem" && (K = !0);
      }), !K) return !0;
      let I = 0;
      return S.nodesBetween(0, L, (A) => (C.has(A.type.name) && I++, !0)), P.push({ node: R, pos: L, depth: I }), !0;
    }), P.sort((R, L) => L.depth - R.depth);
    for (const { node: R, pos: L } of P) {
      const $ = [];
      let _ = 0;
      R.forEach((B) => {
        $.push({
          node: B,
          isTask: B.type.name === "taskItem",
          checked: B.type.name === "taskItem" && B.attrs.checked === !0,
          originalIndex: _++
        });
      });
      const K = $.filter((B) => B.isTask && !B.checked), I = $.filter((B) => B.isTask && B.checked), A = [...$], O = $.map((B, W) => ({ index: W, isTask: B.isTask })).filter((B) => B.isTask).map((B) => B.index), Y = [...K, ...I];
      if (O.forEach((B, W) => {
        A[B] = Y[W];
      }), !A.some((B, W) => B.node !== $[W].node)) continue;
      const q = R.type.create(
        R.attrs,
        A.map((B) => B.node)
      ), Z = k.mapping.map(L);
      k.replaceWith(Z, Z + R.nodeSize, q), D = !0;
    }
    D && (x.view.dispatch(k), requestAnimationFrame(() => {
      x.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((L) => {
        const $ = L.querySelectorAll(":scope > li"), _ = /* @__PURE__ */ new Map();
        v.current.forEach((K, I) => {
          const A = I.replace(/^\d+-/, "");
          _.set(A, K);
        }), $.forEach((K) => {
          const I = K, A = (I.textContent || "").trim().substring(0, 50), O = _.get(A);
          if (!O) return;
          const Y = I.getBoundingClientRect(), j = O.top - Y.top;
          if (Math.abs(j) < 2) return;
          I.style.transform = `translateY(${j}px)`, I.style.transition = "none", I.style.zIndex = "1", I.offsetHeight, I.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", I.style.transform = "translateY(0)";
          const q = () => {
            I.style.transform = "", I.style.transition = "", I.style.zIndex = "", I.removeEventListener("transitionend", q);
          };
          I.addEventListener("transitionend", q), setTimeout(q, 400);
        });
      });
    }));
  }, []);
  G(() => {
    if (!s || !t) return;
    const x = /* @__PURE__ */ new Map();
    t.state.doc.descendants((k, D) => (k.type.name === "taskItem" && x.set(D, k.attrs.checked === !0), !0)), y.current = x;
    const S = ({ transaction: k }) => {
      if (!k.docChanged) return;
      const D = /* @__PURE__ */ new Map();
      t.state.doc.descendants((P, R) => (P.type.name === "taskItem" && D.set(R, P.attrs.checked === !0), !0));
      const C = y.current;
      let M = !1;
      if (C.size > 0 && D.size > 0) {
        let P = 0, R = 0;
        C.forEach((L) => {
          L && P++;
        }), D.forEach((L) => {
          L && R++;
        }), P !== R && (M = !0);
      }
      y.current = D, M && setTimeout(() => {
        E(t);
      }, 150);
    };
    return t.on("transaction", S), () => {
      t.off("transaction", S);
    };
  }, [t, s, E]);
  const N = H(() => {
    E(t);
  }, [t, E]);
  return /* @__PURE__ */ m("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${r}`, children: [
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !h?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Yd, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 389,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 384,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !h?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(jd, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 396,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 391,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(sn, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 399,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: h?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(Bs, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 407,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 402,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: h?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m(Ws, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 414,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 409,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: h?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(Hs, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 421,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 416,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: h?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(Fs, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 428,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 423,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: h?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(ul, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 435,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 430,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: h?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(dl, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 442,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 437,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => o?.(),
        isActive: h?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(zs, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 449,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 444,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(sn, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 452,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(ns, { children: [
      /* @__PURE__ */ m(os, { asChild: !0, children: /* @__PURE__ */ m(
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
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 468,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m(Dt, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 471,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 457,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 456,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(rs, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().setParagraph().run(),
            className: !h?.isH1 && !h?.isH2 && !h?.isH3 && !h?.isH4 && !h?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "P" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 479,
                columnNumber: 13
              }, this),
              "Paragraph"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 475,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 1 }).run(),
            className: h?.isH1 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H1" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 486,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 1" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 487,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 482,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 2 }).run(),
            className: h?.isH2 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 493,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 494,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 489,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 3 }).run(),
            className: h?.isH3 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H3" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 500,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 3" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 501,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 496,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 4 }).run(),
            className: h?.isH4 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H4" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 507,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 4" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 508,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 503,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeading({ level: 5 }).run(),
            className: h?.isH5 ? "bg-accent font-medium" : "",
            children: [
              /* @__PURE__ */ m("span", { className: "w-6 text-xs font-semibold text-muted-foreground", children: "H5" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 514,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "font-semibold", children: "Heading 5" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 515,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 510,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 474,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 455,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(sn, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 520,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: h?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(Us, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 528,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 523,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: h?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m(Ys, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 535,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 530,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: h?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m(js, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 542,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 537,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: h?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(Vs, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 549,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 544,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => ti(t),
        isActive: h?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(ml, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 556,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 551,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => {
          if (h?.isTaskList)
            t.chain().focus().sinkListItem("taskItem").run();
          else if ((h?.isBulletList || h?.isOrderedList) && (t.chain().focus().sinkListItem("listItem").run(), h?.isOrderedList)) {
            const { state: x, view: S } = t, { $from: k } = x.selection, D = x.schema.nodes.orderedList, C = x.schema.nodes.bulletList;
            if (D && C)
              for (let M = k.depth; M >= 0; M--) {
                const P = k.node(M);
                if (P.type === D && M >= 2) {
                  const R = k.node(M - 1);
                  if (R.type.name === "listItem" || R.type.name === "taskItem") {
                    const L = k.before(M);
                    S.dispatch(x.tr.setNodeMarkup(L, C, P.attrs));
                    break;
                  }
                }
                if (P.type.name === "bulletList" || P.type.name === "taskList") break;
              }
          }
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ m(Vd, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 591,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 558,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(Kd, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 604,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 593,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(sn, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 607,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: b,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m(fs, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 614,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 610,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: g,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m(_s, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 620,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 616,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ m(fl, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 626,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 622,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(ns, { children: [
      /* @__PURE__ */ m(os, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ m(Go, { size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 635,
            columnNumber: 13
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 631,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 630,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(rs, { align: "start", children: [
        /* @__PURE__ */ m(we, { onClick: () => w("info"), children: [
          /* @__PURE__ */ m(Go, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 640,
            columnNumber: 13
          }, this),
          " Info"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 639,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(we, { onClick: () => w("note"), children: [
          /* @__PURE__ */ m(Ks, { size: 16, className: "mr-2", style: { color: "#FF8200" } }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 643,
            columnNumber: 13
          }, this),
          " Note"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 642,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(we, { onClick: () => w("prompt"), children: [
          /* @__PURE__ */ m(Gd, { size: 16, className: "mr-2", style: { color: "#B244B3" } }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 646,
            columnNumber: 13
          }, this),
          " Prompt"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 645,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(we, { onClick: () => w("resources"), children: [
          /* @__PURE__ */ m(qd, { size: 16, className: "mr-2", style: { color: "#63B148" } }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 649,
            columnNumber: 13
          }, this),
          " Resources"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 648,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(we, { onClick: () => w("todo"), children: [
          /* @__PURE__ */ m(Gs, { size: 16, className: "mr-2", style: { color: "#4479B3" } }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 652,
            columnNumber: 13
          }, this),
          " Todo"
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 651,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 638,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 629,
      columnNumber: 7
    }, this),
    t.isActive("table") && /* @__PURE__ */ m(ns, { children: [
      /* @__PURE__ */ m(os, { asChild: !0, children: /* @__PURE__ */ m(
        Mt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ m(fs, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 666,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m("span", { className: "text-xs hidden sm:inline", children: "Table" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 667,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 661,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 660,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(rs, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ m(Yi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 675,
                columnNumber: 15
              }, this),
              " Add Column Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 671,
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
              /* @__PURE__ */ m(Yi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 681,
                columnNumber: 15
              }, this),
              " Add Column After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 677,
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
              /* @__PURE__ */ m(un, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 687,
                columnNumber: 15
              }, this),
              " Delete Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 683,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(ss, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 689,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ m(ji, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 694,
                columnNumber: 15
              }, this),
              " Add Row Before"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 690,
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
              /* @__PURE__ */ m(ji, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 700,
                columnNumber: 15
              }, this),
              " Add Row After"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 696,
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
              /* @__PURE__ */ m(un, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 706,
                columnNumber: 15
              }, this),
              " Delete Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 702,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(ss, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 708,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ m(Vi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 713,
                columnNumber: 15
              }, this),
              " Toggle Header Row"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 709,
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
              /* @__PURE__ */ m(Vi, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 719,
                columnNumber: 15
              }, this),
              " Toggle Header Column"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 715,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ m(ss, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 722,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          we,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ m(un, { size: 16, className: "mr-2" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
                lineNumber: 728,
                columnNumber: 15
              }, this),
              " Delete Table"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 723,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 670,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 659,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m(
      El,
      {
        isOpen: c,
        onClose: () => u(!1),
        onInsert: p,
        position: d
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 735,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(sn, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 743,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      Ne,
      {
        onClick: N,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m(Xd, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 748,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 744,
        columnNumber: 7
      },
      this
    ),
    a && /* @__PURE__ */ m(ye, { children: [
      /* @__PURE__ */ m(sn, {}, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 754,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(Ds, { children: [
        /* @__PURE__ */ m(As, { asChild: !0, children: /* @__PURE__ */ m(
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
            children: /* @__PURE__ */ m(dr, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 771,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
            lineNumber: 757,
            columnNumber: 15
          },
          this
        ) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 756,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(Ps, { side: "bottom", className: "text-xs", children: "AI Writing Assistant" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 774,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 755,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 753,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m("div", { className: "flex-1 min-w-2" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 782,
      columnNumber: 7
    }, this),
    n && /* @__PURE__ */ m(Ds, { children: [
      /* @__PURE__ */ m(As, { asChild: !0, children: /* @__PURE__ */ m(
        Mt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 gap-1 shrink-0",
          onClick: n,
          children: [
            /* @__PURE__ */ m(Kt, { size: 16 }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 794,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ m("span", { className: "text-xs hidden md:inline", children: "Copy MD" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
              lineNumber: 795,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 788,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 787,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m(Ps, { side: "bottom", className: "text-xs", children: "Copy content as Markdown" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
        lineNumber: 798,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 786,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
    lineNumber: 382,
    columnNumber: 5
  }, this);
});
function Bv({ editor: e, isOpen: t, onClose: n, focusTrigger: o = 0, initialSearchQuery: r, editorMode: s = "wysiwyg", rawMarkdown: a = "", onRawMarkdownChange: i, onMatchesChange: l }) {
  const c = s === "markdown", [u, d] = U(""), [f, h] = U(""), [g, p] = U(!1), [b, w] = U(!1), [v, y] = U(!1), [E, N] = U(!1), [x, S] = U([]), [k, D] = U(0), [C, M] = U(null), [P, R] = U(!1), L = V(!1), $ = V(null), _ = V(null), K = V(!1);
  G(() => {
    t && r && r.trim() && d(r);
  }, [t, r, o]);
  const I = H(() => {
    if (!u || !e) {
      S([]), D(0), M(null);
      return;
    }
    const B = [];
    let W;
    try {
      if (b)
        W = new RegExp(u, g ? "g" : "gi");
      else {
        let F = u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        v && (F = `\\b${F}\\b`), W = new RegExp(F, g ? "g" : "gi");
      }
      M(null);
    } catch (F) {
      M(F.message), S([]);
      return;
    }
    if (c) {
      let F;
      for (; (F = W.exec(a)) !== null; )
        B.push({
          from: F.index,
          to: F.index + F[0].length,
          text: F[0]
        });
    } else {
      const { doc: F } = e.state;
      F.descendants((Q, ce) => {
        if (Q.isText && Q.text) {
          let de;
          for (; (de = W.exec(Q.text)) !== null; )
            B.push({
              from: ce + de.index,
              to: ce + de.index + de[0].length,
              text: de[0]
            });
        }
        return !0;
      });
    }
    S(B), B.length > 0 && k >= B.length && D(0);
  }, [u, g, b, v, e, k, c, a]);
  G(() => {
    I();
  }, [I]), G(() => {
    c && l && (t && x.length > 0 ? l(x, k) : l([], 0));
  }, [c, t, x, k, l]), G(() => {
    if (!e) return;
    if (c) {
      typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight();
      return;
    }
    const B = typeof e.commands.setSearchHighlight == "function";
    t && u && B ? e.commands.setSearchHighlight({
      searchTerm: u,
      caseSensitive: g,
      useRegex: b,
      currentMatchIndex: k
    }) : B && e.commands.clearSearchHighlight();
  }, [e, t, u, g, b, k, c, x, a]), G(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), l && l([], 0), L.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), R(!1)), L.current = !1);
  }, [t, e, l]), G(() => {
    if (x.length > 0 && k < x.length) {
      const B = x[k];
      if (c) {
        const F = document.querySelector(".syntax-textarea");
        if (F && K.current) {
          const Q = parseInt(getComputedStyle(F).lineHeight) || 22, de = a.substring(0, B.from).split(`
`).length;
          F.scrollTop = Math.max(0, (de - 3) * Q);
        }
        K.current && (K.current = !1);
        return;
      }
      const W = e.view.domAtPos(B.from);
      W.node && W.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), K.current && (K.current = !1);
    }
  }, [k, x, e, c, a]), G(() => {
    t && $.current && ($.current.focus(), $.current.select());
  }, [t, o]);
  const A = H(() => {
    x.length !== 0 && (K.current = !0, D((B) => (B + 1) % x.length));
  }, [x.length]), O = H(() => {
    x.length !== 0 && (K.current = !0, D((B) => (B - 1 + x.length) % x.length));
  }, [x.length]), Y = H(() => {
    if (x.length === 0 || k >= x.length) return;
    const B = x[k];
    if (c && i) {
      const W = a.substring(0, B.from) + f + a.substring(B.to);
      i(W), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: B.from, to: B.to }).deleteSelection().insertContent(f).run(), setTimeout(I, 10);
  }, [x, k, f, e, I, c, a, i]), j = H(() => {
    if (x.length === 0) return;
    if (c && i) {
      const W = [...x].sort((Q, ce) => ce.from - Q.from);
      let F = a;
      W.forEach((Q) => {
        F = F.substring(0, Q.from) + f + F.substring(Q.to);
      }), i(F), setTimeout(I, 10);
      return;
    }
    const B = [...x].sort((W, F) => F.from - W.from);
    e.chain().focus(), B.forEach((W) => {
      e.chain().setTextSelection({ from: W.from, to: W.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(I, 10);
  }, [x, f, e, I, c, a, i]), q = H(() => {
    if (x.length === 0 || !u || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: u,
      caseSensitive: g,
      useRegex: b,
      wholeWord: v
    }) && (R(!0), L.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [x, u, g, b, v, e, n]), Z = H((B) => {
    B.key === "Enter" ? (B.preventDefault(), B.shiftKey ? O() : A(), $.current?.focus()) : B.key === "Escape" ? (B.preventDefault(), n()) : B.key === "h" && (B.ctrlKey || B.metaKey) ? (B.preventDefault(), N((W) => !W)) : B.key === "l" && (B.ctrlKey || B.metaKey) && B.shiftKey && (B.preventDefault(), q());
  }, [A, O, n, q]);
  return t ? /* @__PURE__ */ m(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: Z,
      children: [
        /* @__PURE__ */ m("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ m("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(Zd, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
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
                className: `find-replace-input ${C ? "has-error" : ""}`
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 382,
                columnNumber: 11
              },
              this
            ),
            C && /* @__PURE__ */ m("span", { className: "find-replace-error", title: C, children: "!" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 391,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
            lineNumber: 380,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("span", { className: "find-replace-count", children: x.length > 0 ? `${k + 1} of ${x.length}` : u ? "No results" : "" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
            lineNumber: 396,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: O,
              disabled: x.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ m(Qd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 410,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 404,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: A,
              disabled: x.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ m(Dt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 418,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 412,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: q,
              disabled: x.length === 0,
              className: `find-replace-btn ${P ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${x.length} matches`,
              children: /* @__PURE__ */ m(Jd, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 428,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 422,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m("div", { className: "find-replace-separator" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
            lineNumber: 432,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => p((B) => !B),
              className: `find-replace-btn ${g ? "active" : ""}`,
              title: "Match case",
              children: /* @__PURE__ */ m(em, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 440,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 435,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => y((B) => !B),
              className: `find-replace-btn ${v ? "active" : ""}`,
              title: "Match whole word",
              children: /* @__PURE__ */ m(tm, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 447,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 442,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => w((B) => !B),
              className: `find-replace-btn ${b ? "active" : ""}`,
              title: "Use regex",
              children: /* @__PURE__ */ m(nm, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 454,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 449,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => N((B) => !B),
              className: `find-replace-btn ${E ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ m(hs, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 463,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
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
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 472,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 467,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
          lineNumber: 379,
          columnNumber: 7
        }, this),
        E && /* @__PURE__ */ m("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ m("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(hs, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 480,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                ref: _,
                type: "text",
                placeholder: "Replace with...",
                value: f,
                onChange: (B) => h(B.target.value),
                className: "find-replace-input"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                lineNumber: 481,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
            lineNumber: 479,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: Y,
              disabled: x.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace current",
              children: "Replace"
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 491,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: j,
              disabled: x.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ m(om, { size: 14 }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
                  lineNumber: 505,
                  columnNumber: 13
                }, this),
                "All"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 499,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
          lineNumber: 478,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
      lineNumber: 374,
      columnNumber: 5
    },
    this
  ) : null;
}
const Wv = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), ct = Wv ? "⌘" : "Ctrl", Hv = ({ editor: e }) => {
  const [t, n] = U(!1), [o, r] = U(0), [s, a] = U(0), [i, l] = U(""), [c, u] = U(""), [d, f] = U(!1), [h, g] = U(!1);
  G(() => {
    if (!e) return;
    const S = () => {
      const D = e.storage.selectAllOccurrences;
      D ? (n(D.isActive), r(D.ranges.length), a(D.allMatches.length), l(D.searchTerm), u(D.typedBuffer), f(D.isTypingReplace), g(D.isIncremental)) : (n(!1), r(0), a(0));
    }, k = () => {
      S();
    };
    return e.on("transaction", k), S(), () => {
      e.off("transaction", k);
    };
  }, [e]);
  const p = H(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), b = H(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), w = H(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), v = H(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), y = H(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), E = H(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), N = H(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), x = H(() => {
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
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 131,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-count-label", children: "selected" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 134,
          columnNumber: 11
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 130,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ m(ye, { children: [
        /* @__PURE__ */ m(ur, { size: 12, className: "select-all-action-bar-preview-icon" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 141,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-old", children: i }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 142,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-arrow", children: "→" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 143,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-new", children: c || "∅" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 144,
          columnNumber: 15
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 140,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ m(ye, { children: /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-term", children: [
        '"',
        i,
        '"'
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 148,
        columnNumber: 15
      }, void 0) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 147,
        columnNumber: 13
      }, void 0) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 138,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 154,
        columnNumber: 9
      }, void 0),
      h && o < s && /* @__PURE__ */ m(ye, { children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: N,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${ct}+D)`,
            children: /* @__PURE__ */ m(qs, { size: 14 }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
              lineNumber: 164,
              columnNumber: 15
            }, void 0)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 159,
            columnNumber: 13
          },
          void 0
        ),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: x,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${ct}+Shift+L)`,
            children: "All"
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 166,
            columnNumber: 13
          },
          void 0
        ),
        /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 173,
          columnNumber: 13
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 158,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: p,
          className: "select-all-action-bar-btn",
          title: `Bold all occurrences (${ct}+B)`,
          children: /* @__PURE__ */ m(Bs, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 183,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
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
          title: `Italic all occurrences (${ct}+I)`,
          children: /* @__PURE__ */ m(Ws, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 190,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 185,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: w,
          className: "select-all-action-bar-btn",
          title: `Underline all occurrences (${ct}+U)`,
          children: /* @__PURE__ */ m(Hs, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 197,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 192,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: v,
          className: "select-all-action-bar-btn",
          title: "Strikethrough all occurrences",
          children: /* @__PURE__ */ m(Fs, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 204,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 199,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-separator" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 208,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: y,
          className: "select-all-action-bar-btn select-all-action-bar-btn-danger",
          title: "Delete all occurrences",
          children: /* @__PURE__ */ m(un, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 216,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
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
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
            lineNumber: 225,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
          lineNumber: 220,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 128,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: h && o < s ? /* @__PURE__ */ m(ye, { children: [
      /* @__PURE__ */ m("kbd", { children: [
        ct,
        "+D"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 13
      }, void 0),
      " next · ",
      /* @__PURE__ */ m("kbd", { children: [
        ct,
        "+Shift+L"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 42
      }, void 0),
      " all · Type to replace · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 94
      }, void 0),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: [
        ct,
        "+Z"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 119
      }, void 0),
      " undo"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 232,
      columnNumber: 11
    }, void 0) : /* @__PURE__ */ m(ye, { children: [
      "Type to replace all · ",
      /* @__PURE__ */ m("kbd", { children: "Esc" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 35
      }, void 0),
      " to exit · ",
      /* @__PURE__ */ m("kbd", { children: "Backspace" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 60
      }, void 0),
      " to delete · ",
      /* @__PURE__ */ m("kbd", { children: [
        ct,
        "+Z"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 237,
        columnNumber: 93
      }, void 0),
      " undo"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 236,
      columnNumber: 11
    }, void 0) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
      lineNumber: 230,
      columnNumber: 7
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
    lineNumber: 127,
    columnNumber: 5
  }, void 0);
}, Fv = jt(Hv), Lo = "-dismissed";
function zv(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const o = e.charCodeAt(n);
    t = (t << 5) - t + o, t = t & t;
  }
  return t;
}
function Uv(e, t = {}) {
  const {
    storageKey: n = "paragon-editor-content",
    debounceMs: o = 1e3,
    enabled: r = !0,
    onSave: s,
    onRecover: a
  } = t, [i, l] = U({
    status: "idle",
    lastSaved: null,
    hasRecoverableContent: !1,
    error: null
  }), c = V(null), u = V(""), d = V(0);
  G(() => {
    if (r && !(!e || e.isDestroyed))
      try {
        const w = localStorage.getItem(n), v = localStorage.getItem(n + Lo);
        if (w && !v) {
          let y = "";
          try {
            y = e.getHTML() || "";
          } catch {
            return;
          }
          w !== y && w.length > 50 && l((E) => ({ ...E, hasRecoverableContent: !0 }));
        }
      } catch (w) {
        console.warn("useAutoSave: Error checking for recoverable content", w);
      }
  }, [e, n, r]);
  const f = H(() => {
    if (!(!e || !r || e.isDestroyed))
      try {
        const w = e.getHTML(), v = zv(w);
        if (v === d.current && w.length === u.current.length) {
          l((y) => ({ ...y, status: "saved" }));
          return;
        }
        if (w.length < 20)
          return;
        l((y) => ({ ...y, status: "saving" })), localStorage.setItem(n, w), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()), u.current = w, d.current = v, l((y) => ({
          ...y,
          status: "saved",
          lastSaved: /* @__PURE__ */ new Date(),
          error: null
        })), s?.(w), setTimeout(() => {
          l((y) => y.status === "saved" ? { ...y, status: "idle" } : y);
        }, 2e3);
      } catch (w) {
        console.error("useAutoSave: Error saving content", w), l((v) => ({
          ...v,
          status: "error",
          error: w instanceof Error ? w.message : "Failed to save"
        }));
      }
  }, [e, n, r, s]);
  G(() => {
    if (!e || !r || e.isDestroyed) return;
    const w = () => {
      e.isDestroyed || (c.current && clearTimeout(c.current), c.current = setTimeout(() => {
        f();
      }, o));
    };
    return e.on("update", w), () => {
      e.off("update", w), c.current && clearTimeout(c.current);
    };
  }, [e, o, r, f]), G(() => {
    if (!e || !r || e.isDestroyed) return;
    const w = () => {
      if (!e.isDestroyed)
        try {
          const v = e.getHTML();
          v.length >= 20 && (localStorage.setItem(n, v), localStorage.setItem(n + "-timestamp", (/* @__PURE__ */ new Date()).toISOString()));
        } catch (v) {
          console.warn("useAutoSave: Error saving on unload", v);
        }
    };
    return window.addEventListener("beforeunload", w), () => {
      window.removeEventListener("beforeunload", w);
    };
  }, [e, n, r]);
  const h = H(() => {
    c.current && clearTimeout(c.current), f();
  }, [f]), g = H(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Lo), u.current = "", l({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (w) {
      console.warn("useAutoSave: Error clearing content", w);
    }
  }, [n]), p = H(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const w = localStorage.getItem(n);
      return w && e && !e.isDestroyed ? (l((v) => ({ ...v, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(w), u.current = w, localStorage.removeItem(n + Lo), a?.(w);
          } catch (v) {
            console.warn("useAutoSave: Error setting content during recovery", v);
          }
      }), w) : null;
    } catch (w) {
      return console.warn("useAutoSave: Error recovering content", w), null;
    }
  }, [e, n, a]), b = H(() => {
    try {
      localStorage.setItem(n + Lo, "true"), l((w) => ({ ...w, hasRecoverableContent: !1 }));
    } catch (w) {
      console.warn("useAutoSave: Error dismissing recovery", w);
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
function Vo(e, t, n) {
  const { state: o } = e, { tr: r } = o;
  t !== n && r.delete(t, n);
  const s = r.doc.resolve(t), a = o.schema.nodes.horizontalRule.create(), i = s.before(s.depth), l = s.after(s.depth);
  r.replaceWith(i, l, a);
  const c = i + a.nodeSize;
  if (c < r.doc.content.size) {
    const u = r.doc.resolve(c);
    u.nodeAfter && u.nodeAfter.isTextblock ? r.setSelection(Ve.create(r.doc, c + 1)) : u.nodeAfter && r.setSelection(Ve.near(r.doc.resolve(c)));
  } else {
    const d = o.schema.nodes.paragraph.create();
    r.insert(c, d), r.setSelection(Ve.create(r.doc, c + 1));
  }
  r.scrollIntoView(), e.view.dispatch(r);
}
function nr(e) {
  return e.replace(/^[ \t]*\u200B[ \t]*$/gm, "").replace(/\u200B/g, "");
}
function Yv(e, {
  editor: t,
  turndownService: n,
  editorModeRef: o,
  handleModeSwitch: r,
  wordCount: s,
  autoSaveState: a,
  setIsFindReplaceOpen: i,
  setFindReplaceFocusTrigger: l
}) {
  Bd(e, () => ({
    getEditor: () => t,
    getHTML: () => t?.getHTML() || "",
    getMarkdown: () => t ? nr(n.turndown(t.getHTML())) : "",
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
      t && Vo(t, t.state.selection.from, t.state.selection.from);
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
          const f = u.attrs.level, h = u.textContent.trim();
          h && c.push({ id: `toc-heading-${d}`, text: h, level: f, pos: d });
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
              const h = f.getBoundingClientRect(), p = d.getBoundingClientRect().top - h.top + f.scrollTop;
              f.scrollTo({ top: p - 20, behavior: "smooth" });
            } else
              d.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          t.commands.setTextSelection(c + 1);
        } catch {
        }
    }
  }), [t, n, r, s, a, i]);
}
const jv = new Ce("tableCellMenu");
function Vv(e) {
  return new xe({
    key: jv,
    props: {
      handleDOMEvents: {
        contextmenu(t, n) {
          const r = n.target.closest("td, th");
          if (r && r.closest(".ProseMirror")) {
            n.preventDefault();
            const s = t.posAtDOM(r, 0);
            return e.chain().focus().setTextSelection(s).run(), Kv(n, e, s), !0;
          }
          return !1;
        }
      }
    }
  });
}
function Kv(e, t, n) {
  const o = document.querySelector(".table-cell-menu-dropdown");
  o && o.remove();
  const r = document.createElement("div");
  r.className = "table-cell-menu-dropdown";
  const s = 170, a = 280;
  let i = e.clientY, l = e.clientX;
  l + s > window.innerWidth - 12 && (l = window.innerWidth - s - 12), l < 12 && (l = 12), i + a > window.innerHeight - 12 && (i = e.clientY - a), i < 12 && (i = 12);
  const c = document.documentElement.classList.contains("dark"), u = c ? "#1f1f1f" : "#ffffff", d = c ? "#3a3a3a" : "#e5e5e5", f = c ? "#e5e5e5" : "#333333";
  r.style.cssText = "position:fixed;top:" + i + "px;left:" + l + "px;z-index:99999;display:flex;flex-direction:column;gap:2px;min-width:170px;max-width:220px;width:auto;padding:6px;background:" + u + ";border:1px solid " + d + ";border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15),0 2px 6px rgba(0,0,0,0.1);color:" + f + ";font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;pointer-events:auto;";
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
    { label: "Copy Table", icon: "copy", action: () => Gv(t) }
  ], b = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, w = c ? "#2a2a2a" : "#f5f5f5", v = c ? "#ff6b6b" : "#dc2626", y = c ? "#999999" : "#666666", E = c ? "#333333" : "#e5e5e5";
  p.forEach((S) => {
    if (S.label === "divider") {
      const k = document.createElement("div");
      k.style.cssText = "height:1px;background:" + E + ";margin:4px 0;", r.appendChild(k);
    } else {
      const k = document.createElement("button");
      k.type = "button";
      const D = S.destructive ? v : f;
      k.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + D + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const C = b[S.icon || ""] || "", M = S.destructive ? v : y;
      k.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + M + ';">' + C + '</span><span style="flex:1;white-space:nowrap;">' + S.label + "</span>", k.addEventListener("mouseenter", () => {
        k.style.background = S.destructive ? c ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : w;
      }), k.addEventListener("mouseleave", () => {
        k.style.background = "transparent";
      }), k.addEventListener("click", (P) => {
        P.preventDefault(), P.stopPropagation(), S.action && S.action(), r.remove();
      }), r.appendChild(k);
    }
  }), document.body.appendChild(r);
  const N = (S) => {
    const k = S.target;
    r.contains(k) || (r.remove(), document.removeEventListener("mousedown", N), document.removeEventListener("keydown", x));
  }, x = (S) => {
    S.key === "Escape" && (r.remove(), document.removeEventListener("mousedown", N), document.removeEventListener("keydown", x));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", N), document.addEventListener("keydown", x);
  }, 0);
}
function Gv(e) {
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
const qv = jm.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      Vv(this.editor)
    ];
  }
}), Xv = Vm.extend({}), Hn = new Ce("tableSorting");
let Ht = null, $n = null;
function Zv(e) {
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
function Qv(e, t, n) {
  let o = 0;
  return e.type === "number" && t.type === "number" ? o = e.value - t.value : e.type === "date" && t.type === "date" ? o = e.value.getTime() - t.value.getTime() : o = String(e.value).localeCompare(String(t.value)), n === "asc" ? o : -o;
}
function Jv(e, t, n) {
  const { state: o, view: r } = e;
  let s = null;
  if (o.doc.nodesBetween(t, t + 1, (g, p) => {
    if (g.type.name === "table" && p === t)
      return s = g, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const a = Ht?.tablePos === t && Ht?.columnIndex === n && Ht?.direction === "asc" ? "desc" : "asc";
  Ht = { tablePos: t, columnIndex: n, direction: a }, $n = null;
  const i = [];
  s.forEach((g) => {
    if (g.type.name === "tableRow") {
      let p = !1;
      g.forEach((b) => {
        b.type.name === "tableHeader" && (p = !0);
      }), i.push({ node: g, isHeader: p });
    }
  });
  const l = i.filter((g) => g.isHeader), c = i.filter((g) => !g.isHeader);
  if (c.length < 2) {
    Ma(n, a), r.dispatch(o.tr.setMeta(Hn, { updated: !0 }));
    return;
  }
  const u = c.map((g) => {
    let p = "", b = 0;
    return g.node.forEach((w) => {
      b === n && (p = w.textContent || ""), b++;
    }), { ...g, sortValue: Zv(p) };
  }), d = u.map((g, p) => p);
  u.sort((g, p) => Qv(g.sortValue, p.sortValue, a));
  const f = u.map((g, p) => c.indexOf(g));
  if (d.some((g, p) => g !== f[p])) {
    const g = [];
    l.forEach((w) => g.push(w.node)), u.forEach((w) => g.push(w.node));
    const p = s.type.create(s.attrs, g), { tr: b } = o;
    b.replaceWith(t, t + s.nodeSize, p), b.setMeta(Hn, { updated: !0 }), r.dispatch(b);
  } else
    r.dispatch(o.tr.setMeta(Hn, { updated: !0 }));
  Ma(n, a);
}
function Ma(e, t) {
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
function ew(e, t, n, o) {
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
    u.preventDefault(), u.stopPropagation(), Jv(o, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), r.appendChild(s), r;
}
function tw(e) {
  return new xe({
    key: Hn,
    state: {
      init() {
        return je.empty;
      },
      apply(t, n, o, r) {
        const s = t.getMeta(Hn);
        return !t.docChanged && !s?.updated && $n ? $n.map(t.mapping, t.doc) : ($n = nw(r.doc, e), $n);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function nw(e, t) {
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
              let h = f + 1;
              u.forEach((y, E) => {
                y.type.name === "paragraph" && (h = f + 1 + E + y.nodeSize - 1);
              });
              const p = Ht?.tablePos === s && Ht?.columnIndex === l ? Ht.direction : null, b = l, w = s, v = Ze.widget(h, () => ew(p, w, b, t), { side: 1, key: "sort-" + s + "-" + b });
              n.push(v);
            }
            c += u.nodeSize, l++;
          });
        }
      });
    }
  }), je.create(e, n);
}
const ow = ze.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [tw(this.editor)];
  }
});
function xi(e, t, n, o, r, s = {}) {
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
const rw = Km.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, state: t, tr: n, dispatch: o }) => {
        const { selection: r } = t, { $from: s } = r, a = t.schema.nodes.bulletList, i = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, c = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let h = s.depth; h > 0; h--) {
          const g = s.node(h);
          if (g.type === a || g.type === i || g.type === l) {
            d = g.type, f = s.before(h);
            break;
          }
        }
        if (d === a)
          return e.liftListItem("listItem");
        if (d === i || d === l) {
          if (!o) return !0;
          if (xi(n, f, a, c, u, {}))
            return o(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), sw = Gm.extend({
  content: "(listItem | taskItem)+",
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, state: t, tr: n, dispatch: o }) => {
        const { selection: r } = t, { $from: s } = r, a = t.schema.nodes.bulletList, i = t.schema.nodes.taskList, l = t.schema.nodes.orderedList, c = t.schema.nodes.listItem, u = t.schema.nodes.taskItem;
        let d = null, f = -1;
        for (let h = s.depth; h > 0; h--) {
          const g = s.node(h);
          if (g.type === a || g.type === i || g.type === l) {
            d = g.type, f = s.before(h);
            break;
          }
        }
        if (d === l)
          return e.liftListItem("listItem");
        if (d === i || d === a) {
          if (!o) return !0;
          if (xi(n, f, l, c, u, {}))
            return o(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), iw = Xm.extend({
  content: "(taskItem | listItem)+",
  addCommands() {
    return {
      toggleTaskList: () => ({ editor: e, commands: t, state: n, tr: o, dispatch: r, chain: s, can: a }) => {
        const { selection: i } = n, { $from: l, $to: c } = i, u = l.blockRange(c);
        if (!u)
          return !1;
        const d = n.schema.nodes.taskList, f = n.schema.nodes.taskItem;
        let h = !1;
        for (let N = l.depth; N > 0; N--)
          if (l.node(N).type === d) {
            h = !0, l.before(N);
            break;
          }
        if (h)
          return t.liftListItem("taskItem");
        const g = n.schema.nodes.bulletList, p = n.schema.nodes.orderedList, b = n.schema.nodes.listItem;
        let w = null, v = -1;
        for (let N = l.depth; N > 0; N--) {
          const x = l.node(N);
          if (x.type === g || x.type === p) {
            w = x, v = l.before(N);
            break;
          }
        }
        if (w) {
          if (!r) return !0;
          const N = v, x = o.doc.nodeAt(N);
          if (!x) return !1;
          o.setNodeMarkup(N, d, x.attrs);
          const S = o.doc.nodeAt(N);
          if (!S) return !1;
          const k = [];
          S.forEach((D, C) => {
            D.type === b && k.push(N + 1 + C);
          });
          for (let D = k.length - 1; D >= 0; D--) {
            const C = k[D], M = o.doc.nodeAt(C);
            M && M.type === b && o.setNodeMarkup(C, f, { checked: !1 });
          }
          return r(o), !0;
        }
        if (!r) return !0;
        const y = Gi(u, d);
        if (y) {
          o.wrap(u, y);
          const { $from: N } = o.selection;
          let x = -1;
          for (let S = N.depth; S > 0; S--)
            if (N.node(S).type === d) {
              x = N.before(S);
              break;
            }
          if (x >= 0) {
            const S = o.doc.nodeAt(x);
            if (S) {
              const k = [];
              S.forEach((D, C) => {
                D.type === b && k.push(x + 1 + C);
              });
              for (let D = k.length - 1; D >= 0; D--) {
                const C = k[D], M = o.doc.nodeAt(C);
                M && M.type === b && o.setNodeMarkup(C, f, { checked: !1 });
              }
            }
          }
          return r(o), !0;
        }
        const E = Gi(u, g);
        if (E) {
          o.wrap(u, E);
          const { $from: N } = o.selection;
          let x = -1;
          for (let S = N.depth; S > 0; S--)
            if (N.node(S).type === g) {
              x = N.before(S);
              break;
            }
          return x >= 0 && xi(o, x, d, f, b, { checked: !1 }), r(o), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), aw = Zm.extend({
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
          const d = o.before(s), { tr: f } = n, h = n.schema.nodes.taskItem, g = n.schema.nodes.paragraph, p = h.create(
            { checked: !1 },
            g.create()
          );
          f.insert(d, p);
          const b = d + 1;
          return f.setSelection(Ve.create(f.doc, b)), f.scrollIntoView(), t.view.dispatch(f), !0;
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
      new xe({
        key: new Ce("taskItemInputRule"),
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
            const d = u[2] === "x", f = i.start() + (u.index || 0), h = o, g = a.tr;
            g.delete(f, h);
            const b = g.doc.resolve(f).blockRange();
            if (!b || !t || !e) return !1;
            const w = [
              { type: t, attrs: {} },
              { type: e, attrs: { checked: d } }
            ];
            if (g.wrap(b, w), f > 1) {
              const v = g.doc.resolve(f - 1).nodeBefore;
              v && v.type === t && Qm(g.doc, f - 1) && g.join(f - 1);
            }
            return n.dispatch(g), !0;
          }
        }
      })
    ];
  }
}), lw = qm.extend({
  content: "paragraph block*"
}), Da = new Ce("collapsibleList");
function Is(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function or(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((o) => {
    t.includes(o.type.name) && (n = !0);
  }), n;
}
function cw(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let o = -1, r = -1, s = t + 1;
  return e.forEach((a) => {
    n.includes(a.type.name) && (o === -1 && (o = s), r = s + a.nodeSize), s += a.nodeSize;
  }), o === -1 ? null : { start: o, end: r };
}
let fn = null;
function Aa(e, t) {
  const n = [];
  return e.descendants((o) => {
    t.includes(o.type.name) && n.push({
      hasNested: or(o),
      text: o.firstChild?.textContent.slice(0, 50) ?? ""
    });
  }), n;
}
function uw(e, t, n) {
  const o = Aa(e, n), r = Aa(t, n);
  if (o.length !== r.length) return !0;
  for (let s = 0; s < o.length; s++)
    if (o[s].hasNested !== r[s].hasNested || o[s].text !== r[s].text) return !0;
  return !1;
}
function Oo(e, t, n) {
  const o = [];
  return e.descendants((r, s) => {
    if (!n.listItemTypes.includes(r.type.name) || !or(r))
      return !0;
    const a = Is(r, s), i = t.collapsedItems.has(a);
    o.push(
      Ze.node(s, s + r.nodeSize, {
        class: `collapsible-list-item ${i ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": a
      })
    );
    const l = r.firstChild;
    if (l && l.type.name === "paragraph") {
      const c = s + 1 + l.nodeSize - 1, u = Ze.widget(
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
          const h = document.createElement("span");
          h.className = "collapsible-list-chevron-wrapper", h.setAttribute("contenteditable", "false");
          const g = document.createElement("button");
          return g.className = `collapsible-list-chevron ${i ? "collapsed" : "expanded"}`, g.setAttribute("data-list-item-id", a), g.setAttribute("contenteditable", "false"), g.setAttribute("tabindex", "-1"), g.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', g.title = i ? "Click to expand" : "Click to collapse", g.addEventListener("click", (p) => {
            p.preventDefault(), p.stopPropagation();
            const b = g.classList.contains("collapsed");
            g.classList.remove("collapsed", "expanded"), g.classList.add(b ? "expanded" : "collapsed"), g.title = b ? "Click to collapse" : "Click to expand", t.collapsedItems.has(a) ? t.collapsedItems.delete(a) : t.collapsedItems.add(a), fn && fn.dispatch(
              fn.state.tr.setMeta("collapsibleList", { toggled: a })
            );
          }), h.appendChild(g), h;
        },
        { side: 1, key: `list-chevron-${a}` }
      );
      o.push(u);
    }
    if (i && cw(r, s)) {
      let u = s + 1;
      r.forEach((d) => {
        ["bulletList", "orderedList", "taskList"].includes(d.type.name) && o.push(
          Ze.node(u, u + d.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), u += d.nodeSize;
      });
    }
    return !0;
  }), je.create(e, o);
}
const dw = ze.create({
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
        if (!r || !this.options.listItemTypes.includes(r.type.name) || !or(r))
          return !1;
        const s = Is(r, e);
        return o.collapsedItems.has(s) ? o.collapsedItems.delete(s) : o.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((r, s) => {
          this.options.listItemTypes.includes(r.type.name) && or(r) && n.collapsedItems.add(Is(r, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new xe({
        key: Da,
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
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: Oo(o.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, o, r, s) {
            return n.getMeta("collapsibleList") ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: Oo(s.doc, e, t),
              docVersion: o.docVersion + 1
            } : n.docChanged ? uw(r.doc, s.doc, t.listItemTypes) ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: Oo(s.doc, e, t),
              docVersion: o.docVersion + 1
            } : {
              ...o,
              decorations: o.decorations.map(n.mapping, n.doc)
            } : {
              ...o,
              decorations: o.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const o = Da.getState(n);
            return o?.decorations ? o.decorations : Oo(n.doc, e, t);
          }
        }
      })
    ];
  }
});
function vt({
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
  return _m(
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
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DialogSafePortal.tsx",
        lineNumber: 65,
        columnNumber: 5
      },
      this
    ),
    document.body
  );
}
const _o = {
  info: { icon: Go, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: pl, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: hl, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: Ks, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: Gs, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" },
  summary: { icon: rm, label: "Summary", color: "var(--callout-summary)", borderColor: "var(--callout-summary-border)" }
};
function mw({ node: e, updateAttributes: t, editor: n }) {
  const [o, r] = U(!1), [s, a] = U(!1), [i, l] = U(null), c = V(null), u = V(null), d = e.attrs.type || "info", f = _o[d] || _o.info, h = f.icon, g = H(() => {
    if (u.current) {
      const v = u.current.getBoundingClientRect();
      l({
        top: v.bottom + 4,
        left: v.left
      });
    }
  }, []);
  G(() => {
    if (!o) return;
    const v = (y) => {
      c.current && !c.current.contains(y.target) && u.current && !u.current.contains(y.target) && r(!1);
    };
    return document.addEventListener("mousedown", v), document.addEventListener("touchstart", v, { passive: !0 }), () => {
      document.removeEventListener("mousedown", v), document.removeEventListener("touchstart", v);
    };
  }, [o]), G(() => {
    if (!o) return;
    const v = () => r(!1);
    return window.addEventListener("scroll", v, !0), () => window.removeEventListener("scroll", v, !0);
  }, [o]);
  const p = H(() => {
    n.isEditable && (o || g(), r(!o));
  }, [n.isEditable, o, g]), b = (v) => {
    t({ type: v }), r(!1);
  }, w = H((v) => {
    v.stopPropagation(), a((y) => !y);
  }, []);
  return /* @__PURE__ */ m(vn, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
    /* @__PURE__ */ m(
      "div",
      {
        className: "callout-header",
        onClick: w,
        style: { cursor: "pointer", userSelect: "none", WebkitUserSelect: "none" },
        title: s ? "Click to expand" : "Click to collapse",
        children: [
          /* @__PURE__ */ m(
            "button",
            {
              ref: u,
              className: "callout-header-button",
              onClick: (v) => {
                v.stopPropagation(), p();
              },
              title: n.isEditable ? "Click to change callout type" : f.label,
              style: { color: f.borderColor, userSelect: "none", WebkitUserSelect: "none" },
              children: [
                /* @__PURE__ */ m(h, { size: 18 }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 130,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ m("span", { className: "callout-label", children: f.label }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 131,
                  columnNumber: 11
                }, this),
                n.isEditable && /* @__PURE__ */ m(Dt, { size: 12, className: "callout-type-chevron" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                  lineNumber: 132,
                  columnNumber: 33
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
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
              children: s ? /* @__PURE__ */ m(gl, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 138,
                columnNumber: 24
              }, this) : /* @__PURE__ */ m(Dt, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 138,
                columnNumber: 53
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 134,
              columnNumber: 9
            },
            this
          ),
          o && n.isEditable && i && /* @__PURE__ */ m(vt, { children: /* @__PURE__ */ m(
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
              children: Object.keys(_o).map((v) => {
                const y = _o[v], E = y.icon;
                return /* @__PURE__ */ m(
                  "button",
                  {
                    className: `callout-type-option ${v === d ? "active" : ""}`,
                    onClick: (N) => {
                      N.stopPropagation(), b(v);
                    },
                    onMouseDown: (N) => N.stopPropagation(),
                    style: { "--callout-option-color": y.color },
                    children: [
                      /* @__PURE__ */ m(E, { size: 16, style: { color: y.borderColor } }, void 0, !1, {
                        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                        lineNumber: 167,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ m("span", { children: y.label }, void 0, !1, {
                        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                        lineNumber: 168,
                        columnNumber: 19
                      }, this)
                    ]
                  },
                  v,
                  !0,
                  {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
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
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
              lineNumber: 143,
              columnNumber: 11
            },
            this
          ) }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
            lineNumber: 142,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
        lineNumber: 114,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ m(Os, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 179,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
      lineNumber: 178,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
    lineNumber: 107,
    columnNumber: 5
  }, this);
}
const fw = fr.create({
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
    return lr(mw, {
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
}), hw = of.extend({
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
      new xe({
        key: new Ce("resizableImageCopy"),
        props: {
          handleDOMEvents: {
            copy(e, t) {
              const { state: n } = e;
              if (!(n.selection instanceof Dm)) return !1;
              const o = n.selection.node;
              if (o.type.name !== "resizableImage") return !1;
              const r = o.attrs.src;
              if (!r) return !1;
              t.preventDefault();
              const a = `![${o.attrs.alt || ""}](${r})`;
              return (async () => {
                try {
                  const l = await (await fetch(r)).blob();
                  await navigator.clipboard.write([
                    new ClipboardItem({
                      [l.type]: l,
                      "text/plain": new Blob([a], { type: "text/plain" })
                    })
                  ]);
                } catch {
                  try {
                    const i = new window.Image();
                    i.crossOrigin = "anonymous", await new Promise((u, d) => {
                      i.onload = () => u(), i.onerror = () => d(new Error("Image load failed")), i.src = r;
                    });
                    const l = document.createElement("canvas");
                    l.width = i.naturalWidth, l.height = i.naturalHeight;
                    const c = l.getContext("2d");
                    if (c) {
                      c.drawImage(i, 0, 0);
                      const u = await new Promise(
                        (d) => l.toBlob(d, "image/png")
                      );
                      if (u) {
                        await navigator.clipboard.write([
                          new ClipboardItem({
                            "image/png": u,
                            "text/plain": new Blob([a], { type: "text/plain" })
                          })
                        ]);
                        return;
                      }
                    }
                    await navigator.clipboard.writeText(a);
                  } catch {
                    try {
                      await navigator.clipboard.writeText(a);
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
    return ({ node: t, editor: n, getPos: o }) => {
      let r = t;
      const s = document.createElement("figure");
      s.classList.add("image-resizer");
      const a = (A) => {
        const O = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[A] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${O}`;
      };
      a(t.attrs.align || "left");
      const i = document.createElement("img");
      i.alt = t.attrs.alt || "", t.attrs.width && (i.style.width = `${t.attrs.width}px`);
      const l = (A) => !(!A || A.startsWith("data:") || A.startsWith("blob:") || A.startsWith("http://") || A.startsWith("https://")), c = (A) => {
        l(A) && e.resolveImageSrc ? (i.style.opacity = "0.5", i.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(A).then((O) => {
          i.src = O, i.style.opacity = "1";
        }).catch(() => {
          i.src = A, i.style.opacity = "1";
        })) : i.src = A;
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
      const h = (A, O, Y) => {
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
        `, j.innerHTML = `${O}<span>${A}</span>`, j.addEventListener("mouseenter", () => {
          j.style.background = "oklch(0.95 0 0)";
        }), j.addEventListener("mouseleave", () => {
          j.style.background = "transparent";
        }), j.addEventListener("click", (q) => {
          q.preventDefault(), q.stopPropagation(), Y(), f.style.display = "none", D = !1;
        }), j;
      }, g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', p = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', w = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(h("Edit", g, () => {
        const A = typeof o == "function" ? o() : null;
        if (A != null && e.onImageClick) {
          const O = i.getBoundingClientRect();
          e.onImageClick({
            src: r.attrs.src,
            alt: r.attrs.alt || "",
            pos: A,
            rect: O
          });
        }
      })), f.appendChild(h("Copy image", p, async () => {
        const A = r.attrs.src;
        try {
          const Y = await (await fetch(A)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [Y.type]: Y })
          ]);
        } catch {
          try {
            const O = new window.Image();
            O.crossOrigin = "anonymous", await new Promise((q, Z) => {
              O.onload = () => q(), O.onerror = () => Z(new Error("Image load failed")), O.src = A;
            });
            const Y = document.createElement("canvas");
            Y.width = O.naturalWidth, Y.height = O.naturalHeight;
            const j = Y.getContext("2d");
            if (j) {
              j.drawImage(O, 0, 0);
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
      })), f.appendChild(h("Copy URL", w, async () => {
        const A = r.attrs.src;
        try {
          await navigator.clipboard.writeText(A);
        } catch {
        }
      })), f.appendChild(h("Save image", b, () => {
        const A = r.attrs.src, O = r.attrs.alt || "image", Y = document.createElement("a");
        Y.href = A, Y.download = O, Y.target = "_blank", Y.rel = "noopener noreferrer", document.body.appendChild(Y), Y.click(), setTimeout(() => {
          document.body.removeChild(Y);
        }, 100);
      }));
      const v = document.createElement("div");
      v.style.cssText = `
        height: 1px;
        background: oklch(0.92 0 0);
        margin: 4px 8px;
      `, f.appendChild(v);
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
      const N = [
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
      ], x = [], S = (A) => {
        x.forEach((O) => {
          (O.getAttribute("data-align-value") || "left") === A ? (O.style.background = "oklch(1 0 0)", O.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", O.style.color = "oklch(0.25 0 0)", O.style.fontWeight = "600") : (O.style.background = "transparent", O.style.boxShadow = "none", O.style.color = "oklch(0.5 0 0)", O.style.fontWeight = "400");
        });
      };
      N.forEach(({ value: A, label: O, icon: Y }) => {
        const j = document.createElement("button");
        j.setAttribute("type", "button"), j.setAttribute("data-align-value", A), j.setAttribute("title", `Align ${O.toLowerCase()}`), j.style.cssText = `
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
        `, j.innerHTML = `${Y}<span>${O}</span>`, j.addEventListener("click", (q) => {
          q.preventDefault(), q.stopPropagation();
          const Z = typeof o == "function" ? o() : null;
          if (Z != null)
            try {
              const { state: B, dispatch: W } = n.view, F = B.doc.nodeAt(Z);
              if (F && F.type.name === "resizableImage") {
                const Q = B.tr.setNodeMarkup(Z, void 0, {
                  ...F.attrs,
                  align: A
                });
                W(Q);
              }
            } catch {
              n.chain().focus().setNodeSelection(Z).updateAttributes("resizableImage", {
                align: A
              }).run();
            }
          S(A);
        }), x.push(j), E.appendChild(j);
      }), f.appendChild(E);
      const k = () => {
        const A = r.attrs.align || "left";
        S(A);
      };
      let D = !1;
      d.addEventListener("click", (A) => {
        if (A.preventDefault(), A.stopPropagation(), D)
          f.style.display = "none", D = !1;
        else {
          const O = d.getBoundingClientRect(), Y = 200, j = f.closest('[role="dialog"]');
          let q = 0, Z = 0;
          if (j) {
            const de = j.getBoundingClientRect();
            q = de.left, Z = de.top;
          }
          let B = O.bottom + 4 - Z, W = O.right - Y - q;
          const F = window.innerHeight, Q = window.innerWidth, ce = 200;
          O.bottom + 4 + ce > F && (B = O.top - ce - 4 - Z), W + q < 8 && (W = 8 - q), W + Y + q > Q - 8 && (W = Q - Y - 8 - q), f.style.top = `${B}px`, f.style.left = `${W}px`, f.style.display = "flex", D = !0, k();
        }
      });
      const C = (A) => {
        !f.contains(A.target) && !d.contains(A.target) && (f.style.display = "none", D = !1);
      };
      document.addEventListener("click", C);
      const M = document.createElement("button");
      M.setAttribute("type", "button"), M.setAttribute("title", "View full size"), M.style.cssText = `
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
      `, M.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      `, M.addEventListener("mouseenter", () => {
        M.style.background = "oklch(0.95 0 0)";
      }), M.addEventListener("mouseleave", () => {
        M.style.background = "oklch(0.98 0 0 / 0.95)";
      }), s.appendChild(i), s.appendChild(M), s.appendChild(u), s.appendChild(d);
      const P = s.closest('[role="dialog"]');
      P ? P.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        u.style.opacity = "1", d.style.opacity = "1", M.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        u.style.opacity = "0", M.style.opacity = "0", D || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const R = (A) => {
        A.preventDefault(), A.stopPropagation();
        const O = document.createElement("div");
        O.style.cssText = `
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
        Y.src = i.src, Y.alt = i.alt || "", Y.style.cssText = `
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
        const q = r.attrs.alt;
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
        const B = () => {
          O.style.opacity = "0", Y.style.transform = "scale(0.92)", setTimeout(() => O.remove(), 200);
        };
        O.addEventListener("click", (Q) => {
          Q.target === O && B();
        }), j.addEventListener("click", B);
        const W = (Q) => {
          Q.key === "Escape" && (B(), document.removeEventListener("keydown", W));
        };
        document.addEventListener("keydown", W), O.appendChild(Y), O.appendChild(j), Z && O.appendChild(Z);
        const F = s.closest('[role="dialog"]');
        F ? F.appendChild(O) : document.body.appendChild(O), requestAnimationFrame(() => {
          O.style.opacity = "1", Y.style.transform = "scale(1)";
        });
      };
      M.addEventListener("click", R);
      let L, $;
      const _ = (A) => {
        A.preventDefault(), L = A.clientX, $ = i.offsetWidth, document.addEventListener("mousemove", K), document.addEventListener("mouseup", I);
      }, K = (A) => {
        const O = A.clientX - L, Y = Math.max(100, $ + O);
        i.style.width = `${Y}px`;
      }, I = () => {
        document.removeEventListener("mousemove", K), document.removeEventListener("mouseup", I), setTimeout(() => {
        }, 100);
        const A = typeof o == "function" ? o() : null, O = i.offsetWidth;
        if (A != null)
          try {
            const { state: Y, dispatch: j } = n.view, q = Y.doc.nodeAt(A);
            if (q && q.type.name === "resizableImage") {
              const Z = Y.tr.setNodeMarkup(A, void 0, {
                ...q.attrs,
                width: O
              });
              j(Z);
            }
          } catch {
            n.chain().focus().setNodeSelection(A).updateAttributes("resizableImage", {
              width: O
            }).run();
          }
      };
      return u.addEventListener("mousedown", _), {
        dom: s,
        update: (A) => A.type.name !== "resizableImage" ? !1 : (r = A, c(A.attrs.src), i.alt = A.attrs.alt || "", A.attrs.width && (i.style.width = `${A.attrs.width}px`), a(A.attrs.align || "left"), !0),
        destroy: () => {
          u.removeEventListener("mousedown", _), M.removeEventListener("click", R), document.removeEventListener("click", C), f.remove();
        }
      };
    };
  }
});
function pw(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const gw = {}, Bn = {};
function Ft(e, t) {
  try {
    const o = (gw[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return o in Bn ? Bn[o] : Pa(o, o.split(":"));
  } catch {
    if (e in Bn) return Bn[e];
    const n = e?.match(bw);
    return n ? Pa(e, n.slice(1)) : NaN;
  }
}
const bw = /([+-]\d\d):?(\d\d)?/;
function Pa(e, t) {
  const n = +(t[0] || 0), o = +(t[1] || 0), r = +(t[2] || 0) / 60;
  return Bn[e] = n * 60 + o > 0 ? n * 60 + o + r : n * 60 - o - r;
}
class ot extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Ft(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), yu(this), Rs(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new ot(...n, t) : new ot(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new ot(+this, t);
  }
  getTimezoneOffset() {
    const t = -Ft(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Rs(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new ot(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ia = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Ia.test(e)) return;
  const t = e.replace(Ia, "$1UTC");
  ot.prototype[t] && (e.startsWith("get") ? ot.prototype[e] = function() {
    return this.internal[t]();
  } : (ot.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), vw(this), +this;
  }, ot.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Rs(this), +this;
  }));
});
function Rs(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Ft(e.timeZone, e) * 60));
}
function vw(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), yu(e);
}
function yu(e) {
  const t = Ft(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), o = /* @__PURE__ */ new Date(+e);
  o.setUTCHours(o.getUTCHours() - 1);
  const r = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+o)).getTimezoneOffset(), a = r - s, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const l = r - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const c = /* @__PURE__ */ new Date(+e);
  c.setUTCSeconds(0);
  const u = r > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, d = Math.round(-(Ft(e.timeZone, e) * 60)) % 60;
  (d || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + u));
  const f = Ft(e.timeZone, e), h = f > 0 ? Math.floor(f) : Math.ceil(f), p = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, b = h !== n, w = p - l;
  if (b && w) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + w);
    const v = Ft(e.timeZone, e), y = v > 0 ? Math.floor(v) : Math.ceil(v), E = h - y;
    E && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + E), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + E));
  }
}
class Ie extends ot {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Ie(...n, t) : new Ie(Date.now(), t);
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
    return `${t} GMT${n}${o}${r} (${pw(this.timeZone, this)})`;
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
    return new Ie(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ie(+new Date(t), this.timeZone);
  }
  //#endregion
}
const ku = 6048e5, ww = 864e5, Ra = Symbol.for("constructDateFrom");
function ke(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ra in e ? e[Ra](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function pe(e, t) {
  return ke(t || e, e);
}
function xu(e, t, n) {
  const o = pe(e, n?.in);
  return isNaN(t) ? ke(e, NaN) : (t && o.setDate(o.getDate() + t), o);
}
function Cu(e, t, n) {
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
let Nw = {};
function no() {
  return Nw;
}
function yn(e, t) {
  const n = no(), o = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = pe(e, t?.in), s = r.getDay(), a = (s < o ? 7 : 0) + s - o;
  return r.setDate(r.getDate() - a), r.setHours(0, 0, 0, 0), r;
}
function qn(e, t) {
  return yn(e, { ...t, weekStartsOn: 1 });
}
function Tu(e, t) {
  const n = pe(e, t?.in), o = n.getFullYear(), r = ke(n, 0);
  r.setFullYear(o + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = qn(r), a = ke(n, 0);
  a.setFullYear(o, 0, 4), a.setHours(0, 0, 0, 0);
  const i = qn(a);
  return n.getTime() >= s.getTime() ? o + 1 : n.getTime() >= i.getTime() ? o : o - 1;
}
function La(e) {
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
  const n = ke.bind(
    null,
    t.find((o) => typeof o == "object")
  );
  return t.map(n);
}
function Xn(e, t) {
  const n = pe(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Eu(e, t, n) {
  const [o, r] = Mn(
    n?.in,
    e,
    t
  ), s = Xn(o), a = Xn(r), i = +s - La(s), l = +a - La(a);
  return Math.round((i - l) / ww);
}
function yw(e, t) {
  const n = Tu(e, t), o = ke(e, 0);
  return o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0), qn(o);
}
function kw(e, t, n) {
  return xu(e, t * 7, n);
}
function xw(e, t, n) {
  return Cu(e, t * 12, n);
}
function Cw(e, t) {
  let n, o = t?.in;
  return e.forEach((r) => {
    !o && typeof r == "object" && (o = ke.bind(null, r));
    const s = pe(r, o);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), ke(o, n || NaN);
}
function Tw(e, t) {
  let n, o = t?.in;
  return e.forEach((r) => {
    !o && typeof r == "object" && (o = ke.bind(null, r));
    const s = pe(r, o);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), ke(o, n || NaN);
}
function Ew(e, t, n) {
  const [o, r] = Mn(
    n?.in,
    e,
    t
  );
  return +Xn(o) == +Xn(r);
}
function Su(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Sw(e) {
  return !(!Su(e) && typeof e != "number" || isNaN(+pe(e)));
}
function Mw(e, t, n) {
  const [o, r] = Mn(
    n?.in,
    e,
    t
  ), s = o.getFullYear() - r.getFullYear(), a = o.getMonth() - r.getMonth();
  return s * 12 + a;
}
function Dw(e, t) {
  const n = pe(e, t?.in), o = n.getMonth();
  return n.setFullYear(n.getFullYear(), o + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Mu(e, t) {
  const [n, o] = Mn(e, t.start, t.end);
  return { start: n, end: o };
}
function Aw(e, t) {
  const { start: n, end: o } = Mu(t?.in, e);
  let r = +n > +o;
  const s = r ? +n : +o, a = r ? o : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(ke(n, a)), a.setMonth(a.getMonth() + i);
  return r ? l.reverse() : l;
}
function Pw(e, t) {
  const n = pe(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Iw(e, t) {
  const n = pe(e, t?.in), o = n.getFullYear();
  return n.setFullYear(o + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Du(e, t) {
  const n = pe(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Rw(e, t) {
  const { start: n, end: o } = Mu(t?.in, e);
  let r = +n > +o;
  const s = r ? +n : +o, a = r ? o : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(ke(n, a)), a.setFullYear(a.getFullYear() + i);
  return r ? l.reverse() : l;
}
function Au(e, t) {
  const n = no(), o = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = pe(e, t?.in), s = r.getDay(), a = (s < o ? -7 : 0) + 6 - (s - o);
  return r.setDate(r.getDate() + a), r.setHours(23, 59, 59, 999), r;
}
function Lw(e, t) {
  return Au(e, { ...t, weekStartsOn: 1 });
}
const Ow = {
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
}, _w = (e, t, n) => {
  let o;
  const r = Ow[e];
  return typeof r == "string" ? o = r : t === 1 ? o = r.one : o = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + o : o + " ago" : o;
};
function is(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const $w = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Bw = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Ww = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Hw = {
  date: is({
    formats: $w,
    defaultWidth: "full"
  }),
  time: is({
    formats: Bw,
    defaultWidth: "full"
  }),
  dateTime: is({
    formats: Ww,
    defaultWidth: "full"
  })
}, Fw = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, zw = (e, t, n, o) => Fw[e];
function Ln(e) {
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
const Uw = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Yw = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, jw = {
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
}, Vw = {
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
}, Kw = {
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
}, Gw = {
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
}, qw = (e, t) => {
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
}, Xw = {
  ordinalNumber: qw,
  era: Ln({
    values: Uw,
    defaultWidth: "wide"
  }),
  quarter: Ln({
    values: Yw,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ln({
    values: jw,
    defaultWidth: "wide"
  }),
  day: Ln({
    values: Vw,
    defaultWidth: "wide"
  }),
  dayPeriod: Ln({
    values: Kw,
    defaultWidth: "wide",
    formattingValues: Gw,
    defaultFormattingWidth: "wide"
  })
};
function On(e) {
  return (t, n = {}) => {
    const o = n.width, r = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth], s = t.match(r);
    if (!s)
      return null;
    const a = s[0], i = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? Qw(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      Zw(i, (d) => d.test(a))
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
function Zw(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Qw(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Jw(e) {
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
const eN = /^(\d+)(th|st|nd|rd)?/i, tN = /\d+/i, nN = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, oN = {
  any: [/^b/i, /^(a|c)/i]
}, rN = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, sN = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, iN = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, aN = {
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
}, lN = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, cN = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, uN = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, dN = {
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
}, mN = {
  ordinalNumber: Jw({
    matchPattern: eN,
    parsePattern: tN,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: On({
    matchPatterns: nN,
    defaultMatchWidth: "wide",
    parsePatterns: oN,
    defaultParseWidth: "any"
  }),
  quarter: On({
    matchPatterns: rN,
    defaultMatchWidth: "wide",
    parsePatterns: sN,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: On({
    matchPatterns: iN,
    defaultMatchWidth: "wide",
    parsePatterns: aN,
    defaultParseWidth: "any"
  }),
  day: On({
    matchPatterns: lN,
    defaultMatchWidth: "wide",
    parsePatterns: cN,
    defaultParseWidth: "any"
  }),
  dayPeriod: On({
    matchPatterns: uN,
    defaultMatchWidth: "any",
    parsePatterns: dN,
    defaultParseWidth: "any"
  })
}, Ci = {
  code: "en-US",
  formatDistance: _w,
  formatLong: Hw,
  formatRelative: zw,
  localize: Xw,
  match: mN,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function fN(e, t) {
  const n = pe(e, t?.in);
  return Eu(n, Du(n)) + 1;
}
function Pu(e, t) {
  const n = pe(e, t?.in), o = +qn(n) - +yw(n);
  return Math.round(o / ku) + 1;
}
function Iu(e, t) {
  const n = pe(e, t?.in), o = n.getFullYear(), r = no(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = ke(t?.in || e, 0);
  a.setFullYear(o + 1, 0, s), a.setHours(0, 0, 0, 0);
  const i = yn(a, t), l = ke(t?.in || e, 0);
  l.setFullYear(o, 0, s), l.setHours(0, 0, 0, 0);
  const c = yn(l, t);
  return +n >= +i ? o + 1 : +n >= +c ? o : o - 1;
}
function hN(e, t) {
  const n = no(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, r = Iu(e, t), s = ke(t?.in || e, 0);
  return s.setFullYear(r, 0, o), s.setHours(0, 0, 0, 0), yn(s, t);
}
function Ru(e, t) {
  const n = pe(e, t?.in), o = +yn(n, t) - +hN(n, t);
  return Math.round(o / ku) + 1;
}
function fe(e, t) {
  const n = e < 0 ? "-" : "", o = Math.abs(e).toString().padStart(t, "0");
  return n + o;
}
const Tt = {
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
}, an = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Oa = {
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
    return Tt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, o) {
    const r = Iu(e, o), s = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const a = s % 100;
      return fe(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : fe(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Tu(e);
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
        return Tt.M(e, t);
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
    const r = Ru(e, o);
    return t === "wo" ? n.ordinalNumber(r, { unit: "week" }) : fe(r, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const o = Pu(e);
    return t === "Io" ? n.ordinalNumber(o, { unit: "week" }) : fe(o, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Tt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const o = fN(e);
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
    const r = e.getDay(), s = (r - o.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(s);
      // Padded numerical value
      case "ee":
        return fe(s, 2);
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
        return fe(s, t.length);
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
    switch (o === 12 ? r = an.noon : o === 0 ? r = an.midnight : r = o / 12 >= 1 ? "pm" : "am", t) {
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
    switch (o >= 17 ? r = an.evening : o >= 12 ? r = an.afternoon : o >= 4 ? r = an.morning : r = an.night, t) {
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
    return Tt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Tt.H(e, t);
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
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Tt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Tt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Tt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const o = e.getTimezoneOffset();
    if (o === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return $a(o);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Bt(o);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Bt(o, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const o = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return $a(o);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Bt(o);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Bt(o, ":");
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
        return "GMT" + _a(o, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Bt(o, ":");
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
        return "GMT" + _a(o, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Bt(o, ":");
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
function _a(e, t = "") {
  const n = e > 0 ? "-" : "+", o = Math.abs(e), r = Math.trunc(o / 60), s = o % 60;
  return s === 0 ? n + String(r) : n + String(r) + t + fe(s, 2);
}
function $a(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + fe(Math.abs(e) / 60, 2) : Bt(e, t);
}
function Bt(e, t = "") {
  const n = e > 0 ? "-" : "+", o = Math.abs(e), r = fe(Math.trunc(o / 60), 2), s = fe(o % 60, 2);
  return n + r + t + s;
}
const Ba = (e, t) => {
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
}, Lu = (e, t) => {
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
}, pN = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], o = n[1], r = n[2];
  if (!r)
    return Ba(e, t);
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
  return s.replace("{{date}}", Ba(o, t)).replace("{{time}}", Lu(r, t));
}, gN = {
  p: Lu,
  P: pN
}, bN = /^D+$/, vN = /^Y+$/, wN = ["D", "DD", "YY", "YYYY"];
function NN(e) {
  return bN.test(e);
}
function yN(e) {
  return vN.test(e);
}
function kN(e, t, n) {
  const o = xN(e, t, n);
  if (console.warn(o), wN.includes(e)) throw new RangeError(o);
}
function xN(e, t, n) {
  const o = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${o} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const CN = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, TN = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, EN = /^'([^]*?)'?$/, SN = /''/g, MN = /[a-zA-Z]/;
function DN(e, t, n) {
  const o = no(), r = n?.locale ?? o.locale ?? Ci, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? o.weekStartsOn ?? o.locale?.options?.weekStartsOn ?? 0, i = pe(e, n?.in);
  if (!Sw(i))
    throw new RangeError("Invalid time value");
  let l = t.match(TN).map((u) => {
    const d = u[0];
    if (d === "p" || d === "P") {
      const f = gN[d];
      return f(u, r.formatLong);
    }
    return u;
  }).join("").match(CN).map((u) => {
    if (u === "''")
      return { isToken: !1, value: "'" };
    const d = u[0];
    if (d === "'")
      return { isToken: !1, value: AN(u) };
    if (Oa[d])
      return { isToken: !0, value: u };
    if (d.match(MN))
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
    (!n?.useAdditionalWeekYearTokens && yN(d) || !n?.useAdditionalDayOfYearTokens && NN(d)) && kN(d, t, String(e));
    const f = Oa[d[0]];
    return f(i, d, r.localize, c);
  }).join("");
}
function AN(e) {
  const t = e.match(EN);
  return t ? t[1].replace(SN, "'") : e;
}
function PN(e, t) {
  const n = pe(e, t?.in), o = n.getFullYear(), r = n.getMonth(), s = ke(n, 0);
  return s.setFullYear(o, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function IN(e, t) {
  return pe(e, t?.in).getMonth();
}
function RN(e, t) {
  return pe(e, t?.in).getFullYear();
}
function LN(e, t) {
  return +pe(e) > +pe(t);
}
function ON(e, t) {
  return +pe(e) < +pe(t);
}
function _N(e, t, n) {
  const [o, r] = Mn(
    n?.in,
    e,
    t
  );
  return o.getFullYear() === r.getFullYear() && o.getMonth() === r.getMonth();
}
function $N(e, t, n) {
  const [o, r] = Mn(
    n?.in,
    e,
    t
  );
  return o.getFullYear() === r.getFullYear();
}
function BN(e, t, n) {
  const o = pe(e, n?.in), r = o.getFullYear(), s = o.getDate(), a = ke(e, 0);
  a.setFullYear(r, t, 15), a.setHours(0, 0, 0, 0);
  const i = PN(a);
  return o.setMonth(t, Math.min(s, i)), o;
}
function WN(e, t, n) {
  const o = pe(e, n?.in);
  return isNaN(+o) ? ke(e, NaN) : (o.setFullYear(t), o);
}
const Wa = 5, HN = 4;
function FN(e, t) {
  const n = t.startOfMonth(e), o = n.getDay() > 0 ? n.getDay() : 7, r = t.addDays(e, -o + 1), s = t.addDays(r, Wa * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Wa : HN;
}
function Ou(e, t) {
  const n = t.startOfMonth(e), o = n.getDay();
  return o === 1 ? n : o === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (o - 1));
}
function zN(e, t) {
  const n = Ou(e, t), o = FN(e, t);
  return t.addDays(n, o * 7 - 1);
}
class Fe {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ie.tz(this.options.timeZone) : new this.Date(), this.newDate = (o, r, s) => this.overrides?.newDate ? this.overrides.newDate(o, r, s) : this.options.timeZone ? new Ie(o, r, s, this.options.timeZone) : new Date(o, r, s), this.addDays = (o, r) => this.overrides?.addDays ? this.overrides.addDays(o, r) : xu(o, r), this.addMonths = (o, r) => this.overrides?.addMonths ? this.overrides.addMonths(o, r) : Cu(o, r), this.addWeeks = (o, r) => this.overrides?.addWeeks ? this.overrides.addWeeks(o, r) : kw(o, r), this.addYears = (o, r) => this.overrides?.addYears ? this.overrides.addYears(o, r) : xw(o, r), this.differenceInCalendarDays = (o, r) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(o, r) : Eu(o, r), this.differenceInCalendarMonths = (o, r) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(o, r) : Mw(o, r), this.eachMonthOfInterval = (o) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(o) : Aw(o), this.eachYearOfInterval = (o) => {
      const r = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(o) : Rw(o), s = new Set(r.map((i) => this.getYear(i)));
      if (s.size === r.length)
        return r;
      const a = [];
      return s.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (o) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(o) : zN(o, this), this.endOfISOWeek = (o) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(o) : Lw(o), this.endOfMonth = (o) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(o) : Dw(o), this.endOfWeek = (o, r) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(o, r) : Au(o, this.options), this.endOfYear = (o) => this.overrides?.endOfYear ? this.overrides.endOfYear(o) : Iw(o), this.format = (o, r, s) => {
      const a = this.overrides?.format ? this.overrides.format(o, r, this.options) : DN(o, r, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (o) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(o) : Pu(o), this.getMonth = (o, r) => this.overrides?.getMonth ? this.overrides.getMonth(o, this.options) : IN(o, this.options), this.getYear = (o, r) => this.overrides?.getYear ? this.overrides.getYear(o, this.options) : RN(o, this.options), this.getWeek = (o, r) => this.overrides?.getWeek ? this.overrides.getWeek(o, this.options) : Ru(o, this.options), this.isAfter = (o, r) => this.overrides?.isAfter ? this.overrides.isAfter(o, r) : LN(o, r), this.isBefore = (o, r) => this.overrides?.isBefore ? this.overrides.isBefore(o, r) : ON(o, r), this.isDate = (o) => this.overrides?.isDate ? this.overrides.isDate(o) : Su(o), this.isSameDay = (o, r) => this.overrides?.isSameDay ? this.overrides.isSameDay(o, r) : Ew(o, r), this.isSameMonth = (o, r) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(o, r) : _N(o, r), this.isSameYear = (o, r) => this.overrides?.isSameYear ? this.overrides.isSameYear(o, r) : $N(o, r), this.max = (o) => this.overrides?.max ? this.overrides.max(o) : Cw(o), this.min = (o) => this.overrides?.min ? this.overrides.min(o) : Tw(o), this.setMonth = (o, r) => this.overrides?.setMonth ? this.overrides.setMonth(o, r) : BN(o, r), this.setYear = (o, r) => this.overrides?.setYear ? this.overrides.setYear(o, r) : WN(o, r), this.startOfBroadcastWeek = (o, r) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(o, this) : Ou(o, this), this.startOfDay = (o) => this.overrides?.startOfDay ? this.overrides.startOfDay(o) : Xn(o), this.startOfISOWeek = (o) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(o) : qn(o), this.startOfMonth = (o) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(o) : Pw(o), this.startOfWeek = (o, r) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(o, this.options) : yn(o, this.options), this.startOfYear = (o) => this.overrides?.startOfYear ? this.overrides.startOfYear(o) : Du(o), this.options = { locale: Ci, ...t }, this.overrides = n;
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
    return t && Fe.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: o, numerals: r } = this.options, s = n?.code;
    if (s && Fe.yearFirstLocales.has(s))
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
const at = new Fe();
class _u {
  constructor(t, n, o = at) {
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
class UN {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class YN {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function jN(e) {
  return X.createElement("button", { ...e });
}
function VN(e) {
  return X.createElement("span", { ...e });
}
function KN(e) {
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
function GN(e) {
  const { day: t, modifiers: n, ...o } = e;
  return X.createElement("td", { ...o });
}
function qN(e) {
  const { day: t, modifiers: n, ...o } = e, r = X.useRef(null);
  return X.useEffect(() => {
    n.focused && r.current?.focus();
  }, [n.focused]), X.createElement("button", { ref: r, ...o });
}
var te;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(te || (te = {}));
var be;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(be || (be = {}));
var Xe;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Xe || (Xe = {}));
var Be;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Be || (Be = {}));
function XN(e) {
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
function ZN(e) {
  return X.createElement("div", { ...e });
}
function QN(e) {
  return X.createElement("div", { ...e });
}
function JN(e) {
  const { calendarMonth: t, displayIndex: n, ...o } = e;
  return X.createElement("div", { ...o }, e.children);
}
function ey(e) {
  const { calendarMonth: t, displayIndex: n, ...o } = e;
  return X.createElement("div", { ...o });
}
function ty(e) {
  return X.createElement("table", { ...e });
}
function ny(e) {
  return X.createElement("div", { ...e });
}
const $u = ll(void 0);
function oo() {
  const e = cl($u);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function oy(e) {
  const { components: t } = oo();
  return X.createElement(t.Dropdown, { ...e });
}
function ry(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: o, nextMonth: r, ...s } = e, { components: a, classNames: i, labels: { labelPrevious: l, labelNext: c } } = oo(), u = H((f) => {
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
function sy(e) {
  const { components: t } = oo();
  return X.createElement(t.Button, { ...e });
}
function iy(e) {
  return X.createElement("option", { ...e });
}
function ay(e) {
  const { components: t } = oo();
  return X.createElement(t.Button, { ...e });
}
function ly(e) {
  const { rootRef: t, ...n } = e;
  return X.createElement("div", { ...n, ref: t });
}
function cy(e) {
  return X.createElement("select", { ...e });
}
function uy(e) {
  const { week: t, ...n } = e;
  return X.createElement("tr", { ...n });
}
function dy(e) {
  return X.createElement("th", { ...e });
}
function my(e) {
  return X.createElement(
    "thead",
    { "aria-hidden": !0 },
    X.createElement("tr", { ...e })
  );
}
function fy(e) {
  const { week: t, ...n } = e;
  return X.createElement("th", { ...n });
}
function hy(e) {
  return X.createElement("th", { ...e });
}
function py(e) {
  return X.createElement("tbody", { ...e });
}
function gy(e) {
  const { components: t } = oo();
  return X.createElement(t.Dropdown, { ...e });
}
const by = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: jN,
  CaptionLabel: VN,
  Chevron: KN,
  Day: GN,
  DayButton: qN,
  Dropdown: XN,
  DropdownNav: ZN,
  Footer: QN,
  Month: JN,
  MonthCaption: ey,
  MonthGrid: ty,
  Months: ny,
  MonthsDropdown: oy,
  Nav: ry,
  NextMonthButton: sy,
  Option: iy,
  PreviousMonthButton: ay,
  Root: ly,
  Select: cy,
  Week: uy,
  WeekNumber: fy,
  WeekNumberHeader: hy,
  Weekday: dy,
  Weekdays: my,
  Weeks: py,
  YearsDropdown: gy
}, Symbol.toStringTag, { value: "Module" }));
function dt(e, t, n = !1, o = at) {
  let { from: r, to: s } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = o;
  return r && s ? (a(s, r) < 0 && ([r, s] = [s, r]), a(t, r) >= (n ? 1 : 0) && a(s, t) >= (n ? 1 : 0)) : !n && s ? i(s, t) : !n && r ? i(r, t) : !1;
}
function Bu(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ti(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Wu(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Hu(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Fu(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function zu(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function mt(e, t, n = at) {
  const o = Array.isArray(t) ? t : [t], { isSameDay: r, differenceInCalendarDays: s, isAfter: a } = n;
  return o.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return r(e, i);
    if (zu(i, n))
      return i.includes(e);
    if (Ti(i))
      return dt(i, e, !1, n);
    if (Fu(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Bu(i)) {
      const l = s(i.before, e), c = s(i.after, e), u = l > 0, d = c < 0;
      return a(i.before, i.after) ? d && u : u || d;
    }
    return Wu(i) ? s(e, i.after) > 0 : Hu(i) ? s(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function vy(e, t, n, o, r) {
  const { disabled: s, hidden: a, modifiers: i, showOutsideDays: l, broadcastCalendar: c, today: u } = t, { isSameDay: d, isSameMonth: f, startOfMonth: h, isBefore: g, endOfMonth: p, isAfter: b } = r, w = n && h(n), v = o && p(o), y = {
    [be.focused]: [],
    [be.outside]: [],
    [be.disabled]: [],
    [be.hidden]: [],
    [be.today]: []
  }, E = {};
  for (const N of e) {
    const { date: x, displayMonth: S } = N, k = !!(S && !f(x, S)), D = !!(w && g(x, w)), C = !!(v && b(x, v)), M = !!(s && mt(x, s, r)), P = !!(a && mt(x, a, r)) || D || C || // Broadcast calendar will show outside days as default
    !c && !l && k || c && l === !1 && k, R = d(x, u ?? r.today());
    k && y.outside.push(N), M && y.disabled.push(N), P && y.hidden.push(N), R && y.today.push(N), i && Object.keys(i).forEach((L) => {
      const $ = i?.[L];
      $ && mt(x, $, r) && (E[L] ? E[L].push(N) : E[L] = [N]);
    });
  }
  return (N) => {
    const x = {
      [be.focused]: !1,
      [be.disabled]: !1,
      [be.hidden]: !1,
      [be.outside]: !1,
      [be.today]: !1
    }, S = {};
    for (const k in y) {
      const D = y[k];
      x[k] = D.some((C) => C === N);
    }
    for (const k in E)
      S[k] = E[k].some((D) => D === N);
    return {
      ...x,
      // custom modifiers should override all the previous ones
      ...S
    };
  };
}
function wy(e, t, n = {}) {
  return Object.entries(e).filter(([, r]) => r === !0).reduce((r, [s]) => (n[s] ? r.push(n[s]) : t[be[s]] ? r.push(t[be[s]]) : t[Xe[s]] && r.push(t[Xe[s]]), r), [t[te.Day]]);
}
function Ny(e) {
  return {
    ...by,
    ...e
  };
}
function yy(e) {
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
function Ei() {
  const e = {};
  for (const t in te)
    e[te[t]] = `rdp-${te[t]}`;
  for (const t in be)
    e[be[t]] = `rdp-${be[t]}`;
  for (const t in Xe)
    e[Xe[t]] = `rdp-${Xe[t]}`;
  for (const t in Be)
    e[Be[t]] = `rdp-${Be[t]}`;
  return e;
}
function Uu(e, t, n) {
  return (n ?? new Fe(t)).formatMonthYear(e);
}
const ky = Uu;
function xy(e, t, n) {
  return (n ?? new Fe(t)).format(e, "d");
}
function Cy(e, t = at) {
  return t.format(e, "LLLL");
}
function Ty(e, t, n) {
  return (n ?? new Fe(t)).format(e, "cccccc");
}
function Ey(e, t = at) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Sy() {
  return "";
}
function Yu(e, t = at) {
  return t.format(e, "yyyy");
}
const My = Yu, Dy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Uu,
  formatDay: xy,
  formatMonthCaption: ky,
  formatMonthDropdown: Cy,
  formatWeekNumber: Ey,
  formatWeekNumberHeader: Sy,
  formatWeekdayName: Ty,
  formatYearCaption: My,
  formatYearDropdown: Yu
}, Symbol.toStringTag, { value: "Module" }));
function Ay(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Dy,
    ...e
  };
}
function Py(e, t, n, o, r) {
  const { startOfMonth: s, startOfYear: a, endOfYear: i, eachMonthOfInterval: l, getMonth: c } = r;
  return l({
    start: a(e),
    end: i(e)
  }).map((f) => {
    const h = o.formatMonthDropdown(f, r), g = c(f), p = t && f < s(t) || n && f > s(n) || !1;
    return { value: g, label: h, disabled: p };
  });
}
function Iy(e, t = {}, n = {}) {
  let o = { ...t?.[te.Day] };
  return Object.entries(e).filter(([, r]) => r === !0).forEach(([r]) => {
    o = {
      ...o,
      ...n?.[r]
    };
  }), o;
}
function Ry(e, t, n) {
  const o = e.today(), r = t ? e.startOfISOWeek(o) : e.startOfWeek(o), s = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(r, a);
    s.push(i);
  }
  return s;
}
function Ly(e, t, n, o, r = !1) {
  if (!e || !t)
    return;
  const { startOfYear: s, endOfYear: a, eachYearOfInterval: i, getYear: l } = o, c = s(e), u = a(t), d = i({ start: c, end: u });
  return r && d.reverse(), d.map((f) => {
    const h = n.formatYearDropdown(f, o);
    return {
      value: l(f),
      label: h,
      disabled: !1
    };
  });
}
function ju(e, t, n, o) {
  let r = (o ?? new Fe(n)).format(e, "PPPP");
  return t.today && (r = `Today, ${r}`), t.selected && (r = `${r}, selected`), r;
}
const Oy = ju;
function Vu(e, t, n) {
  return (n ?? new Fe(t)).formatMonthYear(e);
}
const _y = Vu;
function $y(e, t, n, o) {
  let r = (o ?? new Fe(n)).format(e, "PPPP");
  return t?.today && (r = `Today, ${r}`), r;
}
function By(e) {
  return "Choose the Month";
}
function Wy() {
  return "";
}
function Hy(e) {
  return "Go to the Next Month";
}
function Fy(e) {
  return "Go to the Previous Month";
}
function zy(e, t, n) {
  return (n ?? new Fe(t)).format(e, "cccc");
}
function Uy(e, t) {
  return `Week ${e}`;
}
function Yy(e) {
  return "Week Number";
}
function jy(e) {
  return "Choose the Year";
}
const Vy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: _y,
  labelDay: Oy,
  labelDayButton: ju,
  labelGrid: Vu,
  labelGridcell: $y,
  labelMonthDropdown: By,
  labelNav: Wy,
  labelNext: Hy,
  labelPrevious: Fy,
  labelWeekNumber: Uy,
  labelWeekNumberHeader: Yy,
  labelWeekday: zy,
  labelYearDropdown: jy
}, Symbol.toStringTag, { value: "Module" })), ro = (e) => e instanceof HTMLElement ? e : null, as = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Ky = (e) => ro(e.querySelector("[data-animated-month]")), ls = (e) => ro(e.querySelector("[data-animated-caption]")), cs = (e) => ro(e.querySelector("[data-animated-weeks]")), Gy = (e) => ro(e.querySelector("[data-animated-nav]")), qy = (e) => ro(e.querySelector("[data-animated-weekdays]"));
function Xy(e, t, { classNames: n, months: o, focused: r, dateLib: s }) {
  const a = V(null), i = V(o), l = V(!1);
  cr(() => {
    const c = i.current;
    if (i.current = o, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    o.length === 0 || c.length === 0 || o.length !== c.length)
      return;
    const u = s.isSameMonth(o[0].date, c[0].date), d = s.isAfter(o[0].date, c[0].date), f = d ? n[Be.caption_after_enter] : n[Be.caption_before_enter], h = d ? n[Be.weeks_after_enter] : n[Be.weeks_before_enter], g = a.current, p = e.current.cloneNode(!0);
    if (p instanceof HTMLElement ? (as(p).forEach((y) => {
      if (!(y instanceof HTMLElement))
        return;
      const E = Ky(y);
      E && y.contains(E) && y.removeChild(E);
      const N = ls(y);
      N && N.classList.remove(f);
      const x = cs(y);
      x && x.classList.remove(h);
    }), a.current = p) : a.current = null, l.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    r)
      return;
    const b = g instanceof HTMLElement ? as(g) : [], w = as(e.current);
    if (w?.every((v) => v instanceof HTMLElement) && b && b.every((v) => v instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const v = Gy(e.current);
      v && (v.style.zIndex = "1"), w.forEach((y, E) => {
        const N = b[E];
        if (!N)
          return;
        y.style.position = "relative", y.style.overflow = "hidden";
        const x = ls(y);
        x && x.classList.add(f);
        const S = cs(y);
        S && S.classList.add(h);
        const k = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), x && x.classList.remove(f), S && S.classList.remove(h), y.style.position = "", y.style.overflow = "", y.contains(N) && y.removeChild(N);
        };
        N.style.pointerEvents = "none", N.style.position = "absolute", N.style.overflow = "hidden", N.setAttribute("aria-hidden", "true");
        const D = qy(N);
        D && (D.style.opacity = "0");
        const C = ls(N);
        C && (C.classList.add(d ? n[Be.caption_before_exit] : n[Be.caption_after_exit]), C.addEventListener("animationend", k));
        const M = cs(N);
        M && M.classList.add(d ? n[Be.weeks_before_exit] : n[Be.weeks_after_exit]), y.insertBefore(N, y.firstChild);
      });
    }
  });
}
function Zy(e, t, n, o) {
  const r = e[0], s = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: c, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: h, endOfMonth: g, endOfWeek: p, isAfter: b, startOfBroadcastWeek: w, startOfISOWeek: v, startOfWeek: y } = o, E = l ? w(r, o) : a ? v(r) : y(r), N = l ? f(s) : a ? h(g(s)) : p(g(s)), x = u(N, E), S = d(s, r) + 1, k = [];
  for (let M = 0; M <= x; M++) {
    const P = c(E, M);
    if (t && b(P, t))
      break;
    k.push(P);
  }
  const C = (l ? 35 : 42) * S;
  if (i && k.length < C) {
    const M = C - k.length;
    for (let P = 0; P < M; P++) {
      const R = c(k[k.length - 1], 1);
      k.push(R);
    }
  }
  return k;
}
function Qy(e) {
  const t = [];
  return e.reduce((n, o) => {
    const r = o.weeks.reduce((s, a) => s.concat(a.days.slice()), t.slice());
    return n.concat(r.slice());
  }, t.slice());
}
function Jy(e, t, n, o) {
  const { numberOfMonths: r = 1 } = n, s = [];
  for (let a = 0; a < r; a++) {
    const i = o.addMonths(e, a);
    if (t && i > t)
      break;
    s.push(i);
  }
  return s;
}
function Ha(e, t, n, o) {
  const { month: r, defaultMonth: s, today: a = o.today(), numberOfMonths: i = 1 } = e;
  let l = r || s || a;
  const { differenceInCalendarMonths: c, addMonths: u, startOfMonth: d } = o;
  if (n && c(n, l) < i - 1) {
    const f = -1 * (i - 1);
    l = u(n, f);
  }
  return t && c(l, t) < 0 && (l = t), d(l);
}
function e0(e, t, n, o) {
  const { addDays: r, endOfBroadcastWeek: s, endOfISOWeek: a, endOfMonth: i, endOfWeek: l, getISOWeek: c, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: h } = o, g = e.reduce((p, b) => {
    const w = n.broadcastCalendar ? d(b, o) : n.ISOWeek ? f(b) : h(b), v = n.broadcastCalendar ? s(b) : n.ISOWeek ? a(i(b)) : l(i(b)), y = t.filter((S) => S >= w && S <= v), E = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && y.length < E) {
      const S = t.filter((k) => {
        const D = E - y.length;
        return k > v && k <= r(v, D);
      });
      y.push(...S);
    }
    const N = y.reduce((S, k) => {
      const D = n.ISOWeek ? c(k) : u(k), C = S.find((P) => P.weekNumber === D), M = new _u(k, b, o);
      return C ? C.days.push(M) : S.push(new YN(D, [M])), S;
    }, []), x = new UN(b, N);
    return p.push(x), p;
  }, []);
  return n.reverseMonths ? g.reverse() : g;
}
function t0(e, t) {
  let { startMonth: n, endMonth: o } = e;
  const { startOfYear: r, startOfDay: s, startOfMonth: a, endOfMonth: i, addYears: l, endOfYear: c, newDate: u, today: d } = t, { fromYear: f, toYear: h, fromMonth: g, toMonth: p } = e;
  !n && g && (n = g), !n && f && (n = t.newDate(f, 0, 1)), !o && p && (o = p), !o && h && (o = u(h, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : f ? n = u(f, 0, 1) : !n && b && (n = r(l(e.today ?? d(), -100))), o ? o = i(o) : h ? o = u(h, 11, 31) : !o && b && (o = c(e.today ?? d())), [
    n && s(n),
    o && s(o)
  ];
}
function n0(e, t, n, o) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: r, numberOfMonths: s = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = o, c = r ? s : 1, u = a(e);
  if (!t)
    return i(u, c);
  if (!(l(t, e) < s))
    return i(u, c);
}
function o0(e, t, n, o) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: r, numberOfMonths: s } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = o, c = r ? s ?? 1 : 1, u = a(e);
  if (!t)
    return i(u, -c);
  if (!(l(u, t) <= 0))
    return i(u, -c);
}
function r0(e) {
  const t = [];
  return e.reduce((n, o) => n.concat(o.weeks.slice()), t.slice());
}
function Er(e, t) {
  const [n, o] = U(e);
  return [t === void 0 ? n : t, o];
}
function s0(e, t) {
  const [n, o] = t0(e, t), { startOfMonth: r, endOfMonth: s } = t, a = Ha(e, n, o, t), [i, l] = Er(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  G(() => {
    const x = Ha(e, n, o, t);
    l(x);
  }, [e.timeZone]);
  const c = Jy(i, o, e, t), u = Zy(c, e.endMonth ? s(e.endMonth) : void 0, e, t), d = e0(c, u, e, t), f = r0(d), h = Qy(d), g = o0(i, n, e, t), p = n0(i, o, e, t), { disableNavigation: b, onMonthChange: w } = e, v = (x) => f.some((S) => S.days.some((k) => k.isEqualTo(x))), y = (x) => {
    if (b)
      return;
    let S = r(x);
    n && S < r(n) && (S = r(n)), o && S > r(o) && (S = r(o)), l(S), w?.(S);
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
    goToDay: (x) => {
      v(x) || y(x.date);
    }
  };
}
var et;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(et || (et = {}));
function Fa(e) {
  return !e[be.disabled] && !e[be.hidden] && !e[be.outside];
}
function i0(e, t, n, o) {
  let r, s = -1;
  for (const a of e) {
    const i = t(a);
    Fa(i) && (i[be.focused] && s < et.FocusedModifier ? (r = a, s = et.FocusedModifier) : o?.isEqualTo(a) && s < et.LastFocused ? (r = a, s = et.LastFocused) : n(a.date) && s < et.Selected ? (r = a, s = et.Selected) : i[be.today] && s < et.Today && (r = a, s = et.Today));
  }
  return r || (r = e.find((a) => Fa(t(a)))), r;
}
function a0(e, t, n, o, r, s, a) {
  const { ISOWeek: i, broadcastCalendar: l } = s, { addDays: c, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: h, endOfISOWeek: g, endOfWeek: p, max: b, min: w, startOfBroadcastWeek: v, startOfISOWeek: y, startOfWeek: E } = a;
  let x = {
    day: c,
    week: d,
    month: u,
    year: f,
    startOfWeek: (S) => l ? v(S, a) : i ? y(S) : E(S),
    endOfWeek: (S) => l ? h(S) : i ? g(S) : p(S)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && o ? x = b([o, x]) : t === "after" && r && (x = w([r, x])), x;
}
function Ku(e, t, n, o, r, s, a, i = 0) {
  if (i > 365)
    return;
  const l = a0(e, t, n.date, o, r, s, a), c = !!(s.disabled && mt(l, s.disabled, a)), u = !!(s.hidden && mt(l, s.hidden, a)), d = l, f = new _u(l, d, a);
  return !c && !u ? f : Ku(e, t, f, o, r, s, a, i + 1);
}
function l0(e, t, n, o, r) {
  const { autoFocus: s } = e, [a, i] = U(), l = i0(t.days, n, o || (() => !1), a), [c, u] = U(s ? l : void 0);
  return {
    isFocusTarget: (p) => !!l?.isEqualTo(p),
    setFocused: u,
    focused: c,
    blur: () => {
      i(c), u(void 0);
    },
    moveFocus: (p, b) => {
      if (!c)
        return;
      const w = Ku(p, b, c, t.navStart, t.navEnd, e, r);
      w && (e.disableNavigation && !t.days.some((y) => y.isEqualTo(w)) || (t.goToDay(w), u(w)));
    }
  };
}
function c0(e, t) {
  const { selected: n, required: o, onSelect: r } = e, [s, a] = Er(n, r ? n : void 0), i = r ? n : s, { isSameDay: l } = t, c = (h) => i?.some((g) => l(g, h)) ?? !1, { min: u, max: d } = e;
  return {
    selected: i,
    select: (h, g, p) => {
      let b = [...i ?? []];
      if (c(h)) {
        if (i?.length === u || o && i?.length === 1)
          return;
        b = i?.filter((w) => !l(w, h));
      } else
        i?.length === d ? b = [h] : b = [...b, h];
      return r || a(b), r?.(b, h, g, p), b;
    },
    isSelected: c
  };
}
function u0(e, t, n = 0, o = 0, r = !1, s = at) {
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
function d0(e, t, n = at) {
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
function za(e, t, n = at) {
  return dt(e, t.from, !1, n) || dt(e, t.to, !1, n) || dt(t, e.from, !1, n) || dt(t, e.to, !1, n);
}
function m0(e, t, n = at) {
  const o = Array.isArray(t) ? t : [t];
  if (o.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? dt(e, i, !1, n) : zu(i, n) ? i.some((l) => dt(e, l, !1, n)) : Ti(i) ? i.from && i.to ? za(e, { from: i.from, to: i.to }, n) : !1 : Fu(i) ? d0(e, i.dayOfWeek, n) : Bu(i) ? n.isAfter(i.before, i.after) ? za(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : mt(e.from, i, n) || mt(e.to, i, n) : Wu(i) || Hu(i) ? mt(e.from, i, n) || mt(e.to, i, n) : !1))
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
function f0(e, t) {
  const { disabled: n, excludeDisabled: o, selected: r, required: s, onSelect: a } = e, [i, l] = Er(r, a ? r : void 0), c = a ? r : i;
  return {
    selected: c,
    select: (f, h, g) => {
      const { min: p, max: b } = e, w = f ? u0(f, c, p, b, s, t) : void 0;
      return o && n && w?.from && w.to && m0({ from: w.from, to: w.to }, n, t) && (w.from = f, w.to = void 0), a || l(w), a?.(w, f, h, g), w;
    },
    isSelected: (f) => c && dt(c, f, !1, t)
  };
}
function h0(e, t) {
  const { selected: n, required: o, onSelect: r } = e, [s, a] = Er(n, r ? n : void 0), i = r ? n : s, { isSameDay: l } = t;
  return {
    selected: i,
    select: (d, f, h) => {
      let g = d;
      return !o && i && i && l(d, i) && (g = void 0), r || a(g), r?.(g, d, f, h), g;
    },
    isSelected: (d) => i ? l(i, d) : !1
  };
}
function p0(e, t) {
  const n = h0(e, t), o = c0(e, t), r = f0(e, t);
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
function g0(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ie(t.today, t.timeZone)), t.month && (t.month = new Ie(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ie(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ie(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ie(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ie(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((oe) => new Ie(oe, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ie(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ie(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: o, labels: r, dateLib: s, locale: a, classNames: i } = Ut(() => {
    const oe = { ...Ci, ...t.locale };
    return {
      dateLib: new Fe({
        locale: oe,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: Ny(t.components),
      formatters: Ay(t.formatters),
      labels: { ...Vy, ...t.labels },
      locale: oe,
      classNames: { ...Ei(), ...t.classNames }
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
  ]), { captionLayout: l, mode: c, navLayout: u, numberOfMonths: d = 1, onDayBlur: f, onDayClick: h, onDayFocus: g, onDayKeyDown: p, onDayMouseEnter: b, onDayMouseLeave: w, onNextClick: v, onPrevClick: y, showWeekNumber: E, styles: N } = t, { formatCaption: x, formatDay: S, formatMonthDropdown: k, formatWeekNumber: D, formatWeekNumberHeader: C, formatWeekdayName: M, formatYearDropdown: P } = o, R = s0(t, s), { days: L, months: $, navStart: _, navEnd: K, previousMonth: I, nextMonth: A, goToMonth: O } = R, Y = vy(L, t, _, K, s), { isSelected: j, select: q, selected: Z } = p0(t, s) ?? {}, { blur: B, focused: W, isFocusTarget: F, moveFocus: Q, setFocused: ce } = l0(t, R, Y, j ?? (() => !1), s), { labelDayButton: de, labelGridcell: ge, labelGrid: Me, labelMonthDropdown: Ue, labelNav: wt, labelPrevious: Dn, labelNext: An, labelWeekday: so, labelWeekNumber: io, labelWeekNumberHeader: ao, labelYearDropdown: lo } = r, co = Ut(() => Ry(s, t.ISOWeek), [s, t.ISOWeek]), Rt = c !== void 0 || h !== void 0, Zt = H(() => {
    I && (O(I), y?.(I));
  }, [I, O, y]), Qt = H(() => {
    A && (O(A), v?.(A));
  }, [O, A, v]), uo = H((oe, me) => (ne) => {
    ne.preventDefault(), ne.stopPropagation(), ce(oe), q?.(oe.date, me, ne), h?.(oe.date, me, ne);
  }, [q, h, ce]), mo = H((oe, me) => (ne) => {
    ce(oe), g?.(oe.date, me, ne);
  }, [g, ce]), Mr = H((oe, me) => (ne) => {
    B(), f?.(oe.date, me, ne);
  }, [B, f]), Dr = H((oe, me) => (ne) => {
    const he = {
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
    if (he[ne.key]) {
      ne.preventDefault(), ne.stopPropagation();
      const [De, ue] = he[ne.key];
      Q(De, ue);
    }
    p?.(oe.date, me, ne);
  }, [Q, p, t.dir]), Ar = H((oe, me) => (ne) => {
    b?.(oe.date, me, ne);
  }, [b]), Pr = H((oe, me) => (ne) => {
    w?.(oe.date, me, ne);
  }, [w]), Ir = H((oe) => (me) => {
    const ne = Number(me.target.value), he = s.setMonth(s.startOfMonth(oe), ne);
    O(he);
  }, [s, O]), fo = H((oe) => (me) => {
    const ne = Number(me.target.value), he = s.setYear(s.startOfMonth(oe), ne);
    O(he);
  }, [s, O]), { className: Rr, style: Lr } = Ut(() => ({
    className: [i[te.Root], t.className].filter(Boolean).join(" "),
    style: { ...N?.[te.Root], ...t.style }
  }), [i, t.className, t.style, N]), Or = yy(t), Jt = V(null);
  Xy(Jt, !!t.animate, {
    classNames: i,
    months: $,
    focused: W,
    dateLib: s
  });
  const _r = {
    dayPickerProps: t,
    selected: Z,
    select: q,
    isSelected: j,
    months: $,
    nextMonth: A,
    previousMonth: I,
    goToMonth: O,
    getModifiers: Y,
    components: n,
    classNames: i,
    styles: N,
    labels: r,
    formatters: o
  };
  return X.createElement(
    $u.Provider,
    { value: _r },
    X.createElement(
      n.Root,
      { rootRef: t.animate ? Jt : void 0, className: Rr, style: Lr, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Or },
      X.createElement(
        n.Months,
        { className: i[te.Months], style: N?.[te.Months] },
        !t.hideNavigation && !u && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[te.Nav], style: N?.[te.Nav], "aria-label": wt(), onPreviousClick: Zt, onNextClick: Qt, previousMonth: I, nextMonth: A }),
        $.map((oe, me) => X.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[te.Month],
            style: N?.[te.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: me,
            displayIndex: me,
            calendarMonth: oe
          },
          u === "around" && !t.hideNavigation && me === 0 && X.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[te.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": Dn(I), onClick: Zt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: I ? void 0 : !0, className: i[te.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          X.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[te.MonthCaption], style: N?.[te.MonthCaption], calendarMonth: oe, displayIndex: me }, l?.startsWith("dropdown") ? X.createElement(
            n.DropdownNav,
            { className: i[te.Dropdowns], style: N?.[te.Dropdowns] },
            (() => {
              const ne = l === "dropdown" || l === "dropdown-months" ? X.createElement(n.MonthsDropdown, { key: "month", className: i[te.MonthsDropdown], "aria-label": Ue(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Ir(oe.date), options: Py(oe.date, _, K, o, s), style: N?.[te.Dropdown], value: s.getMonth(oe.date) }) : X.createElement("span", { key: "month" }, k(oe.date, s)), he = l === "dropdown" || l === "dropdown-years" ? X.createElement(n.YearsDropdown, { key: "year", className: i[te.YearsDropdown], "aria-label": lo(s.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: fo(oe.date), options: Ly(_, K, o, s, !!t.reverseYears), style: N?.[te.Dropdown], value: s.getYear(oe.date) }) : X.createElement("span", { key: "year" }, P(oe.date, s));
              return s.getMonthYearOrder() === "year-first" ? [he, ne] : [ne, he];
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
            } }, x(oe.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            X.createElement(n.CaptionLabel, { className: i[te.CaptionLabel], role: "status", "aria-live": "polite" }, x(oe.date, s.options, s))
          )),
          u === "around" && !t.hideNavigation && me === d - 1 && X.createElement(
            n.NextMonthButton,
            { type: "button", className: i[te.NextMonthButton], tabIndex: A ? void 0 : -1, "aria-disabled": A ? void 0 : !0, "aria-label": An(A), onClick: Qt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: A ? void 0 : !0, className: i[te.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          me === d - 1 && u === "after" && !t.hideNavigation && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[te.Nav], style: N?.[te.Nav], "aria-label": wt(), onPreviousClick: Zt, onNextClick: Qt, previousMonth: I, nextMonth: A }),
          X.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": c === "multiple" || c === "range", "aria-label": Me(oe.date, s.options, s) || void 0, className: i[te.MonthGrid], style: N?.[te.MonthGrid] },
            !t.hideWeekdays && X.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[te.Weekdays], style: N?.[te.Weekdays] },
              E && X.createElement(n.WeekNumberHeader, { "aria-label": ao(s.options), className: i[te.WeekNumberHeader], style: N?.[te.WeekNumberHeader], scope: "col" }, C()),
              co.map((ne) => X.createElement(n.Weekday, { "aria-label": so(ne, s.options, s), className: i[te.Weekday], key: String(ne), style: N?.[te.Weekday], scope: "col" }, M(ne, s.options, s)))
            ),
            X.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[te.Weeks], style: N?.[te.Weeks] }, oe.weeks.map((ne) => X.createElement(
              n.Week,
              { className: i[te.Week], key: ne.weekNumber, style: N?.[te.Week], week: ne },
              E && // biome-ignore lint/a11y/useSemanticElements: react component
              X.createElement(n.WeekNumber, { week: ne, style: N?.[te.WeekNumber], "aria-label": io(ne.weekNumber, {
                locale: a
              }), className: i[te.WeekNumber], scope: "row", role: "rowheader" }, D(ne.weekNumber, s)),
              ne.days.map((he) => {
                const { date: De } = he, ue = Y(he);
                if (ue[be.focused] = !ue.hidden && !!W?.isEqualTo(he), ue[Xe.selected] = j?.(De) || ue.selected, Ti(Z)) {
                  const { from: Nt, to: yt } = Z;
                  ue[Xe.range_start] = !!(Nt && yt && s.isSameDay(De, Nt)), ue[Xe.range_end] = !!(Nt && yt && s.isSameDay(De, yt)), ue[Xe.range_middle] = dt(Z, De, !0, s);
                }
                const $r = Iy(ue, N, t.modifiersStyles), ho = wy(ue, i, t.modifiersClassNames), Pn = !Rt && !ue.hidden ? ge(De, ue, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  X.createElement(n.Day, { key: `${s.format(De, "yyyy-MM-dd")}_${s.format(he.displayMonth, "yyyy-MM")}`, day: he, modifiers: ue, className: ho.join(" "), style: $r, role: "gridcell", "aria-selected": ue.selected || void 0, "aria-label": Pn, "data-day": s.format(De, "yyyy-MM-dd"), "data-month": he.outside ? s.format(De, "yyyy-MM") : void 0, "data-selected": ue.selected || void 0, "data-disabled": ue.disabled || void 0, "data-hidden": ue.hidden || void 0, "data-outside": he.outside || void 0, "data-focused": ue.focused || void 0, "data-today": ue.today || void 0 }, !ue.hidden && Rt ? X.createElement(n.DayButton, { className: i[te.DayButton], style: N?.[te.DayButton], type: "button", day: he, modifiers: ue, disabled: ue.disabled || void 0, tabIndex: F(he) ? 0 : -1, "aria-label": de(De, ue, s.options, s), onClick: uo(he, ue), onBlur: Mr(he, ue), onFocus: mo(he, ue), onKeyDown: Dr(he, ue), onMouseEnter: Ar(he, ue), onMouseLeave: Pr(he, ue) }, S(De, s.options, s)) : !ue.hidden && S(he.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      X.createElement(n.Footer, { className: i[te.Footer], style: N?.[te.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function b0({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: o = "label",
  buttonVariant: r = "ghost",
  formatters: s,
  components: a,
  ...i
}) {
  const l = Ei();
  return /* @__PURE__ */ m(
    g0,
    {
      showOutsideDays: n,
      className: ie(
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
        root: ie("w-fit", l.root),
        months: ie(
          "flex gap-4 flex-col md:flex-row relative",
          l.months
        ),
        month: ie("flex flex-col w-full gap-4", l.month),
        nav: ie(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          l.nav
        ),
        button_previous: ie(
          Es({ variant: r }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_previous
        ),
        button_next: ie(
          Es({ variant: r }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_next
        ),
        month_caption: ie(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          l.month_caption
        ),
        dropdowns: ie(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          l.dropdowns
        ),
        dropdown_root: ie(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          l.dropdown_root
        ),
        dropdown: ie(
          "absolute bg-popover inset-0 opacity-0",
          l.dropdown
        ),
        caption_label: ie(
          "select-none font-medium",
          o === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          l.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: ie("flex", l.weekdays),
        weekday: ie(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          l.weekday
        ),
        week: ie("flex w-full mt-2", l.week),
        week_number_header: ie(
          "select-none w-(--cell-size)",
          l.week_number_header
        ),
        week_number: ie(
          "text-[0.8rem] select-none text-muted-foreground",
          l.week_number
        ),
        day: ie(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          l.day
        ),
        range_start: ie(
          "rounded-l-md bg-accent",
          l.range_start
        ),
        range_middle: ie("rounded-none", l.range_middle),
        range_end: ie("rounded-r-md bg-accent", l.range_end),
        today: ie(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          l.today
        ),
        outside: ie(
          "text-muted-foreground aria-selected:text-muted-foreground",
          l.outside
        ),
        disabled: ie(
          "text-muted-foreground opacity-50",
          l.disabled
        ),
        hidden: ie("invisible", l.hidden),
        ...t
      },
      components: {
        Root: ({ className: c, rootRef: u, ...d }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: u,
            className: ie(c),
            ...d
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/calendar.tsx",
            lineNumber: 128,
            columnNumber: 13
          },
          this
        ),
        Chevron: ({ className: c, orientation: u, ...d }) => u === "left" ? /* @__PURE__ */ m(sm, { className: ie("size-4", c), ...d }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/calendar.tsx",
          lineNumber: 139,
          columnNumber: 15
        }, this) : u === "right" ? /* @__PURE__ */ m(
          im,
          {
            className: ie("size-4", c),
            ...d
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/calendar.tsx",
            lineNumber: 145,
            columnNumber: 15
          },
          this
        ) : /* @__PURE__ */ m(am, { className: ie("size-4", c), ...d }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/calendar.tsx",
          lineNumber: 153,
          columnNumber: 13
        }, this),
        DayButton: v0,
        WeekNumber: ({ children: c, ...u }) => /* @__PURE__ */ m("td", { ...u, children: /* @__PURE__ */ m("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: c }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/calendar.tsx",
          lineNumber: 160,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/calendar.tsx",
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
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/calendar.tsx",
      lineNumber: 27,
      columnNumber: 5
    },
    this
  );
}
function v0({
  className: e,
  day: t,
  modifiers: n,
  ...o
}) {
  const r = Ei(), s = T.useRef(null);
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
      className: ie(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        r.day,
        e
      ),
      ...o
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/calendar.tsx",
      lineNumber: 187,
      columnNumber: 5
    },
    this
  );
}
let hn = null;
const Gu = /* @__PURE__ */ new Map(), w0 = /* @__PURE__ */ new Map();
function Ko() {
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
function N0(e) {
  return hn?.pillDate === e;
}
function y0({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: o,
  onClose: r
}) {
  const s = V(null), a = Sr(e);
  G(() => {
    const v = (y) => {
      y.key === "Escape" && (y.stopPropagation(), y.preventDefault(), r());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [r]), G(() => {
    const v = (E) => {
      s.current && !s.current.contains(E.target) && (E.target.closest(".date-pill") || r());
    }, y = setTimeout(() => {
      document.addEventListener("mousedown", v, !0);
    }, 50);
    return () => {
      clearTimeout(y), document.removeEventListener("mousedown", v, !0);
    };
  }, [r]);
  const i = H((v) => {
    v && o(gn(v)), r();
  }, [o, r]), l = H((v) => {
    const y = /* @__PURE__ */ new Date();
    y.setDate(y.getDate() + v), o(gn(y)), r();
  }, [o, r]), c = H(() => {
    const y = (/* @__PURE__ */ new Date()).getDay(), E = y === 0 ? 1 : 8 - y, N = /* @__PURE__ */ new Date();
    N.setDate(N.getDate() + E), o(gn(N)), r();
  }, [o, r]), u = /* @__PURE__ */ new Date(), d = u.toDateString(), f = new Date(u);
  f.setDate(f.getDate() + 1);
  const h = f.toDateString(), g = u.getDay(), p = g === 0 ? 1 : 8 - g, b = new Date(u);
  b.setDate(b.getDate() + p);
  const w = b.toDateString();
  return /* @__PURE__ */ m(
    "div",
    {
      ref: s,
      className: ie("date-picker-portal", t === "dark" ? "dark" : ""),
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
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 180,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m("div", { className: "date-picker-popup bg-popover text-popover-foreground border border-border rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ m("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ m("div", { className: "flex justify-center p-1", children: /* @__PURE__ */ m(
            b0,
            {
              mode: "single",
              selected: a,
              onSelect: i
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
              lineNumber: 197,
              columnNumber: 13
            },
            this
          ) }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 196,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("div", { className: "border-t border-border" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 203,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("div", { className: "flex items-center justify-center gap-2 px-3 py-3", children: [
            /* @__PURE__ */ m(
              Mt,
              {
                variant: "outline",
                size: "sm",
                className: ie(
                  "rounded-full text-xs",
                  a.toDateString() === d && "ring-2 ring-primary"
                ),
                onClick: () => l(0),
                children: "Today"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
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
                className: ie(
                  "rounded-full text-xs",
                  a.toDateString() === h && "ring-2 ring-primary"
                ),
                onClick: () => l(1),
                children: "Tomorrow"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
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
                className: ie(
                  "rounded-full text-xs",
                  a.toDateString() === w && "ring-2 ring-primary"
                ),
                onClick: c,
                children: "Next Monday"
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
                lineNumber: 227,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
            lineNumber: 204,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 195,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 194,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
      lineNumber: 163,
      columnNumber: 5
    },
    this
  );
}
function k0(e, t, n) {
  if (N0(t)) {
    Ko();
    return;
  }
  Ko();
  const o = e.getBoundingClientRect(), r = window.innerWidth, s = window.innerHeight, a = 320, i = 420, l = 10, c = 16, u = s - o.bottom - l - c, d = o.top - l - c, f = u >= i ? "below" : d >= i ? "above" : u >= d ? "below" : "above";
  let h;
  f === "below" ? h = o.bottom + l : h = o.top - i - l;
  const g = o.left + o.width / 2;
  let p = g - a / 2;
  p + a > r - c && (p = r - a - c), p < c && (p = c);
  const b = document.createElement("div");
  b.setAttribute("data-date-picker-standalone", t), b.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(b), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((N) => {
    b.addEventListener(N, (x) => {
      x.stopPropagation();
    }, !1);
  });
  const v = rf(b);
  hn = { container: b, root: v, pillDate: t };
  const y = () => {
    Ko();
  }, E = (N) => {
    const x = Gu.get(t);
    x && x(N);
  };
  v.render(
    /* @__PURE__ */ m(
      y0,
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
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
        lineNumber: 327,
        columnNumber: 5
      },
      this
    )
  );
}
function x0({ node: e, updateAttributes: t, selected: n }) {
  const o = V(null), r = e.attrs.date || pn(), s = qu(r), a = Si(r), i = H(() => {
    if (!o.current) return "";
    const l = o.current.closest(".markdown-editor-container");
    if (l) {
      const u = l.getAttribute("data-theme");
      if (u) return u;
    }
    return o.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return G(() => (Gu.set(r, (l) => {
    t({ date: l });
  }), w0.set(r, i), () => {
  }), [r, t, i]), G(() => {
    const l = o.current;
    if (!l) return;
    const c = (u) => {
      u.preventDefault(), u.stopPropagation();
      const d = l.getAttribute("data-date") || pn(), f = i();
      k0(l, d, f);
    };
    return l.addEventListener("click", c), () => l.removeEventListener("click", c);
  }, [i]), G(() => {
    const l = o.current?.closest(".ProseMirror") || document, c = () => {
      hn && Ko();
    };
    return l.addEventListener("scroll", c, { passive: !0 }), () => {
      l.removeEventListener("scroll", c);
    };
  }, []), /* @__PURE__ */ m(vn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: o,
      className: `date-pill ${a} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": r,
      children: [
        /* @__PURE__ */ m(bl, { size: 14, className: "date-icon" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 410,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("span", { className: "date-text", children: s }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
          lineNumber: 411,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
      lineNumber: 403,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/DatePillComponent.tsx",
    lineNumber: 402,
    columnNumber: 5
  }, this);
}
function Sr(e) {
  const t = e.split("-");
  if (t.length === 3)
    return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]));
  const n = new Date(e);
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function pn() {
  const e = /* @__PURE__ */ new Date();
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Fn(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function gn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function qu(e) {
  const t = Sr(e), n = /* @__PURE__ */ new Date(), o = new Date(n.getFullYear(), n.getMonth(), n.getDate()), r = new Date(o);
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
function C0(e) {
  return Sr(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function Wt(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return pn();
  if (n === "tomorrow") return Fn(1);
  if (n === "yesterday") return Fn(-1);
  if (n === "next monday") {
    const i = (/* @__PURE__ */ new Date()).getDay(), l = i === 0 ? 1 : 8 - i;
    return Fn(l);
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
      return gn(u);
    }
  }
  if (t.match(/^(\d{4})-(\d{2})-(\d{2})$/)) return t;
  const s = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (s) {
    const a = new Date(parseInt(s[3], 10), parseInt(s[1], 10) - 1, parseInt(s[2], 10));
    return gn(a);
  }
  return null;
}
function Si(e) {
  const t = Sr(e), n = /* @__PURE__ */ new Date(), o = new Date(n.getFullYear(), n.getMonth(), n.getDate()), r = new Date(o);
  return r.setDate(r.getDate() + 7), t.getTime() === o.getTime() ? "date-today" : t < o ? "date-overdue" : t <= r ? "date-upcoming" : "";
}
const T0 = new Ce("datePillPaste"), E0 = fr.create({
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
        default: pn(),
        parseHTML: (e) => e.getAttribute("data-date"),
        renderHTML: (e) => ({ "data-date": e.date })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="date-pill"]' }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const n = e.attrs.date, o = qu(n), r = Si(n);
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
    return lr(x0, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown"
    });
  },
  addCommands() {
    return {
      insertDatePill: (e) => ({ commands: t }) => {
        const n = e || pn();
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
        d().deleteRange(u).insertDatePill(pn()).run();
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
          d().deleteRange(u).insertDatePill(gn(b)).run();
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
    }), l = new Oe({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = Wt(f[1]);
        h && d().deleteRange(u).insertDatePill(h).run();
      }
    }), c = new Oe({
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
      l,
      c
    ];
  },
  addProseMirrorPlugins() {
    const e = this.type;
    return [
      new xe({
        key: T0,
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
            const { state: u } = t, { tr: d, schema: f } = u, h = [];
            let g = 0;
            const p = new RegExp(a.source, a.flags);
            let b;
            for (; (b = p.exec(r)) !== null; ) {
              const E = b[1], N = Wt(E);
              if (N) {
                const x = r.slice(g, b.index);
                x && h.push(f.text(x)), h.push(e.create({ date: N })), g = b.index + b[0].length;
              }
            }
            const w = r.slice(g);
            if (w && h.push(f.text(w)), h.length === 0) return !1;
            const v = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, h)
            ), { $from: y } = u.selection;
            if (y.parent.type.name === "paragraph") {
              const E = d;
              let N = u.selection.from;
              for (const x of h)
                E.insert(N, x), N += x.nodeSize;
              E.delete(u.selection.from, u.selection.to), t.dispatch(E);
            } else
              d.replaceSelectionWith(v), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), qe = /* @__PURE__ */ new Map();
function S0({ node: e, selected: t, editor: n, getPos: o, deleteNode: r }) {
  const s = V(null), a = V(null), i = e.attrs.tag || "", l = V(!1), [c, u] = U(() => qe.has(i)), [d, f] = U(() => qe.get(i)?.value ?? i);
  G(() => {
    c || f(i);
  }, [i, c]), G(() => {
    if (c) {
      const v = qe.get(i);
      qe.set(i, {
        value: d,
        focusedAt: v?.focusedAt ?? Date.now()
      });
    }
  }, [c, d, i]);
  const h = H((v) => {
    if (l.current) return;
    l.current = !0;
    const y = v.trim().replace(/^#/, ""), E = zn(y);
    if (qe.delete(i), E && qe.delete(E), !E || !cn(E))
      r();
    else if (E !== i) {
      const N = o();
      if (typeof N == "number" && n) {
        const { tr: x } = n.state, S = e.nodeSize;
        x.delete(N, N + S), x.insert(N, n.schema.nodes.tagPill.create({ tag: E })), n.view.dispatch(x);
      }
    } else
      qe.delete(i);
    u(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [i, n, o, r, e.nodeSize]), g = H(() => {
    n && !n.isEditable || (qe.set(i, { value: i, focusedAt: Date.now() }), f(i), u(!0), l.current = !1);
  }, [n, i]);
  G(() => {
    const v = s.current;
    if (!v || c) return;
    const y = (N) => {
      N.preventDefault(), N.stopPropagation(), g();
    }, E = (N) => {
      N.preventDefault(), N.stopPropagation();
    };
    return v.addEventListener("dblclick", y), v.addEventListener("click", E), () => {
      v.removeEventListener("dblclick", y), v.removeEventListener("click", E);
    };
  }, [c, n, o, g]), G(() => {
    if (c) {
      const v = requestAnimationFrame(() => {
        if (a.current) {
          a.current.focus(), a.current.select();
          const y = qe.get(i);
          y && (y.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(v);
    }
  }, [c, i]);
  const p = H((v) => {
    v.key === "Enter" ? (v.preventDefault(), h(d)) : v.key === "Escape" && (v.preventDefault(), qe.delete(i), u(!1), l.current = !0, n?.commands.focus());
  }, [h, d, i, n]), b = H(() => {
    const y = qe.get(i)?.focusedAt ?? 0;
    Date.now() - y > 300 && h(d);
  }, [h, d, i]), w = H((v) => {
    f(v.target.value);
  }, []);
  return c ? /* @__PURE__ */ m(vn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": i,
      children: [
        /* @__PURE__ */ m(Ki, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TagPillComponent.tsx",
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
            onChange: w,
            onKeyDown: p,
            onBlur: b,
            spellCheck: !1,
            autoComplete: "off"
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TagPillComponent.tsx",
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
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TagPillComponent.tsx",
      lineNumber: 171,
      columnNumber: 9
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TagPillComponent.tsx",
    lineNumber: 170,
    columnNumber: 7
  }, this) : /* @__PURE__ */ m(vn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": i,
      children: [
        /* @__PURE__ */ m(Ki, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TagPillComponent.tsx",
          lineNumber: 203,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("span", { className: "tag-text", children: i }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TagPillComponent.tsx",
          lineNumber: 204,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TagPillComponent.tsx",
      lineNumber: 196,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TagPillComponent.tsx",
    lineNumber: 195,
    columnNumber: 5
  }, this);
}
function cn(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function zn(e) {
  return e.toLowerCase().trim();
}
const M0 = new Ce("tagPillPaste"), D0 = fr.create({
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
    return lr(S0, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = zn(e);
        return cn(n) ? t.insertContent({
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
        const r = zn(o[1]);
        if (cn(r)) {
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
      new xe({
        key: M0,
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
              if (cn(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, h = [];
            let g = 0;
            const p = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let b;
            for (; (b = p.exec(r)) !== null; ) {
              const y = zn(b[1]);
              if (cn(y)) {
                const E = b[0], N = E.startsWith(" ") || E.startsWith(`
`) ? 1 : 0, x = r.slice(g, b.index + N);
                x && h.push(f.text(x)), h.push(e.create({ tag: y })), g = b.index + E.length;
              }
            }
            const w = r.slice(g);
            if (w && h.push(f.text(w)), h.length === 0) return !1;
            const { $from: v } = u.selection;
            if (v.parent.type.name === "paragraph") {
              const y = d;
              let E = u.selection.from;
              for (const N of h)
                y.insert(E, N), E += N.nodeSize;
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
}), A0 = /\[\[([^\[\]]+)\]\]$/, P0 = Tl.create({
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
        find: A0,
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
}, I0 = ["info", "note", "prompt", "resources", "todo", "summary"];
function R0(e) {
  return e.length < 3 ? !1 : !!(ut.header.test(e) || ut.bold.test(e) || ut.list.test(e) || ut.taskList.test(e) || ut.codeBlock.test(e) || ut.callout.test(e) || ut.highlight.test(e) || ut.link.test(e) || ut.table.test(e));
}
function L0(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", o = "left", r = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? r = t[1] : ["left", "center", "right"].includes(t[1]) && (o = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (o = t[1]), /^\d+$/.test(t[2]) && (r = t[2])), { alt: n, align: o, width: r };
}
function O0(e, t) {
  const { alt: n, align: o, width: r } = L0(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[o] || "margin-right: auto;", a = r ? ` width="${r}" style="width: ${r}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${o}"${a} /></figure>`;
}
function rr(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Ua(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${rr(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, o = e.split(n).filter((s) => s.trim()), r = [];
  for (const s of o) {
    const a = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    a ? r.push(O0(a[1], a[2])) : r.push(`<p>${rr(s.trim())}</p>`);
  }
  return r.join("");
}
function Xu(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, o = Math.floor(n / 2), r = e.trimStart(), s = r.match(/^[-*+]\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: o, text: s[2].trim(), checked: s[1] === "x" };
  const a = r.match(/^[-*+]\s+(.+)$/);
  if (a)
    return { type: "ul", depth: o, text: a[1].trim() };
  const i = r.match(/^\d+\.\s+(.+)$/);
  return i ? { type: "ol", depth: o, text: i[1].trim() } : null;
}
function Zu(e) {
  if (e.length === 0) return "";
  const t = (r, s) => {
    let a = "", i = r;
    const l = e[i]?.type || "ul", c = l === "task", u = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, d = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (a += u; i < e.length && e[i].depth >= s; ) {
      const f = e[i];
      if (f.depth === s) {
        if (c ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${rr(f.text)}</p>` : a += `<li><p>${rr(f.text)}</p>`, i + 1 < e.length && e[i + 1].depth > s) {
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
function Ya(e) {
  if (!e.trim()) return "<p></p>";
  const t = /<br\s*\/?>/i.test(e), n = /(?:^|<br\s*\/?>)\s*(?:[-*+] |\d+\. )/i.test(e);
  if (!t && !n)
    return Ua(e);
  const o = e.split(/<br\s*\/?>/i).filter((i) => i.trim()), r = [];
  let s = [];
  const a = () => {
    s.length !== 0 && (r.push(Zu(s)), s = []);
  };
  for (const i of o) {
    const l = Xu(i);
    if (l) {
      if (s.length > 0) {
        const c = s[0].type;
        l.depth === 0 && l.type !== c && a();
      }
      s.push(l);
    } else
      a(), r.push(Ua(i.trim()));
  }
  return a(), r.join("");
}
function _0(e) {
  const t = e.trim().split(`
`);
  if (t.length < 2) return "";
  const o = t[0].split("|").map((i) => i.trim()).filter((i) => i.length > 0);
  if (o.length === 0 || !t[1].includes("-")) return "";
  const s = t.slice(2);
  let a = "<table><thead><tr>";
  for (const i of o)
    a += "<th>" + Ya(i) + "</th>";
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
        a += "<td>" + Ya(d) + "</td>";
      }
      a += "</tr>";
    }
  }
  return a += "</tbody></table>", a;
}
function $0(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, o = [];
  t = t.replace(n, (d) => {
    const f = d.split(`
`);
    if (f.length >= 2) {
      const h = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(h) && h.includes("-")) {
        const g = _0(d);
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
  }), I0.forEach((d) => {
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
  const l = () => {
    i.length !== 0 && (a.push(Zu(i)), i = []);
  };
  for (const d of s) {
    const f = Xu(d);
    if (f) {
      if (i.length > 0) {
        const g = i[0].type, p = Math.min(...i.map((b) => b.depth));
        f.depth === p && f.type !== g && l();
      }
      i.push(f);
      continue;
    }
    l();
    let h = d;
    h = h.replace(/^(#{1,6})\s+(.+)$/, (g, p, b) => {
      const w = p.length;
      return `<h${w}>${b}</h${w}>`;
    }), h = h.replace(/^>\s+(.+)$/, "<blockquote><p>$1</p></blockquote>"), h = h.replace(/^[-*_]{3,}$/, "<hr>"), a.push(h);
  }
  l(), t = a.join(`
`), t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), "<em>$1</em>"), t = t.replace(/~~([^~]+)~~/g, "<s>$1</s>"), t = t.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (d, f, h) => {
    const g = f.split("|").map((y) => y.trim());
    let p = "", b = "left", w = null;
    g.length === 1 ? p = g[0] : g.length === 2 ? (p = g[0], /^\d+$/.test(g[1]) ? w = g[1] : ["left", "center", "right"].includes(g[1]) ? b = g[1] : p = f) : g.length === 3 ? (p = g[0], ["left", "center", "right"].includes(g[1]) && (b = g[1]), /^\d+$/.test(g[2]) && (w = g[2])) : p = f;
    const v = w ? ` width="${w}" style="width: ${w}px"` : "";
    return `<img src="${h.trim()}" alt="${p}" data-align="${b}"${v}>`;
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
const B0 = ze.create({
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
      new xe({
        key: new Ce("markdownPaste"),
        props: {
          handlePaste(t, n, o) {
            const r = n.clipboardData;
            if (!r) return !1;
            const s = r.getData("text/html");
            if (s && s.trim())
              return !1;
            const a = r.getData("text/plain");
            if (!a || !R0(a))
              return !1;
            n.preventDefault();
            const i = $0(a);
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
}), ja = new Ce("collapsibleHeading");
function W0(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function sr(e, t) {
  const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  return e.descendants((r, s) => {
    if (r.type.name === "heading" && t.includes(r.attrs.level)) {
      const a = r.attrs.level, i = r.textContent.slice(0, 50), l = `h${a}-${i}`, c = o.get(l) ?? 0;
      o.set(l, c + 1), n.set(s, W0(a, i, c));
    }
  }), n;
}
let bn = null;
function $o(e, t, n) {
  const o = [], r = sr(e, n.levels), s = [];
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
      for (let h = c + 1; h < s.length; h++)
        if (s[h].level <= u.level) {
          f = s[h].pos;
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
      const d = r.get(u) ?? "", f = t.collapsedHeadings.has(d), h = l(u);
      o.push(
        Ze.node(u, u + c.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${c.attrs.level} ${f ? "is-collapsed" : "is-expanded"}${h ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": d,
          "data-heading-level": String(c.attrs.level)
        })
      );
      const g = Ze.widget(u + c.nodeSize - 1, () => {
        const p = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${d}"]`);
        if (p) {
          p.classList.contains("collapsed") !== f && (p.classList.remove("collapsed", "expanded"), p.classList.add(f ? "collapsed" : "expanded"), p.title = f ? "Click to expand" : "Click to collapse");
          const y = p.parentElement;
          if (y) return y;
        }
        const b = document.createElement("span");
        b.className = "collapsible-heading-chevron-wrapper", b.setAttribute("contenteditable", "false");
        const w = document.createElement("button");
        return w.className = `collapsible-heading-chevron ${f ? "collapsed" : "expanded"}`, w.setAttribute("data-heading-id", d), w.setAttribute("data-heading-level", String(c.attrs.level)), w.setAttribute("contenteditable", "false"), w.setAttribute("tabindex", "-1"), w.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', w.title = f ? "Click to expand" : "Click to collapse", w.addEventListener("click", (v) => {
          v.preventDefault(), v.stopPropagation();
          const y = w.classList.contains("collapsed");
          w.classList.remove("collapsed", "expanded"), w.classList.add(y ? "expanded" : "collapsed"), w.title = y ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(d) ? t.collapsedHeadings.delete(d) : t.collapsedHeadings.add(d), bn && bn.dispatch(bn.state.tr.setMeta("collapsibleHeading", { toggled: d }));
        }), b.appendChild(w), b;
      }, { side: 1, key: `chevron-${d}` });
      o.push(g);
    } else c.isBlock && l(u) && o.push(
      Ze.node(u, u + c.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), je.create(e, o);
}
function H0(e, t, n, o) {
  if (n.collapsedHeadings.size === 0) return;
  const r = sr(t, o), s = new Set(r.values()), a = [];
  n.collapsedHeadings.forEach((i) => {
    s.has(i) || a.push(i);
  });
  for (const i of a)
    n.collapsedHeadings.delete(i);
}
function F0(e, t, n) {
  const o = [], r = [];
  if (e.descendants((s) => {
    s.type.name === "heading" && n.includes(s.attrs.level) && o.push({ level: s.attrs.level, text: s.textContent.slice(0, 50) });
  }), t.descendants((s) => {
    s.type.name === "heading" && n.includes(s.attrs.level) && r.push({ level: s.attrs.level, text: s.textContent.slice(0, 50) });
  }), o.length !== r.length) return !0;
  for (let s = 0; s < o.length; s++)
    if (o[s].level !== r[s].level || o[s].text !== r[s].text) return !0;
  return !1;
}
const z0 = ze.create({
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
        const a = sr(n.doc, this.options.levels).get(e);
        return a ? (o.collapsedHeadings.has(a) ? o.collapsedHeadings.delete(a) : o.collapsedHeadings.add(a), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: a })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return sr(t.doc, this.options.levels).forEach((r) => {
          n.collapsedHeadings.add(r);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options;
    return [
      new xe({
        key: ja,
        view(n) {
          return bn = n, {
            update(o) {
              bn = o;
            },
            destroy() {
              bn = null;
            }
          };
        },
        state: {
          init(n, o) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: $o(o.doc, e, t),
              docVersion: 0
            };
          },
          apply(n, o, r, s) {
            return n.getMeta("collapsibleHeading") ? {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: $o(s.doc, e, t),
              docVersion: o.docVersion + 1
            } : n.docChanged ? (H0(r.doc, s.doc, e, t.levels), F0(r.doc, s.doc, t.levels) ? {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: $o(s.doc, e, t),
              docVersion: o.docVersion + 1
            } : {
              ...o,
              decorations: o.decorations.map(n.mapping, n.doc)
            }) : {
              ...o,
              decorations: o.decorations.map(n.mapping, n.doc)
            };
          }
        },
        props: {
          decorations(n) {
            const o = ja.getState(n);
            return o?.decorations ? o.decorations : $o(n.doc, e, t);
          }
        }
      })
    ];
  }
}), U0 = /\[([^\]]+)\]\(([^)]+)\)$/, Y0 = /^(https?:\/\/|www\.)[^\s]+$/i, j0 = ze.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Oe({
        find: U0,
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
      new xe({
        key: new Ce("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const o = n.clipboardData;
            if (!o) return !1;
            const r = o.getData("text/plain");
            if (!r) return !1;
            const s = r.trim();
            if (!Y0.test(s)) return !1;
            const { state: a } = t, { selection: i } = a, { from: l, to: c, empty: u } = i;
            let d = s;
            if (!d.startsWith("http://") && !d.startsWith("https://") && (d.startsWith("www."), d = "https://" + d), !u && a.doc.textBetween(l, c))
              return e.chain().focus().extendMarkRange("link").setLink({ href: d }).run(), !0;
            const f = a.schema.marks.link.create({ href: d }), h = a.tr;
            return h.insertText(d, l, c), h.addMark(l, l + d.length, f), t.dispatch(h), !0;
          }
        }
      })
    ];
  }
}), V0 = ["info", "note", "prompt", "resources", "todo"], K0 = ze.create({
  name: "calloutInputRule",
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new xe({
        key: new Ce("calloutInputRule"),
        props: {
          handleKeyDown(t, n) {
            if (n.key !== "Enter") return !1;
            const { state: o } = t, { selection: r, doc: s } = o, { $from: a } = r, i = a.start();
            a.end();
            const l = s.textBetween(i, a.pos, ""), c = l.trim();
            for (const u of V0)
              if (c === `\`\`\`${u}`) {
                n.preventDefault();
                const d = o.tr, f = i + l.indexOf("```");
                d.delete(f, a.pos);
                const h = e.schema.nodes.callout, g = e.schema.nodes.paragraph;
                if (h && g) {
                  const p = g.create(), b = h.create({ type: u }, Cl.from(p));
                  d.insert(f, b);
                  const w = d.doc.resolve(f + 2);
                  d.setSelection(Ve.near(w)), t.dispatch(d);
                }
                return !0;
              }
            return !1;
          }
        }
      })
    ];
  }
}), Bo = new Ce("searchHighlight"), G0 = ze.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: o }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, o && o(n.setMeta(Bo, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Bo, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new xe({
        key: Bo,
        state: {
          init() {
            return je.empty;
          },
          apply(t, n, o, r) {
            const { searchTerm: s, caseSensitive: a, useRegex: i, currentMatchIndex: l } = e, c = t.getMeta(Bo), u = t.docChanged;
            if (!s)
              return je.empty;
            if (!u && !c)
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
                    const w = p + b.index, v = p + b.index + b[0].length, y = f === l;
                    d.push(
                      Ze.inline(w, v, {
                        class: y ? "search-highlight-current" : "search-highlight"
                      })
                    ), f++;
                  }
                }
                return !0;
              });
            } catch {
              return je.empty;
            }
            return je.create(r.doc, d);
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
}), q0 = new Ce("tabIndent");
function X0(e) {
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
function Va(e, t) {
  const { $from: n } = e.selection, o = e.schema.nodes.orderedList, r = e.schema.nodes.bulletList;
  if (!o || !r) return !1;
  for (let s = n.depth; s >= 0; s--) {
    const a = n.node(s);
    if (a.type === o) {
      if (s >= 2) {
        const i = n.node(s - 1);
        if (i.type.name === "listItem" || i.type.name === "taskItem") {
          if (t) {
            const l = n.before(s), c = e.tr.setNodeMarkup(l, r, a.attrs);
            t(c);
          }
          return !0;
        }
      }
      break;
    }
    if (a.type.name === "bulletList" || a.type.name === "taskList")
      break;
  }
  return !1;
}
const Z0 = ze.create({
  name: "tabIndent",
  // Set higher priority to ensure this extension handles Tab before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    return [
      new xe({
        key: q0,
        props: {
          handleKeyDown(e, t) {
            if (t.key !== "Tab") return !1;
            const { state: n, dispatch: o } = e, r = X0(n);
            if (!r)
              return t.preventDefault(), !0;
            t.preventDefault();
            const s = n.schema.nodes[r];
            if (!s) return !0;
            if (t.shiftKey) {
              if (!qi(s)(n, o)) {
                const l = r === "taskItem" ? "listItem" : "taskItem", c = n.schema.nodes[l];
                c && qi(c)(n, o);
              }
            } else if (Xi(s)(n, o))
              Va(e.state, o);
            else {
              const l = r === "taskItem" ? "listItem" : "taskItem", c = n.schema.nodes[l];
              c && Xi(c)(n, o) && Va(e.state, o);
            }
            return !0;
          }
        }
      })
    ];
  }
}), Q0 = new Ce("expandSelection");
function us(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const J0 = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), Qu = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), ek = "tableRow", tk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function nk(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--)
    if (o.node(r).isTextblock) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function ok(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--) {
    const s = o.node(r);
    if (tk.has(s.type.name)) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function rk(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--)
    if (o.node(r).type.name === ek) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function sk(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--) {
    const s = o.node(r);
    if (Qu.has(s.type.name)) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function ik(e, t, n) {
  const o = e.resolve(t);
  let r = -1;
  for (let i = o.depth; i >= 1; i--) {
    const l = o.node(i);
    J0.has(l.type.name) && (r = i);
  }
  if (r === -1) return null;
  const s = o.start(r), a = o.end(r);
  return s < t || a > n ? { from: s, to: a } : null;
}
function ak(e) {
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
function lk(e, t, n) {
  const o = e.filter((r) => r.from <= t && r.to >= n);
  return o.sort((r, s) => r.to - r.from - (s.to - s.from)), o;
}
function ck(e, t) {
  const n = e.resolve(t);
  for (let o = n.depth; o >= 1; o--)
    if (n.node(o).type.name === "table") return !0;
  return !1;
}
function uk(e, t, n) {
  let o = !1;
  return e.nodesBetween(t, n, (r) => Qu.has(r.type.name) ? (o = !0, !1) : !0), o;
}
function dk(e, t, n) {
  const o = [];
  let r = t, s = n;
  const a = (l) => l && (l.from < r || l.to > s) ? (o.push(l), r = l.from, s = l.to, !0) : !1;
  a(nk(e, r, s)), ck(e, t) && (a(ok(e, r, s)), a(rk(e, r, s))), a(ik(e, r, s)), a(sk(e, r, s));
  const i = ak(e);
  if (i.length > 0) {
    const l = lk(i, r, s);
    for (const c of l)
      uk(e, c.from, c.to) ? c.from === 0 && c.to === e.content.size ? a({ from: 0, to: e.content.size, useSelectAll: !0 }) : a({ from: c.from, to: c.to, useSelectAll: !0 }) : a({ from: c.from, to: c.to });
  }
  return (r > 0 || s < e.content.size) && o.push({ from: 0, to: e.content.size, useSelectAll: !0 }), o;
}
const mk = ze.create({
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
        if (t.expansionDepth > 0 && r === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), o instanceof Am || r === 0 && s === n.content.size)
          return !0;
        const i = dk(n, r, s);
        let l = null;
        for (const c of i)
          if (c.from < r || c.to > s) {
            l = c;
            break;
          }
        if (l) {
          if (t.isExpanding = !0, l.from === 0 && l.to === n.content.size)
            e.commands.selectAll(), t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size;
          else if (l.useSelectAll)
            try {
              const c = n.resolve(l.from), u = n.resolve(l.to), d = e.state.tr, f = Ve.between(c, u);
              e.view.dispatch(d.setSelection(f).scrollIntoView());
              const h = e.state.selection;
              t.lastExpandedFrom = h.from, t.lastExpandedTo = h.to;
            } catch {
              e.commands.selectAll(), t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size;
            }
          else {
            e.commands.setTextSelection({
              from: l.from,
              to: l.to
            });
            const c = e.state.selection;
            c.from !== l.from || c.to !== l.to ? (e.commands.selectAll(), t.lastExpandedFrom = 0, t.lastExpandedTo = n.content.size) : (t.lastExpandedFrom = l.from, t.lastExpandedTo = l.to);
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
      new xe({
        key: Q0,
        props: {
          handleClick() {
            return us(e), !1;
          },
          handleTextInput() {
            return us(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && us(e), !1;
          }
        }
      })
    ];
  }
}), fk = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function hk(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, o = parseInt(t.slice(2, 4), 16) / 255, r = parseInt(t.slice(4, 6), 16) / 255, s = (i) => i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(o) + 0.0722 * s(r) > 0.4;
}
const pk = new Ce("hexColorDecoration");
function Ju(e, t, n) {
  const o = [];
  return e.nodesBetween(t, n, (r, s) => {
    if (!r.isText) return;
    const a = r.text || "";
    let i;
    const l = new RegExp(fk.source, "g");
    for (; (i = l.exec(a)) !== null; ) {
      const c = s + i.index, u = c + i[0].length;
      if (u >= t && c <= n) {
        const d = i[0], f = hk(d);
        o.push(
          Ze.inline(c, u, {
            class: "hex-color-swatch",
            style: `background-color: ${d}; color: ${f ? "#1a1a1a" : "#ffffff"}; padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono, monospace); font-size: 0.9em;`
          })
        );
      }
    }
  }), o;
}
function gk(e) {
  const t = Ju(e, 0, e.content.size);
  return je.create(e, t);
}
const bk = Tl.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new xe({
        key: pk,
        state: {
          init(e, { doc: t }) {
            return gk(t);
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
              const a = Ju(e.doc, s.from, s.to);
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
}), Ae = new Ce("selectAllOccurrences");
function Ka(e, t, n, o, r) {
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
function Et(e, t) {
  const n = Ae.getState(e.state);
  if (!n) return [];
  const o = [];
  return n.find().forEach((r) => {
    if (r.from === r.to) return;
    const s = e.state.doc.textBetween(r.from, r.to, "");
    o.push({ from: r.from, to: r.to, text: s });
  }), o;
}
function vk(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Se(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const wk = ze.create({
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
        const l = Ka(t.state.doc, r, s, a, i);
        return l.length === 0 ? !1 : (this.storage.isActive = !0, this.storage.ranges = l, this.storage.searchTerm = r, this.storage.caseSensitive = s, this.storage.useRegex = a, this.storage.wholeWord = i, this.storage.typedBuffer = "", this.storage.isTypingReplace = !1, this.storage.originalTermLength = r.length, this.storage.allMatches = l, this.storage.nextMatchIndex = l.length, this.storage.isIncremental = !1, this.storage.undoStack = [], this.storage.redoStack = [], o && o(n.setMeta(Ae, { activate: !0 })), !0);
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
          const l = Ka(r.doc, i, !1, !1, !1);
          if (l.length === 0) return !1;
          const c = vk(l, s), u = l[c];
          return o.isActive = !0, o.ranges = [u], o.searchTerm = i, o.caseSensitive = !1, o.useRegex = !1, o.wholeWord = !1, o.typedBuffer = "", o.isTypingReplace = !1, o.originalTermLength = i.length, o.allMatches = l, o.nextMatchIndex = (c + 1) % l.length, o.isIncremental = !0, o.undoStack = [], o.redoStack = [], n && n(t.setMeta(Ae, { activate: !0 })), setTimeout(() => {
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
          ) ? !1 : (o.ranges = [...o.ranges, s], o.nextMatchIndex = (r + 1) % o.allMatches.length, o.ranges.length >= o.allMatches.length && (o.isIncremental = !1), n && n(t.setMeta(Ae, { activate: !0 })), setTimeout(() => {
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Se(this.storage), t && t(e.setMeta(Ae, { deactivate: !0 })), !0),
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
              const l = Et(i, this.storage);
              this.storage.ranges = l, l.length === 0 && Se(this.storage);
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
        return Se(this.storage), !0;
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
              const s = Et(r, this.storage);
              this.storage.ranges = s, this.storage.searchTerm = e, s.length === 0 && Se(this.storage);
            }
          } catch {
          }
        }, 10) : Se(this.storage), !0;
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
      new xe({
        key: Ae,
        state: {
          init() {
            return je.empty;
          },
          apply(t, n, o, r) {
            const s = t.getMeta(Ae);
            if (s?.deactivate || !e.isActive)
              return je.empty;
            if (s?.activate || s?.refresh) {
              const a = [];
              for (const i of e.ranges) {
                a.push(
                  Ze.inline(i.from, i.to, {
                    class: "select-all-occurrence-highlight",
                    "data-occurrence": "true"
                  })
                );
                const l = document.createElement("span");
                l.className = "select-all-multi-cursor", l.setAttribute("aria-hidden", "true"), a.push(
                  Ze.widget(i.to, l, {
                    side: 1,
                    key: `cursor-${i.from}-${i.to}`
                  })
                );
              }
              return je.create(r.doc, a);
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
              Se(e);
              const { tr: r } = t.state;
              t.dispatch(r.setMeta(Ae, { deactivate: !0 }));
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
              Se(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Ae, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const r = e.undoStack.pop();
                return e.typedBuffer = r, r === "" && (e.isTypingReplace = !1), sf(t.state, t.dispatch), setTimeout(() => {
                  const s = Et(t);
                  e.ranges = s, s.length === 0 && Se(e);
                }, 10), !0;
              }
              Se(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Ae, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const r = e.redoStack.pop();
                return e.typedBuffer = r, e.isTypingReplace = !0, af(t.state, t.dispatch), setTimeout(() => {
                  const s = Et(t);
                  e.ranges = s, s.length === 0 && Se(e);
                }, 10), !0;
              }
              Se(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Ae, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const o = Et(t);
                if (o.length === 0) {
                  Se(e);
                  const { tr: i } = t.state;
                  return t.dispatch(i.setMeta(Ae, { deactivate: !0 })), !0;
                }
                const r = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...o].sort((i, l) => l.from - i.from), { tr: a } = t.state;
                for (const i of s)
                  a.replaceWith(i.from, i.to, t.state.schema.text(r));
                t.dispatch(a), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const i = Et(t);
                  e.ranges = i, i.length === 0 && Se(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const o = [...e.ranges].sort((a, i) => i.from - a.from), { tr: r } = t.state;
                for (const a of o)
                  r.delete(a.from, a.to);
                t.dispatch(r), Se(e);
                const { tr: s } = t.state;
                t.dispatch(s.setMeta(Ae, { deactivate: !0 }));
              }
              return !0;
            }
            if (n.key === "Delete") {
              n.preventDefault();
              const o = [...e.ranges].sort((a, i) => i.from - a.from), { tr: r } = t.state;
              for (const a of o)
                r.delete(a.from, a.to);
              t.dispatch(r), Se(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Ae, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Se(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Ae, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Se(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Ae, { deactivate: !0 })), !1;
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
            const s = Et(t);
            if (s.length === 0) {
              Se(e);
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(Ae, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += r : (e.isTypingReplace = !0, e.typedBuffer = r);
            const a = [...s].sort((l, c) => c.from - l.from), { tr: i } = t.state;
            for (const l of a)
              i.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(i), setTimeout(() => {
              const l = Et(t);
              e.ranges = l, l.length === 0 && Se(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
}), Nk = new Ce("linkBoundary"), yk = ze.create({
  name: "linkBoundary",
  addProseMirrorPlugins() {
    return [
      new xe({
        key: Nk,
        appendTransaction(e, t, n) {
          const { selection: o, schema: r } = n, s = r.marks.link;
          if (!s || !o.empty) return null;
          const { $from: a } = o;
          if (a.parentOffset !== 0 || !a.parent.isTextblock) return null;
          const i = a.parent.firstChild;
          if (!i || !i.isText || !s.isInSet(i.marks)) return null;
          const c = n.storedMarks || a.marks(), u = c.filter(
            (h) => h.type !== s
          );
          if (!c.some(
            (h) => h.type === s
          )) return null;
          const { tr: f } = n;
          return f.setStoredMarks(u), f;
        }
      })
    ];
  }
}), kk = new Ce("smartCopyPaste"), ed = /* @__PURE__ */ new Set(["codeBlock", "callout"]);
function Ga(e) {
  const { state: t } = e, { selection: n } = t, { $from: o, $to: r } = n;
  for (let s = o.depth; s > 0; s--) {
    const a = o.node(s);
    if (!ed.has(a.type.name)) continue;
    const i = o.start(s), l = o.end(s), c = r.depth;
    let u = !1;
    for (let g = c; g > 0; g--)
      if (r.start(g) === i && r.node(g) === a) {
        u = !0;
        break;
      }
    if (!u)
      return { isFullContainer: !1, containerType: null };
    const d = n.from, f = n.to;
    let h;
    if (a.type.name === "codeBlock")
      h = d <= i && f >= l;
    else {
      const g = a.firstChild, p = a.lastChild;
      !g || !p ? h = !1 : h = d <= i + 1 && f >= l - 1;
    }
    return {
      isFullContainer: h,
      containerType: a.type.name
    };
  }
  return { isFullContainer: !1, containerType: null };
}
const xk = ze.create({
  name: "smartCopyPaste",
  addProseMirrorPlugins() {
    const e = this.editor;
    let t = {
      isFullContainer: !1,
      containerType: null
    };
    return [
      new xe({
        key: kk,
        props: {
          handleDOMEvents: {
            // Analyze the selection right before copy/cut happens
            copy(n) {
              return t = Ga(n), !1;
            },
            cut(n) {
              return t = Ga(n), !1;
            }
          },
          /**
           * transformCopied is called after the slice is created from the
           * selection but before it's serialized to the clipboard.
           * We use the analysis from the handleDOMEvents.copy/cut handler.
           */
          transformCopied(n) {
            const { containerType: o, isFullContainer: r } = t;
            if (t = { isFullContainer: !1, containerType: null }, !o || r)
              return n;
            const { content: s, openStart: a, openEnd: i } = n;
            if (s.childCount !== 1 || a === 0)
              return n;
            const l = s.firstChild;
            if (!l || !ed.has(l.type.name))
              return n;
            if (o === "codeBlock") {
              const c = e.schema, u = c.nodes.paragraph;
              if (!u) {
                const p = l.content;
                return new Ur(p, Math.max(0, a - 1), Math.max(0, i - 1));
              }
              let d = "";
              l.content.forEach((p) => {
                d += p.text || "";
              });
              const f = d.split(`
`);
              f.length > 1 && f[f.length - 1] === "" && f.pop();
              const h = f.map((p) => p === "" ? u.create() : u.create(null, c.text(p))), g = Cl.from(h);
              return new Ur(g, 0, 0);
            } else {
              const c = l.content, u = Math.max(0, a - 1), d = Math.max(0, i - 1);
              return new Ur(c, u, d);
            }
          }
        }
      })
    ];
  }
});
function Ck() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function Tk(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => {
      typeof o.result == "string" ? t(o.result) : n(new Error("Failed to read file"));
    }, o.onerror = () => n(new Error("Failed to read file")), o.readAsDataURL(e);
  });
}
function Ek(e, t) {
  const [n, o] = e.split(","), r = n.match(/:(.*?);/), s = r ? r[1] : "image/jpeg", a = atob(o), i = new Uint8Array(a.length);
  for (let l = 0; l < a.length; l++)
    i[l] = a.charCodeAt(l);
  return new File([i], t, { type: s });
}
function Sk(e, t) {
  return t.includes(e.type);
}
function Mk(e) {
  return new Promise((t) => {
    const n = new window.Image();
    n.onload = () => {
      t({ width: n.width, height: n.height });
    }, n.onerror = () => {
      t({ width: 400, height: 300 });
    }, n.src = e;
  });
}
async function Dk(e, t, n) {
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
      const d = e.type === "image/png" || e.type === "image/gif", f = d ? "image/png" : "image/jpeg", h = d ? void 0 : n, g = c.toDataURL(f, h), p = Ek(g, e.name);
      o({ dataUrl: g, file: p, width: i, height: l });
    }, s.onerror = () => r(new Error("Failed to load image")), a.readAsDataURL(e);
  });
}
function Ak(e, t, n) {
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
async function qa(e, t, n) {
  if (!n.onImageUpload)
    return n.onUploadError?.("Image upload not available. Please connect Dropbox in Settings."), !1;
  if (!Sk(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const r = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${r}MB`), !1;
  }
  const o = Ck();
  try {
    n.onUploadStart?.();
    let r, s, a;
    const i = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && i) {
      const h = await Dk(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      r = h.dataUrl, a = h.file, s = Math.min(h.width, 600);
    } else {
      r = await Tk(e), a = e;
      const h = await Mk(r);
      s = Math.min(h.width, 600);
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
            const { state: w, dispatch: v } = t.view, y = w.doc.nodeAt(b);
            if (y) {
              const E = w.tr.setNodeMarkup(b, void 0, {
                ...y.attrs,
                src: h
              });
              v(E);
            }
          } catch (w) {
            console.warn("Failed to replace placeholder with uploaded reference:", w);
          }
          return g = !0, !1;
        }
        return !0;
      }), t.view.state.doc.descendants((p, b) => {
        if (p.type.name === "resizableImage" && p.attrs.src === h) {
          const w = t.view.nodeDOM(b);
          if (w) {
            const v = w instanceof HTMLElement ? w : w.dom;
            v && v.classList.remove("image-uploading");
          }
          return !1;
        }
        return !0;
      }), n.onUploadComplete?.(), !0;
    } catch (h) {
      return console.warn("Image upload failed, removing placeholder:", h), Ak(t, r, e.name), n.onUploadError?.(`Upload failed: ${h instanceof Error ? h.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
    }
  } catch (r) {
    return n.onUploadError?.(`Failed to process image: ${r instanceof Error ? r.message : "Unknown error"}`), !1;
  }
}
function Xa(e) {
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
const Pk = ze.create({
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
      new xe({
        key: new Ce("imageUpload"),
        props: {
          // Handle paste events with images
          handlePaste(n, o) {
            const r = o.clipboardData;
            if (!r) return !1;
            const s = Xa(r);
            return s.length === 0 ? !1 : (o.preventDefault(), s.forEach((a) => {
              qa(a, t, e);
            }), !0);
          },
          // Handle drop events with images
          handleDrop(n, o, r, s) {
            if (s) return !1;
            const a = o.dataTransfer;
            if (!a) return !1;
            const i = Xa(a);
            if (i.length === 0)
              return !1;
            o.preventDefault();
            const l = n.posAtCoords({
              left: o.clientX,
              top: o.clientY
            });
            if (l) {
              const c = n.state.tr.setSelection(
                Ve.near(n.state.doc.resolve(l.pos))
              );
              n.dispatch(c);
            }
            return i.forEach((c) => {
              qa(c, t, e);
            }), !0;
          }
        }
      })
    ];
  }
});
function Ik({
  placeholder: e,
  isMobile: t,
  maxImageSize: n,
  headingLevels: o,
  collapsibleHeadingLevels: r,
  disabledFeatures: s,
  progressiveSelectAll: a,
  enableCollapsibleHeadings: i,
  enableCollapsibleLists: l,
  enableTagAutoDetect: c,
  enableHexColorHighlight: u,
  isLightweight: d,
  setImageEditState: f,
  callbackRefs: h
}) {
  return Ut(() => {
    const g = [
      Bm.configure({
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
      uf.configure({ HTMLAttributes: { class: "font-bold" } }).extend({ keepOnSplit: !1 }),
      df.configure({ HTMLAttributes: { class: "italic" } }).extend({ keepOnSplit: !1 }),
      mf.configure({}).extend({ keepOnSplit: !1 }),
      cf.configure({}).extend({ keepOnSplit: !1 }),
      // Mixed list extensions - allow inter-mixing of bullet, ordered, and task list items
      rw,
      sw,
      lw,
      Wm.configure({
        placeholder: e,
        emptyEditorClass: "is-editor-empty"
      }),
      Hm.configure({
        types: ["heading", "paragraph"]
      }),
      Fm.configure({
        multicolor: !0
      }),
      zm.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      // Prevent typed text from being absorbed into a link mark at the start of a textblock
      yk,
      // Smart copy-paste: partial selection inside code block/callout unwraps the container
      xk,
      Jm,
      ef,
      tf,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...d ? [] : [nf],
      j0,
      G0,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...d ? [] : [wk],
      Z0,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      lf.extend({
        addInputRules() {
          const p = this.type;
          return [
            new Oe({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: b, range: w }) => {
                const { tr: v } = b, y = w.from, E = w.to;
                v.delete(y, E);
                const N = v.doc.resolve(y), x = p.create(), S = N.before(N.depth), k = N.after(N.depth);
                v.replaceWith(S, k, x);
                const D = S + x.nodeSize;
                if (D < v.doc.content.size) {
                  const C = v.doc.resolve(D);
                  C.nodeAfter && C.nodeAfter.isTextblock ? v.setSelection(Ve.create(v.doc, D + 1)) : C.nodeAfter && v.setSelection(Ve.near(v.doc.resolve(D)));
                } else {
                  const M = b.schema.nodes.paragraph.create();
                  v.insert(D, M), v.setSelection(Ve.create(v.doc, D + 1));
                }
                v.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return s.tables || g.push(
      Um.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Ym,
      qv,
      Xv,
      ...d ? [] : [ow]
    ), s.taskLists || g.push(
      iw.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      aw.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), l && !t && !d && g.push(
      dw.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || g.push(pf), s.callouts || g.push(fw, K0), i && !s.collapsibleHeadings && !d && g.push(
      z0.configure({
        levels: r
      })
    ), s.images || g.push(
      hw.configure({
        allowBase64: !0,
        HTMLAttributes: {
          class: "editor-image"
        },
        onImageClick: (p) => {
          f({
            isOpen: !0,
            src: p.src,
            alt: p.alt,
            pos: p.pos,
            position: { x: p.rect.left + p.rect.width / 2, y: p.rect.bottom }
          });
        },
        resolveImageSrc: h.resolveImageSrc.current ? ((...p) => h.resolveImageSrc.current(...p)) : void 0
      }),
      Pk.configure({
        maxFileSize: n,
        onUploadStart: h.onImageUploadStart.current ? ((...p) => h.onImageUploadStart.current(...p)) : void 0,
        onUploadComplete: h.onImageUploadComplete.current ? ((...p) => h.onImageUploadComplete.current(...p)) : void 0,
        onUploadError: h.onImageUploadError.current ? ((...p) => h.onImageUploadError.current(...p)) : void 0,
        onImageUpload: h.onImageUpload.current ? ((p, b) => h.onImageUpload.current(p, b)) : void 0
      })
    ), s.datePills || g.push(
      E0.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), s.tagPills || g.push(
      D0.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: c
      })
    ), s.wikiLinks || g.push(
      P0.configure({
        onWikiLinkClick: (p) => {
          console.log("WikiLink clicked:", p), h.onWikiLinkClick.current?.(p);
        },
        validateLink: (p) => h.validateWikiLink.current ? h.validateWikiLink.current(p) : !0
      })
    ), a && g.push(mk), u && !d && g.push(bk), s.markdownPaste || g.push(
      B0.configure({
        enableMarkdownPaste: !0
      })
    ), g;
  }, [e, t, n, o, r, s, a, i, l, c, u, d]);
}
let ft = null, ir = null;
async function td() {
  if (ft) return ft;
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
      const u = c, d = u.getAttribute("src") || "", h = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = u.getAttribute("width"), p = g ? parseInt(g, 10) : null, b = u.getAttribute("data-align") || "left", w = [h], v = b !== "left", y = p && p > 0;
      return (v || y) && w.push(v ? b : "left"), y && w.push(String(p)), `![${w.join(" | ")}](${d})`;
    }
  }), n.addRule("imageResizer", {
    filter: (l) => l.nodeName === "FIGURE" && l.classList.contains("image-resizer"),
    replacement: (l, c) => {
      const u = c.querySelector("img");
      if (!u) return l;
      const d = u.getAttribute("src") || "", h = (u.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), g = u.getAttribute("width"), p = g ? parseInt(g, 10) : null, b = u.getAttribute("data-align") || "left", w = [h], v = b !== "left", y = p && p > 0;
      (v || y) && w.push(v ? b : "left"), y && w.push(String(p));
      const E = `![${w.join(" | ")}](${d})`, N = c.parentNode;
      return N && N.nodeName === "LI" ? `
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
  }), n.addRule("listItem", {
    filter: (l) => l.nodeName === "LI" && l.getAttribute("data-type") !== "taskItem",
    replacement: (l, c) => {
      l = l.replace(/^\n+/, "").replace(/\n+$/, ""), l = l.replace(/\n\n+(- |\d+\. )/g, `
$1`), l = l.replace(/\u200B/g, "").trim();
      const u = l || "​", d = c.parentNode;
      let f;
      if (d && d.nodeName === "OL") {
        const p = Array.from(d.children).filter((w) => w.nodeName === "LI").indexOf(c);
        f = `${parseInt(d.getAttribute("start") || "1", 10) + p}. `;
      } else
        f = "-   ";
      const h = " ".repeat(f.length);
      return f + u.replace(/\n/gm, `
` + h) + `
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
    const c = l.getAttribute("src") || "", d = (l.getAttribute("alt") || "").replace(/\s*\|\s*(?:left|center|right)?\s*(?:\|\s*\d+)?\s*$/, "").trim(), f = l.getAttribute("width"), h = f ? parseInt(f, 10) : null, g = l.getAttribute("data-align") || "left", p = [d], b = g !== "left", w = h && h > 0;
    return (b || w) && p.push(b ? g : "left"), w && p.push(String(h)), `![${p.join(" \\| ")}](${c})`;
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
    const d = "  ".repeat(u), f = l.nodeName, h = Array.from(l.childNodes).filter(
      (p) => p.nodeType === Node.ELEMENT_NODE && p.nodeName === "LI"
    ), g = f === "OL" ? parseInt(l.getAttribute("start") || "1", 10) : 1;
    h.forEach((p, b) => {
      const w = p.getAttribute("data-type") === "taskItem", v = p.getAttribute("data-checked") === "true", y = s(p);
      w ? c.push(`${d}- [${v ? "x" : " "}] ${y}`) : f === "OL" ? c.push(`${d}${g + b}. ${y}`) : c.push(`${d}- ${y}`);
      const E = Array.from(p.childNodes).filter(
        (N) => N.nodeType === Node.ELEMENT_NODE && (N.nodeName === "UL" || N.nodeName === "OL")
      );
      for (const N of E)
        a(N, c, u + 1);
    });
  }
  function i(l) {
    const c = [];
    for (const u of Array.from(l.childNodes)) {
      if (u.nodeType !== Node.ELEMENT_NODE) {
        const g = (u.textContent || "").trim();
        g && c.push(g.replace(/\|/g, "\\|"));
        continue;
      }
      const d = u, f = d.nodeName;
      if (f === "UL" || f === "OL") {
        a(d, c, 0);
        continue;
      }
      if (f === "FIGURE") {
        const g = d.querySelector("img");
        g && c.push(o(g));
        continue;
      }
      if (f === "IMG") {
        c.push(o(d));
        continue;
      }
      const h = r(d).trim();
      h && c.push(h);
    }
    return c.join(" <br> ") || "";
  }
  return n.addRule("table", {
    filter: "table",
    replacement: function(l, c) {
      const u = c, d = Array.from(u.querySelectorAll("tr"));
      if (d.length === 0) return "";
      const f = [];
      let h = !1;
      d.forEach((p, b) => {
        const w = Array.from(p.querySelectorAll("th, td")), v = w.map((y) => i(y));
        if (b > 0 && w.length > 0 && w[0].nodeName === "TH" && (h = !0), f.push("| " + v.join(" | ") + " |"), b === 0) {
          const y = w.map(() => "---").join(" | ");
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
    replacement: function(l) {
      return l;
    }
  }), n.addRule("datePill", {
    filter: (l) => l.nodeName === "SPAN" && l.getAttribute("data-type") === "date-pill",
    replacement: (l, c) => {
      const u = c.getAttribute("data-date");
      return u ? `@${C0(u)}@` : l;
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
      const u = c.parentNode;
      if (u && u.nodeName === "LI")
        return `
` + l.trimEnd() + `
`;
      const f = c.previousElementSibling, h = f && (f.nodeName === "UL" || f.nodeName === "OL");
      return `

` + l.trim() + `

`;
    }
  }), ft = n, n;
}
function Rk() {
  !ir && !ft && (ir = td().then((e) => (ft = e, e)));
}
function Lk() {
  return Rk(), {
    turndown(e) {
      return ft ? ft.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return ft !== null;
    },
    async ready() {
      ft || (ir ? await ir : await td());
    }
  };
}
function Ok() {
  const e = V(null);
  return e.current || (e.current = Lk()), e.current;
}
const _k = 2e3;
function $k(e) {
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
    onDestroy: h,
    onFocus: g,
    onBlur: p,
    onSelectionChange: b,
    onLinkClick: w,
    editorModeRef: v,
    rawMarkdownRef: y,
    setRawMarkdown: E,
    setIsLightweight: N,
    lightweightCheckCounterRef: x,
    isLightweightRef: S
  } = e, k = n && n.length > _k, D = V(k ? n : null), C = k ? "" : n, M = V(null), P = V(c), R = V(u), L = V(d), $ = V(null);
  P.current = c, R.current = u, L.current = d;
  const _ = _d({
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
    content: C,
    editable: o,
    autofocus: r,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-full",
        spellcheck: s ? "true" : "false"
      },
      handleClick: (A, O, Y) => {
        if (w) {
          const q = Y.target.closest("a");
          if (q) {
            const Z = q.getAttribute("href");
            if (Z && w(Z, Y) === !1)
              return Y.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: A }) => {
      if (i === "auto" && (x.current++, x.current >= 50)) {
        x.current = 0;
        const Y = A.state.doc.content.childCount > l;
        Y !== S.current && N(Y);
      }
      M.current && clearTimeout(M.current), M.current = setTimeout(() => {
        if (A.isDestroyed) return;
        const O = A.getHTML();
        (P.current || R.current) && (P.current?.(O), R.current?.(O));
      }, 150);
    },
    onFocus: () => {
      g?.();
    },
    onBlur: () => {
      if (M.current && (clearTimeout(M.current), M.current = null, _ && !_.isDestroyed)) {
        const A = _.getHTML();
        if ((P.current || R.current) && (P.current?.(A), R.current?.(A)), v.current === "wysiwyg" && $.current) {
          const O = $.current.turndown(A);
          y.current = O, L.current?.(nr(O));
        }
      }
      p?.();
    },
    onSelectionUpdate: ({ editor: A }) => {
      if (b) {
        const { from: O, to: Y, empty: j } = A.state.selection;
        b({ from: O, to: Y, empty: j });
      }
    }
  });
  G(() => {
    if (!D.current || !_ || _.isDestroyed) return;
    const A = D.current;
    D.current = null;
    const O = requestAnimationFrame(() => {
      const Y = setTimeout(() => {
        _.isDestroyed || _.commands.setContent(A);
      }, 0);
      _.__deferredTimerId = Y;
    });
    return () => {
      cancelAnimationFrame(O);
      const Y = _.__deferredTimerId;
      Y && clearTimeout(Y);
    };
  }, [_]), G(() => () => {
    if (M.current && (clearTimeout(M.current), M.current = null, _ && !_.isDestroyed)) {
      const A = _.getHTML();
      if ((P.current || R.current) && (P.current?.(A), R.current?.(A)), v.current === "wysiwyg" && $.current) {
        const O = $.current.turndown(A);
        y.current = O, L.current?.(nr(O));
      }
    }
  }, []);
  const K = Ok();
  $.current = K;
  const I = V(!1);
  return G(() => {
    if (!I.current && a === "markdown" && _ && !_.isDestroyed && K) {
      const A = _.getHTML(), O = K.turndown(A);
      E(O), y.current = O, I.current = !0;
    }
  }, [_, K, a]), { editor: _, turndownService: K };
}
function Bk(e) {
  const n = new DOMParser().parseFromString(`<div>${e}</div>`, "text/html"), o = n.body.firstElementChild;
  if (!o) return e;
  const r = (a) => {
    Array.from(a.querySelectorAll("ul")).forEach(r);
    const l = Array.from(a.children).filter((f) => f.tagName === "LI");
    let c = !1, u = !1;
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
    l.forEach((f) => {
      d(f) ? c = !0 : u = !0;
    }), c && (l.forEach((f) => {
      const h = d(f);
      if (h) {
        const g = h.hasAttribute("checked");
        f.setAttribute("data-type", "taskItem"), f.setAttribute("data-checked", String(g));
        const p = h.parentElement, b = p && p.tagName === "P" && p.parentElement === f;
        h.remove(), b && p.firstChild && p.firstChild.nodeType === Node.TEXT_NODE && (p.firstChild.textContent = (p.firstChild.textContent || "").replace(/^\s+/, ""));
        const w = Array.from(f.childNodes), v = [], y = [];
        w.forEach((N) => {
          if (N.nodeType === Node.ELEMENT_NODE) {
            const x = N;
            if (x.tagName === "UL" || x.tagName === "OL" || x.tagName === "P")
              y.push(N);
            else if (x.tagName === "IMG" || x.tagName === "FIGURE")
              if (x.tagName === "IMG") {
                const S = n.createElement("figure");
                S.className = "image-resizer";
                const k = x.getAttribute("data-align") || "left", D = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[k] || "margin-right: auto;";
                S.style.cssText = D, S.appendChild(x.cloneNode(!0)), y.push(S);
              } else
                y.push(N);
            else
              v.push(N);
          } else
            v.push(N);
        });
        const E = y.filter((N) => {
          if (N.nodeType === Node.ELEMENT_NODE) {
            const x = N;
            if (x.tagName === "P" && !x.textContent?.trim() && !x.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", v.length > 0) {
          const N = n.createElement("p");
          v.forEach((x) => N.appendChild(x)), N.firstChild && N.firstChild.nodeType === Node.TEXT_NODE && (N.firstChild.textContent = (N.firstChild.textContent || "").replace(/^\s+/, "")), (N.textContent?.trim() || N.querySelector("img, figure, code, br")) && f.appendChild(N);
        }
        E.forEach((N) => f.appendChild(N));
      }
    }), c && !u && a.setAttribute("data-type", "taskList"));
  };
  return Array.from(o.querySelectorAll(":scope > ul")).forEach(r), o.innerHTML;
}
function Wk(e) {
  const t = e.split(`
`), n = [], o = (l) => {
    const c = l.trimStart();
    return /^[-*+]\s+\[[ xX]\]\s/.test(c) ? "task" : /^[-*+]\s+/.test(c) ? "bullet" : /^\d+\.\s+/.test(c) ? "ordered" : null;
  }, r = (l) => {
    const c = l.match(/^( *)/);
    return c ? c[1].length : 0;
  }, s = (l) => /^\s{2,}\S/.test(l), a = (l) => l.trim() === "" || l.trim() === "​";
  let i = !1;
  for (let l = 0; l < t.length; l++) {
    const c = t[l];
    if (/^```/.test(c.trim())) {
      i = !i, n.push(c);
      continue;
    }
    if (i) {
      n.push(c);
      continue;
    }
    if (n.push(c), o(c) !== null || s(c)) {
      let u = l + 1;
      for (; u < t.length && s(t[u]); )
        u++;
      let d = 0;
      const f = u;
      for (; u < t.length && a(t[u]); )
        d++, u++;
      if (d > 0 && u < t.length) {
        const h = o(c), g = o(t[u]);
        if (h !== null && g !== null) {
          const p = r(c);
          if (r(t[u]) > p) {
            for (let w = f; w < u; w++)
              n.push(t[w]);
            l = u - 1;
            continue;
          }
          for (let w = f; w < u; w++)
            n.push(t[w]);
          n.push("<!-- list-break -->"), l = u - 1;
          continue;
        }
      }
    }
  }
  return n.join(`
`);
}
function Hk(e) {
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
          const h = n.createElement("figure");
          h.className = "image-resizer";
          const g = d.getAttribute("data-align") || "left", p = {
            left: "margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto;"
          };
          h.style.cssText = p[g] || "margin-right: auto;", h.appendChild(d.cloneNode(!0)), c.push(h);
        } else if (f === "P")
          if (d.querySelectorAll("img").length === 0)
            c.push(u);
          else {
            const g = Array.from(d.childNodes), p = [];
            if (g.forEach((b) => {
              if (b.nodeType === Node.ELEMENT_NODE && b.tagName === "IMG") {
                if (p.length > 0) {
                  const N = n.createElement("p");
                  p.forEach((x) => N.appendChild(x.cloneNode(!0))), N.textContent?.trim() && c.push(N), p.length = 0;
                }
                const w = b, v = n.createElement("figure");
                v.className = "image-resizer";
                const y = w.getAttribute("data-align") || "left", E = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                v.style.cssText = E[y] || "margin-right: auto;", v.appendChild(w.cloneNode(!0)), c.push(v);
              } else
                p.push(b);
            }), p.length > 0) {
              const b = n.createElement("p");
              p.forEach((w) => b.appendChild(w.cloneNode(!0))), b.textContent?.trim() && c.push(b);
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
function Fk(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (o) => o.replace(/<tr>([\s\S]*?)<\/tr>/gi, (r, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function ar(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function zk(e) {
  const t = e.match(/data-align="([^"]*)"/), n = t ? t[1] : "left";
  return `<figure class="image-resizer" style="${{
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[n] || "margin-right: auto;"}">${e.trim()}</figure>`;
}
function Za(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((o) => o.trim()).map((o) => /^<img\s/i.test(o) ? zk(o) : o.trim() ? `<p>${ar(o.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${ar(e)}</p>`;
}
function Uk(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, o = Math.floor(n / 2), r = e.trimStart(), s = r.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: o, text: s[2].trim(), checked: s[1] === "x" };
  const a = r.match(/^-\s+(.+)$/);
  if (a)
    return { type: "ul", depth: o, text: a[1].trim() };
  const i = r.match(/^(\d+)\.\s+(.+)$/);
  return i ? { type: "ol", depth: o, text: i[2].trim(), index: parseInt(i[1], 10) } : null;
}
function Yk(e) {
  if (e.length === 0) return "";
  const t = (r, s) => {
    let a = "", i = r;
    const l = e[i]?.type || "ul", c = l === "task", u = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, d = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (a += u; i < e.length && e[i].depth >= s; ) {
      const f = e[i];
      if (f.depth === s) {
        if (c ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${ar(f.text)}</p>` : a += `<li><p>${ar(f.text)}</p>`, i + 1 < e.length && e[i + 1].depth > s) {
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
function jk(e) {
  return e.replace(
    /(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi,
    (t, n, o, r) => {
      const s = /<img\s/i.test(o), a = /<br\s*\/?>/i.test(o), i = /(?:^|<br\s*\/?>)\s*(?:- |\d+\. )/i.test(o);
      if (!s && !a && !i) return t;
      let l = o.trim();
      l = l.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim();
      const c = l.split(/<br\s*\/?>/i).filter((h) => h.trim());
      if (c.length <= 1 && !i)
        return s ? `${n}${Za(l)}${r}` : t;
      const u = [];
      let d = [];
      const f = () => {
        d.length !== 0 && (u.push(Yk(d)), d = []);
      };
      for (const h of c) {
        const g = Uk(h);
        if (g) {
          if (d.length > 0) {
            const p = d[0].type;
            g.depth === 0 && g.type !== p && f();
          }
          d.push(g);
        } else
          f(), u.push(Za(h.trim()));
      }
      return f(), `${n}${u.join("")}${r}`;
    }
  );
}
function Vk(e, t, n = {}) {
  const {
    enableTagAutoDetect: o = !1,
    disableTagPills: r = !1,
    isValidTag: s,
    normalizeTag: a,
    parseDateFromMarkdown: i,
    getDateVariant: l
  } = n;
  let c = e;
  c = Wk(c);
  const u = /* @__PURE__ */ new Set(["info", "note", "prompt", "resources", "todo", "summary"]), d = c.split(`
`), f = [];
  let h = null, g = [];
  for (let b = 0; b < d.length; b++) {
    const w = d[b];
    if (h !== null)
      if (w.trimEnd() === "```") {
        const v = g.join(`
`).trim(), y = v ? t(v) : "";
        f.push(`<div data-callout="" data-type="${h}" class="callout callout-${h}">${y}</div>`), h = null, g = [];
      } else
        g.push(w);
    else {
      const v = w.match(/^```(?:ad-)?(\w+)\s*$/);
      v && u.has(v[1]) ? (h = v[1], g = []) : f.push(w);
    }
  }
  return h !== null && (f.push(`\`\`\`ad-${h}`), f.push(...g)), c = f.join(`
`), c = c.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (b, w, v) => {
    const y = w.split("|").map((D) => D.trim());
    let E = "", N = "left", x = null;
    y.length === 1 ? E = y[0] : y.length === 2 ? (E = y[0], /^\d+$/.test(y[1]) ? x = y[1] : ["left", "center", "right"].includes(y[1]) ? N = y[1] : E = w) : y.length === 3 ? (E = y[0], ["left", "center", "right"].includes(y[1]) && (N = y[1]), /^\d+$/.test(y[2]) && (x = y[2])) : E = w;
    const S = x ? ` width="${x}" style="width: ${x}px"` : "", k = ` data-align="${N}"`;
    return `<img src="${v.trim()}" alt="${E}"${k}${S} />`;
  }), c = c.replace(new RegExp("(?<!`)==((?:(?!==)[^\\n])+)==(?!`)", "g"), "<mark>$1</mark>"), i && l && (c = c.replace(/@([^@\n]+)@/g, (b, w) => {
    const v = i(w);
    if (v) {
      const y = l(v);
      return `<span data-type="date-pill" data-date="${v}" class="date-pill ${y}"><span class="date-icon">📅</span><span class="date-text">${w.trim()}</span></span>`;
    }
    return b;
  })), o && !r && s && a && (c = c.replace(
    new RegExp("(?:^|(?<=\\s))#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)(?=\\s|$|[.,;:!?)\\]])", "gm"),
    (b, w) => {
      const v = a(w);
      return s(v) ? `<span data-type="tag-pill" data-tag="${v}" class="tag-pill"><span class="tag-icon">#</span><span class="tag-text">${v}</span></span>` : b;
    }
  )), c = c.split(/(```[\s\S]*?```|`[^`\n]+`)/g).map((b, w) => w % 2 === 1 ? b : b.replace(/\[\[([^\[\]]+)\]\]/g, (v, y) => `<span data-wiki-link data-page-name="${y.trim()}" class="wiki-link">${y.trim()}</span>`)).join(""), c;
}
function Kk(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = Bk(t), t = Hk(t), t = Fk(t), t = jk(t), t = t.replace(
    /(<pre[^>]*>\s*<code[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/g,
    (n, o, r, s) => o + r.replace(/\n+$/, "") + s
  ), t;
}
function Gk(e, t, n = {}) {
  const o = Vk(e, t, n), r = t(o);
  return Kk(r);
}
function qk(e, t, n) {
  G(() => {
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
              const f = d[2] === "x", h = i.schema.nodes.taskList, g = i.schema.nodes.taskItem;
              if (h && g) {
                const p = i.tr, b = c.pos - u.length, w = c.pos;
                p.delete(b, w);
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
              r.preventDefault(), Vo(e, c.pos - 3, c.pos);
              return;
            }
            if (u === "—-") {
              r.preventDefault(), Vo(e, c.pos - 2, c.pos);
              return;
            }
            if (u === "—") {
              r.preventDefault(), Vo(e, c.pos - 1, c.pos);
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
function Xk({
  editorModeRef: e,
  rawMarkdownRef: t,
  editorMode: n,
  handleModeSwitch: o,
  setIsFindReplaceOpen: r,
  setFindReplaceFocusTrigger: s
}) {
  G(() => {
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
  }, [o]), G(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: n } }));
  }, [n]);
}
function Zk({
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
        const { marked: d } = await import("./marked.esm-Tjr8Gfse.js"), f = (p) => d.parse(p, { async: !1, breaks: !0 }), h = {
          enableTagAutoDetect: i,
          disableTagPills: !!l.tagPills,
          isValidTag: cn,
          normalizeTag: zn,
          parseDateFromMarkdown: Wt,
          getDateVariant: Si
        }, g = Gk(o.current, f, h);
        queueMicrotask(() => {
          e.isDestroyed || e.commands.setContent(g);
        });
      }
      r(u), n.current = u, a?.(u);
    }
  }, [e, t, a]);
}
const Qk = 200;
function Jk(e, t = {}) {
  const {
    debounceMs: n = 500,
    extendedStats: o = !1,
    enabled: r = !0
  } = t, [s, a] = U({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
    isCalculating: !1
  }), i = V(null), l = V(""), c = H((u) => {
    const d = u.trim(), f = d.length > 0 ? d.split(/\s+/).filter((v) => v.length > 0).length : 0, h = d.replace(/\s/g, "").length, g = u.length;
    let p = 0, b = 0;
    o && (p = d.length > 0 ? d.split(/\n\s*\n/).filter((v) => v.trim().length > 0).length : 0, b = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const w = Math.max(1, Math.ceil(f / Qk));
    return {
      words: f,
      characters: h,
      charactersWithSpaces: g,
      paragraphs: p,
      sentences: b,
      readingTime: w,
      isCalculating: !1
    };
  }, [o]);
  return G(() => {
    if (!e || !r) return;
    const u = () => {
      i.current && clearTimeout(i.current), a((d) => ({ ...d, isCalculating: !0 })), i.current = setTimeout(() => {
        try {
          const d = e.getText();
          if (d === l.current) {
            a((h) => ({ ...h, isCalculating: !1 }));
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
function ex({ status: e, lastSaved: t, className: n = "" }) {
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
        e === "idle" && t && /* @__PURE__ */ m(ye, { children: [
          /* @__PURE__ */ m(lm, { className: "w-3.5 h-3.5 text-muted-foreground" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 40,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-muted-foreground", children: [
            "Saved ",
            o(t)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 41,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 39,
          columnNumber: 9
        }, this),
        e === "saving" && /* @__PURE__ */ m(ye, { children: [
          /* @__PURE__ */ m(vl, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 47,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-cyan-500", children: "Saving..." }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 48,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 46,
          columnNumber: 9
        }, this),
        e === "saved" && /* @__PURE__ */ m(ye, { children: [
          /* @__PURE__ */ m(Vt, { className: "w-3.5 h-3.5 text-emerald-500" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 54,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-emerald-500", children: "Saved" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 55,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this),
        e === "error" && /* @__PURE__ */ m(ye, { children: [
          /* @__PURE__ */ m(cm, { className: "w-3.5 h-3.5 text-red-500" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 61,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m("span", { className: "text-red-500", children: "Save failed" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
            lineNumber: 62,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
          lineNumber: 60,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/AutoSaveIndicator.tsx",
      lineNumber: 34,
      columnNumber: 5
    },
    this
  );
}
function tx({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ m(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ m("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ m(um, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/RecoveryBanner.tsx",
            lineNumber: 22,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("span", { className: "text-sm recovery-banner-text", children: "We found unsaved content from your last session." }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/RecoveryBanner.tsx",
            lineNumber: 23,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/RecoveryBanner.tsx",
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
                /* @__PURE__ */ m(Xs, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/RecoveryBanner.tsx",
                  lineNumber: 33,
                  columnNumber: 11
                }, this),
                "Recover"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/RecoveryBanner.tsx",
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
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/RecoveryBanner.tsx",
                lineNumber: 43,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/RecoveryBanner.tsx",
              lineNumber: 37,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/RecoveryBanner.tsx",
          lineNumber: 28,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/RecoveryBanner.tsx",
      lineNumber: 18,
      columnNumber: 5
    },
    this
  );
}
function Wo(e) {
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
      const v = c[1].length;
      t.push({
        type: `heading${v}`,
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
      const v = u[2].toLowerCase() === "x";
      t.push({
        type: v ? "task-checked" : "task-list",
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
    for (const v of g) {
      let y;
      for (v.regex.lastIndex = 0; (y = v.regex.exec(i)) !== null; )
        p.push({
          start: l + y.index,
          end: l + y.index + y[0].length,
          type: v.type,
          content: y[0]
        });
    }
    p.sort((v, y) => v.start - y.start);
    const b = [];
    let w = l;
    for (const v of p)
      v.start >= w && (b.push(v), w = v.end);
    for (const v of b)
      v.start > l + h && t.push({
        type: "text",
        content: i.substring(h, v.start - l),
        start: l + h,
        end: v.start
      }), t.push({
        type: v.type,
        content: v.content,
        start: v.start,
        end: v.end
      }), h = v.end - l;
    h < i.length && t.push({
      type: "text",
      content: i.substring(h),
      start: l + h,
      end: l + i.length
    }), o += i.length + 1;
  }
  return t;
}
function Qa(e) {
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
function zt(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function Ho(e, t, n, o) {
  if (t.length === 0 && (!n || n.length === 0))
    return zt(e);
  let r = "";
  const s = e.split(`
`);
  let a = 0;
  if (!n || n.length === 0) {
    for (let l = 0; l < s.length; l++) {
      const c = s[l], u = a + c.length, d = t.filter((h) => h.start >= a && h.start < u);
      let f = a;
      for (const h of d)
        h.start > f && (r += zt(e.substring(f, h.start))), r += `<span class="${Qa(h.type)}">${zt(h.content)}</span>`, f = h.end;
      f < u && (r += zt(e.substring(f, u))), l < s.length - 1 && (r += `
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
    const c = s[l], u = a + c.length, d = t.filter((h) => h.start >= a && h.start < u);
    let f = a;
    for (const h of d)
      h.start > f && (r += ds(e, f, h.start, null, i)), r += ds(e, h.start, h.end, Qa(h.type), i), f = h.end;
    f < u && (r += ds(e, f, u, null, i)), l < s.length - 1 && (r += `
`), a = u + 1;
  }
  return r;
}
function ds(e, t, n, o, r) {
  let s = "", a = t;
  for (; a < n; ) {
    const i = r.get(a);
    if (i) {
      const l = a;
      for (; a < n && r.get(a)?.matchIdx === i.matchIdx; )
        a++;
      const c = zt(e.substring(l, a)), u = i.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      o ? s += `<span class="${o}"><mark class="${u}">${c}</mark></span>` : s += `<mark class="${u}">${c}</mark>`;
    } else {
      const l = a;
      for (; a < n && !r.has(a); )
        a++;
      const c = zt(e.substring(l, a));
      o ? s += `<span class="${o}">${c}</span>` : s += c;
    }
  }
  return s;
}
function nx({
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
  const c = V(null), u = V(null), d = V(null), f = V(null), h = 5e3, g = 80, [p, b] = U(() => {
    const k = Wo(e);
    return Ho(e, k, a, i);
  }), w = V(null), v = Ut(() => {
    if (e.length <= h) {
      const k = Wo(e), D = Ho(e, k, a, i);
      return w.current && (clearTimeout(w.current), w.current = null), D;
    }
    return null;
  }, [e, a, i]);
  G(() => {
    if (e.length <= h) {
      const k = Wo(e);
      b(Ho(e, k, a, i));
      return;
    }
    return w.current && clearTimeout(w.current), w.current = setTimeout(() => {
      const k = Wo(e);
      b(Ho(e, k, a, i)), w.current = null;
    }, g), () => {
      w.current && clearTimeout(w.current);
    };
  }, [e, a, i]);
  const y = v ?? p, E = H(() => {
    const k = c.current, D = u.current, C = d.current;
    if (k) {
      const M = C?.parentElement, P = M ? M.clientHeight : 200;
      k.style.height = "auto";
      const R = Math.max(k.scrollHeight, P, 200);
      k.style.height = `${R}px`, D && (D.style.height = `${R}px`);
    }
  }, []);
  G(() => {
    const k = c.current;
    if (!k) return;
    const D = (C) => {
      const M = k.closest(".editor-content-wrapper");
      if (!M) return;
      const { scrollTop: P, scrollHeight: R, clientHeight: L } = M, $ = P <= 0, _ = P + L >= R - 1;
      (C.deltaY > 0 && !_ || C.deltaY < 0 && !$) && (C.preventDefault(), M.scrollTop += C.deltaY);
    };
    return k.addEventListener("wheel", D, { passive: !1 }), () => k.removeEventListener("wheel", D);
  }, []);
  const N = H(() => {
  }, []);
  G(() => {
    E();
  }, [e, E]), G(() => {
    r && c.current && c.current.focus();
  }, [r]), G(() => {
    if (f.current && c.current) {
      const { start: k, end: D } = f.current;
      c.current.selectionStart = k, c.current.selectionEnd = D, f.current = null;
    }
  }, [e]);
  const x = H((k) => {
    const D = k.target;
    f.current = {
      start: D.selectionStart,
      end: D.selectionEnd
    }, t(D.value);
  }, [t]), S = H((k) => {
    const D = k.currentTarget, C = D.selectionStart, M = D.selectionEnd, P = D.value, R = C !== M;
    if (l) {
      if (k.key === "`" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), R) {
          const L = P.substring(C, M), $ = P.substring(0, C) + "`" + L + "`" + P.substring(M);
          f.current = { start: C + 1, end: M + 1 }, t($);
        } else if (P[C] === "`")
          f.current = { start: C + 1, end: C + 1 }, t(P), D.selectionStart = D.selectionEnd = C + 1;
        else {
          const L = P.substring(0, C) + "``" + P.substring(M);
          f.current = { start: C + 1, end: C + 1 }, t(L);
        }
        return;
      }
      if (k.key === "*" && !k.ctrlKey && !k.metaKey) {
        if (P[C - 1] === "*" && P[C], R) {
          k.preventDefault();
          const _ = P.substring(C, M), K = P.substring(0, C) + "*" + _ + "*" + P.substring(M);
          f.current = { start: C + 1, end: M + 1 }, t(K);
          return;
        }
        if (P[C] === "*") {
          k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(P.substring(0, C) + P.substring(C));
          return;
        }
        k.preventDefault();
        const $ = P.substring(0, C) + "**" + P.substring(M);
        f.current = { start: C + 1, end: C + 1 }, t($);
        return;
      }
      if (k.key === "_" && !k.ctrlKey && !k.metaKey) {
        if (R) {
          k.preventDefault();
          const $ = P.substring(C, M), _ = P.substring(0, C) + "_" + $ + "_" + P.substring(M);
          f.current = { start: C + 1, end: M + 1 }, t(_);
          return;
        }
        if (P[C] === "_") {
          k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(P.substring(0, C) + P.substring(C));
          return;
        }
        k.preventDefault();
        const L = P.substring(0, C) + "__" + P.substring(M);
        f.current = { start: C + 1, end: C + 1 }, t(L);
        return;
      }
      if (k.key === "~" && !k.ctrlKey && !k.metaKey) {
        if (R) {
          k.preventDefault();
          const $ = P.substring(C, M), _ = P.substring(0, C) + "~" + $ + "~" + P.substring(M);
          f.current = { start: C + 1, end: M + 1 }, t(_);
          return;
        }
        if (P[C] === "~") {
          k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(P.substring(0, C) + P.substring(C));
          return;
        }
        k.preventDefault();
        const L = P.substring(0, C) + "~~" + P.substring(M);
        f.current = { start: C + 1, end: C + 1 }, t(L);
        return;
      }
      if (k.key === "[" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), R) {
          const L = P.substring(C, M), $ = P.substring(0, C) + "[" + L + "]()" + P.substring(M);
          f.current = { start: M + 3, end: M + 3 }, t($);
        } else {
          const L = P.substring(0, C) + "[]()" + P.substring(M);
          f.current = { start: C + 1, end: C + 1 }, t(L);
        }
        return;
      }
      if (k.key === "]" && !k.ctrlKey && !k.metaKey && P[C] === "]") {
        k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(P.substring(0, C) + P.substring(C));
        return;
      }
      if (k.key === ")" && !k.ctrlKey && !k.metaKey && P[C] === ")") {
        k.preventDefault(), f.current = { start: C + 1, end: C + 1 }, t(P.substring(0, C) + P.substring(C));
        return;
      }
      if (k.key === "Backspace" && !R && C > 0) {
        const L = P[C - 1], $ = P[C], _ = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [K, I] of _)
          if (L === K && $ === I) {
            k.preventDefault();
            const A = P.substring(0, C - 1) + P.substring(C + 1);
            f.current = { start: C - 1, end: C - 1 }, t(A);
            return;
          }
        if (L === "[" && P.substring(C, C + 3) === "]()") {
          k.preventDefault();
          const K = P.substring(0, C - 1) + P.substring(C + 3);
          f.current = { start: C - 1, end: C - 1 }, t(K);
          return;
        }
      }
    }
    if (k.key === "Tab")
      if (k.preventDefault(), k.shiftKey) {
        const L = P.substring(0, C), $ = P.substring(C, M), _ = P.substring(M), I = L.lastIndexOf(`
`) + 1, A = L.substring(0, I), O = L.substring(I), Y = (O + $).split(`
`), j = Y.map((B) => B.startsWith("  ") ? B.substring(2) : B.startsWith("	") ? B.substring(1) : B), q = A + j.join(`
`) + _, Z = (O + $).length - j.join(`
`).length;
        f.current = {
          start: Math.max(I, C - (Y[0].length - j[0].length)),
          end: M - Z
        }, t(q);
      } else if (C === M) {
        const L = P.substring(0, C) + "  " + P.substring(M);
        f.current = { start: C + 2, end: C + 2 }, t(L);
      } else {
        const L = P.substring(0, C), $ = P.substring(C, M), _ = P.substring(M), I = L.lastIndexOf(`
`) + 1, A = L.substring(0, I), Y = (L.substring(I) + $).split(`
`), j = Y.map((Z) => "  " + Z), q = A + j.join(`
`) + _;
        f.current = {
          start: C + 2,
          end: M + Y.length * 2
        }, t(q);
      }
  }, [t, l]);
  return /* @__PURE__ */ m("div", { ref: d, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: u,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: y || `<span class="md-placeholder">${zt(n)}</span>` },
        "aria-hidden": "true"
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
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
        onChange: x,
        onKeyDown: S,
        onScroll: N,
        placeholder: "",
        disabled: !o,
        className: "syntax-textarea",
        spellCheck: !1
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
        lineNumber: 886,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SyntaxHighlightedMarkdown.tsx",
    lineNumber: 879,
    columnNumber: 5
  }, this);
}
let Ja = 0, Ls = 0, nd = 0;
function ox(e) {
  Ls++, nd = e;
}
const rx = jt(function({
  visible: t,
  onClose: n,
  editor: o
}) {
  const [r, s] = U(!1), [a, i] = U({
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
  }), l = V([]), c = V(performance.now()), u = V(0), d = V(0), f = V(0), h = V(0), [g, p] = U(new Array(60).fill(0)), [b, w] = U(new Array(60).fill(0));
  G(() => {
    if (!t || !o) return;
    const S = () => {
      const k = performance.now();
      queueMicrotask(() => {
        const D = performance.now() - k;
        ox(D);
      });
    };
    return o.on("transaction", S), () => {
      o.off("transaction", S);
    };
  }, [t, o]), G(() => {
    if (!t) return;
    let S = 0, k = performance.now(), D = 0;
    const C = (M) => {
      const P = M - c.current;
      if (c.current = M, l.current.push({ time: M, duration: P }), l.current.length > 120 && (l.current = l.current.slice(-120)), P > 16.67 && d.current++, S++, M - k >= 1e3) {
        D = S, S = 0, k = M;
        const R = l.current.slice(-60), L = R.length > 0 ? R.reduce((j, q) => j + q.duration, 0) / R.length : 0, $ = R.length > 0 ? Math.max(...R.map((j) => j.duration)) : 0, _ = performance.memory, K = _ ? _.usedJSHeapSize / (1024 * 1024) : 0, I = _ ? _.jsHeapSizeLimit / (1024 * 1024) : 0, A = document.querySelectorAll("*").length, O = Ja - f.current, Y = Ls - h.current;
        f.current = Ja, h.current = Ls, i({
          fps: D,
          frameTime: Math.round(L * 100) / 100,
          frameTimeMax: Math.round($ * 100) / 100,
          memoryUsed: Math.round(K * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: O,
          transactionCount: Y,
          lastTransactionTime: Math.round(nd * 100) / 100,
          domNodes: A,
          longFrames: d.current
        }), p((j) => [...j.slice(1), D]), w((j) => [...j.slice(1), L]), d.current = 0;
      }
      u.current = requestAnimationFrame(C);
    };
    return u.current = requestAnimationFrame(C), () => {
      cancelAnimationFrame(u.current);
    };
  }, [t]);
  const v = H(() => {
    n?.();
  }, [n]), y = H(() => {
    s((S) => !S);
  }, []);
  if (!t) return null;
  const E = (S) => S >= 55 ? "#4ade80" : S >= 30 ? "#fbbf24" : "#f87171", N = (S) => S <= 16.67 ? "#4ade80" : S <= 33.33 ? "#fbbf24" : "#f87171", x = (S, k, D) => {
    const P = S.map((R, L) => {
      const $ = L / (S.length - 1) * 120, _ = 24 - Math.min(R, k) / k * 24;
      return `${$},${_}`;
    }).join(" ");
    return /* @__PURE__ */ m("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ m(
      "polyline",
      {
        points: P,
        fill: "none",
        stroke: D,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 225,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 224,
      columnNumber: 7
    }, this);
  };
  return /* @__PURE__ */ m("div", { className: "perf-profiler-overlay", children: [
    /* @__PURE__ */ m("div", { className: "perf-profiler-header", children: [
      /* @__PURE__ */ m("div", { className: "perf-profiler-title", children: [
        /* @__PURE__ */ m(dm, { size: 14 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 241,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m("span", { children: "Performance" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 242,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 240,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-profiler-actions", children: [
        /* @__PURE__ */ m("button", { onClick: y, title: r ? "Expand" : "Minimize", children: r ? /* @__PURE__ */ m(wl, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 28
        }, this) : /* @__PURE__ */ m(Nl, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 54
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 245,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ m(ht, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 249,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 248,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 244,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 239,
      columnNumber: 7
    }, this),
    !r && /* @__PURE__ */ m("div", { className: "perf-profiler-body", children: [
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "FPS" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 259,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: E(a.fps) }, children: a.fps }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 260,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 258,
          columnNumber: 13
        }, this),
        x(g, 70, E(a.fps))
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 257,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Frame Time" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 270,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: N(a.frameTime) }, children: [
            a.frameTime,
            "ms"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 271,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 269,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Max" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 276,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value-sub", style: { color: N(a.frameTimeMax) }, children: [
            a.frameTimeMax,
            "ms"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 277,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 275,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: [
            "Jank (",
            ">",
            " 16.7ms)"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 282,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value-sub", style: { color: a.longFrames > 3 ? "#f87171" : "#4ade80" }, children: [
            a.longFrames,
            "/s"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 283,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 281,
          columnNumber: 13
        }, this),
        x(b, 50, N(a.frameTime))
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 268,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Renders/s" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 293,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: a.renderCount }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 294,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 292,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Transactions/s" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 297,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: a.transactionCount }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 298,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 296,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "perf-row perf-row-sub", children: [
          /* @__PURE__ */ m("span", { className: "perf-label-sub", children: "Last TX time" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 301,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value-sub", children: [
            a.lastTransactionTime,
            "ms"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 302,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 300,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 291,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("div", { className: "perf-section", children: [
        /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "DOM Nodes" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 309,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: a.domNodes.toLocaleString() }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 310,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 308,
          columnNumber: 13
        }, this),
        a.memoryTotal > 0 && /* @__PURE__ */ m("div", { className: "perf-row", children: [
          /* @__PURE__ */ m("span", { className: "perf-label", children: "Memory" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 314,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ m("span", { className: "perf-value", children: [
            a.memoryUsed,
            "MB / ",
            a.memoryTotal,
            "MB"
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 315,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 313,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
        lineNumber: 307,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
      lineNumber: 255,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
    lineNumber: 237,
    columnNumber: 5
  }, this);
});
class sx extends Wd {
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
      return /* @__PURE__ */ m("div", { className: ie("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ m("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ m("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ m(mm, { className: "w-6 h-6 text-destructive" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 140,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 139,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ m("h3", { className: "text-base font-semibold text-foreground", children: "Editor encountered an error" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 145,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s ? "The editor keeps crashing. The content may be malformed — try clearing it to recover." : "Something went wrong while rendering the editor. Your content is safe — try one of the recovery options below." }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 148,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
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
                /* @__PURE__ */ m(Xs, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
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
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
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
                /* @__PURE__ */ m(un, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 176,
                  columnNumber: 19
                }, this),
                "Clear Content & Retry"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 170,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 156,
          columnNumber: 13
        }, this),
        t && /* @__PURE__ */ m("div", { className: "w-full max-w-xs", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: this.toggleDetails,
              className: ie(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ m(Dt, { className: "w-3 h-3" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 193,
                  columnNumber: 21
                }, this) : /* @__PURE__ */ m(gl, { className: "w-3 h-3" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 195,
                  columnNumber: 21
                }, this),
                "Error details"
              ]
            },
            void 0,
            !0,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 185,
              columnNumber: 17
            },
            this
          ),
          n && /* @__PURE__ */ m("div", { className: "mt-2 p-3 rounded-md bg-muted/50 border border-border text-left overflow-auto max-h-40", children: [
            /* @__PURE__ */ m("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ m("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Error" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                lineNumber: 203,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ m(
                "button",
                {
                  onClick: this.handleCopyError,
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: r ? /* @__PURE__ */ m(ye, { children: [
                    /* @__PURE__ */ m(fm, { className: "w-3 h-3 text-green-500" }, void 0, !1, {
                      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 210,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ m("span", { className: "text-green-500", children: "Copied" }, void 0, !1, {
                      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 211,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                    lineNumber: 209,
                    columnNumber: 27
                  }, this) : /* @__PURE__ */ m(ye, { children: [
                    /* @__PURE__ */ m(Kt, { className: "w-3 h-3" }, void 0, !1, {
                      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 215,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ m("span", { children: "Copy" }, void 0, !1, {
                      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                      lineNumber: 216,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                    lineNumber: 214,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 204,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 202,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ m("p", { className: "text-xs font-mono text-muted-foreground break-all", children: t.message }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 221,
              columnNumber: 21
            }, this),
            t.stack && /* @__PURE__ */ m("pre", { className: "text-[10px] font-mono text-muted-foreground/70 mt-2 whitespace-pre-wrap break-all", children: t.stack.split(`
`).slice(1, 6).join(`
`) }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
              lineNumber: 225,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
            lineNumber: 201,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
          lineNumber: 184,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
        lineNumber: 137,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
        lineNumber: 136,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
function ix({ className: e = "", theme: t }) {
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
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 28,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("83%") }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 29,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("66%") }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 30,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: { height: "0.75rem" } }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 31,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("100%") }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 32,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { style: n("75%") }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorLoadingSkeleton.tsx",
          lineNumber: 33,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorLoadingSkeleton.tsx",
      lineNumber: 24,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorLoadingSkeleton.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
function ax({ editorMode: e, onModeSwitch: t }) {
  return /* @__PURE__ */ m("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
    /* @__PURE__ */ m(
      "button",
      {
        onClick: () => t("wysiwyg"),
        className: `editor-mode-toggle-btn ${e === "wysiwyg" ? "active" : ""}`,
        title: "Visual Editor",
        children: /* @__PURE__ */ m(hm, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorModeToggle.tsx",
          lineNumber: 19,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorModeToggle.tsx",
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
        children: /* @__PURE__ */ m(Zs, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorModeToggle.tsx",
          lineNumber: 26,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorModeToggle.tsx",
        lineNumber: 21,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorModeToggle.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}
const $e = ({ onMouseDown: e, isActive: t, disabled: n, children: o, title: r }) => /* @__PURE__ */ m(
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
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 55,
    columnNumber: 3
  },
  void 0
), ms = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }, void 0, !1, {
  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
  lineNumber: 74,
  columnNumber: 3
}, void 0), el = [
  { label: "Paragraph", value: "paragraph", shortLabel: "P" },
  { label: "Heading 1", value: "h1", shortLabel: "H1" },
  { label: "Heading 2", value: "h2", shortLabel: "H2" },
  { label: "Heading 3", value: "h3", shortLabel: "H3" },
  { label: "Heading 4", value: "h4", shortLabel: "H4" },
  { label: "Heading 5", value: "h5", shortLabel: "H5" }
], lx = jt(function({ editor: t, isH1: n, isH2: o, isH3: r, isH4: s, isH5: a, executeCommand: i }) {
  const [l, c] = U(!1), u = V(null), d = n ? "h1" : o ? "h2" : r ? "h3" : s ? "h4" : a ? "h5" : "paragraph", f = el.find((g) => g.value === d)?.shortLabel || "P";
  G(() => {
    if (!l) return;
    const g = (p) => {
      u.current && !u.current.contains(p.target) && c(!1);
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [l]);
  const h = (g, p) => {
    if (g.preventDefault(), g.stopPropagation(), p === "paragraph")
      t.chain().focus().setParagraph().run();
    else {
      const b = parseInt(p.replace("h", ""));
      t.chain().focus().toggleHeading({ level: b }).run();
    }
    c(!1);
  };
  return /* @__PURE__ */ m("div", { ref: u, className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ m(
      "button",
      {
        onMouseDown: (g) => {
          g.preventDefault(), g.stopPropagation(), c(!l);
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
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 148,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(Dt, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${l ? "rotate-180" : ""}` }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 149,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 131,
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
        children: el.map((g) => {
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
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
                  lineNumber: 177,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ m("span", { children: g.label }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
                  lineNumber: 178,
                  columnNumber: 17
                }, this)
              ]
            },
            g.value,
            !0,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 165,
              columnNumber: 15
            },
            this
          );
        })
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 153,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 130,
    columnNumber: 5
  }, this);
}), cx = jt(function({ onCopy: t, iconSize: n }) {
  const [o, r] = U(!1), s = V(null);
  G(() => () => {
    s.current && clearTimeout(s.current);
  }, []);
  const a = H((i) => {
    i.preventDefault(), i.stopPropagation(), t(), r(!0), s.current && clearTimeout(s.current), s.current = setTimeout(() => r(!1), 1500);
  }, [t]);
  return /* @__PURE__ */ m(
    $e,
    {
      onMouseDown: a,
      title: o ? "Copied!" : "Copy as Markdown",
      children: o ? /* @__PURE__ */ m(Vt, { size: n, className: "text-green-500" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 212,
        columnNumber: 17
      }, this) : /* @__PURE__ */ m(Kt, { size: n }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 212,
        columnNumber: 72
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 208,
      columnNumber: 5
    },
    this
  );
}), ux = jt(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: o = !1, aiEnabled: r = !1, onAISparklesClick: s, onCopySelectionAsMarkdown: a }) {
  const i = V(null), l = al({
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
  }), [c, u] = U(!1), [d, f] = U(""), [h, g] = U(!1), [p, b] = U({ top: 0, left: 0 }), w = V(null), v = V(null), y = V(null), E = H(() => {
    if (d) {
      let C = d.trim();
      !/^https?:\/\//i.test(C) && !C.startsWith("mailto:") && (C = "https://" + C), t.chain().focus().extendMarkRange("link").setLink({ href: C }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    u(!1), f("");
  }, [t, d]), N = (C) => {
    C.preventDefault(), C.stopPropagation();
    const M = t.getAttributes("link").href;
    f(M || ""), u(!0);
  }, x = H((C, M) => {
    C.preventDefault(), C.stopPropagation(), M();
  }, []);
  G(() => {
    if (!t || t.isDestroyed) return;
    const C = () => {
      if (!t.isDestroyed)
        try {
          const { selection: M } = t.state, { empty: P, from: R, to: L } = M, K = ("node" in M && M.node ? M.node : null)?.type?.name === "resizableImage";
          if (P || K || t.isActive("codeBlock")) {
            y.current && (clearTimeout(y.current), y.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              g(!1), u(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const I = t.view.coordsAtPos(R), A = t.view.coordsAtPos(L), O = w.current?.offsetWidth || 500, Y = w.current?.offsetHeight || 40, j = 8, q = window.innerWidth;
          let Z = 0, B = 0;
          if (w.current) {
            const de = w.current.closest('[data-slot="dialog-content"]');
            if (de) {
              const ge = de.getBoundingClientRect();
              Z = ge.left, B = ge.top;
            }
          }
          let F = (I.left + A.left) / 2 - O / 2 - Z;
          const Q = Z ? q - Z : q;
          F = Math.max(j, Math.min(Q - O - j, F));
          let ce = I.top - Y - 10 - B;
          ce < j && (ce = A.bottom + 10 - B), h ? b({ top: Math.max(j, ce), left: F }) : (y.current && clearTimeout(y.current), y.current = setTimeout(() => {
            b({ top: Math.max(j, ce), left: F }), g(!0);
          }, 50));
        } catch (M) {
          console.warn("FloatingToolbar: Error updating position", M);
        }
    };
    return t.on("selectionUpdate", C), () => {
      t.off("selectionUpdate", C), v.current && clearTimeout(v.current), y.current && clearTimeout(y.current);
    };
  }, [t, h]), G(() => {
    if (!h || !t || t.isDestroyed) return;
    const C = t.view.dom.closest(".editor-content") || t.view.dom.parentElement;
    if (!C) return;
    const M = () => {
      g(!1), u(!1);
    };
    return C.addEventListener("scroll", M, { passive: !0 }), window.addEventListener("scroll", M, { passive: !0 }), () => {
      C.removeEventListener("scroll", M), window.removeEventListener("scroll", M);
    };
  }, [h, t]);
  const S = (C) => {
    v.current && (clearTimeout(v.current), v.current = null);
  };
  if (!h || o)
    return null;
  const k = 15, D = c ? /* @__PURE__ */ m(
    "div",
    {
      ref: w,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: p.top,
        left: p.left
      },
      onMouseDown: S,
      children: /* @__PURE__ */ m("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-2 w-[280px] sm:w-auto", children: [
        /* @__PURE__ */ m(
          "input",
          {
            type: "url",
            placeholder: "Enter URL...",
            value: d,
            onChange: (C) => f(C.target.value),
            onKeyDown: (C) => {
              C.key === "Enter" && (C.preventDefault(), E()), C.key === "Escape" && (u(!1), f(""));
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
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 440,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ m("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onMouseDown: (C) => {
                C.preventDefault(), E();
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
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 464,
              columnNumber: 11
            },
            this
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
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 477,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 463,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
        lineNumber: 439,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 429,
      columnNumber: 5
    },
    this
  ) : /* @__PURE__ */ m(
    "div",
    {
      ref: w,
      className: `floating-toolbar ${n}`,
      style: {
        position: "fixed",
        top: p.top,
        left: p.left
      },
      onMouseDown: S,
      children: [
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleBold().run()),
            isActive: l?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(Bs, { size: k }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 511,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 506,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleItalic().run()),
            isActive: l?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m(Ws, { size: k }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 518,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 513,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleUnderline().run()),
            isActive: l?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(Hs, { size: k }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 525,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 520,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleStrike().run()),
            isActive: l?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(Fs, { size: k }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 532,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 527,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleCode().run()),
            isActive: l?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(ul, { size: k }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 539,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 534,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleHighlight().run()),
            isActive: l?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ m(dl, { size: k }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 546,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 541,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: N,
            isActive: l?.isLink,
            title: "Link (Ctrl+K)",
            children: /* @__PURE__ */ m(zs, { size: k }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 554,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 549,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(ms, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 557,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m(
          lx,
          {
            editor: t,
            isH1: l?.isH1 ?? !1,
            isH2: l?.isH2 ?? !1,
            isH3: l?.isH3 ?? !1,
            isH4: l?.isH4 ?? !1,
            isH5: l?.isH5 ?? !1,
            executeCommand: x
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 560,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleBlockquote().run()),
            isActive: l?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(Vs, { size: k }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 574,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 569,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleBulletList().run()),
            isActive: l?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(Us, { size: k }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 581,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 576,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleOrderedList().run()),
            isActive: l?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m(Ys, { size: k }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 588,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 583,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (C) => x(C, () => t.chain().focus().toggleTaskList().run()),
            isActive: l?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m(js, { size: k }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 595,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 590,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ m(
          $e,
          {
            onMouseDown: (C) => x(C, () => ti(t)),
            isActive: l?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(pm, { size: k }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 602,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 597,
            columnNumber: 7
          },
          this
        ),
        a && /* @__PURE__ */ m(ye, { children: [
          /* @__PURE__ */ m(ms, {}, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 608,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(cx, { onCopy: a, iconSize: k }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 609,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 607,
          columnNumber: 9
        }, this),
        r && /* @__PURE__ */ m(ye, { children: [
          /* @__PURE__ */ m(ms, {}, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 616,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              ref: i,
              onMouseDown: (C) => {
                C.preventDefault(), C.stopPropagation(), i.current && s?.(i.current);
              },
              title: "AI Writing Assistant",
              className: `
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            `,
              children: /* @__PURE__ */ m(dr, { size: k }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
                lineNumber: 634,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
              lineNumber: 617,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 615,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
      lineNumber: 495,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(vt, { onMouseDown: S, children: D }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 642,
    columnNumber: 5
  }, this);
});
function dx({ editor: e, isOpen: t, onClose: n }) {
  const [o, r] = U(""), s = V(null), a = V(null), [i, l] = U({ top: 0, left: 0 });
  G(() => {
    if (t) {
      const g = e.getAttributes("link").href || "";
      r(g);
      try {
        const { view: p } = e, { from: b } = p.state.selection, w = p.coordsAtPos(b), v = w.bottom + 8, y = Math.max(16, Math.min(w.left, window.innerWidth - 420));
        l({ top: v, left: y });
      } catch {
        l({ top: 200, left: window.innerWidth / 2 - 160 });
      }
      setTimeout(() => {
        s.current?.focus(), s.current?.select();
      }, 50);
    }
  }, [t, e]), G(() => {
    if (!t) return;
    const g = (v) => {
      a.current && !a.current.contains(v.target) && n();
    }, p = () => {
      n();
    }, b = setTimeout(() => {
      document.addEventListener("mousedown", g);
    }, 10), w = e.view.dom.closest(".editor-content-wrapper");
    return w?.addEventListener("scroll", p), () => {
      clearTimeout(b), document.removeEventListener("mousedown", g), w?.removeEventListener("scroll", p);
    };
  }, [t, n, e]);
  const c = H((g) => {
    if (g?.preventDefault(), o.trim()) {
      let p = o.trim();
      !/^https?:\/\//i.test(p) && !p.startsWith("mailto:") && (p = "https://" + p), e.chain().focus().extendMarkRange("link").setLink({ href: p }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [o, e, n]), u = H((g) => {
    g.key === "Escape" ? (g.preventDefault(), n()) : g.key === "Enter" && (g.preventDefault(), c());
  }, [n, c]);
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
      children: /* @__PURE__ */ m("form", { onSubmit: c, className: "link-popover-form", children: [
        /* @__PURE__ */ m("div", { className: "link-popover-input-wrapper", children: [
          /* @__PURE__ */ m($s, { className: "link-popover-icon", size: 16 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
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
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
              lineNumber: 141,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
          lineNumber: 139,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ m("div", { className: "link-popover-hint", children: "Press Enter to save · Escape to cancel" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
          lineNumber: 153,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
        lineNumber: 138,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
      lineNumber: 128,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(vt, { children: h }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
    lineNumber: 161,
    columnNumber: 10
  }, this);
}
function mx() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
function fx({ editor: e, onEditLink: t }) {
  const [n, o] = U({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), r = V(null), s = V(null), a = V(null), i = H((N) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const x = N.getAttribute("href") || "", S = N.getBoundingClientRect(), k = S.bottom + 8, D = Math.max(16, Math.min(S.left, window.innerWidth - 340));
        a.current = N, o({
          isVisible: !0,
          url: x,
          position: { top: k, left: D },
          linkElement: N
        });
      } catch (x) {
        console.warn("LinkHoverTooltip: Error showing tooltip", x);
      }
    }
  }, [e]), l = H(() => {
    s.current = setTimeout(() => {
      a.current = null, o((N) => ({ ...N, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), c = H(() => {
    s.current && (clearTimeout(s.current), s.current = null), a.current = null, o((N) => ({ ...N, isVisible: !1, linkElement: null }));
  }, []), u = H(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  G(() => {
    if (!e || e.isDestroyed) return;
    const N = e.view.dom;
    if (!N) return;
    const x = (k) => {
      const C = k.target.closest("a");
      C && N.contains(C) && i(C);
    }, S = (k) => {
      const D = k.target, C = k.relatedTarget;
      if (D.closest("a")) {
        if (C && r.current?.contains(C))
          return;
        l();
      }
    };
    return N.addEventListener("mouseover", x), N.addEventListener("mouseout", S), () => {
      N.removeEventListener("mouseover", x), N.removeEventListener("mouseout", S), s.current && clearTimeout(s.current);
    };
  }, [e, i, l]), G(() => {
    if (!e || e.isDestroyed) return;
    const N = e.view.dom;
    if (!N) return;
    const x = (S) => {
      const D = S.target.closest("a");
      if (D && N.contains(D)) {
        if (a.current === D && n.isVisible)
          return;
        S.preventDefault(), S.stopPropagation(), i(D);
      }
    };
    return N.addEventListener("touchend", x, { capture: !0 }), () => {
      N.removeEventListener("touchend", x, { capture: !0 });
    };
  }, [e, i, n.isVisible]), G(() => {
    if (!n.isVisible || !mx()) return;
    const N = (S) => {
      const k = S.target;
      r.current?.contains(k) || a.current && a.current.contains(k) || c();
    }, x = setTimeout(() => {
      document.addEventListener("touchstart", N, { passive: !0 });
    }, 100);
    return () => {
      clearTimeout(x), document.removeEventListener("touchstart", N);
    };
  }, [n.isVisible, c]), G(() => {
    if (!n.isVisible) return;
    const N = () => {
      c();
    }, x = e.view.dom.closest(".editor-content-wrapper");
    return x?.addEventListener("scroll", N), window.addEventListener("scroll", N, !0), () => {
      x?.removeEventListener("scroll", N), window.removeEventListener("scroll", N, !0);
    };
  }, [n.isVisible, e, c]);
  const [d, f] = U(!1), h = H(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      f(!0), setTimeout(() => f(!1), 1500);
    });
  }, [n.url]), g = H(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), p = H(() => {
    if (n.linkElement) {
      const { view: N } = e, { doc: x } = N.state;
      let S = null, k = null;
      x.descendants((D, C) => {
        if (D.isText && D.marks.some((M) => M.type.name === "link")) {
          const M = N.nodeDOM(C);
          if (M && (M === n.linkElement || M.parentElement === n.linkElement))
            return S = C, k = C + D.nodeSize, !1;
        }
        return !0;
      }), S !== null && k !== null ? e.chain().focus().setTextSelection({ from: S, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    o((N) => ({ ...N, isVisible: !1 }));
  }, [e, n.linkElement]), b = H(() => {
    if (n.linkElement) {
      const { view: N } = e, { doc: x } = N.state;
      x.descendants((S, k) => {
        if (S.isText && S.marks.some((D) => D.type.name === "link")) {
          const D = N.nodeDOM(k);
          if (D && (D === n.linkElement || D.parentElement === n.linkElement))
            return e.chain().focus().setTextSelection({ from: k, to: k + S.nodeSize }).run(), !1;
        }
        return !0;
      });
    }
    o((N) => ({ ...N, isVisible: !1 })), t();
  }, [e, n.linkElement, t]);
  if (!n.isVisible) return null;
  const w = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, y = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", E = /* @__PURE__ */ m(
    "div",
    {
      ref: r,
      className: "link-hover-tooltip",
      "data-theme": y,
      style: {
        position: "fixed",
        top: `${n.position.top}px`,
        left: `${n.position.left}px`
      },
      onMouseEnter: u,
      onMouseLeave: l,
      children: /* @__PURE__ */ m("div", { className: "link-hover-tooltip-content", children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: g,
            className: "link-hover-tooltip-link",
            title: n.url,
            children: [
              /* @__PURE__ */ m(gm, { size: 13, className: "link-hover-tooltip-link-icon" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 331,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "link-hover-tooltip-url", children: w || "No URL" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 332,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
            lineNumber: 326,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ m("div", { className: "link-hover-tooltip-actions", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: b,
              className: "link-hover-tooltip-btn",
              title: "Edit link",
              children: /* @__PURE__ */ m(bm, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 343,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 338,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: h,
              className: "link-hover-tooltip-btn",
              title: "Copy link",
              children: d ? /* @__PURE__ */ m(Vt, { size: 14, style: { color: "var(--primary)" } }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 352,
                columnNumber: 23
              }, this) : /* @__PURE__ */ m(Kt, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 352,
                columnNumber: 81
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 347,
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
              children: /* @__PURE__ */ m(vm, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
                lineNumber: 361,
                columnNumber: 13
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
              lineNumber: 356,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
          lineNumber: 336,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
        lineNumber: 324,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
      lineNumber: 312,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(vt, { children: E }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
    lineNumber: 369,
    columnNumber: 10
  }, this);
}
const hx = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(ur, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 64,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(wm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 70,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(Nm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 76,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(ym, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 82,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(km, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 88,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(xm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 94,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ m(Us, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 100,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ m(Ys, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 106,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ m(js, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 112,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ m(Vs, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 118,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ m(ml, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 124,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ m(fs, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 130,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ m(_s, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
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
    icon: /* @__PURE__ */ m(fl, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 143,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ m(Go, { size: 16, className: "text-blue-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 149,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ m(pl, { size: 16, className: "text-purple-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 155,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ m(hl, { size: 16, className: "text-amber-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 161,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ m(Ks, { size: 16, className: "text-green-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 167,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ m(Gs, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 173,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ m(bl, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 179,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ m($s, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 185,
      columnNumber: 11
    }, void 0),
    command: (e) => {
      const t = window.prompt("Enter page name:");
      t && e.chain().focus().insertContent(`[[${t}]]`).run();
    },
    keywords: ["wiki", "internal", "page", "link", "backlink"]
  }
], px = 32, gx = 8, bx = 320, vx = 210, Fo = 12;
function tl(e) {
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
function wx({ editor: e }) {
  const [t, n] = U(!1), [o, r] = U(""), [s, a] = U(0), [i, l] = U(null), [c, u] = U(!1), [d, f] = U({ top: 0, left: 0 }), [h, g] = U("below"), p = V(null), b = V(-1), w = V(!1);
  G(() => {
    w.current = t;
  }, [t]);
  const v = hx.filter((D) => {
    if (!o) return !0;
    const C = o.toLowerCase();
    return D.title.toLowerCase().includes(C) || D.keywords?.some((M) => M.includes(C));
  }), y = Math.min(
    v.length * px + gx,
    bx
  );
  cr(() => {
    if (!t || !i) return;
    const { top: D, bottom: C, left: M } = i, P = window.innerHeight, R = window.innerWidth, L = P - C - Fo, $ = D - Fo;
    let _;
    if (L >= y ? _ = "below" : $ >= y ? _ = "above" : _ = L >= $ ? "below" : "above", g(_), p.current) {
      const K = Math.max(
        Fo,
        Math.min(M, R - vx - Fo)
      ), I = _ === "below" ? C + 4 : D - y - 4;
      p.current.style.top = `${I}px`, p.current.style.left = `${K}px`;
    }
  }, [t, i, y, v.length]);
  const E = H(() => {
    const { state: D } = e, { selection: C } = D, M = C.from, P = b.current;
    if (P >= 0 && P <= M)
      e.chain().focus().deleteRange({ from: P, to: M }).run();
    else {
      const { $from: R } = C, $ = R.parent.textBetween(0, R.parentOffset, void 0, "￼").lastIndexOf("/");
      if ($ !== -1) {
        const _ = R.pos - (R.parentOffset - $);
        e.chain().focus().deleteRange({ from: _, to: R.pos }).run();
      }
    }
  }, [e]), N = H(() => {
    n(!1), r(""), a(0), b.current = -1, l(null);
  }, []), x = H((D) => {
    const C = v[D];
    if (C) {
      if (E(), C.isImageCommand) {
        const { state: M } = e, P = e.view.coordsAtPos(M.selection.from);
        f({
          top: P.bottom + 8,
          left: P.left
        }), u(!0);
      } else
        C.command(e);
      N();
    }
  }, [e, v, E, N]), S = H((D, C) => {
    e.chain().focus().setImage({ src: D, alt: C }).run();
  }, [e]);
  return G(() => {
    if (!e) return;
    const D = () => {
      if (w.current) return;
      const { state: C } = e, { selection: M } = C, { $from: P } = M;
      if (P.parentOffset === 0) return;
      const R = P.parent.textBetween(0, P.parentOffset, void 0, "￼");
      if (!R.endsWith("/")) return;
      const L = R.length > 1 ? R.slice(-2, -1) : "";
      if (L && L !== " " && L !== `
`) return;
      b.current = P.pos - 1;
      const $ = tl(e);
      $ && (l($), n(!0), r(""), a(0));
    };
    return e.on("update", D), () => {
      e.off("update", D);
    };
  }, [e]), G(() => {
    if (!e || !t) return;
    const D = e.view.dom, C = (M) => {
      w.current && (M.key === "ArrowDown" ? (M.preventDefault(), M.stopPropagation(), a((P) => (P + 1) % v.length)) : M.key === "ArrowUp" ? (M.preventDefault(), M.stopPropagation(), a((P) => (P - 1 + v.length) % v.length)) : M.key === "Enter" ? (M.preventDefault(), M.stopPropagation(), x(s)) : M.key === "Escape" && (M.preventDefault(), M.stopPropagation(), N()));
    };
    return D.addEventListener("keydown", C, !0), () => {
      D.removeEventListener("keydown", C, !0);
    };
  }, [e, t, s, v, x, N]), G(() => {
    if (!e || !t) return;
    const D = () => {
      if (!w.current || b.current < 0) return;
      const { state: C } = e, { selection: M } = C, P = M.from, R = b.current;
      if (P <= R) {
        N();
        return;
      }
      try {
        const L = C.doc.textBetween(R + 1, P, void 0, "￼");
        if (L.includes(`
`)) {
          N();
          return;
        }
        r(L), a(0);
        const $ = tl(e);
        $ && l($);
      } catch {
        N();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, t, N]), G(() => {
    if (!t) return;
    const D = (C) => {
      p.current && !p.current.contains(C.target) && N();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [t, N]), G(() => {
    t && v.length === 0 && o.length > 2 && N();
  }, [t, v.length, o, N]), G(() => {
    s >= v.length && a(Math.max(0, v.length - 1));
  }, [v.length, s]), G(() => {
    if (!t || !p.current) return;
    const D = p.current.querySelector(".slash-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [t, s]), c ? /* @__PURE__ */ m(
    El,
    {
      isOpen: c,
      onClose: () => u(!1),
      onInsert: S,
      position: d
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 530,
      columnNumber: 7
    },
    this
  ) : !t || v.length === 0 ? null : /* @__PURE__ */ m(vt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: p,
      className: `slash-menu ${h === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: v.map((D, C) => /* @__PURE__ */ m(
        "div",
        {
          className: `slash-item ${C === s ? "is-selected" : ""}`,
          onClick: (M) => {
            M.preventDefault(), M.stopPropagation(), x(C);
          },
          onMouseEnter: () => a(C),
          children: [
            /* @__PURE__ */ m("span", { className: "slash-icon", children: D.icon }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
              lineNumber: 569,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m("span", { className: "slash-label", children: D.title }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
              lineNumber: 570,
              columnNumber: 11
            }, this)
          ]
        },
        D.title,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
          lineNumber: 559,
          columnNumber: 9
        },
        this
      ))
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 549,
      columnNumber: 5
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
    lineNumber: 548,
    columnNumber: 5
  }, this);
}
const Nx = 340, yx = 36, kx = 8, xx = 240, zo = 8;
function nl(e) {
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
function Cx({ editor: e, onSearch: t, onCreateItem: n }) {
  const [o, r] = U(!1), [s, a] = U(""), [i, l] = U([]), [c, u] = U(0), [d, f] = U(null), [h, g] = U("below"), [p, b] = U(!1), w = V(!1), v = V(null), y = V(-1), E = V(null);
  G(() => {
    w.current = o;
  }, [o]);
  const N = H(() => {
    r(!1), a(""), l([]), u(0), y.current = -1;
  }, []), x = H((M) => {
    const P = y.current;
    if (P < 0) return;
    const { state: R } = e, L = R.selection.from;
    try {
      const $ = R.tr.delete(P, L), _ = R.schema.marks.wikiLink;
      if (_) {
        const K = _.create({ pageName: M }), I = R.schema.text(M, [K]);
        $.insert(P, I);
        const A = P + M.length;
        $.setSelection(Ve.create($.doc, A)), $.removeStoredMark(_);
      } else
        $.insertText(`[[${M}]]`, P);
      e.view.dispatch($), e.view.focus();
    } catch ($) {
      console.warn("WikiLinkAutocomplete: Error inserting link", $);
    }
    N();
  }, [e, N]);
  G(() => {
    if (!e) return;
    const M = () => {
      if (w.current) return;
      const { state: P } = e, { selection: R } = P, { $from: L } = R;
      if (L.parentOffset < 2 || !L.parent.textBetween(0, L.parentOffset, void 0, "￼").endsWith("[[")) return;
      y.current = L.pos - 2;
      const _ = nl(e);
      _ && (f(_), r(!0), a(""), l([]), u(0));
    };
    return e.on("update", M), () => {
      e.off("update", M);
    };
  }, [e]), G(() => {
    if (!e || !o) return;
    const M = e.view.dom, P = (R) => {
      if (w.current) {
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
          R.preventDefault(), R.stopPropagation(), c < i.length ? x(i[c].title) : s.trim() && n ? (n(s.trim()), N()) : s.trim() && x(s.trim());
          return;
        }
        if (R.key === "Escape") {
          R.preventDefault(), N();
          return;
        }
        R.key === "]" && setTimeout(() => {
          const { state: L } = e, { $from: $ } = L.selection;
          $.parent.textBetween(0, $.parentOffset, void 0, "￼").endsWith("]]") && N();
        }, 0);
      }
    };
    return M.addEventListener("keydown", P, !0), () => {
      M.removeEventListener("keydown", P, !0);
    };
  }, [e, o, i, c, s, x, N, n]), G(() => {
    if (!e || !o) return;
    const M = () => {
      const P = y.current;
      if (P < 0) {
        N();
        return;
      }
      const { state: R } = e, L = R.selection.from;
      if (L <= P) {
        N();
        return;
      }
      try {
        const $ = R.doc.textBetween(P + 2, L, void 0, "￼");
        if ($.includes(`
`) || $.includes("]]")) {
          N();
          return;
        }
        a($), u(0);
        const _ = nl(e);
        _ && f(_);
      } catch {
        N();
      }
    };
    return e.on("update", M), e.on("selectionUpdate", M), () => {
      e.off("update", M), e.off("selectionUpdate", M);
    };
  }, [e, o, N]), G(() => {
    if (o) {
      if (E.current && clearTimeout(E.current), !s.trim()) {
        b(!0), E.current = setTimeout(async () => {
          try {
            const M = await t("");
            l(M);
          } catch {
            l([]);
          }
          b(!1);
        }, 100);
        return;
      }
      return b(!0), E.current = setTimeout(async () => {
        try {
          const M = await t(s.trim());
          l(M);
        } catch {
          l([]);
        }
        b(!1);
      }, 150), () => {
        E.current && clearTimeout(E.current);
      };
    }
  }, [o, s, t]), G(() => {
    if (!o) return;
    const M = (P) => {
      v.current && !v.current.contains(P.target) && N();
    };
    return document.addEventListener("mousedown", M), () => document.removeEventListener("mousedown", M);
  }, [o, N]), G(() => {
    if (!o || !v.current) return;
    const M = v.current.querySelector(".wikilink-item.is-selected");
    M && M.scrollIntoView({ block: "nearest" });
  }, [o, c]);
  const S = i.length + (s.trim() ? 1 : 0), k = Math.min(
    Math.max(S, 1) * yx + kx,
    xx
  );
  if (cr(() => {
    if (!o || !d) return;
    const { top: M, bottom: P, left: R } = d, L = window.innerHeight, $ = window.innerWidth, _ = L - P - zo, K = M - zo;
    let I;
    if (_ >= k ? I = "below" : K >= k ? I = "above" : I = _ >= K ? "below" : "above", g(I), v.current) {
      const A = Math.max(
        zo,
        Math.min(R, $ - Nx - zo)
      ), O = I === "below" ? P + 4 : M - k - 4;
      v.current.style.top = `${O}px`, v.current.style.left = `${A}px`;
    }
  }, [o, d, k, S]), !o) return null;
  const D = s.trim() && !i.some((M) => M.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ m(vt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: v,
      className: `wikilink-menu ${h === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: [
        p && i.length === 0 && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Searching..." }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 366,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 365,
          columnNumber: 9
        }, this),
        i.map((M, P) => /* @__PURE__ */ m(
          "div",
          {
            className: `wikilink-item ${P === c ? "is-selected" : ""}`,
            onMouseDown: (R) => {
              R.preventDefault(), x(M.title);
            },
            onMouseEnter: () => u(P),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Zs, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 380,
                columnNumber: 13
              }, this) }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 379,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: M.title }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 382,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-type", children: M.type }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 383,
                columnNumber: 11
              }, this)
            ]
          },
          M.id,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 370,
            columnNumber: 9
          },
          this
        )),
        D && /* @__PURE__ */ m(
          "div",
          {
            className: `wikilink-item wikilink-create ${i.length === c ? "is-selected" : ""}`,
            onMouseDown: (M) => {
              M.preventDefault(), n ? (n(s.trim()), N()) : x(s.trim());
            },
            onMouseEnter: () => u(i.length),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(qs, { size: 14 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 401,
                columnNumber: 13
              }, this) }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 400,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m("span", { className: "wikilink-label", children: [
                "Create “",
                s.trim(),
                "”"
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
                lineNumber: 403,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
            lineNumber: 387,
            columnNumber: 9
          },
          this
        ),
        !p && i.length === 0 && !s.trim() && /* @__PURE__ */ m("div", { className: "wikilink-item wikilink-loading", children: /* @__PURE__ */ m("span", { className: "wikilink-label", style: { color: "var(--muted-foreground)" }, children: "Type to search items..." }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 408,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
          lineNumber: 407,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
      lineNumber: 355,
      columnNumber: 5
    },
    this
  ) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WikiLinkAutocomplete.tsx",
    lineNumber: 354,
    columnNumber: 5
  }, this);
}
function Tx({
  src: e,
  alt: t,
  position: n,
  onSave: o,
  onDelete: r,
  onClose: s
}) {
  const [a, i] = U(e), [l, c] = U(t), u = V(null), d = V(null);
  G(() => {
    d.current?.focus(), d.current?.select();
  }, []), G(() => {
    const b = (v) => {
      u.current && !u.current.contains(v.target) && s();
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", b);
    };
  }, [s]), G(() => {
    const b = (w) => {
      w.key === "Escape" ? s() : w.key === "Enter" && (w.metaKey || w.ctrlKey) && f();
    };
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, [a, l, s]);
  const f = () => {
    a.trim() && o(a.trim(), l.trim());
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
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
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
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 146,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
              lineNumber: 141,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 139,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("div", { className: "image-edit-popover-content", children: [
          /* @__PURE__ */ m("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ m("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(zs, { className: "w-3.5 h-3.5" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 155,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { children: "Image URL" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 156,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
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
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 158,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 153,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("div", { className: "image-edit-popover-field", children: [
            /* @__PURE__ */ m("label", { className: "image-edit-popover-label", children: [
              /* @__PURE__ */ m(ur, { className: "w-3.5 h-3.5" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 171,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { children: "Alt Text" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 172,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
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
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 174,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 169,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
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
              children: /* @__PURE__ */ m(un, { className: "w-4 h-4" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 191,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
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
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
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
                  /* @__PURE__ */ m(Vt, { className: "w-4 h-4" }, void 0, !1, {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                    lineNumber: 205,
                    columnNumber: 13
                  }, this),
                  "Save"
                ]
              },
              void 0,
              !0,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
                lineNumber: 200,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
            lineNumber: 193,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
          lineNumber: 185,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
      lineNumber: 129,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(vt, { children: p }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
    lineNumber: 213,
    columnNumber: 10
  }, this);
}
function Ex({ containerRef: e, enabled: t = !0 }) {
  const [n, o] = U(!1), [r, s] = U(0), a = H((u) => {
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
  return G(() => {
    if (!t || !e.current) return;
    const u = e.current;
    return u.addEventListener("dragenter", a), u.addEventListener("dragleave", i), u.addEventListener("dragover", l), u.addEventListener("drop", c), () => {
      u.removeEventListener("dragenter", a), u.removeEventListener("dragleave", i), u.removeEventListener("dragover", l), u.removeEventListener("drop", c);
    };
  }, [t, e, a, i, l, c]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ m("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(Cm, { className: "w-12 h-12" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 84,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m("div", { className: "image-drop-zone-text", children: [
      /* @__PURE__ */ m("span", { className: "image-drop-zone-title", children: "Drop image here" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageDropZone.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ m("span", { className: "image-drop-zone-subtitle", children: "Release to insert image into the editor" }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageDropZone.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageDropZone.tsx",
      lineNumber: 86,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageDropZone.tsx",
    lineNumber: 82,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageDropZone.tsx",
    lineNumber: 81,
    columnNumber: 5
  }, this) : null;
}
const Sx = {
  SpellCheck: Em,
  RefreshCw: Tm,
  Minimize2: Nl,
  Maximize2: wl,
  FileText: Zs,
  MessageSquare: yl,
  Sparkles: dr
};
function Mx({ actions: e, scope: t, onAction: n, onClose: o, position: r }) {
  const [s, a] = U(""), [i, l] = U(!1), c = V(null), u = V(null), d = e.filter((b) => b.scope === t || b.scope === "both");
  G(() => {
    const b = (v) => {
      c.current && !c.current.contains(v.target) && o();
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 50);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", b);
    };
  }, [o]), G(() => {
    const b = (w) => {
      w.key === "Escape" && o();
    };
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, [o]), G(() => {
    i && u.current && u.current.focus();
  }, [i]);
  const h = H(() => {
    const w = d.length * 40 + (i ? 56 : 0) + 16, v = window.innerWidth, y = window.innerHeight;
    let E = r.top, N = r.left;
    return N + 260 > v - 8 && (N = v - 260 - 8), N < 8 && (N = 8), E + w > y - 8 && (E = r.top - w - 8), E < 8 && (E = 8), { top: E, left: N };
  }, [r, d.length, i])(), g = () => {
    s.trim() && (n("custom", s.trim()), a(""), l(!1));
  }, p = /* @__PURE__ */ m(
    "div",
    {
      ref: c,
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
              /* @__PURE__ */ m(yl, { size: 14, className: "text-muted-foreground shrink-0" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
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
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
                  lineNumber: 143,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 141,
              columnNumber: 11
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 140,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ m("div", { className: "h-px bg-border mx-2 my-0.5" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
              lineNumber: 167,
              columnNumber: 9
            }, this),
            d.filter((b) => !b.showCustomPrompt).map((b) => {
              const w = b.icon ? Sx[b.icon] : dr;
              return /* @__PURE__ */ m(
                "button",
                {
                  className: `
                  flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left
                  hover:bg-secondary/80 transition-colors duration-75
                  text-foreground
                `,
                  onMouseDown: (v) => {
                    v.preventDefault(), n(b.id);
                  },
                  children: [
                    w && /* @__PURE__ */ m(w, { size: 15, className: "text-muted-foreground shrink-0" }, void 0, !1, {
                      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
                      lineNumber: 187,
                      columnNumber: 35
                    }, this),
                    /* @__PURE__ */ m("span", { children: b.label }, void 0, !1, {
                      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
                      lineNumber: 188,
                      columnNumber: 17
                    }, this)
                  ]
                },
                b.id,
                !0,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
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
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
          lineNumber: 131,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
      lineNumber: 122,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(vt, { onMouseDown: (b) => b.preventDefault(), children: p }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
    lineNumber: 197,
    columnNumber: 5
  }, this);
}
function Dx({
  state: e,
  position: t,
  onReplace: n,
  onInsert: o,
  onRetry: r,
  onDiscard: s
}) {
  const a = V(null), i = V(null), [l, c] = U(!1), [u, d] = U(0);
  G(() => {
    if (a.current) {
      const N = new ResizeObserver((x) => {
        for (const S of x)
          d(S.contentRect.height);
      });
      return N.observe(a.current), () => N.disconnect();
    }
  }, []), G(() => {
    i.current && e.status === "streaming" && (i.current.scrollTop = i.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), G(() => {
    const N = (x) => {
      x.key === "Escape" && s();
    };
    return document.addEventListener("keydown", N), () => document.removeEventListener("keydown", N);
  }, [s]);
  const f = Ut(() => {
    const k = window.innerWidth, D = window.innerHeight;
    let C = t.selectionCenterX - 380 / 2;
    C + 380 > k - 8 && (C = k - 380 - 8), C < 8 && (C = 8);
    const M = D - t.selectionBottom - 8, P = t.selectionTop - 8, R = u || 200;
    let L, $ = !1;
    return M >= R || M >= P ? L = t.selectionBottom + 8 : (L = t.selectionTop - 8 - R, $ = !0), L < 8 && (L = 8), L + R > D - 8 && (L = D - R - 8), { top: L, left: C, placedAbove: $ };
  }, [t, u]), h = e.status === "streaming" || e.status === "complete" ? e.result : "", g = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", p = e.status === "streaming", b = e.status === "complete", w = e.status === "error", v = H(() => {
    navigator.clipboard.writeText(h), c(!0), setTimeout(() => c(!1), 1500);
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
                p && /* @__PURE__ */ m(vl, { size: 12, className: "animate-spin" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 173,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ m("span", { className: "font-medium", children: w ? "Error" : g }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 174,
                  columnNumber: 13
                }, this),
                p && /* @__PURE__ */ m("span", { className: "opacity-60", children: "Generating…" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 177,
                  columnNumber: 29
                }, this)
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 172,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ m(
                "button",
                {
                  className: "p-0.5 rounded hover:bg-secondary transition-colors",
                  onMouseDown: (N) => {
                    N.preventDefault(), s();
                  },
                  title: "Discard",
                  children: /* @__PURE__ */ m(ht, { size: 14, className: "text-muted-foreground" }, void 0, !1, {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 184,
                    columnNumber: 13
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 179,
                  columnNumber: 11
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
              lineNumber: 171,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ m(
              "div",
              {
                ref: i,
                className: "px-3 py-2.5 max-h-[200px] overflow-y-auto text-sm leading-relaxed",
                children: w ? /* @__PURE__ */ m("div", { className: "text-destructive", children: e.message }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 194,
                  columnNumber: 13
                }, this) : /* @__PURE__ */ m("div", { className: "whitespace-pre-wrap", children: [
                  h,
                  p && /* @__PURE__ */ m("span", { className: "inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" }, void 0, !1, {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 201,
                    columnNumber: 17
                  }, this)
                ] }, void 0, !0, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 198,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 189,
                columnNumber: 9
              },
              this
            ),
            /* @__PURE__ */ m("div", { className: "flex items-center gap-1.5 px-3 py-2 border-t border-border bg-secondary/20", children: [
              (b || w) && /* @__PURE__ */ m(ye, { children: [
                b && /* @__PURE__ */ m(ye, { children: [
                  /* @__PURE__ */ m(
                    ln,
                    {
                      icon: hs,
                      label: "Replace",
                      onClick: n,
                      primary: !0
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 213,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ m(
                    ln,
                    {
                      icon: qs,
                      label: "Insert",
                      onClick: o
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 219,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ m(
                    ln,
                    {
                      icon: l ? Vt : Kt,
                      label: l ? "Copied" : "Copy",
                      onClick: v
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                      lineNumber: 224,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 212,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ m(
                  ln,
                  {
                    icon: Xs,
                    label: "Retry",
                    onClick: r
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 231,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ m("div", { className: "flex-1" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 236,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ m(
                  ln,
                  {
                    icon: ht,
                    label: "Discard",
                    onClick: s
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 237,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 210,
                columnNumber: 13
              }, this),
              p && /* @__PURE__ */ m(ye, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 246,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ m(
                  ln,
                  {
                    icon: ht,
                    label: "Stop",
                    onClick: s
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                    lineNumber: 247,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                lineNumber: 245,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
              lineNumber: 208,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 162,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
      lineNumber: 153,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ m(vt, { onMouseDown: (N) => N.preventDefault(), children: E }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
    lineNumber: 260,
    columnNumber: 5
  }, this);
}
function ln({
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
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 291,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m("span", { children: t }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
          lineNumber: 292,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
      lineNumber: 280,
      columnNumber: 5
    },
    this
  );
}
function Ax({
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
  onCopySelectionAsMarkdown: u,
  aiDropdown: d,
  aiActions: f,
  onAIActionSelect: h,
  onAIDropdownClose: g,
  aiState: p,
  aiPopoverPosition: b,
  onAIReplace: w,
  onAIInsert: v,
  onAIRetry: y,
  onAIDiscard: E,
  onLinkPopoverClose: N,
  onEditLink: x,
  onWikiLinkSearch: S,
  imageEditState: k,
  onImageSave: D,
  onImageDelete: C,
  onImageEditClose: M
}) {
  return /* @__PURE__ */ m(ye, { children: [
    !n.images && !n.dragAndDrop && /* @__PURE__ */ m(Ex, { containerRef: o, enabled: r }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 114,
      columnNumber: 9
    }, this),
    !t && s && /* @__PURE__ */ m(
      ux,
      {
        editor: e,
        suppressWhenLinkPopoverOpen: a,
        aiEnabled: i || !!l,
        onAISparklesClick: (P) => c(P),
        onCopySelectionAsMarkdown: u
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 119,
        columnNumber: 9
      },
      this
    ),
    d && f && /* @__PURE__ */ m(
      Mx,
      {
        actions: f,
        scope: d.scope,
        position: d.position,
        onAction: h,
        onClose: g
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 130,
        columnNumber: 9
      },
      this
    ),
    p.status !== "idle" && /* @__PURE__ */ m(
      Dx,
      {
        state: p,
        position: b,
        onReplace: w,
        onInsert: v,
        onRetry: y,
        onDiscard: E
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 141,
        columnNumber: 9
      },
      this
    ),
    !n.slashCommands && /* @__PURE__ */ m(wx, { editor: e, disabledFeatures: n }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 153,
      columnNumber: 9
    }, this),
    !n.wikiLinks && S && /* @__PURE__ */ m(Cx, { editor: e, onSearch: S }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 158,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m(
      dx,
      {
        editor: e,
        isOpen: a,
        onClose: N
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 162,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ m(fx, { editor: e, onEditLink: x }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 169,
      columnNumber: 7
    }, this),
    !n.images && k?.isOpen && /* @__PURE__ */ m(
      Tx,
      {
        src: k.src,
        alt: k.alt,
        position: k.position,
        onSave: D,
        onDelete: C,
        onClose: M
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
        lineNumber: 173,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
    lineNumber: 111,
    columnNumber: 5
  }, this);
}
function Px({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function Ix(e, t) {
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
function Rx(e) {
  const [t, n] = Hd(Ix, { status: "idle" }), o = V(null), r = H(async (i, l, c, u, d) => {
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
const od = "paragon-editor-toc-width", Lx = 280, rd = 200, sd = 500;
function ol() {
  try {
    const e = localStorage.getItem(od);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= rd && t <= sd)
        return t;
    }
  } catch {
  }
  return Lx;
}
function Ox(e) {
  try {
    localStorage.setItem(od, String(e));
  } catch {
  }
}
function _x(e, t, n) {
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
function $x(e) {
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
function rl(e, t) {
  try {
    const n = e.state.doc.resolve(t), o = e.view.nodeDOM(n.before(n.depth + 1));
    if (o instanceof HTMLElement) return o;
    const r = e.view.nodeDOM(t);
    if (r instanceof HTMLElement) return r;
  } catch {
  }
  return null;
}
const sl = jt(function({
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
  scrollOffset: h = 20,
  onItemClick: g,
  renderItem: p,
  showToggleButton: b = !0,
  scrollContainerRef: w
}) {
  const [v, y] = U([]), [E, N] = U(null), [x, S] = U(n), [k, D] = U(/* @__PURE__ */ new Set()), [C, M] = U(() => {
    if (d) {
      const W = parseInt(d, 10);
      return isNaN(W) ? ol() : W;
    }
    return ol();
  }), P = V(null), R = V(null), L = V(!1), $ = V(0), _ = V(0);
  G(() => {
    S(n);
  }, [n]);
  const K = H((W) => {
    W.preventDefault(), W.stopPropagation(), L.current = !0, $.current = W.clientX, _.current = C, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [C]);
  G(() => {
    const W = (Q) => {
      if (!L.current) return;
      const ce = f === "right" ? $.current - Q.clientX : Q.clientX - $.current, de = Math.min(sd, Math.max(rd, _.current + ce));
      M(de);
    }, F = () => {
      L.current && (L.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", M((Q) => (Ox(Q), Q)));
    };
    return document.addEventListener("mousemove", W), document.addEventListener("mouseup", F), () => {
      document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", F);
    };
  }, [f]);
  const I = H(() => {
    if (!t || t.isDestroyed) return;
    const W = _x(t, s, a);
    y(W), E && !W.find((F) => F.id === E) && N(null);
  }, [t, s, a, E]);
  G(() => {
    if (!t) return;
    const W = () => {
      R.current && clearTimeout(R.current), R.current = setTimeout(() => I(), 300);
    };
    return I(), t.on("update", W), t.on("create", W), () => {
      t.off("update", W), t.off("create", W), R.current && clearTimeout(R.current);
    };
  }, [t, I]), G(() => {
    if (!t || !l || !x || v.length === 0) return;
    const W = w?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!W) return;
    const F = () => {
      const de = W.getBoundingClientRect();
      let ge = null;
      for (let Me = v.length - 1; Me >= 0; Me--) {
        const Ue = v[Me], wt = rl(t, Ue.pos);
        if (wt && wt.getBoundingClientRect().top - de.top <= h + 10) {
          ge = Ue.id;
          break;
        }
      }
      !ge && v.length > 0 && (ge = v[0].id), N(ge);
    };
    let Q;
    const ce = () => {
      cancelAnimationFrame(Q), Q = requestAnimationFrame(F);
    };
    return W.addEventListener("scroll", ce, { passive: !0 }), F(), () => {
      W.removeEventListener("scroll", ce), cancelAnimationFrame(Q);
    };
  }, [t, v, l, x, h, w]);
  const A = H((W) => {
    if (!t || t.isDestroyed) return;
    const F = rl(t, W.pos);
    if (F) {
      const Q = w?.current || t.view.dom.closest(".editor-content-wrapper");
      if (Q) {
        const ce = Q.getBoundingClientRect(), ge = F.getBoundingClientRect().top - ce.top + Q.scrollTop;
        Q.scrollTo({ top: ge - h, behavior: "smooth" });
      } else
        F.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(W.pos + 1);
    } catch {
    }
    N(W.id), g?.(W);
  }, [t, h, g, w]), O = H(() => {
    const W = !x;
    S(W), o?.(W);
  }, [x, o]), Y = H((W) => {
    D((F) => {
      const Q = new Set(F);
      return Q.has(W) ? Q.delete(W) : Q.add(W), Q;
    });
  }, []), j = H((W, F, Q = 0) => {
    if (p)
      return p(W, F, () => A(W));
    const ce = (W.level - s) * 14, de = c && W.children && W.children.length > 0, ge = k.has(W.id);
    return /* @__PURE__ */ m(
      "div",
      {
        className: `toc-item ${F ? "toc-item-active" : ""} toc-level-${W.level}`,
        style: { paddingLeft: `${ce + 10}px` },
        children: /* @__PURE__ */ m(
          "button",
          {
            className: "toc-item-button",
            onClick: () => A(W),
            title: W.text,
            children: [
              de && /* @__PURE__ */ m(
                "span",
                {
                  className: "toc-collapse-toggle",
                  onClick: (Me) => {
                    Me.stopPropagation(), Y(W.id);
                  },
                  children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: ge ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 340,
                    columnNumber: 21
                  }, this) : /* @__PURE__ */ m("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 341,
                    columnNumber: 21
                  }, this) }, void 0, !1, {
                    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                    lineNumber: 338,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                  lineNumber: 331,
                  columnNumber: 13
                },
                this
              ),
              i && /* @__PURE__ */ m("span", { className: "toc-level-indicator", children: [
                "H",
                W.level
              ] }, void 0, !0, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 347,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m("span", { className: "toc-item-text", children: W.text }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 349,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 325,
            columnNumber: 9
          },
          this
        )
      },
      W.id,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 320,
        columnNumber: 7
      },
      this
    );
  }, [p, A, c, s, i, k, Y]), q = H((W, F = 0) => W.map((Q) => {
    const ce = E === Q.id, de = k.has(Q.id), ge = Q.children && Q.children.length > 0;
    return /* @__PURE__ */ m("div", { children: [
      j(Q, ce, F),
      ge && !de && /* @__PURE__ */ m("div", { className: "toc-children", children: q(Q.children, F + 1) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 364,
        columnNumber: 13
      }, this)
    ] }, Q.id, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
      lineNumber: 361,
      columnNumber: 9
    }, this);
  }), [E, k, j]), Z = H(() => v.map((W) => {
    const F = E === W.id;
    return j(W, F);
  }), [v, E, j]);
  if (!t) return null;
  const B = c ? $x(v) : [];
  return /* @__PURE__ */ m(ye, { children: [
    b && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: O,
        title: x ? "Hide Table of Contents" : "Show Table of Contents",
        children: x ? /* @__PURE__ */ m(Sm, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 393,
          columnNumber: 24
        }, this) : /* @__PURE__ */ m(Mm, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 393,
          columnNumber: 56
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 388,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m(
      "div",
      {
        ref: P,
        className: `toc-sidebar ${x ? "toc-visible" : "toc-hidden"} toc-${f} ${u}`,
        style: { width: x ? `${C}px` : "0px" },
        children: [
          x && /* @__PURE__ */ m(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: K
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 405,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m("div", { className: "toc-inner", children: [
            r && /* @__PURE__ */ m("div", { className: "toc-header", children: /* @__PURE__ */ m("span", { className: "toc-title", children: r }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 415,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 414,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m("div", { className: "toc-content toc-content-with-toggle", children: v.length === 0 ? /* @__PURE__ */ m("div", { className: "toc-empty", children: [
              /* @__PURE__ */ m("p", { children: "No headings yet" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 423,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ m("p", { className: "toc-empty-hint", children: "Add headings to see the outline." }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 424,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 422,
              columnNumber: 15
            }, this) : /* @__PURE__ */ m("div", { className: "toc-list", children: c ? q(B) : Z() }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 427,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 420,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 411,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 398,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
    lineNumber: 385,
    columnNumber: 5
  }, this);
}), Bx = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, $1 = Fd(function({
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
  autoSave: h = !0,
  autoSaveKey: g = "paragon-editor-content",
  autoSaveDelay: p = 1e3,
  showRecoveryBanner: b = !0,
  showFloatingToolbar: w = !0,
  maxImageSize: v = 5 * 1024 * 1024,
  onImageUploadStart: y,
  onImageUploadComplete: E,
  onImageUploadError: N,
  onImageUpload: x,
  resolveImageSrc: S,
  showModeToggle: k = !0,
  // New props
  initialMode: D = "wysiwyg",
  onModeChange: C,
  onReady: M,
  onFocus: P,
  onBlur: R,
  onSelectionChange: L,
  onDestroy: $,
  onSave: _,
  onRecover: K,
  onWikiLinkClick: I,
  validateWikiLink: A,
  onWikiLinkSearch: O,
  onLinkClick: Y,
  findReplaceOpen: j,
  onFindReplaceChange: q,
  renderToolbar: Z,
  renderFooter: B,
  disabledFeatures: W = {},
  minHeight: F = "200px",
  maxHeight: Q,
  spellCheck: ce = !0,
  headingLevels: de = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: ge = [1, 2, 3],
  // TOC props
  showTableOfContents: Me = !1,
  tocVisible: Ue = !0,
  onTocVisibilityChange: wt,
  tocTitle: Dn = "",
  tocMinLevel: An = 1,
  tocMaxLevel: so = 4,
  tocShowLevelIndicators: io = !1,
  tocHighlightActive: ao = !0,
  tocTreeView: lo = !1,
  tocWidth: co = "240px",
  tocPosition: Rt = "right",
  tocScrollOffset: Zt = 20,
  onTocItemClick: Qt,
  renderTocItem: uo,
  tocShowToggleButton: mo = !0,
  // Raw markdown editor
  autoClosePairs: Mr = !0,
  // Performance profiler
  showPerformanceProfiler: Dr = !1,
  onPerformanceProfilerClose: Ar,
  // Auto reorder checklist
  autoReorderChecklist: Pr = !1,
  // Expand selection
  progressiveSelectAll: Ir = !1,
  // Auto-detection toggles
  enableTagAutoDetect: fo = !1,
  enableHexColorHighlight: Rr = !1,
  enableCollapsibleHeadings: Lr = !1,
  enableCollapsibleLists: Or = !1,
  // Performance mode
  performanceMode: Jt = "auto",
  // Error boundary
  onEditorError: _r,
  // AI writing assistant
  aiActions: oe,
  onAIAction: me,
  onAISetupRequired: ne
}, he) {
  const [De] = U(() => Bx()), [ue, $r] = U(D), [ho, Pn] = U(""), Nt = V(D), yt = V(""), In = V(null), [ld, Mi] = U(0), po = !!(oe && oe.length > 0 && me), { state: Ye, executeAction: go, abort: cd, reset: kt } = Rx(me), [ud, Br] = U(null), [dd, md] = U({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), fd = V(me);
  fd.current = me;
  const Di = V(ne);
  Di.current = ne;
  const [hd, pd] = U([]), [gd, bd] = U(0), vd = H((se, Te) => {
    pd(se), bd(Te);
  }, []), Ai = V(y), Pi = V(E), Ii = V(N), Ri = V(x), Li = V(S), Oi = V(I), _i = V(A), $i = V(O);
  Ai.current = y, Pi.current = E, Ii.current = N, Ri.current = x, Li.current = S, Oi.current = I, _i.current = A, $i.current = O;
  const Bi = 2e3, [Wr, wd] = U(() => Jt === "lightweight" ? !0 : Jt === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > Bi : !1), Nd = V(0), Wi = V(Wr);
  Wi.current = Wr;
  const [Hr, bo] = U(null), yd = Ik({
    placeholder: s,
    isMobile: De,
    maxImageSize: v,
    headingLevels: de,
    collapsibleHeadingLevels: ge,
    disabledFeatures: W,
    progressiveSelectAll: Ir,
    enableCollapsibleHeadings: Lr,
    enableCollapsibleLists: Or,
    enableTagAutoDetect: fo,
    enableHexColorHighlight: Rr,
    isLightweight: Wr,
    setImageEditState: bo,
    callbackRefs: {
      onImageUploadStart: Ai,
      onImageUploadComplete: Pi,
      onImageUploadError: Ii,
      onImageUpload: Ri,
      resolveImageSrc: Li,
      onWikiLinkClick: Oi,
      validateWikiLink: _i
    }
  }), { editor: re, turndownService: vo } = $k({
    extensions: yd,
    content: t,
    editable: a,
    autofocus: i,
    spellCheck: ce,
    initialMode: D,
    performanceMode: Jt,
    lightweightThreshold: Bi,
    onChange: n,
    onHTMLChange: o,
    onMarkdownChange: r,
    onReady: M,
    onDestroy: $,
    onFocus: P,
    onBlur: R,
    onSelectionChange: L,
    onLinkClick: Y,
    editorModeRef: Nt,
    rawMarkdownRef: yt,
    setRawMarkdown: Pn,
    setIsLightweight: wd,
    lightweightCheckCounterRef: Nd,
    isLightweightRef: Wi
  }), [kd, wo] = U(!1), [xd, Cd] = U(!1), Td = j !== void 0 ? j : xd, Lt = H((se) => {
    Cd(se), q?.(se);
  }, [q]), [Ed, No] = U(0), [Sd, Md] = U(""), Ot = Uv(re, {
    storageKey: g,
    debounceMs: p,
    enabled: h,
    onSave: (se) => {
      _?.(se);
    },
    onRecover: (se) => {
      K?.(se);
    }
  }), Fr = Zk({
    editor: re,
    turndownService: vo,
    editorModeRef: Nt,
    rawMarkdownRef: yt,
    setEditorMode: $r,
    setRawMarkdown: Pn,
    onModeChange: C,
    enableTagAutoDetect: fo,
    disabledFeatures: W
  }), Hi = H((se) => {
    Pn(se), yt.current = se, r?.(se);
  }, [r]), yo = Jk(re, {
    debounceMs: 500,
    extendedStats: !1,
    enabled: u
  });
  Yv(he, {
    editor: re,
    turndownService: vo,
    editorModeRef: Nt,
    handleModeSwitch: Fr,
    wordCount: yo,
    autoSaveState: Ot,
    setIsFindReplaceOpen: Lt,
    setFindReplaceFocusTrigger: No
  }), Xk({
    editorModeRef: Nt,
    rawMarkdownRef: yt,
    editorMode: ue,
    handleModeSwitch: Fr,
    setIsFindReplaceOpen: Lt,
    setFindReplaceFocusTrigger: No
  });
  const Dd = Ut(() => ({
    openLinkPopover: () => wo(!0),
    openFindReplace: (se) => {
      se && Md(se), Lt(!0), No((Te) => Te + 1);
    },
    openFindReplaceWithReplace: () => {
      Lt(!0);
    }
  }), [Lt]);
  qk(re, De, Dd);
  const Fi = H((se, Te) => {
    if (!po) {
      Di.current?.();
      return;
    }
    if (!re) return;
    let Ge = { top: 0, left: 0 };
    if (Te) {
      const _e = Te.getBoundingClientRect();
      Ge = { top: _e.bottom + 4, left: _e.left };
    } else {
      const { from: _e, to: xt } = re.state.selection, _t = re.view.coordsAtPos(_e), en = re.view.coordsAtPos(xt);
      Ge = { top: en.bottom + 8, left: (_t.left + en.left) / 2 };
    }
    Br({ scope: se, position: Ge });
  }, [po, re]), Ad = H((se, Te) => {
    if (!re || !oe) return;
    const Ge = oe.find((zr) => zr.id === se);
    if (!Ge) return;
    const { from: _e, to: xt } = re.state.selection, _t = _e !== xt ? re.state.doc.textBetween(_e, xt, `
`) : "", en = Ge.scope === "document" || !_t ? re.getText() : _t, ko = re.view.coordsAtPos(_e), xo = re.view.coordsAtPos(xt);
    md({
      selectionTop: ko.top,
      selectionBottom: xo.bottom,
      selectionCenterX: (ko.left + xo.right) / 2
    }), Br(null), go(se, Ge.label, en, { from: _e, to: xt }, Te);
  }, [re, oe, go]), Pd = H(() => {
    if (!re || Ye.status !== "complete") return;
    const { selectionRange: se, result: Te } = Ye;
    re.chain().focus().setTextSelection(se).deleteSelection().insertContent(Te).run(), kt();
  }, [re, Ye, kt]), Id = H(() => {
    if (!re || Ye.status !== "complete") return;
    const { selectionRange: se, result: Te } = Ye;
    re.chain().focus().setTextSelection(se.to).insertContent(`
` + Te).run(), kt();
  }, [re, Ye, kt]), Rd = H(() => {
    if (!(Ye.status !== "complete" && Ye.status !== "error"))
      if (Ye.status === "complete") {
        const { action: se, actionLabel: Te, inputText: Ge, selectionRange: _e } = Ye;
        kt(), go(se, Te, Ge, _e);
      } else
        kt();
  }, [Ye, kt, go]), Ld = H(() => {
    if (!re) return;
    const { from: se, to: Te, empty: Ge } = re.state.selection;
    if (Ge) return;
    const _e = re.state.doc.slice(se, Te), xt = $m.fromSchema(re.schema), _t = document.createElement("div"), en = xt.serializeFragment(_e.content);
    _t.appendChild(en);
    const ko = _t.innerHTML, xo = nr(vo.turndown(ko));
    navigator.clipboard.writeText(xo).catch(() => {
      const zr = re.state.doc.textBetween(se, Te, `
`);
      navigator.clipboard.writeText(zr);
    });
  }, [re, vo]);
  if (!re)
    return /* @__PURE__ */ m(ix, { className: l, theme: d }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 861,
      columnNumber: 12
    }, this);
  const zi = /* @__PURE__ */ m(
    $v,
    {
      editor: re,
      onOpenLinkPopover: () => wo(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        Lt(!0), No((se) => se + 1);
      },
      disabledFeatures: W,
      autoReorderChecklist: Pr,
      aiEnabled: po || !!ne,
      onAISparklesClick: (se) => Fi("document", se)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 866,
      columnNumber: 5
    },
    this
  ), Ui = /* @__PURE__ */ m("div", { className: "editor-footer", children: [
    h && /* @__PURE__ */ m(
      ex,
      {
        status: Ot.status,
        lastSaved: Ot.lastSaved
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 885,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ m("span", { children: [
      yo.words,
      " words"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 891,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 890,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 883,
    columnNumber: 5
  }, this), Od = {
    minHeight: F,
    ...Q && { maxHeight: Q, overflowY: "auto" }
  };
  return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${f === "neutral" ? "color-theme-neutral" : ""} ${l}`, "data-theme": d, children: [
    h && b && Ot.hasRecoverableContent && /* @__PURE__ */ m(
      tx,
      {
        onRecover: () => {
          Ot.recover();
        },
        onDismiss: Ot.dismissRecovery
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 906,
        columnNumber: 9
      },
      this
    ),
    c && /* @__PURE__ */ m("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      Z ? Z(re, zi) : zi,
      k && /* @__PURE__ */ m(ax, { editorMode: ue, onModeSwitch: Fr }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 919,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 916,
      columnNumber: 9
    }, this),
    !De && /* @__PURE__ */ m(
      Bv,
      {
        editor: re,
        isOpen: Td,
        onClose: () => Lt(!1),
        focusTrigger: Ed,
        initialSearchQuery: Sd,
        editorMode: ue,
        rawMarkdown: ho,
        onRawMarkdownChange: Hi,
        onMatchesChange: vd
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 926,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m(Fv, { editor: re }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 940,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("div", { className: `editor-main-area ${Me ? "editor-with-toc" : ""}`, children: [
      Me && Rt === "left" && /* @__PURE__ */ m(
        sl,
        {
          editor: re,
          visible: Ue,
          onVisibilityChange: wt,
          title: Dn,
          minLevel: An,
          maxLevel: so,
          showLevelIndicators: io,
          highlightActive: ao,
          treeView: lo,
          width: co,
          position: Rt,
          scrollOffset: Zt,
          onItemClick: Qt,
          renderItem: uo,
          showToggleButton: mo,
          scrollContainerRef: In
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 946,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ m(
        sx,
        {
          resetKey: `${t}-${ld}`,
          onRetry: () => Mi((se) => se + 1),
          onClearContent: () => {
            re && re.commands.clearContent(), n?.(""), o?.(""), r?.(""), Mi((se) => se + 1);
          },
          onError: _r,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: In, style: Od, children: ue === "wysiwyg" ? /* @__PURE__ */ m(ye, { children: [
              /* @__PURE__ */ m($d, { editor: re, className: "editor-content" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 983,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m(
                Ax,
                {
                  editor: re,
                  isMobile: De,
                  disabledFeatures: W,
                  containerRef: In,
                  editable: a,
                  showFloatingToolbar: w,
                  isLinkPopoverOpen: kd,
                  aiEnabled: po,
                  onAISetupRequired: ne,
                  onAISparklesClick: (se) => Fi("selection", se),
                  onCopySelectionAsMarkdown: Ld,
                  aiDropdown: ud,
                  aiActions: oe,
                  onAIActionSelect: Ad,
                  onAIDropdownClose: () => Br(null),
                  aiState: Ye,
                  aiPopoverPosition: dd,
                  onAIReplace: Pd,
                  onAIInsert: Id,
                  onAIRetry: Rd,
                  onAIDiscard: () => {
                    cd(), kt();
                  },
                  onLinkPopoverClose: () => wo(!1),
                  onEditLink: () => wo(!0),
                  onWikiLinkSearch: $i.current,
                  imageEditState: Hr,
                  onImageSave: (se, Te) => {
                    re.chain().focus().setNodeSelection(Hr.pos).updateAttributes("resizableImage", {
                      src: se,
                      alt: Te
                    }).run(), bo(null);
                  },
                  onImageDelete: () => {
                    re.chain().focus().setNodeSelection(Hr.pos).deleteSelection().run(), bo(null);
                  },
                  onImageEditClose: () => bo(null)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 984,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 982,
              columnNumber: 11
            }, this) : /* @__PURE__ */ m(
              nx,
              {
                content: ho,
                onChange: Hi,
                placeholder: "Write your markdown here...",
                editable: a,
                autofocus: !0,
                searchMatches: hd,
                currentMatchIndex: gd,
                autoClosePairs: Mr
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 1025,
                columnNumber: 11
              },
              this
            ) }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 980,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ m(Px, { scrollContainerRef: In }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1037,
              columnNumber: 7
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 965,
          columnNumber: 7
        },
        this
      ),
      Me && Rt === "right" && /* @__PURE__ */ m(
        sl,
        {
          editor: re,
          visible: Ue,
          onVisibilityChange: wt,
          title: Dn,
          minLevel: An,
          maxLevel: so,
          showLevelIndicators: io,
          highlightActive: ao,
          treeView: lo,
          width: co,
          position: Rt,
          scrollOffset: Zt,
          onItemClick: Qt,
          renderItem: uo,
          showToggleButton: mo,
          scrollContainerRef: In
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1041,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 943,
      columnNumber: 7
    }, this),
    u && (B ? B(
      { words: yo.words, characters: yo.characters },
      Ot.status,
      Ui
    ) : Ui),
    /* @__PURE__ */ m(rx, { visible: Dr, onClose: Ar, editor: re }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1074,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 903,
    columnNumber: 5
  }, this);
}), B1 = fr.create({
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
}), id = {
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
}, Wx = {
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
}, Hx = {
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
}, Fx = {
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
  dark: id,
  light: Wx,
  sepia: Hx,
  nord: Fx
};
function zx(e, t) {
  Object.entries(t.variables).forEach(([n, o]) => {
    e.style.setProperty(n, o);
  });
}
function W1(e, t, n, o) {
  const r = Wn[e] || id;
  return {
    name: t,
    description: n,
    variables: {
      ...r.variables,
      ...o
    }
  };
}
const ad = ll(null);
function H1({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [o, r] = U(t), s = Wn[o] || Wn.dark, a = H((l) => {
    Wn[l] && r(l);
  }, []);
  G(() => {
    n?.current && zx(n.current, s);
  }, [s, n]);
  const i = {
    theme: s,
    themeName: o,
    setTheme: a,
    availableThemes: Object.keys(Wn)
  };
  return /* @__PURE__ */ m(ad.Provider, { value: i, children: e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ThemeProvider.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function F1() {
  const e = cl(ad);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const il = [
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
function z1({ node: e, updateAttributes: t }) {
  const [n, o] = U(!1), r = e.attrs.language || "plaintext";
  il.find((a) => a.value === r)?.label;
  const s = H(() => {
    const a = e.textContent;
    navigator.clipboard.writeText(a).then(() => {
      o(!0), setTimeout(() => o(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ m(vn, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ m("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ m("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: r,
            onChange: (a) => t({ language: a.target.value }),
            className: "code-block-language-select",
            children: il.map(({ value: a, label: i }) => /* @__PURE__ */ m("option", { value: a, children: i }, a, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
              lineNumber: 64,
              columnNumber: 15
            }, this))
          },
          void 0,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 58,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m(Dt, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: s,
          className: `code-block-copy-btn ${n ? "copied" : ""}`,
          title: n ? "Copied!" : "Copy code",
          children: n ? /* @__PURE__ */ m(Vt, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 76,
            columnNumber: 21
          }, this) : /* @__PURE__ */ m(Kt, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
            lineNumber: 76,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
          lineNumber: 71,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m(Os, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 83,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/CodeBlockComponent.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
export {
  ex as AutoSaveIndicator,
  B1 as Callout,
  K0 as CalloutInputRule,
  z1 as CodeBlockComponent,
  z0 as CollapsibleHeading,
  dw as CollapsibleList,
  E0 as DatePill,
  H1 as EditorThemeProvider,
  $v as EditorToolbar,
  Bv as FindReplace,
  ux as FloatingToolbar,
  Ex as ImageDropZone,
  Pk as ImageUpload,
  $1 as MarkdownEditor,
  j0 as MarkdownLinkInputRule,
  B0 as MarkdownPasteSafe,
  rw as MixedBulletList,
  lw as MixedListItem,
  sw as MixedOrderedList,
  aw as MixedTaskItem,
  iw as MixedTaskList,
  tx as RecoveryBanner,
  hw as ResizableImage,
  G0 as SearchHighlight,
  Fv as SelectAllActionBar,
  wk as SelectAllOccurrences,
  wx as SlashCommands,
  Z0 as TabIndent,
  sl as TableOfContents,
  D0 as TagPill,
  P0 as WikiLinkSafe,
  zx as applyTheme,
  W1 as createCustomTheme,
  id as darkTheme,
  Si as getDateVariant,
  cn as isValidTag,
  Wx as lightTheme,
  ff as loadLanguageIfNeeded,
  ve as lowlight,
  Fx as nordTheme,
  zn as normalizeTag,
  Wt as parseDateFromMarkdown,
  Hx as sepiaTheme,
  Wn as themes,
  Uv as useAutoSave,
  F1 as useEditorTheme,
  Jk as useWordCount
};
//# sourceMappingURL=paragon.js.map
