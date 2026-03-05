import { jsxDEV as m, Fragment as ve } from "react/jsx-dev-runtime";
import { ReactNodeViewRenderer as mr, NodeViewWrapper as bn, NodeViewContent as _s, useEditorState as ll, useEditor as Wd, EditorContent as Hd } from "@tiptap/react";
import * as E from "react";
import X, { useState as U, useRef as j, useEffect as K, useCallback as F, useMemo as rt, useLayoutEffect as fr, memo as Nt, useImperativeHandle as Fd, createContext as cl, useContext as ul, Component as zd, useReducer as Ud, lazy as Yd, forwardRef as jd, Suspense as zi } from "react";
import Vd from "@tiptap/extension-code-block-lowlight";
import { createLowlight as Kd } from "lowlight";
import { ChevronDown as At, Check as Vt, Copy as Kt, Image as $s, X as gt, Link2 as Bs, Type as hr, Undo as Gd, Redo as qd, Bold as Ws, Italic as Hs, Underline as Fs, Strikethrough as zs, Code as dl, Highlighter as ml, Link as Us, List as Ys, ListOrdered as js, CheckSquare as Vs, Quote as Ks, Code2 as fl, IndentIncrease as Xd, IndentDecrease as Zd, Table as hs, Minus as hl, Info as Jo, BookOpen as Gs, PenLine as Qd, Library as Jd, ListTodo as qs, Columns as Ui, Trash2 as dn, Rows as Yi, ToggleLeft as ji, ArrowUpDown as em, Sparkles as pr, Search as tm, ChevronUp as nm, MousePointerClick as om, CaseSensitive as rm, WholeWord as sm, Regex as im, Replace as ps, ReplaceAll as am, Plus as Xs, ClipboardList as lm, MessageSquareText as pl, StickyNote as gl, ChevronRight as bl, ChevronLeftIcon as cm, ChevronRightIcon as um, ChevronDownIcon as dm, Calendar as vl, Hash as Vi, Cloud as mm, Loader2 as wl, CloudOff as fm, AlertCircle as hm, RotateCcw as Zs, Activity as pm, Maximize2 as Nl, Minimize2 as yl, AlertTriangle as gm, CheckCircle2 as bm, Eye as vm, FileText as Qs, FileCode as wm, ExternalLink as Nm, Pencil as ym, Unlink as km, Heading1 as xm, Heading2 as Cm, Heading3 as Tm, Heading4 as Em, Heading5 as Sm, ImagePlus as Mm, MessageSquare as kl, RefreshCw as Dm, SpellCheck as Am, PanelRightClose as Pm, PanelRightOpen as Im } from "lucide-react";
import { jsx as z, Fragment as Rm, jsxs as Lm } from "react/jsx-runtime";
import * as xl from "react-dom";
import Om, { createPortal as _m } from "react-dom";
import { TextSelection as je, Plugin as Me, PluginKey as De, NodeSelection as $m, AllSelection as Bm } from "@tiptap/pm/state";
import { Fragment as Cl, Slice as Yr, DOMSerializer as Wm } from "@tiptap/pm/model";
import Hm from "@tiptap/starter-kit";
import Fm from "@tiptap/extension-placeholder";
import zm from "@tiptap/extension-text-align";
import Um from "@tiptap/extension-highlight";
import Ym from "@tiptap/extension-link";
import { Table as jm } from "@tiptap/extension-table";
import Vm from "@tiptap/extension-table-row";
import Km from "@tiptap/extension-table-cell";
import Gm from "@tiptap/extension-table-header";
import { Extension as Oe, Node as gr, mergeAttributes as yn, InputRule as Le, Mark as Tl } from "@tiptap/core";
import { DecorationSet as Ye, Decoration as Ze } from "@tiptap/pm/view";
import qm from "@tiptap/extension-bullet-list";
import Xm from "@tiptap/extension-ordered-list";
import Zm from "@tiptap/extension-list-item";
import Qm from "@tiptap/extension-task-list";
import Jm from "@tiptap/extension-task-item";
import { findWrapping as Ki, canJoin as ef } from "@tiptap/pm/transform";
import tf from "@tiptap/extension-underline";
import nf from "@tiptap/extension-subscript";
import of from "@tiptap/extension-superscript";
import rf from "@tiptap/extension-typography";
import sf from "@tiptap/extension-image";
import { createRoot as af } from "react-dom/client";
import { liftListItem as Gi, sinkListItem as qi } from "@tiptap/pm/schema-list";
import { undo as lf, redo as cf } from "@tiptap/pm/history";
import uf from "@tiptap/extension-horizontal-rule";
import df from "@tiptap/extension-code";
import mf from "@tiptap/extension-bold";
import ff from "@tiptap/extension-italic";
import hf from "@tiptap/extension-strike";
const qe = Kd(), El = {
  javascript: () => import("highlight.js/lib/languages/javascript"),
  typescript: () => import("highlight.js/lib/languages/typescript"),
  python: () => import("highlight.js/lib/languages/python"),
  xml: () => import("highlight.js/lib/languages/xml"),
  css: () => import("highlight.js/lib/languages/css"),
  json: () => import("highlight.js/lib/languages/json"),
  bash: () => import("highlight.js/lib/languages/bash")
}, Sl = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  py: "python",
  html: "xml",
  svg: "xml",
  sh: "bash",
  shell: "bash",
  zsh: "bash"
}, Ml = {
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
}, Do = /* @__PURE__ */ new Set(), Ao = /* @__PURE__ */ new Set();
let Xi = !1, In = null;
async function pf() {
  if (!Xi)
    return In || (In = (async () => {
      try {
        const e = Object.entries(El), t = await Promise.all(
          e.map(async ([n, o]) => {
            const r = await o();
            return [n, r.default];
          })
        );
        for (const [n, o] of t)
          qe.registered(n) || qe.register(n, o);
        for (const [n, o] of Object.entries(Sl))
          if (!qe.registered(n)) {
            const r = t.find(([s]) => s === o);
            r && qe.register(n, r[1]);
          }
        Xi = !0;
      } catch (e) {
        console.warn("Failed to load core highlight.js languages:", e), In = null;
      }
    })(), In);
}
async function gf(e) {
  if (qe.registered(e)) return !0;
  if (El[e] || Sl[e])
    return await pf(), qe.registered(e);
  const t = Ml[e];
  if (!t) return !1;
  if (Ao.has(e)) return !0;
  if (Do.has(e))
    return new Promise((n) => {
      const o = () => {
        Ao.has(e) ? n(!0) : Do.has(e) ? setTimeout(o, 50) : n(!1);
      };
      setTimeout(o, 50);
    });
  Do.add(e);
  try {
    const o = (await t()).default;
    qe.register(e, o), Ao.add(e);
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
          a !== e && !qe.registered(a) && (qe.register(a, o), Ao.add(a));
    return !0;
  } catch (n) {
    return console.warn(`Failed to lazy-load highlight.js language: ${e}`, n), !1;
  } finally {
    Do.delete(e);
  }
}
function bf({ node: e, updateAttributes: t, extension: n }) {
  const [o, r] = U(!1), [s, a] = U(!1), [i, l] = U(!1), c = j(null), u = e.attrs.language || "plaintext";
  K(() => {
    const g = c.current;
    if (!g || s) return;
    const p = new IntersectionObserver(
      (b) => {
        for (const w of b)
          w.isIntersecting && (a(!0), p.unobserve(g));
      },
      {
        // Start highlighting 200px before the block enters viewport
        rootMargin: "200px 0px",
        threshold: 0
      }
    );
    return p.observe(g), () => {
      p.disconnect();
    };
  }, [s]), K(() => {
    if (s) {
      if (u === "plaintext") {
        l(!0);
        return;
      }
      if (qe.registered(u)) {
        l(!0);
        return;
      }
      l(!1), gf(u).then((g) => {
        l(g || u === "plaintext");
      });
    }
  }, [s, u]);
  const d = F(async () => {
    try {
      await navigator.clipboard.writeText(e.textContent), r(!0), setTimeout(() => r(!1), 2e3);
    } catch (g) {
      console.error("Failed to copy:", g);
    }
  }, [e.textContent]), f = rt(() => {
    const g = n.options.lowlight?.listLanguages?.() || [];
    return Array.from(/* @__PURE__ */ new Set([...g, ...Object.keys(Ml)])).sort();
  }, [n.options.lowlight, i]), h = rt(
    () => u === "plaintext" ? "Plain Text" : u.charAt(0).toUpperCase() + u.slice(1),
    [u]
  );
  return /* @__PURE__ */ m(bn, { className: "code-block-wrapper", ref: c, children: [
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
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 329,
                columnNumber: 13
              }, this),
              f.map((g) => /* @__PURE__ */ m("option", { value: g, children: g.charAt(0).toUpperCase() + g.slice(1) }, g, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
                lineNumber: 331,
                columnNumber: 15
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 324,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ m("span", { className: "code-block-language-label", children: h }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 336,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m(At, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 337,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
        lineNumber: 323,
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
            lineNumber: 345,
            columnNumber: 21
          }, this) : /* @__PURE__ */ m(Kt, { size: 14 }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
            lineNumber: 345,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
          lineNumber: 339,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 322,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("pre", { className: `code-block-pre ${!s || !i ? "code-block-deferred" : ""}`, children: /* @__PURE__ */ m(_s, { className: s && i ? `language-${u}` : "language-plaintext" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 352,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
      lineNumber: 351,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CodeBlockWithFeatures.tsx",
    lineNumber: 320,
    columnNumber: 5
  }, this);
}
const vf = Vd.configure({
  lowlight: qe,
  defaultLanguage: "plaintext",
  HTMLAttributes: {
    class: "code-block"
  }
}).extend({
  addNodeView() {
    return mr(bf, {
      update: ({ oldNode: e, newNode: t, updateProps: n }) => {
        const o = e.attrs.language !== t.attrs.language, r = !e.content.eq(t.content);
        return (o || r) && n(), !0;
      }
    });
  },
  addKeyboardShortcuts() {
    return {
      ...this.parent?.() ?? {},
      "Mod-Alt-c": () => Js(this.editor)
    };
  },
  addProseMirrorPlugins() {
    return [...this.parent?.() ?? []];
  }
});
function Js(e) {
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
function Dl({ isOpen: e, onClose: t, onInsert: n, position: o }) {
  const [r, s] = U(""), [a, i] = U(""), [l, c] = U(""), [u, d] = U(!1), f = j(null), h = j(null);
  K(() => {
    e && (s(""), i(""), c(""), setTimeout(() => {
      f.current?.focus();
    }, 100));
  }, [e]), K(() => {
    if (!e) return;
    const v = (N) => {
      h.current && !h.current.contains(N.target) && t();
    }, y = (N) => {
      N.key === "Escape" && t();
    }, T = setTimeout(() => {
      document.addEventListener("mousedown", v);
    }, 100);
    return document.addEventListener("keydown", y), () => {
      clearTimeout(T), document.removeEventListener("mousedown", v), document.removeEventListener("keydown", y);
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
            /* @__PURE__ */ m($s, { size: 16, className: "text-primary" }, void 0, !1, {
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
              children: /* @__PURE__ */ m(gt, { size: 16 }, void 0, !1, {
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
              /* @__PURE__ */ m(Bs, { size: 12 }, void 0, !1, {
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
              /* @__PURE__ */ m(hr, { size: 12 }, void 0, !1, {
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
function le(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
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
function br(...e) {
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
function Ie(...e) {
  return E.useCallback(br(...e), e);
}
function kn(e, t = []) {
  let n = [];
  function o(s, a) {
    const i = E.createContext(a), l = n.length;
    n = [...n, a];
    const c = (d) => {
      const { scope: f, children: h, ...g } = d, p = f?.[e]?.[l] || i, b = E.useMemo(() => g, Object.values(g));
      return /* @__PURE__ */ z(p.Provider, { value: b, children: h });
    };
    c.displayName = s + "Provider";
    function u(d, f) {
      const h = f?.[e]?.[l] || i, g = E.useContext(h);
      if (g) return g;
      if (a !== void 0) return a;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [c, u];
  }
  const r = () => {
    const s = n.map((a) => E.createContext(a));
    return function(i) {
      const l = i?.[e] || s;
      return E.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return r.scopeName = e, [o, wf(r, ...t)];
}
function wf(...e) {
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
      return E.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Pt = globalThis?.document ? E.useLayoutEffect : () => {
}, Nf = E[" useInsertionEffect ".trim().toString()] || Pt;
function ei({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: o
}) {
  const [r, s, a] = yf({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : r;
  {
    const u = E.useRef(e !== void 0);
    E.useEffect(() => {
      const d = u.current;
      d !== i && console.warn(
        `${o} is changing from ${d ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = i;
    }, [i, o]);
  }
  const c = E.useCallback(
    (u) => {
      if (i) {
        const d = kf(u) ? u(e) : u;
        d !== e && a.current?.(d);
      } else
        s(u);
    },
    [i, e, s, a]
  );
  return [l, c];
}
function yf({
  defaultProp: e,
  onChange: t
}) {
  const [n, o] = E.useState(e), r = E.useRef(n), s = E.useRef(t);
  return Nf(() => {
    s.current = t;
  }, [t]), E.useEffect(() => {
    r.current !== n && (s.current?.(n), r.current = n);
  }, [n, r]), [n, o, s];
}
function kf(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function jn(e) {
  const t = /* @__PURE__ */ Cf(e), n = E.forwardRef((o, r) => {
    const { children: s, ...a } = o, i = E.Children.toArray(s), l = i.find(Ef);
    if (l) {
      const c = l.props.children, u = i.map((d) => d === l ? E.Children.count(c) > 1 ? E.Children.only(null) : E.isValidElement(c) ? c.props.children : null : d);
      return /* @__PURE__ */ z(t, { ...a, ref: r, children: E.isValidElement(c) ? E.cloneElement(c, void 0, u) : null });
    }
    return /* @__PURE__ */ z(t, { ...a, ref: r, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var xf = /* @__PURE__ */ jn("Slot");
// @__NO_SIDE_EFFECTS__
function Cf(e) {
  const t = E.forwardRef((n, o) => {
    const { children: r, ...s } = n;
    if (E.isValidElement(r)) {
      const a = Mf(r), i = Sf(s, r.props);
      return r.type !== E.Fragment && (i.ref = o ? br(o, a) : a), E.cloneElement(r, i);
    }
    return E.Children.count(r) > 1 ? E.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Al = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Tf(e) {
  const t = ({ children: n }) => /* @__PURE__ */ z(Rm, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Al, t;
}
function Ef(e) {
  return E.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Al;
}
function Sf(e, t) {
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
function Mf(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Df = [
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
], Ae = Df.reduce((e, t) => {
  const n = /* @__PURE__ */ jn(`Primitive.${t}`), o = E.forwardRef((r, s) => {
    const { asChild: a, ...i } = r, l = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ z(l, { ...i, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Pl(e, t) {
  e && xl.flushSync(() => e.dispatchEvent(t));
}
function Il(e) {
  const t = e + "CollectionProvider", [n, o] = kn(t), [r, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (p) => {
    const { scope: b, children: w } = p, v = X.useRef(null), y = X.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ z(r, { scope: b, itemMap: y, collectionRef: v, children: w });
  };
  a.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ jn(i), c = X.forwardRef(
    (p, b) => {
      const { scope: w, children: v } = p, y = s(i, w), T = Ie(b, y.collectionRef);
      return /* @__PURE__ */ z(l, { ref: T, children: v });
    }
  );
  c.displayName = i;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ jn(u), h = X.forwardRef(
    (p, b) => {
      const { scope: w, children: v, ...y } = p, T = X.useRef(null), N = Ie(b, T), C = s(u, w);
      return X.useEffect(() => (C.itemMap.set(T, { ref: T, ...y }), () => void C.itemMap.delete(T))), /* @__PURE__ */ z(f, { [d]: "", ref: N, children: v });
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
        (C, S) => y.indexOf(C.ref.current) - y.indexOf(S.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: a, Slot: c, ItemSlot: h },
    g,
    o
  ];
}
var Af = E.createContext(void 0);
function Rl(e) {
  const t = E.useContext(Af);
  return e || t || "ltr";
}
function bt(e) {
  const t = E.useRef(e);
  return E.useEffect(() => {
    t.current = e;
  }), E.useMemo(() => (...n) => t.current?.(...n), []);
}
function Pf(e, t = globalThis?.document) {
  const n = bt(e);
  E.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: !0 }), () => t.removeEventListener("keydown", o, { capture: !0 });
  }, [n, t]);
}
var If = "DismissableLayer", gs = "dismissableLayer.update", Rf = "dismissableLayer.pointerDownOutside", Lf = "dismissableLayer.focusOutside", Qi, Ll = E.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), ti = E.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: r,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...l
    } = e, c = E.useContext(Ll), [u, d] = E.useState(null), f = u?.ownerDocument ?? globalThis?.document, [, h] = E.useState({}), g = Ie(t, (S) => d(S)), p = Array.from(c.layers), [b] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), w = p.indexOf(b), v = u ? p.indexOf(u) : -1, y = c.layersWithOutsidePointerEventsDisabled.size > 0, T = v >= w, N = $f((S) => {
      const k = S.target, D = [...c.branches].some((x) => x.contains(k));
      !T || D || (r?.(S), a?.(S), S.defaultPrevented || i?.());
    }, f), C = Bf((S) => {
      const k = S.target;
      [...c.branches].some((x) => x.contains(k)) || (s?.(S), a?.(S), S.defaultPrevented || i?.());
    }, f);
    return Pf((S) => {
      v === c.layers.size - 1 && (o?.(S), !S.defaultPrevented && i && (S.preventDefault(), i()));
    }, f), E.useEffect(() => {
      if (u)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (Qi = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(u)), c.layers.add(u), Ji(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = Qi);
        };
    }, [u, f, n, c]), E.useEffect(() => () => {
      u && (c.layers.delete(u), c.layersWithOutsidePointerEventsDisabled.delete(u), Ji());
    }, [u, c]), E.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(gs, S), () => document.removeEventListener(gs, S);
    }, []), /* @__PURE__ */ z(
      Ae.div,
      {
        ...l,
        ref: g,
        style: {
          pointerEvents: y ? T ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: le(e.onFocusCapture, C.onFocusCapture),
        onBlurCapture: le(e.onBlurCapture, C.onBlurCapture),
        onPointerDownCapture: le(
          e.onPointerDownCapture,
          N.onPointerDownCapture
        )
      }
    );
  }
);
ti.displayName = If;
var Of = "DismissableLayerBranch", _f = E.forwardRef((e, t) => {
  const n = E.useContext(Ll), o = E.useRef(null), r = Ie(t, o);
  return E.useEffect(() => {
    const s = o.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ z(Ae.div, { ...e, ref: r });
});
_f.displayName = Of;
function $f(e, t = globalThis?.document) {
  const n = bt(e), o = E.useRef(!1), r = E.useRef(() => {
  });
  return E.useEffect(() => {
    const s = (i) => {
      if (i.target && !o.current) {
        let l = function() {
          Ol(
            Rf,
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
function Bf(e, t = globalThis?.document) {
  const n = bt(e), o = E.useRef(!1);
  return E.useEffect(() => {
    const r = (s) => {
      s.target && !o.current && Ol(Lf, n, { originalEvent: s }, {
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
function Ol(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), o ? Pl(r, s) : r.dispatchEvent(s);
}
var jr = 0;
function Wf() {
  E.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? ea()), document.body.insertAdjacentElement("beforeend", e[1] ?? ea()), jr++, () => {
      jr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), jr--;
    };
  }, []);
}
function ea() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Vr = "focusScope.autoFocusOnMount", Kr = "focusScope.autoFocusOnUnmount", ta = { bubbles: !1, cancelable: !0 }, Hf = "FocusScope", _l = E.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: o = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, l] = E.useState(null), c = bt(r), u = bt(s), d = E.useRef(null), f = Ie(t, (p) => l(p)), h = E.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  E.useEffect(() => {
    if (o) {
      let p = function(y) {
        if (h.paused || !i) return;
        const T = y.target;
        i.contains(T) ? d.current = T : Mt(d.current, { select: !0 });
      }, b = function(y) {
        if (h.paused || !i) return;
        const T = y.relatedTarget;
        T !== null && (i.contains(T) || Mt(d.current, { select: !0 }));
      }, w = function(y) {
        if (document.activeElement === document.body)
          for (const N of y)
            N.removedNodes.length > 0 && Mt(i);
      };
      document.addEventListener("focusin", p), document.addEventListener("focusout", b);
      const v = new MutationObserver(w);
      return i && v.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", b), v.disconnect();
      };
    }
  }, [o, i, h.paused]), E.useEffect(() => {
    if (i) {
      oa.add(h);
      const p = document.activeElement;
      if (!i.contains(p)) {
        const w = new CustomEvent(Vr, ta);
        i.addEventListener(Vr, c), i.dispatchEvent(w), w.defaultPrevented || (Ff(Vf($l(i)), { select: !0 }), document.activeElement === p && Mt(i));
      }
      return () => {
        i.removeEventListener(Vr, c), setTimeout(() => {
          const w = new CustomEvent(Kr, ta);
          i.addEventListener(Kr, u), i.dispatchEvent(w), w.defaultPrevented || Mt(p ?? document.body, { select: !0 }), i.removeEventListener(Kr, u), oa.remove(h);
        }, 0);
      };
    }
  }, [i, c, u, h]);
  const g = E.useCallback(
    (p) => {
      if (!n && !o || h.paused) return;
      const b = p.key === "Tab" && !p.altKey && !p.ctrlKey && !p.metaKey, w = document.activeElement;
      if (b && w) {
        const v = p.currentTarget, [y, T] = zf(v);
        y && T ? !p.shiftKey && w === T ? (p.preventDefault(), n && Mt(y, { select: !0 })) : p.shiftKey && w === y && (p.preventDefault(), n && Mt(T, { select: !0 })) : w === v && p.preventDefault();
      }
    },
    [n, o, h.paused]
  );
  return /* @__PURE__ */ z(Ae.div, { tabIndex: -1, ...a, ref: f, onKeyDown: g });
});
_l.displayName = Hf;
function Ff(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (Mt(o, { select: t }), document.activeElement !== n) return;
}
function zf(e) {
  const t = $l(e), n = na(t, e), o = na(t.reverse(), e);
  return [n, o];
}
function $l(e) {
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
    if (!Uf(n, { upTo: t })) return n;
}
function Uf(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Yf(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Mt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Yf(e) && t && e.select();
  }
}
var oa = jf();
function jf() {
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
function Vf(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Kf = E[" useId ".trim().toString()] || (() => {
}), Gf = 0;
function er(e) {
  const [t, n] = E.useState(Kf());
  return Pt(() => {
    n((o) => o ?? String(Gf++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const qf = ["top", "right", "bottom", "left"], It = Math.min, We = Math.max, tr = Math.round, Po = Math.floor, st = (e) => ({
  x: e,
  y: e
}), Xf = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Zf = {
  start: "end",
  end: "start"
};
function bs(e, t, n) {
  return We(e, It(t, n));
}
function vt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function wt(e) {
  return e.split("-")[0];
}
function xn(e) {
  return e.split("-")[1];
}
function ni(e) {
  return e === "x" ? "y" : "x";
}
function oi(e) {
  return e === "y" ? "height" : "width";
}
const Qf = /* @__PURE__ */ new Set(["top", "bottom"]);
function nt(e) {
  return Qf.has(wt(e)) ? "y" : "x";
}
function ri(e) {
  return ni(nt(e));
}
function Jf(e, t, n) {
  n === void 0 && (n = !1);
  const o = xn(e), r = ri(e), s = oi(r);
  let a = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = nr(a)), [a, nr(a)];
}
function eh(e) {
  const t = nr(e);
  return [vs(e), t, vs(t)];
}
function vs(e) {
  return e.replace(/start|end/g, (t) => Zf[t]);
}
const sa = ["left", "right"], ia = ["right", "left"], th = ["top", "bottom"], nh = ["bottom", "top"];
function oh(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ia : sa : t ? sa : ia;
    case "left":
    case "right":
      return t ? th : nh;
    default:
      return [];
  }
}
function rh(e, t, n, o) {
  const r = xn(e);
  let s = oh(wt(e), n === "start", o);
  return r && (s = s.map((a) => a + "-" + r), t && (s = s.concat(s.map(vs)))), s;
}
function nr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Xf[t]);
}
function sh(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Bl(e) {
  return typeof e != "number" ? sh(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function or(e) {
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
  const s = nt(t), a = ri(t), i = oi(a), l = wt(t), c = s === "y", u = o.x + o.width / 2 - r.width / 2, d = o.y + o.height / 2 - r.height / 2, f = o[i] / 2 - r[i] / 2;
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
  switch (xn(t)) {
    case "start":
      h[a] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      h[a] += f * (n && c ? -1 : 1);
      break;
  }
  return h;
}
const ih = async (e, t, n) => {
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
      data: T,
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
        ...T
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
async function Vn(e, t) {
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
  } = vt(t, e), g = Bl(h), b = i[f ? d === "floating" ? "reference" : "floating" : d], w = or(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(b))) == null || n ? b : b.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), v = d === "floating" ? {
    x: o,
    y: r,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, y = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)), T = await (s.isElement == null ? void 0 : s.isElement(y)) ? await (s.getScale == null ? void 0 : s.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, N = or(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: v,
    offsetParent: y,
    strategy: l
  }) : v);
  return {
    top: (w.top - N.top + g.top) / T.y,
    bottom: (N.bottom - w.bottom + g.bottom) / T.y,
    left: (w.left - N.left + g.left) / T.x,
    right: (N.right - w.right + g.right) / T.x
  };
}
const ah = (e) => ({
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
    } = vt(e, t) || {};
    if (c == null)
      return {};
    const d = Bl(u), f = {
      x: n,
      y: o
    }, h = ri(r), g = oi(h), p = await a.getDimensions(c), b = h === "y", w = b ? "top" : "left", v = b ? "bottom" : "right", y = b ? "clientHeight" : "clientWidth", T = s.reference[g] + s.reference[h] - f[h] - s.floating[g], N = f[h] - s.reference[h], C = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let S = C ? C[y] : 0;
    (!S || !await (a.isElement == null ? void 0 : a.isElement(C))) && (S = i.floating[y] || s.floating[g]);
    const k = T / 2 - N / 2, D = S / 2 - p[g] / 2 - 1, x = It(d[w], D), M = It(d[v], D), A = x, R = S - p[g] - M, L = S / 2 - p[g] / 2 + k, _ = bs(A, L, R), W = !l.arrow && xn(r) != null && L !== _ && s.reference[g] / 2 - (L < A ? x : M) - p[g] / 2 < 0, V = W ? L < A ? L - A : L - R : 0;
    return {
      [h]: f[h] + V,
      data: {
        [h]: _,
        centerOffset: L - _ - V,
        ...W && {
          alignmentOffset: V
        }
      },
      reset: W
    };
  }
}), lh = function(e) {
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
      } = vt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const w = wt(r), v = nt(i), y = wt(i) === i, T = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), N = f || (y || !p ? [nr(i)] : eh(i)), C = g !== "none";
      !f && C && N.push(...rh(i, p, g, T));
      const S = [i, ...N], k = await Vn(t, b), D = [];
      let x = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (u && D.push(k[w]), d) {
        const L = Jf(r, a, T);
        D.push(k[L[0]], k[L[1]]);
      }
      if (x = [...x, {
        placement: r,
        overflows: D
      }], !D.every((L) => L <= 0)) {
        var M, A;
        const L = (((M = s.flip) == null ? void 0 : M.index) || 0) + 1, _ = S[L];
        if (_ && (!(d === "alignment" ? v !== nt(_) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        x.every((I) => nt(I.placement) === v ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: L,
              overflows: x
            },
            reset: {
              placement: _
            }
          };
        let W = (A = x.filter((V) => V.overflows[0] <= 0).sort((V, I) => V.overflows[1] - I.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!W)
          switch (h) {
            case "bestFit": {
              var R;
              const V = (R = x.filter((I) => {
                if (C) {
                  const P = nt(I.placement);
                  return P === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  P === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((P) => P > 0).reduce((P, $) => P + $, 0)]).sort((I, P) => I[1] - P[1])[0]) == null ? void 0 : R[0];
              V && (W = V);
              break;
            }
            case "initialPlacement":
              W = i;
              break;
          }
        if (r !== W)
          return {
            reset: {
              placement: W
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
  return qf.some((t) => e[t] >= 0);
}
const ch = function(e) {
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
          const s = await Vn(t, {
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
          const s = await Vn(t, {
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
}, Wl = /* @__PURE__ */ new Set(["left", "top"]);
async function uh(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), a = wt(n), i = xn(n), l = nt(n) === "y", c = Wl.has(a) ? -1 : 1, u = s && l ? -1 : 1, d = vt(t, e);
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
const dh = function(e) {
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
      } = t, l = await uh(t, e);
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
}, mh = function(e) {
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
      } = vt(e, t), c = {
        x: n,
        y: o
      }, u = await Vn(t, l), d = nt(wt(r)), f = ni(d);
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
}, fh = function(e) {
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
      } = vt(e, t), u = {
        x: n,
        y: o
      }, d = nt(r), f = ni(d);
      let h = u[f], g = u[d];
      const p = vt(i, t), b = typeof p == "number" ? {
        mainAxis: p,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...p
      };
      if (l) {
        const y = f === "y" ? "height" : "width", T = s.reference[f] - s.floating[y] + b.mainAxis, N = s.reference[f] + s.reference[y] - b.mainAxis;
        h < T ? h = T : h > N && (h = N);
      }
      if (c) {
        var w, v;
        const y = f === "y" ? "width" : "height", T = Wl.has(wt(r)), N = s.reference[d] - s.floating[y] + (T && ((w = a.offset) == null ? void 0 : w[d]) || 0) + (T ? 0 : b.crossAxis), C = s.reference[d] + s.reference[y] + (T ? 0 : ((v = a.offset) == null ? void 0 : v[d]) || 0) - (T ? b.crossAxis : 0);
        g < N ? g = N : g > C && (g = C);
      }
      return {
        [f]: h,
        [d]: g
      };
    }
  };
}, hh = function(e) {
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
      } = vt(e, t), u = await Vn(t, c), d = wt(r), f = xn(r), h = nt(r) === "y", {
        width: g,
        height: p
      } = s.floating;
      let b, w;
      d === "top" || d === "bottom" ? (b = d, w = f === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (w = d, b = f === "end" ? "top" : "bottom");
      const v = p - u.top - u.bottom, y = g - u.left - u.right, T = It(p - u[b], v), N = It(g - u[w], y), C = !t.middlewareData.shift;
      let S = T, k = N;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = y), (o = t.middlewareData.shift) != null && o.enabled.y && (S = v), C && !f) {
        const x = We(u.left, 0), M = We(u.right, 0), A = We(u.top, 0), R = We(u.bottom, 0);
        h ? k = g - 2 * (x !== 0 || M !== 0 ? x + M : We(u.left, u.right)) : S = p - 2 * (A !== 0 || R !== 0 ? A + R : We(u.top, u.bottom));
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
function vr() {
  return typeof window < "u";
}
function Cn(e) {
  return Hl(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function He(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function at(e) {
  var t;
  return (t = (Hl(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Hl(e) {
  return vr() ? e instanceof Node || e instanceof He(e).Node : !1;
}
function Qe(e) {
  return vr() ? e instanceof Element || e instanceof He(e).Element : !1;
}
function it(e) {
  return vr() ? e instanceof HTMLElement || e instanceof He(e).HTMLElement : !1;
}
function ua(e) {
  return !vr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof He(e).ShadowRoot;
}
const ph = /* @__PURE__ */ new Set(["inline", "contents"]);
function Jn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = Je(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !ph.has(r);
}
const gh = /* @__PURE__ */ new Set(["table", "td", "th"]);
function bh(e) {
  return gh.has(Cn(e));
}
const vh = [":popover-open", ":modal"];
function wr(e) {
  return vh.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const wh = ["transform", "translate", "scale", "rotate", "perspective"], Nh = ["transform", "translate", "scale", "rotate", "perspective", "filter"], yh = ["paint", "layout", "strict", "content"];
function si(e) {
  const t = ii(), n = Qe(e) ? Je(e) : e;
  return wh.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Nh.some((o) => (n.willChange || "").includes(o)) || yh.some((o) => (n.contain || "").includes(o));
}
function kh(e) {
  let t = Rt(e);
  for (; it(t) && !vn(t); ) {
    if (si(t))
      return t;
    if (wr(t))
      return null;
    t = Rt(t);
  }
  return null;
}
function ii() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const xh = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function vn(e) {
  return xh.has(Cn(e));
}
function Je(e) {
  return He(e).getComputedStyle(e);
}
function Nr(e) {
  return Qe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Rt(e) {
  if (Cn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ua(e) && e.host || // Fallback.
    at(e)
  );
  return ua(t) ? t.host : t;
}
function Fl(e) {
  const t = Rt(e);
  return vn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : it(t) && Jn(t) ? t : Fl(t);
}
function Kn(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = Fl(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), a = He(r);
  if (s) {
    const i = ws(a);
    return t.concat(a, a.visualViewport || [], Jn(r) ? r : [], i && n ? Kn(i) : []);
  }
  return t.concat(r, Kn(r, [], n));
}
function ws(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function zl(e) {
  const t = Je(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = it(e), s = r ? e.offsetWidth : n, a = r ? e.offsetHeight : o, i = tr(n) !== s || tr(o) !== a;
  return i && (n = s, o = a), {
    width: n,
    height: o,
    $: i
  };
}
function ai(e) {
  return Qe(e) ? e : e.contextElement;
}
function mn(e) {
  const t = ai(e);
  if (!it(t))
    return st(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: s
  } = zl(t);
  let a = (s ? tr(n.width) : n.width) / o, i = (s ? tr(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const Ch = /* @__PURE__ */ st(0);
function Ul(e) {
  const t = He(e);
  return !ii() || !t.visualViewport ? Ch : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Th(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== He(e) ? !1 : t;
}
function jt(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), s = ai(e);
  let a = st(1);
  t && (o ? Qe(o) && (a = mn(o)) : a = mn(e));
  const i = Th(s, n, o) ? Ul(s) : st(0);
  let l = (r.left + i.x) / a.x, c = (r.top + i.y) / a.y, u = r.width / a.x, d = r.height / a.y;
  if (s) {
    const f = He(s), h = o && Qe(o) ? He(o) : o;
    let g = f, p = ws(g);
    for (; p && o && h !== g; ) {
      const b = mn(p), w = p.getBoundingClientRect(), v = Je(p), y = w.left + (p.clientLeft + parseFloat(v.paddingLeft)) * b.x, T = w.top + (p.clientTop + parseFloat(v.paddingTop)) * b.y;
      l *= b.x, c *= b.y, u *= b.x, d *= b.y, l += y, c += T, g = He(p), p = ws(g);
    }
  }
  return or({
    width: u,
    height: d,
    x: l,
    y: c
  });
}
function yr(e, t) {
  const n = Nr(e).scrollLeft;
  return t ? t.left + n : jt(at(e)).left + n;
}
function Yl(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - yr(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function Eh(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const s = r === "fixed", a = at(o), i = t ? wr(t.floating) : !1;
  if (o === a || i && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = st(1);
  const u = st(0), d = it(o);
  if ((d || !d && !s) && ((Cn(o) !== "body" || Jn(a)) && (l = Nr(o)), it(o))) {
    const h = jt(o);
    c = mn(o), u.x = h.x + o.clientLeft, u.y = h.y + o.clientTop;
  }
  const f = a && !d && !s ? Yl(a, l) : st(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - l.scrollLeft * c.x + u.x + f.x,
    y: n.y * c.y - l.scrollTop * c.y + u.y + f.y
  };
}
function Sh(e) {
  return Array.from(e.getClientRects());
}
function Mh(e) {
  const t = at(e), n = Nr(e), o = e.ownerDocument.body, r = We(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), s = We(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + yr(e);
  const i = -n.scrollTop;
  return Je(o).direction === "rtl" && (a += We(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: s,
    x: a,
    y: i
  };
}
const da = 25;
function Dh(e, t) {
  const n = He(e), o = at(e), r = n.visualViewport;
  let s = o.clientWidth, a = o.clientHeight, i = 0, l = 0;
  if (r) {
    s = r.width, a = r.height;
    const u = ii();
    (!u || u && t === "fixed") && (i = r.offsetLeft, l = r.offsetTop);
  }
  const c = yr(o);
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
const Ah = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Ph(e, t) {
  const n = jt(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = it(e) ? mn(e) : st(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, l = r * s.x, c = o * s.y;
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
    o = Dh(e, n);
  else if (t === "document")
    o = Mh(at(e));
  else if (Qe(t))
    o = Ph(t, n);
  else {
    const r = Ul(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return or(o);
}
function jl(e, t) {
  const n = Rt(e);
  return n === t || !Qe(n) || vn(n) ? !1 : Je(n).position === "fixed" || jl(n, t);
}
function Ih(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = Kn(e, [], !1).filter((i) => Qe(i) && Cn(i) !== "body"), r = null;
  const s = Je(e).position === "fixed";
  let a = s ? Rt(e) : e;
  for (; Qe(a) && !vn(a); ) {
    const i = Je(a), l = si(a);
    !l && i.position === "fixed" && (r = null), (s ? !l && !r : !l && i.position === "static" && !!r && Ah.has(r.position) || Jn(a) && !l && jl(e, a)) ? o = o.filter((u) => u !== a) : r = i, a = Rt(a);
  }
  return t.set(e, o), o;
}
function Rh(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const a = [...n === "clippingAncestors" ? wr(t) ? [] : Ih(t, this._c) : [].concat(n), o], i = a[0], l = a.reduce((c, u) => {
    const d = ma(t, u, r);
    return c.top = We(d.top, c.top), c.right = It(d.right, c.right), c.bottom = It(d.bottom, c.bottom), c.left = We(d.left, c.left), c;
  }, ma(t, i, r));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Lh(e) {
  const {
    width: t,
    height: n
  } = zl(e);
  return {
    width: t,
    height: n
  };
}
function Oh(e, t, n) {
  const o = it(t), r = at(t), s = n === "fixed", a = jt(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = st(0);
  function c() {
    l.x = yr(r);
  }
  if (o || !o && !s)
    if ((Cn(t) !== "body" || Jn(r)) && (i = Nr(t)), o) {
      const h = jt(t, !0, s, t);
      l.x = h.x + t.clientLeft, l.y = h.y + t.clientTop;
    } else r && c();
  s && !o && r && c();
  const u = r && !o && !s ? Yl(r, i) : st(0), d = a.left + i.scrollLeft - l.x - u.x, f = a.top + i.scrollTop - l.y - u.y;
  return {
    x: d,
    y: f,
    width: a.width,
    height: a.height
  };
}
function Gr(e) {
  return Je(e).position === "static";
}
function fa(e, t) {
  if (!it(e) || Je(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return at(e) === n && (n = n.ownerDocument.body), n;
}
function Vl(e, t) {
  const n = He(e);
  if (wr(e))
    return n;
  if (!it(e)) {
    let r = Rt(e);
    for (; r && !vn(r); ) {
      if (Qe(r) && !Gr(r))
        return r;
      r = Rt(r);
    }
    return n;
  }
  let o = fa(e, t);
  for (; o && bh(o) && Gr(o); )
    o = fa(o, t);
  return o && vn(o) && Gr(o) && !si(o) ? n : o || kh(e) || n;
}
const _h = async function(e) {
  const t = this.getOffsetParent || Vl, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: Oh(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function $h(e) {
  return Je(e).direction === "rtl";
}
const Bh = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Eh,
  getDocumentElement: at,
  getClippingRect: Rh,
  getOffsetParent: Vl,
  getElementRects: _h,
  getClientRects: Sh,
  getDimensions: Lh,
  getScale: mn,
  isElement: Qe,
  isRTL: $h
};
function Kl(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Wh(e, t) {
  let n = null, o;
  const r = at(e);
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
    const g = Po(d), p = Po(r.clientWidth - (u + f)), b = Po(r.clientHeight - (d + h)), w = Po(u), y = {
      rootMargin: -g + "px " + -p + "px " + -b + "px " + -w + "px",
      threshold: We(0, It(1, l)) || 1
    };
    let T = !0;
    function N(C) {
      const S = C[0].intersectionRatio;
      if (S !== l) {
        if (!T)
          return a();
        S ? a(!1, S) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !Kl(c, e.getBoundingClientRect()) && a(), T = !1;
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
function Hh(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = o, c = ai(e), u = r || s ? [...c ? Kn(c) : [], ...Kn(t)] : [];
  u.forEach((w) => {
    r && w.addEventListener("scroll", n, {
      passive: !0
    }), s && w.addEventListener("resize", n);
  });
  const d = c && i ? Wh(c, n) : null;
  let f = -1, h = null;
  a && (h = new ResizeObserver((w) => {
    let [v] = w;
    v && v.target === c && h && (h.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var y;
      (y = h) == null || y.observe(t);
    })), n();
  }), c && !l && h.observe(c), h.observe(t));
  let g, p = l ? jt(e) : null;
  l && b();
  function b() {
    const w = jt(e);
    p && !Kl(p, w) && n(), p = w, g = requestAnimationFrame(b);
  }
  return n(), () => {
    var w;
    u.forEach((v) => {
      r && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), d?.(), (w = h) == null || w.disconnect(), h = null, l && cancelAnimationFrame(g);
  };
}
const Fh = dh, zh = mh, Uh = lh, Yh = hh, jh = ch, ha = ah, Vh = fh, Kh = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: Bh,
    ...n
  }, s = {
    ...r.platform,
    _c: o
  };
  return ih(e, t, {
    ...r,
    platform: s
  });
};
var Gh = typeof document < "u", qh = function() {
}, Go = Gh ? fr : qh;
function rr(e, t) {
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
        if (!rr(e[o], t[o]))
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
      if (!(s === "_owner" && e.$$typeof) && !rr(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Gl(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function pa(e, t) {
  const n = Gl(e);
  return Math.round(t * n) / n;
}
function qr(e) {
  const t = E.useRef(e);
  return Go(() => {
    t.current = e;
  }), t;
}
function Xh(e) {
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
  } = e, [u, d] = E.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, h] = E.useState(o);
  rr(f, o) || h(o);
  const [g, p] = E.useState(null), [b, w] = E.useState(null), v = E.useCallback((I) => {
    I !== C.current && (C.current = I, p(I));
  }, []), y = E.useCallback((I) => {
    I !== S.current && (S.current = I, w(I));
  }, []), T = s || g, N = a || b, C = E.useRef(null), S = E.useRef(null), k = E.useRef(u), D = l != null, x = qr(l), M = qr(r), A = qr(c), R = E.useCallback(() => {
    if (!C.current || !S.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    M.current && (I.platform = M.current), Kh(C.current, S.current, I).then((P) => {
      const $ = {
        ...P,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: A.current !== !1
      };
      L.current && !rr(k.current, $) && (k.current = $, xl.flushSync(() => {
        d($);
      }));
    });
  }, [f, t, n, M, A]);
  Go(() => {
    c === !1 && k.current.isPositioned && (k.current.isPositioned = !1, d((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [c]);
  const L = E.useRef(!1);
  Go(() => (L.current = !0, () => {
    L.current = !1;
  }), []), Go(() => {
    if (T && (C.current = T), N && (S.current = N), T && N) {
      if (x.current)
        return x.current(T, N, R);
      R();
    }
  }, [T, N, R, x, D]);
  const _ = E.useMemo(() => ({
    reference: C,
    floating: S,
    setReference: v,
    setFloating: y
  }), [v, y]), W = E.useMemo(() => ({
    reference: T,
    floating: N
  }), [T, N]), V = E.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!W.floating)
      return I;
    const P = pa(W.floating, u.x), $ = pa(W.floating, u.y);
    return i ? {
      ...I,
      transform: "translate(" + P + "px, " + $ + "px)",
      ...Gl(W.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: P,
      top: $
    };
  }, [n, i, W.floating, u.x, u.y]);
  return E.useMemo(() => ({
    ...u,
    update: R,
    refs: _,
    elements: W,
    floatingStyles: V
  }), [u, R, _, W, V]);
}
const Zh = (e) => {
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
}, Qh = (e, t) => ({
  ...Fh(e),
  options: [e, t]
}), Jh = (e, t) => ({
  ...zh(e),
  options: [e, t]
}), ep = (e, t) => ({
  ...Vh(e),
  options: [e, t]
}), tp = (e, t) => ({
  ...Uh(e),
  options: [e, t]
}), np = (e, t) => ({
  ...Yh(e),
  options: [e, t]
}), op = (e, t) => ({
  ...jh(e),
  options: [e, t]
}), rp = (e, t) => ({
  ...Zh(e),
  options: [e, t]
});
var sp = "Arrow", ql = E.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...s } = e;
  return /* @__PURE__ */ z(
    Ae.svg,
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
ql.displayName = sp;
var ip = ql;
function ap(e) {
  const [t, n] = E.useState(void 0);
  return Pt(() => {
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
var li = "Popper", [Xl, kr] = kn(li), [lp, Zl] = Xl(li), Ql = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = E.useState(null);
  return /* @__PURE__ */ z(lp, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
Ql.displayName = li;
var Jl = "PopperAnchor", ec = E.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, s = Zl(Jl, n), a = E.useRef(null), i = Ie(t, a), l = E.useRef(null);
    return E.useEffect(() => {
      const c = l.current;
      l.current = o?.current || a.current, c !== l.current && s.onAnchorChange(l.current);
    }), o ? null : /* @__PURE__ */ z(Ae.div, { ...r, ref: i });
  }
);
ec.displayName = Jl;
var ci = "PopperContent", [cp, up] = Xl(ci), tc = E.forwardRef(
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
    } = e, b = Zl(ci, n), [w, v] = E.useState(null), y = Ie(t, (O) => v(O)), [T, N] = E.useState(null), C = ap(T), S = C?.width ?? 0, k = C?.height ?? 0, D = o + (s !== "center" ? "-" + s : ""), x = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, M = Array.isArray(c) ? c : [c], A = M.length > 0, R = {
      padding: x,
      boundary: M.filter(mp),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: A
    }, { refs: L, floatingStyles: _, placement: W, isPositioned: V, middlewareData: I } = Xh({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: D,
      whileElementsMounted: (...O) => Hh(...O, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        Qh({ mainAxis: r + k, alignmentAxis: a }),
        l && Jh({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? ep() : void 0,
          ...R
        }),
        l && tp({ ...R }),
        np({
          ...R,
          apply: ({ elements: O, rects: ee, availableWidth: ne, availableHeight: ue }) => {
            const { width: we, height: be } = ee.reference, ze = O.floating.style;
            ze.setProperty("--radix-popper-available-width", `${ne}px`), ze.setProperty("--radix-popper-available-height", `${ue}px`), ze.setProperty("--radix-popper-anchor-width", `${we}px`), ze.setProperty("--radix-popper-anchor-height", `${be}px`);
          }
        }),
        T && rp({ element: T, padding: i }),
        fp({ arrowWidth: S, arrowHeight: k }),
        f && op({ strategy: "referenceHidden", ...R })
      ]
    }), [P, $] = rc(W), q = bt(g);
    Pt(() => {
      V && q?.();
    }, [V, q]);
    const H = I.arrow?.x, Y = I.arrow?.y, G = I.arrow?.centerOffset !== 0, [B, J] = E.useState();
    return Pt(() => {
      w && J(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ z(
      "div",
      {
        ref: L.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ..._,
          transform: V ? _.transform : "translate(0, -200%)",
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
          cp,
          {
            scope: n,
            placedSide: P,
            onArrowChange: N,
            arrowX: H,
            arrowY: Y,
            shouldHideArrow: G,
            children: /* @__PURE__ */ z(
              Ae.div,
              {
                "data-side": P,
                "data-align": $,
                ...p,
                ref: y,
                style: {
                  ...p.style,
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
tc.displayName = ci;
var nc = "PopperArrow", dp = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, oc = E.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = up(nc, o), a = dp[s.placedSide];
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
          ip,
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
oc.displayName = nc;
function mp(e) {
  return e !== null;
}
var fp = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, i = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [c, u] = rc(n), d = { start: "0%", center: "50%", end: "100%" }[u], f = (r.arrow?.x ?? 0) + i / 2, h = (r.arrow?.y ?? 0) + l / 2;
    let g = "", p = "";
    return c === "bottom" ? (g = a ? d : `${f}px`, p = `${-l}px`) : c === "top" ? (g = a ? d : `${f}px`, p = `${o.floating.height + l}px`) : c === "right" ? (g = `${-l}px`, p = a ? d : `${h}px`) : c === "left" && (g = `${o.floating.width + l}px`, p = a ? d : `${h}px`), { data: { x: g, y: p } };
  }
});
function rc(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var sc = Ql, ic = ec, ac = tc, lc = oc, hp = "Portal", ui = E.forwardRef((e, t) => {
  const { container: n, ...o } = e, [r, s] = E.useState(!1);
  Pt(() => s(!0), []);
  const a = n || r && globalThis?.document?.body;
  return a ? Om.createPortal(/* @__PURE__ */ z(Ae.div, { ...o, ref: t }), a) : null;
});
ui.displayName = hp;
function pp(e, t) {
  return E.useReducer((n, o) => t[n][o] ?? n, e);
}
var Gt = (e) => {
  const { present: t, children: n } = e, o = gp(t), r = typeof n == "function" ? n({ present: o.isPresent }) : E.Children.only(n), s = Ie(o.ref, bp(r));
  return typeof n == "function" || o.isPresent ? E.cloneElement(r, { ref: s }) : null;
};
Gt.displayName = "Presence";
function gp(e) {
  const [t, n] = E.useState(), o = E.useRef(null), r = E.useRef(e), s = E.useRef("none"), a = e ? "mounted" : "unmounted", [i, l] = pp(a, {
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
    const c = Io(o.current);
    s.current = i === "mounted" ? c : "none";
  }, [i]), Pt(() => {
    const c = o.current, u = r.current;
    if (u !== e) {
      const f = s.current, h = Io(c);
      e ? l("MOUNT") : h === "none" || c?.display === "none" ? l("UNMOUNT") : l(u && f !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), Pt(() => {
    if (t) {
      let c;
      const u = t.ownerDocument.defaultView ?? window, d = (h) => {
        const p = Io(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && p && (l("ANIMATION_END"), !r.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, f = (h) => {
        h.target === t && (s.current = Io(o.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        u.clearTimeout(c), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: E.useCallback((c) => {
      o.current = c ? getComputedStyle(c) : null, n(c);
    }, [])
  };
}
function Io(e) {
  return e?.animationName || "none";
}
function bp(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Xr = "rovingFocusGroup.onEntryFocus", vp = { bubbles: !1, cancelable: !0 }, eo = "RovingFocusGroup", [Ns, cc, wp] = Il(eo), [Np, uc] = kn(
  eo,
  [wp]
), [yp, kp] = Np(eo), dc = E.forwardRef(
  (e, t) => /* @__PURE__ */ z(Ns.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ z(Ns.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ z(xp, { ...e, ref: t }) }) })
);
dc.displayName = eo;
var xp = E.forwardRef((e, t) => {
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
  } = e, f = E.useRef(null), h = Ie(t, f), g = Rl(s), [p, b] = ei({
    prop: a,
    defaultProp: i ?? null,
    onChange: l,
    caller: eo
  }), [w, v] = E.useState(!1), y = bt(c), T = cc(n), N = E.useRef(!1), [C, S] = E.useState(0);
  return E.useEffect(() => {
    const k = f.current;
    if (k)
      return k.addEventListener(Xr, y), () => k.removeEventListener(Xr, y);
  }, [y]), /* @__PURE__ */ z(
    yp,
    {
      scope: n,
      orientation: o,
      dir: g,
      loop: r,
      currentTabStopId: p,
      onItemFocus: E.useCallback(
        (k) => b(k),
        [b]
      ),
      onItemShiftTab: E.useCallback(() => v(!0), []),
      onFocusableItemAdd: E.useCallback(
        () => S((k) => k + 1),
        []
      ),
      onFocusableItemRemove: E.useCallback(
        () => S((k) => k - 1),
        []
      ),
      children: /* @__PURE__ */ z(
        Ae.div,
        {
          tabIndex: w || C === 0 ? -1 : 0,
          "data-orientation": o,
          ...d,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: le(e.onMouseDown, () => {
            N.current = !0;
          }),
          onFocus: le(e.onFocus, (k) => {
            const D = !N.current;
            if (k.target === k.currentTarget && D && !w) {
              const x = new CustomEvent(Xr, vp);
              if (k.currentTarget.dispatchEvent(x), !x.defaultPrevented) {
                const M = T().filter((W) => W.focusable), A = M.find((W) => W.active), R = M.find((W) => W.id === p), _ = [A, R, ...M].filter(
                  Boolean
                ).map((W) => W.ref.current);
                hc(_, u);
              }
            }
            N.current = !1;
          }),
          onBlur: le(e.onBlur, () => v(!1))
        }
      )
    }
  );
}), mc = "RovingFocusGroupItem", fc = E.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: o = !0,
      active: r = !1,
      tabStopId: s,
      children: a,
      ...i
    } = e, l = er(), c = s || l, u = kp(mc, n), d = u.currentTabStopId === c, f = cc(n), { onFocusableItemAdd: h, onFocusableItemRemove: g, currentTabStopId: p } = u;
    return E.useEffect(() => {
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
          Ae.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": u.orientation,
            ...i,
            ref: t,
            onMouseDown: le(e.onMouseDown, (b) => {
              o ? u.onItemFocus(c) : b.preventDefault();
            }),
            onFocus: le(e.onFocus, () => u.onItemFocus(c)),
            onKeyDown: le(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const w = Ep(b, u.orientation, u.dir);
              if (w !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let y = f().filter((T) => T.focusable).map((T) => T.ref.current);
                if (w === "last") y.reverse();
                else if (w === "prev" || w === "next") {
                  w === "prev" && y.reverse();
                  const T = y.indexOf(b.currentTarget);
                  y = u.loop ? Sp(y, T + 1) : y.slice(T + 1);
                }
                setTimeout(() => hc(y));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: d, hasTabStop: p != null }) : a
          }
        )
      }
    );
  }
);
fc.displayName = mc;
var Cp = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Tp(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Ep(e, t, n) {
  const o = Tp(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return Cp[o];
}
function hc(e, t = !1) {
  const n = document.activeElement;
  for (const o of e)
    if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Sp(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var Mp = dc, Dp = fc, Ap = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, nn = /* @__PURE__ */ new WeakMap(), Ro = /* @__PURE__ */ new WeakMap(), Lo = {}, Zr = 0, pc = function(e) {
  return e && (e.host || pc(e.parentNode));
}, Pp = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = pc(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Ip = function(e, t, n, o) {
  var r = Pp(t, Array.isArray(e) ? e : [e]);
  Lo[n] || (Lo[n] = /* @__PURE__ */ new WeakMap());
  var s = Lo[n], a = [], i = /* @__PURE__ */ new Set(), l = new Set(r), c = function(d) {
    !d || i.has(d) || (i.add(d), c(d.parentNode));
  };
  r.forEach(c);
  var u = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (i.has(f))
        u(f);
      else
        try {
          var h = f.getAttribute(o), g = h !== null && h !== "false", p = (nn.get(f) || 0) + 1, b = (s.get(f) || 0) + 1;
          nn.set(f, p), s.set(f, b), a.push(f), p === 1 && g && Ro.set(f, !0), b === 1 && f.setAttribute(n, "true"), g || f.setAttribute(o, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", f, w);
        }
    });
  };
  return u(t), i.clear(), Zr++, function() {
    a.forEach(function(d) {
      var f = nn.get(d) - 1, h = s.get(d) - 1;
      nn.set(d, f), s.set(d, h), f || (Ro.has(d) || d.removeAttribute(o), Ro.delete(d)), h || d.removeAttribute(n);
    }), Zr--, Zr || (nn = /* @__PURE__ */ new WeakMap(), nn = /* @__PURE__ */ new WeakMap(), Ro = /* @__PURE__ */ new WeakMap(), Lo = {});
  };
}, Rp = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = Ap(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), Ip(o, r, n, "aria-hidden")) : function() {
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
function gc(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
  return n;
}
function Lp(e, t, n) {
  if (n || arguments.length === 2) for (var o = 0, r = t.length, s; o < r; o++)
    (s || !(o in t)) && (s || (s = Array.prototype.slice.call(t, 0, o)), s[o] = t[o]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var qo = "right-scroll-bar-position", Xo = "width-before-scroll-bar", Op = "with-scroll-bars-hidden", _p = "--removed-body-scroll-bar-size";
function Qr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function $p(e, t) {
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
var Bp = typeof window < "u" ? E.useLayoutEffect : E.useEffect, ga = /* @__PURE__ */ new WeakMap();
function Wp(e, t) {
  var n = $p(null, function(o) {
    return e.forEach(function(r) {
      return Qr(r, o);
    });
  });
  return Bp(function() {
    var o = ga.get(n);
    if (o) {
      var r = new Set(o), s = new Set(e), a = n.current;
      r.forEach(function(i) {
        s.has(i) || Qr(i, null);
      }), s.forEach(function(i) {
        r.has(i) || Qr(i, a);
      });
    }
    ga.set(n, e);
  }, [e]), n;
}
function Hp(e) {
  return e;
}
function Fp(e, t) {
  t === void 0 && (t = Hp);
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
function zp(e) {
  e === void 0 && (e = {});
  var t = Fp(null);
  return t.options = tt({ async: !0, ssr: !1 }, e), t;
}
var bc = function(e) {
  var t = e.sideCar, n = gc(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return E.createElement(o, tt({}, n));
};
bc.isSideCarExport = !0;
function Up(e, t) {
  return e.useMedium(t), bc;
}
var vc = zp(), Jr = function() {
}, xr = E.forwardRef(function(e, t) {
  var n = E.useRef(null), o = E.useState({
    onScrollCapture: Jr,
    onWheelCapture: Jr,
    onTouchMoveCapture: Jr
  }), r = o[0], s = o[1], a = e.forwardProps, i = e.children, l = e.className, c = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, h = e.noRelative, g = e.noIsolation, p = e.inert, b = e.allowPinchZoom, w = e.as, v = w === void 0 ? "div" : w, y = e.gapMode, T = gc(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), N = f, C = Wp([n, t]), S = tt(tt({}, T), r);
  return E.createElement(
    E.Fragment,
    null,
    u && E.createElement(N, { sideCar: vc, removeScrollBar: c, shards: d, noRelative: h, noIsolation: g, inert: p, setCallbacks: s, allowPinchZoom: !!b, lockRef: n, gapMode: y }),
    a ? E.cloneElement(E.Children.only(i), tt(tt({}, S), { ref: C })) : E.createElement(v, tt({}, S, { className: l, ref: C }), i)
  );
});
xr.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
xr.classNames = {
  fullWidth: Xo,
  zeroRight: qo
};
var Yp = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function jp() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Yp();
  return t && e.setAttribute("nonce", t), e;
}
function Vp(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Kp(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Gp = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = jp()) && (Vp(t, n), Kp(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, qp = function() {
  var e = Gp();
  return function(t, n) {
    E.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, wc = function() {
  var e = qp(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, Xp = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, es = function(e) {
  return parseInt(e || "", 10) || 0;
}, Zp = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [es(n), es(o), es(r)];
}, Qp = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Xp;
  var t = Zp(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, o - n + t[2] - t[0])
  };
}, Jp = wc(), fn = "data-scroll-locked", eg = function(e, t, n, o) {
  var r = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Op, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(i, "px ").concat(o, `;
  }
  body[`).concat(fn, `] {
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
  
  .`).concat(qo, ` {
    right: `).concat(i, "px ").concat(o, `;
  }
  
  .`).concat(Xo, ` {
    margin-right: `).concat(i, "px ").concat(o, `;
  }
  
  .`).concat(qo, " .").concat(qo, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(Xo, " .").concat(Xo, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(fn, `] {
    `).concat(_p, ": ").concat(i, `px;
  }
`);
}, ba = function() {
  var e = parseInt(document.body.getAttribute(fn) || "0", 10);
  return isFinite(e) ? e : 0;
}, tg = function() {
  E.useEffect(function() {
    return document.body.setAttribute(fn, (ba() + 1).toString()), function() {
      var e = ba() - 1;
      e <= 0 ? document.body.removeAttribute(fn) : document.body.setAttribute(fn, e.toString());
    };
  }, []);
}, ng = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  tg();
  var s = E.useMemo(function() {
    return Qp(r);
  }, [r]);
  return E.createElement(Jp, { styles: eg(s, !t, r, n ? "" : "!important") });
}, ys = !1;
if (typeof window < "u")
  try {
    var Oo = Object.defineProperty({}, "passive", {
      get: function() {
        return ys = !0, !0;
      }
    });
    window.addEventListener("test", Oo, Oo), window.removeEventListener("test", Oo, Oo);
  } catch {
    ys = !1;
  }
var on = ys ? { passive: !1 } : !1, og = function(e) {
  return e.tagName === "TEXTAREA";
}, Nc = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !og(e) && n[t] === "visible")
  );
}, rg = function(e) {
  return Nc(e, "overflowY");
}, sg = function(e) {
  return Nc(e, "overflowX");
}, va = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = yc(e, o);
    if (r) {
      var s = kc(e, o), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return !1;
}, ig = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [
    t,
    n,
    o
  ];
}, ag = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [
    t,
    n,
    o
  ];
}, yc = function(e, t) {
  return e === "v" ? rg(t) : sg(t);
}, kc = function(e, t) {
  return e === "v" ? ig(t) : ag(t);
}, lg = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, cg = function(e, t, n, o, r) {
  var s = lg(e, window.getComputedStyle(t).direction), a = s * o, i = n.target, l = t.contains(i), c = !1, u = a > 0, d = 0, f = 0;
  do {
    if (!i)
      break;
    var h = kc(e, i), g = h[0], p = h[1], b = h[2], w = p - b - s * g;
    (g || w) && yc(e, i) && (d += w, f += g);
    var v = i.parentNode;
    i = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(f) < 1) && (c = !0), c;
}, _o = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, wa = function(e) {
  return [e.deltaX, e.deltaY];
}, Na = function(e) {
  return e && "current" in e ? e.current : e;
}, ug = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, dg = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, mg = 0, rn = [];
function fg(e) {
  var t = E.useRef([]), n = E.useRef([0, 0]), o = E.useRef(), r = E.useState(mg++)[0], s = E.useState(wc)[0], a = E.useRef(e);
  E.useEffect(function() {
    a.current = e;
  }, [e]), E.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var p = Lp([e.lockRef.current], (e.shards || []).map(Na), !0).filter(Boolean);
      return p.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), p.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = E.useCallback(function(p, b) {
    if ("touches" in p && p.touches.length === 2 || p.type === "wheel" && p.ctrlKey)
      return !a.current.allowPinchZoom;
    var w = _o(p), v = n.current, y = "deltaX" in p ? p.deltaX : v[0] - w[0], T = "deltaY" in p ? p.deltaY : v[1] - w[1], N, C = p.target, S = Math.abs(y) > Math.abs(T) ? "h" : "v";
    if ("touches" in p && S === "h" && C.type === "range")
      return !1;
    var k = va(S, C);
    if (!k)
      return !0;
    if (k ? N = S : (N = S === "v" ? "h" : "v", k = va(S, C)), !k)
      return !1;
    if (!o.current && "changedTouches" in p && (y || T) && (o.current = N), !N)
      return !0;
    var D = o.current || N;
    return cg(D, b, p, D === "h" ? y : T);
  }, []), l = E.useCallback(function(p) {
    var b = p;
    if (!(!rn.length || rn[rn.length - 1] !== s)) {
      var w = "deltaY" in b ? wa(b) : _o(b), v = t.current.filter(function(N) {
        return N.name === b.type && (N.target === b.target || b.target === N.shadowParent) && ug(N.delta, w);
      })[0];
      if (v && v.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!v) {
        var y = (a.current.shards || []).map(Na).filter(Boolean).filter(function(N) {
          return N.contains(b.target);
        }), T = y.length > 0 ? i(b, y[0]) : !a.current.noIsolation;
        T && b.cancelable && b.preventDefault();
      }
    }
  }, []), c = E.useCallback(function(p, b, w, v) {
    var y = { name: p, delta: b, target: w, should: v, shadowParent: hg(w) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(T) {
        return T !== y;
      });
    }, 1);
  }, []), u = E.useCallback(function(p) {
    n.current = _o(p), o.current = void 0;
  }, []), d = E.useCallback(function(p) {
    c(p.type, wa(p), p.target, i(p, e.lockRef.current));
  }, []), f = E.useCallback(function(p) {
    c(p.type, _o(p), p.target, i(p, e.lockRef.current));
  }, []);
  E.useEffect(function() {
    return rn.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, on), document.addEventListener("touchmove", l, on), document.addEventListener("touchstart", u, on), function() {
      rn = rn.filter(function(p) {
        return p !== s;
      }), document.removeEventListener("wheel", l, on), document.removeEventListener("touchmove", l, on), document.removeEventListener("touchstart", u, on);
    };
  }, []);
  var h = e.removeScrollBar, g = e.inert;
  return E.createElement(
    E.Fragment,
    null,
    g ? E.createElement(s, { styles: dg(r) }) : null,
    h ? E.createElement(ng, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function hg(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const pg = Up(vc, fg);
var xc = E.forwardRef(function(e, t) {
  return E.createElement(xr, tt({}, e, { ref: t, sideCar: pg }));
});
xc.classNames = xr.classNames;
var ks = ["Enter", " "], gg = ["ArrowDown", "PageUp", "Home"], Cc = ["ArrowUp", "PageDown", "End"], bg = [...gg, ...Cc], vg = {
  ltr: [...ks, "ArrowRight"],
  rtl: [...ks, "ArrowLeft"]
}, wg = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, to = "Menu", [Gn, Ng, yg] = Il(to), [qt, Tc] = kn(to, [
  yg,
  kr,
  uc
]), Cr = kr(), Ec = uc(), [kg, Xt] = qt(to), [xg, no] = qt(to), Sc = (e) => {
  const { __scopeMenu: t, open: n = !1, children: o, dir: r, onOpenChange: s, modal: a = !0 } = e, i = Cr(t), [l, c] = E.useState(null), u = E.useRef(!1), d = bt(s), f = Rl(r);
  return E.useEffect(() => {
    const h = () => {
      u.current = !0, document.addEventListener("pointerdown", g, { capture: !0, once: !0 }), document.addEventListener("pointermove", g, { capture: !0, once: !0 });
    }, g = () => u.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", g, { capture: !0 }), document.removeEventListener("pointermove", g, { capture: !0 });
    };
  }, []), /* @__PURE__ */ z(sc, { ...i, children: /* @__PURE__ */ z(
    kg,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: l,
      onContentChange: c,
      children: /* @__PURE__ */ z(
        xg,
        {
          scope: t,
          onClose: E.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: u,
          dir: f,
          modal: a,
          children: o
        }
      )
    }
  ) });
};
Sc.displayName = to;
var Cg = "MenuAnchor", di = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = Cr(n);
    return /* @__PURE__ */ z(ic, { ...r, ...o, ref: t });
  }
);
di.displayName = Cg;
var mi = "MenuPortal", [Tg, Mc] = qt(mi, {
  forceMount: void 0
}), Dc = (e) => {
  const { __scopeMenu: t, forceMount: n, children: o, container: r } = e, s = Xt(mi, t);
  return /* @__PURE__ */ z(Tg, { scope: t, forceMount: n, children: /* @__PURE__ */ z(Gt, { present: n || s.open, children: /* @__PURE__ */ z(ui, { asChild: !0, container: r, children: o }) }) });
};
Dc.displayName = mi;
var Ve = "MenuContent", [Eg, fi] = qt(Ve), Ac = E.forwardRef(
  (e, t) => {
    const n = Mc(Ve, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, s = Xt(Ve, e.__scopeMenu), a = no(Ve, e.__scopeMenu);
    return /* @__PURE__ */ z(Gn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ z(Gt, { present: o || s.open, children: /* @__PURE__ */ z(Gn.Slot, { scope: e.__scopeMenu, children: a.modal ? /* @__PURE__ */ z(Sg, { ...r, ref: t }) : /* @__PURE__ */ z(Mg, { ...r, ref: t }) }) }) });
  }
), Sg = E.forwardRef(
  (e, t) => {
    const n = Xt(Ve, e.__scopeMenu), o = E.useRef(null), r = Ie(t, o);
    return E.useEffect(() => {
      const s = o.current;
      if (s) return Rp(s);
    }, []), /* @__PURE__ */ z(
      hi,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: le(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), Mg = E.forwardRef((e, t) => {
  const n = Xt(Ve, e.__scopeMenu);
  return /* @__PURE__ */ z(
    hi,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), Dg = /* @__PURE__ */ jn("MenuContent.ScrollLock"), hi = E.forwardRef(
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
    } = e, b = Xt(Ve, n), w = no(Ve, n), v = Cr(n), y = Ec(n), T = Ng(n), [N, C] = E.useState(null), S = E.useRef(null), k = Ie(t, S, b.onContentChange), D = E.useRef(0), x = E.useRef(""), M = E.useRef(0), A = E.useRef(null), R = E.useRef("right"), L = E.useRef(0), _ = g ? xc : E.Fragment, W = g ? { as: Dg, allowPinchZoom: !0 } : void 0, V = (P) => {
      const $ = x.current + P, q = T().filter((O) => !O.disabled), H = document.activeElement, Y = q.find((O) => O.ref.current === H)?.textValue, G = q.map((O) => O.textValue), B = Fg(G, $, Y), J = q.find((O) => O.textValue === B)?.ref.current;
      (function O(ee) {
        x.current = ee, window.clearTimeout(D.current), ee !== "" && (D.current = window.setTimeout(() => O(""), 1e3));
      })($), J && setTimeout(() => J.focus());
    };
    E.useEffect(() => () => window.clearTimeout(D.current), []), Wf();
    const I = E.useCallback((P) => R.current === A.current?.side && Ug(P, A.current?.area), []);
    return /* @__PURE__ */ z(
      Eg,
      {
        scope: n,
        searchRef: x,
        onItemEnter: E.useCallback(
          (P) => {
            I(P) && P.preventDefault();
          },
          [I]
        ),
        onItemLeave: E.useCallback(
          (P) => {
            I(P) || (S.current?.focus(), C(null));
          },
          [I]
        ),
        onTriggerLeave: E.useCallback(
          (P) => {
            I(P) && P.preventDefault();
          },
          [I]
        ),
        pointerGraceTimerRef: M,
        onPointerGraceIntentChange: E.useCallback((P) => {
          A.current = P;
        }, []),
        children: /* @__PURE__ */ z(_, { ...W, children: /* @__PURE__ */ z(
          _l,
          {
            asChild: !0,
            trapped: r,
            onMountAutoFocus: le(s, (P) => {
              P.preventDefault(), S.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: a,
            children: /* @__PURE__ */ z(
              ti,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: c,
                onPointerDownOutside: u,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: h,
                children: /* @__PURE__ */ z(
                  Mp,
                  {
                    asChild: !0,
                    ...y,
                    dir: w.dir,
                    orientation: "vertical",
                    loop: o,
                    currentTabStopId: N,
                    onCurrentTabStopIdChange: C,
                    onEntryFocus: le(l, (P) => {
                      w.isUsingKeyboardRef.current || P.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ z(
                      ac,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Vc(b.open),
                        "data-radix-menu-content": "",
                        dir: w.dir,
                        ...v,
                        ...p,
                        ref: k,
                        style: { outline: "none", ...p.style },
                        onKeyDown: le(p.onKeyDown, (P) => {
                          const q = P.target.closest("[data-radix-menu-content]") === P.currentTarget, H = P.ctrlKey || P.altKey || P.metaKey, Y = P.key.length === 1;
                          q && (P.key === "Tab" && P.preventDefault(), !H && Y && V(P.key));
                          const G = S.current;
                          if (P.target !== G || !bg.includes(P.key)) return;
                          P.preventDefault();
                          const J = T().filter((O) => !O.disabled).map((O) => O.ref.current);
                          Cc.includes(P.key) && J.reverse(), Wg(J);
                        }),
                        onBlur: le(e.onBlur, (P) => {
                          P.currentTarget.contains(P.target) || (window.clearTimeout(D.current), x.current = "");
                        }),
                        onPointerMove: le(
                          e.onPointerMove,
                          qn((P) => {
                            const $ = P.target, q = L.current !== P.clientX;
                            if (P.currentTarget.contains($) && q) {
                              const H = P.clientX > L.current ? "right" : "left";
                              R.current = H, L.current = P.clientX;
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
Ac.displayName = Ve;
var Ag = "MenuGroup", pi = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ z(Ae.div, { role: "group", ...o, ref: t });
  }
);
pi.displayName = Ag;
var Pg = "MenuLabel", Pc = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ z(Ae.div, { ...o, ref: t });
  }
);
Pc.displayName = Pg;
var sr = "MenuItem", ya = "menu.itemSelect", Tr = E.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: o, ...r } = e, s = E.useRef(null), a = no(sr, e.__scopeMenu), i = fi(sr, e.__scopeMenu), l = Ie(t, s), c = E.useRef(!1), u = () => {
      const d = s.current;
      if (!n && d) {
        const f = new CustomEvent(ya, { bubbles: !0, cancelable: !0 });
        d.addEventListener(ya, (h) => o?.(h), { once: !0 }), Pl(d, f), f.defaultPrevented ? c.current = !1 : a.onClose();
      }
    };
    return /* @__PURE__ */ z(
      Ic,
      {
        ...r,
        ref: l,
        disabled: n,
        onClick: le(e.onClick, u),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), c.current = !0;
        },
        onPointerUp: le(e.onPointerUp, (d) => {
          c.current || d.currentTarget?.click();
        }),
        onKeyDown: le(e.onKeyDown, (d) => {
          const f = i.searchRef.current !== "";
          n || f && d.key === " " || ks.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
Tr.displayName = sr;
var Ic = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: o = !1, textValue: r, ...s } = e, a = fi(sr, n), i = Ec(n), l = E.useRef(null), c = Ie(t, l), [u, d] = E.useState(!1), [f, h] = E.useState("");
    return E.useEffect(() => {
      const g = l.current;
      g && h((g.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ z(
      Gn.ItemSlot,
      {
        scope: n,
        disabled: o,
        textValue: r ?? f,
        children: /* @__PURE__ */ z(Dp, { asChild: !0, ...i, focusable: !o, children: /* @__PURE__ */ z(
          Ae.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": o || void 0,
            "data-disabled": o ? "" : void 0,
            ...s,
            ref: c,
            onPointerMove: le(
              e.onPointerMove,
              qn((g) => {
                o ? a.onItemLeave(g) : (a.onItemEnter(g), g.defaultPrevented || g.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: le(
              e.onPointerLeave,
              qn((g) => a.onItemLeave(g))
            ),
            onFocus: le(e.onFocus, () => d(!0)),
            onBlur: le(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), Ig = "MenuCheckboxItem", Rc = E.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: o, ...r } = e;
    return /* @__PURE__ */ z(Bc, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ z(
      Tr,
      {
        role: "menuitemcheckbox",
        "aria-checked": ir(n) ? "mixed" : n,
        ...r,
        ref: t,
        "data-state": bi(n),
        onSelect: le(
          r.onSelect,
          () => o?.(ir(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Rc.displayName = Ig;
var Lc = "MenuRadioGroup", [Rg, Lg] = qt(
  Lc,
  { value: void 0, onValueChange: () => {
  } }
), Oc = E.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: o, ...r } = e, s = bt(o);
    return /* @__PURE__ */ z(Rg, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ z(pi, { ...r, ref: t }) });
  }
);
Oc.displayName = Lc;
var _c = "MenuRadioItem", $c = E.forwardRef(
  (e, t) => {
    const { value: n, ...o } = e, r = Lg(_c, e.__scopeMenu), s = n === r.value;
    return /* @__PURE__ */ z(Bc, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ z(
      Tr,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...o,
        ref: t,
        "data-state": bi(s),
        onSelect: le(
          o.onSelect,
          () => r.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
$c.displayName = _c;
var gi = "MenuItemIndicator", [Bc, Og] = qt(
  gi,
  { checked: !1 }
), Wc = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: o, ...r } = e, s = Og(gi, n);
    return /* @__PURE__ */ z(
      Gt,
      {
        present: o || ir(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ z(
          Ae.span,
          {
            ...r,
            ref: t,
            "data-state": bi(s.checked)
          }
        )
      }
    );
  }
);
Wc.displayName = gi;
var _g = "MenuSeparator", Hc = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ z(
      Ae.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...o,
        ref: t
      }
    );
  }
);
Hc.displayName = _g;
var $g = "MenuArrow", Fc = E.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, r = Cr(n);
    return /* @__PURE__ */ z(lc, { ...r, ...o, ref: t });
  }
);
Fc.displayName = $g;
var Bg = "MenuSub", [$1, zc] = qt(Bg), $n = "MenuSubTrigger", Uc = E.forwardRef(
  (e, t) => {
    const n = Xt($n, e.__scopeMenu), o = no($n, e.__scopeMenu), r = zc($n, e.__scopeMenu), s = fi($n, e.__scopeMenu), a = E.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = s, c = { __scopeMenu: e.__scopeMenu }, u = E.useCallback(() => {
      a.current && window.clearTimeout(a.current), a.current = null;
    }, []);
    return E.useEffect(() => u, [u]), E.useEffect(() => {
      const d = i.current;
      return () => {
        window.clearTimeout(d), l(null);
      };
    }, [i, l]), /* @__PURE__ */ z(di, { asChild: !0, ...c, children: /* @__PURE__ */ z(
      Ic,
      {
        id: r.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": r.contentId,
        "data-state": Vc(n.open),
        ...e,
        ref: br(t, r.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: le(
          e.onPointerMove,
          qn((d) => {
            s.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !a.current && (s.onPointerGraceIntentChange(null), a.current = window.setTimeout(() => {
              n.onOpenChange(!0), u();
            }, 100));
          })
        ),
        onPointerLeave: le(
          e.onPointerLeave,
          qn((d) => {
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
        onKeyDown: le(e.onKeyDown, (d) => {
          const f = s.searchRef.current !== "";
          e.disabled || f && d.key === " " || vg[o.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
Uc.displayName = $n;
var Yc = "MenuSubContent", jc = E.forwardRef(
  (e, t) => {
    const n = Mc(Ve, e.__scopeMenu), { forceMount: o = n.forceMount, ...r } = e, s = Xt(Ve, e.__scopeMenu), a = no(Ve, e.__scopeMenu), i = zc(Yc, e.__scopeMenu), l = E.useRef(null), c = Ie(t, l);
    return /* @__PURE__ */ z(Gn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ z(Gt, { present: o || s.open, children: /* @__PURE__ */ z(Gn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ z(
      hi,
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
        onFocusOutside: le(e.onFocusOutside, (u) => {
          u.target !== i.trigger && s.onOpenChange(!1);
        }),
        onEscapeKeyDown: le(e.onEscapeKeyDown, (u) => {
          a.onClose(), u.preventDefault();
        }),
        onKeyDown: le(e.onKeyDown, (u) => {
          const d = u.currentTarget.contains(u.target), f = wg[a.dir].includes(u.key);
          d && f && (s.onOpenChange(!1), i.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
jc.displayName = Yc;
function Vc(e) {
  return e ? "open" : "closed";
}
function ir(e) {
  return e === "indeterminate";
}
function bi(e) {
  return ir(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Wg(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Hg(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function Fg(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = Hg(e, Math.max(s, 0));
  r.length === 1 && (a = a.filter((c) => c !== n));
  const l = a.find(
    (c) => c.toLowerCase().startsWith(r.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function zg(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], c = i.x, u = i.y, d = l.x, f = l.y;
    u > o != f > o && n < (d - c) * (o - u) / (f - u) + c && (r = !r);
  }
  return r;
}
function Ug(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return zg(n, t);
}
function qn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Yg = Sc, jg = di, Vg = Dc, Kg = Ac, Gg = pi, qg = Pc, Xg = Tr, Zg = Rc, Qg = Oc, Jg = $c, eb = Wc, tb = Hc, nb = Fc, ob = Uc, rb = jc, Er = "DropdownMenu", [sb] = kn(
  Er,
  [Tc]
), Re = Tc(), [ib, Kc] = sb(Er), Gc = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: o,
    open: r,
    defaultOpen: s,
    onOpenChange: a,
    modal: i = !0
  } = e, l = Re(t), c = E.useRef(null), [u, d] = ei({
    prop: r,
    defaultProp: s ?? !1,
    onChange: a,
    caller: Er
  });
  return /* @__PURE__ */ z(
    ib,
    {
      scope: t,
      triggerId: er(),
      triggerRef: c,
      contentId: er(),
      open: u,
      onOpenChange: d,
      onOpenToggle: E.useCallback(() => d((f) => !f), [d]),
      modal: i,
      children: /* @__PURE__ */ z(Yg, { ...l, open: u, onOpenChange: d, dir: o, modal: i, children: n })
    }
  );
};
Gc.displayName = Er;
var qc = "DropdownMenuTrigger", Xc = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: o = !1, ...r } = e, s = Kc(qc, n), a = Re(n);
    return /* @__PURE__ */ z(jg, { asChild: !0, ...a, children: /* @__PURE__ */ z(
      Ae.button,
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
        ref: br(t, s.triggerRef),
        onPointerDown: le(e.onPointerDown, (i) => {
          !o && i.button === 0 && i.ctrlKey === !1 && (s.onOpenToggle(), s.open || i.preventDefault());
        }),
        onKeyDown: le(e.onKeyDown, (i) => {
          o || (["Enter", " "].includes(i.key) && s.onOpenToggle(), i.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
Xc.displayName = qc;
var ab = "DropdownMenuPortal", Zc = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, o = Re(t);
  return /* @__PURE__ */ z(Vg, { ...o, ...n });
};
Zc.displayName = ab;
var Qc = "DropdownMenuContent", Jc = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Kc(Qc, n), s = Re(n), a = E.useRef(!1);
    return /* @__PURE__ */ z(
      Kg,
      {
        id: r.contentId,
        "aria-labelledby": r.triggerId,
        ...s,
        ...o,
        ref: t,
        onCloseAutoFocus: le(e.onCloseAutoFocus, (i) => {
          a.current || r.triggerRef.current?.focus(), a.current = !1, i.preventDefault();
        }),
        onInteractOutside: le(e.onInteractOutside, (i) => {
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
Jc.displayName = Qc;
var lb = "DropdownMenuGroup", cb = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Re(n);
    return /* @__PURE__ */ z(Gg, { ...r, ...o, ref: t });
  }
);
cb.displayName = lb;
var ub = "DropdownMenuLabel", db = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Re(n);
    return /* @__PURE__ */ z(qg, { ...r, ...o, ref: t });
  }
);
db.displayName = ub;
var mb = "DropdownMenuItem", eu = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Re(n);
    return /* @__PURE__ */ z(Xg, { ...r, ...o, ref: t });
  }
);
eu.displayName = mb;
var fb = "DropdownMenuCheckboxItem", hb = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Re(n);
  return /* @__PURE__ */ z(Zg, { ...r, ...o, ref: t });
});
hb.displayName = fb;
var pb = "DropdownMenuRadioGroup", gb = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Re(n);
  return /* @__PURE__ */ z(Qg, { ...r, ...o, ref: t });
});
gb.displayName = pb;
var bb = "DropdownMenuRadioItem", vb = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Re(n);
  return /* @__PURE__ */ z(Jg, { ...r, ...o, ref: t });
});
vb.displayName = bb;
var wb = "DropdownMenuItemIndicator", Nb = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Re(n);
  return /* @__PURE__ */ z(eb, { ...r, ...o, ref: t });
});
Nb.displayName = wb;
var yb = "DropdownMenuSeparator", tu = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Re(n);
  return /* @__PURE__ */ z(tb, { ...r, ...o, ref: t });
});
tu.displayName = yb;
var kb = "DropdownMenuArrow", xb = E.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, r = Re(n);
    return /* @__PURE__ */ z(nb, { ...r, ...o, ref: t });
  }
);
xb.displayName = kb;
var Cb = "DropdownMenuSubTrigger", Tb = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Re(n);
  return /* @__PURE__ */ z(ob, { ...r, ...o, ref: t });
});
Tb.displayName = Cb;
var Eb = "DropdownMenuSubContent", Sb = E.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, r = Re(n);
  return /* @__PURE__ */ z(
    rb,
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
Sb.displayName = Eb;
var Mb = Gc, Db = Xc, Ab = Zc, Pb = Jc, Ib = eu, Rb = tu;
function nu(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = nu(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function ou() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = nu(e)) && (o && (o += " "), o += t);
  return o;
}
const vi = "-", Lb = (e) => {
  const t = _b(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(vi);
      return i[0] === "" && i.length !== 1 && i.shift(), ru(i, t) || Ob(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const l = n[a] || [];
      return i && o[a] ? [...l, ...o[a]] : l;
    }
  };
}, ru = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], o = t.nextPart.get(n), r = o ? ru(e.slice(1), o) : void 0;
  if (r)
    return r;
  if (t.validators.length === 0)
    return;
  const s = e.join(vi);
  return t.validators.find(({
    validator: a
  }) => a(s))?.classGroupId;
}, ka = /^\[(.+)\]$/, Ob = (e) => {
  if (ka.test(e)) {
    const t = ka.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, _b = (e) => {
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
      if ($b(r)) {
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
  return t.split(vi).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}, $b = (e) => e.isThemeGetter, Bb = (e) => {
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
}, Cs = "!", Ts = ":", Wb = Ts.length, Hb = (e) => {
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
          s.push(r.slice(l, g)), l = g + Wb;
          continue;
        }
        if (p === "/") {
          c = g;
          continue;
        }
      }
      p === "[" ? a++ : p === "]" ? a-- : p === "(" ? i++ : p === ")" && i--;
    }
    const u = s.length === 0 ? r : r.substring(l), d = Fb(u), f = d !== u, h = c && c > l ? c - l : void 0;
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
}, Fb = (e) => e.endsWith(Cs) ? e.substring(0, e.length - 1) : e.startsWith(Cs) ? e.substring(1) : e, zb = (e) => {
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
}, Ub = (e) => ({
  cache: Bb(e.cacheSize),
  parseClassName: Hb(e),
  sortModifiers: zb(e),
  ...Lb(e)
}), Yb = /\s+/, jb = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: s
  } = t, a = [], i = e.trim().split(Yb);
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
    const v = s(f).join(":"), y = h ? v + Cs : v, T = y + w;
    if (a.includes(T))
      continue;
    a.push(T);
    const N = r(w, b);
    for (let C = 0; C < N.length; ++C) {
      const S = N[C];
      a.push(y + S);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function Vb() {
  let e = 0, t, n, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = su(t)) && (o && (o += " "), o += n);
  return o;
}
const su = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = su(e[o])) && (n && (n += " "), n += t);
  return n;
};
function Kb(e, ...t) {
  let n, o, r, s = a;
  function a(l) {
    const c = t.reduce((u, d) => d(u), e());
    return n = Ub(c), o = n.cache.get, r = n.cache.set, s = i, i(l);
  }
  function i(l) {
    const c = o(l);
    if (c)
      return c;
    const u = jb(l, n);
    return r(l, u), u;
  }
  return function() {
    return s(Vb.apply(null, arguments));
  };
}
const Ce = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, iu = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, au = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Gb = /^\d+\/\d+$/, qb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Xb = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Zb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Qb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Jb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, sn = (e) => Gb.test(e), ce = (e) => !!e && !Number.isNaN(Number(e)), Tt = (e) => !!e && Number.isInteger(Number(e)), ts = (e) => e.endsWith("%") && ce(e.slice(0, -1)), ut = (e) => qb.test(e), ev = () => !0, tv = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Xb.test(e) && !Zb.test(e)
), lu = () => !1, nv = (e) => Qb.test(e), ov = (e) => Jb.test(e), rv = (e) => !Z(e) && !Q(e), sv = (e) => Tn(e, du, lu), Z = (e) => iu.test(e), Wt = (e) => Tn(e, mu, tv), ns = (e) => Tn(e, uv, ce), Ca = (e) => Tn(e, cu, lu), iv = (e) => Tn(e, uu, ov), $o = (e) => Tn(e, fu, nv), Q = (e) => au.test(e), Rn = (e) => En(e, mu), av = (e) => En(e, dv), Ta = (e) => En(e, cu), lv = (e) => En(e, du), cv = (e) => En(e, uu), Bo = (e) => En(e, fu, !0), Tn = (e, t, n) => {
  const o = iu.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, En = (e, t, n = !1) => {
  const o = au.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, cu = (e) => e === "position" || e === "percentage", uu = (e) => e === "image" || e === "url", du = (e) => e === "length" || e === "size" || e === "bg-size", mu = (e) => e === "length", uv = (e) => e === "number", dv = (e) => e === "family-name", fu = (e) => e === "shadow", mv = () => {
  const e = Ce("color"), t = Ce("font"), n = Ce("text"), o = Ce("font-weight"), r = Ce("tracking"), s = Ce("leading"), a = Ce("breakpoint"), i = Ce("container"), l = Ce("spacing"), c = Ce("radius"), u = Ce("shadow"), d = Ce("inset-shadow"), f = Ce("text-shadow"), h = Ce("drop-shadow"), g = Ce("blur"), p = Ce("perspective"), b = Ce("aspect"), w = Ce("ease"), v = Ce("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], T = () => [
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
  ], N = () => [...T(), Q, Z], C = () => ["auto", "hidden", "clip", "visible", "scroll"], S = () => ["auto", "contain", "none"], k = () => [Q, Z, l], D = () => [sn, "full", "auto", ...k()], x = () => [Tt, "none", "subgrid", Q, Z], M = () => ["auto", {
    span: ["full", Tt, Q, Z]
  }, Tt, Q, Z], A = () => [Tt, "auto", Q, Z], R = () => ["auto", "min", "max", "fr", Q, Z], L = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], _ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...k()], V = () => [sn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], I = () => [e, Q, Z], P = () => [...T(), Ta, Ca, {
    position: [Q, Z]
  }], $ = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], q = () => ["auto", "cover", "contain", lv, sv, {
    size: [Q, Z]
  }], H = () => [ts, Rn, Wt], Y = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    Q,
    Z
  ], G = () => ["", ce, Rn, Wt], B = () => ["solid", "dashed", "dotted", "double"], J = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], O = () => [ce, ts, Ta, Ca], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    Q,
    Z
  ], ne = () => ["none", ce, Q, Z], ue = () => ["none", ce, Q, Z], we = () => [ce, Q, Z], be = () => [sn, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ut],
      breakpoint: [ut],
      color: [ev],
      container: [ut],
      "drop-shadow": [ut],
      ease: ["in", "out", "in-out"],
      font: [rv],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ut],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ut],
      shadow: [ut],
      spacing: ["px", ce],
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
        aspect: ["auto", "square", sn, Z, Q, b]
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
        columns: [ce, Z, Q, i]
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
        basis: [sn, "full", "auto", i, ...k()]
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
        flex: [ce, sn, "auto", "initial", "none", Z]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ce, Q, Z]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ce, Q, Z]
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
        "grid-cols": x()
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
        "grid-rows": x()
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
        m: W()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: W()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: W()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: W()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: W()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: W()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: W()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: W()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: W()
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
        w: [i, "screen", ...V()]
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
          ...V()
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
        text: ["base", n, Rn, Wt]
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
        font: [o, Q, ns]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ts, Z]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [av, Z, t]
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
        tracking: [r, Q, Z]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ce, "none", Q, ns]
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
        decoration: [ce, "from-font", "auto", Q, Wt]
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
        "underline-offset": [ce, "auto", Q, Z]
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
        bg: P()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: $()
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
        }, cv, iv]
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
        from: H()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: H()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: H()
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
        "outline-offset": [ce, Q, Z]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ce, Rn, Wt]
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
          Bo,
          $o
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
        "inset-shadow": ["none", d, Bo, $o]
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
        ring: I()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ce, Wt]
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
        "inset-ring": G()
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
        "text-shadow": ["none", f, Bo, $o]
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
        opacity: [ce, Q, Z]
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
        "mask-linear": [ce]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": O()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": O()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": I()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": O()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": O()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": I()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": O()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": O()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": I()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": O()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": O()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": I()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": O()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": O()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": I()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": O()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": O()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": I()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": O()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": O()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": I()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": I()
      }],
      "mask-image-radial": [{
        "mask-radial": [Q, Z]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": O()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": O()
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
        "mask-radial-at": T()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ce]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": O()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": O()
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
        mask: $()
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
        brightness: [ce, Q, Z]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ce, Q, Z]
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
          Bo,
          $o
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
        grayscale: ["", ce, Q, Z]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ce, Q, Z]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ce, Q, Z]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ce, Q, Z]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ce, Q, Z]
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
        "backdrop-brightness": [ce, Q, Z]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ce, Q, Z]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ce, Q, Z]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ce, Q, Z]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ce, Q, Z]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ce, Q, Z]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ce, Q, Z]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ce, Q, Z]
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
        duration: [ce, "initial", Q, Z]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", w, Q, Z]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ce, Q, Z]
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
        perspective: [p, Q, Z]
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
        fill: ["none", ...I()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ce, Rn, Wt, ns]
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
}, fv = /* @__PURE__ */ Kb(mv);
function ae(...e) {
  return fv(ou(e));
}
function os({
  ...e
}) {
  return /* @__PURE__ */ m(Mb, { "data-slot": "dropdown-menu", ...e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/dropdown-menu.tsx",
    lineNumber: 10,
    columnNumber: 10
  }, this);
}
function rs({
  ...e
}) {
  return /* @__PURE__ */ m(
    Db,
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
function ss({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ m(Ab, { children: /* @__PURE__ */ m(
    Pb,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: ae(
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
function Ne({
  className: e,
  inset: t,
  variant: n = "default",
  ...o
}) {
  return /* @__PURE__ */ m(
    Ib,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: ae(
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
function is({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Rb,
    {
      "data-slot": "dropdown-menu-separator",
      className: ae("bg-border -mx-1 my-1 h-px", e),
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
const Ea = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Sa = ou, hv = (e, t) => (n) => {
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
}, Es = hv(
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
  asChild: o = !1,
  ...r
}) {
  return /* @__PURE__ */ m(
    o ? xf : "button",
    {
      "data-slot": "button",
      className: ae(Es({ variant: t, size: n, className: e })),
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
var pv = Object.freeze({
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
}), gv = "VisuallyHidden", hu = E.forwardRef(
  (e, t) => /* @__PURE__ */ z(
    Ae.span,
    {
      ...e,
      ref: t,
      style: { ...pv, ...e.style }
    }
  )
);
hu.displayName = gv;
var bv = hu, [Sr] = kn("Tooltip", [
  kr
]), Mr = kr(), pu = "TooltipProvider", vv = 700, Ss = "tooltip.open", [wv, wi] = Sr(pu), gu = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = vv,
    skipDelayDuration: o = 300,
    disableHoverableContent: r = !1,
    children: s
  } = e, a = E.useRef(!0), i = E.useRef(!1), l = E.useRef(0);
  return E.useEffect(() => {
    const c = l.current;
    return () => window.clearTimeout(c);
  }, []), /* @__PURE__ */ z(
    wv,
    {
      scope: t,
      isOpenDelayedRef: a,
      delayDuration: n,
      onOpen: E.useCallback(() => {
        window.clearTimeout(l.current), a.current = !1;
      }, []),
      onClose: E.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => a.current = !0,
          o
        );
      }, [o]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: E.useCallback((c) => {
        i.current = c;
      }, []),
      disableHoverableContent: r,
      children: s
    }
  );
};
gu.displayName = pu;
var Xn = "Tooltip", [Nv, oo] = Sr(Xn), bu = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: i
  } = e, l = wi(Xn, e.__scopeTooltip), c = Mr(t), [u, d] = E.useState(null), f = er(), h = E.useRef(0), g = a ?? l.disableHoverableContent, p = i ?? l.delayDuration, b = E.useRef(!1), [w, v] = ei({
    prop: o,
    defaultProp: r ?? !1,
    onChange: (S) => {
      S ? (l.onOpen(), document.dispatchEvent(new CustomEvent(Ss))) : l.onClose(), s?.(S);
    },
    caller: Xn
  }), y = E.useMemo(() => w ? b.current ? "delayed-open" : "instant-open" : "closed", [w]), T = E.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, b.current = !1, v(!0);
  }, [v]), N = E.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, v(!1);
  }, [v]), C = E.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      b.current = !0, v(!0), h.current = 0;
    }, p);
  }, [p, v]);
  return E.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ z(sc, { ...c, children: /* @__PURE__ */ z(
    Nv,
    {
      scope: t,
      contentId: f,
      open: w,
      stateAttribute: y,
      trigger: u,
      onTriggerChange: d,
      onTriggerEnter: E.useCallback(() => {
        l.isOpenDelayedRef.current ? C() : T();
      }, [l.isOpenDelayedRef, C, T]),
      onTriggerLeave: E.useCallback(() => {
        g ? N() : (window.clearTimeout(h.current), h.current = 0);
      }, [N, g]),
      onOpen: T,
      onClose: N,
      disableHoverableContent: g,
      children: n
    }
  ) });
};
bu.displayName = Xn;
var Ms = "TooltipTrigger", vu = E.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = oo(Ms, n), s = wi(Ms, n), a = Mr(n), i = E.useRef(null), l = Ie(t, i, r.onTriggerChange), c = E.useRef(!1), u = E.useRef(!1), d = E.useCallback(() => c.current = !1, []);
    return E.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ z(ic, { asChild: !0, ...a, children: /* @__PURE__ */ z(
      Ae.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...o,
        ref: l,
        onPointerMove: le(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !u.current && !s.isPointerInTransitRef.current && (r.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: le(e.onPointerLeave, () => {
          r.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: le(e.onPointerDown, () => {
          r.open && r.onClose(), c.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: le(e.onFocus, () => {
          c.current || r.onOpen();
        }),
        onBlur: le(e.onBlur, r.onClose),
        onClick: le(e.onClick, r.onClose)
      }
    ) });
  }
);
vu.displayName = Ms;
var Ni = "TooltipPortal", [yv, kv] = Sr(Ni, {
  forceMount: void 0
}), wu = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, s = oo(Ni, t);
  return /* @__PURE__ */ z(yv, { scope: t, forceMount: n, children: /* @__PURE__ */ z(Gt, { present: n || s.open, children: /* @__PURE__ */ z(ui, { asChild: !0, container: r, children: o }) }) });
};
wu.displayName = Ni;
var wn = "TooltipContent", Nu = E.forwardRef(
  (e, t) => {
    const n = kv(wn, e.__scopeTooltip), { forceMount: o = n.forceMount, side: r = "top", ...s } = e, a = oo(wn, e.__scopeTooltip);
    return /* @__PURE__ */ z(Gt, { present: o || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ z(yu, { side: r, ...s, ref: t }) : /* @__PURE__ */ z(xv, { side: r, ...s, ref: t }) });
  }
), xv = E.forwardRef((e, t) => {
  const n = oo(wn, e.__scopeTooltip), o = wi(wn, e.__scopeTooltip), r = E.useRef(null), s = Ie(t, r), [a, i] = E.useState(null), { trigger: l, onClose: c } = n, u = r.current, { onPointerInTransitChange: d } = o, f = E.useCallback(() => {
    i(null), d(!1);
  }, [d]), h = E.useCallback(
    (g, p) => {
      const b = g.currentTarget, w = { x: g.clientX, y: g.clientY }, v = Sv(w, b.getBoundingClientRect()), y = Mv(w, v), T = Dv(p.getBoundingClientRect()), N = Pv([...y, ...T]);
      i(N), d(!0);
    },
    [d]
  );
  return E.useEffect(() => () => f(), [f]), E.useEffect(() => {
    if (l && u) {
      const g = (b) => h(b, u), p = (b) => h(b, l);
      return l.addEventListener("pointerleave", g), u.addEventListener("pointerleave", p), () => {
        l.removeEventListener("pointerleave", g), u.removeEventListener("pointerleave", p);
      };
    }
  }, [l, u, h, f]), E.useEffect(() => {
    if (a) {
      const g = (p) => {
        const b = p.target, w = { x: p.clientX, y: p.clientY }, v = l?.contains(b) || u?.contains(b), y = !Av(w, a);
        v ? f() : y && (f(), c());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [l, u, a, c, f]), /* @__PURE__ */ z(yu, { ...e, ref: s });
}), [Cv, Tv] = Sr(Xn, { isInside: !1 }), Ev = /* @__PURE__ */ Tf("TooltipContent"), yu = E.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: o,
      "aria-label": r,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...i
    } = e, l = oo(wn, n), c = Mr(n), { onClose: u } = l;
    return E.useEffect(() => (document.addEventListener(Ss, u), () => document.removeEventListener(Ss, u)), [u]), E.useEffect(() => {
      if (l.trigger) {
        const d = (f) => {
          f.target?.contains(l.trigger) && u();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [l.trigger, u]), /* @__PURE__ */ z(
      ti,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ Lm(
          ac,
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
              /* @__PURE__ */ z(Ev, { children: o }),
              /* @__PURE__ */ z(Cv, { scope: n, isInside: !0, children: /* @__PURE__ */ z(bv, { id: l.contentId, role: "tooltip", children: r || o }) })
            ]
          }
        )
      }
    );
  }
);
Nu.displayName = wn;
var ku = "TooltipArrow", xu = E.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...o } = e, r = Mr(n);
    return Tv(
      ku,
      n
    ).isInside ? null : /* @__PURE__ */ z(lc, { ...r, ...o, ref: t });
  }
);
xu.displayName = ku;
function Sv(e, t) {
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
function Mv(e, t, n = 5) {
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
function Dv(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: o },
    { x: r, y: o }
  ];
}
function Av(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const i = t[s], l = t[a], c = i.x, u = i.y, d = l.x, f = l.y;
    u > o != f > o && n < (d - c) * (o - u) / (f - u) + c && (r = !r);
  }
  return r;
}
function Pv(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), Iv(t);
}
function Iv(e) {
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
var Rv = gu, Lv = bu, Ov = vu, _v = wu, $v = Nu, Bv = xu;
function Wv({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ m(
    Rv,
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
  return /* @__PURE__ */ m(Wv, { children: /* @__PURE__ */ m(Lv, { "data-slot": "tooltip", ...e }, void 0, !1, {
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
  return /* @__PURE__ */ m(Ov, { "data-slot": "tooltip-trigger", ...e }, void 0, !1, {
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
  return /* @__PURE__ */ m(_v, { children: /* @__PURE__ */ m(
    $v,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: ae(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ m(Bv, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" }, void 0, !1, {
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
const ye = ({ onClick: e, isActive: t, disabled: n, children: o, tooltip: r }) => {
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
}, an = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 shrink-0" }, void 0, !1, {
  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
  lineNumber: 137,
  columnNumber: 3
}, void 0), Hv = Nt(function({ editor: t, onCopyMarkdown: n, onOpenLinkPopover: o, className: r = "", autoReorderChecklist: s = !1, aiEnabled: a = !1, onAISparklesClick: i }) {
  const l = j(null), [c, u] = U(!1), [d, f] = U(void 0), h = ll({
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
  }), g = F(() => {
    const { view: C } = t, { from: S } = C.state.selection, k = C.coordsAtPos(S);
    f({ top: k.bottom + 8, left: k.left }), u(!0);
  }, [t]), p = F((C, S) => {
    t.chain().focus().setImage({ src: C, alt: S }).run(), u(!1);
  }, [t]), b = F(() => {
    t.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run();
  }, [t]), w = F((C) => {
    t.chain().focus().insertCallout({ type: C }).run();
  }, [t]), v = j(/* @__PURE__ */ new Map()), y = j(/* @__PURE__ */ new Map()), T = F((C) => {
    const { doc: S, tr: k } = C.state;
    let D = !1;
    const x = /* @__PURE__ */ new Set(["taskList", "bulletList", "orderedList"]), M = C.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol');
    v.current.clear(), M.forEach((R, L) => {
      R.querySelectorAll(":scope > li").forEach((W) => {
        const V = W, I = (V.textContent || "").trim().substring(0, 50);
        v.current.set(`${L}-${I}`, V.getBoundingClientRect());
      });
    });
    const A = [];
    S.descendants((R, L, _, W) => {
      if (!x.has(R.type.name)) return !0;
      let V = !1;
      if (R.forEach((P) => {
        P.type.name === "taskItem" && (V = !0);
      }), !V) return !0;
      let I = 0;
      return S.nodesBetween(0, L, (P) => (x.has(P.type.name) && I++, !0)), A.push({ node: R, pos: L, depth: I }), !0;
    }), A.sort((R, L) => L.depth - R.depth);
    for (const { node: R, pos: L } of A) {
      const _ = [];
      let W = 0;
      R.forEach((B) => {
        _.push({
          node: B,
          isTask: B.type.name === "taskItem",
          checked: B.type.name === "taskItem" && B.attrs.checked === !0,
          originalIndex: W++
        });
      });
      const V = _.filter((B) => B.isTask && !B.checked), I = _.filter((B) => B.isTask && B.checked), P = [..._], $ = _.map((B, J) => ({ index: J, isTask: B.isTask })).filter((B) => B.isTask).map((B) => B.index), q = [...V, ...I];
      if ($.forEach((B, J) => {
        P[B] = q[J];
      }), !P.some((B, J) => B.node !== _[J].node)) continue;
      const Y = R.type.create(
        R.attrs,
        P.map((B) => B.node)
      ), G = k.mapping.map(L);
      k.replaceWith(G, G + R.nodeSize, Y), D = !0;
    }
    D && (C.view.dispatch(k), requestAnimationFrame(() => {
      C.view.dom.querySelectorAll('ul[data-type="taskList"], ul:not([data-type]), ol').forEach((L) => {
        const _ = L.querySelectorAll(":scope > li"), W = /* @__PURE__ */ new Map();
        v.current.forEach((V, I) => {
          const P = I.replace(/^\d+-/, "");
          W.set(P, V);
        }), _.forEach((V) => {
          const I = V, P = (I.textContent || "").trim().substring(0, 50), $ = W.get(P);
          if (!$) return;
          const q = I.getBoundingClientRect(), H = $.top - q.top;
          if (Math.abs(H) < 2) return;
          I.style.transform = `translateY(${H}px)`, I.style.transition = "none", I.style.zIndex = "1", I.offsetHeight, I.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", I.style.transform = "translateY(0)";
          const Y = () => {
            I.style.transform = "", I.style.transition = "", I.style.zIndex = "", I.removeEventListener("transitionend", Y);
          };
          I.addEventListener("transitionend", Y), setTimeout(Y, 400);
        });
      });
    }));
  }, []);
  K(() => {
    if (!s || !t) return;
    const C = /* @__PURE__ */ new Map();
    t.state.doc.descendants((k, D) => (k.type.name === "taskItem" && C.set(D, k.attrs.checked === !0), !0)), y.current = C;
    const S = ({ transaction: k }) => {
      if (!k.docChanged) return;
      const D = /* @__PURE__ */ new Map();
      t.state.doc.descendants((A, R) => (A.type.name === "taskItem" && D.set(R, A.attrs.checked === !0), !0));
      const x = y.current;
      let M = !1;
      if (x.size > 0 && D.size > 0) {
        let A = 0, R = 0;
        x.forEach((L) => {
          L && A++;
        }), D.forEach((L) => {
          L && R++;
        }), A !== R && (M = !0);
      }
      y.current = D, M && setTimeout(() => {
        T(t);
      }, 150);
    };
    return t.on("transaction", S), () => {
      t.off("transaction", S);
    };
  }, [t, s, T]);
  const N = F(() => {
    T(t);
  }, [t, T]);
  return /* @__PURE__ */ m("div", { className: `flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30 overflow-x-auto scrollbar-hide editor-toolbar ${r}`, children: [
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().undo().run(),
        disabled: !h?.canUndo,
        tooltip: "Undo (Ctrl+Z)",
        children: /* @__PURE__ */ m(Gd, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => t.chain().focus().redo().run(),
        disabled: !h?.canRedo,
        tooltip: "Redo (Ctrl+Shift+Z)",
        children: /* @__PURE__ */ m(qd, { size: 16 }, void 0, !1, {
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
    /* @__PURE__ */ m(an, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 399,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleBold().run(),
        isActive: h?.isBold,
        tooltip: "Bold (Ctrl+B)",
        children: /* @__PURE__ */ m(Ws, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => t.chain().focus().toggleItalic().run(),
        isActive: h?.isItalic,
        tooltip: "Italic (Ctrl+I)",
        children: /* @__PURE__ */ m(Hs, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => t.chain().focus().toggleUnderline().run(),
        isActive: h?.isUnderline,
        tooltip: "Underline (Ctrl+U)",
        children: /* @__PURE__ */ m(Fs, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => t.chain().focus().toggleStrike().run(),
        isActive: h?.isStrike,
        tooltip: "Strikethrough",
        children: /* @__PURE__ */ m(zs, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => t.chain().focus().toggleCode().run(),
        isActive: h?.isCode,
        tooltip: "Inline Code (Ctrl+E)",
        children: /* @__PURE__ */ m(dl, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => t.chain().focus().toggleHighlight().run(),
        isActive: h?.isHighlight,
        tooltip: "Highlight",
        children: /* @__PURE__ */ m(ml, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => o?.(),
        isActive: h?.isLink,
        tooltip: "Link (Ctrl+K)",
        children: /* @__PURE__ */ m(Us, { size: 16 }, void 0, !1, {
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
    /* @__PURE__ */ m(an, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 452,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(os, { children: [
      /* @__PURE__ */ m(rs, { asChild: !0, children: /* @__PURE__ */ m(
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
            /* @__PURE__ */ m(At, { size: 12, strokeWidth: 2.5, className: "flex-shrink-0" }, void 0, !1, {
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
      /* @__PURE__ */ m(ss, { align: "start", className: "min-w-[130px]", children: [
        /* @__PURE__ */ m(
          Ne,
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
          Ne,
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
          Ne,
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
          Ne,
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
          Ne,
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
          Ne,
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
    /* @__PURE__ */ m(an, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 520,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: () => t.chain().focus().toggleBulletList().run(),
        isActive: h?.isBulletList,
        tooltip: "Bullet List",
        children: /* @__PURE__ */ m(Ys, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => t.chain().focus().toggleOrderedList().run(),
        isActive: h?.isOrderedList,
        tooltip: "Numbered List",
        children: /* @__PURE__ */ m(js, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => t.chain().focus().toggleTaskList().run(),
        isActive: h?.isTaskList,
        tooltip: "Task List",
        children: /* @__PURE__ */ m(Vs, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => t.chain().focus().toggleBlockquote().run(),
        isActive: h?.isBlockquote,
        tooltip: "Quote",
        children: /* @__PURE__ */ m(Ks, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => Js(t),
        isActive: h?.isCodeBlock,
        tooltip: "Code Block",
        children: /* @__PURE__ */ m(fl, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => {
          if (h?.isTaskList)
            t.chain().focus().sinkListItem("taskItem").run();
          else if ((h?.isBulletList || h?.isOrderedList) && (t.chain().focus().sinkListItem("listItem").run(), h?.isOrderedList)) {
            const { state: C, view: S } = t, { $from: k } = C.selection, D = C.schema.nodes.orderedList, x = C.schema.nodes.bulletList;
            if (D && x)
              for (let M = k.depth; M >= 0; M--) {
                const A = k.node(M);
                if (A.type === D && M >= 2) {
                  const R = k.node(M - 1);
                  if (R.type.name === "listItem" || R.type.name === "taskItem") {
                    const L = k.before(M);
                    S.dispatch(C.tr.setNodeMarkup(L, x, A.attrs));
                    break;
                  }
                }
                if (A.type.name === "bulletList" || A.type.name === "taskList") break;
              }
          }
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Indent (Tab)",
        children: /* @__PURE__ */ m(Xd, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => {
          h?.isTaskList ? t.chain().focus().liftListItem("taskItem").run() : (h?.isBulletList || h?.isOrderedList) && t.chain().focus().liftListItem("listItem").run();
        },
        disabled: !h?.isBulletList && !h?.isOrderedList && !h?.isTaskList,
        tooltip: "Outdent (Shift+Tab)",
        children: /* @__PURE__ */ m(Zd, { size: 16 }, void 0, !1, {
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
    /* @__PURE__ */ m(an, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 607,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: b,
        tooltip: "Insert Table (3×3)",
        children: /* @__PURE__ */ m(hs, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: g,
        tooltip: "Insert Image",
        children: /* @__PURE__ */ m($s, { size: 16 }, void 0, !1, {
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
      ye,
      {
        onClick: () => t.chain().focus().setHorizontalRule().run(),
        tooltip: "Horizontal Rule",
        children: /* @__PURE__ */ m(hl, { size: 16 }, void 0, !1, {
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
    /* @__PURE__ */ m(os, { children: [
      /* @__PURE__ */ m(rs, { asChild: !0, children: /* @__PURE__ */ m(
        "button",
        {
          className: "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-100 ease-out touch-manipulation bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
          title: "Insert Callout",
          children: /* @__PURE__ */ m(Jo, { size: 16 }, void 0, !1, {
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
      /* @__PURE__ */ m(ss, { align: "start", children: [
        /* @__PURE__ */ m(Ne, { onClick: () => w("info"), children: [
          /* @__PURE__ */ m(Jo, { size: 16, className: "mr-2", style: { color: "#3F78BB" } }, void 0, !1, {
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
        /* @__PURE__ */ m(Ne, { onClick: () => w("note"), children: [
          /* @__PURE__ */ m(Gs, { size: 16, className: "mr-2", style: { color: "#FF8200" } }, void 0, !1, {
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
        /* @__PURE__ */ m(Ne, { onClick: () => w("prompt"), children: [
          /* @__PURE__ */ m(Qd, { size: 16, className: "mr-2", style: { color: "#B244B3" } }, void 0, !1, {
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
        /* @__PURE__ */ m(Ne, { onClick: () => w("resources"), children: [
          /* @__PURE__ */ m(Jd, { size: 16, className: "mr-2", style: { color: "#63B148" } }, void 0, !1, {
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
        /* @__PURE__ */ m(Ne, { onClick: () => w("todo"), children: [
          /* @__PURE__ */ m(qs, { size: 16, className: "mr-2", style: { color: "#4479B3" } }, void 0, !1, {
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
    t.isActive("table") && /* @__PURE__ */ m(os, { children: [
      /* @__PURE__ */ m(rs, { asChild: !0, children: /* @__PURE__ */ m(
        Dt,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-1.5 gap-1 bg-primary/10 shrink-0",
          children: [
            /* @__PURE__ */ m(hs, { size: 16 }, void 0, !1, {
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
      /* @__PURE__ */ m(ss, { align: "start", className: "w-56", children: [
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().addColumnBefore().run(),
            disabled: !t.can().addColumnBefore(),
            children: [
              /* @__PURE__ */ m(Ui, { size: 16, className: "mr-2" }, void 0, !1, {
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
          Ne,
          {
            onClick: () => t.chain().focus().addColumnAfter().run(),
            disabled: !t.can().addColumnAfter(),
            children: [
              /* @__PURE__ */ m(Ui, { size: 16, className: "mr-2" }, void 0, !1, {
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
          Ne,
          {
            onClick: () => t.chain().focus().deleteColumn().run(),
            disabled: !t.can().deleteColumn(),
            children: [
              /* @__PURE__ */ m(dn, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
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
        /* @__PURE__ */ m(is, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 689,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().addRowBefore().run(),
            disabled: !t.can().addRowBefore(),
            children: [
              /* @__PURE__ */ m(Yi, { size: 16, className: "mr-2" }, void 0, !1, {
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
          Ne,
          {
            onClick: () => t.chain().focus().addRowAfter().run(),
            disabled: !t.can().addRowAfter(),
            children: [
              /* @__PURE__ */ m(Yi, { size: 16, className: "mr-2" }, void 0, !1, {
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
          Ne,
          {
            onClick: () => t.chain().focus().deleteRow().run(),
            disabled: !t.can().deleteRow(),
            children: [
              /* @__PURE__ */ m(dn, { size: 16, className: "mr-2 text-destructive" }, void 0, !1, {
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
        /* @__PURE__ */ m(is, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 708,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeaderRow().run(),
            disabled: !t.can().toggleHeaderRow(),
            children: [
              /* @__PURE__ */ m(ji, { size: 16, className: "mr-2" }, void 0, !1, {
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
          Ne,
          {
            onClick: () => t.chain().focus().toggleHeaderColumn().run(),
            disabled: !t.can().toggleHeaderColumn(),
            children: [
              /* @__PURE__ */ m(ji, { size: 16, className: "mr-2" }, void 0, !1, {
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
        /* @__PURE__ */ m(is, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
          lineNumber: 722,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ m(
          Ne,
          {
            onClick: () => t.chain().focus().deleteTable().run(),
            disabled: !t.can().deleteTable(),
            className: "text-destructive",
            children: [
              /* @__PURE__ */ m(dn, { size: 16, className: "mr-2" }, void 0, !1, {
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
      Dl,
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
    /* @__PURE__ */ m(an, {}, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorToolbar.tsx",
      lineNumber: 743,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m(
      ye,
      {
        onClick: N,
        tooltip: "Sort tasks: unchecked first, checked last",
        children: /* @__PURE__ */ m(em, { size: 16 }, void 0, !1, {
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
    a && /* @__PURE__ */ m(ve, { children: [
      /* @__PURE__ */ m(an, {}, void 0, !1, {
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
            children: /* @__PURE__ */ m(pr, { size: 16 }, void 0, !1, {
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
        Dt,
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
function Fv({ editor: e, isOpen: t, onClose: n, focusTrigger: o = 0, initialSearchQuery: r, editorMode: s = "wysiwyg", rawMarkdown: a = "", onRawMarkdownChange: i, onMatchesChange: l }) {
  const c = s === "markdown", [u, d] = U(""), [f, h] = U(""), [g, p] = U(!1), [b, w] = U(!1), [v, y] = U(!1), [T, N] = U(!1), [C, S] = U([]), [k, D] = U(0), [x, M] = U(null), [A, R] = U(!1), L = j(!1), _ = j(null), W = j(null), V = j(!1);
  K(() => {
    t && r && r.trim() && d(r);
  }, [t, r, o]);
  const I = F(() => {
    if (!u || !e) {
      S([]), D(0), M(null);
      return;
    }
    const B = [];
    let J;
    try {
      if (b)
        J = new RegExp(u, g ? "g" : "gi");
      else {
        let O = u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        v && (O = `\\b${O}\\b`), J = new RegExp(O, g ? "g" : "gi");
      }
      M(null);
    } catch (O) {
      M(O.message), S([]);
      return;
    }
    if (c) {
      let O;
      for (; (O = J.exec(a)) !== null; )
        B.push({
          from: O.index,
          to: O.index + O[0].length,
          text: O[0]
        });
    } else {
      const { doc: O } = e.state;
      O.descendants((ee, ne) => {
        if (ee.isText && ee.text) {
          let ue;
          for (; (ue = J.exec(ee.text)) !== null; )
            B.push({
              from: ne + ue.index,
              to: ne + ue.index + ue[0].length,
              text: ue[0]
            });
        }
        return !0;
      });
    }
    S(B), B.length > 0 && k >= B.length && D(0);
  }, [u, g, b, v, e, k, c, a]);
  K(() => {
    I();
  }, [I]), K(() => {
    c && l && (t && C.length > 0 ? l(C, k) : l([], 0));
  }, [c, t, C, k, l]), K(() => {
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
  }, [e, t, u, g, b, k, c, C, a]), K(() => {
    !t && e && (typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), l && l([], 0), L.current || typeof e.commands.clearAllOccurrences == "function" && (e.commands.clearAllOccurrences(), R(!1)), L.current = !1);
  }, [t, e, l]), K(() => {
    if (C.length > 0 && k < C.length) {
      const B = C[k];
      if (c) {
        const O = document.querySelector(".syntax-textarea");
        if (O && V.current) {
          const ee = parseInt(getComputedStyle(O).lineHeight) || 22, ue = a.substring(0, B.from).split(`
`).length;
          O.scrollTop = Math.max(0, (ue - 3) * ee);
        }
        V.current && (V.current = !1);
        return;
      }
      const J = e.view.domAtPos(B.from);
      J.node && J.node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" }), V.current && (V.current = !1);
    }
  }, [k, C, e, c, a]), K(() => {
    t && _.current && (_.current.focus(), _.current.select());
  }, [t, o]);
  const P = F(() => {
    C.length !== 0 && (V.current = !0, D((B) => (B + 1) % C.length));
  }, [C.length]), $ = F(() => {
    C.length !== 0 && (V.current = !0, D((B) => (B - 1 + C.length) % C.length));
  }, [C.length]), q = F(() => {
    if (C.length === 0 || k >= C.length) return;
    const B = C[k];
    if (c && i) {
      const J = a.substring(0, B.from) + f + a.substring(B.to);
      i(J), setTimeout(I, 10);
      return;
    }
    e.chain().focus().setTextSelection({ from: B.from, to: B.to }).deleteSelection().insertContent(f).run(), setTimeout(I, 10);
  }, [C, k, f, e, I, c, a, i]), H = F(() => {
    if (C.length === 0) return;
    if (c && i) {
      const J = [...C].sort((ee, ne) => ne.from - ee.from);
      let O = a;
      J.forEach((ee) => {
        O = O.substring(0, ee.from) + f + O.substring(ee.to);
      }), i(O), setTimeout(I, 10);
      return;
    }
    const B = [...C].sort((J, O) => O.from - J.from);
    e.chain().focus(), B.forEach((J) => {
      e.chain().setTextSelection({ from: J.from, to: J.to }).deleteSelection().insertContent(f).run();
    }), setTimeout(I, 10);
  }, [C, f, e, I, c, a, i]), Y = F(() => {
    if (C.length === 0 || !u || !(typeof e.commands.selectAllOccurrences == "function")) return;
    e.commands.selectAllOccurrences({
      searchTerm: u,
      caseSensitive: g,
      useRegex: b,
      wholeWord: v
    }) && (R(!0), L.current = !0, typeof e.commands.clearSearchHighlight == "function" && e.commands.clearSearchHighlight(), n(), e.commands.focus());
  }, [C, u, g, b, v, e, n]), G = F((B) => {
    B.key === "Enter" ? (B.preventDefault(), B.shiftKey ? $() : P(), _.current?.focus()) : B.key === "Escape" ? (B.preventDefault(), n()) : B.key === "h" && (B.ctrlKey || B.metaKey) ? (B.preventDefault(), N((J) => !J)) : B.key === "l" && (B.ctrlKey || B.metaKey) && B.shiftKey && (B.preventDefault(), Y());
  }, [P, $, n, Y]);
  return t ? /* @__PURE__ */ m(
    "div",
    {
      className: "find-replace-panel",
      onKeyDown: G,
      children: [
        /* @__PURE__ */ m("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ m("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(tm, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
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
                className: `find-replace-input ${x ? "has-error" : ""}`
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
            x && /* @__PURE__ */ m("span", { className: "find-replace-error", title: x, children: "!" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 391,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
            lineNumber: 380,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m("span", { className: "find-replace-count", children: C.length > 0 ? `${k + 1} of ${C.length}` : u ? "No results" : "" }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
            lineNumber: 396,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              onClick: $,
              disabled: C.length === 0,
              className: "find-replace-btn",
              title: "Previous match (Shift+Enter)",
              children: /* @__PURE__ */ m(nm, { size: 16 }, void 0, !1, {
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
              onClick: P,
              disabled: C.length === 0,
              className: "find-replace-btn",
              title: "Next match (Enter)",
              children: /* @__PURE__ */ m(At, { size: 16 }, void 0, !1, {
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
              onClick: Y,
              disabled: C.length === 0,
              className: `find-replace-btn ${A ? "active" : ""}`,
              title: `Select all occurrences (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Shift+L) — Apply formatting to all ${C.length} matches`,
              children: /* @__PURE__ */ m(om, { size: 16 }, void 0, !1, {
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
              children: /* @__PURE__ */ m(rm, { size: 16 }, void 0, !1, {
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
              children: /* @__PURE__ */ m(sm, { size: 16 }, void 0, !1, {
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
              children: /* @__PURE__ */ m(im, { size: 16 }, void 0, !1, {
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
              className: `find-replace-btn ${T ? "active" : ""}`,
              title: "Toggle replace (Ctrl+H)",
              children: /* @__PURE__ */ m(ps, { size: 16 }, void 0, !1, {
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
              children: /* @__PURE__ */ m(gt, { size: 16 }, void 0, !1, {
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
        T && /* @__PURE__ */ m("div", { className: "find-replace-row", children: [
          /* @__PURE__ */ m("div", { className: "find-replace-input-wrapper", children: [
            /* @__PURE__ */ m(ps, { size: 14, className: "find-replace-icon" }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FindReplace.tsx",
              lineNumber: 480,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m(
              "input",
              {
                ref: W,
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
              onClick: q,
              disabled: C.length === 0,
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
              onClick: H,
              disabled: C.length === 0,
              className: "find-replace-btn replace-btn",
              title: "Replace all",
              children: [
                /* @__PURE__ */ m(am, { size: 14 }, void 0, !1, {
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
const zv = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), dt = zv ? "⌘" : "Ctrl", Uv = ({ editor: e }) => {
  const [t, n] = U(!1), [o, r] = U(0), [s, a] = U(0), [i, l] = U(""), [c, u] = U(""), [d, f] = U(!1), [h, g] = U(!1);
  K(() => {
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
  const p = F(() => {
    e.commands.toggleMarkOnAllOccurrences("bold"), e.commands.focus();
  }, [e]), b = F(() => {
    e.commands.toggleMarkOnAllOccurrences("italic"), e.commands.focus();
  }, [e]), w = F(() => {
    e.commands.toggleMarkOnAllOccurrences("underline"), e.commands.focus();
  }, [e]), v = F(() => {
    e.commands.toggleMarkOnAllOccurrences("strike"), e.commands.focus();
  }, [e]), y = F(() => {
    e.commands.deleteAllOccurrences(), e.commands.focus();
  }, [e]), T = F(() => {
    e.commands.clearAllOccurrences(), e.commands.focus();
  }, [e]), N = F(() => {
    e.commands.selectNextOccurrence(), e.commands.focus();
  }, [e]), C = F(() => {
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
      /* @__PURE__ */ m("div", { className: "select-all-action-bar-preview", children: d ? /* @__PURE__ */ m(ve, { children: [
        /* @__PURE__ */ m(hr, { size: 12, className: "select-all-action-bar-preview-icon" }, void 0, !1, {
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
      }, void 0) : /* @__PURE__ */ m(ve, { children: /* @__PURE__ */ m("span", { className: "select-all-action-bar-preview-term", children: [
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
      h && o < s && /* @__PURE__ */ m(ve, { children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: N,
            className: "select-all-action-bar-btn select-all-action-bar-btn-primary",
            title: `Select next occurrence (${dt}+D)`,
            children: /* @__PURE__ */ m(Xs, { size: 14 }, void 0, !1, {
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
            onClick: C,
            className: "select-all-action-bar-btn select-all-action-bar-btn-secondary",
            title: `Select all remaining (${dt}+Shift+L)`,
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
          title: `Bold all occurrences (${dt}+B)`,
          children: /* @__PURE__ */ m(Ws, { size: 14 }, void 0, !1, {
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
          title: `Italic all occurrences (${dt}+I)`,
          children: /* @__PURE__ */ m(Hs, { size: 14 }, void 0, !1, {
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
          title: `Underline all occurrences (${dt}+U)`,
          children: /* @__PURE__ */ m(Fs, { size: 14 }, void 0, !1, {
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
          children: /* @__PURE__ */ m(zs, { size: 14 }, void 0, !1, {
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
          children: /* @__PURE__ */ m(dn, { size: 14 }, void 0, !1, {
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
          onClick: T,
          className: "select-all-action-bar-btn",
          title: "Exit select all mode (Escape)",
          children: /* @__PURE__ */ m(gt, { size: 14 }, void 0, !1, {
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
    /* @__PURE__ */ m("div", { className: "select-all-action-bar-hint", children: h && o < s ? /* @__PURE__ */ m(ve, { children: [
      /* @__PURE__ */ m("kbd", { children: [
        dt,
        "+D"
      ] }, void 0, !0, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SelectAllActionBar.tsx",
        lineNumber: 233,
        columnNumber: 13
      }, void 0),
      " next · ",
      /* @__PURE__ */ m("kbd", { children: [
        dt,
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
        dt,
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
    }, void 0) : /* @__PURE__ */ m(ve, { children: [
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
        dt,
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
}, Yv = Nt(Uv), Wo = "-dismissed";
function jv(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const o = e.charCodeAt(n);
    t = (t << 5) - t + o, t = t & t;
  }
  return t;
}
function Vv(e, t = {}) {
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
  }), c = j(null), u = j(""), d = j(0);
  K(() => {
    if (r && !(!e || e.isDestroyed))
      try {
        const w = localStorage.getItem(n), v = localStorage.getItem(n + Wo);
        if (w && !v) {
          let y = "";
          try {
            y = e.getHTML() || "";
          } catch {
            return;
          }
          w !== y && w.length > 50 && l((T) => ({ ...T, hasRecoverableContent: !0 }));
        }
      } catch (w) {
        console.warn("useAutoSave: Error checking for recoverable content", w);
      }
  }, [e, n, r]);
  const f = F(() => {
    if (!(!e || !r || e.isDestroyed))
      try {
        const w = e.getHTML(), v = jv(w);
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
  K(() => {
    if (!e || !r || e.isDestroyed) return;
    const w = () => {
      e.isDestroyed || (c.current && clearTimeout(c.current), c.current = setTimeout(() => {
        f();
      }, o));
    };
    return e.on("update", w), () => {
      e.off("update", w), c.current && clearTimeout(c.current);
    };
  }, [e, o, r, f]), K(() => {
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
  const h = F(() => {
    c.current && clearTimeout(c.current), f();
  }, [f]), g = F(() => {
    try {
      localStorage.removeItem(n), localStorage.removeItem(n + "-timestamp"), localStorage.removeItem(n + Wo), u.current = "", l({
        status: "idle",
        lastSaved: null,
        hasRecoverableContent: !1,
        error: null
      });
    } catch (w) {
      console.warn("useAutoSave: Error clearing content", w);
    }
  }, [n]), p = F(() => {
    if (!e || e.isDestroyed) return null;
    try {
      const w = localStorage.getItem(n);
      return w && e && !e.isDestroyed ? (l((v) => ({ ...v, hasRecoverableContent: !1 })), queueMicrotask(() => {
        if (e && !e.isDestroyed)
          try {
            e.commands.setContent(w), u.current = w, localStorage.removeItem(n + Wo), a?.(w);
          } catch (v) {
            console.warn("useAutoSave: Error setting content during recovery", v);
          }
      }), w) : null;
    } catch (w) {
      return console.warn("useAutoSave: Error recovering content", w), null;
    }
  }, [e, n, a]), b = F(() => {
    try {
      localStorage.setItem(n + Wo, "true"), l((w) => ({ ...w, hasRecoverableContent: !1 }));
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
function Zo(e, t, n) {
  const { state: o } = e, { tr: r } = o;
  t !== n && r.delete(t, n);
  const s = r.doc.resolve(t), a = o.schema.nodes.horizontalRule.create(), i = s.before(s.depth), l = s.after(s.depth);
  r.replaceWith(i, l, a);
  const c = i + a.nodeSize;
  if (c < r.doc.content.size) {
    const u = r.doc.resolve(c);
    u.nodeAfter && u.nodeAfter.isTextblock ? r.setSelection(je.create(r.doc, c + 1)) : u.nodeAfter && r.setSelection(je.near(r.doc.resolve(c)));
  } else {
    const d = o.schema.nodes.paragraph.create();
    r.insert(c, d), r.setSelection(je.create(r.doc, c + 1));
  }
  r.scrollIntoView(), e.view.dispatch(r);
}
function Fn(e) {
  return e.replace(/^[ \t]*\u200B[ \t]*$/gm, "").replace(/\u200B/g, "");
}
function Kv(e, {
  editor: t,
  turndownService: n,
  editorModeRef: o,
  handleModeSwitch: r,
  wordCount: s,
  autoSaveState: a,
  setIsFindReplaceOpen: i,
  setFindReplaceFocusTrigger: l
}) {
  Fd(e, () => ({
    getEditor: () => t,
    getHTML: () => t?.getHTML() || "",
    getMarkdown: () => t ? Fn(n.turndown(t.getHTML())) : "",
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
      t && Zo(t, t.state.selection.from, t.state.selection.from);
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
const Gv = new De("tableCellMenu");
function qv(e) {
  return new Me({
    key: Gv,
    props: {
      handleDOMEvents: {
        contextmenu(t, n) {
          const r = n.target.closest("td, th");
          if (r && r.closest(".ProseMirror")) {
            n.preventDefault();
            const s = t.posAtDOM(r, 0);
            return e.chain().focus().setTextSelection(s).run(), Xv(n, e, s), !0;
          }
          return !1;
        }
      }
    }
  });
}
function Xv(e, t, n) {
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
    { label: "Copy Table", icon: "copy", action: () => Zv(t) }
  ], b = {
    "col-left": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M9 12H3m0 0l2-2m-2 2l2 2"/></svg>',
    "col-right": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M15 12h6m0 0l-2-2m2 2l-2 2"/></svg>',
    "row-up": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 9V3m0 0l-2 2m2-2l2 2"/></svg>',
    "row-down": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 15v6m0 0l-2-2m2 2l2-2"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    "table-delete": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "toggle-header": '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/></svg>'
  }, w = c ? "#2a2a2a" : "#f5f5f5", v = c ? "#ff6b6b" : "#dc2626", y = c ? "#999999" : "#666666", T = c ? "#333333" : "#e5e5e5";
  p.forEach((S) => {
    if (S.label === "divider") {
      const k = document.createElement("div");
      k.style.cssText = "height:1px;background:" + T + ";margin:4px 0;", r.appendChild(k);
    } else {
      const k = document.createElement("button");
      k.type = "button";
      const D = S.destructive ? v : f;
      k.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;font-size:13px;font-weight:450;color:" + D + ";background:transparent;border:none;border-radius:5px;cursor:pointer;text-align:left;transition:background 0.15s ease;pointer-events:auto;";
      const x = b[S.icon || ""] || "", M = S.destructive ? v : y;
      k.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:' + M + ';">' + x + '</span><span style="flex:1;white-space:nowrap;">' + S.label + "</span>", k.addEventListener("mouseenter", () => {
        k.style.background = S.destructive ? c ? "rgba(255,107,107,0.15)" : "rgba(220,38,38,0.1)" : w;
      }), k.addEventListener("mouseleave", () => {
        k.style.background = "transparent";
      }), k.addEventListener("click", (A) => {
        A.preventDefault(), A.stopPropagation(), S.action && S.action(), r.remove();
      }), r.appendChild(k);
    }
  }), document.body.appendChild(r);
  const N = (S) => {
    const k = S.target;
    r.contains(k) || (r.remove(), document.removeEventListener("mousedown", N), document.removeEventListener("keydown", C));
  }, C = (S) => {
    S.key === "Escape" && (r.remove(), document.removeEventListener("mousedown", N), document.removeEventListener("keydown", C));
  };
  setTimeout(() => {
    document.addEventListener("mousedown", N), document.addEventListener("keydown", C);
  }, 0);
}
function Zv(e) {
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
const Qv = Km.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      qv(this.editor)
    ];
  }
}), Jv = Gm.extend({}), zn = new De("tableSorting");
let zt = null, Bn = null;
function ew(e) {
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
function tw(e, t, n) {
  let o = 0;
  return e.type === "number" && t.type === "number" ? o = e.value - t.value : e.type === "date" && t.type === "date" ? o = e.value.getTime() - t.value.getTime() : o = String(e.value).localeCompare(String(t.value)), n === "asc" ? o : -o;
}
function nw(e, t, n) {
  const { state: o, view: r } = e;
  let s = null;
  if (o.doc.nodesBetween(t, t + 1, (g, p) => {
    if (g.type.name === "table" && p === t)
      return s = g, !1;
  }), !s) {
    console.log("Table not found at position", t);
    return;
  }
  const a = zt?.tablePos === t && zt?.columnIndex === n && zt?.direction === "asc" ? "desc" : "asc";
  zt = { tablePos: t, columnIndex: n, direction: a }, Bn = null;
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
    Ma(n, a), r.dispatch(o.tr.setMeta(zn, { updated: !0 }));
    return;
  }
  const u = c.map((g) => {
    let p = "", b = 0;
    return g.node.forEach((w) => {
      b === n && (p = w.textContent || ""), b++;
    }), { ...g, sortValue: ew(p) };
  }), d = u.map((g, p) => p);
  u.sort((g, p) => tw(g.sortValue, p.sortValue, a));
  const f = u.map((g, p) => c.indexOf(g));
  if (d.some((g, p) => g !== f[p])) {
    const g = [];
    l.forEach((w) => g.push(w.node)), u.forEach((w) => g.push(w.node));
    const p = s.type.create(s.attrs, g), { tr: b } = o;
    b.replaceWith(t, t + s.nodeSize, p), b.setMeta(zn, { updated: !0 }), r.dispatch(b);
  } else
    r.dispatch(o.tr.setMeta(zn, { updated: !0 }));
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
function ow(e, t, n, o) {
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
    u.preventDefault(), u.stopPropagation(), nw(o, t, n);
  }), e === "asc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>', s.title = "Sorted ascending - Click to sort descending") : e === "desc" ? (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>', s.title = "Sorted descending - Click to sort ascending") : (s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>', s.title = "Click to sort this column"), r.appendChild(s), r;
}
function rw(e) {
  return new Me({
    key: zn,
    state: {
      init() {
        return Ye.empty;
      },
      apply(t, n, o, r) {
        const s = t.getMeta(zn);
        return !t.docChanged && !s?.updated && Bn ? Bn.map(t.mapping, t.doc) : (Bn = sw(r.doc, e), Bn);
      }
    },
    props: {
      decorations(t) {
        return this.getState(t);
      }
    }
  });
}
function sw(e, t) {
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
              u.forEach((y, T) => {
                y.type.name === "paragraph" && (h = f + 1 + T + y.nodeSize - 1);
              });
              const p = zt?.tablePos === s && zt?.columnIndex === l ? zt.direction : null, b = l, w = s, v = Ze.widget(h, () => ow(p, w, b, t), { side: 1, key: "sort-" + s + "-" + b });
              n.push(v);
            }
            c += u.nodeSize, l++;
          });
        }
      });
    }
  }), Ye.create(e, n);
}
const iw = Oe.create({
  name: "tableSorting",
  addProseMirrorPlugins() {
    return [rw(this.editor)];
  }
});
function yi(e, t, n, o, r, s = {}) {
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
const aw = qm.extend({
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
          if (yi(n, f, a, c, u, {}))
            return o(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), lw = Xm.extend({
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
          if (yi(n, f, l, c, u, {}))
            return o(n), !0;
        }
        return e.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), cw = Qm.extend({
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
          const C = l.node(N);
          if (C.type === g || C.type === p) {
            w = C, v = l.before(N);
            break;
          }
        }
        if (w) {
          if (!r) return !0;
          const N = v, C = o.doc.nodeAt(N);
          if (!C) return !1;
          o.setNodeMarkup(N, d, C.attrs);
          const S = o.doc.nodeAt(N);
          if (!S) return !1;
          const k = [];
          S.forEach((D, x) => {
            D.type === b && k.push(N + 1 + x);
          });
          for (let D = k.length - 1; D >= 0; D--) {
            const x = k[D], M = o.doc.nodeAt(x);
            M && M.type === b && o.setNodeMarkup(x, f, { checked: !1 });
          }
          return r(o), !0;
        }
        if (!r) return !0;
        const y = Ki(u, d);
        if (y) {
          o.wrap(u, y);
          const { $from: N } = o.selection;
          let C = -1;
          for (let S = N.depth; S > 0; S--)
            if (N.node(S).type === d) {
              C = N.before(S);
              break;
            }
          if (C >= 0) {
            const S = o.doc.nodeAt(C);
            if (S) {
              const k = [];
              S.forEach((D, x) => {
                D.type === b && k.push(C + 1 + x);
              });
              for (let D = k.length - 1; D >= 0; D--) {
                const x = k[D], M = o.doc.nodeAt(x);
                M && M.type === b && o.setNodeMarkup(x, f, { checked: !1 });
              }
            }
          }
          return r(o), !0;
        }
        const T = Ki(u, g);
        if (T) {
          o.wrap(u, T);
          const { $from: N } = o.selection;
          let C = -1;
          for (let S = N.depth; S > 0; S--)
            if (N.node(S).type === g) {
              C = N.before(S);
              break;
            }
          return C >= 0 && yi(o, C, d, f, b, { checked: !1 }), r(o), !0;
        }
        return t.toggleList(this.name, this.options.itemTypeName);
      }
    };
  }
}), uw = Jm.extend({
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
          return f.setSelection(je.create(f.doc, b)), f.scrollIntoView(), t.view.dispatch(f), !0;
        }
        return t.commands.splitListItem(this.name);
      }
    };
  },
  addInputRules() {
    return [];
  }
  // handleTextInput for task item creation has been moved to InputDispatcher
  // for consolidated input handling (R5 performance optimization).
}), dw = Zm.extend({
  content: "paragraph block*"
}), Da = new De("collapsibleList");
function Is(e, t) {
  let n = "";
  return e.firstChild && e.firstChild.type.name === "paragraph" && (n = e.firstChild.textContent.slice(0, 50)), `li-${t}-${n}`;
}
function ar(e) {
  const t = ["bulletList", "orderedList", "taskList"];
  let n = !1;
  return e.forEach((o) => {
    t.includes(o.type.name) && (n = !0);
  }), n;
}
function mw(e, t) {
  const n = ["bulletList", "orderedList", "taskList"];
  let o = -1, r = -1, s = t + 1;
  return e.forEach((a) => {
    n.includes(a.type.name) && (o === -1 && (o = s), r = s + a.nodeSize), s += a.nodeSize;
  }), o === -1 ? null : { start: o, end: r };
}
function Aa(e, t) {
  const n = [];
  return e.descendants((o) => {
    t.includes(o.type.name) && n.push({
      hasNested: ar(o),
      text: o.firstChild?.textContent.slice(0, 50) ?? ""
    });
  }), n;
}
function fw(e, t, n) {
  const o = Aa(e, n), r = Aa(t, n);
  if (o.length !== r.length) return !0;
  for (let s = 0; s < o.length; s++)
    if (o[s].hasNested !== r[s].hasNested || o[s].text !== r[s].text) return !0;
  return !1;
}
function Ho(e, t, n, o) {
  const r = [];
  return e.descendants((s, a) => {
    if (!n.listItemTypes.includes(s.type.name) || !ar(s))
      return !0;
    const i = Is(s, a), l = t.collapsedItems.has(i);
    r.push(
      Ze.node(a, a + s.nodeSize, {
        class: `collapsible-list-item ${l ? "is-collapsed" : "is-expanded"}`,
        "data-list-item-id": i
      })
    );
    const c = s.firstChild;
    if (c && c.type.name === "paragraph") {
      const u = a + 1 + c.nodeSize - 1, d = Ze.widget(
        u,
        () => {
          const f = CSS.escape(i), h = document.querySelector(
            `button.collapsible-list-chevron[data-list-item-id="${f}"]`
          );
          if (h) {
            h.classList.contains("collapsed") !== l && (h.classList.remove("collapsed", "expanded"), h.classList.add(l ? "collapsed" : "expanded"), h.title = l ? "Click to expand" : "Click to collapse");
            const w = h.parentElement;
            if (w) return w;
          }
          const g = document.createElement("span");
          g.className = "collapsible-list-chevron-wrapper", g.setAttribute("contenteditable", "false");
          const p = document.createElement("button");
          return p.className = `collapsible-list-chevron ${l ? "collapsed" : "expanded"}`, p.setAttribute("data-list-item-id", i), p.setAttribute("contenteditable", "false"), p.setAttribute("tabindex", "-1"), p.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', p.title = l ? "Click to expand" : "Click to collapse", p.addEventListener("click", (b) => {
            b.preventDefault(), b.stopPropagation();
            const w = p.classList.contains("collapsed");
            p.classList.remove("collapsed", "expanded"), p.classList.add(w ? "expanded" : "collapsed"), p.title = w ? "Click to collapse" : "Click to expand", t.collapsedItems.has(i) ? t.collapsedItems.delete(i) : t.collapsedItems.add(i), o.current && o.current.dispatch(
              o.current.state.tr.setMeta("collapsibleList", { toggled: i })
            );
          }), g.appendChild(p), g;
        },
        { side: 1, key: `list-chevron-${i}` }
      );
      r.push(d);
    }
    if (l && mw(s, a)) {
      let d = a + 1;
      s.forEach((f) => {
        ["bulletList", "orderedList", "taskList"].includes(f.type.name) && r.push(
          Ze.node(d, d + f.nodeSize, {
            class: "collapsible-list-hidden"
          })
        ), d += f.nodeSize;
      });
    }
    return !0;
  }), Ye.create(e, r);
}
const hw = Oe.create({
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
        if (!r || !this.options.listItemTypes.includes(r.type.name) || !ar(r))
          return !1;
        const s = Is(r, e);
        return o.collapsedItems.has(s) ? o.collapsedItems.delete(s) : o.collapsedItems.add(s), t.view.dispatch(n.setMeta("collapsibleList", { toggled: s })), !0;
      },
      expandAllListItems: () => ({ editor: e, tr: t }) => (this.storage.collapsedItems.clear(), e.view.dispatch(t.setMeta("collapsibleList", { expandAll: !0 })), !0),
      collapseAllListItems: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return t.doc.descendants((r, s) => {
          this.options.listItemTypes.includes(r.type.name) && ar(r) && n.collapsedItems.add(Is(r, s));
        }), e.view.dispatch(t.setMeta("collapsibleList", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options, n = { current: null };
    return [
      new Me({
        key: Da,
        view(o) {
          return n.current = o, {
            update(r) {
              n.current = r;
            },
            destroy() {
              n.current = null;
            }
          };
        },
        state: {
          init(o, r) {
            return {
              collapsedItems: /* @__PURE__ */ new Set(),
              decorations: Ho(r.doc, e, t, n),
              docVersion: 0
            };
          },
          apply(o, r, s, a) {
            return o.getMeta("collapsibleList") ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: Ho(a.doc, e, t, n),
              docVersion: r.docVersion + 1
            } : o.docChanged ? fw(s.doc, a.doc, t.listItemTypes) ? {
              collapsedItems: new Set(e.collapsedItems),
              decorations: Ho(a.doc, e, t, n),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(o.mapping, o.doc)
            } : {
              ...r,
              decorations: r.decorations.map(o.mapping, o.doc)
            };
          }
        },
        props: {
          decorations(o) {
            const r = Da.getState(o);
            return r?.decorations ? r.decorations : Ho(o.doc, e, t, n);
          }
        }
      })
    ];
  }
});
function yt({
  children: e,
  className: t,
  zIndex: n = 99999,
  onMouseDown: o
}) {
  const r = F(
    (i) => {
      o?.(i), i.stopPropagation();
    },
    [o]
  ), s = F((i) => {
    i.stopPropagation();
  }, []), a = F((i) => {
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
const Fo = {
  info: { icon: Jo, label: "Info", color: "var(--callout-info)", borderColor: "var(--callout-info-border)" },
  note: { icon: gl, label: "Note", color: "var(--callout-note)", borderColor: "var(--callout-note-border)" },
  prompt: { icon: pl, label: "Prompt", color: "var(--callout-prompt)", borderColor: "var(--callout-prompt-border)" },
  resources: { icon: Gs, label: "Resources", color: "var(--callout-resources)", borderColor: "var(--callout-resources-border)" },
  todo: { icon: qs, label: "Todo", color: "var(--callout-todo)", borderColor: "var(--callout-todo-border)" },
  summary: { icon: lm, label: "Summary", color: "var(--callout-summary)", borderColor: "var(--callout-summary-border)" }
};
function pw({ node: e, updateAttributes: t, editor: n }) {
  const [o, r] = U(!1), [s, a] = U(!1), [i, l] = U(null), c = j(null), u = j(null), d = e.attrs.type || "info", f = Fo[d] || Fo.info, h = f.icon, g = F(() => {
    if (u.current) {
      const v = u.current.getBoundingClientRect();
      l({
        top: v.bottom + 4,
        left: v.left
      });
    }
  }, []);
  K(() => {
    if (!o) return;
    const v = (y) => {
      c.current && !c.current.contains(y.target) && u.current && !u.current.contains(y.target) && r(!1);
    };
    return document.addEventListener("mousedown", v), document.addEventListener("touchstart", v, { passive: !0 }), () => {
      document.removeEventListener("mousedown", v), document.removeEventListener("touchstart", v);
    };
  }, [o]), K(() => {
    if (!o) return;
    const v = () => r(!1);
    return window.addEventListener("scroll", v, !0), () => window.removeEventListener("scroll", v, !0);
  }, [o]);
  const p = F(() => {
    n.isEditable && (o || g(), r(!o));
  }, [n.isEditable, o, g]), b = (v) => {
    t({ type: v }), r(!1);
  }, w = F((v) => {
    v.stopPropagation(), a((y) => !y);
  }, []);
  return /* @__PURE__ */ m(bn, { className: `callout callout-${d}${s ? " callout-collapsed" : ""}`, "data-callout": "", "data-type": d, children: [
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
                n.isEditable && /* @__PURE__ */ m(At, { size: 12, className: "callout-type-chevron" }, void 0, !1, {
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
              children: s ? /* @__PURE__ */ m(bl, { size: 16 }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/extensions/CalloutWithMenu.tsx",
                lineNumber: 138,
                columnNumber: 24
              }, this) : /* @__PURE__ */ m(At, { size: 16 }, void 0, !1, {
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
          o && n.isEditable && i && /* @__PURE__ */ m(yt, { children: /* @__PURE__ */ m(
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
              children: Object.keys(Fo).map((v) => {
                const y = Fo[v], T = y.icon;
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
                      /* @__PURE__ */ m(T, { size: 16, style: { color: y.borderColor } }, void 0, !1, {
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
    /* @__PURE__ */ m("div", { className: `callout-content${s ? " callout-content-hidden" : ""}`, children: /* @__PURE__ */ m(_s, {}, void 0, !1, {
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
const gw = gr.create({
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
      yn(this.options.HTMLAttributes, t, {
        "data-callout": "",
        "data-type": n,
        class: `callout callout-${n}`
      }),
      0
    ];
  },
  addNodeView() {
    return mr(pw, {
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
}), bw = sf.extend({
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
        yn(this.options.HTMLAttributes, e)
      ]
    ];
  },
  addProseMirrorPlugins() {
    return [
      new Me({
        key: new De("resizableImageCopy"),
        props: {
          handleDOMEvents: {
            copy(e, t) {
              const { state: n } = e;
              if (!(n.selection instanceof $m)) return !1;
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
      const a = (P) => {
        const $ = {
          left: "margin-right: auto; margin-left: 0;",
          center: "margin-left: auto; margin-right: auto;",
          right: "margin-left: auto; margin-right: 0;"
        }[P] || "margin-left: auto; margin-right: auto;";
        s.style.cssText = `display: block; position: relative; width: fit-content; ${$}`;
      };
      a(t.attrs.align || "left");
      const i = document.createElement("img");
      i.alt = t.attrs.alt || "", t.attrs.width && (i.style.width = `${t.attrs.width}px`);
      const l = (P) => !(!P || P.startsWith("data:") || P.startsWith("blob:") || P.startsWith("http://") || P.startsWith("https://")), c = (P) => {
        l(P) && e.resolveImageSrc ? (i.style.opacity = "0.5", i.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E', e.resolveImageSrc(P).then(($) => {
          i.src = $, i.style.opacity = "1";
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
      const h = (P, $, q) => {
        const H = document.createElement("button");
        return H.setAttribute("type", "button"), H.style.cssText = `
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
        `, H.innerHTML = `${$}<span>${P}</span>`, H.addEventListener("mouseenter", () => {
          H.style.background = "oklch(0.95 0 0)";
        }), H.addEventListener("mouseleave", () => {
          H.style.background = "transparent";
        }), H.addEventListener("click", (Y) => {
          Y.preventDefault(), Y.stopPropagation(), q(), f.style.display = "none", D = !1;
        }), H;
      }, g = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>', p = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', b = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>', w = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
      f.appendChild(h("Edit", g, () => {
        const P = typeof o == "function" ? o() : null;
        if (P != null && e.onImageClick) {
          const $ = i.getBoundingClientRect();
          e.onImageClick({
            src: r.attrs.src,
            alt: r.attrs.alt || "",
            pos: P,
            rect: $
          });
        }
      })), f.appendChild(h("Copy image", p, async () => {
        const P = r.attrs.src;
        try {
          const q = await (await fetch(P)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ [q.type]: q })
          ]);
        } catch {
          try {
            const $ = new window.Image();
            $.crossOrigin = "anonymous", await new Promise((Y, G) => {
              $.onload = () => Y(), $.onerror = () => G(new Error("Image load failed")), $.src = P;
            });
            const q = document.createElement("canvas");
            q.width = $.naturalWidth, q.height = $.naturalHeight;
            const H = q.getContext("2d");
            if (H) {
              H.drawImage($, 0, 0);
              const Y = await new Promise(
                (G) => q.toBlob(G, "image/png")
              );
              Y ? await navigator.clipboard.write([
                new ClipboardItem({ "image/png": Y })
              ]) : await navigator.clipboard.writeText(P);
            }
          } catch {
            try {
              await navigator.clipboard.writeText(P);
            } catch {
            }
          }
        }
      })), f.appendChild(h("Copy URL", w, async () => {
        const P = r.attrs.src;
        try {
          await navigator.clipboard.writeText(P);
        } catch {
        }
      })), f.appendChild(h("Save image", b, () => {
        const P = r.attrs.src, $ = r.attrs.alt || "image", q = document.createElement("a");
        q.href = P, q.download = $, q.target = "_blank", q.rel = "noopener noreferrer", document.body.appendChild(q), q.click(), setTimeout(() => {
          document.body.removeChild(q);
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
      const T = document.createElement("div");
      T.style.cssText = `
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
      ], C = [], S = (P) => {
        C.forEach(($) => {
          ($.getAttribute("data-align-value") || "left") === P ? ($.style.background = "oklch(1 0 0)", $.style.boxShadow = "0 1px 3px oklch(0 0 0 / 0.1)", $.style.color = "oklch(0.25 0 0)", $.style.fontWeight = "600") : ($.style.background = "transparent", $.style.boxShadow = "none", $.style.color = "oklch(0.5 0 0)", $.style.fontWeight = "400");
        });
      };
      N.forEach(({ value: P, label: $, icon: q }) => {
        const H = document.createElement("button");
        H.setAttribute("type", "button"), H.setAttribute("data-align-value", P), H.setAttribute("title", `Align ${$.toLowerCase()}`), H.style.cssText = `
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
        `, H.innerHTML = `${q}<span>${$}</span>`, H.addEventListener("click", (Y) => {
          Y.preventDefault(), Y.stopPropagation();
          const G = typeof o == "function" ? o() : null;
          if (G != null)
            try {
              const { state: B, dispatch: J } = n.view, O = B.doc.nodeAt(G);
              if (O && O.type.name === "resizableImage") {
                const ee = B.tr.setNodeMarkup(G, void 0, {
                  ...O.attrs,
                  align: P
                });
                J(ee);
              }
            } catch {
              n.chain().focus().setNodeSelection(G).updateAttributes("resizableImage", {
                align: P
              }).run();
            }
          S(P);
        }), C.push(H), T.appendChild(H);
      }), f.appendChild(T);
      const k = () => {
        const P = r.attrs.align || "left";
        S(P);
      };
      let D = !1;
      d.addEventListener("click", (P) => {
        if (P.preventDefault(), P.stopPropagation(), D)
          f.style.display = "none", D = !1;
        else {
          const $ = d.getBoundingClientRect(), q = 200, H = f.closest('[role="dialog"]');
          let Y = 0, G = 0;
          if (H) {
            const ue = H.getBoundingClientRect();
            Y = ue.left, G = ue.top;
          }
          let B = $.bottom + 4 - G, J = $.right - q - Y;
          const O = window.innerHeight, ee = window.innerWidth, ne = 200;
          $.bottom + 4 + ne > O && (B = $.top - ne - 4 - G), J + Y < 8 && (J = 8 - Y), J + q + Y > ee - 8 && (J = ee - q - 8 - Y), f.style.top = `${B}px`, f.style.left = `${J}px`, f.style.display = "flex", D = !0, k();
        }
      });
      const x = (P) => {
        !f.contains(P.target) && !d.contains(P.target) && (f.style.display = "none", D = !1);
      };
      document.addEventListener("click", x);
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
      const A = s.closest('[role="dialog"]');
      A ? A.appendChild(f) : document.body.appendChild(f), s.addEventListener("mouseenter", () => {
        u.style.opacity = "1", d.style.opacity = "1", M.style.opacity = "1";
      }), s.addEventListener("mouseleave", () => {
        u.style.opacity = "0", M.style.opacity = "0", D || (d.style.opacity = "0");
      }), d.addEventListener("mouseenter", () => {
        d.style.background = "oklch(0.95 0 0)";
      }), d.addEventListener("mouseleave", () => {
        d.style.background = "oklch(0.98 0 0 / 0.95)";
      });
      const R = (P) => {
        P.preventDefault(), P.stopPropagation();
        const $ = document.createElement("div");
        $.style.cssText = `
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
        q.src = i.src, q.alt = i.alt || "", q.style.cssText = `
          max-width: 95vw;
          max-height: 92vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
          transform: scale(0.92);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        `;
        const H = document.createElement("button");
        H.setAttribute("type", "button"), H.setAttribute("aria-label", "Close"), H.style.cssText = `
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
        `, H.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>', H.addEventListener("mouseenter", () => {
          H.style.background = "rgba(255, 255, 255, 0.25)";
        }), H.addEventListener("mouseleave", () => {
          H.style.background = "rgba(255, 255, 255, 0.15)";
        });
        const Y = r.attrs.alt;
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
        const B = () => {
          $.style.opacity = "0", q.style.transform = "scale(0.92)", setTimeout(() => $.remove(), 200);
        };
        $.addEventListener("click", (ee) => {
          ee.target === $ && B();
        }), H.addEventListener("click", B);
        const J = (ee) => {
          ee.key === "Escape" && (B(), document.removeEventListener("keydown", J));
        };
        document.addEventListener("keydown", J), $.appendChild(q), $.appendChild(H), G && $.appendChild(G);
        const O = s.closest('[role="dialog"]');
        O ? O.appendChild($) : document.body.appendChild($), requestAnimationFrame(() => {
          $.style.opacity = "1", q.style.transform = "scale(1)";
        });
      };
      M.addEventListener("click", R);
      let L, _;
      const W = (P) => {
        P.preventDefault(), L = P.clientX, _ = i.offsetWidth, document.addEventListener("mousemove", V), document.addEventListener("mouseup", I);
      }, V = (P) => {
        const $ = P.clientX - L, q = Math.max(100, _ + $);
        i.style.width = `${q}px`;
      }, I = () => {
        document.removeEventListener("mousemove", V), document.removeEventListener("mouseup", I), setTimeout(() => {
        }, 100);
        const P = typeof o == "function" ? o() : null, $ = i.offsetWidth;
        if (P != null)
          try {
            const { state: q, dispatch: H } = n.view, Y = q.doc.nodeAt(P);
            if (Y && Y.type.name === "resizableImage") {
              const G = q.tr.setNodeMarkup(P, void 0, {
                ...Y.attrs,
                width: $
              });
              H(G);
            }
          } catch {
            n.chain().focus().setNodeSelection(P).updateAttributes("resizableImage", {
              width: $
            }).run();
          }
      };
      return u.addEventListener("mousedown", W), {
        dom: s,
        update: (P) => P.type.name !== "resizableImage" ? !1 : (r = P, c(P.attrs.src), i.alt = P.attrs.alt || "", P.attrs.width && (i.style.width = `${P.attrs.width}px`), a(P.attrs.align || "left"), !0),
        destroy: () => {
          u.removeEventListener("mousedown", W), M.removeEventListener("click", R), document.removeEventListener("click", x), f.remove();
        }
      };
    };
  }
});
function vw(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const ww = {}, Wn = {};
function Ut(e, t) {
  try {
    const o = (ww[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return o in Wn ? Wn[o] : Pa(o, o.split(":"));
  } catch {
    if (e in Wn) return Wn[e];
    const n = e?.match(Nw);
    return n ? Pa(e, n.slice(1)) : NaN;
  }
}
const Nw = /([+-]\d\d):?(\d\d)?/;
function Pa(e, t) {
  const n = +(t[0] || 0), o = +(t[1] || 0), r = +(t[2] || 0) / 60;
  return Wn[e] = n * 60 + o > 0 ? n * 60 + o + r : n * 60 - o - r;
}
class ot extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Ut(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Cu(this), Rs(this)) : this.setTime(Date.now());
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
    const t = -Ut(this.timeZone, this);
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
    return Date.prototype[t].apply(this.internal, arguments), yw(this), +this;
  }, ot.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Rs(this), +this;
  }));
});
function Rs(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Ut(e.timeZone, e) * 60));
}
function yw(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Cu(e);
}
function Cu(e) {
  const t = Ut(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), o = /* @__PURE__ */ new Date(+e);
  o.setUTCHours(o.getUTCHours() - 1);
  const r = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+o)).getTimezoneOffset(), a = r - s, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const l = r - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const c = /* @__PURE__ */ new Date(+e);
  c.setUTCSeconds(0);
  const u = r > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, d = Math.round(-(Ut(e.timeZone, e) * 60)) % 60;
  (d || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + u));
  const f = Ut(e.timeZone, e), h = f > 0 ? Math.floor(f) : Math.ceil(f), p = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, b = h !== n, w = p - l;
  if (b && w) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + w);
    const v = Ut(e.timeZone, e), y = v > 0 ? Math.floor(v) : Math.ceil(v), T = h - y;
    T && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + T), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + T));
  }
}
class Pe extends ot {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Pe(...n, t) : new Pe(Date.now(), t);
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
    return `${t} GMT${n}${o}${r} (${vw(this.timeZone, this)})`;
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
    return new Pe(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Pe(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Tu = 6048e5, kw = 864e5, Ra = Symbol.for("constructDateFrom");
function ke(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ra in e ? e[Ra](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function he(e, t) {
  return ke(t || e, e);
}
function Eu(e, t, n) {
  const o = he(e, n?.in);
  return isNaN(t) ? ke(e, NaN) : (t && o.setDate(o.getDate() + t), o);
}
function Su(e, t, n) {
  const o = he(e, n?.in);
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
let xw = {};
function ro() {
  return xw;
}
function Nn(e, t) {
  const n = ro(), o = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = he(e, t?.in), s = r.getDay(), a = (s < o ? 7 : 0) + s - o;
  return r.setDate(r.getDate() - a), r.setHours(0, 0, 0, 0), r;
}
function Zn(e, t) {
  return Nn(e, { ...t, weekStartsOn: 1 });
}
function Mu(e, t) {
  const n = he(e, t?.in), o = n.getFullYear(), r = ke(n, 0);
  r.setFullYear(o + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Zn(r), a = ke(n, 0);
  a.setFullYear(o, 0, 4), a.setHours(0, 0, 0, 0);
  const i = Zn(a);
  return n.getTime() >= s.getTime() ? o + 1 : n.getTime() >= i.getTime() ? o : o - 1;
}
function La(e) {
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
  const n = ke.bind(
    null,
    t.find((o) => typeof o == "object")
  );
  return t.map(n);
}
function Qn(e, t) {
  const n = he(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Du(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  ), s = Qn(o), a = Qn(r), i = +s - La(s), l = +a - La(a);
  return Math.round((i - l) / kw);
}
function Cw(e, t) {
  const n = Mu(e, t), o = ke(e, 0);
  return o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0), Zn(o);
}
function Tw(e, t, n) {
  return Eu(e, t * 7, n);
}
function Ew(e, t, n) {
  return Su(e, t * 12, n);
}
function Sw(e, t) {
  let n, o = t?.in;
  return e.forEach((r) => {
    !o && typeof r == "object" && (o = ke.bind(null, r));
    const s = he(r, o);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), ke(o, n || NaN);
}
function Mw(e, t) {
  let n, o = t?.in;
  return e.forEach((r) => {
    !o && typeof r == "object" && (o = ke.bind(null, r));
    const s = he(r, o);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), ke(o, n || NaN);
}
function Dw(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  );
  return +Qn(o) == +Qn(r);
}
function Au(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Aw(e) {
  return !(!Au(e) && typeof e != "number" || isNaN(+he(e)));
}
function Pw(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  ), s = o.getFullYear() - r.getFullYear(), a = o.getMonth() - r.getMonth();
  return s * 12 + a;
}
function Iw(e, t) {
  const n = he(e, t?.in), o = n.getMonth();
  return n.setFullYear(n.getFullYear(), o + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Pu(e, t) {
  const [n, o] = Sn(e, t.start, t.end);
  return { start: n, end: o };
}
function Rw(e, t) {
  const { start: n, end: o } = Pu(t?.in, e);
  let r = +n > +o;
  const s = r ? +n : +o, a = r ? o : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(ke(n, a)), a.setMonth(a.getMonth() + i);
  return r ? l.reverse() : l;
}
function Lw(e, t) {
  const n = he(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Ow(e, t) {
  const n = he(e, t?.in), o = n.getFullYear();
  return n.setFullYear(o + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Iu(e, t) {
  const n = he(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function _w(e, t) {
  const { start: n, end: o } = Pu(t?.in, e);
  let r = +n > +o;
  const s = r ? +n : +o, a = r ? o : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const l = [];
  for (; +a <= s; )
    l.push(ke(n, a)), a.setFullYear(a.getFullYear() + i);
  return r ? l.reverse() : l;
}
function Ru(e, t) {
  const n = ro(), o = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = he(e, t?.in), s = r.getDay(), a = (s < o ? -7 : 0) + 6 - (s - o);
  return r.setDate(r.getDate() + a), r.setHours(23, 59, 59, 999), r;
}
function $w(e, t) {
  return Ru(e, { ...t, weekStartsOn: 1 });
}
const Bw = {
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
}, Ww = (e, t, n) => {
  let o;
  const r = Bw[e];
  return typeof r == "string" ? o = r : t === 1 ? o = r.one : o = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + o : o + " ago" : o;
};
function as(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Hw = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Fw = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, zw = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Uw = {
  date: as({
    formats: Hw,
    defaultWidth: "full"
  }),
  time: as({
    formats: Fw,
    defaultWidth: "full"
  }),
  dateTime: as({
    formats: zw,
    defaultWidth: "full"
  })
}, Yw = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, jw = (e, t, n, o) => Yw[e];
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
const Vw = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Kw = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Gw = {
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
}, qw = {
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
}, Xw = {
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
}, Zw = {
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
}, Qw = (e, t) => {
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
}, Jw = {
  ordinalNumber: Qw,
  era: Ln({
    values: Vw,
    defaultWidth: "wide"
  }),
  quarter: Ln({
    values: Kw,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ln({
    values: Gw,
    defaultWidth: "wide"
  }),
  day: Ln({
    values: qw,
    defaultWidth: "wide"
  }),
  dayPeriod: Ln({
    values: Xw,
    defaultWidth: "wide",
    formattingValues: Zw,
    defaultFormattingWidth: "wide"
  })
};
function On(e) {
  return (t, n = {}) => {
    const o = n.width, r = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth], s = t.match(r);
    if (!s)
      return null;
    const a = s[0], i = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? tN(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      eN(i, (d) => d.test(a))
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
function eN(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function tN(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function nN(e) {
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
const oN = /^(\d+)(th|st|nd|rd)?/i, rN = /\d+/i, sN = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, iN = {
  any: [/^b/i, /^(a|c)/i]
}, aN = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, lN = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, cN = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, uN = {
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
}, dN = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, mN = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, fN = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, hN = {
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
}, pN = {
  ordinalNumber: nN({
    matchPattern: oN,
    parsePattern: rN,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: On({
    matchPatterns: sN,
    defaultMatchWidth: "wide",
    parsePatterns: iN,
    defaultParseWidth: "any"
  }),
  quarter: On({
    matchPatterns: aN,
    defaultMatchWidth: "wide",
    parsePatterns: lN,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: On({
    matchPatterns: cN,
    defaultMatchWidth: "wide",
    parsePatterns: uN,
    defaultParseWidth: "any"
  }),
  day: On({
    matchPatterns: dN,
    defaultMatchWidth: "wide",
    parsePatterns: mN,
    defaultParseWidth: "any"
  }),
  dayPeriod: On({
    matchPatterns: fN,
    defaultMatchWidth: "any",
    parsePatterns: hN,
    defaultParseWidth: "any"
  })
}, ki = {
  code: "en-US",
  formatDistance: Ww,
  formatLong: Uw,
  formatRelative: jw,
  localize: Jw,
  match: pN,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function gN(e, t) {
  const n = he(e, t?.in);
  return Du(n, Iu(n)) + 1;
}
function Lu(e, t) {
  const n = he(e, t?.in), o = +Zn(n) - +Cw(n);
  return Math.round(o / Tu) + 1;
}
function Ou(e, t) {
  const n = he(e, t?.in), o = n.getFullYear(), r = ro(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = ke(t?.in || e, 0);
  a.setFullYear(o + 1, 0, s), a.setHours(0, 0, 0, 0);
  const i = Nn(a, t), l = ke(t?.in || e, 0);
  l.setFullYear(o, 0, s), l.setHours(0, 0, 0, 0);
  const c = Nn(l, t);
  return +n >= +i ? o + 1 : +n >= +c ? o : o - 1;
}
function bN(e, t) {
  const n = ro(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, r = Ou(e, t), s = ke(t?.in || e, 0);
  return s.setFullYear(r, 0, o), s.setHours(0, 0, 0, 0), Nn(s, t);
}
function _u(e, t) {
  const n = he(e, t?.in), o = +Nn(n, t) - +bN(n, t);
  return Math.round(o / Tu) + 1;
}
function fe(e, t) {
  const n = e < 0 ? "-" : "", o = Math.abs(e).toString().padStart(t, "0");
  return n + o;
}
const Et = {
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
}, ln = {
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
    return Et.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, o) {
    const r = Ou(e, o), s = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const a = s % 100;
      return fe(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : fe(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Mu(e);
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
    const r = _u(e, o);
    return t === "wo" ? n.ordinalNumber(r, { unit: "week" }) : fe(r, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const o = Lu(e);
    return t === "Io" ? n.ordinalNumber(o, { unit: "week" }) : fe(o, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Et.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const o = gN(e);
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
    switch (o === 12 ? r = ln.noon : o === 0 ? r = ln.midnight : r = o / 12 >= 1 ? "pm" : "am", t) {
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
    switch (o >= 17 ? r = ln.evening : o >= 12 ? r = ln.afternoon : o >= 4 ? r = ln.morning : r = ln.night, t) {
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
    return t === "Ko" ? n.ordinalNumber(o, { unit: "hour" }) : fe(o, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let o = e.getHours();
    return o === 0 && (o = 24), t === "ko" ? n.ordinalNumber(o, { unit: "hour" }) : fe(o, t.length);
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
        return $a(o);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Ht(o);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Ht(o, ":");
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
        return Ht(o);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Ht(o, ":");
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
        return "GMT" + Ht(o, ":");
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
        return "GMT" + Ht(o, ":");
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
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + fe(Math.abs(e) / 60, 2) : Ht(e, t);
}
function Ht(e, t = "") {
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
}, $u = (e, t) => {
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
}, vN = (e, t) => {
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
  return s.replace("{{date}}", Ba(o, t)).replace("{{time}}", $u(r, t));
}, wN = {
  p: $u,
  P: vN
}, NN = /^D+$/, yN = /^Y+$/, kN = ["D", "DD", "YY", "YYYY"];
function xN(e) {
  return NN.test(e);
}
function CN(e) {
  return yN.test(e);
}
function TN(e, t, n) {
  const o = EN(e, t, n);
  if (console.warn(o), kN.includes(e)) throw new RangeError(o);
}
function EN(e, t, n) {
  const o = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${o} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const SN = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, MN = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, DN = /^'([^]*?)'?$/, AN = /''/g, PN = /[a-zA-Z]/;
function IN(e, t, n) {
  const o = ro(), r = n?.locale ?? o.locale ?? ki, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? o.weekStartsOn ?? o.locale?.options?.weekStartsOn ?? 0, i = he(e, n?.in);
  if (!Aw(i))
    throw new RangeError("Invalid time value");
  let l = t.match(MN).map((u) => {
    const d = u[0];
    if (d === "p" || d === "P") {
      const f = wN[d];
      return f(u, r.formatLong);
    }
    return u;
  }).join("").match(SN).map((u) => {
    if (u === "''")
      return { isToken: !1, value: "'" };
    const d = u[0];
    if (d === "'")
      return { isToken: !1, value: RN(u) };
    if (Oa[d])
      return { isToken: !0, value: u };
    if (d.match(PN))
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
    (!n?.useAdditionalWeekYearTokens && CN(d) || !n?.useAdditionalDayOfYearTokens && xN(d)) && TN(d, t, String(e));
    const f = Oa[d[0]];
    return f(i, d, r.localize, c);
  }).join("");
}
function RN(e) {
  const t = e.match(DN);
  return t ? t[1].replace(AN, "'") : e;
}
function LN(e, t) {
  const n = he(e, t?.in), o = n.getFullYear(), r = n.getMonth(), s = ke(n, 0);
  return s.setFullYear(o, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function ON(e, t) {
  return he(e, t?.in).getMonth();
}
function _N(e, t) {
  return he(e, t?.in).getFullYear();
}
function $N(e, t) {
  return +he(e) > +he(t);
}
function BN(e, t) {
  return +he(e) < +he(t);
}
function WN(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  );
  return o.getFullYear() === r.getFullYear() && o.getMonth() === r.getMonth();
}
function HN(e, t, n) {
  const [o, r] = Sn(
    n?.in,
    e,
    t
  );
  return o.getFullYear() === r.getFullYear();
}
function FN(e, t, n) {
  const o = he(e, n?.in), r = o.getFullYear(), s = o.getDate(), a = ke(e, 0);
  a.setFullYear(r, t, 15), a.setHours(0, 0, 0, 0);
  const i = LN(a);
  return o.setMonth(t, Math.min(s, i)), o;
}
function zN(e, t, n) {
  const o = he(e, n?.in);
  return isNaN(+o) ? ke(e, NaN) : (o.setFullYear(t), o);
}
const Wa = 5, UN = 4;
function YN(e, t) {
  const n = t.startOfMonth(e), o = n.getDay() > 0 ? n.getDay() : 7, r = t.addDays(e, -o + 1), s = t.addDays(r, Wa * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Wa : UN;
}
function Bu(e, t) {
  const n = t.startOfMonth(e), o = n.getDay();
  return o === 1 ? n : o === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (o - 1));
}
function jN(e, t) {
  const n = Bu(e, t), o = YN(e, t);
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
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Pe.tz(this.options.timeZone) : new this.Date(), this.newDate = (o, r, s) => this.overrides?.newDate ? this.overrides.newDate(o, r, s) : this.options.timeZone ? new Pe(o, r, s, this.options.timeZone) : new Date(o, r, s), this.addDays = (o, r) => this.overrides?.addDays ? this.overrides.addDays(o, r) : Eu(o, r), this.addMonths = (o, r) => this.overrides?.addMonths ? this.overrides.addMonths(o, r) : Su(o, r), this.addWeeks = (o, r) => this.overrides?.addWeeks ? this.overrides.addWeeks(o, r) : Tw(o, r), this.addYears = (o, r) => this.overrides?.addYears ? this.overrides.addYears(o, r) : Ew(o, r), this.differenceInCalendarDays = (o, r) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(o, r) : Du(o, r), this.differenceInCalendarMonths = (o, r) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(o, r) : Pw(o, r), this.eachMonthOfInterval = (o) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(o) : Rw(o), this.eachYearOfInterval = (o) => {
      const r = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(o) : _w(o), s = new Set(r.map((i) => this.getYear(i)));
      if (s.size === r.length)
        return r;
      const a = [];
      return s.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (o) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(o) : jN(o, this), this.endOfISOWeek = (o) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(o) : $w(o), this.endOfMonth = (o) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(o) : Iw(o), this.endOfWeek = (o, r) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(o, r) : Ru(o, this.options), this.endOfYear = (o) => this.overrides?.endOfYear ? this.overrides.endOfYear(o) : Ow(o), this.format = (o, r, s) => {
      const a = this.overrides?.format ? this.overrides.format(o, r, this.options) : IN(o, r, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (o) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(o) : Lu(o), this.getMonth = (o, r) => this.overrides?.getMonth ? this.overrides.getMonth(o, this.options) : ON(o, this.options), this.getYear = (o, r) => this.overrides?.getYear ? this.overrides.getYear(o, this.options) : _N(o, this.options), this.getWeek = (o, r) => this.overrides?.getWeek ? this.overrides.getWeek(o, this.options) : _u(o, this.options), this.isAfter = (o, r) => this.overrides?.isAfter ? this.overrides.isAfter(o, r) : $N(o, r), this.isBefore = (o, r) => this.overrides?.isBefore ? this.overrides.isBefore(o, r) : BN(o, r), this.isDate = (o) => this.overrides?.isDate ? this.overrides.isDate(o) : Au(o), this.isSameDay = (o, r) => this.overrides?.isSameDay ? this.overrides.isSameDay(o, r) : Dw(o, r), this.isSameMonth = (o, r) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(o, r) : WN(o, r), this.isSameYear = (o, r) => this.overrides?.isSameYear ? this.overrides.isSameYear(o, r) : HN(o, r), this.max = (o) => this.overrides?.max ? this.overrides.max(o) : Sw(o), this.min = (o) => this.overrides?.min ? this.overrides.min(o) : Mw(o), this.setMonth = (o, r) => this.overrides?.setMonth ? this.overrides.setMonth(o, r) : FN(o, r), this.setYear = (o, r) => this.overrides?.setYear ? this.overrides.setYear(o, r) : zN(o, r), this.startOfBroadcastWeek = (o, r) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(o, this) : Bu(o, this), this.startOfDay = (o) => this.overrides?.startOfDay ? this.overrides.startOfDay(o) : Qn(o), this.startOfISOWeek = (o) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(o) : Zn(o), this.startOfMonth = (o) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(o) : Lw(o), this.startOfWeek = (o, r) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(o, this.options) : Nn(o, this.options), this.startOfYear = (o) => this.overrides?.startOfYear ? this.overrides.startOfYear(o) : Iu(o), this.options = { locale: ki, ...t }, this.overrides = n;
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
const lt = new Fe();
class Wu {
  constructor(t, n, o = lt) {
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
class VN {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class KN {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function GN(e) {
  return X.createElement("button", { ...e });
}
function qN(e) {
  return X.createElement("span", { ...e });
}
function XN(e) {
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
function ZN(e) {
  const { day: t, modifiers: n, ...o } = e;
  return X.createElement("td", { ...o });
}
function QN(e) {
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
var Xe;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Xe || (Xe = {}));
var Be;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Be || (Be = {}));
function JN(e) {
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
function ey(e) {
  return X.createElement("div", { ...e });
}
function ty(e) {
  return X.createElement("div", { ...e });
}
function ny(e) {
  const { calendarMonth: t, displayIndex: n, ...o } = e;
  return X.createElement("div", { ...o }, e.children);
}
function oy(e) {
  const { calendarMonth: t, displayIndex: n, ...o } = e;
  return X.createElement("div", { ...o });
}
function ry(e) {
  return X.createElement("table", { ...e });
}
function sy(e) {
  return X.createElement("div", { ...e });
}
const Hu = cl(void 0);
function so() {
  const e = ul(Hu);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function iy(e) {
  const { components: t } = so();
  return X.createElement(t.Dropdown, { ...e });
}
function ay(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: o, nextMonth: r, ...s } = e, { components: a, classNames: i, labels: { labelPrevious: l, labelNext: c } } = so(), u = F((f) => {
    r && n?.(f);
  }, [r, n]), d = F((f) => {
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
function ly(e) {
  const { components: t } = so();
  return X.createElement(t.Button, { ...e });
}
function cy(e) {
  return X.createElement("option", { ...e });
}
function uy(e) {
  const { components: t } = so();
  return X.createElement(t.Button, { ...e });
}
function dy(e) {
  const { rootRef: t, ...n } = e;
  return X.createElement("div", { ...n, ref: t });
}
function my(e) {
  return X.createElement("select", { ...e });
}
function fy(e) {
  const { week: t, ...n } = e;
  return X.createElement("tr", { ...n });
}
function hy(e) {
  return X.createElement("th", { ...e });
}
function py(e) {
  return X.createElement(
    "thead",
    { "aria-hidden": !0 },
    X.createElement("tr", { ...e })
  );
}
function gy(e) {
  const { week: t, ...n } = e;
  return X.createElement("th", { ...n });
}
function by(e) {
  return X.createElement("th", { ...e });
}
function vy(e) {
  return X.createElement("tbody", { ...e });
}
function wy(e) {
  const { components: t } = so();
  return X.createElement(t.Dropdown, { ...e });
}
const Ny = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: GN,
  CaptionLabel: qN,
  Chevron: XN,
  Day: ZN,
  DayButton: QN,
  Dropdown: JN,
  DropdownNav: ey,
  Footer: ty,
  Month: ny,
  MonthCaption: oy,
  MonthGrid: ry,
  Months: sy,
  MonthsDropdown: iy,
  Nav: ay,
  NextMonthButton: ly,
  Option: cy,
  PreviousMonthButton: uy,
  Root: dy,
  Select: my,
  Week: fy,
  WeekNumber: gy,
  WeekNumberHeader: by,
  Weekday: hy,
  Weekdays: py,
  Weeks: vy,
  YearsDropdown: wy
}, Symbol.toStringTag, { value: "Module" }));
function ft(e, t, n = !1, o = lt) {
  let { from: r, to: s } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = o;
  return r && s ? (a(s, r) < 0 && ([r, s] = [s, r]), a(t, r) >= (n ? 1 : 0) && a(s, t) >= (n ? 1 : 0)) : !n && s ? i(s, t) : !n && r ? i(r, t) : !1;
}
function Fu(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function xi(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function zu(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Uu(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Yu(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function ju(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function ht(e, t, n = lt) {
  const o = Array.isArray(t) ? t : [t], { isSameDay: r, differenceInCalendarDays: s, isAfter: a } = n;
  return o.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return r(e, i);
    if (ju(i, n))
      return i.includes(e);
    if (xi(i))
      return ft(i, e, !1, n);
    if (Yu(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Fu(i)) {
      const l = s(i.before, e), c = s(i.after, e), u = l > 0, d = c < 0;
      return a(i.before, i.after) ? d && u : u || d;
    }
    return zu(i) ? s(e, i.after) > 0 : Uu(i) ? s(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function yy(e, t, n, o, r) {
  const { disabled: s, hidden: a, modifiers: i, showOutsideDays: l, broadcastCalendar: c, today: u } = t, { isSameDay: d, isSameMonth: f, startOfMonth: h, isBefore: g, endOfMonth: p, isAfter: b } = r, w = n && h(n), v = o && p(o), y = {
    [ge.focused]: [],
    [ge.outside]: [],
    [ge.disabled]: [],
    [ge.hidden]: [],
    [ge.today]: []
  }, T = {};
  for (const N of e) {
    const { date: C, displayMonth: S } = N, k = !!(S && !f(C, S)), D = !!(w && g(C, w)), x = !!(v && b(C, v)), M = !!(s && ht(C, s, r)), A = !!(a && ht(C, a, r)) || D || x || // Broadcast calendar will show outside days as default
    !c && !l && k || c && l === !1 && k, R = d(C, u ?? r.today());
    k && y.outside.push(N), M && y.disabled.push(N), A && y.hidden.push(N), R && y.today.push(N), i && Object.keys(i).forEach((L) => {
      const _ = i?.[L];
      _ && ht(C, _, r) && (T[L] ? T[L].push(N) : T[L] = [N]);
    });
  }
  return (N) => {
    const C = {
      [ge.focused]: !1,
      [ge.disabled]: !1,
      [ge.hidden]: !1,
      [ge.outside]: !1,
      [ge.today]: !1
    }, S = {};
    for (const k in y) {
      const D = y[k];
      C[k] = D.some((x) => x === N);
    }
    for (const k in T)
      S[k] = T[k].some((D) => D === N);
    return {
      ...C,
      // custom modifiers should override all the previous ones
      ...S
    };
  };
}
function ky(e, t, n = {}) {
  return Object.entries(e).filter(([, r]) => r === !0).reduce((r, [s]) => (n[s] ? r.push(n[s]) : t[ge[s]] ? r.push(t[ge[s]]) : t[Xe[s]] && r.push(t[Xe[s]]), r), [t[te.Day]]);
}
function xy(e) {
  return {
    ...Ny,
    ...e
  };
}
function Cy(e) {
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
function Ci() {
  const e = {};
  for (const t in te)
    e[te[t]] = `rdp-${te[t]}`;
  for (const t in ge)
    e[ge[t]] = `rdp-${ge[t]}`;
  for (const t in Xe)
    e[Xe[t]] = `rdp-${Xe[t]}`;
  for (const t in Be)
    e[Be[t]] = `rdp-${Be[t]}`;
  return e;
}
function Vu(e, t, n) {
  return (n ?? new Fe(t)).formatMonthYear(e);
}
const Ty = Vu;
function Ey(e, t, n) {
  return (n ?? new Fe(t)).format(e, "d");
}
function Sy(e, t = lt) {
  return t.format(e, "LLLL");
}
function My(e, t, n) {
  return (n ?? new Fe(t)).format(e, "cccccc");
}
function Dy(e, t = lt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Ay() {
  return "";
}
function Ku(e, t = lt) {
  return t.format(e, "yyyy");
}
const Py = Ku, Iy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Vu,
  formatDay: Ey,
  formatMonthCaption: Ty,
  formatMonthDropdown: Sy,
  formatWeekNumber: Dy,
  formatWeekNumberHeader: Ay,
  formatWeekdayName: My,
  formatYearCaption: Py,
  formatYearDropdown: Ku
}, Symbol.toStringTag, { value: "Module" }));
function Ry(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Iy,
    ...e
  };
}
function Ly(e, t, n, o, r) {
  const { startOfMonth: s, startOfYear: a, endOfYear: i, eachMonthOfInterval: l, getMonth: c } = r;
  return l({
    start: a(e),
    end: i(e)
  }).map((f) => {
    const h = o.formatMonthDropdown(f, r), g = c(f), p = t && f < s(t) || n && f > s(n) || !1;
    return { value: g, label: h, disabled: p };
  });
}
function Oy(e, t = {}, n = {}) {
  let o = { ...t?.[te.Day] };
  return Object.entries(e).filter(([, r]) => r === !0).forEach(([r]) => {
    o = {
      ...o,
      ...n?.[r]
    };
  }), o;
}
function _y(e, t, n) {
  const o = e.today(), r = t ? e.startOfISOWeek(o) : e.startOfWeek(o), s = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(r, a);
    s.push(i);
  }
  return s;
}
function $y(e, t, n, o, r = !1) {
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
function Gu(e, t, n, o) {
  let r = (o ?? new Fe(n)).format(e, "PPPP");
  return t.today && (r = `Today, ${r}`), t.selected && (r = `${r}, selected`), r;
}
const By = Gu;
function qu(e, t, n) {
  return (n ?? new Fe(t)).formatMonthYear(e);
}
const Wy = qu;
function Hy(e, t, n, o) {
  let r = (o ?? new Fe(n)).format(e, "PPPP");
  return t?.today && (r = `Today, ${r}`), r;
}
function Fy(e) {
  return "Choose the Month";
}
function zy() {
  return "";
}
function Uy(e) {
  return "Go to the Next Month";
}
function Yy(e) {
  return "Go to the Previous Month";
}
function jy(e, t, n) {
  return (n ?? new Fe(t)).format(e, "cccc");
}
function Vy(e, t) {
  return `Week ${e}`;
}
function Ky(e) {
  return "Week Number";
}
function Gy(e) {
  return "Choose the Year";
}
const qy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: Wy,
  labelDay: By,
  labelDayButton: Gu,
  labelGrid: qu,
  labelGridcell: Hy,
  labelMonthDropdown: Fy,
  labelNav: zy,
  labelNext: Uy,
  labelPrevious: Yy,
  labelWeekNumber: Vy,
  labelWeekNumberHeader: Ky,
  labelWeekday: jy,
  labelYearDropdown: Gy
}, Symbol.toStringTag, { value: "Module" })), io = (e) => e instanceof HTMLElement ? e : null, ls = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Xy = (e) => io(e.querySelector("[data-animated-month]")), cs = (e) => io(e.querySelector("[data-animated-caption]")), us = (e) => io(e.querySelector("[data-animated-weeks]")), Zy = (e) => io(e.querySelector("[data-animated-nav]")), Qy = (e) => io(e.querySelector("[data-animated-weekdays]"));
function Jy(e, t, { classNames: n, months: o, focused: r, dateLib: s }) {
  const a = j(null), i = j(o), l = j(!1);
  fr(() => {
    const c = i.current;
    if (i.current = o, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    o.length === 0 || c.length === 0 || o.length !== c.length)
      return;
    const u = s.isSameMonth(o[0].date, c[0].date), d = s.isAfter(o[0].date, c[0].date), f = d ? n[Be.caption_after_enter] : n[Be.caption_before_enter], h = d ? n[Be.weeks_after_enter] : n[Be.weeks_before_enter], g = a.current, p = e.current.cloneNode(!0);
    if (p instanceof HTMLElement ? (ls(p).forEach((y) => {
      if (!(y instanceof HTMLElement))
        return;
      const T = Xy(y);
      T && y.contains(T) && y.removeChild(T);
      const N = cs(y);
      N && N.classList.remove(f);
      const C = us(y);
      C && C.classList.remove(h);
    }), a.current = p) : a.current = null, l.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    r)
      return;
    const b = g instanceof HTMLElement ? ls(g) : [], w = ls(e.current);
    if (w?.every((v) => v instanceof HTMLElement) && b && b.every((v) => v instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const v = Zy(e.current);
      v && (v.style.zIndex = "1"), w.forEach((y, T) => {
        const N = b[T];
        if (!N)
          return;
        y.style.position = "relative", y.style.overflow = "hidden";
        const C = cs(y);
        C && C.classList.add(f);
        const S = us(y);
        S && S.classList.add(h);
        const k = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), v && (v.style.zIndex = ""), C && C.classList.remove(f), S && S.classList.remove(h), y.style.position = "", y.style.overflow = "", y.contains(N) && y.removeChild(N);
        };
        N.style.pointerEvents = "none", N.style.position = "absolute", N.style.overflow = "hidden", N.setAttribute("aria-hidden", "true");
        const D = Qy(N);
        D && (D.style.opacity = "0");
        const x = cs(N);
        x && (x.classList.add(d ? n[Be.caption_before_exit] : n[Be.caption_after_exit]), x.addEventListener("animationend", k));
        const M = us(N);
        M && M.classList.add(d ? n[Be.weeks_before_exit] : n[Be.weeks_after_exit]), y.insertBefore(N, y.firstChild);
      });
    }
  });
}
function e0(e, t, n, o) {
  const r = e[0], s = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: c, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: h, endOfMonth: g, endOfWeek: p, isAfter: b, startOfBroadcastWeek: w, startOfISOWeek: v, startOfWeek: y } = o, T = l ? w(r, o) : a ? v(r) : y(r), N = l ? f(s) : a ? h(g(s)) : p(g(s)), C = u(N, T), S = d(s, r) + 1, k = [];
  for (let M = 0; M <= C; M++) {
    const A = c(T, M);
    if (t && b(A, t))
      break;
    k.push(A);
  }
  const x = (l ? 35 : 42) * S;
  if (i && k.length < x) {
    const M = x - k.length;
    for (let A = 0; A < M; A++) {
      const R = c(k[k.length - 1], 1);
      k.push(R);
    }
  }
  return k;
}
function t0(e) {
  const t = [];
  return e.reduce((n, o) => {
    const r = o.weeks.reduce((s, a) => s.concat(a.days.slice()), t.slice());
    return n.concat(r.slice());
  }, t.slice());
}
function n0(e, t, n, o) {
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
function o0(e, t, n, o) {
  const { addDays: r, endOfBroadcastWeek: s, endOfISOWeek: a, endOfMonth: i, endOfWeek: l, getISOWeek: c, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: h } = o, g = e.reduce((p, b) => {
    const w = n.broadcastCalendar ? d(b, o) : n.ISOWeek ? f(b) : h(b), v = n.broadcastCalendar ? s(b) : n.ISOWeek ? a(i(b)) : l(i(b)), y = t.filter((S) => S >= w && S <= v), T = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && y.length < T) {
      const S = t.filter((k) => {
        const D = T - y.length;
        return k > v && k <= r(v, D);
      });
      y.push(...S);
    }
    const N = y.reduce((S, k) => {
      const D = n.ISOWeek ? c(k) : u(k), x = S.find((A) => A.weekNumber === D), M = new Wu(k, b, o);
      return x ? x.days.push(M) : S.push(new KN(D, [M])), S;
    }, []), C = new VN(b, N);
    return p.push(C), p;
  }, []);
  return n.reverseMonths ? g.reverse() : g;
}
function r0(e, t) {
  let { startMonth: n, endMonth: o } = e;
  const { startOfYear: r, startOfDay: s, startOfMonth: a, endOfMonth: i, addYears: l, endOfYear: c, newDate: u, today: d } = t, { fromYear: f, toYear: h, fromMonth: g, toMonth: p } = e;
  !n && g && (n = g), !n && f && (n = t.newDate(f, 0, 1)), !o && p && (o = p), !o && h && (o = u(h, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : f ? n = u(f, 0, 1) : !n && b && (n = r(l(e.today ?? d(), -100))), o ? o = i(o) : h ? o = u(h, 11, 31) : !o && b && (o = c(e.today ?? d())), [
    n && s(n),
    o && s(o)
  ];
}
function s0(e, t, n, o) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: r, numberOfMonths: s = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = o, c = r ? s : 1, u = a(e);
  if (!t)
    return i(u, c);
  if (!(l(t, e) < s))
    return i(u, c);
}
function i0(e, t, n, o) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: r, numberOfMonths: s } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = o, c = r ? s ?? 1 : 1, u = a(e);
  if (!t)
    return i(u, -c);
  if (!(l(u, t) <= 0))
    return i(u, -c);
}
function a0(e) {
  const t = [];
  return e.reduce((n, o) => n.concat(o.weeks.slice()), t.slice());
}
function Dr(e, t) {
  const [n, o] = U(e);
  return [t === void 0 ? n : t, o];
}
function l0(e, t) {
  const [n, o] = r0(e, t), { startOfMonth: r, endOfMonth: s } = t, a = Ha(e, n, o, t), [i, l] = Dr(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  K(() => {
    const C = Ha(e, n, o, t);
    l(C);
  }, [e.timeZone]);
  const c = n0(i, o, e, t), u = e0(c, e.endMonth ? s(e.endMonth) : void 0, e, t), d = o0(c, u, e, t), f = a0(d), h = t0(d), g = i0(i, n, e, t), p = s0(i, o, e, t), { disableNavigation: b, onMonthChange: w } = e, v = (C) => f.some((S) => S.days.some((k) => k.isEqualTo(C))), y = (C) => {
    if (b)
      return;
    let S = r(C);
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
    goToDay: (C) => {
      v(C) || y(C.date);
    }
  };
}
var et;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(et || (et = {}));
function Fa(e) {
  return !e[ge.disabled] && !e[ge.hidden] && !e[ge.outside];
}
function c0(e, t, n, o) {
  let r, s = -1;
  for (const a of e) {
    const i = t(a);
    Fa(i) && (i[ge.focused] && s < et.FocusedModifier ? (r = a, s = et.FocusedModifier) : o?.isEqualTo(a) && s < et.LastFocused ? (r = a, s = et.LastFocused) : n(a.date) && s < et.Selected ? (r = a, s = et.Selected) : i[ge.today] && s < et.Today && (r = a, s = et.Today));
  }
  return r || (r = e.find((a) => Fa(t(a)))), r;
}
function u0(e, t, n, o, r, s, a) {
  const { ISOWeek: i, broadcastCalendar: l } = s, { addDays: c, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: h, endOfISOWeek: g, endOfWeek: p, max: b, min: w, startOfBroadcastWeek: v, startOfISOWeek: y, startOfWeek: T } = a;
  let C = {
    day: c,
    week: d,
    month: u,
    year: f,
    startOfWeek: (S) => l ? v(S, a) : i ? y(S) : T(S),
    endOfWeek: (S) => l ? h(S) : i ? g(S) : p(S)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && o ? C = b([o, C]) : t === "after" && r && (C = w([r, C])), C;
}
function Xu(e, t, n, o, r, s, a, i = 0) {
  if (i > 365)
    return;
  const l = u0(e, t, n.date, o, r, s, a), c = !!(s.disabled && ht(l, s.disabled, a)), u = !!(s.hidden && ht(l, s.hidden, a)), d = l, f = new Wu(l, d, a);
  return !c && !u ? f : Xu(e, t, f, o, r, s, a, i + 1);
}
function d0(e, t, n, o, r) {
  const { autoFocus: s } = e, [a, i] = U(), l = c0(t.days, n, o || (() => !1), a), [c, u] = U(s ? l : void 0);
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
      const w = Xu(p, b, c, t.navStart, t.navEnd, e, r);
      w && (e.disableNavigation && !t.days.some((y) => y.isEqualTo(w)) || (t.goToDay(w), u(w)));
    }
  };
}
function m0(e, t) {
  const { selected: n, required: o, onSelect: r } = e, [s, a] = Dr(n, r ? n : void 0), i = r ? n : s, { isSameDay: l } = t, c = (h) => i?.some((g) => l(g, h)) ?? !1, { min: u, max: d } = e;
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
function f0(e, t, n = 0, o = 0, r = !1, s = lt) {
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
function h0(e, t, n = lt) {
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
function za(e, t, n = lt) {
  return ft(e, t.from, !1, n) || ft(e, t.to, !1, n) || ft(t, e.from, !1, n) || ft(t, e.to, !1, n);
}
function p0(e, t, n = lt) {
  const o = Array.isArray(t) ? t : [t];
  if (o.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? ft(e, i, !1, n) : ju(i, n) ? i.some((l) => ft(e, l, !1, n)) : xi(i) ? i.from && i.to ? za(e, { from: i.from, to: i.to }, n) : !1 : Yu(i) ? h0(e, i.dayOfWeek, n) : Fu(i) ? n.isAfter(i.before, i.after) ? za(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : ht(e.from, i, n) || ht(e.to, i, n) : zu(i) || Uu(i) ? ht(e.from, i, n) || ht(e.to, i, n) : !1))
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
function g0(e, t) {
  const { disabled: n, excludeDisabled: o, selected: r, required: s, onSelect: a } = e, [i, l] = Dr(r, a ? r : void 0), c = a ? r : i;
  return {
    selected: c,
    select: (f, h, g) => {
      const { min: p, max: b } = e, w = f ? f0(f, c, p, b, s, t) : void 0;
      return o && n && w?.from && w.to && p0({ from: w.from, to: w.to }, n, t) && (w.from = f, w.to = void 0), a || l(w), a?.(w, f, h, g), w;
    },
    isSelected: (f) => c && ft(c, f, !1, t)
  };
}
function b0(e, t) {
  const { selected: n, required: o, onSelect: r } = e, [s, a] = Dr(n, r ? n : void 0), i = r ? n : s, { isSameDay: l } = t;
  return {
    selected: i,
    select: (d, f, h) => {
      let g = d;
      return !o && i && i && l(d, i) && (g = void 0), r || a(g), r?.(g, d, f, h), g;
    },
    isSelected: (d) => i ? l(i, d) : !1
  };
}
function v0(e, t) {
  const n = b0(e, t), o = m0(e, t), r = g0(e, t);
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
function w0(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Pe(t.today, t.timeZone)), t.month && (t.month = new Pe(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Pe(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Pe(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Pe(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Pe(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((ie) => new Pe(ie, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Pe(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Pe(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: o, labels: r, dateLib: s, locale: a, classNames: i } = rt(() => {
    const ie = { ...ki, ...t.locale };
    return {
      dateLib: new Fe({
        locale: ie,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: xy(t.components),
      formatters: Ry(t.formatters),
      labels: { ...qy, ...t.labels },
      locale: ie,
      classNames: { ...Ci(), ...t.classNames }
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
  ]), { captionLayout: l, mode: c, navLayout: u, numberOfMonths: d = 1, onDayBlur: f, onDayClick: h, onDayFocus: g, onDayKeyDown: p, onDayMouseEnter: b, onDayMouseLeave: w, onNextClick: v, onPrevClick: y, showWeekNumber: T, styles: N } = t, { formatCaption: C, formatDay: S, formatMonthDropdown: k, formatWeekNumber: D, formatWeekNumberHeader: x, formatWeekdayName: M, formatYearDropdown: A } = o, R = l0(t, s), { days: L, months: _, navStart: W, navEnd: V, previousMonth: I, nextMonth: P, goToMonth: $ } = R, q = yy(L, t, W, V, s), { isSelected: H, select: Y, selected: G } = v0(t, s) ?? {}, { blur: B, focused: J, isFocusTarget: O, moveFocus: ee, setFocused: ne } = d0(t, R, q, H ?? (() => !1), s), { labelDayButton: ue, labelGridcell: we, labelGrid: be, labelMonthDropdown: ze, labelNav: ct, labelPrevious: Lt, labelNext: Mn, labelWeekday: Dn, labelWeekNumber: ao, labelWeekNumberHeader: lo, labelYearDropdown: co } = r, uo = rt(() => _y(s, t.ISOWeek), [s, t.ISOWeek]), An = c !== void 0 || h !== void 0, Zt = F(() => {
    I && ($(I), y?.(I));
  }, [I, $, y]), kt = F(() => {
    P && ($(P), v?.(P));
  }, [$, P, v]), mo = F((ie, pe) => (oe) => {
    oe.preventDefault(), oe.stopPropagation(), ne(ie), Y?.(ie.date, pe, oe), h?.(ie.date, pe, oe);
  }, [Y, h, ne]), fo = F((ie, pe) => (oe) => {
    ne(ie), g?.(ie.date, pe, oe);
  }, [g, ne]), ho = F((ie, pe) => (oe) => {
    B(), f?.(ie.date, pe, oe);
  }, [B, f]), po = F((ie, pe) => (oe) => {
    const me = {
      ArrowLeft: [
        oe.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        oe.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [oe.shiftKey ? "year" : "week", "after"],
      ArrowUp: [oe.shiftKey ? "year" : "week", "before"],
      PageUp: [oe.shiftKey ? "year" : "month", "before"],
      PageDown: [oe.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (me[oe.key]) {
      oe.preventDefault(), oe.stopPropagation();
      const [Ee, de] = me[oe.key];
      ee(Ee, de);
    }
    p?.(ie.date, pe, oe);
  }, [ee, p, t.dir]), Pr = F((ie, pe) => (oe) => {
    b?.(ie.date, pe, oe);
  }, [b]), Ir = F((ie, pe) => (oe) => {
    w?.(ie.date, pe, oe);
  }, [w]), Rr = F((ie) => (pe) => {
    const oe = Number(pe.target.value), me = s.setMonth(s.startOfMonth(ie), oe);
    $(me);
  }, [s, $]), Lr = F((ie) => (pe) => {
    const oe = Number(pe.target.value), me = s.setYear(s.startOfMonth(ie), oe);
    $(me);
  }, [s, $]), { className: Or, style: go } = rt(() => ({
    className: [i[te.Root], t.className].filter(Boolean).join(" "),
    style: { ...N?.[te.Root], ...t.style }
  }), [i, t.className, t.style, N]), _r = Cy(t), bo = j(null);
  Jy(bo, !!t.animate, {
    classNames: i,
    months: _,
    focused: J,
    dateLib: s
  });
  const $r = {
    dayPickerProps: t,
    selected: G,
    select: Y,
    isSelected: H,
    months: _,
    nextMonth: P,
    previousMonth: I,
    goToMonth: $,
    getModifiers: q,
    components: n,
    classNames: i,
    styles: N,
    labels: r,
    formatters: o
  };
  return X.createElement(
    Hu.Provider,
    { value: $r },
    X.createElement(
      n.Root,
      { rootRef: t.animate ? bo : void 0, className: Or, style: go, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ..._r },
      X.createElement(
        n.Months,
        { className: i[te.Months], style: N?.[te.Months] },
        !t.hideNavigation && !u && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[te.Nav], style: N?.[te.Nav], "aria-label": ct(), onPreviousClick: Zt, onNextClick: kt, previousMonth: I, nextMonth: P }),
        _.map((ie, pe) => X.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[te.Month],
            style: N?.[te.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: pe,
            displayIndex: pe,
            calendarMonth: ie
          },
          u === "around" && !t.hideNavigation && pe === 0 && X.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[te.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": Lt(I), onClick: Zt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: I ? void 0 : !0, className: i[te.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          X.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[te.MonthCaption], style: N?.[te.MonthCaption], calendarMonth: ie, displayIndex: pe }, l?.startsWith("dropdown") ? X.createElement(
            n.DropdownNav,
            { className: i[te.Dropdowns], style: N?.[te.Dropdowns] },
            (() => {
              const oe = l === "dropdown" || l === "dropdown-months" ? X.createElement(n.MonthsDropdown, { key: "month", className: i[te.MonthsDropdown], "aria-label": ze(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Rr(ie.date), options: Ly(ie.date, W, V, o, s), style: N?.[te.Dropdown], value: s.getMonth(ie.date) }) : X.createElement("span", { key: "month" }, k(ie.date, s)), me = l === "dropdown" || l === "dropdown-years" ? X.createElement(n.YearsDropdown, { key: "year", className: i[te.YearsDropdown], "aria-label": co(s.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Lr(ie.date), options: $y(W, V, o, s, !!t.reverseYears), style: N?.[te.Dropdown], value: s.getYear(ie.date) }) : X.createElement("span", { key: "year" }, A(ie.date, s));
              return s.getMonthYearOrder() === "year-first" ? [me, oe] : [oe, me];
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
            } }, C(ie.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            X.createElement(n.CaptionLabel, { className: i[te.CaptionLabel], role: "status", "aria-live": "polite" }, C(ie.date, s.options, s))
          )),
          u === "around" && !t.hideNavigation && pe === d - 1 && X.createElement(
            n.NextMonthButton,
            { type: "button", className: i[te.NextMonthButton], tabIndex: P ? void 0 : -1, "aria-disabled": P ? void 0 : !0, "aria-label": Mn(P), onClick: kt, "data-animated-button": t.animate ? "true" : void 0 },
            X.createElement(n.Chevron, { disabled: P ? void 0 : !0, className: i[te.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          pe === d - 1 && u === "after" && !t.hideNavigation && X.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[te.Nav], style: N?.[te.Nav], "aria-label": ct(), onPreviousClick: Zt, onNextClick: kt, previousMonth: I, nextMonth: P }),
          X.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": c === "multiple" || c === "range", "aria-label": be(ie.date, s.options, s) || void 0, className: i[te.MonthGrid], style: N?.[te.MonthGrid] },
            !t.hideWeekdays && X.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[te.Weekdays], style: N?.[te.Weekdays] },
              T && X.createElement(n.WeekNumberHeader, { "aria-label": lo(s.options), className: i[te.WeekNumberHeader], style: N?.[te.WeekNumberHeader], scope: "col" }, x()),
              uo.map((oe) => X.createElement(n.Weekday, { "aria-label": Dn(oe, s.options, s), className: i[te.Weekday], key: String(oe), style: N?.[te.Weekday], scope: "col" }, M(oe, s.options, s)))
            ),
            X.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[te.Weeks], style: N?.[te.Weeks] }, ie.weeks.map((oe) => X.createElement(
              n.Week,
              { className: i[te.Week], key: oe.weekNumber, style: N?.[te.Week], week: oe },
              T && // biome-ignore lint/a11y/useSemanticElements: react component
              X.createElement(n.WeekNumber, { week: oe, style: N?.[te.WeekNumber], "aria-label": ao(oe.weekNumber, {
                locale: a
              }), className: i[te.WeekNumber], scope: "row", role: "rowheader" }, D(oe.weekNumber, s)),
              oe.days.map((me) => {
                const { date: Ee } = me, de = q(me);
                if (de[ge.focused] = !de.hidden && !!J?.isEqualTo(me), de[Xe.selected] = H?.(Ee) || de.selected, xi(G)) {
                  const { from: en, to: Ot } = G;
                  de[Xe.range_start] = !!(en && Ot && s.isSameDay(Ee, en)), de[Xe.range_end] = !!(en && Ot && s.isSameDay(Ee, Ot)), de[Xe.range_middle] = ft(G, Ee, !0, s);
                }
                const Qt = Oy(de, N, t.modifiersStyles), Jt = ky(de, i, t.modifiersClassNames), Br = !An && !de.hidden ? we(Ee, de, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  X.createElement(n.Day, { key: `${s.format(Ee, "yyyy-MM-dd")}_${s.format(me.displayMonth, "yyyy-MM")}`, day: me, modifiers: de, className: Jt.join(" "), style: Qt, role: "gridcell", "aria-selected": de.selected || void 0, "aria-label": Br, "data-day": s.format(Ee, "yyyy-MM-dd"), "data-month": me.outside ? s.format(Ee, "yyyy-MM") : void 0, "data-selected": de.selected || void 0, "data-disabled": de.disabled || void 0, "data-hidden": de.hidden || void 0, "data-outside": me.outside || void 0, "data-focused": de.focused || void 0, "data-today": de.today || void 0 }, !de.hidden && An ? X.createElement(n.DayButton, { className: i[te.DayButton], style: N?.[te.DayButton], type: "button", day: me, modifiers: de, disabled: de.disabled || void 0, tabIndex: O(me) ? 0 : -1, "aria-label": ue(Ee, de, s.options, s), onClick: mo(me, de), onBlur: ho(me, de), onFocus: fo(me, de), onKeyDown: po(me, de), onMouseEnter: Pr(me, de), onMouseLeave: Ir(me, de) }, S(Ee, s.options, s)) : !de.hidden && S(me.date, s.options, s))
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
function N0({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: o = "label",
  buttonVariant: r = "ghost",
  formatters: s,
  components: a,
  ...i
}) {
  const l = Ci();
  return /* @__PURE__ */ m(
    w0,
    {
      showOutsideDays: n,
      className: ae(
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
        root: ae("w-fit", l.root),
        months: ae(
          "flex gap-4 flex-col md:flex-row relative",
          l.months
        ),
        month: ae("flex flex-col w-full gap-4", l.month),
        nav: ae(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          l.nav
        ),
        button_previous: ae(
          Es({ variant: r }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_previous
        ),
        button_next: ae(
          Es({ variant: r }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          l.button_next
        ),
        month_caption: ae(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          l.month_caption
        ),
        dropdowns: ae(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          l.dropdowns
        ),
        dropdown_root: ae(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          l.dropdown_root
        ),
        dropdown: ae(
          "absolute bg-popover inset-0 opacity-0",
          l.dropdown
        ),
        caption_label: ae(
          "select-none font-medium",
          o === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          l.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: ae("flex", l.weekdays),
        weekday: ae(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          l.weekday
        ),
        week: ae("flex w-full mt-2", l.week),
        week_number_header: ae(
          "select-none w-(--cell-size)",
          l.week_number_header
        ),
        week_number: ae(
          "text-[0.8rem] select-none text-muted-foreground",
          l.week_number
        ),
        day: ae(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          l.day
        ),
        range_start: ae(
          "rounded-l-md bg-accent",
          l.range_start
        ),
        range_middle: ae("rounded-none", l.range_middle),
        range_end: ae("rounded-r-md bg-accent", l.range_end),
        today: ae(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          l.today
        ),
        outside: ae(
          "text-muted-foreground aria-selected:text-muted-foreground",
          l.outside
        ),
        disabled: ae(
          "text-muted-foreground opacity-50",
          l.disabled
        ),
        hidden: ae("invisible", l.hidden),
        ...t
      },
      components: {
        Root: ({ className: c, rootRef: u, ...d }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: u,
            className: ae(c),
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
        Chevron: ({ className: c, orientation: u, ...d }) => u === "left" ? /* @__PURE__ */ m(cm, { className: ae("size-4", c), ...d }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/calendar.tsx",
          lineNumber: 139,
          columnNumber: 15
        }, this) : u === "right" ? /* @__PURE__ */ m(
          um,
          {
            className: ae("size-4", c),
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
        ) : /* @__PURE__ */ m(dm, { className: ae("size-4", c), ...d }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/ui/calendar.tsx",
          lineNumber: 153,
          columnNumber: 13
        }, this),
        DayButton: y0,
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
function y0({
  className: e,
  day: t,
  modifiers: n,
  ...o
}) {
  const r = Ci(), s = E.useRef(null);
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
      className: ae(
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
const Zu = /* @__PURE__ */ new Map(), k0 = /* @__PURE__ */ new Map();
function Qo() {
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
function x0(e) {
  return hn?.pillDate === e;
}
function C0({
  currentDate: e,
  theme: t,
  position: n,
  onSelectDate: o,
  onClose: r
}) {
  const s = j(null), a = Ar(e);
  K(() => {
    const v = (y) => {
      y.key === "Escape" && (y.stopPropagation(), y.preventDefault(), r());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [r]), K(() => {
    const v = (T) => {
      s.current && !s.current.contains(T.target) && (T.target.closest(".date-pill") || r());
    }, y = setTimeout(() => {
      document.addEventListener("mousedown", v, !0);
    }, 50);
    return () => {
      clearTimeout(y), document.removeEventListener("mousedown", v, !0);
    };
  }, [r]);
  const i = F((v) => {
    v && o(gn(v)), r();
  }, [o, r]), l = F((v) => {
    const y = /* @__PURE__ */ new Date();
    y.setDate(y.getDate() + v), o(gn(y)), r();
  }, [o, r]), c = F(() => {
    const y = (/* @__PURE__ */ new Date()).getDay(), T = y === 0 ? 1 : 8 - y, N = /* @__PURE__ */ new Date();
    N.setDate(N.getDate() + T), o(gn(N)), r();
  }, [o, r]), u = /* @__PURE__ */ new Date(), d = u.toDateString(), f = new Date(u);
  f.setDate(f.getDate() + 1);
  const h = f.toDateString(), g = u.getDay(), p = g === 0 ? 1 : 8 - g, b = new Date(u);
  b.setDate(b.getDate() + p);
  const w = b.toDateString();
  return /* @__PURE__ */ m(
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
            N0,
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
              Dt,
              {
                variant: "outline",
                size: "sm",
                className: ae(
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
              Dt,
              {
                variant: "outline",
                size: "sm",
                className: ae(
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
              Dt,
              {
                variant: "outline",
                size: "sm",
                className: ae(
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
function T0(e, t, n) {
  if (x0(t)) {
    Qo();
    return;
  }
  Qo();
  const o = e.getBoundingClientRect(), r = window.innerWidth, s = window.innerHeight, a = 320, i = 420, l = 10, c = 16, u = s - o.bottom - l - c, d = o.top - l - c, f = u >= i ? "below" : d >= i ? "above" : u >= d ? "below" : "above";
  let h;
  f === "below" ? h = o.bottom + l : h = o.top - i - l;
  const g = o.left + o.width / 2;
  let p = g - a / 2;
  p + a > r - c && (p = r - a - c), p < c && (p = c);
  const b = document.createElement("div");
  b.setAttribute("data-date-picker-standalone", t), b.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:99999;pointer-events:auto;", document.body.appendChild(b), ["mousedown", "mouseup", "click", "pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].forEach((N) => {
    b.addEventListener(N, (C) => {
      C.stopPropagation();
    }, !1);
  });
  const v = af(b);
  hn = { container: b, root: v, pillDate: t };
  const y = () => {
    Qo();
  }, T = (N) => {
    const C = Zu.get(t);
    C && C(N);
  };
  v.render(
    /* @__PURE__ */ m(
      C0,
      {
        currentDate: t,
        theme: n,
        position: { top: h, left: p, direction: f, pillCenter: g },
        onSelectDate: T,
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
function E0({ node: e, updateAttributes: t, selected: n }) {
  const o = j(null), r = e.attrs.date || pn(), s = Qu(r), a = Ti(r), i = F(() => {
    if (!o.current) return "";
    const l = o.current.closest(".markdown-editor-container");
    if (l) {
      const u = l.getAttribute("data-theme");
      if (u) return u;
    }
    return o.current.closest("[data-theme]")?.getAttribute("data-theme") || "";
  }, []);
  return K(() => (Zu.set(r, (l) => {
    t({ date: l });
  }), k0.set(r, i), () => {
  }), [r, t, i]), K(() => {
    const l = o.current;
    if (!l) return;
    const c = (u) => {
      u.preventDefault(), u.stopPropagation();
      const d = l.getAttribute("data-date") || pn(), f = i();
      T0(l, d, f);
    };
    return l.addEventListener("click", c), () => l.removeEventListener("click", c);
  }, [i]), K(() => {
    const l = o.current?.closest(".ProseMirror") || document, c = () => {
      hn && Qo();
    };
    return l.addEventListener("scroll", c, { passive: !0 }), () => {
      l.removeEventListener("scroll", c);
    };
  }, []), /* @__PURE__ */ m(bn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: o,
      className: `date-pill ${a} ${n ? "ProseMirror-selectednode" : ""} cursor-pointer`,
      contentEditable: !1,
      "data-type": "date-pill",
      "data-date": r,
      children: [
        /* @__PURE__ */ m(vl, { size: 14, className: "date-icon" }, void 0, !1, {
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
function Ar(e) {
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
function Un(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + e), `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function gn(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Qu(e) {
  const t = Ar(e), n = /* @__PURE__ */ new Date(), o = new Date(n.getFullYear(), n.getMonth(), n.getDate()), r = new Date(o);
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
function S0(e) {
  return Ar(e).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function Ft(e) {
  const t = e.trim(), n = t.toLowerCase();
  if (n === "today") return pn();
  if (n === "tomorrow") return Un(1);
  if (n === "yesterday") return Un(-1);
  if (n === "next monday") {
    const i = (/* @__PURE__ */ new Date()).getDay(), l = i === 0 ? 1 : 8 - i;
    return Un(l);
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
function Ti(e) {
  const t = Ar(e), n = /* @__PURE__ */ new Date(), o = new Date(n.getFullYear(), n.getMonth(), n.getDate()), r = new Date(o);
  return r.setDate(r.getDate() + 7), t.getTime() === o.getTime() ? "date-today" : t < o ? "date-overdue" : t <= r ? "date-upcoming" : "";
}
const M0 = new De("datePillPaste"), D0 = gr.create({
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
    const n = e.attrs.date, o = Qu(n), r = Ti(n);
    return [
      "span",
      yn(this.options.HTMLAttributes, t, {
        "data-type": "date-pill",
        class: `date-pill ${r}`.trim()
      }),
      ["span", { class: "date-icon" }, "📅"],
      ["span", { class: "date-text" }, o]
    ];
  },
  addNodeView() {
    return mr(E0, {
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
    const e = new Le({
      find: /@today\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(pn()).run();
      }
    }), t = new Le({
      find: /@tomorrow\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(Un(1)).run();
      }
    }), n = new Le({
      find: /@yesterday\s$/,
      handler: ({ range: u, chain: d }) => {
        d().deleteRange(u).insertDatePill(Un(-1)).run();
      }
    }), o = new Le({
      find: /@(\d{4}-\d{2}-\d{2})\s$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), r = new Le({
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
    }), s = new Le({
      find: /@([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = Ft(f[1]);
        h && d().deleteRange(u).insertDatePill(h).run();
      }
    }), a = new Le({
      find: /@(today|tomorrow|yesterday|next monday)@$/i,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = Ft(f[1]);
        h && d().deleteRange(u).insertDatePill(h).run();
      }
    }), i = new Le({
      find: /@(\d{4}-\d{2}-\d{2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        d().deleteRange(u).insertDatePill(f[1]).run();
      }
    }), l = new Le({
      find: /@([A-Za-z]{3,9}\s+\d{1,2})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = Ft(f[1]);
        h && d().deleteRange(u).insertDatePill(h).run();
      }
    }), c = new Le({
      find: /@(\d{1,2}\/\d{1,2}\/\d{4})@$/,
      handler: ({ range: u, chain: d, match: f }) => {
        const h = Ft(f[1]);
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
      new Me({
        key: M0,
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
              if (Ft(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, h = [];
            let g = 0;
            const p = new RegExp(a.source, a.flags);
            let b;
            for (; (b = p.exec(r)) !== null; ) {
              const T = b[1], N = Ft(T);
              if (N) {
                const C = r.slice(g, b.index);
                C && h.push(f.text(C)), h.push(e.create({ date: N })), g = b.index + b[0].length;
              }
            }
            const w = r.slice(g);
            if (w && h.push(f.text(w)), h.length === 0) return !1;
            const v = f.nodes.doc.create(
              null,
              f.nodes.paragraph.create(null, h)
            ), { $from: y } = u.selection;
            if (y.parent.type.name === "paragraph") {
              const T = d;
              let N = u.selection.from;
              for (const C of h)
                T.insert(N, C), N += C.nodeSize;
              T.delete(u.selection.from, u.selection.to), t.dispatch(T);
            } else
              d.replaceSelectionWith(v), t.dispatch(d);
            return n.preventDefault(), !0;
          }
        }
      })
    ];
  }
}), Ge = /* @__PURE__ */ new Map();
function A0({ node: e, selected: t, editor: n, getPos: o, deleteNode: r }) {
  const s = j(null), a = j(null), i = e.attrs.tag || "", l = j(!1), [c, u] = U(() => Ge.has(i)), [d, f] = U(() => Ge.get(i)?.value ?? i);
  K(() => {
    c || f(i);
  }, [i, c]), K(() => {
    if (c) {
      const v = Ge.get(i);
      Ge.set(i, {
        value: d,
        focusedAt: v?.focusedAt ?? Date.now()
      });
    }
  }, [c, d, i]);
  const h = F((v) => {
    if (l.current) return;
    l.current = !0;
    const y = v.trim().replace(/^#/, ""), T = Yn(y);
    if (Ge.delete(i), T && Ge.delete(T), !T || !un(T))
      r();
    else if (T !== i) {
      const N = o();
      if (typeof N == "number" && n) {
        const { tr: C } = n.state, S = e.nodeSize;
        C.delete(N, N + S), C.insert(N, n.schema.nodes.tagPill.create({ tag: T })), n.view.dispatch(C);
      }
    } else
      Ge.delete(i);
    u(!1), requestAnimationFrame(() => {
      n?.commands.focus();
    });
  }, [i, n, o, r, e.nodeSize]), g = F(() => {
    n && !n.isEditable || (Ge.set(i, { value: i, focusedAt: Date.now() }), f(i), u(!0), l.current = !1);
  }, [n, i]);
  K(() => {
    const v = s.current;
    if (!v || c) return;
    const y = (N) => {
      N.preventDefault(), N.stopPropagation(), g();
    }, T = (N) => {
      N.preventDefault(), N.stopPropagation();
    };
    return v.addEventListener("dblclick", y), v.addEventListener("click", T), () => {
      v.removeEventListener("dblclick", y), v.removeEventListener("click", T);
    };
  }, [c, n, o, g]), K(() => {
    if (c) {
      const v = requestAnimationFrame(() => {
        if (a.current) {
          a.current.focus(), a.current.select();
          const y = Ge.get(i);
          y && (y.focusedAt = Date.now());
        }
      });
      return () => cancelAnimationFrame(v);
    }
  }, [c, i]);
  const p = F((v) => {
    v.key === "Enter" ? (v.preventDefault(), h(d)) : v.key === "Escape" && (v.preventDefault(), Ge.delete(i), u(!1), l.current = !0, n?.commands.focus());
  }, [h, d, i, n]), b = F(() => {
    const y = Ge.get(i)?.focusedAt ?? 0;
    Date.now() - y > 300 && h(d);
  }, [h, d, i]), w = F((v) => {
    f(v.target.value);
  }, []);
  return c ? /* @__PURE__ */ m(bn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: s,
      className: `tag-pill tag-pill-editing ${t ? "ProseMirror-selectednode" : ""}`,
      "data-type": "tag-pill",
      "data-tag": i,
      children: [
        /* @__PURE__ */ m(Vi, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
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
  }, this) : /* @__PURE__ */ m(bn, { as: "span", className: "inline", children: /* @__PURE__ */ m(
    "span",
    {
      ref: s,
      className: `tag-pill ${t ? "ProseMirror-selectednode" : ""}`,
      contentEditable: !1,
      "data-type": "tag-pill",
      "data-tag": i,
      children: [
        /* @__PURE__ */ m(Vi, { size: 14, className: "tag-icon", strokeWidth: 2.5 }, void 0, !1, {
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
function un(e) {
  return !(!/[a-zA-Z]/.test(e) || !/^[a-zA-Z0-9_-]+$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e) || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{8}$/.test(e));
}
function Yn(e) {
  return e.toLowerCase().trim();
}
const P0 = new De("tagPillPaste"), I0 = gr.create({
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
      yn(this.options.HTMLAttributes, t, {
        "data-type": "tag-pill",
        class: "tag-pill"
      }),
      ["span", { class: "tag-icon" }, "#"],
      ["span", { class: "tag-text" }, n]
    ];
  },
  addNodeView() {
    return mr(A0, {
      stopEvent: ({ event: e }) => e.type === "click" || e.type === "mousedown" || e.type === "dblclick" || e.type === "keydown" || e.type === "keyup" || e.type === "input" || e.type === "focus" || e.type === "blur"
    });
  },
  addCommands() {
    return {
      insertTagPill: (e) => ({ commands: t }) => {
        const n = Yn(e);
        return un(n) ? t.insertContent({
          type: this.name,
          attrs: { tag: n }
        }) : !1;
      }
    };
  },
  addInputRules() {
    return this.options.enableAutoDetect ? [new Le({
      find: /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)\s$/,
      handler: ({ range: t, chain: n, match: o }) => {
        const r = Yn(o[1]);
        if (un(r)) {
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
      new Me({
        key: P0,
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
              if (un(l[1])) {
                i = !0;
                break;
              }
            if (!i) return !1;
            const { state: u } = t, { tr: d, schema: f } = u, h = [];
            let g = 0;
            const p = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*)/g;
            let b;
            for (; (b = p.exec(r)) !== null; ) {
              const y = Yn(b[1]);
              if (un(y)) {
                const T = b[0], N = T.startsWith(" ") || T.startsWith(`
`) ? 1 : 0, C = r.slice(g, b.index + N);
                C && h.push(f.text(C)), h.push(e.create({ tag: y })), g = b.index + T.length;
              }
            }
            const w = r.slice(g);
            if (w && h.push(f.text(w)), h.length === 0) return !1;
            const { $from: v } = u.selection;
            if (v.parent.type.name === "paragraph") {
              const y = d;
              let T = u.selection.from;
              for (const N of h)
                y.insert(T, N), T += N.nodeSize;
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
}), R0 = /\[\[([^\[\]]+)\]\]$/, L0 = Tl.create({
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
      yn(
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
      new Le({
        find: R0,
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
}), mt = {
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
}, O0 = ["info", "note", "prompt", "resources", "todo", "summary"];
function _0(e) {
  return e.length < 3 ? !1 : !!(mt.header.test(e) || mt.bold.test(e) || mt.list.test(e) || mt.taskList.test(e) || mt.codeBlock.test(e) || mt.callout.test(e) || mt.highlight.test(e) || mt.link.test(e) || mt.table.test(e));
}
function $0(e) {
  const t = e.split(/\s*\\?\|\s*/).map((s) => s.trim());
  let n = "", o = "left", r = null;
  return t.length === 1 ? n = t[0] : t.length === 2 ? (n = t[0], /^\d+$/.test(t[1]) ? r = t[1] : ["left", "center", "right"].includes(t[1]) && (o = t[1])) : t.length === 3 && (n = t[0], ["left", "center", "right"].includes(t[1]) && (o = t[1]), /^\d+$/.test(t[2]) && (r = t[2])), { alt: n, align: o, width: r };
}
function B0(e, t) {
  const { alt: n, align: o, width: r } = $0(e), s = {
    left: "margin-right: auto;",
    center: "margin-left: auto; margin-right: auto;",
    right: "margin-left: auto;"
  }[o] || "margin-right: auto;", a = r ? ` width="${r}" style="width: ${r}px"` : "";
  return `<figure class="image-resizer" style="${s}"><img src="${t.trim()}" alt="${n}" data-align="${o}"${a} /></figure>`;
}
function lr(e) {
  let t = e;
  return t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "g"), "<em>$1</em>"), t = t.replace(/~~(.+?)~~/g, "<s>$1</s>"), t = t.replace(/`([^`]+)`/g, "<code>$1</code>"), t = t.replace(/==(.+?)==/g, "<mark>$1</mark>"), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'), t;
}
function Ua(e) {
  if (!/!\[[^\]]*\]\([^)]+\)/.test(e)) return `<p>${lr(e)}</p>`;
  const n = /(!\[[^\]]*\]\([^)]+\))/g, o = e.split(n).filter((s) => s.trim()), r = [];
  for (const s of o) {
    const a = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    a ? r.push(B0(a[1], a[2])) : r.push(`<p>${lr(s.trim())}</p>`);
  }
  return r.join("");
}
function Ju(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, o = Math.floor(n / 2), r = e.trimStart(), s = r.match(/^[-*+]\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: o, text: s[2].trim(), checked: s[1] === "x" };
  const a = r.match(/^[-*+]\s+(.+)$/);
  if (a)
    return { type: "ul", depth: o, text: a[1].trim() };
  const i = r.match(/^\d+\.\s+(.+)$/);
  return i ? { type: "ol", depth: o, text: i[1].trim() } : null;
}
function ed(e) {
  if (e.length === 0) return "";
  const t = (r, s) => {
    let a = "", i = r;
    const l = e[i]?.type || "ul", c = l === "task", u = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, d = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (a += u; i < e.length && e[i].depth >= s; ) {
      const f = e[i];
      if (f.depth === s) {
        if (c ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${lr(f.text)}</p>` : a += `<li><p>${lr(f.text)}</p>`, i + 1 < e.length && e[i + 1].depth > s) {
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
    s.length !== 0 && (r.push(ed(s)), s = []);
  };
  for (const i of o) {
    const l = Ju(i);
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
function W0(e) {
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
function H0(e) {
  let t = e;
  const n = /^(\|[^\n]*(?:\n\|[^\n]*)*)/gm, o = [];
  t = t.replace(n, (d) => {
    const f = d.split(`
`);
    if (f.length >= 2) {
      const h = f[1];
      if (/^\|?[\s\-:|]+\|?$/.test(h) && h.includes("-")) {
        const g = W0(d);
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
  }), O0.forEach((d) => {
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
    i.length !== 0 && (a.push(ed(i)), i = []);
  };
  for (const d of s) {
    const f = Ju(d);
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
const F0 = Oe.create({
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
        key: new De("markdownPaste"),
        props: {
          handlePaste(t, n, o) {
            const r = n.clipboardData;
            if (!r) return !1;
            const s = r.getData("text/html");
            if (s && s.trim())
              return !1;
            const a = r.getData("text/plain");
            if (!a || !_0(a))
              return !1;
            n.preventDefault();
            const i = H0(a);
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
}), ja = new De("collapsibleHeading");
function z0(e, t, n) {
  return `h${e}-${n}-${t.slice(0, 50)}`;
}
function cr(e, t) {
  const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  return e.descendants((r, s) => {
    if (r.type.name === "heading" && t.includes(r.attrs.level)) {
      const a = r.attrs.level, i = r.textContent.slice(0, 50), l = `h${a}-${i}`, c = o.get(l) ?? 0;
      o.set(l, c + 1), n.set(s, z0(a, i, c));
    }
  }), n;
}
function zo(e, t, n, o) {
  const r = [], s = cr(e, n.levels), a = [];
  e.descendants((u, d) => {
    if (u.type.name === "heading" && n.levels.includes(u.attrs.level)) {
      const f = s.get(d) ?? "";
      a.push({
        pos: d,
        level: u.attrs.level,
        id: f,
        isCollapsed: t.collapsedHeadings.has(f),
        nodeSize: u.nodeSize
      });
    }
  });
  const i = [];
  for (let u = 0; u < a.length; u++) {
    const d = a[u];
    if (d.isCollapsed) {
      const f = d.pos + d.nodeSize;
      let h = e.content.size;
      for (let g = u + 1; g < a.length; g++)
        if (a[g].level <= d.level) {
          h = a[g].pos;
          break;
        }
      f < h && i.push({ start: f, end: h });
    }
  }
  const l = [];
  for (const u of i)
    if (l.length === 0)
      l.push(u);
    else {
      const d = l[l.length - 1];
      u.start <= d.end ? d.end = Math.max(d.end, u.end) : l.push(u);
    }
  function c(u) {
    for (const d of l)
      if (u >= d.start && u < d.end) return !0;
    return !1;
  }
  return e.descendants((u, d) => {
    if (u.type.name === "heading" && n.levels.includes(u.attrs.level)) {
      const f = s.get(d) ?? "", h = t.collapsedHeadings.has(f), g = c(d);
      r.push(
        Ze.node(d, d + u.nodeSize, {
          class: `collapsible-heading collapsible-heading-level-${u.attrs.level} ${h ? "is-collapsed" : "is-expanded"}${g ? " collapsible-heading-hidden" : ""}`,
          "data-heading-id": f,
          "data-heading-level": String(u.attrs.level)
        })
      );
      const p = Ze.widget(d + u.nodeSize - 1, () => {
        const b = document.querySelector(`button.collapsible-heading-chevron[data-heading-id="${f}"]`);
        if (b) {
          b.classList.contains("collapsed") !== h && (b.classList.remove("collapsed", "expanded"), b.classList.add(h ? "collapsed" : "expanded"), b.title = h ? "Click to expand" : "Click to collapse");
          const T = b.parentElement;
          if (T) return T;
        }
        const w = document.createElement("span");
        w.className = "collapsible-heading-chevron-wrapper", w.setAttribute("contenteditable", "false");
        const v = document.createElement("button");
        return v.className = `collapsible-heading-chevron ${h ? "collapsed" : "expanded"}`, v.setAttribute("data-heading-id", f), v.setAttribute("data-heading-level", String(u.attrs.level)), v.setAttribute("contenteditable", "false"), v.setAttribute("tabindex", "-1"), v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>', v.title = h ? "Click to expand" : "Click to collapse", v.addEventListener("click", (y) => {
          y.preventDefault(), y.stopPropagation();
          const T = v.classList.contains("collapsed");
          v.classList.remove("collapsed", "expanded"), v.classList.add(T ? "expanded" : "collapsed"), v.title = T ? "Click to collapse" : "Click to expand", t.collapsedHeadings.has(f) ? t.collapsedHeadings.delete(f) : t.collapsedHeadings.add(f), o.current && o.current.dispatch(o.current.state.tr.setMeta("collapsibleHeading", { toggled: f }));
        }), w.appendChild(v), w;
      }, { side: 1, key: `chevron-${f}` });
      r.push(p);
    } else u.isBlock && c(d) && r.push(
      Ze.node(d, d + u.nodeSize, {
        class: "collapsible-heading-hidden"
      })
    );
  }), Ye.create(e, r);
}
function U0(e, t, n, o) {
  if (n.collapsedHeadings.size === 0) return;
  const r = cr(t, o), s = new Set(r.values()), a = [];
  n.collapsedHeadings.forEach((i) => {
    s.has(i) || a.push(i);
  });
  for (const i of a)
    n.collapsedHeadings.delete(i);
}
function Y0(e, t, n) {
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
const j0 = Oe.create({
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
        const a = cr(n.doc, this.options.levels).get(e);
        return a ? (o.collapsedHeadings.has(a) ? o.collapsedHeadings.delete(a) : o.collapsedHeadings.add(a), t.view.dispatch(n.setMeta("collapsibleHeading", { toggled: a })), !0) : !1;
      },
      expandAllHeadings: () => ({ editor: e, tr: t }) => (this.storage.collapsedHeadings.clear(), e.view.dispatch(t.setMeta("collapsibleHeading", { expandAll: !0 })), !0),
      collapseAllHeadings: () => ({ editor: e, tr: t }) => {
        const n = this.storage;
        return cr(t.doc, this.options.levels).forEach((r) => {
          n.collapsedHeadings.add(r);
        }), e.view.dispatch(t.setMeta("collapsibleHeading", { collapseAll: !0 })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage, t = this.options, n = { current: null };
    return [
      new Me({
        key: ja,
        view(o) {
          return n.current = o, {
            update(r) {
              n.current = r;
            },
            destroy() {
              n.current = null;
            }
          };
        },
        state: {
          init(o, r) {
            return {
              collapsedHeadings: /* @__PURE__ */ new Set(),
              decorations: zo(r.doc, e, t, n),
              docVersion: 0
            };
          },
          apply(o, r, s, a) {
            return o.getMeta("collapsibleHeading") ? {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: zo(a.doc, e, t, n),
              docVersion: r.docVersion + 1
            } : o.docChanged ? (U0(s.doc, a.doc, e, t.levels), Y0(s.doc, a.doc, t.levels) ? {
              collapsedHeadings: new Set(e.collapsedHeadings),
              decorations: zo(a.doc, e, t, n),
              docVersion: r.docVersion + 1
            } : {
              ...r,
              decorations: r.decorations.map(o.mapping, o.doc)
            }) : {
              ...r,
              decorations: r.decorations.map(o.mapping, o.doc)
            };
          }
        },
        props: {
          decorations(o) {
            const r = ja.getState(o);
            return r?.decorations ? r.decorations : zo(o.doc, e, t, n);
          }
        }
      })
    ];
  }
}), V0 = /\[([^\]]+)\]\(([^)]+)\)$/, K0 = /^(https?:\/\/|www\.)[^\s]+$/i, G0 = Oe.create({
  name: "markdownLinkInputRule",
  addInputRules() {
    return [
      new Le({
        find: V0,
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
      new Me({
        key: new De("pasteUrlAsLink"),
        props: {
          handlePaste(t, n) {
            const o = n.clipboardData;
            if (!o) return !1;
            const r = o.getData("text/plain");
            if (!r) return !1;
            const s = r.trim();
            if (!K0.test(s)) return !1;
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
}), q0 = Oe.create({
  name: "calloutInputRule"
  // No plugins — logic moved to InputDispatcher
}), Uo = new De("searchHighlight"), X0 = Oe.create({
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
      setSearchHighlight: (e) => ({ editor: t, tr: n, dispatch: o }) => (this.storage.searchTerm = e.searchTerm ?? this.storage.searchTerm, this.storage.caseSensitive = e.caseSensitive ?? this.storage.caseSensitive, this.storage.useRegex = e.useRegex ?? this.storage.useRegex, this.storage.currentMatchIndex = e.currentMatchIndex ?? this.storage.currentMatchIndex, o && o(n.setMeta(Uo, { update: !0 })), !0),
      clearSearchHighlight: () => ({ editor: e, tr: t, dispatch: n }) => (this.storage.searchTerm = "", this.storage.caseSensitive = !1, this.storage.useRegex = !1, this.storage.currentMatchIndex = 0, n && n(t.setMeta(Uo, { update: !0 })), !0)
    };
  },
  addProseMirrorPlugins() {
    const e = this.storage;
    return [
      new Me({
        key: Uo,
        state: {
          init() {
            return Ye.empty;
          },
          apply(t, n, o, r) {
            const { searchTerm: s, caseSensitive: a, useRegex: i, currentMatchIndex: l } = e, c = t.getMeta(Uo), u = t.docChanged;
            if (!s)
              return Ye.empty;
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
              return Ye.empty;
            }
            return Ye.create(r.doc, d);
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
}), Z0 = Oe.create({
  name: "tabIndent"
  // No plugins — logic moved to InputDispatcher
}), Q0 = new De("inputDispatcher"), J0 = ["info", "note", "prompt", "resources", "todo"];
function ek(e) {
  const { $from: t } = e.selection;
  for (let n = t.depth; n >= 0; n--) {
    const o = t.node(n);
    if (o.type.name === "taskItem") return "taskItem";
    if (o.type.name === "listItem") return "listItem";
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
const tk = Oe.create({
  name: "inputDispatcher",
  // Higher priority to ensure Tab handling runs before other extensions
  priority: 1e3,
  addProseMirrorPlugins() {
    const e = this.editor;
    return [
      new Me({
        key: Q0,
        props: {
          // ─── Consolidated handleTextInput ───────────────────────────
          // Replaces the separate MixedLists/taskItemInputRule plugin.
          // Runs once per character typed instead of through multiple plugins.
          handleTextInput(t, n, o, r) {
            if (r !== " ") return !1;
            const { state: s } = t, a = s.doc.resolve(n), i = a.parent.textBetween(
              0,
              a.parentOffset,
              void 0,
              "￼"
            ), c = /^\s*(-\s*)?\[([( |x])?\]$/.exec(i);
            if (!c) return !1;
            const u = s.schema.nodes.taskItem, d = s.schema.nodes.taskList;
            if (!u || !d) return !1;
            const f = c[2] === "x", h = a.start() + (c.index || 0), g = n, p = s.tr;
            p.delete(h, g);
            const w = p.doc.resolve(h).blockRange();
            if (!w) return !1;
            const v = [
              { type: d, attrs: {} },
              { type: u, attrs: { checked: f } }
            ];
            if (p.wrap(w, v), h > 1) {
              const y = p.doc.resolve(h - 1).nodeBefore;
              y && y.type === d && ef(p.doc, h - 1) && p.join(h - 1);
            }
            return t.dispatch(p), !0;
          },
          // ─── Consolidated handleKeyDown ─────────────────────────────
          // Replaces TabIndent, CalloutInputRule, and CodeBlockEnterShortcut plugins.
          // Runs once per key press instead of through multiple plugins.
          handleKeyDown(t, n) {
            if (n.key === "Tab") {
              const { state: o, dispatch: r } = t, s = ek(o);
              if (!s)
                return n.preventDefault(), !0;
              n.preventDefault();
              const a = o.schema.nodes[s];
              if (!a) return !0;
              if (n.shiftKey) {
                if (!Gi(a)(o, r)) {
                  const c = s === "taskItem" ? "listItem" : "taskItem", u = o.schema.nodes[c];
                  u && Gi(u)(o, r);
                }
              } else if (qi(a)(o, r))
                Va(t.state, r);
              else {
                const c = s === "taskItem" ? "listItem" : "taskItem", u = o.schema.nodes[c];
                u && qi(u)(o, r) && Va(t.state, r);
              }
              return !0;
            }
            if (n.key === "Enter") {
              const { state: o } = t, { $from: r } = o.selection, s = r.start(), a = o.doc.textBetween(s, r.pos, ""), i = a.trim();
              for (const c of J0)
                if (i === `\`\`\`${c}`) {
                  n.preventDefault();
                  const u = o.tr, d = s + a.indexOf("```");
                  u.delete(d, r.pos);
                  const f = e.schema.nodes.callout, h = e.schema.nodes.paragraph;
                  if (f && h) {
                    const g = h.create(), p = f.create({ type: c }, Cl.from(g));
                    u.insert(d, p);
                    const b = u.doc.resolve(d + 2);
                    u.setSelection(je.near(b)), t.dispatch(u);
                  }
                  return !0;
                }
              const { empty: l } = o.selection;
              if (l && !r.parent.type.spec.code) {
                const u = r.parent.textBetween(
                  0,
                  r.parentOffset,
                  void 0,
                  "￼"
                ).match(/^```([a-zA-Z]*)$/);
                if (u) {
                  n.preventDefault();
                  const d = u[1] || null, f = o.schema.nodes.codeBlock, h = o.schema.nodes.paragraph;
                  if (f && h) {
                    const g = o.tr, p = f.create({ language: d }, void 0), b = r.before(r.depth), w = r.after(r.depth), v = h.create();
                    g.replaceWith(b, w, [p, v]);
                    const y = b + 1;
                    g.setSelection(je.create(g.doc, y)), t.dispatch(g);
                  }
                  return !0;
                }
              }
            }
            return !1;
          }
        }
      })
    ];
  }
}), nk = new De("expandSelection");
function ds(e) {
  e.lastExpandedFrom = -1, e.lastExpandedTo = -1, e.expansionDepth = 0, e.isExpanding = !1;
}
const ok = /* @__PURE__ */ new Set([
  "bulletList",
  "orderedList",
  "taskList",
  "mixedList"
]), td = /* @__PURE__ */ new Set([
  "table",
  "callout",
  "codeBlock",
  "blockquote"
]), rk = "tableRow", sk = /* @__PURE__ */ new Set(["tableCell", "tableHeader"]);
function ik(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--)
    if (o.node(r).isTextblock) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function ak(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--) {
    const s = o.node(r);
    if (sk.has(s.type.name)) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function lk(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--)
    if (o.node(r).type.name === rk) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  return null;
}
function ck(e, t, n) {
  const o = e.resolve(t);
  for (let r = o.depth; r >= 1; r--) {
    const s = o.node(r);
    if (td.has(s.type.name)) {
      const a = o.start(r), i = o.end(r);
      if (a < t || i > n)
        return { from: a, to: i };
    }
  }
  return null;
}
function uk(e, t, n) {
  const o = e.resolve(t);
  let r = -1;
  for (let i = o.depth; i >= 1; i--) {
    const l = o.node(i);
    ok.has(l.type.name) && (r = i);
  }
  if (r === -1) return null;
  const s = o.start(r), a = o.end(r);
  return s < t || a > n ? { from: s, to: a } : null;
}
function dk(e) {
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
function mk(e, t, n) {
  const o = e.filter((r) => r.from <= t && r.to >= n);
  return o.sort((r, s) => r.to - r.from - (s.to - s.from)), o;
}
function fk(e, t) {
  const n = e.resolve(t);
  for (let o = n.depth; o >= 1; o--)
    if (n.node(o).type.name === "table") return !0;
  return !1;
}
function hk(e, t, n) {
  let o = !1;
  return e.nodesBetween(t, n, (r) => td.has(r.type.name) ? (o = !0, !1) : !0), o;
}
function pk(e, t, n) {
  const o = [];
  let r = t, s = n;
  const a = (l) => l && (l.from < r || l.to > s) ? (o.push(l), r = l.from, s = l.to, !0) : !1;
  a(ik(e, r, s)), fk(e, t) && (a(ak(e, r, s)), a(lk(e, r, s))), a(uk(e, r, s)), a(ck(e, r, s));
  const i = dk(e);
  if (i.length > 0) {
    const l = mk(i, r, s);
    for (const c of l)
      hk(e, c.from, c.to) ? c.from === 0 && c.to === e.content.size ? a({ from: 0, to: e.content.size, useSelectAll: !0 }) : a({ from: c.from, to: c.to, useSelectAll: !0 }) : a({ from: c.from, to: c.to });
  }
  return (r > 0 || s < e.content.size) && o.push({ from: 0, to: e.content.size, useSelectAll: !0 }), o;
}
const gk = Oe.create({
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
        if (t.expansionDepth > 0 && r === t.lastExpandedFrom && s === t.lastExpandedTo || (t.expansionDepth = 0), o instanceof Bm || r === 0 && s === n.content.size)
          return !0;
        const i = pk(n, r, s);
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
              const c = n.resolve(l.from), u = n.resolve(l.to), d = e.state.tr, f = je.between(c, u);
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
      new Me({
        key: nk,
        props: {
          handleClick() {
            return ds(e), !1;
          },
          handleTextInput() {
            return ds(e), !1;
          },
          handleKeyDown(t, n) {
            return (n.metaKey || n.ctrlKey) && (n.key === "a" || n.key === "A") && !n.shiftKey || ["Meta", "Control", "Alt", "Shift"].includes(n.key) || e.expansionDepth > 0 && !e.isExpanding && ds(e), !1;
          }
        }
      })
    ];
  }
}), bk = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
function vk(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length === 8 && (t = t.slice(0, 6));
  const n = parseInt(t.slice(0, 2), 16) / 255, o = parseInt(t.slice(2, 4), 16) / 255, r = parseInt(t.slice(4, 6), 16) / 255, s = (i) => i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
  return 0.2126 * s(n) + 0.7152 * s(o) + 0.0722 * s(r) > 0.4;
}
const wk = new De("hexColorDecoration");
function nd(e, t, n) {
  const o = [];
  return e.nodesBetween(t, n, (r, s) => {
    if (!r.isText) return;
    const a = r.text || "";
    let i;
    const l = new RegExp(bk.source, "g");
    for (; (i = l.exec(a)) !== null; ) {
      const c = s + i.index, u = c + i[0].length;
      if (u >= t && c <= n) {
        const d = i[0], f = vk(d);
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
function Nk(e) {
  const t = nd(e, 0, e.content.size);
  return Ye.create(e, t);
}
const yk = Tl.create({
  name: "hexColor",
  addProseMirrorPlugins() {
    return [
      new Me({
        key: wk,
        state: {
          init(e, { doc: t }) {
            return Nk(t);
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
              const a = nd(e.doc, s.from, s.to);
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
}), Se = new De("selectAllOccurrences");
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
function St(e, t) {
  const n = Se.getState(e.state);
  if (!n) return [];
  const o = [];
  return n.find().forEach((r) => {
    if (r.from === r.to) return;
    const s = e.state.doc.textBetween(r.from, r.to, "");
    o.push({ from: r.from, to: r.to, text: s });
  }), o;
}
function kk(e, t) {
  for (let n = 0; n < e.length; n++)
    if (e[n].from >= t) return n;
  return 0;
}
function Te(e) {
  e.isActive = !1, e.ranges = [], e.searchTerm = "", e.typedBuffer = "", e.isTypingReplace = !1, e.allMatches = [], e.nextMatchIndex = 0, e.isIncremental = !1, e.undoStack = [], e.redoStack = [];
}
const xk = Oe.create({
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
          const c = kk(l, s), u = l[c];
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
      clearAllOccurrences: () => ({ tr: e, dispatch: t }) => (Te(this.storage), t && t(e.setMeta(Se, { deactivate: !0 })), !0),
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
              const l = St(i, this.storage);
              this.storage.ranges = l, l.length === 0 && Te(this.storage);
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
        return Te(this.storage), !0;
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
              const s = St(r, this.storage);
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
      new Me({
        key: Se,
        state: {
          init() {
            return Ye.empty;
          },
          apply(t, n, o, r) {
            const s = t.getMeta(Se);
            if (s?.deactivate || !e.isActive)
              return Ye.empty;
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
              return Ye.create(r.doc, a);
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
              Te(e);
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
              Te(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Se, { deactivate: !0 })), !0;
            }
            if ((n.metaKey || n.ctrlKey) && n.key === "z" && !n.shiftKey) {
              if (n.preventDefault(), e.isTypingReplace && e.undoStack.length > 0) {
                e.redoStack.push(e.typedBuffer);
                const r = e.undoStack.pop();
                return e.typedBuffer = r, r === "" && (e.isTypingReplace = !1), lf(t.state, t.dispatch), setTimeout(() => {
                  const s = St(t);
                  e.ranges = s, s.length === 0 && Te(e);
                }, 10), !0;
              }
              Te(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Se, { deactivate: !0 })), !1;
            }
            if ((n.metaKey || n.ctrlKey) && (n.key === "z" && n.shiftKey || n.key === "y")) {
              if (n.preventDefault(), e.redoStack.length > 0) {
                e.undoStack.push(e.isTypingReplace ? e.typedBuffer : "");
                const r = e.redoStack.pop();
                return e.typedBuffer = r, e.isTypingReplace = !0, cf(t.state, t.dispatch), setTimeout(() => {
                  const s = St(t);
                  e.ranges = s, s.length === 0 && Te(e);
                }, 10), !0;
              }
              Te(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Se, { deactivate: !0 })), !1;
            }
            if (n.metaKey || n.ctrlKey)
              return !1;
            if (n.key === "Backspace") {
              if (n.preventDefault(), e.isTypingReplace && e.typedBuffer.length > 0) {
                e.undoStack.push(e.typedBuffer), e.typedBuffer = e.typedBuffer.slice(0, -1);
                const o = St(t);
                if (o.length === 0) {
                  Te(e);
                  const { tr: i } = t.state;
                  return t.dispatch(i.setMeta(Se, { deactivate: !0 })), !0;
                }
                const r = e.typedBuffer.length > 0 ? e.typedBuffer : e.searchTerm, s = [...o].sort((i, l) => l.from - i.from), { tr: a } = t.state;
                for (const i of s)
                  a.replaceWith(i.from, i.to, t.state.schema.text(r));
                t.dispatch(a), e.typedBuffer.length === 0 && (e.isTypingReplace = !1), setTimeout(() => {
                  const i = St(t);
                  e.ranges = i, i.length === 0 && Te(e);
                }, 10);
              } else if (!e.isTypingReplace) {
                const o = [...e.ranges].sort((a, i) => i.from - a.from), { tr: r } = t.state;
                for (const a of o)
                  r.delete(a.from, a.to);
                t.dispatch(r), Te(e);
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
              t.dispatch(r), Te(e);
              const { tr: s } = t.state;
              return t.dispatch(s.setMeta(Se, { deactivate: !0 })), !0;
            }
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"].includes(n.key)) {
              Te(e);
              const { tr: o } = t.state;
              return t.dispatch(o.setMeta(Se, { deactivate: !0 })), !1;
            }
            if (n.key === "Enter") {
              Te(e);
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
            const s = St(t);
            if (s.length === 0) {
              Te(e);
              const { tr: l } = t.state;
              return t.dispatch(l.setMeta(Se, { deactivate: !0 })), !0;
            }
            e.undoStack.push(e.isTypingReplace ? e.typedBuffer : ""), e.redoStack = [], e.isTypingReplace ? e.typedBuffer += r : (e.isTypingReplace = !0, e.typedBuffer = r);
            const a = [...s].sort((l, c) => c.from - l.from), { tr: i } = t.state;
            for (const l of a)
              i.replaceWith(l.from, l.to, t.state.schema.text(e.typedBuffer));
            return t.dispatch(i), setTimeout(() => {
              const l = St(t);
              e.ranges = l, l.length === 0 && Te(e);
            }, 10), !0;
          }
        }
      })
    ];
  }
}), Ck = new De("linkBoundary"), Tk = Oe.create({
  name: "linkBoundary",
  addProseMirrorPlugins() {
    return [
      new Me({
        key: Ck,
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
}), Ek = new De("smartCopyPaste"), od = /* @__PURE__ */ new Set(["codeBlock", "callout"]);
function Ga(e) {
  const { state: t } = e, { selection: n } = t, { $from: o, $to: r } = n;
  for (let s = o.depth; s > 0; s--) {
    const a = o.node(s);
    if (!od.has(a.type.name)) continue;
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
const Sk = Oe.create({
  name: "smartCopyPaste",
  addProseMirrorPlugins() {
    const e = this.editor;
    let t = {
      isFullContainer: !1,
      containerType: null
    };
    return [
      new Me({
        key: Ek,
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
            if (!l || !od.has(l.type.name))
              return n;
            if (o === "codeBlock") {
              const c = e.schema, u = c.nodes.paragraph;
              if (!u) {
                const p = l.content;
                return new Yr(p, Math.max(0, a - 1), Math.max(0, i - 1));
              }
              let d = "";
              l.content.forEach((p) => {
                d += p.text || "";
              });
              const f = d.split(`
`);
              f.length > 1 && f[f.length - 1] === "" && f.pop();
              const h = f.map((p) => p === "" ? u.create() : u.create(null, c.text(p))), g = Cl.from(h);
              return new Yr(g, 0, 0);
            } else {
              const c = l.content, u = Math.max(0, a - 1), d = Math.max(0, i - 1);
              return new Yr(c, u, d);
            }
          }
        }
      })
    ];
  }
});
function Mk() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function Dk(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => {
      typeof o.result == "string" ? t(o.result) : n(new Error("Failed to read file"));
    }, o.onerror = () => n(new Error("Failed to read file")), o.readAsDataURL(e);
  });
}
function Ak(e, t) {
  const [n, o] = e.split(","), r = n.match(/:(.*?);/), s = r ? r[1] : "image/jpeg", a = atob(o), i = new Uint8Array(a.length);
  for (let l = 0; l < a.length; l++)
    i[l] = a.charCodeAt(l);
  return new File([i], t, { type: s });
}
function Pk(e, t) {
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
      const d = e.type === "image/png" || e.type === "image/gif", f = d ? "image/png" : "image/jpeg", h = d ? void 0 : n, g = c.toDataURL(f, h), p = Ak(g, e.name);
      o({ dataUrl: g, file: p, width: i, height: l });
    }, s.onerror = () => r(new Error("Failed to load image")), a.readAsDataURL(e);
  });
}
function Lk(e, t, n) {
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
  if (!Pk(e, n.allowedMimeTypes))
    return n.onUploadError?.(`Invalid file type: ${e.type}. Allowed types: ${n.allowedMimeTypes.join(", ")}`), !1;
  if (e.size > n.maxFileSize) {
    const r = (n.maxFileSize / 1048576).toFixed(1), s = (e.size / (1024 * 1024)).toFixed(1);
    return n.onUploadError?.(`File too large: ${s}MB. Maximum size: ${r}MB`), !1;
  }
  const o = Mk();
  try {
    n.onUploadStart?.();
    let r, s, a;
    const i = ["image/jpeg", "image/png", "image/webp"].includes(e.type);
    if (n.enableCompression && i) {
      const h = await Rk(
        e,
        n.maxCompressedWidth,
        n.compressionQuality
      );
      r = h.dataUrl, a = h.file, s = Math.min(h.width, 600);
    } else {
      r = await Dk(e), a = e;
      const h = await Ik(r);
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
              const T = w.tr.setNodeMarkup(b, void 0, {
                ...y.attrs,
                src: h
              });
              v(T);
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
      return console.warn("Image upload failed, removing placeholder:", h), Lk(t, r, e.name), n.onUploadError?.(`Upload failed: ${h instanceof Error ? h.message : "Unknown error"}`), n.onUploadComplete?.(), !1;
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
const Ok = Oe.create({
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
        key: new De("imageUpload"),
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
                je.near(n.state.doc.resolve(l.pos))
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
function _k({
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
  return rt(() => {
    const g = [
      Hm.configure({
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
      mf.configure({ HTMLAttributes: { class: "font-bold" } }).extend({ keepOnSplit: !1 }),
      ff.configure({ HTMLAttributes: { class: "italic" } }).extend({ keepOnSplit: !1 }),
      hf.configure({}).extend({ keepOnSplit: !1 }),
      df.configure({}).extend({ keepOnSplit: !1 }),
      // Mixed list extensions - allow inter-mixing of bullet, ordered, and task list items
      aw,
      lw,
      dw,
      Fm.configure({
        placeholder: e,
        emptyEditorClass: "is-editor-empty"
      }),
      zm.configure({
        types: ["heading", "paragraph"]
      }),
      Um.configure({
        multicolor: !0
      }),
      Ym.configure({
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
      Sk,
      tf,
      nf,
      of,
      // Typography adds ~5 plugins for auto-character conversion (e.g., -- → em dash)
      // Skip in lightweight mode to reduce per-transaction overhead
      ...d ? [] : [rf],
      G0,
      X0,
      // SelectAllOccurrences adds decoration plugins; skip in lightweight mode
      ...d ? [] : [xk],
      Z0,
      tk,
      // Add HorizontalRule with custom input rules that use insertHorizontalRuleClean
      // to avoid the extra empty paragraph that the default command creates.
      // Triggers on: ---, —-, ___, ***  (at start of line)
      uf.extend({
        addInputRules() {
          const p = this.type;
          return [
            new Le({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state: b, range: w }) => {
                const { tr: v } = b, y = w.from, T = w.to;
                v.delete(y, T);
                const N = v.doc.resolve(y), C = p.create(), S = N.before(N.depth), k = N.after(N.depth);
                v.replaceWith(S, k, C);
                const D = S + C.nodeSize;
                if (D < v.doc.content.size) {
                  const x = v.doc.resolve(D);
                  x.nodeAfter && x.nodeAfter.isTextblock ? v.setSelection(je.create(v.doc, D + 1)) : x.nodeAfter && v.setSelection(je.near(v.doc.resolve(D)));
                } else {
                  const M = b.schema.nodes.paragraph.create();
                  v.insert(D, M), v.setSelection(je.create(v.doc, D + 1));
                }
                v.scrollIntoView();
              }
            })
          ];
        }
      })
    ];
    return s.tables || g.push(
      jm.configure({
        resizable: !t,
        // Disable resize on mobile
        HTMLAttributes: {
          class: "editor-table"
        }
      }),
      Vm,
      Qv,
      Jv,
      ...d ? [] : [iw]
    ), s.taskLists || g.push(
      cw.configure({
        HTMLAttributes: {
          class: "task-list"
        }
      }),
      uw.configure({
        nested: !0,
        HTMLAttributes: {
          class: "task-item"
        }
      })
    ), l && !t && !d && g.push(
      hw.configure({
        listItemTypes: ["listItem", "taskItem"]
      })
    ), s.codeBlocks || g.push(vf), s.callouts || g.push(gw, q0), i && !s.collapsibleHeadings && !d && g.push(
      j0.configure({
        levels: r
      })
    ), s.images || g.push(
      bw.configure({
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
      Ok.configure({
        maxFileSize: n,
        onUploadStart: h.onImageUploadStart.current ? ((...p) => h.onImageUploadStart.current(...p)) : void 0,
        onUploadComplete: h.onImageUploadComplete.current ? ((...p) => h.onImageUploadComplete.current(...p)) : void 0,
        onUploadError: h.onImageUploadError.current ? ((...p) => h.onImageUploadError.current(...p)) : void 0,
        onImageUpload: h.onImageUpload.current ? ((p, b) => h.onImageUpload.current(p, b)) : void 0
      })
    ), s.datePills || g.push(
      D0.configure({
        HTMLAttributes: {
          class: "date-pill"
        }
      })
    ), s.tagPills || g.push(
      I0.configure({
        HTMLAttributes: {
          class: "tag-pill"
        },
        enableAutoDetect: c
      })
    ), s.wikiLinks || g.push(
      L0.configure({
        onWikiLinkClick: (p) => {
          console.log("WikiLink clicked:", p), h.onWikiLinkClick.current?.(p);
        },
        validateLink: (p) => h.validateWikiLink.current ? h.validateWikiLink.current(p) : !0
      })
    ), a && g.push(gk), u && !d && g.push(yk), s.markdownPaste || g.push(
      F0.configure({
        enableMarkdownPaste: !0
      })
    ), g;
  }, [e, t, n, o, r, s, a, i, l, c, u, d]);
}
let pt = null, ur = null;
async function rd() {
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
      const T = `![${w.join(" | ")}](${d})`, N = c.parentNode;
      return N && N.nodeName === "LI" ? `
` + T + `
` : `

` + T + `

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
      const T = Array.from(p.childNodes).filter(
        (N) => N.nodeType === Node.ELEMENT_NODE && (N.nodeName === "UL" || N.nodeName === "OL")
      );
      for (const N of T)
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
      return u ? `@${S0(u)}@` : l;
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
  }), pt = n, n;
}
function $k() {
  !ur && !pt && (ur = rd().then((e) => (pt = e, e)));
}
function Bk() {
  return $k(), {
    turndown(e) {
      return pt ? pt.turndown(e) : (console.warn("[Paragon] TurndownService not yet loaded, returning empty markdown"), "");
    },
    isReady() {
      return pt !== null;
    },
    async ready() {
      pt || (ur ? await ur : await rd());
    }
  };
}
function Wk() {
  const e = j(null);
  return e.current || (e.current = Bk()), e.current;
}
const Hk = 2e3;
function Fk(e) {
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
    markdownChangeDebounceMs: f,
    onReady: h,
    onDestroy: g,
    onFocus: p,
    onBlur: b,
    onSelectionChange: w,
    onLinkClick: v,
    editorModeRef: y,
    rawMarkdownRef: T,
    setRawMarkdown: N,
    setIsLightweight: C,
    lightweightCheckCounterRef: S,
    isLightweightRef: k
  } = e, D = n && n.length > Hk, x = j(D ? n : null), M = D ? "" : n, A = j(null), R = j(null), L = j(c), _ = j(u), W = j(d), V = j(f), I = j(null);
  L.current = c, _.current = u, W.current = d, V.current = f;
  const P = Wd({
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
    onCreate: ({ editor: H }) => {
      window.__tiptapEditor = H, h?.(H);
    },
    onDestroy: () => {
      g?.();
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
      handleClick: (H, Y, G) => {
        if (v) {
          const J = G.target.closest("a");
          if (J) {
            const O = J.getAttribute("href");
            if (O && v(O, G) === !1)
              return G.preventDefault(), !0;
          }
        }
        return !1;
      }
    },
    onUpdate: ({ editor: H }) => {
      if (i === "auto" && (S.current++, S.current >= 50)) {
        S.current = 0;
        const G = H.state.doc.content.childCount > l;
        G !== k.current && C(G);
      }
      A.current && clearTimeout(A.current), A.current = setTimeout(() => {
        if (H.isDestroyed) return;
        const Y = H.getHTML();
        (L.current || _.current) && (L.current?.(Y), _.current?.(Y)), V.current > 0 && W.current && (R.current && clearTimeout(R.current), R.current = setTimeout(() => {
          if (!H.isDestroyed && y.current === "wysiwyg" && I.current) {
            const G = H.getHTML(), B = I.current.turndown(G);
            T.current = B, W.current?.(Fn(B));
          }
        }, V.current));
      }, 150);
    },
    onFocus: () => {
      p?.();
    },
    onBlur: () => {
      if (R.current && (clearTimeout(R.current), R.current = null), A.current && (clearTimeout(A.current), A.current = null, P && !P.isDestroyed)) {
        const H = P.getHTML();
        if ((L.current || _.current) && (L.current?.(H), _.current?.(H)), y.current === "wysiwyg" && I.current) {
          const Y = I.current.turndown(H);
          T.current = Y, W.current?.(Fn(Y));
        }
      }
      b?.();
    },
    onSelectionUpdate: ({ editor: H }) => {
      if (w) {
        const { from: Y, to: G, empty: B } = H.state.selection;
        w({ from: Y, to: G, empty: B });
      }
    }
  });
  K(() => {
    if (!x.current || !P || P.isDestroyed) return;
    const H = x.current;
    x.current = null;
    const Y = requestAnimationFrame(() => {
      const G = setTimeout(() => {
        P.isDestroyed || P.commands.setContent(H);
      }, 0);
      P.__deferredTimerId = G;
    });
    return () => {
      cancelAnimationFrame(Y);
      const G = P.__deferredTimerId;
      G && clearTimeout(G);
    };
  }, [P]), K(() => () => {
    if (R.current && (clearTimeout(R.current), R.current = null), A.current && (clearTimeout(A.current), A.current = null, P && !P.isDestroyed)) {
      const H = P.getHTML();
      if ((L.current || _.current) && (L.current?.(H), _.current?.(H)), y.current === "wysiwyg" && I.current) {
        const Y = I.current.turndown(H);
        T.current = Y, W.current?.(Fn(Y));
      }
    }
  }, []);
  const $ = Wk();
  I.current = $;
  const q = j(!1);
  return K(() => {
    if (!q.current && a === "markdown" && P && !P.isDestroyed && $) {
      const H = P.getHTML(), Y = $.turndown(H);
      N(Y), T.current = Y, q.current = !0;
    }
  }, [P, $, a]), { editor: P, turndownService: $ };
}
function zk(e) {
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
            const C = N;
            if (C.tagName === "UL" || C.tagName === "OL" || C.tagName === "P")
              y.push(N);
            else if (C.tagName === "IMG" || C.tagName === "FIGURE")
              if (C.tagName === "IMG") {
                const S = n.createElement("figure");
                S.className = "image-resizer";
                const k = C.getAttribute("data-align") || "left", D = { left: "margin-right: auto;", center: "margin-left: auto; margin-right: auto;", right: "margin-left: auto;" }[k] || "margin-right: auto;";
                S.style.cssText = D, S.appendChild(C.cloneNode(!0)), y.push(S);
              } else
                y.push(N);
            else
              v.push(N);
          } else
            v.push(N);
        });
        const T = y.filter((N) => {
          if (N.nodeType === Node.ELEMENT_NODE) {
            const C = N;
            if (C.tagName === "P" && !C.textContent?.trim() && !C.querySelector("img, figure, code, br"))
              return !1;
          }
          return !0;
        });
        if (f.innerHTML = "", v.length > 0) {
          const N = n.createElement("p");
          v.forEach((C) => N.appendChild(C)), N.firstChild && N.firstChild.nodeType === Node.TEXT_NODE && (N.firstChild.textContent = (N.firstChild.textContent || "").replace(/^\s+/, "")), (N.textContent?.trim() || N.querySelector("img, figure, code, br")) && f.appendChild(N);
        }
        T.forEach((N) => f.appendChild(N));
      }
    }), c && !u && a.setAttribute("data-type", "taskList"));
  };
  return Array.from(o.querySelectorAll(":scope > ul")).forEach(r), o.innerHTML;
}
function Uk(e) {
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
function Yk(e) {
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
                  p.forEach((C) => N.appendChild(C.cloneNode(!0))), N.textContent?.trim() && c.push(N), p.length = 0;
                }
                const w = b, v = n.createElement("figure");
                v.className = "image-resizer";
                const y = w.getAttribute("data-align") || "left", T = {
                  left: "margin-right: auto;",
                  center: "margin-left: auto; margin-right: auto;",
                  right: "margin-left: auto;"
                };
                v.style.cssText = T[y] || "margin-right: auto;", v.appendChild(w.cloneNode(!0)), c.push(v);
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
function jk(e) {
  return e.replace(/(<table>[\s\S]*<\/table>)\s*<!--\s*header-column\s*-->/gi, (t, n) => n.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (o) => o.replace(/<tr>([\s\S]*?)<\/tr>/gi, (r, s) => `<tr>${s.replace(/^([\s\S]*?)<td>([\s\S]*?)<\/td>/i, "$1<th>$2</th>")}</tr>`)));
}
function dr(e) {
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
function Za(e) {
  if (/<img\s/i.test(e)) {
    const t = /(<img\s[^>]*\/?>)/gi;
    return e.split(t).filter((o) => o.trim()).map((o) => /^<img\s/i.test(o) ? Vk(o) : o.trim() ? `<p>${dr(o.trim())}</p>` : "").join("");
  }
  if (/^!\[/.test(e)) {
    const t = e.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (t)
      return `<figure class="image-resizer" style="margin-right: auto;"><img src="${t[2]}" alt="${t[1]}" data-align="left" /></figure>`;
  }
  return `<p>${dr(e)}</p>`;
}
function Kk(e) {
  const t = e.match(/^( *)/), n = t ? t[1].length : 0, o = Math.floor(n / 2), r = e.trimStart(), s = r.match(/^-\s*\[(x| )\]\s*(.*)$/);
  if (s)
    return { type: "task", depth: o, text: s[2].trim(), checked: s[1] === "x" };
  const a = r.match(/^-\s+(.+)$/);
  if (a)
    return { type: "ul", depth: o, text: a[1].trim() };
  const i = r.match(/^(\d+)\.\s+(.+)$/);
  return i ? { type: "ol", depth: o, text: i[2].trim(), index: parseInt(i[1], 10) } : null;
}
function Gk(e) {
  if (e.length === 0) return "";
  const t = (r, s) => {
    let a = "", i = r;
    const l = e[i]?.type || "ul", c = l === "task", u = c ? '<ul data-type="taskList">' : `<${l === "ol" ? "ol" : "ul"}>`, d = c ? "</ul>" : `</${l === "ol" ? "ol" : "ul"}>`;
    for (a += u; i < e.length && e[i].depth >= s; ) {
      const f = e[i];
      if (f.depth === s) {
        if (c ? a += `<li data-type="taskItem" data-checked="${f.checked || !1}"><p>${dr(f.text)}</p>` : a += `<li><p>${dr(f.text)}</p>`, i + 1 < e.length && e[i + 1].depth > s) {
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
function qk(e) {
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
        d.length !== 0 && (u.push(Gk(d)), d = []);
      };
      for (const h of c) {
        const g = Kk(h);
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
function Xk(e, t, n = {}) {
  const {
    enableTagAutoDetect: o = !1,
    disableTagPills: r = !1,
    isValidTag: s,
    normalizeTag: a,
    parseDateFromMarkdown: i,
    getDateVariant: l
  } = n;
  let c = e;
  c = Uk(c);
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
    let T = "", N = "left", C = null;
    y.length === 1 ? T = y[0] : y.length === 2 ? (T = y[0], /^\d+$/.test(y[1]) ? C = y[1] : ["left", "center", "right"].includes(y[1]) ? N = y[1] : T = w) : y.length === 3 ? (T = y[0], ["left", "center", "right"].includes(y[1]) && (N = y[1]), /^\d+$/.test(y[2]) && (C = y[2])) : T = w;
    const S = C ? ` width="${C}" style="width: ${C}px"` : "", k = ` data-align="${N}"`;
    return `<img src="${v.trim()}" alt="${T}"${k}${S} />`;
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
function Zk(e) {
  let t = e;
  return t = t.replace(
    /(?:<p>\s*\u200B\s*<\/p>\s*)*<!--\s*list-break\s*-->(?:\s*<p>\s*\u200B\s*<\/p>)*/g,
    '<p class="list-separator" data-list-separator="true">​</p>'
  ), t = zk(t), t = Yk(t), t = jk(t), t = qk(t), t = t.replace(
    /(<pre[^>]*>\s*<code[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/g,
    (n, o, r, s) => o + r.replace(/\n+$/, "") + s
  ), t;
}
function Qk(e, t, n = {}) {
  const o = Xk(e, t, n), r = t(o);
  return Zk(r);
}
function Jk(e, t, n) {
  K(() => {
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
                  const T = [
                    { type: h, attrs: {} },
                    { type: g, attrs: { checked: f } }
                  ];
                  p.wrap(y, T), e.view.dispatch(p);
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
              r.preventDefault(), Zo(e, c.pos - 3, c.pos);
              return;
            }
            if (u === "—-") {
              r.preventDefault(), Zo(e, c.pos - 2, c.pos);
              return;
            }
            if (u === "—") {
              r.preventDefault(), Zo(e, c.pos - 1, c.pos);
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
function ex({
  editorModeRef: e,
  rawMarkdownRef: t,
  editorMode: n,
  handleModeSwitch: o,
  setIsFindReplaceOpen: r,
  setFindReplaceFocusTrigger: s
}) {
  K(() => {
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
  }, [o]), K(() => {
    window.dispatchEvent(new CustomEvent("paragon-editor-mode-change", { detail: { mode: n } }));
  }, [n]);
}
function tx({
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
  return F(async (u) => {
    if (e) {
      if (u === "markdown" && n.current === "wysiwyg") {
        const d = e.getHTML(), f = t.turndown(d);
        s(f), o.current = f;
      } else if (u === "wysiwyg" && n.current === "markdown") {
        const { marked: d } = await import("./marked.esm-Tjr8Gfse.js"), f = (p) => d.parse(p, { async: !1, breaks: !0 }), h = {
          enableTagAutoDetect: i,
          disableTagPills: !!l.tagPills,
          isValidTag: un,
          normalizeTag: Yn,
          parseDateFromMarkdown: Ft,
          getDateVariant: Ti
        }, g = Qk(o.current, f, h);
        queueMicrotask(() => {
          e.isDestroyed || e.commands.setContent(g);
        });
      }
      r(u), n.current = u, a?.(u);
    }
  }, [e, t, a]);
}
const nx = 200;
function ox(e, t = {}) {
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
  }), i = j(null), l = j(""), c = F((u) => {
    const d = u.trim(), f = d.length > 0 ? d.split(/\s+/).filter((v) => v.length > 0).length : 0, h = d.replace(/\s/g, "").length, g = u.length;
    let p = 0, b = 0;
    o && (p = d.length > 0 ? d.split(/\n\s*\n/).filter((v) => v.trim().length > 0).length : 0, b = d.length > 0 ? (d.match(/[.!?]+/g) || []).length : 0);
    const w = Math.max(1, Math.ceil(f / nx));
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
  return K(() => {
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
function rx({ status: e, lastSaved: t, className: n = "" }) {
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
        e === "idle" && t && /* @__PURE__ */ m(ve, { children: [
          /* @__PURE__ */ m(mm, { className: "w-3.5 h-3.5 text-muted-foreground" }, void 0, !1, {
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
        e === "saving" && /* @__PURE__ */ m(ve, { children: [
          /* @__PURE__ */ m(wl, { className: "w-3.5 h-3.5 text-cyan-500 animate-spin" }, void 0, !1, {
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
        e === "saved" && /* @__PURE__ */ m(ve, { children: [
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
        e === "error" && /* @__PURE__ */ m(ve, { children: [
          /* @__PURE__ */ m(fm, { className: "w-3.5 h-3.5 text-red-500" }, void 0, !1, {
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
function sx({ onRecover: e, onDismiss: t, className: n = "" }) {
  return /* @__PURE__ */ m(
    "div",
    {
      className: `recovery-banner flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${n}`,
      children: [
        /* @__PURE__ */ m("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ m(hm, { className: "w-5 h-5 recovery-banner-icon flex-shrink-0" }, void 0, !1, {
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
                /* @__PURE__ */ m(Zs, { className: "w-4 h-4" }, void 0, !1, {
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
              children: /* @__PURE__ */ m(gt, { className: "w-5 h-5" }, void 0, !1, {
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
function Yo(e) {
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
function Yt(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function jo(e, t, n, o) {
  if (t.length === 0 && (!n || n.length === 0))
    return Yt(e);
  let r = "";
  const s = e.split(`
`);
  let a = 0;
  if (!n || n.length === 0) {
    for (let l = 0; l < s.length; l++) {
      const c = s[l], u = a + c.length, d = t.filter((h) => h.start >= a && h.start < u);
      let f = a;
      for (const h of d)
        h.start > f && (r += Yt(e.substring(f, h.start))), r += `<span class="${Qa(h.type)}">${Yt(h.content)}</span>`, f = h.end;
      f < u && (r += Yt(e.substring(f, u))), l < s.length - 1 && (r += `
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
      h.start > f && (r += ms(e, f, h.start, null, i)), r += ms(e, h.start, h.end, Qa(h.type), i), f = h.end;
    f < u && (r += ms(e, f, u, null, i)), l < s.length - 1 && (r += `
`), a = u + 1;
  }
  return r;
}
function ms(e, t, n, o, r) {
  let s = "", a = t;
  for (; a < n; ) {
    const i = r.get(a);
    if (i) {
      const l = a;
      for (; a < n && r.get(a)?.matchIdx === i.matchIdx; )
        a++;
      const c = Yt(e.substring(l, a)), u = i.isCurrent ? "search-highlight search-highlight-current" : "search-highlight";
      o ? s += `<span class="${o}"><mark class="${u}">${c}</mark></span>` : s += `<mark class="${u}">${c}</mark>`;
    } else {
      const l = a;
      for (; a < n && !r.has(a); )
        a++;
      const c = Yt(e.substring(l, a));
      o ? s += `<span class="${o}">${c}</span>` : s += c;
    }
  }
  return s;
}
function ix({
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
  const c = j(null), u = j(null), d = j(null), f = j(null), h = 5e3, g = 80, [p, b] = U(() => {
    const k = Yo(e);
    return jo(e, k, a, i);
  }), w = j(null), v = rt(() => {
    if (e.length <= h) {
      const k = Yo(e), D = jo(e, k, a, i);
      return w.current && (clearTimeout(w.current), w.current = null), D;
    }
    return null;
  }, [e, a, i]);
  K(() => {
    if (e.length <= h) {
      const k = Yo(e);
      b(jo(e, k, a, i));
      return;
    }
    return w.current && clearTimeout(w.current), w.current = setTimeout(() => {
      const k = Yo(e);
      b(jo(e, k, a, i)), w.current = null;
    }, g), () => {
      w.current && clearTimeout(w.current);
    };
  }, [e, a, i]);
  const y = v ?? p, T = F(() => {
    const k = c.current, D = u.current, x = d.current;
    if (k) {
      const M = x?.parentElement, A = M ? M.clientHeight : 200;
      k.style.height = "auto";
      const R = Math.max(k.scrollHeight, A, 200);
      k.style.height = `${R}px`, D && (D.style.height = `${R}px`);
    }
  }, []);
  K(() => {
    const k = c.current;
    if (!k) return;
    const D = (x) => {
      const M = k.closest(".editor-content-wrapper");
      if (!M) return;
      const { scrollTop: A, scrollHeight: R, clientHeight: L } = M, _ = A <= 0, W = A + L >= R - 1;
      (x.deltaY > 0 && !W || x.deltaY < 0 && !_) && (x.preventDefault(), M.scrollTop += x.deltaY);
    };
    return k.addEventListener("wheel", D, { passive: !1 }), () => k.removeEventListener("wheel", D);
  }, []);
  const N = F(() => {
  }, []);
  K(() => {
    T();
  }, [e, T]), K(() => {
    r && c.current && c.current.focus();
  }, [r]), K(() => {
    if (f.current && c.current) {
      const { start: k, end: D } = f.current;
      c.current.selectionStart = k, c.current.selectionEnd = D, f.current = null;
    }
  }, [e]);
  const C = F((k) => {
    const D = k.target;
    f.current = {
      start: D.selectionStart,
      end: D.selectionEnd
    }, t(D.value);
  }, [t]), S = F((k) => {
    const D = k.currentTarget, x = D.selectionStart, M = D.selectionEnd, A = D.value, R = x !== M;
    if (l) {
      if (k.key === "`" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), R) {
          const L = A.substring(x, M), _ = A.substring(0, x) + "`" + L + "`" + A.substring(M);
          f.current = { start: x + 1, end: M + 1 }, t(_);
        } else if (A[x] === "`")
          f.current = { start: x + 1, end: x + 1 }, t(A), D.selectionStart = D.selectionEnd = x + 1;
        else {
          const L = A.substring(0, x) + "``" + A.substring(M);
          f.current = { start: x + 1, end: x + 1 }, t(L);
        }
        return;
      }
      if (k.key === "*" && !k.ctrlKey && !k.metaKey) {
        if (A[x - 1] === "*" && A[x], R) {
          k.preventDefault();
          const W = A.substring(x, M), V = A.substring(0, x) + "*" + W + "*" + A.substring(M);
          f.current = { start: x + 1, end: M + 1 }, t(V);
          return;
        }
        if (A[x] === "*") {
          k.preventDefault(), f.current = { start: x + 1, end: x + 1 }, t(A.substring(0, x) + A.substring(x));
          return;
        }
        k.preventDefault();
        const _ = A.substring(0, x) + "**" + A.substring(M);
        f.current = { start: x + 1, end: x + 1 }, t(_);
        return;
      }
      if (k.key === "_" && !k.ctrlKey && !k.metaKey) {
        if (R) {
          k.preventDefault();
          const _ = A.substring(x, M), W = A.substring(0, x) + "_" + _ + "_" + A.substring(M);
          f.current = { start: x + 1, end: M + 1 }, t(W);
          return;
        }
        if (A[x] === "_") {
          k.preventDefault(), f.current = { start: x + 1, end: x + 1 }, t(A.substring(0, x) + A.substring(x));
          return;
        }
        k.preventDefault();
        const L = A.substring(0, x) + "__" + A.substring(M);
        f.current = { start: x + 1, end: x + 1 }, t(L);
        return;
      }
      if (k.key === "~" && !k.ctrlKey && !k.metaKey) {
        if (R) {
          k.preventDefault();
          const _ = A.substring(x, M), W = A.substring(0, x) + "~" + _ + "~" + A.substring(M);
          f.current = { start: x + 1, end: M + 1 }, t(W);
          return;
        }
        if (A[x] === "~") {
          k.preventDefault(), f.current = { start: x + 1, end: x + 1 }, t(A.substring(0, x) + A.substring(x));
          return;
        }
        k.preventDefault();
        const L = A.substring(0, x) + "~~" + A.substring(M);
        f.current = { start: x + 1, end: x + 1 }, t(L);
        return;
      }
      if (k.key === "[" && !k.ctrlKey && !k.metaKey) {
        if (k.preventDefault(), R) {
          const L = A.substring(x, M), _ = A.substring(0, x) + "[" + L + "]()" + A.substring(M);
          f.current = { start: M + 3, end: M + 3 }, t(_);
        } else {
          const L = A.substring(0, x) + "[]()" + A.substring(M);
          f.current = { start: x + 1, end: x + 1 }, t(L);
        }
        return;
      }
      if (k.key === "]" && !k.ctrlKey && !k.metaKey && A[x] === "]") {
        k.preventDefault(), f.current = { start: x + 1, end: x + 1 }, t(A.substring(0, x) + A.substring(x));
        return;
      }
      if (k.key === ")" && !k.ctrlKey && !k.metaKey && A[x] === ")") {
        k.preventDefault(), f.current = { start: x + 1, end: x + 1 }, t(A.substring(0, x) + A.substring(x));
        return;
      }
      if (k.key === "Backspace" && !R && x > 0) {
        const L = A[x - 1], _ = A[x], W = [
          ["`", "`"],
          ["*", "*"],
          ["_", "_"],
          ["~", "~"],
          ["[", "]"]
        ];
        for (const [V, I] of W)
          if (L === V && _ === I) {
            k.preventDefault();
            const P = A.substring(0, x - 1) + A.substring(x + 1);
            f.current = { start: x - 1, end: x - 1 }, t(P);
            return;
          }
        if (L === "[" && A.substring(x, x + 3) === "]()") {
          k.preventDefault();
          const V = A.substring(0, x - 1) + A.substring(x + 3);
          f.current = { start: x - 1, end: x - 1 }, t(V);
          return;
        }
      }
    }
    if (k.key === "Tab")
      if (k.preventDefault(), k.shiftKey) {
        const L = A.substring(0, x), _ = A.substring(x, M), W = A.substring(M), I = L.lastIndexOf(`
`) + 1, P = L.substring(0, I), $ = L.substring(I), q = ($ + _).split(`
`), H = q.map((B) => B.startsWith("  ") ? B.substring(2) : B.startsWith("	") ? B.substring(1) : B), Y = P + H.join(`
`) + W, G = ($ + _).length - H.join(`
`).length;
        f.current = {
          start: Math.max(I, x - (q[0].length - H[0].length)),
          end: M - G
        }, t(Y);
      } else if (x === M) {
        const L = A.substring(0, x) + "  " + A.substring(M);
        f.current = { start: x + 2, end: x + 2 }, t(L);
      } else {
        const L = A.substring(0, x), _ = A.substring(x, M), W = A.substring(M), I = L.lastIndexOf(`
`) + 1, P = L.substring(0, I), q = (L.substring(I) + _).split(`
`), H = q.map((G) => "  " + G), Y = P + H.join(`
`) + W;
        f.current = {
          start: x + 2,
          end: M + q.length * 2
        }, t(Y);
      }
  }, [t, l]);
  return /* @__PURE__ */ m("div", { ref: d, className: `syntax-highlighted-editor ${s}`, children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: u,
        className: "syntax-highlight-overlay",
        dangerouslySetInnerHTML: { __html: y || `<span class="md-placeholder">${Yt(n)}</span>` },
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
        onChange: C,
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
let Ja = 0, Ls = 0, sd = 0;
function ax(e) {
  Ls++, sd = e;
}
const lx = Nt(function({
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
  }), l = j([]), c = j(performance.now()), u = j(0), d = j(0), f = j(0), h = j(0), [g, p] = U(new Array(60).fill(0)), [b, w] = U(new Array(60).fill(0));
  K(() => {
    if (!t || !o) return;
    const S = () => {
      const k = performance.now();
      queueMicrotask(() => {
        const D = performance.now() - k;
        ax(D);
      });
    };
    return o.on("transaction", S), () => {
      o.off("transaction", S);
    };
  }, [t, o]), K(() => {
    if (!t) return;
    let S = 0, k = performance.now(), D = 0;
    const x = (M) => {
      const A = M - c.current;
      if (c.current = M, l.current.push({ time: M, duration: A }), l.current.length > 120 && (l.current = l.current.slice(-120)), A > 16.67 && d.current++, S++, M - k >= 1e3) {
        D = S, S = 0, k = M;
        const R = l.current.slice(-60), L = R.length > 0 ? R.reduce((H, Y) => H + Y.duration, 0) / R.length : 0, _ = R.length > 0 ? Math.max(...R.map((H) => H.duration)) : 0, W = performance.memory, V = W ? W.usedJSHeapSize / (1024 * 1024) : 0, I = W ? W.jsHeapSizeLimit / (1024 * 1024) : 0, P = document.querySelectorAll("*").length, $ = Ja - f.current, q = Ls - h.current;
        f.current = Ja, h.current = Ls, i({
          fps: D,
          frameTime: Math.round(L * 100) / 100,
          frameTimeMax: Math.round(_ * 100) / 100,
          memoryUsed: Math.round(V * 10) / 10,
          memoryTotal: Math.round(I),
          renderCount: $,
          transactionCount: q,
          lastTransactionTime: Math.round(sd * 100) / 100,
          domNodes: P,
          longFrames: d.current
        }), p((H) => [...H.slice(1), D]), w((H) => [...H.slice(1), L]), d.current = 0;
      }
      u.current = requestAnimationFrame(x);
    };
    return u.current = requestAnimationFrame(x), () => {
      cancelAnimationFrame(u.current);
    };
  }, [t]);
  const v = F(() => {
    n?.();
  }, [n]), y = F(() => {
    s((S) => !S);
  }, []);
  if (!t) return null;
  const T = (S) => S >= 55 ? "#4ade80" : S >= 30 ? "#fbbf24" : "#f87171", N = (S) => S <= 16.67 ? "#4ade80" : S <= 33.33 ? "#fbbf24" : "#f87171", C = (S, k, D) => {
    const A = S.map((R, L) => {
      const _ = L / (S.length - 1) * 120, W = 24 - Math.min(R, k) / k * 24;
      return `${_},${W}`;
    }).join(" ");
    return /* @__PURE__ */ m("svg", { width: 120, height: 24, className: "perf-sparkline", children: /* @__PURE__ */ m(
      "polyline",
      {
        points: A,
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
        /* @__PURE__ */ m(pm, { size: 14 }, void 0, !1, {
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
        /* @__PURE__ */ m("button", { onClick: y, title: r ? "Expand" : "Minimize", children: r ? /* @__PURE__ */ m(Nl, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 28
        }, this) : /* @__PURE__ */ m(yl, { size: 12 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 246,
          columnNumber: 54
        }, this) }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 245,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ m("button", { onClick: v, title: "Close profiler", children: /* @__PURE__ */ m(gt, { size: 12 }, void 0, !1, {
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
          /* @__PURE__ */ m("span", { className: "perf-value", style: { color: T(a.fps) }, children: a.fps }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
            lineNumber: 260,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/PerformanceProfiler.tsx",
          lineNumber: 258,
          columnNumber: 13
        }, this),
        C(g, 70, T(a.fps))
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
        C(b, 50, N(a.frameTime))
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
class cx extends zd {
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
      return /* @__PURE__ */ m("div", { className: ae("flex-1 flex items-center justify-center p-6", this.props.className), children: /* @__PURE__ */ m("div", { className: "flex flex-col items-center max-w-md w-full text-center gap-4", children: [
        /* @__PURE__ */ m("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ m(gm, { className: "w-6 h-6 text-destructive" }, void 0, !1, {
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
            Dt,
            {
              variant: "default",
              size: "sm",
              className: "w-full gap-2",
              onClick: this.handleRetry,
              children: [
                /* @__PURE__ */ m(Zs, { className: "w-4 h-4" }, void 0, !1, {
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
            Dt,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: this.handleClearContent,
              children: [
                /* @__PURE__ */ m(dn, { className: "w-4 h-4" }, void 0, !1, {
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
              className: ae(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto",
                "cursor-pointer"
              ),
              children: [
                n ? /* @__PURE__ */ m(At, { className: "w-3 h-3" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/EditorErrorBoundary.tsx",
                  lineNumber: 193,
                  columnNumber: 21
                }, this) : /* @__PURE__ */ m(bl, { className: "w-3 h-3" }, void 0, !1, {
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
                  children: r ? /* @__PURE__ */ m(ve, { children: [
                    /* @__PURE__ */ m(bm, { className: "w-3 h-3 text-green-500" }, void 0, !1, {
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
                  }, this) : /* @__PURE__ */ m(ve, { children: [
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
function ux({ className: e = "", theme: t }) {
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
function dx({ editorMode: e, onModeSwitch: t }) {
  return /* @__PURE__ */ m("div", { className: "editor-mode-toggle mr-2 sm:mr-3", children: [
    /* @__PURE__ */ m(
      "button",
      {
        onClick: () => t("wysiwyg"),
        className: `editor-mode-toggle-btn ${e === "wysiwyg" ? "active" : ""}`,
        title: "Visual Editor",
        children: /* @__PURE__ */ m(vm, {}, void 0, !1, {
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
        children: /* @__PURE__ */ m(Qs, {}, void 0, !1, {
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
), fs = () => /* @__PURE__ */ m("div", { className: "w-px h-5 bg-border mx-0.5 flex-shrink-0" }, void 0, !1, {
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
], mx = Nt(function({ editor: t, isH1: n, isH2: o, isH3: r, isH4: s, isH5: a, executeCommand: i }) {
  const [l, c] = U(!1), u = j(null), d = n ? "h1" : o ? "h2" : r ? "h3" : s ? "h4" : a ? "h5" : "paragraph", f = el.find((g) => g.value === d)?.shortLabel || "P";
  K(() => {
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
          /* @__PURE__ */ m(At, { size: 12, strokeWidth: 2.5, className: `flex-shrink-0 transition-transform duration-150 ${l ? "rotate-180" : ""}` }, void 0, !1, {
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
}), fx = Nt(function({ onCopy: t, iconSize: n }) {
  const [o, r] = U(!1), s = j(null);
  K(() => () => {
    s.current && clearTimeout(s.current);
  }, []);
  const a = F((i) => {
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
}), hx = Nt(function({ editor: t, className: n = "", suppressWhenLinkPopoverOpen: o = !1, aiEnabled: r = !1, onAISparklesClick: s, onCopySelectionAsMarkdown: a }) {
  const i = j(null), l = ll({
    editor: t,
    selector: ({ editor: x }) => ({
      isBold: x.isActive("bold"),
      isItalic: x.isActive("italic"),
      isUnderline: x.isActive("underline"),
      isStrike: x.isActive("strike"),
      isCode: x.isActive("code"),
      isHighlight: x.isActive("highlight"),
      isLink: x.isActive("link"),
      isH1: x.isActive("heading", { level: 1 }),
      isH2: x.isActive("heading", { level: 2 }),
      isH3: x.isActive("heading", { level: 3 }),
      isH4: x.isActive("heading", { level: 4 }),
      isH5: x.isActive("heading", { level: 5 }),
      isBulletList: x.isActive("bulletList"),
      isOrderedList: x.isActive("orderedList"),
      isTaskList: x.isActive("taskList"),
      isBlockquote: x.isActive("blockquote"),
      isCodeBlock: x.isActive("codeBlock")
    })
  }), [c, u] = U(!1), [d, f] = U(""), [h, g] = U(!1), [p, b] = U({ top: 0, left: 0 }), w = j(null), v = j(null), y = j(null), T = F(() => {
    if (d) {
      let x = d.trim();
      !/^https?:\/\//i.test(x) && !x.startsWith("mailto:") && (x = "https://" + x), t.chain().focus().extendMarkRange("link").setLink({ href: x }).run();
    } else
      t.chain().focus().extendMarkRange("link").unsetLink().run();
    u(!1), f("");
  }, [t, d]), N = (x) => {
    x.preventDefault(), x.stopPropagation();
    const M = t.getAttributes("link").href;
    f(M || ""), u(!0);
  }, C = F((x, M) => {
    x.preventDefault(), x.stopPropagation(), M();
  }, []);
  K(() => {
    if (!t || t.isDestroyed) return;
    const x = () => {
      if (!t.isDestroyed)
        try {
          const { selection: M } = t.state, { empty: A, from: R, to: L } = M, V = ("node" in M && M.node ? M.node : null)?.type?.name === "resizableImage";
          if (A || V || t.isActive("codeBlock")) {
            y.current && (clearTimeout(y.current), y.current = null), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
              g(!1), u(!1);
            }, 150);
            return;
          }
          v.current && (clearTimeout(v.current), v.current = null);
          const I = t.view.coordsAtPos(R), P = t.view.coordsAtPos(L), $ = w.current?.offsetWidth || 500, q = w.current?.offsetHeight || 40, H = 8, Y = window.innerWidth;
          let G = 0, B = 0;
          if (w.current) {
            const ue = w.current.closest('[data-slot="dialog-content"]');
            if (ue) {
              const we = ue.getBoundingClientRect();
              G = we.left, B = we.top;
            }
          }
          let O = (I.left + P.left) / 2 - $ / 2 - G;
          const ee = G ? Y - G : Y;
          O = Math.max(H, Math.min(ee - $ - H, O));
          let ne = I.top - q - 10 - B;
          ne < H && (ne = P.bottom + 10 - B), h ? b({ top: Math.max(H, ne), left: O }) : (y.current && clearTimeout(y.current), y.current = setTimeout(() => {
            b({ top: Math.max(H, ne), left: O }), g(!0);
          }, 50));
        } catch (M) {
          console.warn("FloatingToolbar: Error updating position", M);
        }
    };
    return t.on("selectionUpdate", x), () => {
      t.off("selectionUpdate", x), v.current && clearTimeout(v.current), y.current && clearTimeout(y.current);
    };
  }, [t, h]), K(() => {
    if (!h || !t || t.isDestroyed) return;
    const x = t.view.dom.closest(".editor-content") || t.view.dom.parentElement;
    if (!x) return;
    const M = () => {
      g(!1), u(!1);
    };
    return x.addEventListener("scroll", M, { passive: !0 }), window.addEventListener("scroll", M, { passive: !0 }), () => {
      x.removeEventListener("scroll", M), window.removeEventListener("scroll", M);
    };
  }, [h, t]);
  const S = (x) => {
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
            onChange: (x) => f(x.target.value),
            onKeyDown: (x) => {
              x.key === "Enter" && (x.preventDefault(), T()), x.key === "Escape" && (u(!1), f(""));
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
              onMouseDown: (x) => {
                x.preventDefault(), T();
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
              onMouseDown: (x) => {
                x.preventDefault(), u(!1), f("");
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
            onMouseDown: (x) => C(x, () => t.chain().focus().toggleBold().run()),
            isActive: l?.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ m(Ws, { size: k }, void 0, !1, {
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
            onMouseDown: (x) => C(x, () => t.chain().focus().toggleItalic().run()),
            isActive: l?.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ m(Hs, { size: k }, void 0, !1, {
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
            onMouseDown: (x) => C(x, () => t.chain().focus().toggleUnderline().run()),
            isActive: l?.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ m(Fs, { size: k }, void 0, !1, {
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
            onMouseDown: (x) => C(x, () => t.chain().focus().toggleStrike().run()),
            isActive: l?.isStrike,
            title: "Strikethrough",
            children: /* @__PURE__ */ m(zs, { size: k }, void 0, !1, {
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
            onMouseDown: (x) => C(x, () => t.chain().focus().toggleCode().run()),
            isActive: l?.isCode,
            title: "Inline Code (Ctrl+E)",
            children: /* @__PURE__ */ m(dl, { size: k }, void 0, !1, {
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
            onMouseDown: (x) => C(x, () => t.chain().focus().toggleHighlight().run()),
            isActive: l?.isHighlight,
            title: "Highlight",
            children: /* @__PURE__ */ m(ml, { size: k }, void 0, !1, {
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
            children: /* @__PURE__ */ m(Us, { size: k }, void 0, !1, {
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
        /* @__PURE__ */ m(fs, {}, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 557,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ m(
          mx,
          {
            editor: t,
            isH1: l?.isH1 ?? !1,
            isH2: l?.isH2 ?? !1,
            isH3: l?.isH3 ?? !1,
            isH4: l?.isH4 ?? !1,
            isH5: l?.isH5 ?? !1,
            executeCommand: C
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
            onMouseDown: (x) => C(x, () => t.chain().focus().toggleBlockquote().run()),
            isActive: l?.isBlockquote,
            title: "Quote",
            children: /* @__PURE__ */ m(Ks, { size: k }, void 0, !1, {
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
            onMouseDown: (x) => C(x, () => t.chain().focus().toggleBulletList().run()),
            isActive: l?.isBulletList,
            title: "Bullet List",
            children: /* @__PURE__ */ m(Ys, { size: k }, void 0, !1, {
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
            onMouseDown: (x) => C(x, () => t.chain().focus().toggleOrderedList().run()),
            isActive: l?.isOrderedList,
            title: "Numbered List",
            children: /* @__PURE__ */ m(js, { size: k }, void 0, !1, {
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
            onMouseDown: (x) => C(x, () => t.chain().focus().toggleTaskList().run()),
            isActive: l?.isTaskList,
            title: "Task List",
            children: /* @__PURE__ */ m(Vs, { size: k }, void 0, !1, {
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
            onMouseDown: (x) => C(x, () => Js(t)),
            isActive: l?.isCodeBlock,
            title: "Code Block",
            children: /* @__PURE__ */ m(wm, { size: k }, void 0, !1, {
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
        a && /* @__PURE__ */ m(ve, { children: [
          /* @__PURE__ */ m(fs, {}, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 608,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(fx, { onCopy: a, iconSize: k }, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 609,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
          lineNumber: 607,
          columnNumber: 9
        }, this),
        r && /* @__PURE__ */ m(ve, { children: [
          /* @__PURE__ */ m(fs, {}, void 0, !1, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
            lineNumber: 616,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ m(
            "button",
            {
              ref: i,
              onMouseDown: (x) => {
                x.preventDefault(), x.stopPropagation(), i.current && s?.(i.current);
              },
              title: "AI Writing Assistant",
              className: `
              flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0
              transition-all duration-100 ease-out touch-manipulation
              bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80
              hover:text-foreground
            `,
              children: /* @__PURE__ */ m(pr, { size: k }, void 0, !1, {
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
  return /* @__PURE__ */ m(yt, { onMouseDown: S, children: D }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/FloatingToolbar.tsx",
    lineNumber: 642,
    columnNumber: 5
  }, this);
});
function px({ editor: e, isOpen: t, onClose: n }) {
  const [o, r] = U(""), s = j(null), a = j(null), [i, l] = U({ top: 0, left: 0 });
  K(() => {
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
  }, [t, e]), K(() => {
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
  const c = F((g) => {
    if (g?.preventDefault(), o.trim()) {
      let p = o.trim();
      !/^https?:\/\//i.test(p) && !p.startsWith("mailto:") && (p = "https://" + p), e.chain().focus().extendMarkRange("link").setLink({ href: p }).run();
    } else
      e.chain().focus().unsetLink().run();
    n();
  }, [o, e, n]), u = F((g) => {
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
          /* @__PURE__ */ m(Bs, { className: "link-popover-icon", size: 16 }, void 0, !1, {
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
  return /* @__PURE__ */ m(yt, { children: h }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkPopover.tsx",
    lineNumber: 161,
    columnNumber: 10
  }, this);
}
function gx() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
function bx({ editor: e, onEditLink: t }) {
  const [n, o] = U({
    isVisible: !1,
    url: "",
    position: { top: 0, left: 0 },
    linkElement: null
  }), r = j(null), s = j(null), a = j(null), i = F((N) => {
    if (!(!e || e.isDestroyed)) {
      s.current && (clearTimeout(s.current), s.current = null);
      try {
        const C = N.getAttribute("href") || "", S = N.getBoundingClientRect(), k = S.bottom + 8, D = Math.max(16, Math.min(S.left, window.innerWidth - 340));
        a.current = N, o({
          isVisible: !0,
          url: C,
          position: { top: k, left: D },
          linkElement: N
        });
      } catch (C) {
        console.warn("LinkHoverTooltip: Error showing tooltip", C);
      }
    }
  }, [e]), l = F(() => {
    s.current = setTimeout(() => {
      a.current = null, o((N) => ({ ...N, isVisible: !1, linkElement: null }));
    }, 150);
  }, []), c = F(() => {
    s.current && (clearTimeout(s.current), s.current = null), a.current = null, o((N) => ({ ...N, isVisible: !1, linkElement: null }));
  }, []), u = F(() => {
    s.current && (clearTimeout(s.current), s.current = null);
  }, []);
  K(() => {
    if (!e || e.isDestroyed) return;
    const N = e.view.dom;
    if (!N) return;
    const C = (k) => {
      const x = k.target.closest("a");
      x && N.contains(x) && i(x);
    }, S = (k) => {
      const D = k.target, x = k.relatedTarget;
      if (D.closest("a")) {
        if (x && r.current?.contains(x))
          return;
        l();
      }
    };
    return N.addEventListener("mouseover", C), N.addEventListener("mouseout", S), () => {
      N.removeEventListener("mouseover", C), N.removeEventListener("mouseout", S), s.current && clearTimeout(s.current);
    };
  }, [e, i, l]), K(() => {
    if (!e || e.isDestroyed) return;
    const N = e.view.dom;
    if (!N) return;
    const C = (S) => {
      const D = S.target.closest("a");
      if (D && N.contains(D)) {
        if (a.current === D && n.isVisible)
          return;
        S.preventDefault(), S.stopPropagation(), i(D);
      }
    };
    return N.addEventListener("touchend", C, { capture: !0 }), () => {
      N.removeEventListener("touchend", C, { capture: !0 });
    };
  }, [e, i, n.isVisible]), K(() => {
    if (!n.isVisible || !gx()) return;
    const N = (S) => {
      const k = S.target;
      r.current?.contains(k) || a.current && a.current.contains(k) || c();
    }, C = setTimeout(() => {
      document.addEventListener("touchstart", N, { passive: !0 });
    }, 100);
    return () => {
      clearTimeout(C), document.removeEventListener("touchstart", N);
    };
  }, [n.isVisible, c]), K(() => {
    if (!n.isVisible) return;
    const N = () => {
      c();
    }, C = e.view.dom.closest(".editor-content-wrapper");
    return C?.addEventListener("scroll", N), window.addEventListener("scroll", N, !0), () => {
      C?.removeEventListener("scroll", N), window.removeEventListener("scroll", N, !0);
    };
  }, [n.isVisible, e, c]);
  const [d, f] = U(!1), h = F(() => {
    n.url && navigator.clipboard.writeText(n.url).then(() => {
      f(!0), setTimeout(() => f(!1), 1500);
    });
  }, [n.url]), g = F(() => {
    n.url && window.open(n.url, "_blank", "noopener,noreferrer");
  }, [n.url]), p = F(() => {
    if (n.linkElement) {
      const { view: N } = e, { doc: C } = N.state;
      let S = null, k = null;
      C.descendants((D, x) => {
        if (D.isText && D.marks.some((M) => M.type.name === "link")) {
          const M = N.nodeDOM(x);
          if (M && (M === n.linkElement || M.parentElement === n.linkElement))
            return S = x, k = x + D.nodeSize, !1;
        }
        return !0;
      }), S !== null && k !== null ? e.chain().focus().setTextSelection({ from: S, to: k }).unsetLink().run() : e.chain().focus().unsetLink().run();
    }
    o((N) => ({ ...N, isVisible: !1 }));
  }, [e, n.linkElement]), b = F(() => {
    if (n.linkElement) {
      const { view: N } = e, { doc: C } = N.state;
      C.descendants((S, k) => {
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
  const w = n.url.length > 40 ? n.url.substring(0, 40) + "..." : n.url, y = (e.view.dom.closest(".markdown-editor-container") || e.view.dom.closest("[data-theme]"))?.getAttribute("data-theme") || "", T = /* @__PURE__ */ m(
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
              /* @__PURE__ */ m(Nm, { size: 13, className: "link-hover-tooltip-link-icon" }, void 0, !1, {
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
              children: /* @__PURE__ */ m(ym, { size: 14 }, void 0, !1, {
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
              children: /* @__PURE__ */ m(km, { size: 14 }, void 0, !1, {
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
  return /* @__PURE__ */ m(yt, { children: T }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/LinkHoverTooltip.tsx",
    lineNumber: 369,
    columnNumber: 10
  }, this);
}
const vx = [
  {
    title: "Paragraph",
    icon: /* @__PURE__ */ m(hr, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 64,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setParagraph().run(),
    keywords: ["text", "normal", "p"]
  },
  {
    title: "Heading 1",
    icon: /* @__PURE__ */ m(xm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 70,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    keywords: ["h1", "title", "large"]
  },
  {
    title: "Heading 2",
    icon: /* @__PURE__ */ m(Cm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 76,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    keywords: ["h2", "subtitle"]
  },
  {
    title: "Heading 3",
    icon: /* @__PURE__ */ m(Tm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 82,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    keywords: ["h3", "subheading"]
  },
  {
    title: "Heading 4",
    icon: /* @__PURE__ */ m(Em, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 88,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    keywords: ["h4", "small heading"]
  },
  {
    title: "Heading 5",
    icon: /* @__PURE__ */ m(Sm, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 94,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
    keywords: ["h5", "minor heading"]
  },
  {
    title: "Bullet List",
    icon: /* @__PURE__ */ m(Ys, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 100,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBulletList().run(),
    keywords: ["ul", "unordered", "bullets"]
  },
  {
    title: "Numbered List",
    icon: /* @__PURE__ */ m(js, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 106,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleOrderedList().run(),
    keywords: ["ol", "ordered", "numbers"]
  },
  {
    title: "Task List",
    icon: /* @__PURE__ */ m(Vs, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 112,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleTaskList().run(),
    keywords: ["todo", "checkbox", "tasks"]
  },
  {
    title: "Quote",
    icon: /* @__PURE__ */ m(Ks, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 118,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleBlockquote().run(),
    keywords: ["blockquote", "citation"]
  },
  {
    title: "Code Block",
    icon: /* @__PURE__ */ m(fl, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 124,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCodeBlock().run(),
    keywords: ["code", "pre", "syntax"]
  },
  {
    title: "Table",
    icon: /* @__PURE__ */ m(hs, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 130,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: !0 }).run(),
    keywords: ["grid", "spreadsheet"]
  },
  {
    title: "Image",
    icon: /* @__PURE__ */ m($s, { size: 16 }, void 0, !1, {
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
    icon: /* @__PURE__ */ m(hl, { size: 16 }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 143,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().setHorizontalRule().run(),
    keywords: ["hr", "separator", "line"]
  },
  {
    title: "Info Callout",
    icon: /* @__PURE__ */ m(Jo, { size: 16, className: "text-blue-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 149,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "info" }).run(),
    keywords: ["note", "tip", "information"]
  },
  {
    title: "Note Callout",
    icon: /* @__PURE__ */ m(gl, { size: 16, className: "text-purple-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 155,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "note" }).run(),
    keywords: ["memo", "remember"]
  },
  {
    title: "Prompt Callout",
    icon: /* @__PURE__ */ m(pl, { size: 16, className: "text-amber-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 161,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "prompt" }).run(),
    keywords: ["question", "ask", "prompt"]
  },
  {
    title: "Resources Callout",
    icon: /* @__PURE__ */ m(Gs, { size: 16, className: "text-green-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 167,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "resources" }).run(),
    keywords: ["links", "reference", "reading"]
  },
  {
    title: "To-Do Callout",
    icon: /* @__PURE__ */ m(qs, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 173,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().toggleCallout({ type: "todo" }).run(),
    keywords: ["task", "action", "checklist"]
  },
  {
    title: "Date",
    icon: /* @__PURE__ */ m(vl, { size: 16, className: "text-cyan-400" }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/SlashCommands.tsx",
      lineNumber: 179,
      columnNumber: 11
    }, void 0),
    command: (e) => e.chain().focus().insertDatePill().run(),
    keywords: ["date", "today", "calendar", "time", "schedule"]
  },
  {
    title: "Wiki Link",
    icon: /* @__PURE__ */ m(Bs, { size: 16, className: "text-cyan-400" }, void 0, !1, {
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
], wx = 32, Nx = 8, yx = 320, kx = 210, Vo = 12;
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
function xx({ editor: e }) {
  const [t, n] = U(!1), [o, r] = U(""), [s, a] = U(0), [i, l] = U(null), [c, u] = U(!1), [d, f] = U({ top: 0, left: 0 }), [h, g] = U("below"), p = j(null), b = j(-1), w = j(!1);
  K(() => {
    w.current = t;
  }, [t]);
  const v = vx.filter((D) => {
    if (!o) return !0;
    const x = o.toLowerCase();
    return D.title.toLowerCase().includes(x) || D.keywords?.some((M) => M.includes(x));
  }), y = Math.min(
    v.length * wx + Nx,
    yx
  );
  fr(() => {
    if (!t || !i) return;
    const { top: D, bottom: x, left: M } = i, A = window.innerHeight, R = window.innerWidth, L = A - x - Vo, _ = D - Vo;
    let W;
    if (L >= y ? W = "below" : _ >= y ? W = "above" : W = L >= _ ? "below" : "above", g(W), p.current) {
      const V = Math.max(
        Vo,
        Math.min(M, R - kx - Vo)
      ), I = W === "below" ? x + 4 : D - y - 4;
      p.current.style.top = `${I}px`, p.current.style.left = `${V}px`;
    }
  }, [t, i, y, v.length]);
  const T = F(() => {
    const { state: D } = e, { selection: x } = D, M = x.from, A = b.current;
    if (A >= 0 && A <= M)
      e.chain().focus().deleteRange({ from: A, to: M }).run();
    else {
      const { $from: R } = x, _ = R.parent.textBetween(0, R.parentOffset, void 0, "￼").lastIndexOf("/");
      if (_ !== -1) {
        const W = R.pos - (R.parentOffset - _);
        e.chain().focus().deleteRange({ from: W, to: R.pos }).run();
      }
    }
  }, [e]), N = F(() => {
    n(!1), r(""), a(0), b.current = -1, l(null);
  }, []), C = F((D) => {
    const x = v[D];
    if (x) {
      if (T(), x.isImageCommand) {
        const { state: M } = e, A = e.view.coordsAtPos(M.selection.from);
        f({
          top: A.bottom + 8,
          left: A.left
        }), u(!0);
      } else
        x.command(e);
      N();
    }
  }, [e, v, T, N]), S = F((D, x) => {
    e.chain().focus().setImage({ src: D, alt: x }).run();
  }, [e]);
  return K(() => {
    if (!e) return;
    const D = () => {
      if (w.current) return;
      const { state: x } = e, { selection: M } = x, { $from: A } = M;
      if (A.parentOffset === 0) return;
      const R = A.parent.textBetween(0, A.parentOffset, void 0, "￼");
      if (!R.endsWith("/")) return;
      const L = R.length > 1 ? R.slice(-2, -1) : "";
      if (L && L !== " " && L !== `
`) return;
      b.current = A.pos - 1;
      const _ = tl(e);
      _ && (l(_), n(!0), r(""), a(0));
    };
    return e.on("update", D), () => {
      e.off("update", D);
    };
  }, [e]), K(() => {
    if (!e || !t) return;
    const D = e.view.dom, x = (M) => {
      w.current && (M.key === "ArrowDown" ? (M.preventDefault(), M.stopPropagation(), a((A) => (A + 1) % v.length)) : M.key === "ArrowUp" ? (M.preventDefault(), M.stopPropagation(), a((A) => (A - 1 + v.length) % v.length)) : M.key === "Enter" ? (M.preventDefault(), M.stopPropagation(), C(s)) : M.key === "Escape" && (M.preventDefault(), M.stopPropagation(), N()));
    };
    return D.addEventListener("keydown", x, !0), () => {
      D.removeEventListener("keydown", x, !0);
    };
  }, [e, t, s, v, C, N]), K(() => {
    if (!e || !t) return;
    const D = () => {
      if (!w.current || b.current < 0) return;
      const { state: x } = e, { selection: M } = x, A = M.from, R = b.current;
      if (A <= R) {
        N();
        return;
      }
      try {
        const L = x.doc.textBetween(R + 1, A, void 0, "￼");
        if (L.includes(`
`)) {
          N();
          return;
        }
        r(L), a(0);
        const _ = tl(e);
        _ && l(_);
      } catch {
        N();
      }
    };
    return e.on("update", D), e.on("selectionUpdate", D), () => {
      e.off("update", D), e.off("selectionUpdate", D);
    };
  }, [e, t, N]), K(() => {
    if (!t) return;
    const D = (x) => {
      p.current && !p.current.contains(x.target) && N();
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, [t, N]), K(() => {
    t && v.length === 0 && o.length > 2 && N();
  }, [t, v.length, o, N]), K(() => {
    s >= v.length && a(Math.max(0, v.length - 1));
  }, [v.length, s]), K(() => {
    if (!t || !p.current) return;
    const D = p.current.querySelector(".slash-item.is-selected");
    D && D.scrollIntoView({ block: "nearest" });
  }, [t, s]), c ? /* @__PURE__ */ m(
    Dl,
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
  ) : !t || v.length === 0 ? null : /* @__PURE__ */ m(yt, { children: /* @__PURE__ */ m(
    "div",
    {
      ref: p,
      className: `slash-menu ${h === "below" ? "slash-menu-below" : "slash-menu-above"}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0
      },
      children: v.map((D, x) => /* @__PURE__ */ m(
        "div",
        {
          className: `slash-item ${x === s ? "is-selected" : ""}`,
          onClick: (M) => {
            M.preventDefault(), M.stopPropagation(), C(x);
          },
          onMouseEnter: () => a(x),
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
const Cx = 340, Tx = 36, Ex = 8, Sx = 240, Ko = 8;
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
function Mx({ editor: e, onSearch: t, onCreateItem: n }) {
  const [o, r] = U(!1), [s, a] = U(""), [i, l] = U([]), [c, u] = U(0), [d, f] = U(null), [h, g] = U("below"), [p, b] = U(!1), w = j(!1), v = j(null), y = j(-1), T = j(null);
  K(() => {
    w.current = o;
  }, [o]);
  const N = F(() => {
    r(!1), a(""), l([]), u(0), y.current = -1;
  }, []), C = F((M) => {
    const A = y.current;
    if (A < 0) return;
    const { state: R } = e, L = R.selection.from;
    try {
      const _ = R.tr.delete(A, L), W = R.schema.marks.wikiLink;
      if (W) {
        const V = W.create({ pageName: M }), I = R.schema.text(M, [V]);
        _.insert(A, I);
        const P = A + M.length;
        _.setSelection(je.create(_.doc, P)), _.removeStoredMark(W);
      } else
        _.insertText(`[[${M}]]`, A);
      e.view.dispatch(_), e.view.focus();
    } catch (_) {
      console.warn("WikiLinkAutocomplete: Error inserting link", _);
    }
    N();
  }, [e, N]);
  K(() => {
    if (!e) return;
    const M = () => {
      if (w.current) return;
      const { state: A } = e, { selection: R } = A, { $from: L } = R;
      if (L.parentOffset < 2 || !L.parent.textBetween(0, L.parentOffset, void 0, "￼").endsWith("[[")) return;
      y.current = L.pos - 2;
      const W = nl(e);
      W && (f(W), r(!0), a(""), l([]), u(0));
    };
    return e.on("update", M), () => {
      e.off("update", M);
    };
  }, [e]), K(() => {
    if (!e || !o) return;
    const M = e.view.dom, A = (R) => {
      if (w.current) {
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
          R.preventDefault(), R.stopPropagation(), c < i.length ? C(i[c].title) : s.trim() && n ? (n(s.trim()), N()) : s.trim() && C(s.trim());
          return;
        }
        if (R.key === "Escape") {
          R.preventDefault(), N();
          return;
        }
        R.key === "]" && setTimeout(() => {
          const { state: L } = e, { $from: _ } = L.selection;
          _.parent.textBetween(0, _.parentOffset, void 0, "￼").endsWith("]]") && N();
        }, 0);
      }
    };
    return M.addEventListener("keydown", A, !0), () => {
      M.removeEventListener("keydown", A, !0);
    };
  }, [e, o, i, c, s, C, N, n]), K(() => {
    if (!e || !o) return;
    const M = () => {
      const A = y.current;
      if (A < 0) {
        N();
        return;
      }
      const { state: R } = e, L = R.selection.from;
      if (L <= A) {
        N();
        return;
      }
      try {
        const _ = R.doc.textBetween(A + 2, L, void 0, "￼");
        if (_.includes(`
`) || _.includes("]]")) {
          N();
          return;
        }
        a(_), u(0);
        const W = nl(e);
        W && f(W);
      } catch {
        N();
      }
    };
    return e.on("update", M), e.on("selectionUpdate", M), () => {
      e.off("update", M), e.off("selectionUpdate", M);
    };
  }, [e, o, N]), K(() => {
    if (o) {
      if (T.current && clearTimeout(T.current), !s.trim()) {
        b(!0), T.current = setTimeout(async () => {
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
      return b(!0), T.current = setTimeout(async () => {
        try {
          const M = await t(s.trim());
          l(M);
        } catch {
          l([]);
        }
        b(!1);
      }, 150), () => {
        T.current && clearTimeout(T.current);
      };
    }
  }, [o, s, t]), K(() => {
    if (!o) return;
    const M = (A) => {
      v.current && !v.current.contains(A.target) && N();
    };
    return document.addEventListener("mousedown", M), () => document.removeEventListener("mousedown", M);
  }, [o, N]), K(() => {
    if (!o || !v.current) return;
    const M = v.current.querySelector(".wikilink-item.is-selected");
    M && M.scrollIntoView({ block: "nearest" });
  }, [o, c]);
  const S = i.length + (s.trim() ? 1 : 0), k = Math.min(
    Math.max(S, 1) * Tx + Ex,
    Sx
  );
  if (fr(() => {
    if (!o || !d) return;
    const { top: M, bottom: A, left: R } = d, L = window.innerHeight, _ = window.innerWidth, W = L - A - Ko, V = M - Ko;
    let I;
    if (W >= k ? I = "below" : V >= k ? I = "above" : I = W >= V ? "below" : "above", g(I), v.current) {
      const P = Math.max(
        Ko,
        Math.min(R, _ - Cx - Ko)
      ), $ = I === "below" ? A + 4 : M - k - 4;
      v.current.style.top = `${$}px`, v.current.style.left = `${P}px`;
    }
  }, [o, d, k, S]), !o) return null;
  const D = s.trim() && !i.some((M) => M.title.toLowerCase() === s.trim().toLowerCase());
  return /* @__PURE__ */ m(yt, { children: /* @__PURE__ */ m(
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
        i.map((M, A) => /* @__PURE__ */ m(
          "div",
          {
            className: `wikilink-item ${A === c ? "is-selected" : ""}`,
            onMouseDown: (R) => {
              R.preventDefault(), C(M.title);
            },
            onMouseEnter: () => u(A),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Qs, { size: 14 }, void 0, !1, {
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
              M.preventDefault(), n ? (n(s.trim()), N()) : C(s.trim());
            },
            onMouseEnter: () => u(i.length),
            children: [
              /* @__PURE__ */ m("span", { className: "wikilink-icon", children: /* @__PURE__ */ m(Xs, { size: 14 }, void 0, !1, {
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
function Dx({
  src: e,
  alt: t,
  position: n,
  onSave: o,
  onDelete: r,
  onClose: s
}) {
  const [a, i] = U(e), [l, c] = U(t), u = j(null), d = j(null);
  K(() => {
    d.current?.focus(), d.current?.select();
  }, []), K(() => {
    const b = (v) => {
      u.current && !u.current.contains(v.target) && s();
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 100);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", b);
    };
  }, [s]), K(() => {
    const b = (w) => {
      w.key === "Escape" ? s() : w.key === "Enter" && (w.metaKey || w.ctrlKey) && f();
    };
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, [a, l, s]);
  const f = () => {
    a.trim() && o(a.trim(), l.trim());
  }, g = (() => {
    let y = n.x - 160, T = n.y + 10;
    return y + 320 > window.innerWidth - 16 && (y = window.innerWidth - 320 - 16), y < 16 && (y = 16), T + 280 > window.innerHeight - 16 && (T = n.y - 280 - 10), T < 16 && (T = 16), { left: y, top: T };
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
              children: /* @__PURE__ */ m(gt, { className: "w-4 h-4" }, void 0, !1, {
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
              /* @__PURE__ */ m(Us, { className: "w-3.5 h-3.5" }, void 0, !1, {
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
              /* @__PURE__ */ m(hr, { className: "w-3.5 h-3.5" }, void 0, !1, {
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
              children: /* @__PURE__ */ m(dn, { className: "w-4 h-4" }, void 0, !1, {
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
  return /* @__PURE__ */ m(yt, { children: p }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ImageEditPopover.tsx",
    lineNumber: 213,
    columnNumber: 10
  }, this);
}
function Ax({ containerRef: e, enabled: t = !0 }) {
  const [n, o] = U(!1), [r, s] = U(0), a = F((u) => {
    u.preventDefault(), u.stopPropagation(), u.dataTransfer?.types.includes("Files") && (s((d) => d + 1), o(!0));
  }, []), i = F((u) => {
    u.preventDefault(), u.stopPropagation(), s((d) => {
      const f = d - 1;
      return f === 0 && o(!1), f;
    });
  }, []), l = F((u) => {
    u.preventDefault(), u.stopPropagation();
  }, []), c = F((u) => {
    u.preventDefault(), u.stopPropagation(), o(!1), s(0);
  }, []);
  return K(() => {
    if (!t || !e.current) return;
    const u = e.current;
    return u.addEventListener("dragenter", a), u.addEventListener("dragleave", i), u.addEventListener("dragover", l), u.addEventListener("drop", c), () => {
      u.removeEventListener("dragenter", a), u.removeEventListener("dragleave", i), u.removeEventListener("dragover", l), u.removeEventListener("drop", c);
    };
  }, [t, e, a, i, l, c]), n ? /* @__PURE__ */ m("div", { className: "image-drop-zone", children: /* @__PURE__ */ m("div", { className: "image-drop-zone-content", children: [
    /* @__PURE__ */ m("div", { className: "image-drop-zone-icon", children: /* @__PURE__ */ m(Mm, { className: "w-12 h-12" }, void 0, !1, {
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
const Px = {
  SpellCheck: Am,
  RefreshCw: Dm,
  Minimize2: yl,
  Maximize2: Nl,
  FileText: Qs,
  MessageSquare: kl,
  Sparkles: pr
};
function Ix({ actions: e, scope: t, onAction: n, onClose: o, position: r }) {
  const [s, a] = U(""), [i, l] = U(!1), c = j(null), u = j(null), d = e.filter((b) => b.scope === t || b.scope === "both");
  K(() => {
    const b = (v) => {
      c.current && !c.current.contains(v.target) && o();
    }, w = setTimeout(() => {
      document.addEventListener("mousedown", b);
    }, 50);
    return () => {
      clearTimeout(w), document.removeEventListener("mousedown", b);
    };
  }, [o]), K(() => {
    const b = (w) => {
      w.key === "Escape" && o();
    };
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, [o]), K(() => {
    i && u.current && u.current.focus();
  }, [i]);
  const h = F(() => {
    const w = d.length * 40 + (i ? 56 : 0) + 16, v = window.innerWidth, y = window.innerHeight;
    let T = r.top, N = r.left;
    return N + 260 > v - 8 && (N = v - 260 - 8), N < 8 && (N = 8), T + w > y - 8 && (T = r.top - w - 8), T < 8 && (T = 8), { top: T, left: N };
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
              /* @__PURE__ */ m(kl, { size: 14, className: "text-muted-foreground shrink-0" }, void 0, !1, {
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
              const w = b.icon ? Px[b.icon] : pr;
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
  return /* @__PURE__ */ m(yt, { onMouseDown: (b) => b.preventDefault(), children: p }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIDropdownMenu.tsx",
    lineNumber: 197,
    columnNumber: 5
  }, this);
}
function Rx({
  state: e,
  position: t,
  onReplace: n,
  onInsert: o,
  onRetry: r,
  onDiscard: s
}) {
  const a = j(null), i = j(null), [l, c] = U(!1), [u, d] = U(0);
  K(() => {
    if (a.current) {
      const N = new ResizeObserver((C) => {
        for (const S of C)
          d(S.contentRect.height);
      });
      return N.observe(a.current), () => N.disconnect();
    }
  }, []), K(() => {
    i.current && e.status === "streaming" && (i.current.scrollTop = i.current.scrollHeight);
  }, [e.status === "streaming" ? e.result : ""]), K(() => {
    const N = (C) => {
      C.key === "Escape" && s();
    };
    return document.addEventListener("keydown", N), () => document.removeEventListener("keydown", N);
  }, [s]);
  const f = rt(() => {
    const k = window.innerWidth, D = window.innerHeight;
    let x = t.selectionCenterX - 380 / 2;
    x + 380 > k - 8 && (x = k - 380 - 8), x < 8 && (x = 8);
    const M = D - t.selectionBottom - 8, A = t.selectionTop - 8, R = u || 200;
    let L, _ = !1;
    return M >= R || M >= A ? L = t.selectionBottom + 8 : (L = t.selectionTop - 8 - R, _ = !0), L < 8 && (L = 8), L + R > D - 8 && (L = D - R - 8), { top: L, left: x, placedAbove: _ };
  }, [t, u]), h = e.status === "streaming" || e.status === "complete" ? e.result : "", g = e.status === "streaming" || e.status === "complete" ? e.actionLabel : "", p = e.status === "streaming", b = e.status === "complete", w = e.status === "error", v = F(() => {
    navigator.clipboard.writeText(h), c(!0), setTimeout(() => c(!1), 1500);
  }, [h]);
  if (e.status === "idle") return null;
  const y = f.placedAbove ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-150" : "animate-in fade-in-0 slide-in-from-top-2 duration-150", T = /* @__PURE__ */ m(
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
                p && /* @__PURE__ */ m(wl, { size: 12, className: "animate-spin" }, void 0, !1, {
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
                  children: /* @__PURE__ */ m(gt, { size: 14, className: "text-muted-foreground" }, void 0, !1, {
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
              (b || w) && /* @__PURE__ */ m(ve, { children: [
                b && /* @__PURE__ */ m(ve, { children: [
                  /* @__PURE__ */ m(
                    cn,
                    {
                      icon: ps,
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
                    cn,
                    {
                      icon: Xs,
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
                    cn,
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
                  cn,
                  {
                    icon: Zs,
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
                  cn,
                  {
                    icon: gt,
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
              p && /* @__PURE__ */ m(ve, { children: [
                /* @__PURE__ */ m("div", { className: "flex-1" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
                  lineNumber: 246,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ m(
                  cn,
                  {
                    icon: gt,
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
  return /* @__PURE__ */ m(yt, { onMouseDown: (N) => N.preventDefault(), children: T }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ai/AIResultPopover.tsx",
    lineNumber: 260,
    columnNumber: 5
  }, this);
}
function cn({
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
function Lx({
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
  onAIDiscard: T,
  onLinkPopoverClose: N,
  onEditLink: C,
  onWikiLinkSearch: S,
  imageEditState: k,
  onImageSave: D,
  onImageDelete: x,
  onImageEditClose: M
}) {
  return /* @__PURE__ */ m(ve, { children: [
    !n.images && !n.dragAndDrop && /* @__PURE__ */ m(Ax, { containerRef: o, enabled: r }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 114,
      columnNumber: 9
    }, this),
    !t && s && /* @__PURE__ */ m(
      hx,
      {
        editor: e,
        suppressWhenLinkPopoverOpen: a,
        aiEnabled: i || !!l,
        onAISparklesClick: (A) => c(A),
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
      Ix,
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
      Rx,
      {
        state: p,
        position: b,
        onReplace: w,
        onInsert: v,
        onRetry: y,
        onDiscard: T
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
    !n.slashCommands && /* @__PURE__ */ m(xx, { editor: e, disabledFeatures: n }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 153,
      columnNumber: 9
    }, this),
    !n.wikiLinks && S && /* @__PURE__ */ m(Mx, { editor: e, onSearch: S }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 158,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ m(
      px,
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
    /* @__PURE__ */ m(bx, { editor: e, onEditLink: C }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/WYSIWYGOverlays.tsx",
      lineNumber: 169,
      columnNumber: 7
    }, this),
    !n.images && k?.isOpen && /* @__PURE__ */ m(
      Dx,
      {
        src: k.src,
        alt: k.alt,
        position: k.position,
        onSave: D,
        onDelete: x,
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
function Ox({
  scrollContainerRef: e,
  hideDelay: t = 1200
}) {
  return null;
}
function _x(e, t) {
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
function $x(e) {
  const [t, n] = Ud(_x, { status: "idle" }), o = j(null), r = F(async (i, l, c, u, d) => {
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
  }, [e]), s = F(() => {
    o.current?.(), n({ type: "reset" });
  }, []), a = F(() => {
    n({ type: "reset" });
  }, []);
  return { state: t, executeAction: r, abort: s, reset: a };
}
const ol = Yd(
  () => Promise.resolve().then(() => Xx).then((e) => ({ default: e.TableOfContents }))
), Bx = () => {
  if (typeof window > "u") return !1;
  const e = "ontouchstart" in window, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), n = window.innerWidth < 768;
  return e && (t || n) || t && n;
}, B1 = jd(function({
  content: t = "",
  onChange: n,
  onHTMLChange: o,
  onMarkdownChange: r,
  markdownChangeDebounceMs: s = 0,
  placeholder: a = 'Start writing... Use "/" for commands',
  editable: i = !0,
  autofocus: l = !1,
  className: c = "",
  showToolbar: u = !0,
  showWordCount: d = !0,
  wordCountDebounceMs: f = 1e3,
  theme: h,
  colorTheme: g = "colorful",
  autoSave: p = !0,
  autoSaveKey: b = "paragon-editor-content",
  autoSaveDelay: w = 1e3,
  showRecoveryBanner: v = !0,
  showFloatingToolbar: y = !0,
  maxImageSize: T = 5 * 1024 * 1024,
  onImageUploadStart: N,
  onImageUploadComplete: C,
  onImageUploadError: S,
  onImageUpload: k,
  resolveImageSrc: D,
  showModeToggle: x = !0,
  // New props
  initialMode: M = "wysiwyg",
  onModeChange: A,
  onReady: R,
  onFocus: L,
  onBlur: _,
  onSelectionChange: W,
  onDestroy: V,
  onSave: I,
  onRecover: P,
  onWikiLinkClick: $,
  validateWikiLink: q,
  onWikiLinkSearch: H,
  onLinkClick: Y,
  findReplaceOpen: G,
  onFindReplaceChange: B,
  renderToolbar: J,
  renderFooter: O,
  disabledFeatures: ee = {},
  minHeight: ne = "200px",
  maxHeight: ue,
  spellCheck: we = !0,
  headingLevels: be = [1, 2, 3, 4, 5, 6],
  collapsibleHeadingLevels: ze = [1, 2, 3],
  // TOC props
  showTableOfContents: ct = !1,
  tocVisible: Lt = !0,
  onTocVisibilityChange: Mn,
  tocTitle: Dn = "",
  tocMinLevel: ao = 1,
  tocMaxLevel: lo = 4,
  tocShowLevelIndicators: co = !1,
  tocHighlightActive: uo = !0,
  tocTreeView: An = !1,
  tocWidth: Zt = "240px",
  tocPosition: kt = "right",
  tocScrollOffset: mo = 20,
  onTocItemClick: fo,
  renderTocItem: ho,
  tocShowToggleButton: po = !0,
  // Raw markdown editor
  autoClosePairs: Pr = !0,
  // Performance profiler
  showPerformanceProfiler: Ir = !1,
  onPerformanceProfilerClose: Rr,
  // Auto reorder checklist
  autoReorderChecklist: Lr = !1,
  // Expand selection
  progressiveSelectAll: Or = !1,
  // Auto-detection toggles
  enableTagAutoDetect: go = !1,
  enableHexColorHighlight: _r = !1,
  enableCollapsibleHeadings: bo = !1,
  enableCollapsibleLists: $r = !1,
  // Performance mode
  performanceMode: ie = "auto",
  // Error boundary
  onEditorError: pe,
  // AI writing assistant
  aiActions: oe,
  onAIAction: me,
  onAISetupRequired: Ee
}, de) {
  const [Qt] = U(() => Bx()), [Jt, Br] = U(M), [en, Ot] = U(""), vo = j(M), wo = j(""), Pn = j(null), [dd, Ei] = U(0), No = !!(oe && oe.length > 0 && me), { state: Ue, executeAction: yo, abort: md, reset: xt } = $x(me), [fd, Wr] = U(null), [hd, pd] = U({ selectionTop: 0, selectionBottom: 0, selectionCenterX: 0 }), gd = j(me);
  gd.current = me;
  const Si = j(Ee);
  Si.current = Ee;
  const [bd, vd] = U([]), [wd, Nd] = U(0), yd = F((se, xe) => {
    vd(se), Nd(xe);
  }, []), Mi = j(N), Di = j(C), Ai = j(S), Pi = j(k), Ii = j(D), Ri = j($), Li = j(q), Oi = j(H);
  Mi.current = N, Di.current = C, Ai.current = S, Pi.current = k, Ii.current = D, Ri.current = $, Li.current = q, Oi.current = H;
  const _i = 2e3, [Hr, kd] = U(() => ie === "lightweight" ? !0 : ie === "full" ? !1 : t && typeof t == "string" ? Math.ceil(t.length / 80) > _i : !1), xd = j(0), $i = j(Hr);
  $i.current = Hr;
  const [Fr, ko] = U(null), Cd = _k({
    placeholder: a,
    isMobile: Qt,
    maxImageSize: T,
    headingLevels: be,
    collapsibleHeadingLevels: ze,
    disabledFeatures: ee,
    progressiveSelectAll: Or,
    enableCollapsibleHeadings: bo,
    enableCollapsibleLists: $r,
    enableTagAutoDetect: go,
    enableHexColorHighlight: _r,
    isLightweight: Hr,
    setImageEditState: ko,
    callbackRefs: {
      onImageUploadStart: Mi,
      onImageUploadComplete: Di,
      onImageUploadError: Ai,
      onImageUpload: Pi,
      resolveImageSrc: Ii,
      onWikiLinkClick: Ri,
      validateWikiLink: Li
    }
  }), { editor: re, turndownService: xo } = Fk({
    extensions: Cd,
    content: t,
    editable: i,
    autofocus: l,
    spellCheck: we,
    initialMode: M,
    performanceMode: ie,
    lightweightThreshold: _i,
    onChange: n,
    onHTMLChange: o,
    onMarkdownChange: r,
    markdownChangeDebounceMs: s,
    onReady: R,
    onDestroy: V,
    onFocus: L,
    onBlur: _,
    onSelectionChange: W,
    onLinkClick: Y,
    editorModeRef: vo,
    rawMarkdownRef: wo,
    setRawMarkdown: Ot,
    setIsLightweight: kd,
    lightweightCheckCounterRef: xd,
    isLightweightRef: $i
  }), [Td, Co] = U(!1), [Ed, Sd] = U(!1), Md = G !== void 0 ? G : Ed, _t = F((se) => {
    Sd(se), B?.(se);
  }, [B]), [Dd, To] = U(0), [Ad, Pd] = U(""), $t = Vv(re, {
    storageKey: b,
    debounceMs: w,
    enabled: p,
    onSave: (se) => {
      I?.(se);
    },
    onRecover: (se) => {
      P?.(se);
    }
  }), zr = tx({
    editor: re,
    turndownService: xo,
    editorModeRef: vo,
    rawMarkdownRef: wo,
    setEditorMode: Br,
    setRawMarkdown: Ot,
    onModeChange: A,
    enableTagAutoDetect: go,
    disabledFeatures: ee
  }), Bi = F((se) => {
    Ot(se), wo.current = se, r?.(se);
  }, [r]), Eo = ox(re, {
    debounceMs: f,
    extendedStats: !1,
    enabled: d
  });
  Kv(de, {
    editor: re,
    turndownService: xo,
    editorModeRef: vo,
    handleModeSwitch: zr,
    wordCount: Eo,
    autoSaveState: $t,
    setIsFindReplaceOpen: _t,
    setFindReplaceFocusTrigger: To
  }), ex({
    editorModeRef: vo,
    rawMarkdownRef: wo,
    editorMode: Jt,
    handleModeSwitch: zr,
    setIsFindReplaceOpen: _t,
    setFindReplaceFocusTrigger: To
  });
  const Id = rt(() => ({
    openLinkPopover: () => Co(!0),
    openFindReplace: (se) => {
      se && Pd(se), _t(!0), To((xe) => xe + 1);
    },
    openFindReplaceWithReplace: () => {
      _t(!0);
    }
  }), [_t]);
  Jk(re, Qt, Id);
  const Wi = F((se, xe) => {
    if (!No) {
      Si.current?.();
      return;
    }
    if (!re) return;
    let Ke = { top: 0, left: 0 };
    if (xe) {
      const _e = xe.getBoundingClientRect();
      Ke = { top: _e.bottom + 4, left: _e.left };
    } else {
      const { from: _e, to: Ct } = re.state.selection, Bt = re.view.coordsAtPos(_e), tn = re.view.coordsAtPos(Ct);
      Ke = { top: tn.bottom + 8, left: (Bt.left + tn.left) / 2 };
    }
    Wr({ scope: se, position: Ke });
  }, [No, re]), Rd = F((se, xe) => {
    if (!re || !oe) return;
    const Ke = oe.find((Ur) => Ur.id === se);
    if (!Ke) return;
    const { from: _e, to: Ct } = re.state.selection, Bt = _e !== Ct ? re.state.doc.textBetween(_e, Ct, `
`) : "", tn = Ke.scope === "document" || !Bt ? re.getText() : Bt, So = re.view.coordsAtPos(_e), Mo = re.view.coordsAtPos(Ct);
    pd({
      selectionTop: So.top,
      selectionBottom: Mo.bottom,
      selectionCenterX: (So.left + Mo.right) / 2
    }), Wr(null), yo(se, Ke.label, tn, { from: _e, to: Ct }, xe);
  }, [re, oe, yo]), Ld = F(() => {
    if (!re || Ue.status !== "complete") return;
    const { selectionRange: se, result: xe } = Ue;
    re.chain().focus().setTextSelection(se).deleteSelection().insertContent(xe).run(), xt();
  }, [re, Ue, xt]), Od = F(() => {
    if (!re || Ue.status !== "complete") return;
    const { selectionRange: se, result: xe } = Ue;
    re.chain().focus().setTextSelection(se.to).insertContent(`
` + xe).run(), xt();
  }, [re, Ue, xt]), _d = F(() => {
    if (!(Ue.status !== "complete" && Ue.status !== "error"))
      if (Ue.status === "complete") {
        const { action: se, actionLabel: xe, inputText: Ke, selectionRange: _e } = Ue;
        xt(), yo(se, xe, Ke, _e);
      } else
        xt();
  }, [Ue, xt, yo]), $d = F(() => {
    if (!re) return;
    const { from: se, to: xe, empty: Ke } = re.state.selection;
    if (Ke) return;
    const _e = re.state.doc.slice(se, xe), Ct = Wm.fromSchema(re.schema), Bt = document.createElement("div"), tn = Ct.serializeFragment(_e.content);
    Bt.appendChild(tn);
    const So = Bt.innerHTML, Mo = Fn(xo.turndown(So));
    navigator.clipboard.writeText(Mo).catch(() => {
      const Ur = re.state.doc.textBetween(se, xe, `
`);
      navigator.clipboard.writeText(Ur);
    });
  }, [re, xo]);
  if (!re)
    return /* @__PURE__ */ m(ux, { className: c, theme: h }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 882,
      columnNumber: 12
    }, this);
  const Hi = /* @__PURE__ */ m(
    Hv,
    {
      editor: re,
      onOpenLinkPopover: () => Co(!0),
      className: "flex-1",
      onOpenFindReplace: () => {
        _t(!0), To((se) => se + 1);
      },
      disabledFeatures: ee,
      autoReorderChecklist: Lr,
      aiEnabled: No || !!Ee,
      onAISparklesClick: (se) => Wi("document", se)
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 887,
      columnNumber: 5
    },
    this
  ), Fi = /* @__PURE__ */ m("div", { className: "editor-footer", children: [
    p && /* @__PURE__ */ m(
      rx,
      {
        status: $t.status,
        lastSaved: $t.lastSaved
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
    /* @__PURE__ */ m("div", { className: "word-count", children: /* @__PURE__ */ m("span", { children: [
      Eo.words,
      " words"
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 912,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 911,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 904,
    columnNumber: 5
  }, this), Bd = {
    minHeight: ne,
    ...ue && { maxHeight: ue, overflowY: "auto" }
  };
  return /* @__PURE__ */ m("div", { className: `markdown-editor-container ${g === "neutral" ? "color-theme-neutral" : ""} ${c}`, "data-theme": h, children: [
    p && v && $t.hasRecoverableContent && /* @__PURE__ */ m(
      sx,
      {
        onRecover: () => {
          $t.recover();
        },
        onDismiss: $t.dismissRecovery
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 927,
        columnNumber: 9
      },
      this
    ),
    u && /* @__PURE__ */ m("div", { className: "flex items-center bg-card/50 editor-toolbar-wrapper", children: [
      J ? J(re, Hi) : Hi,
      x && /* @__PURE__ */ m(dx, { editorMode: Jt, onModeSwitch: zr }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 940,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 937,
      columnNumber: 9
    }, this),
    !Qt && /* @__PURE__ */ m(
      Fv,
      {
        editor: re,
        isOpen: Md,
        onClose: () => _t(!1),
        focusTrigger: Dd,
        initialSearchQuery: Ad,
        editorMode: Jt,
        rawMarkdown: en,
        onRawMarkdownChange: Bi,
        onMatchesChange: yd
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 947,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m(Yv, { editor: re }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 961,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ m("div", { className: `editor-main-area ${ct ? "editor-with-toc" : ""}`, children: [
      ct && kt === "left" && /* @__PURE__ */ m(zi, { fallback: null, children: /* @__PURE__ */ m(
        ol,
        {
          editor: re,
          visible: Lt,
          onVisibilityChange: Mn,
          title: Dn,
          minLevel: ao,
          maxLevel: lo,
          showLevelIndicators: co,
          highlightActive: uo,
          treeView: An,
          width: Zt,
          position: kt,
          scrollOffset: mo,
          onItemClick: fo,
          renderItem: ho,
          showToggleButton: po,
          scrollContainerRef: Pn
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 968,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 967,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ m(
        cx,
        {
          resetKey: `${t}-${dd}`,
          onRetry: () => Ei((se) => se + 1),
          onClearContent: () => {
            re && re.commands.clearContent(), n?.(""), o?.(""), r?.(""), Ei((se) => se + 1);
          },
          onError: pe,
          children: [
            /* @__PURE__ */ m("div", { className: "editor-content-wrapper", ref: Pn, style: Bd, children: Jt === "wysiwyg" ? /* @__PURE__ */ m(ve, { children: [
              /* @__PURE__ */ m(Hd, { editor: re, className: "editor-content" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 1006,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ m(
                Lx,
                {
                  editor: re,
                  isMobile: Qt,
                  disabledFeatures: ee,
                  containerRef: Pn,
                  editable: i,
                  showFloatingToolbar: y,
                  isLinkPopoverOpen: Td,
                  aiEnabled: No,
                  onAISetupRequired: Ee,
                  onAISparklesClick: (se) => Wi("selection", se),
                  onCopySelectionAsMarkdown: $d,
                  aiDropdown: fd,
                  aiActions: oe,
                  onAIActionSelect: Rd,
                  onAIDropdownClose: () => Wr(null),
                  aiState: Ue,
                  aiPopoverPosition: hd,
                  onAIReplace: Ld,
                  onAIInsert: Od,
                  onAIRetry: _d,
                  onAIDiscard: () => {
                    md(), xt();
                  },
                  onLinkPopoverClose: () => Co(!1),
                  onEditLink: () => Co(!0),
                  onWikiLinkSearch: Oi.current,
                  imageEditState: Fr,
                  onImageSave: (se, xe) => {
                    re.chain().focus().setNodeSelection(Fr.pos).updateAttributes("resizableImage", {
                      src: se,
                      alt: xe
                    }).run(), ko(null);
                  },
                  onImageDelete: () => {
                    re.chain().focus().setNodeSelection(Fr.pos).deleteSelection().run(), ko(null);
                  },
                  onImageEditClose: () => ko(null)
                },
                void 0,
                !1,
                {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                  lineNumber: 1007,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1005,
              columnNumber: 11
            }, this) : /* @__PURE__ */ m(
              ix,
              {
                content: en,
                onChange: Bi,
                placeholder: "Write your markdown here...",
                editable: i,
                autofocus: !0,
                searchMatches: bd,
                currentMatchIndex: wd,
                autoClosePairs: Pr
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
                lineNumber: 1048,
                columnNumber: 11
              },
              this
            ) }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1003,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ m(Ox, { scrollContainerRef: Pn }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
              lineNumber: 1060,
              columnNumber: 7
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 988,
          columnNumber: 7
        },
        this
      ),
      ct && kt === "right" && /* @__PURE__ */ m(zi, { fallback: null, children: /* @__PURE__ */ m(
        ol,
        {
          editor: re,
          visible: Lt,
          onVisibilityChange: Mn,
          title: Dn,
          minLevel: ao,
          maxLevel: lo,
          showLevelIndicators: co,
          highlightActive: uo,
          treeView: An,
          width: Zt,
          position: kt,
          scrollOffset: mo,
          onItemClick: fo,
          renderItem: ho,
          showToggleButton: po,
          scrollContainerRef: Pn
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
          lineNumber: 1065,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
        lineNumber: 1064,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 964,
      columnNumber: 7
    }, this),
    d && (O ? O(
      { words: Eo.words, characters: Eo.characters },
      $t.status,
      Fi
    ) : Fi),
    /* @__PURE__ */ m(lx, { visible: Ir, onClose: Rr, editor: re }, void 0, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
      lineNumber: 1099,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/MarkdownEditor.tsx",
    lineNumber: 924,
    columnNumber: 5
  }, this);
}), W1 = gr.create({
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
      yn(this.options.HTMLAttributes, t, {
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
}, Hn = {
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
function H1(e, t, n, o) {
  const r = Hn[e] || id;
  return {
    name: t,
    description: n,
    variables: {
      ...r.variables,
      ...o
    }
  };
}
const ad = cl(null);
function F1({
  children: e,
  defaultTheme: t = "dark",
  containerRef: n
}) {
  const [o, r] = U(t), s = Hn[o] || Hn.dark, a = F((l) => {
    Hn[l] && r(l);
  }, []);
  K(() => {
    n?.current && zx(n.current, s);
  }, [s, n]);
  const i = {
    theme: s,
    themeName: o,
    setTheme: a,
    availableThemes: Object.keys(Hn)
  };
  return /* @__PURE__ */ m(ad.Provider, { value: i, children: e }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/ThemeProvider.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function z1() {
  const e = ul(ad);
  if (!e)
    throw new Error("useEditorTheme must be used within an EditorThemeProvider");
  return e;
}
const rl = [
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
function U1({ node: e, updateAttributes: t }) {
  const [n, o] = U(!1), r = e.attrs.language || "plaintext";
  rl.find((a) => a.value === r)?.label;
  const s = F(() => {
    const a = e.textContent;
    navigator.clipboard.writeText(a).then(() => {
      o(!0), setTimeout(() => o(!1), 2e3);
    });
  }, [e.textContent]);
  return /* @__PURE__ */ m(bn, { className: "code-block-wrapper", children: [
    /* @__PURE__ */ m("div", { className: "code-block-controls", contentEditable: !1, children: [
      /* @__PURE__ */ m("div", { className: "code-block-language-wrapper", children: [
        /* @__PURE__ */ m(
          "select",
          {
            value: r,
            onChange: (a) => t({ language: a.target.value }),
            className: "code-block-language-select",
            children: rl.map(({ value: a, label: i }) => /* @__PURE__ */ m("option", { value: a, children: i }, a, !1, {
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
        /* @__PURE__ */ m(At, { size: 12, className: "code-block-language-chevron" }, void 0, !1, {
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
    /* @__PURE__ */ m("pre", { className: "code-block-pre", children: /* @__PURE__ */ m("code", { children: /* @__PURE__ */ m(_s, {}, void 0, !1, {
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
const ld = "paragon-editor-toc-width", Ux = 280, cd = 200, ud = 500, _n = 30, sl = 5;
function il() {
  try {
    const e = localStorage.getItem(ld);
    if (e) {
      const t = parseInt(e, 10);
      if (!isNaN(t) && t >= cd && t <= ud)
        return t;
    }
  } catch {
  }
  return Ux;
}
function Yx(e) {
  try {
    localStorage.setItem(ld, String(e));
  } catch {
  }
}
function jx(e, t, n) {
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
function Vx(e) {
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    t += `${o.pos}:${o.level}:${o.text};`;
  }
  return t;
}
function Kx(e) {
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
function al(e, t) {
  try {
    const n = e.state.doc.resolve(t), o = e.view.nodeDOM(n.before(n.depth + 1));
    if (o instanceof HTMLElement) return o;
    const r = e.view.nodeDOM(t);
    if (r instanceof HTMLElement) return r;
  } catch {
  }
  return null;
}
const Os = Nt(function({
  item: t,
  isActive: n,
  minLevel: o,
  showLevelIndicators: r,
  hasChildren: s,
  isCollapsed: a,
  treeView: i,
  onItemClick: l,
  onToggleCollapse: c,
  style: u
}) {
  const d = (t.level - o) * 14;
  return /* @__PURE__ */ m(
    "div",
    {
      className: `toc-item ${n ? "toc-item-active" : ""} toc-level-${t.level}`,
      style: { paddingLeft: `${d + 10}px`, ...u },
      children: /* @__PURE__ */ m(
        "button",
        {
          className: "toc-item-button",
          onClick: () => l(t),
          title: t.text,
          children: [
            i && s && /* @__PURE__ */ m(
              "span",
              {
                className: "toc-collapse-toggle",
                onClick: (f) => {
                  f.stopPropagation(), c(t.id);
                },
                children: /* @__PURE__ */ m("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: a ? /* @__PURE__ */ m("path", { d: "M3.5 2L7 5L3.5 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                  lineNumber: 198,
                  columnNumber: 19
                }, this) : /* @__PURE__ */ m("path", { d: "M2 3.5L5 7L8 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                  lineNumber: 199,
                  columnNumber: 19
                }, this) }, void 0, !1, {
                  fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                  lineNumber: 196,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 189,
                columnNumber: 11
              },
              this
            ),
            r && /* @__PURE__ */ m("span", { className: "toc-level-indicator", children: [
              "H",
              t.level
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 205,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ m("span", { className: "toc-item-text", children: t.text }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 207,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 183,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
      lineNumber: 179,
      columnNumber: 5
    },
    this
  );
}), Gx = Nt(function({
  headings: t,
  activeId: n,
  minLevel: o,
  showLevelIndicators: r,
  onItemClick: s,
  onToggleCollapse: a
}) {
  const i = j(null), [l, c] = U(0), [u, d] = U(0);
  K(() => {
    const w = i.current;
    if (!w) return;
    const v = () => {
      d(w.clientHeight);
    };
    v();
    let y = null;
    return typeof ResizeObserver < "u" && (y = new ResizeObserver(v), y.observe(w)), () => {
      y?.disconnect();
    };
  }, []);
  const f = F((w) => {
    c(w.currentTarget.scrollTop);
  }, []), h = t.length * _n, g = Math.max(0, Math.floor(l / _n) - sl), p = Math.min(
    t.length,
    Math.ceil((l + u) / _n) + sl
  ), b = rt(() => {
    const w = [];
    for (let v = g; v < p; v++) {
      const y = t[v];
      w.push(
        /* @__PURE__ */ m(
          Os,
          {
            item: y,
            isActive: n === y.id,
            minLevel: o,
            showLevelIndicators: r,
            hasChildren: !1,
            isCollapsed: !1,
            treeView: !1,
            onItemClick: s,
            onToggleCollapse: a,
            style: {
              position: "absolute",
              top: `${v * _n}px`,
              left: 0,
              right: 0,
              height: `${_n}px`
            }
          },
          y.id,
          !1,
          {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 276,
            columnNumber: 9
          },
          this
        )
      );
    }
    return w;
  }, [t, g, p, n, o, r, s, a]);
  return t.length < 30 ? /* @__PURE__ */ m(ve, { children: t.map((w) => /* @__PURE__ */ m(
    Os,
    {
      item: w,
      isActive: n === w.id,
      minLevel: o,
      showLevelIndicators: r,
      hasChildren: !1,
      isCollapsed: !1,
      treeView: !1,
      onItemClick: s,
      onToggleCollapse: a
    },
    w.id,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
      lineNumber: 305,
      columnNumber: 11
    },
    this
  )) }, void 0, !1, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
    lineNumber: 303,
    columnNumber: 7
  }, this) : /* @__PURE__ */ m(
    "div",
    {
      ref: i,
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
            height: `${h}px`,
            position: "relative"
          },
          children: b
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 333,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
      lineNumber: 323,
      columnNumber: 5
    },
    this
  );
}), qx = Nt(function({
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
  const [v, y] = U([]), [T, N] = U(null), [C, S] = U(n), [k, D] = U(/* @__PURE__ */ new Set()), [x, M] = U(() => {
    if (d) {
      const O = parseInt(d, 10);
      return isNaN(O) ? il() : O;
    }
    return il();
  }), A = j(null), R = j(null), L = j(!1), _ = j(0), W = j(0), V = j("");
  K(() => {
    S(n);
  }, [n]);
  const I = F((O) => {
    O.preventDefault(), O.stopPropagation(), L.current = !0, _.current = O.clientX, W.current = x, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  }, [x]);
  K(() => {
    const O = (ne) => {
      if (!L.current) return;
      const ue = f === "right" ? _.current - ne.clientX : ne.clientX - _.current, we = Math.min(ud, Math.max(cd, W.current + ue));
      M(we);
    }, ee = () => {
      L.current && (L.current = !1, document.body.style.cursor = "", document.body.style.userSelect = "", M((ne) => (Yx(ne), ne)));
    };
    return document.addEventListener("mousemove", O), document.addEventListener("mouseup", ee), () => {
      document.removeEventListener("mousemove", O), document.removeEventListener("mouseup", ee);
    };
  }, [f]);
  const P = F(() => {
    if (!t || t.isDestroyed) return;
    const O = jx(t, s, a), ee = Vx(O);
    ee !== V.current && (V.current = ee, y(O));
  }, [t, s, a]);
  K(() => {
    if (!t) return;
    const O = () => {
      R.current && clearTimeout(R.current), R.current = setTimeout(() => P(), 300);
    };
    return P(), t.on("update", O), t.on("create", O), () => {
      t.off("update", O), t.off("create", O), R.current && clearTimeout(R.current);
    };
  }, [t, P]), K(() => {
    if (!t || !l || !C || v.length === 0) return;
    const O = w?.current || t.view.dom.closest(".editor-content-wrapper");
    if (!O) return;
    const ee = () => {
      const we = O.getBoundingClientRect();
      let be = null;
      for (let ze = v.length - 1; ze >= 0; ze--) {
        const ct = v[ze], Lt = al(t, ct.pos);
        if (Lt && Lt.getBoundingClientRect().top - we.top <= h + 10) {
          be = ct.id;
          break;
        }
      }
      !be && v.length > 0 && (be = v[0].id), N(be);
    };
    let ne;
    const ue = () => {
      cancelAnimationFrame(ne), ne = requestAnimationFrame(ee);
    };
    return O.addEventListener("scroll", ue, { passive: !0 }), ee(), () => {
      O.removeEventListener("scroll", ue), cancelAnimationFrame(ne);
    };
  }, [t, v, l, C, h, w]);
  const $ = F((O) => {
    if (!t || t.isDestroyed) return;
    const ee = al(t, O.pos);
    if (ee) {
      const ne = w?.current || t.view.dom.closest(".editor-content-wrapper");
      if (ne) {
        const ue = ne.getBoundingClientRect(), be = ee.getBoundingClientRect().top - ue.top + ne.scrollTop;
        ne.scrollTo({ top: be - h, behavior: "smooth" });
      } else
        ee.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      t.commands.setTextSelection(O.pos + 1);
    } catch {
    }
    N(O.id), g?.(O);
  }, [t, h, g, w]), q = F(() => {
    const O = !C;
    S(O), o?.(O);
  }, [C, o]), H = F((O) => {
    D((ee) => {
      const ne = new Set(ee);
      return ne.has(O) ? ne.delete(O) : ne.add(O), ne;
    });
  }, []), Y = F((O, ee = 0) => {
    if (p) {
      const be = T === O.id;
      return p(O, be, () => $(O));
    }
    const ne = T === O.id, ue = O.children && O.children.length > 0, we = k.has(O.id);
    return /* @__PURE__ */ m("div", { children: [
      /* @__PURE__ */ m(
        Os,
        {
          item: O,
          isActive: ne,
          minLevel: s,
          showLevelIndicators: i,
          hasChildren: !!ue,
          isCollapsed: we,
          treeView: !0,
          onItemClick: $,
          onToggleCollapse: H
        },
        void 0,
        !1,
        {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 548,
          columnNumber: 9
        },
        this
      ),
      ue && !we && /* @__PURE__ */ m("div", { className: "toc-children", children: O.children.map((be) => Y(be, ee + 1)) }, void 0, !1, {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 560,
        columnNumber: 11
      }, this)
    ] }, O.id, !0, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
      lineNumber: 547,
      columnNumber: 7
    }, this);
  }, [T, k, $, H, s, i, p]), G = F((O) => O.map((ee) => Y(ee)), [Y]), B = F(() => p ? v.map((O) => {
    const ee = T === O.id;
    return /* @__PURE__ */ m("div", { children: p(O, ee, () => $(O)) }, O.id, !1, {
      fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
      lineNumber: 578,
      columnNumber: 9
    }, this);
  }) : null, [v, T, p, $]);
  if (!t) return null;
  const J = c ? Kx(v) : [];
  return /* @__PURE__ */ m(ve, { children: [
    b && /* @__PURE__ */ m(
      "button",
      {
        className: `toc-toggle-button toc-toggle-${f}`,
        onClick: q,
        title: C ? "Hide Table of Contents" : "Show Table of Contents",
        children: C ? /* @__PURE__ */ m(Pm, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 598,
          columnNumber: 24
        }, this) : /* @__PURE__ */ m(Im, { size: 16 }, void 0, !1, {
          fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
          lineNumber: 598,
          columnNumber: 56
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 593,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ m(
      "div",
      {
        ref: A,
        className: `toc-sidebar ${C ? "toc-visible" : "toc-hidden"} toc-${f} ${u}`,
        style: { width: C ? `${x}px` : "0px" },
        children: [
          C && /* @__PURE__ */ m(
            "div",
            {
              className: `toc-resize-handle toc-resize-${f}`,
              onMouseDown: I
            },
            void 0,
            !1,
            {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 610,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ m("div", { className: "toc-inner", children: [
            r && /* @__PURE__ */ m("div", { className: "toc-header", children: /* @__PURE__ */ m("span", { className: "toc-title", children: r }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 620,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 619,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m("div", { className: "toc-content toc-content-with-toggle", children: v.length === 0 ? /* @__PURE__ */ m("div", { className: "toc-empty", children: [
              /* @__PURE__ */ m("p", { children: "No headings yet" }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 628,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ m("p", { className: "toc-empty-hint", children: "Add headings to see the outline." }, void 0, !1, {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 629,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 627,
              columnNumber: 15
            }, this) : /* @__PURE__ */ m("div", { className: "toc-list", children: c ? G(J) : p ? B() : /* @__PURE__ */ m(
              Gx,
              {
                headings: v,
                activeId: T,
                minLevel: s,
                showLevelIndicators: i,
                onItemClick: $,
                onToggleCollapse: H
              },
              void 0,
              !1,
              {
                fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
                lineNumber: 638,
                columnNumber: 23
              },
              this
            ) }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 632,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
              lineNumber: 625,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
            lineNumber: 616,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
        lineNumber: 603,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "/home/ubuntu/manus-markdown-editor/client/src/components/editor/TableOfContents.tsx",
    lineNumber: 590,
    columnNumber: 5
  }, this);
}), Xx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TableOfContents: qx
}, Symbol.toStringTag, { value: "Module" }));
export {
  rx as AutoSaveIndicator,
  W1 as Callout,
  q0 as CalloutInputRule,
  U1 as CodeBlockComponent,
  j0 as CollapsibleHeading,
  hw as CollapsibleList,
  D0 as DatePill,
  F1 as EditorThemeProvider,
  Hv as EditorToolbar,
  Fv as FindReplace,
  hx as FloatingToolbar,
  Ax as ImageDropZone,
  Ok as ImageUpload,
  B1 as MarkdownEditor,
  G0 as MarkdownLinkInputRule,
  F0 as MarkdownPasteSafe,
  aw as MixedBulletList,
  dw as MixedListItem,
  lw as MixedOrderedList,
  uw as MixedTaskItem,
  cw as MixedTaskList,
  sx as RecoveryBanner,
  bw as ResizableImage,
  X0 as SearchHighlight,
  Yv as SelectAllActionBar,
  xk as SelectAllOccurrences,
  xx as SlashCommands,
  Z0 as TabIndent,
  qx as TableOfContents,
  I0 as TagPill,
  L0 as WikiLinkSafe,
  zx as applyTheme,
  H1 as createCustomTheme,
  id as darkTheme,
  Ti as getDateVariant,
  un as isValidTag,
  Wx as lightTheme,
  pf as loadCoreLanguages,
  gf as loadLanguageIfNeeded,
  qe as lowlight,
  Fx as nordTheme,
  Yn as normalizeTag,
  Ft as parseDateFromMarkdown,
  Hx as sepiaTheme,
  Hn as themes,
  Vv as useAutoSave,
  z1 as useEditorTheme,
  ox as useWordCount
};
//# sourceMappingURL=paragon.js.map
